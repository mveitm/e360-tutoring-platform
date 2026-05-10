# MVP-CONTENT-10A — Select Controlled Internal PAES_M1 Target for Balanced Entry Attachment

## 1. Purpose

This document selects the safest target profile for a future controlled attachment of:

PAES M1 — Entrada balanceada inicial

Registry identity:

- title: PAES M1 — Entrada balanceada inicial
- contentKey: paes_m1_balanced_entry_initial
- contentVersion: v1

This phase is target-selection/readiness only.

It does not create a student.

It does not create a StudyLoad.

It does not attach content to any student.

It does not mutate data.

---

## 2. Background

Closed preparation phases established:

- MVP-CONTENT-9: the balanced entry activity should be used by default as first StudyLoad for new or early-stage PAES_M1 internal/beta students.
- MVP-CONTENT-10: the controlled attachment operation should be prepared before any mutation.

MVP-CONTENT-10A now selects the target category for that future operation.

---

## 3. Selection Criteria

A valid target for first real/internal use should satisfy:

1. PAES_M1 enrollment.
2. New or early-stage learning trajectory.
3. No sufficient recent PAES_M1 baseline evidence.
4. No advanced roadmap history that would make the activity feel backward.
5. No active focused cycle that would be interrupted.
6. Student account can access `/now`.
7. There is or can be an open internal LearningCycle.
8. The StudyLoad can be created as pending.
9. The exact title can be used:

   PAES M1 — Entrada balanceada inicial

10. Admin can verify item-level evidence after completion.
11. The operation can be documented and audited.
12. Student continuity remains non-blocking.

---

## 4. Candidate Review

### Candidate A — New controlled internal PAES_M1 student

Description:

A new internal/test/beta PAES_M1 student created or selected specifically for the balanced entry flow.

Assessment:

Best target.

Reasons:

- cleanest pedagogical fit,
- no legacy evidence conflict,
- no roadmap interruption,
- best alignment with MVP-CONTENT-9,
- best alignment with MVP-LEARNING-1,
- easy to verify end-to-end,
- low contamination risk.

Decision:

Selected target category.

---

### Candidate B — Mauricio / advanced PAES_M1 student

Description:

An existing PAES_M1 student with advanced cycle history and prior completed PAES_M1 work.

Assessment:

Not selected.

Reasons:

- already has meaningful PAES_M1 evidence,
- balanced entry may feel retroactive,
- could contaminate active advanced trajectory,
- not aligned with default first-entry purpose.

Allowed only if:

- deliberate re-baselining is explicitly required,
- there is a long pause,
- supervisor documents the reason.

Decision:

Do not use as default target.

---

### Candidate C — Ana Local-M1

Description:

Local/dev student already used to validate MVP-CONTENT-8.

Assessment:

Not selected for next attachment operation.

Reasons:

- already completed the balanced entry flow locally,
- validation purpose already fulfilled,
- reusing the same local fixture would not test target selection,
- not representative of a fresh internal target.

Decision:

Keep as validation fixture only.

---

### Candidate D — Existing beta/internal PAES_M1 student with stale evidence

Description:

A current PAES_M1 student whose baseline is incomplete, stale, or unclear.

Assessment:

Possible but not default.

Reasons:

- can be pedagogically useful,
- may support restart or second-student replication,
- but requires careful audit of existing cycle/load state.

Required before use:

- read-only audit,
- confirm active enrollment,
- confirm current cycle state,
- confirm no conflicting pending/in_progress loads,
- document reason for re-baselining.

Decision:

Allowed only after separate readiness/audit phase.

---

### Candidate E — Production student without explicit approval

Description:

Any production student selected without a dedicated approved operation.

Assessment:

Rejected.

Reasons:

- production mutation requires explicit approval,
- target choice must be auditable,
- balanced entry should not be attached casually,
- exact cycle/load context matters.

Decision:

Do not use.

---

## 5. Selected Target Category

Selected target category:

New controlled internal PAES_M1 student.

This may be:

- a new local/dev PAES_M1 fixture,
- a new internal beta PAES_M1 student,
- a deliberately prepared early-stage internal PAES_M1 account.

