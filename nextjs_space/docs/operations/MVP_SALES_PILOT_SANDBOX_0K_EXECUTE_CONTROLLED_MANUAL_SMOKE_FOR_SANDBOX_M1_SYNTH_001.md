# MVP-SALES-PILOT-SANDBOX-0K - Execute controlled manual smoke for SANDBOX_M1_SYNTH_001

## Phase

```text
MVP-SALES-PILOT-SANDBOX-0K - Execute controlled manual smoke for SANDBOX_M1_SYNTH_001
```

Type:

```text
Controlled LOCAL_DEV manual smoke execution / minimal visibility path.
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Git preflight observed:

```text
HEAD = origin/main = origin/HEAD = daa203a
Latest accepted commit = daa203a - MVP-SALES-PILOT-SANDBOX-0J: authorize controlled manual smoke
Working tree clean before edits.
```

Git remained the live source of truth. No contradiction was found between Git and the documents read for this phase.

## Context Gate

Documents read before smoke:

* `MVP_SALES_PILOT_SANDBOX_0J_AUTHORIZE_CONTROLLED_MANUAL_SMOKE_FOR_SANDBOX_M1_SYNTH_001_WITHOUT_SANDBOX_EXECUTION_AUTHORIZATION.md`
* `MVP_SALES_PILOT_SANDBOX_0I_REVIEW_MANUAL_SMOKE_READINESS_FOR_SANDBOX_M1_SYNTH_001_WITHOUT_EXECUTION_AUTHORIZATION.md`
* `MVP_SALES_PILOT_SANDBOX_0H_COMPLETE_PRIVATE_CREDENTIAL_READINESS_FOR_SANDBOX_M1_SYNTH_001.md`
* `MVP_SALES_PILOT_SANDBOX_0G_R_CONFIRM_SAFE_LOCAL_DEV_TARGET_AND_RETRY_SANDBOX_M1_SYNTH_001_FIXTURE_PREPARATION.md`
* `MVP_SALES_PILOT_SANDBOX_0F_DEFINE_FIXTURE_PREP_MUTATION_SCOPE_FOR_SANDBOX_M1_SYNTH_001.md`
* `MVP_SALES_PILOT_SANDBOX_0D_DEFINE_SANDBOX_EXECUTION_AUTHORIZATION_CHECKLIST.md`
* `MVP_SALES_PILOT_SANDBOX_0_DRAFT_CLOSED_M1_FIRST_SANDBOX_RUNBOOK.md`
* `MVP_SALES_PILOT_HARDENING_5D_DECIDE_AUTH_NORMALIZATION_AND_PLAYWRIGHT_LOGIN_E2E_THRESHOLD.md`
* `MVP_SALES_PILOT_DIRECTION_1A_DEFINE_M1_FIRST_CLOSED_SANDBOX_READINESS_GATE.md`
* `MVP_SALES_PILOT_HARDENING_5A_DEFINE_STUDENT_ACCESS_CONTAINMENT_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5B_DEFINE_SUPPORT_FAILURE_PATH_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5C_DEFINE_PARTICIPANT_DATA_AND_LANGUAGE_GUARDRAILS.md`
* `PHASE_LOG.md` tail

Context interpretation:

* 0J authorized only a separate minimal controlled manual smoke.
* 0J authorized login, `/now`, identity/program/StudyLoad visibility, and viewer access only if no start was required.
* 0J did not authorize `Empezar`, responses, submit, self-report, completion, second StudyLoad, StudentAccess lifecycle, payment/trial/subscription, L1/M2, staging, production, DB mutation, or code/schema/auth changes.
* 0H documented private credential readiness without secret exposure.
* 0G-R documented the synthetic LOCAL_DEV fixture.

## Target LOCAL_DEV Sanitized

Target basis:

```text
LOCAL_DEV_CONFIRMED_WITHOUT_SECRET_PRINTING=human_confirmed_context
LOCAL_DEV_HTTP_AVAILABLE=http_localhost_3000
```

Availability check:

* `http://localhost:3000` responded.
* `/login` responded.
* `/now` responded.

No DB URL, env value, hostname, token, cookie, header, request body, response body, password, hash, provider value, storage value, or secret was printed or documented.

## Authorization Inherited From 0J

0J authorized this 0K maximum scope:

* LOCAL_DEV only;
* synthetic participant `SANDBOX_M1_SYNTH_001` only;
* manual login with private credential;
* open `/now`;
* verify identity, `PAES_M1`, and initial StudyLoad;
* open viewer only if available without StudyLoad start;
* capture sanitized textual evidence only;
* stop on any deviation.

## Fixture Identity

