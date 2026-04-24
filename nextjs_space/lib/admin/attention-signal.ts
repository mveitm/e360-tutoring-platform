/**
 * Phase EG — Minimal admin-only operational attention signal
 *
 * Pure, admin-only, READ-ONLY mapping from the latest persisted
 * `continuity_start_governance_reading` ContinuitySignal row's
 * `rationale.posture` scalar to a minimal attention signal.
 *
 * ====================================================================
 * MANDATORY SEMANTIC CLARIFICATION (verbatim, binding on every use):
 * ====================================================================
 *
 *   This attention signal is ADVISORY ONLY. It is:
 *     - NOT a workflow decision
 *     - NOT a blocking condition
 *     - NOT a write authorization
 *     - NOT a source-of-truth resolution
 *     - NOT a materializer-of-record change
 *
 * ====================================================================
 * Scope invariants
 * ====================================================================
 *
 *   - No schema change.
 *   - No API change under /api/continuity-start/** .
 *   - No lib/continuity-start/** change.
 *   - No DN/DU replacement.
 *   - No ED/EE semantics change.
 *   - No new signal type introduced.
 *   - No new continuity-state introduced.
 *   - No workflow integration.
 *
 * ====================================================================
 * Mapping rule (1:1 TOTAL over the three EC postures + null case)
 * ====================================================================
 *
 *   'blocked'                → 'attention_required'
 *   'structurally_deferred'  → 'monitor'
 *   'convergible_safe'       → 'stable'
 *   null / no record         → 'no_governance_record'
 *
 * Any unknown / unmapped posture string is conservatively treated as
 * `no_governance_record` — we never invent a signal for a posture that
 * EG has not explicitly mapped. Widening the mapping requires an
 * explicit code change, not a data change.
 */

export type AttentionSignal =
  | 'attention_required'
  | 'monitor'
  | 'stable'
  | 'no_governance_record'

export function mapPostureToAttentionSignal(
  posture: string | null | undefined
): AttentionSignal {
  if (posture === 'blocked') return 'attention_required'
  if (posture === 'structurally_deferred') return 'monitor'
  if (posture === 'convergible_safe') return 'stable'
  return 'no_governance_record'
}

export const ATTENTION_SIGNAL_LABELS: Record<AttentionSignal, string> = {
  attention_required: 'Attention required',
  monitor: 'Monitor',
  stable: 'Stable',
  no_governance_record: 'No governance record',
}
