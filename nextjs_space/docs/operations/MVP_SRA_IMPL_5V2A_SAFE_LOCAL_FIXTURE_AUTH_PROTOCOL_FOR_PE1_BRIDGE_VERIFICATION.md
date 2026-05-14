# MVP-SRA-IMPL-5V2A - Safe Local Fixture/Auth Protocol for PE1 Bridge Verification

## 1. Phase Purpose

Prepare a safe human-executed local UI/API verification protocol for the PE1 bridge.

This protocol resolves the `MVP-SRA-IMPL-5V2` blocker: no authenticated local admin/student browser session or fixture credentials were available during verification.

All future verification must use existing local app UI/API flows only. This phase does not mutate local data and does not authorize code, schema, database, selector, registry, UI, API, production, or deploy changes.

## 2. Live Baseline

Git preflight before this phase showed:

- HEAD = origin/main = `0e111ae`.
- Last accepted commit = `MVP-SRA-IMPL-5V2: document PE1 UI verification blocker`.
- Working tree expected clean.

Git preflight remains the live source of truth. If embedded documentation baselines differ from live Git, Git wins.

## 3. What Is Already Verified

Already verified:

- Static verification: PASSED.
- Build verification: PASSED.
- Helper/mock runtime verification from `MVP-SRA-IMPL-5V`: PARTIAL.
- Full UI/API verification from `MVP-SRA-IMPL-5V2`: BLOCKED.

Current PE1 bridge:

```text
paes_m1_linear_functions_basic -> paes_m1_data_representation_entry
```

Current PE1 registry activity:

```text
PAES M1 - Lectura de tablas y graficos
contentKey: paes_m1_data_representation_entry
sliceId: PE1
routingStatus: available_not_universal
```

## 4. Verification Blocker

Full UI/API verification requires:

- an authenticated local admin browser session;
- an authenticated local student browser session;
- safe local fixture credentials;
- a local-only PAES_M1 student/enrollment/cycle path to `PAES M1 - Funciones lineales basicas`.

Do not resolve this blocker by:

- bypassing authentication;
- mutating the database through SQL;
- using Prisma CLI to mutate, reset, or push schema;
- running scripts that directly mutate data;
- printing `.env`, database URLs, tokens, passwords, hashes, or secrets;
- touching production or deploy targets.

## 5. Safe Prerequisites

Before executing the future verification phase, Mauricio or the human operator must confirm:

- Local app can run.
- Local admin login is available.
- Local student login is available or can be created through existing app UI/API flow.
- Local-only test student/enrollment/cycle can be created or reused.
- No production URL or production session is involved.
- Browser session is local.
- Existing fixture recipe is followed where applicable:

```text
nextjs_space/docs/operations/BETA_LOCAL_OPS_1_LOCAL_STUDENT_FIXTURE_RECIPE.md
```

Credentials must stay outside repo documentation and phase logs.

## 6. Safe Manual Protocol

Use this checklist for the future human-executed verification phase.

### A. Start Local App

1. Confirm Git preflight is clean.
2. Start the local app with the repo's normal local dev command.
3. Use only the local app URL.
4. Do not open production or deploy targets.

### B. Log In As Local Admin

1. Log in through the existing local login page.
2. Do not paste or record credentials in chat, docs, logs, screenshots, or commits.
3. Confirm the session is local.

### C. Create Or Reuse Local PAES_M1 Fixture

Use an existing local-only student/enrollment/cycle if available and safe.

If a fixture must be created, use the existing app UI/API flow described in `BETA_LOCAL_OPS_1_LOCAL_STUDENT_FIXTURE_RECIPE.md`:

1. Create Student through admin UI.
2. Create matching User through local `/api/signup` from an authenticated admin browser session if needed.
3. Create PAES_M1 enrollment through admin UI.
4. Create completed initial Diagnostic through local `/api/diagnostics` from the authenticated enrollment page if needed.
5. Create Cycle 1 through admin UI.
6. Use admin UI to curate or create the local StudyLoad path only through existing application behavior.

Do not use direct SQL, Prisma CLI, or standalone mutation scripts.

### D. Ensure Path To AS1 Endpoint StudyLoad

The local student must have a pending or in-progress StudyLoad:

```text
PAES M1 - Funciones lineales basicas
contentKey: paes_m1_linear_functions_basic
```

