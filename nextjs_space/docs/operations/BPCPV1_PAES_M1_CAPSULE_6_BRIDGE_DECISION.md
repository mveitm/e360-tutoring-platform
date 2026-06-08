# BPCPv1 PAES_M1 - Decision puente para capsula 6

**Phase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-6-BRIDGE-DECISION-1`
**Nature:** Documentation-only pedagogical bridge decision.
**Scope:** No implementation.

## 1. Executive verdict

```text
M1_CAPSULE_6_BRIDGE_DECISION_SELECTED_CURRENT_SOURCE
```

Capsule 6 should use the current source candidate:

```text
paes_m1_linear_functions_basic
```

This is a documentation-level pedagogical decision only. It selects the source direction for a future capsule 6 ficha because the current source has stronger representation/modeling bridge potential than `paes_m1_linear_equations_word_problems`.

The selection does not implement capsule 6, does not change continuity, does not write final feedback, does not write final step-by-step help, does not create generated capsules, does not modify the content registry, and does not authorize student-facing claims.

## 2. Purpose

The purpose of this phase is to decide the capsule 6 bridge role after reviewing:

- the capsule 2 and 4 fichas from current live source;
- the capsule 3 and 5 fichas from revised source-authoring candidates;
- the feedback breve/completo and step-by-step contracts for capsules 2-5;
- the deferred capsule 6 boundary in the 2-6 feedback-contract phase;
- the current source candidates in `nextjs_space/lib/study-load-content.ts`;
- the current operational continuity helper.

This phase decides what should be documented next. It does not execute the decision in code.

## 3. Governance basis

Documents read:

```text
PHASE_LOG.md
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_4_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_SOURCE_PACKETS.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULES_2_6_PRO_REVIEW_1.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_CALIBRATION_PLAN.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/BPTT_CONTINUOUS_IMPROVEMENT_ADDENDUM.md
```

Source files inspected read-only:

```text
nextjs_space/lib/study-load-content.ts
nextjs_space/lib/study-load-continuity.ts
nextjs_space/lib/study-load-pedagogical-decision.ts
```

Read-only search used:

```text
rg -n "paes_m1_linear_equations_word_problems|paes_m1_linear_functions_basic|answerKey|options|question|contentKey" nextjs_space/lib nextjs_space/docs/operations
```

Governing constraints:

- BPCPv1-PAES-M1 requires cautious evidence language.
- The 2-6 window is broad early calibration, not diagnosis.
- Capsule 6 should bridge or validate early signals, not close a route.
- Current continuity is fixed operational sequence v0, not adaptive AI.
- No readiness, mastery, theta, PAES score, route certainty, adaptive AI, or Sales-Ready claim is authorized.

## 4. Current 2-5 evidence map

The documented 2-5 window now has the following support:

| Capsule | contentKey | Role | Source status | Main evidence signal |
|---:|---|---|---|---|
| 2 | `paes_m1_linear_equations_basic` | Algebra/functions initial | Current live source ficha | Basic equation mechanics |
| 3 | `paes_m1_numbers_percentage_proportionality_entry` | Numbers / percentage / proportionality | Revised source-authoring ficha | Base quantity, proportional relation, calculation, interpretation |
| 4 | `paes_m1_data_representation_entry` | Data / table / graph | Current live source ficha | Lookup, comparison, trend, sum/average, supported conclusion |
| 5 | `paes_m1_geometry_area_measure_entry` | Geometry / area / measure | Revised source-authoring ficha | Requested magnitude, dimensions, units, area/perimeter/measure comparison |

This creates broader multiaxis coverage than the current operational continuity v0. Capsule 6 should therefore act as a bridge after this coverage, not as another immediate equation-mechanics extension.

## 5. Capsule 6 decision criteria

A suitable capsule 6 bridge should:

- integrate or validate signals from capsules 2-5;
- avoid extending the AS1 Algebra/functions tunnel by default;
- preserve cautious evidence language;
- support contextual interpretation or representation/modeling;
- remain suitable for 1-3 closed MVP students;
- support future feedback breve/completo and step-by-step contracts;
- avoid diagnosis, mastery, theta, PAES score, readiness, route certainty, adaptive AI, or Sales-Ready claims;
- remain documentation-level until a future explicit implementation phase.

The selected source does not need to be perfect. It must be the better documented direction for a future ficha, with blockers carried forward.

## 6. Candidate A - paes_m1_linear_equations_word_problems

Current source status:

| Field | Value |
|---|---|
| Title | `PAES M1 - Problemas con ecuaciones lineales` |
| contentKey | `paes_m1_linear_equations_word_problems` |
| contentVersion | `v1` |
| Source file | `nextjs_space/lib/study-load-content.ts` |
| Item count | 4 |
| Axis/family | `algebra_functions` / AS1 |
| Primary purpose | `bridge` |
| Feedback/step-by-step | Authored M1 feedback and step-by-step absent |

Current item/content shape:

| Item | Source shape | Current-source key candidate |
|---|---|---|
| q1 | Solve `2(x + 3) = 18`. | `B` |
| q2 | Solve `4x - 5 = 2x + 11`. | `C` |
| q3 | Solve `(x/2) + 7 = 15`. | `C` |
| q4 | Solve `3(x - 4) + 6 = 24`. | `C` |

Fit with capsule 2 equation mechanics:

- Strong overlap with capsule 2, but mostly as more equation manipulation.
- The current stems do not provide a distinct bridge beyond equation structure.

Fit with capsule 3 proportionality:

- Weak.
- The source does not materially test base quantity, percentage, proportional comparison, or ratio/equivalence.

Fit with capsule 4 data/representation:

- Weak.
- The source does not use table/graph representation or data interpretation.

Fit with capsule 5 geometry/measure:

- No meaningful fit.

AS1 tunnel risk:

- High.
- If used as capsule 6, it may continue the Algebra/functions corridor rather than bridge from the broader 2-5 window.

Bridge/contextual validation ability:

- Partial at best.
- The title and instructions mention problems, but the inspected stems are equation forms rather than rich contextual modeling.

Feedback/step-by-step compatibility:

- Compatible with equation-solving feedback and inverse-operation step-by-step.
- Less compatible with a cross-capsule bridge contract because it mostly repeats equation mechanics.

Implementation readiness blockers:

- No authored brief feedback.
- No authored complete feedback.
- No authored step-by-step scripts.
- No item-level rationale or distractor rationale sufficient for BPCPv1.
- Current answer keys must remain current-source/ficha candidates until a future implementation phase.

Inference limits:

- May provide a signal about handling more complex equations.
- Does not validate broad early calibration.
- Does not justify AS1 dominance.
- Does not support readiness, mastery, score, theta, or route certainty.

Decision for candidate A:

```text
Not selected for capsule 6 bridge.
```

It may remain useful later as an AS1 transition or equation-focused source, but it is not the best capsule 6 bridge after the 2-5 multiaxis window.

## 7. Candidate B - paes_m1_linear_functions_basic

Current source status:

| Field | Value |
|---|---|
| Title | `PAES M1 - Funciones lineales basicas` |
| contentKey | `paes_m1_linear_functions_basic` |
| contentVersion | `v1` |
| Source file | `nextjs_space/lib/study-load-content.ts` |
| Item count | 8 |
| Axis/family | `algebra_functions` / AS1 |
| Primary purpose | `bridge` |
| Roadmap nodes | `internal:as1_linear_functions_basic`, `internal:as1_linear_representation` |
| Skill refs | `internal:representar`, `internal:resolver_problemas`, `internal:modelar` |
| Feedback/step-by-step | Authored M1 feedback and step-by-step absent |

Current item/content shape:

| Item | Source shape | Current-source key candidate |
|---|---|---|
| q1 | Evaluate `f(x) = 2x + 3` at `x = 4`. | `B` |
| q2 | Solve for `x` when `f(x) = 3x - 5` and `f(x) = 10`. | `B` |
| q3 | Find slope from points `(0, 2)` and `(3, 8)`. | `A` |
| q4 | Identify y-intercept in `y = -2x + 6`. | `C` |
| q5 | Select function with slope 4 and intercept -1. | `D` |
| q6 | Model a service cost with fixed and hourly charges. | `A` |
| q7 | Evaluate `f(x) = -x + 9` at `x = 3`. | `B` |
| q8 | Infer a linear rule from a small table. | `C` |

Fit with capsule 2 equation mechanics:

- Meaningful.
- It extends from solving isolated equations toward interpreting and using linear relationships.
- q2 still overlaps equation mechanics, but in function notation.

Fit with capsule 3 proportionality:

- Partial.
- Linear functions are not a substitute for the capsule 3 proportionality signal, but q6 and q8 can connect rate/change, fixed cost, relation, and reasonableness.

Fit with capsule 4 data/representation:

- Partial to moderate.
- q8 uses a small table to infer a rule.
- q3-q5 involve representation language such as slope and intercept.

Fit with capsule 5 geometry/measure:

- Weak.
- There is no direct geometry/measure bridge. This must be acknowledged and not forced.

AS1 tunnel risk:

- Moderate to high, because the source is still AS1 Algebra/functions.
- The risk is lower than candidate A if the ficha constrains capsule 6 as representation/modeling bridge rather than additional equation practice.

Bridge/contextual validation ability:

- Stronger than candidate A.
- It includes symbolic evaluation, solving from function output, slope/intercept, cost modeling, and table-to-rule inference.
- It can check whether the student can interpret a simple linear relation beyond isolated equation solving.

Feedback/step-by-step compatibility:

- Compatible with a future bridge contract if the ficha requires:
  - identify the relation;
  - distinguish input/output;
  - connect symbolic, contextual, or table information;
  - calculate;
  - interpret result;
  - check against the representation or context.

Implementation readiness blockers:

- No authored brief feedback.
- No authored complete feedback.
- No authored step-by-step scripts.
- No item-level rationale or distractor rationale sufficient for BPCPv1.
- Current answer keys must remain current-source/ficha candidates until a future implementation phase.
- The 8-item source may need ficha-level focus constraints for early MVP flow.

Inference limits:

- May provide an early bridge signal about simple linear relationships.
- Cannot diagnose functions mastery.
- Cannot decide route by itself.
- Cannot establish readiness, mastery, theta, PAES score, or adaptive personalization.
- Does not prove AS1 should dominate the student's path.

Decision for candidate B:

```text
Selected as the documentation-level current source direction for capsule 6.
```

## 8. Comparative review

| Criterion | `paes_m1_linear_equations_word_problems` | `paes_m1_linear_functions_basic` | Decision implication |
|---|---|---|---|
| Current source status | Live current source | Live current source | Both are available as documentation sources |
| Item/content shape | Four equation forms | Eight function/representation/modeling items | Candidate B has broader bridge shape |
| Fit with capsule 2 | Strong overlap | Extension from equations to functions | Candidate B better extends rather than repeats |
| Fit with capsule 3 | Weak | Partial through rate/relation/context | Candidate B has modest proportional-relation bridge |
| Fit with capsule 4 | Weak | Partial through table/rule and representation | Candidate B bridges representation better |
| Fit with capsule 5 | None | Weak | Neither covers geometry/measure |
| AS1 tunnel risk | High | Moderate-to-high | Candidate B still needs constraints, but is less tunnel-like |
| Bridge potential | Partial equation transition | Stronger representation/modeling bridge | Candidate B is preferred |
| Feedback contract compatibility | Equation mechanics only | Function relation, representation, context | Candidate B supports richer future contract |
| Main blocker | Repeats equation tunnel | Broad 8-item AS1 source | Candidate B needs ficha focus review |

Comparative conclusion:

```text
paes_m1_linear_functions_basic is the stronger capsule 6 bridge candidate.
```

The selection is not because it is a perfect multiaxis capsule. It is selected because, among current sources, it can bridge equation mechanics into representation/modeling more responsibly than the equation word-problems source.

## 9. AS1 tunnel risk review

AS1 tunnel risk remains real.

Risk factors:

- Candidate B is still Algebra/functions.
- Current operational continuity already overrepresents AS1 before Data/table/graph.
- Candidate B has 8 items, which may be too broad for a compact early bridge.
- Without ficha constraints, it could become another AS1 corridor step instead of a bridge.

Mitigations required in the next ficha phase:

- Frame capsule 6 as bridge/contextual validation, not AS1 advancement.
- Carry non-purpose statements clearly.
- Avoid treating success as functions mastery.
- Avoid treating failure as Algebra weakness.
- Preserve the complete 2-5 multiaxis context.
- Consider whether the future ficha should highlight representation/modeling items rather than all source breadth.
- Keep feedback and step-by-step contracts cautious.

Decision:

```text
AS1 tunnel risk does not block selecting paes_m1_linear_functions_basic, but it must be carried as a ficha blocker/constraint.
```

## 10. Representation/modeling bridge review

Candidate B provides the better representation/modeling bridge because it includes:

- function notation;
- input/output interpretation;
- slope from two points;
- intercept identification;
- matching slope/intercept to an expression;
- a fixed-plus-variable cost model;
- a table-to-rule item.

These features can connect:

- capsule 2 equation mechanics;
- capsule 3 relation/proportional reasoning, cautiously and partially;
- capsule 4 table/representation reading;
- broader PAES_M1 modeling and representation skills.

It does not connect meaningfully to capsule 5 geometry/measure. That absence must be stated in the future ficha rather than hidden.

## 11. Feedback-contract compatibility

The selected source can support a future capsule 6 feedback contract if the contract is derived after the ficha.

Future feedback breve should likely:

- name the relation being used;
- distinguish input and output when relevant;
- point to the representation, expression, or context;
- prompt a check against the rule/table/context.

Future feedback completo should likely:

- state what the function relation means;
- explain why the selected expression/value works;
- distinguish equation mechanics from representation reading;
- explain why common wrong options may be tempting;
- keep all interpretation cautious.

Future step-by-step should likely follow:

```text
read the relation/context/representation -> identify input/output or slope/intercept -> choose operation or rule -> calculate or match -> interpret -> check against the source
```

This phase does not write final feedback, complete feedback, or step-by-step scripts.

## 12. Final capsule 6 decision

Final documentation-level decision:

```text
Select paes_m1_linear_functions_basic as the current source direction for capsule 6.
```

Decision status:

```text
documentation-level only
```

What this authorizes:

- deriving a BPCPv1 ficha for capsule 6 in a future phase;
- using `paes_m1_linear_functions_basic` as the source basis for that ficha;
- carrying AS1 tunnel, broad item count, feedback, step-by-step, rationale, metadata, and implementation blockers into that ficha.

What this does not authorize:

- implementation;
- content registry changes;
- continuity changes;
- final authored feedback;
- final complete feedback;
- final step-by-step scripts;
- generated capsules;
- API integration;
- final student-facing claims;
- adaptive AI, mastery, theta, PAES score, readiness, or Sales-Ready claims.

## 13. Capsule 6 proposed role

Proposed role:

```text
Capsule 6 bridge/contextual validation signal connecting early equation mechanics with representation/modeling, while checking whether the student can interpret a simple linear relation beyond isolated equation solving.
```

Working title for future ficha:

```text
PAES M1 - Funciones lineales basicas
```

Working contentKey:

```text
paes_m1_linear_functions_basic
```

Role in 2-6 window:

```text
Capsule 6 bridge after multiaxis early calibration signals from capsules 2-5.
```

## 14. Capsule 6 proposed non-purpose

Capsule 6 is not:

- a diagnosis of functions mastery;
- a diagnosis of Algebra/functions mastery;
- a PAES readiness signal;
- a PAES score signal;
- a theta signal;
- a mastery signal;
- adaptive AI;
- a route decision by itself;
- proof that AS1 should dominate the student's path;
- a Sales-Ready claim;
- a student-facing claim.

## 15. Capsule 6 expected evidence

Expected evidence:

- whether the student can recognize or use a simple linear relationship;
- whether the student can connect symbolic, contextual, or representational information when present in the source;
- whether errors may suggest equation mechanics friction;
- whether errors may suggest representation-reading friction;
- whether errors may suggest proportional-relation or rate interpretation friction;
- whether errors may suggest context interpretation friction;
- whether the signal complements capsules 2-5 without overclaiming.

Evidence should remain item-level and capsule-level, not diagnostic.

## 16. Capsule 6 inference limits

Inference limits:

- One capsule cannot establish functions mastery.
- One capsule cannot establish Algebra/functions readiness.
- One capsule cannot determine a personalized route.
- Correctness does not prove understanding.
- Incorrectness does not prove a stable weakness.
- The source does not validate Geometry/measure.
- The source only partially touches proportionality and data/representation.
- More evidence is needed before any stronger claim.
- No PAES score, theta, mastery, readiness, diagnostic certainty, adaptive AI, or Sales-Ready claim is allowed.

## 17. Capsule 6 feedback-contract boundary

Capsule 6 feedback contracts cannot be finalized until the capsule 6 ficha is derived.

The future contract should cover:

- function notation;
- input/output interpretation;
- simple equation-from-output mechanics;
- slope/intercept reading;
- fixed-plus-variable cost modeling;
- table-to-rule inference;
- distinction between calculation and interpretation;
- cautious distractor interpretation.

The future contract must not:

- write final feedback before authoring authorization;
- overread item correctness;
- treat the selected source as proof of an adaptive route;
- turn capsule 6 into a gate.

## 18. What can proceed next

Can proceed:

- derive a BPCPv1 ficha for capsule 6 using `paes_m1_linear_functions_basic`;
- carry source details, item summaries, current-source key candidates, evidence expectations, feedback implications, step-by-step implications, metadata proposals, inference limits, and blockers;
- update the broader 2-6 documentation chain after the ficha phase.

## 19. What remains blocked

Blocked:

- implementation;
- content registry changes;
- continuity logic changes;
- route-order changes;
- final authored feedback;
- final complete feedback;
- final step-by-step scripts;
- item-level rationale implementation;
- final implementation answer keys;
- generated capsules;
- API integration;
- assignment logic changes;
- runtime tests;
- browser tests;
- deploy;
- student-facing claims;
- adaptive AI claim;
- mastery, theta, PAES score, readiness, diagnostic certainty, route certainty, or Sales-Ready claims.

## 20. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-6-FICHA-1
```

Purpose:

```text
Derive a BPCPv1 ficha for the selected capsule 6 bridge source, carrying feedback/step-by-step/rationale blockers.
```

Do not execute that phase here.

## 21. Final verdict

```text
M1_CAPSULE_6_BRIDGE_DECISION_SELECTED_CURRENT_SOURCE
```

Selected current source:

```text
paes_m1_linear_functions_basic
```
