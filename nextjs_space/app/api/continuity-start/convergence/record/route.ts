export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { DEFAULT_DIAGNOSTIC_TYPE } from '@/lib/diagnostics/authoritative'
import { resolveContinuityStartConvergence } from '@/lib/continuity-start/convergence'

/**
 * Phase ED rescue v1 — POST /api/continuity-start/convergence/record
 *
 * First official continuity-start governance-reading writeback.
 *
 * Writes exactly ONE ContinuitySignal row per call with:
 *   - signalType      = 'continuity_start_governance_reading'
 *   - enrollmentId    = <input>
 *   - learningCycleId = <EC.referenceCycleId or null>
 *   - evaluationId    = null
 *   - rationale       = <FLAT scalar-only JSON envelope; see below>
 *
 * No schema change. `ContinuitySignal.signalType` is a free-form
 * `String` column in the Prisma schema — no enum migration needed.
 * `ContinuitySignal.rationale` is a `String?` column — persisted as
 * a JSON-encoded string.
 *
 * ====================================================================
 * MANDATORY SEMANTIC CLARIFICATION (verbatim, binding on every call):
 * ====================================================================
 *
 *   `continuity_start_governance_reading` is a **RECORDING EVENT ONLY** —
 *   a persisted audit snapshot of the current EA+EB+EC governance
 *   posture at the moment of call.
 *
 *   It does **NOT** mean:
 *     - workflow transition
 *     - state transition
 *     - authorization
 *     - trigger
 *     - checkpoint that changes operational state
 *     - source-of-truth resolution
 *     - write authorization for any subsequent operation
 *     - convergence execution
 *     - merge decision
 *     - materializer-of-record promotion
 *     - pedagogical verdict or instructional equivalence claim
 *
 * ====================================================================
 * Rescue v1: FLAT scalar-only `rationale` payload
 * ====================================================================
 *
 * The prior ED implementation embedded the full EC `ConvergenceResult`
 * (including the nested DV+DW+DX+DY+DZ audit chain) under
 * `rationale.ec`. That nested structure raised deploy-risk concerns.
 *
 * Rescue v1 stores only FLAT SCALARS derived from the EC read:
 *
 *   {
 *     schemaVersion:           'ed.v1.flat',
 *     phase:                   'ED',
 *     recordingEventOnly:      true,
 *     semanticClarification:   <literal string>,
 *     // EC scalars:
 *     posture:                 ConvergencePosture,
 *     kind:                    ConvergenceKind,
 *     riskTier:                ConvergenceRiskTier,
 *     // EA echo scalar:
 *     reconciliationStatus:    ReconciliationStatus,
 *     // EB echo scalar:
 *     precedencePreferred:     PreferredSide,
 *     // reference cycle scalars:
 *     referenceCycleId:        string | null,
 *     referenceCycleNumber:    number | null,
 *     // six constant contract anchors:
 *     materializerOfRecord:    'structural_dn_du',
 *     shadowSide:              'dz_shadow_block',
 *     isSourceOfTruthDecision: false,
 *     isWriteAuthorization:    false,
 *     isConvergenceExecution:  false,
 *     isMergeDecision:         false,
 *     // timestamps:
 *     evaluatedAt:             string   // ISO, from EC
 *   }
 *
 * No nested `ec` object. No nested `source.eb.source.ea.shadow.source`
 * audit chain inside `rationale`. The full audit chain remains
 * reconstructible at read time by calling the EC reader
 * (`GET /api/continuity-start/convergence?enrollmentId=...`) — it is
 * NOT lost, only NOT persisted into the signal row.
 *
 * ====================================================================
 * Scope invariants
 * ====================================================================
 *
 *   - No DN/DU replacement.
 *   - No DZ replacement.
 *   - No EA / EB / EC replacement.
 *   - No convergence execution.
 *   - No merge decision.
 *   - No source-of-truth promotion.
 *   - No materializer-of-record promotion.
 *   - No enrollment-pointer mutation
 *     (StudentProgramInstance.status / .currentCycleId /
 *     .currentContinuityState / .lastActivityAt unchanged).
 *   - No StudyLoad / CycleSnapshot / LearningCycle mutation.
 *   - No UI surface added.
 *   - No idempotency / dedup / throttling: each call is a distinct
 *     point-in-time reading.
 *
 * Responses:
 *   401 — not authenticated
 *   400 — missing enrollmentId
 *   404 — enrollment not found (EC reader returns null)
 *   200 — signal row created; narrow JSON summary returned
 *   500 — unexpected error
 *
 * Body (JSON):
 *   {
 *     enrollmentId:   string   (required),
 *     diagnosticType: string   (optional; defaults to 'initial')
 *   }
 */

