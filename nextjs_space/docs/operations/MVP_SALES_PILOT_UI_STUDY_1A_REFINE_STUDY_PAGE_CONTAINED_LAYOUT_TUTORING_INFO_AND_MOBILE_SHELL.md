# MVP-SALES-PILOT-UI-STUDY-1A - Refine Study Page contained layout, tutoring info and mobile shell

## Phase

```text
MVP-SALES-PILOT-UI-STUDY-1A - Refine Study Page contained layout, tutoring info and mobile shell
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = b81983c
Latest accepted commit = b81983c - MVP-SALES-PILOT-UI-STUDENT-SPINE-1: implement LP dashboard study page spine
Working tree clean before edits.
```

## Human audit inherited

Mauricio accepted the first Study Page draft and requested compact first-line headers, mobile contained behavior from Dashboard onward, `Tutoría Info` as an emergent/autocontained window, all Study Page containers inside the central zone, and a Study Page footer equal or very similar to the provisional Dashboard footer.

## Study Page changes

* Converted `/study/paes-m1` to a `100dvh` shell with `100svh` fallback.
* Changed global page scroll to compact header, internal central scroll, and fixed footer region.
* Kept tutoring state visible near the top.
* Preserved `Matricularse`, `Tutoría Activa`, and `No disponible` states.
* Replaced the prior disclosure with a modal/dialog for `Tutoría Info`.
* Applied Mauricio's requested `Tutoría Info` text.
* Removed defensive/disclaimer copy from Study Page UI.
* Preserved `Cápsulas`, `Progreso`, `Foco actual`, and `Evidencia` placeholders.

## Dashboard changes

* `/now` shell now uses `100dvh` with `100svh` fallback.
* Mobile outer spacing was reduced.
* Mobile header padding, logo surface, and logo size were reduced.
* No dashboard workflow, read model, or StudyLoad execution behavior was changed.

## Tutoría Info text applied

`Tutoría Info` is implemented as a modal/dialog using the existing UI dialog component.

It contains the requested title, destrezas list, metodología list, final cycle text, welcome message, and `Volver` close button.

## Footer ST

Study Page footer now uses a contained nav visually aligned with the Dashboard footer:

* `Dashboard` -> `/now`.
* `Cápsulas` -> local anchor.
* `Progreso` -> local anchor.
* `Info` -> opens `Tutoría Info`.

## Autocontained zone

The Study Page uses a fixed viewport shell, compact header, scrollable central content, and footer nav outside the central scroll.

## Operational elements

* Existing auth guard through server session.
* Existing read-only student lookup.
* Existing read-only active `PAES_M1` enrollment lookup.
* Existing read-only current cycle and study load count for visible `Cápsulas`.
* Navigation back to Dashboard.
* Modal open/close for `Tutoría Info`.

## Visible non-operational elements

* `Matricularse` remains visual only.
* `Cápsulas`, `Progreso`, `Foco actual`, and `Evidencia` remain placeholders where no reliable data exists.
* No capsules are executed from Study Page.

## Responsive

Prepared for human audit:

* Mobile standard: `390 x 844`.
* Tablet vertical: `768 x 1024`.
* Desktop: `1366 x 768`.

Criteria addressed:

* ST header compact in first line.
* DB header compacted.
* ST central zone is autocontained with internal scroll.
* `Tutoría Info` opens/closes as a contained modal.
* `Tutoría Info` text is legible on mobile.
* ST footer is similar to DB footer and allows return to Dashboard.
* No intentional horizontal overflow.

## Build

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
Passed.
```

## Limits respected

No changes were made to DB/base de datos, schema, migrations, auth architecture, credentials, StudentAccess lifecycle, new enrollment creation, M2 functional activation, Competencia Lectora functional activation, StudyLoad/Cápsula execution automation, automatic `Empezar`, responses, submit, self-report, completion, new automatic continuity, checkout, real payment, real trial, complete functional subscription, staging/production, secrets, Sales-Ready declaration, MVP-Beta cerrado completo declaration, or L1/M2 functional readiness declaration.

## Result

```text
STUDY_PAGE_M1_CONTAINED_LAYOUT_AND_TUTORING_INFO_REFINED
```

## Next recommended phase

```text
Human mobile audit of Study Page 1A
```
