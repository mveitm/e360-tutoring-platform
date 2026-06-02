import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  CircleDot,
  GraduationCap,
  Route,
  Sparkles,
} from 'lucide-react'

const tutoringOptions = [
  {
    title: 'PAES Matemáticas M1',
    description: 'Foco actual de la experiencia guiada.',
    accent: 'border-[#79A6A4] bg-gradient-to-br from-[#FBFCF6] via-[#EEF4F7] to-[#E5F0EF]',
    icon: 'bg-[#192F56] text-white',
  },
  {
    title: 'PAES Matemáticas M2',
    description: 'Parte de la arquitectura visual de tutorías Bexauri.',
    accent: 'border-[#DCE5EA] bg-[#FBFCF6]',
    icon: 'bg-[#34215F] text-white',
  },
  {
    title: 'PAES Competencia Lectora',
    description: 'Ruta considerada dentro del sistema de acompañamiento.',
    accent: 'border-[#DCE5EA] bg-[#FBFCF6]',
    icon: 'bg-[#4B7B7C] text-white',
  },
]

const accessOptions = [
  {
    title: 'Iniciar',
    label: 'Opción principal',
    description: 'Entra a tu espacio de estudio y continúa desde tu último avance.',
    action: 'Iniciar sesión',
    href: '/login',
    icon: BookOpenCheck,
    card: 'border-[#79A6A4] bg-gradient-to-br from-[#FBFCF6] via-[#EEF4F7] to-[#E5F0EF] shadow-xl shadow-[#192F56]/12',
    iconWrap: 'bg-[#192F56] text-white',
    button: 'bg-[#192F56] text-white shadow-lg shadow-[#192F56]/20 hover:bg-[#253A5F]',
  },
  {
    title: 'Trial',
    label: '7 días de prueba',
    description: 'Una primera forma de conocer la experiencia de estudio de Bexauri.',
    action: 'Explorar trial',
    href: '#opciones',
    icon: Sparkles,
    card: 'border-[#A99AD2] bg-gradient-to-br from-[#FBFCF6] via-[#F2EFF8] to-[#DDD4F4]/70 shadow-lg shadow-[#34215F]/10',
    iconWrap: 'bg-[#34215F] text-white',
    button: 'border border-[#A99AD2] bg-white text-[#34215F] hover:bg-[#F2EFF8]',
  },
  {
    title: 'Suscripción',
    label: 'Acceso ilimitado',
    description: 'Una opción de continuidad para estudiar con actividades y seguimiento.',
    action: 'Ver suscripción',
    href: '#opciones',
    icon: Route,
    card: 'border-[#DCE5EA] bg-gradient-to-br from-[#FBFCF6] via-[#EEF4F7] to-[#F8F4EB] shadow-lg shadow-[#10213F]/8',
    iconWrap: 'bg-[#4B7B7C] text-white',
    button: 'border border-[#8EA5BA] bg-white text-[#192F56] hover:bg-[#EEF4F7]',
  },
]

const routeSteps = [
  {
    title: 'Comenzar',
    detail: 'Ubica el punto de partida y el foco de estudio.',
    tone: 'bg-[#FFF3D8] text-[#75531A]',
  },
  {
    title: 'Practicar',
    detail: 'Trabaja ejercicios conectados a una ruta clara.',
    tone: 'bg-[#E5F0EF] text-[#48656C]',
  },
  {
    title: 'Recibir retroalimentación',
    detail: 'Reconoce avances y ajustes después de practicar.',
    tone: 'bg-[#F2EFF8] text-[#34215F]',
  },
  {
    title: 'Continuar',
    detail: 'Avanza al siguiente foco sin perder continuidad.',
    tone: 'bg-[#EEF4F7] text-[#192F56]',
  },
]

