# MVP-SALES-PILOT-UI-STUDY-ENROLL-1 — Implement minimal M1 enrollment from Study Page

Continuity phrase: Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.

## Phase

`MVP-SALES-PILOT-UI-STUDY-ENROLL-1 — Implement minimal M1 enrollment from Study Page`

Level: E — protected structural phase / controlled DB mutation.

Result marker:

```text
M1_STUDY_PAGE_ENROLLMENT_ACTION_IMPLEMENTED
```

## Baseline

Expected and observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 0c0be01
```

Last accepted commit:

```text
0c0be01 — MVP-SALES-PILOT-UI-STUDY-2: implement M1 study page after-enrollment state
```

Working tree before implementation: clean.

## Human Authorization

Mauricio explicitly authorized:

```text
AUTORIZO_IMPLEMENTAR_MATRICULARSE_M1_DESDE_STUDY_PAGE
```

The inherited human audit failed because `Matricularse` was visual only. This phase turns that action into a controlled PAES_M1 enrollment mutation.

## Model And Pattern Used

The implementation uses the existing Prisma model:

* `Student` identified from the authenticated session email.
* `Program` fixed to `code = PAES_M1`.
* `StudentProgramInstance` as the enrollment record.

The existing admin route for creating instances was inspected but not reused because it can also create a learning cycle and initial StudyLoad. This student phase only authorizes minimal enrollment creation/activation and must not create capsules automatically.

Implementation strategy:

* Server action colocated in `/study/paes-m1`.
* Server-side session required through existing `getServerSession(authOptions)`.
* No `programId` is accepted from the client.
* `PAES_M1` is hard-coded server-side.
* The action revalidates `/study/paes-m1` and `/now`, then redirects back to `/study/paes-m1`.

## Authorized Mutation

The only authorized mutation is:

* create a minimal active `StudentProgramInstance` for the authenticated student and `PAES_M1`; or
* reactivate an existing inactive `StudentProgramInstance` for the same student and `PAES_M1`.

No `LearningCycle`, `StudyLoad`, response, self-report, completion, checkout, payment, subscription, trial, `StudentAccess`, schema, or auth architecture mutation is included.

## Matricularse Behavior

When the authenticated student has no active PAES_M1 enrollment:

* Study Page shows `Matricularse`.
* Pressing `Matricularse` submits the server action.
* The server action creates or activates the minimal PAES_M1 enrollment.
* The page refreshes back to `/study/paes-m1`.
* The page then shows `Tutoría Activa`.

If the student or active PAES_M1 program cannot be resolved, the page returns to `/study/paes-m1?matricula=unavailable` and shows a safe visible message.

## Idempotency

The server action is idempotent at the application level:

1. It first checks for an active `StudentProgramInstance` for the authenticated student and PAES_M1.
2. If one exists, it returns without creating another enrollment.
3. If no active record exists but an inactive PAES_M1 record exists, it reactivates the latest one.
4. Only when no existing PAES_M1 enrollment exists does it create a new minimal active record.

No schema or uniqueness constraint was added.

## Tutoría Activa State

After successful enrollment, `/study/paes-m1` continues to use the existing read model:

* active enrollment is read from `StudentProgramInstance`;
* `Tutoría Activa` is displayed;
* current cycle and capsules are read only if they already exist.

## Capsule Behavior

If an existing current capsule is available from the read model:

* Study Page shows `Siguiente cápsula`;
* the CTA remains `Ver cápsula`;
* the CTA navigates to the existing route `/now/study-loads/[id]`;
* no capsule is executed automatically.

If no capsule exists:

* Study Page shows `Aún no tienes una cápsula disponible.`;
* Study Page shows `Cuando haya una cápsula lista, aparecerá aquí con una acción clara.`;
* no capsule, cycle, response, completion, or continuity action is created.

## Verification

Build command:

```text
npm.cmd --prefix nextjs_space run build
```

Functional verification prepared:

* non-enrolled case: `Matricularse` submits server action and returns to `Tutoría Activa`;
* already enrolled case: active enrollment is detected first and no duplicate is created;
* no-capsule case: safe no-capsule text remains visible;
* existing-capsule case: `Ver cápsula` remains navigation only.

Authenticated runtime audit remains the recommended human verification step.

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
* No continuidad automática nueva.
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
Human mobile audit of Matricularse → Tutoría Activa
```
