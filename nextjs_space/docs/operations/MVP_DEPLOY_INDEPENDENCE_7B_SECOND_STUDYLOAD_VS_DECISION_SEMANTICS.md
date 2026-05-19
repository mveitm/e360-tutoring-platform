# MVP-DEPLOY-INDEPENDENCE-7B — Second StudyLoad continuation vs admin decision semantics

Status: SECOND_STUDYLOAD_CONTINUATION_AFTER_DECISION_SEMANTICS_SELECTED

## Live Git baseline

* HEAD = origin/main = `3ab3aca`
* Last accepted commit = `MVP-DEPLOY-INDEPENDENCE-7A: assess admin decision readiness`
* Working tree expected: clean
* Git preflight is the live truth.

If any document, memory, or handoff contradicts Git preflight, Git wins.

## Purpose

Decide whether the next operational path should continue the pending second StudyLoad or create an admin CycleDecision first.

This is documentation/decision only.

No staging data is mutated in 7B.

## Current staging fixture

* Staging URL: `https://bexauri-staging.vercel.app`
* Student: `student-smoke-m1@bexauri.test`
* Program: `PAES_M1`
* Enrollment: active
* Cycle: 1
* Cycle status: open
* Completed StudyLoad: `PAES M1 — Entrada balanceada inicial`
* Completed evidence:

  * answered: 4 of 4
  * correct: 1 of 4
  * self-report: `Me costó`
* Pending continuity-created StudyLoad:

  * `PAES M1 — Ecuaciones lineales básicas`
  * status: pending
* CycleDecision count: 0
* CycleEvaluation count: 0
* Cycle has not been closed.

## Decision

Selected path:

`Define minimal CycleDecision semantics first, then proceed later with second StudyLoad continuation in a separate explicit mutation phase.`

The next staging mutation, if later authorized, should be continuing the pending second StudyLoad.

CycleDecision should not be created first from the current fixture.

## Minimal operational semantics

* StudyLoad continuity is the immediate operational response to student evidence.
* CycleDecision is a supervised/admin decision at cycle or milestone level.
* CycleDecision should normally occur after sufficient evidence, after pending relevant StudyLoads are completed, or when a supervisor explicitly decides to hold, redirect, or intervene.
* CycleDecision is not required before the student continues to the next pending StudyLoad.
* CycleEvaluation remains out of scope.

## Rationale

* Cycle 1 has one completed StudyLoad and one pending continuity-created StudyLoad.
* The completed StudyLoad evidence is 4 of 4 answered, 1 of 4 correct, self-report `Me costó`.
* The system already produced the immediate operational response by creating the pending follow-up StudyLoad `PAES M1 — Ecuaciones lineales básicas`.
* Creating a CycleDecision now would confuse immediate StudyLoad continuity with cycle-level/admin supervisory decision-making.
* For the MVP commercial-autonomous baseline, student continuity should not require premature admin intervention.
* CycleDecision should be treated as a cycle-level or supervisor-level pedagogical decision, not as an automatic annotation after every StudyLoad.

## Rejected paths

* Create CycleDecision now: rejected as premature and semantically unclear.
* Create CycleEvaluation now: rejected as out of scope.
* Close Cycle 1 now: rejected because one relevant StudyLoad remains pending.
* Start the pending StudyLoad in 7B: rejected because 7B is documentation/decision only.
* Leave CycleDecision semantics undefined while creating decisions: rejected because it would weaken the commercial-autonomous baseline.

## Recommended next phase

`MVP-DEPLOY-INDEPENDENCE-7C - Second StudyLoad continuation readiness`

7C should still be readiness/authorization first, not automatic mutation.

## 7C guardrails

* Decide whether to start the pending StudyLoad in a later explicit operation phase.
* Do not start the pending StudyLoad in 7C unless the phase is explicitly re-scoped.
* Do not create CycleDecision.
* Do not create CycleEvaluation.
* Do not close Cycle 1.
* Do not mutate production.
* Do not deploy.
* Do not inspect `.env`.
* Do not print secrets.

## Scope preserved

* No staging mutation in 7B.
* No CycleDecision created.
* No CycleEvaluation created.
* No cycle closed.
* No pending StudyLoad started.
* No answer submitted.
* No StudyLoad completed.
* No deploy.
* No production operation.
* No app code change.
* No schema change.
* No package change.
* No generated artifact.
