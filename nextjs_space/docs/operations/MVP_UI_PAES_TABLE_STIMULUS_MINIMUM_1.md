# MVP-UI-PAES-TABLE-STIMULUS-MINIMUM-1

## Purpose

Implement minimum formatted-table support for PAES visual stimuli in Bexauri StudyLoad capsules, starting with C07/C08 table-reading items.

This phase replaces the C07/C08 text-row table bridge with a deterministic HTML table stimulus rendered in the student StudyLoad UI.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 85da138514056637f1e29943bc5220cf81a5940e
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 85da138514056637f1e29943bc5220cf81a5940e
```

## Source standards

Source phases:

- `MVP-GOV-PAES-VISUAL-STIMULUS-STANDARD-1`
- `MVP-GOV-PAES-FIGURE-SPEC-AND-QA-STANDARD-1`
- `MVP-GOV-ROADMAP-PAES-VISUAL-STIMULUS-AUTHORED-AGENTIC-ALIGNMENT-1`
- `MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-TEXT-CONTENT-REPAIR-1`
- `MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-GRAPH-RENDERING-CONTENT-DIAGNOSIS-1`
- `MVP-SALES-PILOT-PEDAGOGY-M1-C08-LECTURA-TABLAS-GRAFICOS-II-HUMAN-UI-SMOKE-CLOSEOUT-1`

Applied direction:

```text
AI may draft.
Deterministic renderer must produce.
Human/QA must approve.
```

## Implementation scope

Implemented only the minimum support needed for simple PAES table stimuli:

- optional static content shape `tableStimulus`;
- safe transfer of `tableStimulus` into StudyLoad UI items;
- deterministic HTML table rendering in the StudyLoad answer/review UI;
- C07/C08 table-text data converted into structured headers and rows.

No SVG, graph, geometry figure, image/asset, LaTeX, agentic, DB, schema, route-order, continuity, submission, or evaluation implementation was added.

## Content shape / rendering approach

Added optional shape:

```ts
tableStimulus?: {
  caption?: string
  headers: string[]
  rows: string[][]
}
```

Rendering approach:

- the StudyLoad form renders `tableStimulus` as an HTML table using the existing UI table components;
- table captions are student-facing labels only, not metadata;
- headers and rows are explicit structured content, avoiding brittle parsing of stem strings;
- the stem remains plain text and continues to render for all existing non-table items;
- items without `tableStimulus` are unaffected.

## C07/C08 application

Applied to:

```text
PAES M1 - Lectura de tablas y graficos I
contentKey: paes_m1_data_representation_entry
items: q1-q4
correctOptionKey order preserved: D/B/C/A

PAES M1 - Lectura de tablas y graficos II
contentKey: paes_m1_data_representation_entry_ii
items: q5-q8
correctOptionKey order preserved: C/B/B/A
```

Structured table stimuli added:

- q1: `Curso | Libros leidos`
- q2: `Taller | Asistentes`
- q3: `Dia | Ventas`
- q4: `Mes | Visitas`
- q5: `Colacion | Cantidad vendida`
- q6: `Dia | Temperatura (grados C)`
- q7: `Actividad | Estudiantes`
- q8: `Color | Frecuencia`

The prior text-row bridge blocks were removed from the stems to avoid duplicate table data. Stems, options, keys, content keys, ordering, item counts, and authoredFeedback meaning were preserved.

## What was not changed

- No schema/DB/Prisma files.
- No seed scripts.
- No fixtures.
- No route-order or continuity files.
- No auth/access files.
- No package files.
- No migration files.
- No StudyLoad state machine changes.
- No submission/evaluation API changes.
- No `correctOptionKey` changes.
- No item count changes.
- No `contentKey` changes.
- No ordering changes.
- No agentic code.
- No DB mutation.
- No production/staging.
- No browser automation.
- No API-only tests.
- No secrets printed.

## Validation

Validation passed:

```text
git diff --check: passed
git status --short: only authorized files changed before commit
git log --oneline --decorate --graph -8: reviewed
npm.cmd --prefix nextjs_space run build: passed
```

Static content validation:

```text
C07 item count preserved: 4
C08 item count preserved: 4
C07 correctOptionKey order preserved: D/B/C/A
C08 correctOptionKey order preserved: C/B/B/A
C07 contentKey preserved: paes_m1_data_representation_entry
C08 contentKey preserved: paes_m1_data_representation_entry_ii
authoredFeedback remains present on q1-q8
tableStimulus present on q1-q8
```

## Result

```text
PAES_TABLE_STIMULUS_MINIMUM_IMPLEMENTED_WITH_CONTENT_SHAPE_EXTENSION
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-STIMULUS-HUMAN-UI-SMOKE-READINESS-1
```

Purpose:

```text
Prepare a narrow human local/dev UI smoke to verify that C07/C08 tables render clearly on student desktop/mobile views without changing keys, feedback, route-order, continuity, DB, or schema.
```
