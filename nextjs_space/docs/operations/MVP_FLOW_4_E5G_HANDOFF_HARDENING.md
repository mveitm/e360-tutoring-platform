# MVP-FLOW-4-E5G - Handoff Hardening

## 1. Purpose

This document records the E5G handoff-hardening change made after the E5G direction checkpoint.

The purpose is to reduce the risk that future chats or agents lose context, weaken operational guardrails, or treat stale embedded baselines as live repo truth.

## 2. Scope

Documentation/protocol only.

No app code, schema, runtime behavior, deploy, production operation, SQL, Prisma CLI, `.env`, data mutation, generated PDF/DOCX, node_modules, yarn.lock, or checkpoint artifacts are part of this hardening.

## 3. Live-state rule

Git preflight is the live source of truth for:

- HEAD;
- origin/main;
- working tree state;
- whether a handoff has been superseded by a later commit.

Every future chat must request or review:

```text
git status --short
git log --oneline --decorate --graph -8
```

If Git preflight contradicts any embedded baseline in a handoff, index, template, PHASE_LOG excerpt, or phase document, Git wins and the mismatch must be explicitly flagged.

## 4. E5G intake state

The E5G direction checkpoint intake verified:

- HEAD = origin/main = `283851a`.
- Last accepted commit at intake: `MVP-FLOW-4-E5G-0: add direction checkpoint handoff`.
- Working tree: clean.

Subsequent hardening commits necessarily make live HEAD newer than `283851a`. This is expected. Future agents must not treat `283851a` as a permanent baseline.

## 5. Drift found and resolved or contained

The E5G intake found stale baseline text in multiple documents:

- E5G-0 handoff originally pointed to `ee7e9af`.
- Current agent handoff also pointed to `ee7e9af`.
- Documentation index and context-transfer template still contained older `213fccb` defaults.

Resolved in this hardening:

- `MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md` now records the E5G intake state, the drift, the E5G decision, and the next E5H phase.
- `CURRENT_AGENT_HANDOFF_MVP_M1.md` now places the live-state rule before static baseline text and names E5H as the next recommended phase.
- `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` now removes stale E2 defaults as operational defaults and requires future handoffs to include known drift warnings.

Contained but not fully edited in this hardening:

- `DOCUMENTATION_INDEX_MVP_M1.md` still contains older baseline text in some sections if not separately edited later.
- `PHASE_LOG.md` was not rewritten during this hardening because the file is large and should not be risked through a partial or unsafe overwrite.

The containment rule is sufficient: live Git preflight wins and stale baselines must be flagged.

## 6. E5G decision preserved

E5G evaluated three options:

A. Prepare manual review / CycleDecision readiness.
B. Add and validate the next edge from reinforcement to functions.
C. Document the first complete M1 guided tutoring path as MVP-Beta-ready locally.

Decision: choose B.

Reason:

- The path has been validated through `paes_m1_linear_equations_reinforcement`.
- The registry already contains `paes_m1_linear_functions_basic`.
- The first M1 guided path should not be called locally MVP-Beta-ready until the transition from reinforcement to functions is implemented and validated.
- Manual review / CycleDecision readiness should not become the normal student-continuity bottleneck before the first guided path is complete.

## 7. Next recommended phase

```text
MVP-FLOW-4-E5H - Add and validate reinforcement -> linear functions continuity edge
```

Candidate edge:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
```

Expected E5H validation:

- Completing reinforcement creates functions as pending.
- Student returns to `/now`.
- `/now` shows the new pending functions load.
- No CycleDecision is created.
- No CycleEvaluation is created.
- No LearningCycle close occurs.
- No new LearningCycle is created.
- No deploy or production operation occurs.

## 8. Autopropagation rule

Every future handoff must include:

- latest verified Git state, if available;
- explicit statement that Git preflight overrides stale documentation baselines;
- known documentation drift / stale baseline warnings;
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
- the same context-transfer rule so the next handoff propagates it again.

Mauricio must not be responsible for reconstructing or remembering this context manually.

## 9. Guardrails

- First complete M1 tutoring experience before L1/M2.
- Rule-based continuity in MVP-Beta, not adaptive AI.
- No theta.
- No mastery claims.
- No scoring claims.
- No PAES score prediction.
- No deploy or production operation unless a later explicit phase authorizes it.
- No SQL, Prisma CLI, `.env`, or secrets unless a later explicit phase authorizes a safe pathway.
- LearningCycles remain internal and should stay invisible to students unless a later accepted product phase changes that rule.