const ED_SEMANTIC_CLARIFICATION =
  '`continuity_start_governance_reading` is a recording event only. It does NOT mean workflow transition, state transition, authorization, trigger, or operational-state-changing checkpoint.'

/**
 * =====================================================================
 * Phase EE — GET /api/continuity-start/convergence/record
 * =====================================================================
 *
 * Minimal read-only consultation layer for the ED-persisted governance
 * reading rows. Companion (same URL) to the ED POST handler above.
 *
 * CONSULTATION SURFACE ONLY. This GET endpoint is a read/inspection
 * layer on top of what ED has already persisted. It does NOT mean:
 *   - workflow integration
 *   - behavioral dependency
 *   - gating dependency
 *   - operational decision source
 *   - replacement of direct DB inspection for broader ContinuitySignal
 *     semantics
 *
 * BINDING RULE FOR EE: during EE, no other code path is allowed to
 * depend on this endpoint for workflow behavior, gating, or operational
 * decisions. EE output must not be consumed anywhere else in the
 * codebase in this phase (no import of this endpoint from DN/DU, DZ,
 * EA, EB, EC, ED, or any admin / student-facing flow).
 *
 * Contract:
 *   GET /api/continuity-start/convergence/record
 *     ?enrollmentId=<cuid>         (required)
 *     [&limit=<1..50>]             (default 20, hard-capped at 50)
 *     [&cursor=<ContinuitySignal.id>]  (keyset pagination)
 *
 * Responses:
 *   401 — not authenticated
 *   400 — missing enrollmentId
 *   404 — enrollment not found
 *   200 — { enrollmentId, signalType, count, items, nextCursor,
 *           effectiveLimit }
 *
 * Strict filter (hard-coded; NOT a query parameter):
 *   signalType = 'continuity_start_governance_reading'
 *
 * This means the endpoint can return ONLY ED-typed rows. Even if
 * other signalType values exist in `continuity_signals` for the same
 * enrollment, they are NEVER returned by this endpoint. Widening this
 * filter requires an explicit code change, not a URL change.
 *
 * Order: createdAt DESC, id DESC (stable).
 * Cursor: opaque string, must equal a prior page's last item `id`.
 *
 * No side-effects: no writes, no patches, no deletes, no pointer
 * mutation on StudentProgramInstance, no mutation of any other table.
 * EE is strictly a SELECT.
 *
 * Rationale field: stored on disk as a JSON-encoded String (see ED
 * comment above). This handler attempts to `JSON.parse` each row's
 * rationale; if parsing fails, the raw string is returned and
 * `rationaleParseOk` is set to `false` on that row only — the other
 * rows are unaffected. A single corrupt row can never 500 the list.
 */
const EE_SIGNAL_TYPE = 'continuity_start_governance_reading' as const
const EE_DEFAULT_LIMIT = 20
const EE_MAX_LIMIT = 50

