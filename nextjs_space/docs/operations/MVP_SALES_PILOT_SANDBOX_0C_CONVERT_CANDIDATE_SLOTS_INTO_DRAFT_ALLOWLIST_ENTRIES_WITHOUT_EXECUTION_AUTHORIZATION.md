# MVP-SALES-PILOT-SANDBOX-0C - Convert candidate slots into draft allowlist entries without execution authorization

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-SANDBOX-0C - Convert candidate slots into draft allowlist entries without execution authorization
```

Type:

```text
Documentation / governance / draft-allowlist-only.
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
HEAD = origin/main = origin/HEAD = 02fcccb
```

Latest accepted commit:

```text
02fcccb - MVP-SALES-PILOT-SANDBOX-0B: define initial sandbox participant candidates
```

Git preflight remained the live truth. Historical baselines inside documents, prompts, memory, and reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_SANDBOX_0B_DEFINE_INITIAL_SANDBOX_PARTICIPANT_CANDIDATES_WITHOUT_EXECUTION_AUTHORIZATION.md`
* `MVP_SALES_PILOT_SANDBOX_0A_DEFINE_SANDBOX_ALLOWLIST_TEMPLATE.md`
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

* DIRECTION-1 closed with `HYBRID_DIRECTION_WITH_PHASED_GATES`.
* DIRECTION-1A closed with `M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET`.
* HARDENING-5A allowed StudentAccess containment only for a tiny, human-guided, non-public, non-commercial, `PAES_M1`-only sandbox with strict limits.
* HARDENING-5B defined pause-first support and failure handling.
* HARDENING-5C defined participant, data, and language guardrails with external participants conditioned.
* SANDBOX-0 drafted the runbook but did not authorize execution.
* HARDENING-5D allowed an auth and Playwright waiver only under strict limits and only after later authorization.
* SANDBOX-0A defined an allowlist template but did not populate it.
* SANDBOX-0B defined conceptual candidate slots but did not create participants, fixtures, credentials, or execution authorization.

## 4. Decision Inherited From SANDBOX-0B

Inherited decision:

```text
INITIAL_SANDBOX_PARTICIPANT_CANDIDATE_SLOTS_DEFINED_NOT_AUTHORIZED
```

Inherited candidate slots:

1. `SANDBOX_M1_SYNTH_001`: first recommended synthetic slot.
2. `SANDBOX_M1_INTERNAL_001`: optional internal controlled slot.
3. `SANDBOX_M1_EXTERNAL_CONDITIONED_001`: deferred known controlled external option.

Public/uncontrolled external participants and minors remain blocked.

## 5. Purpose Of Draft Allowlist Entries

Purpose:

```text
Convert conceptual candidate slots into documentary draft allowlist entries that can be reviewed later without creating runtime permissions or execution approval.
```

This phase creates a bridge between candidate slots and a possible future allowlist review. It keeps every entry non-operational.

## 6. What Draft Allowlist Entries Are

Draft allowlist entries are:

* documentary planning artifacts;
* structured against the SANDBOX-0A allowlist template;
* useful for comparing candidate slots before any fixture, credential, or execution decision;
* placeholders for later review by a separate authorization phase;
* bounded by StudentAccess containment, support/failure path, participant/data/language guardrails, and auth/Playwright waiver rules.

## 7. What Draft Allowlist Entries Are Not

Draft allowlist entries are not:

* real participants;
* real students;
* User or Account creation;
* Enrollment, LearningCycle, StudyLoad, StudentAccess, CycleDecision, or CycleEvaluation creation;
* runtime permissions;
* a DB table;
* implemented allowlist rows;
* fixture preparation approval;
* credential readiness approval;
* execution authorization;
* sandbox readiness;
* staging readiness;
* commercial authorization.

## 8. Conversion Policy

Conversion policy:

1. Convert only the three SANDBOX-0B candidate slots.
2. Use placeholder or non-operational identity values only.
3. Preserve `PAES_M1` as the only allowed program.
4. Keep every action inactive until later authorization.
5. Keep every fixture unprepared.
6. Keep every credential not needed yet.
7. Keep every execution approval as `not_authorized`.
8. Keep the auth/Playwright waiver potential only; it is not active in this phase.
9. Preserve synthetic-first recommendation.
10. Defer external conditioned participation until a later explicit authorization phase.

