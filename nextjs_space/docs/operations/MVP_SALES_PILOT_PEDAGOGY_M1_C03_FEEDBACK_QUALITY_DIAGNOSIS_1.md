# MVP-SALES-PILOT-PEDAGOGY-M1-C03-FEEDBACK-QUALITY-DIAGNOSIS-1

## Purpose

Document and diagnose the human local/dev finding during the natural smoke of:

```text
M1-C03 - Problemas con ecuaciones lineales
```

The human was paused in the local/dev UI on the self-report screen, before selecting self-report and before pressing `Finalizar capsula`.

This phase is documentation and diagnosis only. It does not modify code, mutate data, change UI/API/schema/DB/Prisma, alter continuity or route-order, execute browser automation, run API-only tests, or ask the human to complete/finalize the capsule.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 0084be64df870042c77f81743c8f3246a553a743
```

## Preflight result

Preflight passed:

```text
git status --short: clean
git log --oneline --decorate --graph -8: 0084be6 aligned with HEAD, origin/main and origin/HEAD
git rev-parse HEAD: 0084be64df870042c77f81743c8f3246a553a743
git rev-parse origin/main: 0084be64df870042c77f81743c8f3246a553a743
git rev-parse origin/HEAD: 0084be64df870042c77f81743c8f3246a553a743
```

## Human paused UI state

Human local/dev observation:

```text
Durante smoke natural de M1-C03 - Problemas con ecuaciones lineales:

- Usuario llego a UI de autoreporte.
- Autoreporte todavia no respondido.
- Boton "Finalizar capsula" no accionado.
- En el header/autoreporte no se observa titulo/correlativo de la capsula.
- Al revisar feedback, el contenedor de feedback en todas las preguntas muestra solo feedback minimo tipo:

Incorrecta
Tu respuesta: A) 3
Respuesta correcta: B) 6

- No se observa feedback pedagogico breve.
- No se observa feedback completo.
- No se observa boton/enlace "paso a paso".
- Verificacion detenida aqui por instruccion humana.
```

The capsule was not finalized in this diagnosis phase.

## Observed feedback behavior

Observed state:

```text
M1-C03 feedback quality state: KEY_ONLY_FEEDBACK_VISIBLE
```

The visible feedback is the current answer-key fallback:

```text
Incorrecta
Tu respuesta: <selected option>
Respuesta correcta: <correct option>
```

Missing from the human observation:

- feedback pedagogico breve;
- feedback completo;
- expandable `paso a paso`;
- clear M1-C03 visible correlativo/title in the self-report/feedback header.

## M1-C03 content/registry diagnosis

Static registry identity:

```text
registry title: PAES M1 - Problemas con ecuaciones lineales
contentKey: paes_m1_linear_equations_word_problems
program: PAES_M1
topic: Ecuaciones lineales (problemas)
item count: 4
```

Static item evidence:

```text
q1 correctOptionKey: B
q2 correctOptionKey: C
q3 correctOptionKey: C
q4 correctOptionKey: C
```

Static diagnosis:

```text
M1-C03 has correctOptionKey for q1-q4.
M1-C03 does not have authoredFeedback blocks on q1-q4 in the registry entry.
```

Relevant runtime behavior from read-only inspection:

- `buildStudyLoadFeedback` maps `authoredFeedbackBrief` and `authoredFeedbackComplete` only when `item.authoredFeedback` exists.
- The answer form renders `Tu respuesta` and `Respuesta correcta` from selected/correct option metadata.
- The answer form renders `Retroalimentacion breve` and `paso a paso` only when authored feedback fields are present.

Therefore the observed key-only feedback is consistent with missing `authoredFeedback` in the M1-C03 registry entry, not with an identified UI rendering gap.

Diagnosis classification:

```text
M1_C03_FEEDBACK_QUALITY_BLOCKER_DIAGNOSED_AUTHORED_FEEDBACK_MISSING
```

## Comparison with M1-C04/M1-C05 standard

M1-C04 and M1-C05 are the current validated standard for this M1 content block:

```text
M1-C04 - Porcentaje y proporcionalidad en contexto
contentKey: paes_m1_numbers_percentage_proportionality_entry
manual local/dev UI smoke: PASSED

M1-C05 - Area, perimetro y medida en figuras simples
contentKey: paes_m1_geometry_area_measure_entry
manual local/dev UI smoke: PASSED
```

Static comparison:

- M1-C04 items include `authoredFeedback` with `briefId`, `completeId`, `version`, `brief`, and `complete`.
- M1-C05 items include `authoredFeedback` with `briefId`, `completeId`, `version`, `brief`, and `complete`.
- M1-C03 items currently include `correctOptionKey`, but no `authoredFeedback`.

Human smoke comparison:

- M1-C04 passed with feedback breve behavior observed.
- M1-C05 passed with feedback breve and feedback completo / paso-a-paso behavior observed.
- M1-C03 currently shows only key-check feedback and therefore does not meet the M1-C04/M1-C05 feedback quality standard.

## UX/correlativo observation

The human report also noted that the self-report/feedback area did not show a clear capsule title or visible correlativo.

UX debt:

```text
In the self-report/feedback screen, keep a human-visible capsule identifier:

M1-C03 - Problemas con ecuaciones lineales
```

or equivalent:

```text
Capsula PAES_M1: M1-C03 - Problemas con ecuaciones lineales
```

This phase does not implement UI/admin correlativo display.

## Scope safety

This diagnosis did not:

- modify code;
- mutate data;
- change UI/API/schema/DB/Prisma;
- change continuity or route-order;
- execute browser automation;
- run API-only tests;
- reset DB;
- run seed scripts;
- inspect or print secrets;
- ask the human to complete self-report;
- ask the human to press `Finalizar capsula`;
- use production/staging.

## Result

```text
M1_C03_FEEDBACK_QUALITY_BLOCKER_DIAGNOSED_AUTHORED_FEEDBACK_MISSING
```

Authorized human-facing state:

```text
M1-C03 feedback quality state: KEY_ONLY_FEEDBACK_VISIBLE
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C03-AUTHOREDFEEDBACK-NARROW-CODE-PREP-1
```

Purpose:

```text
Prepare a narrow source/authoring/code plan for adding authoredFeedback to M1-C03 - Problemas con ecuaciones lineales, preserving existing stems/options/keys and avoiding UI/API/schema/DB/Prisma/continuity/route-order changes.
```

Decision options:

```text
A) Fase estrecha de authoredFeedback para M1-C03. Recommended.
B) Fase UI para mostrar feedback completo si authoredFeedback ya existe pero no se renderiza. Not supported by current static evidence.
C) Fase de closeout si se decide aceptar key-only feedback como no bloqueante. Not recommended because M1-C03 falls below the M1-C04/M1-C05 standard.
```
