# MVP-SALES-PILOT-UI-LANDING-1D - Apply Bexauri Visual Standard v0.1

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-LANDING-1D - Apply Bexauri Visual Standard v0.1 to landing page
```

## Level

```text
Level C/D - UI visual implementation / standard implementation
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 6287e97
Latest accepted commit = 6287e97 - MVP-SALES-PILOT-BRAND-1: document Bexauri visual standard v0.1
Working tree clean before edits.
```

## Context gate

Documents read:

* `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`
* `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md`
* `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`
* `nextjs_space/docs/operations/BEXAURI_VISUAL_STANDARD_V0_1.md`
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_LANDING_1C_APPLY_BEXAURI_VISUAL_BASELINE.md`
* `PHASE_LOG.md` tail

Protocols and standards active:

* Phase Scope Optimization Protocol.
* Student Experience-Led Delivery Protocol.
* `LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md`.
* Bexauri Visual Standard v0.1.

## Visual standard applied

The landing now applies Bexauri Visual Standard v0.1 more directly:

* Bexauri is framed as a modern guided-study app.
* The hero communicates guided M1 study without exaggerated commercial or AI claims.
* The page uses deep blue, dark violet, petroleum green, warm light surfaces, warm micro-accent, and soft borders/shadows.
* The UI emphasizes clarity, continuity, visible progress, pedagogical feedback, discreet technology, sober trust, and controlled energy.

## UI changes

* Reworked the first view into a compact guided-study product composition.
* Added a route/progress preview showing clarity, guided practice, and feedback as a simple visual path.
* Kept the primary action visible and connected to `/login`.
* Moved access options into a prominent section near the first desktop fold.
* Reworked the support section to describe route, evidence, and feedback as visible study signals.
* Preserved the footer as a sober product finish.

## Logo treatment

* Kept the existing provisional logo:

```text
nextjs_space/public/brand/bexauri-logo-provisional.png
```

* Placed it inside a deliberate white capsule/surface.
* Preserved it as a temporary wordmark.
* Did not generate, replace, recolor, or modify the logo asset.

## Palette, hierarchy, and cards

Palette applied:

* Deep Bexauri blue: `#192F56`
* Night blue: `#10213F`
* Secondary blue: `#253A5F`
* Deep violet: `#34215F`
* Petroleum green: `#4B7B7C`
* Warm surfaces: `#F8F4EB`, `#FBFCF6`
* Soft blue/violet support surfaces: `#EEF4F7`, `#F2EFF8`
* Warm accent: `#F2B84B`
* Soft borders: `#E2E8EC`, `#DCE5EA`, `#E9DFCF`

Card hierarchy:

* `Iniciar` is the primary operative path.
* `Trial` is treated as guided exploration, not a real trial activation.
* `Suscripcion` is treated as continuity intent, not checkout or active subscription.
* Cards are visually differentiated through border color, icon surface, background tint, button treatment, and copy.

## Responsive

Prepared for:

* Mobile standard: `390 x 844`
* Tablet vertical: `768 x 1024`
* Desktop: `1366 x 768`

Implementation notes:

* Mobile uses stacked hero, visible primary CTA, route preview, and stacked cards.
* Tablet keeps clear hierarchy and avoids tight card compression.
* Desktop shows a competitive two-column hero with route preview and access options close to the first fold.
* The page root uses `overflow-x-hidden`; no intentionally fixed wide element was added.

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
* declare L1 readiness;
* declare M2 readiness.

## Result

```text
LANDING_PAGE_STUDENT_MVP_VISUAL_STANDARD_APPLIED
```

## Next recommended phase

```text
Human visual audit of landing 1D
```
