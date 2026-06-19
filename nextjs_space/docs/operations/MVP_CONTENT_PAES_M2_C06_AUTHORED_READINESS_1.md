# MVP-CONTENT-PAES-M2-C06-AUTHORED-READINESS-1

## Phase name

```text
MVP-CONTENT-PAES-M2-C06-AUTHORED-READINESS-1
```

## Baseline inicial

```text
HEAD = origin/main = origin/HEAD = 0e4c49fb799999c3991b17790e691c9953cae7bd
working tree clean
```

## Objetivo

Cerrar la readiness authored de PAES_M2 / M2-C06 antes de cualquier implementacion. Esta fase define una especificacion pedagogica y tecnica suficientemente precisa para que una fase posterior pueda implementar la capsula con bajo riesgo.

Esta fase es documental/de especificacion. No cambia comportamiento de la app.

## Context Gate

Verificacion git segura ejecutada antes de editar:

```text
git status --short: clean
git rev-parse HEAD: 0e4c49fb799999c3991b17790e691c9953cae7bd
git log --oneline --decorate -n 5: baseline confirmado en HEAD, origin/main y origin/HEAD
```

Si el baseline no hubiera coincidido o el working tree no hubiera estado limpio, la fase se habria detenido sin editar.

## Alcance permitido/prohibido

Archivos permitidos para modificacion:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

Alcance prohibido respetado:

```text
No DB execution by Codex
No DB mutation by Codex
No LOCAL_DEV tooling execution by Codex
No scripts that read DB executed by Codex
No scripts that write DB executed by Codex
No prod/staging touched by Codex
No schema changes
No payment/subscription changes
No StudentAccess changes
No app code changes
No tooling changes
No UI changes
No asset changes
No implemented pedagogical capsule content changes
No implemented authoredFeedback changes
No executable registry entries created or edited
No seeds
No migrations
No Prisma DB commands
No SQL
No secrets printed
```

## Archivos leidos

```text
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C05_CLOSEOUT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C05_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C05_AUTHORED_IMPLEMENT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C05_STATIC_REVIEW_1.md
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md
nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md
```

Read-only source/context searches covered:

```text
M2-C06
Estadistica comparativa simple
tableStimulus
authoredFeedback
M2-C02 table registry pattern
M2-C03 table registry pattern
M2-C05 authored readiness / implementation / static review
paes_m2_simple_comparative_statistics_entry
```

No LOCAL_DEV tooling or DB-reading/DB-writing script was executed by Codex.

## Source context

Previous readiness identified M2-C06 as the next PAES_M2 candidate after M2-C05:

```text
program: PAES_M2
previous capsule: M2-C05
candidate next capsule: M2-C06
candidate title: Estadistica comparativa simple
source of truth: nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
readiness result: M2_C06_READINESS_PARTIAL_WITH_OBSERVATIONS
```

The seed plan classifies M2-C06 as statistics/data interpretation, with table stimulus required/supported, suggested 4 exercises, and the risk that tables can overload mobile. The readiness phase found no final contentKey, no registry entry, no final items and no authoredFeedback.

The canonical registry already supports `tableStimulus` and has prior PAES_M2 table-based examples, especially M2-C02 and M2-C03. This makes C06 feasible without new UI or assets if the implementation keeps data compact.

## Identity specification

Final proposed identity:

```text
Program: PAES_M2
Capsule: M2-C06
Final proposed title: PAES M2 - Estadistica comparativa simple
Visible correlative: M2-C06
Final proposed contentKey: paes_m2_simple_comparative_statistics_entry
Content version: v1
Content type: practice
Skill family: statistics/data interpretation
Exercise count target: 3
```

ContentKey rationale:

The current PAES_M2 registry convention uses English descriptor tokens plus the `_entry` suffix:

```text
paes_m2_modeling_expressions_functions_entry
paes_m2_data_probability_table_entry
paes_m2_functions_graph_behavior_entry
paes_m2_analytic_geometry_relations_entry
paes_m2_systems_restrictions_context_entry
```

Therefore the proposed final contentKey is `paes_m2_simple_comparative_statistics_entry`, preserving program prefix, English descriptor tokens, title meaning and `_entry` suffix. The implementation phase must validate uniqueness against the live registry before editing executable content.

## Pedagogical purpose

M2-C06 should train students to compare simple summarized data and justify a conclusion from visible evidence, without turning the capsule into a broad statistics unit.

Proposed purpose:

```text
Read a compact table or list, identify the relevant values, compare simple measures such as maximum, minimum, difference, range or average, and choose the conclusion best supported by the data.
```

The capsule should emphasize:

