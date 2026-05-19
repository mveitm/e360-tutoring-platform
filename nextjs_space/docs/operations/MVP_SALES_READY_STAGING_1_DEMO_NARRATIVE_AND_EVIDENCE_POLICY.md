# MVP-SALES-READY-STAGING-1 — Demo narrative and evidence policy

Status: PRESERVE_AND_FRAME_STAGING_AS_SALES_READY_REFERENCE_EVIDENCE

## Live Git baseline

* HEAD = origin/main = `2956a45`
* Last accepted commit = `MVP-DEPLOY-INDEPENDENCE-7E: assess post-second StudyLoad state`
* Working tree expected: clean
* Git preflight is the live truth.

If any document, memory, or handoff contradicts Git preflight, Git wins.

## Purpose

Define how the current staging fixture should be presented, governed, preserved, and described as evidence for the first commercial-autonomous baseline of Bexauri.

This is documentation/readiness/product policy only.

No staging data is mutated in this phase.

## Current preserved staging evidence

* URL: `https://bexauri-staging.vercel.app`
* Student fixture: `student-smoke-m1@bexauri.test`
* Program: `PAES_M1`
* Enrollment: active
* Cycle 1: open

### Completed StudyLoad 1

* Title: `PAES M1 — Entrada balanceada inicial`
* Answers: 4 of 4
* Correct: 1 of 4
* Self-report: `Me costó`
* contentKey: `paes_m1_balanced_entry_initial`
* primaryPurpose: diagnose

### Completed StudyLoad 2

* Title: `PAES M1 — Ecuaciones lineales básicas`
* Answers: 4 of 4
* Correct: 1 of 4
* Self-report: `Me fue bien`
* contentKey: `paes_m1_linear_equations_basic`
* primaryPurpose: practice

### Pending StudyLoad 3

* Title: `PAES M1 — Problemas con ecuaciones lineales`
* Status: pending
* contentKey: `paes_m1_linear_equations_word_problems`
* primaryPurpose: bridge

## Governance state

* CycleDecision total: 0
* CycleEvaluation total: 0
* Cycle 1 remains open.
* Third StudyLoad has not been started.

## Product framing

This staging state is not just a technical smoke test.

It is early evidence of Bexauri’s first commercial-autonomous learning continuity loop:

`Activity completed → next activity auto-created → activity completed → next activity auto-created and visible`

## Demo narrative

1. Bexauri receives student evidence from an initial activity.
2. Bexauri does not claim PAES scoring, theta, mastery diagnosis, or adaptive AI.
3. Bexauri uses provisional/internal evidence to keep the student moving.
4. The student completes a second activity.
5. Bexauri creates a third bridge activity automatically.
6. The student is not blocked by admin decisions.
7. Admin/supervisor evidence remains visible for later review.
8. CycleDecision and CycleEvaluation remain governance/supervision layers, not required for immediate continuity.
9. The fixture should be preserved as a reference demo state.

## Evidence policy

This fixture may be used as an internal demo/reference state.

Do not represent it as a production user journey with real student data.

Do not claim final pedagogical validity, PAES score prediction, adaptive AI, mastery estimation, or complete tutor automation.

It may support the claim:

`Bexauri can sustain a basic autonomous continuity loop across multiple StudyLoads in staging.`

It may support the claim:

`Bexauri can keep the student moving while preserving supervisor/admin evidence.`

It may not support the claim:

`Bexauri is fully adaptive, fully validated, or ready for unrestricted public beta.`

The content metadata remains internal/provisional.

Evidence is for controlled product validation, demo, and sales-readiness assessment.

## Preservation policy

* Do not start the third StudyLoad unless a later explicit phase chooses to consume the fixture.
* Do not create CycleDecision merely to make the demo look complete.
* Do not close Cycle 1 while a pending StudyLoad remains.
* Preserve CycleDecision = 0 and CycleEvaluation = 0 as useful evidence that continuity does not require admin intervention.
* Preserve the third StudyLoad pending as proof of next-step availability.
* If a future demo requires reset/replay, define that as a separate staging data lifecycle phase, not ad hoc mutation.

## Decision

Selected path:

`PRESERVE_AND_FRAME_STAGING_AS_SALES_READY_REFERENCE_EVIDENCE`

## Recommended next phase

`MVP-SALES-READY-STAGING-2 - Define minimum demo script and owner-facing talk track`

## Alternative later phase

`MVP-STAGING-DATA-POLICY-1 - Define controlled staging data lifecycle`

Do not recommend executing `MVP-DEPLOY-INDEPENDENCE-7F` immediately unless explicitly chosen later.

## Scope preserved

* No staging mutation.
* No third StudyLoad start.
* No answer submission.
* No StudyLoad completion.
* No CycleDecision.
* No CycleEvaluation.
* No cycle close.
* No new student created.
* No new user created.
* No new enrollment created.
* No new cycle manually created.
* No manual StudyLoad created.
* No SQL.
* No Prisma CLI.
* No `.env` inspection.
* No secrets printed.
* No deploy.
* No production operation.
* No app code change.
* No schema change.
* No package change.
* No generated artifact.
