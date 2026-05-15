# MVP-DEPLOY-INDEPENDENCE-3 - Environment variable inventory and secret-handling checklist

Date: 2026-05-15

## 1. Phase purpose

Prepare Vercel + Neon staging/beta secret handling before any provider setup or deploy.

This phase exists to:

- identify required environment variable names and categories;
- define where each variable belongs;
- avoid exposing secrets in Codex, ChatGPT, Git, docs, logs, screenshots, or terminal output;
- keep provider setup and deploy separate from this phase;
- preserve GitHub `main` as the source of truth.

This phase does not deploy, create provider accounts, configure Vercel, configure Neon, inspect `.env` values, print secrets, change code, or mutate any database.

## 2. Live baseline

Git preflight before this phase showed:

- HEAD = origin/main = `adf435b`.
- Last accepted commit = `MVP-DEPLOY-INDEPENDENCE-2: select Vercel Neon architecture`.
- Working tree expected clean.

Git preflight remains the live source of truth. If older deployment, handoff, index, or phase documents contain stale baselines, Git wins.

## 3. Selected architecture context

Architecture verdict:

```text
ARCHITECTURE_SELECTED_VERCEL_NEON
```

Selected planning architecture:

- Vercel = future app host.
- Neon = future PostgreSQL provider.
- Selection is for staging/beta architecture planning.
- No deploy has occurred.
- No provider setup has occurred.
- Abacus is unavailable and not active.

## 4. Environment variable inventory

No values were read, requested, printed, or stored. This table is names and handling only.

| Variable name | Required for staging? | Required for production/beta? | Provider/location | Purpose | Source/owner | Secret? | Build-time/runtime/both | Notes/risks |
|---|---:|---:|---|---|---|---|---|---|
| `DATABASE_URL` | Yes | Yes | Vercel environment variable | Runtime database connection used by Prisma. For Vercel + Neon, should be the pooled Neon connection string for app runtime. | Mauricio obtains from Neon and enters into Vercel. | Yes | Runtime; may also be present at build if Prisma/client code needs it. | Never print. Do not use direct/unpooled URL for serverless runtime unless a later phase explicitly changes policy. |
| `DIRECT_URL` | No, unless a later Prisma schema/migration phase needs it | Conditional | Vercel secret only if later tooling/config uses this name; otherwise keep outside app runtime | Direct Neon database connection reserved for Prisma CLI schema operations/migrations. | Mauricio obtains from Neon only in a dedicated schema/setup phase. | Yes | Future schema/migration operation only | Current Prisma schema does not read `DIRECT_URL`. Do not add or rely on it without a separate code/schema/config phase. |
| `DATABASE_URL_UNPOOLED` | Conditional/provider-generated | Conditional/provider-generated | Neon/Vercel integration may create this as a direct connection alias | Direct/unpooled connection alias for tools requiring direct database access. | Provider integration/Mauricio. | Yes | Future schema/migration operation only | Do not assume current code reads it. Do not confuse with runtime `DATABASE_URL`. |
| `NEXTAUTH_SECRET` | Yes | Yes | Vercel environment variable | Stable NextAuth secret for signing/encrypting auth state. | Mauricio generates manually or via provider/documented secure method and enters into Vercel. | Yes | Runtime | Must be stable across deploys for the same environment. Never print. |
| `NEXTAUTH_URL` | Yes | Yes | Vercel environment variable | Canonical deployed URL used by NextAuth and app metadata. | Mauricio/Vercel setup phase. | No, but controlled | Runtime; may affect metadata generation | Staging URL first, production URL later. Must exactly match deployed environment URL. |
| `ADMIN_EMAILS` | Yes | Yes | Vercel environment variable | Comma-separated admin allowlist used by `lib/admin-guard.ts`. | Mauricio chooses/admin owner enters into Vercel. | Sensitive-ish | Runtime | Must include at least one intended admin. Avoid broad exposure in docs/screenshots. Missing value denies admin access. |
| `NEXT_DIST_DIR` | No | No | Vercel env only if later needed | Optional Next.js output directory override referenced by `next.config.js`. | Deployment architect only if provider requires it. | No | Build/runtime configuration | Probably not needed for Vercel. Do not set unless a later phase justifies it. |
| `NEXT_OUTPUT_MODE` | No | No | Vercel env only if later needed | Optional Next.js output mode override referenced by `next.config.js`. | Deployment architect only if provider requires it. | No | Build/runtime configuration | Do not set unless deployment architecture requires it. Incorrect values can change build output behavior. |
| Vercel system variables | Provider-managed | Provider-managed | Vercel | Deployment metadata, URLs, commit metadata, and platform context. | Vercel. | Usually no, but treat as controlled | Build/runtime depending on variable | Do not hardcode assumptions until setup phase. |
| Neon integration variables | Conditional | Conditional | Vercel/Neon integration | May include pooled/direct PostgreSQL aliases such as `DATABASE_URL` and `DATABASE_URL_UNPOOLED`. | Neon/Vercel integration. | Yes for connection strings | Runtime or future schema operation | Only map variables deliberately. Do not expose connection strings. |
| OAuth/provider secrets | No | No unless future auth provider is added | Vercel environment variable | Future OAuth authentication provider credentials. | Mauricio/provider dashboard. | Yes | Runtime | Current inspected auth uses CredentialsProvider; do not introduce OAuth secrets without a separate auth phase. |
| Domain/DNS settings | No for initial generated staging URL | Yes if custom production domain is used | Vercel/domain registrar/DNS provider | Custom domain routing and canonical URL. | Mauricio/provider setup. | Usually no, but controlled | Runtime via `NEXTAUTH_URL`; provider config | No DNS/domain changes in this phase. |
| `EE_PROBE_BASE` | No | No | Local/test-only if ever used | Probe script base URL fallback. | Developer/test phase. | No | Test script runtime | Not required for Vercel app runtime. Do not configure for staging unless a later probe phase authorizes it. |

