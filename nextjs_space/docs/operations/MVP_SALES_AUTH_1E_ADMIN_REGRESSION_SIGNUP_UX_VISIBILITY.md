# MVP-SALES-AUTH-1E - Admin Regression and Signup UX Visibility

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: `MVP-SALES-AUTH-1D` closed at `35534a7`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: QA/readiness/documentation only for admin credentialed regression, signup/login UX review, student boundary follow-up, and admin visibility implications.
- Explicit non-goals: no app code changes, no schema changes, no package changes, no deploy, no staging/prod, no SQL, no Prisma CLI, no `.env` or secret inspection, no new student creation unless indispensable, no enrollment/trial/billing/payment/subscription, no Program/LearningCycle/StudyLoad, no Block 7, no FK, no seed, no commit, no push, no generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: `35534a7acc10db5aa65b89ad0bbe8b9beff8287e`; `HEAD`, `origin/main`, and `origin/HEAD` point to `35534a7`.
- Baseline verdict: baseline matches expected `35534a7`; working tree was clean at phase start.

## 3. Conditions
- Environment: local workspace on `main`, local Next.js app only.
- Build result: `npm.cmd run build` passed.
- Dev server / URL: `node node_modules/next/dist/bin/next dev` / `http://localhost:3000`; first dev requests used fallback fonts because outbound Google Fonts access is restricted, but `/signup`, `/login`, and unauthenticated `/admin` were reachable.
- Credential policy: no passwords, tokens, cookies, `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAILS`, or `.env` values were inspected or printed. No admin credential or manual admin session was available in this run.
- DB mutation scope: none in AUTH-1E. The AUTH-1D test account was not recreated and no new signup was submitted.

## 4. Signup UX review
- /signup loaded: yes, HTTP 200.
- Required fields visible: yes; first name, last name, email, password, and confirm password fields are present.
- Student-facing copy: yes; the page presents student account creation and states that tutoring activation happens separately.
- No unsupported promises: yes; no visible promise of enrollment, payment, trial, immediate activity, Program, cycle, StudyLoad, or tutoring access was found.
- Link to login: yes.
- Issues: minor copy hardening only. Password labels use ASCII `Contrasena`/`Confirmar contrasena`; this is acceptable operationally but can be polished later.

## 5. Login UX review
- /login loaded: yes, HTTP 200.
- Admin signup toggle removed: yes; no create-admin toggle was observed.
- Link to student signup: yes; the login page links to `/signup` with student-account wording.
- Admin/student copy: acceptable for readiness, but login still has an `admin@example.com` placeholder and English `Email`/`Password` labels/errors. This is a UX polish issue, not an admin-boundary failure.
- Issues: minor UX hardening recommended to replace admin-oriented placeholder and English error/field text with neutral Spanish copy.

## 6. Student boundary regression
- Student account used: `auth1d.student.20260520123829@test.bexauri.local` from AUTH-1D as prior evidence; AUTH-1E did not reuse the password or print it.
- /now result: not retested in AUTH-1E because the student password/session was not available without secret handling. AUTH-1D verified student login to `/now` HTTP 200 with safe no-active-program/no-enrollment state.
- /admin attempt result: not retested as authenticated student in AUTH-1E for the same credential reason. AUTH-1D verified student `/admin` returned HTTP 307 redirect away from admin.
- Admin UI exposed? not retested in AUTH-1E; AUTH-1D evidence says no.
- Notes: unauthenticated `/admin` in AUTH-1E returned HTTP 307, confirming the guarded route still redirects without a session, but this is not a substitute for authenticated student regression.

## 7. Admin credentialed regression
- Admin login checked: no.
- Method: unavailable; no manual admin session or safely provided credential was present.
- /admin accessible: not verified as admin. Unauthenticated `/admin` returned HTTP 307.
- /admin/students accessible: not verified as admin.
- Student self-signup visibility: not verified through admin UI because admin session was unavailable.
- Notes: this is blocked by credential policy, not by a known code failure. No `.env`, admin allowlist, password, or secret source was inspected.

## 8. Admin visibility implications
- Can admin see self-signup student? not directly verified.
- Is the student clearly unenrolled? not directly verified in admin UI. AUTH-1D verified the student-facing `/now` no-enrollment state.
- Is any UX/admin hardening needed? yes, minor UX hardening is recommended for login copy; admin visibility still needs a credentialed retry to confirm whether self-signup students appear clearly with `0` programs/enrollments.
- Does this block Block 1 continuation? yes for credentialed admin-regression confidence. It does not indicate an app-code blocker, but the admin verification gap should be closed before expanding Block 1 beyond signup bootstrap.

## 9. Out-of-scope preservation
- No app code change.
- No schema change.
- No package change.
- No deploy.
- No staging/prod.
- No SQL.
- No Prisma CLI.
- No `.env`/secret inspection.
- No enrollment/trial/billing/payment/subscription.
- No Program/LearningCycle/StudyLoad.
- No Block 7.
- No FK.
- No seed.

## 10. Verification commands
- `git status --short` - clean at phase start and before documentation edits.
- `git log --oneline --decorate --graph -8` - `HEAD`, `origin/main`, and `origin/HEAD` at `35534a7`.
- `Get-Content nextjs_space/docs/operations/MVP_SALES_AUTH_1D_CONTROLLED_LOCAL_SIGNUP_SMOKE.md`.
- `Get-Content nextjs_space/docs/operations/MVP_SALES_AUTH_1C_STUDENT_SIGNUP_ACCOUNT_CREATION.md`.
- `Get-Content nextjs_space/docs/operations/MVP_SALES_AUTH_1B_USER_STUDENT_BOOTSTRAP_CONTRACT.md`.
- `Get-Content nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `Get-Content PHASE_LOG.md -Tail 340`.
- `npm.cmd run build` - passed.
- Local HTTP review of `/signup`, `/login`, and unauthenticated `/admin`.
- `git diff --stat`.
- `git diff --check`.
- `git status --short`.

## 11. Findings and risks
- Findings: signup UX is acceptable for the current bootstrap phase; login UX is functionally acceptable but still has minor admin-oriented/English copy; admin credentialed regression and admin visibility were not completed due to missing credential/session.
- Remaining risks: admin may or may not clearly see the self-signup student and unenrolled state; authenticated student boundary was not repeated in AUTH-1E; email-only User/Student linkage remains transitional.
- Whether code fix is needed: no clear code fix is required from AUTH-1E evidence. A credentialed admin retry is required; UX copy hardening can be bundled as a small follow-up after that decision.

## 12. Recommended next phase
`MVP-SALES-AUTH-1F - Admin credentialed regression retry`.

Minimal scope: Mauricio provides a safe manual admin browser session or secure credential entry without printing secrets; verify admin login, `/admin`, admin student visibility for `auth1d.student.20260520123829@test.bexauri.local`, and whether the student appears clearly unenrolled. Preserve no code/schema/package/deploy/DB/SQL/Prisma/secret changes.

## 13. Final verdict
BLOCKED_BY_MISSING_ADMIN_CREDENTIAL
