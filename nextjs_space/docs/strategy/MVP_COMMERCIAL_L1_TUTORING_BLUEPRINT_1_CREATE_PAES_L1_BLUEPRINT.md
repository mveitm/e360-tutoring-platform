# MVP-COMMERCIAL-L1-TUTORING-BLUEPRINT-1 - PAES L1 Tutoring Blueprint

## 1. Phase Identity And Scope

Phase:

```text
MVP-COMMERCIAL-L1-TUTORING-BLUEPRINT-1 - Create PAES_L1 tutoring blueprint before internal implementation
```

Type:

```text
Documentation-only / PAES_L1 tutoring blueprint / pre-internal-implementation / pre-product-use.
```

Mission:

Create the first PAES_L1 tutoring blueprint using the per-tutoring blueprint standard. This blueprint documents PAES_L1 as its own Bexauri tutoring program before internal implementation.

This phase does not implement L1. It does not authorize implementation. It does not approve student use, product use, PAES_L1 readiness, or Sales-Ready.

## 2. Baseline And Context Gate Summary

Baseline expected:

```text
HEAD = origin/main = origin/HEAD = e0ceb29
```

Latest accepted commit:

```text
e0ceb29 - MVP-COMMERCIAL-TUTORING-BLUEPRINT-STANDARD-1: define tutoring blueprint standard
```

Context Gate summary:

* `PHASE_LOG.md` was read through the recent L1 and blueprint-standard chain.
* The Codex handoff, compact reporting rule, L1 prompting standard, product horizons, phase context gate protocol, living memory index, autopropagating handoff protocol, and product UI/brand context were reviewed.
* The per-tutoring blueprint standard was reviewed and used as the controlling structure.
* The L1 tutoring standards baseline, implementation-readiness 3, registry artifact authorization, and test-plan review documents were reviewed.
* The L1 design chain was used as source context for type boundary, passage rendering, feedback runtime, evidence, admin/tutor evidence, continuity, and implementation readiness.

## 3. Explicit Boundary

This phase is:

* documentation-only;
* PAES_L1 blueprint only;
* no code;
* no registry implementation;
* no DB;
* no API/runtime;
* no UI implementation;
* no student/product approval;
* PAES_L1 not ready;
* Sales-Ready blocked.

This phase does not:

* edit app code;
* edit tests;
* create test files;
* run tests;
* run build;
* edit `nextjs_space/lib/study-load-content.ts`;
* create or modify TypeScript types in code;
* create UI components;
* create or modify routes;
* create registry entries;
* create `contentKey` or `contentVersion` implementation artifacts;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, test execution, build, or app execution;
* inspect environment files, raw environment values, secrets, tokens, cookies, headers, or backups;
* approve student use;
* approve product use;
* declare PAES_L1 ready;
* declare Sales-Ready;
* use Abacus;
* authorize implementation;
* infer PAES_L1 continuity from M1 continuity maps;
* make admin/tutor review a default continuity gate;
* design or implement administrative adjustment workflow.

## 4. Tutoring Identity

Program code:

```text
PAES_L1
```

Student-facing name:

```text
PAES Competencia Lectora L1
```

The student-facing name is a future product label candidate only. It is not approved for product use in this phase.

Internal name:

```text
PAES_L1 Competencia Lectora - locating information internal pilot
```

Domain:

```text
Competencia Lectora
```

Current product horizon:

```text
Roadmap change-control / internal implementation readiness / Sales-Ready support.
```

Blueprint status:

```text
internal_candidate
```

PAES_L1 is a distinct Bexauri tutoring program. It should inherit core Bexauri tutoring standards from M1 where they are generic to tutoring operations, but it must define its own reading-specific content, feedback, evidence, continuity, and risk model.

## 5. Student-Facing Promise

Future PAES_L1 may conservatively promise structured practice for Competencia Lectora tasks where students read a visible text and answer focused questions about information in the text.

For the first internal pilot, the intended promise is narrower:

* practice locating explicit information in a short reading passage;
* show the passage as a first-class reading asset;
* ask a small set of multiple-choice questions tied to that passage;
* provide reviewed authored feedback after submission;
* preserve evidence about selected answers and correctness;
* help the student understand how the passage supports an answer.

This promise remains internal-only until product-use gates are separately approved.

## 6. Allowed Claims

Allowed internal claims:

* PAES_L1 is an internal candidate tutoring program for Competencia Lectora.
* The first candidate StudyLoad targets `locating_information`.
* The first candidate StudyLoad uses an original Bexauri-created text asset.
* The first candidate StudyLoad has three reviewed item ids and reviewed authored feedback references.
* The first candidate artifact has been authorized for a future internal code phase only.
* L1 evidence, passage rendering, feedback runtime, admin evidence, continuity, and test-plan designs have been reviewed at documentation level.

Allowed future student-facing claims, only after product-use approval:

* The activity asks the student to read a text and answer questions using information in that text.
* Feedback explains why an answer is supported or not supported by the passage.
* The activity is practice, not a score prediction or official PAES assessment.

## 7. Prohibited Claims / No-Promises

PAES_L1 must not claim:

* PAES score;
* mastery;
* theta, ranking, prediction, or diagnostic certainty;
* guaranteed improvement;
* official PAES, DEMRE, or institutionally endorsed status;
* complete L1 coverage;
* complete Competencia Lectora coverage;
* student readiness for PAES;
* product readiness;
* Sales-Ready status.

PAES_L1 must not imply that a single StudyLoad is a complete tutoring route or that completing the first pilot set proves competence.

## 8. Target Student Profile

First internal target:

* internal or controlled validation users only;
* students who can read a short passage and answer multiple-choice questions;
* students for whom a low-risk, non-score, non-official reading practice task is appropriate.

Limitations:

* not approved for public students;
* not approved for paying customers;
* not validated as an accessibility-complete reading experience;
* not validated for full PAES Competencia Lectora preparation;
* not an adaptive route;
* not suitable as a high-stakes diagnostic.

Exclusions:

* students expecting official PAES scoring;
* students needing a complete reading curriculum;
* product or commercial use without a separate product-use gate;
* automated continuity beyond the first L1 StudyLoad until a second reviewed set exists.

## 9. Tutoring Scope

First skill family:

```text
locating_information
```

Current in-scope behavior:

* locate explicit information in a short passage;
* answer multiple-choice questions tied to the same passage;
* receive authored feedback explaining the relationship between the selected answer, correctness, and the passage.

Current out-of-scope behavior:

* inference-heavy reading;
* vocabulary strategy;
* global comprehension;
* multi-text synthesis;
* long-form written response;
* official PAES item simulation;
* full L1 route coverage;
* adaptive AI claims;
* automatic L1 continuity;
* product-use claims.

## 10. Unit Of Work / StudyLoad Model

PAES_L1 uses the Bexauri micro-StudyLoad as the atomic learning unit, adapted for reading.

The first L1 StudyLoad shape:

* one first-class text asset;
* a small set of reviewed multiple-choice items;
* item options with one correct option after validation;
* authored feedback breve and feedback completo;
* response/evidence payload preserving answer and identity;
* completion state compatible with existing Bexauri StudyLoad flow;
* self-report/completion relation where the standard completion flow uses it.

The passage must not be hidden inside generic instructions. It is a first-class reading object shown above the questions in the first implementation model.

## 11. Content Model

PAES_L1 content model includes:

* text asset;
* item assets;
* option assets;
* feedback assets;
* source/rights metadata;
* review metadata;
* approval metadata;
* registry/content identity metadata.

The first internal artifact values are:

```text
contentKey: l1_locating_information_pilot_set_01
contentVersion: internal-v0.1
contentType: reading_l1_locating_information
program: PAES_L1
skillFamily: locating_information
sourceTextId: original_l1_text_locating_information_01_draft
sourceTextVersion: draft-0.1
```

Item ids:

