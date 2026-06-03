# MVP-SALES-PILOT-UI-CAPSULE-4D - Refine post-submit feedback visibility and step-by-step affordance

## Phase

MVP-SALES-PILOT-UI-CAPSULE-4D - Refine post-submit feedback visibility and step-by-step affordance.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = f941a59
```

Last accepted commit:

```text
f941a59 - MVP-SALES-PILOT-UI-CAPSULE-4C: improve post-submit feedback discoverability
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio approved CAPSULE-4C mobile behavior:

* Paso 1 visible and clear;
* `Paso 2: Revisa tu resultado`;
* notebook guidance text;
* `Desliza para revisar...` visible;
* autoreporte remains manual;
* no automatic completion or continuity;
* mobile clear and contained.

Requested refinements:

* replace the current visual arrow with a clearer directional arrow;
* suppress `Ver feedback por pregunta`;
* make per-question feedback easier to find;
* reduce the vertical height of Paso 1;
* replace the autoreporte prompt with `¿Cómo te fue?`;
* add `+ paso a paso` inside each initial feedback block.

## Texts Suppressed

The Paso 1 block no longer shows:

* `Tus respuestas quedaron guardadas. Antes de cerrar esta cápsula, elige cómo te fue.`;
* `Este resultado te ayuda a preparar el siguiente paso de estudio.`;
* `Selecciona una opción para dejar tu autorreporte.`

## Copy Updated

The autoreporte prompt now reads:

```text
¿Cómo te fue?
```

The approved post-submit review copy remains:

```text
Paso 1: Cuéntanos cómo te fue
Paso 2: Revisa tu resultado
Toma notas en tu cuaderno de lo que hiciste bien y de lo necesitas reforzar
```

## Feedback Discoverability

The `Paso 2` cue keeps:

```text
Desliza para revisar tu feedback por pregunta.
```

The previous `Ver feedback por pregunta` anchor was removed.

The chevron-like cue was replaced by a contained directional down arrow so it reads as scroll guidance, not a dropdown control.

Paso 1 was made more compact through reduced padding, spacing, and copy removal so Paso 2 and the beginning of feedback are closer in the post-submit mobile view.

## `+ paso a paso`

Each initial per-question feedback block now includes a small circular `+` affordance with the text:

```text
paso a paso
```

When authored complete feedback already exists, the affordance reuses the existing local disclosure semantics and shows that explanation.

When authored complete feedback does not exist, the affordance remains visual/non-destructive and does not mutate state or generate new feedback.

## Limits Respected

No automatic autoreporte, automatic completion, new continuity automation, automatic submit, automatic answers, new capsule creation, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, M2/Lectora activation, checkout, payment, real trial, functional subscription, staging, production, secrets, official PAES score claim, or definitive mastery claim was introduced.

## Build

Verification command:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Next Recommended Phase

```text
Human mobile audit of Capsule 4D feedback visibility
```
