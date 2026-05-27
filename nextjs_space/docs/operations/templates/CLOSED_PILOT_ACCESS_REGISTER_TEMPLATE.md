# Closed Pilot Access Register Template

TEMPLATE ONLY - DO NOT ENTER REAL STUDENT DATA IN THIS FILE.

## Privacy Warning

Do not commit real names, emails, phone numbers, RUTs, payment proof, consent records, support notes, passwords, secrets, credentials, private student data, health/education sensitive notes, or private contact details in this file.

Use participant codes only in repo-visible materials. The real pilot register instance must live in an approved private location outside the repo until a proper product/admin surface exists.

## Pilot Header

```text
pilotRunId: <PRIVATE_REGISTER_VALUE>
pilotName: <PRIVATE_REGISTER_VALUE>
pilotScope: PAES_M1_ONLY_CLOSED_LAB
paymentMode: NO_PAYMENT
trialMode: NOT_PUBLIC_TRIAL
registerOwner: <PRIVATE_REGISTER_VALUE>
privateRegisterLocationRef: <PRIVATE_EXTERNAL_REFERENCE>
createdAt: <YYYY-MM-DD>
lastUpdatedAt: <YYYY-MM-DD>
```

## Participant Table

| participantCode | participantClass | contactReference | consentStatus | payerStatus | accessMode | accessStatus | programScope | L1Status | M2Status | accountStatus | nowStatus | firstStudyLoadStatus | evidenceStatus | adminReviewStatus | supportStatus | goNoGoStatus | lastUpdatedBy | lastUpdatedAt | notesRef |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PILOT_M1_001 | controlled_student | <PRIVATE_EXTERNAL_REFERENCE> | pending | no_payment | closed_lab_no_payment | invited | PAES_M1_ONLY | internal_only_not_active | waitlist_or_excluded | not_created | not_checked | not_assigned | none | not_started | none | not_evaluated | <OPERATOR_CODE> | <YYYY-MM-DD> | <PRIVATE_EXTERNAL_REFERENCE> |
| PILOT_M1_002 | controlled_student | <PRIVATE_EXTERNAL_REFERENCE> | pending | no_payment | closed_lab_no_payment | invited | PAES_M1_ONLY | internal_only_not_active | waitlist_or_excluded | not_created | not_checked | not_assigned | none | not_started | none | not_evaluated | <OPERATOR_CODE> | <YYYY-MM-DD> | <PRIVATE_EXTERNAL_REFERENCE> |
| PILOT_M1_003 | controlled_student | <PRIVATE_EXTERNAL_REFERENCE> | pending | no_payment | closed_lab_no_payment | invited | PAES_M1_ONLY | internal_only_not_active | waitlist_or_excluded | not_created | not_checked | not_assigned | none | not_started | none | not_evaluated | <OPERATOR_CODE> | <YYYY-MM-DD> | <PRIVATE_EXTERNAL_REFERENCE> |

## Allowed Status Values

These values are documentation-only register values. They are not declared implemented database enum values.

### participantClass

```text
controlled_student
internal_test
owner_test
```

### consentStatus

```text
not_required
pending
confirmed
not_applicable
blocked
```

### payerStatus

```text
no_payment
not_applicable
pending_future_sandbox
blocked
```

### accessMode

```text
closed_lab_no_payment
trial_only
manual_payment_sandbox
blocked
```

### accessStatus

```text
candidate
invited
account_created
login_verified
active_closed_pilot
paused
withdrawn
completed
blocked_no_access
```

### programScope

```text
PAES_M1_ONLY
```

### L1Status

```text
internal_only_not_active
```

### M2Status

```text
waitlist_or_excluded
```

### accountStatus

```text
not_created
created
login_verified
blocked
```

### nowStatus

```text
not_checked
ready
blocked
confusing
```

### firstStudyLoadStatus

```text
not_assigned
pending
in_progress
completed
blocked
```

### evidenceStatus

```text
none
partial
captured
review_ready
```

### adminReviewStatus

```text
not_started
reviewed
issue_found
complete
```

### supportStatus

```text
none
support_path_defined
issue_open
issue_resolved
blocked
```

### goNoGoStatus

```text
not_evaluated
go
no_go
narrow_scope
```

## Update Rules

* Update only a private, non-committed register instance.
* Do not place real participant data in this template.
* Every private register update must include `lastUpdatedBy` and `lastUpdatedAt`.
* Use `contactReference` and `notesRef` only as private external references, not as raw private data.
* Keep `paymentMode = NO_PAYMENT` for the first dry-run and initial closed pilot unless a later explicit payment sandbox phase changes it.
* Keep `trialMode = NOT_PUBLIC_TRIAL` unless a later explicit trial phase changes it.
* Keep `programScope = PAES_M1_ONLY` for the first pilot.
* Keep `L1Status = internal_only_not_active` and `M2Status = waitlist_or_excluded`.
* Do not mark `active_closed_pilot` until access mode, consent status if applicable, account state, `/now` readiness, and support path are recorded.
* Do not mark `go` until first StudyLoad status, evidence status, admin review status, and support status are recorded.
* If app/admin surfaces are missing, record the gap instead of pretending readiness.

## Go/No-Go Summary

```text
pilotRunId: <PRIVATE_REGISTER_VALUE>
overallScope: PAES_M1_ONLY_CLOSED_LAB
participantsReady: <0-3>
nowReady: <yes/no/blocked>
firstStudyLoadReady: <yes/no/blocked>
evidenceReviewReady: <yes/no/blocked>
supportReady: <yes/no/blocked>
goNoGoDecision: not_evaluated
decisionDate: <YYYY-MM-DD>
decisionBy: <OPERATOR_CODE>
decisionNotesRef: <PRIVATE_EXTERNAL_REFERENCE>
```

## Explicit Boundary

This template is not the real pilot register. The real register instance must remain private and non-committed.
