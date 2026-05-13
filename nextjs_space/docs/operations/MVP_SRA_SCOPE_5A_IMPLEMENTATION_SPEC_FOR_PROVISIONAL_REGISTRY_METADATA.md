# MVP-SRA-SCOPE-5A - Implementation Spec for Provisional Registry Metadata

## 1. Purpose

Define the implementation-ready specification for a future, narrow, additive metadata pass on the current PAES_M1 content registry activities.

This specification prepares a later implementation phase, but does not authorize implementation by itself.

The future implementation candidate is:

```text
MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities
```

This SCOPE-5A phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `59d89b6`
- Last accepted commit = `MVP-SRA-SCOPE-5: review construction restart options`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Core implementation decision to prepare

The safest first construction restart candidate is additive provisional metadata on existing PAES_M1 registry activities.

Core rule:

```text
Add metadata only. Do not change selection logic, student flow, StudyLoad lifecycle, schema, or runtime behavior.
```

The purpose is to make current content more legible to the future pedagogical decision layer without changing what students experience today.

## 4. Future implementation scope

Future `MVP-SRA-IMPL-1` should affect only the current PAES_M1 registry content definitions, likely in:

```text
nextjs_space/lib/study-load-content.ts
```

If the actual registry file has moved, Git preflight and file inspection must determine the current path.

No other file should be touched unless inspection shows a type definition is required in the same registry context.

## 5. Activities in scope

The metadata pass should cover only these existing activities:

1. `paes_m1_balanced_entry_initial`
2. `paes_m1_linear_equations_basic`
3. `paes_m1_linear_equations_word_problems`
4. `paes_m1_linear_equations_reinforcement`
5. `paes_m1_linear_functions_basic`

No new StudyLoads are in scope.

No item content changes are in scope.

No correct-answer changes are in scope.

No feedback-copy changes are in scope.

## 6. Activities explicitly out of scope

Future implementation must not add:

- N1 Numbers activities;
- G1 Geometry activities;
- PE1 Data/Probability activities;
- milestones;
- mini-checkpoints;
- mini-ensayos;
- guided error reviews;
- generated content;
- selector behavior;
- tutor-agent behavior.

These remain future phases.

## 7. Proposed metadata container

Add a single metadata object per content entry.

Preferred property name:

```ts
pedagogicalMetadata
```

Alternative acceptable property names if code conventions require:

```ts
metadata
pedagogy
learningMetadata
```

Recommendation: use `pedagogicalMetadata` because it is explicit and avoids confusion with generic rendering metadata.

## 8. Required metadata fields

Each in-scope content entry should include:

```ts
pedagogicalMetadata: {
  programCode: 'PAES_M1',
  activeSliceId: string,
  studyLoadKind: string,
  axis: string,
  primaryTaxonomyNodeId: string,
  taxonomyNodeIds: string[],
  taxonomyFamilyId: string,
  primaryPaesSkill: string,
  secondaryPaesSkills: string[],
  difficultyBand: string,
  prerequisiteNodeIds: string[],
  evidencePurpose: string,
  expectedEvidenceSignals: string[],
  commonErrorPatterns: string[],
  ifStrongNextAction: string,
  ifWeakNextAction: string,
  ifMixedNextAction: string,
  fallbackIfUnavailable: string,
  antiMonotonyFallback: string,
  sourceRefs: string[],
  expertValidationStatus: string,
  internalValidationStatus: string,
  studentFacingClaimsAllowed: string[],
  guardrails: string[],
}
```

## 9. Allowed enum values

### programCode

```text
PAES_M1
```

### activeSliceId

```text
AS1_ENTRY
AS1_ALGEBRA_FUNCTIONS_CORRIDOR
```

### studyLoadKind

```text
practice
reinforcement
bridge
validation
spiral
confidence_restoration
checkpoint_later
```

Only use values that match current conceptual role. `checkpoint_later` is informational only and should not imply implementation.

### axis

```text
balanced
numeros
algebra_y_funciones
geometria
probabilidad_y_estadistica
```

For current AS1 registry entries, most will be `algebra_y_funciones`; balanced entry is `balanced`.

### PAES skills

```text
resolver_problemas
modelar
representar
argumentar
```

