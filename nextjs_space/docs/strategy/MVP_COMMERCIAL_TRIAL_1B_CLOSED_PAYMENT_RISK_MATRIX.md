# MVP-COMMERCIAL-TRIAL-1B - Closed Payment Risk Matrix

## 1. Phase

* Phase: `MVP-COMMERCIAL-TRIAL-1B`.
* Type: commercial / ethical / operational risk documentation-only.
* Baseline: `2832aec`.
* No implementation authorized.
* No payment authorized.
* No trial activation authorized.
* No Sales-Ready claim.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`, closed laboratory only.

## 2. Relationship to 1A

* `MVP-COMMERCIAL-TRIAL-1A` separated closed commercial sandbox from public Sales-Ready.
* 1B evaluates risks before any decision to accept real closed payment.
* Closed payment remains unauthorized.
* The known-users proposal remains input, not an approved operation.
* M1-only remains closed laboratory, not a public offer.

## 3. Risk matrix purpose

This matrix identifies commercial, ethical, operational, legal/compliance, brand, support, product, pedagogy, and data risks before any closed payment decision.

It defines minimum mitigations, separates what can advance through Thinking/Codex documentation from what requires Pro/high-level review, and prevents the desire to test payment from drifting into premature public sale.

## 4. Risk severity scale

Likelihood:

* Low.
* Medium.
* High.

Impact:

* Low.
* Medium.
* High.
* Critical.

Decision:

* Acceptable for documentation.
* Needs mitigation before sandbox.
* Reserved for Pro/high-level review.
* Blocking until resolved.

## 5. Core risk matrix

| Risk ID | Risk | Category | Why it matters | Likelihood | Impact | Mitigation | Requires Pro/high-level review? | Can advance with Thinking/Codex? | Candidate future phase | Current decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Closed payment confused with public sale | Commercial / brand | Could create a public Sales-Ready signal before the product can support it. | Medium | High | Label every payment discussion as closed lab, non-public, controlled, and experimental. | yes | yes, documentation/copy only | `MVP-COMMERCIAL-COPY-1` | Needs mitigation before sandbox |
| R2 | M1-only perceived as complete PAES offer | Product / commercial | M1-only cannot support a public M1/M2/L1 promise. | Medium | High | Keep public Sales-Ready blocked until M1/M2/L1 minimum readiness. | yes | yes, scope language only | `MVP-COMMERCIAL-SALES-READY-GATE-1` | Blocking until resolved for public sale |
| R3 | Minors participating in payment flow | Ethical / legal | Payment responsibility, consent, and protection are unresolved if a minor is involved. | High | Critical | Do not charge minors until policy, payer role, consent, and handling are reviewed. | yes | no, except risk documentation | `MVP-COMMERCIAL-TRIAL-1C` | Reserved for Pro/high-level review |
| R4 | Undefined payer: student, guardian, or both | Commercial / legal | Confusion can create consent, refund, support, and accountability problems. | High | High | Decide payer identity and consent model before any payment. | yes | yes, options only | `MVP-COMMERCIAL-TRIAL-1C` | Reserved for Pro/high-level review |
| R5 | Payment succeeds without clear access | Product / operations | A paid participant may not know what was unlocked or what happens next. | Medium | High | Define access unlock, confirmation, support, and fallback before charging. | yes | yes, checklist/runbook only | `MVP-COMMERCIAL-SANDBOX-1` | Needs mitigation before sandbox |
| R6 | Access active without sufficient pedagogical route | Pedagogy / product | Access without a coherent route can damage trust and learning value. | Medium | High | Require route readiness and explicit limited scope before access activation. | yes | yes, activation criteria only | `MVP-COMMERCIAL-TRIAL-1C` | Needs mitigation before sandbox |
| R7 | Human manually sustaining an immature app | Operations / product | Human overcompensation can mask product gaps and create a false success signal. | High | High | Track every human intervention as product evidence and avoid unlimited manual support promises. | no | yes | `MVP-COMMERCIAL-SANDBOX-1` | Needs mitigation before sandbox |
| R8 | Three known users treated as market validation | Commercial strategy | Known participants validate operations, not market demand or price. | High | High | Label evidence as operational coherence only. | yes | yes, language/gate only | `MVP-COMMERCIAL-SALES-READY-GATE-1` | Reserved for Pro/high-level review |
| R9 | Price defined too early | Commercial | Early price may imply public offer maturity or lock in the wrong promise. | Medium | High | Treat price as Pro/high-level decision after scope, refund, and access are defined. | yes | yes, pricing risk only | `MVP-COMMERCIAL-SUBSCRIPTION-1` | Reserved for Pro/high-level review |
| R10 | Subscription perceived as mature product | Commercial / brand | Subscription language can imply ongoing complete PAES support. | Medium | High | Use limited-scope continuity language and avoid complete-product claims. | yes | yes, non-binding model only | `MVP-COMMERCIAL-SUBSCRIPTION-1` | Needs mitigation before sandbox |
| R11 | No refund, pause, or service-failure policy | Support / legal | Payment without remedy creates trust, support, and ethical risk. | High | High | Define refund/pause/service failure policy before accepting money. | yes | yes, policy options only | `MVP-COMMERCIAL-TRIAL-1C` | Reserved for Pro/high-level review |
| R12 | Sandbox expiry poorly communicated | Operations / support | Participants may think access is permanent or public subscription has started. | Medium | Medium | Define sandbox duration, expiry behavior, and closure copy before activation. | no | yes | `MVP-COMMERCIAL-SANDBOX-1` | Needs mitigation before sandbox |
| R13 | Unlimited human support implied | Support / commercial | Scope creep can create unsustainable service expectations. | Medium | High | Define support boundaries and escalation windows. | yes | yes, runbook only | `MVP-COMMERCIAL-SANDBOX-1` | Needs mitigation before sandbox |
| R14 | Student data/evidence used without clear frame | Data / ethics | Learning evidence can be sensitive and must be handled with clear purpose and restraint. | Medium | High | Define internal evidence use, consent, minimization, and reporting boundaries. | yes | yes, checklist only | `MVP-COMMERCIAL-TRIAL-1C` | Reserved for Pro/high-level review |
| R15 | Brand damage from overpromise | Brand / commercial | Public or semi-public overclaiming can weaken trust before the product is ready. | Medium | High | Use sober closed-lab language and forbid outcome or complete-platform claims. | yes | yes, copy candidates only | `MVP-COMMERCIAL-COPY-1` | Needs mitigation before sandbox |
| R16 | Confusion between `StudentAccess`, payment, and runtime access | Product / technical | A payment, admin state, and actual runtime access may diverge. | High | High | Keep payment, `StudentAccess`, runtime access, and Sales-Ready gates distinct. | yes | yes, readiness docs only | `MVP-SALES-TRIAL-4A` | Needs mitigation before sandbox |
| R17 | No billing/payment source of truth | Technical / operations | Without source-of-truth design, paid status can drift from access state. | High | Critical | Do not accept payment until billing source-of-truth readiness exists. | yes | yes, conceptual only | `MVP-COMMERCIAL-SANDBOX-1` | Blocking until resolved for payment |
| R18 | Trial activation without copy or support | Product / support | Activated access without expectation setting can confuse students and guardians. | Medium | High | Complete trial activation, copy, support, and expiry readiness first. | yes | yes, documentation only | `MVP-SALES-TRIAL-4A` | Blocking until resolved for trial activation |
| R19 | Legal/compliance ambiguity around minors/payment | Legal / ethics | Minor payment handling may require consent, guardianship, recordkeeping, and refund decisions. | High | Critical | Reserve for Pro/high-level review and possibly external legal advice before payment. | yes | no, except risk framing | `MVP-COMMERCIAL-TRIAL-1C` | Reserved for Pro/high-level review |
| R20 | Scaling beyond closed group before Sales-Ready gate | Governance / commercial | Expansion can silently become public launch. | Medium | Critical | Require explicit Sales-Ready gate and public M1/M2/L1 readiness before scale. | yes | yes, gate docs only | `MVP-COMMERCIAL-SALES-READY-GATE-1` | Blocking until resolved |

## 6. Pro/high-level reserved risks

These risks must not be resolved by Thinking/Codex alone:

* Charging minors.
* Who operates payment if the user is a minor.
* Real price.
* Refund/pause policy.
* Public commercial promise.
* Public Sales-Ready threshold.
* Scaling outside known users.
* Legal/ethical consent policy.
* Final subscription scope.

## 7. Risks that can advance with Thinking/Codex

These items may advance as documentation or planning only:

* Non-binding preliminary copy.
* Invitation checklist.
* Activation checklist.
* Human supervision runbook.
* Support matrix.
* Sandbox operating checklist.
* Failure scenarios.
* Internal labels.
* Candidate phase plan.

Advancing these items does not authorize operation, payment, access activation, billing, public offer, or Sales-Ready claims.

## 8. Mitigation principles

* Always label the effort as closed lab.
* Never call it launch.
* Never imply complete PAES preparation.
* Never imply a score guarantee.
* Never imply payment equals immediate access.
* Never activate access without route readiness.
* Never charge minors without Pro/high-level decision.
* Keep payment, access, runtime, subscription, and Sales-Ready distinct.
* Human support supervises; it should not mask product gaps.
* Record every exception as product evidence.

## 9. Payment-specific minimum gates before any real charge

Before any real closed payment:

* Participant selected and documented.
* Minor/payment policy resolved if relevant.
* Payer identity and consent resolved.
* Exact amount approved.
* Refund/pause policy approved.
* Access unlock definition approved.
* Failure/support path approved.
* Trial/sandbox duration approved.
* Expiry behavior approved.
* Copy approved.
* Payment confirmation path approved.
* Manual rollback/support plan approved.
* No public Sales-Ready claim.

If any item is unresolved, real payment remains NO-GO.

## 10. Sandbox failure scenarios

* Payment succeeds but access is not activated.
* Access is activated but no study route is ready.
* Student cannot understand the next step.
* App bug blocks activity.
* Human intervention is required repeatedly.
* Student wants pause or refund.
* Trial expires but student still has access.
* Payment state and `StudentAccess` disagree.
* Parent/guardian asks for explanation.
* Student thinks this is full PAES preparation.

Expected response:

* Do not improvise public promises.
* Use internal support handling.
* Preserve evidence.
* Record the mismatch.
* Avoid expanding scope inside the incident.
* Escalate Pro/high-level decisions when payment, minors, refund, access activation, or public claims are involved.

## 11. Commercial language risk

Allowed language:

* Closed laboratory.
* Controlled test.
* Experience in development.
* Limited scope.
* Supervised continuity.
* Pedagogical support in development.

Disallowed language:

* Launch.
* Public offer.
* Complete PAES preparation.
* Score guarantee.
* Complete AI tutor.
* Definitive platform.
* Total access.
* Complete PAES subscription.

## 12. Initial decision

* Closed payment remains NO-GO until Pro/high-level review resolves the payment, minors, and policy questions.
* Documentation and operating design may continue.
* Sandbox planning may continue.
* Public Sales-Ready remains blocked.
* No implementation authorized.

## 13. Recommended next phases

Option A:

```text
MVP-COMMERCIAL-TRIAL-1C - Invitation and activation criteria
```

Option B:

```text
MVP-COMMERCIAL-SANDBOX-1 - First paid sandbox operating runbook
```

Option C:

```text
MVP-COMMERCIAL-COPY-1 - Sober closed-lab copy candidates
```

Option D:

```text
MVP-COMMERCIAL-SALES-READY-GATE-1 - Public M1/M2/L1 Sales-Ready gate
```

Recommendation: prefer `MVP-COMMERCIAL-TRIAL-1C` next, because invitation and activation criteria can be documented without authorizing payment.

## 14. Explicit non-goals

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

## 15. Conclusion

1B defines the closed payment risk matrix only.

Real closed payment remains NO-GO until specified gates are resolved.

Commercial planning may continue.

The next safe phase is invitation/activation criteria or sandbox runbook documentation.

No implementation was performed.

Result marker:

```text
MVP_COMMERCIAL_TRIAL_1B_CLOSED_PAYMENT_RISK_MATRIX_DEFINED
```
