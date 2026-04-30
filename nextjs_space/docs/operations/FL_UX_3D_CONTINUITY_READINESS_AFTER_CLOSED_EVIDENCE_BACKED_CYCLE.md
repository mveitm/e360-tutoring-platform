# FL-UX-3D — Continuity Readiness After Closed Evidence-Backed Cycle

**Date:** 2026-04-30  
**Phase type:** Documentation / audit only  
**Data mutations:** None  
**Code changes:** None  

---

## 1. Executive Summary

FL-UX-3C closed Mauricio Beta-M1 / PAES_M1 / Cycle 1 after an evidence-backed CycleDecision (FL-UX-3B). The cycle is now `closed` with `closedAt` set. The admin UI shows the "Autorizar continuidad" button.

The next question is continuity — what happens when the admin authorizes it, and whether the current mechanism is safe to use.

This audit:
- Does **NOT** authorize continuity.
- Does **NOT** mutate any data.
- Does **NOT** change any code.
- Examines the exact continuity chain (schema, endpoints, UI, semantics) to define the safest next operation.

The goal is to understand the current continuity mechanism before using it.

---

## 2. Current Validated Lifecycle State

Using **Mauricio Beta-M1 / PAES_M1 / Cycle 1** as reference:

| Step | Status |
|------|--------|
| Evidence capture (MC answers) | ✅ Completed (2/8 answers, q1→B ✓, q2→C ✓) |
| Self-report | ✅ Recorded ("Me fue bien") |
| Admin evidence review | ✅ Completed (FL-UX-2D) |
| Evidence-backed CycleDecision | ✅ Created (FL-UX-3B, type: advance) |
| Cycle close | ✅ Closed (FL-UX-3C, closedAt: 30 abr 2026) |
| Continuity authorization | ❌ Not authorized |
| New cycle created | ❌ Not created |
| New StudyLoad created | ❌ Not created |

The system is at the precise boundary between a closed cycle and continuity.

---

## 3. Current Data Model Audit

### 3.1 Core entities relevant to continuity

| Entity | Table | Key continuity-related fields |
|--------|-------|-------------------------------|
| **Student** | `students` | id, firstName, lastName |
| **StudentProgramInstance** (Enrollment) | `student_program_instances` | `currentCycleId` (nullable), `currentContinuityState` (default "normal"), `lastActivityAt` |
| **LearningCycle** | `learning_cycles` | `enrollmentId`, `cycleNumber`, `status` (open/closed), `closedAt` |
| **StudyLoad** | `study_loads` | `learningCycleId`, `status`, `title`, `loadType` |
| **CycleDecision** | `cycle_decisions` | `learningCycleId`, `decisionType`, `rationale` |
| **Response** | `responses` | `studyLoadId`, `responseType`, `content` (JSON with mc_submission) |
| **TutoringSession** | `tutoring_sessions` | `learningCycleId`, `studyLoadId` |
| **ContinuitySignal** | `continuity_signals` | `enrollmentId`, `learningCycleId` (nullable), `evaluationId` (nullable), `signalType`, `rationale` |
| **CycleSnapshot** | `cycle_snapshots` | `learningCycleId`, `snapshotType`, `payload` (JSON) |
| **CycleEvaluation** | `cycle_evaluations` | `learningCycleId`, `evaluationType`, `resultSummary` |

### 3.2 Where continuity state lives

- **Closed cycle state:** `LearningCycle.status = 'closed'` + `LearningCycle.closedAt` set.
- **Continuity signal:** `ContinuitySignal` table. Each signal has `enrollmentId`, optional `learningCycleId`, `signalType` (key value: `'continue'`), `rationale`.
- **Enrollment continuity state:** `StudentProgramInstance.currentContinuityState` (default `'normal'`). This field is checked as a precondition (P2) when creating a new cycle.
- **Current cycle pointer:** `StudentProgramInstance.currentCycleId`. Updated atomically when a new cycle is created.

### 3.3 How continuity creates entities

The continuity chain is a **two-step process**, split across two separate endpoints:

1. **Step 1 — ContinuitySignal emission** (`POST /api/learning-cycles/[id]/continue`):
   - Creates **one** `ContinuitySignal` with `signalType: 'continue'`, `rationale: 'admin_authorize'`.
   - Updates `enrollment.lastActivityAt`.
   - Does **NOT** create a LearningCycle, StudyLoad, or any other entity.

2. **Step 2 — New cycle creation** (`POST /api/learning-cycles`):
   - Checked independently. Precondition P4b requires: previous cycle closed + ContinuitySignal with `signalType: 'continue'` exists for that cycle.
   - Creates a **new LearningCycle** (cycle N+1).
   - Creates **StudyLoads** (up to 3, based on SkillState heuristic).
   - Creates a **CycleSnapshot** (`cycle_open`).
   - Updates `enrollment.currentCycleId` and `enrollment.lastActivityAt`.

