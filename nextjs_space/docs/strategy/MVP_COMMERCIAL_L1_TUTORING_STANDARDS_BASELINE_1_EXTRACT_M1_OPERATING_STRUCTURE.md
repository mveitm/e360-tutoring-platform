# MVP-COMMERCIAL-L1-TUTORING-STANDARDS-BASELINE-1 - Extract M1 Operating Structure

## 1. Phase Identity And Scope

Phase:

`MVP-COMMERCIAL-L1-TUTORING-STANDARDS-BASELINE-1 - Extract tutoring standards and M1 operating structure for L1 implementation`

Date:

2026-05-26

Type:

Documentation-only tutoring standards baseline.

Purpose:

Pause before L1 internal implementation and extract the existing standards of a Bexauri tutoring experience, using M1 as the strongest current operational reference.

## 2. Baseline And Context Gate Summary

Expected baseline:

```text
HEAD = origin/main = origin/HEAD = 7e79cc1
Latest accepted commit:
7e79cc1 - MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-3: review narrow L1 code readiness
```

Git preflight is the live source of truth if this embedded baseline becomes stale.

Context Gate sources read included:

* `PHASE_LOG.md` recent L1 chain through `7e79cc1`.
* `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.
* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`.
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`.
* `nextjs_space/docs/governance/AUTOPROPAGATING_HANDOFF_PROTOCOL_V2.md`.
* `nextjs_space/docs/product/PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md`.
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_IMPLEMENTATION_READINESS_3_REVIEW_NARROW_INTERNAL_CODE_READINESS.md`.
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_REGISTRY_ARTIFACT_AUTHORIZATION_1_AUTHORIZE_FIRST_L1_REGISTRY_ARTIFACT.md`.
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_TEST_PLAN_1A_REVIEW_FIRST_PILOT_IMPLEMENTATION_TEST_PLAN.md`.
* M1 tutoring, UI journey, SRA, operator, future tutor-agent, and continuity documents listed in the verification section.

## 3. Explicit Boundary

This phase is:

* documentation-only;
* tutoring-standards extraction only;
* no code;
* no registry implementation;
* no DB;
* no API/runtime;
* no UI implementation;
* no student/product approval;
* L1 not ready;
* Sales-Ready blocked.

This phase does not authorize L1 implementation. It defines a standards baseline that a future implementation phase must respect.

## 4. Why This Pause Exists

`IMPLEMENTATION-READINESS-3` concluded that the first L1 internal slice is ready to enter a narrow internal code implementation phase. That decision remains important, but implementation should not proceed as an isolated L1 special case.

Bexauri already has a coherent tutoring model in the M1 documentation and runtime:

* the student studies inside short, guided activities;
* Bexauri regulates internal state and continuity;
* evidence and self-report feed future decisions;
* feedback is attached to the activity;
* admin/tutor supervision improves quality in parallel;
* ordinary supervision is not a default manual gate.

This pause exists to extract those standards before L1 code begins, so the first L1 implementation inherits the Bexauri tutoring contract while adapting only the parts that must be reading-specific.

## 5. Definition Of "Tutoría" In Bexauri

Existing documentation supports this operational definition:

```text
A Bexauri tutoría is a supervised, evidence-aware learning program where the student works through short StudyLoads, submits answers and self-report, receives feedback, and continues through system-regulated next steps while human/operator supervision improves quality asynchronously.
```

A tutoría is not merely:

* a static content list;
* an admin task queue;
* a one-time diagnostic;
* a manual review workflow;
* a raw LearningCycle exposed to the student.

Operational components:

* Student-facing program identity: a student enters a tutoring area such as `PAES_M1` or future `PAES_L1`, not an internal cycle.
* Enrollment/access relation: active access and enrollment determine whether the student can work in the tutoring flow.
* StudyLoad as atomic learning unit: the student works one short, bounded learning activity at a time.
* Evidence collection: answers, correctness where safe, self-report, completion, and metadata become evidence.
* Feedback: feedback is attached to the item/activity and appears after response, not as disconnected generic explanation.
* Continuity: Bexauri prepares the next useful action when safe, without making ordinary admin review a release gate.
* Admin/tutor supervision: operators, supervisors, and future tutor agents improve quality, inspect evidence, prepare adjustments, and detect risk, but do not normally block routine continuity.
* Dashboard/`/now` relationship: `/now` is an orientation surface for what to work on now, not an administrative station.
* Non-blocking supervision: the standing rule is `review != gate`, `supervision != bottleneck`, and `operator action != prerequisite for normal student continuity`.

