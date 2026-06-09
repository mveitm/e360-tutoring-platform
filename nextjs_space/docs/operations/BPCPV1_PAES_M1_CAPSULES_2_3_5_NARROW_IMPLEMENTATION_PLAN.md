# BPCPv1 PAES M1 Capsules 2/3/5 Narrow Implementation Plan

Phase:
`MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-NARROW-IMPLEMENTATION-PLAN-1`

Result:
`M1_CAPSULES_2_3_5_NARROW_IMPLEMENTATION_PLAN_DRAFTED`

## 1. Executive verdict

Verdict:
`NARROW_IMPLEMENTATION_PLAN_DRAFTED_READY_FOR_CODE_PHASE_AUTHORIZATION_REVIEW`

The prior source, key, data-shape, UI/API/lifecycle, and implementation-plan audit chain is sufficient to draft this narrow future implementation plan. This document does not authorize code work. A later code phase still requires explicit Mauricio or ChatGPT authorization and must re-check exact source, keys, feedback shape, labels, and scope before writing.

## 2. Purpose

Define the narrow, safe, sequenced plan for a later phase to implement PAES_M1 capsule 2 authored feedback enrichment and prepare source-finalized registry insertion candidates for capsules 3 and 5, while preserving all source/key/data-shape/UI/API/lifecycle guardrails.

This is a documentation-only plan. It does not edit source, registry, schema, UI, API, continuity, route order, candidate keys, or student-facing deployed content.

## 3. Governance basis / documentos leidos

Read before drafting:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_IMPLEMENTATION_PLAN_AUDIT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_UI_API_LIFECYCLE_GUARDRAILS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_FEEDBACK_DATA_SHAPE_GUARDRAILS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_KEY_VALIDATION.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_SOURCE_FINALIZATION.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_SOURCE_KEY_GUARDRAILS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_INTEGRATION.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_MINOR_ADJUSTMENTS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_AUTHORING_REVIEW.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_FINAL_AUTHORING.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_LIMITED_AUTHORING_SCOPE.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_AUTHORING_READINESS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS_INTEGRATION.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md`
- `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md`

The governing chain preserves documentation-first control, source traceability, cautious feedback, no overclaiming, and explicit human authorization before implementation.

## 4. Read-only technical surface inspected

Read-only surfaces inspected:

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-pedagogical-decision.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `nextjs_space/app/api/study-loads/[id]/responses/route.ts`
- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`

Observed current surface:

- `StudyLoadAuthoredFeedback` supports `briefId`, `completeId`, `version`, `brief`, and `complete`.
- `StudyLoadItem` supports `stem`, `options`, optional `correctOptionKey`, and optional `authoredFeedback`.
- `buildStudyLoadFeedback` can expose `authoredFeedbackBrief`, `authoredFeedbackComplete`, and feedback ids/version after a selected answer.
- The answer form displays brief feedback and places complete feedback in a details area currently labeled `paso a paso`.
- The responses route stores `mc_submission` payload data, answer correctness, and feedback ids/version without changing `StudyLoad.status`.
- The complete route remains the self-report and completion boundary and calls continuity after completion.
- `study-load-continuity.ts` currently sequences existing live M1 capsules and does not include the capsule 3/5 target keys.

The required read-only `rg` search was run across `nextjs_space/lib`, `nextjs_space/app`, and `nextjs_space/docs/operations`.

## 5. Scope statement

The future code phase may only plan to:

1. Add `authoredFeedback` to existing live capsule 2 items.
2. Add source-finalized capsules 3 and 5 to `study-load-content.ts` or equivalent registry source with frozen stems/options and rechecked keys.
3. Map feedback breve to `authoredFeedback.brief`.
4. Map feedback completo to `authoredFeedback.complete`.
5. Preserve feedback ids/version conventions.
6. Preserve current response submission flow.
7. Preserve current completion/self-report flow.
8. Preserve continuity and route-order unchanged.
9. Adjust UI label only if complete feedback content would be mislabeled as `paso a paso`, and only if a future code phase explicitly authorizes that UI copy change.

This phase only drafts the plan. It does not execute any step above.

## 6. Non-goals

