# MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-VISIBILITY-SEQUENCE-DIAGNOSIS-1

## Purpose

Diagnose, without data mutation or code changes, why the prior local/dev fixture prep reported capsules 3/5 ready for manual smoke while the human-observed M1 student surface still shows `PAES M1 - Problemas con ecuaciones lineales` as the next visible capsule.

This phase also records the need for a future stable human-visible capsule correlativo for student/admin surfaces.

## Baseline

Expected baseline:

```text
HEAD = origin/main = origin/HEAD = ad884226497abcdf818f9e5f1feac1d1d1297355
```

Phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-VISIBILITY-SEQUENCE-DIAGNOSIS-1
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git log --oneline --decorate --graph -8: HEAD, origin/main, and origin/HEAD aligned at ad88422
git rev-parse HEAD: ad884226497abcdf818f9e5f1feac1d1d1297355
git rev-parse origin/main: ad884226497abcdf818f9e5f1feac1d1d1297355
git rev-parse origin/HEAD: ad884226497abcdf818f9e5f1feac1d1d1297355
```

## Prior fixture/data prep result

The previous phase result was:

```text
LOCAL_DEV_FIXTURE_DATA_PREP_COMPLETED_CAPSULES_3_5_READY_FOR_MANUAL_SMOKE
```

Carried-forward details:

- One synthetic local/dev fixture target was selected.
- One active PAES_M1 enrollment and one open learning cycle were found for that target.
- One pending practice StudyLoad was created for capsule 3.
- One pending practice StudyLoad was created for capsule 5.
- No code, UI, API, schema, Prisma schema, continuity, route-order, or registry file was changed.

Read-only reinspection in this phase found that the synthetic target cycle has:

```text
cycleLoadCount: 4
order=1 key=paes_m1_balanced_entry_initial status=completed
order=2 key=paes_m1_linear_equations_basic status=pending
order=3 key=paes_m1_numbers_percentage_proportionality_entry status=pending
order=4 key=paes_m1_geometry_area_measure_entry status=pending
oldestPendingKey=paes_m1_linear_equations_basic
```

This confirms the prior fixture prep did prepare capsules 3/5, but it does not match the current human-observed M1 student flow.

## Human UI observation

Human local/dev observation to register:

```text
En ST de M1 aparece:

Siguiente capsula:
PAES M1 - Problemas con ecuaciones lineales
Estado: Pendiente
Capsula:
Ecuaciones lineales (problemas)

Boton:
Ver capsula / Abrir capsula funciona y Capsule/UI abre.

Boton Comenzar:
No presionado.

Capsulas completadas:
- PAES M1 - Ecuaciones lineales basicas
- PAES M1 - Entrada balanceada inicial

Panel:
2 capsulas trabajadas
3 capsulas en tu ciclo activo
Foco actual: Ecuaciones lineales (problemas)
```

No q1-q4 submission, self-report, completion, fixture mutation, DB mutation, browser automation, or API-only test was executed in this phase.

## Registry confirmation

Static registry confirmation:

```text
paes_m1_numbers_percentage_proportionality_entry: present
paes_m1_geometry_area_measure_entry: present
paes_m1_linear_equations_word_problems: present
```

Internal mapping for the currently visible capsule:

```text
title: PAES M1 - Problemas con ecuaciones lineales
topic/capsule label: Ecuaciones lineales (problemas)
contentKey: paes_m1_linear_equations_word_problems
```

## Current visible next capsule

The human-visible next capsule is:

```text
contentKey: paes_m1_linear_equations_word_problems
title: PAES M1 - Problemas con ecuaciones lineales
status: pending
```

This is the expected current continuity successor after the verified capsule 2 flow:

```text
paes_m1_linear_equations_basic -> paes_m1_linear_equations_word_problems
```

## Sequence / cycle diagnosis

Static UI logic:

- `/study/paes-m1` reads the active PAES_M1 enrollment's `currentCycleId`.
- It reads StudyLoads in that current cycle ordered by `createdAt asc`.
- `pickCurrentCapsule` chooses:
  - the most recently updated `in_progress` StudyLoad first;
  - otherwise the oldest `pending` StudyLoad;
  - otherwise a completed capsule for review.

Read-only local/dev data evidence:

```text
openM1Cycles: 15
cyclesMatchingHumanObservedPattern: 1
cyclesContainingCapsules3And5: 1
```

Interpretation:

- The human-observed flow corresponds to an open M1 cycle with exactly the visible sequence: initial completed, capsule 2 completed, word-problems pending.
- The prepared capsules 3/5 exist in local/dev, but in a different target/cycle than the human-observed student flow.
- Because the human-observed cycle has only 3 active StudyLoads, capsules 3/5 cannot appear there until the visible user's cycle receives those StudyLoads or continuity/route-order later exposes them.
- The previous result `READY_FOR_MANUAL_SMOKE` was accurate for the selected synthetic fixture target, but incomplete as a claim about the human-observed active student flow.

## Classification

```text
DIAGNOSIS_3_5_PREPARED_DIFFERENT_TARGET_OR_CYCLE
```

Supporting evidence:

- Capsules 3/5 are present in the static registry.
- Capsules 3/5 were prepared in one local/dev synthetic target cycle.
- The human-observed student flow matches a different current cycle where the next pending capsule is `paes_m1_linear_equations_word_problems`.
- No data was mutated in this diagnosis.

## Correlative visibility issue

The current student/admin interpretation depends too heavily on title/contentKey and implicit sequence. A future UX/product rule should expose a stable human-visible correlativo, for example:

```text
Capsula 01, Capsula 02, Capsula 03...
```

or:

```text
M1-C01, M1-C02, M1-C03...
```

Purpose:

- let humans distinguish source-finalized registry numbering from current continuity order;
- reduce confusion when prepared fixture data exists in a different target/cycle;
- help student/admin audit what is next, what is completed, and what is only prepared for later testing.

This change is not implemented in this phase and is not authorized by this diagnosis.

## What was not changed

- No data mutation.
- No fixture preparation.
- No DB reset.
- No seed script.
- No code change.
- No UI/API/schema/DB/Prisma change.
- No route-order or continuity change.
- No auth/access change.
- No browser automation.
- No API-only test.
- No production/staging.
- No secrets, tokens, cookies, DB URLs, `.env` values, passwords, session values, or credentials printed.

## Result

```text
M1_CAPSULES_3_5_VISIBILITY_SEQUENCE_DIAGNOSIS_COMPLETED
```

Diagnosis:

```text
DIAGNOSIS_3_5_PREPARED_DIFFERENT_TARGET_OR_CYCLE
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-VISIBLE-STUDENT-FLOW-FIXTURE-ALIGNMENT-PLAN-1
```

Purpose:

```text
Plan how to align capsules 3/5 testing with the human-observed visible student flow, deciding whether to prepare those StudyLoads in that exact cycle, switch the manual smoke to the synthetic prepared target, or wait for continuity to expose them naturally.
```

Alternative safe branch:

```text
MVP-SALES-PILOT-UX-CAPSULE-CORRELATIVE-VISIBILITY-RULE-1
```

Purpose:

```text
Define a stable student/admin visible capsule correlativo rule without implementing UI changes yet.
```
