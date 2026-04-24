/**
 * Phase EC offline probe.
 *
 * Pure read. No writes. No persistent demo-state change.
 *
 * S1. Rule exhaustiveness: `CONVERGENCE_RULE` covers all 6 EA
 *     statuses; independent truth-table restatement compared against
 *     the exported rule (not a round-trip through the lib).
 * S2. Per-enrollment classifier cross-check against the independent
 *     truth table; tallies logged.
 * S3. Constant-field invariants on every demo enrollment (EC-5).
 * S4. Binding kind-posture invariant (EC-4):
 *       kind === 'narrow_subset_alignment' iff posture === 'convergible_safe'
 *       kind === 'none'                    iff posture !== 'convergible_safe'
 * S5. DV..DZ audit chain preserved under
 *     `source.eb.source.ea.shadow.source` on every demo enrollment.
 * S6. Row-count invariance across
 *     {StudyLoad, CycleSnapshot, ContinuitySignal, LearningCycle,
 *      StudentProgramInstance} before/after the full sweep.
 *
 * Re-affirms the MANDATORY semantic clarification (EC-2(a)):
 *   `convergible_safe` is a current posture reading only — it means
 *   ONLY that the current posture is compatible with a LATER,
 *   SEPARATELY SCOPED convergence write. It does NOT mean "converge
 *   now", "recommended to converge now", "scheduled to converge now",
 *   automatic merge justification, or automatic materializer-of-record
 *   promotion.
 *
 * NOTE: Statuses `shape_divergent_refusal`, `shadow_empty_vs_materialized`,
 *       `set_divergent_skillstate`, and `aligned_skillstate` are not
 *       reachable in current demo data. They are covered by type-level
 *       exhaustiveness + the independent truth-table restatement in S1
 *       only. This probe performs NO demo-state mutation to synthesize
 *       them.
 */

import { PrismaClient } from '@prisma/client'
import {
  resolveContinuityStartConvergence,
  CONVERGENCE_RULE,
  EC_MATERIALIZER_OF_RECORD,
  EC_SHADOW_SIDE,
  EC_IS_SOURCE_OF_TRUTH_DECISION,
  EC_IS_WRITE_AUTHORIZATION,
  EC_IS_CONVERGENCE_EXECUTION,
  EC_IS_MERGE_DECISION,
  type ConvergencePosture,
  type ConvergenceKind,
  type ConvergenceReason,
  type ConvergenceRiskTier,
} from '../lib/continuity-start/convergence'
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

/**
 * Independent truth table. DELIBERATELY restated by hand, not
 * imported from CONVERGENCE_RULE. S1 compares this table against the
 * exported rule key-by-key so any drift is caught.
 */
const INDEPENDENT_TRUTH_TABLE: Record<
  ReconciliationStatus,
  {
    posture: ConvergencePosture
    kind: ConvergenceKind
    reason: ConvergenceReason
    riskTier: ConvergenceRiskTier
  }
