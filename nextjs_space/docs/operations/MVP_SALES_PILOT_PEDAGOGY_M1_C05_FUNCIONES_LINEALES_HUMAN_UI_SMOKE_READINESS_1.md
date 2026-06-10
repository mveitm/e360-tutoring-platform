# MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-HUMAN-UI-SMOKE-READINESS-1

## Purpose

Prepare a documentation-only readiness package for a future human local/dev UI smoke of:

```text
M1-C05 - Funciones lineales basicas
```

The future smoke should verify that authoredFeedback added in:

```text
M1_C05_FUNCIONES_LINEALES_AUTHORED_FEEDBACK_IMPLEMENTED
```

is visible through the existing student UI after answer submission.

This phase does not execute the smoke and does not modify code, UI, API, schema, DB, Prisma, continuity, route-order, fixtures, or runtime data.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 4d7d70ac869ca725b2878bc1c78bd7a404429270
```

Accepted prior commit:

```text
4d7d70a MVP-SALES-PILOT-PEDAGOGY-M1: add C05 Funciones lineales authored feedback
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 4d7d70ac869ca725b2878bc1c78bd7a404429270
git rev-parse origin/main: 4d7d70ac869ca725b2878bc1c78bd7a404429270
git rev-parse origin/HEAD: 4d7d70ac869ca725b2878bc1c78bd7a404429270
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Prior authoredFeedback implementation

Prior implementation phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-AUTHORED-FEEDBACK-1
```

Prior implementation result:

```text
M1_C05_FUNCIONES_LINEALES_AUTHORED_FEEDBACK_IMPLEMENTED
```

Target:

```text
visible correlativo: M1-C05
title: PAES M1 - Funciones lineales basicas
contentKey: paes_m1_linear_functions_basic
item count: 8
keys: q1 B, q2 B, q3 A, q4 C, q5 D, q6 A, q7 B, q8 C
```

Static confirmation:

```text
q1-q8 have authoredFeedback using briefId, completeId, version, brief, complete.
```

The future human smoke below is scoped to the q1-q4 feedback path requested for this readiness phase.

## Human UI smoke checklist

Future human local/dev UI smoke checklist:

```text
Target:
M1-C05 - Funciones lineales basicas
contentKey: paes_m1_linear_functions_basic
```

Steps:

1. Open ST M1 or the current visible local/dev route.
2. Confirm `M1-C05 - Funciones lineales basicas` appears as the next capsule.
3. Open the capsule.
4. Confirm the title and visible correlativo if the UI displays them.
5. Press `Comenzar`.
6. Answer q1-q4.
7. Send responses.
8. Verify brief feedback is visible for q1-q4.
9. Verify the step-by-step button/action is visible for q1-q4.
10. Open complete feedback for q1-q4.
11. Verify complete feedback is visible for q1-q4.
12. Verify self-report remains separate from response submission.
13. Answer the self-report.
14. Press `Finalizar capsula`.
15. Confirm terminal/completed state.
16. Return to ST M1.
17. Record the next visible capsule.

Evidence to record without secrets:

```text
- Whether M1-C05 was visible.
- Whether M1-C05 opened.
- Whether Comenzar started the questions without blocking.
- Whether q1-q4 could be answered and submitted.
- Whether q1-q4 brief feedback appeared.
- Whether q1-q4 paso-a-paso action appeared.
- Whether q1-q4 complete feedback opened and was readable.
- Whether self-report was separate.
- Whether Finalizar capsula completed the capsule.
- Whether terminal/completed state appeared.
- Next visible capsule after completion.
- Any non-secret UX issue or mismatch.
```

If the UI requires q5-q8 before allowing submission, the human should stop and report that requirement rather than expanding this q1-q4 checklist inside the same smoke.

## Stop conditions

Stop and report without continuing if any of these occurs:

- Only key-check feedback appears instead of authored brief feedback.
- The step-by-step button/action is missing.
- Complete feedback does not open.
- Another capsule opens instead of `M1-C05 - Funciones lineales basicas`.
- The app redirects to login unexpectedly.
- The app redirects to an unexpected route.
- The session is lost.
- Internal claims or implementation details appear in the student UI.
- Sales-Ready claims appear.
- Adaptive AI claims appear.
- There is an inconsistency in visible correlativo.
- The UI requires answering q5-q8 before q1-q4 feedback can be checked.
- A data mutation, fixture prep, DB reset, seed, browser automation, or API-only path would be needed to proceed.

## Expected result

Expected future human smoke result:

```text
M1-C05 - Funciones lineales basicas displays authored brief feedback and complete/paso-a-paso feedback for q1-q4 after submission, preserves separate self-report and completion flow, reaches terminal/completed state, and surfaces the next visible capsule after finalization.
```

Expected next visible capsule based on current correlativo/continuity documentation:

```text
M1-C06 - Lectura de tablas y graficos
```

The human should still record the actual next visible capsule rather than assuming it.

## Scope safety

This phase is documentation-only.

Not performed:

- No human UI smoke executed.
- No code changes.
- No UI/API changes.
- No schema/DB/Prisma changes.
- No registry changes.
- No continuity or route-order changes.
- No data mutation.
- No fixture mutation.
- No DB reset.
- No seed scripts.
- No migration.
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No secrets printed.
- No Sales-Ready or adaptive AI claim.

## Result

```text
M1_C05_FUNCIONES_LINEALES_HUMAN_UI_SMOKE_READINESS_DEFINED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Purpose:

```text
Record the human local/dev UI smoke result for M1-C05 - Funciones lineales basicas, including q1-q4 brief feedback, paso-a-paso/complete feedback, self-report, completion state, ST return, and next visible capsule.
```
