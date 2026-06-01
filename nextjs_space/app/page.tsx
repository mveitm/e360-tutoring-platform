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
  },
  {
    title: 'Trial',
    description: '7 días de prueba para conocer la experiencia de estudio de Bexauri.',
    action: 'Comenzar trial',
    href: '#opciones',
  },
  {
    title: 'Suscripción',
    description: 'Acceso ilimitado para estudiar de forma continua con actividades y seguimiento.',
    action: 'Ver suscripción',
    href: '#opciones',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8faf8] text-slate-950">
      <section className="border-b border-slate-200 bg-[#f5f7f4]">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3" aria-label="Bexauri">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-base font-semibold text-white">
                B
              </span>
              <span className="font-display text-xl font-semibold text-slate-950">Bexauri</span>
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Iniciar sesión
            </Link>
          </header>

          <div className="flex min-h-[58vh] max-w-4xl flex-col justify-center py-14 sm:py-20 lg:min-h-[62vh] lg:py-24">
            <h1 className="font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Estudia con claridad, práctica y retroalimentación.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              Avanza paso a paso con una experiencia guiada para aprender mejor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-6 text-base font-semibold text-white shadow-md transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              >
                Iniciar sesión
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href="#opciones"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-base font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              >
                Ver opciones de acceso
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="opciones" className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Elige cómo comenzar</h2>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {accessOptions.map((option) => {
              const isLogin = option.href === '/login'
              const content = (
                <>
                  <h3 className="font-display text-2xl font-semibold text-slate-950">{option.title}</h3>
                  <p className="mt-4 min-h-[84px] text-base leading-7 text-slate-700">{option.description}</p>
                  <span
                    className={`mt-auto inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition ${
                      isLogin
                        ? 'bg-slate-950 text-white hover:bg-slate-800'
                        : 'border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {option.action}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </span>
                </>
              )

              return (
                <a
                  key={option.title}
                  href={option.href}
                  className="flex min-h-[230px] flex-col rounded-lg border border-slate-200 bg-[#fbfcfb] p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                >
                  {content}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f5f7f4] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-950">Una forma más clara de estudiar</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
              Bexauri combina actividades, evidencia de trabajo y orientación para ayudarte a avanzar con foco.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {supportPoints.map((point) => (
              <div key={point} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                <p className="mt-4 text-base leading-7 text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-slate-950">Bexauri</span>
          <span>Bexauri — Experiencia de estudio guiada</span>
        </div>
      </footer>
    </main>
  )
}
