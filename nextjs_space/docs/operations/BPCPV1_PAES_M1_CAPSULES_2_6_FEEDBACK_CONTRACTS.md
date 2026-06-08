# BPCPv1 PAES_M1 - Contratos de feedback y paso a paso para capsulas 2-6

**Phase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-FEEDBACK-CONTRACTS-1`
**Nature:** Feedback and step-by-step contract derivation.
**Scope:** Documentation only. No implementation.

## 1. Executive verdict

```text
M1_CAPSULES_2_6_FEEDBACK_CONTRACTS_DERIVED_WITH_CAPSULE_6_DEFERRED
```

Contracts can be derived for capsules 2-5 from the available ficha set. Capsule 6 remains deferred pending a bridge decision.

This document defines structure, required fields, guardrails, interpretation rules, and future authoring requirements for feedback breve, feedback completo, and step-by-step help. It does not write final student-facing feedback, final complete feedback, final step-by-step scripts, registry content, generated capsules, or continuity logic.

Final authored feedback, final complete feedback, final step-by-step scripts, implementation, registry changes, generated capsules, and continuity changes remain blocked.

## 2. Purpose

The purpose of this contract is to define how future feedback and step-by-step authoring should work for the PAES_M1 early calibration window:

```text
2. Algebra/functions initial.
3. Numbers / percentage / proportionality.
4. Data / table / graph.
5. Geometry / area / measure.
6. Contextual bridge or early validation.
```

The contract uses the available fichas for capsules 2-5 and carries capsule 6 as explicitly deferred.

This is a contract layer, not an authoring or implementation layer.

## 3. Governance basis

Documents read:

```text
PHASE_LOG.md
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_4_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_SOURCE_PACKETS.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULES_2_6_PRO_REVIEW_1.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_CALIBRATION_PLAN.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/BPTT_CONTINUOUS_IMPROVEMENT_ADDENDUM.md
nextjs_space/docs/operations/BEXAURI_AI_COMPLETE_CAPSULE_GENERATION_CONTINUOUS_IMPROVEMENT_STRATEGY.md
```

Governing constraints:

- feedback must be useful, specific, proportional, and connected to review;
- step-by-step help must support reasoning, not become a generic lecture;
- all evidence interpretation must remain cautious;
- current M1 continuity is not adaptive AI;
- current answer keys remain source/ficha candidates until a future implementation phase validates them;
- no student-facing readiness, mastery, theta, PAES score, diagnosis, or Sales-Ready claim is authorized.

## 4. Relationship to ficha set 2-5

Available ficha set:

| Capsule | contentKey | Source basis | Contract status |
|---:|---|---|---|
| 2 | `paes_m1_linear_equations_basic` | Current live source ficha | Contract derived here |
| 3 | `paes_m1_numbers_percentage_proportionality_entry` | Revised source-authoring ficha | Contract derived here |
| 4 | `paes_m1_data_representation_entry` | Current live source ficha | Contract derived here |
| 5 | `paes_m1_geometry_area_measure_entry` | Revised source-authoring ficha | Contract derived here |
| 6 | Deferred | Bridge/source not selected | Boundary only |

The 2-5 fichas define identity, purpose, non-purpose, evidence, error/distractor families, feedback implications, step-by-step implications, metadata proposals, and blockers.

This contract converts those implications into common authoring requirements. It does not fill the authoring content.

## 5. Capsule 6 deferred boundary

Capsule 6 remains deferred.

Documented candidate families:

- `paes_m1_linear_equations_word_problems`;
- `paes_m1_linear_functions_basic`.

This phase does not choose between them and does not derive a final capsule 6 feedback contract.

Capsule 6 feedback contracts cannot be finalized until bridge role/source is selected. Any future capsule 6 contract must preserve cautious evidence language and avoid extending the AS1 tunnel unnecessarily.

## 6. Shared feedback contract principles

Future feedback for capsules 2-6 must:

- acknowledge the result without overclaiming;
- name the mathematical focus;
- explain the central idea in the item;
- guide a concrete review action;
- distinguish correctness from understanding;
- distinguish calculation, interpretation, reading, and strategy when relevant;
- use cautious evidence language;
- support student review;
- remain mobile-readable;
- avoid shame, labels, diagnosis, score, readiness, mastery, theta, and adaptive AI claims.

Feedback should not be only "correct/incorrect." It should help the student review what happened and what to check next.

## 7. Shared feedback breve contract

Future feedback breve must be short enough for mobile-first use and visible in the student flow.

Required fields:

| Field | Requirement |
|---|---|
| result acknowledgement | Acknowledge correct/incorrect/needs review without judgment. |
| task focus | Name the focus: equation, percentage, table/graph, area/measure, or future bridge. |
| central idea | State one concise idea that explains the task. |
| next action | Give one concrete review action. |
| evidence language | Use cautious wording such as "may suggest" or "conviene revisar." |
| prohibited claims guard | Avoid diagnosis, score, readiness, mastery, theta, route certainty, and adaptive AI. |

Brief feedback should not contain full worked solutions. It should orient the student toward review.

## 8. Shared feedback completo contract

Future feedback completo may later support "Ver explicacion completa" or equivalent.

Required fields:

| Field | Requirement |
|---|---|
| item asked | State what the item asked the student to do. |
| correct option logic | Explain why the correct option works. |
| selected wrong option logic | If applicable, explain why the selected wrong option may be tempting. |
| central concept | Name the concept, relation, or representation involved. |
| error interpretation | Interpret the possible error cautiously. |
| review recommendation | Give a short review action or check. |
| claims guard | Avoid strong diagnosis, score, readiness, mastery, theta, route certainty, and adaptive AI. |

Complete feedback should be item-specific and grounded in the item. It must not become a long generic lesson or a hidden diagnostic report.

This phase does not write final complete feedback.

## 9. Shared step-by-step contract

Future step-by-step help must:

- be item-specific;
- avoid generic lecture;
- use a maximum of 4-6 steps;
- include a clear check at the end;
- use mobile-readable wording;
- distinguish calculation from interpretation;
- preserve cautious language;
- avoid final diagnosis or route claims.

Required fields:

| Field | Requirement |
|---|---|
| step sequence | 4-6 short ordered steps. |
| item focus | The sequence must match the item's mathematical focus. |
| calculation/interpretation split | Say when the student calculates and when they interpret. |
| check | Include a final verification against the equation, context, representation, unit, or result. |
| help limit | The help supports this item only; it does not prove mastery. |

This phase does not write final step-by-step scripts.

## 10. Shared distractor/error interpretation rules

Distractors and errors must be treated as hypotheses, not diagnoses.

Allowed language:

```text
This selected option may suggest...
This pattern could indicate...
It is worth reviewing...
More evidence is needed before a stronger claim.
```

Required distinctions:

- arithmetic slip vs conceptual issue;
- reading/lookup error vs content error;
- wrong operation vs correct idea with calculation mistake;
- representation issue vs data interpretation issue;
- magnitude confusion vs formula recall issue;
- self-report mismatch vs performance pattern.

No single item may be used to decide a route, diagnose a weakness, claim readiness, or declare mastery.

## 11. Shared prohibited claims

All future feedback and step-by-step content for this window must avoid:

- adaptive AI;
- mastery;
- theta;
- PAES score;
- diagnostic certainty;
- readiness certainty;
- personalized route certainty;
- autonomous pedagogy;
- "you know/do not know this topic";
- "your level is";
- "you are ready/not ready";
- "Bexauri knows exactly what you need";
- Sales-Ready or product readiness claims.

Allowed framing:

```text
This response gives an early signal.
The evidence is limited.
This is useful for review, not diagnosis.
```

## 12. Capsule 2 contract - equation mechanics

Capsule:

```text
contentKey: paes_m1_linear_equations_basic
focus: equation mechanics
```

Contract scope:

- inverse operations;
- isolating the unknown;
- one-step equations;
- simple two-step equation;
- checking by substitution;
- arithmetic slip vs equation-structure confusion;
- cautious evidence language.

Feedback breve requirements:

- identify the equation focus;
- acknowledge whether the selected value appears to satisfy the equation;
- guide the student to check by substitution;
- avoid declaring Algebra mastery or weakness.

Feedback completo requirements:

- state the operation affecting `x`;
- explain the inverse operation;
- explain isolation of `x`;
- show verification logic conceptually;
- distinguish possible arithmetic slip from equation-structure confusion;
- state that one item or one capsule is not enough for a strong Algebra conclusion.

Step-by-step structure:

```text
read equation -> identify operation on x -> apply inverse operation -> isolate x -> substitute to check
```

Future authoring requirements:

- each item needs brief feedback;
- each item needs complete feedback;
- each item needs distractor rationale;
- each item needs a 4-6 step help sequence;
- two-step item must separate the first inverse operation from the second.

## 13. Capsule 3 contract - percentage/proportionality

Capsule:

```text
contentKey: paes_m1_numbers_percentage_proportionality_entry
focus: percentage and proportionality in context
```

Contract scope:

- identifying the base quantity;
- percent as part of a whole;
- percentage decrease;
- unit price comparison;
- ratio/equivalence;
- reasonableness check;
- avoiding overdiagnosis from one response.

Feedback breve requirements:

- name the base quantity or proportional relation;
- identify the key relation without writing a full solution;
- prompt a reasonableness check;
- avoid declaring Numbers mastery or remedial need.

Feedback completo requirements:

- explain the base/relation/calculation/interpretation chain;
- clarify whether the task asks for a part, remaining amount, unit price, or equivalent ratio;
- explain why a tempting distractor may come from wrong base, total-price comparison, additive reasoning, or arithmetic slip;
- keep inference limited to an early proportional-reasoning signal.

Step-by-step structure:

```text
read context -> identify base or relation -> choose operation -> calculate -> interpret result -> check reasonableness
```

Future authoring requirements:

- item 1 should anchor percent of a quantity;
- item 2 should make base and remaining amount explicit;
- item 3 should make lower unit price explicit;
- item 4 should preserve ratio/equivalence logic;
- each item needs feedback breve/completo, distractor rationale, and a short item-specific help sequence.

## 14. Capsule 4 contract - data/table/graph reading

Capsule:

```text
contentKey: paes_m1_data_representation_entry
focus: table/graph reading and basic data interpretation
```

Contract scope:

- locating data in table/graph;
- reading labels;
- direct lookup;
- comparison;
- sum/average/trend if present in current source;
- unsupported inference;
- current route-order risk.

Feedback breve requirements:

- point the student to the relevant row, column, label, month, or graph feature;
- distinguish whether the item asked for lookup, comparison, calculation, trend, or conclusion;
- keep wording compact and mobile-readable;
- avoid Data/Probability mastery claims.

Feedback completo requirements:

- state what the representation shows;
- identify the data needed;
- explain the correct lookup, comparison, sum, average, trend, or supported conclusion;
- explain why unsupported alternatives do not follow from the representation;
- distinguish lookup error from calculation or interpretation friction.

Step-by-step structure:

```text
read question -> locate relevant data -> decide lookup/comparison/calculation/interpretation -> answer -> verify against representation
```

Route-order note:

```text
This phase does not change continuity. Capsule 4 pedagogically belongs earlier in 2-6 but current operational route-order risk remains unresolved.
```

Future authoring requirements:

- each of the 8 items needs concise feedback that does not overload the student;
- full feedback should distinguish direct table reading from arithmetic and interpretation;
- step-by-step should remain short even for average/trend/conclusion items;
- current route-order risk must be carried into future continuity work.

## 15. Capsule 5 contract - geometry/measure

Capsule:

```text
contentKey: paes_m1_geometry_area_measure_entry
focus: area, perimeter and measure
```

Contract scope:

- requested magnitude;
- border vs surface;
- composite area by adding parts;
- unit consistency;
- comparing rectangular areas;
- arithmetic slip vs magnitude confusion;
- cautious evidence language.

Feedback breve requirements:

- name the requested magnitude;
- distinguish surface, border, unit, or comparison when relevant;
- point to a concrete check: dimensions, units, or what the question asks;
- avoid Geometry mastery, spatial ability, score, readiness, or route claims.

Feedback completo requirements:

- connect the figure/context to the calculation;
- explain why area/perimeter/unit/comparison logic applies;
- explain distractor temptation cautiously;
- separate arithmetic slip from magnitude confusion;
- state inference limits.

Step-by-step structure:

```text
read what is asked -> identify figure/measure/unit -> choose area/perimeter/conversion/comparison -> calculate -> check units -> verify context
```

Future authoring requirements:

- item 1 should focus on border vs surface;
- item 2 should show adding two rectangle areas;
- item 3 should require unit consistency;
- item 4 should compare rectangular areas without repeating item 1;
- each item needs feedback breve/completo, distractor rationale, and a short item-specific help sequence.

## 16. Capsule 6 contract boundary - deferred bridge

Capsule 6 remains deferred.

Boundary rules:

- do not choose final capsule 6 source in this phase;
- do not derive final capsule 6 feedback contract in this phase;
- do not write final capsule 6 feedback or step-by-step;
- do not decide between `paes_m1_linear_equations_word_problems` and `paes_m1_linear_functions_basic`;
- do not extend AS1 tunnel by default.

Any future capsule 6 contract must:

- start from the selected bridge role/source;
- explain how it integrates or validates signals from capsules 2-5;
- preserve cautious evidence language;
- avoid mastery, readiness, theta, PAES score, adaptive AI, and route-certainty claims;
- avoid treating capsule 6 as a diagnostic gate.

## 17. Cross-capsule feedback consistency

Across capsules 2-5, feedback should feel consistent:

- result acknowledgement first;
- focus named explicitly;
- central idea explained briefly;
- concrete review action;
- cautious evidence language;
- no diagnosis or strong route claim.

Cross-capsule consistency should not flatten the math. Each capsule must still preserve its own focus:

- capsule 2: equation mechanics;
- capsule 3: base/proportional relation;
- capsule 4: representation/data reading;
- capsule 5: magnitude/measure/geometry.

This consistency prepares later authored feedback and living-bank reuse.

## 18. Evidence and self-report handling

Feedback contracts should leave room for self-report:

- "Me fue bien";
- "Me costo";
- "No la termine."

Self-report may adjust the tone of review but must not decide route by itself.

Patterns to handle cautiously:

- correct answer + "Me costo" may suggest effort, low confidence, or hidden friction;
- wrong answer + "Me fue bien" may suggest calibration mismatch;
- no completion means insufficient evidence;
- repeated use of step-by-step may suggest need for clearer feedback or task revision.

This phase does not implement self-report logic.

## 19. Continuous improvement implications

These contracts support future supervised continuous improvement:

- review which explanations help students recover;
- identify confusing distractors;
- improve item wording when ambiguity appears;
- improve feedback when students repeat the same error;
- improve step-by-step when it is overused or ineffective;
- reuse validated contracts in the living capsule bank;
- version improvements under governance.

Explicit limits:

- This does not authorize autonomous adaptive AI.
- This does not authorize generated capsules.
- This does not authorize API integration.
- This does not authorize assignment logic changes.
- This does not authorize automatic route mutation.

## 20. What can proceed next

Can proceed:

- capsule 6 bridge decision using the complete 2-5 ficha and feedback-contract set;
- later actual feedback breve/completo and step-by-step authoring after capsule 6 decision;
- later validation-contract work for generated complete capsules;
- later continuity reconciliation if explicitly authorized.

## 21. What remains blocked

Blocked:

- final authored feedback;
- final complete feedback;
- final step-by-step scripts;
- registry implementation;
- content registry changes;
- continuity logic changes;
- capsule 6 final source selection;
- generated capsules;
- API integration;
- assignment logic changes;
- runtime tests;
- browser tests;
- deploy;
- final implementation keys;
- Sales-Ready claim;
- adaptive AI claim;
- mastery, theta, PAES score, readiness, diagnosis, or personalized route certainty.

## 22. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-6-BRIDGE-DECISION-1
```

Purpose:

```text
Decide capsule 6 bridge role after reviewing the complete 2-5 ficha and feedback-contract set.
```

Alternative later phase after capsule 6 decision:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-FEEDBACK-AUTHORING-1
```

Purpose:

```text
Author actual feedback breve/completo and step-by-step content for approved capsules after contracts and capsule 6 decision.
```

Do not execute those phases here.

## 23. Final verdict

```text
M1_CAPSULES_2_6_FEEDBACK_CONTRACTS_DERIVED_WITH_CAPSULE_6_DEFERRED
```

## Postscript - Later capsule 6 integration note

This document remains historically valid for the phase that derived shared feedback and step-by-step contracts for capsules 2-5 while capsule 6 was deferred.

Later documentation completed the capsule 6 bridge chain:

```text
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_6_BRIDGE_DECISION.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_6_FICHA.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_6_FEEDBACK_CONTRACT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS_INTEGRATION.md
```

This postscript does not rewrite the original verdict. It records that the original capsule 6 deferred boundary is now complemented by later documentation.