These are **explicitly separate operations**. The continue endpoint comments state: "DT owns ONLY the continuity authorization artefact. Cycle N+1 creation remains the responsibility of the existing DL/DN path."

---

## 4. Current Endpoint Audit

### 4.1 POST /api/learning-cycles/[id]/continue

| Property | Value |
|----------|-------|
| **Path** | `/api/learning-cycles/[id]/continue` |
| **Method** | POST |
| **Purpose** | Emit ContinuitySignal to authorize opening cycle N+1 |
| **Auth** | Session required (getServerSession) |
| **Preconditions** | Cycle must exist; cycle.status must be 'closed'; no existing ContinuitySignal with signalType='continue' for this cycle+enrollment (idempotency guard) |
| **Side effects** | Creates one ContinuitySignal; updates enrollment.lastActivityAt |
| **Creates ContinuitySignal** | ✅ Yes — exactly one |
| **Creates LearningCycle** | ❌ No |
| **Creates StudyLoad** | ❌ No |
| **Mutates closed cycle** | ❌ No |
| **Changes enrollment continuity state** | ❌ No (does not touch currentContinuityState) |
| **Risk level** | LOW — creates only one lightweight record, idempotency-guarded |

### 4.2 POST /api/learning-cycles/[id]/close

| Property | Value |
|----------|-------|
| **Path** | `/api/learning-cycles/[id]/close` |
| **Method** | POST |
| **Purpose** | Close an open cycle |
| **Preconditions** | Cycle open; all StudyLoads completed; at least one StudyLoad exists |
| **Side effects** | Sets status='closed' + closedAt; creates CycleSnapshot(cycle_close); updates enrollment.lastActivityAt |
| **Creates ContinuitySignal** | ❌ No |
| **Creates LearningCycle** | ❌ No |
| **Risk level** | LOW — already used successfully in FL-UX-3C |

### 4.3 POST /api/learning-cycles (create new cycle)

| Property | Value |
|----------|-------|
| **Path** | `/api/learning-cycles` |
| **Method** | POST |
| **Purpose** | Create cycle N+1 |
| **Preconditions (P1–P4b)** | P1: enrollment active; P2: currentContinuityState='normal'; P3: no open cycle exists; P4b (for N>1): previous cycle closed + ContinuitySignal(continue) exists |
| **Side effects** | Creates LearningCycle; creates up to 3 StudyLoads (SkillState heuristic); creates CycleSnapshot(cycle_open); updates enrollment.currentCycleId and lastActivityAt |
| **Creates ContinuitySignal** | ❌ No |
| **Creates LearningCycle** | ✅ Yes |
| **Creates StudyLoad** | ✅ Yes — automatically, 1–3 based on SkillState heuristic or fallback |
| **Risk level** | MEDIUM — creates multiple entities automatically. The SkillState-based heuristic determines load titles/count. If SkillStates are absent or improperly configured, fallback creates a single "Initial practice" load. |

### 4.4 POST /api/continuity-signals (generic CRUD)

| Property | Value |
|----------|-------|
| **Path** | `/api/continuity-signals` |
| **Method** | POST |
| **Purpose** | Generic ContinuitySignal CRUD (not the recommended continuity path) |
| **Preconditions** | enrollmentId required; signalType required; referenced entities must exist |
| **Side effects** | Creates one ContinuitySignal |
| **Risk** | LOW but no idempotency guard — could create duplicate signals |
| **Note** | This is the **generic** endpoint. The admin UI uses the **dedicated** `/api/learning-cycles/[id]/continue` which has proper idempotency guards. |

---

## 5. Current Admin UX Audit

### 5.1 Cycle detail page after close

- **"Autorizar continuidad" button:** Visible when `cycle.status === 'closed'` AND no ContinuitySignal with `signalType='continue'` exists for this cycle.
- **Handler:** `handleAuthorizeContinue()` → calls `POST /api/learning-cycles/${cycleId}/continue`.
- **Confirmation dialog:** Yes — "Autorizar continuidad" title, message: "Esta acción registrará la autorización para abrir el siguiente ciclo."
- **Dialog buttons:** "Cancelar" and "Autorizar".
- **Toast on success:** "Continuidad autorizada".
- **After authorization:** Button disappears (because `continuitySignals.some(s => s.signalType === 'continue')` becomes true). The page refreshes via `fetchCycle()`.
- **Does NOT imply cycle N+1 creation:** Dialog copy explicitly says "registrará la autorización para abrir" — it does not say it creates a new cycle.
- **Accidental continuity risk:** LOW — protected by confirmation dialog and idempotency guard.