- No DB/schema changes.
- No Prisma changes.
- No endpoint contract expansion unless a future code phase explicitly proves it is unnecessary or safe.
- No new adaptive routing.
- No continuity changes.
- No route-order changes.
- No scoring/theta/mastery/readiness.
- No Sales-Ready claims.
- No deployed public commercial content.
- No broad content generation.
- No capsules 4 and 6.
- No payment/access changes.
- No admin analytics expansion.
- No runtime/browser/API/build testing in this documentation phase.

## 7. Implementation principles

- Preserve frozen source and validated documentation-level keys until exact code insertion recheck.
- Treat documentation-level keys as evidence, not final implementation keys.
- Use the existing `authoredFeedback.brief` and `authoredFeedback.complete` shape as the primary future mapping.
- Keep internal authoring and governance assets out of student-facing payloads.
- Keep completion, self-report, continuity, and route-order behavior unchanged.
- Prefer split code phases over one broad phase.
- Stop rather than improvise if source, keys, labels, payloads, or scope conflict.

## 8. Current source/content state

Capsule 2:

- Live contentKey: `paes_m1_linear_equations_basic`
- Treatment: add `authoredFeedback` only; do not rewrite stems/options/keys.
- Current live item count: 4.

Capsule 3:

- Target contentKey: `paes_m1_numbers_percentage_proportionality_entry`
- Treatment: future narrow registry insertion candidate only after exact source/key recheck.
- Source status before code: `SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED`.

Capsule 5:

- Target contentKey: `paes_m1_geometry_area_measure_entry`
- Treatment: future narrow registry insertion candidate only after exact source/key recheck.
- Source status before code: `SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED`.

## 9. Target content changes to plan, not execute

Planned later changes are limited to:

- Capsule 2: enrich existing items with authored feedback using existing shape.
- Capsule 3: insert a static content entry from frozen source if recheck passes.
- Capsule 5: insert a static content entry from frozen source if recheck passes.
- Feedback: map brief/complete only to existing authoredFeedback fields.
- Labels: consider a minimal UI label correction only if complete feedback is not truly step-by-step.

No current source content changes are made in this phase.

## 10. Capsule 2 planned treatment

- Existing item count remains 4.
- Existing stems/options/keys remain unchanged.
- Future code phase may add `authoredFeedback` per item.
- Future code phase must preserve `contentKey` and `contentVersion` unless an explicit versioning decision is documented.
- If adding `authoredFeedback` changes `contentVersion` expectations, stop for governance review.
- Capsule 2 remains live source; this plan does not authorize source/key rewrite.

## 11. Capsule 3 planned treatment

- Future code phase may insert a new static `StudyLoad` content entry only if frozen source is copied exactly from the source-finalization document.
- Future code phase must recheck each stem, option, and candidate key before writing.
- Future code phase must not mark the capsule as adaptive, diagnostic, Sales-Ready, registry-ready by default, or route-changing.
- The target entry must preserve the source-finalized item order and item count.
- Any mismatch requires a repair/review phase before code continues.

## 12. Capsule 5 planned treatment

- Future code phase may insert a new static `StudyLoad` content entry only if frozen source is copied exactly from the source-finalization document.
- Future code phase must recheck each stem, option, and candidate key before writing.
- Future code phase must not mark the capsule as adaptive, diagnostic, Sales-Ready, registry-ready by default, or route-changing.
- The target entry must preserve the source-finalized item order and item count.
- Any mismatch requires a repair/review phase before code continues.

## 13. Feedback mapping plan

- Feedback breve -> `authoredFeedback.brief`.
- Feedback completo -> `authoredFeedback.complete`.
- `authoredFeedback.briefId`, `authoredFeedback.completeId`, and `authoredFeedback.version` must be systematic and stable.
- Complete feedback may contain concise step-by-step content only if it actually matches the UI label decision.
- Raw rationales, key-validation notes, source-finalization notes, implementation-readiness notes, and raw inference-limit notes remain internal and must not be encoded as student-facing `authoredFeedback`.
- Inference-limit language may inform cautious student-facing copy, but not appear as raw governance notes.

## 14. Key handling plan

- Documentation-level keys are not implementation keys.
- Future code phase must recheck exact code item source before setting or preserving `correctOptionKey`.
- Any mismatch in key/stem/options requires stop and repair phase.
- No candidate key may be changed silently.
- Future code review must compare the code-level `correctOptionKey` values against the validated source and item order before commit.

