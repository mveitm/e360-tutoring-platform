/**
 * Phase DZ — Minimal shadow-materialized continuity-start block from DY.
 *
 * CRITICAL SEMANTIC CONSTRAINTS (do not widen):
 *
 *   (a) DZ is a **shadow materializer**, not a materializer of record.
 *       It does NOT create, modify, or delete StudyLoad, CycleSnapshot,
 *       ContinuitySignal, LearningCycle, StudentProgramInstance,
 *       Diagnostic, SkillState, or any other row. DN/DU remain the
 *       authoritative structural materializer for the first load of
 *       cycle N+1 until a later, separately scoped reconciliation phase.
 *
 *   (b) The emitted `items` array is a **canonical operational-read
 *       output only**. It does NOT, by itself:
 *         - authorize workflow transitions
 *         - mutate continuity state
 *         - create StudyLoad / CycleSnapshot / ContinuitySignal rows
 *         - modify StudentProgramInstance.currentContinuityState or
 *           currentCycleId
 *         - auto-enable or auto-block cycle-opening preconditions
 *           P1–P4b (which stay frozen)
 *         - emit any signal or audit row
 *       Any such behavior is the explicit responsibility of later,
 *       separately scoped phases.
 *
 *   (c) `itemCountHint` is inherited verbatim from DY and remains a
 *       **declarative operational capacity hint**, NOT a guaranteed
 *       materialization cardinality. `itemsResolvedCount` MAY be less
 *       than `itemCountHint` when the upstream pool is insufficient;
 *       that is an **honest downgrade**, not a bug, and MUST NOT be
 *       padded with fake items.
 *
 *   (d) `provisional_safe` items remain a statement about **evidence
 *       quality and continuity-readiness**, NOT about the student's
 *       academic ability. Their `title` is unmistakably generic and
 *       their `source` is `'safe_generic'`. Downstream consumers MUST
 *       NOT collapse `provisional_safe` into "weak student" semantics.
 *
 *   (e) `escalate_refuse` with `items: []` remains a **first-class
 *       refusal** (the Mauricio/Flavia fake-personalization refusal,
 *       operationalized at the item level), not an error and not a
 *       degenerate empty list.
 *
 *   (f) `personalized: true` on `standard` / `standard_with_omission_guard`
 *       items is a declarative flag indicating "this item was resolved
 *       from the enrollment's structural SkillState pool, not from a
 *       pure generic placeholder". It is NOT a claim of pedagogical
 *       optimality.
 *
 *   (g) `source: 'skillstate_heuristic'` means the item was resolved
 *       from the currently available structural heuristic inputs only
 *       (the enrollment's program-scoped SkillState pool, sorted with
 *       the same deterministic key used by DN:
 *         needsReinforcement DESC, masteryLevel ASC, skillId ASC).
 *       It does NOT mean:
 *         - a pedagogically optimal item,
 *         - a fully personalized recommendation,
 *         - an instructionally validated recommendation.
 *       `skillstate_heuristic` is a **structural resolution source**,
 *       not a pedagogical quality claim.
 *
 *   (h) Mapping from DY `blockShape` to DZ item-resolution strategy is
 *       1:1 and TOTAL. DZ does NOT reinterpret, override, or
 *       second-guess DY. Adding a new `blockShape`, a new `source`
 *       value, or a new constraint tag requires its own explicit phase.
 *
 *   (i) DZ does NOT inherit DU's `selectedSkillIds` exclusion rule.
 *       DU's exclusion is scoped to the first load of an actually-opened
 *       cycle N+1 inside a write transaction; DZ is a pure-read shadow.
 *       Reconciliation with DN/DU is an explicit, separately scoped
 *       future phase.
 *
 * Scope: pure read. No side effects. No StudyLoad creation. No persistence.
 * No LLM / agent / external API call. GET-only consumption surface.
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
import type {
  OperationalMode,
  OperationalReason,
} from '@/lib/continuity-start/operational-output'
import {
  resolveStartBlockPlan,
  type StartBlockShape,
  type StartBlockPlan,
  type StartBlockReason,
  type StartBlockConstraint,
  type StartBlockRefusalReason,
} from '@/lib/continuity-start/start-block-plan'

type PrismaLike = PrismaClient | any

export type ShadowItemSource = 'safe_generic' | 'skillstate_heuristic'

export type ShadowBlockReason =
  | 'shadow_resolved_standard'
  | 'shadow_resolved_standard_with_omission_guard'
  | 'shadow_resolved_provisional_safe'
  | 'shadow_resolved_escalate_refuse'

export interface ShadowStartBlockItem {
  index: number
  source: ShadowItemSource
  /**
   * Declarative flag: `true` when the item was resolved from the
   * enrollment's structural SkillState pool; `false` when the item is a
   * safe-generic placeholder. NOT a claim of pedagogical optimality.
   * See file header constraint (f).
   */
  personalized: boolean
  skillId: string | null
  title: string
  /**
   * Subset of DY plan.constraints this item honors. Declarative
   * passthrough only; DZ does not add new constraint tags.
   */
  constraintsEchoed: StartBlockConstraint[]
}

