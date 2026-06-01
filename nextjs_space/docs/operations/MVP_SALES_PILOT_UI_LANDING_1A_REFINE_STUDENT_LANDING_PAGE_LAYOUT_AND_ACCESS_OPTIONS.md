# MVP-SALES-PILOT-UI-LANDING-1A - Refine student landing page layout and access options

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-LANDING-1A - Refine student landing page layout and access options
```

## Level

```text
Level C/D - UI refinement / standard implementation
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 194e0ee
Latest accepted commit = 194e0ee - MVP-SALES-PILOT-UI-LANDING-1: implement student landing page MVP
Working tree clean before edits.
```

## Context gate

Documents read:

* `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`
* `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md`
* `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1_IMPLEMENT_STUDENT_LANDING_PAGE_MVP.md`
* `PHASE_LOG.md` tail

Protocols active:

* Phase Scope Optimization Protocol.
* Student Experience-Led Delivery Protocol.
* `LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`.

Landing file located:

```text
nextjs_space/app/page.tsx
```

## Changes requested

Mauricio requested the first student landing page refinement:

* reduce the welcome/hero to two text lines;
* remove images, boxes, and graphics from the welcome;
* keep the entry clean, direct, and professional;
* show three clear access options: `Iniciar`, `Trial`, and `Suscripción`;
* show each option as a card with explanatory legend;
* use the refined access legends;
* keep the existing support block where it does not contradict the refinement;
* preserve the existing Bexauri visual palette instead of introducing a new palette.

## Copy implemented

Brand:

```text
Bexauri
```

Hero:

```text
Estudia con claridad, práctica y retroalimentación.
Avanza paso a paso con una experiencia guiada para aprender mejor.
```

Primary button:

```text
Iniciar sesión
```

Options section:

```text
Elige cómo comenzar
```

Cards:

```text
Iniciar
Si tienes cuenta, entra a tu espacio de estudio y continúa desde donde quedaste.
Iniciar sesión

Trial
7 días de prueba para conocer la experiencia de estudio de Bexauri.
Comenzar trial

Suscripción
Acceso ilimitado para estudiar de forma continua con actividades y seguimiento.
Ver suscripción
```

Support block retained:

```text
Una forma más clara de estudiar
Bexauri combina actividades, evidencia de trabajo y orientación para ayudarte a avanzar con foco.
Actividades organizadas para estudiar paso a paso.
Evidencia de avance para revisar tu trabajo.
Una experiencia pensada para acompañar tu aprendizaje.
```

Footer:

```text
Bexauri — Experiencia de estudio guiada
```

## Button behavior

* Header `Iniciar sesión` navigates to `/login`.
* Hero `Iniciar sesión` navigates to `/login`.
* `Ver opciones de acceso` points to the local `#opciones` section.
* `Iniciar` card button navigates to `/login`.
* `Comenzar trial` points to `#opciones`.
* `Ver suscripción` points to `#opciones`.

No checkout, real payment, real trial logic, subscription backend, DB mutation, or account/access mutation is implemented.

## Responsive verification

Responsive behavior is implemented through mobile-first Tailwind classes:

* mobile hero uses a single-column text layout;
* options cards stack on mobile and switch to three columns from tablet/desktop width;
* support cards stack on small screens and switch to grid on larger screens;
* buttons have stable minimum heights;
* no intentionally fixed wide element was added.

Reference sizes prepared for human visual audit:

* Mobile small: `375 x 667`
* Mobile standard: `390 x 844`
* Mobile large: `430 x 932`
* Tablet vertical: `768 x 1024`
* Tablet large: `820 x 1180`
* Desktop: `1366 x 768`

## Build

Required command:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Files modified

* `nextjs_space/app/page.tsx`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1A_REFINE_STUDENT_LANDING_PAGE_LAYOUT_AND_ACCESS_OPTIONS.md`
* `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
* `PHASE_LOG.md`

## Scope safety

This phase does not:

* touch DB;
* touch schema;
* run migrations;
* alter auth architecture;
* touch credentials;
* touch StudentAccess;
* touch StudyLoad;
* implement student dashboard;
* implement M1 enrollment;
* implement pedagogical feedback;
* implement checkout;
* implement real payment;
* implement real trial logic;
* implement complete functional subscription;
* touch staging or production;
* inspect or print secrets.

Forbidden defensive text remains excluded from the landing implementation.

## Result

```text
LANDING_PAGE_STUDENT_MVP_REFINED
```

## Next recommended phase

```text
Human visual audit of refined landing page
```
