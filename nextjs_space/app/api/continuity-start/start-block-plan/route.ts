export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { DEFAULT_DIAGNOSTIC_TYPE } from '@/lib/diagnostics/authoritative'
import { resolveStartBlockPlan } from '@/lib/continuity-start/start-block-plan'

/**
 * Phase DY — GET /api/continuity-start/start-block-plan
 *
 * Pure read endpoint. No side effects. No StudyLoad creation. No
 * materialization. No persistence.
 *
 * Semantic reminder (see lib/continuity-start/start-block-plan.ts):
 *   DY emits a canonical declarative plan describing the minimal shape of
 *   the initial continuity-start block. The plan does NOT, by itself,
 *   authorize workflow transitions, mutate continuity state, or create
 *   any rows. `plan.itemCount` is a declarative operational capacity HINT,
 *   NOT a guaranteed future materialization cardinality. `provisional_safe`
 *   is a statement about evidence quality / continuity-readiness, NOT
 *   about the student's academic ability. `escalate_refuse` with
 *   `itemCount: 0` is a first-class fake-personalization refusal.
 *
 * Query params:
 *   - enrollmentId   (required)
 *   - diagnosticType (optional, defaults to 'initial')
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const enrollmentId = searchParams.get('enrollmentId')
  const diagnosticType = searchParams.get('diagnosticType') ?? DEFAULT_DIAGNOSTIC_TYPE

  if (!enrollmentId) {
    return NextResponse.json(
      { error: 'enrollmentId is required' },
      { status: 400 }
    )
  }

  try {
    const enrollment = await prisma.studentProgramInstance.findUnique({
      where: { id: enrollmentId },
      select: { id: true },
    })
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    const result = await resolveStartBlockPlan(prisma, {
      enrollmentId,
      diagnosticType,
    })
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Internal error' },
      { status: 500 }
    )
  }
}
