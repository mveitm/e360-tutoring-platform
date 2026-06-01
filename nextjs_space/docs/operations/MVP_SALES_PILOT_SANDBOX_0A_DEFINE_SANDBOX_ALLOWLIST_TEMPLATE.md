# MVP-SALES-PILOT-SANDBOX-0A - Define sandbox allowlist template

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-SANDBOX-0A - Define sandbox allowlist template
```

Type:

```text
Documentation / governance / allowlist-template-only.
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
HEAD = origin/main = origin/HEAD = 7601858
```

Latest accepted commit:

```text
7601858 - MVP-SALES-PILOT-HARDENING-5D: decide auth and E2E threshold
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
* `MVP_SALES_PILOT_HARDENING_5D_DECIDE_AUTH_NORMALIZATION_AND_PLAYWRIGHT_LOGIN_E2E_THRESHOLD.md`
* `MVP_SALES_PILOT_DIRECTION_1A_DEFINE_M1_FIRST_CLOSED_SANDBOX_READINESS_GATE.md`
* `MVP_SALES_PILOT_HARDENING_5_CLOSE_MINIMUM_BLOCKERS_BEFORE_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5A_DEFINE_STUDENT_ACCESS_CONTAINMENT_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5B_DEFINE_SUPPORT_FAILURE_PATH_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5C_DEFINE_PARTICIPANT_DATA_AND_LANGUAGE_GUARDRAILS.md`
* `MVP_SALES_PILOT_DIRECTION_1_DECIDE_M1_FIRST_THRESHOLD_AFTER_FOUR_LOCAL_DEV_DRY_RUNS.md`
* `pro_reports/INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD.md`
* `MVP_SALES_PILOT_GO_4_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_004_EVIDENCE.md`
* `PHASE_LOG.md` tail

Context interpretation:

* DIRECTION-1 selected `HYBRID_DIRECTION_WITH_PHASED_GATES`.
* DIRECTION-1A defined the gate and kept M1-first closed sandbox readiness not yet met.
* HARDENING-5 sequenced minimum blockers and placed allowlist/runbook authority before execution.
* HARDENING-5A allowed StudentAccess containment only for a tiny human-guided M1-first sandbox with strict limits.
* HARDENING-5B defined the support/failure path.
* HARDENING-5C defined participant, data, and language guardrails.
* SANDBOX-0 drafted the runbook but did not authorize execution.
* HARDENING-5D allowed a temporary auth/Playwright waiver only for a tiny human-guided sandbox under strict allowlist, identity, smoke, and stop rules.
* This phase defines the allowlist template only. It does not create, populate, or approve a real allowlist.

## 4. Decision Inherited From SANDBOX-0 And HARDENING-5D

Inherited decisions:

```text
CLOSED_M1_FIRST_SANDBOX_RUNBOOK_DRAFTED_NOT_AUTHORIZED_FOR_EXECUTION
AUTH_AND_PLAYWRIGHT_WAIVER_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
```

Waiver name inherited from HARDENING-5D:

```text
AUTH_AND_PLAYWRIGHT_TEMPORARY_WAIVER_FOR_TINY_HUMAN_GUIDED_M1_FIRST_SANDBOX
```

Implication for this phase:

```text
The allowlist template must become the operational structure that a later authorization phase can use to approve or reject specific sandbox participants without relying on StudentAccess lifecycle, auth normalization, or Playwright/login E2E as if they were already complete.
```

This phase does not grant the waiver for an actual participant. It only defines the fields required to evaluate whether that waiver could apply later.

## 5. Purpose Of The Sandbox Allowlist

Purpose:

```text
Define the private operational template that a later phase can use to control who may participate in a future tiny closed M1-first sandbox, what they may do, what evidence is expected, and when the run must stop.
```

The allowlist template exists to prevent four specific failures:

* participant ambiguity;
* access ambiguity while StudentAccess lifecycle remains unimplemented for broader use;
* auth/session ambiguity while auth normalization and Playwright/login E2E remain waived only under strict limits;
* scope creep from M1-first sandbox into broader pilot, staging, public, commercial, L1/M2, payment, trial, or subscription posture.

## 6. What The Allowlist Is

