# MVP-SALES-PILOT-DRY-RUN-0 - Prepare closed M1-first pilot dry-run plan

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-0 - Prepare closed M1-first pilot dry-run plan
```

Type:

```text
Documentation/planning/custody only / no execution / no runtime / no DB.
```

Purpose:

Prepare a controlled dry-run plan for the narrowed M1-first closed pilot, precise enough for a future execution phase, without executing the dry-run or creating any data.

This phase does not edit app code, run runtime/browser, run DB commands, create users/students/access/enrollment/cycle/StudyLoad/session/response records, activate trial/payment, touch staging/production, commit real student data, approve student/product use, declare PAES_L1 or PAES_M2 ready, declare Sales-Ready, or execute a pilot.

## 2. Baseline and Context Gate summary

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = ffc16e4
```

Latest accepted commit:

```text
ffc16e4 - MVP-SALES-NOW-PILOT-1C: implement M1 pilot now copy
```

Context Gate summary:

* External audit remains `NO_LISTO`.
* The first pilot remains `NARROWED_FIRST_VERTICAL_PILOT`.
* `PAES_M1 = PILOT_USABLE_WITH_LIMITS`.
* `PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT`.
* `PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT`.
* Access/payment/trial boundary remains `STAGED_NO_PAYMENT_THEN_PAYMENT_SANDBOX`.
* First dry-run and first closed pilot remain no-payment closed controlled lab.
* A versioned access register template exists; the real register instance must remain private and non-committed.
* `/now` has been adjusted to show coarse closed PAES M1 pilot state and M1-only/L1-M2-not-active boundaries.

Read-only inspection confirmed:

* `/now` resolves one active enrollment and one current open cycle for the authenticated student.
* `/now` shows pending, in-progress, and completed StudyLoads for the current cycle.
* The start route transitions a pending StudyLoad to in-progress and creates one in-progress TutoringSession.
* The responses route persists one `mc_submission` response for the active in-progress session and returns item/evidence feedback from registry content.
* The complete route persists one self-report response, completes the session and StudyLoad, and then attempts M1 rule-based continuity outside the completion transaction.
* The admin learning-cycle detail surface can display self-report evidence, MC submission evidence, content identity, and pedagogical metadata for review.
* Student detail/admin surfaces expose useful account, access, enrollment, and cycle fragments, but they are not a complete pilot register.

## 3. Starting point from previous phases

Current accepted posture:

```text
External audit verdict = NO_LISTO
Pilot scope = NARROWED_FIRST_VERTICAL_PILOT
First pilot = M1-first, 3 controlled participants
Access/payment/trial = STAGED_NO_PAYMENT_THEN_PAYMENT_SANDBOX
Pilot mode = no-payment closed controlled lab first
/now = adjusted for coarse closed PAES M1 pilot state
PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT
PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT
Sales-Ready claim = not allowed
```

The access register template exists at:

```text
nextjs_space/docs/operations/templates/CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE.md
```

The real private register instance is still required before execution and must remain outside the repo.

## 4. Dry-run objective

Objective:

```text
Prove or falsify the first vertical M1-first pilot circuit before involving real controlled students.
```

The dry-run should test the vertical circuit:

```text
participant code -> account/access state -> M1 enrollment/cycle/load readiness -> /now visible state -> StudyLoad start -> StudyLoad activity -> response submission -> completion/self-report -> admin/tutor evidence review -> support/failure record -> go/no-go
```

The dry-run is not:

* product launch;
* Sales-Ready approval;
* payment test;
* public trial;
* full L1/M1/M2 pilot;
* proof of L1 readiness;
* proof of M2 readiness;
* approval for real student use.

## 5. Dry-run type decision

Decision:

```text
PLANNED_TWO_STEP_LOCAL_THEN_STAGING_DRY_RUN
```

Meaning:

* First verify the vertical circuit in local/dev or controlled non-production context.
* Then verify separately in staging before any real controlled students.
* Do not use production.
* Do not use real student private data in this planning phase.
* Do not print or inspect raw env values, database URLs, secrets, tokens, cookies, headers, or backups.

