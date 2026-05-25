# Reduced-Pro Operating Mode and Decision-Tier Protocol

## 1. Phase

* Phase: `MVP-OPS-MODE-1`.
* Type: documentation-only operations governance.
* Baseline: `a3c0638`.
* No implementation authorized.
* No product behavior changed.

## 2. Trigger

* ChatGPT Pro US$100 has the Pro model temporarily blocked until May 29.
* ChatGPT can continue operating with Thinking/expanded mode or lighter models.
* Codex remains available on Pro with approximately 96% remaining.
* The MVP cannot wait until May 29.

## 3. Direction decision

* Do not stop MVP progress because of the temporary Pro model block.
* Move to a tiered direction protocol.
* Pro is reserved for high-impact decisions when it returns.
* Thinking/expanded mode directs and audits microphases.
* Codex Pro executes controlled local tasks under narrow prompts.

## 4. Decision tiers

| Tier | Tool/model | Allowed work | Forbidden work | Required safeguards |
| --- | --- | --- | --- | --- |
| Tier 1 - Pro / max reasoning, when available | ChatGPT Pro max reasoning | Architecture; strategy; high-risk roadmap; schema/DB decisions; runtime enforcement; trial activation; billing/payment/subscription; student-facing access display; Sales-Ready gate decisions; deep audit before/after critical blocks. | While unavailable, do not block all MVP progress waiting for it. | Use for high-impact GO/NO-GO decisions; preserve Git preflight and Context Gate; document decisions in versioned docs. |
| Tier 2 - ChatGPT Thinking/expanded | ChatGPT Thinking/ampliado or equivalent expanded reasoning | Phase direction; microphase scoping; readiness; prompt generation; diff interpretation; local smoke interpretation; documentation; low/medium-risk decisions already bounded by prior Pro/readiness docs. | Major architecture reversals; schema/DB mutations; trial activation; runtime enforcement; billing/payment; Sales-Ready claims; student-facing UX changes without explicit gate. | Keep phases narrow; cite governing docs; require explicit non-goals; defer Pro-level decisions. |
| Tier 3 - Codex Pro | Codex Pro local execution | Local technical execution; read-only inspection; narrow code edits; tests; build; controlled smoke; commit/push; `PHASE_LOG.md` updates; implementation of explicitly scoped low-risk phases. | Autonomous broad refactor; scope expansion; schema/DB changes unless explicitly authorized; secrets printing; product strategy decisions; student-facing changes without prompt authorization. | Use tight prompts; run preflight; respect Context Gate; keep diffs limited; verify before commit/push. |
| Tier 4 - lightweight model / basic chat | Lightweight model or basic chat | Git command reminders; summarizing console output; checklist execution; handoff preparation; simple mechanical prompts. | Architecture; implementation decisions; security decisions; roadmap decisions; interpreting complex diffs alone. | Use only for mechanical support; escalate decisions to Tier 2 or Tier 1 as needed. |

## 5. Operating rules while Pro is blocked

* No large phases.
* No mixed-scope phases.
* One concern per phase.
* Every implementation phase must be split into microphases.
* Git preflight before every phase.
* Context Gate before every phase.
* `PHASE_LOG.md` update for every closed phase.
* No automatic next phase.
* No secrets.
* No DB/schema/migration unless explicitly reserved for a Pro-level decision.
* No trial/runtime/billing/student-facing UX while Pro is unavailable unless already explicitly authorized by a prior phase and rechecked.

## 6. Allowed MVP work before Pro returns

* Documentation/readiness.
* Small endpoint implementation if already approved by 3L and bounded.
* Tests.
* Build.
* Smoke.
* Admin-only/internal tooling.
* Non-permission `StudentAccess` endpoint work.
* Handoff and phase discipline improvements.

## 7. Reserved for Pro after it returns

* Trial activation.
* Runtime enforcement.
* Student-facing access display.
* Billing/subscription/payment.
* Schema/DB migration decisions.
* Repair/autocreate strategy.
* Sales-Ready gate.
* M1/M2/L1 public readiness decision.
* Commercial offer decisions.
* High-risk architecture.

## 8. Application to immediate next phase

The immediate next technical phase may be:

```text
MVP-SALES-TRIAL-3M-A - Minimal admin StudentAccess reaffirm-no-access endpoint implementation
```

Only if opened explicitly.

Allowed for 3M-A:

* Endpoint only.
* Admin server-side auth.
* Command only: `keep_no_access` / `reaffirm_no_access`.
* `expectedPreviousState` required.
* `decisionReason` required.
* Existing `StudentAccess` row only.
* No UI.
* No trial activation.
* No runtime enforcement.
* No billing.
* No `/now`.
* No student UI.
* No repair/autocreate.
* No schema/DB migration.
* Tests required.
* Smoke separated or explicitly bounded.

## 9. Stop conditions

Stop if:

* Baseline mismatch.
* Working tree dirty unexpectedly.
* Scope requires schema/DB.
* Scope requires trial/runtime/billing/student UI.
* Security/auth is unclear.
* Codex proposes broad refactor.
* Tests fail and the fix is not obvious.
* Implementation would exceed 3L restrictions.
* A product/commercial decision appears.
* Pro-level decision is required.

## 10. Conclusion

The MVP continues under reduced-Pro operating mode. This is an operations governance decision only. No product behavior changed. No implementation was performed. Future phases must declare which tier they are using.

Result marker:

```text
MVP_OPS_MODE_1_REDUCED_PRO_DECISION_TIER_PROTOCOL_DEFINED
```
