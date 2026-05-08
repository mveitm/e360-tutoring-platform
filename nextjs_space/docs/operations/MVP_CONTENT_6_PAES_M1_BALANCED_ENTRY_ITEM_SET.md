# MVP-CONTENT-6 — PAES M1 Balanced Entry Item Set

## 1. Purpose

This document defines the first concrete item set for the future activity:

PAES M1 — Entrada balanceada inicial

Content identity:

- contentKey: paes_m1_balanced_entry_initial
- active slice: AS1
- micro StudyLoad: AS1-MSL-00
- estimated duration: 8 to 12 minutes
- item count: 4
- format: multiple choice, single correct answer, 4 options

This phase creates the item set as documentation/content only.

It does not implement the activity in study-load-content.ts.

---

## 2. Source Contract

This item set follows the blueprint created in:

MVP_CONTENT_5_PAES_M1_ITEM_BLUEPRINT_EXERCISE_TEMPLATE.md

Each item includes:

- itemKey
- axis
- unit
- primarySkill
- secondaryActions
- difficultyBand
- sraRole
- prompt
- options A/B/C/D
- correctOptionKey
- solutionBrief
- distractorRationales
- expectedEvidence
- notFor
- reviewNotes

Official PAES M1 skills used:

- Resolver problemas
- Modelar
- Representar
- Argumentar

Official PAES M1 axes used:

- Numeros
- Algebra y funciones
- Geometria
- Probabilidad y estadistica

---

## 3. Design Intent

The goal of this balanced entry activity is not to diagnose the student conclusively.

The goal is to produce a first broad, low-stakes, supervised signal across the four PAES M1 axes.

The SRA may use this evidence to support human-supervised next-step planning, but not to estimate PAES score, assign a fixed level, or trigger fully automatic adaptive decisions.

Expected student experience:

- short activity,
- accessible language,
- no punitive tone,
- one question per axis,
- simple post-answer feedback possible,
- useful evidence for later continuity.

---

## 4. Item Set Overview

| Item | Axis | Unit | Primary skill | Difficulty |
|---|---|---|---|---|
| 1 | Numeros | Porcentaje simple | Resolver problemas | D1 |
| 2 | Algebra y funciones | Funcion lineal y afin | Modelar | D1 |
| 3 | Geometria | Area de rectangulo | Representar | D1 |
| 4 | Probabilidad y estadistica | Probabilidad de un evento simple | Resolver problemas | D1 |

---

## 5. Item 1 — Numeros

itemKey: paes_m1_balanced_entry_initial_numbers_01

axis: Numeros

unit: Porcentaje simple

primarySkill: Resolver problemas

secondaryActions:
- identify relevant quantity
- calculate percentage
- choose result in context

difficultyBand: D1

sraRole: observe whether the student can calculate a simple percentage in a direct everyday context.

prompt: Una tienda ofrece un descuento de 20% en un producto que cuesta $15.000. ¿Cuanto dinero se descuenta?

options:
A: "$1.500"
B: "$2.000"
C: "$3.000"
D: "$12.000"

correctOptionKey: C

solutionBrief: El 20% equivale a 20 de cada 100. Entonces 20% de 15.000 es 0,20 x 15.000 = 3.000. El descuento es $3.000.

distractorRationales:
A: Puede indicar que el estudiante calculo 10% en vez de 20%.
B: Puede indicar uso incorrecto del 20 como cantidad directa o una estimacion no proporcional.
C: Correcta.
D: Puede indicar que el estudiante calculo el precio final aproximado o resto mal el descuento.

expectedEvidence:
ifCorrect: May suggest the student can calculate a simple percentage of a known amount in a direct context.
ifIncorrect: May suggest difficulty with percentage meaning, proportional calculation, or distinguishing discount from final price.
limits: This item alone does not prove mastery of percentages or proportional reasoning.

notFor:
- PAES score estimation
- final diagnosis
- automatic adaptive placement
- concluding mastery of Numeros

reviewNotes: This is a low-stakes D1 entry item. It is intentionally direct and should be paired later with proportional reasoning, fractions, decimals, and multi-step contexts.

---

## 6. Item 2 — Algebra y funciones