## 15. UI label plan

- If `authoredFeedback.complete` is explanation-only, label should be `Ver explicacion` or `Explicacion completa`, not `Paso a paso`.
- If `authoredFeedback.complete` includes ordered steps, `Paso a paso` may remain acceptable.
- Future code phase must inspect actual complete feedback content before deciding whether UI copy change is required.
- If UI copy change is needed, it must be minimal and limited to label semantics.
- No UI copy may imply diagnosis, route certainty, mastery, readiness, theta, score, adaptive AI, or Sales-Ready status.

## 16. API/payload plan

- Existing student-facing payload may expose only brief/complete and ids/version as already supported or safely mapped.
- Do not expose rationales, key-validation notes, source-finalization notes, implementation-readiness notes, or raw inference-limit notes.
- Do not add new payload fields unless a future code phase explicitly authorizes and scopes them.
- Preserve `mc_submission` as the answer submission evidence boundary.
- Preserve feedback ids/version as traceability metadata, not claims of mastery or diagnosis.

## 17. Lifecycle plan

- Feedback appears only after stable accepted submission / `mc_submission`.
- Feedback display must not mutate `StudyLoad.status`.
- Feedback display must not bypass self-report.
- Feedback display must not complete `StudyLoad`.
- Feedback display must not create next `StudyLoad`.
- Completion remains governed by the existing complete route and self-report.
- Continuity remains post-completion and best-effort under the existing completion flow.

## 18. Continuity/route-order no-change plan

- Do not edit `nextjs_space/lib/study-load-continuity.ts`.
- Do not add capsules 3/5 to continuity unless a future separate phase authorizes route/continuity planning.
- Do not reorder capsules.
- Do not create adaptive route decisions.
- Do not edit `nextjs_space/lib/study-load-pedagogical-decision.ts` for this narrow content/feedback work.

## 19. Internal asset handling plan

Keep internal only:

- item-level rationale
- distractor/error-family rationale
- key-validation note
- raw inference-limit note
- source-finalization status
- implementation-readiness blocker notes

May inform copy but must not appear raw:

- inference-limit note
- cautious distractor language

## 20. Proposed file-touch plan for future code phase

Candidate future files:

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`

The UI file should be touched only if label audit shows the current `paso a paso` label would misrepresent complete feedback. If no UI label change is needed, future code phase should avoid touching UI.

Files that should not be touched in the narrow future code phase unless a blocker is found:

- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-pedagogical-decision.ts`
- Prisma/schema files
- DB migration files
- payment/access/admin analytics files

## 21. Proposed verification plan for future code phase

Future code phase verification should include:

- static source diff inspection
- stem/options/key manual recheck
- `authoredFeedback` shape inspection
- no internal asset leakage check via `rg`
- no continuity diff check
- no route-order diff check
- TypeScript/build check if code changes are made
- optional targeted unit/static validation if existing scripts support it

No build, runtime, browser, or API tests are run in this documentation phase.

## 22. Stop conditions for future code phase

Stop if any of the following occurs:

- frozen source mismatch
- key mismatch
- stem/options changed unexpectedly
- need for schema/DB/API expansion
- need for continuity or route-order change
- `authoredFeedback` cannot be mapped to current shape
- complete feedback label would misrepresent content and UI copy change is not authorized
- internal rationale/key-validation/inference-limit notes would leak to student-facing surfaces
- implementation scope expands to capsules 4/6, scoring, adaptive routing, payment/access, or Sales-Ready claims

## 23. Phase split recommendation

Recommended split:

1. `CODE-PREP/AUTHORIZATION REVIEW`: approve exact narrow code scope from this plan.
2. `CODE PHASE A`: add `authoredFeedback` to existing capsule 2 only.
3. `CODE PHASE B`: add registry entries for capsules 3 and 5 only after source/key recheck.
4. `CODE PHASE C` only if needed: minimal UI label correction.

This split is safer than a single broad phase because capsule 2 is a live enrichment task, capsules 3/5 are registry insertion candidates, and UI label changes should occur only if actual complete feedback semantics require them.

## 24. Risk table

