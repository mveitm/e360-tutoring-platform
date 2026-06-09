# MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-VISIBLE-FLOW-ALIGNMENT-PLAN-1

## Purpose

Prepare a narrow, safe plan to align PAES_M1 capsules 3 and 5 with the real student-visible ST M1 flow after the diagnosis:

```text
DIAGNOSIS_3_5_PREPARED_DIFFERENT_TARGET_OR_CYCLE
```

This phase does not mutate data, prepare fixtures, change code, alter continuity, or change route-order.

## Baseline

Expected baseline:

```text
HEAD = origin/main = origin/HEAD = b89a24945f8ca702657a49d12932586e42c569ae
```

Phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-VISIBLE-FLOW-ALIGNMENT-PLAN-1
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git log --oneline --decorate --graph -8: HEAD, origin/main, and origin/HEAD aligned at b89a249
git rev-parse HEAD: b89a24945f8ca702657a49d12932586e42c569ae
git rev-parse origin/main: b89a24945f8ca702657a49d12932586e42c569ae
git rev-parse origin/HEAD: b89a24945f8ca702657a49d12932586e42c569ae
```

## Prior diagnosis

The prior visibility/sequence diagnosis concluded:

```text
DIAGNOSIS_3_5_PREPARED_DIFFERENT_TARGET_OR_CYCLE
```

Key facts:

- Capsules 3/5 are present in the static registry.
- Capsules 3/5 were prepared in one local/dev synthetic target cycle.
- The human-observed ST M1 flow maps to a different open M1 cycle.
- ST M1 selects the current capsule from the active cycle, preferring in-progress first and then the oldest pending StudyLoad by `createdAt`.
- The prepared synthetic cycle and the human-visible student cycle are not the same test surface.

## Visible student flow

Human-observed ST M1 state:

```text
Siguiente capsula:
PAES M1 - Problemas con ecuaciones lineales
Estado: Pendiente

Capsula:
Ecuaciones lineales (problemas)

Capsulas completadas:
- PAES M1 - Ecuaciones lineales basicas
- PAES M1 - Entrada balanceada inicial

