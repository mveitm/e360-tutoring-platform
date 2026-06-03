# MVP-SALES-PILOT-UI-STUDY-2 - Implement M1 Study Page after-enrollment state

## Phase

```text
MVP-SALES-PILOT-UI-STUDY-2 - Implement M1 Study Page after-enrollment state
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 029d35a
Latest accepted commit = 029d35a - MVP-SALES-PILOT-UI-STUDY-TRANSITION-1: define after-enrollment study page deliverable
Working tree clean before edits.
```

## CTA decision

Mauricio explicitly authorized:

```text
AUTORIZO_STUDY_2_AFTER_ENROLLMENT_CON_CTA_VER_CAPSULA
```

Product decision:

* The Study Page after-enrollment primary CTA is `Ver cápsula`.
* `Comenzar cápsula` is not used as the primary CTA in Study Page.
* Study Page remains the tutoring/progress screen.
* Cápsula execution remains in the existing viewer/activity route.
* Study Page does not start, submit, complete, or execute a Cápsula automatically.

## After-enrollment state

`/study/paes-m1` now renders an after-enrollment state when the authenticated student has active PAES_M1 enrollment.

Visible state:

* `Tutoría Activa`.
* `PAES Matemáticas M1`.
* Estado inicial.
* Progreso de tutoría indicators.
* Siguiente cápsula, when available.
* Safe no-capsule state, when no current capsule exists.
* `Tutoría Info`.
* Footer navigation.

## Read-only enrollment detection

The page keeps the existing server-session guard and read-only lookup chain:

```text
session.user.email -> Student.email -> active StudentProgramInstance -> Program.code = PAES_M1
```

No enrollment is created or changed.

## Current capsule

The page reads the active enrollment current cycle and existing `StudyLoad` records in read-only mode.

Current capsule priority:

1. `in_progress`, newest updated first.
2. `pending`, oldest created first.
3. `completed`, newest completed/updated first, only as history/last capsule if no active capsule exists.

When a capsule exists, the page shows:

* title;
* visible status as `Pendiente`, `En progreso`, or `Completada`;
* `Cápsula` terminology;
* topic/focus from `getStudyLoadContent(...)` when available;
* CTA `Ver cápsula`.

CTA route:

```text
/now/study-loads/[id]
```

This is the existing viewer/activity route. Study Page does not call `/api/study-loads/[id]/start`.

## Behavior without capsule

When no capsule exists, Study Page shows:

```text
Aún no tienes una cápsula disponible.
Cuando haya una cápsula lista, aparecerá aquí con una acción clara.
```

No fake progress or invented current capsule is displayed.

## Operational elements

* Existing auth/session guard.
* Existing read-only student lookup.
* Existing read-only active PAES_M1 enrollment lookup.
* Existing read-only current cycle lookup.
* Existing read-only capsule lookup.
* Existing `/now/study-loads/[id]` viewer route for `Ver cápsula`.
* Existing `Tutoría Info` dialog.
* Existing footer navigation to Dashboard, Cápsulas, Progreso, and Info.

## Visible non-operational elements

* `Matricularse` remains visual/no destructive when no active enrollment exists.
* `Logro --%` remains a sober placeholder until reliable data exists.
* Progress/focus/evidence zones remain prepared UI where reliable data is not yet available.
* No M2 or Competencia Lectora functional readiness is declared.

## Responsive

Prepared for human audit:

* Mobile standard: `390 x 844`.
* Tablet vertical: `768 x 1024`.
* Desktop: `1366 x 768`.

Criteria addressed:

* `Tutoría Activa` remains visible for active enrollment.
* `Ver cápsula` appears when a current capsule exists.
* Safe no-capsule state appears when no capsule exists.
* `Tutoría Info` remains modal/dialog.
* Footer ST remains available.
* `Volver` / Dashboard navigation remains available.
* No intentional horizontal overflow.

## Build

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Limits respected

No changes were made to DB/base de datos mutation, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, new enrollment creation, M2 functional activation, Competencia Lectora functional activation, automatic Cápsula/StudyLoad execution, automatic `Empezar`, responses, submit, self-report, completion, new automatic continuity, checkout, real payment, real trial, complete functional subscription, staging/production, secrets, Sales-Ready declaration, MVP-Beta cerrado completo declaration, or L1/M2 functional readiness declaration.

## Result

```text
STUDY_PAGE_M1_AFTER_ENROLLMENT_STATE_IMPLEMENTED
```

## Next recommended phase

```text
Human mobile audit of Study Page after-enrollment
```
