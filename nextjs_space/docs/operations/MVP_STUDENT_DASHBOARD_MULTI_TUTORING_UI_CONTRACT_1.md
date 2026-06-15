# MVP-STUDENT-DASHBOARD-MULTI-TUTORING-UI-CONTRACT-1

## Purpose

Define the Bexauri student dashboard multi-tutoring UI contract after the M2-C01 human UI smoke found that PAES_M2 access data exists but the dashboard presents inconsistent tutoring states.

This phase is a product/technical contract only. It does not implement UI changes, does not execute DB, and does not mutate DB.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 3fb31874f8d24255b6799157c86bcb50b04c4cf4
working tree clean
```

Preflight result:

```text
working tree: clean
HEAD: 3fb31874f8d24255b6799157c86bcb50b04c4cf4
origin/main: 3fb31874f8d24255b6799157c86bcb50b04c4cf4
origin/HEAD: 3fb31874f8d24255b6799157c86bcb50b04c4cf4
```

## Source documents read

- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_HUMAN_UI_SMOKE_1.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `PHASE_LOG.md`

## Triggering finding

The M2-C01 human UI smoke observed:

```text
Tutorias disponibles: M1 active, M2 not available
Ruta Activa: PAES_M2 visible
Pending capsule: PAES_M2 / M2-C01 visible
```

Interpretation:

```text
The UI mixes available tutoring, active tutoring, a single active route and pending capsules without a stable multi-tutoring dashboard contract.
```

Result carried forward:

```text
M2_C01_HUMAN_UI_SMOKE_BLOCKED_DASHBOARD_TUTORING_STATE_CONTRACT
```

## General principle

The Bexauri dashboard must operate as a stable multi-tutoring view.

Adding a new tutoring program, such as PAES_M2 or PAES_L1, must not change the base dashboard structure. It must only feed predefined interface zones.

Structural dashboard zones:

1. Persistent header.
2. Welcome.
3. Tus Tutorias.
4. Tutorias Bexauri.
5. Ultima actividad de estudio.
6. Mensaje de tu tutor Bexauri.
7. Persistent footer.

## Persistent header contract

Current state:

```text
OK
```

The header must persist across Bexauri UI surfaces and contain:

- Bexauri logo.
- Navigation buttons.
- Sign out.

Rule:

```text
The header must not disappear or structurally change when new tutoring programs are implemented.
```

## Persistent footer contract

Current state:

```text
OK
```

The footer must persist across Bexauri UI surfaces and provide general navigation.

Rule:

```text
The footer must not disappear or structurally change when new tutoring programs are implemented.
```

## Welcome container contract

Current state:

```text
PARTIALLY_OK
```

The welcome container must keep:

```text
Hola, {nombre usuario}
Que hago ahora
```

Required text change:

```text
from: Debes matricularte/seleccionar una tutoría activa
to: Selecciona una tutoría o matricúlate en una nueva
```

Required removal:

```text
Boton global Comenzar estudio
```

Reason:

```text
If a student has more than one active tutoring program, a global Comenzar estudio button cannot know which tutoring path the student intends to continue.
```

Rule:

```text
Continue, start and enroll actions must live inside each tutoring or capsule card, not in an ambiguous global button.
```

## Tus Tutorias container contract

`Tus Tutorias` replaces the current use of `Tutorias Disponibles` when the content is the student's own tutoring programs.

Responsibility:

```text
Show only tutoring programs the student has active, enrolled or matriculated.
```

Must not show:

- Catalog-only tutoring programs.
- Unavailable tutoring programs.
- Future tutoring programs.
- General catalog tutoring programs the student has not started.

Single active tutoring example:

```text
Tus Tutorias

[PAES_M1 - Activa - Continuar]
```

Multiple active tutoring example:

```text
Tus Tutorias

