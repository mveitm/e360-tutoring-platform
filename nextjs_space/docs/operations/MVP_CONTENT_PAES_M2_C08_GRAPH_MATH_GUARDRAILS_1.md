# MVP-CONTENT-PAES-M2-C08-GRAPH-MATH-GUARDRAILS-1

## Phase

```text
MVP-CONTENT-PAES-M2-C08-GRAPH-MATH-GUARDRAILS-1
```

## Result

```text
M2_C08_GRAPH_MATH_GUARDRAILS_DEFINED
```

## Baseline Git validado

Baseline esperado:

```text
HEAD = origin/main = 88a3f600a12da99bc3f6bb8d5d3d8e1702d3ace1
working tree clean
```

Verificacion no destructiva ejecutada por Codex:

```text
git rev-parse HEAD
git rev-parse origin/main
git status --short --branch
```

Resultado:

```text
HEAD: 88a3f600a12da99bc3f6bb8d5d3d8e1702d3ace1
origin/main: 88a3f600a12da99bc3f6bb8d5d3d8e1702d3ace1
working tree: clean
baseline: MATCH
```

## Alcance

Definir documentalmente los guardrails graph/math/visual/rendered-math necesarios antes de implementar PAES_M2 / M2-C08. Esta fase no implementa C08, no crea contenido final, no cambia codigo, no cambia assets y no crea FigureSpec ejecutable.

Archivos autorizados para modificar:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C08_GRAPH_MATH_GUARDRAILS_1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

## Exclusiones

```text
DB execution by Codex: NOT_EXECUTED_BY_CODEX
DB mutation by Codex: NOT_EXECUTED_BY_CODEX
LOCAL_DEV tooling execution by Codex: NOT_EXECUTED_BY_CODEX
UI automation by Codex: NOT_EXECUTED_BY_CODEX
npm test/build/dev/app runtime: NOT_EXECUTED_BY_CODEX
Product code changes: NOT_PERFORMED
Pedagogical executable content changes: NOT_PERFORMED
C08 implementation: NOT_PERFORMED
Final authored content generation: NOT_PERFORMED
Schema/migration/seed/script/test changes: NOT_PERFORMED
Assets/images/FigureSpec executable changes: NOT_PERFORMED
Prod touched: NO
Staging touched: NO
Secrets/env values/DB URLs printed: NO
```

## Documentos leidos

```text
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C08_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md
nextjs_space/docs/operations/MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md
nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C03_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C05_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_AUTHORED_READINESS_RETRY_1.md
```

Busquedas read-only:

```text
rg for PAES_M2, M2_C08, M2-C08, C08, quadratic, cuadratica, non linear, no lineal, graph, FigureSpec, rendered math, LaTeX, visual stimulus and feedback across PHASE_LOG.md and nextjs_space/docs/operations.
```

## C08 identification

```text
Program: PAES_M2
Capsule: M2-C08
Candidate title: Funcion cuadratica o no lineal inicial
Concept/class: functions/advanced representation
Objective/skill: interpret a simple non-linear relation
Initial difficulty: medium-high
Suggested exercises: 3
Stimulus type from seed plan: graph and/or rendered math
Visual classification from readiness: GRAPH_REQUIRED_NEEDS_PLAN / LATEX_REQUIRED_NEEDS_PLAN
Final contentKey: NOT_FOUND
```

## Readiness source decision

Previous readiness phase:

```text
MVP-CONTENT-PAES-M2-C08-READINESS-1
M2_C08_READINESS_DECISION_RECORDED
C08_NEEDS_GRAPH_MATH_GUARDRAILS_BEFORE_IMPLEMENTATION
```

This phase resolves that readiness gap by defining implementation guardrails.

## Graph/math dependency classification

Classification:

```text
C08 has conditional graph/rendered-math dependency.
Graph is required only if the authored item asks the student to interpret graph features directly.
Rendered math or LaTeX-equivalent notation is required only if plain text creates ambiguity.
Text/table/value bridge is acceptable only if the assessed skill is relation interpretation from explicitly shown values and the item does not claim a rendered graph is shown.
```

Implication:

```text
Direct final graph-reading implementation remains blocked unless deterministic/auditable graph support and QA approval exist.
Conservative authored implementation may proceed as bridge-first if it avoids central graph reading and complex ambiguous notation.
```

## Visual/bridge decision

Decision:

```text
BRIDGE_FIRST_NO_FINAL_GRAPH_CLAIM_UNLESS_APPROVED_DETERMINISTIC_VISUAL_EXISTS
```

Allowed in next authored implementation:

```text
Explicit text/table/value representation of a simple non-linear relation.
Simple coordinate/value pairs only if table alignment is clear.
Simple expressions only when notation is unambiguous in plain text.
Student-facing wording that says values are shown in a table/description, not "observe the graph" unless a graph exists.
Feedback that references only visible table/text/expression values.
```

Not allowed in next authored implementation unless a deterministic/auditable visual path is explicitly available:

```text
Final student-facing graph-reading item.
Unapproved image/asset.
Free-form AI-generated graph/figure.
Draft VisualStimulusSpec treated as approved.
Feedback depending on unseen vertex, intercept, axis, curve shape, scale, or coordinate grid.
Claims that a graph, figure or rendered formula is visible when it is not.
```

Preferred future visual source if final graph reading becomes central:

```text
VisualStimulusSpec-compatible deterministic graph stimulus.
sourceType: svg_template or equivalent deterministic renderer.
type: line_graph, cartesian_plane or approved equivalent.
status: approved before student-facing use.
review evidence: human/QA approval.
```

## Rendered math / LaTeX guardrails

Plain text is acceptable only when it preserves precedence, grouping, signs, variables, exponents and units without ambiguity.

Rendered math or LaTeX-equivalent notation is required if an item uses:

```text
fractions
exponents whose base or exponent could be misread
roots
function notation with domain/range
coordinate notation that can be confused with multiplication or alternatives
multi-step algebraic expressions
inequalities or intervals
parameterized quadratic expressions where signs/grouping matter
```

For bridge-first implementation, avoid notation that needs rendered math unless the rendering path is already supported and approved. Prefer small integer tables, clear value pairs, and short expressions whose grouping is obvious.

## Typical C08 error risks to prevent

Authored implementation must avoid or explicitly teach around these risks:

```text
confusing linear and non-linear change
assuming constant difference in a quadratic-like table
misreading increasing/decreasing behavior from sparse values
confusing y-value, x-value and ordered pair
inferring vertex/intercept from absent graph
using visual proportion or imagined curve shape when no graph exists
misreading exponent precedence
choosing a distractor by adding visible numbers without checking relation
overclaiming full quadratic-function mastery from one bridge capsule
```

These are not final item requirements. They are risk controls for future authored implementation.

## Feedback-stimulus consistency rules

Every future C08 item must satisfy:

```text
Stem, table/text/expression, options, correct key, brief feedback and complete feedback all reference the same visible values.
Brief feedback names the mathematical idea without exposing hidden graph data.
Complete feedback develops the reasoning step by step using only displayed data or displayed expression.
Feedback must not introduce an unseen graph, vertex, intercept, axis, curve, scale, coordinate or formula that was not available to the student.
If a bridge is used, feedback must say the decision comes from the table/description/expression, not from a graph.
Distractor explanations must be tied to visible errors such as treating change as linear, confusing x/y, or ignoring exponent/grouping.
```

## Mobile readability guardrails

Minimum mobile guardrails:

```text
No wide table that hides required values without clear scrolling/wrapping.
Small value tables should use compact headers and short cells.
Graph labels, if any future graph is used, must remain legible on mobile.
Color must not be the only carrier of graph or table meaning.
Rendered math must not wrap into ambiguous fragments.
Stimulus order must remain stem -> stimulus -> options -> feedback.
No overlap between stimulus, options, buttons, or feedback.
Complete feedback must remain short enough to review on mobile.
```

## QA checklist before authored implementation

Before authored implementation can be accepted, the implementation phase must verify:

```text
1. C08 visible correlative is M2-C08.
2. Final student/admin title is defined.
3. Final contentKey is proposed and uniqueness-checked.
4. Exercise count is 3 unless a fourth is explicitly justified; never above 4.
5. Each item has one defensible correctOptionKey.
6. Each item has brief and complete authoredFeedback.
7. Each item is classified as text/table bridge, rendered math, or deterministic visual.
8. No item claims a graph or rendered formula is shown unless it is actually shown.
9. Any required visual has VisualStimulusSpec/FigureSpec-style traceability or is explicitly out of scope.
10. Any bridge is explicitly non-misleading and not treated as final graph-reading compliance.
11. Notation ambiguity is absent or resolved through rendered math.
12. Feedback references only visible stimuli/data/expressions.
13. Mobile readability risks are checked and documented.
14. No internal rationale, implementation notes, answer leakage, Sales-Ready, mastery, PAES score, M2-ready or adaptive AI claim appears.
```

