# MVP-SALES-PILOT-UI-AUTOMATION-17 - Run login testability selector check

## 1. Baseline

```text
HEAD = origin/main = origin/HEAD = 3815001
```

Latest accepted commit:

```text
3815001 - MVP-SALES-PILOT-UI-AUTOMATION-16: add login testability selectors
```

## 2. Objective

Run the readonly Playwright student check after adding stable login testability selectors, using private local synthetic env handled by Mauricio, to determine whether real-UI login now reaches the CredentialsProvider flow and validates `/now` without mutating state.

## 3. Relationship With UI-AUTOMATION-16

UI-AUTOMATION-16 added stable selectors to the real login UI:

```text
login-form
login-email-input
login-password-input
login-submit-button
```

It also updated the readonly Playwright spec to use those selectors. It did not change product auth, CredentialsProvider, auth routes, schema, DB, or the real login flow.

## 4. Execution Mode

```text
human-run with private synthetic env
```

Codex did not have the private E2E password env and did not ask for it. Codex checked only env presence/absence:

```text
BEXAURI_E2E_BASE_URL present: false
BEXAURI_E2E_STUDENT_EMAIL present: false
BEXAURI_E2E_STUDENT_PASSWORD present: false
```

## 5. Result --list

```text
PLAYWRIGHT_LIST_PASSED
```

Command:

```text
npm.cmd run test:e2e:pilot:readonly -- --list
```

## 6. Authenticated Diagnostic Run Result

```text
DOM_SUBMIT_NOT_OBSERVED_AFTER_TESTABILITY_SELECTORS
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

The authenticated run was performed by Mauricio with private local env. No password or secret material was pasted into Codex.

## 7. Classification

```text
DOM_SUBMIT_NOT_OBSERVED_AFTER_TESTABILITY_SELECTORS
```

## 8. Safe Markers Observed

```text
SAFE_E2E_LOGIN_FORM_STRUCTURE: {"formCount":1,"emailInsideForm":true,"passwordInsideForm":true,"submitButtonInsideForm":true,"submitButtonType":"submit"}
SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT: {"emailInputPresent":true,"passwordInputPresent":true,"submitButtonPresent":true,"submitButtonType":"submit","emailHasValue":true,"passwordHasValue":true,"submitButtonDisabled":false}
SAFE_E2E_ACTIVE_ELEMENT_BEFORE_SUBMIT: submit-button
SAFE_E2E_SUBMIT_BUTTON_BOX_VISIBLE: yes
SAFE_E2E_LOGIN_SUBMIT_TRIGGER: form-submit-button-click
SAFE_E2E_SUBMIT_BUTTON_RECEIVES_CLICK: attempted
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED: yes
SAFE_E2E_FORM_SUBMIT_EVENT_COUNT: 0
SAFE_E2E_FORM_SUBMIT_EVENT_OBSERVED: no
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS: not-observed
SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT: GET /api/auth/providers, POST /api/auth/_log, GET /api/auth/error
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

## 9. Interpretation

The stable testability selectors allowed Playwright to target the intended form, inputs, and submit button. The form structure remained coherent and the submit button was visible, enabled, focused, and clicked.

However, DOM submit event count remained `0`, the credentials callback was not observed, and the browser remained on `/login`.

New information from this run:

* Playwright observed safe auth-related requests after submit.
* The credentials callback was still not observed.
* No visible login error was detected.

This continues to point to an E2E login interaction/reachability problem before a confirmed CredentialsProvider credential decision. It is not a confirmed invalid credential issue, not a confirmed product auth failure, and not a `/now` product failure.

## 10. What This Validated

* The login selector update is present in the runtime UI.
* The readonly spec can locate the intended login form and controls.
* The inputs are filled in the Playwright context.
* The submit button is inside the form, enabled, visible, focused, and clicked.
* Auth-related requests can now be observed safely.
* The specific credentials callback is still not observed.

## 11. What This Did Not Validate

* Successful automated login.
* Credentials callback success or failure.
* Authenticated `/now` content.
* Closed PAES M1 pilot copy.
* Completed/pending StudyLoad visibility.
* Admin/tutor evidence.
* StudyLoad open/start/response/completion.

## 12. What Was Not Printed

No password, hash, DB URL, host, provider, token, cookie, header, env value, `.env` value, storage value, request body, response body, or real student data was printed or committed.

## 13. Mutations Avoided

No DB/manual mutation was performed. No StudyLoad action was performed. No admin evidence action was performed. No staging or production target was touched.

Generated Playwright `test-results` output was removed from the working tree and was not committed.

## 14. Conclusion

```text
LOGIN_TESTABILITY_SELECTORS_DID_NOT_REACH_DOM_SUBMIT_OR_CREDENTIALS_CALLBACK
```

The next phase should diagnose why clicking the now-stable real submit button produces safe auth-related requests but no DOM submit event and no credentials callback. It should not assume a product auth failure or invalid credentials yet.

## 15. Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-18 - Diagnose auth request sequence after login testability selectors
```

## 16. Explicit Non-Actions

This phase did not:

* modify test/harness code;
* change product auth;
* change CredentialsProvider;
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
MVP_SALES_PILOT_UI_AUTOMATION_17_LOGIN_TESTABILITY_SELECTOR_CHECK_FAILED_SAFE
```