The sandbox allowlist is:

* a private operational control document for a future tiny M1-first sandbox;
* a temporary authority for participant authorization inside that sandbox only;
* a structured companion to SANDBOX-0 runbook, controlled fixture, private credential custody, support/failure path, guardrails, and auth/Playwright waiver;
* a per-participant decision record for program scope, allowed actions, forbidden actions, stop conditions, and required evidence;
* a gate artifact for a later authorization phase.

Operational authority, only if later approved:

```text
runbook + allowlist + controlled fixture + private credential custody + support/failure path + participant/data/language guardrails + auth/Playwright waiver
```

## 7. What The Allowlist Is Not

The allowlist is not:

* a StudentAccess implementation;
* a database table;
* a runtime permission check;
* a public list;
* a commercial authorization;
* a replacement for permanent access lifecycle;
* permission to create participants;
* permission to prepare credentials;
* permission to execute the sandbox;
* staging readiness;
* broader closed pilot readiness;
* Sales-Ready/public readiness;
* MVP-Beta cerrado M1/M2/L1 readiness.

## 8. Required Fields

Required field definitions:

| Field | Required meaning | Allowed / expected values | Safety rule |
|---|---|---|---|
| `participant_code` | Internal synthetic or controlled code. | Example pattern: `SANDBOX_M1_001`. | Do not use legal name unless a later policy explicitly requires it. |
| `participant_type` | Participant category. | `synthetic`, `internal_controlled`, `known_controlled_external_conditioned`, `blocked_public_external`, `blocked_minor_or_guardian_required`. | Block if type is not allowed for the current authorization phase. |
| `controlled_email` | Canonical controlled email for auth/session identity. | Synthetic or controlled email. | Do not record unnecessary real emails. Never record password. |
| `program_allowed` | Program scope. | Must be `PAES_M1`. | Any M2/L1 or other program is a stop condition. |
| `initial_studyload_expected` | Expected first StudyLoad title. | Example: `PAES M1 - Entrada balanceada inicial`. | Must match the runbook before execution. |
| `expected_content_key` | Expected content key or fixture key. | Example: `paes_m1_balanced_entry_initial`; `to_confirm` if not final. | `to_confirm` must be resolved before execution authorization. |
| `support_owner` | Human support owner during execution. | Role or controlled owner label, such as `sandbox_operator`. | Prefer role over personal data unless needed. |
| `credential_status` | Credential readiness state. | See status model. | Credential values must never be copied. |
| `run_status` | Current run lifecycle state. | See status model. | `paused`, `aborted`, `withdrawn`, `archived`, or `revoked` means do not continue. |
| `allowed_actions` | Actions permitted for this participant. | See action model. | Actions outside this set trigger pause. |
| `forbidden_actions` | Actions explicitly prohibited. | See action model. | Any forbidden action triggers support/failure path. |
| `stop_conditions` | Participant-specific stop rules. | See stop condition model. | If any appears, pause or abort. |
| `evidence_required` | Evidence required for closeout. | See evidence model. | Evidence must be sanitized. |
| `data_scope` | Data boundary. | `synthetic_only`, `minimal_controlled`, `no_sensitive_data`, `external_conditioned`, `blocked_sensitive`. | Sensitive data blocks continuation. |
| `communication_scope` | Language boundary. | `no_public_claims`, `no_commercial_claims`, `no_PAES_score_claims`, `no_subscription_claims`, `M1_first_only`. | Commercial or PAES-score language pauses. |
| `waiver_applies` | Whether the 5D auth/Playwright waiver is intended to apply. | `true` or `false`. | `true` requires all waiver conditions and later authorization. |
| `waiver_reference` | Waiver marker if applicable. | `AUTH_AND_PLAYWRIGHT_TEMPORARY_WAIVER_FOR_TINY_HUMAN_GUIDED_M1_FIRST_SANDBOX`. | Must be blank or `not_applicable` if `waiver_applies` is false. |
| `waiver_expiry_triggers` | Conditions that expire the waiver. | See waiver linkage. | If any trigger appears, waiver is invalid. |
| `approval_status` | Approval stage. | See status model. | Only `approved_for_execution` can permit a later run, and only in an authorization phase. |
| `approval_owner` | Responsible approval role/person. | Role preferred. | Avoid personal data if not needed. |
| `approval_date` | Date of approval, if any. | Blank until actual approval. | Do not backfill without later approval. |
| `notes_sanitized` | Operational notes only. | Short sanitized notes. | No secrets, passwords, tokens, sensitive data, or raw technical payloads. |

