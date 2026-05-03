export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { DEFAULT_DIAGNOSTIC_TYPE } from '@/lib/diagnostics/authoritative'
import { resolveContinuityStartConvergence } from '@/lib/continuity-start/convergence'
import { requireAdminApi } from '@/lib/admin-guard'

/**
 * Phase EC — GET /api/continuity-start/convergence
 *
 * Pure-read, GET-only endpoint. No side effects. No writes. No DN/DU,
 * DZ, EA, or EB replacement. No source-of-truth resolution. No write
 * authorization. No convergence execution. No merge decision. No
 * materializer-of-record promotion.
 *
 * Semantic reminders (see lib/continuity-start/convergence.ts):
 *   - EC is a **governance reader**, not an arbiter of truth and not
 *     an executor. It consumes the EB precedence result (which itself
 *     consumes EA verbatim) and, under a single 1:1 TOTAL rule, emits
 *     a machine-readable statement of whether the two sides are
 *     currently convergible under a narrow rule, and if so of what
 *     minimal kind.
 *   - MANDATORY: `convergence.posture === 'convergible_safe'` is a
 *     **current posture reading only** — it means only that the
 *     current posture is compatible with a LATER, SEPARATELY SCOPED
 *     convergence write. It does NOT mean "converge now",
 *     "recommended to converge now", "scheduled to converge now",
 *     automatic merge justification, or automatic
 *     materializer-of-record promotion. In short: `convergible_safe`
 *     is a posture-reading only, NOT an execution recommendation.
 *   - `blocked` does NOT mean the shadow side is invalid, deprecated,
 *     suppressed, or stripped of audit value (EB-2 clause inherited).
 *   - `structurally_deferred` does NOT mean shadow has been promoted
 *     or that convergence has been silently performed.
 *   - The constants `materializerOfRecord='structural_dn_du'`,
 *     `shadowSide='dz_shadow_block'`, `isSourceOfTruthDecision=false`,
 *     `isWriteAuthorization=false`, `isConvergenceExecution=false`,
 *     and `isMergeDecision=false` are emitted on every response as
 *     part of the contract.
 *   - Full DV+DW+DX+DY+DZ audit passthrough is preserved under
 *     `source.eb.source.ea.shadow.source` (inherited from the EB echo,
 *     which inherits from the EA echo).
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
    const result = await resolveContinuityStartConvergence(prisma, {
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
