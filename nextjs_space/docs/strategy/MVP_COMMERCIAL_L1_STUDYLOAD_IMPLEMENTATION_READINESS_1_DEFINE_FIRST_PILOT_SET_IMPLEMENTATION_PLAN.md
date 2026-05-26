# MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-1 - First L1 Pilot Set Implementation Plan

## 1. Phase Identity and Scope

* Phase: `MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-1`.
* Type: documentation-only / implementation-readiness planning / pre-registry / pre-code / pre-product-use.
* Product horizon: roadmap change-control / L1 first pilot StudyLoad implementation planning / Sales-Ready support.
* Baseline: `HEAD = origin/main = origin/HEAD = b475957`.
* Latest accepted commit: `MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-DESIGN-1A: review L1 registry shape`.

This phase defines a plan only. It does not implement that plan.

## 2. Baseline and Context Gate Summary

Git preflight matched the expected baseline:

* `HEAD`, `origin/main`, and `origin/HEAD` were all at `b475957`.
* Working tree was clean before documentation edits.

Required context was read from:

* `PHASE_LOG.md`.
* Current handoff, product horizons, Context Gate protocol, Living Memory Index, autohandoff, product/UI/brand synthesis, reduced operating mode, and compact reporting rules.
* Recent L1 StudyLoad, feedback, registry-readiness, registry-design, and design-review documents.

Read-only code inspection was performed only to understand the current static registry and runtime shape.

## 3. Explicit Boundary

This document is documentation-only and implementation-readiness only.

It creates:

* no registry entry;
* no code change;
* no `study-load-content.ts` change;
* no `contentKey` or `contentVersion` implementation artifact;
* no actual StudyLoad;
* no DB row;
* no seed;
* no route;
* no endpoint;
* no UI;
* no test;
* no runtime behavior.

It does not approve student use or product use. L1 remains not ready. Public Sales-Ready remains blocked.

## 4. First L1 Pilot Set Summary

Candidate conceptual StudyLoad:

| Field | Value |
| --- | --- |
| `candidate_studyload_id` | `l1_locating_information_pilot_set_01` |
| `candidate_program` | `PAES_L1` |
| `candidate_skill_family` | `locating_information` |
| `source_text_id` | `original_l1_text_locating_information_01_draft` |
| `registry_status` | `not_created` |
| `implementation_status` | `not_created` |
| `student_use_approved` | `no` |
| `product_use_approved` | `no` |
| `sales_ready_implication` | `none` |

Candidate item references:

* `l1_locating_information_item_01`.
* `l1_locating_information_item_02_revised`.
* `l1_locating_information_item_03`.

Feedback breve and feedback completo exist only as reviewed documentation assets. They are not runtime feedback, student-facing copy, or product-approved content.

## 5. Current M1 / Static Registry Architecture Findings

Read-only inspection found the current StudyLoad path is static and M1-oriented:

* `nextjs_space/lib/study-load-content.ts` defines `StudyLoadContent`, `StudyLoadItem`, options, `correctOptionKey`, `contentKey`, and `contentVersion`.
* Static content is keyed primarily by StudyLoad title through `getStudyLoadContent(title)`.
* A secondary `contentKey` index exists through `getStudyLoadContentByKey(contentKey)`.
* The current metadata type is `PAES_M1`-specific and uses M1 slice/axis fields.
* The current content shape has `instructions` and `items`, but no first-class passage/text asset.
* The current content shape has answer-key metadata but no first-class authored feedback breve/completo.
* The current student viewer resolves content by StudyLoad title, strips answer keys, and passes instructions/items into the answer form.
* The response route validates `contentKey`, `contentVersion`, item keys, and selected option labels against registered content.
* The response payload stores `multiple_choice_submission` JSON with selected answers, correct-option keys, correctness, and summary.
* Student-facing feedback is generated from selected/correct options and correctness, not from authored feedback assets.
* Completion currently creates self-report evidence and may invoke M1-style continuity.
* Admin evidence reads stored MC payloads, shows answer/correctness summaries, and resolves pedagogical metadata by content identity or title aliases.

