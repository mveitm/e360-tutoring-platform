# CUST-AUTH-0 — Student Admin Access Exposure Audit

**Date:** 2026-05-03
**Phase:** CUST-AUTH-0
**Type:** Read-only security/authorization audit
**Status:** Complete — no fixes implemented

---

## 1. Auth/Session Model

### How does the app authenticate users?

The app uses **NextAuth.js** with a single `CredentialsProvider` (email + password). Passwords
are hashed with bcrypt. Session strategy is **JWT** (not database sessions).

**File:** `lib/auth-options.ts`

### What fields exist on `session.user`?

The JWT callback stores only `token.id` from the user object. The session callback exposes:
- `session.user.id` (added via callback)
- `session.user.email` (default from NextAuth)
- `session.user.name` (default from NextAuth)

**There is no role, isAdmin, type, or authorization field on the session.**

### Does the database User model contain a role or admin field?

**No.** The `User` model in `prisma/schema.prisma` contains:
- `id`, `name`, `email`, `emailVerified`, `image`, `password`
- Relations to `Account[]` and `Session[]` (NextAuth adapter tables)

There is no `role`, `isAdmin`, `type`, `userType`, or any equivalent authorization field.

### Authorize function

The `authorize` callback in `auth-options.ts` returns `{ id, email, name }` — no role
information is attached at login time.

---

## 2. Admin Access Boundary

### What protects `/admin` pages?

**Middleware only** (`middleware.ts`):

```typescript
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: { signIn: '/login' },
})

export const config = {
  matcher: ['/admin/:path*', '/now'],
}
```

This middleware checks **only whether the user has a valid session** (is authenticated).
It does **not** check any role, admin flag, or email allowlist.

**Result: Any authenticated user can access any `/admin` route, including `/admin/beta-operations`.**

### What protects `/admin/beta-operations`?

The `beta-operations/page.tsx` server component calls:
```typescript
const session = await getServerSession(authOptions)
if (!session) redirect('/login')
```

This is an authentication check, not an authorization check. Any authenticated user passes.

### Admin layout

The admin layout (`app/admin/layout.tsx`) renders `<AdminNav />` and `{children}` with
**no server-side or client-side authorization check**.

---

## 3. Admin APIs

### What protects APIs used by admin pages?

**Every API route** in the project uses the same pattern:
```typescript
const session = await getServerSession(authOptions)
if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
```

This checks for **authentication only** — not admin authorization.

**No API route in the entire codebase checks for admin role, email allowlist, or any
authorization attribute.**

### Which APIs are most sensitive?

All admin APIs are equally exposed. The most sensitive include:
- `GET /api/students` — lists all students with names and emails
- `POST/PUT/DELETE /api/students/[id]` — can create, edit, delete student records
- `GET /api/study-loads` — lists all study loads across all students
- `POST /api/study-loads` — can create study loads
- `PATCH /api/study-loads/[id]` — can change study load status
- `GET /api/learning-cycles/[id]` — exposes cycle detail with evidence/responses
- `POST /api/learning-cycles/[id]/close` — can close learning cycles
- `POST /api/learning-cycles/[id]/continue` — can trigger continuity
- `GET /api/cycle-decisions` — lists pedagogical decisions
- `GET /api/continuity-signals` — lists continuity signals
- `GET /api/skill-states` — lists mastery data
- All continuity-start endpoints (precedence, shadow-block, convergence, reconciliation)

### Public signup endpoint

**Additional finding:** `POST /api/signup` is **completely public** (no auth check).
Anyone can create a new user account. The route defaults `name` to `'Admin'`.
This means an external attacker could create an account and immediately access all
admin routes and APIs.

---

## 4. Student `/now` Access

### How does `/now` determine the current student?

The `/now` page (`app/now/page.tsx`) uses **provisional email linkage**:
1. Gets `session.user.email` from the server session.
2. Looks up `prisma.student.findUnique({ where: { email } })` to find the Student record.
3. If found, resolves the active enrollment via `StudentProgramInstance`.
4. If not found, shows empty state: "No tienes un programa activo todavía."

### What happens when an authenticated user has no matching Student/Enrollment?

They see the empty state message. This is correct behavior for the student surface.
The new admin-like account seeing no programs in `/now` is expected — it has no
Student record with matching email.

