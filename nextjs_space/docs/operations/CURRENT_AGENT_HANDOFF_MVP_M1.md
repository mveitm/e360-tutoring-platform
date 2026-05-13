# Current Agent Handoff - MVP M1

## 1. Purpose

This is the first-read context document for agents working on the Bexauri MVP-M1 tutoring line. It is intended for ChatGPT, Codex, Abacus, or another development copiloto entering the repo without the prior chat context.

Use this document to understand the current direction before proposing or implementing future phases.

## 2. Current repo baseline

- HEAD = origin/main = `ee7e9af`.
- Last accepted commit: `MVP-FLOW-4-E5F: clarify pending closure state`.
- Working tree expected clean.

## 3. Current strategic objective

The next objective is the first complete minimal `PAES_M1` tutoring experience.

Do not expand to L1 or M2 yet. Do not keep adding isolated verifications by inertia. The path should be the shortest safe path to MVP-Beta, not maximal architecture.

## 4. Source-of-truth hierarchy

1. `PHASE_LOG.md` is the audit trail and continuity ledger.
2. `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md` is the working documentation index and source-alignment layer.
3. `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` is the stable next-chat handoff template/contract.
4. `nextjs_space/docs/operations/MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md` is the immediate context-transfer document for the E5G direction checkpoint.
5. `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md` is the canonical student/SRA journey.
6. `MVP_CONTENT_1` through `MVP_CONTENT_4` define the PAES_M1 roadmap/content chain.
7. `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_RETRY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md` is runtime validation evidence for the first automatic pair.
8. Current code behavior is the executable truth.
9. Optional business/strategy documents, if present, provide product context. During E1, `BEXAURI_PROPUESTA_INTEGRADA_MVP_v1.md`, `AUDITORIA_ESTRATEGICA_MVP_MONETIZACION_E360_BEXAURI_MAYO_2026.md`, and `Bexauri_Especificaciones_Director_Proyecto.pdf` were external / not versioned in repo. `MVP_DIRECTION_1_MICROLEARNING_LOOP_ADOPTION_DECISION.md` was found as local strategic direction context.

## 5. Canonical student/SRA flow

Student enters tutoring -> receives first StudyLoad -> starts activity -> answers -> self-reports -> completes in activity -> Bexauri records evidence -> Bexauri prepares next StudyLoad -> supervisor reviews in parallel.

The student should experience learning continuity. LearningCycles, internal status transitions, evidence custody, and supervisor review should remain internal unless explicitly needed for student orientation.

## 6. Current validated capabilities

- MVP-FLOW-2 first enrollment bootstrap exists.
- `/now` hides cycle-facing language from the student.
- Content-backed StudyLoad viewer exists.
- MC responses can be submitted.
- In-activity completion and self-report exist.
- First rule-based continuity pair is implemented and locally validated:
  - `paes_m1_balanced_entry_initial` -> `paes_m1_linear_equations_basic`.
- `/now` shows the next pending StudyLoad after completion.
- Cycle remains open and no CycleDecision, CycleEvaluation, or new cycle is created by this continuity.
- E5A-E5F closed the latest student-flow debts:
  - `paes_m1_linear_equations_word_problems` -> `paes_m1_linear_equations_reinforcement` exists and was locally validated.
  - `Empezar` starts a pending StudyLoad and opens the activity directly.
  - Admin-mediated student account creation exists; public signup remains closed.
  - `Finalizar actividad` returns the student to `/now`.
  - Submitted-but-not-completed loads are shown as `Pendiente de cierre`.
  - In pending-closure state, the closure block appears before instructions in the activity view.

## 7. Current PAES_M1 pedagogical interpretation

The PAES_M1 operating chain is:

master roadmap -> active slice -> micro StudyLoad -> evidence -> supervised adjustment -> next active slice.

The first active slice focuses on:

- algebraic readiness;
- linear equations;
- context to equation;
- linear functions;
- proportional reasoning as support;
- data interpretation as low-friction observation.

This is a supervised MVP-Beta roadmap interpretation, not a full adaptive engine.

## 8. Existing first M1 content path

Current/proposed first path:

1. PAES M1 - Entrada balanceada inicial.
2. PAES M1 - Ecuaciones lineales basicas.
3. PAES M1 - Problemas con ecuaciones lineales.
4. PAES M1 - Refuerzo de ecuaciones lineales.
5. PAES M1 - Funciones lineales basicas.

Validated automatic edges currently include:

- `paes_m1_balanced_entry_initial` -> `paes_m1_linear_equations_basic`.
- `paes_m1_linear_equations_basic` -> `paes_m1_linear_equations_word_problems`.
- `paes_m1_linear_equations_word_problems` -> `paes_m1_linear_equations_reinforcement`.

No continuity edge beyond reinforcement is accepted yet.

## 9. What is not mature yet

- No adaptive AI.
- No theta.
- No PAES score prediction.
- No automatic mastery.
- No full roadmap engine.
- No full supervisor evidence workflow.
- No L1/M2 replication.
- No complete M1 tutoring path across several StudyLoads yet.

## 10. Product guardrails

- Avoid overpromising.
- Do not call rule-based progression adaptive AI.
- Do not make PAES score or mastery claims from micro StudyLoads.
- Supervisor is asynchronous quality control, not the normal release bottleneck.
- LearningCycles are internal and should stay invisible to students.

## 11. Current next phase

Recommended next phase:

`MVP-FLOW-4-E5G - Direction checkpoint after closing UX/account/mobile completion debts`

Reason: E5A-E5F closed key continuity, account-access, completion-navigation, and pending-closure debts. The next safe step is a direction checkpoint before choosing manual review / CycleDecision readiness, the next continuity edge to functions, or documentation of the first complete M1 guided tutoring path as locally MVP-Beta-ready.

## 12. Implementation boundaries for the next phase

The next phase should be documentation/direction only unless Mauricio explicitly changes the phase type.

It should not implement runtime behavior, change endpoints, change Prisma/schema, mutate registry/content, change UI, seed data, run SQL, use Prisma CLI, deploy, access `.env`, or touch secrets.

## 13. Files likely relevant for future implementation

- `PHASE_LOG.md`
- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`
- `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_RETRY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md`
- `nextjs_space/docs/operations/MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md`
- `nextjs_space/docs/operations/MVP_CONTENT_2_PAES_M1_FIRST_ACTIVE_SLICE.md`
- `nextjs_space/docs/operations/MVP_CONTENT_3_PAES_M1_FIRST_MICRO_STUDYLOAD_SET.md`
- `nextjs_space/docs/operations/MVP_CONTENT_4_PAES_M1_BALANCED_ENTRY_MICRO_STUDYLOAD_REGISTRY_PROPOSAL.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`

## 14. Context Transfer Protocol

The assistant/agent is responsible for preserving continuity across chats.

If the chat becomes long, loses focus, approaches context saturation, or Mauricio asks whether to change chats, the assistant must proactively generate a complete next-chat handoff. Do not make Mauricio responsible for remembering or reconstructing context.

Git preflight output is the live source of truth for HEAD, origin/main, and working tree state. This handoff and the documentation index are versioned context documents, not absolute live state. If Git preflight contradicts an embedded baseline in this handoff or the index, Git preflight wins and the assistant/agent must explicitly flag the mismatch.

If the current phase allows documentation changes, the assistant/agent must correct stale baseline and next-phase references. If the current phase does not allow documentation changes, the assistant/agent must include the mismatch in the next-chat handoff.

The handoff must include HEAD, origin/main, last accepted commit, expected working tree state, last closed phase, next recommended phase, canonical documents, this handoff file, `DOCUMENTATION_INDEX_MVP_M1.md`, validated capabilities, immature capabilities, guardrails, preflight commands, a ready-to-paste prompt, the latest verified Git state if available, and this same Git-preflight-overrides-stale-docs protocol so the next chat propagates it again.

Future next-chat handoffs should use `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` as the canonical template.

## 15. Quickstart prompt for future agents

```text
You are entering the E360 / Bexauri repo for the MVP-M1 tutoring line.

First read:
nextjs_space/docs/operations/MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md

Then verify:
git status --short
git log -1 --pretty=format:"%h %s"

Do not implement before reading the canonical docs listed in the handoff.
Git preflight output is live truth. If it contradicts embedded baselines in the handoff or index, flag the mismatch and prefer Git preflight.

Assume the next task is MVP-FLOW-4-E5G, a documentation/direction checkpoint, unless Mauricio explicitly instructs runtime implementation.

Guardrails:
- first complete M1 tutoring experience before L1/M2;
- rule-based continuity in MVP-Beta, not adaptive AI;
- no theta, mastery, or PAES score claims;
- student continuity should not normally wait for supervisor/admin action;
- LearningCycles are internal and should stay invisible to students.
- if chat migration is needed, generate the next-chat handoff automatically.
- every future handoff must propagate the rule that Git preflight overrides stale documentation baselines.
```
