# MVP-CONTENT-10C — Curate Controlled PAES_M1 Balanced Entry First StudyLoad

## 1. Purpose

This document records the local/dev controlled curation of the first StudyLoad for the prepared PAES_M1 target student.

The goal was to replace the fallback first-cycle StudyLoad:

Initial practice

with the intended registry-matched StudyLoad:

PAES M1 — Entrada balanceada inicial

This phase was local/dev only.

---

## 2. Background

MVP-LEARNING-2 allowed first LearningCycle creation without a completed initial diagnostic.

After creating Cycle 1 for the controlled local/dev target, the endpoint auto-created a fallback StudyLoad:

- title: Initial practice
- loadType: practice
- status: pending

This fallback behavior was not introduced by MVP-LEARNING-2. It already existed in the cycle-opening logic when no SkillStates are available.

MVP-CONTENT-10C resolved this fallback for the controlled balanced-entry flow.

---

## 3. Target Context

Student:

- Entrada Balanceada Local-M1
- entrada.balanceada.local.m1@bexauri.dev

Program:

- PAES_M1 — PAES Matemática M1

Enrollment:

- active

LearningCycle:

- Cycle 1
- status: open
- opened: 10 may 2026

Initial StudyLoad state before curation:

- title: Initial practice
- loadType: practice
- status: pending

---

## 4. Operation Performed

The fallback StudyLoad was edited through the admin UI.

Changed:

- title: Initial practice
- to: PAES M1 — Entrada balanceada inicial

Preserved:

- loadType: practice
- status: pending
- releasedAt: empty
- dueAt: empty

No duplicate StudyLoad was created.

No StudyLoad was deleted.

No status transition was performed.

---

## 5. Validation

Admin validation:

Cycle 1 shows:

- StudyLoads: 1
- title: PAES M1 — Entrada balanceada inicial
- loadType: practice
- status: pending
- Decisions: 0
- Evaluations: 0

Student `/now` validation:

The student-facing `/now` page showed:

- PAES M1 — Entrada balanceada inicial
- practice
- Ver actividad
- Empezar

Viewer pending validation:

Before pressing Empezar, Ver actividad opened the activity viewer and showed:

- PAES_M1
- PAES M1 — Entrada balanceada inicial
- Entrada balanceada inicial
- 8–12 minutos
- instructions visible
- pending guard visible:
  Primero debes iniciar esta carga desde /now para poder enviar respuestas.

This confirms the exact StudyLoad title connects to the static content registry entry:

paes_m1_balanced_entry_initial (v1)

---

## 6. Student Account Note

The student initially had a Student record but no associated User account.

A temporary local/dev user account was created to validate `/now`.

The temporary script used to create the local/dev User was deleted before documentation.

Repository custody after cleanup:

- working tree clean,
- no temporary script tracked,
- no password committed.

---

## 7. Important UX Observation

The student-facing `/now` page still exposes cycle language:

- Ciclo 1
- Abierto

This partially conflicts with MVP-LEARNING-1, which established that LearningCycles should be internal and invisible to the student.

This issue was not addressed in MVP-CONTENT-10C.

Recommended future phase:

MVP-LEARNING-3 — Remove student-facing LearningCycle language from `/now`

The preferred student-facing language should emphasize:

- current work,
- current route,
- activity available,
- progress saved,
- next step,

not internal cycle mechanics.

---

## 8. Phase Result

MVP-CONTENT-10C passed.

The controlled local/dev PAES_M1 target now has:

- Cycle 1 open,
- exactly one StudyLoad,
- StudyLoad title: PAES M1 — Entrada balanceada inicial,
- loadType: practice,
- status: pending,
- `/now` visibility confirmed,
- viewer pending guard confirmed,
- registry content connection confirmed.

No student responses were submitted.

No activity was started.

No activity was completed.

---

## 9. Non-Goals Preserved

This phase did not:

- change app code,
- change schema,
- touch production,
- deploy,
- use Abacus,
- create duplicate StudyLoads,
- delete StudyLoads,
- start the activity,
- submit responses,
- complete the StudyLoad,
- close the LearningCycle,
- create CycleDecision,
- create CycleEvaluation,
- authorize continuity.

---

## 10. Recommended Next Phase

Recommended next phase:

MVP-CONTENT-10D — Validate controlled balanced entry student execution

Scope:

- local/dev only,
- student presses Empezar,
- student answers 4 questions,
- student submits responses,
- student completes self-report,
- admin verifies evidence,
- no cycle close,
- no CycleDecision,
- no CycleEvaluation.
