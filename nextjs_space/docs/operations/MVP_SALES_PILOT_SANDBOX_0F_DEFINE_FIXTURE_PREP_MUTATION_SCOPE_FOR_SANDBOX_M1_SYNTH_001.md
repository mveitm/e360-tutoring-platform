# MVP-SALES-PILOT-SANDBOX-0F - Define fixture-prep mutation scope for SANDBOX_M1_SYNTH_001

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-SANDBOX-0F - Define fixture-prep mutation scope for SANDBOX_M1_SYNTH_001
```

Type:

```text
Documentation / fixture-prep mutation-scope-only.
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
HEAD = origin/main = origin/HEAD = 6138bf1
```

Latest accepted commit:

```text
6138bf1 - MVP-SALES-PILOT-SANDBOX-0E: review synthetic entry for fixture prep
```

Git preflight remained the live truth. Historical baselines inside documents, prompts, memory, and reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_SANDBOX_0E_REVIEW_SANDBOX_M1_SYNTH_001_FOR_FIXTURE_PREP_APPROVAL_WITHOUT_EXECUTION_AUTHORIZATION.md`
* `MVP_SALES_PILOT_SANDBOX_0D_DEFINE_SANDBOX_EXECUTION_AUTHORIZATION_CHECKLIST.md`
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

* SANDBOX-0E approved `SANDBOX_M1_SYNTH_001` only for future fixture-prep path.
* Fixture has not been prepared.
* DB mutation has not been approved or executed.
* Credential readiness, manual smoke, execution, sandbox readiness, and staging readiness remain unauthorized and undeclared.
* This phase defines the exact future mutation scope only. It does not execute that scope.

## 4. Decision Inherited From SANDBOX-0E

Inherited decision:

```text
SANDBOX_M1_SYNTH_001_APPROVED_FOR_FIXTURE_PREP_NOT_PREPARED
```

Inherited allowed next step:

```text
define_fixture_prep_mutation_scope
```

Inherited boundary:

```text
Fixture-prep approval does not mean fixture prepared, credential readiness, manual smoke readiness, execution authorization, sandbox readiness, or staging readiness.
```

## 5. Purpose Of Fixture-Prep Mutation Scope

Purpose:

```text
Define exactly what a later fixture-prep phase may create for SANDBOX_M1_SYNTH_001, where it may run, what it must verify, and what must remain out of scope.
```

This document is the mutation contract for a future phase. It prevents a fixture-prep phase from expanding into credential setup, runtime execution, StudentAccess lifecycle, sandbox readiness, or broader pilot work.

Result of this phase:

```text
FIXTURE_PREP_MUTATION_SCOPE_DEFINED_NOT_EXECUTED
```

## 6. Target Policy

Allowed target for future fixture prep:

* `LOCAL_DEV` is the preferred immediate target.
* A technical sandbox target may be used only if a future phase explicitly authorizes it before mutation.
* The target must be confirmed without printing secrets, env values, DB URLs, tokens, provider values, storage values, credentials, or raw connection details.

Forbidden targets:

* production;
* staging without explicit future authorization;
* ambiguous target;
* any target containing unexpected real personal data;
* any target that cannot be confirmed without exposing secrets;
* any target where the operator is unsure whether the data store is local/dev, staging, or production.

Future target confirmation must stop if:

* `LOCAL_DEV` or explicitly authorized target cannot be confirmed safely;
* staging/production is suspected;
* Git is dirty;
* baseline diverges from the future phase expectation;
* DB target is ambiguous;
* confirmation would require printing or inspecting raw secret values;
* unexpected real data is visible or required for fixture preparation.

## 7. Synthetic Identity

Future fixture-prep identity:

| Field | Future fixture value |
|---|---|
| `participant_code` | `SANDBOX_M1_SYNTH_001` |
| `student_display_name` | `SANDBOX_M1_SYNTH_001 SANDBOX_M1_SYNTH_001` |
| `canonical_email` | `sandbox_m1_synth_001@bexauri.dev` |
| `program` | `PAES_M1` |
| `participant_type` | `synthetic` |
| `data_scope` | `synthetic_only` |
| `support_owner_role` | `sandbox_operator` |

Email decision:

* `sandbox_m1_synth_001@bexauri.dev` is the proposed canonical controlled email for future fixture prep.
* It must be treated as a synthetic controlled identity, not a real participant contact.
* A future fixture-prep phase must confirm that using `@bexauri.dev` remains acceptable and non-public for synthetic local/dev identity.
* If `@bexauri.dev` is not acceptable for the target, the future phase must stop and either use a documented safe placeholder pattern or open a new decision phase.
* This phase does not create the email, account, credential, or mailbox.

Safety rules:

* no legal name;
* no real personal email;
* no phone number;
* no official ID;
* no school data;
* no minor data;
* no credential value.

## 8. In-Scope Future Mutations

A future fixture-prep phase may create only the minimum records required to stage a synthetic, non-executable M1-first fixture:

1. Synthetic `Student`.
2. Minimal `User` or user/account state required by the existing local/dev auth model.
3. `Account` linkage only if the model requires it and the future phase confirms the exact safe requirement.
4. Active `PAES_M1` enrollment.
5. `LearningCycle` 1 in open state.
6. One initial pending `StudyLoad` for `PAES M1 - Entrada balanceada inicial`.

Minimum field intent:

| Entity | Minimum future state |
|---|---|
| `Student` | Synthetic identity only; display/name fields based on `SANDBOX_M1_SYNTH_001`; no real personal data. |
| `User` | Canonical email `sandbox_m1_synth_001@bexauri.dev`; no password printed; credential not configured in fixture-prep phase. |
| `Account` | Only if required by the current auth/account model; no provider secrets or private values in docs. |
| `Enrollment` | `PAES_M1`; active; linked to the synthetic student/user as required by existing model. |
| `LearningCycle` | Cycle 1; open; no decisions; no evaluations. |
| `StudyLoad` | One pending initial M1 StudyLoad matching the specification in section 10. |

Future fixture prep must document the actual created record counts and safe identifiers only as needed, without exposing secrets or raw sensitive payloads.

## 9. Out-Of-Scope Future Mutations

The future fixture-prep phase must not create or modify:

* password;
* private credential readiness;
* credential reset state unless a separate credential phase authorizes it;
* responses;
* MC submissions;
* self-report;
* completed StudyLoad state;
* in-progress StudyLoad state;
* CycleDecision;
* CycleEvaluation;
* manual continuity signal;
* second StudyLoad;
* Cycle 2;
* StudentAccess row, unless a future phase explicitly changes this decision;
* StudentAccess lifecycle;
* payment;
* trial;
* subscription;
* L1 enrollment;
* M2 enrollment;
* public/commercial participant data;
* real personal data;
* production or staging records unless explicitly authorized by a later phase.

Out-of-scope actions:

* no login;
* no `/now`;
* no StudyLoad start;
* no manual smoke;
* no admin runtime review;
* no sandbox execution;
* no cleanup or repair of unrelated records.

## 10. Initial StudyLoad Specification

The future fixture-prep phase may create exactly one initial StudyLoad:

| Field | Required future value |
|---|---|
| `title` | `PAES M1 - Entrada balanceada inicial` |
| `loadType` | `practice` |
| `status` | `pending` |
| `contentKey` | `paes_m1_balanced_entry_initial` |
| `contentVersion` | `v1` |
| `programCode` | `PAES_M1` |
| `sliceId` | `BALANCED_ENTRY` |
| `axis` | `balanced_entry` |
| `primaryPurpose` | `diagnose` |
| `evidenceType` | `mc_submission` |
| `reviewStatus` | `internal_provisional` |
| `expertReviewed` | `false` |
| `routingStatus` | `available_not_universal` |

State requirements:

* initial StudyLoad must be pending;
* no response evidence exists;
* no self-report exists;
* no completion exists;
* no second load exists;
* no decision/evaluation exists;
* no execution authorization is implied.

If the current schema or existing seed/content model uses different exact field names, a future fixture-prep phase must map this specification to existing fields without changing schema or app code unless a separate phase authorizes that work.

## 11. Idempotency Requirements

The future fixture-prep phase must be idempotent and stop on ambiguity.

Before creating anything, it must check whether `SANDBOX_M1_SYNTH_001` already has:

* Student;
* User;
* Account linkage, if applicable;
* `PAES_M1` enrollment;
* open Cycle 1;
* initial StudyLoad;
* responses;
* self-report;
* decisions;
* evaluations;
* second StudyLoad;
* StudentAccess row.

Idempotency rules:

* if exact complete fixture already exists with no execution evidence, document reuse decision or stop for review;
* if partial fixture exists, stop and document whether a reuse/repair phase is needed;
* if duplicates exist, block fixture prep;
* if execution evidence exists, block fixture prep;
* if a second StudyLoad exists, block unless a future phase explicitly explains why it is expected;
* do not delete or overwrite records without a separate cleanup/repair authorization.

## 12. Future Preflight Checklist

Before a future fixture-prep phase may mutate data, it must confirm:

* Git working tree is clean.
* Expected future `HEAD`, `origin/main`, and `origin/HEAD` are aligned.
* Target is `LOCAL_DEV` or explicitly authorized technical sandbox.
* No staging/production suspicion exists.
* Target can be confirmed without printing secrets.
* `SANDBOX_M1_SYNTH_001` remains `approved_for_fixture_prep`.
* Fixture is still not prepared, or reuse is explicitly documented.
* Execution remains not authorized.
* Credential readiness remains not authorized.
* StudentAccess containment decision is accepted.
* Support/failure path is accepted.
* Participant/data/language guardrails are accepted.
* Auth/Playwright waiver is understood but not activated for execution.
* No duplicate fixture exists.
* Mutation scope matches this SANDBOX-0F document.
* Rollback/cleanup policy is understood.
* No real personal data is required.

Future preflight must stop if any required item fails.

## 13. Future Post-Verification Checklist

After a future fixture-prep phase, verify and document safely:

* exactly one synthetic Student for `SANDBOX_M1_SYNTH_001`;
* exactly one expected User/account state;
* canonical email matches the approved synthetic identity;
* exactly one active `PAES_M1` enrollment;
* exactly one Cycle 1 open;
* exactly one initial pending StudyLoad;
* StudyLoad title matches `PAES M1 - Entrada balanceada inicial`;
* StudyLoad `contentKey` matches `paes_m1_balanced_entry_initial`;
* StudyLoad version and metadata match the fixture scope or documented existing schema mapping;
* no password printed;
* no credential readiness;
* no responses;
* no MC submissions;
* no self-report;
* no decisions;
* no evaluations;
* no second StudyLoad;
* no Cycle 2;
* no StudentAccess row unless explicitly authorized by a later phase;
* no other participant touched;
* no production/staging touched;
* docs updated as expected.

Post-verification evidence must be sanitized and must not include secrets, raw DB URLs, credential material, request/response bodies, tokens, cookies, headers, provider values, or storage values.

## 14. Rollback / Cleanup Policy

Rollback and cleanup policy for future fixture prep:

* If fixture prep partially succeeds, stop and document the partial state.
* Do not perform ad hoc DB cleanup.
* Do not delete evidence if any user action occurred.
* Do not delete or overwrite unrelated records.
* Cleanup requires a separate authorized phase if needed.
* If duplicate synthetic fixture records appear before execution, future repair may proceed only after documented approval.
* If target uncertainty appears, abort before mutation.
* If the mutation touches staging/production by suspicion or accident, stop immediately and open an incident/containment phase without printing secrets.

Rollback is governance-controlled, not improvised.

## 15. Credential Boundary

Fixture prep does not configure credentials.

Credential rules:

* no password creation in fixture-prep phase;
* no password reset in fixture-prep phase unless a later phase explicitly changes scope;
* no credential value in chat, docs, logs, or commits;
* credential readiness must be a separate future phase;
* `credential_ready` does not imply execution authorization.

Allowed future status after fixture prep:

```text
credential_status = credential_needed or not_ready
```

Forbidden future status after fixture prep:

```text
credential_status = private_ready
```

unless a separate credential-readiness phase authorizes it.

## 16. Execution Boundary

Fixture prepared does not imply execution authorization.

After future fixture prep, these must remain false unless later authorized:

```text
manual_smoke_ready = false / not_run
execution_approval_status = not_authorized
sandbox_execution = not_authorized
sandbox_readiness = not_declared
```

