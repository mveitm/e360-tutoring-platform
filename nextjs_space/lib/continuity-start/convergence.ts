/**
 * Phase EC — Minimal Read-Only Convergence-Reading Layer between the
 *            structural materialization (DN/DU) and the tactical
 *            shadow continuity-start (DZ), consuming EA + EB.
 *
 * CRITICAL SEMANTIC CONSTRAINTS (do not widen):
 *
 *   (EC-1) EC is a **governance reader**, not an arbiter of truth and
 *          not an executor. It consumes the EB precedence result
 *          (which itself consumes EA verbatim) and emits, under a
 *          single minimal 1:1 TOTAL rule, a machine-readable statement
 *          about whether the two sides are currently convergible under
 *          a narrow rule, and if so of what minimal kind. EC does NOT:
 *            - write any row,
 *            - create / modify / delete StudyLoad / CycleSnapshot /
 *              ContinuitySignal / LearningCycle / SkillState rows,
 *            - mutate enrollment pointers (currentCycleId /
 *              currentContinuityState / lastActivityAt),
 *            - replace DN/DU (structural materializer of record),
 *            - replace DZ (shadow materializer),
 *            - replace EA (reconciliation witness),
 *            - replace EB (precedence layer),
 *            - emit any ContinuitySignal (even on convergible_safe —
 *              see EC-2),
 *            - trigger any transition,
 *            - authorize writes,
 *            - resolve source of truth,
 *            - execute convergence,
 *            - decide a merge,
 *            - perform materializer-of-record promotion,
 *            - feed any DN/DU precondition (P1..P4b) or any other
 *              gateway.
 *          Any such behavior belongs to a later, separately scoped
 *          phase (materializer-of-record / convergence execution).
 *
 *   (EC-2) MANDATORY SEMANTIC CLARIFICATION OF `convergence.posture`.
 *
 *          (a) `convergible_safe` is a **current posture reading only**.
 *              It means ONLY that the current posture is compatible
 *              with a LATER, SEPARATELY SCOPED convergence write —
 *              specifically, that the set of non-null shadow skillIds
 *              is a structural SUBSET of the structural cycle_open
 *              `selectedSkillIds` for the chosen reference cycle.
 *
 *              `convergible_safe` does NOT mean, in any sense:
 *                - "converge now",
 *                - "recommended to converge now",
 *                - "scheduled to converge now",
 *                - automatic merge justification,
 *                - automatic materializer-of-record promotion,
 *                - a write authorization,
 *                - a write trigger,
 *                - a source-of-truth resolution,
 *                - a decision to converge at any time,
 *                - a pedagogical / operational / instructional
 *                  equivalence claim between the two sides.
 *
 *              In short: `convergible_safe` is a posture-reading only,
 *              NOT an execution recommendation.
 *
 *          (b) `blocked` means only that, under the present posture,
 *              EC cannot read a safe convergence kind. It does NOT
 *              mean the shadow side is invalid, deprecated,
 *              suppressed, or stripped of audit value — the EB-2
 *              clause is inherited wholesale. The full DV+DW+DX+DY+DZ
 *              audit chain remains authoritative for the shadow side
 *              via `source.eb.source.ea.shadow.source`.
 *
 *          (c) `structurally_deferred` means there is no materialized
 *              structural block yet to converge with. It does NOT
 *              mean shadow has been promoted, that convergence has
 *              been silently performed, or that the materializer of
 *              record has shifted. It means only that the convergence
 *              question is not applicable under the present posture.
 *
 *   (EC-3) The rule is 1:1 TOTAL over the six EA statuses. EC is
 *          deliberately conservative: `convergible_safe` is emitted
 *          ONLY for EA `aligned_skillstate` (the narrow local
 *          structural subset-alignment status). For every other EA
 *          status where a materialized structural block exists, EC
 *          returns `blocked`. For `no_structural_block` EC returns
 *          `structurally_deferred`. EC does NOT exploit EB's
 *          `preferred=structural` to upgrade convergence posture:
 *          precedence of interpretation and convergibility are
 *          different questions, and EC refuses to collapse them.
 *
 *          If a new EA status is ever introduced, the
 *          `Record<ReconciliationStatus, ConvergenceRule>` mapping
 *          below will fail to type-check. That is the intended
 *          behavior: a new status MUST go through its own explicit
 *          phase.
 *
 *   (EC-4) The convergence **kind** is deliberately singular.
 *          `narrow_subset_alignment` is the ONLY non-`none` convergence
 *          kind EC emits. EC refuses to invent a broader convergence
 *          kind; richer kinds (e.g. `partial_structural_alignment`)
 *          are explicitly deferred to a later, separately scoped
 *          phase. Binding invariants:
 *            - `kind === 'narrow_subset_alignment'` iff
 *              `posture === 'convergible_safe'`
 *            - `kind === 'none'` iff
 *              `posture !== 'convergible_safe'`
 *
 *   (EC-5) Constants emitted on every response (contract anchors):
 *            materializerOfRecord    = 'structural_dn_du'
 *            shadowSide              = 'dz_shadow_block'
 *            isSourceOfTruthDecision = false
 *            isWriteAuthorization    = false
 *            isConvergenceExecution  = false
 *            isMergeDecision         = false
 *          These literals exist so that no future phase can silently
 *          promote EC into a merge or write-execution layer without a
 *          visible, reviewable diff to this file.
 *
 *   (EC-6) EC performs NO schema change. The convergence statement is
 *          not persisted by design. Persisting it would prejudge the
 *          future source-of-truth / materializer-of-record question,
 *          which EC explicitly defers.
 *
 *   (EC-7) EC reuses EB verbatim (which reuses EA verbatim). No
 *          duplicated classification logic. The full EB payload is
 *          echoed under `source.eb`, carrying `source.eb.source.ea`
 *          and the DV+DW+DX+DY+DZ chain under
 *          `source.eb.source.ea.shadow.source`.
 *
 * Scope: pure read. GET-only consumption surface at
 * /api/continuity-start/convergence.
 */

