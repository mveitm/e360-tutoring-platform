# MVP-SALES-PILOT-ACCESS-3 - Closed pilot access register template and admin surface readiness

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-ACCESS-3 - Create closed-pilot access register template and admin surface readiness
```

Type:

```text
Documentation/template/readiness only / no implementation / no runtime / no DB.
```

Purpose:

* Create a safe versioned closed-pilot access register template.
* Preserve the rule that the real register instance must remain private and non-committed.
* Define readiness for a future minimal admin or operational surface.
* Decide whether the next phase should implement/admin-design access further or move to `/now` pilot audit.

This phase does not create a real register instance, real student data, DB rows, access activation, trial activation, payment activation, pilot execution, or product/student approval.

## 2. Baseline and Context Gate summary

Baseline before this phase:

```text
HEAD = origin/main = origin/HEAD = 6c94ff9
```

Latest accepted commit:

```text
6c94ff9 - MVP-SALES-PILOT-ACCESS-2: design pilot access source of truth
```

Context Gate summary:

* External audit remains `NO_LISTO`.
* First pilot remains `NARROWED_FIRST_VERTICAL_PILOT`.
* `PAES_M1 = PILOT_USABLE_WITH_LIMITS`.
* `PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT`.
* `PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT`.
* `MVP-SALES-PILOT-ACCESS-1` selected `STAGED_NO_PAYMENT_THEN_PAYMENT_SANDBOX`.
* `MVP-SALES-PILOT-ACCESS-2` selected `HYBRID_TEMPLATE_NOW_ADMIN_SURFACE_NEXT`.
* Current `StudentAccess` and admin surfaces are useful fragments, but not a full closed-pilot source of truth.

Read-only inspection confirmed the same access/admin baseline:

* `StudentAccess` exists with access, trial, subscription, trial timestamp, and decision metadata fields.
* Signup creates default `no_access / none / none`.
* Admin student detail displays `StudentAccess` read-only.
* Admin detail includes account creation/reset and enrollment controls.
* Admin access transition endpoint only reaffirms no-access.
* No trial activation, payment/subscription, runtime enforcement, L1/M2 activation, or complete pilot register surface exists.

## 3. Starting point from ACCESS-2

Source-of-truth decision from ACCESS-2:

```text
HYBRID_TEMPLATE_NOW_ADMIN_SURFACE_NEXT
```

Meaning preserved in this phase:

* Template now.
* Real register instance remains private and non-committed.
* Future admin surface is preferred before real pilot execution.
* Memory, chat messages, informal notes, and direct DB edits are not acceptable as the source of truth.

## 4. Template creation decision

Decision:

```text
VERSIONED_TEMPLATE_CREATED
PRIVATE_REGISTER_INSTANCE_REQUIRED_FOR_EXECUTION
```

The repo stores only the schema/template for operating the closed pilot register.

The actual pilot register must be stored in an approved private location outside the repo until a proper product/admin surface exists.

The committed template contains participant codes only:

```text
PILOT_M1_001
PILOT_M1_002
PILOT_M1_003
```

It must never be converted into the real register by adding names, emails, phones, RUTs, payment proof, consent records, support notes, credentials, secrets, or private student data.

## 5. Template file reference

Template file:

```text
nextjs_space/docs/operations/templates/CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE.md
```

This file is a template only. It is not the real pilot register.

## 6. Template field rationale

### Pilot identity

Fields such as `pilotRunId`, `pilotName`, `pilotScope`, `paymentMode`, `trialMode`, `registerOwner`, `privateRegisterLocationRef`, `createdAt`, and `lastUpdatedAt` define the pilot run without exposing participant data.

They keep the first pilot scoped as:

```text
PAES_M1_ONLY_CLOSED_LAB
NO_PAYMENT
NOT_PUBLIC_TRIAL
```

### Participant pseudonymization

`participantCode`, `participantClass`, `contactReference`, and `notesRef` allow repo-safe tracking while keeping real contact, consent, and support details outside the repo.

### Access mode/status

`accessMode` and `accessStatus` distinguish closed-lab no-payment access from trial-only, manual payment sandbox, paused, withdrawn, completed, and blocked states.

These are register values, not implemented DB enum claims.

### Program scope

`programScope`, `L1Status`, and `M2Status` prevent the first pilot from implying full L1/M1/M2 readiness.

For ACCESS-3, the template preserves:

```text
programScope = PAES_M1_ONLY
L1Status = internal_only_not_active
M2Status = waitlist_or_excluded
```

### Account/login readiness

`accountStatus` tracks whether account creation and login verification are ready enough for the pilot. It must not store credentials.

### `/now` readiness

`nowStatus` records whether `/now` is ready, blocked, confusing, or unchecked for the narrowed M1-first scope.

This matters because the external audit identified `/now` as a blocker unless the selected scope is honestly represented.

### First StudyLoad readiness

`firstStudyLoadStatus` tracks whether the first M1 StudyLoad is assigned, pending, in progress, completed, or blocked.

This keeps the dry-run focused on the vertical circuit, not only access state.

### Evidence/admin review status

`evidenceStatus` and `adminReviewStatus` capture whether in-app evidence exists and whether admin/tutor review is possible.

### Support/go-no-go status

`supportStatus` and `goNoGoStatus` ensure support/failure handling and pilot decision state are recorded before execution or expansion.

### Update metadata

`lastUpdatedBy` and `lastUpdatedAt` create a minimal manual audit trail for the private register instance until app audit exists.

### Privacy guardrails

`contactReference`, `notesRef`, and `privateRegisterLocationRef` point to private external references. They must not contain raw private data in repo.

## 7. Privacy/data policy

Use participant codes only in repo:

```text
PILOT_M1_001
PILOT_M1_002
PILOT_M1_003
```

Never commit:

* real student names;
* emails;
* phone numbers;
* RUTs;
* payment evidence;
* private consent files;
* support notes;
* credentials;
* passwords;
* secrets;
* tokens;
* raw environment values;
* sensitive education or personal notes.

The real register instance must be private and controlled.

Public docs may mention aggregate status only.

No secrets or raw env values may be stored in the template, register reference, logs, reports, or commits.

## 8. Admin surface readiness

### Current observed surfaces

Current app/admin surfaces show useful partial capability:

* `StudentAccess` schema exists.
* Signup creates a default `StudentAccess` row.
* Admin student detail shows `StudentAccess` read-only.
* Admin student detail can create an access account for a student if no user account exists.
* Admin student detail can reset password for an existing account.
* Admin student detail can create and update program enrollments.
* Admin access transition endpoint can reaffirm no-access only.
* `/now` shows active enrollment and StudyLoad state, but does not use `StudentAccess` as an access gate.

### Gaps

Current surfaces do not provide:

* a pilot participant-code view;
* a single pilot run view for 3 controlled students;
* closed-pilot access activation;
* `nowStatus`;
* first M1 StudyLoad readiness status across participants;
* evidence/admin review coarse status across the pilot;
* support/go-no-go status;
* private-register linkage;
* payment/trial/legal boundary status;
* runtime enforcement;
* public or closed-lab trial activation;
* payment/subscription handling.

### Minimum future admin surface

If implemented in a future authorized phase, the minimum admin or operational surface should show:

* participant/student identity only through app-legitimate data;
* pilot access status;
* M1-only pilot scope;
* account/login state;
* `/now` readiness;
* first StudyLoad status;
* evidence/admin review status;
* support/go-no-go coarse status.

It should support inspection and repeatable operation before broader automation.

### Non-goals

The minimal future admin surface must not show or mutate:

* payment details;
* subscription;
* public trial activation;
* L1 activation;
* M2 activation;
* legal consent automation;
* irreversible deletion;
* broad access mutations;
* private support notes;
* credentials or secrets.

## 9. Admin surface decision

Decision:

```text
TEMPLATE_SUFFICIENT_FOR_DRY_RUN_ADMIN_SURFACE_BEFORE_REAL_STUDENTS
```

Meaning:

* A private template/register can support the next dry-run planning step.
* Before real 3 students, Bexauri must implement or define an approved admin/operational surface if the pilot depends on repeatable account, access, StudyLoad, evidence, support, or review operations.
* Avoid overbuilding admin surface before `/now` pilot audit clarifies the minimum student-facing experience required for the narrowed M1-first path.

Reason:

The template/source-of-truth design is now enough for planning, but the next biggest vertical blocker is whether `/now` can honestly support the narrowed M1-first pilot without confusing L1/M2 or implying triad readiness.

## 10. Dry-run implications

The template can support a future dry-run by allowing the operator to:

* create 3 participant codes only;
* keep real participant data outside repo;
* record no-payment closed lab access mode;
* update `/now`, account, StudyLoad, evidence, admin review, support, and go/no-go states as dry-run evidence is collected;
* record gaps explicitly when app/admin surfaces are missing.

If app/admin surfaces are missing, the dry-run must document the gap instead of pretending readiness.

The dry-run must not use this repo template as the real register.

## 11. Conditions before real pilot execution

Before real pilot execution:

* private register instance exists;
* access mode is no-payment closed lab;
* support path is documented;
* `/now` selected pilot scope is honest;
* M1 StudyLoad route is available;
* admin/tutor evidence path is known;
* no L1/M2 claims are made;
* no public Sales-Ready claims are made;
* no payment, public trial, subscription, score prediction, mastery/theta, adaptive AI, complete coverage, or guaranteed improvement claim is made;
* product/student use is separately authorized.

## 12. Recommended next phase

Recommended next phase:

```text
MVP-SALES-NOW-PILOT-1A - Audit /now for narrowed M1-first pilot experience
```

Reason:

The template/source-of-truth design is now enough for planning. The next biggest blocker for the vertical path is whether `/now` can honestly support the narrowed M1-first pilot without confusing L1/M2 or triad scope.

Deferred alternatives:

* `MVP-SALES-PILOT-ACCESS-4 - Implement minimal closed-pilot admin surface` should wait until `/now` audit clarifies the minimal operating state needed.
* `MVP-SALES-PILOT-DRY-RUN-0 - Prepare dry-run plan` should follow after `/now` audit or after any minimal admin gap is resolved.

## 13. Phase gate classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go, with dependency on access source of truth and /now pilot experience
Sales-ready relevance: direct/high
Dependency: MVP-SALES-PILOT-ACCESS-2 closed at 6c94ff9
What it advances: closed-pilot access register template and admin surface readiness
What it does not advance: code, DB, real student activation, payment, trial, runtime enforcement, pilot execution
Priority verdict: APPROVED_ACCESS_TEMPLATE_AND_READINESS
Authorization status: executed only after Mauricio authorization
```

## 14. Non-goals

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
* create a real access register instance;
* commit real student data;
* commit names, emails, phone numbers, RUTs, payment evidence, consent records, support details, credentials, secrets, or private notes;
* run browser/runtime/dev server;
* touch staging or production;
* inspect `.env`, database URLs, raw env values, secrets, tokens, passwords, cookies, headers, or backups;
* approve student use;
* approve product use;
* declare `PAES_L1` ready;
* declare `PAES_M2` ready;
* declare Sales-Ready;
* execute a pilot.

## 15. Result marker

```text
MVP_SALES_PILOT_ACCESS_3_TEMPLATE_AND_ADMIN_READINESS_DEFINED
```
