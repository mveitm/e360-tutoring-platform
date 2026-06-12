# MVP-CONTENT-PAES-M2-C01-AUTHORED-READINESS-1

## Purpose

Prepare documentary readiness for the first authored PAES_M2 capsule:

```text
M2-C01
```

This phase defines what M2-C01 should be before any registry edit or student-facing content implementation. It does not write final items, final answer keys, final authoredFeedback, visual stimuli, UI, DB/schema, route-order/continuity, or agentic behavior.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 6c0733173ea30c9cce7fd5b108ffa6f87b29ec81
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 6c0733173ea30c9cce7fd5b108ffa6f87b29ec81
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md`
- `nextjs_space/docs/operations/MVP_ROADMAP_PAES_M2_L1_AUTHORED_MINIMUM_SCOPE_1.md`
- `nextjs_space/docs/operations/MVP_ROADMAP_PAES_AUTHORED_COVERAGE_PLAN_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M1_CURRENT_SET_HUMAN_REGRESSION_SMOKE_CLOSEOUT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_CODEX_PRO_PHASE_PROMPT_GOLDEN_RULE_1.md`

Required documentation search was executed across `PHASE_LOG.md`, `nextjs_space/docs`, and `nextjs_space/lib` for PAES_M2, M2-C01, M2, seed, authored, StudyLoad, feedback, visual stimulus, LaTeX, tables, graphs, figures, probability, functions, geometry and statistics terms.

## Seed plan anchor

Source phase:

```text
MVP-CONTENT-PAES-M2-AUTHORED-SEED-PLAN-1
PAES_M2_AUTHORED_SEED_PLAN_COMPLETED_WITH_C01_READINESS_RECOMMENDED
```

The seed plan selected:

```text
M2-C01 - Modelacion con expresiones y funciones
```

Reason:

```text
M2-C01 is representative of PAES_M2 mathematical reasoning, can be authored with low visual risk, can use text/simple notation, can receive complete authored feedback, and is smokeable in local/dev without graph, figure, LaTeX, DB/schema, route-order/continuity or agentic dependencies.
```

## M2-C01 selected scope

Selected scope:

- visible correlative: `M2-C01`;
- title: `Modelacion con expresiones y funciones`;
- program: `PAES_M2`;
- suggested contentKey: `paes_m2_modeling_expressions_functions_entry`;
- contentVersion: `v1`;
- contentType: `practice`;
- objective: translate contextual conditions into algebraic/function expressions and evaluate them;
- skill family: algebra/functions/modelling;
- difficulty: low-medium M2 entry;
- item count: 4 suggested, maximum 4;
- item types: multiple-choice, text-first, contextual modelling and evaluation;
- visual stimulus classification: `NO_VISUAL_BLOCKER`;
- math rendering classification: plain text acceptable if notation remains unambiguous;
- risk: low visual risk, medium pedagogical risk if items become too procedural or too close to M1.

## Pedagogical objective

M2-C01 should validate that Bexauri can support a first PAES_M2 authored capsule without relying on complex rendering.

Pedagogical objective:

```text
The student interprets short contexts, defines or identifies variables, builds expressions/functions, evaluates them, and recognizes the correct model or value.
```

The capsule should test M2-relevant reasoning while remaining closable:

- model a condition from context;
- choose an expression or function that represents a relation;
- evaluate a function/expression for a given value;
- interpret a parameter or result in context.

It must not claim full M2 coverage or diagnose M2 readiness.

## Item design constraints

M2-C01 item constraints:

- 3-4 exercises, with 4 preferred if each item remains short;
- one defensible `correctOptionKey` per item;
- four multiple-choice options per item unless existing implementation pattern requires otherwise;
- no graph, geometry figure, data table or image required to solve;
- notation must be simple enough for plain text;
- contexts must be concrete and not overly verbose;
- numbers should be readable and avoid unnecessary arithmetic noise;
- item sequence should move from expression setup to function evaluation/interpretation;
- no internal rationale, source-finalization note, key-validation note or metadata in student-facing text.

Suggested item mix for the implementation phase:

| item | focus | intended evidence | visual/math risk |
| --- | --- | --- | --- |
| q1 | identify expression from a context | can translate fixed and variable quantities | low |
| q2 | evaluate expression/function in context | can substitute and compute meaningfully | low |
| q3 | choose function rule from verbal relation | can map relation to symbolic form | low |
| q4 | interpret parameter/result | can connect algebraic structure to context | low-medium |

Final item wording, options and keys are not authored in this readiness phase.

## Visual / math rendering implications

Primary classification:

```text
NO_VISUAL_BLOCKER
```

M2-C01 should avoid:

- tables;
- graphs;
- geometry figures;
- images/assets;
- multi-line algebraic systems;
- fractions/exponents/roots that are ambiguous in plain text;
- notation that requires LaTeX to preserve meaning.

Acceptable notation:

- simple linear expressions such as `3x + 500`;
- simple function notation only if it remains readable, such as `f(x) = 2x + 1`;
- simple substitution statements in feedback.

If the implementation phase introduces fractions, exponents, systems, functions with domains/ranges, inequalities, or multi-step algebra that becomes visually ambiguous, it must stop or open:

```text
MVP-CONTENT-PAES-M2-C01-VISUAL-OR-MATH-DEPENDENCY-PLAN-1
```

## authoredFeedback requirements

M2-C01 must include full authoredFeedback shape per item:

```ts
authoredFeedback: {
  briefId: string,
  completeId: string,
  version: string,
  brief: string,
  complete: string,
}
```

Brief feedback must:

- be student-facing;
- be concise;
- name the modelling or evaluation idea;
- point to the first correction/review focus;
- avoid key-check-only language;
- avoid internal metadata or roadmap comments.

Complete feedback must:

- restate what the item asks;
- define the relevant variable, expression, function or value;
- solve step by step;
- justify the correct alternative;
- explain a likely modelling, substitution, or interpretation error;
- connect back to PAES_M2 mathematical reasoning;
- avoid leakage, Sales-Ready, M2-ready, adaptive AI, mastery, theta, PAES score or route-certainty claims.

## Proposed content contract

```text
program: PAES_M2
visibleCorrelative: M2-C01
title: Modelacion con expresiones y funciones
contentKey: paes_m2_modeling_expressions_functions_entry
contentVersion: v1
contentType: practice
skillFamily: algebra/functions/modelling
itemCount: 4 preferred; maximum 4
visualStimulus: NO_VISUAL_BLOCKER
mathRendering: plain text acceptable if notation remains unambiguous
authoredFeedback: brief/complete required for every item
risk: low visual risk; medium risk of overcopying M1 or overclaiming M2 readiness
```

This contract is documentary. The future implementation phase must still author final stems, options, correctOptionKey values and feedback text under its own explicit scope.

## Implementation safety rules

Future implementation must:

- preserve PAES capsule standards;
- use stable `contentKey`;
- include the complete authoredFeedback shape;
- keep item count at 4 or fewer;
- avoid complex visual/math dependencies;
- not modify DB/schema/Prisma;
- not mutate fixtures or runtime data;
- not touch route-order/continuity unless a later phase explicitly scopes it;
- not open agentic behavior;
- run `git diff --check`, `git status --short`, `git log --oneline --decorate --graph -8`, and build/static validation if the project permits.

Future implementation must stop if:

- final item design requires graph/figure/table/image support;
- notation requires LaTeX or rendered math to avoid ambiguity;
- a correct answer/key conflict appears;
- route-order/continuity changes become necessary;
- implementation requires DB/schema/Prisma or fixture mutation;
- authoredFeedback cannot be completed to standard.

## Smoke/readiness criteria

Before M2-C01 human UI smoke readiness:

- registry implementation exists in an authorized future phase;
- visible `M2-C01` correlative is available in the rendered UI surface or documented as display-compatible;
- contentKey resolves to interactive StudyLoad content;
- 3-4 items render correctly;
- brief feedback is present per item;
- complete/paso-a-paso feedback is present per item;
- no graph/table/figure/image dependency is missing;
- no internal leakage appears;
- no technical IDs appear as student-facing orientation labels;
- no M2-ready, Sales-Ready, agentic, mastery, theta or score claim appears.

## Explicit non-goals

- no code changes;
- no UI changes;
- no API changes;
- no schema/DB/Prisma changes;
- no route-order/continuity changes;
- no study-load-content registry changes;
- no authoredFeedback real content changes;
- no visual stimulus content changes;
- no correctOptionKey/contentKey/item count changes;
- no final stems/options;
- no tableStimulus changes;
- no capsule generation;
- no DB mutation;
- no fixture changes;
- no browser automation;
- no API-only tests;
- no production/staging;
- no agentic layer opened.

## Scope safety

Documentation/content/pedagogical readiness only. This phase defines M2-C01 as a future low-risk authored capsule candidate and establishes implementation gates. No student-facing content, registry entry, key, feedback, stimulus, route-order, continuity, UI, API, DB, schema, fixture, production/staging or agentic behavior was changed.

## Result

```text
PAES_M2_C01_AUTHORED_READINESS_COMPLETED_WITH_IMPLEMENT_RECOMMENDED
```

## Next recommended phase

```text
MVP-CONTENT-PAES-M2-C01-AUTHORED-IMPLEMENT-1
```