## 9. Participant Type Taxonomy

Allowed or blocked participant types:

| `participant_type` | Meaning | Current template decision |
|---|---|---|
| `synthetic` | Non-real controlled participant. | Allowed for first sandbox candidate planning if later allowlisted. |
| `internal_controlled` | Internal or trusted controlled person who understands the closed test. | Allowed for first sandbox candidate planning if later allowlisted and non-commercial. |
| `known_controlled_external_conditioned` | Real known external person invited only under strict later authorization. | Conditional only; not preferred for first tiny sandbox unless a later phase approves communication, consent, data limits, and support. |
| `blocked_public_external` | Public, unknown, uncontrolled, or self-serve user. | Blocked. |
| `blocked_minor_or_guardian_required` | Minor or school student without explicit legal/guardian/data policy. | Blocked by default. |

First sandbox recommendation:

```text
synthetic and internal_controlled only, unless a later authorization phase explicitly conditions and approves a known controlled external participant.
```

## 10. Status Model

### Credential Status

`credential_status` values:

| Value | Meaning | Execution implication |
|---|---|---|
| `not_created` | No credential exists or is known to be ready. | Cannot execute. |
| `credential_needed` | Credential readiness is required later. | Cannot execute. |
| `private_ready` | Credential is privately ready without exposure. | Still requires approval status and run authorization. |
| `rotated` | Credential was changed privately. | Requires identity check before any run. |
| `revoked` | Credential must not be used. | Cannot execute. |
| `do_not_use` | Credential or identity is blocked. | Cannot execute. |

### Run Status

`run_status` values:

| Value | Meaning | Execution implication |
|---|---|---|
| `proposed` | Candidate row only. | No execution. |
| `approved` | Candidate approved for later preparation. | No execution by itself. |
| `prepared` | Fixture/prep state ready or intended. | No execution by itself. |
| `credential_ready` | Credential privately ready. | No execution by itself. |
| `running` | Active only during a later authorized sandbox. | Not allowed in this phase. |
| `completed` | Later run completed. | Closeout required. |
| `paused` | Stop condition or review required. | Do not continue. |
| `aborted` | Run stopped. | Do not continue. |
| `withdrawn` | Candidate removed. | Do not continue. |
| `archived` | Historical record only. | Do not run. |

### Approval Status

`approval_status` values:

| Value | Meaning | Execution implication |
|---|---|---|
| `draft` | Template or candidate not reviewed. | No execution. |
| `pending_review` | Awaiting approval. | No execution. |
| `approved_for_fixture_prep` | Future fixture prep may be authorized separately. | Does not approve credential or execution. |
| `approved_for_credential_readiness` | Future private credential readiness may be authorized separately. | Does not approve execution. |
| `approved_for_execution` | A later authorization phase approves execution for this entry. | Required before a participant can run. |
| `paused` | Approval is paused. | Do not continue. |
| `revoked` | Approval withdrawn. | Do not continue. |

Separation rule:

```text
approved_for_fixture_prep, approved_for_credential_readiness, and approved_for_execution are distinct states. Execution cannot be inferred from fixture prep or credential readiness.
```

## 11. Allowed Actions And Forbidden Actions

Allowed action values:

* `login`
* `view_now`
* `start_initial_studyload`
* `submit_mc`
* `self_report`
* `complete_activity`
* `view_admin_evidence`
* `no_second_load_start`

Forbidden action values:

* `start_second_load`
* `access_M2_L1`
* `payment_trial_subscription`
* `self_signup`
* `self_enrollment`
* `change_credentials_in_chat`
* `share_secret`
* `manual_DB_repair`
* `create_improvised_account`
* `create_improvised_studyload`
* `create_decision_or_evaluation`

Rule:

```text
If an action is not explicitly allowed, the operator must pause before doing it.
```

