# MVP-SALES-TRIAL-2U - StudentAccess Validation Helper Closeout and Next Integration Boundary

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2T closed at `7406d33`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: documentation/readiness closeout for the pure `StudentAccess` validation helper and definition of the next integration boundary.
- Explicit non-goals: no app code changes, no helper code changes, no test code changes, no schema edit, no package change, no package-lock change, no npm install, no Prisma CLI, no DB mutation, no SQL, no seed, no `.env` access, no secrets printed, no UI/admin change, no signup default-row behavior, no backfill, no `/now` read integration, no admin read integration, no mutation endpoints, no `AuditEvent` writes, no billing/payment/subscription integration, no Program/LearningCycle/StudyLoad, no enrollment automation, no Block 7, no deploy, no generated PDF/DOCX artifacts, no commit, and no push.

## 2. Git preflight result
- `git status --short`: clean at phase start.
- HEAD / origin/main: `7406d33` / `7406d33`.
- Baseline verdict: matches expected `HEAD = origin/main = 7406d33`; working tree was clean before this documentation/readiness phase.
- Git preflight is the live truth.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2T_IMPLEMENT_PURE_STUDENT_ACCESS_VALIDATION_HELPER.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2S_STUDENT_ACCESS_VALIDATION_HELPER_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2R_STUDENT_ACCESS_VALIDATION_HELPER_DESIGN.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Q_STUDENT_ACCESS_DB_APPLICATION_VERIFICATION_CLOSEOUT.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md` tail relevant to TRIAL-2Q through TRIAL-2T.

Read-only inspected:
- `nextjs_space/lib/student-access-validation.ts`
- `nextjs_space/lib/student-access-validation.test.ts`
- `nextjs_space/app/api/signup/route.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`
- `nextjs_space/prisma/schema.prisma`

## 4. 2T closeout summary
TRIAL-2T implemented the isolated validation boundary that earlier phases required before any `StudentAccess` write path can exist.

2T added:
- pure TypeScript helper at `nextjs_space/lib/student-access-validation.ts`;
- DB-free assertion test at `nextjs_space/lib/student-access-validation.test.ts`;
- legal access/trial status constants;
- legal first-cut pair map;
- status guards;
- snapshot validator;
- transition validator;
- deterministic clock input;
- structured errors and warnings.

TRIAL-2T did not integrate the helper into signup, `/now`, admin, mutation endpoints, audit writes, billing, enrollment, Program/LearningCycle/StudyLoad, or runtime enforcement.

## 5. Helper implementation status
Current helper status:
- pure: yes;
- deterministic: yes, validation requires supplied `now`;
- DB-free: yes;
- no Prisma imports: yes;
- no `@prisma/client`, `lib/prisma`, or `lib/db` imports: yes;
- no runtime consumers: yes;
- tested with DB-free `tsx` assertion test: yes, per TRIAL-2T;
- no package/test-runner change: yes.

Read-only review found no runtime import from the inspected signup, `/now`, admin detail, or schema surfaces.

## 6. What 2T does NOT make true
TRIAL-2T does not mean:
- `StudentAccess` rows exist;
- signup creates a default row;
- existing students are backfilled;
- signup behavior changed;
- `/now` behavior changed;
- admin behavior changed;
- any mutation endpoint exists;
- any `AuditEvent` write exists for access decisions;
- billing/subscription linkage exists;
- access blocking exists;
- trial runtime enforcement exists;
- enrollment, Program, LearningCycle, StudyLoad, or Block 7 behavior exists.

The helper is a validation prerequisite only.

## 7. Candidate next integration boundaries
### A. Signup default-row readiness
- Advances: defines whether new signup should create `StudentAccess` with `no_access + none`.
- Dependencies: accepted helper, row lifecycle policy, audit/default decision fields, DB availability.
- Risks: can become app code and DB writes too early; may create rows for new students while old students still lack rows.
- Should it be next: yes, but only combined with backfill policy readiness so future reads do not branch on missing rows.
- DB mutation: no if readiness/design only; yes if implemented later.
- Student-facing behavior: no if readiness only; later implementation should still not change visible trial/access behavior by itself.

### B. Existing-student backfill readiness
- Advances: defines how every existing student gets a predictable `StudentAccess` row.
- Dependencies: accepted helper, active enrollment detection policy, target DB/rollback rules, default row semantics.
- Risks: directly touches existing data if implemented; unsafe without target/backup/rollback and validation policy.
- Should it be next: yes, paired with signup default-row readiness. It reduces null-branch risk before `/now` or admin reads.
- DB mutation: no if readiness/design only; yes if implemented later.
- Student-facing behavior: no if readiness only; later backfill should not itself expose new UI.

### C. Admin read-only StudentAccess visibility readiness
- Advances: prepares owner/admin inspection of access state.
- Dependencies: default-row/backfill policy, read model, copy/status mapping.
- Risks: admin UI may normalize missing rows or incomplete row lifecycle; can imply operational authority before mutation/audit policy exists.
- Should it be next: not before row lifecycle readiness.
- DB mutation: no.
- Student-facing behavior: no direct student-facing behavior, but admin interpretation risk is high without row coverage.

### D. Admin mutation readiness
- Advances: prepares owner/admin operations to invite/activate/expire/change access state.
- Dependencies: row lifecycle, admin read readiness, transition policy, actor/reason policy, `AuditEvent` write policy.
- Risks: highest risk; persists access decisions and needs audit semantics.
- Should it be next: no.
- DB mutation: no if readiness only; yes if implemented later.
- Student-facing behavior: indirect or direct once `/now`/runtime consumes state.

### E. `/now` read/access-state visibility readiness
- Advances: prepares student-visible access state messaging.
- Dependencies: row lifecycle coverage, read semantics, copy mapping, expiration interpretation, fallback behavior for missing/invalid rows.
- Risks: student-facing promises can outrun row lifecycle and runtime enforcement.
- Should it be next: no, not before default-row/backfill policy is resolved.
- DB mutation: no.
- Student-facing behavior: yes when implemented.

### F. Runtime enforcement/access blocking readiness
- Advances: prepares blocking of expired/inactive access.
- Dependencies: row lifecycle, `/now` read policy, admin mutation/audit, expiration policy, subscription/enrollment boundary.
- Risks: can block students incorrectly if rows are missing or policy is incomplete.
- Should it be next: no.
- DB mutation: no if readiness only; runtime implementation may not mutate but affects access.
- Student-facing behavior: yes.

### G. Billing/subscription linkage readiness
- Advances: prepares commercial continuation link to payment/subscription.
- Dependencies: Block 3 billing policy, subscription status vocabulary, audit/provider source of truth, row lifecycle.
- Risks: can confuse subscription with enrollment or active tutoring work.
- Should it be next: no.
- DB mutation: likely later.
- Student-facing behavior: yes when implemented.

## 8. Candidate evaluation summary
The safest next boundary is row lifecycle readiness, not runtime integration.

Reason:
- The helper can validate a row, but the app still lacks a policy for when rows are created.
- `/now`, admin reads, mutation endpoints, and runtime enforcement all become fragile if some students have `StudentAccess` rows and others do not.
- A combined default-row and backfill readiness phase reduces future null-branch risk without mutating DB in the same phase.

StudentAccess should remain the current source of truth for access/trial state only. It must not become enrollment, Program, LearningCycle, StudyLoad, content, or Block 7 source of work.

## 9. Recommended next phase
Recommended next phase:
- `MVP-SALES-TRIAL-2V - StudentAccess default-row and backfill policy readiness`

Scope:
- documentation/readiness only;
- define signup default-row policy;
- define existing-student backfill policy;
- define how active-enrollment students map to `enrolled_active_program + none`;
- define decision fields for default/backfill rows;
- define whether implementation should happen in separate signup and backfill phases;
- define DB target/backup/rollback stop rules for any future mutation phase.

Do not implement default-row, backfill, `/now`, admin read, admin mutation, runtime enforcement, audit writes, billing, enrollment, Program/LearningCycle/StudyLoad, or Block 7 in 2V.

## 10. Explicit deferrals
Deferred:
- signup default-row implementation;
- existing-student backfill implementation;
- admin read UI;
- admin mutation;
- `/now` read integration;
- runtime enforcement/access blocking;
- mutation endpoints;
- `AuditEvent` writes;
- billing/payment/subscription integration;
- subscription status expansion beyond first-cut helper policy;
- enrollment automation;
- Program/LearningCycle/StudyLoad work;
- Block 7.

## 11. Stop rules for future integration phases
Stop future phases if:
- Git preflight is dirty or baseline mismatches;
- row lifecycle policy is missing;
- implementation would mix readiness with DB mutation without explicit authorization;
- default-row and backfill semantics diverge;
- missing rows would require ad hoc `/now` or admin null-branch behavior;
- Prisma/DB operations would need secrets or `.env` inspection;
- target DB, backup, rollback, or data-loss posture is ambiguous;
- admin mutation is attempted before read/default-row/backfill and `AuditEvent` policy;
- `/now` or runtime enforcement is attempted before row lifecycle coverage;
- billing/subscription linkage is attempted before subscription source-of-truth policy;
- StudentAccess is used to create or imply Program, LearningCycle, StudyLoad, enrollment work, content route, or Block 7 access.

## 12. Final verdict
STUDENT_ACCESS_HELPER_CLOSED_READY_FOR_ROW_LIFECYCLE_READINESS
