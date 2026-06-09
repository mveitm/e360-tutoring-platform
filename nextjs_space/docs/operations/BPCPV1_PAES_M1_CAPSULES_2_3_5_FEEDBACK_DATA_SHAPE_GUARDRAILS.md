# BPCPv1 PAES_M1 - Feedback data-shape guardrails for capsules 2, 3 and 5

**Phase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-FEEDBACK-DATA-SHAPE-GUARDRAILS-1`
**Nature:** Documentation-only data-shape guardrails.
**Scope:** No implementation, no registry planning, no UI/API implementation planning.

## 1. Executive verdict

```text
M1_CAPSULES_2_3_5_FEEDBACK_DATA_SHAPE_GUARDRAILS_DEFINED
```

Data-shape verdict:

```text
FEEDBACK_DATA_SHAPE_GUARDRAILS_DEFINED_READY_FOR_UI_API_LIFECYCLE_GUARDRAILS
```

Recommended primary mapping:

```text
MVP_STATIC_BRIEF_COMPLETE_ONLY
```

Conditional fallback mapping for later UI/API/lifecycle guardrails:

```text
MVP_COMPLETE_CONTAINS_STEP_BY_STEP
```

The current repo surface supports authored brief and complete feedback through `StudyLoadAuthoredFeedback`. It does not clearly expose separate native fields for step-by-step scripts, item-level rationale, distractor rationale, key-validation notes, or inference-limit notes.

Therefore, the safest documentation-level guardrail is to use the existing `brief` and `complete` shape as the MVP deployment candidate only if a future implementation phase authorizes it, while keeping step-by-step, rationales, distractor/error-family rationales, key-validation notes, and inference-limit notes as internal/reviewer documentation assets unless a later UI/API/lifecycle guardrail phase explicitly chooses a narrower student-facing treatment.

This document does not authorize implementation, code changes, schema changes, registry changes, continuity changes, route-order changes, API calls, deployed student-facing content, final implementation keys, Sales-Ready claims, or adaptive AI claims.

## 2. Purpose

This document answers:

```text
How should the documented assets for feedback breve, feedback completo, step-by-step, rationales, distractor/error-family rationales, key-validation notes and inference-limit notes be mapped, blocked, or deferred before any implementation plan?
```

It defines documentation-level data-shape guardrails for PAES_M1 capsules 2, 3 and 5 after source-finalization and key-validation. It is not an implementation plan and does not decide final UI, API, lifecycle, schema, registry, or deployment behavior.

## 3. Governance basis / documentos leidos

Mandatory documents read:

```text
PHASE_LOG.md
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_KEY_VALIDATION.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_SOURCE_FINALIZATION.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_SOURCE_KEY_GUARDRAILS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_IMPLEMENTATION_READINESS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_INTEGRATION.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_MINOR_ADJUSTMENTS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_REVIEW.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_FINAL_AUTHORING.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_LIMITED_AUTHORING_SCOPE.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_AUTHORING_READINESS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS_INTEGRATION.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_4_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md
```

Governing findings:

- Key-validation passed at documentation level for all capsule 2, 3 and 5 items, but keys remain candidate keys only.
- Capsule 2 is current live source; capsules 3 and 5 are source-finalized documentation plans, not implemented registry content.
- Final authoring produced feedback breve, feedback completo, step-by-step scripts, rationales, distractor/error-family rationales, key-validation notes and inference-limit notes as documentation assets.
- BPCPv1 requires useful feedback, cautious evidence language, reviewability and inference limits.
- No document authorizes schema, registry, UI/API, continuity, route-order or deployed student-facing changes in this phase.

## 4. Read-only technical surface inspected

Read-only files inspected:

```text
nextjs_space/lib/study-load-content.ts
nextjs_space/lib/study-load-continuity.ts
nextjs_space/lib/study-load-pedagogical-decision.ts
nextjs_space/app/now/page.tsx
nextjs_space/app/api/study-loads/[id]/complete/route.ts
nextjs_space/app/api/study-loads/[id]/responses/route.ts
nextjs_space/app/now/study-loads/[id]/page.tsx
nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx
```

Exact route observation:

- `nextjs_space/app/api/study-loads/[id]/respond/route.ts` was not present.
- The related response route is `nextjs_space/app/api/study-loads/[id]/responses/route.ts`.
- This absence is not treated as an error because the phase allowed locating real study-load response routes with `rg`.

Read-only search used:

```text
rg -n "StudyLoadAuthoredFeedback|authoredFeedback|briefId|completeId|brief|complete|feedback|step-by-step|stepByStep|rationale|inference|correctOptionKey|buildStudyLoadFeedback|StudyLoadItem|study-load|StudyLoad|complete feedback|paso a paso" nextjs_space/lib nextjs_space/app nextjs_space/docs/operations
```

## 5. Current observed feedback data shape

Confirmed current repo observation:

```text
StudyLoadAuthoredFeedback currently appears to support:
- briefId
- completeId
- version
- brief
- complete

