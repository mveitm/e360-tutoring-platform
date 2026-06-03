# MVP-SALES-PILOT-UI-CAPSULE-4A - Refine post-submit Cápsula review state and autoreporte persistence

## Phase

MVP-SALES-PILOT-UI-CAPSULE-4A - Refine post-submit Cápsula review state and autoreporte persistence.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 59f351d
```

Last accepted commit:

```text
59f351d - MVP-SALES-PILOT-UI-CAPSULE-4: support controlled first capsule submit
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio accepted CAPSULE-4 mobile behavior:

* manual capsule entry and `Comenzar`;
* manual answer selection;
* gated manual `Enviar respuestas`;
* visible answered count and correct count when available;
* per-question feedback/help;
* local draft cleanup after submit;
* capsule remains `in_progress`;
* no automatic completion or continuity.

Requested refinements:

* replace `Respuestas enviadas` with `Paso 1: Cuéntanos cómo te fue`;
* add `Paso 2: Toma nota de tu resultado` before the question/feedback list;
* when the student leaves to Tutoría or DB after submit but before autoreporte/completion, returning to the capsule must restore the post-submit review state.

## Post-Submit Copy

The post-submit state now uses:

```text
Paso 1: Cuéntanos cómo te fue
```

for the autoreporte block.

Before the question and feedback list, the UI now shows:

```text
Paso 2: Toma nota de tu resultado
```

with short guidance to review answers and step-by-step help before closing the capsule.

## Persistence

Post-submit persistence is based on existing saved evidence, not browser-only state.

`/now/study-loads/[id]/page.tsx` already reads the latest `mc_submission` response for the capsule and rebuilds:

* `initialAnswers`;
* `initialFeedback`.

The client form initializes its feedback state from `initialFeedback`. Therefore, if the student leaves through `Volver a tutoría` or `Ir DB` after submit and returns before autoreporte/completion, the page renders the post-submit review state again.

No new DB mutation, schema, table, or localStorage/sessionStorage dependency was introduced for this post-submit state.

## Autorreporte

The existing manual autoreporte flow was reused.

It remains under `Paso 1: Cuéntanos cómo te fue` with the existing closed options:

* `Me fue bien`;
* `Me costó`;
* `No la terminé`.

The existing `Finalizar cápsula` button remains manual and disabled until the student selects an option.

No autoreporte is sent automatically.

## Feedback / Result

The feedback/review area continues to show:

* answered count;
* correct count when available;
* selected alternatives;
* per-question feedback/help when available.

The review heading now makes the pedagogical order explicit before the list.

## Limits Respected

No automatic submit, automatic answers, automatic autoreporte, automatic completion, new continuity automation, new capsule creation, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, M2/Lectora activation, checkout, payment, real trial, functional subscription, staging, production, secrets, official PAES score claim, or definitive mastery claim was introduced.

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
Human mobile audit of post-submit review and autoreporte pending state
```
