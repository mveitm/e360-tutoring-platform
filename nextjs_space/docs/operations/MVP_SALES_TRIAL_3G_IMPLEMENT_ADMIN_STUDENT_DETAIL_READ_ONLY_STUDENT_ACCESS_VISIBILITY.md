# MVP-SALES-TRIAL-3G - Implement Admin Student Detail Read-only StudentAccess Visibility

## Purpose

Implement the smallest safe read-only `StudentAccess` visibility panel in the admin student detail page, following the readiness decision from `MVP-SALES-TRIAL-3F`.

This phase adds internal admin visibility only. It does not add mutations, trial activation, runtime enforcement, subscription/payment behavior, signup changes, `/now` changes, student UI, schema changes, Prisma commands, DB mutation, deploy, commit, or push.

## Baseline

* Expected HEAD and `origin/main`: `8724d54`.
* Latest accepted commit: `MVP-SALES-TRIAL-3F: define admin StudentAccess read-only visibility readiness`.
* Working tree expected before edits: clean.
* Preflight result: matched expected baseline and clean working tree.

## Context Gate Summary

* Phase type: technical implementation, narrow admin read-only visibility.
* Product horizon: MVP-Beta-Pre-Sales-Ready support.
* Roadmap block: StudentAccess/signup-access foundation after 3F admin read-only visibility readiness.
* Context Gate decision: GO.
* Reason: Git preflight matched, admin detail route and component existed, 3F defined the implementation target, and the scope remained limited to the allowed files.
* Roadmap change-control check: not required because this phase adds admin-only read-only visibility with no public offer, commercial promise, student-facing UI/copy, trial, subscription, payment, program coverage, runtime enforcement, or mutation change.

## Docs Read

* `PHASE_LOG.md`.
* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`.
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`.
* `nextjs_space/docs/governance/AUTOPROPAGATING_HANDOFF_PROTOCOL_V2.md`.
* `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`.
* `nextjs_space/docs/product/PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3F_ADMIN_READ_ONLY_STUDENT_ACCESS_VISIBILITY_READINESS.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3E_CONTROLLED_LOCAL_DEV_SIGNUP_DEFAULT_ROW_SMOKE.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3D_IMPLEMENT_SIGNUP_STUDENT_ACCESS_DEFAULT_ROW_AFTER_HELPER_FIX.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3C_FIX_REPAIR_STUDENT_ACCESS_VALIDATION_HELPER_CONTRACT.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3B_STUDENT_ACCESS_BACKFILL_CLOSEOUT_AND_SIGNUP_DEFAULT_ROW_READINESS.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2V_STUDENT_ACCESS_DEFAULT_ROW_AND_BACKFILL_POLICY_READINESS.md`.

## Source Files Inspected

* `nextjs_space/prisma/schema.prisma`.
* `nextjs_space/app/api/students/[id]/route.ts`.
* `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`.
* `nextjs_space/app/admin/students/[id]/page.tsx`.
* `nextjs_space/app/admin/layout.tsx`.

## Files Changed

* `nextjs_space/app/api/students/[id]/route.ts`.
* `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3G_IMPLEMENT_ADMIN_STUDENT_DETAIL_READ_ONLY_STUDENT_ACCESS_VISIBILITY.md`.
* `PHASE_LOG.md`.

## Implementation Summary

The existing admin student detail API response now includes a narrow optional `access` object selected from `Student.access`.

The existing admin student detail component now renders a read-only `StudentAccess` panel below the student identity header and before existing account/enrollment controls.

No new route, API handler, mutation control, form field, button, repair action, trial action, subscription/payment action, runtime enforcement action, signup behavior, `/now` behavior, student-facing UI, schema, or DB behavior was added.

## Route Response Change

`GET /api/students/[id]` now selects:

* `accessStatus`.
* `trialStatus`.
* `subscriptionStatus`.
* `lastDecisionReason`.
* `lastDecisionBy`.
* `lastDecisionAt`.
* `trialExpiresAt`.

The existing response shape is preserved except for adding optional `access` data.

Existing `PUT` and `DELETE` handlers were not changed.

## UI Panel Summary

The admin student detail page now shows:

* A `StudentAccess` heading.
* Admin-only explanatory copy: `Internal access state. Read-only. Does not activate trial, subscription, enrollment, or runtime access.`
* A read-only field grid when `student.access` is present.
* An admin-only missing-row warning when `student.access` is absent.

The panel contains no buttons, form fields, mutation calls, or repair affordances.

## Fields Shown

* `StudentAccess row`: `Present` or missing-row warning.
* `Access state`.
* `Trial state`.
* `Subscription state`.
* `Last decision reason`.
* `Last decision by`.
* `Last decision at`.
* `Trial expires at`, shown as `Not set` when null or missing.

## Fields Intentionally Excluded

* `trialInvitedAt`.
* `trialActivatedAt`.
* `trialExperienceUsedAt`.
* `tutoringDirection`.
* `continuityTarget`.
* Raw `StudentAccess` technical IDs.
* Mutation controls.
* Trial activation controls.
* Trial invitation controls.
* Subscription/payment actions.
* Runtime enforcement controls.
* Student-facing copy.

## Missing-row Handling

If `student.access` is missing, the panel shows:

* `StudentAccess row: Missing`.
* `StudentAccess row missing. Do not treat as no access automatically. Investigate row lifecycle before enabling StudentAccess-dependent reads or mutations.`

The implementation does not auto-create missing rows, infer `no_access`, or offer a repair action.

## Why This Is Read-only and Non-mutating

The route change only extends the existing admin detail `GET` query with a relation select.

The UI change only renders returned fields.

No POST, PATCH, DELETE, Prisma write, form submit, button, mutation handler, trial action, subscription/payment action, enrollment action, Program/LearningCycle/StudyLoad action, runtime enforcement, or StudentAccess repair path was added.

## Explicit Non-goals

This phase did not:

* Add `StudentAccess` mutations.
* Add POST/PATCH/DELETE for `StudentAccess`.
* Add repair buttons.
* Auto-create missing `StudentAccess` rows.
* Change signup.
* Change auth or login.
* Change runtime access enforcement.
* Activate trial.
* Create trial invitations.
* Create subscriptions.
* Create payments.
* Create programs.
* Create enrollments.
* Create learning cycles.
* Create study loads.
* Change `/now`.
* Change student UI.
* Change public copy.
* Touch admin student list.
* Touch staging/prod.
* Change `schema.prisma`.
* Run Prisma migrations, `prisma db push`, `prisma migrate`, manual SQL, seed scripts, deploy, commit, or push.
* Print secrets, passwords, tokens, database URLs, API keys, raw environment values, or raw cookies.
* Copy or commit `.docx` files.

## Verification Commands and Results

* `git status --short` before edits: clean.
* `git log --oneline --decorate --graph -8`: `8724d54` at `HEAD`, `origin/main`, and `origin/HEAD`.
* `git diff --check`: passed with Git line-ending warnings only.
* `npm.cmd run build` from `nextjs_space`: passed; Next.js compiled successfully and type checking completed successfully.

Final verification is recorded in `PHASE_LOG.md`.

## Final Verdict

`ADMIN_STUDENT_ACCESS_READ_ONLY_VISIBILITY_IMPLEMENTED`

## Next Recommended Phase

After Mauricio review, commit, and push, a future phase may run a controlled admin UI/API read smoke for a known student with `StudentAccess`, if a safe admin session or credential path is available without printing secrets.

Do not proceed automatically to mutations, trial activation, runtime enforcement, subscription/payment, signup changes, `/now`, student UI, schema/Prisma/DB, staging/prod, deploy, commit, or push.
