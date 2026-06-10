# MVP-SALES-PILOT-PEDAGOGY-M1-NEXT-FUNCIONES-LINEALES-FEEDBACK-READINESS-DIAGNOSIS-1

## Purpose

Diagnose, before human start, the next visible capsule observed after closing:

```text
M1-C04 - Refuerzo de ecuaciones lineales
```

Observed next capsule:

```text
PAES M1 - Funciones lineales basicas
```

This phase determines the visible correlativo, contentKey, static registry shape, authoredFeedback readiness, and whether local/dev human smoke is safe to start.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = fc6b01f942731b9ee59e90415ba0885f285f3c1d
```

Accepted prior commit:

```text
fc6b01f MVP-SALES-PILOT-PEDAGOGY-M1: close C04 Refuerzo UI smoke
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: fc6b01f942731b9ee59e90415ba0885f285f3c1d
git rev-parse origin/main: fc6b01f942731b9ee59e90415ba0885f285f3c1d
git rev-parse origin/HEAD: fc6b01f942731b9ee59e90415ba0885f285f3c1d
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Prior flow state

Current closed flow state:

```text
M1-C03 - Problemas con ecuaciones lineales:
authoredFeedback repaired; human completion passed.

M1-C04 - Refuerzo de ecuaciones lineales:
authoredFeedback repaired; human local/dev UI smoke passed with non-blocking refresh UX issue.
```

Recorded non-blocking UX issue from M1-C04 Refuerzo:

```text
Pressing Comenzar showed "Esta capsula ya fue iniciada" and required refresh before questions appeared.
```

This diagnosis does not authorize UI work for that issue.

## Next visible capsule observed

Human-observed next visible capsule after finalizing M1-C04 Refuerzo:

```text
PAES M1 - Funciones lineales basicas
```

Static registry title uses the same target with typographic/accented display:

```text
PAES M1 - Funciones lineales basicas
PAES M1 — Funciones lineales básicas
```

Target contentKey:

```text
paes_m1_linear_functions_basic
```

## Correlativo diagnosis

The current visible correlativo documentation is clear.

Source documents:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_VISIBLE_CORRELATIVE_RENUMBERING_DOC_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_ROUTE_ORDER_CORRELATIVE_AUDIT_1.md
```

Current visible map assigns:

```text
M1-C04 - Refuerzo de ecuaciones lineales
M1-C05 - Funciones lineales basicas
M1-C06 - Lectura de tablas y graficos
```

Continuity evidence in `nextjs_space/lib/study-load-continuity.ts` supports:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
paes_m1_linear_functions_basic -> paes_m1_data_representation_entry
```

Recommended visible correlativo:

```text
M1-C05 - Funciones lineales basicas
```

No `CORRELATIVE_UNASSIGNED_FOR_FUNCIONES_LINEALES_BASICAS` condition applies.

## Registry/content diagnosis

Static registry entry exists in:

```text
nextjs_space/lib/study-load-content.ts
```

Registry identity:

```text
title: PAES M1 — Funciones lineales básicas
contentKey: paes_m1_linear_functions_basic
contentVersion: v1
program: PAES_M1
topic: Funciones lineales (inicio)
estimatedMinutes: 20-30 minutos
```

Item count:

```text
8 MC items
```

Static item keys and correctOptionKey values:

```text
q1: B
q2: B
q3: A
q4: C
q5: D
q6: A
q7: B
q8: C
```

Metadata shape exists:

```text
programCode: PAES_M1
sliceId: AS1
axis: algebra_functions
difficultyBand: transition
primaryPurpose: bridge
evidenceType: mc_submission
reviewStatus: internal_provisional
expertReviewed: false
routingStatus: available_not_universal
```

## authoredFeedback diagnosis

The target does not meet the current authoredFeedback standard.

Static diagnosis:

```text
q1-q8 have correctOptionKey.
q1-q8 do not have authoredFeedback.
q1-q8 therefore do not use the required briefId, completeId, version, brief, complete shape.
```

Runtime implication by static code reading:

```text
buildStudyLoadFeedback can return correctness/key-check fields from correctOptionKey.
It will not return authoredFeedbackBrief, authoredFeedbackComplete, authoredFeedbackBriefId,
authoredFeedbackCompleteId, or authoredFeedbackVersion for these items because authoredFeedback is absent.
```

Therefore a human feedback-quality smoke now would likely observe key/check correctness behavior without the validated brief feedback, paso-a-paso/complete feedback standard used for recent M1 capsules.

## Comparison with current feedback standard

Current validated standard:

```text
M1-C03 - Problemas con ecuaciones lineales:
authoredFeedback repaired on q1-q4; human completion passed.

M1-C04 - Refuerzo de ecuaciones lineales:
authoredFeedback repaired on q1-q4; human UI smoke passed after refresh.
```

Historical/legacy block:

```text
Former M1-C04/M1-C05 percentage/geometry labels are legacy pending correction.
Their content is registry-implemented and direct-smoke-passed historically, but they are not the current visible M1-C05/M1-C06 natural route labels.
```

M1-C05 Funciones lineales basicas is different from the current repaired standard:

```text
It is registry-backed and route-backed, but q1-q8 lack authoredFeedback and complete feedback.
```

Older BPCPv1 capsule 6 ficha/contract docs also carried this target as blocked for authored feedback, complete feedback, final step-by-step scripts, item-level rationale, and distractor-level rationale. The current registry confirms that blocker still applies.

## Scope safety

This phase was documentation/read-only except for authorized documentation updates.

Not performed:

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
- No app start.
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No secrets printed.
- No Sales-Ready or adaptive AI claim.

## Result

```text
M1_FUNCIONES_LINEALES_FEEDBACK_BLOCKER_AUTHORED_FEEDBACK_MISSING
```

Rationale:

```text
Target and correlativo are clear: M1-C05 / paes_m1_linear_functions_basic.
Registry exists with 8 MC items and answer keys.
authoredFeedback is missing for all q1-q8, so the capsule is not ready for human feedback-quality smoke.
```

## Next recommended phase

Preferred option:

```text
A) Fase estrecha de authoredFeedback para Funciones lineales basicas.
```

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-AUTHORED-FEEDBACK-1
```

Purpose:

```text
Add authoredFeedback only for M1-C05 - Funciones lineales basicas / paes_m1_linear_functions_basic,
using the existing briefId, completeId, version, brief, complete shape, preserving contentKey,
title, stems, options, correctOptionKey values, item order, UI, API, schema, DB, Prisma,
continuity, route-order, and data.
```
