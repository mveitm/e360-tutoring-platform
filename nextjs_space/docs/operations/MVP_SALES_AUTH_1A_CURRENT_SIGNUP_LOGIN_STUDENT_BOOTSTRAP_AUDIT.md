# MVP-SALES-AUTH-1A - Current Signup/Login/Student Bootstrap Audit

## 1. Phase gate classification
- Roadmap block: 1 - Self-serve student registration/account bootstrap.
- Sales-ready relevance: direct/high.
- Dependency: `MVP-SALES-READY-HANDOFF-2` closed at `c5538c2`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: documentation/audit/readiness only for current signup, login, auth, Student bootstrap, admin boundary, and `/now` dependency chain.
- Explicit non-goals: no app code changes, no schema changes, no package changes, no deploy, no SQL, no Prisma CLI, no DB mutation, no `.env` or secret inspection, no billing/trial/enrollment work, no Block 7 work, no AUTH-1B implementation authorization, no commit, no push, no generated artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: `c5538c2b8a35e8f18bc7bd7e0226b04a84c484a0`; `HEAD`, `origin/main`, and `origin/HEAD` point to `c5538c2`.
- Baseline verdict: baseline matches expected `c5538c2`; working tree was clean at phase start.

## 3. Context documents reviewed
- `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP_1_FULL_ROADMAP_DEVIATION_AUDIT_AND_HANDOFF_ALIGNMENT.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_BLOCK_7_PEDAGOGICAL_LAYER_ANCHOR.md`
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
- `PHASE_LOG.md` latest 260 lines.

Stale baseline / contradiction notes:
- `MVP_SALES_READY_ACTIVE_CONTEXT.md` still names `b082e10` and `MVP-SALES-READY-ROADMAP-1A` as latest verified baseline.
- `MVP_SALES_READY_ROADMAP.md` still states dependency as Roadmap-1 at `db526f0`.
- `CURRENT_AGENT_HANDOFF_MVP_M1.md`, `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`, and `DOCUMENTATION_INDEX_MVP_M1.md` contain older M1/beta baselines including `f6cbf21`, `775d5f2`, `30f5d91`, and `145833b`.
- Git preflight wins. Live baseline for this audit is `HEAD = origin/main = c5538c2`, with clean starting tree.

## 4. Current auth architecture
- NextAuth is configured in `nextjs_space/lib/auth-options.ts` and mounted at `nextjs_space/app/api/auth/[...nextauth]/route.ts`.
- Provider observed: `CredentialsProvider` with email/password. The provider loads `User` by unique email and verifies `User.password` with `bcrypt.compare`.
- Adapter observed: `PrismaAdapter(prisma)`.
- Session behavior observed from code: JWT session strategy; `jwt` callback stores `token.id = user.id`; `session` callback exposes `session.user.id`.
- Current login route/page: `nextjs_space/app/login/page.tsx` renders `LoginForm`; if any session exists, it redirects to `/admin`.
- Current login form: `nextjs_space/app/login/_components/login-form.tsx` signs in through `signIn('credentials')` and redirects to `/admin` after success.
- Current logout/session handling found: `nextjs_space/app/admin/_components/admin-nav.tsx` calls `signOut({ callbackUrl: '/login' })`.
- Additional legacy/direct login endpoint found: `nextjs_space/app/api/auth/login/route.ts` manually checks bcrypt credentials and returns user data, but the visible login form uses NextAuth.

## 5. Signup/register state
- Self-serve signup does not currently exist as a safe public student registration flow.
- There is no `nextjs_space/app/signup`, `nextjs_space/app/register`, or `nextjs_space/app/onboarding` route.
- `nextjs_space/app/api/signup/route.ts` exists, but the route is explicitly admin-only via `requireAdminApi()` and says public self-registration is disabled.
- `LoginForm` still exposes a signup toggle and posts to `/api/signup`, but because `/api/signup` requires an existing admin session, this is not self-serve signup for a new student. From an unauthenticated public login screen, it should fail with unauthenticated/forbidden behavior.
- Partial/admin-mediated onboarding exists through admin student management: admin can create a `Student`, create a matching `User` for that Student, reset password, and enroll the Student.

