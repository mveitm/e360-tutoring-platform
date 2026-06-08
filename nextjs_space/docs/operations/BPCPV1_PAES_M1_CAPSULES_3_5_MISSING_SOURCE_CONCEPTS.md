# BPCPv1 PAES_M1 — Conceptos fuente faltantes para cápsulas 3 y 5

**Phase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-MISSING-CONCEPTS-1`
**Nature:** Pedagogical/product documentation.
**Scope:** Concept-level source design only. No implementation.

## 1. Executive verdict

```text
M1_CAPSULES_3_5_MISSING_CONCEPTS_DEFINED
```

The missing source concepts for early calibration capsules 3 and 5 are defined as concept-level blueprints:

- Capsule 3: Numbers / percentage / proportionality.
- Capsule 5: Geometry / area / measure.

These are not registry-ready capsules, not generated capsules, not final items, not answer keys, not authored feedback, and not step-by-step implementation. They prepare later source packets, fichas, feedback contracts, and eventual implementation phases.

## 2. Purpose

This document defines the missing source concepts that SOURCE-AUDIT-1 identified before deriving fichas 2-6.

The goal is to make capsules 3 and 5 concrete enough for later source packet and ficha work, while preserving the current phase boundary:

- no registry content;
- no final item writing;
- no answer choices;
- no answer keys;
- no final feedback text;
- no step-by-step final script;
- no content implementation;
- no continuity implementation.

## 3. Source-audit basis

SOURCE-AUDIT-1 concluded:

```text
CURRENT_M1_CONTENT_HAS_GAPS_AGAINST_2_6_CALIBRATION_PLAN
```

Accepted gaps:

- No standalone current Numbers/percentage/proportionality capsule after capsule 1.
- No standalone current Geometry/area/measure capsule after capsule 1.
- Current content partially supports capsule 2 via `paes_m1_linear_equations_basic`.
- Current content supports capsule 4 via `paes_m1_data_representation_entry`, but current route places it late.
- Capsule 6 has partial AS1 bridge candidates, but they risk extending the Algebra tunnel.
- Current continuity is fixed operational sequence v0, not evidence-based/adaptive.
- M1 authored feedback, authored complete feedback, item rationale, item metadata, and authored step-by-step are absent in inspected M1 registry entries.

This document responds only to the two missing concept gaps: capsule 3 and capsule 5.

## 4. Relationship to 2-6 calibration plan

The 2-6 calibration plan defined this orientative early window:

```text
2. Algebra/funciones inicial.
3. Numeros / porcentaje / proporcionalidad.
4. Datos / tabla / grafico.
5. Geometria / area / medida.
6. Puente contextual o validacion temprana.
```

This sequence is pedagogical orientation, not a fixed route, not a registry rule, and not an adaptive selector.

Capsules 3 and 5 are required because capsule 1 only gave one weak signal in Numbers and one weak signal in Geometry. The early window needs standalone second signals in both areas before Bexauri narrows into any Algebra/functions corridor.

## 5. Relationship to BPTT continuous improvement

The BPTT continuous improvement addendum defines improvement as a supervised, governed, versioned process based on evidence of use.

These missing concepts are improvement targets because the current content bank leaves early M1 coverage gaps. Defining them:

- improves coverage balance;
- reduces AS1 tunnel risk;
- prepares future source packets and fichas;
- supports future living capsule bank quality;
- gives future validation and feedback contracts clearer targets.

This does not mean autonomous adaptive AI. It does not authorize generated capsules, API integration, automatic route mutation, or strong claims about student level.

## 6. Design principles for missing concepts

The missing concepts must:

- fit the early M1 calibration window;
- avoid diagnostic, mastery, theta, score, readiness, or Sales-Ready claims;
- not pretend personalization;
- not use adaptive AI language;
- not claim the student's level;
- be suitable for 1-3 closed MVP students;
- be small enough for early capsule flow;
- support later feedback breve, feedback completo, and step-by-step;
- generate interpretable evidence;
- avoid extending the AS1 Algebra tunnel;
- preserve continuity without forcing fixed sequence as pedagogy;
- align with BPCPv1 cautious evidence language;
- support future living bank and improvement logic.

Recommended scale for both missing concepts:

```text
3-4 items per capsule concept for early flow.
Single-answer MC is acceptable for MVP source packet planning.
One optional open reasoning prompt can be reserved for later, not for this phase.
```

## 7. Capsule 3 concept — Numbers / percentage / proportionality

Candidate capsule title:

```text
PAES M1 - Porcentaje y proporcionalidad en contexto
```

Candidate contentKey:

```text
paes_m1_numbers_percentage_proportionality_entry
```

Role in early calibration:

```text
Standalone second Numbers signal after the balanced entry.
```

Axis/family:

```text
Axis: Numeros.
Primary family: N-FAM-02 Porcentaje y variacion porcentual.
Secondary bridge: AF-FAM-02 Proporcionalidad, when the task uses proportional relation.
Skills: resolver_problemas, modelar, representar.
```

Concept summary:

This capsule observes whether the student can coordinate number meaning, proportional relation, and simple calculation in a readable real-life context. It must not merely repeat the first balanced capsule discount item.

## 8. Capsule 3 pedagogical purpose

Capsule 3 should:

- provide a standalone early Numbers signal;
- observe part-whole, base, percent, ratio, or proportional comparison;
- distinguish simple calculation error from proportional reasoning error;
- reveal whether later Algebra/functions errors may be rooted in Numbers prerequisites;
- keep the task short and readable;
- support feedback and step-by-step around quantities, relation, calculation, and reasonableness.

The purpose is not to diagnose Numbers mastery. The purpose is to observe whether the student can coordinate a simple numeric relation in context.

## 9. Capsule 3 non-purpose

Capsule 3 must not:

- diagnose the student as weak or strong in Numbers;
- declare percentage mastery;
- estimate PAES readiness;
- become a long arithmetic drill;
- repeat only a discount problem from capsule 1;
- force a remedial Numbers route;
- infer general arithmetic ability from one capsule;
- use theta, mastery, score, or adaptive AI language.

## 10. Capsule 3 evidence expected

Expected evidence:

- selected response or equivalent item response;
- whether the student identifies the correct base/total/part;
- whether the student chooses a proportional relation rather than a superficial operation;
- whether the result is interpreted in context;
- whether distractor choice suggests base confusion, additive reasoning, inverse operation, decimal/percent conversion, or unit-price confusion;
- self-report after submission;
- later review/feedback use when available.

Inference limits:

- one capsule can suggest a Numbers prerequisite risk;
- one capsule cannot diagnose Numbers level;
- correctness alone cannot prove proportional reasoning;
- wrong answer alone cannot identify the exact misconception without authored distractor rationale and review evidence.

## 11. Capsule 3 candidate item blueprint

This is a blueprint only. It does not define final items, final answer choices, answer keys, or final feedback.

| Blueprint field | Capsule 3 proposal |
|---|---|
| Capsule title candidate | `PAES M1 - Porcentaje y proporcionalidad en contexto` |
| contentKey candidate | `paes_m1_numbers_percentage_proportionality_entry` |
| Role in early calibration | Standalone Numbers signal after capsule 1 and after initial Algebra/functions contact |
| Axis/family | `Numeros`; `N-FAM-02 Porcentaje y variacion porcentual`; bridge to `AF-FAM-02 Proporcionalidad` |
| Item count recommendation | 3-4 items |
| Item type recommendation | Single-answer MC for MVP source packet; no open response in this phase |
| Context type | Short everyday context: percent of a quantity, percentage change, unit price, proportional comparison, or simple ratio equivalence |
| Expected evidence | Base/part/total recognition; proportional relation; calculation choice; reasonableness check; self-report |
| Likely distractor families | Wrong base; additive instead of multiplicative reasoning; percent/decimal conversion; inverse relation; unit mismatch; plausible arithmetic slip |
| Feedback requirements | Explain base quantity, relation, calculation path, reasonableness, and likely misconception cautiously |
| Step-by-step requirements | Read context -> identify quantities -> decide relation -> compute -> interpret -> check if result makes sense |
| Metadata requirements | Axis, family, node, skill tags, role, difficulty band, evidence type, distractor family, inference limits, source status |
| Inference limits | Early signal only; no mastery, diagnosis, score, readiness, or route certainty |
| Prohibited claims | `mastery`, `theta`, `PAES score`, `readiness`, `adaptive AI`, `personalized route certainty`, `diagnostic certainty` |
| Future source packet requirements | Draft final stems, answer choices, answer keys, rationale, feedback breve/completo, step-by-step, metadata, and validation notes |

High-level item sketches, not final items:

- A percent-of-quantity context that is not a discount repetition.
- A percentage increase/decrease context where base quantity matters.
- A unit-price or proportional comparison context.
- A simple ratio/equivalence context with a reasonableness check.

## 12. Capsule 3 feedback and step-by-step implications

Future feedback contract must cover:

- the base quantity;
- the part/whole relation;
- why the chosen operation fits the context;
- why the result is reasonable or unreasonable;
- the difference between additive and proportional reasoning;
- cautious interpretation of common distractors.

Future step-by-step must guide:

```text
1. Read the context.
2. Identify what is the total/base.
3. Identify what percent/ratio/comparison is being asked.
4. Choose the proportional relation.
5. Calculate carefully.
6. Interpret the result in the original context.
7. Check whether the answer is reasonable.
```

No authored feedback or step-by-step is written in this phase.

## 13. Capsule 3 risks and constraints

Risks:

- becoming a repeat of the balanced entry discount item;
- overfocusing on mechanical percent calculation;
- using too much text for early flow;
- treating arithmetic slips as conceptual weakness;
- treating one wrong answer as Numbers diagnosis;
- drifting into Algebra/functions too early through proportionality notation.

Constraints:

- keep contexts short;
- avoid multi-step financial complexity;
- avoid PAES score or readiness language;
- ensure distractors are pedagogically interpretable;
- preserve a foundation-level difficulty band;
- leave final item writing to source packet/ficha phases.

## 14. Capsule 5 concept — Geometry / area / measure

Candidate capsule title:

```text
PAES M1 - Area, perimetro y medida en figuras simples
```

Candidate contentKey:

```text
paes_m1_geometry_area_measure_entry
```

Role in early calibration:

```text
Standalone second Geometry signal after the balanced entry.
```

Axis/family:

```text
Axis: Geometria.
Primary family: G-FAM-01 Figuras planas, perimetro y area.
Secondary bridge: Numeros/representacion when the task requires unit or dimension interpretation.
Skills: resolver_problemas, representar, modelar.
```

Concept summary:

This capsule observes whether the student can connect measure, representation, and geometric reasoning in a simple context. It must not merely repeat the rectangle area item from capsule 1.

## 15. Capsule 5 pedagogical purpose

Capsule 5 should:

- provide a standalone early Geometry signal;
- observe area/perimeter/measure distinction;
- require interpreting dimensions or a simple representation;
- reveal whether errors come from formula choice, magnitude confusion, unit handling, or reading the figure/context;
- give a non-AS1 coverage signal before capsule 6;
- support future feedback and step-by-step around figure, magnitude, relation, calculation, and unit.

The goal is not to diagnose Geometry mastery. The goal is to observe whether the student can connect measure, representation, and geometric reasoning in a simple context.

## 16. Capsule 5 non-purpose

Capsule 5 must not:

- diagnose Geometry level;
- infer spatial ability;
- become a formula memorization quiz;
- repeat only rectangle area from capsule 1;
- jump to advanced geometry;
- force a Geometry route;
- declare mastery, readiness, score, theta, or adaptive personalization;
- use visual complexity that exceeds early calibration.

## 17. Capsule 5 evidence expected

Expected evidence:

- selected response or equivalent item response;
- whether the student identifies the correct magnitude: area, perimeter, length, or measure;
- whether the student selects the relevant dimensions;
- whether the student connects figure/representation with calculation;
- whether distractor choice suggests area-perimeter confusion, formula misuse, unit mismatch, irrelevant dimension use, or arithmetic slip;
- self-report after submission;
- later review/feedback use when available.

Inference limits:

- one capsule can suggest a Geometry/measure concept to observe again;
- one capsule cannot diagnose Geometry mastery or spatial reasoning;
- wrong answer does not automatically mean formula ignorance;
- visual interpretation must be distinguished from calculation error.

## 18. Capsule 5 candidate item blueprint

This is a blueprint only. It does not define final items, final answer choices, answer keys, or final feedback.

| Blueprint field | Capsule 5 proposal |
|---|---|
| Capsule title candidate | `PAES M1 - Area, perimetro y medida en figuras simples` |
| contentKey candidate | `paes_m1_geometry_area_measure_entry` |
| Role in early calibration | Standalone Geometry signal after capsule 1 and before contextual bridge/validation |
| Axis/family | `Geometria`; `G-FAM-01 Figuras planas, perimetro y area`; secondary bridge to measure/representation |
| Item count recommendation | 3-4 items |
| Item type recommendation | Single-answer MC for MVP source packet; diagram/table support may be specified later |
| Context type | Simple visual/spatial or measurement context: area vs perimeter, composite rectangle, unit conversion, formula choice, geometric comparison, interpreting dimensions |
| Expected evidence | Magnitude recognition; dimension selection; formula/relation choice; unit interpretation; self-report |
| Likely distractor families | Area/perimeter confusion; wrong formula; missing side or repeated side; irrelevant dimension; unit mismatch; arithmetic slip |
| Feedback requirements | Explain requested magnitude, relevant dimensions, relation/formula, unit, and likely confusion cautiously |
| Step-by-step requirements | Read question -> identify figure -> identify requested magnitude -> select dimensions -> choose relation -> calculate -> verify unit |
| Metadata requirements | Axis, family, node, skill tags, role, difficulty band, evidence type, distractor family, representation support, inference limits, source status |
| Inference limits | Early signal only; no Geometry mastery, spatial diagnosis, score, readiness, or route certainty |
| Prohibited claims | `mastery`, `theta`, `PAES score`, `readiness`, `adaptive AI`, `personalized route certainty`, `diagnostic certainty` |
| Future source packet requirements | Draft final stems/diagrams, answer choices, answer keys, rationale, feedback breve/completo, step-by-step, metadata, and validation notes |

High-level item sketches, not final items:

- A context that asks for perimeter or area and tests magnitude distinction.
- A composite rectangle or split-shape context with obvious dimensions.
- A simple unit/measure interpretation context.
- A formula-choice context where the figure and question determine the relation.

## 19. Capsule 5 feedback and step-by-step implications

Future feedback contract must cover:

- what magnitude was requested;
- how the figure or context gives the relevant dimensions;
- why area and perimeter are different;
- how the unit should be interpreted;
- which dimension or formula confusion likely occurred;
- why the final result fits the question.

Future step-by-step must guide:

```text
1. Read what the question asks.
2. Identify the figure or representation.
3. Decide whether the magnitude is area, perimeter, length, or another measure.
4. Mark the relevant dimensions.
5. Choose the geometric relation or formula.
6. Calculate.
7. Check the unit and whether the result answers the question.
```

No authored feedback or step-by-step is written in this phase.

## 20. Capsule 5 risks and constraints

Risks:

- repeating the rectangle area signal from capsule 1;
- overloading early flow with complex diagrams;
- making the task a formula-memory quiz;
- confusing visual reading error with Geometry concept error;
- using unit conversion as the only real focus;
- treating one error as Geometry diagnosis.

Constraints:

- keep representation simple;
- avoid advanced geometry;
- avoid dense diagrams;
- preserve early calibration role;
- make distractor families interpretable;
- leave final diagram/item production to later source packet/ficha phases.

## 21. How concepts 3 and 5 reduce AS1 tunnel risk

Capsules 3 and 5 reduce AS1 tunnel risk by adding early non-Algebra signals after capsule 2:

- Capsule 3 checks whether Algebra/functions errors may depend on Numbers, percentage, or proportional reasoning.
- Capsule 5 adds Geometry/measure evidence before capsule 6 chooses a contextual bridge.
- Together with capsule 4, they prevent the early 2-6 window from becoming a continuation of equation/function content.

This supports the BPCPv1 rule:

```text
Bexauri calibrates while teaching across several M1 axes before narrowing into a guided corridor.
```

## 22. Relationship to capsule 2, 4 and 6

Capsule 2:

- `paes_m1_linear_equations_basic` can remain a candidate source base for Algebra/functions initial.
- Capsule 3 should follow as a Numbers/proportionality signal, especially because Algebra errors may hide numeric prerequisite issues.

Capsule 4:

- `paes_m1_data_representation_entry` can remain a candidate source base for Data/table/graph.
- It should be considered in early order rather than late after an AS1 endpoint.

Capsule 6:

- Current AS1 bridge candidates may be useful only after capsules 3-5 establish non-AS1 coverage.
- Capsule 6 should not simply extend the Algebra tunnel.
- Candidate bridge choice should wait for source packets and route/order reconciliation.

## 23. What remains blocked

Blocked:

- final registry content;
- final item stems;
- final answer choices;
- answer keys;
- authored feedback;
- authored complete feedback;
- authored step-by-step;
- generated capsules;
- API integration;
- content registry changes;
- continuity logic changes;
- automatic route mutation;
- runtime tests;
- browser tests;
- DB/schema changes;
- UI changes;
- adaptive AI claims;
- mastery, theta, PAES score, diagnostic certainty, readiness, or Sales-Ready claims.

## 24. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-SOURCE-PACKETS-1
```

Purpose:

```text
Derive source packets for capsule 2 existing candidate, capsule 3 missing Numbers concept, capsule 4 existing data representation candidate, capsule 5 missing Geometry concept, and capsule 6 candidate bridge options.
```

Alternative if uncertainty remains:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-PRO-REVIEW-1
```

Purpose:

```text
Ask PRO to review the missing source concepts before source packets and fichas.
```

## 25. Final verdict

```text
M1_CAPSULES_3_5_MISSING_CONCEPTS_DEFINED
```
