# MVP-SALES-PILOT-PEDAGOGY-M1-C08-LECTURA-TABLAS-GRAFICOS-II-HUMAN-UI-SMOKE-READINESS-1

## Purpose

Prepare documentation/readiness for a future human local/dev UI smoke of:

```text
M1-C08 - Lectura de tablas y graficos II
```

This phase does not execute the human smoke. It defines the evidence basis, checklist, expected result, stop conditions, and UX watch after the C07/C08 split, authoredFeedback, continuity/route-order, local/dev alignment, and table-text content repair phases.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 65de21258288283c1e644df93dcca4bd29921af1
```

Accepted prior commit:

```text
65de212 MVP-SALES-PILOT-PEDAGOGY-M1: repair C07 C08 table text content
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 65de21258288283c1e644df93dcca4bd29921af1
git rev-parse origin/main: 65de21258288283c1e644df93dcca4bd29921af1
git rev-parse origin/HEAD: 65de21258288283c1e644df93dcca4bd29921af1
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Prior split/authoredFeedback/route-order/data/content repair

Prior phases carried forward:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-LECTURA-TABLAS-GRAFICOS-SPLIT-CODE-1
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-LECTURA-TABLAS-GRAFICOS-AUTHORED-FEEDBACK-1
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-CONTINUITY-ROUTE-ORDER-CODE-1
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-LOCAL-DEV-DATA-ALIGNMENT-1
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-TEXT-CONTENT-REPAIR-1
```

Readiness chain:

- Split created C08 II as `PAES M1 - Lectura de tablas y graficos II` with `contentKey` `paes_m1_data_representation_entry_ii`.
- authoredFeedback added feedback breve and complete feedback to C08 q5-q8.
- Route-order/continuity maps C07 I completion to C08 II creation/reuse.
- LOCAL_DEV alignment prepared C07 I and intentionally did not precreate C08 II; C08 II should appear after C07 I completion.
- C07 human smoke closeout reported C08 II as the next visible capsule.
- Table-text content repair added visible textual tables to C08 q5-q8.

## C08 II readiness basis

C08 II static registry basis:

```text
title: PAES M1 - Lectura de tablas y graficos II
visible correlativo: M1-C08 - Lectura de tablas y graficos II
contentKey: paes_m1_data_representation_entry_ii
item count: 4
registry item keys: q5, q6, q7, q8
UI checklist ordinal: q1, q2, q3, q4
correctOptionKey order: C/B/B/A
authoredFeedback: present on all 4 items
```

Pedagogical standard compliance:

- Maximum 4 exercises: satisfied.
- Visible textual table or sufficient data: satisfied on all four C08 items.
- authoredFeedback per question: satisfied.
- Feedback breve: satisfied.
- Feedback completo / paso a paso: satisfied through authored complete feedback.
- No internal leakage was found in the reviewed C08 student-facing content.
- Correlativo visible target is current: M1-C08 - Lectura de tablas y graficos II.

## Human UI smoke checklist

Human local/dev checklist for `M1-C08 - Lectura de tablas y graficos II`:

1. Open ST M1 or `/now`.
2. Confirm that M1-C08 appears as the next capsule.
3. Open the capsule.
4. Confirm title/correlativo if visible.
5. Confirm the old stale 8-exercise instance does not open.
6. Confirm the capsule has maximum 4 exercises.
7. Confirm the textual table or required data is visible in each exercise.
8. Press `Comenzar`.
9. Confirm exercises appear without requiring F5/refresh.
10. Answer UI questions q1-q4.
11. Submit answers.
12. Verify brief feedback for q1-q4.
13. Verify the step-by-step action/button for q1-q4.
14. Open complete feedback for q1-q4.
15. Verify self-report is separate from answer submission.
16. Answer self-report.
17. Press `Finalizar capsula`.
18. Confirm terminal/completed state.
19. Return to ST M1.
20. Record the next visible capsule.

Mapping note:

```text
The UI should present four visible questions. Static registry keys are q5-q8 because C08 II came from the second half of the original split; the human checklist may record them as UI q1-q4.
```

## Stop conditions

Stop the smoke and report if any of these occur:

- An 8-exercise instance appears.
- A textual table or required data is missing.
- Feedback is only key-check feedback.
- The step-by-step button/action is missing.
- Complete feedback does not open.
- Another capsule opens instead of C08 II.
- The flow redirects to login or an unexpected route.
- The session is lost.
- Internal claims, Sales-Ready claims, or adaptive AI claims appear.
- A severe visible-correlativo inconsistency appears.
- F5/refresh is required again to show exercises after `Comenzar`.

## Expected result

Expected human-smoke result if checklist passes:

```text
M1_C08_LECTURA_TABLAS_GRAFICOS_II_HUMAN_UI_SMOKE_PASSED
```

Minimum evidence to record in the future closeout:

- next capsule visibility before opening;
- title/correlativo observed;
- item count observed;
- table-text visibility;
- start/resume behavior;
- brief feedback visibility;
- step-by-step / complete feedback behavior;
- self-report and finalization behavior;
- terminal/completed state;
- next visible capsule after return to ST M1.

## Known UX watch

Start/resume refresh issue was diagnosed, corrected, and validated in C07. If F5/refresh is required again after `Comenzar`, treat it as a regression.

## Scope safety

This phase is documentation/readiness only.

Not performed:

- No human smoke executed.
- No code files modified.
- No UI files modified.
- No API files modified.
- No schema/DB/Prisma files modified.
- No continuity or route-order files modified.
- No seed scripts modified.
- No fixtures modified.
- No DB mutation.
- No DB reset.
- No migration.
- No production/staging.
- No browser automation.
- No API-only tests.
- No build.
- No secrets printed.

## Result

```text
M1_C08_LECTURA_TABLAS_GRAFICOS_II_HUMAN_UI_SMOKE_READINESS_DEFINED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C08-LECTURA-TABLAS-GRAFICOS-II-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Purpose:

```text
Record the human local/dev UI smoke result for M1-C08 after the human executes the checklist, without Codex browser automation or DB mutation.
```
