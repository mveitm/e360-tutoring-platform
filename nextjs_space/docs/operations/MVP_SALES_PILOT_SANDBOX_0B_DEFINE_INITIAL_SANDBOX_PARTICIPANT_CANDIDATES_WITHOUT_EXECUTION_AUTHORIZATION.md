# MVP-SALES-PILOT-SANDBOX-0B - Define initial sandbox participant candidates without execution authorization

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-SANDBOX-0B - Define initial sandbox participant candidates without execution authorization
```

Type:

```text
Documentation / governance / candidate-definition-only.
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
HEAD = origin/main = origin/HEAD = 5defae5
```

Latest accepted commit:

```text
5defae5 - MVP-SALES-PILOT-SANDBOX-0A: define sandbox allowlist template
```

Git preflight remained the live truth. Historical baselines inside documents, prompts, memory, and reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
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

* DIRECTION-1 selected `HYBRID_DIRECTION_WITH_PHASED_GATES`.
* DIRECTION-1A kept M1-first closed sandbox readiness not yet met.
* SANDBOX-0 drafted the runbook but did not authorize execution.
* SANDBOX-0A defined the allowlist template but did not populate it.
* StudentAccess containment is allowed only under strict tiny human-guided limits.
* Support/failure path and participant/data/language guardrails are defined.
* Auth/Playwright waiver is defined but applies only under strict later authorization.
* This phase defines candidate slots only. It does not create participants, populate a real allowlist, prepare credentials, or authorize execution.

## 4. Decision Inherited From SANDBOX-0A

Inherited decision:

```text
SANDBOX_ALLOWLIST_TEMPLATE_DEFINED_NOT_POPULATED
```

Inherited boundary:

```text
Candidate definition may feed a later allowlist review, but it is not an allowlist and does not authorize fixture prep, credential readiness, or execution.
```

## 5. Purpose Of Candidate Slots

Purpose:

```text
Define a first, safe set of conceptual sandbox participant slots that can later be reviewed against the SANDBOX-0A allowlist template without using real personal data or authorizing any run.
```

This phase answers who should be considered first for a future sandbox:

* 1 synthetic slot as the safest first operational candidate;
* optionally 1 internal controlled slot after synthetic slot review;
* 0 known controlled external participants by default for first execution unless a later phase explicitly conditions and approves one;
* public/uncontrolled external participants blocked;
* minors/school students blocked pending explicit legal/guardian/data policy.

## 6. What A Candidate Slot Is

A candidate slot is:

* a conceptual operational placeholder;
* a category-level planning artifact;
* a future allowlist input candidate;
* a way to separate participant type, purpose, data mode, support assumptions, and blockers before any participant exists;
* safe to document because it contains no real identity and no credential material.

Candidate slot decision:

```text
Candidate slots are planning placeholders only.
```

## 7. What A Candidate Slot Is Not

A candidate slot is not:

* a participant;
* a student;
* a user;
* an account;
* a real person;
* a recruited participant;
* an allowlist entry;
* a fixture;
* a credential;
* a StudentAccess row;
* a DB record;
* execution approval;
* sandbox readiness.

Boundary rules:

```text
candidate slot != allowlist real
candidate slot != fixture prep
candidate slot != credential readiness
candidate slot != execution authorization
```

## 8. Candidate Category Taxonomy

| Category | Description | Current decision |
|---|---|---|
| Synthetic candidate slot | Fully fictitious and controlled. Can test runbook logic without real personal data. | Allowed as first slot. |
| Internal controlled candidate slot | Internal/team-controlled role or person category, recorded without real name in this phase. | Allowed as optional second slot after synthetic review. |
| Known controlled external candidate slot | Real external person known to the team, but not named or contacted here. | Conditioned and deferred by default. Requires later communication, consent, data, support, and authorization. |
| Public/uncontrolled external | Unknown, public, uncontrolled, or self-serve user. | Blocked. |
| Minor/student participant | Minor or school student without explicit legal/guardian/data policy. | Blocked by default. |

## 9. Candidate Slot Fields

Candidate slot template fields:

| Field | Meaning | Required now? | Notes |
|---|---|---|---|
| `candidate_slot_id` | Conceptual slot id. | Yes | Use synthetic slot id only. |
| `candidate_type` | Slot category. | Yes | Use taxonomy values. |
| `purpose` | Why this slot exists. | Yes | Must stay operational and non-commercial. |
| `expected_program` | Program allowed. | Yes | Fixed as `PAES_M1`. |
| `expected_initial_studyload` | Expected first StudyLoad. | Yes as conceptual value | Confirm later before allowlist execution. |
| `data_mode` | Data boundary. | Yes | Prefer `synthetic_only` or `minimal_controlled`. |
| `contact_status` | Whether contact exists or is needed. | Yes | Should be `not_applicable` or `not_contacted`. |
| `consent_status` | Consent boundary. | Yes | Should be `not_applicable` or `required_later`. |
| `allowlist_status` | Relationship to real allowlist. | Yes | Must be `not_listed` in this phase. |
| `fixture_status` | Fixture readiness state. | Yes | Must be `not_prepared` or `not_applicable`. |
| `credential_status` | Credential readiness state. | Yes | Must be `not_needed_yet` or `not_applicable`. |
| `execution_approval_status` | Execution approval state. | Yes | Must be `not_authorized`. |
| `support_owner_role` | Future support role. | Yes | Role only, no personal data required. |
| `risk_notes_sanitized` | Safe notes. | Optional | No real personal data or secrets. |
| `blockers_before_allowlist` | What must be solved before converting to real allowlist entry. | Yes | Must be explicit. |
| `blockers_before_execution` | What must be solved before any run. | Yes | Must be explicit. |

## 10. Status Model

### Candidate Status

| Value | Meaning |
|---|---|
| `proposed` | Conceptual candidate slot created. |
| `under_review` | Slot is being reviewed for later allowlist conversion. |
| `accepted_for_allowlist_review` | Slot may be converted into a draft allowlist entry in a later phase. |
| `rejected` | Slot should not proceed. |
| `deferred` | Slot is valid conceptually but not for first run. |

### Allowlist Status

| Value | Meaning |
|---|---|
| `not_listed` | No real allowlist entry exists. |
| `pending_review` | Later phase may review as draft allowlist entry. |
| `approved_for_fixture_prep` | Later authorization may allow fixture preparation. |
| `approved_for_credential_readiness` | Later authorization may allow private credential readiness. |
| `approved_for_execution` | Later authorization may allow execution. Not allowed in this phase. |
| `paused` | Review paused. |
| `revoked` | Candidate/entry withdrawn. |

### Fixture Status

| Value | Meaning |
|---|---|
| `not_prepared` | No fixture exists or is prepared. |
| `prepared` | Later phase prepared a fixture. Not allowed in this phase. |
| `blocked` | Fixture cannot be prepared. |
| `not_applicable` | No fixture is expected for this candidate. |

### Credential Status

| Value | Meaning |
|---|---|
| `not_needed_yet` | No credential should be prepared yet. |
| `credential_needed` | Credential may be needed in a later phase. |
| `private_ready` | Later private readiness complete. Not allowed in this phase. |
| `revoked` | Credential must not be used. |
| `not_applicable` | No credential applies. |

### Execution Approval Status

| Value | Meaning |
|---|---|
| `not_authorized` | No execution approval exists. Required for all slots in this phase. |
| `pending` | Later phase is reviewing execution. |
| `approved` | Later phase approves execution. Not allowed in this phase. |
| `denied` | Execution denied. |
| `paused` | Execution review paused. |

Hard rule:

```text
No candidate slot is approved_for_execution, prepared, credential-ready, recruited, contacted, or runnable in this phase.
```

## 11. Proposed Conceptual Candidate Slots

### Slot 1 - Synthetic first slot

```yaml
candidate_slot_id: SANDBOX_M1_SYNTH_001
candidate_type: synthetic
candidate_status: proposed
purpose: verify runbook and evidence flow with no real personal data
expected_program: PAES_M1
expected_initial_studyload: PAES M1 - Entrada balanceada inicial
data_mode: synthetic_only
contact_status: not_applicable
consent_status: not_applicable
allowlist_status: not_listed
fixture_status: not_prepared
credential_status: not_needed_yet
execution_approval_status: not_authorized
support_owner_role: sandbox_operator
risk_notes_sanitized: safest first candidate slot; no real participant
blockers_before_allowlist:
  - convert_slot_to_draft_allowlist_entry_in_later_phase
  - confirm_expected_content_key
  - confirm_stop_conditions
