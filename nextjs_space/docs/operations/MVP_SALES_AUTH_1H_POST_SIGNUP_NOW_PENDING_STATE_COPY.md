# MVP-SALES-AUTH-1H - Post-Signup /now Pending-State Copy

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: `MVP-SALES-AUTH-1G` closed at `b18f4c2`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: minimal `/now` UI/copy implementation plus operational documentation for the authenticated student pending state after signup.
- Explicit non-goals: no schema changes, no package changes, no deploy, no staging/prod, no SQL, no Prisma CLI, no DB mutation, no `.env` or secret inspection, no printed passwords/hashes/tokens/cookies/secrets, no student account creation, no enrollment, no trial, no billing/payment/subscription, no Program/LearningCycle/StudyLoad creation, no Student edit, no password reset, no auth/signup/login/admin guard change, no Block 7, no FK, no seed, no commit, no push, no generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: `b18f4c2e3f76510ecb5d96f02fcb8855428b51e3`; `HEAD`, `origin/main`, and `origin/HEAD` point to `b18f4c2`.
- Baseline verdict: baseline matches expected `b18f4c2`; working tree was clean at phase start.

## 3. Inputs reviewed
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1G_POST_SIGNUP_ONBOARDING_ENROLLMENT_BOUNDARY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1F_ADMIN_CREDENTIALED_REGRESSION_RETRY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1D_CONTROLLED_LOCAL_SIGNUP_SMOKE.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1C_STUDENT_SIGNUP_ACCOUNT_CREATION.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `PHASE_LOG.md` tail, including AUTH-1G closeout.
- Read-only inspection of `nextjs_space/app/now/page.tsx` and `rg` results for the `/now` no-program state.

Stale baseline note: older operational docs retain their historical baselines. Git preflight wins. The live baseline for AUTH-1H is `b18f4c2`.

## 4. Implementation summary
`/now` previously showed a one-line no-active-program message for the branches where the authenticated account had no matching Student or the Student had no active program. This phase added a small local `PendingProgramState` in `nextjs_space/app/now/page.tsx` and used it for those branches.

The new state says the account is ready, there is no active program yet, tutoring activation is being prepared or reviewed, future activities will appear there, and no activities are assigned for now. No queries, routing, auth, admin guard, signup, login, or business logic were changed.

## 5. Files changed
- `nextjs_space/app/now/page.tsx`: added `PendingProgramState` and replaced the terse no-active-program message in the no-Student and no-active-program branches.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1H_POST_SIGNUP_NOW_PENDING_STATE_COPY.md`: operational closeout for this phase.
- `PHASE_LOG.md`: phase ledger entry.

## 6. Student pending-state behavior
A student without active program/enrollment should now see:

- account ready;
- no active program yet;
- tutoring/program activation pending;
- no activities assigned yet;
- no technical language such as User, Student, DB, Prisma, enrollment, cycle, StudyLoad, registry, or schema;
- no unsupported promises of trial, payment, active matricula, tutor assignment, PAES path, automatic diagnosis, or immediate activity.

## 7. Preserved behavior
- Students with active programs, open cycles, pending loads, in-progress loads, and completed load history remain on the existing `/now` flow.
- Admin routing is unchanged.
- Signup/login behavior is unchanged.
- No entities are created by this change.

## 8. Explicitly not implemented
- No enrollment.
- No trial.
- No billing/payment/subscription.
- No Program.
- No LearningCycle.
- No StudyLoad.
- No PAES path selection.
- No Block 7.
- No schema/package/deploy/DB mutation.

## 9. Verification
- `git diff --check`: passed; Git reported LF/CRLF warnings only.
- `npm.cmd run build`: passed.
- `git diff --stat`: run after implementation and after documentation.
- `git status --short`: run after implementation and after documentation.

## 10. Risks and follow-ups
- Runtime student visual smoke was not performed in this phase because no student session/password was required and build plus diff review were sufficient for the approved scope.
- Copy may need later UX polish with accents/localization if the project encoding is normalized.
- Onboarding/enrollment remains unresolved.
- Billing/trial remains deferred.
- The no-Student branch now uses the same student-safe pending state; a future account-integrity phase could differentiate missing profile from missing active program if needed.

## 11. Recommended next phase
`MVP-SALES-AUTH-1I - Controlled visual smoke for post-signup /now pending state`.

Scope: use a safe existing student session or controlled credential path to confirm the pending-state copy renders in `/now`, confirm no assigned work appears, confirm student admin boundary still holds, and confirm admin visibility remains intact. No DB mutation, schema, billing, trial, enrollment, PAES, or Block 7 work.

## 12. Final verdict
READY_FOR_AUTH_1I_PENDING_STATE_SMOKE
