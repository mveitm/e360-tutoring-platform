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

  // 5) Try to load existing mc_submission for prefill (best effort)
  let initialAnswers: Record<string, string> | undefined
  if (content) {
    try {
      const existingResponse = await prisma.response.findFirst({
        where: {
          responseType: 'mc_submission',
          tutoringSession: {
            studyLoadId: studyLoad.id,
            status: 'in_progress',
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
          for (const ans of parsed.answers) {
            if (
              typeof ans.itemKey === 'string' &&
              typeof ans.selectedOptionKey === 'string'
            ) {
              initialAnswers[ans.itemKey] = ans.selectedOptionKey
            }
          }
          // Empty object → undefined
          if (Object.keys(initialAnswers).length === 0) {
            initialAnswers = undefined
          }
        }
      }
    } catch {
      // Best effort — do not break the page if prefill fails
      initialAnswers = undefined
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
            {/* Instructions */}
            <section className="mb-6">
              <h2 className="text-sm font-medium text-muted-foreground mb-2">
                Instrucciones
              </h2>
              <Card>
                <CardContent className="py-4">
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {content.instructions}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Answer form — handles status-aware rendering */}
            <StudyLoadAnswerForm
              studyLoadId={studyLoad.id}
              studyLoadStatus={studyLoad.status}
              contentKey={content.contentKey}
              contentVersion={content.contentVersion}
              items={safeItems}
              initialAnswers={initialAnswers}
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
