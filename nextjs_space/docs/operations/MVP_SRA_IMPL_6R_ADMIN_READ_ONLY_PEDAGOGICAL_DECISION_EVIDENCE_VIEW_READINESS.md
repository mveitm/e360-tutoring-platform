# MVP-SRA-IMPL-6R - Admin Read-Only Pedagogical Decision/Evidence View Readiness

## 1. Phase Purpose

Prepare a future admin read-only view for pedagogical evidence and next-load decision context.

The goal is to make the pedagogical layer visible to human supervisors without making supervision a gate. Admin visibility should support review, quality assurance, and product judgment while preserving normal student continuity by default.

This readiness phase preserves the distinction between:

- evidence observed from the current product flow;
- rule-based continuity context;
- validated diagnosis, which does not exist in the current implementation.

This phase is documentation/readiness only. It does not implement UI, change code, change runtime behavior, alter registry metadata, change selectors, alter continuity maps, change schema, mutate a database, run production operations, or deploy.

## 2. Live Baseline

Git preflight before this phase showed:

- HEAD = origin/main = `0fd2b7c`.
- Last accepted commit = `MVP-SRA-IMPL-5V2B: verify PE1 bridge via local UI`.
- Working tree expected clean.

Git preflight remains the live source of truth. If embedded baselines in older documents, handoffs, indexes, templates, or `PHASE_LOG.md` differ from live Git preflight, Git wins and the mismatch must be noted.

Known drift observed while reading historical docs: earlier readiness/checkpoint files contain older HEAD baselines because they describe their own phase start points. They are historical when contradicted by current Git preflight.

## 3. Current Implemented Foundation

The accepted pedagogical layer foundation now includes:

- `MVP-SRA-IMPL-1`: provisional pedagogical metadata exists in the static StudyLoad content registry.
- `MVP-SRA-IMPL-2`: pure metadata/evidence helper functions exist in `nextjs_space/lib/study-load-pedagogy.ts`.
- `MVP-SRA-IMPL-3`: a non-invasive next-load decision record helper exists in `nextjs_space/lib/study-load-pedagogical-decision.ts`.
- `MVP-SRA-IMPL-4`: the PE1 registry activity exists as `PAES M1 - Lectura de tablas y graficos` with `contentKey: paes_m1_data_representation_entry`, `sliceId: PE1`, and `routingStatus: available_not_universal`.
- `MVP-SRA-IMPL-5`: the PE1 bridge policy exists as the single rule-based continuity edge `paes_m1_linear_functions_basic -> paes_m1_data_representation_entry`.
- `MVP-SRA-IMPL-5V2B`: full local UI/API verification passed. Mauricio verified through authenticated local student UI/API flow that completing `PAES M1 - Funciones lineales basicas` creates one pending `PAES M1 - Lectura de tablas y graficos` StudyLoad.

Current limits remain active:

- no broad selector;
- no decision-record persistence;
- no admin decision-record UI;
- no PAES score;
- no theta;
- no mastery;
- no automatic diagnosis;
- no adaptive AI.

## 4. What Admin Should Eventually See

A future read-only admin panel or section may show, per StudyLoad or per cycle when data is available:

- content title;
- `contentKey`;
- `contentVersion`;
- `programCode`;
- `sliceId`;
- `axis`;
- `primaryPurpose`;
- `evidenceType`;
- `reviewStatus`;
- `expertReviewed`;
- `routingStatus`;
- completion status;
- MC evidence summary if already available;
- self-report if already available;
- next-load decision context if available or safely computable;
- limitations.

The display should separate factual product state from interpretation:

- StudyLoad state: title, load type, status, dates, completion state.
- Registry context: content key/version and pedagogical metadata.
- Evidence: existing MC submission summary and existing self-report.
- Rule-based continuity context: current/static next-load edge if computable.
- Limitations: internal provisional metadata, expert review pending, no validated diagnosis.

## 5. What Admin Must Not See As A Claim

The future admin view must not present or imply:

- no PAES score;
- no theta;
- no mastery;
- no automatic diagnosis;
- no adaptive AI;
- no expert validation claim unless the activity has actually been reviewed;
- no "student has mastered X" claim from MC evidence alone.

MC evidence can show submitted answers and compact answer-key summary when the current payload already supports it. That evidence is not a psychometric score, not a diagnostic verdict, and not proof of mastery.

## 6. Candidate Admin Surface

Current admin cycle detail files inspected:

- `nextjs_space/app/admin/learning-cycles/[id]/page.tsx`
- `nextjs_space/app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx`

The current page is a thin wrapper around `CycleDetailView`. The detail component already includes:

- cycle header and operational cycle controls;
- operational load summary;
- Study Loads section;
- per-StudyLoad title, load type, status, dates, edit/delete controls when allowed;
- existing self-report display from `responseType === 'answer'`;
- existing MC submission evidence display from `responseType === 'mc_submission'`.

