# BPCPv1 PAES_M1 — Source packets para cápsulas 2–6

**Phase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-SOURCE-PACKETS-1`
**Nature:** Documentation/source-packet phase.
**Scope:** Documentation only. No implementation.

## 1. Executive verdict

```text
M1_CAPSULES_2_6_SOURCE_PACKETS_DERIVED_WITH_BLOCKERS
```

The source packets for PAES_M1 early calibration capsules 2–6 can be derived, but not as implementation-ready capsule content.

Capsules 2 and 4 have current live source candidates that can support ficha derivation with major feedback, step-by-step, item rationale, and metadata blockers. Capsules 3 and 5 remain concept/prototype packets from `MISSING-CONCEPTS-1`; they are ready for source authoring, not ficha derivation from current registry source. Capsule 6 should remain candidate-based and deferred until capsules 3–5 are resolved, because the available sources are AS1-heavy and risk extending the Algebra/functions tunnel.

This document does not implement content, does not modify registry, does not create generated capsules, does not write final authored feedback, and does not change continuity.

## 2. Purpose

This document consolidates the source basis for capsules 2–6 in the BPCPv1 PAES_M1 early calibration window.

It distinguishes:

- current live content that can be extracted from the repo;
- missing source concepts that still require authoring;
- candidate bridge content that needs focus review before use;
- blockers that must be resolved before fichas, feedback contracts, registry implementation, or generated-capsule contracts.

The document is a source-packet bridge between the 2–6 calibration plan, SOURCE-AUDIT-1, MISSING-CONCEPTS-1, and future ficha/source-authoring phases.

## 3. Source basis

Pedagogical/governance documents read:

```text
PHASE_LOG.md
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_EARLY_SEQUENCING_STRATEGY.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_CALIBRATION_PLAN.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULES_2_6_SOURCE_AUDIT_1_CURRENT_CONTENT_AGAINST_CALIBRATION_PLAN.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_MISSING_SOURCE_CONCEPTS.md
nextjs_space/docs/operations/BEXAURI_AI_COMPLETE_CAPSULE_GENERATION_CONTINUOUS_IMPROVEMENT_STRATEGY.md
nextjs_space/docs/operations/BPTT_CONTINUOUS_IMPROVEMENT_ADDENDUM.md
```

Taxonomy/source alignment documents inspected:

```text
nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md
```

Current source files inspected read-only:

```text
nextjs_space/lib/study-load-content.ts
nextjs_space/lib/paes-m1-first-capsule.ts
nextjs_space/lib/study-load-continuity.ts
nextjs_space/lib/study-load-pedagogical-decision.ts
```

Search used read-only:

```text
rg -n "paes_m1_linear_equations_basic|paes_m1_data_representation_entry|paes_m1_linear_equations_word_problems|paes_m1_linear_functions_basic|paes_m1_linear_equations_reinforcement|contentKey|answerKey|options|question" nextjs_space/lib nextjs_space/docs/operations
```

Limits:

- The current source has MC items, options, answer keys, and provisional pedagogical metadata.
- The inspected M1 source entries do not provide authored item feedback, authored complete feedback, authored item rationale, authored item-level metadata beyond provisional capsule metadata, or authored step-by-step help.
- Concept packets for capsules 3 and 5 are not final registry content.
- This phase did not run runtime tests and did not inspect secrets.

## 4. Relationship to 2–6 calibration plan

The calibration plan defines a preferred early window:

| Planned capsule | Planned role |
|---|---|
| 2 | Algebra/funciones inicial |
| 3 | Numbers / percentage / proportionality |
| 4 | Data / table / graph |
| 5 | Geometry / area / measure |
| 6 | Contextual bridge or early validation |

The plan is pedagogical orientation, not fixed route implementation. This source-packet phase respects that boundary: it maps sources against the plan, but does not force current content to fit.

## 5. Relationship to SOURCE-AUDIT-1

SOURCE-AUDIT-1 concluded:

```text
CURRENT_M1_CONTENT_HAS_GAPS_AGAINST_2_6_CALIBRATION_PLAN
```

This document carries forward those findings:

- `paes_m1_linear_equations_basic` partially supports capsule 2.
- `paes_m1_data_representation_entry` supports capsule 4, but current route places it late.
- No standalone current Numbers/percentage/proportionality capsule exists after capsule 1.
- No standalone current Geometry/area/measure capsule exists after capsule 1.
- Capsule 6 has AS1 bridge candidates, but they risk extending the Algebra tunnel.
- Continuity remains fixed operational sequence v0.
- Authored feedback, full feedback, item rationale, item metadata, and authored step-by-step are absent in inspected M1 registry entries.

## 6. Relationship to MISSING-CONCEPTS-1

MISSING-CONCEPTS-1 defined concept-level blueprints for:

```text
paes_m1_numbers_percentage_proportionality_entry
paes_m1_geometry_area_measure_entry
```

This document turns those blueprints into source packets for capsules 3 and 5, but preserves their prototype status. It does not write final items, final options, answer keys, registry-ready content, or final authored feedback.

## 7. Packet status overview

| Capsule | Candidate | Source type | Packet status | Blocker status |
|---:|---|---|---|---|
| 2 | `paes_m1_linear_equations_basic` | Current live source | `SOURCE_READY_FOR_FICHA_WITH_FEEDBACK_BLOCKERS` | `BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP` |
| 3 | `paes_m1_numbers_percentage_proportionality_entry` | Missing concept packet | `CONCEPT_READY_FOR_SOURCE_AUTHORING` | `BLOCKED_PENDING_ITEM_AUTHORING` |
| 4 | `paes_m1_data_representation_entry` | Current live source | `SOURCE_READY_FOR_FICHA_WITH_FEEDBACK_BLOCKERS` | `BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP` |
| 5 | `paes_m1_geometry_area_measure_entry` | Missing concept packet | `CONCEPT_READY_FOR_SOURCE_AUTHORING` | `BLOCKED_PENDING_ITEM_AUTHORING` |
| 6A | `paes_m1_linear_equations_word_problems` | Current live source candidate | `PARTIAL_SOURCE_REQUIRES_FOCUS_REVIEW` | `BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP` |
| 6B | `paes_m1_linear_functions_basic` | Current live source candidate | `PARTIAL_SOURCE_REQUIRES_FOCUS_REVIEW` | `BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP` |
| 6 low-fit | `paes_m1_linear_equations_reinforcement` | Current live source | `NOT_RECOMMENDED_FOR_2_6_WINDOW` | `BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP` |

## 8. Capsule 2 source packet — Algebra/funciones inicial

| Field | Source packet |
|---|---|
| Current title | `PAES M1 — Ecuaciones lineales básicas` |
| contentKey | `paes_m1_linear_equations_basic` |
| contentVersion | `v1` |
| Source file | `nextjs_space/lib/study-load-content.ts` |
| Program | `PAES_M1` |
| Topic | `Ecuaciones lineales` |
| Estimated time | `20–30 minutos` |
| Item count | 4 |
| Item type | Multiple choice |
| Axis/family | `algebra_functions` |
| Slice | `AS1` / `AS1 algebra/functions - initial corridor` |
| Roadmap nodes | `internal:as1_linear_equations_basic`, `internal:as1_equation_mechanics` |
| Official skill refs | `internal:resolver_problemas`, `internal:representar` |
| Difficulty band | `basic` |
| Primary purpose | `practice` |
| Evidence type | `mc_submission` |
| Review status | `internal_provisional` |
| Expert reviewed | `false` |
| Routing status | `available_not_universal` |

Current item stem summaries:

| Item | Stem summary | Options available | Answer key available |
|---|---|---|---|
| q1 | Solve `x + 5 = 12`. | Yes | Yes, `B` |
| q2 | Solve `3x = 21`. | Yes | Yes, `B` |
| q3 | Solve `2x - 4 = 10`. | Yes | Yes, `C` |
| q4 | Solve `x/3 = 9`. | Yes | Yes, `C` |

Observed source characteristics:

- Clean short mechanics focus.
- Appropriate as initial Algebra/functions signal after balanced entry.
- Evidence is correctness over four MC equation items.
- No authored item-level feedback found.
- No authored complete feedback found.
- No authored item-level rationale found.
- No authored step-by-step help found.
- Metadata exists at capsule/source level, but is provisional and not enough for full BPCPv1 ficha/feedback readiness.

## 9. Capsule 2 source readiness and blockers

Packet status:

```text
SOURCE_READY_FOR_FICHA_WITH_FEEDBACK_BLOCKERS
BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP
```

Capsule 2 can proceed to ficha derivation using current source as the base. It should not proceed as implementation-ready content.

Readiness:

- Ficha can use current title, key, item count, axis, provisional nodes, and MC evidence.
- Feedback contract can be derived from source, but authored feedback is absent.
- Step-by-step contract can be derived from equation-solving requirements, but authored step-by-step is absent.

Blockers:

- Need authored brief feedback per item.
- Need authored complete feedback per item.
- Need item-level rationale and distractor rationale.
- Need item-level metadata sufficient for evidence interpretation.
- Need step-by-step help for each item.
- Need cautious inference limits: this capsule observes basic equation mechanics, not Algebra mastery.

## 10. Capsule 3 source packet — Numbers/percentage/proportionality

| Field | Concept packet |
|---|---|
| Concept title | Numbers / percentage / proportionality entry |
| contentKey candidate | `paes_m1_numbers_percentage_proportionality_entry` |
| Source basis | `BPCPV1_PAES_M1_CAPSULES_3_5_MISSING_SOURCE_CONCEPTS.md` |
| Role in early calibration | Standalone second Numbers signal after capsule 1 |
| Axis/family | Numbers / percentage / proportional reasoning |
| Item count recommendation | Small early capsule, typically 3–5 items |
| Item type recommendation | Closed MVP items, preferably MC with interpretable distractors |
| Context types | Percentage increase/decrease, unit price, percent of a quantity, proportional comparison, ratio/simple equivalence |
| Expected evidence | Whether the student coordinates number meaning, proportional relation, and simple calculation in context |
| Source status | Concept/prototype only |

Likely distractor families:

- Treating percentage points as the same as percentage change.
- Applying the percent to the wrong base quantity.
- Reversing part/whole relation.
- Additive reasoning where proportional reasoning is needed.
- Unit-price comparison by total price only.
- Arithmetic slip that should not be overread as conceptual failure.

Feedback requirements:

- Brief feedback should identify the relation used, not only correctness.
- Full feedback should explain base quantity, proportion, and operation.
- Feedback should separate calculation slips from proportional-reasoning confusion.
- Feedback must avoid diagnosis or mastery language.

Step-by-step requirements:

- Identify the quantity or comparison.
- Identify the base/whole.
- Translate percentage or ratio into an operation.
- Compute carefully.
- Interpret the result in context.

Metadata requirements:

- Axis/family.
- Roadmap node candidate.
- Context type.
- Expected error families.
- Evidence type.
- Difficulty band.
- Inference limits.
- Primary purpose as calibration/coverage signal, not diagnosis.

Inference limits:

- Does not diagnose Numbers mastery.
- Does not infer PAES score, readiness, theta, or mastery.
- Does not personalize route by itself.
- Provides one early standalone signal after capsule 1.

## 11. Capsule 3 source readiness and blockers

Packet status:

```text
CONCEPT_READY_FOR_SOURCE_AUTHORING
BLOCKED_PENDING_ITEM_AUTHORING
```

Capsule 3 is ready for source authoring, not ficha derivation from current live registry source.

Readiness:

- Concept is clear enough to author a source packet or draft capsule.
- Role in 2–6 calibration is justified by SOURCE-AUDIT-1 and MISSING-CONCEPTS-1.
- It reduces overdependence on AS1 by adding a non-algebra early signal.

Blockers:

- No current live capsule exists for this role.
- No final items exist.
- No final answer options or answer keys exist.
- No authored feedback exists.
- No authored step-by-step exists.
- No final metadata or rationale exists.

## 12. Capsule 4 source packet — Data/table/graph

| Field | Source packet |
|---|---|
| Current title | `PAES M1 — Lectura de tablas y gráficos` |
| contentKey | `paes_m1_data_representation_entry` |
| contentVersion | `v1` |
| Source file | `nextjs_space/lib/study-load-content.ts` |
| Program | `PAES_M1` |
| Topic | `Lectura de tablas y gráficos` |
| Estimated time | `10–15 minutos` |
| Item count | 8 |
| Item type | Multiple choice |
| Axis/family | `data_probability` |
| Slice | `PE1` / data and probability entry |
| Primary purpose | Bridge / coverage signal |
| Evidence type | `mc_submission` |
| Review status | `internal_provisional` |
| Expert reviewed | `false` |
| Routing status | `available_not_universal` |

Current item stem summaries:

| Item | Stem summary | Options available | Answer key available |
|---|---|---|---|
| q1 | Read a table of books by course and identify the value for 2º medio. | Yes | Yes, `D` |
| q2 | Compare workshop attendance and calculate how many more chose Ciencias than Música. | Yes | Yes, `B` |
| q3 | Identify the day with highest sales from a table. | Yes | Yes, `C` |
| q4 | Interpret an increasing trend in library visits across months. | Yes | Yes, `A` |
| q5 | Sum snack quantities from a simple table. | Yes | Yes, `C` |
| q6 | Compute the average of three temperatures. | Yes | Yes, `B` |
| q7 | Select a supported conclusion from activity preference data. | Yes | Yes, `B` |
| q8 | Identify two colors with the same frequency. | Yes | Yes, `A` |

Observed source characteristics:

- Strong match to Data/table/graph role.
- It is data representation, not merely simple probability.
- It gives a distinct evidence signal from Algebra/functions.
- It has MC items, options, answer keys, and provisional metadata.
- No authored item-level feedback found.
- No authored complete feedback found.
- No authored item-level rationale found.
- No authored step-by-step help found.

Route-order risk:

- Current continuity places this content late, after AS1 equation/function content.
- The 2–6 calibration plan prefers it as capsule 4, before a later bridge/validation choice.

## 13. Capsule 4 source readiness and blockers

Packet status:

```text
SOURCE_READY_FOR_FICHA_WITH_FEEDBACK_BLOCKERS
BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP
```

Capsule 4 can proceed to ficha derivation using current source as the base, with route-order caution.

Readiness:

- Current item set supports table/graph/data reading.
- It can serve as an early non-algebra evidence signal.
- It can support a feedback contract once feedback design is authored.

Blockers:

- Current route order conflicts with the preferred 2–6 calibration position.
- Need authored feedback and complete feedback.
- Need item-level rationale and distractor rationale.
- Need authored step-by-step help.
- Need metadata refinement for item-level evidence interpretation.
- Need caution that this is a data/table/graph signal, not Data/Probability mastery.

## 14. Capsule 5 source packet — Geometry/area/measure

| Field | Concept packet |
|---|---|
| Concept title | Geometry / area / measure entry |
| contentKey candidate | `paes_m1_geometry_area_measure_entry` |
| Source basis | `BPCPV1_PAES_M1_CAPSULES_3_5_MISSING_SOURCE_CONCEPTS.md` |
| Role in early calibration | Standalone second Geometry signal after capsule 1 |
| Axis/family | Geometry / area / measure |
| Item count recommendation | Small early capsule, typically 3–5 items |
| Item type recommendation | Closed MVP items with interpretable distractors |
| Context types | Area vs perimeter, composite rectangle area, unit conversion, choosing formula from context, simple geometric comparison, interpreting dimensions |
| Expected evidence | Whether the student connects measure, representation, and geometric reasoning in a simple context |
| Source status | Concept/prototype only |

Likely distractor families:

- Confusing area and perimeter.
- Multiplying or adding the wrong dimensions.
- Ignoring units or unit conversion.
- Treating composite shape as a single rectangle without adjustment.
- Choosing a formula by keyword instead of representation.
- Arithmetic slip that should not be overread as geometry failure.

Feedback requirements:

- Brief feedback should name the geometric relation or measure decision.
- Full feedback should distinguish area, perimeter, dimensions, and units.
- Feedback should connect representation to calculation.
- Feedback must avoid readiness, mastery, score, or diagnostic language.

Step-by-step requirements:

- Identify the measure requested.
- Identify given dimensions and units.
- Decide whether area, perimeter, conversion, or comparison is needed.
- Apply the appropriate relation.
- Interpret the result in the context.

Metadata requirements:

- Axis/family.
- Roadmap node candidate.
- Context/representation type.
- Expected error families.
- Evidence type.
- Difficulty band.
- Inference limits.
- Primary purpose as calibration/coverage signal, not diagnosis.

Inference limits:

- Does not diagnose Geometry mastery.
- Does not infer PAES score, readiness, theta, or mastery.
- Does not personalize route by itself.
- Provides one early standalone Geometry/measure signal after capsule 1.

## 15. Capsule 5 source readiness and blockers

Packet status:

```text
CONCEPT_READY_FOR_SOURCE_AUTHORING
BLOCKED_PENDING_ITEM_AUTHORING
```

Capsule 5 is ready for source authoring, not ficha derivation from current live registry source.

Readiness:

- Concept is clear enough for future item/source authoring.
- Role in 2–6 calibration is justified by SOURCE-AUDIT-1 and MISSING-CONCEPTS-1.
- It reduces AS1 tunnel risk by adding a standalone Geometry/measure signal.

Blockers:

- No current live capsule exists for this role.
- No final items exist.
- No final answer options or answer keys exist.
- No authored feedback exists.
- No authored step-by-step exists.
- No final metadata or rationale exists.

## 16. Capsule 6 candidate packet A — Linear equations word problems

| Field | Source packet |
|---|---|
| Current title | `PAES M1 — Problemas con ecuaciones lineales` |
| contentKey | `paes_m1_linear_equations_word_problems` |
| contentVersion | `v1` |
| Source file | `nextjs_space/lib/study-load-content.ts` |
| Program | `PAES_M1` |
| Topic | `Ecuaciones lineales (problemas)` |
| Estimated time | `25–35 minutos` |
| Item count | 4 |
| Item type | Multiple choice |
| Axis/family | `algebra_functions` |
| Slice | `AS1` / `AS1 algebra/functions - initial corridor` |
| Roadmap nodes | `internal:as1_linear_equations_word_problems`, `internal:as1_context_to_equation` |
| Official skill refs | `internal:modelar`, `internal:resolver_problemas`, `internal:representar` |
| Difficulty band | `transition` |
| Primary purpose | `bridge` |
| Evidence type | `mc_submission` |
| Review status | `internal_provisional` |
| Expert reviewed | `false` |
| Routing status | `available_not_universal` |

Current item stem summaries:

| Item | Stem summary | Options available | Answer key available |
|---|---|---|---|
| q1 | Solve `2(x + 3) = 18`. | Yes | Yes, `B` |
| q2 | Solve `4x - 5 = 2x + 11`. | Yes | Yes, `C` |
| q3 | Solve `(x/2) + 7 = 15`. | Yes | Yes, `C` |
| q4 | Solve `3(x - 4) + 6 = 24`. | Yes | Yes, `C` |

Conceptual fit:

- Partial fit as a bridge from equation mechanics toward equation structure.
- Weak fit as contextual bridge if the future capsule 6 is expected to include richer real-world modeling.
- The current stems are mostly algebraic equation forms, despite the title and instructions referencing problems.

Risks:

- High AS1 tunnel risk if used before capsules 3–5 are finalized.
- Could make the 2–6 window too algebra-heavy.
- Needs focus review to determine whether it is a capsule 6 bridge, later AS1 transition capsule, or reinforcement-adjacent source.

Packet status:

```text
PARTIAL_SOURCE_REQUIRES_FOCUS_REVIEW
BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP
```

## 17. Capsule 6 candidate packet B — Linear functions basic

| Field | Source packet |
|---|---|
| Current title | `PAES M1 — Funciones lineales básicas` |
| contentKey | `paes_m1_linear_functions_basic` |
| contentVersion | `v1` |
| Source file | `nextjs_space/lib/study-load-content.ts` |
| Program | `PAES_M1` |
| Topic | `Funciones lineales (inicio)` |
| Estimated time | `20–30 minutos` |
| Item count | 8 |
| Item type | Multiple choice |
| Axis/family | `algebra_functions` |
| Slice | `AS1` / `AS1 algebra/functions - initial corridor` |
| Roadmap nodes | Includes `internal:as1_linear_functions_basic`, `internal:as1_linear_representation` |
| Primary purpose | Bridge |
| Evidence type | `mc_submission` |
| Review status | `internal_provisional` |
| Expert reviewed | `false` |
| Routing status | `available_not_universal` |

Current item stem summaries:

| Item | Stem summary | Options available | Answer key available |
|---|---|---|---|
| q1 | Evaluate `f(x) = 2x + 3` at `x = 4`. | Yes | Yes, `B` |
| q2 | Solve for `x` when `f(x) = 3x - 5` and `f(x) = 10`. | Yes | Yes, `B` |
| q3 | Find slope from points `(0, 2)` and `(3, 8)`. | Yes | Yes, `A` |
| q4 | Identify y-intercept in `y = -2x + 6`. | Yes | Yes, `C` |
| q5 | Select function with slope 4 and intercept -1. | Yes | Yes, `D` |
| q6 | Model a service cost with fixed and hourly charges. | Yes | Yes, `A` |
| q7 | Evaluate `f(x) = -x + 9` at `x = 3`. | Yes | Yes, `B` |
| q8 | Infer a linear rule from a small table. | Yes | Yes, `C` |

Conceptual fit:

- Stronger representation/modeling bridge potential than candidate A because it includes functions, table-to-rule, slope/intercept, and one context modeling item.
- Still AS1-heavy and longer than a compact early calibration bridge.
- May be too broad for capsule 6 unless split or focused.

Risks:

- AS1 tunnel risk remains high if introduced before missing Numbers and Geometry coverage.
- Eight items may be too heavy for a capsule 6 early validation/bridge role.
- Needs focus review to determine whether it should be a later AS1 bridge rather than the 2–6 capsule 6.

Packet status:

```text
PARTIAL_SOURCE_REQUIRES_FOCUS_REVIEW
BLOCKED_PENDING_FEEDBACK_AND_STEP_BY_STEP
```

## 18. Capsule 6 candidate comparison and recommendation

| Candidate | Conceptual fit | Bridge potential | AS1 tunnel risk | Feedback/step-by-step status | Route-order implication | Recommendation |
|---|---|---|---|---|---|---|
| `paes_m1_linear_equations_word_problems` | Partial | Moderate for equation transition, weak for real contextual modeling in current stems | High | Absent | Extends equations immediately after capsule 2 if selected too early | Defer; review focus and possibly reserve for later AS1 transition |
| `paes_m1_linear_functions_basic` | Partial | Moderate-to-strong for representation/modeling, but broad | High | Absent | Extends AS1 before non-algebra coverage if selected too early | Defer; consider later bridge after capsules 3–5 are authored/finalized |
| `paes_m1_linear_equations_reinforcement` | Low | Low for bridge; reinforcement-oriented | Very high | Absent | Would deepen AS1 tunnel | `NOT_RECOMMENDED_FOR_2_6_WINDOW` |

Recommendation:

```text
Defer final capsule 6 selection until capsules 3–5 are resolved.
```

If a capsule 6 bridge is needed after resolving 3–5, `paes_m1_linear_functions_basic` may offer stronger representation/modeling potential than `paes_m1_linear_equations_word_problems`, but it probably needs focus reduction or ficha constraints before use. The current evidence is not strong enough to choose a final capsule 6 implementation.

## 19. Cross-capsule route/order implications

Current operational continuity is fixed sequence v0:

```text
paes_m1_balanced_entry_initial
-> paes_m1_linear_equations_basic
-> paes_m1_linear_equations_word_problems
-> paes_m1_linear_equations_reinforcement
-> paes_m1_linear_functions_basic
-> paes_m1_data_representation_entry
```

This sequence is operational, not pedagogical proof of the 2–6 plan.

Risks against the 2–6 calibration window:

- It moves from capsule 2 directly into more AS1 equation work.
- It places Data/table/graph late, despite a current viable source for capsule 4.
- It has no standalone Numbers/percentage/proportionality capsule after capsule 1.
- It has no standalone Geometry/area/measure capsule after capsule 1.
- It may treat AS1 corridor as the early roadmap instead of one corridor inside PAES_M1.

Implication:

The future source/ficha order should not simply copy current continuity. The current continuity can be referenced as operational v0, but pedagogical derivation must follow the 2–6 calibration logic unless a later review changes it.

## 20. Feedback and step-by-step gaps

Across current source candidates:

| Candidate | Authored brief feedback | Authored complete feedback | Correctness-only risk | Item-level rationale | Authored step-by-step | Needs PRO feedback design |
|---|---|---|---|---|---|---|
| `paes_m1_linear_equations_basic` | Absent | Absent | High | Absent | Absent | Yes |
| `paes_m1_data_representation_entry` | Absent | Absent | High | Absent | Absent | Yes |
| `paes_m1_linear_equations_word_problems` | Absent | Absent | High | Absent | Absent | Yes |
| `paes_m1_linear_functions_basic` | Absent | Absent | High | Absent | Absent | Yes |
| `paes_m1_linear_equations_reinforcement` | Absent | Absent | High | Absent | Absent | Yes |

Capsules 3 and 5 require feedback/step-by-step design during source authoring because no current live source exists.

## 21. Metadata and rationale gaps

Current live entries contain provisional capsule-level pedagogical metadata, including program, slice, axis, roadmap nodes, evidence type, review status, expert-review status, and routing status.

Remaining gaps:

- Item-level metadata is not authored sufficiently for BPCPv1 inference.
- Distractor rationale is absent.
- Expected error families are not attached to each item.
- Feedback rationale is absent.
- Step-by-step rationale is absent.
- Difficulty calibration remains provisional.
- Inference limits are present in broad notices, but not enough as per-item/capsule ficha contracts.

These gaps block implementation-readiness and should be handled in future source-authoring, ficha, feedback-contract, and validation-contract phases.

## 22. What can proceed to fichas

Careful distinction:

- Capsule 2 can proceed to ficha derivation from current source, with feedback/step-by-step/rationale metadata blockers explicitly carried.
- Capsule 4 can proceed to ficha derivation from current source, with route-order and feedback/step-by-step/rationale metadata blockers explicitly carried.
- Capsule 3 should not proceed to ficha from current source because no current source exists; it should proceed to source authoring first.
- Capsule 5 should not proceed to ficha from current source because no current source exists; it should proceed to source authoring first.
- Capsule 6 should not proceed to final ficha selection until capsules 3–5 are resolved and the bridge role is reviewed.

This means a narrow `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-4-FICHAS-1` is possible for existing-source fichas only, but it would leave the missing early calibration window unresolved.

Given the mixed status, a conservative next phase is PRO review of the 2–6 source packets before splitting into ficha and source-authoring tracks.

## 23. What remains blocked

Blocked:

- Registry implementation.
- New generated capsules.
- Final authored items for capsule 3.
- Final authored items for capsule 5.
- Final answer options and keys for capsules 3 and 5.
- Final authored feedback for capsules 2–6.
- Final authored complete feedback for capsules 2–6.
- Authored step-by-step help for capsules 2–6.
- Item-level rationale and distractor rationale.
- Item-level metadata sufficient for BPCPv1 inference.
- Final capsule 6 selection.
- Continuity route changes.
- Adaptive AI, mastery, theta, PAES score, readiness, or Sales-Ready claims.

## 24. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-PRO-REVIEW-1
```

Purpose:

```text
Review the 2–6 source packets before splitting execution into existing-source fichas for capsules 2/4, source authoring for capsules 3/5, and a deferred capsule 6 bridge decision.
```

Reason:

The packets have mixed status: two existing-source candidates, two concept/prototype candidates, and two AS1-heavy bridge candidates. A short PRO review is the safest next step before authoring or deriving fichas, because it can confirm whether to:

- derive `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-4-FICHAS-1`;
- open `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-SOURCE-AUTHORING-1`;
- defer or constrain capsule 6.

## 25. Final verdict

```text
M1_CAPSULES_2_6_SOURCE_PACKETS_DERIVED_WITH_BLOCKERS
```

