# MVP-SALES-PILOT-ACCESS-1 - Closed pilot access/payment/trial boundary

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-PILOT-ACCESS-1 - Define closed-pilot access/payment/trial boundary for 3 controlled students
```

Type:

```text
Documentation/scope/custody only / no implementation / no runtime / no DB.
```

Mission:

Define the access/payment/trial boundary for the first closed M1-first pilot with 3 controlled students.

## 2. Baseline and Context Gate summary

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = 6648bab
```

Latest accepted commit:

```text
6648bab - MVP-SALES-PILOT-SCOPE-1: lock closed pilot scope
```

Context Gate summary:

* `MVP-SALES-PILOT-SCOPE-1` locked the first pilot as narrowed, M1-first, 3 controlled students, not public Sales-Ready, and not full L1/M1/M2 triad.
* External audit remains `NO_LISTO`.
* Existing StudentAccess documentation confirms default `no_access / none / none`, read-only admin visibility, no runtime enforcement, no trial activation, and no billing/subscription/payment behavior.
* Current schema contains StudentAccess fields for access, trial, subscription, trial timestamps, and decision metadata.
* Current signup creates a StudentAccess row with `accessStatus = no_access`, `trialStatus = none`, and `subscriptionStatus = none`.
* Current admin access-transition endpoint only reaffirms no-access; it does not activate trial, payment, subscription, enrollment, or runtime access.

## 3. Starting point from MVP-SALES-PILOT-SCOPE-1

```text
NARROWED_FIRST_VERTICAL_PILOT
```

Pilot starting point:

* M1-first.
* 3 controlled students.
* Not public Sales-Ready.
* Not full L1/M1/M2 triad.

Program posture:

```text
PAES_M1 = PILOT_USABLE_WITH_LIMITS
PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT
PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT
```

## 4. Current access/payment/trial state from documentation

### Observed facts

* `StudentAccess` exists in schema.
* Student signup creates a StudentAccess row by default.
* Default signup state is `accessStatus = no_access`, `trialStatus = none`, and `subscriptionStatus = none`.
* Admin student detail can show StudentAccess state read-only.
* A non-permission admin reaffirm-no-access endpoint exists.
* `reaffirm_no_access` updates decision metadata only when the row is already `no_access / none / none`.
* The admin read-only StudentAccess surface explicitly says it does not activate trial, subscription, enrollment, or runtime access.
* The transition readiness doc states no runtime access enforcement exists.
* The transition readiness doc states no trial activation exists.
* The transition readiness doc states no billing, subscription, or payment behavior exists.
* Existing commercial copy docs keep payment at `NO-GO` and separate invitation from activation, trial, subscription, and access.

### Inferences

* StudentAccess is currently a lifecycle/audit scaffold, not a working access entitlement system.
* The current no-access reaffirm path is useful for avoiding accidental permission, but it cannot support an active closed pilot by itself.
* A closed pilot needs a source of truth for access that is more operational than memory, but less ambitious than public subscription/payment automation.
* Payment should not be included in the first dry-run because payment would add payer identity, refund, cancellation, minor/guardian, reconciliation, and support obligations before the product circuit is proven.

### Missing evidence

* No evidence of trial activation as an approved operation.
* No evidence of runtime enforcement bound to StudentAccess.
* No evidence of `/now` access-state display for closed pilot participants.
* No evidence of payment/subscription implementation.
* No evidence of a manual payment ledger or reconciliation source of truth.
* No evidence of minor/guardian payment consent policy.
* No evidence of refund/cancel/pause policy for paid access.

Current explicit state:

```text
StudentAccess exists: yes
No-access/admin reaffirmation exists: yes, non-permission only
Trial activation exists: no
Runtime enforcement exists: no
Payment/subscription exists: no
Manual payment policy exists: no
Minor/payment consent policy exists: no
```

## 5. Access/payment/trial decision for first closed pilot

Decision:

```text
STAGED_NO_PAYMENT_THEN_PAYMENT_SANDBOX
```

Meaning:

* The first vertical dry-run and initial closed pilot scope should not depend on payment.
* Access state must be explicit and controlled.
* A later separate payment sandbox may test manual controlled payment or a payment provider path.
* No public subscription claim is allowed yet.

## 6. Rationale for decision

Payment should not be included in the first M1-first vertical pilot because the core product circuit still needs proof: controlled student entry, explicit access state, honest `/now`, M1 StudyLoad completion, evidence capture, admin/tutor review, support handling, and go/no-go.

A no-payment first run is safer because it avoids converting unresolved operational risk into a commercial obligation. It still forces the access source of truth to be explicit and auditable.

Trial-only access is not selected as the first live boundary because trial activation, expiry behavior, runtime enforcement, and student-facing copy are not implemented or proven as a coherent system.

Manual controlled payment would require, before use:

* payer identity and consent, especially if minors are involved;
* written scope and price;
* refund/cancel/pause rule;
* payment/access ledger;
* reconciliation owner and cadence;
* support channel and response window;
* explicit statement that payment does not imply full L1/M1/M2 Sales-Ready.

Subscription or payment provider integration would require, before use:

* provider/source-of-truth decision;
* subscription states;
* access mapping;
* failure and reconciliation policy;
* secrets/provider handling outside docs;
* runtime and admin surfaces;
* legal/support/payment copy review.

This staged boundary avoids memory-only access decisions by requiring a documented pilot access register or future minimal admin surface before execution.

## 7. Access source of truth

Minimum acceptable source of truth for the first pilot:

```text
structured pilot access register first, future minimal admin surface preferred before execution
```

Acceptable near-term options:

* structured pilot access register as temporary documentation;
* existing admin read-only StudentAccess visibility for cross-checking;
* future minimal admin surface for pilot access state if implemented in a later phase;
* future StudentAccess binding only after safe implementation/design review.

Rules:

* Access must not rely only on memory, chat, or informal notes.
* Direct DB editing must not be normal operation.
* Any manual action must be documented and reproducible.
* Missing StudentAccess row must be treated as an integrity issue, not silently as no access.
* StudentAccess state must not be shown as a commercial promise.

## 8. Participant access states

Conceptual states for the 3 controlled students, without creating rows:

* `invited_not_started` - participant identified or invited, no active pilot access.
* `active_closed_pilot` - participant approved for the closed M1-first pilot window.
* `paused_or_withdrawn` - participant paused, withdrawn, or blocked from continuing pending review.
* `completed_pilot` - participant completed the agreed pilot scope.
* `blocked_no_access` - participant must not access the pilot experience.

Mapping to current evidence:

* Current implemented default maps only to a safe no-access concept: `accessStatus = no_access`, `trialStatus = none`, `subscriptionStatus = none`.
* Current helper strings include possible future trial and subscription-like states, but they are not operational authorization.
* `active_closed_pilot` may later map to a StudentAccess transition only after access activation, runtime behavior, and audit policy are designed and authorized.
* Do not invent DB enum guarantees; current fields are strings with application validation.

## 9. Payment boundary

First pilot payment decision:

```text
No payment collected in the first vertical dry-run or initial closed M1-first pilot.
```

Reason:

The first pilot must prove the product/admin/support circuit before adding payer, refund, reconciliation, and commercial trust obligations.

Later manual payment sandbox requirements:

* explicit sandbox phase;
* payer identified;
* minor/guardian consent resolved if applicable;
* payment amount and scope documented;
* refund/cancel/pause rule documented;
* payment/access ledger defined;
* support/contact expectation defined;
* no public offer or subscription claim;
* no implication of full L1/M1/M2 Sales-Ready.

If minors are involved, the payer must be a responsible adult/guardian. No payment request may be directed to a minor.

No subscription claim is allowed before implementation and reconciliation are real.

## 10. Trial boundary

First pilot trial decision:

```text
Do not call the first run a public trial.
```

The first run may be described internally as a closed no-payment lab or controlled pilot, not a public free trial.

Trial dates:

* A pilot window may be documented operationally.
* It should not be represented as an implemented trial timer unless StudentAccess trial activation and expiry behavior are actually implemented.

Trial expiration:

* Not enforced by runtime in this phase.
* Any closure/expiry must be handled through documented pilot operations until a future implementation phase binds it to StudentAccess/runtime.

`/now`:

* `/now` should be honest for the selected scope.
* `/now` should not claim a trial status unless trial display and behavior are implemented.

Deferred:

* trial activation;
* trial expiry enforcement;
* student-facing trial status display;
* public trial copy.

## 11. Support/legal boundary

Minimum closed-pilot requirements:

* informed participation;
* no public offer;
* no promise of PAES score, mastery, guaranteed improvement, adaptive AI, or complete coverage;
* support channel identified;
* expected response window identified;
* clear pause/stop/failure path;
* consent/payment boundary if minors participate;
* no direct payment request to a minor;
* guardian/responsible-adult communication if the participant is a minor and any consent/payment issue exists.

## 12. Implementation implications, but no implementation

Likely future design/implementation phases:

* minimal pilot access register/admin surface;
* `/now` pilot state copy and audit for M1-first narrowed scope;
* StudentAccess runtime binding if needed;
* manual payment sandbox later;
* pilot dry-run.

This phase does not implement any of them.

## 13. Acceptance criteria for this access boundary

This boundary is accepted when:

* access mode is selected;
* payment mode is selected;
* trial mode is selected;
* access source of truth is defined;
* no forbidden claims are made;
* next implementation/design blocker is identified.

Selected modes:

```text
Access mode = controlled explicit access through structured register / future minimal admin surface
Payment mode = no payment for first dry-run and initial closed pilot
Trial mode = not public trial; operational pilot window only until future trial implementation
Next blocker = minimal closed-pilot access register/admin surface design
```

## 14. Recommended next phase

Recommended next phase:

```text
MVP-SALES-PILOT-ACCESS-2 - Design minimal closed-pilot access register/admin surface
```

Reason:

The first pilot needs an access source of truth before `/now` or dry-run work can be honestly validated. Existing StudentAccess is read-only/non-permission and the current no-access reaffirm path does not activate or enforce access.

## 15. Phase gate classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go, with dependency on access/payment/trial boundary
Sales-ready relevance: direct/high
Dependency: MVP-SALES-PILOT-SCOPE-1 closed at 6648bab
What it advances: access/payment/trial boundary for first closed M1-first pilot
What it does not advance: code, DB, runtime enforcement, payment activation, trial activation, pilot execution
Priority verdict: APPROVED_ACCESS_BOUNDARY
Authorization status: executed only after Mauricio authorization
```

## 16. Non-goals

This phase does not:

* edit app code;
* edit tests;
* edit Prisma schema;
* edit package files;
* run tests/build;
* run Prisma, SQL, or DB commands;
* create fixtures;
* create students;
* create StudentAccess rows;
* create StudyLoad rows;
* activate trial;
* activate payment;
* create subscription state;
* reconcile real payments;
* run browser/runtime/dev server;
* touch staging or production;
* inspect `.env`, database URLs, raw env values, secrets, tokens, passwords, cookies, headers, or backups;
* approve student/product use beyond the documented future closed-pilot boundary;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute a pilot.

## 17. Result marker

```text
MVP_SALES_PILOT_ACCESS_1_BOUNDARY_DEFINED
```