## 6. M1 Operating Structure

M1 is the current strongest operational reference because it has both documented product doctrine and runtime implementation.

### 6.1 Content Registry And Identity

Current M1 content is represented in `nextjs_space/lib/study-load-content.ts`.

Observed structure:

* `StudyLoadContent` includes `contentKey`, `contentVersion`, `title`, `program`, `topic`, `estimatedMinutes`, `instructions`, `items`, `currentLimitationNotice`, and optional `pedagogicalMetadata`.
* Items include `key`, `prompt`, `options`, optional `correctOptionKey`, and optional explanation.
* The current registry includes `PAES_M1` content such as `paes_m1_balanced_entry_initial`, `paes_m1_linear_equations_basic`, and related progression content.
* Runtime lookup still includes title-based behavior, with a secondary `contentKey` index available.

M1 standard to preserve:

* stable content identity matters;
* display title should not be the sole durable identity;
* answer keys are registry-side validation data and must not be treated as pre-submit client content.

### 6.2 `/now` Orientation Surface

Current `/now` behavior:

* identifies the active enrollment and current open learning context;
* shows program identity;
* splits StudyLoads into pending, in-progress, and completed/history states;
* uses student-facing activity language such as `Actividad actual`;
* provides `Ver actividad` and `Empezar`;
* keeps LearningCycle mechanics mostly internal.

M1 standard to preserve:

* `/now` should answer what the student works on now;
* it should not require the student to manage internal cycle state;
* it should show history and active work without implying a human review bottleneck.

### 6.3 Activity Viewer

Current activity viewer behavior:

* validates active ownership and enrollment.
* resolves registered content for the StudyLoad title.
* renders content instructions and items.
* passes a safe item projection to the client answer form, stripping `correctOptionKey`.
* prepares submitted-state feedback server-side when prior MC evidence exists.

M1 standard to preserve:

* student-facing activity is the center of the tutoring experience;
* client props must not leak answer keys before submission;
* submitted review may show correctness and correct answers only after response.

### 6.4 Answer Submission And Feedback

Current answer form behavior:

* receives safe items only;
* records selected options;
* posts `contentKey`, `contentVersion`, and answers to the response route;
* shows generated correctness feedback after submission;
* then asks for self-report before finalization;
* avoids PAES score or mastery claims.

Current response route behavior:

* validates the StudyLoad belongs to the active student context.
* requires `in_progress` status.
* validates `contentKey` and `contentVersion` against registered content.
* validates item keys and selected option keys.
* stores a `multiple_choice_submission` payload with `schemaVersion: 1`, answers, selected options, correct option references where applicable, and summary counts.
* returns feedback derived from correctness.

M1 standard to preserve:

* answer submission is evidence collection;
* correctness validation is separate from student-facing explanation;
* feedback appears after response, not before;
* self-report is part of the closure evidence.

### 6.5 Completion And Self-Report

Current completion behavior:

* requires an in-progress StudyLoad and in-progress tutoring session;
* records the self-report as a response;
* transitions StudyLoad and session to completed;
* updates enrollment activity state;
* then attempts continuity best-effort outside the completion transaction.

M1 standard to preserve:

* completion must not be rolled back by downstream continuity failure;
* self-report is not a diagnostic label by itself;
* the student should not need to perform separate administrative closure outside the activity.

### 6.6 Response And Admin Evidence

Current admin evidence behavior:

* parses `multiple_choice_submission` evidence;
* shows compact summary counts;
* shows content identity where available;
* shows selected/correct/correctness rows;
* shows self-report evidence;
* can surface registry pedagogical metadata;
* remains evidence display, not an automatic student continuity gate.

M1 standard to preserve:

* admin evidence is supervisory and advisory;
* evidence review supports quality, QA, risk monitoring, and future route improvement;
* evidence display must not imply that every next StudyLoad needs admin approval.

### 6.7 Continuity

Current continuity behavior:

* `nextjs_space/lib/study-load-continuity.ts` contains an explicit `PAES_M1` contentKey progression map.
* Completion calls a dedicated continuity service after the main completion transaction.
* The service resolves current content and next content by registry identity.
* It creates one pending next StudyLoad when safe.
* It returns structured outcomes such as created, skipped existing, end of sequence, missing content, or program mismatch.
* M1 validation documented that the first progression pair can create the next pending StudyLoad without supervisor release.