### difficultyBand

```text
D0
D1
D2
D3
D4
D1-D2
D2-D3
```

These are Bexauri planning bands only. They are not PAES score or theta bands.

### expertValidationStatus

```text
not_reviewed
review_requested
accepted
accepted_with_minor_changes
needs_revision
not_acceptable_for_beta
superseded
```

For this implementation, use:

```text
not_reviewed
```

### internalValidationStatus

```text
proposal_only
registry_aligned
locally_rendered
locally_submitted
locally_completed
locally_validated_as_corridor_component
locally_used_as_entry_signal
production_validated_internal_only
superseded
```

Use the narrowest truthful value.

### studentFacingClaimsAllowed

Allowed values:

```text
activity_evidence_only
initial_activity
not_diagnostic
not_paes_score
not_mastery
not_theta
not_adaptive_ai
```

### guardrails

Required values:

```text
no_paes_score_claim
no_mastery_claim
no_theta_claim
no_adaptive_ai_claim
no_universal_as1_routing
student_continuity_preserved
```

## 10. Per-activity metadata target

### 10.1 Balanced entry

Content key:

```text
paes_m1_balanced_entry_initial
```

Target metadata:

```ts
{
  programCode: 'PAES_M1',
  activeSliceId: 'AS1_ENTRY',
  studyLoadKind: 'practice',
  axis: 'balanced',
  primaryTaxonomyNodeId: 'BALANCED_ENTRY_SIGNAL',
  taxonomyNodeIds: ['N_PCT_02', 'AF_EQ_01', 'G_AREA_01', 'PE_PROB_01'],
  taxonomyFamilyId: 'balanced_entry',
  primaryPaesSkill: 'resolver_problemas',
  secondaryPaesSkills: ['modelar', 'representar'],
  difficultyBand: 'D1',
  prerequisiteNodeIds: [],
  evidencePurpose: 'Capture a broad low-friction initial signal across PAES_M1 axes without claiming diagnostic placement.',
  expectedEvidenceSignals: ['axis_item_pattern', 'correct_count', 'self_report'],
  commonErrorPatterns: ['percentage_final_price_confusion', 'equation_inverse_operation_error', 'area_perimeter_confusion', 'probability_total_favorable_confusion'],
  ifStrongNextAction: 'Consider AS1 algebra/functions corridor, validation, or bridge based on evidence; do not infer broad PAES readiness.',
  ifWeakNextAction: 'Choose a low-friction prerequisite or confidence-restoration load based on error pattern.',
  ifMixedNextAction: 'Select axis-specific follow-up based on item pattern and self-report.',
  fallbackIfUnavailable: 'Use safest low-friction entry aligned with known evidence.',
  antiMonotonyFallback: 'Avoid immediate long algebra-only sequence if coverage or self-report suggests another axis.',
  sourceRefs: ['S-M1-003', 'S-M1-005', 'S-M1-015', 'S-M1-019', 'S-M1-021'],
  expertValidationStatus: 'not_reviewed',
  internalValidationStatus: 'locally_used_as_entry_signal',
  studentFacingClaimsAllowed: ['initial_activity', 'activity_evidence_only', 'not_diagnostic', 'not_paes_score'],
  guardrails: ['no_paes_score_claim', 'no_mastery_claim', 'no_theta_claim', 'no_adaptive_ai_claim', 'no_universal_as1_routing', 'student_continuity_preserved'],
}
```

### 10.2 Ecuaciones lineales basicas

Content key:

```text
paes_m1_linear_equations_basic
```

Target metadata:

```ts
{
  programCode: 'PAES_M1',
  activeSliceId: 'AS1_ALGEBRA_FUNCTIONS_CORRIDOR',
  studyLoadKind: 'practice',
  axis: 'algebra_y_funciones',
  primaryTaxonomyNodeId: 'AF_EQ_02',
  taxonomyNodeIds: ['AF_EQ_01', 'AF_EQ_02'],
  taxonomyFamilyId: 'AF-FAM-03',
  primaryPaesSkill: 'resolver_problemas',
  secondaryPaesSkills: ['representar'],
  difficultyBand: 'D1-D2',
  prerequisiteNodeIds: ['AF_EXPR_02', 'N_INT_03', 'N_RAT_02'],
  evidencePurpose: 'Observe equation structure control, inverse operations, sign handling, and readiness for contextual modeling.',
  expectedEvidenceSignals: ['correct_count', 'item_pattern', 'self_report', 'sign_errors', 'fraction_errors'],
  commonErrorPatterns: ['sign_error', 'inverse_operation_error', 'fraction_coefficient_error'],
  ifStrongNextAction: 'Advance to AF_EQ_04 context-to-equation or bridge to AF_LIN_01 if readiness is high.',
  ifWeakNextAction: 'Reinforce AF_EQ_01/AF_EQ_02 once or redirect to N_INT_03, N_RAT_02, or AF_EXPR_02 if prerequisite risk is visible.',
  ifMixedNextAction: 'Use a short hold or bridge load; avoid automatic advance if prerequisite risk is unclear.',
  fallbackIfUnavailable: 'Use low-friction equation confidence-restoration or Numbers prerequisite load.',
  antiMonotonyFallback: 'After repeated equation mechanics, switch to context modeling, representation switch, Numbers prerequisite, or non-algebra spiral.',
  sourceRefs: ['S-M1-003', 'S-M1-005', 'S-M1-015', 'S-M1-017'],
  expertValidationStatus: 'not_reviewed',
  internalValidationStatus: 'locally_validated_as_corridor_component',
  studentFacingClaimsAllowed: ['activity_evidence_only', 'not_paes_score', 'not_mastery'],
  guardrails: ['no_paes_score_claim', 'no_mastery_claim', 'no_theta_claim', 'no_adaptive_ai_claim', 'no_universal_as1_routing', 'student_continuity_preserved'],
}
```

### 10.3 Problemas con ecuaciones lineales

Content key:

```text
paes_m1_linear_equations_word_problems
```

Target metadata:

```ts
{
  programCode: 'PAES_M1',
  activeSliceId: 'AS1_ALGEBRA_FUNCTIONS_CORRIDOR',
  studyLoadKind: 'bridge',
  axis: 'algebra_y_funciones',
  primaryTaxonomyNodeId: 'AF_EQ_04',
  taxonomyNodeIds: ['AF_EQ_04', 'BRIDGE-02'],
  taxonomyFamilyId: 'AF-FAM-03',
  primaryPaesSkill: 'modelar',
  secondaryPaesSkills: ['resolver_problemas', 'representar'],
  difficultyBand: 'D2-D3',
  prerequisiteNodeIds: ['AF_EQ_01', 'AF_EQ_02', 'N_INT_03', 'N_RAT_02'],
  evidencePurpose: 'Observe whether the student can translate a verbal/contextual situation into a linear equation and interpret the result.',
  expectedEvidenceSignals: ['correct_count', 'context_translation_errors', 'equation_setup_errors', 'self_report'],
  commonErrorPatterns: ['context_translation_error', 'wrong_unknown_definition', 'equation_setup_error', 'arithmetic_error_after_modeling'],
  ifStrongNextAction: 'Advance to AF_LIN_01/AF_LIN_02 linear relationship/function entry or validate with contextual modeling challenge.',
  ifWeakNextAction: 'Identify whether weakness is equation mechanics, context translation, arithmetic, or reading; redirect accordingly.',
  ifMixedNextAction: 'Use a bridge load with familiar equations plus one context item; avoid full repetition if frustration is visible.',
  fallbackIfUnavailable: 'Use basic equation load or context-to-expression bridge.',
  antiMonotonyFallback: 'If word-problem difficulty persists, switch representation or axis temporarily rather than repeating similar contexts indefinitely.',
  sourceRefs: ['S-M1-003', 'S-M1-005', 'S-M1-011', 'S-M1-013'],
  expertValidationStatus: 'not_reviewed',
  internalValidationStatus: 'locally_validated_as_corridor_component',
  studentFacingClaimsAllowed: ['activity_evidence_only', 'not_paes_score', 'not_mastery'],
  guardrails: ['no_paes_score_claim', 'no_mastery_claim', 'no_theta_claim', 'no_adaptive_ai_claim', 'no_universal_as1_routing', 'student_continuity_preserved'],
}
```

