# MVP-COMMERCIAL-L1-STUDYLOAD-TEST-PLAN-1 - Define First Pilot Implementation Test Plan

## 1. Phase Identity and Scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-TEST-PLAN-1 - Define first L1 pilot implementation test plan
```

Type:

```text
Documentation-only / implementation test-plan design / pre-code / pre-registry / pre-product-use.
```

Product horizon:

```text
Roadmap change-control / first L1 pilot implementation readiness / Sales-Ready support.
```

This phase defines the test contract required before any future L1 code implementation, registry artifact authorization, runtime change, or student/product-use path. It does not implement or run tests.

## 2. Baseline and Context Gate Summary

Expected and matched baseline:

```text
HEAD = origin/main = origin/HEAD = 6286c6c
```

Latest accepted commit:

```text
6286c6c - MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-2: audit L1 implementation readiness
```

Context read:

* `PHASE_LOG.md` recent L1 chain through `6286c6c`.
* Current handoff, compact reporting rule, Codex prompting standard, product horizons, Context Gate protocol, Living Memory Index, and autohandoff protocol.
* `IMPLEMENTATION-READINESS-2`.
* L1 continuity/no-continuity design and review.
* L1 admin/tutor evidence design and review.
* L1 admin/tutor role baseline reconciliation.
* L1 response/evidence design and review.
* L1 authored feedback runtime design and review.
* L1 passage rendering design and review.
* L1 registry type-boundary design and review.
* L1 feedback review, implementation-readiness, registry design, registry compatibility, registry prerequisites, and StudyLoad boundary documents.
* M1 non-blocking continuity design and verification documents.

Focused documentation searches covered test plans, verification, regression, answer leakage, pre-submit safety, admin gates, fake continuity, product claims, content identity, MC evidence, admin evidence, and feedback breve/completo.

Read-only code inspection was limited to future implementation and test-surface identification.

## 3. Explicit Boundary

This document is:

* documentation-only;
* test-plan only;
* pre-test-implementation;
* pre-test-execution;
* pre-code;
* pre-registry;
* pre-DB;
* pre-API/runtime;
* pre-UI implementation;
* pre-student-use approval;
* pre-product-use approval.

This phase creates:

* no test file;
* no test execution;
* no app code;
* no registry entry;
* no `study-load-content.ts` change;
* no TypeScript type in code;
* no `contentKey` or `contentVersion` implementation artifact;
* no StudyLoad row;
* no DB change;
* no API, route, runtime, UI, seed, migration, browser, build, deploy, or app operation.

It does not approve student use. It does not approve product use. It does not approve L1 readiness. It does not approve Sales-Ready.

L1 remains not ready. Public Sales-Ready remains blocked.

## 4. Why This Test Plan Is Required

`IMPLEMENTATION-READINESS-2` returned:

```text
NOT_READY_NEEDS_TEST_PLAN
```

The primary reason was that future L1 implementation would touch shared, M1-oriented runtime surfaces:

* static content registry;
* student StudyLoad viewer;
* answer form;
* response API and MC evidence payload;
* completion endpoint and continuity service;
* `/now`;
* admin evidence display.

The first L1 pilot needs new behavior while preserving M1. Tests must protect against:

* M1 registry/viewer regression;
* M1 response/evidence regression;
* M1 continuity regression;
* L1 passage rendering failure;
* L1 authored feedback timing/display failure;
* pre-submit answer leakage;
* admin/tutor evidence becoming an implicit gate;
* fabricated L1 continuity;
* product-use, L1-ready, PAES score/mastery, or Sales-Ready claims.

## 5. Current Implementation / Test Surface Findings

Read-only inspection found these future test surfaces:

| Surface | Current finding | Future test implication |
| --- | --- | --- |
| Registry/static content | `nextjs_space/lib/study-load-content.ts` holds static M1 `StudyLoadContent` keyed by title, with `contentKey`, `contentVersion`, items, options, and optional `correctOptionKey`. | M1 entries must remain unchanged; L1 must not be forced into M1 metadata without a reviewed boundary. |
| Viewer/page | `nextjs_space/app/now/study-loads/[id]/page.tsx` resolves content by title and projects safe items to the client. | Tests must prove M1 viewer still renders and L1 safe projection excludes answer metadata before submission. |
| Answer form | `study-load-answer-form.tsx` receives safe items, submits selected options, and displays generated correctness feedback after submission/completion. | L1 authored feedback tests must preserve correctness separation and no pre-submit leakage. |
| Response API/evidence | `responses/route.ts` validates content key/version, item keys, option labels, stores `kind: multiple_choice_submission`, and returns feedback. | Tests must protect existing MC evidence and future L1 identity fields. |
| Completion/continuity | `complete/route.ts` completes the StudyLoad/session, stores self-report, then calls continuity best-effort; continuity failure does not roll back completion. | Tests must preserve M1 continuity and assert no fake L1 next load without a second reviewed set. |
| Continuity service | `study-load-continuity.ts` has an explicit `PAES_M1` contentKey map and no L1 map. | Tests must prove L1 does not inherit M1 continuity accidentally. |
| Admin evidence | `cycle-detail-view.tsx` parses `multiple_choice_submission`, shows MC summary, content identity, selected/correct rows, and M1 pedagogical metadata. | L1 admin evidence tests must add bounded metadata without full feedback copy or actions/gates. |
| `/now` | `/now/page.tsx` lists pending, in-progress, completed loads and shows a general caught-up/preparing message when no active loads exist. | L1 no-next state copy must avoid waiting-for-tutor and product-readiness claims. |
| Existing test tooling | `nextjs_space/package.json` has no dedicated `test` script; one existing Node assert-style test file exists: `nextjs_space/lib/student-access-validation.test.ts`. | Future test implementation must first decide exact runner/tooling or use a scoped Node/TypeScript test pattern. |

The repo root has no `package.json`; the active package file is under `nextjs_space/package.json`.

## 6. Test Categories

Future implementation must define tests/checks for:

* M1 registry/viewer regression;
* M1 response/evidence regression;
* M1 continuity regression;
* L1 registry/content identity;
* L1 passage rendering;
* L1 answer form safe props;
* no pre-submit answer leakage;
* L1 authored feedback runtime;
* L1 response/evidence payload;
* L1 admin/tutor evidence display;
* no admin/tutor gate;
* no fake L1 continuity;
* no product-use, L1-ready, or Sales-Ready claims;
* missing metadata and fallback behavior;
* accessibility and mobile smoke expectations at design level.

## 7. Concrete Future Test Cases

| Future test case | Expected assertions |
| --- | --- |
| `M1_REGISTRY_VIEWER_001_existing_studyload_renders_unchanged` | Existing M1 StudyLoad content renders title, instructions, item count, options, and no passage-only L1 UI. |
| `M1_RESPONSE_001_submission_stores_expected_mc_evidence` | M1 submission stores `multiple_choice_submission`, schema version, `contentKey`, `contentVersion`, selected answers, optional correct option keys, correctness, and summary. |
| `M1_CONTINUITY_001_completion_triggers_expected_next_m1` | Completing a mapped M1 StudyLoad creates or skips exactly one expected next StudyLoad and preserves existing M1 continuity behavior. |
| `L1_REGISTRY_001_identity_fields_present_for_internal_candidate` | Future L1 fixture exposes content identity, `PAES_L1`, reading content type, stable item ids, text id/version, feedback asset ids/versions, and approval states as not approved. |
| `L1_VIEWER_001_passage_card_above_questions` | L1 viewer shows first-class passage card above questions, separate from task instructions. |
| `L1_VIEWER_002_m1_does_not_render_l1_passage_card` | Existing M1 content continues using current instruction/question rendering and is not wrapped in L1 passage UI. |
| `L1_SAFE_PROPS_001_no_correct_option_before_submission` | Client pre-submit props do not include `correctOptionKey`, answer-key notes, distractor rationale, feedback completo, or correctness. |
| `L1_FEEDBACK_001_correctness_separate_from_authored_feedback` | Submitted state shows correctness as validation output and authored feedback as explanation, not grading logic. |
| `L1_FEEDBACK_002_breve_visible_after_submission` | Feedback breve appears per answered question only after submission. |
| `L1_FEEDBACK_003_completo_on_demand_not_default` | Feedback completo is available on demand but not expanded by default. |
| `L1_FEEDBACK_004_no_authored_feedback_pre_submit` | No authored feedback text, ids with explanatory content, answer-key notes, or distractor rationale appear before submission. |
| `L1_EVIDENCE_001_payload_identity_fields` | L1 evidence includes `contentKey`, `contentVersion`, stable item ids, `textId`, `textVersion`, feedback ids/versions, selected answer, correctness, and summary. |
| `L1_EVIDENCE_002_no_full_feedback_telemetry_by_default` | First pilot evidence stores feedback asset identity but does not require full feedback opened/exposure telemetry by default. |
| `L1_ADMIN_001_bounded_metadata_no_full_feedback_copy` | Admin evidence shows content/text/feedback metadata/status and answer rows, but no full feedback copy by default. |
| `L1_ADMIN_002_no_actions_or_gates_in_evidence_view` | Admin L1 evidence view has no approve-next, pause, block, release, access mutation, route mutation, or administrative adjustment controls. |
| `L1_CONTINUITY_001_no_next_l1_without_second_reviewed_set` | Completing first L1 pilot does not create a next L1 StudyLoad when no second reviewed registry-ready set exists. |
| `L1_CONTINUITY_002_other_programs_not_blocked_by_l1_no_next` | L1 no-next state does not block other active tutoring programs that have their own continuity rules. |
| `L1_ADMIN_GATE_001_admin_review_does_not_release_or_pause` | Viewing or not viewing admin evidence does not release, pause, or gate routine continuity. |
| `L1_NOW_001_no_next_copy_avoids_waiting_for_tutor` | Student no-next-L1 state avoids indefinite waiting-for-tutor language and does not imply manual review is required. |
| `L1_CLAIMS_001_no_l1_ready_product_paes_sales_claims` | Student/admin copy contains no L1-ready, product-approved, PAES score, mastery, theta, ranking, prediction, guaranteed improvement, officialness, or Sales-Ready claims. |
| `L1_FALLBACK_001_missing_l1_metadata_is_safe` | Missing text/feedback/review metadata produces an internal safe fallback, not a crash, student failure, product readiness claim, or admin gate. |
| `L1_A11Y_MOBILE_001_passage_and_feedback_are_readable` | Manual or component-level smoke confirms passage and feedback are readable on mobile-width layouts and preserve focus/order expectations. |

These names are contractual planning labels only. This phase creates no test files.

## 8. Test Levels

Future implementation should map test cases to levels:

| Level | Candidate coverage |
| --- | --- |
| Unit/type-level tests | Registry/type discriminants, adapter safe projection, continuity outcome helpers, evidence payload builders/parsers if extracted. |
| Component tests | L1 passage rendering, answer form safe props, post-submit feedback breve/completo states, no full feedback default. |
| Route/API tests | Response validation, MC evidence storage shape, contentKey/contentVersion mismatch rejection, no pre-submit response leakage, completion/no-continuity behavior. |
| Integration tests | M1 complete -> next M1 continuity, L1 complete -> no next L1 without second reviewed set, `/now` state after completion. |
| Manual smoke tests | Mobile readability, keyboard/focus flow, student no-next-L1 copy, admin evidence readability. |
| Documentation/static grep checks | No forbidden product claims; no `L1 ready`, product-approved, PAES score/mastery/Sales-Ready claims in new L1 runtime copy. |

Exact tooling is still an implementation-readiness decision. Current package scripts do not define a standard test runner, so a future phase must decide whether to add scoped test tooling, use an existing Node/TypeScript test pattern, or rely on build/typecheck plus manual smoke for the first narrow code phase.

## 9. Future Test Data Requirements

Future implementation needs fixtures or controlled setup for:

* existing M1 fixture content for at least one current registry-backed StudyLoad;
* first L1 pilot fixture content for `l1_locating_information_pilot_set_01`;
* safe L1 pre-submit client-props fixture;
* L1 submitted response fixture with selected answers and correctness;
* completed L1 response fixture with self-report relationship if applicable;
* L1 admin evidence fixture with content/text/item/feedback identity;
* no-next-L1 continuity fixture with no second reviewed L1 set;
* invalid or missing metadata fixture for text id, text version, feedback identity, and approval boundary;
* M1 continuity fixture for an existing mapped M1 progression pair.

Fixtures must remain internal. They must not create product-use approval or public readiness claims.

## 10. No-Go / Rollback Criteria

A future implementation merge must be blocked or rolled back if any of these occur:

* existing M1 StudyLoad rendering changes unintentionally;
* M1 response/evidence storage changes unintentionally;
* M1 continuity map or completion behavior regresses;
* correct answer metadata, answer-key notes, distractor rationale, or authored feedback leaks before submission;
* authored feedback replaces correctness validation;
* L1 passage is hidden inside generic instructions instead of first-class display;
* feedback completo is shown by default when the accepted model says on demand;
* L1 evidence omits content, text, item, or feedback identity required by this plan;
* admin evidence shows full feedback copy by default without later approval;
* admin evidence introduces approve/release/pause/block/access/route mutation controls or an implied continuity gate;
* completion fabricates a next L1 StudyLoad when no second reviewed registry-ready set exists;
* student no-next-L1 copy implies waiting for tutor or product readiness;
* new copy claims L1 readiness, product approval, PAES score/mastery, officialness, or Sales-Ready;
* build, typecheck, selected tests, or required manual smoke fail in the future implementation phase.

## 11. Relationship to Registry Artifact Authorization

This test plan is necessary before registry artifact authorization, but it is not registry authorization.

This phase does not create:

* a registry entry;
* a `contentKey`;
* a `contentVersion`;
* a `study-load-content.ts` change;
* a StudyLoad;
* a test fixture in code.

Registry artifact authorization remains a separate future phase.

## 12. Relationship to Product-Use Gate

Passing future tests would not approve student use or product use by itself.

The following remain separate:

* text/question/feedback product-use approval;
* L1 route readiness;
* public offer readiness;
* Sales-Ready gate approval.

L1 remains not ready. Public Sales-Ready remains blocked.

## 13. Recommended Next Phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-TEST-PLAN-1A - Review first L1 pilot implementation test plan
```

