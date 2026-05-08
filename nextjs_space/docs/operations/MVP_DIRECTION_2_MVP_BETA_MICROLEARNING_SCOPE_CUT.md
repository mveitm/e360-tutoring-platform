# MVP-DIRECTION-2 - MVP-Beta Microlearning Scope Cut

## 1. Phase type

Documentation / direction only.

No app code, no schema, no database mutation, no production operation, no Abacus, no deploy, no endpoint changes, no UI changes, no secrets, no long scripts.

## 2. Starting point

Repository state at phase start:

- HEAD = origin/main = 6b8793a
- Commit: MVP-DIRECTION-1: adopt integrated microlearning loop
- Working tree clean
- Branch main up to date with origin/main

## 3. Purpose

MVP-DIRECTION-2 cuts the integrated microlearning proposal into an executable MVP-Beta scope.

This phase answers:

- what enters MVP-Beta now;
- what can remain manual or operational;
- what should move to MVP-Alfa;
- what belongs to Post-MVP;
- what is not recommended yet.

## 4. Relationship with MVP-DIRECTION-1

MVP-DIRECTION-1 accepted the integrated microlearning loop into the central Bexauri vision.

Accepted vision:

- progressive / invisible diagnostic direction;
- micro StudyLoad as preferred future learning unit;
- dynamic roadmap as future internal continuity object;
- layered feedback as learning-quality pattern;
- human supervisor as coach, reviewer, quality safeguard, and exception handler;
- reduction of unnecessary human-review blocking.

MVP-DIRECTION-2 does not implement that vision.

It defines the MVP-Beta cut.

## 5. Executive decision

MVP-Beta should adopt the microlearning direction, but only as a guided, manual, evidence-based product slice.

MVP-Beta should not attempt to become a fully adaptive tutoring engine yet.

MVP-Beta definition after this cut:

A student can enter Bexauri, see a clear current learning surface, complete small or reasonably bounded learning activities, submit evidence, receive basic honest feedback, understand the next step, and continue under human-supervised guidance.

The supervisor can review evidence, monitor engagement, and manually guide continuity without being a mandatory blocker after every student action.

## 6. MVP-Beta product promise

MVP-Beta may promise:

- guided PAES preparation;
- short and clear learning activities;
- evidence-based follow-up;
- human-supervised continuity;
- basic feedback;
- progressive learning path;
- manual expert oversight.

MVP-Beta must not yet promise:

- fully automatic adaptation;
- exact PAES score prediction from micro exercises;
- AI tutor;
- automatic roadmap generation;
- automatic mastery certification;
- native mobile app;
- instant expert review after every activity.

## 7. Accepted now for MVP-Beta

The following items are accepted into MVP-Beta scope now.

### 7.1 Student /now as main operating surface

The `/now` page remains the main student surface for MVP-Beta.

It should clearly show:

- current program;
- current cycle;
- current work;
- what the student should do now;
- what happens after completion;
- whether work is registered, in progress, or waiting for a next step.

Status:

Accepted now.

Implementation approach:

Small UI/copy improvements using existing data.

No schema changes required.

### 7.2 Microlearning direction

Micro StudyLoad = 4 exercises is accepted as the preferred future learning unit.

However, MVP-Beta does not require immediate conversion of all existing StudyLoads to exactly 4 exercises.

Status:

Accepted as direction now.

Implementation approach:

New PAES_M1 content should increasingly use smaller, high-signal activities.

Existing 8-item activities may remain while the system transitions.

### 7.3 Evidence-first learning loop

Every student interaction should produce useful evidence.

Accepted evidence types for MVP-Beta:

- selected MC answers;
- answered count;
- correct count;
- completed activity;
- self-report;
- admin/human observations;
- cycle decision when available.

Status:

Accepted now.

Implementation approach:

Use existing Response, TutoringSession, StudyLoad, LearningCycle, and admin evidence surfaces.

### 7.4 Basic post-MC feedback

MVP-Beta should provide basic honest feedback after MC work.

Allowed:

- answered count;
- correct count;
- selected answer;
- correct answer when appropriate;
- simple feedback message;
- simple explanation where content exists.

Not allowed:

- PAES score estimate;
- automatic mastery claim;
- automatic adaptive decision;
- theta claim;
- AI-generated feedback as source of truth.

Status:

Accepted now.

Implementation approach:

Use existing submitted responses and content registry where available.

### 7.5 Review / continuity state without blocking language

MVP-Beta should communicate that completed work is registered and may be reviewed.

However, it should avoid making "waiting for review" feel like the main product state.

Preferred copy direction:

- activity completed;
- evidence registered;
- next step will be prepared;
- tutor may review the evidence;
- the student should feel continuity, not stoppage.

Status:

