# MVP-SALES-TRIAL-2V - StudentAccess default-row and backfill policy readiness

## 1. Phase gate classification

Roadmap block: 2 - Trial and access control.

Sales-ready relevance: direct/high.

Phase type: documentation/readiness only.

This phase defines StudentAccess row lifecycle policy before any signup default-row implementation, existing-student backfill, read integration, mutation endpoint, admin workflow, billing linkage, or runtime enforcement.

Final verdict:

```text
STUDENT_ACCESS_ROW_LIFECYCLE_POLICY_READY
```

## 2. Git preflight result

Git preflight matched the requested baseline:

* `git status --short` returned clean.
* `HEAD = origin/main = e1e9e49`.
* Last accepted commit: `MVP-SALES-TRIAL-2U: close StudentAccess helper boundary`.
* Git log showed TRIAL-2U at `e1e9e49`, preceded by TRIAL-2T, TRIAL-2S, TRIAL-2R, TRIAL-2Q, TRIAL-2P, TRIAL-2O, and TRIAL-2N.

Git preflight is the live truth for this phase.

## 3. Inputs reviewed

Documentation reviewed:

* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2U_STUDENT_ACCESS_VALIDATION_HELPER_CLOSEOUT_AND_NEXT_INTEGRATION_BOUNDARY.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2T_IMPLEMENT_PURE_STUDENT_ACCESS_VALIDATION_HELPER.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2R_STUDENT_ACCESS_VALIDATION_HELPER_DESIGN.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Q_STUDENT_ACCESS_DB_APPLICATION_VERIFICATION_CLOSEOUT.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2F_TRIAL_ACCESS_SCHEMA_IMPLEMENTATION_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `PHASE_LOG.md` entries relevant to TRIAL-2Q through TRIAL-2U.

Read-only code and schema inspected:

* `nextjs_space/prisma/schema.prisma`
* `nextjs_space/app/api/signup/route.ts`
* `nextjs_space/app/now/page.tsx`
* `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`
* `nextjs_space/lib/student-access-validation.ts`

## 4. Current known state after 2U

The StudentAccess schema exists in application source and was verified as applied in TRIAL-2Q. The model is one-to-one with `Student` and includes status, trial timestamp, subscription, decision, and optional planning fields.

The pure validation helper exists at `nextjs_space/lib/student-access-validation.ts`. It is deterministic, DB-free, has no Prisma imports, and has no runtime consumers.

The signup route creates `User` and `Student` records only. It does not create `StudentAccess` rows.

The `/now` page still resolves active student work from existing student and program instance data. It does not read StudentAccess.

The admin student detail view does not read or render StudentAccess.

No default-row behavior, existing-student backfill, admin mutation, `/now` access-state visibility, billing linkage, runtime enforcement, or AuditEvent write exists.

## 5. Why row lifecycle policy must come before integration

StudentAccess is intended to become the current access-state source of truth, but reads cannot safely depend on it until row coverage and missing-row behavior are defined. A default-row implementation alone would cover only new signups and leave existing students in a null branch. A backfill without policy could encode enrollment, trial, subscription, or manual decision semantics incorrectly.

The row lifecycle policy must therefore define when a row is created, what status pair is legal, how existing students are classified, how decision fields are populated, and what future mutation phases must stop on before any application behavior begins consuming the table.

## 6. Signup default-row policy

Creation point:

* Future signup default-row implementation should create a StudentAccess row only after a `User` and `Student` have been successfully created for a public signup.
* The creation should be in the same explicit signup persistence path as the new `Student` row, but only after a scoped implementation phase authorizes app code changes.

Exact default status pair:

* `accessStatus = no_access`
* `trialStatus = none`

Fields:

* `trialInvitedAt = null`
* `trialActivatedAt = null`
* `trialExpiresAt = null`
* `trialExperienceUsedAt = null`
* `subscriptionStatus = none`
* `tutoringDirection = null`
* `continuityTarget = null`
* `lastDecisionBy = system`
* `lastDecisionAt = now` from a deterministic server-side decision instant in the future implementation.
* `lastDecisionReason = public_signup_default_no_access`

