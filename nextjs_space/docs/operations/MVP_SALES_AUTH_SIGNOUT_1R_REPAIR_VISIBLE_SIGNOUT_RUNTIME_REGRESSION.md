# MVP-SALES-AUTH-SIGNOUT-1R - Repair visible sign-out runtime regression

## 1. Baseline

Phase:

```text
MVP-SALES-AUTH-SIGNOUT-1R - Repair visible sign-out runtime regression
```

Type:

```text
Narrow runtime repair / no auth provider change / no dry-run.
```

Baseline confirmed:

```text
HEAD = origin/main = origin/HEAD = 8cf2eab
Latest accepted commit = 8cf2eab - MVP-SALES-AUTH-SIGNOUT-1: add visible sign-out control
```

## 2. Regression Context

`8cf2eab` introduced or exposed a runtime regression on `/now` after adding the visible sign-out control.

The repair scope is limited to the sign-out runtime path. The goal is to keep a visible `Cerrar sesion` control for operator-driven admin/student session switching while avoiding the `/now` runtime failure.

## 3. Implementation Summary

Implemented changes:

* added `GET /api/session/sign-out`;
* the endpoint expires NextAuth session-related cookies and redirects to `/login`;
* the endpoint preserves secure deletion semantics for `__Secure-` and `__Host-` NextAuth cookie names;
* `/now` now renders a server-renderable link to `/api/session/sign-out`;
* admin navigation uses the same `/api/session/sign-out` endpoint;
* `/now` and `/admin` now share the same logout path.

Files changed:

* `PHASE_LOG.md`;
* `nextjs_space/app/api/session/sign-out/route.ts`;
* `nextjs_space/app/now/_components/sign-out-button.tsx`;
* `nextjs_space/app/admin/_components/admin-nav.tsx`;
* `nextjs_space/docs/operations/MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`.

## 4. Verification Result

Completed verification:

```text
npm.cmd --prefix nextjs_space run build: PASS
git diff --check: PASS
git status --short --untracked-files=all: REVIEWED
git diff --stat: REVIEWED
```

Runtime smoke:

1. `/now` returned HTTP 200 in local dev.
2. `/admin` returned HTTP 200 in local dev.
3. `/api/session/sign-out` returned a redirect to `/login`.

Authenticated visual click-through was not executed in this closeout because this phase did not use or print student/admin credentials, cookies, headers, request bodies, or response bodies.

## 5. Result Classification

Expected result:

```text
VISIBLE_SIGN_OUT_RUNTIME_REGRESSION_REPAIRED
```

## 6. Explicit Non-actions

This repair does not:

* change auth model;
* change CredentialsProvider;
* touch DB;
* use SQL;
* run Prisma CLI;
* change schema;
* mutate StudentAccess;
* change payment, trial, or subscription;
* activate L1;
* activate M2;
* execute student dry-run;
* open activity;
* start or complete StudyLoad;
* create responses, evidence, or self-report;
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
* print passwords;
* print hashes;
* declare Sales-Ready;
* declare MVP-Beta cerrado complete.

## Result Marker

```text
MVP_SALES_AUTH_SIGNOUT_1R_VISIBLE_SIGN_OUT_RUNTIME_REGRESSION_REPAIRED
```
