# MVP-SALES-TRIAL-3E - Controlled local/dev signup default-row smoke

## Purpose

Verify in local/dev only that the real signup flow creates exactly one default `StudentAccess` row for a newly created signup student after `MVP-SALES-TRIAL-3D`.

This was a smoke/verification phase only. It did not change code and did not attempt to fix any failure.

## Baseline

* Expected HEAD and `origin/main`: `c25a551`.
* Latest accepted commit: `MVP-SALES-TRIAL-3D: implement signup StudentAccess default row`.
* Working tree expected before smoke: clean.
* Preflight result: matched expected baseline and clean working tree.

## Context Gate Summary

* Phase type: verification/smoke, controlled local/dev data-mutating app-flow smoke.
* Product horizon: MVP-Beta-Pre-Sales-Ready support.
* Roadmap block: StudentAccess/signup-access foundation after 3D signup default-row implementation.
* Context Gate decision: GO.
* Reason: Git preflight matched, local/dev target was confirmed without printing secrets, the signup request body was determined from the route, and the smoke could run through the real signup API.

## Docs Read

* `PHASE_LOG.md`.
* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`.
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`.
* `nextjs_space/docs/governance/AUTOPROPAGATING_HANDOFF_PROTOCOL_V2.md`.
* `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`.
* `nextjs_space/docs/product/PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3D_IMPLEMENT_SIGNUP_STUDENT_ACCESS_DEFAULT_ROW_AFTER_HELPER_FIX.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3C_FIX_REPAIR_STUDENT_ACCESS_VALIDATION_HELPER_CONTRACT.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3C_IMPLEMENT_SIGNUP_STUDENT_ACCESS_DEFAULT_ROW.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3B_STUDENT_ACCESS_BACKFILL_CLOSEOUT_AND_SIGNUP_DEFAULT_ROW_READINESS.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3A_CONFIRM_BACKUP_AND_EXECUTE_STUDENT_ACCESS_BACKFILL_APPLY_LOCAL_DEV.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2V_STUDENT_ACCESS_DEFAULT_ROW_AND_BACKFILL_POLICY_READINESS.md`.
* `nextjs_space/package.json`.
* `nextjs_space/app/api/signup/route.ts`.

## Local/dev Confirmation

The target was classified with a safe no-secret environment check. The check printed only:

* `LOCAL_DEV_TARGET_CONFIRMED`

No raw environment values, database URLs, passwords, tokens, API keys, cookies, or secrets were printed intentionally.

## Non-mutating Verification Before Smoke

From `nextjs_space`:

* `npx.cmd tsx lib/student-access-validation.test.ts`: passed all helper assertions.
* `npm.cmd run build`: passed; Next.js compiled successfully and type checking completed successfully.

## Signup Request Summary

The request body was determined from `nextjs_space/app/api/signup/route.ts`:

* `firstName`.
* `lastName`.
* `email`.
* `password`.
* `confirmPassword`.

The real local API endpoint used:

* `POST http://127.0.0.1:3100/api/signup`.

The local dev server was started on `127.0.0.1:3100` and stopped after the smoke.

## Smoke Attempts

### Sandboxed Attempt

* Email: `smoke-3e-20260522-174944@example.test`.
* Result: `500`.
* Reason observed: the sandboxed app process could not complete database access.
* Follow-up read-only DB presence check after approved network access:
  * `userExists = false`.
  * `studentExists = false`.
  * `accessCount = 0`.

No data was left by the sandboxed failed attempt.

### Approved Local/dev Smoke

Because the sandboxed attempt failed before creating data and the reason was clear, one approved local/dev smoke was run with network access for the configured dev database.

* Email: `smoke-3e-20260522-180640@example.test`.
* Response status: `201`.
* Response result:
  * `userId` present.
  * `studentId` present.
  * `email = smoke-3e-20260522-180640@example.test`.
  * `next = /now`.

The smoke password was a dummy test value and was not printed in logs or documentation.

## DB Read-only Verification Result

The successful smoke account was verified with a read-only Prisma Client query by unique email.

Result:

* `userExists = true`.
* `studentExists = true`.
* `accessCount = 1`.

Verified `StudentAccess` fields:

* `accessStatus = no_access`.
* `trialStatus = none`.
* `subscriptionStatus = none`.
* `trialInvitedAt = null`.
* `trialActivatedAt = null`.
* `trialExpiresAt = null`.
* `trialExperienceUsedAt = null`.
* `tutoringDirection = null`.
* `continuityTarget = null`.
* `lastDecisionBy = system`.
* `lastDecisionReason = public_signup_default_no_access`.
* `lastDecisionAt` present.

Related records checked read-only:

* `enrollmentCount = 0`.
* `programCount = 0`.
* `cycleCount = 0`.
* `loadCount = 0`.

## What Was Not Checked

* No browser signup smoke was run.
* No login smoke was run.
* No `/now` behavior was checked.
* No admin behavior was checked.
* No trial, subscription, payment, runtime enforcement, or UI behavior was checked.
* No cleanup was performed; the successful local/dev smoke account remains as test data.

## Explicit Non-goals

* No code changes.
* No signup route edits.
* No bug fixes.
* No auth or login behavior changes.
* No runtime access enforcement.
* No trial activation.
* No trial invitations beyond existing signup behavior; none were created by the verified `StudentAccess` row.
* No subscriptions.
* No payments.
* No programs.
* No enrollments.
* No learning cycles.
* No study loads.
* No admin behavior.
* No `/now` behavior.
* No UI implementation.
* No staging/prod.
* No schema change.
* No Prisma migration, `prisma db push`, manual SQL, seed script, deploy, commit, or push.
* No `.docx` files.
* No secrets, passwords, tokens, API keys, raw database URLs, raw environment values, or raw cookies.

## Verification Commands and Results

* `git status --short`: clean before documentation edits.
* `git log --oneline --decorate --graph -8`: matched `HEAD = origin/main = c25a551`.
* Safe local/dev classification: `LOCAL_DEV_TARGET_CONFIRMED`.
* `npx.cmd tsx lib/student-access-validation.test.ts`: passed.
* `npm.cmd run build`: passed.
* Local dev server readiness on `127.0.0.1:3100`: confirmed before the successful smoke.
* Successful signup smoke response: `201`.
* DB read-only verification for successful smoke account: passed.
* DB read-only verification for the earlier failed sandbox account: confirmed no data was created.

Final documentation verification is recorded in `PHASE_LOG.md`.

## Final Verdict

`SIGNUP_DEFAULT_ROW_LOCAL_DEV_SMOKE_PASSED`

## Next Recommended Phase

Do not proceed automatically. Possible next phases:

* Read-only admin visibility for `StudentAccess`.
* Controlled access-state display/readiness.
* Pause at clean signup smoke baseline.
