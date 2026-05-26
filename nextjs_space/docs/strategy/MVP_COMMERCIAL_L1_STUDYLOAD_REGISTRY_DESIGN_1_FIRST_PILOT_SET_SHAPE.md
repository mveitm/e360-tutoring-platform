# MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-DESIGN-1 - First Pilot Set Registry Shape

## 1. Phase

* Phase: `MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-DESIGN-1`.
* Type: documentation-only / L1 registry shape design / pre-registry / pre-implementation / pre-product-use.
* Product horizon: roadmap change-control / L1 registry shape design / Sales-Ready support.
* This is not `MVP-Beta-Sales-Ready` approval.
* M1 remains partial.
* M2 remains not ready.
* L1 remains not ready.
* Public Sales-Ready remains blocked.

## 2. Relationship to REGISTRY-READINESS-1A

`MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-READINESS-1A` inspected the existing StudyLoad registry and nearby consumers read-only.

That phase found partial compatibility:

* a static `contentKey` / `contentVersion` pattern exists;
* item arrays exist;
* A-D options can be represented;
* correct option metadata can be represented;
* answer submission validation and correctness calculation exist;
* content can be looked up by title/content key;
* viewer behavior can render instructions, item stems, and options.

It also found material gaps:

* no first-class L1 text/passage asset support was visible;
* no authored feedback breve/completo support was visible;
* `PAES_L1` pedagogical metadata and reading-skill metadata were not visible in the typed registry shape;
* source/rights/review metadata support was not visible as first-class fields;
* continuity appeared M1-specific;
* direct registry creation remained blocked until design.

This document defines a conceptual L1 registry shape to address those gaps. It does not implement that shape.

## 3. Nature of document

This is a conceptual design document.

It is:

* documentation-only;
* pseudo-schema only;
* pre-registry;
* pre-implementation;
* pre-product-use;
* intended to guide a later implementation-readiness or registry-entry phase.

It is not:

* an executable registry object;
* a content registry entry;
* a `study-load-content.ts` edit;
* a `contentKey` or `contentVersion` implementation artifact;
* an actual StudyLoad;
* a DB row;
* a seed;
* a route, endpoint, UI, or test;
* L1 implementation;
* student-use approval;
* product-use approval;
* L1 readiness approval;
* Sales-Ready approval.

## 4. Purpose

The purpose is to define a safe conceptual registry shape for the first controlled L1 pilot set before any registry or code work.

This design defines:

* top-level content metadata;
* a first-class text asset shape;
* L1 reading item asset shape;
* alternative and answer metadata shape;
* authored feedback breve/completo shape;
* source/rights metadata;
* review-state metadata;
* L1 pedagogical metadata;
* versioning and change-control metadata;
* compatibility expectations with the current registry;
* no-go boundaries before implementation.

## 5. Design target

The design target is the first controlled L1 pilot set:

| Field | Conceptual value |
| --- | --- |
| `candidate_content_key` | `l1_locating_information_pilot_set_01` |
| `candidate_content_version` | `internal-v0.1` |
| `candidate_content_type` | `reading_l1_locating_information` |
| `candidate_registry_scope` | `internal_pilot_candidate_only` |
| `source_text_id` | `original_l1_text_locating_information_01_draft` |
| `item_count` | `3` |
| `feedback_count` | `3 breve + 3 completo` |
| `registry_status` | `not_created` |
| `implementation_status` | `not_created` |
| `student_use_approved` | `no` |
| `product_use_approved` | `no` |
| `sales_ready_implication` | `none` |

These values are conceptual candidates only. They are not registry entries and must not be treated as implementation artifacts.

## 6. Design principles

The conceptual L1 registry shape should:

* preserve the current static `contentKey` / `contentVersion` idea if a future implementation phase keeps the existing registry pattern;
* add first-class text/passage support rather than hiding the source text in instructions;
* keep each item tied to the source text and a reading skill target;
* store authored feedback breve/completo separately from answer-key metadata;
* preserve source, rights, review, and approval metadata alongside the content;
* represent L1 as reading-specific, not as a generic quiz;
* keep all student/product approval fields explicit;
* require review reset when source text, item wording, alternatives, answer key, or feedback changes;
* avoid public or product-use implications from internal registry metadata.

