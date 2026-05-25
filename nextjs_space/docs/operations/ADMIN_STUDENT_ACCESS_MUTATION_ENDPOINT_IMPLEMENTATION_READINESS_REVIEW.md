# Admin StudentAccess Mutation Endpoint Implementation Readiness Review

## 1. Phase

* Phase: `MVP-SALES-TRIAL-3L`.
* Type: documentation-only final readiness review.
* Baseline: `dcf6e56`.
* No implementation authorized.
* No endpoint enabled.
* No admin mutation enabled.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`, closed laboratory only.

## 2. Relationship to 3I, 3J and 3K

`MVP-SALES-TRIAL-3I` defined the `StudentAccess` transition model readiness. `MVP-SALES-TRIAL-3J` defined the future admin transition contract readiness. `MVP-SALES-TRIAL-3K` defined readiness for a future mutation endpoint surface.

`MVP-SALES-TRIAL-3L` reviews whether the prior readiness work is sufficient to allow a future endpoint implementation phase. 3L does not implement an endpoint, route handler, UI, buttons, forms, schema changes, database writes, migrations, runtime enforcement, or trial activation.

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
* No `StudentAccess` admin mutation endpoint exists.
* No `StudentAccess` admin UI mutation exists.
* No repair/autocreate behavior exists.
* No runtime enforcement exists.
* No student-facing access display exists.
* No billing, subscription, or payment behavior exists.

## 4. Final readiness question

Question: can a future phase safely implement a minimal admin `StudentAccess` mutation endpoint?

Possible outcomes:

* `GO`
* `GO with restrictions`
* `NO-GO`

3L decision: `GO with restrictions` for a future implementation phase only if the implementation is scoped to a minimal internal admin endpoint and preserves every explicit non-goal in this review.

## 5. Proposed future route surface

Conceptual future route from 3K:

```text
POST /api/admin/students/[id]/access-transitions
```

This is a conceptual future route only. It is not implemented in 3L. If a future implementation chooses a different route, that phase must document why before writing code.

Future route requirements:

* Server-side and admin-only.
* Not public.
* Not student-facing.
* Must not alter existing `GET /api/students/[id]` read-only behavior.
* Must not alter existing student `PUT` or `DELETE` behavior unless explicitly scoped in a future phase.

## 6. Future implementation scope recommendation

Recommended strict scope for a future 3M implementation:

* Endpoint route only.
* Server-side admin authorization.
* Request parsing and validation.
* Use existing `StudentAccess` helper/validation where applicable.
* Update an existing `StudentAccess` row only for explicitly allowed commands.
* No admin UI buttons or forms.
* No student UI.
* No runtime enforcement.
* No trial activation unless explicitly scoped, which is not recommended yet.
* No billing, subscription, or payment.
* No repair/autocreate.
* No `/now` changes.

Recommended first command:

* Prefer a non-permission command such as `keep_no_access` / `reaffirm_no_access`, if the helper and schema support it safely.
* If no safe no-op or reaffirm command is useful, 3M should remain `NO-GO` until a safe minimal transition is defined.
* Do not implement `activate_closed_lab_trial` as the first endpoint command unless a separate trial activation readiness phase is completed.

## 7. Future command allowlist decision

| Command | 3L decision | Reason | Can be in first implementation? | Required future gate |
| --- | --- | --- | --- | --- |
| `keep_no_access` / `reaffirm_no_access` | Candidate with restrictions | Non-permission reaffirmation can exercise auth, validation, stale-state, response, and audit paths without access activation if it is useful and explicitly defined. | maybe | Endpoint implementation phase with tests and smoke. |
| `invite_closed_lab_trial` | Not first implementation | Trial invitation policy and copy/support path are not defined. | no | Trial invitation/activation readiness. |
| `activate_closed_lab_trial` | No | Trial activation would create product, support, timestamp, and possible runtime expectations. | no | Trial activation readiness. |
| `expire_trial` | No | Trial lifecycle and expiry policy are not defined. | no | Trial lifecycle readiness. |
| `revoke_access` | No | Revocation needs support policy and student-facing/runtime consequences review. | no | Revocation/support readiness. |
| `mark_subscription_backed_access` | No | Billing/subscription/payment source-of-truth does not exist. | no | Billing/subscription/payment readiness. |
| `suspend_access` | No | Suspension target and policy are not defined. | no | Suspension policy readiness. |
| `repair_missing_student_access_row` | No | Missing-row repair is a separate integrity operation and must not be implicit. | no | Missing-row repair readiness. |

## 8. Auth readiness checklist

A future 3M implementation must satisfy:

* Use `requireAdminApi` or an equivalent server-side admin authorization guard.
* Derive actor identity from trusted auth context.
* Do not accept actor identity from the request body.
* Students cannot call the endpoint.
* Public signup/user roles cannot call the endpoint.
* Tutor/coach roles cannot call the endpoint unless a future phase explicitly grants that role.
* No client-only authorization.
* No cookies, tokens, headers, or session payloads printed in logs or smoke reports.
* No broad public API.

3L does not implement auth changes.

## 9. Payload readiness checklist

Future request payload should include:

* `command`
* `expectedPreviousState`
* `decisionReason`
* `evidenceType` or explicit reason category if needed
* `evidenceRef` only if non-sensitive/internal-safe
* `operatorNotes`, optional/internal
* `trial` object only for trial-related commands, not for the first recommended implementation

Rules:

* `decisionReason` is required and non-empty.
* `expectedPreviousState` is required to prevent stale mutation.
* Evidence must not include raw secrets or sensitive documents.
* Actor must not be supplied by the request body.

## 10. Validation readiness checklist

Future implementation must validate:

* Existing student.
* Existing `StudentAccess` row for normal commands.
* Unknown command rejected.
* Unsupported target state rejected.
* Invalid transition rejected.
* Stale state rejected if `expectedPreviousState` mismatches DB.
* Missing `decisionReason` rejected.
* Missing trusted actor rejected.
* Trial commands rejected without trial readiness.
* Billing-backed commands rejected without billing readiness.
* Runtime-dependent commands rejected without runtime readiness.
* Student-facing-impact commands rejected without product/UI/brand review.
* Missing row must not be treated as `no_access`.

## 11. Response model readiness checklist

Future response should:

* Return a safe success shape with previous/next state and decision metadata.
* Return a safe failure shape with stable error code and internal/admin-only message.
* Include `correlationId` or `requestId` if available.
* Not return secrets, cookies, tokens, session payloads, raw evidence, or student-facing copy.
* Not leak unnecessary personal data.

## 12. Audit readiness checklist

Existing `StudentAccess` decision fields:

* `lastDecisionBy`
* `lastDecisionReason`
* `lastDecisionAt`

Potentially needed but not implemented for richer audit history:

* Full audit history.
* `evidenceRef` storage.
* Command name.
* Previous/next state history.
* `correlationId`.

3L decision:

* If first 3M command is only `keep_no_access` / `reaffirm_no_access`, existing `StudentAccess` fields plus the existing project `AuditEvent` pattern may be sufficient, provided 3M documents the exact audit payload.
* If 3M would implement real activation, revocation, billing-backed access, or repair, full audit storage readiness may be required first.
* No schema change is authorized in 3L.

## 13. Idempotency/stale-state readiness checklist

Future implementation must define:

* `expectedPreviousState` check required.
* Stale mismatch returns a safe 409-style failure.
* No DB mutation on stale mismatch.
* No silent double activation.
* No silent repair.
* Repeated same command either returns a controlled no-op with clear response or fails as duplicate/no-op with an internal-safe message.
* Whether `requestId`, `correlationId`, or an idempotency key is required.

## 14. Safe failure checklist

All safe failures mean no DB mutation, no access activation, and an internal/admin-only message.

| Failure | Future status concept | Safe behavior | DB mutation? | Access activation? | 3M readiness? |
| --- | --- | --- | --- | --- | --- |
| `unauthorized` | 401 | Reject request. | no | no | Required. |
| `forbidden` | 403 | Reject request. | no | no | Required. |
| `student_not_found` | 404 | Stop command. | no | no | Required. |
| `student_access_missing` | 409 | Stop normal command and flag integrity issue. | no | no | Required. |
| `unknown_command` | 400 | Reject request. | no | no | Required. |
| `invalid_transition` | 409 | Reject command. | no | no | Required. |
| `unsupported_target_state` | 400 | Reject target. | no | no | Required. |
| `missing_decision_reason` | 400 | Reject request. | no | no | Required. |
| `missing_actor` | 401/500 | Reject request. | no | no | Required. |
| `stale_state_conflict` | 409 | Require refresh/retry with current state. | no | no | Required. |
| `trial_policy_missing` | 409 | Reject trial command. | no | no | Required if trial commands are present. |
| `billing_source_missing` | 409 | Reject billing-backed command. | no | no | Required if billing commands are present. |
| `runtime_gate_not_ready` | 409 | Reject runtime-dependent command. | no | no | Required. |
| `student_facing_copy_not_ready` | 409 | Reject student-visible transition. | no | no | Required. |
| `internal_error` | 500 | Roll back or fail before commit where possible. | no | no | Required. |

## 15. Test readiness

Future 3M tests should cover:

* Unit tests for the validation helper/transition contract.
* Route handler tests if the project test setup supports them.
* Unauthorized and forbidden cases.
* Student not found.
* Missing `StudentAccess` row.
* `expectedPreviousState` mismatch.
* Valid `keep_no_access` / `reaffirm_no_access` command if implemented.
* Rejected trial, billing, and runtime commands.
* No mutation on failure.

3L does not add tests.

## 16. Future smoke readiness

Future 3M smoke should include:

* Preflight clean.
* Admin authenticated path without exposing secrets.
* Existing student with `StudentAccess` row.
* Command selected must be explicitly authorized by 3M.
* For first mutation smoke, prefer a safe non-permission/no-op command if implemented.
* Verify response shape.
* Verify DB state only if 3M explicitly authorizes mutation and safe observation.
* Verify failure on stale expected state.
* Verify missing-row only if a natural safe case exists.
* No cookies, tokens, or headers printed.
* Final git status clean.

3L does not run smoke.

## 17. Implementation GO/NO-GO matrix

| Area | Readiness status | Evidence | Residual risk | Decision |
| --- | --- | --- | --- | --- |
| Scope | Ready with restrictions | 3I/3J/3K define non-goals and endpoint boundary. | Scope creep into trial/runtime/UI. | GO with restrictions. |
| Route | Ready conceptually | 3K proposed `POST /api/admin/students/[id]/access-transitions`. | Route convention could differ. | GO with documented route choice. |
| Auth | Ready pattern exists | `requireAdminApi` is used broadly in admin APIs. | Actor identity shape must be pinned. | GO with restrictions. |
| Payload | Ready conceptually | 3K request shape and 3L checklist. | Over-embedding sensitive evidence. | GO with restrictions. |
| Validation | Partially ready | `validateStudentAccessTransition` exists with useful status and transition checks. | Command-level validation still required. | GO with restrictions. |
| Response | Ready conceptually | Existing APIs use `NextResponse.json`; 3K defined success/failure shapes. | Error codes must stay stable. | GO with restrictions. |
| Audit | Partially ready | `StudentAccess` has last-decision fields; `AuditEvent` pattern exists in student auth endpoints. | Full history may need schema/storage before real activation/revocation. | GO only for non-permission first command. |
| Idempotency | Needs implementation decision | 3K and 3L require previous-state check. | Duplicate/no-op policy not yet coded. | GO with restrictions. |
| Safe failures | Ready conceptually | 3K and 3L tables. | Must be enforced in code/tests. | GO with restrictions. |
| Tests | Ready conceptually | Existing helper test can be extended. | Route test harness may need local decisions. | GO with tests required. |
| Smoke | Ready conceptually | 3K and 3L smoke plan. | Requires admin auth without secret exposure. | GO with restricted smoke. |
| Commercial/product gates | Ready for non-permission command only | Governance docs keep M1-only Pre-Sales-Ready. | Trial/billing commands would overreach. | GO only for non-permission first command. |
| Student-facing impact | Ready because none is allowed | 3L forbids student UI and copy. | Internal state could leak if response is reused. | GO with restrictions. |
| Runtime impact | Ready because none is allowed | Runtime enforcement remains explicitly deferred. | Future code could accidentally gate behavior. | GO with restrictions. |
| DB/schema impact | Ready if no schema change | Existing row and fields support a narrow reaffirmation. | Rich audit may require schema later. | GO only without schema change. |

Final decision: `GO with restrictions` only for a minimal future endpoint implementation phase that does not activate trial, runtime, billing, `/now`, student UI, admin UI buttons/forms, or repair/autocreate.

## 18. Explicit restrictions for future 3M if GO

If 3M opens as endpoint implementation:

* 3M must start with Git preflight.
* 3M must read Context Gate.
* 3M may implement endpoint only, not UI.
* 3M may not implement trial activation.
* 3M may not implement runtime enforcement.
* 3M may not implement billing, subscription, or payment.
* 3M may not touch `/now`.
* 3M may not touch student UI.
* 3M may not implement repair/autocreate.
* 3M may not change schema unless separately authorized, and the preferred first implementation should avoid schema changes.
* 3M must include tests appropriate to route/helper.
* 3M must include smoke or an explicit reason if smoke is blocked.
* 3M must not expose cookies, tokens, or headers.

## 19. Explicit no-go decisions from 3L

* No code.
* No endpoint implemented.
* No admin UI mutation.
* No DB mutation.
* No schema change.
* No migration.
* No deploy.
* No runtime enforcement.
* No trial activation.
* No billing, subscription, or payment.
* No `/now`.
* No student UI.
* No repair/autocreate.
* No public offer or Sales-Ready claim.

## 20. Recommended next phase options

Option A:

`MVP-SALES-TRIAL-3M - Admin StudentAccess mutation endpoint implementation`

Only if 3L decision is accepted as `GO with restrictions`.

Option B:

`MVP-SALES-TRIAL-3M - Trial activation readiness`

Use if endpoint implementation should wait until trial policy is clearer.

Option C:

`MVP-SALES-TRIAL-3M - Admin mutation test harness readiness`

Use if route tests are unclear enough to block implementation.

Option D:

Pause on clean baseline.

Recommendation: prefer Option A only if 3M can keep the first command sufficiently safe and non-permission, with a concrete test/smoke plan. Otherwise choose Option C or pause.

## 21. Conclusion

3L is a readiness final review only. No endpoint is implemented. No mutation is enabled. `StudentAccess` remains read-only in admin. Future implementation requires an explicit new phase.

Final decision: `GO with restrictions`.
