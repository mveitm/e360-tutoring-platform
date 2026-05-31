# MVP-SALES-PILOT-DRY-RUN-2F - Repair PILOT_M1_002 auth/account linkage before student dry-run

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-2F - Repair PILOT_M1_002 auth/account linkage before student dry-run
```

Type:

```text
Controlled local/dev auth/account linkage repair / no student dry-run / no app code change.
```

Baseline confirmed by Git preflight:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = 7fb5809
```

Latest accepted commit:

```text
7fb5809 - MVP-SALES-PILOT-DRY-RUN-2D: complete PAES_M1 enrollment readiness for PILOT_M1_002
```

Required phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

Git preflight is the live truth for this phase.

## 2. Objective

Repair the local/dev auth/account linkage for the synthetic `PILOT_M1_002` fixture so the student login path and admin account-management path point to the same canonical User.

This phase exists only to unblock a later continuation of `MVP-SALES-PILOT-DRY-RUN-2E`. It does not execute the student dry-run.

## 3. Roadmap Context

Roadmap block:

```text
10 - Internal pilot and sales-ready go/no-go
```

This supports the controlled M1-first pilot repetition path. M1-first remains a tactical first vertical and does not reduce the closed MVP-Beta scope of M1/M2/L1.

## 4. 2E Pause Context

`MVP-SALES-PILOT-DRY-RUN-2E` was started but not executed or closed with a commit.

Human observation during the paused 2E attempt:

* student login failed with generic invalid-credentials feedback;
* password was reset twice from admin UI, but login still failed;
* `StudentAccess row: Missing` was visible in admin UI;
* no dry-run was executed;
* `/now` was not opened;
* no activity, StudyLoad start/completion, response evidence, or self-report occurred.

## 5. Auth/Account Linkage Diagnosis

Diagnosis result:

```text
AUTH_ACCOUNT_LINKAGE_DIAGNOSIS
```

Probable cause:

```text
Email normalization mismatch.
```

The admin account create/reset path used the Student email exactly as stored. The Credentials login path normalized submitted email with `trim().toLowerCase()` before resolving the User.

For the canonical record, this meant admin reset could update the exact-case User while login searched for the lowercase email.

`StudentAccess row: Missing` was not identified as the login blocker because Credentials login checks User/password and does not query StudentAccess.

## 6. Code Findings

Read-only code findings:

* `POST /api/students/[id]/create-user` resolves Student and then creates or checks User with exact `student.email`.
* `POST /api/students/[id]/reset-password` resolves Student and then finds User with exact `student.email`.
* CredentialsProvider authorization trims and lowercases the submitted email before `prisma.user.findUnique`.
* Admin student detail UI calls the same create-user and reset-password endpoints.
* Admin student detail UI exposes StudentAccess as read-only and explicitly warns that a missing StudentAccess row must not automatically be treated as no access.

No app code or auth code was changed in this phase.

## 7. Canonical Record Selection

Canonical record inherited from 2D:

```text
Name: PILOT_M1_002 PILOT_M1_002
Original visible email: PILOT_M1_002_PILOT_M1_002@bexauri.dev
Target normalized email: pilot_m1_002_pilot_m1_002@bexauri.dev
```

Reason for selection:

* it was the record selected in 2D;
* it had an existing account before the 2D enrollment action;
* it had active PAES_M1 enrollment after 2D;
* it had Cycle 1 open and the first pending M1 StudyLoad.

Any non-selected `PILOT_M1_002` related record was left untouched.

## 8. Repair Method

No existing UI/API path was available to rename the Student/User email pair without a global app-code change.

A temporary local/dev-only Prisma Client script was used with explicit guard flags. The script:

* targeted only the canonical synthetic `PILOT_M1_002` exact-case email;
* checked for normalized Student/User conflicts before mutation;
* updated only the canonical Student email and matching User email to the normalized value;
* did not print or handle a password value;
* did not print hashes, tokens, cookies, headers, env values, DB URL, provider values, request bodies, or response bodies;
* was removed before commit.

