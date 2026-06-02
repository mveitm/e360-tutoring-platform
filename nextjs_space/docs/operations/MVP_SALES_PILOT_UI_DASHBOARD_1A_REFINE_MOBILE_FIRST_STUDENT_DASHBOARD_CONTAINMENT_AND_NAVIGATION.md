# MVP-SALES-PILOT-UI-DASHBOARD-1A - Refine mobile-first student dashboard containment and navigation

## Phase

```text
MVP-SALES-PILOT-UI-DASHBOARD-1A - Refine mobile-first student dashboard containment and navigation
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 1712a14
Latest accepted commit = 1712a14 - MVP-SALES-PILOT-UI-DASHBOARD-1: implement student tutoring dashboard M1 entry
Working tree clean before edits.
```

## Human audit inherited

Mauricio accepted `DASHBOARD-1` as the first student dashboard suggestion and requested a mobile-first refinement:

- Avoid free global page scroll on mobile where reasonable.
- Keep the main student experience between header and footer/navigation.
- Keep `Tu espacio de estudio` in its current form and tone.
- Reduce the space used by `Que hago ahora`.
- Place `Tutorias disponibles` in a horizontal-scroll container on mobile.
- Add a subtle footer/navigation guide that remains present in the mobile experience.

In this phase, `DB` means dashboard, not database.

## Changes mobile-first

- Converted `/now` shell to a `100svh` contained dashboard frame.
- Kept header and footer/navigation outside the central scroll area.
- Added a central internal scroll container for the dashboard content.
- Reduced header spacing and logo surface height without changing the logo asset.
- Reduced mobile spacing and typography in the hero/action area.
- Made `Que hago ahora` more compact while preserving its state-aware message.
- Kept existing M1 entry anchors and current activity anchors.

## Header / content / footer structure

The dashboard now uses this structure:

1. Header: Bexauri logo surface plus existing session action.
2. Central content: internally scrollable dashboard body.
3. Footer/navigation: subtle local guide with `Inicio`, `Tutorias`, and `Actividad`.

The footer/navigation uses local anchors only and does not introduce new routes, backend behavior, or functional commitments.

## Treatment of `Que hago ahora`

`Que hago ahora` remains visible near the top of the dashboard and continues to answer the student's immediate next-action question. It was made more compact through smaller padding, icon size, typography, and line-height.

## Tutorias with horizontal scroll

`Tutorias disponibles` now becomes a horizontal-scroll row on mobile:

- `PAES Matematicas M1` remains the active/principal tutoring path.
- `PAES Matematicas M2` remains visible as non-operational architecture.
- `PAES Competencia Lectora` remains visible as non-operational architecture.

On desktop, the same section returns to a three-column grid.

## Operational elements

- Existing session guard.
- Existing `/now` dashboard route.
- Existing sign-out action.
- Existing student/enrollment/cycle read model.
- Existing current activity anchors.
- Existing `Ver actividad`, `Empezar`, and completion actions where already exposed by the previous flow.

## Visible non-operational elements

- `PAES Matematicas M2`.
- `PAES Competencia Lectora`.
- Footer navigation as local orientation, not new app routing.

## Responsive

Prepared for human audit at:

- Mobile: `390 x 844`.
- Tablet: `768 x 1024`.
- Desktop: `1366 x 768`.

Acceptance focus:

- Header visible.
- Footer/navigation visible.
- Main content contained between both.
- `Que hago ahora` compact.
- `Tutorias disponibles` horizontally scrollable on mobile.
- M1 CTA clear.
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
Human mobile audit of dashboard 1A
```
