# FL-UX-3A — Manual Pedagogical Continuity Readiness Audit

**Project:** E360 / Bexauri — Intelligent Tutoring Platform  
**Date:** 2026-04-30  
**Phase:** FL-UX-3A  
**Status:** Audit / documentation only — no implementation  
**Author:** Product Architecture & Custody Lead  

---

## 1. Executive Summary

**FL-UX-2 closed the evidence capture/review loop.** Bexauri can now:
- Capture MC answers from students during an interactive in-app activity.
- Store them as `mc_submission` responses.
- Display MC evidence + self-report to the admin on the cycle detail page.

**FL-UX-3 should close the manual continuity loop:**
evidence → manual CycleDecision → cycle close → continuity authorization → next load or next cycle.

**This audit does not implement or mutate anything.** It inspects the current repo to determine whether the existing data model, API endpoints, and admin UX are ready to support the manual continuity loop, and recommends the safest phase split for FL-UX-3.

**Key finding:** The infrastructure for manual continuity **already exists**. The cycle detail page already has:
- Inline CycleDecision creation (select type + "New Decision" button)
- Edit/delete decision UI with rationale field
- "Cerrar ciclo" button with backend guards
- "Autorizar continuidad" button with backend guards

The main gap is that decisions are created without explicit reference to the MC evidence visible on the same page. The admin can already create a decision, but there is no structural link between the decision rationale and the evidence. This is acceptable for manual operation — the admin sees the evidence, then creates a decision informed by what they see.

---

## 2. Current Validated Evidence Loop

### Student Flow (validated live with Mauricio Beta-M1)
```
/now → Empezar (start StudyLoad)
     → Ver actividad (view MC activity)
     → Select answers (radio buttons)
     → Enviar respuestas (submit mc_submission)
     → Return to /now
     → Terminar (complete with self-report)
```

### Admin Flow (validated live on production)
```
Beta Operations → Ver ciclo
  → Cycle detail shows:
    - StudyLoad: "PAES M1 — Problemas con ecuaciones lineales" (completed)
    - Autorreporte: Me fue bien
    - Respuestas de la actividad:
      - Estado: Respuestas enviadas
      - Respondidas: 2 de 8
      - Correctas: 2 de 2 (answer key present)
      - Item table: q1→B ✓, q2→C ✓
      - Partial note: "2 de 8 respuestas registradas."
```

### Reference Scenario: Mauricio Beta-M1
| Field | Value |
|-------|-------|
| Student | Mauricio Beta-M1 |
| Program | PAES Matemática M1 (PAES_M1) |
| Cycle | Cycle 1 (open) |
| StudyLoad with MC | PAES M1 — Problemas con ecuaciones lineales |
| MC responses | 2 of 8 submitted |
| Self-report | Me fue bien |
| Existing decisions | 2 × advance (created in earlier phases) |
| Cycle status | open |
| All loads completed | Yes (3/3 completed) |

---

## 3. Current Data Model Audit

### Relevant Entities and Relationships

```
Student
  └── StudentProgramInstance (enrollment)
        ├── currentCycleId: String?
        ├── currentContinuityState: String (default "normal")
        ├── LearningCycle[]
        │     ├── status: String ("open" | "closed")
        │     ├── closedAt: DateTime?
        │     ├── CycleDecision[]
        │     │     ├── decisionType: String (advance|reinforce|hold|redirect)
        │     │     ├── rationale: String?
        │     │     └── CycleDecisionSkill[] (links decision to specific skills)
        │     ├── StudyLoad[]
        │     │     ├── status: String (pending|released|in_progress|completed)
        │     │     └── TutoringSession[]
        │     │           └── Response[]
        │     │                 ├── responseType: String ("answer" | "mc_submission")
        │     │                 └── content: String? (JSON for mc_submission)
        │     ├── CycleEvaluation[]
        │     ├── CycleSnapshot[]
        │     └── ContinuitySignal[]
        ├── SkillState[]
        ├── Diagnostic[]
        └── ContinuitySignal[]
```

### Where Data Lives

| Data Type | Storage Location |
|-----------|------------------|
| MC evidence (answers, answer key, items) | `Response.content` (JSON string) where `responseType = "mc_submission"` |
| Self-report | `Response.content` (string) where `responseType = "answer"` |
| Manual decisions | `CycleDecision.decisionType` + `CycleDecision.rationale` |
| Cycle state | `LearningCycle.status` ("open" or "closed") + `closedAt` |
| Continuity state | `ContinuitySignal.signalType` ("continue") linked to cycle |
| Enrollment continuity | `StudentProgramInstance.currentContinuityState` |
| Closing record | `CycleSnapshot` with `snapshotType = "cycle_close"` |

