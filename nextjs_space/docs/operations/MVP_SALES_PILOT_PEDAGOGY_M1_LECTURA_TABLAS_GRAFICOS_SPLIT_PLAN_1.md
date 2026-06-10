# MVP-SALES-PILOT-PEDAGOGY-M1-LECTURA-TABLAS-GRAFICOS-SPLIT-PLAN-1

## Purpose

Prepare a documentation-only split/repair plan for the current M1 capsule:

```text
Lectura de tablas y graficos
```

The capsule currently shows 8 exercises. The living PAES pedagogical standard blocks ordinary M1/M2 human smoke above 4 exercises per capsule.

This phase does not implement the split, mutate DB, change code, change UI/API/schema/Prisma, or touch continuity/route-order.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 36c1ec0196322ef287f341cd6c377456d2f53ac9
```

Accepted prior commit:

```text
36c1ec0 MVP-SALES-PILOT-PEDAGOGY-M1: diagnose tables graphs item count
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 36c1ec0196322ef287f341cd6c377456d2f53ac9
git rev-parse origin/main: 36c1ec0196322ef287f341cd6c377456d2f53ac9
git rev-parse origin/HEAD: 36c1ec0196322ef287f341cd6c377456d2f53ac9
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
recommended minimum: 3 exercises
exceptional minimum: 2 exercises only with explicit pedagogical justification
```

The standard also requires authoredFeedback breve/completo per item before human feedback-quality smoke.

## Current capsule state

Current registry source:

```text
nextjs_space/lib/study-load-content.ts
```

Current registry target:

```text
title: PAES M1 - Lectura de tablas y graficos
contentKey: paes_m1_data_representation_entry
contentVersion: v1
program: PAES_M1
topic: Lectura de tablas y graficos
item count: 8
```

Current instructions explicitly state the activity has 8 multiple-choice questions about simple tables and graphs.

Prior diagnosis:

```text
M1_LECTURA_TABLAS_GRAFICOS_ITEM_COUNT_BLOCKER_DIAGNOSED_SPLIT_REQUIRED
```

Human state:

```text
- start/resume UX fix passed;
- Comenzar showed exercises without F5/refresh;
- UI displayed 8 exercises;
- review stopped;
- no exercises answered;
- no answers submitted;
- capsule not finalized.
```

## Item inventory

Current item inventory:

| item | focus | correctOptionKey | split recommendation |
| --- | --- | --- | --- |
| q1 | Read a direct value from a course/books table. | D | Part I |
| q2 | Compare two categories in a table by subtraction. | B | Part I |
| q3 | Identify the maximum value/day in a sales table. | C | Part I |
| q4 | Interpret an increasing trend in a bar-graph description. | A | Part I |
| q5 | Sum category counts from a snack-sales table. | C | Part II |
| q6 | Compute the average of three temperatures. | B | Part II |
| q7 | Select a supported conclusion from preference counts. | B | Part II |
| q8 | Identify equal frequencies in a color-count table. | A | Part II |

Pedagogical grouping:

```text
q1-q4 form a natural basic-reading block:
- direct lookup;
- difference/comparison;
- maximum;
- trend.

q5-q8 form a natural interpretation-and-aggregation block:
- total;
- average;
- supported conclusion;
- equal frequency.
```

No obvious redundancy justifies discarding half the capsule. The 8 items are short, useful, and cover distinct data-reading subskills. Recorte is not preferred.

## authoredFeedback inventory

Current authoredFeedback inventory:

```text
q1: absent
q2: absent
q3: absent
q4: absent
q5: absent
q6: absent
q7: absent
q8: absent
```

Implication:

```text
The split phase cannot preserve authoredFeedback because the current registry entry does not have authoredFeedback.
```

Future repair should add authoredFeedback using the existing project shape:

```ts
authoredFeedback: {
  briefId: string,
  completeId: string,
  version: string,
  brief: string,
  complete: string,
}
```

Recommended authoredFeedback handling:

```text
Part I: author q1-q4 feedback for lookup, comparison, maximum, and trend.
Part II: author q5-q8 feedback for total, average, supported conclusion, and equal frequency.
```

Feedback must avoid internal rationale, source-finalization notes, implementation-readiness notes, Sales-Ready claims, adaptive AI claims, and any other student-facing leakage.

## Table/graph and rendering considerations

The current stems encode small tables and graph descriptions as inline text.

Rendering diagnosis:

```text
No item currently requires a bitmap image, chart image, or special diagram to preserve meaning.
No item currently requires LaTeX rendering.
```

However, the topic is tables/graphs, so future PRO/content review may decide that a later improved version should render actual tables or simple chart visuals. That would be a separate UI/content-formatting phase and is not required for the narrow split plan.

## Split/repair options

Option A: split 4+4 into two successive capsules.

```text
Pros: preserves all useful evidence, complies with max-4 standard, keeps cognitive load closable, and follows the successful C05/C06 split pattern.
Cons: requires registry split, authoredFeedback authoring, continuity/route-order alignment, and local/dev stale-data alignment.
```

Option B: cut to 4 exercises and archive/remove 4.

```text
Pros: smaller immediate registry change.
Cons: discards useful coverage across total, average, conclusion, or equal-frequency skills; not preferred without PRO justification.
```

Option C: another justified split.

```text
Possible only if PRO/content review wants a 3+3+2 or 3+5-style organization, but the 4-exercise maximum makes 4+4 cleaner and sufficient.
```

Option D: block for lack of clarity.

```text
Not needed. The target, item count, keys, and natural grouping are clear.
```

## Recommended split

Preferred strategy:

```text
A) Split 4+4 in two successive capsules.
```

Recommended registry split:

```text
First capsule:
q1-q4 from paes_m1_data_representation_entry