function parseLimit(raw: string | null): number {
  if (raw === null) return EE_DEFAULT_LIMIT
  const n = Number.parseInt(raw, 10)
  if (!Number.isFinite(n) || n <= 0) return EE_DEFAULT_LIMIT
  if (n > EE_MAX_LIMIT) return EE_MAX_LIMIT
  return n
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const enrollmentId = url.searchParams.get('enrollmentId')
  const cursor = url.searchParams.get('cursor')
  const effectiveLimit = parseLimit(url.searchParams.get('limit'))

  if (!enrollmentId || typeof enrollmentId !== 'string') {
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
    if (enrollment === null) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    // Keyset pagination: fetch one extra row to decide whether a
    // nextCursor should be emitted. Strict signalType filter is
    // hard-coded here — it is NOT sourced from `url.searchParams`.
    const rows = await prisma.continuitySignal.findMany({
      where: {
        enrollmentId,
        signalType: EE_SIGNAL_TYPE,
      },
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' },
      ],
      take: effectiveLimit + 1,
      ...(cursor
        ? { cursor: { id: cursor }, skip: 1 }
        : {}),
      select: {
        id: true,
        enrollmentId: true,
        signalType: true,
        learningCycleId: true,
        evaluationId: true,
        rationale: true,
        createdAt: true,
      },
    })

    const hasMore = rows.length > effectiveLimit
    const pageRows = hasMore ? rows.slice(0, effectiveLimit) : rows
    const nextCursor = hasMore ? pageRows[pageRows.length - 1].id : null

    const items = pageRows.map((r) => {
      // Per-row JSON.parse tolerance: a corrupt or null rationale
      // must not take the endpoint down.
      let parsed: unknown = r.rationale
      let parseOk = false
      if (typeof r.rationale === 'string') {
        try {
          parsed = JSON.parse(r.rationale)
          parseOk = true
        } catch {
          parsed = r.rationale
          parseOk = false
        }
      } else if (r.rationale === null) {
        parsed = null
        parseOk = false
      }
      return {
        id: r.id,
        enrollmentId: r.enrollmentId,
        signalType: r.signalType,
        learningCycleId: r.learningCycleId,
        evaluationId: r.evaluationId,
        createdAt: r.createdAt.toISOString(),
        rationale: parsed,
        rationaleParseOk: parseOk,
      }
    })

    return NextResponse.json({
      enrollmentId,
      signalType: EE_SIGNAL_TYPE,
      count: items.length,
      items,
      nextCursor,
      effectiveLimit,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Internal error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    body = null
  }

  const enrollmentId = body?.enrollmentId
  const diagnosticType = body?.diagnosticType ?? DEFAULT_DIAGNOSTIC_TYPE

  if (!enrollmentId || typeof enrollmentId !== 'string') {
    return NextResponse.json(
      { error: 'enrollmentId is required' },
      { status: 400 }
    )
  }

  try {
    const ec = await resolveContinuityStartConvergence(prisma, {
      enrollmentId,
      diagnosticType,
    })
    if (ec === null) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    // Build FLAT scalar-only rationale envelope (rescue v1).
    const rationale = {
      schemaVersion: 'ed.v1.flat' as const,
      phase: 'ED' as const,
      recordingEventOnly: true as const,
      semanticClarification: ED_SEMANTIC_CLARIFICATION,
      // EC scalars
      posture: ec.convergence.posture,
      kind: ec.convergence.kind,
      riskTier: ec.convergence.riskTier,
      // EA echo scalar
      reconciliationStatus: ec.reconciliation.status,
      // EB echo scalar
      precedencePreferred: ec.precedence.preferred,
      // reference cycle scalars
      referenceCycleId: ec.referenceCycleId,
      referenceCycleNumber: ec.referenceCycleNumber,
      // six constant contract anchors
      materializerOfRecord: ec.convergence.materializerOfRecord,
      shadowSide: ec.convergence.shadowSide,
      isSourceOfTruthDecision: ec.convergence.isSourceOfTruthDecision,
      isWriteAuthorization: ec.convergence.isWriteAuthorization,
      isConvergenceExecution: ec.convergence.isConvergenceExecution,
      isMergeDecision: ec.convergence.isMergeDecision,
      // timestamps
      evaluatedAt: ec.evaluatedAt,
    }

    const signal = await prisma.continuitySignal.create({
      data: {
        enrollmentId,
        learningCycleId: ec.referenceCycleId ?? null,
        evaluationId: null,
        signalType: 'continuity_start_governance_reading',
        // `rationale` is a String? column (not Json). Store a JSON string.
        rationale: JSON.stringify(rationale),
      },
      select: {
        id: true,
        createdAt: true,
        enrollmentId: true,
        signalType: true,
        learningCycleId: true,
      },
    })

    return NextResponse.json({
      id: signal.id,
      recordedAt: signal.createdAt.toISOString(),
      enrollmentId: signal.enrollmentId,
      signalType: signal.signalType,
      learningCycleId: signal.learningCycleId,
      // narrow echo of persisted scalars for clients:
      posture: rationale.posture,
      kind: rationale.kind,
      riskTier: rationale.riskTier,
      reconciliationStatus: rationale.reconciliationStatus,
      precedencePreferred: rationale.precedencePreferred,
      referenceCycleId: rationale.referenceCycleId,
      referenceCycleNumber: rationale.referenceCycleNumber,
      schemaVersion: rationale.schemaVersion,
      recordingEventOnly: rationale.recordingEventOnly,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Internal error' },
      { status: 500 }
    )
  }
}