export interface ShadowStartBlockSource {
  plan: StartBlockPlan                     // DY plan (frozen-shape passthrough)
  mode: OperationalMode                    // DX
  dxReason: OperationalReason              // DX
  dwVerdict: TacticalVerdict               // DW
  dwReason: TacticalReason                 // DW
  authoritativeAttemptId: string | null    // DV
  dvReason: AuthoritativeDiagnosticReason  // DV
  signals: TacticalReadingSignals          // DW passthrough
}

export interface ShadowStartBlockResult {
  enrollmentId: string
  diagnosticType: string
  blockShape: StartBlockShape
  refusal: boolean
  refusalReason: StartBlockRefusalReason
  personalizationAllowed: boolean
  /**
   * Declarative operational capacity HINT inherited from DY. NOT a
   * guaranteed materialization cardinality. See file header (c).
   */
  itemCountHint: 0 | 2 | 3
  itemsResolvedCount: number
  omissionGuard: boolean
  items: ShadowStartBlockItem[]
  source: ShadowStartBlockSource
  reason: ShadowBlockReason
  planReason: StartBlockReason
  evaluatedAt: string
}

export interface ResolveShadowContinuityStartBlockInput {
  enrollmentId: string
  diagnosticType?: string
}

const SHAPE_TO_REASON: Record<StartBlockShape, ShadowBlockReason> = {
  standard: 'shadow_resolved_standard',
  standard_with_omission_guard: 'shadow_resolved_standard_with_omission_guard',
  provisional_safe: 'shadow_resolved_provisional_safe',
  escalate_refuse: 'shadow_resolved_escalate_refuse',
}

// Canonical safe-generic titles for `provisional_safe`. Deterministic,
// unmistakably generic, and independent of any SkillState data. See
// file header constraint (d).
const SAFE_GENERIC_TITLES: readonly string[] = Object.freeze([
  'Práctica segura genérica 1',
  'Práctica segura genérica 2',
  'Práctica segura genérica 3',
])

interface SkillStateRow {
  skillId: string
  // Prisma stores masteryLevel as String on this schema; DN sorts it
  // lexicographically, and DZ mirrors that exact behavior so the
  // structural ordering stays consistent.
  masteryLevel: string
  needsReinforcement: boolean
  skill: { id: string; name: string; code: string }
}

/**
 * Deterministic sort mirroring DN's first-load selection heuristic:
 *   needsReinforcement DESC, masteryLevel ASC, skillId ASC.
 *
 * This is a **structural resolution order**, not a pedagogical ranking.
 * See file header constraint (g).
 */
function sortSkillStatesStructurally(rows: SkillStateRow[]): SkillStateRow[] {
  return [...rows].sort((a, b) => {
    if (a.needsReinforcement !== b.needsReinforcement) {
      return a.needsReinforcement ? -1 : 1
    }
    if (a.masteryLevel !== b.masteryLevel) {
      return a.masteryLevel < b.masteryLevel ? -1 : 1
    }
    return a.skillId < b.skillId ? -1 : 1
  })
}

/**
 * Item-resolution strategies, keyed 1:1 on DY's `blockShape`. The
 * `Record<StartBlockShape, ...>` typing ensures that any new blockShape
 * added to DY becomes a TypeScript compile error here, forcing an
 * explicit phase. See file header constraint (h).
 */
type ItemResolver = (
  tx: PrismaClient,
  ctx: { enrollmentId: string; programId: string; plan: StartBlockPlan }
) => Promise<ShadowStartBlockItem[]>

const SHAPE_TO_RESOLVER: Record<StartBlockShape, ItemResolver> = {
  // (e) first-class refusal — no lookup at all.
  escalate_refuse: async () => [],

  // (d) safe-generic, deterministic, no SkillState read.
  provisional_safe: async (_tx, { plan }) => {
    const n = plan.itemCount
    const items: ShadowStartBlockItem[] = []
    for (let i = 0; i < n; i++) {
      items.push({
        index: i,
        source: 'safe_generic',
        personalized: false,
        skillId: null,
        title: SAFE_GENERIC_TITLES[i] ?? `Práctica segura genérica ${i + 1}`,
        constraintsEchoed: [...plan.constraints],
      })
    }
    return items
  },

  // (g) structural resolution via DN's deterministic SkillState sort.
  standard_with_omission_guard: async (tx, { enrollmentId, programId, plan }) => {
    return resolveFromSkillStatePool(tx, { enrollmentId, programId, plan })
  },

  // (g) structural resolution via DN's deterministic SkillState sort.
  standard: async (tx, { enrollmentId, programId, plan }) => {
    return resolveFromSkillStatePool(tx, { enrollmentId, programId, plan })
  },
}