## 7. Proposed conceptual registry shape

The future registry candidate should be shaped around these conceptual groups:

| Group | Purpose | Required for this L1 pilot? |
| --- | --- | --- |
| Top-level content metadata | Identifies the candidate content package and registry scope | Yes |
| Text asset | Stores the original L1 passage/text and its rights/review status | Yes |
| Item assets | Stores the three locating-information items | Yes |
| Alternative/answer metadata | Stores A-D alternatives and correct-answer metadata | Yes |
| Feedback assets | Stores authored feedback breve and feedback completo per item | Yes |
| Source/rights metadata | Preserves origin, dependency, attribution, and rights custody | Yes |
| Review-state metadata | Preserves text, item, feedback, editorial, and technical review states | Yes |
| L1 pedagogical metadata | Keeps L1 reading skill identity visible | Yes |
| Versioning/change-control metadata | Defines asset version, registry version, and review reset behavior | Yes |

This is a table-based pseudo-schema only. It is not executable TypeScript.

## 8. Top-level content metadata

| Conceptual field | Purpose | First pilot candidate value or rule |
| --- | --- | --- |
| `contentKey` | Stable registry identity if later implemented | Candidate only: `l1_locating_information_pilot_set_01` |
| `contentVersion` | Registry package version if later implemented | Candidate only: `internal-v0.1` |
| `contentType` | Differentiates L1 reading content from M1 math content | Candidate only: `reading_l1_locating_information` |
| `program` | Tutoria/program identity | Candidate only: `PAES_L1` |
| `skillFamily` | Primary reading skill family | `locating_information` |
| `title` | Internal title, not public copy | Internal pilot title only |
| `estimatedMinutes` | Approximate completion planning value | Future implementation decision |
| `status` | Registry lifecycle state | `conceptual_shape_only` until future implementation |
| `registryScope` | Intended registry exposure | `internal_pilot_candidate_only` |
| `implementationStatus` | Runtime state | `not_created` |
| `studentUseApproved` | Student-facing approval | `no` |
| `productUseApproved` | Product-use approval | `no` |
| `salesReadyImplication` | Commercial readiness implication | `none` |

## 9. Text asset shape

| Conceptual field | Purpose | First pilot candidate value or rule |
| --- | --- | --- |
| `textId` | Stable source text identity | `original_l1_text_locating_information_01_draft` |
| `textVersion` | Text asset version | `draft-0.1` or later reviewed version if changed |
| `textTitleInternal` | Internal non-public label | Controlled original locating-information pilot text |
| `textBody` | First-class text/passage body | Future implementation may store the reviewed text here; not approved for product use by this design |
| `textFormat` | Reading format | Continuous prose; short notice-like fictional context |
| `sourceClass` | Source origin class | `original_bexauri_created_candidate` |
| `rightsBasis` | Rights basis | `original_bexauri_created` |
| `officialSourceDependency` | Official PAES/DEMRE source dependency | `none` |
| `copyrightedSourceDependency` | Third-party copyrighted source dependency | `none` |
| `attributionRequired` | Attribution requirement | `none` |
| `reviewState` | Text review state | Reviewed for future phases only; not product-approved |

The text asset must remain first-class so L1 does not become an item-only quiz.

## 10. Item asset shape

