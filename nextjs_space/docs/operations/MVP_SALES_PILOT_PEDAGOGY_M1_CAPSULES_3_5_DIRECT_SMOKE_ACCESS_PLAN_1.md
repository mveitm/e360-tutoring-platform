# MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-DIRECT-SMOKE-ACCESS-PLAN-1

## Purpose

Prepare a narrow direct/admin/dev access plan for a future human local/dev manual smoke of PAES_M1 capsules 3 and 5 without completing the current pending word-problems capsule and without changing UI, API, schema, DB schema, Prisma schema, continuity, or route-order.

This phase is documentation and diagnosis only. It does not implement code, mutate data, prepare fixtures, execute smoke, start the app, log in, call APIs, or use browser automation.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 547813914b960af12a9f6236274f5fe42de79ab4
```

## Preflight result

Preflight passed:

```text
git status --short: clean
git log --oneline --decorate --graph -8: 5478139 aligned with HEAD, origin/main and origin/HEAD
git rev-parse HEAD: 547813914b960af12a9f6236274f5fe42de79ab4
git rev-parse origin/main: 547813914b960af12a9f6236274f5fe42de79ab4
git rev-parse origin/HEAD: 547813914b960af12a9f6236274f5fe42de79ab4
```

## Human UI visibility result

Human result to carry forward:

```text
CYCLE_COUNT_5_CONFIRMED_FUTURE_PENDING_CAPSULES_NOT_LISTED
```

Human observation after local/dev data alignment:

```text
Siguiente capsula:
PAES M1 - Problemas con ecuaciones lineales
Estado: Pendiente

Capsula:
Ecuaciones lineales (problemas)

Capsulas completadas:
- PAES M1 - Ecuaciones lineales basicas
- PAES M1 - Entrada balanceada inicial

