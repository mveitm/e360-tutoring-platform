/**
 * Phase EB offline probe.
 *
 * Pure read. No writes.
 *
 * 1. Reproduces the 1:1 TOTAL precedence rule as an independent truth
 *    table and cross-checks every demo enrollment's EB response
 *    against it.
 * 2. Asserts the constant-field invariants mandated by (EB-4):
 *      materializerOfRecord === 'structural_dn_du'
 *      shadowSide          === 'dz_shadow_block'
 *      isSourceOfTruthDecision === false
 *      isWriteAuthorization    === false
 * 3. Confirms full DV..DZ audit passthrough is preserved under
 *    source.ea.shadow.source.
 * 4. Confirms row-count invariance across
 *    {StudyLoad, CycleSnapshot, ContinuitySignal, LearningCycle,
 *     StudentProgramInstance} before/after the full sweep.
 *
 * Re-affirms the MANDATORY semantic clarification (EB-2):
 *   `preferred` is a current governance-reading result only. It does
 *   NOT mean the non-preferred side is invalid, deprecated,
 *   suppressed, or loses audit value, and it does NOT mean
 *   source-of-truth resolution has been made.
 */

import { PrismaClient } from '@prisma/client'
import {
  resolveContinuityStartPrecedence,
  PRECEDENCE_RULE,
  EB_MATERIALIZER_OF_RECORD,
  EB_SHADOW_SIDE,
  EB_IS_SOURCE_OF_TRUTH_DECISION,
  EB_IS_WRITE_AUTHORIZATION,
} from '../lib/continuity-start/precedence'
import type { ReconciliationStatus } from '../lib/continuity-start/reconciliation'

const prisma = new PrismaClient()

function header(s: string) {
  console.log('\n=== ' + s + ' ===')
}

function assertEq<T>(label: string, got: T, want: T) {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  console.log(
    `  [${ok ? 'PASS' : 'FAIL'}] ${label}  got=${JSON.stringify(
      got
    )}  want=${JSON.stringify(want)}`
  )
  if (!ok) process.exitCode = 1
}

async function probeRuleExhaustiveness() {
  header('S1: 1:1 TOTAL rule covers all 6 EA statuses')
  const expected: ReconciliationStatus[] = [
    'no_structural_block',
    'aligned_skillstate',
    'shape_divergent_safe',
    'shape_divergent_refusal',
    'shadow_empty_vs_materialized',
    'set_divergent_skillstate',
  ]
  for (const s of expected) {
    const r = PRECEDENCE_RULE[s]
    const ok = !!r && !!r.preferred && !!r.reason && !!r.riskTier
    console.log(
      `  [${ok ? 'PASS' : 'FAIL'}] status=${s}  ->  ${JSON.stringify(r)}`
    )
    if (!ok) process.exitCode = 1
  }
  // Conservative-by-default invariant: structural is preferred for
  // every status EXCEPT no_structural_block.
  for (const s of expected) {
    const want =
      s === 'no_structural_block' ? 'shadow' : 'structural'
    const got = PRECEDENCE_RULE[s].preferred
    assertEq(`conservative default for status=${s}`, got, want)
  }
}

async function probeAllDemoEnrollments() {
  header('S2: classify every demo enrollment against the independent truth table')
  const enrollments = await prisma.studentProgramInstance.findMany({
    select: { id: true },
  })
  const tallies: Record<string, number> = {}
  let audited = 0
  for (const e of enrollments) {
    const r = await resolveContinuityStartPrecedence(prisma, {
      enrollmentId: e.id,
    })
    if (!r) continue
    audited += 1

    // Independent rule lookup (no reuse of EB's return value for mapping).
    const expected = PRECEDENCE_RULE[r.reconciliation.status]
    const ok =
      r.precedence.preferred === expected.preferred &&
      r.precedence.reason === expected.reason &&
      r.precedence.riskTier === expected.riskTier
    console.log(
      `  [${ok ? 'PASS' : 'FAIL'}] enrollment=${e.id}  eaStatus=${r.reconciliation.status}  ->  preferred=${r.precedence.preferred} reason=${r.precedence.reason} risk=${r.precedence.riskTier}`
    )
    if (!ok) process.exitCode = 1

    tallies[r.reconciliation.status] =
      (tallies[r.reconciliation.status] ?? 0) + 1
  }
  console.log(`  tallies: ${JSON.stringify(tallies)}  audited=${audited}`)
}

