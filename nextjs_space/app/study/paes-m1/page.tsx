import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ArrowLeft, BookOpenCheck, CheckCircle2, CircleDashed, Info, Route, Sparkles } from 'lucide-react'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

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
      aria-describedby="matricula-pendiente"
    >
      Matricularse
    </button>
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
    : 'Primero confirma la tutoría M1. La matrícula real queda pendiente para una fase posterior.'

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_48%,#EEF4F7_100%)] text-[#10213F]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 py-3 sm:px-5 lg:px-8 lg:py-5">
        <header className="shrink-0 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 px-3 py-2 shadow-[0_8px_20px_rgba(16,33,63,0.08)] sm:px-4">
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
              <span className="hidden text-sm font-semibold text-[#5D6B7A] sm:inline">Bexauri</span>
            </Link>
            <Link
              href="/now"
              className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-[#DCE5EA] bg-white px-3 text-xs font-bold text-[#192F56] shadow-sm transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 sm:px-4 sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver
            </Link>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth pr-1 [scrollbar-width:thin]">
          <section className="mt-3 rounded-3xl border border-[#E2E8EC] bg-[#FBFCF6] p-4 shadow-[0_14px_34px_rgba(16,33,63,0.09)] sm:mt-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#34215F]">Tutoría M1</p>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-[#10213F] sm:text-5xl">
                  PAES Matemáticas M1
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[#5D6B7A] sm:text-lg sm:leading-8">
                  Fortalece tus destrezas en los 4 ejes de Matemáticas M1.
                </p>
              </div>

              <div className="rounded-2xl border border-[#A99AD2]/60 bg-[linear-gradient(135deg,#F2EFF8_0%,#EEF4F7_100%)] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <StatusAction hasActiveEnrollment={hasActiveEnrollment} />
                  <details className="group">
                    <summary className="inline-flex min-h-11 cursor-pointer list-none items-center justify-center gap-2 rounded-full border border-[#DCE5EA] bg-white px-5 text-sm font-bold text-[#192F56] shadow-sm transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
                      <Info className="h-4 w-4" aria-hidden="true" />
                      Tutoría Info
                    </summary>
                    <div className="mt-4 rounded-2xl border border-[#DCE5EA] bg-[#FBFCF6] p-4 text-sm leading-6 text-[#5D6B7A] shadow-[0_10px_24px_rgba(16,33,63,0.08)]">
                      <p className="font-semibold text-[#253A5F]">
                        Bexauri organiza tu estudio en cápsulas breves, revisa tu avance y te ayuda a continuar con foco.
                      </p>
                      <ol className="mt-3 list-decimal space-y-1 pl-5">
                        <li>Ubicamos tu punto de partida.</li>
                        <li>Trabajas con pocos ejercicios conectados.</li>
                        <li>Revisas aciertos y recibes ayuda en lo que costó.</li>
                        <li>Avanzas al siguiente foco de estudio.</li>
                      </ol>
                    </div>
                  </details>
                </div>
                {!hasActiveEnrollment && (
                  <p id="matricula-pendiente" className="mt-3 text-xs leading-5 text-[#5D6B7A]">
                    Acción visual en esta fase. No crea matrícula ni modifica datos.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section id="progreso" className="mt-3 grid gap-3 sm:mt-5 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-3xl border border-[#E2E8EC] bg-white p-4 shadow-[0_10px_30px_rgba(16,33,63,0.08)]">
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
            className="grid grid-cols-3 gap-1 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 p-1.5 text-xs font-bold text-[#253A5F] shadow-[0_-8px_22px_rgba(16,33,63,0.08)] backdrop-blur"
          >
            <Link href="/now" className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
              Volver a Dashboard
            </Link>
            <a href="#progreso" className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
              Cápsulas
            </a>
            <a href="#progreso" className="inline-flex min-h-9 items-center justify-center rounded-xl px-2 transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20">
              Progreso
            </a>
          </nav>
        </footer>
      </div>
    </main>
  )
}