[PAES_M1 - Activa - Continuar]
[PAES_M2 - Activa - Continuar]
```

Rules:

- A new tutoring program must not appear in `Tus Tutorias` until the student is effectively enrolled in it.
- If the student has multiple active tutoring programs, the container must show all of them, preferably with cards and horizontal scroll when space requires it.

## Tutorias Bexauri container contract

`Tutorias Bexauri` is a new horizontal-scroll catalog container.

Responsibility:

```text
Show the visible Bexauri tutoring catalog with the contextual state for this student.
```

Each card must include:

- Tutoring title.
- Short subtitle or description.
- State.
- Contextual action.

Allowed states:

```text
Disponible
No disponible
Activa
Completada
```

Actions by state:

```text
Disponible -> Matricularme / Iniciar
Activa -> Continuar
Completada -> Ver resumen / Repasar
No disponible -> Proximamente / No disponible / disabled button
```

Rule:

```text
A tutoring program may appear in both Tus Tutorias and Tutorias Bexauri, but with different functions.
```

Difference:

```text
Tus Tutorias shows tutoring programs the student already has active.
Tutorias Bexauri shows the visible general catalog and each tutoring program's state for this student.
```

Example:

```text
Tutorias Bexauri

[PAES_M1 - Refuerza contenidos de Matematica M1 - Activa - Continuar]
[PAES_M2 - Prepara Matematica M2 - Disponible - Matricularme]
[PAES_L1 - Comprension lectora PAES - No disponible - Proximamente]
```

## Eliminate single Ruta Activa dependency

The dashboard must not depend on a single `Ruta Activa`.

Reason:

```text
A student may have more than one active tutoring program at the same time.
```

The `Ruta Activa` function is replaced by:

- `Tus Tutorias`.
- `Ultima actividad de estudio`.

Rule:

```text
The latest technically created or aligned tutoring program must not overwrite the student's primary active tutoring representation.
```

## Ultima actividad de estudio contract

Recommended title:

```text
Ultima actividad de estudio
```

Responsibility:

```text
Show the most relevant capsule to continue or review.
```

It may represent:

- Latest in-progress uncompleted capsule.
- Latest relevant pending capsule.
- Latest completed capsule, if there is no in-progress capsule.

It must include:

- Associated tutoring program.
- Capsule name.
- State.
- Contextual action.

Possible states:

```text
Pendiente
En curso
Completada
```

Possible actions:

```text
Pendiente -> Iniciar capsula
En curso -> Continuar capsula
Completada -> Ver feedback / Ver resumen
```

Rule:

```text
This container does not replace Tus Tutorias. It only shows the most recent or pedagogically prioritized activity.
```

Hard consistency rule:

```text
A PAES_M2 capsule must not appear as pending activity if PAES_M2 is shown as No disponible.
```

## Mensaje de tu tutor Bexauri contract

Recommended title:

```text
Mensaje de tu tutor Bexauri
```

Responsibility:

```text
Show the latest pedagogical or orienting message for the student.
```

It may show:

- Study recommendation.
- Continuity guidance.
- Brief motivational message.
- Non-punitive pedagogical warning.
- Suggested next step.

Example:

```text
Vas bien en M1. Te recomendamos completar la capsula pendiente antes de iniciar una nueva tutoria.
```

Rule:

```text
This container guides the student, but must not replace operational navigation from tutoring or capsule cards.
```

## Tutoring state contract

### Disponible

Meaning:

```text
The tutoring program is released for the student, but the student is not yet enrolled in it.
```

Appears in:

```text
Tutorias Bexauri
```

Does not appear in:

```text
Tus Tutorias
```

Action:

```text
Matricularme / Iniciar
```

### Activa

Meaning:

```text
The student already has an active enrollment or StudentProgramInstance in that tutoring program.
```

Appears in:

```text
Tus Tutorias
Tutorias Bexauri
```

Action:

```text
Continuar
```

### No disponible

Meaning:

```text
The tutoring program exists or can be shown commercially, but is not enabled for this student or has not been released yet.
```

Appears in:

```text
Tutorias Bexauri
```

Does not appear in:

```text
Tus Tutorias
```

Action:

```text
Proximamente / No disponible / disabled button
```

### Completada

Meaning:

```text
The student completed the tutoring program or its main cycle.
```

May appear in:

```text
Tutorias Bexauri
Tus Tutorias, if product decides to preserve owned tutoring history
```

Action:

```text
Ver resumen / Repasar
```

## Critical pending capsule rule

A pending capsule may only be shown if it belongs to a tutoring program active for the student.

Hard rule:

```text
There must not be a visible pending PAES_M2 capsule if PAES_M2 appears as No disponible.
```

If M2-C01 exists as a pending StudyLoad, PAES_M2 must appear as:

```text
Activa
```

Not as:

```text
No disponible
```

## Expected PAES_M2 alignment

### Before M2 enrollment

If the student has active M1 and M2 released but not enrolled:

```text
Tus Tutorias:
- PAES_M1 - Activa - Continuar