async function resolveFromSkillStatePool(
  tx: PrismaLike,
  ctx: { enrollmentId: string; programId: string; plan: StartBlockPlan }
): Promise<ShadowStartBlockItem[]> {
  const client = tx as PrismaClient
  const rows = (await client.skillState.findMany({
    where: {
      enrollmentId: ctx.enrollmentId,
      skill: { programId: ctx.programId },
    },
    select: {
      skillId: true,
      masteryLevel: true,
      needsReinforcement: true,
      skill: { select: { id: true, name: true, code: true } },
    },
  })) as SkillStateRow[]

  const sorted = sortSkillStatesStructurally(rows)
  // (c) honest downgrade: take up to `itemCount`, do NOT pad.
  const take = Math.min(sorted.length, ctx.plan.itemCount)
  const items: ShadowStartBlockItem[] = []
  for (let i = 0; i < take; i++) {
    const s = sorted[i]
    items.push({
      index: i,
      source: 'skillstate_heuristic',
      personalized: true,
      skillId: s.skillId,
      title: s.skill.name,
      constraintsEchoed: [...ctx.plan.constraints],
    })
  }
  return items
}

/**
 * Resolves the minimal shadow-materialized continuity-start block for
 * the given enrollment and diagnosticType.
 *
 * Pure read. See file header for binding semantic constraints; in
 * particular, `itemCountHint` is a declarative capacity hint (not a
 * materialization guarantee), `provisional_safe` is an evidence-quality
 * statement (not a student-ability verdict), `escalate_refuse` is a
 * first-class refusal, and `source: 'skillstate_heuristic'` is a
 * structural resolution source (not a pedagogical quality claim).
 */
export async function resolveShadowContinuityStartBlock(
  client: PrismaLike | null | undefined,
  input: ResolveShadowContinuityStartBlockInput
): Promise<ShadowStartBlockResult | null> {
  const tx = (client ?? defaultPrisma) as PrismaClient
  const enrollmentId = input.enrollmentId
  const diagnosticType = input.diagnosticType ?? DEFAULT_DIAGNOSTIC_TYPE

  // Enrollment lookup is needed for the two SkillState-backed branches.
  // Returning null here lets the endpoint emit a clean 404 envelope
  // without leaking an internal error.
  const enrollment = await tx.studentProgramInstance.findUnique({
    where: { id: enrollmentId },
    select: { id: true, programId: true },
  })
  if (!enrollment) return null

  const dy = await resolveStartBlockPlan(tx, { enrollmentId, diagnosticType })
  const { plan } = dy

  const resolver = SHAPE_TO_RESOLVER[plan.blockShape]
  const items = await resolver(tx, {
    enrollmentId,
    programId: enrollment.programId,
    plan,
  })

  const omissionGuard = plan.blockShape === 'standard_with_omission_guard'

  return {
    enrollmentId,
    diagnosticType,
    blockShape: plan.blockShape,
    refusal: plan.refusal,
    refusalReason: plan.refusalReason,
    personalizationAllowed: plan.personalizationAllowed,
    itemCountHint: plan.itemCount,
    itemsResolvedCount: items.length,
    omissionGuard,
    items,
    source: {
      // DY plan passthrough (fresh copy — the returned `plan` from DY is
      // already a fresh object, but we snapshot constraints defensively).
      plan: {
        blockShape: plan.blockShape,
        itemCount: plan.itemCount,
        personalizationAllowed: plan.personalizationAllowed,
        constraints: [...plan.constraints],
        refusal: plan.refusal,
        refusalReason: plan.refusalReason,
      },
      mode: dy.source.mode,
      dxReason: dy.source.dxReason,
      dwVerdict: dy.source.dwVerdict,
      dwReason: dy.source.dwReason,
      authoritativeAttemptId: dy.source.authoritativeAttemptId,
      dvReason: dy.source.dvReason,
      signals: dy.source.signals,
    },
    reason: SHAPE_TO_REASON[plan.blockShape],
    planReason: dy.reason,
    evaluatedAt: new Date().toISOString(),
  }
}
