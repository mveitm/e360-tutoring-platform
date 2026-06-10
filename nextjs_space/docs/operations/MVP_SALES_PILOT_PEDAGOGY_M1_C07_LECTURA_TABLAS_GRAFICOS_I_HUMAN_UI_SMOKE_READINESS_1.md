# MVP-SALES-PILOT-PEDAGOGY-M1-C07-LECTURA-TABLAS-GRAFICOS-I-HUMAN-UI-SMOKE-READINESS-1

## Purpose

Prepare documentation/readiness for a future human local/dev UI smoke of:

```text
M1-C07 - Lectura de tablas y graficos I
```

This phase does not execute human smoke, modify code, mutate DB, or touch UI/API/schema/Prisma/continuity/route-order.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 4cc55fa88b10660e7b610689c7f61a80dc12d7da
```

Accepted prior commit:

```text
4cc55fa MVP-SALES-PILOT-PEDAGOGY-M1: align C07 C08 local dev data
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 4cc55fa88b10660e7b610689c7f61a80dc12d7da
git rev-parse origin/main: 4cc55fa88b10660e7b610689c7f61a80dc12d7da
git rev-parse origin/HEAD: 4cc55fa88b10660e7b610689c7f61a80dc12d7da
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Prior split/authoredFeedback/route-order/data alignment

Prior split:

```text
M1-C07 - Lectura de tablas y graficos I
contentKey: paes_m1_data_representation_entry
items: q1-q4

M1-C08 - Lectura de tablas y graficos II
contentKey: paes_m1_data_representation_entry_ii
items: q5-q8
```

Prior authoredFeedback:

```text
C07 q1-q4: authoredFeedback present
C08 q5-q8: authoredFeedback present
```

Prior route-order/continuity:

```text
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
paes_m1_data_representation_entry -> paes_m1_data_representation_entry_ii
```

Prior LOCAL_DEV data alignment:

```text
legacy 8-item Lectura load retired from active path
C07 I aligned as pending
C08 II not precreated
```

## C07 I readiness basis

C07 I readiness evidence:

```text
visible correlativo: M1-C07 - Lectura de tablas y graficos I
registry title: PAES M1 - Lectura de tablas y graficos I
contentKey: paes_m1_data_representation_entry
item count: 4
correctOptionKey order: D/B/C/A
authoredFeedback: present on q1-q4
feedback breve: present on q1-q4
feedback completo / paso a paso: present on q1-q4
LOCAL_DEV start state: pending after stale-data alignment
```

Pedagogical standard compliance:

```text
M1 maximum 4 exercises: satisfied
No key-check-only feedback expected
No internal leakage expected
No Sales-Ready or adaptive AI claim expected
```

## Human UI smoke checklist

Human local/dev checklist:

- Open ST M1 or `/now`.
- Confirm M1-C07 appears as the next capsule.
- Open the capsule.
- Confirm visible title/correlativo if displayed.
- Confirm the old 8-exercise stale instance does not open.
- Confirm maximum 4 exercises.
- Press `Comenzar`.
- Confirm exercises appear without requiring F5/refresh unless a UX regression is detected.
- Answer q1-q4.
- Submit answers.
- Verify feedback breve q1-q4.
- Verify step-by-step / paso-a-paso action q1-q4.
- Open complete feedback q1-q4.
- Verify self-report is separate from answer submission.
- Answer self-report.
- Press `Finalizar capsula`.
- Confirm terminal/completed state.
- Return to ST M1.
- Record the next visible capsule.

## Stop conditions

Stop the human smoke and do not answer/submit/finalize if:

- an 8-exercise instance appears;
- feedback is only key-check fallback;
- no step-by-step / paso-a-paso action appears;
- complete feedback does not open;
- another capsule opens;
- the app redirects to login or an unexpected route;
- session is lost;
- internal claims, Sales-Ready claims, or adaptive AI claims appear;
- there is a severe visible correlativo inconsistency;
- F5/refresh is again required after `Comenzar` to show exercises.

## Expected result

Expected human result:

```text
M1-C07 - Lectura de tablas y graficos I can be completed in local/dev with 4 exercises, authoredFeedback breve/completo, separate self-report, terminal completed state, and continuity toward M1-C08 - Lectura de tablas y graficos II.
```

Expected classification after a successful future smoke:

```text
M1_C07_LECTURA_TABLAS_GRAFICOS_I_HUMAN_UI_SMOKE_PASSED
```

## Known UX watch

The StudyLoad start/resume refresh issue was diagnosed and a fix was implemented before this phase.

If F5/refresh is again required after pressing `Comenzar`, treat it as a regression or incomplete fix and stop the smoke for documentation before continuing.

## Scope safety

This phase is documentation-only.

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
M1_C07_LECTURA_TABLAS_GRAFICOS_I_HUMAN_UI_SMOKE_READINESS_DEFINED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-LECTURA-TABLAS-GRAFICOS-I-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Purpose:

```text
Close/document the human local/dev smoke result for M1-C07 - Lectura de tablas y graficos I, including item count, authoredFeedback, completion, next visible capsule, and any UX regression.
```
