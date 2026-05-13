# MVP-SRA-ROADMAP-2E-1 - AS1 Algebra/Functions Corridor Metadata and Assignment Constraints

## 1. Purpose

Document taxonomy-aligned metadata and assignment constraints for the current AS1 algebra/functions corridor.

This phase must not turn the corridor into a universal or mandatory path for every PAES_M1 student.

The current corridor is an operationally validated, pedagogically plausible first path for some students, but it remains one available corridor inside the broader PAES_M1 roadmap.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `8ac19dc`
- Last accepted commit = `MVP-SRA-ROADMAP-2E: propose taxonomy-aligned StudyLoad metadata`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Core decision

The AS1 algebra/functions corridor is:

- available;
- useful;
- locally validated as an operational path;
- aligned with official PAES_M1 Algebra y funciones content;
- suitable for some unknown-level or partially known students;
- useful as a first evidence-producing corridor.

The AS1 algebra/functions corridor is not:

- the full PAES_M1 roadmap;
- a universal sequence for every student;
- mandatory after balanced entry;
- proof of complete PAES_M1 coverage;
- an adaptive AI decision;
- a mastery or PAES score model.

Operational principle:

```text
AS1 algebra/functions corridor = available first corridor, not universal tutoring path.
```

## 4. Current corridor

Current locally validated sequence:

```text
PAES M1 - Entrada balanceada inicial
-> PAES M1 - Ecuaciones lineales basicas
-> PAES M1 - Problemas con ecuaciones lineales
-> PAES M1 - Refuerzo de ecuaciones lineales
-> PAES M1 - Funciones lineales basicas
```

Pedagogical classification:

```text
AS1_ALGEBRA_FUNCTIONS_CORRIDOR
```

Status:

- operationally validated locally;
- pedagogically plausible;
- taxonomy-aligned in Algebra y funciones;
- partial relative to full PAES_M1 roadmap;
- expert review pending.

## 5. Global assignment rule

Assign this corridor only when evidence suggests it is useful.

Do not assign it by default as a fixed path for every student.

Use it when:

- student level is unknown or partially known;
- balanced entry shows no severe prerequisite blockers;
- algebra readiness needs observation;
- student has no recent reliable evidence;
- equations/functions are pedagogically useful for next signal;
- current roadmap state is compatible with AS1.

Do not use it blindly when:

- the student already has strong recent evidence in equations/functions;
- balanced entry reveals clear Numbers prerequisite weakness;
- student needs confidence restoration in another axis;
- monotony risk is already high;
- supervisor/evidence indicates a different axis should be prioritized;
- student is returning from a recent algebra-heavy sequence.

## 6. Metadata object: Balanced entry

### Identity

- Title: `PAES M1 - Entrada balanceada inicial`
- contentKey: `paes_m1_balanced_entry_initial`
- contentVersion: `v1`
- programCode: `PAES_M1`
- studyLoadKind: `practice`
- activeSliceId: `AS1_ENTRY`
- itemCount: 4
- estimatedDurationMinutes: 8-12

### Roadmap alignment

- axis: `balanced`
- primaryTaxonomyNodeId: `BALANCED_ENTRY_SIGNAL`
- taxonomyNodeIds:
  - `N_PCT_02`
  - `AF_EQ_01`
  - `G_AREA_01`
  - `PE_PROB_01` or `PE_DATA_01` depending on entry variant
- taxonomyFamilyId: `balanced_entry`
- roadmapStatus: `mvp_beta_candidate`

### PAES skill alignment

- primaryPaesSkill: `resolver_problemas`
- secondaryPaesSkills:
  - `modelar`
  - `representar`

### Evidence purpose

Capture a broad, low-friction initial signal across official PAES_M1 axes without claiming diagnostic placement.

### Assignment constraints

Assign when:

- student has unknown or stale M1 evidence;
- Bexauri needs broad first signal;
- student should not feel tested heavily;
- onboarding should remain low-friction.

Do not assign as:

- full diagnostic;
- PAES score estimator;
- mastery check;
- final placement decision.

### If strong

- Consider AS1 algebra/functions corridor.
- Consider validation/bridge if student appears very comfortable.
- Avoid assuming broad PAES readiness from 4 items.

### If weak

- Choose a low-friction prerequisite or confidence-restoration load.
- Use error pattern to choose Numbers, Algebra, Geometry, or PE follow-up.
- Do not label student as low-level.

