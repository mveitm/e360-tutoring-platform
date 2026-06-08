# MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-SOURCE-AUDIT-1

Source-grounded audit of current M1 registry/source contents against the BPCPv1-PAES-M1 capsules 2-6 calibration plan.

## 1. Executive verdict

```text
CURRENT_M1_CONTENT_HAS_GAPS_AGAINST_2_6_CALIBRATION_PLAN
```

The current M1 content partially supports the 2-6 plan, but it does not cleanly cover the planned early calibration window.

The live sources contain:

- a balanced first capsule with one item each for Numbers, Algebra/functions, Geometry, and Probability;
- a strong AS1 Algebra/functions corridor;
- one PE1 data/table/graph capsule;
- no standalone current Numbers/percentage/proportionality capsule after capsule 1;
- no standalone current Geometry/area/measure capsule after capsule 1;
- no authored M1 feedback or authored step-by-step help in the inspected M1 registry entries;
- a fixed contentKey continuity map, not adaptive or evidence-based continuity.

The plan governs this audit. The current AS1-heavy route must not be forced to fit capsules 2-6. Before deriving fichas 2-6, Bexauri should create source packets for candidate current contents and redesign missing capsule concepts for Numbers and Geometry.

## 2. Source access

### Pedagogical documents read

- `PHASE_LOG.md` tail
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
- `nextjs_space/docs/operations/BPTT_ROADMAP_AND_LIVING_MICROROADMAP_TRANSVERSAL_CONTRACT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_EARLY_SEQUENCING_STRATEGY.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_FIRST_BALANCED_CAPSULE_FICHA.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_FEEDBACK_1A_FIRST_BALANCED_CAPSULE_SOURCE_PACKET.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_FIRST_BALANCED_CAPSULE_FEEDBACK_CONTRACT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_CALIBRATION_PLAN.md`

### Audit/review documents read

- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_AUDIT_1A_SOURCE_GROUNDED_CURRENT_CAPSULES_AGAINST_BPCPV1_PAES_M1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_AUDIT_1B_PRO_PEDAGOGICAL_REVIEW_OF_1A.md`

### Official/taxonomy sources read

- `nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`

### Live content files inspected

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/paes-m1-first-capsule.ts`

### Helpers inspected

- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-pedagogical-decision.ts`

### Source discovery command

```text
rg -n "paes_m1|PAES M1|contentKey|contentVersion|balanced_entry|linear_equations|linear_functions|data_representation|word_problems|reinforcement" nextjs_space
```

### Sources not available or not used

- No DB rows or real student history were inspected.
- No runtime tests were executed.
- No browser flow was executed.
- No external expert validation of items was available.
- No registry or continuity code was modified.

### Audit limits

This is a documentation/read-only source audit. It maps current repo content against the plan 2-6 without redesigning content, authoring feedback, implementing step-by-step help, changing registry, changing continuity, or declaring readiness.

## 3. Current M1 content inventory

| title | contentKey | contentVersion | source file | item count | answer keys | authored feedback | step-by-step | metadata | notes |
| ----- | ---------- | -------------- | ----------- | ---------: | ----------- | ----------------- | ------------ | -------- | ----- |
| PAES M1 - Entrada balanceada inicial | `paes_m1_balanced_entry_initial` | `v1` | `nextjs_space/lib/study-load-content.ts`; `nextjs_space/lib/paes-m1-first-capsule.ts` | 4 | Present for all items | Absent in M1 source | Absent as authored help; only instructions tell student to work step by step | Capsule-level metadata present: `BALANCED_ENTRY`, `balanced_entry`, `primaryPurpose: diagnose`, `expertReviewed: false` | Current BPCPv1 docs reclassify it pedagogically as initial balanced signal, not diagnostic placement. |
| PAES M1 - Ecuaciones lineales basicas | `paes_m1_linear_equations_basic` | `v1` | `nextjs_space/lib/study-load-content.ts` | 4 | Present for all items | Absent | Absent as authored help; instructions only | Capsule-level AS1 metadata present, `primaryPurpose: practice`, `expertReviewed: false` | Candidate for capsule 2. Strongest direct match to Algebra/functions initial role. |
| PAES M1 - Problemas con ecuaciones lineales | `paes_m1_linear_equations_word_problems` | `v1` | `nextjs_space/lib/study-load-content.ts` | 4 | Present for all items | Absent | Absent as authored help; instructions only | Capsule-level AS1 metadata present, `primaryPurpose: bridge`, `expertReviewed: false` | Candidate for contextual bridge, but still equation-heavy and currently placed before non-algebra coverage. |
| PAES M1 - Refuerzo de ecuaciones lineales | `paes_m1_linear_equations_reinforcement` | `v1` | `nextjs_space/lib/study-load-content.ts` | 4 | Present for all items | Absent | Absent as authored help; instructions only | Capsule-level AS1 metadata present, `primaryPurpose: reinforce`, `expertReviewed: false` | Risk of AS1 tunnel if used inside 2-6 before Numbers/Data/Geometry coverage. |
| PAES M1 - Funciones lineales basicas | `paes_m1_linear_functions_basic` | `v1` | `nextjs_space/lib/study-load-content.ts` | 8 | Present for all items | Absent | Absent as authored help; instructions only | Capsule-level AS1 metadata present, `primaryPurpose: bridge`, `expertReviewed: false` | Candidate for capsule 6 only if used as bridge/validation; too much AS1 if placed before missing ejes. |
| PAES M1 - Lectura de tablas y graficos | `paes_m1_data_representation_entry` | `v1` | `nextjs_space/lib/study-load-content.ts` | 8 | Present for all items | Absent | Absent as authored help; instructions only | Capsule-level PE1 metadata present, `axis: data_probability`, `primaryPurpose: bridge`, `expertReviewed: false` | Direct match for capsule 4 role, but current fixed route places it after AS1 endpoint. |

## 4. Current route / continuity source

### Source file

```text
nextjs_space/lib/study-load-continuity.ts
```

### Current mapping found

```text
paes_m1_balanced_entry_initial
-> paes_m1_linear_equations_basic
-> paes_m1_linear_equations_word_problems
-> paes_m1_linear_equations_reinforcement
-> paes_m1_linear_functions_basic
-> paes_m1_data_representation_entry
```

### Classification

```text
fixed sequence / operational sequence v0
```

The helper comment explicitly calls the PE1 step a "Rule-based bridge v0" and says it is not adaptive AI and makes no score/theta/mastery or diagnosis claim.

### Evidence usage

The current mapping does not use:

- item correctness pattern;
- selected distractors;
- authored error signals;
- self-report;
- review behavior;
- coverage balance;
- monotony risk;
- prerequisite risk.

`nextjs_space/lib/study-load-pedagogical-decision.ts` describes the decision source as `existing_rule_based_continuity`, confidence `operational_rule`, and limitation `does_not_change_existing_continuity_selection`.

### Risks against BPCPv1

- It can overrepresent Algebra/functions in capsules 2-5 if treated as pedagogical sequence.
- It delays Data/table/graph until after four AS1 steps.
- It has no standalone Numbers or Geometry capsule after balanced entry.
- It cannot support adaptive, personalized, mastery, PAES-score, or readiness claims.
- It should not be called a living microroadmap.

## 5. Mapping current content against 2-6 plan

| Planned capsule | Planned pedagogical role | Current matching content | Match status | Evidence | Gap | Risk | Recommendation |
| --------------- | ------------------------ | ------------------------ | ------------ | -------- | --- | ---- | -------------- |
| 2 | Algebra/funciones inicial: basic linear equations or initial algebraic language | `paes_m1_linear_equations_basic` | MATCH | 4 MC linear equation items; AS1 metadata; answer keys present | No authored feedback, step-by-step, item metadata, or error taxonomy | If followed by more AS1 without coverage, starts AS1 tunnel | Use as candidate base only after source packet/ficha/feedback design. |
| 3 | Numbers / percentage / proportionality | No standalone post-capsule-1 content found | NO_MATCH | Balanced entry q1 covers percentage only as one initial item | Missing current standalone Numbers capsule | Algebra errors may be misread as algebra instead of Numbers prerequisite | Redesign missing capsule concept before fichas. |
| 4 | Data / table / graph | `paes_m1_data_representation_entry` | MATCH | 8 MC items on tables/graphs, PE1 metadata, answer keys | Current route places it after AS1 endpoint, not as capsule 4 | If left in current order, early calibration stays algebra-heavy | Use as candidate current base, but reconcile route order before fichas. |
| 5 | Geometry / area / measure | No standalone post-capsule-1 content found | NO_MATCH | Balanced entry q3 covers rectangle area only as one initial item | Missing current standalone Geometry capsule | Geometry remains a one-item signal, not early calibration coverage | Redesign missing capsule concept before fichas. |
| 6 | Contextual bridge or early validation | `paes_m1_linear_equations_word_problems` or `paes_m1_linear_functions_basic` | PARTIAL_MATCH | Word problems bridge has 4 equation/context items; functions has 8 linear function/modeling items | Both are AS1-heavy and currently appear before missing Numbers/Geometry/Data coverage | Could become AS1 continuation, not integrative validation | Choose after resolving capsules 3-5; likely derive source packet(s) first. |

## 6. Capsule 2 audit - Algebra/funciones inicial

Current fit:

```text
PARTIAL_MATCH leaning MATCH for source content.
```

`paes_m1_linear_equations_basic` can serve as a candidate base for capsule 2 because its title, topic, items, AS1 metadata, and answer keys match the plan's "Ecuaciones lineales basicas o lenguaje algebraico inicial" role.

- Foco: basic linear equation solving.
- Item count: 4.
- Evidence: MC selected answer plus correctness through answer keys.
- Feedback availability: correctness-only through generic feedback builder; no authored M1 feedback found.
- Step-by-step availability: not authored in source; only instructions ask the student to solve step by step.
- Error signals: only inferable from stems/options; no item-level error taxonomy.
- Fit as calibration, not diagnosis: acceptable only if framed as one early Algebra signal and followed by non-algebra coverage.
- Risk of AS1 tunnel: high if the current fixed sequence is used as-is for capsules 2-6.

Recommendation: derive a source packet and ficha for `paes_m1_linear_equations_basic`; do not treat the entire current AS1 chain as the 2-6 plan.

## 7. Capsule 3 audit - Numbers / percentage / proportionality

Current fit:

```text
NO_MATCH
```

No current standalone post-capsule-1 M1 content was found for percentage, proportionality, rationality, or Numbers prerequisites.

Current source only covers Numbers inside capsule 1:

- balanced entry q1: 20% discount from $15.000;
- answer key present;
- no authored rationale, feedback, step-by-step, or item-level metadata in source.

This is not sufficient for the planned capsule 3 role. The plan asks for a capsule that observes percentage/proportionality/rationality in context after the first Algebra signal. Current content leaves a gap.

Recommendation: redesign or author a missing Numbers capsule concept before deriving ficha 3. Do not use the single balanced-entry percentage item as a standalone capsule 3 source.

## 8. Capsule 4 audit - Data / table / graph

Current fit:

```text
MATCH with route-order risk
```

`paes_m1_data_representation_entry` directly covers the planned data/table/graph role:

- Foco: lectura de tablas y graficos simples.
- Item count: 8.
- Evidence: MC selected answer plus answer keys.
- Metadata: PE1 data/probability entry; table/graph reading roadmap nodes.
- Feedback: no authored M1 feedback found.
- Step-by-step: no authored help found.

Distinction from probability:

- The first balanced capsule includes a probability-simple item, not table/graph reading.
- The plan prefers data/table/graph for capsule 4.
- The current `paes_m1_data_representation_entry` is a better fit than the probability item for capsule 4.

Main issue: the current continuity helper places this content after four AS1 steps, not as the fourth early calibration capsule.

Recommendation: use this as a candidate source base for capsule 4, but reconcile current route/order before deriving fichas.

## 9. Capsule 5 audit - Geometry / area / measure

Current fit:

```text
NO_MATCH
```

No current standalone post-capsule-1 Geometry content was found for area, perimeter, measure, or simple plane figures.

Current source only covers Geometry inside capsule 1:

- balanced entry q3: rectangle area with dimensions 8m by 5m;
- answer key present;
- no authored rationale, feedback, step-by-step, or item-level metadata in source.

This is not sufficient for the planned capsule 5 role. The plan asks for a second early Geometry signal after the initial microcontact.

Recommendation: redesign or author a missing Geometry capsule concept before deriving ficha 5.

## 10. Capsule 6 audit - Contextual bridge / early validation

Current fit:

```text
PARTIAL_MATCH
```

Two current AS1 contents could partially support capsule 6:

- `paes_m1_linear_equations_word_problems`: 4 items involving equation solving and problem-like structures; metadata `primaryPurpose: bridge`.
- `paes_m1_linear_functions_basic`: 8 items involving function evaluation, slope/intercept, context-to-function and table-to-rule; metadata `primaryPurpose: bridge`.

Both can function as Algebra/functions contextual bridge candidates. However, if used before standalone Numbers and Geometry coverage, they reinforce AS1 tunnel instead of validating a multieje calibration window.

Recommendation: defer final capsule 6 choice until missing capsule 3 and 5 concepts are redesigned and capsule 4 order is reconciled. Then derive source packets for the candidate bridge content.

## 11. Feedback and step-by-step readiness

| Possible match | Authored feedback present | Authored complete feedback present | Correctness-only only | Item-level rationale present | Step-by-step present | Needs PRO feedback design |
|---|---|---|---|---|---|---|
| `paes_m1_linear_equations_basic` for capsule 2 | Absent | Absent | Yes | Absent | Absent as authored help | Yes |
| Missing Numbers capsule for capsule 3 | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Yes, after concept/source exists |
| `paes_m1_data_representation_entry` for capsule 4 | Absent | Absent | Yes | Absent | Absent as authored help | Yes |
| Missing Geometry capsule for capsule 5 | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Yes, after concept/source exists |
| `paes_m1_linear_equations_word_problems` for capsule 6 | Absent | Absent | Yes | Absent | Absent as authored help | Yes |
| `paes_m1_linear_functions_basic` for capsule 6 | Absent | Absent | Yes | Absent | Absent as authored help | Yes |

The first balanced capsule has a documented feedback/step-by-step contract, but that contract is not implemented in the content registry. No current M1 content inspected has authored feedback in source.

## 12. Alignment verdict by content

| Current M1 content | Alignment verdict | Rationale |
|---|---|---|
| `paes_m1_balanced_entry_initial` | `PARTIAL_SUPPORT_REQUIRES_REDESIGN` | Supports capsule 1 and provides weak one-item signals for Numbers, Geometry, and Probability; cannot stand in for capsules 3 or 5. |
| `paes_m1_linear_equations_basic` | `CAN_SUPPORT_PLANNED_CAPSULE_WITH_FICHA_AND_FEEDBACK` | Candidate base for capsule 2, but needs source packet, ficha, authored feedback, step-by-step and error taxonomy. |
| `paes_m1_linear_equations_word_problems` | `PARTIAL_SUPPORT_REQUIRES_REDESIGN` | Candidate bridge for capsule 6, but too AS1-local if used before missing multieje coverage. |
| `paes_m1_linear_equations_reinforcement` | `NOT_FIT_FOR_THIS_PLANNED_ROLE` | Reinforcement content does not match the preferred 2-6 calibration roles unless a later evidence-based need appears. |
| `paes_m1_linear_functions_basic` | `PARTIAL_SUPPORT_REQUIRES_REDESIGN` | Candidate bridge/validation for capsule 6, but 8-item AS1 content needs focus and extension review. |
| `paes_m1_data_representation_entry` | `CAN_SUPPORT_PLANNED_CAPSULE_WITH_FICHA_AND_FEEDBACK` | Candidate base for capsule 4, but current route order and missing authored feedback/step-by-step must be addressed. |

## 13. Risks

- Current content may overrepresent Algebra/functions.
- Missing Numbers standalone capsule after the first balanced signal.
- Missing Geometry standalone capsule after the first balanced signal.
- Data/table/graph content exists but is placed late by the current fixed route.
- Current sequence may be operational v0 only.
- Feedback/step-by-step are absent from M1 registry entries.
- Item metadata and item-level rationale are absent.
- Current metadata may conflict with BPCPv1 language, especially `primaryPurpose: diagnose` for the balanced entry.
- Current route could create AS1 tunnel if used as the 2-6 pedagogical plan.
- `paes_m1_linear_equations_reinforcement` may reinforce too early if no evidence-driven need exists.
- `paes_m1_linear_functions_basic` and `paes_m1_data_representation_entry` have 8 items and need extension/focus review before ficha derivation.

## 14. Recommended next step

```text
C. Redesign missing capsule concepts before fichas.
```

Conservative execution order:

1. Redesign missing source concepts for capsule 3 Numbers/percentage/proportionality and capsule 5 Geometry/area/measure.
2. Derive source packets for candidate current contents:
   - capsule 2: `paes_m1_linear_equations_basic`;
   - capsule 4: `paes_m1_data_representation_entry`;
   - capsule 6 candidates: `paes_m1_linear_equations_word_problems` and/or `paes_m1_linear_functions_basic`.
3. Reconcile current route order before deriving fichas 2-6, because the current fixed map does not match the plan's multieje early calibration order.

Do not proceed directly to fichas 2-6 using the current source as if it already covered the plan.

## 15. Final verdict

```text
CURRENT_M1_CONTENT_HAS_GAPS_AGAINST_2_6_CALIBRATION_PLAN
```
