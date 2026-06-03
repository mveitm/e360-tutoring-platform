'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface ItemOption {
  label: string
  text: string
}

interface Item {
  key: string
  stem: string
  options: ItemOption[]
}

interface FeedbackItem {
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

interface Feedback {
  answeredCount: number
  totalItemCount: number
  correctCount: number
  hasAnswerKey: boolean
  items: FeedbackItem[]
}

interface StudyLoadAnswerFormProps {
  studyLoadId: string
  studyLoadStatus: string
  contentKey: string
  contentVersion: string
  instructions: string
  passage?: {
    title: string
    body: string
    textId: string
    textVersion: string
  }
  items: Item[]
  initialFeedback?: Feedback
  initialAnswers?: Record<string, string>
}

export default function StudyLoadAnswerForm({
  studyLoadId,
  studyLoadStatus,
  contentKey,
  contentVersion,
  instructions,
  passage,
  items,
  initialAnswers,
  initialFeedback,
}: StudyLoadAnswerFormProps) {
  const router = useRouter()
  const [isPendingRefresh, startTransition] = useTransition()
  const closureBlockRef = useRef<HTMLDivElement | null>(null)

  const [selections, setSelections] = useState<Record<string, string>>(
    () => initialAnswers ?? {},
  )
  const [selfReport, setSelfReport] = useState('')
  const [completing, setCompleting] = useState(false)
  const [completeSuccess, setCompleteSuccess] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(
    () => initialFeedback ?? null,
  )
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean
    message: string
    answeredCount?: number
    totalItemCount?: number
    correctCount?: number
    hasAnswerKey?: boolean
  } | null>(null)

