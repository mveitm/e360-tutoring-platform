# MVP-SALES-PILOT-UI-DASHBOARD-1B - Compact study dashboard top containers to expose tutoring carousel

## Phase

```text
MVP-SALES-PILOT-UI-DASHBOARD-1B - Compact study dashboard top containers to expose tutoring carousel
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 1b75327
Latest accepted commit = 1b75327 - MVP-SALES-PILOT-UI-DASHBOARD-1A: refine mobile dashboard containment
Working tree clean before edits.
```

## Human audit inherited

Mauricio accepted the contained mobile-first vision from DASHBOARD-1A and requested:

- Fuse `Tu espacio de estudio` and `Que hago ahora`.
- Free vertical space at the top of the dashboard.
- Make `Tutorias disponibles` fully visible, or as close as possible, in the first mobile view.
- Reduce tutoring container/card sizes if needed.
- Preserve the contained mobile-first structure between header and footer/navigation.

In this phase, `DB` means dashboard, not database.

## Container fusion change

The dashboard top area now uses one compact card instead of two stacked/separate cards:

- Left/top content: location and greeting (`Tu espacio de estudio`).
- Right/embedded content: immediate state and next-action guidance (`Que hago ahora` / `Matematicas M1`).
- CTA row remains available in the same fused container.

The CTA behavior did not change.

## Tutoring visibility

`Tutorias disponibles` was compacted to appear earlier in the mobile viewport:

- Reduced section top margin.
- Reduced mobile padding.
- Reduced heading size.
- Reduced carousel gap.
- Reduced card width, padding, badge size, text size, and CTA size on mobile.

The horizontal mobile carousel remains intact. Desktop still uses a three-column layout.

## Operational elements

- Existing `/now` route.
- Existing session guard.
- Existing sign-out action.
- Existing student/enrollment/cycle read model.
- Existing M1/current activity anchors.
- Existing `Ver actividad`, `Empezar`, and completion actions where already exposed.

## Visible non-operational elements

- `PAES Matematicas M2`.
- `PAES Competencia Lectora`.
- Footer/navigation local anchors as orientation only.

## Responsive

Prepared for human audit at:

- Mobile: `390 x 844`.
- Tablet: `768 x 1024`.
- Desktop: `1366 x 768`.

Acceptance focus:

- Header remains compact and visible.
- Top container is fused.
- `Que hago ahora` remains clear but smaller.
- `Tutorias disponibles` is visible, or nearly fully visible, in the first mobile view.
- Horizontal carousel remains usable.
- M1 remains active/principal.
- M2/Lectora remain visible non-operational architecture.
- Footer/navigation remains subtle and present.
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
Human mobile audit of dashboard 1B
```