Candidate future placement:

- cycle detail page;
- inside each StudyLoad evidence block;
- optional read-only `Pedagogical context` subsection below existing self-report and MC evidence;
- no new mutation buttons;
- no workflow blocking state;
- no status transition controls;
- no review-required gate.

The most natural future implementation is a compact read-only subsection within each StudyLoad card, because the existing UI already groups operational status, self-report, and MC evidence by StudyLoad.

## 7. Read-Only Data Source Plan

Likely future sources:

- existing StudyLoad fields already fetched for cycle detail:
  - `title`;
  - `status`;
  - `loadType`;
  - dates already displayed by the component;
- static registry lookup by StudyLoad title through `getStudyLoadContent(title)`;
- optional static registry lookup by `contentKey`/`contentVersion` when already present in MC submission payload;
- `pedagogicalMetadata` from the static registry;
- existing MC submission/evidence already displayed in the admin cycle detail surface;
- existing self-report already displayed in the admin cycle detail surface;
- decision-record helper for non-persisted context only if safe and purely read-only.

Important source-of-truth constraints:

- StudyLoad rows remain the operational state source for cycle detail.
- The static registry is context for content-backed StudyLoads, not a database fact for arbitrary titles.
- MC submission content is evidence already saved by current app flows.
- Self-report is student-reported context, not validated diagnosis.
- A computed decision record is explanatory context, not persisted history and not a source of truth.

## 8. Decision Record Policy

`MVP-SRA-IMPL-3` added a decision helper:

- `nextjs_space/lib/study-load-pedagogical-decision.ts`
- `createNextLoadDecisionRecordV0(...)`
- `describeExistingContinuityDecisionV0(...)`

Current policy:

- The decision record is not persisted yet.
- `MVP-SRA-IMPL-6R` does not authorize persistence.
- A future implementation may compute read-only decision context for display if it can do so without changing selection or student continuity.
- Persistence, if desired later, requires separate authorization.

Any future persisted decision record would need explicit ownership, schema, lifecycle, and audit semantics before implementation. This 6R readiness document does not authorize any of that work.

## 9. Human Supervision Principle

Review is not a gate. Supervision is not a bottleneck. Operator action is not a prerequisite for normal student continuity.

Admin visibility should help humans inspect evidence, notice metadata quality issues, and review whether the product direction remains honest. It must not silently convert internal review into a required workflow step before students can continue.

The default product posture remains:

- normal student progression continues through existing authorized continuity behavior;
- admin review can happen in parallel;
- evidence visibility supports quality assurance;
- lack of human review does not block continuity unless a later phase explicitly authorizes a separate blocking workflow.

## 10. Future Implementation Plan

Future phase:

```text
MVP-SRA-IMPL-6 - Admin read-only pedagogical decision/evidence view
```

Likely future files:

- `nextjs_space/app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx`
- possibly a small pure formatter/helper for read-only pedagogical context
- `PHASE_LOG.md`

Expected constraints for future `MVP-SRA-IMPL-6`:

- read-only only;
- no schema/database changes;
- no new write endpoints;
- no mutation buttons;
- no selector changes;
- no continuity behavior changes;
- no registry edits unless separately authorized;
- no decision-record persistence;
- no production/deploy unless separately authorized.

Expected future verification:

- static diff review confirms only UI/read-only helper/log files changed;
- build may be appropriate if UI code changes in IMPL-6;
- local admin cycle detail page inspection should confirm the new section is informational only;
- no StudyLoad rows should be created or modified by viewing the page.

## 11. Risk Review

Key risks:

- accidentally making read-only evidence look like diagnosis;
- introducing a hidden workflow gate;
- overclaiming adaptive intelligence;
- confusing provisional metadata with expert validation;
- cluttering the admin UI;
- depending on non-persisted decision context as source of truth;
- making a static registry miss look like a student problem;
- displaying answer-key summaries as performance labels rather than evidence summaries.

Controls:

- label metadata as internal/provisional unless expert review status changes later;
- keep the section compact and clearly read-only;
- keep limitations close to the evidence;
- avoid action buttons and blocking states;
- derive context from existing safe sources;
- treat computed decision context as explanatory only.

## 12. Decision After 6R

Valid next paths:

A. Execute `MVP-SRA-IMPL-6 - Admin read-only pedagogical decision/evidence view`.

B. Continue documentation/product review.

C. Expert/product review of PE1 and pedagogical metadata.

D. Pause implementation.

E. Consider deploy only after explicit authorization and after deciding whether admin visibility is required first.

This `MVP-SRA-IMPL-6R` phase does not authorize `MVP-SRA-IMPL-6` implementation by itself.