## 6. User model audit
- Relevant auth fields in `User`: `id`, `name`, `email @unique`, `emailVerified`, `image`, `password`, `accounts`, `sessions`.
- Role/admin-relevant fields: no role field and no direct admin boolean. Admin status is externalized to `ADMIN_EMAILS` allowlist in `nextjs_space/lib/admin-guard.ts`.
- Constraints and identifiers: `User.email` is nullable but unique; password is nullable; NextAuth account/session tables exist.
- Sales-ready implications: `User` can authenticate, but it does not encode student profile linkage, role, trial/access state, plan state, consent, or onboarding status. Email is currently the only bridge to Student identity.

## 7. Student model audit
- Relevant identity fields in `Student`: `id`, `firstName`, `lastName`, `email @unique`, `status`, `createdAt`, `updatedAt`.
- Relationship to enrollments/programs: `Student.programInstances` points to `StudentProgramInstance`; each instance links `studentId` to `programId`, has `status`, `startedAt`, `endedAt`, `lastActivityAt`, `currentCycleId`, and `currentContinuityState`.
- Dependency on manual creation: Student records are currently created through admin-only `POST /api/students`. There is no public student-facing creation path.

## 8. User <-> Student linkage audit
- There is no explicit Prisma relation between `User` and `Student`.
- Linkage is by email convention: comments and code in `/now` state `session User.email == Student.email`.
- Admin detail endpoints also resolve `Student -> User` by matching `student.email` to `user.email`.
- What breaks if a new user signs up autonomously: a standalone `User` without a matching `Student` reaches `/now` but sees "No tienes un programa activo todavia"; admin login redirects may also send any authenticated session to `/admin` before the admin layout redirects non-admin back to `/now`.
- What is required to bootstrap a student safely: create or reconcile `User` and `Student` atomically or idempotently, define duplicate-email behavior, set non-admin defaults, preserve admin allowlist boundary, and provide a safe initial `/now` state before billing/trial/enrollment are solved.

## 9. Admin boundary audit
- Admin access is enforced centrally in `nextjs_space/lib/admin-guard.ts`.
- `requireAdminSession()` protects `nextjs_space/app/admin/layout.tsx`: no session redirects to `/login`; non-admin redirects to `/now`.
- `requireAdminApi()` protects admin APIs inspected, including students, student account creation, password reset, instances, and learning cycles.
- Admin allowlist uses `process.env.ADMIN_EMAILS`, parsed server-side and never printed by the guard.
- Students appear blocked from admin through the admin layout and API guard.
- Sales-ready risks: admin status depends on environment allowlist, not DB role; login and root redirects optimistically send any session to `/admin` before the guard redirects non-admin; the visible login signup toggle is misleading because signup is admin-only.

## 10. `/now` dependency chain
Trace for a newly logged-in student to see useful work:
- User/session: NextAuth credentials session must exist with `session.user.email`.
- Student: `/now` resolves `Student` by `Student.email == session.user.email`.
- Enrollment: `/now` queries most recent active `StudentProgramInstance` for that Student.
- Program/instance: enrollment must have linked `program` code/name.
- Current cycle: enrollment must have `currentCycleId` and the referenced `LearningCycle` must be `open`.
- StudyLoad: `/now` reads `StudyLoad` records in the current cycle with `pending`, `in_progress`, or `completed` status.
- Content registry match: useful in-app viewing/answering depends on `getStudyLoadContent(load.title)` resolving a static registry entry.
- Response/completion path: student starts via `/api/study-loads/[id]/start`, submits MC evidence via `/api/study-loads/[id]/responses`, completes via `/api/study-loads/[id]/complete`, and completion may prepare the next StudyLoad through `prepareNextStudyLoadAfterCompletion`.