## 5. Do-not-store list

The following must never be committed or pasted into Codex, ChatGPT, GitHub issues, docs, screenshots, terminal output, or logs:

- `DATABASE_URL`;
- `DIRECT_URL`;
- `DATABASE_URL_UNPOOLED`;
- `NEXTAUTH_SECRET`;
- database usernames/passwords;
- Neon connection strings;
- Vercel tokens;
- provider API keys;
- cookies/session tokens;
- `.env` file contents;
- production admin password;
- any OAuth client secrets.

## 6. Manual secret entry protocol

Mauricio should handle secrets as follows:

1. Create or obtain the secret in the relevant provider dashboard or documented secure generator.
2. Paste the secret only into Vercel/Neon dashboard secret fields.
3. Do not paste the secret into Codex, ChatGPT, GitHub issues, docs, commits, screenshots, terminal logs, or copied command output.
4. If Codex needs confirmation, report only:
   - variable name configured: yes/no;
   - environment: staging/preview/production;
   - no value.
5. Use checklists with variable names and blank values only.

Allowed confirmation format:

```text
DATABASE_URL configured for Vercel Preview/Staging: yes
NEXTAUTH_SECRET configured for Vercel Preview/Staging: yes
ADMIN_EMAILS configured for Vercel Preview/Staging: yes
No values printed.
```

## 7. Vercel environment strategy

Intended environment split:

- Development/local remains local `.env`-style configuration and is not inspected here.
- Preview/Staging should receive staging Neon DB values and staging `NEXTAUTH_URL`.
- Production should not be configured until staging passes.
- Do not mix staging DB and production app URL.
- Do not mix production DB and preview deployments.
- Configure root directory as `nextjs_space` in a later provider setup phase.
- Build command is likely `npm run build` from `nextjs_space`.
- Start command should be provider-managed for Vercel; do not force a custom start command unless a later phase proves it is needed.

Vercel environment categories should be treated separately:

- Preview/Staging: staging Neon DB, staging URL, staging admin allowlist.
- Production: production/beta DB and production/beta URL only after explicit authorization.

## 8. Neon database strategy

The first non-Abacus deployment should use a new controlled staging/beta Neon database, not an inaccessible Abacus database.

Policy:

- Runtime should use a pooled Neon connection string in `DATABASE_URL`.
- Direct/unpooled connection should be reserved for explicit Prisma schema/migration operations in dedicated phases.
- No `prisma db push`, migrations, reset, or SQL in this phase.
- No production data migration in this phase.
- If the existing Abacus database is inaccessible, do not attempt recovery here.
- Do not copy production data into Neon without a separate authorization, backup/export plan, and secret-handling protocol.

## 9. Admin/auth checklist

Before provider setup or staging deploy, confirm:

- At least one admin email is selected for `ADMIN_EMAILS`.
- The admin email belongs to an authorized internal operator.
- A matching `User` exists or can be created through an authorized app flow after deploy.
- Password/reset/access flow for staging admin is known without printing passwords.
- `NEXTAUTH_URL` exactly matches the deployed staging URL.
- `NEXTAUTH_SECRET` is stable across deploys for that environment.
- Auth testing uses internal/admin accounts only.
- Do not test auth with external students.

## 10. Environment setup checklist for future phase

Future `MVP-DEPLOY-INDEPENDENCE-4` or setup phase checklist:

- [ ] Vercel project created/imported from GitHub.
- [ ] Root directory set to `nextjs_space`.
- [ ] Build command confirmed.
- [ ] Neon staging DB created.
- [ ] `DATABASE_URL` configured with pooled Neon URL.
- [ ] Direct DB URL stored separately only if/when needed.
- [ ] `NEXTAUTH_SECRET` generated and configured.
- [ ] `NEXTAUTH_URL` configured to staging URL.
- [ ] `ADMIN_EMAILS` configured.
- [ ] No secrets committed.
- [ ] No `.env` printed.
- [ ] Staging deploy authorized separately.

## 11. Stop conditions

Future provider setup or deploy must stop if:

- any required env var is missing;
- `NEXTAUTH_URL` is unknown or mismatched;
- admin allowlist is unknown;
- DB target is unclear;
- provider asks for destructive DB action;
- Prisma direct/pool URLs are confused;
- schema drift appears;
- migration uncertainty appears;
- no rollback path exists;
- no post-deploy admin check is possible;
- provider cost/billing exceeds approved budget;
- any secret was accidentally printed.

If any secret is accidentally printed, stop, document only that an exposure occurred without repeating the value, rotate the exposed secret, and restart from a clean secret-handling phase.

## 12. Next recommended phases

A. `MVP-DEPLOY-INDEPENDENCE-4 - Vercel + Neon staging setup checklist`

- Provider project/account setup plan.
- No deploy unless explicitly authorized.

B. `MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon staging deploy attempt`

- Only after secrets/config checklist is complete.
- Deploy staging only.

C. `MVP-DEPLOY-INDEPENDENCE-6 - Post-staging smoke verification`

- Admin login, `/admin`, cycle detail, `/now`, and no-mutation checks.

D. `MVP-DEPLOY-INDEPENDENCE-7 - Production/beta deploy decision`

- Only after staging passes.

## 13. Immediate recommendation

Should we deploy now?

- No.

Should we create provider accounts in this phase?

- No.

Should we inspect `.env` values?

- No.

Should we prepare a secret-handling checklist before provider setup?

- Yes.

Recommended next phase:

```text
MVP-DEPLOY-INDEPENDENCE-4 - Vercel + Neon staging setup checklist
```

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

Deployment/secret guardrails:

- no deploy without explicit phase authorization;
- no provider setup without explicit authorization;
- no production operation without explicit authorization;
- no schema/database mutation without dedicated authorization;
- no `.env` value inspection;
- no secrets printed;
- no improvised deploy command;
- no Abacus dependency while account/dashboard access is blocked.
