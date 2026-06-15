# MVP-GOV-LOCAL-DEV-DB-CONNECTIVITY-RECOVERY-1

## Purpose

Recover the safe LOCAL_DEV DB confirmation path after `MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-ALIGNMENT-1B` stopped with:

```text
STOP_NOT_LOCAL_DEV
```

This phase does not retry `Program PAES_M2`, does not query Program state, and does not mutate DB.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 1b55751e729f607205511a5482dadeeb4cb8a0d2
```

## Preflight result

Preflight passed.

```text
working tree: clean
HEAD: 1b55751e729f607205511a5482dadeeb4cb8a0d2
origin/main: 1b55751e729f607205511a5482dadeeb4cb8a0d2
origin/HEAD: 1b55751e729f607205511a5482dadeeb4cb8a0d2
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_TOOLING_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1B.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1.md`

Tooling files read:

- `nextjs_space/scripts/local-dev-safe-db-tool.ts`
- `nextjs_space/scripts/local-dev-db-availability-check.ts`
- `nextjs_space/scripts/lib/load-local-env-private.ts`

## Prior blocker

Program alignment retry 1B used the newly created safe DB helper and stopped because `check-programs` failed safely:

```text
LOCAL_DEV_SAFE_DB_CHECK_FAILED
detailsRedacted: true
dataMutated: false
databaseUrlValuePrinted: false
secretValuesPrinted: false
```

The stop was correct because a Program-specific read-only check did not complete, and mutation must not proceed when the safe precondition is unclear.

## Tooling inspected

Existing safe tooling:

- `local-dev-db-availability-check.ts`: dedicated read-only availability check, generic DB read, redacted failure output.
- `local-dev-safe-db-tool.ts`: Program-specific read/plan/future mutation helper, redacted failure output.

The tooling location is clear:

```text
nextjs_space/scripts
```

## Root cause of STOP_NOT_LOCAL_DEV

Root cause:

```text
The 1B phase treated `local-dev-safe-db-tool.ts --mode check-programs` as the LOCAL_DEV confirmation gate.
```

That was too strict for local/dev confirmation because `check-programs` combines two responsibilities:

1. DB/local-dev connectivity confirmation.
2. Program-specific PAES_M1/PAES_M2 state inspection.

When the Program-specific check failed safely, the phase could not distinguish "LOCAL_DEV unavailable" from "Program-specific check unavailable." The safe result was to stop, but the protocol needed recovery.

## Recovery action

Recovery action:

```text
Use `local-dev-db-availability-check.ts` as the canonical LOCAL_DEV connectivity confirmation gate.
Use `local-dev-safe-db-tool.ts --mode check-programs` only after LOCAL_DEV connectivity has been confirmed.
```

No code change was required.

The Program-specific helper was left unchanged because it already fails safely without printing secrets. The protocol correction is to avoid using Program-specific checks as the sole local/dev signal.

## Safe local/dev confirmation strategy

Canonical confirmation command for future phases:

```text
tsx scripts/local-dev-db-availability-check.ts \
  --mode check \
  --target-class LOCAL_DEV_CONFIRMED \
  --confirm-no-real-data \
  --confirm-no-production \
  --confirm-no-staging \
  --confirm-read-only
```

Required interpretation:

```text
LOCAL_DEV_DB_AVAILABLE
readCheck: passed
NO DATA MUTATED
NO SECRET VALUES PRINTED
```

Only after that may a future phase run Program-specific checks through:

```text
local-dev-safe-db-tool.ts --mode check-programs
```

Mutation remains separately gated and forbidden in this recovery phase.

## Read-only validation performed

Read-only validation executed:

```text
local-dev-db-availability-check.ts --mode check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Result:

```text
LOCAL_DEV_DB_AVAILABLE
readCheck: passed
NO DATA MUTATED
NO SECRET VALUES PRINTED
```

Additional diagnostic:

```text
local-dev-safe-db-tool.ts --mode confirm-local-dev
```

An experimental confirm mode was tested during diagnosis and then removed before commit because the existing canonical checker already provides the safe confirmation path. No tooling file remains modified from that experiment.

## Secret-safety verification

No `.env`, `DATABASE_URL`, connection string, token, cookie, secret, private key or credential value was printed.

The repository search used path-only output where broad matching was needed. No sensitive values were printed.

## Explicit non-actions

- No DB mutation.
- No Program PAES_M2 creation or alignment.
- No Program PAES_M2 retry.
- No Program table query required for final validation.
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

This was a read-only connectivity recovery and protocol documentation phase.

Only documentation files were modified.

## Result

```text
LOCAL_DEV_DB_CONNECTIVITY_RECOVERED
```

## Next recommended phase

```text
MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-ALIGNMENT-1C
```
