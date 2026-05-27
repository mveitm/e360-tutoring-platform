# MVP-SALES-PILOT-UI-AUTOMATION-0 - Safe Local/Dev UI Automation Path

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-UI-AUTOMATION-0 - Assess safe local/dev UI automation path for authenticated pilot evidence checks
```

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = 5f3756a
```

Latest accepted commit:

```text
5f3756a - MVP-SALES-PILOT-DRY-RUN-1I-RETRY: rerun local runtime after auth setup
```

Type:

```text
Readiness / architecture / documentation only.
```

## 2. Objective

Assess and document a safe way for Codex to run authenticated local/dev UI checks for the Bexauri pilot path without using Mauricio's human browser session, without exposing secrets, and without preventing Mauricio from using the app manually at any time.

This phase does not implement the harness, does not run authenticated UI automation, does not mutate DB, does not create users, and does not touch staging or production.

## 3. Why UI Automation Is Needed

The one-participant M1 local/dev runtime dry-run passed manually for `PILOT_M1_001`, but it required human navigation and still deferred admin/tutor evidence review.

UI automation is useful now because it can:

* reduce repeated manual navigation for student and admin evidence checks;
* make local/dev evidence verification reproducible;
* keep the student runtime path close to the real product behavior;
* support future repeat checks for `PILOT_M1_002` and `PILOT_M1_003`;
* let Mauricio keep manual browser control for final review, exception handling, and product judgment.

## 4. Current Manual Dry-run State

The latest human-executed local/dev runtime dry-run observed:

```text
login: successful
/now: loaded
pilot copy: ok
scope boundaries: ok
StudyLoad visible: yes, state=pending
activity start/open: ok
activity render: ok
response submit: ok
completion/self-report: ok
post-completion /now: ok
admin evidence: not checked
```

Observed safe details:

* closed PAES M1 pilot copy was visible;
* no active L1/M2 implication was observed;
* no payment/subscription/public trial implication was observed;
* no score/mastery/theta/adaptive AI/guaranteed improvement claim was observed;
* `PAES M1 - Entrada balanceada inicial` was completed with self-report `Me fue bien`;
* expected automatic next M1 StudyLoad appeared as pending: `PAES M1 - Ecuaciones lineales basicas`;
* no secrets were printed;
* staging and production were not touched.

## 5. Surfaces Inspected

Read-only inspection covered:

* `PHASE_LOG.md` tail.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_1I_RETRY_LOCAL_DEV_RUNTIME_AFTER_AUTH.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_AUTH_LOCAL_3_EXECUTE_GUARDED_SYNTHETIC_CREDENTIAL_SETUP.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_AUTH_LOCAL_2_GUARDED_SYNTHETIC_CREDENTIAL_HELPER.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_0_PREPARE_CLOSED_M1_FIRST_DRY_RUN_PLAN.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.
* `nextjs_space/package.json`.
* Root file listing for config/package files.
* Focused repository search for e2e/test tooling, excluding dependencies and env contents.
* Focused app route listing for login, auth, signup, `/now`, admin, students, learning cycles, StudyLoads, and responses.
* `nextjs_space/app/login/_components/login-form.tsx`.
* `nextjs_space/app/now/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`.
* `nextjs_space/app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx`.
* `nextjs_space/app/admin/layout.tsx`.

No `.env` contents, raw env values, database URLs, hostnames, provider targets, tokens, cookies, headers, hashes, passwords, or real student data were inspected.

## 6. Tools Available or Absent

Current tooling finding:

```text
NO_AUTHENTICATED_E2E_HARNESS_PRESENT
```

Observed:

* `package.json` does not list Playwright, Cypress, Vitest, or Jest dependencies.
* `package.json` has no e2e script.
* Existing test-like files are local library tests, not an authenticated browser automation harness.
* No Playwright or Cypress config was found in the app source outside dependency noise.
* The app has real login, `/now`, StudyLoad, and admin evidence surfaces suitable for a future browser automation harness.

## 7. Options Evaluated

### Option A - Keep authenticated UI checks human-executed for now

Benefits:

* lowest immediate technical change;
* no new dependency;
* no risk of automation repeating mutating student actions.

Risks:

* Mauricio remains the bottleneck for repeated evidence checks;
* hard to reproduce admin/student evidence checks consistently;
* slower to repeat for remaining participant fixtures.

