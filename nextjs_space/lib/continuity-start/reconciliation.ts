/**
 * Phase EA — Minimal Read-Only Reconciliation Layer between the
 *            structural start block (DN/DU) and the shadow start
 *            block (DZ).
 *
 * CRITICAL SEMANTIC CONSTRAINTS (do not widen):
 *
 *   (EA-1) EA is a **witness**, not an arbiter.
 *          It reads both sides and classifies their relationship under
 *          a single, minimal, 1:1 total rule. It does NOT:
 *            - write any row (no StudyLoad / CycleSnapshot /
 *              ContinuitySignal / LearningCycle mutations),
 *            - mutate StudentProgramInstance pointers,
 *            - decide precedence between DN/DU and DZ,
 *            - declare a source of truth,
 *            - trigger transitions,
 *            - emit signals,
 *            - re-evaluate DU's exclusion rule (it only reads DU's
 *              echo from the cycle_open payload).
 *          Any such behavior belongs to a later, separately scoped
 *          phase.
 *
 *   (EA-2) `aligned_skillstate` has a **narrow, strictly structural**
 *          meaning:
 *          - shadow.blockShape ∈ {standard, standard_with_omission_guard},
 *          - every shadow item has source = 'skillstate_heuristic',
 *          - the set of non-null shadow skillIds is a **subset** of the
 *            structural cycle_open `selectedSkillIds` for the chosen
 *            reference cycle.
 *          It does NOT mean:
 *            - pedagogical equivalence,
 *            - full block equivalence,
 *            - operational equivalence,
 *            - precedence resolution,
 *            - source-of-truth resolution.
 *          It is a local structural reconciliation status, not a claim
 *          that both sides are "the same" in any broader sense. Subset
 *          inclusion is used (not strict equality) to honor DZ's
 *          honest-downgrade contract (itemsResolvedCount MAY be less
 *          than itemCountHint on a short SkillState pool).
 *
 *   (EA-3) The **reference cycle** is resolved deterministically and
 *          echoed in every response. The rule is:
 *            the enrollment's LearningCycle with the lowest
 *            `cycleNumber` that has a CycleSnapshot with
 *            snapshotType = 'cycle_open'.
 *          This anchors EA to the first structurally-opened cycle,
 *          matching DZ's `initial` diagnostic anchoring. If no such
 *          cycle exists, EA returns `no_structural_block` as a
 *          first-class classification; it never invents a reference.
 *
 *   (EA-4) The reconciliation rule is 1:1 TOTAL over the six statuses
 *          listed below. Adding a new status requires its own explicit
 *          phase. The ordering of the checks below is the binding
 *          classifier; do not reorder without a phase.
 *
 *   (EA-5) Full DV+DW+DX+DY+DZ audit passthrough is preserved under
 *          `shadow.source` (and DZ's own semantic contract is carried
 *          through verbatim). EA adds no new audit channel.
 *
 *   (EA-6) EA performs NO schema change. All inputs are already
 *          queryable: CycleSnapshot.payload (Json) carries
 *          selectedSkillIds / excludedSkillIds / exclusionRelaxed,
 *          StudyLoad is countable via learningCycleId, and the DZ
 *          resolver already exists and is reused (no duplicated logic).
 *
 * Scope: pure read. GET-only consumption surface at
 * /api/continuity-start/reconciliation.
 */

import type { PrismaClient } from '@prisma/client'
import { prisma as defaultPrisma } from '@/lib/prisma'
import {
  resolveShadowContinuityStartBlock,
  type ShadowStartBlockResult,
} from '@/lib/continuity-start/shadow-materializer'
import { DEFAULT_DIAGNOSTIC_TYPE } from '@/lib/diagnostics/authoritative'

type PrismaLike =
  | PrismaClient
  | Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]

/**
 * Reconciliation statuses — 1:1 TOTAL. See (EA-4).
 */
export type ReconciliationStatus =
  | 'aligned_skillstate'
  | 'shape_divergent_safe'
  | 'shape_divergent_refusal'
  | 'shadow_empty_vs_materialized'
  | 'set_divergent_skillstate'
  | 'no_structural_block'

