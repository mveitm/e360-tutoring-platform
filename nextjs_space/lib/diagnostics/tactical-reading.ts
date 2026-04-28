/**
 * Phase DW — Minimal tactical reading of the authoritative diagnostic attempt.
 *
 * CRITICAL SEMANTIC CONSTRAINTS (do not widen):
 *
 *   1. This layer is a **minimal tactical reading** for continuity-start
 *      purposes only. It is NOT a pedagogical engine, NOT a full error
 *      taxonomy, and NOT a student-profile assessment.
 *
 *   2. "Authoritative" here inherits DV's scope: authoritative for tactical
 *      continuity-start selection only — not pedagogically best, not most
 *      representative, not final truth about the student.
 *
 *   3. The verdict `low_confidence_evidence` is a verdict about **evidence
 *      quality and continuity-readiness**, NOT about the student's
 *      academic ability or performance level. It means:
 *          "The system should not rely confidently on the current diagnostic
 *           evidence for continuity-start logic."
 *      It does NOT mean the student performed poorly. Downstream phases
 *      MUST NOT collapse this verdict into "weak student" or equivalent
 *      semantics.
 *
 *   4. The verdict `insufficient_evidence` encodes the Mauricio/Flavia
 *      laboratory lesson: when no authoritative attempt exists, the system
 *      must refuse fake personalization. This is a first-class,
 *      machine-readable refusal.
 *
 * Scope: pure read. No side effects. No interpretation of answer content.
 */

import type { PrismaClient } from '@prisma/client'
import { prisma as defaultPrisma } from '@/lib/prisma'
import {
  DEFAULT_DIAGNOSTIC_TYPE,
  resolveAuthoritativeDiagnosticAttempt,
  type AuthoritativeDiagnosticReason,
} from '@/lib/diagnostics/authoritative'

type PrismaLike = PrismaClient | any

export type TacticalVerdict =
  | 'usable_performance'
  | 'omission_heavy_performance'
  | 'low_confidence_evidence'
  | 'insufficient_evidence'

export type TacticalReason =
  | 'dv_null'
  | 'unparseable_summary'
  | 'completion_below_threshold'
  | 'omission_above_threshold'
  | 'within_thresholds'

export interface TacticalReadingSignals {
  totalItems?: number
  answered?: number
  omitted?: number
  correct?: number
  completionRatio?: number
  omissionRatio?: number
}

export interface TacticalReadingResult {
  enrollmentId: string
  diagnosticType: string
  verdict: TacticalVerdict
  source: {
    authoritativeAttemptId: string | null
    dvReason: AuthoritativeDiagnosticReason
  }
  signals: TacticalReadingSignals
  reason: TacticalReason
  evaluatedAt: string
}

export interface ReadTacticalVerdictInput {
  enrollmentId: string
  diagnosticType?: string
}

// -------- Thresholds (single source of truth; see Phase DW proposal) --------
// completionRatio < MIN_COMPLETION_RATIO → low_confidence_evidence.
// omissionRatio  >= OMISSION_HEAVY_THRESHOLD (given completion ok) → omission_heavy_performance.
const MIN_COMPLETION_RATIO = 0.5
const OMISSION_HEAVY_THRESHOLD = 0.4
// ----------------------------------------------------------------------------

interface ParsedSummary {
  totalItems: number
  answered: number
  omitted: number
  correct: number
}

function isFiniteNonNegativeNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0
}

function parseResultSummary(raw: string | null | undefined): ParsedSummary | null {
  if (raw == null) return null
  let obj: unknown
  try {
    obj = JSON.parse(raw)
  } catch {
    return null
  }
  if (!obj || typeof obj !== 'object') return null
  const o = obj as Record<string, unknown>
  const { totalItems, answered, omitted, correct } = o
  if (
    !isFiniteNonNegativeNumber(totalItems) ||
    !isFiniteNonNegativeNumber(answered) ||
    !isFiniteNonNegativeNumber(omitted) ||
    !isFiniteNonNegativeNumber(correct)
  ) {
    return null
  }
  if (totalItems <= 0) return null
  return { totalItems, answered, omitted, correct }
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000
}

/**
 * Produces the minimal tactical reading verdict for continuity-start logic.
 * See file header for the full semantic constraints. In particular,
 * `low_confidence_evidence` is a verdict about evidence quality and
 * continuity-readiness — not about the student's academic ability.
 */
export async function readTacticalVerdict(
  client: PrismaLike | null | undefined,
  input: ReadTacticalVerdictInput
): Promise<TacticalReadingResult> {
  const tx = (client ?? defaultPrisma) as PrismaClient
  const enrollmentId = input.enrollmentId
  const diagnosticType = input.diagnosticType ?? DEFAULT_DIAGNOSTIC_TYPE

  const dv = await resolveAuthoritativeDiagnosticAttempt(tx, {
    enrollmentId,
    diagnosticType,
  })

  const base = {
    enrollmentId,
    diagnosticType,
    source: {
      authoritativeAttemptId: dv.authoritativeAttemptId,
      dvReason: dv.reason,
    },
    evaluatedAt: new Date().toISOString(),
  }

  // 1. DV refused → insufficient_evidence (fake-personalization refusal).
  if (dv.authoritativeAttemptId === null) {
    return {
      ...base,
      verdict: 'insufficient_evidence',
      signals: {},
      reason: 'dv_null',
    }
  }

  // 2. Load the authoritative row and read its resultSummary.
  const row = await tx.diagnostic.findUnique({
    where: { id: dv.authoritativeAttemptId },
    select: { resultSummary: true },
  })

  const parsed = parseResultSummary(row?.resultSummary ?? null)

  // 3. Unparseable / missing / invalid shape → low_confidence_evidence.
  //    Reminder: this is about evidence quality, not about the student.
  if (!parsed) {
    return {
      ...base,
      verdict: 'low_confidence_evidence',
      signals: {},
      reason: 'unparseable_summary',
    }
  }

  // 4. Apply thresholds.
  const completionRatio = round4(parsed.answered / parsed.totalItems)
  const omissionRatio = round4(parsed.omitted / parsed.totalItems)

  const signals: TacticalReadingSignals = {
    totalItems: parsed.totalItems,
    answered: parsed.answered,
    omitted: parsed.omitted,
    correct: parsed.correct,
    completionRatio,
    omissionRatio,
  }

  if (completionRatio < MIN_COMPLETION_RATIO) {
    // Evidence is too incomplete to rely on. NOT a statement about the student.
    return {
      ...base,
      verdict: 'low_confidence_evidence',
      signals,
      reason: 'completion_below_threshold',
    }
  }

  if (omissionRatio >= OMISSION_HEAVY_THRESHOLD) {
    return {
      ...base,
      verdict: 'omission_heavy_performance',
      signals,
      reason: 'omission_above_threshold',
    }
  }

  return {
    ...base,
    verdict: 'usable_performance',
    signals,
    reason: 'within_thresholds',
  }
}
