# MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-GRAPH-RENDERING-CONTENT-DIAGNOSIS-1

## Purpose

Diagnose the content/rendering debt detected during human local/dev smoke of:

```text
M1-C07 - Lectura de tablas y graficos I
```

Human smoke passed functionally, but the exercises refer to a table that is not shown. Because M1-C08 belongs to the same block, this phase also diagnoses whether the same issue affects C08 before deeper human smoke continues.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 9fd983555d4ca16ce9aeef11b299662efecabd38
```

Accepted prior commit:

```text
9fd9835 MVP-SALES-PILOT-PEDAGOGY-M1: close C07 tables graphs I smoke
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 9fd983555d4ca16ce9aeef11b299662efecabd38
git rev-parse origin/main: 9fd983555d4ca16ce9aeef11b299662efecabd38
git rev-parse origin/HEAD: 9fd983555d4ca16ce9aeef11b299662efecabd38
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Triggering human observation

Human report for C07:

```text
M1-C07 - Lectura de tablas y graficos I works correctly.
All verification points passed OK.
Start/resume sequence worked correctly.
No F5/refresh was required.
Next capsule shown in ST: Lectura de tablas y graficos II.
Observation: the exercises refer to a table that is not shown.
```

Closeout source:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_LECTURA_TABLAS_GRAFICOS_I_HUMAN_UI_SMOKE_CLOSEOUT_1.md
```

## C07 content/rendering diagnosis

C07 target:

```text
visible correlativo: M1-C07 - Lectura de tablas y graficos I
registry title: PAES M1 - Lectura de tablas y graficos I
contentKey: paes_m1_data_representation_entry
items: q1-q4
correctOptionKey order: D/B/C/A
```

Item diagnosis:

| item | stimulus reference | registry representation | diagnosis |
| --- | --- | --- | --- |
| q1 | table of books read by course | inline text: course/value pairs inside the stem | data exists, but no visible table layout |
| q2 | table of workshop attendance | inline text: workshop/value pairs inside the stem | data exists, but no visible table layout |
| q3 | table of sales by day | inline text: day/value pairs inside the stem | data exists, but no visible table layout |
| q4 | bar graph of library visits | inline text: month/value pairs inside the stem | data exists, but no visible graph or clearly marked textual substitute |

Static finding:

```text
C07 does not have a separate table field, graph field, image asset, or rendering metadata.
The only data source is the stem text.
The current stem text says "La tabla muestra..." or "Un grafico de barras describe..." but renders as ordinary prose.
```

Interpretation:

```text
C07 is functionally usable because the numeric data is present inline.
Pedagogically, it is blocked as a table/graph reading capsule because the promised stimulus is not visually/table-form represented.
```

## C08 content/rendering diagnosis

C08 target:

```text
visible correlativo: M1-C08 - Lectura de tablas y graficos II
registry title: PAES M1 - Lectura de tablas y graficos II
contentKey: paes_m1_data_representation_entry_ii
items: q5-q8
correctOptionKey order: C/B/B/A
```

Item diagnosis:

| item | stimulus reference | registry representation | diagnosis |
| --- | --- | --- | --- |
| q5 | table of snacks sold | inline text: category/value pairs inside the stem | data exists, but no visible table layout |
| q6 | table of temperatures across days | inline text: day/value pairs inside the stem | data exists, but no visible table layout |
| q7 | table of preferred activities | inline text: activity/value pairs inside the stem | data exists, but no visible table layout |
| q8 | table of colors chosen | inline text: color/value pairs inside the stem | data exists, but no visible table layout |

Static finding:

```text
C08 also has no separate table field, graph field, image asset, or rendering metadata.
All C08 table data is embedded as prose in the stem.
```

Interpretation:

```text
C08 shares the same content/rendering debt and should pause before deep human smoke until the table representation issue is repaired or explicitly accepted.
```

## Feedback dependency review

C07 feedback dependency:

```text
q1-q3 feedback tells the student to read or compare table data.
q4 feedback tells the student to read ordered graph values.
```

C08 feedback dependency:

```text
q5-q8 feedback tells the student to read, sum, average, compare, or infer from table values.
```

Static finding:

```text
The feedback is coherent with the inline numeric data, but it assumes the stimulus is readable as table/graph data.
If the UI only shows prose, the feedback can still be followed, but the capsule under-trains actual table/graph reading.
```

## Debt classification

Debt classification:

```text
CONTENT_MISSING_TABLE_TEXT
```

Reason:

```text
The data values exist in the stems, so this is not primarily an image-asset absence.
No separate table/graph structured content exists for the UI to render, so it is not only a rendering-support bug.
The narrowest repair is content-level: rewrite stems so each stimulus is visibly represented as a clear textual table or explicitly as a textual data list.
```

Secondary note:

```text
A later UI/table-rendering standard may be useful, but C07/C08 do not require image assets for the current small datasets.
```

## Pedagogical impact

Impact:

```text
C07 can remain functionally passed for local/dev UI mechanics.
C07 should not be considered pedagogically clean for table/graph reading until the missing-table representation is repaired or explicitly accepted.
C08 should pause before deep human smoke because it shares the same table-representation debt.
```

Why it matters:

- A table/graph capsule should train reading from a visible representation, not only parsing prose.
- Feedback completo depends on data-reading steps that should be visible in the exercise stimulus.
- The living PAES standard says required tables/graphs/images must be visible or clearly represented.

## Recommended repair path

Preferred option:

```text
A) Fase estrecha de contenido: insertar tabla textual en stems de C07/C08.
```

Recommended repair:

```text
Convert each C07/C08 stem from prose-only "La tabla muestra..." wording into a compact textual table or clearly labeled data block.
Preserve options, correctOptionKey, contentKey, item order, and authoredFeedback unless the wording change requires minimal feedback alignment.
Do not introduce image assets unless a later review decides visual charts are required.
Do not implement UI/rendering in the first repair if a textual table in the stem is sufficient.
```

Examples of acceptable direction:

```text
Tabla:
Curso | Libros leidos
1 medio | 12
2 medio | 15
...
```

For q4, either:

```text
Datos del grafico de barras:
Mes | Visitas
Marzo | 30
Abril | 36
Mayo | 42
```

or open a later visual-chart/UI phase if direction requires an actual rendered bar chart.

## Scope safety

This phase was documentation/read-only.

Not performed:

- No code changes.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No registry/content changes.
- No authoredFeedback changes.
- No route-order/continuity changes.
- No DB mutation.
- No seed or fixture mutation.
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No secrets printed.

## Result

```text
C07_C08_TABLE_GRAPH_DIAGNOSIS_CONTENT_TABLE_TEXT_REPAIR_RECOMMENDED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-TEXT-CONTENT-REPAIR-1
```

Purpose:

```text
Apply a narrow registry-content repair that represents C07/C08 table/graph data as visible textual tables or data blocks in the stems, then re-check authoredFeedback consistency before resuming C08 human smoke.
```
