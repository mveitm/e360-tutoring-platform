# MVP-SALES-PILOT-UI-AUTOMATION-2 - Run Readonly Student Playwright Check

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-UI-AUTOMATION-2 - Run local/dev Playwright readonly student check with private synthetic env
```

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = c5be79b
```

Latest accepted commit:

```text
c5be79b - MVP-SALES-PILOT-UI-AUTOMATION-1: implement local dev Playwright harness
```

## 2. Objective

Run the first local/dev authenticated readonly Playwright check for the synthetic participant:

```text
PILOT_M1_001
pilot.m1.001@example.invalid
```

The target test was:

```text
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

The purpose was to validate `/now` state after the manual M1 dry-run without mutating StudyLoad state.

## 3. Test Executed

Command family:

```text
npm.cmd run test:e2e:pilot:readonly
```

The test was executed by Mauricio locally with private environment variables. Codex did not receive or print the synthetic password.

Codex ran only:

```text
npm.cmd run test:e2e:pilot:readonly -- --list
```

This listed one Playwright test without launching an authenticated browser session.

## 4. Safe Environment

Execution mode:

```text
HUMAN_RUN_WITH_PRIVATE_SYNTHETIC_ENV
```

Environment boundary:

```text
LOCAL_DEV_ONLY
```

The reported run:

* started the test;
* launched Chromium after local browser installation;
* did not print secrets;
* did not touch staging or production;
* did not perform DB/manual mutation;
* did not use Mauricio's browser profile, session, or cookies.

## 5. Required Variables Without Values

The test requires:

```text
BEXAURI_E2E_BASE_URL
BEXAURI_E2E_STUDENT_EMAIL
BEXAURI_E2E_STUDENT_PASSWORD
```

Codex checked only presence/absence booleans before human fallback. In the Codex execution environment, all three were absent.

No password, hash, DB URL, host, provider, token, cookie, header, `.env` value, or real student data was pasted or committed.

## 6. Execution Mode

Result:

```text
human-run
```

Reason:

The private student password must remain local-only and must not be revealed to Codex, ChatGPT, documentation, commits, logs, or reports.

## 7. Result

Test result:

```text
READONLY_STUDENT_CHECK_FAILED_BEFORE_NOW_VALIDATION
```

Safe failure summary:

```text
test started
browser launched
no secrets printed
no staging/prod touched
no DB/manual mutation performed
failure point: expected text "Piloto cerrado PAES M1" was not found after navigating to /now
```

Reported Playwright failure category:

```text
expect(page.getByText('Piloto cerrado PAES M1').first()).toBeVisible() timed out
```

## 8. Safe Evidence From Output

Safe evidence accepted:

* Playwright harness starts.
* Chromium can launch locally.
* The readonly spec runs far enough to attempt `/now` validation.
* No secret material was printed.
* No staging or production target was touched.
* No DB/manual mutation was performed.

No full output, screenshots, traces, cookies, tokens, headers, env values, DB URLs, hostnames, provider targets, passwords, hashes, or real student data were committed.

Generated Playwright `test-results` output was removed from the working tree and was not committed.

## 9. What Was Validated

Validated:

* Playwright dependency and script are usable.
* The target spec is discoverable.
* The local browser can launch.
* The test can begin execution under human-provided private env.
* The first content assertion currently fails before confirming the expected `/now` state.

Not validated:

* successful automated login persistence;
* `/now` closed pilot copy;
* completed StudyLoad visibility;
* self-report visibility;
* next pending M1 StudyLoad visibility;
* forbidden claim absence;
* admin evidence.

## 10. What Was Not Validated

This phase did not validate:

* StudyLoad start;
* StudyLoad response submission;
* StudyLoad completion;
* admin/tutor evidence;
* admin login;
* fixture creation or reset;
* staging or production.

## 11. Mutations Avoided

The readonly test was designed not to:

* press `Empezar`;
* press `Ver actividad` as a mutating path;
* submit responses;
* complete StudyLoads;
* open admin evidence;
* run Prisma CLI or SQL;
* reset or manually edit DB.

Human-reported result confirms no DB/manual mutation was performed.

## 12. Secrets Not Exposed

Not exposed or committed:

* synthetic password;
* password hash;
* `.env` values;
* `DATABASE_URL`;
* host/provider target;
* tokens;
* cookies;
* headers;
* real student data.

## 13. Residual Risks

Likely blocker categories:

* login may not persist in automated browser context;
* post-login redirect may remain at `/login`;
* `/now` may redirect because auth state was not established;
* the test needs safer post-login diagnostics that do not print cookies/tokens/headers;
* copy/selector expectations may need to account for encoded or rendered text differences;
* app server state may differ from the manually observed session.

This phase intentionally does not patch the harness because the first failure should be diagnosed with a targeted follow-up phase that adds safe auth-state diagnostics before broadening assertions.

## 14. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-UI-AUTOMATION-3 - Add safe Playwright auth-state diagnostics for readonly student check
```

Goal:

* preserve no-secret policy;
* determine whether the failure is auth persistence, redirect, route state, selector/copy drift, or local app state;
* avoid screenshots/videos/traces by default;
* avoid logging cookies, tokens, headers, password, env values, or storage state.

## 15. Explicit Non-actions

This phase did not:

* ask for or record the synthetic password;
* print password, hash, DB URL, host, provider, token, cookie, header, or env value;
* inspect `.env`;
* commit screenshots, videos, traces, test-results, logs, cookies, tokens, headers, or storage state;
* use Mauricio's browser profile/session/cookies;
* mutate DB manually;
* press StudyLoad mutating controls;
* run StudyLoad response submission or completion;
* run admin evidence;
* touch staging or production;
* use real student data;
* activate payment or trial;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready.

## Result Marker

```text
MVP_SALES_PILOT_UI_AUTOMATION_2_READONLY_STUDENT_CHECK_FAILED_SAFE
```
