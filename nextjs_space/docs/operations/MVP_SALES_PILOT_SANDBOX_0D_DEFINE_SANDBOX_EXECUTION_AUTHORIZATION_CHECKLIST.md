# MVP-SALES-PILOT-SANDBOX-0D - Define sandbox execution authorization checklist

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-SANDBOX-0D - Define sandbox execution authorization checklist
```

Type:

```text
Documentation / governance / execution-authorization-checklist-only.
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
HEAD = origin/main = origin/HEAD = 85e0dd7
```

Latest accepted commit:

```text
85e0dd7 - MVP-SALES-PILOT-SANDBOX-0C: draft sandbox allowlist entries
```

Git preflight remained the live truth. Historical baselines inside documents, prompts, memory, and reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_SANDBOX_0C_CONVERT_CANDIDATE_SLOTS_INTO_DRAFT_ALLOWLIST_ENTRIES_WITHOUT_EXECUTION_AUTHORIZATION.md`
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

* SANDBOX-0C converted three candidate slots into draft allowlist entries, but kept every entry non-operational.
* Draft entries do not authorize fixture prep, credential readiness, runtime access, real participant creation, real allowlist population, or execution.
* The next required artifact is a formal checklist that separates review, fixture, credential, and execution approvals.
* This phase defines the checklist only. It does not apply the checklist to any entry.

## 4. Decision Inherited From SANDBOX-0C

Inherited decision:

```text
DRAFT_ALLOWLIST_ENTRIES_DEFINED_NOT_AUTHORIZED_FOR_EXECUTION
```

Inherited draft entries:

1. `SANDBOX_M1_SYNTH_001`: preferred first draft review entry; synthetic-only; not authorized.
2. `SANDBOX_M1_INTERNAL_001`: optional/deferred internal controlled draft; not authorized.
3. `SANDBOX_M1_EXTERNAL_CONDITIONED_001`: deferred and blocked pending later authorization; not for first execution.

Inherited boundary:

```text
All entries remain execution_approval_status: not_authorized.
```

## 5. Purpose Of Execution Authorization Checklist

Purpose:

```text
Define the formal checklist a later phase must use before any draft allowlist entry can advance toward fixture prep, credential readiness, or execution.
```

The checklist creates traceability across four approvals:

A. Candidate/draft entry review approval.
B. Fixture prep approval.
C. Credential readiness approval.
D. Execution approval.

This phase does not grant any of those approvals.

## 6. Authorization Stage Model

Stage model:

| Stage | Meaning | Allowed in this phase? | Execution implication |
|---|---|---|---|
| `draft_entry` | Documentary entry created from candidate slot. | Already exists from SANDBOX-0C. | No execution. |
| `selected_for_review` | Later phase selects one draft entry for closer review. | Defined only. | No fixture, credential, or execution. |
| `approved_for_fixture_prep` | Later phase authorizes fixture preparation scope. | Defined only. | Does not authorize credentials or execution. |
| `fixture_prepared` | Later authorized phase prepared fixture. | Not allowed here. | Still no execution. |
| `approved_for_credential_readiness` | Later phase authorizes private credential readiness. | Defined only. | Does not authorize execution. |
| `credential_ready` | Credential privately ready in later phase. | Not allowed here. | Still no execution. |
| `manual_smoke_ready` | Manual smoke checklist accepted for later run. | Defined only. | Still no execution. |
| `approved_for_execution` | Later phase explicitly authorizes execution. | Not allowed here. | Required before any run. |
| `running` | Later authorized sandbox is active. | Not allowed here. | Requires `approved_for_execution`. |
| `completed` / `paused` / `aborted` / `withdrawn` | Later run closeout states. | Not allowed here. | Requires prior execution authorization. |

Hard separation:

```text
credential_ready does not mean approved_for_execution.
draft allowlist entry does not mean fixture prep approval.
approved_for_fixture_prep does not mean credential readiness.
approved_for_credential_readiness does not mean execution approval.
```

## 7. Candidate / Draft Entry Review Checklist

A draft entry may be selected for later review only if all criteria are true:

* `participant_code` exists in SANDBOX-0C draft entries.
* `participant_type` is allowed or explicitly conditioned.
* Public/uncontrolled external participant is not allowed.
* Minor/guardian issue is absent or explicitly blocked.
* `program_allowed` is `PAES_M1`.
* `data_scope` is allowed for the participant type.
* `communication_scope` is non-public, non-commercial, no PAES score/diagnosis, no subscription claim, and M1-first only.
* No real sensitive data is required.
* `support_owner_role` is defined.
* Stop conditions are defined.
* Evidence requirements are defined.
* Auth/Playwright waiver applicability is reviewed as potential only.
* StudentAccess containment applicability is reviewed as potential only.
* No execution authorization is implied.

Candidate/draft review output options for a later phase:

```text
selected_for_review
deferred
rejected
blocked_pending_authorization
```

This phase applies none of those outputs.

## 8. Fixture Prep Approval Checklist

Before a future phase may approve fixture prep, all criteria must be true:

* A draft entry has been selected for review by a later phase.
* The later phase explicitly grants `approved_for_fixture_prep`.
* Target environment is identified and permitted.
* Target is not production.
* Staging/production ambiguity is absent.
* Git baseline is clean and versioned.
* `participant_code` is confirmed.
* Controlled email placeholder or canonical controlled email policy is defined safely.
* `PAES_M1`-only scope is confirmed.
* Initial StudyLoad expected is defined.
* `expected_content_key` is defined.
* StudentAccess containment record is prepared conceptually.
* Support/failure path is accepted.
* Participant/data/language guardrails are accepted.
* Auth/Playwright waiver applicability is recorded as potential or not applicable.
* No credential is created in the fixture-prep approval step.
* No execution is authorized in the fixture-prep approval step.
* No second load is started.
* No real personal data is used unless separately approved by a later phase.

Fixture prep approval must not include:

* credential values;
* DB mutation in this phase;
* real participant recruitment;
* execution timing;
* public/commercial language;
* L1/M2, payment, trial, or subscription scope.

## 9. Credential Readiness Approval Checklist

Before a future phase may approve credential readiness, all criteria must be true:

* Fixture prep was completed and documented in a separately authorized phase.
* Fixture identity and expected User/account state are documented safely.
* No student login has occurred yet.
* Admin UI credential reset path is available, or the phase is blocked.
* Password is handled only privately by Mauricio or another authorized human operator.
* No password, hash, token, cookie, header, env value, DB URL, provider value, storage value, request body, or response body is placed in chat, docs, logs, or commit.
* Credential status remains separate from execution approval.
* `credential_ready` does not imply `approved_for_execution`.
* Support owner is available.
* Logout/session process is understood.
* Identity check after login is required for any later execution phase.

Credential readiness output options for a later phase:

```text
private_ready
blocked
revoked
do_not_use
```

This phase grants none of those outputs.

## 10. Execution Approval Checklist

Before any future sandbox execution may be approved, all criteria must be true:

* Draft entry is explicitly `approved_for_execution` by a later phase.
* Fixture is prepared.
* Credential is `private_ready`.
* SANDBOX-0 runbook is reviewed and accepted for this entry.
* StudentAccess containment is active for this entry and recorded.
* Support/failure path is active.
* Participant/data/language guardrails are active.
* Auth/Playwright waiver is recorded if used.
* Manual smoke checklist is accepted.
* Target environment is explicitly authorized.
* No staging/production suspicion exists.
* Participant identity check is required immediately after login.
* Logout discipline is required before and after user switching.
* No payment, trial, or subscription is active.
* No M2 or L1 is active.
* No public/commercial scope is present.
* Stop conditions are reviewed.
* Expected evidence is reviewed.
* No second load may be started unless the later execution protocol explicitly authorizes it.
* Compact closeout report is required.

Execution approval cannot be inferred from any earlier state.

## 11. Manual Smoke Readiness Checklist

Manual smoke readiness checklist to define for a later authorization phase.

Do not execute this checklist in this phase.

Checklist:

* Target URL/environment is confirmed as non-production or explicitly authorized sandbox target.
* Login page is reachable.
* Logout works.
* Allowlisted participant identity is expected.
* `/now` is expected to show `PAES_M1` only.
* Initial StudyLoad is expected and named.
* Admin/tutor read-only evidence route is known.
* No secrets are displayed.
* No payment/trial/subscription surfaces are visible.
* No M2/L1 surfaces are visible.
* Stop on any deviation.

Manual smoke readiness means:

```text
manual checklist accepted for later use
```

It does not mean:

```text
Playwright implemented
auth robust
sandbox execution approved
```

## 12. Auth / Playwright Waiver Recording

If the auth/Playwright waiver is used later, the authorization record must include:

| Field | Required value / rule |
|---|---|
| `waiver_name` | `AUTH_AND_PLAYWRIGHT_TEMPORARY_WAIVER_FOR_TINY_HUMAN_GUIDED_M1_FIRST_SANDBOX` |
| `scope` | Only tiny, human-guided, non-public, non-commercial, `PAES_M1`-only sandbox. |
| `participant_entry` | Draft entry or later real allowlist entry code. |
| `expiry_triggers` | staging, broader pilot, external users beyond explicit authorization, payment/trial/subscription, M2/L1, self-serve, repeated non-human-guided, Sales-Ready/public. |
| `manual_smoke_accepted` | Required before execution approval. |
| `stop_rules_accepted` | Required before execution approval. |
| `owner` | Bexauri/Mauricio or later named authorization owner. |
| `date` | Filled only in later authorization phase. |
| `auth_robustness_claim` | Must remain `not_declared`. |
| `playwright_implementation_claim` | Must remain `not_implemented`. |

Waiver recording does not approve execution by itself.

## 13. StudentAccess Containment Recording

If StudentAccess containment is used later, the authorization record must include:

| Field | Required value / rule |
|---|---|
| `student_access_lifecycle_status` | `not_implemented_for_broader_use` |
| `containment_authority` | `runbook + allowlist + controlled fixture + private credential` |
| `participant_entry_code` | Selected entry code. |
| `program_scope` | `PAES_M1` only. |
| `missing_row_interpretation` | Missing StudentAccess row is not automatic `no_access` and not automatic `full_access`. |
| `unauthorized_access_rule` | Stop immediately. |
| `future_blocker` | Lifecycle remains blocker before broader pilot, staging with external users, Sales-Ready/public, payment/trial/subscription, M2/L1, self-serve, cohorts, audit, or expiration. |

Containment recording does not implement StudentAccess and does not approve execution by itself.

## 14. Execution Approval Conceptual Form / Table

Conceptual form for a later authorization phase:

| Field | Value |
|---|---|
| `participant_code` | blank until later authorization |
| `draft_entry_reference` | blank until later authorization |
| `approval_stage` | `draft` / `selected_for_review` / `approved_for_fixture_prep` / `approved_for_credential_readiness` / `approved_for_execution` |
| `fixture_prep_approved_by` | blank |
| `fixture_prep_approved_at` | blank |
| `credential_readiness_approved_by` | blank |
| `credential_readiness_approved_at` | blank |
| `execution_approved_by` | blank |
| `execution_approved_at` | blank |
| `support_owner` | blank |
| `target_environment` | blank |
| `waiver_used` | `false` by default |
| `StudentAccess_containment_recorded` | `false` by default |
| `manual_smoke_status` | `not_run_not_accepted` |
| `stop_conditions_reviewed` | `false` |
| `execution_status` | `not_authorized` |
| `notes_sanitized` | blank |

Example-only row:

| Field | Example only |
|---|---|
| `participant_code` | `SANDBOX_M1_SYNTH_001` |
| `draft_entry_reference` | `SANDBOX-0C` |
| `approval_stage` | `draft` |
| `fixture_prep_approved_by` | blank |
| `credential_readiness_approved_by` | blank |
| `execution_approved_by` | blank |
| `waiver_used` | `false` |
| `StudentAccess_containment_recorded` | `false` |
| `manual_smoke_status` | `not_run_not_accepted` |
| `execution_status` | `not_authorized` |
| `notes_sanitized` | Example only. Not approved. No real participant. |

The example row is not an approval and not an operational allowlist.

## 15. Stop Rules

Execution cannot be approved if any of these are true:

* Git is dirty or baseline is divergent.
* Target environment is unclear.
* Staging/production suspicion exists without explicit authorization.
* Participant is not `approved_for_execution`.
* Fixture is not prepared.
* Credential is not `private_ready`.
* Support owner is missing.
* StudentAccess containment is not recorded when lifecycle is not implemented.
* Failure path is not active.
* Guardrails are not accepted.
* Auth/Playwright waiver is missing while auth normalization and Playwright/login E2E remain incomplete.
* Program is wrong.
* M2/L1 is visible or active.
* Payment/trial/subscription is active.
* Public/commercial language appears.
* Participant is minor or public external.
* Sensitive data is required.
* Execution would require DB/manual/auth/code improvisation.
* Second load would be started without explicit protocol authorization.
* Evidence capture would require prohibited data.

Stop rule result:

```text
pause_or_abort_and_open_later_phase
```

## 16. Relationship With SANDBOX-0C Draft Entries

SANDBOX-0C draft entries remain unchanged:

* `SANDBOX_M1_SYNTH_001`: draft / proposed / not authorized.
* `SANDBOX_M1_INTERNAL_001`: draft / deferred / not authorized.
* `SANDBOX_M1_EXTERNAL_CONDITIONED_001`: blocked pending authorization / deferred / not authorized.

This 0D checklist does not move any entry to:

* `selected_for_review`;
* `approved_for_fixture_prep`;
* `fixture_prepared`;
* `approved_for_credential_readiness`;
* `credential_ready`;
* `manual_smoke_ready`;
* `approved_for_execution`;
* `running`;
* `completed`;
* `paused`;
* `aborted`;
* `withdrawn`.

## 17. Relationship With Future Phases

Likely next small phase:

```text
MVP-SALES-PILOT-SANDBOX-0E - Review SANDBOX_M1_SYNTH_001 for fixture-prep approval without execution authorization
```

Rationale:

* the authorization checklist is now defined;
* no entry has been selected for fixture-prep review;
* synthetic entry is the safest first review target;
* jumping directly to execution authorization would skip selected-entry and fixture-prep review.

`MVP-SALES-PILOT-SANDBOX-1 - Review and authorize closed M1-first sandbox execution readiness` should wait until selected entry, fixture-prep, credential-readiness, waiver/containment records, and manual smoke readiness are handled or explicitly waived by later phase.

## 18. Non-Declarations

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

## 19. Explicit Non-Actions

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
* approve fixture prep;
* approve credential readiness;
* approve execution;
* create credentials;
* prepare fixture;
* convert any draft allowlist entry into an executable participant;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values;
* include real personal data, legal names, phone numbers, official IDs, addresses, sensitive school data, or minor information.

## 20. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0E - Review SANDBOX_M1_SYNTH_001 for fixture-prep approval without execution authorization
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5A/5B/5C, SANDBOX-0, HARDENING-5D, SANDBOX-0A allowlist template, SANDBOX-0B candidate slots, SANDBOX-0C draft entries, and this authorization checklist.
* What it advances: reviews the safest synthetic draft entry against the checklist to decide whether a later fixture-prep phase can be authorized.
* What it does not advance: sandbox execution, credential creation, DB mutation, participant creation, fixture preparation, auth implementation, Playwright implementation, staging, broader pilot, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_DOCUMENTATION_PHASE_REVIEW_SYNTH_ENTRY_FOR_FIXTURE_PREP_READINESS`.
* Authorization status: requires separate explicit authorization before execution.

Do not recommend direct sandbox execution from this phase.

## 21. Final Verdict

Final verdict:

```text
SANDBOX_EXECUTION_AUTHORIZATION_CHECKLIST_DEFINED_NOT_APPLIED
```

The formal execution authorization checklist is defined. It separates draft review, fixture prep approval, credential readiness approval, manual smoke readiness, and execution approval. No draft entry was selected, fixture prep was not approved, credential readiness was not approved, execution was not approved, and sandbox readiness remains not declared.

## Result Marker

```text
MVP_SALES_PILOT_SANDBOX_0D_SANDBOX_EXECUTION_AUTHORIZATION_CHECKLIST_DEFINED_NOT_APPLIED
```
