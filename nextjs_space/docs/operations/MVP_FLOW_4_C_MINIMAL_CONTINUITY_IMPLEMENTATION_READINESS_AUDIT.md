# MVP-FLOW-4-C - Minimal continuity implementation readiness audit

## Purpose

Audit the existing codebase and produce an implementation-readiness plan for a future MVP-FLOW-4-D implementation of minimal non-blocking next StudyLoad continuity.

This phase is audit/readiness-only. It does not implement runtime behavior.

## Canonical anchor

Canonical sources re-read before this audit:

- `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`
- `nextjs_space/docs/operations/MVP_FLOW_4_A2_REALIGN_POST_COMPLETION_CONTINUITY_WITH_CANONICAL_FLOW.md`
- `nextjs_space/docs/operations/MVP_FLOW_4_B_MINIMAL_NON_BLOCKING_NEXT_STUDYLOAD_CONTINUITY_DESIGN.md`

Anchor:

- The student and supervisor work in parallel, not in series.
- The student must not normally wait for supervisor/admin action after completing a StudyLoad.
- Bexauri should prepare the next visible StudyLoad automatically when safe.
- Supervisor remains parallel quality control and intervention, not the normal release bottleneck.
- The first MVP mechanism should be small, explicit, auditable, and rule-based, not adaptive AI.

## Current technical flow

Current student flow for content-backed loads:

1. `/now` shows pending StudyLoads for the current open cycle.
2. Student starts a pending StudyLoad through `POST /api/study-loads/[id]/start`.
3. The start endpoint moves the StudyLoad from `pending` to `in_progress` and creates an `in_progress` TutoringSession.
4. The activity page resolves static content by StudyLoad title through `getStudyLoadContent(title)`.
5. Student submits multiple-choice answers through `POST /api/study-loads/[id]/responses`.
6. The responses endpoint validates contentKey, contentVersion, itemKey, and selectedOptionKey against static registered content.
7. Student completes through `POST /api/study-loads/[id]/complete` with self-report.
8. The complete endpoint marks the StudyLoad and active TutoringSession completed, creates a self-report Response, and updates enrollment lastActivityAt.
9. No next StudyLoad is currently created.
10. `/now` shows pending, in_progress, and completed loads for the current open cycle. If no active loads exist and completed history exists, it shows `Actividad registrada` and `Actividades registradas`.

## Completion endpoint audit

Current endpoint location:

- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`

Current behavior:

- Requires authenticated session through `getServerSession(authOptions)`.
- Uses provisional ownership linkage: `User.email == Student.email` through the StudyLoad learningCycle enrollment student.
- Requires enrollment status `active`.
- Requires enrollment `currentContinuityState` equal to `normal`.
- Requires LearningCycle status `open`.
- Requires StudyLoad status `in_progress`.
- Requires exactly one `in_progress` TutoringSession for the StudyLoad.
- Validates self-report against the closed server-side list.
- Runs a Prisma transaction.
- Re-reads StudyLoad and session state inside the transaction.
- Updates StudyLoad status to `completed`.
- Updates the active TutoringSession to `completed` and sets completedAt.
- Creates one Response row with `responseType='answer'` and the self-report string in `content`.
- Updates StudentProgramInstance `lastActivityAt`.
- Returns the updated StudyLoad/session/response summary.

Explicit current non-behavior:

- No CycleDecision creation.
- No CycleEvaluation creation.
- No ContinuitySignal creation.
- No cycle close.
- No second StudyLoad generation.
- No scoring, skill linkage, or mastery claim on the self-report Response.

Completion does not currently know whether the StudyLoad is content-backed. It does not import `getStudyLoadContent`, does not select StudyLoad title in its preload, and does not inspect submitted `mc_submission` content.

## Evidence/self-report audit

Self-report evidence:

- Stored in `Response` with `responseType='answer'`.
- Attached to the active TutoringSession.
- Stored as plain string content.
- Created by the complete endpoint.

Multiple-choice evidence:

- Stored by `nextjs_space/app/api/study-loads/[id]/responses/route.ts`.
- Stored in `Response` with `responseType='mc_submission'`.
- Replaces an existing `mc_submission` for the active TutoringSession when resubmitted.
- Content is JSON with `kind`, `schemaVersion`, `contentKey`, `contentVersion`, `studyLoadId`, `submittedAt`, `answers`, and `summary`.
- Validates content by StudyLoad title first, then validates request `contentKey` and `contentVersion` against the registered content.
- Validates item keys and option labels against the registered content items.

Completion currently does not require an existing `mc_submission`. That preserves legacy/no-content fallback behavior, but MVP-FLOW-4-D should only auto-create a next StudyLoad when the completed load is content-backed.

## Content registry audit

Current file:

- `nextjs_space/lib/study-load-content.ts`

Current content model:

- `StudyLoadContent` has `contentKey`, `contentVersion`, `title`, `program`, `topic`, `estimatedMinutes`, `instructions`, `items`, and `currentLimitationNotice`.
- `StudyLoadItem` has stable `key`, `stem`, `options`, and optional `correctOptionKey`.
- StudyLoad database rows do not store `contentKey`; persisted rows store `title`.

Existing helpers:

- `getStudyLoadContent(title: string): StudyLoadContent | undefined`
- `getStudyLoadContentByKey(contentKey: string): StudyLoadContent | undefined`

Current PAES_M1 registered contentKeys observed:

- `paes_m1_linear_equations_basic`
- `paes_m1_linear_equations_word_problems`
- `paes_m1_linear_equations_reinforcement`
- `paes_m1_linear_functions_basic`
- `paes_m1_balanced_entry_initial`

Readiness implication:

- MVP-FLOW-4-D can resolve current content through `getStudyLoadContent(load.title)`.
- It can resolve the next content through `getStudyLoadContentByKey(nextContentKey)`.
- The future implementation should not use registry object ordering or display title ordering as the source of truth.

## First StudyLoad creation pattern audit

Current file:

- `nextjs_space/app/api/instances/route.ts`

Current MVP-FLOW-2 first-load creation pattern:

- Admin creates a StudentProgramInstance through `POST /api/instances`.
- For eligible PAES_M1 active normal enrollments without currentCycleId, it runs one Prisma transaction.
- The transaction creates:
  - StudentProgramInstance
  - LearningCycle cycleNumber 1 with status `open`
  - CycleSnapshot with snapshotType `cycle_open`
  - StudyLoad titled `PAES M1 - Entrada balanceada inicial` with loadType `practice` and status `pending`
  - StudentProgramInstance update setting currentCycleId and lastActivityAt

Reusable parts:

- StudyLoad creation shape: `learningCycleId`, `title`, `loadType: 'practice'`, `status: 'pending'`.
- Transactional write pattern.
- Same current open cycle can hold multiple StudyLoads.

Parts not reusable directly:

- MVP-FLOW-4-D should not create a new StudentProgramInstance.
- MVP-FLOW-4-D should not create a new LearningCycle.
- MVP-FLOW-4-D should not create CycleSnapshot as part of minimal continuity.
- MVP-FLOW-4-D should not update currentCycleId.

## Recommended future continuity service location

Recommended new file for MVP-FLOW-4-D:

- `nextjs_space/lib/study-load-continuity.ts`

Recommended exported function name:

- `prepareNextStudyLoadAfterCompletion`

Reason:

- Keeps sequencing and idempotency out of the route file.
- Lets the complete endpoint remain the trigger while the service owns progression lookup and guardrails.
- Keeps future testing and review focused on a small rule-based module.

## Recommended future service contract

Recommended TypeScript-level contract for MVP-FLOW-4-D:

```ts
export type NextStudyLoadContinuityOutcome =
  | { status: 'created'; studyLoadId: string; contentKey: string }
  | { status: 'skipped_existing'; studyLoadId: string; contentKey: string }
  | { status: 'not_content_backed' }
  | { status: 'end_of_sequence'; contentKey: string }
  | { status: 'missing_content'; contentKey: string }
  | { status: 'paused'; reason: string }

