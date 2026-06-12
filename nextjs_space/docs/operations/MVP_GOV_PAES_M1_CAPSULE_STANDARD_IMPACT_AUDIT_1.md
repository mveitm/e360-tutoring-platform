# MVP-GOV-PAES-M1-CAPSULE-STANDARD-IMPACT-AUDIT-1

## Purpose

Audit the currently authored PAES M1 capsule set against the accepted PAES capsule, feedback, visual stimulus, FigureSpec, correlative, smoke, continuity and agentic-boundary standards.

This phase fuses audit and documentary recommendation only. It does not repair, implement, mutate data, or change content.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 9cfd23d3d5cb3d1d2ece9e4518711f8591baab40
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 9cfd23d3d5cb3d1d2ece9e4518711f8591baab40
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_CODEX_PRO_DIAGNOSE_AND_REPAIR_PROTOCOL_1.md`
- `nextjs_space/docs/operations/MVP_GOV_CODEX_PRO_PHASE_PROMPT_GOLDEN_RULE_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_VISIBLE_CORRELATIVE_RENUMBERING_DOC_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_STIMULUS_HUMAN_UI_SMOKE_CLOSEOUT_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_UX_CAPSULE_CORRELATIVE_HUMAN_UI_SMOKE_CLOSEOUT_1.md`
- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`

Required repository search was executed across `PHASE_LOG.md`, `nextjs_space/docs`, `nextjs_space/lib`, `nextjs_space/app`, and `nextjs_space/components`.

## Roadmap anchor

This audit follows the accepted roadmap direction: do not continue adding M1 capsules blindly, do not open productive agentic yet, and verify PAES pedagogical/rendering/feedback standards before scaling authored coverage.

It also applies the Codex PRO golden rule: audit and recommendation are fused, but repair is not fused because findings include roadmap/continuity/visual-standard ordering decisions.

## Audit scope

Scope includes PAES M1 authored registry entries currently present in `study-load-content.ts` plus their documented smoke/continuity state.

Out of scope:

- L1 content;
- M2 content;
- DB/runtime instance inspection;
- new capsules;
- registry edits;
- continuity edits;
- visual-stimulus edits;
- feedback edits;
- agentic implementation.

## M1 capsule inventory

Current route-order visible sequence in code:

| visible correlative | title | contentKey |
| --- | --- | --- |
| M1-C01 | Entrada balanceada inicial | `paes_m1_balanced_entry_initial` |
| M1-C02 | Ecuaciones lineales basicas | `paes_m1_linear_equations_basic` |
| M1-C03 | Problemas con ecuaciones lineales | `paes_m1_linear_equations_word_problems` |
| M1-C04 | Refuerzo de ecuaciones lineales | `paes_m1_linear_equations_reinforcement` |
| M1-C05 | Funciones lineales basicas I | `paes_m1_linear_functions_basic` |
| M1-C06 | Funciones lineales basicas II | `paes_m1_linear_functions_basic_ii` |
| M1-C07 | Lectura de tablas y graficos I | `paes_m1_data_representation_entry` |
| M1-C08 | Lectura de tablas y graficos II | `paes_m1_data_representation_entry_ii` |

Additional authored M1 registry entries outside current natural route-order placement:

| visible status | title | contentKey |
| --- | --- | --- |
| legacy placement pending | Porcentaje y proporcionalidad en contexto | `paes_m1_numbers_percentage_proportionality_entry` |
| legacy placement pending | Area, perimetro y medida en figuras simples | `paes_m1_geometry_area_measure_entry` |

## Audit matrix

