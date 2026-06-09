# MVP-SALES-PILOT-PEDAGOGY-M1-VISIBLE-CORRELATIVE-RENUMBERING-DOC-1

## Purpose

Document and freeze the currently recommended visible correlativo renumbering for PAES_M1 capsules after:

```text
M1_ROUTE_ORDER_CORRELATIVE_AUDIT_READY_RENUMBERING_RECOMMENDED
```

This document exists to prevent future chats, agents, handoffs, testers, admins, and student-facing references from continuing to use stale or ambiguous M1 correlativos after the route-order audit found that `Refuerzo de ecuaciones lineales` is the natural next capsule after M1-C03.

This is a documentation-only phase. It does not change code, data, UI, API, schema, Prisma, registry, continuity, route-order, fixtures, production, or staging.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 01a220b055829be9bc217eebbb915562112751e9
```

Accepted prior commit:

```text
01a220b MVP-SALES-PILOT-PEDAGOGY-M1: audit route order correlatives
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 01a220b055829be9bc217eebbb915562112751e9
git rev-parse origin/main: 01a220b055829be9bc217eebbb915562112751e9
git rev-parse origin/HEAD: 01a220b055829be9bc217eebbb915562112751e9
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Source audit

Source audit:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_ROUTE_ORDER_CORRELATIVE_AUDIT_1.md
```

Audit result:

```text
M1_ROUTE_ORDER_CORRELATIVE_AUDIT_READY_RENUMBERING_RECOMMENDED
```

The source audit found:

- `Refuerzo de ecuaciones lineales` is registry-backed as `paes_m1_linear_equations_reinforcement`.
- Current continuity routes `paes_m1_linear_equations_word_problems` to `paes_m1_linear_equations_reinforcement`.
- Current continuity then routes Refuerzo to `paes_m1_linear_functions_basic`, then to `paes_m1_data_representation_entry`.
- Percentage/proportionality and geometry/measure are implemented and direct local/dev smoke-passed, but are not present in the inspected natural continuity path.

## Renumbering decision

The visible correlativo map is frozen for future human communication according to the route-order audit.

Decision:

```text
M1-C04 - Refuerzo de ecuaciones lineales
M1-C05 - Funciones lineales basicas
M1-C06 - Lectura de tablas y graficos
```

The previously used labels:

```text
M1-C04 - Porcentaje y proporcionalidad en contexto
M1-C05 - Area, perimetro y medida en figuras simples
```

are no longer current visible correlativos. They remain valid historical labels for the already closed functional smoke block only when explicitly marked as legacy/historical.

This document does not assign final new visible correlativos to percentage/proportionality or geometry/measure. Their final placement remains pending because the route-order audit did not find them in the inspected natural continuity path.

## Current visible M1 correlativo table

| visible correlativo | student/admin title | contentKey | status | notes |
| --- | --- | --- | --- | --- |
| M1-C01 | Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | implemented/live registry content | Route-order start. |
| M1-C02 | Ecuaciones lineales basicas | `paes_m1_linear_equations_basic` | implemented; authoredFeedback and completion flow verified | Verified local/dev vertical slice. |
| M1-C03 | Problemas con ecuaciones lineales | `paes_m1_linear_equations_word_problems` | implemented; authoredFeedback repaired; human completion passed | Completion naturally led to Refuerzo. |
| M1-C04 | Refuerzo de ecuaciones lineales | `paes_m1_linear_equations_reinforcement` | implemented registry content; natural next after M1-C03 | Newly frozen visible correlativo from route-order audit. authoredFeedback status still not at M1-C03 standard. |
| M1-C05 | Funciones lineales basicas | `paes_m1_linear_functions_basic` | implemented registry content; next after Refuerzo in continuity | Newly frozen visible correlativo from route-order audit. |
| M1-C06 | Lectura de tablas y graficos | `paes_m1_data_representation_entry` | implemented registry content; next after Funciones lineales basicas in continuity | Newly frozen visible correlativo from route-order audit. |
| legacy M1-C04 pending correction | Porcentaje y proporcionalidad en contexto | `paes_m1_numbers_percentage_proportionality_entry` | implemented registry content; direct local/dev smoke PASSED | Historical label only. Final route-order placement and visible correlativo still pending. |
| legacy M1-C05 pending correction | Area, perimetro y medida en figuras simples | `paes_m1_geometry_area_measure_entry` | implemented registry content; direct local/dev smoke PASSED | Historical label only. Final route-order placement and visible correlativo still pending. |

## Legacy references and correction

The block previously referred to as M1-C04/M1-C05 remains functionally closed:

- `Porcentaje y proporcionalidad en contexto` was implemented in the registry and human direct local/dev smoke passed.
- `Area, perimetro y medida en figuras simples` was implemented in the registry and human direct local/dev smoke passed.

However, the former visible correlativos are corrected as follows:

- The former `M1-C04 - Porcentaje y proporcionalidad en contexto` is now `legacy M1-C04 pending correction`.
- The former `M1-C05 - Area, perimetro y medida en figuras simples` is now `legacy M1-C05 pending correction`.
- For new human communication, do not present those as current M1-C04/M1-C05.
- If the historical block must be cited, explicitly mark it as `legacy label`, `historical label`, or `previously labeled`.
- A future route-order/content-placement decision must assign final visible correlativos before these two capsules are used again as current sequence items.

## Communication rule for future agents

Future agents must use the current visible table above.

Do not use:

```text
capsulas 3/5
candidate capsule 3/5
M1-C04/M1-C05
```

as shorthand for percentage/proportionality and geometry/measure in new human-facing communication.

Use explicit current or legacy language:

```text
M1-C04 - Refuerzo de ecuaciones lineales
M1-C05 - Funciones lineales basicas
M1-C06 - Lectura de tablas y graficos
Porcentaje y proporcionalidad en contexto - legacy M1-C04 pending correction
Area, perimetro y medida en figuras simples - legacy M1-C05 pending correction
```

When citing older documents, write:

```text
legacy label / historical label
```

This prevents internal planning or superseded labels from masquerading as the current student/admin-visible sequence.

## Living documentation updates

Updated living documentation targets:

- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`

Both are canonical living references in this workstream and were unambiguous targets for a brief reference update.

## UI/admin debt

UI/admin should eventually display a stable visible correlativo for searchability, testing, support, student/admin coordination, and audit.

This phase does not implement UI/admin display and does not add registry metadata, schema fields, route-order changes, or continuity changes.

## Scope safety

This phase was documentation-only.

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
M1_VISIBLE_CORRELATIVE_RENUMBERING_DOCUMENTED_LIVING_REFERENCE_ADDED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C04-REFUERZO-FEEDBACK-QUALITY-DIAGNOSIS-1
```

Purpose:

```text
Diagnose whether the newly frozen M1-C04 - Refuerzo de ecuaciones lineales meets the authoredFeedback standard before asking the human to continue natural M1 flow.
```

Alternative safe next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-LEGACY-PERCENTAGE-GEOMETRY-PLACEMENT-DECISION-1
```

Purpose:

```text
Decide route-order placement and final visible correlativos for percentage/proportionality and geometry/measure without changing code yet.
```
