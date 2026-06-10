# MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-SPLIT-PLAN-1

## Purpose

Prepare a documentation-only split/repair plan for:

```text
M1-C05 - Funciones lineales basicas
```

The current registry capsule has 8 exercises. The living PAES capsule pedagogical standard now blocks ordinary M1/M2 capsules above 4 exercises, so M1-C05 must not continue human smoke in its current 8-item form.

This phase does not implement the split and does not modify code, registry, UI, API, schema, DB, Prisma, continuity, route-order, fixtures, or local/dev data.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 72792f487844e3c6bda35824b428a0c8a83306c0
```

Accepted prior commit:

```text
72792f4 MVP-GOV-PAES: document capsule pedagogical standard
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 72792f487844e3c6bda35824b428a0c8a83306c0
git rev-parse origin/main: 72792f487844e3c6bda35824b428a0c8a83306c0
git rev-parse origin/HEAD: 72792f487844e3c6bda35824b428a0c8a83306c0
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Pedagogical standard applied

Source standard:

```text
nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md
```

Applied rule:

```text
M1 ideal: 4 exercises per capsule
M1 maximum: 4 exercises per capsule
M1 recommended minimum: 3 exercises
M1 exceptional minimum: 2 exercises only with explicit pedagogical justification
```

The accepted PRO/direction decision explicitly supersedes the previous recommendation to continue M1-C05 human smoke with 8 exercises.

Operational consequence:

```text
Do not answer, submit, or finalize the current 8-item M1-C05 StudyLoad.
Plan split/repair before smoke resumes.
```

## Current M1-C05 state

Registry file:

```text
nextjs_space/lib/study-load-content.ts
```

Current target:

```text
visible correlativo: M1-C05
title: PAES M1 - Funciones lineales basicas
contentKey: paes_m1_linear_functions_basic
contentVersion: v1
program: PAES_M1
topic: Funciones lineales (inicio)
instructions: current instructions say 8 multiple-choice exercises
item count: 8
estimatedMinutes: 20-30 minutes in text, 25 in pedagogicalMetadata
```

Current answer keys:

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

Current authoredFeedback state:

```text
q1-q8 have authoredFeedback.
shape: briefId, completeId, version, brief, complete
version: m1-c05-funciones-lineales-authored-feedback-v1
```

Current local/dev human state:

```text
Human smoke was paused after Comenzar showed 8 exercises.
No answers were submitted.
No self-report was completed.
M1-C05 was not finalized.
```

## Item inventory

| item | correctOptionKey | focus | natural block |
| --- | --- | --- | --- |
| q1 | B | Evaluate `f(x) = 2x + 3` at `x = 4`. | Block 1 |
| q2 | B | Solve `3x - 5 = 10` from a function output. | Block 1 |
| q3 | A | Find slope from `(0, 2)` and `(3, 8)`. | Block 1 |
| q4 | C | Identify the y-intercept in `y = -2x + 6`. | Block 1 |
| q5 | D | Match slope 4 and intercept -1 to `y = 4x - 1`. | Block 2 |
| q6 | A | Model fixed plus hourly cost as `C(h) = 1000 + 500h`. | Block 2 |
| q7 | B | Evaluate `f(x) = -x + 9` at `x = 3`, including sign care. | Block 2 |
| q8 | C | Infer `y = 3x + 1` from a small linear table. | Block 2 |

Natural grouping diagnosis:

```text
q1-q4 form a coherent introductory block: direct evaluation, reverse solving from output, slope from points, and y-intercept identification.
q5-q8 form a coherent application/representation block: selecting slope-intercept form, modeling a contextual cost, evaluating a negative-slope rule, and deriving a rule from a table.
```

There is no strong evidence that 4 items should be discarded. All 8 are short, useful, and already have authoredFeedback. The issue is capsule size, not item quality.

## authoredFeedback inventory

All current items have authoredFeedback using the accepted shape:

```text
briefId
completeId
version
brief
complete
```

Feedback preservation plan:

```text
First capsule: preserve q1-q4 authoredFeedback.
Second capsule: move/preserve q5-q8 authoredFeedback.
```

Likely adjustment needed in the implementation phase:

```text
Update feedback ids and version strings only if the future code phase creates a new contentKey/version for the second capsule.
Keep student-facing brief/complete content unless the new title/focus requires minor wording alignment.
Do not add internal rationale, implementation notes, key-validation notes, source-finalization notes, Sales-Ready claims, adaptive AI claims, or other leakage.
```

## Split/repair options

Option A - Split 4+4 in two successive capsules:

```text
Recommended.
Preserves all 8 useful items.
Complies with the M1 maximum of 4 exercises per capsule.
Keeps both capsules sufficient and closable.
Requires a later narrow implementation/alignment phase.
```

Option B - Recorte to 4 exercises:

```text
Not recommended.
Would discard or archive q5-q8 despite those items being pedagogically useful and already having authoredFeedback.
Could weaken coverage of representation/modeling aspects of linear functions.
```

Option C - Other pedagogical division:

```text
Possible only with explicit PRO/direction justification.
No better split than q1-q4 and q5-q8 was found in this read-only phase.
```

Option D - Block for unclear target:

```text
Not needed.
The target, contentKey, item count, item keys, and authoredFeedback state are clear.
```

## Recommended split

Preferred strategy:

```text
A) Split 4+4 in two successive capsules.
```

Recommended content split:

```text
M1-C05 part I: q1-q4
M1-C06 part II: q5-q8
```

Pedagogical rationale:

```text
Part I covers core reading of a linear rule: evaluate, solve from output, find slope, identify intercept.
Part II covers using and recognizing linear models: choose form from slope/intercept, model a fixed-plus-variable cost, evaluate a rule with negative slope, infer a rule from a table.
```

This preserves the useful progression while making each capsule closable under the M1 standard.

## Proposed visible correlativos

Proposed visible correlativos for a future implementation phase:

```text
M1-C05 - Funciones lineales basicas I
M1-C06 - Funciones lineales basicas II
```

Current frozen documentation says:

```text
M1-C05 - Funciones lineales basicas
M1-C06 - Lectura de tablas y graficos
```

Therefore, implementing the recommended split would require a future correlativo/continuity alignment decision. The likely downstream visible result is:

```text
M1-C05 - Funciones lineales basicas I
M1-C06 - Funciones lineales basicas II
M1-C07 - Lectura de tablas y graficos
```

This phase does not change the visible correlativo map. It only recommends the future alignment needed to keep student/admin communication consistent.

## Continuity/local-dev implications

Continuity impact:

```text
Registry split alone is probably insufficient.
The current natural continuity path routes Refuerzo to current Funciones lineales basicas, then to Lectura de tablas y graficos.
A future implementation must explicitly decide and align the route so part I leads to part II, and part II leads to data representation.
```

Local/dev StudyLoad impact:

```text
Any already-started local/dev StudyLoad for current M1-C05 8-item content should be treated as stale/mixed for this workstream.
Do not answer, submit, finalize, delete, reset, or mutate that data in this phase.
A later explicit data/fixture/local-dev alignment phase may be needed if the existing started load blocks human smoke after split.
```

Implementation implication:

```text
Future work should be a narrow code/data-alignment plan or implementation phase that is explicitly allowed to touch registry and continuity/route-order files.
That future phase must preserve item content, correctOptionKey values, and authoredFeedback quality unless it documents a pedagogical reason for a narrow edit.
```

## Scope safety

This phase was documentation-only.

Not performed:

- No code changes.
- No registry changes.
- No UI/API changes.
- No schema/DB/Prisma changes.
- No continuity changes.
- No route-order changes.
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
M1_C05_FUNCIONES_LINEALES_SPLIT_PLAN_READY
```

## Next recommended phase

Recommended future implementation phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-FUNCIONES-LINEALES-SPLIT-IMPLEMENTATION-1
```

Purpose:

```text
Implement the approved 4+4 split by turning current M1-C05 into Funciones lineales basicas I with q1-q4, creating the successive Funciones lineales basicas II capsule with q5-q8, and aligning visible correlativo/continuity/route-order documentation or code only under explicit authorization.
```

Possible separate follow-up if local/dev data blocks smoke:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-FUNCIONES-LINEALES-LOCAL-DEV-DATA-ALIGNMENT-1
```
