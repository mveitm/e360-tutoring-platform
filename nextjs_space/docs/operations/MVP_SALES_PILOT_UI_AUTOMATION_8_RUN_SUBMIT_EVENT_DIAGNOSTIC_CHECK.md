# MVP-SALES-PILOT-UI-AUTOMATION-8 - Run submit-event diagnostic check

## Baseline

```text
HEAD = origin/main = origin/HEAD = d813012
Latest accepted commit: d813012 - MVP-SALES-PILOT-UI-AUTOMATION-7: diagnose login submit event
```

## Objective

Run the local/dev readonly student Playwright test with the safe submit-event diagnostics added in UI-AUTOMATION-7, using private local synthetic environment values, to determine whether the login form is ready, submit is attempted, `/api/auth/*` requests are observed, and the credentials callback is detected.

## Relationship With UI-AUTOMATION-7

UI-AUTOMATION-7 added E2E-only diagnostics:

* safe login form readiness booleans;
* safe submit-attempt marker;
* sanitized `/api/auth/*` request observation;
* normalized credentials callback matching;
* existing safe pathname and login diagnostic markers.

Product authentication was not modified.

## Execution Mode

```text
HUMAN_RUN_WITH_PRIVATE_SYNTHETIC_ENV
```

Codex verified that private E2E env values were not present in its execution environment and did not request or print any values. Mauricio ran the authenticated readonly Playwright test locally with private synthetic env and pasted only safe output.

## `--list` Result

Codex ran:

```powershell
cd nextjs_space
npm.cmd run test:e2e:pilot:readonly -- --list
```

Result:

```text
PLAYWRIGHT_LIST_PASSED
```

## Authenticated Diagnostic Run Result

Result classification:

```text
SUBMIT_ATTEMPTED_BUT_AUTH_REQUEST_NOT_OBSERVED
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Failure:

```text
The test remained on /login before /now assertions and threw AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS.
```

## Safe Markers Observed

```text
SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT: emailInputPresent=true, passwordInputPresent=true, submitButtonPresent=true, submitButtonType=submit, emailHasValue=true, passwordHasValue=true, submitButtonDisabled=false
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED: yes
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS: not-observed
SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT: none
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

The recorded marker above intentionally summarizes booleans and safe categories only. It does not include password, hash, env values, request body, response body, full URL, query string, headers, cookies, tokens, storage, DB URL, host/provider details, or real student data.

## Interpretation

The form was present and ready:

* email input present and filled;
* password input present and filled;
* submit button present;
* submit button type is `submit`;
* submit button was enabled;
* Playwright attempted submit.

However:

* no `/api/auth/*` request was observed after submit;
* credentials callback was not observed;
* the browser stayed on `/login`;
* no visible login error category was detected.

This points to the Playwright submit action not triggering the real login/auth request path, rather than confirmed invalid credentials or broken product auth.

## What It Validated

Validated:

* the readonly Playwright test is discoverable;
* the login form is reachable in the automated context;
* the E2E test can locate and fill the real labeled email/password fields;
* the test can locate an enabled submit button;
* safe diagnostics can distinguish form readiness from auth request emission.

## What It Did Not Validate

Did not validate:

* successful automated login;
* credentials callback success;
* authenticated `/now`;
* closed-pilot copy;
* completed StudyLoad visibility;
* self-report visibility;
* next pending M1 StudyLoad visibility;
* admin/tutor evidence.

## What Was Not Printed

Not printed or pasted:

* password;
* hash;
* DB URL;
* connection string;
* host;
* provider target;
* token;
* cookie;
* header;
* env value;
* `.env` value;
* storage value;
* request body;
* response body;
* real student data.

## Mutations Avoided

No DB/manual mutation was performed by the diagnostic run.

No StudyLoad action was performed:

* no StudyLoad open/start;
* no response submission;
* no completion;
* no admin evidence check.

No staging or production target was touched.

## Conclusion

```text
PLAYWRIGHT_SUBMIT_EVENT_NOT_TRIGGERING_AUTH_REQUEST
```

The next phase should adjust the E2E-only submit mechanism or instrumentation without changing product auth. Candidate investigation areas include form submit mechanics under Playwright, whether the button click reaches React `onSubmit`, whether pressing Enter triggers the auth path, and whether a safe fallback submit strategy is warranted.

## Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-9 - Fix E2E login submit trigger without product auth changes
```

## Explicit Non-Actions

This phase did not:

* modify test/harness code;
* change product auth;
* inspect `.env`;
* ask for, print, or store the private synthetic password;
* print env values, DB URLs, hosts, provider targets, hashes, tokens, cookies, headers, storage, request bodies, response bodies, or real data;
* run authenticated Playwright from Codex;
* use Mauricio's browser profile/session/cookies;
* mutate DB or app state;
* press StudyLoad actions;
* submit responses;
* complete StudyLoads;
* run admin evidence;
* touch staging or production;
* use real student data;
* activate payment or trial;
* declare Sales-Ready.

## Result Marker

```text
MVP_SALES_PILOT_UI_AUTOMATION_8_SUBMIT_ATTEMPTED_AUTH_REQUEST_NOT_OBSERVED
```
