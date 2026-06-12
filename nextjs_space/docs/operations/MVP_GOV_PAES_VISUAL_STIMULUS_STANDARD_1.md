# MVP-GOV-PAES-VISUAL-STIMULUS-STANDARD-1

## Purpose

Define the PAES visual-stimulus standard for Bexauri capsules.

This phase establishes when a PAES capsule may use plain text and when it must require a formatted table, graph, geometry figure, image/asset, diagram, rendered mathematical notation / LaTeX-equivalent notation, or structured L1 source text.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = c5a21e84172be2a6682c2908a301f5e6c3a15c1f
```

Accepted prior decision:

```text
MVP-GOV-ROADMAP-PAES-VISUAL-STIMULUS-AUTHORED-AGENTIC-ALIGNMENT-1
ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_ACCEPTED
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = c5a21e84172be2a6682c2908a301f5e6c3a15c1f
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_GRAPH_RENDERING_CONTENT_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_TEXT_CONTENT_REPAIR_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C08_NEXT_CAPSULE_OR_CYCLE_END_DIAGNOSIS_1.md`

Documentation search was executed across `PHASE_LOG.md` and `nextjs_space/docs` for PAES, visual stimulus, tables, graphs, figures, images, SVG, LaTeX, geometry, L1, feedback, authored, and agentic terms.

## Standard scope

This standard applies to authored PAES capsules before implementation, smoke, repair, or future agentic assistance.

It covers student-facing stimuli required to solve or review an item:

- formatted tables;
- graphs;
- geometry figures;
- images/assets;
- diagrams;
- rendered mathematical notation or LaTeX-equivalent notation;
- structured source text for Competencia Lectora L1.

## General rule

A PAES capsule may use plain text only when the assessed skill does not depend on visual/spatial/tabular/mathematical rendering. If the stimulus is part of the assessed skill, the stimulus must be visible, legible, unambiguous and auditable.

Text-only representation can be accepted for transitional repair only when it preserves the full data, does not change the expected answer, and is explicitly tracked as debt if it is not the final target representation.

## Severity classification

BLOCKER:

- required table/graph/figure/image/math expression is missing;
- visual stimulus contradicts the stem, options, key or feedback;
- stimulus can induce a wrong answer;
- notation is ambiguous enough to affect solving;
- feedback depends on a visual stimulus not shown.

NON_BLOCKING_DEBT:

- stimulus is present and correct but visually rough;
- table is readable but not ideally formatted;
- figure is correct but could improve aesthetics;
- mobile readability is acceptable but not optimal.

## Tables standard

Plain text row data is acceptable only as temporary bridge or for very small data sets.

A formatted table is required when:

- table reading is the assessed skill;
- there are multiple rows/columns;
- headers are semantically important;
- comparison across rows/columns is required;
- row text could confuse the student.

Minimum table expectations:

- headers and values must be clearly distinguishable;
- units must be visible when needed;
- row/column alignment must not alter interpretation;
- feedback must refer to the same rows, columns, or values shown to the student.

## Graphs standard

A graph/visual component is required when the exercise asks the student to interpret:

- slope;
- trend;
- intercept;
- coordinate position;
- bar comparison;
- line graph behavior;
- visual data pattern.

Textual description is acceptable only when the graph is not central to the assessed skill.

If graph reading is the skill, prose-only values are at most a bridge. The target state is a rendered, deterministic, auditable graph or approved equivalent visual representation.

## Geometry figures standard

A figure is required when spatial relations are part of the reasoning:

- angles;
- side relations;
- area/perimeter composition;
- similarity/congruence;
- circles;
- coordinate geometry;
- composite figures.

If the figure is not to scale, the item must say so or avoid relying on visual proportion.

Geometry figures must be deterministic or approved static assets. Labels, lengths, angle marks, axes, and units must be visible enough to support solving and feedback review.

## Images/assets standard

Static audited assets may be used for cases not covered by deterministic templates.

Free-form AI-generated images/figures must not be final student-facing PAES assets.

Approved images/assets must have:

- a stable asset identifier;
- source or creation custody;
- review status;
- version or replacement path;
- accessibility description when needed for comprehension or QA.

## Mathematical notation / LaTeX standard

Rendered math or LaTeX-equivalent notation is required when plain text can create ambiguity:

- fractions;
- exponents;
- roots;
- systems;
- functions with domains/ranges;
- inequalities;
- coordinate notation;
- multi-step algebraic expressions.

Simple expressions may remain text if unambiguous.

Notation must preserve the intended precedence, grouping, signs, variables, units, and answer logic. Feedback must use compatible notation with the item.

## L1 reading text standard

For Competencia Lectora L1:

- text base must be visually separated from questions;
- fragments/citations must be clear;
- questions must not overload the same screen unnecessarily;
- plain text is acceptable only when structure remains readable.

L1 source text must remain text-bound and auditable. Paragraphing, speaker changes, headings, citations, and excerpts must be clear enough that the assessed reading skill is not replaced by layout confusion.

## Feedback dependency standard

Feedback must reference the same stimulus shown to the student. If feedback explains a table, graph, figure or expression, that stimulus must be visible or clearly represented in the item.

Feedback that refers to absent or contradictory visual data is a blocker. Feedback may explain how to read the stimulus, but it must not introduce unseen data required to justify the answer.

## Accessibility and mobile readability

Visual stimuli must remain readable on expected student devices.

Minimum expectations:

- labels and values remain legible on mobile;
- horizontal overflow does not hide required data without a clear affordance;
- color is not the only carrier of meaning;
- diagrams and graphs have enough contrast;
- touch targets and adjacent text do not overlap the stimulus;
- stimulus ordering remains coherent with the stem, options, and feedback.

## QA checklist

Before a PAES capsule is accepted, QA must confirm:

- every required stimulus is present;
- the stimulus matches stem, options, correct key, and feedback;
- table/graph/figure/image/math/L1 text requirements are classified correctly;
- any plain-text bridge is explicitly accepted as temporary and non-misleading;
- no stimulus can reasonably induce a wrong answer;
- feedback depends only on visible or clearly represented stimulus data;
- mobile readability is acceptable;
- accessibility risks are recorded;
- human/QA approval is recorded before student-facing use.

## Impact on authored capsules

Authored capsules must identify required visual stimuli during the pedagogical gate, before implementation or smoke.

Existing capsules with plain text rows may remain only if the assessed skill is not materially degraded or if the phase explicitly classifies the state as temporary bridge. Table/graph/figure/image/math/L1 stimulus debt must not be hidden by passing functional smoke alone.

## Impact on agentic boundary

Agentic generation must not create final student-facing visual stimuli. AI may assist in drafting specifications or QA, but deterministic renderers or approved static assets must produce the final stimulus and human/QA must approve it.

This preserves the accepted direction:

```text
AI may draft.
Deterministic renderer must produce.
Human/QA must approve.
```

## Explicit non-goals

- no code changes;
- no UI changes;
- no API changes;
- no schema/DB/Prisma changes;
- no route-order or continuity changes;
- no capsule generation;
- no HTML/SVG/LaTeX implementation;
- no table-rendering implementation;
- no image/asset generation;
- no agentic product layer;
- no DB mutation;
- no production/staging operation.

## Result

```text
PAES_VISUAL_STIMULUS_STANDARD_ACCEPTED
```

## Next recommended phase

Recommended next phase:

```text
MVP-GOV-PAES-FIGURE-SPEC-AND-QA-STANDARD-1
```

Purpose:

```text
Define FigureSpec, visual stimulus ids, versioning, status draft/approved/deprecated, snapshots, QA checklist and approved asset/template workflow.
```