```text
- reading values from small summarized data;
- comparing two groups or short series;
- computing or interpreting a simple difference, range or average;
- answering from evidence in the table/list;
- avoiding denominator, average, range and "largest raw number" traps;
- keeping calculation load light and reviewable.
```

M2-C06 should not introduce graph reading, dispersion terminology beyond range, weighted averages, standard deviation, formal probability, or long multi-step statistical procedures.

## Assumed prerequisites

The implementation may assume the student can:

```text
- read a short table with headers;
- compare whole numbers;
- add and divide small totals for an average;
- subtract to find a difference or range;
- distinguish a value read from a table from a conclusion inferred from it;
- review feedback that references rows, columns or compact lists.
```

The capsule must not assume mastery of formal statistics, graph interpretation, weighted mean, percent change, boxplots or distribution theory.

## Table/mobile readability strategy

Readiness risk:

```text
M2-C06 is TABLE_REQUIRED_SUPPORTED and must manage compact table/mobile readability risk.
```

Resolution for first implementation:

```text
Primary strategy: use very compact tables or aligned lists with short labels and small numbers.
Fallback strategy: if a table would become wide, represent the data as a short list of category-value pairs.
```

Rules:

```text
- prefer 2 to 4 rows and 2 to 3 columns;
- avoid more than 4 data rows;
- avoid more than 3 value columns;
- avoid long text inside table cells;
- keep row labels short;
- include units in the stem or caption, not repeated in every cell;
- avoid tables that require horizontal comparison across many columns;
- avoid images, graphs, figures and external assets;
- every item must remain solvable if the table is represented as a compact list;
- feedback must reference the same row/column/value shown to the student.
```

Implementation decision by exercise:

```text
q1: compact two-column table preferred.
q2: compact list preferred because only one short series is needed.
q3: compact three-column table accepted, with 2 group rows and short headers.
```

Static review must verify active and completed views for legibility if implementation uses `tableStimulus`.

## Representation strategy

```text
Text contexts
Compact tables with headers when table reading is the assessed skill
Aligned lists or category-value pairs when a table would be visually wider than useful
Small whole numbers
Simple arithmetic only: subtraction, addition, division by 2 or 3 when needed
No images/assets/graphs/figures
No broad statistical notation
```

## Pedagogical restrictions

```text
M2 maximum: 4 exercises per capsule
M2-C06 target: 3 exercises
Feedback: brief visible feedback plus complete step-by-step authoredFeedback
Tone: clear, close, realistic and not grandiloquent
Claims: no PAES readiness, score, mastery, Sales-Ready, adaptive diagnosis or complete coverage claims
```

Three exercises are preferred over the seed-plan suggestion of 4 because the intended progression can be covered with less table load:

```text
1. Compare simple values from a compact table/list.
2. Calculate or interpret a simple difference/range/average.
3. Choose a valid conclusion comparing two groups or short series.
```

## Proposed exercise design

The following is an implementation-ready specification, not an executable registry change.

### Exercise 1

```text
Proposed exercise key: q1
Skill focus: compare values from a compact table
Representation: compact table, 4 rows and 2 columns
Table/mobile notes: short product labels; one numeric value column; no wide table
```

Prompt:

```text
La tabla muestra la cantidad de colaciones vendidas en un kiosco durante una manana. Segun la tabla, cual colacion tuvo la mayor venta?
```

Data representation:

```text
Caption: Colaciones vendidas
Headers: Colacion | Cantidad vendida
Rows:
Barra de cereal | 18
Yogur | 24
Fruta | 21
Sandwich | 15
```

Options:

```text
A. Barra de cereal
B. Yogur
C. Fruta
D. Sandwich
```

Correct answer:

```text
B
```

Expected reasoning:

```text
Read the value for each colacion and compare 18, 24, 21 and 15. The greatest value is 24, corresponding to Yogur.
```

Brief feedback:

```text
La mayor cantidad es 24, y en la tabla corresponde a Yogur.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for the category with the highest value.
2. Read each table value: 18, 24, 21 and 15.
3. Compare the values and identify 24 as the maximum.
4. Connect 24 back to its row: Yogur.
5. Explain why the other options are lower values.
6. Recommendation: compare the numbers first and then return to the row label.
7. Connection: this prepares later comparisons that require a calculation before concluding.
```

Common misconception addressed:

```text
Choosing a familiar category or a nearby row instead of comparing all numeric values.
```

### Exercise 2

```text
Proposed exercise key: q2
Skill focus: calculate and interpret a simple range
Representation: compact list preferred; table optional
Table/mobile notes: a list avoids a table for a single short series and is easier on mobile
```

Prompt:

```text
Un grupo registro la temperatura a mediodia durante cuatro dias:

Lunes: 18 grados
Martes: 22 grados
Miercoles: 20 grados
Jueves: 25 grados

Cual es el rango de temperaturas registradas?
```

Options:

```text
A. 3 grados
B. 5 grados
C. 7 grados
D. 85 grados
```

Correct answer:

```text
C
```

Expected reasoning:

```text
Identify the maximum temperature, 25, and the minimum temperature, 18. Compute range = 25 - 18 = 7.
```

Brief feedback:

```text
El rango se obtiene restando el menor valor al mayor: 25 - 18 = 7 grados.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for the range.
2. Explain that range is greatest value minus smallest value.
3. Read the greatest value from the list: 25.
4. Read the smallest value from the list: 18.
5. Compute 25 - 18 = 7.
6. Justify option C.
7. Explain common distractors: 3 compares only two nearby days, 5 uses 25 - 20, and 85 is the total, not the range.
8. Recommendation: for range, do not add all values; first find maximum and minimum.
9. Connection: this prepares comparing how spread out two small data groups are.
```

Common misconception addressed:

```text
Adding all values or comparing only consecutive values instead of using maximum minus minimum.
```

### Exercise 3

```text
Proposed exercise key: q3
Skill focus: choose a valid conclusion comparing two groups
Representation: compact table, 2 rows and 3 value columns
Table/mobile notes: two group rows, short headers, small values; no graph required
```

Prompt:

```text
Dos cursos respondieron tres preguntas de practica. La tabla muestra cuantas respuestas correctas tuvo cada curso en cada pregunta.

Cual conclusion esta mejor apoyada por los datos?
```

Data representation:

```text
Caption: Respuestas correctas por pregunta
Headers: Curso | P1 | P2 | P3
Rows:
Curso A | 12 | 14 | 10
Curso B | 10 | 15 | 11
```

Options:

```text
A. El Curso A tuvo mas correctas en todas las preguntas.
B. El Curso B tuvo mas correctas en todas las preguntas.
C. El Curso A tuvo mayor total de correctas: 36 contra 36.
D. Los cursos tuvieron el mismo total de correctas, aunque no ganaron las mismas preguntas.
```

Correct answer:

```text
D
```

Expected reasoning:

```text
Compute totals: Curso A = 12 + 14 + 10 = 36; Curso B = 10 + 15 + 11 = 36. They tie in total. A is higher in P1 only, B is higher in P2 and P3, so neither course is higher in all questions.
```

Brief feedback:

```text
Ambos cursos suman 36 correctas; la conclusion valida es que empatan en total, aunque difieren por pregunta.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for a conclusion supported by the table.
2. Read the three values for Curso A and add them: 12 + 14 + 10 = 36.
3. Read the three values for Curso B and add them: 10 + 15 + 11 = 36.
4. Compare totals and identify a tie.
5. Compare question by question: A is higher in P1; B is higher in P2 and P3.
6. Justify option D.
7. Explain why A and B are false because neither course is higher in all questions.
8. Explain why C is plausible but internally incorrect: it says "mayor total" even though both totals are 36.
9. Recommendation: when a conclusion uses words like "todas" or "mayor total", check that exact claim.
10. Connection: this supports later interpretation of statistical conclusions from compact evidence.
```

Common misconception addressed:

```text
Accepting a conclusion with correct arithmetic but wrong comparative language, such as "mayor" when the totals are equal.
```

## AuthoredFeedback readiness

The future implementation must include `authoredFeedback` for every item with:

```text
briefId
completeId
version
brief
complete
```

Recommended ID pattern:

```text
paes_m2_simple_comparative_statistics_entry_q1_brief_v1
paes_m2_simple_comparative_statistics_entry_q1_complete_v1
paes_m2_simple_comparative_statistics_entry_q2_brief_v1
paes_m2_simple_comparative_statistics_entry_q2_complete_v1
paes_m2_simple_comparative_statistics_entry_q3_brief_v1
paes_m2_simple_comparative_statistics_entry_q3_complete_v1
```

Expected feedback version:

```text
m2-c06-authored-feedback-v1
```

Every complete feedback must:

```text
- restate what the item asks;
- identify where each relevant value is read;
- perform the calculation if applicable;
- justify why the correct option is correct;
- explain plausible distractors and the exact reading/comparison/calculation error;
- include a short recommendation;
- connect the item to the next comparison/data interpretation skill.
```

## Technical implementation expectations

Future implementation should:

```text
- add a visible correlative mapping for paes_m2_simple_comparative_statistics_entry -> M2-C06;
- add one PAES_M2 StudyLoadContent registry entry using the existing static pattern;
- use contentVersion v1;
- use contentType practice;
- use skillFamily statistics/data interpretation;
- use exactly 3 multiple-choice items unless a later phase documents a fourth as necessary;
- use options A-D;
- include correctOptionKey for every item;
- include authoredFeedback for every item;
- use tableStimulus only where it improves readability;
- avoid assets, images, graphs, figures and new UI;
- keep table/list data readable in active and completed views.
```

Suggested implementation title:

```text
PAES M2 - Estadistica comparativa simple
```

The implementation phase may use the registry title punctuation style already present in the file, but should preserve the student-facing title and visible correlative.

## Quality and acceptance criteria

Implementation should pass only if:

```text
- M2-C06 has exactly 3 exercises unless a documented reason adds a fourth;
- exercise count remains <= 4;
- no images/assets/graphs/figures are required;
- each table has short headers and compact row/column count;
- every item can be solved from visible table/list data;
- every item has one unequivocal correct answer;
- each distractor maps to a specific reading, comparison, range, average or conclusion error;
- each item has brief and complete authoredFeedback;
- complete feedback references the same values shown in the stimulus;
- no TODO, placeholder, lorem, pendiente or generic feedback remains;
- no PAES score/readiness/mastery/Sales-Ready/adaptive diagnosis claims appear;
- no DB/schema/UI/tooling/payment/subscription/StudentAccess changes are bundled.
```

Static review must verify:

```text
answer correctness
table/list legibility
mobile readability risk
contentKey uniqueness
visible correlative mapping
feedback quality and value references
absence of placeholder text
absence of unsupported graph/image/asset dependency
continuity with M2-C01 through M2-C05
```

## Risks and decisions

Table/mobile readability risk and mitigation:

```text
Risk: a wide or dense table can become hard to read on mobile and can make feedback hard to inspect.
Mitigation: use 3 exercises, compact tables only, short labels, at most 4 rows and 3 value columns, and list representation when a full table is unnecessary.
```

Avoiding overload:

```text
The seed plan suggests 4 exercises, but this authored readiness selects 3 because maximum/minimum comparison, range calculation and two-group conclusion checking cover the core skill without making the capsule table-heavy.
```

ContentKey validation:

```text
The proposed contentKey follows current PAES_M2 naming convention, but the implementation phase must validate it against the live registry before editing executable content.
```

Static review focus:

```text
- verify all arithmetic: maximum, range and totals;
- verify tableStimulus renders compactly;
- verify feedback references only visible data;
- verify option C in q3 is intentionally plausible but wrong because "mayor total" contradicts equal totals;
- verify there are no hidden graph/asset dependencies.
```

Table vs list decision:

```text
q1 should use a real compact table because table reading is directly assessed.
q2 should use a compact list because a one-series table would add layout burden without improving the skill signal.
q3 should use a compact table because comparing two groups across three questions is clearer with aligned rows and columns.
```

## Explicit non-changes

```text
DB execution by Codex: NOT_EXECUTED_BY_CODEX
DB mutation by Codex: NOT_MUTATED_BY_CODEX
Code changes: NOT_PERFORMED
Tooling changes: NOT_PERFORMED
Schema changes: NOT_PERFORMED
UI changes: NOT_PERFORMED
Asset changes: NOT_PERFORMED
Implemented pedagogical capsule content changes: NOT_PERFORMED
Implemented authoredFeedback changes: NOT_PERFORMED
Payment/subscription changes: NOT_PERFORMED
StudentAccess changes: NOT_PERFORMED
```

Additional non-actions:

```text
No executable registry entry created.
No seed changed.
No final implemented authoredFeedback changed.
No StudyLoad created or modified.
No LOCAL_DEV alignment attempted.
No human UI smoke attempted.
No prod/staging action.
No secrets printed.
```

## Recommended next phase

```text
MVP-CONTENT-PAES-M2-C06-AUTHORED-IMPLEMENT-1
```

Rationale:

The authored readiness contract is sufficiently defined for conservative implementation. The next phase should implement only the versioned static content and documentation explicitly authorized for M2-C06, followed by static review.

## Validation

Validation executed after documentation:

```text
git diff --check
secret-pattern scan over modified documentation files
```

Results:

```text
git diff --check: passed
secret-pattern scan: passed
```

No build, TypeScript check, DB command, browser automation or app execution was required because this phase modified documentation only.

## Security notes

No `.env` values, database URLs, DB hosts, connection strings, tokens, cookies, secrets, private keys, credentials or passwords were requested or printed.

## Result

```text
M2_C06_AUTHORED_READINESS_OK
```

## Follow-up/blocker

```text
MVP-CONTENT-PAES-M2-C06-AUTHORED-IMPLEMENT-1
```
