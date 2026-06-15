# MVP-SALES-PILOT-M2-C01-HUMAN-UI-SMOKE-ACCESS-DIAGNOSIS-1

## Purpose

Diagnose, read-only, why the human UI smoke for:

```text
M2-C01 - Modelacion con expresiones y funciones
```

cannot begin from the current student account after the user tried:

```text
LP -> boton Iniciar -> DB/dashboard
```

and observed that `PAES_M2` appears as `NO DISPONIBLE`.

This phase determines the access/enrollment blocker before any future M2-C01 smoke execution. It does not mutate DB, create enrollment, modify StudentAccess, touch fixtures, edit UI, alter content, change route-order/continuity, run browser automation, or inspect secrets.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 419e419f7ab616c90282db277ff45ad315bb38e1
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 419e419f7ab616c90282db277ff45ad315bb38e1
git rev-parse origin/main: 419e419f7ab616c90282db277ff45ad315bb38e1
git rev-parse origin/HEAD: 419e419f7ab616c90282db277ff45ad315bb38e1
```

Current log head reviewed:

```text
419e419 MVP-CONTENT-PAES-M2: prepare C01 UI smoke
```

## Triggering human observation

Human observation carried into this phase:

```text
El usuario intento iniciar desde LP.
El boton Iniciar derivo a DB/dashboard.
En DB, PAES_M2 aparece como NO DISPONIBLE.
El usuario observo que el primer paso necesario parece ser matricular/enrollar al estudiante en M2 para llegar a ST M2.
```

No smoke was executed. No login/browser automation/API-only test/DB query was run by Codex in this phase.

## Source readiness

M2-C01 source chain:

```text
MVP-CONTENT-PAES-M2-C01-AUTHORED-READINESS-1
PAES_M2_C01_AUTHORED_READINESS_COMPLETED_WITH_IMPLEMENT_RECOMMENDED

MVP-CONTENT-PAES-M2-C01-AUTHORED-IMPLEMENT-1
PAES_M2_C01_AUTHORED_IMPLEMENTED

MVP-CONTENT-PAES-M2-C01-STATIC-REVIEW-1
PAES_M2_C01_STATIC_REVIEW_PASSED

