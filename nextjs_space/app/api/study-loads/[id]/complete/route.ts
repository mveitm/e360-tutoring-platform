export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

// Phase DQ — Visible wiring phase of Line E.
//
// Single orchestration endpoint that atomically materializes the closing
// fragment of contract Steps 5, 6, and 7:
//   - validate ownership and preconditions
//   - transition StudyLoad in_progress → completed
//   - transition the linked in_progress TutoringSession → completed
//     (with completedAt = now())
//   - create one minimal Response row with responseType='answer' and the
//     chosen self-report string stored verbatim in content
//   - update StudentProgramInstance.lastActivityAt (SE-9)
//
// The self-report set is closed to exactly three Spanish options:
//   "Me fue bien", "Me costó", "No la terminé".
//
// Scope guards explicitly not performed here:
//   - no CycleEvaluation creation
//   - no CycleSnapshot (pre_decision) creation
//   - no CycleDecision creation
//   - no ContinuitySignal creation
//   - no SkillState recalculation
//   - no cycle-close
//   - no second-load generation
//   - no scoring, isCorrect, or skill linkage on the Response row

const ALLOWED_SELF_REPORTS = [
  'Me fue bien',
  'Me costó',
  'No la terminé',
] as const

type SelfReport = (typeof ALLOWED_SELF_REPORTS)[number]

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const userEmail = session.user.email as string
  const studyLoadId = params.id

  // Parse and validate payload. The self-report set is closed server-side
  // (no free text, no additional options).
  let rawBody: unknown = null
  try {
    rawBody = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Autorreporte inválido' },
      { status: 400 },
    )
  }
  const rawReport =
    rawBody && typeof rawBody === 'object'
      ? (rawBody as { selfReport?: unknown }).selfReport
      : undefined
  if (
    typeof rawReport !== 'string' ||
    !ALLOWED_SELF_REPORTS.includes(rawReport as SelfReport)
  ) {
    return NextResponse.json(
      { error: 'Autorreporte inválido' },
      { status: 400 },
    )
  }
  const selfReport: SelfReport = rawReport as SelfReport

  // Pre-load the target StudyLoad with the context needed for the guards.
  // The transaction below re-reads the critical state fields before writing.
  const load = await prisma.studyLoad.findUnique({
    where: { id: studyLoadId },
    select: {
      id: true,
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
              currentContinuityState: true,
              student: { select: { email: true } },
            },
          },
        },
      },
    },
  })

  if (!load) {
    return NextResponse.json({ error: 'Carga no encontrada' }, { status: 404 })
  }

  // Ownership: provisional v1.0 linkage User.email == Student.email.
  if (load.learningCycle.enrollment.student.email !== userEmail) {
    return NextResponse.json(
      { error: 'Esta carga no te pertenece' },
      { status: 403 },
    )
  }

  if (load.learningCycle.enrollment.status !== 'active') {
    return NextResponse.json(
      { error: 'Tu programa no está activo' },
      { status: 409 },
    )
  }
  if (load.learningCycle.enrollment.currentContinuityState !== 'normal') {
    return NextResponse.json(
      { error: 'Tu programa no está en estado normal' },
      { status: 409 },
    )
  }

  if (load.learningCycle.status !== 'open') {
    return NextResponse.json({ error: 'El ciclo está cerrado' }, { status: 409 })
  }

  if (load.status !== 'in_progress') {
    return NextResponse.json(
      { error: 'Esta carga no está en curso' },
      { status: 409 },
    )
  }

  // Session invariant: exactly one in_progress session per in_progress load.
  const activeSessions = await prisma.tutoringSession.findMany({
    where: { studyLoadId: load.id, status: 'in_progress' },
    select: { id: true },
  })
  if (activeSessions.length === 0) {
    return NextResponse.json(
      { error: 'No hay sesión en curso para esta carga' },
      { status: 409 },
    )
  }
  if (activeSessions.length > 1) {
    return NextResponse.json(
      { error: 'Estado inconsistente: múltiples sesiones en curso' },
      { status: 409 },
    )
  }
  const activeSessionId = activeSessions[0].id

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Re-read the critical state inside the transaction to close TOCTOU
      // windows against concurrent admin actions or retries.
      const fresh = await tx.studyLoad.findUnique({
        where: { id: load.id },
        select: {
          status: true,
          learningCycle: { select: { status: true } },
        },
      })
      if (!fresh) {
        throw { httpStatus: 404, message: 'Carga no encontrada' }
      }
      if (fresh.status !== 'in_progress') {
        throw { httpStatus: 409, message: 'Esta carga no está en curso' }
      }
      if (fresh.learningCycle.status !== 'open') {
        throw { httpStatus: 409, message: 'El ciclo está cerrado' }
      }

      const freshSession = await tx.tutoringSession.findUnique({
        where: { id: activeSessionId },
        select: { status: true, studyLoadId: true },
      })
      if (
        !freshSession ||
        freshSession.status !== 'in_progress' ||
        freshSession.studyLoadId !== load.id
      ) {
        throw {
          httpStatus: 409,
          message: 'No hay sesión en curso para esta carga',
        }
      }

      const now = new Date()

      const updatedLoad = await tx.studyLoad.update({
        where: { id: load.id },
        data: { status: 'completed' },
        select: { id: true, status: true },
      })

      const updatedSession = await tx.tutoringSession.update({
        where: { id: activeSessionId },
        data: { status: 'completed', completedAt: now },
        select: { id: true, status: true, completedAt: true },
      })

      const createdResponse = await tx.response.create({
        data: {
          tutoringSessionId: activeSessionId,
          responseType: 'answer',
          content: selfReport,
        },
        select: { id: true, responseType: true, content: true },
      })

      // SE-9: update enrollment activity timestamp.
      await tx.studentProgramInstance.update({
        where: { id: load.learningCycle.enrollmentId },
        data: { lastActivityAt: now },
      })

      return {
        studyLoad: updatedLoad,
        session: updatedSession,
        response: createdResponse,
      }
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    if (error && typeof error === 'object' && 'httpStatus' in error) {
      return NextResponse.json(
        { error: error.message ?? 'Error' },
        { status: error.httpStatus as number },
      )
    }
    return NextResponse.json(
      { error: error?.message ?? 'Error interno' },
      { status: 500 },
    )
  }
}
