# MVP-CONTENT-PAES-M2-C04-AUTHORED-READINESS-1

## Phase name

```text
MVP-CONTENT-PAES-M2-C04-AUTHORED-READINESS-1
```

## Baseline inicial

```text
HEAD = origin/main = origin/HEAD = 2e5ae830bd7e189b95a83bae870e5d29552b1ccb
working tree clean
```

## Objetivo

Cerrar la readiness authored de PAES_M2 / M2-C04 antes de cualquier implementacion. Esta fase define una especificacion pedagogica y tecnica suficientemente precisa para que una fase posterior pueda implementar la capsula con bajo riesgo.

Esta fase es documental/de especificacion. No cambia comportamiento de la app.

## Context Gate

Verificacion git segura ejecutada antes de editar:

```text
git status --short: clean
git rev-parse HEAD: 2e5ae830bd7e189b95a83bae870e5d29552b1ccb
git log --oneline --decorate -n 5: baseline confirmado en HEAD, origin/main y origin/HEAD
```

Si el baseline no hubiera coincidido o el working tree no hubiera estado limpio, la fase se habria detenido sin editar.

## Alcance permitido/prohibido

Archivos permitidos para modificacion:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

Alcance prohibido respetado:

```text
No DB execution by Codex
No DB mutation by Codex
No prod/staging
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
No scripts that read/write DB
No secrets printed
```

## Files read

```text
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C03_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C03_AUTHORED_IMPLEMENT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C02_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C02_AUTHORED_IMPLEMENT_1.md
nextjs_space/lib/study-load-content.ts
```

Read-only searches covered:

```text
paes_m2_
M2-C04
M2_C04
authoredFeedback
briefId
completeId
correctOptionKey
contentKey
tableStimulus
```

## Source context

Previous readiness identified M2-C04 as the next PAES_M2 candidate after M2-C03:

```text
program: PAES_M2
previous capsule: M2-C03
candidate next capsule: M2-C04
candidate title: Geometria analitica y relaciones
source of truth: nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
readiness result: M2_C04_READINESS_PARTIAL_WITH_OBSERVATIONS
```

The seed plan classifies M2-C04 as geometry/coordinate reasoning with suggested 3 exercises and warns that figure ambiguity or not-to-scale reasoning is the main risk. The readiness phase found no implemented contentKey, no registry entry, no final exercises and no authoredFeedback.

## Identity specification

Final proposed identity:

```text
Program: PAES_M2
Capsule: M2-C04
Final proposed title: PAES M2 - Geometria analitica y relaciones
Visible correlative: M2-C04
Final proposed contentKey: paes_m2_analytic_geometry_relations_entry
Content version: v1
Content type: practice
Skill family: geometry/coordinate reasoning
Exercise count target: 3
```

ContentKey rationale:

The prompt suggested `paes_m2_geometria_analitica_relaciones`. The current PAES_M2 registry convention uses English descriptor tokens plus the `_entry` suffix:

```text
paes_m2_modeling_expressions_functions_entry
paes_m2_data_probability_table_entry
paes_m2_functions_graph_behavior_entry
```

Therefore the proposed final contentKey is `paes_m2_analytic_geometry_relations_entry`, preserving program prefix, descriptive English tokens and `_entry` suffix. The implementation phase should validate this against the live registry before editing executable content.

## Pedagogical purpose

M2-C04 should introduce analytic geometry and coordinate relations in a controlled, text-first PAES_M2 capsule. The capsule should train students to read ordered pairs, compare horizontal and vertical variation, interpret simple distance or slope-like relations, and decide which relation fits a short context.

The capsule should continue M2-C03 by transferring function/representation discipline into coordinate reasoning. It should not depend on a drawn figure, external image asset, generated visual stimulus, or not-to-scale diagram.

Proposed purpose:

```text
Use coordinates and simple relationships between points to interpret horizontal/vertical variation, distance in one direction, and pendiente as a relation between changes, without requiring a visual figure.
```

## Assumed prerequisites

The implementation may assume the student has completed the prior PAES_M2 capsule flow:

```text
M2-C01: modelacion con expresiones y funciones
M2-C02: analisis de datos y probabilidad en tabla
M2-C03: funciones y comportamiento grafico inicial
```

Specific knowledge assumptions:

```text
- Reads ordered pairs as (x, y).
- Distinguishes input/position x from output/height y.
- Can compare two numbers and simple differences.
- Can compute a simple change such as 7 - 3.
- Has seen function/representation reasoning in M2-C03.
```

The capsule must not assume mastery of formal analytic geometry formulas beyond simple coordinate differences. If slope is used, it must be framed as `cambio vertical / cambio horizontal` and kept to small integers.

## Representation strategy

M2-C04 should avoid new assets and avoid required figures.

Allowed representation path:

```text
- ordered pairs such as A(2, 3) and B(6, 3);
- compact tables with columns Point, x, y;
- textual descriptions of a coordinate plane;
- simple horizontal/vertical movements described in words;
- slope as a ratio of coordinate changes when numbers are small.
```

