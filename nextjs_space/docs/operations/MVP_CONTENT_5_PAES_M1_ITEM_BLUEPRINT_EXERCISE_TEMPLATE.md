# MVP-CONTENT-5 — PAES M1 Item Blueprint / Exercise Template

## 1. Purpose

This document defines the pedagogical and content-quality contract for future PAES M1 items in Bexauri / E360.

The goal is to ensure that any item created by humans, Gemini, Abacus, or future agents is not only mathematically correct, but also:

- aligned with PAES M1 scope,
- aligned with an official PAES skill,
- aligned with a thematic axis and unit,
- useful as evidence for the Learning Regulation System (SRA),
- appropriate for microlearning,
- safe from overdiagnosis,
- reviewable by a human supervisor.

This phase does not implement items in study-load-content.ts.

---

## 2. Official PAES M1 Reference

The official reference for this blueprint is the DEMRE PAES Regular Competencia Matematica 1 (M1) admission process 2027 syllabus.

According to the official PAES M1 scope:

- PAES M1 evaluates mathematical competence, understood as the integration of skills and knowledge needed to solve problems.
- The official skills are:
  - Resolver problemas
  - Modelar
  - Representar
  - Argumentar
- The official thematic axes are:
  - Numeros
  - Algebra y funciones
  - Geometria
  - Probabilidad y estadistica
- PAES M1 references knowledge from the general education plan from 7th grade to 2nd year of secondary education.
- Questions may be framed in daily-life contexts or in mathematical contexts.
- The instrument uses multiple-choice questions with a single correct answer and 4 options.

Source:
DEMRE — Temario PAES Regular Competencia Matematica 1 (M1), Admision 2027.

---

## 3. Design Principle

A Bexauri PAES M1 item must not be treated as an isolated school exercise.

Each item must function as a small evidence-producing unit inside the SRA:

micro StudyLoad -> student response -> evidence -> supervised interpretation -> next adjustment

Therefore, the item must make clear:

1. what mathematical knowledge it touches,
2. what official PAES skill it mainly activates,
3. what kind of mistake each distractor reveals,
4. what the SRA may cautiously infer,
5. what the SRA must not infer.

---

## 4. Valid Official Skills

Every item must declare exactly one primary official skill.

Accepted values:

- Resolver problemas
- Modelar
- Representar
- Argumentar

Secondary actions such as interpreting, calculating, comparing, reading a graph, visualizing, estimating, or explaining may be described inside the rationale, but they must not replace the official PAES skill field.

Examples:

- "Interpretar un grafico" may be part of Representar or Resolver problemas.
- "Visualizar una figura" may support Resolver problemas.
- "Justificar por que una opcion es valida" may support Argumentar.

---

## 5. Valid Thematic Axes

Every item must declare exactly one primary thematic axis.

Accepted values:

- Numeros
- Algebra y funciones
- Geometria
- Probabilidad y estadistica

An item may involve more than one axis incidentally, but for microlearning and evidence clarity, it should have one dominant axis.

If an item mixes several axes in a way that makes student error hard to interpret, it should be rejected or split into simpler items.

---

## 6. Context Rule

Bexauri should not impose a false rule that every PAES M1 item must look like a real-life story.

PAES M1 allows both:

- daily-life contexts,
- mathematical contexts.

A context is valid when it helps evaluate the declared skill without introducing unnecessary noise.

A mathematical context is valid when it is aligned with PAES M1 scope and produces useful evidence.

A daily-life context is valid when it is clear, natural, and mathematically relevant.

Bad context patterns:

- long stories that hide a simple calculation,
- culturally biased or overly specific scenarios,
- artificial contexts that make the item harder without improving evidence,
- wording traps that test reading tricks more than mathematical competence.

---

## 7. Internal Difficulty Bands

Bexauri may use internal difficulty bands for planning and microlearning.

These are not PAES psychometric difficulty labels.

Accepted internal values:

- D0 — Access / repair
- D1 — Foundational observable
- D2 — Standard practice
- D3 — Challenge
- D4 — Extension

Guidelines:

- D0: used for immediate repair, prerequisite recovery, or very basic access.
- D1: suitable for first-contact observation.
- D2: suitable for normal practice after initial evidence.
- D3: suitable for stronger students or later-stage consolidation.
- D4: optional extension, not for early diagnosis.

For the initial balanced entry activity, use D1 unless there is a specific supervised reason not to.

