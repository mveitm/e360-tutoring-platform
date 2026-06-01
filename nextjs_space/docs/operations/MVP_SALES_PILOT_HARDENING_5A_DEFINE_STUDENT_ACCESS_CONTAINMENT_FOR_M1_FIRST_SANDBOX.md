# MVP-SALES-PILOT-HARDENING-5A - Define StudentAccess containment for M1-first sandbox

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-HARDENING-5A - Define StudentAccess containment for M1-first sandbox
```

Type:

```text
Documentation / governance / access-containment decision only.
```

Roadmap block:

```text
10 - Internal pilot and sales-ready go/no-go
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## 2. Baseline

Baseline confirmed by Git preflight:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = 0f48c5f
```

Latest accepted commit:

```text
0f48c5f - MVP-SALES-PILOT-HARDENING-5: sequence minimum blockers before M1-first sandbox
```

Git preflight remained the live truth. Historical baselines inside documents, prompts, memory, and reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_DIRECTION_1A_DEFINE_M1_FIRST_CLOSED_SANDBOX_READINESS_GATE.md`
* `MVP_SALES_PILOT_HARDENING_5_CLOSE_MINIMUM_BLOCKERS_BEFORE_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_DIRECTION_1_DECIDE_M1_FIRST_THRESHOLD_AFTER_FOUR_LOCAL_DEV_DRY_RUNS.md`
* `pro_reports/INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD.md`
* `MVP_SALES_PILOT_GO_4_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_004_EVIDENCE.md`
* `MVP_SALES_PILOT_DRY_RUN_4A_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_004.md`
* `PHASE_LOG.md` tail

Context interpretation:

* DIRECTION-1 closed with `HYBRID_DIRECTION_WITH_PHASED_GATES`.
* DIRECTION-1A closed with `M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET`.
* HARDENING-5 closed with `MINIMUM_BLOCKER_SEQUENCE_DEFINED_RECOMMEND_STUDENT_ACCESS_CONTAINMENT_FIRST`.
* StudentAccess was missing or not fully lifecycle-managed in recent local/dev evidence, but local/dev dry-runs still passed under fixture, private credential, and human-guided control.
* This phase decides containment policy only. It does not create rows, alter lifecycle, execute sandbox, or declare readiness.

## 4. Decision Inherited From HARDENING-5

Inherited decision:

```text
MINIMUM_BLOCKER_SEQUENCE_DEFINED_RECOMMEND_STUDENT_ACCESS_CONTAINMENT_FIRST
```

Inherited sequence:

1. `HARDENING-5A - Define StudentAccess containment for M1-first sandbox`.
2. `HARDENING-5B - Define support/failure path for M1-first sandbox`.
3. `HARDENING-5C - Define participant/data and language guardrails`.
4. `SANDBOX-0 - Draft closed M1-first sandbox runbook`.
5. `HARDENING-5D - Decide auth normalization and Playwright/login E2E threshold`.

## 5. Purpose Of StudentAccess Containment

Purpose:

```text
Decide whether a future tiny, human-guided, non-public, non-commercial M1-first sandbox can proceed with formal temporary StudentAccess containment instead of implemented StudentAccess lifecycle.
```

This policy exists because StudentAccess is a real access/governance concern, but implementing lifecycle now would mix documentation, access policy, runtime behavior, and possibly schema/app changes in a phase whose objective is only governance.

## 6. Current Evidence And Risk

Evidence:

* Four local/dev M1-first dry-runs passed the first StudyLoad happy path and showed continuity to a second pending M1 load.
* `PILOT_M1_003` and `PILOT_M1_004` evidence preserved StudentAccess as missing, not observed, or lifecycle debt.
* Missing StudentAccess did not block controlled local/dev operation because access was governed by synthetic fixtures, private credentials, manual sequencing, and human-guided execution.
* The same pattern does not automatically carry to sandbox because sandbox introduces a non-local or more formal operating context, participant authorization, evidence custody, support expectations, and stronger language boundaries.

Risk created by missing or incomplete StudentAccess:

* access authority becomes ambiguous;
* a participant may be treated as allowed without a formal access record;
* missing row could be misread as either `no_access` or `full_access`;
* admin/tutor review may not know whether access was intended;
* support decisions lack a source of truth;
* future broader pilot, staging, or Sales-Ready work could inherit manual exceptions as if they were product behavior.

## 7. Layered Access Interpretation

### A. Local/dev dry-run

StudentAccess may be missing only when:

* participant identity is synthetic/control-only;
* fixture scope is explicit;
* credential is private and controlled by the team;
* run is human-guided;
* no public, paid, trial, subscription, L1, M2, or Sales-Ready claim is made;
* StudentAccess state is documented as missing, not observed, or debt.

Required documentation:

* participant code;
* access mechanism used;
* StudentAccess observation;
* non-declarations;
* no-secret boundary.

### B. Tiny closed M1-first sandbox human-guided

