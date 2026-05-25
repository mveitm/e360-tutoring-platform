# MVP-COMMERCIAL-SANDBOX-2 - Owner/Operator Dry-Run Checklist

## 1. Phase

* Phase: `MVP-COMMERCIAL-SANDBOX-2`.
* Type: commercial operations / documentation-only / dry-run readiness.
* Baseline: `3f54384`.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`.
* No implementation authorized.
* No real participant invited.
* No sandbox activation authorized.
* No payment authorized.
* No trial activation authorized.
* No Sales-Ready claim.

## 2. Relationship to SANDBOX-1, COPY-1, 1A, 1B, 1C and StudentAccess 3M

* `MVP-COMMERCIAL-TRIAL-1A` separated closed commercial sandbox strategy from public Sales-Ready.
* `MVP-COMMERCIAL-TRIAL-1B` defined the risk matrix and kept closed payment at `NO-GO`.
* `MVP-COMMERCIAL-TRIAL-1C` defined invitation and activation readiness as future actions.
* `MVP-COMMERCIAL-COPY-1` defined copy candidates that are not approved for real use.
* `MVP-COMMERCIAL-SANDBOX-1` defined the first closed sandbox operating runbook without executing it.
* The StudentAccess 3M block created and smoke-verified the non-permission `reaffirm_no_access` endpoint.
* SANDBOX-2 converts the SANDBOX-1 operating model into an internal owner/operator dry-run checklist only.

## 3. Dry-run status

This is a dry-run readiness checklist.

It does not authorize:

* Operation.
* Invitation.
* Participant contact.
* Activation.
* Payment.
* Trial activation.
* Runtime access.
* Billing, subscription, or payment behavior.
* Student-facing UI.
* Admin mutation.
* DB mutation.
* Public offer.
* Sales-Ready claim.

The dry-run is for Mauricio as owner/operator only. No third party participates.

## 4. Purpose

The purpose is to rehearse the closed sandbox operating logic internally before any real invitation, activation, payment, trial, runtime access, billing, subscription, student-facing UI, or public promise.

The dry-run asks:

* Do we know who the participant class is?
* Do we know the scope?
* Do we know what first step would happen?
* Do we know what evidence we would observe?
* Do we know what would stop the sandbox?
* Do we know what we must not say?
* Do we know what must remain `NO-GO`?
* Do we know which future phase would be needed before real use?

This phase prefers checklist/readiness rehearsal over browser execution. Actual app operation is not required.

## 5. Owner/operator participant definition

The owner/operator participant is Mauricio acting internally as:

* Product owner.
* Operational rehearsal participant.
* Supervisor of the dry-run logic.
* Reviewer of stop conditions and evidence needs.

Mauricio is not acting as:

* A real invited student.
* A paying participant.
* A market-validation participant.
* A minor.
* A public customer.
* A substitute for student evidence.

This role may rehearse the operating logic, but it must not be counted as market demand, public pricing validation, public Sales-Ready validation, or third-party student validation.

## 6. What this dry-run is and is not

This dry-run is:

* Internal.
* Owner/operator only.
* Non-public.
* Non-mutating.
* Documentation/readiness oriented.
* A rehearsal of decision logic, evidence expectations, support limits, and stop gates.

This dry-run is not:

* A real invitation.
* A real sandbox launch.
* A participant activation.
* A payment test.
* A trial activation.
* A runtime access test.
* A billing/subscription/payment test.
* Student-facing UI validation.
* Market demand validation.
* Public pricing validation.
* Public Sales-Ready validation.

## 7. Pre-dry-run checklist

Before any future internal dry-run is considered, confirm:

* Git preflight is clean.
* Product horizon is `MVP-Beta-Pre-Sales-Ready`.
* Participant class is owner/operator only.
* No third party will be contacted.
* No minor will participate.
* No invitation copy will be sent.
* No final copy approval is implied.
* Scope is limited to internal readiness rehearsal.
* First-step hypothesis is documented.
* Evidence to observe is documented.
* Support boundaries are documented.
* Stop/no-go gates are documented.
* Payment remains `NO-GO`.
* Trial activation remains `NO-GO`.
* Runtime access remains unchanged.
* `StudentAccess` remains non-permission unless a future phase explicitly authorizes otherwise.
* No DB mutation is planned.
* No app code change is planned.
* No deploy is planned.

## 8. Dry-run sequence

Conceptual dry-run sequence:

1. Confirm this is owner/operator only.
2. Confirm no real participant, third party, or minor is involved.
3. State the hypothetical participant class as `owner/operator test participant`.
4. State the sandbox scope in one paragraph.
5. Identify the hypothetical first step a real participant would need.
6. Identify the evidence that would be observed if this became real.
7. Review COPY-1 language as reference only.
8. Simulate the invitation decision without sending an invitation.
9. Simulate the activation-readiness decision without activation.
10. Apply PASS / FAIL / BLOCKED criteria.
11. Record what remains `NO-GO`.
12. Identify the next required phase before any real use.

No browser execution, API call, DB action, or participant contact is required for this checklist.

## 9. Evidence to observe

The dry-run should identify whether future evidence would be able to answer:

* Does the operator know the participant class?
* Is the scope clear and limited?
* Is the first student action understandable?
* Is a route or first activity available conceptually?
* What would count as first-use friction?
* What would count as evidence visible to admin?
* How many human interventions would be acceptable?
* What would prove the app, not the human, carried the core flow?
* What would stop or pause the sandbox?
* What must remain unpromised?

Use non-sensitive evidence only. Do not record unnecessary personal data.

## 10. PASS criteria

The dry-run checklist is `PASS` only if:

* Owner/operator-only scope is clear.
* No third party is contacted.
* No minor participates.
* No invitation is sent.
* No activation is performed.
* No payment is requested or authorized.
* No trial, runtime, billing, `/now`, student UI, admin mutation, DB, or deploy action is needed.
* First-step hypothesis is understandable.
* Evidence expectations are clear.
* Stop/no-go gates are clear.
* No-overpromise boundaries are clear.
* Future phase needed before real use is identified.
* The dry-run does not imply market demand, public pricing, or Sales-Ready validation.

## 11. FAIL criteria

The dry-run is `FAIL` if:

* It requires a real participant to answer basic readiness questions.
* It contacts a third party.
* It involves a minor.
* It sends or approves real copy.
* It requests or authorizes payment.
* It activates access, trial, billing, or runtime behavior.
* It changes code, DB, `/now`, student UI, admin UI, endpoints, auth, or `StudentAccess` behavior.
* It treats owner/operator rehearsal as market validation.
* It treats M1-only closed lab as public Sales-Ready.
* It requires the human to manually create a complete learning experience outside the app.
* It creates public-offer or complete-PAES language.

## 12. BLOCKED criteria

The dry-run is `BLOCKED` if:

* Required governance or phase context is missing.
* Git preflight is not clean.
* Product horizon cannot be classified as `MVP-Beta-Pre-Sales-Ready`.
* Scope requires real invitation, activation, payment, minor handling, runtime access, billing, subscription, `/now`, student UI, admin mutation, DB, deploy, legal decision, or Sales-Ready decision.
* The first-step hypothesis cannot be stated.
* Evidence expectations cannot be stated.
* Support boundaries cannot be stated.
* Stop/no-go gates cannot be stated.
* The phase would require Pro/high-level decisions before continuing.

## 13. Stop/no-go gates

Stop immediately if the dry-run starts requiring:

* Real participant invitation.
* Third-party contact.
* Minor participation.
* Payment request or payment authorization.
* Trial activation.
* Runtime access change.
* Billing, subscription, or payment behavior.
* `/now` behavior change.
* Student UI change.
* Admin mutation.
* DB mutation.
* Schema or migration.
* Deploy.
* Final copy approval.
* Legal/minor/payment decision.
* Public offer.
* Sales-Ready claim.

## 14. Human support boundaries

During the dry-run, human support may be described as:

* Supervisor.
* Observer.
* Exception handler.
* Evidence reviewer.
* Scope clarifier.

Human support must not be described as:

* Unlimited support.
* Manual tutoring every step.
* A way to hide product gaps.
* The mechanism that makes an incomplete product appear complete.
* A source of outcome promises.

## 15. Commercial boundaries

Commercial boundaries:

* Closed sandbox readiness is not a public launch.
* Dry-run readiness is not a sandbox launch.
* Owner/operator rehearsal is not market validation.
* Known-user planning is not public demand validation.
* M1-only closed lab is not public M1/M2/L1 Sales-Ready.
* No public offer is created.
* No public price is validated.
* No subscription promise is created.

## 16. Payment boundary

Payment remains `NO-GO`.

This phase does not authorize:

* Asking for payment.
* Accepting payment.
* Testing payment.
* Deciding price.
* Deciding payer identity.
* Deciding refund or pause policy.
* Deciding payment involving minors.
* Creating billing/subscription/payment source-of-truth behavior.

Payment involving minors remains reserved for Pro/high-level review.

## 17. StudentAccess boundary

Current `StudentAccess` context:

* Default signup state is non-permission.
* Admin `reaffirm_no_access` exists and is smoke-verified.
* `reaffirm_no_access` does not activate access.
* `StudentAccess` must not be used as a commercial promise.

SANDBOX-2 does not authorize:

* `StudentAccess` mutation.
* Trial activation.
* Runtime access.
* Billing-backed access.
* Repair/autocreate.
* Missing-row repair.

## 18. Student experience boundary

This phase changes nothing the student sees or can do.

The dry-run must not:

* Change student UI.
* Change `/now`.
* Expose internal states.
* Send student-facing copy.
* Promise complete PAES preparation.
* Promise score improvement.
* Promise advanced AI tutoring.
* Promise immediate access.
* Promise subscription continuity.

## 19. Data/privacy boundary

Data/privacy rules:

* Avoid unnecessary personal data.
* Use owner/operator role labels instead of personal participant details where possible.
* Do not include minor details.
* Do not include payment details.
* Do not include screenshots with secrets.
* Do not expose cookies, tokens, headers, session payloads, raw environment values, or credentials.
* Keep evidence educational, operational, and non-sensitive.

## 20. Post-dry-run review questions

After a future internal dry-run, review:

* Was the participant class clear?
* Was the closed-lab scope clear?
* Was the hypothetical first step clear?
* Was the evidence plan useful?
* Were stop/no-go gates easy to apply?
* Did any question require real participant contact?
* Did any question require payment, trial, runtime, billing, `/now`, student UI, admin mutation, DB, or deploy?
* Did the dry-run expose missing copy approval?
* Did the dry-run expose missing route/content readiness?
* Did the dry-run expose support burden risk?
* Did the dry-run preserve non-public, non-Sales-Ready framing?
* Which future phase is required before real use?

## 21. Context Gate summary

| Field | Summary |
| --- | --- |
| Phase | `MVP-COMMERCIAL-SANDBOX-2 - Dry-run checklist for owner/operator test participant` |
| Proposed action | Create documentation-only checklist for internal owner/operator dry-run readiness. |
| Phase type | Commercial operations / documentation-only / dry-run readiness. |
| Product horizon | `MVP-Beta-Pre-Sales-Ready`. |
| Roadmap block | Closed commercial sandbox readiness; no operation authorized. |
| Git preflight | `HEAD`, `origin/main`, and `origin/HEAD` matched `3f54384`; working tree was clean. |
| Canonical docs read | Product horizons, Context Gate protocol, Living Memory Index, handoff protocol, current handoff, operating mode, compact reporting rule. |
| Phase docs read | Parallel strategy inbox, 1A, 1B, 1C, COPY-1, SANDBOX-1, StudentAccess 3M closeout. |
| Product/UI docs read | Product/UI/brand synthesis read. |
| Relevant strategic decisions | M1-only remains closed lab / Pre-Sales-Ready; closed payment remains `NO-GO`; copy candidates are not approved for real use; SANDBOX-1 is a runbook draft only. |
| Student experience impact | None. No student-facing change. |
| Commercial impact | None operationally. Internal readiness only. |
| Commercial non-goals | No public offer, payment, trial activation, billing/subscription/payment, public price, Sales-Ready, invitation, activation, or subscription promise. |
| Brand risk | Low if kept internal; high if mistaken for invitation, launch, or public offer. |
| Operational/tutor-admin impact | Defines internal rehearsal checklist only; no workload change. |
| Technical scope | Markdown doc plus `PHASE_LOG.md` only. |
| Explicit non-goals | No code, DB, schema, migration, deploy, `/now`, UI, endpoint, auth, StudentAccess mutation, trial, runtime, billing, payment, invitation, activation, public offer, or Sales-Ready claim. |
| Missing context check | No blocking context missing for this narrow documentation phase. |
| Roadmap change-control check | No roadmap change; phase documents readiness only. |
| Why this phase is aligned | It rehearses closed-lab operating logic before any real participant or commercial action. |
| What this phase must not include | Any real operation, participant contact, payment, activation, technical behavior change, or public promise. |
| GO / NO-GO | GO. |
| Reason | GO only because this is documentation-only and internal dry-run readiness. |

## 22. Future phase options

Option A:

```text
MVP-COMMERCIAL-COPY-2 - Review and approve one closed-lab invitation copy for internal use
```

Purpose: approve a single closed-lab copy variant for future internal use, still without sending it.

Option B:

```text
MVP-COMMERCIAL-SANDBOX-3 - Owner/operator non-mutating dry-run evidence review
```

Purpose: run or document an internal owner/operator rehearsal using this checklist, without participant contact or mutation.

Option C:

```text
MVP-COMMERCIAL-TRIAL-1D - Closed sandbox activation checklist
```

Purpose: define activation checklist without activating the sandbox.

Option D:

```text
MVP-COMMERCIAL-SALES-READY-GATE-1 - Public M1/M2/L1 Sales-Ready gate
```

Purpose: define public Sales-Ready gate requirements for M1/M2/L1.

Recommendation: prefer `MVP-COMMERCIAL-COPY-2` if communication approval is the next bottleneck, or `MVP-COMMERCIAL-SANDBOX-3` if an internal non-mutating dry-run should be rehearsed next.

## 23. Explicit non-goals

* No code.
* No DB.
* No migrations.
* No deploy.
* No product behavior change.
* No real participant invited.
* No third party contacted.
* No minor participates.
* No sandbox activated.
* No payment requested.
* No payment authorized.
* No trial activation.
* No billing, subscription, or payment.
* No runtime enforcement.
* No `/now`.
* No student UI.
* No admin mutation.
* No repair/autocreate.
* No `StudentAccess` mutation.
* No final copy approval.
* No public offer.
* No Sales-Ready claim.
* No legal decision.
* No minor/payment decision.
* No market demand validation.
* No public pricing validation.
* No public Sales-Ready validation.

## 24. Conclusion and result marker

SANDBOX-2 defines an internal owner/operator dry-run checklist only.

No sandbox is launched.

No real participant is invited.

Payment remains `NO-GO`.

Invitation and activation remain future actions.

Public Sales-Ready remains blocked.

Future use requires an explicit phase.

Result marker:

```text
MVP_COMMERCIAL_SANDBOX_2_OWNER_OPERATOR_DRY_RUN_CHECKLIST_DEFINED
```
