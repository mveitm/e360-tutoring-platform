# MVP-SALES-PILOT-PEDAGOGY-M1-C05-FUNCIONES-LINEALES-SPLIT-CODE-1

## Purpose

Implement the approved 4+4 registry split for:

```text
M1-C05 - Funciones lineales basicas
```

The previous single registry capsule had 8 exercises and exceeded the living PAES pedagogical standard for M1/M2 capsules. This phase splits it into two registry capsules with at most 4 exercises each, preserving stems, options, correctOptionKey values, and authoredFeedback.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 211fa439876a93d06c38bd0f46ee44b0e2b9f1a2
```

Accepted prior commit:

```text
211fa43 MVP-SALES-PILOT-PEDAGOGY-M1: plan C05 Funciones lineales split
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 211fa439876a93d06c38bd0f46ee44b0e2b9f1a2
git rev-parse origin/main: 211fa439876a93d06c38bd0f46ee44b0e2b9f1a2
git rev-parse origin/HEAD: 211fa439876a93d06c38bd0f46ee44b0e2b9f1a2
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before edits.

## Source split plan

Source plan:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C05_FUNCIONES_LINEALES_SPLIT_PLAN_1.md
```

Approved recommendation:

```text
Split 4+4.
M1-C05 part I: q1-q4.
M1-C06 part II: q5-q8.
Proposed visible correlativos:
M1-C05 - Funciones lineales basicas I
M1-C06 - Funciones lineales basicas II
```

## Registry changes

Modified registry file:

```text
nextjs_space/lib/study-load-content.ts
```

Implemented changes:

```text
Former 8-item title:
PAES M1 - Funciones lineales basicas

Resulting title 1:
PAES M1 - Funciones lineales basicas I
contentKey: paes_m1_linear_functions_basic
items: q1-q4

Resulting title 2:
PAES M1 - Funciones lineales basicas II
contentKey: paes_m1_linear_functions_basic_ii
items: q5-q8
```

Instruction text and estimated time were adjusted so each resulting capsule says 4 exercises and 10-15 minutes.

No route-order or continuity file was changed in this phase.

## Resulting capsules

M1-C05 - Funciones lineales basicas I:

| item | preserved correctOptionKey | focus |
| --- | --- | --- |
| q1 | B | Evaluate `f(x) = 2x + 3` at `x = 4`. |
| q2 | B | Solve `3x - 5 = 10` from a function output. |
| q3 | A | Find slope from `(0, 2)` and `(3, 8)`. |
| q4 | C | Identify the y-intercept in `y = -2x + 6`. |

M1-C06 - Funciones lineales basicas II:

| item | preserved correctOptionKey | focus |
| --- | --- | --- |
| q5 | D | Match slope 4 and intercept -1 to `y = 4x - 1`. |
| q6 | A | Model fixed plus hourly cost as `C(h) = 1000 + 500h`. |
| q7 | B | Evaluate `f(x) = -x + 9` at `x = 3`. |
| q8 | C | Infer `y = 3x + 1` from a small linear table. |

## authoredFeedback preservation

Preserved authoredFeedback for all 8 items:

```text
briefId
completeId
version
brief
complete
```

No authoredFeedback brief or complete text was rewritten.

Preserved feedback ids and version strings:

```text
q1-q8 keep their existing paes_m1_linear_functions_basic_* ids.
q1-q8 keep version m1-c05-funciones-lineales-authored-feedback-v1.
```

This preserves the validated feedback content and avoids internal leakage.

## Pedagogical standard compliance

Applied standard:

```text
M1 maximum: 4 exercises per capsule
```

Compliance after split:

```text
M1-C05 - Funciones lineales basicas I: 4 exercises
M1-C06 - Funciones lineales basicas II: 4 exercises
```

The prior 8-item registry capsule no longer exists as a single title in the static registry.

## Scope safety

Allowed files changed:

```text
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C05_FUNCIONES_LINEALES_SPLIT_CODE_1.md
```

Not performed:

- No DB mutation.
- No UI changes.
- No API changes.
- No schema/DB/Prisma changes.
- No continuity file changes.
- No route-order file changes.
- No fixture mutation.
- No DB reset.
- No seed scripts.
- No migration.
- No browser automation.
- No API-only tests.
- No production/staging.
- No secrets printed.
- No Sales-Ready or adaptive AI claim.

## Validation

Validation status:

```text
git diff --check: passed
git status --short: only authorized files changed before commit
npm.cmd --prefix nextjs_space run build: passed
```

Static checks performed:

```text
Only authorized files changed before commit.
M1-C05 Funciones lineales basicas I has 4 items.
M1-C06 Funciones lineales basicas II has 4 items.
q1-q8 stems/options/correctOptionKey values preserved.
q1-q8 authoredFeedback preserved.
No UI/API/schema/DB/continuity/route-order files changed.
No internal leakage terms added to student-facing registry text.
```

## Result

```text
M1_C05_FUNCIONES_LINEALES_SPLIT_CODE_COMPLETED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C05-C06-FUNCIONES-LINEALES-CONTINUITY-ALIGNMENT-1
```

Purpose:

```text
Align continuity/route-order documentation or code so M1-C05 Funciones lineales basicas I leads to M1-C06 Funciones lineales basicas II, and then to the following M1 capsule. Treat any already-started local/dev 8-item M1-C05 StudyLoad as stale/mixed until an explicit local-dev data alignment phase authorizes handling it.
```