| Conceptual field | Purpose | First pilot candidate value or rule |
| --- | --- | --- |
| `itemId` | Stable item identity | `l1_locating_information_item_01`, `l1_locating_information_item_02_revised`, `l1_locating_information_item_03` |
| `basedOnTextId` | Link to source text | `original_l1_text_locating_information_01_draft` |
| `targetType` | Narrow locating-information target | Explicit time, explicit action required by participants, explicit storage location detail |
| `primaryReadingSkill` | Reading skill target | `locating_information` |
| `questionText` | Item stem | Existing reviewed item wording only in future implementation |
| `alternatives` | A-D options | Four alternatives per item |
| `correctOption` | Correct option label or reference | One defensible correct option only |
| `answerKeyNote` | Metadata-only answer support | Short note; not student-facing feedback |
| `answerabilityReviewState` | Answerability state | Revised set passed for future feedback/readiness only |
| `distractorReviewState` | Distractor state | Reviewed as plausible but wrong for textual reasons |
| `studentUseApproved` | Student-facing approval | `no` |
| `productUseApproved` | Product-use approval | `no` |

## 11. Alternative/answer metadata shape

| Conceptual field | Purpose | Rule |
| --- | --- | --- |
| `optionLabel` | Stable option label | A, B, C, or D |
| `optionText` | Option display text | Existing reviewed alternative text only in future implementation |
| `optionOrder` | Preserves displayed order | Must match reviewed item |
| `isCorrect` or `correctOptionReference` | Supports correctness calculation | Exactly one correct option per item |
| `answerKeyNote` | Metadata support note | Short, not feedback |
| `distractorRationaleSummary` | Internal rationale for wrong options | Metadata only; not student-facing feedback |
| `answerabilityCheck` | Internal check | Confirms one explicit text detail supports the answer |

The future implementation should not treat distractor rationale summaries as student feedback.

## 12. Feedback breve/completo shape

| Conceptual field | Purpose | Rule |
| --- | --- | --- |
| `itemId` | Link feedback to item | Must match the active reviewed item id |
| `feedbackBreve` | Short feedback | Authored and reviewed text only; not generated from answer-key notes |
| `feedbackCompleto` | Complete feedback | Authored and reviewed explanation only |
| `evidenceReferenceStyle` | Evidence style | Short paraphrase / pointing to explicit detail |
| `distractorExplanationStatus` | Indicates distractor explanation coverage | Authored and reviewed for future StudyLoad-readiness only |
| `feedbackReviewState` | Review state | Passed for future StudyLoad-readiness only |
| `studentUseApproved` | Student-facing approval | `no` |
| `productUseApproved` | Product-use approval | `no` |
| `salesReadyImplication` | Commercial readiness implication | `none` |

Authored feedback breve/completo must remain separate from generated correctness feedback.

## 13. Source/rights metadata shape

| Conceptual field | Purpose | First pilot candidate value or rule |
| --- | --- | --- |
| `sourceClass` | Source origin class | `original_bexauri_created_candidate` |
| `rightsBasis` | Basis for use in internal candidate docs | `original_bexauri_created` |
| `officialSourceDependency` | Whether official PAES/DEMRE text is embedded | `none` |
| `copyrightedSourceDependency` | Whether third-party copyrighted text is embedded | `none` |
| `attributionRequired` | Required attribution | `none` |
| `officialTextUseApproved` | Official PAES/DEMRE text approval | `no` |
| `copyrightedTextUseApproved` | Copyrighted text approval | `no` |
| `legalAdviceGiven` | Legal advice status | `no` |
| `sourceRightsReviewState` | Rights review state | Original candidate boundary documented; product rights approval not granted |

## 14. Review-state metadata shape

| Conceptual field | Purpose | First pilot candidate value or rule |
| --- | --- | --- |
| `textReviewState` | Text review state | First draft reviewed and preserved for later phases only |
| `itemReviewState` | Item review state | Revised three-item set passed re-review for feedback-readiness only |
| `feedbackReviewState` | Feedback review state | First feedback passed for future StudyLoad-readiness only |
| `sourceRightsReviewState` | Source/rights state | Original-source boundary documented; no product approval |
| `editorialReviewState` | Editorial state | Pilot documentation review only; final product editorial approval not granted |
| `technicalReviewState` | Technical state | Conceptual design only; implementation not created |
| `registryReviewState` | Registry state | Registry shape designed; registry entry not created |
| `productUseReviewState` | Product use state | Not reviewed for product use |

