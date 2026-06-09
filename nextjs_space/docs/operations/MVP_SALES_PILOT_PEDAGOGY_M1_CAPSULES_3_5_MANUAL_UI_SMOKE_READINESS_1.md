# MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-MANUAL-UI-SMOKE-READINESS-1

## Purpose

Prepare readiness for a future human manual local/dev UI smoke of PAES_M1 capsules 3 and 5 after their narrow static registry insertion.

This phase does not execute the smoke, does not start the app, does not log in, does not mutate local/dev data, does not prepare fixtures, does not use browser automation, and does not modify code.

The readiness question:

```text
Can a future human manual local/dev smoke safely verify capsules 3 and 5 through the existing student UI, including q1-q4 submission, authoredFeedback brief/complete display, self-report, Finalizar capsula, completion, and expected continuity boundaries?
```

Answer:

```text
YES_WITH_PRECONDITIONS
```

The registry content is statically ready for manual UI smoke, but the future smoke requires either existing local/dev StudyLoads for capsule 3 and capsule 5 or a separately authorized narrow local/dev fixture/data preparation phase. The current continuity map does not automatically route to these capsules.

## Baseline

Expected baseline:

```text
HEAD = origin/main = origin/HEAD = 2af8f46669d0204803cd7c9342b1822b2f4cf08b
```

Accepted previous phase:

```text
2af8f46 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-CODE-1: add capsules 3 and 5 registry entries
```

## Preflight result

Preflight was executed before edits:

```text
git status --short
<clean>

git log --oneline --decorate --graph -8
* 2af8f46 (HEAD -> main, origin/main, origin/HEAD) MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-CODE-1: add capsules 3 and 5 registry entries
* 8d1dcc6 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5: prepare registry code phase
* 4ceea35 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-COMPLETION-FLOW-CLOSEOUT-1: close completion flow verification
* ba94023 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-COMPLETION-FLOW-MANUAL-LOCAL-SMOKE-1: record completion flow smoke
* 1e7668f MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-COMPLETION-FLOW-SMOKE-READINESS-1: define completion flow smoke readiness
* 77cd012 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-AUTHORIZATION-REVIEW-1: review registry authorization
* 58fd198 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-VERIFIED-MILESTONE-HANDOFF-1: create verified milestone handoff
* 97c766a MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-LOCAL-VERIFICATION-CLOSEOUT-1: close local verification

git rev-parse HEAD
2af8f46669d0204803cd7c9342b1822b2f4cf08b

git rev-parse origin/main
2af8f46669d0204803cd7c9342b1822b2f4cf08b

git rev-parse origin/HEAD
2af8f46669d0204803cd7c9342b1822b2f4cf08b
```

Preflight verdict:

```text
PASSED
```

## Registry static confirmation

Static registry file inspected read-only before this documentation phase:

```text
nextjs_space/lib/study-load-content.ts
```

Capsule 3 registry check:

```text
contentKey: paes_m1_numbers_percentage_proportionality_entry
found: YES
item count: 4
item order: q1, q2, q3, q4
keys: B/B/A/C
authoredFeedback blocks: 4
authoredFeedback shape: briefId, completeId, version, brief, complete
```

Capsule 5 registry check:

```text
contentKey: paes_m1_geometry_area_measure_entry
found: YES
item count: 4
item order: q1, q2, q3, q4
keys: B/B/B/A
authoredFeedback blocks: 4
authoredFeedback shape: briefId, completeId, version, brief, complete
```

No code change was made in this readiness phase.

## Capsule 3 smoke target

Target content:

```text
Title:
PAES M1 - Porcentaje y proporcionalidad en contexto

contentKey:
paes_m1_numbers_percentage_proportionality_entry

Program:
PAES_M1

Items:
q1, q2, q3, q4

Expected keys:
B/B/A/C
```

Future smoke must verify through the existing student UI:

- the StudyLoad opens by title/contentKey match;
- q1-q4 are visible in order;
- q1-q4 accept a selected option and submission;
- brief feedback appears after submission;
- complete/paso-a-paso feedback can be opened;
- self-report remains separate from response submission;
- Finalizar capsula remains separate from feedback display;
- completion/terminal state is visible after finalization;
- no unexpected continuity or route-order behavior appears;
- no internal leakage or prohibited claims appear.

Suggested future smoke answers:

```text
q1: B
q2: B
q3: A
q4: C
```

## Capsule 5 smoke target

Target content:

```text
Title:
PAES M1 - Area, perimetro y medida en figuras simples

contentKey:
paes_m1_geometry_area_measure_entry

Program:
PAES_M1

Items:
q1, q2, q3, q4

Expected keys:
B/B/B/A
```

Future smoke must verify through the existing student UI:

- the StudyLoad opens by title/contentKey match;
- q1-q4 are visible in order;
- q1-q4 accept a selected option and submission;
- brief feedback appears after submission;
- complete/paso-a-paso feedback can be opened;
- self-report remains separate from response submission;
- Finalizar capsula remains separate from feedback display;
- completion/terminal state is visible after finalization;
- no unexpected continuity or route-order behavior appears;
- no internal leakage or prohibited claims appear.

