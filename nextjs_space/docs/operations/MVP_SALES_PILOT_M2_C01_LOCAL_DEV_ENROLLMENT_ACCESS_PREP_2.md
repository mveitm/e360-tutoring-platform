# MVP-SALES-PILOT-M2-C01-LOCAL-DEV-ENROLLMENT-ACCESS-PREP-2

## Purpose

Prepare the safe route for LOCAL_DEV access to PAES_M2 / M2-C01 after `Program PAES_M2` was aligned in LOCAL_DEV.

This phase resumes the prior blocker from `MVP-SALES-PILOT-M2-C01-LOCAL-DEV-ENROLLMENT-ACCESS-PREP-1`, where enrollment/access preparation could not proceed because `Program PAES_M2` was absent.

This phase is preparation, diagnosis and documentation only. It does not mutate DB from Codex, does not execute DB commands from Codex, and does not create StudentAccess, enrollment, StudentProgramInstance, LearningCycle or StudyLoad.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = ac69ed91e2a66d3ad01a487d4bebd49cd7183516
```

## Preflight result

Preflight passed from repository root.

```text
working tree: clean
HEAD: ac69ed91e2a66d3ad01a487d4bebd49cd7183516
origin/main: ac69ed91e2a66d3ad01a487d4bebd49cd7183516
origin/HEAD: ac69ed91e2a66d3ad01a487d4bebd49cd7183516
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_HUMAN_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_CODEX_EXECUTION_REPAIR_2.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_CODEX_EXECUTION_REPAIR_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_ENROLLMENT_ACCESS_PREP_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_HUMAN_UI_SMOKE_ACCESS_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_HUMAN_UI_SMOKE_READINESS_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_STATIC_REVIEW_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_AUTHORED_IMPLEMENT_1.md`

Static files inspected without DB execution:

- `nextjs_space/scripts/local-dev-db-availability-check.ts`
- `nextjs_space/scripts/local-dev-safe-db-tool.ts`
- `nextjs_space/scripts/lib/load-local-env-private.ts`
- `nextjs_space/prisma/schema.prisma`
- `nextjs_space/app/api/instances/route.ts`
- `nextjs_space/app/now/page.tsx`
- `nextjs_space/lib/paes-m1-first-capsule.ts`

## Starting point

```text
Program PAES_M2 is present and active in LOCAL_DEV.
M2-C01 content is implemented and static-review/readiness passed.
Prior UI smoke was blocked because PAES_M2 was NO DISPONIBLE for the current account.
```

Documented Program PAES_M2 state from the previous phase:

```text
present: true
code: PAES_M2
name: PAES Matemática M2
vertical: PAES
status: active
```

## Prior blocker resolved

The previous enrollment prep blocker was missing `Program PAES_M2`. That blocker is now resolved by `MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-HUMAN-ALIGNMENT-1`.

The previous Program alignment was explicitly scoped:

```text
mutationScope: Program PAES_M2 only
enrollmentMutated: false
studentAccessMutated: false
studentProgramInstanceMutated: false
learningCycleMutated: false
studyLoadMutated: false
```

## Codex DB execution limitation

Codex still cannot safely execute DB checks or mutations against the remote-or-nonlocal DB target from its execution context.

Governing diagnosis:

```text
MVP-GOV-LOCAL-DEV-SAFE-DB-CODEX-EXECUTION-REPAIR-1
Result: CODEX_NETWORK_CONTEXT_BLOCKED
```

Governing protocol:

```text
MVP-GOV-LOCAL-DEV-SAFE-DB-CODEX-EXECUTION-REPAIR-2
Result: CODEX_EXECUTION_REPAIR_HUMAN_LOCAL_PROTOCOL_ACCEPTED
```

Therefore, any future DB operation must be human-local, secret-safe, and backed by explicit tooling and explicit authorization.

## Static tooling inspection

Static inspection found:

- `local-dev-db-availability-check.ts` supports `check`, `program-check`, and `program-align-readiness`.
- `local-dev-safe-db-tool.ts` supports Program-focused modes only: `confirm-local-dev`, `program-check`, `program-align-readiness`, `check-programs`, `plan-paes-m2-program`, and `align-paes-m2-program`.
- The current safe DB tooling does not expose a mode for M2 enrollment/access read-only checks.
- The current safe DB tooling does not expose a guarded mutation mode for M2 StudentProgramInstance creation.
- The current safe DB tooling does not expose a guarded mutation mode for StudentAccess, LearningCycle or StudyLoad preparation for M2-C01.
- Existing `student-access-backfill-*` scripts are StudentAccess lifecycle/backfill utilities, not M2-C01 enrollment/access preparation tooling.

Conclusion:

```text
No safe, explicit enrollment/access command exists in current tooling for M2-C01 access preparation.
```

## M2 access target model

Static route/model findings:

- `StudentProgramInstance` is the runtime enrollment model.
- `/now` selects the latest active `StudentProgramInstance` for the current student, ordered by `startedAt desc`.
- The dashboard still has PAES_M2 as a non-active static tutoring card in the inspected UI.
- `/now/study-loads/[id]` requires ownership through a StudyLoad's LearningCycle enrollment.
- The generic admin `POST /api/instances` creates a StudentProgramInstance.
- The generic admin instance path auto-creates first cycle and first StudyLoad only for `PAES_M1`.
- For non-M1 programs, including `PAES_M2`, the generic instance path creates enrollment only and does not automatically create M2-C01 LearningCycle or StudyLoad.

Implication:

```text
Creating only a PAES_M2 StudentProgramInstance may make the latest active enrollment M2, but it does not by itself guarantee a reachable M2-C01 StudyLoad.
```

## Target account / student resolution

The target account/current student was not resolved in this phase because Codex did not execute DB reads and no new human-local read-only evidence for the target student was provided.

Required future sanitized precheck:

```text
target student resolved: yes/no
target student email printed: no, unless explicitly non-sensitive and authorized
PAES_M2 Program row: present
existing PAES_M2 StudentProgramInstance: present/absent
existing StudentAccess row: present/absent
existing M2 LearningCycle: present/absent
existing M2-C01 StudyLoad: present/absent
DB mutation: no
secrets printed: no
```

## Required objects for M2 access

Minimum likely objects for a smokeable M2-C01 path:

1. `Program PAES_M2`: already present.
2. Target `Student`: must be resolved for the current account.
3. Active PAES_M2 `StudentProgramInstance`: likely required for `/now` to select M2.
4. M2 `LearningCycle`: required if the smoke path must open a StudyLoad route.
5. M2-C01 `StudyLoad`: required for `/now/study-loads/[id]` ownership and content smoke.

`StudentAccess` is a separate lifecycle/containment model. Static code reviewed in prior phases indicates `/now` and StudyLoad ownership depend directly on `StudentProgramInstance` / `LearningCycle` / `StudyLoad`, not StudentAccess as the immediate runtime selector. A future phase should still observe StudentAccess state as access governance evidence.

Scope gate:

```text
This phase does not authorize LearningCycle or StudyLoad creation.
```

If the next access phase requires M2-C01 StudyLoad creation for smoke, that must be explicitly authorized and supported by safe tooling.

## Authorization status

The prior Program PAES_M2 authorization does not automatically authorize enrollment/access mutation.

A future human-local mutation phase requires explicit human authorization for enrollment/access scope.

Current authorization status:

```text
Enrollment/access mutation authorization: absent
LearningCycle mutation authorization: absent
StudyLoad mutation authorization: absent
StudentAccess mutation authorization: absent
```

## Human-local secret-safe enrollment/access protocol

Protocol for a future phase after safe tooling exists and explicit authorization is provided:

1. Human executes from:

```text
C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space
```

2. Human uses only safe DB tooling.
3. Human does not paste or print `.env`.
4. Human does not paste or print `DATABASE_URL`.
5. Human does not paste or print DB URL, DB host or connection string.
6. Human does not run direct SQL.
7. Human does not run migrate, db push, DB reset or seed reset.
8. Human runs read-only precheck first.
9. Human runs mutation only if explicitly authorized for exact scope.
10. Human runs read-only postcheck.
11. Human returns only sanitized evidence.

## Allowed future human commands

No exact enrollment/access mutation command is allowed yet.

Reason:

```text
Current safe DB tooling has no explicit M2 enrollment/access mode.
```

Allowed future command classes after tooling extension:

- read-only M2 access precheck;
- read-only target student/access/enrollment/cycle/load inspection;
- explicitly authorized M2 access/enrollment mutation with guarded flags;
- read-only postcheck.

The next tooling phase must define exact commands before any human-local enrollment/access mutation.

## Prohibited commands

- Do not print `.env`.
- Do not print `DATABASE_URL`.
- Do not print DB URL, DB host or connection strings.
- Do not print tokens, cookies, secrets, private keys or credentials.
- Do not run direct SQL manually.
- Do not run `prisma migrate`.
- Do not run `prisma db push`.
- Do not reset DB.
- Do not run seed reset.
- Do not use the generic admin API as an improvised substitute for safe tooling.
- Do not create StudentAccess without explicit scope.
- Do not create enrollment without explicit scope.
- Do not create StudentProgramInstance without explicit scope.
- Do not create LearningCycle without explicit scope.
- Do not create StudyLoad without explicit scope.
- Do not touch prod/staging.

## Sanitized evidence required

Future read-only precheck evidence:

```text
status: safe M2 access precheck completed
target student resolved: yes/no
PAES_M2 Program row: present
PAES_M2 StudentProgramInstance: present/absent
StudentAccess row: present/absent
M2 LearningCycle: present/absent
M2-C01 StudyLoad: present/absent
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