---

## 8. Required Item Fields

Each item must include the following fields before it can be accepted into the content registry.

Required fields:

- itemKey
- axis
- unit
- primarySkill
- secondaryActions
- difficultyBand
- sraRole
- prompt
- options
- correctOptionKey
- solutionBrief
- distractorRationales
- expectedEvidence
- notFor
- reviewNotes

Suggested structure:

itemKey: string
axis: Numeros | Algebra y funciones | Geometria | Probabilidad y estadistica
unit: string
primarySkill: Resolver problemas | Modelar | Representar | Argumentar
secondaryActions:
  - string
difficultyBand: D0 | D1 | D2 | D3 | D4
sraRole: string
prompt: string
options:
  A: string
  B: string
  C: string
  D: string
correctOptionKey: A | B | C | D
solutionBrief: string
distractorRationales:
  A: string
  B: string
  C: string
  D: string
expectedEvidence:
  ifCorrect: string
  ifIncorrect: string
  limits: string
notFor:
  - string
reviewNotes: string

---

## 9. Field Definitions

### itemKey

Stable identifier for the item.

Example:

paes_m1_balanced_entry_initial_numbers_01

### axis

The primary PAES M1 thematic axis.

### unit

The specific content unit or microtopic.

Examples:

- Porcentaje
- Numeros racionales
- Ecuaciones lineales
- Funcion lineal y afin
- Perimetro y area
- Tablas y graficos
- Probabilidad de un evento

### primarySkill

The official PAES skill most directly evaluated by the item.

### secondaryActions

Non-canonical actions that clarify what the student does.

Examples:

- calculate
- compare
- interpret table
- read graph
- translate situation to expression
- identify relevant data
- evaluate result

### difficultyBand

Internal Bexauri difficulty band.

This must not be presented to students as PAES score or official PAES difficulty.

### sraRole

The role of the item inside the SRA.

Examples:

- observe baseline signal,
- check prerequisite,
- confirm recent practice,
- support supervised next-step decision,
- detect likely misconception,
- provide low-stakes entry evidence.

### prompt

The student-facing question.

It must be clear, unambiguous, and compatible with mobile reading.

### options

Exactly four options: A, B, C, D.

Only one option may be correct.

Avoid:

- "Todas las anteriores"
- "Ninguna de las anteriores"
- absurd distractors
- obviously longer correct option
- options with inconsistent formatting

### correctOptionKey

The only correct answer.

### solutionBrief

A short explanation, ideally 1 to 3 steps.

For early MVP, this may be shown after submission as basic feedback.

### distractorRationales

Each incorrect option must have a pedagogical reason.

Distractors are evidence tools, not random wrong answers.

### expectedEvidence

Cautious interpretation for the SRA.

It should describe what the response may suggest, not what it proves.

### notFor

A list of things the item must not be used for.

Examples:

- estimating PAES score,
- making a final diagnosis,
- assigning long-term level,
- triggering automatic adaptive decisions,
- replacing human review.

### reviewNotes

Optional notes for future human review.

---

## 10. Distractor Quality Contract

Distractors must be plausible and interpretable.

Each distractor should ideally represent one of these error families:

| Error family | Description | SRA value |
|---|---|---|
| Operational error | Sign, arithmetic, order of operations, simple calculation error | May indicate precision, fluency, or attention issue |
| Conceptual error | Misunderstanding the underlying concept | May indicate need for concept repair |
| Representation error | Misreading graph, table, diagram, expression, or notation | May indicate representation weakness |
| Modeling error | Choosing the wrong expression, variable relationship, or structure | May indicate difficulty translating situations into mathematics |
| Relevant-data error | Using irrelevant data or ignoring necessary data | May indicate comprehension or problem-analysis issue |
| Incomplete-process error | Stopping at an intermediate step | May indicate lack of goal monitoring |
| Inversion error | Reversing dependency, operation, ratio, or direction | May indicate structural misunderstanding |

A distractor should not exist only to fill option C.

---

## 11. Evidence and Overdiagnosis Rules

Bexauri must avoid the false-diagnosis trap.

A single micro item may provide a signal, but it does not prove mastery or failure.

Allowed language:

- "This response provides initial evidence of..."
- "This may suggest..."
- "This should be reviewed together with future evidence..."
- "The student may need reinforcement in..."

Disallowed language:

