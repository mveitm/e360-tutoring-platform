import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ArrowRight, BookOpen, CheckCircle2, Clock, Route, Sparkles } from 'lucide-react'
import { authOptions } from '@/lib/auth-options'
import { isAdminEmail } from '@/lib/admin-guard'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StartLoadButton } from './_components/start-load-button'
import { CompleteLoadButton } from './_components/complete-load-button'
import { SignOutButton } from './_components/sign-out-button'
import { getStudyLoadContent } from '@/lib/study-load-content'

export const dynamic = 'force-dynamic'

// Provisional linkage: session User.email == Student.email.
// This remains intentionally lightweight for MVP and is not changed in this phase.

type LoadWithSessions = {
  id: string
  title: string
  loadType: string
  status: string
  tutoringSessions: Array<{
    id: string
    status: string
    completedAt: Date | null
    responses: Array<{
      id: string
      responseType: string
      content: string
    }>
  }>
}

const tutoringCards = [
  {
    code: 'M1',
    title: 'PAES Matemáticas M1',
    status: 'Activa',
    description: 'Organiza tu estudio, practica con foco y avanza con retroalimentación.',
    active: true,
    surface: 'border-[#79A6A4] bg-[linear-gradient(180deg,#FBFCF6_0%,#E5F0EF_100%)]',
    badge: 'bg-[#192F56] text-white',
  },
  {
    code: 'M2',
    title: 'PAES Matemáticas M2',
    status: 'Próxima ruta',
    description: 'Preparación matemática avanzada para una próxima etapa.',
    active: false,
    surface: 'border-[#A99AD2] bg-[#F2EFF8]',
    badge: 'bg-[#34215F] text-white',
  },
  {
    code: 'CL',
    title: 'PAES Competencia Lectora',
    status: 'Más adelante',
    description: 'Lectura, comprensión y análisis para fortalecer tu preparación.',
    active: false,
    surface: 'border-[#E9DFCF] bg-[#FFF3D8]',
    badge: 'bg-[#4B7B7C] text-white',
  },
]

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[100svh] overflow-hidden bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_48%,#EEF4F7_100%)] text-[#10213F]">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-3 py-3 sm:px-5 lg:px-8 lg:py-5">
        {children}
      </div>
    </main>
  )
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth pr-1 [scrollbar-width:thin]">
      <div className="pb-3">
        {children}
      </div>
    </div>
  )
}

function DashboardFooterNav() {
  return (
    <footer className="shrink-0 pt-2">
      <nav
        aria-label="Guía de navegación del dashboard"
        className="grid grid-cols-3 gap-1 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 p-1.5 text-xs font-bold text-[#253A5F] shadow-[0_-8px_22px_rgba(16,33,63,0.08)] backdrop-blur"
      >
        <a
          href="#inicio"
          className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
        >
          Inicio
        </a>
        <a
          href="#tutorias"
          className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
        >
          Tutorías
        </a>
        <a
          href="#actividad-actual"
          className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
        >
          Actividad
        </a>
      </nav>
    </footer>
  )
}

function DashboardHeader({ studentName }: { studentName?: string }) {
  return (
    <header className="mb-2 shrink-0 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 px-3 py-1.5 shadow-[0_8px_20px_rgba(16,33,63,0.08)] sm:mb-4 sm:px-4 sm:py-2">
      <div className="flex items-center justify-between gap-3">
        <Link href="/now" className="flex min-w-0 items-center gap-3" aria-label="Bexauri">
          <span className="rounded-2xl border border-[#DCE5EA] bg-white px-2 py-1 shadow-sm shadow-[#10213F]/10">
            <Image
              src="/brand/bexauri-logo-provisional.png"
              alt="Bexauri"
              width={220}
              height={88}
              priority
              className="h-7 w-[106px] rounded-lg object-cover object-center sm:h-9 sm:w-[132px]"
            />
          </span>
          <span className="hidden text-sm font-semibold text-[#5D6B7A] sm:inline">
            {studentName ? studentName : 'Tu espacio de estudio'}
          </span>
        </Link>
        <SignOutButton />
      </div>
    </header>
  )
}