## 12. Stop Conditions

Required stop condition values:

* `wrong_user`
* `wrong_program`
* `not_allowlisted`
* `auth_mismatch`
* `sensitive_data_exposed`
* `unexpected_load`
* `evidence_missing`
* `evidence_duplicate`
* `evidence_corrupt_or_ambiguous`
* `cycle_closed_unexpectedly`
* `decision_or_evaluation_unexpected`
* `payment_or_subscription_surface`
* `M2_L1_surface`
* `public_or_commercial_scope`
* `staging_or_production_suspicion`
* `approval_status_not_execution_ready`
* `run_status_paused_aborted_or_revoked`
* `allowed_actions_exceeded`
* `manual_DB_needed`
* `code_or_auth_change_needed`

Stop rule:

```text
Any stop condition activates HARDENING-5B support/failure path. Unauthorized access, sensitive data exposure, staging/production suspicion, or data integrity risk should abort rather than merely pause.
```

## 13. Evidence Requirements

Required evidence values:

* `/now_visible`
* `studyload_visible`
* `MC_submitted`
* `self_report`
* `admin_evidence`
* `continuity_pending`
* `no_second_load_started`
* `no_unexpected_decisions_evaluations`
* `logout_observed`
* `identity_checked`
* `incident_summary_if_any`

Evidence rule:

```text
Evidence must be minimal, sanitized, and operational. It must not include passwords, hashes, tokens, cookies, env values, DB URLs, headers, request bodies, response bodies, provider values, storage values, official IDs, sensitive personal data, unnecessary screenshots, or third-party data.
```

## 14. Data And Communication Scope

Data scope values:

| Value | Meaning |
|---|---|
| `synthetic_only` | Use only synthetic identity/data. |
| `minimal_controlled` | Use the minimum controlled operational data. |
| `no_sensitive_data` | No sensitive or unnecessary personal data. |
| `external_conditioned` | External participant data allowed only if later explicitly conditioned. |
| `blocked_sensitive` | Sensitive-data case; cannot proceed. |

Communication scope values:

| Value | Meaning |
|---|---|
| `no_public_claims` | No public availability claim. |
| `no_commercial_claims` | No sale, paid plan, trial, or subscription claim. |
| `no_PAES_score_claims` | No score, prediction, diagnosis, guarantee, or full PAES claim. |
| `no_subscription_claims` | No active subscription or payment posture. |
| `M1_first_only` | Only limited M1-first validation language is allowed. |

Allowed short language remains bounded to:

* `prueba controlada`;
* `sandbox cerrado M1-first`;
* `actividad de Matematica M1`;
* `no publico`;
* `sin pago, trial ni suscripcion`;
* `no representa diagnostico PAES completo`;
* `validacion limitada del flujo M1`;
* `M1-first es una vertical tactica dentro del camino hacia MVP-Beta cerrado M1/M2/L1`.

## 15. Waiver Linkage

The auth/Playwright waiver applies only if the allowlist confirms all of these:

* participant type is allowed;
* controlled email is canonical;
* program is `PAES_M1`;
* sandbox is tiny;
* operation is human-guided;
* credential is privately ready without exposure;
* approval status is explicit;
* manual smoke checklist is accepted in the later authorization phase;
* logout discipline is required;
* identity check is required immediately after login;
* stop rules are present.

Waiver reference:

```text
AUTH_AND_PLAYWRIGHT_TEMPORARY_WAIVER_FOR_TINY_HUMAN_GUIDED_M1_FIRST_SANDBOX
```

Waiver expiry triggers:

* `staging`
* `broader_pilot`
* `external_users_beyond_explicit_authorization`
* `payment_trial_subscription`
* `M2_L1`
* `self_serve`
* `repeated_non_human_guided`
* `Sales_Ready_public`

If any expiry trigger appears, the waiver does not apply.

## 16. StudentAccess Containment Linkage

The allowlist is the temporary participant authority only inside a future tiny human-guided M1-first sandbox.

It does not replace StudentAccess lifecycle.

StudentAccess lifecycle remains required before:

* broader closed pilot;
* staging with external users;
* Sales-Ready/public;
* payment, trial, or subscription;
* M2 or L1;
* self-serve signup;
* self-serve enrollment;
* cohorts;
* access audit;
* access expiration;
* any risk that a participant may see unauthorized loads.

StudentAccess missing remains neither automatic `no_access` nor automatic `full_access`. If StudentAccess state conflicts with the allowlist/runbook or creates operational confusion, the run must pause.

## 17. Support / Failure Path Linkage

Any allowlist inconsistency activates HARDENING-5B support/failure path.

Pause or abort if:

* participant is not allowlisted;
* controlled email is wrong;
* visible user is wrong;
* program is wrong;
* approval status is not sufficient;
* run status is `paused`, `aborted`, `withdrawn`, `archived`, or `revoked`;
* allowed actions are exceeded;
* forbidden action is attempted;
* any stop condition is activated;
* sanitized evidence cannot be captured.

Support cannot resolve allowlist problems by manual DB mutation, auth changes, improvised account creation, improvised StudyLoad creation, credential sharing, or scope expansion.

## 18. Template Table

Operational allowlist template:

| Field | Value to fill later | Required before execution? | Notes |
|---|---|---|---|
| `participant_code` | Blank until candidate phase | Yes | Synthetic/control code only. |
| `participant_type` | Blank until candidate phase | Yes | Must be allowed by participant taxonomy. |
| `controlled_email` | Blank until candidate phase | Yes | Canonical controlled email; no password. |
| `program_allowed` | `PAES_M1` | Yes | Fixed for this sandbox type. |
| `initial_studyload_expected` | Blank or `to_confirm` until candidate phase | Yes | Must be resolved before execution. |
| `expected_content_key` | Blank or `to_confirm` until candidate phase | Yes | Must match fixture/runbook. |
| `support_owner` | Blank until authorization phase | Yes | Role preferred. |
| `credential_status` | `not_created` or `credential_needed` by default | Yes | `private_ready` required before execution, but not sufficient. |
| `run_status` | `proposed` by default | Yes | Cannot be paused/aborted/revoked. |
| `allowed_actions` | Template list | Yes | Must include only approved actions. |
| `forbidden_actions` | Template list | Yes | Must include no second load and no M2/L1. |
| `stop_conditions` | Template list | Yes | Must include identity, program, data, evidence, environment, and scope stops. |
| `evidence_required` | Template list | Yes | Must be sanitized. |
| `data_scope` | `synthetic_only` or `minimal_controlled` preferred | Yes | External data requires later conditioning. |
| `communication_scope` | Template list | Yes | No public/commercial/PAES score claims. |
| `waiver_applies` | `false` by default; `true` only by later authorization | Yes | If true, waiver reference is required. |
| `waiver_reference` | `not_applicable` or waiver marker | Yes if waiver applies | Must match HARDENING-5D marker. |
| `waiver_expiry_triggers` | Template list | Yes if waiver applies | Any trigger invalidates waiver. |
| `approval_status` | `draft` by default | Yes | Execution requires later `approved_for_execution`. |
| `approval_owner` | Blank until review | Yes before approval | Avoid unnecessary personal data. |
| `approval_date` | Blank until approval | No until approval | Do not prefill. |
| `notes_sanitized` | Blank or short sanitized note | No | No secrets or sensitive data. |

## 19. Conceptual YAML Example

This is a conceptual Markdown example only. It is not a real allowlist, not an executable file, not a participant approval, and not sandbox authorization.

