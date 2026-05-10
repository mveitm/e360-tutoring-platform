# MVP-CONTENT-10 — Controlled PAES M1 Balanced Entry Attachment Preparation

## 1. Purpose

This document prepares the controlled internal operation for attaching the PAES M1 balanced entry activity:

PAES M1 — Entrada balanceada inicial

Registry identity:

- title: PAES M1 — Entrada balanceada inicial
- contentKey: paes_m1_balanced_entry_initial
- contentVersion: v1

This phase does not attach the activity to any student.

It defines the operational conditions, target profile, required fields, verification checklist, and guardrails for a future controlled attachment operation.

---

## 2. Background

Previous closed phases established the foundation:

- MVP-CONTENT-5 defined the PAES M1 item blueprint.
- MVP-CONTENT-6 defined the 4-item balanced entry set.
- MVP-CONTENT-7 implemented the set in the static StudyLoad registry.
- MVP-CONTENT-8 validated the full local/dev flow.
- MVP-LEARNING-1 defined invisible and non-blocking LearningCycles.
- MVP-CONTENT-9 decided that this activity should be used by default as the first StudyLoad for new or early-stage PAES_M1 students.

MVP-CONTENT-10 prepares the next operation without executing it.

---

## 3. Operational Decision From MVP-CONTENT-9

Default use case:

The balanced entry activity should be used as the first StudyLoad for new or early-stage PAES_M1 internal/beta students.

Secondary use case:

It may be used for an existing PAES_M1 student only with supervised justification, such as:

- stale baseline evidence,
- incomplete baseline,
- deliberate re-baselining,
- restart after pause,
- unclear initial evidence.

Not recommended as default:

- attaching retroactively to advanced students,
- interrupting focused roadmap work,
- using it as a generic extra exercise,
- using it as a PAES score proxy,
- using it as an automatic diagnostic.

---

## 4. Candidate Target Profile

The cleanest target for the future attachment operation is:

- a new PAES_M1 internal/beta student,
- active enrollment,
- no prior meaningful PAES_M1 evidence,
- open LearningCycle or controlled plan to open one,
- no active conflicting StudyLoad,
- student account ready,
- `/now` access verified,
- supervisor/admin able to verify evidence after completion.

This avoids contaminating advanced student trajectories and keeps the activity aligned with its purpose: first balanced evidence.

---

## 5. Not Recommended Target Profile

Avoid attaching this StudyLoad by default to:

- Mauricio or another advanced PAES_M1 student with several completed cycles,
- a student currently progressing through a focused algebra/functions roadmap,
- a student with recent sufficient baseline evidence,
- a student whose current cycle already has a different clear pedagogical purpose,
- any production student without explicit operation approval,
- any case where exact title matching cannot be guaranteed.

---

## 6. Required StudyLoad Fields

The future operation should create or attach exactly one StudyLoad with these fields:

Title:

PAES M1 — Entrada balanceada inicial

loadType:

practice

status:

pending

program:

PAES_M1

contentKey expected by registry:

paes_m1_balanced_entry_initial

contentVersion expected:

v1

The title must match exactly because the current static registry is keyed by StudyLoad title.

---

## 7. Required Context Before Attachment

Before the operation, confirm:

1. Target student exists.
2. Target student email is correct.
3. Student has a matching user account if `/now` access is required.
4. Student has active PAES_M1 enrollment.
5. Target LearningCycle exists and is open, or the operation explicitly includes opening a new internal cycle.
6. There is no active conflicting pending/in_progress StudyLoad.
7. The operation will not close any LearningCycle.
8. The operation will not create CycleDecision.
9. The operation will not create CycleEvaluation.
10. The operation will not authorize continuity.
11. The operation will not deploy code.
12. The operation will not mutate production unless explicitly approved.

---

## 8. Preferred Operation Path

Preferred path for future execution:

1. Choose or create target PAES_M1 internal/beta student.
2. Verify student account and `/now` access.
3. Verify active PAES_M1 enrollment.
4. Verify or create internal open LearningCycle if needed.
5. Create one StudyLoad:
   - title: PAES M1 — Entrada balanceada inicial
   - loadType: practice
   - status: pending
6. Student opens `/now`.
7. Student starts activity.
8. Student submits answers.
9. Student completes self-report.
10. Admin verifies evidence.
11. Supervisor uses evidence to plan next StudyLoad or next internal cycle.

---

## 9. Student-Facing Expected Experience

The student should experience:

- one available activity,
- clear short instructions,
- four questions,
- answer submission,
- evidence message,
- self-report,
- completion confirmation,
- continuity.

The student should not experience:

- cycle numbers,
- cycle closure,
- internal decision mechanics,
- administrative waiting,
- PAES score estimate,
- automatic diagnostic label,
- pressure to perform perfectly.

This follows MVP-LEARNING-1:

The student learns continuously.
Bexauri regulates internally.

---

## 10. Admin Verification Checklist

After future execution, admin should verify:

- StudyLoad exists with exact title.
- StudyLoad appears in the intended LearningCycle.
- StudyLoad status begins as pending.
- Student `/now` shows the StudyLoad.
- Viewer displays the registry content.
- Pending guard appears before start.
- After start, viewer shows 4 items.
- Response submission succeeds.
- Self-report completion succeeds.
- StudyLoad becomes completed.
- Admin evidence shows:
  - Estado: Respuestas enviadas
  - Respondidas: 4 de 4
  - Correctas: expected count according to submitted answers
  - Contenido: paes_m1_balanced_entry_initial (v1)
  - q1/q2/q3/q4 item-level results
- No CycleDecision was created automatically.
- No CycleEvaluation was created automatically.
- No LearningCycle was closed automatically.
- No continuity signal was created unless explicitly intended.

---

## 11. Rollback / Cleanup Notes

For local/dev:

If the operation is only a local/dev test, cleanup may be acceptable by deleting the created test StudyLoad or resetting the local fixture, if that is part of the local workflow.

For production:

Do not delete or mutate evidence casually.

If a production attachment is made by mistake:

1. Stop further workflow.
2. Document the issue.
3. Do not hide the mutation.
4. Prefer correction through documented admin operation.
5. Preserve auditability where possible.
6. Do not use direct DB changes unless a dedicated recovery phase explicitly authorizes it.

---

## 12. Production Guardrails

Production attachment requires explicit approval.

Before production use:

- confirm target student,
- confirm target enrollment,
- confirm target cycle,
- confirm exact title,
- confirm no conflicting loads,
- confirm student access,
- confirm admin verification path,
- confirm rollback/correction plan,
- confirm no deploy is needed,
- confirm no secrets are exposed.

Production mutation must not be bundled with unrelated code or schema changes.

---

## 13. Suggested Future Phase

Recommended next phase:

MVP-CONTENT-11 — Execute controlled PAES_M1 balanced entry attachment for selected internal student

However, this should only happen after selecting a target student and environment.

Possible safer intermediate phase:

MVP-CONTENT-10A — Select target internal PAES_M1 student for balanced entry attachment

This would keep target selection separate from mutation.

---

## 14. Phase Result

MVP-CONTENT-10 prepares the controlled operation for attaching PAES M1 — Entrada balanceada inicial to an internal/beta PAES_M1 student.

It confirms that the preferred future path is:

new or early-stage PAES_M1 student
-> active enrollment
-> open internal LearningCycle
-> pending StudyLoad with exact title
-> student `/now`
-> response evidence
-> self-report
-> admin verification
-> supervised next-step planning

No attachment is performed in this phase.

---

## 15. Non-Goals

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
- attach content to any student,
- open or close any LearningCycle,
- create CycleDecision,
- create CycleEvaluation,
- authorize continuity.

---

## 16. Next Recommended Step

Before executing an attachment, select the target student and environment.

Recommended next step:

MVP-CONTENT-10A — Select controlled internal PAES_M1 target for balanced entry attachment
