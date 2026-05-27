# MVP-SALES-PILOT-DB-LOCAL-2 - Restore local/dev DB connectivity outside repo without exposing secrets

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DB-LOCAL-2
```

Purpose:

```text
Define the safe outside-repo recovery path for local/dev database connectivity.
```

Scope:

* Documentation/runbook/custody only.
* No DB check in this phase.
* No fixture apply.
* No Prisma CLI, SQL, migrations, seed, reset, browser/runtime, staging, production, or deploy.
* No env, credential, provider panel, database URL, token, cookie, header, backup, or connection-string inspection.

## 2. Baseline and Context Gate summary

Baseline:

```text
HEAD = origin/main = origin/HEAD = bc2bd5e
```

Context Gate read:

* `PHASE_LOG.md` tail.
* Active sales-ready context, roadmap, and phase gate protocol.
* External pilot audit and closed M1-first pilot scope.
* `MVP-SALES-PILOT-DRY-RUN-1F` fixture setup blocker.
* `MVP-SALES-PILOT-DB-LOCAL-1` read-only DB availability result.
* Compact reporting and Codex prompting standards.
* Supporting DRY-RUN-1B, 1C, 1D, and 1E docs.

Read-only inspection:

* `nextjs_space/scripts/local-dev-db-availability-check.ts`.
* `nextjs_space/scripts/m1-pilot-dry-run-fixture.ts`.
* `nextjs_space/package.json`.
* `nextjs_space/prisma/schema.prisma`.
* `nextjs_space/scripts` file list.

## 3. Current blocker summary

Current blocker:

```text
LOCAL_DEV_DB_UNAVAILABLE
NO_DATA_MUTATED_READ_ONLY_CHECK_ONLY
```

Meaning:

The local/dev database target is not available or reachable in redacted terms. The controlled M1-first fixture setup cannot continue until Mauricio privately restores or confirms the local/dev database target.

## 4. Safety principle

Database recovery must happen outside the repo and outside chat-visible secret handling.

Do not print, paste, commit, screenshot, or disclose:

* raw `.env` values;
* `DATABASE_URL`;
* `PROD_DATABASE_URL`;
* connection strings;
* provider target details;
* hostnames or project names if they reveal target information;
* credentials;
* tokens, cookies, headers, or passwords;
* provider panels containing secret material;
* backups or private database exports.

Only non-secret status markers should be reported back into the repo workflow.

## 5. Private operator checklist for Mauricio

Mauricio should complete this privately, without pasting values:

1. Confirm intended target:

```text
Target class: LOCAL_DEV_ONLY
Not staging
Not production
```

2. Confirm the local env file exists privately, without showing values.
3. Confirm the app's local/dev DB credential is current privately.
4. Confirm the local/dev DB provider/database is awake or available privately.
5. Confirm IP/network access is allowed if the provider restricts it.
6. Confirm no production credential is being used.
7. Confirm no staging credential is being used.
8. Confirm no destructive reset, migration, or seed is being run.
9. Confirm any changes to `.env` remain uncommitted and ignored.
10. Report back only this non-secret result when done:

```text
LOCAL_DEV_DB_PRIVATE_RECOVERY_DONE
No secrets printed
No production/staging
Ready for guarded read-only check
```

## 6. Allowed private actions outside repo

Allowed private actions:

* Open the local `.env` privately and correct the local/dev value.
* Rotate or refresh a local/dev credential privately.
* Wake or resume the local/dev DB provider privately.
* Update local machine network access privately.
* Use the provider UI privately to confirm the DB is available.
* Run a provider-side check privately without sharing details.
* Ensure `.env` remains gitignored.

These actions must not put secrets into committed docs, chat, logs, screenshots, or terminal output shared with Codex.

## 7. Forbidden private actions

Forbidden actions:

* Paste DB URLs into chat.
* Paste screenshots showing connection strings or provider secrets.
* Use production credentials for local dry-run.
* Use staging credentials for local dry-run.
* Run destructive reset.
* Run migrations without an explicit phase.
* Run seed without an explicit phase.
* Share hostnames or provider target names if they reveal target or credential material.
* Commit `.env`.
* Commit private register data.
* Commit real student data.

## 8. Non-secret confirmation block for Mauricio after private recovery

Future confirmation block:

```text
LOCAL DEV DB PRIVATE RECOVERY - NON-SECRET

