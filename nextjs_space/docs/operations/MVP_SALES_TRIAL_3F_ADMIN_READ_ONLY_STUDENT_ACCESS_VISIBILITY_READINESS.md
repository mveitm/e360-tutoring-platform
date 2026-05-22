# MVP-SALES-TRIAL-3F - Admin Read-only StudentAccess Visibility Readiness

## Purpose

Define the smallest safe admin read-only visibility path for `StudentAccess` after signup default-row creation was implemented in 3D and smoke-verified in local/dev in 3E.

This is a readiness/design phase only. It does not implement admin UI, API changes, mutations, runtime enforcement, trial activation, billing, subscription, `/now`, student UI, schema, Prisma, DB, staging/prod, deploy, commit, or push.

## Baseline

* Expected HEAD and `origin/main`: `8d88d52`.
* Latest accepted commit: `MVP-SALES-TRIAL-3E: verify signup StudentAccess default row local dev`.
* Working tree expected before edits: clean.
* Preflight result: matched expected baseline and clean working tree.

## Context Gate Summary

* Phase type: readiness/design, documentation-only.
* Product horizon: MVP-Beta-Pre-Sales-Ready support.
* Roadmap block: StudentAccess/signup-access foundation after 3E local/dev signup default-row smoke.
* Context Gate decision: GO.
* Reason: Git preflight matched and the phase remained documentation/readiness-only.
* Roadmap change-control check: not required because this phase changes no product horizon, commercial promise, runtime behavior, UI/copy, trial, subscription, payment, program coverage, tutor/admin workload, or public offer.

## Docs Read

