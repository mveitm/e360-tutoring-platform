# MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-ITEM-COUNT-DIAGNOSIS-1

## Purpose

Diagnose the human local/dev smoke blocker for:

```text
M1-C05 - Funciones lineales basicas
```

Human reported that after pressing `Comenzar`, the UI showed 8 exercises instead of the expected 4, and the review was stopped.

This phase determines whether 8 exercises is correct or a mismatch.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = cbce8aa52e0a0a1a104d7082160f967f61923af2
```

Accepted prior commit:

```text
cbce8aa MVP-SALES-PILOT-PEDAGOGY-M1: prepare C05 Funciones lineales UI smoke
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: cbce8aa52e0a0a1a104d7082160f967f61923af2
git rev-parse origin/main: cbce8aa52e0a0a1a104d7082160f967f61923af2
git rev-parse origin/HEAD: cbce8aa52e0a0a1a104d7082160f967f61923af2
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Human smoke blocker

Human local/dev observation:

```text
- Capsule visible: Funciones lineales basicas.
- Capsule opened.
- Capsule opened correctly.
- Comenzar was pressed.
- After beginning, the UI showed 8 exercises instead of 4.
- Review was stopped.
- No answers were submitted.
```

This was the correct stop under the prior readiness checklist because that checklist focused on q1-q4.

## M1-C05 target/contentKey

Current visible correlativo documentation assigns:

```text
M1-C05 - Funciones lineales basicas
```

Target content:

```text
title: PAES M1 - Funciones lineales basicas
contentKey: paes_m1_linear_functions_basic
contentVersion: v1
program: PAES_M1
```

The target is clear.

## Expected item count source

The current diagnosis and implementation documents define M1-C05 as an 8-item capsule:

```text
MVP_SALES_PILOT_PEDAGOGY_M1_NEXT_FUNCIONES_LINEALES_FEEDBACK_READINESS_DIAGNOSIS_1.md:
item count: 8 MC items

MVP_SALES_PILOT_PEDAGOGY_M1_C05_FUNCIONES_LINEALES_AUTHORED_FEEDBACK_1.md:
item count: 8
keys: q1 B, q2 B, q3 A, q4 C, q5 D, q6 A, q7 B, q8 C

MVP_SALES_PILOT_PEDAGOGY_M1_C05_FUNCIONES_LINEALES_HUMAN_UI_SMOKE_READINESS_1.md:
item count: 8
```

The readiness checklist nevertheless asked the human to verify q1-q4 only. That checklist scope was too narrow for submission behavior because the actual capsule has 8 items.

## Registry item count

Static registry source:

```text
nextjs_space/lib/study-load-content.ts
```

Registry entry:

```text
contentKey: paes_m1_linear_functions_basic
instructions: Esta actividad tiene 8 ejercicios de opcion multiple sobre funciones lineales.
items: q1, q2, q3, q4, q5, q6, q7, q8
```

Registry item count:

```text
8
```

Answer keys:

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

authoredFeedback status:

```text
q1-q8 have authoredFeedback.
```

## Local/dev StudyLoad observation

No DB query was required or executed in this phase.

Static code evidence shows:

```text
StudyLoad model stores title, not contentKey.
The viewer resolves content with getStudyLoadContent(studyLoad.title).
getStudyLoadContent returns the static registry entry by exact title.
The answer form receives safeItems from content.items.
The answer form computes totalItemCount = items.length.
The submit button requires answeredCount === totalItemCount.
```

Therefore, if the human-opened local/dev StudyLoad title is `Funciones lineales basicas`, the UI item count is expected to come from the registry entry for `paes_m1_linear_functions_basic`, which has 8 items.

Human observation that the UI showed 8 exercises is consistent with the current registry and viewer behavior. It is not evidence of a stale/mixed local/dev StudyLoad by itself.

## Diagnosis

Cause classification:

```text
A) REGISTRY_HAS_8_ITEMS_EXPECTATION_WAS_WRONG
```

Rationale:

```text
M1-C05 - Funciones lineales basicas is currently an 8-item registry capsule.
The static registry, prior readiness diagnosis, and authoredFeedback implementation all record 8 items.
The local/dev UI showing 8 exercises matches that source.
The mismatch was in the human smoke expectation/checklist, not in the registry or UI item count.
```

Secondary finding:

```text
The q1-q4-only readiness checklist is insufficient for the current UI submission flow because the answer form enables submission only after all items are answered.
```

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
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No secrets printed.
- No Sales-Ready or adaptive AI claim.

## Result

```text
M1_C05_ITEM_COUNT_DIAGNOSED_8_EXPECTED_CONTINUE_SMOKE
```

## Next recommended phase

Preferred option:

```text
A) Continue human smoke with 8 exercises because 8 is confirmed correct.
```

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Adjusted human instruction:

```text
Continue the M1-C05 human smoke expecting 8 exercises. Answer q1-q8, submit responses, verify brief feedback and paso-a-paso/complete feedback for q1-q8 if feasible, complete self-report, finalize the capsule, return to ST M1, and record the next visible capsule.
```
