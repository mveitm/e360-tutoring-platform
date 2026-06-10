# MVP-GOV-PAES-CAPSULE-PEDAGOGICAL-STANDARD-1

## Purpose

Document the living pedagogical standard for PAES capsule size, exercise quality, and feedback quality in E360 / Bexauri.

This phase freezes the accepted PRO/director decision that PAES capsules must be minimal, sufficient, and closable before further smoke or agentic-layer work.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 0ac9a4ca8883552444d83612bce877aad79ac538
```

Accepted prior commit:

```text
0ac9a4c MVP-SALES-PILOT-PEDAGOGY-M1: diagnose C05 item count
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 0ac9a4ca8883552444d83612bce877aad79ac538
git rev-parse origin/main: 0ac9a4ca8883552444d83612bce877aad79ac538
git rev-parse origin/HEAD: 0ac9a4ca8883552444d83612bce877aad79ac538
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before documentation edits.

## PRO decision accepted

Direction accepted the PRO output with action:

```text
PRO_OUTPUT_ACCEPTED_WITH_ACTION
```

Accepted decisions:

```text
- Freeze M1/M2 max 4 exercises per capsule.
- Pause M1-C05 8-item smoke.
- Document pedagogical standard.
- Then plan split/repair of M1-C05.
- Do not move to agentic layer yet.
```

This standard supersedes the prior recommendation to continue M1-C05 human smoke with 8 exercises.

## Core pedagogical principle

A capsule must be:

```text
minimal, sufficient, and closable
```

It must not be so long that:

- the student leaves the task unfinished;
- fatigue increases;
- abandonment risk increases;
- the task becomes heavy to solve;
- complete feedback / step-by-step review becomes too long to realistically inspect.

It must not be so short that:

- evidence is insufficient;
- too much analysis resource is spent on very weak signals;
- each StudyLoad produces pedagogical signals that are too weak;
- continuity becomes artificially fragmented.

## M1 capsule size standard

M1 capsule size standard:

```text
ideal: 4 exercises per capsule
maximum: 4 exercises per capsule
recommended minimum: 3 exercises
exceptional minimum: 2 exercises only with explicit pedagogical justification
```

Any M1 capsule above 4 exercises is blocked for ordinary human smoke and must enter split/repair planning unless a later PRO/direction phase records an explicit exception.

## M2 capsule size standard

M2 uses the same base rule as M1:

```text
ideal: 3 or 4 exercises depending on cognitive load
maximum: 4 exercises
recommended minimum: 3 exercises
exceptional minimum: 2 exercises only with explicit pedagogical justification
```

For high cognitive-load M2 exercises, prefer 3 well-chosen exercises over 4 dense exercises if the fourth would make the capsule hard to close or review.

## L1 capsule size standard

L1 capsule size standard:

```text
recommended range: 1 to 4 answerable questions
```

L1 may use a base text with derived questions. A single well-bounded text with 1 to 4 answerable questions can be a valid capsule.

Avoid two long texts in one L1 capsule unless a PRO/direction phase records a clear pedagogical justification and the review load remains closable.

## Rule for related exercises / shared prompt

Related exercises may share a prompt, table, graph, image, context, or text if that reduces cognitive switching and improves coherence.

Shared-prompt grouping does not bypass the item-count standard:

```text
M1/M2: count each answerable exercise.
L1: count each answerable question.
```

If several questions depend on the same prompt, the total review burden must still be minimal, sufficient, and closable.

## Feedback breve standard

Each exercise/question must have feedback breve.

Standard:

```text
1 to 3 short phrases
pedagogical, clear, and concrete
not only key-check
```

Feedback breve should:

- name the task focus;
- point to the key idea or operation;
- give one concrete next review action;
- avoid internal rationale, implementation notes, source-finalization notes, key-validation notes, and inference-limit notes;
- avoid Sales-Ready, adaptive AI, mastery, theta, PAES score, or readiness claims.

## Feedback completo / paso a paso standard

Each exercise/question must have feedback completo suitable for the existing complete feedback / paso-a-paso review path.

Feedback completo must include:

- pedagogical structure;
- step-by-step development;
- explanation of why the correct answer is correct;
- typical error or caution;
- short closing reminder.

