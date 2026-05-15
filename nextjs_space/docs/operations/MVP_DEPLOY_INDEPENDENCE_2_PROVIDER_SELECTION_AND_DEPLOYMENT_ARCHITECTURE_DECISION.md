# MVP-DEPLOY-INDEPENDENCE-2 - Provider selection and deployment architecture decision

Date: 2026-05-15

## 1. Phase purpose

Select a preferred non-Abacus deployment architecture for Bexauri and define the next implementation-safe phases.

This phase is documentation, research, and architecture decision only. It does not deploy, create provider accounts, configure hosting, move data, change code, inspect `.env` values, or print secrets.

## 2. Live baseline

Git preflight before this phase showed:

- HEAD = origin/main = `1889c6a`.
- Last accepted commit = `MVP-DEPLOY-INDEPENDENCE-1: prepare non-Abacus deploy path`.
- Working tree expected clean.

Git preflight remains the live source of truth. If older deployment, handoff, index, or phase documents contain stale baselines, Git wins.

## 3. Business and ops context

Abacus is not an available deployment path for now:

- Abacus is unavailable as an active deploy path.
- The Abacus account is blocked due to non-payment.
- Mauricio does not have access to the Abacus app dashboard.
- Development through Abacus consumed too many paid credits.

This phase must not recommend Abacus as the active path or require Abacus access for future deployment.

GitHub `main` remains the custody source of truth.

## 4. Current app architecture constraints

Observed from repo files:

- app root: `nextjs_space`;
- framework: Next.js `14.2.28`;
- scripts: `dev`, `build`, `start`, `lint`;
- Prisma datasource: PostgreSQL via `DATABASE_URL`;
- Prisma Client binary targets include native and Linux musl ARM64 OpenSSL 3;
- authentication: NextAuth with CredentialsProvider and PrismaAdapter;
- admin authorization: `ADMIN_EMAILS` server-side allowlist;
- app URL metadata uses `NEXTAUTH_URL`;
- `next.config.js` supports optional `NEXT_DIST_DIR` and `NEXT_OUTPUT_MODE`;
- no deploy script exists in `nextjs_space/package.json`.

Operational implications:

- the host must support dynamic Next.js server behavior, not only static export;
- the database must be PostgreSQL-compatible;
- environment variables must be configured outside source code;
- admin allowlist and NextAuth URL/secret setup are deployment blockers;
- any future Prisma schema operation must be a separate authorized phase.

## 5. Official-source research summary

Sources used:

- Vercel Next.js docs: <https://vercel.com/docs/concepts/next.js/overview>
- Vercel environment variables docs: <https://vercel.com/docs/projects/environment-variables>
- Vercel build docs: <https://vercel.com/docs/builds>
- Vercel pricing: <https://vercel.com/pricing>
- Neon pricing: <https://neon.com/pricing>
- Neon connection docs: <https://neon.com/docs/get-started-with-neon/connect-neon>
- Neon connection pooling docs: <https://neon.com/docs/connect/connection-pooling>
- Neon Vercel integration docs: <https://neon.com/docs/guides/vercel/>
- Prisma Neon docs: <https://docs.prisma.io/docs/v6/orm/overview/databases/neon>
- Render Next.js deploy docs: <https://render.com/docs/deploy-nextjs-app>
- Render deploy docs: <https://render.com/docs/deploys/>
- Render free tier docs: <https://render.com/free>
- Render web services docs: <https://render.com/docs/web-services/>
- Render Postgres docs: <https://render.com/docs/postgresql>
- Render Postgres flexible plans docs: <https://render.com/docs/postgresql-refresh>
- Railway Next.js + Postgres guide: <https://docs.railway.com/guides/nextjs>
- Railway pricing: <https://railway.com/pricing>

Current provider facts should be rechecked before account creation or deploy because pricing and limits can change.

## 6. Provider evaluation

### A. Vercel for Next.js hosting

Official-source facts:

- Vercel documents zero-configuration deployment for Next.js and supports server-side rendering through Vercel Functions.
- Vercel environment variables are configured per environment and can be read during the build step and during function execution.
- Vercel build infrastructure automatically builds code pushed through Git, dashboard import, or CLI.
- Current pricing page lists Hobby as free, Pro at `$20/month + additional usage`, and Enterprise as custom.
- Vercel pricing page describes Hobby as for personal projects and Pro as for professional/team/business use.

Fit for Bexauri:

- Strongest fit for Next.js App Router and server-side routes.
- Low operational burden.
- Good fit for GitHub `main` custody and preview/production separation.
- Needs a clear budget decision: if Bexauri is commercial/business use, assume Pro rather than relying on Hobby.

Risks:

- Potential usage-based cost growth beyond included limits.
- Database is external unless using a connected storage integration.
- Prisma connection behavior must be controlled with pooling/direct connection discipline.
- Project root must be configured as `nextjs_space`.

Architecture fit:

- Preferred app host.

### B. Neon for managed PostgreSQL

Official-source facts:

- Neon pricing page lists a Free plan at `$0`, with no time limit/no credit card, 100 projects, 100 CU-hours monthly per project, and 0.5 GB storage per project.
- Neon Launch is usage-based with a listed typical spend of `$15/month` for an intermittent 1 GB workload.
- Neon supports pooled and direct connection strings.
- Neon connection pooling uses PgBouncer and is available on all plans, including Free.
- Neon Vercel integration sets `DATABASE_URL` as pooled and `DATABASE_URL_UNPOOLED` as direct.
- Prisma's Neon docs recommend using a pooled connection string for runtime `DATABASE_URL` and a direct connection string for Prisma CLI schema operations.

Fit for Bexauri:

- Strong fit for Prisma/PostgreSQL.
- Low initial cost for staging/beta if Free limits are sufficient.
- Good fit with Vercel as app host.
- Connection pooling helps with serverless function/database connection pressure.

Risks:

- Free tier capacity may not be enough for production beyond internal beta.
- Schema operations require special caution: pooled runtime URL and direct CLI URL must not be confused.
- Existing Abacus production data may not be accessible; data migration must be a separate authorized phase.

Architecture fit:

- Preferred database provider for staging/beta and likely early production, subject to explicit budget and DB-target confirmation.

### C. Render as combined/general Node + Postgres alternative

Official-source facts:

- Render documents deploying Next.js as a Node web service or static site; this app needs the Node web service path because it has server routes and authentication.
- Render web services support public URLs, custom domains, TLS, zero-downtime deploys, service previews, logs, and instant rollbacks.
- Render deploys can connect to GitHub/GitLab/Bitbucket and auto-deploy from a linked branch.
- Render free web services spin down after 15 minutes of inactivity.
- Render free Postgres databases have a 1 GB limit, expire after 30 days, and do not provide backups.
- Render Postgres flexible plans bill compute and storage separately; storage is listed at `$0.30/GB-month`, with paid databases gaining stronger recovery capabilities.

Fit for Bexauri:

- Good alternative if a single provider for app + Postgres is preferred.
- More generic Node hosting than Vercel; likely more manual but still manageable.
- Free tier can be useful for previewing the platform, not production.

Risks:

- Free web spin-down is poor for reliable admin/student access.
- Free Postgres expiration makes it unsuitable for durable production data.
- Next.js behavior runs as a Node service, which may require more explicit tuning than Vercel.

Architecture fit:

- Viable backup option.
- Not preferred over Vercel + Neon for the current low-ops Next.js-first goal.

### D. Railway as app/database platform alternative

Official-source facts:

- Railway documents deploying a Next.js app with Postgres from a template, GitHub repo, CLI, or Dockerfile.
- Railway's Next.js guide says standalone output is needed for self-hosted deployment and describes adding `output: "standalone"` and changing the start script.
- Railway can provision Postgres and expose `DATABASE_URL` to the Next.js service through reference variables.
- Railway pricing page lists a free trial with credits, then a low-cost free-tier posture with limited resources; Hobby has `$5` minimum usage; Pro has `$20` minimum usage.
- Railway pricing page lists GitHub repo deployment, service variables/secrets management, one-click rollbacks, logs, and built-in database/volume backups among platform capabilities.

Fit for Bexauri:

- Strong developer experience for app + database in one project.
- Lower minimum spend than Vercel Pro plus separate DB if usage remains small.
- Good alternative if provider consolidation matters more than Vercel's Next.js specialization.

Risks:

- Current repo would likely need future code/config changes for standalone output and start script alignment before Railway deployment.
- Usage-based pricing can surprise without spend monitoring.
- Provider setup requires account/project decisions not authorized in this phase.

Architecture fit:

- Viable alternative.
- Not preferred for the immediate path because it likely requires app configuration changes before first deploy.

### E. Continue local-only temporarily

Facts from repo:

- Local development and local verification are already validated outside Abacus.
- GitHub `main` contains accepted work.
- No deploy occurred after `MVP-SRA-IMPL-7D`.

Fit for Bexauri:

- Lowest immediate cost.
- Safest if budget cannot support provider setup now.
- Preserves custody and avoids rushed account decisions.

Risks:

- No production/beta URL.
- No production admin visual verification.
- No real deployment learning.
- Accepted main remains undeployed.

Architecture fit:

- Valid temporary hold state, not a deployment architecture.

## 7. Decision

Preferred architecture:

```text
Vercel for the Next.js app + Neon for managed PostgreSQL
```

