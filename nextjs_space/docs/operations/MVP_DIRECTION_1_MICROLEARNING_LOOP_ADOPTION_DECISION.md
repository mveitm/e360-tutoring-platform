# MVP-DIRECTION-1 — Integrated Microlearning Loop Adoption Decision

## 1. Phase type

Documentation / direction only.

No app code, no schema, no database mutation, no production operation, no Abacus, no deploy, no endpoint changes, no UI changes, no secrets, no long scripts.

## 2. Starting point

Repository state at phase start:

- HEAD = origin/main = 14761a5
- Commit: MVP-LOCAL-3: clarify student now page
- Working tree clean
- Branch main up to date with origin/main

This phase pauses MVP-LOCAL-4 until the integrated microlearning proposal is accepted, rejected, or scoped.

## 3. Inputs reviewed

This decision consolidates the following owner / strategy / specification inputs:

- `MVeit-Bexauri-Definicion de Producto.docx`
- `Bexauri_Propuesta_Consolidada_v1.pdf`
- `Bexauri_Especificaciones_Director_Proyecto.pdf`
- `Bexauri_Guia_Identidad_Visual_v1_1.docx`
- Owner draft on the microlearning / invisible diagnostic / dynamic roadmap model
- Gemini analysis of the new agile learning architecture

## 4. Executive decision

The integrated microlearning proposal is accepted into the central product vision of Bexauri.

The proposal does not replace Bexauri's core learning-regulation chain. It refines the way that chain is experienced by the student and operated by the supervisor.

Previous core chain:

diagnostic / initial state
→ learning cycle
→ StudyLoad
→ student execution
→ evidence
→ human/admin review
→ pedagogical decision
→ continuity

Refined product chain:

invisible / progressive diagnosis
→ active tutoring roadmap
→ micro StudyLoad
→ student execution
→ immediate evidence capture
→ lightweight feedback
→ roadmap adjustment
→ optional human supervision
→ continuity

## 5. Product rationale

The previous MVP direction was structurally correct but risked creating too much friction:

- a strong initial diagnostic could feel heavy;
- 20–30 minute loads could be too large for early retention;
- waiting for human review after every relevant action could interrupt learning;
- the supervisor could become a bottleneck;
- each load could generate too much analysis burden for MVP operation.

The microlearning loop solves this by making the learning experience smaller, faster, and more continuous.

The student should feel that Bexauri is always ready with a next useful step.

## 6. Adopted principle

Bexauri should move toward a continuous tutoring model based on small, high-signal learning interactions.

Core adopted principle:

A tutoring experience should not stop just because a human has not yet reviewed the previous activity.

Human supervision remains important, but it should increasingly operate as quality control, strategic coaching, exception handling, and pedagogical oversight — not as a mandatory blocker after every micro-interaction.

## 7. Adopted learning unit

The preferred learning unit for the future product is:

Micro StudyLoad = 4 exercises.

Purpose:

- reduce student friction;
- lower abandonment risk;
- generate frequent evidence;
- allow quicker feedback;
- make progress visible;
- make adaptation easier over time;
- reduce operational review burden.

This does not require immediately changing every existing StudyLoad. The adoption is directional first.

## 8. Invisible / progressive diagnostic

The integrated proposal reframes diagnostic work.

Previous pattern:

- explicit diagnostic first;
- diagnostic may be long;
- first load depends on post-diagnostic review.

Accepted direction:

- diagnostic should become progressively invisible where possible;
- every answer contributes to the system's understanding of the student's current level;
- the system should gradually infer skill state through normal work;
- explicit diagnostic may still exist, but should not be the only entry path into learning.

MVP implication:

For MVP-Beta, do not attempt a full invisible diagnostic engine yet.

Instead, begin by making current StudyLoads more diagnostic-like in evidence value and by avoiding heavy student-facing diagnostic friction where possible.

## 9. Dynamic roadmap

The integrated proposal introduces the roadmap as the central internal object of continuity.

Concept:

The roadmap is the ordered path of what the student should do next.

It is informed by:

- tutoring program;
- target skills;
- standardized test template, such as PAES M1;
- current estimated level;
- prior responses;
- errors;
- fluency;
- human supervisor observations;
- future automated or agentic analysis.

Accepted direction:

Bexauri should evolve toward a student-specific roadmap that always knows the next best small unit of work.

MVP-Beta implication:

Do not build the full dynamic roadmap engine yet.

Start by documenting and representing a simple PAES_M1 roadmap manually or semi-manually. This can later become dynamic.

## 10. Feedback model

The integrated proposal accepts layered feedback as central to Bexauri's learning quality.

Target model:

1. hint;
2. concept reminder;
3. chunked breakdown;
4. summarized solution;
5. expanded solution.

MVP-Beta implication:

Do not implement the full feedback engine yet.

Start with basic post-MC feedback:

- answered count;
- correct count;
- selected answer;
- correct answer when appropriate;
- simple explanation where content exists;
- no PAES score claims;
- no automatic adaptive decision.