Execution requires a later phase with:

* explicit `approved_for_execution`;
* fixture prepared;
* credential `private_ready`;
* manual smoke accepted;
* StudentAccess containment active;
* support/failure path active;
* participant/data/language guardrails active;
* auth/Playwright waiver recorded if used;
* target authorized;
* stop conditions reviewed.

## 17. Manual Smoke Boundary

Manual smoke is not part of fixture prep.

Manual smoke may occur only after:

* fixture is prepared;
* credential readiness is separately approved and complete;
* target is authorized;
* support owner is active;
* waiver and containment records are accepted;
* a later phase explicitly authorizes manual smoke readiness.

Playwright/login E2E waiver is not activated by fixture prep alone.

## 18. Stop Conditions

The future fixture-prep phase must stop before mutation if:

* Git is dirty or divergent;
* target is unclear;
* staging/production is suspected;
* target confirmation requires secrets;
* unexpected real data appears;
* `SANDBOX_M1_SYNTH_001` is not approved for fixture prep;
* fixture already exists with ambiguous state;
* duplicate student/user/enrollment/cycle/load exists;
* any execution evidence exists;
* a second StudyLoad already exists unexpectedly;
* StudentAccess row exists unexpectedly and conflicts with containment;
* mutation would require app code, schema, seed, auth, CredentialsProvider, Playwright, payment, trial, subscription, L1, or M2 changes;
* mutation would require creating credential readiness;
* support owner role is missing;
* no rollback/cleanup policy is accepted.

The future fixture-prep phase must stop after mutation and document an incident if:

* partial fixture is created;
* record counts differ from the post-verification checklist;
* unexpected decisions/evaluations exist;
* forbidden records are created;
* target uncertainty appears;
* any secret or sensitive value is exposed.

## 19. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0G - Prepare SANDBOX_M1_SYNTH_001 fixture without credential or execution authorization
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5A/5B/5C, SANDBOX-0, HARDENING-5D, SANDBOX-0A, SANDBOX-0B, SANDBOX-0C, SANDBOX-0D, SANDBOX-0E, and this mutation scope.
* What it advances: prepares the exact synthetic local/dev fixture defined here, if future preflight and target confirmation pass.
* What it does not advance: credential readiness, manual smoke, sandbox execution, staging, broader pilot, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, payment/trial/subscription, or StudentAccess lifecycle.
* Priority verdict: `APPROVED_NEXT_SMALL_FIXTURE_PREP_PHASE_WITHOUT_CREDENTIAL_OR_EXECUTION`.
* Authorization status: requires separate explicit authorization before fixture preparation, and separate later authorization before credential readiness or execution.

Do not recommend direct credential readiness or sandbox execution from this phase.

## 20. Non-Declarations

This phase does not declare:

* fixture prepared;
* credential readiness approved;
* credential ready;
* manual smoke ready;
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
* operational allowlist populated;
* execution approved.

## 21. Explicit Non-Actions

This phase did not:

* implement;
* execute UI;
* mutate DB;
* prepare fixture;
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
* write commercial material;
* populate operational allowlist;
* configure credentials;
* approve credential readiness;
* approve execution;
* execute manual smoke;
* prepare `PILOT_M1_005`;
* convert a draft allowlist entry into an executable participant;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values;
* include real personal data, legal names, phone numbers, official IDs, addresses, sensitive school data, or minor information.

## 22. Final Verdict

Final verdict:

```text
FIXTURE_PREP_MUTATION_SCOPE_DEFINED_NOT_EXECUTED
```

The future mutation scope for `SANDBOX_M1_SYNTH_001` is defined: local/dev is the preferred target, the identity is synthetic and `PAES_M1`-only, the future fixture may create only the minimum Student/User-or-account-state/Enrollment/Cycle/one pending initial StudyLoad records, and it must not create credentials, responses, self-report, decisions, evaluations, second load, StudentAccess, payment/trial/subscription, L1/M2, or execution state. No mutation was executed in this phase.

## Result Marker

```text
MVP_SALES_PILOT_SANDBOX_0F_FIXTURE_PREP_MUTATION_SCOPE_DEFINED_NOT_EXECUTED
```