---

## 4. Current Endpoint Audit

### CycleDecision Endpoints

| Endpoint | Method | Purpose | Read/Write | FL-UX-3 Safe? | Risks |
|----------|--------|---------|------------|---------------|-------|
| `/api/cycle-decisions` | GET | List all decisions, filter by learningCycleId | Read | ✅ Safe | None |
| `/api/cycle-decisions` | POST | Create decision with `learningCycleId`, `decisionType`, optional `rationale` | Write | ✅ Safe for manual use | Closed-cycle guard exists. No rationale required — admin must remember to add it manually. |
| `/api/cycle-decisions/[id]` | PUT | Update decision type and/or rationale | Write | ✅ Safe | Closed-cycle guard exists. |
| `/api/cycle-decisions/[id]` | DELETE | Delete decision | Write | ✅ Safe | Closed-cycle guard exists. |

**Validation:** `decisionType` is validated against canonical set: `advance`, `reinforce`, `hold`, `redirect`.

### LearningCycle Close Endpoint

| Endpoint | Method | Purpose | Read/Write | FL-UX-3 Safe? | Risks |
|----------|--------|---------|------------|---------------|-------|
| `/api/learning-cycles/[id]/close` | POST | Atomically close cycle: set status="closed", stamp closedAt, create CycleSnapshot("cycle_close"), advance lastActivityAt | Write | ✅ Safe with guards | Guards: cycle must be open, must have loads, all loads must be completed. **Does NOT require a CycleDecision to exist.** |

**Critical observation:** The close endpoint does **not** require a CycleDecision. This means an admin could theoretically close a cycle without recording a decision. For FL-UX-3, the recommended workflow is: create decision first, then close. But the API does not enforce this order.

### LearningCycle Continue Endpoint

| Endpoint | Method | Purpose | Read/Write | FL-UX-3 Safe? | Risks |
|----------|--------|---------|------------|---------------|-------|
| `/api/learning-cycles/[id]/continue` | POST | Emit ContinuitySignal(signalType="continue") for a closed cycle. Idempotent (rejects if signal already exists). Advances lastActivityAt. | Write | ✅ Safe with guards | Guards: cycle must be closed. Does NOT create cycle N+1 — that's a separate POST to `/api/learning-cycles`. |

### LearningCycle Creation (for cycle N+1)

| Endpoint | Method | Purpose | Read/Write | FL-UX-3 Safe? | Risks |
|----------|--------|---------|------------|---------------|-------|
| `/api/learning-cycles` | POST | Create new cycle. Auto-calculates cycleNumber. | Write | ⚠️ Requires preconditions | P4a: first cycle needs completed diagnostic. P4b: subsequent cycles need previous cycle closed + ContinuitySignal("continue"). |

### StudyLoad Endpoints

| Endpoint | Method | Purpose | Read/Write | FL-UX-3 Safe? | Risks |
|----------|--------|---------|------------|---------------|-------|
| `/api/study-loads` | POST | Create StudyLoad in a cycle | Write | ⚠️ Guards exist | Rejects if cycle is closed. |
| `/api/study-loads/[id]/start` | POST | Start a StudyLoad (pending→in_progress) | Write | Not needed for FL-UX-3 close flow | Student-facing |
| `/api/study-loads/[id]/complete` | POST | Complete a StudyLoad with self-report | Write | Not needed for FL-UX-3 close flow | Student-facing |
| `/api/study-loads/[id]/responses` | POST | Submit MC responses | Write | Not needed for FL-UX-3 close flow | Student-facing |

### Cycle Detail Read Layer

| Endpoint | Method | Purpose | Read/Write | FL-UX-3 Safe? | Risks |
|----------|--------|---------|------------|---------------|-------|
| `/api/learning-cycles/[id]` | GET | Full cycle detail with enrollment, decisions, loads, evaluations, sessions, responses, continuity signals, snapshots | Read | ✅ Safe | Already includes `updatedAt` on responses (FL-UX-2D). |

---

## 5. Current Admin UX Audit

### Beta Operations
- Lists cycles needing attention ("Necesita atención / revisión").
- Shows Mauricio Beta-M1 · PAES_M1 · Ciclo 1 with "Ver ciclo" link.
- Shows decision count badge.
- Does NOT show evidence details — requires navigating into cycle detail.

