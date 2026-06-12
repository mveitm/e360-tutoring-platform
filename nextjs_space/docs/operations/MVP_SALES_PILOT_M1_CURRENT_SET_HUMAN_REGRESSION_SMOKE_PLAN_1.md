# MVP-SALES-PILOT-M1-CURRENT-SET-HUMAN-REGRESSION-SMOKE-PLAN-1

## Purpose

Plan a focused human regression smoke for the current M1 set after recent PAES standard, table stimulus, visible correlative, completed-view and authoredFeedback repairs.

This is a documentation/readiness phase only. It does not execute smoke, modify code, mutate data, edit content, change UI, touch schema/Prisma, alter route-order/continuity, or open agentic behavior.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = bc3cd5a1ce7ee023f6596c11cf9d8d3a81e2bf9e
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = bc3cd5a1ce7ee023f6596c11cf9d8d3a81e2bf9e
```

## Source closeouts

Recent accepted source closeouts and standards:

- `MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md`
- `MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md`
- `MVP_UI_PAES_TABLE_STIMULUS_MINIMUM_1.md`
- `MVP_UI_PAES_TABLE_STIMULUS_COMPLETED_VIEW_REPAIR_1.md`
- `MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_STIMULUS_HUMAN_UI_SMOKE_CLOSEOUT_1.md`
- `MVP_SALES_PILOT_UX_CAPSULE_CORRELATIVE_HUMAN_UI_SMOKE_CLOSEOUT_1.md`
- `MVP_PEDAGOGY_M1_AUTHORED_FEEDBACK_BATCH_1_HUMAN_REVIEW_CLOSEOUT_1.md`
- `MVP_GOV_PAES_M1_CAPSULE_STANDARD_IMPACT_AUDIT_1.md`
- `MVP_GOV_PAES_M1_CAPSULE_STANDARD_REPAIR_BACKLOG_1.md`

Required context search was executed across `PHASE_LOG.md`, `nextjs_space/docs`, and `nextjs_space/lib`.

## Regression scope

This regression is intended to verify that recent repairs coexist safely in the student-facing M1 experience:

- ST M1 and `/now` navigation orientation;
- visible capsule correlatives on cards, capsule header, and completed view where available;
- completed capsule review opens without routing/session errors;
- C07/C08 `tableStimulus` is visible in completed view;
- C07/C08 table headers and rows are legible;
- authoredFeedback Batch 1 remains visible and understandable where accessible;
- brief feedback appears;
- complete feedback / paso a paso appears;
- feedback is not generic key-check only;
- no internal leakage, technical IDs, agentic claims or commercial claims appear;
- active/new flow submit, autoreporte and finalizar only if a safe active capsule exists;
- post-C08 continuity is recorded as an observation only and not re-decided in this smoke.

## M1 current set under review

Primary current route-order set:

| visible correlative | title | contentKey | regression focus |
| --- | --- | --- | --- |
| M1-C01 | Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | repaired Batch 1 authoredFeedback |
| M1-C02 | Ecuaciones lineales basicas | `paes_m1_linear_equations_basic` | feedback/completed review regression |
| M1-C03 | Problemas con ecuaciones lineales | `paes_m1_linear_equations_word_problems` | feedback/completed review regression |
| M1-C04 | Refuerzo de ecuaciones lineales | `paes_m1_linear_equations_reinforcement` | feedback/completed review regression; known start/refresh watch if active |
| M1-C05 | Funciones lineales basicas I | `paes_m1_linear_functions_basic` | feedback/correlative regression; known start/refresh watch if active |
| M1-C06 | Funciones lineales basicas II | `paes_m1_linear_functions_basic_ii` | feedback/correlative regression; q8 tableStimulus repair remains separate backlog |
| M1-C07 | Lectura de tablas y graficos I | `paes_m1_data_representation_entry` | tableStimulus completed-view regression |
| M1-C08 | Lectura de tablas y graficos II | `paes_m1_data_representation_entry_ii` | tableStimulus completed-view regression; post-C08 continuity observation |

Out-of-route-order legacy entries remain outside this regression unless the human explicitly reaches them through existing completed history:

- `paes_m1_numbers_percentage_proportionality_entry`;
- `paes_m1_geometry_area_measure_entry`.

## Smoke modes

### A) Completed-view review

Use for capsules already completed in local/dev.

Recommended coverage:

- open completed M1 capsules from ST M1 or available completed list;
- confirm visible correlative and title;
- confirm feedback breve and complete/paso a paso;
- confirm C07/C08 tables render as formatted tables in completed view;
- confirm no technical IDs or internal metadata are visible.

### B) Active/new capsule smoke

Use only if there is a safe active/new capsule already available or a future authorized fixture/access phase prepares one.

Recommended coverage:

- open capsule;
- press `Comenzar` only when appropriate;
- answer and submit if the human chooses to exercise the flow;
- verify feedback breve and complete/paso a paso;
- complete autoreporte and `Finalizar` only if the flow is intentionally exercised;
- record if unexpected F5/refresh is required after `Comenzar`.

### C) Document/text review

Use when UI access to M1-C01 or another capsule is not available.

Recommended coverage:

- compare documented/static feedback text with the checklist;
- record that UI visibility remains unverified if no UI path is used;
- do not mutate DB or create fixtures from this phase.

## Human regression checklist

### Block 1: UI orientation

- ST/card visible.
- Visible correlativo shown.
- Title correct.
- No DB ID, StudyLoad ID, contentKey, or other technical ID exposed.
- Completed capsule view opens when selected.

### Block 2: Visual stimulus

- C07/C08 tables visible in completed view.
- Table headers visible.
- Rows legible.
- No plain row-text confusion.
- Table data matches stem/options/feedback.
- Any graph/figure/visual debt is recorded without reclassifying this phase.

### Block 3: Feedback quality

- Brief feedback visible.
- Complete feedback / paso a paso visible.
- Feedback is understandable.
- Feedback is not key-check-only.
- Correct alternative is justified.
- Typical error or care point appears where relevant.
- No contradiction with stem/options/key/table.
- No internal leakage.
- No agentic/commercial claims.

### Block 4: Flow/regression

- Navigation works.
- Completed view opens.
- No session/routing error.
- If active capsule is used, submit works.
- If active capsule is used, autoreporte works.
- If active capsule is used, finalizar works.
- If active capsule is used, record whether `Comenzar` requires unexpected F5/refresh.

## Stop conditions

Stop and document if any occur:

- missing `tableStimulus`;
- missing visible correlative;
- feedback absent or key-check only;
- complete feedback absent;
- contradiction with key/stem/options/visual stimulus;
- internal leakage;
- technical IDs exposed;
- route/session error;
- stale 8-item instance appears;
- active flow requires unexpected F5 after `Comenzar`;
- content or UI regression affecting student use;
- reviewing requires DB mutation, fixture reset, route-order/continuity change, schema change, production/staging, or agentic behavior.

## Expected evidence format

Human report template:

```text
M1 current set regression smoke