Disallowed for initial implementation unless a separate visual dependency phase authorizes it:

```text
- external images;
- generated geometry figures;
- new SVG/asset files;
- not-to-scale diagrams required for solving;
- graph/figure reading where the answer depends on visual proportion;
- complex LaTeX or notation that the existing UI may not render clearly.
```

This choice resolves the previous C04 blocker by making the first implementation text/coordinate-based, not figure-dependent.

## Pedagogical restrictions

```text
M2 maximum: 4 exercises per capsule
M2-C04 target: 3 exercises
Feedback: brief visible feedback plus complete step-by-step authoredFeedback
Tone: close, clear, sober, not grandiloquent
Claims: no PAES readiness, score, mastery, Sales-Ready, adaptive diagnosis or complete coverage claims
```

Three exercises are preferred here because the seed plan recommended 3 and the scope can be covered without overloading a first coordinate-reasoning capsule.

## Proposed exercise design

The following is an implementation-ready specification, not an executable registry change.

### Exercise 1

```text
Proposed exercise key: q1
Skill focus: reading ordered pairs and horizontal/vertical variation
Representation: ordered pairs only
```

Prompt:

```text
En un plano cartesiano se ubican los puntos A(2, 3) y B(6, 3). Sin usar una figura, que relacion describe correctamente el cambio desde A hasta B?
```

Options:

```text
A. Se avanza 4 unidades horizontalmente y no cambia la coordenada y.
B. Se avanza 4 unidades verticalmente y no cambia la coordenada x.
C. Se avanza 2 unidades horizontalmente y 3 verticalmente.
D. No hay cambio porque ambos puntos tienen coordenada y = 3.
```

Correct answer:

```text
A
```

Expected reasoning:

```text
Compare x: 6 - 2 = 4. Compare y: 3 - 3 = 0. The movement is horizontal by 4 units.
```

Brief feedback:

```text
Compara coordenada por coordenada: x cambia de 2 a 6 y la coordenada y se mantiene en 3.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for the change from A to B.
2. Identify A(2, 3): x = 2, y = 3.
3. Identify B(6, 3): x = 6, y = 3.
4. Compute horizontal change: 6 - 2 = 4.
5. Compute vertical change: 3 - 3 = 0.
6. Justify option A.
7. Explain why B swaps horizontal/vertical, why C reads coordinates as changes, and why D ignores the horizontal change.
8. Recommendation: compare x and y separately before deciding.
```

Common misconception addressed:

```text
Confusing a coordinate value with a coordinate change, or thinking equal y values mean the points are the same.
```

### Exercise 2

```text
Proposed exercise key: q2
Skill focus: simple slope as relation between vertical and horizontal change
Representation: two ordered pairs and a short ratio
```

Prompt:

```text
Una recta pasa por P(1, 2) y Q(5, 10). Si se interpreta la pendiente como cambio vertical dividido por cambio horizontal, cual es la pendiente de la recta?
```

Options:

```text
A. 1/2
B. 2
C. 4
D. 8
```

Correct answer:

```text
B
```

Expected reasoning:

```text
Horizontal change: 5 - 1 = 4. Vertical change: 10 - 2 = 8. Pendiente = 8 / 4 = 2.
```

Brief feedback:

```text
La pendiente compara cambio vertical con cambio horizontal: 8 dividido por 4 da 2.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for pendiente from two points.
2. Identify horizontal change using x-values: 5 - 1 = 4.
3. Identify vertical change using y-values: 10 - 2 = 8.
4. Compute pendiente = 8 / 4 = 2.
5. Justify option B.
6. Explain why A inverts the ratio, why C uses only horizontal change, and why D uses only vertical change.
7. Recommendation: write "vertical / horizontal" before substituting numbers.
8. Connection: this prepares reading growth rates in coordinate or function contexts.
```

Common misconception addressed:

```text
Inverting the slope ratio or using only one coordinate difference as the answer.
```

### Exercise 3

```text
Proposed exercise key: q3
Skill focus: contextual coordinate relation and decision
Representation: table of points, no image
```

Prompt:

```text
La tabla muestra la posicion de una persona que camina en linea recta dentro de una plaza. La coordenada x indica metros hacia el este y la coordenada y indica metros hacia el norte.

Punto | x | y
Inicio | 1 | 2
Final | 7 | 5

Cual interpretacion describe mejor el desplazamiento desde Inicio hasta Final?
```

Options:

```text
A. Avanza 6 metros hacia el este y 3 metros hacia el norte.
B. Avanza 3 metros hacia el este y 6 metros hacia el norte.
C. Avanza 7 metros hacia el este y 5 metros hacia el norte.
D. Avanza 1 metro hacia el este y 2 metros hacia el norte.
```

Correct answer:

```text
A
```

Expected reasoning:

```text
x changes from 1 to 7, so east movement is 6. y changes from 2 to 5, so north movement is 3.
```

