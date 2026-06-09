# BPCPv1 PAES M1 Capsules 2/3/5 UI/API/Lifecycle Guardrails

Phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-UI-API-LIFECYCLE-GUARDRAILS-1
```

Result:

```text
M1_CAPSULES_2_3_5_UI_API_LIFECYCLE_GUARDRAILS_DEFINED
```

## 1. Executive Verdict

Verdict:

```text
UI_API_LIFECYCLE_GUARDRAILS_DEFINED_READY_FOR_IMPLEMENTATION_PLAN_AUDIT
```

The source, key-validation and feedback data-shape chain is sufficient to define UI/API/lifecycle guardrails for capsules 2, 3 and 5 at documentation level. This does not authorize implementation. It only establishes the conditions that a later implementation-plan audit must check before any code, registry, UI, API, schema, continuity or route-order work.

The main current risk is label accuracy: the existing answer form can show `authoredFeedbackComplete` in an expandable area labeled `paso a paso`. That label is acceptable only when the complete feedback actually contains step-by-step content. If complete feedback is only an explanation, the future UI should use a label such as `Ver explicacion` or `Explicacion completa`.

## 2. Purpose

Define documentation-only UI, API and lifecycle guardrails for how the selected feedback assets for PAES_M1 capsules 2, 3 and 5 may be surfaced later.

This phase answers:

```text
What UI, API and lifecycle conditions must be met so feedback breve/complete can be shown safely later, without overclaiming, breaking the answer/completion flow, or converting internal assets into student-facing content?
```

## 3. Governance Basis / Documents Read

Required governance and continuity documents were read before writing:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
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

Governing carry-forward:

- Candidate keys are documentation-level validated candidates, not implementation keys.
- Capsules 3 and 5 are source-finalized documentation plans, not registry-ready content.
- Data-shape primary mapping is `MVP_STATIC_BRIEF_COMPLETE_ONLY`.
- Step-by-step, item rationales, distractor/error-family rationales, key-validation notes and inference-limit notes remain internal by default unless a later phase explicitly authorizes otherwise.

## 4. Read-Only Technical Surface Inspected

Read-only files inspected:

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-pedagogical-decision.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `nextjs_space/app/api/study-loads/[id]/responses/route.ts`
- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`

Required read-only search was run across `nextjs_space/lib`, `nextjs_space/app` and `nextjs_space/docs/operations` for:

```text
authoredFeedback, authoredFeedbackBrief, authoredFeedbackComplete, brief, complete, paso a paso, feedback, buildStudyLoadFeedback, mc_submission, study-load, StudyLoad, responses, complete, submitted, completed, in_progress, correctOptionKey, route, continuity, score, theta, mastery, readiness, adaptive, Sales-Ready
```

No code, schema, registry, UI, API, continuity or route-order change was made in this phase.

## 5. Current Observed UI/API/Lifecycle Behavior

Read-only inspection confirms:

- Current UI/API can expose authored brief and complete feedback when `authoredFeedback` exists.
- `StudyLoadAuthoredFeedback` currently supports `briefId`, `completeId`, `version`, `brief` and `complete`.
- `StudyLoadItem` currently supports `stem`, `options`, `correctOptionKey` and optional `authoredFeedback`.
- `buildStudyLoadFeedback(...)` returns correctness fields plus authored brief/complete text and feedback ids/version when present.
- Current answer form displays `authoredFeedbackBrief`.
- Current answer form displays `authoredFeedbackComplete` inside a `details` expanded area labeled `paso a paso`.
- Current answer form also shows a disabled `paso a paso` affordance when no complete feedback exists.
- Current responses route validates ownership, contentKey/contentVersion, item keys and option labels before creating or replacing one `mc_submission`.
- Current responses route stores answer correctness and feedback ids/version in the `mc_submission` payload.
- Current responses route does not change `StudyLoad.status`, does not call `/complete`, does not touch self-report, and does not add scoring or adaptive logic.
- Current complete route validates self-report, changes `StudyLoad` and its active session from `in_progress` to `completed`, stores one `answer` response, updates activity timestamp, and then runs best-effort rule-based continuity preparation.
- Current complete route/lifecycle should remain unchanged in this phase.
- No current UI/API surface should be changed by this phase.

Observed boundary:

The current UI uses the label `paso a paso` for `authoredFeedbackComplete`. Future implementation planning must either ensure complete feedback contains true step-by-step content, or change the future label to explanation language under explicit implementation authorization.

