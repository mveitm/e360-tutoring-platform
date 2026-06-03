import { redirect, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import {
  buildStudyLoadFeedback,
  getSafeStudyLoadItems,
  getStudyLoadContent,
} from '@/lib/study-load-content'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, BookOpen, Clock, LayoutDashboard } from 'lucide-react'
import { StartLoadButton } from '../../_components/start-load-button'
import StudyLoadAnswerForm from './_components/study-load-answer-form'

export const dynamic = 'force-dynamic'

// FL-UX-1 - Minimal in-app capsule content viewer.
// FL-UX-2C - Student multiple-choice answer capture UI.
//
// Displays task instructions and exercises from the static content
// registry. When the capsule is in_progress, renders an interactive
// answer form that submits to POST /api/study-loads/[id]/responses.
//
// Ownership chain: session User.email -> Student.email -> active enrollment ->
// open cycle -> StudyLoad. Denies access if the chain doesn't match.

interface PageProps {
  params: { id: string }
}

interface StoredAnswer {
  itemKey: string
  selectedOptionKey: string
}

interface McFeedbackItem {
  itemKey: string
  selectedOptionKey?: string
  selectedOptionText?: string
  correctOptionKey?: string
  correctOptionText?: string
  isCorrect?: boolean
  authoredFeedbackBrief?: string
  authoredFeedbackComplete?: string
  authoredFeedbackBriefId?: string
  authoredFeedbackCompleteId?: string
  authoredFeedbackVersion?: string
}

interface McFeedback {
  answeredCount: number
  totalItemCount: number
  correctCount: number
  hasAnswerKey: boolean
  items: McFeedbackItem[]
}

const capsuleStatusLabels: Record<string, string> = {
  pending: 'Pendiente',
  released: 'Pendiente',
  in_progress: 'En progreso',
  completed: 'Completada',
}

