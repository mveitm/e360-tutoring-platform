# MVP-CONTENT-8 — Local/dev validation for PAES M1 balanced entry StudyLoad

## 1. Purpose

This document records the local/dev validation of the registry content implemented in MVP-CONTENT-7.

The goal was to confirm that a StudyLoad with the exact title:

PAES M1 — Entrada balanceada inicial

correctly connects to the static registry entry:

paes_m1_balanced_entry_initial

and works through the student-facing `/now` and `/now/study-loads/[id]` flow.

---

## 2. Scope

MVP-CONTENT-8 was a local/dev operational validation.

Allowed:

- Use local/dev app.
- Use local/dev database.
- Use existing local student Ana Local-M1.
- Create one local StudyLoad.
- Start the local StudyLoad as student.
- Submit local answers.
- Complete local self-report.
- Confirm admin evidence.

Not allowed / not performed:

- No production change.
- No deploy.
- No schema change.
- No app code change.
- No endpoint change.
- No UI change.
- No Abacus.
- No secrets.
- No real student data.
- No production DB mutation.

---

## 3. Local Context

Local student:

- Ana Local-M1
- ana.local.m1@bexauri.dev

Program/enrollment:

- PAES_M1
- PAES Matematica M1
- Enrollment active

Cycle:

- Cycle 1
- Status: open
- Opened: 07 may 2026

Initial cycle state before this validation:

- Total loads: 1
- Completed loads: 1
- Existing completed load: PAES M1 — Funciones lineales basicas
- Decisions: 0
- Evaluations: 0

---

## 4. Created Local StudyLoad

A new local/dev StudyLoad was created inside Ana Local-M1 / PAES_M1 / Cycle 1.

Title:

PAES M1 — Entrada balanceada inicial

Status at creation:

pending

Type:

practice

Created:

08 may 2026, 05:59 p. m.

The exact title matched the registry key added in MVP-CONTENT-7.

---

## 5. Student `/now` Validation

The student-facing `/now` page showed the new load under pending loads:

- PAES M1 — Entrada balanceada inicial
- practice
- Ver actividad
- Empezar

This confirmed that the local StudyLoad was visible to the student workflow.

---

## 6. Pending Viewer Validation

Before pressing Empezar, the viewer displayed the registry content header and instructions:

- PAES_M1
- PAES M1 — Entrada balanceada inicial
- practice
- Entrada balanceada inicial
- 8–12 minutos
- Instructions visible

The viewer also showed the expected guard:

Primero debes iniciar esta carga desde /now para poder enviar respuestas.

This confirmed that the registry content was found even while the StudyLoad was pending, and that response submission remained gated until start.

---

## 7. Started Viewer Validation

After pressing Empezar from `/now`, the viewer displayed:

- 0 de 4 respondidas
- Ejercicios (4)
- Enviar respuestas

The 4 expected items were visible:

1. Discount of 20% on $15.000.
2. Bicycle rental fixed-plus-variable cost expression.
3. Rectangle area with dimensions 8 m and 5 m.
4. Probability of drawing a blue ball from 3 red and 2 blue balls.

This confirmed that the registry entry rendered correctly after the StudyLoad moved to in_progress.

---

## 8. Response Submission Validation

The student selected the expected correct answers:

- q1: C
- q2: B
- q3: C
- q4: B

After pressing Enviar respuestas, the app showed:

- Respuestas guardadas.
- Respondiste 4 de 4 ejercicios.
- This result is only activity evidence, not a PAES score or automatic advancement decision.

This confirmed that the answer key worked and that the anti-overdiagnosis message appeared.

---

## 9. Completion Validation

The student selected:

Me fue bien

Then finalized the activity.

The `/now` page showed:

- Actividad registrada.
- PAES M1 — Entrada balanceada inicial under completed work.
- Tu reporte: Me fue bien.

This confirmed the student completion flow.

---

## 10. Admin Evidence Validation

The admin cycle detail showed:

- Total loads: 2
- Completed loads: 2
- Indicator: All loads completed

For PAES M1 — Entrada balanceada inicial:

- Status: completed
- Autorreporte: Me fue bien
- Estado: Respuestas enviadas
- Respondidas: 4 de 4
- Correctas: 4 de 4
- Fecha de envio: 08 may 2026, 06:04 p. m.
- Contenido: paes_m1_balanced_entry_initial (v1)

Item evidence:

| Item | Student answer | Correct answer | Result |
|---|---|---|---|
| q1 | C | C | Correcta |
| q2 | B | B | Correcta |
| q3 | C | C | Correcta |
| q4 | B | B | Correcta |

This confirmed that admin-side evidence is recorded and displayed correctly.

---

## 11. Phase Result

MVP-CONTENT-8 passed.

Validated chain:

registry content -> local StudyLoad -> /now visibility -> pending viewer guard -> start -> item rendering -> response submission -> self-report -> completion -> admin evidence

---

## 12. Final Notes

The validation was performed in local/dev only.

No production action was performed.

No deploy was performed.

No schema, endpoint, or UI change was performed.

No real student data was touched.

Recommended next phase:

MVP-CONTENT-9 — Decide operational path for attaching PAES M1 balanced entry to beta/internal student flow
