/**
 * Phase EB — Minimal Read-Only Precedence Layer between the
 *            structural materialization (DN/DU) and the tactical
 *            shadow continuity-start (DZ), consuming EA.
 *
 * CRITICAL SEMANTIC CONSTRAINTS (do not widen):
 *
 *   (EB-1) EB is a **governance reader**, not an arbiter of truth.
 *          It consumes the EA reconciliation result and emits, under a
 *          single minimal 1:1 total rule, a machine-readable statement
 *          about which side currently holds priority of
 *          interpretation. It does NOT:
 *            - write any row,
 *            - mutate any enrollment / cycle / snapshot / signal,
 *            - replace DN/DU (structural materializer of record),
 *            - replace DZ (shadow materializer),
 *            - replace EA (reconciliation witness),
 *            - emit any ContinuitySignal,
 *            - trigger any transition,
 *            - authorize writes,
 *            - resolve source of truth,
 *            - decide convergence,
 *            - feed any DN/DU precondition (P1..P4b) or any other
 *              gateway.
 *          Any such behavior belongs to a later, separately scoped
 *          phase (materializer-of-record / convergence).
 *
 *   (EB-2) MANDATORY SEMANTIC CLARIFICATION OF `preferred`.
 *          `precedence.preferred` in EB is a **current governance-
 *          reading result only**. It states only which side currently
 *          has priority of interpretation under the present system
 *          posture, under the minimal rule encoded in `PRECEDENCE_RULE`
 *          below.
 *
 *          `preferred` does NOT mean, in any sense, that the
 *          non-preferred side:
 *            - is invalid,
 *            - is deprecated,
 *            - is suppressed,
 *            - loses audit value,
 *            - is a worse pedagogical option,
 *            - is structurally wrong,
 *            - must be discarded or silenced.
 *
 *          `preferred` also does NOT mean that source-of-truth
 *          resolution has been made. EB is explicitly upstream of the
 *          source-of-truth question, and is intentionally kept that
 *          way.
 *
 *          In all cases, the full DV+DW+DX+DY+DZ audit chain is
 *          preserved under `source.ea.shadow.source` and remains the
 *          authoritative trace for the non-preferred side as much as
 *          for the preferred side.
 *
 *   (EB-3) The rule is 1:1 TOTAL over the six EA statuses. The
 *          mapping is deliberately conservative: in every state where
 *          the system has a materialized structural block, the
 *          structural side is read as currently preferred. The only
 *          state where the shadow side is read as currently preferred
 *          is `no_structural_block` — and even there the preference is
 *          labelled `low` risk precisely because there is nothing
 *          materialized to displace.
 *
 *          If a new EA status is ever introduced, the `Record<
 *          ReconciliationStatus, PrecedenceRule>` mapping below will
 *          fail to type-check. That is the intended behavior: a new
 *          status MUST go through its own explicit phase.
 *
 *   (EB-4) `precedence.materializerOfRecord` is emitted as a literal
 *          string constant `'structural_dn_du'` in every response.
 *          `precedence.shadowSide` is emitted as a literal string
 *          constant `'dz_shadow_block'` in every response.
 *          `precedence.isSourceOfTruthDecision` is emitted as the
 *          literal boolean `false` in every response.
 *          `precedence.isWriteAuthorization` is emitted as the literal
 *          boolean `false` in every response.
 *          These constants are part of the contract so that no future
 *          phase can silently "upgrade" EB into a write-path decision
 *          without an explicit, visible code change to this file.
 *
 *   (EB-5) EB performs NO schema change. The precedence statement is
 *          not persisted by design. Persisting it would prejudge the
 *          future source-of-truth question, which EB explicitly
 *          defers.
 *
 *   (EB-6) EB reuses EA verbatim. No duplicated classification logic.
 *          The EA payload (including the full DV..DZ audit chain
 *          under `shadow.source`) is echoed under `source.ea` so the
 *          governance verdict remains fully auditable from a single
 *          response.
 *
 * Scope: pure read. GET-only consumption surface at
 * /api/continuity-start/precedence.
 */

import type { PrismaClient } from '@prisma/client'
import { prisma as defaultPrisma } from '@/lib/prisma'
import {
  reconcileContinuityStart,
  type ReconciliationResult,
  type ReconciliationStatus,
} from '@/lib/continuity-start/reconciliation'

type PrismaLike =
  | PrismaClient
  | any

/**
 * Which side is read as currently holding priority of interpretation.
 * See (EB-2): this is a governance-reading result only.
 */
export type PreferredSide = 'structural' | 'shadow'

/**
 * Canonical reason keys. 1:1 with EA statuses (EB-3).
 */
export type PrecedenceReason =
  | 'no_materialized_block_yet'
  | 'structural_is_materializer_of_record_and_aligned'
  | 'shadow_low_confidence_vs_materialized_structural'
  | 'shadow_refusal_vs_materialized_structural'
  | 'shadow_empty_vs_materialized_structural'
  | 'shadow_set_escapes_structural_selection'

export type PrecedenceRiskTier = 'low' | 'medium' | 'high'

/**
 * Constant tags emitted on every response. See (EB-4).
 *
 * These literals exist so that no future phase can silently promote
 * EB into a source-of-truth or write-authorization layer without a
 * visible, reviewable diff.
 */
