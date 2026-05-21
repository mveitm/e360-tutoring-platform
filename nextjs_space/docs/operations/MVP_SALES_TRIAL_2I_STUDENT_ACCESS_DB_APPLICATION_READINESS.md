# MVP-SALES-TRIAL-2I — StudentAccess DB Application Readiness

## 1. Phase gate classification
- Roadmap block: 2 — Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2H closed at `73686f5`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: documentation/readiness only for applying the `student_access` table in a future controlled DB phase.
- Explicit non-goals: no app code changes, no `prisma/schema.prisma` edit, no new schema changes, no package changes, no deploy, no staging/prod, no SQL, no DB mutation, no `prisma db push`, no `prisma migrate`, no migration file, no Prisma generate, no Prisma Studio, no introspection, no seed, no dev server, no `.env`/secret inspection, no student account, no `StudentAccess` row, no backfill, no default-row behavior, no enrollment, no trial runtime, no billing/payment/subscription, no Program, no LearningCycle, no StudyLoad, no Student row edit, no password reset, no auth/signup/login/admin guard change, no `/now`, no admin UI, no Block 7, no User/Student FK hardening, no commit, no push, and no generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean at phase start.
- HEAD / origin/main: `73686f55254852b07177a68049a88693ed40bbe8` / `73686f55254852b07177a68049a88693ed40bbe8`.
- Baseline verdict: matches expected `HEAD = origin/main = 73686f5`; working tree was clean before this documentation/readiness phase.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2H_STUDENT_ACCESS_SCHEMA_VERIFICATION_CLOSEOUT.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2G_IMPLEMENT_MINIMAL_STUDENT_ACCESS_SCHEMA.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2F_TRIAL_ACCESS_SCHEMA_IMPLEMENTATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2E_MINIMAL_TRIAL_ACCESS_SCHEMA_DESIGN.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md -Tail 1100`

Read-only files and signals reviewed:
- `nextjs_space/prisma/schema.prisma`
- `nextjs_space/package.json`
- `nextjs_space/prisma/seed.ts -ErrorAction SilentlyContinue`
- `Get-ChildItem nextjs_space/prisma`
- `Get-ChildItem nextjs_space/scripts`
- `nextjs_space/scripts/safe-seed.ts`
- Read-only `rg` for Prisma DB commands, migration terms, `schema.prisma`, `DATABASE_URL` references by name, and `PrismaClient`, excluding `.env`, `.next`, `node_modules`, and logs.

Stale baseline note:
- Historical TRIAL documents retain their own phase baselines.
- TRIAL-2H points to its live baseline as `4966bc0`; Git preflight for this phase establishes the current accepted baseline as `73686f5`.
- Git preflight wins over any stale handoff, memory, or historical document.

## 4. Starting point after TRIAL-2H
Confirmed:
- `StudentAccess` exists in `schema.prisma`.
- TRIAL-2H already verified `npx.cmd prisma validate` passed.
- TRIAL-2H already verified `npm.cmd run build` passed.
- No DB table exists yet because no DB push, migration, or SQL was run.
- No Prisma Client generation was separately run in TRIAL-2H beyond whatever the authorized build/project flow handles.
- No `StudentAccess` rows exist.
- No signup default-row behavior exists.
- No backfill exists.
- No runtime behavior, student UI, admin UI, or admin operation uses `StudentAccess`.

## 5. DB application problem
`StudentAccess` now exists in the repository schema but not in the target database. Runtime code cannot safely rely on it until two separate readiness questions are answered:
- the actual database has the `student_access` table;
- the Prisma Client available to the app includes the `StudentAccess` model.

Applying DB means promoting the Prisma schema delta from `schema.prisma` into an explicitly chosen database so that the physical `student_access` table exists. In this project, that is a DB mutation and must be treated as an operationally sensitive action.

The operation must be controlled because prior project documents record high-risk patterns around `prisma db push`, production/staging ambiguity, and a prior destructive `db push --force-reset` incident. Speed is lower priority than preventing accidental production, staging, or shared-data mutation.

## 6. Current repo/operation signals
Package scripts relevant to Prisma/build:
- `build`: `next build`
- `postinstall`: `prisma generate`
- Prisma seed command: `tsx --require dotenv/config scripts/safe-seed.ts`

Prisma folder contents:
- `nextjs_space/prisma` contains `schema.prisma`.
- No `nextjs_space/prisma/migrations` folder was visible in read-only inspection.
- `nextjs_space/prisma/seed.ts` was not present.

Seed signals:
- `nextjs_space/scripts/safe-seed.ts` exists.
- It wraps `scripts/seed.ts` and aborts if delete/deleteMany patterns are detected.
- No seed was executed in this phase.

DB push/migration precedent:
- Read-only search found repeated operational warnings against `prisma db push`, `prisma migrate`, `prisma db seed`, and especially `prisma db push --force-reset`.
- Historical docs mention a destructive `prisma db push --force-reset` incident.
- Some governance docs mention Abacus ownership of `db push`, but this phase must not depend on Abacus.
- No formal migrations workflow is evident from the current `prisma` folder because no migrations directory is present.

Secret handling:
- The schema references `env("DATABASE_URL")` by name.
- No `.env` files were inspected and no secret values were printed.

## 7. DB application options
### A. `prisma db push` to local/dev only
- Benefit: fastest way to create the `student_access` table in a controlled non-production database.
- Risk: if the target database is ambiguous, `db push` could touch shared, staging, or production data. It also bypasses a committed migration history.
- Dependency: explicit target confirmation without printing URL, clean Git preflight, reviewed schema diff, no drift ambiguity, backup/snapshot if shared, and strict no-force-reset guardrail.
- Recommended now: not in this phase. Potentially recommended later only for an explicitly confirmed local/dev target.

### B. `prisma migrate dev` / migration file
- Benefit: creates migration history and is better aligned with repeatable promotion across environments.
- Risk: current repo does not show an existing migrations folder or formal migrations policy. Introducing migrations without a strategy can create drift and future deployment ambiguity.
- Dependency: migration strategy decision, naming policy, target environment policy, and review of how migrations will be applied outside local/dev.
- Recommended now: not until migration strategy is explicitly accepted.

### C. Prisma Client generation only, no DB application
- Benefit: updates generated types and client API without mutating DB.
- Risk: client availability without a table can encourage runtime code that fails at DB access time.
- Dependency: strict no-runtime-use boundary until DB application is complete.
- Recommended now: not as the next phase unless DB application remains intentionally deferred and no runtime code is added.

### D. Defer DB application until migration strategy is explicitly defined
- Benefit: avoids accidental DB mutation and resolves whether the project should use `db push` or migrations before touching any DB.
- Risk: delays the ability to use `StudentAccess` in runtime, default rows, backfill, `/now`, or admin reads.
- Dependency: none beyond the current readiness evidence.
- Recommended now: yes if the DB target cannot be confirmed safely.

### E. Controlled Neon/local-dev DB application phase with explicit environment and backup/snapshot guardrails
- Benefit: moves toward the physical table while keeping the operation scoped to a confirmed local/dev database and excluding staging/prod.
- Risk: still mutates a database, so target confusion, lack of snapshot, or drift ambiguity can make it unsafe.
- Dependency: explicit environment confirmation without printing URL, backup/snapshot if the database is shared or contains valuable data, no production/staging, and a reviewed command plan.
- Recommended now: yes as the next readiness/guardrail phase, not as an immediate mutation in TRIAL-2I.

## 8. Recommended DB application strategy
Safest route:
- Do not mutate DB in TRIAL-2I.
- Run one narrow guardrail/target confirmation phase before any DB operation.

Target environment:
- First target must be local/dev only.
- Staging and production must remain out of scope unless later separately authorized.
- If using Neon, the target must be a clearly labeled local/dev or disposable/dev branch/database, not production and not staging.

Should DB application happen next?
- Not directly as a mutation.
- The next phase should confirm target, backup/snapshot, command, drift policy, and Prisma Client generation order.

Prisma Client generation policy:
- Client generation should be part of the future controlled DB application phase or an immediately adjacent explicitly authorized step.
- It should not be used to justify runtime code before the table exists.
- The repo already has `postinstall: prisma generate`, but future phases should not assume that equals intentional client readiness for `StudentAccess`.

Backup/snapshot:
- Required before touching any real/shared local/dev database.
- Optional only for a disposable empty database whose loss is explicitly accepted.

Forbidden:
- production;
- staging unless separately authorized;
- `--force-reset`;
- `prisma db push --force-reset`;
- `prisma migrate reset`;
- SQL;
- secret printing;
- `.env` inspection;
- deploy;
- seed/backfill/default-row unless separately scoped.

## 9. Hard guardrails for any future DB application
- No production.
- No staging unless separately authorized in a separate phase.
- No `--force-reset`.
- No `db push --force-reset`.
- No `prisma migrate reset`.
- No SQL.
- No secrets printed.
- No `.env` inspection.
- Confirm target DB without printing URL or credentials.
- Confirm whether target is disposable, local, dev, shared dev, staging, or production.
- Require backup/snapshot before operating on any real/shared DB.
- Git preflight must be clean and match the accepted baseline.
- Review schema diff before the DB operation.
- Stop on drift ambiguity, target ambiguity, missing backup, or any prompt that suggests reset/destructive action.
- Use `npx.cmd` on Windows if Prisma CLI is authorized later, avoiding PowerShell `npx.ps1` execution-policy issues.

## 10. Future verification plan
A future DB application phase must prove:
- exact command used, without secrets;
- target environment class confirmed without printing URL;
- whether the schema was applied by `db push` or migration;
- whether Prisma Client was generated or intentionally not generated;
- `student_access` table existence verified without SQL or secret printing, preferably through Prisma CLI status/output if available or provider console screenshot/confirmation by Mauricio;
- build passes after client/table readiness if build is in scope;
- no Program, LearningCycle, or StudyLoad was created;
- no `StudentAccess` rows were created unless explicitly part of that phase;
- no default-row behavior was added unless explicitly part of that phase;
- no backfill ran unless explicitly part of that phase;
- no runtime, `/now`, admin UI, billing, enrollment, or Block 7 change occurred;
- final `git diff --check`, `git diff --stat`, and `git status --short` are reported after documentation;
- no secrets were printed.

If a later local/dev DB application phase is explicitly authorized and target/backup guardrails pass, the likely command should be:

```powershell
cd nextjs_space
npx.cmd prisma db push
```

Only if explicitly authorized in the same or adjacent phase, Prisma Client generation can follow:

```powershell
npx.cmd prisma generate
```

Always prohibited:

```powershell
npx.cmd prisma db push --force-reset
npx.cmd prisma migrate reset
```

## 11. What remains out of scope after DB application
- validation helper;
- default-row signup;
- backfill;
- `/now` read integration;
- admin read surfaces;
- admin mutation operations;
- AuditEvent writes;
- billing;
- enrollment;
- trial runtime;
- Program/LearningCycle/StudyLoad;
- Block 7.

## 12. Recommended next phase
Recommended next phase:
- `MVP-SALES-TRIAL-2J — StudentAccess DB application guardrails and target confirmation`

Reason:
- Read-only inspection found no formal migration folder and no safe way to confirm DB target without secret-aware operational context from Mauricio.
- The next safe cut should confirm local/dev target, backup/snapshot policy, exact command, and client generation order before any DB mutation.
- Do not recommend UI/admin/runtime yet.

Required phase-gate framing:
- Roadmap block: 2 — Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2I closed.
- What it advances: DB safety guardrails and target confirmation for `student_access`.
- What it does not advance: DB mutation, runtime, UI/admin, default-row, backfill, billing, enrollment, Program, LearningCycle, StudyLoad, or Block 7.
- Priority verdict: APPROVED_NEXT_PHASE.
- Authorization status: not authorized to mutate DB until a later explicit mutation phase.

## 13. Final verdict
NEEDS_DB_APPLICATION_GUARDRAILS_BEFORE_MUTATION
