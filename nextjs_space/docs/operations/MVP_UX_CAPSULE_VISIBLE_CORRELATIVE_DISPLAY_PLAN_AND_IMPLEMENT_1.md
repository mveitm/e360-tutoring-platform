# MVP-UX-CAPSULE-VISIBLE-CORRELATIVE-DISPLAY-PLAN-AND-IMPLEMENT-1

## Purpose

Plan and implement a narrow visible capsule correlative display for student UI, especially the open/completed capsule view and the PAES M1 study page cards.

The target student-facing format is equivalent to:

```text
M1-C07 - Lectura de tablas y graficos I
```

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = 6b0589936adc2114fa5296e076db7d472380feaa
```

## Preflight result

Preflight passed.

```text
working tree clean
HEAD = origin/main = origin/HEAD = 6b0589936adc2114fa5296e076db7d472380feaa
```

## Source documents read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_CODEX_PRO_DIAGNOSE_AND_REPAIR_PROTOCOL_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_C07_C08_TABLE_STIMULUS_HUMAN_UI_SMOKE_CLOSEOUT_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_VISIBLE_CORRELATIVE_RENUMBERING_DOC_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`

Relevant code/context search was executed across `PHASE_LOG.md`, `nextjs_space/docs`, `nextjs_space/app`, `nextjs_space/components`, and `nextjs_space/lib`.

## Triggering observation

After the C07/C08 table stimulus smoke:

- ST shows capsule counter = 10.
- Capsule UI does not show a visible capsule correlative.

The UX need is to show a stable pedagogical/product label such as `M1-C07 - Lectura de tablas y graficos I`, not a technical identifier.

## Diagnosis

The source of truth is available without DB/schema/continuity work.

Findings:

- `study-load-content.ts` has stable `contentKey` values and authored student/admin titles.
- `study-load-continuity.ts` already defines the current PAES M1 contentKey sequence.
- The desired C07/C08 correlatives can be derived display-only from existing contentKey order:
  - `paes_m1_data_representation_entry` -> `M1-C07`
  - `paes_m1_data_representation_entry_ii` -> `M1-C08`
- The open/completed capsule UI already resolves `StudyLoadContent`.
- ST M1 cards already resolve registry content by title for current/completed cards.

No DB ID, StudyLoad ID, contentKey, route-order mutation, continuity mutation, or schema field is required.

## Source-of-truth decision

The visible capsule correlative is a pedagogical/product orientation label. It is not a DB id, StudyLoad id, contentKey or cycle counter.

Decision:

```text
C) safe display-only derivation from existing static contentKey sequence, without touching route-order.
```

Implementation uses a display-only helper in `study-load-content.ts` that maps current PAES M1 content keys to visible correlatives and composes them with the authored title.

## Implementation scope

Files changed:

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/app/now/study-loads/[id]/page.tsx`
- `nextjs_space/app/study/paes-m1/page.tsx`

Implemented:

- `getStudyLoadVisibleCorrelative(content)`;
- `getStudyLoadDisplayTitle(content)`;
- header display in open/completed capsule view;
- title display in the completed/open capsule hero card;
- title display in ST M1 current capsule card;
- title display in ST M1 completed capsule review cards.

## UI change

Student UI now uses the display helper where `StudyLoadContent` is already available.

Expected examples:

```text
M1-C01 - Entrada balanceada inicial
M1-C07 - Lectura de tablas y graficos I
M1-C08 - Lectura de tablas y graficos II
```

The display is visual/orientational only. It does not affect response submission, feedback, completion, continuity, routing, content selection, or evaluation.

## What was not changed

No schema/DB/Prisma changes.
No DB mutation.
No route-order/continuity changes.
No contentKey changes.
No correctOptionKey changes.
No item count changes.
No authoredFeedback changes.
No agentic layer opened.

Additional non-actions:

- no seed or fixture changes;
- no migration changes;
- no StudyLoad state machine changes;
- no submission/evaluation API changes;
- no production/staging operation;
- no browser automation or API-only tests.

## Validation

Validation executed:

```text
git diff --check
git status --short
git log --oneline --decorate --graph -8
npm.cmd --prefix nextjs_space run build
```

Build/validation status is recorded in `CODEX_LATEST_COMPACT_REPORT.md`.

## Result

```text
CAPSULE_VISIBLE_CORRELATIVE_DISPLAY_IMPLEMENTED_DISPLAY_ONLY
```

## Next recommended phase

Recommended next phase:

```text
MVP-SALES-PILOT-UX-CAPSULE-CORRELATIVE-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Purpose:

```text
Human local/dev smoke to confirm visible correlatives appear in ST M1 and open/completed capsule views without changing flow, content, feedback, continuity or counters.
```