function HeroSummary({
  studentName,
  hasActiveLoads,
  hasHistory,
}: {
  studentName?: string
  hasActiveLoads: boolean
  hasHistory: boolean
}) {
  const nextActionText = hasActiveLoads
    ? 'Tu siguiente accion esta disponible en la actividad actual.'
    : hasHistory
      ? 'Tu trabajo anterior quedo registrado. Revisa tu avance mientras se prepara el siguiente paso.'
      : 'Cuando tengas una actividad asignada, aparecera aqui con una accion clara.'

  return (
    <section id="inicio" className="rounded-3xl border border-[#E2E8EC] bg-[#FBFCF6] p-3.5 shadow-[0_14px_34px_rgba(16,33,63,0.09)] sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4B7B7C] sm:text-sm">Tu espacio de estudio</p>
          <h1 className="mt-1 font-display text-xl font-bold leading-tight text-[#10213F] sm:text-3xl">
            {studentName ? `Hola, ${studentName}.` : 'Bienvenido a Bexauri.'}
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-[#5D6B7A] sm:text-base sm:leading-6">
            Elige una tutoria y continua con el siguiente paso de tu ruta.
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCE5EA] bg-[#10213F] p-3 text-white sm:p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-[#F2B84B] text-[#10213F]">
              <Route className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#DCE5EA]">Que hago ahora</p>
              <p className="text-base font-bold leading-5 sm:text-lg">Matematicas M1</p>
              <p className="mt-1 text-xs leading-5 text-[#DCE5EA] sm:text-sm">{nextActionText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <a
          href="#matematicas-m1"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#192F56] px-4 text-sm font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.18)] transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 sm:min-h-11 sm:px-5"
        >
          Entrar a Matematicas M1
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href="#actividad-actual"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#DCE5EA] bg-white px-4 text-sm font-bold text-[#192F56] transition hover:border-[#79A6A4] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 sm:min-h-11 sm:px-5"
        >
          Ver actividad actual
        </a>
      </div>
    </section>
  )
}

function TutoringSection() {
  return (
    <section id="tutorias" className="mt-2 rounded-3xl border border-[#E2E8EC] bg-[#FBFCF6] p-2.5 shadow-[0_10px_30px_rgba(16,33,63,0.08)] sm:mt-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between gap-3 sm:mb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#34215F] sm:text-sm">Tus tutorias</p>
          <h2 className="mt-0.5 font-display text-lg font-bold text-[#10213F] sm:text-2xl">Tutorias disponibles</h2>
        </div>
        <span className="hidden h-1.5 w-16 rounded-full bg-[#F2B84B] sm:block" aria-hidden="true" />
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1.5 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0 md:pb-0">
        {tutoringCards.map((card) => (
          <article
            key={card.code}
            id={card.active ? 'matematicas-m1' : undefined}
            className={`min-w-[218px] flex-[0_0_74%] rounded-2xl border p-3 shadow-[0_8px_20px_rgba(16,33,63,0.07)] sm:flex-[0_0_42%] sm:rounded-3xl sm:p-4 md:min-w-0 md:flex-auto ${card.surface}`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 text-xs font-bold sm:h-10 sm:min-w-10 sm:px-3 sm:text-sm ${card.badge}`}>
                {card.code}
              </span>
              <Badge variant="secondary" className="rounded-full bg-white/80 text-[9px] font-bold uppercase tracking-wide text-[#253A5F] sm:text-[10px]">
                {card.status}
              </Badge>
            </div>
            <h3 className="mt-3 font-display text-base font-bold leading-5 text-[#10213F] sm:text-lg sm:leading-6">{card.title}</h3>
            <p className="mt-1.5 text-xs leading-5 text-[#5D6B7A] sm:text-sm sm:leading-6">{card.description}</p>
            {card.active ? (
              <a
                href="#actividad-actual"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#192F56] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 sm:px-4 sm:py-2 sm:text-sm"
              >
                Entrar a Matematicas M1
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-3 text-[11px] font-semibold leading-4 text-[#5D6B7A] sm:text-xs sm:leading-5">Visible para orientar la arquitectura de tutorias.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function NextStepSection({ currentLoadTitle }: { currentLoadTitle?: string }) {
  return (
    <section className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
      <Card className="rounded-3xl border-[#E2E8EC] bg-[#FBFCF6] shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
        <CardContent className="p-5 sm:p-6">
          <div className="mb-4 h-1.5 w-14 rounded-full bg-[#4B7B7C]" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-[#10213F]">Qué pasará después</h2>
          <p className="mt-3 text-sm leading-7 text-[#5D6B7A]">
            Al entrar a Matemáticas M1 verás tu actividad actual, trabajarás pocos ejercicios conectados y recibirás orientación para continuar.
          </p>
        </CardContent>
      </Card>

      <Card id="actividad-actual" className="rounded-3xl border-[#DCE5EA] bg-white shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E5F0EF] text-[#48656C]">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4B7B7C]">Actividad actual</p>
              <h2 className="mt-1 font-display text-xl font-bold text-[#10213F]">
                {currentLoadTitle ? currentLoadTitle : 'Matemáticas M1'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
                Revisa aquí la actividad disponible y usa las acciones existentes para avanzar cuando estés listo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card className="rounded-3xl border-[#E2E8EC] bg-white shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
      <CardContent className="py-10">
        <p className="text-center text-sm text-[#5D6B7A]">{message}</p>
      </CardContent>
    </Card>
  )
}

function PendingProgramState() {
  return (
    <Card className="rounded-3xl border-[#E2E8EC] bg-white shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
      <CardContent className="space-y-3 py-8 text-center">
        <p className="text-sm font-semibold text-[#10213F]">Tu cuenta está lista.</p>
        <p className="text-sm leading-6 text-[#5D6B7A]">
          Cuando tu tutoría M1 quede asociada, aquí aparecerá tu actividad actual y el siguiente paso.
        </p>
      </CardContent>
    </Card>
  )
}

function ProgramSummaryCard({
  programCode,
  programName,
  openedAtLabel,
}: {
  programCode: string
  programName: string
  openedAtLabel: string
}) {
  return (
    <Card className="rounded-3xl border-[#E2E8EC] bg-white shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#34215F]">Ruta activa</p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#10213F]">{programCode}</h2>
            <p className="mt-1 text-sm leading-6 text-[#5D6B7A]">{programName}</p>
          </div>
          <div className="rounded-2xl border border-[#DCE5EA] bg-[#EEF4F7] px-4 py-3 text-sm text-[#253A5F]">
            <span className="font-semibold">Disponible desde:</span> {openedAtLabel}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadCard({ load, children }: { load: LoadWithSessions; children?: React.ReactNode }) {
  return (
    <Card className="rounded-3xl border-[#E2E8EC] bg-white shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="flex-1 text-sm font-bold leading-snug text-[#10213F]">{load.title}</p>
          <Badge variant="secondary" className="shrink-0 rounded-full bg-[#EEF4F7] text-[10px] font-bold uppercase tracking-wide text-[#253A5F]">
            {load.loadType}
          </Badge>
        </div>
        {children}
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
  const isAdminSession = isAdminEmail(email)

  const student = await prisma.student.findUnique({
    where: { email },
    select: { id: true, firstName: true, lastName: true },
  })

  const studentName = student?.firstName ?? undefined

  if (!student) {
    return (
      <Shell>
        <DashboardHeader />
        <DashboardContent>
          <HeroSummary hasActiveLoads={false} hasHistory={false} />
          <TutoringSection />
          <NextStepSection />
          <div className="mt-5">
            <PendingProgramState />
          </div>
          {isAdminSession && (
            <div className="mt-6 text-center">
              <Link href="/admin" className="text-xs text-[#5D6B7A] underline-offset-4 hover:underline">
                Ir al panel de administración
              </Link>
            </div>
          )}
        </DashboardContent>
        <DashboardFooterNav />
      </Shell>
    )
  }

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
        <DashboardHeader studentName={studentName} />
        <DashboardContent>
          <HeroSummary studentName={studentName} hasActiveLoads={false} hasHistory={false} />
          <TutoringSection />
          <NextStepSection />
          <div className="mt-5">
            <PendingProgramState />
          </div>
          {isAdminSession && (
            <div className="mt-6 text-center">
              <Link href="/admin" className="text-xs text-[#5D6B7A] underline-offset-4 hover:underline">
                Ir al panel de administración
              </Link>
            </div>
          )}
        </DashboardContent>
        <DashboardFooterNav />
      </Shell>
    )
  }

  const cycle = enrollment.currentCycleId
    ? await prisma.learningCycle.findUnique({
        where: { id: enrollment.currentCycleId },
        select: { id: true, cycleNumber: true, status: true, openedAt: true },
      })
    : null

  if (!cycle || cycle.status !== 'open') {
    return (
      <Shell>
        <DashboardHeader studentName={studentName} />
        <DashboardContent>
          <HeroSummary studentName={studentName} hasActiveLoads={false} hasHistory={false} />
          <TutoringSection />
          <NextStepSection />
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <ProgramSummaryCard
              programCode={enrollment.program.code}
              programName={enrollment.program.name}
              openedAtLabel="Por confirmar"
            />
            <EmptyState message="Aún no hay una actividad abierta. Cuando esté disponible, aparecerá en este espacio." />
          </div>
          {isAdminSession && (
            <div className="mt-6 text-center">
              <Link href="/admin" className="text-xs text-[#5D6B7A] underline-offset-4 hover:underline">
                Ir al panel de administración
              </Link>
            </div>
          )}
        </DashboardContent>
        <DashboardFooterNav />
      </Shell>
    )
  }

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
        where: { status: { in: ['in_progress', 'completed'] } },
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          status: true,
          completedAt: true,
          responses: {
            where: { responseType: { in: ['answer', 'mc_submission'] } },
            orderBy: { createdAt: 'desc' },
            select: { id: true, responseType: true, content: true },
          },
        },
      },
    },
  })

  const pendingLoads = allLoads.filter((l) => l.status === 'pending') as LoadWithSessions[]
  const inProgressLoads = allLoads.filter((l) => l.status === 'in_progress') as LoadWithSessions[]
  const completedLoads = (allLoads.filter((l) => l.status === 'completed') as LoadWithSessions[])
    .slice()
    .sort((a, b) => {
      const aCompletedSession = a.tutoringSessions.find((session) => session.status === 'completed')
      const bCompletedSession = b.tutoringSessions.find((session) => session.status === 'completed')
      const ta = aCompletedSession?.completedAt?.getTime() ?? 0
      const tb = bCompletedSession?.completedAt?.getTime() ?? 0
      return tb - ta
    })

  const hasActiveLoads = pendingLoads.length > 0 || inProgressLoads.length > 0
  const hasHistory = completedLoads.length > 0
  const showCaughtUpMessage = !hasActiveLoads && hasHistory
  const currentLoad = inProgressLoads[0] ?? pendingLoads[0] ?? completedLoads[0]

  const openedAtLabel = new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(cycle.openedAt))

  return (
    <Shell>
      <DashboardHeader studentName={studentName} />
      <DashboardContent>
        <HeroSummary studentName={studentName} hasActiveLoads={hasActiveLoads} hasHistory={hasHistory} />
        <TutoringSection />
        <NextStepSection currentLoadTitle={currentLoad?.title} />

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
        <ProgramSummaryCard
          programCode={enrollment.program.code}
          programName={enrollment.program.name}
          openedAtLabel={openedAtLabel}
        />

        <Card className="rounded-3xl border-[#DCE5EA] bg-[#FBFCF6] shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F2EFF8] text-[#34215F]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-[#10213F]">Siguiente paso</h2>
                <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
                  {hasActiveLoads
                    ? 'Revisa la actividad actual y avanza cuando estés listo.'
                    : 'Revisa tu actividad registrada mientras se prepara una nueva orientación.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 space-y-6">
        {!hasActiveLoads && !hasHistory ? (
          <EmptyState message="No tienes una actividad M1 disponible en este momento. Cuando se asigne una actividad, aparecerá aquí." />
        ) : (
          <>
            {pendingLoads.length > 0 && (
              <section aria-label="Cargas pendientes" className="space-y-3">
                <div className="flex items-center gap-2 text-[#253A5F]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <h2 className="text-sm font-bold">Cargas pendientes ({pendingLoads.length})</h2>
                </div>
                <p className="text-sm leading-6 text-[#5D6B7A]">
                  Abre la actividad cuando estés listo. Tus respuestas quedarán guardadas como evidencia de trabajo.
                </p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {pendingLoads.map((load) => {
                    const hasContent = !!getStudyLoadContent(load.title)
                    return (
                      <li key={load.id}>
                        <LoadCard load={load}>
                          <div className="mt-4 flex items-center justify-between gap-2">
                            {hasContent ? (
                              <Link
                                href={`/now/study-loads/${load.id}`}
                                className="text-sm font-bold text-[#192F56] underline-offset-4 hover:underline"
                              >
                                Ver actividad
                              </Link>
                            ) : (
                              <span />
                            )}
                            <StartLoadButton loadId={load.id} />
                          </div>
                        </LoadCard>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}

            {inProgressLoads.length > 0 && (
              <section aria-label="En curso" className="space-y-3">
                <div className="flex items-center gap-2 text-[#253A5F]">
                  <Route className="h-4 w-4" aria-hidden="true" />
                  <h2 className="text-sm font-bold">En curso ({inProgressLoads.length})</h2>
                </div>
                <p className="text-sm leading-6 text-[#5D6B7A]">
                  Continúa tu actividad y ciérrala cuando termines. Si ya enviaste respuestas, falta tu autorreporte.
                </p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {inProgressLoads.map((load) => {
                    const hasContent = !!getStudyLoadContent(load.title)
                    const hasSubmittedMcEvidence = load.tutoringSessions.some((session) =>
                      session.status === 'in_progress' &&
                      session.responses.some((response) => response.responseType === 'mc_submission'),
                    )
                    return (
                      <li key={load.id}>
                        <LoadCard load={load}>
                          {hasSubmittedMcEvidence && (
                            <p className="mt-3 text-sm leading-6 text-[#5D6B7A]">
                              Tus respuestas ya están guardadas. Falta tu autorreporte para cerrar.
                            </p>
                          )}
                          <div className="mt-4 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block h-2 w-2 rounded-full ${
                                  hasSubmittedMcEvidence ? 'bg-[#F2B84B]' : 'bg-[#4B7B7C]'
                                }`}
                                aria-hidden="true"
                              />
                              <span className="text-xs font-semibold text-[#5D6B7A]">
                                {hasSubmittedMcEvidence ? 'Pendiente de cierre' : 'En curso'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {hasContent && (
                                <Link
                                  href={`/now/study-loads/${load.id}`}
                                  className="text-sm font-bold text-[#192F56] underline-offset-4 hover:underline"
                                >
                                  {hasSubmittedMcEvidence ? 'Finalizar actividad' : 'Ver actividad'}
                                </Link>
                              )}
                              {!hasContent && <CompleteLoadButton loadId={load.id} />}
                            </div>
                          </div>
                        </LoadCard>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}

            {showCaughtUpMessage && (
              <Card className="rounded-3xl border-[#E2E8EC] bg-white shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
                <CardContent className="py-8 text-center">
                  <h2 className="text-sm font-bold text-[#10213F]">Actividad registrada</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
                    Tu última actividad quedó registrada. Revisa tu evidencia mientras se prepara el siguiente paso.
                  </p>
                </CardContent>
              </Card>
            )}

            {completedLoads.length > 0 && (
              <section aria-label="Actividades registradas" className="space-y-3">
                <div className="flex items-center gap-2 text-[#253A5F]">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  <h2 className="text-sm font-bold">Actividades registradas ({completedLoads.length})</h2>
                </div>
                <p className="text-sm leading-6 text-[#5D6B7A]">
                  Tu trabajo queda guardado como evidencia para revisar tu avance y orientar el siguiente foco.
                </p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {completedLoads.map((load) => {
                    const completedSession = load.tutoringSessions.find((session) => session.status === 'completed')
                    const report = completedSession?.responses.find((response) => response.responseType === 'answer')?.content ?? null
                    const hasContent = !!getStudyLoadContent(load.title)
                    return (
                      <li key={load.id}>
                        <LoadCard load={load}>
                          {report && (
                            <p className="mt-3 text-sm leading-6 text-[#5D6B7A]">
                              <span className="font-bold text-[#253A5F]">Tu reporte:</span> {report}
                            </p>
                          )}
                          {hasContent && (
                            <div className="mt-3">
                              <Link
                                href={`/now/study-loads/${load.id}`}
                                className="text-sm font-bold text-[#192F56] underline-offset-4 hover:underline"
                              >
                                Ver actividad
                              </Link>
                            </div>
                          )}
                        </LoadCard>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}
          </>
        )}
      </div>

      {isAdminSession && (
        <div className="mt-8 text-center">
          <Link href="/admin" className="text-xs text-[#5D6B7A] underline-offset-4 hover:underline">
            Ir al panel de administración
          </Link>
        </div>
      )}
      </DashboardContent>
      <DashboardFooterNav />
    </Shell>
  )
}
