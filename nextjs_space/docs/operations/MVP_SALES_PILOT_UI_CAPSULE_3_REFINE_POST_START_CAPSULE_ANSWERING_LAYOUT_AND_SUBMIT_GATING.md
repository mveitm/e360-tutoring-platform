# MVP-SALES-PILOT-UI-CAPSULE-3 - Refine post-start Cápsula answering layout and submit gating

## Phase

MVP-SALES-PILOT-UI-CAPSULE-3 - Refine post-start Cápsula answering layout and submit gating.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 9c34881
```

Last accepted commit:

```text
9c34881 - MVP-SALES-PILOT-UI-CAPSULE-2A: refine capsule viewer navigation and CTA
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio partially accepted Capsule Page 2A.

Keep:

* Bexauri header.
* Capsule navigation footer.
* `Volver a tutoría` and `Ir DB`.

Requested post-start refinement:

* After manual `Comenzar`, the contained zone must focus on answering.
* Add a fixed/on-top question navigation and submit container.
* Keep `Enviar respuestas` inactive until all questions have a selected answer.
* Keep questions, MC options, and existing feedback inside the scroll area.

## Before Comenzar

The viewer keeps the 2A pre-start behavior:

* Header Bexauri remains visible.
* Footer navigation remains visible.
* The `Cápsula PAES_M1` container remains visible.
* CTA `Comenzar` remains manual.
* Capsule status remains visible.
* No automatic start is triggered.

## After Comenzar

When the capsule is `in_progress`, the viewer hides the introductory capsule card so the contained area is focused on answering.

The answer form renders:

* a sticky top container;
* answered/total progress;
* question chips linking to each question;
* `Enviar respuestas` in the top container;
* the questions and MC options below.

## Top Container

The top container is compact and sticky inside the contained scroll area.

It shows:

* `Responder cápsula`;
* answered/total count;
* a progress bar;
* numbered question chips;
* `Enviar respuestas`.

## Question Navigation

Question navigation is intentionally minimal:

* numbered chips;
* answered chips use a different visual state;
* chips anchor to the corresponding question in the current list architecture.

No new complex paging model was introduced.

## Submit Gating

`Enviar respuestas` now remains disabled until:

```text
answeredCount === totalItemCount
```

Submission still uses the existing manual `handleSubmit` path and existing endpoint:

```text
POST /api/study-loads/[id]/responses
```

No submit runs automatically.

## Scroll Container

The capsule page keeps the existing `100dvh` shell with:

* header outside the scroll;
* footer outside the scroll;
* internal scroll area between them.

Questions and alternatives render inside that internal area.

## Feedback

No new feedback pedagogy was invented.

Existing feedback behavior is preserved:

* feedback appears only after the existing response flow returns it;
* per-question feedback uses the existing feedback payload;
* completion/self-report remains a separate manual step.

## Limits Respected

No new DB mutation outside existing manual actions was added.

No schema, migrations, auth architecture, credentials, StudentAccess lifecycle, enrollment creation, M2/Lectora activation, automatic capsule start, automatic `Comenzar`, automatic answer selection, automatic responses, automatic submit, automatic self-report, automatic completion, new continuity automation, new scoring, new full feedback pedagogy, checkout, payment, real trial, functional subscription, staging, production, secrets, Sales-Ready declaration, MVP-Beta cerrado completo declaration, or L1/M2 readiness declaration was introduced.

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
Human mobile audit of post-start Cápsula answering layout
```
