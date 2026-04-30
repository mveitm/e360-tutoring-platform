# FL-2 — Beta Participant Readiness and First Session Plan

> Operational planning document for the first real assisted closed beta session.
> This phase does not modify code, schema, endpoints, data, or deployments.

---

## 1. Current Readiness Baseline

| Phase | Status | Summary |
|---|---|---|
| FH | ✅ Live | Student weekly flow — `/now` renders pending/in-progress/completed loads with instructions |
| FI | ✅ Live | Admin Beta Operations dashboard — `/admin/beta-operations` |
| FJ | ✅ Live | Self-report visibility — "Autorreporte" text visible in admin cycle detail |
| FK | ✅ Documented | Beta Launch Protocol — selection criteria, onboarding checklists, decision framework |
| FL-0 | ✅ Passed | Readiness gate — deployment verified, FJ features confirmed live |
| PRE-FL | ✅ Passed | `/now` linkage solved — User→Student→Enrollment→Cycle→StudyLoad chain validated |
| FL-1 | ✅ Passed | Manual decision dry run — full MVP loop validated with Test Now |

**Validated MVP loop:**
```
Student task → Empezar → Terminar → Self-report → Admin evidence visibility → Manual decision → Traceability
```

---

## 2. Purpose of FL-2

FL-2 prepares the first real assisted beta session with a genuine participant. It defines:

- Who participates
- What task they receive
- How they are onboarded
- What the admin does before, during, and after
- What feedback is collected
- What decision criteria apply
- When to pause or stop

**FL-2 does not execute the session.** It produces the plan that FL (execution) will follow.

---

## 3. Participant Selection Criteria

The first 1–2 participants must meet **all** of the following:

- Known or trusted by the tutor/operator (not a cold contact)
- Preparing for PAES or willing to simulate PAES preparation
- Willing to give honest feedback about the experience
- Comfortable using a beta system that may have rough edges
- Understands this is not a finished commercial product
- Has access to a device with a browser and internet
- Available for a 30–45 minute session within the planned window

**Program priority:**
1. **PAES M1** — first participant (taxonomy already seeded, dry run validated on M1)
2. **PAES L1** — second participant, only if M1 onboarding was smooth
3. **PAES M2** — wait unless operationally simple to add

---

## 4. Recommended First Participant Profile

| Attribute | Recommendation |
|---|---|
| Count | **1 student only** — not 2–5 immediately |
| Program | PAES M1 |
| Topic | Short algebra-oriented task |
| Onboarding | Assisted via WhatsApp or live call |
| Admin posture | Actively monitoring `/admin/beta-operations` during and after |

Starting with one student reduces operational risk and allows focused observation of the full loop before scaling.

---

## 5. First Session Objective

The first session objective is **not** to prove score improvement.

The objective is to prove that:

1. A real student can understand the assigned task
2. The student can complete it independently
3. The student can report how it went via the platform
4. The admin can see the evidence
5. The admin can make a human pedagogical decision based on the evidence
6. The experience feels clear, respectful, and useful to the student

**Success = a student who felt the experience was understandable and worth repeating.**

---

## 6. First Study Load Design

The first real study load should follow this template:

| Field | Value |
|---|---|
| **PAES area** | Álgebra |
| **Topic/Skill** | Ecuaciones lineales básicas |
| **Title** | `PAES M1 — Practicar ecuaciones lineales básicas` |
| **loadType** | `practice` |
| **Status** | `pending` (created by admin before session) |

**Student-facing instruction** (communicated via onboarding message, not rendered in-app yet):

> "Resuelve una actividad breve de ecuaciones lineales. Puedes usar tu cuaderno, un libro de ejercicios, o una guía en línea. Al terminar, vuelve a la plataforma y cuéntanos cómo te fue."

**Estimated time:** 20–30 minutes

**Success expectation:** The student attempts the activity and returns to the platform to submit a self-report. Perfect answers are not required.

**Self-report prompt:** The existing self-report flow will capture the student's response (e.g., "Me fue bien", "Me costó", "No pude hacerlo").