export type ReconciliationReason =
  | 'aligned_subset_skillstate'
  | 'shadow_provisional_safe_vs_structural_nonempty'
  | 'shadow_escalate_refuse_vs_structural_nonempty'
  | 'shadow_heuristic_empty_vs_structural_nonempty'
  | 'shadow_heuristic_skillid_not_in_structural_selection'
  | 'no_cycle_open_snapshot_for_enrollment'

export type ReconciliationDivergenceKind =
  | 'shape_mismatch'
  | 'refusal_vs_materialized'
  | 'empty_shadow_vs_materialized_structural'
  | 'shadow_skillid_outside_structural_selection'

export interface ReconciliationDivergence {
  kind: ReconciliationDivergenceKind
  detail: string
  /**
   * Optional structured evidence. Always a defensive copy — callers
   * MUST NOT mutate it.
   */
  evidence?: Record<string, unknown>
}

export interface StructuralSide {
  /** CycleSnapshot.id of the cycle_open snapshot used as reference. */
  snapshotId: string
  /** Skill IDs DN selected for the first load of the reference cycle. */
  selectedSkillIds: string[]
  /** DU's auditable exclusion trace, echoed verbatim. */
  excludedSkillIds: string[]
  /** DU flag, echoed verbatim. */
  exclusionRelaxed: boolean
  /**
   * Informational only. EA does NOT assert semantic equality between
   * studyLoadCount and selectedSkillIds.length; DN's fallback path can
   * legitimately create 1 generic load even when selected is empty.
   */
  studyLoadCount: number
}

export interface ShadowSide {
  blockShape: ShadowStartBlockResult['blockShape']
  itemCountHint: ShadowStartBlockResult['itemCountHint']
  itemsResolvedCount: number
  refusal: boolean
  /** Minimal per-item projection; full DZ payload is not re-emitted. */
  items: Array<{
    index: number
    source: ShadowStartBlockResult['items'][number]['source']
    skillId: string | null
  }>
  /** Full DV+DW+DX+DY+DZ audit passthrough. */
  source: ShadowStartBlockResult['source']
}

export interface ReconciliationResult {
  enrollmentId: string
  diagnosticType: string
  referenceCycleId: string | null
  referenceCycleNumber: number | null
  structural: StructuralSide | null
  shadow: ShadowSide
  reconciliation: {
    status: ReconciliationStatus
    reason: ReconciliationReason
    divergences: ReconciliationDivergence[]
  }
  evaluatedAt: string
}

export interface ReconcileContinuityStartInput {
  enrollmentId: string
  diagnosticType?: string
}

/**
 * Read the reference cycle_open snapshot for an enrollment, per (EA-3).
 * Returns null if no such snapshot exists.
 */
async function readStructuralReference(
  tx: PrismaLike,
  enrollmentId: string
): Promise<{
  cycleId: string
  cycleNumber: number
  structural: StructuralSide
} | null> {
  const client = tx as PrismaClient

  // Lowest cycleNumber with a cycle_open snapshot. Deterministic tiebreak
  // by cycleNumber alone is sufficient since (enrollmentId, cycleNumber)
  // is unique in the schema.
  const cycle = await client.learningCycle.findFirst({
    where: {
      enrollmentId,
      cycleSnapshots: { some: { snapshotType: 'cycle_open' } },
    },
    orderBy: { cycleNumber: 'asc' },
    select: { id: true, cycleNumber: true },
  })
  if (!cycle) return null

  const snapshot = await client.cycleSnapshot.findFirst({
    where: { learningCycleId: cycle.id, snapshotType: 'cycle_open' },
    orderBy: { takenAt: 'asc' },
    select: { id: true, payload: true },
  })
  if (!snapshot) return null

  const payload = (snapshot.payload ?? {}) as Record<string, unknown>
  const selectedSkillIds = Array.isArray(payload.selectedSkillIds)
    ? (payload.selectedSkillIds as unknown[]).filter(
        (x): x is string => typeof x === 'string'
      )
    : []
  const excludedSkillIds = Array.isArray(payload.excludedSkillIds)
    ? (payload.excludedSkillIds as unknown[]).filter(
        (x): x is string => typeof x === 'string'
      )
    : []
  const exclusionRelaxed = payload.exclusionRelaxed === true

  const studyLoadCount = await client.studyLoad.count({
    where: { learningCycleId: cycle.id },
  })

  return {
    cycleId: cycle.id,
    cycleNumber: cycle.cycleNumber,
    structural: {
      snapshotId: snapshot.id,
      selectedSkillIds,
      excludedSkillIds,
      exclusionRelaxed,
      studyLoadCount,
    },
  }
}

