# MVP-COMMERCIAL-L1-STUDYLOAD-PASSAGE-RENDERING-DESIGN-1A - Review L1 Passage Rendering Design

## 1. Phase identity and scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-PASSAGE-RENDERING-DESIGN-1A - Review L1 passage rendering design
```

Type:

```text
Documentation-only / review-only / pre-code / pre-registry / pre-product-use.
```

Product horizon:

```text
Roadmap change-control / L1 passage rendering review / Sales-Ready support.
```

This phase reviews the documentation-only passage rendering design from PASSAGE-RENDERING-DESIGN-1. It does not implement anything.

## 2. Baseline and Context Gate summary

Expected and matched baseline:

```text
HEAD = origin/main = origin/HEAD = a2caf65
```

Latest accepted commit:

```text
a2caf65 - MVP-COMMERCIAL-L1-STUDYLOAD-PASSAGE-RENDERING-DESIGN-1: define passage rendering
```

Context read:

* `PHASE_LOG.md` recent L1 chain through `a2caf65`.
* Current handoff, compact reporting rule, Codex prompting standard, product horizons, Context Gate protocol, and Living Memory Index.
* `MVP_COMMERCIAL_L1_STUDYLOAD_PASSAGE_RENDERING_DESIGN_1_DEFINE_PASSAGE_RENDERING.md`.
* L1 type-boundary review and type-boundary design.
* L1 implementation-readiness review and implementation-readiness plan.
* L1 registry design review, registry design, and compatibility inspection.

No code was inspected in this phase. The passage-rendering design and prior read-only inspection findings were sufficient for review.

## 3. Explicit boundary

This document is:

* documentation-only;
* review-only;
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

## 4. Review target

Review target:

```text
nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_PASSAGE_RENDERING_DESIGN_1_DEFINE_PASSAGE_RENDERING.md
```

Reviewed design elements:

* recommended model: passage card above questions, questions below;
* no split layout for first implementation;
* no sticky reading panel for first implementation;
* optional `volver al texto` affordance reserved for later review;
* M1 rendering preservation;
* first-class L1 passage requirement;
* state behavior for pending, in-progress, submitted, and completed states;
* accessibility, mobile, and answer-metadata safety constraints;
* no-go gates before code.

## 5. Review criteria

The review checks whether PASSAGE-RENDERING-DESIGN-1:

* preserves M1 rendering behavior;
* makes the L1 passage first-class;
* avoids hiding the passage inside generic instructions;
* supports mobile readability;
* supports accessibility;
* avoids answer metadata leakage;
* respects existing access rules before start;
* keeps the passage visible in in-progress, submitted, and completed states when the activity is viewable;
* avoids official, PAES-equivalence, and unsupported source claims;
* avoids overbuilding the first pilot layout;
* defines sufficient no-go gates before implementation.

Classification values:

* `pass`: coherent enough for the next design gate;
* `pass with caveat`: coherent, but a later design or implementation-readiness phase must resolve a known ambiguity;
* `blocked`: issue prevents moving to authored feedback runtime design.

## 6. Findings

| Criterion | Finding | Review note |
| --- | --- | --- |
| Preserve M1 rendering behavior | pass | The design explicitly keeps current M1 instruction and item rendering unchanged unless a later reviewed refactor authorizes changes. |
| Make L1 passage first-class | pass | The recommended model requires a distinct passage card, not generic instructions. |
| Avoid hiding passage in instructions | pass | The design directly identifies hiding the passage in `instructions` as a problem to avoid. |
| Support mobile readability | pass with caveat | Passage-above-questions is the safest first model for mobile, but longer passages will require later design review. |
| Support accessibility | pass with caveat | The design requires semantic headings, readable structure, contrast, and keyboard-safe controls; implementation details remain future work. |
| Avoid answer metadata leakage | pass | The design keeps answer metadata, answer-key notes, and distractor rationale out of passage rendering and client pre-submit state. |
| Respect access rules before start | pass with caveat | The design correctly refuses to change preview/access behavior, but the exact preview rule remains unresolved. |
| Keep passage visible across activity states | pass | The passage remains visible during answering, after submission, and after completion when the page is viewable. |
| Avoid official/source claims | pass | The design excludes official PAES/DEMRE and PAES-equivalence claims. |
| Avoid overbuilding first pilot layout | pass | It rejects split/sticky layouts for the first pilot and reserves optional anchors for later review. |
| Define no-go gates | pass | The gates block code until rendering review, feedback runtime, evidence/admin, continuity, tests, and product-use gates are complete. |

## 7. Risks and caveats

Remaining risks before future implementation:

* Mobile length and scrolling: the first pilot is short, but future longer passages need a separate mobile strategy.
* Cognitive overload: a future UI phase must avoid stacking too many instruction, passage, guidance, feedback, and question cards.
* Hidden passage problem: implementation must not regress to storing the passage only in generic instructions.
* Preview-before-start ambiguity: the design correctly preserves existing access rules, but a later implementation phase must decide what is visible before start.
* Accessibility details: headings, reading region semantics, focus order, line length, and contrast remain implementation-level requirements.
* Answer leakage: excerpts, metadata, answer-key notes, and distractor rationale must not appear before submission.
* M1 regression risk: any future code path must prove existing M1 rendering is unchanged.
* Interaction with future authored feedback: passage position must remain compatible with later feedback breve/completo display without hiding the source text.

These risks do not block authored feedback runtime design. They block code until addressed in the relevant later gates.

## 8. Required refinements, if any

No revision to PASSAGE-RENDERING-DESIGN-1 is required before moving to authored feedback runtime design.

Required refinements can move into later phases:

* authored feedback runtime design should define where feedback appears relative to passage, question, selected answer, and correctness state;
* response/evidence design should decide whether to persist text id/version and feedback asset ids/versions;
* admin evidence design should decide how passage/item linkage appears to admin/tutor;
* implementation-readiness should decide exact component boundaries and access-state behavior;
* a later UI implementation phase should validate mobile and accessibility details.

## 9. Review decision

Decision:

```text
APPROVED_FOR_AUTHORED_FEEDBACK_RUNTIME_DESIGN
```

Reason:

The passage rendering design is coherent enough to support the next design gate. It makes the L1 passage first-class, protects M1 behavior, avoids premature split/sticky layout complexity, and keeps code blocked behind later feedback, evidence, admin, continuity, test, and product-use gates.

## 10. Recommended next phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-FEEDBACK-RUNTIME-DESIGN-1 - Define L1 authored feedback runtime design
```

Objective:

Define how reviewed authored feedback breve/completo should appear at runtime for L1 reading items, including timing, correctness-state interaction, relation to the passage, relation to existing generated correctness feedback, evidence/version handling needs, and no-go gates before implementation.

## 11. Why code remains blocked

Code remains blocked because:

* authored feedback runtime behavior is not designed;
* response/evidence metadata is not designed;
* admin evidence behavior is not designed;
* L1 continuity is not designed;
* test plan is not defined;
* exact component boundaries are not authorized;
* preview/access behavior remains unresolved;
* student/product approval remains false;
* L1 remains not ready;
* Public Sales-Ready remains blocked.

The passage rendering model is approved only for the next design gate, not for implementation.

## 12. Verification performed

Required verification for this phase:

```text
git diff --check
git status --short
git diff --stat
```

Expected changed files:

* `PHASE_LOG.md`
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_PASSAGE_RENDERING_DESIGN_1A_REVIEW_PASSAGE_RENDERING.md`

## 13. Non-goals

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

## 14. Result marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_PASSAGE_RENDERING_DESIGN_1A_REVIEW_COMPLETED
```
