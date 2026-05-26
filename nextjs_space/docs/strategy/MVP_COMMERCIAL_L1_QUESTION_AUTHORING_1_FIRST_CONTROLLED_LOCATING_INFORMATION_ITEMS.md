# MVP-COMMERCIAL-L1-QUESTION-AUTHORING-1 - First Controlled Locating-Information Items

## 1. Phase

* Phase: `MVP-COMMERCIAL-L1-QUESTION-AUTHORING-1`.
* Type: documentation-only / controlled first L1 question set / pre-feedback / pre-StudyLoad / pre-registry / pre-implementation.
* Product horizon: roadmap change-control / L1 first question authoring / Sales-Ready support.
* This is not `MVP-Beta-Sales-Ready` approval.
* M2 remains not ready.
* L1 remains not ready.
* Public Sales-Ready remains blocked.

## 2. Relationship to QUESTION-AUTHORING-READINESS-1

`MVP-COMMERCIAL-L1-QUESTION-AUTHORING-READINESS-1` defined a documentation-only boundary for later locating-information question authoring from the reviewed original L1 draft text:

```text
original_l1_text_locating_information_01_draft
```

That phase allowed a future question-authoring phase to create a small set of 2 to 4 locating-information questions if explicitly authorized.

This phase is that explicitly authorized first question-authoring phase. It creates exactly 3 controlled locating-information questions as Markdown documentation only.

## 3. Nature of document

This is a documentation-only first question set.

It creates:

* exactly 3 controlled locating-information questions;
* answer alternatives A-D for each question;
* one correct option per question;
* answer-key metadata;
* distractor rationale summaries;
* item-level answerability notes.

It does not create:

* feedback copy;
* StudyLoads;
* content registry entries;
* app implementation;
* student-facing content approval;
* product-use approval;
* L1 readiness approval;
* Sales-Ready approval.

## 4. Purpose

The purpose is to author a very small controlled question set from the already-reviewed original L1 draft text so a later phase can review item quality, distractor quality, answerability, and feedback readiness before any feedback, StudyLoad, registry, or implementation work.

This phase is a content-drafting artifact only. It does not make the text or questions usable in product.

## 5. Source text and rights boundary

Source basis:

* already-versioned local documentation;
* the original Bexauri-created draft text from `MVP_COMMERCIAL_L1_ORIGINAL_TEXT_AUTHORING_1_DRAFT_ONE_CONTROLLED_ORIGINAL_PILOT_TEXT.md`;
* the AUTHORING-1A review;
* the QUESTION-AUTHORING-READINESS-1 boundary.

This phase uses no web search.

This phase does not use:

* official PAES/DEMRE texts;
* released PAES items;
* official question wording;
* official answer alternatives;
* official answer keys;
* copyrighted passages;
* news articles;
* blogs;
* social posts;
* commercial prep material;
* real-world documents;
* AI-generated source claims.

This phase does not approve official PAES/DEMRE text or question use. It does not approve copyrighted text use.

## 6. Question set metadata

| Field | Value |
| --- | --- |
| `question_set_id` | `original_l1_locating_information_set_01_draft` |
| `based_on_text_id` | `original_l1_text_locating_information_01_draft` |
| `source_class` | `original_bexauri_created_candidate` |
| `question_count` | `3` |
| `primary_reading_skill_target` | `locating_information` |
| `lifecycle_state` | `draft_items_for_future_review` |
| `allowed_target_scope` | explicit information only |
| `feedback_status` | `not_created` |
| `studyload_status` | `not_created` |
| `content_registry_status` | `not_created` |
| `student_use_approved` | `no` |
| `product_use_approved` | `no` |
| `sales_ready_implication` | `none` |

## 7. Source text reference, concise

The item set is based only on the original draft text about a fictional materials-organization workshop. The draft includes explicit details about time, place, participant arrival action, object categories, box colors, coordinator role, leftover-material storage, and a suspension condition.