function CapsuleNavigation({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Navegación de cápsula"
      className={className ?? 'flex items-center gap-1.5'}
    >
      <Link
        href="/study/paes-m1"
        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-[#DCE5EA] bg-white px-3 text-xs font-bold text-[#192F56] shadow-sm transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Volver a tutoría
      </Link>
      <Link
        href="/now"
        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-[#DCE5EA] bg-white px-3 text-xs font-bold text-[#192F56] shadow-sm transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
      >
        <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
        Ir DB
      </Link>
    </nav>
  )
}

function CapsuleStartCta({
  loadId,
  status,
}: {
  loadId: string
  status: string
}) {
  if (status === 'completed') {
    return null
  }

  if (status === 'pending' || status === 'released') {
    return (
      <StartLoadButton
        loadId={loadId}
        label="Comenzar"
        busyLabel="Comenzando..."
        className="min-h-11 gap-2 rounded-full bg-[#192F56] px-5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.16)] transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
      />
    )
  }

  return (
    <a
      href="#capsula-contenido"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#192F56] px-5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.16)] transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
    >
      Comenzar
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

function CapsuleCompletedActions() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <Link
        href="/study/paes-m1"
        className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#79A6A4] bg-white px-3 text-xs font-bold text-[#10213F] shadow-sm transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
      >
        Volver a tutorÃ­a
      </Link>
      <Link
        href="/now"
        className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#192F56] px-3 text-xs font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.16)] transition hover:bg-[#253A5F] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
      >
        Ir DB
      </Link>
    </div>
  )
}

export default async function StudyLoadViewerPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/login')
  }

  const email = session.user.email as string

  const student = await prisma.student.findUnique({
    where: { email },
    select: { id: true },
  })

  if (!student) {
    redirect('/now')
  }

  const studyLoad = await prisma.studyLoad.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      loadType: true,
      status: true,
      learningCycle: {
        select: {
          id: true,
          status: true,
          enrollment: {
            select: {
              id: true,
              status: true,
              studentId: true,
              program: { select: { code: true, name: true } },
            },
          },
        },
      },
    },
  })

  if (!studyLoad) {
    notFound()
  }

  const enrollment = studyLoad.learningCycle.enrollment
  if (enrollment.studentId !== student.id || enrollment.status !== 'active') {
    redirect('/now')
  }

  const content = getStudyLoadContent(studyLoad.title)

  let initialAnswers: Record<string, string> | undefined
  let initialFeedback: McFeedback | undefined
  let completedSelfReport: string | undefined
  if (content) {
    try {
      const [existingResponse, existingSelfReport] = await Promise.all([
        prisma.response.findFirst({
          where: {
            responseType: 'mc_submission',
            tutoringSession: {
              studyLoadId: studyLoad.id,
            },
          },
          select: { content: true },
          orderBy: { updatedAt: 'desc' },
        }),
        prisma.response.findFirst({
          where: {
            responseType: 'answer',
            tutoringSession: {
              studyLoadId: studyLoad.id,
            },
          },
          select: { content: true },
          orderBy: { updatedAt: 'desc' },
        }),
      ])

      if (existingResponse?.content) {
        const parsed = JSON.parse(existingResponse.content)
        if (
          parsed?.kind === 'multiple_choice_submission' &&
          Array.isArray(parsed.answers)
        ) {
          initialAnswers = {}
          const storedAnswers: StoredAnswer[] = []
          for (const ans of parsed.answers) {
            if (
              typeof ans.itemKey === 'string' &&
              typeof ans.selectedOptionKey === 'string'
            ) {
              initialAnswers[ans.itemKey] = ans.selectedOptionKey
              storedAnswers.push({
                itemKey: ans.itemKey,
                selectedOptionKey: ans.selectedOptionKey,
              })
            }
          }
          if (Object.keys(initialAnswers).length === 0) {
            initialAnswers = undefined
          }
          initialFeedback = buildStudyLoadFeedback(content, storedAnswers)
        }
      }
      if (typeof existingSelfReport?.content === 'string') {
        completedSelfReport = existingSelfReport.content
      }
    } catch {
      initialAnswers = undefined
      initialFeedback = undefined
      completedSelfReport = undefined
    }
  }

  const safeItems = content ? getSafeStudyLoadItems(content) : []
  const capsuleStatusLabel = capsuleStatusLabels[studyLoad.status] ?? studyLoad.status
  const isAnswering = studyLoad.status === 'in_progress'
  const isCompleted = studyLoad.status === 'completed'

  return (
    <main className="h-[100dvh] min-h-[100svh] overflow-hidden bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_48%,#EEF4F7_100%)] text-[#10213F]">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col px-2.5 py-2 sm:px-5 sm:py-6">
        <header className="mb-2 shrink-0 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 px-2.5 py-1.5 shadow-[0_8px_20px_rgba(16,33,63,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link href="/study/paes-m1" className="flex min-w-0 items-center gap-2" aria-label="Bexauri">
              <span className="rounded-xl border border-[#DCE5EA] bg-white px-1.5 py-0.5 shadow-sm shadow-[#10213F]/10">
                <Image
                  src="/brand/bexauri-logo-provisional.png"
                  alt="Bexauri"
                  width={220}
                  height={88}
                  priority
                  className="h-6 w-[96px] rounded-lg object-cover object-center sm:h-8 sm:w-[120px]"
                />
              </span>
              <span className="hidden text-sm font-semibold text-[#5D6B7A] sm:inline">Cápsula PAES_M1</span>
            </Link>
            <CapsuleNavigation />
          </div>
        </header>

        <div id="capsula-contenido" className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
          {!isAnswering && (
          <Card className="mb-4 rounded-3xl border-[#E2E8EC] bg-[#FBFCF6] shadow-[0_14px_34px_rgba(16,33,63,0.09)]">
            <CardHeader className="pb-3">
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                <div className="flex-1">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#34215F]">
                    Cápsula {enrollment.program.code}
                  </p>
                  <CardTitle className="font-display text-xl leading-snug text-[#10213F] sm:text-2xl">
                    {studyLoad.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
                    {isCompleted
                      ? 'Tu autorreporte quedó guardado. Puedes revisar tu resultado o volver a la tutoría.'
                      : 'Trabaja esta cápsula con calma. Tus respuestas quedarán guardadas cuando decidas enviarlas.'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#253A5F]">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 ${
                        isCompleted
                          ? 'border-[#79A6A4] bg-[#E5F0EF] text-[#10213F]'
                          : 'border-[#DCE5EA] bg-white/80'
                      }`}
                    >
                      {isCompleted ? 'Cápsula finalizada' : `Estado de cápsula: ${capsuleStatusLabel}`}
                    </span>
                    {isCompleted && completedSelfReport && (
                      <span className="inline-flex rounded-full border border-[#DCE5EA] bg-white/80 px-3 py-1">
                        Autorreporte: {completedSelfReport}
                      </span>
                    )}
                  </div>
                  {isCompleted && <CapsuleCompletedActions />}
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <Badge
                    variant="secondary"
                    className="shrink-0 rounded-full bg-[#EEF4F7] text-[10px] font-bold uppercase tracking-wide text-[#253A5F]"
                  >
                    Cápsula
                  </Badge>
                  <CapsuleStartCta loadId={studyLoad.id} status={studyLoad.status} />
                </div>
              </div>
              {content && (
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-[#5D6B7A]">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    {content.topic}
                  </span>
                  <span aria-hidden="true" className="text-[#A6B3BE]">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {content.estimatedMinutes}
                  </span>
                </div>
              )}
            </CardHeader>
          </Card>
          )}

          {content ? (
            <StudyLoadAnswerForm
              studyLoadId={studyLoad.id}
              studyLoadStatus={studyLoad.status}
              contentKey={content.contentKey}
              contentVersion={content.contentVersion}
              instructions={content.instructions}
              passage={content.readingText ? {
                title: content.readingText.title,
                body: content.readingText.body,
                textId: content.readingText.textId,
                textVersion: content.readingText.textVersion,
              } : undefined}
              items={safeItems}
              initialAnswers={initialAnswers}
              initialFeedback={initialFeedback}
            />
          ) : (
            <Card>
              <CardContent className="py-10">
                <p className="text-center text-sm text-muted-foreground">
                  El contenido de esta cápsula aún no está disponible dentro de la plataforma.
                </p>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Consulta con tu tutor/a para recibir las instrucciones.
                </p>
                <div className="mt-4 text-center">
                  <Link
                    href="/study/paes-m1"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Volver a tutoría
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <footer className="shrink-0 pt-2">
          <CapsuleNavigation className="grid grid-cols-2 gap-2 rounded-2xl border border-[#E2E8EC] bg-[#FBFCF6]/95 p-1.5 shadow-[0_-8px_22px_rgba(16,33,63,0.08)] backdrop-blur" />
        </footer>
      </div>
    </main>
  )
}
