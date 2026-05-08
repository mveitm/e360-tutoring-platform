# MVP-DIRECTION-3 - Microlearning as SRA Operating Principle

## 1. Phase type

Documentation / direction only.

No app code, no schema, no database mutation, no production operation, no Abacus, no deploy, no endpoint changes, no UI changes, no secrets, no long scripts.

## 2. Starting point

Repository state at phase start:

- HEAD = origin/main = 5130805
- Commit: MVP-DIRECTION-2: cut MVP-Beta microlearning scope
- Working tree clean
- Branch main up to date with origin/main

## 3. Purpose

MVP-DIRECTION-3 records microlearning as an operating principle of the Bexauri SRA.

This phase does not add a feature.

It clarifies the product philosophy and technical guardrails that should guide upcoming MVP-Beta development.

## 4. Executive decision

Microlearning is accepted as the operating pulse of the Bexauri SRA.

In Bexauri, microlearning does not mean simply making exercises shorter.

Microlearning means using small, frequent, meaningful learning interactions as evidence for regulation, feedback, continuity, and human-supervised improvement.

## 5. SRA interpretation

The Bexauri SRA should operate through this loop:

microactivity
-> student response
-> evidence capture
-> basic feedback
-> continuity signal
-> supervised adjustment
-> next learning action

This preserves the core regulation chain while reducing friction.

The SRA should not depend only on large diagnostic or evaluation events.

It should learn progressively from the student's real work.

## 6. Pedagogical rationale

Microlearning is aligned with the learning reality of many PAES students because it:

- reduces psychological friction;
- makes it easier to start;
- lowers abandonment risk;
- creates frequent evidence;
- allows feedback closer to the moment of error;
- supports progressive confidence;
- makes continuity easier to sustain.

However, microlearning is not treated as proof of mastery by itself.

A small activity provides evidence, not a final verdict.

## 7. Ethical principle

The diagnostic may become less visible as a student-facing burden, but it must not become invisible as a data practice.

Bexauri may reduce diagnostic friction.

Bexauri must remain honest that student responses help guide the learning path.

The system must avoid premature or exaggerated claims such as:

- exact level certainty;
- automatic mastery;
- PAES score prediction from micro work;
- fully automated adaptation;
- AI replacement of human supervision.

## 8. Technical principle

Microlearning should simplify the MVP, not force a premature platform rewrite.

The current system primitives remain valid:

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

Implementation should use these primitives before introducing new roadmap schema, adaptive engines, theta models, or agentic systems.

## 9. Human supervisor principle

The human supervisor remains central to Bexauri.

The supervisor should not be a mandatory blocker after every microinteraction.

The supervisor should act as:

- coach;
- evidence reviewer;
- quality safeguard;
- exception handler;
- roadmap adjuster;
- student support layer.

This protects learning quality while keeping the student experience continuous.

## 10. MVP-Beta implication

For MVP-Beta, microlearning is accepted as direction and operating principle.

Accepted now:

- smaller learning units as preferred future pattern;
- evidence-first loop;
- basic feedback;
- manual roadmap;
- non-blocking review language;
- human-supervised continuity;
- `/now` as the main student learning surface.

Not accepted now:

- full adaptive theta;
- automatic mastery decisions;
- automatic next-load generation;
- AI tutor;
- PAES score prediction from micro work;
- unsupervised AI explanations;
- schema-first roadmap rebuild.

## 11. Design implication for upcoming phases

Upcoming UI/copy phases should avoid making the student feel blocked after completion.

Preferred language:

- activity registered;
- evidence saved;
- next step being prepared;
- tutor may review;
- continue when next work is available.

Avoid language that makes review feel like a wall:

- waiting for approval;
- blocked until expert review;
- no progress until tutor responds.

## 12. Final principle

Bexauri MVP-Beta should use microlearning as the operating motor of the SRA:

small, high-value learning actions
-> evidence
-> feedback
-> continuity
-> human-supervised improvement

This principle increases pedagogical health, technical sustainability, and ethical clarity when implemented incrementally and without premature automation.

## 13. Recommended next phase

MVP-LOCAL-4R - Review / continuity state copy re-scope.
