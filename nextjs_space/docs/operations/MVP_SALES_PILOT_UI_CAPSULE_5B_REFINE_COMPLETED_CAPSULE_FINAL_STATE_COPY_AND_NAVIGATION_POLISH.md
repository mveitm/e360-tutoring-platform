# MVP-SALES-PILOT-UI-CAPSULE-5B - Refine completed Capsule final-state copy and navigation polish

## Phase

MVP-SALES-PILOT-UI-CAPSULE-5B - Refine completed CÃ¡psula final-state copy and navigation polish.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = e7c5f19
```

Last accepted commit:

```text
e7c5f19 - MVP-SALES-PILOT-UI-CAPSULE-5A: refine completed capsule review state
```

Working tree was clean at preflight.

## Inherited Human Audit

Mauricio approved CAPSULE-5A mobile behavior:

* initial instructions are suppressed;
* completed CÃ¡psula does not restart;
* answers and feedback remain reviewable;
* Study Page can return to review a completed CÃ¡psula.

Requested polish:

* increase emphasis on `CÃ¡psula finalizada`;
* show `Autorreporte: [valor]` as integrated text, not a separate container;
* fix `Volver a tutorÃ­a` encoding;
* reduce `Ir DB` visual contrast;
* remove redundant `CÃ¡psula` label in completed state.

## Completed State Polish

The completed header now gives `CÃ¡psula finalizada` higher hierarchy through:

* stronger font weight;
* larger text;
* subtle Bexauri green/petroleum surface;
* restrained border and shadow.

It remains a positive completion state, not an alert or error.

## Autoreporte Display

The saved autoreporte is now shown as an integrated line:

```text
Autorreporte: [valor]
```

It no longer uses its own bordered chip/container.

## Navigation Polish

`Volver a tutorÃ­a` was corrected in the completed state action.

`Ir DB` now uses a lower-contrast secondary style:

* light background;
* grey-blue text;
* subtle border;
* no strong dark primary fill.

The header/footer `Ir DB` action also uses the lower-contrast secondary treatment.

## Removed / Reduced Copy

The redundant `CÃ¡psula` badge is suppressed for completed state.

The completed header context now uses `RevisiÃ³n PAES_M1` / `RevisiÃ³n PAES_M1` instead of repeating `CÃ¡psula` as a generic label while preserving the useful state copy `CÃ¡psula finalizada`.

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
Human mobile audit of completed CÃ¡psula final-state polish
```