### If mixed

- Select follow-up by axis-specific error pattern.
- If algebra weak but other axes strong, avoid forcing full algebra corridor without prerequisite support.

### Fallback

If balanced entry is unavailable, use the safest low-friction entry aligned with known evidence.

### Anti-monotony fallback

After balanced entry, avoid more than a short algebra-heavy path without checking coverage or student response.

### Validation status

- internalValidationStatus: `locally_used_as_entry_signal`
- expertValidationStatus: `not_reviewed`

## 7. Metadata object: Ecuaciones lineales basicas

### Identity

- Title: `PAES M1 - Ecuaciones lineales basicas`
- contentKey: `paes_m1_linear_equations_basic`
- contentVersion: `v1`
- programCode: `PAES_M1`
- studyLoadKind: `practice`
- activeSliceId: `AS1_ALGEBRA_FUNCTIONS_CORRIDOR`

### Roadmap alignment

- axis: `algebra_y_funciones`
- primaryTaxonomyNodeId: `AF_EQ_02`
- taxonomyNodeIds:
  - `AF_EQ_01`
  - `AF_EQ_02`
- taxonomyFamilyId: `AF-FAM-03`
- difficultyBand: `D1-D2`
- roadmapStatus: `mvp_beta_candidate`

### PAES skill alignment

- primaryPaesSkill: `resolver_problemas`
- secondaryPaesSkills:
  - `representar`

### Prerequisites

- `AF_EXPR_02` — reducing/understanding simple expressions.
- `N_INT_03` — sign rules and integer operations.
- `N_RAT_02` — rational operations, especially if equations include fractions/decimals.

### Evidence purpose

Observe equation structure control, inverse operations, procedural fluency, sign handling, and readiness for contextual equation modeling.

### Assignment constraints

Assign when:

- balanced entry or prior evidence suggests algebra readiness;
- student needs equation fluency observation;
- no severe Numbers prerequisite risk is visible;
- current active slice legitimately targets Algebra y funciones.

Do not assign when:

- student already demonstrated strong recent AF_EQ evidence;
- student failed balanced entry due to obvious Numbers prerequisite errors;
- student needs a non-algebra spiral due to monotony;
- student is better served by geometry/data confidence restoration.

### If strong

- Advance to `AF_EQ_04` context-to-equation.
- Or bridge to `AF_LIN_01` if readiness is high.

### If weak

- Reinforce `AF_EQ_01` / `AF_EQ_02` only once or twice.
- Redirect to `N_INT_03` or `N_RAT_02` if errors are arithmetic/sign/fraction-driven.
- Redirect to `AF_EXPR_02` if errors show expression/variable weakness.

### If mixed

- Use a short hold or bridge load.
- Prefer one novelty probe only if prerequisite risk is low.

### Fallback

Use low-friction equation confidence-restoration load or Numbers prerequisite load.

### Anti-monotony fallback

After repeated equation mechanics, switch strategy:

- context modeling;
- representation switch;
- Numbers prerequisite;
- data/geometry spiral;
- guided error review later.

### Validation status

- internalValidationStatus: `locally_validated_as_corridor_component`
- expertValidationStatus: `not_reviewed`

## 8. Metadata object: Problemas con ecuaciones lineales

### Identity

- Title: `PAES M1 - Problemas con ecuaciones lineales`
- contentKey: `paes_m1_linear_equations_word_problems`
- contentVersion: `v1`
- programCode: `PAES_M1`
- studyLoadKind: `bridge`
- activeSliceId: `AS1_ALGEBRA_FUNCTIONS_CORRIDOR`

### Roadmap alignment

- axis: `algebra_y_funciones`
- primaryTaxonomyNodeId: `AF_EQ_04`
- taxonomyNodeIds:
  - `AF_EQ_04`
  - `BRIDGE-02`
- taxonomyFamilyId: `AF-FAM-03`
- difficultyBand: `D2-D3`
- noveltyType: `context_modeling`

### PAES skill alignment

- primaryPaesSkill: `modelar`
- secondaryPaesSkills:
  - `resolver_problemas`
  - `representar`

### Prerequisites

- `AF_EQ_01`
- `AF_EQ_02`
- basic reading/context extraction
- relevant Numbers fluency if context includes quantities/fractions/percentages

### Evidence purpose

Observe whether the student can translate a verbal/contextual situation into a linear equation and interpret the result.