I confirm:
- I privately reviewed the local/dev DB configuration.
- I did not paste or print DATABASE_URL, PROD_DATABASE_URL, env values, credentials, tokens, cookies, headers, or connection strings.
- I confirm the target is local/dev only.
- I confirm it is not staging.
- I confirm it is not production.
- I confirm no destructive reset, migration, seed, or data mutation was run.
- I confirm any local env changes remain uncommitted and gitignored.
- I confirm the local/dev DB should now be available for a guarded read-only check.

Result:
LOCAL_DEV_DB_PRIVATE_RECOVERY_DONE
```

## 9. Next verification protocol

The next verification phase should run only the guarded helper:

```powershell
cd nextjs_space
.\node_modules\.bin\tsx.cmd scripts/local-dev-db-availability-check.ts --mode check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
cd ..
```

The verification phase must report only:

```text
LOCAL_DEV_DB_AVAILABLE
LOCAL_DEV_DB_UNAVAILABLE
LOCAL_DEV_DB_CHECK_BLOCKED
```

It must not print database URLs, connection strings, hostnames, provider target names, raw env values, credentials, tokens, cookies, headers, row data, or counts.

## 10. Decision tree

If the next check returns:

```text
LOCAL_DEV_DB_AVAILABLE
```

Proceed to:

```text
MVP-SALES-PILOT-DRY-RUN-1G - Retry one-participant fixture apply after DB availability confirmed
```

If the next check returns:

```text
LOCAL_DEV_DB_UNAVAILABLE
```

Remain blocked. Continue private DB recovery or choose a non-DB fallback route.

If the next check returns:

```text
LOCAL_DEV_DB_CHECK_BLOCKED
```

Fix the availability helper or target confirmation protocol before trying fixture setup again.

## 11. Non-DB fallback option

If local/dev DB cannot be restored soon, a secondary fallback may be defined only with explicit authorization:

```text
MVP-SALES-PILOT-DB-LOCAL-ALT-1 - Define non-DB mock dry-run or reset local dev DB strategy
```

This fallback is secondary because the current vertical dry-run path still needs a real DB-backed app circuit before any real controlled students.

## 12. What this phase does not do

This phase does not:

* run a DB check;
* run fixture `apply`;
* run fixture `cleanup`;
* run browser/runtime;
* run Prisma CLI;
* run SQL;
* run migrations;
* run seed;
* mutate data;
* inspect env files or raw env values;
* print secrets;
* touch staging or production;
* activate payment or trial;
* approve product/student use;
* declare Sales-Ready;
* execute a pilot.

## 13. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-DB-LOCAL-3 - Verify local/dev DB availability after private recovery
```

This phase should run only the guarded read-only availability helper after Mauricio provides the non-secret private recovery confirmation.

## 14. Phase gate classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go
Sales-ready relevance: direct/high
Dependency: MVP-SALES-PILOT-DB-LOCAL-1 closed at bc2bd5e
What it advances: safe human recovery protocol for local/dev DB availability
What it does not advance: fixture setup, DB mutation, runtime, pilot execution, staging/prod, public readiness
Priority verdict: APPROVED_PRIVATE_DB_RECOVERY_RUNBOOK
Authorization status: executed only after Mauricio authorization
```

## 15. Result marker

```text
MVP_SALES_PILOT_DB_LOCAL_2_PRIVATE_RECOVERY_RUNBOOK_DEFINED
```
