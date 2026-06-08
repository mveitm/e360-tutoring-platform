# BPCPv1 PAES_M1 - Ficha de capsula 6

**Phase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-6-FICHA-1`
**Nature:** BPCPv1 ficha derivation from selected current source.
**Scope:** Documentation only. No implementation.

## 1. Executive verdict

```text
M1_CAPSULE_6_FICHA_DERIVED_WITH_FEEDBACK_AND_IMPLEMENTATION_BLOCKERS
```

The BPCPv1 ficha for PAES_M1 capsule 6 can be derived from the selected current source:

```text
paes_m1_linear_functions_basic
```

The capsule can serve as an early bridge/contextual validation signal connecting equation mechanics with representation/modeling. It can help observe whether the student can interpret a simple linear relation beyond isolated equation solving.

However, it remains blocked before implementation. The current source has no authored brief feedback, no authored complete feedback, no final step-by-step scripts, no sufficient item-level rationale, no sufficient distractor-level rationale, proposal-level metadata only, broad item-count risk, and moderate/high AS1 tunnel risk.

Current answer keys are current-source/ficha key candidates only. This phase does not authorize final implementation keys, registry changes, continuity changes, final feedback, final step-by-step scripts, student-facing claims, adaptive AI, or Sales-Ready claims.

## 2. Purpose

This document derives the BPCPv1 ficha for capsule 6 after the bridge decision selected `paes_m1_linear_functions_basic` as the current source direction.

The purpose is to make capsule 6 pedagogically legible before any future feedback contract, feedback authoring, step-by-step authoring, registry implementation, route-order work, or continuity reconciliation.

This phase does not implement capsule 6. It documents what the capsule may support, what it cannot claim, and what remains blocked.

## 3. Governance basis / documentos leidos

Documents read:

```text
PHASE_LOG.md
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_6_BRIDGE_DECISION.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_4_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_SOURCE_PACKETS.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULES_2_6_PRO_REVIEW_1.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_CALIBRATION_PLAN.md
```

Source inspected read-only:

```text
nextjs_space/lib/study-load-content.ts
nextjs_space/lib/study-load-continuity.ts
nextjs_space/lib/study-load-pedagogical-decision.ts
```

Read-only search used:

```text
rg -n "paes_m1_linear_functions_basic|paes_m1_linear_equations_word_problems|paes_m1_linear_equations_basic|paes_m1_data_representation_entry|paes_m1_numbers_percentage_proportionality_entry|paes_m1_geometry_area_measure_entry|answerKey|options|question|contentKey" nextjs_space/lib nextjs_space/docs/operations
```

Governing constraints:

- BPCPv1 evidence language remains cautious.
- The 2-6 window is calibration while teaching, not diagnosis.
- Capsule 6 is a bridge, not a gate.
- Current operational continuity remains fixed v0 and is not changed here.
- No mastery, readiness, theta, PAES score, diagnostic certainty, route certainty, adaptive AI, student-facing claim, or Sales-Ready claim is authorized.

## 4. Relationship to 2-5 ficha set

The 2-5 ficha set now gives capsule 6 a broader calibration context:

| Capsule | contentKey | Role | Ficha status |
|---:|---|---|---|
| 2 | `paes_m1_linear_equations_basic` | Algebra/functions initial signal | Derived from current live source |
| 3 | `paes_m1_numbers_percentage_proportionality_entry` | Numbers / percentage / proportionality signal | Derived from revised source-authoring candidate |
| 4 | `paes_m1_data_representation_entry` | Data / table / graph signal | Derived from current live source |
| 5 | `paes_m1_geometry_area_measure_entry` | Geometry / area / measure signal | Derived from revised source-authoring candidate |

Capsule 6 should not erase this multiaxis structure. It should bridge after the 2-5 signals, not revert the sequence into an AS1-only tunnel.

The selected source still belongs to Algebra/functions, so the ficha must explicitly carry AS1 tunnel risk and must not treat the source as a full multiaxis validation capsule.

## 5. Relationship to 2-6 feedback contract

The 2-6 feedback-contract phase derived shared contracts for capsules 2-5 and kept capsule 6 deferred.

This ficha removes the source-selection blocker for capsule 6, but it does not author final feedback.

Future capsule 6 feedback contracts should now be derived from:

- this ficha;
- the shared feedback breve contract;
- the shared feedback completo contract;
- the shared step-by-step contract;
- the shared distractor/error interpretation rules;
- the prohibited-claims rules.

Capsule 6 feedback must preserve:

- result acknowledgement;
- task focus;
- central idea;
- concrete review action;
- cautious evidence language;
- no diagnosis;
- no score/readiness/mastery/theta claim;
- no adaptive AI claim.

## 6. Relationship to current source

Current source:

```text
nextjs_space/lib/study-load-content.ts
```

Current source entry:

```text
PAES M1 - Funciones lineales basicas
```

Source fields verified read-only:

| Field | Current source value |
|---|---|
| contentKey | `paes_m1_linear_functions_basic` |
| contentVersion | `v1` |
| program | `PAES_M1` |
| topic | `Funciones lineales (inicio)` |
| estimatedMinutes | `20-30 minutos` |
| item count | 8 MC items |
| current metadata slice | `AS1` |
| current metadata axis | `algebra_functions` |
| current metadata primaryPurpose | `bridge` |
| current review status | `internal_provisional` |
| expertReviewed | `false` |
| routingStatus | `available_not_universal` |

Current source provides:

- title;
- contentKey;
- contentVersion;
- MC item stems;
- options;
- current answer keys;
- capsule-level provisional metadata.

Current source does not provide:

- authored brief feedback for M1 items;
- authored complete feedback for M1 items;
- final step-by-step scripts;
- item-level BPCPv1 rationale;
- distractor-level BPCPv1 rationale;
- final implementation metadata;
- final implementation approval.

## 7. Capsule 6 identity

| Field | Ficha |
|---|---|
| Capsule | 6 |
| contentKey | `paes_m1_linear_functions_basic` |
| contentVersion | `v1` |
| title | `PAES M1 - Funciones lineales basicas` |
| role in 2-6 window | Bridge/contextual validation signal after capsules 2-5 |
| primary axis/family | Algebra/functions |
| bridge family | Linear relation / representation / modeling |
| source type | Current live source |
| source file | `nextjs_space/lib/study-load-content.ts` |
| item count | 8 MC items |
| current source status | Current live source, internal provisional |
| ficha status | Derived with feedback and implementation blockers |
| implementation status | `not_implemented_by_this_phase` |

## 8. Capsule 6 pedagogical purpose

Capsule 6 should serve as:

```text
Bridge/contextual validation signal connecting early equation mechanics with representation/modeling, while checking whether the student can interpret a simple linear relation beyond isolated equation solving.
```

The capsule may help observe whether the student can:

- evaluate a simple linear function;
- connect a function output to an input;
- recognize slope or intercept in simple forms;
- connect a symbolic rule to a contextual cost model;
- infer a linear rule from a small table;
- move from isolated equation mechanics toward simple relation interpretation.

This is an early signal only. It does not close calibration.

## 9. Capsule 6 non-purpose

Capsule 6 is not:

- a diagnosis of functions mastery;
- a diagnosis of Algebra/functions mastery;
- proof of function fluency;
- a PAES score/readiness signal;
- a theta signal;
- a mastery signal;
- adaptive AI;
- a route decision by itself;
- proof that AS1 should dominate the student's path;
- validation of Geometry/measure;
- full validation of proportionality;
- full validation of data/representation;
- a Sales-Ready claim;
- a student-facing claim.

## 10. Source item summary for paes_m1_linear_functions_basic

Current-source item summaries:

| Item | Current source stem summary | Current options summary | Current-source/ficha key candidate |
|---|---|---|---|
| q1 | Evaluate `f(x) = 2x + 3` at `x = 4`. | Numeric options `7`, `11`, `14`, `20`. | `B` |
| q2 | Solve for `x` when `f(x) = 3x - 5` and `f(x) = 10`. | Numeric options `3`, `5`, `10`, `15`. | `B` |
| q3 | Find slope from points `(0, 2)` and `(3, 8)`. | Numeric options `2`, `3`, `6`, `8`. | `A` |
| q4 | Identify y-intercept in `y = -2x + 6`. | Numeric/sign options `-2`, `2`, `6`, `-6`. | `C` |
| q5 | Select the function with slope 4 and intercept -1. | Linear expression options. | `D` |
| q6 | Model a service cost with fixed and hourly charges. | Linear cost-function options. | `A` |
| q7 | Evaluate `f(x) = -x + 9` at `x = 3`. | Numeric options `3`, `6`, `9`, `12`. | `B` |
| q8 | Infer a linear rule from a small table with `x = 0, 1, 2` and `y = 1, 4, 7`. | Linear rule options. | `C` |

These keys are current-source/ficha key candidates only. This phase does not approve final implementation keys.

No source item wording is changed in this phase.

## 11. Expected evidence

Expected evidence:

- selected option per item;
- correctness against current-source/ficha key candidate;
- whether the student can substitute an input into a function;
- whether the student can solve for an input from a function output;
- whether the student recognizes slope from two points;
- whether the student identifies y-intercept from symbolic form;
- whether the student matches slope/intercept to a function expression;
- whether the student translates a fixed-plus-variable cost context into a function;
- whether the student infers a simple linear rule from a table;
- whether self-report aligns or conflicts with performance, if collected.

Evidence should be interpreted as an early bridge signal. It is not a diagnosis.

## 12. Likely error/distractor families

Likely error families:

- input/output confusion;
- substituting incorrectly into a function;
- equation mechanics slip when solving for `x`;
- arithmetic slip;
- slope confused with y-value or endpoint difference;
- intercept confused with slope or sign;
- matching expression by visible numbers without relation meaning;
- reversing fixed and variable cost in a context;
- table-to-rule confusion;
- additive pattern noticed but expressed with wrong intercept;
- overreliance on equation manipulation without contextual interpretation.

Likely distractor interpretations must remain cautious:

- selecting a visible number may suggest surface matching;
- selecting a wrong slope may suggest difference/ratio confusion;
- selecting an expression with the right numbers in wrong roles may suggest slope/intercept role confusion;
- selecting a total-like cost expression may suggest context-modeling friction;
- selecting a table rule with correct rate but wrong intercept may suggest incomplete representation reading.

These are hypotheses only. More evidence is needed before stronger claims.

## 13. Feedback implications

Future feedback breve should:

- name the relation or representation involved;
- distinguish input and output when relevant;
- point to the expression, table, points, or context;
- prompt one concrete check, such as substituting the value or checking slope/intercept roles;
- avoid declaring that the student knows or does not know functions.

Future feedback completo should:

- state what the item asked;
- explain why the current-source/ficha key candidate works;
- explain why the selected wrong option may be tempting, if applicable;
- distinguish calculation from interpretation;
- distinguish function notation from equation solving;
- connect slope/intercept or table/context to the selected rule;
- use cautious interpretation of errors;
- recommend a short review action.

This phase does not write final authored feedback.

## 14. Step-by-step implications

Future step-by-step help should be item-specific and should not become a generic function lecture.

Likely step sequence family:

```text
read the relation/context/representation -> identify input/output or slope/intercept -> choose operation or rule -> calculate or match -> interpret -> check against the source
```

For evaluation items, step-by-step should guide:

```text
identify input -> replace x -> calculate in order -> interpret f(x)
```

For solve-from-output items, step-by-step should guide:

```text
set output value -> solve the simple equation -> check by substituting
```

For representation/modeling items, step-by-step should guide:

```text
identify what changes -> identify fixed value or starting value -> match expression -> verify with one value
```

This phase does not write final step-by-step scripts.

## 15. Metadata proposal

Proposed BPCPv1 metadata for later implementation planning:

| Field | Proposal |
|---|---|
| programCode | `PAES_M1` |
| contentKey | `paes_m1_linear_functions_basic` |
| contentVersion | `v1` |
| title | `PAES M1 - Funciones lineales basicas` |
| capsule | `6` |
| role | `capsule_6_bridge_contextual_validation_signal` |
| primary axis | `algebra_functions` |
| bridge family | `linear_relation_representation_modeling` |
| secondary relationships | `equation_mechanics`, `proportional_relation_partial`, `data_representation_partial` |
| item count | 8 |
| item type | Multiple choice |
| evidence type | `mc_submission` plus self-report if available |
| difficulty band | `transition` / `early_bridge` |
| expected skills | `representar`, `resolver_problemas`, `modelar` |
| review status | `requires_feedback_contract_and_implementation_review` |
| inference status | `limited_bridge_signal_only` |
| implementation status | `not_implemented_by_this_phase` |

Metadata remains proposal-level and must not be treated as registry implementation.

## 16. AS1 tunnel risk

AS1 tunnel risk remains moderate/high.

Reasons:

- The source is still Algebra/functions.
- The current operational route already overrepresents AS1 before Data/table/graph.
- The source follows equation and function mechanics in the current v0 route.
- Without constraints, capsule 6 could look like AS1 advancement rather than bridge/contextual validation.

Mitigation required:

- preserve the 2-5 multiaxis context;
- frame capsule 6 as bridge, not AS1 route confirmation;
- keep success and error interpretation cautious;
- prevent the capsule from deciding a route by itself;
- avoid treating it as proof that AS1 should dominate the student's next path.

This phase does not change route order or continuity.

## 17. Broad item-count risk

The selected source has 8 MC items.

Risk:

- 8 items may be broad for a compact early bridge capsule;
- the source covers evaluation, solving from output, slope, intercept, expression matching, context modeling, and table-to-rule inference;
- without ficha/feedback constraints, the capsule may feel like a broad functions mini-unit rather than a bridge signal.

Implication:

- the future feedback contract must keep explanations concise;
- future implementation planning may need a focus review or item-count decision;
- if all 8 items are retained, the capsule must preserve short mobile-readable feedback and step-by-step help;
- if a future phase splits or narrows the source, that requires explicit authorization.

This phase does not split, remove, rewrite, or implement items.

## 18. Relationship to capsule 2 equation mechanics

Capsule 2 observes basic equation mechanics.

Capsule 6 connects to capsule 2 by:

- reusing equation mechanics in q2, where a function output is set equal to a value;
- requiring substitution and verification in q1 and q7;
- moving from isolated equation solving to relation interpretation;
- making equation mechanics one component of function reasoning, not the entire focus.

Risk:

- if overread, capsule 6 can become another Algebra/functions progression step instead of a bridge.

Allowed cautious interpretation:

```text
This response may suggest whether equation mechanics transfer into simple function notation.
```

Prohibited interpretation:

```text
This proves the student is ready for an AS1 route.
```

## 19. Relationship to capsule 3 proportionality/relations

Capsule 3 observes percentage/proportionality in context.

Capsule 6 partially connects to capsule 3 by:

- using simple change/rate ideas in linear relationships;
- including fixed-plus-variable cost modeling in q6;
- requiring reasonableness around a table-to-rule pattern in q8;
- asking the student to coordinate quantities through a relation.

Limit:

- linear functions are not a substitute for the standalone proportionality signal;
- the selected source does not directly test percent, unit price, ratio/equivalence, or base quantity.

Allowed cautious interpretation:

```text
This response may suggest whether the student can use a simple relation after earlier proportionality work.
```

Prohibited interpretation:

```text
This validates proportional reasoning mastery.
```

## 20. Relationship to capsule 4 data/representation

Capsule 4 observes table/graph/data reading.

Capsule 6 partially connects to capsule 4 by:

- using a table-to-rule item in q8;
- using point and line representation language in q3-q5;
- requiring interpretation of symbolic and contextual representations;
- making representation part of the bridge role.

Limit:

- capsule 6 is not a Data/table/graph capsule;
- it does not replace capsule 4's direct representation/data reading signal;
- it only partially supports representation transfer.

Allowed cautious interpretation:

```text
This response may suggest whether simple representation reading can connect to a linear rule.
```

Prohibited interpretation:

```text
This proves representation fluency.
```

## 21. Relationship to capsule 5 geometry/measure

Capsule 5 observes Geometry/area/measure.

Capsule 6 does not meaningfully validate Geometry/measure.

The selected source:

- does not ask about figures;
- does not ask about area, perimeter, or measure;
- does not test unit conversion in a geometric context;
- does not check spatial reasoning.

This limitation must remain explicit.

Allowed cautious interpretation:

```text
Capsule 6 complements the 2-5 window as a relation/modeling bridge, but it does not validate Geometry/measure.
```

Prohibited interpretation:

```text
Capsule 6 validates all prior axes.
```

## 22. Inference limits

Capsule 6 can suggest:

- an early signal about simple linear relation interpretation;
- an early signal about function notation;
- an early signal about representation/modeling transfer;
- possible friction between equation mechanics and function interpretation;
- possible friction with slope/intercept roles or table-to-rule inference.

Capsule 6 cannot support:

- functions mastery;
- Algebra/functions mastery;
- Geometry/measure validation;
- full proportionality validation;
- full data/representation validation;
- diagnostic certainty;
- route certainty;
- PAES score;
- theta;
- readiness;
- adaptive AI;
- Sales-Ready claims.

One response or one capsule cannot decide the student's path.

## 23. Implementation blockers

Implementation blockers:

- No authored brief feedback.
- No authored complete feedback.
- No final step-by-step scripts.
- No item-level rationale sufficient for BPCPv1 implementation.
- No distractor-level rationale sufficient for BPCPv1 implementation.
- Current answer keys are source/ficha candidates only.
- Metadata remains proposal-level.
- Item-count risk: source has 8 items and may be broad for a compact early bridge.
- AS1 tunnel risk remains moderate/high because the source is still Algebra/functions.
- Capsule 6 cannot validate Geometry/measure.
- Capsule 6 only partially connects to proportionality and data/representation.
- Capsule 6 cannot support mastery, readiness, theta, PAES score, diagnostic certainty, route certainty, adaptive AI, or Sales-Ready claims.
- No registry implementation is authorized.
- No continuity change is authorized.
- No route-order change is authorized.

## 24. What can proceed next

Can proceed:

- derive a capsule 6 feedback contract from this ficha;
- define capsule 6 feedback breve/completo requirements;
- define capsule 6 step-by-step requirements;
- carry item-count and AS1 tunnel risks into feedback/implementation planning;
- later author final feedback only if explicitly authorized in a future phase.

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-6-FEEDBACK-CONTRACT-1
```

Purpose:

```text
Derive the capsule 6 feedback breve/completo and step-by-step contract from the capsule 6 ficha, without writing final authored feedback or implementation content.
```

## 25. What remains blocked

Blocked:

- implementation;
- code changes;
- DB/schema/endpoints;
- content registry changes;
- continuity logic changes;
- route-order changes;
- generated capsules;
- API integration;
- external API calls;
- final authored feedback;
- final complete feedback;
- final step-by-step scripts;
- final implementation keys;
- item-level rationale implementation;
- distractor-level rationale implementation;
- runtime tests;
- browser tests;
- deploy;
- secret inspection;
- `.env` inspection;
- student-facing claims;
- Sales-Ready claims;
- adaptive AI claims.

## 26. Final verdict

```text
M1_CAPSULE_6_FICHA_DERIVED_WITH_FEEDBACK_AND_IMPLEMENTATION_BLOCKERS
```
