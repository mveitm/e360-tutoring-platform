export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

// Phase DS — Admin-only atomic close of an open LearningCycle.
//
// Contract (E360_CYCLE_WIRING_CONTRACT_v1.0 — Step 8 cycle close, partial):
// - Transition LearningCycle.status 'open' -> 'closed' and stamp closedAt.
// - Persist a closing CycleSnapshot with snapshotType='cycle_close' as a
//   strictly transcriptive record of what was closed (no derived metrics,
//   no scoring, no heuristics, no interpretive fields).
// - Advance StudentProgramInstance.lastActivityAt.
//
// Deliberately OUT OF SCOPE in DS (future phases):
// - CycleEvaluation (Step 9)
// - CycleDecision (Step 10)
// - ContinuitySignal emission (Step 12)
// - Second-cycle preconditions / second-load generation (Step 13)
//
// Auth model: session-required, matching every sibling admin cycle-family
// API (DC/DD/DJ/DN). The admin-only surface is enforced by middleware on
// /admin/* + the fact that the only UI entry point lives inside the cycle
// detail view under /admin/learning-cycles/[id].

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const cycleId = params.id

  const cycle = await prisma.learningCycle.findUnique({
    where: { id: cycleId },
    select: {
      id: true,
      enrollmentId: true,
      status: true,
      studyLoads: {
        select: { id: true, title: true, loadType: true, status: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!cycle) {
    return NextResponse.json({ error: 'Ciclo no encontrado' }, { status: 404 })
  }

  if (cycle.status !== 'open') {
    return NextResponse.json({ error: 'El ciclo ya está cerrado' }, { status: 409 })
  }

  // Guard: zero-load cycles are not closeable through this endpoint. This
  // keeps the API in lockstep with the UI guard on the cycle detail page
  // (which only renders "Cerrar ciclo" when studyLoads.length > 0 && every
  // load is completed) and prevents legacy orphan cycles with no adaptive
  // loads from being silently closed through a direct API call.
  if (cycle.studyLoads.length === 0) {
    return NextResponse.json({ error: 'El ciclo no tiene cargas registradas' }, { status: 409 })
  }

  const anyPending = cycle.studyLoads.some((l) => l.status !== 'completed')
  if (anyPending) {
    return NextResponse.json({ error: 'Aún hay cargas sin completar' }, { status: 409 })
  }

  const now = new Date()

  // Atomic transaction: cycle close + closing snapshot + enrollment activity
  // stamp. Closing snapshot payload is intentionally minimal and strictly
  // transcriptive per DS constraints — no metrics, no counters, no scoring.
  try {
    const result = await prisma.$transaction(async (tx) => {
      const updatedCycle = await tx.learningCycle.update({
        where: { id: cycleId },
        data: { status: 'closed', closedAt: now },
        select: {
          id: true,
          enrollmentId: true,
          cycleNumber: true,
          status: true,
          openedAt: true,
          closedAt: true,
          createdAt: true,
        },
      })

      const snapshot = await tx.cycleSnapshot.create({
        data: {
          learningCycleId: cycleId,
          snapshotType: 'cycle_close',
          payload: {
            closedAt: now.toISOString(),
            studyLoads: cycle.studyLoads.map((l) => ({
              id: l.id,
              title: l.title,
              loadType: l.loadType,
              status: l.status,
            })),
            reason: 'admin_close',
          },
        },
        select: { id: true, snapshotType: true, createdAt: true },
      })

      await tx.studentProgramInstance.update({
        where: { id: cycle.enrollmentId },
        data: { lastActivityAt: now },
      })

      return { cycle: updatedCycle, snapshot }
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Error interno' }, { status: 500 })
  }
}
