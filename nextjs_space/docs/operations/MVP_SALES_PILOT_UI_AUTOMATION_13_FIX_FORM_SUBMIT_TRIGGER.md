# MVP-SALES-PILOT-UI-AUTOMATION-13 - Fix form submit trigger

## Baseline

```text
HEAD = origin/main = origin/HEAD = f6ca38c
```

Latest accepted commit:

```text
f6ca38c - MVP-SALES-PILOT-UI-AUTOMATION-12: run submit reachability diagnostic
```

## Objective

Fix the Playwright login form submit trigger for the readonly student E2E check so the real DOM submit path can be reached, without changing product auth, app routes, schema, DB state, StudyLoad state, or admin evidence paths.

## Inherited Result From UI-AUTOMATION-12

```text
DOM_SUBMIT_NOT_OBSERVED
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Safe inherited markers showed:

* one login form;
* email and password inputs inside the form;
* submit button inside the form;
* submit button type `submit`;
* fields filled;
* submit button enabled;
* `password-enter` attempted;
* DOM submit event count `0`;
* no `/api/auth/*` request;
* credentials callback not observed;
* browser remained on `/login`;
* no visible login error.

## Files Inspected

Read-only inspection covered:

* `nextjs_space/package.json`
* `nextjs_space/playwright.config.ts`
* `nextjs_space/tests/e2e/helpers/local-dev-guard.ts`
* `nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts`
* `nextjs_space/app/login/_components/login-form.tsx`
* `nextjs_space/app/login/page.tsx`
* `nextjs_space/app/api/auth/[...nextauth]/route.ts`
* `nextjs_space/lib/auth-options.ts`

No `.env` file contents, environment values, cookies, headers, tokens, storage, DB URLs, host/provider details, password, or hash were inspected or printed.

## Hypotheses Reviewed

* `passwordInput.press('Enter')` does not fire DOM submit for this login form under Playwright.
* A form-scoped submit button locator is safer than a page-wide button locator.
* A real click on the submit button inside the form is the next closest user-equivalent trigger.
* Additional safe diagnostics should report only active element category and submit button box visibility.
* If this still does not produce a DOM submit event, a product UI testability/accessibility phase may be needed, but not in this phase.

## E2E Change Implemented

Updated only E2E harness files:

```text
nextjs_space/tests/e2e/helpers/local-dev-guard.ts
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

Implementation summary:

* scoped the login submit button locator to the first `form`;
* changed the primary submit trigger from `password-enter` to real form submit button click;
* scrolls the form submit button into view before clicking;
* focuses the form submit button before clicking;
* keeps the DOM submit event probe;
* keeps sanitized `/api/auth/*` request observation;
* keeps credentials callback status observation;
* added safe active-element and submit-button-box diagnostics.

## Why Product Auth Did Not Change

The product login form already has:

* a client-side `onSubmit` handler;
* a submit button inside the form;
* CredentialsProvider auth through `signIn('credentials', { redirect: false })`.

This phase changed only how the E2E test triggers that existing form. It did not modify product UI, auth provider, auth route, middleware, schema, DB state, or runtime behavior.

## Safe Markers Maintained Or Added

Added:

```text
SAFE_E2E_ACTIVE_ELEMENT_BEFORE_SUBMIT
SAFE_E2E_SUBMIT_BUTTON_BOX_VISIBLE
SAFE_E2E_LOGIN_SUBMIT_TRIGGER: form-submit-button-click
SAFE_E2E_SUBMIT_BUTTON_RECEIVES_CLICK: attempted
```

Maintained:

```text
SAFE_E2E_LOGIN_FORM_STRUCTURE
SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED
SAFE_E2E_FORM_SUBMIT_EVENT_COUNT
SAFE_E2E_FORM_SUBMIT_EVENT_OBSERVED
SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS
SAFE_E2E_PATH_AFTER_LOGIN
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS
SAFE_E2E_LOGIN_DIAGNOSTIC
```

These markers do not include password, hash, env values, request body, response body, full URL, query string, headers, cookies, tokens, storage, DB URL, host/provider details, or real student data.

## `--list` Result

```text
PLAYWRIGHT_LIST_PASSED
```

## Authenticated Run Status

```text
IMPLEMENTED_NEEDS_HUMAN_RUN
```

Codex checked only presence booleans and did not print values:

```text
BEXAURI_E2E_BASE_URL present: false
BEXAURI_E2E_STUDENT_EMAIL present: false
BEXAURI_E2E_STUDENT_PASSWORD present: false
```

Codex did not run authenticated Playwright because the private synthetic password is not available in Codex's environment and must not be pasted into chat, reports, commits, or logs.

## Verification

Because TypeScript E2E helper/test code changed, Codex ran:

```text
npm.cmd run test:e2e:pilot:readonly -- --list
npm.cmd --prefix nextjs_space run build
```

Results:

```text
PLAYWRIGHT_LIST_PASSED
BUILD_PASSED
```

## Diagnostic Final

```text
FORM_SUBMIT_BUTTON_CLICK_TRIGGER_READY_FOR_PRIVATE_ENV_RUN
```

The next private-env run should determine whether the real button click causes:

* DOM submit event observed;
* `/api/auth/*` request observed;
* credentials callback observed;
* successful session and `/now` validation;
* or a more specific failure category.

## Risks Residuals

* The fix still needs a private-env authenticated run.
* If DOM submit is still not observed, the login markup may need a separate testability/accessibility review.
* If DOM submit is observed but no auth request appears, the next phase should diagnose the React handler/signIn path without exposing secrets.
* If auth request appears but session is not established, the next phase should classify callback status/session behavior without exposing secrets.

## Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-14 - Run form-submit-button-click Playwright check with private env
```

## Explicit Non-Actions

This phase did not:

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
MVP_SALES_PILOT_UI_AUTOMATION_13_FORM_SUBMIT_BUTTON_CLICK_TRIGGER_READY
```