The target should not be an advanced student by default.

The target should not be a student already in focused roadmap progression unless there is explicit re-baselining rationale.

---

## 6. Target Status

No concrete student is selected in this phase.

Reason:

Selecting or creating a concrete student may require data mutation.

This phase only selects the target category and readiness conditions.

Concrete target selection or creation should happen in a future operation phase.

Recommended next phase:

MVP-CONTENT-10B — Prepare or create controlled internal PAES_M1 target student

Alternative if a suitable target already exists:

MVP-CONTENT-10B — Audit existing internal PAES_M1 target before balanced entry attachment

---

## 7. Required Target Properties for Future Phase

The future target should have:

- Student record.
- Matching User account if student login is required.
- PAES_M1 enrollment.
- Enrollment status: active.
- One open internal LearningCycle, or a controlled operation to open one.
- No active conflicting pending/in_progress StudyLoad.
- Ability to access `/now`.
- Ability to open viewer.
- Ability to submit responses.
- Ability to complete self-report.
- Admin access to verify evidence.

---

## 8. Required StudyLoad Attachment Fields for Future Phase

When the future attachment phase runs, it should create one StudyLoad with:

title:

PAES M1 — Entrada balanceada inicial

loadType:

practice

status:

pending

Expected registry match:

contentKey: paes_m1_balanced_entry_initial
contentVersion: v1

The title must match exactly.

---

## 9. Student Experience Goal

The student should experience the activity as a natural first step:

- one available task,
- clear instructions,
- four short questions,
- answer submission,
- evidence message,
- self-report,
- completion confirmation,
- no PAES score,
- no automatic diagnosis,
- no visible cycle mechanics.

This follows MVP-LEARNING-1:

The student learns continuously.
Bexauri regulates internally.

---

## 10. Admin Verification Goal

After future execution, admin should verify:

- target student,
- target enrollment,
- target LearningCycle,
- StudyLoad title,
- StudyLoad status,
- `/now` visibility,
- viewer content,
- answer submission,
- self-report,
- completed state,
- item-level evidence,
- contentKey paes_m1_balanced_entry_initial (v1),
- no unintended CycleDecision,
- no unintended CycleEvaluation,
- no unintended cycle closure,
- no unintended continuity authorization.

---

## 11. Risks

Main risks:

1. Attaching to the wrong student.
2. Attaching to a student already beyond entry-level.
3. Creating a StudyLoad with a title mismatch.
4. Adding the activity to a cycle with a different purpose.
5. Creating production data before approval.
6. Creating bottlenecks that contradict non-blocking continuity.
7. Treating the activity as a full diagnostic.

Mitigation:

- use a controlled new/early-stage PAES_M1 target,
- verify exact title,
- keep the StudyLoad pending,
- document all steps,
- validate `/now`,
- verify admin evidence,
- preserve human-supervised interpretation.

---

## 12. Decision

MVP-CONTENT-10A selects the target category:

New controlled internal PAES_M1 student.

It does not select a concrete existing student yet.

It rejects advanced/active students as default targets.

It allows existing stale/unclear PAES_M1 students only after a separate audit/readiness phase.

---

## 13. Phase Result

MVP-CONTENT-10A completes target-category selection for future balanced entry attachment.

Selected default target:

new controlled internal PAES_M1 student.

Recommended next step:

prepare or create the controlled target student before attaching the StudyLoad.

No data mutation was performed.

---

## 14. Non-Goals

This phase does not:

- change app code,
- change schema,
- mutate DB data,
- touch production,
- deploy,
- change endpoints,
- change UI,
- use Abacus,
- create a student,
- create a StudyLoad,
- attach content to any student,
- open or close any LearningCycle,
- create CycleDecision,
- create CycleEvaluation,
- authorize continuity.

---

## 15. Next Recommended Phase

Recommended:

MVP-CONTENT-10B — Prepare or create controlled internal PAES_M1 target student

Alternative:

MVP-CONTENT-10B — Audit existing internal PAES_M1 target before balanced entry attachment