Access mode:
completed view / active capsule / document review

UI orientation:
passed / blocked / notes

Visual stimulus:
passed / blocked / notes

Feedback:
passed / blocked / notes

Flow/navigation:
passed / blocked / notes

Unexpected behavior:
none / describe

Overall:
M1_CURRENT_SET_HUMAN_REGRESSION_SMOKE_PASSED / BLOCKED / UNEXPECTED_STATE
```

## Out-of-scope items

- no new repairs;
- no new authored coverage;
- no agentic;
- no continuity decision;
- no DB/schema;
- no production/staging;
- no route-order changes;
- no fixture mutation;
- no smoke execution in this phase;
- no browser automation or API-only tests.

Post-C08 continuity remains a separate roadmap issue. This regression may record what the UI shows after C08, but it must not decide the next tutoring route or mask continuity debt with terminal copy.

## Scope safety

Documentation/readiness only.

No code changes.
No UI changes.
No API changes.
No schema/DB/Prisma changes.
No route-order/continuity changes.
No study-load-content registry changes.
No authoredFeedback changes.
No visual stimulus content changes.
No correctOptionKey/contentKey/item count/ordering/stem/option/tableStimulus changes.
No DB mutation.
No browser automation.
No API-only tests.
No build.
No production/staging.
No agentic layer opened.
No secrets printed.

## Result

```text
M1_CURRENT_SET_HUMAN_REGRESSION_SMOKE_PLAN_READY
```

## Next recommended phase

```text
MVP-SALES-PILOT-M1-CURRENT-SET-HUMAN-REGRESSION-SMOKE-CLOSEOUT-1
```

Reason:

```text
The next phase should record the human regression result after the user executes the focused M1 current-set checklist.
```
