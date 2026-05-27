# MVP-SALES-PILOT-DRY-RUN-1A - Execute controlled local/dev M1-first dry-run

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-1A - Execute controlled local/dev M1-first dry-run
```

Type:

```text
Execution attempt / local-dev dry-run gate / blocked before runtime and DB mutation.
```

Purpose:

Attempt the first controlled local/dev M1-first vertical dry-run for the narrowed closed-pilot path.

This phase reviewed the required docs and relevant code paths, then stopped before runtime, browser, DB, or fixture setup because the live target could not be safely confirmed as local/dev without inspecting forbidden env/secret-bearing material.

No app code was edited. No runtime/browser was started. No DB action was run. No fixture data was created.

## 2. Baseline and Context Gate summary

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = aa6a3c5
```

Latest accepted commit:

```text
aa6a3c5 - MVP-SALES-PILOT-DRY-RUN-0: define M1 pilot dry-run plan
```

Context Gate read:

* `PHASE_LOG.md` tail.
* `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_EXTERNAL_AUDIT_1_INTEGRATE_3_STUDENT_AUDIT_AND_ROADMAP_REDIRECT.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_SCOPE_1_LOCK_CLOSED_3_STUDENT_PILOT_SCOPE.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_1_CLOSED_PILOT_ACCESS_PAYMENT_TRIAL_BOUNDARY.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_2_MINIMAL_CLOSED_PILOT_ACCESS_REGISTER_ADMIN_SURFACE.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_3_CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE_AND_ADMIN_SURFACE_READINESS.md`.
* `nextjs_space/docs/operations/templates/CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE.md`.
* `nextjs_space/docs/operations/MVP_SALES_NOW_PILOT_1A_AUDIT_NOW_FOR_NARROWED_M1_FIRST_PILOT.md`.
* `nextjs_space/docs/operations/MVP_SALES_NOW_PILOT_1B_DESIGN_M1_FIRST_NOW_COPY_AND_STRUCTURE.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_0_PREPARE_CLOSED_M1_FIRST_DRY_RUN_PLAN.md`.
* `nextjs_space/docs/operations/MVP_BETA_SCOPE_2_SALES_READY_ACCEPTANCE_CRITERIA_AND_MACRO_ROADMAP.md`.
* `nextjs_space/docs/operations/MVP_BETA_TARGET_1_AUTONOMOUS_SALES_READY_TARGET_AND_HANDOFF_PROPAGATION.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_BLOCK_7_PEDAGOGICAL_LAYER_ANCHOR.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.
* Focused read-only searches for dry-run, smoke, local/staging, pilot, PAES_M1, StudyLoad, evidence, admin evidence, login/signup, StudentAccess, fixture, cycle, and continuity references.

Read-only code inspection:

* `nextjs_space/app/now/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`.
* `nextjs_space/app/api/study-loads/[id]/start/route.ts`.
* `nextjs_space/app/api/study-loads/[id]/responses/route.ts`.
* `nextjs_space/app/api/study-loads/[id]/complete/route.ts`.
* `nextjs_space/lib/study-load-content.ts`.
* `nextjs_space/lib/study-load-continuity.ts`.
* `nextjs_space/prisma/schema.prisma`.
* `nextjs_space/app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx`.

No env files, raw env values, database URLs, secrets, tokens, cookies, headers, backups, runtime, browser, Prisma, SQL, DB commands, or fixture writes were used.

## 3. Target confirmation result

Target confirmation result:

```text
TARGET_CONFIRMATION_FAILED_SAFE_STOP
```

Reason:

The phase required live confirmation that any runtime or DB-affecting action would target local/dev only. The allowed confirmation methods did not permit inspecting `.env`, raw environment values, database URLs, tokens, secrets, cookies, headers, or backups.

Historical documentation contains prior non-secret local/dev target confirmations, but those do not prove the current live runtime/database target for this execution. Starting the app or creating fixture-equivalent data could have loaded the current `DATABASE_URL` indirectly, and the current target could not be verified without crossing the phase's secret/env boundary.

Decision:

```text
STOP_BEFORE_RUNTIME_OR_DB_MUTATION
```

## 4. Participant model used

Participant codes reserved for this dry-run:

```text
PILOT_M1_001
PILOT_M1_002
PILOT_M1_003
```

Execution status:

```text
0/3 participants executed
```

No real student data was used. No real access register instance was created or committed.

## 5. Data setup method used

Data setup method:

```text
BLOCKED_BEFORE_SETUP
```

No existing fixture was used.

No app UI/API setup was run.

No local/dev setup script was run.

No direct DB manipulation was performed.

No User, Student, StudentAccess, Program, Enrollment, LearningCycle, StudyLoad, TutoringSession, Response, or other row was created, updated, or deleted.

## 6. Candidate StudyLoad used

Candidate selected from the accepted dry-run plan and registry inspection:

```text
Title: PAES M1 - Entrada balanceada inicial
Registry title: PAES M1 \u2014 Entrada balanceada inicial
contentKey: paes_m1_balanced_entry_initial
contentVersion: v1
```

Rationale preserved:

* Existing registry-backed PAES_M1 content.
* Short four-item multiple-choice path.
* Entry-oriented balanced signal across M1 axes.
* Exercises the start, activity, response, evidence, completion, self-report, and admin-review code path.
* Does not activate L1 or M2.

The candidate was not attached to any participant in this phase.

## 7. Execution summary by participant code

| Participant code | Execution status | Reason |
| --- | --- | --- |
| `PILOT_M1_001` | `NOT_EXECUTED_TARGET_CONFIRMATION_BLOCKED` | Live local/dev target could not be safely confirmed. |
| `PILOT_M1_002` | `NOT_EXECUTED_TARGET_CONFIRMATION_BLOCKED` | Live local/dev target could not be safely confirmed. |
| `PILOT_M1_003` | `NOT_EXECUTED_TARGET_CONFIRMATION_BLOCKED` | Live local/dev target could not be safely confirmed. |

Completion level:

```text
DRY_RUN_NO_GO
```

## 8. `/now` verification

Runtime `/now` verification was not performed.

Read-only code verification confirmed:

* `/now` requires authenticated session and redirects unauthenticated users to `/login`.
* `/now` uses provisional `User.email == Student.email` linkage.
* `/now` selects one most-recent active enrollment.
* `/now` uses that enrollment's `currentCycleId`.
* `/now` renders pending, in-progress, and completed StudyLoads for the current open cycle.
* `/now` includes the closed PAES M1 pilot orientation added in `MVP-SALES-NOW-PILOT-1C`.
* `/now` includes L1/M2 not-active boundary copy.
* `/now` avoids detailed payment, subscription, public-trial, PAES score, mastery/theta, adaptive AI, complete-coverage, and guaranteed-improvement claims.

Not verified:

* authenticated runtime rendering;
* actual local `/now` page load;
* screenshot/manual observation;
* participant-specific account/enrollment/cycle/load state.

## 9. StudyLoad start/activity verification

Runtime start/activity verification was not performed.

Read-only code verification confirmed:

* `/api/study-loads/[id]/start` requires authentication.
* Ownership is checked through the student/enrollment/cycle/load chain.
* Enrollment must be active and in normal continuity state.
* Cycle must be open.
* StudyLoad must be pending.
* The route transitions the StudyLoad to `in_progress`, creates an `in_progress` TutoringSession, and updates enrollment activity timestamp.
* The activity viewer loads registry-backed content by StudyLoad title and blocks access if ownership does not match.

Not verified:

* actual `pending -> in_progress` transition;
* local API response;
* participant activity opening in browser/runtime.

## 10. Response/evidence verification

Runtime response/evidence verification was not performed.

Read-only code verification confirmed:

* `/api/study-loads/[id]/responses` requires authentication.
* Ownership, active enrollment, open cycle, and `in_progress` StudyLoad state are enforced.
* Content key and content version are validated against the registry.
* Empty or malformed answer arrays are rejected.
* The route creates or updates one `mc_submission` Response for the active in-progress TutoringSession.
* Stored evidence includes content identity, submitted answers, summary counts, correctness where answer key exists, and feedback metadata.

Not verified:

* actual MC submission persistence;
* item-count and selected-answer evidence in DB;
* feedback display in runtime.

## 11. Completion/self-report verification

Runtime completion/self-report verification was not performed.

Read-only code verification confirmed:

* `/api/study-loads/[id]/complete` requires authentication.
* Self-report is restricted to `Me fue bien`, `Me costo`, or `No la termine` variants as implemented in code.
* Ownership, active enrollment, normal continuity, open cycle, and `in_progress` StudyLoad state are enforced.
* Exactly one in-progress session is required.
* The route transitions StudyLoad and TutoringSession to completed, stores one `answer` Response with the self-report, and updates enrollment activity timestamp.
* M1 rule-based continuity may create a next pending StudyLoad outside the completion transaction.

Not verified:

* actual self-report persistence;
* actual `in_progress -> completed` transition;
* completed work visibility after returning to `/now`;
* continuity side effect in local/dev data.

## 12. Admin/tutor evidence verification

Runtime admin/tutor evidence verification was not performed.

Read-only code verification confirmed:

* Admin learning-cycle detail can render StudyLoad status.
* Admin detail can display self-report responses.
* Admin detail can parse and display `mc_submission` evidence with answered count, correct count where applicable, content identity, and item-level evidence.
* Admin detail includes internal/provisional pedagogical metadata and explicitly avoids PAES score, theta, mastery, automatic diagnosis, or adaptive AI claims in its pedagogical context note.

Not verified:

* actual admin login;
* actual admin learning-cycle page load;
* actual participant evidence visibility in runtime.

## 13. Support/failure findings

Primary failure:

```text
ENVIRONMENT_TARGET_UNCONFIRMED
```

Severity:

```text
blocker
```

Support/failure category:

```text
environment target uncertainty
```

Finding:

The dry-run could not safely start because local/dev target confirmation was not possible without inspecting forbidden env/DB target material or indirectly trusting runtime behavior against an unverified target.

No participant-specific support failure was observed because no participant path was executed.

## 14. Go/no-go decision

Decision:

```text
NO_GO_FIX_BLOCKERS
```

Reason:

The required execution target could not be confirmed as local/dev before runtime or DB-affecting action. This triggers the dry-run stop rule.

This is not a product failure and not a StudyLoad path failure. It is an execution-safety blocker.

## 15. What was not tested

Not tested:

* local/dev runtime startup;
* browser `/now` load;
* controlled participant login;
* account/student creation or confirmation;
* StudentAccess or private-register operational state;
* PAES_M1 enrollment/cycle/load setup;
* StudyLoad start route execution;
* activity viewer execution;
* MC response submission;
* feedback rendering;
* completion/self-report execution;
* completed work visibility on `/now`;
* admin/tutor evidence runtime visibility;
* private access register updates;
* one-participant or three-participant end-to-end completion.

## 16. Risks and limitations

* The vertical M1-first circuit remains unproven at runtime.
* Historical local/dev target confirmation cannot substitute for live execution target confirmation.
* Direct DB setup or runtime execution remains unsafe until a non-secret current-target confirmation protocol exists.
* The candidate StudyLoad and code path appear suitable by inspection only.
* No `GO_FOR_INTERNAL_CONTROLLED_M1_PILOT` can be produced from this phase.
* No student/product approval is implied.

## 17. Cleanup/isolation status for local/dev fixture data

Cleanup status:

```text
NO_FIXTURE_DATA_CREATED_NO_CLEANUP_REQUIRED
```

No fixture data, scratch IDs, screenshots, logs, private access register instance, or real student data were created or committed.

## 18. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-1B - Establish safe local/dev target confirmation and fixture setup protocol
```

