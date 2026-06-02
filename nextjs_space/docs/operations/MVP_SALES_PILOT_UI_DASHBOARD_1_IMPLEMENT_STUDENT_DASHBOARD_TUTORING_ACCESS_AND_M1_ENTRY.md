# MVP-SALES-PILOT-UI-DASHBOARD-1 - Implement student dashboard tutoring access and M1 entry v1

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-DASHBOARD-1 - Implement student dashboard tutoring access and M1 entry v1
```

## Authorization

```text
AUTORIZO_IMPLEMENTAR_DASHBOARD_ESTUDIANTE_TUTORIAS_M1_V1
```

## Level

```text
Level C/D - UI implementation with limited operational integration
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 66e9411
Latest accepted commit = 66e9411 - MVP-SALES-PILOT-UI-TRANSITION-1: close landing v0.1 and define dashboard deliverable
Working tree clean before edits.
```

## Deliverable

```text
STUDENT_DASHBOARD_TUTORING_M1_DELIVERABLE
```

Objective:

A signed-in student reaches the dashboard, understands the tutoring architecture, sees PAES Matemáticas M1 as the first active tutoring path, and has a clear action to enter M1 or the current M1 activity.

## Dashboard route used

```text
/now
```

Rationale:

* `/login` redirects non-admin signed-in users to `/now`.
* `/signup` redirects signed-in non-admin users to `/now`.
* Existing `/now` already owns the student surface, active enrollment, current cycle, and StudyLoad cards.
* No new route was created.

## Operational elements

The phase preserves these existing operational elements:

* session guard and redirect to `/login`;
* Bexauri/student header;
* existing sign-out link;
* Student resolution by session email;
* active enrollment and current cycle resolution;
* current StudyLoad read model;
* `Ver actividad` links to existing `/now/study-loads/[id]`;
* existing `Empezar` button behavior where it already existed for pending loads;
* existing completion path where it already existed for in-progress loads without authored content;
* admin link only for admin sessions.

## Visible non-operational elements

The phase adds visible architecture without activating new functionality:

* `PAES Matemáticas M2` card as `Próxima ruta`;
* `PAES Competencia Lectora` card as `Más adelante`;
* future tutoring architecture copy;
* no backend, enrollment, StudyLoad, payment, or readiness behavior for those cards.

## UI changes

* Reworked `/now` into a Bexauri student dashboard.
* Applied Bexauri Visual Standard v0.1 palette and surfaces.
* Added a compact Bexauri header with the provisional logo and session action.
* Added `Tu espacio de estudio` hero.
* Added `Tus tutorías` section with M1/M2/CL cards.
* Made M1 visually primary and active.
* Added `Qué pasará después`.
* Kept current activity, pending loads, in-progress loads, and completed activities visible.
* Removed defensive landing/pilot-style copy from the student dashboard.
* Preserved the existing StudyLoad actions and semantics.

## M1 CTA behavior

Primary M1 CTA:

```text
Entrar a Matemáticas M1
```

Behavior:

* Anchors to the current M1/activity area on `/now`.
* Does not auto-start a StudyLoad.
* Does not create enrollment.
* Does not mutate DB.
* Existing `Ver actividad` links and existing `Empezar` button remain available in current activity cards when the previous flow exposes them.

## Responsive

Prepared for:

* Mobile standard: `390 x 844`
* Tablet vertical: `768 x 1024`
* Desktop: `1366 x 768`

Implementation notes:

* Mobile stacks header, hero, tutoring cards, next-step block, and activities.
* Tablet and desktop use wider responsive grids.
* Root keeps `overflow-x-hidden`.
* M1 remains visually primary.
* M2/Lectora remain visible but clearly non-primary.

## Build

Required command:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Limits respected

This phase does not:

* touch DB schema;
* run migrations;
* alter auth architecture;
* touch credentials;
* create StudentAccess lifecycle;
* create real new enrollment;
* activate M2 functionality;
* activate Competencia Lectora functionality;
* auto-execute StudyLoad;
* auto-press `Empezar`;
* submit responses;
* self-report automatically;
* complete activities automatically;
* create new continuity;
* implement checkout;
* implement real payment;
* implement real trial;
* implement complete functional subscription;
* touch staging or production;
* inspect or print secrets;
* declare Sales-Ready;
* declare MVP-Beta cerrado completo;
* declare L1/M2 functional readiness.

## Result

```text
STUDENT_DASHBOARD_TUTORING_M1_V1_IMPLEMENTED
```

## Next recommended phase

```text
Human visual audit of student dashboard v1
```
