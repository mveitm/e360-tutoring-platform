'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowDown, CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ItemOption {
  label: string
  text: string
}

interface TableStimulus {
  caption?: string
  headers: string[]
  rows: string[][]
}

interface Item {
  key: string
  stem: string
  tableStimulus?: TableStimulus
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
  sourceTutoringHref: string
  nextStudyLoadHref?: string
}

const AUTOREPORTE_OPTIONS = ['Me fue bien', 'Me costó', 'No la terminé'] as const

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
  sourceTutoringHref,
  nextStudyLoadHref,
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
  const draftStorageKey = `bexauri:capsule-draft:${studyLoadId}`
  const autoreporteDraftStorageKey = `bexauri:capsule-autoreporte-draft:${studyLoadId}`
  const feedbackByItemKey = new Map(
    feedback?.items.map((item) => [item.itemKey, item]) ?? [],
  )

  useEffect(() => {
    if (!isInProgress || hasSubmittedFeedback) return

    try {
      const storedDraft = window.sessionStorage.getItem(draftStorageKey)
      if (!storedDraft) return

      const parsed = JSON.parse(storedDraft)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return

      const itemKeys = new Set(items.map((item) => item.key))
      const optionLabelsByItem = new Map(
        items.map((item) => [item.key, new Set(item.options.map((option) => option.label))]),
      )
      const safeDraft: Record<string, string> = {}

      for (const [itemKey, optionLabel] of Object.entries(parsed)) {
        if (
          typeof itemKey === 'string' &&
          typeof optionLabel === 'string' &&
          itemKeys.has(itemKey) &&
          optionLabelsByItem.get(itemKey)?.has(optionLabel)
        ) {
          safeDraft[itemKey] = optionLabel
        }
      }

      if (Object.keys(safeDraft).length > 0) {
        setSelections((prev) => ({ ...prev, ...safeDraft }))
      }
    } catch {
      window.sessionStorage.removeItem(draftStorageKey)
    }
  }, [draftStorageKey, hasSubmittedFeedback, isInProgress, items])

  useEffect(() => {
    if (!isInProgress) return

    try {
      if (hasSubmittedFeedback) {
        window.sessionStorage.removeItem(draftStorageKey)
        return
      }

      if (Object.keys(selections).length === 0) {
        window.sessionStorage.removeItem(draftStorageKey)
        return
      }

      window.sessionStorage.setItem(draftStorageKey, JSON.stringify(selections))
    } catch {
      // Local draft persistence is best-effort and must not block answering.
    }
  }, [draftStorageKey, hasSubmittedFeedback, isInProgress, selections])

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

  useEffect(() => {
    if (!canFinalizeAfterSubmission) return

    try {
      const storedAutoreporte = window.sessionStorage.getItem(autoreporteDraftStorageKey)
      if (
        storedAutoreporte &&
        AUTOREPORTE_OPTIONS.includes(storedAutoreporte as (typeof AUTOREPORTE_OPTIONS)[number])
      ) {
        setSelfReport(storedAutoreporte)
      }
    } catch {
      window.sessionStorage.removeItem(autoreporteDraftStorageKey)
    }
  }, [autoreporteDraftStorageKey, canFinalizeAfterSubmission])

  useEffect(() => {
    try {
      if (completeSuccess) {
        window.sessionStorage.removeItem(autoreporteDraftStorageKey)
        return
      }

      if (!canFinalizeAfterSubmission || !selfReport) return

      if (AUTOREPORTE_OPTIONS.includes(selfReport as (typeof AUTOREPORTE_OPTIONS)[number])) {
        window.sessionStorage.setItem(autoreporteDraftStorageKey, selfReport)
      }
    } catch {
      // Local autoreporte draft persistence is best-effort and never submits data.
    }
  }, [autoreporteDraftStorageKey, canFinalizeAfterSubmission, completeSuccess, selfReport])

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
          message: 'Paso 1: Cuéntanos cómo te fue',
          answeredCount: data.answeredCount,
          totalItemCount: data.totalItemCount,
          correctCount: data.correctCount,
          hasAnswerKey: data.hasAnswerKey,
        })
        setFeedback(data.feedback ?? null)
        window.sessionStorage.removeItem(draftStorageKey)
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
    draftStorageKey,
    hasSubmittedFeedback,
  ])

  const handleComplete = useCallback(async () => {
    if (!canFinalizeAfterSubmission || !selfReport) return
    setCompleting(true)
    try {
      const res = await fetch(`/api/study-loads/${studyLoadId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selfReport }),
      })

      if (res.ok) {
        setCompleteSuccess(true)
        window.sessionStorage.removeItem(draftStorageKey)
        window.sessionStorage.removeItem(autoreporteDraftStorageKey)
        startTransition(() => {
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
  }, [
    autoreporteDraftStorageKey,
    canFinalizeAfterSubmission,
    draftStorageKey,
    selfReport,
    studyLoadId,
    router,
  ])

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
            <h2 className="mb-3 rounded-2xl border border-[#A99AD2] bg-[#F2EFF8] px-3 py-2 text-base font-extrabold leading-tight text-[#241642] shadow-[0_8px_18px_rgba(52,33,95,0.10)]">
              Paso 2: Revisa tu resultado
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Tus respuestas quedaron guardadas.</p>
              <p>
                Respondiste {feedback.answeredCount} de {feedback.totalItemCount} preguntas.
              </p>
              {feedback.hasAnswerKey && (
                <p>
                  Correctas: {feedback.correctCount} de {feedback.totalItemCount}.
                </p>
              )}
              <p>Toma notas en tu cuaderno de lo que hiciste bien y de lo necesitas reforzar</p>
              <p>Este resultado te ayuda a preparar el siguiente paso de estudio.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    )
  }

  function renderQuestionFeedback(item: Item, index?: number) {
    const itemFeedback = feedbackByItemKey.get(item.key)
    if (!feedback || !itemFeedback) return null

    if (!itemFeedback.selectedOptionKey) {
      return (
        <div
          id={index === 0 ? 'feedback-pregunta-1' : undefined}
          className="mt-3 rounded-md border border-muted bg-muted/30 px-3 py-2 text-xs text-muted-foreground"
        >
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
      <div
        id={index === 0 ? 'feedback-pregunta-1' : undefined}
        className="mt-3 rounded-md border bg-muted/20 px-3 py-2 text-xs"
      >
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
                <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#79A6A4] bg-[#E5F0EF] px-2.5 py-1 text-xs font-bold text-[#10213F] transition hover:bg-[#DCE5EA]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4B7B7C] text-sm leading-none text-white">
                    +
                  </span>
                  paso a paso
                </summary>
                <p className="mt-2 text-muted-foreground">
                  {itemFeedback.authoredFeedbackComplete}
                </p>
              </details>
            )}
            {!itemFeedback.authoredFeedbackComplete && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#DCE5EA] bg-[#FBFCF6] px-2.5 py-1 text-xs font-bold text-[#5D6B7A]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A6B3BE] text-sm leading-none text-white">
                  +
                </span>
                paso a paso
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  function renderTableStimulus(tableStimulus?: TableStimulus) {
    if (!tableStimulus) return null

    return (
      <div className="mb-3 overflow-hidden rounded-xl border border-[#DCE5EA] bg-[#FBFCF6]">
        {tableStimulus.caption && (
          <p className="border-b border-[#DCE5EA] bg-[#EEF4F7] px-3 py-2 text-xs font-bold text-[#253A5F]">
            {tableStimulus.caption}
          </p>
        )}
        <Table className="min-w-[320px] text-xs sm:text-sm">
          <TableHeader>
            <TableRow className="bg-white hover:bg-white">
              {tableStimulus.headers.map((header) => (
                <TableHead key={header} className="h-auto px-3 py-2 font-bold text-[#10213F]">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableStimulus.rows.map((row, rowIndex) => (
              <TableRow key={`${tableStimulus.caption ?? 'table'}-${rowIndex}`} className="bg-white/70">
                {tableStimulus.headers.map((header, cellIndex) => (
                  <TableCell key={`${header}-${cellIndex}`} className="px-3 py-2 text-[#253A5F]">
                    {row[cellIndex] ?? ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  function renderClosureBlock() {
    if (!canFinalizeAfterSubmission && !completeSuccess) return null

    if (completeSuccess) {
      return (
        <div
          ref={closureBlockRef}
          className="mb-3 rounded-2xl border border-[#79A6A4] bg-[linear-gradient(135deg,#E5F0EF_0%,#FBFCF6_62%,#F2EFF8_100%)] p-3 text-sm text-[#10213F] shadow-[0_10px_24px_rgba(16,33,63,0.10)]"
        >
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#4B7B7C]" />
            <div className="w-full">
              <p className="text-base font-extrabold leading-snug text-[#10213F]">
                Cápsula finalizada
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-[#253A5F]">
                Tu autorreporte quedó guardado. Puedes volver a la tutoría para revisar tu avance.
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <a
                  href={sourceTutoringHref}
                  className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#79A6A4] bg-white px-3 text-xs font-bold text-[#10213F] shadow-sm transition hover:bg-[#EEF4F7]"
                >
                  Volver a tutoría
                </a>
                {nextStudyLoadHref ? (
                  <a
                    href={nextStudyLoadHref}
                    className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#DCE5EA] bg-white px-3 text-xs font-bold text-[#192F56] shadow-sm transition hover:bg-[#EEF4F7]"
                  >
                    Ir a la siguiente cápsula
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex min-h-9 cursor-not-allowed items-center justify-center rounded-full border border-[#DCE5EA] bg-white/70 px-3 text-xs font-bold text-[#6B7280] shadow-sm"
                  >
                    Ir a la siguiente cápsula
                  </button>
                )}
                <a
                  href="/now"
                  className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#192F56] px-3 text-xs font-bold text-white shadow-[0_10px_22px_rgba(25,47,86,0.16)] transition hover:bg-[#253A5F]"
                >
                  Ir Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={closureBlockRef}
        className="mb-3 rounded-2xl border border-[#79A6A4] bg-[linear-gradient(135deg,#E5F0EF_0%,#FBFCF6_58%,#F2EFF8_100%)] p-2.5 text-sm text-[#10213F] shadow-[0_10px_22px_rgba(16,33,63,0.09)]"
      >
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#4B7B7C]" />
          <div className="w-full">
            <p className="text-base font-extrabold leading-snug text-[#10213F]">
              Paso 1: Cuéntanos cómo te fue
            </p>
            <div className="mt-1.5 space-y-1.5 border-t border-current/10 pt-1.5">
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
              {canFinalizeAfterSubmission ? (
                <div className="mt-2 space-y-2 border-t border-current/10 pt-2 text-foreground">
                  <p className="text-sm font-bold text-[#10213F]">
                    ¿Cómo te fue?
                  </p>
                  <RadioGroup
                    value={selfReport}
                    onValueChange={setSelfReport}
                    className="gap-2"
                  >
                    {AUTOREPORTE_OPTIONS.map((opt) => (
                      <div
                        key={opt}
                        className={`flex items-center gap-3 rounded-xl border p-2 transition-colors ${
                          selfReport === opt
                            ? 'border-[#79A6A4] bg-[#E5F0EF] text-[#10213F]'
                            : 'border-[#DCE5EA] bg-white/70 text-[#253A5F]'
                        }`}
                      >
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
                  {renderTableStimulus(item.tableStimulus)}
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
                  {renderQuestionFeedback(item, index)}
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
                    {renderTableStimulus(item.tableStimulus)}
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
                    {renderQuestionFeedback(item, index)}
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ol>
      </section>
    )
  }

  function renderReviewStepHeading() {
    if (!hasSubmittedFeedback) return null

    return (
      <section className="rounded-2xl border border-[#A99AD2] bg-[linear-gradient(135deg,#F2EFF8_0%,#FBFCF6_72%)] p-3 shadow-[0_10px_24px_rgba(52,33,95,0.10)]">
        <p className="text-base font-extrabold leading-tight text-[#241642]">
          Paso 2: Revisa tu resultado
        </p>
        <p className="mt-1 text-xs font-medium leading-5 text-[#253A5F]">
          Toma notas en tu cuaderno de lo que hiciste bien y de lo necesitas reforzar
        </p>
        <div className="mt-2 rounded-xl border border-[#DCE5EA] bg-white/75 px-3 py-2 text-xs font-semibold text-[#192F56] shadow-[inset_0_-10px_18px_rgba(52,33,95,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <span>Desliza para revisar tu feedback por pregunta.</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#79A6A4] bg-[#E5F0EF]">
              <ArrowDown className="h-4 w-4 text-[#4B7B7C]" aria-hidden="true" />
            </span>
          </div>
        </div>
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
              <p className={`text-xs font-semibold ${allQuestionsAnswered ? 'text-[#4B7B7C]' : 'text-[#5D6B7A]'}`}>
                {answeredCount}/{totalItemCount} respondidas · {allQuestionsAnswered ? 'Listo para enviar' : `Faltan ${totalItemCount - answeredCount}`}
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !allQuestionsAnswered || completing || isPendingRefresh || hasSubmittedFeedback}
              size="sm"
              className={`min-h-10 shrink-0 gap-1.5 rounded-full px-4 text-xs font-bold text-white transition-all duration-200 disabled:cursor-not-allowed ${
                allQuestionsAnswered
                  ? 'border border-[#F2B84B]/45 bg-[linear-gradient(135deg,#F2B84B_0%,#D85B8C_52%,#A63D4F_100%)] shadow-[0_0_22px_rgba(216,91,140,0.24),0_10px_22px_rgba(166,61,79,0.18)] hover:shadow-[0_0_28px_rgba(216,91,140,0.30),0_12px_26px_rgba(166,61,79,0.22)]'
                  : 'border border-[#DCE5EA] bg-[#A6B3BE] shadow-none disabled:opacity-70'
              }`}
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
      {renderReviewStepHeading()}
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