The full draft text remains in AUTHORING-1. This document does not create a new text and does not revise the text.

## 8. Authoring rules used

Rules used for this question set:

* Create exactly 3 locating-information questions.
* Use a mix of target types.
* Ask about one explicit detail at a time.
* Avoid inference, purpose/viewpoint, vocabulary interpretation, broad main idea, opinion, external knowledge, multi-step reasoning, and trick wording.
* Use four alternatives per item.
* Include one defensible correct option per item.
* Keep distractors plausible but clearly wrong for textual reasons.
* Keep answer-key notes short and metadata-like.
* Create no feedback copy.
* Keep student and product use unapproved.

## 9. Item 1

```text
item_id: l1_locating_information_item_01
based_on_text_id: original_l1_text_locating_information_01_draft
target_type: explicit_time
question_text: A que hora comenzara la actividad?
alternatives:
  A: A las 15:30.
  B: A las 16:00.
  C: A las 17:30.
  D: El martes, sin hora indicada.
correct_option: B
answer_key_note: The text states that the activity will begin at 16:00.
distractor_rationale_summary: A uses the room-availability condition time; C uses the end time; D confuses the day with the start time.
answerability_check: One explicit start-time detail supports the correct option; no external knowledge or inference is needed.
feedback_status: not_created
student_use_approved: no
product_use_approved: no
```

## 10. Item 2

```text
item_id: l1_locating_information_item_02
based_on_text_id: original_l1_text_locating_information_01_draft
target_type: explicit_action_required_by_participants
question_text: Que debe hacer cada participante al llegar?
alternatives:
  A: Dejar su mochila en la mesa azul y retirar una tarjeta con su nombre.
  B: Revisar las cajas al final de la jornada.
  C: Guardar los materiales sobrantes junto a la ventana.
  D: Separar solo las carpetas reutilizables.
correct_option: A
answer_key_note: The arrival instruction says each participant must leave the backpack on the blue table and take a name card.
distractor_rationale_summary: B describes the coordinator's later role; C describes a conditional storage action; D narrows a later group action incorrectly.
answerability_check: One explicit arrival instruction supports the correct option; the item does not require sequence inference beyond locating the arrival sentence.
feedback_status: not_created
student_use_approved: no
product_use_approved: no
```

## 11. Item 3

```text
item_id: l1_locating_information_item_03
based_on_text_id: original_l1_text_locating_information_01_draft
target_type: explicit_storage_location_detail
question_text: Donde se guardaran los materiales si sobran?
alternatives:
  A: En la caja verde.
  B: En la mesa azul.
  C: En el armario pequeno que esta junto a la ventana.
  D: En la sala norte del edificio comunitario ficticio.
correct_option: C
answer_key_note: The text says leftover materials will be stored in the small cabinet next to the window.
distractor_rationale_summary: A is the container for notebooks in good condition; B is where backpacks are left; D is the activity place, not the storage location for leftover materials.
answerability_check: One explicit conditional storage detail supports the correct option; no external knowledge or broad interpretation is needed.
feedback_status: not_created
student_use_approved: no
product_use_approved: no
```

## 12. Question set answerability review

| Item | Target type | Answerability result | Boundary |
| --- | --- | --- | --- |
| `l1_locating_information_item_01` | `explicit_time` | Candidate answerable from one explicit detail | Future review still required before use |
| `l1_locating_information_item_02` | `explicit_action_required_by_participants` | Candidate answerable from one explicit arrival instruction | Future review still required before use |
| `l1_locating_information_item_03` | `explicit_storage_location_detail` | Candidate answerable from one explicit conditional storage detail | Future review still required before use |

Common answerability notes:

* Each item targets one explicit detail.
* Each item has one intended correct answer.
* None require external knowledge.
* None require purpose/viewpoint, vocabulary interpretation, broad main idea, or inference beyond explicit information.
* All items require later review before feedback or product use.