Suggested future smoke answers:

```text
q1: B
q2: B
q3: B
q4: A
```

## Reachability / continuity status

Current continuity map inspected read-only:

```text
PAES_M1:
paes_m1_balanced_entry_initial -> paes_m1_linear_equations_basic
paes_m1_linear_equations_basic -> paes_m1_linear_equations_word_problems
paes_m1_linear_equations_word_problems -> paes_m1_linear_equations_reinforcement
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
paes_m1_linear_functions_basic -> paes_m1_data_representation_entry
```

Reachability answer:

```text
Capsules 3/5 are not automatically reachable through current continuity.
```

The static registry now knows both contentKeys, but current continuity does not create or offer these capsules automatically after the verified capsule 2 flow. This readiness phase does not authorize continuity or route-order changes.

Safe future smoke route:

```text
Use a local/dev student session where each target capsule already exists as a StudyLoad with a registry-matched title, or obtain a separate explicit narrow fixture/data preparation authorization before the smoke.
```

## Required local/dev conditions

Before a future manual UI smoke, the human must confirm non-secret status:

```text
APP_LOCAL_DEV_OPEN: YES
LOGIN_LOCAL_DEV_STUDENT: YES
NOW_OPENS_OR_STUDENT_SURFACE_OPENS: YES
CAPSULE_3_STUDYLOAD_VISIBLE_OR_OPENABLE: YES / NO
CAPSULE_5_STUDYLOAD_VISIBLE_OR_OPENABLE: YES / NO
NO_SECRETS_SHARED: YES
NO_DB_RESET_USED: YES
NO_FIXTURE_MUTATION_WITHOUT_AUTHORIZATION: YES
```

If both capsule StudyLoads already exist and are reachable by UI-only local/dev navigation, the future smoke may proceed under a separate manual-smoke phase.

If either StudyLoad is missing, the next action is not smoke. The next action is a separate narrow fixture/data preparation authorization phase that may define how to select or prepare minimal local/dev StudyLoads without DB reset, broad fixture mutation, production/staging, browser automation, or secrets.

Known operational reference:

- `BETA_LOCAL_OPS_1_LOCAL_STUDENT_FIXTURE_RECIPE.md` documents a controlled local fixture workflow using real local app UI/API flow and warns against production, schema commands, direct SQL, secrets, broad scripts, or unauthorized continuity.
- Prior capsule 2 auth/access and smoke documents show that human non-secret status is required before manual UI smoke.

## Manual UI smoke checklist

Use this checklist in a future explicit manual-smoke phase. Do not execute it in this readiness phase.

### Shared setup

1. Confirm clean Git and approved local/dev-only scope.
2. Confirm no secrets are shared in chat or documents.
3. Confirm the human opens the local/dev app manually.
4. Confirm the human logs in locally with an approved student account without sharing credentials.
5. Confirm `/now` or the relevant student surface opens.
6. Confirm no DB reset, seed script, direct DB edit, broad fixture mutation, browser automation, API-only test, production, or staging is used.

### Capsule 3

1. Open `PAES M1 - Porcentaje y proporcionalidad en contexto` by UI.
2. Confirm title or contentKey `paes_m1_numbers_percentage_proportionality_entry`.
3. Confirm q1-q4 are visible and in order.
4. Answer q1 B, q2 B, q3 A, q4 C unless the future phase explicitly chooses another evidence pattern.
5. Submit responses through UI.
6. Verify q1-q4 brief feedback is visible after submission.
7. Open q1-q4 complete/paso-a-paso feedback.
8. Confirm no internal notes, no key-validation/source-finalization text, no diagnosis/mastery/readiness/score/theta, no Sales-Ready claim, and no adaptive AI claim appear.
9. Confirm self-report options remain separate from submission.
10. Select one self-report option.
11. Press Finalizar capsula.
12. Confirm completed/terminal state or expected post-completion UI.
13. Confirm no unexpected continuity or route-order behavior.
14. Record any visual/navigational anomaly, especially long-screen/mobile friction and the known non-blocking need for a future `Cerrar paso a paso` affordance.

### Capsule 5

1. Open `PAES M1 - Area, perimetro y medida en figuras simples` by UI.
2. Confirm title or contentKey `paes_m1_geometry_area_measure_entry`.
3. Confirm q1-q4 are visible and in order.
4. Answer q1 B, q2 B, q3 B, q4 A unless the future phase explicitly chooses another evidence pattern.
5. Submit responses through UI.
6. Verify q1-q4 brief feedback is visible after submission.
7. Open q1-q4 complete/paso-a-paso feedback.
8. Confirm no internal notes, no key-validation/source-finalization text, no diagnosis/mastery/readiness/score/theta, no Sales-Ready claim, and no adaptive AI claim appear.
9. Confirm self-report options remain separate from submission.
10. Select one self-report option.
11. Press Finalizar capsula.
12. Confirm completed/terminal state or expected post-completion UI.
13. Confirm no unexpected continuity or route-order behavior.
14. Record any visual/navigational anomaly, especially long-screen/mobile friction and the known non-blocking need for a future `Cerrar paso a paso` affordance.

