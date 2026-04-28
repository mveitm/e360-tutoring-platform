/**
 * Phase DY — Minimal declarative start-block plan from DX.
 *
 * CRITICAL SEMANTIC CONSTRAINTS (do not widen):
 *
 *   1. DY is a **minimal operational generator of a declarative plan**.
 *      It is NOT a content-generation phase, NOT a pedagogical planner,
 *      NOT a materializer, NOT an agent. It describes the *shape* of the
 *      start block; it does NOT produce the *items* of the start block.
 *
 *   2. DY answers:
 *          "Given the operational mode, what is the minimal declarative
 *           shape of the initial continuity-start block?"
 *      DY does NOT yet answer:
 *          "Which specific items/skills/activities make up the start block?"
 *      ← that is the responsibility of a later, separately scoped
 *         materialization phase.
 *
 *   3. The emitted plan is a **canonical operational-read output only**.
 *      It does NOT, by itself:
 *        - authorize workflow transitions
 *        - mutate continuity state
 *        - create StudyLoad / CycleSnapshot / ContinuitySignal rows
 *        - modify StudentProgramInstance.currentContinuityState or currentCycleId
 *        - modify any cycle row or Diagnostic row
 *        - auto-enable or auto-block later structural actions (including
 *          cycle-opening preconditions P1–P4b, which stay frozen)
 *      Any such behavior is the explicit responsibility of later,
 *      separately scoped phases.
 *
 *   4. `itemCount` in DY is a **declarative operational capacity HINT**,
 *      NOT a guaranteed future materialization cardinality.
 *        - DY describes the intended minimal shape/capacity of the start
 *          block.
 *        - DY does NOT guarantee that a later materializer will always
 *          instantiate exactly that many items.
 *        - Later materialization phases may still need to respect real
 *          constraints (e.g. insufficient active skills, program scope,
 *          content availability), as long as they do NOT violate the
 *          declared block shape semantics (in particular: an
 *          `escalate_refuse` plan MUST NOT be materialized as a
 *          personalized block, and a `provisional_safe` plan MUST NOT be
 *          materialized with high-confidence personalization).
 *
 *   5. Mapping from DX mode to DY blockShape is 1:1 and TOTAL. DY does
 *      NOT reinterpret, override, or second-guess DX. Adding a new
 *      blockShape, a new itemCount, or a new constraint tag requires
 *      its own explicit phase.
 *
 *   6. Inherited from DW/DX (binding):
 *        `provisional_safe` is a statement about **evidence quality and
 *        continuity-readiness**, NOT about the student's academic ability.
 *        Downstream materializers MUST NOT collapse `provisional_safe`
 *        into "weak student" or equivalent semantics.
 *
 *   7. `escalate_refuse` with `itemCount: 0` is the operational form of
 *      the Mauricio/Flavia fake-personalization refusal. It is a
 *      first-class structural output, not an error and not a degenerate
 *      empty-list.
 *
 * Scope: pure read. No side effects. No StudyLoad creation. No persistence.
 */

import type { PrismaClient } from '@prisma/client'
import { prisma as defaultPrisma } from '@/lib/prisma'
import {
  DEFAULT_DIAGNOSTIC_TYPE,
  type AuthoritativeDiagnosticReason,
} from '@/lib/diagnostics/authoritative'
import type {
  TacticalVerdict,
  TacticalReason,
  TacticalReadingSignals,
} from '@/lib/diagnostics/tactical-reading'
import {
  resolveContinuityStartMode,
  type OperationalMode,
  type OperationalReason,
} from '@/lib/continuity-start/operational-output'

type PrismaLike = PrismaClient | any

export type StartBlockShape =
  | 'standard'
  | 'standard_with_omission_guard'
  | 'provisional_safe'
  | 'escalate_refuse'

export type StartBlockReason =
  | 'plan_standard'
  | 'plan_standard_with_omission_guard'
  | 'plan_provisional_safe'
  | 'plan_escalate_refuse'

export type StartBlockConstraint =
  | 'treat_omission_as_first_class'
  | 'refuse_high_confidence_personalization'
  | 'prefer_safe_generic_start'
  | 'escalate_to_manual_review'

export type StartBlockRefusalReason =
  | 'insufficient_evidence_escalate'
  | null

export interface StartBlockPlan {
  blockShape: StartBlockShape
  /**
   * Declarative operational capacity HINT. Not a guaranteed materialization
   * cardinality. See file header (constraint #4).
   */
  itemCount: 0 | 2 | 3
  personalizationAllowed: boolean
  constraints: StartBlockConstraint[]
  refusal: boolean
  refusalReason: StartBlockRefusalReason
}

