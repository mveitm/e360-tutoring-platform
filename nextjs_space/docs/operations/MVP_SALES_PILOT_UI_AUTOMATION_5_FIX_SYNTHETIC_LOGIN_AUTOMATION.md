# MVP-SALES-PILOT-UI-AUTOMATION-5 - Fix Synthetic Login Automation

## 1. Baseline

```text
HEAD = origin/main = origin/HEAD = 935b98a
```

Latest accepted commit:

```text
935b98a - MVP-SALES-PILOT-UI-AUTOMATION-4: run safe auth state diagnostic check
```

## 2. Objective

Diagnose and correct the local/dev Playwright login automation for the synthetic student without changing product authentication logic.

The target is the readonly student test:

```text
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

## 3. Result Inherited From UI-AUTOMATION-4

UI-AUTOMATION-4 classified the previous human-run diagnostic as:

```text
AUTH_NOT_ESTABLISHED_AFTER_LOGIN
```

Safe markers:

```text
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

Interpretation:

The automated test remained on `/login` after submitting the form and stopped before `/now` assertions. Manual login and runtime validation had already passed, so this phase treats the issue as Playwright login automation/timing, not as a confirmed product auth bug.

## 4. Hypotheses Reviewed

Reviewed:

* field labels/selectors mismatch;
* submit button mismatch;
* client-side `signIn` timing;
* post-login redirect timing;
* session establishment race before `/now`;
* missing or uncaptured login error;
* invalid private password possibility, without assuming it first.

Finding:

The login form labels and submit button match the test selectors. The material issue is that the product uses `signIn('credentials', { redirect: false })` and then `router.replace('/')`. The test was failing as soon as the browser remained on `/login`, before directly checking whether the credentials callback succeeded and whether `/now` accepted the newly established session.

## 5. Files Inspected

Inspected:

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

No `.env` files or secret-bearing values were inspected.

## 6. Changes Implemented

Updated:

```text
nextjs_space/tests/e2e/helpers/local-dev-guard.ts
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

Implemented:

* added safe observation of the credentials callback status via `waitForCredentialsCallbackStatus`;
* logged only the callback HTTP status category, not URL, headers, cookies, body, storage, or credentials;
* kept safe pathname logging;
* stopped treating `pathAfterLogin === /login` alone as final failure;
* checked visible login error categories after submit;
* failed explicitly if credentials callback status is a failure;
* navigated to `/now` after callback observation and let the app/middleware prove whether session state is established.

New safe marker:

```text
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS
```

## 7. Why This Does Not Change Product Auth

No app auth code changed.

The change is limited to the Playwright test harness and only adjusts how the test waits for and interprets the existing login flow:

* the same `/login` form is used;
* the same real submit button is clicked;
* the same NextAuth credentials callback is used;
* the test does not bypass login;
* the test does not inspect or reuse cookies/storage;
* the test does not add product test IDs or alter UI behavior.

## 8. Secret Guardrails

The updated test does not print:

* password;
* hash;
* env values;
* `.env`;
* DB URL;
* connection string;
* host;
* provider target;
* token;
* cookie;
* header;
* browser storage;
* full HTML.

## 9. `--list` Result

Codex ran:

```powershell
cd nextjs_space
npm.cmd run test:e2e:pilot:readonly -- --list
```

Result:

```text
PLAYWRIGHT_LIST_PASSED
```

## 10. Authenticated Run Status

Codex checked only presence booleans and did not print values:

```text
BEXAURI_E2E_BASE_URL present: false
BEXAURI_E2E_STUDENT_EMAIL present: false
BEXAURI_E2E_STUDENT_PASSWORD present: false
```

Authenticated run status:

```text
IMPLEMENTED_NEEDS_HUMAN_RUN
```

Safe human-run command for the next phase:

```powershell
cd C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space

$env:BEXAURI_E2E_BASE_URL = "http://localhost:3000"
$env:BEXAURI_E2E_STUDENT_EMAIL = "pilot.m1.001@example.invalid"
$env:BEXAURI_E2E_STUDENT_PASSWORD = "<PASSWORD_LOCAL_NO_PEGAR_EN_CHAT>"

npm.cmd run test:e2e:pilot:readonly

Remove-Item Env:\BEXAURI_E2E_BASE_URL
Remove-Item Env:\BEXAURI_E2E_STUDENT_EMAIL
Remove-Item Env:\BEXAURI_E2E_STUDENT_PASSWORD
```

Mauricio must paste only safe output markers and final pass/fail category.

## 11. Final Diagnosis

```text
PLAYWRIGHT_LOGIN_WAITING_LOGIC_FIXED_NEEDS_PRIVATE_ENV_RUN
```

The test now observes the credentials callback and then validates whether `/now` accepts the session. This should distinguish:

* callback not observed;
* callback failed;
* login error visible;
* callback appears successful but `/now` redirects back to `/login`;
* `/now` reached but copy mismatch;
* full readonly test pass.

## 12. Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-6 - Run corrected readonly student Playwright check with private env
```

If the corrected test still fails, the next phase should document the new safe marker category and avoid changing product auth unless a product bug is proven.

## 13. Explicit Non-Actions

This phase did not:

* change product auth logic;
* inspect `.env`;
* ask for, print, or store the private synthetic password;
* print env values, DB URLs, hosts, provider targets, hashes, tokens, cookies, headers, storage, or real data;
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

Result marker:

```text
MVP_SALES_PILOT_UI_AUTOMATION_5_LOGIN_AUTOMATION_WAIT_FIXED
```