Formal containment is allowed only with strict limits:

* sandbox is M1-first only;
* sandbox is not public;
* sandbox is not commercial;
* participant list is explicit before any run;
* participant account/fixture is created only by Bexauri team in a separately authorized phase;
* credential is configured privately;
* access is limited to `PAES_M1`;
* no payment, trial, or subscription is active;
* no self-serve signup;
* no self-serve enrollment;
* no automatic access grant by StudentAccess runtime;
* StudentAccess missing is not interpreted automatically as `no_access` or `full_access`;
* temporary authority is the sandbox runbook plus participant allowlist and controlled fixture;
* if participant is not on the allowlist, the run must not proceed;
* if access inconsistency appears, pause.

Waiver / note required:

```text
STUDENT_ACCESS_TEMPORARY_CONTAINMENT_WAIVER_FOR_TINY_HUMAN_GUIDED_M1_FIRST_SANDBOX
```

The waiver must state that this is an exception for a tiny human-guided sandbox, not architecture, not staging readiness, not broader pilot readiness, and not Sales-Ready.

Evidence required:

* participant appears on allowlist;
* scope is `PAES_M1`;
* StudentAccess state is recorded as missing / not checked / present;
* containment waiver is referenced;
* no unauthorized load appears;
* no payment/trial/subscription state is active;
* support/failure path can pause the run.

### C. Broader closed pilot

Minimum lifecycle should exist before broader closed pilot.

Conceptual minimum states should include at least:

```text
no_access
invited
active_sandbox
paused
expired
revoked
```

If the pilot includes paid or subscription-like access, future states may need:

```text
subscribed_active
subscription_past_due
subscription_cancelled
```

This phase does not implement those states or modify schema.

### D. Staging

StudentAccess lifecycle is blocking for staging with external users or any environment that could be mistaken for readiness.

Mocks or fixtures may be acceptable only for internal technical smoke if:

* target is explicitly internal;
* no external user participates;
* no readiness claim is made;
* fixture/mocking limits are documented;
* no public, paid, trial, subscription, L1, M2, or Sales-Ready claim is made.

### E. Sales-Ready/public

Complete StudentAccess lifecycle is blocking.

Sales-Ready/public cannot lack:

* deterministic access status;
* signup/account linkage;
* enrollment relationship;
* trial/payment/subscription relationship where applicable;
* block/unblock behavior;
* pause/revoke/expire behavior;
* admin/tutor visibility;
* support audit trail;
* safe handling of unauthorized users.

## 8. Decision

Decision:

```text
STUDENT_ACCESS_CONTAINMENT_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
```

Interpretation:

* A future tiny closed M1-first sandbox may proceed without implementing full StudentAccess lifecycle only if the formal containment policy in this document is satisfied.
* The containment does not make sandbox readiness current.
* The containment does not authorize sandbox execution.
* The containment does not apply to broader closed pilot, staging with external users, Sales-Ready/public, payment, trial, subscription, L1, or M2.

## 9. Formal Containment Policy

Formal temporary containment policy:

1. The sandbox must be described as `Sandbox cerrado M1-first`.
2. The sandbox must be non-public.
3. The sandbox must be non-commercial.
4. Participants must be explicitly permitted before execution.
5. Participant accounts/fixtures must be created only by Bexauri team in a separately authorized phase.
6. Credentials must be configured privately and never printed.
7. Access is limited to `PAES_M1`.
8. Payment, trial, and subscription are inactive.
9. Signup self-serve is inactive.
10. Enrollment self-serve is inactive.
11. StudentAccess is not the runtime authority for the sandbox if lifecycle is not implemented.
12. `StudentAccess` missing is not interpreted automatically as `no_access`.
13. `StudentAccess` missing is not interpreted automatically as `full_access`.
14. Temporary authority is the runbook, allowlist, controlled fixture, private credential custody, and documented phase boundary.
15. Every account used in sandbox must appear on the permitted participant list.
16. A participant not on the allowlist must not run.
17. Any access inconsistency triggers pause.
18. StudentAccess lifecycle remains blocker before broader closed pilot and Sales-Ready/public.

## 10. Conditions Where Containment Is Allowed

Containment is allowed only if all are true:

* sandbox has 1-2 participants or an equivalently tiny controlled group;
* participants are internal, synthetic, or explicitly controlled;
* there is no public access;
* there is no commercial expectation;
* there is no paid pilot communication;
* there is no trial or subscription state;
* Bexauri team controls fixture/account/credential preparation;
* sandbox is human-guided;
* support/failure path exists before execution;
* participant/data/language guardrails exist before execution;
* runbook references this containment decision;
* admin/tutor evidence records StudentAccess observation;
* any unauthorized or ambiguous state pauses the run.

## 11. Conditions Where Containment Is Not Allowed

Containment is not allowed and minimum lifecycle becomes required if any condition appears:

* more than 1-2 participants not internal or not synthetic;
* real external students without strict control;
* access with commercial expectation;
* paid pilot communication;
* signup autonomous;
* enrollment autonomous;
* trial or subscription active;
* staging with external users;
* support is not human-guided;
* cohort operation;
* multiple programs;
* M2 or L1 active;
* need to block or unblock access from UI;
* need for expiration or access audit;
* risk that a user sees unauthorized loads;
* admin/tutor cannot tell whether access was intended;
* support cannot determine whether a participant should continue;
* data or language guardrails are missing.

## 12. Future Minimum Lifecycle Concept

Conceptual future lifecycle, not implemented here:

```text
no_access
invited
active_sandbox
paused
expired
revoked
subscribed_active
```

Minimum relationships future phases should decide:

* access status;
* program scope;
* participant/account linkage;
* enrollment linkage;
* trial/payment/subscription relationship, if applicable;
* pause/revoke/expire owner;
* admin/tutor visibility;
* audit/support trace.

This concept is intentionally not a schema design and not an implementation plan.

## 13. Operational Evidence Required Under Containment

If containment is used later, the sandbox evidence must record:

* Git baseline;
* target environment;
* participant allowlist reference;
* participant code;
* scope `PAES_M1`;
* credential handled privately;
* StudentAccess state: present / missing / not checked;
* containment waiver marker;
* first StudyLoad expected and observed;
* no unauthorized loads observed;
* no payment/trial/subscription active;
* support/failure path available;
* pause incidents, if any;
* final decision: pass, pause, close debt, or block.

Safe result marker for a later sandbox using this policy:

```text
STUDENT_ACCESS_TEMPORARY_CONTAINMENT_USED_WITH_STRICT_LIMITS
```

## 14. Relationship With Support / Failure Path

HARDENING-5B must define how to pause and respond if:

* login fails;
* participant is not on allowlist;
* StudentAccess state conflicts with expected containment;
* `/now` shows missing load;
* `/now` shows unauthorized load;
* responses do not save;
* self-report does not appear;
* completion fails;
* admin/tutor evidence does not appear;
* session gets trapped;
* wrong load is started.

This containment policy is not executable without a support/failure path.

## 15. Relationship With Participant / Data / Language Guardrails

HARDENING-5C must define:

* allowed participant identity types;
* forbidden real sensitive data;
* consent/communication minimum if any participant is not purely synthetic/internal;
* permitted labels for M1-first sandbox;
* prohibited claims around public sale, payment, trial, subscription, full PAES diagnosis, autonomous adaptation, L1/M2 readiness, staging readiness, sandbox readiness current state, Sales-Ready, and MVP-Beta complete.

This containment policy depends on those guardrails before any sandbox runbook or execution.

## 16. Non-Declarations

This phase does not declare:

* current sandbox readiness;
* current staging readiness;
* Sales-Ready public;
* Sales-Ready cerrado;
* MVP-Beta cerrado complete;
* broader pilot readiness;
* large-cohort readiness;
* L1 readiness;
* M2 readiness;
* payment active;
* trial active;
* subscription active;
* public commercial plan;
* automatic diagnosis;
* autonomous adaptation;
* mastery, theta, or PAES score readiness;
* autonomous AI tutor readiness;
* robust complete auth readiness;
* complete support readiness;
* legal/commercial readiness;
* long continuity validation;
* StudentAccess lifecycle implemented.

## 17. Explicit Non-Actions

This phase did not:

* implement;
* execute UI;
* mutate DB;
* create students;
* create User or Account;
* create Enrollment, LearningCycle, or StudyLoad;
* create or modify StudentAccess rows;
* touch StudentAccess lifecycle;
* start loads;
* close cycles;
* create CycleDecision;
* create CycleEvaluation;
* touch app code;
* touch schema;
* touch seed;
* touch auth;
* touch CredentialsProvider;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging;
* touch production;
* create sandbox real;
* create a complete executable sandbox runbook;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values.

## 18. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-HARDENING-5B - Define support/failure path for M1-first sandbox
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5 sequence, and this StudentAccess containment decision.
* What it advances: defines the minimum pause, support, and failure handling required before any closed M1-first sandbox runbook.
* What it does not advance: sandbox execution, staging execution, StudentAccess implementation, auth implementation, Playwright E2E, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_GOVERNANCE_PHASE_SUPPORT_FAILURE_PATH`
* Authorization status: requires separate explicit authorization before execution.

## 19. Final Verdict

Final verdict:

```text
STUDENT_ACCESS_CONTAINMENT_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
```

A future tiny closed M1-first sandbox can use formal temporary StudentAccess containment only under strict limits. This does not declare sandbox readiness, does not implement StudentAccess lifecycle, and does not permit broader pilot, staging with external users, Sales-Ready/public, payment/trial/subscription, L1, or M2.

## Result Marker

```text
MVP_SALES_PILOT_HARDENING_5A_STUDENT_ACCESS_CONTAINMENT_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
```
