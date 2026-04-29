# DATA-BETA-0 — Minimal Beta Data Reconstruction Plan

**Phase:** DATA-BETA-0
**Type:** Documentation-only planning phase
**Date:** 2026-04-29
**Author:** Technical custodian
**Status:** Plan defined — no data mutation executed

---

## 1. Current Baseline

| Item | Value |
|---|---|
| Current HEAD (origin/main) | `7968691 Custody: document FI deployment data incident` |
| Current data state | Seed-level (11 rows total) |
| Incident documented | CUST-INC-FI in PHASE_LOG.md |
| GitHub main | Clean, no corruption |
| App code | Valid — all phases through FI intact |
| Data needs | Clean reconstruction before FJ (manual pedagogical decision) and FL (assisted closed beta) |

**Current seed data (11 rows):**

| Entity | Count | Details |
|---|---|---|
| User | 1 | Admin account (john@doe.com) |
| Program | 3 | PAES_L1 (Competencia Lectora), PAES_M1 (Matemática M1), PAES_M2 (Matemática M2) |
| Axis | 3 | ALG (Álgebra), GEO (Geometría), DAT (Datos y probabilidad) — all under PAES_M1 |
| Skill | 4 | ALG_LINEAR, ALG_FUNC, GEO_ANGLE, DAT_TABLE — all under PAES_M1 |
| Student | 0 | — |
| Enrollment | 0 | — |
| LearningCycle | 0 | — |
| StudyLoad | 0 | — |
| All other tables | 0 | — |

**Schema note:** The Prisma schema defines 21 models. Dev DB currently has 20 tables (missing `audit_events` due to a permission issue documented in CUST-INC-FI). Prod DB has 21 tables. Both are at seed-level data.

**Axes/Skills gap:** Only PAES_M1 has axes and skills seeded. PAES_L1 and PAES_M2 have no axes or skills yet. Beta personas using L1 or M2 will need at least one axis and one skill created manually or via a controlled phase.

---

## 2. Objective

Define the minimal beta dataset needed to meaningfully operate:

1. **Student `/now` flow** (Phase FH) — a test student sees current study loads, starts, completes, self-reports
2. **Admin `/admin/beta-operations` view** (Phase FI) — admin sees active enrollments, open cycles, pending/in-progress/completed loads, cycles ready for review
3. **Learning cycle close/review** — admin can review a cycle where all loads are completed and close it
4. **Manual pedagogical decision** (future Phase FJ) — admin can make advance/reinforce/hold/redirect decisions on a cycle

This plan defines the dataset. It does **not** create the data.

---

## 3. Minimal Beta Dataset

### 3.1 Recommended Starting Size

- **2 test students first** (Student A and Student B)
- **Optionally expandable to 3–5 later** once the first two are validated
- Each student gets exactly 1 enrollment, 1 open learning cycle, and 2–3 study loads

### 3.2 Per-Student Record Requirements

For each beta student, the following records are required:

| Entity | Count | Purpose |
|---|---|---|
| **Student** | 1 | The student identity |
| **StudentProgramInstance** (enrollment) | 1 | Links student to a program; status: `active` |
| **LearningCycle** | 1 | Cycle 1, status: `open` |
| **StudyLoad** (pending) | 1 | At least one load with status `pending` or `released` — visible in FI "Trabajo pendiente" |
| **StudyLoad** (in_progress) | 1 | At least one load with status `in_progress` — visible in FI "En progreso" and testable for /now start flow |
| **StudyLoad** (completed) | 1 | At least one completed load — visible in FI "Completadas recientemente" and testable for self-report flow |
| **TutoringSession** | 1 | Linked to the completed StudyLoad — needed for Response/evidence |
| **Response** | 1 | Self-report/evidence on the completed load — needed for admin review |
| **Diagnostic** | 0–1 | Optional placeholder; status: `completed`; `resultSummary` can note "Diagnóstico inicial placeholder" |
| **SkillState** | 0–2 | Optional; only if needed for pedagogical visibility; can be added later |

