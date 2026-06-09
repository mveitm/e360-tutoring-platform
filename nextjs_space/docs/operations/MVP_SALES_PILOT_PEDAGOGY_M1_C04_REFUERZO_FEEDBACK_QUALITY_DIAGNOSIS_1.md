# MVP-SALES-PILOT-PEDAGOGY-M1-C04-REFUERZO-FEEDBACK-QUALITY-DIAGNOSIS-1

## Purpose

Diagnose the feedback quality state of:

```text
M1-C04 - Refuerzo de ecuaciones lineales
```

after visible correlativo renumbering documented in:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_VISIBLE_CORRELATIVE_RENUMBERING_DOC_1.md
```

The goal is to determine whether M1-C04 Refuerzo has sufficient `authoredFeedback` before asking the human to start or complete it in local/dev UI.

This phase is documentation/read-only. It does not modify code, mutate data, execute smoke, start the app, use browser automation, call APIs, or change UI/API/schema/DB/Prisma/continuity/route-order.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = c31785ededfda5a1e1f8d7f24a963ad4c67217a0
```

Accepted prior commit:

```text
c31785e MVP-SALES-PILOT-PEDAGOGY-M1: document visible correlativo renumbering
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: c31785ededfda5a1e1f8d7f24a963ad4c67217a0
git rev-parse origin/main: c31785ededfda5a1e1f8d7f24a963ad4c67217a0
git rev-parse origin/HEAD: c31785ededfda5a1e1f8d7f24a963ad4c67217a0
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Visible correlativo context

Current visible route-order correlativo table freezes:

```text
M1-C04 - Refuerzo de ecuaciones lineales
```

as the natural next capsule after:

```text
M1-C03 - Problemas con ecuaciones lineales
```

Relevant source documents:

- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_VISIBLE_CORRELATIVE_RENUMBERING_DOC_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_ROUTE_ORDER_CORRELATIVE_AUDIT_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C03_COMPLETION_NEXT_CAPSULE_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C03_AUTHORED_FEEDBACK_1.md`

This phase applies the new visible correlativo and does not use the former percentage/geometry M1-C04/M1-C05 labels as current labels.

## M1-C04 registry/content diagnosis

Static registry target:

```text
visible correlativo: M1-C04
student/admin title: PAES M1 - Refuerzo de ecuaciones lineales
contentKey: paes_m1_linear_equations_reinforcement
program: PAES_M1
topic: Ecuaciones lineales (refuerzo)
contentVersion: v1
item count: 4
item order: q1, q2, q3, q4
```

Items and keys:

```text
q1: ¿Cuál es la solución de la ecuación 4x - 7 = 21?
options: A x = 7; B x = 14; C x = 28; D x = 3,5
correctOptionKey: A

q2: ¿Cuál es la solución de la ecuación 3(x + 2) = 24?
options: A x = 4; B x = 6; C x = 8; D x = 10
correctOptionKey: B

q3: ¿Cuál es la solución de la ecuación x/5 + 4 = 9?
options: A x = 1; B x = 5; C x = 25; D x = 45
correctOptionKey: C

q4: ¿Cuál es la solución de la ecuación 2x + 9 = x + 17?
options: A x = 4; B x = 8; C x = 13; D x = 26
correctOptionKey: B
```

Metadata summary:

```text
difficultyBand: reinforcement
primaryPurpose: reinforce
routingStatus: available_not_universal
```

## authoredFeedback diagnosis

Static diagnosis:

```text
M1-C04 Refuerzo exists in the registry.
M1-C04 Refuerzo has 4 items.
M1-C04 Refuerzo has correctOptionKey for q1-q4.
M1-C04 Refuerzo does not have authoredFeedback on q1-q4.
```

The expected authoredFeedback shape used by repaired/verified M1 content is:

```ts
authoredFeedback: {
  briefId: string,
  completeId: string,
  version: string,
  brief: string,
  complete: string,
}
```

M1-C04 Refuerzo currently does not meet that shape because the property is absent from all four items.

The current registry entry also carries this limitation notice:

```text
Tus respuestas se guardan como evidencia para revisión. No recibirás puntaje PAES ni retroalimentación automática en esta versión.
```

Expected UI implication if the human starts/submits M1-C04 now:

- The system can show correctness and correct-answer/key-check feedback because `correctOptionKey` exists.
- The system should not be expected to show pedagogical feedback breve.
- The system should not be expected to show authored feedback completo / paso a paso.
- It would likely reproduce the same quality gap previously diagnosed in M1-C03 before repair.

## Comparison with current feedback standard

Current standard from repaired M1-C03:

- q1-q4 have authoredFeedback.
- authoredFeedback uses `briefId`, `completeId`, `version`, `brief`, `complete`.
- Human verification after refresh/reopen reported feedback breve OK.
- Human verification reported feedback completo / paso a paso OK.
- Human then completed M1-C03 successfully.

Legacy-tested percentage/geometry block:

- The former M1-C04/M1-C05 labels are legacy pending correction after renumbering.
- Their content remains registry implemented and direct local/dev smoke-passed historically.
- They had authoredFeedback and passed human manual UI smoke, but they are no longer the current route-order M1-C04/M1-C05 labels.

M1-C04 Refuerzo comparison:

- It is current M1-C04 by visible route-order.
- It is registry-backed and has answer keys.
- It lacks authoredFeedback on q1-q4.
- It is not ready for human smoke if the smoke expects the current authoredFeedback standard.

## Scope safety

This phase was documentation/read-only only.

Explicit non-actions:

- No code changes.
- No UI/API changes.
- No schema/DB/Prisma changes.
- No continuity changes.
- No route-order changes.
- No registry changes.
- No data mutation.
- No fixture mutation.
- No DB reset.
- No seed scripts.
- No browser automation.
- No API-only tests.
- No production/staging.
- No secrets printed.

## Result

```text
M1_C04_REFUERZO_FEEDBACK_BLOCKER_AUTHORED_FEEDBACK_MISSING
```

M1-C04 Refuerzo should not be started/completed for a feedback-quality smoke until a narrow authoredFeedback phase adds pedagogical brief/complete feedback for q1-q4, or until the team explicitly accepts key-only feedback as sufficient for this capsule.

## Next recommended phase

Preferred option:

```text
A) Fase estrecha de authoredFeedback para M1-C04 Refuerzo, si falta authoredFeedback.
```

Recommended phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C04-REFUERZO-AUTHORED-FEEDBACK-1
```

Purpose:

```text
Add authoredFeedback to M1-C04 - Refuerzo de ecuaciones lineales q1-q4 using the existing brief/complete shape, preserving stems, options, keys, contentKey, UI/API/schema/DB, continuity and route-order.
```

Not recommended now:

```text
B) Smoke humano M1-C04 Refuerzo
```

Reason:

M1-C04 Refuerzo lacks authoredFeedback and would likely show key-check fallback rather than the current pedagogical feedback standard.
