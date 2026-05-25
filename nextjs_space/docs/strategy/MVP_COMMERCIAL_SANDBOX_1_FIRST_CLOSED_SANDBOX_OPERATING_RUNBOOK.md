# MVP-COMMERCIAL-SANDBOX-1 - First Closed Sandbox Operating Runbook

## 1. Phase

* Phase: `MVP-COMMERCIAL-SANDBOX-1`.
* Type: commercial operations / documentation-only.
* Baseline: `3a08e72`.
* No implementation authorized.
* No invitation authorized.
* No activation authorized.
* No payment authorized.
* No trial activation authorized.
* No Sales-Ready claim.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`, closed laboratory only.

## 2. Relationship to 1A, 1B, 1C and COPY-1

* `MVP-COMMERCIAL-TRIAL-1A` separated closed commercial sandbox from public Sales-Ready.
* `MVP-COMMERCIAL-TRIAL-1B` defined the risk matrix and kept closed payment at NO-GO.
* `MVP-COMMERCIAL-TRIAL-1C` defined invitation and activation-readiness criteria.
* `MVP-COMMERCIAL-COPY-1` defined copy candidates that are not approved for real use.
* SANDBOX-1 defines the operating mode for the first sandbox, but does not execute it.

## 3. Runbook status

* This is a runbook draft.
* It does not authorize operation.
* It does not authorize payment.
* It does not authorize invitation.
* It does not authorize activation.
* It does not authorize runtime access.
* It does not authorize student-facing UI.
* It requires a future explicit phase before use.

## 4. Sandbox purpose

The first closed sandbox is intended to:

* Observe whether Bexauri can sustain a basic closed experience.
* Validate flow clarity.
* Validate operational continuity.
* Validate student/app friction.
* Validate usefulness of evidence.
* Validate human supervision load.
* Prepare future payment/access validation without authorizing it yet.

Clear distinctions:

* Operating sandbox readiness is not paid sandbox authorization.
* Sandbox runbook is not public launch.
* Known users are not market validation.

## 5. Candidate participant classes

| Participant class | Example | Allowed now? | Payment allowed? | Pro/high-level required? | Notes |
| --- | --- | --- | --- | --- | --- |
| Owner/operator test participant | Mauricio | Documentation only; future dry-run can be considered in a later phase | no | no for documentation; yes if payment/public claim appears | Can be used for an internal dry-run if a future phase authorizes it. |
| Known adult participant | Known controlled adult | Documentation only | no | yes for payment, price, subscription, or public promise | May be considered after invitation/copy/activation gates are reviewed. |
| Known minor participant | Son/friend category only; no personal data | Documentation only | no | yes | Requires Pro/high-level review for payment, consent, guardian handling, and ethics. |
| External unknown participant | Unknown external student | no | no | yes | Not allowed for this sandbox stage; would risk public-sale drift. |

## 6. Pre-sandbox readiness checklist

Before any future operation:

* Participant class selected.
* Non-public framing confirmed.
* No-overpromise copy selected but not yet sent.
* Route/content available.
* First activity available.
* `StudentAccess` state understood.
* Access path defined.
* Support owner assigned.
* Supervision owner assigned.
* Start/end candidate defined.
* Pause/closure criteria defined.
* Failure response defined.
* Evidence capture method defined.
* Privacy/data boundaries reviewed.
* Payment remains NO-GO unless a future Pro/high-level decision authorizes it.

## 7. Roles and responsibilities

### Student / participant

* Uses the app.
* Follows the activity path.
* Reports friction.
* Has no obligation to validate the commercial market.

### Human supervisor

* Observes.
* Detects blockers.
* Reviews evidence.
* Does minimal intervention.
* Documents friction.
* Avoids becoming a manual tutor.

### Technical operator

* Checks app state.
* Verifies access.
* Handles local/dev technical blockers.
* Avoids secrets exposure.

### Director / product owner

* Decides GO/NO-GO.
* Protects ethics and brand.
* Decides whether evidence becomes roadmap input.

No role may:

* Overpromise.
* Bypass app limitations.
* Create manual tutoring as default.
* Turn the sandbox into public sale.

## 8. Sandbox operating sequence

Conceptual sequence:

1. Candidate selection.
2. Readiness review.
3. Copy review.
4. Invitation decision.
5. Activation decision.
6. Start of closed experience.
7. First activity observation.
8. Midpoint review.
9. Closure/expiry decision.
10. Post-sandbox evidence review.

This runbook defines sequence only. No step is executed in this phase.

## 9. Evidence to collect

Use non-sensitive evidence only:

* Student understood what to do.
* First activity started/completed.
* Friction points.
* App continuity.
* Self-report.
* MC evidence if applicable.
* Support needed.
* Human intervention count.
* Time-to-first-use.
* Blockers.
* Evidence visible in admin.
* Whether the app, not the human, carried the core flow.

## 10. Success criteria

The sandbox can be considered successful only if:

* Participant can understand the first step.
* Participant can complete at least one activity.
* App provides a next action or clear stop.
* Admin can observe evidence.
* Human intervention stays minimal.
* No overpromise occurs.
* No trial/payment confusion occurs.
* No broken access state appears.

## 11. Failure / pause criteria

Pause or fail if:

* Participant cannot start without manual guidance.
* App lacks route/content.
* Access state is unclear.
* Support burden is high.
* Copy causes misunderstanding.
* Participant expects full PAES preparation.
* Payment/consent issue appears.
* Technical bug blocks core flow.
* Evidence is not visible to admin.
* Human must manually create the experience outside the app.

## 12. Human support boundaries

Allowed support:

* Clarify scope.
* Help with technical access.
* Observe learning path.
* Record friction.
* Intervene minimally if blocked.

Not allowed as normal operation:

* Tutoring manually every step.
* Creating activities outside app.
* Promising outcomes.
* Hiding product gaps.
* Unlimited support.

## 13. Communication boundaries

Use COPY-1 candidates only as reference, not approved copy.

Rules:

* No invitation sent in this phase.
* No final copy approval.
* No payment copy.
* No public post.
* No broad marketing.
* No Sales-Ready language.

## 14. Payment boundary

* Payment remains NO-GO.
* Closed payment requires future Pro/high-level review.
* Minor payment requires Pro/high-level review.
* Payer identity is unresolved.
* Refund/pause policy is unresolved.
* Payment processor/source-of-truth is unresolved.
* This runbook can later support a payment runbook, but does not authorize payment.

## 15. StudentAccess boundary

* `StudentAccess` reaffirm endpoint exists and is smoke-verified.
* It is non-permission.
* It does not activate access.
* It does not activate trial.
* It does not activate billing.
* Future sandbox activation may require `StudentAccess` transition phases, but that is not authorized here.
* `StudentAccess` must not be shown as a commercial promise.

## 16. Data and privacy boundaries

* Avoid unnecessary personal data in reports.
* Use redacted/partial IDs.
* Do not expose emails unless needed internally.
* No screenshots with secrets.
* No payment details in reports.
* No sensitive minors/payment information in general docs.
* Keep evidence educational/operational.

## 17. Decision gates

| Gate | Purpose | Required before | Decision owner | Current status |
| --- | --- | --- | --- | --- |
| Invitation gate | Decide whether anyone can be contacted. | Any real invitation. | Director / product owner. | Not passed; future phase required. |
| Activation gate | Decide whether closed experience can start. | Any activation or access start. | Director / product owner with technical/operator input. | Not passed; future phase required. |
| Payment gate | Decide whether real payment may be accepted. | Any payment copy, payment request, or payment processing. | Pro/high-level review. | NO-GO; future Pro/high-level phase required. |
| Minor/guardian gate | Resolve consent, payer, guardian communication, and ethics. | Any minor participation involving payment or sensitive handling. | Pro/high-level review. | NO-GO; future Pro/high-level phase required. |
| Runtime/access gate | Align actual app access with allowed sandbox scope. | Any runtime access change. | Technical/product gate. | Not passed; future phase required. |
| Support gate | Define who handles issues and when support stops. | Any live sandbox operation. | Director / supervisor. | Not passed; future phase required. |
| Copy gate | Approve final copy for real communication. | Any real message sent. | Director / product owner; Pro/high-level if payment/minors. | Not passed; future phase required. |
| Closure gate | Define pause, expiry, or completion behavior. | Sandbox start. | Director / product owner. | Not passed; future phase required. |
| Sales-Ready gate | Decide whether public sale is allowed. | Any public offer or scale beyond known closed group. | Pro/high-level / Sales-Ready gate. | NO-GO; future phase required. |

## 18. Recommended next phases

Option A:

```text
MVP-COMMERCIAL-SANDBOX-2 - Dry-run checklist for owner/operator test participant
```

Option B:

```text
MVP-COMMERCIAL-COPY-2 - Review and approve one closed-lab invitation copy for internal use
```

Option C:

```text
MVP-COMMERCIAL-TRIAL-1D - Closed sandbox activation checklist
```

Option D:

```text
MVP-COMMERCIAL-SALES-READY-GATE-1 - Public M1/M2/L1 Sales-Ready gate
```

Recommendation: prefer SANDBOX-2 if the next need is operational readiness, or COPY-2 if the next bottleneck is communication approval.

## 19. Explicit non-goals

* No code.
* No DB.
* No migrations.
* No deploy.
* No participant invited.
* No activation authorized.
* No payment authorized.
* No trial activation.
* No billing, subscription, or payment.
* No runtime enforcement.
* No `/now`.
* No student UI.
* No admin mutation.
* No repair/autocreate.
* No public offer.
* No Sales-Ready claim.
* No final copy approval.
* No legal decision.
* No minor payment authorization.

## 20. Conclusion

SANDBOX-1 defines operating runbook only.

No sandbox is launched.

Payment remains NO-GO.

Invitation and activation remain future actions.

Public Sales-Ready remains blocked.

Future use requires an explicit phase.

Result marker:

```text
MVP_COMMERCIAL_SANDBOX_1_FIRST_CLOSED_SANDBOX_RUNBOOK_DEFINED
```
