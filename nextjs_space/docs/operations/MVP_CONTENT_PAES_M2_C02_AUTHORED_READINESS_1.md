# MVP-CONTENT-PAES-M2-C02-AUTHORED-READINESS-1

## Phase

MVP-CONTENT-PAES-M2-C02-AUTHORED-READINESS-1

## Baseline before

```text
HEAD = origin/main = origin/HEAD = 0e31c1b5f13cd9a6abf88b7a58e50d4b0c4b8a72
working tree clean
```

## Context Gate

Read before documenting:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C02_READINESS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_CLOSEOUT_1.md`
- `nextjs_space/docs/operations/MVP_UI_M2_C01_BRANDING_BASELINE_CLOSEOUT_1.md`

## Files searched

Search scope was read-only and covered:

- `nextjs_space/docs/operations`
- `nextjs_space/docs/strategy`
- `nextjs_space/lib`
- `nextjs_space/app`
- `nextjs_space/scripts`
- `nextjs_space/prisma`

Search terms included:

```text
PAES_M2
M2_C01
M2_C02
M2-C01
M2-C02
Modelacion
funciones
expresiones
algebra
geometria
estadistica
datos
```

## Files read

- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C02_READINESS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_CLOSEOUT_1.md`
- `nextjs_space/docs/operations/MVP_UI_M2_C01_BRANDING_BASELINE_CLOSEOUT_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md`
- `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M2_INTEGRADO.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M2_DERIVATION_GOVERNING_DOCUMENT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M2_PRECONTRACT.md`
- `nextjs_space/docs/strategy/MVP_COMMERCIAL_PAES_M2_ALIGNMENT_1_CONTROLLED_OFFICIAL_SOURCE_ALIGNMENT_MAP.md`
- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`

## M2-C01 dependency

M2-C01 is the accepted baseline dependency for this phase:

```text
M2-C01 implemented: YES
M2-C01 statically reviewed: YES
M2-C01 reachable/opened from PAES_M2: YES
Observed exercise count: 4
Brief feedback: PASS
Complete feedback: PASS
Self-report: PASS
Post-completion navigation: PASS
Responsive capsule layout: PASS
Dashboard/ST/branding baseline: PASS
```

M2-C02 should continue the M2 sequence without reopening M2-C01 scope.

## M2-C02 readiness position

M2-C02 exists only as a planning candidate, not as implemented content.

Evidence from `MVP_CONTENT_PAES_M2_C02_READINESS_1.md` and `MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md`:

```text
M2-C02 exists: YES, PLANNING_CANDIDATE_ONLY
Authored: NO
Implemented: NO
Seeded: NO
Static-reviewed: NO
Smoke-ready: NO
```

The planning candidate is:

```text
Visible correlative: M2-C02
Candidate title: Analisis de datos y probabilidad en tabla
Axis/family: probability/statistics/data
Suggested exercises: 4
Stimulus: table
Stimulus classification: TABLE_REQUIRED_SUPPORTED
Main risk: wrong denominator or confusing table labels
```

`nextjs_space/lib/study-load-content.ts` currently has only the PAES_M2 M2-C01 StudyLoad content entry and visible correlative mapping. No static M2-C02 entry was found.

## Pedagogical purpose

M2-C02 should introduce a controlled PAES_M2 data/probability capsule after the M2-C01 modelling baseline.

Proposed purpose:

```text
Interpret a small table in a PAES_M2-style context to compute or compare probabilities/proportions, justify the selected option, and detect denominator or table-reading errors.
```

This extends M2-C01 by moving from algebraic/function modelling into data interpretation and probabilistic reasoning, while preserving M2 standards: concise scope, evidence-based reasoning, error control, and complete authored feedback.

M2-C02 should not redundantly repeat fixed/variable expression modelling from M2-C01. It should reinforce representation, interpretation, and justification through table data.

## Proposed eje/habilidad

Proposed eje/habilidad:

```text
Primary: Datos, probabilidad y estadistica.
Supporting skills: problem solving, representation, argumentation.
Conditional supporting skill: modelling, when the student translates table data into a proportion, probability, or comparison.
```

This proposal is consistent with the M2 planning candidate and the commercial alignment map, which identifies probability/statistics as a high-level M2 domain requiring explicit attention.

Status:

```text
Eje/habilidad proposed but requires authoring confirmation during implementation.
```

## Proposed capsule structure

Recommended structure for M2-C02:

1. Brief introduction that frames table reading, event selection, denominator control, and PAES_M2 practice scope.
2. Four multiple-choice exercises.
3. Table stimulus for each item, or one controlled shared table only if the cognitive load remains clear on mobile.
4. Brief feedback after answer submission.
5. Complete feedback with step-by-step explanation.
6. Recommendation or review cue focused on table reading, denominator selection, and probability/proportion reasoning.
7. Self-report/autorreporte using the existing capsule flow.

Target exercise count:

```text
4
```

## Exercise profile proposal

This is a profile for authoring, not final exercise content.

Exercise 1:

```text
Interpret a small table and identify the relevant total, category, event, or denominator.
```

Exercise 2:

```text
Compute a simple probability or proportion from table data.
```

Exercise 3:

```text
Compare two probabilities, proportions, or categories using the same table-reading discipline.
```

Exercise 4:

```text
Solve an integrative PAES_M2-style decision problem where the main error trap is denominator confusion, row/column confusion, or reading the wrong event.
```

Constraints:

- Do not create final stems, options, keys, numeric tables, or feedback text in this readiness phase.
- Keep tables small, readable, and auditable.
- Avoid graphs, figures, images, or complex LaTeX unless a later authoring phase explicitly justifies and validates them.

## Feedback authored expectations

M2-C02 implementation must include authoredFeedback for every item.

Brief feedback should:

- identify the key table element or denominator;
- state the central correction or confirmation;
- avoid generic "correct/incorrect only" messaging;
- avoid internal readiness, score, mastery, adaptive AI, Sales-Ready, or route certainty claims.

Complete feedback should:

- restate the mathematical task;
- identify the relevant row, column, event, denominator, or total;
- compute or compare the required value step by step;
- justify why the correct option follows;
- explain the likely denominator/table-reading error behind distractors;
- reference the same table data used in the question;
- remain readable on mobile.

Expected implementation pattern:

```text
authoredFeedback.briefId
authoredFeedback.completeId
authoredFeedback.version
authoredFeedback.brief
authoredFeedback.complete
```

The exact IDs and text must be authored in the implementation phase, not in this readiness phase.

## Technical implementation expectations

Tentative implementation contract:

```text
Program: PAES_M2
Visible correlative: M2-C02
Tentative contentKey: paes_m2_data_probability_table_entry
Tentative title: PAES M2 - Analisis de datos y probabilidad en tabla
Content type: practice
Exercise count: 4
Stimulus shape: tableStimulus
Options: A-D
Authored feedback: required for every item
```

Technical notes:

- `StudyLoadItem` already includes `tableStimulus`.
- `StudyLoadTableStimulus` supports `caption`, `headers`, and `rows`.
- The future implementation phase must verify table rendering in active and completed capsule views.
- The future implementation phase must add only the required static content entry and mapping if that is still the live pattern.
- No route-order, StudyLoad continuity, enrollment, access, StudentAccess, or DB alignment should be bundled into authored implementation unless explicitly opened as a separate authorized phase.
- A static review phase and a human UI smoke readiness phase should follow implementation.

## Quality gates

Before M2-C02 can be considered implementation-ready or smoke-ready, it must satisfy:

- exactly 4 exercises unless a documented authoring reason justifies fewer;
- no ambiguity in denominators, events, labels, or options;
- progressive difficulty across the four items;
- clear continuity with M2-C01 without duplicating it;
- concise and sober PAES_M2 language;
- table headers and rows legible on mobile;
- correct answer keys defensible from the stated data;
- brief and complete feedback for every item;
- complete feedback references the same table data as the exercise;
- no unsupported claims about complete PAES_M2 coverage, readiness, mastery, score, Sales-Ready status, or adaptive AI;
- no images or graph dependencies unless separately controlled and validated;
- no mechanical reuse of M1 feedback style where M2 reasoning requires deeper justification.

## Explicit non-changes

- No M2-C02 implementation.
- No final exercises created.
- No final authoredFeedback created or modified.
- No seed changes.
- No code changes.
- No UI changes.
- No asset changes.
- No schema or migration changes.
- No DB execution.
- No DB mutation.
- No StudentAccess changes.
- No payment/subscription changes.
- No production/staging action.

## Recommended next phase

Recommended next phase:

```text
MVP-CONTENT-PAES-M2-C02-AUTHORED-IMPLEMENT-1
```

Rationale: the authored readiness contract is now sufficiently defined for a future implementation phase to author and register M2-C02 content conservatively, using the planning candidate and existing table stimulus shape as the basis.

## Validation

Planned validation for this documentation-only phase:

```text
git diff --check
secret-pattern scan over modified documentation files
```

## Security notes

No secrets, `.env` values, database URLs, credentials, tokens, cookies, private keys, passwords, or connection strings were requested or printed.

## DB execution by Codex: NOT_EXECUTED_BY_CODEX

## DB mutation by Codex: NOT_EXECUTED_BY_CODEX

## Code changes: NOT_PERFORMED

## Asset changes: NOT_PERFORMED

## Schema changes: NOT_PERFORMED

## Pedagogical capsule content changes: NOT_PERFORMED

## AuthoredFeedback changes: NOT_PERFORMED

## Payment/subscription changes: NOT_PERFORMED

## StudentAccess changes: NOT_PERFORMED

## Result

```text
PAES_M2_C02_AUTHORED_READINESS_COMPLETED
```

## Follow-up/blocker

```text
MVP-CONTENT-PAES-M2-C02-AUTHORED-IMPLEMENT-1
```
