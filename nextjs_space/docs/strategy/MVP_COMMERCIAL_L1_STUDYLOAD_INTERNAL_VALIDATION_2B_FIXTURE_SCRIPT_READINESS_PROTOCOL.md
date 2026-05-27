# MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2B - Fixture Script Readiness Protocol

## 1. Phase Identity And Scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2B - Define fixture script/readiness protocol
```

Type:

```text
Documentation/readiness only / future local-dev DB fixture protocol / no DB execution.
```

Mission:

Convert the `INTERNAL-VALIDATION-2` local/dev DB-backed validation plan into an execution-safe fixture tooling contract for a future phase. This protocol defines how a future controlled PAES_L1 fixture run should confirm target safety, create only narrow local/dev fixture rows, record created ids, stop on collisions, validate expected surfaces, and clean up without touching M1 or non-fixture data.

## 2. Baseline And Context Gate Summary

Baseline expected and matched by Git preflight:

```text
HEAD = origin/main = origin/HEAD = f33a491
```

Latest accepted commit:

```text
f33a491 - MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2: plan local L1 fixture validation
```

Context Gate summary:

* `PHASE_LOG.md` was read through the recent L1 validation chain.
* `INTERNAL-VALIDATION-2`, `INTERNAL-VALIDATION-1`, `INTERNAL-IMPLEMENTATION-1A`, the PAES_L1 blueprint, implementation-readiness 3, current handoff, compact reporting rule, and Codex prompting standard were read.
* Read-only inspection was limited to the Prisma schema, scripts directory, `safe-seed.ts`, StudyLoad start/responses/complete routes, continuity helper, and static StudyLoad content registry.
* No env files, raw environment values, database URLs, secrets, DB commands, Prisma commands, SQL, browser/runtime, or fixture writes were used.

## 3. Explicit Boundary

This phase is documentation/readiness only.

It does not:

* execute DB-backed validation;
* create fixtures;
* create StudyLoad rows;
* create User, Student, StudentAccess, Program, StudentProgramInstance, LearningCycle, TutoringSession, Response, or any other row;
* run Prisma, SQL, seed, migrate, db push, reset, studio, or generate;
* run browser/runtime/dev server;
* touch staging or production;
* inspect secrets, raw env values, database URLs, tokens, cookies, headers, passwords, or backups;
* edit app code, tests, schema, package metadata, or content registry;
* approve student use or product use;
* declare PAES_L1 ready;
* declare Sales-Ready.

## 4. Fixture Approach Decision

Decision:

```text
Future validation should use a narrow local-only fixture script with dry-run, apply, cleanup, and optional status modes.
```

Manual local fixture creation is not preferred for the first controlled DB-backed L1 validation because the required relation chain is precise and cleanup must be repeatable. Broad seed reuse is not preferred because the existing `safe-seed.ts` pattern wraps a broader seed and is not scoped to one PAES_L1 validation fixture.

The future script must be implemented in a separate phase before DB-backed execution. `INTERNAL-VALIDATION-3` should not execute directly from this documentation phase unless the next prompt explicitly authorizes both fixture tooling implementation and execution-safe validation. A separate implementation phase is the cleaner path.

## 5. Recommended Future Path

Recommended sequence:

1. `MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2D` implements the narrow local-only fixture script and its dry-run/apply/cleanup/status guards without running DB writes unless separately authorized inside that phase.
2. A later `MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-3` executes controlled local/dev DB-backed validation only after the script exists, has been reviewed, and passes dry-run.

Recommended future script:

```text
nextjs_space/scripts/l1-validation-fixture.ts
```

The implementation phase may choose a different adjacent scripts filename, but it should stay in `nextjs_space/scripts/`, be PAES_L1-specific, and must not modify `safe-seed.ts`, `seed.ts`, `schema.prisma`, `package.json`, or the content registry unless a future prompt explicitly authorizes that broader work.

## 6. Future Modes

Required modes:

* `dry-run`: confirm safe target, inspect intended fixture labels, check required preconditions and collisions, print a non-secret plan, and exit without DB mutation.
* `apply`: require prior dry-run success or equivalent operator confirmation, then create only the approved labeled fixture rows and write a local scratch run record.
* `cleanup`: remove or close only rows proven to belong to the fixture run by recorded ids and labels.

Optional mode:

* `status`: report whether a fixture run exists, which recorded ids are present, and whether cleanup is possible. It must not print secrets or raw env values.

Future command examples:

```powershell
cd nextjs_space
npx tsx scripts/l1-validation-fixture.ts --mode dry-run --run-id 20260527T120000-local
npx tsx scripts/l1-validation-fixture.ts --mode apply --run-id 20260527T120000-local --confirm-local-dev
npx tsx scripts/l1-validation-fixture.ts --mode status --run-id 20260527T120000-local
npx tsx scripts/l1-validation-fixture.ts --mode cleanup --run-id 20260527T120000-local --confirm-local-dev
```

These are future examples only. This phase did not run them.

## 7. Local/Dev Target Confirmation Rules

The future script must stop before mutation unless it can confirm a local/dev target without exposing secrets.

Rules:

* do not print raw `DATABASE_URL`;
* do not print raw `PROD_DATABASE_URL`;
* do not print raw env values;
* do not print credentials, tokens, cookies, headers, passwords, or backups;
* do not inspect `.env` or secret-bearing files as operator output;
* do not connect to staging or production;
* stop if the target cannot be confirmed safely;
* stop if any signal suggests the target is staging, production, shared remote, or otherwise not local/dev;
* use a non-secret allowlist or explicit operator confirmation such as `--confirm-local-dev` only after target guards pass;
* report only non-secret target classification such as `targetClass=local-dev-confirmed`, never connection strings.

The script may use environment variables internally if that is how the app connects, but it must never echo raw values.

## 8. Labels And Naming Convention

Every fixture-owned row that has a human-readable field must include:

```text
L1_VALIDATION_FIXTURE_<runId>
```

Recommended label values:

* `runLabel`: `L1_VALIDATION_FIXTURE_<runId>`;
* fixture user email: `l1.validation.fixture.<runId>@example.invalid`;
* student first name: `L1_VALIDATION_FIXTURE`;
* student last name: `<runId>`;
* StudyLoad title: exact registry title only, with fixture label recorded elsewhere because title lookup must remain exact;
* notes or scratch metadata, where available: include `L1_VALIDATION_FIXTURE_<runId>`.

The StudyLoad `title` must not be altered to add the label because runtime content lookup is title-backed.

## 9. Exact Fixture Entities And Relationships

The future first-pass fixture should create or locate only these entities:

| Entity | Rule |
| --- | --- |
| `User` | Create a fixture user with email matching the fixture student email. Do not create sessions manually unless a future auth validation path explicitly requires it. |
| `Student` | Create one active fixture student with the same email as the fixture user. |
| `StudentAccess` | Create one fixture access row for the student, using local/dev validation-safe access status needed by the current app path. If the current path does not enforce access for `/now`, still create it for governance realism. |
| `Program` | Prefer locating existing `Program.code = PAES_L1`. Create it only if absent and only with fixture-safe PAES_L1 metadata. Never delete an existing non-fixture program during cleanup. |
| `StudentProgramInstance` | Create one active PAES_L1 enrollment with `currentContinuityState = normal`. |
| `LearningCycle` | Create one open cycle for that enrollment. Use a cycle number that does not collide for the enrollment, preferably `1` for a new fixture-only enrollment. |
| `StudyLoad` | Create one pending L1 StudyLoad linked to the fixture cycle. |
| `TutoringSession` | Do not pre-create for the first pass. It should be created by the normal start flow. Pre-creation is allowed only if a future phase explicitly chooses route-level validation without start-flow validation. |
| `Response` | Do not pre-create for the first pass. MC submission and self-report responses should be created by the normal responses and complete flows. |

No `Axis`, `Skill`, `SkillState`, `CycleDecision`, `CycleEvaluation`, `CycleSnapshot`, or `ContinuitySignal` is required for first-pass L1 fixture validation unless a future execution phase finds a route-level hard dependency and documents it before mutation.

## 10. StudyLoad Title And Content Matching

The fixture StudyLoad must use the exact static registry title:

```text
PAES L1 - Localizacion de informacion - Piloto interno 01
```

Expected content identity:

```text
contentKey = l1_locating_information_pilot_set_01
contentVersion = internal-v0.1
contentType = reading_l1_locating_information
program = PAES_L1
skillFamily = locating_information
sourceTextId = original_l1_text_locating_information_01_draft
sourceTextVersion = draft-0.1
```

Expected item ids:

```text
l1_locating_information_item_01
l1_locating_information_item_02_revised
l1_locating_information_item_03
```

The fixture StudyLoad should start as:

```text
loadType = practice
status = pending
```

`loadType = practice` matches the continuity helper's next-load creation behavior and the start/response/complete routes do not require a reading-specific load type.

## 11. M1 And Non-Fixture Data Rules

The future script must not touch M1 or non-fixture data.

Rules:

* never update or delete rows without the fixture run label or recorded fixture id;
* never update M1 programs, enrollments, cycles, StudyLoads, sessions, responses, or continuity maps;
* never create or alter non-fixture M1 control data unless a future prompt explicitly authorizes a separate M1 control fixture;
* never run broad seed, reset, migration, or cleanup commands;
* stop if an intended write would affect rows outside the fixture relationship chain.

## 12. Collision Checks

The future dry-run and apply modes must stop on collisions before mutation.

Collision checks:

* fixture email already exists but is not labeled as the same run;
* fixture Student exists with same email but missing the expected run label;
* a `StudentAccess` row exists for the target student but was not created for the run and would need mutation;
* `Program.code = PAES_L1` exists with unexpected non-PAES_L1 values that would need mutation;
* fixture enrollment exists but belongs to a different program or continuity state;
* fixture cycle number collides with a non-fixture cycle for the same enrollment;
* exact L1 StudyLoad title already exists in the fixture cycle but is not recorded as this run's StudyLoad;
* more than one in-progress session exists for the fixture StudyLoad before start;
* existing `Response` rows exist for a first-pass run before response submission;
* any planned cleanup target is missing either recorded id proof or label proof.

Program collision exception:

* An existing active `Program.code = PAES_L1` may be reused if its code is correct and no mutation is required. It must be marked as `locatedExisting` in the local scratch record and must not be deleted by cleanup.

## 13. Created-ID Recording Policy

The future script must write created ids to local scratch only.

Recommended scratch path:

```text
nextjs_space/.local/l1-validation-fixtures/<runId>.json
```

Requirements:

* do not commit scratch files;
* do not include secrets or raw env values;
* include `runId`, `runLabel`, `createdAt`, mode, non-secret target classification, and created or located entity ids;
* distinguish `created` from `locatedExisting`;
* include enough information for cleanup order and partial-failure recovery;
* include only row ids, labels, entity types, and non-secret metadata needed for cleanup;
* never include passwords, session tokens, cookies, DB URLs, headers, or environment values.

The future implementation phase should add `.local/` to local ignore rules only if needed and explicitly authorized. If ignore rules are not changed, the operator must still keep scratch files uncommitted.

## 14. Apply Transaction And Partial Failure Policy

Preferred apply policy:

* create fixture rows inside a transaction where practical;
* write the scratch run record after successful creation;
* if the transaction fails, no rows should remain;
* if a non-transactional step is unavoidable, record each successful create immediately in memory and write a partial scratch record before exiting.

Partial failure rules:

* stop immediately on first failed create/update;
* do not retry by broadening scope;
* do not switch to manual SQL;
* do not run reset or seed;
* report the last successful created ids without secrets;
* require cleanup mode to target only recorded fixture ids and labels.

## 15. Cleanup Order

Cleanup must delete or close children before parents and must target only recorded fixture ids and labels.

Preferred cleanup order:

1. `Response` rows created by MC submission and completion self-report for the fixture TutoringSession.
2. Fixture `TutoringSession`.
3. Fixture `StudyLoad`.
4. Fixture `LearningCycle`.
5. Fixture `StudentProgramInstance`.
6. Fixture `StudentAccess`.
7. Fixture `Student`.
8. Fixture `User`.
9. Fixture-created `Program` only if the scratch record proves it was created by this run and no other row references it.

Cleanup must not delete an existing `Program.code = PAES_L1` that was only located and reused.

## 16. Cleanup Failure Policy

If cleanup fails:

* stop and report the entity type and id that failed, without secrets;
* leave remaining fixture rows clearly labeled;
* do not continue deleting parent rows if child cleanup failed;
* do not delete by broad filters;
* do not run reset, seed, migration, SQL, or manual destructive commands;
* preserve the scratch run record and mark cleanup status as partial if the future script supports that;
* require a later controlled cleanup phase if residual rows remain.

Cleanup success does not approve product use, student use, PAES_L1 readiness, or Sales-Ready.

## 17. Verification Gates Before Future Apply

Before future `apply`, the operator must verify:

* Git preflight matches that phase baseline and the working tree is clean;
* the script exists and was created/reviewed in an authorized phase;
* dry-run completed successfully;
* target classification is local/dev without printed secrets;
* no staging/production/shared remote target is indicated;
* exact fixture label is unique;
* exact L1 registry title/content identity is known;
* collision checks pass;
* cleanup path and scratch path are available;
* no schema migration or Prisma generate is required;
* no broad seed/reset is required;
* the future phase explicitly authorizes DB-backed fixture creation.

## 18. Future Validation Assertions

A future DB-backed validation phase should assert:

* `/now` shows the pending L1 StudyLoad for the fixture student and not for unrelated users.
* Starting the StudyLoad through the normal start flow changes it to `in_progress`.
* The start flow creates exactly one in-progress linked TutoringSession.
* The activity viewer renders the passage above the questions.
* Pre-submit state does not expose correct options, correctness, answer-key notes, distractor rationale, feedback breve, or feedback completo.
* Response submission creates or updates one `mc_submission` Response through the normal responses flow.
* Stored response evidence includes content, version, program, skill family, text id/version, item ids, selected options, correctness, feedback refs, and summary counts.
* Authored feedback appears only after submission.
* Feedback breve appears after submission and feedback completo remains on demand.
* Completion through the normal complete flow marks the StudyLoad and TutoringSession completed.
* Completion creates the self-report Response with one allowed self-report value.
* PAES_L1 completion produces no next L1 StudyLoad and no fake L1 continuity.
* Admin evidence shows bounded L1 metadata, not full feedback copy by default.
* Admin evidence has no release, approve, pause, block, access mutation, route mutation, or continuity gate controls.
* M1 content, continuity, and non-fixture rows remain unchanged at the agreed validation level.

## 19. No-Go Criteria

Future validation must stop if:

* target cannot be confirmed as local/dev without printing secrets;
* target appears to be staging, production, shared remote, or ambiguous;
* raw env values, DB URLs, tokens, cookies, headers, or passwords would need to be printed;
* schema mismatch requires migration, db push, reset, seed, or generate;
* collision checks fail;
* cleanup cannot be guaranteed;
* the exact L1 StudyLoad title/content match is unclear;
* authentication path for the fixture student is unclear;
* start flow cannot create the TutoringSession;
* response submission requires pre-created Response rows for first pass;
* completion would create L1 continuity;
* admin evidence introduces gates or mutation controls;
* answer leakage is detected;
* M1 preservation cannot be checked at the agreed level;
* product-use, student-use, PAES_L1-ready, score/mastery, officialness, guarantee, or Sales-Ready claims appear.

## 20. Product And Use Boundary

PAES_L1 remains:

```text
internal-only
student-use not approved
product-use not approved
PAES_L1 readiness not declared
Sales-Ready blocked
```

Local/dev fixture validation is evidence gathering only. It is not student use, product use, beta approval, public availability, production validation, or Sales-Ready progress by itself.

## 21. Next Phase Decision

Decision:

```text
INTERNAL-VALIDATION-3 should not execute directly after 2B unless fixture tooling is already implemented and separately authorized.
```

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2D - Implement local-only L1 validation fixture script
```

Reason:

The controlled DB-backed validation requires a reviewed script before execution. Separating fixture tooling implementation from DB-backed execution keeps mutation risk lower and preserves the documentation/readiness boundary of 2B.

## 22. Conclusion

```text
MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2B should not execute DB-backed validation.
It should prepare the exact fixture tooling/readiness contract.
The next likely phase should be MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2D before MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-3, because the future script/protocol still needs implementation before DB-backed execution.
```

Result marker:

```text
MVP_COMMERCIAL_L1_STUDYLOAD_INTERNAL_VALIDATION_2B_FIXTURE_PROTOCOL_DEFINED
```
