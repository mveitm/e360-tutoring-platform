# MVP-SALES-TRIAL-2C - Trial/Access State Model from Canonical Stages

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2B closed at `8aa9b82`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: documentation/design/readiness only for the conceptual trial/access state model, transitions, actor permissions, timing, continuity, and future implementation boundaries.
- Explicit non-goals: no implementation, app code changes, schema changes, package changes, deploy, staging/prod, SQL, Prisma CLI, DB mutation, dev server, secret inspection, account creation, enrollment creation, trial creation, billing/payment/subscription, Program, LearningCycle, StudyLoad, Student edit, password reset, auth/signup/login/admin guard change, Block 7, FK User/Student, seed, commit, push, or generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: both `8aa9b82ccbeca93c75f156fdd4b30a8756f93bec`.
- Baseline verdict: baseline matched expected `8aa9b82`; working tree was clean at phase start. Git preflight is the live truth.

## 3. Inputs reviewed
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2B_CANONICAL_STUDENT_TRIAL_EXPERIENCE_STAGES.md`.
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2A_TRIAL_AND_ACCESS_CONTROL_BOUNDARY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1M_BLOCK_1_CLOSEOUT_AND_NEXT_BLOCK_READINESS.md`.
- `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`.
- `nextjs_space/docs/operations/MVP_STUDENT_REQ_1_STUDENT_EXPERIENCE_TRIAGE.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `PHASE_LOG.md -Tail 680`.

Stale baseline issues:
- `MVP_SALES_READY_ROADMAP.md` still names AUTH-1A as the current next recommended phase from an older roadmap state.
- Historical docs retain their own phase baselines.
- Git preflight and the accepted PHASE_LOG chain win. The live TRIAL-2C baseline is `8aa9b82`.

## 4. Starting point from TRIAL-2B
- TRIAL-2B defined canonical student stages from signup through post-purchase and enrollment/program handoff.
- Trial target: 7 days.
- Trial scope: one tutoring experience.
- The trial is not pseudo-tutoring or a disconnected sales demo.
- The trial is a real, limited, honest introductory tutoring experience.
- If the student subscribes, Bexauri should preserve continuity with the same tutoring direction whenever pedagogically appropriate.
- Subscription unlocks continued commercial access but does not automatically create enrollment, Program, LearningCycle, StudyLoad, PAES path, or ongoing work.
- Block 7 remains closed.

## 5. State model overview
### `signed_up_no_access`
- Purpose: represent the current post-signup baseline.
- Student-facing meaning: account exists, no tutoring access is active yet.
- Allowed student actions: sign in, see safe `/now` or dashboard state, understand next step.
- Blocked student actions: start trial, start tutoring work, see activities, enroll, access admin.
- Owner/admin responsibility: review new signup or decide whether to contact/invite.
- System responsibility: keep login and safe no-program UI available.
- Exit conditions: owner/admin starts review or invites trial.

### `access_review_pending`
- Purpose: show that owner/admin review or preparation is underway.
- Student-facing meaning: Bexauri is reviewing or preparing access.
- Allowed student actions: sign in, see review/pending state, follow contact instructions if present.
- Blocked student actions: assume trial has started, start activities, view active tutoring.
- Owner/admin responsibility: contact, validate fit, choose tutoring direction, or decide no action.
- System responsibility: avoid dead-end or technical labels.
- Exit conditions: trial invitation, manual rejection/defer, or return to no-access.

### `trial_invited`
- Purpose: separate invitation/readiness from active timed access.
- Student-facing meaning: a 7-day trial with one tutoring experience is available or ready to start.
- Allowed student actions: accept/start if the future flow permits, or wait for admin activation.
- Blocked student actions: access work before activation, access multiple tutorias.
- Owner/admin responsibility: issue invitation and explain scope.
- System responsibility: preserve invitation without starting the clock.
- Exit conditions: explicit trial activation, cancellation, or invitation expiry if later designed.

### `trial_active`
- Purpose: represent the running 7-day trial window.
- Student-facing meaning: trial is active, time is running, one tutoring experience is included.
- Allowed student actions: see trial status and access the prepared experience when available.
- Blocked student actions: access multiple experiences, paid-only continuity, or full enrollment work.
- Owner/admin responsibility: ensure the experience is real and pedagogically coherent.
- System responsibility: track activation and expiry conceptually.
- Exit conditions: experience becomes available/used, expiration, subscription, or owner/admin override.

### `trial_experience_available`
- Purpose: distinguish active timer from actual prepared tutoring experience.
- Student-facing meaning: the one introductory tutoring experience is ready.
- Allowed student actions: start or enter the single experience.
- Blocked student actions: start unrelated areas, generate additional activities, create ongoing work.
- Owner/admin responsibility: prepare/approve the experience and tutoring direction.
- System responsibility: expose only valid work.
- Exit conditions: experience used, trial expires, or owner/admin withdraws access.

### `trial_experience_used`
- Purpose: mark that the single tutoring experience has been consumed.
- Student-facing meaning: the trial experience happened; next step is review, recommendation, subscription, or wait.
- Allowed student actions: see status/summary if available and continue to purchase/contact path.
- Blocked student actions: start a second trial experience automatically.
- Owner/admin responsibility: review evidence and recommend next step.
- System responsibility: prevent duplicate trial work.
- Exit conditions: trial expires, subscription confirmed, or owner/admin exception.

### `trial_expired_blocked`
- Purpose: enforce the day-7 trial boundary.
- Student-facing meaning: trial ended; continued tutoring requires subscription or owner/admin exception.
- Allowed student actions: sign in, see account/trial status, see purchase/contact path.
- Blocked student actions: start or continue tutoring work, access activities, see active program work.
- Owner/admin responsibility: support conversion or explicit exception.
- System responsibility: block tutoring access while preserving account clarity.
- Exit conditions: subscription confirmation or explicit owner/admin override.

### `subscription_pending`
- Purpose: represent intent/path to continue without assuming payment automation exists.
- Student-facing meaning: subscription is needed or being processed to continue.
- Allowed student actions: follow purchase/contact instructions.
- Blocked student actions: assume active tutoring setup exists.
- Owner/admin responsibility: guide or confirm subscription manually until billing exists.
- System responsibility: keep subscription separate from enrollment/program readiness.
- Exit conditions: subscribed access active, cancelled, or still pending.

### `subscribed_access_active`
- Purpose: represent commercial access after subscription confirmation.
- Student-facing meaning: continued access is active, but tutoring setup may still be prepared.
- Allowed student actions: see continuity path and setup status.
- Blocked student actions: start ongoing activities if enrollment/program is not ready.
- Owner/admin responsibility: preserve trial tutoring direction or redirect for pedagogical reasons.
- System responsibility: avoid implying Program/LearningCycle/StudyLoad exists automatically.
- Exit conditions: enrollment setup starts or active program begins if already ready.

### `enrollment_setup_pending`
- Purpose: bridge commercial access and real ongoing program work.
- Student-facing meaning: access is active; tutoring/program setup is being prepared.
- Allowed student actions: see setup status and continuity explanation.
- Blocked student actions: access unavailable ongoing activities.
- Owner/admin responsibility: create/approve valid enrollment/program/content handoff in later authorized block.
- System responsibility: keep pending setup honest.
- Exit conditions: enrolled active program begins.

### `enrolled_active_program`
- Purpose: represent the later valid tutoring/program state.
- Student-facing meaning: a real tutoring path is active and current work is valid.
- Allowed student actions: follow canonical learning flow.
- Blocked student actions: operate internal technical states or access admin.
- Owner/admin responsibility: supervise quality and continuity.
- System responsibility: support real activity only when valid enrollment/program exists.
- Exit conditions: future pause/close/reopen/subscription states outside this phase.

## 6. State transition table
| From state | Event/action | Actor | Guard/condition | To state | Notes |
| --- | --- | --- | --- | --- | --- |
| none | signup success | student/system | public signup creates User + Student | `signed_up_no_access` | Exists today after Block 1. |
| `signed_up_no_access` | review starts | owner/admin | owner/admin acknowledges new signup | `access_review_pending` | Can be manual initially. |
| `signed_up_no_access` | trial invitation | owner/admin | student is approved for trial | `trial_invited` | Invitation does not start timer. |
| `access_review_pending` | trial invitation | owner/admin | fit/direction accepted | `trial_invited` | Preferred manual route. |
| `trial_invited` | trial activation | owner/admin or future student action | explicit activation rule met | `trial_active` | Day 1 starts here. |
| `trial_active` | experience prepared | owner/admin/system | valid introductory experience exists | `trial_experience_available` | Must not create fake StudyLoad/content. |
| `trial_experience_available` | experience used | student/system or owner/admin | single experience completed/consumed | `trial_experience_used` | Represents use without granting a second experience. |
| `trial_active` | 7-day expiration | system | activated_at + 7 days reached | `trial_expired_blocked` | Applies even if unused unless owner/admin exception. |
| `trial_experience_available` | 7-day expiration | system | activated_at + 7 days reached | `trial_expired_blocked` | Experience no longer available. |
| `trial_experience_used` | 7-day expiration | system | activated_at + 7 days reached | `trial_expired_blocked` | Continued access blocked. |
| `trial_expired_blocked` | subscription purchase/confirmation | future payment provider or owner/admin | subscription confirmed | `subscribed_access_active` | Unlocks commercial access only. |
| `trial_experience_used` | subscription purchase/confirmation | future payment provider or owner/admin | subscription confirmed before expiry | `subscribed_access_active` | Preserves tutoring direction. |
| `subscribed_access_active` | enrollment setup starts | owner/admin | paid access active and program setup needed | `enrollment_setup_pending` | No automatic Program/StudyLoad. |
| `enrollment_setup_pending` | enrolled active program begins | owner/admin/system in later block | valid enrollment/program/content exists | `enrolled_active_program` | Later authorized enrollment/content work. |

## 7. Prohibited transitions
- `signup -> trial_active` automatically.
- `signup -> enrollment` automatically.
- `signup -> Program/LearningCycle/StudyLoad` automatically.
- `subscription -> StudyLoad` automatically.
- `subscription -> enrolled_active_program` automatically unless a later authorized enrollment flow explicitly guarantees valid setup.
- `trial_active -> multiple tutoring experiences` automatically.
- `trial_invited -> timer starts` automatically, unless Mauricio later chooses that commercial rule.
- `trial_expired_blocked -> active work` without subscription or explicit owner/admin override.
- `trial_experience_used -> new trial experience` without explicit owner/admin exception.
- Any state -> Block 7/content route automatically.

## 8. Actor permissions
Student:
- Can sign up, sign in, view safe status, accept/start trial only if future flow authorizes student-start activation, use the one available tutoring experience, and follow purchase/contact path.
- Cannot grant own trial, bypass expiration, create enrollment, create content, access admin, or see internal state labels.

Owner/admin:
- Can review new signup, invite trial, activate trial, select/confirm tutoring direction, prepare/approve the one experience, mark or validate experience used, confirm manual subscription, override or redirect with reason, and start enrollment/program setup in later authorized blocks.
- For MVP-Beta, most trial/access operations remain manual until implementation design is approved.

System:
- Can preserve safe no-access UI, enforce future state rules, track activation/expiration when schema exists, block expired access, and prevent automatic fake work.
- Cannot invent pedagogical content, create StudyLoads, or imply tutoring has started without valid access/content state.

Future payment/subscription provider:
- Can confirm commercial subscription status after Block 3.
- Cannot create enrollment, Program, LearningCycle, StudyLoad, PAES path, or tutoring activity by itself.

## 9. Timing model
- Trial clock starts on explicit trial activation.
- Invitation does not start the clock.
- Duration is 7 days.
- Expiration is strict once active.
- If the one tutoring experience is used before day 7, no second experience appears.
- If day 7 arrives before use, access becomes blocked unless owner/admin grants an explicit exception.
- Subscription after expiration unlocks continued commercial access but not automatic work.
- Owner/admin exception should be auditable in a future implementation because it changes the normal trial boundary.

## 10. Permission model by state
| State | Can sign in | Can see `/now`/dashboard | Can see trial status | Can start tutoring experience | Can see activities | Can subscribe / see purchase path | Can access admin | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `signed_up_no_access` | yes | yes | no | no | no | optional future contact path | no | Current safe Block 1 baseline. |
| `access_review_pending` | yes | yes | pending/review only | no | no | optional future contact path | no | Must not imply trial started. |
| `trial_invited` | yes | yes | yes, invited | no until activation | no | optional | no | Invitation distinct from activation. |
| `trial_active` | yes | yes | yes, active/time remaining | only if experience available | no fake activities | yes/optional | no | Trial is not enrollment. |
| `trial_experience_available` | yes | yes | yes | yes, one experience | only the valid trial experience surface | yes/optional | no | No extra tutorias. |
| `trial_experience_used` | yes | yes | yes, used/review/next step | no second experience | no ongoing activities | yes | no | Summary/review can be visible if valid. |
| `trial_expired_blocked` | yes | yes | yes, expired | no | no | yes | no | Block tutoring, not account access. |
| `subscription_pending` | yes | yes | yes, pending subscription | no unless separately active | no | yes | no | External/manual payment may exist first. |
| `subscribed_access_active` | yes | yes | access active | no until setup/valid work | no until setup/valid work | yes/status | no | Commercial access only. |
| `enrollment_setup_pending` | yes | yes | access/setup pending | no ongoing work yet | no fake activities | status only | no | Honest post-payment setup state. |
| `enrolled_active_program` | yes | yes | active program status | yes if work exists | yes, real activities only | status only | no | Belongs to later enrollment/content blocks. |

## 11. Data model implications
Can be approximated manually today:
- `signed_up_no_access`.
- Owner review.
- Manual trial decision.
- Manual subscription/contact.

Requires future schema:
- Access status.
- Trial invited at.
- Trial activated at.
- Trial expires at.
- Trial experience used at.
- Subscription/access status.
- Admin actor/audit.
- Tutoring direction selected.
- Continuity target.

Should wait for later blocks:
- Billing provider records.
- Subscription lifecycle automation.
- Enrollment automation.
- Program/LearningCycle/StudyLoad creation.
- PAES path assignment.
- FK User/Student hardening if unrelated to access model.

`Student.status` should remain identity/profile status and should not be overloaded as access, trial, payment, or enrollment state.

## 12. Continuity model
- One tutoring direction should be selected or implied before the experience is presented.
- Subscription should continue from that direction by default.
- Owner/admin can redirect only for a pedagogical reason.
- Redirection must be explained as a pedagogical decision, not as a reset or broken handoff.
- If operational setup is still pending after subscription, the UI should explain continuity intent without pretending ongoing activities exist.
- No fake continuity should be created through placeholder activities, fake programs, fake StudyLoads, or fake progress.

## 13. Student UI implications
No access:
- Communicate that the account is ready and tutoring access is not active yet.

Owner review pending:
- Communicate that Bexauri is reviewing or preparing the next step.

Trial invited:
- Communicate that a 7-day trial is available, with one introductory tutoring experience, and clarify whether the student or owner/admin starts it.

Trial active:
- Communicate time remaining and the single-experience limit.

Experience used:
- Communicate that the trial experience was used and that review/recommendation/subscription is the next step.

Expired blocked:
- Communicate that the trial ended and continued tutoring requires subscription or owner/admin action.

Subscribed setup pending:
- Communicate that access is active and Bexauri is preparing continuation from the trial tutoring direction.

Enrolled active:
- Communicate real current work through the canonical student learning flow, not internal cycle mechanics.

These are behavior principles, not final copy.

## 14. Admin/owner operations implications
Owner/admin must eventually see/do:
- Identify new signup.
- Set review/pending.
- Invite trial.
- Activate trial.
- Select or confirm tutoring direction.
- Mark or observe tutoring experience used if manual.
- Observe expiration.
- Confirm subscription while payment is manual/external.
- Start enrollment/program setup in later authorized phase.
- Override or redirect with reason.

For MVP-Beta, a manual owner/admin operation is acceptable if the student-facing state remains honest and traceable.

## 15. Minimal MVP implementation candidate
Recommended next slice: implementation readiness audit before code or schema.

Rationale:
- The state model is now coherent, but implementation still needs a narrow audit against current app data, admin surfaces, `/now` behavior, and future schema options.
- The smallest likely implementation after that is not a full trial system. It should probably begin with explicit no-access/review-pending and owner/admin manual trial decision readiness.
- Schema-first design may be necessary, but it should be scoped after auditing how current User, Student, StudentProgramInstance, and admin operations can safely support the boundary without overloading existing fields.

Not recommended yet:
- Direct trial activation implementation.
- Billing/subscription implementation.
- Enrollment/program automation.
- Any StudyLoad/content route work.

## 16. Risks and open decisions
- Owner/admin bottleneck: manual review and activation can slow conversion.
- Lack of schema: trial/access cannot be reliably tracked in-app yet.
- Billing not integrated: subscription confirmation remains external/manual until Block 3.
- One tutoring experience operational definition still needs detailed implementation design.
- Subscription vs enrollment confusion must be prevented in UI and data model.
- Manual expiration risk: without schema/job support, day-7 blocking may depend on operator discipline.
- Continuity risk: if tutoring direction is not captured, post-subscription handoff can feel like a reset.

## 17. Recommended next phase
`MVP-SALES-TRIAL-2D - Trial/access implementation readiness audit`

Scope: documentation/readiness only. Audit current app data model, `/now` UI, admin surfaces, and safe implementation seams for the conceptual state model. Decide whether the first implementation should be no-access/review-pending UI, admin manual trial operation design, or minimal access schema design. No app code, schema, package, deploy, DB mutation, SQL, Prisma CLI, secrets, enrollment, billing/payment/subscription, Program, LearningCycle, StudyLoad, PAES path assignment, or Block 7 work.

## 18. Final verdict
READY_FOR_TRIAL_ACCESS_IMPLEMENTATION_READINESS_AUDIT
