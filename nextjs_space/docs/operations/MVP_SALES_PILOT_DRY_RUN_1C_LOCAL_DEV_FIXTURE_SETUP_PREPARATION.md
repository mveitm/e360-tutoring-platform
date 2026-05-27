# MVP-SALES-PILOT-DRY-RUN-1C - Local/dev fixture setup preparation

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-1C - Prepare local/dev fixture setup for M1 dry-run
```

Type:

```text
Documentation/readiness plus inert local helper script / no DB / no fixture creation / no runtime.
```

Mission:

Prepare the local/dev fixture setup path required for the controlled M1-first dry-run without creating fixture data, connecting to a database, running Prisma, inspecting environment values, or executing the pilot.

## 2. Baseline and Context Gate summary

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = 44b0fca
```

Latest accepted commit:

```text
44b0fca - MVP-SALES-PILOT-DRY-RUN-1B: define local target protocol
```

Context Gate summary:

* `PHASE_LOG.md` was read through the DRY-RUN-1B target confirmation protocol.
* Active context, roadmap, phase gate, external audit redirect, pilot scope, access boundary, access source-of-truth, access template, `/now` audit/design, DRY-RUN-0 plan, DRY-RUN-1A blocker, and DRY-RUN-1B protocol were read.
* Beta scope/target, Block 7 anchor, compact reporting rule, and Codex prompting standard were read.
* Focused documentation search covered `LOCAL_DEV_CONFIRMED`, local/dev, fixtures, dry-run, safe-seed, StudyLoad, the M1 balanced entry content key, StudentAccess, enrollments, LearningCycle, participant codes, and setup helper references.
* Read-only code inspection covered `schema.prisma`, the scripts directory, `safe-seed.ts`, `package.json`, `/now`, the StudyLoad activity page, StudyLoad start/responses/complete routes, StudyLoad content registry, and StudyLoad continuity.

No env files, raw env values, database URLs, secrets, DB commands, Prisma commands, SQL, browser/runtime, fixture writes, or app execution were used.

## 3. Starting point

DRY-RUN-1A safely stopped with:

```text
TARGET_CONFIRMATION_FAILED_SAFE_STOP
DRY_RUN_NO_GO
NO_GO_FIX_BLOCKERS
```

DRY-RUN-1B defined the safe non-secret target confirmation protocol:

```text
TARGET_CLASS=LOCAL_DEV_CONFIRMED
```

This phase prepares fixture setup without executing it. The first pilot remains:

```text
NARROWED_FIRST_VERTICAL_PILOT
PAES_M1 = PILOT_USABLE_WITH_LIMITS
PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT
PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT
Access/payment/trial = STAGED_NO_PAYMENT_THEN_PAYMENT_SANDBOX
Pilot mode = no-payment closed controlled lab first
```

## 4. Script/helper summary

Helper path:

```text
nextjs_space/scripts/m1-pilot-dry-run-fixture.ts
```

Supported modes implemented for this phase:

```text
--mode help
--mode plan
```

Future-gated modes defined but not executable in this phase:

```text
--mode dry-run
--mode apply
--mode cleanup
```

What was implemented:

* CLI argument parsing for `--mode`, `--run-id`, `--target-class`, and confirmation flags.
* Participant code definitions:
  * `PILOT_M1_001`
  * `PILOT_M1_002`
  * `PILOT_M1_003`
* Synthetic placeholder emails:
  * `pilot.m1.001@example.invalid`
  * `pilot.m1.002@example.invalid`
  * `pilot.m1.003@example.invalid`
* Fixture label pattern:

```text
PILOT_M1_DRY_RUN_LOCAL_DEV_<runId>
```

* Candidate StudyLoad definition:

```text
title: PAES M1 - Entrada balanceada inicial
registry title: PAES M1 — Entrada balanceada inicial
contentKey: paes_m1_balanced_entry_initial
```

* Conceptual fixture chain:
  * User/account;
  * Student;
  * access source-of-truth status;
  * PAES_M1 enrollment;
  * open LearningCycle;
  * pending StudyLoad;
  * start/session;
  * response;
  * completion/self-report;
  * admin evidence.

What remains future-gated:

* DB target confirmation beyond operator-provided non-secret class.
* Any DB connection.
* Any row creation.
* Any dry-run/apply/cleanup implementation that mutates data.
* Any runtime or browser execution.
* Any private register instance update.

## 5. Safety model

Safety properties:

* `help` and `plan` do not import Prisma.
* `help` and `plan` do not connect to DB.
* `help` and `plan` do not inspect `.env` or raw environment values.
* `help` and `plan` do not print secrets.
* `help` and `plan` do not create data.
* The helper does not write files.
* The helper contains no real names, real emails, RUTs, phones, payment evidence, consent records, support notes, credentials, or private student data.
* Future DB modes require:

```text
--target-class LOCAL_DEV_CONFIRMED
--run-id <synthetic-run-id>
--confirm-no-real-data
--confirm-no-production
--confirm-no-staging
```

* Future DB modes still exit as future-gated in this phase.
* No production or staging operation is authorized.

The helper prints the following safety banner in non-DB modes:

```text
NO DB CONNECTION ATTEMPTED
NO DATA MUTATED
NO REAL STUDENT DATA
```

## 6. Planned fixture model

Participants:

```text
PILOT_M1_001
PILOT_M1_002
PILOT_M1_003
```

Fixture label:

```text
PILOT_M1_DRY_RUN_LOCAL_DEV_<runId>
```

Candidate StudyLoad:

```text
title: PAES M1 - Entrada balanceada inicial
registry title: PAES M1 — Entrada balanceada inicial
contentKey: paes_m1_balanced_entry_initial
programCode: PAES_M1
loadType: practice
initialStatus: pending
```

Conceptual entity chain:

```text
User/account -> Student -> access source-of-truth status -> PAES_M1 enrollment -> open LearningCycle -> pending StudyLoad -> start/session -> response -> completion/self-report -> admin evidence
```

Relationship to access register:

* The repo-visible helper uses only participant codes and synthetic placeholders.
* The real access register instance remains private and non-committed.
* Future execution should update private `accountStatus`, `nowStatus`, `firstStudyLoadStatus`, `evidenceStatus`, `adminReviewStatus`, `supportStatus`, and `goNoGoStatus` from observed evidence, not from memory.
* The helper does not replace the access register or create a real register instance.

## 7. Validation performed

Required validation for this phase:

* `git diff --check`.
* `git status --short`.
* `git diff --stat`.
* Safe helper validation in non-DB modes:

```powershell
cd nextjs_space
.\node_modules\.bin\tsx.cmd scripts/m1-pilot-dry-run-fixture.ts --mode help
.\node_modules\.bin\tsx.cmd scripts/m1-pilot-dry-run-fixture.ts --mode plan --run-id 20260527T000000-local --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging
cd ..
```

Expected result:

* help/plan print only non-secret planned structure;
* no DB connection;
* no env inspection;
* no data mutation;
* no runtime/browser;
* no fixture data.

Build is optional. If run, it remains a code validation only and does not authorize runtime, DB, Prisma, or fixture creation.

## 8. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-1D - Run local/dev fixture setup plan mode with operator confirmation
```

Reason:

Use one more narrow phase to verify the helper with the non-secret confirmation block before any DB-affecting mode. The next phase should exercise only plan/help plus the operator confirmation template unless Mauricio explicitly authorizes a broader fixture setup execution path.

## 9. Non-goals

This phase does not:

* execute fixture creation;
* connect to DB;
* run Prisma CLI;
* run SQL;
* run migrations, db push, db pull, seed, reset, studio, or generate;
* create users;
* create students;
* create StudentAccess rows;
* create enrollments;
* create LearningCycles;
* create StudyLoad rows;
* create sessions;
* create responses;
* run browser/runtime/dev server;
* touch staging or production;
* inspect `.env`, `.env.local`, raw env values, database URLs, tokens, passwords, cookies, headers, backups, or credentials;
* print secrets or partial connection strings;
* commit real student data;
* activate payment;
* activate public trial;
* approve student/product use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute the pilot.

## 10. Result marker

```text
MVP_SALES_PILOT_DRY_RUN_1C_FIXTURE_SETUP_PREPARED
```