## 15. L1 pedagogical metadata shape

| Conceptual field | Purpose | First pilot candidate value or rule |
| --- | --- | --- |
| `program` | Program identity | `PAES_L1` |
| `skillFamily` | Primary skill family | `locating_information` |
| `readingTaskType` | Narrow reading task | Locate explicit information in a short original text |
| `textDependency` | Confirms text-bound L1 behavior | Required |
| `difficultyBand` | Controlled pilot difficulty | Low-to-moderate candidate; future review may refine |
| `itemCount` | Item count | `3` |
| `feedbackMode` | Feedback identity | Authored breve + authored completo |
| `externalKnowledgeDependency` | External knowledge dependency | `none intended` |
| `routeReadinessState` | L1 route readiness state | `not_ready` |
| `studentEvidenceState` | App/student evidence state | `not_collected` |

L1 pedagogical metadata must prevent the pilot set from being treated as generic multiple-choice content.

## 16. Versioning/change-control shape

| Conceptual field | Purpose | Rule |
| --- | --- | --- |
| `assetVersion` | Version for text, item, or feedback asset | Each asset should carry its own version before implementation |
| `registryVersion` | Registry package version | Candidate only until a registry entry exists |
| `changeReason` | Why a version changed | Required for text, item, feedback, metadata, or registry changes |
| `previousVersionReference` | Traceability to prior version | Required if replacing an asset, such as item 2 revision |
| `reviewResetRequired` | Whether review must restart | Yes for material text, item, alternative, answer, or feedback changes |
| `approvalResetRequired` | Whether student/product approval resets | Yes if any product-bound asset changes |
| `changeControlPhase` | Phase that authorized the change | Required for any future implementation or registry change |

Any material content change must reset relevant review states before product consideration.

## 17. Compatibility with current registry

| Current registry capability from REGISTRY-READINESS-1A | Conceptual design response |
| --- | --- |
| Static `contentKey` and `contentVersion` exist | Preserve compatible top-level identity fields conceptually |
| Item array exists | Model L1 items as item assets with text linkage |
| A-D options can be represented | Keep alternatives as structured option metadata |
| Correct option metadata can be represented | Preserve one correct option per item |
| Answer submission validation exists | Future implementation can use item/option metadata if types permit |
| Viewer renders instructions and item stems/options | Future UI may need first-class passage rendering beyond instructions |
| Runtime feedback appears generated from correctness | Add separate authored feedback breve/completo fields conceptually |
| Current metadata appears M1-specific | Add `PAES_L1`, reading skill, text dependency, and review metadata conceptually |
| Current continuity appears M1-specific | Require future L1 continuity design before product use |

This design is compatible enough to guide a future implementation plan, but it is not an implementation plan by itself.

## 18. Gaps this design resolves

This conceptual design resolves the REGISTRY-READINESS-1A gaps at design level by defining:

* a first-class text asset;
* item assets tied to a text and reading skill;
* authored feedback breve and feedback completo fields;
* source/rights metadata;
* review-state metadata;
* L1 pedagogical metadata;
* versioning and review reset rules;
* conceptual compatibility with future `contentKey` / `contentVersion`.

These are design resolutions only. They do not change code or registry data.

## 19. Gaps this design does not resolve

This design does not resolve:

* TypeScript implementation details;
* whether the current static registry should be extended or a separate L1 registry should be created;
* UI layout for text/passage rendering;
* API response payload changes;
* DB or evidence model changes;
* L1 continuity behavior;
* validation tests;
* production rollout;
* product-use approval;
* student-use approval;
* L1 readiness;
* Sales-Ready.

## 20. Registry implementation prerequisites

Before any future registry implementation phase, a separate phase should:

* inspect the current registry types again at the target baseline;
* decide whether to extend the current static registry or define a separate L1 reading content shape;
* define exact TypeScript types for text assets, item assets, feedback assets, metadata, and versioning;
* decide whether L1 content is title-keyed, content-key-first, or both;
* define how authored feedback interacts with existing generated correctness feedback;
* define how text/passage content is rendered in the student UI;
* define response validation and completion behavior;
* define L1 continuity behavior or explicit no-continuity behavior;
* define tests and validation expectations;
* define rollback/no-go rules;
* preserve `studentUseApproved: no`, `productUseApproved: no`, and `salesReadyImplication: none` unless a later explicit phase changes them.

## 21. Implementation no-go rules

Do not implement L1 registry content if:

* the phase is documentation-only;
* the registry shape has not been converted into reviewed TypeScript design;
* text/passage rendering is undefined;
* authored feedback handling is undefined;
* source/rights/review metadata would be dropped;
* L1 pedagogical metadata would be forced into M1-only fields;
* L1 continuity behavior is undefined and product use is implied;
* student-use approval remains `no`;
* product-use approval remains `no`;
* the change could imply L1 readiness or Sales-Ready.

## 22. PASS / FAIL / BLOCKED interpretation

PASS for this phase means:

* a safe conceptual L1 registry shape is defined;
* the shape addresses the key REGISTRY-READINESS-1A compatibility gaps at design level;
* no registry entry, code, DB row, UI, route, endpoint, test, StudyLoad, implementation, product use, student use, L1 readiness, or Sales-Ready approval is created.

FAIL would mean:

* the shape is too vague to guide future implementation-readiness;
* the shape omits text, feedback, source/rights, review, L1 pedagogy, or versioning metadata;
* the document creates implementation-like objects.

BLOCKED would mean:

* source, rights, sensitivity, content, feedback, technical, reviewer-authority, or Pro/high-level issues prevent even conceptual registry design.

## 23. What can be done in a future phase

A future separately authorized phase may:

* convert this conceptual design into a technical implementation-readiness plan;
* inspect current registry code at the new baseline;
* propose exact TypeScript types without applying them;
* decide whether the first L1 pilot set may become an internal registry entry;
* define UI/API compatibility requirements;
* define validation tests and rollback rules;
* prepare a narrow implementation patch only if explicitly authorized.

No future phase is opened automatically.

## 24. What cannot be inferred yet

This phase cannot infer:

* actual registry readiness;
* implementation readiness;
* UI readiness;
* DB readiness;
* StudyLoad creation readiness;
* student-facing readiness;
* product-use readiness;
* L1 route readiness;
* public Sales-Ready readiness;
* whether students can use the pilot set effectively;
* whether the current app can present text, items, and authored feedback without later design work.

## 25. Risks and mitigations

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Conceptual shape is mistaken for a registry entry | Could bypass implementation and review gates | Label fields as conceptual and avoid executable objects |
| L1 text is hidden inside instructions later | Would weaken reading-specific identity and metadata custody | Require first-class text asset |
| Authored feedback is confused with answer-key metadata | Would lose reviewed feedback breve/completo | Define separate feedback assets |
| Source/rights metadata is omitted in implementation | Could create rights and governance drift | Require source/rights fields before registry creation |
| L1 is forced into M1 metadata | Would make L1 nominal | Define `PAES_L1` and reading-specific metadata |
| Version changes bypass review | Could attach stale feedback or answers | Require review reset and previous-version references |
| Design is overread as product approval | Would weaken Sales-Ready gates | Preserve student/product approval as no and Sales-Ready implication as none |

## 26. Questions reserved for Pro/high-level/editorial/technical direction

Reserved questions:

* Whether the current static registry should be extended or L1 should use a separate reading-content registry.
* Whether text/passage bodies may live in code for internal pilot candidates.
* Whether authored feedback breve/completo should be stored in registry or another reviewed content source.
* Whether `contentKey` should become the primary lookup identity for L1.
* Whether L1 continuity should be disabled until multiple L1 StudyLoads exist.
* Whether internal registry entry creation is allowed while student/product approval remains `no`.
* Required technical review threshold before TypeScript type changes.
* Required editorial review threshold before any student-facing L1 display.
* Whether Spanish style and diacritic review must happen before registry implementation.

