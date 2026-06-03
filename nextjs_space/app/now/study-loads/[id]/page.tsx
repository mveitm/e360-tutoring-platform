import { redirect, notFound } from 'next/navigation'
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
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import StudyLoadAnswerForm from './_components/study-load-answer-form'

export const dynamic = 'force-dynamic'

// FL-UX-1  — Minimal in-app StudyLoad content viewer.
// FL-UX-2C — Student multiple-choice answer capture UI.
//
// Displays task instructions and exercises from the static content
// registry. When StudyLoad is in_progress, renders an interactive
// answer form that submits to POST /api/study-loads/[id]/responses.
//
// Ownership chain: session User.email → Student.email → active enrollment →
// open cycle → StudyLoad. Denies access if the chain doesn't match.

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

export default async function StudyLoadViewerPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/login')
  }

  const email = session.user.email as string

  // 1) Resolve Student by email (provisional linkage)
  const student = await prisma.student.findUnique({
    where: { email },
    select: { id: true },
  })

  if (!student) {
    redirect('/now')
  }

  // 2) Fetch the StudyLoad with its ownership chain
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

  // 3) Verify ownership: the authenticated student must own this load
  const enrollment = studyLoad.learningCycle.enrollment
  if (enrollment.studentId !== student.id || enrollment.status !== 'active') {
    redirect('/now')
  }

  // 4) Look up static content by title
  const content = getStudyLoadContent(studyLoad.title)

  // 5) Try to load existing mc_submission for prefill/feedback (best effort)
  let initialAnswers: Record<string, string> | undefined
  let initialFeedback: McFeedback | undefined
  if (content) {
    try {
      const existingResponse = await prisma.response.findFirst({
        where: {
          responseType: 'mc_submission',
          tutoringSession: {
            studyLoadId: studyLoad.id,
          },
        },
        select: { content: true },
        orderBy: { updatedAt: 'desc' },
      })

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
          // Empty object → undefined
          if (Object.keys(initialAnswers).length === 0) {
            initialAnswers = undefined
          }
          initialFeedback = buildStudyLoadFeedback(content, storedAnswers)
        }
      }
    } catch {
      // Best effort — do not break the page if prefill fails
      initialAnswers = undefined
      initialFeedback = undefined
    }
  }

  // 6) Prepare safe items for client component (strip correctOptionKey)
  const safeItems = content ? getSafeStudyLoadItems(content) : []

  // 7) Render
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#F8F4EB_0%,#FBFCF6_48%,#EEF4F7_100%)] text-[#10213F]">
      <div className="mx-auto w-full max-w-2xl px-3 py-4 sm:px-5 sm:py-8">
        {/* Back link */}
        <Link
          href="/study/paes-m1"
          className="mb-3 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#DCE5EA] bg-white px-3 text-xs font-bold text-[#192F56] shadow-sm transition hover:bg-[#EEF4F7] focus:outline-none focus:ring-4 focus:ring-[#4B7B7C]/20"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a tutoría
        </Link>

        {/* Header card */}
        <Card className="mb-4 rounded-3xl border-[#E2E8EC] bg-[#FBFCF6] shadow-[0_14px_34px_rgba(16,33,63,0.09)]">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#34215F]">
                  Cápsula · {enrollment.program.code}
                </p>
                <CardTitle className="font-display text-xl leading-snug text-[#10213F] sm:text-2xl">
                  {studyLoad.title}
                </CardTitle>
                <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">
                  Trabaja esta cápsula con calma. Tus respuestas quedarán guardadas cuando decidas enviarlas.
                </p>
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 rounded-full bg-[#EEF4F7] text-[10px] font-bold uppercase tracking-wide text-[#253A5F]"
              >
                Cápsula
              </Badge>
            </div>
            {content && (
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-[#5D6B7A]">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {content.topic}
                </span>
                <span aria-hidden="true" className="text-[#A6B3BE]">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {content.estimatedMinutes}
                </span>
              </div>
            )}
          </CardHeader>
        </Card>

        {content ? (
          <>
            {/* Answer form — handles status-aware rendering */}
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
          </>
        ) : (
          /* Fallback: no static content available */
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
                  <ArrowLeft className="h-4 w-4" />
                  Volver a tutoría
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
