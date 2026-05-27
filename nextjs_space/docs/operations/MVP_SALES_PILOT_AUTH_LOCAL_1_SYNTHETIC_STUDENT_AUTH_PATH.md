# MVP-SALES-PILOT-AUTH-LOCAL-1 - Synthetic Student Auth Path

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-AUTH-LOCAL-1 - Decide and document synthetic student auth path for M1-first runtime dry-run
```

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = 5b59123
```

Latest accepted commit:

```text
5b59123 - MVP-SALES-PILOT-DRY-RUN-1I: execute one local runtime dry-run
```

Type:

```text
Decision/documentation only / no auth implementation / no DB mutation / no runtime.
```

## 2. Problem Observed

The local/dev pedagogical fixture for `PILOT_M1_001` exists and was documented as ready for a runtime dry-run:

```text
participantCode: PILOT_M1_001
syntheticEmail: pilot.m1.001@example.invalid
candidateStudyLoadTitle: PAES M1 - Entrada balanceada inicial
candidateStudyLoadContentKey: paes_m1_balanced_entry_initial
```

Created/located categories from the human-executed fixture apply:

* `User`
* `Student`
* `StudentAccess`
* `Program`
* `Enrollment`
* `LearningCycle`
* `enrollmentCurrentCycle`
* `StudyLoad`

Observed runtime blocker:

```text
AUTH_PATH_BLOCKED_FOR_SYNTHETIC_FIXTURE
```

The login UI asks for a password for `pilot.m1.001@example.invalid`.

## 3. Probable Cause

The fixture setup created or located the structural records needed for the M1 pilot path, but it did not prepare a usable CredentialsProvider password for the synthetic `User`.

Read-only inspection shows:

* NextAuth uses `CredentialsProvider`.
* Credentials auth requires `User.email` and a bcrypt-validated `User.password`.
* Signup creates `User`, `Student`, and `StudentAccess` with a hashed password.
* Signup rejects the request if either `User.email` or `Student.email` already exists.
* The existing fixture helper creates/locates the synthetic `User` for `pilot.m1.001@example.invalid` as part of the fixture chain, but the fixture path is not a signup flow and does not establish a login password.

Therefore, `PILOT_M1_001` has pedagogical/access structure but lacks a safe local/dev credential path for runtime login.

## 4. Surfaces Inspected

Read-only surfaces inspected:

* `nextjs_space/app/api/auth/login/route.ts`
* `nextjs_space/app/api/auth/[...nextauth]/route.ts`
* `nextjs_space/app/api/signup/route.ts`
* `nextjs_space/app/login/page.tsx`
* `nextjs_space/app/login/_components/login-form.tsx`
* `nextjs_space/app/signup/page.tsx`
* `nextjs_space/app/signup/_components/signup-form.tsx`
* `nextjs_space/lib/auth-options.ts`
* `nextjs_space/lib/prisma.ts`
* `nextjs_space/prisma/schema.prisma`
* focused read-only inspection of `nextjs_space/scripts/m1-pilot-dry-run-fixture.ts`

No `.env` files, raw env values, database URLs, tokens, cookies, headers, hashes, passwords, provider targets, staging, or production surfaces were inspected.

## 5. Options Evaluated

### Option 1 - UI signup local-first

Use `/signup` in local/dev with synthetic participant data and a synthetic local-only password.

Strengths:

* Most representative of the real student-product account bootstrap circuit.
* Exercises the current public student signup and CredentialsProvider login path.
* Produces a `User.password` using the same application flow that a real student would use.
* Useful for future participants when the account does not already exist.

Limits:

* For `PILOT_M1_001`, signup now collides with existing `User` and `Student` records.
* It does not by itself create the PAES_M1 enrollment, cycle, or StudyLoad needed for the dry-run.
* It creates default `StudentAccess` with no-access state, so pilot access/enrollment setup still needs a controlled fixture/admin step.

### Option 2 - Guarded local/dev helper to complete or reset synthetic credential

Add a narrowly guarded local/dev helper mode in a future phase to set or reset a bcrypt password only for the existing synthetic `User`:

```text
pilot.m1.001@example.invalid
```

The password must be synthetic, local-only, non-real, and never committed or printed. The helper must refuse any non-`.example.invalid` email and any target other than `LOCAL_DEV_CONFIRMED`.

Strengths:

* Minimal intervention for the existing `PILOT_M1_001` fixture.
* Avoids duplicate `User`, `Student`, or `StudentAccess` records.
* Compatible with the current CredentialsProvider model.
* Preserves the already-created StudyLoad/cycle/enrollment fixture.

Limits:

* Less representative of self-serve signup than UI signup.
* Requires strict guardrails so a credential reset helper cannot become a general auth mutation tool.
* Must avoid printing password, hash, tokens, sessions, DB target details, or IDs.

### Option 3 - Local controlled auth fixture route

Add a local-only route or fixture login bypass for synthetic participants.

Strengths:

* Could be fast for repeated dry-runs.
* Could avoid manual password handling.

Limits:

* Less representative of the student-product circuit.
* Higher risk of creating an auth bypass pattern that must never exist in staging or production.
* Adds application surface area rather than using the existing CredentialsProvider.
* Requires more security review than the current dry-run needs.

## 6. Risks by Option

Option 1 risks:

* Duplicate/collision risk for `PILOT_M1_001` because records already exist.
* Can accidentally validate only signup while leaving the M1 fixture chain unprepared.
* If used after a fixture apply, it may force cleanup/rebuild decisions.