### 3.3 Aggregate Dataset Size

For 2 students (minimum viable):

| Entity | Count |
|---|---|
| Student | 2 |
| StudentProgramInstance | 2 |
| LearningCycle | 2 |
| StudyLoad | 6 (3 per student) |
| TutoringSession | 2 (1 per student) |
| Response | 2 (1 per student) |
| Diagnostic | 0–2 (optional) |
| SkillState | 0–4 (optional) |
| **Total new rows** | **14–18** |

For 3 students (recommended ceiling for DATA-BETA-1):

| Entity | Count |
|---|---|
| Student | 3 |
| StudentProgramInstance | 3 |
| LearningCycle | 3 |
| StudyLoad | 9 (3 per student) |
| TutoringSession | 3 |
| Response | 3 |
| Diagnostic | 0–3 |
| SkillState | 0–6 |
| **Total new rows** | **21–30** |

### 3.4 Cycle Ready for Close/Review

At least **one student** should have all 3 study loads completed so their cycle appears in FI's "Necesita atención / revisión" section. This requires:
- All StudyLoads for that cycle: status = `completed`
- The LearningCycle remains `open` (the admin closes it manually)
- A Response with evidence content exists for at least one completed load

---

## 4. PAES Educational Usefulness

The beta dataset **must not** be generic dummy data. It must include PAES-oriented labels and content that reflect the platform's actual educational purpose.

### 4.1 Requirements

- StudyLoad titles must reference real PAES skills or competencies
- Programs used must be the actual seeded programs (PAES_L1, PAES_M1, PAES_M2)
- Skills referenced must be real skills from the seed (ALG_LINEAR, ALG_FUNC, GEO_ANGLE, DAT_TABLE) or newly created ones for L1/M2
- Response content should contain realistic self-report text (e.g., "Resolví 8 de 10 ejercicios de ecuaciones lineales. Tuve dificultad con los problemas de dos incógnitas.")

### 4.2 Example StudyLoad Titles

| Program | Example Title | Load Type |
|---|---|---|
| PAES_M1 | Resolver ecuaciones lineales de primer grado | practice |
| PAES_M1 | Interpretar gráficos de funciones lineales | practice |
| PAES_M1 | Ejercicios de ángulos en triángulos y cuadriláteros | practice |
| PAES_L1 | Lectura comprensiva: identificar idea principal en texto informativo | reading |
| PAES_L1 | Inferir significado de palabras según contexto | reading |
| PAES_M2 | Resolver problemas de probabilidad condicional | practice |

### 4.3 Constraints

- Do **not** build a PAES content engine
- Do **not** generate automatic exercises
- Do **not** create adaptive logic
- This is **controlled beta fixture data** — hand-crafted, labeled, and traceable

---

## 5. Recommended Test Personas

### Student A — PAES M1, Algebra Focus

| Field | Value |
|---|---|
| firstName | Ana |
| lastName | Beta-M1 |
| email | ana.beta.m1@test.bexauri.cl |
| Program | PAES_M1 (Matemática M1) |
| Focus | Algebra reinforcement — ecuaciones lineales, funciones |
| Cycle 1 loads | (1) "Resolver ecuaciones lineales de primer grado" — `completed`, (2) "Interpretar gráficos de funciones lineales" — `in_progress`, (3) "Ejercicios de ángulos en triángulos" — `released` |
| Evidence | Self-report on load 1: "Resolví 8 de 10 ejercicios. Dificultad con sistemas de dos ecuaciones." |
| Cycle state | Open, ready for review if all loads completed |

### Student B — PAES L1, Reading Comprehension

