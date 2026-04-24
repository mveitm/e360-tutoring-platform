/**
 * Phase DX — Minimal operational continuity-start output.
 *
 * CRITICAL SEMANTIC CONSTRAINTS (do not widen):
 *
 *   1. DX is an **operational output layer**, not a content-generation phase,
 *      and not a pedagogical engine. It classifies HOW continuity-start
 *      should be operated at a minimal canonical level; it does NOT produce
 *      the initial block / 7-day plan.
 *
 *   2. DX answers:
 *          "How should continuity-start be operated at a minimal canonical level?"
 *      DX does NOT yet answer:
 *          "What should the system automatically do next?"
 *
 *   3. DX operational modes are **canonical operational-read outputs only**.
 *      They do NOT, by themselves:
 *        - authorize workflow transitions
 *        - mutate continuity state
 *        - emit ContinuitySignal rows
 *        - auto-enable or auto-block later structural actions
 *        - modify StudentProgramInstance.currentContinuityState
 *        - modify any cycle row
 *        - touch CycleSnapshot, CycleEvaluation, or CycleDecision
 *      Any such behavior is the explicit responsibility of later, separately
 *      scoped phases.
 *
 *   4. Mapping from DW verdict to DX mode is 1:1 and TOTAL. DX does not
 *      reinterpret, override, or second-guess DW. Adding a new mode or
 *      re-mapping a verdict requires its own explicit phase.
 *
 *   5. Inherited semantic constraint from DW (binding):
 *        `provisional` is a verdict about evidence quality and
 *        continuity-readiness, NOT about the student's academic ability.
 *        Downstream phases MUST NOT collapse `provisional` into
 *        "weak student" or "remedial student" or equivalent semantics.
 *
 *   6. `manual_review_needed` is the operational form of the
 *      Mauricio/Flavia fake-personalization refusal. It is a first-class
 *      output, not an error condition.
 *
 * Scope: pure read. No side effects. No content generation.
 */

import type { PrismaClient } from '@prisma/client'
import { prisma as defaultPrisma } from '@/lib/prisma'
import {
  DEFAULT_DIAGNOSTIC_TYPE,
  type AuthoritativeDiagnosticReason,
} from '@/lib/diagnostics/authoritative'
import {
  readTacticalVerdict,
  type TacticalVerdict,
  type TacticalReason,
  type TacticalReadingSignals,
} from '@/lib/diagnostics/tactical-reading'

type PrismaLike = PrismaClient | Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]

export type OperationalMode =
  | 'normal'
  | 'cautious'
  | 'provisional'
  | 'manual_review_needed'

export type OperationalReason =
  | 'mapped_usable'
  | 'mapped_omission_heavy'
  | 'mapped_low_confidence'
  | 'mapped_insufficient_evidence'

/**
 * 1:1 total mapping from DW verdict to DX operational mode.
 * Type-enforced via Record<TacticalVerdict, ...>: any new verdict becomes
 * a TypeScript compile error here, forcing an explicit phase.
 */
const VERDICT_TO_MODE: Record<TacticalVerdict, OperationalMode> = {
  usable_performance: 'normal',
  omission_heavy_performance: 'cautious',
  low_confidence_evidence: 'provisional',
  insufficient_evidence: 'manual_review_needed',
}

const VERDICT_TO_REASON: Record<TacticalVerdict, OperationalReason> = {
  usable_performance: 'mapped_usable',
  omission_heavy_performance: 'mapped_omission_heavy',
  low_confidence_evidence: 'mapped_low_confidence',
  insufficient_evidence: 'mapped_insufficient_evidence',
}

export interface OperationalOutputSource {
  dwVerdict: TacticalVerdict
  dwReason: TacticalReason
  authoritativeAttemptId: string | null
  dvReason: AuthoritativeDiagnosticReason
  signals: TacticalReadingSignals
}

export interface OperationalOutputResult {
  enrollmentId: string
  diagnosticType: string
  mode: OperationalMode
  source: OperationalOutputSource
  reason: OperationalReason
  evaluatedAt: string
}

export interface ResolveContinuityStartModeInput {
  enrollmentId: string
  diagnosticType?: string
}

/**
 * Resolves the minimal canonical operational continuity-start mode.
 *
 * See file header for the full semantic constraints. In particular, the
 * returned `mode` is a canonical operational-read output only: it does NOT
 * authorize workflow transitions, mutate state, emit signals, or auto-enable
 * or auto-block later structural actions.
 */
export async function resolveContinuityStartMode(
  client: PrismaLike | null | undefined,
  input: ResolveContinuityStartModeInput
): Promise<OperationalOutputResult> {
  const tx = (client ?? defaultPrisma) as PrismaClient
  const enrollmentId = input.enrollmentId
  const diagnosticType = input.diagnosticType ?? DEFAULT_DIAGNOSTIC_TYPE

  const dw = await readTacticalVerdict(tx, { enrollmentId, diagnosticType })

  const mode = VERDICT_TO_MODE[dw.verdict]
  const reason = VERDICT_TO_REASON[dw.verdict]

  return {
    enrollmentId,
    diagnosticType,
    mode,
    source: {
      dwVerdict: dw.verdict,
      dwReason: dw.reason,
      authoritativeAttemptId: dw.source.authoritativeAttemptId,
      dvReason: dw.source.dvReason,
      signals: dw.signals,
    },
    reason,
    evaluatedAt: new Date().toISOString(),
  }
}