Rationale:

Local/dev first is safer for fixture-equivalent account/cycle/load setup and failure discovery. Staging should be a separate explicitly authorized verification after the local/dev path and target environment rules are clear. Production remains out of scope.

## 6. Participant model

Participant codes:

```text
PILOT_M1_001
PILOT_M1_002
PILOT_M1_003
```

Rules:

* Use participant codes only in repo-visible docs.
* Do not commit real names, emails, phone numbers, RUTs, consent details, payment evidence, support notes, credentials, or private student data.
* Real contact details must remain private and non-committed.
* Participant types may be `internal_test` or `controlled_student` depending on the future execution phase.
* The first dry-run may use fixture-equivalent accounts only if a later execution phase explicitly authorizes account/data creation.
* The planning phase creates no register instance and no app/database records.

## 7. Data readiness needed for future execution

### Required records or surfaces per participant

Future execution needs, without creating them in this phase:

* `User` or account capable of login.
* `Student` linked by the current provisional email model.
* Access state/source-of-truth entry in the private register.
* `PAES_M1` enrollment with active status.
* Open/current `LearningCycle`.
* One pending M1 `StudyLoad` with registered content.
* Ability to start the StudyLoad through `/now`.
* Ability to submit MC responses.
* Ability to complete the StudyLoad with self-report.
* Admin/tutor evidence visibility for the resulting session/responses.

### Likely existing app capability

Read-only inspection indicates the app likely already supports:

* account creation/reset through admin student detail;
* enrollment creation/update through admin student detail;
* `/now` visibility for one active enrollment/current cycle;
* pending/in-progress/completed StudyLoad display;
* StudyLoad start route;
* activity viewer for registry-backed StudyLoads;
* MC response persistence;
* self-report completion;
* completed work visibility;
* admin learning-cycle evidence display for MC and self-report evidence.

### Must be created or confirmed in future execution phase

Future dry-run execution must create or confirm, in a controlled non-production context:

* participant-coded private register entries;
* safe accounts for the three participant codes or fixture-equivalent actors;
* matching `Student` records;
* default or explicit `StudentAccess` records as applicable;
* active `PAES_M1` enrollment;
* open/current `LearningCycle`;
* pending M1 StudyLoad using the selected registry title;
* operator notes for each checkpoint and gap.

### Must not become normal operation

Direct DB editing must not be the normal workflow. If a future execution phase needs fixture setup, it must be explicitly authorized, target-confirmed, labeled, reproducible, and recorded as setup, not as the future pilot operating model.

## 8. Candidate M1 StudyLoad for dry-run

Primary candidate:

```text
PAES M1 - Entrada balanceada inicial
```

Repository registry title:

```text
PAES M1 — Entrada balanceada inicial
```

Content key:

```text
paes_m1_balanced_entry_initial
```

Rationale:

* It is existing registry-backed M1 content.
* It is short enough for a dry-run: 4 multiple-choice items.
* It is explicitly M1 and entry-oriented.
* It exercises the same start -> activity -> MC response -> feedback/evidence -> completion/self-report path required for the pilot.
* It avoids L1 and M2 activation.
* It has a known continuity path to `paes_m1_linear_equations_basic`, which can be observed as a non-blocking consequence if future execution chooses to check continuity.

Boundary:

The dry-run must not interpret this activity as full PAES M1 coverage, score prediction, mastery/theta, adaptive AI, complete preparation, or guaranteed improvement.

Fallback candidates if the primary candidate is blocked:

* `PAES M1 — Ecuaciones lineales básicas` / `paes_m1_linear_equations_basic`.
* `PAES M1 — Problemas con ecuaciones lineales` / `paes_m1_linear_equations_word_problems`.

If no registry-backed M1 StudyLoad can be safely assigned in a future execution phase, the dry-run is blocked.

## 9. Dry-run execution sequence for future phase