StudyLoadItem currently appears to support:
- stem
- options
- correctOptionKey
- authoredFeedback

Current shape does not clearly expose separate native fields for:
- step-by-step script
- item-level rationale
- distractor rationale
- key-validation note
- inference-limit note
```

Additional observed behavior:

- `buildStudyLoadFeedback(...)` returns correctness information and authored brief/complete feedback when `authoredFeedback` is present.
- `POST /api/study-loads/[id]/responses` stores submitted answers, correctness, feedback IDs and feedback version in the `mc_submission` payload.
- The student answer form can display `authoredFeedbackBrief`.
- The student answer form currently displays `authoredFeedbackComplete` inside a details control labeled `paso a paso`.
- The current M1 capsule 2 live source has stems/options/keys but no authored feedback.
- Capsules 3 and 5 are not live registry entries in the inspected source.

Interpretation:

The repo has an existing brief/complete data shape and a UI affordance that can expose complete feedback as a step-by-step-like expansion. It does not have a structured BPCPv1 asset model for separate step-by-step, rationale, distractor rationale, key-validation note, or inference-limit note.

## 6. BPCPv1 authoring asset inventory

Per item, the documentation package for capsules 2, 3 and 5 contains:

- feedback breve;
- feedback completo;
- step-by-step script;
- item-level rationale;
- distractor or error-family rationale;
- key-validation note;
- inference-limit note.

Asset status:

| Asset | Documentation status | Implementation status |
|---|---|---|
| Feedback breve | Authored/documented | Not implemented for M1 capsules 2/3/5 |
| Feedback completo | Authored/documented | Not implemented for M1 capsules 2/3/5 |
| Step-by-step script | Authored/documented | No separate native field confirmed |
| Item-level rationale | Authored/documented | Internal only |
| Distractor/error-family rationale | Authored/documented | Internal only |
| Key-validation note | Authored/documented | Internal governance only |
| Inference-limit note | Authored/documented | Internal guardrail; may inform cautious student-facing copy later |

## 7. Data-shape definitions

`feedback breve`: concise item-level feedback that acknowledges the response, names the task focus, gives one central idea or correction, and points to one concrete review action.

`feedback completo`: fuller item-level explanation that can explain the task, the correct option logic, relevant misconception or distractor temptation with caution, and a review recommendation.

`step-by-step script`: item-specific sequence of 4-6 compact steps that guides calculation or interpretation and ends with a check.

`item-level rationale`: internal explanation of why the item exists, what it validates, and why the candidate key is pedagogically and mathematically coherent.

`distractor rationale`: internal explanation of why a specific wrong option may be tempting, treated as a hypothesis rather than a diagnosis.

`error-family rationale`: internal explanation of a likely family of errors when distractor-level explanation is not stable enough or when several distractors share a pattern.

`key-validation note`: internal governance note confirming that a candidate key passed documentation-level checks. It is not an implementation key.

`inference-limit note`: explicit limit on what may and may not be inferred from the item, the feedback, or the response pattern.

`student-facing asset`: text or data intended to be shown to the student in a future authorized UI.

`internal/reviewer asset`: text or data intended for authoring review, governance, quality control, implementation readiness, or future product decisions, not default student display.

`registry data shape`: the structure used by the content registry or source content object to represent item content and authored feedback.

`UI display shape`: the way an authorized frontend presents available data to the student or reviewer.

`implementation data shape`: the concrete fields, stored payloads, API response fields, and component props used in code after implementation is explicitly authorized.

## 8. Mapping decision for feedback breve

Recommended treatment:

```text
student-facing candidate, not deployed yet
```

Mapping guardrail:

- May map to existing `authoredFeedback.brief` only in a later implementation phase.
- Must remain concise and mobile-readable.
- Must not include key-validation notes, internal rationale, diagnosis, mastery, readiness, theta, score, route certainty, Sales-Ready or adaptive AI language.

Implementation readiness condition:

- Future UI/API/lifecycle guardrails must define where, when, and under what completion/submission state brief feedback is shown.

## 9. Mapping decision for feedback completo

Recommended treatment:

```text
student-facing candidate through complete/explanation mode, not deployed yet
```

Mapping guardrail:

- May map to existing `authoredFeedback.complete` only in a later implementation phase.
- Must remain item-specific, scannable and mobile-readable.
- May contain concise explanation of correct logic and cautious distractor temptation.
- Must not become a hidden diagnostic report.

Implementation readiness condition:

- Future UI/API/lifecycle guardrails must decide whether the UI label is "explicacion completa", "paso a paso", or another copy aligned with the actual content.

## 10. Mapping decision for step-by-step

Recommended treatment:

```text
internal/reviewer documentation asset by default
```

Conditional fallback:

```text
MVP_COMPLETE_CONTAINS_STEP_BY_STEP
```

Mapping guardrail:

- Step-by-step must not silently become a new field in this phase.
- Step-by-step must not be dropped without a documented fallback.
- If a future phase decides that MVP should surface concise step-by-step, it may fold a compact step-by-step segment into `authoredFeedback.complete` only if UI/API/lifecycle guardrails explicitly authorize that choice.
- If separate step-by-step persistence or analytics are required, that becomes `EXTENDED_FEEDBACK_DATA_SHAPE_REQUIRED` and blocks implementation planning until a future technical shape decision.

## 11. Mapping decision for item-level rationale

Recommended treatment:

```text
internal/reviewer documentation asset
```

Mapping guardrail:

- Do not deploy item-level rationale as direct student-facing text by default.
- It may inform feedback completo authoring, but should not appear as a product claim or diagnosis.
- It should be used by reviewers to audit item purpose, candidate key logic, and inference limits.

## 12. Mapping decision for distractor/error-family rationale

Recommended treatment:

```text
internal/reviewer documentation asset by default
```

Mapping guardrail:

- Distractor/error-family rationale may inform feedback completo wording.
- It must not be exposed as a diagnosis of the student.
- If used in student-facing feedback, it must be transformed into cautious language such as "esta opcion puede aparecer cuando..." rather than "you have this weakness."

## 13. Mapping decision for key-validation note

Recommended treatment:

```text
internal governance asset only
```

Mapping guardrail:

- Never student-facing.
- Never an implementation key by itself.
- Never a registry key by itself.
- Never authorization for source, registry, code, UI, API, continuity or route-order changes.

## 14. Mapping decision for inference-limit note

Recommended treatment:

```text
internal/reviewer asset that must inform future cautious language
```

Mapping guardrail:

- May inform student-facing cautious language later.
- Should remain explicit in documentation.
- Must prevent overclaiming in future UI copy, feedback copy, implementation tickets, and lifecycle messaging.
- Must block any mastery, readiness, score, theta, diagnostic certainty, route certainty, adaptive AI or Sales-Ready claim.

## 15. Recommended data-shape options

| Option | Decision | Reason |
|---|---|---|
| `MVP_STATIC_BRIEF_COMPLETE_ONLY` | Primary recommendation | Matches current repo shape, avoids schema/code assumptions, and lets rationales/notes remain internal. |
| `MVP_COMPLETE_CONTAINS_STEP_BY_STEP` | Conditional fallback | Possible only if future UI/API/lifecycle guardrails explicitly decide that concise step-by-step belongs inside `complete`. |
| `EXTENDED_FEEDBACK_DATA_SHAPE_REQUIRED` | Future option, not required before next guardrail phase | Needed only if separate fields are required for step-by-step, rationales, inference limits or reviewer assets. |
| `DEFER_IMPLEMENTATION_UNTIL_UI_DATA_SHAPE_DECISION` | Not primary | Current evidence is enough to define data-shape guardrails; implementation still remains blocked until UI/API/lifecycle guardrails. |

Primary recommendation:

```text
MVP_STATIC_BRIEF_COMPLETE_ONLY
```

Rationale:

- It respects the current observed `StudyLoadAuthoredFeedback` shape.
- It avoids inventing registry fields.
- It keeps internal governance assets out of student-facing payloads.
- It reduces risk of exposing rationale or key-validation notes.
- It preserves step-by-step through documentation and a conditional fallback rather than silently losing it.

## 16. Prohibited mappings

Prohibited:

- Mapping key-validation notes to student-facing UI.
- Mapping item-level rationales directly to student-facing feedback by default.
- Mapping distractor rationales as diagnosis.
- Adding new step-by-step, rationale, inference-limit or key-validation fields in this phase.
- Treating a documentation-level candidate key as an implementation key.
- Treating capsules 3 and 5 as registry-ready.
- Assuming schema/API/UI changes without explicit authorization.
- Dropping step-by-step assets because the current MVP shape has only `brief` and `complete`.
- Removing inference-limit protections from future student-facing copy.
- Using feedback to claim mastery, readiness, theta, PAES score, route certainty, adaptive AI or Sales-Ready status.

## 17. Guardrails table

| Guardrail ID | Asset | Recommended data-shape treatment | Student-facing? | Implementation readiness condition | Fail/block condition | Output required before implementation |
|---|---|---|---|---|---|---|
| FDG-01 | Feedback breve | Map later to `authoredFeedback.brief` if authorized | Candidate only | UI/API/lifecycle rules for display timing and state | Brief is only correct/incorrect or includes overclaim | UI/API/lifecycle guardrails |
| FDG-02 | Feedback completo | Map later to `authoredFeedback.complete` if authorized | Candidate only | UI label and mobile behavior defined | Complete becomes diagnostic or too long for mobile | UI/API/lifecycle guardrails |
| FDG-03 | Step-by-step script | Keep internal by default; optional fold into complete later | Not by default | Explicit decision whether complete may contain concise steps | Step-by-step silently lost or silently added as field | UI/API/lifecycle guardrails with step-by-step treatment |
| FDG-04 | Item-level rationale | Internal/reviewer asset | No | Product decision if ever transformed into student copy | Rationale displayed directly as explanation/diagnosis | Reviewer/internal asset boundary |
| FDG-05 | Distractor rationale | Internal/reviewer asset; may inform cautious feedback | No by default | Transformation rules for cautious language | Distractor rationale exposed as student diagnosis | Distractor language guardrail |
| FDG-06 | Error-family rationale | Internal/reviewer asset; may inform feedback completo | No by default | Error-family language remains hypothetical | Error family claims unsupported student state | Error-family language guardrail |
| FDG-07 | Key-validation note | Internal governance only | No | Never implemented directly | Key-validation note treated as implementation key or UI text | Key boundary reminder |
| FDG-08 | Inference-limit note | Internal guardrail; informs cautious copy | No by default | Future copy shows inference limits or avoids overclaiming | Inference limits omitted from deployed feedback | Inference-limit copy guardrail |
| FDG-09 | Current brief/complete shape | Use only existing fields unless later extended | Depends on asset | Implementation plan confirms no hidden schema change | Schema/API/UI changes assumed early | Technical shape confirmation |
| FDG-10 | Capsules 3/5 source assets | Documentation-only source-finalized plans | No deployed content yet | Registry readiness phase explicitly authorizes content | 3/5 marked registry-ready here | Registry/source status boundary |

## 18. Risk table

| Risk ID | Severity | Area | Risk | Guardrail response |
|---|---|---|---|---|
| R-01 | HIGH | Step-by-step | Step-by-step silently lost if only brief/complete are implemented | Keep step-by-step internal by default and require explicit fold-or-extend decision. |
| R-02 | HIGH | Rationale | Rationales accidentally exposed as diagnosis | Classify rationales as internal/reviewer assets by default. |
| R-03 | BLOCKER | Governance | Key-validation notes exposed to student | Prohibit student-facing key-validation notes. |
| R-04 | HIGH | Inference limits | Inference limits omitted from deployed feedback | Require inference-limit guardrails before implementation planning. |
| R-05 | MEDIUM | Brief feedback | Brief feedback too short to be useful | Require task focus, central idea and next action. |
| R-06 | MEDIUM | Complete feedback | Complete feedback becomes too long for mobile | Require scannable, item-specific complete feedback and later mobile guardrails. |
| R-07 | HIGH | Data shape | Existing shape insufficient for all BPCPv1 assets | Use brief/complete as MVP primary only; carry extension option if later needed. |
| R-08 | BLOCKER | Scope | Schema/API/UI changes assumed without explicit authorization | Keep this phase documentation-only and require next guardrail phase. |
| R-09 | BLOCKER | Registry | Content registry expanded before data-shape decision | Prohibit registry changes and source-code changes. |
| R-10 | HIGH | UI label | `complete` displayed as "paso a paso" even when content is not a step sequence | Require UI/API/lifecycle guardrail to align label and content semantics. |

## 19. Required decisions before implementation plan

Before any implementation plan, a later phase must decide:

- Whether `authoredFeedback.brief` is the only brief feedback carrier for MVP.
- Whether `authoredFeedback.complete` is explanation-only or may include concise step-by-step.
- Whether the UI label should be "explicacion completa", "paso a paso", or another term.
- Whether step-by-step remains internal or is folded into complete for MVP.
- Whether separate step-by-step fields are necessary later.
- Whether rationales remain purely internal or may inform transformed student-facing copy.
- How inference-limit language is preserved in student-facing feedback without overloading the UI.
- How feedback is stored in `mc_submission` and reviewed without exposing internal governance notes.
- How capsules 3 and 5 move from source-finalized documentation plans to any future registry-readiness gate.

## 20. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-UI-API-LIFECYCLE-GUARDRAILS-1
```

Purpose:

```text
Define UI, API and lifecycle guardrails for how the selected feedback data-shape can be surfaced later without implementation, route-order changes or overclaiming.
```

This next phase should decide display timing, API payload boundaries, completion/review lifecycle, mobile copy, `complete` vs `paso a paso` labeling, and how inference limits are preserved.

## 21. What remains blocked

Still blocked:

- implementation;
- code changes;
- DB/schema/endpoints;
- registry changes;
- continuity changes;
- route-order changes;
- source-code changes;
- source content changes;
- candidate key changes;
- final implementation keys;
- marking capsules 3 and 5 as registry-ready;
- generated capsules;
- API calls;
- runtime tests;
- browser tests;
- deployed student-facing content;
- Sales-Ready claims;
- adaptive AI claims;
- mastery, readiness, theta, PAES score, diagnostic certainty or route certainty claims.

## 22. Final verdict

```text
FEEDBACK_DATA_SHAPE_GUARDRAILS_DEFINED_READY_FOR_UI_API_LIFECYCLE_GUARDRAILS
```

Result:

```text
M1_CAPSULES_2_3_5_FEEDBACK_DATA_SHAPE_GUARDRAILS_DEFINED
```

