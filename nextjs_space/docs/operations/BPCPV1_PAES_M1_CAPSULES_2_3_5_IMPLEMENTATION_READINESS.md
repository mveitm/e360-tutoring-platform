# BPCPv1 PAES_M1 - Implementation readiness capsulas 2, 3 y 5

## 1. Executive verdict

Result:

```text
M1_CAPSULES_2_3_5_IMPLEMENTATION_READINESS_AUDITED
```

Implementation-readiness verdict:

```text
IMPLEMENTATION_READINESS_PARTIAL_NEEDS_SOURCE_AND_KEY_GUARDRAILS
```

The integrated and adjusted documentation-level authoring assets for PAES_M1 capsules 2, 3 and 5 are strong enough to enter a future implementation-planning path, but not enough to touch registry, code, continuity or UI yet.

Capsule 2 is closest to implementation planning because it already exists as current live source in `study-load-content.ts`. Capsules 3 and 5 require source-finalization and registry-readiness guardrails because they remain revised source-authoring candidates, not live content entries.

All three capsules require explicit key-validation guardrails before any implementation phase treats answer keys as implementation keys.

## 2. Purpose

This audit answers:

```text
Are the integrated and adjusted authoring assets for capsules 2, 3 and 5 ready for a future implementation-planning phase? If not, what must be closed before touching registry, code, continuity or UI?
```

The answer is partial readiness. Planning can proceed only if it first defines source, key, feedback data-shape, UI and continuity guardrails.

This phase does not implement anything.

## 3. Governance basis / documentos leidos

Documents read:

