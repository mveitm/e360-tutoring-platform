# MVP-SALES-PILOT-PEDAGOGY-M1-LECTURA-TABLAS-GRAFICOS-ITEM-COUNT-DIAGNOSIS-1

## Purpose

Diagnose the human local/dev blocker observed after validating the StudyLoad start/resume fix.

The next visible capsule was:

```text
Lectura de tablas y graficos
```

The UI displayed 8 exercises. The human stopped the review before answering, submitting, or finalizing the capsule.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = d0cf5a092d8d2e7bd34ccf8d6461d62889ec996f
```

Accepted prior commit:

```text
d0cf5a0 MVP-UX-STUDYLOAD: fix start resume refresh
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: d0cf5a092d8d2e7bd34ccf8d6461d62889ec996f
git rev-parse origin/main: d0cf5a092d8d2e7bd34ccf8d6461d62889ec996f
git rev-parse origin/HEAD: d0cf5a092d8d2e7bd34ccf8d6461d62889ec996f
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Human observation

Human-reported state after the UX fix:

```text
- start/resume verification passed/OK;
- Comenzar no longer requires F5/refresh;
- exercises show correctly after start.
```

New blocker:

```text
- visible capsule: Lectura de tablas y graficos;
- exercises displayed: 8;
- living M1/M2 standard: maximum 4 exercises per capsule;
- review stopped;
- capsule not answered;
- answers not submitted;
- capsule not finalized.
```

## Start/resume fix verification

The blocker is not the previous start/resume refresh issue.

Human verification confirms the fix from:

```text
MVP-UX-STUDYLOAD-START-RESUME-REFRESH-ISSUE-FIX-1
```

worked for this start attempt: pressing `Comenzar` showed exercises without manual F5/refresh.

## Capsule target/correlativo diagnosis

Static route-order evidence after the C05/C06 split shows:

```text
M1-C05 - Funciones lineales basicas I
-> M1-C06 - Funciones lineales basicas II
-> Lectura de tablas y graficos
```

The pre-split visible-correlativo freeze still recorded:

```text
M1-C06 - Lectura de tablas y graficos
```

The later C05/C06 alignment plan explicitly noted that, after inserting C05 I and C06 II, the visible sequence should become:

```text
M1-C05 - Funciones lineales basicas I
M1-C06 - Funciones lineales basicas II
M1-C07 - Lectura de tablas y graficos
```

Diagnosis:

```text
Recommended visible correlativo for the current flow: M1-C07 - Lectura de tablas y graficos.
```

The dedicated visible-correlativo living document has not yet been separately refreshed after the C05/C06 split, so future split/repair work should also carry an explicit correlativo-doc alignment note.

## contentKey diagnosis

Registry target:

```text
title: PAES M1 - Lectura de tablas y graficos
contentKey: paes_m1_data_representation_entry
contentVersion: v1
program: PAES_M1
topic: Lectura de tablas y graficos
```

Continuity target after C06 II:

```text
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
```

This matches the human-observed next capsule title.

## Item count diagnosis

Registry source:

```text
nextjs_space/lib/study-load-content.ts
```

The registry instructions state:

```text
Esta actividad tiene 8 preguntas de opcion multiple sobre lectura de tablas y graficos simples.
```

Registry item count:

```text
8 items: q1, q2, q3, q4, q5, q6, q7, q8
```

Current correctOptionKey inventory:

```text
q1: D
q2: B
q3: C
q4: A
q5: C
q6: B
q7: B
q8: A
```

Classification of the observed 8 exercises:

```text
A) registry expected but violates standard
```

No static evidence in this phase indicates that the 8 exercises are caused by a stale local/dev StudyLoad, wrong capsule, or documented exception.

## authoredFeedback readiness note

Static registry inspection found `correctOptionKey` values on q1-q8, but no `authoredFeedback` blocks on the `paes_m1_data_representation_entry` items.

Readiness note:

```text
Lectura de tablas y graficos is not ready for human feedback-quality smoke.
It needs split/repair for item count and a later authoredFeedback phase unless the split phase supplies or preserves authoredFeedback from an approved source.
```

## Pedagogical standard impact

Living standard:

```text
M1 ideal: 4 exercises per capsule
M1 maximum: 4 exercises per capsule
```

The current registry entry has 8 exercises and therefore exceeds the living M1 standard. It should not proceed to ordinary human smoke with all 8 exercises unless a future PRO/direction phase records an explicit exception.

Because authoredFeedback is also absent, continuing smoke would likely test an oversized capsule with fallback/key-check feedback instead of the current feedback standard.

## Scope safety

This phase was documentation/read-only.

Not performed:

- No code changes.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No registry/content changes.
- No continuity/route-order changes.
- No seed or fixture mutation.
- No DB mutation.
- No production or staging access.
- No browser automation.
- No API-only tests.
- No build.
- No secrets printed.

## Result

```text
M1_LECTURA_TABLAS_GRAFICOS_ITEM_COUNT_BLOCKER_DIAGNOSED_SPLIT_REQUIRED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-LECTURA-TABLAS-GRAFICOS-SPLIT-PLAN-1
```

Purpose:

```text
Plan a narrow split/repair for Lectura de tablas y graficos so the content complies with the M1 maximum 4-exercise standard, clarifies its current visible correlativo as M1-C07 after C05/C06, and determines whether authoredFeedback must be authored before human UI smoke resumes.
```