M1 standard to preserve:

* continuity is rule-based and auditable;
* continuity must be non-blocking by ordinary admin review;
* fallback should be explicit when no next content exists;
* continuity is not an adaptive AI, mastery, or PAES score claim.

## 7. Standards L1 Should Inherit

L1 should inherit these Bexauri standards:

* Micro-StudyLoad structure: short, bounded activities with clear student-facing purpose.
* Stable content identity: `contentKey` and `contentVersion` must identify the internal artifact.
* Safe client projection: pre-submit client props must not include answer keys or answer metadata.
* Answer submission and evidence: selected answer, item identity, content identity, correctness, and summary evidence must remain traceable.
* Feedback after response: explanations appear after submission and remain attached to the item/activity.
* Completion and self-report relation: if the standard activity closure flow is used, self-report remains part of completion evidence.
* Admin evidence as advisory/read-only: L1 evidence may support review but must not create a default admin gate.
* Continuity non-blocking by admin: lack of ordinary admin review must not be the reason routine continuity is blocked.
* No product overclaims: no PAES score, mastery, officialness, L1-ready, product-approved, or Sales-Ready copy.
* Internal structures stay internal: LearningCycles, registry mechanics, review statuses, and operator queues must not become student workload.
* Runtime completion resilience: a completed activity should stay completed even if next-load preparation is unavailable.
* Explicit fallback: when no safe next activity exists, Bexauri should avoid fake continuity and avoid indefinite "waiting for tutor" language.

## 8. Standards L1 Must Adapt

L1 cannot be a copy of M1 math content. It must adapt the shared tutoring standards to reading-specific requirements.

Required L1 adaptations:

* First-class passage/text asset: passage body, title/internal heading, text id, text version, and format must be explicit.
* Reading-specific item metadata: items need stable L1 ids, `basedOnTextId`, and answer metadata linked to the passage.
* Authored feedback assets: L1 feedback breve/completo must be authored and reviewed, not generated as a generic correctness substitute.
* Source/rights/review metadata: text, items, and feedback need source-rights and review/approval boundaries.
* Evidence identity: response evidence should include text id/version and authored feedback references in addition to contentKey/contentVersion and item ids.
* Passage rendering: the passage must be visible as first-class content, not hidden inside generic instructions.
* Feedback relationship to passage: feedback may refer to the passage but should not duplicate, distort, or leak answer metadata before submission.
* No automatic L1 continuity yet: first L1 pilot has no next L1 StudyLoad until a second reviewed registry-ready set exists.
* Internal-only status: the first L1 artifact remains not student-approved, not product-approved, not L1-ready, and not Sales-Ready.

## 9. M1 Assumptions L1 Must Not Copy Blindly

L1 must not blindly copy:

* M1 math metadata such as M1 axes, slices, algebra/function-specific taxonomy, or math difficulty assumptions.
* M1 continuity maps or progression pairs.
* Title-only lookup as the durable design direction.
* Generic instructions-as-content for a passage.
* Generated correctness feedback as a substitute for authored L1 feedback breve/completo.
* M1 item-only content shape that lacks a first-class text asset.
* M1 copy about math exercises, equations, or M1-specific PAES framing.
* M1 roadmap traversal assumptions such as algebra corridor, non-algebra spiral, or M1 milestone timing.
* Admin evidence fields that assume only MC math content and omit text/feedback identity.
* Product language that suggests complete PAES preparation, public availability, mastery, score prediction, adaptive AI, or Sales-Ready status.

## 10. Implementation Implications

The upcoming internal implementation should be constrained by this baseline:

* Keep the future code phase narrow.
* Preserve all existing M1 behavior unless a future prompt explicitly authorizes a scoped M1-compatible change.
* Prefer an adapter/boundary approach over a broad registry refactor.
* Keep L1 internal-only and documentation-backed.
* Do not create DB rows, seed data, or real StudyLoad rows.
* Do not add admin actions, gates, pause, block, access mutation, or route mutation controls.
* Do not infer L1 continuity from M1 continuity maps.
* Do not fabricate next L1 activity.
* Do not leak answer keys or authored feedback before submission.
* Do not put the passage in generic instructions.
* Preserve no product-use, no L1-ready, and no Sales-Ready status.
* Use the previously reviewed test plan and Readiness-3 minimum blocking test subset as implementation guardrails.

## 11. Readiness Impact