Validation helper usage:

* Future signup default-row implementation should build the candidate row and call `validateStudentAccessSnapshot` before writing it.
* The write must stop if validation returns errors.

Signup must not:

* Invite or activate a trial.
* Start a trial timer.
* Create subscription, billing, payment, Program, LearningCycle, StudyLoad, enrollment, content, or Block 7 state.
* Create admin visibility, `/now` visibility, mutation endpoints, access blocking, or runtime enforcement.
* Treat `subscriptionStatus` as billing truth.
* Write AuditEvent records unless a later phase explicitly scopes and designs that policy.
* Repair or backfill existing students.

## 7. Existing-student backfill policy

Backfill scope:

* Backfill applies only to existing `Student` records.
* Users without `Student` rows, including admin/test/QA users, must not receive StudentAccess rows from the backfill.

Students without active enrollment:

* Candidate row: `accessStatus = no_access`, `trialStatus = none`.
* Trial timestamps null.
* `subscriptionStatus = none`.
* Planning fields null.
* Decision fields should indicate system backfill and the no-active-enrollment reason.

Students with active enrollment:

* Candidate row: `accessStatus = enrolled_active_program`, `trialStatus = none`.
* Trial timestamps null.
* `subscriptionStatus = none`.
* Planning fields remain null unless a later policy derives them explicitly.
* Decision fields should indicate system backfill from existing active enrollment.

Ambiguous, stale, or semi-seed states:

* A dry-run must flag these records for review instead of writing.
* Ambiguity includes conflicting enrollment signals, inactive or stale rows that look like real student work, seeded/demo records with unclear ownership, or any state that cannot be classified by the approved rules.

Multiple enrollments:

* If a student has exactly one active enrollment, the candidate can map to `enrolled_active_program + none`.
* If a student has multiple active enrollments, the dry-run should flag the record. A later phase may still map the student to `enrolled_active_program + none`, but only after the policy accepts that active access is independent of the number of active program instances.

Admin/test/QA users without Student rows:

* No StudentAccess row should be created.
* Backfill must not create `User` or `Student` records.

Duplicate or missing email concerns:

* Backfill should key by `Student.id`, not by email alone.
* Missing, malformed, or linkage-ambiguous email state should be reported, not repaired.
* Backfill must not merge users, create users, create students, or repair identity data.

Backfill execution form:

* The next safe phase should be dry-run/readiness, not mutation.
* A future actual backfill should prefer a scoped Prisma operation over raw SQL, only after target DB, backup, rollback, and drift rules are confirmed.
* Ambiguous cases should remain report-only or be handled later by an authorized admin-mediated correction workflow.

## 8. Active-enrollment mapping

Safe detection:

* Detect active enrollment from `StudentProgramInstance` rows with the same `studentId` as the target `Student` and `status = active`.
* Do not infer active access from Program, LearningCycle, StudyLoad, content, attendance, billing, or trial data.
* A dry-run should count and list active enrollment candidates before any write phase.

Mapping:

* Existing students with active enrollment map to `accessStatus = enrolled_active_program`, `trialStatus = none`.
* This is a current access-state marker only.

Boundary:

* This mapping does not create Program, LearningCycle, StudyLoad, enrollment automation, content access, or Block 7 behavior.
* It does not repair program state.

Inconsistent enrollment or cycle state:

* If an active enrollment references missing or inconsistent surrounding state, the dry-run should report it.
* The StudentAccess candidate should not be used to repair that inconsistency.
* Future policy may still allow `enrolled_active_program + none` when active enrollment is present, but it must document the inconsistency and avoid creating downstream work state.

## 9. Missing-row policy

Before backfill:

* Missing StudentAccess rows are expected legacy state.
* StudentAccess-aware reads should not be enabled yet.
* Existing `/now` and admin behavior should remain unchanged until row coverage and missing-row handling are implemented.

