export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { DEFAULT_DIAGNOSTIC_TYPE } from '@/lib/diagnostics/authoritative'
import { resolveContinuityStartPrecedence } from '@/lib/continuity-start/precedence'

/**
 * Phase EB — GET /api/continuity-start/precedence
 *
 * Pure-read, GET-only endpoint. No side effects. No writes. No DN/DU,
 * DZ, or EA replacement. No source-of-truth resolution. No write
 * authorization. No convergence decision.
 *
 * Semantic reminders (see lib/continuity-start/precedence.ts):
 *   - EB is a **governance reader**, not an arbiter of truth. It
 *     consumes the EA reconciliation result and, under a single 1:1
 *     TOTAL rule, emits a machine-readable statement of which side
 *     currently holds priority of interpretation.
 *   - MANDATORY: `precedence.preferred` is a **current governance-
 *     reading result only**. It does NOT mean the non-preferred side
 *     is invalid, deprecated, suppressed, or stripped of audit value,
 *     and it does NOT mean source-of-truth resolution has been made.
 *   - The constants `materializerOfRecord='structural_dn_du'`,
 *     `shadowSide='dz_shadow_block'`, `isSourceOfTruthDecision=false`,
 *     and `isWriteAuthorization=false` are emitted on every response
 *     as part of the contract.
 *   - Full DV+DW+DX+DY+DZ audit passthrough is preserved under
 *     `source.ea.shadow.source` (inherited from the EA echo).
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
  const diagnosticType =
    searchParams.get('diagnosticType') ?? DEFAULT_DIAGNOSTIC_TYPE

  if (!enrollmentId) {
    return NextResponse.json(
      { error: 'enrollmentId is required' },
      { status: 400 }
    )
  }

  try {
    const result = await resolveContinuityStartPrecedence(prisma, {
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
