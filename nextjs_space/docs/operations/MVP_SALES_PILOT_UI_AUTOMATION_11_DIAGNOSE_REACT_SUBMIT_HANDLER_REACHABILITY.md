# MVP-SALES-PILOT-UI-AUTOMATION-11 - Diagnose React submit handler reachability

## Baseline

```text
HEAD = origin/main = origin/HEAD = bd88b39
Latest accepted commit: bd88b39 - MVP-SALES-PILOT-UI-AUTOMATION-10: run password enter submit check
```

## Objective

Diagnose whether Playwright reaches the login form submit event before the CredentialsProvider auth request path, without changing product auth, app routes, schema, DB state, StudyLoad state, or admin evidence paths.

## Inherited Result From UI-AUTOMATION-10

```text
SUBMIT_TRIGGER_STILL_NOT_FIRING
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Prior safe diagnostics showed:

* login form ready;
* email/password fields filled;
* submit button enabled;
* `password-enter` submit attempted;
* no `/api/auth/*` request observed;
* credentials callback not observed;
* browser stayed on `/login`;
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

* The form structure may not match the assumed field/button containment.
* The DOM submit event may not fire even when Playwright presses Enter.
* The DOM submit event may fire, but React/NextAuth may not emit `/api/auth/*`.
* The event path may be blocked by hydration/timing.
* The issue may require a test-only submit-path adjustment, but product auth should not change unless a separate phase authorizes it.

## E2E-Only Diagnostics Implemented

Updated only E2E harness files:

```text
nextjs_space/tests/e2e/helpers/local-dev-guard.ts
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

Implemented:

* safe form structure diagnostic:
  * form count;
  * whether email input is inside the form;
  * whether password input is inside the form;
  * whether submit button is inside the form;
  * submit button type.
* safe DOM submit event probe:
  * installs a capturing `submit` listener;
  * counts submit events only;
  * does not read form values.
* test output markers for submit event count and observed yes/no category.

## New Safe Markers

```text
SAFE_E2E_LOGIN_FORM_STRUCTURE
SAFE_E2E_FORM_SUBMIT_EVENT_COUNT
SAFE_E2E_FORM_SUBMIT_EVENT_OBSERVED
```

Existing safe markers remain:

```text
SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT
SAFE_E2E_LOGIN_SUBMIT_TRIGGER
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED
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
REACHABILITY_DIAGNOSTICS_IMPLEMENTED
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

## Diagnostic Final Or Pending State

```text
REACHABILITY_DIAGNOSTICS_READY_FOR_PRIVATE_ENV_RUN
```

The next human-run check should distinguish:

* DOM submit event not observed;
* DOM submit event observed but no `/api/auth/*` request;
* auth request observed but credentials callback/session fails;
* full readonly test pass.

## Why Product Auth Did Not Change

The product login form already has a client-side `onSubmit` handler and uses `signIn('credentials', { redirect: false })`.

This phase only adds E2E-side observation of form structure and DOM submit events. It does not alter product UI, auth provider, middleware, schema, DB state, or runtime behavior.

## Risks Residuals

* The authenticated run still requires private local env.
* If the DOM submit event is not observed, the next phase should adjust the E2E trigger path.
* If the DOM submit event is observed but no auth request appears, a safe browser console/error diagnostic may be needed.
* If auth request appears but session is not established, the next phase should classify callback status and session behavior without exposing secrets.

## Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-12 - Run React submit reachability diagnostic with private env
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
MVP_SALES_PILOT_UI_AUTOMATION_11_REACT_SUBMIT_REACHABILITY_DIAGNOSTICS_READY
```
