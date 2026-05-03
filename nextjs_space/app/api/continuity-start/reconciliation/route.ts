export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { DEFAULT_DIAGNOSTIC_TYPE } from '@/lib/diagnostics/authoritative'
import { reconcileContinuityStart } from '@/lib/continuity-start/reconciliation'
import { requireAdminApi } from '@/lib/admin-guard'

/**
 * Phase EA — GET /api/continuity-start/reconciliation
 *
 * Pure-read, GET-only endpoint. No side effects. No writes. No
 * precedence decision. No source-of-truth resolution. No DN/DU or DZ
 * replacement.
 *
 * Semantic reminders (see lib/continuity-start/reconciliation.ts):
 *   - EA is a **witness**, not an arbiter. It reads the structural
 *     cycle_open snapshot produced by DN/DU and the DZ shadow block,
 *     then classifies their relationship under a single minimal 1:1
 *     total rule.
 *   - `aligned_skillstate` has a **narrow, strictly structural**
 *     meaning: subset inclusion of non-null shadow skillIds within
 *     the structural `selectedSkillIds` for the chosen reference
 *     cycle. It does NOT mean pedagogical, full-block, or operational
 *     equivalence, and does NOT resolve precedence or source of truth.
 *   - The **reference cycle** is the enrollment's LearningCycle with
 *     the lowest `cycleNumber` that has a CycleSnapshot with
 *     snapshotType = 'cycle_open'. If none exists, EA returns
 *     `no_structural_block` as a first-class classification.
 *   - Full DV+DW+DX+DY+DZ audit passthrough is preserved under
 *     `shadow.source`.
 *
 * Query params:
 *   - enrollmentId   (required)
 *   - diagnosticType (optional, defaults to 'initial')
 */
export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  const { searchParams } = new URL(req.url)
  const enrollmentId = searchParams.get('enrollmentId')
  const diagnosticType =
    searchParams.get('diagnosticType') ?? DEFAULT_DIAGNOSTIC_TYPE

  if (!enrollmentId) {
    return NextResponse.json(
      { error: 'enrollmentId is required' },
      { status: 400 }
    )
  }

  try {
    const result = await reconcileContinuityStart(prisma, {
      enrollmentId,
      diagnosticType,
    })
    if (result === null) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Internal error' },
      { status: 500 }
    )
  }
}
