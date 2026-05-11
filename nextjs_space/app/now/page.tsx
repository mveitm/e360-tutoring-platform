import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { isAdminEmail } from '@/lib/admin-guard'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StartLoadButton } from './_components/start-load-button'
import { CompleteLoadButton } from './_components/complete-load-button'
import { getStudyLoadContent } from '@/lib/study-load-content'

export const dynamic = 'force-dynamic'

// Phase DO — First visible student surface: active cycle and pending StudyLoads.
// Phase DP — First visible execution verb: "Empezar" a pending load, which
// transitions it to in_progress and opens a TutoringSession via
// POST /api/study-loads/[id]/start. This page remains a Server Component and
// re-reads pending + in_progress loads on every request.
// Phase DQ — First visible closing verb: "Terminar" an in_progress load from
// its card, which transitions the load to completed, closes its linked
// TutoringSession, and captures one minimal self-report Response via
// POST /api/study-loads/[id]/complete.
// Phase DR — /now resilience for the "all caught up" state + visible in-cycle
// history. Read-only phase: extends the StudyLoad query to also include
// completed loads of the current open cycle (with their most recent completed
// TutoringSession and its most recent 'answer' Response). Adds a new
// "Lo que hiciste en este ciclo" section rendering each completed load with
// its self-report (from Response.content). When the cycle is open but has no
// pending/in_progress loads and at least one completed load, renders a new
// non-speculative message: "Estás al día. Tu avance será revisado para
// preparar tu próxima fase." No schema, no endpoint, no mutation.
//
// Phase FH — Student Weekly Flow Verification.
// Added brief instructional text below "Cargas pendientes" and "En curso" section
// headers so the student understands what to do and how to leave evidence. No
// schema, endpoint, lifecycle, audit, or semantic changes.
//
// Provisional linkage: session User.email == Student.email.
// This is intentionally lightweight for MVP and will be replaced when the proper
// User↔Student relation is introduced.

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-md px-4 pt-10 pb-16 sm:pt-14">
        {children}
      </div>
    </main>
  )
}

