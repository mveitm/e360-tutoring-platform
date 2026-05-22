# Autopropagating Handoff Protocol v2

## 1. Purpose

This protocol governs how context is transferred between chats and agents so every future session can recover:

* Git truth.
* Canonical governance docs.
* Living Memory Index.
* Active roadmap and product horizon.
* Active blockers.
* Missing context.
* Superseded decisions.
* Next allowed phase.
* Explicit non-goals.

This document is not the current handoff. It is the protocol for generating, validating, and re-ingesting handoffs.

## 2. Relationship to Existing Governance Docs

Future chats and agents must read these governance sources before relying on a handoff:

* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`: read before classifying product horizon, commercial promise, Sales-Ready status, or roadmap change-control need.
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`: read before design, implementation, verification, or commit of any future phase.
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`: read during context transfer to locate current living decisions, blockers, missing context, and superseded/historical decisions.
* `PHASE_LOG.md`: read for phase history, baselines, verification evidence, custody corrections, and final verdicts.

If a handoff conflicts with Git preflight or canonical governance docs, Git preflight and canonical governance docs win.

## 3. Core Principle

A handoff is not a memory dump. A handoff is a controlled context capsule that must be:

* Git-anchored.
* Horizon-aware.
* Phase-gated.
* Roadmap-aware.
* Commercially safe.
* Student-experience aware.
* Explicit about missing context.
* Explicit about what is forbidden.

No handoff may depend on chat memory alone.

## 4. Handoff Lifecycle

### A. Before Creating a Handoff

Before creating a handoff, the producing chat or agent must:

* Verify Git state.
* Confirm the working tree is clean or explicitly describe uncommitted work.
* Confirm the latest accepted commit.
* Read the governance docs.
* Read the Living Memory Index.
* Identify the next intended phase or the current pause state.

### B. During Handoff Creation

The handoff must include:

* Baseline.
* Current horizon.
* Current blockers.
* Active decisions.
* Superseded decisions.
* Missing product/UI/brand docs.
* Next recommended phase.
* Hard non-goals.
* Exact preflight commands required for the receiving chat.

### C. At Receiving Chat Start

The receiving chat or agent must:

* Run Git preflight first.
* Compare actual Git state to the handoff.
* Treat Git as the truth if there is a mismatch.
* Read governance docs and the Living Memory Index.
* Complete the Context Gate before any new phase.

### D. After Closing a Phase

After closing a phase:

* Update `PHASE_LOG.md`.
* Update relevant governance, index, or handoff documents only if they are explicitly in scope.
* Commit and push only after review and explicit approval.
* Run post-push verification when a push is performed.
* If handoff-bearing docs changed, generate or update the next handoff only when explicitly scoped.

## 5. Required Handoff Capsule Template

---BEGIN HANDOFF CAPSULE TEMPLATE---

Project:
Current repo path:
Expected Git baseline:
Latest accepted commit:
Working tree expected:
Current product horizon:
Current roadmap block:
Canonical docs to read first:
Recent phase docs to read:
Living Memory summary:
Active strategic decisions:
Active commercial non-goals:
Active student-experience direction:
Current technical blockers:
Current missing context:
Superseded/historical decisions:
Next recommended phase:
Explicit non-goals for next phase:
Required preflight commands:
Context Gate requirement:
Stop rules:
Expected first response from receiving agent:

---END HANDOFF CAPSULE TEMPLATE---

## 6. Required First Response From Receiving Agent

The receiving chat or agent must not immediately implement. Its first response must include:

* Confirmation of the expected baseline.
* Strategic reading of the situation.
* Context gaps or contradictions.
* Whether it has enough context to proceed.
* Proposed next phase, if any.
* No code or implementation unless explicitly authorized and the Context Gate passes.

## 7. Required Preflight Commands

Every handoff must require:

* `git status --short`
* `git log --oneline --decorate --graph -8`

The handoff may also require document reads such as:

* `Get-Content PHASE_LOG.md -Tail N`
* `Get-Content nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`
* `Get-Content nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`
* `Get-Content nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`
* `Get-Content <relevant phase docs>`

## 8. Autopropagation Rule

Every handoff-producing phase must include enough context for the next chat or agent to reconstruct:

* Where the project is.
* What is true.
* What is uncertain.
* What is prohibited.
* What comes next.
* What must be verified locally.

No handoff may rely on "as discussed above" or unversioned chat memory without summarizing the needed content.

## 9. Missing Context Handling

If product/UI/brand docs are referenced but unavailable:

* The handoff must name them.
* The handoff must say whether they are versioned or missing.
* Future product/UI/brand/public-offer phases must request them or a fresh synthesis before closing.
* Narrow governance or readiness phases may proceed only if they explicitly record the gap.

The currently known critical product/UI/brand context files are:

* `Mvp Ui Flow 1 Secuencia Canonica Bexauri Cierre Dia.docx`
* `MVeit-Bexauri-Definicion de Producto.docx`
* `Bexauri_Guia_Identidad_Visual_v1_1.docx`

## 10. Handoff Update Triggers

A new or updated handoff is required when:

* Baseline commit changes after a major phase.
* Product horizon changes.
* Roadmap block changes.
* Current blocker changes.
* Next recommended phase changes.
* Canonical governance docs change.
* Living Memory Index changes.
* Current agent handoff becomes stale.
* A chat is becoming too long or unreliable.

## 11. Handoff Quality Checklist

A complete handoff must include:

* Git baseline present.
* Preflight commands present.
* Canonical docs listed.
* Living Memory Index listed.
* Product horizon stated.
* Roadmap block stated.
* Active decisions stated.
* Superseded/historical decisions stated.
* Missing context stated.
* Commercial non-goals stated.
* Student experience direction stated.
* Next phase stated.
* Explicit non-goals stated.
* Stop rules stated.
* No secrets included.
* No raw environment values.
* No passwords.
* No tokens.
* No unnecessary private data.

## 12. Boundaries and Safety

Handoffs must not include:

* Secrets.
* `.env` contents.
* Database URLs.
* Passwords.
* API keys.
* Tokens.
* Personal data beyond what is operationally necessary.
* Instructions that bypass Git preflight.
* Instructions that bypass Context Gate.
* Unreviewed implementation authority.

## 13. Non-Goals

This protocol does not:

* Generate the current handoff.
* Update `CURRENT_AGENT_HANDOFF_MVP_M1.md`.
* Update `DOCUMENTATION_INDEX_MVP_M1.md`.
* Update `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`.
* Create a zip.
* Classify every document.
* Fix 3C.
* Change runtime behavior.
* Change student UI.
* Change commercial promise.
* Change DB, schema, or code.
* Authorize implementation.

## 14. Required Future Use

Future handoff phases must use this protocol.

`MVP-GOV-CONTEXT-15` should use this protocol when updating the current agent handoff with Context Gate.

Any new-chat prompt should be generated using this protocol once it is accepted.
