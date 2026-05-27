# MVP-SALES-PILOT-DRY-RUN-1B - Safe local/dev target confirmation and fixture setup protocol

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-1B - Establish safe local/dev target confirmation and fixture setup protocol
```

Type:

```text
Documentation/protocol/readiness only.
```

Mission:

Define a safe, non-secret target-confirmation and fixture-setup protocol so a future controlled local/dev M1-first dry-run can proceed without inspecting or printing forbidden environment, database, credential, or provider material.

This phase does not execute the dry-run, run runtime, run Prisma, run SQL, run DB commands, create fixtures, inspect `.env`, inspect raw environment values, print database URLs, touch staging or production, or approve student/product/Sales-Ready use.

## 2. Baseline and Context Gate summary

Baseline expected and matched by preflight:

```text
HEAD = origin/main = origin/HEAD = f2c63d7
```

Latest accepted commit:

```text
f2c63d7 - MVP-SALES-PILOT-DRY-RUN-1A: execute local M1 dry-run
```

Context Gate summary:

* `PHASE_LOG.md` tail was read through the DRY-RUN-1A blocker.
* Active context, roadmap, phase gate protocol, external audit redirect, pilot scope, access boundary, access source-of-truth, access template, `/now` audit/design, dry-run plan, and DRY-RUN-1A result were read.
* Sales-ready beta target/scope, Block 7 anchor, compact reporting rule, and Codex prompting standard were read.
* Focused documentation search covered target confirmation, local/dev, no-secret policy, fixture setup, safe seed, DB application, Prisma, staging/production, runtime target, and prior blocker terms.
* Read-only inspection covered `schema.prisma`, the scripts directory, `safe-seed.ts`, `package.json`, `/now`, `study-load-content.ts`, and `study-load-continuity.ts`.
* No env files, raw env values, database URLs, secrets, DB commands, Prisma commands, SQL, browser/runtime, or fixture writes were used.

## 3. Blocker summary from DRY-RUN-1A

DRY-RUN-1A ended with:

```text
TARGET_CONFIRMATION_FAILED_SAFE_STOP
DRY_RUN_NO_GO
NO_GO_FIX_BLOCKERS
```

The safe stop was correct. The phase required live confirmation that any runtime or DB-affecting action would target local/dev only. The allowed methods did not permit inspecting `.env`, raw environment values, database URLs, credentials, tokens, cookies, headers, backups, or provider secret panels. Historical non-secret local/dev confirmations were useful context, but they were not enough to prove the current terminal/session runtime and database target.

Therefore the dry-run correctly stopped before browser/runtime, Prisma, SQL, DB mutation, fixture creation, participant execution, staging, or production contact.

## 4. Goal of this protocol

Goal:

```text
Enable future DRY-RUN-1C/1A-retry to confirm local/dev safely and prepare fixture setup without printing or inspecting secrets.
```

The protocol must let a future execution phase proceed from explicit non-secret operator confirmation plus narrow fixture setup rules, instead of requiring Codex to read or print forbidden target material.

## 5. Safe target confirmation principles

Safe target confirmation must preserve:

* no raw env values;
* no raw `DATABASE_URL`;
* no raw `PROD_DATABASE_URL`;
* no connection string fragments;
* no credentials;
* no tokens, cookies, headers, or passwords;
* no screenshots of env panels;
* no DB admin screenshots with secrets;
* no production or staging mutation;
* no provider secret copying into chat or docs;
* local/dev confirmation through non-secret signals and explicit operator confirmation.

Database access, if authorized in a later phase, may be used by app/tooling only after target confirmation. The tooling must not echo connection strings, host fragments, credentials, secret-derived metadata, or raw provider values.

## 6. Allowed target confirmation methods

Allowed non-secret methods:

* Git branch and baseline confirmation.
* Working tree cleanliness confirmation.
* Local repository path confirmation:

```text
C:\projects\e360-tutoring-platform\tutoring_platform_mvp
```

* App root confirmation:

```text
nextjs_space
```

* Operator statement: "I confirm this terminal is configured for local/dev only."
* Operator statement: "I confirm this is not production or staging."
* Non-secret target class label typed by the operator, not derived from printing env:

```text
TARGET_CLASS=LOCAL_DEV_CONFIRMED
```

* Optional future helper that reports only pass/fail target class and never prints secret values.
* Local-only URL confirmation such as:

```text
http://localhost:3000
```

* Future app/tooling DB access only after confirmation, with no echoed connection metadata.

Historical non-secret target labels from prior phases may be cited only as context. They do not replace current-session operator confirmation.

## 7. Forbidden target confirmation methods

Forbidden methods:

* printing `.env`;
* printing `.env.local`;
* printing `.env.production`;
* printing `DATABASE_URL`;
* printing `PROD_DATABASE_URL`;
* echoing environment variables;
* showing Vercel, Neon, or other provider secret values;
* copying connection strings;
* inspecting production/staging provider settings in chat;
* using raw DB host/project names if they reveal target, credentials, or secret-derived information;
* running broad database introspection just to prove target;
* running Prisma/SQL/DB connection checks in this protocol phase;
* proceeding on ambiguous target signals.

If a future phase cannot confirm local/dev without violating these boundaries, it must stop with a target-confirmation blocker.

## 8. Required human/operator confirmation block for future execution

Before any future local/dev dry-run execution or fixture setup, Mauricio can paste this non-secret confirmation block:

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

Target class:
LOCAL_DEV_CONFIRMED
```

This is a future operator confirmation template. It contains no real secret values and must not be expanded with raw env, provider, credential, database, token, cookie, header, or connection-string material.

