# MVP-SALES-PILOT-UI-STUDENT-SPINE-1 - Implement minimal LP-Dashboard-Study Page navigation spine

## Phase

```text
MVP-SALES-PILOT-UI-STUDENT-SPINE-1 - Implement minimal LP-Dashboard-Study Page navigation spine
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 396918b
Latest accepted commit = 396918b - MVP-SALES-PILOT-DAY-CLOSE-1: document landing and dashboard UI progress
Working tree clean before edits.
```

## Routes implemented

* Landing Page: `/`.
* Dashboard: `/now`.
* Study Page M1: `/study/paes-m1`.

`/study/paes-m1` was created because the existing equivalent route, `/now/study-loads/[id]`, is an activity execution surface. This phase needed a stable tutoring boundary before activity execution.

## Landing Page behavior

* `Trial` navigates to `/now`.
* `Suscripción` navigates to `/now`.
* Existing auth behavior is preserved: unauthenticated users entering `/now` are handled by the existing dashboard/session guard.
* No checkout, payment, real trial, or complete subscription flow was implemented.

## Dashboard behavior

* `/now` keeps the mobile-first dashboard shell and tutoring carousel.
* `Comenzar Estudio` now navigates to `/study/paes-m1`.
* The PAES Matemáticas M1 tutoring card now navigates to `/study/paes-m1`.
* M2 and Competencia Lectora remain visible non-operational paths with `No disponible`.
* Existing StudyLoad execution controls remain unchanged where they already existed; this phase did not add automatic execution.

## Study Page behavior

`/study/paes-m1` is a contained, mobile-first Study Page for PAES Matemáticas M1.

It includes:

* Header with Bexauri and minimal navigation back.
* Title: `PAES Matemáticas M1`.
* Subtitle: `Fortalece tus destrezas en los 4 ejes de Matemáticas M1.`
* Read-only enrollment detection for active `PAES_M1`.
* `Tutoría Activa` when an active M1 enrollment exists.
* `Matricularse` when M1 is visually available and no active M1 enrollment exists.
* `No disponible` state in the component model for unavailable tutoring.
* `Tutoría Info` disclosure with program and methodology details.
* Pedagogical placeholder zone for `Cápsulas`, `Progreso`, `Foco actual`, and `Evidencia`.
* Footer navigation with `Volver a Dashboard`, `Cápsulas`, and `Progreso`.

The `Matricularse` button is visual only in this phase. It does not mutate DB state and does not create enrollment.

## Cápsulas terminology

Visible student-facing UI touched in this circuit now uses `Cápsula` / `Cápsulas` instead of `Carga` / `Cargas`.

Applied to:

* `/now` tutoring indicators.
* `/now` pending section heading.
* `/now` start/complete toast and dialog copy.
* Existing `/now/study-loads/[id]` visible blocked/completed copy.
* `/study/paes-m1` pedagogical zone and `Tutoría Info`.

Internal model names, files, schema, routes, APIs, and technical `StudyLoad` identifiers were not renamed.

## Operational elements

* Existing landing navigation.
* Existing dashboard auth/session guard.
* Existing dashboard read model for student/enrollment/cycle/study loads.
* New Study Page read-only lookup for authenticated student and active `PAES_M1` enrollment.
* Existing `/now/study-loads/[id]` activity route remains the execution surface.

## Visible non-operational elements

* `Matricularse` on `/study/paes-m1` is visual/no mutation.
* M2 remains visible as `No disponible`.
* Competencia Lectora remains visible as `No disponible`.
* Study Page placeholders for progress, focus, evidence, and future feedback are non-operational.
* Trial and Suscripción navigate safely to `/now`; no commercial flow is active.

## Limits respected

No changes were made to:

* DB/base de datos mutation.
* Schema.
* Migrations.
* Auth architecture.
* Credentials.
* StudentAccess lifecycle.
* New enrollment creation.
* StudyLoad execution automation.
* Automatic `Empezar`.
* Responses.
* Submit.
* Self-report behavior.
* Completion behavior.
* New automatic continuity.
* M2 functional activation.
* Competencia Lectora functional activation.
* Checkout.
* Real payment.
* Real trial.
* Complete functional subscription.
* Staging/production.
* Secrets.
* Sales-Ready declaration.
* MVP-Beta cerrado completo declaration.
* L1/M2 functional readiness declaration.

## Build

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Responsive verification

Prepared for human audit at:

* Mobile standard: `390 x 844`.
* Tablet vertical: `768 x 1024`.
* Desktop: `1366 x 768`.

The implementation uses mobile-first contained shells, internal vertical scroll where appropriate, wrapping CTAs, and `overflow-x-hidden` on the new Study Page.

## Result

```text
STUDENT_EXPERIENCE_SPINE_LP_DB_ST_IMPLEMENTED
```

## Next recommended phase

```text
Human mobile audit of LP -> DB -> ST spine
```
