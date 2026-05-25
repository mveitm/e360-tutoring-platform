# Admin StudentAccess Mutation Endpoint Readiness

## 1. Phase

* Phase: `MVP-SALES-TRIAL-3K`.
* Type: documentation-only readiness.
* Baseline: `0b8e3c9`.
* No implementation authorized.
* No endpoint enabled.
* No admin mutation enabled.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`, closed laboratory only.

## 2. Relationship to 3I and 3J

`MVP-SALES-TRIAL-3I` defined `StudentAccess` transition model readiness. `MVP-SALES-TRIAL-3J` defined admin transition contract readiness. `MVP-SALES-TRIAL-3K` narrows that contract into readiness for a future admin endpoint.

3K does not implement an endpoint, route handler, UI, buttons, forms, schema changes, database writes, migrations, runtime enforcement, or trial activation.

## 3. Current implemented state

* Signup creates a default `StudentAccess` row.
* Current signup defaults:
  * `accessStatus = no_access`
  * `trialStatus = none`
  * `subscriptionStatus = none`
  * `lastDecisionBy = system`
  * `lastDecisionReason = public_signup_default_no_access`
* `GET /api/students/[id]` exposes `access` read-only to admin.
* Admin detail displays `StudentAccess` read-only.
* No `StudentAccess` admin mutation exists.
* No repair/autocreate behavior exists.
* No runtime enforcement exists.
* No student-facing access display exists.
* No billing, subscription, or payment behavior exists.

## 4. Endpoint boundary

Conceptual future route option:

```text
POST /api/admin/students/[id]/access-transitions
```

This route is not implemented. It is a readiness target only. If later implementation discovers a stronger local route convention, that future phase must document the choice before writing code.

Endpoint boundary:

* Internal admin-only endpoint.
* Not public.
* Not student-facing.
* No client-side-only authorization.
* No broad access API.
* No endpoint implemented in 3K.
* No mutation allowed now.

## 5. Candidate request shape

Conceptual future payload:

```json
{
  "command": "activate_closed_lab_trial",
  "expectedPreviousState": {
    "accessStatus": "...",
    "trialStatus": "...",
    "subscriptionStatus": "..."
  },
  "decisionReason": "...",
  "evidenceType": "...",
  "evidenceRef": "...",
  "trial": {
    "startsAt": "...",
    "expiresAt": "..."
  },
  "operatorNotes": "..."
}
```

This is conceptual only. No code or endpoint exists in 3K. Sensitive evidence must not be embedded raw. `evidenceRef` must be non-sensitive or internal-safe.

## 6. Candidate response shape

Conceptual success response:

```json
{
  "ok": true,
  "studentId": "...",
  "previous": {
    "accessStatus": "...",
    "trialStatus": "...",
    "subscriptionStatus": "..."
  },
  "next": {
    "accessStatus": "...",
    "trialStatus": "...",
    "subscriptionStatus": "..."
  },
  "decision": {
    "by": "...",
    "reason": "...",
    "at": "..."
  },
  "correlationId": "..."
}
```

Conceptual failure response:

```json
{
  "ok": false,
  "error": "student_access_missing",
  "message": "Internal/admin-only safe message",
  "correlationId": "..."
}
```

Responses must not include secrets, cookies, tokens, session payloads, raw sensitive evidence, or student-facing copy unless a future phase explicitly authorizes it.

## 7. Command allowlist

Future conceptual commands from 3J:

| Command | Allowed now? | Endpoint implementation phase required? | Additional readiness required |
| --- | --- | --- | --- |
| `keep_no_access` | no | yes | Endpoint validation/idempotency readiness |
| `invite_closed_lab_trial` | no | yes | Trial activation readiness |
| `activate_closed_lab_trial` | no | yes | Trial activation readiness |
| `expire_trial` | no | yes | Trial activation/expiry readiness |
| `revoke_access` | no | yes | Revocation/support policy readiness |
| `mark_subscription_backed_access` | no | yes | Billing/subscription/payment readiness |
| `suspend_access` | no | yes | Suspension policy readiness |
| `repair_missing_student_access_row` | no | yes | Missing-row repair readiness |

Read-only observation already exists outside this endpoint. It is not a mutation command.

## 8. Authorization contract

Future endpoint authorization must:

* Use `requireAdminApi` or equivalent server-side admin authorization.
* Run server-side.
* Avoid client-only authorization.
* Reject public signup/user role access.
* Prevent students from mutating their own access.
* Prevent tutor/coach mutation unless a future phase explicitly grants that role.
* Derive actor identity from trusted auth context, not request body.
* Ensure reports and smokes do not print cookies, tokens, headers, or session payloads.

No auth changes are implemented in 3K.

## 9. Validation contract

Future endpoint validation must:

* Require an existing student.
* Require an existing `StudentAccess` row except for an explicit repair command.
* Reject missing row for normal transitions.
* Reject unknown command.
* Reject unsupported target state.
* Reject invalid transition from current state.
* Require `expectedPreviousState` to prevent stale mutation.
* Reject stale state conflicts.
* Require `decisionReason`.
* Require trusted actor identity.
* Require product/commercial gate for trial or billing-related commands.
* Require trial dates for trial activation.
* Reject billing-backed commands without billing source readiness.
* Reject runtime-dependent commands before runtime readiness.
* Reject student-facing-impact commands before product/UI/brand review.

No validation is implemented in 3K.

## 10. Idempotency and stale-state policy

Future endpoint readiness must decide:

* Previous-state check is required.
* Stale state returns controlled failure with no mutation.
* Repeated identical request should either be safely idempotent with a correlation key or fail as a no-op/duplicate with a controlled internal message.
* No silent double activation.
* No silent repair.
* No mutation if `expectedPreviousState` does not match the database state.
* Future implementation must decide whether to use `requestId`, `correlationId`, or an idempotency key.

## 11. Audit contract

Future audit payload should include:

* `studentId`
* `command`
* previous `accessStatus`
* previous `trialStatus`
* previous `subscriptionStatus`
* next `accessStatus`
* next `trialStatus`
* next `subscriptionStatus`
* `decisionBy` from auth
* `decisionReason`
* `decisionAt`
* `evidenceType`
* `evidenceRef`, non-sensitive
* `commercialGate`
* `runtimeImpact`
* `studentFacingImpact`
* `operatorNotes`, optional/internal
* `correlationId` or `requestId`
* source route/action

Existing fields include `lastDecisionBy`, `lastDecisionReason`, and `lastDecisionAt`. If full audit history is required, future schema/storage readiness is needed. 3K does not change schema.

## 12. Safe failure model

Safe failure means no database mutation and no access activation.

| Error | Trigger | HTTP status concept | Safe behavior | DB mutation? | Access activation? | Message scope | Future phase needed? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `unauthorized` | No trusted auth | 401 | Reject request | no | no | internal/admin-only | yes |
| `forbidden` | Authenticated but not allowed | 403 | Reject request | no | no | internal/admin-only | yes |
| `student_not_found` | Student ID has no match | 404 | Stop command | no | no | internal/admin-only | yes |
| `student_access_missing` | Normal command finds no row | 409 | Stop command | no | no | internal/admin-only | yes |
| `unknown_command` | Command not in allowlist | 400 | Reject request | no | no | internal/admin-only | yes |
| `invalid_transition` | Current-to-next is not allowed | 409 | Reject request | no | no | internal/admin-only | yes |
| `unsupported_target_state` | Target is not supported | 400 | Reject request | no | no | internal/admin-only | yes |
| `missing_decision_reason` | Reason absent/blank | 400 | Reject request | no | no | internal/admin-only | yes |
| `missing_actor` | Trusted actor unavailable | 401/500 | Reject request | no | no | internal/admin-only | yes |
| `stale_state_conflict` | Expected previous state mismatch | 409 | Require refresh | no | no | internal/admin-only | yes |
| `trial_policy_missing` | Trial command before policy | 409 | Reject request | no | no | internal/admin-only | yes |
| `trial_dates_missing` | Trial command lacks dates | 400 | Reject request | no | no | internal/admin-only | yes |
| `billing_source_missing` | Billing command lacks source | 409 | Reject request | no | no | internal/admin-only | yes |
| `runtime_gate_not_ready` | Runtime-dependent command attempted | 409 | Reject request | no | no | internal/admin-only | yes |
| `student_facing_copy_not_ready` | Student-visible command lacks copy gate | 409 | Reject request | no | no | internal/admin-only | yes |
| `repair_not_authorized` | Repair attempted without repair phase | 409 | Reject request | no | no | internal/admin-only | yes |
| `internal_error` | Unexpected failure | 500 | Roll back/return safe failure | no | no | internal/admin-only | yes |

## 13. Missing-row endpoint policy

* Missing `StudentAccess` row is an integrity issue, not `no_access`.
* Normal mutation endpoint must not autocreate.
* Repair endpoint or command must be separate or explicitly scoped.
* Repair defaults to non-permission state.
* Repair must be audited.
* Repair must not activate trial or access.
* Repair requires future readiness and implementation phases.

## 14. Trial command dependencies

Trial commands require future readiness for:

* Participant criteria.
* Trial duration.
* Activation and expiry timestamps.
* Copy and support path.
* Whether trial implies runtime access.
* Expiry behavior.
* Operator workflow.
* Student-facing implications.
* Closed-lab gate.

3K does not resolve or implement trial activation.

## 15. Runtime dependency

Endpoint mutation does not by itself imply runtime enforcement. Runtime enforcement requires separate readiness and implementation. `/now` must remain unchanged unless a future phase explicitly changes it.

Student-facing continuity is high-risk. Missing-row handling must be safe before runtime enforcement.

## 16. Student-facing dependency

Endpoint readiness does not create student-facing copy. Future student-facing display requires Product/UI/Brand review.

Future phases must avoid exposing internal admin state directly, avoid public Sales-Ready signals, and avoid confusing trial/payment wording.

## 17. Security and privacy

Future implementation must ensure:

* No secrets in request/response logs.
* No cookies, tokens, or session payloads in smoke reports.
* No raw evidence documents in payload.
* No personal data beyond necessary internal identifiers.
* Least privilege.
* Server-side authorization.
* Controlled error messages.
* No broad public endpoint.
* No CSRF/security assumptions without future implementation review.

No security changes are implemented in 3K.

## 18. Future smoke plan for endpoint implementation

Conceptual future smoke plan:

* Preflight clean.
* Admin authenticated path without exposing secrets.
* Known existing student with `StudentAccess` row.
* Safe command only, likely `keep_no_access` or no-op if explicitly authorized.
* Confirm response shape.
* Confirm database state transition only if implementation phase authorizes mutation.
* Confirm audit fields.
* Confirm stale-state failure.
* Confirm missing-row failure only if a safe natural case exists.
* No cookies, tokens, or headers printed.
* Final git status clean.

3K does not run smoke and does not mutate the database.

## 19. Future implementation phases required

Each possible future phase requires explicit opening:

* A. Admin mutation endpoint implementation readiness close review.
* B. Admin mutation endpoint implementation.
* C. Admin mutation endpoint unit/contract tests.
* D. Admin mutation endpoint smoke.
* E. Admin mutation UI readiness.
* F. Admin mutation UI implementation.
* G. Trial activation readiness.
* H. Runtime enforcement readiness.
* I. Student-facing access display readiness.
* J. Missing-row repair readiness.
* K. Billing/subscription/payment readiness.

## 20. Recommended next phase options

Option A:

`MVP-SALES-TRIAL-3L - Admin StudentAccess mutation endpoint implementation readiness final review`

Option B:

`MVP-SALES-TRIAL-3L - Admin StudentAccess mutation endpoint implementation`

Option C:

`MVP-SALES-TRIAL-3L - Trial activation readiness`

Option D:

Pause on clean baseline.

Recommendation: prefer a short final implementation-readiness review before writing endpoint code.

## 21. Conclusion

3K defines endpoint readiness only. No endpoint is implemented. No mutation is enabled. `StudentAccess` remains read-only in admin. Future implementation requires explicit new phase.