Future execution phase sequence, repeated per participant or run first with one participant and then repeated for the other two if the execution plan allows:

1. Verify Git preflight and target environment.
2. Confirm target is local/dev or separately authorized staging.
3. Confirm no production target and no real private data in repo.
4. Prepare or confirm the private participant register with `PILOT_M1_001`, `PILOT_M1_002`, and `PILOT_M1_003`.
5. Create or confirm account for the participant code.
6. Create or confirm matching `Student`.
7. Confirm access source-of-truth state in the private register.
8. Create or confirm active `PAES_M1` enrollment.
9. Create or confirm open/current `LearningCycle`.
10. Create or confirm one pending M1 StudyLoad using the selected registry title.
11. Log in as the participant.
12. Open `/now`.
13. Verify closed PAES M1 pilot copy and absence of L1/M2/payment/trial/public-readiness implication.
14. Start the pending StudyLoad through the visible action.
15. Open the activity.
16. Submit MC answers.
17. Verify feedback/evidence state.
18. Complete the StudyLoad with one allowed self-report.
19. Return to `/now`.
20. Verify completed evidence visibility and next-state behavior.
21. Open admin/tutor evidence surface for the relevant learning cycle.
22. Verify MC submission evidence and self-report evidence are visible.
23. Record support/failure status.
24. Update the private access register with non-sensitive checkpoint status.
25. Produce go/no-go result.

## 10. Evidence checklist

Expected evidence for the future dry-run:

* `/now` screenshot/manual observation without private data.
* Closed PAES M1 pilot copy visible.
* No L1/M2 active implication.
* No payment/trial/subscription implication.
* No forbidden claims.
* Pending StudyLoad visible before start.
* StudyLoad status transition: `pending -> in_progress`.
* TutoringSession created by start path.
* Activity viewer opens registered M1 content.
* MC submission persists.
* Item count and selected answers are recorded.
* Correctness summary is visible where applicable.
* Completion/self-report persists.
* StudyLoad status transition: `in_progress -> completed`.
* Completed work visible to student on `/now`.
* Admin/tutor evidence surface shows MC submission and self-report.
* Private register checkpoint statuses are updated outside repo.
* Support/failure record exists, even if no issue occurred.

## 11. Support/failure checklist

Failure categories to record:

* account/login failure;
* no active program;
* no StudyLoad;
* wrong program/scope;
* `/now` copy confusing;
* start route failure;
* activity viewer failure;
* response submission failure;
* completion/self-report failure;
* continuity side effect confusing or unsafe;
* completed work not visible;
* admin evidence missing;
* support path unclear;
* private register mismatch;
* accidental L1/M2 implication;
* payment/trial implication;
* environment target uncertainty;
* private data handling risk.

Each failure should be recorded with:

* participant code;
* checkpoint;
* observed behavior;
* expected behavior;
* severity: blocker / acceptable limitation / deferred;
* next action;
* private external reference if needed, never raw private data in repo.

## 12. Go/no-go criteria

Possible outcomes:

```text
GO_FOR_INTERNAL_CONTROLLED_M1_PILOT
NO_GO_FIX_BLOCKERS
NARROW_SCOPE_FURTHER
```

GO requires:

* 3 participant-coded accounts or fixture-equivalent dry-run entities complete the selected path, or one participant path passes and the remaining two are explicitly scheduled depending on execution plan.
* `/now` does not block or misrepresent the M1-only closed pilot.
* M1 StudyLoad start, response submission, and completion work.
* Evidence is captured.
* Admin/tutor evidence review is possible.
* Private access register tracking is consistent with observed state.
* Support/failure path is recorded.
* No L1/M2 active implication.
* No payment/trial/subscription implication.
* No Sales-Ready/public launch claim.
* No score, mastery/theta, adaptive AI, complete coverage, or guaranteed improvement claim.

`NO_GO_FIX_BLOCKERS` applies if any core circuit step fails or cannot be observed.

