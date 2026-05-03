export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

// Phase DT — Admin authorization of cycle continuity.
//
// Purpose (E360_CYCLE_WIRING_CONTRACT_v1.0 — Line E continuity bridge):
// emit the minimum correct ContinuitySignal artefact that satisfies DL's
// existing precondition P4b (a ContinuitySignal with signalType='continue'
// must exist for the previous closed cycle before opening cycle N+1 for
// the same enrollment).
//
// DT owns ONLY the continuity authorization artefact. Cycle N+1 creation
// remains the responsibility of the existing DL/DN path at
// POST /api/learning-cycles. DT does not generate a second StudyLoad, does
// not emit any CycleEvaluation or CycleDecision, does not re-score any
// SkillState and does not widen the rationale vocabulary beyond the
// literal 'admin_authorize'. Future phases may enrich that reason.
//
// Auth model mirrors DS /close and every sibling admin cycle-family API:
// session-required via getServerSession. The admin-only surface is
// enforced by middleware on /admin/* + the fact that the only UI entry
// point lives inside /admin/learning-cycles/[id].

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  const cycleId = params.id

  const cycle = await prisma.learningCycle.findUnique({
    where: { id: cycleId },
    select: {
      id: true,
      enrollmentId: true,
      status: true,
    },
  })

  if (!cycle) {
    return NextResponse.json({ error: 'Ciclo no encontrado' }, { status: 404 })
  }

  if (cycle.status !== 'closed') {
    return NextResponse.json(
      { error: 'El ciclo debe estar cerrado antes de autorizar continuidad' },
      { status: 409 },
    )
  }

  // Idempotency guard. Shape matches DL's P4b read exactly:
  //   prisma.continuitySignal.findFirst({
  //     where: { enrollmentId, learningCycleId: lastCycle.id, signalType: 'continue' }
  //   })
  // so DT cannot drift from what DL expects.
  const existing = await prisma.continuitySignal.findFirst({
    where: {
      enrollmentId: cycle.enrollmentId,
      learningCycleId: cycleId,
      signalType: 'continue',
    },
    select: { id: true },
  })
  if (existing) {
    return NextResponse.json(
      { error: 'Ya existe una señal de continuidad para este ciclo' },
      { status: 409 },
    )
  }

  const now = new Date()

  // Atomic transaction: emit the continue signal + advance enrollment
  // activity stamp (consistency with DS/DP/DQ). No other side-effects.
  // Rationale is pinned to the literal 'admin_authorize' for this phase.
  try {
    const result = await prisma.$transaction(async (tx: any) => {
      const signal = await tx.continuitySignal.create({
        data: {
          enrollmentId: cycle.enrollmentId,
          learningCycleId: cycleId,
          evaluationId: null,
          signalType: 'continue',
          rationale: 'admin_authorize',
        },
        select: {
          id: true,
          signalType: true,
          learningCycleId: true,
          createdAt: true,
        },
      })

      await tx.studentProgramInstance.update({
        where: { id: cycle.enrollmentId },
        data: { lastActivityAt: now },
      })

      return { signal }
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Error interno' }, { status: 500 })
  }
}
