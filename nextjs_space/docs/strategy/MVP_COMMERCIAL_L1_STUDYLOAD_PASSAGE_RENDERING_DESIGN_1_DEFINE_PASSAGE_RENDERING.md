# MVP-COMMERCIAL-L1-STUDYLOAD-PASSAGE-RENDERING-DESIGN-1 - Define L1 Passage Rendering Design

## 1. Phase identity and scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-PASSAGE-RENDERING-DESIGN-1 - Define L1 passage rendering design
```

Type:

```text
Documentation-only / passage rendering design / pre-code / pre-registry / pre-product-use.
```

Product horizon:

```text
Roadmap change-control / L1 reading StudyLoad design / Sales-Ready support.
```

This phase defines how a future L1 reading StudyLoad should present a first-class passage/text asset alongside multiple-choice items. It does not implement UI code.

## 2. Baseline and Context Gate summary

Expected and matched baseline:

```text
HEAD = origin/main = origin/HEAD = 0be5513
```

Latest accepted commit:

```text
0be5513 - MVP-COMMERCIAL-L1-STUDYLOAD-REGISTRY-TYPE-DESIGN-1A: review L1 type boundary
```

Context read:

* `PHASE_LOG.md` recent L1 chain through `0be5513`.
* Current handoff, compact reporting rule, Codex prompting standard, product horizons, Context Gate protocol, and Living Memory Index.
* L1 type-boundary design and review.
* L1 implementation-readiness plan and review.
* L1 registry design, design review, and compatibility inspection.

Read-only code inspection was limited to the allowed StudyLoad viewer and registry files needed to understand current M1 rendering assumptions.

## 3. Explicit boundary

This document is:

* documentation-only;
* passage rendering design only;
* pre-UI-code;
* pre-registry;
* pre-DB;
* pre-runtime;
* pre-product-use.

This phase creates:

* no UI code;
* no route;
* no component;
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

* TYPE-DESIGN-1 defined a first-class L1 text asset and a narrow MC adapter boundary.
* TYPE-DESIGN-1A approved the type boundary for passage rendering design only.
* The first L1 pilot set remains documentation-only.
* Authored feedback exists only as reviewed documentation.
* Passage rendering is not approved for implementation in this phase.

## 5. Current StudyLoad viewer assumptions

Read-only inspection of the current M1 StudyLoad viewer supports these assumptions:

| Area | Current assumption |
| --- | --- |
| Content lookup | The student page currently looks up static content by StudyLoad title. Content-key-first remains a future design/implementation concern. |
| Header | The page shows program, StudyLoad title, topic, and estimated time when static content is found. |
| Content passed to form | The page passes `contentKey`, `contentVersion`, `instructions`, and safe item projections to the answer form. |
| Safe item projection | `correctOptionKey` is stripped before items reach the client component. |
| Instructions | The answer form renders generic instructions before the guidance banner and question list. |
| Items | Questions are rendered as an ordered list of cards with option buttons. |
| Feedback | Current feedback is correctness-oriented runtime feedback, not authored feedback breve/completo. |
| M1 preservation | Existing M1 instruction and item rendering must remain unchanged unless a separate reviewed refactor authorizes change. |

Implication:

L1 passage rendering should not hide the passage inside the generic `instructions` field. L1 requires a visible first-class reading surface that is distinct from task instructions and from answer metadata.

## 6. L1 passage rendering requirements

A future L1 passage renderer should support:

* first-class passage display separate from instructions;
* a clear reading-task heading or short internal passage title when appropriate;
* readable passage body with comfortable line length, spacing, and text contrast;
* a visible relationship between the passage and the questions below it;
* stable text identity and version in metadata, not necessarily displayed to students;
* no answer leakage;
* no official PAES/DEMRE claim;
* no claim of PAES equivalence;
* student-friendly framing focused on reading the passage and locating explicit details;
* mobile readability without horizontal scrolling;
* accessible structure using a heading, semantic text region, and keyboard-friendly question controls;
* compatibility with later authored feedback display;
* preservation of current M1 rendering behavior.

## 7. Rendering layout options

| Option | Description | Benefits | Risks | Fit for first pilot |
| --- | --- | --- | --- | --- |
| A | Passage above all questions | Simple, mobile-safe, keeps reading source visible before the task, low implementation complexity, clear separation from generic instructions. | Students may need to scroll back to reread. Long passages could push questions far down the page. | Preferred for first pilot because the passage is short and the behavior is predictable. |
| B | Collapsible or sticky reading panel | Keeps passage reachable during answering and can reduce repeated scrolling. | Sticky behavior is risky on mobile, can crowd the viewport, and may hide content. Collapsible state adds accessibility and persistence questions. | Not preferred for first pilot; may be considered after user observation. |
| C | Split layout or reading panel beside questions | Efficient on wide screens and keeps text/questions visible together. | Poor fit on narrow screens, higher layout complexity, risk of cramped cards and inconsistent reading order. | Not preferred for first pilot; needs responsive design validation first. |
| D | Per-question excerpting | Makes evidence local to each question. | Can leak answers, duplicate source text, weaken locating-information behavior, and create rights/review concerns. | Not appropriate for first pilot except perhaps as future reviewed feedback evidence, not as primary passage display. |

## 8. Recommended rendering model

Recommended model for first implementation planning:

```text
Passage card above questions, questions below, no split layout, no sticky panel in the first implementation.
```

Recommended first-pilot behavior:

* Keep the StudyLoad header as the page-level context.
* Render a short instruction card before the passage if needed.
* Render the first-class passage in its own clearly labeled reading card.
* Render the question list below the passage.
* Keep answer option controls unchanged where possible through the MC adapter.
* Add an optional future `volver al texto` affordance only after a review phase defines anchor behavior and mobile impact.
* Do not use split panes or sticky panels until validated in a later design and UI phase.

Rationale:

The first L1 pilot has one short original text and three locating-information items. The conservative above-questions model makes the passage explicit, minimizes new UI risk, preserves current M1 behavior, and avoids early overbuilding.

## 9. State behavior

| State | Passage behavior |
| --- | --- |
| Pending / not-started viewer | If the StudyLoad can be opened before activity start, the passage should be visible only if existing access rules allow content preview. This phase does not change access rules. |
| In-progress activity | Passage appears above questions and remains available while answering. Questions remain below with normal selection behavior. |
| After answers submitted | Passage remains visible. Feedback and submitted-answer state appear without replacing the passage or hiding the source text. |
| After completion | Passage remains visible in read-only review mode if the current completed StudyLoad page remains available. Questions and selected answers remain read-only. |
| Admin / evidence contexts | Future admin evidence may reference the text id/version and item ids, but this phase does not design admin UI implementation. |

No state should expose correct option metadata before submission.

## 10. Student-facing copy principles

Future student-facing copy should:

* be concise;
* frame the activity as a reading task;
* tell the student to use the passage to answer;
* avoid PAES score, mastery, ranking, theta, prediction, or guaranteed-improvement claims;
* avoid official PAES/DEMRE language;
* avoid shame, blame, or diagnostic claims;
* keep task guidance separate from the passage body;
* avoid wording that implies product-use approval before later gates.

## 11. Future implementation implications

Candidate future component boundaries:

| Area | Possible future boundary |
| --- | --- |
| Registry/type layer | L1 reading content keeps a first-class `text` asset and item list. |
| Adapter layer | Adapter projects L1 items into safe MC item props while excluding answer metadata. |
| Student page | Page chooses M1 current rendering or L1 reading rendering based on content type. |
| Passage component | A small L1 passage display component renders title/body and accessible structure. |
| Answer form | Existing MC answer mechanics should be reused where possible without mixing passage text into instructions. |
| Feedback display | Authored feedback breve/completo requires a separate runtime design before use. |

Implementation constraints:

* M1 behavior must remain unchanged.
* L1 should move toward content-key-first lookup rather than relying only on title lookup.
* Passage rendering must not include correct answer metadata, answer-key notes, or distractor rationales.
* Passage identity/version should be preserved for evidence and review, even if not student-visible.
* Current runtime feedback must not be confused with authored L1 feedback.
* No student/product approval is implied by rendering design.

## 12. Risks and caveats

| Risk | Mitigation |
| --- | --- |
| Long passages on mobile | First pilot should use a short passage and comfortable text spacing. Longer passages require separate design. |
| Cognitive overload | Keep task framing concise and do not stack multiple instruction cards. |
| Hidden passage problem | Do not place the passage only inside generic instructions or a collapsed panel. |
| Accidental answer leakage | Keep answer metadata out of client props and avoid per-question excerpts in first pilot. |
| Overbuilding layout before first pilot | Use simple passage-above-questions model first. |
| Accessibility and reading comfort | Require semantic headings, readable line length, keyboard-safe controls, and sufficient contrast in a future UI phase. |
| M1 regression | Gate any code phase with M1 preservation checks and a narrow file list. |

## 13. No-go gates before code

Code remains blocked until separate phases complete:

* passage rendering design review;
* authored feedback runtime design;
* response/evidence design;
* admin evidence design;
* L1 continuity design or explicit no-continuity rule;
* test plan;
* product-use gate.

Any future code phase must also include:

* exact files authorized for edit;
* M1 regression protection;
* content-key/version handling decision;
* no answer metadata leakage requirement;
* rollback/no-go policy;
* explicit student/product approval boundary.

## 14. Open decisions after this phase

Open decisions:

* Whether passage preview is allowed before an activity is in progress.
* Exact component boundary for the future passage card.
* Whether the passage card lives inside the answer form or above it in the page.
* Whether a future `volver al texto` anchor is needed.
* Whether completed-state review should scroll to feedback or preserve passage-first ordering.
* How authored feedback breve/completo will be displayed.
* What evidence payload should persist for text id/version.
* How admin evidence should represent text/item linkage.
* Whether L1 has continuity or an explicit no-continuity rule.

## 15. Recommended next phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-PASSAGE-RENDERING-DESIGN-1A - Review L1 passage rendering design
```

Reason:

The rendering model is intentionally conservative, but it should be reviewed before moving to authored feedback runtime design or implementation planning. The review should confirm that passage-above-questions is sufficient for the first pilot, that M1 remains protected, and that no accessibility or state-behavior issue blocks the next design gate.

## 16. Verification performed

Required verification for this phase:

```text
git diff --check
git status --short
git diff --stat
```

Expected changed files:

* `PHASE_LOG.md`
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_PASSAGE_RENDERING_DESIGN_1_DEFINE_PASSAGE_RENDERING.md`

## 17. Non-goals

This phase does not:

* edit app code;
* edit `nextjs_space/lib/study-load-content.ts`;
* create or modify TypeScript types in code;
* create a real L1 registry entry;
* create `contentKey` or `contentVersion` implementation artifacts;
* create UI components;
* create or modify routes;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, tests, or app execution;
* inspect `.env`, database URLs, secrets, tokens, passwords, cookies, headers, raw environment values, or backups;
* approve student use;
* approve product use;
* declare L1 ready;
* declare Sales-Ready;
* use Abacus.

## 18. Result marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_PASSAGE_RENDERING_DESIGN_1_RENDERING_MODEL_DEFINED
```
