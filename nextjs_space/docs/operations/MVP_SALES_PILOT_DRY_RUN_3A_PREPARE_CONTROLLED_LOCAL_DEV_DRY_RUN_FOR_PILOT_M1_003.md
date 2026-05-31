# MVP-SALES-PILOT-DRY-RUN-3A - Prepare controlled local/dev dry-run fixture for PILOT_M1_003

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-3A - Prepare controlled local/dev dry-run fixture for PILOT_M1_003
```

Type:

```text
Controlled local/dev fixture preparation / no student dry-run / no app code change.
```

Baseline confirmed by Git preflight:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = 246c08c
```

Latest accepted commit:

```text
246c08c - MVP-SALES-PILOT-GO-2: evaluate readiness after PILOT_M1_002 evidence
```

Required phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

Git preflight is the live truth for this phase.

## 2. Objective

Prepare the integrated local/dev fixture for synthetic participant `PILOT_M1_003` so it can proceed to a later controlled student dry-run after the private credential step is completed by Mauricio.

This phase does not execute the dry-run, student login, `/now`, activity, StudyLoad start/completion, responses, evidence, self-report, admin evidence, or product/auth/schema changes.

## 3. Roadmap Context

Roadmap block:

```text
10 - Internal pilot and sales-ready go/no-go
```

GO-2 authorized controlled local/dev `PILOT_M1_003` preparation with recorded debt. This remains M1-first as a tactical first vertical and does not reduce MVP-Beta cerrado scope, which remains M1/M2/L1.

## 4. GO-2 Inherited Decision

GO-2 result:

```text
GO_WITH_RECORDED_DEBT_TO_PILOT_M1_003_PREP
```

Inherited evidence:

* `PILOT_M1_001` student dry-run passed and admin evidence was functionally satisfied with title-visibility debt.
* `PILOT_M1_002` fixture/readiness completed, auth/account linkage repaired, student dry-run passed, and admin evidence was fully confirmed.

Inherited debts:

* `ADMIN_UI_TITLE_VISIBILITY_DEBT`.
* `AUTH_EMAIL_NORMALIZATION_DEBT`.
* `SIGNOUT_UI_DEBT`.
* `CODEX_BROWSER_UI_AVAILABILITY_LIMITATION`.
* `STUDENT_ACCESS_LIFECYCLE_DEBT_FOR_PILOT_M1_002`.
* `PLAYWRIGHT_LOGIN_E2E_DEBT`.

No inherited debt was classified as a blocker for controlled local/dev `PILOT_M1_003` preparation.

## 5. Lessons From PILOT_M1_002

Applied lessons:

* Use lowercase email from the beginning.
* Avoid mixed-case Student/User linkage.
* Do not execute the student dry-run inside readiness setup.
* Do not create response evidence, self-report, CycleDecision, or CycleEvaluation.
* Keep private credential handling outside Codex.
* Use human-guided execution later if authenticated browser/UI control remains unavailable.

## 6. Canonical Identity Selection

Canonical identity:

```text
participantCode: PILOT_M1_003
display: PILOT_M1_003 PILOT_M1_003
email: pilot_m1_003_pilot_m1_003@bexauri.dev
```

Selection result:

```text
CANONICAL_LOWERCASE_IDENTITY_SELECTED
```

Duplicate handling:

* The temporary setup script checked for `PILOT_M1_003` Student/User ambiguity before mutation.
* No duplicate/noncanonical candidate was reported.
* No real record was touched.
* `PILOT_M1_001` and `PILOT_M1_002` were not touched.

## 7. Setup Method

Setup method:

```text
TEMPORARY_GUARDED_LOCAL_DEV_PRISMA_CLIENT_SCRIPT
```

Reason:

* Codex did not have authenticated local/dev admin UI control.
* UI execution was not simulated.
* The phase allowed a temporary local/dev Prisma Client script when UI/API was insufficient.

Guardrails:

* target only `PILOT_M1_003`;
* use lowercase canonical email;
* no SQL;
* no Prisma CLI;
* no direct DB inspection outside the guarded script;
* no secrets printed;
* no env values or DB URL printed;
* no password or hash handled;
* no StudentAccess mutation;
* no app/schema/auth code change;
* temporary script removed before commit.

## 8. Local/Dev Mutations Performed

Authorized local/dev mutations performed for `PILOT_M1_003`:

```text
Student created
User/account created without password
PAES_M1 enrollment created
Cycle 1 open created
initial pending StudyLoad created
```

Safe setup output:

```text
RESULT: prepared
participantCode: PILOT_M1_003
canonicalEmail: pilot_m1_003_pilot_m1_003@bexauri.dev
studentCreated: true
userCreated: true
userHasPassword: false
credentialStatus: human_private_step_required
enrollmentStatus: active
cycle1Status: open
studyLoadCount: 1
initialStudyLoadTitle: PAES M1 — Entrada balanceada inicial
initialStudyLoadStatus: pending
initialStudyLoadType: practice
contentKey: paes_m1_balanced_entry_initial
contentVersion: v1
programCode: PAES_M1
decisionCount: 0
evaluationCount: 0
NO SECRET VALUES PRINTED
```

