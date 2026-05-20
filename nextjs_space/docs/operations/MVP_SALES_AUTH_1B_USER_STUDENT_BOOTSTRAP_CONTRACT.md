# MVP-SALES-AUTH-1B - User/Student Bootstrap Contract

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: `MVP-SALES-AUTH-1A` closed at `37729dc`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: documentation/design/readiness only for a future autonomous User/Student bootstrap contract.
- Explicit non-goals: no app code changes, no schema changes, no package changes, no deploy, no SQL, no Prisma CLI, no DB mutation, no `.env` or secret inspection, no signup implementation, no new routes, no login changes, no admin guard changes, no `/now` changes, no billing/trial/enrollment work, no Block 7 work, no commit, no push, no generated artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: `37729dc21d2c421c99b93a5c0511fe9d3d59f041`; `HEAD`, `origin/main`, and `origin/HEAD` point to `37729dc`.
- Baseline verdict: baseline matches expected `37729dc`; working tree was clean at phase start.

## 3. Inputs reviewed
- AUTH-1A audit: `nextjs_space/docs/operations/MVP_SALES_AUTH_1A_CURRENT_SIGNUP_LOGIN_STUDENT_BOOTSTRAP_AUDIT.md`.
- Sales-ready active context: `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`.
- Roadmap: `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md` and detailed Roadmap-1 source.
- Phase gate protocol: `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- PHASE_LOG: latest 320 lines, including AUTH-1A closeout.
- Any stale baseline notes: active context, roadmap, Roadmap-1, and M1 handoff still contain older baselines such as `b082e10`, `db526f0`, `277de8b`, `f6cbf21`, `775d5f2`, and `30f5d91`. Git preflight wins. Live baseline for this phase is `37729dc`.

## 4. Current problem statement
The current blocker is identity bootstrap, not course delivery, billing, or content.

- Public self-serve signup is not available. `nextjs_space/app/api/signup/route.ts` exists but is admin-only through `requireAdminApi()`, and public `app/signup`, `app/register`, and `app/onboarding` routes are absent.
- `User` and `Student` are separate models. `User` holds authentication fields; `Student` holds learner identity and enrollment relations.
- Linkage is currently by email convention: `session.user.email == Student.email`.
- `/now` depends on an authenticated User session, a matching Student, an active enrollment, a current open cycle, StudyLoads, and in-app usefulness may depend on title-based static content registry matching.
- Block 1 must solve safe identity bootstrap before billing, trial, payment, self-serve enrollment, and Block 7 content-route work.

## 5. Contract principles
- Student-first safe entry: a new student must be able to create an account and land in a non-broken student state without admin or DB work.
- No admin escalation: signup must never grant admin status, mutate admin configuration, or bypass admin guards.
- Idempotent/reconcilable account creation: retries and pre-existing records must resolve predictably without duplicate Users or Students.
- Email normalization: email must be trimmed and lowercased before lookup, creation, storage, and session use.
- Explicit non-admin default: every public signup is a student account by default; admin authority remains external and server-side.
- Safe empty state: no enrollment is acceptable after signup, but the student must see a stable student-facing state rather than an error or admin surface.
- No automatic enrollment in this phase: account bootstrap must not create Program, StudentProgramInstance, LearningCycle, StudyLoad, trial, payment, or subscription records.
- Future-compatible with billing/trial: the contract should leave clear extension points for trial/access and plan state without faking them now.
- Auditability: future implementation must record safe operational facts and never log passwords, hashes, tokens, cookies, or secrets.

## 6. Proposed public signup contract
Minimal public signup fields:

| Field | Required | Validation | Normalization | Storage target | Error behavior |
|---|---:|---|---|---|---|
| `firstName` | Yes | non-empty string after trim; reasonable max length in future implementation | trim, collapse accidental surrounding whitespace | `Student.firstName`; also part of `User.name` | reject with field-level validation error |
| `lastName` | Yes | non-empty string after trim; reasonable max length in future implementation | trim, collapse accidental surrounding whitespace | `Student.lastName`; also part of `User.name` | reject with field-level validation error |
| `email` | Yes | syntactically valid email; non-empty after trim; normalized unique identity | trim and lowercase before any lookup or write | `User.email` and `Student.email` must match | reject invalid format; handle duplicates through reconciliation rules |
| `password` | Yes | minimum 8 chars at first implementation; stronger policy can be added later | no trimming after user entry unless UX explicitly defines it; never log | hashed into `User.password` only | reject weak/missing password; never return hash |
| `confirmPassword` | Recommended for UI/API | must match password exactly | same handling as password | not stored | reject mismatch |
| `acceptedTerms` | Optional placeholder for later trust/legal phase | if present, boolean true only | boolean | do not store until trust/legal model exists | if required later, block signup when false |

Public signup should return only safe account/profile data needed for routing, such as `userId`, `studentId`, normalized email, and next route. It must never return password, password hash, session token, cookie value, admin allowlist data, or raw environment state.

## 7. Email normalization and identity rules
- All public signup email input must be normalized with `trim().toLowerCase()` before lookup, creation, uniqueness checks, and storage.
- `User.email` and `Student.email` must be aligned to the same normalized value at creation time.
- Duplicate handling must be based on normalized email. Case or surrounding spaces must not create distinct identities.
- User-facing error behavior should avoid exposing whether a high-value/admin email exists. Prefer generic "account already exists; sign in or use recovery/support" style handling.
- Student email edits are high risk while email-only linkage remains. A future implementation should avoid public self-edit of email until an explicit relation or verified email-change flow exists.
- AUTH-1B recommendation: keep email-convention linkage for the first implementation only if it is normalized, transactional, and guarded; plan an explicit `User` to `Student` relation or stable profile link later before broad scale.
- Known risk: email-only linkage is brittle if either side changes independently; admin edit flows must be treated as privileged reconciliation operations, not casual profile edits.

## 8. User creation/reconciliation contract
- No User exists: create `User` with normalized email, full display name from first/last name, and bcrypt-hashed password.
- User exists with password: do not overwrite password from public signup. Treat as existing account; ask user to sign in or use future recovery/support.
- User exists without password: do not blindly attach a public password unless the flow proves ownership. For first implementation, classify as recoverable/manual support or email-verification-dependent. Without email verification, block public takeover.
- User exists but is admin allowlisted: public student signup must not proceed as a student bootstrap for that email. It must not alter password, role, admin state, or Student linkage. Return a generic account-exists/sign-in/support response.
- User exists with different casing/spaces: normalized lookup must treat it as the same identity. Future implementation may need a one-time admin cleanup if legacy rows are stored with non-normalized email.
- Password hashing responsibility: server-side signup endpoint only; use existing bcrypt pattern; never hash client-side as a substitute for TLS/server handling; never store or log plaintext.
- Session creation after signup: after successful User + Student bootstrap, sign the user in through NextAuth credentials or an equivalent approved server/session flow and route to `/now`.
- No role/admin mutation: public signup must never create role fields, write admin flags, or touch `ADMIN_EMAILS`.

## 9. Student creation/reconciliation contract
- No Student exists: create `Student` with firstName, lastName, normalized email, and `status = active`.
- Student exists with same email: do not create duplicate Student. If no User exists, create User linked by normalized email only after safe ownership decision; if User exists and credentials are valid through login, treat as existing account.
- Student exists with same email but name differs: do not overwrite existing Student names from public signup automatically. Prefer existing Student as authoritative and require admin/support reconciliation for material differences.
- Inactive Student: do not silently reactivate from public signup. Route to support/admin review or a safe "account exists but needs review" outcome.
- Student with enrollment already exists: signup must not create new enrollment or modify existing enrollment. Existing enrollment should become visible after successful login if the User/Student identity is safely reconciled.
- Student without enrollment: signup may create/reconcile identity only. `/now` must show safe no-enrollment state.
- Duplicate-prevention behavior: `Student.email @unique` remains the first implementation guard; public code must normalize before write and handle Prisma duplicate errors as idempotent/account-exists outcomes, not 500s.

## 10. User <-> Student linkage contract
- Source of truth for first implementation: normalized email is the shared identity key, because no explicit Prisma relation exists today.
- Matching rule: `normalized(session.user.email) == Student.email`, where `Student.email` must also be normalized at bootstrap time.
- Allowed transitional approach: transactional create/reconcile of User and Student with the same normalized email; `/now` continues resolving Student by email.
- Known limitation: email updates, legacy casing, and independently edited rows can break linkage.
- Future migration option: add an explicit relation such as `Student.userId` or `User.studentProfile` in a later schema phase after human review, including backfill, uniqueness, admin reconciliation UI, and rollback plan.

## 11. Admin boundary contract
- Signup must never add or edit `ADMIN_EMAILS`.
- Admin allowlist remains server-side only in `lib/admin-guard.ts`; its raw value must never be printed or exposed.
- Non-admin session routing should send successful student signup/login to `/now`, not `/admin`.
- Admin APIs remain guarded by `requireAdminApi()` and admin pages by `requireAdminSession()`.
- Existing admin-mediated `create-user` and `reset-password` flows remain separate from public signup and should stay admin-only.
- No privilege escalation path: a public signup cannot create an admin user, cannot convert an existing admin email into a student account, cannot bypass `requireAdminApi()`, and cannot access `/admin`.

## 12. `/now` post-signup contract
Expected safe states:

- Signup success but no enrollment: authenticated student reaches `/now`; `/now` shows a stable no-active-program/no-enrollment state and does not show admin links unless the email is allowlisted.
- Student exists but no active enrollment: same safe no-active-program state; no automatic enrollment is created.
- Active enrollment but no current cycle: show program context and a safe "not ready yet" state; do not create cycle from `/now`.
- Current cycle but no StudyLoad: show a safe no-current-activity state; do not create StudyLoad from `/now`.
- StudyLoad without registry match: preserve current fallback behavior; allow only safe actions already supported by the app and avoid claiming full in-app content availability.
- Student-facing copy should communicate that the account is ready and the tutoring/program setup is pending or not yet active. It should not mention DB entities, manual technical setup, Prisma, SQL, LearningCycle internals, trial/payment promises, or unsupported content routes.

## 13. Out-of-scope boundary with billing/trial/enrollment
Explicitly deferred:

- Payment.
- Subscription.
- Trial start/end.
- Plan status.
- Program catalog selection.
- Self-serve enrollment.
- Automatic PAES path assignment.
- Content route selection.
- Block 7 pedagogical logic.

AUTH-1B and the first signup implementation should stop at identity bootstrap plus safe entry to `/now`. Later roadmap blocks must own access, payment, and tutoring enrollment.

## 14. Future implementation candidate files
Likely needed:

- `nextjs_space/app/signup/*` or equivalent: public student signup surface.
- `nextjs_space/app/api/signup/route.ts`: replace or split current admin-only behavior with a public student signup endpoint or a new dedicated endpoint.
- `nextjs_space/app/login/_components/login-form.tsx`: remove misleading admin/signup toggle or route signup to the new student flow.
- `nextjs_space/app/login/page.tsx` and `nextjs_space/app/page.tsx`: make post-session redirects role/allowlist aware instead of admin-first.
- `nextjs_space/app/now/page.tsx`: maybe adjust safe empty-state copy after signup.

Maybe needed:

- `nextjs_space/lib/auth-options.ts`: normalize credential email lookup and/or support post-signup session behavior.
- `nextjs_space/lib/admin-guard.ts`: only if a reusable safe role/routing helper is needed; avoid changing authorization semantics.
- `nextjs_space/lib/audit.ts`: for future signup audit events if existing helper is reused.
- `nextjs_space/app/api/students/[id]/create-user/route.ts` and `reset-password`: for shared validation/reconciliation patterns, not public reuse.

Should avoid for first implementation:

- `nextjs_space/prisma/schema.prisma`: avoid unless explicit User/Student relation is selected as a separate schema phase.
- Billing, trial, enrollment, Program, LearningCycle, StudyLoad, and content registry files: out of scope for AUTH-1C unless the approved implementation scope changes.
- Admin guard weakening or broad middleware changes: unnecessary for first student signup.

## 15. Minimal future verification matrix
Future implementation must verify:

- Unauthenticated signup creates exactly one User and exactly one Student with normalized matching email.
- Duplicate signup is safe and does not create duplicate records or overwrite existing password/profile data.
- Existing Student can be reconciled safely only under the approved ownership rule.
- Existing admin email cannot self-signup as student or lose admin access.
- Student cannot access `/admin`; admin APIs still return 403 for non-admin sessions.
- Student reaches `/now` safe state after signup when no enrollment exists.
- No enrollment, trial, payment, subscription, Program, LearningCycle, StudyLoad, or content route is created by signup.
- Admin login still works.
- Student login still works through credentials after signup.
- Build/typecheck must pass.
- Browser smoke should cover signup success, duplicate/account-exists, student `/now`, student `/admin` denial, and admin login.
- No secrets, password values, hashes, tokens, cookies, `DATABASE_URL`, `NEXTAUTH_SECRET`, or admin allowlist values appear in logs or responses.

## 16. AUTH-1C recommendation
- Suggested phase name: `MVP-SALES-AUTH-1C - Implement student signup/account creation`.
- Whether it should be implementation or implementation-readiness: implementation only after human review accepts this AUTH-1B contract; otherwise run an implementation-readiness review first.
- Minimal scope: create public student signup path, normalize email, create/reconcile User + Student transactionally, preserve admin boundary, route successful student to `/now`, and verify safe no-enrollment state.
- Files likely touched: `app/signup/*` or equivalent, `app/api/signup/route.ts` or a new student signup endpoint, `app/login/*`, `app/page.tsx`, maybe `lib/auth-options.ts`, maybe `app/now/page.tsx` for safe copy, maybe `lib/audit.ts`.
- Explicit non-goals: no schema migration unless separately approved, no billing, no trial, no enrollment, no payment, no Program/Cycle/StudyLoad creation, no Block 7, no deploy, no DB mutation outside normal local tests approved for implementation.
- Required human decision before coding: approve whether first implementation stays with normalized email-convention linkage or requires an explicit User/Student FK relation before public signup.

## 17. Final verdict
READY_FOR_AUTH_1C_IMPLEMENTATION_PROPOSAL
