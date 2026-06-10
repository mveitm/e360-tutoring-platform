# MVP-SALES-PILOT-PEDAGOGY-M1-LECTURA-TABLAS-GRAFICOS-SPLIT-CODE-1

## Purpose

Implement the approved 4+4 static registry split for:

```text
Lectura de tablas y graficos
```

The prior registry entry had 8 exercises and exceeded the living M1/M2 maximum of 4 exercises per capsule.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 7a6d2e2ef3b381b1b3e82d5e426ae934e9865826
```

Accepted prior commit:

```text
7a6d2e2 MVP-SALES-PILOT-PEDAGOGY-M1: plan tables graphs split
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: 7a6d2e2ef3b381b1b3e82d5e426ae934e9865826
git rev-parse origin/main: 7a6d2e2ef3b381b1b3e82d5e426ae934e9865826
git rev-parse origin/HEAD: 7a6d2e2ef3b381b1b3e82d5e426ae934e9865826
```

`HEAD`, `origin/main`, and `origin/HEAD` were aligned before edits.

## Source split plan

Source plan:

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_LECTURA_TABLAS_GRAFICOS_SPLIT_PLAN_1.md
```

Plan result:

```text
M1_LECTURA_TABLAS_GRAFICOS_SPLIT_PLAN_READY
```

Approved strategy:

```text
Split 4+4.
Keep paes_m1_data_representation_entry for Part I.
Add paes_m1_data_representation_entry_ii for Part II.
Use M1-C07 - Lectura de tablas y graficos I.
Use M1-C08 - Lectura de tablas y graficos II.
```

## Registry changes

Modified registry file:

```text
nextjs_space/lib/study-load-content.ts
```

Implemented changes:

```text
Former PAES M1 - Lectura de tablas y graficos became:
PAES M1 - Lectura de tablas y graficos I
contentKey: paes_m1_data_representation_entry
items: q1-q4

Added:
PAES M1 - Lectura de tablas y graficos II
contentKey: paes_m1_data_representation_entry_ii
items: q5-q8
```

Instructions were updated from 8 questions to 4 questions in each resulting capsule.

## Resulting capsules

Resulting Part I:

| item | preserved correctOptionKey |
| --- | --- |
| q1 | D |
| q2 | B |
| q3 | C |
| q4 | A |

Resulting Part II:

| item | preserved correctOptionKey |
| --- | --- |
| q5 | C |
| q6 | B |
| q7 | B |
| q8 | A |

Stems and options were preserved for q1-q8.

## authoredFeedback preservation

The source entry did not contain authoredFeedback on q1-q8.

Preservation status:

```text
No authoredFeedback existed to move or preserve.
No authoredFeedback was added in this split-only phase.
No briefId, completeId, version, brief, or complete values existed on the source items.
```

Readiness implication:

```text
M1-C07/M1-C08 now comply with item-count size, but they are not ready for human feedback-quality smoke until authoredFeedback is added.
```

## Pedagogical standard compliance

The split satisfies the M1/M2 item-count maximum:

```text
M1-C07 - Lectura de tablas y graficos I: 4 exercises
M1-C08 - Lectura de tablas y graficos II: 4 exercises
```

No resulting capsule exceeds 4 exercises.

## Scope safety

Changed:

```text
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_LECTURA_TABLAS_GRAFICOS_SPLIT_CODE_1.md
```

Not changed:

- No UI files.
- No API files.
- No schema/DB/Prisma files.
- No seed scripts.
- No fixtures.
- No route-order/continuity files.
- No auth/access files.
- No package files.
- No migration files.
- No local/dev data mutation.
- No production/staging.
- No browser automation.
- No API-only tests.
- No secrets printed.

## Validation

Validation status:

```text
git diff --check: passed
git status --short: only authorized/scope-approved files changed before commit
npm.cmd --prefix nextjs_space run build: passed
```

Static checks:

```text
Only authorized/scope-approved files changed.
No resulting capsule exceeds 4 exercises.
Stems/options/correctOptionKey values were preserved.
No authoredFeedback existed before the split, and none was altered.
No UI/API/schema/DB/continuity/route-order files changed.
No student-facing internal leakage was added.
```

## Result

```text
M1_LECTURA_TABLAS_GRAFICOS_SPLIT_CODE_COMPLETED
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-C07-C08-LECTURA-TABLAS-GRAFICOS-AUTHORED-FEEDBACK-1
```

Purpose:

```text
Add authoredFeedback breve/completo to q1-q4 in M1-C07 and q5-q8 in M1-C08 before human UI smoke resumes.
```

After authoredFeedback is complete, run explicit continuity/route-order alignment and LOCAL_DEV stale-data alignment phases before smoke.
