# MVP-UX-STUDYLOAD-START-RESUME-REFRESH-ISSUE-DIAGNOSIS-1

## Purpose

Diagnose the recurring StudyLoad start/resume UX issue:

```text
After pressing "Comenzar", some capsules do not show exercises immediately and require F5 / refresh.
The "Comenzar" button may remain active.
A second click may show "Esta capsula ya fue iniciada".
```

This phase is documentation/read-only. It does not implement the fix.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 3b4d224d8e091067ea5a487d20f6d05a359c1be5
```

Accepted prior commit:

```text
3b4d224 MVP-SALES-PILOT-PEDAGOGY-M1: close C06 II UI smoke
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 3b4d224d8e091067ea5a487d20f6d05a359c1be5
git rev-parse origin/main: 3b4d224d8e091067ea5a487d20f6d05a359c1be5
git rev-parse origin/HEAD: 3b4d224d8e091067ea5a487d20f6d05a359c1be5
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Human observations

Recurring human observations:

```text
M1-C04 - Refuerzo de ecuaciones lineales:
- pressing Comenzar showed "Esta capsula ya fue iniciada";
- questions did not show until refresh;
- after refresh, the flow could be completed.

M1-C05 - Funciones lineales basicas I:
- all review points passed OK;
- after pressing Comenzar, F5 / refresh was required to show exercises.

M1-C06 - Funciones lineales basicas II:
- Ver capsula showed the capsule but initially without exercises;
- Comenzar did not open the exercise list;
- F5 / refresh was required;
- Comenzar stayed active;
- a second click showed "Esta capsula ya fue iniciada";
- after refresh, all other verification points passed OK;
- capsule finalized;
- next visible capsule: Lectura de tablas y graficos.
```

## Affected capsules

Known affected capsules:

```text
M1-C04 - Refuerzo de ecuaciones lineales
M1-C05 - Funciones lineales basicas I
M1-C06 - Funciones lineales basicas II
```

This pattern now spans multiple content-backed StudyLoads, which makes it a cross-capsule UX/lifecycle issue rather than a content-specific problem.

## Expected behavior

Expected start behavior:

- First click on `Comenzar` transitions the StudyLoad from `pending` to `in_progress`.
- The UI immediately renders the exercise form without requiring F5 / refresh.
- The `Comenzar` button disappears, is disabled, or changes to a clear started state.
- A second click should not be possible if the server already accepted the first start.
- Server-side guards should remain in place for ownership, cycle state, enrollment state, and duplicate starts.

## Static code diagnosis

Relevant files inspected statically:

```text
nextjs_space/app/now/_components/start-load-button.tsx
nextjs_space/app/api/study-loads/[id]/start/route.ts
nextjs_space/app/now/study-loads/[id]/page.tsx
nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx
nextjs_space/app/now/_components/complete-load-button.tsx
nextjs_space/app/now/page.tsx
```

Button render:

```text
StudyLoad viewer renders CapsuleStartCta.
CapsuleStartCta renders StartLoadButton when status is pending or released.
For other non-completed statuses, it renders an anchor labeled Comenzar that points to #capsula-contenido.
```

Start action:

```text
StartLoadButton POSTs to /api/study-loads/[id]/start.
The start route validates ownership/state and updates StudyLoad status from pending to in_progress.
The start route creates an in_progress TutoringSession.
The start route returns success after DB mutation.
```

Server guard source of duplicate-start message:

```text
If the load is not pending, the start route returns 409 with "Esta carga ya fue iniciada".
The transaction also re-checks fresh.status !== pending and throws the same message.
```

UI render dependency:

```text
StudyLoadViewerPage reads studyLoad.status in a Server Component.
isAnswering = studyLoad.status === 'in_progress'.
The header/start card is hidden only when isAnswering is true.
StudyLoadAnswerForm receives studyLoadStatus from the server-read status.
The form only enables answer behavior when studyLoadStatus is in_progress.
```

Refresh/revalidation gap:

```text
After successful start, StartLoadButton calls router.push(`/now/study-loads/${loadId}`).
It does not call router.refresh().
It does not update local client state to started/in_progress.
If the user is already on /now/study-loads/[id], router.push targets the same route and may leave the current Server Component payload stale.
```