| Field | Value |
|---|---|
| firstName | Bruno |
| lastName | Beta-L1 |
| email | bruno.beta.l1@test.bexauri.cl |
| Program | PAES_L1 (Competencia Lectora) |
| Focus | Reading comprehension — idea principal, inferencia |
| Cycle 1 loads | (1) "Lectura comprensiva: identificar idea principal" — `completed`, (2) "Inferir significado de palabras según contexto" — `in_progress`, (3) "Analizar estructura de texto argumentativo" — `pending` |
| Evidence | Self-report on load 1: "Logré identificar la idea principal en 3 de 4 textos. El texto científico fue más difícil." |
| Cycle state | Open, with completed + in-progress + pending loads |

### Student C (optional, deferred to expansion) — PAES M2, Mixed

| Field | Value |
|---|---|
| firstName | Camila |
| lastName | Beta-M2 |
| email | camila.beta.m2@test.bexauri.cl |
| Program | PAES_M2 (Matemática M2) |
| Focus | Mixed readiness — probabilidad, geometría avanzada |
| Cycle 1 loads | To be defined if/when Student C is activated |

**Note:** All personas are clearly marked as test/beta data via the `Beta-XX` lastName convention and `@test.bexauri.cl` email domain.

### 5.1 Prerequisites for Student B (PAES_L1)

PAES_L1 currently has **no axes or skills** in the seed. Before creating Student B's data, at least one Axis and one Skill must be created under PAES_L1:

| Entity | Code | Name |
|---|---|---|
| Axis | COMP | Comprensión Lectora |
| Skill | COMP_IDEA | Identificar idea principal en textos |
| Skill | COMP_INFER | Inferir significado según contexto |

These can be created via the admin UI (Admin → Axes → Create, Admin → Skills → Create) without any schema change.

### 5.2 Prerequisites for Student C (PAES_M2, if activated)

Similarly, PAES_M2 has no axes or skills. If Student C is activated:

| Entity | Code | Name |
|---|---|---|
| Axis | PROB | Probabilidad y Estadística |
| Skill | PROB_COND | Resolver problemas de probabilidad condicional |

---

## 6. Operational States Required

The dataset must allow the admin to see the following in `/admin/beta-operations`:

| FI Section | Required State | Covered By |
|---|---|---|
| "Matrículas activas" | Active enrollments with student/program links | Student A + B enrollments |
| Open cycles counter | At least 1 open cycle | Both students have open cycles |
| "Trabajo pendiente" | Pending/released study loads | Student A load 3 (released), Student B load 3 (pending) |
| "En progreso" | In-progress study loads | Student A load 2, Student B load 2 |
| "Completadas recientemente" | Completed study loads | Student A load 1, Student B load 1 |
| "Necesita atención / revisión" | Cycle where all loads completed | Student A (if all 3 loads completed) — see §3.4 |
| Evidence/self-report present | Response with content | Student A and B each have 1 Response |

**For the `/now` student flow (FH):**

| Flow Step | Required State |
|---|---|
| Student sees current study loads | At least 1 released/pending + 1 in_progress load |
| Start action | A `released` load that student can press "Empezar" on |
| Complete/self-report flow | An `in_progress` load that student can press "Terminar" on |
| Completed history | At least 1 completed load visible in cycle history section |

---

## 7. What NOT to Create

The following are explicitly excluded from the beta dataset:

- ❌ Large numbers of fake users (max 2–3 test students, expandable to 5)
- ❌ Large historical datasets or multi-cycle histories
- ❌ Fake analytics or aggregate reports
- ❌ Fake PAES scores (unless clearly marked as placeholder with `resultSummary: "placeholder"`)
- ❌ Production-like personal data (real names, real RUTs, real emails)
- ❌ Real student personal data without consent
- ❌ Automated agents or adaptive automation
- ❌ Billing, payment, or subscription data
- ❌ Notification configuration data
- ❌ Dashboard or reporting data beyond what FI already shows
- ❌ Unnecessary extra cycles or loads beyond what's needed for the operational states above
- ❌ CycleDecision records (deferred to FJ — manual pedagogical decision phase)
- ❌ CycleSnapshot records (deferred until cycle close is actually tested)
- ❌ ContinuitySignal records (not needed for initial beta)
- ❌ CycleDecisionSkill records (deferred to FJ)

