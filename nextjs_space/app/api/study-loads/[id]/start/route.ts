export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

// Phase DP — Execution bridge: start the first StudyLoad from /now.
//
// Single orchestration endpoint that atomically materializes contract
// Step 5 → Step 6:
//   - validate ownership and preconditions
//   - transition StudyLoad pending → in_progress
//   - create TutoringSession in_progress linked to that StudyLoad and cycle
//   - update StudentProgramInstance.lastActivityAt (SE-9)
//
// Response capture, closing logic and cycle_close are intentionally not part
// of this endpoint. This endpoint only opens activity on a single load.

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const userEmail = session.user.email as string
  const studyLoadId = params.id

  // Pre-load the target StudyLoad with all context we need for the guards
  // (outside the transaction is fine — the transaction re-checks the critical
  // state fields before writing).
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

  // Ownership: in v1.0 the provisional linkage is User.email == Student.email.
  if (load.learningCycle.enrollment.student.email !== userEmail) {
    return NextResponse.json({ error: 'Esta carga no te pertenece' }, { status: 403 })
  }

  // Enrollment must be active and on normal continuity.
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

  // Cycle must be open.
  if (load.learningCycle.status !== 'open') {
    return NextResponse.json({ error: 'El ciclo está cerrado' }, { status: 409 })
  }

  // Load must be strictly pending.
  if (load.status !== 'pending') {
    return NextResponse.json(
      { error: 'Esta carga ya fue iniciada' },
      { status: 409 },
    )
  }

  // Defensive: no existing in_progress session already attached to this load.
  const existingSession = await prisma.tutoringSession.findFirst({
    where: { studyLoadId: load.id, status: 'in_progress' },
    select: { id: true },
  })
  if (existingSession) {
    return NextResponse.json(
      { error: 'Ya hay una sesión en curso para esta carga' },
      { status: 409 },
    )
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Re-read the load and cycle inside the transaction to guard against
      // a race with an admin-side closure or another start action.
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
      if (fresh.status !== 'pending') {
        throw { httpStatus: 409, message: 'Esta carga ya fue iniciada' }
      }
      if (fresh.learningCycle.status !== 'open') {
        throw { httpStatus: 409, message: 'El ciclo está cerrado' }
      }

      const updatedLoad = await tx.studyLoad.update({
        where: { id: load.id },
        data: { status: 'in_progress' },
        select: { id: true, status: true },
      })

      const createdSession = await tx.tutoringSession.create({
        data: {
          learningCycleId: load.learningCycleId,
          studyLoadId: load.id,
          sessionType: 'practice',
          status: 'in_progress',
        },
        select: { id: true, status: true, startedAt: true },
      })

      // SE-9: update enrollment activity timestamp.
      await tx.studentProgramInstance.update({
        where: { id: load.learningCycle.enrollmentId },
        data: { lastActivityAt: new Date() },
      })

      return { studyLoad: updatedLoad, session: createdSession }
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