export async function prepareNextStudyLoadAfterCompletion(args: {
  tx: Prisma.TransactionClient
  completedStudyLoadId: string
  completedStudyLoadTitle: string
  learningCycleId: string
  enrollmentId: string
  programCode: string
}): Promise<NextStudyLoadContinuityOutcome>
```

Recommended behavior:

- Resolve current content by `completedStudyLoadTitle`.
- If no content exists, return `not_content_backed` and do nothing.
- Resolve next contentKey through explicit progression map by `programCode` and current contentKey.
- If no map entry exists, return `end_of_sequence` and do nothing.
- Resolve next content through `getStudyLoadContentByKey(nextContentKey)`.
- If no content exists, return `missing_content` and do nothing.
- Verify next content program matches `programCode`.
- Check for an existing StudyLoad in the same learningCycle with the next content title.
- If one exists, return `skipped_existing` and do not create another.
- Otherwise create one pending StudyLoad with `loadType: 'practice'`, next content title, and same learningCycleId.

The complete endpoint can ignore the outcome in the response for MVP-FLOW-4-D or include it only if explicitly scoped. The safer first implementation is to keep the student-facing API response shape stable unless a phase explicitly changes it.

## Recommended first PAES_M1 progression map

Recommended minimal map shape:

```ts
const NEXT_STUDYLOAD_BY_PROGRAM_AND_CONTENT_KEY: Record<string, Record<string, string>> = {
  PAES_M1: {
    paes_m1_balanced_entry_initial: 'paes_m1_linear_equations_basic',
  },
}
```

First safe PAES_M1 progression pair:

- From: `paes_m1_balanced_entry_initial`
- To: `paes_m1_linear_equations_basic`

Reason:

- The first source content is the canonical first StudyLoad created by MVP-FLOW-2.
- The target content already exists in the static registry.
- The target is a conservative basic equations activity, not an adaptive claim.
- The pair is small enough to validate locally without inventing a larger roadmap.

Do not add broader PAES_M1 progression in MVP-FLOW-4-D unless explicitly scoped.

## Idempotency and duplicate prevention plan

MVP-FLOW-4-D should prevent duplicates by checking inside the same transaction before creating a next StudyLoad.

Recommended duplicate check:

- Same `learningCycleId`.
- Same resolved next content title.
- Status in `pending`, `in_progress`, or `completed`.

Rationale:

- StudyLoad rows currently do not persist contentKey.
- After resolving next content by contentKey, title is the only persisted content identity available without schema changes.
- Checking completed too prevents repeated completion retries from creating another copy of a next activity that already existed and may have been worked later.

Recommended outcome when duplicate exists:

- Return `skipped_existing` with the existing StudyLoad id and next contentKey.
- Do not create another row.

## Transaction boundary recommendation

Recommended MVP-FLOW-4-D transaction boundary:

- Call the continuity service inside the existing completion transaction after the StudyLoad/session/self-report/enrollment timestamp writes have succeeded.
- Pass the transaction client to the service.
- Use the service for expected non-creation outcomes without throwing.
- Throw only for unexpected operational errors.

Reason:

- The transaction already re-checks load/session state and prevents race-prone completion writes.
- Creating the next pending StudyLoad in the same transaction makes completion and next-load readiness consistent.
- Expected fallbacks such as `not_content_backed`, `end_of_sequence`, or `missing_content` should not roll back completion.

Open design caveat for MVP-FLOW-4-D:

- If an unexpected DB error happens during next-load creation, the transaction would roll back completion unless handled separately. MVP-FLOW-4-D should decide whether unexpected continuity-service errors should fail completion or be caught and converted to a non-blocking operational outcome. Product preference is that completion should not fail because next-load preparation failed, but this may require careful error handling and logging.

## Fallback reason taxonomy

Recommended structured non-creation reasons:

- `not_content_backed`: completed StudyLoad has no registered content by title. Preserve legacy fallback behavior.
- `end_of_sequence`: current contentKey is valid, but the progression map has no next entry.
- `missing_content`: map points to next contentKey, but registry lookup by key fails.
- `program_mismatch`: next content exists but belongs to a different program.
- `skipped_existing`: next StudyLoad already exists in the same learning context.
- `paused`: future safety/pedagogical stop reason, not required for first pair unless explicitly scoped.
- `operational_error`: unexpected database or runtime error.

Student-facing behavior should stay calm and avoid exposing internal reason strings. Admin/supervisor surfaces can later expose reason classes.

## /now expected behavior after future implementation

When a next pending StudyLoad is created:

- `/now` will naturally include it in `pendingLoads` because it queries all StudyLoads for the current open cycle with status in `pending`, `in_progress`, or `completed`.
- `/now` should show `Cargas pendientes (1)` or the relevant pending count.
- `/now` should show the new StudyLoad title.
- If the new title has registered content, `/now` should show `Ver actividad`.
- `/now` should show `Empezar` for the pending load.
- Completed history should still show the previous load under `Actividades registradas`.
- `showCaughtUpMessage` should be false because `pendingLoads.length > 0`.

When no next StudyLoad is created:

- Existing `/now` fallback remains: completed history plus `Actividad registrada` waiting state.
- This is acceptable for end-of-sequence, missing content, no-content legacy loads, safety/pedagogical stop, or operational error.

## Files likely needed for MVP-FLOW-4-D

Likely files to touch:

- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`
  - Import and call the continuity service after successful completion inside or immediately around the existing transaction.
  - Select title, learningCycle enrollment program code, and ids needed by the service.