### Option B - Implement Playwright local/dev minimal harness

Benefits:

* isolated browser contexts;
* can authenticate with synthetic users without sharing human cookies;
* supports student and admin flows;
* can disable screenshots/videos/traces by default;
* fits future local/dev repeatability and CI-like execution if needed.

Risks:

* adds dependency and config in a future implementation phase;
* mutating tests, such as StudyLoad completion, need idempotency or fresh fixtures;
* credentials must be provided only through local ephemeral variables and never logged.

### Option C - Use Codex/browser only for non-authenticated checks and Playwright for authenticated flows

Benefits:

* keeps simple previews lightweight;
* reserves authenticated flows for isolated, scripted contexts;
* reduces risk of accidental human-session use.

Risks:

* requires discipline about which tool is allowed for which path;
* still needs Playwright for the authenticated evidence objective.

### Option D - Use Chrome extension or computer-use style control of Mauricio's browser

Benefits:

* could mirror exactly what Mauricio sees.

Risks:

* would share or interfere with human browser state;
* could expose cookies/session artifacts;
* could block or confuse manual app operation;
* not appropriate as the default pilot evidence path.

## 8. Recommended Decision

Decision:

```text
ADOPT_OPTION_B_C
```

Meaning:

* Implement a Playwright local/dev minimal harness in a future phase for authenticated student/admin checks.
* Use Codex/browser-style checks only for non-authenticated previews or simple visual checks if needed.
* Do not use Mauricio's human browser profile, cookies, session, or Chrome extension/computer-use style control as the base authenticated flow.
* Mauricio retains full manual browser control at all times.

Rationale:

Playwright provides the right isolation boundary: an automated browser context can log in as a synthetic test user, run local/dev checks, and close without touching Mauricio's browser or session. This is the safest way to reduce manual repetition while keeping the real product UI path under test.

## 9. Human Browser vs Automated Browser Policy

Human browser operated by Mauricio:

* may operate the app at any time;
* may validate visual state and product judgment;
* may intervene when automation is blocked;
* may perform final review for sensitive flows;
* does not share cookies, storage, profile, or session with Codex automation.

Automated browser operated by Codex:

* uses a separate Playwright browser context;
* uses only synthetic local/dev accounts;
* obtains passwords from local temporary variables only;
* does not print passwords, cookies, headers, tokens, or session payloads;
* does not save screenshots, videos, or traces by default;
* does not access human browser sessions;
* does not use real credentials;
* does not touch staging or production unless a future phase explicitly authorizes it;
* mutates only through the normal product flow explicitly authorized by the specific test phase.

Guarantee:

```text
HUMAN_BROWSER_REMAINS_AVAILABLE_AND_INDEPENDENT
```

## 10. Synthetic Credentials and Secret Handling

Future harness should expect local-only variables such as:

```text
BEXAURI_E2E_BASE_URL=http://localhost:3000
BEXAURI_E2E_STUDENT_EMAIL=pilot.m1.001@example.invalid
BEXAURI_E2E_STUDENT_PASSWORD=<local only, never printed>
BEXAURI_E2E_ADMIN_EMAIL=<synthetic/admin local only if available>
BEXAURI_E2E_ADMIN_PASSWORD=<local only, never printed>
```

Rules:

* Password values must never be pasted into chat, docs, commits, reports, traces, or logs.
* Email values for automated student checks must be synthetic and explicitly allowed.
* Admin credentials, if needed, must be synthetic/local-only or separately authorized.
* Tests must never log cookies, tokens, headers, storage state, password fields, or raw environment values.
* Storage state files must not be committed.
* If any secret-like value appears in output, the test phase must stop and treat it as a redaction failure.

## 11. Local/Dev Guardrails

Future harness guardrails:

* reject `BEXAURI_E2E_BASE_URL` unless it is `http://localhost:<port>` or `http://127.0.0.1:<port>`;
* reject staging/production URLs by default;
* reject student emails not ending in `.example.invalid` unless a future phase explicitly authorizes another synthetic pattern;
* never log passwords;
* never log cookies, headers, tokens, or storage state;
* screenshots, videos, and traces off by default;
* safe console summaries only;
* no automatic retries for mutating steps unless idempotency is designed;
* no repeated StudyLoad completion on the same fixture unless reset/idempotency exists;
* no SQL, Prisma CLI, DB reset, or manual DB edits inside UI tests;
* no payment, subscription, public trial, L1, M2, or Sales-Ready claim checks beyond confirming they are absent from the M1 pilot surface.

