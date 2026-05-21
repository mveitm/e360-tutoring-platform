# MVP-SALES-TRIAL-2H — StudentAccess Schema Verification and Implementation Closeout

## 1. Phase gate classification
- Roadmap block: 2 — Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2G closed at `4966bc0`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: documentation, verification, and readiness closeout only for the schema-only `StudentAccess` implementation.
- Explicit non-goals: no DB migration/push, Prisma Client generation as a separate command, DB mutation, SQL, seed, deploy, staging/prod, app runtime behavior, signup default-row behavior, backfill, student UI, admin UI/operations, trial runtime, billing/payment/subscription, enrollment, Program, LearningCycle, StudyLoad, Block 7, `/now`, auth/signup/login/admin guard changes, package changes, or schema changes.

## 2. Git preflight
- git status: clean at phase start.
- HEAD / origin/main: `4966bc07309c58f6c09e0367c8ac3ffb73e2980f` / `4966bc07309c58f6c09e0367c8ac3ffb73e2980f`.
- Baseline verdict: matches expected `HEAD = origin/main = 4966bc0`; working tree was clean before this documentation/verification phase.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2G_IMPLEMENT_MINIMAL_STUDENT_ACCESS_SCHEMA.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2F_TRIAL_ACCESS_SCHEMA_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2E_MINIMAL_TRIAL_ACCESS_SCHEMA_DESIGN.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2D_TRIAL_ACCESS_IMPLEMENTATION_READINESS_AUDIT.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md -Tail 1040`

Schema reviewed:
- `nextjs_space/prisma/schema.prisma`

Runtime usage check:
- Read-only `rg` search across `nextjs_space/app`, `nextjs_space/lib`, and `nextjs_space/prisma`, excluding `.env`, `.next`, `node_modules`, and logs.

Stale baseline note:
- Historical TRIAL documents retain their own phase baselines, including TRIAL-2G's pre-implementation baseline at `a0afe56`.
- Git preflight is the live source of truth. For this phase, the live accepted baseline is `HEAD = origin/main = 4966bc0`.

## 4. Schema verification summary
Confirmed:
- Student relation field exists: `access StudentAccess?`.
- `StudentAccess` model exists.
- `studentId` exists and is marked `@unique`.
- Approved fields exist: `id`, `studentId`, `accessStatus`, `trialStatus`, `subscriptionStatus`, `trialInvitedAt`, `trialActivatedAt`, `trialExpiresAt`, `trialExperienceUsedAt`, `tutoringDirection`, `continuityTarget`, `lastDecisionBy`, `lastDecisionAt`, `lastDecisionReason`, `createdAt`, and `updatedAt`.
- Relation exists: `student Student @relation(fields: [studentId], references: [id], onDelete: Cascade)`.
- Indexes exist for `accessStatus`, `trialStatus`, and `trialExpiresAt`.
- Table mapping uses `@@map("student_access")`.
- Status fields remain `String`; no Prisma enums were added.
- Relation boundaries are preserved: no direct relation to User, StudentProgramInstance, Program, LearningCycle, StudyLoad, billing provider, subscription provider, or Block 7 model.

## 5. Validation/build verification
- `npx.cmd prisma validate`: passed. Prisma loaded `prisma\schema.prisma` and reported the schema valid.
- `npm.cmd run build`: passed.
- Environment note: Prisma validate and Next build reported environment loading from `.env`, but no secret values were printed or inspected.
- Build note: Next build completed successfully; linting was skipped by the project build configuration.

## 6. Implementation closeout
- Schema-only implementation is complete in the repository.
- No DB table exists yet because no `prisma db push`, migration, or SQL was run in TRIAL-2G or TRIAL-2H.
- No Prisma Client generation was separately run in TRIAL-2H; only the authorized build command was executed after validation.
- No `StudentAccess` rows exist because no DB write, seed, signup default-row behavior, or backfill was run.
- No default-row behavior exists in signup.
- No backfill exists.
- No app runtime behavior uses `StudentAccess`.
- No student UI, admin UI, or admin operation uses `StudentAccess`.

## 7. Boundary preservation
Confirmed no:
- DB mutation;
- SQL;
- db push;
- migrate;
- migration file;
- seed;
- deploy;
- staging/prod;
- `.env`/secret inspection;
- app runtime behavior;
- signup default-row;
- backfill;
- admin UI;
- student UI;
- auth/signup/login/admin guard changes;
- `/now` changes;
- enrollment/trial/billing/payment/subscription;
- Program/LearningCycle/StudyLoad;
- Block 7.

## 8. Remaining technical gaps before runtime use
- DB application plan: decide how and when the `student_access` table is applied to local/dev and later environments.
- Prisma Client generation policy: decide whether client generation is a separate readiness phase, part of DB application, or only part of build/deploy flow.
- Validation helper/legal status pair enforcement: define application-level validation before any write endpoint can create or mutate access/trial state.
- Default-row policy for new signup: decide when signup should create `StudentAccess` with `no_access + none`.
- Backfill policy for existing students: decide non-destructive creation rules for students with and without active enrollment.
- Read integration in `/now`: design read-only behavior after table/client/readiness exists.
- Admin visibility/read operations: design safe read surfaces before mutation surfaces.
- Mutation endpoints/audit requirements: require legal transition checks, actor/reason capture, and `AuditEvent` policy before any access state write.

## 9. Next-step options
### A. Apply schema to local/dev DB in a controlled DB phase
- Benefit: creates the actual `student_access` table needed before rows or runtime reads can exist.
- Risk: DB mutation requires explicit authorization and must avoid staging/prod ambiguity.
- Dependency: accepted schema-only closeout and controlled DB application plan.
- Recommended now: yes, as readiness/planning first; execute DB mutation only in an explicitly authorized DB phase.

### B. Generate Prisma Client only, without DB mutation
- Benefit: exposes Prisma types/model access for future implementation planning.
- Risk: generated client without DB table can tempt runtime reads/writes that fail until DB application exists.
- Dependency: clear policy that no runtime code uses `StudentAccess` before table readiness.
- Recommended now: not as the next cut unless DB application is intentionally deferred.

### C. Design StudentAccess validation helper
- Benefit: prevents illegal `accessStatus`/`trialStatus` pairs before write endpoints exist.
- Risk: helper design may drift if DB/client application policy is unresolved.
- Dependency: accepted legal pair matrix from TRIAL-2F.
- Recommended now: useful soon, but after deciding DB/client readiness order.

### D. Design default-row/backfill readiness
- Benefit: defines how every student gets a predictable access row before `/now` or admin reads depend on it.
- Risk: easy to cross into DB mutation or signup behavior if not kept as design/readiness.
- Dependency: DB application plan and validation helper policy.
- Recommended now: not before DB application readiness is clarified.

### E. Defer DB application until deployment/migration strategy is clarified
- Benefit: avoids accidental local/dev schema drift and keeps mutation risk at zero.
- Risk: blocks any runtime use, default rows, backfill, admin reads, and realistic trial state implementation.
- Dependency: deployment/migration strategy decision.
- Recommended now: acceptable only if migration strategy is unclear; otherwise it slows Block 2.

## 10. Recommended next phase
Recommended next phase:
- `MVP-SALES-TRIAL-2I — StudentAccess DB application readiness`

Reason:
- The schema is valid and closed as schema-only, but `StudentAccess` cannot be used by runtime until there is an explicit, controlled plan for applying `student_access` to DB and coordinating Prisma Client generation. The next phase should remain narrow and should not implement UI, admin mutation, trial runtime, default-row behavior, or backfill.

## 11. Final verdict
STUDENT_ACCESS_SCHEMA_VERIFIED_NEEDS_DB_APPLICATION_READINESS
