# MVP-SALES-PILOT-UI-CAPSULE-5C - Verify and refine completed Cápsulas review access from Study Page

## Phase

MVP-SALES-PILOT-UI-CAPSULE-5C - Verify and refine completed Cápsulas review access from Study Page.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 9d54355
```

Last accepted commit:

```text
9d54355 - MVP-SALES-PILOT-UI-CAPSULE-5B: polish completed capsule final state
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio approved CAPSULE-5B mobile behavior:

* `Cápsula finalizada` is visually clear.
* `Autorreporte: [valor]` is integrated without its own container.
* `Volver a tutoría` renders correctly.
* `Ir DB` has appropriate secondary contrast.
* Redundant `Cápsula` label was suppressed.
* Completed capsules open in review state.
* Answers and feedback remain reviewable.
* `Comenzar` and initial instructions are not shown for completed capsules.
* Completed capsules do not restart.

Live non-blocking debt:

* `+ paso a paso` remains a minor Capsule Page debt and was not touched in this phase.

## Study Page Completed Review Access

`/study/paes-m1` now keeps `Siguiente cápsula` as the primary action for pending or in-progress capsules and also exposes completed capsules as reviewable history.

The Study Page reads completed capsules from the existing read model and shows a compact `Cápsulas completadas` section when completed capsules exist outside the current next action.

The section includes:

* `Cápsulas completadas`;
* `Cápsula completada`;
* capsule title;
* visible completed state;
* topic/review context;
* CTA `Revisar cápsula`.

If the only current capsule is completed, the existing current-capsule card still shows `Cápsula completada` and `Revisar cápsula`, without duplicating it in the completed list.

## Coexistence With Next Capsule

When continuity has produced a next pending or in-progress capsule, Study Page shows:

1. `Siguiente cápsula` with CTA `Ver cápsula`.
2. `Cápsulas completadas` with CTA `Revisar cápsula`.

This keeps the next learning action visible without hiding completed review access.

## CTA Revisar Cápsula

`Revisar cápsula` navigates to the existing capsule viewer:

```text
/now/study-loads/[id]
```

The viewer's existing completed state opens in review mode:

* no `Comenzar`;
* no initial instructions;
* no restart;
* responses remain visible;
* feedback remains visible;
* autoreporte remains visible when available.

## Limits Respected

No new DB mutation, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, automatic re-submit, automatic completion, completed-capsule restart, new automatic capsule creation, new automatic continuity, M2/Lectora activation, checkout, payment, real trial, functional subscription, staging, production, or secrets were introduced.

## Build

Verification command:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Next Recommended Phase

```text
Human mobile audit of Study Page completed-capsule review access
```
