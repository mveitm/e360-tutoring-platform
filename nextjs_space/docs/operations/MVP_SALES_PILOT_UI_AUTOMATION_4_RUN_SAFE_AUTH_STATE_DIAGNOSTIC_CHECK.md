# MVP-SALES-PILOT-UI-AUTOMATION-4 - Run Safe Auth-State Diagnostic Check

## 1. Baseline

```text
HEAD = origin/main = origin/HEAD = b119110
```

Latest accepted commit:

```text
b119110 - MVP-SALES-PILOT-UI-AUTOMATION-3: add safe auth state diagnostics
```

## 2. Objective

Run the readonly student Playwright check with the safe auth-state diagnostics added in UI-AUTOMATION-3, using private local environment values, to classify the previous failure before `/now` validation.

## 3. Relationship With UI-AUTOMATION-2 And UI-AUTOMATION-3

UI-AUTOMATION-2 showed that Chromium launched and the readonly test started, but the expected `/now` copy was not found.

UI-AUTOMATION-3 added safe diagnostics for:

* pathname after login;
* coarse login-state category;
* pathname before `/now` assertions;
* limited visible headings on `/now` copy mismatch.

This phase used those diagnostics without changing the harness.

## 4. Execution Mode

```text
HUMAN_RUN_WITH_PRIVATE_SYNTHETIC_ENV
```

Codex checked only presence booleans and did not have the private password available:

```text
BEXAURI_E2E_BASE_URL present: false
BEXAURI_E2E_STUDENT_EMAIL present: false
BEXAURI_E2E_STUDENT_PASSWORD present: false
```

Mauricio ran the authenticated readonly Playwright test locally with private env values and pasted only safe output.

## 5. `--list` Result

Codex ran:

```powershell
cd nextjs_space
npm.cmd run test:e2e:pilot:readonly -- --list
```

Result:

```text
PLAYWRIGHT_LIST_PASSED
```

One readonly student test was listed.

## 6. Authenticated Diagnostic Run Result

Result classification:

```text
AUTH_NOT_ESTABLISHED_AFTER_LOGIN
```

Safe diagnostic output:

```text
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

Failure:

```text
The test remained on /login after attempting login and threw AUTH_NOT_ESTABLISHED_AFTER_LOGIN before navigating to /now assertions.
```

## 7. Classification

```text
AUTH_NOT_ESTABLISHED_AFTER_LOGIN
```

Interpretation:

The automated Playwright login did not establish an authenticated session. The test did not reach `/now` assertions. This should be treated as a Playwright login/auth-state automation issue until proven otherwise, not as evidence that the manually validated student runtime path is broken.

## 8. Safe Diagnostic Summary

Observed safely:

* Authenticated readonly test ran human-side with private env values.
* Browser remained on `/login` after login attempt.
* No visible generic login error category was detected by the test.
* The test stopped before `/now` assertions.

Not observed:

* `/now` authenticated state.
* `/now` copy mismatch.
* visible headings on `/now`.
* StudyLoad state.
* admin evidence.

## 9. What Was Not Printed

Not printed or pasted:

* password;
* hash;
* `.env` value;
* DB URL;
* connection string;
* host;
* provider target;
* token;
* cookie;
* header;
* real student data.

## 10. Mutations Avoided

No DB/manual mutation was performed.

No StudyLoad action was performed:

* no start/open action;
* no response submission;
* no completion;
* no admin evidence check.

No staging or production target was touched.

Generated Playwright `test-results` output was removed from the working tree and was not committed.

## 11. Conclusion

The safe diagnostic check successfully narrowed the failure category:

```text
AUTOMATED_LOGIN_AUTH_STATE_NOT_ESTABLISHED
```

The next work should inspect and adjust the Playwright login procedure/selectors or auth transition handling without changing product auth behavior unless a product bug is proven.

## 12. Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-5 - Fix Playwright synthetic login automation without changing product auth
```

Suggested scope:

* inspect login form behavior and auth route responses through safe UI/test diagnostics only;
* avoid cookies, headers, storage dumps, full HTML, screenshots, and secrets;
* prefer test selector/timing improvements over product changes;
* keep the test readonly.

## 13. Explicit Non-Actions

This phase did not:

* modify test or app code;
* ask for, print, or store the synthetic password;
* inspect `.env`;
* print env values, DB URLs, connection strings, hosts, provider targets, hashes, tokens, cookies, headers, or real data;
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
MVP_SALES_PILOT_UI_AUTOMATION_4_AUTH_NOT_ESTABLISHED_DIAGNOSED
```
