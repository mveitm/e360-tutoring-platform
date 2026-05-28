# MVP-SALES-PILOT-UI-AUTOMATION-14 - Run form submit button click check

## Baseline

```text
HEAD = origin/main = origin/HEAD = 3bb1739
```

Latest accepted commit:

```text
3bb1739 - MVP-SALES-PILOT-UI-AUTOMATION-13: fix form submit trigger
```

## Objective

Run the readonly Playwright student check after the UI-AUTOMATION-13 harness change, using private local synthetic env handled by Mauricio, to determine whether a real click on the submit button scoped to the login form triggers DOM submit, emits `/api/auth/*`, and can proceed to `/now` validation without mutating state.

## Relationship With UI-AUTOMATION-13

UI-AUTOMATION-13 changed only the E2E harness:

* scoped the submit button locator to the first login form;
* changed the submit trigger from `password-enter` to `form-submit-button-click`;
* added safe markers for active element category, visible submit button box, submit trigger type, and click attempt.

No product auth, app route, schema, or DB behavior was changed.

## Execution Mode

```text
human-run with private synthetic env
```

Codex did not have the private E2E password env and did not ask for it. Codex checked only env presence/absence:

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
PLAYWRIGHT_LIST_PASSED
```

## Authenticated Diagnostic Run Result

```text
DOM_SUBMIT_NOT_OBSERVED_AFTER_FORM_SUBMIT_BUTTON_CLICK
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

The authenticated run was performed by Mauricio with private local env. No password or secret material was pasted into Codex.

## Classification

```text
DOM_SUBMIT_NOT_OBSERVED
```

## Safe Markers Observed

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
SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT: none
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

## Interpretation

The form structure is correct. The submit button is inside the form, visible, enabled, focused, and clicked. However, the DOM submit event is still not observed.

Because no `/api/auth/*` request and no credentials callback were observed, the test is still blocked before the CredentialsProvider path. This points to Playwright not activating the real form submit path yet. It is not a confirmed invalid credential issue, not a confirmed product auth failure, and not a `/now` product failure.

## What This Validated

* The login page exposes one form.
* The email input, password input, and submit button are inside the form.
* The submit button has type `submit`.
* The inputs were filled in the Playwright context.
* The submit button was enabled.
* The active element before submit was the submit button.
* The submit button had a visible bounding box.
* The form submit button click trigger was attempted.
* No DOM submit event was observed.
* No auth request was observed.
* The browser remained on `/login`.

## What This Did Not Validate

* Successful automated login.
* Credentials callback success or failure.
* Authenticated `/now` content.
* Closed PAES M1 pilot copy.
* Completed/pending StudyLoad visibility.
* Admin/tutor evidence.
* StudyLoad open/start/response/completion.

## What Was Not Printed

No password, hash, DB URL, host, provider, token, cookie, header, env value, `.env` value, storage value, or real student data was printed or committed.

## Mutations Avoided

No DB/manual mutation was performed. No StudyLoad action was performed. No admin evidence action was performed. No staging or production target was touched.

Generated Playwright `test-results` output was removed from the working tree and was not committed.

## Conclusion

```text
FORM_SUBMIT_BUTTON_CLICK_DID_NOT_TRIGGER_DOM_SUBMIT
```

The next phase should not assume a credentials or product auth failure. It should investigate the E2E/browser interaction path or testability/accessibility of the login form. A future phase may need to decide between adding a testability marker/attribute to the login UI, using a form-associated lower-level user action that still represents real interaction, or adding a safe unauthenticated test-only route only if explicitly authorized.

## Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-15 - Decide next login form testability path after button click did not submit
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
MVP_SALES_PILOT_UI_AUTOMATION_14_FORM_SUBMIT_CLICK_STILL_NO_DOM_SUBMIT
```
