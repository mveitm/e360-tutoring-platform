# BPCPv1 PAES_M1 - Guardrails de fuente y claves capsulas 2, 3 y 5

## 1. Executive verdict

Result:

```text
M1_CAPSULES_2_3_5_SOURCE_KEY_GUARDRAILS_DEFINED
```

Guardrails verdict:

```text
SOURCE_KEY_GUARDRAILS_DEFINED_SOURCE_FINALIZATION_REQUIRED_FIRST
```

The source-finalization and key-validation guardrails for PAES_M1 capsules 2, 3 and 5 are defined. These guardrails are sufficient to govern a later implementation-planning path, but they do not clear the path to implementation planning yet because capsules 3 and 5 remain source-authoring candidates, not source-finalized documentation plans or registry-ready sources.

Capsule 2 may later enter planning sooner because it is current live source. Capsules 3 and 5 must first pass source-finalization and key-validation at documentation level.

## 2. Purpose

This document answers:

```text
What exact conditions must be met so the sources and keys for capsules 2, 3 and 5 can later enter an implementation-plan phase without treating candidates as registry-ready sources or implementation keys?
```

This phase defines guardrails only. It does not implement, plan implementation, modify registry, change source content, change candidate keys, change continuity, or touch UI/API/schema.

## 3. Governance basis / documentos leidos

Documents read:

- `PHASE_LOG.md`
- `CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `DOCUMENTATION_INDEX_MVP_M1.md`
- `CODEX_LATEST_COMPACT_REPORT.md`
- `BPCPV1_PAES_M1_CAPSULES_2_3_5_IMPLEMENTATION_READINESS.md`
- `BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_INTEGRATION.md`
- `BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_MINOR_ADJUSTMENTS.md`
- `BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_REVIEW.md`
- `BPCPV1_PAES_M1_CAPSULES_2_3_5_FINAL_AUTHORING.md`
- `BPCPV1_PAES_M1_CAPSULES_2_6_LIMITED_AUTHORING_SCOPE.md`
- `BPCPV1_PAES_M1_CAPSULES_2_6_AUTHORING_READINESS.md`
- `BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS_INTEGRATION.md`
- `BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS.md`
- `BPCPV1_PAES_M1_CAPSULES_2_4_FICHAS.md`
- `BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md`
- `BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md`
- `BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md`

## 4. Read-only technical surface inspected

Read-only technical files inspected:

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-pedagogical-decision.ts`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_SOURCE_AUTHORING.md`

Observed surface:

- `study-load-content.ts` is the current static content registry.
- `StudyLoadItem` includes `stem`, `options`, optional `correctOptionKey`, and optional `authoredFeedback`.
- `StudyLoadAuthoredFeedback` currently supports brief and complete feedback, not separate rationale or step-by-step fields.
- `paes_m1_linear_equations_basic` exists as current live source.
- `paes_m1_numbers_percentage_proportionality_entry` and `paes_m1_geometry_area_measure_entry` were not found as live registry entries in the inspected content source.
- Current M1 continuity remains rule-based and AS1-heavy; it does not include capsules 3 and 5.

## 5. Definitions

| Term | Definition |
|---|---|
| current live source | A content entry currently present in `study-load-content.ts` with `contentKey`, item stems, options and `correctOptionKey` values available to runtime. |
| source-authoring candidate | A documentation-level source proposal with stems, options, candidate keys and rationales, but not implemented in the live registry. |
| source-finalized documentation plan | A reviewed documentation artifact that freezes title, contentKey, item order, stems, options, candidate keys, source status and links to ficha/authoring/review records before implementation planning. |
| registry-ready source | A source package approved for a future registry implementation plan. It still is not code, but it has passed source-finalization and key-validation guardrails. |
| candidate key | A proposed correct option from current source, ficha or source-authoring. It is not approved for implementation. |
| validated documentation key | A candidate key that has passed item-level documentation checks against stem, options, rationale, feedback and step-by-step. It is still not an implementation key. |
| implementation key | A key committed to implementation source in a future authorized code/registry phase after explicit validation. This phase creates none. |

## 6. Capsule 2 source guardrail

Capsule 2:

```text
contentKey: paes_m1_linear_equations_basic
source status: current live source in study-load-content.ts
```

Guardrail:

- Capsule 2 may enter implementation planning only after key-validation and data-shape guardrails are recorded.
- Current live source status does not make its keys final implementation keys.
- Implementation planning must preserve that capsule 2 alone can increase AS1 overrepresentation if not paired with a governed multi-axis plan.

Pass condition:

- q1-q4 stems, options and current `correctOptionKey` values match ficha and authoring assets.
- Each candidate key is validated against rationale, feedback completo, step-by-step and inference-limit note.
- Planning records how capsule 2 remains part of a 2/3/5 multi-axis package, not an AS1-only path.

Fail/block condition:

- any mismatch between current source, authoring asset and key;
- any plan that treats capsule 2 implementation as a route/continuity decision;
- any plan that uses capsule 2 alone to justify AS1 dominance.

## 7. Capsule 3 source guardrail

Capsule 3:

```text
contentKey: paes_m1_numbers_percentage_proportionality_entry
source status: revised documentation-level source-authoring candidate
```

Guardrail:

- Capsule 3 cannot be treated as registry-ready.
- It must pass a source-finalized documentation plan before implementation planning.
- The source-finalized plan must freeze final source title, final contentKey, final item stems, final options, final candidate keys, item order and item count.

Pass condition:

- source-finalized plan exists;
- item details match ficha, authoring, review and minor adjustment records;
- all key-validation checks pass;
- plan states explicitly that implementation remains blocked until a later code/registry phase.

Fail/block condition:

- missing or conflicting stem/options;
- any required item wording change;
- any mismatch between key, rationale, feedback or step-by-step;
- any label implying registry-ready before guardrails pass.

## 8. Capsule 5 source guardrail

Capsule 5:

```text
contentKey: paes_m1_geometry_area_measure_entry
source status: revised documentation-level source-authoring candidate
```

Guardrail:

- Capsule 5 cannot be treated as registry-ready.
- It must pass a source-finalized documentation plan before implementation planning.
- The source-finalized plan must freeze final source title, final contentKey, final item stems, final options, final candidate keys, item order and item count.

Pass condition:

- source-finalized plan exists;
- item details match ficha, authoring, review and minor adjustment records;
- all key-validation checks pass;
- plan states explicitly that implementation remains blocked until a later code/registry phase.

Fail/block condition:

- missing or conflicting geometry/measure item details;
- any item requiring wording repair before finalization;
- any mismatch between area/perimeter/unit logic, key, rationale, feedback or step-by-step;
- any claim that capsule 5 is live registry source before code/registry authorization.

## 9. Shared key-validation guardrail

Every item in capsules 2, 3 and 5 must pass key-validation before implementation planning.

Per-item key-validation must check:

- stem matches documented source;
- options match documented source;
- candidate key points to the correct option;
- candidate key is mathematically correct;
- candidate key matches item-level rationale;
- candidate key matches feedback completo;
- candidate key matches step-by-step script;
- distractor rationales correspond to actual distractors or declared error families;
- inference-limit note avoids overclaiming;
- reviewer records pass/fail status before any implementation plan.

Output artifact required:

```text
Per-item key-validation record for q1-q4 in capsules 2, 3 and 5.
```

## 10. Per-capsule key-validation checklist

| Capsule | Required item checks | Additional capsule-specific check |
|---|---|---|
| 2 | q1-q4: equation stem, options, candidate key, inverse-operation rationale, feedback completo, step-by-step and inference limit. | Confirm current live source matches authoring asset exactly enough for planning. |
| 3 | q1-q4: percent/proportion stem, options, candidate key, base/relation rationale, feedback completo, step-by-step and inference limit. | Confirm source-finalized plan exists before implementation planning. |
| 5 | q1-q4: geometry/measure stem, options, candidate key, magnitude/unit rationale, feedback completo, step-by-step and inference limit. | Confirm source-finalized plan exists before implementation planning. |

Validation statuses allowed:

- `KEY_VALIDATION_PASS_DOCUMENTATION_LEVEL`
- `KEY_VALIDATION_FAIL_BLOCKER`
- `KEY_VALIDATION_DEFERRED_SOURCE_NOT_FINALIZED`

No status in this phase creates an implementation key.

## 11. Source-finalization checklist for capsules 3 and 5

Capsules 3 and 5 require a source-finalized documentation plan with:

- final source title;
- final contentKey;
- final item stems;
- final answer options;
- final candidate keys;
- final item order;
- final item count;
- final source status label;
- link to ficha;
- link to authoring;
- link to review record;
- link to minor adjustment record;
- explicit statement: not implemented until later code/registry phase.

Required source status label after successful finalization:

```text
SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED
```

## 12. Registry-readiness boundary

Registry-ready source is not the same as implemented source.

Registry-readiness may be claimed only after:

- source-finalized documentation plan exists;
- key-validation record exists;
- feedback/rationale alignment has no blocker;
- data-shape questions are carried forward;
- implementation remains explicitly future and separate.

This phase does not mark capsule 3 or capsule 5 as registry-ready.

## 13. Implementation-key boundary

Implementation keys can exist only in a future authorized implementation phase.

Before that, keys may only be:

- candidate keys;
- validated documentation keys.

Neither status permits code, registry, UI, API, schema, route-order or continuity changes.

## 14. Feedback/rationale alignment boundary

Before implementation planning, each item must confirm:

- feedback breve matches the final source wording;
- feedback completo explains the same task as the final stem;
- step-by-step solves the same task and not a nearby variant;
- item rationale explains the validated documentation key;
- distractor rationale or error-family rationale maps to actual distractors;
- inference-limit note remains cautious.

If feedback/rationale requires changing item wording, stop and mark a source-finalization blocker.

## 15. Stop conditions

Stop or mark blocker if:

- any key appears inconsistent;
- any source stem/options are incomplete;
- any item requires wording change before source finalization;
- any feedback/rationale no longer matches the finalized source;
- any guardrail would require code/schema/registry change in this phase;
- any language implies implementation-ready before guardrails pass;
- any route/continuity change is needed to make the plan coherent.

## 16. Guardrails table

| Guardrail ID | Applies to | Purpose | Required checks | Pass condition | Fail/block condition | Output artifact required |
|---|---|---|---|---|---|---|
| G-SK-001 | Capsule 2 | Keep current live source separate from implementation readiness. | Match live stem/options/key to ficha and authoring. | All q1-q4 match and no source conflict appears. | Any mismatch between live source and authoring. | Capsule 2 source/key validation note. |
| G-SK-002 | Capsule 3 | Prevent candidate source from being treated as registry-ready. | Finalize title, contentKey, stems, options, keys, order and count. | `SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED` exists. | Missing finalization artifact or conflicting item details. | Capsule 3 source-finalized documentation plan. |
| G-SK-003 | Capsule 5 | Prevent candidate source from being treated as registry-ready. | Finalize title, contentKey, stems, options, keys, order and count. | `SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED` exists. | Missing finalization artifact or conflicting item details. | Capsule 5 source-finalized documentation plan. |
| G-SK-004 | Capsules 2/3/5 | Prevent candidate keys becoming implementation keys. | Per-item key-validation checklist. | All items pass documentation-level validation. | Any item fails math/source/rationale/feedback alignment. | Per-item key-validation table. |
| G-SK-005 | Capsules 2/3/5 | Align feedback/rationale/step-by-step to final source. | Compare final stem/options/key against feedback completo, step-by-step and rationales. | No mismatch; inference limits preserved. | Feedback solves a different task or overclaims. | Feedback/rationale alignment record. |
| G-SK-006 | Capsules 2/3/5 | Prevent premature code/UI/API/schema work. | Confirm no guardrail requires implementation in this phase. | All changes remain documentation-only. | Any needed code/schema/registry change appears. | Explicit non-implementation statement. |
| G-SK-007 | Capsule 2 | Prevent AS1 overrepresentation. | Confirm capsule 2 is planned with 3/5 multi-axis guardrail. | Plan preserves non-AS1 follow-up. | Capsule 2 is isolated as AS1-only path. | AS1 overrepresentation guardrail note. |

## 17. Risk table

| Risk ID | Severity | Area | Risk | Guardrail response |
|---|---|---|---|---|
| SKR-001 | BLOCKER | Source | Treating 3/5 source-authoring candidates as live registry content. | Require source-finalized documentation plans before implementation planning. |
| SKR-002 | HIGH | Keys | Treating candidate keys as implementation keys. | Require per-item key-validation records and preserve implementation-key boundary. |
| SKR-003 | HIGH | Implementation scope | Moving to UI/code work before data-shape decision. | Keep this phase documentation-only and require future data-shape gate. |
| SKR-004 | MEDIUM | Sequence | Implementing capsule 2 alone and increasing AS1 tunnel risk. | Require AS1 overrepresentation guardrail if capsule 2 is planned separately. |
| SKR-005 | HIGH | Source integrity | Silently changing item stems/options during source finalization. | Require finalization artifact and stop condition for wording changes. |
| SKR-006 | HIGH | Feedback alignment | Feedback/rationales do not match final source wording. | Require feedback/rationale alignment record. |
| SKR-007 | HIGH | Step-by-step | Step-by-step script solves a different task than the final item. | Compare step-by-step against finalized source before planning. |
| SKR-008 | BLOCKER | Labels | Registry-ready label used before source and keys are validated. | Ban registry-ready label until guardrails pass. |

## 18. Recommended next path

Recommended path:

1. Finalize sources for capsules 3 and 5 at documentation level.
2. Validate keys for capsules 2, 3 and 5 at documentation level.
3. Confirm feedback/rationale/step-by-step alignment to finalized sources.
4. Preserve capsule 2 current live source status without converting its keys into implementation keys.
5. Only after these artifacts exist, consider an implementation-plan phase.

Capsule 2 can be planned separately later only if the plan includes an AS1 overrepresentation guardrail and does not imply route/continuity change.

## 19. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-SOURCE-FINALIZATION-1
```

Purpose:

```text
Create source-finalized documentation plans for capsule 3 and capsule 5, freezing titles, contentKeys, stems, options, candidate keys, item order, item count and source status before implementation planning.
```

## 20. What remains blocked

Still blocked:

- implementation;
- implementation plan;
- code changes;
- registry changes;
- source content changes;
- candidate key changes;
- final implementation keys;
- DB/schema/endpoints;
- UI changes;
- continuity changes;
- route-order changes;
- generated capsules;
- API calls or external API calls;
- deployed student-facing content;
- Sales-Ready claims;
- adaptive AI claims;
- mastery, readiness, theta, PAES score, diagnostic certainty or route certainty claims.

## 21. Final verdict

Result:

```text
M1_CAPSULES_2_3_5_SOURCE_KEY_GUARDRAILS_DEFINED
```

Guardrails verdict:

```text
SOURCE_KEY_GUARDRAILS_DEFINED_SOURCE_FINALIZATION_REQUIRED_FIRST
```

The guardrails are defined. The safe next step is source-finalization for capsules 3 and 5 before any implementation plan. Capsule 2 remains current live source but still requires key-validation and AS1 overrepresentation guardrails before implementation planning.
