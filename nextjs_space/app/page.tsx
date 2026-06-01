import Link from 'next/link'
import { ArrowRight, BookOpenCheck, CheckCircle2, LineChart, Sparkles } from 'lucide-react'

const supportPoints = [
  'Actividades organizadas para estudiar paso a paso.',
  'Evidencia de avance para revisar tu trabajo.',
  'Una experiencia pensada para acompañar tu aprendizaje.',
]

const accessOptions = [
  {
    title: 'Ya tengo cuenta',
    description: 'Entra a tu espacio de estudio y continúa desde donde quedaste.',
    action: 'Iniciar sesión',
    href: '/login',
  },
  {
    title: 'Trial',
    description:
      'Explora una primera experiencia guiada de estudio y conoce cómo Bexauri organiza actividades, avance y retroalimentación.',
    action: 'Comenzar trial',
    href: '#opciones',
  },
  {
    title: 'Suscripción',
    description: 'Accede a una experiencia de estudio continua, con actividades organizadas y seguimiento de progreso.',
    action: 'Ver suscripción',
    href: '#opciones',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8faf8] text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f5f7f4]">
        <div className="mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:min-h-[88vh] lg:px-10">
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

          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.04fr)_minmax(380px,0.96fr)] lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-900 shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Experiencia de estudio guiada
              </div>
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Estudia con claridad, práctica y retroalimentación.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                Una experiencia de estudio guiada para avanzar paso a paso, practicar con propósito y reconocer tu
                progreso.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

            <div className="relative">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg sm:p-6">
                <div className="grid gap-4">
                  <div className="rounded-md bg-slate-950 p-5 text-white">
                    <div className="flex items-center gap-3">
                      <BookOpenCheck className="h-7 w-7 text-emerald-300" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-medium text-slate-300">Bexauri</p>
                        <p className="font-display text-2xl font-semibold">Una forma más clara de estudiar</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-md border border-slate-200 bg-[#f8faf8] p-4">
                      <p className="text-sm font-semibold text-slate-500">Paso</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">01</p>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-[#f4f9f6] p-4">
                      <p className="text-sm font-semibold text-slate-500">Práctica</p>
                      <p className="mt-2 text-2xl font-semibold text-emerald-800">Foco</p>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-[#fff8ed] p-4">
                      <p className="text-sm font-semibold text-slate-500">Avance</p>
                      <p className="mt-2 text-2xl font-semibold text-amber-800">Claro</p>
                    </div>
                  </div>

                  <div className="rounded-md border border-slate-200 p-5">
                    <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <LineChart className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                      Orientación y progreso
                    </div>
                    <div className="space-y-3">
                      {supportPoints.map((point) => (
                        <div key={point} className="flex gap-3 text-sm leading-6 text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-700" aria-hidden="true" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="opciones" className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Elige cómo comenzar</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Puedes iniciar sesión si ya tienes una cuenta o revisar las opciones disponibles para comenzar tu
              experiencia de estudio.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {accessOptions.map((option) => {
              const isLogin = option.href === '/login'
              const content = (
                <>
                  <h3 className="font-display text-xl font-semibold text-slate-950">{option.title}</h3>
                  <p className="mt-3 min-h-[96px] text-base leading-7 text-slate-700">{option.description}</p>
                  <span
                    className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition ${
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
                  className="flex min-h-[260px] flex-col rounded-lg border border-slate-200 bg-[#fbfcfb] p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
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
