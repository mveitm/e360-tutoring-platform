# MVP-SALES-PILOT-UI-AUTOMATION-9 - Fix E2E login submit trigger

## Baseline

```text
HEAD = origin/main = origin/HEAD = dcc9f69
Latest accepted commit: dcc9f69 - MVP-SALES-PILOT-UI-AUTOMATION-8: run submit event diagnostic check
```

## Objective

Fix the Playwright E2E login submit trigger for the local/dev readonly student check without changing product auth, application routes, schema, DB state, StudyLoad state, or admin evidence paths.

## Inherited Result From UI-AUTOMATION-8

```text
SUBMIT_ATTEMPTED_BUT_AUTH_REQUEST_NOT_OBSERVED
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Safe interpretation from UI-AUTOMATION-8:

* the login form was present;
* email and password fields were present and filled;
* the submit button was present, type `submit`, and enabled;
* Playwright attempted submit;
* no `/api/auth/*` request was observed;
* the credentials callback was not observed;
* the browser remained on `/login`;
* no visible login error category was detected.

This phase treats the failure as an E2E submit trigger problem, not as confirmed invalid credentials or a product auth defect.

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

* The previous button click did not activate the real React `onSubmit` path under Playwright.
* The form can be submitted more realistically by focusing the password field and pressing `Enter`.
* The test should wait for the login page to become stable before interacting.
* The request observer and credentials callback observer must be armed before submit.
* If the `Enter` trigger emits auth requests, the next private-env run should distinguish callback success, callback failure, session failure, or `/now` copy mismatch.

## E2E Change Implemented

Updated only:

```text
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

Changes:

* load `/login` with `waitUntil: domcontentloaded`;
* wait for `networkidle` after login page load before filling fields;
* keep existing safe form readiness checks;
* arm safe auth request and credentials callback observers before submit;
* focus the password input;
* submit with `passwordInput.press('Enter')`;
* log a safe submit trigger marker:

```text
SAFE_E2E_LOGIN_SUBMIT_TRIGGER: password-enter
```

The existing safe marker remains:

```text
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED: yes
```

## Why Product Auth Did Not Change

The product login form already uses a real `onSubmit` handler and CredentialsProvider via `signIn('credentials', { redirect: false })`.

This phase changed only how the E2E test triggers the existing form. It did not modify:

* login UI;
* auth provider;
* auth route;
* middleware;
* schema;
* DB state;
* app runtime behavior.

## Safe Markers Added Or Adjusted

New marker:

```text
SAFE_E2E_LOGIN_SUBMIT_TRIGGER: password-enter
```

Existing markers preserved:

```text
SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT
SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED
SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS
SAFE_E2E_PATH_AFTER_LOGIN
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS
SAFE_E2E_LOGIN_DIAGNOSTIC
```

These markers do not include password, hash, env values, request body, response body, full URL, query string, headers, cookies, tokens, storage, DB URL, host/provider details, or real student data.

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

Codex did not run the authenticated test because the private synthetic password was not available in the Codex execution environment and must not be pasted into chat, reports, commits, or logs.

## Verification

Because TypeScript E2E test code changed, Codex ran:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
BUILD_PASSED
```

## Diagnostic Final

```text
E2E_SUBMIT_TRIGGER_CHANGED_TO_PASSWORD_ENTER_NEEDS_PRIVATE_ENV_RUN
```

The next human-run check should determine whether `password-enter` causes `/api/auth/*` requests and credentials callback observation.

## Risks Residuals

* The fix still needs a private-env authenticated run.
* If no auth request is observed after `password-enter`, a deeper E2E-only inspection of React event delivery may be needed.
* If auth request is observed but auth still fails, the next phase should classify the safe callback status without exposing secrets.
* If callback succeeds but `/now` redirects to `/login`, session/cookie establishment in the Playwright context needs a separate E2E-only diagnostic.

## Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-10 - Run password-enter submit Playwright check with private env
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
MVP_SALES_PILOT_UI_AUTOMATION_9_PASSWORD_ENTER_SUBMIT_TRIGGER_READY
```