### Admin Cycle Detail Page (`/admin/learning-cycles/[id]`)

#### Decision Creation UI
- **Already exists.** Inline select with 4 options (advance, reinforce, hold, redirect) + "New Decision" button.
- Decision is created with `decisionType` only — **rationale is NOT provided at creation time**.
- After creation, admin can click Edit (pencil icon) to open a dialog with `decisionType` select and `rationale` text field.
- Decision type can also be changed inline via a colored select badge.
- **Gap:** Rationale cannot be added at creation time — requires a separate edit step. This is a minor UX friction but not a blocker.

#### Close Cycle UI
- **"Cerrar ciclo" button already exists** (Phase DS).
- Rendered only when: `cycle.status === 'open'` AND `studyLoads.length > 0` AND all loads are `completed`.
- Opens confirmation dialog: "Esta acción cerrará el ciclo actual."
- Calls `POST /api/learning-cycles/[id]/close`.
- **Guard is correct and safe.**

#### Continue/Authorize Continuity UI
- **"Autorizar continuidad" button already exists** (Phase DT).
- Rendered only when: `cycle.status === 'closed'` AND no ContinuitySignal with `signalType='continue'` exists.
- Opens confirmation dialog.
- Calls `POST /api/learning-cycles/[id]/continue`.
- **Guard is correct and safe.**

#### Evidence Visibility
- **MC evidence is visible** (FL-UX-2D) for each StudyLoad with `mc_submission`.
- **Self-report is visible** (Phase FJ) for each StudyLoad with `answer` responseType.
- Evidence is displayed ABOVE the Decisions section in the page layout.
- **Admin can see evidence before creating a decision.** ✅

### Key UX Audit Findings

| Question | Answer |
|----------|--------|
| Can admin create a decision based on MC evidence? | **Yes** — evidence is visible, decision creation is on the same page. But no structural link between them. |
| Can admin close the cycle? | **Yes** — guarded button exists, backend guards are correct. |
| Does UI guard close cycle correctly? | **Yes** — requires all loads completed, cycle open. |
| Does admin have enough evidence visible before decision/close? | **Yes** — self-report + MC evidence are both visible before the Decisions section. |
| Is there risk of confusing evidence with PAES score? | **Low** — FL-UX-2D shows "Correctas: N de M" which is raw count, not PAES scale score. Label says "Correctas" not "Puntaje". But admin should be aware this is item-level correctness, not a PAES standardized score. |
| Does close require a decision? | **No** — close endpoint has no decision precondition. This is a workflow gap (admin could close without recording a decision). |

---

## 6. Manual Continuity Concept

The intended manual flow for FL-UX-3:

```
1. Admin reviews evidence
   └── Navigate to cycle detail via Beta Operations → "Ver ciclo"
   └── See: self-report, MC evidence (items, correctness, partial count)

2. Admin creates CycleDecision manually
   └── Select decision type: advance / reinforce / hold / redirect
   └── Edit to add rationale referencing the evidence
   └── Example: "2/8 MC responses, both correct. Student reports 'Me fue bien'.
       Partial completion suggests incomplete engagement. Decision: hold."

3. Admin closes cycle (only if conditions are met)
   └── All StudyLoads must be completed
   └── Click "Cerrar ciclo" → confirmation dialog
   └── Backend atomically: close cycle + create CycleSnapshot + advance lastActivityAt

4. Admin authorizes continuity
   └── After cycle is closed, "Autorizar continuidad" button appears
   └── Click → creates ContinuitySignal(signalType='continue')
   └── This satisfies P4b precondition for cycle N+1

5. Next load/cycle is prepared manually
   └── Admin creates new cycle (POST /api/learning-cycles with enrollmentId)
   └── Admin creates new StudyLoad(s) in the new cycle
   └── Student sees new load(s) on /now

6. No scoring/adaptive automation
   └── No PAES score calculation
   └── No automatic decision based on correctness ratio
   └── No automatic load generation
   └── All decisions are human-made
```

---

## 7. Proposed FL-UX-3 Phase Split

### FL-UX-3B — Manual evidence-backed CycleDecision for Mauricio
- **Type:** Data operation (admin creates a real CycleDecision via the existing UI).
- **Action:** Admin navigates to Mauricio's Cycle 1, reviews the MC evidence and self-report, creates a new CycleDecision with a rationale that explicitly references the evidence.
- **Not included:** No cycle close. No continuity authorization.
- **Verification:** Confirm the decision appears in the cycle detail page with the rationale text.
- **Risk level:** Low — uses existing endpoints and UI. Only creates one record.

