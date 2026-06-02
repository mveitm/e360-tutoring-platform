import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpenCheck, CheckCircle2, CircleDot, Route, Sparkles } from 'lucide-react'

const guidedSteps = [
  {
    label: 'Claridad inicial',
    detail: 'Ordena el foco de estudio antes de practicar.',
    tone: 'bg-[#FFF3D8] text-[#75531A]',
  },
  {
    label: 'Practica guiada',
    detail: 'Trabaja con actividades conectadas a la ruta.',
    tone: 'bg-[#E5F0EF] text-[#48656C]',
  },
  {
    label: 'Retroalimentacion',
    detail: 'Reconoce avance y define el siguiente ajuste.',
    tone: 'bg-[#F2EFF8] text-[#34215F]',
  },
]

const supportPoints = [
  'Ruta visible para saber que hacer ahora y que viene despues.',
  'Practica con evidencia para reconocer avances concretos.',
  'Retroalimentacion breve para ajustar el siguiente foco.',
]

const accessOptions = [
  {
    title: 'Iniciar',
    label: 'Opcion principal',
    description: 'Entra a tu espacio de estudio y continua desde tu ultimo avance.',
    action: 'Iniciar sesion',
    href: '/login',
    icon: BookOpenCheck,
    card: 'border-[#79A6A4] bg-gradient-to-br from-[#FBFCF6] via-[#EEF4F7] to-[#E5F0EF] shadow-xl shadow-[#192F56]/12',
    iconWrap: 'bg-[#192F56] text-white',
    button: 'bg-[#192F56] text-white shadow-lg shadow-[#192F56]/20 hover:bg-[#253A5F]',
  },
  {
    title: 'Trial',
    label: 'Exploracion guiada',
    description: 'Conoce como Bexauri organiza una experiencia inicial de estudio paso a paso.',
    action: 'Explorar opciones',
    href: '#opciones',
    icon: Sparkles,
    card: 'border-[#A99AD2] bg-gradient-to-br from-[#FBFCF6] via-[#F2EFF8] to-[#DDD4F4]/70 shadow-lg shadow-[#34215F]/10',
    iconWrap: 'bg-[#34215F] text-white',
    button: 'border border-[#A99AD2] bg-white text-[#34215F] hover:bg-[#F2EFF8]',
  },
  {
    title: 'Suscripcion',
    label: 'Continuidad',
    description: 'Revisa la opcion pensada para sostener estudio continuo cuando corresponda.',
    action: 'Ver continuidad',
    href: '#opciones',
    icon: Route,
    card: 'border-[#DCE5EA] bg-gradient-to-br from-[#FBFCF6] via-[#EEF4F7] to-[#F8F4EB] shadow-lg shadow-[#10213F]/8',
    iconWrap: 'bg-[#4B7B7C] text-white',
    button: 'border border-[#8EA5BA] bg-white text-[#192F56] hover:bg-[#EEF4F7]',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FBFCF6] text-[#10213F]">
      <section className="border-b border-[#E9DFCF] bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_45%,#F2EFF8_100%)]">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:min-h-[760px] lg:px-8">
          <header className="rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 px-4 py-3 shadow-[0_10px_30px_rgba(16,33,63,0.08)] sm:px-5">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex min-w-0 items-center" aria-label="Bexauri">
                <span className="rounded-2xl border border-[#E2E8EC] bg-white px-2.5 py-1.5 shadow-sm shadow-[#10213F]/10">
                  <Image
                    src="/brand/bexauri-logo-provisional.png"
                    alt="Bexauri"
                    width={220}
                    height={88}
                    priority
                    className="h-10 w-[126px] rounded-md object-cover object-center sm:h-11 sm:w-[150px]"
                  />
                </span>
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-[#192F56] px-4 text-sm font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.18)] transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
              >
                Iniciar
              </Link>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-6 py-7 lg:grid-cols-[minmax(0,0.94fr)_minmax(420px,1.06fr)] lg:gap-8 lg:py-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-[#DCE5EA] bg-[#FBFCF6]/90 px-3 py-1 text-sm font-bold text-[#34215F] shadow-sm shadow-[#10213F]/5">
                <CircleDot className="mr-2 h-4 w-4 text-[#F2B84B]" aria-hidden="true" />
                Estudio guiado M1
              </div>
              <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-normal text-[#10213F] sm:text-5xl lg:text-[58px]">
                Estudia Matematica M1 con una ruta que te guia paso a paso.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5D6B7A] sm:text-xl">
                Bexauri organiza tu avance, muestra evidencia de practica y te ayuda a reconocer el siguiente foco de
                estudio.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#192F56] px-6 text-base font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.18)] transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
                >
                  Iniciar experiencia
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
                <a
                  href="#guia"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#DCE5EA] bg-[#FBFCF6]/95 px-6 text-base font-bold text-[#192F56] shadow-sm transition hover:border-[#A6B3BE] hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#34215F]/15"
                >
                  Ver como guia
                </a>
              </div>
            </div>

            <aside
              id="guia"
              className="rounded-3xl border border-[#DCE5EA] bg-[#FBFCF6]/95 p-5 shadow-[0_18px_48px_rgba(16,33,63,0.14)] sm:p-6"
              aria-label="Vista previa de ruta guiada"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4B7B7C]">Ruta de estudio</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#10213F]">Progreso con siguiente foco</h2>
                </div>
                <span className="rounded-2xl bg-[#34215F] p-3 text-white shadow-[0_16px_38px_rgba(52,33,95,0.16)]">
                  <Route className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-[#E2E8EC] bg-white p-4">
                <div className="flex items-center justify-between text-sm font-bold text-[#253A5F]">
                  <span>Avance visible</span>
                  <span>3 pasos</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#EEF4F7]">
                  <div className="h-full w-[68%] rounded-full bg-[linear-gradient(90deg,#4B7B7C,#34215F)]" />
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {guidedSteps.map((step, index) => (
                  <div key={step.label} className="flex gap-3 rounded-2xl border border-[#E2E8EC] bg-white p-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${step.tone}`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#10213F]">{step.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#5D6B7A]">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <section id="opciones" className="pb-6 lg:pb-8" aria-labelledby="access-options-heading">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4B7B7C]">Opciones de acceso</p>
                <h2 id="access-options-heading" className="font-display text-2xl font-bold text-[#10213F] sm:text-3xl">
                  Elige como comenzar
                </h2>
              </div>
              <span className="h-1.5 w-16 rounded-full bg-[#F2B84B]" aria-hidden="true" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {accessOptions.map((option) => {
                const Icon = option.icon

                return (
                  <a
                    key={option.title}
                    href={option.href}
                    className={`group flex min-h-[236px] flex-col rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(16,33,63,0.14)] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 ${option.card}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className={`rounded-2xl p-3 shadow-sm ${option.iconWrap}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#5D6B7A]">
                        {option.label}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold text-[#10213F]">{option.title}</h3>
                    <p className="mt-3 min-h-[78px] text-base leading-7 text-[#5D6B7A]">{option.description}</p>
                    <span
                      className={`mt-auto inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-bold shadow-sm transition ${option.button}`}
                    >
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        </div>
      </section>

      <section className="border-t border-[#E2E8EC] bg-[#FBFCF6] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="mb-5 h-1.5 w-16 rounded-full bg-[#4B7B7C]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-bold text-[#10213F]">Una forma mas clara de estudiar</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#5D6B7A]">
              La experiencia combina guia, practica y retroalimentacion para que cada sesion tenga continuidad.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {supportPoints.map((point) => (
              <div
                key={point}
                className="rounded-3xl border border-[#E2E8EC] bg-white p-5 shadow-[0_10px_30px_rgba(16,33,63,0.08)]"
              >
                <CheckCircle2 className="h-6 w-6 text-[#4B7B7C]" aria-hidden="true" />
                <p className="mt-4 text-base leading-7 text-[#5D6B7A]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#253A5F] bg-[#10213F] px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#DCE5EA] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold text-white">Bexauri</span>
          <span>Experiencia de estudio guiada</span>
        </div>
      </footer>
    </main>
  )
}
