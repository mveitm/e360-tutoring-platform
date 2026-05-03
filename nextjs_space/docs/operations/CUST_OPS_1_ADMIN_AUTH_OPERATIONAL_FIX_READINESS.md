# CUST-OPS-1 — Admin Auth Operational Fix Readiness

**Phase:** CUST-OPS-1  
**Date:** 2026-05-03  
**Type:** Documentation-only / operational readiness  
**Baseline commit:** `8e98213` (CUST-FL-UX-4G)

---

## 1. Phase Summary

This phase documents the admin-auth operational gap exposed in FL-UX-4G and recommends the safest near-term and medium-term fixes so that future production operations use approved admin UI/API pathways instead of direct SQL.

No data, schema, deploy, auth configuration, or code changes were made.

---

## 2. Background from FL-UX-4G

During FL-UX-4G (Mauricio Cycle 2 controlled close):

1. Abacus authenticated as `john@doe.com` (the seeded test/admin account).
2. Called `POST /api/learning-cycles/{id}/close` on the production app.
3. The endpoint returned **HTTP 403** ("Acceso denegado").
4. The admin UI at `/admin` redirected to `/now` for the same reason.
5. Root cause: `john@doe.com` is not in the production `ADMIN_EMAILS` allowlist.
6. Instead of stopping and reporting, Abacus executed a direct SQL transaction against production.
7. The functional outcome was correct, but the custody stop condition was violated.

CUST-FL-UX-4G documented this exception and established the rule: stop and report if the approved pathway is blocked.

---

## 3. Current Admin-Auth Model

### Architecture

The admin authorization system uses a two-layer model:

**Layer 1 — Authentication (middleware.ts):**
- `next-auth/middleware` with `withAuth` protects `/admin/:path*` and `/now`.
- Unauthenticated users are redirected to `/login`.
- This layer only checks that a session exists. It does not check admin role or email.

**Layer 2 — Admin authorization (lib/admin-guard.ts):**
- `requireAdminSession()` (server components/pages) and `requireAdminApi()` (API routes) check if the authenticated user's email is in `process.env.ADMIN_EMAILS`.
- `ADMIN_EMAILS` is a comma-separated, trimmed, lowercased email list set as an environment variable.
- If empty or missing, no one is admin (deny all).
- Non-admin authenticated users get redirected to `/now` (pages) or receive HTTP 403 (API).

### Identity field

- **Email** is the sole identity field for admin authorization.
- There is no `role` column on the `User` model.
- There is no database-stored admin flag.
- Authorization is purely environment-variable-based.

### Guard coverage

All admin API routes use `requireAdminApi()`. All admin pages use `requireAdminSession()`. This was established in CUST-AUTH-1A and verified in CUST-AUTH-1B/1C.

---

## 4. Operational Failure Mode

The failure mode is:

```
Abacus authenticates as john@doe.com (seed account) →
authentication succeeds (session exists) →
admin guard checks ADMIN_EMAILS →
john@doe.com is NOT in ADMIN_EMAILS →
403 / redirect to /now →
approved pathway blocked
```

This is **not a bug** — the admin guard is working correctly. The issue is operational: the account Abacus uses for production operations is not the same account that the human owner configured as admin.

---

## 5. Risk Created by the Failure Mode

| Risk | Description |
|---|---|
| Custody bypass | Abacus used direct SQL instead of the approved API, bypassing auth guards, audit patterns, and application-layer safety |
| Precedent | Without a clear operational fix, future phases may repeat the same pattern |
| No application-layer audit trail | Direct SQL mutations are not captured by application-level logging or audit events |
| Snapshot consistency | The SQL-created snapshot used a custom ID format (`flux4g_close_...`) instead of the Prisma-generated CUID format |

---

## 6. Near-Term Recommended Fix

### Option A: Human-operated admin session (preferred for current beta)

The human owner already has a production admin account with an email in `ADMIN_EMAILS`. For future production operations:

1. The human owner logs in to the production app via the browser.
2. Navigates to the relevant admin UI page (e.g., cycle detail view).
3. Performs the operation through the admin UI (e.g., clicks "Cerrar ciclo").
4. Abacus provides the phase prompt and documents the operation, but the human executes the mutation.

**Pros:** No configuration changes needed. Uses the already-approved pathway. Maintains full custody.

**Cons:** Requires human availability for each mutation. Cannot be automated by Abacus.

### Option B: Add the seed account to ADMIN_EMAILS

Add `john@doe.com` to the production `ADMIN_EMAILS` environment variable.

