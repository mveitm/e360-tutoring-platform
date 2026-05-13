'use client'

// FL-UX-2C — Student multiple-choice answer capture UI.
//
// Client component that renders interactive MC options and submits
// answers to POST /api/study-loads/[id]/responses.
//
// Receives only safe props — no correctOptionKey, no scoring data.
// Server-side ownership check remains in the parent page.tsx.

import { useState, useCallback, useTransition } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ── Props (safe subset — no answer keys) ────────────────────────

interface ItemOption {
  label: string  // "A", "B", "C", "D"
  text: string
}

interface Item {
  key: string    // "q1", "q2", ...
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
  studyLoadStatus: string   // "pending" | "released" | "in_progress" | "completed"
  contentKey: string
  contentVersion: string
  items: Item[]
  initialFeedback?: Feedback
  /** Pre-filled answers from a previous mc_submission, if available */
  initialAnswers?: Record<string, string>  // itemKey → selectedOptionKey
}

// ── Component ───────────────────────────────────────────────────

export default function StudyLoadAnswerForm({
  studyLoadId,
  studyLoadStatus,
  contentKey,
  contentVersion,
  items,
  initialAnswers,
  initialFeedback,
}: StudyLoadAnswerFormProps) {
  const router = useRouter()
  const [isPendingRefresh, startTransition] = useTransition()

  // Selection state: itemKey → selectedOptionKey
  const [selections, setSelections] = useState<Record<string, string>>(
    () => initialAnswers ?? {},
  )

  const [selfReport, setSelfReport] = useState<string>('')
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
  const isInProgress = studyLoadStatus === 'in_progress'
  const isCompleted = studyLoadStatus === 'completed'
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
  const isPendingOrReleased =
    studyLoadStatus === 'pending' || studyLoadStatus === 'released'

  // ── Select handler ──────────────────────────────────────────
  const handleSelect = useCallback(
    (itemKey: string, optionLabel: string) => {
      if (!isInProgress || completeSuccess || hasSubmittedFeedback) return
      setSelections((prev) => ({ ...prev, [itemKey]: optionLabel }))
      // Clear previous result on new interaction
      setSubmitResult(null)
      setFeedback(null)
    },
    [isInProgress, completeSuccess, hasSubmittedFeedback],
  )

  // ── Submit handler ──────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!isInProgress || answeredCount === 0 || hasSubmittedFeedback) return
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
  }, [isInProgress, answeredCount, contentKey, contentVersion, selections, studyLoadId, hasSubmittedFeedback])

  const feedbackByItemKey = new Map(
    feedback?.items.map((item) => [item.itemKey, item]) ?? [],
  )

  function renderFeedbackSummary() {
    if (!feedback) return null

    return (
      <section className="mb-6">
        <Card>
          <CardContent className="py-4">
            <h2 className="text-sm font-medium mb-3">
              Resultado de esta actividad
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
              <p>Tus respuestas quedaron registradas como evidencia de esta actividad.</p>
              <p>Este resultado no es un puntaje PAES.</p>
              <p>Este resultado no define por sí solo tu nivel completo.</p>
              <p>Puedes continuar con la siguiente actividad disponible.</p>
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
      </div>
    )
  }

  // ── Complete handler ────────────────────────────────────────
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
        startTransition(() => router.push('/now'))
      } else {
        const data = await res.json()
        setSubmitResult({
          ok: false,
          message: data.error || 'No se pudo finalizar la actividad.',
        })
      }
    } catch {
      setSubmitResult({ ok: false, message: 'Error de conexión al finalizar.' })
    } finally {
      setCompleting(false)
    }
  }, [isInProgress, selfReport, studyLoadId, router])

  // ── Status banners ──────────────────────────────────────────

  if (isPendingOrReleased) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              Primero debes iniciar esta carga desde{' '}
              <Link href="/now" className="font-medium underline underline-offset-2">/now</Link>{' '}
              para poder enviar respuestas.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <>
        <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4 mb-6">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 dark:text-green-400 shrink-0" />
            <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
              Esta carga ya fue finalizada. Tus respuestas quedan como evidencia para revisión.
            </p>
          </div>
        </div>
        {renderFeedbackSummary()}
        {/* Read-only questions */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            Ejercicios ({totalItemCount})
          </h2>
          <ol className="space-y-4">
            {items.map((item, index) => (
              <li key={item.key}>
                <Card>
                  <CardContent className="py-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Pregunta {index + 1} de {totalItemCount}
                    </p>
                    <p className="text-sm font-medium mb-3 whitespace-pre-line">
                      {item.stem}
                    </p>
                    <ul className="space-y-1.5">
                      {item.options.map((opt) => {
                        const wasSelected = selections[item.key] === opt.label
                        return (
                          <li
                            key={opt.label}
                            className={`flex items-baseline gap-2 text-sm rounded px-2 py-1 ${
                              wasSelected
                                ? 'bg-muted font-medium'
                                : ''
                            }`}
                          >
                            <span className="shrink-0 w-5 text-muted-foreground font-medium">
                              {opt.label})
                            </span>
                            <span>{opt.text}</span>
                            {wasSelected && (
                              <span className="text-xs text-muted-foreground ml-auto">
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
      </>
    )
  }

  // ── In-progress: interactive form ───────────────────────────
  return (
    <>
      {/* Guidance banner */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-4 mb-6">
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
          Responde las preguntas, presiona <strong>Enviar respuestas</strong> y luego finaliza la actividad al final
          de la página.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {answeredCount} de {totalItemCount} respondidas
        </p>
        {/* Visual progress bar */}
        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${totalItemCount > 0 ? (answeredCount / totalItemCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Ejercicios ({totalItemCount})
        </h2>
        <ol className="space-y-4">
          {items.map((item, index) => {
            const selected = selections[item.key]
            return (
              <li key={item.key}>
                <Card className={selected ? 'ring-1 ring-primary/30' : ''}>
                  <CardContent className="py-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Pregunta {index + 1} de {totalItemCount}
                    </p>
                    <p className="text-sm font-medium mb-3 whitespace-pre-line">
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
                              className={`w-full flex items-baseline gap-2 text-sm rounded-md px-3 py-2 text-left transition-colors ${
                                isSelected
                                  ? 'bg-primary/10 ring-1 ring-primary/40 font-medium'
                                  : hasSubmittedFeedback
                                    ? 'cursor-default'
                                    : 'hover:bg-muted/60'
                              }`}
                            >
                              <span
                                className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium border transition-colors ${
                                  isSelected
                                    ? 'bg-primary text-primary-foreground border-primary'
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

      {/* Submit area */}
      <section className="mb-6 rounded-lg border bg-card p-4">
        {/* Result message */}
        {submitResult && !submitResult.ok && (
          <div
            className={`mb-3 rounded-lg border p-3 text-sm ${
              submitResult.ok
                ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300'
                : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300'
            }`}
          >
            <div className="flex items-start gap-2">
              {submitResult.ok ? (
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              )}
              <div>
                <p className={`leading-relaxed ${submitResult.ok ? 'font-semibold' : ''}`}>
                  {submitResult.message}
                </p>
                {submitResult.ok && submitResult.answeredCount != null && (
                  <div className="mt-2 space-y-2 border-t border-current/10 pt-2">
                    <p className="text-sm">
                      Respondiste {submitResult.answeredCount} de {submitResult.totalItemCount} ejercicios.
                    </p>
                    {submitResult.hasAnswerKey && submitResult.correctCount != null && (
                      <p className="text-sm">
                        Correctas: {submitResult.correctCount} de {submitResult.totalItemCount}.
                      </p>
                    )}
                    <p className="text-xs italic opacity-80 leading-relaxed">
                      Este resultado no es un puntaje PAES. Tus respuestas quedaron registradas como evidencia de esta actividad.
                    </p>

                    {!completeSuccess ? (
                      <div className="mt-4 pt-4 border-t border-current/10 space-y-3 text-foreground">
                        <p className="font-medium text-sm">
                          Para cerrar esta actividad, cuéntanos brevemente cómo te fue.
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
                          className="w-full mt-2"
                        >
                          {completing || isPendingRefresh ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                          )}
                          Finalizar actividad
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-4 pt-4 border-t border-current/10 space-y-3">
                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                          Actividad finalizada. Tu avance quedó registrado.
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href="/now" className="gap-1.5">
                            <ArrowLeft className="h-4 w-4" />
                            Volver a /now
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {(canFinalizeAfterSubmission || completeSuccess) && (
          <div className="mb-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold leading-relaxed">
                  Respuestas guardadas
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
                  <p className="text-xs italic opacity-80 leading-relaxed">
                    Este resultado no es un puntaje PAES. Tus respuestas quedaron registradas como evidencia de esta actividad.
                  </p>

                  {canFinalizeAfterSubmission ? (
                    <div className="mt-4 pt-4 border-t border-current/10 space-y-3 text-foreground">
                      <p className="font-medium text-sm">
                        Para cerrar esta actividad, cuéntanos brevemente cómo te fue.
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
                        className="w-full mt-2"
                      >
                        {completing || isPendingRefresh ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                        )}
                        Finalizar actividad
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-4 pt-4 border-t border-current/10 space-y-3">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                        Actividad finalizada. Tu avance quedó registrado.
                      </p>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/now" className="gap-1.5">
                          <ArrowLeft className="h-4 w-4" />
                          Volver a /now
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress + submit button */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {answeredCount} de {totalItemCount} respondidas
          </p>
          {!completeSuccess && !hasSubmittedFeedback && (
            <Button
            onClick={handleSubmit}
            disabled={submitting || answeredCount === 0 || completing || isPendingRefresh || hasSubmittedFeedback}
            size="sm"
            className="gap-1.5"
          >
            {submitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Enviar respuestas
          </Button>
          )}
        </div>
      </section>

      {/* Bottom return link */}
      <div className="text-center mt-6 pb-4">
        <Link
          href="/now"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a /now
        </Link>
      </div>
    </>
  )
}