* `l1_locating_information_item_01`;
* `l1_locating_information_item_02_revised`;
* `l1_locating_information_item_03`.

Feedback asset references:

* each item should carry stable references for feedback breve and feedback completo;
* feedback version/review reference should be traceable as `reviewed-v0.1` or an equivalent stable future value;
* feedback copy remains authored explanatory content, not correctness validation.

## 12. Feedback Model

PAES_L1 feedback is authored, reviewed explanatory content.

Runtime model:

* no authored feedback before answer submission;
* correctness is calculated separately from authored explanation;
* feedback breve appears per question after submission;
* feedback completo is available on demand after submission;
* the passage remains available above the questions;
* feedback can refer to the passage but must not replace the passage;
* feedback must not expose answer metadata before submission;
* feedback must not claim PAES score, mastery, ranking, or guaranteed improvement.

This differs from M1 where generated correctness feedback can be sufficient for the current math-oriented MC flow. PAES_L1 must not use generated correctness text as a substitute for reviewed authored reading feedback.

## 13. Evidence Model

PAES_L1 evidence should preserve:

* selected answer;
* correctness;
* content identity;
* item identity;
* text identity/version;
* feedback asset identity/version;
* timestamp/submission state where available;
* completion/self-report relation where applicable.

The first-pilot evidence model should not overbuild telemetry by default.

It should not store full feedback exposure/opened-state telemetry unless a later phase explicitly approves that. Feedback breve display can be treated as implicit after submission. Feedback completo opened state remains deferred.

Evidence must not conflate correctness with authored explanation. It must not imply mastery, PAES score, or product readiness.

## 14. Continuity Model

PAES_L1 continuity is explicitly conservative.

Current rule:

* no automatic next L1 StudyLoad until a second reviewed, registry-ready, product-boundary-safe L1 StudyLoad set exists;
* no admin/tutor manual gate;
* no generic repeat/remediation;
* no fabricated L1 continuity;
* other active tutoring programs continue according to their own rules;
* future L1 continuity requires explicit L1 content-chain design.

The absence of admin/tutor review must not block routine continuity by itself. Conversely, admin/tutor review must not release, pause, or fabricate the next L1 StudyLoad.

## 15. Admin/Tutor Supervision Model

PAES_L1 admin/tutor supervision is:

* read-only/advisory by default;
* supervisory;
* administrative context;
* QA context;
* risk-monitoring context.

Future admin/tutor evidence should show bounded L1 metadata:

* content identity;
* text identity/version;
* item ids;
* selected/correct/correctness information after submission;
* feedback asset ids/status;
* conservative source/review/approval indicators.

It should not show by default:

* full feedback copy;
* raw internal answer-key notes beyond what is needed for evidence;
* automatic action controls;
* pause/block/access mutation controls;
* approve-next-StudyLoad gate;
* implied intervention requirement.

Administrative adjustment workflows remain out of scope and require separate authorization.

## 16. Relation To SRA

PAES_L1 should eventually participate in Bexauri SRA as an evidence-producing reading route.

Current posture:

* evidence-aware;
* non-punitive;
* route not yet mature;
* no adaptive AI claim;
* no learner diagnosis claim;
* no PAES score claim.

Future SRA use should treat PAES_L1 evidence as local task evidence first. It must not turn a single L1 StudyLoad into a broad student-ability verdict.

## 17. Relation To `/now` And Dashboard

Expected future `/now` behavior:

* show L1 StudyLoad activity state when an internal L1 StudyLoad exists;
* render a first-class passage above questions;
* show post-submission feedback according to the L1 feedback model;
* preserve honest state when there is no next L1 activity;
* avoid "waiting for tutor" language when the real state is no reviewed next L1 content;
* avoid product-use copy.

Expected future dashboard/progress posture:

* dashboard integration remains later;
* L1 progress should not imply mastery, score, ranking, or Sales-Ready;
* L1 route maturity must be shown conservatively if surfaced internally.

## 18. Registry / Content Identity Model

