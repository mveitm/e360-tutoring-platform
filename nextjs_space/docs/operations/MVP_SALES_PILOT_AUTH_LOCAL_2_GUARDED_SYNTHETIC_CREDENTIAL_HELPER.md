# MVP-SALES-PILOT-AUTH-LOCAL-2 - Guarded Synthetic Credential Helper

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-AUTH-LOCAL-2 - Implement guarded synthetic credential setup helper for PILOT_M1_001
```

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = 6b67480
```

Latest accepted commit:

```text
6b67480 - MVP-SALES-PILOT-AUTH-LOCAL-1: decide synthetic student auth path
```

Type:

```text
Implementation of local/dev helper / no credential reset executed / no runtime / no DB mutation in this phase.
```

## 2. Objective

Create a guarded local/dev helper that can later prepare a CredentialsProvider-compatible synthetic credential for the existing `PILOT_M1_001` fixture user:

```text
pilot.m1.001@example.invalid
```

This phase creates the helper and documents its safe future use. It does not execute the credential reset, does not know any human password, and does not mutate the database.

## 3. Surfaces Inspected

Read-only inspection covered:

* `nextjs_space/app/api/signup/route.ts`.
* `nextjs_space/lib/auth-options.ts`.
* `nextjs_space/scripts/local-dev-db-availability-check.ts`.
* `nextjs_space/scripts/m1-pilot-dry-run-fixture.ts`.
* `nextjs_space/scripts/lib/load-local-env-private.ts`.
* `nextjs_space/package.json`.
* `nextjs_space/prisma/schema.prisma`.
* Auth/signup/login file listings.
* Scripts file listing.

Relevant findings:

* `User.password` is the credential hash field.
* Signup hashes passwords with `bcrypt.hash(password, 10)`.
* CredentialsProvider validates login with `bcrypt.compare`.
* Existing local/dev scripts already use `loadLocalEnvPrivate()` to load local env without printing values.
* The `PILOT_M1_001` fixture created the user/student structure but not a usable credential.

No `.env` contents, raw env values, database URLs, hostnames, provider targets, cookies, tokens, headers, hashes, passwords, staging, or production values were inspected.

## 4. Implementation Decisions

Decision:

```text
ADD_GUARDED_LOCAL_DEV_CREDENTIAL_HELPER
```

Implementation choices:

* Add a standalone helper under `nextjs_space/scripts`.
* Keep `help` and `plan` modes non-mutating and non-DB.
* Gate future `apply` mode behind explicit local/dev confirmation flags.
* Restrict the target to `PILOT_M1_001` and `pilot.m1.001@example.invalid`.
* Require a private local shell variable for the synthetic password:

```text
BEXAURI_SYNTHETIC_STUDENT_PASSWORD
```

* Never hardcode a password.
* Never print the password or resulting bcrypt hash.
* Use bcrypt cost `10`, matching signup.
* Use lazy Prisma Client import only inside guarded `apply`.
* Refuse if the existing `User` or `Student` does not match the expected synthetic fixture shape.

## 5. Helper Created

Created:

```text
nextjs_space/scripts/setup-pilot-m1-synthetic-credential.ts
```

Supported modes:

```text
--mode help
--mode plan
--mode apply
```

Non-mutating validation command used in this phase:

```powershell
cd nextjs_space
.\node_modules\.bin\tsx.cmd scripts/setup-pilot-m1-synthetic-credential.ts --mode help
.\node_modules\.bin\tsx.cmd scripts/setup-pilot-m1-synthetic-credential.ts --mode plan --target-class LOCAL_DEV_CONFIRMED --participant-code PILOT_M1_001 --email pilot.m1.001@example.invalid --confirm-no-real-data --confirm-no-production --confirm-no-staging
cd ..
```

The `apply` mode was intentionally not run.

## 6. Security Guardrails

The helper:

* defaults to `pilot.m1.001@example.invalid`;
* accepts only `PILOT_M1_001`;
* accepts only the target email `pilot.m1.001@example.invalid`;
* requires the email to end in `.example.invalid`;
* requires `--target-class LOCAL_DEV_CONFIRMED`;
* requires `--confirm-no-real-data`;
* requires `--confirm-no-production`;
* requires `--confirm-no-staging`;
* requires `--confirm-local-dev-mutation` for future apply;
* refuses production, preview, or staging runtime labels when available;
* loads local env privately only in future `apply`;
* imports Prisma Client only inside future guarded `apply`;
* does not create users or students;
* refuses if the expected synthetic `User` does not exist;
* refuses if the matching synthetic `Student` does not exist;
* refuses if records do not match the fixture shape;
* prints only safe coarse result markers.