The current architecture is useful for multiple-choice evidence, but it is not enough for L1 reading without explicit design and code changes.

## 6. Implementation Options

### Option A: Extend Current `study-load-content.ts` Shape

Benefits:

* Lowest number of future files if the first pilot stays very narrow.
* Reuses existing title/content-key lookup, viewer route, MC submission validation, and admin MC evidence patterns.
* Keeps one static registry path for early internal content.

Risks:

* Could force L1 reading content into an M1-shaped registry.
* Could hide the passage inside `instructions` unless first-class text fields are added.
* Could mix generated correctness feedback with authored L1 feedback unless feedback fields are explicitly separated.
* Could increase regression risk for existing M1 StudyLoads if the shared type changes too broadly.

Preference:

* Not preferred as a direct patch. It may be acceptable only if a future phase first defines backward-compatible discriminated types and preserves existing M1 behavior.

### Option B: Create Separate L1 Reading-Content Registry

Benefits:

* Keeps L1 reading content distinct from M1 math content.
* Allows first-class text, item, feedback, rights, review, and reading-skill metadata without overloading M1 fields.
* Reduces risk of accidental L1 product claims from existing M1 continuity behavior.

Risks:

* Requires new lookup, viewer mapping, validation, and admin evidence integration.
* Could duplicate existing MC infrastructure if not connected carefully.
* Larger initial design and implementation footprint.

Preference:

* Strong conceptual fit, but probably too much surface area for the first narrow code phase unless paired with an adapter.

### Option C: Hybrid Adapter Approach

Benefits:

* Keeps a first-class L1 reading content shape while adapting shared multiple-choice pieces to the current viewer/response contract.
* Preserves M1 behavior while allowing L1-specific text, feedback, source/rights, review, and pedagogy metadata.
* Supports a narrow implementation sequence: types first, then passage rendering, then authored feedback, then evidence/admin extensions.

Risks:

* Requires careful type boundaries so the adapter does not become hidden product logic.
* Requires explicit tests to prove existing M1 StudyLoads still work.
* Still needs decisions about title lookup, content-key lookup, continuity, and feedback payload shape.

Preference:

* Preferred implementation path for a future code phase, if authorized. It gives L1 a distinct content model while reusing the stable MC submission/evidence mechanics where they fit.

## 7. Recommended Implementation Path

Recommended future path: Option C, staged and gated.

Suggested sequence, not implemented here:

1. Define reviewed TypeScript design for an L1 reading content shape and a narrow adapter to the existing MC item contract.
2. Add first-class passage rendering support in the StudyLoad viewer without changing M1 presentation.
3. Add authored feedback breve/completo runtime support separately from generated correctness feedback.
4. Extend response/evidence payloads only if feedback/version/source metadata must be persisted.
5. Extend admin evidence display to show L1 reading metadata and authored-feedback availability without claiming product readiness.
6. Add tests after exact implementation scope is authorized.
7. Keep `studentUseApproved: no`, `productUseApproved: no`, and `salesReadyImplication: none` unless later phases explicitly change them.

## 8. Candidate Future Files to Change

Registry / types:

* `nextjs_space/lib/study-load-content.ts`.
* Possible new L1-specific registry/type module if Option B or C is selected.
* Possible shared type helper for discriminating M1 math content from L1 reading content.

Rendering / viewer:

* `nextjs_space/app/now/study-loads/[id]/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`.
* Possible new passage-rendering component for L1 reading text.

Responses / evidence:

* `nextjs_space/app/api/study-loads/[id]/responses/route.ts`.
* Potential response payload typing near the MC submission handling.

Feedback display:

* `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`.
* Potential feedback view component if authored feedback needs a cleaner boundary.

