# MVP-CONTENT-3 - PAES_M1 First Micro StudyLoad Set

## 1. Phase type

Content / direction only.

No app code, no schema, no database mutation, no production operation, no Abacus, no deploy, no endpoint changes, no UI changes, no secrets, no long scripts.

## 2. Starting point

Repository state at phase start:

- HEAD = origin/main = 938eac0
- Commit: MVP-CONTENT-2: define PAES M1 first active slice
- Working tree clean
- Branch main up to date with origin/main

## 3. Purpose

MVP-CONTENT-3 defines the first concrete PAES_M1 micro StudyLoad set for MVP-Beta.

This phase converts the first active slice into a practical, reviewable content set.

It does not update the app content registry yet.

It does not create database records.

It does not create a complete content bank.

It does not implement an adaptive engine.

## 4. Relationship with previous phases

MVP-CONTENT-1 defined the PAES_M1 master roadmap skeleton.

MVP-CONTENT-2 extracted the first active slice for students with unknown or partially known PAES_M1 level.

MVP-CONTENT-3 defines the first micro StudyLoad set that can operationalize that active slice.

Architecture:

master roadmap
-> active slice
-> micro StudyLoad
-> evidence
-> supervised adjustment
-> next active slice

## 5. Important correction: micro StudyLoad set is not the full roadmap

This document does not replace the master roadmap.

This document does not define a fixed calendar.

This document does not define a permanent order for every student.

This document defines a first content set that can be used by MVP-Beta to observe early evidence and support supervised continuity.

## 6. Registry reality at phase start

The current app content registry already contains PAES_M1 activities, concentrated mainly in Algebra and functions.

Current registry-aligned activities:

1. PAES M1 - Ecuaciones lineales basicas
   - contentKey: paes_m1_linear_equations_basic
   - area: Algebra and functions
   - current shape: 8-item activity

2. PAES M1 - Problemas con ecuaciones lineales
   - contentKey: paes_m1_linear_equations_word_problems
   - area: Algebra and functions
   - current shape: 8-item activity

3. PAES M1 - Refuerzo de ecuaciones lineales
   - contentKey: paes_m1_linear_equations_reinforcement
   - area: Algebra and functions
   - current shape: 8-item activity

4. PAES M1 - Funciones lineales basicas
   - contentKey: paes_m1_linear_functions_basic
   - area: Algebra and functions
   - current shape: 8-item activity

These activities are useful and should be preserved.

However, they do not yet represent the ideal first balanced microcontact across all PAES_M1 axes.

## 7. Content strategy decision

MVP-CONTENT-3 makes two parallel definitions:

### 7.1 Transitional registry-aligned set

Use existing registry content where useful, especially for Algebra and functions continuity.

This supports immediate MVP-Beta operation without creating disconnected content.

### 7.2 Ideal first balanced microcontact

Define a future first micro StudyLoad with one item from each official PAES_M1 axis:

- Numbers.
- Algebra and functions.
- Geometry.
- Probability and statistics.

This is better for students with unknown or partially known entry level because it produces broader initial evidence without a heavy diagnostic.

## 8. MVP-Beta versus MVP-Alfa distinction

### MVP-Beta

MVP-Beta may operate with:

- current registry-aligned content;
- manual supervisor curation;
- small content adjustments;
- active slices based on human review;
- non-PAES feedback;
- no automatic roadmap engine.

### MVP-Alfa

MVP-Alfa should evolve toward:

- roadmap balance informed by official PAES structure;
- relative weights by axis and skill where official or validated information is available;
- prerequisite-aware sequencing;
- accumulated student evidence;
- ensayo or challenge calibration;
- stronger content metadata;
- semi-automated active-slice selection.

MVP-Alfa should not assume that all axes have equal weight or equal frequency in the official test.

A balanced first microcontact can be useful for observation, but the long-term roadmap should be strategically weighted by official information, pedagogy, prerequisites, and evidence.

## 9. First micro StudyLoad set overview

The first MVP-Beta content set has two layers.

### Layer A - First balanced entry microcontact

Purpose:

Observe broad early evidence across the four PAES_M1 axes.

StudyLoad:

- AS1-MSL-00 - PAES M1 - Entrada balanceada inicial

Shape:

- 4 items.
- 1 item per axis.
- D0/D1 difficulty.
- Low friction.
- High signal.
- Not a formal diagnostic.
- Not a PAES score.
- Not a mastery decision.

### Layer B - Registry-aligned Algebra and functions continuation

Purpose:

Use existing content to continue learning where the registry already has usable activities.

StudyLoads:

- AS1-MSL-01 - PAES M1 - Ecuaciones lineales basicas
- AS1-MSL-02 - PAES M1 - Problemas con ecuaciones lineales
- AS1-MSL-03 - PAES M1 - Refuerzo de ecuaciones lineales
- AS1-MSL-04 - PAES M1 - Funciones lineales basicas

These currently map to existing app registry titles and content keys.

## 10. AS1-MSL-00 - PAES M1 - Entrada balanceada inicial

