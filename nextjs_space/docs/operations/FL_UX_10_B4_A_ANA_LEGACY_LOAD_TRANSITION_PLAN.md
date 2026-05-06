# FL-UX-10-B4-A — Ana Legacy Load Transition Plan

**Phase:** FL-UX-10-B4-A  
**Date:** 2026-05-06  
**Baseline:** `d2dc234` (FL-UX-10-B3: audit Ana transition readiness)  
**Type:** documentation-only — no production mutation  

---

## 1. Executive Summary

Ana Beta-M1 / PAES_M1 Cycle 1 needs load-status cleanup before it can be closed. The cycle close endpoint requires all StudyLoads to have `status: 'completed'`. Ana’s Cycle 1 currently has 1 completed, 1 in_progress, and 2 pending loads.

This phase is **planning/readiness only**. No mutation is authorized. The plan defines exactly which loads will be transitioned, the non-pedagogical rationale, guardrails, and the microphase sequence for controlled execution.

---

## 2. Current State

### Ana Cycle 1 (open since 29 abr 2026)

| # | Title | loadType | Status | Evidence |
|---|-------|----------|--------|----------|
| 1 | PAES M1 — Revisión de errores en despeje | practice | **completed** | Self-report: “Me fue bien”; MC: none |
| 2 | PAES M1 — Resolver problemas de planteamiento algebraico | practice | **in_progress** | None |
| 3 | PAES M1 — Practicar ecuaciones lineales | practice | **pending** | None |
| 4 | Initial practice | practice | **pending** | None (fallback) |

| Field | Value |
|-------|-------|
| Decisions | 0 |
| Evaluations | 0 |
| Governance records | 0 |
| Skill states | 0 |

---

## 3. Why Cleanup Is Needed

1. **Cycle close requires all StudyLoads completed.** The close endpoint (`POST /api/learning-cycles/[id]/close`) enforces `cycle.studyLoads.every(l => l.status === 'completed')`. The UI “Cerrar ciclo” button only renders when this condition is met.

2. **Ana Cycle 1 is legacy/stale beta-prep data.** These loads were created during initial platform setup and testing. They do not represent real student work or validated beta evidence.

