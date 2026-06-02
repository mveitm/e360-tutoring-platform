# MVP-SALES-PILOT-UI-LANDING-1F - Compact mobile first-view hierarchy

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-LANDING-1F - Compact mobile first-view hierarchy for student landing
```

## Level

```text
Level C/D - UI visual refinement / standard implementation
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = b9b3cb9
Latest accepted commit = b9b3cb9 - MVP-SALES-PILOT-UI-LANDING-1E: refine landing structure and hierarchy
Working tree clean before edits.
```

## Human audit inherited

Mauricio observed that the landing elements were too large and that the first mobile view did not let the student understand quickly what to do.

Requested mobile first-view direction:

1. Header: `Bexauri` / `Iniciar`.
2. Remove first-view `Experiencia de estudio guiado`.
3. Remove hero buttons `Iniciar experiencia` and `Ver cómo guía`.
4. Keep compact hero with `Matemáticas M1` highlighted only by text color.
5. Keep exact body copy.
6. Show horizontal `Tutorías:` immediately after hero.
7. Show compact `Suscripciones` with `Trial` and `Suscripción`.
8. Move `Ruta de estudio`, `Una forma más clara de estudiar`, and footer after the first mobile view.

## Context gate

Documents read:

* `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`
* `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md`
* `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`
* `nextjs_space/docs/operations/BEXAURI_VISUAL_STANDARD_V0_1.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1E_REFINE_LANDING_STRUCTURE_AND_VISUAL_HIERARCHY.md`
* `PHASE_LOG.md` tail

## New mobile first-view order

1. Header: compact Bexauri logo / `Iniciar`.
2. Compact hero.
3. Exact hero body text.
4. `Tutorías:` horizontal three-item row.
5. `Suscripciones` with compact `Trial` and `Suscripción`.

After first view:

6. `Ruta de estudio`.
7. `Una forma más clara de estudiar`.
8. Footer.

## Hero changes

* Removed the first-view eyebrow/badge `Experiencia de estudio guiado`.
* Removed hero buttons `Iniciar experiencia` and `Ver cómo guía`.
* Reduced mobile H1 size and vertical spacing.
* Highlighted `Matemáticas M1` only through text color.
* Removed chip/background/box treatment from `Matemáticas M1`.
* Kept the exact human-approved body copy:

```text
Bexauri organiza tu estudio, identifica tu ritmo, y te ayuda construir tu aprendizaje con cada ejercicio
```

## Tutorías

The tutoring section is now compact and immediately follows the hero.

Items:

* `PAES Matemáticas M1`
* `PAES Matemáticas M2`
* `PAES Competencia Lectora`

Treatment:

* Mobile uses a three-column horizontal row.
* Each tutoring option has a short visual identifier: `M1`, `M2`, `CL`.
* Color differentiates the options while preserving Bexauri palette coherence.
* `M1` keeps stronger current-focus emphasis.
* No M2/Lectora functional readiness or enrollment behavior was added.

## Suscripciones

The former access-options block was simplified for first mobile view.

Visible items:

* `Trial` - `7 días de prueba`
* `Suscripción` - `acceso ilimitado`

Treatment:

* Compact two-column cards on mobile.
* No checkout, real payment, real trial logic, subscription backend, or DB behavior was introduced.
* The header `Iniciar` remains the only login action in the first mobile view.

## Responsive

Prepared for:

* Mobile standard: `390 x 844`
* Tablet vertical: `768 x 1024`
* Desktop: `1366 x 768`

Implementation notes:

* Mobile first viewport uses compact header, hero, tutorías row, and subscription cards.
* Tablet and desktop preserve the same order with larger spacing and typography.
* Route/support sections are pushed after the compact first-view sequence.
* Root keeps `overflow-x-hidden`; no intentionally fixed wide element was added.

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
* generate a new Bexauri logo;
* declare Sales-Ready;
* declare MVP-Beta cerrado completo;
* declare L1/M2 functional readiness.

## Result

```text
LANDING_PAGE_STUDENT_MVP_MOBILE_FIRST_VIEW_REFINED
```

## Next recommended phase

```text
Human visual audit of landing 1F
```
