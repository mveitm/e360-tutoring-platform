# MVP-SALES-PILOT-UI-AUTOMATION-3 - Safe Auth-State Diagnostics

## 1. Baseline

```text
HEAD = origin/main = origin/HEAD = 269a262
```

Latest accepted commit:

```text
269a262 - MVP-SALES-PILOT-UI-AUTOMATION-2: run readonly student Playwright check
```

## 2. Objective

Add safe diagnostics to the local/dev Playwright readonly student check so the next run can distinguish whether the failure after automated login is caused by auth not being established, redirect back to `/login`, unexpected navigation, or `/now` copy mismatch.

This phase does not run a mutating student flow and does not use Mauricio's browser session, profile, cookies, or credentials.

## 3. Result Inherited From UI-AUTOMATION-2

UI-AUTOMATION-2 produced a safe human-run failure:

```text
READONLY_STUDENT_CHECK_FAILED_BEFORE_NOW_VALIDATION
```

Safe summary:

* Playwright started and Chromium launched.
* The test failed before validating `/now` content.
* The expected text `Piloto cerrado PAES M1` was not found.
* No secrets were printed.
* No staging/prod was touched.
* No DB/manual mutation was performed.
* No StudyLoad action was executed.

Manual runtime validation before UI automation had passed for `PILOT_M1_001`, so this phase treats the failure as a test/auth-state diagnostic problem, not as product evidence of a broken student flow.

## 4. Diagnostic Hypotheses

The next readonly test run now needs to separate these cases:

* automated login did not establish auth;
* the browser stayed on `/login`;
* the browser reached another safe local path instead of `/now`;
* `/now` loaded but the expected copy was absent;
* selectors or copy expectations need adjustment.

## 5. Changes Implemented

Updated:

```text
nextjs_space/tests/e2e/helpers/local-dev-guard.ts
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

Implemented safe helper functions:

* `safePathname()` returns only URL pathname, never query params or full URLs.
* `getSafeLoginDiagnostic()` reports only coarse login states.
* `getSafeVisibleHeadings()` reports a limited set of visible headings, not full page HTML.

Updated the readonly student test to emit only safe diagnostic markers:

```text
SAFE_E2E_PATH_AFTER_LOGIN
SAFE_E2E_LOGIN_DIAGNOSTIC
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS
SAFE_E2E_PATH_AT_COPY_FAILURE
SAFE_E2E_VISIBLE_HEADINGS
```

The test now fails with explicit safe categories such as:

```text
AUTH_NOT_ESTABLISHED_AFTER_LOGIN
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
UNEXPECTED_PATH_BEFORE_NOW_ASSERTIONS
NOW_COPY_NOT_FOUND_AFTER_AUTHENTICATED_NAVIGATION
```

## 6. Secret Guardrails

The diagnostics do not print:

* password;
* hash;
* `.env` values;
* DB URL;
* connection string;
* host or provider target;
* token;
* cookie;
* header;
* browser storage;
* full page HTML.

The test still uses isolated Playwright browser context only and does not use Mauricio's browser session.

## 7. What The Test Now Diagnoses

The next authenticated run can distinguish:

* whether login leaves the browser on `/login`;
* whether `/now` is reached before copy assertions;
* whether the page lands on an unexpected local path;
* whether `/now` is reached but expected copy is absent;
* which safe visible headings are present when copy is missing.

## 8. What The Test Does Not Diagnose

This phase does not diagnose:

* admin evidence visibility;
* StudyLoad start/open/render;
* response submission;
* completion or self-report;
* fixture reset/idempotency;
* real student flows;
* staging or production behavior.

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

One readonly student test was listed. No browser login or authenticated run was executed by Codex.

## 10. Authenticated Run Status

Codex checked only presence booleans for the private env variables and did not print values:

```text
BEXAURI_E2E_BASE_URL present: false
BEXAURI_E2E_STUDENT_EMAIL present: false
BEXAURI_E2E_STUDENT_PASSWORD present: false
```

Authenticated run status:

```text
BLOCKED_PRIVATE_ENV
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

Mauricio must paste only the safe diagnostic output. If any secret-like output appears, it must not be pasted.

## 11. Residual Risks

* The next authenticated run may still fail because the auth state is not established.
* The page may reach `/now` but expected copy/selectors may have drifted.
* The test remains readonly and intentionally does not validate admin evidence or execute student mutations.
* Playwright default error output should still be reviewed before sharing, even with screenshots/videos/traces disabled.

## 12. Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-4 - Run safe auth-state diagnostic Playwright check with private env
```

That phase should use Mauricio's private local env values and paste only safe output markers.

## 13. Explicit Non-Actions

This phase did not:

* ask for, print, or store the synthetic password;
* inspect `.env`;
* print env values;
* print DB URLs, connection strings, hosts, provider targets, tokens, cookies, headers, hashes, or browser storage;
* use Mauricio's browser, browser profile, cookies, or session;
* run authenticated Playwright with private credentials;
* mutate DB or app state;
* press StudyLoad actions;
* submit responses;
* complete StudyLoads;
* run admin evidence checks;
* touch staging or production;
* use real student data;
* activate payment or trial;
* declare Sales-Ready.

Result marker:

```text
MVP_SALES_PILOT_UI_AUTOMATION_3_SAFE_AUTH_DIAGNOSTICS_IMPLEMENTED
```