## 11. Challenges

The integrated proposal accepts eventual "desafíos" as motivational and diagnostic tension points.

Concept:

A challenge is a short, higher-intensity task, possibly one exercise, that tests consolidation under mild pressure.

Accepted direction:

Challenges are a valuable product pattern.

MVP-Beta implication:

Do not implement challenges yet unless they can be represented as normal StudyLoads or content labels without new logic.

Move challenges to MVP-Alfa unless a later phase proves they can be implemented with minimal existing primitives.
## 12. Ensayos and external calibration

The integrated proposal preserves the importance of larger assessments / ensayos.

Purpose:

- give the student a stronger PAES-like checkpoint;
- recalibrate internal estimates;
- provide motivation and realism;
- connect microlearning to exam readiness.

MVP-Beta implication:

Ensayos may remain manual, external, or deferred.

Do not block the microlearning MVP on full ensayo automation.

## 13. Human supervisor role

The human supervisor role is reframed.

Previous risk:

The human supervisor becomes the gatekeeper of every next action.

Accepted direction:

The supervisor becomes a strategic coach and quality-control layer.

Supervisor responsibilities:

- monitor responses;
- monitor roadmap pertinence;
- answer asynchronous student questions;
- review program description and skill set;
- review student engagement and satisfaction;
- adjust roadmap or next work when needed;
- provide study suggestions;
- support PAES and university application process.

MVP-Beta implication:

Keep the human in the loop for meaningful decisions, but avoid designing the student experience so that learning always stops while waiting for a human.

## 14. Effect on MVP-Beta

Accepted now for MVP-Beta direction:

- smaller student-facing learning units as preferred future pattern;
- reduce dependency on long initial diagnostic;
- make /now feel like an always-available learning surface;
- prioritize feedback and next-step clarity;
- preserve human supervision but remove unnecessary blocking language where possible;
- represent roadmap manually before automating it.

Not accepted yet for MVP-Beta implementation:

- full adaptive theta model;
- automatic skill mastery engine;
- automatic dynamic roadmap generation;
- timed challenge system;
- AI tutor;
- fully automated next-load generation;
- PAES score estimation from micro exercises;
- push notifications;
- native mobile app.

## 15. Effect on current roadmap

MVP-LOCAL-4 should be re-scoped before implementation.

Original MVP-LOCAL-4:

Review pending state.

Updated interpretation:

The student should understand that completed work is registered and may be reviewed, but the product should not over-emphasize waiting as the core learning state.

The next UX direction should balance:

- evidence registered;
- review may happen;
- next step is coming;
- learning should continue where possible.

This means MVP-LOCAL-4 should avoid making "waiting for review" feel like the main product experience.

## 16. Recommended immediate roadmap after this decision

Recommended next sequence:

### MVP-DIRECTION-2 — MVP-Beta microlearning scope cut

Decide exactly what part of the microlearning proposal enters MVP-Beta now.

Expected outputs:

- accepted now;
- manual workaround;
- MVP-Alfa;
- Post-MVP;
- not recommended yet.

### MVP-LOCAL-4R — Review / continuity state copy re-scope

Replace original MVP-LOCAL-4 with a re-scoped version that reflects the new direction:

- completed activity registered;
- review may happen;
- next step will be prepared;
- do not make the product feel blocked;
- avoid claiming instant adaptation unless implemented.

### MVP-LOCAL-5R — Basic post-MC feedback

Prioritize basic feedback before complex review states.

Allowed:

- answered count;
- correct count;
- simple feedback;
- no PAES score;
- no automatic adaptation claims.

### MVP-CONTENT-1 — PAES_M1 four-week micro-roadmap

Define a manual four-week PAES_M1 roadmap that can later feed micro StudyLoads.

## 17. Architecture guardrail

The integrated proposal is accepted as product direction, but implementation must remain incremental.

Do not jump directly to:

- new schema;
- new roadmap engine;
- new adaptive algorithm;
- theta estimation;
- agentic feedback;
- automatic next-load generation.

The current system already has useful primitives:

- Program;
- Skill;
- SkillState;
- LearningCycle;
- StudyLoad;
- Response;
- CycleDecision;
- CycleEvaluation;
- ContinuitySignal;
- content registry.

Future implementation should reuse these primitives as much as possible before introducing new entities.

## 18. Final verdict

Accepted into Bexauri vision:

YES.

Accepted into MVP-Beta as full implementation:

NO.

Accepted into MVP-Beta as directional simplification:

YES.

Immediate strategic effect:

Bexauri should evolve from a heavy diagnostic / review-gated tutoring flow toward a continuous microlearning tutoring loop.

The human supervisor remains central, but increasingly as coach, reviewer, and quality safeguard rather than a mandatory blocker after every learning action.

Recommended next phase:

MVP-DIRECTION-2 — MVP-Beta microlearning scope cut.
