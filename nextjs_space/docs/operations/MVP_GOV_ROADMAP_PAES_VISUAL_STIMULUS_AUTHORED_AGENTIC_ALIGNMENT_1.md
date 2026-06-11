# MVP-GOV-ROADMAP-PAES-VISUAL-STIMULUS-AUTHORED-AGENTIC-ALIGNMENT-1

## Purpose

Document the governance direction that aligns PAES roadmap continuity, the post-C08 state, visual-stimulus reliability, the living PAES capsule standard, and the authored-to-agentic boundary.

This phase freezes direction only. It does not implement continuity, UI copy, rendering, figures, table components, new capsules, or any agentic product layer.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 707a07d3e3e2779873a47951c9737995c52bc792
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 707a07d3e3e2779873a47951c9737995c52bc792
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C08_NEXT_CAPSULE_OR_CYCLE_END_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C08_LECTURA_TABLAS_GRAFICOS_II_HUMAN_UI_SMOKE_CLOSEOUT_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_TEXT_CONTENT_REPAIR_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_GRAPH_RENDERING_CONTENT_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_VISIBLE_CORRELATIVE_RENUMBERING_DOC_1.md`

A documentation search was also run across `PHASE_LOG.md` and `nextjs_space/docs` for roadmap, continuity, StudyLoad, LearningCycle, PAES, visual stimulus, authored feedback, and agentic boundary terms.

## Direction context

M1-C08 - Lectura de tablas y graficos II passed human local/dev smoke with one reported gap: after returning to ST M1, the UI showed a completed-capsule container instead of a next capsule.

The prior technical diagnosis classified current code behavior as an expected sequence end because no next contentKey is mapped after `paes_m1_data_representation_entry_ii`. Direction now clarifies that this must not be interpreted as the end of tutoring. A completed cycle or block is not equivalent to a completed tutoring experience.

C07/C08 also exposed visual-stimulus debt. Missing table data was repaired as textual rows in stems, but human review observed that the tables are not visually formatted as tables. This is acceptable as an interim content repair, but it is not the target standard for PAES visual stimuli where tables, graphs, figures, images, or rendered mathematical notation are part of the assessed skill.

## Decision 1: C08 is not end of tutoring

Completing C08 or completing a cycle/block must not be interpreted as ending the tutoring experience. The tutoring is expected to continue in the short and medium term. A student may prepare for many months. If no next capsule is available, this is a roadmap/continuity/development state to resolve, not a product terminal state.

## Decision 2: do not mask continuity debt with terminal copy

Do not implement UI copy that implies the tutoring is complete. Temporary local/dev copy may indicate that the next capsule is being prepared, but it must not become a substitute for continuity.

The absence of a next capsule should not be normalized as a final product state unless a reviewed roadmap decision explicitly defines a cycle terminal state and a next student action.

## Decision 3: PAES capsule standard remains mandatory

Capsules must respect the living PAES capsule standard: M1/M2 maximum 4 items, authoredFeedback brief/complete where applicable, clear stems/options, no internal leakage, and smoke/QA gates.

The prior 8-item capsules and key-check-only feedback repairs remain evidence that the standard must be applied before scaling authored coverage or enabling agentic behavior.

## Decision 4: visual stimulus strategy

PAES exercises requiring visual stimuli must not be reduced to plain text when the visual stimulus is part of the assessed skill. Tables, graphs, figures, images and rendered mathematical notation require explicit standards.

Accepted hybrid strategy:

- formatted HTML/textual tables for simple data;
- deterministic and versioned SVG for simple graphs and figures;
- parametric SVG templates for scale;
- audited static asset bank for critical or high-risk cases;
- AI only as an assistant for specification drafting and QA.

## Decision 5: trusted figure generation rule

Bexauri will not use free-form AI-generated images/figures as final student-facing assets for PAES. AI may draft specs; deterministic renderers or approved static assets must produce the final visual; human/QA must approve before student exposure.

Frozen rule:

```text
AI may draft.
Deterministic renderer must produce.
Human/QA must approve.
```

## Decision 6: authored-to-agentic boundary

Agentic productive generation is not approved for immediate MVP. The first acceptable agentic layer is internal supervisor/QA assistance. Recommendation over authored/curated bank may come later. Feedback generation, remediation and new exercise generation require additional gates.

Boundary:

1. Agentic supervisor / QA assistant may be evaluated first as an internal tool.
2. Agentic recommendation may later suggest a next capsule from an authored/curated bank.
3. Agentic assembly requires sufficient authored bank coverage and reliable metadata.
4. Agentic feedback is not productive yet; it may only be drafted internally under supervision.
5. Agentic remediation comes later, after evidence and QA gates.
6. Agentic content generation is not part of immediate MVP.

## Roadmap implication

The roadmap should not treat C08 as the end of tutoring. Before continuing implementation of additional capsules or UI transition behavior, the product needs a stable PAES visual-stimulus standard, figure/spec QA rules, a minimum table-rendering path, an impact audit of existing M1 capsules, and an authored coverage threshold for closed pilot and later agentic layers.

This direction prevents three failure modes:

- replacing tutoring continuity with misleading terminal copy;
- scaling PAES capsules without reliable feedback and visual-stimulus standards;
- opening agentic generation before an authored and QA-backed base exists.

## Immediate next phases

1. `MVP-GOV-PAES-VISUAL-STIMULUS-STANDARD-1`
   Define when a table, graph, figure, image, or LaTeX is required.

2. `MVP-GOV-PAES-FIGURE-SPEC-AND-QA-STANDARD-1`
   Define FigureSpec, states, audit, snapshots, approved/deprecated, and the anti-free-AI rule.

3. `MVP-UI-PAES-TABLE-STIMULUS-MINIMUM-1`
   Implement minimum formatted table support for capsules like C07/C08.

4. `MVP-GOV-PAES-M1-CAPSULE-STANDARD-IMPACT-AUDIT-1`
   Audit existing M1 capsules against the pedagogical, rendering, and feedback standard.

5. `MVP-ROADMAP-PAES-AUTHORED-COVERAGE-PLAN-1`
   Define authored M1/M2/L1 threshold before closed pilot and before agentic.

## Explicit non-goals

- no implement UI/copy terminal state in this phase;
- no implement next capsule continuity in this phase;
- no implement figures/SVG/table rendering in this phase;
- no open agentic generation;
- no modify pedagogical content;
- no mutate DB;
- no production/staging.

## Scope safety

Documentation/governance only. No code files, UI files, API files, schema/DB/Prisma files, seed scripts, fixtures, route-order/continuity files, auth/access files, package files, migrations, study-load registry, or authoredFeedback content were modified.

No build, browser automation, API-only tests, DB reset, seed, fixture mutation, production/staging operation, migration, `prisma db push`, or `prisma migrate` was executed.

## Result

```text
ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_ACCEPTED
```
