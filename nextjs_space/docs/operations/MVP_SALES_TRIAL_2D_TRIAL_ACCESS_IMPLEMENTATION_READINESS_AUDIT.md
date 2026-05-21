# MVP-SALES-TRIAL-2D - Trial/Access Implementation Readiness Audit

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2C closed at `e083774`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: audit/readiness/documentation only for the safest first implementation path for trial/access.
- Explicit non-goals: no implementation, app code changes, schema changes, package changes, deploy, staging/prod, SQL, Prisma CLI, DB mutation, dev server, seed, secret inspection, account creation, enrollment creation, trial creation, billing/payment/subscription, Program, LearningCycle, StudyLoad, Student edit, password reset, auth/signup/login/admin guard change, Block 7, FK User/Student, commit, push, or generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: both `e0837741a081482ca7c627a378e985b59c7375f3`.
- Baseline verdict: baseline matched expected `e083774`; working tree was clean at phase start. Git preflight is the live truth.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2C_TRIAL_ACCESS_STATE_MODEL_FROM_CANONICAL_STAGES.md`.
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2B_CANONICAL_STUDENT_TRIAL_EXPERIENCE_STAGES.md`.
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2A_TRIAL_AND_ACCESS_CONTROL_BOUNDARY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1M_BLOCK_1_CLOSEOUT_AND_NEXT_BLOCK_READINESS.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `PHASE_LOG.md -Tail 760`.

Code/schema files reviewed read-only:
- `nextjs_space/prisma/schema.prisma`.
- `nextjs_space/app/now/page.tsx`.
- `nextjs_space/app/signup/_components/signup-form.tsx`.
- `nextjs_space/app/api/signup/route.ts`.
- `nextjs_space/app/admin/_components/students-view.tsx`.
- `nextjs_space/app/admin/students/[id]/page.tsx`.
- `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`.
- `nextjs_space/app/admin/beta-operations/page.tsx`.
- `nextjs_space/app/admin/beta-operations/_components/beta-operations-view.tsx`.
- `nextjs_space/app/api/students/route.ts`.
- `nextjs_space/app/api/students/[id]/route.ts`.
- `nextjs_space/app/api/instances/route.ts`.
- `nextjs_space/app/api/instances/[id]/route.ts`.
- `nextjs_space/app/api/learning-cycles/route.ts`.
- `nextjs_space/app/api/study-loads/route.ts`.
- `nextjs_space/lib/admin-guard.ts`.

Search reviewed:
- `rg "model Student|model User|StudentProgramInstance|Enrollment|Trial|Subscription|Payment|status|now|signup|admin|Program|LearningCycle|StudyLoad|Cycle|access|trial" nextjs_space -g "!node_modules" -g "!.next" -g "!*.env*" -g "!*.log"`.

Stale baseline issues:
- `MVP_SALES_READY_ROADMAP.md` still names AUTH-1A as the current next recommended phase from an older roadmap state.
- Historical docs retain their own baselines.
- Git preflight and the accepted PHASE_LOG chain win. The live TRIAL-2D baseline is `e083774`.

## 4. Current app/data surfaces audited
- User model: stores auth identity fields, including email/password, but no role, trial, access, payment, or student FK.
- Student model: stores profile identity, unique email, and `status` defaulting to `active`; it has no trial/access/payment/enrollment readiness fields.
- StudentProgramInstance/enrollment model: represents real program enrollment with status, started/ended dates, current cycle pointer, and continuity state. It is already pedagogical/program state, not pre-enrollment access state.
- `/now` no-active-program behavior: resolves Student by session email, then checks active `StudentProgramInstance`; if none exists, it renders the safe pending program state and no activities.
- Signup flow: creates User + Student transactionally with normalized email and `Student.status = active`; it does not create trial, subscription, enrollment, Program, LearningCycle, or StudyLoad.
- Admin student visibility: `/api/students` lists students with `_count.programInstances`; admin root `StudentsView` shows count, status, search, edit, delete, and detail links.
- Admin/program/learning-cycle/study-load surfaces: existing admin operations focus on enrollment, cycles, study loads, and beta operations for already-enrolled students.
- Billing/trial/subscription absence: no Trial, Access, Subscription, Payment, or billing model exists in schema.

