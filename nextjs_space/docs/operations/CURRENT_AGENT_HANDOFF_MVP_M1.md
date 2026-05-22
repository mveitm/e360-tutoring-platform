# Current Agent Handoff - MVP M1

## Current Governance Handoff — MVP-GOV-CONTEXT-15

This top section supersedes older baseline, roadmap, and handoff-start instructions below when they conflict with Git preflight or GOV-CONTEXT governance docs. Older content remains useful as historical and operational support, but future chats and agents must start here.

### 1. Current Expected Git Baseline

* HEAD = origin/main = `0921197`.
* Latest accepted commit = `MVP-GOV-CONTEXT-7: create autopropagating handoff protocol v2`.
* Working tree expected = clean.
* Git preflight must be run before trusting this handoff.
* If Git and this handoff disagree, Git wins.

### 2. Required First Commands for Any New Chat/Agent

Run these first:

* `git status --short`
* `git log --oneline --decorate --graph -8`

### 3. Required Governance Docs to Read First

Read these before proposing, designing, verifying, implementing, committing, or choosing a next phase:

* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`
* `nextjs_space/docs/governance/AUTOPROPAGATING_HANDOFF_PROTOCOL_V2.md`
* `PHASE_LOG.md` tail

### 4. Current Product Horizon and Roadmap State

* Current horizon for near work = `MVP-Beta-Pre-Sales-Ready` governance/support unless a Context Gate says otherwise.
* M1 may be used as a closed lab with 2-3 students.
* M1-only is not public Sales-Ready.
* Sales-Ready requires PAES M1, PAES M2, and Competencia Lectora L1 sufficiently operational.
* Any change requires roadmap change control if it touches public offer, commercial promise, Sales-Ready, Pre-Sales validation, brand, trial, subscription, payment, student-facing promise, program coverage, tutor/admin workload, or L1/M1/M2 scope.

### 5. Mandatory Context Gate Requirement

Every future phase must complete Context Gate before design, implementation, verification, or commit.

* No phase may proceed from chat memory alone.
* Missing context must be declared.
* Commercial non-goals and student experience impact must be declared.
* If Git and handoff disagree, Git wins.

### 6. Current StudentAccess / Signup-Access State

* `StudentAccess` schema exists.
* DB local/dev `StudentAccess` was applied and verified.
* 12/12 local/dev students have `StudentAccess`.
* 9 rows = `backfill_existing_active_enrollment`.
* 3 rows = `backfill_no_active_enrollment_no_access`.
* `MVP-SALES-TRIAL-3C` attempted signup default row and is blocked by helper validation contract.
* 3C did not leave functional signup changes.
* `MVP-SALES-TRIAL-3C-FIX` is not open yet.
* Do not return to 3C-FIX until GOV-CONTEXT minimum package is closed and the next Context Gate allows it.

### 7. Active Student Experience Direction

* Student learns inside Bexauri.
* Bexauri regulates internally.
* Human supervision protects quality but should not be the normal bottleneck.
* Direction favors microloads, dynamic/invisible diagnosis, inline feedback, non-blocking continuity, and strategic human oversight.
* Older long-diagnostic or expert-wait assumptions need reconciliation if they appear in old docs.

### 8. Missing Product/UI/Brand Context

These critical product/UI/brand documents are not currently versioned in the repo unless Git preflight or a fresh search proves otherwise:

* `Mvp Ui Flow 1 Secuencia Canonica Bexauri Cierre Dia.docx`
* `MVeit-Bexauri-Definicion de Producto.docx`
* `Bexauri_Guia_Identidad_Visual_v1_1.docx`

Future broader context/canonicality/product/UI/brand/public-offer phases must request those files or a fresh synthesis before closing.

### 9. Superseded / Historical Warnings

* M1-only public Sales-Ready framing is superseded.
* Any technical phase reversing the strategic reclassification without roadmap change control is forbidden.
* Older local-only, M1-only, or demo-only baselines may be stale if contradicted by Git or GOV-CONTEXT docs.
* Older diagnostic-heavy or expert-review-bottleneck assumptions may need reconciliation.

### 10. Next Recommended Phase After This One

After `MVP-GOV-CONTEXT-15` is committed and pushed, the minimum GOV-CONTEXT package is closed.

Next decision should be a direction choice:

* Return to `MVP-SALES-TRIAL-3C-FIX` with a full Context Gate.
* Run a narrow canonicality/product-context phase to bring or summarize the missing Word docs.
* Pause at clean governance baseline.

Do not choose the next technical implementation automatically in this phase.

### 11. Explicit Non-Goals for Future Receiving Agent

* Do not start coding without a Context Gate.
* Do not open 3C-FIX automatically.
* Do not change signup, auth, access runtime, billing, trial, admin, `/now`, UI, staging, or prod without explicit phase authorization.
* Do not treat M1-only as public Sales-Ready.
* Do not ignore missing Word product/UI/brand docs for product/UI/brand/public-offer decisions.
* Do not print secrets, passwords, tokens, API keys, database URLs, or raw env values.

### 12. Expected First Response From Receiving Agent

A receiving agent should first respond with:

* Confirmation of expected baseline.
* Strategic reading of situation.
* Context gaps or contradictions.
* Whether it has enough context to proceed.
* Proposed next phase, if any.
* No code or implementation unless explicitly authorized and Context Gate passes.

## Current sales-ready active context supersedes M1-centric handoff for roadmap direction

This file remains useful as historical and operational support, but it is no longer the primary sales-ready compass.

Future chats and agents must read these documents before using M1-specific handoff content:

1. `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`
2. `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`
3. `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`

Git preflight remains the live truth. If this handoff or any older M1-centric section contradicts current Git preflight or the active sales-ready context, Git preflight and the active sales-ready context win.

Phase gate rule:

Before proposing any next phase, the chat/agent must identify the active roadmap block and answer whether the phase directly advances the sales-ready roadmap: student can register, trial, pay, enroll in up to 3 tutorias, work in L1/M1/M2, pause/close/reopen tutorias, and continue without technical manual intervention.

No future chat may propose a phase outside the roadmap unless it is classified as `ROADMAP_CHANGE_REQUEST` and explicitly approved by Mauricio + ChatGPT.

Do not infer the next phase from the latest `PHASE_LOG.md` entry alone.

M1 pedagogical history is preserved for sales-ready Block 7 through:

`nextjs_space/docs/operations/MVP_SALES_READY_BLOCK_7_PEDAGOGICAL_LAYER_ANCHOR.md`

Future Block 7/content-route phases must read that anchor before treating L1/M1/M2 content work as ready to start.

## Current MVP-Beta Target Checkpoint

This file name remains M1-centric for continuity, but the current target is broader than M1.

Current expected repo state before `MVP-BETA-TARGET-1`:

- HEAD = origin/main = `f6cbf21`.
- Last accepted commit = `MVP-BETA-BUDGET-1: estimate sales-ready beta budget`.
- Working tree expected clean.
- Git preflight remains the live truth. Older sections below contain stale M1-era baselines and narrower scope language.

Canonical MVP-Beta v1 target:

> The objective of Bexauri MVP-Beta v1 is to reach a first sales-ready published version capable of receiving several students in parallel, activating access according to plan, managing payments and subscriptions, allowing initial and sustained work in PAES L1, M1, and M2, capturing learning evidence, showing operational state to the student and tutor/admin, and sustaining human tutoring accompaniment without requiring technical manual intervention for each signup, payment, program assignment, or basic continuity action.

Control phrase:

> We are not building only an operational beta. We are building the first autonomous-basic commercial version of Bexauri.

Current roadmap state:

- `MVP-BETA-SCOPE-1` reviewed the sustained L1/M1/M2 implementation beta.
- `MVP-BETA-SCOPE-2` defined the sales-ready macro roadmap.
- `MVP-BETA-BUDGET-1` estimated budget scenarios and kept budget at `NEEDS_INPUT`.
- `MVP-BETA-TARGET-1` locks the autonomous-basic sales-ready target and propagates it into handoff docs.

Current strategic state:

- Sales-ready current state: `NOT_READY`.
- L1: `NOT_READY`.
- M1: `PARTIAL`.
- M2: `NOT_READY`.
- Payments/subscriptions and multi-program access are core to MVP-Beta v1, not optional post-MVP.
- Abacus decision: `ABACUS_NOT_RECOMMENDED_FOR_BASE_PATH`.
- Recommended base stack: Mauricio + ChatGPT/Codex + GitHub + Vercel/Neon.
- Next recommended phase: `MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon provider setup execution`.

Future agents must preserve that human tutoring/review can remain manual, but technical setup per student must not remain manual. Do not regress to local-only, staging-only, 7-day-demo, or one-off manually assembled beta assumptions.

## Current 6H Checkpoint

This file contains older scope-first and 5H baseline sections below. The current checkpoint after the admin read-only pedagogy context block is:

- Latest accepted commit before 6H: `MVP-SRA-IMPL-6: add admin read-only pedagogy context`.
- Expected HEAD before 6H: origin/main = `775d5f2`.
- Current checkpoint document: `nextjs_space/docs/operations/MVP_SRA_IMPL_6H_ADMIN_READ_ONLY_PEDAGOGY_CONTEXT_CHECKPOINT_HANDOFF.md`.
- IMPL-1 through IMPL-6 are accepted.
- PE1 registry activity exists: `PAES M1 - Lectura de tablas y graficos`.
- PE1 is connected only as final bridge: `paes_m1_linear_functions_basic -> paes_m1_data_representation_entry`.
- PE1 bridge was verified by real local student UI/API.
- Admin cycle detail now shows read-only `Contexto pedagogico` per StudyLoad.
- Completed StudyLoads with MC evidence resolve metadata from `contentKey` / `contentVersion`.
- Pending registry-backed StudyLoads, including PE1, resolve metadata by title fallback.
- Existing AS1 flow remains preserved.
- No broad selector, adaptive AI, decision-record persistence, production deploy, or expert validation exists yet.

Git preflight remains authoritative. If any older section below says PE1 is proposal-only, metadata is not implemented, PE1 is not connected, full PE1 UI/API verification is pending, or admin pedagogy context does not exist, treat that as stale historical context unless live Git or later phase documents confirm it.

Recommended next paths after 6H:

- `MVP-SRA-IMPL-7R - Deploy readiness after verified local pedagogy/admin context`.
- Expert/product review of PE1, metadata, bridge policy, and admin context.
- `MVP-SRA-IMPL-6V - Optional focused validation doc for admin read-only context` if needed.
- Pause implementation and keep current state.
- Deploy only after explicit authorization and deployment safeguards.

## 1. Purpose

This is the first-read operational handoff for agents working on the Bexauri MVP-M1 tutoring line.

Its job is to prevent loss of context when switching chats or tools. The current project state has shifted from implementation momentum to a scope-first documentation block for the PAES_M1 pedagogical layer.

Future agents must not assume the next step is code, registry work, selector logic, new StudyLoads, or tutor-agent implementation.

## 2. Live-state rule

This document is versioned context. It is not the live source of truth for `HEAD`, `origin/main`, or working tree state.

Every new chat or agent must first request/review:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight is the live truth. If Git preflight contradicts embedded baselines in this handoff, the documentation index, the context-transfer template, PHASE_LOG excerpts, or any phase-specific handoff, Git wins and the mismatch must be explicitly flagged.

## 3. Latest accepted state before this handoff refresh

Latest accepted state before refreshing this file:

- HEAD = origin/main = `30f5d91`
- Last accepted commit = `MVP-SRA-SCOPE-5D: harden handoff after scope-first block`
- Working tree expected = clean

If this file is edited and committed, live `HEAD` will be newer than `30f5d91`. Future agents must use live Git preflight as truth.

## 4. Current strategic state

Construction is paused.

Documentation may continue.

Implementation requires explicit restart authorization.

Canonical decision:

```text
Pause construction. Continue documentation. Define scope before implementation.
```

Bexauri PAES_M1 is now framed as:

```text
guided, evidence-aware roadmap traversal
```

not as a static chain of StudyLoads.

## 5. Scope-first block now established

The current scope-first block includes:

- `MVP-SRA-ROADMAP-2H` — construction pause / scope-first decision.
- `MVP-SRA-SCOPE-1` — complete PAES_M1 tutoring scope charter.
- `MVP-SRA-SCOPE-2` — canonical student journey and roadmap traversal.
- `MVP-SRA-SCOPE-2A` — cycle milestone and special action model.
- `MVP-SRA-SCOPE-3` — human/operator parallel role model.
- `MVP-SRA-SCOPE-4` — future tutor-agent governance model.
- `MVP-SRA-SCOPE-5` — construction restart options and readiness review.
- `MVP-SRA-SCOPE-5A` — implementation spec for provisional registry metadata.
- `MVP-SRA-SCOPE-5B` — implementation spec for first non-algebra slice candidate.
- `MVP-SRA-SCOPE-5C` — expert review request package.
- `MVP-SRA-SCOPE-5D` — handoff hardening after scope-first block.

## 6. Current canonical first-read documents

Read these first for current phase context:

1. `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
2. `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`
3. `nextjs_space/docs/operations/MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md`
4. `nextjs_space/docs/operations/MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md`
5. `nextjs_space/docs/operations/MVP_SRA_SCOPE_2A_CYCLE_MILESTONE_AND_SPECIAL_ACTION_MODEL.md`
6. `nextjs_space/docs/operations/MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md`
7. `nextjs_space/docs/operations/MVP_SRA_SCOPE_4_FUTURE_TUTOR_AGENT_GOVERNANCE_MODEL.md`
8. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5_CONSTRUCTION_RESTART_OPTIONS_AND_READINESS_REVIEW.md`
9. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5A_IMPLEMENTATION_SPEC_FOR_PROVISIONAL_REGISTRY_METADATA.md`
10. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5B_IMPLEMENTATION_SPEC_FOR_FIRST_NON_ALGEBRA_SLICE.md`
11. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5C_PAES_M1_EXPERT_REVIEW_REQUEST_PACKAGE.md`
12. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5D_HANDOFF_HARDENING_AFTER_SCOPE_FIRST_BLOCK.md`

Supporting roadmap/source docs:

- `nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_1_AS1_ALGEBRA_FUNCTIONS_CORRIDOR_METADATA_AND_ASSIGNMENT_CONSTRAINTS.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2F_FIRST_NON_ALGEBRA_SLICE_PROPOSALS.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2G_PAES_M1_EXPERT_REVIEW_PACKET_ASSEMBLY.md`

## 7. Validated operational loop

The local PAES_M1 flow has been validated through:

```text
PAES M1 - Entrada balanceada inicial
-> PAES M1 - Ecuaciones lineales basicas
-> PAES M1 - Problemas con ecuaciones lineales
-> PAES M1 - Refuerzo de ecuaciones lineales
-> PAES M1 - Funciones lineales basicas
-> /now final state with all activities registered and no pending loads
```

Student-facing behavior validated:

- answer questions;
- submit answers;
- self-report block appears without manual scroll;
- finalize activity;
- loading state appears after completion;
- `/now` opens updated without manual refresh.

This validated loop is an operational asset, not the complete PAES_M1 roadmap.

## 8. AS1 status

AS1 algebra/functions corridor is:

- operationally validated;
- useful;
- metadata-constrained;
- expert-review pending;
- available for some students;
- not universal;
- not the complete PAES_M1 roadmap.

Do not convert AS1 into a fixed route for every student.

## 9. N1/G1/PE1 status

First non-algebra slice families are proposal-only:

- N1 — Numbers prerequisite and proportional reasoning.
- G1 — Geometry measurement and visual reasoning.
- PE1 — Data and probability entry.

They are not implemented and are not mandatory detours.

Recommended future first non-algebra content candidate:

```text
PE1-MSL-01 - Lectura de tablas y graficos
Suggested contentKey: paes_m1_data_representation_entry
```

This is not implemented and no automatic routing is authorized.

## 10. Expert review status

Expert review request package exists:

```text
MVP_SRA_SCOPE_5C_PAES_M1_EXPERT_REVIEW_REQUEST_PACKAGE.md
```

Expert review has not occurred unless a later phase documents it.

Do not claim expert validation.

## 11. Implementation status

No implementation is currently authorized.

Prepared but not authorized:

```text
MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities
```

This would be additive registry metadata only, no behavior change, and only after explicit authorization.

The safest future implementation candidate remains metadata-first, not selector-first.

## 12. Pedagogical decision layer context

The next-load decision cannot be only a linear continuity edge.

It must consider:

- PAES_M1 roadmap position;
- current active slice;
- student evidence;
- self-report;
- repeated errors;
- prerequisite risk;
- confidence/frustration;
- novelty tolerance;
- coverage across axes/skills;
- monotony risk;
- milestone state;
- expert/source validation status;
- fallback availability.

Possible decision types include:

- advance;
- reinforce;
- bridge;
- validate;
- hold;
- redirect;
- spiral;
- cycle_milestone;
- async_review_request.

## 13. Non-blocking operator principle

This principle is critical and must be preserved in every future handoff:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

Operators, supervisors, and experts work asynchronously and in parallel. They improve the system, review evidence, insert milestones, correct content, and prepare expert validation. They do not normally block the student's next useful action.

Only separately defined, versioned, and justified exceptional policies may pause student continuity.

## 14. Future tutor-agent status

Future tutor-agent is not implemented.

Governance stance:

```text
Tutor agent = governed decision-support actor inside the SRA, not autonomous pedagogical authority.
```

No adaptive AI claim is allowed in MVP-Beta.

First future agent use case, if ever authorized, should be internal auditable decision proposal only, not autonomous selector.

## 15. Product guardrails

- No PAES score claim.
- No theta claim.
- No mastery claim.
- No adaptive AI claim in MVP-Beta.
- No full PAES_M1 coverage claim unless enough validated slices exist.
- No expert-validation claim until expert review occurs.
- No AS1 universal routing.
- No hidden operator gate.
- Preserve student continuity as default.
- Keep LearningCycles internal unless a later accepted phase changes that rule.
- Keep L1/M2 out of scope until PAES_M1 core is stable.

## 16. Technical guardrails

Unless explicitly authorized in a later phase:

- no implementation;
- no code changes beyond documentation;
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
- no `.logs`, `node_modules`, `yarn.lock`, or checkpoint artifacts.

## 17. Recommended next phase

If continuing documentation-only:

```text
MVP-SRA-SCOPE-5E - Documentation index update after scope-first block
```

Purpose:

- update `DOCUMENTATION_INDEX_MVP_M1.md` so it reflects the current scope-first canonical chain and latest next-phase logic.

If switching chats:

- generate a next-chat handoff using the updated `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`.

If implementation is later desired:

- require explicit authorization before `MVP-SRA-IMPL-1`.

## 18. Context Transfer Protocol

The assistant/agent is responsible for preserving continuity across chats.

If the chat becomes long, loses focus, approaches context saturation, or Mauricio asks whether to change chats, the assistant must proactively generate a complete next-chat handoff.

Do not make Mauricio responsible for remembering or reconstructing context.

Every next-chat handoff must include:

- latest verified Git state, if available;
- explicit warning that Git preflight overrides stale documentation baselines;
- last accepted commit;
- expected working tree state;
- last closed phase;
- next recommended phase;
- canonical documents;
- construction-paused status;
- AS1/N1/G1/PE1 status;
- expert review status;
- implementation authorization status;
- non-blocking operator principle;
- validated operational capabilities;
- immature capabilities;
- product and technical guardrails;
- preflight commands;
- ready-to-paste prompt;
- this same Context Transfer Protocol so the next chat propagates it again.

## 19. Quickstart prompt for future agents

```text
Actua como director tecnico/producto senior para E360 / Bexauri.

