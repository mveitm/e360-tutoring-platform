# MVP-SALES-TRIAL-2T - Implement Pure StudentAccess Validation Helper

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2S closed at `cca7179`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: implement a pure, deterministic, DB-free TypeScript `StudentAccess` validation helper and self-contained DB-free assertion test.
- Explicit non-goals: no app route changes, no runtime integration, no imports from app files, no Prisma imports, no `@prisma/client` imports, no `lib/prisma` imports, no `lib/db` imports, no schema edit, no package change, no package-lock change, no npm install, no Prisma CLI, no DB mutation, no SQL, no seed, no `.env` access, no secrets printed, no UI/admin, no signup default-row behavior, no backfill, no `/now` read, no mutation endpoints, no `AuditEvent` writes, no billing/payment/subscription integration, no Program/LearningCycle/StudyLoad, no enrollment automation, no Block 7, no deploy, no generated PDF/DOCX artifacts, no commit, and no push.

## 2. Git preflight
- `git status --short`: clean at phase start.
- HEAD / origin/main: `cca7179` / `cca7179`.
- Baseline verdict: matches expected `HEAD = origin/main = cca7179`; working tree was clean before this implementation phase.
- Git preflight is the live truth.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2S_STUDENT_ACCESS_VALIDATION_HELPER_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2R_STUDENT_ACCESS_VALIDATION_HELPER_DESIGN.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Q_STUDENT_ACCESS_DB_APPLICATION_VERIFICATION_CLOSEOUT.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2F_TRIAL_ACCESS_SCHEMA_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md` tail relevant to TRIAL-2Q through TRIAL-2S.

Read-only inspected:
- `nextjs_space/package.json`
- `nextjs_space/tsconfig.json`
- existing `nextjs_space/lib` folder structure.

## 4. Implementation summary
- Added `nextjs_space/lib/student-access-validation.ts`.
- Added status constants and string literal union types for legal access/trial statuses.
- Added `LEGAL_STUDENT_ACCESS_PAIRS` for the first-cut persisted pair policy.
- Added runtime status guards.
- Added pure snapshot validation with deterministic `options.now`.
- Added pure transition validation with deterministic `context.now`.
- Added conservative error categories for unknown status, illegal pair, missing/prohibited fields, invalid timestamps, expired active states, invalid transitions, missing decision context, subscription policy gaps, and scope violations.
- Added a self-contained assertion test file using only `node:assert/strict` and the local helper import.

## 5. Files changed
- `nextjs_space/lib/student-access-validation.ts`
- `nextjs_space/lib/student-access-validation.test.ts`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2T_IMPLEMENT_PURE_STUDENT_ACCESS_VALIDATION_HELPER.md`
- `PHASE_LOG.md`

## 6. Helper API summary
Exports:
- `STUDENT_ACCESS_STATUSES`
- `STUDENT_TRIAL_STATUSES`
- `StudentAccessStatus`
- `StudentTrialStatus`
- `StudentAccessValidationInput`
- `StudentAccessValidationOptions`
- `StudentAccessValidationIssueCategory`
- `StudentAccessValidationIssue`
- `StudentAccessValidationResult`
- `StudentAccessTransitionContext`
- `LEGAL_STUDENT_ACCESS_PAIRS`
- `isStudentAccessStatus`
- `isStudentTrialStatus`
- `validateStudentAccessSnapshot`
- `validateStudentAccessTransition`

The helper has no Prisma, DB, Next.js, React, auth, filesystem, process, env, network, or runtime imports.

## 7. Test summary
The assertion test covers:
- legal status guards;
- legal pair map acceptance;
- illegal pair rejection;
- `cancelled` recognized but rejected as persisted first-cut pair;
- invitation timestamp requirements and prohibited active timestamps;
- active trial timestamp requirements;
- `trialExpiresAt > trialActivatedAt`;
- `now >= trialExpiresAt` returning `EXPIRED_STATE`;
- `experience_used` timestamp requirement;
- conservative `subscriptionStatus` handling;
- transition actor/reason requirements;
- unsafe `no_access -> enrolled_active_program` rejection;
- limited import structure by construction.

## 8. Verification results
Commands run:

```powershell
git diff --check
cd nextjs_space
npx.cmd tsx lib/student-access-validation.test.ts
cd ..
git diff --stat
git status --short
```

Build was not run because current strict non-goals include no `.env` access, and the project build may load environment configuration.

## 9. Explicit non-goals preserved
Confirmed no:
- app route changes;
- runtime integration;
- imports from app files;
- Prisma imports;
- `@prisma/client` imports;
- `lib/prisma` imports;
- `lib/db` imports;
- schema edit;
- package change;
- package-lock change;
- npm install;
- Prisma CLI;
- DB mutation;
- SQL;
- seed;
- `.env` access;
- secrets printed;
- UI/admin;
- signup default-row behavior;
- backfill;
- `/now` read;
- mutation endpoints;
- `AuditEvent` writes;
- billing/payment/subscription integration;
- Program/LearningCycle/StudyLoad;
- enrollment automation;
- Block 7;
- deploy;
- generated PDF/DOCX artifacts;
- commit;
- push.

## 10. Remaining gaps
- No runtime uses the helper yet.
- No signup default-row behavior exists.
- No backfill exists.
- No `/now` read integration exists.
- No admin read/mutation behavior exists.
- No `AuditEvent` write behavior exists.
- No billing/payment/subscription integration exists.
- No enrollment, Program, LearningCycle, StudyLoad, or Block 7 integration exists.

## 11. Recommended next phase
Recommended next phase:
- `MVP-SALES-TRIAL-2U - StudentAccess validation helper closeout and next integration boundary`

Scope:
- close out the pure helper implementation and define the next integration boundary before any runtime/default-row/backfill/admin/read/write behavior.

## 12. Final verdict
PURE_STUDENT_ACCESS_VALIDATION_HELPER_IMPLEMENTED
