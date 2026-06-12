# MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-P0-REPAIR-PLAN-1

## Purpose

Convert the M1 authoredFeedback quality audit into a concrete, ordered and safe P0 repair plan without editing feedback yet.

This phase identifies the exact P0 feedback gaps, defines repair criteria, proposes safe batches, and recommends the next repair phase. It does not modify registry content, authoredFeedback, keys, item count, visual stimuli, UI, DB, route-order, continuity, or agentic behavior.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 503b22854b7e8d2163afbe40f91be88b41b1ef08
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 503b22854b7e8d2163afbe40f91be88b41b1ef08
```

## Source audit

Primary source audit:

```text
nextjs_space/docs/operations/MVP_PEDAGOGY_M1_AUTHORED_FEEDBACK_QUALITY_AUDIT_1.md
```

Source result:

```text
M1_AUTHORED_FEEDBACK_QUALITY_AUDIT_COMPLETED_WITH_P0_REPAIR_PLAN_RECOMMENDED
```

Additional source documents read:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_M1_CAPSULE_STANDARD_REPAIR_BACKLOG_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_M1_CAPSULE_STANDARD_IMPACT_AUDIT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_CODEX_PRO_PHASE_PROMPT_GOLDEN_RULE_1.md`
- `nextjs_space/lib/study-load-content.ts`

Required context search was executed across `PHASE_LOG.md`, `nextjs_space/docs`, and `nextjs_space/lib`.

## P0 definition

For this repair plan, P0 authoredFeedback issues are:

- feedback missing where it must exist;
- feedback is only generic key-check;
- feedback contradicts stem, options, correct alternative, or `correctOptionKey`;
- feedback contradicts a table, graph, figure, or other visual stimulus;
- feedback contains internal leakage;
- feedback does not let the student understand the solution;
- complete feedback lacks real step-by-step reasoning;
- a pilot candidate does not meet the minimum PAES feedback standard.

## P0 inventory

Only one P0 feedback cluster was confirmed: M1-C01 q1-q4 have no `authoredFeedback`.

| p0Id | capsule | title | contentKey | item | current issue | reason it is P0 | correctOptionKey appears stable | visual stimulus dependency | repair type required | can batch safely | human smoke after repair |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1-FB-P0-001 | M1-C01 | Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | q1 | no `authoredFeedback` | missing brief and complete feedback for percentage item | yes: C | none required | add brief/complete percentage feedback | yes, with C01 batch | yes |
| M1-FB-P0-002 | M1-C01 | Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | q2 | no `authoredFeedback` | missing brief and complete feedback for algebra/modeling item | yes: B | none required | add brief/complete expression/modeling feedback | yes, with C01 batch | yes |
| M1-FB-P0-003 | M1-C01 | Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | q3 | no `authoredFeedback` | missing brief and complete feedback for area item | yes: C | low/none for current wording; simple rectangle dimensions are explicit in text | add brief/complete area feedback | yes, with C01 batch | yes |
| M1-FB-P0-004 | M1-C01 | Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | q4 | no `authoredFeedback` | missing brief and complete feedback for probability item | yes: B | none required | add brief/complete probability feedback | yes, with C01 batch | yes |

No P0 key conflict was found. No existing feedback contradiction, leakage, or wrong reasoning was found because the P0 issue is absence of feedback.

## Repair rubric

Brief feedback must:

- be student-facing;
- be concise;
- identify the key idea or first correction;
- avoid key-check-only language;
- avoid internal metadata;
- not mention DB, StudyLoad, contentKey, QA state, or implementation detail.

Complete feedback must:

- restate what the item asks;
- identify the relevant data or concept;
- solve step by step;
- justify the correct option;
- explain a likely error or distractor when relevant;
- reference the visual stimulus if applicable;
- align with the PAES skill;
- avoid leakage and internal notes;
- avoid promises about adaptive AI, scoring, mastery, or future agentic behavior.

## Batch strategy

Batching rules:

- batch by capsule when the P0 cluster is coherent;
- keep the first repair narrow enough for review;
- avoid mixing visual-stimulus-dependent repairs with plain feedback authoring;
- avoid editing stems, options, keys, item order, item count, contentKey, route-order, continuity, or visual stimuli in the feedback repair batch;
- require post-repair static validation and later human review/smoke readiness.

The safe P0 batch is one capsule only:

```text
M1-C01 — Entrada balanceada inicial
items: q1, q2, q3, q4
```

## Batch 1 recommendation

Recommended Batch 1:

```text
MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-P0-REPAIR-BATCH-1
```

Scope:

- add `authoredFeedback` brief/complete for M1-C01 q1-q4 only;
- preserve the existing authoredFeedback shape used by other M1 capsules;
- preserve item keys, stems, options, correctOptionKey, item order, item count, title, contentKey, contentVersion, currentLimitationNotice and pedagogicalMetadata;
- do not add visual stimuli;
- do not change route-order/continuity;
- do not modify UI/API/schema/DB.

Why this is safe as first repair:

- single capsule;
- four clear missing-feedback items;
- no key conflict detected;
- no complex visual stimulus dependency;
- item concepts are standard M1 entry skills: percentage, linear expression/modeling, rectangle area, simple probability;
- existing M1 registry already contains a stable `authoredFeedback` shape to follow.

Batch 1 acceptance criteria:

- q1 feedback explains 20% of 15000 as 0.20 * 15000 = 3000 and warns against confusing discount with final price;
- q2 feedback separates fixed cost from hourly cost and justifies `1000 + 500h`;
- q3 feedback identifies area as length * width and computes 8 * 5 = 40 m2;
- q4 feedback identifies favorable/total cases and computes 2/5;
- each item has `briefId`, `completeId`, `version`, `brief`, and `complete`;
- brief feedback is not just correct/incorrect;
- complete feedback has real step-by-step reasoning and a typical error/care point;
- no internal metadata is student-facing;
- no contentKey, correctOptionKey, item count, ordering, stems, options, visual stimulus, route-order, continuity, UI, DB or schema changes.

## Batch 2 recommendation

No second feedback P0 repair batch is currently recommended.

After Batch 1:

- re-audit M1-C01 feedback statically;
- prepare smoke/readiness for C01 feedback UI if the repair is accepted;
- then return to the broader repair backlog for non-feedback P0/P1 items such as M1-C06 q8 tableStimulus and legacy geometry visual planning.

If Batch 1 exposes a key/content inconsistency, stop the repair path and open:

```text
MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-P0-KEY-CONFLICT-DIAGNOSIS-1
```

## Acceptance criteria

Future P0 feedback repair must satisfy:

- no `correctOptionKey` changes;
- no item count changes;
- no `contentKey` changes;
- no item order changes;
- no stem or option changes unless a later phase explicitly scopes a content correction;
- no visual stimulus changes unless explicitly scoped;
- `authoredFeedback` shape preserved consistently with existing M1 content;
- no internal metadata, leakage, DB IDs, StudyLoad IDs, contentKey exposure, or agentic claims in student-facing text;
- static validation passes;
- build may run only if the repair phase allows it;
- smoke/readiness or human review follows before pilot classification.

## Smoke / review implications

After Batch 1 implementation, M1-C01 needs at minimum:

- static review that all four items have brief/complete feedback;
- static review that feedback matches stems, options and keys;
- UI smoke/readiness or human review focused on feedback display;
- later human smoke closeout before C01 is treated as feedback-pilot-safe.

Because this phase does not edit content, no smoke is executed here.

## Explicit non-goals

- no code changes;
- no UI changes;
- no API changes;
- no schema/DB/Prisma changes;
- no route-order/continuity changes;
- no study-load-content registry changes;
- no authoredFeedback changes;
- no visual stimulus content changes;
- no correctOptionKey/contentKey/item count changes;
- no capsule generation;
- no DB mutation;
- no seed or fixture changes;
- no browser automation;
- no API-only tests;
- no production/staging;
- no agentic layer opened.

## Scope safety

Documentation/pedagogical planning only. The registry was inspected read-only. No feedback was authored or edited, and no code, content, DB, schema, UI, route-order, continuity, visual stimulus, fixture, key, item count, or contentKey was changed.

## Result

```text
M1_AUTHORED_FEEDBACK_P0_REPAIR_PLAN_COMPLETED_WITH_BATCH_1_RECOMMENDED
```

## Next recommended phase

```text
MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-P0-REPAIR-BATCH-1
```

Reason:

```text
Batch 1 can safely edit feedback for a single capsule, M1-C01, where all P0 issues are missing authoredFeedback and no key conflict or complex visual dependency was found.
```