Panel:
2 capsulas trabajadas
5 capsulas en tu ciclo activo
Foco actual: Ecuaciones lineales (problemas)
```

Authorized interpretation:

- The alignment increased the visible active cycle from 3 to 5 StudyLoads.
- Future pending capsules 3/5 are in the cycle but are not listed directly in the current student ST M1 UI.
- The student UI appears to show only the next pending capsule and completed capsules.
- The user did not press `Comenzar`.
- The current pending word-problems capsule should not be completed merely to reach capsules 3/5.

## Current visible student flow

The current visible student flow remains anchored on:

```text
contentKey: paes_m1_linear_equations_word_problems
title: PAES M1 - Problemas con ecuaciones lineales
status: pending
```

The existing ST M1 page chooses the current capsule by cycle state:

- most recently updated `in_progress` StudyLoad first;
- otherwise oldest `pending` StudyLoad;
- otherwise a completed capsule for review.

This explains why the current pending word-problems capsule remains the only next visible capsule even after the cycle count became 5.

## Cycle count confirmation

Previous local/dev alignment verification confirmed:

```text
postAlignmentVisibleMatches=1
visibleCycleLoadCount=5
visibleCyclePendingLabels=WORD|CAP3|CAP5
capsule3Prepared=true
capsule5Prepared=true
wordProblemsPreserved=true
completedCount=2
```

This phase repeated a read-only local/dev confirmation without printing IDs:

```text
visibleAlignedCycleMatches=1
cycleLoadCount=5
capsule3StudyLoadConcrete=true
capsule5StudyLoadConcrete=true
wordProblemsStillPending=true
completedCount=2
NO_DATA_MUTATED
NO_SECRET_VALUES_PRINTED
```

## Future pending visibility limitation

The limitation is not that capsules 3/5 are missing from the visible cycle. They have concrete pending StudyLoads.

The limitation is that the current student ST M1 surface does not list all future pending StudyLoads. It exposes:

- the selected current/next capsule;
- completed capsules for review;
- aggregate count for capsules in the active cycle.

Therefore, direct smoke access should not depend on completing word-problems or changing continuity/route-order. It should use an existing direct/admin/dev path to the already-created 3/5 StudyLoads.

## Existing direct/admin/dev access options

### Option A: Existing student viewer by StudyLoad id

Existing route:

```text
/now/study-loads/[id]
```

Read-only code inspection confirms:

- the route loads `StudyLoad` by `params.id`;
- it checks the current session's `Student.email` linkage;
- it denies access if the StudyLoad does not belong to the authenticated student's active enrollment;
- it resolves registry content via `getStudyLoadContent(studyLoad.title)`;
- it renders the same `StudyLoadAnswerForm` used by prior authoredFeedback smoke;
- pending StudyLoads show a `Comenzar` action through the existing start workflow.

This is the strongest existing path because it opens a specific concrete StudyLoad without requiring the ST M1 page to list all future pending capsules.

Required later human/dev step:

```text
Use a safe local/dev admin/dev read-only method to identify the capsule 3 and capsule 5 StudyLoad IDs without printing secrets or broad private data, then open:
/now/study-loads/<capsule-3-study-load-id>
/now/study-loads/<capsule-5-study-load-id>
```

The IDs should be handled as local/dev operational references only and should not be pasted broadly if the team treats them as private.

### Option B: Existing admin StudyLoads surface

Existing route:

```text
/admin/study-loads
```

Read-only code inspection confirms:

- admin access is enforced by `requireAdminSession`;
- the page fetches `/api/study-loads`, `/api/learning-cycles`, and `/api/instances`;
- the client table supports filtering by enrollment and searching by title/loadType;
- the API response contains StudyLoad `id`, title, status, cycle and enrollment metadata.

This can help an admin locate the two StudyLoads by title:

```text
PAES M1 - Porcentaje y proporcionalidad en contexto
PAES M1 - Area, perimetro y medida en figuras simples
```

However, the current admin UI does not expose a dedicated "open in student viewer" link. If the ID is not visibly available in the browser UI, a separate read-only local/dev helper/check may be needed to produce the direct local URL for the human.

### Option C: Documentation-only direct-open instructions

A future documentation-only phase can provide a human-safe direct-open checklist:

1. confirm local/dev app and student session;
2. identify capsule 3/5 StudyLoad IDs through approved local/dev admin/dev read-only method;
3. open `/now/study-loads/<id>` for capsule 3;
4. perform the manual smoke checklist for capsule 3;
5. open `/now/study-loads/<id>` for capsule 5;
6. perform the manual smoke checklist for capsule 5;
7. do not complete word-problems merely as navigation.

### Option D: Future UI/admin code phase

A future separate code phase could list future pending capsules or provide admin direct-open links and stable correlatives. This is useful product debt, but it is not required for a narrow local/dev smoke plan and is not authorized here.

### Option E: No safe path

This option is not selected because an existing student viewer by StudyLoad ID exists and the aligned cycle has concrete capsule 3/5 StudyLoads.

## Recommended option

Recommended option:

```text
Option A: Use the existing /now/study-loads/[id] student viewer path, with IDs obtained through a safe local/dev admin/dev read-only method.
```

Result classification:

```text
DIRECT_SMOKE_ACCESS_PLAN_READY_EXISTING_PATH_FOUND
```

Rationale:

- Capsules 3/5 have concrete StudyLoads in the visible cycle.
- The existing student viewer route can open a specific StudyLoad by ID.
- The route enforces student ownership, so the smoke remains tied to the same authenticated student flow.
- This avoids completing the current pending word-problems capsule just to reach future capsules.
- This avoids UI/API/schema/DB schema/continuity/route-order changes.

Required next gate:

```text
Human/admin/dev must obtain or confirm the exact local/dev direct links for capsule 3 and capsule 5 without printing secrets, then run a controlled manual smoke phase.
```

## Correlative visibility issue

The UI/admin still needs a stable visible capsule identifier for search and test coordination, for example:

```text
M1-C01, M1-C02, M1-C03...
```

or:

```text
Capsula 01, Capsula 02, Capsula 03...
```

This phase only records the product debt. It does not implement UI, admin, schema, registry metadata, continuity, or route-order changes.

## Out of scope

- Code changes.
- UI/API changes.
- Schema/DB schema/Prisma schema changes.
- Data mutation.
- Fixture preparation.
- Completing word-problems.
- Completing capsules 3/5.
- Starting smoke.
- Browser automation.
- API-only tests.
- DB reset.
- Seed scripts.
- Production/staging.
- Continuity changes.
- Route-order changes.
- Printing secrets, tokens, cookies, DB URLs, `.env` values, passwords, session values or credentials.
- Capsules 4/6.
- Sales-Ready/public commercial claims.
- Adaptive AI claims.

## Result

```text
DIRECT_SMOKE_ACCESS_PLAN_READY_EXISTING_PATH_FOUND
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-DIRECT-SMOKE-LINK-HANDOFF-1
```

Purpose:

```text
Provide human-safe local/dev direct-open instructions for capsule 3 and capsule 5 using existing StudyLoad IDs and the existing /now/study-loads/[id] viewer, without printing secrets, changing code, mutating data, using APIs as tests, completing word-problems, or executing smoke yet.
```

After direct links are confirmed, proceed to:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-MANUAL-UI-SMOKE-1
```
