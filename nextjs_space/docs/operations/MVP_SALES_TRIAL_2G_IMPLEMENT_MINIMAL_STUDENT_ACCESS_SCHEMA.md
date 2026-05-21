# MVP-SALES-TRIAL-2G - Implement Minimal StudentAccess Schema

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2F closed at `a0afe56`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: schema-only implementation of the minimal `StudentAccess` model and optional 1:1 Student relation.
- Explicit non-goals: no student UI, admin UI/operations, default-row behavior, backfill, trial runtime, billing/payment real, enrollment creation, Program creation, LearningCycle creation, StudyLoad creation, PAES path assignment, Block 7, app runtime behavior, DB mutation, migration, db push, SQL, seed, deploy, staging/prod, or generated artifacts.

## 2. Git preflight
- git status: clean.
- HEAD / origin/main: `a0afe56dc9151adbeb87146bd6979b4e85b8d85e` / `a0afe56dc9151adbeb87146bd6979b4e85b8d85e`.
- Baseline verdict: matches expected baseline `HEAD = origin/main = a0afe56`; working tree was clean before this schema-only phase.

## 3. Inputs reviewed
Docs reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2F_TRIAL_ACCESS_SCHEMA_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2E_MINIMAL_TRIAL_ACCESS_SCHEMA_DESIGN.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2D_TRIAL_ACCESS_IMPLEMENTATION_READINESS_AUDIT.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2C_TRIAL_ACCESS_STATE_MODEL_FROM_CANONICAL_STAGES.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md -Tail 980`

Schema reviewed:
- `nextjs_space/prisma/schema.prisma`

Stale baseline note: historical TRIAL docs retain their own baselines, and older roadmap context may still appear in prior documents. Git preflight and the accepted commit chain are the live source of truth.

## 4. Implementation summary
- Added `StudentAccess` model to `nextjs_space/prisma/schema.prisma`.
- Added optional 1:1 relation field on `Student`:
  - `access StudentAccess?`
- Added `StudentAccess` fields:
  - `id`
  - `studentId @unique`
  - `accessStatus @default("no_access")`
  - `trialStatus @default("none")`
  - `subscriptionStatus @default("none")`
  - `trialInvitedAt`
  - `trialActivatedAt`
  - `trialExpiresAt`
  - `trialExperienceUsedAt`
  - `tutoringDirection`
  - `continuityTarget`
  - `lastDecisionBy`
  - `lastDecisionAt`
  - `lastDecisionReason`
  - `createdAt`
  - `updatedAt`
- Added relation:
  - `student Student @relation(fields: [studentId], references: [id], onDelete: Cascade)`
- Added indexes:
  - `@@index([accessStatus])`
  - `@@index([trialStatus])`
  - `@@index([trialExpiresAt])`
- Used `@@map("student_access")` because the existing domain tables use explicit snake_case table mappings such as `@@map("students")`, `@@map("student_program_instances")`, and `@@map("study_loads")`.
- No enums were added; status fields remain `String` for consistency with existing schema style and future application validation.
- No runtime behavior was added.

## 5. Schema boundary preservation
Confirmed:
- no User relation;
- no StudentProgramInstance relation;
- no Program relation;
- no LearningCycle relation;
- no StudyLoad relation;
- no billing provider relation;
- no subscription provider relation;
- no Block 7 relation;
- no FK User/Student hardening.

## 6. Non-goals preserved
Confirmed:
- no app code outside schema;
- no package change;
- no deploy;
- no staging/prod;
- no SQL;
- no DB mutation;
- no db push;
- no migrate;
- no migration file;
- no seed;
- no dev server;
- no `.env`/secret inspection;
- no account creation;
- no StudentAccess rows;
- no backfill;
- no default-row behavior;
- no enrollment/trial/billing/payment/subscription;
- no Program/LearningCycle/StudyLoad;
- no auth/signup/login/admin guard;
- no `/now`;
- no admin UI;
- no Block 7.

## 7. Verification results
- `npx prisma validate`: direct PowerShell `npx` was blocked by local execution policy for `npx.ps1`; equivalent `npx.cmd prisma validate` passed. Prisma reported the schema at `prisma\schema.prisma` is valid. It reported environment variables loaded from `.env` but printed no secret values.
- `npm.cmd run build`: passed.
- `git diff --check`: passed with LF/CRLF warnings only.
- `git diff --stat` after `git add -N`:

```text
 PHASE_LOG.md                                       |  84 +++++++++++++
 ...L_2G_IMPLEMENT_MINIMAL_STUDENT_ACCESS_SCHEMA.md | 133 +++++++++++++++++++++
 nextjs_space/prisma/schema.prisma                  |  27 +++++
 3 files changed, 244 insertions(+)
```

- `git status --short` after `git add -N`:

```text
 M PHASE_LOG.md
 A nextjs_space/docs/operations/MVP_SALES_TRIAL_2G_IMPLEMENT_MINIMAL_STUDENT_ACCESS_SCHEMA.md
 M nextjs_space/prisma/schema.prisma
```

## 8. Risks and follow-ups
- Prisma Client generation may be needed in a later phase if app code reads or writes `StudentAccess`.
- No DB table exists until an explicitly authorized DB migration or db push phase.
- No rows exist until explicitly authorized default-row and/or backfill phases.
- No UI, admin operation, or runtime uses the model yet.
- Legal status validation helper is still needed before any mutation endpoint can create or change access/trial states.
- The direct `npx` wrapper is blocked by local PowerShell execution policy; use `npx.cmd` for Windows verification unless policy changes.

## 9. Recommended next phase
`MVP-SALES-TRIAL-2H - StudentAccess schema verification and implementation closeout`

Scope: documentation/readiness only. Confirm the schema-only implementation boundaries, decide whether Prisma Client generation and DB migration/push should be separately authorized, and define the next safe implementation cut before default-row, backfill, UI, admin operations, or runtime behavior.

## 10. Final verdict
MINIMAL_STUDENT_ACCESS_SCHEMA_IMPLEMENTED
