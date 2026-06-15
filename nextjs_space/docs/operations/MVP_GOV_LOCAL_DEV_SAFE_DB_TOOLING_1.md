# MVP-GOV-LOCAL-DEV-SAFE-DB-TOOLING-1

## Purpose

Create and formalize a safe path for future Codex phases to inspect and, only with explicit human authorization, mutate LOCAL_DEV DB state without printing secrets or depending on improvised Prisma commands.

This phase resolves the prior `STOP_SECRETS_RISK` blocker by replacing ad hoc inline Prisma usage with a small sanitized helper and a governance protocol for future LOCAL_DEV DB phases.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 6afd37e2d79e61f5406ea5ff7658c13a1de5540d
```

## Preflight result

Preflight passed.

```text
working tree: clean
HEAD: 6afd37e2d79e61f5406ea5ff7658c13a1de5540d
origin/main: 6afd37e2d79e61f5406ea5ff7658c13a1de5540d
origin/HEAD: 6afd37e2d79e61f5406ea5ff7658c13a1de5540d
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_M2_SPECIFIC_PEDAGOGICAL_DERIVATION_1.md`
- `nextjs_space/docs/operations/PAES_M2_PEDAGOGICAL_BRANCH_INDEX.md`

## Prior blocker

The previous Program PAES_M2 local/dev alignment attempt stopped under:

```text
STOP_SECRETS_RISK
```

Conceptual cause:

```text
A direct inline Prisma command did not mutate data, but a Prisma initialization error path emitted connection-target details. Future phases must not use improvised DB commands that can surface raw client errors.
```

No secret value is repeated in this document.

## Existing DB tooling inspected

Existing local/dev DB-related scripts inspected:

- `nextjs_space/scripts/local-dev-db-availability-check.ts`
- `nextjs_space/scripts/student-access-backfill-dry-run.ts`
- `nextjs_space/scripts/student-access-backfill-apply.ts`
- `nextjs_space/scripts/safe-seed.ts`
- `nextjs_space/scripts/lib/load-local-env-private.ts`

Findings:

- The existing local/dev availability checker already catches Prisma errors and prints redacted output.
- Existing backfill scripts are purpose-specific and not suitable as a general future Program-alignment guard.
- `nextjs_space/scripts` is the established location for local operational scripts.
- A new small helper is justified because future PAES_M2 Program alignment needs Program-specific read/plan/mutation modes with no secret printing.

## Safe local/dev DB rules

Future local/dev DB phases must follow these rules:

- Never print `.env`.
- Never print `DATABASE_URL`.
- Never print connection strings.
- Confirm LOCAL_DEV by safe non-sensitive flags/signals.
- Separate read-only checks from mutation.
- Require explicit human authorization before mutation.
- Document every mutation.
- Never mix Program alignment with enrollment/access.
- Use summarized statuses, not table dumps.
- If any secret risk appears, stop immediately.

## Local/dev confirmation strategy

The safe strategy is:

1. Require phase-level baseline and working tree preflight.
2. Require `--target-class LOCAL_DEV_CONFIRMED`.
3. Require `--confirm-no-production`.
4. Require `--confirm-no-staging`.
5. For read-only modes, require `--confirm-read-only`.
6. For future mutation modes, require separate mutation flags and phase id.
7. Never print environment variable values.

The helper may report only:

```text
databaseUrlPresent: true/false
databaseUrlValuePrinted: false
```

## Secret-safety rules

The helper must:

- catch DB/client errors;
- avoid `console.error(error)`;
- avoid raw stack traces;
- print `detailsRedacted: true` on failure;
- print `secretValuesPrinted: false`;
- avoid row dumps and IDs unless a future phase explicitly scopes non-sensitive IDs;
- avoid dumping env, cookies, tokens, credentials or connection targets.

## Read-only check pattern

Allowed read-only pattern:

```text
tsx scripts/local-dev-safe-db-tool.ts \
  --mode check-programs \
  --target-class LOCAL_DEV_CONFIRMED \
  --confirm-no-production \
  --confirm-no-staging \
  --confirm-read-only
