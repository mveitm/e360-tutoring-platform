# Documentation Index - MVP M1

## Current 5H Checkpoint

This index contains older scope-first baseline sections below. The current checkpoint after the first pedagogical implementation block is:

- Latest accepted commit before 5H: `MVP-SRA-IMPL-5V: verify PE1 bridge policy`.
- Expected HEAD before 5H: origin/main = `b0569e0`.
- Current checkpoint document: `nextjs_space/docs/operations/MVP_SRA_IMPL_5H_PEDAGOGICAL_LAYER_IMPLEMENTATION_CHECKPOINT_HANDOFF.md`.
- `MVP-SRA-IMPL-1` through `MVP-SRA-IMPL-5V` are accepted.
- PE1 registry activity exists and is connected only as the final AS1 bridge.
- Full authenticated local UI/API verification remains pending.

Git preflight is authoritative where older index entries, handoff text, template text, or phase docs contain stale baselines.

Add this to the current first-read set for future work:

1. `nextjs_space/docs/operations/MVP_SRA_IMPL_5H_PEDAGOGICAL_LAYER_IMPLEMENTATION_CHECKPOINT_HANDOFF.md`
2. `PHASE_LOG.md` latest entries only
3. `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
4. `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`

## 1. Purpose

This is the working documentation index for the Bexauri MVP-M1 tutoring line and the PAES_M1 pedagogical scope-first block.

It tells future agents what documents are canonical, what each document is for, what is already validated, what remains immature, and how context must be transferred to future chats.

Current strategic state:

```text
Construction paused.
Documentation may continue.
Implementation requires explicit restart authorization.
```

## 2. Live-state rule

This document is versioned context, not live Git truth.

Every new chat or agent must first request/review:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight is the live source of truth for HEAD, origin/main, and working tree state.

If Git preflight contradicts this index, `CURRENT_AGENT_HANDOFF_MVP_M1.md`, `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`, PHASE_LOG excerpts, or any phase-specific handoff, Git wins and the mismatch must be explicitly flagged.

## 3. Latest accepted state before this index refresh

Latest accepted state before refreshing this index:

- HEAD = origin/main = `145833b`
- Last accepted commit = `MVP-SRA-SCOPE-5E: document index update after scope block`
- Working tree expected = clean

If this file is edited and committed, live `HEAD` will be newer than `145833b`. Future agents must use live Git preflight as truth.

## 4. Documentation hierarchy

- `PHASE_LOG.md` = audit trail / continuity ledger, not a full content repository.
- `CURRENT_AGENT_HANDOFF_MVP_M1.md` = first-read operational handoff.
- `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` = stable next-chat handoff template/contract.
- `DOCUMENTATION_INDEX_MVP_M1.md` = document map and source-alignment index.
- Scope-first SCOPE docs = current canonical PAES_M1 pedagogical direction.
- ROADMAP docs = source/taxonomy/decision/metadata foundation.
- MVP-FLOW/MVP-CONTENT docs = earlier implementation/content history and supporting evidence.
- Current code behavior = executable truth, but construction is currently paused.
- Strategy/business docs = supporting context, not runtime source of truth unless synthesized into repo docs.

## 5. Current canonical first-read documents

Read these first in current chats:

1. `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
2. `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`
3. `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
4. `nextjs_space/docs/operations/MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md`
5. `nextjs_space/docs/operations/MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md`
6. `nextjs_space/docs/operations/MVP_SRA_SCOPE_2A_CYCLE_MILESTONE_AND_SPECIAL_ACTION_MODEL.md`
7. `nextjs_space/docs/operations/MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md`
8. `nextjs_space/docs/operations/MVP_SRA_SCOPE_4_FUTURE_TUTOR_AGENT_GOVERNANCE_MODEL.md`
9. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5_CONSTRUCTION_RESTART_OPTIONS_AND_READINESS_REVIEW.md`
10. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5A_IMPLEMENTATION_SPEC_FOR_PROVISIONAL_REGISTRY_METADATA.md`
11. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5B_IMPLEMENTATION_SPEC_FOR_FIRST_NON_ALGEBRA_SLICE.md`
12. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5C_PAES_M1_EXPERT_REVIEW_REQUEST_PACKAGE.md`
13. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5D_HANDOFF_HARDENING_AFTER_SCOPE_FIRST_BLOCK.md`
14. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5E_DOCUMENTATION_INDEX_UPDATE_AFTER_SCOPE_FIRST_BLOCK.md`

## 6. Supporting roadmap/source documents

These remain important upstream sources:

- `nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_1_PAES_M1_PEDAGOGICAL_DECISION_LAYER.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2_PAES_M1_EXPERT_ROADMAP_SOURCE_AND_VALIDATION_PLAN.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_1_AS1_ALGEBRA_FUNCTIONS_CORRIDOR_METADATA_AND_ASSIGNMENT_CONSTRAINTS.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2F_FIRST_NON_ALGEBRA_SLICE_PROPOSALS.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2G_PAES_M1_EXPERT_REVIEW_PACKET_ASSEMBLY.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2H_SCOPE_FIRST_CONSTRUCTION_PAUSE.md`

## 7. Documentation index table

| Document | Status | Role | Canonical level | Use for | Do not use for | Read before implementation? |
|---|---|---|---|---|---|---|
| `PHASE_LOG.md` | Present | Audit trail and continuity ledger | High for phase history | Recover last closed phases, validation summaries, forbidden actions | Replacing focused canonical docs | Yes |
| `CURRENT_AGENT_HANDOFF_MVP_M1.md` | Present | First-read operational handoff | Highest for onboarding | Current state, construction authorization, guardrails, quickstart | Detailed source evidence | Yes |
| `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` | Present | Stable next-chat handoff template | Highest for context transfer | Creating future handoffs | Replacing live Git preflight | Yes |
| `DOCUMENTATION_INDEX_MVP_M1.md` | Present | Documentation map | High | Identify canonical docs and current phase chain | Runtime truth or implementation permission | Yes |
| `MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md` | Present | Complete tutoring scope | Highest for PAES_M1 scope | Scope of full tutoring experience | Implementation authorization | Yes |
| `MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md` | Present | Canonical student journey | Highest for flow | Student/SRA journey, roadmap traversal | Runtime proof | Yes |
| `MVP_SRA_SCOPE_2A_CYCLE_MILESTONE_AND_SPECIAL_ACTION_MODEL.md` | Present | Milestone model | High | Milestones, checkpoints, special actions | Treating milestones as gates | Yes |
| `MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md` | Present | Human/operator model | High | Operator roles, async review, risk monitoring | Making operators default bottleneck | Yes |
| `MVP_SRA_SCOPE_4_FUTURE_TUTOR_AGENT_GOVERNANCE_MODEL.md` | Present | Future tutor-agent governance | High | Agent constraints and future use cases | Claiming agent implemented | Yes |
| `MVP_SRA_SCOPE_5_CONSTRUCTION_RESTART_OPTIONS_AND_READINESS_REVIEW.md` | Present | Restart options review | High | Compare implementation restart options | Authorizing implementation by itself | Yes |
| `MVP_SRA_SCOPE_5A_IMPLEMENTATION_SPEC_FOR_PROVISIONAL_REGISTRY_METADATA.md` | Present | Future metadata implementation spec | High | Future IMPL-1 scope | Editing registry now | Yes |
| `MVP_SRA_SCOPE_5B_IMPLEMENTATION_SPEC_FOR_FIRST_NON_ALGEBRA_SLICE.md` | Present | Future PE1 candidate spec | High | First non-algebra candidate | Implementing PE1 now | Yes |
| `MVP_SRA_SCOPE_5C_PAES_M1_EXPERT_REVIEW_REQUEST_PACKAGE.md` | Present | Expert review request package | High | Ask expert for review | Claiming expert review happened | Yes |
| `MVP_SRA_SCOPE_5D_HANDOFF_HARDENING_AFTER_SCOPE_FIRST_BLOCK.md` | Present | Handoff hardening | High | Scope-first continuity | Implementation authorization | Yes |
| `MVP_SRA_SCOPE_5E_DOCUMENTATION_INDEX_UPDATE_AFTER_SCOPE_FIRST_BLOCK.md` | Present | Index update phase | High | Why this index changed | Runtime proof | Yes |
| `PAES_M1_SOURCE_REGISTER.md` | Present | Source register | High for source grounding | Official source tracking | Runtime behavior | Yes for roadmap/content |
| `MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md` | Present | Official inventory | High | Axes/OA/skills grounding | Final roadmap alone | Yes |
| `MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md` | Present | Node taxonomy | High | Taxonomy families/nodes | Claiming expert validation | Yes |
| `MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md` | Present | Mapping | High | AS1 coverage and gaps | Treating AS1 as full roadmap | Yes |
| `MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md` | Present | Decision record format | High | Future auditable next-load decisions | Runtime selector proof | Yes |
| `MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md` | Present | Expert checklist | High | Expert review structure | Claiming review completion | Yes |
| `MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md` | Present | Metadata proposal | High | Future StudyLoad metadata | Claiming registry implementation | Yes |
| `MVP_SRA_ROADMAP_2E_1_AS1_ALGEBRA_FUNCTIONS_CORRIDOR_METADATA_AND_ASSIGNMENT_CONSTRAINTS.md` | Present | AS1 assignment constraints | High | AS1 available-not-universal rules | Universal AS1 route | Yes |
| `MVP_SRA_ROADMAP_2F_FIRST_NON_ALGEBRA_SLICE_PROPOSALS.md` | Present | N1/G1/PE1 proposals | High | Non-algebra complement design | Claiming implementation | Yes |
| `MVP_SRA_ROADMAP_2G_PAES_M1_EXPERT_REVIEW_PACKET_ASSEMBLY.md` | Present | Expert packet assembly | High | Full expert packet | Claiming review occurred | Yes |
| `MVP_FLOW_4_E5M_M1_LOCAL_PATH_VALIDATION_AND_CONTENT_ALIGNMENT.md` | Present | Runtime/local validation evidence | High for validated behavior | AS1 local loop evidence | Generalizing to full roadmap | Yes for flow changes |
| `MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md` | Present | Earlier student UI journey | Supporting/high | UI journey historical basis | Overriding newer SCOPE docs | Yes for UI changes |
| `MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md` through `MVP_CONTENT_4_PAES_M1_BALANCED_ENTRY_MICRO_STUDYLOAD_REGISTRY_PROPOSAL.md` | Present | Earlier content chain | Supporting/high | Historical roadmap/content proposals | Current implementation authorization | Yes for content work |

## 8. Current source alignment summary

The aligned direction is:

- PAES_M1 first before L1/M2 expansion.
- Bexauri PAES_M1 = guided, evidence-aware roadmap traversal.
- Student continuity without supervisor bottleneck.
- AS1 algebra/functions available but not universal.
- N1/G1/PE1 proposed complements, not implemented routes.
- PE1-MSL-01 data/table/graph reading is the first non-algebra candidate, not implemented.
- Expert review request package exists but review has not occurred.
- Future implementation candidate is metadata-first, not selector-first.
- No adaptive AI, theta, mastery, or PAES score claims.

## 9. What is already validated

Validated local operational loop:

```text
PAES M1 - Entrada balanceada inicial
-> PAES M1 - Ecuaciones lineales basicas
-> PAES M1 - Problemas con ecuaciones lineales
-> PAES M1 - Refuerzo de ecuaciones lineales
-> PAES M1 - Funciones lineales basicas
-> /now final state with all activities registered and no pending loads
```

Validated student-facing behavior includes:

- answer questions;
- submit answers;
- self-report visible without manual scroll;
- finalize activity;
- loading state after completion;
- `/now` updated without manual refresh.

This validates an operational AS1 path, not the complete PAES_M1 roadmap.

## 10. What is not yet mature

- No expert-validated full PAES_M1 roadmap.
- No runtime decision-record implementation.
- No provisional registry metadata implementation.
- No PE1/N1/G1 StudyLoad implementation.
- No intelligent next-load selector.
- No tutor-agent implementation.
- No adaptive AI.
- No theta.
- No PAES score prediction.
- No automatic mastery.
- No L1/M2 replication.
- No external beta readiness decision.

## 11. Current implementation authorization state

No implementation is currently authorized.

Prepared but not authorized:

```text
MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities
```

Implementation requires explicit restart authorization from Mauricio and a scoped phase.

Do not treat SCOPE-5, 5A, 5B, 5C, 5D, or 5E as implementation authorization.

## 12. Non-blocking operator principle

This principle is central:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

Operators, supervisors, and experts work asynchronously and in parallel. They may improve the route, review evidence, insert milestones, correct content, and prepare expert validation. They do not normally block the student's next useful action.

## 13. Context Transfer Protocol

The assistant/agent is responsible for preserving continuity across chats.

If the chat becomes long, loses focus, approaches context saturation, or Mauricio asks whether to change chats, the assistant must proactively generate a next-chat handoff.

Do not make Mauricio responsible for remembering or reconstructing context.

Git preflight output is the live source of truth for HEAD, origin/main, and working tree state. The handoff and documentation index are versioned context documents, not absolute live state.

If Git preflight contradicts the baseline written in the handoff or documentation index, Git preflight wins. The assistant/agent must explicitly flag the mismatch.

Every next-chat handoff must include:

- HEAD / origin/main / last accepted commit;
- expected working tree state;
- last closed phase;
- next recommended phase;
- canonical documents;
- construction authorization state;
- AS1/N1/G1/PE1 status;
- expert review status;
- implementation candidate status;
- validated capabilities;
- immature capabilities;
- product and technical guardrails;
- non-blocking operator principle;
- preflight commands;
- ready-to-paste prompt;
- this same Context Transfer Protocol.

Minimum preflight commands for the next chat:

```text
git status --short
git log --oneline --decorate --graph -8
```

## 14. Current recommended next phase

If continuing documentation-only:

```text
MVP-SRA-SCOPE-5F - Next-chat handoff package after scope-first block
```

Purpose:

- create a ready-to-paste next-chat handoff using the updated handoff/template/index.

If implementation is desired later:

```text
MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities
```

Only after explicit authorization from Mauricio.

## 15. Standing guardrails

Unless explicitly authorized in a later phase:

- no implementation;
- no registry edits;
- no new StudyLoads;
- no selector logic;
- no continuity map changes;
- no UI/API/schema/database changes;
- no SQL;
- no Prisma CLI;
- no `.env` or secrets;
- no deploy;
- no production;
- no npm install;
- no generated PDF/DOCX;
- no `.logs`, `node_modules`, `yarn.lock`, or checkpoint artifacts;
- no PAES score, theta, mastery, or adaptive AI claims.
