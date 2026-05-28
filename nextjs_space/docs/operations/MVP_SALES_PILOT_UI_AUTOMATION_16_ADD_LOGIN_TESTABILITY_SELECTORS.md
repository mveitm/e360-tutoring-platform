# MVP-SALES-PILOT-UI-AUTOMATION-16 - Add login testability selectors

## 1. Baseline

```text
HEAD = origin/main = origin/HEAD = d137a27
```

Latest accepted commit:

```text
d137a27 - MVP-SALES-PILOT-UI-AUTOMATION-15: decide login testability path
```

## 2. Objective

Add minimal testability/accessibility selectors to the real login UI so Playwright can target the actual authentication form reliably, without changing product auth, CredentialsProvider behavior, auth routes, schema, DB state, or StudyLoad/admin flows.

## 3. Decision Inherited From UI-AUTOMATION-15

Decision:

```text
ADOPT_OPTION_B_C
```

Meaning:

* stop open-ended submit-trigger patching;
* add minimal stable selectors to the real login UI;
* keep Playwright using the real login form and real CredentialsProvider flow;
* do not create a test-only auth/session route now;
* do not change product auth.

## 4. Evidence Accumulated

UI-AUTOMATION-8 through UI-AUTOMATION-14 showed:

* login form structure appeared correct;
* email/password fields were filled;
* submit button was inside the form;
* submit button was enabled, visible, focused, and clicked;
* DOM submit event count stayed `0`;
* no `/api/auth/*` request was observed;
* no credentials callback was observed;
* browser remained on `/login`.

Manual local/dev runtime previously validated the student product path, so this phase treats the problem as E2E reachability/testability, not as confirmed product auth or `/now` failure.

## 5. Files Inspected

Read-only inspection covered:

* `nextjs_space/package.json`
* `nextjs_space/playwright.config.ts`
* `nextjs_space/tests/e2e/helpers/local-dev-guard.ts`
* `nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts`
* `nextjs_space/app/login/_components/login-form.tsx`
* `nextjs_space/app/login/page.tsx`

Auth files were listed for scope awareness. No `.env` file contents, environment values, cookies, headers, tokens, storage, DB URLs, host/provider details, password, or hash were inspected or printed.

## 6. Changes Implemented

Updated:

```text
nextjs_space/app/login/_components/login-form.tsx
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

Implementation summary:

* added stable `data-testid` selectors to the login form, email input, password input, and submit button;
* added standard `autoComplete` hints for email and current password;
* updated the Playwright readonly student test to use those stable selectors;
* kept the existing safe diagnostics for form structure, submit event count, auth request observation, callback status, path markers, and login diagnostics.

## 7. Why Product Auth Did Not Change

This phase did not change:

* `signIn('credentials')` logic;
* CredentialsProvider configuration;
* auth route behavior;
* session callbacks;
* redirect behavior;
* middleware;
* schema;
* DB data.

The login form still uses the same `onSubmit` handler and CredentialsProvider flow. The changes are limited to stable DOM selectors and browser autofill hints.

## 8. Selectors Added

```text
data-testid="login-form"
data-testid="login-email-input"
data-testid="login-password-input"
data-testid="login-submit-button"
```

The selectors are static and contain no credentials, emails, tokens, IDs, or private data.

## 9. Changes To The Test

The Playwright test now locates login controls with:

```text
getByTestId('login-form')
getByTestId('login-email-input')
getByTestId('login-password-input')
getByTestId('login-submit-button')
```

The test still interacts with the real UI:

* fill email;
* fill password;
* click the real submit button;
* observe safe DOM submit/auth/callback markers;
* navigate to `/now` only if session behavior allows it.

The test still does not press StudyLoad controls, submit responses, complete work, inspect admin evidence, or mutate DB.

## 10. Build Result

```text
BUILD_PASSED
```

Command:

```text
npm.cmd --prefix nextjs_space run build
```

## 11. `--list` Result

```text
PLAYWRIGHT_LIST_PASSED
```

Command:

```text
npm.cmd --prefix nextjs_space run test:e2e:pilot:readonly -- --list
```

## 12. Authenticated Run Status

```text
IMPLEMENTED_NEEDS_HUMAN_RUN
```

Codex checked only env presence booleans:

```text
BEXAURI_E2E_BASE_URL present: false
BEXAURI_E2E_STUDENT_EMAIL present: false
BEXAURI_E2E_STUDENT_PASSWORD present: false
```

Codex did not run authenticated Playwright because the private synthetic password is not available in Codex's environment and must not be pasted into chat, reports, commits, or logs.

## 13. Residual Risks

* The selector change still needs a private-env authenticated run.
* If DOM submit is still not observed, the next phase should diagnose deeper browser/testability behavior without changing auth.
* If DOM submit is observed but no auth request appears, the next phase should diagnose the React handler/signIn path safely.
* If auth request appears but session fails, the next phase should classify callback/session behavior without exposing secrets.

## 14. Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-17 - Run login testability selector Playwright check with private env
```

## 15. Explicit Non-Actions

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
MVP_SALES_PILOT_UI_AUTOMATION_16_LOGIN_TESTABILITY_SELECTORS_ADDED
```
