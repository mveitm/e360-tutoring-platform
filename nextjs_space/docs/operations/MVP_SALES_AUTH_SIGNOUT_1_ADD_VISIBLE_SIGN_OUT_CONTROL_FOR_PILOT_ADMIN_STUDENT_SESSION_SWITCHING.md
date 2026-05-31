# MVP-SALES-AUTH-SIGNOUT-1 - Add visible sign-out control for pilot/admin-student session switching

## 1. Baseline

Phase:

```text
MVP-SALES-AUTH-SIGNOUT-1 - Add visible sign-out control for pilot/admin-student session switching
```

Type:

```text
Narrow auth UI control / no auth provider change / no dry-run.
```

Baseline confirmed by Git preflight:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = 34cb14c
```

Latest accepted commit:

```text
34cb14c - MVP-SALES-PILOT-DRY-RUN-3B: complete PILOT_M1_003 credential readiness
```

Required phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

Git preflight is the live truth for this phase.

## 2. Objective

Add a visible `Cerrar sesion` control so human-guided local/dev pilot operators can end the current session and return to `/login` before switching between admin and synthetic student accounts.

This phase exists because `MVP-SALES-PILOT-DRY-RUN-3C` was paused by session/browser switching friction, not by a confirmed credential failure.

## 3. Roadmap Context

Roadmap block:

```text
10 - Internal pilot and sales-ready go/no-go
```

Sales-ready relevance:

```text
direct/operational for controlled closed-pilot execution
```

This phase supports the closed M1-first pilot execution path. It does not declare Sales-Ready, public readiness, payment readiness, L1 readiness, M2 readiness, or MVP-Beta cerrado completion.

## 4. 3C Pause Context

3C pause classification:

```text
SIGNOUT_UI_DEBT converted to operational blocker for human-guided multi-student dry-runs
```

Operational issue:

* human-guided switching between admin and synthetic student sessions was frictionful;
* the issue was not yet evidence of invalid `PILOT_M1_003` credential;
* credential diagnosis was explicitly paused;
* no student dry-run was executed in 3C before this phase.

## 5. Implementation Summary

Implemented changes:

* added `SignOutButton` client component for `/now`;
* the component calls the existing NextAuth `signOut` mechanism with `callbackUrl: '/login'`;
* rendered the control visibly in the `/now` heading;
* updated the existing admin navigation sign-out label to visible Spanish copy: `Cerrar sesion`;
* retained the existing admin `signOut({ callbackUrl: '/login' })` behavior.

Files changed:

* `nextjs_space/app/now/_components/sign-out-button.tsx`;
* `nextjs_space/app/now/page.tsx`;
* `nextjs_space/app/admin/_components/admin-nav.tsx`;
* `nextjs_space/docs/operations/MVP_SALES_AUTH_SIGNOUT_1_ADD_VISIBLE_SIGN_OUT_CONTROL_FOR_PILOT_ADMIN_STUDENT_SESSION_SWITCHING.md`;
* `PHASE_LOG.md`.

## 6. Verification

Verification performed:

```text
npm.cmd --prefix nextjs_space run build
```

Result:

```text
PASS
```

Build outcome:

* compiled successfully;
* type validity check passed;
* static page generation completed.

Code-level behavior verified:

* `/now` now renders a visible sign-out button in the authenticated page header;
* admin navigation now renders visible `Cerrar sesion` text;
* both controls call NextAuth `signOut` with callback URL `/login`.

Not browser-click verified by Codex:

* Codex did not use an authenticated browser session;
* no password, cookie, token, header, storage value, or secret was requested or received;
* no student login or admin login was executed.

## 7. Result Classification

Result:

```text
VISIBLE_SIGN_OUT_CONTROL_ADDED
```

The operational blocker is addressed at the code/UI level for the next human-guided 3C attempt.

## 8. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-3C - Execute controlled local/dev student dry-run for PILOT_M1_003
```

Recommended execution note:

* use the visible `Cerrar sesion` control to end the current admin or student session before switching accounts;
* then continue the already authorized 3C human-guided student dry-run path for `PILOT_M1_003`.

## 9. Explicit Non-actions

This phase did not:

* continue credential diagnosis;
* ask for credentials;
* receive credentials;
* execute student login;
* execute admin login;
* open `/now` as a student;
* open activity;
* execute dry-run;
* start StudyLoad;
* complete StudyLoad;
* send responses;
* create evidence;
* create self-report;
* touch StudentAccess;
* touch DB;
* use SQL;
* run Prisma CLI;
* change CredentialsProvider;
* change auth schema;
* modify schema;
* change payment, trial, or subscription;
* activate L1;
* activate M2;
* touch staging;
* touch production;
* print secrets;
* print env values;
* print DB URLs;
* print tokens;
* print cookies;
* print headers;
* print request bodies;
* print response bodies;
* print password;
* print hash;
* print provider or storage values;
* declare Sales-Ready;
* declare MVP-Beta cerrado complete.

## Result Marker

```text
MVP_SALES_AUTH_SIGNOUT_1_VISIBLE_SIGN_OUT_CONTROL_ADDED
```
