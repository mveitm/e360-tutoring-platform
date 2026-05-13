import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { getStudyLoadContent } from '@/lib/study-load-content'
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
          const answerMap = new Map(
            storedAnswers.map((ans) => [ans.itemKey, ans.selectedOptionKey]),
          )
          const feedbackItems = content.items.map((item) => {
            const selectedOptionKey = answerMap.get(item.key)
            const selectedOption = selectedOptionKey
              ? item.options.find((opt) => opt.label === selectedOptionKey)
              : undefined
            const correctOption = item.correctOptionKey
              ? item.options.find((opt) => opt.label === item.correctOptionKey)
              : undefined

            return {
              itemKey: item.key,
              selectedOptionKey,
              selectedOptionText: selectedOption?.text,
              correctOptionKey: item.correctOptionKey,
              correctOptionText: correctOption?.text,
              isCorrect:
                selectedOptionKey && item.correctOptionKey
                  ? selectedOptionKey === item.correctOptionKey
                  : undefined,
            }
          })

          initialFeedback = {
            answeredCount: storedAnswers.length,
            totalItemCount: content.items.length,
            correctCount: feedbackItems.filter((item) => item.isCorrect).length,
            hasAnswerKey: content.items.some(
              (item) => item.correctOptionKey !== undefined,
            ),
            items: feedbackItems,
          }
        }
      }
    } catch {
      // Best effort — do not break the page if prefill fails
      initialAnswers = undefined
      initialFeedback = undefined
    }
  }

  // 6) Prepare safe items for client component (strip correctOptionKey)
  const safeItems = content
    ? content.items.map((item) => ({
        key: item.key,
        stem: item.stem,
        options: item.options.map((opt) => ({
          label: opt.label,
          text: opt.text,
        })),
      }))
    : []

  // 7) Render
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-lg px-4 pt-8 pb-16 sm:pt-12">
        {/* Back link */}
        <Link
          href="/now"
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a /now
        </Link>

        {/* Header card */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  {enrollment.program.code}
                </p>
                <CardTitle className="text-lg leading-snug">
                  {studyLoad.title}
                </CardTitle>
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 text-[10px] uppercase tracking-wide"
              >
                {studyLoad.loadType}
              </Badge>
            </div>
            {content && (
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {content.topic}
                </span>
                <span aria-hidden="true" className="text-muted-foreground/60">?</span>
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
                El contenido de esta actividad aún no está disponible dentro de la plataforma.
              </p>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Consulta con tu tutor/a para recibir las instrucciones.
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/now"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver a /now
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