## 6. Relationship To Feedback Data-Shape Guardrails

Carry-forward mapping:

```text
Primary mapping:
MVP_STATIC_BRIEF_COMPLETE_ONLY

Conditional fallback:
MVP_COMPLETE_CONTAINS_STEP_BY_STEP only if explicitly authorized by a later phase.
```

Default internal-only assets:

- Step-by-step script, unless explicitly folded into complete later.
- Item-level rationale.
- Distractor/error-family rationale.
- Key-validation note.
- Inference-limit note as governance asset that informs cautious copy.

This UI/API/lifecycle phase does not alter the mapping. It defines safe display and payload conditions for a future implementation plan audit.

## 7. UI Guardrails

- Feedback breve may appear only after the answer submission is accepted and the response state is stable for the item.
- Feedback completo may appear only after submitted feedback exists for that item, preferably behind an explicit expansion control.
- Feedback completo must not appear before the student's answer has been submitted for the item.
- Feedback completo may be available during `in_progress` after `mc_submission`, and in completed review, if the same stored submission is used.
- If complete feedback is explanatory text, the UI label should be `Ver explicacion` or `Explicacion completa`.
- If complete feedback contains actual steps, `Paso a paso` may be acceptable.
- If complete feedback does not contain steps, `Paso a paso` must not be the default label.
- Internal/reviewer assets must not appear in student UI by default.
- UI copy must not imply diagnosis, route decision, mastery, readiness, theta, PAES score, adaptive AI or Sales-Ready status.
- UI must preserve mobile readability with short blocks, readable line lengths and no dense internal governance text.

## 8. API Payload Guardrails

Future student-facing API payloads may expose only these feedback-related fields if explicitly authorized later:

- `authoredFeedbackBrief`
- `authoredFeedbackComplete`
- `authoredFeedbackBriefId`
- `authoredFeedbackCompleteId`
- `authoredFeedbackVersion`
- answer submission summary fields already supported by the response flow

The following must remain internal/documentation-only by default:

- item-level rationale
- distractor rationale
- error-family rationale
- key-validation note
- raw inference-limit note
- source-finalization status notes
- registry-readiness notes
- implementation-readiness blocker notes

Feedback IDs and version are traceability metadata. They may be stored and returned for review/audit consistency, but they must not be treated as student-facing explanatory copy by default.

No future API payload shape change may be assumed from this document. Any payload expansion requires a later implementation plan and explicit authorization.

## 9. Response Lifecycle Guardrails

- `mc_submission` remains the lifecycle point where selected options, correctness and feedback traceability are recorded.
- Feedback display must be downstream of accepted `mc_submission`, not a replacement for submission.
- Feedback display must not mutate `StudyLoad.status`.
- Feedback display must not create self-report.
- Feedback display must not trigger completion.
- Feedback display must not create or select the next StudyLoad.
- Feedback display must not change continuity decisions.
- Feedback display must not calculate score, theta, mastery, readiness or diagnostic certainty.

## 10. Completion Lifecycle Guardrails

- Completion remains a separate lifecycle step after answer submission and self-report.
- The `complete` route should remain responsible for closing the active StudyLoad/session and storing the self-report.
- The existence of feedback breve/completo must not bypass self-report.
- The existence of feedback breve/completo must not auto-complete a capsule.
- The existence of feedback breve/completo must not alter the closed set of self-report options.
- Any best-effort continuity preparation after completion must remain governed by the existing continuity boundary unless a future phase explicitly authorizes a continuity change.

## 11. Feedback Display Timing Guardrails

Recommended timing for future implementation planning:

- Before submission: show no answer-specific feedback.
- Immediately after accepted submission: brief feedback may appear per answered item; complete feedback may be available behind explicit expansion.
- Before completion: feedback can support review and self-report, but must not imply the capsule is completed.
- After completion: the same feedback may be available in read-only review.
- Pending/released states: no item-specific feedback should be shown.

Open decision for implementation-plan audit:

Whether complete feedback is shown immediately after submission or only after completion may be decided in a later implementation plan audit. The safer MVP default is immediate post-submission availability only after stable `mc_submission`, because the current flow already uses feedback before self-report.

## 12. Label/Copy Guardrails

Avoid:

- `diagnostico` unless explicitly scoped as internal review.
- `nivel`
- `dominio`
- `listo`
- `ruta decidida`
- `puntaje`
- `theta`
- `IA adaptativa`
- `Sales-Ready`

Prefer cautious language:

- `puede sugerir`
- `conviene revisar`
- `evidencia limitada`
- `senal inicial`
- `revisa tu resultado`
- `explicacion`

Label rule:

- If the content is an explanation, use `Ver explicacion` or `Explicacion completa`.
- If the content contains ordered steps, `Paso a paso` may be acceptable.
- If the content does not contain ordered steps, avoid `Paso a paso` as the default label.

## 13. Mobile Readability Guardrails

- Brief feedback should stay short enough to scan inside each item.
- Complete feedback should be hidden behind expansion by default if it is longer than a short paragraph.
- Complete feedback should be written in concise paragraphs or short step blocks.
- Student-facing feedback should not include long governance notes, reviewer language or source-validation metadata.
- The UI should preserve one clear post-submit sequence: review result, review item feedback, self-report, complete.
- Future implementation planning must check that feedback text does not crowd answer options, self-report or completion controls on mobile.

## 14. Student-Facing Vs Internal Asset Boundary

Student-facing candidates, not yet deployed by this phase:

- feedback breve
- feedback completo

Internal/reviewer assets by default:

- step-by-step script unless later folded into complete
- item-level rationale
- distractor/error-family rationale
- key-validation note
- inference-limit note
- source-finalization and implementation-readiness status

Boundary rule:

Internal assets may inform student-facing feedback, but must not be exposed raw to students or presented as diagnosis.

## 15. Claims And Inference-Limit Guardrails

Any future student-facing copy must avoid overclaiming from a four-item capsule or from a single submission.

Allowed language:

- `Esta respuesta puede sugerir que conviene revisar...`
- `La evidencia es limitada y sirve como senal inicial.`
- `Revisa este paso antes de avanzar.`

Prohibited claims:

- mastery/domain claims
- readiness claims
- PAES score estimates
- theta estimates
- route certainty
- diagnostic certainty
- adaptive AI claims
- Sales-Ready claims

Inference-limit notes remain governance assets. They should shape cautious copy but must not be exposed as raw internal notes unless a later product decision explicitly designs a reviewer-facing surface.

## 16. Data Persistence Guardrails

- Persisted `mc_submission` payload may keep selected option, correct option, correctness, feedback ids/version and summary.
- Persisted data should not include raw internal rationales, key-validation notes or inference-limit notes in student-facing response records by default.
- Feedback ids/version should be used for traceability to authored feedback assets.
- If future implementation stores feedback text snapshots, that must be explicitly decided in an implementation plan and audited for privacy, migration and review implications.
- No schema change is authorized by this phase.

## 17. Continuity/Route-Order Guardrails

- Feedback display must not change the current rule-based continuity map.
- Feedback display must not create new StudyLoads.
- Feedback display must not reorder capsules.
- Feedback display must not mark capsules 3 or 5 as registry-ready.
- Feedback display must not make AS1/PE1/geometry route decisions.
- Feedback existence alone must not trigger `prepareNextStudyLoadAfterCompletion`.
- Completion and continuity remain separate from feedback display.

## 18. Guardrails Table

| Guardrail ID | Area | Guardrail | Pass condition | Fail/block condition | Output required before implementation |
|---|---|---|---|---|---|
| UIAPI-GR-01 | UI timing | Show item feedback only after accepted submission. | Feedback appears only after stable `mc_submission`. | Feedback appears before submission or while response state is unstable. | Implementation plan must define display trigger. |
| UIAPI-GR-02 | UI labels | Label complete feedback according to content. | Explanation uses `Ver explicacion`/`Explicacion completa`; true steps may use `Paso a paso`. | Complete feedback is mislabeled as step-by-step. | Label audit for each mapped feedback asset. |
| UIAPI-GR-03 | UI boundary | Keep internal/reviewer assets out of student UI by default. | Student UI shows only approved brief/complete feedback. | Rationales, key-validation notes or raw inference-limit notes appear to students. | Student-facing asset allowlist. |
| UIAPI-GR-04 | API payload | Expose only approved brief/complete fields and feedback ids/version. | Payload contains no raw internal governance assets. | Payload sends rationale, key-validation or source-finalization notes. | API response field allowlist. |
| UIAPI-GR-05 | Response lifecycle | Feedback display must not mutate StudyLoad/session status. | Submission and feedback remain separate from completion. | Feedback display completes a capsule or writes self-report. | Lifecycle sequence check. |
| UIAPI-GR-06 | Completion lifecycle | Completion remains gated by self-report. | Self-report is still required after submission. | Feedback bypasses or auto-fills self-report. | Completion gate check. |
| UIAPI-GR-07 | Continuity | Feedback must not trigger route or continuity changes. | Continuity remains only in authorized completion/continuity flow. | Feedback creates/reorders/selects next StudyLoad. | Continuity no-change assertion. |
| UIAPI-GR-08 | Inference limits | UI/API copy must avoid overclaiming. | Copy uses cautious evidence language. | Copy implies mastery, readiness, score, theta, diagnosis, adaptive AI or Sales-Ready. | Copy/inference-limit review. |
| UIAPI-GR-09 | Mobile readability | Feedback remains scan-friendly on mobile. | Brief is concise; complete is expandable and readable. | Dense feedback blocks obscure answer or completion controls. | Mobile readability checklist before code. |
| UIAPI-GR-10 | Traceability | Feedback ids/version are preserved as metadata. | IDs/version remain available for audit without becoming student copy. | Version traceability is dropped or displayed as confusing student text. | Feedback traceability decision. |

