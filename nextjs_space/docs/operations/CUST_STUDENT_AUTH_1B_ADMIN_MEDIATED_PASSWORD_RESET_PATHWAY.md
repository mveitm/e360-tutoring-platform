# CUST-STUDENT-AUTH-1B — Admin-Mediated Password Reset Pathway

**Date:** 2026-05-04  
**Depends on:** CUST-STUDENT-AUTH-1A (eda9f1b)  
**Status:** Implemented, awaiting deploy + human execution

## Purpose

Provide a safe, admin-only mechanism to reset a student's login password
directly from the admin student-detail page. This unblocks FL-UX-4J-C
(student-facing visibility check) which was blocked because Mauricio's
student account password is not recognized.

## What was built

### API endpoint

**`POST /api/students/[id]/reset-password`**

| Field           | Type   | Required | Validation                       |
|-----------------|--------|----------|----------------------------------|
| password        | string | yes      | min 8 chars                      |
| confirmPassword | string | yes      | must match `password`            |

**Flow:**
1. Admin gate via `requireAdminApi()`.
2. Validate input (presence, length, match).
3. Resolve `Student` → `User` by email match.
4. `bcrypt.hash(password, 10)` → update `User.password`.
5. Fire-and-forget audit event (`PASSWORD_RESET` action, safe payload — no hash/password logged).
6. Return `{ success: true }` — no credential data in response.

**Error responses:**
- 400: missing password, too short, mismatch
- 401: not authenticated
- 403: not admin
- 404: student not found, or no User linked by email
- 500: unexpected error

### UI component

Added to `app/admin/students/[id]/_components/student-detail-view.tsx`:

- **"Restablecer contraseña"** card section between header and enrollments.
- Two password fields with show/hide toggles.
- Client-side validation mirrors server-side.
- Success toast + form clear on success.
- Error toast on failure.

## Custody rules

- **No password or hash is ever returned in any HTTP response.**
- **No password or hash is ever stored in audit payloads.**
- **The human owner enters the new password privately via the admin UI in production.**
- **Abacus never sees, logs, or stores the plaintext password.**

## Files created/modified

| File | Action |
|------|--------|
| `app/api/students/[id]/reset-password/route.ts` | Created |
| `app/admin/students/[id]/_components/student-detail-view.tsx` | Modified |

## Schema changes

None. Existing `User.password` (nullable String) is sufficient.

## How to use (human owner)

1. Log in as admin at the deployed app.
2. Navigate to Admin → Students → select the student.
3. In the "Restablecer contraseña" card, enter the new password twice.
4. Click "Restablecer contraseña".
5. Confirm the success toast.
6. Have the student log in with the new password.

## Next steps

After deploy, the human owner will:
1. Reset Mauricio's password via the admin UI.
2. Retry FL-UX-4J-C: log in as Mauricio at `/now` and verify the curated
   Cycle 3 StudyLoad ("PAES M1 — Refuerzo de ecuaciones lineales") is visible.
