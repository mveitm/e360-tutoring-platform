# MVP-SRA-ROADMAP-2E - Taxonomy-Aligned StudyLoad Metadata Proposal

## 1. Purpose

Define the pedagogical metadata that each future PAES_M1 StudyLoad should carry or be documented with so Bexauri can connect content to the roadmap, evidence, next-load decisions, expert review, and future tutor-agent execution.

This metadata proposal is the bridge between:

- PAES_M1 official taxonomy;
- StudyLoad content;
- student evidence;
- decision records;
- non-blocking supervisor/expert review;
- future rule-based selector logic;
- future tutor-agent selection/generation.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `8739c4b`
- Last accepted commit = `MVP-SRA-ROADMAP-2D: add PAES M1 expert review checklist`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Inputs

This proposal depends on:

- `PAES_M1_SOURCE_REGISTER.md`
- `MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
- `MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
- `MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`
- `MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md`
- `MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md`

## 4. Core principle

A StudyLoad should not be only a title plus exercises.

For Bexauri's SRA, each StudyLoad should eventually answer:

- what roadmap node it targets;
- what evidence it is meant to produce;
- what PAES skill it exercises;
- what difficulty band it belongs to;
- what prerequisite it depends on;
- when it should be assigned;
- what to do if the student performs strongly, weakly, or ambiguously;
- how to avoid monotony;
- whether it has expert review or is provisional.

## 5. Metadata maturity levels

### Level 0 — current transitional registry metadata

Current or historical StudyLoads may have only:

- title;
- contentKey;
- contentVersion;
- items;
- correctOptionKey;
- basic instructions.

This is enough for rendering and evidence capture, but not enough for intelligent next-load selection.

### Level 1 — MVP-Beta documented metadata

Metadata is documented in Markdown, admin notes, or content review docs.

This is acceptable before schema/runtime changes.

### Level 2 — registry-level metadata

Metadata becomes part of `study-load-content.ts` or a content registry equivalent.

This should happen only after explicit implementation phase.

### Level 3 — runtime decision metadata

Metadata is available to a selector or agent at runtime.

This is not part of this phase.

### Level 4 — validated adaptive/agentic metadata

Metadata is used by a governed agent or adaptive selector with audit trail.

This is future work and must not be claimed in MVP-Beta.

## 6. Required MVP-Beta metadata fields

Each future taxonomy-aligned StudyLoad should define at least:

### Identity

- `title`
- `contentKey`
- `contentVersion`
- `programCode`
- `studyLoadKind`
- `estimatedDurationMinutes`
- `itemCount`

### Roadmap alignment

- `axis`
- `taxonomyNodeIds`
- `primaryTaxonomyNodeId`
- `taxonomyFamilyId`
- `activeSliceId`
- `roadmapStatus`

### PAES skill alignment

- `primaryPaesSkill`
- `secondaryPaesSkills`

Allowed PAES skills:

- `resolver_problemas`
- `modelar`
- `representar`
- `argumentar`

### Difficulty / progression

- `difficultyBand`
- `difficultyRationale`
- `prerequisiteNodeIds`
- `noveltyType`

### Evidence purpose

- `evidencePurpose`
- `expectedEvidenceSignals`
- `commonErrorPatterns`
- `evidenceLimitations`

### Next-load decision support

- `ifStrongNextAction`
- `ifWeakNextAction`
- `ifMixedNextAction`
- `fallbackIfUnavailable`
- `antiMonotonyFallback`

### Review / governance

- `sourceRefs`
- `expertValidationStatus`
- `internalValidationStatus`
- `studentFacingClaimsAllowed`
- `guardrails`

## 7. Recommended optional fields

Optional metadata for later maturity:

- `axisCoverageRole`
- `coverageGapTarget`
- `confidenceRole`
- `engagementRiskRole`
- `spiralRole`
- `cycleMilestoneRelation`
- `itemStyleSourceRefs`
- `estimatedCognitiveLoad`
- `representationTypes`
- `contextTypes`
- `distractorPurpose`
- `hintPolicy`
- `feedbackPolicy`
- `supervisorReviewNotes`
- `agentSelectionNotes`