Second capsule:
q5-q8 from paes_m1_data_representation_entry
```

Recommended contentKey strategy:

```text
Keep existing contentKey for Part I:
paes_m1_data_representation_entry

Add new contentKey for Part II:
paes_m1_data_representation_entry_ii
```

Rationale:

```text
The existing StudyLoad target after C06 II already points to paes_m1_data_representation_entry. Keeping that contentKey for Part I minimizes the first registry transition. A new Part II contentKey allows continuity to advance after Part I.
```

Required future registry changes:

```text
- Rename existing registry title to Part I title.
- Reduce existing item list to q1-q4.
- Update instructions to 4 questions.
- Add a second registry entry for q5-q8.
- Add authoredFeedback q1-q8, either in the split code phase or in a tightly sequenced authoredFeedback phase before smoke.
```

## Proposed visible correlativos

Pre-split visible-correlativo documentation recorded:

```text
M1-C06 - Lectura de tablas y graficos
```

After the C05/C06 Funciones lineales split, route-order documentation already identified the corrected sequence:

```text
M1-C05 - Funciones lineales basicas I
M1-C06 - Funciones lineales basicas II
M1-C07 - Lectura de tablas y graficos
```

Recommended visible correlativos after this split:

```text
M1-C07 - Lectura de tablas y graficos I
M1-C08 - Lectura de tablas y graficos II
```

Future implementation should also document that the older `M1-C06 - Lectura de tablas y graficos` label is stale after the C05/C06 insertion.

## Continuity/local-dev implications

Current continuity after C06 II:

```text
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
```

Required future continuity after split:

```text
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
paes_m1_data_representation_entry -> paes_m1_data_representation_entry_ii
```

Whether Part II is terminal or routes onward should be determined in a later route-order/continuity phase after the registry split.

Local/dev stale-data risk:

```text
The human already started the current 8-item Lectura de tablas y graficos StudyLoad.
It was not answered, submitted, or finalized.
After the registry split, that local/dev StudyLoad should be treated as stale/mixed and should not be resumed.
```

Future local/dev data alignment should:

```text
- identify the started 8-item StudyLoad without printing sensitive data;
- retire or realign it only with explicit LOCAL_DEV authorization;
- expose a clean pending M1-C07 Part I StudyLoad;
- avoid touching prior completed C05 I/C06 II evidence;
- avoid production/staging entirely.
```

No data mutation is authorized in this plan phase.

## Scope safety

This phase was documentation-only.

Not performed:

- No code changes.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No registry/content changes.
- No continuity/route-order changes.
- No seed or fixture mutation.
- No DB mutation.
- No production or staging access.
- No browser automation.
- No API-only tests.
- No build.
- No secrets printed.

## Result

```text
M1_LECTURA_TABLAS_GRAFICOS_SPLIT_PLAN_READY
```

## Next recommended phase

Recommended implementation phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-LECTURA-TABLAS-GRAFICOS-SPLIT-CODE-1
```

Recommended narrow objective:

```text
Implement the 4+4 registry split as M1-C07 Lectura de tablas y graficos I and M1-C08 Lectura de tablas y graficos II, preserve stems/options/correctOptionKey values, add or immediately follow with authoredFeedback for q1-q8, and defer continuity/local-dev data alignment to explicit later phases.
```
