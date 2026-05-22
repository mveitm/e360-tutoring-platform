# MVP-SALES-TRIAL-2R - StudentAccess Validation Helper Design

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2Q closed at `2d269cc`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: documentation/design only for the future `StudentAccess` validation helper contract.
- Explicit non-goals: no app code, no TypeScript helper implementation, no schema edit, no package change, no Prisma CLI, no DB mutation, no SQL, no seed, no runtime, no UI/admin, no default-row signup behavior, no backfill, no `/now` read, no mutation endpoints, no `AuditEvent` writes, no billing/payment/subscription integration, no Program/LearningCycle/StudyLoad, no Block 7, no deploy, no `.env` access, no secrets printed, no generated PDF/DOCX artifacts, no commit, and no push.

## 2. Git preflight
- git status: clean at phase start.
- HEAD / origin/main: `2d269cc` / `2d269cc`.
- Baseline verdict: matches expected `HEAD = origin/main = 2d269cc`; working tree was clean before this documentation/design phase.
- Git preflight is the live truth. If any document, memory, or historical handoff contradicts Git, Git wins.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Q_STUDENT_ACCESS_DB_APPLICATION_VERIFICATION_CLOSEOUT.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2P_HUMAN_EXECUTED_CONTROLLED_LOCAL_DEV_STUDENT_ACCESS_DB_APPLICATION.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2G_IMPLEMENT_MINIMAL_STUDENT_ACCESS_SCHEMA.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2F_TRIAL_ACCESS_SCHEMA_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2C_TRIAL_ACCESS_STATE_MODEL_FROM_CANONICAL_STAGES.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2B_CANONICAL_STUDENT_TRIAL_EXPERIENCE_STAGES.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2A_TRIAL_AND_ACCESS_CONTROL_BOUNDARY.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md` tail relevant to MVP-SALES-TRIAL-2A through 2Q.

Read-only schema signal reviewed:
- `nextjs_space/prisma/schema.prisma` for the current `StudentAccess` fields and indexes.

Historical phase baselines remain historical only. The accepted live baseline for this phase is `2d269cc`.

## 4. Why validation helper comes before writes
The `StudentAccess` table now exists in the local/dev DB and Prisma Client has been generated, but the product still has no authorized row creation, backfill, admin mutation, signup default-row behavior, `/now` read integration, or runtime enforcement.

That gap is intentional. A validation helper should come before any write because:
- `accessStatus` and `trialStatus` are strings, not database enums, by design.
- The legal combinations are product policy, not only schema shape.
- Invalid status pairs would become persisted product state if write paths arrive first.
- Signup defaults, admin mutations, backfill, runtime expiration, and future subscription handoff all need one shared source of validation truth.
- Audit requirements depend on knowing whether a proposed state change is legal, invalid, blocked, expired, or missing required decision metadata.

This phase therefore defines the future helper contract without implementing it.

## 5. Proposed helper responsibility
The future helper should be a pure validation and normalization boundary for `StudentAccess` state. It should accept a proposed current-state snapshot and return whether the state or transition is allowed.

Responsibilities:
- define legal `accessStatus` values;
- define legal `trialStatus` values;
- validate legal `accessStatus + trialStatus` pairs;
- reject prohibited pairs;
- validate required/null fields for each legal pair;
- validate timestamp relationships;
- validate `subscriptionStatus` handling as a manual/commercial placeholder;
- validate transition preconditions from one state pair to another;
- return structured error categories suitable for UI, API, tests, and audit planning;
- avoid side effects and avoid database access in the core validator;
- provide deterministic behavior independent of runtime routes, admin UI, billing, or enrollment logic.

The helper should be designed so every future mutation path calls it before persistence.

## 6. Explicit non-responsibilities
The helper must not:
- create `StudentAccess` rows;
- mutate the database;
- run Prisma commands;
- inspect `.env` or secrets;
- write `AuditEvent`;
- decide who is authenticated or authorized;
- read from `/now`;
- render student UI or admin UI;
- create signup default rows;
- backfill existing students;
- integrate billing or payment providers;
- create or update subscription provider records;
- create enrollment, Program, LearningCycle, StudyLoad, PAES path, content routes, or Block 7 access;
- automatically expire rows through a scheduled job;
- perform time-zone display formatting;
- invent trial tutoring content;
- override owner/admin policy decisions without an explicit transition request.

## 7. Legal accessStatus values
Legal `accessStatus` values:
- `no_access`
- `review_pending`
- `trial_invited`
- `trial_active`
- `trial_expired_blocked`
- `subscription_pending`
- `subscribed_access_active`
- `enrollment_setup_pending`
- `enrolled_active_program`

No additional value should be accepted by the first helper contract.

## 8. Legal trialStatus values
Legal `trialStatus` values:
- `none`
- `invited`
- `active`
- `experience_available`
- `experience_used`
- `expired`
- `cancelled`

`cancelled` remains a legal conceptual value but should not be allowed in persisted first-cut pairs until a cancellation operation, reason policy, and audit behavior are separately designed.

## 9. Legal accessStatus + trialStatus pair matrix
| accessStatus | legal trialStatus | meaning |
| --- | --- | --- |
| `no_access` | `none` | Account exists, no trial/subscription/enrollment access. |
| `review_pending` | `none` | Owner/admin review or access preparation is pending. |
| `trial_invited` | `invited` | Trial is offered/prepared but the 7-day timer has not started. |
| `trial_active` | `active` | Trial timer is running; the one experience is not yet separately marked available or used. |
| `trial_active` | `experience_available` | Trial timer is running and the one introductory experience is available. |
| `trial_active` | `experience_used` | Trial timer is running and the one experience has been used. |
| `trial_expired_blocked` | `expired` | Trial window ended and tutoring access is blocked. |
| `subscription_pending` | `none` | Manual/commercial subscription path is pending without trial history. |
| `subscription_pending` | `expired` | Subscription path is pending after expired trial. |
| `subscription_pending` | `experience_used` | Subscription path is pending after the trial experience was used. |
| `subscribed_access_active` | `none` | Commercial access is active without trial continuity context. |
| `subscribed_access_active` | `expired` | Commercial access is active after an expired trial. |
| `subscribed_access_active` | `experience_used` | Commercial access is active after a used trial experience. |
| `enrollment_setup_pending` | `none` | Access is ready and program/enrollment setup is pending without trial continuity context. |
| `enrollment_setup_pending` | `expired` | Program/enrollment setup is pending after an expired trial path. |
| `enrollment_setup_pending` | `experience_used` | Program/enrollment setup is pending after a used trial experience. |
| `enrolled_active_program` | `none` | Real enrollment/program state is now the learning-work source of truth. |

## 10. Prohibited pairs
The helper should reject:
- unknown `accessStatus`;
- unknown `trialStatus`;
- `no_access` with any `trialStatus` except `none`;
- `review_pending` with any `trialStatus` except `none`;
- `trial_invited` with any `trialStatus` except `invited`;
- `trial_active` with `none`, `invited`, `expired`, or `cancelled`;
- `trial_expired_blocked` with any `trialStatus` except `expired`;
- `subscription_pending` with `invited`, `active`, `experience_available`, or `cancelled`;
- `subscribed_access_active` with `invited`, `active`, `experience_available`, or `cancelled`;
- `enrollment_setup_pending` with `invited`, `active`, `experience_available`, or `cancelled`;
- `enrolled_active_program` with any `trialStatus` except `none` in the first-cut contract;
- any pair that implies Program, LearningCycle, StudyLoad, billing provider, content route, or Block 7 work exists.

## 11. Field invariants by status pair
For `no_access + none`:
- trial timestamps must be null;
- `subscriptionStatus` should be `none`;
- `tutoringDirection` and `continuityTarget` should be null unless a later review phase authorizes pre-trial notes;
- last-decision fields are allowed and should be present when a row was intentionally created or changed.

For `review_pending + none`:
- trial timestamps must be null;
- `subscriptionStatus` should be `none`;
- `tutoringDirection` may be null or present only as a pending owner/admin decision;
- last-decision fields should explain the review decision.

For `trial_invited + invited`:
- `trialInvitedAt` is required;
- `trialActivatedAt`, `trialExpiresAt`, and `trialExperienceUsedAt` must be null;
- `tutoringDirection` should be present or a decision reason should explain why direction is pending;
- `subscriptionStatus` should remain `none`.

For `trial_active + active`:
- `trialInvitedAt` should exist unless an explicitly audited admin correction explains the missing invitation;
- `trialActivatedAt` is required;
- `trialExpiresAt` is required;
- `trialExperienceUsedAt` must be null;
- `trialExpiresAt` must be after `trialActivatedAt`;
- `subscriptionStatus` should remain `none`.

For `trial_active + experience_available`:
- active trial timestamp requirements apply;
- `trialExperienceUsedAt` must be null;
- `tutoringDirection` should be present;
- no Program, LearningCycle, StudyLoad, or content route should be implied by this pair.

For `trial_active + experience_used`:
- active trial timestamp requirements apply;
- `trialExperienceUsedAt` is required;
- `trialExperienceUsedAt` should be on or after `trialActivatedAt` and before or at `trialExpiresAt`, unless an audited correction policy later permits exceptions;
- no second trial experience should be implied.

For `trial_expired_blocked + expired`:
- `trialActivatedAt` and `trialExpiresAt` are required;
- `trialExpiresAt` must be after `trialActivatedAt`;
- current validation with a supplied clock should treat `now >= trialExpiresAt` as required for normal expiration;
- no active tutoring work should be implied.

For subscription and enrollment handoff pairs:
- trial timestamps should preserve historical trial context when `trialStatus` is `expired` or `experience_used`;
- no trial timestamps are required when `trialStatus` is `none`;
- `subscriptionStatus` may be a manual/commercial placeholder but must not be treated as billing truth;
- `continuityTarget` may be present when owner/admin has selected the continuation direction;
- no Program, LearningCycle, StudyLoad, or enrollment record should be inferred from the `StudentAccess` row alone.

For `enrolled_active_program + none`:
- trial status should normalize to `none`;
- StudentAccess should no longer drive learning work;
- actual active learning work must come from later authorized enrollment/program state.

## 12. Timestamp invariants
The helper should validate:
- DateTime values are treated as UTC at storage/logic boundaries.
- `trialInvitedAt` must not be after `trialActivatedAt` when both exist.
- `trialActivatedAt` is required for active, experience-used, and expired trial states.
- `trialExpiresAt` is required for active and expired trial states.
- `trialExpiresAt` must be greater than `trialActivatedAt`.
- The intended normal duration is 7 days from activation.
- `trialExperienceUsedAt` must not exist before activation.
- `trialExperienceUsedAt` must not exist for invited, no-access, review-pending, or active-but-unused pairs.
- Expiration checks should accept an explicit `now` input so tests and future runtime guards are deterministic.
- A persisted status that says active while `now >= trialExpiresAt` should be returned as an expiration validation issue for future callers to handle before allowing tutoring access.

## 13. SubscriptionStatus handling
Current legal `subscriptionStatus` treatment:
- Existing schema default is `none`.
- The helper should accept `none` as the only guaranteed first-cut value unless a later phase defines a wider subscription status vocabulary.
- `subscriptionStatus` is not billing truth.
- It must not imply payment provider confirmation.
- It must not create enrollment or learning work.
- It may later support manual/commercial placeholders, but those values need a separate policy before implementation.

Recommended first helper behavior:
- require `subscriptionStatus = none` for trial and no-access states;
- allow future subscription states only behind an explicit allowlist when TRIAL/payment policy defines them;
- never derive `accessStatus` solely from `subscriptionStatus`.

## 14. Transition validation principles
The helper should support both snapshot validation and transition validation.

Transition principles:
- Validate the current pair before validating the proposed pair.
- Validate the proposed pair and field invariants before persistence.
- Require an actor and reason for owner/admin or system decisions.
- Treat signup default-row creation, backfill, admin mutation, runtime expiration, and subscription handoff as separate caller contexts.
- Do not allow signup to create trial-active, subscription, enrollment, or work states.
- Do not allow trial invitation to start the 7-day timer.
- Trial activation must be explicit.
- Trial expiration must block tutoring access but preserve account access.
- Subscription unlocks commercial access only; it does not create enrollment or work.
- Enrollment/program active state must be proven by later enrollment/program authority, not invented by StudentAccess.
- Any override or correction must preserve prior/new state for audit readiness.

## 15. Error categories / return shape for the future helper
The future helper should return structured data rather than throwing for expected validation failures.

Recommended conceptual return shape:

```ts
type StudentAccessValidationResult = {
  ok: boolean
  normalized?: StudentAccessValidationInput
  errors: StudentAccessValidationError[]
  warnings: StudentAccessValidationWarning[]
}

