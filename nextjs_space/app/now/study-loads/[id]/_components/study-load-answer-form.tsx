'use client'

// FL-UX-2C — Student multiple-choice answer capture UI.
//
// Client component that renders interactive MC options and submits
// answers to POST /api/study-loads/[id]/responses.
//
// Receives only safe props — no correctOptionKey, no scoring data.
// Server-side ownership check remains in the parent page.tsx.

import { useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Send, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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

interface StudyLoadAnswerFormProps {
  studyLoadId: string
  studyLoadStatus: string   // "pending" | "released" | "in_progress" | "completed"
  contentKey: string
  contentVersion: string
  items: Item[]
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
}: StudyLoadAnswerFormProps) {
  // Selection state: itemKey → selectedOptionKey
  const [selections, setSelections] = useState<Record<string, string>>(
    () => initialAnswers ?? {},
  )

  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean
    message: string
    answeredCount?: number
    totalItemCount?: number
  } | null>(null)

  const answeredCount = Object.keys(selections).length
  const totalItemCount = items.length
  const isInProgress = studyLoadStatus === 'in_progress'
  const isCompleted = studyLoadStatus === 'completed'
  const isPendingOrReleased =
    studyLoadStatus === 'pending' || studyLoadStatus === 'released'

  // ── Select handler ──────────────────────────────────────────
  const handleSelect = useCallback(
    (itemKey: string, optionLabel: string) => {
      if (!isInProgress) return
      setSelections((prev) => ({ ...prev, [itemKey]: optionLabel }))
      // Clear previous result on new interaction
      setSubmitResult(null)
    },
    [isInProgress],
  )

  // ── Submit handler ──────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!isInProgress || answeredCount === 0) return
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
          message: 'Respuestas guardadas. Ahora vuelve a /now y finaliza la carga con tu autorreporte.',
          answeredCount: data.answeredCount,
          totalItemCount: data.totalItemCount,
        })
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
  }, [isInProgress, answeredCount, contentKey, contentVersion, selections, studyLoadId])

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
          Responde las preguntas y luego presiona <strong>Enviar respuestas</strong>.
          Después vuelve a{' '}
          <Link href="/now" className="font-medium underline underline-offset-2">/now</Link>{' '}
          para finalizar la carga con tu autorreporte.
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
                              onClick={() => handleSelect(item.key, opt.label)}
                              className={`w-full flex items-baseline gap-2 text-sm rounded-md px-3 py-2 text-left transition-colors ${
                                isSelected
                                  ? 'bg-primary/10 ring-1 ring-primary/40 font-medium'
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
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Submit area */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t py-4 -mx-4 px-4">
        {/* Result message */}
        {submitResult && (
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
                <p className="leading-relaxed">{submitResult.message}</p>
                {submitResult.ok && submitResult.answeredCount != null && (
                  <p className="mt-1 text-xs opacity-80">
                    {submitResult.answeredCount} de {submitResult.totalItemCount} respuestas registradas.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Progress + submit button */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {answeredCount} de {totalItemCount} respondidas
          </p>
          <Button
            onClick={handleSubmit}
            disabled={submitting || answeredCount === 0}
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
        </div>
      </div>

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