```

Expected output is a sanitized JSON summary with:

```text
status
mode
databaseUrlPresent
databaseUrlValuePrinted
dataMutated
programs.PAES_M1.present
programs.PAES_M2.present
secretValuesPrinted
```

No DB values, URLs, secrets, student rows, enrollments, StudyLoads or table dumps should be printed.

## Mutation authorization pattern

Mutation is disabled by default.

Future mutation requires:

- explicit phase prompt authorization;
- explicit human authorization for the exact mutation;
- `--target-class LOCAL_DEV_CONFIRMED`;
- `--confirm-no-production`;
- `--confirm-no-staging`;
- `--confirm-local-dev-mutation`;
- `--confirm-program-only`;
- `--confirm-no-enrollment`;
- `--phase <PHASE_ID>`;
- `--execute-mutation`.

If any guard is absent, the helper must exit without creating `PrismaClient` mutation intent and without writing.

## Allowed future mutation pattern

For the next PAES_M2 Program alignment retry only, the allowed future mutation pattern is:

```text
tsx scripts/local-dev-safe-db-tool.ts \
  --mode align-paes-m2-program \
  --target-class LOCAL_DEV_CONFIRMED \
  --confirm-no-production \
  --confirm-no-staging \
  --confirm-local-dev-mutation \
  --confirm-program-only \
  --confirm-no-enrollment \
  --phase MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-ALIGNMENT-1B \
  --execute-mutation
```

Allowed mutation scope:

```text
Program PAES_M2 only
```

Required PAES_M2 Program metadata:

```text
code: PAES_M2
name: PAES Matematica M2
vertical: PAES
status: active
```

## Explicitly prohibited patterns

Prohibited:

- inline Prisma one-liners for DB operations;
- printing raw Prisma errors;
- printing stack traces that include connection targets;
- printing `.env`;
- printing `DATABASE_URL`;
- dumping full tables;
- mixing Program alignment with StudentAccess/enrollment/StudentProgramInstance/LearningCycle/StudyLoad;
- schema/Prisma edits;
- migrations;
- `prisma db push`;
- DB reset;
- seed reset;
- prod/staging targets;
- payment/subscription mutation;
- M2-C01 content/authoredFeedback mutation.

## Tooling created or selected

Created helper:

```text
nextjs_space/scripts/local-dev-safe-db-tool.ts
```

Modes:

```text
check-programs
plan-paes-m2-program
align-paes-m2-program
```

Properties:

- local/dev guarded;
- no secret printing by design;
- read-only by default;
- mutation disabled by default;
- future mutation requires explicit flags and phase id;
- supports safe Program PAES_M1/PAES_M2 presence checks;
- exits with redacted errors if DB/client access fails;
- prints only summarized JSON statuses.

## Validation performed

Validation commands executed:

```text
local-dev-safe-db-tool.ts --mode plan-paes-m2-program ... --confirm-read-only
local-dev-safe-db-tool.ts --mode check-programs ... --confirm-read-only
```

Results:

```text
plan-paes-m2-program: passed, no DB mutation, no secret values printed
check-programs: failed safely with redacted details, no DB mutation, no secret values printed
```

The safe failure of `check-programs` is acceptable for this phase because the blocker being resolved is unsafe output, not DB connectivity. The helper suppressed raw Prisma/client error details and printed only sanitized status fields.

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
- No prod/staging.
- No payment/subscription changes.
- No agentic layer opened.

## Scope safety

This phase created only governance documentation and one small local/dev DB safety helper under the established scripts directory.

No secrets, tokens, cookies, DB URLs, `.env` values, credentials, private keys or connection strings were printed.

## Result

```text
LOCAL_DEV_SAFE_DB_TOOLING_CREATED
```

## Next recommended phase

```text
MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-ALIGNMENT-1B
```