## 5. Current capability assessment
- `signed_up_no_access`: already supported implicitly by User + Student and absence of active enrollment; student UI is safe.
- `access_review_pending`: partially supported as copy in `/now`, but not explicit, trackable, filterable, or auditable.
- `trial_invited`: not supported.
- `trial_active`: not supported; no activation timestamp, duration, expiration, or source of truth.
- `trial_experience_available`: not supported safely without either explicit access state or valid enrollment/content authorization.
- `trial_experience_used`: not supported; no marker exists outside real StudyLoad/TutoringSession activity, which must not be faked.
- `trial_expired_blocked`: not supported; no expiration clock or access gate exists.
- `subscription_pending`: not supported except as manual/external commercial process outside app.
- `subscribed_access_active`: not supported; no subscription/access state exists.
- `enrollment_setup_pending`: partially expressible manually after subscription outside app, but not represented in app.
- `enrolled_active_program`: already supported through active StudentProgramInstance, LearningCycle, and StudyLoad flows.

Dangerous to fake:
- Using `Student.status` as access/trial/payment state.
- Using absence of enrollment as the whole trial model.
- Creating StudyLoads to mark trial intent.
- Treating subscription as enrollment.
- Showing trial activity before valid access/enrollment/content boundaries exist.

## 6. Field/entity fit analysis
- User: should remain authentication identity. It should not carry trial/access semantics.
- Student: should remain student profile/identity. `Student.status` should not be overloaded for trial, access, payment, subscription, lead, or enrollment state.
- StudentProgramInstance: represents real enrollment/program state. It should not represent pre-enrollment trial/access unless a later block explicitly models trial as limited enrollment, which current TRIAL-2A/2B/2C rejected as the immediate direction.
- Program: represents available tutoring programs/content taxonomy. It should not store per-student access.
- LearningCycle: internal pedagogical cycle after enrollment. It should not mark trial invitation, commercial access, or subscription.
- StudyLoad: real student work. It should not be used as a trial marker or fake activity.
- New future access/trial model: best fit for access status, trial invitation/activation/expiration, tutoring direction, continuity target, and subscription handoff.
- Audit/event model: existing `AuditEvent` shape is relevant conceptually for future traceability, but access/trial events need a dedicated design before implementation.

Verdict: do not overload `Student.status`. Trial/access requires a separate conceptual source of truth.

## 7. UI readiness assessment
- Current `/now` is ready for `signed_up_no_access`: it shows account ready, no active program, activation pending, and no activities assigned.
- `access_review_pending` could be improved as copy/UI only, but without schema it would be indistinguishable from generic no-access for all self-signups.
- `trial_invited`, `trial_active`, and `trial_expired_blocked` are not UI-ready because there is no durable state to drive them.
- Subscription states are not UI-ready because billing/subscription are not modeled yet.
- Main risk: UI-only trial language would promise a state the backend cannot enforce or audit.
- Student clarity needs: keep no-access honest now; only expose trial states after access/trial state exists.

## 8. Admin readiness assessment
- Admin can currently see self-signups through the student list and infer no enrollment from `_count.programInstances = 0`.
- Admin can open student detail, see whether a User account exists, and create enrollment.
- Admin cannot distinguish no-access, review pending, trial invited, trial active, trial used, expired, subscription pending, or subscribed access today.
- Existing admin UI can support manual external review operationally, but not in-app trial decisions safely.
- Admin beta operations focus on active enrollments, cycles, and StudyLoads; they do not cover pre-enrollment access.
- Future admin UI likely needs a new access/trial decision surface or student detail panel section with status, timestamps, tutoring direction, actor/audit, and notes/reason.

## 9. Schema readiness assessment
Likely needed for MVP-Beta:
- `accessStatus`.
- `trialStatus`.
- `trialInvitedAt`.
- `trialActivatedAt`.
- `trialExpiresAt`.
- `trialExperienceUsedAt`.
- `tutoringDirection`.
- `continuityTarget`.
- `adminActor` / audit link or event trace.

Later hardening:
- Structured owner/admin reason fields.
- Override reason and expiration exception trace.
- Contact/review notes.
- Access event history if not covered by a generic audit/event model.