itemKey: paes_m1_balanced_entry_initial_algebra_functions_01

axis: Algebra y funciones

unit: Funcion lineal y afin

primarySkill: Modelar

secondaryActions:
- identify fixed value
- identify variable rate
- translate situation into expression

difficultyBand: D1

sraRole: observe whether the student can model a simple affine relationship from a short situation.

prompt: Un servicio de arriendo de bicicletas cobra $1.000 fijos y $500 por cada hora de uso. Si h representa la cantidad de horas, ¿que expresion representa el costo total?

options:
A: "1000h + 500"
B: "1000 + 500h"
C: "(1000 + 500)h"
D: "1500h"

correctOptionKey: B

solutionBrief: El valor fijo es $1.000, por eso no depende de h. El costo por hora es $500h. El costo total es 1000 + 500h.

distractorRationales:
A: Puede indicar inversion entre valor fijo y valor variable.
B: Correcta.
C: Puede indicar que el estudiante aplica la variable al total de valores sin distinguir fijo y variable.
D: Puede indicar que el estudiante suma los valores y pierde la estructura de cuota fija mas costo variable.

expectedEvidence:
ifCorrect: May suggest the student can identify fixed and variable quantities in a simple linear model.
ifIncorrect: May suggest difficulty translating a situation into an algebraic expression or distinguishing fixed cost from variable rate.
limits: This item alone does not prove mastery of functions, equations, or algebraic modeling.

notFor:
- PAES score estimation
- final diagnosis
- automatic adaptive placement
- concluding mastery of Algebra y funciones

reviewNotes: This item is aligned with the current algebra/functions registry direction and can serve as first balanced-entry evidence before more focused function practice.

---

## 7. Item 3 — Geometria

itemKey: paes_m1_balanced_entry_initial_geometry_01

axis: Geometria

unit: Area de rectangulo

primarySkill: Representar

secondaryActions:
- interpret dimensions
- connect geometric representation with area
- calculate area

difficultyBand: D1

sraRole: observe whether the student can connect a simple geometric representation with area calculation.

prompt: Un terreno rectangular mide 8 metros de largo y 5 metros de ancho. ¿Cual es el area del terreno?

options:
A: "13 m2"
B: "26 m2"
C: "40 m2"
D: "80 m2"

correctOptionKey: C

solutionBrief: El area de un rectangulo se calcula multiplicando largo por ancho. Entonces 8 x 5 = 40. El area es 40 m2.

distractorRationales:
A: Puede indicar que el estudiante sumo largo y ancho en vez de calcular area.
B: Puede indicar que el estudiante calculo perimetro parcial o duplico la suma de forma incompleta.
C: Correcta.
D: Puede indicar que el estudiante duplico el area o confundio area con otro procedimiento.

expectedEvidence:
ifCorrect: May suggest the student can associate rectangular dimensions with area calculation in a simple context.
ifIncorrect: May suggest confusion between area and perimeter, or difficulty choosing the correct geometric operation.
limits: This item alone does not prove mastery of geometry, measurement, or area in complex figures.

notFor:
- PAES score estimation
- final diagnosis
- automatic adaptive placement
- concluding mastery of Geometria

reviewNotes: The item uses a simple context and keeps cognitive load low. Future geometry items should include figures, composite shapes, scale, and perimeter-area contrast.

---

## 8. Item 4 — Probabilidad y estadistica

itemKey: paes_m1_balanced_entry_initial_probability_statistics_01

axis: Probabilidad y estadistica

unit: Probabilidad de un evento simple

primarySkill: Resolver problemas

secondaryActions:
- identify favorable cases
- identify total cases
- express probability as a fraction

difficultyBand: D1

sraRole: observe whether the student can identify favorable and total cases in a simple probability situation.

prompt: En una bolsa hay 3 bolitas rojas y 2 bolitas azules, todas del mismo tamaño. Si se saca una bolita al azar, ¿cual es la probabilidad de que sea azul?

options:
A: "2/3"
B: "2/5"
C: "3/5"
D: "1/2"

correctOptionKey: B

solutionBrief: Hay 2 bolitas azules y 5 bolitas en total. La probabilidad de sacar una azul es casos favorables sobre casos totales: 2/5.

