# MVP-SALES-TRIAL-2A - Trial and Access Control Boundary After Signup

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: Block 1 closed at `22c21ca`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: documentation/design/readiness only for the trial/access boundary after signup.
- Explicit non-goals: no implementation, app code changes, schema changes, package changes, deploy, staging/prod, SQL, Prisma CLI, DB mutation, dev server, secret inspection, account creation, enrollment creation, trial creation, billing/payment/subscription, Program, LearningCycle, StudyLoad, Student edit, password reset, auth/signup/login/admin guard change, Block 7, FK User/Student, seed, commit, push, or generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: both `22c21ca315a90cef6bbb184e3b812697f696daca`.
- Baseline verdict: baseline matched expected `22c21ca`; working tree was clean at phase start. Git preflight is the live truth.

## 3. Inputs reviewed
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1M_BLOCK_1_CLOSEOUT_AND_NEXT_BLOCK_READINESS.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`.
- `PHASE_LOG.md -Tail 560`.
- `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`.
- `nextjs_space/docs/operations/MVP_STUDENT_REQ_1_STUDENT_EXPERIENCE_TRIAGE.md`.
- `nextjs_space/docs/operations/MVP_UI_FLOW_2_HIDE_CYCLE_LABEL_AND_REFRESH_NOW_COPY.md`.

Stale baseline issues:
- `MVP_SALES_READY_ACTIVE_CONTEXT.md` still names `b082e10` and AUTH-1A as the current priority.
- `MVP_SALES_READY_ROADMAP.md` still names AUTH-1A as the current next recommended phase.
- Git preflight and the accepted PHASE_LOG chain win. The live TRIAL-2A baseline is `22c21ca`, after Block 1 closeout.

## 4. Current state after Block 1
- Public signup works.
- User + Student creation works through normalized email linkage.
- Student can sign in and reaches `/now`.
- The pending no-program state is safe: account ready, no active program, activation pending, and no activities assigned.
- Student cannot access `/admin`.
- Admin visibility exists via AUTH-1F evidence: a self-signup student can be seen as unenrolled / without program.
- No trial, billing, payment, subscription, enrollment, Program, LearningCycle, StudyLoad, PAES path assignment, or content route exists automatically after signup.

## 5. Canonical student experience alignment
This trial/access boundary must remain aligned with the canonical student experience already defined for Bexauri.

The canonical direction requires a student-facing journey that is calm, explicit, and pedagogically honest:

- student signs up / creates account;
- student reaches a safe dashboard or `/now` state;
- no activity is shown before access and program state are valid;
- when access exists, the student understands what tutoring/program they are entering;
- study activity happens inside the app with clear instructions;
- completion, self-report, review/feedback, and next step must be coherent;
- dashboard/state must update without pretending that unavailable work exists;
- human/admin supervision can operate in parallel, but should not block basic student clarity;
- sales/trial/subscription states must not confuse the student about whether tutoring has actually started.

Block 2 must therefore design the student experience stages before implementing technical access states.

## 6. Block 2 problem statement
The student can now enter the system, but Bexauri has no explicit access model after account creation.

Block 2 must define what "trial" or "access of test" means before implementing payment, enrollment, or content automation. Unsafe shortcuts could create false promises, make a student think tutoring has started, or generate fake pedagogical activity before a valid access/enrollment decision exists.

The key boundary is between:
- account created;
- student pending;
- trial/access invited or active;
- paid/active access;
- enrollment/program active;
- real activity inside Bexauri.

## 7. Trial definition options
### Option A: no trial yet, manual activation only
- What student sees: current safe pending state after signup; no program, no activities, activation/review pending.
- What admin sees: new self-signup student visible as unenrolled; owner/admin decides next contact/action manually.
- Data implications: can operate with current User, Student, and absence of active enrollment; no schema required for the first manual process.
- Sales-ready pros: safest short-term boundary; avoids fake access, fake activities, and premature billing/enrollment semantics.
- Risks: not autonomous enough for sales-ready beyond early manual follow-up; trial intent is not traceable unless documented externally.
- Recommendation: acceptable as current state, but insufficient as the final Block 2 outcome.

### Option B: trial as commercial/access state before payment but before enrollment
- What student sees: account exists; trial may be pending/invited/active, but no real tutoring activities appear until enrollment/program is created.
- What admin sees: student access state separate from enrollment; admin can approve/start/expire trial before choosing program/enrollment.
- Data implications: likely requires future explicit access/trial state or operational record; current schema can only approximate it manually.
- Sales-ready pros: clean separation between commercial access and pedagogical enrollment; preserves Block 7 and avoids fake StudyLoads.
- Risks: requires careful state design to avoid overbuilding and avoid confusing "trial active" with "program active".
- Recommendation: best MVP direction for Block 2 design.

### Option C: trial as limited program enrollment
- What student sees: trial means entry into a real program/enrollment, possibly with limited duration or scope.
- What admin sees: trial students are enrolled students with special access/payment state.
- Data implications: needs enrollment, Program, possibly LearningCycle/StudyLoad, and later payment/access rules.
- Sales-ready pros: closest to a real tutoring experience.
- Risks: crosses into Block 4 enrollment and risks opening Block 7/content before access/payment policy is ready; can create real pedagogical records prematurely.
- Recommendation: not recommended for immediate Block 2.

### Option D: trial as onboarding/intake only
- What student sees: access to an intake/onboarding step or request form, not tutoring activities.
- What admin sees: student awaiting review, contacted, invited, or ready for trial/enrollment decision.
- Data implications: may need future onboarding/intake status or record; can be manual initially.
- Sales-ready pros: useful bridge from signup to sales conversation without promising tutoring access.
- Risks: if called "trial", it may overpromise; should be framed as intake or access review unless a real trial is granted.
- Recommendation: useful companion to Option B, but should not be mislabeled as the whole trial.

## 8. Recommended MVP trial/access boundary
Recommended boundary: Option B with Option D as a manual/intake precursor.

- Before trial, a self-signup student can sign in, view `/now`, and see a pending/no-access-to-program state. They cannot start activities, view fake StudyLoads, enroll themselves, pay, or access admin.
- Trial/access starts by an explicit admin/owner decision, not automatically at signup.
- Initial owner/admin operation can be manual while the state model is designed.
- Trial does not automatically grant Program/enrollment in the next step unless a later enrollment phase authorizes that.
- Trial does not automatically grant activities or create StudyLoads.
- Payment is not required to define trial/access semantics, but paid access must remain a separate later state for Block 3.
- What remains manual: contact/review, decision to invite/start trial, decision to convert to paid access, and decision to enroll in a program.
- What must not happen automatically: enrollment, Program, LearningCycle, StudyLoad, PAES path assignment, billing/payment/subscription, or Block 7 content route activation.

## 9. Owner trial direction for MVP-Beta
Mauricio's intended MVP trial direction is:

- trial duration: 7 days;
- trial scope: one tutoring experience only;
- after 7 days, access is blocked;
- unlocking continued access requires purchasing a subscription.

This direction is accepted as the product target for Block 2, but not as an implementation instruction yet. It must be translated into an explicit student-experience model, access-state model, expiration behavior, subscription handoff, and enrollment/content boundary before code or schema changes.

## 10. Student experience design prerequisite
Before implementing trial/access behavior, Bexauri must design how the student operates across the full post-signup experience.

At minimum, the next design work must define:

- what the student sees immediately after signup;
- what the student sees before trial is granted;
- what the student sees when trial is invited or pending;
- what the student sees during the 7-day trial;
- what "one tutoring experience" means operationally;
- what happens when the trial expires;
- what the blocked state looks like after day 7;
- what subscription purchase unlocks;
- what happens after purchase;
- what remains manual for the owner/admin;
- what must not appear before enrollment/content is valid.

No implementation should proceed until these stages are agreed. The product experience must drive the technical state model, not the reverse.

## 11. Missing student-stage definitions before implementation
Before any Block 2 implementation, the following must be defined and accepted:

- post-signup no-access state;
- trial invitation or pending state;
- 7-day trial active state;
- what "one tutoring experience" means in student-visible terms;
- whether trial includes choosing a tutoring area or receiving one assigned by owner/admin;
- whether trial includes real study activity or only onboarding/intake;
- what the student sees each day during trial;
- what happens on day 7;
- blocked-after-trial state;
- subscription purchase path;
- post-purchase state;
- handoff from access/subscription to enrollment/program;
- what the student sees if admin has not acted yet;
- what the student sees if payment/subscription exists but enrollment/program is not ready;
- what must never be shown before valid enrollment/content exists.

## 12. Access states
Conceptual states, not implemented:
- `signed_up_no_access`: exists today implicitly through User + Student and no active enrollment/program.
- `trial_pending_or_invited`: future state; admin/owner has invited or is preparing trial/access, but no active tutoring access exists yet.
- `trial_active`: future state; student has time-boxed or limited commercial access, but this must not imply activities unless an enrollment/program phase explicitly grants them.
- `access_expired`: future state; prior access ended and student should not see active work unless paid/enrolled.
- `paid_or_active_access`: future state for Block 3 or later; commercial access is active.
- `enrolled_active_program`: exists conceptually today via active `StudentProgramInstance`, but self-serve creation is deferred to Block 4.

Today only `signed_up_no_access` and existing admin-created `enrolled_active_program` can be inferred from current data. The other states are future design/implementation candidates.

## 13. Data model boundary
Can be represented today without schema:
- `signed_up_no_access` as User + Student with no active enrollment/program.
- `enrolled_active_program` as an active `StudentProgramInstance`, when created by existing admin flows.
- Manual owner/admin tracking outside app for early conversations.

Probably requires schema:
- explicit trial invitation;
- trial start/end timestamps;
- access expiration;
- access source/manual actor;
- onboarding/intake status;
- paid vs trial access separation;
- audit of access decisions.

Should not be added yet:
- billing provider records;
- subscription state;
- automatic enrollment state;
- Program/LearningCycle/StudyLoad creation;
- PAES path fields;
- FK User/Student hardening as part of Block 2A.

`Student.status` should remain identity/profile status and should not be overloaded as trial, lead, payment, access, or enrollment state.

## 14. Student UI boundary
Behavior only, not implementation copy:
- Before access: `/now` should continue to say account ready, no active program, activation/review pending, and no activities assigned.
- Trial pending/invited: future UI may say access is being reviewed or an invitation is pending, but should not show work or imply a program is active.
- Trial active: future UI should clearly distinguish trial/access status from program/enrollment. If no program is active, it should not show activities.
- Expired/no access: future UI should say access is inactive/expired and route the student toward contact or next steps without showing active work.

No UI should show fake activities, placeholder StudyLoads, or content route promises before valid access plus an authorized enrollment/program path exists.

## 15. Admin/owner operations boundary
Admin/owner must eventually be able to see or decide:
- new signup awaiting action;
- contact/review status;
- whether to invite or start trial;
- whether access is active, expired, or rejected;
- whether the student should move to payment;
- whether the student should move to enrollment;
- eventual handoff to Block 3 payment/subscription and Block 4 enrollment.

For the immediate next step, this can be a design/state model. Implementation should wait until the access states and manual owner decisions are accepted.

## 16. Explicit deferrals
- Billing provider deferred.
- Subscription deferred.
- Payment checkout deferred.
- Automated enrollment deferred.
- Program/LearningCycle/StudyLoad creation deferred.
- PAES path assignment deferred.
- Block 7 deferred.
- FK User/Student deferred.

## 17. Sales-ready minimum for Block 2
The smallest acceptable Block 2 outcome is an explicit, traceable access boundary after signup:
- a self-signup student has no tutoring/program access by default;
- admin/owner can decide or mark trial/access intent;
- trial/access state is separate from enrollment and payment;
- student UI remains honest and does not show fake work;
- access can expire or remain pending without breaking login;
- later billing and enrollment phases can consume the access decision without redefining it.

## 18. Recommended next phase
`MVP-SALES-TRIAL-2B - Design canonical student trial experience stages`

Scope: Documentation/design/readiness only. Align the 7-day one-tutoring trial with the canonical student journey from signup to no-access, trial invitation, active trial, expiration/block, subscription purchase, post-purchase state, and eventual enrollment/program handoff. No implementation.

The access state model should follow after the student experience stages are agreed.

## 19. Final verdict
READY_FOR_CANONICAL_STUDENT_TRIAL_EXPERIENCE_STAGE_DESIGN
