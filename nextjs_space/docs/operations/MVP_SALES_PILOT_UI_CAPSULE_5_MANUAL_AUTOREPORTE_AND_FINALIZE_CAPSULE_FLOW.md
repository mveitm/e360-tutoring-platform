# MVP-SALES-PILOT-UI-CAPSULE-5 - Manual autoreporte and finalize Capsule flow

## Phase

MVP-SALES-PILOT-UI-CAPSULE-5 - Implement manual autoreporte and finalize Cápsula flow.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 2c98f48
```

Last accepted commit:

```text
2c98f48 - MVP-SALES-PILOT-UI-CAPSULE-4D: refine feedback visibility and step-by-step affordance
```

Working tree was clean at preflight.

## Human Authorization

Mauricio explicitly authorized:

```text
AUTORIZO_CAPSULE_5_AUTOREPORTE_MANUAL_Y_FINALIZAR_CAPSULA
```

## Autorreporte Behavior

After manual answer submit, the student sees:

* `Paso 1: Cuéntanos cómo te fue`;
* closed autoreporte options:
  * `Me fue bien`;
  * `Me costó`;
  * `No la terminé`;
* manual `Finalizar cápsula` action.

The button remains disabled until the student selects one autoreporte option.

No autoreporte is sent automatically.

## Finalizar Cápsula

The UI uses the existing manual endpoint:

```text
POST /api/study-loads/[id]/complete
```

The endpoint:

* validates the authenticated student ownership chain;
* validates the closed autoreporte option server-side;
* creates one `Response` row with `responseType="answer"`;
* marks the StudyLoad as `completed`;
* marks the active TutoringSession as `completed`;
* updates enrollment `lastActivityAt`.

The UI no longer redirects automatically to `/now` after success. It stays in the Capsule Page and shows:

```text
Cápsula finalizada
Tu autorreporte quedó guardado. Puedes volver a la tutoría para revisar tu avance.
```

It also exposes:

* `Volver a tutoría`;
* `Ir DB`.

## Continuity

The existing complete endpoint already includes a best-effort continuity call:

```text
prepareNextStudyLoadAfterCompletion
```

This behavior existed before CAPSULE-5 and was not introduced by this phase.

The helper is idempotent for the next load title: it returns `skipped_existing` if a pending, in-progress, or completed next StudyLoad already exists for the same cycle/title. CAPSULE-5 did not add a new continuity mechanism, new adaptive logic, new scoring, or a new endpoint.

## Draft Cleanup

After successful manual completion, the client clears:

* answer draft key: `bexauri:capsule-draft:<studyLoadId>`;
* autoreporte draft key: `bexauri:capsule-autoreporte-draft:<studyLoadId>`.

## Copy / Terminology

The touched complete endpoint visible errors now use `Cápsula` terminology instead of `Carga`.

Internal model names and route names were not renamed.

## Limits Respected

No automatic autoreporte, automatic completion, new continuity automation, new capsule creation beyond the pre-existing complete endpoint behavior, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, M2/Lectora activation, checkout, payment, real trial, functional subscription, staging, production, secrets, official PAES score claim, or definitive mastery claim was introduced.

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
Human mobile audit of manual autoreporte and finalize Cápsula
```