## 9. Draft Entry Field Model

Every draft entry must include:

* `participant_code`
* `participant_type`
* `controlled_email_placeholder`
* `program_allowed`
* `initial_studyload_expected`
* `expected_content_key`
* `support_owner_role`
* `credential_status`
* `run_status`
* `fixture_status`
* `approval_status`
* `execution_approval_status`
* `allowed_actions_inactive_until_authorized`
* `forbidden_actions`
* `stop_conditions`
* `evidence_required`
* `data_scope`
* `communication_scope`
* `waiver_applies`
* `waiver_expiry_triggers`
* `blockers_before_fixture_prep`
* `blockers_before_credential_readiness`
* `blockers_before_execution`
* `notes_sanitized`

Shared allowed actions, inactive until later authorization:

```text
login
view_now
start_initial_studyload
submit_mc
self_report
complete_activity
view_admin_evidence
no_second_load_start
```

Shared forbidden actions:

```text
start_second_load unless later protocol allows it
access_M2_L1
payment_trial_subscription
self_signup
self_enrollment
change_credentials_in_chat
share_secret
public_or_commercial_claims
use_real_sensitive_data
bypass_allowlist
manual_DB_repair
create_improvised_account
create_improvised_studyload
create_decision_or_evaluation
```

Shared stop conditions:

```text
wrong_user
wrong_program
not_allowlisted
auth_mismatch
sensitive_data_exposed
unexpected_load
evidence_missing
evidence_duplicate
cycle_closed_unexpectedly
decision_or_evaluation_unexpected
payment_or_subscription_surface
M2_L1_surface
public_or_commercial_scope
staging_or_production_suspicion
Git_baseline_divergence
secret_printed
participant_minor_or_guardian_issue
external_participant_not_explicitly_authorized
```

Shared evidence required if a later authorized run occurs:

```text
/now visible
StudyLoad visible
MC submitted
self-report
admin evidence
continuity pending
no second load started
no unexpected decisions/evaluations
incident log if failure path activates
```

## 10. Draft Entry: SANDBOX_M1_SYNTH_001

Draft entry:

| Field | Value |
|---|---|
| `participant_code` | `SANDBOX_M1_SYNTH_001` |
| `participant_type` | `synthetic` |
| `controlled_email_placeholder` | `sandbox_m1_synth_001@example.invalid` |
| `program_allowed` | `PAES_M1` |
| `initial_studyload_expected` | `PAES M1 - Entrada balanceada inicial` |
| `expected_content_key` | `paes_m1_balanced_entry_initial` |
| `support_owner_role` | `sandbox_operator` |
| `credential_status` | `not_needed_yet` |
| `run_status` | `proposed` |
| `fixture_status` | `not_prepared` |
| `approval_status` | `draft` |
| `execution_approval_status` | `not_authorized` |
| `allowed_actions_inactive_until_authorized` | `login`, `view_now`, `start_initial_studyload`, `submit_mc`, `self_report`, `complete_activity`, `view_admin_evidence`, `no_second_load_start` |
| `forbidden_actions` | shared forbidden actions |
| `stop_conditions` | shared stop conditions |
| `evidence_required` | shared evidence required |
| `data_scope` | `synthetic_only` |
| `communication_scope` | `no_public_claims`, `no_commercial_claims`, `no_PAES_score_claims`, `no_subscription_claims`, `M1_first_only` |
| `waiver_applies` | `potential_only_not_active_until_authorized` |
| `waiver_expiry_triggers` | shared waiver expiry triggers |
| `blockers_before_fixture_prep` | later approval for fixture prep; baseline confirmation; fixture scope confirmation; no real data |
| `blockers_before_credential_readiness` | fixture prep approval; private credential handling decision; no secret exposure protocol |
| `blockers_before_execution` | explicit `approved_for_execution`; manual smoke accepted; support owner confirmed; runbook accepted; failure path active |
| `notes_sanitized` | Recommended first draft entry for review because it uses no real personal data. |

Recommendation:

```text
PREFERRED_FIRST_REVIEW_ENTRY
```

This entry is the safest first draft because it preserves synthetic-only data and avoids external, commercial, legal, or minor-participant risks.

