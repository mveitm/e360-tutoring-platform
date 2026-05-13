# MVP-SRA-ROADMAP-1 - PAES M1 Pedagogical Roadmap and Next-Load Decision Layer

## 1. Purpose

Define the pedagogical layer that sits above Bexauri's operational tutoring loop.

The operational layer can already move a student through StudyLoads, capture answers, collect self-report, complete activities, and show the next state in `/now`.

This document defines the missing layer: how Bexauri should decide what the next learning action should be, with PAES_M1 relevance, pedagogical progression, evidence awareness, anti-monotony, and future agent execution in mind.

This is documentation / direction only.

No code, schema, endpoint, content registry, deploy, production operation, SQL, Prisma CLI, `.env`, secrets, or data mutation are part of this phase.

## 2. Live baseline

Latest accepted repo state before this phase:

- HEAD = origin/main = `9b3bab1`
- Last commit = `MVP-FLOW-4-E5M: document M1 local path validation`
- Working tree expected = clean

Future agents must still run live Git preflight:

- `git status --short`
- `git log --oneline --decorate --graph -8`

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Core problem

A linear continuity map is not enough for Bexauri.

The question is not only:

- which StudyLoad comes after this StudyLoad?

The real question is:

- given this student's evidence, self-report, current roadmap position, prerequisite state, engagement risk, and PAES_M1 target, what is the most useful next learning action?

The answer may be:

- practice;
- reinforcement;
- bridge to a new level;
- representation change;
- prerequisite repair;
- validation;
- temporary axis switch;
- cycle checkpoint;
- mini-ensayo;
- guided error review;
- or human/expert review.

## 4. Layer separation

### Operational layer

The operational layer handles:

- StudyLoad status;
- answer submission;
- feedback rendering;
- self-report;
- completion;
- next visible item;
- `/now` refresh;
- admin evidence visibility;
- LearningCycle internal bookkeeping.

### Pedagogical layer

The pedagogical layer decides:

- the current roadmap node;
- what the student appears ready for;
- what evidence is strong, weak, mixed, or insufficient;
- whether to consolidate, advance, reinforce, redirect, validate, or pause;
- which next load type best serves the student's trajectory;
- how to preserve motivation and avoid monotony;
- when to introduce cycle milestones, checkpoints, or mini-ensayos;
- when human/expert review should intervene.

### Future tutor agent layer

The future agent per tutoring program should execute or assist this pedagogical layer.

It should not invent the roadmap freely. It should operate inside a governed PAES_M1 roadmap, using evidence and constraints defined by Bexauri.

## 5. Expert PAES_M1 requirement

The PAES_M1 roadmap must not be only an internal product guess.

Before it becomes production-grade, it must be grounded in:

1. official PAES_M1 sources and released/practice material;
2. expert pedagogical review for PAES M1 preparation;
3. Bexauri's own evidence from student work;
4. documented product guardrails.

The expert review should validate:

- roadmap completeness;
- order of prerequisite progression;
- appropriateness of difficulty bands;
- item representativeness;
- common error patterns;
- when reinforcement is helpful versus harmful;
- when to advance despite imperfect performance;
- when to switch axis or insert a checkpoint;
- what is pedagogically useful for PAES_M1 rather than merely logically plausible.

AI may help draft, classify, and propose decisions, but it is not the sole authority for PAES_M1 pedagogy.

## 6. Roadmap model

A complete PAES_M1 tutoring roadmap should include at least:

- axis;
- skill;
- subskill;
- roadmap node;
- prerequisite relationships;
- difficulty band;
- item types;
- common misconceptions;
- evidence signals;
- next action if strong;
- next action if weak;
- next action if mixed;
- allowed reinforcement pattern;
- allowed bridge or advancement pattern;
- checkpoint or cycle milestone relationship.

Initial conceptual chain:

`master roadmap -> active slice -> micro StudyLoad -> evidence -> decision -> next learning action`

The master roadmap is the full pedagogical structure.

The active slice is the current useful segment for a student.

The next learning action is not always a normal StudyLoad; it may later be a special checkpoint, mini-ensayo, guided review, or cycle closure action.

## 7. Student state model

Bexauri should track a student state that is richer than completed/not completed.

Minimum conceptual dimensions:

- current active slice;
- current roadmap node;
- recent accuracy;
- self-report;
- repeated errors;
- prerequisite risk;
- confidence / frustration signal;
- novelty tolerance;
- coverage history across axes;
- recent monotony risk;
- pending expert review flag;
- last cycle milestone status.

MVP-Beta may track some of this manually or implicitly. Future versions should make the state more explicit and machine-readable.

## 8. Evidence model

Evidence may include:

- selected MC answers;
- answered count;
- correct count;
- item-level correctness;
- self-report;
- completion status;
- error pattern;
- repeated mistake;
- axis / skill / subskill metadata;
- difficulty band;
- student engagement behavior;
- supervisor observation;
- future hint usage;
- future response time;
- future free-response quality;
- future mini-ensayo results.

No single micro activity should produce a definitive PAES score, theta estimate, or mastery claim in MVP-Beta.

## 9. Next-load decision types

The pedagogical layer should choose between these decision types:

### Practice

Use when the student needs more fluency at the current level but is not blocked.

### Reinforce

Use when evidence shows a specific weakness or repeated error.

### Bridge

Use when the student can do the current thing and should meet a controlled novelty.

Pattern example:

- 3 familiar/consolidation items;
- 1 item that introduces the next level or representation.

### Advance

Use when evidence and self-report support moving to the next roadmap node.

### Validate

Use when performance appears strong but Bexauri needs confirmation before acceleration.

### Hold

Use when evidence is mixed and another small signal is needed.

### Redirect

Use when the current work is not pedagogically useful because a deeper prerequisite or another axis is blocking progress.

### Spiral

Use when the student should return to another axis or skill to preserve coverage and avoid a narrow path.

### Cycle milestone

Use when the student has completed a meaningful local segment and should receive a checkpoint, guided review, mini-ensayo, or cycle closure action.

## 10. Anti-monotony principle

Bexauri must not trap the student in endless reinforcement of the same item type.

If a student struggles, the default answer should not be infinite repetition.

After one or two similar reinforcements, the system should change strategy. Options include:

- lower to a prerequisite;
- vary representation;
- use a bridge load;
- use a confidence-building load;
- switch temporarily to another axis;
- trigger expert review;
- create a guided error review;
- prepare a checkpoint or cycle milestone.

Pedagogical goal:

`I can do this -> I can also do this with something new -> I am progressing across the roadmap.`

## 11. Progression rhythm

A healthy tutoring path should not feel like a task queue.

It should have rhythm:

1. entry or re-entry signal;
2. practice;
3. consolidation;
4. bridge with novelty;
5. transfer or representation change;
6. reinforcement if needed;
7. variation if reinforcement repeats;
8. checkpoint / cycle milestone;
9. next active slice.

This rhythm should preserve student confidence while introducing gradual challenge.

## 12. Cycle milestones and special learning actions

Future cycle closures do not need to be normal StudyLoads.

They may become special pedagogical actions, such as:

- mini-ensayo;
- guided error review;
- integration activity;
- skill checkpoint;
- short challenge;
- reflective closure;
- progress summary;
- recommendation of next route;
- supervisor or agent feedback;
- roadmap recalibration.

These special actions can make the experience more motivating and prevent monotony.

MVP-Beta may represent them manually or as normal StudyLoads first, but the target model should allow non-StudyLoad cycle milestones later.

## 13. Coverage policy

A complete PAES_M1 tutoring path must not overfit only to the first algebra/functions chain.

The roadmap must progressively cover all or most relevant axes and skills.

Coverage should be intentional, not accidental.

The decision layer should consider:

- current prerequisite need;
- axis coverage history;
- skill coverage history;
- PAES_M1 relevance;
- student confidence;
- monotony risk;
- time horizon to exam;
- expert pedagogical priority.

## 14. Feedback in-load role

Feedback is not just a result display.

It is part of the pedagogical decision system.

Each item should eventually help identify:

- what the student understood;
- what error occurred;
- whether the error is procedural, conceptual, representational, or contextual;
- whether the next load should practice, bridge, reinforce, redirect, or validate.

MVP-Beta feedback can remain basic, but future item design should include feedback metadata.

## 15. MVP-Beta version

MVP-Beta should not implement a full adaptive engine yet.

The MVP-Beta version can be:

- roadmap documented manually;
- content tagged lightly in registry or docs;
- rule-based next-load selection for the first paths;
- human-supervised adjustment;
- no PAES score claims;
- no theta;
- no automatic mastery;
- no autonomous agent decisions without review.

Minimum decision rule format for MVP-Beta:

- current content key;
- evidence summary;
- self-report;
- decision type;
- next content key or special action;
- rationale;
- guardrail notes.

## 16. Future tutor agent

A future PAES_M1 tutor agent should:

- read the student's current state;
- read the roadmap;
- read recent evidence;
- classify the decision type;
- propose the next learning action;
- generate or select the next load;
- explain the rationale for supervisor audit;
- respect anti-monotony and coverage rules;
- avoid unsupported PAES score or mastery claims;
- escalate uncertain cases to human review.

The agent should be program-specific. A PAES_M1 agent should not freely generalize from L1 or M2 without a program-specific roadmap.

## 17. Required next work

Before implementing an intelligent next-load selector, Bexauri should complete:

1. PAES_M1 roadmap expert alignment.
2. Content metadata model for roadmap nodes and item purpose.
3. Decision taxonomy acceptance.
4. MVP-Beta rule format.
5. Anti-monotony limits.
6. Cycle milestone policy.
7. Expert review workflow.

## 18. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2 - PAES M1 expert roadmap source and validation plan`

Purpose:

- identify official and expert sources;
- define how the PAES_M1 master roadmap will be validated;
- decide what must be versioned before implementing smarter next-load selection;
- prevent Bexauri from building a plausible but pedagogically weak roadmap.

Alternative if staying closer to product architecture:

`MVP-SRA-ROADMAP-2 - Define MVP-Beta next-load decision record format`

Recommended order:

1. Expert/source validation plan.
2. Decision record format.
3. Content metadata alignment.
4. Rule-based selector prototype.
