# CUST-STUDENT-AUTH-1A — Mauricio Student Access Recovery Readiness

**Phase:** CUST-STUDENT-AUTH-1A
**Date:** 2026-05-04
**Type:** Auth custody / readiness-only
**Status:** ⛔ BLOCKED — no safe approved password recovery pathway exists
**Baseline commit:** `ec06e94` (FL-UX-4J-C)

---

## 1. Phase Summary

Audited the application for any safe, approved pathway to restore Mauricio's student account access after the FL-UX-4J-C login blocker. **No such pathway exists.** The app lacks password reset, forgot-password, and admin-mediated password change functionality entirely.

---

## 2. Baseline

- Commit: `ec06e94` (FL-UX-4J-C: blocked student visibility check (auth issue))
- Branch: `main`, up to date with `origin/main`
- Working tree: clean

---

## 3. Blocker Being Addressed

FL-UX-4J-C was blocked because the Mauricio student account password was not recognized during login at `/now`. The student-facing visibility check could not proceed.

---

## 4. Auth Pathway Audit

### 4.1 Login Mechanism

- **Provider:** NextAuth CredentialsProvider (`lib/auth-options.ts`)
- **Method:** Email + password with bcrypt hash comparison
- **Login UI:** `/login` page with email/password form
- **Login API:** `POST /api/auth/login` — validates credentials, returns user session
- **Auth flow:** Standard NextAuth JWT strategy with PrismaAdapter

### 4.2 Account Creation

- **Endpoint:** `POST /api/signup`
- **Access:** Admin-only (protected by `requireAdminApi()`)
- **Behavior:** Creates a new User with email + bcrypt-hashed password
- **Limitation:** Rejects if email already exists (`User already exists`). **Cannot update existing user.**

### 4.3 Password Reset / Change

| Pathway | Exists? | Details |
|---|---|---|
| Admin UI password reset for users | ❌ No | Admin students view has no password field; Student and User are separate entities |
| Admin API password update endpoint | ❌ No | No `PUT/PATCH /api/users/[id]` or similar endpoint exists |
| Forgot-password email flow | ❌ No | No `forgot-password` or `reset-password` route/page exists |
| Self-service password change | ❌ No | No account settings page or password change form exists |
| Password reset token mechanism | ❌ No | No reset token generation, storage, or validation code exists |
| Any `password` keyword in admin code | ❌ No | grep for `password` in `/app/admin` returns zero matches |
| Any user management API | ❌ No | No `/api/users` directory exists |

### 4.4 Relevant Endpoints Audited

| File | Capability | Password Update? |
|---|---|---|
| `app/api/auth/login/route.ts` | Login (read-only compare) | ❌ No |
| `app/api/signup/route.ts` | Create new user (admin-only) | ❌ Create only, no update |
| `app/api/auth/[...nextauth]/route.ts` | NextAuth handler | ❌ No |
| `app/api/students/route.ts` | CRUD for Student entity | ❌ Student ≠ User; no password |
| `app/admin/students/[id]/_components/student-detail-view.tsx` | Student detail UI | ❌ No user/password management |

### 4.5 Conclusion

**No approved student password recovery pathway exists in the current application.** The only way to update a user's password would be direct database mutation (SQL `UPDATE` on the `users` table), which is prohibited by custody rules.

---

## 5. Safe Options Found

None. No safe, approved, custody-compliant pathway exists for password recovery.

---

## 6. Human Operation Result

No human operation was performed. No safe pathway was available to instruct the human owner.

---

## 7. Recommended Next Steps

The blocker requires a **code implementation phase** to add a safe admin-mediated password reset pathway. Two recommended approaches:

### Option A — Admin-mediated password reset API (minimal)

Add an admin-only API endpoint (e.g., `POST /api/users/[id]/reset-password`) that:
- Accepts a new password from the admin session
- Hashes it with bcrypt
- Updates the User record
- Is protected by `requireAdminApi()`
- Includes audit logging

The admin UI (e.g., student detail page or a dedicated user management section) would expose a form where the human owner privately enters a new password. Abacus never sees the password.

### Option B — Full password management (more complete)

Add:
- Admin-mediated password reset (Option A)
- Student-facing self-service password change
- Forgot-password email flow (requires email notification setup)

Option B is more complete but requires more implementation effort and potentially email infrastructure.

### Recommended Phase

```
CUST-STUDENT-AUTH-1B — Add admin-mediated student password reset pathway (readiness + implementation)
```

This would be a code-change phase requiring build, test, checkpoint, and deploy.

---

## 8. Custody Compliance

| Check | Result |
|---|---|
| Password/credential inspected or printed | ❌ No |
| Seed/test credentials used | ❌ No |
| Password hashes inspected | ❌ No |
| .env accessed | ❌ No |
| SQL / psql | ❌ No |
| DB mutation | ❌ No |
| User directly mutated by Abacus | ❌ No |
| Deploy | ❌ No |
| Schema change | ❌ No |
| Code change | ❌ No |
| Auth config modified | ❌ No |
| Test Now / Ana / Bruno touched | ❌ No |
| Student learning data changed | ❌ No |
| Secrets inspected or printed | ❌ No |

---

## 9. Known State After CUST-STUDENT-AUTH-1A

| Item | State |
|---|---|
| Mauricio student account | Login not working (password not recognized) |
| Mauricio admin-side data | Intact — Cycle 3 open, 1 pending registry-matched StudyLoad |
| Password recovery pathway | Does not exist in the app |
| FL-UX-4J-C | Remains blocked pending student access restoration |
| App code | Unchanged |
| All other students | Unchanged |

---

## 10. Recommended Next Phase

**CUST-STUDENT-AUTH-1B — Add admin-mediated student password reset pathway**

This phase would:
1. Implement an admin-only password reset API endpoint.
2. Add a password reset form to the admin UI (student detail page or user management).
3. Require build, test, checkpoint, and deploy.
4. After deploy, the human owner would privately set a new password for Mauricio via the admin UI.
5. Then retry FL-UX-4J-C.

---

*Generated as part of CUST-STUDENT-AUTH-1A. Readiness-only — no data mutations, no .env access, no SQL, no deploy, no schema changes, no code changes, no credentials inspected.*
