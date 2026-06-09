# BPCPv1 PAES M1 Capsules 2/3/5 Code Phase Authorization Review

Phase:
`MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-CODE-PHASE-AUTHORIZATION-REVIEW-1`

Result:
`M1_CAPSULES_2_3_5_CODE_PHASE_AUTHORIZATION_REVIEW_COMPLETED`

## 1. Executive verdict

Verdict:
`CODE_PHASE_A_AUTHORIZED_CAPSULE_2_AUTHOREDFEEDBACK_ONLY`

The narrow implementation plan, prior readiness audit, data-shape guardrails, UI/API/lifecycle guardrails, key-validation records, and read-only technical inspection are sufficient to authorize a later Code Phase A limited to enriching the existing live capsule 2 content entry with `authoredFeedback`.

This document does not implement. Code remains blocked until Mauricio or ChatGPT issues a new explicit code-phase prompt.

## 2. Purpose

This authorization review answers:

```text
¿Se autoriza redactar y ejecutar posteriormente una primera fase de código limitada a enriquecer la cápsula 2 existente con authoredFeedback, dejando cápsulas 3/5, UI label changes, registry insertion, continuity y route-order fuera de esa primera fase?
```

The answer is yes for a later Code Phase A, with strict limits and stop conditions.

## 3. Governance basis / documentos leidos

Read before writing:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_NARROW_IMPLEMENTATION_PLAN.md`
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
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md`
- `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md`

Governance chain carried forward:

- Narrow implementation plan verdict: `NARROW_IMPLEMENTATION_PLAN_DRAFTED_READY_FOR_CODE_PHASE_AUTHORIZATION_REVIEW`.
- Implementation-plan audit verdict: `IMPLEMENTATION_PLAN_AUDIT_READY_FOR_NARROW_IMPLEMENTATION_PLAN`.
- UI/API/lifecycle verdict: `UI_API_LIFECYCLE_GUARDRAILS_DEFINED_READY_FOR_IMPLEMENTATION_PLAN_AUDIT`.
- Feedback data-shape verdict: `FEEDBACK_DATA_SHAPE_GUARDRAILS_DEFINED_READY_FOR_UI_API_LIFECYCLE_GUARDRAILS`.
- Key-validation verdict: `KEY_VALIDATION_PASSED_DOCUMENTATION_LEVEL_NOT_IMPLEMENTATION_KEYS`.
- Capsules 3/5 source-finalization status: `SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED`.

## 4. Read-only technical surface inspected

Read-only files inspected:

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-pedagogical-decision.ts`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `nextjs_space/app/api/study-loads/[id]/responses/route.ts`
- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`

Search performed:

```powershell
rg -n "paes_m1_linear_equations_basic|authoredFeedback|StudyLoadAuthoredFeedback|briefId|completeId|version|brief|complete|correctOptionKey|buildStudyLoadFeedback|mc_submission|paso a paso|paes_m1_numbers_percentage_proportionality_entry|paes_m1_geometry_area_measure_entry|continuity|route-order|adaptive|Sales-Ready|theta|mastery|readiness|score" nextjs_space/lib nextjs_space/app nextjs_space/docs/operations
```

Observed technical surface:

- `StudyLoadAuthoredFeedback` supports `briefId`, `completeId`, `version`, `brief`, and `complete`.
- `StudyLoadItem` supports optional `authoredFeedback`.
- `buildStudyLoadFeedback` can expose authored brief/complete and ids/version after a selected answer.
- The responses route stores `mc_submission` evidence and feedback ids/version when authored feedback exists.
- The answer form displays brief feedback and can expand complete feedback under the current `paso a paso` label.
- The complete route governs self-report/completion separately.
- Continuity and pedagogical-decision modules are separate from authored feedback.

## 5. Authorization question

Authorization question:

```text
Authorize a future first code phase limited to capsule 2 authoredFeedback enrichment only?
```

Authorization answer:

```text
YES, for a later explicitly prompted Code Phase A only.
```

No code is authorized in this documentation phase.

## 6. Reason for split-phase authorization

Split-phase authorization is safer because capsule 2 already exists as live source, while capsules 3 and 5 are source-finalized documentation plans but are not live registry entries and are not registry-ready by documentation alone.

The next code phase can therefore reduce blast radius:

- capsule 2 only;
- one code file only;
- authoredFeedback enrichment only;
- no registry insertion;
- no UI/API/lifecycle edits;
- no continuity or route-order edits;
- no final implementation key approval beyond code-time recheck.

Capsules 3 and 5 remain separate future work after exact source/key recheck and explicit registry authorization.

## 7. Authorized Code Phase A scope, if approved

Code Phase A may only:

1. Edit `nextjs_space/lib/study-load-content.ts`.
2. Locate existing live content entry `paes_m1_linear_equations_basic`.
3. Preserve its existing contentKey.
4. Preserve its existing contentVersion unless the code review finds a hard blocker; if versioning is unclear, stop.
5. Preserve existing item count.
6. Preserve existing stems.
7. Preserve existing options.
8. Preserve existing correctOptionKey values.
9. Add `authoredFeedback` to each existing capsule 2 item using the already-authored documentation-level feedback.
10. Use existing `StudyLoadAuthoredFeedback` shape only:
    - `briefId`
    - `completeId`
    - `version`
    - `brief`
    - `complete`
11. Keep all rationales, key-validation notes, source-finalization notes, implementation-readiness notes and raw inference-limit notes out of code/student-facing payloads.
12. Run static/build verification allowed by the code-phase prompt.
13. Produce compact report for ChatGPT review.

## 8. Explicitly not authorized in Code Phase A

- Adding capsules 3 and 5 to registry.
- Editing UI.
- Editing API routes.
- Editing response lifecycle.
- Editing complete lifecycle.
- Editing continuity.
- Editing route order.
- Editing pedagogical decision logic.
- Editing Prisma/schema/DB.
- Changing stems/options/keys.
- Changing content generation logic.
- Adding adaptive routing.
- Adding scoring/theta/mastery/readiness claims.
- Adding Sales-Ready claims.
- Touching payment/access/admin analytics.
- Touching capsules 4 or 6.

## 9. Capsule 2 code-scope boundary

- Capsule 2 already exists as `paes_m1_linear_equations_basic`.
- Code Phase A is enrichment only.
- It should not be used to revise source.
- It should not be used to revise keys.
- It should not add route behavior.
- It should not alter continuation behavior.
- Existing live item count must remain 4.
- Existing `contentVersion` must remain unchanged unless the future code phase finds a hard blocker and stops.

## 10. Source/key boundary

- Documentation-level key validation is evidence, not final code-key approval.
- Code Phase A must recheck current live item stems/options/keys before adding feedback.
- If any current live item differs from documentation in a task-changing way, stop.
- If any `correctOptionKey` differs from validated documentation, stop.
- No silent key changes are allowed.
- The future code phase may preserve existing keys only after code-time recheck.

## 11. AuthoredFeedback mapping boundary

- feedback breve maps to `authoredFeedback.brief`.
- feedback completo maps to `authoredFeedback.complete`.
- `briefId`, `completeId`, and `version` must be systematic and stable.
- Suggested version may be documentation-derived, e.g. `bpcpv1-capsule2-feedback-v1`, unless existing conventions suggest otherwise.
- The code phase must not invent new fields.
- The code phase must not encode internal rationales, key-validation notes, source-finalization notes, implementation-readiness notes or raw inference-limit notes.
- Cautious inference-limit wording may inform student-facing feedback only if it is already part of the authored feedback text and does not overclaim.

## 12. UI/API/lifecycle boundary

- Existing UI/API should already read `authoredFeedback` if present.
- Code Phase A does not edit UI/API.
- Code Phase A does not decide the `paso a paso` label issue.
- Feedback display remains downstream of accepted submission.
- Feedback does not mutate StudyLoad status.
- Feedback does not complete StudyLoad.
- Feedback does not bypass self-report.
- Feedback does not create next StudyLoad.
- Completion remains governed by the existing complete route.

## 13. Continuity/route-order boundary

- Do not edit `study-load-continuity.ts`.
- Do not add capsule 3/5 to continuity.
- Do not reorder capsules.
- Do not change operational route decisions.
- Do not add adaptive behavior.
- Do not edit `study-load-pedagogical-decision.ts`.

## 14. Verification requirements for future Code Phase A

Future Code Phase A must verify:

- git preflight clean and aligned.
- read source/key/authoring docs before editing.
- inspect existing capsule 2 item records.
- diff limited to `nextjs_space/lib/study-load-content.ts` unless a blocker requires stopping.
- no continuity diff.
- no UI diff.
- no API diff.
- no schema/DB diff.
- no internal asset leakage via `rg`.
- `git diff --check`.
- TypeScript/build check if project supports it and the code prompt authorizes it.
- compact report with exact changed file and verification results.

## 15. Stop conditions for future Code Phase A

Stop Code Phase A if:

- baseline is not clean.
- capsule 2 live content is missing.
- item count is not 4.
- stem/options/key mismatch is found.
- existing type shape differs from expected `StudyLoadAuthoredFeedback`.
- adding feedback would require schema/API/UI changes.
- contentVersion uncertainty affects runtime compatibility.
- any need appears to touch continuity/route-order.
- any need appears to touch capsules 3/5.
- any internal asset would leak to student-facing code.
- build/typecheck failure cannot be resolved inside the authorized file.

## 16. Candidate future code prompt requirements

A future Code Phase A prompt must:

- authorize code edits explicitly.
- name the single allowed code file.
- include exact source documents to read.
- include exact item-level feedback source.
- require code-time key recheck.
- prohibit registry insertion for 3/5.
- prohibit UI/API/continuity/schema changes.
- require build/static validation.
- require commit/push only if scope is respected.

