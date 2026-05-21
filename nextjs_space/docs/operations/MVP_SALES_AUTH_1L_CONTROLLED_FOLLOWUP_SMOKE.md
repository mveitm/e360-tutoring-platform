# MVP-SALES-AUTH-1L - Controlled Follow-up Smoke

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: AUTH-1K closed at `2aa2582`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: local QA/documentation-only controlled smoke of signup to `/now` after the AUTH-1K fix, with one authorized local/dev student signup mutation.
- Explicit non-goals: no app code changes, schema changes, package changes, deploy, staging/prod, SQL, Prisma CLI, secret inspection, enrollment, trial, billing, payment, subscription, Program, LearningCycle, StudyLoad, Student edit, password reset, auth/signup/login/admin guard change, Block 7, FK, seed, commit, push, or generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: both `2aa2582e175269f829da07cd1b289829ecf95440`.
- Baseline verdict: baseline matched expected `2aa2582`; working tree was clean at phase start. Git preflight is the live truth.

## 3. Conditions
- Environment: local workspace on `main`, local Next.js app from `nextjs_space`.
- Build result: `npm.cmd run build` passed.
- Dev server / URL: local dev server started from `nextjs_space`; `/signup` responded at `http://localhost:3000/signup`.
- Credential/session policy: Mauricio entered the student password manually in the browser. No password, token, cookie, `.env`, `DATABASE_URL`, `NEXTAUTH_SECRET`, or `ADMIN_EMAILS` value was requested, inspected, captured, printed, or recorded.
- DB mutation scope: exactly one authorized local/dev student signup attempt was made through the app UI.

## 4. Controlled test account
- Test email: `auth1l.student.202605211457@test.bexauri.local`.
- Created through: `/signup` on the local dev server.
- Password handling: entered manually by Mauricio in the browser and not printed or recorded.
- Account creation result: successful from the visible user flow.

Do not include password.

## 5. Student /now visual smoke
- /now visible: yes.
- Account-ready copy visible: yes.
- No-active-program copy visible: yes.
- Pending-activation copy visible: yes.
- No-activities-assigned copy visible: yes.
- Pending/in-progress activities visible: no.
- Notes: Mauricio confirmed the student reached `/now`, saw the pending-state copy, and no real pending/in-progress activity cards or lists were visible.

## 6. Student admin-boundary smoke
- /admin attempted as student: yes.
- Student redirected/blocked: yes.
- Admin UI exposed? yes/no: no.
- Notes: Mauricio confirmed `/admin` was blocked for the student session. No admin UI exposure was reported.

## 7. Admin visibility follow-up
- Admin visibility retested? no.
- Source: AUTH-1F prior evidence.
- New student visible as unenrolled: not retested for the AUTH-1L student.
- Notes: no safe admin session retest was performed in AUTH-1L. AUTH-1F remains prior evidence that a self-signup student is visible in admin as unenrolled.

## 8. Out-of-scope preservation
- No app code change.
- No schema change.
- No package change.
- No deploy.
- No staging/prod.
- No SQL.
- No Prisma CLI.
- No `.env`/secret inspection.
- No printed password/token/cookie/secret.
- No enrollment/trial/billing/payment/subscription.
- No Program/LearningCycle/StudyLoad.
- No edit/reset/destructive action.
- No Block 7.
- No FK.
- No seed.

## 9. Verification commands
- `npm.cmd run build`
- `git status --short`
- `git diff --stat`
- `git diff --check`
- `git add -N nextjs_space/docs/operations/MVP_SALES_AUTH_1L_CONTROLLED_FOLLOWUP_SMOKE.md`
- `git diff --stat`
- `git status --short`

## 10. Findings and risks
- Findings: controlled signup succeeded after AUTH-1K; authenticated student reached `/now`; pending-state copy rendered; no pending/in-progress activity list was visible; student `/admin` was blocked.
- Remaining risks: admin visibility for the new AUTH-1L student was not retested directly; admin visibility is inherited from AUTH-1F prior evidence. Email-only User/Student linkage remains transitional.
- Whether code fix is needed: no code fix is indicated.

## 11. Recommended next phase
`MVP-SALES-AUTH-1M - Block 1 closeout with admin evidence inherited from AUTH-1F`

## 12. Final verdict
CONTROLLED_FOLLOWUP_SMOKE_PASSED_WITH_ADMIN_VISIBILITY_INHERITED
