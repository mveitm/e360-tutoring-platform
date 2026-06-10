# MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-CONTINUITY-ROUTE-ORDER-ALIGNMENT-PLAN-1

## Purpose

Prepare a documentation-only plan to align continuity/route-order after the split and authoredFeedback repair of:

```text
M1-C07 - Lectura de tablas y graficos I
M1-C08 - Lectura de tablas y graficos II
```

The target natural flow is:

```text
M1-C06 - Funciones lineales basicas II
-> M1-C07 - Lectura de tablas y graficos I
-> M1-C08 - Lectura de tablas y graficos II
```

This phase does not edit code, mutate DB, or touch continuity/route-order yet.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 41157563a82a61320bfd500606733930dcf65a37
```

Accepted prior commit:

```text
4115756 MVP-SALES-PILOT-PEDAGOGY-M1: verify C07 C08 authored feedback
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 41157563a82a61320bfd500606733930dcf65a37
git rev-parse origin/main: 41157563a82a61320bfd500606733930dcf65a37
git rev-parse origin/HEAD: 41157563a82a61320bfd500606733930dcf65a37
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## Prior split and authoredFeedback result

Split source:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_LECTURA_TABLAS_GRAFICOS_SPLIT_CODE_1.md
```

Split result:

```text
M1_LECTURA_TABLAS_GRAFICOS_SPLIT_CODE_COMPLETED
```

authoredFeedback source:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_LECTURA_TABLAS_GRAFICOS_AUTHORED_FEEDBACK_1.md
```

authoredFeedback result:

```text
M1_C07_C08_LECTURA_TABLAS_GRAFICOS_AUTHORED_FEEDBACK_IMPLEMENTED
```

## Current C07/C08 targets

Current registry targets:

| visible correlativo | registry title | contentKey | item count | keys | authoredFeedback |
| --- | --- | --- | --- | --- | --- |
| M1-C07 | PAES M1 - Lectura de tablas y graficos I | `paes_m1_data_representation_entry` | 4 | D/B/C/A | q1-q4 present |
| M1-C08 | PAES M1 - Lectura de tablas y graficos II | `paes_m1_data_representation_entry_ii` | 4 | C/B/B/A | q5-q8 present |

C07 and C08 comply with the living M1 max-4 item-count standard and have authoredFeedback breve/completo in the static registry.

## Current route-order/continuity diagnosis

Continuity code location:

```text
nextjs_space/lib/study-load-continuity.ts
```

Current relevant continuity map:

```text
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
```

Current behavior after the split:

```text
Completing M1-C06 - Funciones lineales basicas II targets contentKey paes_m1_data_representation_entry.
That contentKey now resolves to PAES M1 - Lectura de tablas y graficos I.
Therefore C06 II -> C07 I is already aligned.
```

Missing behavior:

```text
paes_m1_data_representation_entry currently has no next mapping.
Completing C07 I would end the sequence instead of creating C08 II.
```

Required future continuity map:

```text
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
paes_m1_data_representation_entry -> paes_m1_data_representation_entry_ii
```

Whether C08 II should be terminal or route onward should remain a future route-order decision after C08 human smoke.

## Local/dev data state diagnosis

This phase did not query or mutate DB.

Known human-observed local/dev state:

```text
The human started the prior Lectura de tablas y graficos StudyLoad.
The prior StudyLoad showed 8 exercises.
The human stopped before answering, submitting, or finalizing.
```

Static implication after registry split:

```text
The old exact title PAES M1 - Lectura de tablas y graficos no longer exists as the active registry title.
The active C07 title is PAES M1 - Lectura de tablas y graficos I.
The old started local/dev StudyLoad should be treated as stale/mixed.
```

No safe conclusion can be made from static files alone about the exact local/dev row status. A future explicit local/dev data-alignment phase should inspect read-only first and mutate only with human authorization.

## Stale StudyLoad risk

Risk:

```text
If the human resumes the old 8-item StudyLoad, it may no longer match the current registry title/content shape.
It may show stale content, fail content lookup, or create evidence inconsistent with the split C07/C08 registry.
```

Operational rule:

```text
Do not answer, submit, finalize, delete, reset, or manually edit the old 8-item instance in this phase.
Do not resume human smoke until continuity and local/dev data state are explicitly aligned.
```

## Alignment options

Option A: only route-order/continuity code alignment.

```text
Insufficient. It would make future completions create C08, but it would not handle the already-started stale 8-item local/dev StudyLoad.
```

Option B: only local/dev data alignment.

```text
Insufficient. It could retire/repoint stale local data, but completing C07 would still not create C08 without a continuity map.
```

Option C: route-order/continuity + local/dev data alignment.

```text
Preferred. Static continuity needs C07 -> C08, and local/dev has a known stale 8-item started instance risk.
```

Option D: no alignment required.

```text
Incorrect. C07 currently has no next mapping to C08, and stale local/dev risk is documented.
```

Option E: blocked by ambiguity.

```text
Not needed. The target contentKeys and continuity file are clear.
```

## Recommended option

Recommended classification:

```text
C07_C08_ALIGNMENT_PLAN_READY_ROUTE_ORDER_AND_DATA
```

Preferred path:

```text
1. Future narrow route-order/continuity code phase.
2. Future explicit LOCAL_DEV stale-data alignment phase with human authorization.
3. Then C07 human UI smoke readiness.
```

Justification:

```text
C06 II -> C07 I is already aligned by preserving paes_m1_data_representation_entry as Part I.
C07 I -> C08 II is not aligned because paes_m1_data_representation_entry has no next mapping.
The old 8-item local/dev StudyLoad was started and should not be reused after the registry split.
```

## Future phase scope

Future route-order/continuity code phase:

```text
Allowed code file if explicitly authorized:
nextjs_space/lib/study-load-continuity.ts
```

Minimum code change:

```text
Add:
paes_m1_data_representation_entry -> paes_m1_data_representation_entry_ii

Preserve:
paes_m1_linear_functions_basic_ii -> paes_m1_data_representation_entry
```

Do not modify:

- registry content;
- authoredFeedback;
- stems/options/correctOptionKey;
- UI/API;
- schema/DB/Prisma;
- fixtures;
- unrelated continuity edges.

Future LOCAL_DEV data-alignment phase:

```text
Requires explicit human authorization to mutate local/dev data.
Must inspect read-only first.
Must not print secrets, DB URLs, private personal data, tokens, cookies, or .env values.
```

Allowed local/dev data objective only if safe:

```text
Retire or realign the old started 8-item Lectura de tablas y graficos StudyLoad.
Expose a clean pending C07 I StudyLoad if needed.
Allow continuity to create C08 II after C07 completion.
Preserve completed C05 I and C06 II evidence.
```

## Stop conditions

Stop future route-order code phase if:

- continuity file target is not `nextjs_space/lib/study-load-continuity.ts`;
- C07/C08 contentKeys do not resolve;
- the change requires UI/API/schema/DB/Prisma work;
- the change would modify unrelated route-order edges;
- the phase would need to mutate local/dev data.

Stop future local/dev data phase if:

- environment cannot be confirmed as LOCAL_DEV without printing secrets;
- target student/enrollment/cycle is ambiguous;
- stale 8-item StudyLoad cannot be identified safely;
- no reversible/documentable minimal mutation path exists;
- production/staging risk appears;
- schema/reset/seed/migration would be required.

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
C07_C08_ALIGNMENT_PLAN_READY_ROUTE_ORDER_AND_DATA
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-CONTINUITY-ROUTE-ORDER-CODE-1
```

Purpose:

```text
Implement the minimum continuity map so M1-C07 - Lectura de tablas y graficos I routes to M1-C08 - Lectura de tablas y graficos II, without mutating DB or touching UI/API/schema/registry/authoredFeedback.
```
