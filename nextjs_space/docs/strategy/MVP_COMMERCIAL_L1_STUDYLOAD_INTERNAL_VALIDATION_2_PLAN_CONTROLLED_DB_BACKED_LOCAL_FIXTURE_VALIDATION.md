# MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2 - Plan Controlled DB-Backed Local Fixture Validation

## 1. Phase Identity And Scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2 - Plan controlled DB-backed/local fixture validation
```

Type:

```text
Documentation-only validation plan / no DB execution / no fixture creation / no browser runtime.
```

Mission:

Define the first controlled DB-backed/local fixture validation path for the internal PAES_L1 StudyLoad slice. This plan describes how a future phase could safely verify `/now`, the activity viewer, response persistence, authored feedback, completion, explicit no-continuity, admin evidence, and cleanup with local/dev fixture data only.

## 2. Baseline And Context Gate Summary

Baseline expected:

```text
HEAD = origin/main = origin/HEAD = 14a97f5
```

Latest accepted commit:

```text
14a97f5 - MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-1: validate internal L1 slice
```

Context Gate summary:

* Git preflight confirmed a clean working tree and baseline match.
* `PHASE_LOG.md` was read through the recent L1 implementation and validation chain.
* Required operations, governance, product, PAES_L1 blueprint, implementation review, implementation-readiness, registry artifact authorization, and test-plan documents were read.
* Focused documentation search covered local fixture, DB-backed validation, StudyLoad row, TutoringSession, Response, StudentAccess, enrollment, `/now`, admin evidence, response evidence, completion, self-report, PAES_L1, no-continuity, cleanup, rollback, local/dev, staging, and production terms.
* Code/schema inspection was read-only and limited to understanding fixture entities, runtime preconditions, validation surfaces, and cleanup needs.

## 3. Explicit Boundary

This phase is:

* documentation-only;
* validation planning only;
* no DB execution;
* no Prisma execution;
* no fixture creation;
* no browser/runtime session;
* no staging/production;
* no student/product approval;
* PAES_L1 not ready;
* Sales-Ready blocked.

This phase does not:

* edit app code;
* edit tests;
* create test files;
* create or modify registry content;
* edit `nextjs_space/lib/study-load-content.ts`;
* run DB, Prisma migrate/db push/seed/reset, SQL, browser, runtime app session, Vercel, deploy, or external services;
* create StudyLoad rows;
* create users, students, enrollments, cycles, responses, or tutoring sessions;
* inspect environment files, raw environment values, secrets, tokens, cookies, headers, or backups;
* use Abacus;
* add dependencies;
* approve student use;
* approve product use;
* declare PAES_L1 ready;
* declare Sales-Ready;
* make admin/tutor review a default continuity gate;
* design or implement administrative adjustment workflows;
* design or implement pause/block/access mutation actions;
* infer L1 continuity from M1 continuity maps;
* perform live, staging, or production validation;
* execute the validation plan.

## 4. Why Validation 2 Is Needed

Validation 1 passed safe static/build validation for the internal PAES_L1 slice. It confirmed the scoped L1 test and build passed, and static inspection supported no pre-submit leakage, bounded admin metadata, explicit PAES_L1 no-continuity, and M1 preservation at the safe validation level.

Remaining unknowns require a controlled local/dev fixture because they depend on persisted rows and authenticated runtime paths:

* `/now` visibility for a real student context;
* StudyLoad start behavior and TutoringSession creation;
* response submission persistence;
* post-submit feedback state using stored evidence;
* completion and self-report persistence;
* no next L1 StudyLoad creation after completion;
* admin evidence display against persisted response data;
* cleanup/rollback of fixture data.

Future validation must be non-destructive and must not touch production, staging, real external students, product-use approval, or Sales-Ready gates.

## 5. Validation Target

The future DB-backed/local fixture validation should target:

* internal PAES_L1 artifact `l1_locating_information_pilot_set_01`;
* `/now` flow for a fixture student;
* StudyLoad viewer for the L1 activity;
* answer submission and response persistence;
* authored feedback after submission;
* completion and self-report relation;
* explicit PAES_L1 no-continuity;
* admin evidence display.

Authorized artifact values to verify:

| Field | Value |
| --- | --- |
| `contentKey` | `l1_locating_information_pilot_set_01` |
| `contentVersion` | `internal-v0.1` |
| `contentType` | `reading_l1_locating_information` |
| `program` | `PAES_L1` |
| `skillFamily` | `locating_information` |
| `sourceTextId` | `original_l1_text_locating_information_01_draft` |
| `sourceTextVersion` | `draft-0.1` |
| `itemIds` | `l1_locating_information_item_01`, `l1_locating_information_item_02_revised`, `l1_locating_information_item_03` |
| `studentUseApproved` | `no` |
| `productUseApproved` | `no` |
| `salesReadyImplication` | `none` |

## 6. Required Fixture Model

Minimum local/dev fixture data:

| Fixture entity | Status | Reason |
| --- | --- | --- |
| Test `User` | Required | Authenticated runtime routes use session user email. The fixture user's email should match the fixture student email. |
| `Student` | Required | `/now`, ownership, and cycle relations are student-backed. |
| `StudentAccess` | Required with caveat | Access/continuity governance exists and should be represented. Future execution must confirm whether the current path strictly enforces it for this slice. |
| `Program` with `code = PAES_L1` | Required | Enrollment program code drives program-specific behavior and PAES_L1 no-continuity. |
| `StudentProgramInstance` | Required | Must be `active`, linked to PAES_L1, and use `currentContinuityState = normal`. |
| `LearningCycle` | Required | Must be open and linked as the enrollment's current cycle. |
| One `StudyLoad` row | Required | Must use the implemented L1 title/content mapping and start as `pending` for normal start-route validation. |
| `TutoringSession` row | Required after start | Prefer creation through the normal start endpoint or UI flow. A pre-created session should be used only if a future phase explicitly chooses route-level fixture validation instead of start-flow validation. |
| Pre-existing L1 `Response` | Not required for first pass | First validation should start without an existing L1 response. A completed-state fixture may be added later. |
| Admin `User` | Optional | Required only if future admin evidence validation uses authenticated admin runtime instead of route/component inspection plus DB query. |
| Existing M1 fixture | Optional but recommended | Useful to confirm M1 remains unaffected during the same local/dev run. |

StudyLoad fixture guidance:

* `title` must match the internal L1 registry title used by runtime lookup.
* `status` should start as `pending`.
* `loadType` should be `reading` unless future code inspection finds an existing route assumption requiring `practice`.
* Fixture names/emails/titles should include a unique run label such as `L1_VALIDATION_FIXTURE_<runId>`.

## 7. Fixture Creation Strategy Options

### Option A - Manual Local UI/Admin Creation If Supported

Benefits:

* exercises existing administrative/user flows if they exist;
* avoids adding a new fixture script.

Risks:

* may not support exact PAES_L1 program, cycle, and StudyLoad state;
* may require browser/runtime and manual state inspection;
* may be brittle and hard to clean up consistently.

Fit for first pilot:

```text
pass with caveat
```

Useful only if the existing local app already exposes precise safe fixture creation without product/staging risk.

### Option B - Narrow Local-Only Fixture Script With Dry-Run, Apply, And Cleanup

Benefits:

* precise fixture construction;
* can confirm target safety before mutation;
* can record created IDs for cleanup;
* can avoid destructive reset and broad seed behavior;
* can be reviewed independently before execution.

Risks:

* requires a future script/code phase;
* must avoid printing raw DB URLs or secrets;
* must be scoped tightly to fixture labels and local/dev target checks.

Fit for first pilot:

```text
preferred
```

This is the safest controlled path if a future validation phase authorizes fixture tooling.

### Option C - Direct Prisma Local Dev Script With Explicit Cleanup

Benefits:

* simplest technical path to rows;
* uses the actual schema and relations;
* can be narrowly limited to fixture-owned records.

Risks:

* easier to become ad hoc or destructive;
* direct writes require strong target confirmation and cleanup safeguards;
* without dry-run/apply/cleanup separation, operator error risk is higher.

Fit for first pilot:

```text
pass with caveat
```

Acceptable only if wrapped with the same guardrails as Option B.

### Option D - Reuse Existing Safe-Seed Pattern If Present

Benefits:

* existing script pattern includes seed safety checks;
* may reduce new-tool surface if adapted carefully.

Risks:

* current safe-seed is broad and not L1-fixture-specific;
* broad seed execution is not appropriate for targeted validation unless separately reviewed;
* cleanup may be unclear.

Fit for first pilot:

```text
not preferred
```

Useful as a precedent for safety posture, not as the primary L1 validation fixture mechanism.

## 8. Recommended Fixture Strategy

Recommended strategy:

```text
Option B - Narrow local-only fixture script with dry-run, apply, and cleanup modes.
```

Future validation should use local/dev only and should require a separately authorized fixture tooling or execution phase.

Minimum future fixture-tool constraints:

* no production or staging;
* no destructive reset;
* no migration;
* no broad seed;
* explicit local/dev target confirmation without printing raw `DATABASE_URL`;
* dry-run mode before any write;
* apply mode creates only labeled fixture records;
* cleanup mode deletes or closes only labeled fixture records created by the run;
* created IDs are recorded for cleanup without printing secrets;
* script stops on fixture collision with non-fixture records;
* script does not approve student/product use.

If a future phase does not authorize fixture tooling, it should instead define a reviewed manual local fixture procedure before any DB write.

## 9. Validation Sequence

Future validation sequence, not executed in this phase:

1. Run Git preflight and confirm expected baseline for the execution phase.
2. Confirm the validation target is local/dev without printing raw environment values.
3. Confirm no staging, production, external student, or product-use path is involved.
4. Run fixture dry-run and review intended records, labels, and collision checks.
5. Create or locate the fixture only after dry-run approval.
6. Authenticate as the fixture student in a local browser/runtime session if that execution phase explicitly allows browser validation.
7. Open `/now` and verify the pending PAES_L1 StudyLoad is visible only for the fixture student.
8. Start the StudyLoad through the normal start path and verify the StudyLoad becomes `in_progress` with one linked in-progress TutoringSession.
9. Open the activity viewer and verify the passage card appears above questions.
10. Verify safe pre-submit state: no correct option, correctness, answer-key notes, distractor rationale, authored feedback, or feedback completo is visible or present in client props.
11. Submit selected answers for all three L1 items.
12. Verify correctness state is separate from authored feedback.
13. Verify feedback breve appears after submission.
14. Verify feedback completo is available on demand and not expanded by default.
15. Verify the persisted `Response` evidence payload includes content, text, item, selected-answer, correctness, feedback reference, and summary identity fields.
16. Complete the StudyLoad with the normal self-report/completion flow.
17. Verify the StudyLoad and TutoringSession are completed and self-report evidence is persisted as expected.
18. Verify no next PAES_L1 StudyLoad is created and no fake L1 continuity appears.
19. Verify other active tutoring programs, if present in the fixture, remain governed by their own continuity rules.
20. Open admin evidence for the fixture cycle if admin browser validation is approved.
21. Verify bounded L1 metadata appears without full feedback copy by default and without action/gate controls.
22. Verify no runtime copy claims product use, PAES_L1 readiness, score, mastery, officialness, guarantee, or Sales-Ready.
23. Run cleanup or isolate the fixture according to the approved cleanup plan.
24. Record validation result, limitations, and any no-go findings.

## 10. Validation Assertions

Required future assertions:

* L1 StudyLoad is visible only for the fixture student.
* No answer leakage occurs before submission.
* The passage is rendered as first-class content above questions.
* Authored feedback appears only after submission.
* Correctness remains separate from authored explanation.
* Feedback breve is visible after submission.
* Feedback completo is on demand, not default-expanded.
* Evidence includes `contentKey`, `contentVersion`, `textId`, `textVersion`, item ids, selected options, correct options after submission, correctness, feedback refs, and summary counts.
* Admin metadata is bounded.
* Admin evidence has no action controls, no pause/block/access mutation, no route mutation, and no approve-next gate.
* Completion succeeds.
* No fake next L1 StudyLoad is created.
* M1 fixture behavior is unaffected if an M1 control fixture is present.
* No product-use, PAES_L1-ready, score/mastery, officialness, guarantee, or Sales-Ready claims appear.

## 11. Cleanup / Rollback Plan

Future validation must either clean up fixture records or isolate them with explicit local-only labels. Cleanup is preferred if it can be guaranteed safely.

Fixture labeling:

* fixture email/name/title labels should include `L1_VALIDATION_FIXTURE_<runId>`;
* created row ids should be recorded in local validation output or a non-committed scratch artifact;
* no secrets or raw environment values should be recorded.

Preferred cleanup order if explicit fixture-row deletion is authorized:

1. L1 `Response` rows created for the fixture TutoringSession.
2. Fixture `TutoringSession` rows.
3. Fixture `StudyLoad` rows.
4. Fixture `LearningCycle` rows.
5. Fixture `StudentProgramInstance` rows.
6. Fixture `StudentAccess` row if created by the fixture.
7. Fixture `Student` and `User` only if created exclusively by the fixture.
8. Fixture `Program` only if created exclusively by the fixture and not needed by other local validation.

Cleanup rules:

* never run destructive reset;
* never delete records without the fixture run label or recorded fixture id;
* never delete shared M1 or real local data;
* stop if a record collision suggests non-fixture data;
* if cleanup cannot be guaranteed, stop before mutation or choose explicit fixture isolation with a documented manual cleanup step.

Rollback/no-go:

* if fixture creation partially succeeds, cleanup must target only created fixture ids;
* if cleanup fails, document the residual fixture rows and keep them clearly labeled as local validation artifacts;
* do not proceed to product-use or readiness claims because of a successful cleanup or validation run.

## 12. Environment And Secrets Policy

Future DB-backed/local validation must follow this policy:

* no secrets printed;
* no raw `DATABASE_URL`;
* no raw `PROD_DATABASE_URL`;
* local/dev only;
* target confirmation before mutation;
* no production;
* no staging unless separately approved by a future phase;
* no environment value display;
* no cookies, tokens, passwords, headers, backups, or raw secret files inspected;
* if target cannot be confirmed without exposing secrets, stop.

Safe target confirmation should rely on non-secret allowlists, local-only process context, explicit operator confirmation, or a future reviewed guard function. It must not require printing the connection string.

## 13. No-Go Criteria

Future validation must stop if:

* target DB cannot be confirmed as local/dev;
* target appears to be staging or production;
* fixture would require destructive reset;
* schema mismatch requires migration;
* broad seed execution is required;
* secrets or raw environment values would need to be printed;
* StudyLoad creation path is unclear;
* authentication fixture path is unclear;
* cleanup plan is unclear;
* fixture labels collide with non-fixture records;
* no-admin-gate constraint cannot be verified;
* no-continuity constraint cannot be verified;
* answer leakage is detected;
* product-use, PAES_L1-ready, officialness, score/mastery, guarantee, or Sales-Ready copy appears;
* M1 preservation cannot be checked at the agreed level.

## 14. Product / Use Boundary

DB-backed local validation is not student use.

It is also not:

* product use;
* beta approval;
* PAES_L1 readiness;
* Sales-Ready approval;
* public availability;
* production validation.

PAES_L1 remains internal-only, not ready, not product-approved, and not Sales-Ready after this planning phase and after any future local validation unless a separate product-use gate explicitly changes that status.

## 15. Recommended Next Phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2A - Review controlled DB-backed/local fixture validation plan
```

