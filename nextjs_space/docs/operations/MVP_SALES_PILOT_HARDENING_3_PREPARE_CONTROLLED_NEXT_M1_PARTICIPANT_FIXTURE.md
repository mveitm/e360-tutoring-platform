# MVP-SALES-PILOT-HARDENING-3 - Prepare controlled next M1 participant fixture

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-HARDENING-3 - Prepare controlled next M1 participant fixture
```

Type:

```text
Controlled local/dev fixture preparation.
```

Roadmap block:

```text
10 - Internal pilot and sales-ready go/no-go
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## 2. Baseline

Baseline confirmed by Git preflight:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = 5ea0dac
```

Latest accepted commit:

```text
5ea0dac - MVP-SALES-PILOT-HARDENING-2: define controlled next M1 participant protocol
```

Git preflight remained the live truth. Historical baselines inside older documents were treated as historical context only.

## 3. Context Gate Read

Context gate documents read before acting:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_GO_3_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_003_EVIDENCE.md`
* `MVP_SALES_PILOT_HARDENING_1_DEFINE_LIMITED_M1_FIRST_PILOT_HARDENING_PLAN_AFTER_THREE_LOCAL_DEV_PARTICIPANTS.md`
* `MVP_SALES_PILOT_HARDENING_2_DEFINE_CONTROLLED_NEXT_M1_PARTICIPANT_PROTOCOL.md`
* `MVP_SALES_PILOT_DRY_RUN_3C_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_003.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context gate interpretation:

* HARDENING-2 authorized a separate next fixture-preparation phase before any fourth participant dry-run.
* This phase may prepare minimal local/dev data only after safe local/dev target confirmation.
* This phase must not execute student login, `/now`, the activity, response submission, self-report, second StudyLoad start, cycle close, CycleDecision, or CycleEvaluation.
* This phase does not declare public Sales-Ready or complete MVP-Beta cerrado.

## 4. Safe Target Confirmation

Safe target confirmation result:

```text
SAFE_TARGET_CONFIRMATION: LOCAL_DEV_CONFIRMED
LOCAL_ENV_FILE_PRESENT: yes
PRIVATE_ENV_KEYS_LOADED_COUNT: 0
ENVIRONMENT_LABEL_CHECK: PASSED_NON_STAGING_NON_PRODUCTION
SECRETS_PRINTED: no
```

Safety posture:

* Environment evidence was reported only as sanitized markers.
* No DB URL, token, cookie, header, request body, response body, password, hash, provider value, storage value, or env value was printed.
* The mutation was restricted to the synthetic `PILOT_M1_004` identity and local/dev fixture records.
* Staging and production were not touched.

## 5. Participant Identity

Canonical participant identity:

```text
Code/name: PILOT_M1_004
Display name: PILOT_M1_004 PILOT_M1_004
Canonical email: pilot_m1_004_pilot_m1_004@bexauri.dev
Program: PAES_M1
Initial expected StudyLoad: PAES M1 - Entrada balanceada inicial
Expected first contentKey: paes_m1_balanced_entry_initial
Expected future continuity StudyLoad after future dry-run: PAES M1 - Ecuaciones lineales basicas
```

Identity policy:

* The participant is synthetic/control-only.
* The email is canonical lowercase.
* Admin and student identities were not mixed.
* No real sensitive student data was introduced.

## 6. Pre-Existing Data Check

Pre-existing data check was performed before creation for:

* `Student`
* `User`
* `Account`
* `StudentProgramInstance`
* `LearningCycle`
* `StudyLoad`
* `StudentAccess`
* `TutoringSession`
* `Response`
* `CycleDecision`
* `CycleEvaluation`
* `ContinuitySignal`

Pre-existing fixture result:

```text
No existing PILOT_M1_004 Student/User/Enrollment/Cycle/StudyLoad fixture was found.
No duplicate or partial PILOT_M1_004 fixture blocked creation.
```

Model interpretation:

* `CredentialsProvider` uses `User.email` plus `User.password`.
* `Account` is not required for the current credentials login flow.
* `Student` lookup for `/now` remains email-based.
* StudyLoad operational metadata such as `contentKey`, `contentVersion`, `programCode`, `sliceId`, `axis`, `primaryPurpose`, `evidenceType`, `reviewStatus`, `expertReviewed`, and `routingStatus` is registry/content metadata, not stored directly on the `StudyLoad` row in the current schema.

## 7. Fixture Preparation Performed

Fixture preparation result:

```text
RESULT: PREPARED_WITH_PRIVATE_CREDENTIAL_STEP_REQUIRED
```

Records prepared:

```text
Student: created
User: created
User password set: no
Account records: 0
Enrollment PAES_M1 active: created
Cycle 1 open: created
Initial StudyLoad pending: created
```

Initial StudyLoad:

```text
Title: PAES M1 - Entrada balanceada inicial
Type: practice
Status: pending
Content key: paes_m1_balanced_entry_initial
Content version: v1
Program code: PAES_M1
Slice id: BALANCED_ENTRY
Axis: balanced_entry
Primary purpose: diagnose
Evidence type: mc_submission
Review status: internal_provisional
Expert reviewed: false
Routing status: available_not_universal
```

Fixture boundary:

* No credential was set.
* No `Account` row was created because the current credentials flow does not require it.
* No `StudentAccess` row was created.
* No second StudyLoad was created.
* No Cycle 2 was created.
* No prior pilot participants were targeted or modified.

## 8. Post-Fixture Verification

Post-fixture verification:

```text
Student exists exactly once for the canonical email: yes
User exists exactly once for the canonical email: yes
Enrollment PAES_M1 active exists exactly once: yes
Cycle 1 open exists exactly once: yes
Initial StudyLoad pending exists exactly once: yes
Tutoring sessions: 0
Responses: 0
Cycle decisions: 0
Cycle evaluations: 0
Continuity signals: 0
Total cycles for participant: 1
Total StudyLoads for Cycle 1: 1
Second StudyLoad created: no
Cycle 2 created: no
Other participants touched: no
Staging/production touched: no
```

No student login, `/now` visit, activity start, answer submission, self-report, second load start, cycle close, decision, or evaluation was executed.

## 9. StudentAccess Observation

StudentAccess observation:

```text
StudentAccess row: missing
```

Interpretation:

* Missing `StudentAccess` is not a blocker for this local/dev fixture preparation.
* The row was intentionally not created because HARDENING-3 did not authorize StudentAccess lifecycle mutation.
* This remains lifecycle debt before public Sales-Ready or self-serve access claims.

## 10. Credential Boundary

Credential boundary:

```text
No password was set in this phase.
No password, hash, token, cookie, header, env value, DB URL, provider value, storage value, request body, or response body was printed.
```

Implication:

* The fixture is ready for a separate private credential-readiness phase.
* Mauricio should perform any future password reset or private credential action in a separate explicitly authorized phase.
* A future student dry-run must not begin until credential readiness is documented.

## 11. Explicit Non-Actions

This phase did not:

* execute a student dry-run;
* login as the student;
* open `/now` as the student;
* start a StudyLoad;
* answer questions;
* submit responses;
* create a self-report;
* close an activity;
* start the second load;
* close a cycle;
* create `CycleDecision`;
* create `CycleEvaluation`;
* create `ContinuitySignal`;
* create `StudentAccess`;
* create `Account`;
* set a password;
* touch app code;
* touch schema;
* touch global seed;
* touch auth model;
* touch `CredentialsProvider`;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging/production;
* print secrets or sensitive values.

## 12. Risks / Debts

Remaining risks and debts:

* `STUDENT_ACCESS_LIFECYCLE_DEBT`: still present; `PILOT_M1_004` has no StudentAccess row after this phase.
* `AUTH_EMAIL_NORMALIZATION_DEBT`: not changed; canonical lowercase email was used.
* `PLAYWRIGHT_LOGIN_E2E_DEBT`: not closed; no student login automation was added.
* `CODEX_BROWSER_UI_AVAILABILITY_LIMITATION`: still relevant for future human-guided UI runs.
* `SIGNOUT_UI_DEBT`: functionally mitigated by SIGNOUT-1R but still watch for UX/polish during future runs.
* `ADMIN_UI_TITLE_VISIBILITY_DEBT`: not closed by fixture prep.
* Credential readiness is intentionally pending.
* The future dry-run must verify that the StudyLoad renders and that continuity creates the second load automatically after completion.

No new blocker was observed for a private credential-readiness phase.

## 13. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-HARDENING-4 - Complete private credential readiness for PILOT_M1_004
```

Recommended scope:

* Keep it separate from student dry-run execution.
* Use private/human credential handling only.
* Do not print password, hash, token, cookie, header, env value, DB URL, provider value, storage value, request body, or response body.
* Confirm that `PILOT_M1_004` can be used in a future controlled dry-run without starting that dry-run.

## 14. Final Result

Final result:

```text
PREPARED_WITH_PRIVATE_CREDENTIAL_STEP_REQUIRED
```

Final verdict:

* The controlled local/dev fixture for `PILOT_M1_004` was prepared.
* The fixture contains the minimal expected synthetic participant, user shell, active PAES_M1 enrollment, open Cycle 1, and one pending initial StudyLoad.
* The phase stayed within local/dev fixture preparation boundaries.
* The next phase should complete private credential readiness before any student dry-run.

## Result Marker

```text
MVP_SALES_PILOT_HARDENING_3_PREPARED_WITH_PRIVATE_CREDENTIAL_STEP_REQUIRED
```