- "The student masters this axis."
- "The student is weak in PAES M1."
- "The student will score..."
- "The system has diagnosed..."
- "Automatically move the student to..."

Microlearning evidence must remain humble, cumulative, and supervised.

---

## 12. Rejection Rules

Reject or revise any item that:

1. Has more than one defensible correct answer.
2. Exceeds PAES M1 scope.
3. Uses a non-official skill as the primary skill.
4. Is only mechanical calculation without evidence value.
5. Has random, absurd, or uninterpretable distractors.
6. Uses "Todas las anteriores" or "Ninguna de las anteriores" without exceptional justification.
7. Confuses Bexauri internal difficulty with official PAES difficulty.
8. Claims to estimate PAES score.
9. Claims to diagnose the student from one item.
10. Mixes too many roadmap nodes in one question.
11. Uses unnecessarily punitive, anxious, or discouraging language.
12. Depends on obscure cultural knowledge.
13. Is too long for mobile microlearning.
14. Tests reading tricks more than mathematical competence.
15. Cannot explain why each wrong option is wrong.

---

## 13. Template for Future Item Drafting

Use this template when drafting a new item.

itemKey:
axis:
unit:
primarySkill:
secondaryActions:
  -
difficultyBand:
sraRole:
prompt:
options:
  A:
  B:
  C:
  D:
correctOptionKey:
solutionBrief:
distractorRationales:
  A:
  B:
  C:
  D:
expectedEvidence:
  ifCorrect:
  ifIncorrect:
  limits:
notFor:
  -
reviewNotes:

---

## 14. Example — Illustrative Only

This example is illustrative. It is not yet a final registry item.

itemKey: paes_m1_example_algebra_modeling_01
axis: Algebra y funciones
unit: Funcion lineal y afin
primarySkill: Modelar
secondaryActions:
  - identify fixed value
  - identify variable rate
  - translate situation into expression
difficultyBand: D1
sraRole: observe whether the student can represent a simple affine relationship
prompt: "Un servicio cobra una cuota fija de $600 y ademas $120 por cada kilometro recorrido. Si x representa los kilometros recorridos, que expresion representa el total a pagar?"
options:
  A: "600x + 120"
  B: "600 + 120x"
  C: "(600 + 120)x"
  D: "720x"
correctOptionKey: B
solutionBrief: "La cuota fija no depende de x, por eso queda 600. El costo variable es 120 por cada kilometro, por eso es 120x. El total es 600 + 120x."
distractorRationales:
  A: "Invierte el rol del valor fijo y el valor variable."
  B: "Correcta."
  C: "Aplica la variable al total de valores, como si ambos dependieran de los kilometros."
  D: "Suma los valores y multiplica por x, perdiendo la cuota fija."
expectedEvidence:
  ifCorrect: "May suggest the student can identify a fixed charge and a variable rate in a simple affine model."
  ifIncorrect: "May suggest difficulty distinguishing fixed and variable quantities in a model."
  limits: "This item alone does not prove mastery of functions or modeling."
notFor:
  - PAES score estimation
  - final diagnosis
  - automatic adaptive placement
reviewNotes: "Useful as a simple D1 modeling item; should be paired with future graph/table evidence."

---

## 15. Application to PAES M1 — Entrada balanceada inicial

The future activity paes_m1_balanced_entry_initial should use this blueprint as its acceptance contract.

Recommended design:

- 4 items total.
- 1 item per PAES M1 axis.
- Internal difficulty: D1.
- Low-stakes first-contact evidence.
- Short mobile-compatible prompts.
- Clear distractor rationales.
- No PAES score.
- No final diagnostic label.
- No automatic adaptive decision.
- Human-supervised interpretation.

Recommended axis distribution:

- Item 1 — Numeros
- Item 2 — Algebra y funciones
- Item 3 — Geometria
- Item 4 — Probabilidad y estadistica

Each item must declare one official primary skill:

- Resolver problemas
- Modelar
- Representar
- Argumentar

The goal is not to classify the student immediately.

The goal is to produce a first balanced signal that can guide supervised next-step planning inside the SRA.

---

## 16. Phase Closure

MVP-CONTENT-5 defines the item blueprint and exercise template for PAES M1.

It does not create final items.

It does not modify the content registry.

It does not modify application code.

It prepares the ground for a later phase such as:

MVP-CONTENT-6 — PAES M1 balanced entry item set
