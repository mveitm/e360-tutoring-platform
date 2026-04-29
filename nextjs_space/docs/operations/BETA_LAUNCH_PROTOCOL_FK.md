# FK — Beta Launch Protocol

**Phase:** FK
**Type:** Documentation-only operational protocol
**Date:** 2026-04-29
**Author:** Technical custodian / product operations lead
**Status:** Protocol defined — not yet executed

---

## 1. Current Readiness Baseline

| Phase | Capability | Status |
|---|---|---|
| FH | Student weekly flow on `/now` — see task, start, complete, self-report | ✅ Verified |
| FI | Admin `/admin/beta-operations` — operational view with counters, sections, links | ✅ Live |
| DATA-BETA-1 | Minimal beta dataset — 2 students, 2 enrollments, 7 loads, 2 responses | ✅ Live in prod |
| FJ | Manual pedagogical decision layer — self-report visible, CycleDecision CRUD | ✅ Deployed |
| Governance | Phase semantics, DN/DU/DZ adaptive rules, EV/EW/EY/EZ guards | ✅ Active |
| No-secret discipline | No secrets/passwords/connection strings printed in any phase | ✅ Maintained |

**Not yet available:**
- No AI agents
- No automatic adaptive engine
- No automatic PAES content generation
- No scoring or analytics
- No native mobile app

---

## 2. Purpose of the Beta

The beta validates whether the platform can support **real, minimal, assisted PAES preparation** — not just technical button-clicking.

Specific validation questions:

1. Can a student complete one PAES-oriented study week using `/now`?
2. Can the admin see the student's evidence/self-report?
3. Can the admin close/review the cycle when work is complete?
4. Can the admin record a human pedagogical decision (advance/reinforce/hold/redirect) with rationale?
5. Can the next study load be prepared without breaking traceability?
6. Does the student perceive educational value from the experience?

If all six are answered positively, the MVP operational spine is validated.

---

## 3. Beta Scope

| Parameter | Value |
|---|---|
| Maximum students | 2–5 |
| Initial duration | 1–2 weeks |
| Task orientation | PAES M1, PAES L1 (optionally M2) |
| Operation mode | Human-assisted — admin prepares loads, reviews evidence, decides next steps |
| Content preparation | Manual or semi-manual — admin writes study load titles and instructions |
| PAES promise | No promise of full PAES preparation, score improvement, or comprehensive coverage |
| Tutoring mode | No fully automated tutoring — human review with platform-supported workflow |

---

## 4. Student Selection Criteria

Ideal beta students:

- **Willing to test and give feedback** — understands this is a beta, not a finished product
- **Preparing PAES or simulating PAES context** — the tasks will feel relevant
- **Comfortable with a minimal platform** — no mobile app, no flashy UI, functional web interface
- **Understands self-report matters** — willing to complete the self-report after each task
- **Available for 1–2 weeks** — can commit to completing at least 2–3 study loads per week

Preferred starting configuration:
- 1 student on **PAES M1** (Matemática) — tests the algebra/geometry flow
- 1 student on **PAES L1** (Competencia Lectora) — tests the reading comprehension flow
- **M2 only if operationally simple** — M2 currently has no axes/skills seeded

---

## 5. Pre-Beta Setup Checklist

- [ ] GitHub main is clean — no uncommitted app changes
- [ ] Production app is reachable at `tutoring-platform-mv-l4o1ne.abacusai.app`
- [ ] `/admin/beta-operations` loads and shows correct counters
- [ ] `/now` works for at least one test/beta student (student-user pair exists)
- [ ] Admin can view cycle detail from beta-operations links
- [ ] Self-report/evidence appears under completed study loads on cycle detail
- [ ] CycleDecision creation works (advance/reinforce/hold/redirect + rationale)
- [ ] No-secret-printing discipline confirmed
- [ ] Database snapshot decision: confirm a recent snapshot exists or take one via Settings → Database
- [ ] All test/beta students are clearly marked with `Beta-XX` naming and `@test.bexauri.cl` emails
- [ ] Existing DATA-BETA-1 test data is still valid or has been adjusted for the beta

---

## 6. Onboarding Protocol

