# MVP-SALES-PILOT-UI-CAPSULE-5A - Refine completed Capsule review state and access

## Phase

MVP-SALES-PILOT-UI-CAPSULE-5A - Refine completed CÃ¡psula state and completed-capsule review access.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 753e83a
```

Last accepted commit:

```text
753e83a - MVP-SALES-PILOT-UI-CAPSULE-5: implement manual autoreporte and finalize capsule
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio approved CAPSULE-5 mobile behavior:

* manual autoreporte options visible;
* `Finalizar cÃ¡psula` disabled until autoreporte is selected;
* manual finalize works;
* `Ir DB` works;
* CÃ¡psula becomes `completed`;
* no automatic self-report before the click;
* no automatic completion before the click;
* existing idempotent continuity was observed and accepted;
* mobile remained clear and contained.

Requested refinements:

* merge `CÃ¡psula finalizada` into the first CÃ¡psula header container;
* include `Tu autorreporte quedÃ³ guardado...` in the first CÃ¡psula header container;
* suppress initial instructions when the CÃ¡psula is completed;
* suppress `Comenzar` when the CÃ¡psula is completed;
* allow returning from TutorÃ­a to review completed capsules;
* verify draft cleanup.

## Completed State

When `/now/study-loads/[id]` opens a completed CÃ¡psula, the first header container now shows:

* `CÃ¡psula finalizada`;
* `Tu autorreporte quedÃ³ guardado. Puedes revisar tu resultado o volver a la tutorÃ­a.`;
* the saved autoreporte when available;
* `Volver a tutorÃ­a`;
* `Ir DB`.

The duplicated post-finalization card inside the answer form was removed for persisted completed state.

## Header Changes

The CÃ¡psula header now adapts to `studyLoad.status === "completed"` in read-only mode.

For completed capsules:

* the status badge becomes `CÃ¡psula finalizada`;
* the message is inside the header container;
* navigation is available from the same header surface;
* the student sees review context before feedback/questions.

## Instructions / Comenzar Suppressed

For completed capsules:

* initial instructions are not rendered;
* the `Comenzar` CTA is not rendered;
* the UI does not suggest the completed CÃ¡psula can be restarted.

The answering flow for pending/in-progress capsules was preserved.

## Completed Capsule Review Access

`/study/paes-m1` now treats completed capsules as reviewable learning evidence:

* if the current visible capsule is completed, the card label becomes `CÃ¡psula completada`;
* the CTA becomes `Revisar cÃ¡psula`;
* if existing continuity exposes a next pending/in-progress capsule, the latest completed capsule is still shown as a secondary review card;
* the review card links to `/now/study-loads/[id]`.

Completed capsules open in read-only review mode with selected answers and feedback visible.

## Draft Cleanup

CAPSULE-5 already clears local answer and autoreporte drafts after successful manual finalize:

* `bexauri:capsule-draft:<studyLoadId>`;
* `bexauri:capsule-autoreporte-draft:<studyLoadId>`.

CAPSULE-5A did not add new local draft storage. The completed review mode relies on persisted evidence and completed status, not local drafts.

## Limits Respected

No new DB mutation, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, automatic re-submit, automatic completion, completed-capsule restart, new automatic continuity, new automatic capsule creation, M2/Lectora activation, checkout, payment, real trial, functional subscription, staging, production, secrets, official PAES score claim, or definitive mastery claim was introduced.

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
Human mobile audit of completed CÃ¡psula review state
```