Purpose:

Define and, if authorized, implement a non-secret current-target confirmation method and fixture-equivalent setup path for the M1-first local/dev dry-run.

Minimum outputs needed before returning to execution:

* explicit non-secret live target classification;
* stop rule for ambiguous, staging, production, or shared remote targets;
* no raw env or DB URL printing;
* safe participant-coded fixture setup path;
* cleanup/isolation policy;
* exact allowed commands;
* no real private data;
* no payment/trial activation;
* no Sales-Ready or product/student approval.

After that protocol exists and passes, repeat the execution as:

```text
MVP-SALES-PILOT-DRY-RUN-1C - Execute controlled local/dev M1-first dry-run
```

## 19. Non-goals

This phase did not:

* touch production;
* touch staging;
* deploy;
* inspect `.env`, database URLs, raw env values, secrets, tokens, passwords, cookies, headers, backups, or real credentials;
* print connection strings;
* use real student names, real student emails, phone numbers, RUTs, payment records, consent records, support notes, or private student data;
* commit real private data;
* activate payment;
* activate public trial;
* create subscription state;
* reconcile payments;
* run destructive DB reset;
* run migrations;
* run Prisma db push/reset/migrate;
* change schema;
* change package files;
* edit StudyLoad content registry;
* edit StudyLoad continuity;
* edit auth, payment, trial, billing, or StudentAccess runtime logic;
* edit `/now`;
* edit tests;
* approve student/product use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute a real pilot with real controlled students;
* create or commit a real access register instance.

## 20. Result marker

```text
MVP_SALES_PILOT_DRY_RUN_1A_BLOCKED_BEFORE_EXECUTION
```
