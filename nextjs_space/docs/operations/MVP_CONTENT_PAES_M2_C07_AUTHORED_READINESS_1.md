# MVP-CONTENT-PAES-M2-C07-AUTHORED-READINESS-1

## Phase name

```text
MVP-CONTENT-PAES-M2-C07-AUTHORED-READINESS-1
```

## Baseline inicial

```text
HEAD = origin/main = origin/HEAD = 619464514e6b7d978f59904e9b607ee79cc69a79
working tree clean
```

## Objetivo

Cerrar la readiness authored de PAES_M2 / M2-C07 antes de cualquier implementacion, definiendo una especificacion pedagogica y tecnica suficientemente precisa para una fase posterior.

Esta fase es documental/de especificacion. No cambia comportamiento de la app.

## Context Gate

Verificacion git segura ejecutada antes de editar:

```text
git status --short: clean
git rev-parse HEAD: 619464514e6b7d978f59904e9b607ee79cc69a79
git log --oneline --decorate -n 5: baseline confirmado en HEAD, origin/main y origin/HEAD
```

If the baseline had not matched or the working tree had not been clean, the phase would have stopped without editing.

## Alcance permitido/prohibido

Files allowed for modification:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_AUTHORED_READINESS_1.md
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
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C06_CLOSEOUT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_AUTHORED_IMPLEMENT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_STATIC_REVIEW_1.md
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md
nextjs_space/docs/operations/MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md
```

No LOCAL_DEV tooling or DB-reading/DB-writing script was executed by Codex.

## Source context

The M2-C07 readiness phase identified the next candidate from the PAES_M2 seed plan:

```text
program: PAES_M2
previous capsule: M2-C06
candidate next capsule: M2-C07
candidate title: Geometria con figura compuesta
candidate contentKey: NOT_FOUND_AS_FINAL_OR_IMPLEMENTED_ARTIFACT
source of truth: nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
confidence level: HIGH_FOR_SEQUENCE_AND_TITLE; LOW_FOR_FINAL_CONTENTKEY_AND_FINAL_ITEMS
readiness result: M2_C07_READINESS_PARTIAL_WITH_OBSERVATIONS
```

The seed plan classifies M2-C07 as:

```text
axis/family: geometry/figures
initial difficulty: medium-high
suggested exercises: 3
stimulus type: geometry figure
VisualStimulusSpec/FigureSpec: FigureSpec required before implementation
smoke criterion: do not implement before deterministic figure path
pedagogical risk: high visual validity risk
```

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
Skill family: geometry/figures
Exercise count target: 3
```

ContentKey rationale:

The current PAES_M2 registry convention uses `paes_m2_` prefix, English descriptor tokens and `_entry` suffix:

```text
paes_m2_modeling_expressions_functions_entry
paes_m2_data_probability_table_entry
paes_m2_functions_graph_behavior_entry
paes_m2_analytic_geometry_relations_entry
paes_m2_systems_restrictions_context_entry
paes_m2_simple_comparative_statistics_entry
```

`paes_m2_composite_geometry_figures_entry` preserves the convention and the source title meaning. A later implementation phase must validate uniqueness against the live registry before editing executable content.

## Pedagogical purpose

M2-C07 should introduce controlled reasoning with composite figures without turning the capsule into a broad geometry unit.

Purpose:

```text
Interpret a simple composite geometry figure, identify the labeled parts needed for area or perimeter reasoning, decompose the shape into familiar pieces, and choose a conclusion supported by the shown dimensions or relations.
```

The capsule should emphasize:

```text
- reading labels/dimensions from the same figure shown to the student;
- decomposing a composite shape into rectangles or simple parts;
- distinguishing area from perimeter;
- avoiding visual-proportion guesses;
- keeping calculation load small and auditable;
- using feedback to trace every value back to the figure.
```

It should not introduce similarity, trigonometry, circles, complex coordinate geometry, proof-style reasoning, scale factors, non-integer dimensions, or not-to-scale traps beyond explicitly stated labels.

## Representation and FigureSpec strategy

M2-C07 is not appropriate for final student-facing implementation as plain text alone because the assessed skill depends on spatial/composite-figure reasoning.

Required representation strategy:

```text
Primary representation: deterministic or approved geometry figure.
Required governance: VisualStimulusSpec/FigureSpec before implementation.
Allowed source types: svg_template or approved static_asset; text_bridge only as a temporary authored description, not final compliance.
No free-form AI-generated final figure.
No new assets in this authored-readiness phase.
No implementation until figure rendering/asset path and QA status are explicit.
```

Minimum FigureSpec expectations for each future item:

```text
stimulusId
version
type: geometry_figure
sourceType: svg_template or approved static_asset
itemRefs including the exact exercise key
capsuleRefs including M2-C07
status: approved before student-facing use
review metadata
all labels/dimensions used by stem, options, key and feedback
mobile readability note
not-to-scale note if applicable
```

