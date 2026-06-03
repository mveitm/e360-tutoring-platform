# MVP-SALES-PILOT-UI-CIRCUIT-1 - First student UI visual and functional circuit closeout

## Phase

MVP-SALES-PILOT-UI-CIRCUIT-1 - Document first visual and functional student UI circuit closeout.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = e1ebed7
```

Last accepted commit:

```text
e1ebed7 - MVP-SALES-PILOT-UI-CAPSULE-5C: refine completed capsule review access
```

Working tree was clean at preflight.

## Accepted Circuit

Mauricio approved the first visual and functional student UI circuit:

```text
LP -> DB -> ST -> matricula M1 -> primera capsula -> responder -> enviar -> feedback -> autorreporte -> finalizar -> revisar capsula completada -> ver siguiente capsula
```

Interpretation:

```text
FIRST_STUDENT_UI_VISUAL_AND_FUNCTIONAL_CIRCUIT_CLOSED
```

The first M1-first UI pass is now closed as an operative base. It is not a declaration of Sales-Ready, MVP-Beta cerrado completo, L1 readiness, M2 readiness, payment readiness, trial readiness, or public pilot readiness.

## Circuit Summary

### 1. LP / Landing Page

Landing v0.1 is accepted as the student entry point.

It:

* introduces Bexauri visually;
* gives a safe entry into the system;
* routes Trial and Suscripcion toward the existing dashboard/safe route;
* does not implement checkout, payment, real trial, or real subscription.

Live debt:

* later PRO audit of landing and visual standard.

### 2. DB / Dashboard

Student Dashboard is accepted as the mobile-first base.

It:

* shows tutoring options;
* presents PAES Matematicas M1 as the main active path;
* keeps M2 and Competencia Lectora visible but non-operational;
* connects `Comenzar Estudio` to Study Page;
* keeps student-facing terminology aligned with `Capsula` / `Capsulas`.

Live debt:

* `Ej.` / `Logro` indicators still need real data when reliable sources exist.

### 3. ST / Study Page

Study Page M1 is accepted across pre-enrollment and after-enrollment states.

It:

* shows pre-enrollment tutoring information;
* supports `Matricularse`;
* shows `Tutoria Activa` after enrollment;
* shows the next capsule with CTA;
* shows completed capsules with `Revisar capsula`;
* keeps `Tutoria Info` and contained mobile-first structure.

### 4. M1 Enrollment

`Matricularse` creates or reactivates the PAES_M1 enrollment for the authenticated student.

Boundaries:

* specific to M1;
* no M2/Lectora activation;
* no StudentAccess lifecycle work;
* no checkout, payment, trial, or subscription.

### 5. First Capsule

The first M1 capsule is visible from Study Page with CTA `Ver capsula`.

If no active cycle/capsule exists, the existing CAPSULE-2 path creates/locates the first PAES_M1 capsule idempotently and narrowly.

It does not execute automatically.

### 6. Capsule Page / Answering

The Capsule Page supports:

* manual `Comenzar`;
* contained question zone;
* chips navigation;
* internal scroll;
* local selected-answer draft persistence;
* `Enviar respuestas` disabled until all questions are answered;
* clear enabled state when ready.

### 7. Submit / Feedback

Manual `Enviar respuestas`:

* saves `mc_submission` evidence;
* shows initial result;
* shows feedback/help per question;
* keeps post-submit state when leaving and returning.

### 8. Autoreporte

Autoreporte is manual.

Options:

* `Me fue bien`;
* `Me costo`;
* `No la termine`.

The selected option persists locally before finalization. No autoreporte is sent automatically.

### 9. Finalizar Capsula

Manual `Finalizar capsula`:

* saves autoreporte;
* completes the capsule through the existing endpoint;
* clears answer and autoreporte drafts;
* shows `Capsula finalizada`;
* does not complete before the click;
* does not add new automatic continuity.

The existing endpoint may preserve pre-existing idempotent continuity behavior; this closeout does not introduce a new continuity mechanism.

### 10. Completed Capsule Review

Completed capsule review is accepted.

It:

* suppresses `Comenzar`;
* suppresses initial instructions;
* keeps answers, feedback, and autoreporte reviewable;
* exposes completed capsules from Study Page via `Capsulas completadas`;
* uses CTA `Revisar capsula`;
* does not restart completed capsules.

### 11. Next Capsule

Study Page shows a pending or in-progress next capsule when it exists.

Completed capsules and the next capsule coexist:

* `Siguiente capsula` remains the primary next action;
* `Capsulas completadas` remains available for review.

No new continuity was added by this closeout.

## Live Debts

1. Improve the `+ paso a paso` affordance inside per-question feedback.
2. Run later PRO audit of landing and the Bexauri visual standard.
3. Replace Dashboard `Ej.` / `Logro` placeholders or minimal indicators with reliable data.
4. Review real progress/logro data sources for Study Page and Dashboard.
5. Prepare extended manual test toward Capsule 10.
6. Define pedagogical quality audit for M1 capsules.
7. Harden visible `Capsula` terminology across any remaining untouched student UI surfaces.
8. Run a full real mobile audit of the end-to-end circuit when preparing the larger test.

## Direction Decisions

* Do not keep polishing LP/DB/ST/Capsule by intuition.
* The base visual and functional student UI circuit is closed.
* The next work should move toward pedagogical quality, multiple-capsule continuity, and extended manual testing.
* Future work must continue under Student Experience-Led Delivery.
* Do not repeat login `/now` tests unless auth/routing changes or something fails.

## Relation To Student Experience-Led Delivery

This closeout is a Student Experience-Led checkpoint.

The accepted circuit is observable by a fictitious student and covers entry, enrollment, capsule work, evidence, feedback, self-report, finalization, review, and the next action.

Future phases should preserve this student-experience spine and only reopen UI polish when tied to a concrete audit, pedagogy, continuity, or extended-test requirement.

## Limits Respected

This phase is documentation-only.

No app code, DB/base de datos, schema, migrations, auth, credentials, login, `/now`, Study Page implementation, Capsule execution, responses, submit, self-report, completion, StudentAccess, checkout, real payment, real trial, functional subscription, staging, production, secrets, or new functionality were touched.

## Next Focus Recommended

Recommended next phase:

```text
MVP-SALES-PILOT-M1-CIRCUIT-2 - Prepare manual M1 multi-capsula test to Capsula 10
```

Other valid routes:

* `MVP-SALES-PILOT-PEDAGOGY-1 - Audit first M1 capsula pedagogical quality and feedback`.
* `MVP-SALES-PILOT-UI-CAPSULE-6 - Refine next-capsula presentation after first completed capsula`.
* `MVP-SALES-PILOT-PRO-AUDIT-1 - PRO audit of LP/visual standard and student circuit`.