For each new beta student, follow these steps in order:

1. **Create Student** — Admin → Students → Create
   - Use clear beta naming: `[Nombre] Beta-[Program]`
   - Use test email: `[nombre].beta.[program]@test.bexauri.cl`

2. **Create or confirm User account** — needed for `/now` access
   - The student needs a User with the same email as the Student record
   - Create via `/api/signup` or admin flow

3. **Create Enrollment** — Admin → Enrollments → Create
   - Select the student and the target program (PAES_M1 or PAES_L1)
   - Status: `active`

4. **Register starting point** — Admin → Diagnostics → Create
   - Create a completed initial diagnostic (placeholder)
   - `diagnosticType: initial`, `status: completed`
   - `resultSummary: "Diagnóstico inicial placeholder — beta"`

5. **Create/open Learning Cycle** — Admin → Learning Cycles → Create
   - Select the enrollment
   - System auto-assigns cycle number and opens it

6. **Create first Study Load(s)** — on the cycle detail page
   - Use PAES-oriented titles (see §10)
   - Set `loadType` appropriately (practice, reading, etc.)
   - Create 2–3 loads for the first week

7. **Explain beta to student:**
   - "Vas a entrar a una plataforma web donde verás tareas de estudio PAES."
   - "Cada tarea tiene un título que te dice qué practicar."
   - "Presiona 'Empezar' cuando estés listo, trabaja en la actividad, y cuando termines presiona 'Terminar'."
   - "Después de terminar, te pedirá un autorreporte: cuenta cómo te fue."
   - "Tu autorreporte es muy importante — lo revisamos para decidir el siguiente paso."

8. **Clarify time commitment:**
   - "Esperamos 2–3 actividades por semana."
   - "Cada actividad debería tomar entre 20–45 minutos."

9. **Clarify that self-report matters:**
   - "Las tres opciones de autorreporte (Me fue bien / Me costó / No la terminé) nos ayudan a decidir qué sigue."

---

## 7. Weekly Study Protocol

### Student side

1. Student enters `/now`
2. Student sees current study load(s) — pending and in-progress
3. Student presses "Empezar" on a pending load → transitions to `in_progress`
4. Student works on the PAES-oriented activity (offline, with their own materials, guided by the load title)
5. Student presses "Terminar" → self-report prompt appears
6. Student selects self-report: "Me fue bien" / "Me costó" / "No la terminé"
7. Load transitions to `completed`, Response is created with self-report content
8. Student repeats for remaining loads

### Admin side

1. Admin opens `/admin/beta-operations`
2. Admin reviews counters: active enrollments, open cycles, pending/in-progress/completed loads
3. Admin navigates to cycle detail via "Ver ciclo" link
4. Admin inspects study loads and their statuses
5. Admin reads self-report/evidence under completed loads ("Autorreporte: Me fue bien / Me costó / ...")
6. Admin records a manual CycleDecision:
   - Select type: advance / reinforce / hold / redirect
   - Edit to add rationale explaining the decision
7. Admin prepares next load(s) for the student:
   - Create new study load on the cycle detail page, OR
   - If cycle should close: press "Cerrar ciclo" (only when all loads are completed)
   - If next cycle needed: press "Autorizar continuidad" → create new cycle → add loads

---

## 8. Admin Daily/Weekly Checklist

### Daily (2–3 minutes)
- [ ] Check `/admin/beta-operations` — any new completed loads?
- [ ] Check for in-progress loads that seem stalled (started but not completed)
- [ ] Note any anomalies

### Weekly (15–30 minutes)
- [ ] Review all active enrollments
- [ ] Review all pending loads — are students blocked?
- [ ] Review all completed loads — read self-reports
- [ ] Identify cycles needing review or close
- [ ] Record CycleDecisions for reviewed cycles
- [ ] Prepare next week's study loads
- [ ] Collect student feedback (see §11)
- [ ] Note blockers, student confusion, or operational gaps
- [ ] Document any issues in a simple log (can be informal)

---

## 9. Decision Protocol

After reviewing the student's evidence/self-report, the admin selects one of four decision types:

| Decision | When to Use | Example Rationale |
|---|---|---|
| **advance** | Student completed successfully, evidence suggests readiness to move forward | "Alumna completó ecuaciones lineales sin dificultad. Avanzar a funciones." |
| **reinforce** | Student completed but reported difficulty or evidence shows weak understanding | "Alumno logró identificar idea principal en 3 de 4 textos. Reforzar con texto más complejo." |
| **hold** | Insufficient evidence, unclear progress, or student didn't complete | "Estudiante no terminó la actividad. Mantener y verificar en la próxima sesión." |
| **redirect** | Task/topic mismatch, student needs a different focus area | "La alumna tiene buen nivel en ecuaciones pero necesita reforzar geometría. Redirigir." |

**Every decision must include a short rationale.** The rationale is the human judgment record that connects evidence to the next action. Without it, traceability is lost.

---

## 10. PAES-Minimum Educational Standard

Every study load created for the beta must meet a minimum standard:

| Element | Required | Example |
|---|---|---|
| **PAES area/program** | Yes | PAES M1, PAES L1 |
| **Specific skill or topic** | Yes | Ecuaciones lineales, Idea principal |
| **Clear instruction in title** | Yes | "Practicar ecuaciones lineales de primer grado" |
| **Estimated effort** | Recommended | "~30 minutos" (can be noted in title or communicated verbally) |
| **Student-facing purpose** | Recommended | Communicated during onboarding: "Esto te prepara para la PAES" |
| **Self-report prompt** | Built-in | Platform shows 3 options after completion |

**Example study load titles:**
- PAES M1 — Practicar ecuaciones lineales de primer grado
- PAES M1 — Resolver problemas de planteamiento algebraico
- PAES M1 — Revisión de errores en despeje
- PAES M1 — Interpretar gráficos de funciones lineales
- PAES L1 — Identificar información explícita en un texto breve
- PAES L1 — Inferir idea principal y propósito del texto
- PAES L1 — Analizar estructura de texto argumentativo

**Constraints:**
- Do not create a PAES content engine
- Do not generate automatic exercises
- Do not claim diagnostic validity
- Do not promise score improvement
- This is controlled beta fixture data for operating an MVP flow

---

## 11. Feedback Collection Protocol

After each beta week (or at the end of the beta), ask students:

1. ¿Entendiste qué hacer en cada actividad?
2. ¿Te pareció útil la actividad para preparar la PAES?
3. ¿Fue fácil usar la plataforma?
4. ¿Qué te confundió?
5. ¿Sentiste que las actividades estaban alineadas con la PAES?
6. ¿Cuánto tiempo te tomó cada actividad?
7. ¿Qué debería mejorar para la próxima semana?

Feedback can be collected via:
- Brief voice/text conversation
- Simple written form
- Notes taken by the admin

Feedback should be documented and used to inform the next iteration.

---

## 12. Success Criteria

The beta is successful if:

- [ ] At least one student completes at least one study load end-to-end
- [ ] Self-report/evidence is captured and visible to admin
- [ ] Admin can review the evidence on the cycle detail page
- [ ] Admin can record a CycleDecision with rationale
- [ ] The next action (new load or new cycle) can be prepared without breaking traceability
- [ ] No technical intervention is required for normal daily operation
- [ ] At least one student reports minimal usefulness or clarity from the experience

---

## 13. Stop/Pause Criteria

Pause or stop the beta if any of the following occur:

- Student cannot access `/now` due to technical failure
- Admin cannot see evidence/self-report on cycle detail
- Data integrity issue appears (missing records, orphaned data, count mismatches)
- A cycle cannot be reviewed or closed through normal flow
- A CycleDecision cannot be recorded
- The platform causes confusion that blocks the student from studying
- Any secret, credential, or security issue appears
- Deploy or schema drift is detected that affects data integrity
- Student reports that the experience is confusing, harmful, or entirely useless

---

## 14. Out of Scope for Beta

The following are explicitly excluded from the beta:

- ❌ AI agents or automated tutoring
- ❌ Automatic adaptive engine
- ❌ Automatic PAES study plan generation
- ❌ Score improvement guarantees or PAES score estimates
- ❌ Advanced analytics or reporting dashboards (beyond FI)
- ❌ Native mobile app
- ❌ Automated billing or payments
- ❌ WhatsApp, email, or push notification automation
- ❌ Dashboards beyond `/admin/beta-operations`
- ❌ Universal audit logging (beyond existing FD append-only audit)
- ❌ Schema changes (unless separately approved in a dedicated phase)
- ❌ Multi-tenant or multi-school support
- ❌ Student-to-student interaction
- ❌ Gamification or rewards

---

## 15. Roles and Responsibilities

| Role | Person | Responsibilities |
|---|---|---|
| **Student** | Beta participant | Complete study loads, leave self-reports, give feedback |
| **Admin/Operator** | Project team | Create loads, review evidence, record decisions, prepare next actions, collect feedback |
| **Pedagogical Reviewer** | Project team (may overlap with admin) | Evaluate whether tasks are educationally valid, review decision quality, ensure PAES alignment |
| **Technical Custodian** | Project team | Maintain platform stability, handle technical issues, enforce governance, manage deploys |

During the initial beta, the admin, pedagogical reviewer, and technical custodian roles may be held by the same person.

---

## 16. Data and Privacy Rules

- Use minimal data — only what is needed for the beta flow
- Mark all test/beta data clearly with `Beta-XX` naming and `@test.bexauri.cl` emails
- Do not use real sensitive personal data (RUT, real addresses, real phone numbers) beyond what is strictly necessary
- Do not print, display, or share secrets, passwords, or connection strings
- Do not mutate production data outside explicitly approved phases
- Do not create bulk fake users or mass synthetic data
- If real students join, use only their first name and a test email, with their consent
- Self-report data is treated as educational feedback, not as personally identifiable information

---

## 17. Operational Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Student confusion about what to do | Medium | Medium | Clear onboarding instructions (§6), simple task titles (§10) |
| Weak PAES task quality | Medium | High | Pedagogical reviewer checks tasks before release |
| Manual admin workload too high | Medium | Medium | Start with 2 students, not 5; keep loads simple |
| Data drift or integrity issue | Low | High | Pre-beta snapshot, regular row-count checks |
| Admin forgets to record decision | Medium | Medium | Weekly checklist (§8), decision protocol (§9) |
| Overpromising to students | Low | High | Clear beta framing (§6.7): "esto es un beta" |
| Using beta as if it were a full product | Medium | Medium | Scope boundaries (§3, §14) |
| Tool/deploy/schema risk | Low | High | No deploys during beta unless critical; custody discipline |
| Student drops out | Medium | Low | Start with 2 students; recruit backup if needed |

---

## 18. Next Phase Recommendation

### FL — Assisted Closed Beta with 2–5 Students

FL is the execution phase where the beta actually runs.

**FL should only begin after:**
- [ ] FK protocol is accepted and understood by the operator
- [ ] Current live dataset is verified or adjusted
- [ ] `/now` can be accessed by at least one beta student
- [ ] Admin can review evidence and record decisions end-to-end
- [ ] Beta participants are selected and onboarding materials are ready
- [ ] A database snapshot exists as a safety baseline

**FL should define:**
- Exact student assignments
- Week 1 study loads
- Feedback collection schedule
- Decision recording cadence
- Stop/go decision after week 1

---

## 19. Explicit Non-Implementation Statement

**Phase FK does NOT:**

- ❌ Modify app code
- ❌ Modify schema (`prisma/schema.prisma`)
- ❌ Modify API endpoints
- ❌ Mutate database data (dev or prod)
- ❌ Deploy the application
- ❌ Add AI agents or automation
- ❌ Add middleware
- ❌ Create users, students, enrollments, cycles, study loads, or decisions
- ❌ Run `prisma db push`, `prisma migrate`, `prisma db seed`, or `prisma db push --force-reset`
- ❌ Run any data-writing scripts
- ❌ Create or restore Abacus checkpoints or database snapshots
- ❌ Print, echo, or display secrets, passwords, or connection strings

This phase is **documentation and protocol definition only.**
The next operational phase is **FL**, to be executed only after this protocol is accepted.

---

*End of FK — Beta Launch Protocol.*
