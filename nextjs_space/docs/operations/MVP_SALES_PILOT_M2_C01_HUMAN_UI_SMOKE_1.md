# MVP-SALES-PILOT-M2-C01-HUMAN-UI-SMOKE-1

## Phase

```text
MVP-SALES-PILOT-M2-C01-HUMAN-UI-SMOKE-1
```

## Baseline before

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 7bac06442eec9d53e476a1cfc702eb82150f9850
working tree clean
```

Preflight result:

```text
working tree: clean
HEAD: 7bac06442eec9d53e476a1cfc702eb82150f9850
origin/main: 7bac06442eec9d53e476a1cfc702eb82150f9850
origin/HEAD: 7bac06442eec9d53e476a1cfc702eb82150f9850
```

## Context Gate

Read before action:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_ENROLLMENT_ACCESS_HUMAN_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_HUMAN_UI_SMOKE_ACCESS_DIAGNOSIS_1.md`

Relevant prior state:

```text
PAES_M2 StudentProgramInstance: present, active
M2 LearningCycle: present, open, cycleNumber 1
M2-C01 StudyLoad: present, pending, practice, titleClass M2_C01
M2-C01 reachable candidate: present
StudentAccess: present, statusClass no_access
StudentAccess mutation: false
payment/subscription mutation: false
prod/staging touched: false
```

## Human UI target

```text
mv.estudiante@bexauri.dev
```

The target was provided by the human for this LOCAL_DEV smoke. No password, token, cookie, credential or secret was requested or recorded.

## Human UI environment

The smoke was executed by the human in LOCAL_DEV UI. Codex did not run browser automation, DB commands, API-only tests or app commands.

## Smoke checklist

Checklist issued:

- Confirm LOCAL_DEV app is running.
- Log in with the target student.
- Do not paste password or credentials.
- Reach student dashboard/homepage.
- Verify visible PAES_M2 state.
- Confirm whether PAES_M2 is available or still `NO DISPONIBLE`.
- Try to open or continue PAES_M2 if appropriate.
- Confirm whether M2-C01 appears as pending/current load.
- Start M2-C01 if UI allows.
- Record visible load title and exercise count if shown.
- Attempt first interaction only if appropriate.
- Record feedback/progress/blocked state.
- Do not execute DB, admin changes or manual data edits.

## Sanitized evidence

Human-provided evidence:

```text
Login: PASS
Dashboard reachable: PASS
PAES_M2 visible state: INCONSISTENT
PAES_M2 open/continue: NOT_ATTEMPTED
M2-C01 reachable: PARTIALLY_VISIBLE_NOT_OPENED
M2-C01 status visible: pending
Exercise count observed: unknown
First interaction: NOT_ATTEMPTED
Feedback observed: NOT_ATTEMPTED
Blocking message, if any: No blocking error message. Functional UI inconsistency observed.
```

Human observation summary:

- In `Tutorias disponibles`, M1 appears active and M2 appears not available.
- Product expectation is that M2 should not remain shown as unavailable if it is available/enrolled for the student.
- In `Ruta Activa`, PAES_M2 appears.
- This is inconsistent with the previous M1-active circuit and with the need to represent multiple active tutoring programs coherently.
- A pending PAES_M2 capsule appears at the end, confirming the local M2-C01 access alignment surfaced a pending load in the UI.

## Observed result

The smoke should not be closed as passed.

The access data is no longer absent, but the dashboard does not yet have a stable UI contract for a multi-tutoring state.

## PAES_M2 availability result

```text
PAES_M2 visible state: INCONSISTENT
```

Details:

```text
Tutorias disponibles: M2 shown as no disponible
Ruta Activa: PAES_M2 shown
M2-C01 pending capsule: visible
```

## M2-C01 reachability result

```text
M2-C01 reachable: PARTIALLY_VISIBLE_NOT_OPENED
M2-C01 status visible: pending
```

The pending M2-C01 load is visible, but the smoke did not open the load or start exercises because the dashboard state contract is inconsistent.

## Exercise and feedback observations

```text
Exercise count observed: unknown
First interaction: NOT_ATTEMPTED
Feedback observed: NOT_ATTEMPTED
```

No exercise-level or feedback-level smoke conclusion can be made in this phase.

## Blocking issues

Primary blocker:

```text
Dashboard tutoring state contract is inconsistent for a multi-tutoring account.
```

Product/technical implications:

- `Tutorias disponibles` should represent tutoring options the student can start or enroll in, without confusing them with already active tutoring paths.
- `Ruta Activa` should not be accidentally overwritten by the most recently created tutoring path without a clear multi-tutoring model.
- If the student has more than one active tutoring path, the dashboard should represent all active tutoring paths through a stable UI structure.
- Adding a later tutoring program must not contaminate the base dashboard outside explicitly designed multi-tutoring zones.

## Security notes

- No `.env` was printed.
- No `DATABASE_URL` was printed.
- No DB URL, DB host or connection string was printed.
- No password, token, cookie, credential, private key or secret was recorded.
- Evidence was sanitized.

## DB execution by Codex

```text
NOT_EXECUTED_BY_CODEX
```

## DB mutation by Codex

```text
NOT_EXECUTED_BY_CODEX
```

## Code/content/schema changes

```text
NOT_PERFORMED
```

## Explicit non-actions

- No Codex DB execution.
- No Codex DB mutation.
- No StudentAccess mutation.
- No payment/subscription mutation.
- No production/staging action.
- No schema/Prisma changes.
- No content changes.
- No UI/API functional changes.
- No code changes.
- No browser automation by Codex.
- No build.
- No API-only tests.
- No reset, seed reset, migration, db push or direct SQL.
- No secrets printed.
- No rollback executed.

## Rollback note

The human recommended documenting that LOCAL_DEV may need a later controlled rollback to the prior student state.

No rollback is authorized or executed in this phase. Any rollback must be handled by a separate LOCAL_DEV-only phase, using safe tooling or a documented safe protocol, without production/staging, secrets, reset, direct SQL, StudentAccess mutation or payment/subscription mutation unless explicitly authorized.

## Result

```text
M2_C01_HUMAN_UI_SMOKE_BLOCKED_DASHBOARD_TUTORING_STATE_CONTRACT
```

## Follow-up/blocker

Recommended follow-up:

```text
MVP-STUDENT-DASHBOARD-MULTI-TUTORING-UI-CONTRACT-1
```

Alternative if product decides to restore the local student state first:

```text
MVP-SALES-PILOT-M2-C01-LOCAL-DEV-ACCESS-ROLLBACK-PROTOCOL-1
```