  const answeredCount = Object.keys(selections).length
  const totalItemCount = items.length
  const allQuestionsAnswered = totalItemCount > 0 && answeredCount === totalItemCount
  const isInProgress = studyLoadStatus === 'in_progress'
  const isCompleted = studyLoadStatus === 'completed'
  const isPendingOrReleased =
    studyLoadStatus === 'pending' || studyLoadStatus === 'released'
  const hasSubmittedFeedback = Boolean(feedback)
  const canFinalizeAfterSubmission =
    isInProgress && hasSubmittedFeedback && !completeSuccess
  const displayedAnsweredCount =
    submitResult?.answeredCount ?? feedback?.answeredCount
  const displayedTotalItemCount =
    submitResult?.totalItemCount ?? feedback?.totalItemCount
  const displayedCorrectCount =
    submitResult?.correctCount ?? feedback?.correctCount
  const displayedHasAnswerKey =
    submitResult?.hasAnswerKey ?? feedback?.hasAnswerKey
  const visibleInstructions = instructions
    .split(/\r?\n/)
    .filter((line) => !/^\s*6[\.)]\s/.test(line))
    .join('\n')
  const feedbackByItemKey = new Map(
    feedback?.items.map((item) => [item.itemKey, item]) ?? [],
  )

  useEffect(() => {
    if (!canFinalizeAfterSubmission) return

    const timeoutId = window.setTimeout(() => {
      closureBlockRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 50)

    return () => window.clearTimeout(timeoutId)
  }, [canFinalizeAfterSubmission])

  const handleSelect = useCallback(
    (itemKey: string, optionLabel: string) => {
      if (!isInProgress || completeSuccess || hasSubmittedFeedback) return
      setSelections((prev) => ({ ...prev, [itemKey]: optionLabel }))
      setSubmitResult(null)
      setFeedback(null)
    },
    [isInProgress, completeSuccess, hasSubmittedFeedback],
  )

  const handleSubmit = useCallback(async () => {
    if (!isInProgress || !allQuestionsAnswered || hasSubmittedFeedback) return
    setSubmitting(true)
    setSubmitResult(null)

    const payload = {
      contentKey,
      contentVersion,
      answers: Object.entries(selections).map(([itemKey, selectedOptionKey]) => ({
        itemKey,
        selectedOptionKey,
      })),
    }

    try {
      const res = await fetch(`/api/study-loads/${studyLoadId}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok && data.ok) {
        setSubmitResult({
          ok: true,
          message: 'Respuestas guardadas',
          answeredCount: data.answeredCount,
          totalItemCount: data.totalItemCount,
          correctCount: data.correctCount,
          hasAnswerKey: data.hasAnswerKey,
        })
        setFeedback(data.feedback ?? null)
        window.setTimeout(() => {
          closureBlockRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }, 0)
      } else {
        setSubmitResult({
          ok: false,
          message: data.error || 'Error al enviar respuestas.',
        })
      }
    } catch {
      setSubmitResult({
        ok: false,
        message: 'Error de conexión. Intenta de nuevo.',
      })
    } finally {
      setSubmitting(false)
    }
  }, [
    isInProgress,
    allQuestionsAnswered,
    contentKey,
    contentVersion,
    selections,
    studyLoadId,
    hasSubmittedFeedback,
  ])

  const handleComplete = useCallback(async () => {
    if (!isInProgress || !selfReport) return
    setCompleting(true)
    try {
      const res = await fetch(`/api/study-loads/${studyLoadId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selfReport }),
      })

      if (res.ok) {
        setCompleteSuccess(true)
        startTransition(() => {
          router.push('/now')
          router.refresh()
        })
      } else {
        const data = await res.json()
        setSubmitResult({
          ok: false,
          message: data.error || 'No se pudo finalizar la cápsula.',
        })
      }
    } catch {
      setSubmitResult({ ok: false, message: 'Error de conexión al finalizar.' })
    } finally {
      setCompleting(false)
    }
  }, [isInProgress, selfReport, studyLoadId, router])

  function renderInstructions() {
    return (
      <section className="mb-6">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">
          Instrucciones
        </h2>
        <Card>
          <CardContent className="py-4">
            <div className="whitespace-pre-line text-sm leading-relaxed">
              {visibleInstructions}
            </div>
          </CardContent>
        </Card>
      </section>
    )
  }

  function renderPassage() {
    if (!passage) return null

    return (
      <section className="mb-6">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">
          Texto de lectura
        </h2>
        <Card>
          <CardContent className="py-4">
            <p className="mb-3 text-sm font-semibold">{passage.title}</p>
            <div className="whitespace-pre-line text-sm leading-relaxed">
              {passage.body}
            </div>
          </CardContent>
        </Card>
      </section>
    )
  }

  function renderFeedbackSummary() {
    if (!feedback) return null

    return (
      <section className="mb-6">
        <Card>
          <CardContent className="py-4">
            <h2 className="mb-3 text-sm font-medium">
              Resultado de esta cápsula
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Respondiste {feedback.answeredCount} de {feedback.totalItemCount} preguntas.
              </p>
              {feedback.hasAnswerKey && (
                <p>
                  Correctas: {feedback.correctCount} de {feedback.totalItemCount}.
                </p>
              )}
              <p>Tus respuestas quedaron registradas como evidencia de esta cápsula.</p>
              <p>Este resultado no es un puntaje PAES.</p>
              <p>Este resultado no define por sí solo tu nivel completo.</p>
              <p>Puedes continuar con la siguiente cápsula disponible.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    )
  }

  function renderQuestionFeedback(item: Item) {
    const itemFeedback = feedbackByItemKey.get(item.key)
    if (!feedback || !itemFeedback) return null

    if (!itemFeedback.selectedOptionKey) {
      return (
        <div className="mt-3 rounded-md border border-muted bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
          Sin respuesta registrada.
        </div>
      )
    }

    const statusText =
      itemFeedback.isCorrect === true
        ? 'Correcta'
        : itemFeedback.isCorrect === false
          ? 'Incorrecta'
          : 'Corrección no disponible'
    const statusClass =
      itemFeedback.isCorrect === true
        ? 'text-green-700 dark:text-green-400'
        : itemFeedback.isCorrect === false
          ? 'text-red-700 dark:text-red-400'
          : 'text-muted-foreground'

    return (
      <div className="mt-3 rounded-md border bg-muted/20 px-3 py-2 text-xs">
        <p className={`font-medium ${statusClass}`}>{statusText}</p>
        <p className="mt-1 text-muted-foreground">
          Tu respuesta: {itemFeedback.selectedOptionKey}) {itemFeedback.selectedOptionText}
        </p>
        {itemFeedback.correctOptionKey && (
          <p className="mt-1 text-muted-foreground">
            Respuesta correcta: {itemFeedback.correctOptionKey}) {itemFeedback.correctOptionText}
          </p>
        )}
        {itemFeedback.authoredFeedbackBrief && (
          <div className="mt-3 border-t pt-2">
            <p className="font-medium text-muted-foreground">Retroalimentación breve</p>
            <p className="mt-1 text-muted-foreground">
              {itemFeedback.authoredFeedbackBrief}
            </p>
            {itemFeedback.authoredFeedbackComplete && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-medium text-primary">
                  Ver explicación completa
                </summary>
                <p className="mt-2 text-muted-foreground">
                  {itemFeedback.authoredFeedbackComplete}
                </p>
              </details>
            )}
          </div>
        )}
      </div>
    )
  }

  function renderClosureBlock() {
    if (!canFinalizeAfterSubmission && !completeSuccess) return null

    return (
      <div
        ref={closureBlockRef}
        className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300"
      >
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="w-full">
            <p className="font-semibold leading-relaxed">
              Tus respuestas ya están guardadas.
            </p>
            <p className="mt-1 leading-relaxed">
              Falta 1 paso para cerrar esta cápsula.
            </p>
            <div className="mt-2 space-y-2 border-t border-current/10 pt-2">
              {displayedAnsweredCount != null && displayedTotalItemCount != null && (
                <p className="text-sm">
                  Respondiste {displayedAnsweredCount} de {displayedTotalItemCount} ejercicios.
                </p>
              )}
              {displayedHasAnswerKey && displayedCorrectCount != null && displayedTotalItemCount != null && (
                <p className="text-sm">
                  Correctas: {displayedCorrectCount} de {displayedTotalItemCount}.
                </p>
              )}
              <p className="text-xs italic leading-relaxed opacity-80">
                Este resultado no es un puntaje PAES. Tus respuestas quedaron registradas como evidencia de esta cápsula.
              </p>
              {canFinalizeAfterSubmission ? (
                <div className="mt-3 space-y-2 border-t border-current/10 pt-3 text-foreground">
                  <p className="text-sm font-medium">
                    Cuéntanos cómo te fue y finaliza.
                  </p>
                  <RadioGroup
                    value={selfReport}
                    onValueChange={setSelfReport}
                    className="gap-2"
                  >
                    {['Me fue bien', 'Me costó', 'No la terminé'].map((opt) => (
                      <div key={opt} className="flex items-center gap-3 rounded-md border border-current/10 p-2">
                        <RadioGroupItem value={opt} id={`sr-${opt}`} />
                        <Label htmlFor={`sr-${opt}`} className="flex-1 cursor-pointer text-sm font-normal">
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    onClick={handleComplete}
                    disabled={completing || !selfReport || isPendingRefresh}
                    size="sm"
                    className="mt-2 w-full"
                  >
                    {completing || isPendingRefresh ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    )}
                    Finalizar cápsula
                  </Button>
                </div>
              ) : (
                <div className="mt-4 border-t border-current/10 pt-4">
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Actualizando tu avance...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderReadOnlyQuestions() {
    return (
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          Ejercicios ({totalItemCount})
        </h2>
        <ol className="space-y-4">
          {items.map((item, index) => (
            <li key={item.key}>
              <Card>
                <CardContent className="py-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Pregunta {index + 1} de {totalItemCount}
                  </p>
                  <p className="mb-3 whitespace-pre-line text-sm font-medium">
                    {item.stem}
                  </p>
                  <ul className="space-y-1.5">
                    {item.options.map((opt) => {
                      const wasSelected = selections[item.key] === opt.label
                      return (
                        <li
                          key={opt.label}
                          className={`flex items-baseline gap-2 rounded px-2 py-1 text-sm ${
                            wasSelected ? 'bg-muted font-medium' : ''
                          }`}
                        >
                          <span className="w-5 shrink-0 font-medium text-muted-foreground">
                            {opt.label})
                          </span>
                          <span>{opt.text}</span>
                          {wasSelected && (
                            <span className="ml-auto text-xs text-muted-foreground">
                              (tu respuesta)
                            </span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                  {renderQuestionFeedback(item)}
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  function renderAnsweringQuestions() {
    return (
      <section className="space-y-3 pb-2">
        <ol className="space-y-4">
          {items.map((item, index) => {
            const selected = selections[item.key]
            return (
              <li key={item.key} id={`pregunta-${index + 1}`} className="scroll-mt-28">
                <Card className={`rounded-2xl border-[#E2E8EC] bg-white shadow-[0_8px_22px_rgba(16,33,63,0.07)] ${selected ? 'ring-1 ring-[#4B7B7C]/40' : ''}`}>
                  <CardContent className="py-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#5D6B7A]">
                      Pregunta {index + 1} de {totalItemCount}
                    </p>
                    <p className="mb-3 whitespace-pre-line text-sm font-semibold leading-6 text-[#10213F]">
                      {item.stem}
                    </p>
                    <ul className="space-y-1.5">
                      {item.options.map((opt) => {
                        const isSelected = selected === opt.label
                        return (
                          <li key={opt.label}>
                            <button
                              type="button"
                              disabled={hasSubmittedFeedback}
                              onClick={() => handleSelect(item.key, opt.label)}
                              className={`flex w-full items-baseline gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                                isSelected
                                  ? 'border-[#79A6A4] bg-[#E5F0EF] font-semibold text-[#10213F]'
                                  : hasSubmittedFeedback
                                    ? 'cursor-default'
                                    : 'border-[#DCE5EA] bg-[#FBFCF6] text-[#253A5F] hover:bg-[#EEF4F7]'
                              }`}
                            >
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors ${
                                  isSelected
                                    ? 'border-[#4B7B7C] bg-[#4B7B7C] text-white'
                                    : 'border-muted-foreground/30 text-muted-foreground'
                                }`}
                              >
                                {opt.label})
                              </span>
                              <span className="flex-1">{opt.text}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                    {renderQuestionFeedback(item)}
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ol>
      </section>
    )
  }

  if (isPendingOrReleased) {
    return (
      <>
        {renderPassage()}
        {renderInstructions()}
      </>
    )
  }

  if (isCompleted) {
    return (
      <>
        {renderPassage()}
        {renderInstructions()}
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
            <p className="text-sm leading-relaxed text-green-800 dark:text-green-300">
              Esta cápsula ya fue finalizada. Tus respuestas quedan como evidencia para revisión.
            </p>
          </div>
        </div>
        {renderFeedbackSummary()}
        {renderReadOnlyQuestions()}
      </>
    )
  }

  return (
    <div className="flex min-h-full flex-col gap-3">
      {hasSubmittedFeedback && renderClosureBlock()}
      {!hasSubmittedFeedback && (
        <section className="sticky top-0 z-20 rounded-2xl border border-[#DCE5EA] bg-[#FBFCF6]/95 p-2.5 shadow-[0_10px_24px_rgba(16,33,63,0.10)] backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#34215F]">Responder cápsula</p>
              <p className="text-xs font-semibold text-[#5D6B7A]">
                {answeredCount}/{totalItemCount} respondidas
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !allQuestionsAnswered || completing || isPendingRefresh || hasSubmittedFeedback}
              size="sm"
              className="min-h-10 shrink-0 gap-1.5 rounded-full bg-[#192F56] px-4 text-xs font-bold text-white hover:bg-[#253A5F] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {submitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              Enviar respuestas
            </Button>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#DCE5EA]">
            <div
              className="h-full rounded-full bg-[#4B7B7C] transition-all duration-300"
              style={{ width: `${totalItemCount > 0 ? (answeredCount / totalItemCount) * 100 : 0}%` }}
            />
          </div>
          <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {items.map((item, index) => {
              const isAnswered = Boolean(selections[item.key])
              return (
                <a
                  key={item.key}
                  href={`#pregunta-${index + 1}`}
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition ${
                    isAnswered
                      ? 'border-[#79A6A4] bg-[#E5F0EF] text-[#192F56]'
                      : 'border-[#DCE5EA] bg-white text-[#5D6B7A]'
                  }`}
                  aria-label={`Pregunta ${index + 1}`}
                >
                  {index + 1}
                </a>
              )
            })}
          </div>
        </section>
      )}
      {renderAnsweringQuestions()}
      {submitResult && !submitResult.ok && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="leading-relaxed">{submitResult.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}
