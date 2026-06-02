# MVP-SALES-PILOT-UI-LANDING-1E - Refine landing structure and visual hierarchy

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-LANDING-1E - Refine landing structure and visual hierarchy after human audit
```

## Level

```text
Level C/D - UI visual refinement / standard implementation
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = c222374
Latest accepted commit = c222374 - MVP-SALES-PILOT-UI-LANDING-1D: apply Bexauri visual standard to landing
Working tree clean before edits.
```

## Human audit inherited

Mauricio accepted LANDING-1D as a first draft of the visual standard and landing strategy, with requested refinements to order, hierarchy, logo/branding, hero copy, tutoring options, access options, and route placement.

Requested section order:

1. Header / logo Bexauri.
2. Hero principal.
3. Botones iniciales.
4. Sección Tutorías.
5. Sección Opciones de acceso / Elige cómo comenzar.
6. Sección Ruta de estudio.
7. Sección Una forma más clara de estudiar.
8. Footer.

## Context gate

Documents read:

* `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`
* `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md`
* `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`
* `nextjs_space/docs/operations/BEXAURI_VISUAL_STANDARD_V0_1.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1D_APPLY_BEXAURI_VISUAL_STANDARD_V0_1.md`
* `PHASE_LOG.md` tail

## Structural changes

The landing was reordered to match the human audit:

* Header / logo.
* Hero with highlighted `Matemáticas M1`.
* Initial buttons.
* `Tutorías:` section.
* `Elige cómo comenzar` access section.
* `Ruta de estudio` section.
* `Una forma más clara de estudiar` section.
* Footer.

## Copy applied

Hero focus:

```text
Matemáticas M1
```

Hero body copy:

```text
Bexauri organiza tu estudio, identifica tu ritmo, y te ayuda construir tu aprendizaje con cada ejercicio
```

Initial buttons:

* `Iniciar experiencia` -> `/login`
* `Ver cómo guía` -> `#ruta-estudio`

Tutoring section:

* `PAES Matemáticas M1`
* `PAES Matemáticas M2`
* `PAES Competencia Lectora`

Access section:

* `Iniciar`
* `Trial`
* `Suscripción`

## Logo treatment

* Kept `nextjs_space/public/brand/bexauri-logo-provisional.png`.
* Improved the header capsule/surface treatment.
* Increased perceived intentionality through a rounded white container, soft border, and subtle product-level shadow.
* Preserved the logo as provisional wordmark.
* Did not generate a new logo, replace it, recolor it, or edit the asset.

## Tutorías section

The tutoring section now appears immediately after the hero and initial buttons.

Treatment:

* `PAES Matemáticas M1` has stronger emphasis as the current visual focus.
* `PAES Matemáticas M2` and `PAES Competencia Lectora` appear as part of the visual tutoring architecture.
* No functional readiness, enrollment, checkout, or runtime activation was added.

## Options of access

The `Elige cómo comenzar` section remains after `Tutorías:`.

Treatment:

* `Iniciar` remains the primary operative path.
* `Trial` remains framed as `7 días de prueba`.
* `Suscripción` remains framed as `Acceso ilimitado`.
* No checkout, payment, real trial logic, subscription backend, or pricing was introduced.

## Responsive

Prepared for:

* Mobile standard: `390 x 844`
* Tablet vertical: `768 x 1024`
* Desktop: `1366 x 768`

Implementation notes:

* Mobile uses stacked sections and keeps initial buttons visible before deeper content.
* Tablet keeps `Tutorías`, access options, route, and support blocks readable without compression.
* Desktop presents a stronger hierarchy with hero, tutoring architecture, access options, route, and support sections in the requested order.
* The page root keeps `overflow-x-hidden`; no intentionally fixed wide element was added.

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

* touch DB;
* touch schema;
* run migrations;
* alter auth architecture;
* touch credentials;
* touch StudyLoad;
* touch StudentAccess;
* implement student dashboard;
* implement M1 enrollment;
* implement checkout;
* implement real payment;
* implement real trial logic;
* implement complete functional subscription;
* touch staging or production;
* inspect or print secrets;
* generate a new logo;
* declare Sales-Ready;
* declare MVP-Beta cerrado completo;
* declare L1/M2 functional readiness.

## Result

```text
LANDING_PAGE_STUDENT_MVP_STRUCTURE_AND_HIERARCHY_REFINED
```

## Next recommended phase

```text
Human visual audit of landing 1E
```
