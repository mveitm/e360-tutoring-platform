# MVP-DIRECTION-4 - Dynamic SRA Roadmap and Human Supervision

## 1. Phase type

Documentation / direction only.

No app code, no schema, no database mutation, no production operation, no Abacus, no deploy, no endpoint changes, no UI changes, no secrets, no long scripts.

## 2. Starting point

Repository state at phase start:

- HEAD = origin/main = 32d403d
- Commit: MVP-LOCAL-5R: add in-activity MC feedback and completion
- Working tree clean
- Branch main up to date with origin/main

## 3. Purpose

MVP-DIRECTION-4 records a core product and architecture principle:

The Bexauri roadmap is not a fixed calendar and not a rigid four-week micro-roadmap.

The roadmap is a dynamic pedagogical structure used by the SRA to guide learning according to evidence, student rhythm, human supervision, and continuous improvement.

This phase also records that Bexauri and the human supervisor together form the SRA.

## 4. Executive decision

Bexauri will not use a fixed time-boxed micro-roadmap as the main learning engine.

Bexauri will use:

- a master roadmap;
- active slices extracted from that roadmap;
- micro StudyLoads as immediate learning actions;
- evidence from microlearning, challenges, essays, self-report, and human review;
- human-supervised adjustment;
- continuous improvement.

## 5. Master roadmap

The master roadmap is the complete pedagogical map of a tutoring program.

It should include:

- target skills;
- subskills;
- prerequisites;
- exercise types;
- difficulty levels;
- progression relationships;
- reinforcement paths;
- validation points;
- PAES alignment;
- expected evidence;
- supervisor notes;
- future automation hooks.

The master roadmap answers:

What does the student need to learn to reach the tutoring objective?

It does not answer:

What exact activity must every student do in week 1, week 2, week 3, and week 4?

## 6. Active slice

An active slice is the next small operational segment extracted from the master roadmap.

The active slice answers:

What should this student work on now, given the available evidence?

The active slice may change when new evidence appears.

Evidence may come from:

- micro StudyLoads;
- selected answers;
- correct or incorrect patterns;
- response fluency;
- self-report;
- repeated mistakes;
- challenge results;
- essay results;
- human supervisor review;
- engagement signals;
- satisfaction signals.

## 7. Micro StudyLoad

A micro StudyLoad is the immediate student-facing learning unit.

It should be small enough to reduce friction and frequent enough to generate useful evidence.

Preferred future pattern:

- focused skill target;
- small number of exercises;
- clear evidence value;
- basic feedback;
- self-report;
- completion without unnecessary navigation friction.

Micro StudyLoads do not replace the roadmap.

They are actions extracted from the roadmap.

## 8. No fixed time-window principle

The roadmap should not be controlled by a fixed calendar.

Avoid treating the roadmap as:

- week 1 fixed content;
- week 2 fixed content;
- week 3 fixed content;
- week 4 fixed content;
- same sequence for every student;
- same pace for every student.

A calendar may be useful for communication, expectation-setting, or commercial packaging.

But it must not be the pedagogical engine.

## 9. Different rhythms by student

Two students should not be forced to move through the roadmap at the same speed.

If a student shows high initial level, fluency, and confidence, the SRA may allow faster progress.

Example:

simple initial tasks
-> strong performance
-> higher difficulty
-> challenge or validation
-> faster movement through the roadmap

If a student struggles, the SRA may slow down, reinforce, scaffold, or revisit prerequisites.

Example:

simple initial tasks
-> repeated errors or low confidence
-> reinforcement
-> scaffolding
-> additional micro StudyLoads
-> later return to the main path

Both students are being guided correctly.

The goal is not equal pace.

The goal is effective learning.

## 10. Pauses without punishment

Bexauri should not punish students for pausing.

If the student stops for a while, the system should preserve continuity and context.

When the student returns, Bexauri should resume from the best available state:

- prior evidence;
- last completed activity;
- last active slice;
- self-report;
- supervisor notes;
- current engagement state.

The system should not shame, pressure, or punish the student.

Bexauri should wait without losing the learning thread.

## 11. Subtle leadership principle

Bexauri should lead the learning process subtly.

This means:

- proposing the next step clearly;
- reducing uncertainty;
- adapting to the student's real rhythm;
- giving continuity without pressure;
- supporting autonomy;
- keeping the student oriented;
- avoiding rigid calendar enforcement.

Bexauri should not feel passive.

Bexauri should not feel coercive.

It should feel like a learning guide that knows where the student is, what the next useful action is, and when to wait.

## 12. Bexauri plus human supervisor as SRA

Bexauri and the human supervisor together form the Sistema Regulador del Aprendizaje.

The SRA is not only software.

The SRA is the combined system of:

- product structure;
- learning evidence;
- micro StudyLoads;
- feedback;
- roadmap logic;
- continuity signals;
- human supervision;
- quality safeguards;
- continuous improvement.

The human supervisor is not outside the SRA.

The supervisor is part of it.

## 13. Human supervisor role

The human supervisor should act as:

- coach;
- evidence reviewer;
- quality safeguard;
- exception handler;
- roadmap adjuster;
- student support layer;
- strategic learning guide.

The supervisor should not be a mandatory blocker after every microinteraction.

The supervisor should intervene where human judgment improves learning quality, emotional support, roadmap pertinence, or strategic direction.

## 14. Effective learning priority

Bexauri prioritizes effective learning over:

- artificial speed;
- excessive engagement;
- rigid completion metrics;
- premature automation;
- unsupervised AI decisions;
- superficial progress;
- misleading PAES score claims;
- pressure to keep moving without understanding.

A student progressing slower with better consolidation may be healthier than a student moving quickly without learning.

A student progressing quickly because evidence supports it should not be artificially slowed by a fixed calendar.

## 15. Continuous improvement commitment

The SRA must commit to continuous improvement.

This applies to:

- content quality;
- activity design;
- evidence interpretation;
- feedback quality;
- supervisor workflow;
- roadmap structure;
- student experience;
- ethical safeguards;
- future automation.

Every microinteraction can teach the system something, but the system must interpret evidence with humility.

Microlearning gives signals.

It does not automatically give truth.

## 16. MVP-Beta implication

For MVP-Beta, this principle means:

Accepted now:

- use `/now` as the main learning surface;
- reduce navigation friction;
- complete learning units inside the activity where possible;
- use basic honest feedback;
- avoid fixed time-boxed roadmap language;
- define PAES_M1 master roadmap before micro slices;
- keep roadmap adaptation manual or supervised at first;
- preserve human supervisor as part of the SRA.

Not accepted now:

- automatic dynamic roadmap engine;
- theta model;
- automatic mastery decisions;
- automatic next-load generation;
- PAES score prediction from micro work;
- AI tutor;
- agentic unsupervised roadmap adjustment;
- schema-first roadmap rebuild.

## 17. Roadmap architecture rule

The correct architecture is:

master roadmap
-> active slice
-> micro StudyLoad
-> evidence
-> supervised adjustment
-> next active slice

Not:

fixed four-week micro-roadmap
-> same sequence for all students
-> same pace for all students

## 18. Content roadmap implication

The next content phase should not be a four-week micro-roadmap.

The next content phase should be:

MVP-CONTENT-1 - PAES_M1 master roadmap skeleton

Purpose:

Define the master pedagogical structure from which future active slices and micro StudyLoads can be extracted.

A later phase may define:

MVP-CONTENT-2 - PAES_M1 first active slice

Purpose:

Extract the first operational slice for MVP-Beta from the master roadmap.

## 19. Product promise protection

This principle protects Bexauri's first promise:

Bexauri guides learning.

If Bexauri forces every student through the same fixed calendar, it risks failing that promise.

If Bexauri uses evidence, rhythm, supervision, and continuous adjustment, it can guide learning more honestly.

## 20. Final principle

Bexauri should guide learning through a dynamic SRA.

The SRA is formed by Bexauri and the human supervisor together.

The master roadmap provides the complete pedagogical structure.

The active slice provides the next useful learning segment.

The micro StudyLoad provides the immediate learning action.

Evidence and supervision adjust the path.

The student may accelerate, slow down, pause, resume, reinforce, or validate.

Bexauri leads subtly, adapts to the student, and preserves continuity without punishment.

## 21. Recommended next phase

MVP-CONTENT-1 - PAES_M1 master roadmap skeleton.