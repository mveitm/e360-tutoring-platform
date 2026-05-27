# MVP-SALES-NOW-PILOT-1B - Design M1-first /now copy and structure

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-NOW-PILOT-1B - Design narrowed M1-first /now pilot copy and structure
```

Type:

```text
Design/documentation only / no implementation / no runtime / no DB.
```

Purpose:

Design the minimum `/now` copy and structure adjustments required before the narrowed M1-first closed-pilot dry-run.

This phase defines what `/now` should communicate so the student does not confuse the pilot with public Sales-Ready, full L1/M1/M2 triad, active L1 or M2 tutoring, paid subscription, public trial, PAES score prediction, mastery/theta/adaptive AI claims, or guaranteed improvement.

This phase does not implement `/now`, edit app code, run browser/runtime, touch DB, create students/enrollments/StudyLoads/access rows, activate payment/trial/access, approve product/student use, declare PAES_L1 ready, declare PAES_M2 ready, declare Sales-Ready, or execute the pilot.

## 2. Baseline and Context Gate summary

Baseline:

```text
HEAD = origin/main = origin/HEAD = 931e21c
```

Latest accepted commit:

```text
931e21c - MVP-SALES-NOW-PILOT-1A: audit now for M1 pilot
```

Context Gate read:

* `PHASE_LOG.md` tail.
* `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_EXTERNAL_AUDIT_1_INTEGRATE_3_STUDENT_AUDIT_AND_ROADMAP_REDIRECT.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_SCOPE_1_LOCK_CLOSED_3_STUDENT_PILOT_SCOPE.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_1_CLOSED_PILOT_ACCESS_PAYMENT_TRIAL_BOUNDARY.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_2_MINIMAL_CLOSED_PILOT_ACCESS_REGISTER_ADMIN_SURFACE.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_3_CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE_AND_ADMIN_SURFACE_READINESS.md`.
* `nextjs_space/docs/operations/templates/CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE.md`.
* `nextjs_space/docs/operations/MVP_SALES_NOW_PILOT_1A_AUDIT_NOW_FOR_NARROWED_M1_FIRST_PILOT.md`.
* `nextjs_space/docs/operations/MVP_BETA_SCOPE_2_SALES_READY_ACCEPTANCE_CRITERIA_AND_MACRO_ROADMAP.md`.
* `nextjs_space/docs/operations/MVP_BETA_TARGET_1_AUTONOMOUS_SALES_READY_TARGET_AND_HANDOFF_PROPAGATION.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_BLOCK_7_PEDAGOGICAL_LAYER_ANCHOR.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.
* `nextjs_space/docs/product/PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md`.
* Focused read-only searches for student journey, product UI/brand, closed-lab copy, `/now`, dashboard, M1 pilot, support/failure, and copy boundaries.

Read-only code inspection:

* `nextjs_space/app/now/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`.
* `nextjs_space/lib/study-load-content.ts`.
* `nextjs_space/lib/study-load-continuity.ts`.

No env files, secrets, DB URLs, tokens, cookies, headers, backups, runtime, browser, tests, build, Prisma, SQL, or DB commands were used.

## 3. Starting point from MVP-SALES-NOW-PILOT-1A

Prior fit assessment:

```text
NOW_NEEDS_COPY_OR_STRUCTURE_ADJUSTMENT_BEFORE_DRY_RUN
```

Starting findings:

* `/now` is structurally close for M1-first.
* `/now` selects one active enrollment and one current cycle.
* Single-program behavior is acceptable only for honest M1-only scope.
* Full triad remains blocked.
* `/now` currently has no access/trial/payment display.
* `/now` currently makes no public Sales-Ready claim.
* Current copy does not explicitly label the experience as M1-only closed pilot, no-payment closed lab, or reduced scope.
* Current fallback copy can imply activation/review without a closed-pilot support path.

## 4. UX/copy design goal

For the first M1-first pilot, `/now` must make the student understand:

```text
You are in a closed M1 pilot, not a public product launch.
Your current work is PAES M1 only.
L1 and M2 are not active in this pilot.
This is not a paid subscription or public trial.
Your next action is the visible M1 StudyLoad.
Your work leaves evidence for review.
No PAES score, mastery, theta, adaptive AI, or guaranteed improvement is promised.
```

Tone requirements:

* calm;
* short;
* direct;
* student-friendly;
* honest about limits;
* focused on the next action;
* not administrative where a learning-oriented phrase is enough.

## 5. Proposed `/now` structure

Minimum target structure:

1. Pilot status card.
2. Current tutoring/program card.
3. Next action section.
4. In-progress section.
5. Completed work/evidence section.
6. Support/failure note.
7. Scope boundary note.

Recommended placement:

* Keep the existing `Bexauri` heading and `¿Qué me toca ahora?` framing.
* Add a compact pilot status card directly below the heading.
* Keep the existing program card, but adjust label/copy to clarify `PAES M1` and closed-pilot scope.
* Keep the current pending/in-progress/completed StudyLoad sections and links.
* Add a small boundary/support note near the bottom, visible without acting as a blocker.

Implementation should prefer copy/structure changes in `nextjs_space/app/now/page.tsx` without changing StudyLoad mechanics.

## 6. Exact copy recommendations

The following Spanish copy candidates are approved for future implementation design. They are not implemented in this phase.

### Pilot status card title

```text
Piloto cerrado PAES M1
```

### Pilot status card body

```text
Estás usando una versión cerrada de Bexauri para trabajar actividades de PAES M1. Este piloto no es una suscripción pública ni una versión comercial completa.
```

### M1-only scope note

```text
En este piloto tu trabajo activo es solo PAES M1.
```

### L1/M2 not-active note

```text
Competencia Lectora L1 y PAES M2 no están activos en este piloto.
```

### Next action heading

```text
Tu próxima actividad M1
```

### Pending StudyLoad CTA context

```text
Abre la actividad cuando estés listo. Tus respuestas quedarán guardadas como evidencia de trabajo.
```

### Pending StudyLoad action labels

Preferred:

```text
Ver actividad
Empezar
```

No change required if current labels remain.

### In-progress CTA context

```text
Continúa la actividad y ciérrala cuando termines. Si ya enviaste respuestas, falta tu autorreporte.
```

### Completed evidence section

Heading:

```text
Actividades registradas
```

Body candidate:

```text
Tu trabajo quedó guardado como evidencia para revisión. Esto no es un puntaje PAES ni un diagnóstico automático.
```

### No active StudyLoad/fallback state

For no active M1 StudyLoad while the pilot program exists:

```text
No tienes una actividad M1 disponible en este momento. Si esto ocurre durante el piloto, avísanos por el canal de soporte acordado.
```

### No active program/enrollment fallback

```text
Tu cuenta existe, pero todavía no tiene activo el piloto cerrado PAES M1. Si esperabas participar, avísanos por el canal de soporte acordado.
```

### No open current cycle fallback

```text
Tu piloto PAES M1 está registrado, pero aún no hay una actividad abierta. Si esperabas trabajar ahora, avísanos por el canal de soporte acordado.
```

### Support/failure note

```text
Si algo no coincide con lo acordado para el piloto, escríbenos por el canal de soporte definido. No intentes crear otra cuenta.
```

### No-payment/no-public-trial boundary

```text
Este piloto cerrado no activa pago, suscripción ni trial público.
```

### Scope boundary note

```text
Este piloto ayuda a revisar el circuito de trabajo M1. No representa una oferta completa L1/M1/M2.
```

### Forbidden terms and claims for `/now`

Do not use:

* `Sales-Ready`;
* `suscripción activa`;
* `trial público`;
* `cobertura PAES completa`;
* `diagnóstico automático`;
* `puntaje PAES`;
* `dominio` or `mastery`;
* `theta`;
* `IA adaptativa`;
* `mejora garantizada`;
* `preparación completa`.

## 7. Access/trial/payment display decision

Decision:

```text
SHOW_COARSE_CLOSED_PILOT_STATUS_ONLY
```

Meaning:

* `/now` should show only that this is a closed M1 pilot.
* `/now` should not show payment, subscription, or trial states.
* `/now` should not imply paid access.
* `/now` should not imply public trial access.
* Detailed access source-of-truth remains in the private register/admin workflow.
* The coarse status should be copy-only for the first dry-run unless a later phase explicitly designs data binding.

Rationale:

The first dry-run needs honest student orientation more than a full access/payment UI. Showing detailed access/trial/payment state would imply functionality that is not implemented and would risk converting the no-payment closed lab into a commercial claim.

## 8. State-specific behavior

### Student with no active program/enrollment

Show the no active program fallback:

```text
Tu cuenta existe, pero todavía no tiene activo el piloto cerrado PAES M1. Si esperabas participar, avísanos por el canal de soporte acordado.
```

Do not say trial, subscription, Sales-Ready, payment, L1, or M2.

### Student with M1 active but no current cycle

Show program context and:

```text
Tu piloto PAES M1 está registrado, pero aún no hay una actividad abierta. Si esperabas trabajar ahora, avísanos por el canal de soporte acordado.
```

Avoid "Completa tu diagnóstico para empezar" unless an actual diagnostic flow exists for the pilot.

### Student with M1 active and pending StudyLoad

Show:

* pilot status card;
* current program card for PAES M1;
* next action heading `Tu próxima actividad M1`;
* pending StudyLoad card;
* `Ver actividad` and `Empezar` actions;
* evidence note that answers are saved as work evidence.

