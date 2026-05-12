# Documentation Index - MVP M1

## 1. Purpose

This is the working documentation index for the MVP-M1 tutoring line and the first complete minimal PAES_M1 tutoring experience.

It tells future agents what documents are canonical, what each document is for, what is already validated, what is still immature, what sources are missing or external, and how context must be transferred to future chats.

## 2. Repo baseline

- HEAD = origin/main = `5980ede`.
- Last accepted commit: `MVP-FLOW-4-E1: add M1 documentation index and transfer protocol`.
- Working tree expected clean.

## 3. Documentation hierarchy

- `PHASE_LOG.md` = audit trail / continuity ledger, not a full content repository.
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md` = first-read operational handoff.
- `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md` = canonical student/SRA experience.
- `nextjs_space/docs/operations/MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md` through `MVP_CONTENT_4_PAES_M1_BALANCED_ENTRY_MICRO_STUDYLOAD_REGISTRY_PROPOSAL.md` = PAES_M1 roadmap/content chain.
- `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_RETRY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md` = latest runtime validation evidence.
- Current code behavior = executable truth.
- Strategy/business docs = supporting context, not runtime source of truth.

## 4. Documentation index table

| Document | Status | Role | Canonical level | Use for | Do not use for | Read before implementation? |
|---|---|---|---|---|---|---|
| `PHASE_LOG.md` | Present | Audit trail and continuity ledger | High for phase history | Recover last closed phases, decisions, validation summaries, forbidden actions | Replacing focused canonical docs or reading as a content repository | Yes |
| `CURRENT_AGENT_HANDOFF_MVP_M1.md` | Present | First-read operational handoff | High for onboarding | Fast context transfer, current direction, guardrails, quickstart prompt | Detailed source evidence or final implementation specs | Yes |
| `MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md` | Present | Canonical student/SRA experience | Highest for student flow | Student journey, SRA principle, supervisor role, non-blocking continuity | Runtime proof or code-level behavior | Yes |
| `MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md` | Present | PAES_M1 master roadmap skeleton | High for pedagogy | Master roadmap, axes, difficulty bands, evidence principles | Registry truth or implemented content status | Yes for PAES_M1 work |
| `MVP_CONTENT_2_PAES_M1_FIRST_ACTIVE_SLICE.md` | Present | First PAES_M1 active slice | High for first slice direction | Algebra/linear entry focus, manual branching rules, first active slice purpose | Automatic placement, score, mastery, or engine behavior | Yes for PAES_M1 work |
| `MVP_CONTENT_3_PAES_M1_FIRST_MICRO_STUDYLOAD_SET.md` | Present | First micro StudyLoad set | High for content path | Balanced entry concept and existing algebra/function continuation path | Final fixed order for every student or full roadmap engine | Yes for PAES_M1 work |
| `MVP_CONTENT_4_PAES_M1_BALANCED_ENTRY_MICRO_STUDYLOAD_REGISTRY_PROPOSAL.md` | Present | Registry-ready balanced entry proposal | High for balanced entry content | Proposed `paes_m1_balanced_entry_initial` content and guardrails | Claiming registry implementation by itself | Yes for balanced entry changes |
| `MVP_FLOW_4_D_VERIFY_RETRY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md` | Present | Latest runtime validation evidence | High for validated behavior | Confirm first automatic continuity pair and lifecycle side-effect checks | Generalizing to a complete M1 path or adaptive behavior | Yes for continuity changes |
| `MVP_DIRECTION_1_MICROLEARNING_LOOP_ADOPTION_DECISION.md` | Present | Strategic microlearning direction | Supporting canonical product direction | Microlearning loop, supervisor non-bottleneck principle, roadmap direction | Runtime source of truth or implementation permission | Yes for direction changes |
| `BEXAURI_PROPUESTA_INTEGRADA_MVP_v1.md` | External / not versioned in repo during E1 | Business/product strategy input | Supporting if later incorporated | Product rationale if imported or synthesized later | Runtime truth or direct implementation without repo synthesis | No, unless later added |
| `AUDITORIA_ESTRATEGICA_MVP_MONETIZACION_E360_BEXAURI_MAYO_2026.md` | External / not versioned in repo during E1 | Business/monetization audit input | Supporting if later incorporated | Strategic constraints if imported or synthesized later | Runtime truth or direct implementation without repo synthesis | No, unless later added |
| `Bexauri_Especificaciones_Director_Proyecto.pdf` | External / not versioned in repo during E1 | Director specifications input | Supporting if later incorporated | Director-level constraints if imported or synthesized later | Runtime truth or direct implementation without repo synthesis | No, unless later added |

## 5. Current source alignment summary

The aligned direction is:

- First complete minimal PAES_M1 tutoring experience before L1/M2.
- Student continuity without supervisor bottleneck.
- Micro StudyLoads and roadmap-driven evidence.
- Rule-based continuity in MVP-Beta.
- Supervisor as asynchronous quality control.
- No adaptive AI, theta, mastery, or PAES score claims yet.

The system should move toward a continuous tutoring loop where the student can study, answer, self-report, receive feedback where available, and continue without needing to understand internal LearningCycle mechanics.

## 6. What is already validated

- First rule-based continuity pair validated:
  - `paes_m1_balanced_entry_initial` -> `paes_m1_linear_equations_basic`.
- `/now` shows the next pending StudyLoad after completion.
- Previous load appears under `Actividades registradas` with self-report.
- Cycle remains open.
- No CycleDecision was created.
- No CycleEvaluation was created.
- No governance record / ContinuitySignal was created.
- No LearningCycle close occurred.
- No new LearningCycle was created.

## 7. What is not yet mature

- No complete M1 tutoring path across several StudyLoads.
- No full roadmap engine.
- No supervisor evidence review workflow.
- No adaptive AI.
- No theta.
- No PAES score prediction.
- No automatic mastery.
- No L1/M2 replication.

## 8. Missing or external source documents

The following known strategy documents were not versioned in the repo during E1:

- `BEXAURI_PROPUESTA_INTEGRADA_MVP_v1.md`.
- `AUDITORIA_ESTRATEGICA_MVP_MONETIZACION_E360_BEXAURI_MAYO_2026.md`.
- `Bexauri_Especificaciones_Director_Proyecto.pdf`.

Recommended later decision:

- Import them later as versioned docs, if their full text must become repo-governed.
- Or synthesize them into a canonical repo document, if only decisions and constraints matter.
- Or keep them external and reference only their accepted decisions in source-alignment docs.

Do not choose the final import path in this phase.

## 9. Context Transfer Protocol

The assistant/agent is responsible for preserving continuity across chats.

If the chat becomes long, loses focus, approaches context saturation, or Mauricio asks whether to change chats, the assistant must proactively generate a next-chat handoff.

Do not make Mauricio responsible for remembering or reconstructing context.

Git preflight output is the live source of truth for HEAD, origin/main, and working tree state. The handoff and documentation index are versioned context documents, not absolute live state.

If Git preflight contradicts the baseline written in the handoff or documentation index, Git preflight wins. The assistant/agent must explicitly flag the mismatch. If the current phase allows documentation changes, the assistant/agent must correct stale baseline and next-phase references. If the current phase does not allow documentation changes, the assistant/agent must include the mismatch in the next-chat handoff.

Every next-chat handoff must include both the latest verified Git state, if available, and this same Git-preflight-overrides-stale-docs rule. This rule must be propagated again in every future handoff.

The next-chat handoff must include:

- HEAD;
- origin/main;
- last accepted commit;
- expected working tree state;
- last closed phase;
- next recommended phase;
- canonical documents;
- current handoff file;
- documentation index file;
- validated capabilities;
- immature capabilities;
- product and technical guardrails;
- preflight commands;
- ready-to-paste prompt for the next chat;
- this same Context Transfer Protocol so the next chat propagates it again.
- the rule that Git preflight overrides stale documentation baselines.

Minimum preflight commands for the next chat:

```text
git status --short
git log -1 --pretty=format:"%h %s"
```

Minimum ready-to-paste prompt shape:

```text
Act as a senior product/technical operator for E360 / Bexauri.

First read:
- nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
- nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md

Then verify:
- git status --short
- git log -1 --pretty=format:"%h %s"

Do not implement before reading the canonical docs listed in the index.
Git preflight output is live truth. If it contradicts embedded baselines in the handoff or index, flag the mismatch and prefer Git preflight.
The current objective remains the first complete minimal PAES_M1 tutoring experience before L1/M2.
Rule-based continuity is allowed in MVP-Beta; do not claim adaptive AI, theta, mastery, or PAES score prediction.

If this chat becomes long or needs migration, generate the next-chat handoff automatically. Do not make Mauricio carry the context manually. Every future handoff must propagate the rule that Git preflight overrides stale documentation baselines.
```

## 10. Recommended next phase

Recommended next phase:

`MVP-FLOW-4-E3 - Implement and validate the next continuity edge after linear equations basic`

Reason: E2 defines the shortest safe implementation roadmap and repairs the context self-propagation protocol. The next safe runtime increment is the next explicit PAES_M1 continuity edge after the validated first pair.