`NARROW_SCOPE_FURTHER` applies if the full three-participant pass is too risky, but a smaller controlled one-participant path can generate useful evidence without misleading scope.

## 13. Stop rules

Future execution must stop if:

* target environment cannot be confirmed safely;
* production is the only available target;
* real private data would be committed;
* secrets, raw env values, database URLs, tokens, cookies, headers, or backups would need to be printed or inspected;
* direct DB edits become normal workflow rather than explicitly authorized setup;
* `/now` misrepresents M1-only closed pilot scope;
* StudyLoad start, activity, response, or completion path fails;
* admin evidence path fails;
* payment/trial ambiguity appears;
* L1/M2 readiness is implied;
* a future execution plan cannot identify cleanup/isolation rules for created fixture-equivalent data.

## 14. Environment boundary

Environment rule:

```text
No production dry-run.
```

Allowed only in future explicitly authorized execution phases:

* local/dev controlled context;
* staging controlled context after separate target confirmation.

Staging dry-run requires:

* explicit authorization;
* target confirmation;
* no env/secrets printed;
* no raw database URL disclosure;
* no real student private data in repo;
* no payment/trial activation;
* no public pilot execution.

## 15. Access register usage

The committed template remains a template only.

Future execution must:

* use participant codes only in repo-visible notes;
* keep the real register instance private;
* record `accountStatus`, `nowStatus`, `firstStudyLoadStatus`, `evidenceStatus`, `adminReviewStatus`, `supportStatus`, and `goNoGoStatus` after each checkpoint;
* never store real private data, credentials, payment evidence, consent details, or support notes in repo;
* update the register after observed evidence, not from memory.

## 16. What remains deferred

Deferred:

* real 3-student pilot execution;
* payment sandbox;
* public trial;
* L1 activation;
* M2 activation;
* full triad dashboard;
* admin surface implementation unless the dry-run proves it is needed;
* production dry-run;
* Sales-Ready/public launch.

## 17. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-1A - Execute controlled local/dev M1-first dry-run
```

Reason:

The plan identifies a bounded local/dev-first execution path. `/now` copy is adjusted, M1 registry content exists, StudyLoad start/response/complete routes exist, admin evidence visibility exists, and the access template/private-register rule is defined.

Execution remains blocked until a future prompt explicitly authorizes:

* target environment confirmation;
* fixture-equivalent or controlled account setup;
* any needed local/dev DB mutations;
* no-production and no-secret guardrails;
* cleanup/isolation handling.

If the future execution prompt cannot safely authorize data setup, replace the next phase with:

```text
MVP-SALES-PILOT-DRY-RUN-1A - Prepare execution fixtures for controlled M1-first dry-run
```

## 18. Phase gate classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go
Sales-ready relevance: direct/high
Dependency: MVP-SALES-NOW-PILOT-1C closed at ffc16e4
What it advances: dry-run plan for first closed M1-first vertical pilot circuit
What it does not advance: execution, DB mutation, real student activation, payment/trial, staging/prod, public readiness
Priority verdict: APPROVED_DRY_RUN_PLAN
Authorization status: executed only after Mauricio authorization
```

## 19. Non-goals

This phase does not:

* edit app code;
* edit tests;
* edit Prisma schema;
* edit package files;
* run tests/build;
* run Prisma, SQL, or DB commands;
* create fixtures;
* create users;
* create students;
* create StudentAccess rows;
* create enrollments;
* create LearningCycles;
* create StudyLoad rows;
* create sessions;
* create responses;
* activate trial;
* activate payment;
* create subscription state;
* reconcile payments;
* run browser/runtime/dev server;
* touch staging or production;
* inspect `.env`, database URLs, raw env values, secrets, tokens, passwords, cookies, headers, or backups;
* commit real student data;
* create or commit a real access register instance;
* approve student use;
* approve product use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute a pilot.

## 20. Result marker

```text
MVP_SALES_PILOT_DRY_RUN_0_PLAN_DEFINED
```
