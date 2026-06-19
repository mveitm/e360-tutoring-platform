# MVP-CONTENT-PAES-M2-C07-AUTHORED-READINESS-RETRY-1

## Phase name

```text
MVP-CONTENT-PAES-M2-C07-AUTHORED-READINESS-RETRY-1
```

## Baseline inicial

```text
HEAD = origin/main = origin/HEAD = 7f5c34dbc24c1d2aaf04370eb5f49ff108d89386
working tree clean
```

## Objetivo

Reintentar y cerrar la readiness authored de PAES_M2 / M2-C07 incorporando la decision tecnica de figuras PAES ya tomada.

This phase is documentation/specification only. It does not change app behavior.

## Context Gate

Verificacion git segura ejecutada antes de editar:

```text
git status --short: clean
git rev-parse HEAD: 7f5c34dbc24c1d2aaf04370eb5f49ff108d89386
git log --oneline --decorate -n 5: baseline confirmado en HEAD, origin/main y origin/HEAD
```

If the baseline had not matched or the working tree had not been clean, the phase would have stopped without editing.

## Alcance permitido/prohibido

Files allowed for modification:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_AUTHORED_READINESS_RETRY_1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

Forbidden scope respected:

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
No new assets
No renderer implemented
No SVG implemented
No figure system implemented
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
nextjs_space/docs/operations/MVP_GOV_PAES_GEOMETRY_FIGURE_TECHNICAL_DECISION_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_FIGURESPEC_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C06_CLOSEOUT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_AUTHORED_IMPLEMENT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_STATIC_REVIEW_1.md
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

No LOCAL_DEV tooling, DB-reading script or DB-writing script was executed by Codex.

## Source context

Prior C07 readiness result:

```text
M2_C07_READINESS_PARTIAL_WITH_OBSERVATIONS
```

Prior C07 authored readiness result:

```text
M2_C07_AUTHORED_READINESS_PARTIAL_WITH_OBSERVATIONS
```

Prior C07 FigureSpec readiness result:

```text
M2_C07_FIGURESPEC_BLOCKED_NEEDS_TECHNICAL_DECISION
```

Accepted technical decision:

```text
PAES_GEOMETRY_FIGURE_TECHNICAL_DECISION_READY
Hybrid: immediate text/table fallback + future parametric figure strategy
```

The technical decision authorizes an immediate M2-C07 bridge only if the authored contract is honest: structured text/table geometry now, no claim that a rendered figure is shown, no assets, no SVG, no renderer, no UI/schema/runtime change, and future parametric figure work remains separate.

## Identity specification

Final proposed identity:

```text
Program: PAES_M2
Capsule: M2-C07
Final proposed title: PAES M2 - Geometria con figura compuesta
Visible correlative: M2-C07
Final proposed contentKey: paes_m2_composite_geometry_figures_entry
Content version: v1
Content type: practice
Skill family: geometry/figures bridge
Exercise count: 3
Representation strategy: structured text + compact table/list geometry bridge; no rendered figure claim
```

ContentKey rationale:

The prior authored readiness proposed `paes_m2_composite_geometry_figures_entry`, matching the current PAES_M2 convention:

```text
paes_m2_<english_descriptor>_entry
```

The implementation phase must still validate contentKey uniqueness against the live registry before editing executable content.

## Pedagogical purpose

M2-C07 introduces composite-geometry reasoning through explicit descriptions of parts, dimensions and relations, without requiring a visual renderer.

Purpose:

```text
Use a structured geometric description or compact table to identify relevant parts, compute simple area or perimeter relationships, and choose a conclusion supported by visible dimensions and stated relations.
```

The capsule should emphasize:

```text
- decomposing a composite shape into familiar rectangular parts;
- reading dimensions from explicit text/table rows;
- distinguishing area from perimeter;
- recognizing internal/shared sides when perimeter is requested;
- avoiding guesses from imagined proportions;
- keeping calculations small, visible and auditable.
```

The capsule should not claim to assess final visual-figure reading. It is a bridge-compatible geometry capsule until future PAES figure support exists.

## M2-C07 visual strategy

Immediate fallback:

```text
Structured text plus compact table/list representations.
```

