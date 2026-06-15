# MVP-GOV-LOCAL-DEV-PROGRAM-TABLE-READ-HUMAN-ACTION-1

## Purpose

Guide and document the human/local action required so the safe DB tooling can execute a read-only `Program` table read in LOCAL_DEV.

This phase does not mutate DB and does not create or align `Program PAES_M2`.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 7bf5326e001cfb3ef36213d69e6d85bfe0070304
```

## Preflight result

Preflight passed.

```text
working tree: clean
HEAD: 7bf5326e001cfb3ef36213d69e6d85bfe0070304
origin/main: 7bf5326e001cfb3ef36213d69e6d85bfe0070304
origin/HEAD: 7bf5326e001cfb3ef36213d69e6d85bfe0070304
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_PROGRAM_TABLE_READ_DIAGNOSTIC_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_REPAIR_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_REPAIR_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_CONNECTIVITY_RECOVERY_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_TOOLING_1.md`

Tooling read:

- `nextjs_space/scripts/local-dev-db-availability-check.ts`
- `nextjs_space/scripts/local-dev-safe-db-tool.ts`

## Prior blocker

Previous result:

```text
LOCAL_DEV_PROGRAM_TABLE_READ_DIAGNOSTIC_BLOCKED_HUMAN_ACTION_REQUIRED
```

Sanitized prior state:

```text
LOCAL_DEV confirmation: confirmed
Program table read-only check: blocked
PAES_M1 Program row: unknown
PAES_M2 Program row: unknown
DB mutation: no
secrets printed: no
```

Required action from prior phase:

```text
Confirm that the same local/dev DB target that passes the generic read-only check can also serve Program-table reads.
```

## Required human/local action

The human/local action remains:

```text
Verify that the current local/dev DB service and environment used by Codex can serve read-only Program table queries.
```

This does not require sharing secrets.

## Safe human checklist

- Confirm the local/dev DB service is running and stable.
- Confirm `.env` exists without showing its contents.
- Confirm `DATABASE_URL` is present without showing its value.
- Confirm the same terminal/cwd used by Codex can access the local/dev environment.
- Execute only the safe `program-check` command if asked; do not paste connection values.
- Do not copy or paste DB URLs, tokens, cookies, credentials or private keys.
- Do not run migrate, db push, reset or seed reset.
- Do not touch prod/staging.

Safe command class:

```text
local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

## Human action status

```text
HUMAN_ACTION_STILL_REQUIRED
```

Reason:

The generic LOCAL_DEV check still passes, but the Program table read-only diagnostic still fails safely.

Sanitized cause:

```text
Prisma cannot initialize Program read path / db_unreachable
```

## Safe tooling used

Generic LOCAL_DEV confirmation:

```text
nextjs_space/scripts/local-dev-db-availability-check.ts --mode check
```

Program table read-only check:

```text
nextjs_space/scripts/local-dev-db-availability-check.ts --mode program-check
```

All commands used safe read-only/local-dev guard flags.

## Program table read-only result

LOCAL_DEV confirmation:

```text
confirmed
```

Program table read-only check:

```text
blocked
```

Sanitized Program check output:

```text
LOCAL_DEV_DB_PROGRAM_CHECK_FAILED
detailsRedacted: true
mode: program-check
databaseUrlPresent: true
databaseUrlValuePrinted: false
dataMutated: false
errorName: PrismaClientInitializationError
errorCode: none
errorKind: db_unreachable
secretValuesPrinted: false
```

## Sanitized Program state

```text
PAES_M1 Program row: unknown
PAES_M2 Program row: unknown
DB mutation: no
secrets printed: no
```

No Program row state can be asserted yet.

## Secret-safety verification

No `.env`, `DATABASE_URL`, DB URL, connection string, token, cookie, secret, private key or credential value was printed.

Only boolean/sanitized state was recorded:

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

This was a read-only diagnostic/documentation phase.

Only documentation was modified.

## Result

```text
LOCAL_DEV_PROGRAM_TABLE_READ_HUMAN_ACTION_STILL_REQUIRED
```

## Next recommended phase

```text
MVP-GOV-LOCAL-DEV-DB-SERVICE-HUMAN-RECOVERY-1
```
