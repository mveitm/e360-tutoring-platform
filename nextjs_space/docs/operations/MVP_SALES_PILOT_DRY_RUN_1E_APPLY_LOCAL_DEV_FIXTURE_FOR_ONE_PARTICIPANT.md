# MVP-SALES-PILOT-DRY-RUN-1E - Apply local/dev fixture for one participant

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-1E - Execute local/dev fixture setup apply mode for one participant
```

Type:

```text
Guarded local/dev fixture setup attempt / helper implementation / blocked before fixture creation.
```

Mission:

Implement and run a tightly guarded `apply` mode for exactly one synthetic participant:

```text
PILOT_M1_001
```

The intended setup chain was:

```text
synthetic account/student -> access source-of-truth placeholder -> PAES_M1 enrollment -> open LearningCycle -> pending StudyLoad
```

This phase did not execute `/now`, did not run browser/runtime, did not start a StudyLoad, did not submit responses, did not complete a StudyLoad, and did not inspect admin evidence in runtime.

## 2. Baseline and Context Gate summary

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = 2b95b66
```

Latest accepted commit:

```text
2b95b66 - MVP-SALES-PILOT-DRY-RUN-1D: verify fixture plan mode
```

Context Gate summary:

* `PHASE_LOG.md` was read through DRY-RUN-1D.
* Active context, roadmap, phase gate, external audit redirect, pilot scope, access boundary, access source-of-truth, access template, `/now` audit/design, DRY-RUN-0 plan, DRY-RUN-1A blocker, DRY-RUN-1B target confirmation protocol, DRY-RUN-1C fixture preparation, and DRY-RUN-1D plan-mode verification were read.
* Beta scope/target, Block 7 anchor, compact reporting rule, and Codex prompting standard were read.
* Read-only inspection covered the fixture helper, Prisma schema, package metadata, StudyLoad content registry, and `/now`.

No env files, raw env values, database URLs, tokens, passwords, cookies, headers, provider panels, backups, browser/runtime, Prisma CLI, SQL, migrations, seed, reset, studio, generate, staging, or production were used.

## 3. Operator confirmation used

Non-secret confirmation used for this phase:

```text
LOCAL/DEV TARGET CONFIRMATION - NON-SECRET

I confirm:
- I am in the local repo path:
  C:\projects\e360-tutoring-platform\tutoring_platform_mvp
- I am on the expected Git baseline.
- The terminal/session I will use is configured for local/dev only.
- I will not use production or staging.
- I will not paste or print DATABASE_URL, PROD_DATABASE_URL, env values, tokens, passwords, cookies, headers, or connection strings.
- Any fixture data used will be synthetic and participant-coded only.
- No real student data will be used.
- This phase is allowed to update the helper script and run apply mode only for PILOT_M1_001.
- This phase is not allowed to run browser/runtime, start StudyLoads, submit responses, complete StudyLoads, or touch staging/production.

Target class:
LOCAL_DEV_CONFIRMED
```

This confirmation authorized only guarded local/dev fixture setup for one synthetic participant. It did not authorize staging, production, browser/runtime, StudyLoad execution, payment, trial, product approval, or Sales-Ready approval.

## 4. Helper changes summary

Updated helper:

```text
nextjs_space/scripts/m1-pilot-dry-run-fixture.ts
```

Changes:

* Preserved non-mutating `help` and `plan` modes.
* Added `--participant-code` parsing.
* Added `--confirm-local-dev-mutation`.
* Added guarded `apply` mode restricted to `PILOT_M1_001`.
* Added lazy Prisma Client import inside guarded apply logic only.
* Added registry content resolution before DB mutation.
* Added idempotent create-or-locate logic for:
  * User/account;
  * Student;
  * StudentAccess safe no-access placeholder;
  * PAES_M1 Program;
  * active PAES_M1 enrollment;
  * open LearningCycle;
  * pending candidate StudyLoad.
* Added collision checks for synthetic email/student collisions and unsafe existing access/enrollment/load states.
* Added transaction usage for the fixture chain.
* Added redacted apply error handling to avoid printing target or secret-derived material in future failures.

The helper still does not import Prisma at top level.

## 5. Commands run

Non-mutating checks:

```powershell
cd nextjs_space
.\node_modules\.bin\tsx.cmd scripts/m1-pilot-dry-run-fixture.ts --mode help
.\node_modules\.bin\tsx.cmd scripts/m1-pilot-dry-run-fixture.ts --mode plan --run-id 20260527T000000-local --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging
cd ..
```

Apply attempt for one participant:

```powershell
cd nextjs_space
.\node_modules\.bin\tsx.cmd scripts/m1-pilot-dry-run-fixture.ts --mode apply --run-id 20260527T000000-local --target-class LOCAL_DEV_CONFIRMED --participant-code PILOT_M1_001 --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-local-dev-mutation
cd ..
```

