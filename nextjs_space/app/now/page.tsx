import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ArrowRight, Clock, Compass, Layers, Sparkles } from 'lucide-react'
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
  createdAt: Date
  updatedAt: Date
  tutoringSessions: Array<{
    id: string
    status: string
    completedAt: Date | null
    responses: Array<{
      id: string
      responseType: string
      content: string | null
    }>
  }>
}

type ActiveTutoring = {
  id: string
  programCode: string
  programName: string
  startedAt: Date
  cycle: {
    id: string
    cycleNumber: number
    status: string
    openedAt: Date
  } | null
  loads: LoadWithSessions[]
}

type CatalogTutoring = {
  code: string
  title: string
  description: string
  state: 'Disponible' | 'No disponible' | 'Activa' | 'Completada'
  action: string
  href?: string
  disabled?: boolean
}

type ActivityCandidate = {
  tutoring: ActiveTutoring
  load: LoadWithSessions
}

const catalogDefinitions = [
  {
    code: 'PAES_M1',
    shortCode: 'M1',
    title: 'PAES Matematicas M1',
    description: 'Refuerza contenidos de Matematica M1.',
    availableWhenProgramActive: true,
  },
  {
    code: 'PAES_M2',
    shortCode: 'M2',
    title: 'PAES Matematicas M2',
    description: 'Prepara Matematica M2 con foco en modelacion y funciones.',
    availableWhenProgramActive: true,
  },
  {
    code: 'PAES_L1',
    shortCode: 'L1',
    title: 'PAES Competencia Lectora',
    description: 'Comprension lectora PAES para una proxima etapa.',
    availableWhenProgramActive: false,
  },
] as const

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[100dvh] min-h-[100svh] overflow-hidden bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_48%,#EEF4F7_100%)] text-[#10213F]">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-2.5 py-2 sm:px-5 lg:px-8 lg:py-5">
        {children}
      </div>
    </main>
  )
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth pr-1 [scrollbar-width:thin]">
      <div className="pb-3">{children}</div>
    </div>
  )
}

function DashboardFooterNav() {
  return (
    <footer className="shrink-0 pt-2">
      <nav
        aria-label="Guia de navegacion del dashboard"
        className="grid grid-cols-3 gap-1 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 p-1.5 text-xs font-bold text-[#253A5F] shadow-[0_-8px_22px_rgba(16,33,63,0.08)] backdrop-blur"
      >
        <a href="#inicio" className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
          Inicio
        </a>
        <a href="#tutorias" className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
          Tutorias
        </a>
        <a href="#actividad" className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
          Actividad
        </a>
      </nav>
    </footer>
  )
}

