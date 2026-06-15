# MVP-GOV-LOCAL-DEV-DB-SERVICE-HUMAN-RECOVERY-3

## Purpose

Document that the human/local action resolved the read-only `Program` table blocker and identify the root cause: the safe tooling must be executed from `nextjs_space` so Prisma loads `nextjs_space/.env` correctly.

This phase does not mutate DB and does not create or align `Program PAES_M2`.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 12abb9fd272ab669f31880c5567810011196b870
```

## Preflight result

Preflight passed.

```text
working tree: clean
HEAD: 12abb9fd272ab669f31880c5567810011196b870
origin/main: 12abb9fd272ab669f31880c5567810011196b870
origin/HEAD: 12abb9fd272ab669f31880c5567810011196b870
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_SERVICE_HUMAN_RECOVERY_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_SERVICE_HUMAN_RECOVERY_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_PROGRAM_TABLE_READ_HUMAN_ACTION_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_PROGRAM_TABLE_READ_DIAGNOSTIC_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_REPAIR_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_TOOLING_1.md`

## Prior blocker

Previous result:

```text
LOCAL_DEV_DB_SERVICE_HUMAN_RECOVERY_STILL_REQUIRED
```

Prior blocker:

```text
Program table read-only check blocked by Prisma initialization / db_unreachable.
```

Prior sanitized state:

```text
LOCAL_DEV confirmation: confirmed
Program table read-only check: blocked
PAES_M1 Program row: unknown
PAES_M2 Program row: unknown
DB mutation: no
secrets printed: no
```

## Human action performed

The human/local operator executed the safe recovery path from PowerShell by changing into the Next.js workspace:

```text
cd C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space
```

Then the human/local operator verified Prisma schema loading:

```text
npx prisma validate
```

Sanitized result:

```text
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid
```

Then the human/local operator executed the safe read-only Program check:

```text
npx tsx scripts/local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Sanitized result:

```text
LOCAL_DEV_DB_PROGRAM_CHECK_COMPLETED
mode: program-check
databaseUrlPresent: true
databaseUrlValuePrinted: false
dataMutated: false
PAES_M1 present: true
PAES_M2 present: false
secretValuesPrinted: false
```

## Root cause

The safe Program read must run from `nextjs_space` so Prisma loads `nextjs_space/.env`. Running from the repository root can leave the Program read path unable to initialize Prisma for this local/dev setup.

The blocker was not absence of `DATABASE_URL`, lack of the accepted M2 pedagogical contract, missing authorization, or safe tooling design. It was the working directory / execution context used for Prisma-based Program reads.

## Correct working directory

```text
C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space
```

Future safe DB phases that use Prisma tooling for Program reads should execute from this working directory unless the tooling is explicitly changed in a separately scoped phase.

## Safe commands verified

Prisma schema validation:

```text
npx prisma validate
```

Sanitized output:

```text
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid
```

Program read-only check:

```text
npx tsx scripts/local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Sanitized output:

```text
LOCAL_DEV_DB_PROGRAM_CHECK_COMPLETED
databaseUrlPresent: true
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

No `DATABASE_URL`, DB URL, host, connection string, token, cookie, credential or private key was recorded.

## Sanitized Program state

```text
LOCAL_DEV Program read: passed
PAES_M1 Program row: present
PAES_M2 Program row: absent
DB mutation: no
secrets printed: no
```

Sanitized non-sensitive metadata observed:

```text
PAES_M1:
  present: true
  code: PAES_M1
  name: PAES Matemática M1
  vertical: PAES
  status: active

PAES_M2:
  present: false
```

## Secret-safety verification

No `.env`, `DATABASE_URL`, DB URL, DB host, connection string, token, cookie, secret, private key or credential value was printed in this document.

Only boolean/sanitized status was recorded:

```text
databaseUrlPresent: true
databaseUrlValuePrinted: false
secretValuesPrinted: false
dataMutated: false
```

## Explicit non-actions

- No DB mutation.
- No Program PAES_M2 creation or alignment.
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
- No prod/staging.
- No payment/subscription changes.
- No agentic layer opened.

## Scope safety

This was a documentation-only recovery closeout based on the human/local verified sanitized output.

Only documentation was modified. No DB data, code, schema, tooling, UI, API, content, route-order or continuity file was changed.

## Result

```text
LOCAL_DEV_DB_SERVICE_HUMAN_RECOVERY_CONFIRMED
```

## Next recommended phase

```text
MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-ALIGNMENT-1E
```
