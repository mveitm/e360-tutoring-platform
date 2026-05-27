# MVP-SALES-PILOT-UI-AUTOMATION-6 - Run Corrected Readonly Student Check

## 1. Baseline

```text
HEAD = origin/main = origin/HEAD = 6033289
```

Latest accepted commit:

```text
6033289 - MVP-SALES-PILOT-UI-AUTOMATION-5: fix synthetic login automation
```

## 2. Objective

Run the corrected readonly student Playwright check with private local environment values to determine whether the updated login wait logic establishes session state and validates `/now` without mutating StudyLoad state.

## 3. Relationship With UI-AUTOMATION-5

UI-AUTOMATION-5 changed only the Playwright harness:

* observes the NextAuth credentials callback status;
* logs only safe markers;
* does not treat `/login` immediately after submit as definitive failure;
* navigates to `/now` to let the app/middleware prove session state;
* does not change product auth.

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

Human-side precondition reported:

```text
synthetic credential re-applied locally using a private password
```

No password was pasted. This was not performed by Codex.

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

## 6. Authenticated Run Result

Result classification:

```text
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
CREDENTIALS_CALLBACK_NOT_OBSERVED
```

Safe markers:

```text
SAFE_E2E_CREDENTIALS_CALLBACK_STATUS: not-observed
SAFE_E2E_PATH_AFTER_LOGIN: /login
SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: /login
SAFE_E2E_LOGIN_DIAGNOSTIC: NO_LOGIN_ERROR_VISIBLE
```

Failure:

```text
The test remained on /login before /now assertions and threw AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS.
```

## 7. Classification

Primary classification:

```text
CREDENTIALS_CALLBACK_NOT_OBSERVED
```

Secondary classification:

```text
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Interpretation:

Because the credentials callback was not observed, the failure points more toward Playwright login automation not triggering or not observing the real credentials submit/callback than toward confirmed invalid credentials or broken product auth.

## 8. Safe Diagnostic Summary

Observed safely:

* corrected readonly test ran human-side with private env values;
* credentials callback status was `not-observed`;
* browser remained on `/login` after submit handling;
* browser was still on `/login` before `/now` assertions;
* no visible generic login error category was detected;
* the test stopped before validating `/now`.

Not observed:

* authenticated `/now` state;
* `/now` copy mismatch;
* completed StudyLoad visibility;
* self-report visibility;
* next pending M1 StudyLoad visibility;
* admin evidence.

## 9. What It Validated

Validated:

* the corrected test is discoverable;
* human-run Playwright can execute the corrected test;
* the new credentials callback marker works and can report `not-observed`;
* the failure category is now narrower than UI-AUTOMATION-4.

## 10. What It Did Not Validate

Did not validate:

* successful automated login;
* authenticated `/now`;
* pilot copy;
* completed StudyLoad state;
* self-report;
* next pending M1 StudyLoad;
* admin/tutor evidence.

## 11. What Was Not Printed

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
* browser storage;
* real student data.

## 12. Mutations Avoided

The Playwright readonly check did not perform DB/manual mutation and did not execute StudyLoad actions:

* no start/open action;
* no response submission;
* no completion;
* no admin evidence check;
* no staging or production target.

Generated Playwright `test-results` output was removed from the working tree and was not committed.

## 13. Conclusion

The corrected readonly test did not yet pass. It narrowed the automation issue to:

```text
PLAYWRIGHT_LOGIN_SUBMIT_OR_CALLBACK_OBSERVATION_NOT_WORKING
```

The next phase should inspect the login submit event path in Playwright more directly without exposing secrets, for example by verifying button/form action behavior, safe request path observation, and whether the click triggers any auth callback request.

## 14. Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-7 - Diagnose Playwright login submit event without exposing secrets
```

Suggested scope:

* do not change product auth;
* do not use cookies, headers, storage dumps, full HTML, screenshots, or traces;
* add safe request-path diagnostics around the login submit;
* determine whether the click triggers any NextAuth credentials request;
* keep the test readonly.

## 15. Explicit Non-Actions

This phase did not:

* change test/harness code;
* change product auth;
* inspect `.env`;
* ask for, print, or store the private synthetic password;
* print env values, DB URLs, hosts, provider targets, hashes, tokens, cookies, headers, storage, or real data;
* run authenticated Playwright from Codex;
* use Mauricio's browser profile/session/cookies;
* mutate StudyLoad state;
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
MVP_SALES_PILOT_UI_AUTOMATION_6_CALLBACK_NOT_OBSERVED
```
