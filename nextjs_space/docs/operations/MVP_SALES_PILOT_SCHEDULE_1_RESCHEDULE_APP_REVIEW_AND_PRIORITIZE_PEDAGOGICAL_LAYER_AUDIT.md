# MVP-SALES-PILOT-SCHEDULE-1 - Reschedule app review and prioritize pedagogical layer audit

## Phase

MVP-SALES-PILOT-SCHEDULE-1 - Reschedule app review and prioritize pedagogical layer audit.

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Observed baseline before implementation:

```text
HEAD = origin/main = origin/HEAD = 3cf3318
```

Last accepted commit:

```text
3cf3318 - MVP-SALES-PILOT-PRO-AUDIT-1: document top-down UI circuit audit
```

Working tree was clean at preflight.

## Schedule Decision

The app review/test that was planned for Friday, June 5, 2026 is postponed.

New target date:

```text
Tuesday, June 9, 2026
```

Decision:

```text
APP_REVIEW_RESCHEDULED_AND_PEDAGOGICAL_LAYER_AUDIT_PRIORITIZED
```

## Reason

Mauricio decided to gain more time before the review in order to audit, redesign, and improve the pedagogical layer.

The direction decision is explicit: the app should not be tested only because the UI circuit already exists. The first M1-first UI circuit exists and was audited in PRO-AUDIT-1 with verdict:

```text
APROBADO CON RESERVAS
```

The central reading from PRO-AUDIT-1 remains active:

```text
El circuito ya existe; ahora hay que probar que aprende, progresa y no solo navega.
```

## Relation To PRO-AUDIT-1

PRO-AUDIT-1 closed the first top-down UI circuit as a real operative base, but with important reservations around:

* multi-capsule continuity;
* real progress and achievement evidence;
* pedagogical quality of the first M1 capsule;
* consistency between visible student experience and backend behavior;
* readiness for a longer path toward Capsule 10.

SCHEDULE-1 does not reopen UI polish. It records that the calendar changed because the next useful work is pedagogical and continuity audit work, not more UI refinement by intuition.

## New Focus Before Tuesday

Before the Tuesday review, the focus should be:

1. continuity multi-capsule;
2. pedagogical audit;
3. redesign/improvement of the pedagogical layer;
4. quality of Capsule 1;
5. preparation of a controlled test path toward Capsule 10;
6. consistency between visible experience and backend behavior.

The focus should not be more LP/DB/ST/Capsule polish by intuition.

## Mandatory Records

This phase records explicitly:

1. The app review/test planned for Friday, June 5, 2026 is postponed.
2. New target date: Tuesday, June 9, 2026.
3. The reason is to give more time to audit, redesign, and improve the pedagogical layer.
4. The M1-first UI circuit already exists and was approved with reservations.
5. Before the Tuesday review, the focus should not be more UI polish by intuition.
6. The focus must be continuity multi-capsule, pedagogical audit, Capsule 1 quality, preparation toward Capsule 10, and consistency between visible experience and backend.
7. No real students yet.
8. No Sales-Ready.
9. No complete closed MVP-Beta.
10. No L1/M2 readiness.

## Priority Debts Before Tuesday

Priority debts:

* understand and document existing next-capsule continuity;
* verify that continuity does not merely create a next screen, but supports a coherent learning sequence;
* audit pedagogical quality of Capsule 1 content, difficulty, feedback, and step-by-step support;
* define what must be true before a multi-capsule test toward Capsule 10;
* identify where progress/logro indicators are real, provisional, or potentially misleading;
* confirm consistency between UI promises and backend-supported learning evidence;
* keep M2/L1 outside readiness claims.

## Explicit Non-Readiness

This schedule change does not declare:

* real students ready;
* Sales-Ready;
* complete closed MVP-Beta;
* L1 readiness;
* M2 readiness;
* payment readiness;
* trial readiness;
* complete functional subscription readiness;
* public pilot readiness.

No real students should be invited yet.

## Recommended Next Phases

Recommended next phases:

1. `MVP-SALES-PILOT-M1-CONTINUITY-1 - Audit existing next-capsule continuity`.
2. `MVP-SALES-PILOT-PEDAGOGY-1 - Audit first M1 capsula pedagogical quality`.
3. `MVP-SALES-PILOT-M1-CIRCUIT-2 - Prepare manual M1 multi-capsula test to Capsula 10`.
4. `MVP-SALES-PILOT-M1-CIRCUIT-3 - Execute controlled multi-capsula rehearsal`.

Primary next recommendation:

```text
MVP-SALES-PILOT-M1-CONTINUITY-1 - Audit existing next-capsule continuity
```

## Limits Respected

This phase is documentation-only.

No app code, DB/base de datos, schema, migrations, auth, credentials, login, `/now`, Study Page implementation, Capsule execution, responses, submit, self-report, completion, StudentAccess, checkout, real payment, real trial, complete functional subscription, staging, production, secrets, or new functionality were touched.
