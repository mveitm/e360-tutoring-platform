# MVP-SALES-PILOT-M2-C01-POST-COMPLETION-NAVIGATION-FIX-1

## Phase

```text
MVP-SALES-PILOT-M2-C01-POST-COMPLETION-NAVIGATION-FIX-1
```

## Baseline before

Expected and confirmed baseline:

```text
HEAD = origin/main = origin/HEAD = ce3c18a6a075ac104b7b28fb3d1341f9d00213d7
working tree clean
```

Preflight commands executed:

```text
git status --short
git rev-parse HEAD
git log --oneline --decorate -n 5
```

Preflight result:

```text
working tree: clean
HEAD: ce3c18a6a075ac104b7b28fb3d1341f9d00213d7
origin/main: ce3c18a6a075ac104b7b28fb3d1341f9d00213d7
origin/HEAD: ce3c18a6a075ac104b7b28fb3d1341f9d00213d7
```

## Context Gate

Read before editing:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_HUMAN_UI_SMOKE_RESUME_1.md`
- `nextjs_space/docs/operations/MVP_STUDENT_DASHBOARD_MULTI_TUTORING_UI_POLISH_2_HUMAN_SMOKE_1.md`
- `nextjs_space/docs/operations/MVP_STUDENT_DASHBOARD_MULTI_TUTORING_UI_IMPLEMENT_1.md`

## Files inspected

- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`
- `nextjs_space/package.json`

Static searches covered:

```text
Volver a tutoría
Ir Dashboard
Ir DB
capsule finalized / finalizada
completed
autorreporte
StudyLoad
programCode
PAES_M1
PAES_M2
now
```

## Files changed

- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_POST_COMPLETION_NAVIGATION_FIX_1.md`

## Bug summary

After completing M2-C01, the finalized capsule UI remained available for review as expected. However, the `Volver a tutoría` action returned to the PAES_M1 study route instead of returning to the PAES_M2 tutoring context for the completed M2-C01 capsule.

The finalized capsule UI also lacked the requested `Ir a la siguiente cápsula` action next to `Volver a tutoría` and `Ir Dashboard`.

## Root cause summary

The capsule viewer used a fixed `/study/paes-m1` target in several capsule navigation surfaces:

- header/back navigation;
- footer capsule navigation;
- finalized capsule action block rendered by the server page;
- immediate client-side finalized block shown after self-report completion;
- fallback link when capsule content is unavailable.

That was valid only for PAES_M1. For PAES_M2 it caused post-completion navigation to return to ST M1.

## Navigation fix summary

Implemented contextual source tutoring navigation in:

```text
nextjs_space/app/now/study-loads/[id]/page.tsx
nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx
```

The destination is now derived from the current StudyLoad ownership chain:

```text
StudyLoad -> LearningCycle -> StudentProgramInstance -> Program.code
```

Routing rule:

```text
PAES_M1 -> /study/paes-m1
PAES_M2 -> /now#tutorias
PAES_L1 -> /now#tutorias
other/future program codes -> /now#tutorias
```

This removes the accidental M1 fallback for PAES_M2 while preserving the existing dedicated PAES_M1 route.

The capsule header label was also changed from fixed PAES_M1 copy to the actual `enrollment.program.code`.

## Next capsule button summary

Added `Ir a la siguiente cápsula` in the post-completion action zone:

- server-rendered completed capsule UI;
- immediate client-side `completeSuccess` UI after self-report submission.

The button uses only existing read-only page data. The server page looks for an existing same-cycle StudyLoad with status:

```text
pending
in_progress
```

and requires that the load is content-backed by the static StudyLoad registry before enabling navigation.

## Fallback/disabled behavior if no next capsule exists

If no existing, reachable, content-backed next StudyLoad is found, `Ir a la siguiente cápsula` is shown disabled.

This was chosen because:

- it satisfies the post-completion UI expectation by making the action visible in the same action group;
- it avoids implying that a non-existing next capsule can be opened;
- it performs no StudyLoad creation;
- it performs no DB mutation;
- it keeps the student in the finalized capsule review state.

No endpoint, continuity rule, seed, fixture or DB preparation was changed in this phase.

## Structure preservation notes

- The finalized capsule review state is preserved.
- Brief feedback remains visible where already rendered.
- Complete feedback / step-by-step review remains available.
- Read-only completed answers remain available.
- `Ir Dashboard` remains available.
- The accepted dashboard multi-tutoring structure was not reopened or changed.
- The completion endpoint and continuity materialization behavior were not changed.

## Validation

Commands executed:

```text
git diff --check
.\node_modules\.bin\tsc.cmd --noEmit --pretty false
npm.cmd --prefix nextjs_space run build
```

Validation result:

```text
git diff --check: passed
TypeScript noEmit: passed
Next build: passed
```

Secret-pattern scan over changed files:

```text
passed
```

No browser automation or DB command was executed.

## Security notes

- No `.env` contents were printed.
- No `DATABASE_URL` was printed.
- No DB URL, DB host or connection string was printed.
- No password, token, cookie, private key, credential or secret was requested or recorded.
- No production or staging target was touched.

## DB execution by Codex

```text
NOT_EXECUTED_BY_CODEX
```

## DB mutation by Codex

```text
NOT_EXECUTED_BY_CODEX
```

## Schema changes

```text
NOT_PERFORMED
```

## Pedagogical capsule content changes

```text
NOT_PERFORMED
```

## Payment/subscription changes

```text
NOT_PERFORMED
```

## StudentAccess changes

```text
NOT_PERFORMED
```

## Result

```text
M2_C01_POST_COMPLETION_NAVIGATION_FIXED
```

## Follow-up/blocker

```text
MVP-SALES-PILOT-M2-C01-POST-COMPLETION-NAVIGATION-HUMAN-SMOKE-1
```