### Purpose

Provide a low-friction first contact with PAES_M1 by sampling the four axes.

This StudyLoad is ideal as a future entry point for students whose level is unknown or partially known.

It is not yet in the registry at phase close.

### Roadmap relationship

Active slice:

- AS1 - First active slice.

Roadmap nodes:

- A3 - Proportional reasoning and percentages.
- B2 - Linear equations and inequalities.
- C1 - Plane geometry and measurement.
- D1 - Data representation and interpretation.

Difficulty:

- D0/D1.

Evidence purpose:

- broad initial signal;
- identify obvious strengths and weaknesses;
- decide whether to advance, reinforce, validate, or redirect.

### Item 1 - Numbers / proportional reasoning

Skill focus:

- Interpret percentage or proportional relationship.

Prompt:

En una tienda, una polera cuesta $12.000 y tiene un descuento del 25%. ¿Cuanto se debe pagar por la polera despues del descuento?

Options:

A. $3.000  
B. $6.000  
C. $9.000  
D. $15.000  

Correct answer:

C

Short explanation:

El 25% de $12.000 es $3.000. Entonces se descuenta $3.000 y se paga $12.000 - $3.000 = $9.000.

Evidence:

- understands percentage as part of a whole;
- applies subtraction after discount;
- distinguishes discount amount from final price.

If strong:

- allow proportional reasoning or percent increase/decrease next.

If weak:

- reinforce percentage meaning and fraction/decimal equivalence.

### Item 2 - Algebra / linear equation

Skill focus:

- Solve a basic linear equation.

Prompt:

Si 3x + 5 = 20, ¿cual es el valor de x?

Options:

A. 3  
B. 5  
C. 8  
D. 15  

Correct answer:

B

Short explanation:

Restamos 5 a ambos lados: 3x = 15. Luego dividimos por 3: x = 5.

Evidence:

- recognizes inverse operations;
- solves one-step/two-step linear equation;
- controls arithmetic.

If strong:

- move to equations with parentheses, fractions, or context.

If weak:

- reinforce inverse operations and equation structure.

### Item 3 - Geometry / measurement

Skill focus:

- Area of a rectangle.

Prompt:

Un rectangulo mide 8 cm de largo y 5 cm de ancho. ¿Cual es su area?

Options:

A. 13 cm2  
B. 26 cm2  
C. 40 cm2  
D. 80 cm2  

Correct answer:

C

Short explanation:

El area de un rectangulo se calcula multiplicando largo por ancho: 8 x 5 = 40 cm2.

Evidence:

- selects correct geometric formula;
- distinguishes area from perimeter;
- handles units.

If strong:

- move to composed figures or contextual measurement.

If weak:

- reinforce area/perimeter distinction.

### Item 4 - Data interpretation

Skill focus:

- Read and compare data from a simple table.

Prompt:

La siguiente tabla muestra la cantidad de estudiantes inscritos en tres talleres:

- Musica: 18
- Deporte: 25
- Arte: 12

¿Que taller tiene mas estudiantes inscritos?

Options:

A. Musica  
B. Deporte  
C. Arte  
D. Todos tienen la misma cantidad  

Correct answer:

B

Short explanation:

El valor mayor de la tabla es 25, que corresponde al taller de Deporte.

Evidence:

- extracts information from a table;
- compares quantities;
- avoids distractor from equal-count option.

If strong:

- move to graphs, trends, or contextual data questions.

If weak:

- reinforce table reading and comparison.

## 11. AS1-MSL-01 - PAES M1 - Ecuaciones lineales basicas

### Registry status

Existing registry-aligned StudyLoad.

Current title:

PAES M1 - Ecuaciones lineales basicas

Current contentKey:

paes_m1_linear_equations_basic

### Purpose

Observe basic algebraic equation fluency.

### Roadmap relationship

Axis:

- Algebra and functions.

Roadmap node:

- B2 - Linear equations and inequalities.

Difficulty:

- D1/D2.

### Current use in MVP-Beta

This activity may remain as an 8-item StudyLoad while MVP-Beta stabilizes.

Future micro version should be split into smaller 4-item StudyLoads.

### Evidence purpose

- inverse operations;
- equation structure;
- procedural accuracy;
- readiness for contextual equations.

### Supervisor interpretation

If strong:

- move to word problems or linear functions.

If weak:

- use reinforcement or prerequisite review.

## 12. AS1-MSL-02 - PAES M1 - Problemas con ecuaciones lineales

### Registry status

Existing registry-aligned StudyLoad.

Current title:

PAES M1 - Problemas con ecuaciones lineales

Current contentKey:

paes_m1_linear_equations_word_problems

### Purpose

Observe whether the student can translate a simple context into a linear equation.

### Roadmap relationship

Axis:

- Algebra and functions.

Roadmap node:

- B2 - Linear equations and inequalities.

Cross-cutting skills:

- Resolver problemas.
- Modelar.

Difficulty:

- D2/D3.