Option 2 risks:

* Credential mutation must be tightly scoped to synthetic local/dev data.
* Password handling must be private and non-committed.
* The helper must stop if it sees real data, non-fixture names, non-`.example.invalid` emails, staging/production ambiguity, or missing confirmation flags.

Option 3 risks:

* Auth bypass could drift into unsafe product behavior.
* It would not validate the current CredentialsProvider.
* It increases implementation surface for a temporary local dry-run need.

## 7. Recommended Decision

Decision:

```text
USE_TWO_TRACK_SYNTHETIC_AUTH_POLICY
```

Recommended policy:

1. For future vertical tests that need to validate the real student-product account circuit, prefer local/dev UI signup first.
2. For the already-created `PILOT_M1_001` fixture, do not use UI signup because the current app correctly rejects duplicate `User` or `Student` emails.
3. Complete the existing `PILOT_M1_001` auth path in a future phase by adding or using a guarded local/dev-only credential completion/reset helper for the existing synthetic `User`.
4. Do not create a local auth bypass route unless CredentialsProvider-based login cannot be made safe.

## 8. Recommended Path for `PILOT_M1_001`

Recommended next technical path:

```text
COMPLETE_SYNTHETIC_CREDENTIAL_FOR_EXISTING_FIXTURE_USER
```

Future phase should:

* verify clean baseline and `LOCAL_DEV_CONFIRMED`;
* confirm the target email is exactly `pilot.m1.001@example.invalid`;
* locate the existing synthetic `User`;
* verify matching synthetic `Student` exists;
* refuse any non-fixture collision;
* set or reset only the synthetic local/dev password hash;
* never print the password, hash, env values, DB URL, session, cookie, token, or sensitive ID;
* run no browser/runtime in the credential setup phase unless separately authorized;
* document only coarse result markers.

This preserves the current fixture chain and minimizes the chance of duplicate account/access records.

## 9. Recommended Path for Future `PILOT_M1_002` and `PILOT_M1_003`

Recommended default for future synthetic participants:

```text
SIGNUP_FIRST_THEN_ATTACH_M1_FIXTURE_CHAIN
```

Meaning:

1. Use local/dev UI signup or the existing signup API through the app path with synthetic `.example.invalid` data.
2. Use a private synthetic local-only password that is not committed or printed.
3. After signup creates `User`, `Student`, and `StudentAccess`, use a controlled fixture/admin setup phase to attach PAES_M1 enrollment, open LearningCycle, and pending StudyLoad.
4. Avoid creating `User` or `Student` directly in the fixture helper when the purpose is to validate signup.

This better validates the student account bootstrap path and avoids retrofitting credentials after structural fixture creation.

## 10. Guardrails

Future credential or signup phases must:

* remain local/dev only;
* require explicit `LOCAL_DEV_CONFIRMED`;
* use only `.example.invalid` synthetic emails;
* never use real student names, emails, phones, RUTs, support notes, consent data, or payment data;
* never print passwords, password hashes, cookies, tokens, headers, database URLs, connection strings, hostnames, provider targets, or env values;
* never inspect `.env` contents in chat;
* never touch staging or production;
* never run Prisma CLI, SQL, migrations, reset, seed, or destructive operations unless separately authorized in a future phase;
* stop on any collision with non-fixture data;
* keep credential setup separate from StudyLoad runtime execution;
* keep payment/trial/subscription inactive;
* avoid L1/M2 activation or readiness claims.

## 11. Recommended Next Phase

Recommended next phase for the existing blocked runtime path:

```text
MVP-SALES-PILOT-AUTH-LOCAL-2 - Implement guarded synthetic credential setup for PILOT_M1_001
```

Roadmap gate:

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go
Sales-ready relevance: direct/high for closed-pilot runtime readiness; indirect for full self-serve sales readiness
Dependency: MVP-SALES-PILOT-AUTH-LOCAL-1 decision and existing PILOT_M1_001 fixture
What it advances: safe local/dev auth readiness for the first one-participant M1 runtime dry-run
What it does not advance: production auth, public signup readiness, payment/trial, L1/M2 activation, real student pilot execution, or Sales-Ready approval
Priority verdict: APPROVED_AUTH_FIXTURE_GATE
Authorization status: requires explicit Mauricio authorization
```

After `PILOT_M1_001` can authenticate locally, retry the one-participant runtime dry-run.

For `PILOT_M1_002` and `PILOT_M1_003`, use a later signup-first fixture phase if the objective is to validate the real account bootstrap path.

## 12. Explicit Non-actions

This phase did not:

* implement auth changes;
* run signup;
* reset or set a password;
* mutate DB;
* run Prisma CLI;
* run SQL;
* run browser/runtime;
* open `/now`;
* start, answer, or complete a StudyLoad;
* inspect admin runtime evidence;
* touch staging or production;
* inspect `.env` or secret-bearing files;
* print DB URLs, connection strings, hostnames, provider targets, tokens, cookies, headers, hashes, passwords, or credentials;
* create fixtures for `PILOT_M1_002` or `PILOT_M1_003`;
* use or commit real student data;
* activate payment or trial;
* approve product/student use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready.

Result marker:

```text
MVP_SALES_PILOT_AUTH_LOCAL_1_SYNTHETIC_AUTH_PATH_DECIDED
```