**Scoring:** No automated scoring is required. The admin reviews the self-report and makes a manual pedagogical decision.

---

## 7. Onboarding Message Draft

**For the first beta participant (Spanish):**

> Hola [nombre],
>
> Te invitamos a probar Bexauri, una plataforma de preparación PAES que estamos desarrollando. Estás entre las primeras personas en usarla.
>
> **¿Qué vas a hacer?**
> Vas a recibir una tarea breve de matemáticas (ecuaciones lineales). La idea es que la trabajes con calma, a tu ritmo, y después nos cuentes cómo te fue a través de la plataforma.
>
> **¿Cómo funciona?**
> 1. Entra a la plataforma con tu cuenta.
> 2. En la pantalla principal verás tu tarea pendiente.
> 3. Cuando estés listo/a, presiona «Empezar».
> 4. Trabaja en la actividad fuera de la plataforma (cuaderno, guía, etc.).
> 5. Cuando termines, vuelve a la plataforma y presiona «Terminar».
> 6. Te pedirá que cuentes brevemente cómo te fue.
>
> **¿Cuánto toma?**
> Entre 20 y 30 minutos. No hay presión por hacerlo perfecto.
>
> **¿Por qué importa?**
> Tu experiencia nos ayuda a mejorar la plataforma antes de que más personas la usen. Cualquier comentario es valioso.
>
> Si tienes dudas, escríbeme.
>
> ¡Gracias por participar!

---

## 8. Parent/Guardian Note (if participant is a minor)

> Estimado/a apoderado/a,
>
> [Nombre del estudiante] ha sido invitado/a a participar en una prueba controlada de Bexauri, una plataforma educativa en desarrollo orientada a la preparación PAES.
>
> **Sobre la actividad:**
> - Es una sesión breve (20–30 minutos) con una tarea de matemáticas.
> - El estudiante trabaja a su ritmo y reporta cómo le fue.
> - No se evalúa con nota ni se comparte información públicamente.
>
> **Sobre los datos:**
> - Solo se registra el nombre, correo y las respuestas del estudiante dentro de la plataforma.
> - La información se usa exclusivamente para mejorar la herramienta.
> - No se comparte con terceros ni se publica.
>
> **Sobre el contexto:**
> - Es una versión beta, no un producto terminado.
> - La retroalimentación del estudiante es lo más valioso.
>
> Si tiene preguntas, no dude en contactarnos.
>
> Atentamente,
> Equipo Bexauri

---

## 9. Admin Operation Checklist for First Session

### Before the session

- [ ] Participant selected and contacted
- [ ] Student account created (User row with email)
- [ ] Student record created (Student row with matching email)
- [ ] Active enrollment exists (StudentProgramInstance, program=PAES_M1, status=active)
- [ ] Open cycle exists (LearningCycle, status=open, currentCycleId set on enrollment)
- [ ] One pending study load exists in the cycle
- [ ] `/now` renders correctly for the student (verify by confirming linkage, do not log in as them)
- [ ] Onboarding message sent to participant
- [ ] Admin has `/admin/beta-operations` open

### During the session

- [ ] Monitor `/admin/beta-operations` for the load to appear in "Completadas recientemente"
- [ ] Do not intervene unless the student asks for help
- [ ] If the student reports confusion, note it for feedback

### After the session

- [ ] Open the student's cycle detail in admin
- [ ] Confirm the completed load is visible
- [ ] Read the self-report text ("Autorreporte: ...")
- [ ] Create exactly one CycleDecision:
  - decisionType: advance / reinforce / hold / redirect (based on evidence)
  - rationale: brief explanation referencing the self-report and observed evidence
- [ ] Collect student feedback (see Section 10)
- [ ] Record feedback in a private note or document
- [ ] Decide next action: repeat, reinforce, or invite second participant

---

## 10. Feedback Questions

After the session, ask the student (via WhatsApp, call, or form):

1. ¿Entendiste qué tenías que hacer?
2. ¿Te pareció útil la actividad?
3. ¿Las instrucciones fueron claras?
4. ¿Cuánto tiempo te tomó aproximadamente?
5. ¿Algo te confundió?
6. ¿La plataforma te pareció fácil de usar?
7. ¿Qué mejorarías de la experiencia?

