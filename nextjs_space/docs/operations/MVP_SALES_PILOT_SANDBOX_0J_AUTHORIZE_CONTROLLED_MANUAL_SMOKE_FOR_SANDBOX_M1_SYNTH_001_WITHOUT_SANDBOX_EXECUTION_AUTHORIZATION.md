# MVP-SALES-PILOT-SANDBOX-0J - Authorize controlled manual smoke for SANDBOX_M1_SYNTH_001 without sandbox execution authorization

## Phase

```text
MVP-SALES-PILOT-SANDBOX-0J - Authorize controlled manual smoke for SANDBOX_M1_SYNTH_001 without sandbox execution authorization
```

Type:

```text
Documentation / governance / controlled-manual-smoke-authorization-only.
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Git preflight observed:

```text
HEAD = origin/main = origin/HEAD = 39e5abc
Latest accepted commit = 39e5abc - MVP-SALES-PILOT-SANDBOX-0I: review manual smoke readiness
Working tree clean before edits.
```

Git remained the live source of truth. No contradiction was found between Git and the documents read for this phase.

## Context Gate

Documents read before writing:

* `MVP_SALES_PILOT_SANDBOX_0I_REVIEW_MANUAL_SMOKE_READINESS_FOR_SANDBOX_M1_SYNTH_001_WITHOUT_EXECUTION_AUTHORIZATION.md`
* `MVP_SALES_PILOT_SANDBOX_0H_COMPLETE_PRIVATE_CREDENTIAL_READINESS_FOR_SANDBOX_M1_SYNTH_001.md`
* `MVP_SALES_PILOT_SANDBOX_0G_R_CONFIRM_SAFE_LOCAL_DEV_TARGET_AND_RETRY_SANDBOX_M1_SYNTH_001_FIXTURE_PREPARATION.md`
* `MVP_SALES_PILOT_SANDBOX_0F_DEFINE_FIXTURE_PREP_MUTATION_SCOPE_FOR_SANDBOX_M1_SYNTH_001.md`
* `MVP_SALES_PILOT_SANDBOX_0E_REVIEW_SANDBOX_M1_SYNTH_001_FOR_FIXTURE_PREP_APPROVAL_WITHOUT_EXECUTION_AUTHORIZATION.md`
* `MVP_SALES_PILOT_SANDBOX_0D_DEFINE_SANDBOX_EXECUTION_AUTHORIZATION_CHECKLIST.md`
* `MVP_SALES_PILOT_SANDBOX_0C_CONVERT_CANDIDATE_SLOTS_INTO_DRAFT_ALLOWLIST_ENTRIES_WITHOUT_EXECUTION_AUTHORIZATION.md`
* `MVP_SALES_PILOT_SANDBOX_0B_DEFINE_INITIAL_SANDBOX_PARTICIPANT_CANDIDATES_WITHOUT_EXECUTION_AUTHORIZATION.md`
* `MVP_SALES_PILOT_SANDBOX_0A_DEFINE_SANDBOX_ALLOWLIST_TEMPLATE.md`
* `MVP_SALES_PILOT_SANDBOX_0_DRAFT_CLOSED_M1_FIRST_SANDBOX_RUNBOOK.md`
* `MVP_SALES_PILOT_HARDENING_5D_DECIDE_AUTH_NORMALIZATION_AND_PLAYWRIGHT_LOGIN_E2E_THRESHOLD.md`
* `MVP_SALES_PILOT_DIRECTION_1A_DEFINE_M1_FIRST_CLOSED_SANDBOX_READINESS_GATE.md`
* `MVP_SALES_PILOT_HARDENING_5A_DEFINE_STUDENT_ACCESS_CONTAINMENT_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5B_DEFINE_SUPPORT_FAILURE_PATH_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5C_DEFINE_PARTICIPANT_DATA_AND_LANGUAGE_GUARDRAILS.md`
* `PHASE_LOG.md` tail

Context interpretation:

* SANDBOX-0I closed with `MANUAL_SMOKE_READINESS_REVIEWED_READY_FOR_SEPARATE_AUTHORIZATION`.
* SANDBOX-0H documented private credential readiness as a boolean / non-sensitive state.
* SANDBOX-0G-R documented the LOCAL_DEV fixture prepared for `SANDBOX_M1_SYNTH_001`.
* Manual smoke has not been executed.
* Sandbox execution remains unauthorized.
* StudentAccess lifecycle remains unimplemented and no StudentAccess row exists for this fixture.
* Auth normalization and Playwright/login E2E remain under the strict temporary waiver only for a future tiny human-guided context.

## Target LOCAL_DEV Sanitized

Target basis for this authorization review:

```text
LOCAL_DEV_CONFIRMED_WITHOUT_SECRET_PRINTING=human_confirmed_context
```

This phase did not inspect or print raw target values. It relied on the documented SANDBOX-0G-R and SANDBOX-0H safe LOCAL_DEV basis and the 0I readiness review. No DB URL, env value, hostname, token, cookie, header, request body, response body, password, hash, provider value, or storage value was requested or printed.

## Fixture Identity

| Field | Value |
|---|---|
| `participant_code` | `SANDBOX_M1_SYNTH_001` |
| `canonical_email` | `sandbox_m1_synth_001@bexauri.dev` |
| `program` | `PAES_M1` |
| `expected_content_key` | `paes_m1_balanced_entry_initial` |
| `expected_initial_studyload` | `PAES M1 - Entrada balanceada inicial` |

The identity is synthetic and contains no real participant data.

## Inherited State From 0I / 0H / 0G-R

Inherited documented state:

* fixture prepared in LOCAL_DEV;
* one synthetic Student;
* one User;
* private credential ready as boolean / non-sensitive state;
* one active `PAES_M1` enrollment;
* one open Cycle 1;
* one pending practice StudyLoad;
* zero auth sessions;
* zero responses;
* zero CycleDecision rows;
* zero CycleEvaluation rows;
* zero ContinuitySignal rows;
* zero StudentAccess rows;
* zero second StudyLoads;
* zero Cycle 2;
* zero L1/M2;
* no manual smoke executed;
* no sandbox execution authorization.

## Authorization Decision

Decision:

```text
CONTROLLED_MANUAL_SMOKE_AUTHORIZED_FOR_SEPARATE_EXECUTION_PHASE
```

Meaning:

* A future separate phase may execute a controlled manual smoke for `SANDBOX_M1_SYNTH_001`.
* That future phase is expected to be `MVP-SALES-PILOT-SANDBOX-0K - Execute controlled manual smoke for SANDBOX_M1_SYNTH_001`.
* This authorization is limited to a minimal smoke and does not authorize full sandbox execution.
* This phase 0J does not execute login, create an auth session, open `/now`, start a StudyLoad, submit responses, run self-report, or mutate DB.

## Authorized Scope For 0K

Authorized maximum scope for 0K:

* LOCAL_DEV only.
* Synthetic participant `SANDBOX_M1_SYNTH_001` only.
* Manual student login using the private credential already prepared in 0H.
* No password, hash, token, cookie, header, env value, DB URL, request body, response body, provider value, or storage value may be printed or documented.
* Open `/now` as the synthetic student.
* Confirm the visible account/identity matches `SANDBOX_M1_SYNTH_001`.
* Confirm `PAES_M1` scope.
* Confirm the initial StudyLoad is visible and matches `PAES M1 - Entrada balanceada inicial` or a registry-matched equivalent for `paes_m1_balanced_entry_initial`.
* Open the viewer or activity only if it is available without starting or completing the StudyLoad.
* Capture only sanitized textual evidence.
* Stop on any deviation.

## Explicit 0K Decision Points

| Question | 0J decision for 0K |
|---|---|
| Can 0K include student login? | Yes, only for the synthetic participant in LOCAL_DEV with private credential custody. |
| Can 0K open `/now`? | Yes. |
| Can 0K open viewer / activity? | Yes only if available without StudyLoad start or completion. |
| Can 0K press `Empezar`? | No by default. Reserve StudyLoad start for a later 0L unless a later prompt explicitly accepts that minimal mutation. |
| Can 0K select answers? | No. |
| Can 0K submit answers? | No. |
| Can 0K record self-report? | No. |
| Can 0K complete the StudyLoad? | No. |
| Can 0K observe automatic continuity to a second StudyLoad? | No. |
| What evidence is allowed? | Sanitized route/page, identity, program, StudyLoad title/status, viewer reachability if no start is required, and incident class if any. |
| What stops 0K? | Any identity, target, scope, data, session, program, load, secret, or UI deviation listed in this document. |
| What is reserved for later phases? | StudyLoad start, responses, submission, self-report, completion, continuity, admin evidence after execution, broader sandbox execution. |

Rationale for not authorizing `Empezar` in 0K:

```text
Pressing Empezar may create runtime state. The safest 0K is login + /now visibility + non-mutating viewer reachability only. StudyLoad start should be authorized separately if needed.
```

## Explicitly Not Authorized For 0K

0K is not authorized to:

* use staging or production;
* use any participant other than `SANDBOX_M1_SYNTH_001`;
* expose or request the private credential;
* print secrets or raw technical payloads;
* press `Empezar` by default;
* start the StudyLoad;
* select alternatives;
* submit answers;
* create MC submission;
* create self-report;
* complete the StudyLoad;
* create or observe continuity by starting a second StudyLoad;
* create CycleDecision;
* create CycleEvaluation;
* create ContinuitySignal;
* create or modify StudentAccess row;
* touch StudentAccess lifecycle;
* touch payment, trial, subscription, L1, or M2;
* mutate DB manually;
* change app code, schema, seed, auth, CredentialsProvider, tests, or Playwright.

## Evidence Permitted For 0K

Permitted evidence:

* Git baseline marker;
* LOCAL_DEV target classification without raw values;
* participant code;
* synthetic email;
* login success or failure state without credential material;
* identity check result;
* `/now` visible / not visible;
* visible `PAES_M1` scope;
* expected StudyLoad title/status;
* viewer/activity reachable only if no StudyLoad start is needed;
* absence of payment/trial/subscription surfaces;
* absence of L1/M2 surfaces;
* sanitized incident class and short summary if failure path activates.

Forbidden evidence:

* password;
* hash;
* token;
* cookie;
* env value;
* DB URL;
* header;
* request body;
* response body;
* provider value;
* storage value;
* real personal data;
* unnecessary screenshots.

## Stop Conditions For 0K

0K must stop immediately if:

* Git baseline does not match the expected 0K baseline;
* working tree is not clean;
* LOCAL_DEV cannot be confirmed without secrets;
* password must be pasted, printed, copied, or shared;
* login fails in a non-trivial way;
* wrong account appears;
* non-synthetic student appears;
* program is not `PAES_M1`;
* L1 or M2 appears;
* payment, trial, or subscription appears;
* expected StudyLoad is missing, duplicated, already in progress, completed, or unexpected;
* viewer requires pressing `Empezar` and 0K has not been explicitly expanded to allow it;
* any response, completion, self-report, continuity, decision, evaluation, or StudentAccess state is generated outside scope;
* staging or production is suspected;
* code, schema, seed, auth, DB repair, or Playwright change is needed;
* token, cookie, header, request body, response body, env value, DB URL, password, hash, provider value, storage value, or other secret appears;
* UI behavior differs from the runbook in a way that affects identity, access, data, or evidence;
* there is any doubt about custody, target, identity, or scope.

Stop result:

```text
pause_or_abort_and_open_later_phase_with_sanitized_incident
```

## Risks Residuals

Residual risks accepted only for the future minimal 0K:

* auth normalization remains contained by waiver, not fully resolved;
* Playwright/login E2E remains unimplemented;
* StudentAccess lifecycle remains unimplemented;
* manual login can create auth/session state;
* `/now` may reveal unexpected state;
* viewer reachability may require a start action, which is not authorized by default in 0K;
* any real runtime mutation beyond login/session and route viewing must stop.

## Limits Of No Execution In 0J

This phase did not:

* execute UI;
* login as student;
* create auth session;
* open `/now`;
* open viewer/activity;
* press `Empezar`;
* start StudyLoad;
* select answers;
* submit responses;
* create self-report;
* run manual smoke;
* execute sandbox;
* mutate DB;
* create or modify StudentAccess row;
* touch StudentAccess lifecycle;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging/production;
* change schema, seed, app code, auth, CredentialsProvider, Playwright, or tests.

## Non-Declarations

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

## Result

Final result:

```text
CONTROLLED_MANUAL_SMOKE_AUTHORIZED_FOR_SEPARATE_EXECUTION_PHASE
```

0J authorizes only a later, separate, controlled manual smoke phase. It does not execute the smoke and does not authorize full sandbox execution.

## Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0K - Execute controlled manual smoke for SANDBOX_M1_SYNTH_001
```

Recommended 0K boundary:

* login + `/now` visibility + identity/program/StudyLoad verification;
* viewer reachability only if no StudyLoad start is required;
* no responses, self-report, completion, second StudyLoad, StudentAccess lifecycle, payment/trial/subscription, L1/M2, staging, or production;
* stop on any deviation.

## Result Marker

```text
MVP_SALES_PILOT_SANDBOX_0J_CONTROLLED_MANUAL_SMOKE_AUTHORIZED_FOR_SEPARATE_EXECUTION_PHASE
```