### Evidence template for future smoke

```text
M1_CAPSULES_3_5_MANUAL_UI_SMOKE_OBSERVATION

CAPSULE_3:
A) STUDYLOAD_VISIBLE_OR_OPENED: YES / NO
B) TITLE_OR_CONTENTKEY_MATCH: YES / NO
C) Q1_Q4_VISIBLE_IN_ORDER: YES / NO
D) ANSWERS_SUBMITTED: YES / NO
E) BRIEF_FEEDBACK_VISIBLE_Q1_Q4: YES / NO
F) COMPLETE_FEEDBACK_OPENABLE_Q1_Q4: YES / NO
G) SELF_REPORT_VISIBLE_AND_SEPARATE: YES / NO
H) FINALIZAR_ACCEPTED: YES / NO
I) COMPLETED_OR_TERMINAL_STATE_VISIBLE: YES / NO / UNKNOWN
J) UNEXPECTED_CONTINUITY_OR_ROUTE_ORDER_CHANGE: YES / NO
K) INTERNAL_LEAKAGE_OR_PROHIBITED_CLAIMS: YES / NO
L) NON_SECRET_ERROR_TEXT: NONE / <brief non-secret text>

CAPSULE_5:
A) STUDYLOAD_VISIBLE_OR_OPENED: YES / NO
B) TITLE_OR_CONTENTKEY_MATCH: YES / NO
C) Q1_Q4_VISIBLE_IN_ORDER: YES / NO
D) ANSWERS_SUBMITTED: YES / NO
E) BRIEF_FEEDBACK_VISIBLE_Q1_Q4: YES / NO
F) COMPLETE_FEEDBACK_OPENABLE_Q1_Q4: YES / NO
G) SELF_REPORT_VISIBLE_AND_SEPARATE: YES / NO
H) FINALIZAR_ACCEPTED: YES / NO
I) COMPLETED_OR_TERMINAL_STATE_VISIBLE: YES / NO / UNKNOWN
J) UNEXPECTED_CONTINUITY_OR_ROUTE_ORDER_CHANGE: YES / NO
K) INTERNAL_LEAKAGE_OR_PROHIBITED_CLAIMS: YES / NO
L) NON_SECRET_ERROR_TEXT: NONE / <brief non-secret text>
```

## Stop conditions for future smoke

Stop the future smoke if:

- local/dev app cannot be opened safely;
- login requires sharing credentials, tokens, cookies, DB URLs, provider secrets, or `.env` values;
- target StudyLoad is not capsule 3 or capsule 5;
- target StudyLoad is missing and making it available requires fixture/data preparation not separately authorized;
- the path requires DB reset, seed scripts, direct DB edits, broad fixture mutation, browser automation, API-only tests, production, or staging;
- continuation would modify code, UI, API, schema/DB, continuity, route-order, auth/access files, fixtures, or registry content;
- capsule 2 behavior, capsule 3 content, capsule 5 content, authoredFeedback text, or keys would need to change;
- any sensitive error output appears;
- internal rationale, key-validation/source-finalization notes, implementation-readiness notes, inference-limit notes, diagnosis, score, theta, mastery, readiness, Sales-Ready, or adaptive AI claims appear in student-facing UI.

## Out of scope

- Executing the smoke.
- Starting the app.
- Logging in.
- Creating or mutating local/dev data.
- Preparing fixtures.
- DB reset.
- Seed scripts.
- Direct DB edits.
- API-only tests.
- Browser automation.
- Production/staging.
- Code edits.
- Editing `nextjs_space/lib/study-load-content.ts`.
- UI/API/schema/DB/Prisma changes.
- Continuity/route-order changes.
- Auth/access changes.
- Capsule 2 behavior changes.
- Capsule 3/5 source, key, item, or authoredFeedback changes.
- Capsules 4/6.
- Sales-Ready/public commercial claims.
- Adaptive AI claims.

## Result

Result:

```text
M1_CAPSULES_3_5_MANUAL_UI_SMOKE_READINESS_DEFINED
```

Readiness verdict:

```text
MANUAL_UI_SMOKE_READINESS_READY_WITH_FIXTURE_PRECONDITIONS
```

Summary:

- Static registry checks passed for capsule 3 and capsule 5.
- Capsule 3 and capsule 5 are not automatically reached by current continuity.
- A future smoke is safe only if a local/dev student session can open existing StudyLoads for both target titles, or if a separate narrow fixture/data preparation authorization creates/selects those StudyLoads first.
- This phase did not execute smoke, mutate data, start the app, log in, use browser automation, call APIs, or modify code.

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-LOCAL-FIXTURE-ACCESS-CHECK-1
```

Purpose:

```text
Collect non-secret human status for local/dev access to capsule 3 and capsule 5 StudyLoads, and decide whether manual UI smoke can proceed immediately or whether narrow fixture/data preparation authorization is required.
```

Alternative next phase if the team already knows StudyLoads are missing:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-NARROW-FIXTURE-PREP-AUTHORIZATION-1
```