type StudentAccessValidationError = {
  code: string
  category:
    | "UNKNOWN_STATUS"
    | "ILLEGAL_PAIR"
    | "MISSING_REQUIRED_FIELD"
    | "PROHIBITED_FIELD"
    | "INVALID_TIMESTAMP"
    | "EXPIRED_STATE"
    | "INVALID_TRANSITION"
    | "MISSING_DECISION_CONTEXT"
    | "SUBSCRIPTION_POLICY_UNDEFINED"
    | "SCOPE_VIOLATION"
  field?: string
  message: string
}
```

This is a contract sketch only, not implementation. The future TypeScript phase may adjust names to match local project conventions.

## 16. Audit readiness requirements
The helper should make future audit behavior easy by requiring or surfacing:
- actor type: `system`, `owner_admin`, or later provider/system actor;
- actor identifier when available and safe to store;
- decision reason for every mutation;
- previous `accessStatus` and `trialStatus`;
- proposed `accessStatus` and `trialStatus`;
- timestamp of decision;
- whether the transition is normal, correction, expiration, or override;
- continuity explanation when tutoring direction changes after trial;
- validation result and errors before persistence.

The helper should not write `AuditEvent`. Future mutation endpoints should call the helper, persist only on `ok: true`, and then write `AuditEvent` in the same authorized mutation phase.

## 17. Future implementation file forecast
Likely future implementation files:
- `nextjs_space/lib/student-access.ts`
- `nextjs_space/lib/student-access-status.ts`
- `nextjs_space/lib/student-access-validation.ts`
- `nextjs_space/lib/student-access-validation.test.ts`

Possible later caller files, not for the helper implementation phase unless separately authorized:
- `nextjs_space/app/api/signup/route.ts`
- `/now` read path files
- admin student detail/read files
- future admin mutation endpoint files
- future audit-event helper/caller files

No file forecast authorizes implementation in this 2R phase.

## 18. Future test/readiness plan
A future implementation readiness or implementation phase should include tests for:
- all legal `accessStatus` values;
- all legal `trialStatus` values;
- all legal pair matrix rows;
- every prohibited pair category;
- required/null field invariants by pair;
- trial timestamp ordering;
- deterministic `now >= trialExpiresAt` expiration behavior;
- subscriptionStatus first-cut constraints;
- allowed transitions;
- rejected transitions;
- missing actor/reason decision context;
- no Program/LearningCycle/StudyLoad/Block 7 implication;
- no DB access from the pure helper.

Readiness checks before implementation:
- confirm helper file location;
- confirm test runner available in the repo;
- confirm whether tests are unit-only and do not require DB;
- confirm no schema/package changes are needed.

## 19. Explicit deferrals
Deferred:
- TypeScript helper implementation;
- schema changes;
- Prisma Client generation;
- Prisma CLI;
- DB mutation;
- SQL;
- seed;
- row creation;
- signup default-row behavior;
- backfill;
- runtime expiration;
- `/now` reads;
- admin reads;
- admin mutation endpoints;
- `AuditEvent` writes;
- billing/payment/subscription integration;
- Program/LearningCycle/StudyLoad;
- enrollment automation;
- Block 7;
- deploy.

## 20. Recommended next phase
Recommended next phase:
- `MVP-SALES-TRIAL-2S - StudentAccess validation helper implementation readiness`

Roadmap block:
- 2 - Trial and access control.

Sales-ready relevance:
- direct/high.

Dependency:
- TRIAL-2R accepted.

What it advances:
- prepares a narrow, testable implementation plan for a pure validation helper before any write/default-row/backfill/admin mutation/runtime enforcement.

What it does not advance:
- no student UI, admin UI, DB mutation, row creation, billing, enrollment, Program/LearningCycle/StudyLoad, or Block 7 behavior.

Priority verdict:
- APPROVED_NEXT_PHASE.

Authorization status:
- recommended only after human review accepts this design.

## 21. Final verdict
STUDENT_ACCESS_VALIDATION_HELPER_DESIGN_READY
