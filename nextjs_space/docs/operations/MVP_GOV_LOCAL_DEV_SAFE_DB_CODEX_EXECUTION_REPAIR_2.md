# MVP-GOV-LOCAL-DEV-SAFE-DB-CODEX-EXECUTION-REPAIR-2

## Purpose

Resolve the safe execution route after the prior diagnosis classified the Codex execution context as unable to reach the remote-or-nonlocal DB endpoint used by the local/dev safe DB tooling.

This phase does not mutate DB and does not create or align `Program PAES_M2`.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = fa83a9446f7102328f474e46b8b56f04f318dbd7
```

## Preflight result

Preflight passed from repository root.

```text
working tree: clean
HEAD: fa83a9446f7102328f474e46b8b56f04f318dbd7
origin/main: fa83a9446f7102328f474e46b8b56f04f318dbd7
origin/HEAD: fa83a9446f7102328f474e46b8b56f04f318dbd7
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_CODEX_EXECUTION_REPAIR_1.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_CODEX_CWD_EXECUTION_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_PAES_M2_PROGRAM_DATA_ALIGNMENT_1E.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_DB_SERVICE_HUMAN_RECOVERY_3.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_TOOLING_1.md`

Tooling read:

- `nextjs_space/scripts/local-dev-db-availability-check.ts`
- `nextjs_space/scripts/local-dev-safe-db-tool.ts`
- `nextjs_space/scripts/lib/load-local-env-private.ts`

## Prior diagnosis

```text
CODEX_NETWORK_CONTEXT_BLOCKED
```

The prior phase established:

```text
Codex cwd: nextjs_space
Codex env file present: true
Codex DATABASE_URL present: true
Codex DATABASE_URL value printed: no
Codex Prisma validate: passed
Codex TCP diagnostic: failed
Codex program-check: failed / db_unreachable
Human PowerShell program-check: passed
PAES_M1 present
PAES_M2 absent
No DB mutation
No secrets printed
```

## Why Codex cannot safely mutate DB now

`Program PAES_M2` alignment requires a safe read-only precheck of the `Program` table before any mutation.

Codex cannot satisfy that precheck from its current execution context:

```text
Codex network context cannot reach remote-or-nonlocal DB endpoint.
Human PowerShell can.
```

Because Codex cannot pass `program-check`, Codex must not attempt a DB mutation. Retrying mutation from Codex would expand scope beyond the validated safe path.

## Repair options evaluated

Already evaluated safe options:

- Correct working directory: `nextjs_space`; already tested.
- `npx.cmd tsx` command form; already tested.
- `node_modules\.bin\tsx.cmd` command form; already tested.
- Prisma schema validation from `nextjs_space`; already passed.
- Tooling env loading; already confirmed by boolean/sanitized signals.
- Wrapper-only or documentation-only invocation changes; insufficient to repair network reachability.

Not safe or out of scope for this phase:

- Printing `.env`, `DATABASE_URL`, DB host, DB URL or connection strings.
- Changing network, VPN, proxy, firewall or external DB access policy from Codex.
- Modifying schema, package files, Prisma config or application code.
- Retrying Program alignment without a passing Codex `program-check`.

## Decision: Codex network repair vs human-local protocol

No safe Codex-side network repair is available inside this phase without external network configuration, secret exposure risk or scope expansion.

Decision:

```text
HUMAN_LOCAL_SECRET_SAFE_DB_OPERATION_PROTOCOL
```

Future DB operations for this blocker must be executed by the human from the known-good local PowerShell context, using only safe tooling and returning only sanitized evidence.

## Human-local secret-safe DB operation protocol

The human must execute DB commands from:

```text
C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space
```

Protocol:

1. Use only the safe DB tooling already present in `nextjs_space/scripts`.
2. Do not paste or print `.env`, `DATABASE_URL`, DB URL, DB host, connection strings, tokens, cookies, secrets, private keys or credentials.
3. Do not run migrate, db push, reset or seed reset.
4. Run read-only `program-check` first.
5. If `PAES_M2` is absent and the next phase authorizes mutation, run only the guarded `align-paes-m2-program` command.
6. Run read-only `program-check` after the mutation.
7. Return only the sanitized tool output needed to document status, mutation scope and secret-safety flags.

## Allowed human commands

Working directory:

```powershell
cd C:\projects\e360-tutoring-platform\tutoring_platform_mvp\nextjs_space
```

Optional schema sanity check:

```powershell
npx prisma validate
```

Read-only Program precheck:

```powershell
npx tsx scripts/local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

Optional read-only safe-tool plan:

```powershell
npx tsx scripts/local-dev-safe-db-tool.ts --mode plan-paes-m2-program --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only
```

Future mutation command, only in an explicitly authorized alignment phase:

```powershell
npx tsx scripts/local-dev-safe-db-tool.ts --mode align-paes-m2-program --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-local-dev-mutation --confirm-program-only --confirm-no-enrollment --phase MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-HUMAN-ALIGNMENT-1 --execute-mutation
```

Read-only Program postcheck:

```powershell
npx tsx scripts/local-dev-db-availability-check.ts --mode program-check --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-read-only
```

## Prohibited human commands

- Do not print `.env`.
- Do not print `DATABASE_URL`.
- Do not print DB URL, DB host or connection strings.
- Do not print tokens, cookies, secrets, private keys or credentials.
- Do not run `prisma migrate`.
- Do not run `prisma db push`.
- Do not reset DB.
- Do not run seed reset.
- Do not run direct SQL manually.
- Do not dump tables.
- Do not create StudentAccess.
- Do not create enrollment.
- Do not create StudentProgramInstance.
- Do not create LearningCycle.
- Do not create StudyLoad.
- Do not touch prod/staging.

## Sanitized evidence required from human

Precheck evidence:

```text
status: LOCAL_DEV_DB_PROGRAM_CHECK_COMPLETED
PAES_M1 Program row: present
PAES_M2 Program row: absent / present
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

If a future authorized mutation is executed:

```text
status: LOCAL_DEV_SAFE_DB_PROGRAM_ALIGNMENT_COMPLETED
mode: align-paes-m2-program
mutationScope: Program PAES_M2 only
dataMutated: true
enrollmentMutated: false
studentAccessMutated: false
studentProgramInstanceMutated: false
learningCycleMutated: false
studyLoadMutated: false
databaseUrlValuePrinted: false
secretValuesPrinted: false
```

Postcheck evidence:

```text
status: LOCAL_DEV_DB_PROGRAM_CHECK_COMPLETED
PAES_M1 Program row: present
PAES_M2 Program row: present
databaseUrlValuePrinted: false
dataMutated: false
secretValuesPrinted: false
```

## Explicit non-actions

- No DB mutation.
- No Program PAES_M2 creation or alignment.
- No Program PAES_M2 retry.
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

This was a documentation-only route decision after a prior read-only diagnosis.

Only authorized documentation was modified. No DB data, code, schema, tooling, package, UI, API, content, route-order or continuity file was changed.

## Result

```text
CODEX_EXECUTION_REPAIR_HUMAN_LOCAL_PROTOCOL_ACCEPTED
```

## Next recommended phase

```text
MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-HUMAN-ALIGNMENT-1
```
