# MVP-SALES-TRIAL-2S - StudentAccess Validation Helper Implementation Readiness

## 1. Phase gate classification
- Roadmap block: 2 - Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2R closed at `e1866c7`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: documentation/readiness only for a future pure TypeScript `StudentAccess` validation helper implementation.
- Explicit non-goals: no app code, no TypeScript helper implementation, no test implementation, no schema edit, no package change, no npm install, no Prisma CLI, no DB mutation, no SQL, no seed, no runtime, no UI/admin, no default-row signup behavior, no backfill, no `/now` read, no mutation endpoints, no `AuditEvent` writes, no billing/payment/subscription integration, no Program/LearningCycle/StudyLoad, no Block 7, no deploy, no `.env` access, no secrets printed, no generated PDF/DOCX artifacts, no commit, and no push.

## 2. Git preflight result
- `git status --short`: clean at phase start.
- HEAD / origin/main: `e1866c7` / `e1866c7`.
- Baseline verdict: matches expected `HEAD = origin/main = e1866c7`; working tree was clean before this documentation/readiness phase.
- Git preflight is the live truth. If any document or memory contradicts Git, Git wins.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2R_STUDENT_ACCESS_VALIDATION_HELPER_DESIGN.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2Q_STUDENT_ACCESS_DB_APPLICATION_VERIFICATION_CLOSEOUT.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2G_IMPLEMENT_MINIMAL_STUDENT_ACCESS_SCHEMA.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2F_TRIAL_ACCESS_SCHEMA_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md` tail relevant to TRIAL-2O through TRIAL-2R.

Read-only inspected:
- `nextjs_space/prisma/schema.prisma`
- `nextjs_space/package.json`
- existing `nextjs_space/lib` folder structure
- read-only search for test tooling/conventions:
  - `rg -n "vitest|jest|node:test|describe\\(|it\\(|test\\(" nextjs_space/package.json nextjs_space/app nextjs_space/lib nextjs_space/scripts nextjs_space/prisma`

## 4. Why this is implementation readiness, not implementation
TRIAL-2R defined the validation helper policy contract. TRIAL-2S only decides whether a future implementation cut can safely implement that contract without widening into runtime behavior.

This phase is not implementation because it does not create helper files, test files, package scripts, runtime imports, DB calls, mutation paths, or UI behavior. It only fixes the future file targets, contract shape, test approach, stop rules, and acceptance criteria.

## 5. Proposed future helper file path
Recommended future helper file:
- `nextjs_space/lib/student-access-validation.ts`

Reason:
- `nextjs_space/lib` already contains shared server-side utilities.
- A dedicated validation file keeps the policy isolated from `lib/prisma.ts`, `lib/db.ts`, app routes, admin UI, and runtime callers.
- The name is explicit enough to avoid mixing validation with persistence or row lifecycle behavior.

## 6. Proposed future test file path
Recommended future test/readiness file:
- `nextjs_space/lib/student-access-validation.test.ts`

Until a formal unit test runner is introduced, the safest future path is a self-contained TypeScript assertion file that can be executed directly with existing `tsx`, for example:

```powershell
npx.cmd tsx lib/student-access-validation.test.ts
```

This is a future recommendation only. TRIAL-2S does not create the file and does not run the command.

## 7. Pure and DB-free requirement
The helper should be pure, deterministic, and DB-free.

Required properties:
- no database access;
- no Prisma client access;
- no environment access;
- no network access;
- no process mutation;
- no current-time reads through `new Date()` inside validation logic;
- no app route, React, Next.js, auth, admin, billing, enrollment, Program, LearningCycle, or StudyLoad dependency.

The helper should accept all needed inputs explicitly, including the deterministic clock value.

## 8. Prisma imports
Prisma imports should be prohibited in the helper and in the unit-style validation test.

Prohibited imports:
- `@prisma/client`
- `nextjs_space/lib/prisma`
- `nextjs_space/lib/db`
- generated Prisma client types

Reason:
- The schema intentionally stores status values as strings.
- The helper is product policy validation, not persistence.
- Importing Prisma risks DB coupling, generated-client drift, and accidental runtime behavior.

The helper may define its own narrow input type matching the current `StudentAccess` fields needed for validation.

## 9. Proposed TypeScript contract
Future 2T should implement a narrow TypeScript contract in `student-access-validation.ts`.

Status constants or string literal unions:

```ts
export const STUDENT_ACCESS_STATUSES = [
  "no_access",
  "review_pending",
  "trial_invited",
  "trial_active",
  "trial_expired_blocked",
  "subscription_pending",
  "subscribed_access_active",
  "enrollment_setup_pending",
  "enrolled_active_program",
] as const

