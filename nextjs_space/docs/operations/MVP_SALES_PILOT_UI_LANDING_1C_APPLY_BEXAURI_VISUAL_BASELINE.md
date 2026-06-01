# MVP-SALES-PILOT-UI-LANDING-1C - Apply Bexauri visual baseline

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-LANDING-1C - Define and apply Bexauri visual baseline v0.1 to student landing
```

## Level

```text
Level C/D - UI visual system refinement + standard implementation
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 2be8653
Latest accepted commit = 2be8653 - MVP-SALES-PILOT-UI-LANDING-1B: apply provisional Bexauri brand polish
Working tree clean before edits.
```

## Human audit inherited

Mauricio audited LANDING-1B and observed:

1. The landing still did not feel enough like a real/professional app.
2. The palette did not feel sufficiently Bexauri and remained too sober.
3. The logo was not integrated well because the logo white background sat on a warm/pink background.
4. Welcome and access options were not visible together quickly enough in the initial desktop view.
5. Trial and subscription looked too simple.
6. Mobile was clean but too basic.
7. The main debt was defining a standard Bexauri visual baseline.

## Context gate

Documents read:

* `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`
* `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md`
* `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1A_REFINE_STUDENT_LANDING_PAGE_LAYOUT_AND_ACCESS_OPTIONS.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1B_APPLY_PROVISIONAL_BEXAURI_BRAND_PALETTE_AND_VISUAL_POLISH.md`
* `PHASE_LOG.md` tail

Protocols active:

* Phase Scope Optimization Protocol.
* Student Experience-Led Delivery Protocol.
* `LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`.

## Visual baseline v0.1 applied

The provisional Bexauri visual baseline v0.1 now uses:

* a deliberate warm page shell;
* a white header surface for logo integration;
* deep Bexauri blue as the product authority color;
* petroleum green as the learning/progress accent;
* blue-gray borders for structure;
* card surfaces with distinct but restrained tints;
* compact first-view layout on desktop;
* stronger buttons and focus states;
* subtle elevation without decorative graphics.

## Logo treatment

The committed provisional logo remains:

```text
nextjs_space/public/brand/bexauri-logo-provisional.png
```

Treatment applied:

* placed the logo inside a white header surface so the logo's white background reads as intentional;
* adjusted width and height to remain visible but not dominant;
* used `object-cover` inside a controlled header container to crop excess source whitespace while keeping the wordmark visible;
* added header border and subtle shadow to integrate the logo surface into the page.

No new logo was generated. No alternate invented logo was substituted. The original source file outside the repo was not modified.

## Palette applied

Baseline palette:

* Primary Bexauri blue: `#192F56`
* Secondary blue: `#253A5F`
* Petroleum green: `#4B7B7C`
* Soft petroleum: `#48656C`
* Warm light background: `#F8F4EB` and `#FBFCF6`
* Blue-gray support: `#A6B3BE`
* Structural border: `#d8e0e5`

Applied usage:

* `#F8F4EB` for the first-view shell;
* `#FBFCF6` for the secondary page surface;
* `#192F56` for headings, primary CTA, footer, and login card accent;
* `#4B7B7C` for learning/progress accents and trial card accent;
* `#253A5F` for subscription accent;
* blue-gray borders and subtle shadows for product-level structure.

## UI changes

* Reworked the first viewport so desktop can show the two-line hero and the three access options together or nearly together.
* Moved the `Elige cómo comenzar` options into a prominent first-view panel.
* Upgraded access cards with tinted surfaces, accent bars, stronger buttons, hover lift, and clearer visual separation.
* Kept `Iniciar`, `Trial`, and `Suscripción` as the three options.
* Preserved the LANDING-1A/1B approved copy.
* Preserved the support block below the first view.
* Added a dark Bexauri-blue footer for stronger product finish.

## Responsive verification

Responsive behavior is prepared for:

* Mobile standard: `390 x 844`
* Tablet vertical: `768 x 1024`
* Desktop: `1366 x 768`

Implementation notes:

* desktop uses a two-column first-view grid with hero and access panel visible together;
* mobile uses a single-column flow with integrated logo, hero, and stacked option cards;
* tablet keeps readable spacing and card hierarchy;
* no intentionally fixed wide element was added;
* buttons keep stable minimum heights;
* no horizontal overflow is expected from the applied layout classes.

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
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1C_APPLY_BEXAURI_VISUAL_BASELINE.md`
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
* implement checkout;
* implement real payment;
* implement real trial logic;
* implement complete functional subscription;
* touch staging or production;
* inspect or print secrets;
* generate a new logo;
* redesign brand outside the landing.

Forbidden defensive text remains excluded from the landing implementation.

## Result

```text
LANDING_PAGE_STUDENT_MVP_VISUAL_BASELINE_APPLIED
```

## Next recommended phase

```text
Human visual audit of Bexauri visual baseline landing page
```