What students see:

```text
Stems that say "La descripcion geometrica indica..." or "La tabla de partes indica..."
Compact tableStimulus where it helps align part names, dimensions and relations.
Short text/list descriptions where a table would be heavier.
Options and feedback that refer only to visible text/table values and explicit relations.
```

How ambiguity is avoided:

```text
No "observa la figura", "la figura muestra" or "segun la figura" wording.
All adjacency, no-overlap, shared-side, internal-side and partition relations are stated directly.
All dimensions needed for solving are visible in the stem or table.
No item relies on scale, drawing proportions, hidden labels or visual inference.
```

Why no renderer/SVG/assets are needed now:

```text
The selected bridge narrows the immediate skill to geometry reasoning from explicit structured descriptions.
The current StudyLoad registry already supports plain text, options, authoredFeedback and tableStimulus.
No new UI/schema/runtime path is required to show the needed data.
```

Future figure work out of scope:

```text
No deterministic SVG/template renderer.
No VisualStimulusSpec field in code.
No static asset bank.
No geometryFigureStimulus shape.
No human/QA approval workflow for rendered figures.
```

Future PAES figure strategy remains separate and should prefer deterministic parametric SVG/template support with QA approval.

## Pedagogical restrictions

```text
M2 maximum: 4 exercises per capsule
M2-C07 target: 3 exercises
Feedback: brief visible feedback plus complete step-by-step authoredFeedback
Tone: clear, close, realistic and not grandiloquent
Claims: no PAES readiness, score, mastery, Sales-Ready, adaptive diagnosis or complete coverage claims
```

Three exercises are sufficient because they cover area decomposition, exterior perimeter with an internal shared side, and a supported conclusion from partitioned rectangles without overloading the student.

## Proposed exercise design

The following is a pedagogical specification for a later implementation phase. It is not an executable registry change.

### Exercise 1

```text
Proposed exercise key: q1
Skill focus: decompose total area into two non-overlapping rectangular parts
Representation: compact tableStimulus bridge
```

Prompt:

```text
La tabla de partes describe una forma compuesta por dos rectangulos unidos sin superponerse. Segun esas medidas, cual es el area total?
```

Representation / fallback text:

```text
caption: Partes de la forma compuesta
headers: Parte | Medidas | Relacion
rows:
- Rectangulo A | 6 cm por 4 cm | parte principal
- Rectangulo B | 3 cm por 2 cm | unido a A sin superponerse
```

Options:

```text
A. 24 cm2
B. 30 cm2
C. 36 cm2
D. 48 cm2
```

Correct answer:

```text
B
```

Expected reasoning:

```text
Area A = 6 * 4 = 24. Area B = 3 * 2 = 6. Como las partes no se superponen, el area total es 24 + 6 = 30 cm2.
```

Brief feedback:

```text
Suma las areas de las dos partes: 6 * 4 = 24 y 3 * 2 = 6; como no se superponen, el total es 30 cm2.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for total area.
2. Read Rectangulo A: 6 cm por 4 cm.
3. Compute 6 * 4 = 24.
4. Read Rectangulo B: 3 cm por 2 cm.
5. Compute 3 * 2 = 6.
6. Use the stated relation "unido a A sin superponerse" to add areas.
7. Add 24 + 6 = 30 and justify option B.
8. Explain distractors: A uses only A; C likely combines visible numbers without matching rectangles; D multiplies unrelated dimensions or overcounts.
9. Recommendation: separate each rectangular part before adding areas.
10. Connection: prepares perimeter reasoning, where shared/internal borders are handled differently.
```

Common misconception addressed:

```text
Using only the largest part, or multiplying dimensions that do not belong to the same rectangle.
```

Implementation/readability notes:

```text
Use a 2-row x 3-column table with short cells. Do not mention a visible figure. Feedback must reference only the visible table values.
```

### Exercise 2

```text
Proposed exercise key: q2
Skill focus: distinguish exterior perimeter from area and remove an internal shared side
Representation: compact text/list bridge
```

Prompt:

