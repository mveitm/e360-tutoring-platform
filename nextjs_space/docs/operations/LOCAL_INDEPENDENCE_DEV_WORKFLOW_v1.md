# LOCAL INDEPENDENCE DEV WORKFLOW v1

Status: Active local development protocol.

Purpose:
This document defines the safe local development workflow for E360 / Bexauri after validating that the platform can run outside Abacus with Neon dev, local authentication, student flow, activity submission, self-report, and admin evidence review.

The goal is to reduce operational dependency on Abacus while preserving custody discipline, Git cleanliness, and strict separation between local/dev and production.

## 1. Current baseline

Validated baseline:

- b4cec48 — LOCAL-INDEPENDENCE-5: validate local student flow with Neon dev.
- Local repo clean and synchronized with origin/main.
- Next.js app builds and runs locally outside Abacus.
- Dependencies installed locally with npm.
- Prisma Client generated locally.
- Neon dev DB available and schema applied.
- Local admin login works.
- /admin loads locally.
- /now loads locally.
- Minimal local student flow validated end-to-end:
  - student login
  - /now
  - pending StudyLoad
  - activity viewer
  - Empezar
  - MC answer submission
  - Terminar
  - self-report
  - admin evidence review

## 2. Hard boundaries

The local independence workflow must not cross these boundaries:

- Do not use production DB.
- Do not run deploy.
- Do not use Abacus unless explicitly reintroduced for a bounded task.
- Do not print .env, DATABASE_URL, passwords, tokens, connection strings, or secrets.
- Do not commit .env, backups, local DB exports, node_modules, .next, package manager artifacts created accidentally, logs, or generated temp scripts.
- Do not run destructive DB reset commands unless a dedicated dev-only reset phase explicitly authorizes it.
- Do not run SQL manually unless explicitly approved.
- Do not restore Abacus backup into Neon dev unless a dedicated restore phase is opened.

## 3. Standard local start checklist

From repo root:

- git status
- git log -1 --oneline

Expected:

- branch main
- up to date with origin/main
- working tree clean

Then from nextjs_space:

- npm run dev

Open:

- http://localhost:3000

Recommended browser session split:

- normal browser: admin session
- incognito/private window: student session

## 4. Safe env verification

Never print env values.

Allowed checks:

- Test whether .env.local-neon exists.
- Test whether DATABASE_URL key is present.
- Test connectivity to Neon host only with Test-NetConnection.
- Do not paste full connection strings into chat or logs.

## 5. Safe Prisma usage

Allowed in local/dev:

- npx prisma generate

Allowed only in a dedicated local/dev schema phase:

- npx prisma db push

Not allowed during ordinary feature/debug phases:

- npx prisma db push --force-reset
- npx prisma migrate reset

Any destructive or schema-changing command requires a named phase and explicit confirmation that the target is Neon dev, not production.

## 6. Minimal local student flow reference

The validated local student flow uses:

- Student email: estudiante.local@bexauri.dev
- Student name: Estudiante Local
- Program: PAES_M1
- Cycle: Cycle 1
- StudyLoad title: PAES M1 — Ecuaciones lineales básicas
- Content key: paes_m1_linear_equations_basic
- Content version: v1

Validated student path:

login -> /now -> Ver actividad pending -> Empezar -> Ver actividad enabled -> answer 8/8 -> Enviar respuestas -> Volver a /now -> Terminar -> self-report

Validated admin path:

/admin/learning-cycles -> Cycle detail -> completed StudyLoad -> self-report -> MC evidence

Expected admin evidence:

- Autorreporte: Me fue bien
- Respondidas: 8 de 8
- Correctas: 8 de 8
- Contenido: paes_m1_linear_equations_basic (v1)

## 7. Seed protocol

Current policy:

- Seed scripts may be used temporarily for Neon dev only.
- Seed scripts should be created as temporary files.
- Seed scripts must not print secrets.
- Passwords must be passed through non-echo terminal input or ephemeral environment variables.
- Temporary seed scripts must be deleted before commit unless a dedicated phase approves keeping a sanitized reusable script.

Safe lifecycle:

create temp seed script -> run against Neon dev -> validate UI -> delete temp seed script -> git status -> commit documentation only or approved source changes

Current preference:
Keep seed logic temporary until the product has a deliberate, reusable dev seed design.

## 8. Reset protocol

No reset is currently authorized.

Future safe reset protocol should be created as a separate phase before execution.

Minimum requirements for any future reset:

- Phase name must explicitly include DEV RESET.
- Confirm target is Neon dev.
- Confirm production is not referenced.
- Confirm no production URL, production DB, or production env is loaded.
- Snapshot/export Neon dev if useful.
- Run reset only after command review.
- Recreate minimal admin/student data.
- Validate /admin, /now, activity viewer, MC submission, and admin evidence.
- Document result in PHASE_LOG.md.

Prohibited without dedicated phase:

- npx prisma db push --force-reset
- npx prisma migrate reset

## 9. Git custody protocol

Before work:

- git status
- git log -1 --oneline

During work:

- git status --short
- git diff --stat

Before commit:

- git status --short
- git diff --check

Artifact checks:

- git ls-files .logs
- git ls-files nextjs_space/node_modules
- git ls-files nextjs_space/yarn.lock
- git ls-files "*.env"
- git ls-files "*.docx"
- git ls-files "*.pdf"

Never commit:

- .env
- .env.local-neon
- DB backups
- decoded Abacus exports
- passwords
- logs
- generated checkpoint artifacts
- node_modules
- .next
- temp scripts containing operational credentials or local-only data

## 10. Recommended phase progression

Recommended next local independence phases:

1. LOCAL-INDEPENDENCE-6B
   - Optional: create sanitized reusable local seed script.
   - Must not include secrets.
   - Must require explicit password input.
   - Must clearly target local/dev only.

2. LOCAL-INDEPENDENCE-6C
   - Optional: create safe read-only local verification script.
   - Should report counts/statuses only.
   - Must not print secrets.

3. LOCAL-INDEPENDENCE-7
   - Begin small local-first UX hardening work.
   - Candidate UX issues:
     - spacing: Ciclo 1Abierto
     - spacing: Ecuaciones lineales20–30 minutos
     - cramped MC option labels: A5, B7
     - admin MC item order: q8, q1, q2...

## 11. Operational conclusion

E360 / Bexauri now has a validated local development base sufficient for safe MVP iteration outside Abacus.

Correct posture:

- local-first for small development and validation
- Abacus only for bounded tasks where still useful
- production only through explicit deployment phases
- Neon dev as the controlled local/dev database
- PHASE_LOG as operational memory
- GitHub main as custody source of truth
