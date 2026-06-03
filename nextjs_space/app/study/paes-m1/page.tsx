import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ArrowLeft, BookOpenCheck, CheckCircle2, CircleDashed, Info, Route, Sparkles } from 'lucide-react'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
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
          program: { select: { code: true, name: true } },
        },
      })
    : null

  const currentCycle = activeEnrollment?.currentCycleId
    ? await prisma.learningCycle.findUnique({
        where: { id: activeEnrollment.currentCycleId },
        select: {
          cycleNumber: true,
          status: true,
          studyLoads: {
            where: { status: { in: ['pending', 'in_progress', 'completed'] } },
            select: { id: true, status: true },
          },
        },
      })
    : null

  const hasActiveEnrollment = Boolean(activeEnrollment)
  const capsuleCount = currentCycle?.studyLoads.length ?? 0
  const currentFocus = hasActiveEnrollment
    ? 'Continúa desde tu ciclo M1 activo cuando una cápsula esté disponible.'
    : 'Primero elige esta tutoría y prepara tu punto de partida.'

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
                <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">{currentFocus}</p>
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