---

## 5. Admin Link Exposure

### Why does `/now` show `Ir al panel de administración`?

The `/now` page computes `isAdminSession` on line 78:

```typescript
const isAdminSession = !!(await prisma.user.findUnique({ where: { email } }))
```

This checks whether a `User` record exists for the session email. Since **all authenticated
users** have a corresponding `User` record (that's how they log in), this check **always
returns true** for any authenticated user.

**The admin link is shown to every authenticated user, including students.**

The variable name `isAdminSession` is misleading — it does not actually check for admin
status. It checks for User record existence, which is a tautology for authenticated users.

---

## 6. Data Exposure Risk

### What data can a student account see through `/admin/beta-operations`?

The Beta Operations page fetches and displays:
- **All active enrollments** with student first name, last name, email, and program
- **All open/in-progress learning cycles** with study load details
- **All study loads** across all students with titles, types, statuses, and timestamps
- Computed counters (active enrollments, open cycles, pending/in-progress/completed loads)
- Cycles ready for review

**A student can see other students' names, emails, enrollments, cycle status, and study
load details.**

### Can a student access other admin pages?

Yes. Through the admin navigation, a student can access:
- `/admin/students` — full student directory with CRUD
- `/admin/instances` — all enrollments with CRUD
- `/admin/learning-cycles` — all cycles with detail views
- `/admin/study-loads` — all study loads with CRUD
- `/admin/cycle-decisions` — all pedagogical decisions
- `/admin/cycle-evaluations` — all evaluations
- `/admin/skill-states` — all mastery data
- `/admin/axes` — learning axes
- `/admin/skills` — skill definitions

### Can a student trigger write actions?

Yes. All admin APIs accept requests from any authenticated user. A student account can:
- Create, edit, delete students
- Create, edit, delete enrollments
- Create cycles, close cycles, trigger continuity
- Create, edit, delete study loads
- Create, edit, delete cycle decisions and evaluations
- Modify skill states and mastery levels

---

## 7. Root Cause

**Primary root cause:** The application has **no authorization model**. There is no
role/admin concept anywhere in the system — not in the database schema, not in the session,
not in middleware, and not in API routes.

The contributing factors are:

1. **No role field on User model.** The `User` table has no `role`, `isAdmin`, or
   equivalent column.
2. **Middleware allows any authenticated user into `/admin`.** The `withAuth` middleware
   only checks for a valid JWT session, not admin role.
3. **Admin pages only check session existence.** Server components use
   `if (!session) redirect('/login')` — authentication, not authorization.
4. **Admin link shown unconditionally.** The `isAdminSession` check in `/now` is a
   tautology that always returns true for authenticated users.
5. **API routes lack admin authorization.** Every API uses `if (!session)` — no role check.
6. **Public signup endpoint.** Anyone can create an account without invitation.

---

## 8. Severity

**Classification: BLOCKER**

### Impact on internal beta
- Any student account can read all other students' data.
- Any student account can modify any record in the system.
- The admin panel is fully exposed to all authenticated users.
- The public signup endpoint allows anyone to create an account and access everything.

### Impact on public beta readiness
- **Public beta cannot proceed** until admin access is restricted.
- Even internal guided beta is compromised — the operator must assume students can
  see and modify all admin data.
- Data integrity cannot be guaranteed while students have write access to admin APIs.

---

## 9. Recommended Fix Strategy

### Proposed phase: CUST-AUTH-1 — Enforce admin-only access boundary

**Target behavior after fix:**

| Scenario | Expected behavior |
|---|---|
| Admin user → `/admin` | Access granted |
| Student user → `/admin` | Redirect to `/now` (or 403) |
| Student user → admin APIs | 403 Forbidden |
| `/now` for non-admin | Admin link hidden |
| `/now` for admin with no Student | Safe empty state (no admin link issue) |
| Unauthenticated → `/admin` | Redirect to `/login` |
| Unauthenticated → admin APIs | 401 Unauthorized |
| User without Student enrollment → `/now` | Safe empty state message |
| Public signup endpoint | Disabled or protected |

---

## 10. Potential Implementation Options

### Option A: Add `role` field to User model

- Add `role String @default("student")` to the User model.
- Check `role === 'admin'` in middleware, pages, and APIs.
- **Pros:** Standard pattern, scalable, clear semantics.
- **Cons:** Requires schema migration (Prisma `db push`). Must backfill existing
  User records. Risk of data loss if migration handled incorrectly. Higher
  implementation complexity.

### Option B: Admin email allowlist from environment variable

- Define `ADMIN_EMAILS=admin@e360.cl,operator@e360.cl` in `.env`.
- Create a helper `isAdmin(email)` that checks against the allowlist.
- Use in middleware, server components, and API routes.
- **Pros:** No schema change. No migration risk. Fast to implement. Easy to manage
  for 1–3 operator beta. Secrets stay in `.env`, not in code.
- **Cons:** Not scalable for many admins. Requires restart/redeploy to change list.
  Must ensure `.env` is not exposed.

### Option C: Separate Admin table

- No existing Admin table in the schema.
- Would require creating one — similar complexity to Option A.
- Not recommended for MVP.

### Option D: Route-level guard helper (complement to A or B)

- Create `lib/admin-guard.ts` with `requireAdmin(session)` helper.
- Use in every admin API route and server component.
- Can work with either Option A or B as the underlying check.

### Recommendation

**Option B (email allowlist) + Option D (guard helper)** is the safest minimal path
for the current beta stage:
- Zero schema risk (no migration, no data loss potential).
- Fast implementation (can be done in one phase).
- Sufficient for 1–3 operator internal beta.
- Can be upgraded to Option A later when scaling.

Additionally:
- Disable or protect the public signup endpoint.
- Fix the `isAdminSession` check in `/now` to use the same admin helper.

---

## 11. Test Plan for Future Fix (CUST-AUTH-1)

### Browser checks
1. Unauthenticated → `/admin` → redirects to `/login`.
2. Log in as Test Now (student) → navigate to `/admin` → blocked (redirect or 403).
3. Test Now → `/now` → still works, loads visible, admin link **hidden**.
4. Log in as admin → `/admin` → access granted, full functionality.
5. Admin → `/now` with no enrollment → safe empty state shown.
6. Admin → `/now` → admin link visible.

### API checks
7. Student token → `GET /api/students` → 403.
8. Student token → `POST /api/students` → 403.
9. Student token → `GET /api/study-loads` → 403.
10. Student token → `POST /api/learning-cycles/[id]/close` → 403.
11. Admin token → all admin APIs → 200 (unchanged behavior).
12. Unauthenticated → all admin APIs → 401 (unchanged behavior).
13. Unauthenticated → `POST /api/signup` → 403 or disabled.

### Data verification
14. No student data exposed to non-admin accounts.
15. Student can still complete study loads via `/now` student surface.
16. Student can still submit MC answers via student APIs.

---

## 12. Immediate Operational Guidance

**Until CUST-AUTH-1 is implemented:**

1. **Do not invite new students.** Every student account has full admin access.
2. **Do not treat beta as secure.** All data is accessible to all authenticated users.
3. **Do not use Test Now on admin routes for student validation** except knowingly
   and with awareness that Test Now can see all admin data.
4. **Avoid exposing production student data** to non-admin accounts.
5. **Do not share the signup URL.** Anyone who discovers it can create an account
   and access everything.
6. **Consider the public signup endpoint a separate vulnerability.** Even after
   admin access is fixed, public signup should be disabled or gated.
7. **Monitor for unexpected user creation** in the production User table.
8. **Treat all student-facing sessions as having admin-equivalent access** for risk
   assessment purposes.

---

## Summary

| Finding | Status |
|---|---|
| No role/admin model in schema | Confirmed |
| Middleware: auth-only, not admin-only | Confirmed |
| Admin pages: auth-only check | Confirmed |
| Admin APIs: auth-only check | Confirmed |
| `/now` admin link: shown to all users | Confirmed |
| Beta Ops: full data visible to students | Confirmed |
| Students can write via admin APIs | Confirmed |
| Public signup: no auth required | Confirmed |
| Root cause: no authorization model exists | Confirmed |
| Severity | **BLOCKER** |
| Recommended fix | CUST-AUTH-1: email allowlist + guard helper |
