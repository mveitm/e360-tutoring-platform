# MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-STIMULUS-HUMAN-UI-SMOKE-READINESS-1

## Purpose

Prepare a documentation/readiness phase for a later human local/dev UI smoke of:

```text
M1-C07 - Lectura de tablas y graficos I
M1-C08 - Lectura de tablas y graficos II
```

The later smoke must verify that C07/C08 table stimuli are no longer shown only as text rows, but as visible, formatted, legible tabular stimuli in the student UI.

This phase does not execute the smoke.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 8fe99b9ad06c6d8bfa65c12c64bd8e5e123e15b1
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 8fe99b9ad06c6d8bfa65c12c64bd8e5e123e15b1
```

## Source implementation

Source implementation:

```text
MVP-UI-PAES-TABLE-STIMULUS-MINIMUM-1
PAES_TABLE_STIMULUS_MINIMUM_IMPLEMENTED_WITH_CONTENT_SHAPE_EXTENSION
```

Implementation evidence:

- `tableStimulus` optional content shape was added with `caption`, `headers`, and `rows`.
- `getSafeStudyLoadItems` passes `tableStimulus` to the StudyLoad UI without answer keys or internal metadata.
- `StudyLoadAnswerForm` renders `tableStimulus` as deterministic HTML tables using existing UI table components.
- C07/C08 q1-q8 now contain structured `tableStimulus`.
- C07/C08 item counts, contentKey values, ordering, correctOptionKey values, options, and authoredFeedback were preserved.

## Why C07/C08 need smoke

C07 and C08 previously passed functional smoke, but the table stimulus was only represented as text rows. After PAES_TABLE_STIMULUS_MINIMUM_IMPLEMENTED_WITH_CONTENT_SHAPE_EXTENSION, human UI smoke must verify that tables are visible, formatted, legible and pedagogically usable without changing item count, keys, feedback or flow.

Both capsules need smoke because the original debt affected the whole C07/C08 table-reading block:

- C07 q1-q3 referred to tables and q4 referred to graph data shown only as text/data rows.
- C08 q5-q8 referred to tables shown only as text rows.
- C07 closeout recorded a missing-table/content-rendering debt.
- C08 closeout recorded table formatting debt after functional smoke.

## Human UI smoke checklist

C07 - Lectura de tablas y graficos I

- abrir ST M1 o /now;
- abrir o acceder a C07 si esta disponible en local/dev;
- confirmar maximo 4 ejercicios;
- confirmar que cada pregunta que requiere tabla muestra tabla formateada;
- confirmar headers visibles;
- confirmar filas separadas y legibles;
- confirmar que no queda texto suelto tipo tabla en filas confusas;
- confirmar que enunciado, alternativas y tabla son coherentes;
- confirmar feedback breve sigue visible;
- confirmar boton paso a paso sigue visible;
- confirmar feedback completo sigue visible;
- confirmar que no cambio flujo de submit/autoreporte/finalizar si se ejecuta flujo completo.

C08 - Lectura de tablas y graficos II

- repetir los mismos puntos;
- confirmar que no reaparece instancia stale de 8 ejercicios;
- confirmar que maximo 4 ejercicios se mantiene;
- confirmar que la tabla formateada no rompe mobile/desktop de forma evidente.

## Stop conditions

- tabla no visible;
- tabla visible pero no formateada;
- headers ausentes cuando son necesarios;
- datos no coinciden con enunciado/opciones/feedback;
- aparece instancia stale de 8 ejercicios;
- falta authoredFeedback;
- falta paso a paso;
- correctOptionKey parece incoherente;
- hay leakage interno;
- se rompe submit/autoreporte/finalizar;
- se requiere F5 despues de Comenzar;
- se pierde sesion o redirige inesperadamente.

## Expected result

Expected later smoke result if all checklist points pass:

```text
M1_C07_C08_TABLE_STIMULUS_HUMAN_UI_SMOKE_READY
```

## Known watch items

C07 and C08 were already smoke-passed functionally before table formatting support. This smoke is specifically focused on visual stimulus quality and regression risk. The tutoring continuity after C08 is a separate roadmap issue and should not be reclassified in this phase.

Additional watch items:

- C07 should still expose C08 after completion if the human smoke traverses continuity.
- C08 post-completion terminal/transition behavior remains separate from table stimulus quality.
- Any stale local/dev 8-item instance should be treated as a stop condition for this smoke, not as a table-rendering failure.

## Scope safety

This phase is documentation/readiness only.

Not performed:

- No code changes.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No route-order/continuity changes.
- No study-load-content registry changes.
- No authoredFeedback changes.
- No DB mutation.
- No seed scripts.
- No fixtures.
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No secrets printed.

## Result

```text
M1_C07_C08_TABLE_STIMULUS_HUMAN_UI_SMOKE_READINESS_DEFINED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-STIMULUS-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Purpose:

```text
Execute and close the narrow human local/dev UI smoke for C07/C08 table stimulus rendering, documenting whether formatted table stimuli are visible, legible, coherent with stems/options/feedback, and non-regressive for submit/autoreporte/finalizar flow.
```
