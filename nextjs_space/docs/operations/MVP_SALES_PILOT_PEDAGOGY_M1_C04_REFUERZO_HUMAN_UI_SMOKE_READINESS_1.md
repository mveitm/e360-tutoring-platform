# MVP-SALES-PILOT-PEDAGOGY-M1-C04-REFUERZO-HUMAN-UI-SMOKE-READINESS-1

## Purpose

Define readiness for a future human local/dev UI smoke of:

```text
M1-C04 - Refuerzo de ecuaciones lineales
```

The smoke should verify that the repaired authoredFeedback is visible and usable in the student UI, then continue through self-report, `Finalizar capsula`, terminal/completed state, and the next visible M1 capsule.

This phase does not execute the smoke. It only prepares the human checklist and stop conditions.

## Baseline

```text
HEAD = origin/main = origin/HEAD = c95363a95bc897af482380b009cc312ccffe29e0
```

Baseline commit:

```text
c95363a MVP-SALES-PILOT-PEDAGOGY-M1: add C04 Refuerzo authored feedback
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: c95363a95bc897af482380b009cc312ccffe29e0
git rev-parse origin/main: c95363a95bc897af482380b009cc312ccffe29e0
git rev-parse origin/HEAD: c95363a95bc897af482380b009cc312ccffe29e0
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned with the expected baseline before documentation edits.

## Prior authoredFeedback implementation

Prior phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C04-REFUERZO-AUTHORED-FEEDBACK-1
```

Prior result:

```text
M1_C04_REFUERZO_AUTHORED_FEEDBACK_IMPLEMENTED
```

Static target confirmed:

```text
visible correlativo: M1-C04
title: PAES M1 - Refuerzo de ecuaciones lineales
contentKey: paes_m1_linear_equations_reinforcement
item count: 4
item order: q1, q2, q3, q4
keys: q1 A, q2 B, q3 C, q4 B
```

The prior implementation added `authoredFeedback` to q1-q4 using the existing registry shape:

```ts
authoredFeedback: {
  briefId: string,
  completeId: string,
  version: string,
  brief: string,
  complete: string,
}
```

The implementation report states that stems, options, `correctOptionKey`, `contentKey`, ordering, M1-C03, M1-C05, M1-C06, UI, API, schema, DB, Prisma, continuity, and route-order were preserved.

## Human UI smoke checklist

Future human local/dev smoke steps:

1. Open ST M1 or the current visible local/dev M1 student route.
2. Confirm that `M1-C04 - Refuerzo de ecuaciones lineales` appears as the next capsule.
3. Open the capsule.
4. Confirm title/correlativo if visible.
5. Press `Comenzar`.
6. Answer q1-q4.
7. Submit responses.
8. Verify brief feedback for q1-q4.
9. Verify that the `paso a paso` button/action appears for q1-q4.
10. Open complete feedback / paso a paso for q1-q4.
11. Verify that self-report remains separate from feedback.
12. Answer self-report.
13. Press `Finalizar capsula`.
14. Confirm terminal/completed state.
15. Return to ST M1.
16. Record the next visible capsule.

Recommended human observation format:

```text
M1_C04_REFUERZO_HUMAN_UI_SMOKE_OBSERVATION

A) STARTED_FROM_ST_M1_OR_VISIBLE_ROUTE: YES / NO
B) M1_C04_REFUERZO_VISIBLE_AS_NEXT_CAPSULE: YES / NO
C) OPENED_EXPECTED_CAPSULE: YES / NO
D) TITLE_OR_CORRELATIVO_VISIBLE: YES / NO / PARTIAL
E) COMENZAR_ACCEPTED: YES / NO
F) Q1_Q4_SUBMITTED: YES / NO
G) BRIEF_FEEDBACK_Q1_Q4_VISIBLE: YES / NO
H) PASO_A_PASO_ACTION_Q1_Q4_VISIBLE: YES / NO
I) COMPLETE_FEEDBACK_Q1_Q4_VISIBLE: YES / NO
J) SELF_REPORT_SEPARATE_FROM_FEEDBACK: YES / NO
K) FINALIZAR_CAPSULA_ACCEPTED: YES / NO
L) TERMINAL_OR_COMPLETED_STATE_VISIBLE: YES / NO / UNKNOWN
M) NEXT_VISIBLE_CAPSULE_AFTER_COMPLETION: <non-secret text>
N) INTERNAL_OR_PROHIBITED_CLAIMS_VISIBLE: YES / NO
O) NON_SECRET_ERROR_TEXT: NONE / <brief non-secret text>
```

## Stop conditions

Stop the future human smoke and report the observation if:

- Only key-check feedback appears, such as `Tu respuesta` / `Respuesta correcta`, without pedagogical authoredFeedback.
- The `paso a paso` button/action does not appear.
- Complete feedback / paso a paso does not open.
- A different capsule opens.
- The route redirects to login or an unexpected route.
- The local/dev session is lost.
- Internal implementation notes, raw rationale, key-validation notes, source-finalization notes, Sales-Ready claims, or adaptive AI claims appear.
- The visible correlativo is inconsistent with `M1-C04 - Refuerzo de ecuaciones lineales`.
- Continuing would require DB mutation, API-only testing, browser automation, production/staging, secrets, or code changes.

## Expected result

Expected future smoke result if UI behavior matches the authoredFeedback implementation:

```text
M1_C04_REFUERZO_HUMAN_UI_SMOKE_PASS
```

Pass expectations:

- M1-C04 Refuerzo opens from the visible M1 flow.
- q1-q4 response submission works.
- q1-q4 brief feedback is visible.
- q1-q4 complete / paso-a-paso feedback is visible.
- Feedback remains separate from self-report/completion.
- Self-report and `Finalizar capsula` complete the capsule normally.
- Terminal/completed state is visible.
- Next visible capsule is recorded.
- No internal leakage or prohibited claims appear.

## Scope safety

This readiness phase is documentation-only.

Not performed:

- No human smoke executed.
- No code changes.
- No UI/API changes.
- No schema/DB/Prisma changes.
- No data mutation.
- No continuity or route-order changes.
- No registry changes.
- No browser automation.
- No API-only tests.
- No DB reset.
- No seed scripts.
- No fixture mutation.
- No production/staging.
- No secrets printed.
- No Sales-Ready or adaptive AI claims.

## Result

```text
M1_C04_REFUERZO_HUMAN_UI_SMOKE_READINESS_DEFINED
```

## Next recommended phase

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C04-REFUERZO-HUMAN-UI-SMOKE-1
```

Purpose:

```text
Execute a human local/dev UI smoke of M1-C04 - Refuerzo de ecuaciones lineales using the readiness checklist, verifying authoredFeedback brief/complete display, self-report, Finalizar capsula, terminal/completed state, and next visible capsule, without code/API/DB changes or browser automation.
```