### 10.4 Refuerzo de ecuaciones lineales

Content key:

```text
paes_m1_linear_equations_reinforcement
```

Target metadata:

```ts
{
  programCode: 'PAES_M1',
  activeSliceId: 'AS1_ALGEBRA_FUNCTIONS_CORRIDOR',
  studyLoadKind: 'reinforcement',
  axis: 'algebra_y_funciones',
  primaryTaxonomyNodeId: 'AF_EQ_02',
  taxonomyNodeIds: ['AF_EQ_01', 'AF_EQ_02', 'BRIDGE-03'],
  taxonomyFamilyId: 'AF-FAM-03',
  primaryPaesSkill: 'resolver_problemas',
  secondaryPaesSkills: ['representar'],
  difficultyBand: 'D1-D2',
  prerequisiteNodeIds: ['AF_EXPR_02', 'N_INT_03', 'N_RAT_02'],
  evidencePurpose: 'Consolidate equation mechanics, reduce repeated procedural errors, rebuild confidence, and decide whether to return to main corridor or redirect to prerequisites.',
  expectedEvidenceSignals: ['correct_count', 'repeated_error_pattern', 'self_report', 'confidence_signal'],
  commonErrorPatterns: ['repeated_inverse_operation_error', 'sign_error', 'fraction_coefficient_error', 'variable_handling_error'],
  ifStrongNextAction: 'Return to context-to-equation or advance to linear functions.',
  ifWeakNextAction: 'Redirect to N_INT_03, N_RAT_02, or AF_EXPR_02; request async review if unclear.',
  ifMixedNextAction: 'Use hold, bridge, or non-algebra spiral if monotony risk is high.',
  fallbackIfUnavailable: 'Use confidence-restoration or prerequisite load, not endless reinforcement.',
  antiMonotonyFallback: 'Do not create an indefinite reinforcement loop; after 1-2 similar reinforcements, change strategy.',
  sourceRefs: ['S-M1-003', 'S-M1-005', 'S-M1-015', 'S-M1-017'],
  expertValidationStatus: 'not_reviewed',
  internalValidationStatus: 'locally_validated_as_corridor_component',
  studentFacingClaimsAllowed: ['activity_evidence_only', 'not_paes_score', 'not_mastery'],
  guardrails: ['no_paes_score_claim', 'no_mastery_claim', 'no_theta_claim', 'no_adaptive_ai_claim', 'no_universal_as1_routing', 'student_continuity_preserved'],
}
```

### 10.5 Funciones lineales basicas

Content key:

```text
paes_m1_linear_functions_basic
```

Target metadata:

```ts
{
  programCode: 'PAES_M1',
  activeSliceId: 'AS1_ALGEBRA_FUNCTIONS_CORRIDOR',
  studyLoadKind: 'bridge',
  axis: 'algebra_y_funciones',
  primaryTaxonomyNodeId: 'AF_LIN_01',
  taxonomyNodeIds: ['AF_LIN_01', 'AF_LIN_02', 'AF_LIN_03', 'AF_LIN_04'],
  taxonomyFamilyId: 'AF-FAM-05',
  primaryPaesSkill: 'representar',
  secondaryPaesSkills: ['resolver_problemas', 'modelar'],
  difficultyBand: 'D1-D2',
  prerequisiteNodeIds: ['AF_EQ_01', 'AF_EQ_02', 'AF_PROP_01'],
  evidencePurpose: 'Observe early function understanding, constant change, table/graph/equation transfer, and readiness to move beyond equation solving.',
  expectedEvidenceSignals: ['table_pattern_errors', 'graph_interpretation_errors', 'slope_intercept_confusion', 'self_report'],
  commonErrorPatterns: ['input_output_confusion', 'constant_change_error', 'graph_table_mismatch', 'slope_intercept_confusion'],
  ifStrongNextAction: 'Advance to richer linear function representation or contextual linear modeling.',
  ifWeakNextAction: 'Identify whether weakness is representation, equation prerequisite, constant-change concept, or context modeling; redirect accordingly.',
  ifMixedNextAction: 'Use representation-switch bridge or one short validation/hold load.',
  fallbackIfUnavailable: 'Use table/input-output basics or return to equation/context bridge.',
  antiMonotonyFallback: 'If recent sequence is algebra-heavy, spiral to PE_DATA_01, G_AREA_01, N_PCT_03, or future milestone.',
  sourceRefs: ['S-M1-003', 'S-M1-005', 'S-M1-017', 'S-M1-019'],
  expertValidationStatus: 'not_reviewed',
  internalValidationStatus: 'locally_validated_as_corridor_component',
  studentFacingClaimsAllowed: ['activity_evidence_only', 'not_paes_score', 'not_mastery'],
  guardrails: ['no_paes_score_claim', 'no_mastery_claim', 'no_theta_claim', 'no_adaptive_ai_claim', 'no_universal_as1_routing', 'student_continuity_preserved'],
}
```

