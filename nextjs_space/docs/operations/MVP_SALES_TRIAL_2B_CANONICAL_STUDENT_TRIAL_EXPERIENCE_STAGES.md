# MVP-SALES-TRIAL-2B - Canonical Student Trial Experience Stages

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2A closed at `c653405`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: documentation/design/readiness only for the canonical student-facing trial stages.
- Explicit non-goals: no implementation, app code changes, schema changes, package changes, deploy, staging/prod, SQL, Prisma CLI, DB mutation, dev server, secret inspection, account creation, enrollment creation, trial creation, billing/payment/subscription, Program, LearningCycle, StudyLoad, Student edit, password reset, auth/signup/login/admin guard change, Block 7, FK User/Student, seed, commit, push, or generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: both `c653405f0941765cd2c1519827602c2a10377d15`.
- Baseline verdict: baseline matched expected `c653405`; working tree was clean at phase start. Git preflight is the live truth.

## 3. Inputs reviewed
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2A_TRIAL_AND_ACCESS_CONTROL_BOUNDARY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1M_BLOCK_1_CLOSEOUT_AND_NEXT_BLOCK_READINESS.md`.
- `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`.
- `nextjs_space/docs/operations/MVP_STUDENT_REQ_1_STUDENT_EXPERIENCE_TRIAGE.md`.
- `nextjs_space/docs/operations/MVP_UI_FLOW_2_HIDE_CYCLE_LABEL_AND_REFRESH_NOW_COPY.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `PHASE_LOG.md -Tail 620`.

Stale baseline issues:
- `MVP_SALES_READY_ROADMAP.md` still names AUTH-1A as the current next recommended phase from an older roadmap state.
- Historical docs retain their phase baselines.
- Git preflight and the accepted PHASE_LOG chain win. The live TRIAL-2B baseline is `c653405`.

## 4. Starting point from TRIAL-2A
- Block 1 is closed for MVP beta with minor non-blocking follow-ups.
- Trial target: 7 days.
- Trial scope: one tutoring experience.
- After day 7, access is blocked.
- Subscription unlocks continued access.
- No implementation should happen before student experience stages are agreed.
- Trial must not automatically create enrollment, Program, LearningCycle, StudyLoad, PAES path assignment, or Block 7 content.

## 5. Canonical design principles
- Honest state: the student should always understand whether they are waiting, invited, in trial, blocked, subscribed, or actively enrolled.
- No fake activity: never show placeholder StudyLoads, fake lessons, fake tutoring cards, or fake progress.
- No hidden technical language: avoid User, Student, enrollment, Program, LearningCycle, StudyLoad, schema, DB, or internal status labels.
- No unsupported promise: do not imply tutoring has started if no tutoring experience is available.
- No confusion between signup, trial, subscription, enrollment, and tutoring.
- Human/admin action can be pending, but the student should see enough to understand that Bexauri is reviewing or preparing access.
- Product experience drives technical state design, not the reverse.

## 6. Stage map overview
### 1. `signed_up_no_access`
- Student sees: account ready, no active tutoring yet, access/review pending.
- Student can do: sign in, view safe `/now` or dashboard state, wait or follow contact instructions.
- Student cannot do: start tutoring, see activities, enroll, pay inside app, access admin.
- Admin/owner role: review new signup.
- Transition in: signup succeeds.
- Transition out: admin/owner begins review or invites trial.
- Risks: feels like a dead end if copy is weak.

### 2. `access_review_or_owner_pending`
- Student sees: Bexauri is reviewing or preparing access.
- Student can do: remain signed in, see that next action is pending, possibly contact support.
- Student cannot do: assume trial has started or work on activities.
- Admin/owner role: decide whether to invite trial, request information, or reject/defer.
- Transition in: admin/owner acknowledges or starts review.
- Transition out: trial invitation, rejection/defer, or manual contact.
- Risks: manual bottleneck.

### 3. `trial_invited_or_ready`
- Student sees: a 7-day trial is available or ready to start, with one tutoring experience.
- Student can do: accept/start trial if the final flow allows it, or wait for admin activation.
- Student cannot do: access multiple tutorias or see activities before trial starts.
- Admin/owner role: invite or approve the trial.
- Transition in: owner/admin grants invitation.
- Transition out: trial starts or invitation expires/cancels.
- Risks: if the start rule is unclear, day-count and expectations become confusing.

### 4. `trial_active_day_1_to_7`
- Student sees: trial active, time remaining, one tutoring experience available or being prepared.
- Student can do: access the one trial tutoring experience once it is ready.
- Student cannot do: access multiple tutorias, paid-only continuity, full dashboard expansion, or inactive content routes.
- Admin/owner role: ensure the one experience is valid and not fake.
- Transition in: explicit trial activation.
- Transition out: one experience used, day 7 expires, or subscription purchase.
- Risks: trial active can be mistaken for full program enrollment.