## 11. Draft Entry: SANDBOX_M1_INTERNAL_001

Draft entry:

| Field | Value |
|---|---|
| `participant_code` | `SANDBOX_M1_INTERNAL_001` |
| `participant_type` | `internal_controlled` |
| `controlled_email_placeholder` | `sandbox_m1_internal_001@example.invalid` |
| `program_allowed` | `PAES_M1` |
| `initial_studyload_expected` | `PAES M1 - Entrada balanceada inicial` |
| `expected_content_key` | `paes_m1_balanced_entry_initial` |
| `support_owner_role` | `sandbox_operator` |
| `credential_status` | `not_needed_yet` |
| `run_status` | `deferred` |
| `fixture_status` | `not_prepared` |
| `approval_status` | `draft` |
| `execution_approval_status` | `not_authorized` |
| `allowed_actions_inactive_until_authorized` | `login`, `view_now`, `start_initial_studyload`, `submit_mc`, `self_report`, `complete_activity`, `view_admin_evidence`, `no_second_load_start` |
| `forbidden_actions` | shared forbidden actions |
| `stop_conditions` | shared stop conditions |
| `evidence_required` | shared evidence required |
| `data_scope` | `minimal_controlled` |
| `communication_scope` | `no_public_claims`, `no_commercial_claims`, `no_PAES_score_claims`, `no_subscription_claims`, `M1_first_only` |
| `waiver_applies` | `potential_only_not_active_until_authorized` |
| `waiver_expiry_triggers` | shared waiver expiry triggers |
| `blockers_before_fixture_prep` | internal participant category review; controlled identity decision; consent/understanding note; data scope confirmation |
| `blockers_before_credential_readiness` | fixture prep approval; private credential handling decision; no credential in chat; support owner confirmed |
| `blockers_before_execution` | explicit `approved_for_execution`; internal identity confirmed outside repo; operational consent confirmed; manual smoke accepted; support/failure path active |
| `notes_sanitized` | Optional second draft entry. No real internal person is named or contacted by this phase. |

Recommendation:

```text
OPTIONAL_SECOND_REVIEW_ENTRY_DEFERRED_UNTIL_NEED_IS_CONFIRMED
```

This entry may be useful after the synthetic slot if the team needs human-guided internal operation evidence. It is not recommended as the first execution entry while a synthetic review remains available.

## 12. Draft Entry: SANDBOX_M1_EXTERNAL_CONDITIONED_001

Draft entry:

| Field | Value |
|---|---|
| `participant_code` | `SANDBOX_M1_EXTERNAL_CONDITIONED_001` |
| `participant_type` | `known_controlled_external_conditioned` |
| `controlled_email_placeholder` | `none_placeholder_only` |
| `program_allowed` | `PAES_M1` |
| `initial_studyload_expected` | `PAES M1 - Entrada balanceada inicial` |
| `expected_content_key` | `paes_m1_balanced_entry_initial` |
| `support_owner_role` | `sandbox_operator` |
| `credential_status` | `not_needed_yet` |
| `run_status` | `deferred` |
| `fixture_status` | `not_prepared` |
| `approval_status` | `blocked_pending_authorization` |
| `execution_approval_status` | `not_authorized` |
| `allowed_actions_inactive_until_authorized` | `login`, `view_now`, `start_initial_studyload`, `submit_mc`, `self_report`, `complete_activity`, `view_admin_evidence`, `no_second_load_start` |
| `forbidden_actions` | shared forbidden actions |
| `stop_conditions` | shared stop conditions |
| `evidence_required` | shared evidence required |
| `data_scope` | `external_conditioned` |
| `communication_scope` | `no_public_claims`, `no_commercial_claims`, `no_PAES_score_claims`, `no_subscription_claims`, `M1_first_only` |
| `waiver_applies` | `potential_only_not_active_until_authorized` |
| `waiver_expiry_triggers` | shared waiver expiry triggers |
| `blockers_before_fixture_prep` | explicit later authorization; external eligibility review; no minor/guardian issue; data policy confirmation; communication boundary |
| `blockers_before_credential_readiness` | fixture prep approval; controlled email selected outside repo; private credential handling; consent/basic acknowledgment; support owner confirmed |
| `blockers_before_execution` | explicit later authorization; communication minimum; consent/basic acknowledgment; data policy; support owner; no commercial expectation; real allowlist approval; manual smoke accepted |
| `notes_sanitized` | Deferred future option only. Not recommended for first execution and contains no real person, email, or contact. |