### FL-UX-3C — Cycle close validation after evidence-backed decision
- **Type:** Admin operation (close the cycle via the existing UI).
- **Precondition:** FL-UX-3B completed (evidence-backed decision exists).
- **Action:** Admin clicks "Cerrar ciclo" on Mauricio's Cycle 1.
- **Verification:** Cycle status changes to "closed", closedAt is stamped, CycleSnapshot is created, evidence remains visible.
- **Risk level:** Low-medium — cycle state transition is irreversible. Evidence visibility after close must be confirmed.

### FL-UX-3D — Continuity readiness / next load or next cycle
- **Type:** Admin operation + product decision.
- **Precondition:** FL-UX-3C completed (cycle is closed).
- **Action:** Admin authorizes continuity, then decides whether the next step is:
  - A new cycle (Cycle 2) for the same enrollment, OR
  - Additional load(s) in a new cycle.
- **Not included:** No automation, no scoring-based routing.
- **Risk level:** Medium — involves creating new cycle and potentially new StudyLoads.

### FL-UX-3E — Documentation of full manual continuity loop
- **Type:** Documentation only.
- **Action:** Document the complete validated flow: evidence → decision → close → continuity → next step.
- **Purpose:** Close the FL-UX-3 arc with a comprehensive record.

---

## 8. Go/No-Go Criteria for FL-UX-3B

Before creating a manual CycleDecision for Mauricio:

| Criterion | Status |
|-----------|--------|
| Repo is clean (git status) | Must verify |
| No schema drift between dev and prod | Must verify (no schema changes since last deploy) |
| Mauricio's cycle is identified unambiguously | ✅ Cycle 1, PAES_M1, open |
| Cycle is still open | ✅ Status = "open" as of FL-UX-2D-ADMIN-VERIFY |
| All StudyLoads completed or state understood | ✅ 3/3 completed |
| MC evidence is visible on cycle detail | ✅ Verified live in FL-UX-2D-ADMIN-VERIFY |
| Self-report is visible | ✅ "Me fue bien" |
| No automatic scoring will be triggered | ✅ No scoring logic exists |
| decisionType will be chosen manually by admin | Must be decided before execution |
| Rationale will explicitly reference evidence | Must be written before execution |
| No cycle close action in this phase | Strict constraint |
| CycleDecision creation endpoint is guarded | ✅ Rejects for closed cycles |

**Recommendation:** FL-UX-3B is **safe to proceed** once repo state is verified and decisionType + rationale are pre-defined.

---

## 9. Go/No-Go Criteria for FL-UX-3C

Before closing Mauricio's Cycle 1:

| Criterion | Status |
|-----------|--------|
| All StudyLoads in the cycle are completed | ✅ 3/3 completed |
| At least one evidence-backed decision exists | Requires FL-UX-3B completion |
| Admin confirms close action | Manual confirmation via UI dialog |
| Close endpoint behavior is understood | ✅ Atomic: close + CycleSnapshot + lastActivityAt |
| Evidence remains visible after close | Must verify (responses are on TutoringSession, not on cycle — should survive close) |
| No next cycle/load creation in same phase | Strict constraint |
| Rollback is NOT possible (close is irreversible) | ✅ Understood — no status rollback endpoint exists |
| CycleSnapshot will be created automatically | ✅ Close endpoint creates it atomically |
| Decisions can no longer be edited after close | ✅ UI and API guard for closed cycles |

**Recommendation:** FL-UX-3C is **safe to proceed** after FL-UX-3B, provided evidence visibility after close is verified.

---

## 10. Decision Rationale Template

### Template
```
Student completed [load title], submitted [N/M] MC responses, and reported
"[self-report]". Evidence suggests [human interpretation]. Manual decision:
[advance/reinforce/hold/redirect]. Next recommended action: [manual next step].
```

### Example Rationales

#### Advance
```
Student completed "PAES M1 — Problemas con ecuaciones lineales", submitted
2/8 MC responses (both correct), and reported "Me fue bien". Although only
2 of 8 items were answered, both were correct and the student reports
confidence. The partial completion may reflect a time constraint rather than
lack of understanding. Manual decision: advance. Next recommended action:
assign a new practice load with a broader item set to confirm the skill.
```

