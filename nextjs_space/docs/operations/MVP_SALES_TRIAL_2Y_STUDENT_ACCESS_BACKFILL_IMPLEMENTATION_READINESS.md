# MVP-SALES-TRIAL-2Y - StudentAccess backfill implementation readiness

## 1. Phase gate classification

Roadmap block: 2 - Trial and access control.

Sales-ready relevance: direct/high.

Phase type: documentation/readiness only.

Priority verdict: APPROVED_NEXT_PHASE.

This phase accepts the TRIAL-2X no-write dry-run result and defines the boundary for a future actual StudentAccess backfill write phase. It does not write rows.

Final verdict:

```text
NEEDS_BACKFILL_APPLY_SCRIPT_BEFORE_WRITE
```

## 2. Git preflight result

Git preflight matched the requested baseline:

* `git status --short` returned clean.
* `HEAD = origin/main = b6ffe12`.
* Last accepted commit: `MVP-SALES-TRIAL-2X: execute StudentAccess backfill dry run`.
* Git log showed TRIAL-2X at `b6ffe12`, preceded by TRIAL-2W, TRIAL-2V, TRIAL-2U, TRIAL-2T, TRIAL-2S, TRIAL-2R, and TRIAL-2Q.

Git preflight is the live truth for this phase.

## 3. Inputs reviewed

Documents reviewed:

* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2X_EXECUTE_STUDENT_ACCESS_BACKFILL_DRY_RUN_NO_WRITE.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2W_STUDENT_ACCESS_BACKFILL_DRY_RUN_AND_ROW_COVERAGE_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2V_STUDENT_ACCESS_DEFAULT_ROW_AND_BACKFILL_POLICY_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2T_IMPLEMENT_PURE_STUDENT_ACCESS_VALIDATION_HELPER.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Q_STUDENT_ACCESS_DB_APPLICATION_VERIFICATION_CLOSEOUT.md`
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `PHASE_LOG.md` entries relevant to TRIAL-2Q through TRIAL-2X.

Read-only inspected:

* `nextjs_space/scripts/student-access-backfill-dry-run.ts`
* `nextjs_space/lib/student-access-validation.ts`
* `nextjs_space/prisma/schema.prisma`
* `nextjs_space/package.json`
* Existing `nextjs_space/scripts` folder.

## 4. Accepted 2X dry-run result

TRIAL-2X dry-run result is accepted for implementation-readiness planning:

```text
students: 12
existingStudentAccessRows: 0
missingStudentAccessRows: 12
noActiveEnrollmentCandidates: 3
oneActiveEnrollmentCandidates: 9
ambiguousRecords: 0
validationFailures: 0
excludedNonStudentUsers: 1
stopGo: GO_FOR_REVIEW_ONLY_NO_WRITE
```

The dry-run executed as a controlled local/dev no-write DB read. No StudentAccess rows were written.

## 5. Director interpretation of 2X

No ambiguity cleanup is needed before implementation readiness:

* `ambiguousRecords = 0`.
* No multiple-active-enrollment class was reported.
* No inconsistent enrollment/program/cycle class was reported.
* No identity/email concern class was reported.

No validation repair is needed before implementation readiness:

* `validationFailures = 0`.
* All generated candidates passed `validateStudentAccessSnapshot`.

All 12 existing `Student` records are clear candidates:

* 3 should become `no_access + none`.
* 9 should become `enrolled_active_program + none`.
* Existing StudentAccess count is 0, so no conflict preservation or existing-row update policy is needed for the accepted result.

The excluded non-student user count is 1 and remains excluded. The future backfill must not create or repair User or Student rows.

## 6. Why actual backfill is still not performed in 2Y

2Y is readiness only because no dedicated apply script exists yet. The next safe step is to implement a narrowly scoped apply script that encodes the accepted dry-run counts, re-validates every candidate immediately before write, and refuses to run if the data shape changes.

Combining readiness, apply-script implementation, and DB writes in one phase would increase risk. A real write needs explicit target confirmation, backup/snapshot posture, rollback expectations, write command shape, inserted-row verification, and stop rules in place before execution.

## 7. Future backfill write boundary

Future write boundary:

* Local/dev first.
* No staging.
* No production.
* Accepted total Student count: `12`.
* Accepted existing StudentAccess row count before write: `0`.
* Accepted missing StudentAccess row count before write: `12`.
* Accepted candidate classes: `3` no-active-enrollment candidates and `9` one-active-enrollment candidates.
* Validate each candidate again immediately before write.
* Write only missing StudentAccess rows.
* Do not update existing StudentAccess rows.
* Stop if existing StudentAccess row count changes from `0` unless a new review phase accepts that change.
* Stop if total Student count changes from `12` unless a new review phase accepts that change.
* Stop if ambiguity appears.
* Stop if validation failures appear.
* Stop if total candidate count differs from `12`.

Candidate rows:

* No-active-enrollment candidates should insert `accessStatus = no_access`, `trialStatus = none`, `subscriptionStatus = none`, null trial timestamps, null planning fields, `lastDecisionBy = system`, deterministic `lastDecisionAt`, and `lastDecisionReason = backfill_no_active_enrollment_no_access`.
* One-active-enrollment candidates should insert `accessStatus = enrolled_active_program`, `trialStatus = none`, `subscriptionStatus = none`, null trial timestamps, null planning fields, `lastDecisionBy = system`, deterministic `lastDecisionAt`, and `lastDecisionReason = backfill_existing_active_enrollment`.

## 8. Target confirmation policy

Future write execution must:

* Confirm local/dev target class without printing secrets.
* Not inspect or print `.env`.
* Not print connection strings.
* Not print passwords, tokens, cookies, `DATABASE_URL`, `NEXTAUTH_SECRET`, or `ADMIN_EMAILS`.
* Stop if staging or production is suspected.
* Stop if the target class cannot be confirmed without secrets.

Prior phase context supports local/dev, but the future write phase must reconfirm before mutation.

## 9. Backup/snapshot policy

Because this is shared local/dev data, a current backup/snapshot or explicit owner acceptance is required before any write.

Future write phase must record, without secrets:

* Backup/snapshot status.
* Backup/snapshot label.
* Backup/snapshot date/time or validity window if available.
* Owner acceptance if no fresh backup/snapshot is used.

No write is allowed if backup/snapshot status is ambiguous.

## 10. Rollback expectation

Rollback means the ability to reverse the inserted StudentAccess rows from the backfill write without destructive reset.

Future apply script should make rollback practical by:

* Printing inserted StudentAccess row IDs after successful write.
* Using stable `lastDecisionReason` values to identify inserted rows.
* Avoiding updates to pre-existing rows.
* Writing only rows whose `studentId` was missing StudentAccess at the moment of the write.

Rollback should prefer a separately authorized Prisma operation using inserted row IDs or accepted reason strings. It should not require database reset, `--force-reset`, or raw SQL rollback unless separately authorized.

## 11. Future write command shape

Safest path: create a separate dedicated apply script:

```text
nextjs_space/scripts/student-access-backfill-apply.ts
```

Do not extend the dry-run script with a `--write` flag as the next step.

Reason:

* The dry-run script is already accepted as a no-write auditing tool.
* Adding a write flag would mix audit/read behavior with mutation behavior.
* A separate apply script can contain stricter write guards, count assertions, backup acknowledgment checks, and transaction behavior without weakening the dry-run boundary.

Future command shape should be documented by the apply-script phase and should not be executed until a later controlled write phase.

## 12. Recommended actual write implementation approach

Recommended implementation approach for the future apply script:

* Create a dedicated `nextjs_space/scripts/student-access-backfill-apply.ts`.
* Keep default behavior as no-write preview unless an explicit write confirmation guard is provided.
* Reuse the same classification rules as the dry-run.
* Reuse `validateStudentAccessSnapshot`.
* Assert accepted counts before write.
* Use Prisma Client.
* Use a Prisma transaction for the insert batch if appropriate.
* Insert only missing StudentAccess rows.
* Do not update existing StudentAccess rows.
* Print summary counts and inserted row IDs only.
* Do not print secrets or `.env`.
* Verify inserted count equals `12` when the accepted shape is unchanged.
* Do not modify signup, `/now`, admin, runtime, billing, Program, LearningCycle, StudyLoad, or Block 7 behavior.

## 13. Post-write verification plan

After a future write phase, verification should include:

* Rerun the dry-run script.
* Expect `existingStudentAccessRows = 12`.
* Expect `missingStudentAccessRows = 0`.
* Expect `ambiguousRecords = 0`.
* Expect `validationFailures = 0`.
* Optionally count inserted rows by reason strings:
  * `backfill_no_active_enrollment_no_access`
  * `backfill_existing_active_enrollment`
* Confirm no `/now` or admin read integration was added.
* Confirm no signup default-row behavior was added unless separately scoped.

## 14. Stop rules

Future apply-script or write phases must stop if:

* Git preflight is dirty or baseline mismatches.
* Target class cannot be confirmed as local/dev without secrets.
* Backup/snapshot status is missing or ambiguous for a shared DB write.
* Total Student count differs from `12`.
* Existing StudentAccess row count differs from `0` before the accepted write phase.
* Missing StudentAccess candidate count differs from `12`.
* No-active-enrollment candidate count differs from `3`.
* One-active-enrollment candidate count differs from `9`.
* Ambiguous records appear.
* Validation failures appear.
* The write would update existing StudentAccess rows.
* The write would create or repair User, Student, Program, LearningCycle, StudyLoad, enrollment, billing, or trial runtime state.
* Prisma reports destructive prompts, reset prompts, drift, or unexpected schema changes.
* Any command would print secrets or require `.env` inspection.
* Raw SQL is proposed without separate authorization.
* A phase attempts to combine apply-script implementation, write execution, admin reads, `/now` reads, signup default-row, billing, runtime enforcement, or AuditEvent writes beyond its approved scope.

## 15. Candidate next phases

### A. Implement dedicated backfill apply script only, not execute

What it advances:

* Creates the controlled write tool without mutating DB.

Dependencies:

* Accepted 2X dry-run result.
* 2Y readiness boundary.

DB mutation:

* No.

Recommendation:

* Recommended next.

### B. Execute actual local/dev backfill write

What it advances:

* Inserts StudentAccess rows for existing students.

Dependencies:

* Dedicated apply script.
* Backup/snapshot or explicit owner acceptance.
* Target confirmation.
* Write-phase authorization.

DB mutation:

* Yes.

Recommendation:

* Not next because no apply script exists yet.

### C. Implement signup default-row

What it advances:

* Covers future public signups.

Dependencies:

* Existing-student row coverage written or at least apply script ready.

DB mutation:

* Yes, for future signup requests.

Recommendation:

* Defer.

### D. Admin read-only readiness

What it advances:

* Designs admin inspection of StudentAccess state.

Dependencies:

* Row coverage should exist first.

DB mutation:

* No if readiness only.

Recommendation:

* Defer.

### E. /now read readiness

What it advances:

* Designs student-facing access-state read behavior.

Dependencies:

* Row coverage should exist first.

DB mutation:

* No if readiness only.

Student-facing behavior:

* Yes when implemented.

Recommendation:

* Defer.

## 16. Recommended next phase

Recommended next phase:

```text
MVP-SALES-TRIAL-2Z - Implement StudentAccess backfill apply script
```

Scope:

* Implement a dedicated apply script only.
* Do not execute the write.
* Do not change app behavior, helper, schema, packages, signup, `/now`, admin, billing, enrollment, Program, LearningCycle, StudyLoad, runtime enforcement, or Block 7.

## 17. Explicit deferrals

Deferred out of 2Y:

* Backfill apply script implementation.
* Backfill write execution.
* Signup default-row implementation.
* App code changes.
* Helper changes.
* Dry-run script changes.
* Test changes.
* Schema edits.
* Package changes.
* Prisma CLI.
* DB mutation.
* SQL.
* Seed.
* `.env` inspection.
* UI/admin changes.
* `/now` reads.
* Mutation endpoints.
* AuditEvent writes.
* Billing/payment/subscription integration.
* Program, LearningCycle, StudyLoad changes.
* Enrollment automation.
* Runtime enforcement.
* Block 7.
* Deploy, commit, and push.

## 18. Final verdict

The 2X dry-run result is accepted and ready to drive a future write implementation, but no actual backfill write should occur until a dedicated apply script exists and a later phase authorizes controlled execution.

```text
NEEDS_BACKFILL_APPLY_SCRIPT_BEFORE_WRITE
```