No `dry-run`, `cleanup`, browser/runtime, Prisma CLI, SQL, migration, seed, reset, staging, or production command was run.

## 6. Target confirmation result

Target class used:

```text
LOCAL_DEV_CONFIRMED
```

The helper accepted the non-secret target class and required confirmation flags.

However, the apply attempt was blocked by database reachability before fixture setup completed.

## 7. Apply result

Apply result:

```text
BLOCKED_BEFORE_FIXTURE_CREATION
```

Participant:

```text
PILOT_M1_001
```

Fixture label:

```text
PILOT_M1_DRY_RUN_LOCAL_DEV_20260527T000000-local
```

Candidate StudyLoad:

```text
title: PAES M1 - Entrada balanceada inicial
registry title: PAES M1 — Entrada balanceada inicial
contentKey: paes_m1_balanced_entry_initial
```

Record categories intended:

* User/account;
* Student;
* StudentAccess safe no-access placeholder;
* PAES_M1 Program;
* active PAES_M1 enrollment;
* open LearningCycle;
* pending candidate StudyLoad.

Created/located record categories:

```text
none confirmed
```

Reason:

The database connection failed before the transaction could complete. No fixture chain was confirmed as created or located.

## 8. Data mutation summary

Data mutation summary:

```text
LOCAL_DEV_FIXTURE_MUTATION_ATTEMPTED_BUT_BLOCKED
```

No successful fixture data creation was confirmed.

Because the connection failed before setup, no User, Student, StudentAccess, Program, Enrollment, LearningCycle, StudyLoad, Session, or Response fixture record is reported as created.

No local scratch IDs, private register instance, screenshots, logs, raw target details, connection strings, or real student data were committed.

## 9. What was not executed

This phase did not execute:

* browser/runtime/dev server;
* `/now`;
* StudyLoad start;
* activity viewer;
* response submission;
* completion/self-report;
* admin evidence runtime review;
* `dry-run`;
* cleanup;
* staging;
* production;
* payment;
* trial;
* pilot execution.

## 10. Safety checks

Safety checks preserved:

* no env files inspected;
* no raw env values printed;
* no database URLs printed in the phase report or committed docs;
* no connection strings committed;
* no real student data used or committed;
* only synthetic `.example.invalid` participant identity used;
* only participant `PILOT_M1_001` targeted;
* no `PILOT_M1_002` or `PILOT_M1_003` fixture setup attempted;
* no payment activated;
* no public trial activated;
* no subscription state created;
* no PAES_L1 readiness declared;
* no PAES_M2 readiness declared;
* no Sales-Ready declared.

Note:

The first apply attempt surfaced a Prisma database reachability message. The helper was updated afterward to redact target/secret-derived details from future apply failures.

## 11. Cleanup/isolation status

Cleanup/isolation status:

```text
NO_CONFIRMED_FIXTURE_DATA_CREATED_NO_CLEANUP_PERFORMED
```

No cleanup was run because no successful fixture creation was confirmed and no cleanup mode was authorized.

## 12. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-1F - Fix fixture setup blocker
```

Purpose:

Resolve local/dev database reachability or target availability without printing secrets, inspecting env values, running Prisma CLI, or touching staging/production unless a future prompt explicitly changes scope.

Before retrying apply, the next phase should keep:

* non-secret `LOCAL_DEV_CONFIRMED` confirmation;
* no raw env/DB URL printing;
* no staging/prod;
* one-participant scope;
* redacted helper errors;
* explicit rollback/cleanup expectations if any fixture data is ever created.

## 13. Non-goals

This phase does not:

* touch production;
* touch staging;
* deploy;
* run browser/runtime/dev server;
* open `/now`;
* execute StudyLoad start;
* submit responses;
* complete a StudyLoad;
* inspect runtime admin evidence;
* use real student data;
* use real names, real emails, phone numbers, RUTs, payment records, consent records, support notes, credentials, or private notes;
* commit local scratch IDs, private register instances, screenshots, logs, or private data;
* inspect `.env`, raw env values, database URLs, tokens, passwords, cookies, headers, backups, provider panels, or credentials;
* run Prisma CLI;
* run SQL;
* run migrations, db push, db pull, seed, reset, studio, or generate;
* run destructive reset;
* create fixtures for `PILOT_M1_002` or `PILOT_M1_003`;
* activate payment;
* activate public trial;
* create subscription state;
* approve student/product use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute a real pilot.

## 14. Result marker

```text
MVP_SALES_PILOT_DRY_RUN_1E_FIXTURE_APPLY_BLOCKED
```
