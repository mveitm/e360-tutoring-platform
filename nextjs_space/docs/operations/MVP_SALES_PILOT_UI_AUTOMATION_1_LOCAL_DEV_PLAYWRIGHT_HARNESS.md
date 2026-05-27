# MVP-SALES-PILOT-UI-AUTOMATION-1 - Local/Dev Playwright Harness

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-UI-AUTOMATION-1 - Implement local/dev Playwright harness
```

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = 3ca063b
```

Latest accepted commit:

```text
3ca063b - MVP-SALES-PILOT-UI-AUTOMATION-0: assess safe local dev UI automation path
```

## 2. Objective

Implement a minimal local/dev Playwright harness for authenticated Bexauri UI checks in isolated browser contexts.

The harness must not use Mauricio's human browser, must not expose secrets, and must not touch staging or production.

## 3. Decision Inherited from UI-AUTOMATION-0

Decision:

```text
ADOPT_OPTION_B_C
```

Meaning:

* Playwright is the preferred base for authenticated local/dev UI checks.
* Codex/browser-style tools remain limited to unauthenticated previews or simple visual checks.
* The human browser and the automated browser must remain separate.
* Mauricio can continue operating the app manually at any time.

## 4. Files Added or Modified

Modified:

* `nextjs_space/package.json`.
* `nextjs_space/package-lock.json`.
* `PHASE_LOG.md`.

Added:

* `nextjs_space/playwright.config.ts`.
* `nextjs_space/tests/e2e/helpers/local-dev-guard.ts`.
* `nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_AUTOMATION_1_LOCAL_DEV_PLAYWRIGHT_HARNESS.md`.

## 5. Guardrails Implemented

Implemented guardrails:

* `BEXAURI_E2E_BASE_URL` is required.
* Base URL is accepted only for:
  * `http://localhost:3000`;
  * `http://127.0.0.1:<port>`.
* HTTPS, staging, production, Vercel, Neon, external domains, and non-local URLs are rejected by default.
* Student email must be synthetic and end in `@example.invalid`.
* Password is required only as a local environment value and is never printed by the harness.
* Screenshots, videos, and traces are off by default.
* Playwright retries are disabled.
* Tests run with one worker by default to avoid accidental concurrent mutation.
* The initial spec performs read-only `/now` verification after login and does not press mutating controls.

## 6. Expected Environment Variables

Expected local-only variables:

```text
BEXAURI_E2E_BASE_URL=http://localhost:3000
BEXAURI_E2E_STUDENT_EMAIL=pilot.m1.001@example.invalid
BEXAURI_E2E_STUDENT_PASSWORD=<local only, never printed>
BEXAURI_E2E_ADMIN_EMAIL=<synthetic/admin local only, future>
BEXAURI_E2E_ADMIN_PASSWORD=<local only, never printed>
```

Rules:

* Do not paste passwords into chat, docs, commits, reports, screenshots, traces, or logs.
* Do not commit local env files or storage state.
* Do not print cookies, tokens, headers, session details, DB URLs, provider targets, hosts, hashes, or passwords.

## 7. Initial Test Created

Created:

```text
nextjs_space/tests/e2e/pilot-m1-student-now-readonly.spec.ts
```

Script:

```text
npm run test:e2e:pilot:readonly
```

The test logs in with the synthetic student using isolated Playwright context and verifies `/now` state only.

## 8. What the Initial Test Verifies

The first spec verifies:

* `/login` can be used by the synthetic student.
* `/now` loads after auth.
* closed PAES M1 pilot copy is visible.
* `PAES_M1` program state is visible.
* no public sale/paid plan implication appears.
* L1/M2 are not active in the pilot copy.
* `PAES M1 - Ecuaciones lineales basicas` is visible as the next pending M1 activity.
* `PAES M1 - Entrada balanceada inicial` is visible as completed/registered work.
* `Tu reporte: Me fue bien` is visible.
* selected forbidden claims are absent.

## 9. What It Does Not Verify

This phase does not verify:

* StudyLoad start.
* StudyLoad response submission.
* StudyLoad completion.
* Admin/tutor evidence.
* Admin authentication.
* fixture creation or reset.
* payment, subscription, or trial behavior beyond absence checks.
* staging or production.

## 10. Safe Execution

Safe execution pattern:

```powershell
cd nextjs_space
$env:BEXAURI_E2E_BASE_URL = "http://localhost:3000"
$env:BEXAURI_E2E_STUDENT_EMAIL = "pilot.m1.001@example.invalid"
$env:BEXAURI_E2E_STUDENT_PASSWORD = "<local only, never printed>"
npm.cmd run test:e2e:pilot:readonly
Remove-Item Env:\BEXAURI_E2E_STUDENT_PASSWORD
cd ..
```

The app must be running locally before the test, unless a future phase explicitly adds a safe webServer strategy.

## 11. Execution State

State:

```text
NOT_RUN_REQUIRES_LOCAL_ENV
```

Reason:

The test requires a private local synthetic password that must not be revealed to Codex, ChatGPT, docs, commits, or logs. The harness and static validation were completed; authenticated execution is deferred to a future human-safe or locally supplied environment phase.

Validation completed:

* `playwright test tests/e2e/pilot-m1-student-now-readonly.spec.ts --list` passed and listed one test without opening a browser or logging in.
* `npm run build` initially hit sandboxed network access while fetching Google Fonts, then passed when rerun with authorized external access.
* The authenticated Playwright test itself was not run.

## 12. Residual Risks

Residual risks:

* Playwright browser binaries may need to be installed locally before execution.
* The initial test depends on the existing post-1I-RETRY fixture state.
* The test is intentionally read-only; mutating runtime tests still need idempotency or a fresh fixture.
* Admin evidence automation still needs a safe synthetic/local admin credential or a human-confirmed route.
* Selector stability may need refinement after first real Playwright run.

## 13. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-UI-AUTOMATION-2 - Run local/dev Playwright readonly student check with private synthetic env
```

After that passes, proceed to:

```text
MVP-SALES-PILOT-ADMIN-EVIDENCE-1 - Verify local admin/tutor evidence for PILOT_M1_001 dry-run
```

or implement a read-only admin Playwright spec if safe admin credentials are prepared.

## 14. Explicit Non-actions

This phase did not:

* run the authenticated Playwright test;
* reveal or request the synthetic password;
* run a mutating StudyLoad test;
* press `Empezar`, `Ver actividad`, response submit, or completion controls;
* create users, students, fixtures, sessions, responses, StudyLoads, cycles, or admin evidence;
* run Prisma CLI or SQL;
* reset or manually edit DB;
* inspect `.env`;
* print env values, DB URLs, hosts, provider targets, hashes, passwords, tokens, cookies, or headers;
* use Mauricio's browser profile or cookies;
* touch staging or production;
* activate payment or trial;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready.

## Result Marker

```text
MVP_SALES_PILOT_UI_AUTOMATION_1_PLAYWRIGHT_HARNESS_IMPLEMENTED
```
