# MVP-SALES-PILOT-UI-LANDING-1 - Implement student landing page MVP

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-LANDING-1 - Implement student landing page MVP
```

## Level

```text
Level D - Standard implementation
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 12023dc
Latest accepted commit = 12023dc - MVP-SALES-PILOT-UI-DELIVERABLE-1: define student landing page deliverable
Working tree clean before edits.
```

## Context gate

Documents read:

* `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`
* `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md`
* `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`
* `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
* `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
* `PHASE_LOG.md` tail

Protocols active:

* Phase Scope Optimization Protocol.
* Student Experience-Led Delivery Protocol.

Official deliverable:

```text
LANDING_PAGE_STUDENT_MVP_READY
Landing Page estudiante - Bexauri MVP
```

## Implementation summary

Implemented the public root landing page at `/`.

The prior root behavior redirected unauthenticated visitors to `/login`. The new root page is a public student landing experience with:

* provisional Bexauri wordmark;
* student-oriented hero;
* primary login CTA to `/login`;
* secondary options anchor to `#opciones`;
* access option cards for account login, trial, and subscription;
* trial/subscription options as non-destructive local anchors only;
* support block explaining the study experience;
* responsive layout for mobile, tablet, and desktop.

## Visible copy implemented

Wordmark / brand:

```text
Bexauri
```

Hero:

```text
Estudia con claridad, práctica y retroalimentación.
```

Subtitle:

```text
Una experiencia de estudio guiada para avanzar paso a paso, practicar con propósito y reconocer tu progreso.
```

Primary button:

```text
Iniciar sesión
```

Secondary button:

```text
Ver opciones de acceso
```

Options block:

```text
Elige cómo comenzar
Puedes iniciar sesión si ya tienes una cuenta o revisar las opciones disponibles para comenzar tu experiencia de estudio.
```

Cards:

```text
Ya tengo cuenta
Entra a tu espacio de estudio y continúa desde donde quedaste.
Iniciar sesión

Trial
Explora una primera experiencia guiada de estudio y conoce cómo Bexauri organiza actividades, avance y retroalimentación.
Comenzar trial

Suscripción
Accede a una experiencia de estudio continua, con actividades organizadas y seguimiento de progreso.
Ver suscripción
```

Support block:

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

* Hero `Iniciar sesión` navigates to `/login`.
* Header `Iniciar sesión` navigates to `/login`.
* `Ya tengo cuenta / Iniciar sesión` navigates to `/login`.
* `Ver opciones de acceso` scrolls to `#opciones`.
* `Comenzar trial` points to `#opciones`.
* `Ver suscripción` points to `#opciones`.

No checkout, payment, real trial, subscription backend, DB mutation, or account/access mutation is implemented.

## Files modified

* `nextjs_space/app/page.tsx`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1_IMPLEMENT_STUDENT_LANDING_PAGE_MVP.md`
* `PHASE_LOG.md`
* `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`

## Verification

Verification performed:

* `npm.cmd --prefix nextjs_space run build` - passed.
* Static scan confirmed login CTAs and options anchors in `nextjs_space/app/page.tsx`.
* Static scan confirmed forbidden landing text is not present in `nextjs_space/app/page.tsx`.

Static verification results:

* `/` renders the landing content.
* `/login` route remains unchanged.
* Login CTAs point to `/login`.
* Trial/subscription CTAs do not point to payment or checkout routes.
* Forbidden text is not present in the landing implementation.
* No DB/schema/auth/StudyLoad files are modified.
* Responsive behavior is implemented through mobile-first Tailwind layout classes, with single-column mobile sections and tablet/desktop grid breakpoints.

## Scope safety

This phase does not:

* implement checkout;
* implement real payment;
* integrate a payment provider;
* implement real trial logic;
* implement functional subscription logic;
* touch DB;
* touch schema;
* run migrations;
* alter auth architecture;
* touch credentials;
* touch StudentAccess lifecycle;
* touch StudyLoad;
* implement a student dashboard;
* implement M1 enrollment;
* implement pedagogical feedback;
* touch L1/M2;
* touch staging/production;
* inspect or print secrets.

## Result

```text
LANDING_PAGE_STUDENT_MVP_READY
```

## Next recommended phase

```text
Human visual audit of student landing page, then dashboard estudiante deliverable definition.
```