### 5.2 Post-authorization state on cycle detail

After clicking "Autorizar" (not done in this phase — projected behavior):
- Status badge remains `closed`.
- "Autorizar continuidad" button disappears.
- No new button appears for cycle creation (cycle creation is via the Learning Cycles list page or API).
- All evidence (MC, self-report, decisions) remains visible.

### 5.3 Beta Operations dashboard

- **Open cycles only:** Beta Operations queries `status: { in: ['open', 'in_progress'] }`. Closed cycles are excluded.
- **Mauricio's closed cycle:** Already disappeared from Beta Operations after FL-UX-3C.
- **No "closed but awaiting continuity" section:** The dashboard has no concept of this state. Once closed, a cycle is invisible on Beta Operations.
- **Where next cycle would appear:** If created, a new open cycle would appear under "Ciclos abiertos" and potentially in work sections.
- **Operational gap:** Between cycle close and next cycle creation, the student is invisible on Beta Operations. This is a known limitation, not a bug.

---

## 6. Continuity Operation Semantics

### What the current system does when continuity is authorized:

| Question | Answer |
|----------|--------|
| Creates only a ContinuitySignal? | ✅ **Yes** — exactly one, with signalType='continue', rationale='admin_authorize' |
| Creates a new LearningCycle? | ❌ **No** — separate operation via POST /api/learning-cycles |
| Sets currentCycleId on enrollment? | ❌ **No** — only updated when new cycle is actually created |
| Creates a StudyLoad? | ❌ **No** — StudyLoads are created with the new cycle |
| Copies any evidence? | ❌ **No** |
| Mutates the closed cycle? | ❌ **No** |
| Changes enrollment continuity state? | ❌ **No** — does not touch currentContinuityState |
| Requires prior close? | ✅ **Yes** — cycle.status must be 'closed' |
| Requires no existing continuity signal? | ✅ **Yes** — idempotency guard prevents duplicates |
| Requires evidence-backed CycleDecision? | ❌ **No** — endpoint does not check for CycleDecisions. This is a workflow discipline matter, not an API guard. |
| Requires all loads completed? | ❌ **No** — only checked by the close endpoint, not the continue endpoint. Since the cycle must already be closed, this is transitively satisfied. |

### Two-step summary:

```
Step 1: POST /api/learning-cycles/[id]/continue
  → ContinuitySignal{signalType:'continue', rationale:'admin_authorize'}
  → enrollment.lastActivityAt updated
  → Button disappears from UI
  → No other entities created

Step 2: POST /api/learning-cycles  (SEPARATE, not automatic)
  → Checks P1-P4b (enrollment active, continuity normal, no open cycle, previous closed + signal exists)
  → Creates LearningCycle N+1
  → Creates 1-3 StudyLoads (SkillState heuristic)
  → Creates CycleSnapshot(cycle_open)
  → Updates enrollment.currentCycleId + lastActivityAt
```

The admin must perform both steps independently. There is no automatic cascade.

---

## 7. Product Interpretation

Continuity in the MVP means:

- **Not adaptive automation.** The system does not auto-advance students.
- **Not AI.** No language model or agent makes the decision.
- **Not score-based.** No PAES score or mastery threshold triggers continuity.
- **Manual authorization** that confirms the admin has reviewed evidence and decided the student should proceed to the next learning phase.
- **Preserves evidence and auditability.** The ContinuitySignal is an explicit, timestamped record that the admin authorized the transition. It links to the closed cycle and enrollment.
- **Does not silently create pedagogical content** — the authorization step only creates the signal. Cycle N+1 creation (with its automatic StudyLoad generation) is a separate, visible operation.
- **The two-step separation is a feature, not a bug.** It allows the admin to authorize continuity without immediately committing to the heuristic-generated loads of cycle N+1.

---

## 8. Recommended FL-UX-3D Operation Path

### Recommendation: **Option A — Authorize continuity only**

**Rationale:**

1. The continue endpoint is clean, well-guarded, and idempotency-protected.
2. It creates **only** a ContinuitySignal — no LearningCycle, no StudyLoad, no evidence mutation.
3. The side effects are minimal and fully reversible (signal can be deleted if needed).
4. It does not touch `currentContinuityState`, `currentCycleId`, or any evidence.
5. The admin UI provides a confirmation dialog.
6. The button disappears after authorization, preventing accidental re-execution.
7. Cycle N+1 creation remains a separate, conscious decision in a future phase.

**Why not Option B (do not authorize yet):**
The mechanism is unambiguous and well-documented. There is no behavior to clarify or harden. Delaying adds no safety.

**Why not Option C (authorize + verify new cycle):**
Cycle N+1 creation involves automatic StudyLoad generation via SkillState heuristics. This needs separate audit and scoping before execution.