#### Reinforce
```
Student completed "PAES M1 — Problemas con ecuaciones lineales", submitted
2/8 MC responses (both correct), and reported "Me fue bien". Despite the
student's positive self-report, only 2 of 8 items were completed. This is
insufficient evidence to confirm skill mastery. Manual decision: reinforce.
Next recommended action: assign a similar practice load with the same skill
focus to generate more evidence.
```

#### Hold
```
Student completed "PAES M1 — Problemas con ecuaciones lineales", submitted
2/8 MC responses (both correct), and reported "Me fue bien". Very low
completion rate (25%) despite self-reported confidence. Decision deferred
pending review with student. Manual decision: hold. Next recommended action:
schedule a brief check-in to understand why only 2 of 8 items were completed
before deciding on next load.
```

---

## 11. Risks

### Operational Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Closing cycle too early** (before admin has reviewed evidence) | Medium | FL-UX-3 workflow: create decision FIRST, then close. But API does not enforce this order. |
| **Creating decision without enough evidence** | Low | Admin can see all evidence before deciding. But the 2/8 partial completion is genuinely ambiguous. |
| **Confusing correctCount with PAES score** | Medium | FL-UX-2D labels it "Correctas" not "Puntaje PAES". Admin training needed to understand this is item-level, not standardized. |
| **Overinterpreting 2 of 8 partial answers** | Medium | 2/8 is insufficient for statistical confidence. Admin must be aware of this. Both correct answers could be luck (25% chance per item with 4 options). |
| **Losing evidence visibility after close** | Low | Evidence lives in Response → TutoringSession → StudyLoad → LearningCycle. Close only changes cycle status — does not delete child records. Must verify in FL-UX-3C. |
| **Next load/cycle ambiguity** | Low | P4b precondition chain (close → continue signal → new cycle) is well-guarded. |

### Technical Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Schema/deploy/data mutation risk** | High if violated | FL-UX-3B/3C use existing endpoints only — no schema changes needed. |
| **Abacus auto schema promotion risk** | Medium | FL-UX-2D-ADMIN-VERIFY triggered one promotion (CycleEvaluation). Future deploys may trigger more if dev schema drifts. Monitor deploy output. |
| **Custody risk from checkpoint artifacts** | Low | Known Abacus noise (`.abacus.donotdelete`). Never stage or commit. |
| **Decision rationale lost** | Low | rationale field is nullable — admin MUST remember to edit and add it. No enforcement. |

---

## 12. Recommended Next Phase

### FL-UX-3B — Manual Evidence-Backed CycleDecision for Mauricio

**Safe to proceed.** The current UI and API fully support creating a manual CycleDecision:

1. Navigate to Mauricio's Cycle 1 on the admin cycle detail page.
2. Review the MC evidence (2/8 responses, both correct) and self-report ("Me fue bien").
3. Select a decision type (recommend: `reinforce` or `hold` given the 2/8 partial evidence).
4. Create the decision using the existing inline UI.
5. Edit the decision to add a rationale that explicitly references the evidence.
6. Document the result.

**No code changes needed.** FL-UX-3B is a data operation phase using existing UI and API.

**Alternate phase (if FL-UX-3B is deferred):** If the team decides the existing 2 advance decisions already suffice and wants to test the close flow instead, FL-UX-3C could proceed directly. However, those advance decisions were created in earlier phases without evidence reference — creating a new evidence-backed decision is recommended for the pedagogical integrity of the continuity loop.

---

## 13. Custody Checklist

| Rule | Status |
|------|--------|
| No schema changes | ✅ Not needed |
| No deploy unless necessary | ✅ FL-UX-3B uses existing deployed UI |
| No data mutation unless explicitly approved | ⚠️ FL-UX-3B will create one CycleDecision — requires explicit approval |
| No automatic decisions | ✅ All manual |
| No scoring | ✅ No scoring logic exists or will be added |
| No AI/agents | ✅ Not applicable |
| No Codex for sensitive phases yet | ✅ Per CODEX_ABACUS_WORKLOAD_BALANCING_PROTOCOL_v1 — FL-UX-3 is Abacus territory |
| Stop on any schema drift/dev→prod promotion warning | ✅ Safety rule active |
| PHASE_LOG continuity | ✅ Every sub-phase will be documented |
| Rationale must reference evidence | ✅ Template provided |
| Close is irreversible — confirm before proceeding | ✅ Documented in FL-UX-3C go/no-go |

---

*End of audit document.*