import type { PrismaClient } from '@prisma/client'
import { prisma as defaultPrisma } from '@/lib/prisma'
import {
  resolveContinuityStartPrecedence,
  type PrecedenceResult,
  type PreferredSide,
  type PrecedenceReason,
  type PrecedenceRiskTier,
} from '@/lib/continuity-start/precedence'
import type { ReconciliationStatus } from '@/lib/continuity-start/reconciliation'

type PrismaLike =
  | PrismaClient
  | Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]

/**
 * Convergence posture. See (EC-2) for binding semantics.
 *
 * `convergible_safe` — posture-reading only, NOT an execution
 *                      recommendation (see EC-2(a)).
 * `blocked`          — posture not currently convergible; NOT an
 *                      invalidation/suppression/deprecation verdict
 *                      against the shadow side (see EC-2(b)).
 * `structurally_deferred` — no materialized structural block yet to
 *                           converge with; NOT a shadow promotion
 *                           (see EC-2(c)).
 */
export type ConvergencePosture =
  | 'convergible_safe'
  | 'blocked'
  | 'structurally_deferred'

/**
 * Convergence kind. See (EC-4).
 *
 * `narrow_subset_alignment` is emitted iff posture === 'convergible_safe'.
 * `none` is emitted in every other posture.
 */
export type ConvergenceKind = 'narrow_subset_alignment' | 'none'

/**
 * 1:1 TOTAL canonical reasons over EA statuses. See (EC-3).
 */
export type ConvergenceReason =
  | 'no_materialized_structural_block_yet_to_converge_with'
  | 'shadow_skillids_subset_of_structural_selection'
  | 'shadow_low_confidence_vs_materialized_structural'
  | 'shadow_refusal_vs_materialized_structural'
  | 'shadow_empty_vs_materialized_structural'
  | 'shadow_set_escapes_structural_selection'

export type ConvergenceRiskTier = 'low' | 'medium' | 'high'

/**
 * Constant tags emitted on every response. See (EC-5).
 */
export const EC_MATERIALIZER_OF_RECORD = 'structural_dn_du' as const
export const EC_SHADOW_SIDE = 'dz_shadow_block' as const
export const EC_IS_SOURCE_OF_TRUTH_DECISION = false as const
export const EC_IS_WRITE_AUTHORIZATION = false as const
export const EC_IS_CONVERGENCE_EXECUTION = false as const
export const EC_IS_MERGE_DECISION = false as const

interface ConvergenceRule {
  posture: ConvergencePosture
  kind: ConvergenceKind
  reason: ConvergenceReason
  riskTier: ConvergenceRiskTier
}

/**
 * Binding 1:1 TOTAL convergence-posture rule over EA statuses.
 * See (EC-3) and (EC-4).
 *
 * Encoded as a `Record<ReconciliationStatus, ConvergenceRule>` so that
 * introducing a new EA status in the future becomes a TypeScript
 * compile-time error here — forcing an explicit EC-successor phase.
 *
 * Conservative by design: `convergible_safe` + `narrow_subset_alignment`
 * is emitted ONLY for `aligned_skillstate`. Every other status with a
 * materialized structural block collapses to `blocked` / `none`.
 * `no_structural_block` collapses to `structurally_deferred` / `none`.
 */
export const CONVERGENCE_RULE: Record<ReconciliationStatus, ConvergenceRule> = {
  no_structural_block: {
    posture: 'structurally_deferred',
    kind: 'none',
    reason: 'no_materialized_structural_block_yet_to_converge_with',
    riskTier: 'low',
  },
  aligned_skillstate: {
    posture: 'convergible_safe',
    kind: 'narrow_subset_alignment',
    reason: 'shadow_skillids_subset_of_structural_selection',
    riskTier: 'low',
  },
  shape_divergent_safe: {
    posture: 'blocked',
    kind: 'none',
    reason: 'shadow_low_confidence_vs_materialized_structural',
    riskTier: 'medium',
  },
  shape_divergent_refusal: {
    posture: 'blocked',
    kind: 'none',
    reason: 'shadow_refusal_vs_materialized_structural',
    riskTier: 'medium',
  },
  shadow_empty_vs_materialized: {
    posture: 'blocked',
    kind: 'none',
    reason: 'shadow_empty_vs_materialized_structural',
    riskTier: 'medium',
  },
  set_divergent_skillstate: {
    posture: 'blocked',
    kind: 'none',
    reason: 'shadow_set_escapes_structural_selection',
    riskTier: 'high',
  },
}

