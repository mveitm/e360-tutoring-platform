# MVP-SALES-TRIAL-2J — StudentAccess DB Application Guardrails and Target Confirmation

## 1. Phase gate classification
- Roadmap block: 2 — Trial and access control.
- Sales-ready relevance: direct/high.
- Dependency: TRIAL-2I closed at `8eb6562`.
- Priority verdict: APPROVED_NEXT_PHASE.
- Scope: documentation/readiness only. Define guardrails, target requirements, stop rules, future command plan, and evidence requirements before any later DB application of `student_access`.
- Explicit non-goals: no app code changes, no `prisma/schema.prisma` edit, no package changes, no deploy, no staging/prod, no SQL, no DB mutation, no `prisma db push`, no `prisma migrate`, no migration file, no Prisma generate, no Prisma validate, no Prisma Studio, no introspection, no seed, no dev server, no `.env`/secret inspection, no student account creation, no `StudentAccess` row, no backfill, no default-row behavior, no enrollment, no real trial, no billing/payment/subscription, no Program, no LearningCycle, no StudyLoad, no Student row edit, no password reset, no auth/signup/login/admin guard change, no `/now`, no admin UI, no Block 7, no User/Student FK hardening, no commit, no push, and no generated PDF/DOCX artifacts.

## 2. Git preflight
- git status: clean at phase start.
- HEAD / origin/main: `8eb65623d0dd9d2fffe814ea8722eec83d7afafa` / `8eb65623d0dd9d2fffe814ea8722eec83d7afafa`.
- Baseline verdict: matches expected `HEAD = origin/main = 8eb6562`; working tree was clean before this documentation/readiness phase.

## 3. Inputs reviewed
Documents reviewed:
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2I_STUDENT_ACCESS_DB_APPLICATION_READINESS.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2H_STUDENT_ACCESS_SCHEMA_VERIFICATION_CLOSEOUT.md`
- `nextjs_space/docs/operations/MVP_SALES_TRIAL_2G_IMPLEMENT_MINIMAL_STUDENT_ACCESS_SCHEMA.md`
- `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
- `PHASE_LOG.md -Tail 1180`

Read-only files and signals reviewed:
- `nextjs_space/prisma/schema.prisma`
- `nextjs_space/package.json`
- `Get-ChildItem nextjs_space/prisma`
- `Get-ChildItem nextjs_space/scripts`
- `nextjs_space/scripts/safe-seed.ts`
- Read-only `rg` for Prisma DB commands, reset commands, `DATABASE_URL` references by variable name, Neon/staging/production references, DB application notes, `schema.prisma`, and `PrismaClient`, excluding `.env`, `.next`, `node_modules`, and logs.

Stale baseline note:
- Historical TRIAL docs retain their own baselines.
- Older `PHASE_LOG.md` content includes prior production/deploy states and destructive DB incident history. Those are historical context, not the live baseline.
- Git preflight wins. The live accepted baseline for TRIAL-2J is `HEAD = origin/main = 8eb6562`.

## 4. Starting point after TRIAL-2I
Confirmed:
- `StudentAccess` exists schema-only in `schema.prisma`.
- TRIAL-2H previously validated the schema and build successfully.
- No DB table exists yet for `student_access` through these TRIAL phases.
- No DB application has happened.
- No `StudentAccess` rows exist.
- No signup default-row behavior exists.
- No backfill exists.
- No runtime, `/now`, student UI, admin UI, or admin operation uses `StudentAccess`.

## 5. Target confirmation requirement
Before any DB mutation, Mauricio must confirm all of the following without printing URL, credentials, tokens, or secrets:
- environment class: local/dev only;
- target is not staging;
- target is not production;
- whether the DB is disposable or shared;
- if disposable, that data loss is acceptable;
- if shared or containing valuable data, that a backup/snapshot exists before mutation;
- that the target is the intended DB for applying only the schema table creation readiness step;
- that no deploy, promotion, staging sync, or production operation is coupled to the command.

Acceptable confirmation format:
- a plain-language statement such as: "Target confirmed: local/dev Neon branch named `<non-secret label>`; not staging; not production; disposable" or "Target confirmed: local dev DB; shared; snapshot taken at `<timestamp/label>`."
- It must not include connection strings, passwords, tokens, `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAILS`, or copied `.env` contents.

## 6. Allowed future target
The only acceptable next target is a local/dev database.

Allowed forms:
- a local/dev database confirmed by Mauricio;
- a Neon dev/local branch explicitly identified as dev/local and not production or staging;
- a disposable DB if Mauricio confirms it is disposable and data loss is acceptable.

