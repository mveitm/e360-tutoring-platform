# MVP-SALES-TRIAL-2F - Trial/Access Schema Implementation Readiness

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2E closed at `260cfb6`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: documentation/readiness only. Decide whether the `StudentAccess` design is ready for a future schema implementation phase and define legal status pairs, defaults, backfill, transition validation, audit readiness, and first implementation boundaries.
- Explicit non-goals: no implementation, no `schema.prisma` edit, no migration, no Prisma CLI, no SQL, no DB mutation, no deploy, no staging/prod, no billing/payment real, no enrollment creation, no Program/LearningCycle/StudyLoad, no PAES path assignment, no Block 7, no real User/Student FK hardening.

## 2. Git preflight
- git status: clean.
- HEAD / origin/main: `260cfb6c497d34c47d2b0d07095757d9f82ff9d2` / `260cfb6c497d34c47d2b0d07095757d9f82ff9d2`.
- Baseline verdict: matches expected baseline `HEAD = origin/main = 260cfb6`; working tree was clean before this documentation/readiness phase.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2E_MINIMAL_TRIAL_ACCESS_SCHEMA_DESIGN.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2D_TRIAL_ACCESS_IMPLEMENTATION_READINESS_AUDIT.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2C_TRIAL_ACCESS_STATE_MODEL_FROM_CANONICAL_STAGES.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2B_CANONICAL_STUDENT_TRIAL_EXPERIENCE_STAGES.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2A_TRIAL_AND_ACCESS_CONTROL_BOUNDARY.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md -Tail 900`

Read-only schema/code files reviewed:
- `nextjs_space/prisma/schema.prisma`
- `nextjs_space/app/api/signup/route.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/app/admin/_components/students-view.tsx`
- `nextjs_space/app/admin/students/[id]/_components/student-detail-view.tsx`
- Read-only `rg` search across `nextjs_space/prisma`, `nextjs_space/app`, and `nextjs_space/lib` for audit, Student, enrollment, signup, now, admin, access, trial, subscription, Program, LearningCycle, and StudyLoad references.

Stale baseline note: `MVP_SALES_READY_ROADMAP.md` still describes an earlier roadmap checkpoint as current. Git preflight, accepted commits, TRIAL-2A through TRIAL-2E, and `PHASE_LOG.md` establish the live phase sequence. Git preflight wins.

## 4. Readiness question
TRIAL-2E's `StudentAccess` concept is ready for a future minimal schema implementation phase, under strict constraints:
- implement only the current-state source-of-truth model first;
- keep audit/event expansion as later hardening;
- do not expose student UI or admin mutation UI before transition validation exists;
- do not connect access/trial to Program, LearningCycle, StudyLoad, billing provider records, or enrollment creation;
- do not treat subscription as enrollment;
- do not use `Student.status` for trial/access/payment/enrollment state.

The readiness decision is therefore positive for a schema-only first cut, not for a full trial feature.

## 5. Proposed implementation target
Minimal future implementation target:
- new `StudentAccess` model;
- 1:1 relation with `Student` through `studentId @unique`;
- current-state source of truth for access/trial/subscription placeholders;
- string status fields validated by application code, consistent with the existing schema style;
- no relation to Program, LearningCycle, StudyLoad, billing/subscription provider records, or User;
- no real User/Student FK hardening;
- no Block 7.

The first implementation should make access state representable without changing student experience, admin operations, payment, enrollment, or content behavior.

## 6. Legal status model
Legal conceptual `accessStatus` values:
- `no_access`
- `review_pending`
- `trial_invited`
- `trial_active`
- `trial_expired_blocked`
- `subscription_pending`
- `subscribed_access_active`
- `enrollment_setup_pending`
- `enrolled_active_program`

Legal conceptual `trialStatus` values:
- `none`
- `invited`
- `active`
- `experience_available`
- `experience_used`
- `expired`
- `cancelled`

Two fields remain useful because `accessStatus` describes the student's commercial/access boundary, while `trialStatus` describes the substate of the one 7-day trial. This avoids overloading one field with every combination and keeps subscription/enrollment placeholders separate from trial usage.

## 7. Legal status pairs
| accessStatus | allowed trialStatus | meaning | student-facing implication | notes |
| --- | --- | --- | --- | --- |
| `no_access` | `none` | Student has an account but no trial, subscription, or enrollment access. | Safe no-access or account-ready state. | Default for new self-signups. |
| `review_pending` | `none` | Owner/admin review is pending. | Student sees that Bexauri is reviewing the next step. | No trial timer. |
| `trial_invited` | `invited` | Trial has been offered or prepared, but not activated. | Student can understand trial is available/pending activation. | Invitation does not start the 7-day clock. |
| `trial_active` | `active` | Trial was explicitly activated and the 7-day clock is running. | Student has active trial access, but experience may not yet be marked available. | `trialActivatedAt` and `trialExpiresAt` required. |
| `trial_active` | `experience_available` | Active trial with the one tutoring experience available. | Student can start or use the single trial experience. | No second experience should appear. |
| `trial_active` | `experience_used` | Active trial where the one tutoring experience has been used before expiry. | Student sees the trial experience is used and continuity/subscription is next. | `trialExperienceUsedAt` required. |
| `trial_expired_blocked` | `expired` | 7-day trial window expired and tutoring access is blocked. | Student sees blocked/expired state and subscription path if available. | No work should be accessible. |
| `subscription_pending` | `expired` | Student is pursuing subscription after an expired trial. | Student sees commercial continuation is pending. | No enrollment/work created. |
| `subscription_pending` | `experience_used` | Student is pursuing subscription after using the trial experience. | Student sees continuation is pending from the same tutoring direction. | No enrollment/work created. |
| `subscription_pending` | `none` | Manual commercial path without a prior trial substate. | Student sees subscription/commercial step pending. | Useful for owner/admin exceptions. |
| `subscribed_access_active` | `expired` | Subscription/access is active after expired trial. | Student has commercial access, but program setup may still be pending. | No automatic enrollment. |
| `subscribed_access_active` | `experience_used` | Subscription/access is active after a used trial. | Student should feel continuity from the trial direction. | No automatic enrollment. |
| `subscribed_access_active` | `none` | Subscription/access is active without trial history. | Student has commercial access, pending setup. | Manual/commercial placeholder only. |
| `enrollment_setup_pending` | `none` | Commercial/access path is ready and program setup is pending. | Student sees setup is being prepared. | Preferred normalized pair when no trial continuity context is needed. |
| `enrollment_setup_pending` | `expired` | Program setup is pending after an expired trial path. | Student sees setup is pending after subscription/access decision. | Historical trial context remains visible. |
| `enrollment_setup_pending` | `experience_used` | Program setup is pending after a used trial experience. | Student sees continuity handoff from trial to paid path. | Preserve tutoring direction. |
| `enrolled_active_program` | `none` | Active enrollment/program is now the source of truth for learning work. | Student sees real program/activity state driven by enrollment/cycles. | Trial status should no longer drive UI. |

Prohibited pairs for the first implementation:
- `no_access` with any `trialStatus` except `none`;
- `review_pending` with any `trialStatus` except `none`;
- `trial_invited` with any `trialStatus` except `invited`;
- `trial_active` with `none`, `invited`, `expired`, or `cancelled`;
- `trial_expired_blocked` with any `trialStatus` except `expired`;
- `subscribed_access_active` with `active`, `experience_available`, or `invited`;
- `enrollment_setup_pending` with `active`, `experience_available`, or `invited`;
- `enrolled_active_program` with any active/invited/expired/used trial driver in first-cut UI semantics;
- any pair that implies Program, LearningCycle, StudyLoad, billing provider, or Block 7 activity exists.

`cancelled` is a valid conceptual trial status but should not be used in the first implementation unless a cancellation operation is explicitly designed. If used later, it requires a separate legal pair policy and reason/audit behavior.

## 8. Default row and backfill policy
Default for new self-signup:
- create a `StudentAccess` row when the signup/default-row behavior is explicitly authorized;
- `accessStatus = no_access`;
- `trialStatus = none`;
- `subscriptionStatus = none`;
- trial timestamps null;
- `tutoringDirection` and `continuityTarget` null;
- `lastDecisionBy = system`;
- `lastDecisionAt = now`;
- `lastDecisionReason = public_signup_default_no_access`.

Default for existing students with no active enrollment:
- backfill `accessStatus = no_access`;
- `trialStatus = none`;
- `subscriptionStatus = none`;
- no trial timestamps.

Default for existing students with active enrollment:
- backfill `accessStatus = enrolled_active_program`;
- `trialStatus = none`;
- `subscriptionStatus = none` unless a future commercial source of truth says otherwise;
- no trial timestamps.

Rows should be created for all students, not only self-signups, to avoid null-branch behavior in future `/now` and admin logic. The migration/backfill must be additive and non-destructive. Dev/staging/prod mutations must require explicit later authorization, with a reviewed migration/backfill plan and rollback-safe behavior.

## 9. Transition validation rules
Invite trial:
- Required current state: `no_access + none` or `review_pending + none`.
- Required fields: `tutoringDirection` or explicit reason for missing direction.
- Actor: owner/admin.
- Timestamp behavior: set `trialInvitedAt`; do not set `trialActivatedAt` or `trialExpiresAt`.
- Reason/audit: `lastDecisionBy`, `lastDecisionAt`, `lastDecisionReason`; future `AuditEvent` required when mutation endpoint exists.

Activate trial:
- Required current state: `trial_invited + invited`.
- Required fields: `trialInvitedAt`, `tutoringDirection`.
- Actor: owner/admin or explicit system operation authorized by owner/admin.
- Timestamp behavior: set `trialActivatedAt = now`; set `trialExpiresAt = trialActivatedAt + 7 days`; set `accessStatus = trial_active`; set `trialStatus = active`.
- Reason/audit: required.

Mark experience available:
- Required current state: `trial_active + active`.
- Required fields: active trial timestamps and unexpired trial.
- Actor: owner/admin or system if later designed.
- Timestamp behavior: no new timestamp required in the 2E minimal shape; do not create StudyLoad.
- Reason/audit: required if manual.

Mark experience used:
- Required current state: `trial_active + active` or `trial_active + experience_available`.
- Required fields: `trialActivatedAt`, `trialExpiresAt`, unexpired trial.
- Actor: owner/admin or future system event from a real designed tutoring experience.
- Timestamp behavior: set `trialExperienceUsedAt = now`; set `trialStatus = experience_used`; do not create a second experience.
- Reason/audit: required.

Expire trial:
- Required current state: `trial_active + active`, `trial_active + experience_available`, or `trial_active + experience_used`.
- Required fields: `trialExpiresAt`.
- Actor: system based on time, or owner/admin for manual correction.
- Timestamp behavior: set `accessStatus = trial_expired_blocked`; set `trialStatus = expired` when `now >= trialExpiresAt`.
- Reason/audit: required for manual early expiry or override.

Mark subscription pending:
- Required current state: `trial_expired_blocked + expired`, `trial_active + experience_used`, or manual `no_access + none` exception.
- Required fields: commercial reason or owner/admin note.
- Actor: owner/admin or future payment/subscription provider once integrated.
- Timestamp behavior: do not alter trial timestamps except last decision fields.
- Reason/audit: required.

Mark subscribed access active:
- Required current state: `subscription_pending` or owner/admin-confirmed commercial exception.
- Required fields: decision reason; future payment confirmation when billing exists.
- Actor: owner/admin in MVP-Beta; future payment/subscription provider later.
- Timestamp behavior: update last decision fields only.
- Reason/audit: required.

Move to enrollment setup pending:
- Required current state: `subscribed_access_active`.
- Required fields: continuity target or tutoring direction decision.
- Actor: owner/admin.
- Timestamp behavior: update last decision fields only.
- Reason/audit: required.

Mark enrolled active program:
- Required current state: `enrollment_setup_pending` or existing active enrollment backfill.
- Required fields: valid active `StudentProgramInstance` created through the enrollment block, not by StudentAccess.
- Actor: owner/admin or future enrollment operation.
- Timestamp behavior: set `accessStatus = enrolled_active_program`; normalize `trialStatus = none`.
- Reason/audit: required.

## 10. Timestamp and derived behavior
- `trialExpiresAt` should be persisted at activation as `trialActivatedAt + 7 days`.
- Expiration should also be derivable from `trialActivatedAt` and current time for guard logic, but persisting `trialExpiresAt` makes review, indexing, and future admin filtering clearer.
- Store DateTime values in UTC; localize only at display boundaries.
- A scheduled job is not required in the first schema-only implementation.
- MVP-Beta can begin with manual/system-on-read expiration checks later, but any student/admin UI that exposes trial status must treat `now >= trialExpiresAt` as blocked even if a persisted status has not yet been updated.

## 11. Audit/readiness model
MVP minimum:
- `lastDecisionBy`;
- `lastDecisionAt`;
- `lastDecisionReason`.

`AuditEvent` should be required for future mutation endpoints that change access/trial state, because the repo already has an append-only audit event model. The first schema-only phase does not need to write audit rows if it performs no access mutations.

`StudentAccessEvent` is deferred. It may be useful later for richer access history, but current readiness favors `StudentAccess` as current-state source of truth plus existing `AuditEvent` for mutation traceability.

Owner/admin override or tutoring-direction redirect must capture:
- actor;
- timestamp;
- reason;
- prior state;
- new state;
- continuity explanation when the student is redirected away from the trial tutoring direction.

## 12. Implementation file impact forecast
Likely files for a future schema implementation phase:
- `nextjs_space/prisma/schema.prisma`;
- generated Prisma client step after schema edit, if explicitly authorized;
- possible helper/validation file such as `nextjs_space/lib/student-access.ts` or `nextjs_space/lib/student-access-status.ts`;
- signup default-row logic later, if explicitly authorized;
- `/now` read logic later, if explicitly authorized;
- admin read/write logic later, if explicitly authorized.

Do not edit these files in this phase.

## 13. Verification plan for future implementation
Mandatory checks for a future implementation phase:
- git preflight against the approved baseline;
- schema diff review before migration/client generation;
- build;
- Prisma generate only if explicitly authorized;
- local DB push/migration policy only if explicitly authorized;
- smoke that signup can create the default access row if default-row logic is included;
- smoke that existing students do not receive fake enrollment;
- verify no Program, LearningCycle, or StudyLoad is created;
- verify no Block 7 route/content is opened;
- verify status-pair validation rejects illegal combinations.

## 14. Scope boundaries for the first implementation
May include, if later authorized:
- schema model only;
- generated Prisma client;
- no app behavior change;
- minimal default row only if separately authorized in the implementation phase.

Must exclude:
- admin UI;
- student UI trial states;
- billing provider integration;
- subscription lifecycle automation;
- enrollment automation;
- Program creation;
- LearningCycle creation;
- StudyLoad/content creation;
- Block 7;
- real User/Student FK hardening unless separately scoped.

## 15. Risks and mitigations
- Invalid status pair risk: define a validation helper before any write endpoint exposes state changes.
- Missing backfill risk: require rows for all students and a non-destructive backfill policy in the implementation phase.
- Schema creep: keep provider IDs, Program FKs, enrollment FKs, StudyLoad FKs, and long-form operational notes out of the first model.
- Audit gaps: use last decision fields initially and require `AuditEvent` when mutation endpoints arrive.
- Trial expiry not enforced yet: do not expose trial UI until read/write guards enforce expiration.
- Subscription confusion: keep `subscriptionStatus` as manual/commercial placeholder, not billing truth.
- Continuity target not used yet: store only enough to preserve tutoring direction; do not create work automatically.

## 16. Recommended next phase
`MVP-SALES-TRIAL-2G - Implement minimal StudentAccess schema`

Scope: schema implementation only. Add the minimal `StudentAccess` model and relation to `Student`, run only explicitly authorized schema/client generation steps, and do not add admin UI, student trial UI, billing, enrollment automation, Program/LearningCycle/StudyLoad creation, Block 7, or access mutation endpoints. If Mauricio wants one more approval checkpoint before implementation, the same phase can be renamed to final owner approval, but no unresolved product decision blocks the schema-only cut.

## 17. Final verdict
READY_FOR_MINIMAL_STUDENT_ACCESS_SCHEMA_IMPLEMENTATION