## 9. Fixture setup protocol for future execution

Future setup hierarchy:

1. Prefer existing controlled local/dev fixture accounts if they are already safe, synthetic, and clearly not real student data.
2. Prefer app UI/API flows where possible.
3. If needed, use a narrow local/dev-only setup helper/script in a separate authorized phase.
4. Avoid direct manual DB editing as normal workflow.
5. If setup requires secrets, ambiguous target material, broad DB mutation, destructive reset, or real student data, stop.

The current broad `safe-seed.ts` pattern is a safety precedent, not the preferred pilot fixture path. It delegates to a broad seed after checking for delete operations, so it is not narrow enough for controlled M1 pilot fixture setup without a separate review and authorization.

## 10. Fixture labels and synthetic participant model

Participant codes:

```text
PILOT_M1_001
PILOT_M1_002
PILOT_M1_003
```

Suggested fixture label:

```text
PILOT_M1_DRY_RUN_LOCAL_DEV_<runId>
```

Rules:

* Use participant codes in committed documentation.
* Use synthetic fixture emails only if a future execution phase explicitly authorizes account creation.
* Never commit real names, real emails, phone numbers, RUTs, payment evidence, consent files, support notes, credentials, or private student data.
* Local scratch IDs or run records, if a future helper creates them, must remain private and non-committed.

## 11. Minimum fixture data needed for future execution

Future execution needs these data records or equivalent app surfaces for each participant, without creating them in this phase:

* User/account.
* Student.
* Access register/source-of-truth status.
* PAES_M1 program/enrollment.
* Open LearningCycle.
* Pending StudyLoad:

```text
title: PAES M1 - Entrada balanceada inicial
registry title: PAES M1 — Entrada balanceada inicial
contentKey: paes_m1_balanced_entry_initial
```

* StudyLoad start capability.
* MC response capability.
* Completion/self-report capability.
* Admin/tutor evidence surface.

Read-only inspection confirms the schema contains the required relation chain and the app contains registry/continuity paths for the candidate content. It does not prove fixture rows exist or authorize their creation.

## 12. Future execution modes

Recommended future execution sequence:

```text
DRY_RUN_1C_PREPARE_FIXTURES_ONLY
DRY_RUN_1D_EXECUTE_ONE_PARTICIPANT
DRY_RUN_1E_REPEAT_FOR_3_PARTICIPANTS
```

Meaning:

* `DRY_RUN_1C_PREPARE_FIXTURES_ONLY`: lock the exact local/dev fixture setup path, helper/script shape if needed, labels, collision checks, cleanup/isolation policy, and non-secret target-confirmation entry criteria. It may implement a helper only if separately authorized; it should not execute participant flow unless explicitly scoped.
* `DRY_RUN_1D_EXECUTE_ONE_PARTICIPANT`: after target confirmation and fixture readiness, execute one synthetic participant path end-to-end.
* `DRY_RUN_1E_REPEAT_FOR_3_PARTICIPANTS`: repeat the verified path for all three participant codes only after the one-participant path is safe.

This staged path is safer than immediately retrying DRY-RUN-1A because target confirmation and fixture setup were the blockers, not `/now` copy or StudyLoad registry readiness.

## 13. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-1C - Prepare local/dev fixture setup for M1 dry-run
```

Rationale:

The project should not immediately retry execution until the fixture setup path is explicit, safe, and governed by the same no-secret/local-dev constraints. DRY-RUN-1C should decide whether the setup can use existing fixture data, app UI/API flows, or a narrowly scoped local/dev helper, without using real student data or production/staging targets.

## 14. Stop rules for future execution

Stop future execution if:

* operator confirmation block is absent;
* baseline mismatch;
* working tree is dirty;
* target class is not explicitly `LOCAL_DEV_CONFIRMED`;
* any env/secret print would be required;
* any production or staging signal appears;
* fixture data would require real student data;
* fixture setup requires broad DB mutation;
* fixture setup requires destructive reset;
* fixture setup requires migration, db push, db pull, reset, seed, studio, or generate unless a future phase explicitly authorizes that exact command;
* StudyLoad candidate cannot be safely prepared;
* direct DB editing becomes the normal operating workflow;
* payment, public trial, product approval, PAES_L1 readiness, PAES_M2 readiness, or Sales-Ready claims appear.

## 15. Roadmap impact

This phase keeps the vertical pilot path alive while respecting the no-secret and no-production rules.

The first closed M1-first pilot remains narrowed, no-payment, controlled, and not Sales-Ready. The next useful work is fixture setup readiness for a local/dev dry-run, not public trial/payment activation, staging/prod mutation, full triad activation, or L1/M2 readiness claims.

## 16. Non-goals

This phase does not:

* execute the dry-run;
* run browser/runtime/dev server;
* run DB commands;
* run Prisma;
* run SQL;
* run migrations, db push, db pull, seed, reset, studio, or generate;
* run database connection checks;
* create fixtures;
* create users, students, StudentAccess rows, enrollments, cycles, StudyLoads, sessions, or responses;
* activate trial;
* activate payment;
* create subscription state;
* inspect `.env`, raw env values, database URLs, tokens, passwords, cookies, headers, backups, credentials, or provider secret panels;
* print secrets or connection strings;
* edit app code, tests, scripts, schema, or package files;
* touch staging or production;
* commit real student data;
* approve student/product use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready.

## 17. Result marker

```text
MVP_SALES_PILOT_DRY_RUN_1B_TARGET_CONFIRMATION_PROTOCOL_DEFINED
```
