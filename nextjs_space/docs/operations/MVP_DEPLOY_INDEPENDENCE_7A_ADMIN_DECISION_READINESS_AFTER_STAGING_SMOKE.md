# MVP-DEPLOY-INDEPENDENCE-7A — Admin decision readiness after staging smoke

Status: ADMIN_DECISION_READINESS_ASSESSED_NOT_AUTHORIZED

## Live Git baseline

* HEAD = origin/main = `d70283f`
* Last accepted commit = `MVP-DEPLOY-INDEPENDENCE-6R: consolidate staging smoke handoff`
* Working tree expected: clean
* Git preflight is the live truth.

If any document, memory, or handoff contradicts Git preflight, Git wins.

## Purpose

Assess whether the staging fixture is ready for an admin CycleDecision after the first end-to-end staging smoke.

This is readiness/documentation only.

No CycleDecision is created in 7A.

## Current staging fixture

* Staging URL: `https://bexauri-staging.vercel.app`
* Student: `student-smoke-m1@bexauri.test`
* Program: `PAES_M1`
* Enrollment: active
* Cycle: 1
* Cycle status: open
* Total StudyLoads: 2
* Completed StudyLoads: 1
* Pending StudyLoads: 1
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

## Technical readiness findings

The CycleDecision creation path is technically available.

Observed backend/API readiness:

* `POST /api/cycle-decisions` is admin-protected.
* Allowed decision types are `advance`, `reinforce`, `hold`, and `redirect`.
* The endpoint requires `learningCycleId` and `decisionType`.
* The endpoint rejects decisions only when the cycle is already closed.
* It does not block decision creation merely because a StudyLoad is still pending.

Observed admin UI readiness:

* The cycle detail surface shows the operational decision summary.
* The cycle detail surface shows decision count and existing decisions.
* The cycle detail surface renders a `New Decision` control while the cycle is not closed.
* Therefore, from a purely technical/UI perspective, an admin decision could be created now.

## Product/operational readiness finding

Admin decision creation is not authorized yet.

Reason:

* Cycle 1 still has one pending StudyLoad.
* The system already responded to the first evidence by creating the next StudyLoad: `PAES M1 — Ecuaciones lineales básicas`.
* The first completed activity was an entry/balanced diagnostic signal, not a full cycle-level evidence base.
* Creating a CycleDecision now would mix “evidence observed” with “cycle-level pedagogical decision” before the follow-up activity runs.
* The correct next operational state is to preserve the staging fixture and decide whether to continue the pending StudyLoad, not to record a CycleDecision immediately.

## Decision

* Admin decision readiness is technically available.
* Admin decision creation is operationally premature.
* No CycleDecision should be created from the current fixture in 7A.
* No CycleEvaluation should be created from the current fixture in 7A.
* Cycle 1 should remain open.
* The pending StudyLoad should remain pending unless a new explicit phase authorizes continuation.

Readiness verdict:

`TECHNICALLY_READY_BUT_OPERATIONALLY_NOT_AUTHORIZED`

## Why not `reinforce` now?

A `reinforce` decision would look plausible because the student scored 1 of 4 and self-reported `Me costó`.

However, the system has already produced the reinforcement action operationally by creating the next pending StudyLoad. Recording `reinforce` now would be redundant or premature unless Bexauri explicitly defines a CycleDecision as a supervisory annotation independent from cycle closure.

That definition is not yet locked for this staging chain.

## Recommended next path

The strongest next path is to keep staging frozen and decide a branch:

1. Continue with the second StudyLoad in separated phases.
2. Define admin decision semantics before using CycleDecision.
3. Create a sales-ready demo/readiness narrative from the validated staging state.
4. Define staging data lifecycle policy.

Recommended next phase:

`MVP-DEPLOY-INDEPENDENCE-7B - Decide second StudyLoad continuation vs admin decision semantics`

## Guardrails for next phase

* Do not create CycleDecision until its operational semantics are explicitly selected.
* Do not create CycleEvaluation.
* Do not close Cycle 1 while a StudyLoad remains pending.
* Do not start the pending StudyLoad unless explicitly authorized.
* Do not mutate production.
* Do not deploy.
* Do not inspect `.env`.
* Do not print secrets.