### Student with M1 in-progress StudyLoad

Show:

* pilot status card;
* current program card;
* in-progress section;
* clear continuation/finalization copy;
* self-report reminder only when responses are already saved.

Do not frame the student as blocked by tutor review.

### Student with completed StudyLoad(s)

Show:

* completed work/evidence section;
* self-report if available;
* copy that work is saved as evidence for review;
* no score, diagnostic, mastery, theta, or improvement claim.

### Student with no next StudyLoad

If the cycle has history but no active next load, show:

```text
Tu última actividad quedó registrada. Estamos revisando el siguiente paso del piloto M1. Si necesitas ayuda, usa el canal de soporte acordado.
```

This copy is acceptable only for closed-lab use. It should not become a normal public product waiting state.

### Student blocked/not in pilot

If the future implementation can identify this state, show:

```text
No tienes acceso activo a este piloto cerrado. Si crees que esto es un error, escríbenos por el canal de soporte acordado.
```

Do not expose internal access fields, private register data, payment details, or admin-only reasons.

### Accidental L1/M2 enrollment visible or not visible

For the first pilot, `/now` should not present L1 or M2 as active. If a participant accidentally has L1 or M2 as the most recent active enrollment, implementation should avoid implying that L1/M2 are part of the pilot.

Minimum design rule:

```text
If selected enrollment is not PAES_M1 during the M1-first pilot, /now should not show it as a valid pilot path without a separate authorization.
```

Future implementation may either:

* show a safe support fallback; or
* add an explicit M1-only guard for the pilot mode.

No L1/M2 student/product readiness is authorized by this design.

## 9. Implementation readiness notes

Likely future implementation scope:

* `nextjs_space/app/now/page.tsx`;
* optional local helper/copy constants if useful and narrowly scoped;
* no DB/schema changes;
* no Prisma changes;
* no access/payment/trial implementation;
* no multi-program dashboard unless separately authorized;
* preserve existing StudyLoad start/response/complete links and status handling.

The future implementation should likely:

* add a pilot status card;
* adjust no-program and no-cycle fallback copy;
* adjust next action heading from generic activity language to M1-specific language;
* add a short scope boundary note;
* keep completed work visible;
* avoid changing StudyLoad lifecycle semantics.

Must not touch:

* tests unless separately authorized;
* Prisma schema;
* package files;
* DB seed/fixture scripts;
* StudyLoad content registry;
* StudyLoad continuity;
* payment/trial/access activation logic;
* production/staging runtime.

## 10. Acceptance criteria for future implementation

Future implementation is accepted only if:

* `/now` clearly says M1 closed pilot;
* `/now` does not imply L1 or M2 are active;
* `/now` does not imply payment, trial, or subscription;
* `/now` keeps the next action clear;
* `/now` keeps completed work visible;
* fallback state is honest and includes support path;
* no forbidden claims appear;
* existing StudyLoad start/response/complete links are preserved;
* no DB/schema changes are made;
* no M1 content changes are made;
* no M1 continuity changes are made;
* no real student data is committed;
* no product/student use is approved by the implementation itself.

## 11. Recommended next phase

Recommended next phase:

```text
MVP-SALES-NOW-PILOT-1C - Implement narrowed M1-first /now pilot adjustments
```

Reason:

Implementation is still needed because current `/now` does not explicitly identify the M1-only closed pilot, no-payment/no-public-trial boundary, L1/M2 exclusion, or support/failure path. The next phase should be a narrow UI copy/structure implementation, not a broader dashboard, access, payment, trial, DB, or pilot execution phase.

## 12. Phase gate classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go, with dependency on /now pilot experience
Sales-ready relevance: direct/high
Dependency: MVP-SALES-NOW-PILOT-1A closed at 931e21c
What it advances: design of /now copy/structure for narrowed M1-first pilot
What it does not advance: code, DB, runtime verification, access activation, payment/trial, pilot execution
Priority verdict: APPROVED_NOW_PILOT_DESIGN
Authorization status: executed only after Mauricio authorization
```

## 13. Non-goals

This phase does not:

* edit app code;
* edit tests;
* edit Prisma schema;
* edit package files;
* run tests/build;
* run Prisma;
* run SQL;
* run DB commands;
* create fixtures;
* create students;
* create StudentAccess rows;
* create enrollments;
* create LearningCycles;
* create StudyLoad rows;
* activate trial;
* activate payment;
* create subscription state;
* run browser/runtime/dev server;
* touch staging or production;
* inspect `.env`, database URLs, raw env values, secrets, tokens, passwords, cookies, headers, or backups;
* commit real student data;
* approve student/product use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute a pilot.

## 14. Result marker

```text
MVP_SALES_NOW_PILOT_1B_NOW_COPY_STRUCTURE_DESIGNED
```
