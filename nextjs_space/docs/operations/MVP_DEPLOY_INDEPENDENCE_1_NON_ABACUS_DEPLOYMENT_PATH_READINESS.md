# MVP-DEPLOY-INDEPENDENCE-1 - Non-Abacus deployment path readiness

Date: 2026-05-15

## 1. Phase purpose

Define a future non-Abacus deployment path for Bexauri while preserving the already accepted local and GitHub `main` work.

This phase exists to:

- avoid improvised deploy commands;
- avoid returning to Abacus while the account is blocked and dashboard access is unavailable;
- prepare a controlled provider-selection and deployment architecture path;
- keep deployment separate from implementation.

This phase does not deploy, create accounts, configure hosting, move data, change runtime behavior, or inspect secrets.

## 2. Live baseline

Git preflight before this phase showed:

- HEAD = origin/main = `0d8dad6`.
- Last accepted commit = `MVP-SRA-IMPL-7D: document blocked deploy mechanism`.
- Working tree expected clean.

Git preflight remains the live source of truth. If older deployment, handoff, index, or phase documents contain stale baselines, Git wins.

## 3. Why this phase exists

`MVP-SRA-IMPL-7D` attempted a controlled deploy of the verified pedagogy/admin context block.

Result:

- local build passed;
- no schema/database migration was expected;
- no production operation occurred;
- deploy was blocked because no locally approved deploy mechanism existed.

Historically, repository operations documents pointed toward Abacus for controlled deploy, browser QA, and production operations. That path is no longer currently available:

- Abacus was intentionally reduced/left because development through Abacus consumed too many paid credits;
- the Abacus account is currently blocked due to non-payment;
- Mauricio does not have access to the Abacus app dashboard;
- Abacus must not be treated as the active deploy path for now.

Therefore Bexauri needs deployment independence: a non-Abacus hosting and database path that can be operated directly, documented clearly, and verified without Abacus dashboard access.

## 4. Current deployment status

Current status:

- no deploy occurred in `MVP-SRA-IMPL-7D`;
- current accepted code is in GitHub `main`;
- local verification passed for the PE1 bridge and admin read-only pedagogy context;
- production status is unchanged from before `MVP-SRA-IMPL-7D`;
- any old Abacus-hosted URL referenced in older docs must be treated as unavailable or untrusted unless Mauricio confirms access.

Do not rely on Abacus for deployment, production inspection, rollback, or dashboard verification while the account is blocked.

## 5. What must be deployed eventually

The deployable application is the Next.js app under `nextjs_space`.

Current stack characteristics observed from repo files:

- Next.js app with scripts: `dev`, `build`, `start`, `lint`;
- Prisma datasource using PostgreSQL via `DATABASE_URL`;
- NextAuth with CredentialsProvider and PrismaAdapter;
- admin access controlled by `ADMIN_EMAILS`;
- app metadata/base URL references `NEXTAUTH_URL`;
- `next.config.js` supports `NEXT_DIST_DIR` and `NEXT_OUTPUT_MODE`;
- production environment variables will be required and must not be printed.

The next deploy candidate should include the already accepted main-branch work:

- existing PAES_M1 registry metadata;
- PE1 registry activity;
- PE1 bridge: `paes_m1_linear_functions_basic -> paes_m1_data_representation_entry`;
- admin read-only `Contexto pedagogico` per StudyLoad.

No schema migration is currently expected from the `MVP-SRA-IMPL-1` through `MVP-SRA-IMPL-7D` block, but a future deploy phase must still verify schema drift before deploying.

## 6. Non-Abacus deployment requirements

A non-Abacus deployment path must provide:

- Node/Next.js hosting capable of building and running the app;
- persistent PostgreSQL-compatible production database;
- secure environment variable management;
- NextAuth-compatible production URL and secret setup;
- GitHub integration or a reproducible manual deploy path;
- identified build command;
- identified start command;
- rollback capability;
- logs that do not leak secrets;
- admin access and allowlist verification;
- post-deploy read-only verification.

Minimum app commands to confirm in a later provider-selection phase:

- build command, likely from `nextjs_space`: `npm run build`;
- start command, likely from `nextjs_space`: `npm run start`;
- install command, to be provider-specific and not run in this phase.

## 7. Candidate deployment models

This phase does not choose a final provider. Pricing, current quotas, and provider-specific features must be verified later in a separate web-researched or account-backed phase before committing.

### A. Managed Next.js host + managed Postgres

Pros:

- lowest operational burden for a Next.js app;
- likely simplest GitHub-connected deployment workflow;
- usually strong fit for standard Next.js build/start behavior;
- can pair with a managed PostgreSQL provider.

Risks:

- platform-specific runtime limits may affect Prisma, server routes, or long operations;
- environment variables and database networking must be configured carefully;
- rollback and log access vary by provider.

Operational complexity:

- low to medium.

Fit for low budget:

- likely good, but must be verified with current pricing in a later phase.

Fit for current stack:

- strong likely fit for Next.js, Prisma, PostgreSQL, and NextAuth if environment variables and database connectivity are configured correctly.

### B. General Node app host + managed Postgres

Pros:

- more control over Node runtime and `next start`;
- still avoids managing the database server directly;
- can be provider-neutral if deployment is scriptable.

Risks:

- more manual setup than a managed Next.js host;
- build caching, static assets, logs, and rollbacks may need extra configuration;
- misconfigured start/build working directory can break deploys.

Operational complexity:

- medium.

Fit for low budget:

- potentially good, but depends on provider and resource sizing.

Fit for current stack:

- good if the host supports Node, persistent environment variables, outbound PostgreSQL connectivity, and reproducible builds from `nextjs_space`.