/**
 * Minimal 1:1 TOTAL classifier. See (EA-4).
 *
 * The check order is binding:
 *   1. no_structural_block         (structural is absent)
 *   2. shape_divergent_refusal     (shadow = escalate_refuse, structural non-empty)
 *   3. shape_divergent_safe        (shadow = provisional_safe, structural non-empty)
 *   4. shadow_empty_vs_materialized (shadow heuristic with 0 items, structural non-empty)
 *   5. set_divergent_skillstate    (shadow skillIds escape structural.selectedSkillIds)
 *   6. aligned_skillstate          (subset inclusion — the narrow structural status)
 */
function classify(
  structural: StructuralSide | null,
  shadow: ShadowSide
): { status: ReconciliationStatus; reason: ReconciliationReason; divergences: ReconciliationDivergence[] } {
  if (structural === null) {
    return {
      status: 'no_structural_block',
      reason: 'no_cycle_open_snapshot_for_enrollment',
      divergences: [],
    }
  }

  const structuralNonEmpty = structural.selectedSkillIds.length > 0

  if (shadow.blockShape === 'escalate_refuse' && structuralNonEmpty) {
    return {
      status: 'shape_divergent_refusal',
      reason: 'shadow_escalate_refuse_vs_structural_nonempty',
      divergences: [
        {
          kind: 'refusal_vs_materialized',
          detail:
            'DZ emitted a first-class refusal (escalate_refuse) while the structural cycle_open snapshot selected skills for the first load.',
          evidence: {
            structuralSelectedCount: structural.selectedSkillIds.length,
          },
        },
      ],
    }
  }

  if (shadow.blockShape === 'provisional_safe' && structuralNonEmpty) {
    return {
      status: 'shape_divergent_safe',
      reason: 'shadow_provisional_safe_vs_structural_nonempty',
      divergences: [
        {
          kind: 'shape_mismatch',
          detail:
            'DZ emitted safe-generic items (provisional_safe) while the structural cycle_open snapshot selected skills for the first load. This is an evidence-quality divergence, NOT a student-ability verdict.',
          evidence: {
            structuralSelectedCount: structural.selectedSkillIds.length,
            shadowItemCount: shadow.itemsResolvedCount,
          },
        },
      ],
    }
  }

  // At this point the shadow is heuristic-backed
  // (standard or standard_with_omission_guard) OR structural is empty.
  const isHeuristicShape =
    shadow.blockShape === 'standard' ||
    shadow.blockShape === 'standard_with_omission_guard'

  if (isHeuristicShape && shadow.itemsResolvedCount === 0 && structuralNonEmpty) {
    return {
      status: 'shadow_empty_vs_materialized',
      reason: 'shadow_heuristic_empty_vs_structural_nonempty',
      divergences: [
        {
          kind: 'empty_shadow_vs_materialized_structural',
          detail:
            'DZ resolved 0 items from the enrollment SkillState pool (honest downgrade) while the structural cycle_open snapshot carries non-empty selectedSkillIds.',
          evidence: {
            structuralSelectedCount: structural.selectedSkillIds.length,
            shadowItemCountHint: shadow.itemCountHint,
          },
        },
      ],
    }
  }

  if (isHeuristicShape) {
    const structuralSet = new Set(structural.selectedSkillIds)
    const shadowSkillIds = shadow.items
      .map((it) => it.skillId)
      .filter((x): x is string => typeof x === 'string')
    const outside = shadowSkillIds.filter((id) => !structuralSet.has(id))
    if (outside.length > 0) {
      return {
        status: 'set_divergent_skillstate',
        reason: 'shadow_heuristic_skillid_not_in_structural_selection',
        divergences: [
          {
            kind: 'shadow_skillid_outside_structural_selection',
            detail:
              'One or more DZ shadow items reference a skillId that is not in the structural cycle_open selectedSkillIds. This is a structural set divergence, not a precedence judgement.',
            evidence: {
              shadowSkillIds,
              structuralSelectedSkillIds: [...structural.selectedSkillIds],
              outsideSkillIds: outside,
            },
          },
        ],
      }
    }

    // (EA-2) Narrow structural subset alignment. NOT pedagogical,
    // operational, or precedence alignment.
    return {
      status: 'aligned_skillstate',
      reason: 'aligned_subset_skillstate',
      divergences: [],
    }
  }

  // Structural is empty and shadow shape is heuristic/provisional/refuse.
  // Under the current rule set, "structural empty" collapses to
  // aligned_skillstate only when the shadow also presents no set divergence.
  // With an empty structuralSet and isHeuristicShape, the subset check
  // above already degrades to (shadowSkillIds.length === 0 ? aligned
  // : set_divergent). We handled both cases above. If we are here, the
  // shape is provisional_safe or escalate_refuse with an empty structural
  // side — by (EA-4) both are treated as aligned_skillstate only when
  // structural is empty, because there is nothing materialized to
  // diverge from. We still report them honestly.
  if (shadow.blockShape === 'escalate_refuse') {
    return {
      status: 'aligned_skillstate',
      reason: 'aligned_subset_skillstate',
      divergences: [],
    }
  }
  // shadow.blockShape === 'provisional_safe' with empty structural
  return {
    status: 'aligned_skillstate',
    reason: 'aligned_subset_skillstate',
    divergences: [],
  }
}

