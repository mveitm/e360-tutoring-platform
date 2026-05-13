# Current Agent Handoff - MVP M1

## 1. Purpose

This is the first-read context document for agents working on the Bexauri MVP-M1 tutoring line. It is intended for ChatGPT, Codex, Abacus, or another development copiloto entering the repo without the prior chat context.

Use this document to understand the current direction before proposing or implementing future phases.

## 2. Live-state rule

This document is versioned context. It is not the live source of truth for `HEAD`, `origin/main`, or working tree state.

Every new chat or agent must first request/review:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight is the live truth. If Git preflight contradicts embedded baselines in this handoff, the documentation index, the context-transfer template, PHASE_LOG excerpts, or any phase-specific handoff, Git wins and the mismatch must be explicitly flagged.

## 3. Last verified Git state before E5G hardening

The E5G direction-checkpoint chat verified this intake state:

- HEAD = origin/main = `283851a`.
- Last accepted commit at intake: `MVP-FLOW-4-E5G-0: add direction checkpoint handoff`.
- Working tree: clean.

After this document is edited and committed, live `HEAD` will be newer than `283851a`. That is expected. Future chats must use live Git preflight, not this static paragraph, as truth.

## 4. Current strategic objective

The current objective is the first complete minimal `PAES_M1` tutoring experience.

Do not expand to L1 or M2 yet. Do not keep adding isolated verifications by inertia. The path should be the shortest safe path to MVP-Beta, not maximal architecture.

## 5. Source-of-truth hierarchy

1. Live Git preflight = current repo state.
2. Current code behavior = executable truth.
3. `PHASE_LOG.md` = audit trail and continuity ledger.
4. `nextjs_space/docs/operations/MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md` = latest E5G direction checkpoint / immediate next-phase handoff.
5. `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md` = working documentation index and source-alignment layer.
6. `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` = stable next-chat handoff template/contract.
7. `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md` = canonical student/SRA journey.
8. `MVP_CONTENT_1` through `MVP_CONTENT_4` = PAES_M1 roadmap/content chain.
9. `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_RETRY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md` = runtime validation evidence for the first automatic pair.
10. Optional business/strategy documents, if present, provide product context. They are supporting context, not runtime source of truth unless explicitly versioned and accepted.

## 6. Canonical student/SRA flow

Student enters tutoring -> receives first StudyLoad -> starts activity -> answers -> self-reports -> completes in activity -> Bexauri records evidence -> Bexauri prepares next StudyLoad -> supervisor reviews in parallel.

The student should experience learning continuity. LearningCycles, internal status transitions, evidence custody, and supervisor review should remain internal unless explicitly needed for student orientation.

## 7. Current validated capabilities

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

## 8. Current PAES_M1 pedagogical interpretation

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

## 9. Existing first M1 content path

Current first path:

1. PAES M1 - Entrada balanceada inicial.
2. PAES M1 - Ecuaciones lineales basicas.
3. PAES M1 - Problemas con ecuaciones lineales.
4. PAES M1 - Refuerzo de ecuaciones lineales.
5. PAES M1 - Funciones lineales basicas.

Validated automatic edges currently include:

- `paes_m1_balanced_entry_initial` -> `paes_m1_linear_equations_basic`.
- `paes_m1_linear_equations_basic` -> `paes_m1_linear_equations_word_problems`.
- `paes_m1_linear_equations_word_problems` -> `paes_m1_linear_equations_reinforcement`.

E5G decision: the next edge should be added and validated before calling the first M1 path MVP-Beta-ready locally:

- `paes_m1_linear_equations_reinforcement` -> `paes_m1_linear_functions_basic`.

## 10. What is not mature yet

- No adaptive AI.
- No theta.
- No PAES score prediction.
- No automatic mastery.
- No full roadmap engine.
- No full supervisor evidence workflow.
- No L1/M2 replication.
- No complete M1 tutoring path validated through functions yet.

## 11. Product guardrails