## 11. Current manual bootstrap path
Current likely manual/admin bootstrap for a student:
- User creation: admin creates a student access account from student detail via `POST /api/students/[id]/create-user`, or admin-only `/api/signup` can create a generic User.
- Student creation: admin creates Student via `/admin` Students UI calling `POST /api/students`.
- Enrollment: admin enrolls Student from student detail or instances UI via `POST /api/instances`.
- Cycle: for active PAES_M1 enrollment in normal continuity with no current cycle, `POST /api/instances` auto-creates first cycle and first StudyLoad. Other paths/programs can require explicit cycle/load work through admin endpoints.
- StudyLoad: PAES_M1 first enrollment can create `PAES M1 - Entrada balanceada inicial`; cycle creation can also generate pending loads from SkillStates or fallback "Initial practice".
- Registry matching: in-app student activity requires the StudyLoad title to match the static registry in `lib/study-load-content.ts`.
- Admin/user intervention required: admin must create Student, create User/password, enroll in program, and handle mismatches. This is not autonomous signup.

## 12. Sales-ready gap analysis
Critical blockers for autonomous signup:
- No public student signup UI.
- Public `/api/signup` is intentionally disabled/admin-only.
- No explicit `User` to `Student` relation.
- No idempotent signup/bootstrap contract for creating User + Student together.
- No clear student post-signup onboarding state independent of billing/trial/enrollment.
- Login/root redirect behavior is admin-first rather than role/student-aware.

Important but non-blocking for AUTH-1B:
- Decide whether AUTH-1B designs email-convention hardening or a future explicit FK relation.
- Decide duplicate email and partial-account recovery behavior.
- Define password policy, account creation copy, and error messages.
- Define safe admin visibility for newly registered but unenrolled students.
- Decide whether the existing login signup toggle should be removed, hidden, or repurposed in AUTH-1C.

Out of scope for Block 1:
- Billing, subscription, plan, payment, trial enforcement, self-serve enrollment, and multi-program dashboard.
- Block 7 content-route work.
- L1/M2 content readiness.

Dependencies on billing/trial/enrollment that should not be solved yet:
- Trial start/expiration fields and access control.
- Paid plan activation.
- Self-serve enrollment catalog and max-3 tutoria rules.
- Subscription lifecycle and paused/canceled access.

## 13. Risk assessment
- Auth/security risks: email-only User/Student linkage can be brittle if emails are edited; no DB role makes admin authorization dependent on env configuration; login UI exposes a signup mode that is not actually public signup.
- Data integrity risks: `User.email` and `Student.email` can diverge; a `User` can exist without `Student`; a `Student` can exist without `User`; enrollment creation is not universally tied to account creation.
- Student experience risks: newly authenticated non-admin users without full bootstrap see empty/no-program states; login redirects first to admin then may bounce to `/now`; no self-serve onboarding explains what happens after account creation.
- Admin boundary risks: guard is centralized and mostly strong, but correctness depends on all admin surfaces using the guard and on the allowlist being configured correctly.
- Roadmap/scope risks: AUTH-1B could drift into billing/trial/enrollment or schema implementation. It should remain a contract/design phase pending human review of this audit.

## 14. Recommendation for MVP-SALES-AUTH-1B
- Suggested phase name: `MVP-SALES-AUTH-1B - Design User/Student bootstrap contract`.
- Goal: define the minimal, safe contract for autonomous student account bootstrap without implementing it yet.
- Minimal scope: specify public signup inputs, validation, User/Student creation or reconciliation, email normalization, duplicate/partial-account handling, initial non-admin session routing, safe `/now` empty/onboarding state, admin visibility, audit expectations, and test/readiness criteria.
- Files likely involved for future implementation planning: `nextjs_space/lib/auth-options.ts`, `nextjs_space/app/login/*`, future `nextjs_space/app/signup/*` or equivalent, `nextjs_space/app/api/signup/route.ts`, `nextjs_space/prisma/schema.prisma` if an explicit relation is later chosen, `nextjs_space/app/now/page.tsx`, `nextjs_space/lib/admin-guard.ts`, student/admin account APIs.
- Explicit non-goals: no implementation in AUTH-1B, no billing, no trial, no enrollment, no payment, no schema migration unless a later implementation phase is authorized, no deploy, no DB mutation, no Block 7.
- Whether implementation should be authorized yet: NO, pending human review of AUTH-1A.

## 15. Final verdict
READY_FOR_AUTH_1B_IMPLEMENTATION_PLANNING
