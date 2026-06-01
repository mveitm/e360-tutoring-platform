# MVP-SALES-PILOT-HARDENING-5D - Decide auth normalization and Playwright/login E2E threshold

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-HARDENING-5D - Decide auth normalization and Playwright/login E2E threshold
```

Type:

```text
Documentation / decision / threshold-only.
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
HEAD = origin/main = origin/HEAD = d906587
```

Latest accepted commit:

```text
d906587 - MVP-SALES-PILOT-SANDBOX-0: draft closed M1-first sandbox runbook
```

Git preflight remained the live truth. Historical baselines inside documents, prompts, memory, and reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_SANDBOX_0_DRAFT_CLOSED_M1_FIRST_SANDBOX_RUNBOOK.md`
* `MVP_SALES_PILOT_DIRECTION_1A_DEFINE_M1_FIRST_CLOSED_SANDBOX_READINESS_GATE.md`
* `MVP_SALES_PILOT_HARDENING_5_CLOSE_MINIMUM_BLOCKERS_BEFORE_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5A_DEFINE_STUDENT_ACCESS_CONTAINMENT_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5B_DEFINE_SUPPORT_FAILURE_PATH_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5C_DEFINE_PARTICIPANT_DATA_AND_LANGUAGE_GUARDRAILS.md`
* `MVP_SALES_PILOT_DIRECTION_1_DECIDE_M1_FIRST_THRESHOLD_AFTER_FOUR_LOCAL_DEV_DRY_RUNS.md`
* `pro_reports/INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD.md`
* `MVP_SALES_PILOT_GO_4_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_004_EVIDENCE.md`
* `MVP_SALES_PILOT_DRY_RUN_4A_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_004.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context interpretation:

* M1-first local/dev functional confidence is achieved only for first StudyLoad happy path and second pending-load continuity.
* Closed sandbox readiness is not met and sandbox execution is not authorized.
* SANDBOX-0 drafted a runbook and required HARDENING-5D completion or explicit later waiver before any execution authorization.
* Auth normalization and Playwright/login E2E remain debts; neither has been fully resolved or implemented.
* This phase decides threshold only. It does not implement auth, run Playwright, execute UI, or authorize sandbox.

## 4. Decision Inherited From SANDBOX-0

Inherited decision:

```text
CLOSED_M1_FIRST_SANDBOX_RUNBOOK_DRAFTED_NOT_AUTHORIZED_FOR_EXECUTION
```

Inherited dependency:

```text
HARDENING-5D SHOULD OCCUR BEFORE ANY SANDBOX EXECUTION AUTHORIZATION, UNLESS A LATER AUTHORIZATION PHASE GRANTS AN EXPLICIT TINY-HUMAN-GUIDED WAIVER.
```

This phase satisfies the decision dependency by defining the threshold and waiver policy. It does not authorize execution.

## 5. Purpose Of Auth / E2E Threshold Decision

Purpose:

```text
Decide whether auth normalization and Playwright/login E2E are blockers before a future tiny closed M1-first sandbox, or whether they can be temporarily waived under strict human-guided conditions.
```

The decision must preserve the distinction between:

* tiny closed M1-first sandbox;
* repeated or expanded sandbox;
* staging;
* broader closed pilot;
* Sales-Ready/public.

## 6. Auth Normalization Debt Assessment

Known evidence:

* `PILOT_M1_002` exposed an auth/account linkage mismatch tied to email normalization.
* The specific participant linkage was repaired.
* Later local/dev M1-first runs passed with controlled synthetic identities and private credentials.
* No document declares robust complete auth readiness.
* No auth code is changed in this phase.

Risk:

* a controlled email may link to the wrong account;
* a participant may login but not see the expected student state;
* `/now` may show wrong or missing StudyLoad;
* admin/tutor evidence may attach to the wrong identity;
* support may not know whether the issue is credential, account, enrollment, or normalization;
* manual fixes could tempt unauthorized DB/auth intervention.

Tiny-sandbox mitigation:

* use only canonical controlled emails;
* prefer synthetic/internal controlled participants;
* confirm participant is allowlisted before login;
* require visible logout before switching accounts;
* verify expected participant identity and `PAES_M1` state immediately after login;
* pause on any mismatch;
* prohibit code/auth/DB repair inside sandbox support.

Auth normalization becomes technically mandatory before:

* known external participants beyond a later explicit waiver;
* more than tiny participant count;
* repeated sandbox without human-guided identity control;
* signup self-serve;
* enrollment self-serve;
* staging with external users;
* broader closed pilot;
* payment, trial, or subscription;
* Sales-Ready/public;
* any situation where wrong-account access could expose unauthorized loads or evidence.

## 7. Playwright / Login E2E Debt Assessment

Known evidence:

* prior M1-first dry-runs were human-guided, not automated.
* `PLAYWRIGHT_LOGIN_E2E_DEBT` remains open.
* `CODEX_BROWSER_UI_AVAILABILITY_LIMITATION` remains relevant.
* No login E2E implementation or successful automated regression is declared.
* No Playwright is run, created, or modified in this phase.

Risk:

* login regressions may only be detected during human execution;
* session switching may regress without automated coverage;
* `/now` authenticated state may fail under conditions not covered by manual reports;
* repeated runs may drift into manual dependency;
* broader pilot or staging could start without automated login confidence.

Tiny-sandbox mitigation:

* use manual smoke checklist;
* require human-guided operation by Mauricio with ChatGPT/Codex using the runbook;
* limit to 1-2 synthetic/internal controlled participants;
* pause on any auth/session deviation;
* record login success/failure and identity state without sensitive data;
* keep Playwright/login E2E blocking for staging, broader pilot, non-human-guided repetition, or public/commercial flows.

## 8. Layered Threshold Classification

| Layer | Auth normalization threshold | Playwright/login E2E threshold |
|---|---|---|
| A. Local/dev dry-runs | Not blocking after specific linkage repair, because identities were synthetic/control-only and human-guided; debt remains. | Not blocking because dry-runs were explicitly human-guided; automation debt remains. |
| B. Tiny closed M1-first sandbox human-guided | Waiver allowed only with canonical controlled email, allowlist, private credential, logout discipline, and immediate stop on mismatch. | Waiver allowed only with manual smoke checklist, human guidance, and stop rules. |
| C. Repeated sandbox / more than tiny sandbox | Becomes blocker when participant count expands, external identities enter, or identity control is no longer fully manual. | Becomes blocker when runs repeat, operator load increases, or non-human-guided confidence is needed. |
| D. Staging | Blocker for staging with external users or any staging-readiness claim. Internal smoke with fixtures may need explicit waiver. | Blocker before staging readiness or staging with external users unless a later phase gives narrow waiver. |
| E. Broader closed pilot | Blocker. Requires deterministic account/email handling and support traceability. | Blocker. Requires automated or otherwise strongly repeatable login/session regression coverage. |
| F. Sales-Ready/public | Hard blocker. Public/commercial users require robust account linkage and access identity. | Hard blocker. Public/commercial operation requires repeatable login/session regression confidence. |

## 9. Waiver Decision

Decision:

```text
AUTH_AND_PLAYWRIGHT_WAIVER_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
```

Interpretation:

* Auth normalization is not a blocker for one future tiny, human-guided, non-public, non-commercial, `PAES_M1`-only sandbox if the waiver conditions are met.
* Playwright/login E2E is not a blocker for that same tiny sandbox if the manual smoke checklist and stop rules are accepted.
* This decision does not authorize sandbox execution.
* This decision does not declare current sandbox readiness.
* This decision does not resolve auth normalization.
* This decision does not implement Playwright/login E2E.

## 10. Waiver Conditions

Waiver name:

```text
AUTH_AND_PLAYWRIGHT_TEMPORARY_WAIVER_FOR_TINY_HUMAN_GUIDED_M1_FIRST_SANDBOX
```

Scope:

```text
Only one future tiny closed M1-first sandbox authorization phase.
```

Required conditions:

* sandbox is tiny;
* human-guided;
* non-public;
* non-commercial;
* `PAES_M1` only;
* allowlist-controlled;
* participants are synthetic/internal controlled only unless a later authorization phase explicitly allows a known controlled external participant;
* each participant uses canonical controlled email only;
* private credential handling is confirmed without printing values;
* no signup self-serve;
* no enrollment self-serve;
* no payment, trial, or subscription;
* no M2 or L1;
* logout is required before switching user;
* ChatGPT/Codex guides only through the runbook;
* login success/failure and visible participant identity are recorded safely;
* any auth/session mismatch activates the support/failure path;
* any need for code/auth change stops the run;
* any need for manual DB mutation stops the run;
* waiver is explicitly recorded in the later sandbox authorization phase.

Waiver expiry:

```text
The waiver expires before staging, broader closed pilot, external users beyond later explicit authorization, payment/trial/subscription, M2/L1, self-serve signup/enrollment, repeated non-human-guided sandbox, or Sales-Ready/public.
```

Owner:

```text
Bexauri / Mauricio.
```

## 11. Manual Smoke Checklist

If Playwright/login E2E is waived, the later sandbox authorization/execution protocol must include this manual smoke checklist.

Do not execute this checklist in this phase.

Checklist:

1. Baseline Git is clean and versioned.
2. Target/server is identified and confirmed safe.
3. Target is not production.
4. Participant is allowlisted.
5. Controlled email is canonical.
6. Credential is private and ready.
7. Logout works before switching user.
8. Login page loads.
9. Login with allowlisted participant succeeds.
10. Visible identity/state matches the allowlist.
11. `/now` loads.
12. `/now` shows `PAES_M1` only for the sandbox scope.
13. Expected StudyLoad appears.
14. No unauthorized loads appear.
15. Admin/tutor can inspect evidence read-only after the run.
16. Logout works after the run.
17. No secrets or sensitive data are exposed.
18. Stop if anything deviates.

## 12. Stop Rules

Stop immediately if:

* participant is not allowlisted;
* email/account identity does not match expected participant;
* wrong user appears;
* wrong program appears;
* `/now` shows non-`PAES_M1` scope;
* unauthorized load appears;
* session is stuck or cannot switch safely;
* logout fails in a way that affects identity safety;
* login requires code/auth change;
* any repair would require manual DB mutation;
* credential, token, cookie, header, request body, response body, env value, DB URL, password, hash, provider value, or storage value appears or is needed;
* Playwright/login E2E becomes necessary to understand the failure during the run;
* public, commercial, payment, trial, subscription, M2, L1, staging-ready, Sales-Ready, or MVP-Beta-complete scope appears.

Any stop must be documented as a sanitized incident and routed through HARDENING-5B support/failure path.

## 13. Relationship With Support / Failure Path

HARDENING-5B governs all auth/session and E2E-related failures.

Implications:

* auth/session failure pauses the run;
* mismatch of email/account identity pauses the run;
* wrong account or wrong program pauses the run;
* manual DB repair is prohibited;
* code/auth repair is prohibited inside sandbox support;
* unsafe evidence is not copied;
* repeated failure opens a later technical phase;
* incidents must be sanitized and compact.

## 14. What Remains Blocked

Still blocked until auth normalization and/or Playwright/login E2E are resolved or separately waived by a later phase:

* sandbox execution authorization;
* staging readiness;
* staging with external users;
* broader closed pilot;
* repeated or non-human-guided sandbox;
* public users;
* uncontrolled external users;
* self-serve signup;
* self-serve enrollment;
* payment, trial, or subscription;
* M2/L1 activation;
* broader cohort operations;
* Sales-Ready/public;
* robust complete auth readiness declaration;
* Playwright/login E2E implemented declaration.

Also still required before sandbox execution:

* a private approved allowlist or allowlist template process;
* a separate sandbox execution readiness authorization phase;
* no-secrets credential custody;
* runbook-based support owner and stop criteria.

## 15. Non-Declarations

This phase does not declare:

* sandbox execution authorized;
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
* StudentAccess lifecycle implemented;
* Playwright/login E2E implemented;
* auth normalization fully resolved.

## 16. Explicit Non-Actions

This phase did not:

* implement;
* execute UI;
* run Playwright;
* create tests;
* modify tests;
* touch auth;
* touch CredentialsProvider;
* touch app code;
* touch schema;
* touch seed;
* mutate DB;
* create participants;
* create students;
* create User or Account;
* create Enrollment, LearningCycle, or StudyLoad;
* create or modify StudentAccess rows;
* touch StudentAccess lifecycle;
* start loads;
* close cycles;
* create CycleDecision;
* create CycleEvaluation;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging;
* touch production;
* create sandbox real;
* recruit participants;
* send communications;
* write commercial materials;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values.

## 17. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0A - Define sandbox allowlist template
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5A/5B/5C, SANDBOX-0 runbook, and this 5D waiver threshold.
* What it advances: defines the private allowlist template/process needed before a later SANDBOX-1 execution readiness authorization.
* What it does not advance: sandbox execution, participant creation, credential creation, DB mutation, auth implementation, Playwright implementation, staging, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_DOCUMENTATION_PHASE_ALLOWLIST_TEMPLATE_BEFORE_SANDBOX_AUTHORIZATION`
* Authorization status: requires separate explicit authorization before execution.

`MVP-SALES-PILOT-SANDBOX-1 - Review and authorize closed M1-first sandbox execution readiness` should come only after the allowlist template/process is defined or explicitly waived.

## 18. Final Verdict

Final verdict:

```text
AUTH_AND_PLAYWRIGHT_WAIVER_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
```

Auth normalization and Playwright/login E2E are not blockers for one future tiny, human-guided, non-public, non-commercial, `PAES_M1`-only sandbox if the strict waiver conditions, manual smoke checklist, and HARDENING-5B stop rules are accepted in a later authorization phase. They remain blockers before staging, broader closed pilot, repeated or non-human-guided sandbox, external/public/commercial users, payment/trial/subscription, M2/L1, and Sales-Ready/public. Sandbox execution remains unauthorized.

## Result Marker

```text
MVP_SALES_PILOT_HARDENING_5D_AUTH_AND_PLAYWRIGHT_WAIVER_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
```
