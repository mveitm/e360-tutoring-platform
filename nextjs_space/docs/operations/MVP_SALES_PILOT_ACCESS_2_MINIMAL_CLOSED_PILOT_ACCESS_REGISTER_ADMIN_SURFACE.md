# MVP-SALES-PILOT-ACCESS-2 - Design minimal closed-pilot access register/admin surface

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-ACCESS-2 - Design minimal closed-pilot access register/admin surface
```

Type:

```text
Documentation/design/custody only / no implementation / no runtime / no DB.
```

Purpose:

* Define the minimum source-of-truth mechanism for access to the first closed M1-first pilot with 3 controlled students.
* Prevent pilot access from relying on memory, chat messages, informal notes, or direct database edits as normal operation.
* Define the register fields, privacy rule, operational lifecycle, and future minimal admin surface concept before any pilot execution.

This phase does not create real pilot records, real student data, DB rows, StudentAccess rows, StudyLoads, access activation, trial activation, payment activation, or runtime behavior.

## 2. Baseline and Context Gate summary

Baseline before this phase:

```text
HEAD = origin/main = origin/HEAD = 530002a
```

Latest accepted commit:

```text
530002a - MVP-SALES-PILOT-ACCESS-1: define closed pilot access boundary
```

Context Gate confirmed:

* The external audit verdict remains `NO_LISTO`.
* The first pilot remains deliberately narrowed, not a full L1/M1/M2 triad.
* `PAES_M1` remains the only first-pilot program candidate, with limits.
* `PAES_L1` remains internal-only and outside the first pilot.
* `PAES_M2` remains waitlisted or excluded from the first pilot.
* `MVP-SALES-PILOT-ACCESS-1` selected `STAGED_NO_PAYMENT_THEN_PAYMENT_SANDBOX`.
* First dry-run and first closed pilot should operate as a no-payment closed controlled lab.

Read-only inspection was used only to confirm current access/admin facts. No app code, schema, tests, package files, DB, runtime, env, or secrets were changed.

## 3. Starting point from MVP-SALES-PILOT-ACCESS-1

Access/payment/trial decision:

```text
STAGED_NO_PAYMENT_THEN_PAYMENT_SANDBOX
```

Operational meaning:

* First vertical dry-run and first closed pilot: no-payment closed controlled lab.
* Manual controlled payment: deferred to a later explicit payment sandbox.
* Public trial: deferred.
* Trial activation, trial expiry, and `/now` trial display: deferred.
* Access must not rely on memory, chat, informal notes, or direct DB edits as normal operation.

The first closed pilot remains:

```text
NARROWED_FIRST_VERTICAL_PILOT
```

with:

```text
PAES_M1 = PILOT_USABLE_WITH_LIMITS
PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT
PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT
```

## 4. Current observed access/admin state

### Observed facts

* `StudentAccess` exists in the Prisma schema with string fields for `accessStatus`, `trialStatus`, and `subscriptionStatus`.
* Current schema defaults include:
  * `accessStatus = no_access`
  * `trialStatus = none`
  * `subscriptionStatus = none`
* `nextjs_space/lib/student-access-validation.ts` defines validation helpers and known access/trial status strings.
* `nextjs_space/lib/student-access-admin-reaffirm.ts` defines `reaffirm_no_access` and `keep_no_access` as a non-permission admin command.
* Signup creates a `StudentAccess` row with `no_access / none / none` and `lastDecisionReason = public_signup_default_no_access`.
* Admin student detail reads and displays `StudentAccess` state.
* The admin access transition route exists at:

```text
POST /api/admin/students/[id]/access-transitions
```

* The implemented command reaffirms no access only.
* The reaffirm command requires an expected previous state and decision reason.
* The reaffirm command updates decision fields, not access permission.
* `/now` resolves active student program instances and StudyLoads; it does not currently use `StudentAccess` as an access gate.

### Inferences

* `StudentAccess` is useful as a future runtime/admin source, but it is not yet the complete operational source of truth for a closed M1-first pilot.
* Admin read-only visibility plus no-access reaffirmation is not enough to activate or operate the first closed pilot.
* Current admin enrollment/account controls may support parts of the future pilot workflow, but they do not replace a controlled pilot access register.
* A private pilot register is needed before actual execution, and an admin or approved operational surface should follow before the pilot depends on repeated operations.

### Missing evidence

* No evidence of admin activation for closed-pilot access.
* No evidence of runtime access enforcement.
* No evidence of public or closed-lab trial activation.
* No evidence of trial expiry enforcement.
* No evidence of payment, billing, subscription, refund, cancellation, or reconciliation implementation.
* No evidence of a committed, privacy-safe pilot access register template.
* No evidence of an app surface that tracks participant code, pilot scope, M1 StudyLoad state, evidence state, support state, and go/no-go state as one operational view.

Summary by required question:

| Question | Current answer |
| --- | --- |
| StudentAccess exists | Yes. |
| StudentAccess validation helper exists | Yes. |
| Reaffirm-no-access helper/endpoint exists | Yes, for non-permission reaffirmation only. |
| Signup creates or relates access state | Yes, signup creates default `no_access / none / none`. |
| Admin student detail exposes access | Yes, read-only. |
| Admin can activate/transition closed-pilot access | No. Only no-access reaffirmation exists. |
| Runtime enforcement exists | No. |
| Trial/payment/subscription is implemented | No. |

## 5. Source-of-truth decision

Decision:

```text
HYBRID_TEMPLATE_NOW_ADMIN_SURFACE_NEXT
```

Meaning:

* Define a versioned access register template now.
* The real register instance must remain non-committed and private.
* The real register must use participant codes in any repo-adjacent references.
* Before actual pilot execution, Bexauri should create a minimal admin or approved operational surface if the pilot will require repeated account, access, StudyLoad, evidence, support, or review operations.
* Memory, chat messages, informal notes, and direct DB edits are not acceptable as the source of truth.

Rationale:

* Current admin surfaces expose useful fragments, but they do not show the complete pilot operating state.
* The current access transition endpoint cannot activate pilot access.
* A non-committed register can safely control the first dry-run design without committing private data.
* A later admin surface can bind this operational state to real app data after implementation is explicitly authorized.

## 6. Access register template

This is a template only. Do not include real student data in repo.

| Field | Allowed or expected values | Purpose |
| --- | --- | --- |
| `pilotRunId` | Example: `M1_CLOSED_LAB_2026_01` | Identifies the pilot run without exposing private data. |
| `participantCode` | Example: `PILOT_M1_001` | Stable repo-safe participant reference. |
| `participantClass` | `controlled_student` / `internal_test` / `owner_test` | Distinguishes real controlled students from test actors. |
| `contactReference` | Private external reference, not committed | Points to approved private contact record outside repo. |
| `consentStatus` | `not_required` / `pending` / `confirmed` / `not_applicable` / `blocked` | Tracks participation consent readiness. |
| `payerStatus` | `no_payment` / `not_applicable` / `pending_future_sandbox` | Preserves no-payment pilot and future sandbox boundary. |
| `accessMode` | `closed_lab_no_payment` / `trial_only` / `manual_payment_sandbox` / `blocked` | Defines current access mode. |
| `accessStatus` | `invited` / `active_closed_pilot` / `paused` / `withdrawn` / `completed` / `blocked_no_access` | Tracks pilot access lifecycle. |
| `programScope` | `PAES_M1` only for first pilot | Prevents false triad scope. |
| `L1Status` | `internal_only_not_active` | Preserves L1 exclusion from first pilot. |
| `M2Status` | `waitlist_or_excluded` | Preserves M2 exclusion from first pilot. |
| `accountStatus` | `not_created` / `created` / `login_verified` / `blocked` | Tracks account readiness without storing credentials. |
| `nowStatus` | `not_checked` / `ready` / `blocked` / `confusing` | Tracks whether `/now` is honest for selected scope. |
| `firstStudyLoadStatus` | `not_assigned` / `pending` / `in_progress` / `completed` / `blocked` | Tracks first M1 StudyLoad progress. |
| `evidenceStatus` | `none` / `partial` / `captured` / `review_ready` | Tracks in-app evidence readiness. |
| `adminReviewStatus` | `not_started` / `reviewed` / `issue_found` / `complete` | Tracks tutor/admin review state. |
| `supportNotesRef` | Private external reference, not committed | Points to private support notes outside repo. |
| `goNoGoStatus` | `not_evaluated` / `go` / `no_go` / `narrow_scope` | Tracks pilot decision state. |
| `lastUpdatedBy` | Operator identifier, no secrets | Manual audit field. |
| `lastUpdatedAt` | ISO date/time | Manual audit field. |
| `notesPolicy` | `no personal data in repo` | Required privacy reminder. |

Template rule:

```text
The committed artifact may define fields and allowed values only. The real register instance must not be committed.
```

## 7. Privacy and data handling rule

Do not commit:

* real student names;
* emails;
* phone numbers;
* RUTs;
* payment evidence;
* health or education sensitive notes;
* private support notes;
* credentials;
* secrets;
* tokens;
* raw environment values;
* payment provider identifiers;
* private contact records.

Repo docs must use participant codes such as:

```text
PILOT_M1_001
PILOT_M1_002
PILOT_M1_003
```

Real contact, consent, payment, and support details must live in a private approved location outside the repo until a proper product/admin surface exists.

No access register may contain secrets or private credentials.

## 8. Minimal admin surface concept

If implemented in a future authorized phase, the minimal admin or operational surface should show:

* participant code, or student identity only if already legitimate inside the app;
* access status;
* pilot scope;
* program scope;
* account/login state;
* first StudyLoad state;
* evidence/review status;
* support status;
* coarse payment status only, such as `no_payment`;
* last update actor and timestamp;
* go/no-go state.

It should not show or do:

* payment collection;
* subscription management;
* public trial activation;
* L1 activation;
* M2 activation;
* automated legal consent;
* raw private support notes;
* payment evidence;
* irreversible deletion;
* broad admin mutation beyond pilot access unless separately authorized.

Minimum design principle:

```text
The first admin surface should make the closed-pilot state inspectable and repeatable before it tries to automate commercial access.
```

## 9. Operational update rules

Allowed update actors:

* Mauricio or a specifically authorized operator.
* Future admin user only after an explicit implementation phase defines permissions.

Update timing:

* Candidate is added before invitation.
* Invitation is recorded before account creation or access activation.
* Account status is updated after account creation or login verification.
* `nowStatus` is updated only after the selected pilot `/now` behavior is checked.
* `firstStudyLoadStatus` is updated when the M1 StudyLoad is assigned, started, completed, or blocked.
* `evidenceStatus` is updated when in-app evidence exists.
* `adminReviewStatus` is updated after tutor/admin review.
* `supportNotesRef` is updated when a private support record exists outside repo.
* `goNoGoStatus` is updated only after evidence review.

Evidence required before `active_closed_pilot`:

* participant code assigned;
* private contact/consent reference exists where required;
* no-payment access boundary confirmed;
* account state documented;
* M1-only scope documented;
* `/now` state reviewed or explicitly marked blocked/confusing;
* support path identified.

Evidence required before go/no-go:

* first M1 StudyLoad state recorded;
* feedback/evidence captured or explicit blocker recorded;
* admin/tutor review status recorded;
* support/failure state recorded;
* no forbidden claims made;
* payment/trial boundary remains no-payment unless a later phase changes it.

Manual audit rule:

* Every manual update must include `lastUpdatedBy`, `lastUpdatedAt`, and a non-sensitive reason or external reference.
* Until app audit exists for this pilot register, the private register owner must preserve a simple change log outside repo.
* Stale access is closed by moving the participant to `paused`, `withdrawn`, `completed`, or `blocked_no_access`, with reason and timestamp.

## 10. Access lifecycle for first pilot

Conceptual lifecycle:

```text
candidate -> invited -> account_created -> login_verified -> active_closed_pilot -> first_work_completed -> reviewed -> completed_pilot
```

Possible stops:

```text
blocked_no_access
paused
withdrawn
no_go
```

These are pilot register states. They are not declared implemented DB enum states.

## 11. Mapping to current StudentAccess

Current relationship:

* `StudentAccess` exists and can record access/trial/subscription strings.
* Signup creates a default `no_access / none / none` row.
* Admin detail can read `StudentAccess`.
* The current admin transition endpoint can reaffirm no-access only.
* No-access reaffirmation is not activation.
* Current `StudentAccess` is not yet the full closed-pilot operational source of truth.

Future relationship:

* A future implementation phase may bind pilot access to `StudentAccess` after the closed-pilot source-of-truth design is accepted.
* Direct DB mutation must not be normal operation.
* Missing `StudentAccess` rows remain integrity issues, not implicit no-access.
* Trial, subscription, runtime enforcement, and `/now` access behavior require separate phases.

## 12. Acceptance criteria for ACCESS-2

ACCESS-2 is accepted when:

* Access source-of-truth approach is selected.
* Register fields and allowed values are defined.
* Privacy/data rule is explicit.
* Minimal admin surface concept is defined.
* Operational update rules are defined.
* First pilot lifecycle is defined.
* Mapping to current `StudentAccess` is documented.
* Recommended next phase is identified.
* No real student data is committed.
* No access, trial, payment, or pilot execution is activated.

## 13. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-ACCESS-3 - Create closed-pilot access register template and implementation readiness for admin surface
```