Reason:

This plan introduces future DB-backed mutation, fixture creation, authentication, browser/runtime, admin evidence, and cleanup decisions. A review phase should confirm the plan before execution or fixture tooling is authorized.

Do not proceed directly to DB-backed execution unless a future prompt explicitly authorizes it after review.

## 16. Verification Performed

Verification performed in this planning phase:

* Git preflight.
* Required Context Gate reads.
* Focused read-only documentation searches across `PHASE_LOG.md` and `nextjs_space/docs`.
* Read-only schema, script, package, Prisma helper, StudyLoad start, and relevant runtime-surface inspection.
* No DB command was run.
* No Prisma command was run.
* No browser/runtime command was run.
* No fixture was created.
* Required documentation validation before closure: `git diff --check`, `git status --short`, and `git diff --stat`.

## 17. Non-Goals

This phase does not:

* execute DB-backed validation;
* create fixture data;
* create a StudyLoad row;
* create a user, student, enrollment, cycle, response, or tutoring session;
* run Prisma;
* run SQL;
* run browser/runtime;
* run deploy;
* validate staging or production;
* edit app code;
* edit tests;
* create test files;
* change registry content;
* approve student use;
* approve product use;
* declare PAES_L1 ready;
* declare Sales-Ready;
* create L1 continuity;
* make admin/tutor review a continuity gate;
* design administrative adjustment workflows.

## 18. Result Marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_INTERNAL_VALIDATION_2_DB_BACKED_LOCAL_FIXTURE_PLAN_DEFINED
```
