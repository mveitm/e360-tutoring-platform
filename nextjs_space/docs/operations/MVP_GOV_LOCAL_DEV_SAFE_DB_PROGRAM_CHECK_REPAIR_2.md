# MVP-GOV-LOCAL-DEV-SAFE-DB-PROGRAM-CHECK-REPAIR-2

## Purpose

Resolve the blocker from:

```text
MVP-GOV-LOCAL-DEV-SAFE-DB-PROGRAM-CHECK-REPAIR-1
Result: LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_REPAIR_DOCUMENTED_BLOCKED
```

The intended goal was a clear, safe and reusable flow for:

```text
Program read-only check
Program metadata inspection
Program alignment readiness / dry-run
```

without printing secrets, mutating DB, or creating/aligning `Program PAES_M2`.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = a6643b93efb0c8c26bf68d3c84adb824c251694a
```

## Preflight result

Preflight passed.

```text
working tree: clean
HEAD: a6643b93efb0c8c26bf68d3c84adb824c251694a
origin/main: a6643b93efb0c8c26bf68d3c84adb824c251694a
origin/HEAD: a6643b93efb0c8c26bf68d3c84adb824c251694a
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_TOOLING_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_CONNECTIVITY_RECOVERY_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_CONNECTIVITY_RECOVERY_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_REPAIR_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1D.md`

Tooling inspected:

- `nextjs_space/scripts/local-dev-safe-db-tool.ts`
- `nextjs_space/scripts/local-dev-db-availability-check.ts`

## Prior blocker from repair 1

Repair 1 added explicit Program helper modes but remained blocked:

```text
local-dev-db-availability-check.ts: LOCAL_DEV_DB_AVAILABLE
local-dev-safe-db-tool.ts confirm-local-dev: PrismaClientInitializationError / db_unreachable
```

The helper did not expose Program row state safely.

## Blocker classification

Classification:

```text
safe LOCAL_DEV confirmation incompatible with Program check
```

Secondary classification:

```text
human action required
```

Reason:

The canonical availability check can still confirm LOCAL_DEV using a generic read-only query, but Program-specific read-only checks fail safely before returning Program state. Therefore future Program alignment cannot safely proceed until Program check completion is demonstrated.

## Tooling inspected

`local-dev-safe-db-tool.ts` after Repair 1 contains:

- `confirm-local-dev`
- `program-check`
- `program-align-readiness`
- `plan-paes-m2-program`
- guarded future `align-paes-m2-program`

`local-dev-db-availability-check.ts` remained the only checker that reliably confirmed LOCAL_DEV.

## Repair action

Updated:

```text
nextjs_space/scripts/local-dev-db-availability-check.ts
```

Actions:

- added read-only modes `program-check` and `program-align-readiness` to the canonical checker;
- kept `check` mode as the canonical LOCAL_DEV confirmation path;
- added sanitized JSON output for Program modes;
- added sanitized error classification;
- added PAES_M2 expected metadata for readiness;
- ensured Program modes still require all read-only and local/dev guard flags;
- kept all mutation out of this checker.

This was a second repair attempt, but it remained blocked during validation.

## Safe Program check contract

Intended future command:

```text
local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Intended successful output:

```text
LOCAL_DEV_DB_PROGRAM_CHECK_COMPLETED
dataMutated: false
databaseUrlValuePrinted: false
programs.PAES_M1.present: true/false
programs.PAES_M2.present: true/false
secretValuesPrinted: false
```

Current observed output:

```text
LOCAL_DEV_DB_PROGRAM_CHECK_FAILED
detailsRedacted: true
dataMutated: false
databaseUrlPresent: true
databaseUrlValuePrinted: false
errorName: PrismaClientInitializationError
errorCode: none
errorKind: db_unreachable
secretValuesPrinted: false
```

## Safe Program readiness / dry-run contract

Intended future command:

```text
local-dev-db-availability-check.ts --mode program-align-readiness --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Intended successful output:

```text
LOCAL_DEV_DB_PROGRAM_ALIGNMENT_READINESS_COMPLETED
dataMutated: false
expectedProgram: PAES_M2 / PAES Matemática M2 / PAES / active
currentProgram: present/absent sanitized summary
readiness.state: absent / present_aligned / present_not_aligned
mutationExecuted: false
secretValuesPrinted: false
```

Current observed output:

```text
LOCAL_DEV_DB_PROGRAM_ALIGNMENT_READINESS_FAILED
detailsRedacted: true
dataMutated: false
databaseUrlPresent: true
databaseUrlValuePrinted: false
secretValuesPrinted: false
```

## Read-only validation performed

Canonical LOCAL_DEV check:

```text
LOCAL_DEV_DB_AVAILABLE
localEnvFilePresent: yes
databaseUrlPresent: yes
databaseUrlValuePrinted: no
readCheck: passed
NO DATA MUTATED
NO SECRET VALUES PRINTED
```

Program check:

```text
read-only completed: no
DB mutation: no
secrets printed: no
```

Program readiness:

```text
dry-run completed: no
DB mutation: no
secrets printed: no
```

No Program alignment mutation was executed.

## Human action required, if any

Before retrying Program alignment, a human/local operator should verify a non-secret local condition outside Codex output:

```text
Confirm that the same local/dev DB target that passes the generic read-only check can also serve Program-table reads.
```

Acceptable human actions:

- confirm local DB service is stable and reachable;
- confirm local/dev env file exists without sharing contents;
- run a local non-secret DB status check outside chat if needed;
- authorize a narrower diagnostic phase that can inspect only sanitized Program-table error class.

Do not share `.env`, DB URL, connection string, credentials, tokens or private keys.

## Secret-safety verification

No `.env`, `DATABASE_URL`, DB URL, connection string, token, cookie, secret, private key or credential value was printed.

Only boolean/sanitized status was printed:

```text
databaseUrlPresent: true
databaseUrlValuePrinted: false
secretValuesPrinted: false
detailsRedacted: true
```

## Explicit non-actions

- No DB mutation.
- No Program PAES_M2 creation or alignment.
- No Program PAES_M2 retry.
- No StudentAccess mutation.
- No enrollment creation.
- No StudentProgramInstance creation.
- No LearningCycle creation.
- No StudyLoad creation.
- No schema/Prisma changes.
- No migration.
- No prisma db push.
- No DB reset.
- No seed reset.
- No M2-C01 content/authoredFeedback changes.
- No registry/content changes.
- No UI/API functional changes.
- No prod/staging.
- No payment/subscription changes.
- No agentic layer opened.

## Scope safety

This phase changed only documentation and the existing safe local/dev availability checker.

It did not mutate DB and did not attempt Program PAES_M2 alignment.

## Result

```text
LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_READY_WITH_HUMAN_ACTION
```

## Next recommended phase

```text
MVP-GOV-LOCAL-DEV-PROGRAM-TABLE-READ-DIAGNOSTIC-1
```