Authorized internal artifact values:

| Field | Value |
| --- | --- |
| `candidate_studyload_id` | `l1_locating_information_pilot_set_01` |
| `contentKey` | `l1_locating_information_pilot_set_01` |
| `contentVersion` | `internal-v0.1` |
| `contentType` | `reading_l1_locating_information` |
| `program` | `PAES_L1` |
| `skillFamily` | `locating_information` |
| `titleInternal` | `L1 locating information pilot set 01` |
| `sourceTextId` | `original_l1_text_locating_information_01_draft` |
| `sourceTextVersion` | `draft-0.1` |
| `itemIds` | `l1_locating_information_item_01`, `l1_locating_information_item_02_revised`, `l1_locating_information_item_03` |
| `registryScope` | `internal_pilot_candidate_only` |
| `implementationStatus` | `authorized_for_future_internal_code_phase_only` |
| `registryStatus` | `not_created_in_this_phase` |
| `studentUseApproved` | `no` |
| `productUseApproved` | `no` |
| `salesReadyImplication` | `none` |
| `continuityPolicy` | `no_automatic_next_l1_studyload_without_second_reviewed_registry_ready_set` |

These values are authorized for a future internal artifact boundary only. They are not created in code by this blueprint.

## 19. Source / Rights / Review Boundaries

Source class:

```text
original_bexauri_created_candidate
```

Rights basis:

```text
original_bexauri_created
```

Official source dependency:

```text
none
```

Copyrighted source dependency:

```text
none
```

Review state:

* source/text exists as documentation-level candidate material;
* item and feedback reviews have been completed at documentation level;
* product-use approval remains separate;
* source/review metadata must remain traceable in any future artifact;
* no official PAES or DEMRE relationship may be claimed.

## 20. Product-Use Gates

Before student or product use, PAES_L1 requires at minimum:

* internal implementation in a separately authorized phase;
* minimum blocking test subset from TEST-PLAN-1/1A;
* M1 regression protection;
* safe-props/no-answer-leak validation;
* passage rendering validation;
* authored feedback validation;
* response/evidence validation;
* admin/tutor evidence validation;
* no-admin-gate validation;
* no-fake-continuity validation;
* mobile/accessibility review;
* product copy review;
* explicit product-use approval.

Passing tests alone does not approve product use.

## 21. Sales-Ready Relationship

PAES_L1 is required for the public Sales-Ready target eventually because Bexauri's target state includes L1/M1/M2, not M1 alone.

This blueprint does not satisfy Sales-Ready because:

* PAES_L1 is not implemented;
* PAES_L1 is not product-approved;
* PAES_L1 lacks indefinite continuity;
* only one internal pilot set is authorized;
* product-use gates remain open;
* broader L1 route maturity is not established.

Sales-Ready remains blocked.

## 22. Risks And Failure Modes

Primary risks:

* fake reading continuity if the system invents a next L1 activity;
* hidden answer leakage before submission;
* overclaiming PAES score, mastery, or readiness;
* copying M1 math assumptions into L1 reading;
* weak passage UX on mobile;
* feedback overload;
* admin/tutor evidence becoming an implied gate;
* insufficient L1 content chain;
* source/review metadata becoming invisible;
* M1 regression from shared StudyLoad runtime changes.

Mitigations:

* keep L1 internal-only;
* keep passage first-class;
* keep authored feedback after submission;
* keep correctness separate from explanation;
* preserve content/text/item/feedback identity in evidence;
* avoid automatic L1 continuity until a second reviewed set exists;
* preserve M1 behavior through required tests.

## 23. Current Maturity Status

Current status fields:

| Field | Value |
| --- | --- |
| `program_code` | `PAES_L1` |
| `maturity_status` | `internal_candidate` |
| `implementation_status` | `internal_implementation_ready` |
| `student_use_approved` | `no` |
| `product_use_approved` | `no` |
| `sales_ready_implication` | `none` |
| `continuity_status` | `explicit_no_continuity` |
| `evidence_readiness` | `reviewed` |
| `feedback_readiness` | `reviewed` |
| `admin_tutor_visibility_readiness` | `reviewed` |
| `last_reviewed_phase` | `MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-3` |
| `recommended_next_gate` | `MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-IMPLEMENTATION-1` |

