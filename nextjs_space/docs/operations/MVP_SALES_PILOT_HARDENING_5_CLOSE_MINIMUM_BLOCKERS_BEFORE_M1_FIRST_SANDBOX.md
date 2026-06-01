# MVP-SALES-PILOT-HARDENING-5 - Close minimum blockers before M1-first sandbox

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-HARDENING-5 - Close minimum blockers before M1-first sandbox
```

Type:

```text
Documentation / hardening planning / blocker triage only.
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
HEAD = origin/main = origin/HEAD = bce4981
```

Latest accepted commit:

```text
bce4981 - MVP-SALES-PILOT-DIRECTION-1A: define M1-first sandbox readiness gate
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
* `MVP_SALES_PILOT_DIRECTION_1_DECIDE_M1_FIRST_THRESHOLD_AFTER_FOUR_LOCAL_DEV_DRY_RUNS.md`
* `pro_reports/INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD.md`
* `MVP_SALES_PILOT_GO_4_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_004_EVIDENCE.md`
* `MVP_SALES_PILOT_DRY_RUN_4A_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_004.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context interpretation:

* DIRECTION-1 closed with `HYBRID_DIRECTION_WITH_PHASED_GATES`.
* DIRECTION-1A closed with `M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET`.
* M1-first local/dev functional confidence is achieved only for the first StudyLoad happy path and continuity to a second pending M1 load.
* Closed sandbox readiness is defined but not met.
* This phase must sequence blockers; it must not implement, execute UI, mutate data, prepare sandbox, or declare readiness.

## 4. Decision Inherited From DIRECTION-1A

Inherited gate decision:

```text
M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET
```

Inherited minimum blockers before sandbox:

* StudentAccess minimum or formal containment.
* Support/failure path.
* Auth normalization.
* Sandbox runbook.
* Participant/data criteria.
* Language governance.
* Admin/tutor evidence.
* Smoke/manual checklist.
* Playwright/login E2E decision.

## 5. Purpose Of Minimum Blocker Triage

Purpose:

```text
Prioritize and sequence the smallest blocker-closure phases required before a future closed M1-first sandbox can be prepared.
```

This phase does not close all blockers. It decides what to close first, what to define separately, what can be temporarily contained, what requires technical implementation, and what can wait.

Prioritization criterion:

```text
Reduce operational sandbox risk without opening commercial scope or touching multiple technical layers at once.
```

## 6. Blocker Inventory

Minimum blocker inventory:

1. StudentAccess minimum or formal containment.
2. Support/failure path.
3. Auth normalization.
4. Sandbox runbook.
5. Participant/data criteria.
6. Language governance.
7. Admin/tutor evidence.
8. Smoke/manual checklist.
9. Playwright/login E2E decision.
10. `ADMIN_UI_TITLE_VISIBILITY_DEBT`.
11. Residual `SIGNOUT_UI_DEBT`.
12. `CODEX_BROWSER_UI_AVAILABILITY_LIMITATION`.

## 7. Classification Matrix

| Blocker / debt | Classification | Decision | Rationale |
|---|---|---|---|
| StudentAccess minimum or formal containment | A, B, C, G, H | Must define before sandbox; implementation can wait only if formal containment is accepted. | Sandbox cannot have ambiguous access semantics. For a tiny human-guided sandbox, a documented containment can be acceptable before implementation, but public/Sales-Ready needs lifecycle enforcement. |
| Support/failure path | A, B, H | Must define before sandbox. | A participant-facing controlled run needs a minimum response for login failure, missing load, failed save, missing self-report, incomplete close, missing admin evidence, trapped session, or wrong-load start. |
| Auth normalization | B, C, G | Can be contained manually for tiny sandbox with canonical lowercase controlled identities; technical phase required before broader pilot/staging. | Local/dev evidence showed an account-linkage repair. Controlled identity reduces risk, but robust auth is not proven. |
| Sandbox runbook | A, H | Must be a separate documentation phase after access containment and support path are defined. | A runbook should assemble decided policies; drafting it too early risks hiding unresolved blockers. |
| Participant/data criteria | A, B, H | Must define before sandbox. | Participant allowlist, synthetic vs real controlled identity, allowed data, prohibited data, and communication/consent boundaries are prerequisite to any sandbox. |
| Language governance | A, B, H | Must define before sandbox and can be grouped with participant/data criteria. | Claims must stay M1-only, non-public, non-paid, non-diagnostic, and tied to MVP-Beta M1/M2/L1 path. |
| Admin/tutor evidence | A, B, C, H | Must define before sandbox; manual evidence can be acceptable for tiny sandbox. | Completed StudyLoad, MC evidence, self-report, pending continuity, decision/evaluation counts, incidents, and support observations must be reviewable. |
| Smoke/manual checklist | A, B, C, H | Must define before sandbox; manual checklist can be accepted for tiny sandbox if Playwright remains non-blocking. | The sandbox needs pre-run and post-run checks, but full automation is not mandatory for a very small human-guided run. |
| Playwright/login E2E | C, D, G | Recommended but not blocker for tiny human-guided sandbox; blocker before staging or broader pilot unless explicitly waived. | Existing dry-runs were human-guided. E2E reduces regression risk but should not block a tiny closed sandbox if the manual protocol is strong. |
| `ADMIN_UI_TITLE_VISIBILITY_DEBT` | C, D, G | Not a blocker unless it prevents tutor/admin evidence review. | Prior evidence was visible enough. Title clarity matters if review becomes ambiguous. |
| Residual `SIGNOUT_UI_DEBT` | C, D, G | Not a blocker if SIGNOUT-1R path remains operational; watch item for sandbox checklist. | SIGNOUT-1R mitigated the session-switching runtime issue. Polish can wait unless operation fails. |
| `CODEX_BROWSER_UI_AVAILABILITY_LIMITATION` | C, H | Contain by requiring human-guided execution/evidence for sandbox. | Codex cannot independently validate authenticated browser flow here; sandbox should explicitly rely on human-guided execution if no E2E phase happens first. |
| Payment/trial/subscription | E, F | Should not be touched yet. | Excluded from M1-first sandbox and required only for later commercial gates. |
| L1/M2 readiness | E, F | Should not be touched in M1-first sandbox hardening. | M1-first is first vertical; MVP-Beta scope remains M1/M2/L1 but L1/M2 are later gates. |
| Legal/commercial complete readiness | E, F | Can wait until broader closed pilot or Sales-Ready/public. | Sandbox remains non-public and non-commercial with strict language limits. |

Classification key:

* A. Must close before M1-first sandbox.
* B. Must define before M1-first sandbox, implementation can wait.
* C. Can be contained manually for a tiny closed sandbox.
* D. Can wait until broader closed pilot.
* E. Can wait until Sales-Ready/public.
* F. Should not be touched yet.
* G. Needs separate technical phase.
* H. Needs separate governance/documentation phase.

## 8. Sequencing Rationale

Sequencing rationale:

1. Access semantics come first because every later sandbox decision depends on who is allowed in and how access is represented.
2. Support/failure path comes second because a sandbox cannot be responsibly operated without pause and incident handling.
3. Participant/data and language governance can be defined with either access containment or support, but should not be buried inside a technical phase.
4. Sandbox runbook should come after access/support decisions because it should compile resolved policies, not invent them.
5. Auth normalization and Playwright/login E2E should remain separate because they touch different risk layers and can otherwise expand the phase.
6. Admin/tutor evidence and smoke checklist should be included in the support/runbook chain, not mixed with StudentAccess implementation.
7. Payment, L1, M2, public legal/commercial readiness, and broad automation must stay out of this path.

## 9. Recommended First Blocker To Close

Recommended first blocker:

```text
StudentAccess sandbox containment or minimum lifecycle decision.
```

Decision:

```text
RECOMMEND_STUDENT_ACCESS_CONTAINMENT_FIRST
```

Rationale:

* DIRECTION-1A made access representation the first ambiguity before sandbox.
* The current evidence includes missing or unobserved StudentAccess for recent local/dev participants.
* A tiny closed sandbox can likely proceed with formal containment instead of immediate implementation, but that must be explicit before any runbook or sandbox preparation.
* This keeps the next phase documentary/governance-sized and avoids touching schema, auth, DB, or runtime.

Not selected first:

* Support/failure path: essential, but it needs participant/access assumptions.
* Sandbox runbook: premature before access and support decisions.
* Auth normalization: important, but controllable with canonical identity for a tiny sandbox and better handled as a separate technical threshold later.
* Playwright/login E2E: valuable, but not the highest immediate blocker for a tiny human-guided sandbox.

## 10. Recommended Phase Sequence

Recommended sequence:

1. `MVP-SALES-PILOT-HARDENING-5A - Define StudentAccess containment for M1-first sandbox`
2. `MVP-SALES-PILOT-HARDENING-5B - Define support/failure path for M1-first sandbox`
3. `MVP-SALES-PILOT-HARDENING-5C - Define participant/data and language guardrails for M1-first sandbox`
4. `MVP-SALES-PILOT-SANDBOX-0 - Draft closed M1-first sandbox runbook`
5. `MVP-SALES-PILOT-HARDENING-5D - Decide auth normalization and Playwright/login E2E threshold before sandbox/staging`

Sequence notes:

* `5A` should not implement StudentAccess.
* `5B` should not create a runbook for full sandbox execution; it should define failure classes, pause ownership, and minimum response rules.
* `5C` may be merged into `5A` only if kept small and documentary.
* `SANDBOX-0` should not execute sandbox; it should draft a runbook after blockers are contained.
* `5D` should not mix auth repair and E2E implementation unless a later technical phase explicitly authorizes it.

## 11. What Can Be Contained Manually

Can be contained manually for a tiny closed sandbox:

* StudentAccess, if `5A` formally defines an access register/source-of-truth containment and states exactly what is not enforced.
* Auth normalization, if identities are canonical lowercase and pre-checked before any sandbox action.
* Participant identity, if allowlisted and controlled.
* Data limits, if real sensitive data is avoided and private records stay outside repo.
* Evidence capture, if the checklist requires safe observations only.
* Admin/tutor evidence, if visible enough for review and incidents are captured.
* Smoke/manual checklist, if the sandbox is tiny and human-guided.
* Codex browser limitation, if Mauricio performs private authenticated UI actions and reports only safe observations.
* Sign-out residual polish, if session switching works via the SIGNOUT-1R path.
* Admin title visibility, if evidence remains reviewable.

## 12. What Cannot Be Contained Manually

Cannot be contained manually for sandbox readiness:

* Unclear access authorization for participants.
* Undefined support/failure ownership.
* No pause rule for failed login, missing load, failed response save, missing self-report, incomplete close, missing admin evidence, trapped session, or wrong-load start.
* Any need to copy credentials, tokens, cookies, headers, request bodies, response bodies, env values, DB URLs, passwords, hashes, provider values, or storage values.
* Any UI/report language implying public sale, paid plan, active subscription, full PAES diagnosis, autonomous adaptation, L1/M2 readiness, staging readiness as current state, or sandbox readiness before the gate is met.
* Any participant flow using real sensitive data without explicit data/consent boundary.
* Any sandbox attempt without a baseline, target confirmation, and final compact report requirement.

## 13. What Can Wait Until Broader Closed Pilot

Can wait until broader closed pilot:

* Playwright/login E2E, if tiny sandbox remains human-guided and manual checklist is accepted.
* Technical auth normalization repair, if controlled identity containment is accepted for sandbox.
* Admin UI title polish, unless evidence review is blocked.
* Sign-out UX polish, unless session switching is blocked.
* Automated admin evidence assertion.
* Larger participant operations.
* Multi-participant support process beyond the tiny sandbox scope.
* Deeper M1 coverage and expert review beyond the first sandbox evidence path.

## 14. What Can Wait Until Sales-Ready/Public

Can wait until Sales-Ready/public:

* payment/trial/subscription implementation or activation;
* complete legal/commercial readiness;
* self-serve signup and self-serve enrollment;
* full StudentAccess lifecycle enforcement beyond sandbox containment;
* L1 readiness;
* M2 readiness;
* multi-program dashboard;
* large-cohort readiness;
* production readiness;
* mastery/theta/PAES score;
* autonomous AI tutor;
* autonomous adaptation;
* public support/refund/cancel/privacy operating model.

## 15. Non-Declarations

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
* long continuity validation.

## 16. Explicit Non-Actions

This phase did not:

* implement;
* execute UI;
* mutate DB;
* create students;
* create User or Account;
* create Enrollment, LearningCycle, or StudyLoad;
* start loads;
* close cycles;
* create CycleDecision;
* create CycleEvaluation;
* touch app code;
* touch schema;
* touch seed;
* touch auth;
* touch CredentialsProvider;
* touch StudentAccess lifecycle;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging;
* touch production;
* create sandbox real;
* create an executable sandbox runbook;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values.

## 17. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-HARDENING-5A - Define StudentAccess containment for M1-first sandbox
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for closed pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate and HARDENING-5 blocker triage.
* What it advances: defines whether the M1-first sandbox can use formal access containment or must wait for minimum StudentAccess lifecycle work.
* What it does not advance: implementation, sandbox execution, staging execution, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, payment/trial/subscription, auth repair, or Playwright E2E implementation.
* Priority verdict: `APPROVED_NEXT_SMALL_GOVERNANCE_PHASE_STUDENTACCESS_CONTAINMENT`
* Authorization status: requires separate explicit authorization before execution.

## 18. Final Verdict

Final verdict:

```text
MINIMUM_BLOCKER_SEQUENCE_DEFINED_RECOMMEND_STUDENT_ACCESS_CONTAINMENT_FIRST
```

The minimum blocker sequence is defined. The next phase should decide StudentAccess containment for a tiny closed M1-first sandbox before support path, sandbox runbook, auth normalization, or Playwright/login E2E work. Closed sandbox readiness remains not met.

## Result Marker

```text
MVP_SALES_PILOT_HARDENING_5_MINIMUM_BLOCKER_SEQUENCE_DEFINED_RECOMMEND_STUDENT_ACCESS_CONTAINMENT_FIRST
```