```yaml
participant_code: SANDBOX_M1_EXAMPLE_001
participant_type: synthetic
controlled_email: sandbox_m1_example_001@bexauri.dev
program_allowed: PAES_M1
initial_studyload_expected: PAES M1 - Entrada balanceada inicial
expected_content_key: paes_m1_balanced_entry_initial
support_owner: sandbox_operator
credential_status: credential_needed
run_status: proposed
allowed_actions:
  - login
  - view_now
  - start_initial_studyload
  - submit_mc
  - self_report
  - complete_activity
  - view_admin_evidence
  - no_second_load_start
forbidden_actions:
  - start_second_load
  - access_M2_L1
  - payment_trial_subscription
  - self_signup
  - self_enrollment
  - change_credentials_in_chat
  - share_secret
stop_conditions:
  - wrong_user
  - wrong_program
  - not_allowlisted
  - auth_mismatch
  - sensitive_data_exposed
  - unexpected_load
  - evidence_missing
  - evidence_duplicate
  - cycle_closed_unexpectedly
  - decision_or_evaluation_unexpected
  - payment_or_subscription_surface
  - M2_L1_surface
  - public_or_commercial_scope
  - staging_or_production_suspicion
evidence_required:
  - /now_visible
  - studyload_visible
  - MC_submitted
  - self_report
  - admin_evidence
  - continuity_pending
  - no_second_load_started
  - no_unexpected_decisions_evaluations
data_scope:
  - synthetic_only
  - no_sensitive_data
communication_scope:
  - no_public_claims
  - no_commercial_claims
  - no_PAES_score_claims
  - no_subscription_claims
  - M1_first_only
waiver_applies: false
waiver_reference: not_applicable
waiver_expiry_triggers:
  - staging
  - broader_pilot
  - external_users_beyond_explicit_authorization
  - payment_trial_subscription
  - M2_L1
  - self_serve
  - repeated_non_human_guided
  - Sales_Ready_public
approval_status: draft
approval_owner: sandbox_authorization_owner
approval_date:
notes_sanitized: Example only. Not approved. No real participant.
```

## 20. Use In Later Authorization Phase

A later authorization phase may use this template to create a private real allowlist candidate set.

That later phase must decide:

* whether participant candidates exist;
* whether each candidate is synthetic, internal controlled, or conditionally external;
* whether any known controlled external participant has minimum communication, consent, data, and support boundaries;
* whether the auth/Playwright waiver applies;
* whether credential readiness may be prepared;
* whether execution readiness can be reviewed;
* whether `approved_for_execution` is granted.

Rules for later use:

* a row in a future allowlist does not automatically authorize execution;
* `approved_for_fixture_prep` does not authorize credentials or execution;
* `approved_for_credential_readiness` does not authorize execution;
* `approved_for_execution` requires a separate authorization phase;
* without `approved_for_execution`, the participant does not run;
* if allowlist and runbook conflict, pause;
* if allowlist and Git baseline conflict, pause;
* if participant is not allowlisted, pause.

## 21. Non-Declarations

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
* auth normalization fully resolved;
* allowlist populated;
* participant approved.

## 22. Explicit Non-Actions

This phase did not:

* implement;
* execute UI;
* run Playwright;
* create tests;
* modify tests;
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
* recruit participants;
* send communications;
* write commercial materials;
* populate an allowlist with real people;
* authorize sandbox execution;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values.

## 23. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0B - Define initial sandbox participant candidates without execution authorization
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5A/5B/5C, SANDBOX-0 runbook, HARDENING-5D waiver threshold, and this allowlist template.
* What it advances: identifies whether there are initial synthetic/internal controlled sandbox participant candidates that can be reviewed against this template without approving execution.
* What it does not advance: sandbox execution, credential creation, participant creation, DB mutation, auth implementation, Playwright implementation, staging, broader pilot, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_DOCUMENTATION_PHASE_INITIAL_SANDBOX_CANDIDATES_WITHOUT_EXECUTION_AUTHORIZATION`
* Authorization status: requires separate explicit authorization before execution.

`MVP-SALES-PILOT-SANDBOX-1 - Review and authorize closed M1-first sandbox execution readiness` should not be recommended until the team either defines candidate entries or explicitly decides that candidate definition is unnecessary before authorization review.

## 24. Final Verdict

Final verdict:

```text
SANDBOX_ALLOWLIST_TEMPLATE_DEFINED_NOT_POPULATED
```

The sandbox allowlist template is defined as a private operational authority structure for a future tiny, human-guided, non-public, non-commercial, `PAES_M1`-only sandbox. It is not populated, does not approve participants, does not implement StudentAccess, does not grant runtime permissions, does not authorize sandbox execution, and does not declare sandbox readiness.

## Result Marker

```text
MVP_SALES_PILOT_SANDBOX_0A_SANDBOX_ALLOWLIST_TEMPLATE_DEFINED_NOT_POPULATED
```