export const EB_MATERIALIZER_OF_RECORD = 'structural_dn_du' as const
export const EB_SHADOW_SIDE = 'dz_shadow_block' as const
export const EB_IS_SOURCE_OF_TRUTH_DECISION = false as const
export const EB_IS_WRITE_AUTHORIZATION = false as const

interface PrecedenceRule {
  preferred: PreferredSide
  reason: PrecedenceReason
  riskTier: PrecedenceRiskTier
}

/**
 * Binding 1:1 TOTAL precedence rule over EA statuses (EB-3).
 *
 * Encoded as a `Record<ReconciliationStatus, PrecedenceRule>` so that
 * introducing a new EA status in the future becomes a TypeScript
 * compile-time error here — forcing an explicit EB-successor phase.
 */
export const PRECEDENCE_RULE: Record<ReconciliationStatus, PrecedenceRule> = {
  no_structural_block: {
    preferred: 'shadow',
    reason: 'no_materialized_block_yet',
    riskTier: 'low',
  },
  aligned_skillstate: {
    preferred: 'structural',
    reason: 'structural_is_materializer_of_record_and_aligned',
    riskTier: 'low',
  },
  shape_divergent_safe: {
    preferred: 'structural',
    reason: 'shadow_low_confidence_vs_materialized_structural',
    riskTier: 'medium',
  },
  shape_divergent_refusal: {
    preferred: 'structural',
    reason: 'shadow_refusal_vs_materialized_structural',
    riskTier: 'medium',
  },
  shadow_empty_vs_materialized: {
    preferred: 'structural',
    reason: 'shadow_empty_vs_materialized_structural',
    riskTier: 'medium',
  },
  set_divergent_skillstate: {
    preferred: 'structural',
    reason: 'shadow_set_escapes_structural_selection',
    riskTier: 'high',
  },
}

export interface PrecedenceSummary {
  /**
   * The side currently read as holding priority of interpretation.
   *
   * See (EB-2): this is a **current governance-reading result only**.
   * It does NOT mean the non-preferred side is invalid, deprecated,
   * suppressed, or stripped of audit value, and it does NOT mean
   * source-of-truth resolution has been made.
   */
  preferred: PreferredSide
  reason: PrecedenceReason
  riskTier: PrecedenceRiskTier
  /** Literal constant. See (EB-4). */
  materializerOfRecord: typeof EB_MATERIALIZER_OF_RECORD
  /** Literal constant. See (EB-4). */
  shadowSide: typeof EB_SHADOW_SIDE
  /** Literal constant. See (EB-4). EB never resolves source of truth. */
  isSourceOfTruthDecision: typeof EB_IS_SOURCE_OF_TRUTH_DECISION
  /** Literal constant. See (EB-4). EB never authorizes any write. */
  isWriteAuthorization: typeof EB_IS_WRITE_AUTHORIZATION
}

export interface PrecedenceResult {
  enrollmentId: string
  diagnosticType: string
  referenceCycleId: string | null
  referenceCycleNumber: number | null
  precedence: PrecedenceSummary
  /**
   * Narrow EA echo: the status+reason pair EB consumed. The full EA
   * payload (including the DV..DZ audit chain) is carried under
   * `source.ea` below — see (EB-6).
   */
  reconciliation: {
    status: ReconciliationStatus
    reason: ReconciliationResult['reconciliation']['reason']
  }
  source: {
    ea: ReconciliationResult
  }
  evaluatedAt: string
}

export interface ResolveContinuityStartPrecedenceInput {
  enrollmentId: string
  diagnosticType?: string
}

/**
 * Resolves the minimal EB precedence artifact for the given
 * enrollment and diagnosticType.
 *
 * Pure read. See file header (EB-1..EB-6) for binding semantic
 * constraints; in particular, `precedence.preferred` is a current
 * governance-reading result only and does NOT imply invalidation,
 * deprecation, suppression, loss of audit value, or source-of-truth
 * resolution of the non-preferred side.
 *
 * Returns `null` iff the underlying EA resolver returns `null`
 * (enrollment not found). The route layer translates `null` to 404.
 */
export async function resolveContinuityStartPrecedence(
  client: PrismaLike | null | undefined,
  input: ResolveContinuityStartPrecedenceInput
): Promise<PrecedenceResult | null> {
  const tx = (client ?? defaultPrisma) as PrismaClient

  const ea = await reconcileContinuityStart(tx, {
    enrollmentId: input.enrollmentId,
    diagnosticType: input.diagnosticType,
  })
  if (ea === null) return null

  const rule = PRECEDENCE_RULE[ea.reconciliation.status]

  const precedence: PrecedenceSummary = {
    preferred: rule.preferred,
    reason: rule.reason,
    riskTier: rule.riskTier,
    materializerOfRecord: EB_MATERIALIZER_OF_RECORD,
    shadowSide: EB_SHADOW_SIDE,
    isSourceOfTruthDecision: EB_IS_SOURCE_OF_TRUTH_DECISION,
    isWriteAuthorization: EB_IS_WRITE_AUTHORIZATION,
  }

  return {
    enrollmentId: ea.enrollmentId,
    diagnosticType: ea.diagnosticType,
    referenceCycleId: ea.referenceCycleId,
    referenceCycleNumber: ea.referenceCycleNumber,
    precedence,
    reconciliation: {
      status: ea.reconciliation.status,
      reason: ea.reconciliation.reason,
    },
    source: { ea },
    evaluatedAt: new Date().toISOString(),
  }
}
