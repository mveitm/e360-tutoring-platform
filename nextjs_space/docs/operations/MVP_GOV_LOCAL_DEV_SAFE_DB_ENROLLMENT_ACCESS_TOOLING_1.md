# MVP-GOV-LOCAL-DEV-SAFE-DB-ENROLLMENT-ACCESS-TOOLING-1

## Purpose

Extend the safe LOCAL_DEV DB tooling so a future human-local phase can prepare PAES_M2 / M2-C01 access with sanitized read-only checks, plan-only output, and a guarded mutation mode.

This phase does not execute DB checks from Codex, does not execute DB mutation, and does not create StudentAccess, enrollment, StudentProgramInstance, LearningCycle or StudyLoad.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = b31e24b977728e94a1d0236eda253be957917797
```

## Preflight result

Preflight passed from repository root.

```text
working tree: clean
HEAD: b31e24b977728e94a1d0236eda253be957917797
origin/main: b31e24b977728e94a1d0236eda253be957917797
origin/HEAD: b31e24b977728e94a1d0236eda253be957917797
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_ENROLLMENT_ACCESS_PREP_2.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_HUMAN_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_CODEX_EXECUTION_REPAIR_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_CODEX_EXECUTION_REPAIR_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_HUMAN_UI_SMOKE_ACCESS_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_HUMAN_UI_SMOKE_READINESS_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_STATIC_REVIEW_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_AUTHORED_IMPLEMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_TOOLING_1.md`

Static files inspected:

- `nextjs_space/scripts/local-dev-db-availability-check.ts`
- `nextjs_space/scripts/local-dev-safe-db-tool.ts`
- `nextjs_space/scripts/lib/load-local-env-private.ts`
- `nextjs_space/prisma/schema.prisma`
- `nextjs_space/app/api/instances/route.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/lib/paes-m1-first-capsule.ts`
- `nextjs_space/lib/study-load-content.ts`

## Prior blocker

`ENROLLMENT-ACCESS-PREP-2` stopped because no safe explicit enrollment/access tooling existed for M2-C01.

Prior result:

```text
STOP_SAFE_TOOLING_EXTENSION_REQUIRED
```

## Tooling gap

Existing safe DB tooling was Program-focused and did not expose explicit M2 enrollment/access read-only or guarded mutation modes.

The gap was:

- no M2 access precheck mode;
- no M2-C01 access plan-only mode;
- no guarded future M2-C01 access mutation mode;
- no M2 access postcheck mode;
- no sanitized target-student handling for this flow.

## Design decision

The existing `nextjs_space/scripts/local-dev-safe-db-tool.ts` was extended instead of creating a separate script.

Reason:

```text
It already contains the safe local/dev DB guardrail pattern, sanitized JSON output, no raw Prisma error printing, Program PAES_M2 metadata, and mutation flag discipline.
```

`nextjs_space/scripts/local-dev-db-availability-check.ts` and `nextjs_space/scripts/lib/load-local-env-private.ts` were inspected but not modified.

## Modes added or updated

Added to `local-dev-safe-db-tool.ts`:

```text
m2-access-precheck
plan-m2-c01-access
align-m2-c01-access
m2-access-postcheck
```

Existing Program modes remain available and unchanged in intent:

```text
confirm-local-dev
program-check
program-align-readiness
check-programs
plan-paes-m2-program
align-paes-m2-program
```

## Read-only precheck contract

Future human-local command class:

```powershell
npx tsx scripts/local-dev-safe-db-tool.ts --mode m2-access-precheck --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only --target-student-email <target-student-email>
```

Equivalent target selector:

```powershell
--target-student-id <target-student-id>
```

The tool does not print the target identifier.

Required sanitized output includes:

```text
status
mode
targetStudentResolved: true/false
targetStudentIdentifierPrinted: false
databaseUrlPresent: true/false
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
programs.PAES_M2.present/status
studentAccess.present
paesM2StudentProgramInstance.present
m2LearningCycle.present
m2C01StudyLoad.present
m2C01StudyLoadReachableCandidate.present
```

## Plan-only contract

Future human-local command class:

```powershell
npx tsx scripts/local-dev-safe-db-tool.ts --mode plan-m2-c01-access --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only --target-student-email <target-student-email>
```

The plan mode does not mutate DB.

It returns:

```text
wouldCreateStudentProgramInstance: true/false
wouldCreateLearningCycle: true/false
wouldCreateStudyLoad: true/false
wouldMutateStudentAccess: false
mutationRequired: true/false
scopeExpansionRequired: false
requiresFutureAuthorization.StudentProgramInstance: true/false
requiresFutureAuthorization.LearningCycle: true/false
requiresFutureAuthorization.StudyLoad: true/false
requiresFutureAuthorization.StudentAccess: false
targetStudentRequired: true/false
```

If no target selector is provided, the tool returns `targetStudentResolved: false` and `targetStudentRequired: true` without printing identifiers.

## Future mutation contract

Future human-local command class, only after explicit authorization:

```powershell
npx tsx scripts/local-dev-safe-db-tool.ts --mode align-m2-c01-access --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-local-dev-mutation --confirm-m2-c01-access-only --confirm-no-payment --phase <authorized-phase-id> --execute-mutation --target-student-email <target-student-email>
```

This phase does not authorize or execute that mutation.

Mutation guardrails:

- requires `--execute-mutation`;
- requires `--confirm-local-dev-mutation`;
- requires `--confirm-m2-c01-access-only`;
- requires `--confirm-no-payment`;
- requires `--phase <authorized-phase-id>`;
- requires a safely resolved target student;
- blocks if `Program PAES_M2` is absent or not active;
- blocks inactive existing PAES_M2 enrollment instead of silently reactivating it;
- does not mutate StudentAccess;
- does not mutate payment/subscription;
- prints only sanitized JSON.

Future mutation scope supported by the tool:

```text
PAES_M2 StudentProgramInstance
M2 LearningCycle
M2-C01 StudyLoad
```

The tool reports explicit mutation flags:

```text
studentAccessMutated
enrollmentMutated
studentProgramInstanceMutated
learningCycleMutated
studyLoadMutated
paymentMutated
prodTouched
stagingTouched
secretValuesPrinted
```

## Target student handling

No target student was invented in this phase.

The future human-local phase must provide one of:

```text
--target-student-email <target-student-email>
--target-student-id <target-student-id>
```

The script uses the selector only inside the local process and prints:

```text
targetStudentResolved: true/false
targetStudentIdentifierPrinted: false
```

It does not print email, student id, user id or student name.

## Secret-safety guarantees

The added modes preserve the existing secret-safety model:

- no `.env` printing;
- no `DATABASE_URL` value printing;
- no DB URL printing;
- no DB host printing;
- no connection string printing;
- no raw Prisma error printing;
- sanitized `classifyError` output only;
- `databaseUrlValuePrinted: false`;
- `secretValuesPrinted: false`;
- no table dumps;
- no target identifier printing.

## Explicit non-actions

- No DB check executed from Codex.
- No DB mutation.
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
- No package changes.
- No prod/staging.
- No payment/subscription changes.
- No agentic layer opened.
- No secrets printed.

## Validation

Validation performed:

```text
npx.cmd tsc --noEmit --pretty false
git diff --check
git status --short
git log --oneline --decorate --graph -8
```

No DB tooling was executed from Codex.

No build was run because this phase did not require a full application build and DB execution remained prohibited. The TypeScript static check passed without DB access.

## Scope safety

This was a safe tooling/documentation phase. It modified only authorized documentation and the existing safe local/dev DB tool.

The future mutation mode is present but inert unless a later phase supplies explicit human authorization and all guard flags.

## Result

```text
LOCAL_DEV_SAFE_DB_ENROLLMENT_ACCESS_TOOLING_READY
```

## Next recommended phase

```text
MVP-SALES-PILOT-M2-C01-LOCAL-DEV-ENROLLMENT-ACCESS-HUMAN-AUTHORIZATION-1
```
