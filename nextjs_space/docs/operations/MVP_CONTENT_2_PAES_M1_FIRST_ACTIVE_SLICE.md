# MVP-CONTENT-2 - PAES_M1 First Active Slice

## 1. Phase type

Content / direction only.

No app code, no schema, no database mutation, no production operation, no Abacus, no deploy, no endpoint changes, no UI changes, no secrets, no long scripts.

## 2. Starting point

Repository state at phase start:

- HEAD = origin/main = bbefc31
- Commit: MVP-CONTENT-1: define PAES M1 master roadmap skeleton
- Working tree clean
- Branch main up to date with origin/main

## 3. Purpose

MVP-CONTENT-2 defines the first operational active slice for PAES_M1 MVP-Beta.

This is not a fixed four-week plan.

This is not a complete roadmap.

This is not an exercise bank.

This is the first small, high-signal slice extracted from the PAES_M1 master roadmap skeleton so that Bexauri can begin a student with low friction, capture evidence quickly, and allow human-supervised continuity.

## 4. Source basis

Primary basis:

- MVP-CONTENT-1 - PAES_M1 master roadmap skeleton.
- Official PAES M1 structure:
  - axes: Numeros, Algebra y funciones, Geometria, Probabilidad y estadistica;
  - skills: Resolver problemas, Modelar, Representar, Argumentar.

This active slice is a Bexauri pedagogical cut from the master roadmap. It is designed for MVP-Beta operation, not for full adaptive automation.

## 5. Relationship with the dynamic SRA roadmap

The active slice must follow the architecture:

master roadmap
-> active slice
-> micro StudyLoad
-> evidence
-> supervised adjustment
-> next active slice

The active slice is the next useful learning segment for a specific student.

It may be changed, skipped, reinforced, or accelerated based on evidence.

It must not become a rigid calendar.

## 6. Executive decision

The first PAES_M1 active slice should focus on algebraic readiness and linear relationships.

Reason:

Algebraic expressions, linear equations, and early linear-function reasoning provide high diagnostic and instructional value for PAES_M1. They connect to multiple PAES skills and reveal common prerequisite gaps without requiring a heavy diagnostic.

The first active slice will prioritize:

1. algebraic expression interpretation;
2. simple equation solving;
3. contextual equation setup;
4. early linear function representation;
5. proportional reasoning as a support path;
6. data interpretation as optional low-friction observation.

## 7. Active slice ID

Recommended ID:

PAES_M1_ACTIVE_SLICE_001_ALGEBRA_LINEAR_ENTRY

Student-facing name:

Primer tramo: ecuaciones, relaciones y funciones lineales

Internal purpose:

Observe the student's algebraic readiness and ability to move between symbolic, contextual, and representational forms.

## 8. Target students

This slice is suitable for students entering PAES_M1 with:

- unknown level;
- partially known level;
- no recent evidence;
- evidence suggesting early algebra needs verification;
- early MVP-Beta onboarding.

This slice is also suitable as a return point after a pause, if the student has no recent reliable evidence.

## 9. Not suitable when

This slice should be skipped or shortened when the student already has strong recent evidence in:

- algebraic expressions;
- linear equations;
- linear functions;
- proportional reasoning;
- PAES-oriented contextual modeling.

In that case, the supervisor may extract a later or higher-difficulty active slice from the master roadmap.

## 10. Pedagogical objectives

This first active slice should help Bexauri answer:

- Can the student interpret simple algebraic language?
- Can the student solve direct linear equations?
- Can the student translate a simple context into an equation?
- Can the student understand input-output relationships?
- Can the student connect a table, equation, or graph in a basic linear situation?
- Does the student need reinforcement, or can they accelerate?

## 11. PAES skill coverage

Primary skills:

- Resolver problemas.
- Modelar.
- Representar.

Secondary skill:

- Argumentar, only through light error-recognition or explanation-oriented items.

This slice should not overemphasize formal proof or heavy argumentation at entry.

## 12. Difficulty range

Recommended starting range:

- D0 - Access / readiness.
- D1 - Foundational.
- D2 - Consolidation.

Optional validation:

- D3 - PAES-oriented item only if early evidence is strong.

Avoid D4 at the entry point unless the student already shows strong evidence.

## 13. Default first micro StudyLoad

