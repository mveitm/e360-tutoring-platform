# MVP-COMMERCIAL-TRIAL-1C - Invitation and Activation Criteria

## 1. Phase

* Phase: `MVP-COMMERCIAL-TRIAL-1C`.
* Type: commercial / operations / documentation-only.
* Baseline: `b3fff71`.
* No implementation authorized.
* No payment authorized.
* No trial activation authorized.
* No runtime access authorized.
* No Sales-Ready claim.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`, closed laboratory only.

## 2. Relationship to 1A and 1B

* `MVP-COMMERCIAL-TRIAL-1A` separated closed commercial sandbox from public Sales-Ready.
* `MVP-COMMERCIAL-TRIAL-1B` defined the closed payment risk matrix and kept closed payment at NO-GO.
* 1C defines invitation and conceptual/operational activation criteria.
* Invitation does not mean payment, active access, active trial, or Sales-Ready.
* Activation described here does not authorize technical activation or payment. It only defines criteria a future phase must satisfy.

## 3. Definitions

### Candidate

A person identified as a possible participant in the closed sandbox.

This does not imply:

* Invitation sent.
* Payment.
* Access.
* Trial.
* `StudentAccess` mutation.
* Runtime access.
* Public sale.

### Invited participant

A person explicitly invited to the closed sandbox.

This does not imply:

* Payment authorized.
* Active access.
* Active trial.
* Subscription.
* Runtime access.
* Sales-Ready.

### Activation-ready participant

A person who satisfies minimum operational criteria so a future phase may consider activation.

This does not imply:

* Technical activation already performed.
* Payment authorization.
* Trial activation.
* Billing.
* Runtime access.

### Activated sandbox participant

A future state, not authorized in 1C.

This requires:

* A later explicit phase.
* Pro/high-level review if payment, minors, trial activation, runtime, billing, or student-facing implications are involved.

## 4. Invitation criteria

A participant may be invited only if:

* The participant is part of the known closed group.
* The participant understands Bexauri is in a closed laboratory.
* The participant understands this is not a public sale.
* The participant understands this is not complete PAES preparation.
* The participant can use the app with basic autonomy.
* The participant has an objective compatible with what is available.
* The participant can provide useful signals about clarity, continuity, and friction.
* The participant does not require a complete M1/M2/L1 promise.
* The participant does not require unlimited human support.
* The participant accepts experiment limits.
* An internal supervision owner exists.

For minors:

* Invitation may be designed conceptually.
* Participation with payment requires Pro/high-level review.
* Consent, payment owner, and guardian communication remain unresolved in 1C.

## 5. Invitation blockers

Block invitation if:

* It would be communicated as public launch.
* It promises complete PAES preparation.
* It promises score improvement.
* The student requires permanent intensive support.
* No compatible route is available.
* No human supervision owner exists.
* It is unclear that the experience is closed laboratory.
* Commercial pressure would treat it as public sale.
* There is material risk of confusion with a mature subscription.

## 6. Activation criteria

A future activation could be considered only if:

* Participant was invited correctly.
* Experience scope is defined.
* Initial route is available.
* `StudentAccess` state is understood and governed.
* Basic technical access is ready.
* Minimum human support/fallback is defined.
* Duration is defined.
* Expiry or closure is defined.
* Sober communication is prepared.
* Success/failure criteria are defined.
* Supervision owner is assigned.
* No public promise exists.
* Payment/minor questions are resolved if applicable.
* Constant manual intervention is not required for the app to work.

These are readiness criteria only. They do not authorize activation.

## 7. Activation blockers

Block activation if:

* Closed payment remains unresolved but payment is required.
* Participant is a minor and payment/consent is not resolved.
* No learning route exists.
* The app cannot guide the first step.
* Access state and runtime behavior are inconsistent.
* No support path exists.
* No pause/refund/failure policy exists if money is involved.
* Copy would overpromise.
* A human would need to manually create the experience outside the app.
* Activation would imply public Sales-Ready.
* Activation requires trial, runtime, billing, or student UI not yet authorized.

## 8. Evidence required before activation consideration

Before a future activation can be considered, evidence should exist for:

* Participant identified.
* Participant category documented.
* Age/minor status considered without storing unnecessary sensitive data.
* Payer/consent question resolved if payment is involved.
* Scope explained.
* Route/content available.
* Expected first activity available.
* Supervision owner assigned.
* Start date candidate.
* End/expiry candidate.
* Support/failure path.
* No-overpromise copy draft.
* `StudentAccess` state reviewed.
* Non-public framing confirmed.
* Risk review from 1B checked.

## 9. StudentAccess relationship

* Current `StudentAccess` supports `no_access` default and `reaffirm_no_access`.
* Invitation does not require `StudentAccess` mutation in 1C.
* Activation may require future `StudentAccess` transition readiness.
* `StudentAccess` must not be used as a commercial promise.
* Payment state, invitation state, runtime access, and `StudentAccess` must remain distinct until future phases align them.

## 10. Human supervision criteria

The human role is:

* Supervisor.
* Observer.
* Exception handler.
* Quality auditor.

The human role is not:

* Manual tutor replacing the app.
* Unlimited support.
* The person who makes an incomplete product appear complete.
* Source of promises outside the app.

## 11. Communication criteria

Allowed messages:

* Closed laboratory.
* Controlled test.
* Limited scope.
* Pedagogical support in development.
* Supervised experience.
* The purpose is to observe clarity, continuity, and value.

Disallowed messages:

* Launch.
* Public sale.
* Complete PAES preparation.
* Guaranteed score.
* Complete AI tutor.
* Complete subscription.
* Total access.
* Definitive platform.

## 12. Invitation / activation decision table

| Decision point | Minimum criteria | Required evidence | Can decide with Thinking/Codex? | Requires Pro/high-level review? | Current status | Future phase |
| --- | --- | --- | --- | --- | --- | --- |
| Identify candidate | Known closed-group person and compatible learning objective. | Candidate name/category recorded in non-sensitive internal planning. | yes, documentation only | no, unless minor/payment details become active | Can document only | `MVP-COMMERCIAL-TRIAL-1C` |
| Send invitation | Closed-lab framing, no-overpromise copy, supervision owner. | Approved invitation copy and no-public-sale framing. | yes, as readiness/copy only | yes if commercial promise, payment, or minor handling is involved | Not authorized in 1C | `MVP-COMMERCIAL-COPY-1` |
| Prepare activation | Scope, route, support, duration, expiry, `StudentAccess` understanding. | Activation checklist and risk review. | yes, documentation only | yes if payment, minors, runtime, trial, billing, or student-facing effects appear | Not authorized in 1C | `MVP-COMMERCIAL-SANDBOX-1` |
| Activate without payment | Route and support ready; no public promise; no trial/runtime/billing implication. | Explicit future activation phase and verification plan. | no, operation requires future phase | possibly, depending on student-facing/runtime implications | Not authorized in 1C | `MVP-COMMERCIAL-TRIAL-1D` |
| Activate with payment | Payment policy, payer, consent, access, support, refund, and source-of-truth resolved. | Pro/high-level decision and gated implementation readiness. | no | yes | NO-GO | Future Pro/high-level phase |
| Activate minor participant | Minor handling, guardian consent, payer responsibility, communication, and support resolved. | Pro/high-level decision and documented consent/payment policy. | no | yes | NO-GO | Future Pro/high-level phase |
| Extend sandbox | Participant value, support capacity, route continuity, and expiry revision clear. | Extension rationale and revised scope/duration. | yes, documentation only | yes if payment/subscription/public promise involved | Not authorized in 1C | `MVP-COMMERCIAL-SANDBOX-1` |
| Pause sandbox | Support issue, participant need, product gap, or policy issue identified. | Pause reason and communication plan. | yes, documentation only | yes if refund/payment/minor policy involved | Not authorized in 1C | `MVP-COMMERCIAL-SANDBOX-1` |
| Expire sandbox | Expiry date and end-state communication defined. | Expiry plan and state handling. | yes, documentation only | yes if paid access/subscription involved | Not authorized in 1C | `MVP-COMMERCIAL-SANDBOX-1` |
| Convert to subscription candidate | Sandbox evidence supports continued limited-scope value. | Subscription scope, price, promise, and support model. | no | yes | NO-GO | `MVP-COMMERCIAL-SUBSCRIPTION-1` |

## 13. Initial participant classes

| Participant class | Invitation readiness | Activation readiness | Payment readiness | Pro required? |
| --- | --- | --- | --- | --- |
| Owner/operator test participant | High for internal non-public learning and process rehearsal. | Possible only in a future explicit phase with no public promise. | Not applicable unless real payment is introduced. | no for documentation; yes if payment or public claims appear |
| Known adult participant | Possible with sober closed-lab framing and compatible goal. | Requires route, support, expiry, and no-overpromise evidence. | NO-GO until payment gates are resolved. | yes for payment, price, subscription, or public promise |
| Known minor participant | Conceptual invitation criteria can be documented. | NO-GO until minor/payment/consent/support questions are resolved. | NO-GO. | yes |
| External unknown participant | Not recommended before Sales-Ready gate. | NO-GO for current closed lab. | NO-GO. | yes for any scale beyond known group |

The initial proposed group includes Mauricio, his son, and his son's friend. This phase does not authorize payment or activation for any of them.

## 14. Recommended next phases

Option A:

```text
MVP-COMMERCIAL-SANDBOX-1 - First closed sandbox operating runbook
```

Option B:

```text
MVP-COMMERCIAL-COPY-1 - Sober invitation and activation copy candidates
```

Option C:

```text
MVP-COMMERCIAL-TRIAL-1D - Closed sandbox activation checklist
```

Option D:

```text
MVP-COMMERCIAL-SALES-READY-GATE-1 - Public M1/M2/L1 Sales-Ready gate
```

Recommendation: prefer `MVP-COMMERCIAL-COPY-1` or `MVP-COMMERCIAL-SANDBOX-1` next, depending on whether communication or the operating runbook should be clarified first.

## 15. Explicit non-goals

* No code.
* No DB.
* No migrations.
* No deploy.
* No payment authorization.
* No trial activation.
* No billing, subscription, or payment.
* No runtime enforcement.
* No `/now`.
* No student UI.
* No admin mutation.
* No repair/autocreate.
* No public offer.
* No Sales-Ready claim.
* No legal decision.
* No minor payment authorization.
* No actual invitation sent.
* No actual activation performed.

## 16. Conclusion

1C defines invitation and activation criteria only.

Invitation and activation remain future actions.

Payment remains NO-GO.

Minor payment remains reserved for Pro/high-level review.

Commercial planning may continue.

No implementation was performed.

Result marker:

```text
MVP_COMMERCIAL_TRIAL_1C_INVITATION_ACTIVATION_CRITERIA_DEFINED
```