```text
La descripcion geometrica indica lo siguiente:

- Hay un rectangulo de 8 cm por 5 cm.
- A un costado se une un cuadrado de 3 cm de lado.
- El lado de contacto mide 3 cm y queda por dentro, por lo tanto no forma parte del borde exterior.

Cual expresion calcula el perimetro exterior?
```

Options:

```text
A. 2 * (8 + 5) + 4 * 3
B. 2 * (8 + 5) + 4 * 3 - 2 * 3
C. 8 * 5 + 3 * 3
D. 8 + 5 + 3
```

Correct answer:

```text
B
```

Expected reasoning:

```text
If the rectangle and square perimeters are added separately, the 3 cm shared side is counted twice. Since that side is internal, subtract 2 * 3.
```

Brief feedback:

```text
El lado compartido queda dentro de la forma, por eso se resta dos veces: una por cada perimetro que lo contaba.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for exterior perimeter, not area.
2. Read the rectangle dimensions: 8 cm and 5 cm.
3. Read the square side: 3 cm.
4. Identify the explicit relation: the 3 cm contact side is internal.
5. Explain that adding perimeters separately counts the internal side twice.
6. Subtract 2 * 3 to remove both counts.
7. Justify option B.
8. Explain distractors: A keeps the internal side; C computes area; D only adds some visible labels.
9. Recommendation: in perimeter tasks, track which segments are on the outside border.
10. Connection: prepares comparison of regions and conclusions from explicit geometric data.
```

Common misconception addressed:

```text
Counting an internal side as part of the exterior perimeter, or confusing perimeter with area.
```

Implementation/readability notes:

```text
Use a short bullet list in the stem instead of a table to avoid density. Do not claim a figure is shown.
```

### Exercise 3

```text
Proposed exercise key: q3
Skill focus: choose a valid conclusion by comparing two rectangular zones
Representation: compact tableStimulus bridge
```

Prompt:

```text
La tabla describe un patio rectangular dividido en dos zonas. Ambas zonas tienen el mismo ancho y no se superponen. Cual conclusion esta mejor apoyada por los datos?
```

Representation / fallback text:

```text
caption: Zonas del patio
headers: Zona | Ancho | Alto
rows:
- Pasto | 10 m | 4 m
- Juegos | 10 m | 2 m
```

Options:

```text
A. La zona de juegos tiene mayor area que la zona de pasto.
B. La zona de pasto mide el doble de area que la zona de juegos.
C. Ambas zonas tienen la misma area.
D. El area total es 16 m2.
```

Correct answer:

```text
B
```

Expected reasoning:

```text
Pasto = 10 * 4 = 40 m2. Juegos = 10 * 2 = 20 m2. Since 40 is double 20, the supported conclusion is option B.
```

Brief feedback:

```text
Pasto mide 10 * 4 = 40 m2 y Juegos mide 10 * 2 = 20 m2; 40 es el doble de 20.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for a conclusion supported by the data.
2. Read Pasto: ancho 10 m and alto 4 m.
3. Compute 10 * 4 = 40 m2.
4. Read Juegos: ancho 10 m and alto 2 m.
5. Compute 10 * 2 = 20 m2.
6. Compare 40 and 20 and identify the double relationship.
7. Justify option B.
8. Explain distractors: A reverses the comparison; C ignores different heights; D adds visible numbers instead of computing area.
9. Recommendation: when comparing areas, compute both areas before choosing a conclusion.
10. Connection: prepares later visual figure work where the same relationships may be read from a rendered diagram.
```

Common misconception addressed:

```text
Judging by impression, adding dimensions, or ignoring that both zones share the same width but have different heights.
```

Implementation/readability notes:

```text
Use a 2-row x 3-column table with short labels. The stem states same width and no overlap explicitly; the table gives visible dimensions.
```

## AuthoredFeedback readiness

Future implementation must include authoredFeedback for each item:

```text
briefId
completeId
version
brief
complete
```

Recommended ID pattern:

```text
paes_m2_composite_geometry_figures_entry_q1_brief_v1
paes_m2_composite_geometry_figures_entry_q1_complete_v1
paes_m2_composite_geometry_figures_entry_q2_brief_v1
paes_m2_composite_geometry_figures_entry_q2_complete_v1
paes_m2_composite_geometry_figures_entry_q3_brief_v1
paes_m2_composite_geometry_figures_entry_q3_complete_v1
```

