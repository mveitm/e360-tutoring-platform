# MVP-SALES-PILOT-UI-AUTOMATION-15 - Decide login testability path

## 1. Baseline

```text
HEAD = origin/main = origin/HEAD = 755b50d
```

Latest accepted commit:

```text
755b50d - MVP-SALES-PILOT-UI-AUTOMATION-14: run form submit button click check
```

## 2. Objective

Decide the next safe path for authenticated local/dev Playwright automation after confirming that neither `password-enter` nor a real click on the submit button scoped to the login form fires the DOM submit event in Playwright.

This is a diagnostic, product, and technical decision phase. It does not implement app, auth, schema, DB, or harness changes.

## 3. Accumulated Evidence From UI-AUTOMATION-8 Through 14

Human local/dev runtime already validated the product path manually:

* synthetic student login succeeded;
* `/now` loaded;
* closed PAES M1 pilot copy was correct;
* initial M1 activity completed;
* response submit worked;
* completion/self-report worked;
* next M1 continuity appeared.

The current issue is isolated to automated Playwright login.

Accumulated Playwright evidence:

```text
UI-AUTOMATION-8:
SUBMIT_ATTEMPTED_BUT_AUTH_REQUEST_NOT_OBSERVED
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS

UI-AUTOMATION-10:
SUBMIT_TRIGGER_STILL_NOT_FIRING
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS

UI-AUTOMATION-12:
DOM_SUBMIT_NOT_OBSERVED

UI-AUTOMATION-14:
DOM_SUBMIT_NOT_OBSERVED_AFTER_FORM_SUBMIT_BUTTON_CLICK
AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS
```

Key safe markers from UI-AUTOMATION-14:

* form structure correct;
* fields filled;
* submit button inside form;
* submit button enabled;
* submit button focused;
* submit button visible;
* submit button clicked;
* DOM submit count stayed `0`;
* no `/api/auth/*` request;
* no credentials callback;
* browser remained on `/login`;
* no visible login error.

## 4. Files Inspected

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

## 5. Current Diagnosis

The login form is a client component with a real `form onSubmit={handleSubmit}`. The handler calls:

```text
signIn('credentials', redirect=false)
```

and then redirects via router on success. The login page redirects authenticated users server-side to `/now` for non-admin accounts.

The form appears semantically valid, but the Playwright harness has repeatedly failed before the product auth path:

* no DOM submit event;
* no `/api/auth/*` request;
* no credentials callback.

Therefore the current evidence does not indicate:

* invalid credentials;
* `/now` failure;
* confirmed product auth failure.

It indicates:

```text
AUTOMATED_LOGIN_FORM_SUBMIT_PATH_NOT_REACHED
```

## 6. Options Evaluated

### Option A - Continue Harness-Only Trigger Experiments

Summary:

Continue trying Playwright triggers without changing app code.

Pros:

* no product code change;
* no auth code change.

Cons:

* `password-enter` and real button click have both failed to fire DOM submit;
* continuing would likely be blind iteration;
* consumes phases without improving product testability;
* still depends on fragile selectors and browser event assumptions.

Verdict:

```text
NOT_RECOMMENDED_AS_PRIMARY_PATH
```

Option A is acceptable only for one tightly scoped diagnostic if a concrete new hypothesis exists. It should not continue as open-ended patching.

### Option B - Minimal Login Testability/Accessibility Improvement

Summary:

Add explicit, safe, stable testability/accessibility affordances to the login form without changing auth logic.

Examples:

* stable `data-testid` on the form, email input, password input, and submit button;
* optional accessible form name or aria labels if needed;
* optional E2E-visible readiness marker that does not expose state or secrets.

Pros:

* preserves real student login flow;
* does not bypass CredentialsProvider;
* gives Playwright stable, intentional targets;
* improves future maintenance and debuggability;
* keeps browser automation separate from Mauricio's human browser.

Cons:

* touches app UI markup;
* requires an implementation phase and build validation.

Verdict:

```text
RECOMMENDED
```

### Option C - E2E Login Helper Using Real UI With Stable Selectors

Summary:

Create a Playwright login helper that uses the real login UI and stable selectors from Option B.

Pros:

* reuses the real CredentialsProvider path;
* centralizes safe diagnostics;
* reduces repeated test code;
* supports future student/admin specs.

Cons:

* depends on Option B or equivalent stable UI selectors;
* still requires private env for authenticated runs.

Verdict:

```text
RECOMMENDED_WITH_OPTION_B
```

### Option D - Local/Dev Test-Only Session/Auth Route

Summary:

Create a local/dev-only endpoint to establish an authenticated session for E2E tests.

Pros:

* could unblock post-auth UI automation quickly;
* avoids fragile UI login event path.

Cons:

* bypasses the real login flow;
* high security and maintenance risk;
* requires extremely strong guardrails;
* can drift from the student-product circuit;
* not needed before trying minimal testability improvements.

Verdict:

```text
NOT_RECOMMENDED_NOW
```

This should remain a later fallback only if real-UI login automation cannot be made reliable.

### Option E - Human-Run Login Or Manual Storage State

Summary:

Keep login checks human-run and automate only post-auth pages using manually prepared state.

Pros:

* pragmatic fallback;
* avoids changing login markup.

Cons:

* keeps Codex dependent on human setup;
* less reproducible;
* risks local state confusion;
* weakens the goal of isolated automated contexts.

Verdict:

```text
FALLBACK_ONLY
```

## 7. Risks By Option

Option A risk:

* continued blind harness patches with low evidence yield.

Option B risk:

* small app UI markup change, but low product behavior risk if limited to attributes/accessibility and validated by build.

Option C risk:

* helper can hide failures if it becomes too abstract; diagnostics must stay explicit and safe.

Option D risk:

* auth bypass route can create security and fidelity risk even with guardrails.

Option E risk:

* less reproducible automation and more human coupling.

## 8. Recommended Decision

Decision:

```text
ADOPT_OPTION_B_C
```

Recommended path:

* implement a minimal login testability/accessibility improvement in a separate phase;
* do not change product auth;
* do not change CredentialsProvider behavior;
* do not add test-only auth/session routes now;
* create or update a Playwright login helper to use the stable selectors;
* keep the test using the real login UI and real credentials flow;
* keep all secret handling through private local env only.

## 9. Proposed Scope For Next Phase

Recommended next implementation phase:

```text
MVP-SALES-PILOT-UI-AUTOMATION-16 - Add minimal login testability selectors for Playwright real-UI auth
```

Proposed allowed scope:

* add stable `data-testid` attributes to the login form, email input, password input, and submit button;
* optionally add a non-secret form readiness marker if needed;
* update the Playwright test/helper to use those stable selectors;
* preserve current safe diagnostics;
* run `npm.cmd run test:e2e:pilot:readonly -- --list`;
* run `npm.cmd --prefix nextjs_space run build`;
* do not run authenticated Playwright unless private env is available without disclosure.

Proposed files:

```text
nextjs_space/app/login/_components/login-form.tsx
nextjs_space/tests/e2e/helpers/local-dev-guard.ts
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
nextjs_space/docs/operations/MVP_SALES_PILOT_UI_AUTOMATION_16_ADD_LOGIN_TESTABILITY_SELECTORS.md
PHASE_LOG.md
```

## 10. Guardrails

Required guardrails for the next phase:

* no auth logic change;
* no CredentialsProvider change;
* no route/middleware/session semantics change;
* no DB mutation;
* no `.env` inspection;
* no password/hash/env/DB URL/host/provider/token/cookie/header/storage printing;
* no screenshots/videos/traces by default;
* no staging or production;
* no real student data;
* keep local/dev URL and synthetic email guardrails;
* keep Mauricio's human browser independent from Playwright.

## 11. Why Auth Is Not Changed In This Phase

Manual local/dev login and runtime already passed for the synthetic participant. The failing evidence is upstream of product auth:

* no DOM submit event;
* no auth request;
* no credentials callback.

Changing auth before making the UI reachable/testable would be premature and would risk masking a harness/testability issue.

## 12. Implications For Codex UI Automation

Codex should not rely on Mauricio's browser, profile, cookies, or session. The automation path should remain:

* isolated Playwright context;
* local/dev base URL only;
* synthetic credentials from private env;
* stable login selectors;
* safe output markers only;
* no screenshots/videos/traces by default.

Once the real UI login is reachable, the readonly student check can become the baseline authenticated smoke for future admin evidence and student-state checks.

## 13. Implications For Mauricio's Human Browser

Mauricio keeps full independent control of the app from his own browser. The Playwright context should not:

* use the human browser profile;
* use human cookies;
* close or alter human sessions;
* block manual operation of `http://localhost:3000`.

Manual validation remains valid for visual/product judgment and for phases that require human-only private credentials.

## 14. Recommended Next Phase

```text
MVP-SALES-PILOT-UI-AUTOMATION-16 - Add minimal login testability selectors for Playwright real-UI auth
```

## 15. Explicit Non-Actions

This phase did not:

* implement app changes;
* implement harness changes;
* change product auth;
* change app routes;
* change schema;
* mutate DB;
* run Prisma CLI or SQL;
* inspect `.env`;
* ask for, print, or store the private synthetic password;
* print env values, DB URLs, hosts, provider targets, hashes, tokens, cookies, headers, storage, request bodies, response bodies, or real data;
* run authenticated Playwright;
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
MVP_SALES_PILOT_UI_AUTOMATION_15_LOGIN_TESTABILITY_PATH_DECIDED
```
