# MVP-SALES-PILOT-UI-CAPSULE-1 — Audit and refine first Cápsula viewer entry from Study Page

Continuity phrase: Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.

## Phase

```text
MVP-SALES-PILOT-UI-CAPSULE-1 — Audit and refine first Cápsula viewer entry from Study Page
```

Level: C/D — UI refinement + safe read-only/navigation verification.

Result marker:

```text
CAPSULE_VIEWER_ENTRY_FROM_STUDY_PAGE_REFINED
```

## Baseline

Expected and observed baseline:

```text
HEAD = origin/main = origin/HEAD = 6115dc8
Latest accepted commit = 6115dc8 — MVP-SALES-PILOT-UI-STUDY-ENROLL-1: implement M1 enrollment from study page
Working tree clean before edits.
```

`MVP-SALES-PILOT-UI-STUDY-ENROLL-1` remains accepted: `Matricularse` from `/study/paes-m1` creates/reactivates PAES_M1 enrollment and returns to Study Page showing `Tutoría Activa`.

## Routes Detected

* Landing: `/`.
* Dashboard: `/now`.
* Study Page: `/study/paes-m1`.
* Cápsula viewer: `/now/study-loads/[id]`.

Implementation files:

* `nextjs_space/app/study/paes-m1/page.tsx`.
* `nextjs_space/app/now/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`.

## Entry From Study Page

Study Page already points `Ver cápsula` to the existing viewer route:

```text
/now/study-loads/[id]
```

This remains navigation only. It does not call the start endpoint and does not execute the capsule automatically.

## Viewer Route

The real viewer is:

```text
/now/study-loads/[id]
```

The viewer keeps the existing server-side ownership chain:

```text
session user -> Student -> active enrollment -> open cycle -> StudyLoad
```

No read model, auth, API, route handler, or persistence behavior was changed.

## Terminology Changes

Visible UI in the touched student circuit now prefers:

* `Cápsula`.
* `Cápsulas`.
* `Ver cápsula`.
* `Volver a tutoría`.

Technical names remain unchanged:

* `StudyLoad` model.
* `/now/study-loads/[id]` route.
* API endpoints.
* internal imports/types/helpers.

## UI Changes

Viewer:

* Added a Bexauri-aligned warm contained background.
* Expanded the viewer container to a readable mobile-first shell.
* Changed the top return action to `Volver a tutoría`.
* Changed the viewer label to `Cápsula · PAES_M1`.
* Changed the visible type badge to `Cápsula`.
* Added guidance copy: `Trabaja esta cápsula con calma. Tus respuestas quedarán guardadas cuando decidas enviarlas.`
* Fixed the metadata separator from a broken visible mark to a centered dot.
* Fallback copy now says the cápsula content is not available and returns to Study Page.

Dashboard touched copy:

* Changed visible activity labels in the student capsule list to `cápsula`.
* Changed `Ver actividad` links to `Ver cápsula`.
* Preserved the existing `Empezar` button and start semantics.

Answer form touched copy:

* Replaced visible `actividad` language with `cápsula`.
* Changed bottom return links to `Volver a tutoría`.
* Kept `Enviar respuestas` and finalization controls as existing manual actions.

## Operational Behavior

Operational elements preserved:

* `Ver cápsula` from Study Page navigates to `/now/study-loads/[id]`.
* The viewer resolves the authenticated student and ownership chain server-side.
* Pending/released capsules show content/instructions and require the existing manual start path before answers can be sent.
* In-progress capsules keep the existing answer form behavior.
* Completed capsules remain read-only.
* Dashboard links to the same viewer route.

No automatic action was added.

## Limits Respected

* No DB mutation.
* No schema.
* No migrations.
* No auth architecture changes.
* No credentials.
* No StudentAccess lifecycle.
* No new enrollment.
* No M2 functional activation.
* No Competencia Lectora functional activation.
* No Cápsula/StudyLoad execution automática.
* No Empezar automático.
* No response selection.
* No responses.
* No submit.
* No self-report changes.
* No completion changes.
* No continuidad automática nueva.
* No checkout.
* No pago real.
* No trial real.
* No suscripción funcional completa.
* No staging.
* No production.
* No secrets.
* No Sales-Ready declaration.
* No MVP-Beta cerrado completo declaration.
* No L1/M2 functional readiness declaration.

## Build

Build command:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Responsive

Prepared for human audit:

* Mobile standard: `390 x 844`.
* Tablet vertical: `768 x 1024`.
* Desktop: `1366 x 768`.

The viewer uses a constrained centered shell, mobile-first padding, Bexauri background, and no intentional horizontal overflow.

## Next Recommended Phase

```text
Human mobile audit of Ver cápsula entry
```