The helper does not print:

* password;
* bcrypt hash;
* `DATABASE_URL`;
* `PROD_DATABASE_URL`;
* env values;
* connection strings;
* hostnames;
* provider target names;
* credentials;
* tokens;
* cookies;
* headers;
* sensitive IDs.

## 7. What It Does

Future guarded `apply` mode will:

1. Verify local/dev confirmation flags.
2. Confirm participant and email are the exact approved synthetic target.
3. Privately load local env for the Node process.
4. Refuse production/staging-like runtime labels if present.
5. Read the private synthetic password from `BEXAURI_SYNTHETIC_STUDENT_PASSWORD`.
6. Locate the existing synthetic `User`.
7. Locate the matching synthetic `Student`.
8. Hash the password with bcrypt cost `10`.
9. Update only `User.password` for the existing synthetic user.
10. Disconnect Prisma.
11. Print only a safe success/failure summary.

## 8. What It Does Not Do

The helper does not:

* run automatically;
* execute in this phase;
* create `User`;
* create `Student`;
* create `StudentAccess`;
* create enrollment, LearningCycle, or StudyLoad records;
* change access, trial, subscription, payment, L1, M2, or StudyLoad state;
* create sessions;
* log in;
* open `/now`;
* start, answer, or complete StudyLoads;
* run browser/runtime;
* touch staging or production;
* print secrets or credential material.

## 9. Future Human Local Execution

Future execution requires a separate authorized phase.

Expected future command shape:

```powershell
cd nextjs_space
$env:BEXAURI_SYNTHETIC_STUDENT_PASSWORD='<private synthetic local-only password>'
.\node_modules\.bin\tsx.cmd scripts/setup-pilot-m1-synthetic-credential.ts --mode apply --target-class LOCAL_DEV_CONFIRMED --participant-code PILOT_M1_001 --email pilot.m1.001@example.invalid --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-local-dev-mutation
Remove-Item Env:\BEXAURI_SYNTHETIC_STUDENT_PASSWORD
cd ..
```

Rules:

* The password value must not be pasted into chat, docs, commit messages, screenshots, logs, or reports.
* The password value must be synthetic and local-only.
* The command must not be run against staging or production.
* If the helper blocks, document only the safe redacted result.

## 10. Verification Without Printing Secrets

Safe checks:

* `--mode help`.
* `--mode plan`.
* `git diff --check`.
* `git status --short`.
* `git diff --stat`.

Do not run `apply` during helper implementation review.

After a future authorized apply, verification should use only:

* safe helper result markers;
* local login test with the private synthetic password;
* no password/hash/session/cookie/token output.

## 11. Residual Risks

Residual risks:

* The helper can mutate `User.password` if future operators provide all confirmation flags and a password env var.
* A future run still depends on the local/dev DB target being correct and reachable.
* A future runtime login still needs local app/browser execution and may expose separate auth/session blockers.
* The helper intentionally does not solve the signup-first path for `PILOT_M1_002` or `PILOT_M1_003`.

Mitigations:

* exact participant/email restriction;
* `.example.invalid` enforcement;
* local/dev confirmation flags;
* production/staging label refusal;
* no create behavior;
* no secret printing;
* separate future execution authorization.

## 12. Next Phase Recommended

Recommended next phase:

```text
MVP-SALES-PILOT-AUTH-LOCAL-3 - Execute guarded synthetic credential setup for PILOT_M1_001
```

That phase should run the helper `apply` mode only after Mauricio provides the non-secret local/dev confirmation and privately sets `BEXAURI_SYNTHETIC_STUDENT_PASSWORD` in the local shell.

After the credential is set, retry:

```text
MVP-SALES-PILOT-DRY-RUN-1I-RETRY - Execute one-participant local/dev runtime dry-run
```

## Result Marker

```text
MVP_SALES_PILOT_AUTH_LOCAL_2_GUARDED_CREDENTIAL_HELPER_IMPLEMENTED
```