MVP-CONTENT-PAES-M2-C01-HUMAN-UI-SMOKE-READINESS-1
PAES_M2_C01_HUMAN_UI_SMOKE_READINESS_READY
```

Static content status:

```text
M2-C01 exists in study-load-content registry.
program: PAES_M2
contentKey: paes_m2_modeling_expressions_functions_entry
visible correlative: M2-C01
item count: 4
authoredFeedback: brief/complete present per item
visual/math dependency: NO_VISUAL_BLOCKER
```

Content quality is not the observed blocker.

## Access path diagnosis

Static UI/access path findings:

- LP has an `Iniciar` link to `/login`.
- Signup/login flow redirects ordinary student sessions to `/now`.
- `/now` looks up the current `Student` by session email.
- `/now` then selects the latest active `StudentProgramInstance` for that student, ordered by `startedAt desc`.
- If no active enrollment exists, `/now` renders the dashboard orientation and tutoring cards.
- The dashboard tutoring cards currently mark M1 as `Activa` and M2/CL as `No disponible` in static UI configuration.
- The dashboard footer and primary study CTA point to `/study/paes-m1`.
- The only route under `nextjs_space/app/study` is `/study/paes-m1`.
- No `/study/paes-m2` self-enrollment or M2 study route exists in the current app tree.
- The canonical StudyLoad route `/now/study-loads/[id]` requires ownership through the StudyLoad's learning cycle enrollment and redirects to `/now` if the enrollment is not active or not owned by the current student.

Interpretation:

```text
The current student-facing path is M1-first. It does not provide a self-service M2 enrollment route or a visible M2 ST entry path from the current dashboard state.
```

## M2 availability diagnosis

Program/content availability:

- Static seed code includes `Program` `PAES_M2` with `status: active`.
- M2-C01 authored static registry content exists.
- M2-C01 display correlative support exists in the static StudyLoad content helper.

Product/UI availability:

- The DB/dashboard M2 card is statically configured as `No disponible`.
- The visible study CTA points to M1.
- There is no M2-specific student study page equivalent to `/study/paes-m1`.

Diagnosis:

```text
PAES_M2 exists as a program/content concept, but M2 is not currently exposed as a student-startable UI path from the current dashboard. M2-C01 content availability is therefore not enough to make ST M2 reachable.
```

## Enrollment / StudentAccess diagnosis

Enrollment evidence from static code:

- `StudentProgramInstance` is the runtime enrollment model for program access.
- `/now` depends on an active `StudentProgramInstance`.
- The M1 study route can create or reactivate an active PAES_M1 enrollment and ensure the first M1 capsule.
- The generic admin `/api/instances` endpoint can create a `StudentProgramInstance`.
- That endpoint auto-creates first cycle and first StudyLoad only when `program.code === 'PAES_M1'`.
- For non-M1 programs, including PAES_M2, the generic endpoint creates the enrollment record only; it does not automatically create an M2 cycle or M2-C01 StudyLoad.

StudentAccess evidence from static code:

- `StudentAccess` exists as a separate lifecycle/containment model.
- The inspected `/now` and StudyLoad ownership paths do not use `StudentAccess` as the direct runtime selector for M2 access.
- Existing StudentAccess admin transition code is scoped to reaffirming `no_access`, not enabling M2.

Read-only conclusion:

```text
The immediate blocker is access/enrollment availability for PAES_M2 in the current student experience, not M2-C01 content quality. To reach ST M2 for smoke, the local/dev account needs an explicitly authorized M2 access/enrollment preparation that creates or activates the necessary M2 enrollment path and provides a reachable M2-C01 StudyLoad/cycle path.
```

Classification:

```text
A) M2_ACCESS_BLOCKED_NO_ENROLLMENT
```

Operational note:

```text
Because no DB read was executed in this phase, this classification is based on human UI observation plus static route/model evidence. A future authorized local/dev prep phase should verify the current account state read-only before any mutation.
```

## Smoke implication

```text
M2-C01 human UI smoke cannot be classified as passed or failed on content quality yet, because the student cannot reach M2/ST M2 from the current account. The blocker is access/enrollment availability.
```

Additional implication:

- Do not treat M2 `NO DISPONIBLE` as a content failure.
- Do not edit M2-C01 content to solve this.
- Do not open route-order/continuity repair inside the smoke closeout.
- Do not create M2 enrollment or StudyLoad without a separate authorized local/dev data phase.

## Recommended safe next phase

Recommended next phase:

```text
MVP-SALES-PILOT-M2-C01-LOCAL-DEV-ENROLLMENT-ACCESS-PREP-1
```

Purpose:

```text
Safely prepare local/dev access for M2-C01 smoke by verifying the target account, PAES_M2 program availability, StudentAccess state, existing StudentProgramInstance state, and whether a local/dev M2 enrollment/cycle/StudyLoad must be created for M2-C01.
```

Required authorization note:

```text
This next phase would require explicit human authorization before any local/dev data mutation.
```

Stop gates for the next phase should include:

- no production/staging;
- no secret printing;
- verify local/dev target before mutation;
- read current StudentAccess and enrollment state first;
- create or adjust only the minimum local/dev records needed for M2-C01 smoke if explicitly authorized;
- do not modify schema, Prisma, route-order/continuity, UI, registry, authoredFeedback, content keys, or M2-C01 item content.

## Scope safety

No code changes.
No UI changes.
No API changes.
No schema/DB/Prisma changes.
No route-order/continuity changes.
No registry changes.
No authoredFeedback changes.
No visual stimulus changes.
No correctOptionKey changes.
No contentKey changes.
No item count/order/stem/option/tableStimulus changes.
No StudentAccess mutation.
No enrollment creation.
No fixture mutation.
No seed scripts.
No migration.
No prisma db push.
No prisma migrate.
No DB reset.
No browser automation.
No API-only tests.
No build.
No production/staging.
No secrets printed.
No agentic layer opened.

## Result

```text
M2_C01_SMOKE_ACCESS_DIAGNOSIS_NO_ENROLLMENT
```

M2-C01 remains content-ready for future smoke, but the current account cannot begin the smoke until M2 access/enrollment is prepared through a separately authorized local/dev phase.
