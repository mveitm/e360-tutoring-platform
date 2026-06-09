# MVP-GOV-CONTENT-CAPSULE-CORRELATIVE-PROTOCOL-1

## Purpose

Define a living governance protocol for unique visible capsule correlatives in E360 / Bexauri content work.

The goal is to prevent users, admins, testers, students, handoff readers, and future agents from relying on internal planning numbers such as "capsule 3/5" when referring to implemented or in-implementation capsules.

This phase is documentation-only. It does not implement UI, modify code, mutate data, alter schema/DB/Prisma, change continuity, change route-order, prepare fixtures, execute smoke, or run browser automation.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 0b0f725c1f82fd0422c4dc376ee4022fc236fe13
```

## Preflight result

Preflight passed:

```text
git status --short: clean
git log --oneline --decorate --graph -8: 0b0f725 aligned with HEAD, origin/main and origin/HEAD
git rev-parse HEAD: 0b0f725c1f82fd0422c4dc376ee4022fc236fe13
git rev-parse origin/main: 0b0f725c1f82fd0422c4dc376ee4022fc236fe13
git rev-parse origin/HEAD: 0b0f725c1f82fd0422c4dc376ee4022fc236fe13
```

## Protocol rule

Human-facing capsule references must use a unique visible correlativo once a capsule is implemented or enters implementation.

Do not refer to capsules only by internal planning numbers such as:

```text
capsule 3/5
capsula 3/5
candidate capsule 3
candidate capsule 5
```

when speaking to:

- user;
- admin;
- tester;
- student;
- handoff reader;
- future agent.

Use a stable visible pattern such as:

```text
M1-C01 - Entrada balanceada inicial
M1-C02 - Ecuaciones lineales basicas
M1-C03 - Problemas con ecuaciones lineales
M1-C04 - Porcentaje y proporcionalidad en contexto
M1-C05 - Area, perimetro y medida en figuras simples
```

Exact final numbering may be refined by the source of truth, but the protocol requires a single visible correlativo once a capsule is implemented or enters implementation.

## Current PAES_M1 provisional correlativo map

Current provisional map for the PAES_M1 workstream:

```text
M1-C01 - Entrada balanceada inicial
contentKey: paes_m1_balanced_entry_initial
status: implemented/live registry content

M1-C02 - Ecuaciones lineales basicas
contentKey: paes_m1_linear_equations_basic
status: implemented/live registry content; authoredFeedback and completion flow locally verified

M1-C03 - Problemas con ecuaciones lineales
contentKey: paes_m1_linear_equations_word_problems
status: implemented/live registry content; currently visible pending capsule in the local/dev ST M1 flow

M1-C04 - Porcentaje y proporcionalidad en contexto
contentKey: paes_m1_numbers_percentage_proportionality_entry
status: implemented in static registry; local/dev direct smoke access prepared

M1-C05 - Area, perimetro y medida en figuras simples
contentKey: paes_m1_geometry_area_measure_entry
status: implemented in static registry; local/dev direct smoke access prepared
```

This map is a governance reference for communication and handoff clarity. It does not create UI labels, schema fields, route-order changes, or continuity changes.

## Required distinctions

Every future content, implementation, smoke, handoff, or admin/testing prompt must distinguish these concepts:

- Visible correlativo: the human-facing stable identifier, for example `M1-C04`.
- Internal candidate/planning number: legacy planning shorthand, for example "candidate capsule 3".
- Cycle order: the order of StudyLoads in a specific student's active cycle.
- Student-visible title: the title shown in the student UI.
- Admin/dev contentKey: the registry identifier used by code and operations.
- Implementation status: documentation-only, registry implemented, local/dev prepared, smoke verified, or blocked.
- Route/direct smoke access: operational path such as `/now/study-loads/[id]`, which is not the same as visible sequence.

The visible correlativo must not be confused with cycle order. A student cycle can contain pending StudyLoads whose UI surface shows only the next pending item, while the correlativo remains the communication anchor for content identity.

## Communication rule

When legacy or internal references are unavoidable, write them explicitly as legacy/internal.

Approved pattern:

```text
M1-C04 - Porcentaje y proporcionalidad en contexto, previously referred to internally as candidate capsule 3.
```

Approved pattern:

```text
M1-C05 - Area, perimetro y medida en figuras simples, previously referred to internally as candidate capsule 5.
```

Do not allow internal candidate numbers to masquerade as student/admin-visible sequence.

Avoid:

```text
Test capsule 3.
Open capsule 5.
Capsules 3/5 are next.
```

Prefer:

```text
Test M1-C04 - Porcentaje y proporcionalidad en contexto.
Open M1-C05 - Area, perimetro y medida en figuras simples.
M1-C04/M1-C05 are prepared for direct local/dev smoke access.
```

## Handoff and prompt requirements

Future prompts and handoffs involving implemented or in-implementation capsules must include:

- visible correlativo;
- student-visible title;
- contentKey;
- implementation/smoke status;
- any legacy/internal candidate reference only if needed and explicitly labeled;
- whether the current route is a direct smoke path or a student-visible sequence path.

For example:

```text
Target:
M1-C04 - Porcentaje y proporcionalidad en contexto
contentKey: paes_m1_numbers_percentage_proportionality_entry
legacy/internal reference: candidate capsule 3
status: registry implemented; local/dev direct smoke link handed off; manual UI smoke pending
```

## Product debt

The UI/admin should eventually display the visible correlativo for:

- searchability;
- manual testing;
- support;
- audit;
- handoff clarity;
- student/admin coordination.

Examples:

```text
M1-C01, M1-C02, M1-C03...
```

or:

```text
Capsula 01, Capsula 02, Capsula 03...
```

This phase does not implement UI, schema, admin, registry metadata, route-order, continuity, or runtime behavior.

## What this protocol does not authorize

This protocol does not authorize:

- code changes;
- UI changes;
- API changes;
- schema/DB/Prisma changes;
- continuity changes;
- route-order changes;
- data mutation;
- fixture prep;
- smoke execution;
- production/staging;
- browser automation;
- API-only tests;
- Sales-Ready claims;
- adaptive AI claims.

## Result

```text
CAPSULE_CORRELATIVE_PROTOCOL_DOCUMENTED_LIVING_INDEX_REFERENCE_ADDED
```

## Next recommended use

Use this protocol in the next M1-C04/M1-C05 manual smoke prompt and in all future capsule implementation/smoke handoffs.

If future UI/admin work is authorized, open a separate phase to design or implement visible correlativo display without changing this governance phase retroactively.