Panel:
2 capsulas trabajadas
3 capsulas en tu ciclo activo
Foco actual: Ecuaciones lineales (problemas)
```

Internal mapping:

```text
contentKey: paes_m1_linear_equations_word_problems
title: PAES M1 - Problemas con ecuaciones lineales
```

This visible cycle currently has a pending word-problems capsule and does not expose capsules 3/5.

## Prepared target/cycle summary

The previous local/dev fixture/data prep selected a synthetic target and prepared:

```text
paes_m1_numbers_percentage_proportionality_entry: pending practice StudyLoad
paes_m1_geometry_area_measure_entry: pending practice StudyLoad
```

The prepared target/cycle was safe for a synthetic local/dev fixture, but it was not the same target/cycle as the human-observed ST M1 flow.

Important implication:

```text
READY_FOR_MANUAL_SMOKE was true for the selected synthetic fixture target, not for the currently visible ST M1 student flow.
```

## Gap analysis

The gap is not a registry problem:

- Capsule 3 exists in the registry.
- Capsule 5 exists in the registry.
- AuthoredFeedback exists for both.

The gap is not a UI rendering proof yet:

- The real visible ST M1 flow has not opened capsules 3/5.
- No q1-q4 smoke has run for 3/5.

The gap is target/cycle alignment:

- The visible student flow is on the cycle where the next pending capsule is `paes_m1_linear_equations_word_problems`.
- The prepared 3/5 StudyLoads are on another synthetic target/cycle.
- A later mutation phase must either add capsules 3/5 to the visible cycle or deliberately switch the smoke target to the synthetic prepared fixture.

## Alignment options

### Option A: Align capsules 3/5 to the current visible M1 student cycle

Create only the missing capsule 3 and capsule 5 pending practice StudyLoads in the exact cycle currently visible in ST M1, preserving existing completed capsules and the pending word-problems capsule.

Pros:

- Tests the same student-visible flow Mauricio is seeing.
- Avoids confusion between prepared synthetic target and observed UI target.
- Preserves continuity/route-order code; this is data alignment only.

Risks/conditions:

- Requires a future explicit local/dev data mutation phase.
- Must identify the visible cycle safely without printing secrets or private personal data.
- Must not reorder, complete, delete, or reset existing StudyLoads.
- Must decide whether the word-problems pending capsule remains first visible until completed, or whether the manual smoke intentionally opens 3/5 through another UI path if available.

### Option B: Use a separate explicit fixture/test target for smoke 3/5

Keep the human-visible ST M1 flow intact and run 3/5 smoke against the synthetic target where the StudyLoads were already prepared.

Pros:

- Avoids touching the human-observed cycle.
- Uses the existing prepared data.
- Keeps the visible student's current learning path untouched.

Risks/conditions:

- Requires a clear login/access path to the synthetic target.
- The human must know which local/dev account/fixture is under test without sharing credentials.
- It does not validate the currently visible ST M1 student flow.

### Option C: Do not mutate data; wait for natural continuity

Leave the visible cycle untouched and wait until current continuity naturally progresses beyond word-problems.

Pros:

- No immediate data prep.
- Preserves current operational route.

Risks/conditions:

- Current continuity does not route to capsules 3/5.
- Waiting alone will not expose capsules 3/5 unless future continuity/route-order work changes the route or the cycle receives those StudyLoads.

### Option D: Pause until a correlativo visibility rule exists

Do not align data until student/admin surfaces can show stable capsule identifiers such as `M1-C01`, `M1-C02`, `M1-C03`.

Pros:

- Reduces future confusion between registry source order, cycle order, and visible next capsule.
- Improves auditability.

Risks/conditions:

- Blocks 3/5 manual smoke behind a UX/product follow-up.
- Requires future UI/product work that is out of scope here.

## Recommended option

Recommended option:

```text
Option A: Align capsules 3/5 to the current visible M1 student cycle
```

Justification:

- The user's current observed blocker is specifically about the real ST M1 visible flow.
- A smoke intended to validate what the student can actually see should use that same visible cycle, not a different synthetic target unless the product explicitly chooses synthetic-only smoke.
- The operation can be narrow if a later phase identifies the visible cycle safely and creates only two pending practice StudyLoads for the already registry-backed capsules 3/5.
- This should not require code changes, UI changes, schema changes, continuity changes, or route-order changes.

Future mutation phase must still stop if:

- the visible target/cycle cannot be identified without secrets or private personal data;
- multiple candidate visible cycles are possible;
- capsule 3 or 5 already exists in the visible cycle with incompatible status/loadType;
- mutation would require deleting, resetting, reordering, or completing existing StudyLoads;
- mutation would require code/schema/continuity/route-order changes.

## Correlative visibility issue

The UI/admin should expose a stable human-visible capsule identifier for search, audit, and smoke coordination, for example:

```text
M1-C01, M1-C02, M1-C03...
```

or:

```text
Capsula 01, Capsula 02, Capsula 03...
```

This phase only records the debt. It does not implement UI, schema, admin, or registry metadata changes.

## Out of scope

- Data mutation.
- Fixture preparation.
- Creating StudyLoads.
- Reassigning StudyLoads.
- Deleting/resetting existing StudyLoads.
- Completing word-problems.
- Code changes.
- UI/API/schema/DB/Prisma changes.
- Continuity changes.
- Route-order changes.
- Browser automation.
- API-only tests.
- DB reset.
- Seed scripts.
- Fixture mutation.
- Production/staging.
- Secrets, tokens, cookies, DB URLs, `.env` values, passwords, session values, or credentials.

## Result

```text
VISIBLE_FLOW_ALIGNMENT_PLAN_READY
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-VISIBLE-FLOW-LOCAL-DEV-DATA-ALIGNMENT-1
```

Purpose:

```text
In local/dev only, identify the exact human-visible ST M1 cycle safely and create only the missing pending practice StudyLoads for capsules 3 and 5 in that cycle, without changing code, continuity, route-order, schema, UI/API, or existing StudyLoad states.
```

Alternative if the team does not want to touch the visible flow:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-SYNTHETIC-TARGET-MANUAL-UI-SMOKE-ACCESS-CHECK-1
```
