import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const supportPoints = [
  'Actividades organizadas para estudiar paso a paso.',
  'Evidencia de avance para revisar tu trabajo.',
  'Una experiencia pensada para acompañar tu aprendizaje.',
]

const accessOptions = [
  {
    title: 'Iniciar',
    description: 'Si tienes cuenta, entra a tu espacio de estudio y continúa desde donde quedaste.',
    action: 'Iniciar sesión',
    href: '/login',
    accent: '#192F56',
    surface: '#F8F4EB',
    button: 'bg-[#192F56] text-white hover:bg-[#102442]',
  },
  {
    title: 'Trial',
    description: '7 días de prueba para conocer la experiencia de estudio de Bexauri.',
    action: 'Comenzar trial',
    href: '#opciones',
    accent: '#4B7B7C',
    surface: '#F1F8F4',
    button: 'border border-[#4B7B7C] bg-white text-[#253A5F] hover:bg-[#EEF7F3]',
  },
  {
    title: 'Suscripción',
    description: 'Acceso ilimitado para estudiar de forma continua con actividades y seguimiento.',
    action: 'Ver suscripción',
    href: '#opciones',
    accent: '#253A5F',
    surface: '#F2F5FA',
    button: 'border border-[#253A5F] bg-white text-[#192F56] hover:bg-[#EEF2F7]',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBFCF6] text-[#192F56]">
      <section className="border-b border-[#d8e0e5] bg-[#F8F4EB]">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:min-h-[760px] lg:px-8">
          <header className="rounded-xl border border-[#d8e0e5] bg-white/95 px-4 py-3 shadow-sm shadow-[#192F56]/10 sm:px-5">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex min-w-0 items-center" aria-label="Bexauri">
                <Image
                  src="/brand/bexauri-logo-provisional.png"
                  alt="Bexauri"
                  width={220}
                  height={88}
                  priority
                  className="h-11 w-[142px] rounded-sm object-cover object-center sm:h-12 sm:w-[172px]"
                />
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-md bg-[#192F56] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102442] focus:outline-none focus:ring-2 focus:ring-[#192F56] focus:ring-offset-2"
              >
                Iniciar sesión
              </Link>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)] lg:gap-10 lg:py-10">
            <div className="max-w-3xl">
              <div className="mb-5 h-1.5 w-20 rounded-full bg-[#4B7B7C]" aria-hidden="true" />
              <h1 className="font-display text-4xl font-semibold leading-tight text-[#192F56] sm:text-5xl lg:text-6xl">
                Estudia con claridad, práctica y retroalimentación.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#48656C] sm:text-xl">
                Avanza paso a paso con una experiencia guiada para aprender mejor.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#192F56] px-6 text-base font-semibold text-white shadow-lg shadow-[#192F56]/15 transition hover:bg-[#102442] focus:outline-none focus:ring-2 focus:ring-[#192F56] focus:ring-offset-2"
                >
                  Iniciar sesión
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
                <a
                  href="#opciones"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#A6B3BE] bg-white/90 px-6 text-base font-semibold text-[#192F56] shadow-sm transition hover:border-[#48656C] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#192F56] focus:ring-offset-2"
                >
                  Ver opciones de acceso
                </a>
              </div>
            </div>

            <section
              id="opciones"
              className="rounded-2xl border border-[#d8e0e5] bg-white p-4 shadow-xl shadow-[#192F56]/10 sm:p-5"
            >
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-[#d8e0e5] pb-4">
                <h2 className="font-display text-2xl font-semibold text-[#192F56] sm:text-3xl">
                  Elige cómo comenzar
                </h2>
                <span className="hidden h-2 w-14 rounded-full bg-[#4B7B7C] sm:block" aria-hidden="true" />
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {accessOptions.map((option) => {
                  return (
                    <a
                      key={option.title}
                      href={option.href}
                      className="group flex min-h-[218px] flex-col rounded-xl border border-[#d8e0e5] p-5 shadow-sm shadow-[#192F56]/5 transition hover:-translate-y-0.5 hover:border-[#A6B3BE] hover:shadow-lg hover:shadow-[#192F56]/10 focus:outline-none focus:ring-2 focus:ring-[#192F56] focus:ring-offset-2"
                      style={{ backgroundColor: option.surface }}
                    >
                      <span
                        className="mb-5 h-1.5 w-12 rounded-full transition group-hover:w-16"
                        style={{ backgroundColor: option.accent }}
                        aria-hidden="true"
                      />
                      <h3 className="font-display text-2xl font-semibold text-[#192F56]">{option.title}</h3>
                      <p className="mt-3 min-h-[92px] text-base leading-7 text-[#48656C]">{option.description}</p>
                      <span
                        className={`mt-auto inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-semibold shadow-sm transition ${option.button}`}
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
        </div>
      </section>

      <section className="border-t border-[#d8e0e5] bg-[#FBFCF6] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-5 h-1.5 w-16 rounded-full bg-[#4B7B7C]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold text-[#192F56]">Una forma más clara de estudiar</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#48656C]">
              Bexauri combina actividades, evidencia de trabajo y orientación para ayudarte a avanzar con foco.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {supportPoints.map((point) => (
              <div key={point} className="rounded-xl border border-[#d8e0e5] bg-white p-5 shadow-sm shadow-[#192F56]/5">
                <CheckCircle2 className="h-6 w-6 text-[#4B7B7C]" aria-hidden="true" />
                <p className="mt-4 text-base leading-7 text-[#48656C]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d8e0e5] bg-[#192F56] px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#D8E0E5] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-white">Bexauri</span>
          <span>Bexauri — Experiencia de estudio guiada</span>
        </div>
      </footer>
    </main>
  )
}
