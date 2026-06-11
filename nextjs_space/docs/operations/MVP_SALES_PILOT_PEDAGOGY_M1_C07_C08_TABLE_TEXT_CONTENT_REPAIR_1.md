# MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-TEXT-CONTENT-REPAIR-1

## Purpose

Repair the student-facing textual content debt in:

```text
M1-C07 - Lectura de tablas y graficos I
M1-C08 - Lectura de tablas y graficos II
```

The prior diagnosis found that exercises referred to tables, or to a bar graph in C07 q4, but the registry only showed the data as inline prose. This phase inserts clear textual tables or data blocks directly into existing stems.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = d03af0965fe5feb4be66549574723ffd7444dec5
```

Accepted prior commit:

```text
d03af09 MVP-SALES-PILOT-PEDAGOGY-M1: diagnose C07 C08 table rendering
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: d03af0965fe5feb4be66549574723ffd7444dec5
git rev-parse origin/main: d03af0965fe5feb4be66549574723ffd7444dec5
git rev-parse origin/HEAD: d03af0965fe5feb4be66549574723ffd7444dec5
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before edits.

## Source diagnosis

Source diagnosis:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_GRAPH_RENDERING_CONTENT_DIAGNOSIS_1.md
```

Source result:

```text
C07_C08_TABLE_GRAPH_DIAGNOSIS_CONTENT_TABLE_TEXT_REPAIR_RECOMMENDED
```

Findings carried forward:

- C07 q1-q3 refer to tables whose values were only inline prose.
- C07 q4 refers to a bar graph whose values were only inline prose.
- C08 q5-q8 refer to tables whose values were only inline prose.
- No separate table field, graph field, image asset, or rendering metadata exists.
- The narrow repair is textual table/data-block representation inside the static registry stems.

## C07 table-text repair

C07 target:

```text
title: PAES M1 - Lectura de tablas y graficos I
contentKey: paes_m1_data_representation_entry
items: q1-q4
correctOptionKey order: D/B/C/A
```

Repairs applied:

| item | repair |
| --- | --- |
| q1 | Added a textual table with columns `Curso` and `Libros leidos`, rows 1 medio to 4 medio. |
| q2 | Added a textual table with columns `Taller` and `Asistentes`, rows Arte, Ciencias, Musica. |
| q3 | Added a textual table with columns `Dia` and `Ventas`, rows Lunes to Jueves. |
| q4 | Added a textual data block for the bar graph with columns `Mes` and `Visitas`, rows Marzo to Mayo. |

The same values and answer logic were preserved.

## C08 table-text repair

C08 target:

```text
title: PAES M1 - Lectura de tablas y graficos II
contentKey: paes_m1_data_representation_entry_ii
items: q5-q8
correctOptionKey order: C/B/B/A
```

Repairs applied:

| item | repair |
| --- | --- |
| q5 | Added a textual table with columns `Colacion` and `Cantidad vendida`, rows Frutas, Yogures, Jugos. |
| q6 | Added a textual table with columns `Dia` and `Temperatura (grados C)`, rows Lunes to Miercoles. |
| q7 | Added a textual table with columns `Actividad` and `Estudiantes`, rows Deporte, Lectura, Videojuegos. |
| q8 | Added a textual table with columns `Color` and `Frecuencia`, rows Azul, Verde, Rojo, Amarillo. |

The same values and answer logic were preserved.

## authoredFeedback coherence check

authoredFeedback was preserved without edits.

Reason:

```text
The feedback already referred to the same table/graph values and remains coherent after the data became visible as textual tables or a textual graph-data block.
```

The authoredFeedback shape remains:

```ts
authoredFeedback: {
  briefId: string,
  completeId: string,
  version: string,
  brief: string,
  complete: string,
}
```

## Pedagogical standard compliance

The repair aligns with the living PAES capsule standard:

- Required tables/graphs are now visible or clearly represented in student-facing text.
- C07 remains at 4 exercises.
- C08 remains at 4 exercises.
- Each item keeps one defensible correctOptionKey.
- Feedback breve and complete feedback remain present on q1-q8.
- No internal rationale, implementation note, source-finalization note, Sales-Ready claim, or adaptive AI claim was added.

## What was not changed

Not changed:

- No UI files.
- No API files.
- No schema/DB/Prisma files.
- No seed scripts.
- No fixtures.
- No route-order/continuity files.
- No auth/access files.
- No package files.
- No migration files.
- No DB mutation.
- No browser automation.
- No API-only tests.
- No production/staging.
- No secrets printed.
- No contentKey changes.
- No item ordering changes.
- No correctOptionKey changes.
- No options changes.
- No authoredFeedback text changes.

## Validation

Validation passed:

```text
git diff --check: passed
npm.cmd --prefix nextjs_space run build: passed
```

Static validation:

```text
C07 item count: 4
C08 item count: 4
C07 correctOptionKey order preserved: D/B/C/A
C08 correctOptionKey order preserved: C/B/B/A
C07 contentKey preserved: paes_m1_data_representation_entry
C08 contentKey preserved: paes_m1_data_representation_entry_ii
authoredFeedback remains present on q1-q8
Each item that refers to a table now includes a visible textual table
C07 q4 includes visible textual data for the bar graph
No authorized-scope violation found in the intended diff
```

Final validation commands were also run before commit:

```text
git status --short
git log --oneline --decorate --graph -8
```

## Result

```text
C07_C08_TABLE_TEXT_CONTENT_REPAIR_COMPLETED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C08-LECTURA-TABLAS-GRAFICOS-II-HUMAN-UI-SMOKE-READINESS-1
```

Purpose:

```text
Prepare or resume the human local/dev UI smoke path for M1-C08 after the textual table repair, without further code or DB mutation unless separately authorized.
```