| Risk ID | Severity: LOW / MEDIUM / HIGH / BLOCKER | Area | Risk | Plan response | Stop/mitigation |
| --- | --- | --- | --- | --- | --- |
| R1 | HIGH | Scope | Future code phase becomes too broad. | Split phases and limit file-touch plan. | Stop if scope expands beyond capsule 2 feedback, capsule 3/5 registry candidates, or label-only UI correction. |
| R2 | HIGH | Source | Capsule 3/5 source copied incorrectly. | Require exact frozen source recheck before writing. | Stop and repair on any stem/options/item-order mismatch. |
| R3 | HIGH | Keys | Documentation keys treated as implementation keys. | Require code-time recheck. | Stop on any key/stem/options mismatch or silent key change. |
| R4 | MEDIUM | UI | Feedback complete mislabeled as `paso a paso`. | Future label audit before UI decision. | Use `Ver explicacion` or `Explicacion completa` unless complete has ordered steps. |
| R5 | HIGH | Student-facing boundary | Internal rationales exposed. | Keep rationales and governance notes internal. | Run no-leakage `rg` check in code phase. |
| R6 | MEDIUM | Feedback quality | Step-by-step silently lost. | Allow step content only if explicitly folded into complete and label matches. | Stop if step-by-step is required but cannot map safely. |
| R7 | HIGH | Continuity | Continuity changed accidentally. | Exclude continuity files from planned touch set. | Confirm no continuity diff before commit. |
| R8 | HIGH | Route order | Route-order changed accidentally. | Exclude route-order edits. | Confirm no route-order diff before commit. |
| R9 | MEDIUM | API | API payload expands unnecessarily. | Use existing brief/complete and ids/version only. | Stop if new fields become necessary without explicit authorization. |
| R10 | MEDIUM | Versioning | Capsule 2 enrichment blocks because of contentVersion uncertainty. | Preserve contentVersion unless explicit decision exists. | Stop for governance review if version semantics are unclear. |
| R11 | BLOCKER | Schema/DB | Code touches schema or DB unnecessarily. | Declare schema/DB non-goals. | Stop immediately if schema/DB edits become necessary. |

## 25. Implementation checklist for future phase

1. Confirm clean Git baseline.
2. Re-open source-finalization/key-validation docs.
3. Recheck capsule 2 live source.
4. Recheck capsule 3 frozen source.
5. Recheck capsule 5 frozen source.
6. Recheck all `correctOptionKey` mappings.
7. Add `authoredFeedback` for capsule 2 or plan to do so.
8. Add capsule 3 registry entry or plan to do so.
9. Add capsule 5 registry entry or plan to do so.
10. Confirm no internal asset leakage.
11. Confirm no continuity diff.
12. Confirm no route-order diff.
13. Confirm UI label semantics.
14. Run allowed static/build checks in code phase.
15. Produce compact report for ChatGPT review.

## 26. Required human authorization before code

After this plan, code still cannot begin until Mauricio or ChatGPT provides a new explicit code-phase prompt authorizing the exact code scope.

The likely first authorization target is a narrow review/authorization phase, probably starting with capsule 2 authoredFeedback enrichment only.

## 27. Recommended next phase

Recommended next phase:

`MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-CODE-PHASE-AUTHORIZATION-REVIEW-1`

Purpose:

Review the narrow implementation plan and decide whether to authorize a first code phase, likely starting with capsule 2 authoredFeedback enrichment only.

## 28. What remains blocked

- Implementation remains blocked.
- Code edits remain blocked.
- Registry insertion remains blocked.
- Capsules 3 and 5 remain not registry-ready by documentation alone.
- Final implementation keys remain blocked until code-time recheck.
- UI label changes remain blocked until explicitly authorized.
- API/schema/DB/continuity/route-order changes remain blocked.
- Capsules 4 and 6 remain out of scope.
- Runtime/browser/API/build tests remain blocked in this documentation phase.
- Sales-Ready, adaptive AI, diagnosis, mastery, theta, readiness, score, and route certainty claims remain blocked.

## 29. Final verdict

Final verdict:
`NARROW_IMPLEMENTATION_PLAN_DRAFTED_READY_FOR_CODE_PHASE_AUTHORIZATION_REVIEW`

The narrow implementation plan is drafted and ready for code-phase authorization review. It does not authorize code execution, registry insertion, final implementation keys, UI changes, API changes, schema/DB changes, continuity changes, route-order changes, deployed student-facing content, Sales-Ready claims, or adaptive AI claims.