- Avoid overpromising.
- Do not call rule-based progression adaptive AI.
- Do not make PAES score or mastery claims from micro StudyLoads.
- Supervisor is asynchronous quality control, not the normal release bottleneck.
- LearningCycles are internal and should stay invisible to students.
- Preserve student continuity as the default path unless a later explicit phase introduces a justified review gate.

## 12. Current next phase

Recommended next phase:

```text
MVP-FLOW-4-E5H - Add and validate reinforcement -> linear functions continuity edge
```

Reason: E5G chose option B. The path has validated continuity through `Refuerzo de ecuaciones lineales`, and the functions content already exists in the registry. The shortest safe path to a first complete M1 guided local MVP-Beta candidate is to add and validate the missing rule-based continuity edge to `Funciones lineales basicas`.

## 13. Implementation boundaries for E5H

E5H may implement only the narrow runtime edge and local validation required for:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
```

It should not change schema, add AI/adaptive logic, change content beyond what is necessary for the continuity edge, deploy, touch production, run SQL, use Prisma CLI, access `.env`, print secrets, or expand to L1/M2.

Validation must confirm:

- completing reinforcement creates functions as pending;
- student returns to `/now`;
- `/now` shows the new pending functions load;
- no CycleDecision is created;
- no CycleEvaluation is created;
- no LearningCycle close occurs;
- no new LearningCycle is created.

## 14. Files likely relevant for E5H

- `PHASE_LOG.md`
- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/docs/operations/MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md`
- `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`
- `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_RETRY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md`
- `nextjs_space/docs/operations/MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md`
- `nextjs_space/docs/operations/MVP_CONTENT_2_PAES_M1_FIRST_ACTIVE_SLICE.md`
- `nextjs_space/docs/operations/MVP_CONTENT_3_PAES_M1_FIRST_MICRO_STUDYLOAD_SET.md`
- `nextjs_space/docs/operations/MVP_CONTENT_4_PAES_M1_BALANCED_ENTRY_MICRO_STUDYLOAD_REGISTRY_PROPOSAL.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`

## 15. Context Transfer Protocol

The assistant/agent is responsible for preserving continuity across chats.

If the chat becomes long, loses focus, approaches context saturation, or Mauricio asks whether to change chats, the assistant must proactively generate a complete next-chat handoff. Do not make Mauricio responsible for remembering or reconstructing context.

Every next-chat handoff must include:

- latest verified Git state, if available;
- explicit warning that Git preflight overrides stale documentation baselines;
- last accepted commit;
- expected working tree state;
- last closed phase;
- next recommended phase;
- canonical documents;
- current phase handoff file;
- documentation index file;
- validated capabilities;
- immature capabilities;
- product and technical guardrails;
- preflight commands;
- ready-to-paste prompt;
- the same Context Transfer Protocol so the next chat propagates it again.

Future next-chat handoffs should use `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` as the canonical template.

## 16. Quickstart prompt for future agents

```text
You are entering the E360 / Bexauri repo for the MVP-M1 tutoring line.

First verify Git preflight:
git status --short
git log --oneline --decorate --graph -8

Git preflight output is live truth. If it contradicts embedded baselines in the handoff, index, template, or PHASE_LOG excerpts, flag the mismatch and prefer Git preflight.

First read:
nextjs_space/docs/operations/MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md
PHASE_LOG.md latest MVP-FLOW-4 entries

Assume the next task is MVP-FLOW-4-E5H unless Mauricio explicitly changes direction:
Add and validate the rule-based continuity edge
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic.

Guardrails:
- first complete M1 tutoring experience before L1/M2;
- rule-based continuity in MVP-Beta, not adaptive AI;
- no theta, mastery, scoring, or PAES score claims;
- no deploy or production;
- no SQL, Prisma CLI, .env, or secrets;
- student continuity should not normally wait for supervisor/admin action;
- LearningCycles are internal and should stay invisible to students;
- if chat migration is needed, generate the next-chat handoff automatically;
- every future handoff must propagate the rule that Git preflight overrides stale documentation baselines.
```