| capsule | contentKey | authored state | items | max 4 | feedback brief/complete | required stimulus | visual compliance | smoke / completed state | severity | recommendation |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| M1-C01 Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | implemented registry content | 4 | PASS | BLOCKER: no authoredFeedback on q1-q4 | possible geometry/math notation review for q3/q4; mostly text-solvable | not fully audited; no FigureSpec needed unless geometry visual is required later | historical local/dev dry-run evidence exists in archive; current authoredFeedback smoke not closed | BLOCKER | feedback repair; then smoke/readiness |
| M1-C02 Ecuaciones lineales basicas | `paes_m1_linear_equations_basic` | implemented and feedback verified | 4 | PASS | PASS | simple equation text | PASS as text; simple expressions are unambiguous enough for current MVP | verified local/dev vertical slice and completion flow | none material | keep; include in regression smoke |
| M1-C03 Problemas con ecuaciones lineales | `paes_m1_linear_equations_word_problems` | implemented; authoredFeedback repaired | 4 | PASS | PASS statically | text word problems | PASS as text; no required visual found in current stems | human completion passed; led to Refuerzo | none material | keep; include in regression smoke |
| M1-C04 Refuerzo de ecuaciones lineales | `paes_m1_linear_equations_reinforcement` | implemented; authoredFeedback repaired | 4 | PASS | PASS statically and smoke observed | equation text | PASS as text; no required visual found | human UI smoke passed with non-blocking start/refresh UX debt | NON_BLOCKING_DEBT | keep; track UX debt separately |
| M1-C05 Funciones lineales basicas I | `paes_m1_linear_functions_basic` | split from prior 8-item capsule; authoredFeedback preserved | 4 | PASS | PASS | coordinate/function notation; no graph required by current wording | mostly PASS as text; q3 slope from coordinates is text-solvable | human UI smoke passed with non-blocking start/refresh UX debt | NON_BLOCKING_DEBT | keep; include in regression smoke |
| M1-C06 Funciones lineales basicas II | `paes_m1_linear_functions_basic_ii` | split from prior 8-item capsule; authoredFeedback preserved | 4 | PASS | PASS | q8 says "tabla" but represents values inline | DEBT/BLOCKER candidate: q8 should likely use `tableStimulus` because table reading supports solving | human UI smoke passed except recurring start/refresh UX issue | BLOCKER candidate for strict visual standard | visual stimulus repair for q8 before broader pilot |
| M1-C07 Lectura de tablas y graficos I | `paes_m1_data_representation_entry` | split/repaired; tableStimulus added; authoredFeedback present | 4 | PASS | PASS | tables; q4 graph/trend wording | PASS for tableStimulus; q4 remains graph-template debt because a bar graph is described through table data | C07 smoke passed; later completed table stimulus smoke passed | NON_BLOCKING_DEBT / possible graph repair | keep for local/dev; order graph/FigureSpec debt |
| M1-C08 Lectura de tablas y graficos II | `paes_m1_data_representation_entry_ii` | split/repaired; tableStimulus added; authoredFeedback present | 4 | PASS | PASS | tables | PASS for current minimum table stimulus; FigureSpec metadata not formalized | C08 smoke passed; completed table stimulus smoke passed; end-of-sequence after C08 remains roadmap debt | NON_BLOCKING_DEBT | keep for local/dev; continuity roadmap decision required |
| legacy Porcentaje y proporcionalidad | `paes_m1_numbers_percentage_proportionality_entry` | implemented with authoredFeedback | 4 | PASS | PASS | none required beyond text/math | PASS as text | direct local/dev smoke passed historically; not in current route order | ROADMAP_DEBT | placement/correlative decision before reuse |
| legacy Area/perimetro/medida | `paes_m1_geometry_area_measure_entry` | implemented with authoredFeedback | 4 | PASS | PASS | geometry/composite figures likely required by strict standard, especially L-shape and area comparison | BLOCKER under visual stimulus standard until deterministic figure/approved representation exists | direct local/dev smoke passed historically; not in current route order | BLOCKER + ROADMAP_DEBT | figure stimulus repair and placement decision before reuse |

## Blockers

- M1-C01 lacks authoredFeedback brief/complete on q1-q4.
- M1-C06 q8 uses an inline textual table despite explicitly referring to a table; under the current table standard this should be repaired to a formatted table stimulus before broader pilot use.
- Legacy geometry/measure content likely requires deterministic figures or approved visual representations for strict PAES visual compliance, especially composite/rectangular area reasoning.
- Legacy percentage/proportionality and geometry/measure have no current route-order placement or final visible correlativo.
- C08 currently reaches `end_of_sequence`; this must not be treated as end of tutoring, and continuity/product roadmap must decide the next authored path before scaling.
- No productive agentic layer is allowed because authored coverage, visual compliance, and continuity thresholds are not yet complete.

## Non-blocking debts

- M1-C04, M1-C05 and M1-C06 have documented start/resume refresh UX debt in prior human smoke, already treated separately from content quality.
- C07 q4 uses table data as the minimum representation for a graph/trend item; a later graph rendering/FigureSpec repair would improve standards compliance.
- Current tableStimulus support is deterministic and human-smoked, but not yet backed by the full VisualStimulusSpec lifecycle, versioning, status and snapshot workflow.
- Visible correlatives passed human UI smoke, but future admin/support surfaces may still need consistency checks.
- Documentation references still contain historical/legacy correlativos; current communication must use the route-order visible map or explicitly mark legacy labels.

## Pilot-safe authored candidates

Within a local/dev, human-guided, non-public scope:

- M1-C02 through M1-C05 are the strongest authored candidates: 4 items, authoredFeedback present, no required complex visual stimulus, and human smoke/closeout evidence exists.
- M1-C07 and M1-C08 are acceptable for table-stimulus local/dev regression after the recent table renderer and completed-view repair, with graph/FigureSpec debt tracked.
- M1-C06 is usable only with explicit awareness that q8 should receive tableStimulus repair before broader pilot classification.

M1-C01 should not be treated as authored-feedback complete until q1-q4 feedback is repaired.

## Capsules requiring repair before pilot

- M1-C01: feedback repair required.
- M1-C06: table stimulus repair likely required for q8.
- Legacy geometry/measure: figure/visual stimulus repair required before current pilot reuse.
- Legacy percentage/proportionality and geometry/measure: route-order placement and final visible correlativo decision required before current-sequence use.
- Post-C08 continuity: roadmap/coverage decision required before implying tutoring continuation is product-ready.

## Visual stimulus compliance

Compliant or acceptable as text:

- M1-C02, M1-C03, M1-C04, M1-C05.

Minimum implemented but still maturing:

- M1-C07 and M1-C08 have `tableStimulus` and deterministic HTML table rendering. Completed-view rendering was repaired and human-smoked.

Needs repair or stricter QA:

- M1-C06 q8 should be moved from inline "tabla" prose to a structured table stimulus.
- C07 q4 should eventually move from data-table bridge toward graph/visual-stimulus spec if the intended skill is graph trend interpretation.
- Legacy geometry/measure needs deterministic figures or approved visual stimuli if it re-enters current pilot sequence.

## authoredFeedback compliance

Pass:

- M1-C02 through M1-C08, plus both legacy percentage/proportionality and geometry/measure entries, have authoredFeedback brief/complete per item in the current registry.

Fail:

- M1-C01 has correctOptionKey values but no authoredFeedback on q1-q4.

Quality caveat:

- This audit confirms presence and known smoke evidence where documented. It does not replace a later prose-quality audit of all complete feedback.

## Correlative display compliance

Pass for current route-order M1 sequence:

- Visible correlatives M1-C01 through M1-C08 are implemented display-only from existing contentKey mapping.
- Human UI smoke reported all visible capsule correlative verification points passed/OK.

Remaining debt:

- Legacy percentage/proportionality and geometry/measure entries must not reuse old M1-C04/M1-C05 labels without explicit legacy marking.
- Final placement/correlativo for those legacy entries remains undecided.

## Smoke status summary

- M1-C02: authoredFeedback and completion-flow vertical slice verified in local/dev.
- M1-C03: authoredFeedback repaired and human completion passed; next capsule diagnosis confirmed Refuerzo.
- M1-C04: human UI smoke passed with non-blocking refresh UX debt.
- M1-C05: human UI smoke passed after split/alignment with non-blocking refresh UX debt.
- M1-C06: human UI smoke passed with recurring start/refresh UX debt.
- M1-C07/C08: table-stimulus human UI smoke closeout passed after table renderer and completed-view repair.
- M1-C01: current authoredFeedback smoke closeout not established because feedback is absent.
- Legacy percentage/geometry block: direct local/dev smoke passed historically, but labels are legacy and placement is unresolved.

## Continuity and roadmap implication

- M1 current authored set is not clean enough to keep scaling blindly. The route-order C02-C08 path is mostly usable for local/dev regression, but C01 feedback, M1-C06 table stimulus, legacy geometry visuals, legacy placement and post-C08 continuity remain unresolved.
- Repair backlog should precede new authored capsules. The backlog is narrower and safer than opening new M1/M2/L1 coverage immediately.
- The next step should be a repair-backlog ordering phase, followed by either targeted repairs or authored coverage planning once blockers are ordered.
- Agentic remains blocked. Internal supervisor/QA assistance may be planned later, but productive agentic recommendation/generation should wait for authored coverage thresholds, VisualStimulusSpec maturity, and continuity decisions.

## Recommended next phase

Recommended next phase:

```text
MVP-GOV-PAES-M1-CAPSULE-STANDARD-REPAIR-BACKLOG-1
```

Reason:

```text
Blockers and debts need ordering before repairs: M1-C01 authoredFeedback, M1-C06 tableStimulus, legacy geometry figures, legacy placement/correlativo, and post-C08 continuity/product direction.
```

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

Documentation/governance-only audit. All findings are based on static registry/code inspection and existing documentation. No repair was implemented and no runtime data was inspected or changed.

## Result

```text
PAES_M1_CAPSULE_STANDARD_IMPACT_AUDIT_COMPLETED_WITH_REPAIR_BACKLOG_RECOMMENDED
```