blockers_before_execution:
  - approved_real_allowlist_entry
  - fixture_prepared_in_authorized_phase
  - private_credential_ready_in_authorized_phase
  - manual_smoke_checklist_accepted
  - approved_for_execution_in_later_phase
```

### Slot 2 - Internal controlled second slot

```yaml
candidate_slot_id: SANDBOX_M1_INTERNAL_001
candidate_type: internal_controlled
candidate_status: proposed
purpose: verify human-guided operation with controlled internal participant category
expected_program: PAES_M1
expected_initial_studyload: PAES M1 - Entrada balanceada inicial
data_mode: minimal_controlled
contact_status: not_contacted
consent_status: required_later
allowlist_status: not_listed
fixture_status: not_prepared
credential_status: not_needed_yet
execution_approval_status: not_authorized
support_owner_role: sandbox_operator
risk_notes_sanitized: role/category only; no real name or contact recorded
blockers_before_allowlist:
  - identify_internal_role_without_unnecessary_personal_data
  - confirm_operational_consent_boundary
  - confirm_controlled_email_policy
  - confirm_expected_content_key
blockers_before_execution:
  - approved_real_allowlist_entry
  - fixture_prepared_in_authorized_phase
  - private_credential_ready_in_authorized_phase
  - support_owner_confirmed
  - manual_smoke_checklist_accepted
  - approved_for_execution_in_later_phase
