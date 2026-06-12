# MVP-UI-PAES-TABLE-STIMULUS-COMPLETED-VIEW-REPAIR-1

## Purpose

Repair the completed StudyLoad review path so C07/C08 completed capsules can render the existing formatted `tableStimulus` content when the completed load is reviewed.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 544fd2b60726d0daad5f7dd3b0b7ae9e77671e4b
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 544fd2b60726d0daad5f7dd3b0b7ae9e77671e4b
```

## Source diagnosis

Source diagnosis:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-STIMULUS-COMPLETED-VIEW-DIAGNOSIS-1
C07_C08_TABLE_STIMULUS_DIAGNOSIS_COMPLETED_VIEW_RENDERER_MISSING
```

Relevant implementation facts:

- C07/C08 registry items already include structured `tableStimulus`.
- `getSafeStudyLoadItems` already preserves `tableStimulus`.
- `StudyLoadAnswerForm` already renders `tableStimulus` in active and completed/read-only item views.
- Existing completed StudyLoads may have historical titles that do not resolve by exact title lookup.
- The latest `mc_submission` payload stores `contentKey` and `contentVersion`, which can safely identify the registry content without mutating historical data.

## Repair scope

Implemented a minimal fallback in the student StudyLoad detail route:

```text
nextjs_space/app/now/study-loads/[id]/page.tsx
```

The page now reads the latest `mc_submission` before deciding that content is unavailable. If exact title lookup fails, it uses the stored `contentKey` from the submission to resolve current registry content by stable key, guarded by `contentVersion` when present.

## UI rendering change

No new table renderer was introduced. The repair connects completed historical reviews back to the existing `StudyLoadAnswerForm` path by ensuring `content` can be resolved from the submitted payload identity.

Once content resolves, the existing completed/read-only renderer receives `safeItems`, including `tableStimulus`, and renders formatted HTML tables consistently with active/new StudyLoads.

## Completed view behavior

Expected completed review behavior after this phase:

- exact-title completed StudyLoads continue to render as before;
- completed StudyLoads with stored `mc_submission.contentKey` can resolve registry content even if their display title is stale;
- C07/C08 completed reviews should show formatted table stimuli when their stored content key is `paes_m1_data_representation_entry` or `paes_m1_data_representation_entry_ii`;
- selected answers, feedback, self-report display, and navigation remain unchanged.

## What was not changed

No schema/DB/Prisma changes.
No DB mutation.
No route-order/continuity changes.
No contentKey changes.
No correctOptionKey changes.
No item count changes.
No authoredFeedback changes.
No agentic layer opened.

Additional non-actions:

- no seed or fixture changes;
- no migration changes;
- no StudyLoad state machine changes;
- no submission/evaluation API changes;
- no graph, SVG, geometry, image/asset, or LaTeX implementation;
- no browser automation or API-only tests;
- no production/staging operation.

## Validation

Validation executed:

```text
git diff --check
git status --short
git log --oneline --decorate --graph -8
npm.cmd --prefix nextjs_space run build
```

Build/validation status is recorded in the compact report for this phase.

## Result

```text
PAES_TABLE_STIMULUS_COMPLETED_VIEW_REPAIR_IMPLEMENTED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-STIMULUS-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Purpose:

```text
Execute human local/dev smoke on completed C07/C08 review to confirm formatted table stimuli are visible, legible, coherent with stems/options/feedback, and non-regressive for review flow.
```
