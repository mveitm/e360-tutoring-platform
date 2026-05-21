# MVP-SALES-TRIAL-2E - Minimal Trial/Access Schema Design

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2D closed at `109b24a`.
- Priority verdict: `APPROVED_NEXT_PHASE`.
- Scope: documentation/design/readiness only for the minimal future schema model for trial/access.
- Explicit non-goals: no implementation, no `prisma/schema.prisma` edit, no real schema change, package change, deploy, staging/prod, SQL, Prisma CLI, DB mutation, dev server, seed, secret inspection, account creation, enrollment creation, real trial creation, billing/payment/subscription creation, Program, LearningCycle, StudyLoad, Student edit, password reset, auth/signup/login/admin guard change, Block 7, real FK User/Student, commit, push, or generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean output from `git status --short`.
- HEAD / origin/main: both `109b24a225552ade7897aca2b27a788b5a39bec6`.
- Baseline verdict: baseline matched expected `109b24a`; working tree was clean at phase start. Git preflight is the live truth.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2D_TRIAL_ACCESS_IMPLEMENTATION_READINESS_AUDIT.md`.
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2C_TRIAL_ACCESS_STATE_MODEL_FROM_CANONICAL_STAGES.md`.
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2B_CANONICAL_STUDENT_TRIAL_EXPERIENCE_STAGES.md`.
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2A_TRIAL_AND_ACCESS_CONTROL_BOUNDARY.md`.
- `nextjs_space/docs/operations/MVP_SALES_AUTH_1M_BLOCK_1_CLOSEOUT_AND_NEXT_BLOCK_READINESS.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
- `PHASE_LOG.md -Tail 820`.

Schema/code files reviewed read-only:
- `nextjs_space/prisma/schema.prisma`.
- Search: `rg "model Student|model User|StudentProgramInstance|AuditEvent|status|access|trial|subscription|payment|Program|LearningCycle|StudyLoad" nextjs_space/prisma nextjs_space/app nextjs_space/lib -g "!node_modules" -g "!.next" -g "!*.env*" -g "!*.log"`.

Stale baseline issues:
- `MVP_SALES_READY_ROADMAP.md` still names AUTH-1A as the current next recommended phase from an older roadmap state.
- Historical TRIAL/AUTH docs retain their own baselines.
- Git preflight and the accepted PHASE_LOG chain win. The live TRIAL-2E baseline is `109b24a`.

## 4. Design problem
Current models are insufficient for trial/access:
- `Student.status` should not be overloaded because it currently expresses student profile/account record status, not commercial access, trial, payment, or enrollment state.
- Absence of enrollment is insufficient because it can only imply "no active program"; it cannot distinguish review pending, trial invited, trial active, expired, subscribed, or setup pending.
- `StudyLoad` must not mark trial because StudyLoads are real pedagogical work tied to LearningCycle/enrollment.
- Subscription must not equal enrollment because commercial access can be active while program setup is still pending.
- Admin decisions need future traceability because trial activation, expiry override, subscription confirmation, and redirection require actor, timestamp, and reason.

## 5. Candidate schema options
### A. Add fields directly on Student
- Benefits: simplest lookup; no new relation to query.
- Risks: mixes profile identity with commercial/trial lifecycle; makes `Student.status` or sibling fields a dumping ground.
- Scope creep risk: high, because billing, enrollment, onboarding, and access concerns can accumulate on Student.
- Fit with MVP-Beta: weak.
- Verdict: not recommended.

### B. Add a new 1:1 `StudentAccess` model
- Benefits: clean source of truth for current access/trial state; keeps Student as identity/profile; simple `/now` and admin reads.
- Risks: current-state-only model can lose history unless paired with audit/event later.
- Scope creep risk: moderate if subscription/enrollment fields expand beyond boundary.
- Fit with MVP-Beta: strong.
- Verdict: recommended as minimal current-state model.

### C. Add an append-only `StudentAccessEvent` model only
- Benefits: strong auditability; preserves every decision.
- Risks: harder for `/now` and admin list to query current state; needs reducer/materialized state logic before UI.
- Scope creep risk: moderate; event taxonomy can overgrow early.
- Fit with MVP-Beta: useful later, too heavy as only first model.
- Verdict: not recommended as the only model for MVP-Beta.

### D. Add both current-state `StudentAccess` and future/audit event relation
- Benefits: current-state reads stay simple while audit path is planned; aligns with existing `AuditEvent` direction.
- Risks: if both are implemented at once, it may overbuild Block 2.
- Scope creep risk: controllable if event relation is future/hardening first.
- Fit with MVP-Beta: strongest as design direction, with `StudentAccess` first and event relation later.
- Verdict: recommended design direction.

### E. Use StudentProgramInstance as limited trial enrollment
- Benefits: close to real tutoring; reuses existing enrollment/cycle/load machinery.
- Risks: violates TRIAL-2A/2B/2C boundary; trial becomes enrollment; can create Program/LearningCycle/StudyLoad too early.
- Scope creep risk: very high; opens Block 4/7 semantics prematurely.
- Fit with MVP-Beta: poor for Block 2.
- Verdict: rejected for the first trial/access schema.

## 6. Recommended minimal schema shape
Recommended design: new 1:1 current-state model named `StudentAccess`.

Purpose:
- hold the current commercial/access/trial state for a Student;
- drive future `/now` and admin UI;
- preserve no-enrollment/no-content boundary;
- support manual owner/admin operations before billing/enrollment automation exists.

Conceptual shape only:

```prisma
model StudentAccess {
  id                     String   @id @default(cuid())
  studentId              String   @unique
  accessStatus           String   @default("no_access")
  trialStatus            String   @default("none")
  trialInvitedAt         DateTime?
  trialActivatedAt       DateTime?
  trialExpiresAt         DateTime?
  trialExperienceUsedAt  DateTime?
  tutoringDirection      String?
  continuityTarget       String?
  subscriptionStatus     String   @default("none")
  lastDecisionBy         String?
  lastDecisionAt         DateTime?
  lastDecisionReason     String?
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt

  student Student @relation(fields: [studentId], references: [id], onDelete: Cascade)

  @@index([accessStatus])
  @@index([trialStatus])
  @@index([trialExpiresAt])
  @@map("student_access")
}
```

This is not an instruction to edit `schema.prisma` in this phase.

## 7. Status values
Recommended: keep two status fields.

`accessStatus` describes the student-visible/access lifecycle:
- `no_access`;
- `review_pending`;
- `trial_invited`;
- `trial_active`;
- `trial_expired_blocked`;
- `subscription_pending`;
- `subscribed_access_active`;
- `enrollment_setup_pending`;
- `enrolled_active_program`.

`trialStatus` describes the trial-specific substate:
- `none`;
- `invited`;
- `active`;
- `experience_available`;
- `experience_used`;
- `expired`;
- `cancelled`.

Why two fields:
- `accessStatus` lets `/now` and admin display the broad access state.
- `trialStatus` tracks the one-experience/timing detail without forcing every non-trial access state to pretend it is part of trial.
- Application validation should define legal pairs, for example `accessStatus = trial_active` may pair with `trialStatus = active | experience_available | experience_used`.

## 8. Timestamp semantics
- `trialInvitedAt`: set when owner/admin invites or marks trial as ready. It does not start the 7-day timer.
- `trialActivatedAt`: set when the trial is explicitly activated. This starts the 7-day timer.
- `trialExpiresAt`: should be calculated as `trialActivatedAt + 7 days` at activation time.
- `trialExperienceUsedAt`: set when the single tutoring experience is consumed or owner/admin marks it used.
- `lastDecisionAt`: timestamp of the latest owner/admin/system decision that changed access or trial state.
- `createdAt` / `updatedAt`: record lifecycle timestamps for the current-state row.

Rules:
- Invitation does not start the timer.
- Activation starts the timer.
- Expiration is strict after activation.
- If the experience is used before expiration, no second experience appears.
- Expiration can happen whether the experience was used or not unless owner/admin grants an explicit exception.

## 9. Tutoring direction and continuity target
`tutoringDirection` means the intended tutoring line introduced by the trial, for example `PAES_M1`, `PAES_L1`, or a future owner-defined direction.

Recommended MVP-Beta representation:
- store as a string code initially;
- prefer known program-like codes when appropriate;
- do not create a relation to Program yet;
- do not imply the student is enrolled.

`continuityTarget` means the preferred continuation path after subscription. It can repeat the tutoring direction or hold a more specific future handoff label.

Why this matters:
- if the student subscribes, Bexauri should preserve continuity with the trial direction when pedagogically appropriate;
- owner/admin can redirect for pedagogical reasons;
- the schema should capture intent without creating Program, LearningCycle, StudyLoad, PAES path, or content route automatically.

## 10. Actor/audit model
Minimum MVP-Beta current-state fields:
- `lastDecisionBy`: denormalized actor identifier, likely admin email or future actor id string.
- `lastDecisionAt`: timestamp of last decision.
- `lastDecisionReason`: short human-readable reason.

Later hardening:
- relation to existing `AuditEvent` by recording `entityType = StudentAccess` and `entityId = StudentAccess.id`;
- or a dedicated append-only `StudentAccessEvent` model if access history needs richer domain-specific events.

Enough for MVP-Beta:
- current state plus last decision metadata is enough to avoid invisible state changes.
- append-only event history is desirable but can follow once mutation paths are designed.

## 11. Relationship boundaries
- User: no direct relation in this model for MVP-Beta. User remains auth identity; current User/Student linkage remains email-based until separate FK hardening.
- Student: `StudentAccess` is 1:1 with Student through `studentId @unique`.
- StudentProgramInstance: no relation yet. Access can precede enrollment and must not create enrollment.
- Program: no relation yet. `tutoringDirection` can use a string code without implying active Program.
- LearningCycle: no relation. LearningCycles start after enrollment.
- StudyLoad: no relation. StudyLoads are real work and must not mark trial status.
- Billing/subscription provider: no provider FK or provider IDs yet. `subscriptionStatus` is a manual/commercial placeholder only.
- AuditEvent: future audit integration should reference `StudentAccess` but should not be required for the first schema shape unless the implementation phase chooses it.

## 12. Manual operations supported by this schema
Future admin/manual operations enabled:
- mark review pending;
- invite trial;
- activate trial;
- mark experience available;
- mark experience used;
- expire/block trial;
- mark subscription pending;
- mark subscribed access active;
- start enrollment setup pending;
- redirect tutoring direction with reason;
- record last decision actor/time/reason.

Do not implement these operations in this phase.

## 13. Student UI supported by this schema
Future `/now` or dashboard behavior can use `StudentAccess` to drive:
- no access;
- review pending;
- trial invited;
- active trial;
- experience available;
- experience used;
- expired blocked;
- subscription pending;
- subscribed setup pending;
- enrolled active handoff.

The UI must still verify enrollment/program/activity state separately before showing real activities.

Do not implement copy in this phase.

## 14. Admin UI supported by this schema
Future admin/readiness surfaces:
- show access status in student list/detail;
- filter students by access status;
- set access decision;
- see trial timestamps;
- see tutoring direction;
- see continuity target;
- record last decision reason;
- avoid creating enrollment prematurely;
- identify expired or soon-expiring trials.

Admin UI should not create Program, LearningCycle, StudyLoad, or billing provider records as part of Block 2.

## 15. Migration and rollout considerations
Conceptual future rollout:
- additive migration only;
- add `StudentAccess` without touching existing Student/User/enrollment rows destructively;
- backfill existing students with `accessStatus = no_access`, `trialStatus = none`, `subscriptionStatus = none`;
- create default `StudentAccess` row for future self-signups;
- no destructive migration;
- no production mutation in this design phase;
- later smoke tests should verify signup -> StudentAccess default, `/now` no-access, admin visibility, and no enrollment/StudyLoad creation.

## 16. Risks and safeguards
- Schema creep: keep provider billing IDs, enrollment IDs, Program FK, StudyLoad FK, and detailed notes out of first shape.
- Status inconsistency: define allowed access/trial status pairs in app validation before implementation.
- Manual actor errors: require `lastDecisionReason` for state changes that grant, expire, override, or redirect access.
- Billing/enrollment confusion: `subscriptionStatus` must remain manual/commercial and not create enrollment.
- Trial expiry enforcement: timestamps alone are insufficient; implementation later needs explicit guard logic.
- Audit gaps: last decision fields are minimum; append-only audit should follow for stronger traceability.
- Over-automation risk: no automatic Program/LearningCycle/StudyLoad creation from StudentAccess.

## 17. Recommended next phase
`MVP-SALES-TRIAL-2F - Trial/access schema implementation readiness`

Scope: documentation/readiness only. Review the proposed `StudentAccess` shape for implementation readiness, define legal status transitions/pairs, backfill/default-row policy, validation rules, audit event requirements, and exact first implementation cut. No `schema.prisma` edit or migration yet unless Mauricio explicitly approves implementation after readiness.

## 18. Final verdict
READY_FOR_TRIAL_ACCESS_SCHEMA_IMPLEMENTATION_READINESS
