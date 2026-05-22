# MVP-SALES-TRIAL-3C - Implement signup StudentAccess default row

## 1. Phase Gate Classification

* Roadmap block: 2 - Trial and access control.
* Sales-ready relevance: direct/high.
* Phase type: narrow implementation attempt.
* Dependency: `MVP-SALES-TRIAL-3B` closed at `c415e65`.
* Priority verdict: APPROVED_NEXT_PHASE.
* This phase attempted to implement the public signup StudentAccess default row only.
* Final outcome: blocked before leaving a signup route change because importing/using the helper in the app build surfaced a helper TypeScript contract issue outside the allowed 3C edit scope.

## 2. Git Preflight Result

Git preflight is the live truth.

```text
git status --short
<clean>

git log --oneline --decorate --graph -8
* c415e65 (HEAD -> main, origin/main, origin/HEAD) MVP-SALES-TRIAL-3B: close backfill and prepare signup default row
* f34fd43 MVP-SALES-TRIAL-3A: apply StudentAccess backfill local dev
* 3236e64 MVP-SALES-TRIAL-2Z: implement StudentAccess backfill apply script
* 187952c MVP-SALES-TRIAL-2Y: assess StudentAccess backfill readiness
* b6ffe12 MVP-SALES-TRIAL-2X: execute StudentAccess backfill dry run
* 2ec188c MVP-SALES-TRIAL-2W: prepare StudentAccess backfill dry run
* 06a9fd0 MVP-SALES-TRIAL-2V: define StudentAccess row lifecycle policy
* e1e9e49 MVP-SALES-TRIAL-2U: close StudentAccess helper boundary
```

The baseline matched the expected 3C opening state:

* HEAD = origin/main = `c415e65`.
* Last accepted commit = `MVP-SALES-TRIAL-3B: close backfill and prepare signup default row`.
* Working tree was clean before implementation.

## 3. Inputs Reviewed

Documents:

* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3B_STUDENT_ACCESS_BACKFILL_CLOSEOUT_AND_SIGNUP_DEFAULT_ROW_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3A_CONFIRM_BACKUP_AND_EXECUTE_STUDENT_ACCESS_BACKFILL_APPLY_LOCAL_DEV.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2T_IMPLEMENT_PURE_STUDENT_ACCESS_VALIDATION_HELPER.md`
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `PHASE_LOG.md` tail relevant to `MVP-SALES-TRIAL-3A` through `MVP-SALES-TRIAL-3B`

Read-only inspected:

* `nextjs_space/app/api/signup/route.ts`
* `nextjs_space/lib/student-access-validation.ts`
* `nextjs_space/prisma/schema.prisma`
* `nextjs_space/package.json`

## 4. Implementation Summary

The implementation was blocked before leaving a signup route change.

The intended route change was narrow: build a default StudentAccess candidate, validate it with `validateStudentAccessSnapshot`, then create User, Student, and StudentAccess inside the existing signup transaction.

During verification, `next build` failed when the signup route used the existing helper. The failure was inside `nextjs_space/lib/student-access-validation.ts`, which 3C is not allowed to edit:

```text
./lib/student-access-validation.ts:131:32
Type error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Record<...>'.
```

Because helper changes are an explicit 3C non-goal, the route implementation was not left in place.

## 5. Files Changed

* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3C_IMPLEMENT_SIGNUP_STUDENT_ACCESS_DEFAULT_ROW.md`
* `PHASE_LOG.md`

## 6. Signup Transaction Behavior

Signup transaction behavior remains unchanged in the final 3C diff.

The route still performs request validation, admin email blocking, duplicate User/Student email checks, password hashing, and response construction as before.

The future intended transaction remains:

1. Create User.
2. Create Student.
3. Create StudentAccess linked to the new Student.

Those three writes should commit together or roll back together in a later phase after the helper contract is fixed.

The current response shape remains unchanged:

* `userId`
* `studentId`
* `email`
* `next: /now`

## 7. StudentAccess Default Row Fields

Future public signups should create this StudentAccess default row after the helper contract blocker is resolved:

```text
accessStatus = no_access
trialStatus = none
subscriptionStatus = none
trialInvitedAt = null
trialActivatedAt = null
trialExpiresAt = null
trialExperienceUsedAt = null
tutoringDirection = null
continuityTarget = null
lastDecisionBy = system
lastDecisionAt = deterministic creation instant
lastDecisionReason = public_signup_default_no_access
```

The same `decisionInstant` is used for `lastDecisionAt` and helper `options.now`.

## 8. Validation Helper Usage

The future route change must use `validateStudentAccessSnapshot` from `@/lib/student-access-validation`.

The attempted implementation validated the default candidate with deterministic `now`, but app build type checking failed inside the helper before the implementation could be accepted.

After the helper contract blocker is resolved, signup should return the same safe server-error text used by the catch-all failure path if validation fails:

```text
No pudimos crear la cuenta en este momento.
```

## 9. What Behavior Is Preserved

Preserved behavior in the final 3C diff:

* Duplicate email behavior is unchanged.
* Admin email block is unchanged.
* Request validation is unchanged.
* Password hashing is unchanged.
* Public response shape is unchanged.
* `next` pointer remains `/now`.
* No UI behavior changed.

## 10. Explicit Non-Goals Preserved

Confirmed no:

* `/now` changes.
* Admin changes.
* UI changes.
* Helper changes.
* Schema edit.
* Package change.
* Package-lock change.
* npm install.
* Prisma db push.
* Prisma migrate.
* Prisma generate.
* SQL.
* Seed.
* `.env` inspection or printing.
* Secrets printed.
* Dry-run script changes.
* Apply script changes.
* Billing/payment/subscription integration.
* Trial invitation.
* Trial activation.
* Subscription truth.
* Runtime enforcement/access blocking.
* Program creation.
* Enrollment creation.
* LearningCycle creation.
* StudyLoad creation.
* Block 7.
* `AuditEvent` writes.
* Staging/prod work.
* Deploy.
* Generated PDF/DOCX artifacts.
* Commit.
* Push.

## 11. Verification Performed

Verification commands:

```powershell
git diff --check
Set-Location -LiteralPath 'C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space'
npx.cmd tsx lib/student-access-validation.test.ts
npm.cmd run build
Set-Location -LiteralPath 'C:\projects\e360-tutoring-platform\tutoring_platform_mvp'
git diff --stat
git status --short
```

Results:

* `git diff --check`: passed with line-ending warnings for `PHASE_LOG.md` and `nextjs_space/app/api/signup/route.ts`.
* `npx.cmd tsx lib/student-access-validation.test.ts`: passed.
* `npm.cmd run build`: failed during type checking on the existing helper contract issue in `nextjs_space/lib/student-access-validation.ts` at `LEGAL_STUDENT_ACCESS_PAIRS[input.accessStatus]`.
* `git diff --stat`: `PHASE_LOG.md | 104 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`.
* `git status --short`: `M PHASE_LOG.md`; untracked 3C implementation/blocker document.

No signup smoke was run in 3C. No test user was created.

## 12. Remaining Gaps

Remaining gaps:

* Signup default-row implementation remains blocked by the helper TypeScript contract issue.
* Signup default-row local smoke has not been executed.
* No `/now` StudentAccess read behavior exists.
* No admin StudentAccess read behavior exists.
* No admin StudentAccess mutation exists.
* No `AuditEvent` write behavior exists.
* No billing/payment/subscription integration exists.
* No runtime enforcement/access blocking exists.
* No Program, Enrollment, LearningCycle, StudyLoad, or Block 7 behavior was added.
* No staging/prod row coverage or signup verification exists.

## 13. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-TRIAL-3C-FIX - Repair StudentAccess validation helper app-build contract
```

Scope should be limited to the helper type contract issue surfaced by app build, followed by reattempting the narrow signup default-row implementation. It should not add `/now`, admin, billing, enrollment, Program/LearningCycle/StudyLoad, runtime enforcement, or UI behavior.

## 14. Final Verdict

```text
BLOCKED_BY_HELPER_VALIDATION_CONTRACT
```
