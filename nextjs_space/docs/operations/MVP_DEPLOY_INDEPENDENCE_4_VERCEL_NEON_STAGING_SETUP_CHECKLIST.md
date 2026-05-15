# MVP-DEPLOY-INDEPENDENCE-4 - Vercel + Neon staging setup checklist

Date: 2026-05-15

## 1. Phase purpose

Convert the Vercel + Neon architecture decision into a concrete staging setup checklist.

This phase exists to:

- keep provider setup and deployment separate;
- avoid exposing secrets;
- avoid accidental production or database mutation;
- preserve GitHub `main` as the source of truth;
- prepare Mauricio for a later manual setup phase.

This phase does not create provider accounts, create a Vercel project, create a Neon database, configure environment variables, deploy, migrate/copy data, inspect `.env` values, print secrets, or change code.

## 2. Live baseline

Git preflight before this phase showed:

- HEAD = origin/main = `ff410af`.
- Last accepted commit = `MVP-DEPLOY-INDEPENDENCE-3: document env secret checklist`.
- Working tree expected clean.

Git preflight remains the live source of truth. If older deployment, handoff, index, or phase documents contain stale baselines, Git wins.

## 3. Current accepted deployment direction

Architecture verdict:

```text
ARCHITECTURE_SELECTED_VERCEL_NEON
```

Accepted direction:

- Vercel = future app host.
- Neon = future PostgreSQL provider.
- This is for staging/beta first.
- No deploy has occurred.
- No provider setup has occurred.
- Abacus is unavailable and not active.

## 4. Setup boundary

This phase only prepares a manual checklist for a later authorized setup phase.

It does not:

- create a Vercel project;
- create a Neon database;
- configure environment variables;
- deploy;
- migrate data;
- copy data;
- run Prisma commands;
- inspect `.env`;
- print secrets.

## 5. Pre-setup information checklist

Before provider setup, Mauricio should have:

- [ ] GitHub repo access confirmed.
- [ ] Target branch confirmed: `main`.
- [ ] App root confirmed: `nextjs_space`.
- [ ] Intended staging app name/project name chosen.
- [ ] Intended Neon project/database name chosen.
- [ ] Staging admin email(s) chosen for `ADMIN_EMAILS`.
- [ ] Staging URL plan understood: initial Vercel generated URL first, custom domain later.
- [ ] Budget boundary decided.
- [ ] Whether staging DB uses empty/minimal data decided.
- [ ] No attempt to use blocked Abacus dashboard/DB.
- [ ] No production students/external users involved.

## 6. Vercel project setup checklist for future phase

Future manual steps only. Do not execute in this phase.

- [ ] Sign in to Vercel account.
- [ ] Import GitHub repository.
- [ ] Select correct repository.
- [ ] Set root directory to `nextjs_space`.
- [ ] Confirm framework preset as Next.js if detected.
- [ ] Confirm build command: `npm run build` unless provider auto-detects correctly.
- [ ] Do not override output directory unless required.
- [ ] Do not set `NEXT_OUTPUT_MODE` unless a later phase requires it.
- [ ] Do not set `NEXT_DIST_DIR` unless a later phase requires it.
- [ ] Configure environment variables only after Neon staging DB and NextAuth values are ready.
- [ ] Disable/avoid production custom domain until staging passes.
- [ ] Do not trigger production deploy unless explicitly authorized by a later phase.
- [ ] If Vercel auto-triggers a preview deploy during import, document it and treat it as staging/preview only; do not connect production domain.

## 7. Neon project/database setup checklist for future phase

Future manual steps only. Do not execute in this phase.

- [ ] Sign in to Neon account.
- [ ] Create a new project for Bexauri staging/beta.
- [ ] Choose region deliberately.
- [ ] Create or use a staging database.
- [ ] Obtain pooled connection string for runtime `DATABASE_URL`.
- [ ] Identify direct/unpooled connection string only for future Prisma schema operations.
- [ ] Do not paste any connection string into Codex/ChatGPT/docs.
- [ ] Do not run migrations or `prisma db push` in this setup checklist phase.
- [ ] Do not import old Abacus production data.
- [ ] Confirm whether the database starts empty/minimal.
- [ ] Confirm backups/branching/cost limits if available, without making claims beyond verified provider UI.

## 8. Environment variable staging checklist

Names only. No values belong in docs, chat, terminal logs, screenshots, or commits.

For Vercel Preview/Staging:

- [ ] `DATABASE_URL` configured with pooled Neon runtime connection string.
- [ ] `NEXTAUTH_SECRET` generated and configured.
- [ ] `NEXTAUTH_URL` configured to staging URL after URL is known.
- [ ] `ADMIN_EMAILS` configured with staging admin email(s).
- [ ] `DIRECT_URL` not configured unless a later Prisma/schema phase requires it.
- [ ] `DATABASE_URL_UNPOOLED` not used by app runtime unless later mapped deliberately.
- [ ] `NEXT_DIST_DIR` left unset unless later needed.
- [ ] `NEXT_OUTPUT_MODE` left unset unless later needed.
- [ ] No secrets committed.
- [ ] No `.env` printed.
- [ ] No provider tokens printed.

## 9. Secret-handling confirmation format

Allowed progress report:

```text
Vercel project imported: yes
Root directory set to nextjs_space: yes
Neon staging DB created: yes
DATABASE_URL configured in Vercel Preview/Staging: yes
NEXTAUTH_SECRET configured in Vercel Preview/Staging: yes
NEXTAUTH_URL configured in Vercel Preview/Staging: yes
ADMIN_EMAILS configured in Vercel Preview/Staging: yes
No values printed.
```

Forbidden:

- raw database URLs;
- passwords;
- secret strings;
- screenshots showing secrets;
- copied `.env` blocks;
- provider tokens.

## 10. Staging DB data policy

Policy:

- First staging deployment should use a controlled staging/beta DB.
- Do not recover or use blocked Abacus DB in this phase.
- Do not import production data.
- Do not create beta/student data until a separate authorized data/seed phase.
- If a staging smoke check needs an admin user/student later, plan it separately.
- Any data seeding must be documented and authorized.

## 11. Auth/admin setup policy

Policy:

- `ADMIN_EMAILS` must include at least one authorized internal admin email.
- Staging admin account must exist or be creatable through a safe authorized path.
- Passwords must not be printed.
- If admin account creation/reset is needed after staging deploy, create a separate phase.
- `NEXTAUTH_URL` must match the staging URL exactly.
- `NEXTAUTH_SECRET` must remain stable for the staging environment.
- Do not test with external students.

## 12. Pre-deploy gate after setup

Before any future staging deploy attempt, require:

- [ ] GitHub `main` expected commit identified.
- [ ] Working tree clean.
- [ ] Provider setup checklist complete.
- [ ] Required env vars configured by name.
- [ ] No secrets exposed.
- [ ] Staging DB target confirmed.
- [ ] No schema/migration pending unless explicitly authorized.
- [ ] Rollback path understood.
- [ ] Post-deploy smoke verification plan ready.
- [ ] Budget/cost acknowledged.

## 13. Stop conditions

Future setup or deploy must stop if:

- Vercel cannot set `nextjs_space` as root or build from it.
- Provider asks for a command or code change not already approved.
- Neon DB target is unclear.
- `DATABASE_URL` / direct URL are confused.
- `NEXTAUTH_URL` is unknown or mismatched.
- `NEXTAUTH_SECRET` is missing.
- `ADMIN_EMAILS` is missing.
- Any secret appears in terminal/chat/docs/screenshots.
- Provider requires paid plan beyond approved budget.
- Provider asks for destructive DB operation.
- Schema drift/migration warning appears.
- No rollback path exists.
- No post-deploy admin verification path exists.
- Abacus access becomes a dependency.

If a secret is exposed, do not repeat the value. Stop, rotate the secret, and document only that exposure occurred.

## 14. Future phase plan

A. `MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon provider setup execution`

- Create/configure Vercel and Neon manually.
- Configure env vars manually.
- No deploy unless unavoidable preview deploy happens and is treated as staging.

B. `MVP-DEPLOY-INDEPENDENCE-6 - Staging deploy attempt`

- Explicitly authorized deploy.
- Use selected commit.
- Read-only smoke verification.

C. `MVP-DEPLOY-INDEPENDENCE-7 - Staging smoke verification and admin auth check`

- Verify admin access, `/admin`, cycle detail, and safe fallback.
- No student/external flow unless separately authorized.

D. `MVP-DEPLOY-INDEPENDENCE-8 - Production/beta decision`

- Only after staging passes.

## 15. Immediate recommendation

Should we deploy now?

- No.

Should we create provider accounts in this phase?

- No.

Should we prepare exact setup steps now?

- Yes.

Should the next phase be provider setup execution?

- Yes, if Mauricio is ready to create and enter provider configuration manually.

Should secrets be shared with Codex/ChatGPT?

- No.

Recommended next phase:

```text
MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon provider setup execution
```

## 16. Guardrails carried forward

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

Deployment/setup guardrails:

- no deploy without explicit phase authorization;
- no provider setup without explicit authorization;
- no production operation without explicit authorization;
- no schema/database mutation without dedicated authorization;
- no `.env` value inspection;
- no secrets printed;
- no improvised deploy command;
- no Abacus dependency while account/dashboard access is blocked.