No esperes saludo ni contexto adicional. Primero solicita/revisa Git preflight:

git status --short
git log --oneline --decorate --graph -8

Git preflight output is the live source of truth for HEAD, origin/main, and working tree state. If it contradicts embedded baselines in handoff/index/template/PHASE_LOG excerpts, flag the mismatch and prefer Git.

Current expected strategic state:
- Construction is paused.
- Documentation may continue.
- Implementation requires explicit restart authorization.
- Last known accepted phase: MVP-SRA-SCOPE-5D - Handoff hardening after scope-first block.
- Next recommended documentation phase: MVP-SRA-SCOPE-5E - Documentation index update after scope-first block.

First read:
1. nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
2. nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md
3. nextjs_space/docs/operations/MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md
4. nextjs_space/docs/operations/MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md
5. nextjs_space/docs/operations/MVP_SRA_SCOPE_2A_CYCLE_MILESTONE_AND_SPECIAL_ACTION_MODEL.md
6. nextjs_space/docs/operations/MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md
7. nextjs_space/docs/operations/MVP_SRA_SCOPE_4_FUTURE_TUTOR_AGENT_GOVERNANCE_MODEL.md
8. nextjs_space/docs/operations/MVP_SRA_SCOPE_5_CONSTRUCTION_RESTART_OPTIONS_AND_READINESS_REVIEW.md
9. nextjs_space/docs/operations/MVP_SRA_SCOPE_5A_IMPLEMENTATION_SPEC_FOR_PROVISIONAL_REGISTRY_METADATA.md
10. nextjs_space/docs/operations/MVP_SRA_SCOPE_5B_IMPLEMENTATION_SPEC_FOR_FIRST_NON_ALGEBRA_SLICE.md
11. nextjs_space/docs/operations/MVP_SRA_SCOPE_5C_PAES_M1_EXPERT_REVIEW_REQUEST_PACKAGE.md
12. nextjs_space/docs/operations/MVP_SRA_SCOPE_5D_HANDOFF_HARDENING_AFTER_SCOPE_FIRST_BLOCK.md

Critical decisions:
- Bexauri PAES_M1 = guided, evidence-aware roadmap traversal, not a static content sequence.
- AS1 algebra/functions is available and validated operationally, but not universal.
- N1/G1/PE1 are proposed complements, not implemented routes.
- PE1-MSL-01 Lectura de tablas y graficos is the first non-algebra candidate, not implemented.
- Expert review package exists, but expert review has not occurred unless later documented.
- Future implementation candidate is metadata-first, but not authorized.

Critical principle:
review != gate; supervision != bottleneck; operator action != prerequisite for normal student continuity.

Guardrails:
- no implementation unless explicitly authorized;
- no registry edit;
- no new StudyLoads;
- no selector logic;
- no UI/API/schema/database changes;
- no deploy or production;
- no SQL, Prisma CLI, .env, secrets, or npm install;
- no PAES score, theta, mastery, or adaptive AI claims.
```