Reason:

The plan defines the required test contract, but it should be reviewed before registry artifact authorization or any narrow code phase. The review should confirm that M1 regression protection, L1 safety checks, no-admin-gate checks, no-fake-continuity checks, and no-claim checks are sufficient.

## 14. Verification Performed

Verification for this phase:

* Git preflight matched expected baseline.
* Required governance and L1 chain documents were read.
* Focused documentation searches were performed.
* Read-only code inspection was limited to allowed implementation/test surfaces.
* No app code, test file, registry, DB, API, runtime, browser, build, test execution, Prisma, migration, seed, deploy, env, secret, backup, or Abacus activity occurred.
* Post-edit validation is recorded in `PHASE_LOG.md`.

## 15. Non-Goals

This phase does not:

* edit app code;
* edit tests;
* create test files;
* run tests;
* edit `nextjs_space/lib/study-load-content.ts`;
* create or modify TypeScript types in code;
* create UI components;
* create or modify routes;
* create a real L1 registry entry;
* create `contentKey` or `contentVersion` implementation artifacts;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, test execution, or app execution;
* inspect `.env`, database URLs, secrets, tokens, passwords, cookies, headers, raw environment values, or backups;
* approve student use;
* approve product use;
* declare L1 ready;
* declare Sales-Ready;
* make admin/tutor review a default StudyLoad continuity gate;
* design or implement administrative adjustment workflow;
* design or implement pause, block, access mutation, or route mutation actions;
* infer L1 continuity from M1 continuity maps;
* authorize implementation;
* use Abacus.

## 16. Result Marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_TEST_PLAN_1_TEST_PLAN_DEFINED
```
