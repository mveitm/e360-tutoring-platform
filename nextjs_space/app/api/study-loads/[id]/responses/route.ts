export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import {
  getStudyLoadContent,
  getStudyLoadContentByKey,
  type StudyLoadContent,
} from '@/lib/study-load-content'

// FL-UX-2B — Backend API for multiple-choice answer submission.
//
// POST /api/study-loads/[id]/responses
//
// Creates or replaces one Response with responseType="mc_submission"
// for the active TutoringSession of an in_progress StudyLoad.
//
// Ownership chain: User.email → Student.email → active Enrollment
//   → open LearningCycle → StudyLoad (in_progress).
//
// Does NOT:
//   - change StudyLoad.status
//   - call /complete
//   - touch self-report Response (responseType="answer")
//   - change schema
//   - add scoring or adaptive logic

// ── Request body shape ──────────────────────────────────────────
interface AnswerEntry {
  itemKey: string
  selectedOptionKey: string
}

interface RequestBody {
  contentKey: string
  contentVersion: string
  answers: AnswerEntry[]
}

// ── Stored JSON payload in Response.content ─────────────────────
interface StoredAnswer {
  itemKey: string
  selectedOptionKey: string
  correctOptionKey?: string
  isCorrect?: boolean
}

interface StoredPayload {
  kind: 'multiple_choice_submission'
  schemaVersion: 1
  contentKey: string
  contentVersion: string
  studyLoadId: string
  submittedAt: string
  answers: StoredAnswer[]
  summary: {
    answeredCount: number
    totalItemCount: number
    correctCount: number
    hasAnswerKey: boolean
  }
}

