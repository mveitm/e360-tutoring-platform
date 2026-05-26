# MVP-COMMERCIAL-L1-STUDYLOAD-RESPONSE-EVIDENCE-DESIGN-1 - Define L1 Response Evidence Design

## 1. Phase identity and scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-RESPONSE-EVIDENCE-DESIGN-1 - Define L1 response/evidence design
```

Type:

```text
Documentation-only / response-evidence design / pre-code / pre-registry / pre-product-use.
```

Product horizon:

```text
Roadmap change-control / L1 response and evidence design / Sales-Ready support.
```

This phase defines what a future L1 reading StudyLoad response/evidence payload should preserve. It does not implement evidence, edit code, touch DB/API/runtime, or approve student/product use.

## 2. Baseline and Context Gate summary

Expected and matched baseline:

```text
HEAD = origin/main = origin/HEAD = 941ede4
```

Latest accepted commit:

```text
941ede4 - MVP-COMMERCIAL-L1-STUDYLOAD-FEEDBACK-RUNTIME-DESIGN-1A: review authored feedback runtime
```

Context read:

* `PHASE_LOG.md` recent L1 chain through `941ede4`.
* Current handoff, compact reporting rule, Codex prompting standard, product horizons, Context Gate protocol, and Living Memory Index.
* L1 authored feedback runtime design and review.
* L1 passage rendering design and review.
* L1 type-boundary design and review.
* First controlled L1 feedback review.
* L1 implementation-readiness plan and review.
* L1 registry design, registry design review, and compatibility inspection.

Read-only code inspection was limited to the allowed response route, admin cycle detail view, answer form, and static content registry.

## 3. Explicit boundary

This document is:

* documentation-only;
* response/evidence design only;
* pre-code;
* pre-registry;
* pre-DB;
* pre-API/runtime;
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
* no runtime behavior;
* no test;
* no deployment.

It does not approve student use. It does not approve product use. It does not approve L1 readiness. It does not approve Sales-Ready.

L1 remains not ready. Public Sales-Ready remains blocked.

## 4. Review of prerequisite state

Prerequisite state:

* TYPE-DESIGN-1A approved the L1 type boundary for passage rendering design.
* PASSAGE-RENDERING-DESIGN-1A approved the passage rendering model for authored feedback runtime design.
* FEEDBACK-RUNTIME-DESIGN-1A approved the authored feedback runtime model for response/evidence design.
* The first L1 pilot set remains documentation-only.
* The future L1 evidence model must preserve correctness and traceability without overbuilding telemetry.
* Response/evidence design is not approved for implementation in this phase.

## 5. Current M1 response/evidence assumptions

Read-only inspection supports these current assumptions:

| Area | Current assumption |
| --- | --- |
| Request body | The answer form posts `contentKey`, `contentVersion`, and `answers` with `itemKey` and `selectedOptionKey`. |
| Response payload kind | Stored response content uses `kind: multiple_choice_submission`. |
| Schema version | Stored response content uses `schemaVersion: 1`. |
| Content identity | Stored evidence includes `contentKey` and `contentVersion`. |
| StudyLoad identity | Stored evidence includes `studyLoadId`. |
| Submission time | Stored evidence includes `submittedAt`. |
| Item identity | Stored answers use `itemKey`. |
| Selected answer | Stored answers use `selectedOptionKey`. |
| Correct answer | Stored answers may include `correctOptionKey` after submission when an answer key exists. |
| Correctness | Stored answers may include `isCorrect`; summary stores `correctCount` and `hasAnswerKey`. |
| Summary | Stored summary includes answered count, total item count, correct count, and answer-key availability. |
| Student feedback | Runtime returns generated feedback based on selected/correct/correctness state. |
| Admin evidence | Admin parses MC payloads and displays content identity, answer rows, correct option, correctness, and summary. |
| Authored feedback evidence | No authored feedback breve/completo id, version, display state, or opened state is currently stored. |

Implication:

Future L1 evidence should extend traceability only where needed. It should not weaken current M1 MC validation or turn authored feedback into the correctness source.

## 6. L1 evidence requirements

A future first-pilot L1 response/evidence payload should preserve:

* `contentKey`;
* `contentVersion`;
* content type or program, such as `reading_l1_locating_information` / `PAES_L1`;
* stable item id for each answered item;
* selected option label;
* selected option text if needed for read-only review;
* correct option reference after submission only;
* correctness after submission;
* `textId`;
* `textVersion`;
* feedback breve id or equivalent stable reference;
* feedback completo id or equivalent stable reference;
* feedback asset version or review reference;
* source, review, or approval metadata references if needed for audit;
* submission timestamp;
* submission or completion state;
* relationship to self-report/completion evidence if relevant;
* no pre-submit answer metadata leakage.

The evidence payload should preserve enough identity to know what the student answered and what reviewed content assets were active, without implying mastery, PAES score, L1 readiness, product approval, or Sales-Ready.

## 7. Evidence design options

| Option | Description | Benefits | Risks | Fit for first pilot |
| --- | --- | --- | --- | --- |
| A | Minimal MC evidence only plus `contentKey` / `contentVersion` | Closest to current M1 shape; lowest implementation surface. | Under-traceable for L1 because text asset and feedback asset identity are missing. | Not preferred for L1. |
| B | MC evidence plus `textId` / `textVersion` and stable item ids | Adds source-text traceability while staying narrow. | Does not prove which feedback assets were available or reviewed at submission time. | Acceptable but incomplete for authored-feedback pilot. |
| C | MC evidence plus `textId` / `textVersion` and feedback asset ids/versions | Balances correctness, text custody, and feedback traceability without full telemetry. | Requires future type/payload design and admin decisions. | Preferred for first pilot. |
| D | Full telemetry including feedback breve exposure, feedback completo opened state, timestamps, and interaction counts | Rich audit and product insight. | Higher privacy, complexity, UI-state, and migration burden; likely overbuilt for first pilot. | Not preferred initially. |

## 8. Recommended evidence model

Recommended model for first implementation planning:

```text
Use MC evidence plus contentKey/contentVersion, stable item ids, textId/textVersion, and authored feedback asset ids/versions. Do not store full feedback exposure/opened-state telemetry by default.
```

Recommended first-pilot behavior:

* Preserve selected answers, correctness, answer-key availability, and summary counts.
* Preserve stable content identity through `contentKey` and `contentVersion`.
* Preserve L1 source custody through `textId` and `textVersion`.
* Preserve stable item identity using the reviewed L1 item ids rather than generic-only keys where possible.
* Preserve feedback asset identity/version so a later reviewer can tell which feedback breve/completo set was available.
* Treat feedback breve as displayed implicitly when post-submission feedback is rendered, unless a future telemetry design says otherwise.
* Do not store feedback completo opened state in the first pilot unless a later design identifies a clear need.
* Keep admin/evidence extensibility for future display without adding student-facing product claims.

Rationale:

Option C is the narrowest model that gives L1 enough traceability. Option A is too thin for a text-and-feedback reading activity, while Option D adds telemetry complexity before the first pilot needs are proven.

## 9. Evidence payload conceptual shape

The following example is conceptual pseudo-JSON only. It is not implementation and must not be copied into code without a future implementation phase and review.

```json
{
  "kind": "l1_reading_multiple_choice_submission",
  "schemaVersion": "conceptual-v0.1",
  "studyLoadId": "<study-load-id>",
  "submittedAt": "<iso-timestamp>",
  "contentIdentity": {
    "contentKey": "l1_locating_information_pilot_set_01",
    "contentVersion": "internal-v0.1",
    "contentType": "reading_l1_locating_information",
    "program": "PAES_L1"
  },
  "textIdentity": {
    "textId": "original_l1_text_locating_information_01_draft",
    "textVersion": "draft-0.1"
  },
  "items": [
    {
      "itemId": "l1_locating_information_item_01",
      "selectedOptionKey": "A",
      "correctOptionKey": "A",
      "isCorrect": true,
      "feedback": {
        "feedbackBreveId": "l1_locating_information_item_01_feedback_breve",
        "feedbackCompletoId": "l1_locating_information_item_01_feedback_completo",
        "feedbackVersion": "reviewed-v0.1",
        "feedbackReviewState": "reviewed_for_future_studyload_readiness_only"
      }
    }
  ],
  "summary": {
    "answeredCount": 3,
    "totalItemCount": 3,
    "correctCount": 0,
    "hasAnswerKey": true
  },
  "approvalBoundary": {
    "studentUseApproved": false,
    "productUseApproved": false,
    "salesReadyImplication": "none"
  }
}
```

Conceptual notes:

* `correctCount` above is illustrative only, not evidence from a real student.
* Feedback ids are stable references to authored assets, not student-facing content approval.
* Approval boundary metadata is optional in stored runtime evidence if another reviewed source can provide it reliably, but the implementation must preserve the boundary somewhere auditable.
* If future implementation keeps `kind: multiple_choice_submission`, it must still define a safe way to discriminate L1 text/feedback evidence from M1 MC evidence.

## 10. Correctness and feedback separation

Future evidence must preserve this separation:

* correctness is validation output;
* authored feedback is explanatory content;
* feedback ids or versions do not determine correctness;
* answer-key notes and distractor rationales are not student-facing evidence;
* evidence must not imply mastery, PAES score, theta, ranking, prediction, guaranteed improvement, L1 readiness, or product readiness.

The correct option reference may be stored after submission for audit and read-only review. It must not be exposed before submission.

## 11. Feedback exposure/opened-state decision

Decision for first pilot planning:

```text
Store feedback asset ids/versions, but do not store full feedback exposure/opened-state telemetry by default.
```

Recommended handling:

* No pre-submit feedback exposure state.
* Feedback breve display may be treated as implicit after submission if the reviewed runtime displays breve by default.
* Feedback completo opened state should not be stored initially unless a later evidence/admin/product phase proves it is needed.
* If future UX requires tracking opened completo state, that should be a separate telemetry/evidence design with privacy and admin-display rules.

Reason:

The first pilot needs content and feedback traceability more than behavior telemetry. Tracking opened state adds complexity and privacy questions before there is a proven need.

## 12. Admin/tutor implications

Future admin evidence should be able to show, after a separate admin evidence design:

* content key and version;
* content type/program;
* text id and version;
* item ids;
* selected answer;
* correct option and correctness after submission;
* feedback asset ids/versions or feedback availability status;
* submission timestamp;
* concise summary counts.

Future admin evidence may show:

* item-to-text linkage;
* feedback review state;
* source/review/approval metadata status;
* whether feedback completo opened state exists, if a later telemetry design creates it.

Future admin evidence should not show yet, without separate design:

* full feedback copy as if product-approved;
* raw internal answer-key notes as student-facing explanation;
* source/rights metadata in a way that implies legal approval;
* mastery, score, theta, PAES prediction, ranking, or Sales-Ready claims;
* any hidden product approval state.

## 13. Risks and caveats

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Evidence overbuild | Complex payloads can slow first internal pilot implementation | Prefer Option C and defer full telemetry |
| Telemetry privacy/complexity | Opened-state tracking may require policy and UI-state rules | Do not store opened-state by default |
| Under-traceability | MC-only evidence would not identify source text or feedback assets | Store text and feedback asset identity/version |
| Answer metadata leakage | Correct option or feedback can invalidate pre-submit answering | Store/use after submission only |
| Feedback reference confused with correctness | Feedback id could be misread as grading logic | Keep correctness separate from feedback references |
| M1 regression | Existing M1 MC evidence must remain stable | Future code must preserve current payload behavior or version it safely |
| Future migration risk | New payload kind/version may require admin parsing changes | Require response/evidence review and admin evidence design before code |

## 14. No-go gates before code

Code remains blocked until separate phases complete:

* response/evidence design review;
* admin evidence design;
* L1 continuity design or explicit no-continuity rule;
* test plan;
* implementation-readiness review;
* product-use gate.

Any future code phase must also include:

* exact files authorized for edit;
* payload kind/version decision;
* M1 evidence regression protection;
* no pre-submit answer metadata leakage rule;
* text id/version traceability decision;
* feedback asset id/version traceability decision;
* telemetry/no-telemetry decision;
* rollback/no-go policy;
* explicit student/product approval boundary.

## 15. Open decisions after this phase

Open decisions:

* Exact payload kind and schema version.
* Whether to extend `multiple_choice_submission` or create an L1-specific evidence kind.
* Exact field names for `itemId`, `textId`, `textVersion`, feedback ids, and feedback versions.
* Whether selected option text should be stored or derived later.
* Whether correct option text should be stored or derived later.
* Whether approval boundary metadata belongs in stored evidence or resolved from registry/content metadata.
* Whether feedback breve displayed state is implicit or explicit.
* Whether feedback completo opened state should ever be stored.
* How admin evidence should display L1 source and feedback identity.
* Whether L1 has continuity or an explicit no-continuity rule.

## 16. Recommended next phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-RESPONSE-EVIDENCE-DESIGN-1A - Review L1 response/evidence design
```

Reason:

The evidence model affects runtime payload shape, admin parsing, auditability, and future migrations. It should be reviewed before admin evidence design or implementation planning proceeds.

## 17. Verification performed

Required verification for this phase:

```text
git diff --check
git status --short
git diff --stat
```

Expected changed files:

* `PHASE_LOG.md`
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_RESPONSE_EVIDENCE_DESIGN_1_DEFINE_RESPONSE_EVIDENCE.md`

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
MVP_COMMERCIAL_L1_STUDYLOAD_RESPONSE_EVIDENCE_DESIGN_1_EVIDENCE_MODEL_DEFINED
```
