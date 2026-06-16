# MVP-STUDENT-TUTORING-UI-STRUCTURE-ALIGNMENT-1

## Phase

```text
MVP-STUDENT-TUTORING-UI-STRUCTURE-ALIGNMENT-1
```

## Baseline before

Expected and confirmed baseline:

```text
HEAD = origin/main = origin/HEAD = fa36338838cc87b9fcd4a91a9eeae1d804a3ff31
working tree clean
```

Preflight result:

```text
working tree: clean
HEAD: fa36338838cc87b9fcd4a91a9eeae1d804a3ff31
origin/main: fa36338838cc87b9fcd4a91a9eeae1d804a3ff31
origin/HEAD: fa36338838cc87b9fcd4a91a9eeae1d804a3ff31
```

## Context Gate

Read before editing:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_POST_COMPLETION_NAVIGATION_FIX_2_HUMAN_SMOKE_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_POST_COMPLETION_NAVIGATION_FIX_2.md`
- `nextjs_space/docs/operations/MVP_STUDENT_DASHBOARD_MULTI_TUTORING_UI_POLISH_2_HUMAN_SMOKE_1.md`
- `nextjs_space/docs/operations/MVP_STUDENT_DASHBOARD_MULTI_TUTORING_UI_CONTRACT_1.md`

Language note:

```text
In this phase, DB in human observations means dashboard, not database. Database is referenced explicitly as base de datos.
```

## Files inspected

- `nextjs_space/app/now/page.tsx`
- `nextjs_space/lib/tutoring-routes.ts`
- `nextjs_space/app/study/_components/program-study-page.tsx`
- `nextjs_space/app/study/paes-m1/page.tsx`
- `nextjs_space/app/study/paes-m2/page.tsx`
- `nextjs_space/app/study/paes-l1/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`

Searches covered:

```text
Tus Tutorías
Continuar
Entrar
Tutorías Bexauri
PAES_M1
PAES_M2
PAES_L1
Volver a tutoría
Ir Dashboard
Ir a la siguiente cápsula
program-study-page
tutoring-routes
study-loads
```

## Files changed

- `nextjs_space/app/now/page.tsx`
- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_STUDENT_TUTORING_UI_STRUCTURE_ALIGNMENT_1.md`

## Dashboard "Tus Tutorías" button change

Changed the primary action inside dashboard `Tus Tutorías` from:

```text
Continuar
```

to:

```text
Entrar
```

Also adjusted the section copy so the card communicates entry into the tutoring context instead of continuing directly from the dashboard.

## Routing behavior summary

`Tus Tutorías` now resolves each active tutoring card through:

```text
getStudyProgramHref(tutoring.programCode)
```

This produces the current ST routes:

```text
PAES_M1 -> /study/paes-m1
PAES_M2 -> /study/paes-m2
PAES_L1 -> /study/paes-l1
unknown future code -> /now#tutorias
```

The previous dashboard action selected an actionable StudyLoad first and could route directly to:

```text
/now/study-loads/<id>
```

That direct capsule jump was removed from `Tus Tutorías`.

## Tutoring UI structure alignment summary

The ST views now preserve the intended flow:

```text
Dashboard -> Tus Tutorías -> Entrar -> ST program context -> capsule action
```

Capsule entry remains available inside the tutoring context through current capsule cards and completed capsule review cards. `Última actividad de estudio` also still exposes explicit capsule actions, which is outside the `Tus Tutorías` primary program-entry action.

## M1/M2/L1 comparison

PAES_M1:

- Dedicated `/study/paes-m1` page.
- Persistent Bexauri header and dashboard return.
- Clear tutoring identification.
- Status/enrollment action.
- Current capsule card and capsule actions inside the ST page.
- Completed capsule review section.
- Uses M1-specific enrollment and first-capsule creation behavior that predates this phase.

PAES_M2:

- Dedicated `/study/paes-m2` page.
- Shared `ProgramStudyPage`.
- Persistent Bexauri header and dashboard return.
- Clear tutoring identification.
- Active status and cycle/capsule context.
- Current capsule action inside the ST page.
- Read-only access to existing StudyLoads only.

PAES_L1:

- Dedicated `/study/paes-l1` page.
- Shared `ProgramStudyPage`.
- Persistent Bexauri header and dashboard return.
- Clear tutoring identification.
- Active status and cycle/capsule context.
- Current capsule action inside the ST page.
- Read-only access to existing StudyLoads only.

## Known divergences or follow-ups

M1 has a richer and older ST implementation with enrollment and first-capsule creation logic. M2 and L1 use the shared read-only `ProgramStudyPage`. This is acceptable for the current phase because the structural flow is aligned and no new database mutation behavior was introduced.

Potential future follow-up: extract a shared ST layout component across M1/M2/L1 while keeping M1's enrollment/create-capsule actions explicit and isolated.

## Preserved behaviors

- Dashboard multi-tutoring structure remains in place.
- `Tutorías Bexauri` remains in place.
- `Última actividad de estudio` remains in place.
- `Mensaje de tu tutor Bexauri` remains in place.
- Post-completion `Volver a tutoría` still resolves by source program.
- `Ir Dashboard` remains available in capsule UI.
- `Ir a la siguiente cápsula` remains available with safe behavior.
- Finalized capsule review remains available.
- Capsule navigation remains inside ST pages or explicit activity/capsule surfaces.

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

TypeScript command note:

```text
The root .\node_modules\.bin\tsc.cmd command was not available for this checkout. The equivalent project-local command was used with --project nextjs_space\tsconfig.json.
```

Build output included the ST routes:

```text
/study/paes-m1
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
STUDENT_TUTORING_UI_STRUCTURE_ALIGNED
```

## Follow-up/blocker

```text
MVP-STUDENT-TUTORING-UI-STRUCTURE-ALIGNMENT-HUMAN-SMOKE-1
```
