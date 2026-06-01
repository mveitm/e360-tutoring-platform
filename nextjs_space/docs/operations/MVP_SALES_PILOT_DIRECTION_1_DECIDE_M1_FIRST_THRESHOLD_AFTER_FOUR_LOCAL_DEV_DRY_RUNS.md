# MVP-SALES-PILOT-DIRECTION-1 - Decide M1-first threshold after four local/dev dry-runs

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-DIRECTION-1 - Decide M1-first threshold after four local/dev dry-runs
```

Type:

```text
Direction / documentation-only.
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
HEAD = origin/main = origin/HEAD = f94afd9
```

Latest accepted commit:

```text
f94afd9 - MVP-SALES-PILOT-GO-4: evaluate readiness after PILOT_M1_004 evidence
```

Git preflight remained the live truth. Historical baselines inside documents, memory, prompts, and external reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_GO_4_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_004_EVIDENCE.md`
* `MVP_SALES_PILOT_GO_3_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_003_EVIDENCE.md`
* `MVP_SALES_PILOT_HARDENING_1_DEFINE_LIMITED_M1_FIRST_PILOT_HARDENING_PLAN_AFTER_THREE_LOCAL_DEV_PARTICIPANTS.md`
* `MVP_SALES_PILOT_HARDENING_2_DEFINE_CONTROLLED_NEXT_M1_PARTICIPANT_PROTOCOL.md`
* `MVP_SALES_PILOT_HARDENING_3_PREPARE_CONTROLLED_NEXT_M1_PARTICIPANT_FIXTURE.md`
* `MVP_SALES_PILOT_HARDENING_4_COMPLETE_PRIVATE_CREDENTIAL_READINESS_FOR_PILOT_M1_004.md`
* `MVP_SALES_PILOT_DRY_RUN_4A_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_004.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context interpretation:

* GO-4 paused participant expansion for direction review.
* M1-first remains a tactical first vertical, not the final MVP-Beta cerrado scope.
* MVP-Beta cerrado remains M1/M2/L1.
* Sales-Ready public remains `NOT_READY`.
* This phase decides direction only; it does not implement, execute UI, prepare fixtures, or mutate data.

## 4. PRO Report Input

The required PRO report did not exist in the repo at preflight. A documentary copy was created at:

```text
nextjs_space/docs/operations/pro_reports/INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD.md
```

PRO recommendation:

```text
HYBRID_DIRECTION_WITH_PHASED_GATES
```

PRO input incorporated:

* stop generic synthetic M1-first participant repetition;
* four dry-runs prove repeatable local/dev happy path for the first StudyLoad and continuity to the second pending load;
* four dry-runs do not prove real students, sandbox/staging, StudentAccess lifecycle, support/failure path, payment/trial/subscription, M2, L1, legal/commercial readiness, cohorts, Playwright E2E, or Sales-Ready;
* a fifth participant is useful only for a new narrow question, not for `n=5`;
* do not jump directly to staging/sandbox as if readiness already existed;
* next threshold should define a formal closed M1-first sandbox readiness gate.

## 5. Evidence Basis After Four Local/Dev Dry-Runs

Evidence basis:

* `PILOT_M1_001`: local/dev student dry-run passed; admin evidence functionally satisfied; `ADMIN_UI_TITLE_VISIBILITY_DEBT` recorded.
* `PILOT_M1_002`: local/dev student dry-run passed; admin/tutor evidence fully confirmed; continuity observed to `PAES M1 - Ecuaciones lineales basicas`; auth/account linkage repaired.
* `PILOT_M1_003`: local/dev student dry-run passed; admin/tutor evidence visible; Cycle 1 open; 2 loads; completed 1; pending 1; decisions 0; evaluations 0; self-report `Me fue bien`; MC 4/4 correct; next load not started.
* `PILOT_M1_004`: local/dev student dry-run passed; admin/tutor evidence visible; Cycle 1 open; 2 loads; completed 1; pending 1; decisions 0; evaluations 0; self-report `Me fue bien`; MC 4/4 correct; next load not started.
* SIGNOUT-1R mitigated the practical session-switching blocker.
* HARDENING-1/2 defined the plan and protocol.
* HARDENING-3/4 prepared `PILOT_M1_004` fixture and private credential readiness.

## 6. What The Evidence Proves

The evidence proves:

* the M1-first local/dev happy path is repeatable for the first StudyLoad;
* controlled synthetic participants can login, load `/now`, start `PAES M1 - Entrada balanceada inicial`, answer 4 MC questions, submit responses, self-report on the same page, complete, and return to `/now`;
* admin/tutor evidence can be reviewed for the completed first StudyLoad;
* continuity to `PAES M1 - Ecuaciones lineales basicas` appears as a pending next load;
* the second load can remain unstarted when the operator follows the protocol;
* sign-out is good enough for human-guided local/dev session switching;
* decisions and evaluations remain zero and are not part of the validated automation.

Readiness state proven:

```text
M1_FIRST_LOCAL_DEV_FUNCTIONAL_CONFIDENCE_FOR_FIRST_STUDYLOAD_HAPPY_PATH
```

## 7. What The Evidence Does Not Prove

The evidence does not prove:

* real-student readiness;
* current sandbox readiness;
* current staging readiness;
* broader closed-pilot readiness;
* StudentAccess lifecycle readiness;
* support/failure path readiness;
* robust auth normalization or full auth hardening;
* Playwright login E2E readiness;
* payment, trial, or subscription readiness;
* legal or commercial readiness;
* L1 readiness;
* M2 readiness;
* large-cohort readiness;
* long continuity across multiple StudyLoads;
* CycleDecision or CycleEvaluation workflow readiness;
* autonomous diagnosis, adaptation, mastery/theta/PAES score, or AI tutor readiness.

## 8. Decision

Decision:

```text
HYBRID_DIRECTION_WITH_PHASED_GATES
```

Decision components:

* stop generic synthetic M1-first participant repetition;
* allow additional local/dev verification only for a new narrow question;
* do not jump directly to sandbox/staging as if readiness already existed;
* define a formal M1-first closed sandbox readiness gate next;
* keep M1-first as the first tactical vertical within the broader MVP-Beta cerrado M1/M2/L1 path.

## 9. Threshold Interpretation

Threshold interpretation:

```text
LOCAL_DEV_FUNCTIONAL_CONFIDENCE_REACHED
CLOSED_SANDBOX_READINESS_NOT_YET_REACHED
MVP_BETA_CERRADO_M1_M2_L1_READINESS_NOT_REACHED
```

Implications:

* `PILOT_M1_005` should not be prepared just to increase participant count.
* Another local/dev pass is acceptable only if it tests a specific new risk or question.
* The next formal threshold is not execution of sandbox; it is defining the readiness gate for closed M1-first sandbox.
* Sandbox M1-first, if later prepared, remains controlled and limited. It is not Sales-Ready public and not MVP-Beta cerrado complete.
* M2 and L1 remain part of MVP-Beta cerrado and must not be erased; they are not activated by M1-first evidence.

## 10. Debt Classification

### A. Blocking before another generic local/dev participant

* Lack of a new learning question blocks another generic synthetic participant.
* Repetition for `n=5` without a narrow purpose is rejected as low-value.

### B. Blocking before targeted local/dev verification

* Define the exact new question before authorizing a targeted local/dev pass.
* Define expected evidence and stop rule for the targeted check.
* Keep private credential/session handling boundaries explicit.
* Avoid touching StudentAccess, auth, code, schema, or DB unless separately authorized.

### C. Blocking before M1-first closed sandbox readiness

* StudentAccess lifecycle or controlled access representation.
* Local/dev exit threshold and sandbox entry criteria.
* Support/failure path.
* Auth normalization policy and account linkage checks.
* Sandbox/staging runbook and target-confirmation protocol.
* Evidence capture policy beyond informal human reports.
* Operator checklist for credential, sign-out, admin review, and no-second-load-start boundary.
* Playwright/login E2E strategy or explicit manual substitute for sandbox gate.

### D. Blocking before broader closed pilot

* M1-first sandbox readiness gate not defined.
* Support/failure path not proven beyond local/dev.
* Access register and StudentAccess relationship not settled.
* L1/M2 inclusion/exclusion boundaries not operationalized for broader pilot.
* Legal/commercial/support boundaries not ready for participants beyond synthetic/local testing.

### E. Blocking before Sales-Ready/public

* StudentAccess lifecycle.
* Self-serve signup/account bootstrap.
* Self-serve enrollment.
* Payment/trial/subscription.
* Plan/access mapping.
* L1 readiness.
* M2 readiness.
* Legal/commercial readiness.
* Support/refund/cancel/privacy policy.
* Production readiness.
* Robust auth and automation.
* Large-cohort operating model.

### F. Non-blocking for now

* `ADMIN_UI_TITLE_VISIBILITY_DEBT`, unless it prevents evidence review in a future gate.
* `SIGNOUT_UI_DEBT` residual polish, because SIGNOUT-1R mitigated human-guided session switching.
* `CODEX_BROWSER_UI_AVAILABILITY_LIMITATION`, as long as human-guided evidence remains the accepted local/dev mode.
* Additional local/dev target checks, if they are explicitly narrow and non-generic.

### G. Governance / scope debts

* preserve M1-first as sequence, not scope;
* separate local/dev functional confidence, closed sandbox readiness, and MVP-Beta cerrado readiness;
* prevent Sales-Ready or MVP-Beta declarations from local/dev synthetic evidence;
* define when and why M2/L1 gates resume;
* avoid treating future sandbox/staging as current readiness.

## 11. Rejected Paths

Rejected as immediate next paths:

* `Prepare PILOT_M1_005` only to add a fifth synthetic participant.
* Directly execute sandbox/staging without a readiness gate.
* Close all debt before any direction definition.
* Declare Sales-Ready public.
* Declare MVP-Beta cerrado complete.
* Reopen L1/M2 by interrupting the M1-first threshold decision before the sandbox gate is defined.

Allowed later with conditions:

* targeted local/dev check if it answers a new narrow question;
* limited hardening if selected by the sandbox readiness gate;
* sandbox runbook after the readiness gate defines entry criteria and blockers.

## 12. Non-Declarations

This phase does not declare:

* Sales-Ready public;
* Sales-Ready cerrado;
* MVP-Beta cerrado complete;
* current sandbox readiness;
* current staging readiness;
* broader pilot readiness;
* L1 readiness;
* M2 readiness;
* payment active;
* trial active;
* subscription active;
* public commercial plan;
* large cohort readiness;
* diagnostic automation;
* autonomous adaptation;
* mastery, theta, or PAES score readiness;
* autonomous AI tutor readiness;
* robust complete auth readiness;
* complete support readiness;
* legal/commercial readiness;
* long continuity validation.

## 13. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-DIRECTION-1A - Define M1-first closed sandbox readiness gate
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations, Block 7 M1 evidence route, and future access/payment blocks.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: four successful local/dev M1-first dry-runs, GO-4 direction pause, and PRO threshold recommendation.
* What it advances: defines the entry criteria, blockers, evidence, and non-goals for moving from local/dev M1-first confidence to closed sandbox readiness planning.
* What it does not advance: sandbox execution, staging execution, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, payment/trial/subscription, or autonomous AI claims.
* Priority verdict: `APPROVED_NEXT_GATE_DEFINE_M1_FIRST_CLOSED_SANDBOX_READINESS`.
* Authorization status: requires separate explicit authorization before execution.

Probable later phases:

```text
MVP-SALES-PILOT-HARDENING-5 - Close minimum blockers before M1-first sandbox
MVP-SALES-PILOT-SANDBOX-0 - Draft closed M1-first sandbox runbook
```

## 14. Scope Safety / Non-Actions

Verification completed:

```text
git diff --check: PASS
git status --short: REVIEWED
```

No build was required because this phase changed documentation only.

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
* print secrets;
* print env values;
* print DB URLs;
* print tokens;
* print cookies;
* print headers;
* print request bodies;
* print response bodies;
* print passwords;
* print hashes;
* print provider values;
* print storage values.

## 15. Final Verdict

Final verdict:

```text
HYBRID_DIRECTION_WITH_PHASED_GATES
```

The M1-first local/dev happy path has enough repeated evidence. Generic synthetic repetition stops here. The next step is to define the closed M1-first sandbox readiness gate before any sandbox/staging action, while preserving the broader MVP-Beta cerrado M1/M2/L1 scope and all public-readiness no-declarations.

## Result Marker

```text
MVP_SALES_PILOT_DIRECTION_1_HYBRID_DIRECTION_WITH_PHASED_GATES
```