export type StudentAccessStatus = typeof STUDENT_ACCESS_STATUSES[number]

export const STUDENT_TRIAL_STATUSES = [
  "none",
  "invited",
  "active",
  "experience_available",
  "experience_used",
  "expired",
  "cancelled",
] as const

export type StudentTrialStatus = typeof STUDENT_TRIAL_STATUSES[number]
```

Legal pair map:

```ts
export const LEGAL_STUDENT_ACCESS_PAIRS = {
  no_access: ["none"],
  review_pending: ["none"],
  trial_invited: ["invited"],
  trial_active: ["active", "experience_available", "experience_used"],
  trial_expired_blocked: ["expired"],
  subscription_pending: ["none", "expired", "experience_used"],
  subscribed_access_active: ["none", "expired", "experience_used"],
  enrollment_setup_pending: ["none", "expired", "experience_used"],
  enrolled_active_program: ["none"],
} as const
```

Snapshot validation function:

```ts
export function validateStudentAccessSnapshot(
  snapshot: StudentAccessValidationInput,
  options: StudentAccessValidationOptions
): StudentAccessValidationResult
```

Transition validation function:

```ts
export function validateStudentAccessTransition(
  current: StudentAccessValidationInput,
  next: StudentAccessValidationInput,
  context: StudentAccessTransitionContext
): StudentAccessValidationResult
```

Deterministic clock input:

```ts
export type StudentAccessValidationOptions = {
  now: Date
}
```

Validation input shape:

```ts
export type StudentAccessValidationInput = {
  accessStatus: string
  trialStatus: string
  subscriptionStatus?: string | null
  trialInvitedAt?: Date | string | null
  trialActivatedAt?: Date | string | null
  trialExpiresAt?: Date | string | null
  trialExperienceUsedAt?: Date | string | null
  tutoringDirection?: string | null
  continuityTarget?: string | null
  lastDecisionBy?: string | null
  lastDecisionAt?: Date | string | null
  lastDecisionReason?: string | null
}
```

Validation result shape:

```ts
export type StudentAccessValidationResult = {
  ok: boolean
  errors: StudentAccessValidationIssue[]
  warnings: StudentAccessValidationIssue[]
}
```

Error/warning categories:

```ts
export type StudentAccessValidationIssueCategory =
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
```

Transition context:

```ts
export type StudentAccessTransitionContext = StudentAccessValidationOptions & {
  actorType?: "system" | "owner_admin"
  actorId?: string
  reason?: string
  transitionKind?: "create" | "admin_decision" | "system_expiration" | "correction"
}
```

This is a readiness contract, not implementation code.

## 10. Exact implementation boundaries for future 2T
Future 2T may include only:
- `nextjs_space/lib/student-access-validation.ts`
- `nextjs_space/lib/student-access-validation.test.ts`
- pure constants, types, pair map, snapshot validation, transition validation, and deterministic test cases;
- optional documentation update and PHASE_LOG update;
- optional execution of a DB-free TypeScript assertion test through existing `tsx`;
- no package installation and no package script change unless a separate readiness phase authorizes test harness changes.

Future 2T should not import the helper from any runtime route or app file.

## 11. Exact non-goals for 2T
Future 2T must not include:
- app route changes;
- signup default-row behavior;
- backfill;
- Prisma imports;
- Prisma CLI;
- DB reads or writes;
- SQL;
- seed;
- schema edits;
- package changes;
- npm install;
- `/now` reads;
- admin UI/read/mutation behavior;
- mutation endpoints;
- `AuditEvent` writes;
- billing/payment/subscription integration;
- enrollment, Program, LearningCycle, StudyLoad, PAES path, content route, or Block 7 behavior;
- runtime enforcement;
- deploy.

## 12. Test strategy for future 2T
Future tests should cover:
- legal `accessStatus` values;
- legal `trialStatus` values;
- all legal pair map entries;
- prohibited pairs, including unknown statuses and `cancelled` in persisted first-cut pairs;
- required/null fields by pair;
- timestamp ordering;
- deterministic `now >= trialExpiresAt` behavior;
- `subscriptionStatus` first-cut limit to `none` unless later policy expands it;
- transition preconditions, including invite, activate, experience available, experience used, expire, subscription pending, subscribed active, enrollment setup, and enrolled active program;
- missing actor/reason for transition contexts that require decision context;
- no DB access and no Prisma imports.

The test file should use only local imports from the helper and Node built-ins such as `node:assert/strict`.

## 13. Current test tooling finding
Findings:
- `nextjs_space/package.json` has no `test` script.
- No `vitest` dependency was found.
- No `jest` dependency was found.
- No `node:test` convention was found in app/lib/package files.
- The read-only search found probe-style scripts and incidental `.test(...)` regex/function usage, not a formal unit test framework.
- `tsx` is already available as a dev dependency and is used by existing script/probe patterns.

Recommendation:
- Do not install packages in TRIAL-2S.
- Do not change `package.json` in TRIAL-2S.
- For future 2T, use a self-contained TypeScript assertion file runnable with existing `tsx`, unless Mauricio first wants a dedicated test-harness readiness phase.
- If future 2T cannot run a DB-free assertion file through existing tooling, stop and use `MVP-SALES-TRIAL-2T-TEST-HARNESS-READINESS` or equivalent before helper implementation.

Because `tsx` already exists and the helper can be pure/DB-free, 2S does not need to block helper implementation on a package install.

## 14. Future implementation acceptance criteria
Future 2T is acceptable only if:
- helper is pure and deterministic;
- helper has no Prisma, DB, app route, auth, UI, billing, enrollment, Program, LearningCycle, StudyLoad, or Block 7 imports;
- status constants and literal unions exist;
- legal pair map matches TRIAL-2R;
- snapshot validation returns structured errors/warnings;
- transition validation requires deterministic `now` and decision context where required;
- test file covers legal statuses, legal pairs, prohibited pairs, fields, timestamps, expiration, subscription limits, transitions, missing actor/reason, and no DB access;
- tests run without DB, `.env`, Prisma CLI, package install, or build;
- no runtime caller imports the helper yet.

## 15. Risks and stop rules
Risks:
- scope drift into signup default-row, backfill, admin mutation, `/now`, or runtime enforcement;
- accidental Prisma import;
- accidental dependence on current wall-clock time;
- undefined subscription status expansion;
- test harness churn through package changes before the helper exists;
- treating validation as authorization or persistence.

Stop rules for future 2T:
- stop if implementation needs Prisma or DB access;
- stop if a package install or package script change is required;
- stop if tests cannot run without `.env` or DB;
- stop if helper must be imported into app/runtime files;
- stop if default-row, backfill, admin mutation, `/now`, billing, enrollment, or runtime enforcement becomes necessary to complete the phase;
- stop if the legal pair policy diverges from TRIAL-2R without a new design decision.

## 16. Recommended next phase
Recommended next phase:
- `MVP-SALES-TRIAL-2T - Implement pure StudentAccess validation helper`

Roadmap block:
- 2 - Trial and access control.

Sales-ready relevance:
- direct/high.

Dependency:
- TRIAL-2S accepted.

What it advances:
- creates the pure, deterministic validation boundary needed before any future StudentAccess write/default-row/backfill/admin mutation/runtime enforcement.

What it does not advance:
- no runtime integration, no DB mutation, no default-row, no backfill, no admin UI, no `/now`, no billing, no enrollment, no Program/LearningCycle/StudyLoad, and no Block 7.

Priority verdict:
- APPROVED_NEXT_PHASE, only if future 2T stays pure, deterministic, DB-free, and isolated.

Authorization status:
- recommended after human review accepts this readiness document.

## 17. Final verdict
READY_FOR_PURE_STUDENT_ACCESS_VALIDATION_HELPER_IMPLEMENTATION
