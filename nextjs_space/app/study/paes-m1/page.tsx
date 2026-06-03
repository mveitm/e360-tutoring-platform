import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, CircleDashed, Info, Route, Sparkles } from 'lucide-react'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { getStudyLoadContent } from '@/lib/study-load-content'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const dynamic = 'force-dynamic'

const m1Available = true

type CapsuleStatus = 'pending' | 'in_progress' | 'completed'

type CapsuleSummary = {
  id: string
  title: string
  loadType: string
  status: CapsuleStatus
  createdAt: Date
  updatedAt: Date
  tutoringSessions: Array<{
    status: string
    completedAt: Date | null
  }>
}

const capsuleStatusLabels: Record<CapsuleStatus, string> = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  completed: 'Completada',
}

function pickCurrentCapsule(studyLoads: CapsuleSummary[]) {
  const inProgress = studyLoads
    .filter((load) => load.status === 'in_progress')
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0]
  if (inProgress) return inProgress

  const pending = studyLoads
    .filter((load) => load.status === 'pending')
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0]
  if (pending) return pending

  return studyLoads
    .filter((load) => load.status === 'completed')
    .sort((a, b) => {
      const aCompletedAt = a.tutoringSessions.find((session) => session.status === 'completed')?.completedAt
      const bCompletedAt = b.tutoringSessions.find((session) => session.status === 'completed')?.completedAt
      const ta = aCompletedAt?.getTime() ?? a.updatedAt.getTime()
      const tb = bCompletedAt?.getTime() ?? b.updatedAt.getTime()
      return tb - ta
    })[0] ?? null
}

function StatusAction({ hasActiveEnrollment }: { hasActiveEnrollment: boolean }) {
  if (!m1Available) {
    return (
      <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E9DFCF] bg-[#FFF3D8] px-5 text-sm font-bold text-[#75531A]">
        No disponible
      </span>
    )
  }

  if (hasActiveEnrollment) {
    return (
      <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#79A6A4] bg-[#E5F0EF] px-5 text-sm font-bold text-[#192F56]">
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        Tutoría Activa
      </span>
    )
  }

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#F2B84B]/45 bg-[linear-gradient(135deg,#F2B84B_0%,#D85B8C_52%,#A63D4F_100%)] px-5 text-sm font-bold text-white shadow-[0_0_24px_rgba(216,91,140,0.22),0_12px_28px_rgba(166,61,79,0.18)] focus:outline-none focus:ring-4 focus:ring-[#D85B8C]/20"
    >
      Matricularse
    </button>
  )
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <article className="rounded-2xl border border-white/70 bg-white/70 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#5D6B7A]">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-[#10213F]">{value}</p>
      <p className="mt-1 text-xs leading-5 text-[#5D6B7A]">{description}</p>
    </article>
  )
}

