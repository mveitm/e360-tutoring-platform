# MVP-SALES-PILOT-DB-LOCAL-4 - Diagnose DB availability discrepancy

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DB-LOCAL-4
```

Purpose:

```text
Diagnose why local/dev DB availability differs between Mauricio's manual PowerShell session and Codex's execution session.
```

Scope:

* Non-secret diagnostic/readiness only.
* Run guarded read-only DB availability checks.
* Run non-secret session diagnostics.
* Do not mutate DB.
* Do not run fixture `apply` or `cleanup`.
* Do not inspect or print env values, database URLs, connection strings, hostnames, provider targets, credentials, tokens, cookies, headers, or secrets.

## 2. Baseline and Context Gate summary

Baseline:

```text
HEAD = origin/main = origin/HEAD = 331cec2
```

Context Gate read:

* `PHASE_LOG.md` tail.
* `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DB_LOCAL_1_RESTORE_OR_CONFIRM_LOCAL_DEV_DATABASE_AVAILABILITY.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DB_LOCAL_2_RESTORE_LOCAL_DEV_DB_CONNECTIVITY_RUNBOOK.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DB_LOCAL_3_VERIFY_LOCAL_DEV_DB_AVAILABILITY_AFTER_PRIVATE_RECOVERY.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_1F_FIX_FIXTURE_SETUP_BLOCKER.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_1E_APPLY_LOCAL_DEV_FIXTURE_FOR_ONE_PARTICIPANT.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_1D_RUN_LOCAL_DEV_FIXTURE_PLAN_MODE_WITH_OPERATOR_CONFIRMATION.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.

Read-only inspection:

* `nextjs_space/scripts/local-dev-db-availability-check.ts`.
* `nextjs_space/scripts/m1-pilot-dry-run-fixture.ts`.
* `nextjs_space/package.json`.
* `.env*` file names only.

## 3. Discrepancy summary

Known discrepancy:

```text
Manual session previously observed LOCAL_DEV_DB_AVAILABLE.
Codex versioned DB-LOCAL-3 observed LOCAL_DEV_DB_UNAVAILABLE.
```

This phase repeated the guarded helper in the Codex session and added non-secret process/session checks.

## 4. Non-secret confirmation used

Confirmation used:

```text
LOCAL/DEV TARGET CONFIRMATION - NON-SECRET

Target class:
LOCAL_DEV_CONFIRMED
```

This confirmation authorized only guarded read-only availability checks and non-secret diagnostics. It did not authorize DB mutation, fixture creation, runtime, staging, production, or secret inspection.

## 5. Diagnostics run

Non-secret diagnostics:

* Git status and baseline.
* Working directory from repo root.
* Working directory from `nextjs_space`.
* Node version.
* npm version using `npm.cmd` after `npm` was blocked by PowerShell script execution policy.
* `.env*` filenames only.
* Presence checks for `.env`, `.env.local-neon`, the availability helper, and `node_modules/.bin/tsx.cmd`.
* Boolean-only process checks for `DATABASE_URL` and `NEXTAUTH_URL`.
* Three guarded read-only DB availability helper runs with short spacing.

No env values, DB URLs, connection strings, hostnames, provider targets, credentials, tokens, cookies, headers, row data, or counts were printed.

## 6. Environment/session comparison

Non-secret observations:

| Check | Observation |
| --- | --- |
| Repo-root working directory | Codex reported a sandboxed cwd path. |
| `nextjs_space` working directory | Expected project `nextjs_space` path was reported. |
| Node version | `v24.11.1` |
| npm version | `11.6.2` via `npm.cmd`; `npm -v` hit PowerShell script policy. |
| `.env*` file names present | yes, filenames only |
| `.env` exists | true |
| `.env.local-neon` exists | true |
| availability helper exists | true |
| `tsx.cmd` exists | true |
| `process.env.DATABASE_URL` present | false |
| `process.env.NEXTAUTH_URL` present | false |

Interpretation:

The Codex process can see the workspace files, including env-file names, but the relevant process environment variables are not present in the Codex execution session. Since the guarded helper does not read env-file contents and does not load secrets itself, the Codex helper remains unable to reach the DB target in this session.

## 7. Repeated guarded DB check results

| Run | Result | ReadCheck | DataMutated | SecretsPrinted |
| --- | --- | --- | --- | --- |
| 1 | `LOCAL_DEV_DB_UNAVAILABLE` | failed | no | no |
| 2 | `LOCAL_DEV_DB_UNAVAILABLE` | failed | no | no |
| 3 | `LOCAL_DEV_DB_UNAVAILABLE` | failed | no | no |

## 8. Diagnostic verdict

```text
DB_UNAVAILABLE_STABLE
```

## 9. Interpretation

The discrepancy is not intermittent inside the Codex session: all three guarded checks failed the same way.

Most likely non-secret cause:

```text
Codex execution session lacks the local/dev DB environment variable in process.env.
```

Contributing observations:

* Manual PowerShell likely had local/dev DB configuration available in its process/session.
* Codex root `pwd` reported a sandboxed cwd path, while `nextjs_space` resolved to the expected project path.
* Env-file names exist, but this phase did not inspect contents and the helper intentionally does not load them.
* The helper uses Prisma Client only after guard flags pass and reports redacted unavailable state when the DB target cannot be reached.

Fixture apply remains unsafe until the Codex execution context can run the guarded helper and receive:

```text
LOCAL_DEV_DB_AVAILABLE
```

## 10. Data mutation summary

```text
NO_DATA_MUTATED_READ_ONLY_DIAGNOSTIC_ONLY
```

No users, students, StudentAccess rows, enrollments, cycles, StudyLoads, sessions, responses, fixtures, payments, trials, subscriptions, or runtime state were created or changed.

## 11. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-DB-LOCAL-5 - Restore Codex-session local/dev DB availability
```

Focus:

Define a safe way for the Codex execution session to receive or load the local/dev DB target without printing, inspecting, or committing secrets. Fixture apply must remain blocked until the guarded read-only helper passes from Codex.

## 12. Non-goals

This phase does not:

* print env values;
* inspect `.env` contents;
* print database URLs;
* print connection strings;
* print hostnames or provider target names;
* mutate DB;
* run fixture `apply`;
* run fixture `cleanup`;
* run Prisma CLI;
* run SQL;
* run migrations, db push, db pull, seed, reset, studio, or generate;
* run browser/runtime/dev server;
* open `/now`;
* touch staging or production;
* deploy;
* create fixture data;
* activate payment or trial;
* approve product/student use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute pilot.

## 13. Result marker

```text
MVP_SALES_PILOT_DB_LOCAL_4_DB_UNAVAILABLE_STABLE
```