Recommended first micro StudyLoad:

PAES M1 - Ecuaciones lineales de entrada

Purpose:

Capture quick evidence of algebraic readiness without making the student feel they are taking a diagnostic.

Recommended size:

- 4 exercises where possible.
- Current MVP may temporarily use existing 8-item activities until content is migrated.

Exercise mix:

1. D0/D1 algebraic expression recognition or evaluation.
2. D1 simple linear equation.
3. D1/D2 two-step equation or equation with parentheses.
4. D2 contextual equation setup or interpretation.

Student-facing tone:

- short;
- direct;
- non-intimidating;
- framed as first learning action, not as a test.

## 14. Evidence expected from first micro StudyLoad

The first micro StudyLoad should produce:

- answered count;
- correct count when safely available;
- selected answer patterns;
- self-report;
- completion status;
- rough indication of algebraic readiness.

It should not produce:

- PAES score;
- mastery decision;
- theta estimate;
- automatic placement certainty;
- automatic roadmap jump without supervision.

## 15. Micro StudyLoad candidates in this slice

### AS1-MSL-01 - Algebraic expression access check

Roadmap area:

B1 - Algebraic expressions.

Difficulty:

D0-D1.

Purpose:

Check whether the student recognizes variables, expressions, and substitution.

Exercise types:

- evaluate expression for a given value;
- choose equivalent simple expression;
- translate short phrase to expression;
- detect obvious expression mismatch.

Evidence:

- notation control;
- variable interpretation;
- basic symbolic fluency.

Possible next action:

- if strong: move to AS1-MSL-02;
- if weak: reinforce B1 at D0/D1;
- if mixed: hold and give another short expression load.

### AS1-MSL-02 - Linear equation direct solving

Roadmap area:

B2 - Linear equations and inequalities.

Difficulty:

D1-D2.

Purpose:

Observe procedural equation-solving fluency.

Exercise types:

- one-step equation;
- two-step equation;
- equation with parentheses;
- missing step or error detection.

Evidence:

- inverse operation control;
- sign handling;
- procedural accuracy;
- error recognition.

Possible next action:

- if strong: move to AS1-MSL-03 or AS1-MSL-04;
- if weak: reinforce equation mechanics;
- if self-report is low despite correct answers: hold with confidence-building load.

### AS1-MSL-03 - Context to equation

Roadmap area:

B2 - Linear equations.

Difficulty:

D2-D3.

Purpose:

Check whether the student can model a simple verbal situation as an equation.

Exercise types:

- choose equation matching a context;
- solve simple contextual equation;
- interpret solution meaning;
- detect irrelevant information.

Evidence:

- modeling;
- context translation;
- result interpretation.

Possible next action:

- if strong: move toward linear functions;
- if weak: return to algebraic expressions or equation setup;
- if errors are contextual not procedural: reinforce modeling rather than mechanics.

### AS1-MSL-04 - Linear relationship representation

Roadmap area:

B3 - Linear functions.

Difficulty:

D1-D2.

Purpose:

Check early function readiness.

Exercise types:

- complete table from simple rule;
- evaluate function;
- match table to expression;
- identify slope or constant change informally.

Evidence:

- input-output reasoning;
- pattern recognition;
- representation transfer;
- readiness for functions.

Possible next action:

- if strong: move to graph/table/equation relationship;
- if weak: reinforce tables and variable substitution;
- if strong and fast: consider validation item.

### AS1-MSL-05 - Proportional reasoning support path

Roadmap area:

A3 - Proportional reasoning and percentages.

Difficulty:

D1-D2.

Purpose:

Provide a support path when algebra errors appear connected to proportional reasoning or multiplicative structure.

Exercise types:

- percentage interpretation;
- direct proportion;
- scale or ratio;
- proportional table.

Evidence:

- multiplicative reasoning;
- percent fluency;
- context setup.

Possible next action:

- if strong: return to algebra/linear relationships;
- if weak: keep proportional reasoning as reinforcement branch;
- if mixed: use context-based simpler problems.

### AS1-MSL-06 - Data representation low-friction observation

Roadmap area:

D1 - Data representation and interpretation.

Difficulty:

D0-D1.

Purpose:

Offer a lower-friction activity if the student needs confidence, or capture representation evidence without heavy algebra.