Decision:

```text
READINESS_3_STILL_VALID_FOR_NARROW_INTERNAL_CODE
```

Rationale:

* The M1 tutoring standards do not contradict `IMPLEMENTATION-READINESS-3`.
* The extraction clarifies how L1 should behave as a Bexauri tutoría rather than as an isolated content experiment.
* No new blocking design gap was found.
* The future implementation must explicitly inherit the shared tutoring standards and adapt only the reading-specific surfaces.

This phase does not authorize code. It confirms that the previously recommended code phase remains the correct next phase if the prompt is narrow, internal-only, and test-guarded.

## 12. Recommended Next Phase

Recommended next phase:

`MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-IMPLEMENTATION-1 - Implement first L1 internal registry/viewer/feedback/evidence slice`

Required posture for that future phase:

* internal-only;
* no DB rows;
* no product/student approval;
* no Sales-Ready;
* no fake L1 continuity;
* no admin gate;
* preserve M1 behavior;
* implement or run the minimum blocking checks authorized by the implementation prompt.

## 13. Verification Performed

Preflight:

* `git status --short`.
* `git log --oneline --decorate --graph -8`.

Documentation read:

* `PHASE_LOG.md`.
* `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.
* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`.
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`.
* `nextjs_space/docs/governance/AUTOPROPAGATING_HANDOFF_PROTOCOL_V2.md`.
* `nextjs_space/docs/product/PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md`.
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_IMPLEMENTATION_READINESS_3_REVIEW_NARROW_INTERNAL_CODE_READINESS.md`.
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_REGISTRY_ARTIFACT_AUTHORIZATION_1_AUTHORIZE_FIRST_L1_REGISTRY_ARTIFACT.md`.
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_TEST_PLAN_1A_REVIEW_FIRST_PILOT_IMPLEMENTATION_TEST_PLAN.md`.
* `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`.
* `nextjs_space/docs/operations/MVP_UI_FLOW_2_HIDE_CYCLE_LABEL_AND_REFRESH_NOW_COPY.md`.
* `nextjs_space/docs/operations/MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md`.
* `nextjs_space/docs/operations/MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md`.
* `nextjs_space/docs/operations/MVP_SRA_SCOPE_4_FUTURE_TUTOR_AGENT_GOVERNANCE_MODEL.md`.
* `nextjs_space/docs/operations/MVP_FLOW_4_B_MINIMAL_NON_BLOCKING_NEXT_STUDYLOAD_CONTINUITY_DESIGN.md`.
* `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md`.
* `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_RETRY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md`.

Documentation search:

* Focused search over `PHASE_LOG.md` and `nextjs_space/docs` for tutoring, M1, StudyLoad, continuity, `/now`, SRA, evidence, feedback, admin/tutor supervision, non-blocking continuity, content identity, product-use, and Sales-Ready terms.

Read-only code inspected:

* `nextjs_space/lib/study-load-content.ts`.
* `nextjs_space/lib/study-load-continuity.ts`.
* `nextjs_space/app/now/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`.
* `nextjs_space/app/api/study-loads/[id]/responses/route.ts`.
* `nextjs_space/app/api/study-loads/[id]/complete/route.ts`.
* `nextjs_space/app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx`.
* `nextjs_space/package.json`.

Validation required before closure:

* `git diff --check`.
* `git status --short`.
* `git diff --stat`.

## 14. Non-Goals

This phase did not:

* edit app code;
* edit tests;
* create test files;
* run tests;
* run build;
* edit `nextjs_space/lib/study-load-content.ts`;
* create or modify TypeScript types in code;
* create UI components;
* create or modify routes;
* create a real L1 registry entry;
* create actual `contentKey` or `contentVersion` implementation artifacts in code;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, test execution, build, or app execution;
* inspect `.env`, `DATABASE_URL`, `PROD_DATABASE_URL`, secrets, tokens, passwords, cookies, headers, raw environment values, or backups;
* approve student use;
* approve product use;
* declare L1 ready;
* declare Sales-Ready;
* use Abacus;
* make admin/tutor review a default StudyLoad continuity gate;
* design or implement administrative adjustment workflow;
* design or implement pause/block/access mutation actions;
* infer L1 continuity from M1 continuity maps;
* authorize implementation.

## 15. Result Marker

```text
MVP_COMMERCIAL_L1_TUTORING_STANDARDS_BASELINE_1_M1_STANDARDS_EXTRACTED
```