distractorRationales:
A: Puede indicar que el estudiante compara azules con rojas en vez de azules con el total.
B: Correcta.
C: Puede indicar que el estudiante eligio la cantidad de bolitas rojas sobre el total.
D: Puede indicar una estimacion intuitiva de dos colores sin considerar cantidades.

expectedEvidence:
ifCorrect: May suggest the student can identify favorable cases and total cases in a simple probability event.
ifIncorrect: May suggest difficulty distinguishing favorable cases, non-favorable cases, and total cases.
limits: This item alone does not prove mastery of probability, statistics, randomness, or multi-step probability.

notFor:
- PAES score estimation
- final diagnosis
- automatic adaptive placement
- concluding mastery of Probabilidad y estadistica

reviewNotes: This is intentionally simple. Later items should include tables, charts, relative frequency, and interpretation of data.

---

## 9. Student-Facing Activity Draft

Title: PAES M1 — Entrada balanceada inicial

Estimated duration: 8 to 12 minutes

Instruction draft:

Responde estas 4 preguntas breves. Cada una observa un eje distinto de Matemática M1. No es una prueba final ni un puntaje PAES. La idea es obtener una primera señal para orientar tus siguientes cargas de estudio.

Items:

1. Una tienda ofrece un descuento de 20% en un producto que cuesta $15.000. ¿Cuanto dinero se descuenta?
A. $1.500
B. $2.000
C. $3.000
D. $12.000

2. Un servicio de arriendo de bicicletas cobra $1.000 fijos y $500 por cada hora de uso. Si h representa la cantidad de horas, ¿que expresion representa el costo total?
A. 1000h + 500
B. 1000 + 500h
C. (1000 + 500)h
D. 1500h

3. Un terreno rectangular mide 8 metros de largo y 5 metros de ancho. ¿Cual es el area del terreno?
A. 13 m2
B. 26 m2
C. 40 m2
D. 80 m2

4. En una bolsa hay 3 bolitas rojas y 2 bolitas azules, todas del mismo tamaño. Si se saca una bolita al azar, ¿cual es la probabilidad de que sea azul?
A. 2/3
B. 2/5
C. 3/5
D. 1/2

---

## 10. Answer Key

| Item | Correct option |
|---|---|
| 1 | C |
| 2 | B |
| 3 | C |
| 4 | B |

---

## 11. SRA Interpretation Rules

This item set may support these supervised observations:

- Whether the student can handle a simple percentage calculation.
- Whether the student can model a fixed-plus-variable cost expression.
- Whether the student can connect rectangular dimensions with area.
- Whether the student can identify favorable and total cases in simple probability.

This item set must not be used to:

- estimate PAES score,
- classify the student permanently,
- conclude axis mastery,
- conclude axis failure,
- trigger automatic adaptive decisions,
- replace human review,
- replace a broader diagnostic instrument.

The correct interpretation is cumulative and humble:

A 4-item balanced entry activity gives an initial learning signal, not a diagnosis.

---

## 12. Review Notes Before Registry Implementation

Before implementing this item set in study-load-content.ts, the next implementation phase should check:

1. Whether accents and mathematical symbols render correctly in the app.
2. Whether m2 or superscript formatting is supported or should remain plain text.
3. Whether prompt length is comfortable on mobile.
4. Whether answer feedback can show solutionBrief after submission.
5. Whether distractor rationales remain admin-only or tutor-facing.
6. Whether this activity should appear before or after existing algebra/functions registry activities.
7. Whether contentKey paes_m1_balanced_entry_initial is still the desired stable key.

---

## 13. Phase Closure

MVP-CONTENT-6 defines the first PAES M1 balanced entry item set as documentation/content only.

It creates 4 proposed D1 items, one per official PAES M1 axis:

- Numeros
- Algebra y funciones
- Geometria
- Probabilidad y estadistica

It does not modify the content registry.

It does not modify study-load-content.ts.

It does not modify application code.

It does not create a StudyLoad.

It does not mutate DB data.

It does not deploy anything.

Recommended next phase:

MVP-CONTENT-7 — Implement PAES M1 balanced entry item set in content registry