No SQL or Prisma CLI was used.

## 9. Local/Dev Mutations Performed

Authorized local/dev mutations performed:

```text
canonical PILOT_M1_002 Student email normalized
canonical PILOT_M1_002 User email normalized
```

Safe repair output:

```text
RESULT: repaired
exactStudentFoundBefore: true
normalizedStudentFoundBefore: false
exactUserFoundBefore: true
normalizedUserFoundBefore: false
userHasPassword: true
studentUpdated: true
userUpdated: true
targetEmailState: normalized_lowercase
NO SECRET VALUES PRINTED
```

No password was changed in this phase. No StudentAccess, enrollment, cycle, StudyLoad, evidence, self-report, decision, or evaluation record was touched.

## 10. Verification Performed

Verification performed:

* Git preflight confirmed expected baseline and clean working tree before phase work.
* Code inspection corroborated create/reset/login email mismatch.
* Temporary guarded script confirmed no normalized Student/User conflict before mutation.
* Temporary guarded script confirmed canonical Student/User were updated to normalized lowercase state.
* Temporary script was removed before commit.
* Final documentation verification was run with `git diff --check`, `git status --short`, and `git diff --stat`.

Student login was not attempted in 2F.

## 11. Result Classification

Result:

```text
AUTH_ACCOUNT_LINKAGE_REPAIRED_FOR_PILOT_M1_002
```

Rationale:

* canonical `PILOT_M1_002` was identified from 2D;
* mismatch cause was corroborated by code;
* local/dev Student/User auth linkage was aligned to the normalized login email;
* admin reset and Credentials login should now target the same User email;
* no StudentAccess was touched;
* no dry-run was executed;
* no secrets were printed;
* no staging/production, schema, app, or auth code change occurred;
* temporary script was removed.

## 12. Remaining Debts

Remaining debts:

* StudentAccess row remains missing and should be treated as a runtime/access lifecycle risk, not as this login blocker.
* Duplicate/candidate `PILOT_M1_002` ambiguity remains a cleanup/documentation debt; the canonical record remains the 2D-selected record.
* Playwright login E2E remains paused.
* `ADMIN_UI_TITLE_VISIBILITY_DEBT` remains from prior admin evidence phases.

## 13. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-2E-RESUME - Resume controlled local/dev student dry-run for PILOT_M1_002 after auth linkage repair
```

Recommended scope:

* local/dev only;
* use normalized login email for the canonical synthetic account;
* if password reset is needed, Mauricio performs it privately through admin UI without sharing the secret;
* execute student dry-run only under explicit 2E-resume scope;
* stop if StudentAccess missing blocks `/now` or runtime access, and document it as a separate blocker.

## 14. Explicit Non-actions

This phase did not:

* execute the student dry-run;
* perform student login;
* open `/now`;
* open activity;
* start StudyLoad;
* complete StudyLoad;
* submit responses;
* create evidence;
* create self-report;
* close cycle;
* authorize continuity;
* create CycleDecision;
* create CycleEvaluation;
* touch StudentAccess;
* touch enrollment;
* touch cycle;
* touch StudyLoad;
* touch staging;
* touch production;
* use real data;
* activate payment;
* activate trial;
* activate subscription;
* declare Sales-Ready;
* declare MVP-Beta cerrado complete;
* activate L1;
* activate M2;
* modify schema;
* change global auth;
* modify app code;
* reopen Playwright login E2E;
* use SQL;
* use Prisma CLI;
* print password;
* print hash;
* print DB URL;
* print env values;
* print provider targets;
* print tokens;
* print cookies;
* print headers;
* print request bodies;
* print response bodies;
* commit scripts;
* commit logs;
* commit screenshots.

## Result Marker

```text
MVP_SALES_PILOT_DRY_RUN_2F_AUTH_ACCOUNT_LINKAGE_REPAIRED_FOR_PILOT_M1_002
```
