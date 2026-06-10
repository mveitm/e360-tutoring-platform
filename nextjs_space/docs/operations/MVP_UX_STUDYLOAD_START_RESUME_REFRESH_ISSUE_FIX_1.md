# MVP-UX-STUDYLOAD-START-RESUME-REFRESH-ISSUE-FIX-1

## Purpose

Implement a narrow fix for the recurring StudyLoad start/resume refresh UX issue diagnosed in:

```text
MVP-UX-STUDYLOAD-START-RESUME-REFRESH-ISSUE-DIAGNOSIS-1
```

The goal is to make the UI revalidate after a successful `Comenzar` action and prevent confusing second clicks while preserving server-side guards.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = f7e477e80512ec45f39fe24b25e64ee157308d50
```

Accepted prior commit:

```text
f7e477e MVP-UX-STUDYLOAD: diagnose start resume refresh issue
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: f7e477e80512ec45f39fe24b25e64ee157308d50
git rev-parse origin/main: f7e477e80512ec45f39fe24b25e64ee157308d50
git rev-parse origin/HEAD: f7e477e80512ec45f39fe24b25e64ee157308d50
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before edits.

## Source diagnosis

Source diagnosis result:

```text
STUDYLOAD_START_RESUME_REFRESH_ISSUE_DIAGNOSED_UI_REVALIDATION_GAP
```

Diagnosis summary:

```text
The start API correctly transitions StudyLoad pending -> in_progress.
The StudyLoad viewer renders exercises based on server-read studyLoad.status.
StartLoadButton previously used same-route router.push after successful start.
It did not call router.refresh and did not hold local started state.
When the Server Component payload stayed stale as pending, Comenzar remained visible and a second click hit the duplicate-start guard.
```

## Target files

Code target modified:

```text
nextjs_space/app/now/_components/start-load-button.tsx
```

Documentation targets modified:

```text
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_UX_STUDYLOAD_START_RESUME_REFRESH_ISSUE_FIX_1.md
```

No API route was modified. The duplicate-start server guard remains unchanged.

## Fix implemented

Implemented in `StartLoadButton`:

- imported `usePathname`;
- added local `hasStarted` state;
- included `hasStarted` in the disabled/busy condition;
- after a successful start, set `hasStarted` to `true`;
- if already on `/now/study-loads/[id]`, call `router.refresh()` instead of relying on same-route `router.push`;
- if starting from another route such as `/now`, keep navigation to `/now/study-loads/[id]`;
- show a started label while waiting for the refreshed Server Component payload;
- preserve existing error handling and reset local started state only for network/catch failures.

No server-side lifecycle semantics were changed.

## Expected behavior after fix

Expected behavior:

```text
First click on Comenzar still calls the existing start API.
Server still validates pending/in_progress/completed guards.
After successful start on the StudyLoad page, the client calls router.refresh().
The Server Component should re-read status as in_progress.
The exercise form should render without manual F5.
The button is disabled immediately after successful start, preventing confusing second clicks.
```

From `/now`, the button still opens the target StudyLoad route after successful start.

## Scope safety

Scope remained limited to start/resume UI revalidation.

Not changed:

- No schema/DB/Prisma files.
- No DB mutation.
- No API route changes.
- No route-order or continuity changes.
- No registry/content changes.
- No authoredFeedback changes.
- No seed scripts.
- No fixtures.
- No package files.
- No migration files.
- No production/staging.
- No browser automation.
- No API-only tests.
- No secrets printed.

## Validation

Validation commands:

```text
git diff --check
git status --short
git log --oneline --decorate --graph -8
npm.cmd --prefix nextjs_space run build
```

Validation result to be finalized before commit.

Final validation:

```text
git diff --check: passed
git status --short: only authorized/scope-approved files changed before commit
npm.cmd --prefix nextjs_space run build: passed
```

## Result

```text
STUDYLOAD_START_RESUME_REFRESH_FIX_IMPLEMENTED
```

## Next recommended phase

Recommended next phase:

```text
MVP-UX-STUDYLOAD-START-RESUME-REFRESH-ISSUE-HUMAN-VERIFY-1
```

Purpose:

```text
Human local/dev verification that pressing Comenzar now shows exercises without F5, disables or replaces the start button, and preserves normal completion behavior.
```
