# MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-CONTINUITY-ROUTE-ORDER-CODE-1

## Purpose

Implement the minimum continuity/route-order alignment so the natural M1 flow includes:

```text
M1-C07 - Lectura de tablas y graficos I
-> M1-C08 - Lectura de tablas y graficos II
```

This phase follows the approved alignment plan after the C07/C08 registry split and authoredFeedback implementation.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 0a834b1578d2d2b48f1e0a2dc34fb43ad4d81d60
```

Accepted prior commit:

```text
0a834b1 MVP-SALES-PILOT-PEDAGOGY-M1: plan C07 C08 continuity alignment
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 0a834b1578d2d2b48f1e0a2dc34fb43ad4d81d60
git rev-parse origin/main: 0a834b1578d2d2b48f1e0a2dc34fb43ad4d81d60
git rev-parse origin/HEAD: 0a834b1578d2d2b48f1e0a2dc34fb43ad4d81d60
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before edits.

## Source alignment plan

Source plan:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_CONTINUITY_ROUTE_ORDER_ALIGNMENT_PLAN_1.md
```

Plan result:

```text
C07_C08_ALIGNMENT_PLAN_READY_ROUTE_ORDER_AND_DATA
```

The plan identified the exact continuity file:

```text
nextjs_space/lib/study-load-continuity.ts
```

It also identified a separate LOCAL_DEV stale-data follow-up. This phase implements only route-order/continuity code.

## Route-order/continuity target

Current registry targets:

```text
M1-C07 - Lectura de tablas y graficos I
contentKey: paes_m1_data_representation_entry

M1-C08 - Lectura de tablas y graficos II
contentKey: paes_m1_data_representation_entry_ii
```

Required map:

```text
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
paes_m1_data_representation_entry -> paes_m1_data_representation_entry_ii
```

The first edge already existed before this phase. The missing edge was C07 I -> C08 II.

## Code changes

Modified file:

```text
nextjs_space/lib/study-load-continuity.ts
```

Minimum change implemented:

```text
paes_m1_data_representation_entry now routes to paes_m1_data_representation_entry_ii.
```

Preserved existing edge:

```text
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
```

## C07/C08 sequence

Aligned natural sequence:

```text
M1-C06 - Funciones lineales basicas II
-> M1-C07 - Lectura de tablas y graficos I
-> M1-C08 - Lectura de tablas y graficos II
```

Expected completion behavior from the existing helper:

```text
Completing C07 I creates or reuses a pending StudyLoad for C08 II.
```

C08 II terminal/future-next behavior remains a later route-order decision.

## What was not changed

Not changed:

- No registry content changes.
- No stems changed.
- No options changed.
- No correctOptionKey values changed.
- No authoredFeedback changed.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No seed scripts.
- No fixtures.
- No auth/access changes.
- No package or migration files.
- No local/dev data mutation.

Known remaining blocker:

```text
The old local/dev 8-item Lectura de tablas y graficos StudyLoad remains a stale/mixed risk and must not be resumed until a separate local/dev data-alignment phase handles it explicitly.
```

## Validation

Validation status:

```text
git diff --check: passed
git status --short: only authorized/scope-approved files changed before commit
npm.cmd --prefix nextjs_space run build: passed
```

Static checks:

```text
Only authorized/scope-approved files changed.
C07 I -> C08 II is reflected in continuity.
No UI/schema/DB/fixtures modified.
No authoredFeedback/stems/options/correctOptionKey modified.
No new internal leakage added.
```

## Result

```text
C07_C08_CONTINUITY_ROUTE_ORDER_CODE_COMPLETED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-LOCAL-DEV-DATA-ALIGNMENT-1
```

Purpose:

```text
Inspect local/dev state read-only first, identify the stale old 8-item Lectura de tablas y graficos StudyLoad, and only with explicit human authorization align local/dev data so future human smoke starts from a clean C07 I StudyLoad.
```
