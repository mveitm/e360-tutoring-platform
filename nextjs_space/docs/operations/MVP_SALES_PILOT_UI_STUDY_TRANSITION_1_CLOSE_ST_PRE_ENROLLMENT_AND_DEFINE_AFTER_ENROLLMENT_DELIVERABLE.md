# MVP-SALES-PILOT-UI-STUDY-TRANSITION-1 - Close ST M1 pre-enrollment and define after-enrollment Study Page deliverable

## Phase

MVP-SALES-PILOT-UI-STUDY-TRANSITION-1 - Close ST M1 pre-enrollment and define after-enrollment Study Page deliverable.

Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.

Level A - Deliverable closeout / next Study Page state definition.

## Baseline

Expected baseline before this documentation-only phase:

```text
HEAD = origin/main = origin/HEAD = 164a6cf
Latest accepted commit = 164a6cf - MVP-SALES-PILOT-UI-STUDY-1A: refine study page contained mobile shell
Working tree expected = clean
```

Git preflight is the live source of truth over embedded historical baselines.

## Results

```text
STUDY_PAGE_M1_PRE_ENROLLMENT_ACCEPTED
STUDY_PAGE_M1_AFTER_ENROLLMENT_DELIVERABLE_DEFINED
```

## ST M1 pre-enrollment closure

Mauricio accepted:

```text
ST M1 / First Landing previo a enrollment
```

Interpretation:

* The current Study Page M1 at `/study/paes-m1` is accepted as the first internal tutoring landing before enrollment.
* It includes a contained mobile-first shell.
* It includes tutoring state.
* It includes `Tutoría Info`.
* It includes pedagogical placeholder zones for progress and Cápsulas.
* It includes Study Page footer/navigation.
* It does not execute Cápsulas or StudyLoads.
* It does not create enrollment.
* It does not mutate DB/base de datos.

## Next deliverable

Name:

```text
STUDY_PAGE_M1_AFTER_ENROLLMENT_DELIVERABLE
```

Observable goal:

```text
Un estudiante ya matriculado en PAES Matemáticas M1 debe entrar a la Study Page y entender que su tutoría está activa, cuál es su estado inicial, qué cápsula debe trabajar y cómo avanza dentro de la tutoría.
```

Target user:

* Authenticated student with active enrollment in PAES Matemáticas M1.

Expected experience after enrollment:

1. See clearly `Tutoría Activa`.
2. Recognize that they are in `PAES Matemáticas M1`.
3. See a contained tutoring progress zone.
4. See the next Cápsula, or a clear indication that no Cápsula is available yet.
5. Understand what Cápsulas mean.
6. Access `Tutoría Info`.
7. Return to Dashboard.
8. Understand the next action without getting lost.

## Pre-enrollment vs after-enrollment

Pre-enrollment:

* May show `Matricularse`.
* Explains what the tutoring is.
* Informs methodology.
* Does not assume progress or an active Cápsula.
* Works as an internal tutoring landing.

After-enrollment:

* Must show `Tutoría Activa`.
* Must orient the student toward studying.
* Must show Cápsulas, progress, or next focus.
* Must prepare the step toward the first real Cápsula.
* Must not behave only as an informative landing.

## Minimum after-enrollment content

Header:

* Compact header.
* Bexauri / PAES Matemáticas M1.
* Minimal navigation.

Top state:

* `Tutoría Activa`.
* PAES Matemáticas M1 identity.
* Minimum indicators when reliable data exists:
  * Cápsulas trabajadas.
  * Logro.
  * Foco actual.

Main zone:

* Next Cápsula.
* Cápsula state when reliable data exists:
  * disponible;
  * pendiente;
  * en progreso;
  * completada.
* Safe CTA:
  * `Ver cápsula`; or
  * `Comenzar cápsula` only if an existing safe flow supports it.
* No automatic execution.

Tutoría Info:

* Remains available.
* May continue as modal/dialog.

Progress:

* Uses real data only when a reliable source exists.
* Keeps prepared UI placeholders if data is not reliable.
* Does not invent progress.

Footer ST:

* Volver a Dashboard.
* Cápsulas.
* Progreso.
* Info.

## Acceptance criteria

The next implementation phase should pass when:

* An enrolled PAES_M1 student sees `Tutoría Activa`.
* The page clearly identifies `PAES Matemáticas M1`.
* The page shows a contained progress/study area.
* The page shows a next Cápsula, or an explicit safe empty state if no Cápsula is available.
* The page explains Cápsulas without using `Carga` or `StudyLoad` in visible student UI.
* `Tutoría Info` remains accessible.
* Footer navigation returns to Dashboard and supports the Study Page experience.
* Any CTA to a Cápsula is safe, explicit, and does not auto-execute work.
* The implementation does not invent progress when no reliable read model exists.

## Out of scope

* No real enrollment in this phase.
* No DB/base de datos mutation.
* No schema.
* No migrations.
* No StudentAccess lifecycle.
* No automatic Cápsula/StudyLoad execution.
* No responses.
* No submit.
* No self-report.
* No completion.
* No new automatic continuity.
* No M2/Lectora functional activation.
* No checkout, payment, real trial, or full subscription flow.
* No staging/production.
* No Sales-Ready declaration.
* No complete MVP-Beta cerrado declaration.

## Open debts

* Define whether `Matricularse` becomes operational or enrollment happens from Dashboard/a separate flow.
* Define whether after-enrollment should show the current Cápsula automatically.
* Define final CTA: `Ver cápsula` vs `Comenzar cápsula`.
* Replace progress placeholders with real data when a reliable source exists.
* Connect ST After Enrollment with real Cápsula execution.
* Prepare manual test toward StudyLoad/Cápsula 10.

## Next recommended phase

```text
MVP-SALES-PILOT-UI-STUDY-2 - Implement M1 Study Page after-enrollment state
```

## Limits respected

This transition phase is documentation-only. It does not touch app code, DB/base de datos, schema, migrations, auth, credentials, login, `/now`, Study Page implementation, Cápsula/StudyLoad execution, `Empezar`, responses, submit, self-report, completion, StudentAccess, checkout, real payment, real trial, full subscription, staging/production, or secrets.