## 8. Controlled vocabularies

### studyLoadKind

- `practice`
- `reinforcement`
- `bridge`
- `validation`
- `spiral`
- `confidence_restoration`
- `guided_review`
- `checkpoint`
- `mini_ensayo_later`

`mini_ensayo_later` is reserved for future special actions. It should not imply current implementation.

### roadmapStatus

- `provisional`
- `mvp_beta_candidate`
- `expert_review_pending`
- `expert_reviewed`
- `accepted_for_internal_beta`
- `accepted_for_external_guided_beta`
- `superseded`

### difficultyBand

- `D0`
- `D1`
- `D2`
- `D3`
- `D4`

Guardrail: these are Bexauri planning bands, not PAES score or theta bands.

### noveltyType

- `none`
- `same_node_variation`
- `representation_switch`
- `context_modeling`
- `next_node_probe`
- `cross_axis_spiral`
- `cycle_milestone`

### expertValidationStatus

- `not_reviewed`
- `review_requested`
- `accepted`
- `accepted_with_minor_changes`
- `needs_revision`
- `not_acceptable_for_beta`
- `superseded`

## 9. Minimal metadata object example

```json
{
  "title": "PAES M1 — Ecuaciones lineales basicas",
  "contentKey": "paes_m1_linear_equations_basic",
  "contentVersion": "v1",
  "programCode": "PAES_M1",
  "studyLoadKind": "practice",
  "estimatedDurationMinutes": "8-12",
  "itemCount": 4,
  "axis": "algebra_y_funciones",
  "primaryTaxonomyNodeId": "AF_EQ_02",
  "taxonomyNodeIds": ["AF_EQ_01", "AF_EQ_02"],
  "taxonomyFamilyId": "AF-FAM-03",
  "activeSliceId": "AS1_ALGEBRA_FUNCTIONS_CORRIDOR",
  "roadmapStatus": "mvp_beta_candidate",
  "primaryPaesSkill": "resolver_problemas",
  "secondaryPaesSkills": ["representar"],
  "difficultyBand": "D1-D2",
  "difficultyRationale": "Routine to multi-step linear equation solving with familiar representation.",
  "prerequisiteNodeIds": ["AF_EXPR_02", "N_INT_03", "N_RAT_02"],
  "noveltyType": "none",
  "evidencePurpose": "Observe inverse-operation fluency and equation structure control.",
  "expectedEvidenceSignals": ["correct_count", "item_pattern", "self_report", "sign_errors", "fraction_errors"],
  "commonErrorPatterns": ["sign_error", "inverse_operation_error", "fraction_coefficient_error"],
  "evidenceLimitations": "Does not establish mastery or PAES readiness.",
  "ifStrongNextAction": "advance_to_AF_EQ_04_or_AF_LIN_01",
  "ifWeakNextAction": "reinforce_AF_EQ_01_or_redirect_to_N_INT_N_RAT_prerequisite",
  "ifMixedNextAction": "hold_with_short_bridge_or_validation_load",
  "fallbackIfUnavailable": "Use low-friction equation reinforcement load.",
  "antiMonotonyFallback": "After 1-2 similar equation reinforcements, use representation switch, Numbers prerequisite, or non-algebra spiral.",
  "sourceRefs": ["S-M1-003", "S-M1-005", "S-M1-015", "S-M1-017"],
  "expertValidationStatus": "not_reviewed",
  "internalValidationStatus": "locally_validated_as_corridor_component",
  "studentFacingClaimsAllowed": ["activity_evidence_only", "not_paes_score", "not_mastery"],
  "guardrails": ["no_paes_score_claim", "no_mastery_claim", "no_theta_claim", "no_adaptive_ai_claim"]
}
```