3. **It should not be used as beta evidence.** The completed load (#1) has a self-report but no MC evidence. The other loads have no evidence at all. None match current content registry entries.

4. **Incomplete/stale loads could confuse `/now`.** If Ana logged in now, she would see 4 loads in mixed states, including an in_progress load she may not recognize and a contentless fallback.

5. **Cleanup enables clean Cycle 2.** Once Cycle 1 is closed, a clean Cycle 2 can be opened with a registry-matched StudyLoad for real beta use.

---

## 4. Loads to Transition Later

### Loads requiring status change (in a later mutation phase)

| # | Title | Current status | Target status | Reason |
|---|-------|---------------|---------------|--------|
| 2 | PAES M1 — Resolver problemas de planteamiento algebraico | in_progress | **completed** | Operational cleanup |
| 3 | PAES M1 — Practicar ecuaciones lineales | pending | **completed** | Operational cleanup |
| 4 | Initial practice | pending | **completed** | Operational cleanup |

### Load NOT requiring change

| # | Title | Current status | Action |
|---|-------|---------------|--------|
| 1 | PAES M1 — Revisión de errores en despeje | completed | **None** — already completed |

---

## 5. Non-Pedagogical Rationale

The following rationale must be used in all subsequent mutation documentation:

> **“These StudyLoad status changes are operational cleanup for legacy/stale beta-prep data. They do not represent student completion, MC evidence, mastery, or pedagogical performance. The purpose is to allow Ana Cycle 1 to be closed/quarantined before starting a clean Cycle 2 beta flow.”**

This rationale:
- Does NOT claim Ana completed these loads through real student work.
- Does NOT claim evidence was reviewed or assessed.
- Does NOT claim any mastery or progress determination.
- Explicitly marks the changes as operational/administrative.

---

## 6. Guardrails

| # | Guardrail | Detail |
|---|-----------|--------|
| G1 | Do not create MC responses | No fake evidence |
| G2 | Do not write/modify self-report | Existing self-report on load #1 remains untouched |
| G3 | Do not edit titles | Load titles remain as-is for audit trail |
| G4 | Do not delete StudyLoads | All loads preserved for historical record |
| G5 | Do not claim Ana completed these loads | Status change is operational, not evidence-backed |
| G6 | Do not expose Ana to Cycle 1 after cleanup | Student interacts only with Cycle 2+ |
| G7 | Do not create CycleDecision in same phase as load transitions | Separate microphases for load transitions (B4-B) and decision (B4-C) |
| G8 | Do not close Cycle 1 in same phase as load transitions | Separate microphase for close (B4-D) |
| G9 | Document exact before/after status for each load | Later mutation phase must record pre-state and post-state per load |

---

## 7. Proposed Microphases

| Phase | Name | Type | Description |
|-------|------|------|-------------|
| **FL-UX-10-B4-B** | Transition Ana legacy loads to completed | Human-mediated admin mutation | Change loads #2, #3, #4 from in_progress/pending to completed via admin inline status select |
| **FL-UX-10-B4-C** | Create Ana non-pedagogical cleanup CycleDecision | Human-mediated admin mutation | Create CycleDecision type `hold` with non-pedagogical rationale on open Cycle 1 |
| **FL-UX-10-B4-D** | Close Ana Cycle 1 as legacy/stale | Human-mediated admin mutation | Close Cycle 1 via “Cerrar ciclo” button (all loads now completed) |
| **FL-UX-10-B5** | Open Ana clean beta Cycle 2 | Human-mediated admin mutation | Open new cycle; observe fallback StudyLoad |
| **FL-UX-10-B6** | Curate Ana Cycle 2 registry-matched StudyLoad | Human-mediated admin mutation | Rename fallback to registry activity |

### Why separate microphases?

- Each mutation is independently documentable and reversible in principle.
- If any step fails or reveals unexpected state, the operator can pause without having committed to later steps.
- Evidence trail is cleaner: load transitions, decision, and close are distinct recorded events.

---

## 8. Go/No-Go for FL-UX-10-B4-B

### GO criteria

| # | Criterion |
|---|-----------|
| G1 | Human owner accepts this is cleanup, not evidence |
| G2 | Exact 3 loads (#2, #3, #4) are visible and match expected statuses (in_progress, pending, pending) |
| G3 | Admin UI allows status transition via inline select |
| G4 | Documentation clearly labels changes as operational cleanup |
| G5 | No student has interacted with Ana’s Cycle 1 since audit |

### NO-GO criteria

| # | Criterion |
|---|-----------|
| NG1 | Any load state differs from expected (e.g., load #2 is no longer in_progress) |
| NG2 | UI requires student-like completion flow (not just admin status change) |
| NG3 | Status change would create ambiguous or false evidence |
| NG4 | Ana has interacted with Cycle 1 since the FL-UX-10-B1 audit |
| NG5 | Human owner does not approve the cleanup rationale |

---

## 9. Final Verdict

### ANA_LEGACY_LOAD_TRANSITION_READY_FOR_CONTROLLED_MUTATION_PLANNING

| Dimension | Status |
|-----------|--------|
| Load transition plan defined | ✅ |
| Non-pedagogical rationale documented | ✅ |
| Guardrails specified | ✅ |
| Microphase sequence defined | ✅ |
| Go/no-go criteria defined | ✅ |
| Ready for student use | **NO** |
| Ready for mutation | **Pending human approval of B4-B** |

---

## Confirmed Non-Actions (this phase)

- Documentation-only. No production mutation.
- No admin/student UI operation.
- No account/password action.
- No StudyLoad status change, creation, deletion, or editing.
- No CycleDecision. No CycleEvaluation.
- No cycle close. No continuity. No new cycle.
- No code/schema/deploy/content registry changes.
- No SQL. No Prisma CLI. No `.env` access.
- No secrets inspected or printed.
- No Mauricio, Bruno, or Test Now data touched.