---

## 11. Decision Criteria After First Session

| Decision | When to use |
|---|---|
| **advance** | Task completed, student reports clarity and/or confidence. Evidence suggests readiness for a new topic or increased difficulty. |
| **reinforce** | Student reports difficulty or weak understanding. The same topic should be revisited with a different approach. |
| **hold** | Evidence is insufficient to decide. More information or another attempt is needed. |
| **redirect** | Task was confusing or mismatched to the student's level. A different topic or approach is needed. |

The decision is always manual and human. No automated scoring or AI-based decision is used.

---

## 12. Stop/Pause Criteria

**Pause the beta immediately if any of the following occur:**

- Student cannot access `/now` (login or linkage failure)
- The task description is confusing and the student cannot proceed
- The self-report is not captured after completing a load
- The admin cannot see the evidence in `/admin/beta-operations` or cycle detail
- A CycleDecision cannot be recorded
- Any authentication or data integrity issue appears
- Any privacy or security concern is raised
- The student reports a negative or distressing experience

**After pausing:**
- Document what happened
- Do not attempt to fix during the session
- Investigate in a separate technical phase
- Resume only after the issue is resolved and verified

---

## 13. What NOT to Do in the First Beta Session

- ❌ Onboard many students at once
- ❌ Create long multi-topic study plans
- ❌ Promise PAES score improvement
- ❌ Introduce AI agents or automated tutoring
- ❌ Automate pedagogical decisions
- ❌ Use real high-stakes exam results
- ❌ Create many study loads in the first cycle
- ❌ Close or continue cycles unless intentionally planned
- ❌ Modify schema or deploy during the session
- ❌ Share student data publicly
- ❌ Treat the beta as a finished commercial product

---

## 14. Recommended First Beta Sequence

```
Step 1: One student, one PAES M1 task (ecuaciones lineales)
   │
   ▼
Step 2: Admin review + CycleDecision (advance/reinforce/hold/redirect)
   │
   ▼
Step 3: Short student feedback (7 questions)
   │
   ▼
Step 4: Decide: repeat topic, reinforce, or invite second student
   │
   ▼
Step 5: Only then expand to L1 or a second participant
```

Each step must complete before the next begins. Do not skip steps.

---

## 15. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Login confusion | Send clear step-by-step login instructions; offer WhatsApp support |
| Task not clear | Review task wording with a non-technical reader before the session |
| Student does not return to complete | Set a soft deadline; follow up via WhatsApp after 1 hour |
| Self-report too vague | Accept any report; do not pressure for detail. Vague reports are data too |
| Admin forgets to create a decision | Follow the checklist (Section 9); set a personal reminder |
| Over-expansion too early | Hard rule: 1 student, 1 task, 1 decision before any expansion |
| Treating beta as finished product | Onboarding message explicitly states this is a beta |

---

## 16. FL Execution Recommendation

The next phase is:

### FL — Assisted Closed Beta Execution

**FL should begin only after all of the following are true:**

- [ ] Participant has been selected and has confirmed availability
- [ ] Task has been chosen and wording reviewed
- [ ] Onboarding message has been approved and sent
- [ ] Admin knows the exact checklist steps (Section 9)
- [ ] Stop/pause criteria (Section 12) are understood and accepted
- [ ] The participant's Student + Enrollment + Cycle + StudyLoad chain is verified in production

**Do not begin FL until these conditions are met.**

---

## 17. Explicit Non-Implementation Statement

FL-2 is a documentation-only phase. It does **not**:

- Modify app code
- Modify database schema
- Modify API endpoints
- Deploy the application
- Create users, students, enrollments, cycles, study loads, responses, or decisions
- Run `prisma db push`, `prisma migrate`, or `prisma db seed`
- Start, complete, close, or continue any study load or cycle
- Create AI agents or automation
- Execute the beta session

All actions described in this document are recommendations for the human operator to execute manually in Phase FL.