Tutorias Bexauri:
- PAES_M1 - Activa - Continuar
- PAES_M2 - Disponible - Matricularme
- PAES_L1 - Disponible or No disponible, according to commercial decision

Ultima actividad de estudio:
- Latest real PAES_M1 capsule

Mensaje de tu tutor Bexauri:
- Message associated with the student's current progress
```

### After M2 enrollment

If the student has active M1 and M2:

```text
Tus Tutorias:
- PAES_M1 - Activa - Continuar
- PAES_M2 - Activa - Continuar

Tutorias Bexauri:
- PAES_M1 - Activa - Continuar
- PAES_M2 - Activa - Continuar
- PAES_L1 - Disponible or No disponible

Ultima actividad de estudio:
- Latest real activity according to activity or pedagogical priority

Mensaje de tu tutor Bexauri:
- Multi-tutoring contextual message
```

### With pending M2-C01

If M2-C01 is pending:

```text
PAES_M2 must appear as Activa.
M2-C01 may appear in Ultima actividad de estudio when appropriate.
M2-C01 must not appear if PAES_M2 is shown as No disponible.
```

## Current M2-C01 smoke finding

Observed inconsistency:

```text
- In Tutorias disponibles, M1 appears active and M2 appears no disponible.
- Lower in the dashboard, PAES_M2 appears in Ruta Activa.
- At the end, a pending PAES_M2 capsule appears.
```

Interpretation:

```text
The UI mixes available tutoring, active tutoring, active route and pending capsules without a stable multi-tutoring contract.
```

Conclusion:

```text
Do not continue M2-C01 smoke until the dashboard is aligned to this contract.
```

## Implementation objective for a later phase

The future implementation must align the current dashboard structure and behavior to this contract.

Required implementation outcomes:

- Rename `Tutorias Disponibles` to `Tus Tutorias` when the displayed content is the student's active tutoring programs.
- Remove the global `Comenzar estudio` button.
- Change welcome copy to `Selecciona una tutoría o matricúlate en una nueva`.
- Create the horizontal `Tutorias Bexauri` container.
- Remove or replace the single `Ruta Activa` concept.
- Create or adjust `Ultima actividad de estudio`.
- Create or adjust `Mensaje de tu tutor Bexauri`.
- Reflect PAES_M2 correctly according to its real state.

Final rule:

```text
M2 implementation must align with the new dashboard structure. The dashboard must not be forced into M2-specific special logic.
```

## Explicit non-actions

- No code changes.
- No UI/API functional changes.
- No content changes.
- No schema/Prisma changes.
- No DB execution.
- No DB mutation.
- No StudentAccess mutation.
- No payment/subscription mutation.
- No production/staging action.
- No rollback.
- No build.
- No browser automation.
- No API-only tests.
- No secrets printed.

## Result

```text
STUDENT_DASHBOARD_MULTI_TUTORING_UI_CONTRACT_ACCEPTED
```

## Next recommended phase

```text
MVP-STUDENT-DASHBOARD-MULTI-TUTORING-UI-IMPLEMENT-1
```
