# MVP-SALES-PILOT-PEDAGOGY-M1-C08-NEXT-CAPSULE-OR-CYCLE-END-DIAGNOSIS-1

## Purpose

Diagnose the post-smoke local/dev state after:

```text
M1-C08 - Lectura de tablas y graficos II
```

The prior human closeout reported that C08 passed the main UI smoke path, but on return to ST M1 a completed-capsule container was shown instead of a next capsule. This phase determines whether the observation indicates expected sequence end, unclear terminal UI, route-order gap, continuity/display gap, or stale local/dev data.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = dba1c61fbec95cfe323d3837a2c3e6020646625f
```

Accepted prior commit:

```text
dba1c61 MVP-SALES-PILOT-PEDAGOGY-M1: close C08 tables graphs II smoke
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: dba1c61fbec95cfe323d3837a2c3e6020646625f
git rev-parse origin/main: dba1c61fbec95cfe323d3837a2c3e6020646625f
git rev-parse origin/HEAD: dba1c61fbec95cfe323d3837a2c3e6020646625f
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Triggering observation

Prior closeout:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C08_LECTURA_TABLAS_GRAFICOS_II_HUMAN_UI_SMOKE_CLOSEOUT_1.md
```

Prior result:

```text
M1_C08_HUMAN_UI_SMOKE_CLOSEOUT_PASSED_WITH_NEXT_CAPSULE_DISPLAY_GAP
```

Human observation carried forward:

```text
M1-C08 - Lectura de tablas y graficos II passed smoke.
On return to ST M1, no next capsule was observed.
A completed-capsule container was observed.
Table data remains present as text rows, but not visually formatted as tables.
```

## Current M1 sequence state

Static route-order/continuity evidence from `nextjs_space/lib/study-load-continuity.ts`:

```text
paes_m1_balanced_entry_initial -> paes_m1_linear_equations_basic
paes_m1_linear_equations_basic -> paes_m1_linear_equations_word_problems
paes_m1_linear_equations_word_problems -> paes_m1_linear_equations_reinforcement
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
paes_m1_linear_functions_basic -> paes_m1_linear_functions_basic_ii
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
paes_m1_data_representation_entry -> paes_m1_data_representation_entry_ii
```

No next content key is currently mapped after:

```text
paes_m1_data_representation_entry_ii
```

The continuity helper behavior is therefore:

```text
Completing C08 II returns end_of_sequence for contentKey paes_m1_data_representation_entry_ii.
```

## C08 completion context

C08 target:

```text
visible correlativo: M1-C08 - Lectura de tablas y graficos II
registry title: PAES M1 - Lectura de tablas y graficos II
contentKey: paes_m1_data_representation_entry_ii
item count: 4
correctOptionKey order: C/B/B/A
```

Prior continuity code explicitly documented:

```text
C08 II terminal/future-next behavior remains a later route-order decision.
```

The local/dev data alignment phase prepared C07 I and did not precreate C08 II. C08 II was expected to be created or reused by continuity after C07 completion, which the human flow reached. No read-only evidence in this phase indicates stale local/dev data as the primary cause of the observed post-C08 display.

## Next capsule / cycle-end diagnosis

Diagnosis options:

| option | finding |
| --- | --- |
| A) current cycle ended correctly | Partially yes: the current static sequence has no next C08 successor, so no next StudyLoad is expected from existing rule-based continuity. |
| B) terminal cycle state needs clearer display | Yes: ST M1 shows a completed-capsule card, not a clear sequence/cycle terminal state. |
| C) continuity/display gap for next capsule | Not supported as the primary diagnosis because no next contentKey is currently defined after C08 II. |
| D) local/dev stale or incomplete data | Not supported by static evidence; prior human smoke reached and completed C08 II. |

Classification:

```text
CYCLE_END_EXPECTED_UI_NEEDS_CLEAR_TERMINAL_STATE
```

Operational result:

```text
M1_C08_NEXT_DIAGNOSIS_CYCLE_END_EXPECTED_UI_TERMINAL_STATE_NEEDED
```

## UI state interpretation

Static UI evidence from `nextjs_space/app/study/paes-m1/page.tsx`:

```text
pickCurrentCapsule first selects in_progress, then pending, then latest completed.
CurrentCapsuleCard labels completed currentCapsule as "Capsula completada".
```

Therefore, when the cycle has no pending or in-progress StudyLoad after C08, ST M1 will select the latest completed StudyLoad and present a completed-capsule review container.

Interpretation:

```text
The observed completed-capsule container is consistent with current UI selection logic when the static continuity sequence reaches end_of_sequence. It is not a strong signal that a next capsule failed to display. The product gap is that the UI does not clearly state that the current sequence/cycle block has reached its end or needs tutor/admin review before the next action.
```

## Product impact

Impact assessment:

- Does it block continuity of the student? Not in the sense of a missing mapped next capsule, because C08 II currently has no defined successor.
- Does it require changing UI to show cycle completed / terminal state? Yes, recommended.
- Does it require creating the next cycle/capsule now? Not from current static route-order evidence; that requires a separate product/pedagogical decision.
- Does it require route-order now? Not immediately. A route-order phase is only needed if direction decides a concrete next capsule should follow C08 II in the same sequence.
- Does it require local/dev data alignment? Not supported by this read-only/static diagnosis.
- Does it require documentation/handoff? Yes. The immediate next work should define a clearer terminal/transition state for the student after C08.

Non-blocking carried debt:

```text
Tables are present as text rows but not visually formatted as rendered tables.
```

This remains a separate UI/content formatting follow-up.

## Scope safety

This phase was documentation/read-only.

Not performed:

- No code changes.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No continuity or route-order changes.
- No seed scripts.
- No fixtures.
- No DB mutation.
- No DB reset.
- No migration.
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No secrets printed.
- No Sales-Ready or adaptive AI claim.

## Result

```text
M1_C08_NEXT_DIAGNOSIS_CYCLE_END_EXPECTED_UI_TERMINAL_STATE_NEEDED
```

## Next recommended phase

Recommended option:

```text
A) UI/UX phase to show clear cycle terminal state.
```

Recommended next phase:

```text
MVP-SALES-PILOT-UX-M1-CYCLE-END-TERMINAL-STATE-COPY-1
```

Purpose:

```text
Show a clear student-facing terminal/transition state when the current M1 sequence has no pending or in-progress next capsule, distinguishing "review completed capsule" from "cycle block completed / awaiting next tutor action".
```

Secondary later phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-RENDERING-UI-FORMATTING-1
```

Purpose:

```text
Render or format the existing C07/C08 table-text data as visually readable tables without changing schema or answer keys.
```