Decision status:

```text
ARCHITECTURE_SELECTED_VERCEL_NEON
```

This is not deploy authorization.

This verdict selects Vercel + Neon for staging/beta architecture planning only.

Why this is preferred:

- Vercel is the strongest fit for a dynamic Next.js app with server-side rendering and route handlers.
- Neon is a strong fit for Prisma/PostgreSQL with explicit pooled and direct connection guidance.
- The architecture minimizes operational burden.
- It preserves GitHub `main` as source of truth.
- It avoids Abacus dependency.
- It can start small while keeping a path to paid production posture.

Budget interpretation:

- If this is treated as a commercial/professional Bexauri deployment, plan conservatively for Vercel Pro rather than Hobby.
- Neon Free may be acceptable for staging or a very small controlled beta if limits fit, but production should have a paid readiness check.
- If paid provider spend is not acceptable yet, continue local-only temporarily rather than forcing an unreliable free production deploy.

## 8. Proposed architecture

Staging/beta architecture:

- Source of truth: GitHub `main`.
- App host: Vercel project pointing at repo root with app root configured to `nextjs_space`.
- Build command: `npm run build` from `nextjs_space`.
- Runtime: Vercel Functions generated by Next.js.
- Database: Neon PostgreSQL.
- Runtime DB env: pooled `DATABASE_URL`.
- Schema/admin CLI DB env: direct connection variable kept separate, never printed, and used only in a dedicated authorized schema phase.
- Auth env: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
- Admin env: `ADMIN_EMAILS`.
- Rollback: Vercel deployment rollback to prior deployment/commit, plus database non-mutation discipline.
- Post-deploy check: read-only admin and app smoke verification.

Current repo caveat:

- The app imports an Abacus script in `app/layout.tsx`. This phase does not edit code. A future staging-readiness phase should verify whether that external script is acceptable, unavailable, unnecessary, or needs removal/replacement before non-Abacus deploy.

## 9. Non-goals

This phase does not:

- deploy;
- create Vercel, Neon, Render, or Railway accounts;
- create a database;
- migrate data;
- inspect `.env`;
- print secrets;
- change `next.config.js`;
- change package scripts;
- add provider config;
- run Prisma commands;
- change runtime behavior.

## 10. Data/database decision still required

Before any staging or production deploy, decide:

- whether the first non-Abacus database is a new controlled beta Neon database;
- whether old Abacus production data is accessible at all;
- whether any data must be preserved before public/internal use;
- whether staging uses disposable seed data or copied data;
- who enters secret values into the provider dashboards.

Do not copy, export, import, or migrate production data without a dedicated authorization phase.

## 11. Next implementation-safe phases

A. `MVP-DEPLOY-INDEPENDENCE-3 - Environment variable inventory and secret-handling checklist`

- Confirm required variable names, ownership, and input method.
- Do not print values.
- Decide staging vs production values.

B. `MVP-DEPLOY-INDEPENDENCE-4 - Vercel + Neon staging readiness`

- Define exact Vercel project settings.
- Define Neon database target.
- Confirm root directory, build command, environment names, and rollback.
- Decide whether any code/config change is required before staging.

C. `MVP-DEPLOY-INDEPENDENCE-5 - Non-Abacus staging deploy attempt`

- Only after explicit authorization.
- Create/use provider resources if authorized.
- Deploy staging/beta only.
- Run read-only verification.

D. `MVP-DEPLOY-INDEPENDENCE-6 - Production/beta deploy decision`

- Only after staging passes.
- Decide whether to expose to internal users.
- Confirm budget, rollback, auth, and DB state.

## 12. Stop conditions for future deploy

Stop before deploy if any condition appears:

- unclear DB target;
- missing `DATABASE_URL`;
- missing direct DB connection plan for Prisma schema operations;
- missing `NEXTAUTH_SECRET`;
- missing or incorrect `NEXTAUTH_URL`;
- missing `ADMIN_EMAILS`;
- unknown admin account/allowlist;
- schema drift;
- migration uncertainty;
- dev-prod promotion warning;
- destructive operation warning;
- no rollback path;
- no post-deploy admin verification path;
- provider requires code/package changes outside the authorized phase;
- budget or billing uncertainty.

## 13. Immediate recommendation

Should we deploy now?

- No.

Should we use Abacus now?

- No.

Preferred next step:

- Run `MVP-DEPLOY-INDEPENDENCE-3 - Environment variable inventory and secret-handling checklist`.

Preferred architecture for that next planning:

- Vercel app hosting + Neon PostgreSQL.

Fallback:

- If budget cannot support Vercel Pro/paid Neon readiness later, continue local-only temporarily rather than deploying production on unsuitable free-tier assumptions.

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
