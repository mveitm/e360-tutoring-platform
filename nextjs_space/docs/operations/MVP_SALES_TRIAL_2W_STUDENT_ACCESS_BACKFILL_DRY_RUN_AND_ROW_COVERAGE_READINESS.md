# MVP-SALES-TRIAL-2W - StudentAccess backfill dry-run and row coverage readiness

## 1. Phase gate classification

Roadmap block: 2 - Trial and access control.

Sales-ready relevance: direct/high.

Phase type: readiness plus no-write script preparation.

Priority verdict: APPROVED_NEXT_PHASE.

This phase prepares a no-write StudentAccess backfill dry-run path so existing Student row coverage can be inventoried before any real backfill, signup default-row implementation, admin read, `/now` read, mutation endpoint, billing linkage, or runtime enforcement.

Final verdict:

```text
STUDENT_ACCESS_BACKFILL_DRY_RUN_SCRIPT_READY_NOT_EXECUTED
```

## 2. Git preflight result

Git preflight matched the requested baseline:

* `git status --short` returned clean.
* `HEAD = origin/main = 06a9fd0`.
* Last accepted commit: `MVP-SALES-TRIAL-2V: define StudentAccess row lifecycle policy`.
* Git log showed TRIAL-2V at `06a9fd0`, preceded by TRIAL-2U, TRIAL-2T, TRIAL-2S, TRIAL-2R, TRIAL-2Q, TRIAL-2P, and TRIAL-2O.

Git preflight is the live truth for this phase.

## 3. Inputs reviewed

Documents reviewed:

* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2V_STUDENT_ACCESS_DEFAULT_ROW_AND_BACKFILL_POLICY_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2U_STUDENT_ACCESS_VALIDATION_HELPER_CLOSEOUT_AND_NEXT_INTEGRATION_BOUNDARY.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2T_IMPLEMENT_PURE_STUDENT_ACCESS_VALIDATION_HELPER.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Q_STUDENT_ACCESS_DB_APPLICATION_VERIFICATION_CLOSEOUT.md`
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `PHASE_LOG.md` entries relevant to TRIAL-2Q through TRIAL-2V.

Read-only inspected:

* `nextjs_space/prisma/schema.prisma`
* `nextjs_space/lib/student-access-validation.ts`
* `nextjs_space/package.json`
* Existing `nextjs_space/scripts` folder and representative script import patterns.

## 4. Current state after 2V

TRIAL-2V established row lifecycle policy:

* Future public signup default row should be `no_access + none`.
* Existing students without active enrollment should backfill to `no_access + none`.
* Existing students with one active enrollment should backfill to `enrolled_active_program + none`.
* Multiple active enrollments, identity concerns, stale/semi-seed states, and inconsistent enrollment/program/cycle states should be reported before any write.
* Missing StudentAccess rows are expected legacy state before backfill and become a data integrity stop condition after row coverage.

Current implementation state:

* `StudentAccess` exists in schema and is one-to-one with `Student`.
* The pure validation helper exists and is DB-free.
* Signup, `/now`, admin detail, runtime, billing, and mutation paths do not consume or write StudentAccess.
* No backfill has been executed.

## 5. Why dry-run and row coverage come before any backfill write

A real backfill would create source-of-truth access-state rows for existing students. Without a dry-run, the team cannot know how many students already have rows, how many are missing rows, how many have active enrollment signals, or how many require manual review.

Dry-run comes first because it can expose null-branch risk, ambiguity, validation failures, and identity concerns without changing data. A reviewed dry-run result should be accepted before any write phase is authorized.

## 6. Backfill dry-run goals

The dry-run should report:

* Count all `Student` records.
* Count existing `StudentAccess` rows, if any.
* Count missing `StudentAccess` rows.
* Count users without `Student` rows as excluded non-student users.

Candidate classification:

* No active enrollment: candidate `accessStatus = no_access`, `trialStatus = none`.
* Exactly one active enrollment: candidate `accessStatus = enrolled_active_program`, `trialStatus = none`.
* Multiple active enrollments: ambiguous, report only.
* Inconsistent enrollment/program/cycle state: ambiguous, report only.
* Missing or duplicate identity/email concerns: report only.
* Users without `Student` rows: excluded, no StudentAccess row.

Validation:

* Every candidate row must be validated with `validateStudentAccessSnapshot`.
* Invalid candidates must be reported and must not be written.
* A no-write dry-run can exit nonzero when ambiguity or validation failure is present so a future automation wrapper cannot accidentally treat the run as backfill-ready.

## 7. Proposed dry-run report shape

Report shape:

* `summary.counts.students`
* `summary.counts.existingStudentAccessRows`
* `summary.counts.missingStudentAccessRows`
* `summary.counts.noActiveEnrollmentCandidates`
* `summary.counts.oneActiveEnrollmentCandidates`
* `summary.counts.ambiguousRecords`
* `summary.counts.validationFailures`
* `summary.counts.excludedNonStudentUsers`
* `summary.stopGo`
* `reports[]` with student id, email, class, active enrollment count, candidate row, validation result, validation errors, and notes.

Stop/go values:

* `GO_FOR_REVIEW_ONLY_NO_WRITE`: no ambiguity and no validation failures.
* `STOP_REVIEW_REQUIRED_NO_WRITE`: ambiguity or validation failures exist.

## 8. Proposed future script behavior

The dry-run script should:

* Use Prisma Client read-only queries.
* Never call `create`, `update`, `upsert`, `delete`, `deleteMany`, `executeRaw`, or raw SQL.
* Never print connection strings, `.env` values, or secrets.
* Never inspect or print `.env`.
* Use the pure `validateStudentAccessSnapshot` helper.
* Print JSON only with row coverage counts and non-secret row identifiers.
* Exit `1` for ambiguity or validation failure, `2` for unexpected execution errors, and `0` only when candidates are review-ready.

## 9. Script implemented in 2W

Created:

* `nextjs_space/scripts/student-access-backfill-dry-run.ts`

Implementation notes:

* The script imports `PrismaClient` from `@prisma/client`, matching existing script conventions.
* The script imports only the StudentAccess validation helper from `../lib/student-access-validation`.
* It uses read-only `findMany` queries for students and users.
* It classifies existing StudentAccess rows, no-active-enrollment candidates, one-active-enrollment candidates, multiple-active-enrollment ambiguity, inconsistent enrollment/program state, and identity concerns.
* It validates candidate rows with `validateStudentAccessSnapshot`.
* It does not write, mutate, seed, run Prisma CLI, or use raw SQL.
* It was not executed in 2W because this phase did not authorize DB reads without a separate local/dev read-only execution decision.

Future command, from `nextjs_space`, if explicitly authorized:

```powershell
npx.cmd tsx scripts/student-access-backfill-dry-run.ts
```

The command must be treated as read-only DB access and must not be run against staging or production.

## 10. Future script path and command

Future script path:

```text
nextjs_space/scripts/student-access-backfill-dry-run.ts
```

Future controlled no-write execution command:

```powershell
cd nextjs_space
npx.cmd tsx scripts/student-access-backfill-dry-run.ts
```

Execution prerequisites:

* Confirm local/dev environment without printing secrets.
* Do not inspect or print `.env`.
* Confirm the run is read-only.
* Stop if target DB is ambiguous.

## 11. Future mutation guardrails

Future mutation phases must preserve:

* Local/dev first.
* Staging and production not authorized unless separately approved.
* Backup/snapshot required before any shared DB write.
* Dry-run result must be reviewed and accepted before any write.
* Stop on Git drift, schema drift, destructive prompts, reset prompts, target ambiguity, or unexpected candidate counts.
* No `--force-reset`.
* No raw SQL unless separately authorized.
* No secrets printed.
* No `.env` inspection in phases that do not explicitly authorize it.

## 12. Candidate next phases

### A. Implement no-write dry-run script

What it advances:

* Creates the executable dry-run classifier.

Status after 2W:

* Complete. The script exists but was not executed.

Recommendation:

* Not next.

### B. Execute no-write dry-run locally

What it advances:

* Produces the first actual row coverage inventory.
* Confirms candidate counts, ambiguity, and validation failures without writing.

Dependencies:

* Explicit local/dev read-only execution authorization.
* Target clarity without printing secrets.
* Clean Git preflight.

DB mutation:

* No.

Student-facing behavior:

* No.

Recommendation:

* Recommended next.

### C. Implement signup default-row only

What it advances:

* Adds future coverage for new signups.

Risks:

* Existing-student row coverage remains unknown.
* Reads and runtime remain blocked.

DB mutation:

* Yes, for future signup requests.

Student-facing behavior:

* Potentially indirect later.

Recommendation:

* Defer until dry-run results are reviewed.

### D. Implement actual backfill

What it advances:

* Writes missing StudentAccess rows.

Dependencies:

* Accepted dry-run result.
* Backup/snapshot.
* Target and rollback confirmation.

DB mutation:

* Yes.

Student-facing behavior:

* Not directly until reads/runtime are integrated, but it creates source-of-truth access state.

Recommendation:

* Not next.

### E. Admin read-only visibility readiness

What it advances:

* Designs admin inspection of StudentAccess state.

Dependencies:

* Row coverage result and missing-row handling.

DB mutation:

* No if read-only.

Student-facing behavior:

* No direct student-facing behavior.

Recommendation:

* Defer until row coverage is understood.

## 13. Recommended next phase

Recommended next phase:

```text
MVP-SALES-TRIAL-2X - Execute StudentAccess backfill dry-run no-write
```

Scope:

* Run the no-write script only if local/dev read-only DB boundary is explicitly confirmed.
* Do not write rows.
* Do not implement signup default-row.
* Do not implement actual backfill.
* Do not add admin or `/now` reads.

## 14. Explicit deferrals

Deferred out of 2W:

* DB dry-run execution.
* Actual backfill writes.
* Signup default-row implementation.
* App route changes.
* Helper changes.
* Test changes.
* Schema changes.
* Package changes.
* Prisma CLI.
* SQL.
* Seed.
* UI/admin changes.
* `/now` reads.
* Mutation endpoints.
* AuditEvent writes.
* Billing/payment/subscription integration.
* Program, LearningCycle, StudyLoad changes.
* Enrollment automation.
* Block 7.
* Deploy, commit, and push.

## 15. Stop rules

Future dry-run execution must stop if:

* Git preflight is dirty or the baseline mismatches.
* The target DB cannot be identified as local/dev without printing secrets.
* Running the script would require inspecting or printing `.env`.
* The command would write to the database.
* The script is modified to use raw SQL or mutation methods.
* Prisma Client is unavailable or stale in a way that would require `prisma generate` in the same phase.
* The dry-run reports ambiguity or validation failures and a later phase tries to proceed directly to writes.
* Any phase attempts to combine dry-run execution with signup default-row, backfill write, admin reads, `/now`, billing, enrollment, runtime enforcement, or AuditEvent writes.

## 16. Final verdict

The no-write dry-run path is ready as an executable script, but it was not executed in 2W. The next safe phase is controlled local/dev no-write execution and review of row coverage results.

```text
STUDENT_ACCESS_BACKFILL_DRY_RUN_SCRIPT_READY_NOT_EXECUTED
```