```

### Slot 3 - External conditioned future option

```yaml
candidate_slot_id: SANDBOX_M1_EXTERNAL_CONDITIONED_001
candidate_type: known_controlled_external_conditioned
candidate_status: deferred
purpose: future option only; not recommended for first execution unless explicitly authorized later
expected_program: PAES_M1
expected_initial_studyload: PAES M1 - Entrada balanceada inicial
data_mode: external_conditioned
contact_status: not_contacted
consent_status: required_later
allowlist_status: not_listed
fixture_status: not_prepared
credential_status: not_needed_yet
execution_approval_status: not_authorized
support_owner_role: sandbox_operator
risk_notes_sanitized: external participant category remains conditioned; no real identity recorded
blockers_before_allowlist:
  - explicit_later_authorization_to_consider_external
  - minimal_non_commercial_communication_defined
  - basic_operational_consent_defined
  - data_minimization_confirmed
  - support_boundary_confirmed
  - no_minor_or_guardian_issue
blockers_before_execution:
  - approved_real_allowlist_entry
  - communication_and_consent_recorded_privately
  - fixture_prepared_in_authorized_phase
  - private_credential_ready_in_authorized_phase
  - auth_playwright_waiver_applicability_confirmed
  - approved_for_execution_in_later_phase
```

Blocked categories for this phase:

```text
blocked_public_external
blocked_minor_or_guardian_required
```

## 12. First Sandbox Candidate Recommendation

Recommended first sandbox candidate pool:

```text
Start with SANDBOX_M1_SYNTH_001.
Optionally add SANDBOX_M1_INTERNAL_001 as a second slot after synthetic slot review.
Defer SANDBOX_M1_EXTERNAL_CONDITIONED_001 by default.
```

Rationale:

* local/dev evidence is synthetic/control-heavy;
* StudentAccess containment is temporary and strict;
* support path is human-guided;
* auth/Playwright waiver is strict and should be tested first against the lowest privacy/commercial risk;
* external participation adds communication, consent, data, support, and expectation risk that should not be mixed into first execution.

Maximum slot recommendation:

```text
1-2 executable-candidate slots for the first sandbox authorization review, with the synthetic slot first.
```

External conditioned slot should remain a documented future option, not a first-run default.

## 13. Relationship With Allowlist Template

These candidate slots may feed the SANDBOX-0A allowlist template later.

They do not constitute:

* real allowlist entries;
* approved participants;
* fixture preparation approval;
* credential readiness approval;
* execution approval.

Conversion requirement:

```text
A later phase must explicitly convert a candidate slot into a draft allowlist entry before any fixture, credential, or execution review.
```

Minimum information required before allowlist conversion:

* exact participant type;
* canonical controlled email policy, if applicable;
* expected content key;
* data mode;
* support owner role;
* stop conditions;
* external communication/consent/data boundary if external is considered;
* no minor/guardian issue;
* no real sensitive data requirement.

## 14. Relationship With StudentAccess Containment

Any future candidate can run only under the full temporary authority:

```text
runbook + allowlist + controlled fixture + private credential + StudentAccess containment + support/failure path + auth/Playwright waiver if applicable
```

Candidate slot definition does not change StudentAccess.

StudentAccess lifecycle remains required before:

* broader closed pilot;
* staging with external users;
* Sales-Ready/public;
* payment, trial, or subscription;
* M2 or L1;
* self-serve signup or enrollment;
* cohorts;
* access audit or expiration;
* any risk of unauthorized loads.

## 15. Relationship With Support / Failure Path

Candidate slots must carry stop conditions before any later execution review.

Minimum future stop conditions:

* participant mismatch;
* wrong program;
* sensitive data exposure;
* external candidate without communication/consent/data boundary;
* minor/guardian issue;
* credential not `private_ready`;
* approval not explicit;
* support owner missing;
* fixture not prepared by an authorized phase;
* auth/session mismatch;
* unexpected load;
* public or commercial scope.

Any stop condition routes to HARDENING-5B support/failure path.

## 16. Relationship With Data / Language Guardrails

Data rules:

* synthetic slot should use `synthetic_only`;
* internal slot should use `minimal_controlled`;
* external slot remains `external_conditioned`;
* no legal names, real emails, phone numbers, RUT/DNI, addresses, school-sensitive data, minor data, third-party data, or secrets are recorded in this phase.

Language rules:

* no public claim;
* no commercial claim;
* no payment/trial/subscription claim;
* no PAES score, diagnosis, prediction, adaptation, or guarantee claim;
* no L1/M2 readiness claim;
* no sandbox readiness current-state claim.

## 17. Authorization Boundary

The following states remain separate:

| State | Meaning | Allowed in this phase? |
|---|---|---|
| `candidate_slot` | Conceptual planning slot. | Yes. |
| `proposed_participant` | Later candidate tied to a real or controlled identity. | No. |
| `allowlist_entry` | Real private allowlist record. | No. |
| `fixture_prepared` | Fixture created or prepared. | No. |
| `credential_ready` | Credential privately configured. | No. |
| `approved_for_execution` | Sandbox execution authorized for an entry. | No. |

Execution cannot be authorized until a later phase confirms:

* candidate has become a real private allowlist entry;
* participant type is allowed;
* fixture is prepared by an authorized phase;
* credential is privately ready by an authorized phase;
* support owner is confirmed;
* manual smoke checklist is accepted;
* auth/Playwright waiver applicability is recorded;
* no external/minor/data/legal blocker exists;
* `approved_for_execution` is explicitly granted.

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
* credentials ready;
* fixtures prepared.

## 19. Explicit Non-Actions

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
* contact participants;
* send communications;
* write commercial materials;
* populate an operational allowlist;
* approve execution;
* create credentials;
* record real personal data;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values.

## 20. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0C - Convert candidate slots into draft allowlist entries without execution authorization
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5A/5B/5C, SANDBOX-0, HARDENING-5D, SANDBOX-0A allowlist template, and this candidate-slot definition.
* What it advances: converts selected conceptual slots, likely synthetic first and optionally internal second, into draft allowlist entries for review without execution authorization.
* What it does not advance: sandbox execution, credential creation, DB mutation, participant creation, auth implementation, Playwright implementation, staging, broader pilot, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_DOCUMENTATION_PHASE_DRAFT_ALLOWLIST_ENTRIES_WITHOUT_EXECUTION_AUTHORIZATION`
* Authorization status: requires separate explicit authorization before execution.

`MVP-SALES-PILOT-SANDBOX-1 - Review and authorize closed M1-first sandbox execution readiness` should not be recommended until candidate slots are either converted into draft allowlist entries or explicitly waived by a later governance decision.

## 21. Final Verdict

Final verdict:

```text
INITIAL_SANDBOX_PARTICIPANT_CANDIDATE_SLOTS_DEFINED_NOT_AUTHORIZED
```

Initial sandbox participant candidate slots are defined as conceptual planning slots only. The recommended first candidate pool starts with one synthetic slot and may add one internal controlled slot; the external conditioned slot is deferred by default. No participant is created, recruited, contacted, allowlisted, credentialed, or authorized for execution.

## Result Marker

```text
MVP_SALES_PILOT_SANDBOX_0B_INITIAL_SANDBOX_PARTICIPANT_CANDIDATE_SLOTS_DEFINED_NOT_AUTHORIZED
```
