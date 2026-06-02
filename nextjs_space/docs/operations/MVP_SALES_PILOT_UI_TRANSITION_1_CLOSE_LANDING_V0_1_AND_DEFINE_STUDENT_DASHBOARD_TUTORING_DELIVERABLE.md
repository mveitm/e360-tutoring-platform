# MVP-SALES-PILOT-UI-TRANSITION-1 - Close Landing v0.1 and define student dashboard tutoring deliverable

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Phase

```text
MVP-SALES-PILOT-UI-TRANSITION-1 - Close Landing v0.1 and define student dashboard tutoring deliverable
```

## Level

```text
Level A - Governance / deliverable closeout / next deliverable definition
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 99d78b4
Latest accepted commit = 99d78b4 - MVP-SALES-PILOT-UI-LANDING-1G: refine approved mobile landing draft
Working tree clean before edits.
```

## Landing v0.1 closeout

Mauricio accepted LANDING-1G as the operative student landing page v0.1.

Closed deliverable:

```text
Landing Page estudiante - Bexauri MVP
```

Accepted state:

```text
LP v0.1 operativa aceptada
```

Current landing result:

```text
LANDING_PAGE_STUDENT_MVP_APPROVED_DRAFT_REFINED
```

Visual closeout commit:

```text
99d78b4 - MVP-SALES-PILOT-UI-LANDING-1G: refine approved mobile landing draft
```

## PRO audit debt

The landing is accepted as operative v0.1, but keeps a non-blocking debt:

```text
Auditoría PRO posterior de landing y estándar visual Bexauri.
```

This debt does not block the next top-down student-experience deliverable.

## Non-claims from landing closeout

Landing v0.1 acceptance does not imply:

* Sales-Ready;
* MVP-Beta cerrado completo;
* real payment;
* real trial;
* complete functional subscription;
* L1 readiness;
* M2 readiness;
* staging or production readiness.

## New active deliverable

Official deliverable name:

```text
STUDENT_DASHBOARD_TUTORING_M1_DELIVERABLE
```

Working title:

```text
Dashboard estudiante - acceso a tutorías y entrada/enrolamiento M1
```

## Observable objective

A student who has already signed in should land in the student dashboard, understand which tutoring lines exist, see PAES Matemáticas M1 as the first active tutoring path, and have a clear action to enter or begin M1.

## Target user

Student coming from the landing, login, or signup, entering their study space for the first time.

## Expected experience

When entering the dashboard, the student should be able to:

1. Recognize that they are inside Bexauri.
2. See the tutoring lines available or visible in the system architecture.
3. Understand that PAES Matemáticas M1 is the first active tutoring line.
4. See PAES Matemáticas M2 and PAES Competencia Lectora as part of the visual tutoring architecture, without functional activation yet.
5. Start or continue M1 with a clear action.
6. Understand the next step.

## Minimum content

The deliverable should include:

* Bexauri / session header.
* Brief welcome.
* `Tus tutorías` block.
* Active `PAES Matemáticas M1` card.
* Visible but non-priority `PAES Matemáticas M2` and `PAES Competencia Lectora` cards.
* Primary action: `Comenzar M1` or `Entrar a Matemáticas M1`.
* `Qué pasará después` block.
* Initial status or progress if it already exists without forcing DB/schema work.
* Visual connection with Bexauri Visual Standard v0.1.

## Acceptance criteria

1. The student understands they are in their study space.
2. PAES Matemáticas M1 appears as the active or main tutoring line.
3. M2 and Competencia Lectora appear as system tutoring lines without promising functional readiness.
4. There is a clear action to begin or enter M1.
5. The screen feels part of the same visual system as the landing.
6. The dashboard does not feel like an administrative panel.
7. The student understands what will happen next.
8. No StudyLoad execution is activated without explicit authorization.
9. No real payment, checkout, real trial, or complete functional subscription is implemented.
10. No Sales-Ready or MVP-Beta cerrado completo declaration is made.

## Out of scope

* No real L1/M2 functionality yet.
* No real payment.
* No checkout.
* No real trial.
* No complete functional subscription.
* No complete StudyLoad execution in this phase.
* No advanced pedagogical feedback yet.
* No auth redesign.
* No DB/schema unless a later phase explicitly justifies it.
* No staging or production.
* No real data.
* No commercial readiness declaration.

## Suggested next phases

1. `MVP-SALES-PILOT-UI-DASHBOARD-1 - Implement student dashboard tutoring access and M1 entry`.
2. `MVP-SALES-PILOT-FRIDAY-TEST-1 - Prepare full M1 student experience runbook to StudyLoad 10`.
3. `MVP-SALES-PILOT-UI-LANDING-PRO-AUDIT-1 - Audit LP v0.1 with PRO, cuando convenga`.

## Safety limits

This transition phase does not:

* touch app code;
* touch DB;
* touch schema;
* run migrations;
* change auth;
* touch credentials;
* touch login;
* touch `/now`;
* touch StudyLoad;
* press or implement `Empezar`;
* submit responses;
* touch StudentAccess;
* implement checkout;
* implement real payment;
* implement real trial;
* implement complete functional subscription;
* touch staging or production;
* inspect or print secrets;
* implement the dashboard.

## Relationship to Student Experience-Led Delivery

This phase closes the first top-down student-experience UI deliverable and defines the next one.

The landing answered the entry question: how a student recognizes Bexauri and reaches the first access path.

The new dashboard deliverable answers the next student-experience question: once inside Bexauri, how does the student understand the tutoring architecture and enter the first active M1 path?

Future microphases should directly support `STUDENT_DASHBOARD_TUTORING_M1_DELIVERABLE` or remove a blocker to that observable student experience.

## Results

```text
LANDING_PAGE_STUDENT_MVP_V0_1_ACCEPTED_WITH_PRO_AUDIT_DEBT
STUDENT_DASHBOARD_TUTORING_M1_DELIVERABLE_DEFINED_AND_ACTIVE
```