- `PHASE_LOG.md`
- `CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `DOCUMENTATION_INDEX_MVP_M1.md`
- `CODEX_LATEST_COMPACT_REPORT.md`
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

Read-only technical inspection:

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-pedagogical-decision.ts`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_SOURCE_AUTHORING.md`

Read-only search included `nextjs_space/docs/operations`, `nextjs_space/lib` and `nextjs_space/app` for the relevant contentKeys, feedback, rationale, step-by-step, registry, continuity, route and implementation-readiness terms.

## 4. Read-only technical surface inspected

Observed technical surface:

- `study-load-content.ts` is the current static StudyLoad content registry.
- `StudyLoadItem` supports `correctOptionKey` and optional `authoredFeedback`.
- `StudyLoadAuthoredFeedback` currently supports `briefId`, `completeId`, `version`, `brief` and `complete`.
- `buildStudyLoadFeedback` returns correctness plus authored brief/complete feedback when present.
- Existing L1 content demonstrates authored brief/complete feedback in the registry.
- Current M1 entries in the live registry include `paes_m1_linear_equations_basic`, `paes_m1_linear_functions_basic` and `paes_m1_data_representation_entry`.
- No live registry entries were found for `paes_m1_numbers_percentage_proportionality_entry` or `paes_m1_geometry_area_measure_entry`.
- `study-load-continuity.ts` currently routes M1 through an AS1-heavy sequence and does not include capsule 3 or capsule 5.
- `study-load-pedagogical-decision.ts` describes existing rule-based continuity and explicitly limits adaptive/score/mastery claims.
- Search in app code shows UI/API surfaces already return and display authored brief/complete feedback, but step-by-step is currently coupled to the complete feedback display language rather than a separate structured field.

## 5. Documentation chain readiness summary

The documentation chain for capsules 2, 3 and 5 is complete at planning level:

- fichas exist;
- feedback contracts exist;
- final documentation-level authoring exists;
- authoring review passed with minor fixes;
- minor fixes were applied without blockers;
- integration document records traceability and implementation blockers.

The chain is not implementation-ready because:

- all keys are still candidates;
- capsule 3 and capsule 5 are not live registry entries;
- source-finalization path for 3/5 is not documented as registry-ready;
- feedback/rationale/step-by-step data-shape is not decided for M1 implementation;
- UI behavior for separate brief/complete/step-by-step modes needs explicit planning;
- continuity and route-order must remain unchanged unless a separate phase authorizes them.

## 6. Capsule 2 implementation-readiness assessment

| Field | Assessment |
|---|---|
| Capsule | 2 |
| contentKey | `paes_m1_linear_equations_basic` |
| Source status | Current live source in `study-load-content.ts` |
| Authoring status | Documentation-level final authoring integrated and adjusted |
| Key status | Current-source/ficha candidates only |
| Registry readiness | Closest to planning readiness because source exists |
| Implementation readiness | Partial, pending key and data-shape guardrails |
| Main blocker | Candidate keys and feedback/rationale/step-by-step data-shape |
| Recommended handling | Plan capsule 2 first only if key validation and feedback field mapping are explicit |

Capsule 2 can enter implementation planning before capsules 3 and 5 if the team chooses to split planning, because its source exists. However, implementing capsule 2 alone may overrepresent AS1 if the plan does not preserve the broader 2/3/5 multi-axis intent.

## 7. Capsule 3 implementation-readiness assessment

| Field | Assessment |
|---|---|
| Capsule | 3 |
| contentKey | `paes_m1_numbers_percentage_proportionality_entry` |
| Source status | Revised documentation-level source-authoring candidate |
| Authoring status | Documentation-level final authoring integrated and adjusted |
| Key status | Source/ficha candidates only |
| Registry readiness | Not registry-ready |
| Implementation readiness | Partial, requires source-finalization guardrails |
| Main blocker | No live content registry entry |
| Recommended handling | Source-finalization and key-validation guardrails before implementation planning |

Capsule 3 is pedagogically important because it protects the early window from narrowing into AS1. It should not be treated as implementation-ready until the documentation source candidate is converted into a registry-ready source plan.

## 8. Capsule 5 implementation-readiness assessment

| Field | Assessment |
|---|---|
| Capsule | 5 |
| contentKey | `paes_m1_geometry_area_measure_entry` |
| Source status | Revised documentation-level source-authoring candidate |
| Authoring status | Documentation-level final authoring integrated and adjusted |
| Key status | Source/ficha candidates only |
| Registry readiness | Not registry-ready |
| Implementation readiness | Partial, requires source-finalization guardrails |
| Main blocker | No live content registry entry |
| Recommended handling | Source-finalization and key-validation guardrails before implementation planning |

Capsule 5 is pedagogically important because it adds Geometry/measure coverage. It should not be implemented as if it already existed in the static registry.

## 9. Registry/source readiness review

Current registry readiness:

| Capsule | Registry/source readiness |
|---|---|
| 2 | Exists in `study-load-content.ts` as current live source. |
| 3 | Not found in `study-load-content.ts`; exists as revised source-authoring documentation only. |
| 5 | Not found in `study-load-content.ts`; exists as revised source-authoring documentation only. |

A future implementation plan must decide whether to:

- add 3 and 5 to the static registry;
- keep 3 and 5 blocked until a separate source-finalization phase;
- split capsule 2 planning from 3/5 planning;
- define how documentation-level assets map into source-code content without changing meaning.

## 10. Key-validation readiness review

All keys remain:

```text
current-source/ficha key candidates only
```

Implementation planning must require a key-validation checklist per item:

- match stem;
- match options;
- match documented rationale;
- match authored feedback;
- match any future registry representation;
- record validation status before implementation.

No final implementation key approval is made in this audit.

## 11. Feedback data-shape readiness review

Observed source shape supports brief and complete feedback through `authoredFeedback`.

Current shape does not show a separate native field for:

- item-level rationale;
- distractor-level rationale;
- step-by-step script as distinct from complete feedback;
- inference-limit note;
- key-validation note.

Future planning must decide whether these remain documentation-only, are folded into `complete`, or require a registry/data-shape extension. That decision may or may not require schema changes, depending on whether the team keeps the static registry approach or persists these assets.

## 12. UI/readability readiness review

Search indicates the current StudyLoad UI/API can expose authored brief and complete feedback when present. The UI uses complete feedback in a "paso a paso" context, but the BPCPv1 authoring separates:

- feedback breve;
- feedback completo;
- step-by-step script;
- rationale;
- inference limit.

Before deployment, UI planning must decide:

- whether brief and complete are enough for MVP display;
- whether step-by-step needs a separate visible mode;
- whether rationales remain hidden/internal;
- how to prevent student-facing overclaiming;
- how to test mobile readability without changing content meaning.

## 13. Continuity/route-order readiness review

Current continuity is rule-based and AS1-heavy:

```text
balanced entry -> linear equations basic -> linear equation word problems -> reinforcement -> linear functions -> data representation
```

Capsules 3 and 5 are not currently in this continuity map. Capsule 4 remains operationally late even though pedagogically it belongs earlier in the 2-6 window.

This phase does not authorize continuity changes. A future implementation plan must explicitly separate:

- content registry planning;
- feedback data-shape planning;
- continuity/route-order planning.

## 14. Schema/API/lifecycle readiness review

The current static registry approach is explicitly no-schema in `study-load-content.ts`. The existing response lifecycle validates MC answers and can return feedback through `buildStudyLoadFeedback`.

Implementation planning still needs to decide:

- whether adding M1 authored feedback can stay inside static content;
- whether step-by-step/rationale require new fields;
- whether API payloads need extension;
- whether UI display needs separate affordances;
- whether stored response content should include feedback IDs or rationale IDs;
- whether lifecycle completion and continuity should remain untouched.

This audit does not decide those implementation details.

## 15. Risk table

| Risk ID | Severity | Area | Risk | Recommended guardrail |
|---|---|---|---|---|
| IR-235-001 | HIGH | Keys | Candidate keys are treated as final implementation keys too early. | Require per-item key-validation record before implementation. |
| IR-235-002 | BLOCKER | Source/registry | Capsule 3 and 5 source-authoring candidates are treated as registry-ready. | Run source/key guardrails before implementation planning. |
| IR-235-003 | HIGH | Feedback UI | Feedback assets are deployed without UI support for brief/complete/step-by-step distinctions. | Define feedback display mapping before code work. |
| IR-235-004 | MEDIUM | Data shape | Step-by-step scripts are stored without deciding whether they are separate from complete feedback. | Decide static registry shape or explicit field extension. |
| IR-235-005 | HIGH | Continuity | Implementation accidentally changes continuity or route order. | Keep continuity out of implementation plan unless separately authorized. |
| IR-235-006 | HIGH | Claims | Student-facing text overclaims evidence. | Preserve cautious evidence and prohibited-claims checklist in implementation planning. |
| IR-235-007 | MEDIUM | Sequence balance | Capsule 2 implemented alone creates AS1 overrepresentation. | If planning capsule 2 first, document multi-axis follow-up guardrail. |
| IR-235-008 | MEDIUM | Scope confusion | Capsule 4/6 deferred work is confused with this 2/3/5 package. | Keep capsule 4/6 out of this implementation-readiness path. |
| IR-235-009 | MEDIUM | Schema/API | Implementation path assumes no schema/API changes without checking feedback/rationale needs. | Add schema/API/lifecycle decision gate before code. |

## 16. Required guardrails before implementation

Before touching registry, code, continuity or UI, require:

1. Source-finalization guardrail for capsules 3 and 5.
2. Per-item key-validation guardrail for capsules 2, 3 and 5.
3. Feedback data-shape guardrail for brief, complete, step-by-step, rationale and inference-limit assets.
4. UI-readability guardrail for mobile display and "Ver explicacion"/step-by-step behavior.
5. Claims boundary guardrail preserving no mastery, readiness, theta, PAES score, adaptive AI, route certainty or Sales-Ready claims.
6. Continuity guardrail explicitly stating no route-order change unless separately authorized.
7. Scope guardrail keeping capsules 4 and 6 out of this implementation path.

## 17. Recommended implementation path

Recommended path:

1. Run source/key guardrails for capsules 2, 3 and 5.
2. Decide whether capsule 2 can be planned first without creating AS1 overrepresentation.
3. Convert capsule 3 and 5 source-authoring candidates into registry-ready source plans, still without code.
4. Define data-shape mapping for feedback breve, feedback completo, step-by-step, rationale and inference-limit assets.
5. Define UI/API/lifecycle implications.
6. Only after that, open a narrow implementation plan.

This path intentionally keeps implementation separate from planning.

## 18. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-SOURCE-KEY-GUARDRAILS-1
```

Purpose:

```text
Define source-finalization and key-validation guardrails for capsules 2, 3 and 5 before any registry, code, UI, API or continuity implementation planning.
```

## 19. What remains blocked

Still blocked:

- implementation;
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

## 20. Final verdict

Result:

```text
M1_CAPSULES_2_3_5_IMPLEMENTATION_READINESS_AUDITED
```

Implementation-readiness verdict:

```text
IMPLEMENTATION_READINESS_PARTIAL_NEEDS_SOURCE_AND_KEY_GUARDRAILS
```

The package is ready for source/key guardrail work, not implementation. Capsule 2 is closest to planning because it exists in live source. Capsules 3 and 5 require source-finalization before registry planning, and all three capsules require key-validation and data-shape guardrails before any implementation path can open.
