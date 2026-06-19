# MVP-CONTENT-PAES-M2-C07-FIGURESPEC-READINESS-1

## Phase name

```text
MVP-CONTENT-PAES-M2-C07-FIGURESPEC-READINESS-1
```

## Baseline inicial

```text
HEAD = origin/main = origin/HEAD = 906fb5ca84d1a7af09a25541472bf6cb57f321f2
working tree clean
```

## Objetivo

Cerrar la readiness de especificacion de figura para PAES_M2 / M2-C07 antes de implementacion, resolviendo documentalmente la estrategia visual necesaria para no implementar la capsula con ambiguedad pedagogica.

This phase is documentation/specification only. It does not change app behavior.

## Context Gate

Verificacion git segura ejecutada antes de editar:

```text
git status --short: clean
git rev-parse HEAD: 906fb5ca84d1a7af09a25541472bf6cb57f321f2
git log --oneline --decorate -n 5: baseline confirmado en HEAD, origin/main y origin/HEAD
```

If the baseline had not matched or the working tree had not been clean, the phase would have stopped without editing.

## Alcance permitido/prohibido

Files allowed for modification:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_FIGURESPEC_READINESS_1.md
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
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C06_CLOSEOUT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_AUTHORED_IMPLEMENT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C06_STATIC_REVIEW_1.md
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md
nextjs_space/docs/operations/MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md
```

Additional safe search:

```text
rg for geometry_figure, FigureSpec, VisualStimulusSpec, svg_template, static_asset, figure, assetPath, stimulusId, image and diagram terms across nextjs_space/docs, nextjs_space/lib, nextjs_space/app and nextjs_space/components.
```

No LOCAL_DEV tooling, DB-reading script or DB-writing script was executed by Codex.

## Bloqueo o necesidad visual identificada

```text
Capsule: M2-C07
Candidate title: PAES M2 - Geometria con figura compuesta
Candidate contentKey: paes_m2_composite_geometry_figures_entry
Reason authored readiness is partial: M2-C07 requires geometry figures, but the deterministic/approved figure implementation path is unresolved.
Figure/visual representation need: geometry figure for each exercise, with labels/dimensions/relations visible and auditable.
Risk if implemented without figure spec: high risk of missing, ambiguous, cramped, misleading or feedback-inconsistent figures.
```

Evidence:

```text
M2-C07 readiness classified the capsule as GEOMETRY_FIGURE_REQUIRED_NEEDS_PLAN.
The seed plan says M2-C07 requires geometry figure, FigureSpec before implementation, and should not be implemented before deterministic figure path.
The authored readiness phase explicitly kept implementation gated until deterministic/approved geometry figure path or approved static asset path exists.
PAES visual governance states that geometry figures are required when spatial relations are part of reasoning.
PAES FigureSpec governance states that final student-facing figures must be deterministic or approved static assets, with status/review metadata before use.
```

Current repo support observed:

```text
nextjs_space/lib/study-load-content.ts supports text stems, options, authoredFeedback, readingText and tableStimulus.
No executable StudyLoadContent field for geometry figures, VisualStimulusSpec, stimulusId, assetPath, svg_template or geometry_figure was found.
No M2-C07 registry entry exists.
No M2-C07 figure asset exists.
No current implementation path was found for rendering PAES geometry figures in StudyLoad content.
```

## Estrategia de representacion recomendada

Evaluated options:

```text
A. text-only representation: rejected for final M2-C07 because the assessed skill is composite-figure reasoning.
B. compact table/list representation: rejected; tables/lists do not preserve spatial relations.
C. coordinate/geometry text description: acceptable only as non-final bridge if the task is narrowed away from visual figure interpretation.
D. existing supported figure format: not found in current canonical StudyLoad content registry.
E. deferred figure/asset implementation: accepted as governance-safe posture.
F. blocked until visual support decision: recommended result for this phase.
```

Recommended strategy:

```text
F. blocked until visual support decision
```

Justification:

```text
M2-C07 is explicitly figure-dependent.
The current registry supports tableStimulus but not geometry figure stimuli.
Text-only would undermine the intended geometry/figures skill.
Manual images/assets are prohibited in this phase and would require custody, review, versioning and asset path decisions.
The safest path is to document exact visualSpec requirements now, then require a separate technical/governance phase to add or approve a deterministic geometry figure representation path before implementation.
```

Allowed future paths:

```text
1. Add a supported geometryFigureStimulus / visualStimulus field and renderer in a separately scoped technical phase.
2. Use approved static SVG/asset support only if a separate asset custody/review path exists.
3. Re-author M2-C07 as a non-visual text-bridge capsule only if a separate phase changes the assessed skill and explicitly records visual debt.
```

Default decision:

```text
Do not implement M2-C07 student-facing content in the current registry until visual support is decided.
```

## visualSpec / FigureSpec draft

The following is a documentary minimum spec. It is not executable and does not create assets.

### Shared visualSpec requirements

```text
visualSpec id prefix: paes-m2-c07-composite-geometry
type: geometry_figure
sourceType target: svg_template preferred; static_asset only if separately approved
status required before student-facing use: approved
review required before student-facing use: human/QA checklist
mobile requirement: labels/dimensions legible on expected student viewport
accessibility/text fallback: concise description of shapes, labels and dimensions for review/support; not a replacement for final figure when visual geometry is assessed
```

Every future visualSpec must include:

```text
stimulusId
version
type
sourceType
templateId or assetPath
params
itemRefs
capsuleRefs
status
review metadata
mobile readability note
not-to-scale note if applicable
```

### visualSpec q1

```text
visualSpec id: paes-m2-c07-q1-l-shape-two-rectangles
purpose: support decomposition of composite area into two non-overlapping rectangles.
required elements: L-shaped composite figure built from rectangle A and rectangle B.
labels: A, B, 6 cm, 4 cm, 3 cm, 2 cm.
values: rectangle A = 6 cm by 4 cm; rectangle B = 3 cm by 2 cm.
relationships: A and B are adjacent and do not overlap.
student task: compute total area by adding both rectangle areas.
expected interpretation: 6 * 4 = 24 and 3 * 2 = 6, so total area is 30 cm2.
accessibility/text fallback: "Figura en L formada por rectangulo A de 6 cm por 4 cm y rectangulo B de 3 cm por 2 cm, unidos sin superponerse."
mobile readability notes: A/B labels and all four dimension labels must remain readable; no overlapping labels; simple outline.
implementation risk: if attachment/overlap is ambiguous, students may overcount or multiply unrelated sides.
```

### visualSpec q2

```text
visualSpec id: paes-m2-c07-q2-rectangle-square-shared-side
purpose: support exterior perimeter reasoning with an internal shared side.
required elements: 8 cm by 5 cm rectangle with 3 cm by 3 cm square attached to one side along a 3 cm segment.
labels: 8 cm, 5 cm, 3 cm, lado compartido, borde exterior.
values: rectangle dimensions 8 cm and 5 cm; square side 3 cm.
relationships: shared side is internal and not part of the exterior perimeter.
student task: choose the expression that removes the shared side counted twice.
expected interpretation: 2 * (8 + 5) + 4 * 3 - 2 * 3.
accessibility/text fallback: "Rectangulo de 8 cm por 5 cm con un cuadrado de 3 cm de lado pegado a un costado; el lado de contacto de 3 cm es interno."
mobile readability notes: shared side must be visually distinct; use a simple dashed/marked internal segment if renderer supports it; label must not crowd the figure.
implementation risk: if internal/exterior boundary is unclear, item becomes invalid.
```

### visualSpec q3

```text
visualSpec id: paes-m2-c07-q3-partitioned-rectangle-two-zones
purpose: support comparing areas of two rectangular zones inside one composite rectangle.
required elements: one 10 m by 6 m rectangle split into two horizontal zones.
labels: 10 m, 4 m, 2 m, P, J, Pasto, Juegos.
values: width 10 m; pasto height 4 m; juegos height 2 m.
relationships: zones fill the whole rectangle without overlap; both zones share the same width.
student task: compare area of pasto and juegos and choose supported conclusion.
expected interpretation: pasto = 10 * 4 = 40 m2; juegos = 10 * 2 = 20 m2; pasto is double juegos.
accessibility/text fallback: "Rectangulo total de 10 m de ancho dividido en dos franjas: Pasto de 4 m de alto y Juegos de 2 m de alto."
mobile readability notes: P/J or Pasto/Juegos labels must fit inside or next to zones; dimension labels must not overlap.
implementation risk: if the shared width is not obvious, students may treat the zones as unrelated rectangles.
```

## Riesgos y mitigaciones

Risk:

```text
Current StudyLoadContent shape has no geometry figure field.
```

Mitigation:

```text
Do not implement M2-C07 until a separate technical phase defines supported figure content shape and renderer or approved static asset path.
```

Risk:

```text
Text-only bridge would not assess the intended visual geometry skill.
```

Mitigation:

```text
Allow text fallback only for accessibility/review/support, not as final student-facing replacement.
```

Risk:

```text
Free-form manual or AI-generated figure could contradict labels, options, key or feedback.
```

Mitigation:

```text
Require svg_template or approved static_asset with version, review and status approved before use.
```

Risk:

```text
Mobile labels may become illegible or overlap.
```

Mitigation:

```text
Use simple 2-3 part rectangular figures, short labels, integer dimensions and static/human QA before smoke.
```

## Impacto sobre authored readiness / implementation

Result:

```text
M2_C07_FIGURESPEC_BLOCKED_NEEDS_TECHNICAL_DECISION
```

Reason:

```text
The documentary visualSpec is now clear enough to guide a later technical or governance decision, but the current repo does not expose a supported geometry-figure content/rendering path for StudyLoad implementation. Therefore M2-C07 should not move directly to authored implementation.
```

Next readiness posture:

```text
Authored readiness remains partial with observations.
Implementation remains blocked until a visual support decision is made.
After technical visual support is decided, return to authored readiness/implementation planning to integrate the final supported figure field/path into the contract.
```

## Observaciones heredadas no bloqueantes

```text
1. Login lands on LP before dashboard via "Iniciar".
2. Next visible state/capsule was not detailed during M2-C04 smoke.
3. Next visible state/capsule for M2-C05 was not detailed by human.
4. En ST M2 falta contenedor de las 3 ultimas capsulas completadas; verificar comportamiento/paridad en M1.
5. Revisar por que C05 y C06 tienen solo 3 ejercicios.
```

Interpretation:

```text
These remain non-blocking flow/product/pedagogical-consistency observations for this FigureSpec phase.
The C05/C06 3-exercise observation is not a blocker by itself because the current standard allows maximum 4 exercises for M1/M2 and prefers 3 when sufficient.
```

## Resultado final

```text
M2_C07_FIGURESPEC_BLOCKED_NEEDS_TECHNICAL_DECISION
```

## Confirmacion explicita de no ejecucion/mutacion DB por Codex

```text
DB execution by Codex: NOT_EXECUTED_BY_CODEX
DB mutation by Codex: NOT_MUTATED_BY_CODEX
LOCAL_DEV tooling execution by Codex: NOT_EXECUTED_BY_CODEX
```

No DB command, Prisma migrate, Prisma db push, seed, SQL, local-dev DB tooling mode or script that reads/writes DB was executed by Codex in this phase.

## Confirmacion explicita de no cambios fuera de alcance por Codex

```text
Code changes: NOT_PERFORMED
Tooling changes: NOT_PERFORMED
Schema changes: NOT_PERFORMED
UI changes: NOT_PERFORMED
Asset changes: NOT_PERFORMED
New assets: NOT_CREATED
Implemented pedagogical capsule content changes: NOT_PERFORMED
Implemented authoredFeedback changes: NOT_PERFORMED
Payment/subscription changes: NOT_PERFORMED
StudentAccess changes: NOT_PERFORMED
Executable registry changes: NOT_PERFORMED
```

This phase only changed documentation/log files.

## Validaciones ejecutadas

Executed after documentation:

```text
git diff --check
secret-pattern scan over modified files
```

Results:

```text
git diff --check: passed
secret-pattern scan: passed
```

No build was executed because this phase changed documentation only. No DB command, DB-reading script, DB-writing script, or LOCAL_DEV tooling mode was executed by Codex.

## Estado final

M2-C07 has a documented visualSpec target, but implementation remains blocked until a technical visual support decision is made for geometry figures in StudyLoad content.

## Recomendacion de siguiente paso natural

```text
MVP-GOV-PAES-GEOMETRY-FIGURE-TECHNICAL-DECISION-1
```

That phase should decide whether to add a deterministic SVG/template field, approved static asset path, or a deliberately scoped text-bridge route before returning to M2-C07 authored implementation.

## Security notes

No `.env` values, database URLs, DB hosts, connection strings, tokens, cookies, secrets, private keys, credentials, passwords or target-student identifiers are recorded in this report.

## Result

```text
M2_C07_FIGURESPEC_BLOCKED_NEEDS_TECHNICAL_DECISION
```
