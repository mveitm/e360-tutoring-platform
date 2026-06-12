# MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-STIMULUS-COMPLETED-VIEW-DIAGNOSIS-1

## Purpose

Diagnose why the current account review of completed PAES M1 C07/C08 capsules did not show the new formatted table stimulus after `MVP-UI-PAES-TABLE-STIMULUS-MINIMUM-1`.

## Baseline

Expected baseline:

```text
HEAD = origin/main = origin/HEAD = 9c9029bfa45443c0bdfbb2f856f7c4e1c9d2a416
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 9c9029bfa45443c0bdfbb2f856f7c4e1c9d2a416
```

## Triggering human observation

The user reviewed completed C07/C08 capsules in the current account. The capsules appear completed. When opening or reviewing those completed capsules, the new formatted table stimulus did not appear.

## Source implementation reviewed

Reviewed:

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `nextjs_space/app/study/paes-m1/page.tsx`
- relevant documentation and phase reports.

Confirmed implementation state:

- C07 and C08 registry items include structured `tableStimulus` data.
- `getSafeStudyLoadItems` preserves `tableStimulus` for UI rendering.
- `StudyLoadAnswerForm` renders `tableStimulus` in answering and read-only/completed question views.
- Stored multiple-choice submissions keep answers and metadata, not a full rendered question/table snapshot.

## Completed capsule rendering path

There are multiple completed-capsule surfaces:

- The canonical StudyLoad detail route `/now/study-loads/[id]` loads content from the static registry by `studyLoad.title`, builds safe items, and passes those items to `StudyLoadAnswerForm`.
- In `StudyLoadAnswerForm`, the read-only completed question renderer calls the same table stimulus renderer used by active questions.
- The PAES M1 study page completed capsule section is a summary/review entry point. It lists completed capsules and links to `/now/study-loads/[id]`; it does not render stems, options, feedback, or table stimuli itself.
- Admin/evidence-style completed review paths are separate from the student question renderer and should not be assumed to render `tableStimulus` unless explicitly wired.

## Active/new StudyLoad rendering path

Active and new StudyLoads on `/now/study-loads/[id]` use the answering path in `StudyLoadAnswerForm`. That path renders the stem, then `tableStimulus`, then options. Therefore new or in-progress C07/C08 StudyLoads with current registry content should show formatted HTML tables.

## Diagnosis

Classification:

```text
A) COMPLETED_VIEW_RENDERER_MISSING_TABLE_STIMULUS
```

Static diagnosis:

- The direct student StudyLoad detail renderer is connected to `tableStimulus` for completed/read-only and active views.
- The completed capsule summary surface does not render table stimuli because it is a card/link surface, not the question renderer.
- The issue is not explained by a full completed StudyLoad content snapshot, because stored submissions do not contain full table/stem snapshots.
- The issue is not explained by `tableStimulus` being disconnected from the canonical StudyLoad renderer.
- If the user clicked through to `/now/study-loads/[id]` and still saw no tables, the next likely cause is stale or mismatched local/dev StudyLoad title/content resolution, or a separate completed/evidence renderer outside the canonical StudyLoad detail path.

## Smoke access implication

The PAES M1 completed capsule list is not a valid smoke surface for verifying table formatting. Human smoke should verify table stimuli on the canonical detail route `/now/study-loads/[id]` for C07/C08, or on a controlled new local/dev StudyLoad that resolves to the current exact C07/C08 registry entries.

Existing completed instances may still be useful only if their title resolves to the current registry content and the reviewer is on the canonical detail route, not merely the completed summary card or an admin/evidence surface.

## Recommended repair or smoke path

Recommended path:

```text
A) implementar soporte tableStimulus tambien en completed view
```

Scope clarification:

- If completed summary/evidence views are expected to show question content, they need explicit `tableStimulus` rendering or should route clearly to the canonical detail renderer.
- For safe human smoke, prepare or identify a local/dev C07/C08 StudyLoad whose title/contentKey resolves to the current registry and review it through `/now/study-loads/[id]`.
- If the canonical detail route still fails for exact-title C07/C08, open a targeted repair/audit for local/dev stale title/content resolution.

## Scope safety

This was a read-only diagnostic phase except for authorized documentation updates. No code, UI, API, schema, Prisma, route-order, continuity, fixture, seed, or DB files were modified. No browser automation, API-only tests, DB reset, migration, production/staging operation, or secret inspection was performed.

## Result

```text
C07_C08_TABLE_STIMULUS_DIAGNOSIS_COMPLETED_VIEW_RENDERER_MISSING
```

## Next recommended phase

```text
MVP-UI-PAES-TABLE-STIMULUS-COMPLETED-VIEW-REPAIR-1
```

Purpose:

```text
Wire tableStimulus into completed review surfaces that are expected to display item content, or route those surfaces explicitly to the canonical StudyLoad detail renderer, then prepare safe C07/C08 local/dev smoke.
```
