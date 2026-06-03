# MVP-SALES-PILOT-UI-CAPSULE-3A - Preserve capsule answer draft and refine submit-ready visual state

## Phase

MVP-SALES-PILOT-UI-CAPSULE-3A - Preserve capsule answer draft and refine submit-ready visual state.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 1aba19e
```

Last accepted commit:

```text
1aba19e - MVP-SALES-PILOT-UI-CAPSULE-3: refine post-start capsule answering layout
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio accepted Capsule Page 3 as the base for mobile and requested:

* clearer visual state when `Enviar respuestas` becomes enabled;
* preserving selected alternatives when the student leaves through `Volver a tutoría` or `Ir DB` and returns before submit.

## Draft Persistence Strategy

Draft persistence uses browser `sessionStorage`, scoped by capsule/StudyLoad id:

```text
bexauri:capsule-draft:<studyLoadId>
```

Only selected alternatives are stored:

```text
{ [itemKey]: optionLabel }
```

The restore step validates that stored item keys and option labels still exist in the current capsule before applying them.

No server-side draft and no DB mutation were introduced.

## Submit Ready Visual State

When responses are incomplete:

* `Enviar respuestas` remains disabled.
* The button uses a muted gray/blue disabled state.
* The progress line shows how many answers are missing.

When all questions are answered:

* `Enviar respuestas` remains the action label.
* The button changes to a warm Bexauri gradient with a soft halo.
* The progress line changes to `Listo para enviar`.

No submit is triggered automatically.

## Navigation Out / Return

If the student selects alternatives and navigates away through:

* `Volver a tutoría`;
* `Ir DB`;

then returns to the same capsule in the same browser session, selected alternatives are restored from `sessionStorage`.

## Draft Cleanup

The local draft is cleared when:

* the existing manual submit succeeds and server feedback is returned;
* submitted feedback is already available.

## Limits Respected

No automatic submit, automatic answers, automatic completion, automatic self-report, new continuity automation, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, M2/Lectora activation, checkout, payment, real trial, functional subscription, staging, production, secrets, or DB draft mutation were introduced.

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
Human mobile audit of answer draft persistence and submit-ready state
```