Brief feedback:

```text
El desplazamiento se calcula con diferencias: 7 - 1 = 6 hacia el este y 5 - 2 = 3 hacia el norte.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for displacement, not final coordinates.
2. Identify initial coordinates (1, 2).
3. Identify final coordinates (7, 5).
4. Compute east/horizontal change: 7 - 1 = 6.
5. Compute north/vertical change: 5 - 2 = 3.
6. Justify option A.
7. Explain why B swaps the changes, why C reports final coordinates, and why D reports initial coordinates.
8. Recommendation: when a question asks "desde ... hasta ...", subtract initial from final.
9. Connection: this uses coordinate differences to interpret a real movement.
```

Common misconception addressed:

```text
Reporting coordinates as if they were displacement, or swapping horizontal and vertical directions.
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
paes_m2_analytic_geometry_relations_entry_q1_brief_v1
paes_m2_analytic_geometry_relations_entry_q1_complete_v1
paes_m2_analytic_geometry_relations_entry_q2_brief_v1
paes_m2_analytic_geometry_relations_entry_q2_complete_v1
paes_m2_analytic_geometry_relations_entry_q3_brief_v1
paes_m2_analytic_geometry_relations_entry_q3_complete_v1
```

Expected feedback version:

```text
m2-c04-authored-feedback-v1
```

Every complete feedback must:

```text
- restate what the item asks;
- identify the relevant coordinate data;
- separate horizontal and vertical change;
- solve step by step;
- justify the correct option;
- explain plausible distractors;
- include a short recommendation;
- connect the item to coordinate relations or the next representation skill.
```

## Technical implementation expectations

Future implementation should:

```text
- add a visible correlative mapping for paes_m2_analytic_geometry_relations_entry -> M2-C04;
- add one PAES_M2 StudyLoadContent registry entry using the existing static pattern;
- use contentVersion v1;
- use contentType practice;
- use skillFamily geometry/coordinate reasoning;
- use 3 multiple-choice items;
- use options A-D;
- include correctOptionKey for every item;
- include authoredFeedback for every item;
- avoid assets and new UI;
- avoid table/image dependencies unless the existing tableStimulus path is used safely for q3 or q3 is implemented as plain text.
```

Suggested implementation title:

```text
PAES M2 - Geometria analitica y relaciones
```

The implementation phase may adjust punctuation to match surrounding registry display titles, but should preserve the capsule name and visible correlative.

## Quality and acceptance criteria

Implementation should pass only if:

```text
- M2-C04 has exactly 3 exercises unless a documented reason adds a fourth;
- exercise count remains <= 4;
- no images/assets are required;
- no unsupported graph/figure dependency exists;
- all coordinate data are readable in plain text/mobile view;
- each item has one unequivocal correct answer;
- distractors are plausible and map to common errors;
- each item has brief and complete authoredFeedback;
- complete feedback is step-by-step and useful for autonomous review;
- no TODO, placeholder, lorem, pendiente or generic feedback remains;
- no PAES score/readiness/mastery/Sales-Ready/adaptive diagnosis claims appear;
- no DB/schema/UI/tooling/payment/subscription/StudentAccess changes are bundled.
```

## Risks and decisions

How this spec avoids figure/assets dependency:

```text
It uses ordered pairs, coordinate differences, simple ratios and one small textual/table representation. No solution depends on a drawn figure.
```

How it avoids overload:

```text
It uses 3 exercises, small integers, and one idea per item: coordinate change, slope relation, contextual displacement.
```

ContentKey validation:

```text
The proposed contentKey follows current PAES_M2 naming convention, but the implementation phase must validate it against the live registry before editing executable content.
```

Tension between geometry and relations:

```text
"Geometria analitica" can easily drift into figure-heavy or formula-heavy content. This contract constrains "relaciones" to coordinate differences and slope-like comparison so the first C04 implementation remains text-first and smokeable.
```

## Explicit non-changes

```text
DB execution by Codex: NOT_EXECUTED_BY_CODEX
DB mutation by Codex: NOT_EXECUTED_BY_CODEX
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
MVP-CONTENT-PAES-M2-C04-AUTHORED-IMPLEMENT-1
```

Rationale:

The authored readiness contract is now sufficiently defined for conservative implementation. The next phase should implement only the versioned static content and documentation explicitly authorized for M2-C04, followed by static review.

## Validation

```text
git diff --check: passed
secret-pattern scan over modified documentation files: passed
```

No build, TypeScript check, DB command, browser automation or app execution was required because this phase modified documentation only.

## Security notes

No `.env` values, database URLs, DB hosts, connection strings, tokens, cookies, secrets, private keys, credentials or passwords were requested or printed.

## Result

```text
M2_C04_AUTHORED_READINESS_OK
```

## Follow-up/blocker

```text
MVP-CONTENT-PAES-M2-C04-AUTHORED-IMPLEMENT-1
```