## 17. Risk table

| Risk ID | Severity | Area | Risk | Authorization response | Stop/mitigation |
|---|---|---|---|---|---|
| R1 | HIGH | Scope | Phase accidentally becomes broad implementation. | Authorize only capsule 2 authoredFeedback enrichment in one file. | Stop if any additional file or feature is needed. |
| R2 | BLOCKER | Source/key | Capsule 2 stems/options/keys changed while adding feedback. | Preserve all existing source and keys. | Stop on any mismatch or proposed key/source edit. |
| R3 | MEDIUM | Versioning | `contentVersion` uncertainty. | Preserve existing version unless hard blocker. | Stop for governance review if versioning affects runtime compatibility. |
| R4 | HIGH | Asset boundary | Internal rationales leak into authoredFeedback. | Keep rationales/key-validation/raw inference-limit notes out of code. | Run leakage `rg`; stop on internal-note exposure. |
| R5 | MEDIUM | UI label | UI label issue is touched too early. | UI copy not authorized in Code Phase A. | Defer label work to separate phase if needed. |
| R6 | HIGH | Build/type | Build/type error requires touching extra files. | Future prompt may allow build/static checks, not extra files. | Stop if fix requires files outside `study-load-content.ts`. |
| R7 | HIGH | Continuity | Continuity accidentally changed. | Continuity files are not authorized. | Verify no continuity diff. |
| R8 | HIGH | Registry | Capsules 3/5 accidentally inserted. | 3/5 excluded from Code Phase A. | Stop if registry insertion is attempted. |
| R9 | MEDIUM | Data shape | authoredFeedback IDs/version inconsistent. | Require systematic stable ids/version. | Review ids/version before commit. |
| R10 | MEDIUM | Verification | Future code phase omits verification. | Candidate prompt must require static/build checks as authorized. | Do not close code phase without compact verification report. |

## 18. Authorization checklist

| Check | Status | Evidence |
|---|---|---|
| Clean baseline | PASS | Preflight showed clean working tree and `9275d5c` aligned with `origin/main`/`origin/HEAD`. |
| Narrow plan exists | PASS | `BPCPV1_PAES_M1_CAPSULES_2_3_5_NARROW_IMPLEMENTATION_PLAN.md`. |
| Capsule 2 live source exists | PASS | `paes_m1_linear_equations_basic` exists in `study-load-content.ts`. |
| Capsule 2 enrichment-only scope clear | PASS | Future Code Phase A limited to authoredFeedback only. |
| Feedback source available | PASS | Final authoring/integration documents provide documentation-level feedback assets. |
| Data-shape available | PASS | Existing `StudyLoadAuthoredFeedback` shape supports brief/complete ids/version. |
| UI/API existing surface can consume authoredFeedback | PASS | Read-only inspection shows authored feedback is surfaced when present. |
| No UI changes needed for Code Phase A | PASS | Existing UI can consume feedback; label issue deferred. |
| No API changes needed for Code Phase A | PASS | Existing responses route maps authoredFeedback fields. |
| No continuity changes needed | PASS | Feedback enrichment does not require continuity edits. |
| No route-order changes needed | PASS | Capsule 2 enrichment does not alter route order. |
| No schema/DB changes needed | PASS | Existing `mc_submission` payload can store feedback ids/version. |
| Capsules 3/5 excluded from Code Phase A | PASS | Registry insertion deferred. |
| Final implementation keys still blocked until recheck | PASS | Code-time key recheck required before preserving keys. |
| Code phase still requires explicit next prompt | PASS | This document authorizes scope only; it does not start code. |

## 19. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-CODE-PHASE-A-AUTHOREDFEEDBACK-1
```

Purpose:

```text
Implement authoredFeedback enrichment for the existing live PAES_M1 capsule 2 only, preserving stems/options/keys, continuity, route-order, UI/API/schema and lifecycle.
```

## 20. What remains blocked

- Code edits remain blocked until the next explicit code-phase prompt.
- Final implementation keys remain blocked until code-time recheck.
- Capsules 3 and 5 registry insertion remains blocked.
- UI label changes remain blocked.
- API route changes remain blocked.
- Response lifecycle and complete lifecycle changes remain blocked.
- Continuity and route-order changes remain blocked.
- Schema/DB changes remain blocked.
- Any scoring/theta/mastery/readiness, adaptive behavior, or Sales-Ready claim remains blocked.

## 21. Final verdict

Final verdict:

```text
CODE_PHASE_A_AUTHORIZED_CAPSULE_2_AUTHOREDFEEDBACK_ONLY
```

This is documentation-only authorization for a later narrow code phase. It does not implement, does not edit code, does not approve final implementation keys, does not add capsules 3/5 to registry, and does not change UI/API/lifecycle/continuity/route-order/schema.
