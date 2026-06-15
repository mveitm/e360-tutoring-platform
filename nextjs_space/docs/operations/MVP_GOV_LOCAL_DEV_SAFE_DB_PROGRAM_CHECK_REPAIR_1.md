# MVP-GOV-LOCAL-DEV-SAFE-DB-PROGRAM-CHECK-REPAIR-1

## Purpose

Repair or complete the safe local/dev DB tooling so future phases have a clear, reusable flow for:

```text
Program read-only check
Program metadata inspection
Program alignment readiness check
```

without printing secrets, mutating DB, or creating/aligning `Program PAES_M2`.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = dd8ef067ba4798ec70e06d833093b8c1618010b9
```

## Preflight result

Preflight passed.

```text
working tree: clean
HEAD: dd8ef067ba4798ec70e06d833093b8c1618010b9
origin/main: dd8ef067ba4798ec70e06d833093b8c1618010b9
origin/HEAD: dd8ef067ba4798ec70e06d833093b8c1618010b9
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_TOOLING_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_CONNECTIVITY_RECOVERY_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_CONNECTIVITY_RECOVERY_2.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1D.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1C.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1B.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/PAES_M2_PEDAGOGICAL_BRANCH_INDEX.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M2_PRECONTRACT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M2_DERIVATION_GOVERNING_DOCUMENT.md`

Tooling read:

- `nextjs_space/scripts/local-dev-safe-db-tool.ts`
- `nextjs_space/scripts/local-dev-db-availability-check.ts`

## Prior blocker

Alignment retry 1D stopped with:

```text
STOP_SAFE_DB_TOOLING_UNCLEAR
```

The blocker was not LOCAL_DEV connectivity. The canonical checker confirmed LOCAL_DEV, but the Program-specific helper failed in read-only `check-programs` mode.

## Why safe DB tooling was unclear

Existing helper:

```text
nextjs_space/scripts/local-dev-safe-db-tool.ts
```

Clear before this phase:

- had guard flags for local/dev;
- had read-only mode;
- had future mutation mode disabled unless explicit flags were present;
- avoided raw error printing.

Unclear or insufficient before this phase:

- Program read-only check was named `check-programs` rather than an explicit `program-check`;
- there was no explicit `confirm-local-dev` mode in the Program helper;
- there was no `program-align-readiness` mode that combined current state with expected metadata without mutation;
- Program check failure stayed redacted without a safe error class;
- PAES_M2 helper metadata used `PAES Matematica M2`, while seed metadata uses `PAES Matemática M2`.

## Tooling inspected

The helper used Prisma model delegates for Program checks. The local/dev connectivity checker remained separate and still passed.

The practical ambiguity found in this phase:

```text
local-dev-db-availability-check.ts: LOCAL_DEV_DB_AVAILABLE
local-dev-safe-db-tool.ts confirm-local-dev: PrismaClientInitializationError / db_unreachable
```

No raw error message, connection string, DB URL, token or secret was printed.

## Program check requirements

Minimum future flow required:

```text
confirm-local-dev
program-check
program-align-readiness
```

Required properties:

- read-only by default;
- no secret printing;
- no table dumps;
- no StudentAccess/enrollment/StudyLoad inspection;
- clear PAES_M1/PAES_M2 present/absent/aligned state;
- clear expected metadata;
- future mutation still separate and explicitly authorized.

## Repair action

Updated:

```text
nextjs_space/scripts/local-dev-safe-db-tool.ts
```

Changes made:

- added explicit mode `confirm-local-dev`;
- added explicit mode `program-check`;
- added explicit mode `program-align-readiness`;
- kept compatibility aliases `check-programs` and `plan-paes-m2-program`;
- changed PAES_M2 expected metadata to match seed metadata:

```text
code: PAES_M2
name: PAES Matemática M2
vertical: PAES
status: active
```

- added sanitized error classification:

```text
errorName
errorCode
errorKind
```

- kept DB URL value, raw error messages and stack traces redacted;
- kept mutation mode disabled by default and guarded by explicit future mutation flags.

This was a partial repair. The helper now exposes clearer modes and diagnostics, but its DB-backed read-only modes still do not complete in this environment.

## Safe commands or subcommands now available

Read-only confirmation mode:

```text
local-dev-safe-db-tool.ts --mode confirm-local-dev --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only
```

Program read-only mode:

```text
local-dev-safe-db-tool.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only
```

Program alignment readiness mode:

```text
local-dev-safe-db-tool.ts --mode program-align-readiness --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only
```

Read-only metadata plan mode:

```text
local-dev-safe-db-tool.ts --mode plan-paes-m2-program --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only
```

Future mutation mode remains separate and was not executed in this phase.

## Read-only validation performed

Canonical local/dev checker:

```text
LOCAL_DEV_DB_AVAILABLE
localEnvFilePresent: yes
databaseUrlPresent: yes
databaseUrlValuePrinted: no
readCheck: passed
NO DATA MUTATED
NO SECRET VALUES PRINTED
```

Program helper confirm-local-dev:

```text
LOCAL_DEV_SAFE_DB_CONFIRMATION_FAILED
detailsRedacted: true
dataMutated: false
databaseUrlPresent: true
databaseUrlValuePrinted: false
errorName: PrismaClientInitializationError
errorCode: none
errorKind: db_unreachable
secretValuesPrinted: false
```

Program helper program-check:

```text
LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_FAILED
detailsRedacted: true
dataMutated: false
databaseUrlPresent: true
databaseUrlValuePrinted: false
secretValuesPrinted: false
```

Program helper program-align-readiness:

```text
LOCAL_DEV_SAFE_DB_PROGRAM_ALIGNMENT_READINESS_FAILED
detailsRedacted: true
dataMutated: false
databaseUrlPresent: true
databaseUrlValuePrinted: false
secretValuesPrinted: false
```

Program helper plan-paes-m2-program:

```text
LOCAL_DEV_SAFE_DB_PLAN_COMPLETED
dataMutated: false
expectedProgram: PAES_M2 / PAES Matemática M2 / PAES / active
requiresFutureAuthorization: true
secretValuesPrinted: false
```

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

This phase changed only documentation and the existing safe local/dev DB helper.

The repair is partial and intentionally stops before any Program alignment retry.

## Result

```text
LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_REPAIR_DOCUMENTED_BLOCKED
```

## Next recommended phase

```text
MVP-GOV-LOCAL-DEV-SAFE-DB-PROGRAM-CHECK-REPAIR-2
```