## 19. Risk Table

| Risk ID | Severity | Area | Risk | Guardrail response |
|---|---|---|---|---|
| UIAPI-R-01 | HIGH | UI labels | Complete feedback is mislabeled as `paso a paso`. | Require content-matched label before implementation. |
| UIAPI-R-02 | BLOCKER | Student boundary | Internal rationales are exposed to students. | Student-facing allowlist excludes rationales by default. |
| UIAPI-R-03 | BLOCKER | Student boundary | Key-validation notes are exposed to students. | Key-validation notes remain internal governance assets only. |
| UIAPI-R-04 | HIGH | Lifecycle | Feedback is shown before answer state is stable. | Display only after accepted `mc_submission`. |
| UIAPI-R-05 | HIGH | Continuity | Feedback display accidentally changes continuity. | Feedback may not trigger next-load creation or route decisions. |
| UIAPI-R-06 | HIGH | API | API payload exposes internal governance data. | Payload allowlist excludes raw internal assets. |
| UIAPI-R-07 | HIGH | Claims | UI implies diagnosis, mastery, readiness or route certainty. | Cautious copy guardrails and inference-limit review. |
| UIAPI-R-08 | MEDIUM | Mobile | Complete feedback becomes too dense on mobile. | Expansion, concise paragraphs and mobile readability gate. |
| UIAPI-R-09 | MEDIUM | Traceability | Feedback ids/version are not preserved. | Require traceability decision before implementation. |
| UIAPI-R-10 | HIGH | Planning | Future implementation assumes current UI label is already correct. | Implementation-plan audit must explicitly review labels and content. |

## 20. Required Gates Before Implementation Plan

Before any implementation plan can be drafted, the next phase must audit:

- Source-finalization status for capsules 2, 3 and 5.
- Documentation-level key-validation status, without promoting keys to implementation keys.
- Data-shape mapping, including `MVP_STATIC_BRIEF_COMPLETE_ONLY`.
- Whether `complete` feedback content is explanation or true step-by-step.
- Student-facing asset allowlist.
- API payload allowlist.
- Feedback display timing.
- Completion lifecycle separation.
- Continuity no-change boundary.
- Label/copy inference-limit compliance.
- Mobile readability requirements.
- Traceability handling for feedback ids/version.

## 21. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-IMPLEMENTATION-PLAN-AUDIT-1
```

Purpose:

```text
Audit whether the complete chain of source, keys, data-shape, UI/API/lifecycle guardrails is sufficient to draft a narrow implementation plan, still without implementing.
```

## 22. What Remains Blocked

Still blocked:

- Implementation.
- Code changes.
- UI changes.
- API changes.
- DB/schema/endpoints.
- Registry changes.
- Continuity changes.
- Route-order changes.
- Source-code changes.
- Source item changes.
- Candidate key changes.
- Final implementation keys.
- Generated capsules.
- Runtime/browser tests.
- API calls.
- Deployment.
- Marking capsules 3/5 as registry-ready.
- Student-facing deployment of capsules 3/5.
- Sales-Ready or adaptive AI claims.

## 23. Final Verdict

Final verdict:

```text
UI_API_LIFECYCLE_GUARDRAILS_DEFINED_READY_FOR_IMPLEMENTATION_PLAN_AUDIT
```

This documentation phase defines safe UI/API/lifecycle boundaries for future display of feedback breve and feedback completo. It does not implement, approve implementation keys, modify UI/API/code/schema/registry/continuity, or deploy any student-facing content.
