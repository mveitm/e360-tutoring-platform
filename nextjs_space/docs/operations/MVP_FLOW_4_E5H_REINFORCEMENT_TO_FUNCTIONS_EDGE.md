# MVP-FLOW-4-E5H - Reinforcement to Linear Functions Continuity Edge

## 1. Purpose

Add the next minimal rule-based PAES_M1 continuity edge:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
```

This phase extends the first guided M1 path from reinforcement into linear functions without adding adaptive AI, scoring, theta, mastery, PAES score claims, schema changes, or production operations.

## 2. Phase type

Minimal runtime continuity change + local validation plan.

## 3. Files changed

- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/docs/operations/MVP_FLOW_4_E5H_REINFORCEMENT_TO_FUNCTIONS_EDGE.md`

## 4. Runtime change

Added exactly one edge to the PAES_M1 continuity map:

```ts
paes_m1_linear_equations_reinforcement: 'paes_m1_linear_functions_basic'
```

No other runtime logic changed.

## 5. Preconditions confirmed before change

- `paes_m1_linear_equations_reinforcement` already exists in the static content registry.
- `paes_m1_linear_functions_basic` already exists in the static content registry.
- Both entries use `program: 'PAES_M1'`.
- Existing continuity behavior already handles:
  - content lookup by completed StudyLoad title;
  - next content lookup by contentKey;
  - program mismatch guard;
  - duplicate pending/in_progress/completed next-load guard;
  - creation of a pending practice StudyLoad in the same LearningCycle.

## 6. Expected local validation

Use local/dev data only. Do not deploy or touch production.

Validate that when a student completes:

```text
PAES M1 - Refuerzo de ecuaciones lineales
```

Bexauri creates:

```text
PAES M1 - Funciones lineales basicas
```

as a `pending` StudyLoad in the same open LearningCycle.

Required checks:

- reinforcement StudyLoad becomes `completed` only after self-report / finalization;
- functions StudyLoad is created as `pending`;
- functions StudyLoad has `loadType = practice`;
- student returns to `/now` after finalization;
- `/now` shows the functions StudyLoad as the next pending activity;
- no CycleDecision is created;
- no CycleEvaluation is created;
- no LearningCycle close occurs;
- no new LearningCycle is created;
- no deploy occurs;
- no production operation occurs.

## 7. Suggested local verification commands

Before pulling/running locally:

```powershell
git fetch origin
git status
git pull --ff-only
git status --short
git log --oneline --decorate --graph -8
```

Recommended static verification:

```powershell
Select-String -Path .\nextjs_space\lib\study-load-continuity.ts -Pattern "paes_m1_linear_equations_reinforcement"
Select-String -Path .\nextjs_space\lib\study-load-content.ts -Pattern "paes_m1_linear_functions_basic"
```

Recommended build verification, from `nextjs_space`:

```powershell
npm.cmd run build
```

If a local fixture exists that is already positioned at `Refuerzo de ecuaciones lineales`, complete that load through the student UI and check `/now` and admin views. If no fixture exists, create only local/dev fixture data through the existing local-safe workflow, not production.

## 8. Guardrails preserved

- No deploy.
- No production operation.
- No SQL.
- No Prisma CLI.
- No `.env` or secrets.
- No L1/M2 expansion.
- No scoring.
- No theta.
- No mastery claims.
- No PAES score prediction.
- No adaptive AI.
- No CycleDecision creation.
- No CycleEvaluation creation.
- No LearningCycle close.
- No new LearningCycle creation.

## 9. Completion criteria

E5H can be accepted only after local verification confirms the edge behavior and no forbidden side effects.

If static/build verification passes but full UI fixture validation is not run yet, classify the phase as implementation-complete but local end-to-end validation pending.

## 10. Next likely decision after E5H validation

After E5H is locally validated, the next direction checkpoint should choose between:

A. Document the first complete M1 guided tutoring path as locally MVP-Beta-ready candidate.
B. Prepare manual review / CycleDecision readiness.
C. Add another narrow content/continuity extension only if the first M1 path still has an obvious pedagogical gap.

Do not choose the next branch before E5H validation evidence is available.