Recommendation:

```text
DEFERRED_NOT_FOR_FIRST_EXECUTION
```

This entry preserves the future option for a known controlled external participant but keeps it blocked until a later phase explicitly authorizes external participation.

## 13. Entry Comparison / Recommendation

| Draft entry | Status | First sandbox recommendation | Reason |
|---|---|---|---|
| `SANDBOX_M1_SYNTH_001` | draft / proposed / not authorized | Preferred first review entry | Lowest data, legal, support, and communication risk. |
| `SANDBOX_M1_INTERNAL_001` | draft / deferred / not authorized | Optional second entry | Useful only if human-guided internal operation evidence is needed after synthetic review. |
| `SANDBOX_M1_EXTERNAL_CONDITIONED_001` | blocked pending authorization / deferred / not authorized | Not for first execution | Requires later external authorization, communication, consent, data, support, and no-minor checks. |

Recommended first execution candidate pool remains:

```text
synthetic first
optional internal controlled second
external conditioned deferred
```

No entry is executable in this phase.

## 14. Authorization Boundary

Authorization boundary:

* Draft allowlist entries do not authorize execution.
* Draft allowlist entries do not authorize fixture prep.
* Draft allowlist entries do not authorize credential readiness.
* Draft allowlist entries are not operational runtime permissions.
* A later phase must approve any transition to `approved_for_fixture_prep`.
* A later phase must approve any transition to `approved_for_credential_readiness`.
* A later phase must approve any transition to `approved_for_execution`.
* `approved_for_execution` remains false / `not_authorized` for every entry in this phase.
* Any attempt to execute from a draft entry must pause and open an authorization phase.

## 15. Relationship With StudentAccess Containment

These draft entries are part of temporary access authority only after later authorization.

Until then:

* they are documentary planning artifacts only;
* they do not replace StudentAccess;
* they do not implement StudentAccess lifecycle;
* they do not grant access;
* they do not define broader access architecture.

StudentAccess lifecycle remains required before broader closed pilot, staging with users beyond explicitly authorized tiny sandbox conditions, Sales-Ready/public, payment/trial/subscription, M2/L1, self-serve signup/enrollment, cohorts, audit, expiration, or any risk of unauthorized loads.

## 16. Relationship With Support / Failure Path

Any inconsistency between a draft entry and an actual attempted participant activates the HARDENING-5B support/failure path.

Pause if:

* a participant is not represented by a later authorized allowlist entry;
* a real participant is substituted for a draft placeholder;
* email or identity does not match the later approved entry;
* program is not `PAES_M1`;
* approval status is not explicit;
* run status is paused, aborted, revoked, or otherwise non-runnable;
* allowed actions are exceeded;
* a stop condition activates;
* execution is attempted without `approved_for_execution`.

No support action may repair the problem by DB mutation, auth changes, app code changes, improvised account creation, improvised StudyLoad creation, credential sharing, or evidence deletion.

## 17. Relationship With Participant / Data / Language Guardrails

Guardrail linkage:

* first sandbox should start with the synthetic slot;
* internal controlled slot remains optional and unnamed;
* external conditioned slot remains deferred;
* public/uncontrolled participants remain blocked;
* minors remain blocked pending explicit legal/guardian/data policy;
* no commercial language is permitted;
* no public-readiness language is permitted;
* no PAES diagnosis, prediction, score, autonomous adaptation, or autonomous tutor claim is permitted;
* no payment, trial, or subscription claim is permitted.

## 18. Waiver Linkage

Waiver reference:

```text
AUTH_AND_PLAYWRIGHT_TEMPORARY_WAIVER_FOR_TINY_HUMAN_GUIDED_M1_FIRST_SANDBOX
```

Waiver status in this phase:

```text
POTENTIAL_ONLY_NOT_ACTIVE_UNTIL_LATER_AUTHORIZATION
```

The waiver can apply later only if the authorization phase confirms:

* tiny sandbox scope;
* human-guided operation;
* non-public and non-commercial boundary;
* `PAES_M1` only;
* allowed participant type;
* controlled canonical identity;
* private credential custody;
* logout discipline;
* immediate identity check;
* manual smoke checklist;
* support/failure path;
* no external participant beyond explicit later authorization.

Waiver expiry triggers:

```text
staging
broader_pilot
external_users_beyond_explicit_authorization
payment_trial_subscription
M2_L1
self_serve
repeated_non_human_guided
Sales_Ready_public
```

## 19. Missing Requirements Before Fixture Prep

Missing before fixture prep:

* later authorization to move a selected draft entry to `approved_for_fixture_prep`;
* confirmed baseline and target boundary;
* selected entry decision;
* fixture scope and expected StudyLoad confirmed;
* controlled identity policy confirmed;
* support owner confirmed;
* data guardrails accepted;
* no real sensitive data;
* no public/commercial scope.

For the external conditioned entry, also missing:

* explicit external participation authorization;
* communication minimum;
* consent/basic acknowledgment boundary;
* no minor/guardian issue;
* external data policy confirmation.

## 20. Missing Requirements Before Credential Readiness

Missing before credential readiness:

* later authorization to move a selected entry to `approved_for_credential_readiness`;
* fixture prep completed in a separately authorized phase;
* private credential handling protocol confirmed;
* no credentials in chat or docs;
* support owner available;
* logout and identity-check discipline accepted;
* waiver applicability reviewed.

No credential is created, rotated, stored, exposed, or verified in this phase.

## 21. Missing Requirements Before Execution Authorization

Missing before execution authorization:

* later authorization to set `approved_for_execution`;
* SANDBOX-0 runbook accepted for execution;
* selected allowlist entry approved;
* fixture prepared in an authorized phase;
* credential privately ready in an authorized phase;
* manual smoke checklist accepted or executed in the later authorization context;
* auth/Playwright waiver recorded if used;
* StudentAccess containment waiver recorded if used;
* support/failure path active;
* data/language guardrails active;
* pause/abort criteria accepted;
* compact report requirement accepted;
* no staging/production ambiguity;
* no payment/trial/subscription;
* no M2/L1;
* no public/commercial claim.

## 22. Non-Declarations

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
* real participants recruited;
* real allowlist populated;
* fixture prep approved;
* credential readiness approved;
* execution approved.

## 23. Explicit Non-Actions

This phase did not:

* implement;
* execute UI;
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
* touch Playwright;
* create tests;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging;
* touch production;
* create sandbox real;
* recruit participants;
* contact participants;
* send communications;
* create commercial material;
* populate operational allowlist;
* approve execution;
* create credentials;
* prepare fixture;
* convert any draft allowlist entry into an executable participant;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values;
* include real personal data, legal names, phone numbers, official IDs, addresses, sensitive school data, or minor information.

## 24. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0D - Define sandbox execution authorization checklist
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5A/5B/5C, SANDBOX-0, HARDENING-5D, SANDBOX-0A allowlist template, SANDBOX-0B candidate slots, and these draft allowlist entries.
* What it advances: defines the exact checklist required before any selected draft entry can move toward fixture prep, credential readiness, or execution authorization.
* What it does not advance: sandbox execution, credential creation, DB mutation, participant creation, fixture preparation, auth implementation, Playwright implementation, staging, broader pilot, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_DOCUMENTATION_PHASE_SANDBOX_EXECUTION_AUTHORIZATION_CHECKLIST`.
* Authorization status: requires separate explicit authorization before execution.

## 25. Final Verdict

Final verdict:

```text
DRAFT_ALLOWLIST_ENTRIES_DEFINED_NOT_AUTHORIZED_FOR_EXECUTION
```

The three SANDBOX-0B candidate slots have been converted into documentary draft allowlist entries. The synthetic entry is preferred for first review, the internal entry remains optional and deferred, and the external conditioned entry remains blocked pending later explicit authorization. No draft entry authorizes fixture prep, credential readiness, runtime access, or sandbox execution.

## Result Marker

```text
MVP_SALES_PILOT_SANDBOX_0C_DRAFT_ALLOWLIST_ENTRIES_DEFINED_NOT_AUTHORIZED_FOR_EXECUTION
```