## 27. Future phase options

Option A:

`MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-1 - Define implementation plan for first L1 pilot set`

Purpose: convert this conceptual shape into a technical plan without implementation.

Option B:

`MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-1 - Create internal registry entry for first L1 pilot set`

Purpose: create a registry entry only after design, implementation readiness, editorial, technical, and governance prerequisites are accepted.

Option C:

`MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-DESIGN-1A - Review L1 registry shape design`

Purpose: review this conceptual shape before implementation-readiness.

Option D:

`MVP-COMMERCIAL-L1-FEEDBACK-STYLE-1 - Define L1 Spanish feedback style policy`

Purpose: decide style and diacritic boundaries before product-facing feedback consideration.

Recommended next phase: implementation-readiness or design review, not registry creation.

## 28. Context Gate summary

| Field | Summary |
| --- | --- |
| Phase | `MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-DESIGN-1 - Define L1 registry shape for first pilot set` |
| Proposed action | Create documentation-only conceptual L1 registry shape for the first pilot set. |
| Phase type | Documentation-only / L1 registry shape design / pre-registry / pre-implementation / pre-product-use. |
| Product horizon | Roadmap change-control / L1 registry shape design / Sales-Ready support; not Sales-Ready approval. |
| Roadmap block | M1 remains partial; M2 and L1 remain not ready; public Sales-Ready remains blocked. |
| Git preflight | Expected baseline matched `bbe164b`; working tree clean before edits. |
| Canonical docs read | `PHASE_LOG.md`, product horizons, Context Gate protocol, Living Memory Index, handoff protocol, current handoff, product/UI/brand synthesis, operating mode, compact reporting rule. |
| Phase docs read | Complete first L1 pilot chain through REGISTRY-READINESS-1A, L1/source/alignment context, M2 readiness/alignment, and Sales-Ready Gate 1/1A/1B/1C/1D. |
| Read-only code inspected | None in this phase; used versioned REGISTRY-READINESS-1A code-inspection findings. |
| Student experience impact | None. No UI, route, endpoint, API behavior, StudyLoad, registry, DB, or runtime behavior changed. |
| Commercial impact | Conceptual design only; no public offer, sale, payment, subscription, copy approval, product-use approval, or Sales-Ready approval. |
| Technical scope | Markdown doc plus `PHASE_LOG.md` only. |
| Explicit non-goals | No code, registry entry, `study-load-content.ts` edit, contentKey/contentVersion artifact, StudyLoad, DB row, seed, route, endpoint, UI, test, implementation, product-use approval, L1 readiness, or Sales-Ready approval. |
| Missing context check | No blocker for conceptual design. Future implementation-readiness requires code inspection at that baseline. |
| Roadmap change-control check | Supports roadmap change-control but does not change readiness status. |
| GO / NO-GO | GO for documentation-only conceptual design; NO-GO for registry creation or implementation. |

## 29. Explicit non-goals

* No app code changed.
* No database schema changed.
* No content registry changed.
* No `study-load-content.ts` changed.
* No `contentKey` or `contentVersion` implementation artifact created.
* No actual StudyLoad created.
* No DB row created.
* No seed created.
* No route created.
* No endpoint created.
* No UI created.
* No test created.
* No L1 implementation.
* No DB read.
* No DB mutation.
* No API call.
* No browser/app operation.
* No migration.
* No deploy.
* No product behavior change.
* No texts created.
* No questions created.
* No feedback created.
* No student UI created.
* No admin UI created.
* No official PAES/DEMRE text use approval.
* No copyrighted text use approval.
* No text/question/feedback approved for student use.
* No text/question/feedback approved for product use.
* No L1 readiness approval.
* No Sales-Ready approval.

## 30. Result marker

`MVP_COMMERCIAL_L1_STUDYLOAD_REGISTRY_DESIGN_1_CONCEPTUAL_SHAPE_DEFINED`