## 9. Credential/Account Status

Account status:

```text
USER_ACCOUNT_CREATED_WITH_LOWERCASE_EMAIL
```

Credential status:

```text
HUMAN_PRIVATE_CREDENTIAL_STEP_REQUIRED
```

The User/account exists and uses the canonical lowercase email. No password was created, received, printed, hashed, or stored by Codex.

Required human action before student dry-run:

```text
Mauricio must set/reset the private local/dev password for pilot_m1_003_pilot_m1_003@bexauri.dev through the existing admin UI account/password path, without sharing the secret with Codex or committing it.
```

After the action, Mauricio should confirm only:

```text
PASSWORD_READY_WITHOUT_SECRET_PRINTED
```

## 10. Enrollment Verification

Enrollment verification:

```text
PAES_M1_ENROLLMENT_ACTIVE
```

Observed safe state:

* PAES_M1 enrollment exists.
* Enrollment status is active.
* No non-M1 active enrollment was reported.

This does not activate L1 or M2.

## 11. Cycle Verification

Cycle verification:

```text
CYCLE_1_OPEN
```

Observed safe state:

* Cycle 1 exists.
* Cycle 1 status is open.
* Decision count is `0`.
* Evaluation count is `0`.

No CycleDecision or CycleEvaluation was created.

## 12. StudyLoad Verification

StudyLoad verification:

```text
FIRST_STUDYLOAD_PENDING_CONFIRMED
```

Observed safe state:

```text
title: PAES M1 — Entrada balanceada inicial
loadType: practice
status: pending
contentKey: paes_m1_balanced_entry_initial
contentVersion: v1
programCode: PAES_M1
```

The StudyLoad is consistent with the expected registry-backed initial M1 activity.

No StudyLoad was opened, started, completed, or answered.

## 13. Remaining Debts

Remaining debts:

* `HUMAN_PRIVATE_CREDENTIAL_STEP_REQUIRED` for `PILOT_M1_003`.
* `ADMIN_UI_TITLE_VISIBILITY_DEBT`.
* `AUTH_EMAIL_NORMALIZATION_DEBT`, mitigated for this participant by lowercase email from the start.
* `SIGNOUT_UI_DEBT`.
* `CODEX_BROWSER_UI_AVAILABILITY_LIMITATION`.
* `PLAYWRIGHT_LOGIN_E2E_DEBT`.
* StudentAccess lifecycle remains untouched in this phase.

## 14. Result Classification

Result:

```text
READY_WITH_HUMAN_CREDENTIAL_STEP_REQUIRED
```

Rationale:

* canonical `PILOT_M1_003` exists;
* canonical email is lowercase;
* User/account linkage exists with the same lowercase email;
* PAES_M1 enrollment is active;
* Cycle 1 is open;
* first StudyLoad is pending and registry-consistent;
* no duplicate ambiguity was reported;
* no L1/M2 active implication was created;
* no payment/trial/subscription was activated;
* no dry-run was executed;
* no secrets were printed;
* only missing step is the private password setup by Mauricio.

This phase cannot classify as `PILOT_M1_003_READY_FOR_STUDENT_DRY_RUN` until the private credential step is completed.

## 15. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-3B - Complete private credential readiness for PILOT_M1_003
```

Recommended scope:

* Mauricio sets/resets the private local/dev password through admin UI.
* No password, hash, token, cookie, header, env value, DB URL, request body, or response body is shared.
* After private action, document only `PASSWORD_READY_WITHOUT_SECRET_PRINTED`.
* Do not execute the student dry-run until a separate 3C execution phase.

## 16. Explicit Non-actions

This phase did not:

* execute student dry-run;
* perform student login;
* open `/now` as student;
* open activity;
* start StudyLoad;
* complete StudyLoad;
* send responses;
* create evidence;
* create self-report;
* close cycle;
* authorize continuity;
* create CycleDecision;
* create CycleEvaluation;
* open or start second StudyLoad;
* touch staging;
* touch production;
* use real data;
* activate payment;
* activate trial;
* activate subscription;
* activate L1;
* activate M2;
* declare Sales-Ready;
* declare MVP-Beta cerrado complete;
* modify app code;
* modify schema;
* change auth;
* reopen Playwright login E2E;
* use SQL;
* run Prisma CLI;
* print secrets;
* print env values;
* print DB URL;
* print tokens;
* print cookies;
* print headers;
* print request bodies;
* print response bodies;
* print password;
* print hash;
* print provider or storage values;
* mutate StudentAccess;
* commit scripts;
* commit logs;
* commit screenshots.

## Result Marker

```text
MVP_SALES_PILOT_DRY_RUN_3A_READY_WITH_HUMAN_CREDENTIAL_STEP_REQUIRED
```
