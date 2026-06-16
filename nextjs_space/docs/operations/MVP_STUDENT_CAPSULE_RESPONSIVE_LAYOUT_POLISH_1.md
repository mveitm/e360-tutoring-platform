# MVP-STUDENT-CAPSULE-RESPONSIVE-LAYOUT-POLISH-1

## Phase

```text
MVP-STUDENT-CAPSULE-RESPONSIVE-LAYOUT-POLISH-1
```

## Baseline before

Expected and confirmed baseline:

```text
HEAD = origin/main = origin/HEAD = ffc19b742eb9b11d44c92ff260bda40eb5459ec2
working tree clean
```

Preflight result:

```text
working tree: clean
HEAD: ffc19b742eb9b11d44c92ff260bda40eb5459ec2
origin/main: ffc19b742eb9b11d44c92ff260bda40eb5459ec2
origin/HEAD: ffc19b742eb9b11d44c92ff260bda40eb5459ec2
```

Previous retry blocker:

```text
BLOCKED_PREFLIGHT_WORKING_TREE_NOT_CLEAN
```

Resolution:

```text
The untracked local logobexauri_v1.png file was removed from the repository working tree by the human before this retry.
```

## Context Gate

Read before editing:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_STUDENT_TUTORING_UI_STRUCTURE_POLISH_HUMAN_SMOKE_1.md`
- `nextjs_space/docs/operations/MVP_STUDENT_TUTORING_UI_STRUCTURE_POLISH_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_POST_COMPLETION_NAVIGATION_FIX_2_HUMAN_SMOKE_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_HUMAN_UI_SMOKE_RESUME_1.md`

## Files inspected

- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `nextjs_space/app/now/_components/start-load-button.tsx`
- `nextjs_space/app/now/_components/complete-load-button.tsx`
- `nextjs_space/components`

Searches covered:

```text
study-load
capsule
feedback
autorreporte
review
revisión
max-w
container
grid
flex
w-full
lg:
xl:
2xl:
logobexauri
logobexauri_v1
```

## Files changed

- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_STUDENT_CAPSULE_RESPONSIVE_LAYOUT_POLISH_1.md`

## Responsive layout issue summary

The capsule viewer used a narrow page shell:

```text
max-w-3xl
```

That preserved mobile well but left tablet/PC surfaces underused for M1/M2 capsules. The answer/review question list also stayed single-column at all viewport sizes.

## Tablet/desktop layout changes

Shell:

- Increased the capsule shell from `max-w-3xl` to `max-w-6xl`.
- Added desktop padding at `lg:px-8`.
- Added slightly more scroll-area right padding at `lg:pr-2`.

Question/review layout:

- Changed read-only completed/review questions from single-column spacing to `grid gap-4 lg:grid-cols-2`.
- Changed active answering questions from single-column spacing to `grid gap-4 lg:grid-cols-2`.

This lets tablet/PC use horizontal room while preserving card boundaries and readable line lengths.

## Mobile preservation notes

- Base/mobile layout remains single-column because the grid only becomes two-column at `lg`.
- Existing mobile padding, sticky progress bar, answer buttons, feedback, autoreporte and post-completion actions were not restructured.
- Buttons remain accessible and stacked where existing mobile classes require it.

## M1/M2 applicability

M1 and M2 capsules both use the shared route and form:

```text
nextjs_space/app/now/study-loads/[id]/page.tsx
nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx
```

The fix is therefore general to capsule UI and is not a PAES_M2 special case.

## Preserved behaviors

- Capsule opening flow preserved.
- Answer selection preserved.
- Response submission preserved.
- Brief feedback preserved.
- Complete feedback / step-by-step review preserved.
- Autorreporte preserved.
- Finalized capsule review preserved.
- `Volver a tutoría` preserved.
- `Ir Dashboard` preserved.
- `Ir a la siguiente cápsula` preserved.
- Post-completion navigation behavior was not changed.

## Logo asset note

```text
NOT_INTEGRATED_IN_THIS_PHASE
```

The new local `logobexauri_v1.png` asset was not moved, versioned, modified or integrated. Branding/logo work remains a separate follow-up.

## Validation

Commands executed:

```text
git diff --check
.\nextjs_space\node_modules\.bin\tsc.cmd --noEmit --pretty false --project nextjs_space\tsconfig.json
npm.cmd --prefix nextjs_space run build
```

Validation result:

```text
git diff --check: passed
TypeScript noEmit with explicit project: passed
Next build: passed
```

Build output included:

```text
/now/study-loads/[id]
/study/paes-m1
/study/paes-m2
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
- No base de datos command was executed.

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
STUDENT_CAPSULE_RESPONSIVE_LAYOUT_POLISHED
```

## Follow-up/blocker

```text
MVP-STUDENT-CAPSULE-RESPONSIVE-LAYOUT-HUMAN-SMOKE-1
```

Potential later branding follow-up:

```text
MVP-BRANDING-LOGO-ASSET-INTEGRATION-1
```
