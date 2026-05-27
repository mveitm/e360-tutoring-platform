# MVP-SALES-PILOT-DB-LOCAL-5 - Restore Codex-session local/dev DB availability without exposing secrets

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DB-LOCAL-5 - Restore Codex-session local/dev DB availability without exposing secrets
```

Type:

```text
Script helper safety update / guarded read-only DB availability verification / no mutation.
```

Mission:

Restore Codex-session local/dev DB availability by allowing local helper scripts to load the project-local `.env` privately at runtime, without printing or exposing secret values.

This phase may update helper scripts and run only the guarded read-only DB availability check plus fixture helper `help` and `plan` modes. It must not run fixture `apply`, mutate DB, run browser/runtime, touch staging/production, or execute pilot behavior.

## 2. Baseline and Context Gate summary

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = c15291f
```

Latest accepted commit:

```text
c15291f - MVP-SALES-PILOT-DB-LOCAL-4: diagnose DB availability discrepancy
```

Context Gate summary:

* `PHASE_LOG.md` tail was read through DB-LOCAL-4.
* Active context, roadmap, phase gate, DB-LOCAL-1, DB-LOCAL-2, DB-LOCAL-3, DB-LOCAL-4, DRY-RUN-1F, DRY-RUN-1E, and DRY-RUN-1D docs were read.
* Compact reporting rule and Codex prompting standard were read.
* Existing helper scripts and package metadata were inspected read-only.
* `.env*` filenames were listed only; `.env` contents were not printed or inspected through shell output.

## 3. Discrepancy from DB-LOCAL-4

DB-LOCAL-4 concluded:

```text
DB_UNAVAILABLE_STABLE in Codex execution session
DATABASE_URL_PRESENT=false
NEXTAUTH_URL_PRESENT=false
```

Mauricio's manual PowerShell session had previously observed a passing guarded check. The working interpretation for this phase was a process-env loading issue: Codex's execution process did not inherit the local DB env needed by Prisma Client.

## 4. Fix implemented

Implemented a private local env loader:

```text
nextjs_space/scripts/lib/load-local-env-private.ts
```

The loader:

* locates the project-local `.env` from script execution context;
* reads it privately inside the Node process;
* parses simple key/value assignment lines;
* populates only missing `process.env` keys;
* does not print values;
* does not return values;
* does not print DB URLs, hostnames, credentials, provider targets, tokens, cookies, headers, or connection strings.

Updated scripts:

* `nextjs_space/scripts/local-dev-db-availability-check.ts`;
* `nextjs_space/scripts/m1-pilot-dry-run-fixture.ts`.

The DB availability helper calls the private loader before Prisma Client is imported for the guarded read-only check. The fixture helper keeps `help` and `plan` non-mutating and calls the private loader only inside the already-guarded `apply` path for future authorized use.

No `.env` values were printed. No env-derived output was committed.

## 5. Commands run

Validation and helper commands run:

```powershell
git diff --check
git status --short
git diff --stat

cd nextjs_space
.\node_modules\.bin\tsx.cmd scripts/local-dev-db-availability-check.ts --mode check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
.\node_modules\.bin\tsx.cmd scripts/m1-pilot-dry-run-fixture.ts --mode help
.\node_modules\.bin\tsx.cmd scripts/m1-pilot-dry-run-fixture.ts --mode plan --run-id 20260527T000000-local --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging
cd ..
```

A boolean-only sanity check was also run to confirm that the private loader finds a local `.env` file and makes `DATABASE_URL` present in `process.env`. It printed booleans only and did not print any env value.

## 6. DB availability result after private env loader

Result:

```text
LOCAL_DEV_DB_UNAVAILABLE_AFTER_PRIVATE_ENV_LOAD
```

The private loader restored the missing process-env presence condition, but the guarded read-only Prisma Client check still reported DB unavailable with details redacted.

No DB URL, connection string, hostname, provider target, credential, token, cookie, header, password, or secret-derived detail was printed.

## 7. Data mutation summary

```text
NO_DATA_MUTATED_READ_ONLY_CHECK_ONLY
```

The only DB-capable command was the guarded read-only availability helper. No fixture helper `apply` or `cleanup` mode was run.

## 8. Safety confirmation

Confirmed:

* no `.env` values printed;
* no DB URL printed;
* no connection string printed;
* no host/provider target printed;
* no DB mutation;
* no fixture data;
* no Prisma CLI;
* no SQL;
* no migrations, db push, db pull, seed, reset, studio, or generate;
* no runtime/browser;
* no `/now`;
* no StudyLoad start, response, completion, or admin runtime review;
* no staging/prod;
* no payment/trial;
* no real student data;
* no pilot execution.

## 9. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-DB-LOCAL-6 - Continue Codex-session DB env/loading diagnosis
```

Reason:

Codex-session private env loading now works at the boolean/process level, but the guarded read-only DB availability check still fails. The next phase should diagnose the remaining failure without exposing secrets, likely focusing on parsing compatibility, required env variants, Prisma Client runtime expectations, and redacted reachability categories.

## 10. Non-goals

This phase does not:

* print `.env` contents;
* print `DATABASE_URL`;
* print `PROD_DATABASE_URL`;
* print env values;
* print connection strings;
* print hostnames or provider target names;
* print credentials, tokens, cookies, headers, passwords, provider panel contents, or backups;
* commit `.env` or env-derived output;
* run fixture `apply`;
* run fixture `cleanup`;
* create users, students, StudentAccess rows, enrollments, cycles, StudyLoads, sessions, or responses;
* mutate DB;
* run Prisma CLI;
* run SQL;
* run migrations, db push, db pull, seed, reset, studio, or generate;
* run browser/runtime/dev server;
* open `/now`;
* touch staging;
* touch production;
* deploy;
* activate payment;
* activate trial;
* approve student/product use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute pilot.

## 11. Result marker

```text
MVP_SALES_PILOT_DB_LOCAL_5_CODEX_DB_STILL_UNAVAILABLE
```
