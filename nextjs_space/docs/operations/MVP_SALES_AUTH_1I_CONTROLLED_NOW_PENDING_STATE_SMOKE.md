# MVP-SALES-AUTH-1I - Controlled /now Pending-State Smoke

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: `MVP-SALES-AUTH-1H` closed at `97bb5a2`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: QA local/documentation only for visual smoke of the `/now` pending state after signup.
- Explicit non-goals: no app code changes, no schema changes, no package changes, no deploy, no staging/prod, no SQL, no Prisma CLI, no DB mutation, no `.env` or secret inspection, no printed passwords/hashes/tokens/cookies/secrets, no new student, no enrollment/trial/billing/payment/subscription, no Program/LearningCycle/StudyLoad, no Student edit, no password reset, no auth/signup/login/admin guard change, no Block 7, no FK, no seed, no commit, no push, no generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: `97bb5a2e804074d5619f8cb4fa1a02160e5bdc86`; `HEAD`, `origin/main`, and `origin/HEAD` point to `97bb5a2`.
- Baseline verdict: baseline matches expected `97bb5a2`; working tree was clean at phase start.

## 3. Conditions
- Environment: local workspace on `main`, local Next.js app only.
- Build result: `npm.cmd run build` passed.
- Dev server / URL: local dev server started on `http://localhost:3001` because port `3000` was already in use.
- Credential/session policy: no password, token, cookie, `.env`, `DATABASE_URL`, `NEXTAUTH_SECRET`, or `ADMIN_EMAILS` value was requested, inspected, captured, printed, or recorded.
- DB mutation scope: none. No signup, reset, edit, enrollment, trial, billing, Program, LearningCycle, or StudyLoad creation was performed.

## 4. Student visual smoke
- Student account: `auth1d.student.20260520123829@test.bexauri.local`.
- /now visible: not verified.
- Account-ready copy visible: not verified.
- No-active-program copy visible: not verified.
- Pending-activation copy visible: not verified.
- No-activities-assigned copy visible: not verified.
- Pending/in-progress activities visible: not verified.
- Notes: blocked because Mauricio did not have the student password/session, and duplicate signup correctly reported that the email is already registered. The phase policy forbids printing, recovering, inspecting, or bypassing credentials.

## 5. Student admin-boundary smoke
- /admin attempted as student: not retested.
- Student redirected/blocked: not retested.
- Admin UI exposed? no evidence of exposure in AUTH-1I; AUTH-1D previously verified student `/admin` redirected away from admin.
- Notes: authenticated student boundary could not be repeated without a valid student session. No secret inspection or password reset was performed.

## 6. Admin visibility follow-up
- Admin visibility retested? no.
- Source: AUTH-1F prior evidence.
- Student visible as unenrolled: yes, per AUTH-1F credentialed admin regression.
- Notes: AUTH-1F verified that the self-signup student was visible in admin UI and clearly without enrollment/program. This was not retested in AUTH-1I because the blocking issue was the missing student session.

## 7. Out-of-scope preservation
- No app code change.
- No schema change.
- No package change.
- No deploy.
- No staging/prod.
- No SQL.
- No Prisma CLI.
- No DB mutation.
- No `.env`/secret inspection.
- No printed password/token/cookie/secret.
- No new student.
- No enrollment/trial/billing/payment/subscription.
- No Program/LearningCycle/StudyLoad.
- No edit/reset/destructive action.
- No Block 7.
- No FK.
- No seed.

## 8. Verification commands
- `git status --short` - clean at phase start and before documentation edits.
- `git log --oneline --decorate --graph -8` - `HEAD`, `origin/main`, and `origin/HEAD` at `97bb5a2`.
- `git rev-parse HEAD` - `97bb5a2e804074d5619f8cb4fa1a02160e5bdc86`.
- `git rev-parse origin/main` - `97bb5a2e804074d5619f8cb4fa1a02160e5bdc86`.
- Required `Get-Content` context reads for AUTH-1H, AUTH-1G, AUTH-1F, AUTH-1D, phase gate protocol, and PHASE_LOG tail.
- `npm.cmd run build` - passed.
- `git diff --stat`.
- `git diff --check`.
- `git status --short`.

## 9. Findings and risks
- Findings: build passed; dev server started; student visual smoke could not proceed because the existing AUTH-1D student account password/session was unavailable; duplicate signup was blocked because the email is already registered.
- Remaining risks: AUTH-1H pending-state copy still needs visual confirmation in a real student session; student admin-boundary regression was not repeated in AUTH-1I.
- Whether code fix is needed: no code fix is indicated. The blocker is credential/session availability for the existing test student.

## 10. Recommended next phase
`MVP-SALES-AUTH-1J - Retry pending-state visual smoke with controlled student credential path`.

Scope: establish a safe student credential path without printing secrets, then verify `/now` pending copy, absence of pending/in-progress activities, and student `/admin` denial. Do not create enrollment, trial, billing, Program, LearningCycle, StudyLoad, or inspect secrets.

## 11. Final verdict
BLOCKED_BY_MISSING_STUDENT_SESSION