ACCESS-3 should:

* create a versioned template only, with no real student data;
* define where the private non-committed instance lives operationally;
* decide whether a minimal admin surface is required before pilot execution;
* preserve no-payment closed lab boundaries;
* avoid real access activation unless explicitly authorized in a later phase.

If a future audit decides the register template is sufficient for a dry-run, `/now` pilot audit can follow. Current evidence favors finishing the access source-of-truth artifact first.

## 14. Phase gate classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go, with dependency on access source of truth
Sales-ready relevance: direct/high
Dependency: MVP-SALES-PILOT-ACCESS-1 closed at 530002a
What it advances: minimal access source of truth for first closed M1-first pilot
What it does not advance: code, DB, real student activation, payment, trial, runtime enforcement, pilot execution
Priority verdict: APPROVED_ACCESS_SOURCE_OF_TRUTH_DESIGN
Authorization status: executed only after Mauricio authorization
```

## 15. Non-goals

This phase does not:

* edit app code;
* edit tests;
* edit Prisma schema;
* edit package files;
* run tests/build;
* run Prisma;
* run SQL;
* run DB commands;
* create fixtures;
* create students;
* create `StudentAccess` rows;
* create `StudyLoad` rows;
* activate trial;
* activate payment;
* create subscription state;
* reconcile real payments;
* create a real access register with real private data;
* commit private student data;
* run browser/runtime/dev server;
* touch staging or production;
* inspect `.env`, database URLs, raw env values, secrets, tokens, passwords, cookies, headers, or backups;
* approve student use;
* approve product use;
* declare `PAES_L1` ready;
* declare `PAES_M2` ready;
* declare Sales-Ready;
* execute a pilot.

## 16. Result marker

```text
MVP_SALES_PILOT_ACCESS_2_SOURCE_OF_TRUTH_DESIGNED
```