function DashboardHeader({ studentName }: { studentName?: string }) {
  return (
    <header className="mb-1.5 shrink-0 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 px-2.5 py-1 shadow-[0_8px_20px_rgba(16,33,63,0.08)] sm:mb-4 sm:px-4 sm:py-2">
      <div className="flex items-center justify-between gap-3">
        <Link href="/now" className="flex min-w-0 items-center gap-3" aria-label="Bexauri">
          <span className="rounded-xl border border-[#DCE5EA] bg-white px-1.5 py-0.5 shadow-sm shadow-[#10213F]/10 sm:rounded-2xl sm:px-2 sm:py-1">
            <Image
              src="/brand/bexauri-logo-provisional.png"
              alt="Bexauri"
              width={220}
              height={88}
              priority
              className="h-6 w-[96px] rounded-lg object-cover object-center sm:h-9 sm:w-[132px]"
            />
          </span>
          <span className="hidden text-sm font-semibold text-[#5D6B7A] sm:inline">
            {studentName ? studentName : 'Bexauri'}
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-xs font-bold text-[#253A5F] md:flex" aria-label="Navegacion principal">
          <a href="#tutorias" className="rounded-full px-3 py-2 transition hover:bg-[#EEF4F7]">
            Tutorias
          </a>
          <a href="#actividad" className="rounded-full px-3 py-2 transition hover:bg-[#EEF4F7]">
            Actividad
          </a>
        </nav>
        <SignOutButton />
      </div>
    </header>
  )
}

function HeroSummary({ studentName }: { studentName?: string }) {
  return (
    <section id="inicio" className="rounded-3xl border border-[#E2E8EC] bg-[#FBFCF6] p-3.5 shadow-[0_14px_34px_rgba(16,33,63,0.09)] sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h1 className="font-display text-xl font-bold leading-tight text-[#10213F] sm:text-3xl">
            {studentName ? `Hola, ${studentName}.` : 'Bienvenido a Bexauri.'}
          </h1>
        </div>

        <div className="rounded-2xl border border-[#A99AD2]/60 bg-[linear-gradient(135deg,#F2EFF8_0%,#EEF4F7_100%)] p-3 text-[#10213F] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-[#10213F] text-[#F2B84B] shadow-[0_8px_18px_rgba(16,33,63,0.16)]">
              <Compass className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#34215F]">Que hago ahora</p>
              <p className="text-base font-bold leading-5 sm:text-lg">Selecciona una tutoria o matriculate en una nueva</p>
              <p className="mt-1 text-xs leading-5 text-[#5D6B7A] sm:text-sm">
                Continua desde una tarjeta concreta para mantener clara tu ruta de estudio.
              </p>
            </div>
          </div>
        </div>
      </div>
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

function getProgramShortCode(programCode: string) {
  return programCode.replace(/^PAES_/, '')
}

function getTutoringActionHref(tutoring: ActiveTutoring) {
  const actionableLoad = selectActivityCandidate([tutoring])?.load
  if (actionableLoad) return `/now/study-loads/${actionableLoad.id}`
  if (tutoring.programCode === 'PAES_M1') return '/study/paes-m1'
  return '#actividad'
}

function OwnTutoringSection({ tutorings }: { tutorings: ActiveTutoring[] }) {
  return (
    <section id="tutorias" className="mt-2 rounded-3xl border border-[#E2E8EC] bg-[#FBFCF6] p-2.5 shadow-[0_10px_30px_rgba(16,33,63,0.08)] sm:mt-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between gap-3 sm:mb-4">
        <div>
          <h2 className="mt-0.5 font-display text-lg font-bold text-[#10213F] sm:text-2xl">Tus Tutorias</h2>
          <p className="mt-1 text-sm leading-6 text-[#5D6B7A]">Tutorias activas o matriculadas para continuar desde una tarjeta concreta.</p>
        </div>
        <span className="hidden h-1.5 w-16 rounded-full bg-[#F2B84B] sm:block" aria-hidden="true" />
      </div>

      {tutorings.length === 0 ? (
        <EmptyState message="Aun no tienes tutorias activas. Revisa el catalogo Bexauri para iniciar una tutoria disponible." />
      ) : (
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1.5 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
          {tutorings.map((tutoring) => {
            const pendingCount = tutoring.loads.filter((load) => load.status === 'pending').length
            const inProgressCount = tutoring.loads.filter((load) => load.status === 'in_progress').length
            return (
              <article
                key={tutoring.id}
                className="min-w-[238px] flex-[0_0_80%] rounded-2xl border border-[#79A6A4] bg-[linear-gradient(180deg,#FBFCF6_0%,#E5F0EF_100%)] p-3 shadow-[0_8px_20px_rgba(16,33,63,0.07)] sm:flex-[0_0_42%] sm:rounded-3xl sm:p-4 md:min-w-0 md:flex-auto"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#192F56] px-2.5 text-xs font-bold text-white sm:h-10 sm:min-w-10 sm:px-3 sm:text-sm">
                    {getProgramShortCode(tutoring.programCode)}
                  </span>
                  <Badge variant="secondary" className="rounded-full bg-white/80 text-[9px] font-bold uppercase tracking-wide text-[#253A5F] sm:text-[10px]">
                    Activa
                  </Badge>
                </div>
                <h3 className="mt-3 font-display text-base font-bold leading-5 text-[#10213F] sm:text-lg sm:leading-6">{tutoring.programName}</h3>
                <p className="mt-1.5 text-xs leading-5 text-[#5D6B7A] sm:text-sm sm:leading-6">
                  {tutoring.cycle ? `Ciclo ${tutoring.cycle.cycleNumber} abierto.` : 'Tutoria activa sin ciclo abierto visible.'}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-1.5 rounded-2xl border border-white/70 bg-white/55 p-1.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5D6B7A]">Estado</p>
                    <p className="mt-0.5 text-[11px] font-bold leading-4 text-[#10213F]">Activa</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5D6B7A]">Pendientes</p>
                    <p className="mt-0.5 text-[11px] font-bold leading-4 text-[#10213F]">{pendingCount}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5D6B7A]">En curso</p>
                    <p className="mt-0.5 text-[11px] font-bold leading-4 text-[#10213F]">{inProgressCount}</p>
                  </div>
                </div>
                <Link
                  href={getTutoringActionHref(tutoring)}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#F2B84B]/40 bg-[linear-gradient(135deg,#EFA45F_0%,#D85B8C_55%,#A63D4F_100%)] px-3 py-1.5 text-xs font-bold text-white shadow-[0_0_18px_rgba(216,91,140,0.22),0_8px_18px_rgba(166,61,79,0.16)] transition hover:shadow-[0_0_22px_rgba(216,91,140,0.28),0_10px_20px_rgba(166,61,79,0.20)] focus:outline-none focus:ring-4 focus:ring-[#D85B8C]/20 sm:px-4 sm:py-2 sm:text-sm"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

function CatalogTutoringSection({ tutorings }: { tutorings: CatalogTutoring[] }) {
  return (
    <section className="mt-4 rounded-3xl border border-[#E2E8EC] bg-[#FBFCF6] p-2.5 shadow-[0_10px_30px_rgba(16,33,63,0.08)] sm:mt-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between gap-3 sm:mb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-[#10213F] sm:text-2xl">Tutorias Bexauri</h2>
          <p className="mt-1 text-sm leading-6 text-[#5D6B7A]">Catalogo visible con el estado contextual de cada tutoria.</p>
        </div>
        <Layers className="hidden h-5 w-5 text-[#34215F] sm:block" aria-hidden="true" />
      </div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1.5 [scrollbar-width:thin] md:mx-0 md:px-0">
        {tutorings.map((tutoring) => (
          <article
            key={tutoring.code}
            className="min-w-[232px] flex-[0_0_78%] rounded-2xl border border-[#DCE5EA] bg-white p-3 shadow-[0_8px_20px_rgba(16,33,63,0.07)] sm:flex-[0_0_34%] sm:rounded-3xl sm:p-4 lg:min-w-[260px]"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#34215F] px-2.5 text-xs font-bold text-white sm:h-10 sm:min-w-10 sm:px-3 sm:text-sm">
                {getProgramShortCode(tutoring.code)}
              </span>
              <Badge variant="secondary" className="rounded-full bg-[#EEF4F7] text-[9px] font-bold uppercase tracking-wide text-[#253A5F] sm:text-[10px]">
                {tutoring.state}
              </Badge>
            </div>
            <h3 className="mt-3 font-display text-base font-bold leading-5 text-[#10213F] sm:text-lg sm:leading-6">{tutoring.title}</h3>
            <p className="mt-1.5 text-xs leading-5 text-[#5D6B7A] sm:text-sm sm:leading-6">{tutoring.description}</p>
            {tutoring.href && !tutoring.disabled ? (
              <Link
                href={tutoring.href}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#4B7B7C]/25 bg-[#EEF4F7] px-3 py-1.5 text-xs font-bold text-[#192F56] transition hover:bg-[#E5F0EF] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 sm:px-4 sm:py-2 sm:text-sm"
              >
                {tutoring.action}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="mt-3 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#DCE5EA] bg-[#F5F7F8] px-3 py-1.5 text-xs font-bold text-[#6B7280] sm:px-4 sm:py-2 sm:text-sm"
              >
                {tutoring.action}
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
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

function getActivityRank(status: string) {
  if (status === 'in_progress') return 0
  if (status === 'pending') return 1
  if (status === 'completed') return 2
  return 3
}

function selectActivityCandidate(tutorings: ActiveTutoring[]): ActivityCandidate | null {
  const candidates = tutorings.flatMap((tutoring) => tutoring.loads.map((load) => ({ tutoring, load })))
  candidates.sort((a, b) => {
    const rankDiff = getActivityRank(a.load.status) - getActivityRank(b.load.status)
    if (rankDiff !== 0) return rankDiff
    return b.load.updatedAt.getTime() - a.load.updatedAt.getTime()
  })
  return candidates[0] ?? null
}

function getActivityAction(load: LoadWithSessions) {
  if (load.status === 'completed') return 'Ver feedback'
  if (load.status === 'in_progress') return 'Continuar capsula'
  return 'Iniciar capsula'
}

function getActivityStateLabel(load: LoadWithSessions) {
  if (load.status === 'completed') return 'Completada'
  if (load.status === 'in_progress') return 'En curso'
  return 'Pendiente'
}

function LatestActivitySection({ candidate }: { candidate: ActivityCandidate | null }) {
  return (
    <section id="actividad" className="mt-5 rounded-3xl border border-[#DCE5EA] bg-[#FBFCF6] p-3 shadow-[0_10px_30px_rgba(16,33,63,0.08)] sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-[#253A5F]">
        <Clock className="h-4 w-4" aria-hidden="true" />
        <h2 className="font-display text-lg font-bold text-[#10213F] sm:text-2xl">Ultima actividad de estudio</h2>
      </div>
      {!candidate ? (
        <EmptyState message="Aun no hay una capsula disponible. Cuando exista una actividad, aparecera aqui." />
      ) : (
        <LoadCard load={candidate.load}>
          <div className="mt-3 grid gap-2 rounded-2xl border border-[#E2E8EC] bg-[#EEF4F7]/70 p-3 text-sm text-[#253A5F] sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#5D6B7A]">Tutoria</p>
              <p className="mt-1 font-bold">{candidate.tutoring.programCode}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#5D6B7A]">Estado</p>
              <p className="mt-1 font-bold">{getActivityStateLabel(candidate.load)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#5D6B7A]">Accion</p>
              <p className="mt-1 font-bold">{getActivityAction(candidate.load)}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            {getStudyLoadContent(candidate.load.title) ? (
              <Link href={`/now/study-loads/${candidate.load.id}`} className="text-sm font-bold text-[#192F56] underline-offset-4 hover:underline">
                Ver capsula
              </Link>
            ) : (
              <span />
            )}
            {candidate.load.status === 'pending' && <StartLoadButton loadId={candidate.load.id} />}
            {candidate.load.status === 'in_progress' && !getStudyLoadContent(candidate.load.title) && <CompleteLoadButton loadId={candidate.load.id} />}
          </div>
        </LoadCard>
      )}
    </section>
  )
}

function TutorMessageSection({ hasActiveTutorings }: { hasActiveTutorings: boolean }) {
  return (
    <section className="mt-5 rounded-3xl border border-[#DCE5EA] bg-white p-4 shadow-[0_10px_30px_rgba(16,33,63,0.08)] sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F2EFF8] text-[#34215F]">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-[#10213F]">Mensaje de tu tutor Bexauri</h2>
          <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
            {hasActiveTutorings
              ? 'Selecciona una tutoria activa para continuar tu avance o revisa tu ultima actividad de estudio.'
              : 'Selecciona una tutoria o matriculate en una nueva cuando este disponible.'}
          </p>
        </div>
      </div>
    </section>
  )
}

function buildActiveTutorings(enrollments: Array<{
  id: string
  startedAt: Date
  program: { code: string; name: string }
  learningCycles: Array<{
    id: string
    cycleNumber: number
    status: string
    openedAt: Date
    studyLoads: LoadWithSessions[]
  }>
}>): ActiveTutoring[] {
  return enrollments.map((enrollment) => {
    const cycle = enrollment.learningCycles[0] ?? null
    return {
      id: enrollment.id,
      programCode: enrollment.program.code,
      programName: enrollment.program.name,
      startedAt: enrollment.startedAt,
      cycle: cycle
        ? {
            id: cycle.id,
            cycleNumber: cycle.cycleNumber,
            status: cycle.status,
            openedAt: cycle.openedAt,
          }
        : null,
      loads: cycle?.studyLoads ?? [],
    }
  })
}

function buildCatalogTutorings(args: {
  programs: Array<{ code: string; name: string; status: string }>
  activeTutorings: ActiveTutoring[]
}): CatalogTutoring[] {
  const activeByCode = new Map(args.activeTutorings.map((tutoring) => [tutoring.programCode, tutoring]))
  const programByCode = new Map(args.programs.map((program) => [program.code, program]))

  return catalogDefinitions.map((definition) => {
    const activeTutoring = activeByCode.get(definition.code)
    if (activeTutoring) {
      return {
        code: definition.code,
        title: activeTutoring.programName,
        description: definition.description,
        state: 'Activa',
        action: 'Continuar',
        href: getTutoringActionHref(activeTutoring),
      }
    }

    const program = programByCode.get(definition.code)
    const isReleased = definition.availableWhenProgramActive && program?.status === 'active'
    return {
      code: definition.code,
      title: program?.name ?? definition.title,
      description: definition.description,
      state: isReleased ? 'Disponible' : 'No disponible',
      action: isReleased ? 'Matricularme' : 'Proximamente',
      disabled: true,
    }
  })
}

function AdminLink({ isAdminSession }: { isAdminSession: boolean }) {
  if (!isAdminSession) return null
  return (
    <div className="mt-8 text-center">
      <Link href="/admin" className="text-xs text-[#5D6B7A] underline-offset-4 hover:underline">
        Ir al panel de administracion
      </Link>
    </div>
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

  const programs = await prisma.program.findMany({
    where: { code: { in: catalogDefinitions.map((definition) => definition.code) } },
    select: { code: true, name: true, status: true },
    orderBy: { code: 'asc' },
  })

  const enrollments = student
    ? await prisma.studentProgramInstance.findMany({
        where: { studentId: student.id, status: 'active' },
        orderBy: { startedAt: 'asc' },
        select: {
          id: true,
          startedAt: true,
          program: { select: { code: true, name: true } },
          learningCycles: {
            where: { status: 'open' },
            orderBy: { cycleNumber: 'desc' },
            take: 1,
            select: {
              id: true,
              cycleNumber: true,
              status: true,
              openedAt: true,
              studyLoads: {
                where: { status: { in: ['pending', 'in_progress', 'completed'] } },
                orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
                select: {
                  id: true,
                  title: true,
                  loadType: true,
                  status: true,
                  createdAt: true,
                  updatedAt: true,
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
              },
            },
          },
        },
      })
    : []

  const activeTutorings = buildActiveTutorings(enrollments)
  const catalogTutorings = buildCatalogTutorings({ programs, activeTutorings })
  const activityCandidate = selectActivityCandidate(activeTutorings)

  return (
    <Shell>
      <DashboardHeader studentName={studentName} />
      <DashboardContent>
        <HeroSummary studentName={studentName} />
        <OwnTutoringSection tutorings={activeTutorings} />
        <CatalogTutoringSection tutorings={catalogTutorings} />
        <LatestActivitySection candidate={activityCandidate} />
        <TutorMessageSection hasActiveTutorings={activeTutorings.length > 0} />
        <AdminLink isAdminSession={isAdminSession} />
      </DashboardContent>
      <DashboardFooterNav />
    </Shell>
  )
}