function CurrentCapsuleCard({ currentCapsule }: { currentCapsule: CapsuleSummary | null }) {
  if (!currentCapsule) {
    return (
      <article className="rounded-3xl border border-[#E2E8EC] bg-white p-4 shadow-[0_10px_30px_rgba(16,33,63,0.08)] sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F2EFF8] text-[#34215F]">
            <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#34215F]">Siguiente cápsula</p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#10213F]">Aún no tienes una cápsula disponible.</h2>
            <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
              Cuando haya una cápsula lista, aparecerá aquí con una acción clara.
            </p>
          </div>
        </div>
      </article>
    )
  }

  const content = getStudyLoadContent(currentCapsule.title)
  const statusLabel = capsuleStatusLabels[currentCapsule.status]
  const topic = content?.topic ?? 'Foco inicial'

  return (
    <article className="rounded-3xl border border-[#79A6A4] bg-[linear-gradient(135deg,#FBFCF6_0%,#E5F0EF_100%)] p-4 shadow-[0_14px_34px_rgba(16,33,63,0.10)] sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#34215F]">Siguiente cápsula</p>
          <h2 className="mt-1 font-display text-xl font-bold leading-tight text-[#10213F] sm:text-2xl">
            {currentCapsule.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#253A5F]">
            <span className="rounded-full border border-[#DCE5EA] bg-white/80 px-3 py-1">
              Estado: {statusLabel}
            </span>
            <span className="rounded-full border border-[#DCE5EA] bg-white/80 px-3 py-1">
              Cápsula
            </span>
            <span className="rounded-full border border-[#DCE5EA] bg-white/80 px-3 py-1">
              {topic}
            </span>
          </div>
        </div>
        <Link
          href={`/now/study-loads/${currentCapsule.id}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#F2B84B]/45 bg-[linear-gradient(135deg,#F2B84B_0%,#D85B8C_52%,#A63D4F_100%)] px-5 text-sm font-bold text-white shadow-[0_0_24px_rgba(216,91,140,0.22),0_12px_28px_rgba(166,61,79,0.18)] transition hover:shadow-[0_0_28px_rgba(216,91,140,0.30),0_14px_30px_rgba(166,61,79,0.22)] focus:outline-none focus:ring-4 focus:ring-[#D85B8C]/20"
        >
          Ver cápsula
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

function TutoringInfoContent() {
  return (
    <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100vw-1.5rem)] max-w-lg overflow-y-auto rounded-3xl border-[#DCE5EA] bg-[#FBFCF6] p-5 text-[#10213F] shadow-[0_18px_48px_rgba(16,33,63,0.18)] sm:p-6">
      <DialogHeader className="text-left">
        <DialogTitle className="font-display text-2xl font-bold text-[#10213F]">Tutoría Info</DialogTitle>
        <DialogDescription className="text-sm leading-6 text-[#5D6B7A]">
          Te guiaremos en el desarrollo de las siguientes destrezas:
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-5 text-sm leading-6 text-[#253A5F]">
        <ul className="grid gap-2 rounded-2xl border border-[#DCE5EA] bg-[#EEF4F7] p-3 font-semibold text-[#192F56]">
          <li>Números.</li>
          <li>Álgebra y funciones.</li>
          <li>Geometría.</li>
          <li>Probabilidad y estadística.</li>
        </ul>

        <div>
          <h3 className="font-display text-lg font-bold text-[#10213F]">La metodología será:</h3>
          <div className="mt-3 space-y-3">
            <p><span className="font-bold text-[#34215F]">Tú:</span> Resuelves una cápsula de pocos ejercicios.</p>
            <p><span className="font-bold text-[#4B7B7C]">Bexauri:</span> Te dice en cuáles ejercicios acertaste y te entrega ayuda paso a paso donde lo necesitas.</p>
            <p><span className="font-bold text-[#34215F]">Tú:</span> Revisas la ayuda paso a paso, tomas apuntes y te preparas para la siguiente cápsula.</p>
            <p><span className="font-bold text-[#4B7B7C]">Bexauri:</span> Analiza tu resultado y te entrega la siguiente cápsula más adecuada para ti.</p>
          </div>
        </div>

        <p>
          Este ciclo, con tiempo y dedicación, se repite logrando que tengas la ruta más directa para mejorar tu resultado.
          Verás un indicador de desempeño porcentual que te servirá de referencia para tener una visión general de cómo vas.
        </p>
        <p className="rounded-2xl border border-[#E9DFCF] bg-[#FFF3D8] p-3 font-bold text-[#75531A]">
          Bienvenido a la tutoría PAES Matemáticas M1. Estudia confiando en ti y con todas tus ganas!
        </p>
      </div>

      <DialogFooter>
        <DialogClose className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#192F56] px-5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.16)] transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
          Volver
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

export default async function PaesM1StudyPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/login')
  }

  const student = await prisma.student.findUnique({
    where: { email: session.user.email },
    select: { id: true, firstName: true },
  })

  const activeEnrollment = student
    ? await prisma.studentProgramInstance.findFirst({
        where: {
          studentId: student.id,
          status: 'active',
          program: { code: 'PAES_M1' },
        },
        select: {
          id: true,
          currentCycleId: true,
          startedAt: true,
          program: { select: { code: true, name: true } },
        },
      })
    : null

  const currentCycle = activeEnrollment?.currentCycleId
    ? await prisma.learningCycle.findUnique({
        where: { id: activeEnrollment.currentCycleId },
        select: {
          id: true,
          cycleNumber: true,
          status: true,
          openedAt: true,
          studyLoads: {
            where: { status: { in: ['pending', 'in_progress', 'completed'] } },
            orderBy: { createdAt: 'asc' },
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
                  status: true,
                  completedAt: true,
                },
              },
            },
          },
        },
      })
    : null

  const hasActiveEnrollment = Boolean(activeEnrollment)
  const studyLoads = (currentCycle?.studyLoads ?? []) as CapsuleSummary[]
  const currentCapsule = pickCurrentCapsule(studyLoads)
  const capsuleCount = studyLoads.length
  const completedCapsules = studyLoads.filter((load) => load.status === 'completed').length
  const cycleLabel = currentCycle
    ? `Ciclo ${currentCycle.cycleNumber} ${currentCycle.status === 'open' ? 'abierto' : currentCycle.status}`
    : 'Estado inicial'
  const currentFocus = hasActiveEnrollment
    ? 'Continúa desde tu ciclo M1 activo cuando una cápsula esté disponible.'
    : 'Primero elige esta tutoría y prepara tu punto de partida.'
  const displayFocus = hasActiveEnrollment
    ? currentCapsule
      ? getStudyLoadContent(currentCapsule.title)?.topic ?? 'Foco inicial'
      : 'Foco inicial'
    : currentFocus

  return (
    <Dialog>
      <main className="h-[100dvh] min-h-[100svh] overflow-hidden bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_48%,#EEF4F7_100%)] text-[#10213F]">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-2.5 py-2 sm:px-5 lg:px-8 lg:py-5">
          <header className="mb-1.5 shrink-0 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 px-2.5 py-1 shadow-[0_8px_20px_rgba(16,33,63,0.08)] sm:mb-4 sm:px-4 sm:py-2">
            <div className="flex items-center justify-between gap-3">
              <Link href="/now" className="flex min-w-0 items-center gap-2" aria-label="Bexauri">
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
                <span className="hidden text-sm font-semibold text-[#5D6B7A] sm:inline">PAES Matemáticas M1</span>
              </Link>
              <Link
                href="/now"
                className="inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#DCE5EA] bg-white px-3 text-xs font-bold text-[#192F56] shadow-sm transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 sm:min-h-9 sm:px-4 sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver
              </Link>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth pr-1 [scrollbar-width:thin]">
            <section className="rounded-3xl border border-[#E2E8EC] bg-[#FBFCF6] p-3.5 shadow-[0_14px_34px_rgba(16,33,63,0.09)] sm:p-6">
              <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#34215F]">Tutoría M1</p>
                  <h1 className="mt-1 font-display text-2xl font-bold leading-tight text-[#10213F] sm:text-5xl">
                    PAES Matemáticas M1
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5D6B7A] sm:text-lg sm:leading-8">
                    Fortalece tus destrezas en los 4 ejes de Matemáticas M1.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#A99AD2]/60 bg-[linear-gradient(135deg,#F2EFF8_0%,#EEF4F7_100%)] p-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <StatusAction hasActiveEnrollment={hasActiveEnrollment} />
                    <DialogTrigger className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#DCE5EA] bg-white px-5 text-sm font-bold text-[#192F56] shadow-sm transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
                      <Info className="h-4 w-4" aria-hidden="true" />
                      Tutoría Info
                    </DialogTrigger>
                  </div>
                </div>
              </div>
            </section>

            <section id="progreso" className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {hasActiveEnrollment && (
                <>
                  <article className="rounded-3xl border border-[#A99AD2]/60 bg-[linear-gradient(135deg,#F2EFF8_0%,#EEF4F7_100%)] p-4 shadow-[0_10px_30px_rgba(16,33,63,0.08)] md:col-span-2 lg:col-span-4">
                    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#34215F]">Estado inicial</p>
                        <h2 className="mt-1 font-display text-2xl font-bold text-[#10213F]">Tutoría Activa</h2>
                        <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
                          Tu tutoría PAES Matemáticas M1 está activa. Revisa tu siguiente cápsula y avanza desde el visor cuando estés listo.
                        </p>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3">
                        <StatCard
                          label="Cápsulas trabajadas"
                          value={`${completedCapsules} cápsula${completedCapsules === 1 ? '' : 's'}`}
                          description={capsuleCount > 0 ? `${capsuleCount} cápsula${capsuleCount === 1 ? '' : 's'} en tu ciclo.` : '0 cápsulas visibles.'}
                        />
                        <StatCard
                          label="Logro"
                          value="--%"
                          description="Indicador pendiente de datos confiables."
                        />
                        <StatCard
                          label="Foco actual"
                          value={displayFocus}
                          description={cycleLabel}
                        />
                      </div>
                    </div>
                  </article>
                  <div className="md:col-span-2 lg:col-span-4">
                    <CurrentCapsuleCard currentCapsule={currentCapsule} />
                  </div>
                </>
              )}

              <article id="capsulas" className="rounded-3xl border border-[#E2E8EC] bg-white p-4 shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
                <BookOpenCheck className="h-6 w-6 text-[#4B7B7C]" aria-hidden="true" />
                <h2 className="mt-4 font-display text-lg font-bold text-[#10213F]">Cápsulas</h2>
                <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
                  {capsuleCount > 0
                    ? `${capsuleCount} cápsula${capsuleCount === 1 ? '' : 's'} en tu ciclo activo.`
                    : 'Aún sin cápsulas visibles para iniciar aquí.'}
                </p>
              </article>
              <article className="rounded-3xl border border-[#E2E8EC] bg-white p-4 shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
                <CircleDashed className="h-6 w-6 text-[#34215F]" aria-hidden="true" />
                <h2 className="mt-4 font-display text-lg font-bold text-[#10213F]">Progreso</h2>
                <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">Resumen sobrio pendiente de datos pedagógicos consolidados.</p>
              </article>
              <article className="rounded-3xl border border-[#E2E8EC] bg-white p-4 shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
                <Route className="h-6 w-6 text-[#F2B84B]" aria-hidden="true" />
                <h2 className="mt-4 font-display text-lg font-bold text-[#10213F]">Foco actual</h2>
                <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">{displayFocus}</p>
              </article>
              <article className="rounded-3xl border border-[#E2E8EC] bg-white p-4 shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
                <Sparkles className="h-6 w-6 text-[#D85B8C]" aria-hidden="true" />
                <h2 className="mt-4 font-display text-lg font-bold text-[#10213F]">Evidencia</h2>
                <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">La retroalimentación futura quedará contenida en este espacio.</p>
              </article>
            </section>
          </div>

          <footer className="shrink-0 pt-2">
            <nav
              aria-label="Navegación de Study Page"
              className="grid grid-cols-4 gap-1 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 p-1.5 text-xs font-bold text-[#253A5F] shadow-[0_-8px_22px_rgba(16,33,63,0.08)] backdrop-blur"
            >
              <Link href="/now" className="inline-flex min-h-9 items-center justify-center rounded-xl px-1 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
                Dashboard
              </Link>
              <a href="#capsulas" className="inline-flex min-h-9 items-center justify-center rounded-xl px-1 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
                Cápsulas
              </a>
              <a href="#progreso" className="inline-flex min-h-9 items-center justify-center rounded-xl px-1 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
                Progreso
              </a>
              <DialogTrigger className="inline-flex min-h-9 items-center justify-center rounded-xl px-1 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
                Info
              </DialogTrigger>
            </nav>
          </footer>
        </div>
      </main>
      <TutoringInfoContent />
    </Dialog>
  )
}