## 13. Distractor quality review

The distractors are drafted to be plausible but clearly wrong because they reuse nearby explicit details from the same text without introducing outside facts.

Current quality boundary:

* distractors are documentation-only draft alternatives;
* distractor rationale summaries are metadata, not feedback copy;
* every distractor still requires later editorial and feedback-readiness review;
* any distractor that becomes accidentally defensible in later review must be reworked or blocked.

## 14. Feedback boundary

Feedback is not created in this phase.

All items use:

```text
feedback_status: not_created
```

A future feedback phase must separately decide whether and how to:

* point to explicit evidence safely;
* explain why the correct answer is supported;
* explain why distractors fail;
* avoid long quotation where not needed;
* remain short, student-safe, and reading-specific;
* avoid AI tutor, score, mastery, theta, guaranteed improvement, or Sales-Ready claims.

## 15. What this question set is allowed to be used for

Allowed future use, only if separately authorized:

* item-quality review;
* answerability review;
* distractor review;
* answer-key metadata review;
* feedback-readiness review;
* editorial review;
* rights/source custody review confirmation;
* future decision on whether any item should be revised, blocked, or preserved.

## 16. What this question set is not allowed to be used for

This question set is not allowed to be used as:

* student-facing content;
* product content;
* a content registry entry;
* a StudyLoad;
* feedback;
* public copy;
* implementation input without later authorization;
* evidence that L1 is ready;
* evidence that Sales-Ready is approved;
* official PAES/DEMRE material;
* PAES-equivalent or PAES-like public claim.

## 17. Required future review before feedback

Before any feedback creation, a separate phase must review:

* whether each item remains answerable from one explicit detail;
* whether each distractor is wrong for a clear textual reason;
* whether feedback can remain concise and student-safe;
* whether feedback can avoid long quotation;
* whether feedback can explain the correct answer and distractor failures without overdiagnosis;
* whether any item should be revised or blocked before feedback is written.

## 18. Required future review before StudyLoad/registry/product use

Before any StudyLoad, registry, app, or product use, later phases would need, at minimum:

* text review confirmation;
* item quality review;
* answer-key metadata review;
* distractor review;
* feedback review;
* content registry authorization;
* StudyLoad authorization;
* implementation authorization;
* student evidence and product-readiness review.

This phase provides none of those approvals.

## 19. Risks and mitigations

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Draft items are mistaken for approved product content | Could bypass review, feedback, registry, and implementation gates | Mark student/product use as no and keep this documentation-only |
| Answer-key metadata is mistaken for full feedback | Could create shallow or unreviewed explanations | Keep answer notes short and set `feedback_status: not_created` |
| Distractors become accidentally ambiguous | Could create more than one defensible answer | Require later distractor and answerability review |
| Small text is overused | Could create repetitive scanning-only work | Limit this phase to exactly 3 items and require later review |
| L1 readiness is inferred from one text and three items | Would weaken Sales-Ready gates | State L1 remains not ready and public Sales-Ready remains blocked |

## 20. Questions reserved for Pro/high-level/editorial direction

Reserved questions:

* Whether these three items should be revised before feedback readiness.
* Whether answer-key notes should remain English metadata or be normalized later.
* Whether future item wording should use diacritics under a later Spanish style policy.
* Whether first L1 locating-information sets should use only one text or multiple texts.
* Who may approve answerability and distractor quality before any feedback phase.
* Whether future feedback may quote short snippets from original Bexauri-created text or should only paraphrase/point to evidence.
* Whether this first item set should remain a pilot-only artifact or become part of a broader L1 item bank after future review.

## 21. Future phase options

Option A:

```text
MVP-COMMERCIAL-L1-QUESTION-REVIEW-1 - Review first controlled locating-information items
```

Purpose: review item wording, answerability, alternatives, distractors, and answer-key metadata before feedback creation.

Option B:

```text
MVP-COMMERCIAL-L1-FEEDBACK-READINESS-1 - Define feedback boundary for first locating-information items
```

Purpose: define feedback rules for these items without writing final product feedback unless separately authorized.

Option C:

```text
MVP-COMMERCIAL-L1-QUESTION-AUTHORING-1A - Revise first locating-information items
```

Purpose: revise this question set if future item review finds ambiguity or quality issues.

Option D:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-READINESS-1 - Define non-implementation StudyLoad boundary for first L1 pilot set
```

Purpose: only after text, item, and feedback readiness are reviewed, define StudyLoad boundaries without registry or implementation.

No next phase is opened automatically.

## 22. Context Gate summary

| Field | Summary |
| --- | --- |
| Phase | `MVP-COMMERCIAL-L1-QUESTION-AUTHORING-1 - Author first controlled locating-information questions` |
| Proposed action | Create exactly 3 documentation-only locating-information questions from `original_l1_text_locating_information_01_draft`. |
| Phase type | Documentation-only / controlled first L1 question set / pre-feedback / pre-StudyLoad / pre-registry / pre-implementation. |
| Product horizon | Roadmap change-control / L1 first question authoring / Sales-Ready support; not Sales-Ready approval. |
| Roadmap block | L1 remains not ready; M2 remains not ready; public Sales-Ready remains blocked. |
| Git preflight | Expected baseline matched `9ebb49f`; working tree clean before edits. |
| Canonical docs read | `PHASE_LOG.md`, product horizons, Context Gate protocol, Living Memory Index, handoff protocol, current handoff, product/UI/brand synthesis, operating mode, compact reporting rule. |
| Phase docs read | L1 original-text and question boundary chain through QUESTION-AUTHORING-READINESS-1, L1 source/alignment context, M2 context, and Sales-Ready Gate 1 through 1D. |
| Source basis | Already-versioned documentation and the one original Bexauri-created draft text only; no web search and no official, released, copyrighted, news, blog, social, commercial prep, or real-world source text used. |
| Student experience impact | None. No app operation, text publication, feedback, StudyLoad, registry, UI, runtime, access, or activation change. |
| Commercial impact | None. Draft item support only; no public offer, public sale, item approval, product-use approval, L1 readiness, or Sales-Ready approval. |
| Technical scope | One new Markdown strategy doc plus `PHASE_LOG.md`. |
| Explicit non-goals | No code, DB, API call, browser/app operation, PDFs, new texts, feedback, StudyLoads, content registry, UI, deploy, official text approval, copyrighted text approval, L1 readiness, or Sales-Ready approval. |
| Missing context check | No blocking context missing for this narrow documentation-only item authoring phase. Future feedback, StudyLoad, registry, implementation, and product use require separate phases. |
| GO / NO-GO | GO for documentation-only first item authoring; NO-GO for feedback, StudyLoad, registry, implementation, student/product use, or readiness approval. |

## 23. Explicit non-goals

* No app code.
* No runtime schema change.
* No database schema change.
* No content registry entry.
* No StudyLoad.
* No texts.
* No new texts.
* No feedback.
* No feedback copy.
* No implementation.
* No student UI.
* No admin UI.
* No `/now`.
* No endpoints.
* No auth changes.
* No StudentAccess runtime behavior changes.
* No trial activation.
* No billing, subscription, or payment.
* No deploy.
* No generated artifacts.
* No PDFs downloaded or committed.
* No approval for student use.
* No approval for product use.
* No official PAES/DEMRE text or question use approval.
* No copyrighted text use approval.
* No L1 readiness approval.
* No Sales-Ready approval.

Future feedback requires separate phase approval. Future StudyLoad, registry, product use, and app/student evidence require later implementation, review, and governance phases.

## 24. Result marker

```text
MVP_COMMERCIAL_L1_QUESTION_AUTHORING_1_FIRST_CONTROLLED_ITEMS_AUTHORED
```
