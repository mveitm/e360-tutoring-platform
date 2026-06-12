# MVP-GOV-PAES-FIGURE-SPEC-AND-QA-STANDARD-1

## Purpose

Define the `FigureSpec` / `VisualStimulusSpec` and QA standard for reliable PAES visual stimuli in Bexauri.

This phase defines how PAES figures, graphs, visual tables, images/assets, diagrams, rendered mathematical notation, and related visual stimuli are identified, versioned, audited, reviewed, and approved before student-facing use.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = dc28a3c5ddafc8aa0d341321bea17e034a636b1f
```

Accepted source phases:

```text
MVP-GOV-PAES-VISUAL-STIMULUS-STANDARD-1
PAES_VISUAL_STIMULUS_STANDARD_ACCEPTED

MVP-GOV-ROADMAP-PAES-VISUAL-STIMULUS-AUTHORED-AGENTIC-ALIGNMENT-1
ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_ACCEPTED
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = dc28a3c5ddafc8aa0d341321bea17e034a636b1f
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_GRAPH_RENDERING_CONTENT_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_TEXT_CONTENT_REPAIR_1.md`

Documentation search was executed across `PHASE_LOG.md` and `nextjs_space/docs` for FigureSpec, figureId, visual stimulus, tables, graphs, figures, images, assets, SVG, snapshots, status, QA, audit, LaTeX, rendering, and the accepted deterministic-renderer rule.

## Relationship to PAES visual stimulus standard

The PAES visual stimulus standard defines when a capsule may use plain text and when a table, graph, figure, image/asset, diagram, or rendered mathematical notation is required.

This phase defines the auditable contract and QA workflow for those required stimuli. It does not implement rendering. It establishes the governance shape that later UI/rendering phases must satisfy.

## FigureSpec purpose

FigureSpec / VisualStimulusSpec defines the auditable contract between a PAES item and its required visual stimulus. Its purpose is to ensure that any table, graph, figure, image, diagram or mathematical visual shown to the student is identifiable, versioned, reviewable and approved.

## VisualStimulusSpec schema draft

This is a documentary contract draft, not mandatory code in this phase:

```ts
type VisualStimulusSpec = {
  stimulusId: string
  version: string
  type:
    | "table"
    | "bar_chart"
    | "line_graph"
    | "cartesian_plane"
    | "geometry_figure"
    | "static_image"
    | "diagram"
    | "math_render"
  sourceType:
    | "html_table"
    | "svg_template"
    | "static_asset"
    | "latex_render"
    | "text_bridge"
  templateId?: string
  assetPath?: string
  params?: Record<string, unknown>
  itemRefs: string[]
  capsuleRefs: string[]
  status: "draft" | "approved" | "deprecated"
  review: {
    reviewedBy?: string
    reviewedAt?: string
    checklistVersion?: string
    notes?: string
  }
}
```

Future implementation may adapt naming or storage, but must preserve these governance semantics: stable identification, versioning, source type, item/capsule references, status, and review evidence.

## Required identifiers

Every visual stimulus must have:

- stimulusId;
- version;
- type;
- sourceType;
- itemRefs or capsuleRefs;
- status;
- review metadata before student-facing use.

`stimulusId` should be stable across versions. Item and capsule references must be specific enough to trace which student-facing exercises depend on the stimulus.

## Versioning standard

Any change that can affect interpretation, labels, values, geometry, data, scale, key, options or feedback requires a version increment and re-approval.

Version increments are required for:

- data value changes;
- label, unit, axis, coordinate, or legend changes;
- geometry proportions or relation changes;
- scale changes;
- template parameter changes that affect appearance or interpretation;
- asset replacement;
- notation/rendering changes that affect mathematical parsing;
- stem, option, key, or authoredFeedback changes that alter stimulus dependency.

Purely internal metadata edits that do not affect student-facing meaning may avoid version increment, but should still be auditable.

## Status lifecycle

draft:
  stimulus exists but is not approved for student-facing use.

approved:
  stimulus passed QA and may be used in student-facing capsules.

deprecated:
  stimulus should not be used in new capsules and remains only for historical traceability.

Student-facing items must not depend on `draft` stimuli. Deprecated stimuli may remain referenced by historical evidence only when needed to understand prior capsules or QA records.

## Renderer/source types

html_table:
  for structured tables and small data matrices.

svg_template:
  for deterministic graphs and figures.

static_asset:
  for audited images/SVG/PNG that are not generated by template.

latex_render:
  for mathematical notation where plain text is ambiguous.

text_bridge:
  temporary bridge only; acceptable when data is simple and unambiguous, not as final standard when visual reading is assessed.

## Approved source rule

Free-form AI-generated images/figures are not approved final student-facing PAES stimuli. AI may draft specifications or QA observations, but the final stimulus must be produced by deterministic renderer or approved static asset and approved by human/QA.

Accepted operating rule:

```text
AI may draft.
Deterministic renderer must produce.
Human/QA must approve.
```

## Parameter and content integrity

The stimulus data must match the stem, options, correct key and authoredFeedback. Labels, units, coordinates, values and visual relations must not introduce extra information or contradictions.

Integrity checks must include:

- the same values appear in stimulus and feedback;
- visual labels do not imply a different unit or category;
- graph axes and scales match the intended answer;
- geometry markings match stated relations;
- images/assets do not contain unintended cues;
- rendered math preserves the intended expression;
- no internal rationale or implementation notes leak into student-facing stimulus fields.

## Snapshot / preview standard

Every non-trivial visual stimulus should have a preview/snapshot or equivalent reviewable rendering before approval. Snapshot may be manual/documented in early MVP phases and automated later.

For early MVP, a documented preview can be:

- a human-visible rendered screenshot;
- a static exported asset;
- a Markdown table preview;
- a parameter summary plus manually reviewed render;
- a documented textual bridge only when explicitly temporary.

Approval must be based on the same rendering path or approved asset intended for student-facing use.

## Human QA checklist

Human QA must verify:

- stimulus matches stem;
- stimulus matches options;
- stimulus matches correct key;
- stimulus matches feedback;
- labels and units are correct;
- values and coordinates are correct;
- if not to scale, that is explicit or irrelevant;
- visual proportions do not induce false reasoning;
- no visual leakage of answer;
- legible on mobile;
- accessible enough for MVP;
- status set to approved only after review.

Any failed item that can affect solving, feedback, or trust blocks student-facing approval.

## Automatic/static QA checklist

Automatic or static QA should verify:

- required fields present;
- status is not draft for student-facing items;
- itemRefs/capsuleRefs present;
- sourceType allowed;
- templateId or assetPath present when required;
- no internal notes or leakage in student-facing fields;
- version present;
- params present for template-driven sources.

Later implementation may add stricter checks for param ranges, schema validation, asset existence, snapshot freshness, and references to authored capsule content.

## Accessibility and mobile checks

Visual stimuli must be readable and usable on the expected student viewport.

QA should check:

- text labels remain legible on mobile;
- table columns do not hide required data without clear scrolling or wrapping;
- charts and figures have sufficient contrast;
- color is not the only carrier of meaning;
- axes, legends, labels, and geometry marks are distinguishable;
- image/asset details needed for solving are not too small;
- rendered math does not wrap into ambiguous fragments;
- the stimulus does not overlap stem, options, or feedback.

## Relationship to authored capsules

A PAES authored capsule that requires a visual stimulus is not complete until the stimulus is present, reviewable and approved. Smoke may pass functionally, but pedagogical completion requires visual stimulus compliance.

Authored capsule documentation should identify required `stimulusId` references before implementation or smoke readiness. Existing text bridges must be classified explicitly and should not be treated as final compliance when table/graph/figure reading is the assessed skill.

## Relationship to agentic boundary

Agentic systems may propose VisualStimulusSpec drafts, detect missing stimuli, flag inconsistencies or assist QA. They may not approve or publish final student-facing visual stimuli without deterministic rendering and human/QA approval.

Agentic assistance is advisory until a later governance phase defines a controlled operational layer. Approval authority remains human/QA.

## Examples

Example 1: table stimulus for C07/C08-like item.

```ts
{
  stimulusId: "paes-m1-c07-q1-books-table",
  version: "1.0.0",
  type: "table",
  sourceType: "html_table",
  params: {
    columns: ["Curso", "Libros leidos"],
    rows: [
      ["1 medio", 12],
      ["2 medio", 15],
      ["3 medio", 18],
      ["4 medio", 21],
    ],
  },
  itemRefs: ["paes_m1_data_representation_entry:q1"],
  capsuleRefs: ["paes_m1_data_representation_entry"],
  status: "draft",
  review: {}
}
```

Example 2: right triangle SVG template.

```ts
{
  stimulusId: "paes-m1-geometry-right-triangle-area-v1",
  version: "1.0.0",
  type: "geometry_figure",
  sourceType: "svg_template",
  templateId: "right_triangle_labeled_sides",
  params: {
    base: 8,
    height: 6,
    rightAngleMarker: true,
    labels: { base: "8 cm", height: "6 cm" },
    scaleNote: "not_to_scale",
  },
  itemRefs: ["example_geometry_item:q1"],
  capsuleRefs: ["example_geometry_capsule"],
  status: "draft",
  review: {}
}
```

Example 3: line graph SVG template.

```ts
{
  stimulusId: "paes-m1-line-graph-temperature-days",
  version: "1.0.0",
  type: "line_graph",
  sourceType: "svg_template",
  templateId: "line_graph_xy_discrete",
  params: {
    xLabel: "Dia",
    yLabel: "Temperatura (grados C)",
    points: [
      ["Lunes", 18],
      ["Martes", 21],
      ["Miercoles", 20],
    ],
  },
  itemRefs: ["example_graph_item:q1"],
  capsuleRefs: ["example_graph_capsule"],
  status: "draft",
  review: {}
}
```

Example 4: deprecated static asset.

```ts
{
  stimulusId: "paes-m1-static-diagram-legacy-001",
  version: "1.1.0",
  type: "static_image",
  sourceType: "static_asset",
  assetPath: "approved-assets/paes/m1/legacy-diagram-001.svg",
  itemRefs: ["legacy_item:q2"],
  capsuleRefs: ["legacy_capsule"],
  status: "deprecated",
  review: {
    reviewedBy: "QA",
    reviewedAt: "2026-06-12",
    checklistVersion: "visual-stimulus-qa-v1",
    notes: "Deprecated after replacement by deterministic SVG template."
  }
}
```

## Explicit non-goals

- no code changes;
- no UI changes;
- no API changes;
- no schema/DB/Prisma changes;
- no route-order or continuity changes;
- no seed, fixture, or migration changes;
- no study-load registry changes;
- no authoredFeedback content changes;
- no capsule generation;
- no SVG/table/rendering implementation;
- no image/asset generation;
- no agentic product layer;
- no DB mutation;
- no production/staging operation.

## Result

```text
PAES_FIGURE_SPEC_AND_QA_STANDARD_ACCEPTED
```

## Next recommended phase

Recommended next phase:

```text
MVP-UI-PAES-TABLE-STIMULUS-MINIMUM-1
```

Purpose:

```text
Implementar soporte minimo de tabla formateada para capsulas como C07/C08, sin abordar todavia motor completo SVG/figuras.
```