Future mutation evidence, if separately authorized:

```text
status: safe M2 enrollment/access mutation completed
mutationScope: explicitly listed
studentAccessMutated: true/false
enrollmentMutated: true/false
studentProgramInstanceMutated: true/false
learningCycleMutated: true/false
studyLoadMutated: true/false
databaseUrlValuePrinted: false
secretValuesPrinted: false
```

Future postcheck evidence:

```text
status: safe M2 access postcheck completed
PAES_M2 Program row: present
PAES_M2 StudentProgramInstance: present/absent
M2-C01 StudyLoad reachable candidate: present/absent
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

## Explicit non-actions

- No Codex DB mutation.
- No human DB mutation in this phase.
- No StudentAccess mutation.
- No enrollment creation.
- No StudentProgramInstance creation.
- No LearningCycle creation.
- No StudyLoad creation.
- No schema/Prisma changes.
- No migration.
- No prisma db push.
- No DB reset.
- No seed reset.
- No M2-C01 content/authoredFeedback changes.
- No registry/content changes.
- No UI/API functional changes.
- No tooling changes.
- No package changes.
- No prod/staging.
- No payment/subscription changes.
- No agentic layer opened.
- No secrets printed.

## Scope safety

This phase is documentation-only with static code/tooling inspection. It does not execute DB checks, does not execute DB mutations, and does not modify tooling.

Because no safe enrollment/access-specific tooling exists, the next phase must be a safe DB tooling extension before any M2 enrollment/access mutation can be authorized or executed.

## Result

```text
STOP_SAFE_TOOLING_EXTENSION_REQUIRED
```

## Next recommended phase

```text
MVP-GOV-LOCAL-DEV-SAFE-DB-ENROLLMENT-ACCESS-TOOLING-1
```