| Field | Value |
|---|---|
| `participant_code` | `SANDBOX_M1_SYNTH_001` |
| `canonical_email` | `sandbox_m1_synth_001@bexauri.dev` |
| `program` | `PAES_M1` |
| `expected_content_key` | `paes_m1_balanced_entry_initial` |
| `expected_initial_studyload` | `PAES M1 - Entrada balanceada inicial` |

The identity is synthetic and contains no real participant data.

## Inherited State From 0G-R / 0H / 0I / 0J

Inherited documented state:

* fixture prepared in LOCAL_DEV;
* one synthetic Student;
* one User;
* private credential ready as boolean / non-sensitive state;
* one active `PAES_M1` enrollment;
* one open Cycle 1;
* one pending practice StudyLoad;
* zero auth sessions before 0H verification;
* zero responses;
* zero CycleDecision rows;
* zero CycleEvaluation rows;
* zero ContinuitySignal rows;
* zero StudentAccess rows;
* zero second StudyLoads;
* zero Cycle 2;
* zero L1/M2;
* 0I readiness passed for separate authorization;
* 0J authorized 0K minimal smoke only.

## Steps Executed

Steps performed:

1. Git preflight confirmed clean aligned baseline.
2. Context Gate documents were read.
3. LOCAL_DEV server availability was checked without secrets.
4. LOCAL_DEV dev server was started because the usual ports were initially unavailable.
5. Root, `/login`, and `/now` responded on `http://localhost:3000`.
6. Mauricio attempted private manual login with the synthetic participant credential.
7. Mauricio reported sanitized manual smoke observations.
8. The phase stopped at login failure and did not proceed to `/now` as an authenticated student.

## Sanitized Manual Smoke Evidence

Human-reported sanitized evidence:

| Observation | Result |
|---|---|
| `login` | `fail` |
| `identidad_correcta` | `no` |
| `paes_m1_visible` | `no` |
| `studyload_visible` | `no` |
| `studyload_title_status` | `not_visible` |
| `viewer_accessible_without_start` | `no` |
| `start_required` | `unknown` |
| `secret_exposure` | `no` |
| `unexpected_state` | `login_failed_with_visual_defects_on_login_ui` |

No password, hash, token, cookie, header, request body, response body, env value, DB URL, provider value, storage value, or secret was provided in the report.

## Result

Final result:

```text
BLOCKED_LOGIN_FAILED
```

Reason:

```text
Manual login failed before authenticated /now verification. Continuing would require auth/credential/DB/code investigation or retry policy beyond this 0K authorization.
```

Visual login UI defects were also reported as a sanitized observation. This phase does not diagnose or repair those defects.

## Limits Respected

This phase did not:

* press `Empezar`;
* start the StudyLoad;
* select answers;
* submit responses;
* create MC submission;
* create self-report;
* complete the StudyLoad;
* verify continuity;
* create second StudyLoad;
* create or modify StudentAccess row;
* touch StudentAccess lifecycle;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging/production;
* mutate DB manually;
* change schema, seed, app code, auth, CredentialsProvider, Playwright, or tests.

## Stop Condition

Stop condition activated:

```text
login_failed_before_authenticated_identity_verification
```

Support/failure path mapping:

* HARDENING-5B family: `Auth/session`.
* Immediate action: stop and document sanitized incident.
* Continue: no, unless a later phase explicitly authorizes safe retry or diagnosis.
* Later phase required: yes, to decide credential/auth/login UI retry or repair scope.

## Credential Safety

Credential safety:

* password was not pasted into chat;
* password was not printed;
* password was not documented;
* hash was not inspected or printed;
* no token, cookie, header, request body, response body, env value, DB URL, provider value, or storage value was printed or documented.

## Scope Safety

Scope safety:

* login attempt happened manually with private credential custody;
* no authenticated `/now` evidence was captured because login failed;
* no StudyLoad state was changed;
* no runtime learning evidence was generated;
* no DB mutation was performed by Codex in 0K;
* no app code or schema was changed;
* no staging or production target was used.

## Risks / Debts

Residual risks and debts:

* private credential readiness from 0H did not translate into successful manual login in 0K;
* login UI showed visual defects according to the manual report;
* auth normalization remains a bounded waiver, not resolved robustness;
* Playwright/login E2E remains unimplemented;
* StudentAccess lifecycle remains unimplemented;
* no authenticated `/now`, `PAES_M1`, StudyLoad, or viewer evidence was obtained.

## Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0L - Diagnose SANDBOX_M1_SYNTH_001 login failure and login UI defects without StudyLoad execution
```

Recommended boundary for 0L:

* no StudyLoad start;
* no responses;
* no self-report;
* no StudentAccess lifecycle;
* no staging/production;
* no secret printing;
* decide whether the failure is credential, account linkage, auth normalization, route/UI, or local server/session issue;
* define whether a safe retry is allowed.

## Result Marker

```text
MVP_SALES_PILOT_SANDBOX_0K_BLOCKED_LOGIN_FAILED
```
