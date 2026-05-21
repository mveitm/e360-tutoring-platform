# MVP-SALES-AUTH-1K - Fix /now Pending-State Smoke Blocker

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: AUTH-1J closed at `fa2b983`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: diagnose and minimally fix the local signup/login/routing/render blocker preventing signup-to-`/now` pending-state smoke.
- Explicit non-goals: no billing, trial, payment, enrollment implementation, PAES path assignment, content route, Block 7, schema, package, deploy, staging/prod, SQL, Prisma CLI, secret inspection, seed, commit, or push.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: both `fa2b9831154e4284e663bb3d88adf0509f9bb791`.
- Baseline verdict: baseline matched expected `fa2b983`; working tree was clean at phase start. Git preflight is the live truth.

## 3. Inputs reviewed
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1J_PENDING_STATE_VISUAL_SMOKE_RETRY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1I_CONTROLLED_NOW_PENDING_STATE_SMOKE.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1H_POST_SIGNUP_NOW_PENDING_STATE_COPY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1C_STUDENT_SIGNUP_ACCOUNT_CREATION.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `PHASE_LOG.md -Tail 440`.

Older docs retain historical baselines. Git preflight wins; the live baseline for AUTH-1K was `fa2b983`.

## 4. Blocker diagnosis
- Symptom from AUTH-1J: build passed and `/signup` was available, but the visual signup attempt did not reach `/now`, did not show account-created feedback, and appeared visually degraded/basic.
- Suspected causes: stale/wrong dev server, CSS/assets not loading, signup endpoint failure, duplicate/validation failure, post-signup `signIn` failure, client routing race after credentials sign-in, or `/now` pending-state render failure.
- Checks performed: pre-change build; code review of signup page/form, signup API, login page/form, root routing, `/now`, auth options, middleware, and admin guard; local dev server start from `nextjs_space`; HTTP check of `/signup`; `_next` asset HEAD checks; invalid `/api/signup` validation check; post-fix `/login?signup=success` copy check.
- Actual cause found: no repo-level CSS/asset failure was reproduced on the current dev server; `/signup` returned 200 and all referenced `_next` assets returned 200. The likely AUTH-1J degraded UI cause was stale/wrong local server state or port mismatch. The code-level blocker/risk found was fragile post-signup completion: signup form did not normalize email before immediate `signIn`, treated only `result.error` as failure, used client-side routing directly into a server-protected page after cookie mutation, and the fallback `/login?signup=success` did not display account-created copy.

## 5. Implementation summary
- Normalized email before both signup API call and immediate credentials `signIn`.
- Treated missing `result.ok` as a fallback condition.
- Changed successful post-signup navigation to a full browser navigation to `/now`, allowing the new session cookie to be read by the server route.
- Added visible account-created fallback copy on `/login?signup=success`.
- Aligned signup API response `next` value to `/now`.

This is minimal because it changes only the existing signup/login completion path and message surface. It stays inside AUTH-1C/AUTH-1H signup/login/routing/render scope and does not change schema, packages, auth provider semantics, admin guard, enrollment, billing, trial, content, or Block 7.

## 6. Files changed
- `nextjs_space/app/signup/_components/signup-form.tsx`: normalized email and hardened post-signup auth/navigation.
- `nextjs_space/app/api/signup/route.ts`: aligned safe response next route to `/now`.
- `nextjs_space/app/login/page.tsx`: passed `signup=success` state to the login form.
- `nextjs_space/app/login/_components/login-form.tsx`: displayed account-created fallback copy.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1K_FIX_NOW_PENDING_STATE_SMOKE_BLOCKER.md`: phase closeout.
- `PHASE_LOG.md`: phase ledger entry.

## 7. Build result
- `npm.cmd run build`: passed before changes.
- `npm.cmd run build`: passed after changes.

## 8. Controlled smoke result
- Test email: not used in AUTH-1K; no new student signup attempt was made.
- Signup success: not visually retested with a new account.
- /now reached: not visually retested with a new account.
- Pending-state copy visible: not visually retested with a new account.
- No activities visible: not visually retested with a new account.
- Student /admin blocked: not retested; no admin routing change was made. AUTH-1D remains prior student admin-boundary evidence.
- Admin visibility source: AUTH-1F remains prior admin visibility evidence.
- Password/secret handling: no password, token, cookie, `.env`, `DATABASE_URL`, `NEXTAUTH_SECRET`, or `ADMIN_EMAILS` value was requested, inspected, captured, printed, or recorded.

Runtime checks completed without creating an account:
- local `next dev` from `nextjs_space` reached `http://localhost:3000`;
- `/signup` returned 200;
- `/signup` referenced 7 `_next` assets and 0 asset failures were observed;
- `/login?signup=success` returned 200 and rendered account-created copy;
- invalid `/api/signup` request returned safe 400 validation response.

## 9. Out-of-scope preservation
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

## 10. Verification commands
- `git diff --check`
- `npm.cmd run build`
- `git diff --stat`
- `git status --short`
- `git add -N nextjs_space/docs/operations/MVP_SALES_AUTH_1K_FIX_NOW_PENDING_STATE_SMOKE_BLOCKER.md`
- `git diff --stat`
- `git status --short`

## 11. Findings and risks
- Findings: build is clean; current local server serves `/signup` and its assets correctly; code had a fragile post-signup auth/navigation path and missing fallback success copy; the narrow code fix is in place.
- Remaining risks: the final visual smoke with a new student account was not performed because the authorized smoke requires Mauricio to enter the password manually in a browser and this agent cannot do that without handling a secret. The AUTH-1J account creation state remains unconfirmed without SQL/Prisma CLI or admin retest.
- Whether further code fix is needed: no further code fix is indicated before a controlled browser smoke. If that smoke still fails, escalate with one observed failure and no additional signup attempts.

## 12. Recommended next phase
`MVP-SALES-AUTH-1L - Controlled follow-up smoke`

## 13. Final verdict
FIXED_NEEDS_FOLLOWUP_SMOKE
