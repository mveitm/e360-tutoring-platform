# MVP-FLOW-3-C2 - Validate in_progress content-backed /now behavior

## Purpose

Validate that content-backed in-progress StudyLoads use `Ver actividad` as the completion path in `/now` and no longer show the legacy `Terminar` button.

## Scope

This was a local validation and documentation-only phase. No app code, endpoint, schema, registry, or lifecycle logic was changed.

## Local fixture used

- Fresh local PAES_M1 student fixture for Flow3 C2.
- The student was enrolled in `PAES_M1`.
- MVP-FLOW-2 bootstrap created the initial StudyLoad `PAES M1 - Entrada balanceada inicial`.

## Validation steps

1. Student opened `/now`.
2. Pending load showed `Ver actividad` and `Empezar`.
3. Student pressed `Empezar`.
4. `/now` refreshed to the `in_progress` state.
5. `/now` showed `En curso (1)`.
6. `/now` showed `PAES M1 - Entrada balanceada inicial`.
7. `/now` showed `Ver actividad`.
8. `/now` did not show `Terminar`.

## Observed result

The content-backed in-progress StudyLoad used `Ver actividad` as the visible continuation and completion path. The legacy `/now` `Terminar` button was hidden as intended.

## Non-goals preserved

- No app code changes.
- No endpoint changes.
- No schema changes.
- No registry changes.
- No StudyLoad lifecycle logic changes.
- No answer submission logic changes.
- No self-report option changes.
- No build was run during this documentation phase.
- No commit or push was performed.

## Result

MVP-FLOW-3-C2 passed. Fresh local validation confirmed the C1 behavior for an in-progress content-backed StudyLoad.

## Next recommended step

MVP-FLOW-3-D - Consolidate MVP-FLOW-3 closure evidence and decide next flow increment.
