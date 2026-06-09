# MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-DIRECT-SMOKE-LINK-HANDOFF-1

## Purpose

Provide a safe, minimal handoff so a human can later run a local/dev manual UI smoke for PAES_M1 capsules 3 and 5 using the existing direct StudyLoad viewer route.

This phase does not execute smoke, start the app, log in, press `Comenzar`, submit answers, finalize capsules, mutate data, prepare fixtures, modify code, or change UI/API/schema/DB/continuity/route-order.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 643c3af6bb664ca2f20f07f033be53c2d4c79fa8
```

## Preflight result

Preflight passed:

```text
git status --short: clean
git log --oneline --decorate --graph -8: 643c3af aligned with HEAD, origin/main and origin/HEAD
git rev-parse HEAD: 643c3af6bb664ca2f20f07f033be53c2d4c79fa8
git rev-parse origin/main: 643c3af6bb664ca2f20f07f033be53c2d4c79fa8
git rev-parse origin/HEAD: 643c3af6bb664ca2f20f07f033be53c2d4c79fa8
```

## Prior direct access plan

Prior plan result:

```text
DIRECT_SMOKE_ACCESS_PLAN_READY_EXISTING_PATH_FOUND
```

Carried-forward facts:

- Local/dev visible ST M1 active cycle contains 5 StudyLoads.
- The current visible next capsule remains `PAES M1 - Problemas con ecuaciones lineales`, pending.
- Capsule 3 and capsule 5 concrete StudyLoads exist in the same visible cycle.
- The current student ST M1 UI does not list future pending capsules directly.
- Existing route `/now/study-loads/[id]` can open a concrete StudyLoad owned by the authenticated student.
- Word-problems must not be completed merely as navigation toward capsules 3/5.

## Direct access method

Direct access method:

```text
Use existing local/dev student viewer route:
/now/study-loads/[id]
```

Read-only route inspection from the prior plan confirmed:

- route loads `StudyLoad` by `params.id`;
- route checks authenticated student ownership and active enrollment;
- route redirects away if the StudyLoad does not belong to that student;
- route resolves static content through `getStudyLoadContent(studyLoad.title)`;
- route renders the existing answer form and start flow;
- no UI/API/schema/DB/continuity/route-order change is required.

Read-only local/dev link check in this phase:

```text
LOCAL_DEV_ENV_CONFIRMED_WITHOUT_SECRET_PRINT
visibleAlignedCycleMatches=1
wordProblemsStillPending=true
NO_DATA_MUTATED
NO_SECRET_VALUES_PRINTED
```

Direct local/dev paths for this handoff:

```text
Capsule 3 direct path:
/now/study-loads/cmq751tzm00017s4s6r7mj280

Capsule 5 direct path:
/now/study-loads/cmq751u3b00037s4s8ebv1xzt
```

These are local/dev operational references. Do not paste them into public contexts if the team treats local StudyLoad IDs as sensitive.

## Capsule 3 direct smoke handoff

Target:

```text
contentKey: paes_m1_numbers_percentage_proportionality_entry
title: PAES M1 - Porcentaje y proporcionalidad en contexto
program: PAES_M1
keys: B/B/A/C
direct path: /now/study-loads/cmq751tzm00017s4s6r7mj280
```

Human direct-open steps for a later smoke phase:

1. Open the local/dev app using the normal project procedure.
2. Keep the approved local/dev student session active.
3. Open `/now/study-loads/cmq751tzm00017s4s6r7mj280`.
4. Confirm the title is `PAES M1 - Porcentaje y proporcionalidad en contexto`.
5. Confirm the capsule corresponds to `paes_m1_numbers_percentage_proportionality_entry` through visible title/topic/content cues.
6. Do not press `Comenzar` until the actual manual smoke phase is authorized.
7. If the route opens a different capsule, stop and report.

Suggested later smoke answers:

```text
q1: B
q2: B
q3: A
q4: C
```

## Capsule 5 direct smoke handoff

Target:

```text
contentKey: paes_m1_geometry_area_measure_entry
title: PAES M1 - Area, perimetro y medida en figuras simples
program: PAES_M1
keys: B/B/B/A
direct path: /now/study-loads/cmq751u3b00037s4s8ebv1xzt
```

Human direct-open steps for a later smoke phase:

1. Open the local/dev app using the normal project procedure.
2. Keep the approved local/dev student session active.
3. Open `/now/study-loads/cmq751u3b00037s4s8ebv1xzt`.
4. Confirm the title is `PAES M1 - Area, perimetro y medida en figuras simples`.
5. Confirm the capsule corresponds to `paes_m1_geometry_area_measure_entry` through visible title/topic/content cues.
6. Do not press `Comenzar` until the actual manual smoke phase is authorized.
7. If the route opens a different capsule, stop and report.

Suggested later smoke answers:

```text
q1: B
q2: B
q3: B
q4: A
```

## Human smoke checklist

Use this checklist only in the next explicit manual smoke phase. Do not execute it in this handoff phase.

For each capsule:

1. Confirm local/dev app is open.
2. Confirm approved local/dev student session is active without sharing credentials.
3. Open the direct path listed above.
4. Confirm expected title/content target.
5. Press `Comenzar` only when the smoke phase authorizes starting.
6. Answer q1-q4 using the suggested keys for that capsule.
7. Submit responses through the UI.
8. Verify q1-q4 brief feedback appears after submission.
9. Open q1-q4 complete/paso-a-paso feedback.
10. Verify no internal notes, key-validation/source-finalization notes, diagnosis/mastery/readiness/score/theta, Sales-Ready claim, or adaptive AI claim appears.
11. Confirm self-report remains separate from submission.
12. Select one self-report option only when authorized by the smoke phase.
13. Press `Finalizar capsula`.
14. Confirm completed/terminal state.
15. Confirm no unexpected continuity or route-order behavior.
16. Record non-secret evidence.

Suggested evidence fields for the later smoke:

```text
CAPSULE_3:
A) DIRECT_PATH_OPENED: YES / NO
B) TITLE_OR_CONTENTKEY_MATCH: YES / NO
C) STARTED_BY_HUMAN: YES / NO
D) Q1_Q4_VISIBLE_IN_ORDER: YES / NO
E) ANSWERS_SUBMITTED: YES / NO
F) BRIEF_FEEDBACK_VISIBLE_Q1_Q4: YES / NO
G) COMPLETE_FEEDBACK_OPENABLE_Q1_Q4: YES / NO
H) SELF_REPORT_VISIBLE_AND_SEPARATE: YES / NO
I) FINALIZAR_ACCEPTED: YES / NO
J) COMPLETED_OR_TERMINAL_STATE_VISIBLE: YES / NO / UNKNOWN
K) UNEXPECTED_CONTINUITY_OR_ROUTE_ORDER_CHANGE: YES / NO
L) INTERNAL_LEAKAGE_OR_PROHIBITED_CLAIMS: YES / NO
M) NON_SECRET_ERROR_TEXT: NONE / <brief non-secret text>