---

## 8. Data Creation Method Recommendation

### Options Evaluated

| Option | Method | Risk | Recommendation |
|---|---|---|---|
| **A** | Manual creation through admin UI | Lowest risk — uses existing validated flows | **Recommended for first 2 records** |
| **B** | Controlled one-time script (DATA-BETA-1 phase) | Low risk if reviewed and approved; faster than manual | Recommended for 3+ records if manual is too slow |
| **C** | Seed extension (modify `scripts/seed.ts`) | Medium risk — seed runs on every deploy; conflates fixture data with baseline | **Not recommended** — seed should remain baseline-only |
| **D** | API-based creation (curl/fetch against running app) | Low-medium risk — depends on API correctness | Acceptable alternative to Option B |

### Recommended Approach

Given the FI incident where a `prisma db push --force-reset` destroyed production data:

**Primary recommendation: Option A (manual via admin UI) for the first 2–3 students.**

Rationale:
- Admin UI flows (Create Student → Create Enrollment → Create Cycle → Create Study Load) are already tested and working
- Each step is visible, reversible, and auditable
- No script can accidentally run `--force-reset` or `db push`
- The custodian can verify each record as it's created
- Total records: ~14–18, which is feasible to create manually in one sitting

**Secondary recommendation: Option B (controlled script in DATA-BETA-1) only if:**
- Manual creation proves impractical for some entity types (e.g., TutoringSession + Response have no admin UI creation flow)
- The script is reviewed, approved, and run exactly once
- The script uses Prisma `create` (not `upsert` or bulk operations) for traceability

**Explicitly not recommended:**
- Option C (seed extension) — the seed must remain a minimal baseline. Mixing beta fixture data into seed creates maintenance risk and makes `prisma db seed` dangerous.
- Running any Prisma CLI commands (`db push`, `migrate`, `db seed`) during data creation — use only the application's API layer or admin UI.

### Manual Creation Sequence (Option A)

If using admin UI, follow this order per student:

1. **Admin → Students → Create Student** (firstName, lastName, email)
2. **Admin → Enrollments → Create Enrollment** (select student, select program, status: active)
3. *If program lacks axes/skills:* **Admin → Axes → Create Axis**, then **Admin → Skills → Create Skill**
4. **Admin → Learning Cycles → Create Cycle** (select enrollment; cycleNumber auto-assigned)
5. **Admin → Study Loads → Create Study Load** (select cycle, set title, loadType, status)
   - Create 3 loads: one `released`/`pending`, one `in_progress`, one `completed`
6. **For the completed load's evidence:** This requires API/script — no admin UI exists for TutoringSession + Response creation. See §8 note below.

**Note on TutoringSession + Response:** The admin UI does not currently have a creation form for TutoringSession or Response. These records will need to be created via:
- Option B (a minimal script), or
- Option D (direct API call), or
- The student `/now` flow itself (complete a load → fill self-report → Response is created automatically via the DQ flow)

The **safest method** is to use the student flow: log in as the test student, navigate to `/now`, start a load, complete it, and fill the self-report form. This exercises the FH flow and creates the Response naturally.

---

## 9. DATA-BETA-1 Proposal

### Phase: DATA-BETA-1 — Create Minimal Beta Dataset

**Purpose:** Execute the data creation plan defined in DATA-BETA-0.

**DATA-BETA-1 SHOULD:**
- Create 2–3 test students (Student A, Student B, optionally Student C)
- Create 1 enrollment per student
- Create prerequisite axes/skills for PAES_L1 (and PAES_M2 if Student C is activated)
- Create 1 open learning cycle per student
- Create 2–3 study loads per cycle with varied statuses
- Create evidence/self-reports for completed loads (via student flow or minimal script)
- Verify all operational states from §6 are satisfied
- Document every record created (entity, ID, key fields) in PHASE_LOG