If the student is earlier in AS1, complete earlier AS1 activities through the existing UI/API flow until this StudyLoad is reached.

Earlier AS1 path expected:

```text
paes_m1_balanced_entry_initial
-> paes_m1_linear_equations_basic
-> paes_m1_linear_equations_word_problems
-> paes_m1_linear_equations_reinforcement
-> paes_m1_linear_functions_basic
```

### E. Log In As Local Student

1. Use a separate private/incognito browser session if helpful.
2. Log in through the local login page.
3. Confirm `/now` shows the intended local StudyLoad.

### F. Complete The AS1 Endpoint StudyLoad

1. Open `/now` or `/now/study-loads/[id]`.
2. Start `PAES M1 - Funciones lineales basicas` if it is pending.
3. Answer the multiple-choice items.
4. Submit answers through the UI.
5. Complete the StudyLoad with one of the allowed self-report options.
6. Do not call the completion route with an unauthenticated or forged session.

### G. Return To Verification Surface

Use one or both:

- student `/now`;
- admin cycle or StudyLoad detail page.

### H. Verify PE1 Pending StudyLoad

Confirm a new pending StudyLoad exists:

```text
PAES M1 - Lectura de tablas y graficos
contentKey: paes_m1_data_representation_entry
status: pending
```

The expected continuity edge is only:

```text
paes_m1_linear_functions_basic -> paes_m1_data_representation_entry
```

### I. Verify Earlier AS1 Transitions If Feasible

If the fixture starts earlier in AS1, confirm earlier transitions still produce their expected next loads and do not jump to PE1 early.

This is optional for 5V2B if the fixture begins directly at `PAES M1 - Funciones lineales basicas`.

### J. Verify Duplicate Prevention If Feasible And Safe

If safe through existing UI/API behavior, retry or revisit completion state and confirm no duplicate PE1 pending StudyLoad is created.

Do not force duplicate checks through database mutation or direct API calls that bypass normal app state.

### K. Verify PE1 Terminal Behavior If Feasible And Safe

If safe, complete `PAES M1 - Lectura de tablas y graficos` through the existing student UI and confirm it does not create another automatic next load.

This is optional for 5V2B and should not be forced if it risks fixture confusion.

## 7. Data Handling Rules

Future human verification may mutate local-only data through existing UI/API flows.

Rules:

- no production;
- no deploy;
- no direct SQL;
- no Prisma mutation/reset/push;
- no `.env` printing;
- no credentials in `PHASE_LOG.md` or docs;
- no screenshots containing secrets;
- no generated artifacts committed;
- no `.logs`, `node_modules`, `yarn.lock`, build artifacts, or checkpoint artifacts committed.

## 8. Success Criteria For Future 5V2B

Future phase:

```text
MVP-SRA-IMPL-5V2B - Execute full local UI/API PE1 bridge verification
```

Success requires:

- starting load is `PAES M1 - Funciones lineales basicas`;
- student completes it through existing local UI/API;
- resulting pending load is `PAES M1 - Lectura de tablas y graficos`;
- no duplicate PE1 is created if duplicate prevention is checked;
- no production, deploy, schema change, direct SQL, Prisma mutation/reset/push, or auth bypass is used;
- result is documented as PASSED.

## 9. If Blocked Again

Acceptable future outcomes:

- `BLOCKED-AUTH`: no valid local admin/student session.
- `BLOCKED-DATA`: fixture cannot be safely created or reused.
- `PARTIAL-API`: authenticated API verified but UI not completed.
- `PASSED`: full local UI/API verified.

If blocked, stop and document the exact blocker. Do not broaden scope.

## 10. Non-Goals

This protocol does not authorize:

- deploy;
- production;
- code implementation;
- registry edit;
- selector expansion;
- continuity map change;
- admin decision view;
- decision record persistence;
- schema/database change;
- direct SQL;
- Prisma CLI mutation;
- PAES score, theta, mastery, automatic diagnosis, or adaptive AI claim.

## 11. Recommended Next Step

Recommended sequence:

1. Human/operator prepares local credentials and authenticated local browser sessions.
2. Execute `MVP-SRA-IMPL-5V2B - Execute full local UI/API PE1 bridge verification`.
3. If that is not practical today, move to `MVP-SRA-IMPL-6R - Readiness for admin read-only pedagogical decision/evidence view`.

Do not recommend deploy until Mauricio explicitly authorizes it after reviewing verification status.
