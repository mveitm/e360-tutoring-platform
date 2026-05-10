# MVP-CONTENT-10B — Target Prep Blocked by Legacy Diagnostic Gate

## 1. Purpose

This document records the result of MVP-CONTENT-10B.

The goal was to prepare a controlled internal PAES_M1 target student for a future attachment of:

PAES M1 — Entrada balanceada inicial

This phase did not attach the StudyLoad.

It attempted to prepare the local/dev target context and discovered a blocking legacy rule.

---

## 2. Scope

Allowed:

- local/dev only,
- create or prepare controlled target student,
- create PAES_M1 enrollment if needed,
- attempt to prepare first open LearningCycle,
- no production,
- no deploy,
- no Abacus.

Not allowed:

- no production mutation,
- no app code change,
- no schema change,
- no StudyLoad creation,
- no content attachment,
- no fake diagnostic workaround,
- no bypass,
- no cycle close,
- no CycleDecision,
- no CycleEvaluation.

---

## 3. Local Target Prepared

A new controlled local/dev student was created:

- Name: Entrada Balanceada Local-M1
- Email: entrada.balanceada.local.m1@bexauri.dev
- Created: 10 may 2026

A PAES_M1 enrollment was created:

- Program: PAES_M1 — PAES Matematica M1
- Status: active
- Cycles: 0

No StudyLoad was created.

---

## 4. Blocking Condition Observed

When attempting to create the first LearningCycle, the app displayed:

A completed initial diagnostic is required before the first cycle

This blocked preparation of Cycle 1.

---

## 5. Product Interpretation

This blocking rule is now considered legacy behavior.

Recent product and learning-design decisions established that:

- the student must not be blocked by internal administrative prerequisites,
- LearningCycles are internal and invisible to the student,
- student continuity should be non-blocking,
- diagnosis should be dynamic and built progressively from student interactions,
- an initial diagnostic is useful evidence but should not be a prerequisite for beginning study.

Therefore, the current rule requiring a completed initial diagnostic before the first cycle conflicts with:

- MVP-LEARNING-1 — Invisible and non-blocking LearningCycle principle,
- the dynamic diagnosis direction,
- the balanced entry activity purpose.

The balanced entry StudyLoad itself can serve as early diagnostic evidence.

---

## 6. Decision

Do not create a fake or placeholder diagnostic to satisfy the legacy gate.

Do not bypass the rule manually in this phase.

Do not attach the balanced entry StudyLoad yet.

Document the blockage and open a future phase to reconcile first-cycle creation with the dynamic diagnosis principle.

---

## 7. Phase Result

MVP-CONTENT-10B is closed as BLOCKED.

Result:

- local controlled target student created,
- PAES_M1 enrollment created,
- first LearningCycle preparation blocked by legacy initial diagnostic gate,
- no StudyLoad created,
- no diagnostic created,
- no workaround applied,
- no production action performed.

---

## 8. Non-Goals Preserved

This phase did not:

- change app code,
- change schema,
- deploy,
- touch production,
- use Abacus,
- create the balanced entry StudyLoad,
- attach content to any student,
- create a fake diagnostic,
- open or close a LearningCycle,
- create CycleDecision,
- create CycleEvaluation,
- authorize continuity.

---

## 9. Recommended Next Phase

Recommended next phase:

MVP-LEARNING-2 — Reconcile first-cycle creation with dynamic diagnosis principle

Goal:

Remove or soften the legacy requirement that a completed initial diagnostic is required before the first LearningCycle, while preserving system integrity and allowing dynamic diagnosis through early StudyLoads such as:

PAES M1 — Entrada balanceada inicial