### C. VPS/container-style host + managed Postgres

Pros:

- maximum control over runtime, ports, process manager, and deployment script;
- easier to standardize with containers later if desired;
- managed Postgres can still reduce database operations burden.

Risks:

- highest maintenance burden;
- requires OS patching, process supervision, TLS/proxy setup, log hygiene, rollback discipline, and security hardening;
- more ways to accidentally drift from GitHub `main`.

Operational complexity:

- medium to high.

Fit for low budget:

- can be low-cost, but only if operations time and security maintenance are acceptable.

Fit for current stack:

- technically compatible, but heavier than needed for the current MVP unless managed options are unsuitable.

### D. Continue local-only temporarily

Pros:

- no hosting cost or account setup immediately;
- preserves current verified local/main state;
- avoids rushed production decisions.

Risks:

- no external or internal production access;
- no production admin verification;
- delays real deployment learning;
- accepted main remains undeployed.

Operational complexity:

- low.

Fit for low budget:

- strongest short-term budget fit.

Fit for current stack:

- already validated for local development, but not a deployment solution.

## 8. Recommended path

Recommended direction:

```text
Managed Next.js host + managed Postgres
```

Reason:

- it likely minimizes operational burden;
- it fits the current Next.js/Prisma/NextAuth shape;
- it should support GitHub-based custody and rollback more cleanly than a hand-built deploy path.

Boundaries:

- this phase does not select a final provider;
- this phase does not create accounts;
- this phase does not move the database;
- this phase does not deploy.

The next step should be a dedicated provider-selection and deployment architecture phase.

## 9. Data/database caution

Before any non-Abacus deploy, the database target must be decided explicitly.

Open questions:

- Is the desired production database the existing Abacus-backed database?
- Is there accessible production data to preserve?
- Should production move to Neon, Supabase, or another managed PostgreSQL provider?
- Should the first non-Abacus deploy use a new controlled beta database instead?

Cautions:

- if Abacus dashboard is blocked, old production DB access may be unavailable;
- do not copy or migrate data without explicit authorization;
- do not print `DATABASE_URL`;
- do not run `prisma db push`, migrations, reset, or SQL against production without a dedicated phase;
- create a backup/export plan before moving any production data;
- if no accessible production DB exists, initial non-Abacus deployment may need a new controlled beta DB.

## 10. Environment variable inventory

Categories identified from code and docs, without reading or printing values:

- `DATABASE_URL` - PostgreSQL connection string used by Prisma.
- `NEXTAUTH_SECRET` - expected for secure production NextAuth operation, even if not directly referenced in code.
- `NEXTAUTH_URL` - production app URL used by NextAuth and app metadata.
- `ADMIN_EMAILS` - comma-separated admin allowlist used by `lib/admin-guard.ts`.
- OAuth/provider secrets if any provider is introduced later; current inspected auth uses CredentialsProvider.
- app URL/domain settings for the chosen host and domain.
- `NEXT_DIST_DIR` - optional Next.js output directory override referenced by `next.config.js`.
- `NEXT_OUTPUT_MODE` - optional Next.js output mode override referenced by `next.config.js`.
- provider-specific runtime settings, build settings, and secret names introduced by the chosen host.

Do not inspect `.env` contents. Do not print secret values.

## 11. Future phase plan

Safe next phases:

A. `MVP-DEPLOY-INDEPENDENCE-2 - Provider selection and deployment architecture decision`.

- Compare non-Abacus provider options.
- Verify current pricing/features only if web/account research is explicitly authorized.
- Select hosting/database architecture.
- Define rollback and logging approach.

B. `MVP-DEPLOY-INDEPENDENCE-3 - Environment variable inventory and secret-handling checklist`.

- Identify required variable names and ownership.
- Confirm how secrets will be entered into the provider without printing them.
- Confirm admin allowlist and production URL plan.

C. `MVP-DEPLOY-INDEPENDENCE-4 - Non-Abacus staging deploy attempt`.

- Deploy to staging/beta only.
- Use controlled database target.
- Run read-only admin verification and safe app smoke checks.

D. `MVP-DEPLOY-INDEPENDENCE-5 - Production/beta deploy attempt`.

- Run only after staging passes.
- Require explicit Mauricio authorization.
- Stop on any DB, auth, schema, migration, or rollback uncertainty.

## 12. Stop conditions for future deploy

Any future deploy phase must stop if any of the following occur:

- unclear DB target;
- missing required environment variable;
- missing auth/admin allowlist plan;
- schema drift;
- migration uncertainty;
- dev-prod promotion warning;
- destructive operation warning;
- no rollback path;
- no post-deploy admin verification path;
- deploy provider asks for a command, secret, migration, or production operation not already approved.

## 13. Immediate recommendation

Should we deploy now?

- No.

Should we use Abacus now?

- No. Abacus is blocked/unavailable and Mauricio does not have dashboard access.

Should we choose a non-Abacus provider next?

- Yes, through a dedicated provider-selection and deployment architecture phase.

Should current accepted `main` remain source of truth?

- Yes. GitHub `main` remains the custody source of truth for accepted work.

## 14. Guardrails carried forward

Product and technical guardrails remain active:

- no PAES score;
- no theta;
- no mastery;
- no automatic diagnosis;
- no adaptive AI claim;
- no expert validation claim;
- no operator review as gate;
- review != gate;
- supervision != bottleneck;
- operator action != prerequisite for normal student continuity.

Deployment guardrails:

- no deploy without explicit phase authorization;
- no production operation without explicit authorization;
- no schema/database mutation without dedicated authorization;
- no secrets printed;
- no improvised deploy command;
- no Abacus dependency while account/dashboard access is blocked.