const supportPoints = [
  'Una ruta visible para entender qué hacer ahora y qué viene después.',
  'Práctica con evidencia para reconocer avances concretos.',
  'Retroalimentación breve para ajustar el siguiente foco de estudio.',
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FBFCF6] text-[#10213F]">
      <section className="border-b border-[#E9DFCF] bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_46%,#F2EFF8_100%)]">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:min-h-[760px] lg:px-8">
          <header className="rounded-3xl border border-[#E2E8EC] bg-[#FBFCF6]/95 px-4 py-3 shadow-[0_10px_30px_rgba(16,33,63,0.08)] sm:px-5">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex min-w-0 items-center" aria-label="Bexauri">
                <span className="rounded-[22px] border border-[#E2E8EC] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(16,33,63,0.10)]">
                  <Image
                    src="/brand/bexauri-logo-provisional.png"
                    alt="Bexauri"
                    width={240}
                    height={96}
                    priority
                    className="h-11 w-[138px] rounded-xl object-cover object-center sm:h-12 sm:w-[164px]"
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

          <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.82fr)] lg:gap-10 lg:py-10">
            <section className="max-w-4xl" aria-labelledby="hero-heading">
              <div className="mb-5 inline-flex items-center rounded-full border border-[#DCE5EA] bg-[#FBFCF6]/90 px-3 py-1 text-sm font-bold text-[#34215F] shadow-sm shadow-[#10213F]/5">
                <CircleDot className="mr-2 h-4 w-4 text-[#F2B84B]" aria-hidden="true" />
                Experiencia de estudio guiado
              </div>
              <h1
                id="hero-heading"
                className="font-display text-4xl font-bold leading-[1.05] tracking-normal text-[#10213F] sm:text-5xl lg:text-[60px]"
              >
                Estudia{' '}
                <span className="rounded-2xl bg-[#F2EFF8] px-2 text-[#34215F] shadow-[inset_0_-0.2em_0_#DDD4F4]">
                  Matemáticas M1
                </span>{' '}
                con una ruta que te guía paso a paso.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5D6B7A] sm:text-xl">
                Bexauri organiza tu estudio, identifica tu ritmo, y te ayuda construir tu aprendizaje con cada ejercicio
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
                  href="#ruta-estudio"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#DCE5EA] bg-[#FBFCF6]/95 px-6 text-base font-bold text-[#192F56] shadow-sm transition hover:border-[#A6B3BE] hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#34215F]/15"
                >
                  Ver cómo guía
                </a>
              </div>
            </section>

            <aside className="rounded-3xl border border-[#DCE5EA] bg-[#FBFCF6]/88 p-5 shadow-[0_18px_48px_rgba(16,33,63,0.12)] sm:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4B7B7C]">Bexauri</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#10213F]">Guía, práctica y continuidad</h2>
              <p className="mt-3 text-base leading-7 text-[#5D6B7A]">
                Una entrada ordenada para estudiar con foco, revisar avances y sostener una secuencia.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-[#E2E8EC] bg-white p-4">
                  <div className="flex items-center justify-between text-sm font-bold text-[#253A5F]">
                    <span>Foco actual</span>
                    <span className="rounded-full bg-[#E5F0EF] px-3 py-1 text-[#48656C]">M1</span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#EEF4F7]">
                  <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#4B7B7C,#34215F)]" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#FBFCF6] px-5 py-14 sm:px-8 lg:px-10" aria-labelledby="tutorias-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4B7B7C]">Arquitectura Bexauri</p>
              <h2 id="tutorias-heading" className="font-display text-3xl font-bold text-[#10213F]">
                Tutorías:
              </h2>
            </div>
            <span className="h-1.5 w-16 rounded-full bg-[#F2B84B]" aria-hidden="true" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {tutoringOptions.map((option) => (
              <article
                key={option.title}
                className={`rounded-3xl border p-5 shadow-[0_10px_30px_rgba(16,33,63,0.08)] ${option.accent}`}
              >
                <span className={`inline-flex rounded-2xl p-3 shadow-sm ${option.icon}`}>
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-[#10213F]">{option.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#5D6B7A]">{option.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="opciones"
        className="border-t border-[#E2E8EC] bg-[#F8F4EB] px-5 py-14 sm:px-8 lg:px-10"
        aria-labelledby="access-options-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4B7B7C]">Opciones de acceso</p>
              <h2 id="access-options-heading" className="font-display text-3xl font-bold text-[#10213F]">
                Elige cómo comenzar
              </h2>
            </div>
            <span className="h-1.5 w-16 rounded-full bg-[#34215F]" aria-hidden="true" />
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
        </div>
      </section>

      <section
        id="ruta-estudio"
        className="border-t border-[#E2E8EC] bg-[#FBFCF6] px-5 py-14 sm:px-8 lg:px-10"
        aria-labelledby="route-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <div className="mb-5 h-1.5 w-16 rounded-full bg-[#4B7B7C]" aria-hidden="true" />
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#34215F]">Secuencia pedagógica</p>
            <h2 id="route-heading" className="mt-2 font-display text-3xl font-bold text-[#10213F]">
              Ruta de estudio
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#5D6B7A]">
              Bexauri muestra una secuencia simple para comenzar, practicar, recibir retroalimentación y continuar.
            </p>
          </div>

          <div className="rounded-3xl border border-[#DCE5EA] bg-[#FBFCF6] p-5 shadow-[0_18px_48px_rgba(16,33,63,0.12)] sm:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              {routeSteps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-[#E2E8EC] bg-white p-4">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${step.tone}`}
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#10213F]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">{step.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#E2E8EC] bg-[#FBFCF6] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="mb-5 h-1.5 w-16 rounded-full bg-[#4B7B7C]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-bold text-[#10213F]">Una forma más clara de estudiar</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#5D6B7A]">
              La experiencia combina guía, práctica y retroalimentación para que cada sesión tenga continuidad.
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
