export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { DEFAULT_DIAGNOSTIC_TYPE } from '@/lib/diagnostics/authoritative'
import { resolveShadowContinuityStartBlock } from '@/lib/continuity-start/shadow-materializer'

/**
 * Phase DZ — GET /api/continuity-start/shadow-block
 *
 * Pure-read, GET-only endpoint. No side effects. No StudyLoad creation.
 * No persistence. No reconciliation with DN/DU. No LLM / agent call.
 *
 * Semantic reminders (see lib/continuity-start/shadow-materializer.ts):
 *   - DZ is a **shadow materializer**, not a materializer of record.
 *     DN/DU remain the authoritative structural materializer for the
 *     first load of cycle N+1 until a later, separately scoped
 *     reconciliation phase.
 *   - `itemCountHint` is a declarative operational capacity hint, NOT a
 *     guaranteed materialization cardinality. `itemsResolvedCount` MAY
 *     be less than `itemCountHint` when the SkillState pool is
 *     insufficient (honest downgrade; no fake padding).
 *   - `source: 'skillstate_heuristic'` means the item was resolved from
 *     the currently available structural heuristic inputs only. It
 *     does NOT mean pedagogically optimal, fully personalized, or
 *     instructionally validated. It is a structural resolution source,
 *     not a pedagogical quality claim.
 *   - `provisional_safe` items are a statement about evidence quality /
 *     continuity-readiness, NOT about the student's academic ability.
 *   - `escalate_refuse` with `items: []` is a first-class refusal, not
 *     an error.
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
    const result = await resolveShadowContinuityStartBlock(prisma, {
      enrollmentId,
      diagnosticType,
    })
    if (result === null) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Internal error' },
      { status: 500 }
    )
  }
}
