# MVP-SALES-PILOT-UI-CAPSULE-4 - Controlled submit of first Cápsula and initial feedback state

## Phase

MVP-SALES-PILOT-UI-CAPSULE-4 - Controlled submit of first Cápsula and initial feedback state.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = d1206a4
```

Last accepted commit:

```text
d1206a4 - MVP-SALES-PILOT-UI-CAPSULE-3A: preserve capsule answer draft
```

Working tree was clean at preflight.

## Human Authorization

Mauricio explicitly authorized:

```text
AUTORIZO_CAPSULE_4_SUBMIT_CONTROLADO_PRIMERA_CAPSULA
```

## Existing Submit Behavior

The existing manual `Enviar respuestas` action posts to:

```text
POST /api/study-loads/[id]/responses
```

The endpoint:

* requires authentication;
* validates ownership through the student/enrollment/cycle/capsule chain;
* requires the capsule to be `in_progress`;
* validates the submitted content key/version and option labels against the registry;
* creates or replaces one `Response` row with `responseType="mc_submission"`;
* returns answered count, correct count when an answer key exists, and initial feedback items.

The endpoint does not change `StudyLoad.status`, does not call `/complete`, does not create a self-report, and does not create continuity.

## Changes Applied

The Capsule answer form now presents the successful submit state as an initial result state:

* success message changed to `Respuestas enviadas`;
* post-submit summary title changed to `Resultado inicial de esta cápsula`;
* the UI now states that answers were saved and invites the student to review the initial result and per-question help;
* defensive/unrequested copy about PAES score or full level was removed;
* the existing manual closure/self-report area remains a separate action after review;
* visible endpoint error messages for the touched submit route now use `Cápsula` terminology.

No automatic submit, automatic answers, automatic completion, automatic self-report, or new continuity behavior was added.

## Evidence Saved

Controlled submit saves one `mc_submission` response payload for the active in-progress tutoring session.

Stored evidence includes:

* content key and version;
* capsule id;
* submitted timestamp;
* selected alternatives;
* answer-key comparison when available;
* authored feedback ids when available;
* summary counts.

## Feedback / Initial Result

After manual submit, the UI shows:

* `Respuestas enviadas`;
* answered count;
* correct count when available;
* per-question feedback returned by the existing registry-backed feedback builder;
* guidance that the result helps prepare the next study step.

No official PAES score, mastery claim, adaptive claim, or new scoring engine was introduced.

## Draft Cleanup

The local browser draft introduced in CAPSULE-3A remains cleared after successful manual submit and feedback.

## Limits Respected

No automatic answers, automatic submit, automatic self-report, new automatic completion, new continuity automation, new capsule creation, new adaptive logic, official PAES scoring, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, M2/Lectora activation, checkout, payment, real trial, functional subscription, staging, production, secrets, Sales-Ready declaration, MVP-Beta cerrado completo declaration, or L1/M2 readiness declaration was introduced.

The existing `/complete` endpoint still exists as a separate manual closure action. This phase did not modify it.

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
Human mobile audit of first Cápsula submit and initial feedback
```
