# BPCPv1 PAES_M1 - Contrato de feedback y paso a paso para capsula 6

**Phase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-6-FEEDBACK-CONTRACT-1`
**Nature:** Feedback breve, feedback completo, and step-by-step contract derivation.
**Scope:** Documentation only. No implementation.

## 1. Executive verdict

```text
M1_CAPSULE_6_FEEDBACK_CONTRACT_DERIVED_WITH_AUTHORING_AND_IMPLEMENTATION_BLOCKERS
```

The capsule 6 feedback and step-by-step contract can be derived from the BPCPv1 ficha for:

```text
paes_m1_linear_functions_basic
```

This contract defines future authoring requirements for feedback breve, feedback completo, and step-by-step help. It does not write final student-facing feedback, final complete feedback, final step-by-step scripts, final implementation keys, registry content, or continuity logic.

Capsule 6 remains a bridge/contextual validation signal only. It may provide limited evidence about simple linear relation interpretation, representation/modeling, and transfer from equation mechanics. It cannot diagnose functions mastery, decide route, close calibration, validate Geometry/measure, support readiness, support theta, support PAES score, support adaptive AI, or support Sales-Ready claims.

## 2. Purpose

The purpose of this document is to define the contract that future capsule 6 feedback authoring must follow.

The contract covers:

- feedback breve structure;
- feedback completo structure;
- step-by-step structure;
- item-family requirements;
- per-item feedback requirements for q1-q8;
- per-item step-by-step requirements for q1-q8;
- error/distractor interpretation rules;
- cautious evidence language;
- mobile-readable constraints;
- authoring and implementation blockers.

This document prepares a future authoring phase. It does not execute authoring.

## 3. Governance basis / documentos leidos

Required documents read:

```text
PHASE_LOG.md
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_6_FICHA.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_6_BRIDGE_DECISION.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_4_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_CALIBRATION_PLAN.md
```

Source inspected read-only:

```text
nextjs_space/lib/study-load-content.ts
```

Read-only search used:

```text
rg -n "paes_m1_linear_functions_basic|feedback|step-by-step|paso a paso|answerKey|options|question|contentKey" nextjs_space/lib nextjs_space/docs/operations
```

Governance constraints:

- BPCPv1 evidence language remains cautious.
- Capsule 6 is a bridge, not a diagnostic gate.
- Current answer keys are current-source/ficha key candidates only.
- Feedback and step-by-step must support review, not claims.
- No implementation, code, registry, continuity, route-order, API, generated capsule, runtime test, browser test, deploy, secret, or `.env` action is authorized.

## 4. Relationship to capsule 6 ficha

The capsule 6 ficha concluded:

```text
M1_CAPSULE_6_FICHA_DERIVED_WITH_FEEDBACK_AND_IMPLEMENTATION_BLOCKERS
```

The ficha defines capsule 6 as:

```text
Bridge/contextual validation signal connecting early equation mechanics with representation/modeling, while checking whether the student can interpret a simple linear relation beyond isolated equation solving.
```

This contract derives the feedback and step-by-step requirements from that ficha.

The contract must carry the ficha blockers:

- no authored brief feedback;
- no authored complete feedback;
- no final step-by-step scripts;
- no item-level rationale sufficient for BPCPv1 implementation;
- no distractor-level rationale sufficient for BPCPv1 implementation;
- current answer keys are source/ficha candidates only;
- metadata remains proposal-level;
- item-count risk: source has 8 items and may be broad for a compact early bridge;
- AS1 tunnel risk remains moderate/high because the source is still Algebra/functions;
- capsule 6 cannot validate Geometry/measure;
- capsule 6 only partially connects to proportionality and data/representation;
- capsule 6 cannot support mastery, readiness, theta, PAES score, diagnostic certainty, route certainty, adaptive AI, or Sales-Ready claims.

## 5. Relationship to shared 2-6 feedback contract

The shared 2-6 feedback contract already defined common rules for:

- feedback breve;
- feedback completo;
- step-by-step help;
- distractor/error interpretation;
- prohibited claims;
- evidence and self-report handling;
- continuous improvement.

This capsule 6 contract specializes that shared contract for:

- function notation;
- input/output interpretation;
- solving from output;
- slope/intercept reading;
- expression matching;
- fixed-plus-variable context modeling;
- table-to-rule inference.

The shared contract remains active. This document does not replace it; it narrows it for capsule 6 now that the source has been selected and fichada.

## 6. Feedback brief contract for capsule 6

Future feedback breve for capsule 6 must be compact, mobile-readable, and visible in the student flow.

Required fields:

| Field | Requirement |
|---|---|
| result acknowledgement | Acknowledge the result without judgment and without diagnosis. |
| item focus | Name the relevant focus: function value, output-to-input, slope, intercept, expression, cost model, or table rule. |
| central idea | State one concise idea about the relation or representation. |
| concrete next action | Tell the future authoring layer what review action to include, such as substituting, checking slope/intercept roles, or verifying with a table value. |
| cautious evidence language | Use limited wording such as "may suggest", "could indicate", "early signal", "limited evidence", or "conviene revisar". |
| claims guard | Avoid mastery, readiness, theta, PAES score, diagnostic certainty, route certainty, adaptive AI, and Sales-Ready claims. |

Brief feedback must not:

- include a full worked solution;
- become a long functions lesson;
- describe a student profile;
- approve a route;
- imply that AS1 should dominate next steps.

## 7. Feedback complete contract for capsule 6

Future feedback completo may later support an expanded review affordance, but this phase does not write final expanded copy.

Required fields:

| Field | Requirement |
|---|---|
| what the item asked | Identify the item task in non-final authoring terms. |
| why the key candidate works | Explain the mathematical relation behind the current-source/ficha key candidate. |
| why the selected wrong option may be tempting | If wrong, connect the option to a cautious distractor hypothesis. |
| central concept | Name the concept: input/output, inverse equation, slope, intercept, expression matching, fixed cost/rate, or table pattern. |
| calculation vs interpretation | Separate computation from meaning in the context or representation. |
| review recommendation | Define a short review action for future authoring. |
| evidence limit | State that the item gives limited evidence only. |
| claims guard | Avoid diagnosis, mastery, readiness, theta, PAES score, route certainty, adaptive AI, and Sales-Ready claims. |

Complete feedback must not:

- assert that the student knows or does not know functions;
- infer a stable weakness from one response;
- turn q1-q8 into a final diagnostic report;
- write final implementation feedback in this contract phase.

## 8. Step-by-step contract for capsule 6

Future step-by-step help must be item-specific and short.

Shared capsule 6 sequence family:

```text
read relation/context/representation -> identify input/output or slope/intercept -> choose operation or rule -> calculate or match -> interpret -> check against source
```

Required fields:

| Field | Requirement |
|---|---|
| step count | Maximum 4-6 short steps. |
| item-specific focus | Steps must match the item family, not a generic lecture. |
| calculation step | Include where to calculate, substitute, solve, compare, or match. |
| interpretation step | Include what the result means in the expression, table, graph language, or context. |
| final check | Verify against the original function, points, table, expression, or cost context. |
| help limit | Make clear in authoring notes that the help supports this item only. |

Step-by-step must not:

- write final scripts in this contract;
- exceed a compact mobile-readable sequence;
- claim mastery;
- decide route;
- make the source look like adaptive AI.

## 9. Item-family contract by item type

| Item family | Items | Future feedback focus | Future step-by-step focus | Error/distractor family |
|---|---|---|---|---|
| Function evaluation | q1, q7 | Input substitution and output meaning. | Identify input, replace `x`, calculate, interpret `f(x)`, check. | Arithmetic slip, input/output confusion, operation-order issue. |
| Solve-from-output | q2 | Treat `f(x)` as the output and solve for input. | Set output equal to expression, solve equation, substitute to check. | Equation mechanics slip, visible number selection, output/input reversal. |
| Slope/intercept reading | q3, q4 | Distinguish slope from intercept and values in representation. | Identify relevant form or points, calculate/read, check role. | Slope/intercept confusion, endpoint difference error, sign confusion. |
| Expression matching | q5 | Match slope and intercept to expression roles. | Locate slope coefficient, locate intercept, compare options, verify roles. | Correct numbers in wrong roles, sign error, surface matching. |
| Fixed-plus-variable context modeling | q6 | Translate fixed charge and rate per hour into a cost rule. | Identify fixed value, identify variable rate, build expression, test meaning. | Reversing fixed/rate, multiplying all values, ignoring variable. |
| Table-to-rule inference | q8 | Infer rate and starting value from a small table. | Find change in `y`, identify value at `x=0`, build rule, verify table. | Correct rate wrong intercept, visible-number matching, unsupported rule. |

## 10. Per-item feedback requirements matrix for q1-q8

These are requirements for future final authoring, not final feedback.

| Item | Source task summary | Current-source/ficha key candidate | Feedback breve requirement | Feedback completo requirement | Error/distractor requirement |
|---|---|---|---|---|---|
| q1 | Evaluate `f(x) = 2x + 3` at `x = 4`. | `B` | Must name substitution of input into the function rule. | Must explain substituting `4` for `x`, calculating the expression, and interpreting the output. | Must distinguish arithmetic slip from not substituting the input correctly. |
| q2 | Solve for `x` when `f(x) = 3x - 5` and `f(x) = 10`. | `B` | Must name output-to-input reasoning. | Must explain setting `3x - 5 = 10`, solving, and checking by substitution. | Must distinguish equation mechanics slip from confusing `x` with `f(x)`. |
| q3 | Find slope from points `(0, 2)` and `(3, 8)`. | `A` | Must name slope as change in `y` over change in `x`. | Must explain comparing the two points and using the ratio of changes. | Must distinguish endpoint-value selection from slope calculation. |
| q4 | Identify y-intercept in `y = -2x + 6`. | `C` | Must name the y-intercept as the constant term in this form. | Must explain slope/intercept roles in `y = mx + b` without turning into a long lecture. | Must distinguish sign/slope confusion from intercept reading. |
| q5 | Select function with slope 4 and intercept -1. | `D` | Must name matching slope and intercept roles. | Must explain how slope appears as the coefficient of `x` and intercept as the constant term. | Must address wrong-role or wrong-sign options cautiously. |
| q6 | Model service cost with fixed and hourly charges. | `A` | Must name fixed-plus-variable cost structure. | Must explain fixed charge, hourly rate, variable `h`, and why the expression matches the context. | Must distinguish reversing fixed/rate from multiplying all visible numbers. |
| q7 | Evaluate `f(x) = -x + 9` at `x = 3`. | `B` | Must name substitution with a negative coefficient/sign. | Must explain replacing `x` with `3`, handling `-x`, and interpreting the output. | Must distinguish sign friction from arithmetic slip. |
| q8 | Infer a linear rule from table `x = 0, 1, 2`; `y = 1, 4, 7`. | `C` | Must name rate/change and starting value from the table. | Must explain the change in `y`, the value when `x = 0`, and checking the rule against the table. | Must distinguish correct rate/wrong intercept from unsupported visible-number matching. |

## 11. Per-item step-by-step requirements matrix for q1-q8

These are step-by-step requirements, not final scripts.

| Item | Item family | Required step sequence focus | Required final check | Maximum length |
|---|---|---|---|---|
| q1 | Function evaluation | Identify input `4`; replace `x`; calculate `2(4)+3`; interpret output. | Check that the selected value is `f(4)`, not `x`. | 4-5 steps |
| q2 | Solve-from-output | Read `f(x)=10`; set equation; isolate `x`; substitute back. | Verify that `3x - 5` gives `10`. | 5-6 steps |
| q3 | Slope from points | Identify two points; calculate change in `y`; calculate change in `x`; divide. | Check that slope uses both changes, not one coordinate. | 4-5 steps |
| q4 | Intercept reading | Read `y = mx + b`; identify constant term; separate slope from intercept. | Check that the intercept is the value added/subtracted, not the coefficient. | 4 steps |
| q5 | Expression matching | Identify desired slope; identify desired intercept; compare options; verify signs. | Check both slope and intercept at the same time. | 4-5 steps |
| q6 | Context modeling | Identify fixed cost; identify cost per hour; connect `h` to hours; build expression. | Test that zero hours still has the fixed cost. | 5-6 steps |
| q7 | Function evaluation with sign | Identify input `3`; replace `x`; handle `-x`; add `9`; interpret output. | Check sign before selecting. | 4-5 steps |
| q8 | Table-to-rule inference | Read table; find repeated change; identify starting value at `x=0`; form rule; verify. | Test the rule with at least one table row. | 5-6 steps |

## 12. Error/distractor interpretation rules

All error interpretation must remain hypothetical.

Allowed phrases:

```text
may suggest
could indicate
conviene revisar
early signal
limited evidence
requires more evidence
```

Future authoring may interpret patterns cautiously:

- selecting a visible number may suggest surface matching;
- selecting the output as input may suggest input/output confusion;
- selecting a slope-like number in an intercept item may suggest role confusion;
- selecting a function with correct numbers in wrong places may suggest expression-role friction;
- reversing fixed and variable values may suggest context-modeling friction;
- selecting correct rate with wrong intercept may suggest partial table-to-rule reading;
- a wrong answer may also be an arithmetic slip and must not be overread.

No single item may decide a route, diagnose a stable weakness, or establish readiness.

## 13. Cautious evidence language rules

Required language posture:

- "This item may suggest..."
- "This pattern could indicate..."
- "This is an early signal..."
- "The evidence is limited..."
- "More evidence is needed..."
- "Conviene revisar..."

Forbidden language posture:

- "the student knows";
- "the student does not know";
- "mastered";
- "ready";
- "not ready";
- "diagnosed";
- "theta";
- "PAES score";
- "adaptive AI";
- "route decided";
- "Sales-Ready".

Capsule 6 may support only limited evidence about simple linear relation interpretation. It cannot close calibration.

## 14. Mobile-readable constraints

Future feedback and step-by-step authoring must be mobile-readable.

Requirements:

- feedback breve should be one compact paragraph or equivalent short block;
- feedback completo should use short sentences and avoid dense algebra exposition;
- step-by-step should use 4-6 short steps maximum;
- each step should fit a small screen without wrapping into a dense paragraph;
- symbols should be readable and not require horizontal scrolling;
- explanations should separate what to calculate from what to interpret;
- repeated language should be consistent across q1-q8 without feeling generic.

The 8-item count increases mobile-load risk. Future authoring should keep each item concise.

## 15. What future final authoring may do

A future explicitly authorized final authoring phase may:

- write final feedback breve per item;
- write final feedback completo per item;
- write final step-by-step scripts per item;
- validate current-source/ficha key candidates before implementation;
- add item-level rationale;
- add distractor-level rationale;
- refine metadata proposals;
- decide whether all 8 items remain appropriate for a compact bridge;
- propose a narrower implementation subset if explicitly authorized;
- prepare implementation-ready content only if the future phase explicitly allows it.

Any final authoring must preserve this contract and the capsule 6 ficha.

## 16. What future final authoring must not do

Future final authoring must not:

- claim functions mastery;
- claim Algebra/functions mastery;
- claim readiness;
- claim PAES score;
- claim theta;
- claim diagnostic certainty;
- claim route certainty;
- claim adaptive AI;
- claim Sales-Ready status;
- imply that capsule 6 validates Geometry/measure;
- imply that capsule 6 fully validates proportionality;
- imply that capsule 6 fully validates data/representation;
- treat q1-q8 correctness as proof that AS1 should dominate the student's path;
- hide AS1 tunnel risk;
- turn feedback into a final route decision.

## 17. Implementation blockers

Implementation remains blocked by:

- no final authored brief feedback;
- no final authored complete feedback;
- no final step-by-step scripts;
- no item-level rationale sufficient for BPCPv1 implementation;
- no distractor-level rationale sufficient for BPCPv1 implementation;
- current answer keys are current-source/ficha key candidates only;
- metadata remains proposal-level;
- item-count risk: source has 8 items and may be broad for a compact early bridge;
- AS1 tunnel risk remains moderate/high because the source is still Algebra/functions;
- capsule 6 cannot validate Geometry/measure;
- capsule 6 only partially connects to proportionality and data/representation;
- no registry implementation is authorized;
- no continuity change is authorized;
- no route-order change is authorized;
- no generated capsule is authorized;
- no API integration is authorized.

## 18. What can proceed next

Can proceed:

- integrate capsule 6 feedback contract into the broader 2-6 feedback-contract chain;
- review the complete 2-6 ficha and feedback-contract set;
- prepare future final feedback authoring only if explicitly authorized;
- prepare a future implementation-readiness review only after final authoring and key/rationale validation.

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-FEEDBACK-CONTRACTS-INTEGRATION-1
```

Purpose:

```text
Integrate the capsule 6 feedback contract with the existing 2-6 feedback-contract set and update the documentation chain without implementing feedback.
```

## 19. What remains blocked

Blocked:

- implementation;
- code changes;
- DB/schema/endpoints;
- content registry changes;
- continuity logic changes;
- route-order changes;
- API calls;
- external API calls;
- generated capsules;
- final authored feedback;
- final complete feedback;
- final step-by-step scripts;
- final implementation keys;
- student-facing claims;
- runtime tests;
- browser tests;
- deploy;
- secret inspection;
- `.env` inspection;
- Sales-Ready claims;
- adaptive AI claims.

## 20. Final verdict

```text
M1_CAPSULE_6_FEEDBACK_CONTRACT_DERIVED_WITH_AUTHORING_AND_IMPLEMENTATION_BLOCKERS
```