After backfill:

* Missing StudentAccess for a real `Student` should be treated as a data integrity stop condition for StudentAccess-aware reads and writes.
* It should not be silently interpreted as `no_access` unless a later phase explicitly designs that fallback.

Future reads:

* Before row coverage, future reads should avoid consuming StudentAccess.
* After row coverage, a missing row should surface as an error or blocked integration condition, not as a pending state.
* Any temporary fallback must be explicit, logged, and scoped to a readiness or rollout phase.

## 10. Decision-field policy

Default signup rows:

* `lastDecisionBy = system`
* `lastDecisionAt = now`
* `lastDecisionReason = public_signup_default_no_access`

Backfill rows without active enrollment:

* `lastDecisionBy = system`
* `lastDecisionAt = backfill decision instant`
* `lastDecisionReason = backfill_no_active_enrollment_no_access`

Backfill rows with active enrollment:

* `lastDecisionBy = system`
* `lastDecisionAt = backfill decision instant`
* `lastDecisionReason = backfill_existing_active_enrollment`

Manual corrections:

* Manual corrections are deferred.
* A future admin mutation policy must require actor and reason.
* Actor labels should avoid secrets and should use stable non-secret identifiers such as `owner_admin` or a later-approved owner-admin identifier format.
* `lastDecisionAt` should use the deterministic decision instant for the correction.

Reason strings:

* Reason strings should be stable, short, and audit-readable.
* They should describe why the row was created or changed, not imply billing, enrollment creation, or trial activation.

## 11. Validation helper usage policy

Default rows:

* The future signup default row must validate successfully before write.

Backfill rows:

* Each future backfill candidate must validate successfully before write.
* The dry-run should report validation failures by student identifier and issue category.

Invalid candidates:

* Invalid candidate rows must stop the write path.
* Future mutation phases must not coerce invalid rows into a legal shape without a documented policy decision.

## 12. Future mutation target, backup, and rollback policy

Target order:

* Local/dev first.
* Staging and production are not authorized by this phase.

Shared DB requirements:

* Confirm target DB without printing secrets.
* Require backup/snapshot before any shared DB mutation.
* Confirm rollback expectation before mutation.

Stop rules:

* Stop on Git drift.
* Stop on schema drift, destructive Prisma prompts, reset prompts, or unclear target.
* Do not use `--force-reset`.
* Do not print secrets or inspect `.env` in documentation phases.
* Do not use raw SQL unless a later phase explicitly authorizes it.
* Do not proceed if the candidate row count or ambiguity count does not match the reviewed dry-run policy.

## 13. Phase split recommendation

Split signup default-row implementation and existing-student backfill into separate phases.

The next phase should not write signup default rows first because that would create partial row coverage while existing students remain missing. Partial coverage would keep `/now`, admin reads, and future runtime behavior blocked by null-branch risk.

The safer next phase is a backfill dry-run and row coverage readiness phase. It can inventory existing Student rows, active enrollment candidates, ambiguity classes, and candidate StudentAccess rows without mutating the database. That reduces null-branch risk before any signup/default-row implementation or read integration.

## 14. Candidate next phases

### A. Implement signup default-row only

What it advances:

* Covers new public signup students with `no_access + none` StudentAccess rows.

Dependencies:

* Validation helper.
* This row lifecycle policy.
* Scoped app code change authorization.

Risks:

* Existing students remain missing rows.
* StudentAccess reads remain blocked.
* Partial coverage can hide row lifecycle gaps.

DB mutation:

* Yes, for future signup requests.

Student-facing behavior:

* Not directly unless reads or enforcement are added later.

Recommendation:

* Not next unless the phase explicitly keeps reads/runtime blocked and accepts partial coverage as temporary.

### B. Backfill readiness/dry-run design

What it advances:

* Measures existing row coverage risk.
* Produces candidate classifications without writing.
* Identifies ambiguous students before mutation.

