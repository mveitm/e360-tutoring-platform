# MVP-SALES-PILOT-UI-CAPSULE-4B - Refine post-submit step emphasis and autoreporte draft persistence

## Phase

MVP-SALES-PILOT-UI-CAPSULE-4B - Refine post-submit step emphasis and autoreporte draft persistence.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = c562aa0
```

Last accepted commit:

```text
c562aa0 - MVP-SALES-PILOT-UI-CAPSULE-4A: refine post-submit capsule review state
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio accepted CAPSULE-4A mobile behavior:

* autoreporte options visible;
* per-question feedback visible;
* selected answers visible;
* answered/correct counts visible;
* leaving to Tutoría or DB and returning preserves post-submit state;
* no capsule reset;
* no automatic autoreporte, completion, or continuity.

Requested refinements:

* increase contrast and visual weight for `Paso 1: Cuéntanos cómo te fue`;
* increase contrast and visual weight for `Paso 2: Toma nota de tu resultado`;
* preserve the selected autoreporte option if the student leaves before manually finalizing the capsule.

## Step Visual Emphasis

`Paso 1: Cuéntanos cómo te fue` now uses a stronger contained surface:

* petroleum border;
* soft green/cream/lavender background;
* darker Bexauri text;
* heavier type weight;
* clearer active autoreporte option styling.

`Paso 2: Toma nota de tu resultado` now uses stronger review styling:

* violet border;
* soft lavender/cream background;
* darker violet text;
* heavier type weight.

The changes preserve the mobile-first contained layout and do not add a large new section.

## Autorreporte Draft Persistence

Autorreporte draft persistence uses browser `sessionStorage`, scoped by capsule/StudyLoad id:

```text
bexauri:capsule-autoreporte-draft:<studyLoadId>
```

Only the selected closed option is stored:

* `Me fue bien`;
* `Me costó`;
* `No la terminé`.

No secrets, free text, server draft, or DB mutation were introduced.

## Navigation Out / Return

If the student selects an autoreporte option and leaves through:

* `Volver a tutoría`;
* `Ir DB`;

then returns to the same capsule in the same browser session before manual completion, the selected autoreporte option is restored from `sessionStorage`.

The option is not sent to the server until the student manually presses `Finalizar cápsula`.

## Draft Cleanup

The autoreporte draft is cleared after successful manual completion/autoreporte submission.

The existing answer draft cleanup from earlier phases remains unchanged.

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
Human mobile audit of autoreporte draft persistence and step emphasis
```