### Current use in MVP-Beta

May be used after AS1-MSL-01 if evidence suggests sufficient basic equation fluency.

### Evidence purpose

- context translation;
- equation setup;
- solution interpretation;
- distractor resistance.

### Supervisor interpretation

If strong:

- move toward functions or validation item.

If weak:

- reinforce equation setup and verbal-to-symbolic translation.

## 13. AS1-MSL-03 - PAES M1 - Refuerzo de ecuaciones lineales

### Registry status

Existing registry-aligned StudyLoad.

Current title:

PAES M1 - Refuerzo de ecuaciones lineales

Current contentKey:

paes_m1_linear_equations_reinforcement

### Purpose

Provide reinforcement when evidence shows fragility in basic or contextual linear equations.

### Roadmap relationship

Axis:

- Algebra and functions.

Roadmap node:

- B2 - Linear equations and inequalities.

Difficulty:

- D1/D2.

### Current use in MVP-Beta

Use when:

- student self-reports difficulty;
- repeated errors appear;
- equations are solved inconsistently;
- contextual equation problems are premature.

### Evidence purpose

- consolidate inverse operations;
- reduce repeated procedural errors;
- rebuild confidence;
- prepare return to main active slice.

### Supervisor interpretation

If strong after reinforcement:

- return to problems with equations or functions.

If still weak:

- redirect to prerequisite arithmetic or algebraic expressions.

## 14. AS1-MSL-04 - PAES M1 - Funciones lineales basicas

### Registry status

Existing registry-aligned StudyLoad.

Current title:

PAES M1 - Funciones lineales basicas

Current contentKey:

paes_m1_linear_functions_basic

### Purpose

Observe early function understanding and representation transfer.

### Roadmap relationship

Axis:

- Algebra and functions.

Roadmap node:

- B3 - Linear functions.

Cross-cutting skills:

- Representar.
- Modelar.
- Resolver problemas.

Difficulty:

- D1/D2.

### Current use in MVP-Beta

Use after basic equations when evidence supports moving into function representation.

### Evidence purpose

- evaluate function;
- interpret slope/intercept basics;
- connect table, graph, and equation;
- model simple linear relationship.

### Supervisor interpretation

If strong:

- move to contextual linear functions or challenge/validation later.

If weak:

- reinforce tables, input-output, and equation basics.

## 15. Recommended MVP-Beta order

Because current registry content is Algebra-heavy, MVP-Beta should not treat this order as universal.

Recommended supervised use:

1. If no broad evidence exists, prefer future AS1-MSL-00 balanced entry.
2. If operating with current registry only, begin with AS1-MSL-01.
3. If AS1-MSL-01 is strong, move to AS1-MSL-02 or AS1-MSL-04.
4. If AS1-MSL-01 is weak, use AS1-MSL-03.
5. If functions are needed, use AS1-MSL-04 after enough equation readiness.

## 16. First active slice decision rules

### Advance

Advance when:

- answered evidence is mostly strong;
- self-report is positive or neutral;
- no repeated foundational errors are visible;
- the current node is not a critical unresolved prerequisite.

### Reinforce

Reinforce when:

- repeated error appears;
- self-report indicates difficulty;
- the student gets simple items wrong;
- the student appears to guess or lacks fluency.

### Validate

Validate when:

- the student performs strongly across items;
- the student may be ready to skip ahead;
- the supervisor wants evidence before accelerating.

### Hold

Hold when:

- evidence is mixed;
- the answer pattern is inconclusive;
- self-report conflicts with answer evidence.

### Redirect

Redirect when:

- a deeper prerequisite gap appears;
- the current active slice is too advanced;
- another axis is blocking progress.

## 17. Future MVP-Alfa balancing requirement

After MVP-Beta, Bexauri should evolve toward a roadmap that uses official information more deeply.

MVP-Alfa should support roadmap balancing by:

- official PAES axis structure;
- official or validated relative weights when available;
- PAES skills distribution;
- pedagogical prerequisites;
- accumulated student evidence;
- micro StudyLoad results;
- challenge or ensayo calibration;
- human supervisor adjustment.

The roadmap should not assume that all axes always have equal weight.

The roadmap should also not overfit only to test frequency.

Bexauri should balance:

- official PAES relevance;
- pedagogical dependency;
- student evidence;
- learning confidence;
- tutor/supervisor judgment.

## 18. Not included in this phase

This phase does not create:

- app registry updates;
- new StudyLoad records;
- database mutation;
- schema changes;
- automatic slicing;
- dynamic roadmap engine;
- challenge system;
- ensayo integration;
- PAES score model;
- AI tutor.

## 19. Recommended next phase

MVP-CONTENT-4 - PAES_M1 balanced entry micro StudyLoad registry proposal.

Purpose:

Prepare a safe, registry-ready proposal for AS1-MSL-00 - PAES M1 - Entrada balanceada inicial.

This should remain documentation/content first unless a later phase explicitly updates `nextjs_space/lib/study-load-content.ts`.