Admin evidence:

* `nextjs_space/app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx`.
* `nextjs_space/lib/study-load-pedagogy.ts`.
* `nextjs_space/lib/study-load-pedagogical-decision.ts`, only if L1 evidence should appear in decision records later.

Tests:

* Future tests for registry type compatibility.
* Future tests for existing M1 StudyLoad viewer behavior.
* Future tests for L1 passage rendering.
* Future tests for response validation and authored-feedback display.
* Future tests for admin evidence display.

Docs / governance:

* L1 implementation gate docs.
* L1 registry/code review notes.
* L1 product-use and evidence-readiness docs.

## 9. Unresolved Technical Decisions

Exact decisions still unresolved:

* TypeScript field names for text asset, item asset, feedback asset, review metadata, and rights metadata.
* Whether L1 passage rendering belongs in the existing answer form or a separate passage component.
* Whether L1 items adapt to `StudyLoadItem` or use a separate L1 item type with an adapter.
* Whether answer metadata should keep `correctOptionKey` or use a new field such as correct-option reference.
* How feedback breve/completo should appear at runtime, and whether it depends on correctness state.
* Whether response evidence should persist feedback identifiers, feedback versions, or only selected/correct option evidence.
* Whether title-based lookup remains acceptable or content-key-first lookup should become required for L1.
* Whether L1 continuity is disabled, explicit end-of-sequence, or separately mapped.
* Which review and approval states are stored in code versus docs.
* Whether internal registry implementation is allowed while student/product approval remains `no`.

## 10. Future Implementation No-Go Gates

Do not touch code unless a later phase explicitly authorizes implementation and confirms:

* clean Git baseline;
* exact implementation scope and file list;
* accepted TypeScript field/type design;
* accepted passage rendering behavior;
* accepted authored feedback behavior;
* accepted response/evidence metadata behavior;
* accepted admin evidence behavior;
* accepted L1 continuity behavior or explicit no-continuity rule;
* accepted test/validation plan;
* rollback/no-go policy;
* source/rights/review metadata remains preserved;
* student/product approval status remains explicit;
* no L1 readiness or Sales-Ready implication is introduced.

## 11. Suggested Next Phases

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-1A - Review first L1 implementation plan
```

Other possible future phases:

* `MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-TYPE-DESIGN-1 - Define L1 registry TypeScript type boundary`.
* `MVP-COMMERCIAL-L1-PASSAGE-RENDERING-DESIGN-1 - Define L1 passage rendering boundary`.
* `MVP-COMMERCIAL-L1-FEEDBACK-RUNTIME-DESIGN-1 - Define authored feedback runtime boundary`.
* `MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-1 - Implement first narrow internal L1 pilot path`, only after explicit approval.

No next phase is opened automatically.

## 12. Verification Performed

Verification for this documentation-only phase:

* Git preflight matched expected baseline.
* Required context documents were read.
* Read-only code inspection was limited to static registry, viewer, response, completion, continuity, pedagogy, and admin evidence surfaces.
* No `.env`, secret, token, DB URL, cookie, header, raw environment value, backup, DB, API, browser, build, dev server, migration, seed, deploy, or Abacus access was used.
* Post-edit validation is recorded in `PHASE_LOG.md`.

## 13. Non-Goals

This phase does not:

* edit app code;
* edit `study-load-content.ts`;
* create a registry entry;
* create `contentKey` or `contentVersion` implementation artifacts;
* create an actual StudyLoad;
* create DB rows;
* create seeds;
* create routes;
* create endpoints;
* create UI;
* create tests;
* implement L1;
* run the app;
* call APIs;
* read or mutate DB state;
* approve student use;
* approve product use;
* approve official PAES/DEMRE text use;
* approve copyrighted text use;
* declare L1 ready;
* declare Sales-Ready.

## 14. Result Marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_IMPLEMENTATION_READINESS_1_PLAN_DEFINED
```
