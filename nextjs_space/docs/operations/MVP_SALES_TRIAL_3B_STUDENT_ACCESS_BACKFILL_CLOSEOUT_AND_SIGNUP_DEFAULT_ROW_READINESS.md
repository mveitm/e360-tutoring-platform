# MVP-SALES-TRIAL-3B - StudentAccess backfill closeout and signup default-row readiness

## 1. Phase Gate Classification

* Roadmap block: 2 - Trial and access control.
* Sales-ready relevance: direct/high.
* Phase type: documentation/readiness closeout.
* This phase closes the local/dev StudentAccess backfill result from `MVP-SALES-TRIAL-3A` and defines the next safe signup default-row implementation boundary.
* This phase does not modify signup, app behavior, helper code, scripts, schema, package metadata, UI/admin behavior, `/now`, runtime enforcement, or any database data.

## 2. Git Preflight Result

Git preflight is the live truth.

```text
git status --short
<clean>

git log --oneline --decorate --graph -8
* f34fd43 (HEAD -> main, origin/main, origin/HEAD) MVP-SALES-TRIAL-3A: apply StudentAccess backfill local dev
* 3236e64 MVP-SALES-TRIAL-2Z: implement StudentAccess backfill apply script
* 187952c MVP-SALES-TRIAL-2Y: assess StudentAccess backfill readiness
* b6ffe12 MVP-SALES-TRIAL-2X: execute StudentAccess backfill dry run
* 2ec188c MVP-SALES-TRIAL-2W: prepare StudentAccess backfill dry run
* 06a9fd0 MVP-SALES-TRIAL-2V: define StudentAccess row lifecycle policy
* e1e9e49 MVP-SALES-TRIAL-2U: close StudentAccess helper boundary
* 7406d33 MVP-SALES-TRIAL-2T: implement StudentAccess validation helper
```

The baseline matched the expected 3B opening state:

* HEAD = origin/main = `f34fd43`.
* Last accepted commit = `MVP-SALES-TRIAL-3A: apply StudentAccess backfill local dev`.
* Working tree was clean before this documentation/readiness phase.

## 3. Inputs Reviewed

Documents:

* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3A_CONFIRM_BACKUP_AND_EXECUTE_STUDENT_ACCESS_BACKFILL_APPLY_LOCAL_DEV.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Z_IMPLEMENT_STUDENT_ACCESS_BACKFILL_APPLY_SCRIPT.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Y_STUDENT_ACCESS_BACKFILL_IMPLEMENTATION_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2V_STUDENT_ACCESS_DEFAULT_ROW_AND_BACKFILL_POLICY_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2T_IMPLEMENT_PURE_STUDENT_ACCESS_VALIDATION_HELPER.md`
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `PHASE_LOG.md` tail relevant to `MVP-SALES-TRIAL-2W` through `MVP-SALES-TRIAL-3A`

Read-only code/schema/script inspection:

* `nextjs_space/app/api/signup/route.ts`
* `nextjs_space/lib/student-access-validation.ts`
* `nextjs_space/prisma/schema.prisma`
* `nextjs_space/scripts/student-access-backfill-dry-run.ts`
* `nextjs_space/scripts/student-access-backfill-apply.ts`
* `nextjs_space/package.json`

## 4. 3A Closeout Summary

`MVP-SALES-TRIAL-3A` successfully applied the guarded StudentAccess backfill in local/dev:

* Backfill applied in local/dev.
* Inserted StudentAccess rows: `12`.
* `backfill_existing_active_enrollment = 9`.
* `backfill_no_active_enrollment_no_access = 3`.
* Post-write verification passed.
* `existingStudentAccessRows = 12`.
* `missingStudentAccessRows = 0`.
* `ambiguousRecords = 0`.
* `validationFailures = 0`.

The post-write dry-run reported `GO_FOR_REVIEW_ONLY_NO_WRITE`. Because all rows now exist, candidate counts are expected to be `0` and each existing student is classified as `existing_student_access`.

## 5. What 3A Now Makes True

* Local/dev existing Student row coverage exists for the current 12 local/dev Student records.
* Missing StudentAccess rows are no longer expected for the current 12 local/dev students.
* Future StudentAccess-aware reads can now be designed from a covered local/dev baseline.
* Future signup default-row implementation can be evaluated without leaving the current local/dev Student set uncovered.

This does not implement any StudentAccess-aware reads yet.

## 6. What 3A Does NOT Make True

3A does not make any of the following true:

* No signup default-row behavior exists.
* No `/now` read behavior exists for StudentAccess.
* No admin read behavior exists for StudentAccess.
* No admin mutation exists.
* No `AuditEvent` writes exist.
* No billing/subscription linkage exists.
* No runtime enforcement/access blocking exists.
* No staging/prod row coverage exists.
* No Program/LearningCycle/StudyLoad behavior exists.
* No Block 7 behavior exists.

## 7. Signup Default-Row Readiness

Future public signup should create a StudentAccess row after successful User and Student creation.

Default candidate row:

* `accessStatus = no_access`
* `trialStatus = none`
* `subscriptionStatus = none`
* `trialInvitedAt = null`
* `trialActivatedAt = null`
* `trialExpiresAt = null`
* `trialExperienceUsedAt = null`
* `tutoringDirection = null`
* `continuityTarget = null`
* `lastDecisionBy = system`
* `lastDecisionAt = deterministic creation instant`
* `lastDecisionReason = public_signup_default_no_access`

Future signup implementation should call `validateStudentAccessSnapshot` before writing the StudentAccess row. If the candidate does not validate, signup should stop and avoid creating a partial User/Student without StudentAccess.

The user-facing signup response should remain unchanged unless a separate phase explicitly scopes response changes.

## 8. Signup Transaction Boundary

The current signup route creates User and Student records inside `prisma.$transaction`. The future StudentAccess default row should be created inside the same transaction as User and Student creation so signup remains atomic.

If StudentAccess candidate validation fails, the route should stop before writing the row. If StudentAccess creation fails inside the transaction, the transaction should roll back User and Student creation as well. The future implementation should preserve existing duplicate email behavior and the existing admin email block.

Future signup default-row implementation must not create or imply any of the following:

* Program
* LearningCycle
* StudyLoad
* Trial invitation or activation
* Billing
* Subscription truth
* Enrollment
* Student work access
* Block 7 behavior

## 9. Future Implementation File Forecast

Likely future edit:

* `nextjs_space/app/api/signup/route.ts`

Likely future import:

* `validateStudentAccessSnapshot` from `nextjs_space/lib/student-access-validation`

No schema change, package change, UI change, `/now` change, admin change, helper change, dry-run script change, or apply script change is expected for the narrow default-row implementation.

## 10. Future Verification Plan for Signup Default-Row

Future implementation verification should use a safe local/dev public signup test account and then confirm:

* A User exists for the test email.
* A Student exists for the test email.
* Exactly one StudentAccess row exists for the new Student.
* The new row has `accessStatus = no_access` and `trialStatus = none`.
* The new row has `subscriptionStatus = none`.
* Trial timestamps, tutoring direction, and continuity target are null.
* Decision fields match `system`, the deterministic creation instant, and `public_signup_default_no_access`.
* No Program, LearningCycle, StudyLoad, or enrollment was created.
* `/now` remains safe and does not grant active program access unless existing behavior already does so independently.
* Admin route behavior remains unchanged.
* The 12 existing local/dev StudentAccess rows remain unchanged.

## 11. Test-Data and Cleanup Policy

The future signup smoke test may create a local/dev test User, Student, and StudentAccess row. That test data should be documented in the execution phase.

Cleanup should not be destructive or bundled into the same implementation phase unless explicitly scoped. If cleanup is needed, use a separate controlled local/dev cleanup phase with owner approval and without raw SQL unless separately authorized.

## 12. Stop Rules for Future Signup Default-Row Implementation

Stop before implementation or execution if any of the following occurs:

* Git working tree is dirty at opening preflight.
* Baseline commit does not match the expected accepted phase.
* Schema drift changes the StudentAccess contract.
* The helper rejects the default candidate row.
* Signup route changes require scope beyond a single default StudentAccess row.
* StudentAccess write requires `.env` or secret inspection.
* The default row would create enrollment, Program, LearningCycle, StudyLoad, student work, trial activation, billing, subscription truth, `/now` behavior, admin visibility, or runtime enforcement.
* Package or schema changes unexpectedly become necessary.

## 13. Candidate Next Phases

A. Implement signup default-row in `/api/signup` only.

* Advances row lifecycle for new public signups after the local/dev backfill closed existing Student coverage.
* Depends on the helper accepting `no_access + none` with null trial fields and `subscriptionStatus = none`.
* Should be next if scoped to the existing signup transaction and unchanged response semantics.

B. Execute signup default-row local smoke.

* Advances verification after implementation.
* Depends on an implementation phase landing first.
* Should not precede implementation.

C. Admin read-only StudentAccess readiness.

* Advances operator visibility.
* Depends on row lifecycle for existing and new students.
* Should remain deferred until signup default-row exists or is explicitly accounted for.

D. `/now` read/access-state readiness.

* Advances student-facing access state visibility.
* Depends on row lifecycle and careful behavior design.
* Should remain deferred until signup default-row exists.

E. Runtime enforcement readiness.

* Advances access blocking.
* Depends on read behavior, admin operations, policy, and audit boundaries.
* Should remain deferred.

## 14. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-TRIAL-3C - Implement signup StudentAccess default row
```

The next phase should be narrow: update public signup only so new local/dev signups receive a validated `no_access + none` StudentAccess row in the same transaction as User and Student creation. It should not add `/now`, admin read, admin mutation, billing, enrollment, runtime enforcement, or UI behavior.

## 15. Explicit Deferrals

Deferred beyond 3B:

* Signup default-row implementation.
* Signup smoke execution.
* `/now` StudentAccess read integration.
* Admin StudentAccess read visibility.
* Admin StudentAccess mutation.
* `AuditEvent` writes.
* Billing/payment/subscription integration.
* Runtime enforcement/access blocking.
* Program/LearningCycle/StudyLoad changes.
* Enrollment automation.
* Block 7.
* Staging/prod row coverage.
* Deployment.

## 16. Final Verdict

```text
STUDENT_ACCESS_BACKFILL_CLOSED_READY_FOR_SIGNUP_DEFAULT_ROW
```
