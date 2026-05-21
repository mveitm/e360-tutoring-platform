# MVP-SALES-AUTH-1M - Block 1 Closeout and Next-Block Readiness

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: AUTH-1L closed at `1e06a7d`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: documentation/readiness closeout for Block 1 and recommendation of the next roadmap-aligned block.
- Explicit non-goals: no implementation, app code changes, schema changes, package changes, deploy, staging/prod, SQL, Prisma CLI, DB mutation, dev server, secret inspection, account creation, enrollment, trial, billing/payment/subscription, Program, LearningCycle, StudyLoad, Student edit, password reset, auth/signup/login/admin guard change, Block 7, FK, seed, commit, push, or generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: both `1e06a7d3dad8879b7e77d24fec43dc6ce01e2092`.
- Baseline verdict: baseline matched expected `1e06a7d`; working tree was clean at phase start. Git preflight is the live truth.

## 3. Inputs reviewed
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1L_CONTROLLED_FOLLOWUP_SMOKE.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1K_FIX_NOW_PENDING_STATE_SMOKE_BLOCKER.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1H_POST_SIGNUP_NOW_PENDING_STATE_COPY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1G_POST_SIGNUP_ONBOARDING_ENROLLMENT_BOUNDARY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1F_ADMIN_CREDENTIALED_REGRESSION_RETRY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1C_STUDENT_SIGNUP_ACCOUNT_CREATION.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `PHASE_LOG.md -Tail 520`.
- Additional historical AUTH evidence: AUTH-1A, AUTH-1B, AUTH-1D, and AUTH-1E operational docs.

Stale baseline issues:
- Historical AUTH docs correctly retain their own phase baselines.
- `MVP_SALES_READY_ROADMAP.md` still names AUTH-1A as the current next recommended phase from the original roadmap state.
- Git preflight and the accepted PHASE_LOG chain win. The live AUTH-1M baseline is `1e06a7d`.

## 4. Block 1 objective
Block 1 was supposed to establish the first safe self-serve student entry point before trial, payment, enrollment, content, or tutoring automation:
- self-serve student account creation;
- safe login;
- Student identity bootstrap;
- safe `/now` state before enrollment;
- admin visibility of self-signup students;
- no premature billing, enrollment, trial, content, Program, LearningCycle, or StudyLoad automation.

## 5. Evidence chain AUTH-1A to AUTH-1L
- AUTH-1A: audited the existing signup/login/student bootstrap state and found no real public student signup path; identified email-only User/Student linkage and `/now` dependency chain.
- AUTH-1B: defined the normalized email-based User/Student bootstrap contract and deferred FK, billing, trial, enrollment, and Block 7 work.
- AUTH-1C: implemented public student signup, normalized email handling, transactional User + Student creation, student login routing, and admin/student route split.
- AUTH-1D: ran controlled local signup smoke; verified one local User + Student creation, student login to `/now`, no assigned activities, duplicate protection, and student `/admin` redirect.
- AUTH-1E: reviewed signup/login UX and identified missing admin credentialed regression as a blocker for confidence, without finding an app-code blocker.
- AUTH-1F: completed credentialed admin regression; verified admin access and admin visibility of a self-signup student as clearly unenrolled.
- AUTH-1G: defined the post-signup onboarding/enrollment boundary: account ready, no active program yet, activation pending, no enrollment/trial/payment/content promises.
- AUTH-1H: implemented clearer `/now` pending-state copy for authenticated students with no active program/enrollment.
- AUTH-1I: attempted pending-state smoke but was blocked by missing student session/credential, with no code fix indicated.
- AUTH-1J: retried with one controlled signup but the flow failed visually before `/now`; documented the smoke blocker.
- AUTH-1K: diagnosed and fixed fragile post-signup auth/navigation behavior; verified build and non-mutating runtime checks.
- AUTH-1L: performed controlled follow-up smoke; verified signup success, student `/now`, pending copy, no real pending/in-progress activities, and student `/admin` blocked, with admin visibility inherited from AUTH-1F.

## 6. Current validated behavior
- Public signup exists.
- User + Student creation works through the public student signup flow.
- Normalized email linkage works as the transitional User/Student approach.
- Student can log in.
- Student reaches `/now`.
- Pending copy renders: account ready, no active program, activation pending, and no activities assigned.
- No fake pending/in-progress activities are shown for the newly signed-up unenrolled student.
- Student admin boundary holds.
- Admin visibility is acceptable using AUTH-1F evidence: admin can see a self-signup student as unenrolled / without program.

## 7. Block 1 non-goals preserved
- No enrollment automation.
- No trial.
- No billing/payment/subscription.
- No Program creation.
- No LearningCycle creation.
- No StudyLoad creation.
- No PAES path assignment.
- No Block 7.
- No FK User/Student.
- No schema/package/deploy changes.
- No staging/prod mutation.

## 8. Readiness verdict for Block 1
`BLOCK_1_CLOSED_WITH_MINOR_FOLLOWUPS`

Block 1 is closed for MVP beta purposes because the self-serve student account path now exists, creates the expected identity records, logs the student in, lands them in a safe `/now` pending state, preserves the admin boundary, and has admin visibility evidence. It is not a full sales-ready conversion flow: trial, access control, billing, enrollment, program selection, and content routes remain intentionally deferred to later roadmap blocks.

The remaining issues are minor or future-hardening items rather than blockers for Block 1 closeout.

## 9. Minor follow-ups, if any
Minor UX/copy polish:
- Signup/login copy can be refined later for accents/localization and more polished Spanish labels/placeholders.
- The fallback login success copy can be improved when broader onboarding copy is designed.

Technical hardening later:
- Email-only User/Student linkage remains transitional.
- FK User/Student may be future hardening after a dedicated schema/backfill/reconciliation phase.
- Email edit/reconciliation rules remain important while email-only linkage exists.

Operational/manual follow-ups:
- Admin visibility for the AUTH-1L student was inherited from AUTH-1F rather than directly retested.
- Admin or owner action is still required after signup because no enrollment/trial/billing boundary exists yet.

These are not blockers for Block 1 closeout.

## 10. Risks carried forward
- Manual bottleneck after signup: an operator still needs to decide what happens next.
- No onboarding/intake status field yet.
- No billing/trial/enrollment boundary implemented.
- No self-serve program selection.
- Email-only linkage remains the primary User/Student bridge.

## 11. Next roadmap block recommendation
The active roadmap identifies Block 2 as `Trial and access control`.

Block 1 should not drift into billing, payment, enrollment, or content implementation by momentum. The next roadmap concern is to define how a signed-up but unenrolled student moves toward controlled access: whether trial exists, what access it grants, what starts it, what blocks it, and how it relates to later plan/payment/subscription and enrollment blocks.

Because this is a boundary decision after identity bootstrap, the next phase should be documentation/design/readiness first, not implementation, unless Mauricio explicitly authorizes implementation after the boundary is accepted.

## 12. Recommended next phase
`MVP-SALES-TRIAL-2A - Define trial and access control boundary after signup`

Scope: documentation/design/readiness only for Block 2. Define trial/access states, what access a self-signup student has before payment/enrollment, what remains manual, what must not be created automatically, and how Block 2 hands off to later billing/payment and enrollment blocks. No app code, schema, package, deploy, DB mutation, SQL, Prisma CLI, secrets, enrollment, billing/payment/subscription, Program, LearningCycle, StudyLoad, PAES path assignment, or Block 7 work.

## 13. Final verdict
BLOCK_1_CLOSED_WITH_MINOR_NON_BLOCKING_FOLLOWUPS
