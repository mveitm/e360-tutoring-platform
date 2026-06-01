# MVP-SALES-PILOT-UI-LANDING-1B - Apply provisional Bexauri brand palette and professional visual polish

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-LANDING-1B - Apply provisional Bexauri brand palette and professional visual polish
```

## Level

```text
Level C/D - UI refinement / standard implementation
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 7a40045
Latest accepted commit = 7a40045 - MVP-SALES-PILOT-UI-LANDING-1A: refine student landing access options
Working tree clean before edits.
```

## Human authorization

```text
AUTORIZO_LANDING_1B_PALETA_BEXAURI_PROVISORIA_Y_LOGO_EN_REPO
```

## Context gate

Documents read:

* `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`
* `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md`
* `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1_IMPLEMENT_STUDENT_LANDING_PAGE_MVP.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1A_REFINE_STUDENT_LANDING_PAGE_LAYOUT_AND_ACCESS_OPTIONS.md`
* `PHASE_LOG.md` tail

Protocols active:

* Phase Scope Optimization Protocol.
* Student Experience-Led Delivery Protocol.
* `LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`.

## Logo source and destination

Source checked:

```text
C:\Users\mveit\Downloads\Gemini_Generated_Image_b9e3a2b9e3a2b9e3.png
```

Destination committed:

```text
nextjs_space/public/brand/bexauri-logo-provisional.png
```

The original file in Downloads was not modified. No replacement logo was generated.

## Palette applied

Provisional Bexauri palette:

* Primary Bexauri blue: `#192F56`
* Secondary blue: `#253A5F`
* Petroleum green: `#4B7B7C`
* Soft petroleum: `#48656C`
* Warm light background: `#F8F4EB` and `#FBFCF6`
* Blue-gray support: `#A6B3BE`

Application:

* general background uses warm light tones;
* primary text and primary CTA use Bexauri blue;
* hover state uses darker blue;
* cards use white/warm surfaces with blue-gray borders and subtle shadows;
* trial accent uses petroleum green;
* subscription accent uses secondary blue;
* login card accent uses primary Bexauri blue.

## UI changes

* Incorporated the provisional Bexauri logo in the header with moderate size.
* Preserved the two-line hero and avoided welcome images, boxes, or graphics beyond the header logo.
* Improved visual hierarchy through stronger brand color usage.
* Softened the general background with warm light tones.
* Refined buttons with brand-aligned color, hover, focus, and shadow states.
* Refined access cards with subtle borders, shadows, and accent top borders.
* Preserved the `Iniciar`, `Trial`, and `Suscripción` card structure from LANDING-1A.
* Preserved the support block and footer.

## Button behavior

* Header `Iniciar sesión` navigates to `/login`.
* Hero `Iniciar sesión` navigates to `/login`.
* `Ver opciones de acceso` points to the local `#opciones` section.
* `Iniciar` card button navigates to `/login`.
* `Comenzar trial` points to `#opciones`.
* `Ver suscripción` points to `#opciones`.

No checkout, real payment, real trial logic, subscription backend, DB mutation, or account/access mutation is implemented.

## Responsive verification

Responsive behavior is prepared for:

* Mobile standard: `390 x 844`
* Tablet vertical: `768 x 1024`
* Desktop: `1366 x 768`

Implementation notes:

* logo remains moderate through fixed responsive width;
* hero remains brief and text-only;
* access cards stack on mobile and switch to three columns on tablet/desktop;
* buttons keep stable minimum height;
* no intentionally fixed wide element was added;
* palette remains coherent with the provisional logo.

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
* `nextjs_space/public/brand/bexauri-logo-provisional.png`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1B_APPLY_PROVISIONAL_BEXAURI_BRAND_PALETTE_AND_VISUAL_POLISH.md`
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
* inspect or print secrets;
* generate a new logo;
* modify the original Downloads logo file.

Forbidden defensive text remains excluded from the landing implementation.

## Result

```text
LANDING_PAGE_STUDENT_MVP_BRAND_POLISHED
```

## Next recommended phase

```text
Human visual audit of brand-polished landing page
```