Contrast with completion paths:

```text
complete-load-button.tsx calls router.refresh() after successful completion.
StudyLoadAnswerForm calls router.refresh() after successful finalization.
```

This contrast supports that start has a revalidation gap while completion already refreshes the Server Component state.

## Probable root cause

Probable root cause:

```text
STUDYLOAD_START_RESUME_REFRESH_ISSUE_DIAGNOSED_UI_REVALIDATION_GAP
```

Detailed diagnosis:

```text
A) Server API correctly changes StudyLoad state from pending to in_progress.
B) The client does not force a fresh Server Component read after successful start.
C) The viewer keeps rendering the pre-start pending payload.
D) Because pending payload remains visible, the Comenzar button can remain clickable.
E) A second click reaches the server after the DB state is already in_progress.
F) The server guard correctly rejects the second start as already initiated.
```

Secondary contributing factors:

- `StartLoadButton` disables itself only while `isPosting` or transition is pending.
- After the first request finishes, local busy state is reset.
- There is no durable local "started" state that hides/disables the button while waiting for server revalidation.
- Same-route `router.push` is not sufficient to guarantee the updated StudyLoad status is reflected immediately.

## UX/product impact

Impact:

- Does not block learning when the user knows to press F5 / refresh.
- Is workaroundable, but the workaround is not obvious.
- Recurrent across several capsules, so it can affect ordinary StudyLoad starts broadly.
- Can cause double-click/confusion because the button remains visible after a successful start.
- The server guard protects data integrity, but the error message feels like a failure to the student.
- It can increase friction, reduce trust, and induce abandonment if the user does not know to refresh.

Severity:

```text
non-data-loss UX defect
recurrent
should be fixed before continuing to accumulate many more human smokes
```

## Recommended fix scope

Recommended future phase:

```text
MVP-UX-STUDYLOAD-START-RESUME-REFRESH-ISSUE-FIX-1
```

Narrow objective:

- After successful start, refresh/revalidate the current view so the Server Component re-reads the StudyLoad as `in_progress`.
- If the user is already on `/now/study-loads/[id]`, avoid relying only on same-route `router.push`.
- Hide, disable, or replace `Comenzar` after successful start.
- Preserve server-side duplicate-start guards.
- Keep scope limited to start/resume UX and avoid content, DB, schema, continuity, route-order, or authoredFeedback changes.

Likely implementation candidates for future code phase:

```text
nextjs_space/app/now/_components/start-load-button.tsx
nextjs_space/app/now/study-loads/[id]/page.tsx
```

Potential approach:

```text
On successful start:
1. Set a local started state so the button cannot be clicked again.
2. Call router.refresh() after the successful POST.
3. If navigation is still needed from /now, push to /now/study-loads/[id] and ensure refresh after navigation or use a path-aware strategy.
4. Use copy such as "Capsula iniciada" or a disabled started state while the refreshed payload loads.
```

## Stop conditions for future fix

Stop future implementation if:

- Fix requires schema/DB/Prisma changes.
- Fix requires changing StudyLoad lifecycle semantics.
- Fix requires changing content registry, authoredFeedback, route-order, or continuity behavior.
- Fix requires weakening server guards.
- Fix introduces API-only tests or browser automation without explicit authorization in that future phase.
- Fix scope expands into unrelated `/now` redesign or capsule UI redesign.
- The exact start target becomes ambiguous between `/now` card start and direct StudyLoad viewer start.

## Scope safety

This phase was documentation/read-only.

Not performed:

- No code changes.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No route-order or continuity changes.
- No registry changes.
- No authoredFeedback changes.
- No seed scripts.
- No fixtures.
- No DB mutation.
- No browser automation.
- No API-only tests.
- No production/staging.
- No secrets printed.

## Result

```text
STUDYLOAD_START_RESUME_REFRESH_ISSUE_DIAGNOSED_UI_REVALIDATION_GAP
```

## Next recommended phase

Recommended next phase:

```text
MVP-UX-STUDYLOAD-START-RESUME-REFRESH-ISSUE-FIX-1
```

Goal:

```text
Implement the narrow start/resume UX fix so exercises appear immediately after Comenzar, the button cannot be clicked again after successful start, and server-side guards remain intact.
```