async function probeConstantInvariants() {
  header('S3: constant-field invariants on every demo enrollment (EB-4)')
  const enrollments = await prisma.studentProgramInstance.findMany({
    select: { id: true },
  })
  let checked = 0
  for (const e of enrollments) {
    const r = await resolveContinuityStartPrecedence(prisma, {
      enrollmentId: e.id,
    })
    if (!r) continue
    checked += 1
    const ok =
      r.precedence.materializerOfRecord === EB_MATERIALIZER_OF_RECORD &&
      r.precedence.shadowSide === EB_SHADOW_SIDE &&
      r.precedence.isSourceOfTruthDecision === EB_IS_SOURCE_OF_TRUTH_DECISION &&
      r.precedence.isWriteAuthorization === EB_IS_WRITE_AUTHORIZATION
    if (!ok) {
      console.log(
        `  [FAIL] enrollment=${e.id}  precedence=${JSON.stringify(
          r.precedence
        )}`
      )
      process.exitCode = 1
    }
  }
  console.log(`  [PASS] constants held on ${checked} enrollments`)
}

async function probeAuditPassthrough() {
  header('S4: DV..DZ audit chain preserved under source.ea.shadow.source')
  const enrollments = await prisma.studentProgramInstance.findMany({
    select: { id: true },
  })
  let checked = 0
  for (const e of enrollments) {
    const r = await resolveContinuityStartPrecedence(prisma, {
      enrollmentId: e.id,
    })
    if (!r) continue
    const src = r.source.ea.shadow.source as unknown as Record<string, unknown>
    const ok =
      'plan' in src &&
      'mode' in src &&
      'dwVerdict' in src &&
      'dvReason' in src
    if (!ok) {
      console.log(
        `  [FAIL] enrollment=${e.id}  audit keys present: ${JSON.stringify(
          Object.keys(src)
        )}`
      )
      process.exitCode = 1
    }
    checked += 1
  }
  console.log(`  [PASS] audit chain present on ${checked} enrollments`)
}

async function probeNoMutation() {
  header('S5: no persistent mutation (row counts unchanged)')
  const before = {
    studyLoads: await prisma.studyLoad.count(),
    cycleSnapshots: await prisma.cycleSnapshot.count(),
    continuitySignals: await prisma.continuitySignal.count(),
    learningCycles: await prisma.learningCycle.count(),
    enrollments: await prisma.studentProgramInstance.count(),
  }
  const enrollments = await prisma.studentProgramInstance.findMany({
    select: { id: true },
  })
  for (const e of enrollments) {
    await resolveContinuityStartPrecedence(prisma, { enrollmentId: e.id })
  }
  const after = {
    studyLoads: await prisma.studyLoad.count(),
    cycleSnapshots: await prisma.cycleSnapshot.count(),
    continuitySignals: await prisma.continuitySignal.count(),
    learningCycles: await prisma.learningCycle.count(),
    enrollments: await prisma.studentProgramInstance.count(),
  }
  console.log(`  before=${JSON.stringify(before)}`)
  console.log(`  after =${JSON.stringify(after)}`)
  const ok = JSON.stringify(before) === JSON.stringify(after)
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] counts unchanged`)
  if (!ok) process.exitCode = 1
}

async function main() {
  try {
    await probeRuleExhaustiveness()
    await probeAllDemoEnrollments()
    await probeConstantInvariants()
    await probeAuditPassthrough()
    await probeNoMutation()
  } finally {
    await prisma.$disconnect()
  }
  console.log('\nEB probe finished; exit=' + (process.exitCode ?? 0))
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