Accepted now.

Implementation approach:

Re-scope original MVP-LOCAL-4 into MVP-LOCAL-4R.

### 7.6 Manual roadmap representation

A full dynamic roadmap engine is not required for MVP-Beta.

But MVP-Beta needs a simple roadmap representation.

Accepted version:

- manually defined PAES_M1 micro-roadmap;
- sequence of topics / skills / micro activities;
- clear enough for supervisor to choose next StudyLoad;
- simple enough to later become dynamic.

Status:

Accepted now as content/documentation.

Implementation approach:

Create a PAES_M1 four-week micro-roadmap document before building a roadmap engine.

### 7.7 Human supervisor as non-blocking oversight

The human supervisor remains central.

But MVP-Beta should not require the human to approve every next action before learning continues.

Supervisor role in MVP-Beta:

- review evidence;
- monitor engagement;
- select or adjust next work manually;
- answer student questions;
- provide study guidance;
- intervene when performance, satisfaction, or continuity deteriorates.

Status:

Accepted now.

Implementation approach:

Use existing admin surfaces and manual operations.

### 7.8 Manual next-load selection

MVP-Beta may continue using manual next-load selection.

Status:

Accepted now.

Implementation approach:

Supervisor/admin creates or curates the next StudyLoad using existing primitives.

No automatic next-load engine yet.

## 8. Manual / operational workarounds allowed in MVP-Beta

The following may remain manual during MVP-Beta.

| Area | Manual workaround |
|---|---|
| Student onboarding | Human sends link, account instructions, and plan explanation |
| Payment | Manual or external payment handling |
| Program selection | Human-guided enrollment if needed |
| Roadmap | Manual PAES_M1 roadmap document |
| Next StudyLoad | Human/admin chooses or creates next work |
| Review | Human reviews evidence asynchronously |
| Feedback quality | Basic app feedback + human clarification where needed |
| Questions | Asynchronous human response outside or inside app if available |
| Challenges | Represent later as normal StudyLoad or defer |
| Ensayos | External/manual or deferred |
| Parent communication | Manual message/report when needed |

This is acceptable because MVP-Beta is explicitly guided/manual where necessary.

## 9. Requires immediate MVP-Beta development

The following items should become near-term development phases.

### 9.1 MVP-LOCAL-4R - Review / continuity state copy re-scope

Purpose:

Clarify the completed-work state without making waiting for review the central experience.

Recommended direction:

Replace the original "review pending" framing with "activity registered / next step being prepared / tutor may review".

Constraints:

- one UI area if possible;
- no schema change;
- no endpoint change;
- no lifecycle change;
- no automatic adaptation claim.

### 9.2 MVP-LOCAL-5R - Basic post-MC feedback

Purpose:

Give the student basic feedback after completing or submitting MC work.

Allowed:

- answered count;
- correct count;
- simple feedback;
- correct answer where content supports it;
- no PAES score;
- no mastery claim;
- no automatic adaptation.

### 9.3 MVP-CONTENT-1 - PAES_M1 four-week micro-roadmap

Purpose:

Define the first manual roadmap for MVP-Beta.

Minimum structure:

- week;
- skill focus;
- micro StudyLoad objective;
- approximate difficulty;
- evidence expected;
- supervisor note.

This roadmap should guide future StudyLoad creation before automation exists.

### 9.4 MVP-CONTENT-2 - First micro StudyLoad content standard

Purpose:

Define the standard for new micro StudyLoads.

Recommended standard:

- 4 exercises;
- one focused skill target;
- clear difficulty band;
- correct option;
- short explanation;
- optional extended explanation later;
- evidence value stated.

This should guide new content without requiring immediate schema changes.

## 10. Move to MVP-Alfa

The following items are valuable, but should not block MVP-Beta.

| Item | Reason for deferral |
|---|---|
| Semi-dynamic roadmap UI | Requires stable manual roadmap first |
| Reusable micro StudyLoad generator | Needs content standard and evidence feedback first |
| Challenge system | Valuable, but not needed for first monetizable guided MVP |
| Timed challenge UX | Requires careful UX and student stress calibration |
| More complete progress dashboard | Valuable, but /now and feedback clarity come first |
| L1/M2 activation | PAES_M1 must stabilize first |
| Rich cycle history for student | Useful after basic loop works |
| Supervisor alert dashboard | Useful after enough evidence accumulates |
| Better diagnostic surfaces | Should evolve from micro evidence, not block MVP-Beta |
| Question bank metadata expansion | Needed later for adaptation, not immediate MVP-Beta |

## 11. Move to Post-MVP

The following items belong after MVP-Beta and probably after MVP-Alfa.