CAPSULE_5:
A) DIRECT_PATH_OPENED: YES / NO
B) TITLE_OR_CONTENTKEY_MATCH: YES / NO
C) STARTED_BY_HUMAN: YES / NO
D) Q1_Q4_VISIBLE_IN_ORDER: YES / NO
E) ANSWERS_SUBMITTED: YES / NO
F) BRIEF_FEEDBACK_VISIBLE_Q1_Q4: YES / NO
G) COMPLETE_FEEDBACK_OPENABLE_Q1_Q4: YES / NO
H) SELF_REPORT_VISIBLE_AND_SEPARATE: YES / NO
I) FINALIZAR_ACCEPTED: YES / NO
J) COMPLETED_OR_TERMINAL_STATE_VISIBLE: YES / NO / UNKNOWN
K) UNEXPECTED_CONTINUITY_OR_ROUTE_ORDER_CHANGE: YES / NO
L) INTERNAL_LEAKAGE_OR_PROHIBITED_CLAIMS: YES / NO
M) NON_SECRET_ERROR_TEXT: NONE / <brief non-secret text>
```

## Stop conditions for human smoke

Stop immediately if:

- the local/dev app is not available;
- the student session is lost and recovering it would require sharing credentials;
- the direct path opens a different capsule;
- the page redirects to `/now`, `/login`, or an unexpected route;
- the route requires production or staging;
- the route requires API-only testing;
- the route requires browser automation;
- the route requires DB reset, seed script, fixture mutation, or code changes;
- any error output risks exposing secrets or sensitive values;
- word-problems would need to be completed merely to access capsules 3/5;
- the flow touches capsules 4/6 or another program.

## Safety notes

- Do not share passwords, tokens, cookies, DB URLs, `.env` values, provider secrets, session values, screenshots with credentials, or terminal output with secrets.
- Do not complete `PAES M1 - Problemas con ecuaciones lineales` just to reach capsules 3/5.
- Do not use production or staging.
- Do not use browser automation.
- Do not use API-only tests.
- Treat the direct paths as local/dev operational references.
- If a direct path opens the wrong capsule, stop and report the mismatch.

## What was not changed

- No code changed.
- No UI/API changed.
- No schema/DB schema/Prisma schema changed.
- No continuity or route-order changed.
- No data was mutated.
- No fixture was prepared.
- No smoke was executed.
- No app was started by Codex.
- No login was performed by Codex.
- No browser automation was executed.
- No API-only test was executed.
- No DB reset or seed script was run.
- No production or staging was used.
- No secrets were printed.
- No capsules 4/6 were touched.

## Result

```text
DIRECT_SMOKE_LINK_HANDOFF_READY
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-MANUAL-UI-SMOKE-1
```

Purpose:

```text
Execute a controlled human manual local/dev UI smoke for PAES_M1 capsules 3 and 5 using the direct paths in this handoff, verifying q1-q4 submission, authoredFeedback brief/complete, self-report, Finalizar capsula, completion, and scope safety without code/API/schema/DB/continuity/route-order changes.
```
