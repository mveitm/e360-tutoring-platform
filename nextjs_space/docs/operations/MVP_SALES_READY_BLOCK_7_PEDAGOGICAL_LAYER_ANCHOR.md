# MVP-SALES-READY-HANDOFF-2 — Block 7 pedagogical layer anchor

Status: BLOCK_7_PEDAGOGICAL_LAYER_ANCHORED

## 1. Purpose

This is a memory anchor for future Block 7 work.

It does not open Block 7 now.

It prevents future chats from treating L1/M1/M2 content routes as blank-slate content creation.

## 2. Roadmap placement

Roadmap block: 7 - Minimum L1/M1/M2 content routes.

Current roadmap priority remains `MVP-SALES-AUTH-1A - Audit current signup/login/student bootstrap` unless Mauricio explicitly authorizes a different phase.

Block 7 is not the next implementation phase right now.

## 3. Canonical Block 7 restart rule

When any future chat proposes:

* `MVP-SALES-CONTENT-L1-*`
* `MVP-SALES-CONTENT-M1-*`
* `MVP-SALES-CONTENT-M2-*`
* `MVP-SALES-CONTENT-TRIAD-*`
* `MVP-SALES-CONTENT-QA-*`

it must first read:

* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* this anchor document
* `MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md`
* `MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md`
* `MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
* `MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
* `MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md`
* `MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md`
* `nextjs_space/lib/study-load-content.ts`
* `nextjs_space/lib/study-load-continuity.ts`
* `nextjs_space/app/api/study-loads/[id]/responses/route.ts`
* `nextjs_space/app/api/study-loads/[id]/complete/route.ts`

## 4. What the M1 pedagogical layer already does

* Official M1 axes and skills are documented.
* Internal node taxonomy exists.
* StudyLoads have `contentKey` / `contentVersion` and partial pedagogical metadata.
* MC answer submissions are stored with item-level correctness and summary.
* Self-report is stored at completion.
* StudyLoad/session/enrollment progress is updated.
* Rule-based continuity can create the next pending StudyLoad from a fixed contentKey chain.
* Admin can review StudyLoad sessions/responses/evidence.

## 5. What it does not yet do

* No PAES score.
* No theta.
* No mastery claim.
* No validated adaptive AI.
* No full evidence-based runtime selector.
* No automatic error-pattern interpretation.
* No full M1 coverage.
* No expert-reviewed production-grade roadmap.
* No equivalent L1/M2 layer yet.

## 6. Block 7 implications

* M1 is `PARTIAL_BUT_REAL`.
* Future M1 work should expand from existing SRA docs, not restart from scratch.
* Future L1/M2 work should learn from the M1 architecture pattern.
* Future content must carry metadata: axis, taxonomy node, PAES skill, evidence purpose, difficulty, next actions, fallback, anti-monotony, source refs, and review status.
* Block 7 should not become isolated content writing.
* Block 7 must preserve the SRA chain: official source -> taxonomy -> StudyLoad -> evidence -> next action -> supervised review.

## 7. Guardrails

* Do not sell unsupported L1/M2 routes as ready.
* Do not overstate M1 as full PAES M1.
* Do not claim adaptive AI.
* Do not infer next-load only from title/contentKey once smarter routing work begins.
* Do not bypass expert/provisional labels.

## 8. Future Block 7 first likely phases

* `MVP-SALES-CONTENT-M1-1A - Define M1 sustained expansion beyond AS1`.
* `MVP-SALES-CONTENT-L1-1A - Define L1 source/legal text policy`.
* `MVP-SALES-CONTENT-M2-1A - Define M2 minimum route or explicitly waitlist/exclude M2`.
* `MVP-SALES-CONTENT-TRIAD-1 - Define coherent first-week L1/M1/M2 experience`.
* `MVP-SALES-CONTENT-QA-1 - Claims/quality checklist`.

## 9. Current priority reminder

Current next phase remains `MVP-SALES-AUTH-1A - Audit current signup/login/student bootstrap` unless Mauricio explicitly redirects.

This anchor exists so future Block 7 work starts cleanly.
