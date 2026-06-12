# MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-TABLE-STIMULUS-HUMAN-UI-SMOKE-CLOSEOUT-1

## Purpose

Close the human local/dev UI smoke for completed-view table stimulus rendering in:

```text
M1-C07 - Lectura de tablas y graficos I
M1-C08 - Lectura de tablas y graficos II
```

This phase documents the human smoke result after the completed-view repair.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = bde4c145a3e59af68698462ab558a2e3f9c65b03
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = bde4c145a3e59af68698462ab558a2e3f9c65b03
```

## Prior repair

Source repair:

```text
MVP-UI-PAES-TABLE-STIMULUS-COMPLETED-VIEW-REPAIR-1
PAES_TABLE_STIMULUS_COMPLETED_VIEW_REPAIR_IMPLEMENTED
```

The repair connected completed StudyLoad review to the existing `tableStimulus` rendering path by allowing completed historical reviews to resolve registry content through the stored `mc_submission.contentKey` when exact title lookup is stale.

## Human smoke report

The user reviewed completed C07/C08 capsules after completed-view repair.
Verification points were reported as passed/OK.

Human observations:

```text
- En ST aparece contador de capsulas = 10.
- En capsule/UI no aparece correlativo de capsula.
```

## Table stimulus result

Completed C07/C08 table stimulus smoke passed. The prior completed-view table rendering gap is considered repaired from the human UI smoke perspective.

The approved closeout classification is:

```text
M1_C07_C08_TABLE_STIMULUS_COMPLETED_VIEW_SMOKE_PASSED_WITH_NON_BLOCKING_CORRELATIVE_DISPLAY_DEBT
```

## Non-blocking observations

- ST shows capsule counter = 10.
- Capsule UI does not show visible capsule correlatives.

The missing visible capsule correlative in capsule UI is a known/product debt and should not block table stimulus closeout. It should be handled in a dedicated follow-up phase.

## Scope safety

This phase is documentation/read-only.

Not performed:

- No code changes.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No route-order/continuity changes.
- No study-load-content registry changes.
- No authoredFeedback changes.
- No DB mutation.
- No seed scripts.
- No fixtures.
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No agentic layer opened.
- No secrets printed.

## Result

```text
M1_C07_C08_TABLE_STIMULUS_HUMAN_UI_SMOKE_CLOSEOUT_PASSED_WITH_NON_BLOCKING_CORRELATIVE_DISPLAY_DEBT
```

## Next recommended phase

Recommended next phase:

```text
MVP-UX-CAPSULE-VISIBLE-CORRELATIVE-DISPLAY-PLAN-1
```

Purpose:

```text
Planificar como mostrar correlativo visible de capsula en UI estudiante/admin sin alterar contenido pedagogico, continuity ni route-order.
```