> = {
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

async function probeRuleExhaustiveness() {
  header('S1: 1:1 TOTAL convergence rule covers all 6 EA statuses')
  const expected: ReconciliationStatus[] = [
    'no_structural_block',
    'aligned_skillstate',
    'shape_divergent_safe',
    'shape_divergent_refusal',
    'shadow_empty_vs_materialized',
    'set_divergent_skillstate',
  ]
  for (const s of expected) {
    const got = CONVERGENCE_RULE[s]
    const want = INDEPENDENT_TRUTH_TABLE[s]
    assertEq(`status=${s}`, got, want)
  }
  // Conservative-by-design invariants (the whole point of EC-3/EC-4):
  //  - convergible_safe + narrow_subset_alignment emitted ONLY for
  //    aligned_skillstate.
  //  - structurally_deferred + none emitted ONLY for no_structural_block.
  //  - everything else -> blocked + none.
  for (const s of expected) {
    const r = CONVERGENCE_RULE[s]
    const wantPosture: ConvergencePosture =
      s === 'aligned_skillstate'
        ? 'convergible_safe'
        : s === 'no_structural_block'
        ? 'structurally_deferred'
        : 'blocked'
    assertEq(`conservative default posture for status=${s}`, r.posture, wantPosture)

    const wantKind: ConvergenceKind =
      s === 'aligned_skillstate' ? 'narrow_subset_alignment' : 'none'
    assertEq(`conservative default kind for status=${s}`, r.kind, wantKind)
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
    const r = await resolveContinuityStartConvergence(prisma, {
      enrollmentId: e.id,
    })
    if (!r) continue
    audited += 1

    const expected = INDEPENDENT_TRUTH_TABLE[r.reconciliation.status]
    const ok =
      r.convergence.posture === expected.posture &&
      r.convergence.kind === expected.kind &&
      r.convergence.reason === expected.reason &&
      r.convergence.riskTier === expected.riskTier
    console.log(
      `  [${ok ? 'PASS' : 'FAIL'}] enrollment=${e.id}  eaStatus=${r.reconciliation.status}  ebPreferred=${r.precedence.preferred}  ->  posture=${r.convergence.posture} kind=${r.convergence.kind} reason=${r.convergence.reason} risk=${r.convergence.riskTier}`
    )
    if (!ok) process.exitCode = 1

    tallies[r.reconciliation.status] =
      (tallies[r.reconciliation.status] ?? 0) + 1
  }
  console.log(`  tallies: ${JSON.stringify(tallies)}  audited=${audited}`)
}

async function probeConstantInvariants() {
  header('S3: constant-field invariants on every demo enrollment (EC-5)')
  const enrollments = await prisma.studentProgramInstance.findMany({
    select: { id: true },
  })
  let checked = 0
  for (const e of enrollments) {
    const r = await resolveContinuityStartConvergence(prisma, {
      enrollmentId: e.id,
    })
    if (!r) continue
    checked += 1
    const ok =
      r.convergence.materializerOfRecord === EC_MATERIALIZER_OF_RECORD &&
      r.convergence.shadowSide === EC_SHADOW_SIDE &&
      r.convergence.isSourceOfTruthDecision === EC_IS_SOURCE_OF_TRUTH_DECISION &&
      r.convergence.isWriteAuthorization === EC_IS_WRITE_AUTHORIZATION &&
      r.convergence.isConvergenceExecution === EC_IS_CONVERGENCE_EXECUTION &&
      r.convergence.isMergeDecision === EC_IS_MERGE_DECISION
    if (!ok) {
      console.log(
        `  [FAIL] enrollment=${e.id}  convergence=${JSON.stringify(
          r.convergence
        )}`
      )
      process.exitCode = 1
    }
  }
  console.log(`  [PASS] constants held on ${checked} enrollments`)
}

async function probeKindPostureInvariant() {
  header('S4: kind/posture binding invariant on every demo enrollment (EC-4)')
  const enrollments = await prisma.studentProgramInstance.findMany({
    select: { id: true },
  })
  let checked = 0
  for (const e of enrollments) {
    const r = await resolveContinuityStartConvergence(prisma, {
      enrollmentId: e.id,
    })
    if (!r) continue
    checked += 1
    const posture = r.convergence.posture
    const kind = r.convergence.kind
    const safe = posture === 'convergible_safe'
    const ok =
      (safe && kind === 'narrow_subset_alignment') ||
      (!safe && kind === 'none')
    if (!ok) {
      console.log(
        `  [FAIL] enrollment=${e.id}  posture=${posture}  kind=${kind}`
      )
      process.exitCode = 1
    }
  }
  console.log(`  [PASS] kind/posture invariant held on ${checked} enrollments`)
}

async function probeAuditPassthrough() {
  header('S5: DV..DZ audit chain preserved under source.eb.source.ea.shadow.source')
  const enrollments = await prisma.studentProgramInstance.findMany({
    select: { id: true },
  })
  let checked = 0
  for (const e of enrollments) {
    const r = await resolveContinuityStartConvergence(prisma, {
      enrollmentId: e.id,
    })
    if (!r) continue
    const src = r.source.eb.source.ea.shadow.source as unknown as Record<
      string,
      unknown
    >
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
  header('S6: no persistent mutation (row counts unchanged)')
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
    await resolveContinuityStartConvergence(prisma, { enrollmentId: e.id })
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
    await probeKindPostureInvariant()
    await probeAuditPassthrough()
    await probeNoMutation()
  } finally {
    await prisma.$disconnect()
  }
  console.log('\nEC probe finished; exit=' + (process.exitCode ?? 0))
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
