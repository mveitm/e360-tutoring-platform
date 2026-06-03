# MVP-SALES-PILOT-UI-CAPSULE-4C - Improve post-submit feedback discoverability and review copy

## Phase

MVP-SALES-PILOT-UI-CAPSULE-4C - Improve post-submit feedback discoverability and review copy.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 757ab53
```

Last accepted commit:

```text
757ab53 - MVP-SALES-PILOT-UI-CAPSULE-4B: refine autoreporte draft persistence
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio approved the CAPSULE-4B mobile audit checklist.

Requested refinements:

* make the per-question feedback section easier to discover after `Paso 2`;
* replace `Paso 2: Toma nota de tu resultado` with `Paso 2: Revisa tu resultado`;
* replace the previous review guidance with `Toma notas en tu cuaderno de lo que hiciste bien y de lo necesitas reforzar`.

## Copy Changes

The post-submit review heading now uses:

```text
Paso 2: Revisa tu resultado
```

The review guidance now uses:

```text
Toma notas en tu cuaderno de lo que hiciste bien y de lo necesitas reforzar
```

This copy was applied in the active post-submit review state and the completed/read-only feedback summary.

## Feedback Discoverability

The post-submit `Paso 2` block now includes a compact mobile-first affordance:

* `Desliza para revisar tu feedback por pregunta.`;
* a downward cue icon;
* a local anchor action, `Ver feedback por pregunta`, targeting the first feedback block.

The first per-question feedback block is marked with a local anchor id. This keeps feedback discoverable without sending autoreporte, completing the capsule, creating continuity, or changing the existing feedback logic.

## Limits Respected

No automatic autoreporte, automatic completion, new continuity automation, automatic submit, automatic answers, new capsule creation, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, M2/Lectora activation, checkout, payment, real trial, functional subscription, staging, production, secrets, official PAES score claim, or definitive mastery claim was introduced.

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
Human mobile audit of Capsule 4C post-submit feedback discoverability
```
