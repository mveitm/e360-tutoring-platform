# MVP-LEARNING-2 — Reconcile First-Cycle Creation With Dynamic Diagnosis Principle

## 1. Purpose

This document records the MVP-LEARNING-2 change.

The goal was to reconcile first LearningCycle creation with the dynamic diagnosis principle defined in MVP-LEARNING-1.

Before this phase, the system blocked first-cycle creation unless the enrollment had a completed initial diagnostic.

That behavior conflicted with the current Bexauri learning principle:

The student learns continuously.
Bexauri regulates internally.

---

## 2. Background

MVP-CONTENT-10B discovered a legacy blocker when preparing the controlled PAES_M1 target student.

Observed blocker:

A completed initial diagnostic is required before the first cycle

This blocked first LearningCycle creation for:

- Student: Entrada Balanceada Local-M1
- Email: entrada.balanceada.local.m1@bexauri.dev
- Program: PAES_M1
- Enrollment: active
- Existing cycles: 0

The blocker was classified as legacy behavior because Bexauri now treats diagnosis as dynamic and progressively built from student interactions.

---

## 3. Source of the Blocker

The blocker lived in:

nextjs_space/app/api/learning-cycles/route.ts

Inside the POST handler, when nextCycleNumber === 1, the endpoint required:

- diagnosticType: initial
- status: completed

If no such diagnostic existed, cycle creation returned:

A completed initial diagnostic is required before the first cycle

---

## 4. Implemented Change

The blocking prerequisite was removed for the first LearningCycle.

The first-cycle branch now documents:

- first cycle supports dynamic diagnosis,
- completed initial diagnostic is no longer a blocking prerequisite,
- early StudyLoads may produce the first diagnostic evidence progressively.

The subsequent-cycle branch was preserved.

For cycles after the first one, existing requirements still apply:

- previous cycle must be closed,
- continue signal is required.

---

## 5. Files Changed

Changed:

- nextjs_space/app/api/learning-cycles/route.ts

No other app code was changed.

---

## 6. Local/Dev Validation

Technical validation:

- git diff --check passed.
- npm run build passed.
- Next.js compiled successfully.
- Type validity check passed.
- Static page generation completed successfully.

Functional validation:

A first LearningCycle was created successfully for:

- Entrada Balanceada Local-M1
- PAES_M1 enrollment
- no completed initial diagnostic

Result:

- Cycle 1 created.
- Cycle status: open.
- StudyLoads: 1.
- Auto-created fallback StudyLoad: Initial practice.
- Initial practice status: pending.
- Decisions: 0.
- Evaluations: 0.

The prior blocker no longer appeared.

---

## 7. Secondary Observation

The existing cycle-creation endpoint still auto-generates a fallback StudyLoad when no SkillStates are available:

Initial practice

This behavior was not introduced by MVP-LEARNING-2.

It should be handled separately if Bexauri wants the first open cycle for a new PAES_M1 student to receive a registry-matched StudyLoad such as:

PAES M1 — Entrada balanceada inicial

Recommended future follow-up:

- decide whether to replace, curate, or prevent the fallback Initial practice load in controlled balanced-entry flows.

---

## 8. Phase Result

MVP-LEARNING-2 passed.

The system can now create the first LearningCycle without a completed initial diagnostic.

This aligns first-cycle creation with:

- dynamic diagnosis,
- non-blocking continuity,
- invisible internal LearningCycles,
- micro StudyLoads as early evidence producers.

---

## 9. Non-Goals Preserved

This phase did not:

- change schema,
- mutate production,
- deploy,
- use Abacus,
- change student UI,
- change admin UI,
- change endpoints other than first-cycle POST logic,
- create production data,
- create a fake diagnostic,
- close a LearningCycle,
- create CycleDecision,
- create CycleEvaluation,
- authorize continuity.

---

## 10. Next Recommended Phase

Recommended next phase:

MVP-CONTENT-10C — Curate controlled PAES_M1 balanced entry first StudyLoad

Purpose:

Prepare the newly created local/dev first cycle by replacing or resolving the fallback Initial practice StudyLoad and attaching the intended exact-title StudyLoad:

PAES M1 — Entrada balanceada inicial