Defer to billing/enrollment blocks:
- `subscriptionStatus` if it depends on real billing provider lifecycle.
- Billing provider records.
- Subscription lifecycle automation.
- Enrollment automation.
- Program/LearningCycle/StudyLoad creation.
- PAES path assignment.
- FK User/Student hardening if unrelated to access model.

## 10. First implementation slice options
### A. No code yet; schema design first
- Benefit: creates a durable source of truth before UI/admin states make promises.
- Risk: one more design phase before visible progress.
- Dependency: accepted TRIAL-2C state model and this readiness audit.
- Why now: safest path because current app lacks explicit access/trial data and auditability.

### B. UI-only no-access/review-pending hardening
- Benefit: quick student-facing polish; current `/now` already supports no-active-program copy.
- Risk: without schema, review-pending is not distinguishable from no-access and cannot drive admin operation.
- Dependency: none for copy-only, but it does not advance true trial/access implementation.
- Why later: useful after state design, or if explicitly scoped as copy polish only.

### C. Admin manual trial operation design
- Benefit: defines owner workflow before coding admin controls.
- Risk: operation design without schema may still leave no durable state.
- Dependency: access/trial schema candidates or accepted manual state shape.
- Why later: should follow minimal schema design or be paired with it.

### D. Minimal access/trial schema design
- Benefit: defines clean state source of truth, prevents overloading Student/status/enrollment, enables future UI and admin operations.
- Risk: schema design must stay minimal and avoid billing/enrollment/content scope creep.
- Dependency: current TRIAL-2C state model and readiness audit.
- Why now: best next step before implementation.

### E. Trial/access implementation plan after readiness audit
- Benefit: can sequence schema, admin operation, `/now` UI, and later billing/enrollment handoff.
- Risk: too broad if done before schema decisions.
- Dependency: minimal schema design.
- Why later: useful after 2E.

## 11. Recommended first implementation path
Recommended path: choose schema design before implementation.

Next phase name:
- `MVP-SALES-TRIAL-2E - Minimal trial/access schema design`.

Implementation should not begin yet. Another readiness/design phase is needed to define the minimal access/trial data model, relation boundaries, allowed statuses, timestamps, audit requirements, and how it will drive `/now` and admin views without creating enrollment, billing, or content.

Before coding, Bexauri must have:
- accepted minimal schema shape;
- accepted state names and transition guards;
- admin actor/audit policy;
- decision on where tutoring direction/continuity target lives;
- clear separation from billing provider records and enrollment/program records.

Out of scope for the next phase:
- code changes;
- migration execution;
- admin UI implementation;
- student UI implementation;
- billing/payment integration;
- enrollment/program automation;
- StudyLoad/content route work;
- Block 7.

## 12. Non-goals preserved
Confirmed no:
- app code change;
- schema change;
- package change;
- deploy;
- staging/prod;
- SQL;
- Prisma CLI;
- DB mutation;
- `.env`/secret inspection;
- account/trial/enrollment/billing creation;
- Program/LearningCycle/StudyLoad;
- Block 7;
- FK;
- seed.

## 13. Risks and open decisions
- No explicit access schema exists yet.
- Manual admin bottleneck remains.
- Billing is absent and should remain Block 3.
- Trial expiration enforcement is absent.
- Continuity target is not captured.
- Current models create tempting but unsafe shortcuts, especially `Student.status` and StudentProgramInstance.
- UI promises before backend state would create product debt.
- Admin operations without auditability would make trial activation/override hard to trust.

## 14. Recommended next phase
`MVP-SALES-TRIAL-2E - Minimal trial/access schema design`

Scope: documentation/design/readiness only. Define the smallest future schema model for Block 2 access/trial state, including status values, timestamps, student relation, tutoring direction, continuity target, admin actor/audit requirements, and explicit boundaries from billing, subscription provider records, enrollment, Program, LearningCycle, StudyLoad, PAES path assignment, and Block 7. Do not implement or migrate yet.

## 15. Final verdict
READY_FOR_MINIMAL_TRIAL_ACCESS_SCHEMA_DESIGN
