# MVP-COMMERCIAL-L1-STUDYLOAD-FEEDBACK-RUNTIME-DESIGN-1 - Define L1 Authored Feedback Runtime Design

## 1. Phase identity and scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-FEEDBACK-RUNTIME-DESIGN-1 - Define L1 authored feedback runtime design
```

Type:

```text
Documentation-only / authored feedback runtime design / pre-code / pre-registry / pre-product-use.
```

Product horizon:

```text
Roadmap change-control / L1 authored feedback runtime design / Sales-Ready support.
```

This phase defines how reviewed authored L1 feedback breve/completo should behave at runtime in a future L1 reading StudyLoad. It does not implement feedback.

## 2. Baseline and Context Gate summary

Expected and matched baseline:

```text
HEAD = origin/main = origin/HEAD = 69c70ca
```

Latest accepted commit:

```text
69c70ca - MVP-COMMERCIAL-L1-STUDYLOAD-PASSAGE-RENDERING-DESIGN-1A: review passage rendering
```

Context read:

* `PHASE_LOG.md` recent L1 chain through `69c70ca`.
* Current handoff, compact reporting rule, Codex prompting standard, product horizons, Context Gate protocol, and Living Memory Index.
* L1 passage rendering design and review.
* L1 type-boundary design and review.
* First controlled L1 feedback review.
* L1 implementation-readiness plan and review.
* L1 registry design, registry design review, and compatibility inspection.

Read-only code inspection was limited to the allowed StudyLoad answer form, response route, admin cycle detail view, and static content registry.

## 3. Explicit boundary

This document is:

* documentation-only;
* feedback runtime design only;
* pre-code;
* pre-registry;
* pre-DB;
* pre-runtime;
* pre-product-use.

This phase creates:

* no code;
* no UI component;
* no route;
* no registry entry;
* no `study-load-content.ts` edit;
* no TypeScript type in code;
* no `contentKey` or `contentVersion` implementation artifact;
* no StudyLoad row;
* no DB change;
* no API behavior;
* no test;
* no deployment.

It does not approve student use. It does not approve product use. It does not approve L1 readiness. It does not approve Sales-Ready.

L1 remains not ready. Public Sales-Ready remains blocked.

## 4. Review of prerequisite state

Prerequisite state:

* L1 feedback breve/completo exists only as reviewed documentation assets.
* FEEDBACK-REVIEW-1 passed the first controlled feedback set for future StudyLoad-readiness only.
* TYPE-DESIGN-1 keeps authored feedback separate from correctness validation and answer-key metadata.
* PASSAGE-RENDERING-DESIGN-1 keeps the passage visible above questions.
* PASSAGE-RENDERING-DESIGN-1A approved the passage rendering model for authored feedback runtime design only.
* Feedback runtime is not approved for implementation in this phase.

## 5. Current feedback/runtime assumptions

Read-only inspection supports these current assumptions:

| Area | Current assumption |
| --- | --- |
| Feedback source | Current feedback is generated from selected answer, correct option, and correctness state. |
| Client safety | The answer form receives safe item props before submission and does not receive `correctOptionKey` or scoring data as initial item props. |
| Submission behavior | After submission, the response route returns a generated feedback summary and item-level selected/correct/correctness details. |
| Display behavior | The answer form shows summary counts and item-level generated correctness feedback after submission or in completed read-only review. |
| Stored evidence | The response route stores `multiple_choice_submission` payloads with `contentKey`, `contentVersion`, selected answers, optional correct option keys, correctness, and summary counts. |
| Admin evidence | Admin evidence displays MC summary, content identity, selected option, correct option, and correctness. |
| Authored feedback | Authored L1 feedback breve/completo does not currently exist as runtime content or evidence. |

Implication:

Future L1 authored feedback must be added as a separate reviewed content asset and display layer. It must not replace answer validation, and it must not be confused with the generated MC correctness summary.

## 6. L1 authored feedback requirements

Future L1 authored feedback runtime behavior should support:

* feedback breve and feedback completo as authored assets;
* feedback linked to stable item id and source text id;
* feedback linked to a feedback asset version or review state;
* correctness validation remaining separate from feedback display;
* no authored feedback exposed before answer submission;
* no answer metadata, answer-key note, or distractor rationale leaked before submission;
* feedback connected to the visible passage and the selected answer state;
* student-friendly, non-punitive tone;
* no PAES score, mastery, ranking, theta, prediction, or guaranteed-improvement claims;
* no official PAES/DEMRE or PAES-equivalence claims;
* traceability for feedback versioning and review state;
* M1 runtime behavior preserved.

## 7. Runtime display options

| Option | Description | Benefits | Risks | Fit for first pilot |
| --- | --- | --- | --- | --- |
| A | Show feedback breve per question after submission, with complete feedback available on demand | Balances immediate usefulness and low cognitive load; keeps complete explanation accessible; works with passage-above-questions model. | Requires a future expansion/control design and state handling. | Preferred for first pilot. |
| B | Show complete feedback immediately after submission | Maximum explanation is visible without extra interaction. | Verbose on mobile, can bury the passage and overwhelm early L1 students. | Not preferred for first pilot. |
| C | Show only generated correctness summary first, with authored feedback behind expansion | Minimizes initial UI change and keeps current correctness summary central. | Makes authored L1 feedback feel secondary and may underuse reviewed feedback assets. | Acceptable fallback, but less aligned with L1 feedback purpose than Option A. |
| D | Show authored feedback only after full activity completion | Keeps answering flow clean and prevents mid-activity distraction. | Delays reading-specific correction and weakens item-level feedback immediacy. | Not preferred for first pilot with three items. |

## 8. Recommended feedback runtime model

Recommended model for first implementation planning:

```text
After answer submission, show per-question feedback breve by default and make feedback completo available on demand. Keep correctness state separate. Keep the passage visible above the question/feedback area. Do not show authored feedback before submission.
```

Recommended first-pilot behavior:

* Student answers one or more MC items and submits.
* Runtime validates selected answers against answer metadata.
* Runtime returns or resolves correctness state separately from authored feedback assets.
* Each answered item shows correctness state, selected answer, and authored feedback breve.
* Feedback completo is available through a deliberate expansion affordance or equivalent later-reviewed UI behavior.
* Unanswered items do not receive authored feedback unless a later design explicitly permits guidance for skipped items.
* Completion/read-only review preserves selected answer, correctness state, feedback breve, and access to feedback completo.
* The passage remains above the question/feedback region and is not replaced by feedback.

Rationale:

The first pilot has one short passage and three locating-information items. Brief visible feedback gives immediate reading-specific support without burying the passage or overwhelming the student. Complete feedback remains accessible for students who want deeper explanation.

## 9. Correctness-state behavior

| State | Future authored feedback behavior |
| --- | --- |
| Correct answer | Show correctness state separately, then feedback breve that reinforces the explicit text detail. Feedback completo may explain why the correct option is supported and why distractors fail. |
| Incorrect answer | Show correctness state separately, then feedback breve that redirects to the relevant explicit detail without blame. Feedback completo may explain the correct support and distractor failure. |
| Unanswered / partial submission | Do not show authored item feedback for unanswered items by default. Show neutral unanswered status if current flow supports partial submission. |
| After resubmission if applicable | Current flow appears to prevent resubmission after feedback. If future resubmission is allowed, feedback state and evidence versioning require separate design. |
| After completion / read-only review | Preserve submitted-answer state, correctness summary, and access to feedback breve/completo without enabling answer changes. |

Correctness state must remain conceptually separate from authored feedback. Authored feedback explains the reading evidence; it does not decide correctness by itself.

## 10. Relationship to passage rendering

Runtime feedback must respect the passage rendering design:

* the passage remains available;
* feedback may point to the passage using short paraphrase or location cues;
* feedback must not duplicate long passage text;
* feedback must not distort the passage;
* feedback must not turn per-question excerpts into the primary passage display;
* feedback must not hide or replace the passage after submission;
* optional `volver al texto` behavior remains a future reviewed affordance, not part of this phase.

The passage is the source. Feedback is a post-submission explanation linked to the item and source text.

## 11. Relationship to evidence

Later response/evidence design must decide:

* whether to store feedback id;
* whether to store feedback asset version;
* whether to store whether feedback breve was displayed;
* whether to store whether feedback completo was opened;
* whether to store source text id and text version;
* whether evidence should include only selected answer, correctness, content identity, and item identity;
* whether feedback exposure belongs in MC response evidence, UI telemetry, or no stored evidence for first pilot.

Recommendation for later evidence design:

Keep first implementation minimal unless there is a clear product or audit need. Selected answer, correctness, content identity, item identity, source text id/version, and feedback asset version may be enough for first internal traceability. Opened/expanded telemetry should not be added by default.

## 12. Relationship to admin/tutor evidence

Future admin/tutor evidence design must decide:

* whether admin should see authored feedback ids and versions;
* whether admin should see whether the student opened complete feedback;
* whether admin should see item-to-text linkage;
* whether admin should see source/review/approval metadata;
* whether admin should see the feedback copy itself or only feedback availability/status;
* whether showing feedback metadata could be mistaken for product approval.

Recommended direction:

Admin should eventually see enough content identity and review/version metadata to audit what the student saw, but this should be designed separately. Current admin MC evidence assumptions should not be stretched silently to include authored feedback.

## 13. Risks and caveats

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Cognitive overload | Passage, questions, correctness, and complete explanations can crowd early L1 | Show breve by default; keep completo on demand |
| Verbose mobile feedback | Complete explanations can bury content on small screens | Avoid immediate full feedback display |
| Feedback hiding passage | Weakens reading task and source custody | Keep passage visible above; optional return affordance later |
| Answer leakage before submission | Would invalidate assessment behavior | No authored feedback or answer metadata before submission |
| Confusing correctness with explanation | Could make feedback appear to grade by itself | Keep correctness state separate from authored feedback |
| Premature pedagogical claims | Could overpromise learning or PAES readiness | Ban mastery, score, theta, ranking, prediction, and guarantee claims |
| Overbuilding telemetry | Adds complexity before first pilot evidence needs are known | Defer opened/full-feedback telemetry unless later justified |
| M1 regression | Existing M1 generated feedback must remain stable | Require M1 preservation checks before code |

## 14. No-go gates before code

Code remains blocked until separate phases complete:

* feedback runtime design review;
* response/evidence design;
* admin evidence design;
* L1 continuity design or explicit no-continuity rule;
* test plan;
* product-use gate.

Any future code phase must also include:

* exact files authorized for edit;
* M1 generated-feedback regression protection;
* no pre-submit authored feedback rule;
* no answer metadata leakage rule;
* feedback asset/version traceability decision;
* passage visibility preservation;
* rollback/no-go policy;
* explicit student/product approval boundary.

## 15. Open decisions after this phase

Open decisions:

* Exact UI control for complete feedback expansion.
* Whether feedback completo is available immediately after item submission or only after whole-form submission.
* Whether skipped items get neutral guidance or no authored feedback.
* Whether response evidence stores feedback ids/versions.
* Whether response evidence stores feedback display/open state.
* Whether source text id/version is stored in the MC response payload or another evidence record.
* Whether admin sees feedback copy, feedback metadata, or feedback availability only.
* How authored feedback interacts with any future retry/resubmission flow.
* Whether L1 has continuity or an explicit no-continuity rule.

## 16. Recommended next phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-FEEDBACK-RUNTIME-DESIGN-1A - Review L1 authored feedback runtime design
```

Reason:

The recommended model is narrow but materially affects future student-facing explanation behavior. It should be reviewed before response/evidence design or implementation planning continues.

## 17. Verification performed

Required verification for this phase:

```text
git diff --check
git status --short
git diff --stat
```

Expected changed files:

* `PHASE_LOG.md`
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_FEEDBACK_RUNTIME_DESIGN_1_DEFINE_AUTHORED_FEEDBACK_RUNTIME.md`

## 18. Non-goals

This phase does not:

* edit app code;
* edit `nextjs_space/lib/study-load-content.ts`;
* create or modify TypeScript types in code;
* create UI components;
* create or modify routes;
* create a real L1 registry entry;
* create `contentKey` or `contentVersion` implementation artifacts;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, tests, or app execution;
* inspect `.env`, database URLs, secrets, tokens, passwords, cookies, headers, raw environment values, or backups;
* approve student use;
* approve product use;
* declare L1 ready;
* declare Sales-Ready;
* use Abacus.

## 19. Result marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_FEEDBACK_RUNTIME_DESIGN_1_AUTHORED_FEEDBACK_MODEL_DEFINED
```