This JSON is illustrative and not implemented in code in this phase.

## 10. Metadata for balanced entry example

```json
{
  "title": "PAES M1 — Entrada balanceada inicial",
  "contentKey": "paes_m1_balanced_entry_initial",
  "contentVersion": "v1",
  "programCode": "PAES_M1",
  "studyLoadKind": "practice",
  "estimatedDurationMinutes": "8-12",
  "itemCount": 4,
  "axis": "balanced",
  "primaryTaxonomyNodeId": "BALANCED_ENTRY_SIGNAL",
  "taxonomyNodeIds": ["N_PCT_02", "AF_EQ_01", "G_AREA_01", "PE_PROB_01"],
  "taxonomyFamilyId": "balanced_entry",
  "activeSliceId": "AS1_ENTRY",
  "roadmapStatus": "mvp_beta_candidate",
  "primaryPaesSkill": "resolver_problemas",
  "secondaryPaesSkills": ["modelar", "representar"],
  "difficultyBand": "D1",
  "difficultyRationale": "Low-friction initial signal across official axes.",
  "prerequisiteNodeIds": [],
  "noveltyType": "cross_axis_spiral",
  "evidencePurpose": "Capture broad initial signal without claiming diagnostic placement.",
  "expectedEvidenceSignals": ["axis_item_pattern", "correct_count", "self_report"],
  "commonErrorPatterns": ["percentage_final_price_confusion", "equation_inverse_operation_error", "area_perimeter_confusion", "probability_total_favorable_confusion"],
  "evidenceLimitations": "Four items cannot determine level, mastery, or PAES score.",
  "ifStrongNextAction": "advance_to_algebra_functions_corridor_or_validation_probe",
  "ifWeakNextAction": "choose_low_friction_prerequisite_or_confidence_restoration_load",
  "ifMixedNextAction": "select_axis_specific_followup_based_on_error_pattern",
  "fallbackIfUnavailable": "Use AS1 algebra/functions entry if balanced entry is unavailable.",
  "antiMonotonyFallback": "Use next StudyLoad from undercovered axis if algebra sequence becomes repetitive.",
  "sourceRefs": ["S-M1-003", "S-M1-005", "S-M1-015", "S-M1-019", "S-M1-021"],
  "expertValidationStatus": "not_reviewed",
  "internalValidationStatus": "locally_used_as_entry_signal",
  "studentFacingClaimsAllowed": ["initial_activity", "activity_evidence_only", "not_diagnostic", "not_paes_score"],
  "guardrails": ["no_paes_score_claim", "no_mastery_claim", "no_theta_claim", "no_adaptive_ai_claim"]
}
```

## 11. Metadata usage in next-load decision records

The next-load decision record should reference metadata fields instead of inferring everything from title/contentKey.

Example linkage:

- `currentTaxonomyNode` comes from StudyLoad metadata.
- `currentAxis` comes from StudyLoad metadata.
- `prerequisiteRisk` is interpreted using `prerequisiteNodeIds` and item errors.
- `coverageGap` is interpreted using axis history and metadata.
- `monotonyRisk` is interpreted using recent StudyLoad metadata sequence.
- `nextAction` uses `ifStrongNextAction`, `ifWeakNextAction`, `ifMixedNextAction`, and `fallbackIfUnavailable`.

## 12. Anti-monotony metadata requirement

Every StudyLoad should eventually define what to do if it is repeated or followed by similar content too many times.

Minimum rule:

- after one or two similar reinforcements, do not repeat the same item type indefinitely;
- choose variation, prerequisite redirect, cross-axis spiral, confidence-restoration, or guided review.

Metadata should make this explicit through:

- `antiMonotonyFallback`;
- `noveltyType`;
- `coverageGapTarget` when applicable;
- `spiralRole` when applicable.

## 13. Evidence metadata requirement

Each StudyLoad must define what kind of evidence it is meant to produce.

Examples:

- procedural fluency;
- context modeling;
- representation transfer;
- prerequisite check;
- confidence restoration;
- validation of readiness;
- cross-axis coverage;
- error pattern identification.

A StudyLoad that does not define its evidence purpose is weak input for Bexauri's SRA.

## 14. Student-facing claim policy

Metadata must prevent overclaiming.

Allowed claims:

- this activity was completed;
- your answers were saved;
- this result helps prepare the next step;
- this is evidence from this activity;
- this is not a PAES score.

Disallowed in MVP-Beta:

- PAES score estimate;
- mastery status;
- theta estimate;
- official placement;
- autonomous AI adaptation claim;
- definitive diagnostic level.

## 15. Internal validation statuses

Recommended `internalValidationStatus` values:

- `proposal_only`
- `registry_aligned`
- `locally_rendered`
- `locally_submitted`
- `locally_completed`
- `locally_validated_as_corridor_component`
- `production_validated_internal_only`
- `superseded`

Use the narrowest truthful status.

## 16. Source reference policy

`sourceRefs` should point to register IDs, not raw prose.

Examples:

- `S-M1-003` for official Regular M1 temario.
- `S-M1-011` for official Regular selected M1 questions.
- `S-M1-013` for official Winter full M1 test.
- `S-M1-015` through `S-M1-022` for Curriculum Nacional course/program references.

Do not claim source alignment unless sourceRefs are meaningful and reviewed.

## 17. Expert validation workflow

Metadata should start as `not_reviewed` unless a real expert review exists.

Expert review may update:

- node mapping;
- difficulty band;
- prerequisite nodes;
- common error patterns;
- if strong/weak/mixed actions;
- anti-monotony fallback;
- student-facing claim policy.

Expert review remains asynchronous and non-blocking for normal student continuity.

## 18. Current registry transition policy

Existing registry-aligned 8-item activities may remain transitional while MVP-Beta stabilizes.

However, each should receive documented metadata before becoming part of a smarter selector.

Transition order recommendation:

1. Document metadata for existing algebra/functions activities.
2. Document metadata for balanced entry.
3. Document metadata for first Numbers, Geometry, and PE slices.
4. Only later implement metadata in registry/runtime.

## 19. Minimal metadata checklist for new content proposals

Before proposing a new StudyLoad, include:

```text
Title:
Content key:
Program:
StudyLoad kind:
Axis:
Primary taxonomy node:
PAES skill(s):
Difficulty band:
Prerequisites:
Evidence purpose:
Expected evidence signals:
Common error patterns:
If strong:
If weak:
If mixed:
Fallback:
Anti-monotony fallback:
Source refs:
Expert validation status:
Student-facing claims allowed:
Guardrails:
```

## 20. Not included in this phase

This phase does not:

- update `study-load-content.ts`;
- add runtime metadata;
- alter StudyLoad schema;
- create DB records;
- change UI;
- implement selector logic;
- implement tutor agent logic;
- make PAES score/mastery/theta/adaptive AI claims.

## 21. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2F - First non-algebra slice proposals`

Purpose:

- define first metadata-aligned Numbers, Geometry, and Probability/Statistics slices so Bexauri does not remain overconcentrated in the algebra/functions corridor.

Alternative:

`MVP-SRA-ROADMAP-2E-1 - Metadata pass for current algebra/functions registry activities`

Recommended order:

1. Metadata pass for existing algebra/functions and balanced entry.
2. First non-algebra slice proposals.
3. Expert review packet assembly.
4. Content registry metadata implementation proposal.
5. Rule-based selector prototype.

## 22. Handoff requirements

Future handoffs must preserve:

- StudyLoad metadata proposal exists;
- metadata is not yet implemented in code/runtime;
- next-load decisions should not infer only from contentKey/title;
- every future StudyLoad should define node, evidence purpose, next actions, fallback, anti-monotony, and source refs;
- expert review remains required before production-grade roadmap claims;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
