# MVP-CONTENT-PAES-M2-C01-HUMAN-UI-SMOKE-READINESS-1

## Purpose

Prepare documentary readiness for a future human local/dev UI smoke of the first authored PAES_M2 capsule:

```text
M2-C01 - Modelacion con expresiones y funciones
```

This phase defines the smoke scope, access expectations, checklist, stop conditions, and evidence format. It does not execute the smoke, open the app, use browser automation, mutate data, or change code/content.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = b2373d94662a40882cdf7d7e8ee110310dd8185d
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: b2373d94662a40882cdf7d7e8ee110310dd8185d
git rev-parse origin/main: b2373d94662a40882cdf7d7e8ee110310dd8185d
git rev-parse origin/HEAD: b2373d94662a40882cdf7d7e8ee110310dd8185d
```

Current log head reviewed:

```text
b2373d9 MVP-CONTENT-PAES-M2: review C01 authored content
```

## Source implementation and static review

Source implementation:

```text
MVP-CONTENT-PAES-M2-C01-AUTHORED-IMPLEMENT-1
PAES_M2_C01_AUTHORED_IMPLEMENTED
```

Source static review:

```text
MVP-CONTENT-PAES-M2-C01-STATIC-REVIEW-1
PAES_M2_C01_STATIC_REVIEW_PASSED
```

Static content contract for UI smoke:

```text
title: PAES M2 - Modelacion con expresiones y funciones
visible correlative: M2-C01
contentKey: paes_m2_modeling_expressions_functions_entry
contentVersion: v1
contentType: practice
program: PAES_M2
skillFamily: algebra/functions/modelling
item count: 4
correctOptionKey sequence: A/C/B/B
visual/math dependency: NO_VISUAL_BLOCKER
```

The static review classified all four items as `PASS`, confirmed authoredFeedback brief/complete per item, and found no key/content conflict, unsupported visual/math dependency, leakage, M1 modification, DB/schema dependency, route-order/continuity dependency, fixture dependency, or agentic expansion.

## Smoke scope

The future human smoke should verify the rendered student-facing UI behavior for M2-C01, not re-author content.

In scope for the future human smoke:

- M2-C01 appears or can be opened in the available local/dev context;
- visible correlative `M2-C01`;
- correct title;
- maximum 4 exercises;
- readable stems and alternatives;
- no technical IDs or `contentKey` shown as student-facing orientation text;
- no agentic, commercial, Sales-Ready, score, mastery, theta, route-certainty, or M2-readiness claims;
- brief feedback appears after answering/submitting or in completed review when applicable;
- complete / paso-a-paso feedback appears;
- feedback is understandable and not key-check-only;
- navigation, submit, self-report, finalization, and completed review work according to the access mode used.

Out of scope:

- editing registry content;
- editing authoredFeedback;
- editing correctOptionKey/contentKey/item count/stems/options/tableStimulus;
- route-order/continuity repair;
- fixture or DB preparation;
- browser automation by Codex;
- API-only tests;
- build;
- production/staging checks.

## Access mode

Recommended access mode:

```text
A) active/new M2-C01 capsule flow
```

Use this mode if a local/dev StudyLoad for `M2-C01` is already visible or reachable without Codex data mutation.

Accepted fallback:

```text
B) completed-view review
```

Use this mode if an existing completed M2-C01 StudyLoad is available and the objective is to validate completed feedback/review rendering.

Not sufficient as a UI smoke closeout:

```text
C) document review only
```

Document review can support orientation but cannot pass UI smoke by itself because it does not verify rendered UI, navigation, feedback display, or route/session behavior.

Blocked condition:

```text
D) blocked until M2-C01 is reachable in local/dev UI
```

If no active/new or completed M2-C01 UI path is available to the human, the closeout phase should record `BLOCKED` rather than mutate DB or change route-order/continuity inside the smoke.

## Human UI smoke checklist

M2-C01 human UI smoke

Access:
- M2-C01 visible or reachable:
- opens correctly:
- no session/routing error:

UI orientation:
- visible correlative M2-C01:
- title correct:
- no technical IDs/contentKey:

Content:
- max 4 items:
- stems readable:
- options readable:
- no unsupported visual/math dependency:

Feedback:
- brief feedback visible:
- complete / paso a paso visible:
- feedback understandable:
- no key-check-only:
- no internal leakage:
- no contradiction with selected/correct answer:

Flow:
- Comenzar works if active:
- submit works if active:
- self-report visible if active:
- finalizar works if active:
- completed view opens if applicable:

## Stop conditions

Stop and record `BLOCKED` or `UNEXPECTED_STATE` if any of these occur:

- M2-C01 not reachable in UI;
- wrong program/correlative/title;
- technical IDs visible;
- more than 4 items;
- missing authoredFeedback;
- complete feedback absent;
- feedback contradicts answer/key/stem/options;
- key-check-only feedback;
- unsupported visual/math rendering required;
- session/routing error;
- active flow requires unexpected F5 after Comenzar;
- submit/autorreporte/finalizar broken.

Additional stop boundaries:

- do not create, edit, or complete DB records by Codex in this phase;
- do not repair route-order/continuity inside smoke;
- do not edit content to make smoke pass;
- do not run browser automation as substitute for human smoke.

## Expected evidence format

```text
M2-C01 human UI smoke

Access mode:
active capsule / completed view / document review / blocked

Access:
passed / blocked / notes

UI orientation:
passed / blocked / notes

Content:
passed / blocked / notes

Feedback:
passed / blocked / notes

Flow:
passed / blocked / notes

Unexpected behavior:
none / describe

Overall:
PAES_M2_C01_HUMAN_UI_SMOKE_PASSED / BLOCKED / UNEXPECTED_STATE
```

## Scope safety

No code changes.
No content changes.
No registry changes.
No authoredFeedback changes.
No correctOptionKey changes.
No contentKey changes.
No item count changes.
No ordering/stems/options/tableStimulus changes.
No DB mutation.
No schema/DB/Prisma changes.
No route-order/continuity changes.
No UI/API/auth/access/package/migration changes.
No seed/fixture changes.
No human smoke execution.
No browser automation.
No API-only tests.
No build.
No production/staging.
No agentic layer opened.
No secrets printed.

## Result

```text
PAES_M2_C01_HUMAN_UI_SMOKE_READINESS_READY
```

The future smoke is ready to be executed by a human using an active/new M2-C01 UI flow if reachable, completed-view review if an existing completed M2-C01 StudyLoad is available, or blocked closeout if no UI path is available without additional authorized data/continuity work.

## Next recommended phase

```text
MVP-CONTENT-PAES-M2-C01-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Purpose:

```text
Record the human local/dev UI smoke result for M2-C01 using the checklist and evidence template above, without Codex executing browser automation or mutating data.
```