**Why not Option D (authorize + create StudyLoad):**
StudyLoads are auto-generated by the cycle creation endpoint, not manually created. This conflates two operations and increases risk.

### Recommended next phase:

**FL-UX-3D-OP — Authorize continuity after closed evidence-backed cycle**

Scope: Click "Autorizar continuidad" in admin UI → verify ContinuitySignal created → verify no new cycle → verify evidence intact → document.

---

## 9. Go/No-Go Criteria for Actual Continuity Authorization

Before clicking "Autorizar continuidad":

| # | Criterion | Required |
|---|-----------|----------|
| 1 | Repo clean, no unexpected diffs | ✅ |
| 2 | No schema drift or data loss warnings | ✅ |
| 3 | Mauricio Cycle 1 status: closed | ✅ |
| 4 | closedAt set | ✅ |
| 5 | Evidence-backed CycleDecision visible | ✅ |
| 6 | MC evidence visible (2/8, q1→B, q2→C) | ✅ |
| 7 | Self-report visible ("Me fue bien") | ✅ |
| 8 | No existing ContinuitySignal for this cycle | ✅ |
| 9 | No existing next cycle from this enrollment (or explained) | ✅ |
| 10 | Admin understands: only ContinuitySignal is created | ✅ |
| 11 | Admin understands: no StudyLoad is created | ✅ |
| 12 | Admin understands: no scoring/adaptive/AI involved | ✅ |
| 13 | Idempotency guard understood (409 on duplicate) | ✅ |
| 14 | Rollback path understood (delete signal if needed) | ✅ |
| 15 | Button will disappear after authorization | ✅ |

---

## 10. Risks

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | Accidental new cycle creation | MEDIUM | Cycle creation is a separate POST, not triggered by continue endpoint. Two-step separation prevents this. |
| 2 | Duplicate ContinuitySignal | LOW | Idempotency guard returns 409 if signal already exists. |
| 3 | Duplicate next cycle | LOW | P3 guard prevents opening a cycle if one already exists. P4b checks for closed + signal. Unique constraint on [enrollmentId, cycleNumber]. |
| 4 | Silent StudyLoad creation | NONE | Continue endpoint creates no StudyLoads. Only cycle creation (separate endpoint) generates loads. |
| 5 | Loss of evidence visibility | NONE | Continue endpoint does not touch LearningCycle, StudyLoad, Response, CycleDecision, or any evidence entity. |
| 6 | Enrollment currentCycleId ambiguity | LOW | Continue endpoint does not update currentCycleId. It remains pointing to the closed cycle (or wherever it was before close). Only updated when new cycle is created. |
| 7 | Closed cycle disappearing from operations | KNOWN | Beta Operations only shows open cycles. Closed cycles are invisible. Between close and next cycle open, the student has no operational dashboard visibility. This is a known limitation. |
| 8 | Confusing continuity with pedagogical recommendation | LOW | Dialog copy says "registrará la autorización para abrir el siguiente ciclo" — does not imply content recommendation. |
| 9 | Schema/deploy/data mutation risk | NONE | This phase is audit-only. The authorization phase (3D-OP) only creates a ContinuitySignal. |
| 10 | Abacus auto schema promotion risk | NONE | No deploy planned. No schema changes. |
| 11 | Checkpoint artifacts | LOW | PHASE_LOG.pdf auto-generated, never staged. Known noise. |

---

## 11. Recommended Next Phase

**FL-UX-3D-OP — Authorize continuity after closed evidence-backed cycle**

This phase is safe because:
- The continue endpoint is well-documented and single-purpose.
- It creates only one ContinuitySignal.
- It has idempotency guards.
- It does not create cycles, loads, or mutations.
- The admin UI provides confirmation dialog.
- The operation is fully reversible.

After FL-UX-3D-OP, the recommended sequence is:
- **FL-UX-3E** — Audit cycle N+1 creation (SkillState heuristic, auto-load generation, snapshot behavior).
- **FL-UX-3E-OP** — Create cycle N+1 (if audit confirms safety).

This preserves the two-step separation and gives the admin full visibility into each operation.

---

## 12. Custody Checklist

| Rule | Status |
|------|--------|
| No schema changes | ✅ |
| No deploy | ✅ |
| No data mutation | ✅ (audit only) |
| No automatic decisions | ✅ |
| No scoring | ✅ |
| No AI/agents | ✅ |
| Stop on schema drift / dev→prod promotion warning | ✅ |
| Verify all side effects before and after (in authorization phase) | ✅ planned for FL-UX-3D-OP |
| No secrets printed | ✅ |
| No .env changes | ✅ |
| No .abacus.donotdelete touched | ✅ |
