# MVP-SALES-AUTH-1G - Post-Signup Onboarding/Enrollment Boundary

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: `MVP-SALES-AUTH-1F` closed at `3f92c65`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: documentation/design/readiness only for the student state immediately after signup and before enrollment.
- Explicit non-goals: no app code changes, no schema changes, no package changes, no deploy, no staging/prod, no SQL, no Prisma CLI, no DB mutation, no `.env` or secret inspection, no printed passwords/hashes/tokens/cookies/secrets, no new student account, no enrollment, no trial, no billing/payment/subscription, no Program/LearningCycle/StudyLoad, no Student edit, no password reset, no Block 7, no FK, no seed, no commit, no push, no generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: `3f92c657c859099a0ef8e7c7759cb8b5e18d027e`; `HEAD`, `origin/main`, and `origin/HEAD` point to `3f92c65`.
- Baseline verdict: baseline matches expected `3f92c65`; working tree was clean at phase start.

## 3. Inputs reviewed
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1F_ADMIN_CREDENTIALED_REGRESSION_RETRY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1D_CONTROLLED_LOCAL_SIGNUP_SMOKE.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1C_STUDENT_SIGNUP_ACCOUNT_CREATION.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1B_USER_STUDENT_BOOTSTRAP_CONTRACT.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `PHASE_LOG.md` tail, including AUTH-1F closeout.

Stale baseline note: the roadmap document still lists `MVP-SALES-AUTH-1A` as the current next recommended phase from an older roadmap state. Git preflight and the accepted commit chain win. The live baseline for this phase is `3f92c65`, and PHASE_LOG confirms AUTH-1F as the direct dependency.

## 4. Current validated state
- Signup is implemented as a public student-facing flow.
- Successful signup creates a normalized email-linked `User` and `Student`.
- A student can log in and reach `/now` safely.
- The student is blocked from `/admin`.
- Admin login still reaches `/admin`.
- Admin can see the self-signup student in `/admin/students`.
- The self-signup student is visible as having no enrollment/program.

## 5. Problem statement
Block 1 now has a working identity bootstrap, but the product state immediately after signup is still incomplete:

- The account exists.
- The student identity exists.
- No tutoring relationship, enrollment, plan, program, cycle, or StudyLoad exists yet.
- The student needs honest next-step guidance instead of an implied study plan.
- Admin needs enough visibility to decide the next action manually.
- The system must not imply paid access, free trial access, active program membership, or immediate PAES work.

The gap is not technical account creation anymore. The gap is the post-signup boundary between "you have an account" and "you are enrolled in a tutoring program."

## 6. Boundary principles
- Honest student state: show that the account is ready but tutoring activation is pending.
- No unsupported promises: do not promise immediate activities, trial, payment, tutor assignment, PAES path, or program access.
- No automatic enrollment yet: account bootstrap must stay separate from enrollment creation.
- No billing/trial leakage: avoid copy or behavior that suggests plan status, subscription, or trial has started.
- Admin-visible but not operationally heavy: admin should see the student and no-program state without needing new workflow complexity yet.
- Works without schema change if possible: first hardening should use existing absence of active `StudentProgramInstance` rather than adding new models.
- Future-compatible with enrollment/payment: copy and routing should leave room for later trial, billing, and self-serve enrollment phases.

## 7. Student post-signup experience contract
`/now` or an equivalent authenticated student surface should communicate:

- The account was created and the student is signed in.
- There is no active program yet.
- Tutoring activation, review, or setup is pending.
- The student can wait for next steps, contact the team, or return later.
- The student should not expect assigned work, active tutoring, tutor feedback, payment/trial state, or PAES path selection yet.
- The state should avoid technical language such as User, Student, DB, Prisma, enrollment, cycle, StudyLoad, registry, or schema.

The minimum behavior can be copy/UI only. Sample behavior-level copy, not final UI copy:

> Your account is ready. Your tutoring setup is pending, so no activities are assigned yet.

The key requirement is clarity: this is not an error, not an empty broken dashboard, and not a promise that a program is already active.

## 8. Admin visibility contract
Admin should be able to see:

- The self-signup student exists.
- Name and email.
- No active programs/enrollments.
- Creation date if the existing admin UI exposes it or can expose it without schema changes.
- That action may be needed before the student can work.

Admin should not do yet:

- Create enrollment as part of this boundary design.
- Start trial/payment manually through this phase.
- Assign PAES path automatically.
- Create cycle or StudyLoad just because the student signed up.
- Reset password or edit Student unless needed for separate support.

## 9. Data model boundary
Can be handled with existing data:

- `User` exists.
- `Student` exists.
- Absence of active `StudentProgramInstance` means no active program/enrollment.
- Existing `Student.status = active` can still represent an active identity record, not an enrolled learner.
- Existing program count in admin UI can indicate no program.

Might need future field/status:

- A future onboarding or lead state may be useful if Bexauri needs to distinguish "self-signup awaiting contact", "contacted", "ready for enrollment", "not qualified", or "converted".
- A future `Student.onboardingStatus`, `leadStatus`, or dedicated intake record could support sales operations, reminders, and reporting.
- A future source field such as `signupSource` could distinguish self-serve students from admin-created students.

Should not be added now:

- New schema fields solely to solve first pending-state copy.
- Trial/payment state.
- Enrollment intent state if the next product decision is not made.
- PAES area/path fields before enrollment boundary is designed.
- FK User/Student hardening in this phase.

`Student.status` is enough for the current boundary only if it is interpreted as account/profile status, not onboarding or enrollment state. It should not be overloaded to mean "lead", "pending onboarding", or "trial started" unless that semantic decision is made explicitly later.

## 10. Enrollment boundary
Deferred to later phases:

- Program selection.
- PAES path selection.
- Enrollment creation.
- Initial cycle creation.
- Initial StudyLoad creation.
- Content route selection.
- Tutor assignment.
- Payment/trial gating.

This phase should not decide whether enrollment is admin-led, self-serve, payment-gated, trial-gated, or hybrid. It only states that signup completion alone must not create or imply enrollment.

## 11. Sales-ready minimum
The smallest acceptable sales-ready behavior after signup is:

- Student signs up and can log in.
- Student sees a safe pending state, not a broken or empty-feeling dashboard.
- Student understands that tutoring/program activation is pending.
- Admin can see the student and identify that no program/enrollment exists.
- Owner/admin can decide the next action manually while automation is still deferred.
- The app makes no false promise of immediate study plan, tutor, trial, payment, or PAES path.

This is enough to keep Block 1 moving because it closes the identity bootstrap experience without prematurely solving Blocks 2-4.

## 12. Candidate next implementation
Recommended narrow next phase:

`MVP-SALES-AUTH-1H - Harden post-signup /now pending-state copy`

Likely files:

- `nextjs_space/app/now/page.tsx` - likely needed to refine no-active-program state.
- Existing `/now` child components if the no-enrollment state is delegated there.
- `PHASE_LOG.md`.
- A new operational closeout document.

Exact scope:

- Improve the authenticated student no-active-program/no-enrollment state so it clearly says account is ready and tutoring activation is pending.
- Avoid technical terms and avoid promises of trial, payment, enrollment, PAES selection, or immediate work.
- Preserve current admin routing and admin guard behavior.
- Preserve signup/login behavior.

Explicit non-goals:

- No schema change.
- No enrollment, trial, billing, payment, Program, LearningCycle, StudyLoad, content route, tutor assignment, Block 7, FK, or DB mutation.
- No admin workflow implementation.

Verification criteria:

- Build passes.
- A student without enrollment reaches `/now`.
- `/now` shows a clear pending state.
- `/now` does not show assigned work.
- Student still cannot access `/admin`.
- Admin can still access `/admin` and see the student.
- No entities outside account/profile are created.

## 13. Risks and open decisions
- Manual bottleneck risk: admin/owner must still act manually after signup.
- Student confusion risk: weak pending-state copy may feel like a dead end.
- Premature automation risk: adding enrollment or PAES selection too early could bypass billing/trial/access decisions.
- Sales/payment mixing risk: signup should not imply payment, trial, or program access before Blocks 2-4 define those rules.
- Decision needed before billing/trial: decide whether the next conversion step is admin contact, student intake request, trial gate, plan selection, or self-serve enrollment.
- Future schema decision: decide later whether Bexauri needs explicit onboarding/lead status or whether absence of enrollment remains sufficient through early sales-ready testing.

## 14. Final verdict
READY_FOR_POST_SIGNUP_PENDING_STATE_IMPLEMENTATION
