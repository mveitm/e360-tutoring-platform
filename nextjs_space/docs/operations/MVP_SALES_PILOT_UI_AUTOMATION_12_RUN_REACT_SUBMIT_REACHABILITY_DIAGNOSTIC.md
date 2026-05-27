# MVP-SALES-PILOT-UI-AUTOMATION-12 - Run React submit reachability diagnostic with private env

## Baseline

```text
HEAD = origin/main = origin/HEAD = e392596
```

Latest accepted commit:

```text
e392596 - MVP-SALES-PILOT-UI-AUTOMATION-11: diagnose login submit reachability
```

## Objective

Run the readonly Playwright student check with the E2E-only diagnostics added in UI-AUTOMATION-11, using private local synthetic env handled by Mauricio, to determine whether the login DOM submit occurs and whether the credentials auth flow is triggered.

## Relationship with UI-AUTOMATION-11

UI-AUTOMATION-11 added safe diagnostics for:

* login form structure;
* DOM submit event count;
* DOM submit event observed marker;
* sanitized auth request observation;
* credentials callback status marker.

No product auth, app routes, schema, or DB behavior were changed.

## Execution Mode

```text
human-run with private synthetic env
```

Codex did not have the private E2E password env and did not ask for it.

Codex verified only env presence/absence:

```text
BEXAURI_E2E_BASE_URL present: false
BEXAURI_E2E_STUDENT_EMAIL present: false
BEXAURI_E2E_STUDENT_PASSWORD present: false
```

## Test

```text
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

## Result --list

```text
passed
```

The Playwright list command found one readonly student test.

## Authenticated Diagnostic Run Result

```text
DOM_SUBMIT_NOT_OBSERVED
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

The authenticated run was performed by Mauricio with private local env. No password or secret material was pasted into Codex.

## Safe Markers Observed

```text
SAFE_E2E_LOGIN_FORM_STRUCTURE: {"formCount":1,"emailInsideForm":true,"passwordInsideForm":true,"submitButtonInsideForm":true,"submitButtonType":"submit"}
SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT: {"emailInputPresent":true,"passwordInputPresent":true,"submitButtonPresent":true,"submitButtonType":"submit","emailHasValue":true,"passwordHasValue":true,"submitButtonDisabled":false}
SAFE_E2E_LOGIN_SUBMIT_TRIGGER: password-enter
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED: yes
SAFE_E2E_FORM_SUBMIT_EVENT_COUNT: 0
SAFE_E2E_FORM_SUBMIT_EVENT_OBSERVED: no
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS: not-observed
SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT: none
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

## Interpretation

The form structure is correct and the fields are filled, but the DOM submit event is not observed. Therefore the current password-enter Playwright trigger did not reach the real form submit.

Because no `/api/auth/*` request and no credentials callback were observed, this is still a harness/submit-trigger problem. It is not a confirmed invalid credential issue, not a confirmed product auth failure, and not a `/now` product failure.

## What This Validated

* The login page exposes one form.
* The email input, password input, and submit button are inside the form.
* The submit button has type `submit`.
* The inputs were filled in the Playwright context.
* The submit button was enabled.
* The password-enter trigger was attempted.
* No DOM submit event was observed.
* No auth request was observed.
* The browser remained on `/login`.

## What This Did Not Validate

* Successful automated login.
* Authenticated `/now` content.
* Completed/pending StudyLoad visibility.
* Admin/tutor evidence.
* StudyLoad open/start/response/completion.

## What Was Not Printed

No password, hash, DB URL, host, provider, token, cookie, header, env value, `.env` value, storage value, or real student data was printed or committed.

## Mutations Avoided

No DB/manual mutation was performed. No StudyLoad action was performed. No admin evidence action was performed. No staging or production target was touched.

## Conclusion

```text
DOM_SUBMIT_NOT_OBSERVED
```

The next fix should stay inside the Playwright harness and use a more direct user-equivalent submit trigger, likely a real click on the submit button within the form or a form-scoped trigger that proves the DOM submit event fires. Product auth should remain unchanged.

## Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-13 - Fix Playwright form submit trigger after DOM submit not observed
```

## Explicit Non-Actions

* No product auth change.
* No app route change.
* No schema change.
* No DB mutation.
* No Prisma CLI or SQL.
* No `.env` inspection.
* No password, hash, DB URL, host, provider, token, cookie, header, storage, or env value printed.
* No browser human profile/session/cookie use.
* No staging or production.
* No StudyLoad open/start/response/completion.
* No admin evidence.
* No screenshots, videos, or traces committed.
* No real student data.
* No payment or public trial activation.
* No Sales-Ready declaration.