## 11. TypeScript implementation notes for future IMPL-1

Future implementation should avoid overengineering.

Possible approach:

1. Define a lightweight type near the content registry if needed.
2. Add optional `pedagogicalMetadata` to the content entry type.
3. Fill metadata objects for the five in-scope activities.
4. Do not consume metadata at runtime yet.
5. Ensure build/typecheck passes.

Important:

- If adding metadata breaks types, adjust only local registry type definitions.
- Do not introduce global schema changes.
- Do not add database fields.
- Do not add API output changes unless impossible to avoid; preferred behavior is no runtime consumption.

## 12. Expected behavior after future IMPL-1

Expected behavior:

```text
No student-facing behavior change.
No routing behavior change.
No next-load selector behavior change.
No UI behavior change.
No DB behavior change.
No production behavior change unless separately deployed later.
```

The only expected effect should be:

```text
Existing PAES_M1 registry activities now carry provisional pedagogical metadata for future use.
```

## 13. Verification plan for future IMPL-1

Minimum local verification:

```text
git status --short
npm.cmd run build
```

If the project has a TypeScript-only command available and already used safely:

```text
npm.cmd run typecheck
```

Only use commands that are already part of the project. Do not install dependencies.

Recommended inspection:

```text
git diff -- nextjs_space/lib/study-load-content.ts
```

Expected diff:

- metadata additions only;
- optional type addition if needed;
- no item text changes;
- no correct answer changes;
- no continuity edge changes;
- no UI/API/schema changes.

## 14. Rollback plan for future IMPL-1

Rollback should be simple:

- remove `pedagogicalMetadata` objects;
- remove local optional metadata type if added;
- restore registry to previous behavior;
- no data migration needed;
- no production rollback needed if not deployed.

Because no runtime behavior should change, rollback risk should be low.

## 15. Implementation guardrails for future IMPL-1

Future implementation must not:

- add selector logic;
- change continuity map;
- add new StudyLoads;
- change existing items;
- change correct answers;
- change feedback UI;
- change `/now`;
- change APIs;
- change Prisma schema;
- run SQL;
- run Prisma CLI;
- deploy;
- touch production;
- print secrets;
- claim PAES score/mastery/theta/adaptive AI.

## 16. Commit expectation for future IMPL-1

Suggested future commit message:

```text
MVP-SRA-IMPL-1: add provisional M1 registry metadata
```

Commit should include only the minimal registry/type changes required.

No documentation update is required in IMPL-1 unless the implementation discovers drift that must be recorded.

## 17. When not to implement IMPL-1

Do not implement if:

- Git working tree is dirty;
- local repo is behind origin/main;
- registry path is unclear;
- type system would require broad refactor;
- metadata would require schema/API changes;
- scope expands to selector logic;
- there is pressure to add new content simultaneously;
- expert review status is misrepresented;
- AS1 would become universal routing by implication.

## 18. Recommended next phase

Recommended next phase:

```text
MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities
```

But only if Mauricio explicitly authorizes returning to implementation.

If documentation-only time continues, alternative next phase:

```text
MVP-SRA-SCOPE-5B - Implementation spec for first non-algebra slice
```

## 19. Handoff requirements

Future handoffs must preserve:

- SCOPE-5A is a spec, not implementation;
- future IMPL-1 is additive metadata only;
- no runtime behavior change is expected;
- metadata remains provisional and expert review pending;
- AS1 remains available, not universal;
- no selector logic is authorized;
- no new StudyLoads are authorized;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