## Guardrails decision

Decision:

```text
C08_GRAPH_MATH_GUARDRAILS_DEFINED_READY_FOR_AUTHORED_IMPLEMENTATION
```

Rationale:

```text
The documentation is sufficient to define conservative guardrails. C08 should not open final graph-reading or complex rendered-math implementation now, but authored implementation can proceed if it uses an explicit bridge-first contract, unambiguous notation, no false graph claim, strict feedback-stimulus consistency and QA gates.
```

## Riesgos si se implementa sin guardrails

```text
Student may be asked to infer from an absent graph.
Plain text may distort quadratic or non-linear notation.
Feedback may reference unseen graph features or formulas.
Options may depend on unapproved scale, vertex, intercept or visual shape.
Mobile layout may hide table values, labels or expressions.
C08 may become too dense for the M2 3-4 item closable capsule standard.
The implementation may create visual-stimulus debt while appearing to pass functional smoke.
```

## ContentKey handling

```text
Final contentKey found: NO
Status: NOT_FOUND_DEFINE_DURING_IMPLEMENTATION
Required handling: the authored implementation phase must define a final contentKey using the established PAES_M2 convention `paes_m2_<english_descriptor>_entry` and validate uniqueness before editing executable registry content.
```

No executable contentKey or registry artifact is created in this phase.

## Respuestas a preguntas de fase

1. Tipo de dependencia visual/matematica:

```text
Conditional graph and rendered-math dependency.
```

2. Puede implementarse sin grafico/figura:

```text
YES, only as explicit bridge-first non-final graph-reading implementation. NO if the item assesses graph reading directly.
```

3. Si requiere visual:

```text
Use deterministic/auditable graph stimulus or approved equivalent. Bridge may use table/text/value representation only when graph reading is not central.
```

4. Ambiguedades LaTeX/rendered math:

```text
Avoid ambiguous exponents, roots, fractions, function/domain/range notation, coordinates, intervals, signs, grouping and multi-step expressions.
```

5. Errores tipicos a prevenir:

```text
Linear vs non-linear change, x/y confusion, inferred vertex/intercept from absent graph, imagined curve shape, exponent precedence and distractors from adding visible numbers.
```

6. Consistencia requerida:

```text
Stem, stimulus/bridge, options, correct key, brief feedback and complete feedback must reference the same visible values and no unseen visual data.
```

7. Legibilidad movil:

```text
Compact tables, legible labels, no hidden required values, no ambiguous math wrapping, no overlap and reviewable complete feedback.
```

8. QA minimo:

```text
Identity/contentKey/item count/key/feedback/stimulus classification/mobile/readability/leakage/no-claim checks before accepting authored implementation.
```

9. contentKey final:

```text
Not in this phase. Define during authored implementation and validate uniqueness.
```

10. Proxima fase exacta:

```text
MVP-CONTENT-PAES-M2-C08-AUTHORED-IMPLEMENT-1
```

## Proxima fase exacta recomendada

```text
MVP-CONTENT-PAES-M2-C08-AUTHORED-IMPLEMENT-1
```

## Resultado esperado de la proxima fase

```text
M2_C08_AUTHORED_IMPLEMENTED
```

## Que NO se hizo

```text
No DB.
No tooling LOCAL_DEV.
No UI automation.
No product code.
No executable pedagogical content.
No C08 implementation.
No final authored content generation.
No assets/images/FigureSpec executable changes.
No schema, migrations, seeds, scripts or tests.
No npm test/build/dev.
No prod/staging.
No secrets, env values or DB URLs printed.
No Codex UI/DB/tooling execution was attributed.
```

## Validaciones antes del commit

Safe documentation-only checks:

```text
git diff --check: passed
Diff review: documentation-only
Authorized files only: passed
No student email in added lines/new report: passed
No secrets/env/DB URLs in added lines/new report: passed
No product code modified: passed
No executable pedagogical content modified: passed
No assets/FigureSpec executable modified: passed
Result exactness: M2_C08_GRAPH_MATH_GUARDRAILS_DEFINED
```

## Estado final

Pending commit/push at report authoring time. Final git status is verified after commit and push.
