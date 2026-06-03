# MVP-SALES-PILOT-UI-CAPSULE-2A - Refine Study Page order and Capsule Page navigation/CTA

## Phase

MVP-SALES-PILOT-UI-CAPSULE-2A - Refine Study Page capsule order and Capsule Page navigation/CTA.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Expected and observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 04000f5
```

Last accepted commit:

```text
04000f5 - MVP-SALES-PILOT-UI-CAPSULE-2: show first M1 capsule CTA on study page
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio accepted the first CAPSULE-2 base:

```text
FIRST_M1_CAPSULE_VISIBLE_WITH_CTA_FROM_STUDY_PAGE
```

Requested refinements:

* In Study Page, `Siguiente cápsula` must appear before `Estado inicial`.
* In Capsule Page, header and footer must preserve Bexauri navigation.
* `Volver a tutoría` and `Ir DB` must be available in both header and footer.
* The `Cápsula PAES_M1` container must show `Comenzar` and capsule state.
* Instruction point 6 and the `Para responder...` container must be suppressed.

## Study Page Changes

Route:

```text
/study/paes-m1
```

Implementation:

* Reordered the active-tutoring area so `Siguiente cápsula` renders before `Estado inicial`.
* Preserved existing `Tutoría Activa`, `Matricularse`, `No disponible`, `Tutoría Info`, footer, and `Cápsula/Cápsulas` terminology.
* Did not change enrollment, first-capsule creation, or viewer routing behavior.

## Capsule Page Changes

Route:

```text
/now/study-loads/[id]
```

Implementation:

* Rebuilt the viewer shell as a contained mobile-first capsule screen.
* Added persistent Bexauri header.
* Added persistent capsule footer.
* Added `Volver a tutoría` to `/study/paes-m1` in header and footer.
* Added `Ir DB` to `/now` in header and footer.
* Added visible capsule status in the `Cápsula PAES_M1` container.
* Added `Comenzar` CTA in the capsule container.

## CTA Comenzar

`Comenzar` is manual only.

For pending/released capsules, it reuses the existing safe `StartLoadButton` behavior and only posts to the existing start endpoint after student click.

For non-pending states, it anchors the student to the capsule content area without mutating data.

No automatic start is triggered by render.

## Instructions and Removed Content

The capsule answer form now filters out instruction point 6 from visible instructions.

The previous `Para responder...` guidance container is no longer rendered for pending/released capsules.

## Operational Elements

* Existing auth/session guard.
* Existing ownership check for capsule access.
* Existing capsule viewer route.
* Existing manual start action, only on click.
* Existing answer form behavior for in-progress/completed states.
* Navigation to Study Page and Dashboard.

## Visible / Copy-Only Elements

* Header/footer shell refinement.
* `Cápsula PAES_M1` label.
* Visible capsule status.
* `Comenzar` label in the viewer container.
* Instruction cleanup.

## Limits Respected

No DB mutation was added.

No schema, migrations, auth architecture, credentials, StudentAccess lifecycle, new enrollment, M2/Lectora activation, automatic capsule execution, automatic `Empezar`, answer selection, responses, submit, self-report, completion, continuity automation, checkout, payment, real trial, functional subscription, staging, production, secrets, Sales-Ready declaration, MVP-Beta cerrado completo declaration, or L1/M2 readiness declaration was introduced.

## Responsive

Prepared for human audit at:

* Mobile standard: `390 x 844`.
* Tablet vertical: `768 x 1024`.
* Desktop: `1366 x 768`.

Expected behavior:

* Header remains compact.
* Main viewer content scrolls internally.
* Footer remains visible.
* Navigation controls fit in mobile width.
* No intentional horizontal overflow.

## Build

Verification command:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Next Recommended Phase

```text
Human mobile audit of Capsule Page 2A
```
