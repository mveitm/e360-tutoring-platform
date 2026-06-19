# MVP-GOV-PAES-GEOMETRY-FIGURE-TECHNICAL-DECISION-1

## Phase name

```text
MVP-GOV-PAES-GEOMETRY-FIGURE-TECHNICAL-DECISION-1
```

## Baseline inicial

```text
HEAD = origin/main = origin/HEAD = 7eaaf8dfe8120bdf92cd01ec07d431abbaf2abc9
working tree clean
```

## Objetivo

Tomar una decision tecnica documentada sobre como representar figuras geometricas PAES en Bexauri, con foco inmediato en desbloquear M2-C07 sin introducir riesgo visual, assets fragiles, errores geometricos o cambios amplios de UI/runtime.

This phase is governance/technical decision only. It does not change app behavior.

## Context Gate

Verificacion git segura ejecutada antes de editar:

```text
git status --short: clean
git rev-parse HEAD: 7eaaf8dfe8120bdf92cd01ec07d431abbaf2abc9
git log --oneline --decorate -n 5: baseline confirmado en HEAD, origin/main y origin/HEAD
```

If the baseline had not matched or the working tree had not been clean, the phase would have stopped without editing.

## Alcance permitido/prohibido

Files allowed for modification:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_GOV_PAES_GEOMETRY_FIGURE_TECHNICAL_DECISION_1.md
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
No figure renderer implemented
No executable registry entries created or edited
No seeds
No migrations
No Prisma DB commands
No SQL
No secrets printed
```

## Archivos leidos

```text
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_FIGURESPEC_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C06_CLOSEOUT_1.md
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md
nextjs_space/docs/operations/MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md
nextjs_space/docs/operations/MVP_UI_PAES_TABLE_STIMULUS_MINIMUM_1.md
nextjs_space/docs/operations/MVP_UI_PAES_TABLE_STIMULUS_COMPLETED_VIEW_REPAIR_1.md
nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M2_INTEGRADO.md
nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx
```

Additional safe searches:

```text
rg for PAES images, geometry figures, visual assets, image strategy, SVG, diagram, figure, tableStimulus, VisualStimulusSpec, FigureSpec, geometry_figure, svg_template, static_asset, assetPath and stimulusId across nextjs_space/docs, nextjs_space/lib, nextjs_space/app and nextjs_space/components.
rg --files over nextjs_space/docs/operations for visual/figure/image/asset/PAES/M2/roadmap/governance/table/SVG/diagram docs.
```

No LOCAL_DEV tooling, DB-reading script, DB-writing script, build, browser automation or app server was executed by Codex.

## Problema que bloquea M2-C07

```text
Capsule: M2-C07
Candidate title: PAES M2 - Geometria con figura compuesta
Candidate contentKey: paes_m2_composite_geometry_figures_entry
Prior FigureSpec result: M2_C07_FIGURESPEC_BLOCKED_NEEDS_TECHNICAL_DECISION
```

The prior FigureSpec readiness documented that M2-C07 was designed around composite-figure reasoning and that direct implementation was blocked because the current canonical StudyLoad registry does not expose a supported geometry figure field, renderer, approved static asset path, `visualSpec`, `stimulusId`, `svg_template`, or `assetPath` path.

The practical blocker is not the geometry concept itself. The blocker is that a final student-facing geometry figure path would require code/UI/assets/runtime work that is out of scope for M2-C07 content implementation and carries visual validity risk.

## Estado actual de soporte visual/figuras en el repo

Current supported StudyLoad content shape:

```text
stem: supported as plain text with line breaks
tableStimulus: supported with caption, headers and rows
options: supported
correctOptionKey: supported
authoredFeedback: supported
readingText: supported for L1
```

Current StudyLoad UI behavior observed statically:

```text
StudyLoadAnswerForm renders stem text.
StudyLoadAnswerForm renders tableStimulus in active and completed/read-only question views.
StudyLoadAnswerForm renders options, selected answers, brief feedback and complete authoredFeedback.
No geometry figure renderer was found.
No SVG/asset/visualSpec renderer was found in the canonical StudyLoad path.
```

Governance already accepted:

```text
PAES visual stimuli must be visible, legible, unambiguous and auditable when they are part of the assessed skill.
Free-form AI-generated final figures are not approved student-facing PAES assets.
Final visual stimuli should be deterministic renderer output or approved static assets with human/QA approval.
Text bridges are acceptable only when explicitly tracked and non-misleading.
```

## Alternativas evaluadas

### A. Text-only fallback para M2-C07

```text
Decision: acceptable only if the item is re-authored as a structured geometry description and does not claim a visible figure is shown.
```

Pros:

```text
Compatible with current UI.
No schema/UI/runtime/assets changes.
Low implementation risk.
Can preserve decomposition and perimeter reasoning if the relationships are explicit.
```

Cons:

```text
Does not validate final visual-figure reading.
Can degrade the original "figure" skill if wording is vague.
Must be tracked as bridge, not final PAES geometry figure support.
```

### B. Compact coordinate/table/list representation

```text
Decision: recommended as part of the immediate bridge, not as a universal replacement for figures.
```

Pros:

```text
tableStimulus already exists.
Compact part tables can make dimensions and relations auditable.
Mobile behavior has been smoke-tested for previous table capsules.
Feedback can reference visible rows/values.
```

Cons:

```text
Tables/lists do not preserve all spatial relations.
Must avoid pretending that a visual figure was assessed.
Not suitable for angle/shape/proportion tasks.
```

### C. Parametric inline SVG/specification later

```text
Decision: preferred future strategy.
```

Pros:

```text
Deterministic and scalable.
Compatible with VisualStimulusSpec / FigureSpec governance.
Avoids fragile image bank drift.
Can represent labeled rectangles and shared sides consistently.
```

Cons:

```text
Requires separate technical phase.
Requires renderer/UI work, QA path and mobile testing.
Out of scope for this decision/documentation phase.
```

### D. Static asset/image bank later

```text
Decision: allowed only as future fallback for cases not covered by templates; not preferred for M2-C07 now.
```

Pros:

```text
Can represent figures without building a full renderer immediately.
Can be approved and versioned if an asset custody path exists.
```

Cons:

```text
Fragile if manually produced.
Requires asset creation/review/versioning/custody.
Risk of mismatches between asset, stem, options and feedback.
Out of scope for this phase.
```

### E. Postpone M2-C07 until figure renderer exists

```text
Decision: rejected for immediate M2-C07 because a safe bridge can preserve useful geometry reasoning without broad renderer work.
```

Pros:

```text
Most conservative for final visual validity.
Avoids any bridge debt.
```

Cons:

```text
Blocks M2-C07 entirely.
Forces renderer work before testing a bounded geometry reasoning capsule.
Over-scopes the near-term M2 progression.
```

### F. Hybrid: immediate text/table fallback + future parametric figure strategy

```text
Decision: accepted.
```

This is the selected strategy.

## Decision recomendada

```text
PAES_GEOMETRY_FIGURE_TECHNICAL_DECISION_READY
```

Selected strategy:

```text
F. Hybrid: immediate text/table fallback + future parametric figure strategy
```

Immediate decision for M2-C07:

```text
Use structured text and compact table/list geometry descriptions as an explicit bridge.
Do not use a visible-figure claim unless a real supported figure is present.
Do not create assets.
Do not add SVG.
Do not implement a renderer.
Do not modify UI/schema/runtime.
Do not edit implemented content in this phase.
Return to M2-C07 authored readiness retry before implementation, because the previous authored contract assumed figures.
```

Future decision:

```text
Reserve broader PAES geometry figure system strategy for a later governance/PRO or implementation phase.
Preferred future path: deterministic parametric SVG/template renderer governed by VisualStimulusSpec/FigureSpec with QA approval.
Static assets remain an allowed but secondary path only when templates are insufficient and asset custody/review exists.
```

## Justificacion

The hybrid approach is the smallest decision that unblocks the next M2-C07 planning step without pretending that Bexauri already has a complete PAES figure system.

It is acceptable because the immediate M2-C07 concept can be narrowed to:

```text
decomposing a composite shape from explicitly stated parts;
tracking area/perimeter values from visible text/table rows;
identifying shared/internal side relations from explicit wording;
choosing a conclusion from listed dimensions.
```

It is not acceptable to keep stems that say "la figura muestra..." unless the item is rewritten to say the information is described in text/table form.

Required bridge wording posture:

```text
Use "La descripcion geometrica indica..." or "La tabla/lista de partes indica..."
Avoid "observa la figura" or "segun la figura" until a rendered figure exists.
State adjacency/no-overlap/shared-side relationships directly.
Keep all dimensions visible in the stem or tableStimulus.
Make authoredFeedback reference those visible text/table values.
Record that final visual-geometry support remains future debt.
```

This preserves a defensible subset of the intended skill: geometry reasoning with composite parts. It does not claim full visual-spatial figure interpretation. That limitation is acceptable for an MVP bridge if it is documented, reviewed statically and smoke-tested honestly.

## Implicancias para M2-C07

M2-C07 should not go directly from the previous authored readiness into implementation. It should first run an authored readiness retry that revises the contract from figure-dependent final items to bridge-compatible items.

Recommended immediate M2-C07 bridge shape:

```text
Program: PAES_M2
Capsule: M2-C07
Title: PAES M2 - Geometria con figura compuesta
contentKey candidate: paes_m2_composite_geometry_figures_entry
Exercise count: 3
Stimulus approach: structured text + compact table/list bridge
No images/assets/graphs/figures/SVG
No UI/schema/runtime change
AuthoredFeedback: complete, step-by-step, references only visible text/table values
```

Bridge-specific exercise guidance:

```text
q1 area decomposition: use a compact table of parts, e.g. Parte A 6 x 4, Parte B 3 x 2, joined without overlap.
q2 perimeter/shared side: use explicit text/list, e.g. rectangle 8 x 5, square 3 x 3 attached along one 3 cm side, shared side is internal.
q3 partition comparison: use compact table/list, e.g. Pasto 10 x 4 and Juegos 10 x 2, both zones share width 10 m.
```

Static review must verify:

```text
No claim of an actual rendered figure.
No missing spatial relation needed to solve.
No reliance on visual proportion.
All values needed by feedback are visible in text/table form.
Tables/lists are compact and mobile-readable.
Exercise count remains 3 and <= 4.
Bridge limitation is documented.
```

Human UI smoke must verify:

```text
text/table readability in active view;
text/table readability in completed view;
feedback references visible values;
no broken images/assets/graphs/figures;
completion flow.
```

## Implicancias para futuras capsulas PAES

This decision does not solve the general PAES visual stimulus system.

Future visual-heavy capsules should still follow the accepted standard:

```text
AI may draft.
Deterministic renderer must produce.
Human/QA must approve.
```

Recommended future strategy:

```text
Create a separate PAES geometry figure technical design/implementation phase.
Define a typed `geometryFigureStimulus` or equivalent VisualStimulusSpec-compatible content shape.
Prefer parametric SVG templates for simple geometry figures.
Include stable stimulusId, version, templateId, params, itemRefs/capsuleRefs, status and review metadata.
Render deterministically in active and completed views.
Add static QA for stem/options/key/feedback/stimulus consistency.
Run human UI smoke on mobile/desktop readability.
```

Static asset/image bank implication:

```text
Do not create an image bank as the default path.
Use static assets only when a parametric template cannot represent the needed stimulus and when asset custody, review, versioning and replacement rules are in place.
```

## Riesgos y mitigaciones

Risk:

```text
Bridge text/table representation may weaken the original figure-reading construct.
```

Mitigation:

```text
Label M2-C07 implementation as bridge-compatible geometry reasoning, not final visual figure compliance. Avoid "figure shown" language and run a static review focused on representation honesty.
```

Risk:

```text
Spatial relationships may become ambiguous in text.
```

Mitigation:

```text
Use explicit relationship sentences: joined without overlap, shared side is internal, zones fill the rectangle, same width.
```

Risk:

```text
Table/list bridge may introduce mobile density.
```

Mitigation:

```text
Use 2-3 rows and 2-3 columns where possible. Prefer short labels and integer values. Avoid wide tables.
```

Risk:

```text
Future teams may treat bridge as complete figure support.
```

Mitigation:

```text
Record future parametric figure strategy as unresolved product/technical debt and require separate closeout before visual-heavy PAES capsules.
```

Risk:

```text
Manual assets could be introduced informally later.
```

Mitigation:

```text
Keep static assets as secondary path only with explicit custody, review and versioning.
```

## Que NO se implementa en esta fase

```text
No renderer.
No SVG.
No geometryFigureStimulus field.
No VisualStimulusSpec field in code.
No table/content registry changes.
No M2-C07 content implementation.
No authoredFeedback implementation.
No UI changes.
No app behavior changes.
No assets.
No schema.
No DB execution or mutation.
```

## Proxima fase recomendada

```text
MVP-CONTENT-PAES-M2-C07-AUTHORED-READINESS-RETRY-1
```

Purpose:

```text
Revise the M2-C07 authored contract to implement the accepted bridge strategy: structured text/table geometry descriptions now, future parametric figures later.
```

Do not proceed directly to authored implementation until the readiness retry updates stems, representations, feedback expectations and static review gates to match this decision.

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
These remain non-blocking for this technical decision. The C05/C06 exercise-count observation is not a blocker because the current standard allows maximum 4 exercises for M1/M2 and prefers 3 when sufficient.
```

## Resultado final

```text
PAES_GEOMETRY_FIGURE_TECHNICAL_DECISION_READY
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
Figure renderer changes: NOT_PERFORMED
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

The PAES geometry figure technical decision is ready for the next M2-C07 authored readiness retry. M2-C07 is no longer blocked on waiting for a full figure renderer before a bridge implementation can be specified, but the bridge must be honest: structured text/table geometry now, future parametric figure system later.

## Security notes

No `.env` values, database URLs, DB hosts, connection strings, tokens, cookies, secrets, private keys, credentials, passwords or target-student identifiers are recorded in this report.

## Result

```text
PAES_GEOMETRY_FIGURE_TECHNICAL_DECISION_READY
```
