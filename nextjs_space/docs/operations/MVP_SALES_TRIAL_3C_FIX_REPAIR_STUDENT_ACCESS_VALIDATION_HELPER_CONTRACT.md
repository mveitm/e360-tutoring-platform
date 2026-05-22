# MVP-SALES-TRIAL-3C-FIX - Repair StudentAccess Validation Helper Contract

## Purpose

Repair the TypeScript/app-build contract of the pure `StudentAccess` validation helper so future signup default-row integration can import and call it without the previous build failure around `LEGAL_STUDENT_ACCESS_PAIRS[input.accessStatus]`.

This phase does not implement signup default-row behavior and does not reopen the full signup integration.

## Baseline

Expected baseline:

* `HEAD = origin/main = ec5af08`.
* Latest accepted commit: `MVP-GOV-PRODUCT-CONTEXT-1: synthesize product UI brand context`.
* Working tree expected: clean.

Preflight result:

* `git status --short`: clean before edits.
* `git log --oneline --decorate --graph -8`: `ec5af08` at `HEAD`, `origin/main`, and `origin/HEAD`.

Git preflight remains the living truth.

## Context Gate Summary

Phase type:

* Technical repair / implementation, narrow contract fix.

Product horizon:

* MVP-Beta-Pre-Sales-Ready support.

Roadmap block:

* StudentAccess/signup-access foundation after GOV-CONTEXT and product/UI/brand context intake.

GO / NO-GO:

* GO, because Git preflight matched, the helper source was located, the previous blocker was understood from docs and code, and the repair stayed limited to the helper/type contract.

Roadmap change-control check:

* No roadmap change control required. This phase changed no product horizon, commercial promise, runtime behavior, student-facing behavior, signup behavior, trial, subscription, payment, admin, `/now`, UI, DB, schema, deploy, or public offer.

## Files Changed

* `nextjs_space/lib/student-access-validation.ts`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3C_FIX_REPAIR_STUDENT_ACCESS_VALIDATION_HELPER_CONTRACT.md`
* `PHASE_LOG.md`

## Root Cause

`StudentAccessValidationInput.accessStatus` and `StudentAccessValidationInput.trialStatus` are intentionally typed as `string` because the helper validates untrusted or persistence-shaped input.

The helper correctly checked:

* `isStudentAccessStatus(input.accessStatus)`
* `isStudentTrialStatus(input.trialStatus)`

But after those checks it indexed the legal-pair map through the original property expression:

* `LEGAL_STUDENT_ACCESS_PAIRS[input.accessStatus]`

During the Next.js app build, TypeScript still treated `input.accessStatus` as `string` at that index expression, so it rejected indexing `Record<StudentAccessStatus, readonly StudentTrialStatus[]>` with a broad string.

## Exact Fix

The helper now copies the raw input strings into local constants before the guard checks:

* `accessStatus`
* `trialStatus`

The existing guards narrow those local constants, and the legal-pair lookup uses the narrowed `accessStatus` constant. The `includes` check uses the narrowed `trialStatus` constant.

No legal status values changed. No legal pair matrix changed. No validation issue categories changed. No runtime caller was added.

## Why Validation Semantics Were Preserved

The repair changes only how TypeScript sees the already-validated values.

Preserved behavior:

* Unknown `accessStatus` still returns `UNKNOWN_STATUS`.
* Unknown `trialStatus` still returns `UNKNOWN_STATUS`.
* Illegal legal-status pairs still return `ILLEGAL_PAIR`.
* Field invariant validation still runs only when both statuses are known.
* Subscription status validation still runs independently.
* Timestamp, expiration, transition, and decision-context validation remain unchanged.
* No `as any`, `@ts-ignore`, or `@ts-expect-error` was added.

## Explicit Non-Goals

This phase did not:

* implement signup default-row behavior;
* edit signup route or signup UI;
* change auth behavior;
* change runtime access enforcement;
* change billing;
* change trial activation;
* change admin behavior;
* change `/now` behavior;
* implement UI;
* touch staging/prod;
* touch `schema.prisma`;
* run Prisma;
* touch DB;
* run SQL;
* run seed scripts;
* deploy;
* commit;
* push;
* copy or commit `.docx` files.

## Verification Commands and Results

Commands run:

* `npx.cmd tsx lib/student-access-validation.test.ts` from `nextjs_space`: passed all helper assertions.
* `npm run build` from `nextjs_space`: blocked by local PowerShell execution policy for `npm.ps1`.
* `npm.cmd run build` from `nextjs_space`: passed. Next.js compiled successfully and type checking completed successfully.
* `git diff --check`: passed with Git line-ending warnings only.

Final verification after documentation updates:

* `git status --short`: `M PHASE_LOG.md`, `M nextjs_space/lib/student-access-validation.ts`, and untracked operation doc.
* `git diff --stat`: `PHASE_LOG.md` and `nextjs_space/lib/student-access-validation.ts` changed; untracked operation doc not included by Git diff stat.
* `git diff --check`: passed with Git line-ending warnings only.
* `rg -n "as any|@ts-ignore|@ts-expect-error|LEGAL_STUDENT_ACCESS_PAIRS|validateStudentAccessSnapshot" nextjs_space`: confirmed the repaired helper indexes `LEGAL_STUDENT_ACCESS_PAIRS` with the narrowed `accessStatus`; no `as any`, `@ts-ignore`, or `@ts-expect-error` was added to the helper repair. Existing unrelated `as any` matches remain elsewhere in the repo.

## Final Verdict

```text
STUDENT_ACCESS_VALIDATION_HELPER_CONTRACT_REPAIRED
```

## Next Recommended Phase

After review, commit, and push by Mauricio, the next technical decision should be explicit:

* either reopen signup default-row integration under a full Context Gate, or
* pause at the repaired helper baseline.

Do not automatically implement signup default-row behavior from this phase.