Recommended structure:

```text
1. What was being asked.
2. Central idea or formula.
3. Step-by-step development.
4. Why the correct alternative is correct.
5. Typical error or caution.
6. Brief closing: what to remember next time.
```

Complete feedback must remain readable on mobile and must not become a long lesson that the student is unlikely to review.

## Exercise formatting standard

Before implementation, each capsule must have:

- clear stems;
- coherent options;
- one defensible correctOptionKey per multiple-choice item;
- consistent notation;
- readable numbers and units;
- unambiguous wording;
- no hidden dependency on internal documentation;
- no internal rationale or leakage in student-facing text;
- estimated solving time acceptable for a closable capsule;
- estimated feedback-review time acceptable for a closable capsule.

## LaTeX and image requirement note

Some PAES exercises require images, especially geometry and statistics.

Mathematical expressions that cannot be represented well with simple text must be prepared for rendered LaTeX.

Images, diagrams, tables, graphs, and formulas must be identified during the pedagogical gate before implementation so the later UI/rendering phase can handle them intentionally.

This phase does not implement UI/rendering, LaTeX, image handling, schema, or registry changes. It only documents the standard.

## Pedagogical gate before implementation

Before implementing a capsule, it must pass a pedagogical gate that confirms:

- visible correlativo defined;
- student/admin title defined;
- contentKey defined;
- program and axis defined;
- item count validated against this standard;
- stems and options formatted correctly;
- complex mathematical expressions prepared for LaTeX rendering;
- images identified when an exercise requires them;
- correctOptionKey validated;
- authoredFeedback breve/completo per item;
- complete feedback uses pedagogical structure;
- no internal rationale or leakage;
- solving time acceptable;
- feedback-review time acceptable;
- smoke-readiness completed before UI smoke.

This gate is required before registry implementation or human UI smoke of new/repaired capsules.

## Application to M1-C05 — Funciones lineales básicas

Current target:

```text
M1-C05 - Funciones lineales basicas
contentKey: paes_m1_linear_functions_basic
```

Current state:

```text
- Shows 8 exercises.
- authoredFeedback has been implemented for q1-q8.
- Human smoke was stopped before answering.
- The prior technical diagnosis said 8 was expected according to the registry.
- PRO/direction decision: 8 exceeds the M1 standard and human smoke must not continue.
```

Decision:

```text
M1-C05 must be paused.
Do not answer or submit the 8 exercises.
Do not finalize M1-C05.
Open a later split/repair plan phase.
Resume smoke only after repair/split or after a later explicit PRO exception.
```

The prior result:

```text
M1_C05_ITEM_COUNT_DIAGNOSED_8_EXPECTED_CONTINUE_SMOKE
```

is superseded by this governance decision for operational next steps. It remains true that 8 items matched the registry; it is no longer acceptable to continue smoke because 8 exceeds the accepted pedagogical standard.

## Agentic layer hold

Do not advance to the agentic layer until these exist:

- capsule size standard;
- pedagogical feedback standard;
- exercise formatting standard;
- split criteria;
- stable visible correlativo;
- human smoke of representative capsules;
- consistency of signals per capsule.

This phase establishes the first three items and reinforces the visible correlativo dependency. Split criteria and representative smoke evidence still require later phases.

## Scope safety

This phase was documentation-only.

Not performed:

- No code changes.
- No UI/API changes.
- No schema/DB/Prisma changes.
- No registry changes.
- No continuity or route-order changes.
- No data mutation.
- No fixture mutation.
- No DB reset.
- No seed scripts.
- No migration.
- No browser automation.
- No API-only tests.
- No build.
- No production/staging.
- No secrets printed.
- No Sales-Ready or adaptive AI claim.

## Result

```text
PAES_CAPSULE_PEDAGOGICAL_STANDARD_DOCUMENTED_LIVING_REFERENCE_ADDED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-SPLIT-PLAN-1
```

Purpose:

```text
Plan the split/repair of M1-C05 - Funciones lineales basicas so it complies with the maximum of 4 exercises per M1 capsule, preserves authoredFeedback quality, and defines how visible correlativo/continuity implications should be handled before any code or smoke phase.
```
