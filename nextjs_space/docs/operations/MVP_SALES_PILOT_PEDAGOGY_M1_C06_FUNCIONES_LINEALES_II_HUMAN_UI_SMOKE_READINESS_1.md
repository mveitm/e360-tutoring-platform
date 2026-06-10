# MVP-SALES-PILOT-PEDAGOGY-M1-C06-FUNCIONES-LINEALES-II-HUMAN-UI-SMOKE-READINESS-1

## Purpose

Prepare documentation/readiness for future human local/dev UI smoke of:

```text
M1-C06 - Funciones lineales basicas II
```

This phase does not execute the smoke. It defines the human checklist and stop conditions after M1-C05 - Funciones lineales basicas I passed smoke with a non-blocking refresh/F5 UX issue.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 8294ee93d833b0d11f01c43b72bb7c8be001b627
```

Accepted prior commit:

```text
8294ee9 MVP-SALES-PILOT-PEDAGOGY-M1: close C05 I UI smoke
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 8294ee93d833b0d11f01c43b72bb7c8be001b627
git rev-parse origin/main: 8294ee93d833b0d11f01c43b72bb7c8be001b627
git rev-parse origin/HEAD: 8294ee93d833b0d11f01c43b72bb7c8be001b627
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Prior C05 I smoke result

Prior phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-I-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Result:

```text
M1_C05_I_HUMAN_UI_SMOKE_CLOSEOUT_PASSED_WITH_NON_BLOCKING_REFRESH_UX_ISSUE
```

Human report summary:

```text
M1-C05 - Funciones lineales basicas I passed human local/dev UI smoke.
Item count was correct at 4 exercises.
Brief feedback, step-by-step action, complete feedback, self-report/finalization, and final state were OK.
```

Known non-blocking issue from C05 I:

```text
Pressing Comenzar required F5 / refresh before exercises appeared.
```

## C06 II readiness basis

Registry target:

```text
title: PAES M1 - Funciones lineales basicas II
visible correlativo: M1-C06 - Funciones lineales basicas II
contentKey: paes_m1_linear_functions_basic_ii
contentVersion: v1
program: PAES_M1
item count: 4
```

Registry item inventory:

| registry item | correctOptionKey | focus |
| --- | --- | --- |
| q5 | D | Match slope 4 and intercept -1 to `y = 4x - 1`. |
| q6 | A | Model fixed plus hourly cost as `C(h) = 1000 + 500h`. |
| q7 | B | Evaluate `f(x) = -x + 9` at `x = 3`. |
| q8 | C | Infer `y = 3x + 1` from a small linear table. |

Feedback readiness:

```text
authoredFeedback present on q5-q8.
briefId present on q5-q8.
completeId present on q5-q8.
version present on q5-q8.
brief present on q5-q8.
complete present on q5-q8.
```

Pedagogical standard compliance:

```text
M1 maximum: 4 exercises per capsule
C06 II item count: 4
feedback breve: present
feedback completo / paso a paso: present
internal leakage: not identified in static readiness review
correlativo visible: M1-C06 - Funciones lineales basicas II
```

Continuity basis:

```text
M1-C05 - Funciones lineales basicas I
-> M1-C06 - Funciones lineales basicas II
-> PAES M1 - Lectura de tablas y graficos
```

Operational note:

```text
C06 II was not precreated during local/dev data alignment. It should be created or reused by continuity after C05 I completion.
```

## Human UI smoke checklist

Human checklist for local/dev UI smoke:

```text
M1-C06 - Funciones lineales basicas II
```

- Open ST M1 or `/now`.
- Confirm that M1-C06 appears as the next capsule.
- Open the capsule.
- Confirm title/correlativo visible if shown.
- Confirm it is not the stale 8-exercise instance.
- Confirm maximum 4 exercises.
- Press `Comenzar`.
- If questions do not appear after `Comenzar`, record whether F5 / refresh is required.
- Answer the four displayed exercises.
- Submit answers.
- Verify brief feedback for all four exercises.
- Verify step-by-step button/action for all four exercises.
- Open complete feedback for all four exercises.
- Verify self-report remains separate from answer submission.
- Complete self-report.
- Press `Finalizar capsula`.
- Confirm terminal/completed state.
- Return to ST M1.
- Record the next visible capsule.

## Stop conditions

Stop human smoke and report if any of these occur:

- An 8-exercise instance appears.
- Only key-check feedback appears.
- The step-by-step button/action is missing.
- Complete feedback does not open.
- A different capsule opens.
- The UI redirects to login unexpectedly.
- The UI redirects to an unexpected route.
- Session is lost.
- Internal claims, Sales-Ready claims, or adaptive AI claims appear.
- There is a severe visible-correlativo inconsistency.

## Expected result

Expected successful result:

```text
M1-C06 - Funciones lineales basicas II is visible/openable.
The capsule has 4 exercises.
Brief feedback appears after submission.
Step-by-step / complete feedback works for all exercises.
Self-report and finalization work.
The capsule reaches completed state.
The next visible capsule is recorded.
```

If this passes, close with:

```text
M1_C06_FUNCIONES_LINEALES_II_HUMAN_UI_SMOKE_PASSED
```

If the only issue is the known refresh/F5 behavior and the flow completes after refresh, close with a passed-with-non-blocking-refresh-UX classification in the future closeout phase.

## Known UX watch

There is a recurrent UX issue:

```text
After pressing "Comenzar", some capsules require F5 / refresh before exercises appear.
```

If this occurs in M1-C06, record it as a non-blocking refresh UX issue if the flow continues correctly after refresh. This should remain a future narrow UI follow-up and should not block C06 II smoke unless the flow cannot continue.

## Scope safety

This phase is documentation-only.

Not performed:

- No human smoke execution.
- No code changes.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No route-order or continuity changes.
- No registry changes.
- No authoredFeedback changes.
- No seed scripts.
- No fixtures.
- No DB mutation.
- No browser automation.
- No API-only tests.
- No production/staging.
- No secrets printed.

## Result

```text
M1_C06_FUNCIONES_LINEALES_II_HUMAN_UI_SMOKE_READINESS_DEFINED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C06-FUNCIONES-LINEALES-II-HUMAN-UI-SMOKE-CLOSEOUT-1
```

That phase should be created only after the human performs the local/dev UI smoke and reports the result.
