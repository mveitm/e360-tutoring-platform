# MVP-SALES-PILOT-UI-AUTOMATION-7 - Diagnose Playwright login submit event

## Baseline

```text
HEAD = origin/main = origin/HEAD = e31ff89
Latest accepted commit: e31ff89 - MVP-SALES-PILOT-UI-AUTOMATION-6: run corrected readonly student check
```

## Objective

Diagnose and improve the local/dev Playwright readonly student login automation so the harness can distinguish whether the login form is ready, whether submit is attempted, whether auth requests are emitted, and whether the credentials callback is observed.

This phase does not change product authentication logic.

## Inherited Result From UI-AUTOMATION-6

```text
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
CREDENTIALS_CALLBACK_NOT_OBSERVED
```

Safe markers from the prior human-run check:

```text
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS: not-observed
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

The manual local/dev login path had previously passed, so this phase treats the issue as E2E automation or callback observation mismatch, not as a confirmed product auth defect.

## Files Inspected

Read-only inspection covered:

* `nextjs_space/package.json`
* `nextjs_space/playwright.config.ts`
* `nextjs_space/tests/e2e/helpers/local-dev-guard.ts`
* `nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts`
* `nextjs_space/app/login/_components/login-form.tsx`
* `nextjs_space/app/login/page.tsx`
* `nextjs_space/app/api/auth/login/route.ts`
* `nextjs_space/app/api/auth/[...nextauth]/route.ts`
* `nextjs_space/lib/auth-options.ts`
* `nextjs_space/middleware.ts`

No `.env` file contents, environment values, cookies, headers, tokens, storage, DB URLs, host/provider details, password, or hash were inspected or printed.

## Hypotheses Reviewed

* The Playwright test may not be filling the real email/password fields.
* The button clicked may not be the effective submit path.
* The credentials callback path may include URL shape details not matched by the previous exact path check.
* The callback may not be emitted because submit is not triggered.
* The callback may be emitted but not observed by the previous narrow wait.
* The form may have no visible error while still failing to establish session.

## Changes Implemented

Only E2E harness files changed.

`nextjs_space/tests/e2e/helpers/local-dev-guard.ts` now includes:

* normalized pathname matching for auth callback observation;
* a safe auth request recorder that records only HTTP method and sanitized `/api/auth/*` pathname;
* a safe login form state helper that reports only booleans and submit button type.

`nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts` now:

* waits for email field, password field, and submit button visibility;
* fills credentials without printing values;
* logs safe form readiness booleans before submit;
* fails early with `LOGIN_FORM_NOT_READY_FOR_SUBMIT` if the form is not ready;
* logs `SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED: yes` after click;
* logs safe auth request summary after submit;
* keeps existing safe callback, pathname, and login diagnostic markers.

## New Safe Diagnostics

The next human-run authenticated check can now distinguish:

```text
SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED
SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS
SAFE_E2E_PATH_AFTER_LOGIN
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS
SAFE_E2E_LOGIN_DIAGNOSTIC
```

These markers do not include passwords, hashes, env values, URLs with query strings, request bodies, response bodies, headers, cookies, tokens, storage, DB URLs, host/provider details, or real student data.

## Why Product Auth Did Not Change

The inspected product login form already has labeled email/password fields, a real submit button, and a CredentialsProvider flow through `signIn('credentials', { redirect: false })`.

The phase goal was to diagnose automation behavior. No application auth logic, routes, schema, middleware, or credentials behavior was changed.

## Verification

```text
npm.cmd run test:e2e:pilot:readonly -- --list
```

Result:

```text
PLAYWRIGHT_LIST_PASSED
```

Build was also run because TypeScript E2E helper/test code changed:

```text
npm.cmd --prefix nextjs_space run build
BUILD_PASSED
```

## Authenticated Run Status

```text
IMPROVED_DIAGNOSTICS_READY_FOR_HUMAN_RUN
```

Codex did not run the authenticated test because the private synthetic password was not available in the Codex execution environment and must not be pasted into chat, reports, commits, or logs.

## Diagnostic Final

The harness now provides enough safe markers to identify whether the next failure is:

* form not ready;
* submit not attempted;
* no auth request emitted;
* auth request emitted but credentials callback not observed;
* credentials callback observed with non-success status;
* session still not established before `/now`;
* `/now` reached with copy mismatch.

## Risks Residuals

* The authenticated run still requires Mauricio to execute with private local env.
* If the next run records no auth requests after submit, the likely next step is a targeted E2E submit mechanism adjustment.
* If auth requests are present but no credentials callback is observed, the next step is to adapt callback observation to the actual safe auth path.
* If the callback succeeds but `/now` redirects to `/login`, session establishment or cookie handling needs a separate E2E-only diagnostic.

## Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-8 - Run submit-event diagnostic Playwright check with private env
```

## Explicit Non-Actions

* No product auth change.
* No app route or schema change.
* No DB mutation.
* No Prisma CLI or SQL.
* No StudyLoad open/start/response/completion.
* No admin evidence.
* No staging or production.
* No browser human profile/session/cookie use.
* No screenshots, videos, or traces enabled.
* No `.env` inspection.
* No password, hash, DB URL, host/provider, token, cookie, header, env value, storage, or real student data printed.

## Result Marker

```text
MVP_SALES_PILOT_UI_AUTOMATION_7_SUBMIT_EVENT_DIAGNOSTICS_READY
```
