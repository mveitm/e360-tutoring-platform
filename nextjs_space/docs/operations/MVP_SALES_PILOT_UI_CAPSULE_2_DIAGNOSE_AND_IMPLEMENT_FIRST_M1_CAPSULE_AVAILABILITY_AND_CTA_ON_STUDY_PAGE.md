# MVP-SALES-PILOT-UI-CAPSULE-2 — Diagnose and implement first M1 cápsula availability and CTA on Study Page

Continuity phrase: Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.

## Phase

```text
MVP-SALES-PILOT-UI-CAPSULE-2 — Diagnose and implement first M1 cápsula availability and CTA on Study Page
```

Level: C/D with conditional protected data mutation.

Human authorization:

```text
AUTORIZO_CAPSULE_2_PRIMERA_CAPSULA_M1_VISIBLE_CON_CTA
```

Result marker:

```text
FIRST_M1_CAPSULE_VISIBLE_WITH_CTA_FROM_STUDY_PAGE
```

## Baseline

Expected and observed baseline:

```text
HEAD = origin/main = origin/HEAD = 6cca23a
Latest accepted commit = 6cca23a — MVP-SALES-PILOT-UI-CAPSULE-1: refine capsule viewer entry
Working tree clean before edits.
```

## Inherited Human Audit

`MVP-SALES-PILOT-UI-CAPSULE-1` failed human audit because Study Page did not show enough first capsule information or a visible CTA in the audited state.

Required visible elements:

* first/siguiente cápsula;
* title;
* status;
* brief purpose;
* CTA `Ver cápsula`.

## Diagnosis

The issue is not only visual.

Study Page already rendered `Siguiente cápsula` and `Ver cápsula` when the active enrollment read model had:

```text
StudentProgramInstance.currentCycleId -> LearningCycle -> StudyLoad
```

But `MVP-SALES-PILOT-UI-STUDY-ENROLL-1` intentionally created only a minimal PAES_M1 enrollment. That left `currentCycleId = null` and no first StudyLoad/cápsula for a newly enrolled student.

Therefore:

* if a StudyLoad already exists, the problem is read model/UI and Study Page now shows title/status/purpose/CTA;
* if no StudyLoad exists for an active PAES_M1 enrollment, the problem is missing first cápsula availability.

## Authorized Mutation

A conditional mutation was implemented because a safe existing pattern was found:

* the admin instance creation path already created cycle 1 + opening snapshot + `PAES M1 — Entrada balanceada inicial`;
* local fixture logic used the same first M1 capsule title;
* static content exists for `PAES M1 — Entrada balanceada inicial`.

The mutation is limited to:

* active PAES_M1 enrollment only;
* create or locate cycle 1/open cycle only when safe;
* create one pending `StudyLoad` titled `PAES M1 — Entrada balanceada inicial` only when no capsule exists;
* update `currentCycleId` to the cycle containing the first capsule.

No capsule is started or executed.

## Helper

Created:

```text
nextjs_space/lib/paes-m1-first-capsule.ts
```

The helper exports:

* `PAES_M1_FIRST_CAPSULE_TITLE`;
* `PAES_M1_FIRST_CAPSULE_PURPOSE`;
* `ensurePaesM1FirstCapsuleForEnrollment(...)`.

The helper is server-side only and works inside a Prisma transaction.

## Idempotency

The helper first searches existing StudyLoads for the PAES_M1 enrollment.

Priority:

1. `in_progress`;
2. `pending`;
3. `completed`.

If any capsule already exists, it returns that capsule and does not create another.

If no capsule exists:

* it uses the current cycle if present;
* otherwise it uses an existing open cycle;
* otherwise it creates cycle 1 only if the enrollment has no cycles;
* it refuses to invent continuity if only unsafe closed-cycle state exists.

The helper does not run from server-component render. It only runs from explicit server actions.

## Study Page UI

`/study/paes-m1` now shows a clear first/siguiente cápsula block when the student has `Tutoría Activa`.

When a capsule exists, Study Page shows:

* `Siguiente cápsula`;
* capsule title;
* visible status;
* capsule/topic chip;
* brief purpose;
* CTA `Ver cápsula`.

When active enrollment exists but no capsule is available yet, Study Page shows the first capsule candidate:

```text
Siguiente cápsula
PAES M1 — Entrada balanceada inicial
Estado: Pendiente
Resuelve pocos ejercicios para ubicar tu punto de partida.
Ver cápsula
```

Pressing `Ver cápsula` in that state explicitly creates/locates the first capsule and redirects to:

```text
/now/study-loads/[id]
```

## Enrollment Action Integration

The `Matricularse` server action now also ensures the first PAES_M1 capsule before redirecting back to Study Page.

This means a newly enrolled student should return to Study Page with:

* `Tutoría Activa`;
* first/siguiente capsule title;
* status;
* purpose;
* `Ver cápsula`.

## Behavior With / Without Capsule

With capsule:

* Study Page shows the capsule.
* `Ver cápsula` links to `/now/study-loads/[id]`.
* No start endpoint is called.

Without capsule:

* Study Page shows the first capsule candidate and `Ver cápsula`.
* Pressing `Ver cápsula` runs an explicit server action to create/locate the first capsule.
* If no safe path exists, the page shows a safe visible error.

## Build

Build command:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Limits Respected

* No schema.
* No migrations.
* No auth architecture changes.
* No credentials.
* No StudentAccess lifecycle.
* No M2 functional activation.
* No Competencia Lectora functional activation.
* No Cápsula/StudyLoad execution automática.
* No Empezar automático.
* No responses.
* No submit.
* No self-report.
* No completion.
* No broad automatic continuity.
* No checkout.
* No pago real.
* No trial real.
* No suscripción funcional completa.
* No staging.
* No production.
* No secrets.
* No Sales-Ready declaration.
* No MVP-Beta cerrado completo declaration.
* No L1/M2 functional readiness declaration.

## Next Recommended Phase

```text
Human mobile audit of first cápsula visibility and CTA
```
