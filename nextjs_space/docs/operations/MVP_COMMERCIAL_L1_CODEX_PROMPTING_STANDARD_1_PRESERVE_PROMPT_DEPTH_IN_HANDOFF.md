# MVP-COMMERCIAL-L1-CODEX-PROMPTING-STANDARD-1 - Preserve Codex Prompt Depth in Handoff

## 1. Phase Identity and Scope

* Phase: `MVP-COMMERCIAL-L1-CODEX-PROMPTING-STANDARD-1`.
* Type: documentation-only governance / methodology / Codex prompt-depth standard.
* Product horizon: roadmap governance support for L1 implementation-readiness and future Codex-executed phases.
* Baseline: `HEAD = origin/main = origin/HEAD = 4eba6c6`.
* Latest accepted commit: `MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-1A: choose L1 next gate`.

This phase preserves the expected depth, structure, and safety standard for future Codex prompts. It does not implement L1 and does not change product behavior.

## 2. Baseline and Context Gate Summary

Git preflight matched the expected baseline:

* `HEAD`, `origin/main`, and `origin/HEAD` were all at `4eba6c6`.
* Working tree was clean before edits.

Required context was read from:

* `PHASE_LOG.md` recent L1 chain through `4eba6c6`.
* Current handoff.
* Codex compact reporting rule.
* Autopropagating handoff protocol v2.
* Phase Context Gate protocol.
* Living Memory Index.
* `IMPLEMENTATION-READINESS-1A`.
* `IMPLEMENTATION-READINESS-1`.

No app code inspection was performed or needed.

## 3. Problem Statement

The current ChatGPT-Codex-Mauricio methodology is now documented:

* ChatGPT directs and audits.
* Codex executes, validates, commits, and pushes when explicitly authorized.
* Mauricio normally pastes Codex compact reports back to ChatGPT.
* GitHub `main` clean after push is the closure standard.

Remaining gap:

* Future chats may understand the roadmap but generate Codex prompts that are too short.
* Roadmap context alone is insufficient for safe local execution.
* Execution prompts must carry the operational contract, including preflight, scope, non-goals, validation, commit/push rules, and compact reporting.
* If prompt depth degrades, Codex may miss guardrails even when the high-level roadmap direction is correct.

## 4. Codex Prompt Contract

Future Codex prompts should generally include:

* phase name;
* expected baseline;
* local path;
* mission;
* strict scope;
* forbidden actions;
* preflight commands;
* Context Gate docs to read;
* allowed read-only inspections;
* files to create/update;
* `PHASE_LOG.md` requirement;
* validation commands;
* commit/push authorization or explicit prohibition;
* compact reporting rule.

For implementation, DB, deploy, browser, runtime, smoke, or other higher-risk phases, the prompt must also include exact file/module scope, allowed commands, forbidden commands, secrets handling, rollback/no-go criteria, and stop rules.

## 5. Prompt Depth Rule

Use full prompts for:

* new phases;
* governance changes;
* implementation-readiness work;
* code work;
* registry work;
* DB, deploy, runtime, API, browser, test, or smoke risk;
* any phase with non-trivial scope;
* any phase where Codex may commit and push.

Use shorter closure-only prompts only when:

* the phase work is already complete;
* validation already passed or the closure prompt re-runs validation;
* the only task is staging, committing, pushing, and final Git verification;
* the closure prompt explicitly lists the allowed files and commit message.

Do not compress prompts merely because the chat remembers context. Chat memory is not an execution contract.

The prompt itself must be safe enough for Codex execution without relying on implied knowledge.

## 6. Canonical Reusable Full Codex Prompt Template

Use this reusable structure as the default for future Codex prompts:

```text
Act as a senior technical/product operator for E360 / Bexauri.

PHASE:
<phase id and title>

BASELINE EXPECTED:
HEAD = origin/main = origin/HEAD = <hash>
Latest accepted commit:
<hash> - <message>

LOCAL PATH:
C:\projects\e360-tutoring-platform\tutoring_platform_mvp

MISSION:
<plain-language mission>

STRICT SCOPE:
Allowed:
- <allowed reads/edits/commands>

Forbidden:
- <forbidden code/runtime/DB/env/app/deploy/secrets/product-use actions>

PREFLIGHT:
Run:
git status --short
git log --oneline --decorate --graph -8

If working tree is not clean, stop and report.
If HEAD/origin/main/origin/HEAD do not match expected baseline, stop and report.
Git preflight is the live truth.

CONTEXT GATE - READ FIRST:
Read:
- PHASE_LOG.md tail enough for recent chain
- <governance docs>
- <phase-specific docs>

READ-ONLY INSPECTION:
<none / exact allowed files and commands>

DOCUMENTS / FILES TO CREATE OR UPDATE:
- <exact paths>

PHASE_LOG:
Append a structured entry with:
- phase name
- date
- type
- baseline
- files changed
- docs read
- summary
- validation
- non-goals
- result marker

VALIDATION:
Run:
git diff --check
git status --short
git diff --stat

Confirm only allowed files changed.

COMMIT AND PUSH:
<explicitly authorized with exact git add paths and commit message, or explicitly forbidden>

REPORTING RULE / Compact report for ChatGPT:
Return only:
<phase-specific compact report template>
```

This template is intentionally not a historical transcript. It is a reusable execution contract.

## 7. Representative Example Reference

The latest representative full prompt pattern is:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-IMPLEMENTATION-READINESS-1A - Review L1 implementation plan and choose next technical design gate
```

Use that phase as the current reference for expected prompt depth and structure.

Do not paste the entire historical prompt into future handoffs. Reference this standard and include a fresh phase-specific prompt.

## 8. Closure-Only Prompt Rule

Closure-only prompts are allowed only when the work is already complete and the remaining task is validated commit/push closure.

A closure-only prompt must include:

* phase name;
* current expected baseline;
* statement that work is already complete;
* exact allowed changed files;
* validation commands to re-run;
* exact `git add` paths;
* exact commit message;
* push instruction;
* final verification commands;
* compact closure report template.

Closure-only prompts must not authorize content edits unless a blocking issue appears.

## 9. Future Handoff Requirement

Every future chat handoff must include a section named:

```text
Codex Prompting Standard
```

That section must include:

* expected prompt depth;
* mandatory sections;
* commit/push authorization rule;
* compact reporting requirement;
* closure-only exception.

The handoff may reference this document rather than duplicate the full standard.

## 10. Relationship to Current Methodology

This standard extends, and does not replace, the ChatGPT-Codex-Mauricio workflow from `IMPLEMENTATION-READINESS-1A`.

ChatGPT still directs and audits. Codex still executes local phases when prompted. Mauricio still normally pastes compact reports back to ChatGPT.

This document adds one rule: future Codex prompts must remain operationally complete enough to be safe.

## 11. Verification Performed

Verification for this phase:

* Git preflight matched expected baseline.
* Required docs were read.
* No app code was inspected.
* No DB, runtime, browser, API, build, test, deploy, Prisma, migration, seed, env, secret, backup, or Abacus activity occurred.
* `git diff --check`, `git status --short`, and `git diff --stat` were run after edits.
* Commit and push were authorized by the phase prompt and performed only after validation passed.

## 12. Non-Goals

This phase does not:

* edit app code;
* edit `nextjs_space/lib/study-load-content.ts`;
* create a real L1 registry entry;
* create `contentKey` or `contentVersion` implementation artifacts;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, tests, or app execution;
* inspect `.env`, database URLs, secrets, tokens, passwords, cookies, headers, raw environment values, or backups;
* approve student use;
* approve product use;
* declare L1 ready;
* declare Sales-Ready;
* use Abacus.

## 13. Result Marker

```text
MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_DEPTH_STANDARD_DEFINED
```