**DATA-BETA-1 SHOULD NOT:**
- Modify `scripts/seed.ts`
- Run `prisma db push`, `prisma migrate`, or `prisma db push --force-reset`
- Modify the Prisma schema
- Modify app code or endpoints
- Deploy the app (unless app code was changed, which it should not be)
- Create more than 5 students
- Create CycleDecision records (deferred to FJ)
- Create automated or adaptive data
- Print secrets, passwords, or connection strings

**DATA-BETA-1 MUST:**
- Require explicit user approval before any data mutation
- Confirm which database (dev, prod, or both) will be mutated before executing
- Take or confirm a DB snapshot exists before starting
- Log every mutation with entity type, count, and purpose
- Verify final state matches this plan's §6 requirements

---

## 10. Verification Plan for DATA-BETA-1

After data is created in DATA-BETA-1, verify the following:

### 10.1 Student `/now` Flow

- [ ] `/now` shows a current study load for a test student (log in as student or impersonate)
- [ ] Start action works: pressing "Empezar" transitions a released load to in_progress
- [ ] Complete/self-report flow works: pressing "Terminar" opens self-report, submitting creates a Response
- [ ] Completed loads appear in "Lo que hiciste en este ciclo" section

### 10.2 Admin `/admin/beta-operations` View

- [ ] Counter cards show meaningful non-zero values
- [ ] "Matrículas activas" lists the test enrollments with correct student/program links
- [ ] "Trabajo pendiente" shows pending/released loads
- [ ] "En progreso" shows in-progress loads
- [ ] "Completadas recientemente" shows completed loads
- [ ] "Necesita atención / revisión" shows at least one cycle ready for close (if applicable)
- [ ] Admin can navigate from any row to the student detail, enrollment detail, or cycle detail page

### 10.3 Integrity Checks

- [ ] No schema changes were made
- [ ] No app code was modified
- [ ] No deploy was executed (unless app code was changed)
- [ ] No secrets, passwords, or connection strings were printed
- [ ] Git working tree is clean (no app code changes)
- [ ] Dev and prod databases are at expected row counts

---

## 11. Safeguards After FI Incident

The following safeguards are restated from CUST-INC-FI and must be observed in all future data-touching phases:

1. **Never run `prisma db push --force-reset`** in any environment connected to data that matters
2. **Never run `prisma db push`** during documentation or read-only phases
3. **Never run `prisma db seed`** during documentation phases
4. **Never mutate production data** without an explicit mutation phase and user approval
5. **Take or confirm a DB snapshot** before any future schema change or deployment with schema drift risk
6. **Treat every Abacus deploy as potentially schema-promoting** — the platform may override `promote_dev_db_to_prod: false` if it detects drift
7. **Verify Prisma CLI reports accurately** — "Your database is in sync" does not guarantee all tables exist; cross-check with direct DB inspection
8. **Do not mix fixture data into `scripts/seed.ts`** — the seed must remain a minimal baseline that is safe to re-run
9. **Log every data mutation** in PHASE_LOG with entity types, counts, and purpose
10. **Require explicit user approval** before any data mutation phase begins execution

---

## 12. Explicit Non-Implementation Statement

**Phase DATA-BETA-0 does NOT:**

- ❌ Create students
- ❌ Create enrollments (StudentProgramInstance)
- ❌ Create learning cycles
- ❌ Create study loads
- ❌ Create tutoring sessions
- ❌ Create responses
- ❌ Create diagnostics
- ❌ Create skill states
- ❌ Create axes or skills
- ❌ Run `scripts/seed.ts`
- ❌ Run any data-writing scripts
- ❌ Mutate dev database
- ❌ Mutate prod database
- ❌ Modify `prisma/schema.prisma`
- ❌ Modify any app code
- ❌ Modify any API endpoint
- ❌ Deploy the application
- ❌ Create or restore Abacus checkpoints
- ❌ Print, echo, grep, or display secrets, passwords, or connection strings

This phase is **documentation and planning only**.
The next recommended phase is **DATA-BETA-1**, to be executed only after explicit user approval.

---

*End of DATA-BETA-0 plan.*