export interface ConvergenceSummary {
  /**
   * See (EC-2). This is a current governance posture reading only.
   *
   * In particular, `convergible_safe` means ONLY that the current
   * posture is compatible with a LATER, SEPARATELY SCOPED convergence
   * write. It does NOT mean "converge now", "recommended to converge
   * now", "scheduled to converge now", automatic merge justification,
   * or automatic materializer-of-record promotion.
   */
  posture: ConvergencePosture
  /**
   * See (EC-4). `narrow_subset_alignment` iff posture is
   * `convergible_safe`; `none` otherwise. No other kind is emitted by
   * EC.
   */
  kind: ConvergenceKind
  reason: ConvergenceReason
  riskTier: ConvergenceRiskTier
  /** Literal constant. See (EC-5). */
  materializerOfRecord: typeof EC_MATERIALIZER_OF_RECORD
  /** Literal constant. See (EC-5). */
  shadowSide: typeof EC_SHADOW_SIDE
  /** Literal constant. See (EC-5). EC never resolves source of truth. */
  isSourceOfTruthDecision: typeof EC_IS_SOURCE_OF_TRUTH_DECISION
  /** Literal constant. See (EC-5). EC never authorizes any write. */
  isWriteAuthorization: typeof EC_IS_WRITE_AUTHORIZATION
  /** Literal constant. See (EC-5). EC never executes convergence. */
  isConvergenceExecution: typeof EC_IS_CONVERGENCE_EXECUTION
  /** Literal constant. See (EC-5). EC never decides a merge. */
  isMergeDecision: typeof EC_IS_MERGE_DECISION
}

export interface ConvergenceResult {
  enrollmentId: string
  diagnosticType: string
  referenceCycleId: string | null
  referenceCycleNumber: number | null
  convergence: ConvergenceSummary
  /**
   * Narrow EA echo. Full EA payload is carried under
   * `source.eb.source.ea`.
   */
  reconciliation: {
    status: ReconciliationStatus
    reason: PrecedenceResult['reconciliation']['reason']
  }
  /**
   * Narrow EB echo. Full EB payload is carried under `source.eb`.
   */
  precedence: {
    preferred: PreferredSide
    reason: PrecedenceReason
    riskTier: PrecedenceRiskTier
  }
  /**
   * Full EB passthrough — itself carries EA (source.ea) and the
   * DV+DW+DX+DY+DZ audit chain under source.ea.shadow.source.
   */
  source: {
    eb: PrecedenceResult
  }
  evaluatedAt: string
}

export interface ResolveContinuityStartConvergenceInput {
  enrollmentId: string
  diagnosticType?: string
}

/**
 * Resolves the minimal EC convergence-posture artifact for the given
 * enrollment and diagnosticType.
 *
 * Pure read. See file header (EC-1..EC-7) for binding semantic
 * constraints; in particular, `convergence.posture === 'convergible_safe'`
 * is a current posture reading only, NOT an execution recommendation
 * and NOT a materializer-of-record promotion.
 *
 * Returns `null` iff the underlying EB resolver returns `null`
 * (enrollment not found). The route layer translates `null` to 404.
 */
export async function resolveContinuityStartConvergence(
  client: PrismaLike | null | undefined,
  input: ResolveContinuityStartConvergenceInput
): Promise<ConvergenceResult | null> {
  const tx = (client ?? defaultPrisma) as PrismaClient

  const eb = await resolveContinuityStartPrecedence(tx, {
    enrollmentId: input.enrollmentId,
    diagnosticType: input.diagnosticType,
  })
  if (eb === null) return null

  const rule = CONVERGENCE_RULE[eb.reconciliation.status]

  const convergence: ConvergenceSummary = {
    posture: rule.posture,
    kind: rule.kind,
    reason: rule.reason,
    riskTier: rule.riskTier,
    materializerOfRecord: EC_MATERIALIZER_OF_RECORD,
    shadowSide: EC_SHADOW_SIDE,
    isSourceOfTruthDecision: EC_IS_SOURCE_OF_TRUTH_DECISION,
    isWriteAuthorization: EC_IS_WRITE_AUTHORIZATION,
    isConvergenceExecution: EC_IS_CONVERGENCE_EXECUTION,
    isMergeDecision: EC_IS_MERGE_DECISION,
  }

  return {
    enrollmentId: eb.enrollmentId,
    diagnosticType: eb.diagnosticType,
    referenceCycleId: eb.referenceCycleId,
    referenceCycleNumber: eb.referenceCycleNumber,
    convergence,
    reconciliation: {
      status: eb.reconciliation.status,
      reason: eb.reconciliation.reason,
    },
    precedence: {
      preferred: eb.precedence.preferred,
      reason: eb.precedence.reason,
      riskTier: eb.precedence.riskTier,
    },
    source: { eb },
    evaluatedAt: new Date().toISOString(),
  }
}
