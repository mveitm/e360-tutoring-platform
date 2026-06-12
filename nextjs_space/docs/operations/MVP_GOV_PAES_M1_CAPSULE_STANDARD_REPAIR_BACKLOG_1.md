# MVP-GOV-PAES-M1-CAPSULE-STANDARD-REPAIR-BACKLOG-1

## Purpose

Convert the M1 PAES capsule standard impact audit into a prioritized repair backlog, without implementing any repair.

This phase fuses audit reading, backlog classification, prioritization, and sequence recommendation. It does not fuse or authorize content repair, UI repair, feedback changes, visual stimulus changes, continuity, route-order, DB/schema, or agentic work.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = c0bc2e18ec4bd375949052bb7cb4c97627ff5217
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = c0bc2e18ec4bd375949052bb7cb4c97627ff5217
```

## Source audit

Source audit:

```text
nextjs_space/docs/operations/MVP_GOV_PAES_M1_CAPSULE_STANDARD_IMPACT_AUDIT_1.md
```

Source result:

```text
PAES_M1_CAPSULE_STANDARD_IMPACT_AUDIT_COMPLETED_WITH_REPAIR_BACKLOG_RECOMMENDED
```

Relevant standards read:

- `MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`
- `MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md`
- `MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md`
- `MVP_GOV_ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_1.md`
- `MVP_GOV_CODEX_PRO_DIAGNOSE_AND_REPAIR_PROTOCOL_1.md`
- `MVP_GOV_CODEX_PRO_PHASE_PROMPT_GOLDEN_RULE_1.md`

Required repository search was executed across `PHASE_LOG.md`, `nextjs_space/docs`, and `nextjs_space/lib`.

## Backlog prioritization rules

P0_BLOCKER:

- impedes closed pilot;
- breaks minimum PAES standard;
- affects correct answer;
- lacks authored feedback;
- lacks required visual stimulus;
- exceeds maximum 4 items;
- contains internal leakage;
- cannot be smoke-ready safely.

P1_HIGH:

- does not block all pilot work, but must be repaired before expanding authored coverage;
- affects pedagogical quality or main UX;
- requires bounded technical or content repair.

P2_MEDIUM:

- important improvement but not blocking the current route-order circuit;
- can follow P0/P1.

P3_LOW:

- aesthetic/documentation debt;
- does not affect pedagogical validity or core circuit.

## P0 blockers

1. M1-C01 lacks authoredFeedback brief/complete on q1-q4.
2. M1-C06 q8 refers to a table but stores the relation inline in prose; table reading supports solving and should be a structured `tableStimulus`.
3. Legacy geometry/measure likely requires deterministic figures or approved visual representations before current pilot reuse.
4. Post-C08 continuity/roadmap is unresolved; C08 must not be treated as end of tutoring.

## P1 high-priority repairs

1. Legacy percentage/proportionality and geometry/measure need route-order placement and final visible correlativos before reuse.
2. C07 q4 remains graph-rendering debt: current table bridge is acceptable for local/dev but not the final PAES visual target if graph interpretation is intended.
3. Full VisualStimulusSpec lifecycle is not yet implemented for table/graph/figure stimuli.
4. Feedback quality should be audited across authored capsules after presence gaps are closed.

## P2 medium-priority debts

1. Current route-order M1-C02 through M1-C08 should receive an end-to-end human regression smoke plan after P0 repairs.
2. Recurrent start/resume refresh UX debt affects M1-C04, M1-C05 and M1-C06 but prior smoke classified it as non-blocking for content quality.
3. Completed/admin/support surfaces may need a later correlativo consistency review.

## P3 low-priority debts

1. Historical documentation still contains legacy correlativo references that require careful language when cited.
2. Table visuals are functional but can later improve aesthetics/mobile polish.
3. Some registry metadata remains `internal_provisional` and `available_not_universal`.

## Backlog matrix

| backlogId | priority | type | capsules affected | finding | standard violated or debt type | recommended phase type | diagnose-and-repair? | requires human smoke? | forbidden areas to avoid | recommended phase name | acceptance criteria |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1-P0-001 | P0_BLOCKER | feedback repair | M1-C01 | q1-q4 lack authoredFeedback brief/complete | Feedback breve/completo standard | pedagogy/feedback audit then content repair | No, requires authored feedback decision | Yes after implementation | contentKey, correctOptionKey, item count, route-order, DB/schema | `MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-QUALITY-AUDIT-1` | Feedback requirements for C01 are specified, then a later repair can add brief/complete feedback without altering keys/items. |
| M1-P0-002 | P0_BLOCKER | visual stimulus repair | M1-C06 q8 | inline prose represents a table-to-rule item | Table stimulus standard | narrow UI/content repair plan after spec | Yes, if scoped to existing tableStimulus shape and static registry/UI only | Yes | correctOptionKey, item count, contentKey, route-order, DB/schema | `MVP-UI-PAES-M1-C06-TABLE-STIMULUS-DIAGNOSE-AND-REPAIR-1` | q8 has structured tableStimulus, no duplicate/confusing table prose, build/static checks pass, human smoke confirms readability. |
| M1-P0-003 | P0_BLOCKER | visual stimulus repair | legacy geometry/measure | geometry/composite figure reasoning lacks deterministic figures | Geometry figures standard / FigureSpec | separate visual-spec and rendering plan | No, requires figure spec/design before repair | Yes later | free-form AI final assets, schema, route-order, content keys | `MVP-UI-PAES-GEOMETRY-FIGURE-STIMULUS-PLAN-1` | Required figures are classified, FigureSpec/source type is defined, and implementation path is approved before reuse. |
| M1-P0-004 | P0_BLOCKER | roadmap/coverage | post-C08 | C08 reaches end_of_sequence but is not end of tutoring | Roadmap/continuity direction | roadmap/coverage decision | No | No initially | continuity code, route-order, DB, terminal copy masking debt | `MVP-ROADMAP-PAES-AUTHORED-COVERAGE-PLAN-1` | Defines authored coverage threshold and next continuity strategy without changing code. |
| M1-P1-001 | P1_HIGH | roadmap/coverage | legacy percentage/geometry | final placement/correlativo unresolved | Correlativo/route-order governance | separate roadmap placement decision | No | No initially | route-order/continuity code, registry mutation | `MVP-GOV-PAES-M1-LEGACY-CAPSULE-PLACEMENT-DECISION-1` | Decides whether/where legacy entries belong in current M1 path and assigns future correlativo policy. |
| M1-P1-002 | P1_HIGH | visual stimulus repair | M1-C07 q4 | graph/trend item uses table bridge instead of graph | Graph visual stimulus standard | rendering plan or focused graph repair plan | No unless target renderer already exists | Yes later | SVG engine overreach, schema, route-order | `MVP-UI-PAES-RENDERING-NEXT-MINIMUM-PLAN-1` | Chooses next minimum renderer target and accepts/defers C07 q4 graph repair. |
| M1-P1-003 | P1_HIGH | visual stimulus repair | C07/C08, future visual items | tableStimulus works but lacks full VisualStimulusSpec lifecycle | FigureSpec/QA standard | governance-to-implementation plan | No | Later | schema unless explicitly scoped, DB, production | `MVP-GOV-PAES-VISUAL-STIMULUS-SPEC-IMPLEMENTATION-PLAN-1` | Defines minimal metadata/version/status/snapshot workflow before broad visual expansion. |
| M1-P1-004 | P1_HIGH | feedback repair | M1-C02-C08 and legacy entries | feedback presence is mostly fixed, but prose quality was not fully audited across all complete feedback | Feedback quality standard | pedagogy audit | No | Later if repairs result | direct content edits without audit | `MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-QUALITY-AUDIT-1` | Classifies feedback quality by capsule/item and identifies any repair candidates. |
| M1-P2-001 | P2_MEDIUM | smoke/regression | current M1-C02-C08 | after repairs, current circuit needs regression smoke | Smoke/QA gate | smoke plan | No | Yes | browser automation/API-only tests unless authorized, DB mutation | `MVP-SALES-PILOT-M1-CURRENT-SET-HUMAN-REGRESSION-SMOKE-PLAN-1` | Defines human regression sequence, stop conditions, and evidence capture. |
| M1-P2-002 | P2_MEDIUM | rendering/UI repair | M1-C04-C06 | start/resume refresh UX recurs but did not block content smoke | UX debt | diagnose-and-repair technical phase | Yes, if target remains StartLoadButton/view refresh | Yes | DB/state-machine rewrite, API semantics changes | `MVP-UX-STUDYLOAD-START-RESUME-REFRESH-DIAGNOSE-AND-REPAIR-1` | Start action immediately reveals exercises or refreshes safely; no lifecycle/API meaning changes. |
| M1-P2-003 | P2_MEDIUM | correlative/display repair | admin/support surfaces | visible correlatives passed student smoke but secondary surfaces may lag | Correlative display debt | UI audit/plan | Maybe, only if display-only and source is safe | Yes if UI changed | DB/schema, route-order, content keys | `MVP-UX-CAPSULE-CORRELATIVE-SECONDARY-SURFACES-AUDIT-1` | Identifies whether admin/support surfaces need display-only repair. |
| M1-P3-001 | P3_LOW | documentation | legacy docs | old labels remain in historical docs | Documentation debt | documentation hygiene | No | No | rewriting historical record | `MVP-DOCS-PAES-M1-LEGACY-CORRELATIVE-REFERENCE-HYGIENE-1` | Current docs clearly distinguish current versus historical correlativos. |
| M1-P3-002 | P3_LOW | rendering/UI repair | C07/C08 tables | tables are functional but could improve visual polish | Aesthetic/mobile debt | UI polish phase | Yes if narrow CSS-only | Optional | content, keys, schema | `MVP-UI-PAES-TABLE-STIMULUS-POLISH-1` | Tables remain correct and become more readable without content changes. |

## Diagnose-and-repair candidates

Eligible candidates under the Codex PRO rule:

- `MVP-UI-PAES-M1-C06-TABLE-STIMULUS-DIAGNOSE-AND-REPAIR-1`: likely narrow if it only converts q8 to the existing `tableStimulus` shape and reuses the current table renderer.
- `MVP-UX-STUDYLOAD-START-RESUME-REFRESH-DIAGNOSE-AND-REPAIR-1`: likely narrow if it only fixes stale UI refresh after successful start and avoids state-machine/API semantic changes.
- `MVP-UI-PAES-TABLE-STIMULUS-POLISH-1`: possible narrow CSS/UI polish only after blockers are closed.

Mark as diagnose-and-repair only if:

- technical;
- narrow;
- reversible;
- expected target files known;
- no DB/schema/continuity/route-order;
- no pedagogical decision;
- no contentKey/correctOptionKey/item count changes;
- can be validated by build/static checks plus later human smoke.

## Separate-phase required items

Required separate phases:

- M1-C01 authoredFeedback: requires pedagogical/content decision before any registry repair.
- Legacy geometry figures: requires visual stimulus/FigureSpec design before implementation.
- Post-C08 continuity: requires roadmap/coverage decision and must not be hidden by terminal copy.
- Legacy percentage/geometry placement: requires route-order/correlativo governance before reuse.
- Feedback quality audit: pedagogical review, not a blind technical patch.
- Human smoke execution and closeout: external verification must remain separate.
- Agentic boundary: productive agentic remains blocked until a later governance decision.

## Pilot impact

Closed pilot should not expand from the current authored set until P0 items are ordered and at least the directly blocking C01 feedback and C06 table stimulus gaps are resolved or explicitly excluded from the pilot path.

Safe local/dev regression can continue for already smoke-passed capsules only if it is labelled as regression/verification, not as proof of full authored coverage or readiness for agentic scaling.

The current state supports a repair-first roadmap, not new blind capsule authoring.

## Recommended repair sequence

Recommended sequence:

1. `MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-QUALITY-AUDIT-1`
   Audit feedback quality and specify C01 feedback requirements before any content repair.

2. `MVP-UI-PAES-M1-C06-TABLE-STIMULUS-DIAGNOSE-AND-REPAIR-1`
   If C06 q8 is confirmed narrow and safe, convert it to existing `tableStimulus` shape and smoke later.

3. `MVP-UI-PAES-GEOMETRY-FIGURE-STIMULUS-PLAN-1`
   Define deterministic geometry figure path for legacy geometry/measure before reuse.

4. `MVP-GOV-PAES-M1-LEGACY-CAPSULE-PLACEMENT-DECISION-1`
   Decide placement/final correlativos for legacy percentage and geometry capsules.

5. `MVP-ROADMAP-PAES-AUTHORED-COVERAGE-PLAN-1`
   Define M1/M2/L1 authored coverage threshold and post-C08 continuation policy.

6. `MVP-SALES-PILOT-M1-CURRENT-SET-HUMAN-REGRESSION-SMOKE-PLAN-1`
   After P0/P1 repairs or explicit deferrals, plan end-to-end human regression.

Immediate next phase:

```text
MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-QUALITY-AUDIT-1
```

Reason:

```text
The highest-confidence P0 is missing authoredFeedback in M1-C01, and feedback quality should be audited before adding or repairing prose content.
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

Documentation/governance-only backlog phase. All backlog items are recommendations for later explicitly scoped phases. No repair was implemented.

## Result

```text
PAES_M1_CAPSULE_STANDARD_REPAIR_BACKLOG_COMPLETED_WITH_FEEDBACK_AUDIT_RECOMMENDED
```

## Next recommended phase

```text
MVP-PEDAGOGY-M1-AUTHORED-FEEDBACK-QUALITY-AUDIT-1
```
