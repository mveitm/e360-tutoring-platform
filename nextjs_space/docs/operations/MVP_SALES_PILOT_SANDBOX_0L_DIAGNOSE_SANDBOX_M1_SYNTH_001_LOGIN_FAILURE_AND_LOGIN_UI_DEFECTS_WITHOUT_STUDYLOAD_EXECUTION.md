# MVP-SALES-PILOT-SANDBOX-0L - Diagnose SANDBOX_M1_SYNTH_001 login failure and login UI defects without StudyLoad execution

## Phase

```text
MVP-SALES-PILOT-SANDBOX-0L - Diagnose SANDBOX_M1_SYNTH_001 login failure and login UI defects without StudyLoad execution
```

Type:

```text
Read-only LOCAL_DEV login/auth/UI diagnostic.
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

Git preflight observed:

```text
HEAD = origin/main = origin/HEAD = 9fcca47
Latest accepted commit = 9fcca47 - MVP-SALES-PILOT-SANDBOX-0K: execute controlled manual smoke
Working tree clean before edits.
```

Git remained the live source of truth. No contradiction was found between Git and the documents read for this phase.

## Context Gate

Documents read before diagnosis:

* `MVP_SALES_PILOT_SANDBOX_0K_EXECUTE_CONTROLLED_MANUAL_SMOKE_FOR_SANDBOX_M1_SYNTH_001.md`
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

Context inherited:

* PRO direction after 0K: `AJUSTAR, PERO CONTINUAR`.
* 0K result: `BLOCKED_LOGIN_FAILED`.
* 0K stopped before authenticated identity verification.
* 0K did not reach authenticated `/now`, viewer, `Empezar`, response, submit, self-report, completion, continuity, or second StudyLoad.
* 0L is read-only and must not repair, reset, mutate, or retry the smoke.

## Decision PRO Inherited

Direction:

```text
AJUSTAR, PERO CONTINUAR
```

Interpretation:

* The M1-first sandbox remains the correct tactical path.
* The sandbox remains the same app, same repo, LOCAL_DEV, synthetic fixture, and strict gates.
* 0L diagnoses the blocker only.
* Any repair phase remains conditional and separate.
* No authenticated `/now` retry is allowed until login failure and login UI defects are isolated.

## Target LOCAL_DEV Sanitized

Target basis:

```text
LOCAL_DEV_CONFIRMED_WITHOUT_SECRET_PRINTING=inherited_from_0G_R_0H_0I_0J_0K
```

Read-only observations:

* `/login` responded with HTTP 200 in LOCAL_DEV.
* The rendered HTML contained the login form markers and expected visible labels.
* Static references to Next build assets and CSS were present.

No DATABASE_URL, env value, hostname, token, cookie, header, request body, response body, password, hash, provider value, storage value, or secret was printed or documented.

## Fixture Identity

| Field | Value |
|---|---|
| `participant_code` | `SANDBOX_M1_SYNTH_001` |
| `canonical_email` | `sandbox_m1_synth_001@bexauri.dev` |
| `program` | `PAES_M1` |
| `expected_content_key` | `paes_m1_balanced_entry_initial` |
| `expected_initial_studyload` | `PAES M1 - Entrada balanceada inicial` |

The identity is synthetic and contains no real participant data.

## State Inherited From 0K

0K sanitized evidence:

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

Stop condition inherited:

```text
login_failed_before_authenticated_identity_verification
```

## UI / Login Diagnostic

Read-only UI findings:

* The login page route exists at `app/login/page.tsx`.
* The login form exists at `app/login/_components/login-form.tsx`.
* The form uses NextAuth `signIn('credentials', { email, password, redirect: false })`.
* The form maps any NextAuth result error to visible text: `Invalid email or password`.
* `/login` rendered HTTP 200 and exposed expected sanitized markers: `login-form`, `login-email-input`, `login-password-input`, `login-submit-button`.
* The static source shows some text encoding artifacts in UI/auth files, including mojibake in a password placeholder source literal and in some Spanish strings/comments.
* The HTTP-rendered login placeholder appeared as bullet characters in the read-only response, so 0L did not prove that the source encoding artifact is the same defect observed manually in 0K.
* No read-only evidence showed that CSS/build failure alone caused the credential rejection.

UI classification:

```text
UI_LOGIN_VISUAL_DEFECT_PROBABLE_SECONDARY
```

Rationale:

The manual report from 0K is accepted as evidence of visual defects. Static inspection found encoding artifacts and no obvious missing login route. The read-only HTTP response showed the form present. The UI issue may need a later code/UI polish phase, but it is not the strongest explanation for invalid credentials.

## Auth Flow Diagnostic

Read-only auth findings:

* The active login form uses NextAuth CredentialsProvider, not the legacy `/api/auth/login` endpoint.
* CredentialsProvider lives in `lib/auth-options.ts`.
* The authorize path trims and lowercases the submitted email before `prisma.user.findUnique({ where: { email } })`.
* Login requires an existing `User.password` and a successful bcrypt comparison.
* The auth callback returns only `id`, `email`, and `name`.
* NextAuth is configured with JWT session strategy.
* No Account row is required for this credentials path.
* No StudentAccess row is required for this credentials path.
* If the user exists and `password` is present, a login failure most likely means the submitted private password did not match the stored bcrypt hash, or the private credential was not the value the operator believed was ready.

Auth classification:

```text
AUTH_CREDENTIAL_FLOW_PROBABLE
CREDENTIAL_PERSISTENCE_OR_CUSTODY_PROBABLE
```

Rationale:

The auth path is simple and bounded: normalized email plus bcrypt compare against `User.password`. 0L verified the target User exists and has a credential boolean set, but 0L did not and must not inspect, print, compare, or ask for the private password. Therefore the most likely blocker is credential custody/persistence mismatch, not missing StudentAccess or StudyLoad state.

## Fixture / User / Linkage Diagnostic

Read-only sanitized fixture check:

| Check | Sanitized result |
|---|---|
| User count for synthetic email | 1 |
| User email exact | yes |
| User name matches participant code | no |
| Credential ready boolean | yes |
| Account row count | 0 |
| Auth Session row count | 0 |
| Student count for synthetic email | 1 |
| Student email exact | yes |
| Student name matches participant code | yes |
| Student status | active |
| StudentAccess row count | 0 |
| PAES_M1 program found | yes |
| Active PAES_M1 enrollment count | 1 |
| Cycle count | 1 |
| Open Cycle 1 count | 1 |
| StudyLoad count | 1 |
| Pending practice StudyLoad count | 1 |
| Expected title visible in DB | yes |
| Tutoring session count | 0 |
| Response count | 0 |
| CycleDecision count | 0 |
| CycleEvaluation count | 0 |
| ContinuitySignal count | 0 |
| Second StudyLoad count | 0 |

Fixture classification:

```text
USER_STUDENT_LINKAGE_NOT_PRIMARY_BLOCKER
STUDYLOAD_FIXTURE_NOT_PRIMARY_BLOCKER
```

Rationale:

The current `/now` ownership path is email-based, and the synthetic User and Student share the expected canonical email. The User name mismatch is not used by the credentials authorization path and does not explain login failure by itself. The PAES_M1 enrollment, Cycle 1, and initial pending StudyLoad are present and clean, but 0K never reached them because login failed first.

## Evidence Textual Sanitized

Evidence collected in 0L:

* Git baseline clean and aligned with `9fcca47`.
* LOCAL_DEV treated as safely confirmed from previous phases.
* `/login` route responded with HTTP 200.
* Login form markers were present in the rendered HTML.
* Auth source uses NextAuth CredentialsProvider and bcrypt compare.
* Fixture DB state remains clean by counts and booleans.
* Credential is present only as a boolean state; no secret or hash was inspected.
* No authenticated session row was found.
* No learning execution evidence was found.

## Cause Probable Or Inconclusive

Primary cause classification:

```text
CREDENTIAL_PERSISTENCE_OR_CUSTODY_PROBABLE
```

Secondary classification:

```text
UI_LOGIN_VISUAL_DEFECT_PROBABLE_SECONDARY
```

Final 0L diagnosis:

```text
LOGIN_UI_AUTH_BLOCKER_DIAGNOSED_WITH_REPAIR_RECOMMENDATION
```

Interpretation:

The fixture is present, the User exists, the User credential field is non-empty, Student linkage by email is intact, and no StudentAccess or StudyLoad state explains the failed login. The most likely next repair is not schema/app architecture; it is a controlled private credential repair/re-application path for `SANDBOX_M1_SYNTH_001`, followed by a separately authorized login retry. Login UI visual defects should be tracked, but they are secondary unless a later phase reproduces a form usability blocker.

## Recommended Repair For 0M

Recommended next repair path:

```text
0M-DATA
```

Recommended phase:

```text
MVP-SALES-PILOT-SANDBOX-0M-DATA - Re-apply private credential readiness for SANDBOX_M1_SYNTH_001 without StudyLoad execution
```

0M-DATA should:

* keep Git and LOCAL_DEV preflight strict;
* avoid printing password, hash, env, DB URL, token, cookie, header, request body, response body, provider value, or storage value;
* re-apply or verify the private credential through the existing admin-mediated path or another explicitly authorized private path;
* keep all evidence sanitized as booleans/counts;
* not execute login, `/now`, StudyLoad, response, self-report, completion, or sandbox execution unless a later phase explicitly authorizes it;
* defer UI visual defect code repair unless the credential repair path proves login still fails or the login form is unusable.

If 0M-DATA confirms credential repair but a later login retry still fails, the subsequent likely path becomes `0M-CODE` or `0M-DIAG-EXTENDED` focused on NextAuth callback/session behavior and login UI rendering.

## Limits Respected

0L did not:

* repeat the manual smoke;
* execute student login;
* create an authenticated student session;
* open authenticated `/now`;
* open viewer;
* press `Empezar`;
* start a StudyLoad;
* select answers;
* submit responses;
* create MC submission;
* create self-report;
* complete a StudyLoad;
* verify continuity;
* create second StudyLoad;
* create or modify StudentAccess row;
* touch StudentAccess lifecycle;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging/production;
* mutate DB;
* reset or change the credential;
* change schema, seed, app code, auth, CredentialsProvider, Playwright, or tests.

## Stop Condition

No 0L stop condition blocked the read-only diagnosis.

Stop conditions preserved for later phases:

* dirty or divergent Git;
* ambiguous LOCAL_DEV target;
* need to print or share password/hash/env/DB URL/token/cookie/header/request-response body/storage;
* need to mutate DB outside an explicitly authorized phase;
* need to reset credential outside a credential phase;
* need to change code/schema to confirm a hypothesis;
* need to enter authenticated `/now` before authorization;
* any staging/production suspicion;
* any real participant data;
* any L1/M2 or payment/trial/subscription surface.

## Credential / Secret Safety

Credential safety:

* Password was not requested.
* Password was not printed.
* Password was not documented.
* Hash was not inspected or printed.
* No token, cookie, header, request body, response body, env value, DB URL, provider value, storage value, or secret was printed or documented.

## Scope Safety

Scope safety:

* The fixture check was read-only and sanitized.
* No DB mutation was performed.
* No authenticated route was used.
* No StudyLoad execution state changed.
* No app code or schema was changed.
* No staging or production target was used.

## Result Final

Final result:

```text
LOGIN_UI_AUTH_BLOCKER_DIAGNOSED_WITH_REPAIR_RECOMMENDATION
```

Result marker:

```text
MVP_SALES_PILOT_SANDBOX_0L_LOGIN_UI_AUTH_BLOCKER_DIAGNOSED_WITH_REPAIR_RECOMMENDATION
```

## Next Phase Recommended

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0M-DATA - Re-apply private credential readiness for SANDBOX_M1_SYNTH_001 without StudyLoad execution
```

Boundary:

* no login retry unless explicitly authorized later;
* no `/now`;
* no StudyLoad;
* no StudentAccess lifecycle;
* no staging/production;
* no secrets printed.
