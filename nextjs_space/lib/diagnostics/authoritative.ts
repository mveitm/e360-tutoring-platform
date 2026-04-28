/**
 * Phase DV — Authoritative diagnostic attempt selector.
 *
 * CRITICAL SEMANTIC CONSTRAINT (do not widen):
 *   "Authoritative" in DV means **authoritative for tactical continuity-start
 *   selection only**. It does NOT mean:
 *     - pedagogically best attempt
 *     - most representative attempt
 *     - final truth about the student
 *
 *   DV only answers:
 *     "Which diagnostic attempt counts as the current valid input for
 *      downstream continuity logic under the current system rule?"
 *
 * Scope: pure read. No side effects. No interpretation of diagnostic content.
 * A null result is a first-class, machine-readable "no valid attempt yet" —
 * downstream phases MUST honor it (refuse fake personalization).
 */

import type { PrismaClient } from '@prisma/client'
import { prisma as defaultPrisma } from '@/lib/prisma'

/**
 * Accepts either the singleton client or a Prisma transaction client, so
 * later phases can invoke the selector atomically inside a $transaction.
 */
type PrismaLike = PrismaClient | any

export type AuthoritativeDiagnosticReason =
  | 'single_valid_attempt'
  | 'latest_of_multiple'
  | 'no_completed_attempts'
  | 'no_attempts'

export interface AuthoritativeDiagnosticResult {
  enrollmentId: string
  diagnosticType: string
  authoritativeAttemptId: string | null
  reason: AuthoritativeDiagnosticReason
  consideredCount: number
  rejectedCount: number
  evaluatedAt: string // ISO timestamp
}

export interface ResolveAuthoritativeInput {
  enrollmentId: string
  diagnosticType?: string
}

// Canonical definition of "completed-with-evidence", used by the rule.
// Kept as a single, grep-able constant to prevent silent drift.
const COMPLETED_STATUS = 'completed' as const

export const DEFAULT_DIAGNOSTIC_TYPE = 'initial' as const

/**
 * Implements the DV rule:
 *   1. Only rows with status='completed' AND completedAt IS NOT NULL qualify.
 *   2. Zero in pool           → null, reason='no_attempts'.
 *   3. Pool present but none  → null, reason='no_completed_attempts'.
 *      qualify
 *   4. Exactly one qualifies  → that one, reason='single_valid_attempt'.
 *   5. Multiple qualify       → greatest completedAt, then createdAt DESC,
 *                               then id DESC, reason='latest_of_multiple'.
 */
export async function resolveAuthoritativeDiagnosticAttempt(
  client: PrismaLike | null | undefined,
  input: ResolveAuthoritativeInput
): Promise<AuthoritativeDiagnosticResult> {
  const tx = (client ?? defaultPrisma) as PrismaClient
  const diagnosticType = input.diagnosticType ?? DEFAULT_DIAGNOSTIC_TYPE
  const enrollmentId = input.enrollmentId

  const all = await tx.diagnostic.findMany({
    where: { enrollmentId, diagnosticType },
    select: { id: true, status: true, completedAt: true, createdAt: true },
  })

  const qualifying = all.filter(
    (d: any) => d.status === COMPLETED_STATUS && d.completedAt !== null
  )
  const consideredCount = qualifying.length
  const rejectedCount = all.length - qualifying.length
  const evaluatedAt = new Date().toISOString()

  if (all.length === 0) {
    return {
      enrollmentId,
      diagnosticType,
      authoritativeAttemptId: null,
      reason: 'no_attempts',
      consideredCount: 0,
      rejectedCount: 0,
      evaluatedAt,
    }
  }

  if (consideredCount === 0) {
    return {
      enrollmentId,
      diagnosticType,
      authoritativeAttemptId: null,
      reason: 'no_completed_attempts',
      consideredCount: 0,
      rejectedCount,
      evaluatedAt,
    }
  }

  if (consideredCount === 1) {
    return {
      enrollmentId,
      diagnosticType,
      authoritativeAttemptId: qualifying[0].id,
      reason: 'single_valid_attempt',
      consideredCount: 1,
      rejectedCount,
      evaluatedAt,
    }
  }

  // Multiple qualifying: deterministic tiebreak.
  const sorted = [...qualifying].sort((a, b) => {
    // completedAt is non-null on all qualifying rows.
    const aT = (a.completedAt as Date).getTime()
    const bT = (b.completedAt as Date).getTime()
    if (aT !== bT) return bT - aT // DESC
    const aC = a.createdAt.getTime()
    const bC = b.createdAt.getTime()
    if (aC !== bC) return bC - aC // DESC
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0 // id DESC
  })

  return {
    enrollmentId,
    diagnosticType,
    authoritativeAttemptId: sorted[0].id,
    reason: 'latest_of_multiple',
    consideredCount,
    rejectedCount,
    evaluatedAt,
  }
}
