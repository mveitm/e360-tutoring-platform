# StudentAccess Transition Model Readiness

## 1. Phase

* Phase: `MVP-SALES-TRIAL-3I`.
* Type: documentation-only readiness.
* Baseline: `f029bcb`.
* No implementation authorized.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`, closed laboratory only.

## 2. Current closed chain

* `MVP-SALES-TRIAL-3D`: signup creates the default `StudentAccess` row for new signup students.
* `MVP-SALES-TRIAL-3E`: controlled local/dev signup smoke passed.
* `MVP-SALES-TRIAL-3F`: admin read-only `StudentAccess` visibility readiness was defined.
* `MVP-SALES-TRIAL-3G`: admin read-only visibility was implemented on admin student detail.
* `MVP-SALES-TRIAL-3H`: admin read-only smoke passed.

This chain does not make the product Sales-Ready and does not authorize access transitions.

## 3. Current StudentAccess defaults

The confirmed signup default row is:

* `accessStatus = no_access`
* `trialStatus = none`
* `subscriptionStatus = none`
* `lastDecisionBy = system`
* `lastDecisionReason = public_signup_default_no_access`
* `lastDecisionAt` is set to the signup decision instant.
* No trial timestamps are set by default: `trialInvitedAt`, `trialActivatedAt`, `trialExpiresAt`, and `trialExperienceUsedAt` are `null`.
* No `tutoringDirection` or `continuityTarget` is set by default.
* No enrollment, program instance, learning cycle, or study load is created by signup.

## 4. Current invariants

* Signup creates a `StudentAccess` row but does not activate access.
* `StudentAccess` row presence is lifecycle state, not commercial permission.
* A missing `StudentAccess` row must not be silently treated as `no_access`.
* Admin detail visibility is read-only.
* No `StudentAccess` admin mutation exists.
* No repair/autocreate behavior exists.
* No runtime access enforcement exists.
* No student-facing access display exists.
* No trial activation exists.
* No billing, subscription, or payment behavior exists.
* No `/now` behavior is changed.

## 5. Candidate future transition categories

These categories are readiness concepts. Some names map to current helper string statuses, but this document does not authorize using them in runtime behavior or admin mutation.

* `no_access` remains `no_access`: current implemented/default state, no new permission.
* Grant closed-lab trial access: candidate/future conceptual transition toward `trial_invited` or `trial_active`, subject to explicit trial policy.
* Expire trial access: candidate/future conceptual transition toward `trial_expired_blocked` with `trialStatus = expired`.
* Revoke access: candidate/future conceptual transition to a safe non-active state; exact target policy is not implemented.
* Grant paid/subscription-backed access: candidate/future conceptual transition toward subscription-backed access; payment/subscription policy is not implemented.
* Suspend access: candidate/future conceptual state; no current schema enum or policy guarantees a suspend target.
* Repair missing `StudentAccess` row: candidate/future integrity operation; no repair/autocreate behavior exists today.

## 6. Transition table

| Transition | Current condition | Target condition | Actor | Required evidence | Required product/commercial gate | Runtime impact | Student-facing impact | Authorized now? | Future phase required |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Read-only admin visibility | Admin student detail reads optional `StudentAccess` | Same state, displayed internally | admin/operator reads only | 3G implementation and 3H smoke | Pre-Sales-Ready internal admin visibility | None | None | yes, already implemented and smoked | no |
| Keep no access | Row exists with `no_access` / `none` | Row remains `no_access` / `none` | system or admin/operator in future | Decision reason and no activation evidence | Closed-lab policy confirmation | None unless runtime later exists | None unless display later exists | no | yes |
| Grant closed-lab trial access | Row exists, no active access | Candidate trial invited/active condition | admin/operator or system in future | Trial approval, dates, decision reason, participant scope | Trial activation readiness and closed-lab gate | Future enforcement decision required | Future copy/display decision required | no | yes |
| Expire trial access | Candidate active trial exists | Candidate expired/blocked condition | system or admin/operator in future | Expiry timestamp, prior state, decision source | Trial expiration policy | Future enforcement decision required | Future copy/display decision required | no | yes |
| Revoke access | Candidate active access exists | Candidate non-active target | admin/operator in future | Reason, prior state, support/commercial evidence | Revocation policy and support policy | Future enforcement decision required | Future copy/display decision required | no | yes |
| Grant paid/subscription-backed access | Payment/subscription evidence exists | Candidate subscription-backed active access | billing/payment system or admin/operator in future | Payment/subscription source, plan, dates | Billing/subscription/payment readiness | Future enforcement decision required | Future copy/display decision required | no | yes |
| Suspend access | Candidate active access exists | Candidate suspended/non-active condition | admin/operator or billing/payment system in future | Reason, source, duration/conditions | Suspension policy | Future enforcement decision required | Future copy/display decision required | no | yes |
| Repair missing row | Student has no `StudentAccess` row | Safe lifecycle row created | system or admin/operator in future | Integrity diagnosis, source state, non-permission default | Missing-row repair readiness | None by default; must not imply access | None unless display later exists | no | yes |
| Change `/now` access behavior | `/now` ignores `StudentAccess` | Candidate access-aware behavior | system in future | Runtime policy, failure modes, student copy | `/now` access behavior readiness | Direct runtime impact | Direct student impact | no | yes |

## 7. Actor model

Future actor categories:

* `system`: allowed today only for signup default-row decision context.
* `admin/operator`: currently allowed to view read-only admin detail state; no new mutation capability in 3I.
* `tutor/coach`: future only, if a later phase assigns a controlled advisory or decision role.
* `billing/payment system`: future only, after billing/subscription/payment readiness.
* `student`: generally not authorized to change access state.

No actor receives new capabilities in `MVP-SALES-TRIAL-3I`.

## 8. Audit requirements

Any future transition must consider:

* Who decided.
* Why the decision was made.
* When it was decided.
* Source or evidence.
* Previous state.
* Next state.
* Whether student-facing copy changed.
* Whether runtime access changed.
* Whether the commercial gate was met.

Existing fields related to this audit direction include:

* `lastDecisionBy`
* `lastDecisionReason`
* `lastDecisionAt`

This phase does not require schema changes. These are readiness requirements for future phases.

## 9. Gates before future implementation

### A. Admin mutation readiness

* Why needed: define who can change `StudentAccess`, from where, with which allowed targets.
* Minimum required decision: permitted transitions, audit payload, validation contract, failure states, and rollback/support handling.
* Non-goals: no trial activation, billing, runtime enforcement, student UI, repair, or `/now` change unless separately scoped.
* Blockers/risks: mutation without audit trail, accidental permission grant, unclear support consequences.

### B. Trial activation readiness

* Why needed: trial access changes commercial and student expectations even in a closed lab.
* Minimum required decision: participant criteria, activation actor, duration, timestamps, expiry behavior, copy, and support path.
* Non-goals: no public offer, no payment, no Sales-Ready claim.
* Blockers/risks: activating trial without copy/readiness, M1-only perceived as public offer, unclear expiry.

### C. Runtime enforcement readiness

* Why needed: access state has no operational meaning until enforcement points are defined.
* Minimum required decision: exact routes/actions gated, safe failures, missing-row behavior, observability, and recovery.
* Non-goals: no broad lockout, no unreviewed `/now` changes, no student-facing confusion.
* Blockers/risks: runtime lockout due to bad state, missing-row misinterpretation, support burden.

### D. Student-facing access display readiness

* Why needed: students need clear, calm state only when behavior and support policy are coherent.
* Minimum required decision: copy, states shown, hidden internal states, actions available, and support path.
* Non-goals: no administrative state dump, no overpromise, no full Sales-Ready framing.
* Blockers/risks: public Sales-Ready signal, unclear access status, anxiety or abandonment.

### E. Billing/subscription/payment readiness

* Why needed: paid access requires source-of-truth and reconciliation.
* Minimum required decision: payment provider/source, subscription states, drift handling, refunds/cancellations, and audit source.
* Non-goals: no payment activation in 3I, no public sale.
* Blockers/risks: state drift, unsupported commercial promise, support burden.

### F. Missing-row repair readiness

* Why needed: missing row is an integrity condition and must not be inferred as `no_access`.
* Minimum required decision: detection, repair actor, default target, audit reason, idempotency, and review policy.
* Non-goals: no silent autocreate, no permission grant from repair.
* Blockers/risks: accidental access grant, masking data integrity defects.

### G. `/now` access behavior readiness

* Why needed: `/now` is student-facing and continuity-sensitive.
* Minimum required decision: whether and how `StudentAccess` affects `/now`, safe copy, fallback behavior, and continuity guarantees.
* Non-goals: no hidden breaking change, no lockout without support path.
* Blockers/risks: breaking `/now` continuity, confusing closed-lab participants, support escalation.

## 10. Risk register

* Accidental public Sales-Ready signal.
* M1-only being perceived as a commercial offer.
* Activating trial without student-facing copy readiness.
* Runtime lockout due to bad `StudentAccess` state.
* Missing row interpreted incorrectly.
* Admin mutation without audit trail.
* Payment/subscription state drift.
* Support burden from unclear access status.
* Breaking `/now` continuity.

## 11. Explicit no-go decisions from 3I

* No runtime enforcement.
* No trial activation.
* No billing, subscription, or payment.
* No public offer.
* No student-facing display.
* No admin mutation.
* No repair/autocreate.
* No schema changes.
* No DB changes.
* No deploy.

## 12. Recommended next phase options

Option A:

`MVP-SALES-TRIAL-3J - Admin StudentAccess transition readiness`

Design the admin-side controlled mutation contract, still with no implementation.

Option B:

`MVP-SALES-TRIAL-3J - Trial activation readiness`

Define closed-lab trial activation conditions, still with no implementation.

Option C:

`MVP-SALES-TRIAL-3J - Runtime enforcement readiness`

Define where access is enforced and what safe failure modes are required, still with no implementation.

Option D:

Pause on clean baseline.

Recommendation: prefer Admin StudentAccess transition readiness before runtime enforcement or trial activation.

## 13. Conclusion

`MVP-SALES-TRIAL-3I` defines transition readiness only. `StudentAccess` remains read-only in admin. No new behavior was enabled. Future transitions require explicit new phases.
