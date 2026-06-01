# MVP-SALES-PILOT-DIRECTION-1A - Define M1-first closed sandbox readiness gate

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-DIRECTION-1A - Define M1-first closed sandbox readiness gate
```

Type:

```text
Direction / readiness / documentation-only.
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
HEAD = origin/main = origin/HEAD = 95a0eb7
```

Latest accepted commit:

```text
95a0eb7 - MVP-SALES-PILOT-DIRECTION-1: decide M1-first threshold after four dry-runs
```

Git preflight remained the live truth. Historical baselines inside documents, prompts, memory, and reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_DIRECTION_1_DECIDE_M1_FIRST_THRESHOLD_AFTER_FOUR_LOCAL_DEV_DRY_RUNS.md`
* `pro_reports/INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD.md`
* `MVP_SALES_PILOT_GO_4_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_004_EVIDENCE.md`
* `MVP_SALES_PILOT_DRY_RUN_4A_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_004.md`
* `MVP_SALES_PILOT_HARDENING_1_DEFINE_LIMITED_M1_FIRST_PILOT_HARDENING_PLAN_AFTER_THREE_LOCAL_DEV_PARTICIPANTS.md`
* `MVP_SALES_PILOT_HARDENING_2_DEFINE_CONTROLLED_NEXT_M1_PARTICIPANT_PROTOCOL.md`
* `MVP_SALES_PILOT_HARDENING_3_PREPARE_CONTROLLED_NEXT_M1_PARTICIPANT_FIXTURE.md`
* `MVP_SALES_PILOT_HARDENING_4_COMPLETE_PRIVATE_CREDENTIAL_READINESS_FOR_PILOT_M1_004.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context interpretation:

* DIRECTION-1 selected `HYBRID_DIRECTION_WITH_PHASED_GATES`.
* Four local/dev synthetic dry-runs provide local/dev M1-first confidence for the first StudyLoad happy path and continuity to a second pending M1 load.
* The same evidence does not prove current sandbox readiness, staging readiness, broader closed pilot readiness, MVP-Beta cerrado M1/M2/L1 readiness, or Sales-Ready/public readiness.
* This phase defines the gate only. It does not prepare or execute a sandbox.

## 4. Decision Inherited From DIRECTION-1

Inherited decision:

```text
HYBRID_DIRECTION_WITH_PHASED_GATES
```

Inherited implications:

* Stop generic repetition of synthetic M1-first participants.
* Do not prepare `PILOT_M1_005` only to add evidence count.
* Do not jump directly to sandbox or staging as if readiness already existed.
* Define a formal M1-first closed sandbox readiness gate.
* Preserve M1-first as the first tactical vertical inside the broader MVP-Beta cerrado M1/M2/L1 path.

## 5. Purpose Of The Readiness Gate

Purpose:

```text
Define what must be true before Bexauri can prepare or execute a closed, non-public, non-commercial M1-first sandbox.
```

The gate converts repeated local/dev confidence into a bounded checklist for a possible future sandbox. It does not declare that the checklist is already met.

## 6. Definitions

### Local/dev functional confidence

Meaning:

```text
Confidence that the controlled local/dev M1-first happy path works for the first StudyLoad, with admin/tutor evidence visible and continuity to a second pending M1 load.
```

Current state:

```text
ACHIEVED_ONLY_FOR_FIRST_STUDYLOAD_HAPPY_PATH_AND_SECOND_PENDING_LOAD_CONTINUITY
```

It does not prove real-student operation, sandbox/staging operation, support readiness, StudentAccess lifecycle, payment/trial/subscription, M2, L1, or public readiness.

### M1-first closed sandbox readiness

Meaning:

```text
A controlled readiness state for preparing a limited, non-public, non-commercial, PAES_M1-only sandbox with explicit participants, controlled access, support runbook, pause rules, evidence expectations, data limits, and language limits.
```

Current state:

```text
NOT_YET_MET
```

This document defines the criteria for that state. It does not declare the criteria satisfied.

### Staging technical readiness

Meaning:

```text
Technical confidence that a non-local target environment is configured, isolated, versioned, safe, observable, and reversible enough for the selected scope.
```

Current state:

```text
NOT_DECLARED
```

Closed sandbox readiness may require staging-like discipline, but this gate does not declare staging readiness.

### Broader closed pilot readiness

Meaning:

```text
Readiness for a broader controlled pilot beyond the narrow M1-first sandbox, including participant operations, support, access governance, evidence review, and boundaries for more than the first M1 path.
```

Current state:

```text
NOT_MET
```

### MVP-Beta cerrado M1/M2/L1 readiness

Meaning:

```text
Readiness for the closed beta scope across M1, M2, and L1 through minimum honest routes, evidence, admin/tutor operation, support boundaries, and documented limitations.
```

Current state:

```text
NOT_MET
```

M1-first is sequence, not scope.

### Sales-Ready/public readiness

Meaning:

```text
Readiness for a public offer with stable signup/login, access, enrollment, support, payment/subscription, legal/privacy, program routes, evidence, and honest claims.
```

Current state:

```text
NOT_MET
```

## 7. Evidence Basis

Evidence basis:

* `PILOT_M1_001`: local/dev student dry-run passed; admin evidence functionally satisfied; `ADMIN_UI_TITLE_VISIBILITY_DEBT` recorded.
* `PILOT_M1_002`: local/dev student dry-run passed; admin/tutor evidence fully confirmed; continuity observed toward `PAES M1 - Ecuaciones lineales basicas`; auth/account linkage repaired.
* `PILOT_M1_003`: local/dev student dry-run passed; admin/tutor evidence visible; Cycle 1 open; 2 loads; completed 1; pending 1; decisions 0; evaluations 0; self-report `Me fue bien`; MC 4/4 correct; next load not started.
* `PILOT_M1_004`: local/dev student dry-run passed; admin/tutor evidence visible; Cycle 1 open; 2 loads; completed 1; pending 1; decisions 0; evaluations 0; self-report `Me fue bien`; MC 4/4 correct; next load not started.
* SIGNOUT-1R mitigated practical session switching for human-guided local/dev operation.
* HARDENING-1/2 defined hardening plan and controlled next-participant protocol.
* HARDENING-3/4 prepared and credential-readied `PILOT_M1_004` without secret exposure.
* DIRECTION-1 and PRO recommended a formal closed sandbox readiness gate instead of generic participant repetition.

## 8. What The Gate Allows

This gate allows future planning toward:

* a limited `PAES_M1`-only closed sandbox;
* explicitly permitted participants or controlled identities;
* controlled access and identity handling;
* a sandbox runbook;
* support and failure-path preparation;
* evidence requirements for student and admin/tutor review;
* a pause/rollback policy;
* a compact final sandbox report;
* a next phase that closes minimum blockers or drafts the sandbox runbook.

## 9. What The Gate Does Not Allow

This gate does not allow:

* sandbox execution;
* sandbox preparation as if readiness were already met;
* staging execution;
* staging readiness declaration;
* public Sales-Ready declaration;
* MVP-Beta cerrado M1/M2/L1 completion declaration;
* broader closed pilot declaration;
* L1 or M2 activation;
* payment, trial, or subscription activation;
* creation of participants, users, accounts, enrollments, cycles, StudyLoads, decisions, evaluations, or access rows;
* app code, schema, seed, auth, CredentialsProvider, StudentAccess lifecycle, payment, trial, or subscription changes.

## 10. Entry Criteria

M1-first closed sandbox readiness may be declared only when all entry criteria below are satisfied or explicitly waived by a later phase with rationale.

Required entry criteria:

1. Repo is clean and the sandbox baseline is versioned.
2. Scope is written and accepted as `PAES_M1` only.
3. The phase names the exact target environment and confirms it is not production.
4. Participant list or identity-control criterion is defined before any access is granted.
5. Real sensitive data is avoided unless strictly necessary and separately governed.
6. StudentAccess lifecycle is minimally defined for the sandbox, or a formal containment decision explains how access is controlled without implementation changes.
7. Auth normalization is contained or resolved for the participant identities in scope.
8. Account linkage rules are explicit and use canonical lowercase identity.
9. Sign-out is functional enough for session switching and documented.
10. Login/change-session runbook exists.
11. Support/failure-path runbook exists and includes who pauses, who reviews, and what evidence is safe to capture.
12. Student evidence criteria are defined.
13. Admin/tutor evidence criteria are defined.
14. Policy forbids starting the next pending load unless the sandbox protocol explicitly includes that validation.
15. Allowed data types and forbidden data types are documented.
16. No payment, trial, or subscription is active in the sandbox.
17. L1 and M2 are explicitly excluded from the M1-first sandbox.
18. No PAES result, PAES score, mastery, theta, autonomous diagnostic, adaptive, or autonomous tutor promise is made.
19. Pause/rollback plan exists.
20. Compact final report template exists.
21. Manual smoke checklist exists.
22. Playwright/login E2E is either made blocking by explicit decision or replaced by a justified manual protocol for a very small human-guided sandbox.

## 11. Exit Criteria

A future closed M1-first sandbox can pass only if the sandbox report shows:

1. The permitted participant completes the first `PAES_M1` StudyLoad.
2. MC evidence is visible.
3. Self-report is visible.
4. The new M1 pending load appears without being started, unless the sandbox protocol explicitly validates the second load.
5. Admin/tutor evidence is visible enough for review.
6. Cycle decisions remain 0 unless explicitly authorized.
7. Cycle evaluations remain 0 unless explicitly authorized.
8. Login and logout complete without blocking the participant or operator.
9. Evidence is not lost.
10. No sensitive values are exposed.
11. Support/failure path is tested or at least executable through the runbook.
12. Incidents are documented with a failure taxonomy and owner.
13. No payment/trial/subscription, L1, M2, public, Sales-Ready, or MVP-Beta-complete claims are made.
14. Final decision is traceable: advance, pause, close debt, draft broader pilot criteria, or return to M2/L1 roadmap work.

## 12. Minimum Blockers Before Sandbox

Minimum blockers before closed M1-first sandbox:

* `STUDENT_ACCESS_LIFECYCLE_OR_CONTAINMENT_BLOCKER`: define minimal StudentAccess handling or a formal containment decision.
* `LOCAL_DEV_EXIT_THRESHOLD_BLOCKER`: this gate must be accepted as the threshold separating local/dev confidence from sandbox readiness.
* `SUPPORT_FAILURE_PATH_BLOCKER`: define minimum support owner, pause rule, incident capture, and escalation path.
* `AUTH_NORMALIZATION_BLOCKER`: contain canonical identity and account linkage risks.
* `SANDBOX_RUNBOOK_BLOCKER`: define login, logout, participant order, evidence capture, stop rules, and closeout.
* `PARTICIPANT_DATA_POLICY_BLOCKER`: define permitted identities and data boundaries.
* `LANGUAGE_GOVERNANCE_BLOCKER`: enforce allowed/prohibited claims.
* `ADMIN_TUTOR_EVIDENCE_BLOCKER`: define minimum admin/tutor evidence review.
* `SMOKE_MANUAL_CHECKLIST_BLOCKER`: define pre-run and post-run smoke checklist.
* `PLAYWRIGHT_LOGIN_E2E_DECISION_BLOCKER`: decide whether E2E is blocking or whether a manual protocol is sufficient for a tiny controlled sandbox.
* `SIGNOUT_RESIDUAL_POLISH_WATCH`: blocking only if it prevents reliable operation.
* `ADMIN_TITLE_VISIBILITY_WATCH`: blocking only if it prevents tutor/admin evidence review.

## 13. Debts That Can Wait

Debts that can wait until broader closed pilot or Sales-Ready, provided they are not hidden:

* payment/trial/subscription implementation or activation;
* complete legal/commercial readiness;
* L1 readiness;
* M2 readiness;
* broader closed pilot readiness;
* Sales-Ready cerrado and Sales-Ready public readiness;
* large-cohort readiness;
* mastery/theta/PAES score;
* autonomous AI tutor;
* autonomous adaptation;
* full automation, if the sandbox is explicitly tiny, human-guided, and runbook-driven;
* self-serve signup and self-serve enrollment, unless the selected sandbox design requires them;
* full production readiness.

## 14. Operational Runbook Requirements

A future sandbox runbook must include:

* phase name, baseline, target environment, and target confirmation;
* exact scope: `PAES_M1` first StudyLoad only unless expanded by protocol;
* participant allowlist or identity criteria;
* private credential handling rules;
* login and sign-out sequence;
* expected `/now` state before start;
* expected StudyLoad title and status before start;
* answer/submission/self-report sequence;
* post-completion `/now` expectation;
* admin/tutor review sequence;
* StudentAccess observation or containment note;
* forbidden actions;
* pause/failure taxonomy;
* incident recording format;
* final report format;
* explicit no-secrets rule.

## 15. Evidence Requirements

Student evidence required:

* permitted participant identity code;
* `/now` loaded;
* first StudyLoad visible;
* StudyLoad started;
* four MC responses submitted;
* self-report submitted;
* completion visible;
* next pending M1 load visible and not started unless authorized.

Admin/tutor evidence required:

* enrollment active;
* Cycle 1 open unless the sandbox explicitly tests closure;
* completed load visible;
* pending load visible;
* MC answered/correct summary visible where available;
* self-report visible;
* decision count recorded;
* evaluation count recorded;
* StudentAccess observation or containment note recorded.

Evidence must avoid credentials, secrets, tokens, cookies, headers, request bodies, response bodies, env values, DB URLs, hashes, provider values, storage values, and real sensitive data.

## 16. Failure / Pause Criteria

Pause immediately if:

* Git baseline or target environment is ambiguous.
* Participant identity is not explicitly permitted.
* Login fails.
* Logout/session switching fails.
* `/now` does not load.
* Expected M1 StudyLoad is missing or wrong.
* Activity does not render.
* MC responses cannot be selected or submitted.
* Self-report cannot be submitted.
* Completion fails.
* Post-completion continuity is missing.
* Next load is accidentally started.
* Admin/tutor evidence is not reviewable.
* StudentAccess contradicts the sandbox access boundary.
* Sensitive data appears or would need to be copied.
* Any UI or report implies Sales-Ready public, active payment/trial/subscription, L1 readiness, M2 readiness, staging readiness as current state, sandbox readiness as current state before this gate is met, or MVP-Beta completo.

Pause result must be documented as a blocker, incident, or accepted debt. Do not continue by improvisation.

## 17. Language Guardrails

Allowed language:

* `Sandbox cerrado M1-first.`
* `Prueba controlada no publica.`
* `Validacion limitada de flujo M1.`
* `No es venta publica.`
* `No activa pago ni suscripcion.`
* `No representa diagnostico PAES completo.`
* `M1-first es una vertical tactica dentro del camino hacia MVP-Beta cerrado M1/M2/L1.`

Prohibited language:

* `Sales-Ready.`
* `Disponible publicamente.`
* `MVP-Beta completo.`
* `Listo para M1/M2/L1.`
* `Diagnostico automatico.`
* `Adaptativo autonomo.`
* `Score PAES.`
* `Tutor IA autonomo.`
* `Suscripcion activa.`
* `Staging ready` as current state.
* `Sandbox ready` as current state before this gate is later proven met.

## 18. Non-Declarations

This phase does not declare:

* Sales-Ready public;
* Sales-Ready cerrado;
* MVP-Beta cerrado complete;
* current sandbox readiness;
* current staging readiness;
* broader closed pilot readiness;
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
* long continuity validation.

## 19. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-HARDENING-5 - Close minimum blockers before M1-first sandbox
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations, Block 7 M1 evidence route, and future access/payment blocks.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A defines the gate and identifies minimum blockers before sandbox.
* What it advances: closes or formally contains the minimum blockers required before drafting or executing an M1-first closed sandbox.
* What it does not advance: sandbox execution, staging execution, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, payment/trial/subscription, or autonomous AI claims.
* Priority verdict: `APPROVED_NEXT_HARDENING_CLOSE_MINIMUM_M1_FIRST_SANDBOX_BLOCKERS`
* Authorization status: requires separate explicit authorization before execution.

`MVP-SALES-PILOT-SANDBOX-0 - Draft closed M1-first sandbox runbook` remains the likely following phase after the minimum blockers are closed or formally contained.

## 20. Final Verdict

Final verdict:

```text
M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET
```

The gate is now defined. Local/dev M1-first functional confidence is achieved only for the first StudyLoad happy path and second pending-load continuity. Closed sandbox readiness is not achieved yet and must not be claimed until the entry criteria are satisfied in a later phase.

## Result Marker

```text
MVP_SALES_PILOT_DIRECTION_1A_M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET
```
