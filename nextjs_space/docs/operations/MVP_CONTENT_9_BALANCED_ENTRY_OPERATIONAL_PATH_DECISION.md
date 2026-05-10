# MVP-CONTENT-9 — Balanced Entry Operational Path Decision

## 1. Purpose

This document defines the recommended operational path for using the PAES M1 balanced entry activity:

PAES M1 — Entrada balanceada inicial

Registry identity:

- title: PAES M1 — Entrada balanceada inicial
- contentKey: paes_m1_balanced_entry_initial
- contentVersion: v1

This phase is a decision/readiness phase only.

It does not attach the activity to any real or production student.

---

## 2. Background

The PAES M1 balanced entry activity has already passed the following path:

- MVP-CONTENT-4: proposed the balanced entry activity.
- MVP-CONTENT-5: defined the PAES M1 item blueprint.
- MVP-CONTENT-6: defined the 4-item balanced entry item set.
- MVP-CONTENT-7: implemented the content in the static registry.
- MVP-CONTENT-8: validated the full local/dev flow with Ana Local-M1.
- MVP-LEARNING-1: defined invisible and non-blocking LearningCycles.

The local/dev validation confirmed:

- the exact StudyLoad title connects to the registry,
- `/now` shows the StudyLoad,
- the viewer renders the content,
- pending guard works,
- start works,
- response submission works,
- self-report works,
- completion works,
- admin evidence shows 4/4 answered and 4/4 correct.

---

## 3. Product Principle

The balanced entry activity should be used as a first low-stakes evidence signal.

It is not:

- a PAES score,
- a full diagnostic,
- a final placement test,
- an automatic adaptive decision,
- a mastery certification,
- a replacement for human review.

It is:

- a short first-contact activity,
- one item per PAES M1 axis,
- a way to observe initial evidence,
- a safe bridge into the SRA,
- a basis for supervised next-step planning.

---

## 4. LearningCycle Principle Applied

This decision must respect MVP-LEARNING-1.

The student should not experience LearningCycles directly.

The student should only see:

- what to do now,
- the available activity,
- progress saved,
- feedback or evidence message,
- next available work.

The SRA/supervisor may internally use LearningCycles to group evidence and decide next steps.

Short principle:

The student learns continuously.
Bexauri regulates internally.

---

## 5. Candidate Operational Paths

### Option A — Keep local/dev only for now

Description:

The activity remains implemented in the registry and validated locally, but is not attached to beta/internal students yet.

Pros:

- zero production risk,
- no beta data mutation,
- preserves current student flows,
- useful if product direction is still uncertain.

Cons:

- no real internal beta evidence,
- delays learning from actual student use,
- registry content remains unused in beta flow.

Assessment:

Safe, but too conservative after successful local validation.

---

### Option B — Use as first StudyLoad for a new PAES_M1 internal student

Description:

When a new internal/beta PAES_M1 student is created, attach this StudyLoad as the first visible activity in the first open LearningCycle.

Recommended title:

PAES M1 — Entrada balanceada inicial

Recommended status:

pending

Recommended loadType:

practice

Pros:

- pedagogically clean,
- matches the activity purpose,
- avoids retrofitting into advanced cycles,
- gives balanced initial evidence,
- aligns with invisible/non-blocking LearningCycle principle,
- easy to explain operationally.

Cons:

- requires a controlled local/dev or production operation when a new student is created,
- requires exact title matching,
- needs admin verification after creation.

Assessment:

Recommended path.

---

### Option C — Attach to an existing beta/internal student with stale or incomplete PAES_M1 evidence

Description:

Use the balanced entry activity for an existing PAES_M1 student if their evidence is stale, incomplete, or not representative.

Pros:

- can repair weak baseline evidence,
- useful for second-student replication,
- may help restart a paused or unclear trajectory.

Cons:

- may conflict with existing cycle history,
- may feel backward if the student already completed more advanced work,
- requires careful human decision.

Assessment:

Allowed only with supervised justification.

---

### Option D — Attach to Mauricio or another advanced/active student in a future cycle

