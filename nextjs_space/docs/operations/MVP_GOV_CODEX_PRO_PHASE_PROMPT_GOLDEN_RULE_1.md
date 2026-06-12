# MVP-GOV-CODEX-PRO-PHASE-PROMPT-GOLDEN-RULE-1

## Purpose

Fix the living golden rule for future Codex phase prompt construction: before writing a prompt, evaluate whether the work can be safely optimized by fusing phases.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 1f766674f5f96f45139486c5bd5f35636fe4dc69
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 1f766674f5f96f45139486c5bd5f35636fe4dc69
```

## Source protocol

Source protocol updated:

```text
nextjs_space/docs/operations/MVP_GOV_CODEX_PRO_DIAGNOSE_AND_REPAIR_PROTOCOL_1.md
```

Prior accepted result:

```text
CODEX_PRO_DIAGNOSE_AND_REPAIR_PROTOCOL_ACCEPTED
```

## Golden rule

Before generating a Codex phase prompt, verify whether there is a safe opportunity to fuse phases and optimize the work.

## Required pre-prompt evaluation

Every future ChatGPT/Codex handoff should explicitly or implicitly evaluate:

1. Is this task narrow and technical?
2. Is the root cause likely bounded?
3. Can diagnosis and repair be safely combined?
4. Can planning and implementation be safely combined?
5. Are stop gates clear?
6. Would fusion touch forbidden areas?
7. Does this require human/product/pedagogical decision first?

Only after this evaluation should the Codex prompt be generated.

## Allowed fused phase patterns

- DIAGNOSE-AND-REPAIR
- PLAN-AND-IMPLEMENT
- VERIFY-AND-DOCUMENT
- PATCH-AND-SMOKE-READINESS

Only when scope is narrow and stop gates are explicit.

## Required separate phase patterns

- governance decisions;
- roadmap decisions;
- pedagogical standards;
- authored-to-agentic boundary decisions;
- DB/schema/Prisma changes;
- route-order/continuity changes;
- data mutation;
- production/staging;
- ambiguous diagnosis;
- human smoke execution;
- human smoke closeout when it records external verification.

## Examples

Allowed fusion:

- completed view missing existing tableStimulus renderer;
- narrow display-only correlativo UI if source-of-truth is already safe;
- small CSS/table readability repair.

Not allowed fusion:

- deciding whether C08 is end of tutoring;
- defining PAES visual stimulus standard;
- opening agentic feedback;
- changing StudyLoad continuity;
- changing schema or fixture data.

## Relationship to future chats

Future chats must apply this golden rule before generating Codex prompts. The default should no longer be to split diagnosis and repair automatically. The default should be to optimize phase design while preserving governance and stop gates.

## Scope safety

This phase is documentation/governance only.

Not performed:

- no code changes;
- no UI changes;
- no API changes;
- no schema/DB/Prisma changes;
- no route-order/continuity changes;
- no study-load-content registry changes;
- no authoredFeedback changes;
- no DB mutation;
- no seed scripts;
- no fixtures;
- no browser automation;
- no API-only tests;
- no build;
- no production/staging;
- no agentic layer opened;
- no secrets printed.

## Result

```text
CODEX_PRO_PHASE_PROMPT_GOLDEN_RULE_ACCEPTED
```
