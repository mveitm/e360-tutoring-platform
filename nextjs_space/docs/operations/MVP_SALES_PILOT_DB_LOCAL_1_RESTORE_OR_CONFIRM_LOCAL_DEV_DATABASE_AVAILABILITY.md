# MVP-SALES-PILOT-DB-LOCAL-1 - Restore or confirm local/dev database availability without exposing secrets

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DB-LOCAL-1
```

Purpose:

```text
Restore or confirm local/dev database availability for the controlled M1-first dry-run path without exposing secrets and without creating fixture data.
```

Scope:

* Read required governance, pilot, dry-run, and DB-local blocker context.
* Inspect fixture helper, schema, package metadata, and scripts read-only.
* Add a guarded read-only local/dev DB availability helper because no existing safe read-only check existed.
* Run only the guarded read-only availability check after non-secret `LOCAL_DEV_CONFIRMED` confirmation.
* Document the result and next phase.

This phase did not run fixture `apply`, did not mutate DB data, did not run Prisma CLI, did not run SQL, and did not run browser/runtime.

## 2. Baseline and Context Gate summary

Baseline:

```text
HEAD = origin/main = origin/HEAD = bd24f03
```

Context Gate read:

* `PHASE_LOG.md` tail.
* Sales-ready active context, roadmap, and phase gate protocol.
* External pilot audit and closed pilot scope documents.
* Pilot access boundary, source-of-truth, and access register template documents.
* `/now` M1 pilot audit/design documents.
* Dry-run 0 through 1F result/protocol documents.
* Beta scope/target, pedagogical layer anchor, compact reporting rule, and prompting standard.

Read-only inspection:

* `nextjs_space/scripts/m1-pilot-dry-run-fixture.ts`.
* `nextjs_space/prisma/schema.prisma`.
* `nextjs_space/package.json`.
* `nextjs_space/scripts` file list.

## 3. Blocker summary from DRY-RUN-1F

Prior blocker:

```text
FIXTURE_SETUP_STILL_BLOCKED
NO_CONFIRMED_FIXTURE_DATA_CREATED
```

Redacted cause:

```text
local/dev database target was unreachable before fixture setup could complete
```

The blocker prevented the one-participant fixture apply path from completing. The safe response was to stop fixture setup and create a read-only availability check that can confirm database reachability without exposing secret or target-derived details.

## 4. Operator confirmation used

Non-secret operator confirmation used for this phase:

```text
LOCAL/DEV TARGET CONFIRMATION - NON-SECRET

I confirm:
- I am in the local repo path:
  C:\projects\e360-tutoring-platform\tutoring_platform_mvp
- I am on the expected Git baseline.
- The terminal/session I will use is configured for local/dev only.
- I will not use production or staging.
- I will not paste or print DATABASE_URL, PROD_DATABASE_URL, env values, tokens, passwords, cookies, headers, or connection strings.
- This phase is allowed to run a guarded read-only local/dev DB availability check.
- This phase is not allowed to mutate data, create fixtures, run fixture apply, run browser/runtime, open /now, start StudyLoads, submit responses, complete StudyLoads, or touch staging/production.
- If the database target remains unreachable, the phase must stop and document the blocker with redacted details only.

Target class:
LOCAL_DEV_CONFIRMED
```

This confirmation authorized only a guarded read-only check. It did not authorize fixture creation or runtime dry-run execution.

## 5. Method used

Method:

```text
NEW_READ_ONLY_HELPER_SCRIPT
```

Created helper:

```text
nextjs_space/scripts/local-dev-db-availability-check.ts
```

The helper:

* Supports only `--mode check`.
* Requires `--target-class LOCAL_DEV_CONFIRMED`.
* Requires `--confirm-no-real-data`, `--confirm-no-production`, `--confirm-no-staging`, and `--confirm-read-only`.
* Imports Prisma Client only after all confirmation flags pass.
* Performs a minimal read-only count check and does not print row data.
* Prints only coarse result markers.
* Redacts all failure details.
* Does not print env values, DB URLs, hostnames, provider details, credentials, tokens, cookies, headers, or connection strings.
* Does not mutate data.

## 6. Commands run

Read-only availability check:

```powershell
cd nextjs_space
.\node_modules\.bin\tsx.cmd scripts/local-dev-db-availability-check.ts --mode check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
cd ..
```

No fixture `apply`, fixture `cleanup`, Prisma CLI, SQL, browser/runtime, or `/now` command was run.

## 7. DB availability result

Result:

```text
LOCAL_DEV_DB_UNAVAILABLE
```

The helper returned only redacted failure details:

```text
DETAILS_REDACTED
readCheck: failed
```

Redacted blocker category:

```text
database unreachable or unavailable through the confirmed local/dev session
```

No target details, env values, hostnames, provider details, connection strings, credentials, or row data were printed.

## 8. Data mutation summary

```text
NO_DATA_MUTATED_READ_ONLY_CHECK_ONLY
```

The helper attempted only a guarded read-only availability check. It did not create users, students, StudentAccess rows, enrollments, cycles, StudyLoads, sessions, responses, subscriptions, payments, or trials.

## 9. What was not executed

Not executed:

* No fixture `apply`.
* No fixture `cleanup`.
* No `/now`.
* No StudyLoad start.
* No StudyLoad responses.
* No StudyLoad completion.
* No admin runtime evidence review.
* No browser/runtime/dev server.
* No staging or production.
* No Prisma CLI.
* No SQL.
* No migrations, db push, db pull, seed, reset, studio, or generate.
* No payment or public trial.

## 10. Recommended next phase

Because the guarded read-only check still reports local/dev DB unavailable, the recommended next phase is:

```text
MVP-SALES-PILOT-DB-LOCAL-2 - Restore local/dev DB connectivity outside repo without exposing secrets
```

That phase should restore or reconfigure the local/dev database target outside repository commits and without pasting secrets into chat or logs. After availability is confirmed, the dry-run path can return to a one-participant fixture apply retry.

## 11. Non-goals

This phase did not:

* Restore the database directly inside repo-controlled files.
* Inspect `.env`, raw env values, DB URLs, tokens, passwords, cookies, headers, backups, provider panels, or credentials.
* Print connection strings or target details.
* Mutate local/dev data.
* Create pilot fixture data.
* Execute the student runtime path.
* Activate payment, subscription, or public trial.
* Approve product/student use.
* Declare PAES_L1 ready.
* Declare PAES_M2 ready.
* Declare Sales-Ready.
* Execute a real pilot.

## 12. Result marker

```text
MVP_SALES_PILOT_DB_LOCAL_1_DB_UNAVAILABLE_CONFIRMED
```