/**
 * 1:1 total mapping from DX operational mode to DY start-block plan shape.
 * Type-enforced via Record<OperationalMode, ...>: any new DX mode becomes
 * a TypeScript compile error here, forcing an explicit phase.
 *
 * Readonly shapes: the constraint arrays are frozen at module load so no
 * caller can mutate the canonical table.
 */
const MODE_TO_PLAN: Record<OperationalMode, StartBlockPlan> = {
  normal: Object.freeze({
    blockShape: 'standard',
    itemCount: 3,
    personalizationAllowed: true,
    constraints: Object.freeze([] as StartBlockConstraint[]) as StartBlockConstraint[],
    refusal: false,
    refusalReason: null,
  }) as StartBlockPlan,
  cautious: Object.freeze({
    blockShape: 'standard_with_omission_guard',
    itemCount: 3,
    personalizationAllowed: true,
    constraints: Object.freeze(['treat_omission_as_first_class'] as StartBlockConstraint[]) as StartBlockConstraint[],
    refusal: false,
    refusalReason: null,
  }) as StartBlockPlan,
  provisional: Object.freeze({
    blockShape: 'provisional_safe',
    itemCount: 2,
    personalizationAllowed: false,
    constraints: Object.freeze([
      'refuse_high_confidence_personalization',
      'prefer_safe_generic_start',
    ] as StartBlockConstraint[]) as StartBlockConstraint[],
    refusal: false,
    refusalReason: null,
  }) as StartBlockPlan,
  manual_review_needed: Object.freeze({
    blockShape: 'escalate_refuse',
    itemCount: 0,
    personalizationAllowed: false,
    constraints: Object.freeze(['escalate_to_manual_review'] as StartBlockConstraint[]) as StartBlockConstraint[],
    refusal: true,
    refusalReason: 'insufficient_evidence_escalate',
  }) as StartBlockPlan,
}

const MODE_TO_REASON: Record<OperationalMode, StartBlockReason> = {
  normal: 'plan_standard',
  cautious: 'plan_standard_with_omission_guard',
  provisional: 'plan_provisional_safe',
  manual_review_needed: 'plan_escalate_refuse',
}

export interface StartBlockPlanSource {
  mode: OperationalMode           // DX
  dxReason: OperationalReason     // DX
  dwVerdict: TacticalVerdict      // DW
  dwReason: TacticalReason        // DW
  authoritativeAttemptId: string | null  // DV
  dvReason: AuthoritativeDiagnosticReason // DV
  signals: TacticalReadingSignals // DW passthrough
}

export interface StartBlockPlanResult {
  enrollmentId: string
  diagnosticType: string
  plan: StartBlockPlan
  source: StartBlockPlanSource
  reason: StartBlockReason
  evaluatedAt: string
}

export interface ResolveStartBlockPlanInput {
  enrollmentId: string
  diagnosticType?: string
}

/**
 * Resolves the minimal declarative start-block plan for continuity-start.
 *
 * See file header for the full semantic constraints. In particular, the
 * returned `plan.itemCount` is a declarative operational capacity HINT,
 * NOT a guaranteed future materialization cardinality; downstream
 * materialization phases may still need to respect real constraints as
 * long as they do not violate the declared block shape semantics.
 */
export async function resolveStartBlockPlan(
  client: PrismaLike | null | undefined,
  input: ResolveStartBlockPlanInput
): Promise<StartBlockPlanResult> {
  const tx = (client ?? defaultPrisma) as PrismaClient
  const enrollmentId = input.enrollmentId
  const diagnosticType = input.diagnosticType ?? DEFAULT_DIAGNOSTIC_TYPE

  const dx = await resolveContinuityStartMode(tx, { enrollmentId, diagnosticType })

  const canonical = MODE_TO_PLAN[dx.mode]
  // Return fresh plain objects / arrays to protect the frozen canonical table
  // from any accidental caller-side mutation via JSON round-trip or otherwise.
  const plan: StartBlockPlan = {
    blockShape: canonical.blockShape,
    itemCount: canonical.itemCount,
    personalizationAllowed: canonical.personalizationAllowed,
    constraints: [...canonical.constraints],
    refusal: canonical.refusal,
    refusalReason: canonical.refusalReason,
  }
  const reason = MODE_TO_REASON[dx.mode]

  return {
    enrollmentId,
    diagnosticType,
    plan,
    source: {
      mode: dx.mode,
      dxReason: dx.reason,
      dwVerdict: dx.source.dwVerdict,
      dwReason: dx.source.dwReason,
      authoritativeAttemptId: dx.source.authoritativeAttemptId,
      dvReason: dx.source.dvReason,
      signals: dx.source.signals,
    },
    reason,
    evaluatedAt: new Date().toISOString(),
  }
}
