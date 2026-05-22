# MVP-SALES-TRIAL-2Z - Implement StudentAccess backfill apply script

## 1. Phase gate classification

Roadmap block: 2 - Trial and access control.

Sales-ready relevance: direct/high.

Phase type: implementation of a guarded script only.

Priority verdict: APPROVED_NEXT_PHASE.

This phase implements a dedicated StudentAccess backfill apply script. The script was not executed, and no DB write was performed.

Final verdict:

```text
STUDENT_ACCESS_BACKFILL_APPLY_SCRIPT_IMPLEMENTED_NOT_EXECUTED
```

## 2. Git preflight result

Git preflight matched the requested baseline:

* `git status --short` returned clean.
* `HEAD = origin/main = 187952c`.
* Last accepted commit: `MVP-SALES-TRIAL-2Y: assess StudentAccess backfill readiness`.
* Git log showed TRIAL-2Y at `187952c`, preceded by TRIAL-2X, TRIAL-2W, TRIAL-2V, TRIAL-2U, TRIAL-2T, TRIAL-2S, and TRIAL-2R.

Git preflight is the live truth for this phase.

## 3. Inputs reviewed

Documents reviewed:

* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Y_STUDENT_ACCESS_BACKFILL_IMPLEMENTATION_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2X_EXECUTE_STUDENT_ACCESS_BACKFILL_DRY_RUN_NO_WRITE.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2W_STUDENT_ACCESS_BACKFILL_DRY_RUN_AND_ROW_COVERAGE_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2V_STUDENT_ACCESS_DEFAULT_ROW_AND_BACKFILL_POLICY_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2T_IMPLEMENT_PURE_STUDENT_ACCESS_VALIDATION_HELPER.md`
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `PHASE_LOG.md` entries relevant to TRIAL-2Q through TRIAL-2Y.

Read-only inspected:

* `nextjs_space/scripts/student-access-backfill-dry-run.ts`
* `nextjs_space/lib/student-access-validation.ts`
* `nextjs_space/prisma/schema.prisma`
* `nextjs_space/package.json`
* Existing `nextjs_space/scripts` folder.

## 4. Implementation summary

Created a dedicated apply script:

```text
nextjs_space/scripts/student-access-backfill-apply.ts
```

The script:

* Is separate from the accepted no-write dry-run script.
* Uses Prisma Client only inside execution logic.
* Imports `validateStudentAccessSnapshot` from `../lib/student-access-validation`.
* Does not import app code.
* Does not use raw SQL.
* Does not call Prisma schema, migration, db push, or generate APIs.
* Is not wired into package scripts.
* Defaults to safe preview/no-write behavior when confirmation flags are absent.

The script was not executed in TRIAL-2Z.

## 5. Files changed

Files changed:

* `nextjs_space/scripts/student-access-backfill-apply.ts`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Z_IMPLEMENT_STUDENT_ACCESS_BACKFILL_APPLY_SCRIPT.md`
* `PHASE_LOG.md`

No other files were changed.

## 6. Apply script API/command summary

Safe preview/no-write command shape:

```powershell
cd nextjs_space
npx.cmd tsx scripts/student-access-backfill-apply.ts
```

Write-confirmed command shape for a future separately authorized phase:

```powershell
cd nextjs_space
npx.cmd tsx scripts/student-access-backfill-apply.ts --confirm-write-student-access-backfill --confirm-backup-or-owner-acceptance
```

TRIAL-2Z did not run either command.

## 7. Confirmation guard

The script requires both exact CLI flags before write mode can create `PrismaClient` or access the DB:

```text
--confirm-write-student-access-backfill
--confirm-backup-or-owner-acceptance
```

The second flag documents that backup/snapshot status or explicit owner acceptance has been confirmed by the future controlled write phase.

Without either flag:

* The script prints a safe preview/no-write message.
* It prints the expected accepted counts.
* It states that the counts are expected accepted counts from TRIAL-2X/TRIAL-2Y, not current DB state.
* It states that no DB read was performed.
* It explains that no write was performed.
* It exits without creating `PrismaClient`, reading DB, or writing DB.

If only one required flag is supplied:

* The script prints safe JSON with `mode = write_guard_missing`.
* It lists the missing flag.
* It exits before creating `PrismaClient`.
* It performs no DB read and no DB write.

With both flags:

* The script performs classification and pre-write assertions.
* The script validates every candidate.
* The script stops before writing if any assertion, ambiguity, or validation failure appears.

Write-confirmed mode was not executed in TRIAL-2Z, and this guard hardening was not executed against DB.

## 8. Accepted count assertions

The script encodes the accepted counts from TRIAL-2X/TRIAL-2Y:

```text
students: 12
existingStudentAccessRows: 0
missingStudentAccessRows: 12
noActiveEnrollmentCandidates: 3
oneActiveEnrollmentCandidates: 9
ambiguousRecords: 0
validationFailures: 0
```

The script stops before writing if any accepted count differs.

## 9. Candidate classification rules

The script classifies Student records as follows:

* Existing StudentAccess row: existing conflict/preserve, no update.
* No active enrollment: candidate `no_access + none`.
* Exactly one active enrollment: candidate `enrolled_active_program + none`.
* Multiple active enrollments: stop.
* Inconsistent enrollment/program/current cycle state: stop.
* Identity/email concern: stop.
* Users without Student rows: excluded, no row.

## 10. Validation helper usage

The script builds candidate rows with:

* `subscriptionStatus = none`
* `trialInvitedAt = null`
* `trialActivatedAt = null`
* `trialExpiresAt = null`
* `trialExperienceUsedAt = null`
* `tutoringDirection = null`
* `continuityTarget = null`
* `lastDecisionBy = system`
* `lastDecisionAt = deterministic script decision instant`
* `lastDecisionReason = backfill_no_active_enrollment_no_access` or `backfill_existing_active_enrollment`

Every candidate is validated with `validateStudentAccessSnapshot` immediately before any write can occur.

## 11. Write behavior design

In a future authorized write phase, the script is designed to:

* Insert only missing StudentAccess rows.
* Never update existing StudentAccess rows.
* Use a Prisma transaction for the insert batch.
* Print a summary and inserted row IDs after successful write.
* Avoid raw SQL.
* Avoid destructive reset.
* Avoid User, Student, Program, enrollment, cycle, StudyLoad, AuditEvent, billing, runtime, `/now`, or admin changes.

No write mode was executed in TRIAL-2Z.

## 12. Rollback support design

Rollback support is informational only in this script:

* The script prints inserted StudentAccess row IDs after a future successful write.
* The script prints inserted Student IDs.
* The script prints counts by `lastDecisionReason`.
* Reason strings remain stable:
  * `backfill_no_active_enrollment_no_access`
  * `backfill_existing_active_enrollment`

The script does not perform rollback.

## 13. Verification performed

Verification performed in TRIAL-2Z:

* `git diff --check`
* `git diff --stat`
* `git status --short`

The apply script was not run. Build, Prisma CLI, DB dry-run, DB write, tests, SQL, seed, and `.env` inspection were not run.

## 14. Explicit non-goals preserved

Confirmed no:

* App code changes.
* Helper code changes.
* Dry-run script changes.
* Test code changes.
* Schema edit.
* Package change.
* Package-lock change.
* npm install.
* Prisma db push.
* Prisma migrate.
* Prisma generate.
* DB mutation.
* SQL.
* Seed.
* `.env` inspection or printing.
* Secrets printed.
* UI/admin change.
* Signup default-row implementation.
* Actual backfill execution/write.
* `/now` read integration.
* Admin read integration.
* Mutation endpoints.
* AuditEvent writes.
* Billing/payment/subscription integration.
* Program/LearningCycle/StudyLoad changes.
* Enrollment automation.
* Block 7.
* Deploy.
* Generated PDF/DOCX artifacts.
* Commit.
* Push.

## 15. Remaining gaps

Remaining gaps:

* Apply script write mode has not been executed.
* Local/dev target must be reconfirmed without secrets before execution.
* Backup/snapshot or explicit owner acceptance must be confirmed before execution and represented by `--confirm-backup-or-owner-acceptance`.
* No StudentAccess rows have been written.
* Signup default-row remains unimplemented.
* `/now` and admin reads remain blocked until row coverage exists.
* Runtime enforcement, billing, enrollment, Program, LearningCycle, StudyLoad, and Block 7 remain deferred.

## 16. Recommended next phase

Recommended next phase:

```text
MVP-SALES-TRIAL-3A - Confirm backup and execute StudentAccess backfill apply local/dev
```

Scope:

* Confirm local/dev target without secrets.
* Confirm backup/snapshot or explicit owner acceptance.
* Execute the apply script with both confirmation flags.
* Verify inserted counts and rerun row coverage checks.
* Do not change app behavior, signup, `/now`, admin, billing, enrollment, runtime enforcement, Program, LearningCycle, StudyLoad, or Block 7.

## 17. Final verdict

The dedicated StudentAccess backfill apply script is implemented and guarded, but it was not executed and no DB write occurred in TRIAL-2Z.

```text
STUDENT_ACCESS_BACKFILL_APPLY_SCRIPT_IMPLEMENTED_NOT_EXECUTED
```