- `nextjs_space/lib/study-load-continuity.ts`
  - New service file containing progression map, service contract, guardrails, and StudyLoad creation logic.

Possible but not preferred for first implementation:

- `nextjs_space/lib/study-load-content.ts`
  - Only if MVP-FLOW-4-D needs an exported registry helper that does not exist today. Current helpers appear sufficient: `getStudyLoadContent` and `getStudyLoadContentByKey`.

## Files explicitly out of scope for MVP-FLOW-4-D

Should not be touched in MVP-FLOW-4-D unless a new scope explicitly says otherwise:

- `nextjs_space/prisma/schema.prisma`
- `nextjs_space/lib/study-load-content.ts` registry entries, questions, answers, titles, options, or content versions
- `nextjs_space/app/api/study-loads/[id]/responses/route.ts`
- `nextjs_space/app/api/study-loads/[id]/start/route.ts`
- `nextjs_space/app/api/instances/route.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- UI components
- seed files
- tests, unless a later implementation phase explicitly includes them

## Local validation plan for MVP-FLOW-4-D

Manual/local validation after implementation should include:

1. Start from a clean local dev server state.
2. Create or reuse a fresh local PAES_M1 student fixture.
3. Enroll the student in PAES_M1.
4. Confirm first StudyLoad is `PAES M1 - Entrada balanceada inicial` and pending.
5. Log in as the student.
6. Open `/now` and confirm first load shows `Ver actividad` and `Empezar`.
7. Press `Empezar`.
8. Open `Ver actividad`.
9. Submit answers.
10. Select a valid self-report.
11. Finish the activity inside the activity page.
12. Confirm completion succeeds.
13. Refresh `/now`.
14. Confirm the completed first load appears under `Actividades registradas`.
15. Confirm a new pending StudyLoad appears: `PAES M1 - Ecuaciones lineales basicas` or the registered display equivalent.
16. Confirm the new pending load shows `Ver actividad` and `Empezar`.
17. Confirm `/now` does not show indefinite waiting when the next load was created.
18. Retry or refresh completion path enough to confirm no duplicate next StudyLoad is created.
19. Validate no CycleDecision, CycleEvaluation, ContinuitySignal, cycle close, or next LearningCycle was created.
20. Run `npm run build` only in the implementation validation phase, not in this audit phase.

## Risks and mitigations

Risk: Duplicate next StudyLoads on retry or double-click.

Mitigation: Duplicate check inside the transaction by learningCycleId and resolved next content title across pending, in_progress, and completed statuses.

Risk: Completion fails because next-load creation fails.

Mitigation: MVP-FLOW-4-D must decide whether unexpected service errors should be caught as operational outcomes. Expected non-creation states must not throw.

Risk: Implicit adaptive claims.

Mitigation: Use explicit progression map and copy that describes planned sequence, not mastery, AI personalization, or optimal adaptation.

Risk: Title-based persistence is brittle.

Mitigation: Use contentKey as source of truth in the service and only use title after resolving registered content. Longer term, consider schema support for contentKey if product needs durable content identity.

Risk: Touching cycle/decision machinery too early.

Mitigation: MVP-FLOW-4-D must not auto-close LearningCycle, create CycleDecision, create CycleEvaluation, or create ContinuitySignal.

Risk: No-content legacy loads regress.

Mitigation: Service returns `not_content_backed` and does nothing. Existing fallback `Terminar` behavior remains.

## Final readiness verdict

Ready for a narrow MVP-FLOW-4-D implementation with constraints.

Recommended MVP-FLOW-4-D scope:

- Add `nextjs_space/lib/study-load-continuity.ts`.
- Add `prepareNextStudyLoadAfterCompletion`.
- Add the first PAES_M1 progression pair only: `paes_m1_balanced_entry_initial` to `paes_m1_linear_equations_basic`.
- Call the service from `nextjs_space/app/api/study-loads/[id]/complete/route.ts` after successful completion writes.
- Keep the implementation rule-based, idempotent, content-backed only, same-program only, and non-adaptive.
- Do not touch schema, registry content, UI, start endpoint, responses endpoint, instances endpoint, LearningCycle closure, CycleDecision, CycleEvaluation, or ContinuitySignal.