function Heading() {
  return (
    <header className="mb-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Bexauri</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">¿Qué me toca ahora?</h1>
    </header>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="py-10">
        <p className="text-center text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}

export default async function NowPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/login')
  }

  const email = session.user.email as string
  // CUST-AUTH-1A: Replace tautological User-existence check with real admin guard.
  const isAdminSession = isAdminEmail(email)

  // 1) Resolve Student by email (provisional linkage).
  const student = await prisma.student.findUnique({
    where: { email },
    select: { id: true, firstName: true, lastName: true },
  })

  if (!student) {
    return (
      <Shell>
        <Heading />
        <EmptyState message="No tienes un programa activo todavía." />
        {isAdminSession && (
          <div className="mt-6 text-center">
            <Link href="/admin" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
              Ir al panel de administración
            </Link>
          </div>
        )}
      </Shell>
    )
  }

  // 2) Resolve active enrollment (most recent startedAt if >1).
  const enrollment = await prisma.studentProgramInstance.findFirst({
    where: { studentId: student.id, status: 'active' },
    orderBy: { startedAt: 'desc' },
    select: {
      id: true,
      currentCycleId: true,
      program: { select: { code: true, name: true } },
    },
  })

  if (!enrollment) {
    return (
      <Shell>
        <Heading />
        <EmptyState message="No tienes un programa activo todavía." />
        {isAdminSession && (
          <div className="mt-6 text-center">
            <Link href="/admin" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
              Ir al panel de administración
            </Link>
          </div>
        )}
      </Shell>
    )
  }

  // 3) Resolve open cycle via enrollment.currentCycleId.
  const cycle = enrollment.currentCycleId
    ? await prisma.learningCycle.findUnique({
        where: { id: enrollment.currentCycleId },
        select: { id: true, cycleNumber: true, status: true, openedAt: true },
      })
    : null

  if (!cycle || cycle.status !== 'open') {
    return (
      <Shell>
        <Heading />
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Programa</p>
            <CardTitle className="text-lg">{enrollment.program.code}</CardTitle>
            <p className="text-sm text-muted-foreground">{enrollment.program.name}</p>
          </CardHeader>
        </Card>
        <EmptyState message="Aún no hay un ciclo abierto. Completa tu diagnóstico para empezar." />
        {isAdminSession && (
          <div className="mt-6 text-center">
            <Link href="/admin" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
              Ir al panel de administración
            </Link>
          </div>
        )}
      </Shell>
    )
  }

  // 4) Load the cycle's StudyLoads split by status for three visible sections
  // on /now: "Cargas pendientes" (pending), "En curso" (in_progress), and
  // "Lo que hiciste en este ciclo" (completed, DR). For each completed load
  // we fetch its most recent completed TutoringSession and, within that
  // session, its most recent Response of type 'answer' (which is the minimal
  // self-report captured by DQ in Response.content). This block is read-only
  // and performs no mutation.
  const allLoads = await prisma.studyLoad.findMany({
    where: {
      learningCycleId: cycle.id,
      status: { in: ['pending', 'in_progress', 'completed'] },
    },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      title: true,
      loadType: true,
      status: true,
      tutoringSessions: {
        where: { status: 'completed' },
        orderBy: { completedAt: 'desc' },
        take: 1,
        select: {
          id: true,
          completedAt: true,
          responses: {
            where: { responseType: 'answer' },
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: { id: true, content: true },
          },
        },
      },
    },
  })

  const pendingLoads = allLoads.filter((l: any) => l.status === 'pending')
  const inProgressLoads = allLoads.filter((l: any) => l.status === 'in_progress')
  const completedLoads = allLoads
    .filter((l: any) => l.status === 'completed')
    .slice()
    .sort((a: any, b: any) => {
      const ta = a.tutoringSessions[0]?.completedAt?.getTime() ?? 0
      const tb = b.tutoringSessions[0]?.completedAt?.getTime() ?? 0
      return tb - ta
    })

  const hasActiveLoads = pendingLoads.length > 0 || inProgressLoads.length > 0
  const hasHistory = completedLoads.length > 0
  const showCaughtUpMessage = !hasActiveLoads && hasHistory

  const openedAtLabel = new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(cycle.openedAt))

  return (
    <Shell>
      <Heading />

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Programa</p>
          <CardTitle className="text-lg">{enrollment.program.code}</CardTitle>
          <p className="text-sm text-muted-foreground">{enrollment.program.name}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
            <span className="font-medium">Actividad actual</span>
            <span className="text-muted-foreground">Disponible desde: {openedAtLabel}</span>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Próxima actividad</p>
          <CardTitle className="text-lg">Tu actividad lista para trabajar</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
            <li>Revisa la actividad disponible.</li>
            <li>Presiona Empezar cuando vayas a trabajar.</li>
            <li>Abre Ver actividad para responder los ejercicios.</li>
            <li>Guarda tu avance cuando completes la actividad.</li>
          </ol>
        </CardContent>
      </Card>
      {!hasActiveLoads && !hasHistory ? (
        <EmptyState message="Tu ciclo está al día. Pronto recibirás nueva carga." />
      ) : (
        <div className="space-y-6">
          {pendingLoads.length > 0 && (
            <section aria-label="Cargas pendientes" className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                Cargas pendientes ({pendingLoads.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Revisa la actividad y presiona «Empezar» cuando estés listo.
              </p>
              <ul className="space-y-3">
                {pendingLoads.map((load: any) => {
                  const hasContent = !!getStudyLoadContent(load.title)
                  return (
                    <li key={load.id}>
                      <Card>
                        <CardContent className="py-4">
                          <div className="flex items-start justify-between gap-3">
                            <p className="flex-1 text-sm font-medium leading-snug">{load.title}</p>
                            <Badge variant="secondary" className="shrink-0 text-[10px] uppercase tracking-wide">
                              {load.loadType}
                            </Badge>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-2">
                            {hasContent ? (
                              <Link
                                href={`/now/study-loads/${load.id}`}
                                className="text-xs text-primary hover:underline underline-offset-4"
                              >
                                Ver actividad
                              </Link>
                            ) : (
                              <span />
                            )}
                            <StartLoadButton loadId={load.id} />
                          </div>
                        </CardContent>
                      </Card>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {inProgressLoads.length > 0 && (
            <section aria-label="En curso" className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                En curso ({inProgressLoads.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Continúa tu actividad y registra tu cierre cuando hayas terminado.
              </p>
              <ul className="space-y-3">
                {inProgressLoads.map((load: any) => {
                  const hasContent = !!getStudyLoadContent(load.title)
                  return (
                    <li key={load.id}>
                      <Card>
                        <CardContent className="py-4">
                          <div className="flex items-start justify-between gap-3">
                            <p className="flex-1 text-sm font-medium leading-snug">{load.title}</p>
                            <Badge variant="secondary" className="shrink-0 text-[10px] uppercase tracking-wide">
                              {load.loadType}
                            </Badge>
                          </div>
                          {hasContent && (
                            <div className="mt-2">
                              <Link
                                href={`/now/study-loads/${load.id}`}
                                className="text-xs text-primary hover:underline underline-offset-4"
                              >
                                Ver actividad
                              </Link>
                            </div>
                          )}
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                              <span className="text-xs text-muted-foreground">En curso</span>
                            </div>
                            <CompleteLoadButton loadId={load.id} />
                          </div>
                        </CardContent>
                      </Card>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {showCaughtUpMessage && (
            <Card>
              <CardContent className="py-10 text-center">
                <h2 className="text-sm font-semibold mb-2">Actividad registrada</h2>
                <p className="text-sm text-muted-foreground">
                  Tu avance quedó guardado. Estamos preparando tu siguiente paso y tu tutor podrá revisar la evidencia si corresponde.
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Mientras tanto, puedes revisar lo que hiciste en este ciclo.
                </p>
              </CardContent>
            </Card>
          )}

          {completedLoads.length > 0 && (
            <section aria-label="Lo que hiciste en este ciclo" className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                Lo que hiciste en este ciclo ({completedLoads.length})
              </h2>
              <ul className="space-y-3">
                {completedLoads.map((load: any) => {
                  const report = load.tutoringSessions[0]?.responses[0]?.content ?? null
                  const hasContent = !!getStudyLoadContent(load.title)
                  return (
                    <li key={load.id}>
                      <Card>
                        <CardContent className="py-4">
                          <div className="flex items-start justify-between gap-3">
                            <p className="flex-1 text-sm font-medium leading-snug">{load.title}</p>
                            <Badge variant="secondary" className="shrink-0 text-[10px] uppercase tracking-wide">
                              {load.loadType}
                            </Badge>
                          </div>
                          {report && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              <span className="font-medium">Tu reporte:</span> {report}
                            </p>
                          )}
                          {hasContent && (
                            <div className="mt-2">
                              <Link
                                href={`/now/study-loads/${load.id}`}
                                className="text-xs text-primary hover:underline underline-offset-4"
                              >
                                Ver actividad
                              </Link>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </div>
      )}

      {isAdminSession && (
        <div className="mt-8 text-center">
          <Link href="/admin" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            Ir al panel de administración
          </Link>
        </div>
      )}
    </Shell>
  )
}
