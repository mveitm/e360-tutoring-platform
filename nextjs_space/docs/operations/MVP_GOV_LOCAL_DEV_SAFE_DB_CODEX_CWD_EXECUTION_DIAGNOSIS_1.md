# MVP-GOV-LOCAL-DEV-SAFE-DB-CODEX-CWD-EXECUTION-DIAGNOSIS-1

## Purpose

Diagnose why the read-only `Program` table `program-check` succeeds in the human PowerShell execution from `nextjs_space`, but fails in the Codex execution context from `nextjs_space` with sanitized `PrismaClientInitializationError` / `db_unreachable`.

This phase does not mutate DB and does not create or align `Program PAES_M2`.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 9a794c02ee8afc6dcc8fef57b10ea303d42f79d4
```

## Preflight result

Preflight passed from repository root.

```text
working tree: clean
HEAD: 9a794c02ee8afc6dcc8fef57b10ea303d42f79d4
origin/main: 9a794c02ee8afc6dcc8fef57b10ea303d42f79d4
origin/HEAD: 9a794c02ee8afc6dcc8fef57b10ea303d42f79d4
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1E.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_SERVICE_HUMAN_RECOVERY_3.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_SERVICE_HUMAN_RECOVERY_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_PROGRAM_TABLE_READ_HUMAN_ACTION_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_PROGRAM_TABLE_READ_DIAGNOSTIC_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_REPAIR_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_TOOLING_1.md`

Tooling read:

- `nextjs_space/scripts/local-dev-db-availability-check.ts`
- `nextjs_space/scripts/local-dev-safe-db-tool.ts`
- `nextjs_space/scripts/lib/load-local-env-private.ts`

## Prior blocker

Alignment retry 1E stopped with:

```text
STOP_SCOPE_EXPANSION_REQUIRED
```

Reason:

```text
Codex could not reproduce the safe read-only Program precheck before mutation.
```

Human-verified prior state:

```text
PAES_M1 Program row: present
PAES_M2 Program row: absent
DB mutation: no
secrets printed: no
```

Codex-observed failure:

```text
LOCAL_DEV_DB_PROGRAM_CHECK_FAILED
mode: program-check
databaseUrlPresent: true
databaseUrlValuePrinted: false
dataMutated: false
errorName: PrismaClientInitializationError
errorKind: db_unreachable
secretValuesPrinted: false
```

## Human command that succeeded

Human PowerShell command from `nextjs_space`:

```text
npx tsx scripts/local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Human-provided sanitized result:

```text
LOCAL_DEV_DB_PROGRAM_CHECK_COMPLETED
PAES_M1 Program row: present
PAES_M2 Program row: absent
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

## Codex command that failed

Codex command from `nextjs_space` during 1E:

```text
node_modules\.bin\tsx.cmd scripts/local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Codex sanitized result:

```text
LOCAL_DEV_DB_PROGRAM_CHECK_FAILED
errorName: PrismaClientInitializationError
errorKind: db_unreachable
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

## Correct working directory

```text
C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space
```

All DB/Prisma diagnostic commands in this phase were executed from this working directory.

## Sanitized execution context

```text
cwd: C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space
envFilePresent: true
databaseUrlPresent: true
databaseUrlValuePrinted: no
nodeVersion: v24.11.1
npmVersion: 11.6.2
```

Note:

```text
npm -v invoked through PowerShell resolved to npm.ps1 and was blocked by local execution policy.
npm.cmd -v succeeded.
```

No `.env` value was printed.

## Prisma validate result

Command:

```text
npx.cmd prisma validate
```

Sanitized result:

```text
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid
```

## npx tsx program-check result

Command:

```text
npx.cmd tsx scripts/local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Sanitized result:

```text
npx tsx program-check: failed
status: LOCAL_DEV_DB_PROGRAM_CHECK_FAILED
errorName: PrismaClientInitializationError
errorKind: db_unreachable
databaseUrlPresent: true
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

## node_modules tsx.cmd program-check result

Command:

```text
node_modules\.bin\tsx.cmd scripts/local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Sanitized result:

```text
node_modules tsx.cmd program-check: failed
status: LOCAL_DEV_DB_PROGRAM_CHECK_FAILED
errorName: PrismaClientInitializationError
errorKind: db_unreachable
databaseUrlPresent: true
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

## Comparison

```text
Human PowerShell npx tsx program-check: passed
Codex npx.cmd tsx program-check: failed
Codex node_modules\.bin\tsx.cmd program-check: failed
Codex cwd: nextjs_space
Codex env file present: true
Codex DATABASE_URL present: true
Codex DATABASE_URL value printed: no
Codex Prisma validate: passed
Codex DB mutation: no
Codex secrets printed: no
```

The command form is not the primary explanation: under Codex, both `npx.cmd tsx` and `node_modules\.bin\tsx.cmd` fail the same read-only Program check.

## Root cause or remaining hypothesis

Classification:

```text
CODEX_PROGRAM_CHECK_STILL_DB_UNREACHABLE
```

Remaining hypothesis:

```text
The remaining difference is the Codex execution context, not the working directory, not absence of `.env`, and not the `npx` versus `.bin` command form. Codex can load `.env` and validate Prisma schema from `nextjs_space`, but its Prisma client still cannot reach the DB for Program checks.
```

This likely requires a scoped execution-context repair or environment diagnosis before retrying `Program PAES_M2` alignment.

## Secret-safety verification

No `.env`, `DATABASE_URL`, DB URL, DB host, connection string, token, cookie, secret, private key or credential value was printed.

Only boolean/sanitized status was recorded:

```text
envFilePresent: true
databaseUrlPresent: true
databaseUrlValuePrinted: false/no
secretValuesPrinted: false
dataMutated: false
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
- No tooling changes.
- No package changes.
- No prod/staging.
- No payment/subscription changes.
- No agentic layer opened.

## Scope safety

This was a read-only command comparison and documentation phase.

Only documentation was modified. No DB data, code, schema, tooling, package, UI, API, content, route-order or continuity file was changed.

## Result

```text
CODEX_CWD_EXECUTION_DIAGNOSIS_COMPLETED
```

## Next recommended phase

```text
MVP-GOV-LOCAL-DEV-SAFE-DB-CODEX-EXECUTION-REPAIR-1
```
