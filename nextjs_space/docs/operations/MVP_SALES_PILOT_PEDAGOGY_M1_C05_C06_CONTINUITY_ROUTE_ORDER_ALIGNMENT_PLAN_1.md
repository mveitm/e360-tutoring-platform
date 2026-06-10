# MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-CONTINUITY-ROUTE-ORDER-ALIGNMENT-PLAN-1

## Purpose

Prepare a documentation-only plan to align route-order/continuity after the 4+4 registry split of:

```text
M1-C05 - Funciones lineales basicas I
M1-C06 - Funciones lineales basicas II
```

The goal is to define what must be aligned before human local/dev smoke resumes, without changing code, route-order, continuity, UI, API, schema, DB, Prisma, fixtures, or local/dev data in this phase.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = b9d1349da0ee15d49ecf3f31049cbdc874f8ea71
```

Accepted prior commit:

```text
b9d1349 MVP-SALES-PILOT-PEDAGOGY-M1: split C05 Funciones lineales
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: b9d1349da0ee15d49ecf3f31049cbdc874f8ea71
git rev-parse origin/main: b9d1349da0ee15d49ecf3f31049cbdc874f8ea71
git rev-parse origin/HEAD: b9d1349da0ee15d49ecf3f31049cbdc874f8ea71
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Prior split result

Source split code report:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C05_FUNCIONES_LINEALES_SPLIT_CODE_1.md
```

Prior result:

```text
M1_C05_FUNCIONES_LINEALES_SPLIT_CODE_COMPLETED
```

Registry split implemented:

```text
PAES M1 - Funciones lineales basicas I
contentKey: paes_m1_linear_functions_basic
items: q1-q4

PAES M1 - Funciones lineales basicas II
contentKey: paes_m1_linear_functions_basic_ii
items: q5-q8
```

Both resulting registry capsules have 4 exercises and preserve stems, options, correctOptionKey values, and authoredFeedback.

## Current C05/C06 targets

Current registry targets:

| visible correlativo | registry title | contentKey | item count | keys |
| --- | --- | --- | --- | --- |
| M1-C05 | PAES M1 - Funciones lineales basicas I | `paes_m1_linear_functions_basic` | 4 | B/B/A/C |
| M1-C06 | PAES M1 - Funciones lineales basicas II | `paes_m1_linear_functions_basic_ii` | 4 | D/A/B/C |

Current following registry capsule:

```text
title: PAES M1 - Lectura de tablas y graficos
contentKey: paes_m1_data_representation_entry
```

The prior visible-correlativo document still records old pre-split labels:

```text
M1-C05 - Funciones lineales basicas
M1-C06 - Lectura de tablas y graficos
```

That documentation now needs a future alignment update so the visible sequence becomes:

```text
M1-C05 - Funciones lineales basicas I
M1-C06 - Funciones lineales basicas II
M1-C07 - Lectura de tablas y graficos
```

## Current route-order/continuity diagnosis

Continuity code location:

```text
nextjs_space/lib/study-load-continuity.ts
```

Current relevant continuity map:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
paes_m1_linear_functions_basic -> paes_m1_data_representation_entry
```

Current behavior after the split:

```text
M1-C04 Refuerzo still routes to contentKey paes_m1_linear_functions_basic.
Because that contentKey now resolves to PAES M1 - Funciones lineales basicas I, the C04 -> C05 I transition is aligned.

M1-C05 I currently routes directly to paes_m1_data_representation_entry.
That skips paes_m1_linear_functions_basic_ii, so C05 I -> C06 II is not aligned.
```

