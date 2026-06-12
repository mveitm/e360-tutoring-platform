# MVP-GOV-CODEX-PRO-DIAGNOSE-AND-REPAIR-PROTOCOL-1

## Purpose

Document the living operational rule for using Codex PRO capacity in future E360 / Bexauri phases.

The protocol allows diagnosis and repair to be combined in one phase when the issue is technical, narrow, reversible and low risk, with explicit stop gates.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 0e9eade5ea614d5c6c62a71c30dd198ce5cf7731
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 0e9eade5ea614d5c6c62a71c30dd198ce5cf7731
```

## Reason for protocol

Because Codex PRO is available, the project should avoid unnecessary artificial phase fragmentation for narrow technical issues. When the issue is well bounded, low-risk and reversible, a single diagnose-and-repair phase is allowed to save time and reduce operational overhead.

This protocol records a human direction that future chats should evaluate whether diagnosis and repair can safely be fused instead of defaulting to separate microphases.

## Core rule

Diagnose first.
Repair only if the root cause matches the expected narrow class.
If the cause differs, the scope expands, or the repair touches a prohibited area, STOP and document.

## Golden rule before writing Codex phase prompts

Before generating any Codex phase prompt, first evaluate whether the work can be safely optimized by fusing phases.

Default question:
Can this be safely handled as diagnose-and-repair, plan-and-implement, or another fused Codex PRO phase?

If yes, generate a fused phase with explicit stop gates.
If no, keep phases separated.

This evaluation must happen before writing the prompt, not after.

Prefer fused phases when:

- the task is technical, narrow, reversible and low-risk;
- expected target files are known;
- validation can be done with static checks/build and later human smoke;
- no DB/schema/Prisma, continuity, route-order, pedagogy, roadmap or agentic decision is involved.

Keep phases separated when:

- the task involves governance, roadmap, pedagogy, standards, DB/schema/Prisma, continuity/route-order, data mutation, production/staging, agentic behavior, ambiguous root cause, or human validation/closeout.

## When diagnose-and-repair is allowed

Allowed when all are true:

- problem is technical and narrow;
- likely target files are known;
- repair is reversible;
- no DB/schema/Prisma mutation;
- no route-order/continuity change;
- no pedagogical standard decision;
- no roadmap/product decision;
- no agentic production behavior;
- no production/staging;
- validation can be done with static checks/build and later human smoke.

## When diagnose-and-repair is forbidden

Forbidden for:

- roadmap/governance decisions;
- pedagogical standards;
- authored-to-agentic boundary decisions;
- visual stimulus standards;
- DB/schema/Prisma changes;
- route-order/continuity changes;
- data mutation or fixture reset;
- production/staging work;
- ambiguous root cause;
- changes that could affect correctOptionKey, contentKey, item count or authoredFeedback unless explicitly scoped.

## Required stop gates

Required stop gates:

```text
STOP_PRELIGHT_MISMATCH
STOP_ROOT_CAUSE_DIFFERS
STOP_SCOPE_EXPANSION_REQUIRED
STOP_FORBIDDEN_AREA_TOUCHED
STOP_DATA_MUTATION_REQUIRED
STOP_SCHEMA_OR_CONTINUITY_REQUIRED
STOP_PEDAGOGICAL_DECISION_REQUIRED
```

## Required phase structure

A diagnose-and-repair phase must include:

1. preflight;
2. documents/code read;
3. expected root cause;
4. allowed repair path;
5. stop conditions;
6. validation commands;
7. documentation report;
8. commit/push only if scope stayed safe.

The phase prompt should explicitly name the allowed files or file classes, forbidden areas, validation commands, result classifications, and final reporting contract.

## Examples allowed

- completed view missing tableStimulus renderer;
- active view and completed view using inconsistent renderer;
- narrow copy fix that does not alter product promise;
- small CSS/table readability patch;
- shared component reuse where behavior is already implemented elsewhere.

## Examples forbidden

- deciding whether C08 is end of tutoring;
- deciding authored capsule thresholds;
- opening agentic generation;
- changing StudyLoad continuity;
- mutating local/dev fixture data;
- changing schema;
- changing PAES pedagogical standard;
- changing correct answers or item count.

## Relationship to Codex PRO

Codex PRO enables larger, safer single-pass work, but does not remove governance. It allows narrow diagnosis and repair to be combined only when stop gates are explicit.

PRO capacity should be used for better context handling, cleaner scope control, and fewer unnecessary handoffs, not for bypassing preflight, human direction, prohibited areas, or validation.

## Relationship to future chats

Future chats should prefer diagnose-and-repair phases for narrow technical repair when allowed by this protocol, instead of defaulting to separate diagnosis and repair phases. Future chats must still keep governance, roadmap, pedagogy, DB/schema, continuity and agentic decisions as separate phases.

Future Codex prompts should reference this protocol when a technical issue appears narrow and reversible. If the prompt cannot express the expected root cause, allowed repair path, stop gates, and validation clearly, it should remain diagnosis-only.

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
CODEX_PRO_DIAGNOSE_AND_REPAIR_PROTOCOL_ACCEPTED
```