### 5. `one_tutoring_experience_available`
- Student sees: one clear tutoring experience is available, with what it covers and what happens after.
- Student can do: enter the experience.
- Student cannot do: start unrelated areas, generate extra activities, or keep working indefinitely.
- Admin/owner role: prepare or approve the experience.
- Transition in: trial active plus experience prepared.
- Transition out: student uses it, trial expires, or admin withdraws access.
- Risks: content/enrollment boundary can be crossed accidentally if this becomes a normal program path.

### 6. `one_tutoring_experience_used`
- Student sees: the trial experience was completed/used; next step is review, subscription, or wait.
- Student can do: review any allowed result/summary and see next-step guidance.
- Student cannot do: start another tutoring experience unless subscription/access changes.
- Admin/owner role: review evidence or contact student.
- Transition in: the single experience is completed or consumed.
- Transition out: trial expires, subscription is purchased, or owner/admin grants next access.
- Risks: if feedback is unavailable, the experience can feel incomplete.

### 7. `trial_expired_blocked`
- Student sees: trial ended after 7 days; continued access requires subscription.
- Student can do: sign in, view account/trial status, access purchase/contact path.
- Student cannot do: start or continue tutoring work.
- Admin/owner role: support conversion or handle exception manually.
- Transition in: day 7 expiry.
- Transition out: subscription purchase or owner/admin override.
- Risks: hard block can feel punitive if not explained calmly.

### 8. `subscription_pending_or_purchase_prompt`
- Student sees: subscription is needed to continue; purchase path may be external/manual until payment is implemented.
- Student can do: follow subscription instructions or contact owner/admin.
- Student cannot do: assume purchase instantly configured tutoring unless explicitly stated.
- Admin/owner role: confirm payment or guide purchase.
- Transition in: trial used/expired or student chooses to continue.
- Transition out: subscribed access active or pending payment remains.
- Risks: payment promise can outrun enrollment readiness.

### 9. `subscribed_access_active`
- Student sees: subscription/access is active; tutoring setup may still be pending.
- Student can do: see honest next step toward active program.
- Student cannot do: assume a Program/LearningCycle/StudyLoad exists until configured.
- Admin/owner role: configure or approve enrollment/program handoff.
- Transition in: subscription/access confirmed.
- Transition out: enrollment/program setup pending or active program.
- Risks: subscription can be confused with pedagogical readiness.

### 10. `enrollment_or_program_setup_pending`
- Student sees: paid/subscribed access exists, but tutoring setup is being prepared.
- Student can do: wait, see expected next step, possibly contact support.
- Student cannot do: start activities until program is active.
- Admin/owner role: choose tutoring area, create/approve enrollment, prepare valid content path.
- Transition in: paid access before program setup.
- Transition out: enrolled active program.
- Risks: post-payment delay must be handled honestly.

### 11. `enrolled_active_program`
- Student sees: a real tutoring/program is active and the next activity is available or being prepared.
- Student can do: follow the canonical learning flow: study, respond, self-report, receive feedback/review, and continue.
- Student cannot do: operate internal cycle/status mechanics.
- Admin/owner role: supervise quality and continuity without becoming a normal bottleneck.
- Transition in: enrollment/program is active and valid.
- Transition out: later pause/close/reopen states or subscription/access change.
- Risks: belongs mainly to later enrollment/content blocks, not Block 2 implementation.

## 7. Detailed stage definitions
Post-signup no-access state: the current Block 1 state remains the default. The student has an account and can log in, but sees no active tutoring. This must feel pending, not broken.

Owner/admin pending state: if the owner has not acted, the UI should say access is being reviewed or prepared. It should not imply a trial has started.

Trial invitation/readiness: invitation means the student is eligible to start a 7-day trial with one tutoring experience. It should show the basic promise and limits before activation.

Active 7-day trial: trial active means the access clock is running. It does not automatically mean a full program is enrolled or that multiple activities exist.

Meaning of one tutoring experience: the student gets one coherent introductory guided experience, not an open-ended program, not multiple tutorias, and not an unlimited content route.

Used tutoring state: after the single experience is used, the student should see what happened, what is being reviewed if applicable, and what continued access requires.

Expired blocked state: after day 7, the student can still sign in and understand the account/trial status, but cannot continue tutoring work without subscription.

Subscription prompt/purchase path: the app can explain that subscription unlocks continued access, but payment implementation remains later. If purchase is external/manual, the UI must say that honestly.

Post-purchase state: paid/subscribed access means commercial access is active; it does not necessarily mean enrollment/program is ready. If setup is pending, that must be visible.