Required future continuity map:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
paes_m1_linear_functions_basic -> paes_m1_linear_functions_basic_ii
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
```

The continuity service creates the next `StudyLoad` by resolving `nextContent.title` from `contentKey`. Therefore, once the map includes `paes_m1_linear_functions_basic_ii`, completion of C05 I should create a pending C06 II load with the new registry title.

## Local/dev data state diagnosis

This phase did not query or mutate DB.

Known human-observed state:

```text
The human previously opened the old M1-C05 Funciones lineales basicas load.
The old load showed 8 exercises.
The review was stopped before answering/submitting/finalizing.
```

Static implication after split:

```text
The old title PAES M1 - Funciones lineales basicas no longer exists as an exact registry key.
The viewer resolves content by StudyLoad.title.
An already-started local/dev StudyLoad with the old title is likely stale/mixed and should not be resumed.
```

No safe conclusion can be made from static files alone about the exact local/dev DB row status. A future explicit local/dev data-alignment phase should inspect and handle it under read-only-first rules, then mutate only with explicit authorization.

## Stale StudyLoad risk

Risk:

```text
If the human resumes the old in-progress 8-item local/dev StudyLoad, the UI may be stale, content may fail exact title lookup, or evidence may no longer match the current registry split.
```

Operational rule:

```text
Do not answer, submit, finalize, delete, reset, or manually edit the old 8-item instance in this phase.
Do not ask the human to continue smoke until continuity and local/dev data state are explicitly aligned.
```

Safe target for future smoke:

```text
A pending/current StudyLoad whose title resolves to PAES M1 - Funciones lineales basicas I and contentKey paes_m1_linear_functions_basic.
```

## Alignment options

Option A - Only route-order/continuity code alignment:

```text
Necessary but likely insufficient for immediate local/dev smoke if an old stale in-progress StudyLoad remains visible.
```

Option B - Only local/dev data alignment:

```text
Insufficient because the continuity map would still skip C06 II after C05 I completion.
```

Option C - Route-order/continuity plus local/dev data alignment:

```text
Preferred.
Route-order/continuity is required to create C06 II after C05 I.
Local/dev data alignment is required to avoid resuming the old 8-item/stale instance.
```

Option D - No alignment required; only re-open a new StudyLoad:

```text
Not recommended.
The current continuity map still skips C06 II, and the old local/dev state remains unsafe for smoke.
```

Option E - Blocked by ambiguity:

```text
Not needed.
The registry targets, contentKeys, continuity file, and stale risk are clear enough for a future narrow alignment phase.
```

## Recommended option

Recommended classification:

```text
C05_C06_ALIGNMENT_PLAN_READY_ROUTE_ORDER_AND_DATA
```

Preferred option:

```text
C) Both route-order/continuity alignment and local/dev data alignment.
```

Rationale:

```text
Continuity must be updated so C05 I leads to C06 II.
Local/dev must avoid the already-started stale 8-item instance before human smoke resumes.
```

## Future phase scope

Recommended next implementation phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-CONTINUITY-ROUTE-ORDER-ALIGNMENT-CODE-1
```

Suggested code scope if explicitly authorized:

```text
nextjs_space/lib/study-load-continuity.ts
```

Required continuity change:

```text
paes_m1_linear_functions_basic: paes_m1_linear_functions_basic_ii
paes_m1_linear_functions_basic_ii: paes_m1_data_representation_entry
```

Suggested documentation scope if explicitly authorized:

```text
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
new phase report
possibly the visible-correlativo living doc or a narrow route-order doc update if explicitly authorized
```

Suggested validation scope:

```text
Static content lookup confirms:
- paes_m1_linear_functions_basic resolves to PAES M1 - Funciones lineales basicas I.
- paes_m1_linear_functions_basic_ii resolves to PAES M1 - Funciones lineales basicas II.
- paes_m1_data_representation_entry still resolves.

Continuity helper behavior confirms:
- completing C05 I targets C06 II;
- completing C06 II targets Lectura de tablas y graficos;
- prior C04 -> C05 I remains intact.
```

Recommended separate local/dev data phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-LOCAL-DEV-DATA-ALIGNMENT-1
```

Local/dev data handling must start read-only and may mutate data only with explicit human authorization. Safe goals:

```text
- identify whether an old in-progress StudyLoad with the old title exists;
- avoid resuming old 8-item evidence;
- create or expose a clean pending C05 I StudyLoad only if explicitly authorized;
- document whether the stale row was left untouched, superseded by a new load, or otherwise handled.
```

## Stop conditions

Stop future alignment work if:

- preflight baseline does not match;
- target contentKeys are missing from the registry;
- `paes_m1_linear_functions_basic_ii` does not resolve by contentKey;
- updating continuity would require UI/API/schema/Prisma changes not explicitly authorized;
- local/dev data mutation is needed without explicit human authorization;
- an old 8-item StudyLoad has already been answered/submitted/finalized and its evidence semantics are unclear;
- route-order/visible-correlativo documentation target is ambiguous;
- browser automation or API-only testing would be needed;
- any secret, token, cookie, DB URL, `.env` value, or private credential would need to be printed.

## Scope safety

This phase was documentation/read-only except for authorized documentation updates.

Not performed:

- No code changes.
- No UI/API changes.
- No schema/DB/Prisma changes.
- No continuity changes.
- No route-order changes.
- No registry changes.
- No DB query required or executed.
- No DB mutation.
- No fixture mutation.
- No DB reset.
- No seed scripts.
- No migration.
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No secrets printed.
- No Sales-Ready or adaptive AI claim.

## Result

```text
C05_C06_ALIGNMENT_PLAN_READY_ROUTE_ORDER_AND_DATA
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-CONTINUITY-ROUTE-ORDER-ALIGNMENT-CODE-1
```

Purpose:

```text
Implement the narrow continuity mapping so C05 I routes to C06 II and C06 II routes to Lectura de tablas y graficos, then separately handle local/dev stale StudyLoad data before human UI smoke resumes.
```