`internal_implementation_ready` means documentation gates have prepared a narrow future internal code phase. It does not authorize code in this phase and does not mean the runtime exists.

## 24. Roadmap To Maturity

Recommended maturity path:

1. Create PAES_L1 blueprint. This phase.
2. Implement first L1 internal registry/viewer/feedback/evidence slice in a separately authorized internal code phase.
3. Run or create the minimum blocking tests/checks defined by TEST-PLAN-1/1A.
4. Internally validate passage rendering, safe props, authored feedback, evidence, admin evidence, no admin gate, and no fake continuity.
5. Prepare a second reviewed L1 content set before enabling automatic L1 continuity.
6. Define finite L1 content chain.
7. Review beta candidate status only after internal validation and content-chain sufficiency.
8. Review product candidate status separately.
9. Consider Sales-Ready only after broader M1/M2/L1 gates are satisfied.

## 25. Test / Quality Requirements

The controlling test plan is TEST-PLAN-1/1A.

Minimum future checks include:

* M1 registry/viewer regression;
* M1 response/evidence regression;
* M1 continuity regression;
* L1 content identity;
* L1 passage card above questions;
* no pre-submit answer leakage;
* feedback breve after submission;
* feedback completo on demand;
* correctness separate from feedback;
* L1 evidence identity fields;
* admin evidence bounded metadata and no actions;
* no fake L1 continuity;
* no product-use, L1-ready, PAES score, mastery, or Sales-Ready copy.

The future implementation phase must choose exact commands/tooling. This blueprint does not run tests.

## 26. Open Decisions

Open decisions after this phase:

* exact implementation details;
* exact future file edits;
* exact test commands and fixture implementation;
* second L1 StudyLoad set;
* product-use gate;
* dashboard/progress representation;
* admin metadata visibility details;
* mobile/accessibility validation;
* whether feedback completo opened-state telemetry is ever needed;
* future finite L1 content-chain design.

## 27. Readiness Impact

Decision:

```text
READINESS_3_STILL_VALID_FOR_NARROW_INTERNAL_CODE
```

Reason:

The PAES_L1 blueprint does not reveal a new blocker. It reinforces Readiness-3 by documenting PAES_L1 as its own tutoring program, preserving L1-specific reading standards and preventing blind copying from M1. Code remains unauthorized in this phase and must occur only through a separate future implementation phase.

## 28. Recommended Next Phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-IMPLEMENTATION-1 - Implement first L1 internal registry/viewer/feedback/evidence slice
```

The future phase should stay narrow, internal-only, test-constrained, and non-product. It should preserve M1 behavior, avoid L1 fake continuity, avoid admin/tutor gates, and keep product/student approval blocked.

## 29. Verification Performed

Verification in this phase:

* Git preflight required clean working tree and baseline match.
* Required Context Gate documents reviewed.
* Focused documentation searches performed across `PHASE_LOG.md` and `nextjs_space/docs`.
* No code inspection was required because documentation was sufficient.
* Validation requires `git diff --check`, `git status --short`, and `git diff --stat`.
* Only documentation files may change.

## 30. Non-Goals

This phase does not:

* implement PAES_L1;
* create registry entries;
* create contentKey/contentVersion artifacts in code;
* create StudyLoad rows;
* change app code;
* change tests;
* run tests;
* run build;
* approve student use;
* approve product use;
* declare PAES_L1 ready;
* declare Sales-Ready;
* create automatic L1 continuity;
* make admin/tutor review a gate;
* design administrative adjustment workflows;
* alter M1 behavior.

## 31. Result Marker

```text
MVP_COMMERCIAL_L1_TUTORING_BLUEPRINT_1_PAES_L1_BLUEPRINT_CREATED
```