### Assignment constraints

Assign when:

- equation mechanics are at least partially stable;
- student is ready for contextual modeling;
- Bexauri needs evidence beyond routine procedure.

Do not assign when:

- student cannot solve simple equations;
- errors are dominated by arithmetic prerequisites;
- student self-report indicates high frustration after basic equations;
- a confidence-restoration load would be more appropriate.

### If strong

- Advance to `AF_LIN_01` / `AF_LIN_02` linear relationship/function entry.
- Or validate with a small D3 contextual modeling challenge.

### If weak

- Determine error type:
  - equation mechanics -> reinforce AF_EQ;
  - context translation -> bridge with simpler verbal-to-symbolic items;
  - arithmetic -> redirect to Numbers prerequisite;
  - reading/comprehension -> simplify context and use structured modeling.

### If mixed

- Use a bridge load with 3 familiar equation items and 1 context item.
- Avoid immediate full repetition of word problems if frustration is visible.

### Fallback

Use basic equation load or context-to-expression bridge.

### Anti-monotony fallback

If word-problem difficulty persists, switch representation or axis temporarily rather than repeating similar contexts indefinitely.

### Validation status

- internalValidationStatus: `locally_validated_as_corridor_component`
- expertValidationStatus: `not_reviewed`

## 9. Metadata object: Refuerzo de ecuaciones lineales

### Identity

- Title: `PAES M1 - Refuerzo de ecuaciones lineales`
- contentKey: `paes_m1_linear_equations_reinforcement`
- contentVersion: `v1`
- programCode: `PAES_M1`
- studyLoadKind: `reinforcement`
- activeSliceId: `AS1_ALGEBRA_FUNCTIONS_CORRIDOR`

### Roadmap alignment

- axis: `algebra_y_funciones`
- primaryTaxonomyNodeId: `AF_EQ_02`
- taxonomyNodeIds:
  - `AF_EQ_01`
  - `AF_EQ_02`
  - `BRIDGE-03`
- taxonomyFamilyId: `AF-FAM-03`
- difficultyBand: `D1-D2`
- noveltyType: `same_node_variation`

### PAES skill alignment

- primaryPaesSkill: `resolver_problemas`
- secondaryPaesSkills:
  - `representar`

### Evidence purpose

Consolidate equation mechanics, reduce repeated procedural errors, rebuild confidence, and decide whether to return to main corridor or redirect to prerequisites.

### Assignment constraints

Assign when:

- prior equation evidence is weak or mixed;
- student needs one targeted reinforcement;
- errors are likely fixable with similar but clearer practice;
- confidence needs support but student is not blocked by deeper prerequisites.

Do not assign repeatedly when:

- the same error persists after one or two reinforcements;
- evidence points to Numbers prerequisite weakness;
- student is disengaged or frustrated;
- monotony risk is high;
- another axis would better preserve momentum.

### If strong

- Return to context-to-equation or advance to linear functions.

### If weak

- Redirect to prerequisite:
  - `N_INT_03` for sign errors;
  - `N_RAT_02` for fraction/decimal coefficient errors;
  - `AF_EXPR_02` for expression/variable handling;
- Or request async review while giving safe fallback.

### If mixed

- Use hold or bridge.
- Consider non-algebra spiral if monotony risk is high.

### Fallback

Use confidence-restoration or prerequisite load, not endless reinforcement.

### Anti-monotony fallback

Hard rule:

```text
Do not create an indefinite reinforcement loop.
After 1-2 similar reinforcements, change strategy.
```

Possible strategy changes:

- prerequisite redirect;
- representation switch;
- PE data low-friction spiral;
- basic geometry measurement spiral;
- guided error review later.

### Validation status

- internalValidationStatus: `locally_validated_as_corridor_component`
- expertValidationStatus: `not_reviewed`

## 10. Metadata object: Funciones lineales basicas

### Identity

- Title: `PAES M1 - Funciones lineales basicas`
- contentKey: `paes_m1_linear_functions_basic`
- contentVersion: `v1`
- programCode: `PAES_M1`
- studyLoadKind: `bridge`
- activeSliceId: `AS1_ALGEBRA_FUNCTIONS_CORRIDOR`

### Roadmap alignment