Handoff to enrollment/program: active program begins only when the enrollment/program path is valid. That handoff belongs to later enrollment/program phases.

## 8. Definition of "one tutoring experience"
### Option A: one human tutoring session
- Student clarity: very clear if scheduled and described as a human session.
- Operational burden: high; depends on human availability.
- Pedagogical integrity: strong if the session is real.
- Technical implications: can stay mostly manual at first.
- Risk of opening Block 7/content: low, unless session claims in-app content that is not ready.
- Recommendation: useful as an operational fallback, but not the canonical MVP interpretation because it does not validate Bexauri's in-app learning loop.

### Option B: one in-app guided activity
- Student clarity: clear if the activity is presented as the trial experience.
- Operational burden: moderate; requires valid in-app content.
- Pedagogical integrity: strong only if the activity includes instructions, response, self-report, and feedback/review.
- Technical implications: risks touching StudyLoad/content/enrollment concepts.
- Risk of opening Block 7/content: high if new content or fake StudyLoads are created prematurely.
- Recommendation: desirable later, but unsafe as the immediate Block 2 interpretation unless a valid existing content/enrollment boundary is separately authorized.

### Option C: one diagnostic/intake plus review
- Student clarity: clear if framed as an introductory review rather than full tutoring.
- Operational burden: manageable; can be owner/admin reviewed.
- Pedagogical integrity: good if it captures enough evidence and gives an honest next step.
- Technical implications: can be designed before implementation and may avoid full content route activation.
- Risk of opening Block 7/content: lower than full in-app activity if it stays intake/review oriented.
- Recommendation: strong candidate for MVP-Beta.

### Option D: one combined introductory tutoring experience
- Student clarity: strongest if it says: one guided diagnostic/intake plus first learning touchpoint and review.
- Operational burden: moderate; owner/admin can prepare or supervise.
- Pedagogical integrity: strong because it combines orientation, evidence, review, and next-step recommendation.
- Technical implications: can be staged manually first; later can map to explicit access/enrollment/content states.
- Risk of opening Block 7/content: controlled if no new content or StudyLoad is created until separately authorized.
- Recommendation: recommended MVP-Beta interpretation.

Recommended interpretation: one tutoring experience = one combined introductory tutoring experience consisting of orientation to one tutoring area, a small diagnostic/intake or guided learning touchpoint, evidence/self-report, and owner/admin review or next-step recommendation. It should not automatically create a full enrollment, full content route, or ongoing activities.

It is not a pseudo-tutoring experience. It is a real introductory tutoring experience that can become the starting point for continued tutoring after subscription, while still remaining limited and non-automatic during trial.

## 9. Trial continuity principle
The trial must not be a pseudo-tutoring demo or a disconnected sales sample.

For MVP-Beta, the trial tutoring experience should be real, limited, honest, and pedagogically continuous:

- it introduces the student to one tutoring direction;
- it should generate a meaningful first signal: orientation, diagnostic/intake, guided touchpoint, self-report, review, or recommendation;
- it should not pretend to be a full ongoing program;
- it should not create fake activities or fake continuity;
- if the student purchases a subscription, Bexauri should preserve continuity with the same tutoring direction whenever pedagogically appropriate;
- if a redirection is needed, it must be explained as a pedagogical decision, not as a reset or broken handoff.

Subscription unlocks continued commercial access, but Program/enrollment setup may still be required before ongoing activities appear. The student must understand that the tutoring line continues, even if the operational setup is still pending.

## 10. Trial timing rules
- Day 1 should start on explicit trial activation, not at signup and not at mere invitation.
- If the student is invited but does nothing, the system should distinguish invitation from active trial; the 7-day clock should not start until activation unless Mauricio chooses a stricter commercial rule later.
- If activation requires admin action, the student should see pending/preparing state until activation.
- Expiration should be strict at 7 days once active.
- As expiration approaches, the student should see calm, clear status: trial time remaining and continued access requires subscription.
- After expiration, the student moves to blocked state but can still sign in and see how to continue.

## 11. Subscription and block behavior
- Blocked means no continued tutoring work, no new trial experience, no extra activities, and no active program access.
- While blocked, account login, status explanation, and purchase/contact path remain accessible.
- Hidden/disabled: activity entry, additional tutoring areas, new StudyLoads, and ongoing program work.
- Purchase/subscription should unlock continued commercial access.
- Purchase should not automatically create Program, LearningCycle, StudyLoad, PAES path, or fake tutoring work.
- If purchase happens before enrollment/program setup, the student should see subscribed-but-setup-pending state.
- After subscription, the student should not feel they are starting from zero. The system should preserve the trial's tutoring direction as the default continuity path, unless owner/admin review recommends a different tutoring direction.

