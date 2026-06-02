# MVP-SALES-PILOT-UI-LANDING-1G - Refine approved mobile landing draft copy and hierarchy

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-LANDING-1G - Refine approved mobile landing draft copy and hierarchy
```

## Level

```text
Level C/D - UI visual refinement / standard implementation
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 7fbcff0
Latest accepted commit = 7fbcff0 - MVP-SALES-PILOT-UI-LANDING-1F: compact mobile first-view hierarchy
Working tree clean before edits.
```

## Human audit inherited

Mauricio approved LANDING-1F as the mobile draft and element order, then requested a focused refinement only:

* improve Bexauri logo presence;
* use cyan text color for `Matemáticas M1`;
* change `Secuencia pedagógica` to `¿Cómo te guía Bexauri?`;
* move `¿Cómo te guía Bexauri?` higher as a bridge in the mobile first view;
* keep `Ruta de Estudio`;
* update the four route-card texts;
* change `Una forma más clara de estudiar` to `Una forma más precisa de estudiar`.

## Context gate

Documents read:

* `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`
* `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md`
* `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`
* `nextjs_space/docs/operations/BEXAURI_VISUAL_STANDARD_V0_1.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1F_COMPACT_MOBILE_FIRST_VIEW_HIERARCHY.md`
* `PHASE_LOG.md` tail

## Changes applied

* Increased the visual presence of the existing provisional Bexauri logo inside the header capsule.
* Kept `Matemáticas M1` highlighted only by text color and changed it to cyan.
* Added a compact first-view bridge link: `¿Cómo te guía Bexauri?`.
* Replaced the route eyebrow copy with `¿Cómo te guía Bexauri?`.
* Kept the route section title as `Ruta de Estudio`.
* Updated the route cards with the human-approved copy.
* Renamed the support section to `Una forma más precisa de estudiar`.

## Copy updated

Hero title keeps:

```text
Estudia Matemáticas M1 con una ruta que te guía paso a paso.
```

`Matemáticas M1` is styled in cyan text only.

Bridge/subtitle:

```text
¿Cómo te guía Bexauri?
```

Route cards:

* `Comenzar` - `Ubicamos tu punto de partida en cada tutoría`
* `Practicar` - `Trabajas con pocos ejercicios conectados`
* `Revisar` - `Identificas tus aciertos y recibes ayuda en lo que te costó`
* `Continuar` - `Avanzas al siguiente foco de estudio.`

Support title:

```text
Una forma más precisa de estudiar
```

## Logo treatment

The phase keeps `nextjs_space/public/brand/bexauri-logo-provisional.png`.

The logo capsule now has slightly stronger size, border integration, and soft shadow so the wordmark feels more relevant without dominating the compact first mobile view. No new logo was generated, substituted, recolored, or edited.

## Responsive

Prepared for:

* Mobile standard: `390 x 844`
* Tablet vertical: `768 x 1024`
* Desktop: `1366 x 768`

Implementation notes:

* Mobile first view remains compact.
* Header still exposes `Bexauri` and `Iniciar`.
* `Matemáticas M1` remains a text-only highlight.
* `¿Cómo te guía Bexauri?` now appears before the route section as a visible continuity cue.
* Route cards keep readable hierarchy.
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

* redesign the full landing;
* change the approved general order beyond raising the guide bridge;
* change unrequested copy;
* generate a new logo;
* replace the logo;
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
* declare Sales-Ready;
* declare MVP-Beta cerrado completo;
* declare L1/M2 functional readiness.

## Result

```text
LANDING_PAGE_STUDENT_MVP_APPROVED_DRAFT_REFINED
```

## Next recommended phase

```text
Human visual audit of landing 1G
```
