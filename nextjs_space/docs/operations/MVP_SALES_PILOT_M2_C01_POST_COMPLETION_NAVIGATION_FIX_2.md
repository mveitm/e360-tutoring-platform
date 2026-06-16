# MVP-SALES-PILOT-M2-C01-POST-COMPLETION-NAVIGATION-FIX-2

## Phase

```text
MVP-SALES-PILOT-M2-C01-POST-COMPLETION-NAVIGATION-FIX-2
```

## Baseline before

Expected and confirmed baseline:

```text
HEAD = origin/main = origin/HEAD = c4ea304b8994c91fbb9ac35f73927b00795f3189
working tree clean
```

Preflight result:

```text
working tree: clean
HEAD: c4ea304b8994c91fbb9ac35f73927b00795f3189
origin/main: c4ea304b8994c91fbb9ac35f73927b00795f3189
origin/HEAD: c4ea304b8994c91fbb9ac35f73927b00795f3189
```

## Context Gate

Read before editing:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_POST_COMPLETION_NAVIGATION_HUMAN_SMOKE_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_POST_COMPLETION_NAVIGATION_FIX_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_HUMAN_UI_SMOKE_RESUME_1.md`

## Files inspected

- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/study/paes-m1/page.tsx`
- `nextjs_space/lib/study-load-content.ts`

Searches covered:

```text
Volver a tutoría
Ir Dashboard
Ir a la siguiente cápsula
completed
finalizada
autorreporte
programCode
PAES_M1
PAES_M2
PAES_L1
dashboard
/now
study-loads
/study/paes
```

## Files changed

- `nextjs_space/lib/tutoring-routes.ts`
- `nextjs_space/app/study/_components/program-study-page.tsx`
- `nextjs_space/app/study/paes-m2/page.tsx`
- `nextjs_space/app/study/paes-l1/page.tsx`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_POST_COMPLETION_NAVIGATION_FIX_2.md`

## Bug summary

Fix 1 replaced the incorrect PAES_M1 destination with `/now#tutorias` for PAES_M2. Human smoke confirmed this was still not acceptable because the product criterion requires `Volver a tutoría` from a completed M2 capsule to return to ST M2, not to DB/dashboard.

## Root cause summary

The app only had a dedicated study tutoring route for PAES_M1:

```text
/study/paes-m1
```

PAES_M2 and PAES_L1 had active dashboard cards and StudyLoad viewer support, but no dedicated ST route. Therefore Fix 1 had used dashboard anchoring as a safe fallback. The human smoke clarified that dashboard anchoring is not semantically equivalent to returning to the source tutoring.

## Navigation fix summary

Added explicit read-only ST routes for M2 and L1 using the same route family as M1:

```text
/study/paes-m2
/study/paes-l1
```

Added a shared read-only `ProgramStudyPage` for non-M1 tutoring contexts. It reads the current student's active enrollment, latest open cycle and visible StudyLoads, then renders a tutoría context page without creating or mutating any data.

Updated the capsule viewer so `Volver a tutoría` derives its target through a central helper:

```text
PAES_M1 -> /study/paes-m1
PAES_M2 -> /study/paes-m2
PAES_L1 -> /study/paes-l1
unknown future code -> /now#tutorias
```

Updated the `/now` active tutoring action fallback to use the same helper when no specific actionable StudyLoad is selected.

## Return-to-tutoring destination derivation

The StudyLoad viewer still derives origin from the owned StudyLoad chain:

```text
StudyLoad -> LearningCycle -> StudentProgramInstance -> Program.code
```

That `Program.code` is passed to:

```text
getStudyProgramHref(programCode)
```

For M2-C01, this resolves to:

```text
/study/paes-m2
```

This removes dashboard as the M2 return target.

## Button length/layout adjustment summary

Standardized the post-completion action buttons in:

- server-rendered finalized capsule UI;
- immediate client-side `completeSuccess` UI after self-report submission.

The action group now uses compact flex wrapping on desktop and full-width buttons on mobile:

```text
mobile: one button per row, full width
desktop: compact, consistent min/max button widths
```

The action labels are preserved:

```text
Volver a tutoría
Ir a la siguiente cápsula
Ir Dashboard
```

## Preserved behaviors

- Completed capsule remains reviewable.
- Brief feedback remains visible where already rendered.
- Complete feedback / step-by-step review remains accessible.
- Submitted self-report does not block review.
- `Ir Dashboard` remains available.
- `Ir a la siguiente cápsula` remains available and safe; it does not create a StudyLoad.
- Dashboard multi-tutoring structure was not reopened.
- No completion endpoint or continuity mutation behavior was changed.

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

Build output includes the new routes:

```text
/study/paes-m2
/study/paes-l1
```

Secret-pattern scan over changed files:

```text
passed
```

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
M2_C01_POST_COMPLETION_NAVIGATION_FIX_2_COMPLETED
```

## Follow-up/blocker

```text
MVP-SALES-PILOT-M2-C01-POST-COMPLETION-NAVIGATION-FIX-2-HUMAN-SMOKE-1
```