* `PHASE_LOG.md`.
* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`.
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`.
* `nextjs_space/docs/governance/AUTOPROPAGATING_HANDOFF_PROTOCOL_V2.md`.
* `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`.
* `nextjs_space/docs/product/PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3E_CONTROLLED_LOCAL_DEV_SIGNUP_DEFAULT_ROW_SMOKE.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3D_IMPLEMENT_SIGNUP_STUDENT_ACCESS_DEFAULT_ROW_AFTER_HELPER_FIX.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3C_FIX_REPAIR_STUDENT_ACCESS_VALIDATION_HELPER_CONTRACT.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3C_IMPLEMENT_SIGNUP_STUDENT_ACCESS_DEFAULT_ROW.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3B_STUDENT_ACCESS_BACKFILL_CLOSEOUT_AND_SIGNUP_DEFAULT_ROW_READINESS.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3A_CONFIRM_BACKUP_AND_EXECUTE_STUDENT_ACCESS_BACKFILL_APPLY_LOCAL_DEV.md`.
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_2V_STUDENT_ACCESS_DEFAULT_ROW_AND_BACKFILL_POLICY_READINESS.md`.

## Source Files Inspected

Read-only source/schema inspection:

* `nextjs_space/prisma/schema.prisma`.
* `nextjs_space/app/api/students/route.ts`.
* `nextjs_space/app/api/students/[id]/route.ts`.
* `nextjs_space/app/admin/page.tsx`.
* `nextjs_space/app/admin/layout.tsx`.
* `nextjs_space/app/admin/_components/students-view.tsx`.
* `nextjs_space/app/admin/students/[id]/page.tsx`.
* `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`.

Discovery commands:

* `rg -n "admin|students|Student|student|enrollment|program|access|StudentAccess|studentAccess" nextjs_space/app nextjs_space/components nextjs_space/lib`.
* `rg --files nextjs_space/app nextjs_space/components nextjs_space/lib | rg "admin|student|Student|access|Access"`.

## Admin/Student Surfaces Found

Current admin student list:

* Route/page: `nextjs_space/app/admin/page.tsx`.
* Client component: `nextjs_space/app/admin/_components/students-view.tsx`.
* Data source: `GET /api/students` in `nextjs_space/app/api/students/route.ts`.
* Existing display: name, email, student status, count of program instances, links/actions.
* Existing mutations on this surface: create student, edit student, update student status, delete student.

Current admin student detail:

* Route/page: `nextjs_space/app/admin/students/[id]/page.tsx`.
* Client component: `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`.
* Data source: `GET /api/students/[id]` in `nextjs_space/app/api/students/[id]/route.ts`.
* Existing display: student identity, access account presence, password/account controls, enrollment list, enrollment status controls.
* Existing mutations on this surface: create user account, reset password, create enrollment, update enrollment status.

Admin guard:

* `nextjs_space/app/admin/layout.tsx` calls `requireAdminSession()`.
* Student API routes call `requireAdminApi()`.

## Schema and Relation Findings

`StudentAccess` fields available for future display:

* `accessStatus`.
* `trialStatus`.
* `subscriptionStatus`.
* `trialInvitedAt`.
* `trialActivatedAt`.
* `trialExpiresAt`.
* `trialExperienceUsedAt`.
* `tutoringDirection`.
* `continuityTarget`.
* `lastDecisionBy`.
* `lastDecisionAt`.
* `lastDecisionReason`.
* `createdAt`.
* `updatedAt`.

Relations:

* `Student.access` is optional one-to-one.
* `StudentAccess.studentId` is unique.
* `StudentAccess.student` cascades on student deletion.
* `Student.programInstances` already backs enrollment/program display.
* Existing admin student detail already includes `programInstances` with program and learning cycle count, but does not include `access`.

Implication:

* Future implementation can add `access: true` or a narrow `access: { select: ... }` to `GET /api/students/[id]`.
* The detail client type can add an optional `access` object.
* Missing `access` should be visible as an integrity warning or "StudentAccess row missing" state, not silently interpreted as `no_access`.

## Recommended Read-only Visibility Target

First target:

* Admin student detail page only: `/admin/students/[id]`.

Reason:

* It is the most precise internal context for one student.
* It avoids crowding the student list with lifecycle/status details.
* It can present missing-row state clearly.
* It keeps the first implementation small: one GET include/select and one read-only detail panel.

Second target, optional later:

* Admin student list compact row indicator after detail visibility is accepted and verified.

Do not start with:

* Mutation controls.
* Runtime enforcement controls.
* Trial activation buttons.
* Payment/subscription actions.
* Student-facing visibility.

## Recommended Fields and Labels

Recommended first read-only fields for student detail:

* Row presence:
  * Label: `StudentAccess row`.
  * Values: `Present` / `Missing`.
* `accessStatus`:
  * Label: `Access state`.
  * Example values shown as internal status text, not as public promise.
* `trialStatus`:
  * Label: `Trial state`.
* `subscriptionStatus`:
  * Label: `Subscription state`.
* `lastDecisionReason`:
  * Label: `Last decision reason`.
* `lastDecisionBy`:
  * Label: `Last decision by`.
* `lastDecisionAt`:
  * Label: `Last decision at`.
* `trialExpiresAt`:
  * Label: `Trial expires at`.
  * Show only if present; otherwise show `Not set`.

Recommended admin-only explanatory copy:

* `Internal access state. Read-only. Does not activate trial, subscription, enrollment, or runtime access.`

## Fields Intentionally Excluded

Exclude from the first implementation:

* Trial activation controls.
* Trial invitation controls.
* Subscription/payment actions.
* Runtime access enforcement controls.
* Enrollment/program creation from this panel.
* `trialInvitedAt`, `trialActivatedAt`, and `trialExperienceUsedAt` unless a later phase needs expanded audit detail.
* `tutoringDirection` and `continuityTarget` unless a later product/admin readiness phase defines labels and operational meaning.
* Raw technical IDs beyond existing route context.
* Any student-facing copy or public promise.

Reason:

* The first visibility step should help admin inspect state without creating a hidden operational workflow or implying Sales-Ready, trial, payment, or runtime access behavior.

## Missing-row Handling

Future detail panel behavior:

* If `Student.access` is present, show the read-only state fields.
* If `Student.access` is missing, show an admin-only warning:
  * `StudentAccess row missing. Do not treat as no access automatically. Investigate row lifecycle before enabling StudentAccess-dependent reads or mutations.`

Do not:

* Convert missing row to `no_access` in UI.
* Create the row automatically.
* Offer a repair button.
* Continue from missing row into mutation or runtime enforcement.

## Future Implementation Scope

Likely minimal future files:

* `nextjs_space/app/api/students/[id]/route.ts`.
* `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`.
* A future operation doc for the implementation phase.
* `PHASE_LOG.md`.

Likely implementation shape:

* Extend the admin detail GET query with a narrow `access` select.
* Extend the client `StudentDetail` type with optional `access`.
* Add a read-only `StudentAccess` panel on the detail page.
* Keep all existing admin mutations unchanged.
* Add no new API route.
* Add no POST/PATCH/DELETE for `StudentAccess`.
* Add no trial, subscription, payment, enrollment, program, learning cycle, study load, runtime enforcement, `/now`, or student UI behavior.

Stop before implementation if:

* Adding the read-only panel requires changing schema or Prisma migrations.
* The implementation requires DB mutation.
* The implementation requires runtime enforcement or trial/payment/subscription behavior.
* The missing-row state is ambiguous and cannot be shown safely.
* The panel becomes a mutation workflow.

## Future Verification Plan

Recommended checks for the implementation phase:

* `git status --short`.
* `git diff --check`.
* Type/build verification if code changes are made.
* Admin detail API read smoke for a known student with `StudentAccess`.
* Admin detail API read smoke or mocked/local fixture review for missing-row behavior if available without DB mutation.
* Browser/admin visual smoke if a safe admin session is available without printing secrets.
* Confirm no signup behavior changed.
* Confirm no trial activation, subscription/payment, enrollment, Program, LearningCycle, StudyLoad, runtime enforcement, `/now`, or student UI behavior changed.

Do not run Prisma migrations, `prisma db push`, manual SQL, seed scripts, staging/prod, deploy, commit, or push from the implementation phase unless explicitly authorized by its own Context Gate.

## Explicit Non-goals

This phase did not:

* Change code.
* Edit admin UI.
* Add read-only `StudentAccess` visibility.
* Add admin mutations.
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
* Change copy.
* Touch staging/prod.
* Change `schema.prisma`.
* Run Prisma migrations, `prisma db push`, `prisma migrate`, manual SQL, seed scripts, deploy, commit, or push.
* Print secrets, passwords, tokens, database URLs, API keys, raw environment values, or raw cookies.
* Copy or commit `.docx` files.

## Final Verdict

`ADMIN_STUDENT_ACCESS_READ_ONLY_VISIBILITY_READY_FOR_IMPLEMENTATION`

## Next Recommended Phase

After Mauricio review, commit, and push, the next phase may be:

* `MVP-SALES-TRIAL-3G - Implement admin student detail read-only StudentAccess visibility`.

The next phase should remain narrow: add read-only detail visibility only, with no mutations, no trial activation, no runtime enforcement, no billing/subscription/payment, no signup changes, no `/now`, no student UI, no schema/Prisma migration, no DB mutation, no deploy, and no automatic public Sales-Ready claim.
