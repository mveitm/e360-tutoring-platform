import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Route } from 'lucide-react'

const tutoringOptions = [
  {
    code: 'M1',
    title: 'PAES Matemáticas M1',
    accent: 'border-[#79A6A4] bg-[#E5F0EF] text-[#192F56]',
    badge: 'bg-[#192F56] text-white',
  },
  {
    code: 'M2',
    title: 'PAES Matemáticas M2',
    accent: 'border-[#A99AD2] bg-[#F2EFF8] text-[#34215F]',
    badge: 'bg-[#34215F] text-white',
  },
  {
    code: 'CL',
    title: 'PAES Competencia Lectora',
    accent: 'border-[#E9DFCF] bg-[#FFF3D8] text-[#75531A]',
    badge: 'bg-[#4B7B7C] text-white',
  },
]

const subscriptionOptions = [
  {
    title: 'Trial',
    detail: 'explorar el piloto guiado',
    accent: 'border-[#A99AD2] bg-[#F2EFF8] text-[#34215F]',
  },
  {
    title: 'Suscripción',
    detail: 'ver continuidad disponible',
    accent: 'border-[#79A6A4] bg-[#E5F0EF] text-[#192F56]',
  },
]

const routeSteps = [
  {
    title: 'Comenzar',
    detail: 'Ubicamos tu punto de partida en cada tutoría',
    tone: 'bg-[#FFF3D8] text-[#75531A]',
  },
  {
    title: 'Practicar',
    detail: 'Trabajas con pocos ejercicios conectados',
    tone: 'bg-[#E5F0EF] text-[#48656C]',
  },
  {
    title: 'Revisar',
    detail: 'Identificas tus aciertos y recibes ayuda en lo que te costó',
    tone: 'bg-[#F2EFF8] text-[#34215F]',
  },
  {
    title: 'Continuar',
    detail: 'Avanzas al siguiente foco de estudio.',
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
      <section className="border-b border-[#E9DFCF] bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_52%,#F2EFF8_100%)]">
        <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-4 py-3 sm:px-6 lg:min-h-[760px] lg:px-8 lg:py-4">
          <header className="rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 px-3 py-2 shadow-[0_10px_24px_rgba(16,33,63,0.08)] sm:px-4">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="flex min-w-0 items-center" aria-label="Bexauri">
                <span className="rounded-2xl border border-[#DCE5EA] bg-white px-2.5 py-2 shadow-[0_8px_18px_rgba(16,33,63,0.12)]">
                  <Image
                    src="/brand/logobexauri_v1.png"
                    alt="Bexauri"
                    width={220}
                    height={88}
                    priority
                    className="h-10 w-[74px] rounded-lg object-contain object-center sm:h-12 sm:w-[88px]"
                  />
                </span>
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-full bg-[#192F56] px-4 text-sm font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.16)] transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
              >
                Iniciar
              </Link>
            </div>
          </header>

          <section className="pt-5 sm:pt-7 lg:max-w-5xl lg:pt-10" aria-labelledby="hero-heading">
            <h1
              id="hero-heading"
              className="font-display text-[2rem] font-bold leading-[1.08] tracking-normal text-[#10213F] sm:text-5xl lg:text-[60px]"
            >
              Estudia <span className="text-[#0896A6]">Matemáticas M1</span> con una ruta que te guía paso a paso.
            </h1>
            <p className="mt-3 max-w-3xl text-[0.98rem] leading-6 text-[#5D6B7A] sm:mt-5 sm:text-xl sm:leading-8">
              Bexauri organiza tu estudio, identifica tu ritmo, y te ayuda construir tu aprendizaje con cada ejercicio
            </p>
          </section>

          <section className="pt-4 sm:pt-7" aria-labelledby="tutorias-heading">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 id="tutorias-heading" className="font-display text-lg font-bold text-[#10213F] sm:text-2xl">
                Tutorías:
              </h2>
              <span className="h-1 w-12 rounded-full bg-[#F2B84B]" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {tutoringOptions.map((option) => (
                <article
                  key={option.title}
                  className={`min-h-[96px] rounded-2xl border p-2.5 shadow-[0_8px_22px_rgba(16,33,63,0.07)] sm:min-h-[132px] sm:p-4 ${option.accent}`}
                >
                  <span
                    className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-bold sm:h-9 sm:min-w-9 sm:text-sm ${option.badge}`}
                  >
                    {option.code}
                  </span>
                  <h3 className="mt-2 text-[0.78rem] font-bold leading-4 sm:mt-3 sm:text-lg sm:leading-6">
                    {option.title}
                  </h3>
                </article>
              ))}
            </div>
          </section>

          <section id="opciones" className="pb-4 pt-4 sm:pb-6 sm:pt-7" aria-labelledby="subscriptions-heading">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 id="subscriptions-heading" className="font-display text-lg font-bold text-[#10213F] sm:text-2xl">
                Suscripciones
              </h2>
              <span className="h-1 w-12 rounded-full bg-[#34215F]" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:max-w-3xl">
              {subscriptionOptions.map((option) => (
                <a
                  key={option.title}
                  href="/now"
                  className={`rounded-2xl border p-3 shadow-[0_8px_22px_rgba(16,33,63,0.07)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 sm:p-4 ${option.accent}`}
                >
                  <h3 className="font-display text-base font-bold sm:text-xl">{option.title}</h3>
                  <p className="mt-1 text-sm font-semibold leading-5 sm:text-base">{option.detail}</p>
                </a>
              ))}
            </div>
            <a
              href="#ruta-estudio"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#DCE5EA] bg-[#FBFCF6]/90 px-3 py-2 text-sm font-bold text-[#192F56] shadow-[0_8px_18px_rgba(16,33,63,0.07)] transition hover:border-[#79A6A4] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20 sm:mt-4"
            >
              <Route className="h-4 w-4 text-[#0896A6]" aria-hidden="true" />
              ¿Cómo te guía Bexauri?
            </a>
          </section>
        </div>
      </section>

      <section
        id="ruta-estudio"
        className="border-t border-[#E2E8EC] bg-[#FBFCF6] px-5 py-12 sm:px-8 sm:py-14 lg:px-10"
        aria-labelledby="route-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <div className="mb-4 h-1.5 w-14 rounded-full bg-[#4B7B7C]" aria-hidden="true" />
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#34215F]">¿Cómo te guía Bexauri?</p>
            <h2 id="route-heading" className="mt-2 font-display text-3xl font-bold text-[#10213F]">
              Ruta de Estudio
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#5D6B7A]">
              Bexauri muestra una secuencia simple para comenzar, practicar, recibir retroalimentación y continuar.
            </p>
          </div>

          <div className="rounded-3xl border border-[#DCE5EA] bg-[#FBFCF6] p-4 shadow-[0_18px_48px_rgba(16,33,63,0.12)] sm:p-6">
            <div className="grid gap-3 md:grid-cols-4">
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

      <section className="border-t border-[#E2E8EC] bg-[#FBFCF6] px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="mb-4 h-1.5 w-14 rounded-full bg-[#4B7B7C]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-bold text-[#10213F]">Una forma más precisa de estudiar</h2>
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