| Item | Reason |
|---|---|
| Full adaptive theta model | Requires deeper evidence model, calibration, and validation |
| Automatic skill mastery engine | High-stakes if wrong; needs data and governance |
| Automatic dynamic roadmap generation | Requires stable content metadata and learning model |
| AI tutor | Requires governance, auditability, quality controls, and safe boundaries |
| Agentic roadmap adjustment | Requires agent governance and human-in-the-loop controls |
| Fully automated next-load generation | Requires validated content model and adaptation logic |
| PAES score prediction from micro exercises | Risk of misleading students |
| Native mobile app | Web/mobile-responsive MVP can validate value first |
| Push notifications | Useful later; not needed for core loop validation |
| Payment automation | Can remain external/manual during early MVP-Beta |
| Large-scale analytics dashboard | Needs real usage data first |
| Predictive risk model | Needs data volume and validation |

## 12. Not recommended yet

Do not implement yet:

1. Automatic decisions from 4 exercises.
2. PAES score estimates from short activities.
3. Heavy diagnostic requirement before the student can start.
4. Full schema redesign around roadmap.
5. AI-generated explanations as unsupervised source of truth.
6. Tutor IA in main student flow.
7. Automatic promotion / reinforcement without human override.
8. Large dashboard before feedback and continuity are clear.
9. Native app before web MVP validates the learning loop.
10. Challenge timers before basic activity feedback is stable.

## 13. MVP-Beta operating loop after scope cut

The MVP-Beta learning loop should be:

1. Student opens `/now`.
2. Student sees current program, cycle, and current task.
3. Student starts or opens a small learning activity.
4. Student answers exercises.
5. System captures evidence.
6. Student receives basic honest feedback.
7. Student completes the activity and leaves self-report if needed.
8. System communicates that work is registered and next step will be prepared.
9. Human supervisor reviews evidence when needed.
10. Human/admin selects or curates next work.
11. Student continues.

This preserves the Bexauri regulation chain while reducing friction.

## 14. Revised near-term roadmap

The previous MVP-LOCAL-4 should not proceed as originally framed.

Recommended immediate sequence:

1. MVP-LOCAL-4R - Review / continuity state copy re-scope.
2. MVP-LOCAL-5R - Basic post-MC feedback.
3. MVP-CONTENT-1 - PAES_M1 four-week micro-roadmap.
4. MVP-CONTENT-2 - First micro StudyLoad content standard.
5. MVP-LOCAL-6R - Student-facing next-step summary, only if supported by existing data.

## 15. Product positioning for MVP-Beta

MVP-Beta should be described honestly.

Recommended positioning:

Bexauri helps students prepare for PAES through short guided activities, evidence-based feedback, and expert-supervised continuity.

Avoid saying:

- fully adaptive AI tutor;
- instant personalized roadmap;
- automatic PAES score prediction;
- complete replacement for a human tutor;
- guaranteed score improvement.

Allowed to say:

- guided learning path;
- short activities;
- feedback;
- expert supervision;
- progress evidence;
- PAES-focused preparation.

## 16. Architecture guardrails

Implementation should reuse current primitives before adding new ones.

Current useful primitives:

- Program;
- Skill;
- SkillState;
- StudentProgramInstance;
- LearningCycle;
- StudyLoad;
- TutoringSession;
- Response;
- CycleDecision;
- CycleEvaluation;
- ContinuitySignal;
- content registry.

Do not introduce a new roadmap schema until the manual roadmap has been validated operationally.

Do not introduce automatic adaptation until evidence quality, content metadata, and review workflows are stable.

## 17. Final MVP-Beta cut

Accepted now:

- microlearning as product direction;
- `/now` as main learning surface;
- small activities as preferred future content unit;
- evidence-first loop;
- basic feedback;
- manual roadmap;
- human-supervised continuity;
- non-blocking review language.

Manual for now:

- onboarding;
- payment;
- roadmap curation;
- next-load selection;
- expert review;
- student/parent communication;
- ensayo calibration.

MVP-Alfa:

- richer roadmap UI;
- challenge system;
- better dashboard;
- broader content coverage;
- semi-automated content generation;
- stronger supervisor tooling.

Post-MVP:

- adaptive theta;
- AI tutor;
- agentic roadmap;
- automatic next-load generation;
- predictive models;
- native app;
- push notifications;
- deep analytics.

Not recommended yet:

- automatic PAES score from micro work;
- automatic mastery decisions;
- schema-first roadmap rebuild;
- unsupervised AI explanations.

## 18. Final verdict

MVP-Beta should become a guided microlearning MVP, not a full adaptive platform.

The system should feel lighter and more continuous to the student, while remaining manually supervised and architecturally conservative.

Recommended next phase:

MVP-LOCAL-4R - Review / continuity state copy re-scope.