Description:

Use the activity for a student who already has several PAES_M1 cycles and evidence.

Pros:

- could provide cross-axis snapshot,
- may be useful after a long pause or reset.

Cons:

- not ideal as normal next step for an already progressing student,
- may duplicate prior evidence,
- may disrupt the active learning trajectory.

Assessment:

Not recommended as default.

Only use if the goal is a deliberate re-baselining or post-pause orientation.

---

### Option E — Attach immediately in production to an existing beta student

Description:

Create the StudyLoad directly in production for an existing beta/internal student.

Pros:

- fastest real-world use.

Cons:

- skips readiness decision,
- risks placing a first-entry activity in the wrong cycle,
- may mutate production before the operational rule is clear.

Assessment:

Not recommended as the next immediate step.

---

## 6. Recommended Decision

Recommended path:

Option B — Use PAES M1 balanced entry as the first StudyLoad for a new PAES_M1 internal/beta student.

Secondary allowed path:

Option C — Use for an existing PAES_M1 student only if there is a clear supervised reason, such as stale evidence, incomplete baseline, or deliberate restart.

Not recommended as default:

- attaching retroactively to Mauricio advanced cycles,
- attaching to students already progressing through a focused roadmap,
- production mutation before a controlled operation plan.

---

## 7. Operational Rule

The balanced entry activity should be attached when all conditions are true:

1. The student is in PAES_M1.
2. The student is new, early-stage, or intentionally being re-baselined.
3. There is an open LearningCycle or a controlled plan to open one.
4. The StudyLoad title can be set exactly as:

   PAES M1 — Entrada balanceada inicial

5. The StudyLoad can be created as:

   - loadType: practice
   - status: pending

6. The student can access `/now`.
7. The student can start, submit responses, and complete self-report.
8. Admin can verify item-level evidence.

---

## 8. Operational Anti-Patterns

Do not use this activity when:

- the student already has sufficient recent baseline evidence,
- the student is in the middle of a focused advanced cycle,
- attaching it would block the student's visible continuity,
- the cycle purpose is unrelated,
- the title cannot be matched exactly,
- the operator cannot verify admin evidence,
- production mutation is being done without an operation phase.

---

## 9. Recommended Next Operation

Recommended next phase:

MVP-CONTENT-10 — Prepare controlled internal PAES_M1 balanced entry attachment

Scope recommendation:

- readiness/operation planning first,
- local/dev or clearly controlled environment,
- no production mutation unless explicitly approved,
- define target student,
- define target enrollment,
- define target LearningCycle,
- define StudyLoad fields,
- define verification checklist,
- document rollback/cleanup if local/dev.

Possible target:

A new PAES_M1 internal student is the cleanest candidate.

Avoid using Mauricio as default target because Mauricio already has advanced PAES_M1 cycle history.

---

## 10. Production Readiness Notes

Before production use, confirm:

- exact title matching,
- current StudyLoad creation UI/API supports the required title and pending status,
- target student has correct PAES_M1 enrollment,
- target LearningCycle is open,
- no unintended CycleDecision is created,
- no CycleEvaluation is created automatically,
- no LearningCycle is closed automatically,
- no continuity authorization is triggered,
- student can continue from `/now`,
- admin can verify evidence.

---

## 11. Phase Result

MVP-CONTENT-9 decides that PAES M1 — Entrada balanceada inicial should become the first balanced evidence activity for new or early-stage PAES_M1 internal/beta students.

It should not be attached retroactively by default to advanced students or cycles already progressing through a focused roadmap.

The recommended next step is not immediate production mutation, but a controlled attachment operation/readiness phase.

---

## 12. Non-Goals

This phase does not:

- change app code,
- change schema,
- mutate DB data,
- touch production,
- deploy,
- change endpoints,
- change UI,
- use Abacus,
- create a StudyLoad,
- attach content to any real student,
- open or close any LearningCycle.

---

## 13. Next Recommended Phase

MVP-CONTENT-10 — Prepare controlled internal PAES_M1 balanced entry attachment
