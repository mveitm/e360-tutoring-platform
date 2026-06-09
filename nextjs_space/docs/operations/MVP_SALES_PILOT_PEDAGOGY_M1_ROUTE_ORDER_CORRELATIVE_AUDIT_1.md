# MVP-SALES-PILOT-PEDAGOGY-M1-ROUTE-ORDER-CORRELATIVE-AUDIT-1

## Purpose

Audit the current PAES_M1 route-order/continuity evidence and the visible correlativo map after the diagnosis:

```text
M1_C03_COMPLETION_NEXT_CAPSULE_DIAGNOSED_REFUERZO_LEGITIMATE_INTERMEDIATE
```

The human-observed next capsule after completing `M1-C03 - Problemas con ecuaciones lineales` was `Refuerzo de ecuaciones lineales`, not the previously labeled `M1-C04 - Porcentaje y proporcionalidad en contexto`.

This phase determines the best-supported visible sequence and recommends a governance decision. It does not modify code, data, registry, UI, API, schema, Prisma, continuity, route-order, fixtures, production, or staging.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 5c6dfc7d5f6e7b30176b0ca7b2b25e5e382481e1
```

Accepted prior commit:

```text
5c6dfc7 MVP-SALES-PILOT-PEDAGOGY-M1: diagnose C03 next capsule
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 5c6dfc7d5f6e7b30176b0ca7b2b25e5e382481e1
git rev-parse origin/main: 5c6dfc7d5f6e7b30176b0ca7b2b25e5e382481e1
git rev-parse origin/HEAD: 5c6dfc7d5f6e7b30176b0ca7b2b25e5e382481e1
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Prior diagnosis

The previous diagnosis established:

- M1-C03 completed successfully after authoredFeedback repair.
- The next human-visible capsule was `Refuerzo de ecuaciones lineales`.
- `Refuerzo de ecuaciones lineales` is registry-backed as `paes_m1_linear_equations_reinforcement`.
- Current continuity maps `paes_m1_linear_equations_word_problems` to `paes_m1_linear_equations_reinforcement`.
- The observed next capsule is a legitimate intermediate under current route-order/continuity.
- Its visible correlativo was still unassigned:

```text
CORRELATIVE_UNASSIGNED_FOR_REFUERZO_LINEAR_EQUATIONS
```

## Evidence inspected

Read-only evidence inspected:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C03_COMPLETION_NEXT_CAPSULE_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_GOV_CONTENT_CAPSULE_CORRELATIVE_PROTOCOL_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C04_C05_BLOCK_CLOSEOUT_HANDOFF_1.md`
- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`

Read-only search confirmed the relevant registry titles, contentKeys, prior labels, continuity map, and prior smoke/closeout documentation.

## Natural M1 sequence

The current continuity source of truth in `nextjs_space/lib/study-load-continuity.ts` defines this PAES_M1 path:

```text
paes_m1_balanced_entry_initial
-> paes_m1_linear_equations_basic
-> paes_m1_linear_equations_word_problems
-> paes_m1_linear_equations_reinforcement
-> paes_m1_linear_functions_basic
-> paes_m1_data_representation_entry
```

Registry titles for that path:

```text
PAES M1 - Entrada balanceada inicial
PAES M1 - Ecuaciones lineales basicas
PAES M1 - Problemas con ecuaciones lineales
PAES M1 - Refuerzo de ecuaciones lineales
PAES M1 - Funciones lineales basicas
PAES M1 - Lectura de tablas y graficos
```

Important implication:

```text
PAES M1 - Porcentaje y proporcionalidad en contexto
PAES M1 - Area, perimetro y medida en figuras simples
```

are implemented and smoke-passed through direct local/dev access, but they are not currently present in the inspected PAES_M1 continuity chain.

## Refuerzo de ecuaciones lineales diagnosis

`Refuerzo de ecuaciones lineales` is not an unknown or accidental UI label.

Static registry diagnosis:

```text
student/admin title: PAES M1 - Refuerzo de ecuaciones lineales
contentKey: paes_m1_linear_equations_reinforcement
program: PAES_M1
topic: Ecuaciones lineales (refuerzo)
item count: 4
keys: q1 A, q2 B, q3 C, q4 B
metadata difficultyBand: reinforcement
metadata primaryPurpose: reinforce
metadata routingStatus: available_not_universal
```

Static continuity diagnosis:

```text
paes_m1_linear_equations_word_problems -> paes_m1_linear_equations_reinforcement
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
```

Therefore `Refuerzo de ecuaciones lineales` should receive the next natural visible correlativo if the project chooses route-order as the visible numbering source.

## Proposed visible correlativo table

Recommended route-order-based visible correlativo table:

| visible correlativo | student/admin title | contentKey | status | source of truth / evidence | notes |
| --- | --- | --- | --- | --- | --- |
| M1-C01 | Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | implemented/live registry content | registry + continuity start | Previously referenced as balanced entry initial. |
| M1-C02 | Ecuaciones lineales basicas | `paes_m1_linear_equations_basic` | implemented; authoredFeedback and completion flow verified | registry + continuity + prior closeouts | Verified local/dev vertical slice. |
| M1-C03 | Problemas con ecuaciones lineales | `paes_m1_linear_equations_word_problems` | implemented; authoredFeedback repaired and human completion passed | registry + continuity + C03 completion diagnosis | Completion naturally led to Refuerzo. |
| M1-C04 | Refuerzo de ecuaciones lineales | `paes_m1_linear_equations_reinforcement` | implemented registry content; next visible after C03; authoredFeedback status not yet at C03/C04/C05 standard | registry + continuity + human observation | Recommended new visible correlativo if route-order governs numbering. |
| M1-C05 | Funciones lineales basicas | `paes_m1_linear_functions_basic` | implemented registry content; next after Refuerzo in continuity | registry + continuity | Not yet part of current authoredFeedback smoke block. |
| M1-C06 | Lectura de tablas y graficos | `paes_m1_data_representation_entry` | implemented registry content; next after Funciones lineales basicas in continuity | registry + continuity | Not yet part of current authoredFeedback smoke block. |
| legacy M1-C04 pending correction | Porcentaje y proporcionalidad en contexto | `paes_m1_numbers_percentage_proportionality_entry` | implemented registry content; direct local/dev smoke PASSED | registry + prior C04/C05 closeout | Prior label conflicts with route-order after Refuerzo. Needs placement/correlativo decision. |
| legacy M1-C05 pending correction | Area, perimetro y medida en figuras simples | `paes_m1_geometry_area_measure_entry` | implemented registry content; direct local/dev smoke PASSED | registry + prior C04/C05 closeout | Prior label conflicts with route-order after Refuerzo. Needs placement/correlativo decision. |

## Impact on prior M1-C04/M1-C05 labels

The previously closed block used:

```text
M1-C04 - Porcentaje y proporcionalidad en contexto
M1-C05 - Area, perimetro y medida en figuras simples
```

That naming was valid as a communication improvement over internal candidate numbers at the time, but the later natural-flow diagnosis revealed a prior route-order item between M1-C03 and later content:

```text
Refuerzo de ecuaciones lineales
```

The inspected continuity map also places `Funciones lineales basicas` and `Lectura de tablas y graficos` before any route evidence for percentage/proportionality or geometry/measure content.

Therefore the prior M1-C04/M1-C05 labels should be treated as:

```text
legacy correlativo pending correction
```

The specific renaming proposed in the prompt:

```text
M1-C04 - Refuerzo de ecuaciones lineales
M1-C05 - Porcentaje y proporcionalidad en contexto
M1-C06 - Area, perimetro y medida en figuras simples
```

is only partially supported. `M1-C04 - Refuerzo de ecuaciones lineales` is supported by current continuity. However, assigning M1-C05/M1-C06 to percentage/geometry is not supported by current continuity evidence, because the route-order next points from Refuerzo to `paes_m1_linear_functions_basic`, then to `paes_m1_data_representation_entry`.

The better-supported sequence is:

```text
M1-C04 - Refuerzo de ecuaciones lineales
M1-C05 - Funciones lineales basicas
M1-C06 - Lectura de tablas y graficos
```

with percentage/proportionality and geometry/measure left as implemented and smoke-passed content whose final route-order placement and visible correlativo require a separate decision.

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
M1_ROUTE_ORDER_CORRELATIVE_AUDIT_READY_RENUMBERING_RECOMMENDED
```

Route-order evidence supports a visible correlativo correction. The natural current path makes `Refuerzo de ecuaciones lineales` the best-supported M1-C04. The previously labeled M1-C04/M1-C05 percentage/geometry block should be marked as legacy correlativo pending correction until its route-order placement is explicitly decided.

## Next recommended decision

Preferred option:

```text
A) Documentar renumeracion visible y actualizar handoff/docs vivos.
```

Recommended next phase purpose:

```text
Record the corrected visible correlativo map in living handoff/index documentation, mark the former M1-C04/M1-C05 labels as legacy pending correction, and define the next safe phase for Refuerzo de ecuaciones lineales without changing code or route-order.
```

Secondary options:

- `C) Auditar mas datos antes de asignar correlativos` if the team wants DB/cycle-level evidence before updating living docs.
- `D) Implementar UI/admin correlativo display en fase futura` after governance correction is accepted.

Not recommended now:

- `B) Mantener correlativos actuales y asignar uno especial a Refuerzo`, because it would preserve a contradiction between visible numbering and current natural route-order.
