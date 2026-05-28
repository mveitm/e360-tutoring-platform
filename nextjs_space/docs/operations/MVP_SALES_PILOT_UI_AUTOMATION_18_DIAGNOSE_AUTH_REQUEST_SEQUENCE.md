# MVP-SALES-PILOT-UI-AUTOMATION-18 - Diagnose auth request sequence

## 1. Baseline

```text
HEAD = origin/main = origin/HEAD = 32ede12
```

Latest accepted commit:

```text
32ede12 - MVP-SALES-PILOT-UI-AUTOMATION-17: run login testability selector check
```

## 2. Objective

Diagnose, without exposing secrets, which sanitized auth request sequence Playwright observes after stable login selectors were added, and decide whether there is a concrete harness fix or whether to pause the login E2E line and return to pilot/admin evidence work.

## 3. Inherited Result From UI-AUTOMATION-17

UI-AUTOMATION-17 result:

```text
DOM_SUBMIT_NOT_OBSERVED_AFTER_TESTABILITY_SELECTORS
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Safe inherited observations:

* stable login selectors were used;
* form and inputs were present and filled;
* submit button was visible, enabled, focused, and clicked;
* DOM submit count stayed `0`;
* credentials callback was not observed;
* browser remained on `/login`;
* no visible login error was observed.

## 4. E2E-Only Changes Implemented

Updated only Playwright E2E diagnostics:

```text
nextjs_space/tests/e2e/helpers/local-dev-guard.ts
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

Changes:

* categorized `/api/auth/*` request paths into safe labels only;
* added sanitized auth request count;
* added sanitized auth request sequence;
* added booleans for credentials callback, session, csrf, and providers requests;
* removed path-level auth request output from the primary marker;
* preserved readonly behavior and existing form/submit/path diagnostics.

No product auth, CredentialsProvider, app routes, schema, DB, StudyLoad, or admin code was changed.

## 5. Safe Markers Added

```text
SAFE_E2E_AUTH_REQUEST_COUNT
SAFE_E2E_AUTH_REQUEST_SEQUENCE
SAFE_E2E_CREDENTIALS_CALLBACK_OBSERVED
SAFE_E2E_SESSION_REQUEST_OBSERVED_AFTER_SUBMIT
SAFE_E2E_CSRF_REQUEST_OBSERVED_AFTER_SUBMIT
SAFE_E2E_PROVIDERS_REQUEST_OBSERVED_AFTER_SUBMIT
```

The markers do not print full URLs, query strings, request bodies, response bodies, headers, cookies, storage, tokens, credentials, input values, or HTML.

## 6. Result --list

```text
PLAYWRIGHT_LIST_PASSED
```

Command:

```text
npm.cmd --prefix nextjs_space run test:e2e:pilot:readonly -- --list
```

## 7. Authenticated Diagnostic Run

Execution mode:

```text
human-run with private synthetic env
```

Codex did not have the private E2E password env and did not ask for it.

Authenticated run result:

```text
DOM_SUBMIT_NOT_OBSERVED_WITH_AUTH_PREFLIGHT_ONLY
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Safe markers observed:

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
SAFE_E2E_AUTH_REQUEST_COUNT: 0
SAFE_E2E_AUTH_REQUEST_SEQUENCE: none
SAFE_E2E_CREDENTIALS_CALLBACK_OBSERVED: no
SAFE_E2E_SESSION_REQUEST_OBSERVED_AFTER_SUBMIT: no
SAFE_E2E_CSRF_REQUEST_OBSERVED_AFTER_SUBMIT: no
SAFE_E2E_PROVIDERS_REQUEST_OBSERVED_AFTER_SUBMIT: no
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS: not-observed
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

## 8. Final Classification

```text
DOM_SUBMIT_NOT_OBSERVED_WITH_AUTH_PREFLIGHT_ONLY
```

Rationale:

* The form and controls are reachable through stable selectors.
* The click trigger is attempted against the visible enabled submit button.
* DOM submit event count remains `0`.
* No auth request was observed by the new sanitized recorder after submit.
* Credentials callback was not observed.
* Browser remained on `/login`.

## 9. Auth Request Sequence Interpretation

The diagnostic did not observe a post-submit auth sequence:

```text
SAFE_E2E_AUTH_REQUEST_SEQUENCE: none
```

Therefore the current blocker remains before CredentialsProvider credential evaluation. The run does not prove invalid credentials, a product auth failure, a `/now` failure, or a DB issue.

The evidence also does not reveal a clear next harness-only fix. Stable selectors, button click, focus, visible button box, filled inputs, and DOM submit probing have all been exercised without reaching a DOM submit event.

## 10. Fix Clarity

```text
NO_CLEAR_HARNESS_FIX_AFTER_AUTH_SEQUENCE_DIAGNOSIS
```

Continuing to patch login E2E triggers would be low-yield unless a new concrete hypothesis appears.

## 11. Recommended Decision

```text
PAUSE_LOGIN_E2E_AUTOMATION_FOR_NOW
RETURN_TO_ADMIN_EVIDENCE
```

Reason:

* the local/dev student runtime path already passed manually;
* the login E2E issue is isolated automation debt;
* further blind login trigger work risks consuming phases without moving pilot evidence forward;
* admin evidence is the next product-readiness gap.

## 12. Residual Risks

* Authenticated Playwright login remains unresolved.
* Future E2E work may need a separate decision phase for deeper testability or an explicitly guarded local/dev session strategy.
* Manual login remains the safe path for student runtime checks until login automation is revisited.

## 13. Recommended Next Phase

```text
MVP-SALES-PILOT-ADMIN-EVIDENCE-1 - Verify local admin/tutor evidence for PILOT_M1_001 dry-run
```

## 14. Explicit Non-Actions

This phase did not:

* change product auth;
* change CredentialsProvider;
* create a test-only auth/session route;
* change app routes;
* change schema;
* mutate DB;
* run Prisma CLI or SQL;
* inspect `.env`;
* ask for, print, or store the private synthetic password;
* print env values, DB URLs, hosts, provider targets, hashes, tokens, cookies, headers, storage, request bodies, response bodies, full URLs with query strings, or real data;
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
MVP_SALES_PILOT_UI_AUTOMATION_18_AUTH_SEQUENCE_DIAGNOSED_LOGIN_E2E_PAUSED
```
