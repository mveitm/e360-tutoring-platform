# MVP-SALES-PILOT-HARDENING-1 - Define limited M1-first pilot hardening plan after three local/dev participants

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-HARDENING-1 - Define limited M1-first pilot hardening plan after three local/dev participants
```

Type:

```text
Documentation-only / planning-only.
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
HEAD = origin/main = origin/HEAD = b670e34
```

Latest accepted commit:

```text
b670e34 - MVP-SALES-PILOT-GO-3: evaluate readiness after PILOT_M1_003 evidence
```

Git preflight is the live truth. Historical baselines inside older documents are treated as historical context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_GO_2_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_002_EVIDENCE.md`
* `MVP_SALES_PILOT_DRY_RUN_3C_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_003.md`
* `MVP_SALES_PILOT_GO_3_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_003_EVIDENCE.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context gate interpretation:

* M1-first is a tactical first vertical, not the final MVP-Beta closed scope.
* MVP-Beta cerrado remains M1/M2/L1.
* Sales-Ready public remains `NOT_READY`.
* This phase may plan the next controlled M1-first increment, but it must not implement or execute it.

## 4. Evidence Basis After Three Participants

Evidence basis:

* `PILOT_M1_001`: local/dev student dry-run passed; admin evidence functionally satisfied; `ADMIN_UI_TITLE_VISIBILITY_DEBT` recorded.
* `PILOT_M1_002`: local/dev student dry-run passed; admin/tutor evidence fully confirmed; continuity observed toward `PAES M1 - Ecuaciones lineales basicas`; auth/account linkage repaired after email-normalization mismatch.
* `PILOT_M1_003`: local/dev student dry-run passed; student completed login -> `/now` -> start `PAES M1 - Entrada balanceada inicial` -> answer 4/4 MC -> submit responses -> self-report `Me fue bien` -> completion -> `/now` with registered activity and new pending `PAES M1 - Ecuaciones lineales basicas`; admin/tutor evidence visible with Cycle 1 open, 2 loads, completed 1, pending 1, 0 decisions, and 0 evaluations.
* SIGNOUT-1R mitigated the practical session-switching blocker for human-guided multi-student dry-runs by routing `/now` and `/admin` sign-out through `/api/session/sign-out`.

The evidence supports controlled M1-first continuation. It does not support public Sales-Ready, MVP-Beta cerrado completion, L1 readiness, M2 readiness, payment/trial/subscription activation, or autonomous/large-cohort claims.

## 5. Decision Inherited From GO-3

GO-3 decision:

```text
GO_TO_NEXT_M1_FIRST_STEP_WITH_RECORDED_DEBTS
```

GO-3 classification:

* Blocking before next controlled M1-first step: none identified.
* Before Sales-Ready/public: StudentAccess lifecycle, auth normalization, payment/trial/subscription, L1/M2, support/legal/commercial gaps.
* Automation/test: Playwright login E2E and Codex browser UI limitation.
* UX/operator: admin title visibility and sign-out polish residual.
* Governance: keep M1-first scoped as the first tactical vertical toward MVP-Beta cerrado M1/M2/L1.

## 6. Hardening Goal

Hardening goal:

```text
Define the smallest controlled M1-first hardening increment needed before exposing the flow to another controlled participant or pilot-like pass.
```

The next step should reduce operator ambiguity and evidence-review risk without expanding scope into public/commercial readiness.

The hardening target is not to build a public-ready product. It is to create a bounded checklist and protocol for the next controlled M1-first participant/pass so the team can repeat the loop with fewer manual ambiguities and clearer stop rules.

## 7. Required Before Next Controlled M1-first Step

Required before the next controlled M1-first step:

1. Define a controlled next-participant protocol with:
   * participant identity convention;
   * private credential handling boundary;
   * pre-run `/now` expected state;
   * first StudyLoad expected state;
   * answer/submission/self-report path;
   * post-run `/now` expected evidence;
   * admin/tutor evidence checklist;
   * explicit stop rules.
2. Confirm session-switching procedure:
   * use visible `Cerrar sesion`;
   * confirm redirect to `/login`;
   * avoid sharing or logging credentials, cookies, tokens, headers, request bodies, or response bodies.
3. Confirm no accidental second-load start:
   * after completion, next pending `PAES M1 - Ecuaciones lineales basicas` may be visible;
   * do not start it unless a future phase explicitly authorizes that run.
4. Confirm evidence capture expectations:
   * completed initial StudyLoad visible;
   * self-report visible;
   * MC response summary visible where admin/tutor evidence is checked;
   * pending continuity visible;
   * decisions and evaluations remain explicitly observed, not inferred.
5. Confirm no scope escalation:
   * no L1/M2 activation;
   * no payment/trial/subscription activation;
   * no public/commercial claims;
   * no autonomous diagnostic/adaptive claims.

These requirements are documentation/protocol requirements. They do not require code, schema, DB, auth, StudentAccess, or content registry changes before the next controlled M1-first step.

## 8. Recommended Before Next Controlled M1-first Step

Recommended before the next controlled M1-first step:

1. Create a concise operator checklist for the next participant/pass.
2. Include a one-line StudentAccess observation field in the checklist:
   * present / missing / not checked;
   * explicitly mark missing as non-blocking only for this controlled local/dev M1-first pass unless it blocks runtime access.
3. Include admin/tutor title-visibility check:
   * if full title is visible, record resolved for that pass;
   * if not, keep `ADMIN_UI_TITLE_VISIBILITY_DEBT` as non-blocking but visible.
4. Include sign-out observation:
   * `Cerrar sesion` visible;
   * redirect to `/login`;
   * no session-switching manual workaround needed beyond the endpoint.
5. Include auth normalization observation:
   * canonical lowercase email used;
   * no mixed-case Student/User mismatch observed.
6. Prepare a short failure taxonomy:
   * login failure;
   * `/now` missing pending load;
   * activity render failure;
   * response submit failure;
   * self-report failure;
   * post-completion continuity missing;
   * admin evidence missing.

These recommended actions keep the next step controlled and reduce operator ambiguity without making Sales-Ready claims.

## 9. Can Wait Until Sales-Ready/Public

Can wait until before Sales-Ready/public, but must not be erased:

* full StudentAccess lifecycle enforcement and cleanup;
* self-serve signup/account bootstrap;
* self-serve enrollment into tutorias;
* trial lifecycle and expiration/blocking;
* payment/subscription provider or manual ledger policy;
* plan/access mapping;
* legal/privacy/support/refund/cancel policy;
* L1 route/content/evidence/rubric readiness;
* M2 route/content/evidence/rubric readiness;
* broad M1 coverage and expert review;
* Playwright authenticated login E2E;
* automated full student/admin regression;
* production/staging deployment readiness;
* large-cohort operating model.

These items block Sales-Ready/public or full MVP-Beta declarations, but they do not block a tightly controlled next M1-first local/dev step.

## 10. Explicitly Out Of Scope

Explicitly out of scope now:

* implementing code;
* executing UI;
* mutating DB;
* creating students;
* creating StudyLoads;
* starting a new load;
* closing cycles;
* creating CycleDecision;
* creating CycleEvaluation;
* changing app code;
* changing schema;
* changing seed;
* changing auth;
* changing CredentialsProvider;
* changing StudentAccess lifecycle;
* changing payment/trial/subscription;
* activating L1;
* activating M2;
* touching staging;
* touching production;
* building diagnostic automation;
* building autonomous adaptation;
* building mastery/theta/PAES score;
* building autonomous AI tutor behavior;
* building large-cohort readiness.

## 11. Risk / Watch List

Watch items:

* `STUDENT_ACCESS_LIFECYCLE_DEBT`: missing StudentAccess did not block `PILOT_M1_003`, but it is risky for public/commercial access claims and should be explicitly observed on future passes.
* `AUTH_EMAIL_NORMALIZATION_DEBT`: `PILOT_M1_002` required repair; future participant setup should use canonical lowercase identity from the start.
* `ADMIN_UI_TITLE_VISIBILITY_DEBT`: not blocking controlled continuation, but title visibility matters for efficient tutor/admin evidence review.
* `SIGNOUT_UI_DEBT`: SIGNOUT-1R mitigated the blocker; residual UX polish should remain tracked if operator friction persists.
* `PLAYWRIGHT_LOGIN_E2E_DEBT`: non-blocking for human-guided local/dev passes, but still important before broader regression confidence.
* `CODEX_BROWSER_UI_AVAILABILITY_LIMITATION`: Codex cannot independently verify authenticated browser flows without human-guided evidence unless tooling changes.
* No CycleDecision/CycleEvaluation evidence exists in the three passes; do not imply decision automation or evaluation automation.
* The next pending StudyLoad has repeatedly appeared; it has not been executed in these phases and should not be treated as validated completion evidence.

## 12. Proposed Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-HARDENING-2 - Define controlled next M1 participant protocol
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependency on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for closed pilot readiness, not sufficient for public Sales-Ready.
* Dependency: GO-3 confirmed repeatability across three local/dev participants with recorded debts and no blockers before the next controlled M1-first step.
* What it advances: creates the bounded operator protocol/checklist for a next controlled M1-first participant or pass.
* What it does not advance: code, DB, StudentAccess lifecycle, L1/M2 readiness, payment/trial/subscription, public Sales-Ready, production/staging, or autonomous AI claims.
* Priority verdict: `APPROVED_NEXT_CONTROLLED_M1_FIRST_HARDENING_STEP`.
* Authorization status: requires separate explicit authorization before execution.

Why this option:

* It is smaller and safer than preparing a fourth participant immediately.
* It addresses the repeated operator ambiguity surfaced by three human-guided passes.
* It preserves the GO-3 decision while preventing accidental scope creep into Sales-Ready or full MVP-Beta claims.

Not selected as immediate next phase:

* `Fix the smallest operator/UX debt before next M1 participant`: useful, but should be selected only after the protocol identifies the smallest concrete fix.
* `Prepare local/dev M1-first fourth participant`: premature until the next-participant protocol and stop rules are explicit.

## 13. Non-Declarations

This phase does not declare:

* Sales-Ready public;
* Sales-Ready cerrado;
* MVP-Beta cerrado complete;
* L1 readiness;
* M2 readiness;
* payment active;
* trial active;
* subscription active;
* public commercial plan;
* diagnostic automation;
* autonomous adaptation;
* mastery, theta, or PAES score readiness;
* autonomous AI tutor readiness;
* large cohort readiness;
* self-serve signup readiness;
* self-serve enrollment readiness;
* production readiness;
* staging readiness.

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
* create StudyLoads;
* start a new load;
* close cycles;
* create CycleDecision;
* create CycleEvaluation;
* touch app code;
* touch schema;
* touch seed;
* touch auth;
* touch CredentialsProvider;
* touch StudentAccess lifecycle;
* touch payment;
* touch trial;
* touch subscription;
* touch L1;
* touch M2;
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

## 15. Final Recommendation

Final recommendation:

```text
PROCEED_TO_HARDENING_2_DEFINE_CONTROLLED_NEXT_M1_PARTICIPANT_PROTOCOL
```

The next controlled M1-first step should be protocol hardening, not immediate fourth-participant setup and not a public/commercial readiness declaration. The protocol should define what must be checked before, during, and after the next controlled M1-first pass, while preserving all recorded debts and no-declaration boundaries.

## Result Marker

```text
MVP_SALES_PILOT_HARDENING_1_LIMITED_M1_FIRST_HARDENING_PLAN_DEFINED
```
