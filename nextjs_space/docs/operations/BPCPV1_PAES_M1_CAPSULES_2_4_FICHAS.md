# BPCPv1 PAES_M1 - Fichas de capsulas 2 y 4

**Phase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-4-FICHAS-1`
**Nature:** BPCPv1 ficha derivation from current live source.
**Scope:** Documentation only. No implementation.

## 1. Executive verdict

```text
M1_CAPSULES_2_4_FICHAS_DERIVED_WITH_FEEDBACK_BLOCKERS
```

The BPCPv1 fichas for PAES_M1 capsule 2 and capsule 4 can be derived from current live source.

However, they remain blocked before implementation because final authored feedback, full feedback, step-by-step contracts, item-level rationale, final implementation keys, registry implementation, and continuity changes are not available or authorized in this phase.

Capsule 2 can serve as the early Algebra/functions signal after the balanced entry. Capsule 4 can serve as the early Data/table/graph signal, but the current operational continuity places it late after the AS1 corridor. This phase documents the pedagogical ficha role; it does not change continuity.

## 2. Purpose

This document derives BPCPv1 fichas for:

```text
Capsule 2: paes_m1_linear_equations_basic
Capsule 4: paes_m1_data_representation_entry
```

The purpose is to make the current-source capsules pedagogically legible before future feedback contracts, step-by-step contracts, registry implementation, or continuity reconciliation.

This document does not modify source content, registry, UI, DB, schema, runtime flows, or continuity logic.

## 3. Governance basis

This ficha derivation is governed by:

```text
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_CALIBRATION_PLAN.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_SOURCE_PACKETS.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULES_2_6_PRO_REVIEW_1.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md
nextjs_space/docs/operations/BPTT_CONTINUOUS_IMPROVEMENT_ADDENDUM.md
```

Required constraints:

- no diagnosis;
- no mastery claim;
- no theta claim;
- no PAES score claim;
- no readiness claim;
- no adaptive AI claim;
- no Sales-Ready claim;
- no registry implementation;
- no continuity change;
- no final authored feedback;
- no final step-by-step script.

## 4. Relationship to current live source

Capsules 2 and 4 are current live source entries in:

```text
nextjs_space/lib/study-load-content.ts
```

Continuity context was inspected in:

```text
nextjs_space/lib/study-load-continuity.ts
nextjs_space/lib/study-load-pedagogical-decision.ts
```

Current source provides:

- contentKey;
- contentVersion;
- title;
- topic;
- instructions;
- MC items;
- answer options;
- current answer keys;
- provisional pedagogical metadata.

Current source does not provide:

- authored M1 item feedback;
- authored M1 complete feedback;
- authored M1 step-by-step help;
- item-level rationale;
- distractor-level rationale;
- final BPCPv1 metadata;
- final implementation keys authorized by this phase.

## 5. Relationship to capsules 3 and 5 fichas

Capsules 3 and 5 now have BPCPv1 fichas in:

```text
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md
```

This document completes the current 2-5 ficha set at the documentation level:

| Capsule | Role | Source status | Ficha status |
|---|---|---|---|
| 2 | Algebra/functions initial | Current live source | Derived here |
| 3 | Numbers/percentage/proportionality | Revised source-authoring candidate | Already derived |
| 4 | Data/table/graph | Current live source | Derived here |
| 5 | Geometry/area/measure | Revised source-authoring candidate | Already derived |

Together, capsules 2-5 support the intended multiaxis early calibration window. They still do not authorize implementation or strong student claims.

## 6. Shared ficha constraints

These fichas are documentation artifacts.

They may be used later to derive feedback contracts, step-by-step contracts, implementation tickets, or continuity decisions, but they do not execute those phases.

Current answer keys are treated as source/ficha candidates only. They are not final implementation keys authorized by this phase.

Prohibited claims:

- "The student has mastered Algebra."
- "The student has mastered Data/Probability."
- "The student is ready for PAES."
- "The student has a PAES score estimate."
- "The student has a theta estimate."
- "The route is adaptive AI."
- "This response determines the student's route by itself."

## 7. Ficha capsule 2 - identity

| Field | Value |
|---|---|
| Capsule | 2 |
| contentKey | `paes_m1_linear_equations_basic` |
| contentVersion | `v1` |
| Title | `PAES M1 - Ecuaciones lineales basicas` |
| Role in 2-6 window | Capsule 2 Algebra/funciones inicial after balanced entry |
| Source type | Current live source |
| Source file | `nextjs_space/lib/study-load-content.ts` |
| Program | `PAES_M1` |
| Topic | `Ecuaciones lineales` |
| Axis/family | Algebra/functions |
| Current metadata axis | `algebra_functions` |
| Current slice | `AS1` |
| Current slice name | `AS1 algebra/functions - initial corridor` |
| Item count | 4 MC items |
| Current estimated time | 20-30 minutes |
| Evidence type | `mc_submission` |
| Current review status | `internal_provisional` |
| Expert reviewed | `false` |

## 8. Ficha capsule 2 - pedagogical purpose

Observe whether the student can solve basic one-step and simple two-step linear equations, showing an initial signal about equation mechanics after the balanced entry.

The capsule should function as first structured Algebra/functions contact, not as an AS1 tunnel trigger.

It can help observe:

- use of inverse operations;
- isolation of an unknown;
- basic multiplication/division equation mechanics;
- handling of a simple two-step equation;
- whether errors may come from arithmetic, equation structure, sign/order, or attention.

## 9. Ficha capsule 2 - non-purpose

This capsule is not:

- a diagnosis of Algebra mastery;
- proof of equation fluency;
- a PAES score/readiness signal;
- adaptive AI;
- a route decision by itself;
- a claim that AS1 should dominate the early M1 route;
- a complete Algebra/functions coverage unit.

## 10. Ficha capsule 2 - source items summary

Current-source item summaries:

| Item | Current source stem summary | Current options summary | Current-source/ficha key candidate |
|---|---|---|---|
| q1 | Solve `x + 5 = 12`. | Numeric options `5`, `7`, `12`, `17`. | `B` |
| q2 | Solve `3x = 21`. | Numeric options `3`, `7`, `18`, `24`. | `B` |
| q3 | Solve `2x - 4 = 10`. | Numeric options `3`, `5`, `7`, `14`. | `C` |
| q4 | Solve `x/3 = 9`. | Numeric options `3`, `12`, `27`, `6`. | `C` |

These keys are current-source/ficha candidates only. This phase does not approve final implementation keys.

No item wording normalization is introduced here.

## 11. Ficha capsule 2 - evidence expected

Expected evidence:

- selected option per item;
- correctness against current source key candidate;
- item-level pattern across one-step addition, multiplication, two-step equation, and division equation;
- self-report after the capsule, if the runtime collects it;
- possible mismatch between performance and self-report.

Evidence interpretation should remain cautious.

The capsule may suggest:

- whether the student can apply inverse operations in simple equation forms;
- whether the student confuses solving with substituting visible numbers;
- whether arithmetic errors may interfere with equation mechanics;
- whether a two-step equation is notably harder than one-step equations.

The capsule cannot establish Algebra mastery, route readiness, or stable AS1 fluency.

## 12. Ficha capsule 2 - likely error/distractor families

Likely error families:

- inverse operation not applied;
- visible-number selection;
- operation-order confusion;
- arithmetic slip;
- solving only one part of a two-step equation;
- treating division equation as addition/subtraction;
- answer selected without verification.

Likely distractor signals:

- choosing the constant or right-side value may suggest visible-number anchoring;
- choosing result from one partial operation may suggest incomplete equation solving;
- choosing a nearby arithmetic result may suggest calculation slip;
- choosing a value that does not satisfy substitution may suggest lack of verification.

These are hypotheses only. More evidence is needed before stronger claims.

## 13. Ficha capsule 2 - feedback implications

Future feedback breve should:

- name the equation focus;
- indicate whether the selected answer satisfies the equation;
- invite checking by substituting the answer;
- avoid labels such as "you know Algebra" or "you do not know Algebra."

Future feedback completo should:

- show the inverse operation or balancing logic;
- explain why the correct option satisfies the equation;
- explain why common wrong options fail;
- distinguish arithmetic slip from equation-structure confusion when possible;
- keep inference language cautious.

This phase does not write final feedback.

## 14. Ficha capsule 2 - step-by-step implications

Future step-by-step help should support:

1. Read the equation.
2. Identify what operation affects `x`.
3. Apply the inverse operation while preserving equality.
4. Continue until `x` is isolated.
5. Substitute the candidate value to verify.

For the two-step item, the help should explicitly separate:

- undo addition/subtraction first;
- then undo multiplication/division.

This phase does not write final step-by-step scripts.

## 15. Ficha capsule 2 - metadata proposal

Proposed BPCPv1 metadata for later implementation planning:

| Field | Proposal |
|---|---|
| primary axis | Algebra/functions |
| secondary axis | Numbers/arithmetic as support signal |
| official skill family | Resolver problemas; representar symbolically; basic modeling only if later contextualized |
| capsule type | Early focused calibration/practice |
| item type | Multiple choice |
| item count | 4 |
| evidence type | `mc_submission` plus self-report if available |
| difficulty | Entry/basic |
| review status | Requires PRO/implementation review before registry claim |
| feedback status | Blocked pending authored feedback contract |
| step-by-step status | Blocked pending authored step-by-step contract |
| continuity status | Must not decide route by itself |

## 16. Ficha capsule 2 - inference limits

Allowed cautious language:

```text
The response may suggest an early equation-mechanics signal.
The selected option may indicate a possible operation or verification issue.
More evidence is needed before deciding a stronger route.
```

Not allowed:

```text
The student masters equations.
The student is weak in Algebra.
The student is ready for PAES.
The student should enter a personalized AS1 route.
The system adapted intelligently.
```

## 17. Ficha capsule 2 - blockers before implementation

Blockers:

- no authored feedback;
- no authored complete feedback;
- no final step-by-step script;
- no item-level rationale sufficient for BPCPv1 inference;
- no distractor-level rationale in current source;
- no final implementation keys authorized by this phase;
- no registry implementation authorized;
- no continuity decision authorized;
- metadata remains internal/provisional.

## 18. Ficha capsule 4 - identity

| Field | Value |
|---|---|
| Capsule | 4 |
| contentKey | `paes_m1_data_representation_entry` |
| contentVersion | `v1` |
| Title | `PAES M1 - Lectura de tablas y graficos` |
| Role in 2-6 window | Capsule 4 Data/table/graph signal in the early calibration window |
| Source type | Current live source |
| Source file | `nextjs_space/lib/study-load-content.ts` |
| Program | `PAES_M1` |
| Topic | `Lectura de tablas y graficos` |
| Axis/family | Data/probability; representation of data |
| Current metadata axis | `data_probability` |
| Current slice | `PE1` |
| Current slice name | `PE1 data and probability entry` |
| Item count | 8 MC items |
| Current estimated time | 10-15 minutes |
| Evidence type | `mc_submission` |
| Current review status | `internal_provisional` |
| Expert reviewed | `false` |

## 19. Ficha capsule 4 - pedagogical purpose

Observe whether the student can read simple tables/graphs, identify values, compare data, and interpret basic representations in context.

The capsule should provide a distinct non-AS1 signal in the early calibration window and reduce overreliance on Algebra/functions as the only early evidence stream.

It can help observe:

- direct table lookup;
- comparison between table values;
- maximum/minimum recognition;
- trend interpretation;
- simple total or average calculation;
- supported conclusion from represented data;
- same-frequency recognition.

## 20. Ficha capsule 4 - non-purpose

This capsule is not:

- a diagnosis of Data/Probability mastery;
- proof of representation fluency;
- a PAES score/readiness signal;
- adaptive AI;
- a route decision by itself;
- a full statistics/probability unit;
- a general reading-comprehension diagnosis.

## 21. Ficha capsule 4 - source items summary

Current-source item summaries:

| Item | Current source stem summary | Current options summary | Current-source/ficha key candidate |
|---|---|---|---|
| q1 | Read table of books by course; identify books read by 2nd grade. | Values from listed courses. | `D` |
| q2 | Compare workshop attendance; compute how many more chose Ciencias than Musica. | Difference and distractor totals. | `B` |
| q3 | Identify day with highest sales from a daily table. | Weekday labels. | `C` |
| q4 | Interpret trend in library visits across months. | Increasing/decreasing/same/mixed trend options. | `A` |
| q5 | Sum snack quantities from a table. | Plausible totals. | `C` |
| q6 | Compute average of three temperatures. | Temperature values. | `B` |
| q7 | Select conclusion supported by activity preference data. | Supported and unsupported interpretations. | `B` |
| q8 | Identify two colors with the same frequency. | Color-pair options. | `A` |

These keys are current-source/ficha candidates only. This phase does not approve final implementation keys.

No item wording normalization is introduced here.

## 22. Ficha capsule 4 - evidence expected

Expected evidence:

- selected option per item;
- correctness against current source key candidate;
- pattern across lookup, comparison, maximum, trend, total, average, conclusion, and same-frequency tasks;
- self-report after the capsule, if the runtime collects it;
- possible mismatch between performance and self-report.

The capsule may suggest:

- whether the student can locate relevant data in a representation;
- whether the student distinguishes direct lookup from calculation;
- whether the student can compare values rather than only read one value;
- whether simple average/total tasks create friction;
- whether conclusions are supported by the displayed data.

It cannot establish broad Data/Probability mastery or representation fluency.

## 23. Ficha capsule 4 - likely error/distractor families

Likely error families:

- row/column or label lookup error;
- choosing adjacent or visible value;
- confusing difference with total;
- missing maximum/minimum comparison;
- trend misread;
- summing error;
- average as sum or as one endpoint value;
- unsupported conclusion from represented data;
- same-frequency recognition error.

Likely distractor signals:

- selecting a total where a difference was asked may suggest operation-selection issue;
- selecting a visible value from the wrong label may suggest representation lookup issue;
- selecting an unsupported conclusion may suggest inference beyond data;
- selecting an endpoint as average may suggest average-concept weakness.

These are hypotheses only. More evidence is needed before stronger claims.

## 24. Ficha capsule 4 - feedback implications

Future feedback breve should:

- name the representation task;
- point to the table/graph detail needed;
- distinguish direct reading from calculation or interpretation;
- avoid diagnosis or score language.

Future feedback completo should:

- show where the relevant data appears;
- explain the comparison, total, average, or trend;
- explain why unsupported interpretations do not follow from the table;
- connect the task to data-reading habits;
- use cautious language around error interpretation.

This phase does not write final feedback.

## 25. Ficha capsule 4 - step-by-step implications

Future step-by-step help should support:

1. Read the question and identify what is being asked.
2. Locate the relevant row, column, label, or month.
3. Decide whether the task asks for lookup, comparison, sum, average, trend, or conclusion.
4. Perform the minimal calculation or interpretation.
5. Check that the selected answer directly answers the question.

For conclusion items, help should explicitly separate:

- what the data supports;
- what the data does not show.

This phase does not write final step-by-step scripts.

## 26. Ficha capsule 4 - metadata proposal

Proposed BPCPv1 metadata for later implementation planning:

| Field | Proposal |
|---|---|
| primary axis | Data/probability |
| secondary axis | Representation and arithmetic support |
| official skill family | Interpret representations; read tables and graphs; resolver problemas |
| capsule type | Early focused calibration/bridge |
| item type | Multiple choice |
| item count | 8 |
| evidence type | `mc_submission` plus self-report if available |
| difficulty | Entry/basic |
| review status | Requires PRO/implementation review before registry claim |
| feedback status | Blocked pending authored feedback contract |
| step-by-step status | Blocked pending authored step-by-step contract |
| continuity status | Current route-order risk remains unresolved |

## 27. Ficha capsule 4 - inference limits

Allowed cautious language:

```text
The response may suggest an early data-representation signal.
The selected option may indicate lookup, comparison, calculation, or interpretation friction.
More evidence is needed before deciding a stronger route.
```

Not allowed:

```text
The student masters Data/Probability.
The student has strong/weak representation fluency.
The student is ready for PAES.
The system selected a personalized route.
The system is adaptive AI.
```

## 28. Ficha capsule 4 - route-order note

Current operational continuity places this source late:

```text
paes_m1_balanced_entry_initial
-> paes_m1_linear_equations_basic
-> paes_m1_linear_equations_word_problems
-> paes_m1_linear_equations_reinforcement
-> paes_m1_linear_functions_basic
-> paes_m1_data_representation_entry
```

Pedagogically, the 2-6 calibration plan places Data/table/graph earlier as capsule 4.

This phase does not change continuity. It documents that the route-order risk remains unresolved and must be handled in a later continuity or implementation phase.

## 29. Ficha capsule 4 - blockers before implementation

Blockers:

- no authored feedback;
- no authored complete feedback;
- no final step-by-step script;
- no item-level rationale sufficient for BPCPv1 inference;
- no distractor-level rationale in current source;
- no final implementation keys authorized by this phase;
- no registry implementation authorized;
- no continuity decision authorized;
- current route-order risk remains unresolved;
- metadata remains internal/provisional.

## 30. Cross-capsule role in 2-6 window

Fichas 2 and 4 complement the already derived fichas 3 and 5:

| Capsule | Role | Contribution |
|---|---|---|
| 2 | Algebra/functions initial | Establishes equation-mechanics signal after balanced entry |
| 3 | Numbers/proportionality | Adds standalone Numbers/proportionality signal |
| 4 | Data/table/graph | Adds representation/data signal and reduces AS1 tunnel risk |
| 5 | Geometry/measure | Adds standalone Geometry/measure signal |
| 6 | Contextual bridge | Still deferred pending 2-5 review and bridge decision |

The 2-5 set supports broad early calibration while teaching. It does not create readiness, diagnosis, mastery, or route certainty.

## 31. What can proceed next

Can proceed:

- feedback breve/completo and step-by-step contract derivation for capsules 2-6, with capsule 6 deferred/candidate-based if needed;
- review of the complete 2-5 ficha set before capsule 6 bridge decision;
- later implementation planning only after explicit authorization and after blockers are resolved.

## 32. What remains blocked

Blocked:

- registry implementation;
- content registry changes;
- continuity logic changes;
- route-order changes;
- generated capsules;
- API integration;
- final authored feedback;
- final complete feedback;
- final step-by-step scripts;
- final implementation keys;
- item-level rationale in registry;
- runtime tests;
- deploy;
- Sales-Ready claim;
- adaptive AI claim;
- mastery, theta, PAES score, readiness, or diagnosis claims.

## 33. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-FEEDBACK-CONTRACTS-1
```

Purpose:

```text
Derive feedback breve/completo and step-by-step contracts for capsules 2-6 after fichas 2-5 are available and capsule 6 remains deferred.
```

Later recommended phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-6-BRIDGE-DECISION-1
```

Purpose:

```text
Decide capsule 6 bridge role after reviewing the complete 2-5 ficha set.
```

Do not execute those phases here.

## 34. Final verdict

```text
M1_CAPSULES_2_4_FICHAS_DERIVED_WITH_FEEDBACK_BLOCKERS
```