## 12. Prohibitions

The future UI automation path must not:

* control Mauricio's browser;
* reuse Mauricio's browser profile;
* import human cookies or session storage;
* inspect `.env` contents;
* print env values, DB URLs, hostnames, provider targets, tokens, cookies, headers, hashes, or passwords;
* use real student data;
* touch staging or production by default;
* run fixture setup or DB mutation outside explicitly authorized setup phases;
* complete a mutating StudyLoad test repeatedly against the same fixture without reset/idempotency;
* commit screenshots, traces, videos, session state, logs containing private data, or credential material.

## 13. Residual Risks

Key risk:

```text
MUTATING_STUDYLOAD_TEST_NOT_REPEATABLE_ON_SAME_FIXTURE_BY_DEFAULT
```

Completing a StudyLoad is a real local/dev mutation through the product flow. Running the same completion test twice against the same fixture can change the expected starting state and produce misleading failures.

Mitigations for repeatability:

* prefer read-only checks of already completed state for regression evidence;
* use a new synthetic fixture per mutating run;
* add an explicit local/dev reset/seed helper in a future authorized phase;
* split tests into read-only admin evidence checks and mutating student-path checks;
* avoid Playwright retries on mutating specs until idempotency is explicit.

Other residual risks:

* admin auth path may require a synthetic/admin local credential not yet prepared;
* the app does not currently include an e2e harness, so a future phase must add dependencies/config;
* automated selectors may need stable labels or roles reviewed without changing product copy unnecessarily;
* evidence read-only checks may need admin route discovery by cycle/student if the UI does not expose a direct search path.

## 14. Proposed Phase Sequence

Recommended next implementation phase:

```text
MVP-SALES-PILOT-UI-AUTOMATION-1 - Implement local/dev Playwright harness
```

Expected output:

* add Playwright dependency/config if explicitly authorized;
* create `nextjs_space/tests/e2e/` or a repo-consistent equivalent;
* add local/dev guard helper for base URL and synthetic credential validation;
* disable screenshots/videos/traces by default;
* define safe test scripts without running mutating student completion by default.

Recommended first execution phase:

```text
MVP-SALES-PILOT-UI-AUTOMATION-2 - Run automated student/admin local evidence checks
```

Suggested initial specs:

```text
pilot-m1-student-readonly.spec.ts
admin-evidence-readonly.spec.ts
```

Only after repeatability is explicit should a future spec run the full mutating student path:

```text
pilot-m1-student-runtime.spec.ts
```

## 15. Implications for ADMIN-EVIDENCE-1

`ADMIN-EVIDENCE-1` can proceed in either of two ways:

1. Human-executed local admin evidence review, if immediate confirmation is needed.
2. Playwright-backed read-only admin evidence review after `UI-AUTOMATION-1` creates the harness.

Preferred sequencing:

```text
UI-AUTOMATION-1 before automated ADMIN-EVIDENCE execution
```

Reason:

The current gap is not the student path itself; it is reproducible evidence inspection. A read-only Playwright admin evidence test is a good first automation target because it should not mutate StudyLoad state.

## 16. Phase Gate Classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go
Sales-ready relevance: direct/high
Dependency: MVP-SALES-PILOT-DRY-RUN-1I-RETRY closed at 5f3756a
What it advances: reproducible local/dev evidence checking for the M1-first pilot path
What it does not advance: harness implementation, DB mutation, fixture creation, runtime execution, staging/prod, payment/trial, public readiness
Priority verdict: APPROVED_UI_AUTOMATION_READINESS
Authorization status: executed only after Mauricio authorization
```

## 17. Explicit Non-actions

This phase did not:

* implement Playwright or another harness;
* edit package files;
* run npm install;
* run browser/runtime/dev server;
* run authenticated UI automation;
* create users or fixtures;
* mutate DB;
* run Prisma CLI or SQL;
* inspect `.env` contents;
* print env values, DB URLs, connection strings, hostnames, provider targets, passwords, hashes, tokens, cookies, or headers;
* touch staging or production;
* use or commit real student data;
* activate payment or public trial;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready.

## Result Marker

```text
MVP_SALES_PILOT_UI_AUTOMATION_0_SAFE_UI_AUTOMATION_PATH_DEFINED
```