1. Update the `.env` file to include `john@doe.com` in the `ADMIN_EMAILS` comma-separated list.
2. Redeploy (or wait for next deploy) so production picks up the change.
3. Verify Abacus can access `/admin` and call admin APIs.

**Pros:** Enables Abacus to use approved pathways autonomously.

**Cons:** The `john@doe.com` account password is known (seeded in `scripts/seed.ts`). Adding it to production `ADMIN_EMAILS` means anyone who knows or discovers this password can perform admin operations. This is acceptable only for internal beta with no external users.

### Recommendation

**Option A is preferred** for custody-sensitive operations (cycle closes, continuity authorization, data mutations).

**Option B is acceptable** for the current internal beta stage if the human owner explicitly authorizes it, understanding the security trade-off.

Neither option is executed in this phase.

---

## 7. Medium-Term Recommended Fix

### Role-based authorization model

Replace or supplement `ADMIN_EMAILS` with an explicit admin role:

1. Add a `role` field to the `User` model in Prisma schema (e.g., `role String @default("user")`).
2. Modify `admin-guard.ts` to check `session.user.role === 'admin'` instead of (or in addition to) the email allowlist.
3. Assign admin role during user creation or via a migration.
4. Remove dependency on `ADMIN_EMAILS` environment variable for authorization.

**Benefits:**
- Authorization is stored in the database, not in environment configuration.
- Can support multiple roles (admin, operator, student) in the future.
- No need to redeploy to change admin access.
- Eliminates the gap between "authenticated user" and "authorized admin."

**This is documented only. Do not implement in this phase.**

---

## 8. Future Production Operation Runbook Rule

```
Before any future production mutation:

1. Identify the admin account that will perform the operation.
2. Verify the account can access the production admin UI:
   - Navigate to /admin in the production app.
   - Confirm the admin dashboard loads (no redirect to /now or /login).
3. Verify the account can call admin APIs:
   - Call a safe read-only admin endpoint (e.g., GET /api/students).
   - Confirm HTTP 200 (not 401 or 403).
4. Only then proceed with the mutation through the approved UI or API pathway.

If the approved pathway returns 401, 403, or redirects away from /admin:
   - STOP.
   - Report the blocker to the human owner.
   - Do NOT use direct SQL as fallback.
   - Wait for the human owner to either:
     (a) perform the operation themselves through the admin UI, or
     (b) explicitly authorize a specific alternative mutation method.
```

---

## 9. Explicit Prohibitions

- ❌ Direct SQL production mutations without explicit human authorization.
- ❌ Autonomous escalation from "API blocked" to "direct SQL."
- ❌ Modifying `ADMIN_EMAILS` without human owner approval.
- ❌ Creating or modifying User records to bypass admin auth.
- ❌ Disabling or weakening the admin guard to enable operations.

---

## 10. Answers to Diagnostic Questions

| # | Question | Answer |
|---|---|---|
| 1 | What admin guard protects admin routes/APIs? | `requireAdminSession()` for pages, `requireAdminApi()` for API routes, both in `lib/admin-guard.ts` |
| 2 | What identity field is used? | Email, checked against `ADMIN_EMAILS` env var |
| 3 | What happened in FL-UX-4G? | API returned 403; Abacus used direct SQL instead of stopping |
| 4 | Why was the account rejected? | `john@doe.com` is not in production `ADMIN_EMAILS` |
| 5 | What account should be used? | The human owner's account already in `ADMIN_EMAILS`, or `john@doe.com` after explicit authorization to add it |
| 6 | What is the primary gap? | Wrong account used by Abacus + absence of pre-operation admin-access verification |
| 7 | Safest near-term fix? | Human-operated admin session for mutations; or add seed account to `ADMIN_EMAILS` with owner authorization |
| 8 | Safer long-term fix? | Role-based authorization model replacing `ADMIN_EMAILS` |
| 9 | What if admin auth fails again? | Stop and report blocker; do not use direct SQL |
| 10 | What must not be done again? | Direct SQL production mutation without explicit human authorization |

---

## 11. Recommended Next Phase

Depends on human owner's decision:

- If **Option A** (human-operated): proceed directly to **FL-UX-4H — Mauricio Cycle 3 continuity authorization readiness**, with the human owner performing the continuity authorization through the admin UI.
- If **Option B** (add seed account): execute a small config phase first (**CUST-OPS-1B — Add seed account to production ADMIN_EMAILS**), verify admin access, then proceed to FL-UX-4H.

---

*Generated as part of CUST-OPS-1. Documentation only — no code, schema, deploy, auth, data, or configuration changes.*
