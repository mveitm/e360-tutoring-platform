# Admin StudentAccess Transition Contract Readiness

## 1. Phase

* Phase: `MVP-SALES-TRIAL-3J`.
* Type: documentation-only readiness.
* Baseline: `d540457`.
* No implementation authorized.
* No admin mutation enabled.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`, closed laboratory only.

## 2. Relationship to 3I

`MVP-SALES-TRIAL-3I` defined the future `StudentAccess` transition model as readiness only. `MVP-SALES-TRIAL-3J` narrows that model into a future admin mutation contract.

3J does not implement endpoints, buttons, forms, database writes, schema changes, migrations, runtime enforcement, or admin mutation behavior. 3J does not enable trial activation.

## 3. Current implemented state

* Signup creates a default `StudentAccess` row.
* Current signup defaults:
  * `accessStatus = no_access`
  * `trialStatus = none`
  * `subscriptionStatus = none`
  * `lastDecisionBy = system`
  * `lastDecisionReason = public_signup_default_no_access`
* Admin student detail displays `StudentAccess` read-only.
* No `StudentAccess` admin mutation exists.
* No repair/autocreate behavior exists.
* No runtime enforcement exists.
* No student-facing access display exists.
* No billing, subscription, or payment behavior exists.

## 4. Contract boundaries

The future contract is for internal admin/operator `StudentAccess` mutations only. This phase does not activate that contract.

Boundaries:

* Internal/admin-only.
* Closed-lab only unless a later Sales-Ready gate changes the horizon.
* No public Sales-Ready signal.
* No student-facing promise.
* No billing/payment source-of-truth.
* No runtime enforcement unless a future phase authorizes and implements it.
* No automatic repair/autocreate.
* No schema, DB, endpoint, or UI implementation in 3J.

## 5. Candidate admin transition commands

These are future conceptual commands, not implemented commands. Some target statuses exist in the current validation helper as string values, but no admin command surface exists today.

* `keep_no_access`: candidate/future conceptual no-op or reaffirmation command.
* `invite_closed_lab_trial`: candidate/future conceptual command toward `trial_invited`.
* `activate_closed_lab_trial`: candidate/future conceptual command toward `trial_active`.
* `expire_trial`: candidate/future conceptual command toward `trial_expired_blocked` / `expired`.
* `revoke_access`: candidate/future conceptual command to move from active access to a safe non-active state.
* `mark_subscription_backed_access`: candidate/future conceptual command; billing/subscription source-of-truth is not implemented.
* `suspend_access`: candidate/future conceptual command; no explicit suspend status exists today.
* `repair_missing_student_access_row`: candidate/future conceptual integrity command; no repair/autocreate behavior exists today.

## 6. Command table

| Command | Purpose | Current precondition | Target conceptual state | Required actor | Required evidence | Required audit fields | Allowed now? | Future phase required? | Explicit non-goals |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| read_only_observation | Observe current admin detail state | Admin student detail can read `access` | No state change | admin/operator read | 3G implementation and 3H smoke | None beyond existing display | yes, already implemented | no | No mutation, no activation |
| keep_no_access | Reaffirm no access without granting permission | Existing row, `no_access` / `none` | `no_access` / `none` | admin/operator or system in future | Reason for reaffirmation | `decisionBy`, `decisionReason`, `decisionAt`, previous and next state | no | yes | No runtime or student-facing change |
| invite_closed_lab_trial | Record closed-lab trial invitation | Existing row, safe non-active state | Candidate `trial_invited` / `invited` | admin/operator in future | Participant approval, invitation date, closed-lab scope | Actor, reason, timestamps, evidence, prior state | no | yes | No activation, no runtime access |
| activate_closed_lab_trial | Start closed-lab trial | Existing invited or approved trial state | Candidate `trial_active` / active trial status | admin/operator in future | Activation approval, duration, dates, copy/support readiness | Actor, reason, activation/expiry dates, evidence | no | yes | No public offer, no billing |
| expire_trial | Mark trial expired | Existing active trial state | Candidate `trial_expired_blocked` / `expired` | system or admin/operator in future | Expiry timestamp and prior trial evidence | Actor/source, reason, prior/next state, expiry timestamp | no | yes | No reactivation, no paid access |
| revoke_access | Remove previously active access | Existing active candidate state | Safe non-active target | admin/operator in future | Support/commercial reason and prior state | Actor, reason, evidence, previous and next state | no | yes | No silent student lockout without future policy |
| mark_subscription_backed_access | Reflect paid/subscription-backed access | Billing source exists | Candidate subscription-backed access | billing/payment system or admin/operator in future | Payment/subscription source and plan | Actor/source, reason, evidence ref, commercial gate | no | yes | No billing source-of-truth in 3J |
| suspend_access | Pause access under a defined policy | Existing active candidate state | Candidate suspended/non-active state | admin/operator or billing/payment system in future | Suspension reason, duration, policy basis | Actor, reason, evidence, previous and next state | no | yes | No implemented suspend state today |
| repair_missing_student_access_row | Repair integrity issue | Student exists and row is missing | Non-permission default row | system or admin/operator in future | Integrity diagnosis and source state | Actor, reason, evidence, default target, correlation | no | yes | No access/trial activation |

## 7. Validation contract

Future validation must:

* Require an existing student.
* Require an existing `StudentAccess` row unless the command is explicit repair.
* Reject a missing row for normal transitions.
* Reject unknown target state.
* Reject no-op unless the command explicitly documents no-op behavior.
* Require decision reason.
* Require actor identity.
* Require previous state check.
* Require conflict and idempotency policy.
* Require commercial/product gate check where applicable.
* Require trial dates for trial activation and expiry.
* Reject billing-backed access without billing source readiness.
* Reject runtime-dependent states before runtime readiness.

This phase does not implement validation.

## 8. Audit payload contract

Future admin mutation payloads should conceptually capture:

* `studentId`
* previous `accessStatus`
* previous `trialStatus`
* previous `subscriptionStatus`
* next `accessStatus`
* next `trialStatus`
* next `subscriptionStatus`
* `decisionBy`
* `decisionReason`
* `decisionAt`
* `evidenceType`
* `evidenceRef`, non-sensitive
* `commercialGate`
* `runtimeImpact`
* `studentFacingImpact`
* `operatorNotes`, optional/internal
* `correlationId` or `requestId`, if a future implementation supports it

No schema changes are authorized in 3J. Existing `StudentAccess` fields related to decision audit are `lastDecisionBy`, `lastDecisionReason`, and `lastDecisionAt`. Additional audit storage requires a separate future phase if needed.

## 9. Safe failure model

| Error | Safe behavior | DB mutation | Access activation | Message scope | Investigation needed |
| --- | --- | --- | --- | --- | --- |
| `student_not_found` | Return controlled failure | no | no | internal/admin-only | yes, confirm target |
| `student_access_missing` | Stop normal transition | no | no | internal/admin-only | yes, integrity review |
| `invalid_transition` | Reject command | no | no | internal/admin-only | yes, if policy mismatch |
| `unsupported_target_state` | Reject command | no | no | internal/admin-only | yes, contract/schema review |
| `missing_decision_reason` | Reject command | no | no | internal/admin-only | no, operator can correct |
| `missing_actor` | Reject command | no | no | internal/admin-only | yes, auth/session review |
| `stale_state_conflict` | Reject and require refresh | no | no | internal/admin-only | maybe, if repeated |
| `trial_policy_missing` | Reject trial command | no | no | internal/admin-only | yes, product/commercial gate |
| `billing_source_missing` | Reject billing-backed command | no | no | internal/admin-only | yes, billing readiness |
| `runtime_gate_not_ready` | Reject runtime-dependent target | no | no | internal/admin-only | yes, runtime readiness |
| `student_facing_copy_not_ready` | Reject student-visible transition | no | no | internal/admin-only | yes, product/brand review |

## 10. Missing-row policy

* A missing `StudentAccess` row is an integrity issue, not `no_access`.
* Normal transitions must not autocreate a row.
* Repair is a separate command and requires future repair readiness.
* Repair must default to a non-permission state.
* Repair must be auditable.
* Repair must not activate trial or access.

## 11. Trial-specific contract risks

Trial activation requires future readiness for:

* Participant criteria.
* Trial duration.
* Activation actor.
* Expiry behavior.
* Copy and support path.
* Data fields and timestamps.
* Whether trial implies runtime access.
* How expired trials are handled.

3J does not resolve or implement trial activation.

## 12. Runtime enforcement dependency

Admin transition state does not by itself imply runtime enforcement. Runtime enforcement requires separate readiness and implementation phases.

Student-facing continuity and `/now` are high-risk because they affect the student's immediate learning path. Missing-row behavior must be safe before any runtime enforcement is implemented.

## 13. Student-facing dependency

* No student-facing display is added in 3J.
* Any future student-facing display requires copy, brand, and product review.
* Future copy must avoid public Sales-Ready signals.
* Future UI must avoid exposing internal admin state directly.

## 14. Security and authorization readiness

Future implementation must:

* Require admin/operator authorization.
* Avoid cookie, token, header, secret, raw session, and raw environment exposure in smoke reports.
* Avoid client-side-only authorization.
* Avoid broad public API access.
* Avoid leaking sensitive decision evidence.
* Ensure future admin UI does not expose secrets or raw session data.

No auth changes are implemented in 3J.

## 15. Future implementation phases required

Each future phase requires explicit new opening and Context Gate:

* A. Admin mutation implementation readiness.
* B. Admin mutation endpoint implementation.
* C. Admin mutation UI implementation.
* D. Admin mutation smoke.
* E. Trial activation readiness.
* F. Runtime enforcement readiness.
* G. Student-facing access display readiness.
* H. Missing-row repair readiness.
* I. Billing/subscription/payment readiness.

## 16. Recommended next phase options

Option A:

`MVP-SALES-TRIAL-3K - Admin StudentAccess mutation endpoint readiness`

Option B:

`MVP-SALES-TRIAL-3K - Trial activation readiness`

Option C:

`MVP-SALES-TRIAL-3K - Runtime enforcement readiness`

Option D:

Pause on clean baseline.

Recommendation: prefer Admin StudentAccess mutation endpoint readiness before implementing any mutation or trial activation.

## 17. Conclusion

3J defines the future admin transition contract only. No transition is enabled. `StudentAccess` remains read-only in admin. Future implementation requires explicit new phases.