/**
 * Resolves the minimal EA reconciliation artifact for the given
 * enrollment and diagnosticType.
 *
 * Pure read. See file header (EA-1..EA-6) for binding semantic
 * constraints; in particular, `aligned_skillstate` is a narrow local
 * structural status (subset inclusion of non-null shadow skillIds
 * within the structural selectedSkillIds for the chosen reference
 * cycle) and NOT a claim of pedagogical, operational, or
 * source-of-truth equivalence.
 */
export async function reconcileContinuityStart(
  client: PrismaLike | null | undefined,
  input: ReconcileContinuityStartInput
): Promise<ReconciliationResult | null> {
  const tx = (client ?? defaultPrisma) as PrismaClient
  const enrollmentId = input.enrollmentId
  const diagnosticType = input.diagnosticType ?? DEFAULT_DIAGNOSTIC_TYPE

  const enrollment = await tx.studentProgramInstance.findUnique({
    where: { id: enrollmentId },
    select: { id: true },
  })
  if (!enrollment) return null

  // Shadow side — reuse the exact DZ resolver. No duplicated logic.
  const shadowFull = await resolveShadowContinuityStartBlock(tx, {
    enrollmentId,
    diagnosticType,
  })
  if (shadowFull === null) {
    // Defensive: enrollment was deleted between the two reads. Treat as
    // "enrollment not found" at the route layer.
    return null
  }

  const shadow: ShadowSide = {
    blockShape: shadowFull.blockShape,
    itemCountHint: shadowFull.itemCountHint,
    itemsResolvedCount: shadowFull.itemsResolvedCount,
    refusal: shadowFull.refusal,
    items: shadowFull.items.map((it) => ({
      index: it.index,
      source: it.source,
      skillId: it.skillId,
    })),
    source: shadowFull.source,
  }

  // Structural side — independent read of cycle_open snapshot.
  const ref = await readStructuralReference(tx, enrollmentId)

  const { status, reason, divergences } = classify(
    ref?.structural ?? null,
    shadow
  )

  return {
    enrollmentId,
    diagnosticType,
    referenceCycleId: ref?.cycleId ?? null,
    referenceCycleNumber: ref?.cycleNumber ?? null,
    structural: ref?.structural ?? null,
    shadow,
    reconciliation: {
      status,
      reason,
      divergences,
    },
    evaluatedAt: new Date().toISOString(),
  }
}
