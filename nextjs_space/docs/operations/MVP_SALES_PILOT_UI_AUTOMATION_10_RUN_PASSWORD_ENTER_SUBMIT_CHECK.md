# MVP-SALES-PILOT-UI-AUTOMATION-10 - Run password-enter submit check

## Baseline

```text
HEAD = origin/main = origin/HEAD = 45617de
Latest accepted commit: 45617de - MVP-SALES-PILOT-UI-AUTOMATION-9: fix E2E login submit trigger
```

## Objective

Run the readonly student Playwright test after changing the E2E login submit trigger to `password-enter`, using private local synthetic env, to determine whether the real CredentialsProvider auth flow is triggered and whether `/now` can be validated without mutating state.

## Relationship With UI-AUTOMATION-9

UI-AUTOMATION-9 changed only the E2E test:

* waits for the login page to load;
* focuses the password field;
* submits with `passwordInput.press('Enter')`;
* adds safe marker `SAFE_E2E_LOGIN_SUBMIT_TRIGGER: password-enter`.

No product auth, app routes, schema, or DB behavior changed.

## Execution Mode

```text
HUMAN_RUN_WITH_PRIVATE_SYNTHETIC_ENV
```

Codex verified that private E2E env values were not present in its execution environment and did not request or print values. Mauricio ran the authenticated readonly Playwright test locally and pasted only safe output.

The initial pasted PowerShell transcript included a failed partial `cd` attempt before the run. The working directory was already:

```text
C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space
```

The test command then ran from the intended local/dev app directory.

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
SUBMIT_TRIGGER_STILL_NOT_FIRING
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Failure:

```text
The test remained on /login before /now assertions and threw AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS.
```

## Safe Markers Observed

```text
SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT: emailInputPresent=true, passwordInputPresent=true, submitButtonPresent=true, submitButtonType=submit, emailHasValue=true, passwordHasValue=true, submitButtonDisabled=false
SAFE_E2E_LOGIN_SUBMIT_TRIGGER: password-enter
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED: yes
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS: not-observed
SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT: none
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

The output did not include password, hash, DB URL, host/provider, token, cookie, header, env value, `.env` value, storage value, request body, response body, or real student data.

## Interpretation

The `password-enter` trigger did not change the failure category:

* the form is present and ready;
* fields have values;
* the submit button is enabled;
* the test attempted submit using `password-enter`;
* no `/api/auth/*` request was observed;
* credentials callback was not observed;
* the browser stayed on `/login`;
* no visible login error category was detected.

This keeps the diagnosis focused on the Playwright/browser event path not triggering the real React `onSubmit`/NextAuth request path in the E2E context. It is still not evidence of invalid credentials or broken product auth.

## What It Validated

Validated:

* the test is discoverable;
* `password-enter` submit path executes in Playwright;
* safe markers report the trigger used;
* no auth request is emitted with this trigger in the current E2E context.

## What It Did Not Validate

Did not validate:

* successful automated login;
* credentials callback success or failure;
* authenticated `/now`;
* closed PAES M1 pilot copy;
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

No DB/manual mutation was performed by the test.

No StudyLoad action was performed:

* no StudyLoad open/start;
* no response submission;
* no completion;
* no admin evidence check.

No staging or production target was touched.

Generated Playwright `test-results` output was removed from the working tree and was not committed.

## Conclusion

```text
PASSWORD_ENTER_DID_NOT_TRIGGER_AUTH_REQUEST
```

The next phase should remain E2E-only and diagnose why React submit is not reached from Playwright despite valid form state. A conservative next step is to add safe browser-console/error diagnostics and an E2E-only submit-path probe, still without printing credentials, request bodies, cookies, headers, storage, or page HTML.

## Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-11 - Diagnose React submit handler reachability in Playwright without product auth changes
```

## Explicit Non-Actions

This phase did not:

* modify test/harness code;
* change product auth;
* change app routes;
* change schema;
* mutate DB;
* run Prisma CLI or SQL;
* inspect `.env`;
* ask for, print, or store the private synthetic password;
* print env values, DB URLs, hosts, provider targets, hashes, tokens, cookies, headers, storage, request bodies, response bodies, or real data;
* run authenticated Playwright from Codex;
* use Mauricio's browser profile/session/cookies;
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
MVP_SALES_PILOT_UI_AUTOMATION_10_PASSWORD_ENTER_STILL_NO_AUTH_REQUEST
```