Expected feedback version:

```text
m2-c07-authored-feedback-v1
```

Every complete feedback must:

```text
- restate what was asked;
- identify where each datum/condition/relation is read;
- compute area/perimeter/conclusion step by step;
- justify the correct option;
- explain why plausible distractors fail;
- include a short recommendation;
- connect to the next geometry reasoning skill;
- never reference a rendered figure, image, SVG, asset or absent visual stimulus.
```

## Risks and decisions

Representation risk:

```text
The bridge does not assess final visual figure reading.
```

Mitigation:

```text
State in implementation and static review that M2-C07 is a structured geometry bridge. Use no wording that claims a figure is shown. Preserve future visual-system debt.
```

Spatial ambiguity risk:

```text
Without a figure, relations such as no-overlap or internal side could be missed.
```

Mitigation:

```text
State relations directly in the stem/table. Feedback must point back to those statements before calculating.
```

Overload risk:

```text
Geometry wording can become dense if it tries to replace a figure.
```

Mitigation:

```text
Use exactly 3 exercises, small whole-number dimensions, at most two geometric parts per item, short table/list cells and no extra geometry vocabulary.
```

ContentKey risk:

```text
The proposed contentKey still requires uniqueness validation in the implementation phase.
```

Static review must verify:

```text
- no renderer/SVG/asset/image dependency;
- no "observa la figura" or "la figura muestra" wording;
- all values and relations used by feedback are visible;
- table/list readability on mobile;
- answer keys and calculations are correct;
- authoredFeedback is present for all 3 items;
- exercise count remains 3 and <= 4;
- future figure-system debt remains documented.
```

Future PAES figure system out of scope:

```text
geometryFigureStimulus / visualStimulus code shape
deterministic SVG/template renderer
approved static asset bank
asset custody and versioning
visual snapshot/preview workflow
human/QA approval tooling for rendered figures
```

## Classification

```text
M2_C07_AUTHORED_READINESS_RETRY_OK
```

Reason:

The specification is now sufficiently closed for a later authored implementation phase without figure renderer/assets. The capsule uses the accepted hybrid strategy: immediate structured text/table geometry bridge, future parametric figure strategy later. It defines identity, contentKey, exercise count, prompts, representations, answer options, answer keys, reasoning, feedback expectations, risks and static review gates.

## Explicit non-changes

```text
DB execution by Codex: NOT_EXECUTED_BY_CODEX
DB mutation by Codex: NOT_MUTATED_BY_CODEX
Code changes: NOT_PERFORMED
Tooling changes: NOT_PERFORMED
Schema changes: NOT_PERFORMED
UI changes: NOT_PERFORMED
Asset changes: NOT_PERFORMED
New assets: NOT_CREATED
Renderer/SVG/figure system changes: NOT_PERFORMED
Implemented pedagogical capsule content changes: NOT_PERFORMED
Implemented authoredFeedback changes: NOT_PERFORMED
Payment/subscription changes: NOT_PERFORMED
StudentAccess changes: NOT_PERFORMED
Executable registry changes: NOT_PERFORMED
```

Additional non-actions:

```text
No seed changed.
No final implemented authoredFeedback changed.
No StudyLoad created or modified.
No LOCAL_DEV alignment attempted.
No human UI smoke attempted.
No prod/staging action.
No secrets printed.
```

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

## Estado final

M2-C07 authored readiness retry is closed and ready for later authored implementation under the bridge strategy.

## Recommended next phase

```text
MVP-CONTENT-PAES-M2-C07-AUTHORED-IMPLEMENT-1
```

That phase should implement only the structured text/table bridge content, validate contentKey uniqueness, add visible correlative M2-C07, include complete authoredFeedback, and avoid renderer/SVG/assets/UI/schema/runtime changes.

## Security notes

No `.env` values, database URLs, DB hosts, connection strings, tokens, cookies, secrets, private keys, credentials or passwords were requested or printed.

## Result

```text
M2_C07_AUTHORED_READINESS_RETRY_OK
```
