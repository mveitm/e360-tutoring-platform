# MVP-SALES-PILOT-SCOPE-1 - Lock closed 3-student pilot scope

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-SCOPE-1 - Lock closed 3-student pilot scope and first vertical milestone
```

Type:

```text
Documentation/scope/custody only / no implementation / no runtime / no DB.
```

Mission:

Lock the first closed 3-student pilot milestone after the external audit redirect and decide whether the first milestone attempts the full L1/M1/M2 triad or deliberately narrows the first pilot scope.

## 2. Baseline and Context Gate summary

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = 57167ff
```

Latest accepted commit:

```text
57167ff - MVP-SALES-PILOT-EXTERNAL-AUDIT-1: integrate audit redirect
```

Context Gate summary:

* Active context and roadmap now point to `MVP-SALES-PILOT-SCOPE-1`.
* External audit redirect records `NO_LISTO` for a closed 3-student pilot.
* M1 remains partial but real.
* L1 remains internal-only and not approved for student/product use.
* M2 remains not evidenced as a real route.
* `/now` remains single-active-program oriented by current read-only inspection.
* Access/payment/trial boundaries remain unresolved.
* No newer evidence was found that proves full L1/M1/M2 triad readiness.

Read-only inspection confirmed:

* `/now` resolves the most recent active enrollment and one current cycle, not a full triad dashboard.
* M1 has multiple content-backed StudyLoads in the static registry.
* L1 has one internal pilot candidate with `studentUseApproved: false`, `productUseApproved: false`, and `salesReadyImplication: none`.
* M1 has rule-based continuity; PAES_L1 has explicit no-continuity.
* Response and completion routes can capture MC evidence and self-report for content-backed StudyLoads when the surrounding runtime/data preconditions exist.

## 3. External audit redirect summary

External audit verdict:

```text
NO_LISTO
```

The automatic L1 validation chain is paused as the next default.

The first vertical milestone is now the priority. That milestone must test a real enough student/product/admin circuit before Bexauri spends more phases deepening isolated strands that do not close the commercial-pedagogical loop.

## 4. Pilot scope decision

Decision:

```text
NARROWED_FIRST_VERTICAL_PILOT
```

Reason:

The current evidence does not support `FULL_TRIAD_PILOT_NOW`. L1 is promising but internal-only, M2 is not evidenced, `/now` does not yet provide a full multi-program triad experience, and access/payment/trial boundaries are not closed.

## 5. Scope posture by program

```text
PAES_M1 = PILOT_USABLE_WITH_LIMITS
PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT
PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT
```

No evidence found in this phase changes those statuses.

M1 remains limited: it must not be marketed as full PAES M1 coverage, score prediction, mastery, theta, adaptive AI, or guaranteed improvement.

L1 remains useful for internal validation and future Block 7 work, but not for the first closed student-facing pilot.

M2 remains excluded or waitlisted until a minimum route exists.

## 6. First pilot target

Recommended target:

```text
First closed pilot milestone is M1-first, 3 controlled students, not public Sales-Ready, not full L1/M1/M2 triad.
```

The vertical circuit to test is:

```text
controlled student enters -> access state defined -> sees honest /now pilot state -> completes M1 StudyLoad -> feedback/evidence captured -> admin/tutor reviews -> support/payment/legal boundary explicit -> go/no-go recorded
```

## 7. What this narrowed pilot is NOT

This narrowed pilot is not:

* public Sales-Ready;
* Plan Base/Complete;
* full L1/M1/M2;
* proof of L1 readiness;
* proof of M2 readiness;
* payment/subscription launch;
* adaptive AI;
* PAES score prediction;
* mastery/theta;
* guaranteed improvement.

## 8. Three-student pilot participant model

Participant model:

* 3 controlled students.
* Internal/known/consented participants only.
* No public invitation yet.
* Each student must have a documented access state.
* Payment state must be one of: no payment, trial-only, or manual controlled payment.
* Payment state must be decided before pilot execution.
* Participant creation, activation, enrollment, and evidence handling must happen through approved app/process surfaces for the execution phase.

This phase creates no users, students, access rows, enrollments, cycles, sessions, responses, or StudyLoads.

## 9. Milestone 1 acceptance criteria

Milestone 1 is accepted only when:

* pilot scope is documented and honest;
* 3 controlled accounts can be created or activated through an approved non-technical-normal path;
* access/payment/trial boundary is explicit;
* `/now` is honest for the selected M1-first scope;
* at least one M1 StudyLoad is completed by each controlled student, or a justified smaller dry-run is completed before real students;
* feedback/evidence is captured in app;
* admin/tutor evidence review is possible;
* support/failure path is documented;
* no forbidden claims are made;
* go/no-go record is produced.

## 10. Deferred scope

Deferred from the first pilot milestone:

* L1 student/product use;
* L1 DB-backed fixture execution unless it becomes a direct blocker;
* M2 active tutoring;
* full triad dashboard;
* public offer;
* automated billing/subscription;
* broad tutor lifecycle states if not required for first milestone.

## 11. Risks accepted by narrowing

* First pilot will not validate the full target.
* M1-only/reduced pilot must not be marketed as L1/M1/M2 Sales-Ready.
* Later triad readiness is still required.
* `/now` multi-program remains a roadmap requirement.

## 12. Risks reduced by narrowing

* Avoids an infinite L1 validation chain.
* Avoids fake triad readiness.
* Allows vertical evidence sooner.
* Tests a real student/product/admin circuit with lower scope.

## 13. Updated immediate roadmap after this phase

1. `MVP-SALES-PILOT-SCOPE-1` - this phase.
2. `MVP-SALES-PILOT-ACCESS-1` - define closed-pilot access/payment/trial boundary for 3 controlled students.
3. `MVP-SALES-NOW-PILOT-1A` - audit `/now` for narrowed M1-first pilot experience.
4. `MVP-SALES-PILOT-DRY-RUN-1` - dry-run vertical circuit with controlled accounts.
5. `MVP-SALES-PILOT-GO-1` - go/no-go for starting the closed 3-student pilot.

`MVP-SALES-CONTENT-TRIAD-1` remains required before returning to a full L1/M1/M2 representative pilot.

## 14. Phase gate classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go
Sales-ready relevance: direct/high
Dependency: external audit redirect accepted at 57167ff
What it advances: first vertical milestone scope and narrowing decision
What it does not advance: code, /now implementation, access implementation, payment implementation, content implementation, pilot execution
Priority verdict: APPROVED_SCOPE_LOCK
Authorization status: executed only after Mauricio authorization
```

## 15. Non-goals

This phase does not:

* edit app code;
* edit tests;
* edit Prisma schema;
* edit package files;
* run tests or build;
* run Prisma, SQL, DB commands, browser/runtime, or dev server;
* create fixtures;
* create StudyLoad rows;
* create User, Student, StudentAccess, Program, Enrollment, Cycle, Session, Response, or any other DB row;
* touch staging or production;
* inspect `.env`, database URLs, raw env values, secrets, tokens, passwords, cookies, headers, or backups;
* activate payment;
* execute a pilot;
* implement `/now`, access, payment, or enrollment;
* continue L1 validation 2D;
* approve student use or product use;
* declare PAES_L1 ready;
* declare M2 ready;
* declare Sales-Ready.

## 16. Result marker

```text
MVP_SALES_PILOT_SCOPE_1_CLOSED_3_STUDENT_SCOPE_LOCKED
```