Exercise types:

- read graph value;
- compare table values;
- interpret simple trend;
- identify correct statement from data.

Evidence:

- representation literacy;
- information extraction;
- confidence and engagement.

Possible next action:

- if strong: return to algebra slice;
- if weak: mark representation as support need;
- if self-report improves: use as confidence-building path.

## 16. Branching rules for MVP-Beta

These rules are manual or human-supervised. They are not automatic algorithmic decisions.

### Advance

Advance to the next micro StudyLoad when:

- most answers are correct;
- self-report is positive or neutral;
- errors are not repeated;
- the next node is a natural progression.

### Accelerate

Accelerate or skip ahead when:

- performance is strong across D1-D2;
- self-report is confident;
- the student completes quickly and accurately, if timing is available later;
- supervisor believes current level is too easy.

Acceleration should be validated with a D3 item or a small challenge in a future phase.

### Reinforce

Reinforce when:

- repeated error appears;
- answer pattern shows prerequisite weakness;
- self-report says "Me costo" or "No estoy seguro";
- correct answers are mixed or fragile.

### Hold

Hold the same area when:

- evidence is insufficient;
- correct answers and self-report conflict;
- only one short activity has been completed;
- supervisor wants more signal.

### Redirect

Redirect when:

- the selected slice is not producing useful evidence;
- the student is blocked by a deeper prerequisite;
- the student needs confidence-building or a lower-friction entry;
- the current work is too easy and not generating signal.

## 17. First active slice operating sequence

Default sequence for unknown-level student:

1. AS1-MSL-01 - Algebraic expression access check.
2. AS1-MSL-02 - Linear equation direct solving.
3. AS1-MSL-03 - Context to equation.
4. AS1-MSL-04 - Linear relationship representation.

Support branches:

- AS1-MSL-05 - Proportional reasoning support path.
- AS1-MSL-06 - Data representation low-friction observation.

Important:

This is a default operating sequence, not a fixed calendar.

The student may skip, repeat, slow down, or accelerate depending on evidence.

## 18. How this slice should appear to the student

The student should not see:

- diagnostic language;
- "test";
- "placement";
- "you failed";
- "you are level X";
- "PAES score estimate".

The student may see:

- "Primera actividad";
- "Vamos a partir con una carga corta";
- "Tus respuestas nos ayudarán a preparar el siguiente paso";
- "Este resultado es evidencia de esta actividad, no un puntaje PAES".

## 19. How this slice should appear to the supervisor

The supervisor should see or infer:

- active slice ID;
- current roadmap area;
- completed micro StudyLoad;
- answer evidence;
- self-report;
- suggested branch;
- risk or confidence notes;
- next recommended micro StudyLoad.

MVP-Beta may keep this as manual documentation first.

## 20. Minimal MVP-Beta metadata

Each micro StudyLoad in this slice should eventually have:

- active slice ID;
- roadmap node;
- axis;
- skill;
- subskill;
- difficulty band;
- exercise count;
- answer key;
- evidence purpose;
- next action if strong;
- next action if weak.

For current MVP-Beta, this may be partially represented in title, contentKey, content registry, and supervisor documentation.

## 21. Relationship with existing content

Existing PAES_M1 activities may be mapped into this slice if they match the intent.

Possible mapping:

- "PAES M1 - Ecuaciones lineales basicas" -> AS1-MSL-02.
- "PAES M1 - Problemas con ecuaciones lineales" -> AS1-MSL-03.
- "PAES M1 - Refuerzo de ecuaciones lineales" -> AS1-MSL-02 / reinforcement.
- "PAES M1 - Funciones lineales basicas" -> AS1-MSL-04.

This mapping is provisional and should be confirmed in a later content registry alignment phase.

## 22. Not included in this phase

This phase does not create:

- new exercises;
- registry code;
- app UI;
- schema;
- dynamic roadmap engine;
- automatic next-load generator;
- challenge engine;
- ensayo integration;
- adaptive theta model;
- PAES score model;
- AI tutor.

## 23. Next recommended phase

MVP-CONTENT-3 - PAES_M1 first micro StudyLoad set.

Purpose:

Create or align the first concrete micro StudyLoads for AS1-MSL-01 through AS1-MSL-04, using the current content registry where possible and keeping MVP-Beta scope small.
