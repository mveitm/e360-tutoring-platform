# MVP-SALES-AUTH-1C - Student Signup Account Creation

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: `MVP-SALES-AUTH-1B` closed at `40cdbf1`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: implement minimal public student signup/account creation with normalized email-convention linkage.
- Explicit non-goals: no schema changes, no package changes, no deploy, no SQL, no Prisma CLI, no `.env` or secret inspection, no staging/production mutation, no enrollment, no trial, no billing/payment/subscription, no Program, no LearningCycle, no StudyLoad, no Block 7, no FK User/Student, no seed, no commit, no push, no generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: `40cdbf10307d38449775c4a4fe3a9960f0271f82`; `HEAD`, `origin/main`, and `origin/HEAD` point to `40cdbf1`.
- Baseline verdict: baseline matches expected `40cdbf1`; working tree was clean at phase start.

## 3. Human decision applied
AUTH-1C uses normalized email-convention linkage as the transitional MVP approach:

- No FK User/Student yet.
- No schema change.
- No DB migration.
- No Prisma CLI.
- No backfill.
- Explicit FK User/Student hardening remains deferred to a later phase.

## 4. Implementation summary
Implemented a minimal public student signup path:

- Added `/signup` student-facing UI.
- Reworked `POST /api/signup` into public student signup.
- Validates first name, last name, email, password, and password confirmation.
- Normalizes email with `trim().toLowerCase()` before lookup and write.
- Blocks admin-allowlisted email from public student signup without exposing allowlist details.
- Creates `User` and `Student` in one Prisma transaction with matching normalized email.
- Keeps login/admin routing split: admin goes to `/admin`, student/non-admin goes to `/now`.
- Normalizes email in credentials login lookup.

## 5. Files changed
- `nextjs_space/app/api/signup/route.ts`: public student signup endpoint, validation, admin email protection, duplicate handling, transaction creating User + Student.
- `nextjs_space/app/signup/page.tsx`: public signup page with authenticated redirect safety.
- `nextjs_space/app/signup/_components/signup-form.tsx`: student-facing signup form and post-signup sign-in attempt.
- `nextjs_space/app/login/page.tsx`: redirects authenticated admins to `/admin` and non-admins to `/now`.
- `nextjs_space/app/login/_components/login-form.tsx`: removes misleading admin signup toggle, adds link to `/signup`, sends successful login through root router.
- `nextjs_space/app/page.tsx`: routes authenticated admins to `/admin` and non-admins to `/now`.
- `nextjs_space/lib/auth-options.ts`: normalizes email before credentials lookup.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1C_STUDENT_SIGNUP_ACCOUNT_CREATION.md`: this operational close/readiness document.
- `PHASE_LOG.md`: phase ledger entry.

## 6. Signup behavior
- Inputs: `firstName`, `lastName`, `email`, `password`, `confirmPassword`.
- Validations: firstName and lastName non-empty after trim; email basic valid format; password minimum 8 characters; confirmPassword must match password.
- Email normalization: email is trimmed and lowercased before admin check, existing-record lookup, User creation, and Student creation.
- User creation: creates `User` with normalized email, full display name, and bcrypt-hashed password.
- Student creation: creates `Student` with firstName, lastName, normalized email, and `status = active`.
- Duplicate handling: if existing User or Student is found for normalized email, endpoint returns a safe account-exists message and does not overwrite password or profile data.
- Admin email protection: if normalized email is admin-allowlisted, endpoint returns the same generic account-exists/support message and does not expose allowlist state.
- Post-signup routing/next step: signup form attempts credentials sign-in and routes successful signup/login to `/now`; if sign-in does not complete, it routes to `/login?signup=success`.

## 7. Login/routing behavior
- `/login`: authenticated admin email redirects to `/admin`; authenticated non-admin redirects to `/now`.
- Login form: successful credentials login routes through `/`, allowing server-side routing to decide admin vs student destination.
- `/`: authenticated admin email redirects to `/admin`; authenticated non-admin redirects to `/now`; unauthenticated user redirects to `/login`.
- Existing admin guard semantics are preserved. `requireAdminSession()` and `requireAdminApi()` were not changed.

## 8. Explicitly not created
Confirmed not created or modified by implementation:

- No enrollment.
- No trial.
- No billing.
- No payment/subscription.
- No Program.
- No LearningCycle.
- No StudyLoad.
- No Block 7 content or pedagogy work.
- No schema change.
- No package change.
- No deploy.

## 9. Verification
- `git diff --check`: passed. Output only warned that Git may replace LF with CRLF when touching changed files.
- `npm run build`: initial direct PowerShell invocation failed because local execution policy blocks `npm.ps1`; no project code failure.
- `npm.cmd run build`: passed. Next.js compiled successfully, type checks passed, and `/signup` appeared as a dynamic route in the build output.
- `git diff --stat`: run after implementation and after docs/ledger update.
- `git status --short`: run after implementation and after docs/ledger update.

## 10. Remaining risks
- Email-only linkage remains transitional.
- No FK User/Student yet.
- Existing legacy non-normalized emails may still require later controlled reconciliation.
- Runtime signup smoke would create local/dev records and should be done in a controlled smoke phase, not this phase.
- Billing/trial/enrollment remain absent.
- This phase did not validate actual browser signup against a DB because DB mutation was intentionally avoided.

## 11. Recommended next phase
`MVP-SALES-AUTH-1D - Controlled local signup smoke and admin/student routing verification`

Purpose: run a controlled local/dev smoke that intentionally creates a test student account, verifies login routing, verifies `/now` safe state without enrollment, verifies admin login still reaches `/admin`, and confirms no enrollment/trial/payment/cycle/load records are created by signup.

## 12. Final verdict
READY_FOR_AUTH_1D_CONTROLLED_SMOKE