## 12. Enrollment/program handoff
- Subscription does not necessarily equal enrollment.
- Trial does not necessarily equal enrollment.
- Enrollment/program setup may require owner/admin action.
- No Program, LearningCycle, or StudyLoad is created in this design phase.
- Block 4 or later should handle self-serve enrollment up to 3 tutorias.
- The handoff should become: paid/access active -> enrollment/program setup -> enrolled active program -> canonical activity flow.

## 13. Student UI implications
No-access:
- Sample behavior: "Tu cuenta esta lista. Aun no tienes acceso activo a una tutoria."

Pending review:
- Sample behavior: "Estamos revisando o preparando tu acceso. Te avisaremos el siguiente paso."

Trial active:
- Sample behavior: "Tu prueba de 7 dias esta activa. Incluye una experiencia introductoria de tutoria."

Trial used:
- Sample behavior: "Ya usaste tu experiencia de prueba. Estamos preparando tu recomendacion o siguiente paso."

Expired blocked:
- Sample behavior: "Tu prueba termino. Para continuar, necesitas activar una suscripcion."

Subscribed but setup pending:
- Sample behavior: "Tu acceso esta activo. Estamos preparando tu tutoria."

Enrolled active program:
- Sample behavior: show the real current activity or orientation state, without exposing internal cycle mechanics.

These are behavior/copy principles, not final UI copy.

## 14. Admin/owner operations implications
Owner/admin must eventually see or decide:
- new signup pending;
- whether to contact/review the student;
- whether to invite/start trial;
- when the 7-day trial is activated;
- whether the one tutoring experience is prepared, used, or reviewed;
- whether access expired;
- whether subscription is active or pending;
- when to hand off to enrollment/program setup.

Manual operation is acceptable for MVP-Beta if the student-facing state remains honest.

## 15. Data/state implications
Candidate conceptual states:
- `signed_up_no_access`;
- `access_review_or_owner_pending`;
- `trial_invited_or_ready`;
- `trial_active`;
- `one_tutoring_experience_available`;
- `one_tutoring_experience_used`;
- `trial_expired_blocked`;
- `subscription_pending_or_purchase_prompt`;
- `subscribed_access_active`;
- `enrollment_or_program_setup_pending`;
- `enrolled_active_program`.

Can be approximated manually today:
- signed-up/no-access;
- owner pending;
- manual trial decision outside app;
- manual subscription/contact path.

Requires future schema:
- trial activation timestamp;
- trial expiration timestamp;
- trial used marker;
- access status;
- subscription/access link;
- audit of owner/admin access decisions.

Should wait for payment/enrollment blocks:
- billing provider records;
- subscription lifecycle automation;
- self-serve enrollment;
- Program/LearningCycle/StudyLoad creation;
- content route assignment.

## 16. What must never happen
- No fake StudyLoads.
- No fake program.
- No automatic enrollment from signup.
- No automatic content route.
- No Block 7.
- No subscription implying tutoring started.
- No trial implying activity exists unless explicitly designed and valid.
- No student-facing technical state names.
- No hidden admin dependency that leaves the student in an unexplained dead end.

## 17. MVP-Beta recommendation
Recommended MVP-Beta student trial journey:

1. Student signs up and lands in safe no-access/pending state.
2. Owner/admin reviews and decides whether to invite/start trial.
3. Student sees a clear 7-day trial invitation with one introductory tutoring experience.
4. Trial clock starts only on explicit activation.
5. The one tutoring experience is a combined introductory tutoring experience: orientation to one area, small diagnostic/intake or guided learning touchpoint, evidence/self-report, and owner/admin review or next-step recommendation.
6. The trial does not grant full enrollment, multiple tutorias, fake activities, or Block 7 content.
7. After the experience is used, student sees review/next-step status.
8. On day 7, continued tutoring access is blocked.
9. Subscription unlocks continued commercial access, but enrollment/program setup may still be pending.
10. Only after valid enrollment/program setup should the student see real ongoing activities.
11. If the student subscribes after trial, the preferred experience is continuity from the trial tutoring direction into the paid tutoring path. Subscription does not automatically create enrollment/program work, but it should unlock the operational handoff toward continuing the same tutoring line.

## 18. Recommended next phase
`MVP-SALES-TRIAL-2C - Define trial/access state model from canonical stages`

Scope: documentation/design/readiness only. Convert the canonical student stages into a technical state model, transition table, actor permissions, manual/admin operations, and future schema candidates. Do not implement yet.

## 19. Final verdict
READY_FOR_TRIAL_ACCESS_STATE_MODEL_FROM_CANONICAL_STAGES