Readability rules:

```text
- use simple composite figures made of 2 or 3 rectangles;
- use short labels and integer dimensions;
- avoid tiny labels, overlapping text, ambiguous sides and decorative marks;
- avoid relying on visual proportions unless the figure is explicitly to scale and reviewed;
- feedback must reference exact labels/dimensions shown in the figure;
- static review must verify figure/stem/options/key/feedback consistency.
```

## Pedagogical restrictions

```text
M2 maximum: 4 exercises per capsule
M2-C07 target: 3 exercises
Feedback: brief visible feedback plus complete step-by-step authoredFeedback
Tone: clear, close, realistic and not grandiloquent
Claims: no PAES readiness, score, mastery, Sales-Ready, adaptive diagnosis or complete coverage claims
```

Three exercises are preferred because composite-figure reasoning has high visual risk. The capsule should cover area, perimeter and one conclusion check without overloading the student.

## Proposed exercise design

The following is a pedagogical specification and FigureSpec-ready plan, not an executable registry change.

### Exercise 1

```text
Proposed exercise key: q1
Skill focus: decompose a composite area into two rectangles
Representation: geometry figure required
FigureSpec status needed before implementation: approved
```

Prompt:

```text
La figura compuesta esta formada por dos rectangulos unidos sin superponerse. Segun las medidas marcadas, cual es el area total?
```

Data / representation:

```text
Figure: L-shape made of two rectangles.
Rectangle A: 6 cm by 4 cm.
Rectangle B: 3 cm by 2 cm, attached to one side of A.
Labels shown: A, B, 6 cm, 4 cm, 3 cm, 2 cm.
Required visual note: rectangles do not overlap.
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
Compute area A = 6 * 4 = 24. Compute area B = 3 * 2 = 6. Add 24 + 6 = 30 because the rectangles do not overlap.
```

Brief feedback:

```text
Divide la figura en los dos rectangulos marcados: 6 * 4 = 24 y 3 * 2 = 6; en total son 30 cm2.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for total area.
2. Identify rectangle A and read 6 cm and 4 cm from the figure.
3. Compute 6 * 4 = 24.
4. Identify rectangle B and read 3 cm and 2 cm from the figure.
5. Compute 3 * 2 = 6.
6. Add 24 + 6 = 30 because the parts are joined without overlapping.
7. Explain distractors: 24 uses only A; 36 likely adds all side labels or overcounts; 48 multiplies unrelated dimensions.
8. Recommendation: mark each simple part before adding areas.
9. Connection: prepares perimeter reasoning where not all internal sides are counted.
```

Common misconception addressed:

```text
Using only the largest rectangle or multiplying dimensions that do not belong to the same rectangle.
```

Implementation/readability notes:

```text
Figure must make A and B labels visible, avoid overlap, and show that the rectangles are adjacent, not stacked or intersecting.
```

### Exercise 2

```text
Proposed exercise key: q2
Skill focus: distinguish perimeter from area in a composite shape
Representation: geometry figure required
FigureSpec status needed before implementation: approved
```

Prompt:

```text
La figura muestra un rectangulo de 8 cm por 5 cm al que se le agrego un cuadrado de 3 cm de lado en uno de sus costados. El lado compartido no forma parte del borde exterior. Cual expresion calcula el perimetro exterior?
```

Data / representation:

```text
Figure: 8 cm by 5 cm rectangle with a 3 cm by 3 cm square attached to the right side along one 3 cm segment.
Labels shown: 8 cm, 5 cm, 3 cm, and "lado compartido" or equivalent marking.
Required visual note: perimeter is the outside border only.
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
Start with the perimeter of the rectangle and square separately, then subtract the shared side twice because it was counted once in each shape but is not on the outside border.
```

Brief feedback:

```text
El lado compartido no queda en el borde exterior, por eso se resta dos veces: una por cada figura que lo contaba.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for exterior perimeter, not area.
2. Read rectangle dimensions 8 cm and 5 cm.
3. Read square side 3 cm and identify the shared side.
4. Explain that adding perimeters separately counts the shared side twice.
5. Subtract 2 * 3 to remove both counts of the shared side.
6. Justify option B.
7. Explain distractors: A keeps the internal side; C computes area; D only adds some labels.
8. Recommendation: for perimeter, trace only the outside border.
9. Connection: prepares deciding whether a side is internal or external in composite figures.
```

Common misconception addressed:

```text
Counting an internal shared side as part of the perimeter.
```

Implementation/readability notes:

```text
The shared side must be visually clear and labelled or marked. The item must not rely on visual proportion alone.
```

### Exercise 3

```text
Proposed exercise key: q3
Skill focus: choose a valid conclusion from labeled composite-figure relations
Representation: geometry figure required
FigureSpec status needed before implementation: approved
```

Prompt:

```text
La figura muestra un patio rectangular dividido en una zona de pasto y una zona de juegos. Segun las medidas marcadas, cual conclusion esta mejor apoyada?
```

Data / representation:

```text
Figure: whole rectangle 10 m by 6 m.
Zone P (pasto): rectangle 10 m by 4 m.
Zone J (juegos): rectangle 10 m by 2 m.
Labels shown: total height split into 4 m and 2 m; width 10 m; zone labels P and J.
Required visual note: zones fill the whole rectangle without overlap.
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
Area P = 10 * 4 = 40. Area J = 10 * 2 = 20. Since 40 is double 20, the supported conclusion is that the grass zone has twice the area of the play zone.
```

Brief feedback:

```text
Pasto mide 10 * 4 = 40 m2 y juegos mide 10 * 2 = 20 m2; 40 es el doble de 20.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for the conclusion supported by the figure.
2. Read width 10 m and the two heights 4 m and 2 m.
3. Compute area of pasto: 10 * 4 = 40.
4. Compute area of juegos: 10 * 2 = 20.
5. Compare 40 and 20 and identify a double relationship.
6. Justify option B.
7. Explain distractors: A reverses the comparison; C ignores the different heights; D adds visible labels instead of computing area.
8. Recommendation: when comparing areas, compute each area before judging from appearance.
9. Connection: prepares stronger comparison of composite figures and partitions.
```

Common misconception addressed:

```text
Judging by visual impression or adding dimensions instead of computing areas.
```

Implementation/readability notes:

```text
The partition must show the same 10 m width for both zones and the 4 m / 2 m split clearly. Labels P and J must not be cramped on mobile.
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
- identify the exact figure labels or relations used;
- compute area/perimeter/conclusion step by step;
- justify the correct option;
- explain why plausible distractors fail;
- include a short recommendation;
- connect to the next geometry reasoning skill;
- never reference an absent or draft-only figure.
```

## Implementation gates

M2-C07 should not proceed to authored implementation unless one of these is true:

```text
1. A deterministic geometry figure path is explicitly approved and available for the implementation phase; or
2. An approved static asset path exists with stable asset identifiers and review metadata; or
3. A separate visual-dependency phase authorizes a temporary text_bridge and explicitly narrows the assessed skill so it does not depend on visual geometry reading.
```

Default recommendation:

```text
Do not implement M2-C07 as final student-facing content before a FigureSpec / deterministic figure plan is approved.
```

## Risks and decisions

Representation risk:

```text
High. The capsule depends on geometry figures. A missing, ambiguous, not-to-scale or cramped figure would be a pedagogical blocker.
```

Overload mitigation:

```text
Use exactly 3 exercises: area decomposition, exterior perimeter with shared side, and supported conclusion from a partitioned rectangle. Use small integer dimensions and avoid extra geometry vocabulary.
```

ContentKey validation:

```text
The proposed contentKey follows the registry convention but must be uniqueness-checked in the implementation phase.
```

Static review must verify:

```text
- FigureSpec exists for every item before implementation is accepted.
- Each figure has stable stimulusId/version/status/review metadata.
- The figure matches stem, options, answer key and feedback.
- All labels/dimensions referenced in feedback are visible.
- Shared/internal sides are visually unambiguous.
- Mobile readability is acceptable.
- There are no free-form AI-generated final figures.
- There are no hidden asset references or draft-only stimulus dependencies.
- Exercise count remains 3 and <= 4.
```

Tension from readiness:

```text
The seed plan asks for geometry figure reasoning but also says not to implement before deterministic figure path. This authored readiness resolves the pedagogical design but does not remove the implementation gate.
```

## Classification

```text
M2_C07_AUTHORED_READINESS_PARTIAL_WITH_OBSERVATIONS
```

Reason:

The pedagogical identity, proposed contentKey, 3-exercise design, feedback expectations and FigureSpec requirements are defined. However, the capsule is not sufficiently closed for direct implementation because the deterministic/approved geometry figure path is still unresolved. Implementation must wait for a visual-dependency/FigureSpec approval path or an explicitly authorized narrow text-bridge decision.

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
Executable registry changes: NOT_PERFORMED
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

M2-C07 authored readiness is partially closed with observations. The next safe step is a visual-dependency/FigureSpec planning phase before implementation, unless the user explicitly authorizes a narrower text-bridge route that does not assess final visual geometry reading.

## Recommended next phase

```text
MVP-CONTENT-PAES-M2-C07-FIGURESPEC-READINESS-1
```

Alternative only if explicitly chosen:

```text
MVP-CONTENT-PAES-M2-VISUAL-DEPENDENCY-PLAN-1
```

## Security notes

No `.env` values, database URLs, DB hosts, connection strings, tokens, cookies, secrets, private keys, credentials or passwords were requested or printed.

## Result

```text
M2_C07_AUTHORED_READINESS_PARTIAL_WITH_OBSERVATIONS
```
