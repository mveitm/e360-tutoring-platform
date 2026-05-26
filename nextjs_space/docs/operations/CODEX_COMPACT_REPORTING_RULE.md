# Codex Compact Reporting Rule

## 1. Phase

* Phase: `MVP-OPS-MODE-2`.
* Type: documentation-only operations governance.
* Baseline: `a1e4bf9`.
* No implementation authorized.
* No product behavior changed.
* `3M-A` remains paused.

## 2. Problem

* Full Codex transcripts consume too much chat context.
* Pasting long outputs can make ChatGPT, Pro, or Thinking modes overprocess irrelevant material.
* Normal audit does not require full `Get-Content` outputs, full `rg` outputs, full diffs, or repeated logs.
* The goal is to reduce cognitive and context load without losing traceability.

## 3. Decision

Every future Codex prompt must include a mandatory final section:

```text
REPORTING RULE - COMPACT OUTPUT FOR CHATGPT
```

Codex must return only the compact report required for audit.

Full transcripts are provided only if:

* There is a bug.
* There is drift.
* There is conflict.
* There is an unresolved error.
* ChatGPT explicitly requests the full transcript.

## 4. Standard compact report template

Use this base template unless a future phase defines a narrower phase-specific report:

```text
REPORTING RULE - COMPACT OUTPUT FOR CHATGPT

Do not paste the full transcript unless explicitly requested.

Return only:

PHASE REPORT - COMPACT

Phase:
Baseline before:
Preflight:
Context Gate docs read:
Technical read-only inspection:
Files changed:
Documentation summary:
Implementation summary:
Verification:
Tests/build/smoke:
Commit:
Push:
Final state:
Scope safety:
- code changed:
- DB changed:
- migrations:
- deploy:
- product behavior changed:
- runtime enforcement:
- trial activation:
- billing/subscription/payment:
- /now:
- student UI:
- admin mutation:
- repair/autocreate:
Unresolved errors:
Conclusion:
New baseline:

If an error is unresolved, include only:
- the exact command;
- the relevant error block;
- what was not completed;
- current git status.

Do not include:
- full Get-Content outputs;
- full rg outputs;
- full diffs;
- repeated git logs;
- long file contents;
- resolved transient errors unless they affected final state.
```

## 5. Phase-specific adaptation

Future prompts may adapt the compact report to the phase, but must preserve:

* Baseline before.
* Preflight result.
* Context Gate docs read.
* Files changed.
* Verification performed.
* Commit and push status.
* Final git status.
* New baseline when committed.
* Explicit scope-safety checklist.
* Unresolved errors, if any.

For documentation-only phases, omit implementation detail beyond `none`.

For implementation phases, include only the user-relevant implementation summary, not full diffs.

For smoke phases, include only non-sensitive evidence and result markers. Never paste cookies, tokens, headers, session payloads, secrets, database URLs, or raw environment values.

## 6. When full output is allowed

Full or extended output is allowed only when one of these conditions applies:

* Bug investigation requires the full command output.
* Scope drift is suspected.
* Git baseline, staged diff, or branch state conflicts.
* Tests/build/smoke fail and the failure is not resolved.
* Security/auth behavior is unclear.
* ChatGPT explicitly requests full output.

Even then, include only the relevant block, not entire unrelated transcripts.

## 7. Application to future Codex prompts

Every future Codex prompt should include the compact reporting rule at the end. This applies to:

* Documentation/readiness phases.
* Implementation microphases.
* Tests/build/smoke phases.
* Commit/push phases.
* Handoff and governance phases.

The report must be precise enough for ChatGPT to audit the phase without loading the entire Codex execution transcript.

Every future Codex prompt must also state commit/push handling explicitly:

* If commit/push is authorized, the prompt must say so and provide the expected commit message or commit-message rule.
* If commit/push is forbidden, the prompt must say `DO NOT COMMIT` and `DO NOT PUSH`.
* Compact reports must include commit status, push status, final git status, and final log top or new baseline when a commit/push occurs.
* For Codex-executed phases, Mauricio normally does not stage, commit, or push; Mauricio normally pastes the Codex compact report back to ChatGPT.
* ChatGPT remains responsible for direction/audit and remote verification when needed.
* GitHub `main` clean after push is the normal closure standard for phases where commit/push is authorized.

Prompt depth is also mandatory. Future Codex prompts must not be shortened merely because ChatGPT or Mauricio remembers context. New phases and non-trivial work require full execution prompts with baseline, scope, forbidden actions, preflight, Context Gate reads, files, validation, commit/push rules, and compact reporting. Closure-only prompts are allowed only for already-completed work where the remaining task is validated commit/push closure.

Detailed standard:

```text
nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md
```

## 8. Current operational decision

`MVP-SALES-TRIAL-3M-A` remains paused. This phase does not open implementation, does not touch an endpoint, and does not touch code.

## 9. Conclusion

`MVP-OPS-MODE-2` defines the permanent Codex compact reporting rule for future prompts. This is operations governance only. No implementation was performed and no product behavior changed.

Result marker:

```text
MVP_OPS_MODE_2_CODEX_COMPACT_REPORTING_RULE_DEFINED
```