Dependencies:

* Validation helper.
* Schema and enrollment model inspection.
* Target/backup policy for any later mutation, though dry-run design itself does not mutate.

Risks:

* Low if read-only and no secrets are printed.

DB mutation:

* No for readiness/design.
* A future dry-run execution may read DB but must not write.

Student-facing behavior:

* No.

Recommendation:

* Recommended next.

### C. Backfill implementation

What it advances:

* Creates StudentAccess rows for existing students.

Dependencies:

* Backfill dry-run results.
* Target confirmation.
* Backup/snapshot.
* Rollback plan.
* Drift and ambiguity stop rules.

Risks:

* Writes access-state rows incorrectly if executed before dry-run policy is proven.

DB mutation:

* Yes.

Student-facing behavior:

* Not directly unless reads or enforcement are enabled later, but it creates future source-of-truth state.

Recommendation:

* Not next.

### D. Admin read-only visibility readiness

What it advances:

* Designs how owner/admin users will inspect StudentAccess.

Dependencies:

* Row coverage or explicit missing-row behavior.

Risks:

* Could expose incomplete or misleading access state if row lifecycle is not handled first.

DB mutation:

* No if read-only.

Student-facing behavior:

* No direct student-facing behavior.

Recommendation:

* Defer until after backfill dry-run and row coverage policy are complete.

### E. /now read readiness

What it advances:

* Designs student-facing access-state visibility or gating inputs.

Dependencies:

* Row coverage.
* Missing-row stop behavior.
* Runtime enforcement boundary.

Risks:

* Student-facing regressions if missing rows or stale access state are interpreted incorrectly.

DB mutation:

* No if read-only.

Student-facing behavior:

* Yes, once integrated.

Recommendation:

* Defer until row coverage is handled.

## 15. Recommended next phase

Recommended next phase:

```text
MVP-SALES-TRIAL-2W - StudentAccess backfill dry-run and row coverage readiness
```

Recommended scope:

* Documentation/readiness or read-only dry-run design for existing Student row coverage.
* Define the exact future dry-run command, report shape, candidate row classification, ambiguity handling, target confirmation, and no-write verification.
* Do not write StudentAccess rows.
* Do not implement signup default-row behavior yet.

## 16. Explicit deferrals

Deferred out of 2V:

* App code changes.
* Helper code changes.
* Test code changes.
* Schema edits.
* Package changes.
* Prisma CLI.
* DB mutation.
* SQL.
* Seed.
* Signup default-row implementation.
* Existing-student backfill implementation.
* `/now` read integration.
* Admin read integration.
* Admin mutation.
* AuditEvent writes.
* Billing, payment, or subscription integration.
* Program, LearningCycle, StudyLoad, enrollment automation, content, or Block 7 behavior.
* Runtime enforcement and access blocking.
* Staging, production, deploy, commit, and push.

## 17. Stop rules

Future integration or mutation phases must stop if:

* Git preflight is not clean or HEAD does not match the requested baseline.
* The target database is unclear.
* A shared database lacks a current backup/snapshot.
* Prisma reports destructive prompts, reset prompts, drift, or unexpected schema changes.
* The future dry-run finds ambiguous student/enrollment states that the phase has not authorized.
* Candidate rows fail `validateStudentAccessSnapshot`.
* A phase attempts to combine default-row, backfill, reads, mutations, billing, enrollment, runtime enforcement, or admin UI beyond its approved scope.
* Any command would print secrets or require `.env` inspection in a phase that did not authorize it.
* Raw SQL is proposed without separate authorization.

## 18. Final verdict

The row lifecycle policy is ready for the next readiness phase. The next step should reduce existing-student null-branch risk through backfill dry-run and row coverage readiness before signup default-row implementation, admin reads, `/now` reads, or runtime enforcement.

```text
STUDENT_ACCESS_ROW_LIFECYCLE_POLICY_READY
```
