# MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-TYPE-DESIGN-1 - Define L1 Registry Type Boundary

## 1. Phase identity and scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-TYPE-DESIGN-1 - Define L1 registry TypeScript type boundary
```

Type:

```text
Documentation-only / technical type-boundary design / pre-code / pre-registry / pre-product-use.
```

Product horizon:

```text
Roadmap change-control / L1 registry type design / Sales-Ready support.
```

This phase defines the conceptual TypeScript boundary needed before any implementation of the first L1 reading StudyLoad pilot set. It does not write TypeScript code.

## 2. Baseline and Context Gate summary

Expected and matched baseline:

```text
HEAD = origin/main = origin/HEAD = 33db142
```

Latest accepted commit:

```text
33db142 - MVP-COMMERCIAL-L1-CODEX-PROMPTING-STANDARD-1: preserve Codex prompt depth
```

Context read:

* `PHASE_LOG.md` recent L1 chain through `33db142`.
* Current handoff, compact reporting rule, Codex prompting standard, product horizons, Context Gate protocol, Living Memory Index, and autohandoff protocol.
* L1 implementation-readiness, registry design review, registry design, and compatibility inspection documents.

Read-only code inspection was limited to the allowed files needed to confirm current M1 type/runtime assumptions.

## 3. Explicit boundary

This document is:

* documentation-only;
* type-boundary design only;
* pseudo-TypeScript only;
* pre-code;
* pre-registry;
* pre-DB;
* pre-runtime;
* pre-product-use.

This phase creates:

* no code;
* no TypeScript type in code;
* no registry entry;
* no `study-load-content.ts` edit;
* no `contentKey` or `contentVersion` implementation artifact;
* no StudyLoad row;
* no DB change;
* no route, endpoint, UI, test, seed, migration, runtime behavior, or deploy.

It does not approve student use. It does not approve product use. It does not approve L1 readiness. It does not approve Sales-Ready.

L1 remains not ready. Public Sales-Ready remains blocked.

## 4. Current M1 type/runtime assumptions

Read-only inspection confirms the current M1 content path is a static, no-schema registry with M1-oriented types and runtime consumers.

| Area | Current assumption |
| --- | --- |
| `StudyLoadContent` shape | Contains `contentKey`, `contentVersion`, `title`, `program`, `topic`, `estimatedMinutes`, `instructions`, `items`, `currentLimitationNotice`, and optional `pedagogicalMetadata`. |
| `StudyLoadItem` shape | Contains stable `key`, `stem`, `options`, and optional `correctOptionKey`. |
| Option shape | Uses label/text pairs. Labels support A-D multiple-choice mechanics. |
| Correctness behavior | `correctOptionKey` is compared with submitted `selectedOptionKey`. |
| `contentKey` / `contentVersion` behavior | Student answer form submits both; response route validates both against registered content. Stored MC evidence includes both. |
| Title lookup | Student viewer and response validation still rely on `getStudyLoadContent(studyLoad.title)` as the primary lookup. |
| Content-key lookup | Secondary `getStudyLoadContentByKey(contentKey)` exists and is used by admin evidence/pedagogical metadata paths when MC evidence includes content identity. |
| Response/evidence assumptions | Stored response payload uses `kind: multiple_choice_submission`, schema version, `contentKey`, `contentVersion`, selected answers, optional correct option keys, correctness, and summary counts. |
| Feedback assumptions | Runtime feedback is generated from submitted answers and answer keys. It is not authored feedback breve/completo. |
| Admin evidence assumptions | Admin evidence parses MC payloads, shows selected/correct/correctness summaries, and resolves metadata by content identity or title alias. |
| Pedagogical metadata assumptions | Current registry metadata is typed for `PAES_M1` with M1 slice/axis fields. |

Implication: the existing M1 mechanics are useful for shared multiple-choice validation, but the current type/runtime shape is not sufficient for first-class L1 reading content without a separate L1 boundary and adapter.

## 5. L1 first pilot content requirements

The first L1 pilot set requires a type boundary that can represent:

* a first-class passage/text asset;
* text id, text version, body, and format;
* L1 item ids;
* `basedOnTextId` linkage;
* alternatives A-D;
* answer metadata distinct from feedback;
* authored feedback breve/completo as content assets;
* source/rights metadata;
* review-state metadata;
* approval-state metadata;
* versioning and review-reset rules;
* internal-only registry scope;
* `studentUseApproved: false`;
* `productUseApproved: false`;
* `salesReadyImplication: none`.

Pilot references:

| Concept | Value |
| --- | --- |
| Candidate StudyLoad id | `l1_locating_information_pilot_set_01` |
| Candidate program | `PAES_L1` |
| Candidate skill family | `locating_information` |
| Source text id | `original_l1_text_locating_information_01_draft` |
| Items | `l1_locating_information_item_01`, `l1_locating_information_item_02_revised`, `l1_locating_information_item_03` |
| Feedback | Authored breve/completo exists documentally only |

## 6. Type-boundary decision

Decision: use a future discriminated L1 reading content type plus a narrow adapter contract to shared multiple-choice mechanics.

This is the preferred model for the hybrid adapter approach.

Rationale:

* L1 reading content should be first-class and distinct from M1 math StudyLoads.
* Existing M1 StudyLoads must remain unchanged.
* The shared MC mechanics should be reused only where they are already structurally appropriate: item identity, option labels/text, selected-option validation, correct-option comparison, and MC evidence summaries.
* L1-only fields should not be hidden inside `instructions`, `topic`, M1 pedagogy metadata, or generated feedback.
* Authored feedback breve/completo must not replace correctness validation and must not be confused with answer-key notes.
* A future adapter can project reviewed L1 items into the safe MC viewer/response shape while preserving the richer L1 asset model for passage, feedback, rights, review, approval, and versioning.

Conceptual type boundary:

| Layer | Responsibility |
| --- | --- |
| Shared MC mechanics | Stable item id, stem, options, correct option reference, selected answer validation, correctness summary. |
| L1 reading content | Passage/text asset, L1 item metadata, feedback assets, source/rights/review/approval/versioning metadata. |
| Adapter contract | Converts L1 reading items into the existing MC-safe runtime projection without leaking answer metadata to the client. |
| M1 compatibility | Existing M1 registry shape and runtime behavior remain unchanged unless a later code phase explicitly and safely broadens shared types. |

## 7. Proposed conceptual TypeScript shapes

The following examples are conceptual pseudo-TypeScript only. They are not executable implementation and must not be pasted into code without a future implementation phase and review.

```ts
// CONCEPTUAL ONLY - not implementation
type L1ReadingStudyLoadContent = {
  contentType: 'reading_l1_locating_information'
  contentKey: string
  contentVersion: string
  registryScope: 'internal_pilot_candidate_only'
  implementationStatus: 'not_created' | 'designed_only' | 'implemented_internal'
  titleInternal: string
  program: 'PAES_L1'
  skillFamily: 'locating_information'
  estimatedMinutes?: number
  text: L1ReadingTextAsset
  items: L1ReadingItem[]
  sourceRights: L1SourceRightsMetadata
  review: L1ReviewMetadata
  approval: L1ApprovalMetadata
  versioning: L1VersioningMetadata
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1ReadingTextAsset = {
  textId: string
  textVersion: string
  textTitleInternal: string
  textBody: string
  textFormat: 'short_original_notice' | 'short_original_prose'
  sourceClass: 'original_bexauri_created_candidate'
  reviewState: 'draft_reviewed_for_future_phases_only'
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1ReadingItem = {
  itemId: string
  basedOnTextId: string
  targetType:
    | 'explicit_time'
    | 'explicit_action_required_by_participants'
    | 'explicit_storage_location_detail'
  primaryReadingSkill: 'locating_information'
  questionText: string
  alternatives: L1ReadingOption[]
  answerMetadata: L1ReadingAnswerMetadata
  feedback: L1AuthoredFeedbackAsset
  answerabilityReviewState: 'passed_for_future_feedback_or_studyload_readiness'
  distractorReviewState: 'passed_for_textual_plausibility'
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1ReadingOption = {
  optionLabel: 'A' | 'B' | 'C' | 'D'
  optionText: string
  optionOrder: number
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1ReadingAnswerMetadata = {
  correctOptionLabel: 'A' | 'B' | 'C' | 'D'
  answerKeyNote: string
  evidenceDetailType: string
  distractorRationaleSummary: Record<'A' | 'B' | 'C' | 'D', string>
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1AuthoredFeedbackAsset = {
  feedbackStatus: 'authored_and_reviewed_for_future_studyload_readiness_only'
  feedbackBreve: string
  feedbackCompleto: string
  evidenceReferenceStyle: 'short_paraphrase_or_pointing'
  distractorExplanationStatus: 'covers_each_wrong_option'
  studentUseApproved: false
  productUseApproved: false
  salesReadyImplication: 'none'
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1SourceRightsMetadata = {
  sourceClass: 'original_bexauri_created_candidate'
  rightsBasis: 'original_bexauri_created'
  officialSourceDependency: 'none'
  copyrightedSourceDependency: 'none'
  attributionRequired: 'none'
  officialTextUseApproved: false
  copyrightedTextUseApproved: false
  legalAdviceGiven: false
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1ReviewMetadata = {
  textReviewState: string
  itemReviewState: string
  feedbackReviewState: string
  sourceRightsReviewState: string
  editorialReviewState: string
  technicalReviewState: 'type_boundary_design_only'
  registryReviewState: 'not_created'
  productUseReviewState: 'not_reviewed_for_product_use'
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1ApprovalMetadata = {
  studentUseApproved: false
  productUseApproved: false
  l1ReadyApproved: false
  salesReadyApproved: false
  salesReadyImplication: 'none'
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1VersioningMetadata = {
  assetVersion: string
  registryVersion: string
  changeReason: string
  previousVersionReference?: string
  reviewResetRequired: boolean
  approvalResetRequired: boolean
  changeControlPhase: string
}
```

```ts
// CONCEPTUAL ONLY - not implementation
type L1ToMcAdapterContract = {
  sourceContentType: 'reading_l1_locating_information'
  outputContentKey: string
  outputContentVersion: string
  outputItems: Array<{
    key: string
    stem: string
    options: Array<{ label: string; text: string }>
    correctOptionKey?: string
  }>
  clientProjectionMustExclude: [
    'correctOptionKey',
    'answerKeyNote',
    'distractorRationaleSummary',
    'feedbackCompleto',
  ]
  passageRenderingRequired: true
  authoredFeedbackAvailable: true
}
```

## 8. Compatibility rules

Future implementation must preserve these rules:

* Existing M1 StudyLoads remain unchanged.
* Existing M1 registry behavior remains unchanged unless a separate reviewed refactor is authorized.
* Existing response validation must not be weakened.
* L1 must not rely on title lookup only if content-key-first lookup is safer.
* Authored feedback must not replace correctness validation.
* Passage rendering must be explicit and first-class, not hidden in generic instructions.
* L1 answer metadata must not be sent to the student client before submission.
* L1 feedback breve/completo must remain separately authored assets, not generated from `answerKeyNote`.
* L1 source/rights/review/approval metadata must remain visible in the registry boundary.
* `studentUseApproved` and `productUseApproved` must remain false until separate approval phases change them.

## 9. No-go gates before implementation

Code remains blocked until separate phases complete:

* type design review;
* passage rendering design;
* authored feedback runtime design;
* response/evidence design;
* admin evidence design;
* L1 continuity design or explicit no-continuity rule;
* test plan;
* product-use gate.

Implementation must also have:

* exact file list;
* rollback/no-go policy;
* M1 regression protection;
* source/rights preservation;
* explicit no student/product approval unless separately authorized.

## 10. Open decisions after this phase

Open decisions:

* Exact TypeScript field names.
* Whether a future code phase uses one discriminated union in `study-load-content.ts` or a separate L1 module plus adapter.
* Whether L1 viewer lookup must become content-key-first.
* Whether passage rendering is in the existing answer form or a separate reading component.
* Whether authored feedback lives in registry content, a derived content module, or another reviewed source.
* Whether response payloads should persist feedback asset ids/versions.
* Whether admin evidence should show L1 source/review/feedback metadata.
* Whether L1 continuity is disabled, explicit end-of-set, or separately mapped.
* Whether internal registry implementation is allowed while student/product approval remains false.

## 11. Recommended next phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-TYPE-DESIGN-1A - Review L1 registry type boundary
```

Reason:

This phase defines a conceptual type boundary, but the boundary should be reviewed before moving to passage rendering design or any implementation-readiness/code phase. The review should check that M1 compatibility, L1 first-class passage handling, feedback separation, approval states, and adapter constraints are coherent.

## 12. Verification performed

Required verification for this phase:

```text
git diff --check
git status --short
git diff --stat
```

Expected changed files:

* `PHASE_LOG.md`
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_REGISTRY_TYPE_DESIGN_1_DEFINE_TYPE_BOUNDARY.md`

## 13. Non-goals

This phase does not:

* edit app code;
* edit `nextjs_space/lib/study-load-content.ts`;
* create a real L1 registry entry;
* create `contentKey` or `contentVersion` implementation artifacts;
* create or modify TypeScript types in code;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, tests, or app execution;
* inspect `.env`, database URLs, secrets, tokens, passwords, cookies, headers, raw environment values, or backups;
* approve student use;
* approve product use;
* declare L1 ready;
* declare Sales-Ready;
* use Abacus.

## 14. Result marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_REGISTRY_TYPE_DESIGN_1_TYPE_BOUNDARY_DEFINED
```