interface FeedbackItem {
  itemKey: string
  selectedOptionKey?: string
  selectedOptionText?: string
  correctOptionKey?: string
  correctOptionText?: string
  isCorrect?: boolean
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // ── 1. Authentication ─────────────────────────────────────────
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }
  const userEmail = session.user.email as string
  const studyLoadId = params.id

  // ── 2. Parse request body ─────────────────────────────────────
  let body: RequestBody
  try {
    const raw = await req.json()
    if (
      !raw ||
      typeof raw !== 'object' ||
      typeof raw.contentKey !== 'string' ||
      typeof raw.contentVersion !== 'string' ||
      !Array.isArray(raw.answers)
    ) {
      return NextResponse.json(
        { error: 'Cuerpo de solicitud inválido' },
        { status: 400 },
      )
    }
    body = raw as RequestBody
  } catch {
    return NextResponse.json(
      { error: 'Cuerpo de solicitud inválido' },
      { status: 400 },
    )
  }

  // ── 3. Fetch StudyLoad with ownership context ─────────────────
  const load = await prisma.studyLoad.findUnique({
    where: { id: studyLoadId },
    select: {
      id: true,
      title: true,
      status: true,
      learningCycleId: true,
      learningCycle: {
        select: {
          id: true,
          status: true,
          enrollmentId: true,
          enrollment: {
            select: {
              id: true,
              status: true,
              student: { select: { email: true } },
            },
          },
        },
      },
    },
  })

  if (!load) {
    return NextResponse.json(
      { error: 'Carga no encontrada' },
      { status: 404 },
    )
  }

  // ── 4. Ownership check ────────────────────────────────────────
  if (load.learningCycle.enrollment.student.email !== userEmail) {
    return NextResponse.json(
      { error: 'Esta carga no te pertenece' },
      { status: 403 },
    )
  }

  // ── 5. Enrollment active ──────────────────────────────────────
  if (load.learningCycle.enrollment.status !== 'active') {
    return NextResponse.json(
      { error: 'Tu programa no está activo' },
      { status: 409 },
    )
  }

  // ── 6. Cycle open ─────────────────────────────────────────────
  if (load.learningCycle.status !== 'open') {
    return NextResponse.json(
      { error: 'El ciclo está cerrado' },
      { status: 409 },
    )
  }

  // ── 7. StudyLoad status guard ─────────────────────────────────
  if (load.status === 'completed') {
    return NextResponse.json(
      { error: 'Esta carga ya fue completada. No se pueden modificar respuestas.' },
      { status: 409 },
    )
  }
  if (load.status !== 'in_progress') {
    return NextResponse.json(
      { error: 'Esta carga no está en curso' },
      { status: 409 },
    )
  }

  // ── 8. Content registry validation ────────────────────────────
  // First check that this StudyLoad has registered content at all
  const contentByTitle = getStudyLoadContent(load.title)
  if (!contentByTitle) {
    return NextResponse.json(
      { error: 'Esta carga no tiene contenido registrado' },
      { status: 400 },
    )
  }

  // Validate contentKey matches the registered content for this load
  if (body.contentKey !== contentByTitle.contentKey) {
    return NextResponse.json(
      { error: `contentKey no coincide. Esperado: ${contentByTitle.contentKey}` },
      { status: 400 },
    )
  }

  // Validate contentVersion matches
  if (body.contentVersion !== contentByTitle.contentVersion) {
    return NextResponse.json(
      { error: `contentVersion no coincide. Esperado: ${contentByTitle.contentVersion}` },
      { status: 400 },
    )
  }

  const content: StudyLoadContent = contentByTitle

  // Build quick lookup maps for validation
  const itemMap = new Map(
    content.items.map((item) => [item.key, item]),
  )

  // ── 9. Validate answers array ─────────────────────────────────
  // Empty answers array is rejected — at minimum the student should
  // submit at least one answer. This is the safest behavior to avoid
  // accidental empty submissions.
  if (body.answers.length === 0) {
    return NextResponse.json(
      { error: 'El arreglo de respuestas no puede estar vacío' },
      { status: 400 },
    )
  }

  // Check for duplicate itemKeys
  const seenKeys = new Set<string>()
  for (const ans of body.answers) {
    if (typeof ans.itemKey !== 'string' || typeof ans.selectedOptionKey !== 'string') {
      return NextResponse.json(
        { error: 'Cada respuesta debe tener itemKey y selectedOptionKey como strings' },
        { status: 400 },
      )
    }
    if (seenKeys.has(ans.itemKey)) {
      return NextResponse.json(
        { error: `itemKey duplicado: ${ans.itemKey}` },
        { status: 400 },
      )
    }
    seenKeys.add(ans.itemKey)

    // Validate itemKey exists in content
    const item = itemMap.get(ans.itemKey)
    if (!item) {
      return NextResponse.json(
        { error: `itemKey desconocido: ${ans.itemKey}` },
        { status: 400 },
      )
    }

    // Validate selectedOptionKey exists for this item
    const validLabels = item.options.map((o) => o.label)
    if (!validLabels.includes(ans.selectedOptionKey)) {
      return NextResponse.json(
        {
          error: `selectedOptionKey "${ans.selectedOptionKey}" no es válido para ${ans.itemKey}. Opciones: ${validLabels.join(', ')}`,
        },
        { status: 400 },
      )
    }
  }

  // ── 10. Find active TutoringSession ───────────────────────────
  // /start creates an in_progress TutoringSession for this StudyLoad.
  // We reuse it. If none exists, this is an unexpected state.
  const activeSession = await prisma.tutoringSession.findFirst({
    where: { studyLoadId: load.id, status: 'in_progress' },
    select: { id: true },
  })

  if (!activeSession) {
    return NextResponse.json(
      { error: 'No hay sesión en curso para esta carga. ¿Se llamó a /start?' },
      { status: 409 },
    )
  }

  // ── 11. Build stored payload ──────────────────────────────────
  const hasAnswerKey = content.items.some(
    (item) => item.correctOptionKey !== undefined,
  )

  let correctCount = 0
  const storedAnswers: StoredAnswer[] = body.answers.map((ans) => {
    const item = itemMap.get(ans.itemKey)!
    const stored: StoredAnswer = {
      itemKey: ans.itemKey,
      selectedOptionKey: ans.selectedOptionKey,
    }
    if (item.correctOptionKey !== undefined) {
      stored.correctOptionKey = item.correctOptionKey
      stored.isCorrect = ans.selectedOptionKey === item.correctOptionKey
      if (stored.isCorrect) correctCount++
    }
    return stored
  })

  const payload: StoredPayload = {
    kind: 'multiple_choice_submission',
    schemaVersion: 1,
    contentKey: body.contentKey,
    contentVersion: body.contentVersion,
    studyLoadId: load.id,
    submittedAt: new Date().toISOString(),
    answers: storedAnswers,
    summary: {
      answeredCount: body.answers.length,
      totalItemCount: content.items.length,
      correctCount,
      hasAnswerKey,
    },
  }

  const answerMap = new Map(
    storedAnswers.map((answer) => [answer.itemKey, answer]),
  )
  const feedbackItems: FeedbackItem[] = content.items.map((item) => {
    const answer = answerMap.get(item.key)
    const selectedOption = answer
      ? item.options.find((option) => option.label === answer.selectedOptionKey)
      : undefined
    const correctOption = item.correctOptionKey
      ? item.options.find((option) => option.label === item.correctOptionKey)
      : undefined

    return {
      itemKey: item.key,
      selectedOptionKey: answer?.selectedOptionKey,
      selectedOptionText: selectedOption?.text,
      correctOptionKey: item.correctOptionKey,
      correctOptionText: correctOption?.text,
      isCorrect: answer?.isCorrect,
    }
  })

  // ── 12. Upsert mc_submission Response ─────────────────────────
  // Find existing mc_submission for this session, if any.
  const existing = await prisma.response.findFirst({
    where: {
      tutoringSessionId: activeSession.id,
      responseType: 'mc_submission',
    },
    select: { id: true },
  })

  let responseRecord
  let isNew: boolean

  if (existing) {
    // Replace existing mc_submission
    responseRecord = await prisma.response.update({
      where: { id: existing.id },
      data: { content: JSON.stringify(payload) },
      select: { id: true, responseType: true, createdAt: true, updatedAt: true },
    })
    isNew = false
  } else {
    // Create new mc_submission
    responseRecord = await prisma.response.create({
      data: {
        tutoringSessionId: activeSession.id,
        responseType: 'mc_submission',
        content: JSON.stringify(payload),
      },
      select: { id: true, responseType: true, createdAt: true, updatedAt: true },
    })
    isNew = true
  }

  // ── 13. Return concise response ───────────────────────────────
  return NextResponse.json(
    {
      ok: true,
      responseType: 'mc_submission',
      studyLoadId: load.id,
      answeredCount: payload.summary.answeredCount,
      totalItemCount: payload.summary.totalItemCount,
      correctCount: payload.summary.correctCount,
      hasAnswerKey: payload.summary.hasAnswerKey,
      feedback: {
        answeredCount: payload.summary.answeredCount,
        totalItemCount: payload.summary.totalItemCount,
        correctCount: payload.summary.correctCount,
        hasAnswerKey: payload.summary.hasAnswerKey,
        items: feedbackItems,
      },
    },
    { status: isNew ? 201 : 200 },
  )
}
