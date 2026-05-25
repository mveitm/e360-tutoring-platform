# Parallel Strategy Proposals Inbox

## Status

This document is an input inbox for proposals generated in external or parallel chats.

It is not a canonical decision source.
It does not authorize implementation.
It does not change roadmap, product behavior, commercial claims, student experience, runtime behavior, schema, DB, billing, subscription, trial activation, or Sales-Ready status.

## Purpose

Capture useful parallel strategy proposals while Codex or the main development thread works on active technical phases.

The goal is to optimize waiting time without creating scope drift, conflicting instructions, or hidden roadmap changes.

## Source-of-truth hierarchy

1. Git preflight.
2. Canonical governance docs.
3. PHASE_LOG.md.
4. Accepted phase documents.
5. Smoke/build/test evidence.
6. Parallel proposal inbox.
7. Chat memory or interpretation.

## Rules for external-chat proposals

- Every proposal is non-binding.
- Every proposal must be labeled as input.
- No proposal opens a phase automatically.
- No proposal authorizes code, DB, schema, migration, deploy, trial activation, runtime enforcement, billing, subscription, payment, /now, student UI, admin mutation, or repair/autocreate.
- Every proposal requires director review before becoming a formal phase.
- Proposals that touch commercial claims, Sales-Ready, student-facing UX, trial activation, runtime enforcement, billing/payment, schema/DB, or high-risk architecture require Pro-level review when available or explicit gated review.
- External chats may help prepare strategy, options, matrices, copy candidates, operating models, and future phase proposals.
- External chats must not instruct Codex directly or override the active phase.

## Proposal entry template

```text
## Proposal YYYY-MM-DD - <title>

Source:
External chat / parallel sandbox

Mission:
<What the external chat was asked to design>

Summary:
<Brief summary>

Key proposals:
- ...

Risks:
- ...

Potential conflicts with current governance:
- ...

Reserved for Pro / high-level review:
- ...

Can advance with Thinking/Codex:
- ...

Candidate future phases:
- ...

Director review status:
Pending

Decision:
Input only. No implementation authorized.
```

## Intake rules

- Add new proposals as dated entries below this section.
- Keep entries concise enough to review without full external-chat transcripts.
- Include only non-sensitive content.
- Do not include secrets, tokens, cookies, headers, session payloads, raw env values, private credentials, or unnecessary personal data.
- If a proposal conflicts with current governance, label the conflict instead of resolving it inside the inbox.
- If a proposal becomes accepted direction, create a separate explicit phase document or PHASE_LOG entry; do not treat this inbox entry as the decision record.

## Proposal entries

No external-chat proposals are accepted or pending in this inbox at creation time.

## Proposal 2026-05-25 - MVP-COMMERCIAL-TRIAL-1: Closed-lab paid trial and subscription operating model

Source:
External chat / parallel sandbox.

Mission:
Proponer un modelo comercial-operativo para que Bexauri pueda probar cobro real en un laboratorio cerrado antes de Sales-Ready publico, sin convertir esa prueba en venta publica, sin sobreprometer y sin autorizar implementacion.

Director audit status:
Accepted as useful non-binding input.

Summary:
Bexauri may test real payment before public Sales-Ready only inside a closed, controlled, explicitly non-public commercial sandbox. The purpose is to validate commercial infrastructure and coherence between payment, access, continuity, expiry, and basic support. It does not validate a public offer, public price, market demand, or Sales-Ready status. Public Sales-Ready remains blocked until Bexauri can offer minimally effective PAES support across M1, M2, and L1.

Key proposals:
- Separate closed controlled payment from public Sales-Ready.
- Use a closed commercial sandbox with known users: Mauricio, his son, and his son's friend.
- Allow real controlled payment only to validate payment/access/continuity, not as public launch.
- Keep public Sales-Ready blocked until M1/M2/L1 are minimally operational.
- Define early subscription as limited-scope continuity, not as full PAES platform or outcome promise.
- Keep the human role as supervisor/auditor, not the mechanism that makes the app work.
- Use sober language: guided study, logical study loads, supervised development, no grandiose claims.

Candidate commercial principles:
- Closed payment is not public sale.
- Student remains the central user/customer/payer concept, subject to Pro-level review when minors are involved.
- The app must sustain the experience; human support supervises and audits.
- M1-only can support closed lab, not public Sales-Ready.
- No score guarantees, no "complete PAES" claim, no advanced AI tutor claim.

Risks:
- Confusing paid sandbox with public launch.
- Treating three known users as false market validation.
- Charging before access and continuity are coherent.
- Ethical/legal/payment risk if minors participate.
- Payment without clear access.
- Brand damage if communicated as open product.
- Human overcompensation masking product gaps.

Potential conflicts with current governance:
- Student-as-payer conflicts with minor participants and requires Pro/high-level review before real payment.
- Need to test payment soon conflicts with brand caution; proposal resolves this only by keeping the test closed and non-public.
- Trial/payment states must not imply runtime access automatically.

Reserved for Pro / high-level review:
- Final policy for payment involving minors.
- Exact threshold to accept real money.
- Public Sales-Ready definition.
- Final public commercial promise.
- Price.
- Subscription scope.
- Refund/pause policy.
- Final public copy.
- When to scale beyond known participants.

Can advance with Thinking/Codex:
- Conceptual documentation.
- Risk matrix.
- Non-binding copy candidates.
- Human supervision runbook.
- Invitation/activation criteria.
- Closed commercial sandbox checklist.
- Candidate future phases.

Candidate future phases:
- MVP-COMMERCIAL-TRIAL-1A - Version closed-lab commercial sandbox separation.
- MVP-COMMERCIAL-TRIAL-1B - Closed payment risk matrix.
- MVP-COMMERCIAL-TRIAL-1C - Invitation and activation criteria.
- MVP-COMMERCIAL-SANDBOX-1 - First paid sandbox operating runbook.
- MVP-COMMERCIAL-COPY-1 - Sober closed-lab copy.
- MVP-COMMERCIAL-SUBSCRIPTION-1 - Limited-scope subscription model.
- MVP-COMMERCIAL-SALES-READY-GATE-1 - Public M1/M2/L1 Sales-Ready gate.

Director review status:
Accepted as input.

Decision:
Input only. No implementation authorized. No payment, trial activation, runtime enforcement, billing/subscription/payment, /now, student UI, public offer, Sales-Ready claim, schema, DB, migration, or deploy authorized.

## Conclusion

This inbox preserves parallel strategic input as versioned, non-binding material.

It protects active technical phases from hidden scope changes while allowing useful external ideas to be reviewed later under the normal Context Gate and source-of-truth hierarchy.
