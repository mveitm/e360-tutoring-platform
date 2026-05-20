# MVP-SALES-AUTH-1D - Controlled Local Signup Smoke

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: `MVP-SALES-AUTH-1C` closed at `b93d754`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: controlled local/dev smoke for student signup, student routing, student admin boundary, and limited admin regression without code changes.
- Explicit non-goals: no app code changes, no schema changes, no package changes, no deploy, no staging, no production, no SQL, no Prisma CLI, no `.env` or secret inspection, no printed passwords/hashes/tokens/cookies/secrets, no enrollment, no trial, no billing/payment/subscription, no Program, no LearningCycle, no StudyLoad, no Block 7, no FK, no seed, no commit, no push, no generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: `b93d754a2bfdfa15b9984ac9238dccab95d14ea7`; `HEAD`, `origin/main`, and `origin/HEAD` point to `b93d754`.
- Baseline verdict: baseline matches expected `b93d754`; working tree was clean at phase start.

## 3. Local smoke conditions
- Environment: local/dev app at `http://localhost:3000`.
- App command used: `npm.cmd run dev`.
- Build result: `npm.cmd run build` passed before smoke.
- Dev server / URL: dev server started locally; `/signup` returned HTTP 200.
- DB mutation scope: exactly one student signup was submitted through the local app endpoint, creating one local/dev User + Student pair by the AUTH-1C flow.
- Secrets policy: no `.env` files inspected; no password, hash, token, cookie, `DATABASE_URL`, `NEXTAUTH_SECRET`, or `ADMIN_EMAILS` value printed.

## 4. Test account
- Test email: `auth1d.student.20260520123829@test.bexauri.local`.
- Password handling: temporary local password generated in-memory for the smoke and not printed or documented.
- Created through: `/signup` loaded locally, then public `POST /api/signup` submitted by local HTTP client against the running app.

Do not include password.

## 5. Student signup result
- /signup loaded: yes, HTTP 200.
- Signup submitted: yes.
- Resulting route: API returned `next: /login`; credentials login then reached `/now`.
- Error/no error: no signup error; API returned HTTP 201.
- User-facing state: after login, student reached the student `/now` surface.

## 6. Student /now result
- /now accessible: yes, HTTP 200 after student login.
- Safe no-enrollment/no-program state: yes; page content matched the no active program state.
- No assigned activity shown: yes; no pending/in-progress activity markers were detected.
- Notes: this reasonably verifies that signup did not auto-assign work visible to the student.

## 7. Student admin-boundary result
- /admin attempted as student: yes.
- Result: HTTP 307 redirect away from `/admin`.
- Admin UI exposed? no. The redirect behavior indicates the admin boundary held for the student session.

## 8. Admin regression result
- Admin login checked: not fully completed in this phase because no admin credential was provided and secret/config inspection is explicitly forbidden.
- /admin accessible for admin: not directly verified by login in this smoke.
- Notes: this is a local-environment/credential limitation, not a code failure observed during the smoke. AUTH-1C did not change `requireAdminSession()` or `requireAdminApi()`, and build passed.

## 9. Duplicate/account-exists result
- Duplicate signup attempted? yes.
- Result: duplicate submission returned HTTP 409.
- Safe message? yes; response was an account-exists class error and did not expose passwords, hashes, tokens, cookies, or allowlist state.
- Duplicate not verified via DB unless visible without SQL/Prisma: duplicate absence was inferred from HTTP 409 plus endpoint scope; direct DB inspection was not performed because SQL/Prisma CLI are forbidden.

## 10. Out-of-scope preservation
- No schema change.
- No package change.
- No deploy.
- No staging/prod.
- No SQL.
- No Prisma CLI.
- No .env/secret inspection.
- No enrollment intentionally created.
- No trial/billing/payment/subscription.
- No Program/LearningCycle/StudyLoad.
- No Block 7.
- No FK.
- No seed.

## 11. Verification commands
- `npm.cmd run build`: passed.
- `git status --short`: clean before documentation; later showed only authorized documentation changes.
- `git diff --stat`: clean before documentation; later showed only authorized documentation changes.
- `git diff --check`: passed after documentation with LF/CRLF warnings only.

## 12. Findings and risks
- Any issue found: student signup, student login to `/now`, no-program state, duplicate protection, and student `/admin` redirect passed. Full admin login regression was not completed because admin credentials were not available and secret inspection is forbidden.
- Remaining risk: admin login should be verified in a controlled credentialed session by Mauricio or with explicitly supplied non-secret test admin credentials.
- Whether code fix is needed: no code fix is indicated by this smoke.

## 13. Recommended next phase
`MVP-SALES-AUTH-1E - Admin credentialed regression and signup UX/admin visibility hardening`

Purpose: complete admin credentialed login regression under an explicitly supplied/approved credential path, then harden signup UX and admin visibility for newly self-registered students without opening billing/trial/enrollment or Block 7.

## 14. Final verdict
SIGNUP_SMOKE_PASSED_WITH_MINOR_FOLLOWUP
