# MVP-SALES-PILOT-UI-DASHBOARD-1D - Refine study CTA warmth and M1 tutoring card copy

## Phase

MVP-SALES-PILOT-UI-DASHBOARD-1D - Refine study CTA warmth and M1 tutoring card copy.

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 77c452f
Latest accepted commit = 77c452f - MVP-SALES-PILOT-UI-DASHBOARD-1C: refine mobile dashboard tutoring indicators
Working tree expected clean.
```

## Human audit inherited

Mauricio accepted the DASHBOARD-1C mobile-first dashboard refinement and requested two minor adjustments:

1. Make the `Comenzar Estudio` CTA warmer, more welcoming, and more visually aligned with Bexauri by using a soft fuchsia light halo and an orange/fuchsia/red gradient.
2. Replace the PAES Matemáticas M1 tutoring card description with:

```text
Fortalece tus destrezas en los 4 ejes de Matemáticas M1
```

## CTA visual adjustment

The `Comenzar Estudio` CTA on `/now` now uses:

* warm orange/fuchsia/red gradient treatment;
* controlled fuchsia halo/shadow;
* warm micro-light detail;
* rounded, restrained, semi high-tech / semi gaming styling;
* no payment, checkout, pricing, or commercial purchase treatment.

The same visual family was applied to the compact M1 card CTA so the action language remains coherent without making the dashboard feel like checkout.

## M1 copy updated

The PAES Matemáticas M1 tutoring card description now reads:

```text
Fortalece tus destrezas en los 4 ejes de Matemáticas M1
```

The existing tutoring indicators were not changed:

* Estado.
* Ej.
* Logro.

M2 and Competencia Lectora copy and behavior remain unchanged.

## Responsive

Prepared for human audit at:

* Mobile standard: `390 x 844`.
* Tablet vertical: `768 x 1024`.
* Desktop: `1366 x 768`.

Responsive expectations:

* CTA remains visible and legible.
* CTA highlights softly without looking aggressive or commercial.
* M1 card copy fits the compact tutoring carousel.
* No intentional horizontal overflow outside the tutoring carousel.

## Build

Required:

```text
npm.cmd --prefix nextjs_space run build
```

Expected result:

```text
Passed.
```

## Limits respected

This phase is UI-only and minor safe repair.

No changes were made to:

* DB/base de datos.
* Schema.
* Migrations.
* Auth architecture.
* Credentials.
* StudentAccess lifecycle.
* Enrollment.
* M2 functional activation.
* Competencia Lectora functional activation.
* Automatic StudyLoad execution.
* Automatic `Empezar`.
* Responses.
* Submit.
* Self-report.
* Completion.
* Automatic continuity.
* Checkout.
* Real payment.
* Real trial.
* Complete functional subscription.
* Staging.
* Production.
* Secrets.

## Next recommended phase

```text
Human mobile audit of dashboard 1D
```

## Result marker

```text
STUDENT_DASHBOARD_CTA_AND_M1_CARD_COPY_REFINED
```
