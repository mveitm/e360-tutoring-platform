# MVP-DEPLOY-INDEPENDENCE-6R — Staging smoke handoff

Status: STAGING_SMOKE_HANDOFF_CONSOLIDATED

## Live Git baseline

* HEAD = origin/main = `9a3c663`
* Last accepted commit = `MVP-DEPLOY-INDEPENDENCE-6Q: decide post-completion staging path`
* Working tree expected: clean
* Git preflight is the live truth.

If any document, memory, or handoff contradicts Git preflight, Git wins.

## Operating role contract

* Mauricio does not manually edit files.
* Mauricio may authorize decisions, run terminal/browser checks, verify UI, and paste outputs.
* ChatGPT is director/auditor: phase scope, custody, architecture/product decisions, prompts for Codex/local editor, diff review, and continuity preservation.
* Codex/local editor performs narrow file edits only under explicit prompts.
* No secrets, passwords, cookies, tokens, DATABASE_URL, or `.env` contents should be printed or passed to Codex/ChatGPT.

## Staging target

* Staging URL: `https://bexauri-staging.vercel.app`
* Environment: Vercel + Neon staging
* Purpose: controlled sales-ready smoke environment, not broad demo data and not production commercial operation.

## Validated deploy-independence chain

The MVP-DEPLOY-INDEPENDENCE-6 line validated the following chain in staging:

1. Staging auth/admin smoke was already operational before this line.
2. Controlled base programs were created:

   * `PAES_L1`
   * `PAES_M1`
   * `PAES_M2`
3. Controlled staging student account shell was created:

   * `student-smoke-m1@bexauri.test`
   * matching `User` and `Student`
4. PAES_M1 enrollment was created.
5. Cycle 1 was created automatically.
6. First StudyLoad was created automatically:

   * `PAES M1 — Entrada balanceada inicial`
7. Student login worked.
8. `/now` loaded correctly.
9. Student started the StudyLoad.
10. Student submitted MC answers.
11. Student completed the StudyLoad with self-report.
12. Continuity preparation created the next StudyLoad.
13. Admin evidence view showed self-report, MC submission evidence, pedagogical metadata, and pending next StudyLoad.

## Current staging fixture state

### Student

* Student name: `Smoke M1`
* Email: `student-smoke-m1@bexauri.test`
* Status: active

### Enrollment

* Program: `PAES Matemática M1 (PAES_M1)`
* Enrollment status: active
* Governance record: none
* Skill States: 0

### Cycle

* Cycle: 1
* Status: open
* Total loads: 2
* By status:

  * completed: 1
  * pending: 1
* CycleDecision count: 0
* CycleEvaluation count: 0
* Cycle has not been closed.

### Completed StudyLoad

* Title: `PAES M1 — Entrada balanceada inicial`
* Status: completed
* Self-report: `Me costó`
* MC submission:

  * Respondidas: 4 de 4
  * Correctas: 1 de 4
  * q1: student `C`, correct `C`, result correct
  * q2: student `A`, correct `B`, result incorrect
  * q3: student `A`, correct `C`, result incorrect
  * q4: student `A`, correct `B`, result incorrect
* Content identity:

  * contentKey: `paes_m1_balanced_entry_initial`
  * contentVersion: `v1`
  * programCode: `PAES_M1`
  * sliceId: `BALANCED_ENTRY`
  * axis: `balanced_entry`
  * primaryPurpose: `diagnose`
  * evidenceType: `mc_submission`
  * reviewStatus: `internal_provisional`
  * expertReviewed: false
  * routingStatus: `available_not_universal`

### Pending continuity-created StudyLoad

* Title: `PAES M1 — Ecuaciones lineales básicas`
* Status: pending
* contentKey: `paes_m1_linear_equations_basic`
* contentVersion: `v1`
* sliceId: `AS1`
* axis: `algebra_functions`
* primaryPurpose: `practice`
* This StudyLoad has not been started.

## Preserved boundaries

The following were intentionally not done:

* No second StudyLoad start.
* No second StudyLoad answers.
* No second StudyLoad completion.
* No CycleDecision.
* No CycleEvaluation.
* No cycle close.
* No production mutation.
* No deploy after the smoke chain.
* No seed run.
* No Prisma CLI.
* No SQL.
* No `.env` inspection.
* No secrets printed.

## Product/technical conclusion

The MVP-DEPLOY-INDEPENDENCE-6 chain is sufficient as a first end-to-end staging smoke for the sales-ready baseline.

It validates:

* controlled staging setup;
* base program catalog;
* controlled student account shell;
* PAES_M1 enrollment;
* automatic Cycle 1 and first StudyLoad creation;
* student `/now`;
* StudyLoad start;
* MC answer submission;
* self-report completion;
* automatic next StudyLoad continuity;
* admin evidence visibility.

The staging fixture should now be preserved as a controlled reference state until a new explicit phase selects the next path.

## Recommended next branches

### Branch A — Admin decision readiness

Prepare and verify admin decision workflow without immediately creating decisions.

Potential phase:
`MVP-DEPLOY-INDEPENDENCE-7A - Admin decision readiness after staging smoke`

### Branch B — Continue second StudyLoad

Start and execute the pending `PAES M1 — Ecuaciones lineales básicas` StudyLoad in separate phases.

Potential phase:
`MVP-DEPLOY-INDEPENDENCE-7B - Decide second StudyLoad continuation path`

### Branch C — Sales-ready demo polish

Improve or document the user-facing staging demo flow without mutating data.

Potential phase:
`MVP-SALES-READY-STAGING-1 - Define staging demo narrative and polish gaps`

### Branch D — Staging reset/data policy

Define whether staging fixtures should persist, reset, or be recreated through controlled scripts/runbooks.

Potential phase:
`MVP-STAGING-DATA-POLICY-1 - Define controlled staging data lifecycle`

## Recommended immediate next step

Pause further staging mutation and use this state as the clean handoff point.

Recommended next phase:
`MVP-DEPLOY-INDEPENDENCE-7A - Admin decision readiness after staging smoke`

This should be documentation/readiness first, not immediate decision creation.
