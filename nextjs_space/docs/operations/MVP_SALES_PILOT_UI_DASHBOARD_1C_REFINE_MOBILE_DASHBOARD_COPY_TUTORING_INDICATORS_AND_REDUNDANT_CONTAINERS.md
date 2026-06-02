# MVP-SALES-PILOT-UI-DASHBOARD-1C - Refine mobile dashboard copy, tutoring indicators and redundant containers

## Phase

```text
MVP-SALES-PILOT-UI-DASHBOARD-1C - Refine mobile dashboard copy, tutoring indicators and redundant containers
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 48b59da
Latest accepted commit = 48b59da - MVP-SALES-PILOT-UI-DASHBOARD-1B: compact mobile dashboard top containers
Working tree clean before edits.
```

## Human audit inherited

Mauricio accepted the general mobile-first dashboard organization from DASHBOARD-1B and requested fine adjustments:

- Remove redundant copy from the top container.
- Improve the `Que hago ahora` sub-container with softer contrast.
- Change the main top-container CTA to `Comenzar Estudio`.
- Remove `Ver actividad actual`.
- Remove `Tus tutorias`.
- Add minimal tutoring indicators.
- Remove redundant containers: `Que pasa despues`, `Actividad actual`, and `Tu cuenta esta lista`.

In this phase, `DB` means dashboard, not database.

## Texts removed

- `Tu espacio de estudio`.
- `Elige una tutoria y continua con el siguiente paso de tu ruta.`
- `Ver actividad actual`.
- `Tus tutorias`.

## Texts changed

The `Que hago ahora` sub-container now shows:

```text
Debes matricularte/seleccionar una tutoría activa
```

It keeps the guidance:

```text
Cuando tengas una actividad asignada, aparecerá aquí con una acción clara.
```

## CTA updated

The primary CTA now reads:

```text
Comenzar Estudio
```

Visual treatment:

- dark blue/violet/petroleum gradient;
- subtle warm micro-light indicator;
- rounded high-control button shape;
- restrained shadow;
- no pricing, checkout, payment, or purchase styling.

## Tutoring indicators

Each tutoring card now includes minimal indicators:

- `Estado`.
- `Ej.`.
- `Logro`.

Values:

- M1: `Activa`, `0 ej.`, `--%`.
- M2: `No disponible`, `0 ej.`, `--%`.
- Competencia Lectora: `No disponible`, `0 ej.`, `--%`.

The `/now` read model does not expose a reliable exercise-level count or achievement percentage for these cards, so placeholders are intentionally safe UI values.

## Containers removed

- `Que pasa despues`.
- `Actividad actual`.
- `Tu cuenta esta lista`.

Secondary content below the first mobile experience remains available where it already existed, including current program summary and existing StudyLoad lists/actions.

## Operational elements

- Existing `/now` route.
- Existing session guard.
- Existing sign-out action.
- Existing student/enrollment/cycle read model.
- Existing StudyLoad lists.
- Existing `Ver actividad`, `Empezar`, and completion actions where already exposed in the StudyLoad list area.

## Visible non-operational elements

- `PAES Matematicas M2`.
- `PAES Competencia Lectora`.
- Their indicators use safe non-operational values and do not activate functionality.
- Footer/navigation local anchors as orientation only.

## Responsive

Prepared for human audit at:

- Mobile: `390 x 844`.
- Tablet: `768 x 1024`.
- Desktop: `1366 x 768`.

Acceptance focus:

- Header compact and visible.
- Greeting visible.
- Removed redundant top copy.
- Softer `Que hago ahora` contrast.
- CTA `Comenzar Estudio` visible and sophisticated.
- Tutoring cards include minimal indicators.
- Removed redundant containers do not appear.
- No accidental horizontal overflow outside the tutoring carousel.

## Build

Required command:

```powershell
npm.cmd --prefix nextjs_space run build
```

Expected result:

```text
Passed.
```

## Limits respected

- No database changes.
- No schema changes.
- No migrations.
- No auth architecture changes.
- No credentials.
- No StudentAccess lifecycle.
- No new enrollment.
- No M2 functional activation.
- No Competencia Lectora functional activation.
- No automatic StudyLoad execution.
- No automatic `Empezar`.
- No responses.
- No submit.
- No self-report changes.
- No completion changes.
- No new automatic continuity.
- No checkout.
- No real payment.
- No real trial.
- No complete functional subscription.
- No staging.
- No production.
- No secrets.
- No Sales-Ready declaration.
- No MVP-Beta cerrado completo declaration.
- No L1/M2 functional readiness declaration.

## Next recommended phase

```text
Human mobile audit of dashboard 1C
```
