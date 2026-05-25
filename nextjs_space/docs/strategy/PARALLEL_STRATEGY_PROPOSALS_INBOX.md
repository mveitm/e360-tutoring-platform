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

## Conclusion

This inbox preserves parallel strategic input as versioned, non-binding material.

It protects active technical phases from hidden scope changes while allowing useful external ideas to be reviewed later under the normal Context Gate and source-of-truth hierarchy.