- axis: `algebra_y_funciones`
- primaryTaxonomyNodeId: `AF_LIN_01`
- taxonomyNodeIds:
  - `AF_LIN_01`
  - `AF_LIN_02`
  - `AF_LIN_03`
  - `AF_LIN_04`
- taxonomyFamilyId: `AF-FAM-05`
- difficultyBand: `D1-D2`
- noveltyType: `next_node_probe`

### PAES skill alignment

- primaryPaesSkill: `representar`
- secondaryPaesSkills:
  - `resolver_problemas`
  - `modelar`

### Prerequisites

- `AF_EQ_01`
- `AF_EQ_02`
- input-output reasoning
- table reading
- basic graph interpretation

### Evidence purpose

Observe early function understanding, constant change, table/graph/equation transfer, and readiness to move beyond equation solving.

### Assignment constraints

Assign when:

- equation mechanics are sufficiently stable;
- student is ready for controlled novelty;
- Bexauri wants to test movement from solving equations to representing relationships;
- monotony in equations should be broken by a meaningful advance.

Do not assign when:

- student is still blocked by basic equation structure;
- student shows high prerequisite risk in Numbers;
- student needs confidence restoration before novelty;
- a non-algebra spiral is more appropriate due to coverage gap or fatigue.

### If strong

- Advance to richer linear function representation or contextual linear modeling.
- Consider later validation/challenge.

### If weak

- Identify whether weakness is:
  - table/graph representation;
  - equation prerequisite;
  - constant-change concept;
  - context modeling.
- Redirect accordingly.

### If mixed

- Use representation-switch bridge.
- Use one short validation/hold load before deciding next node.

### Fallback

Use table/input-output basics or return to equation/context bridge.

### Anti-monotony fallback

If the student has had many algebra/function activities, spiral to:

- `PE_DATA_01` data interpretation;
- `G_AREA_01` geometry measurement;
- `N_PCT_03` percentage context;
- or a future cycle milestone.

### Validation status

- internalValidationStatus: `locally_validated_as_corridor_component`
- expertValidationStatus: `not_reviewed`

## 11. Corridor-level decision examples

### Student A — strong balanced entry and equation evidence

Recommended:

- skip excessive equation practice;
- use context-to-equation or functions;
- consider validation/bridge.

Not recommended:

- force all reinforcement steps.

### Student B — balanced entry weak in Numbers

Recommended:

- redirect to Numbers prerequisite.

Not recommended:

- force equations immediately.

### Student C — strong algebra but high monotony risk

Recommended:

- spiral to data or geometry;
- preserve motivation and coverage.

Not recommended:

- continue algebra-only sequence.

### Student D — prior strong evidence in equations/functions

Recommended:

- skip AS1 basics;
- start later slice or validation.

Not recommended:

- repeat basics because they are first in registry.

### Student E — mixed evidence and negative self-report

Recommended:

- hold or confidence-restoration;
- choose fallback by error type.

Not recommended:

- automatic advance.

## 12. Corridor-level guardrails

- Do not present AS1 as the full M1 roadmap.
- Do not assume all students should complete every AS1 load.
- Do not create an endless equation reinforcement loop.
- Do not use correct count as mastery.
- Do not infer PAES score.
- Do not call this adaptive AI.
- Do not let operator review become a normal gate.
- Preserve non-blocking continuity through fallback paths.

## 13. Relationship with future non-algebra slices

This corridor should be complemented by early slices in:

- Numbers prerequisites;
- Geometry measurement / visual reasoning;
- Data interpretation or basic probability.

Before external guided beta claims of broad PAES_M1 tutoring, Bexauri should define at least one early slice outside Algebra y funciones.

## 14. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2F - First non-algebra slice proposals`

Purpose:

- define first metadata-aligned Numbers, Geometry, and Probability/Statistics slices;
- reduce overconcentration in AS1 algebra/functions;
- prepare a broader MVP-Beta tutoring route.

Alternative:

`MVP-SRA-ROADMAP-2E-2 - Decision examples for AS1 corridor`

Use only if more decision examples are needed before non-algebra design.

## 15. Handoff requirements

Future handoffs must preserve:

- AS1 algebra/functions corridor has metadata and assignment constraints;
- AS1 is available, not universal;
- current validated path remains one corridor, not full roadmap;
- next-load decisions must use evidence, taxonomy, prerequisite risk, monotony risk, and coverage gaps;
- non-algebra slices are required to broaden MVP-Beta;
- expert review remains pending and asynchronous;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
