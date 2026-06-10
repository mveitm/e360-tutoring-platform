# MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-CONTINUITY-ROUTE-ORDER-CODE-1

## Purpose

Implement the minimum continuity/route-order alignment so the natural M1 flow includes:

```text
M1-C05 - Funciones lineales basicas I
-> M1-C06 - Funciones lineales basicas II
```

This phase follows the approved alignment plan after the C05/C06 4+4 registry split.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = bf694f4bfd797b82e66fa6638e8eb49e83ef01d1
```

Accepted prior commit:

```text
bf694f4 MVP-SALES-PILOT-PEDAGOGY-M1: plan C05 C06 continuity alignment
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: bf694f4bfd797b82e66fa6638e8eb49e83ef01d1
git rev-parse origin/main: bf694f4bfd797b82e66fa6638e8eb49e83ef01d1
git rev-parse origin/HEAD: bf694f4bfd797b82e66fa6638e8eb49e83ef01d1
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before edits.

## Source alignment plan

Source plan:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C05_C06_CONTINUITY_ROUTE_ORDER_ALIGNMENT_PLAN_1.md
```

Plan result:

```text
C05_C06_ALIGNMENT_PLAN_READY_ROUTE_ORDER_AND_DATA
```

The plan identified the exact continuity file:

```text
nextjs_space/lib/study-load-continuity.ts
```

It also identified a separate local/dev stale-data follow-up. This phase implements only route-order/continuity code.

## Route-order/continuity target

Current registry targets:

```text
M1-C05 - Funciones lineales basicas I
contentKey: paes_m1_linear_functions_basic

M1-C06 - Funciones lineales basicas II
contentKey: paes_m1_linear_functions_basic_ii

Following capsule:
contentKey: paes_m1_data_representation_entry
```

Required map:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
paes_m1_linear_functions_basic -> paes_m1_linear_functions_basic_ii
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
```

## Code changes

Modified file:

```text
nextjs_space/lib/study-load-continuity.ts
```

Minimal change:

```text
paes_m1_linear_functions_basic now routes to paes_m1_linear_functions_basic_ii.
paes_m1_linear_functions_basic_ii now routes to paes_m1_data_representation_entry.
```

The existing C04 route remains unchanged:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
```

## C05/C06 sequence

Aligned natural sequence:

```text
M1-C04 - Refuerzo de ecuaciones lineales
-> M1-C05 - Funciones lineales basicas I
-> M1-C06 - Funciones lineales basicas II
-> following M1 data representation capsule
```

Completion behavior expected from the existing helper:

```text
Completing C05 I creates or reuses a pending StudyLoad for C06 II.
Completing C06 II creates or reuses a pending StudyLoad for Lectura de tablas y graficos.
```

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
- No local/dev data mutation.
- No auth/access changes.
- No package or migration files.

Known remaining blocker:

```text
The old local/dev 8-item M1-C05 StudyLoad remains a stale/mixed risk and must not be resumed until a separate local/dev data-alignment phase handles it explicitly.
```

## Validation

Validation status:

```text
git diff --check: passed
git status --short: only authorized/scope-approved files changed before commit
npm.cmd --prefix nextjs_space run build: passed
```

Static checks performed:

```text
Only authorized files changed.
C05 I -> C06 II is reflected in continuity.
C06 II -> Lectura de tablas is reflected in continuity.
No UI/schema/DB/fixtures modified.
No authoredFeedback/stems/options/correctOptionKey modified.
No new internal leakage added.
```

## Result

```text
C05_C06_CONTINUITY_ROUTE_ORDER_CODE_COMPLETED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-LOCAL-DEV-DATA-ALIGNMENT-1
```

Purpose:

```text
Inspect local/dev state read-only first, identify any stale old 8-item M1-C05 StudyLoad, and only with explicit human authorization align local/dev data so future human smoke starts from a clean C05 I StudyLoad.
```