For a shared local/dev database, backup/snapshot is mandatory before the command. For a disposable empty/dev database, Mauricio must explicitly confirm that backup is unnecessary because the database is disposable.

## 7. Forbidden targets and commands
Forbidden targets:
- production;
- staging unless a future separate phase explicitly authorizes staging;
- any ambiguous DB;
- any DB whose environment class cannot be confirmed without secrets;
- any shared DB without backup/snapshot;
- any DB connected to deploy, promotion, or production synchronization;
- any target inferred from `.env` inspection by Codex.

Forbidden commands:
- `npx.cmd prisma db push --force-reset`
- `npx.cmd prisma migrate reset`
- raw SQL
- any destructive reset command;
- any command that prints secrets;
- any command that applies to staging or production;
- any command that combines DB application with seed, backfill, default-row behavior, deploy, or runtime changes.

## 8. Candidate future command plan
Future DB application command, only if target confirmation passes in a later explicitly authorized phase:

```powershell
cd nextjs_space
npx.cmd prisma db push
```

Do not execute that command in TRIAL-2J.

Prisma Client generation policy for the same future phase:

```powershell
npx.cmd prisma generate
```

Recommendation: allow `npx.cmd prisma generate` in the same future DB application phase, after successful DB application, only if explicitly included in that phase. This keeps table readiness and client readiness in one controlled closeout while still preserving the no-runtime/no-UI/no-default-row boundary. If the DB command stops, generation must not proceed.

## 9. Stop rules for future DB application
Future DB application must stop immediately on:
- drift ambiguity;
- reset prompt;
- destructive warning;
- target ambiguity;
- missing backup/snapshot for shared DB;
- any sign the command may touch staging or production;
- any need to inspect `.env` or print secrets;
- any Prisma output proposing data loss;
- any prompt requiring `--force-reset`;
- any deploy/promotion coupling;
- dirty Git preflight;
- `HEAD` / `origin/main` mismatch;
- schema diff that includes anything beyond the already accepted `StudentAccess` schema state.

If any stop rule triggers, the phase must document the blocker and must not attempt an alternate destructive command.

## 10. Verification evidence required from future DB application
Future phase must report:
- git preflight;
- target class confirmed without secrets;
- exact command used;
- Prisma output summary without secrets;
- whether `student_access` table was created;
- whether Prisma Client was generated;
- no `StudentAccess` rows/default/backfill unless explicitly authorized;
- no Program/LearningCycle/StudyLoad;
- no UI/admin/runtime;
- build result if in scope;
- final `git diff --check`;
- final `git diff --stat`;
- final `git status --short`.

Table-created evidence must avoid SQL and secrets. Acceptable evidence includes:
- Prisma CLI output from the authorized `db push` indicating schema sync/table application, with no secrets printed;
- provider console confirmation by Mauricio using a non-secret table name screenshot/statement;
- a later explicitly authorized non-mutating Prisma check that does not print connection strings.

## 11. Client generation policy
Options:
- Generate in same DB application phase: best operational closeout if DB application succeeds, because physical table and Prisma Client readiness become aligned.
- Generate as separate phase: safest if any DB target doubt remains, but adds another checkpoint before runtime work.
- Rely on build/postinstall: insufficient as a policy because `postinstall: prisma generate` exists but does not prove intentional client readiness for `StudentAccess`.

Recommended route:
- Include `npx.cmd prisma generate` in the same future controlled local/dev DB application phase, after successful `npx.cmd prisma db push`, if explicitly authorized.
- Do not add runtime code in that same phase.
- If `db push` stops or target confirmation is incomplete, do not run generate.

## 12. Remaining out of scope after DB application
- validation helper;
- signup default-row;
- backfill;
- `/now` reads;
- admin reads;
- mutation endpoints;
- AuditEvent writes;
- billing;
- enrollment;
- trial runtime;
- Program/LearningCycle/StudyLoad;
- Block 7.

## 13. Recommended next phase
Recommended next phase:
- `MVP-SALES-TRIAL-2K — Final owner target confirmation before DB push`

Reason:
- The guardrails are defined, but the actual DB target has not been confirmed by Mauricio in this phase.
- Operational custody weighs more than speed.
- The next phase should collect the owner target confirmation and, only if unambiguous, either authorize the controlled local/dev `db push` in the same phase or stop before mutation.

Do not recommend UI/admin/runtime yet.

## 14. Final verdict
NEEDS_FINAL_OWNER_TARGET_CONFIRMATION_BEFORE_DB_PUSH
