# FL-UX-10-B2 — Choose Second Student Path and Define Ana Cleanup/Transition Plan

**Phase:** FL-UX-10-B2  
**Date:** 2026-05-06  
**Baseline:** `8534db0` (FL-UX-10-B1: audit second student candidate states)  
**Type:** documentation-only — no production mutation  

---

## 1. Executive Summary

**Ana Beta-M1 / PAES_M1** has been selected as the second-student planning candidate for internal beta replication. This selection is based on the FL-UX-10-B1 audit findings:

- Ana’s program (PAES_M1) has 4 registry-matched activities available.
- Bruno Beta-L1 remains **blocked** until PAES_L1 registry content exists (currently 0 activities).
- Ana’s current state (open Cycle 1 with mixed legacy/stale loads) requires a cleanup/transition plan before any student interaction.

**No mutation is authorized in this phase.** This document defines the transition plan only. Execution requires explicit approval in subsequent phases.

---

## 2. Decision Rationale

| Factor | Ana Beta-M1 | Bruno Beta-L1 |
|--------|-------------|---------------|
| Program | PAES_M1 (same as Mauricio) | PAES_L1 (different program) |
| Registry content | 4 activities available | 0 activities — **hard blocker** |
| Content risk | Low — registry validated with Mauricio | High — no registry content exists |
| Replication value | Same-program transfer validation | Cross-program transfer validation |
| Cleanup complexity | Medium — 1 open cycle, 4 mixed loads | Medium — 1 open cycle, 3 mixed loads |
| Operational burden | Lower — no content creation needed | Higher — content creation + cleanup |

**Ana wins on content readiness**, which is the decisive factor. Same-program transfer (PAES_M1) is the most direct replication of the Mauricio-validated loop.

---

## 3. Ana Current-State Problem

### Cycle 1 (open since 29 abr 2026)

| # | Title | loadType | Status | Evidence | Registry match |
|---|-------|----------|--------|----------|----------------|
| 1 | PAES M1 — Revisión de errores en despeje | practice | completed | Self-report: “Me fue bien”; MC: none | Legacy — not in current registry |
| 2 | PAES M1 — Resolver problemas de planteamiento algebraico | practice | in_progress | None | Legacy — not in current registry |
| 3 | PAES M1 — Practicar ecuaciones lineales | practice | pending | None | Legacy — not in current registry |
| 4 | Initial practice | practice | pending | None | Fallback |

**Decisions:** 0 | **Evaluations:** 0 | **Governance records:** 0 | **Skill states:** 0

### Why direct student use is unsafe

1. **Confusing `/now` view.** Ana would see 4 loads in mixed states, including an in_progress load she may not recognize and a fallback “Initial practice” with no content.
2. **No MC evidence exists.** The completed load has a self-report but no MC responses — this is a legacy artifact, not a validated beta evidence point.
3. **In-progress load creates ambiguity.** A load stuck in `in_progress` without context would confuse both the student and the admin reviewing evidence.
4. **Poor beta signal.** Any student action in this state would mix legacy artifacts with real beta evidence, making the replication unreliable.

---

## 4. Cleanup/Transition Options

### Option A: Preserve Cycle 1 and curate a pending load

- **Approach:** Select one of the pending loads (or the fallback) and curate it with registry-matched content. Leave the rest as-is.
- **Pros:** Minimal mutation. No cycle close needed.
- **Cons:** Student would still see the completed legacy load, the in_progress load, and the fallback on `/now`. Confusing and noisy. Mixed legacy + beta evidence in the same cycle.
- **Verdict:** ❌ **Not recommended** unless the UI can control visible priority and hide non-active loads. Currently it cannot.

### Option B: Artificially complete/close legacy loads

- **Approach:** Mark the in_progress and pending loads as completed or cancelled to “clear” them, then add a clean curated load.
- **Pros:** Cycle 1 stays open. Technically simpler.
- **Cons:** Pollutes evidence. Creates fake completion records. Admin evidence review would show misleading data. Violates the evidence-backed protocol established with Mauricio.
- **Verdict:** ❌ **Not recommended.** Fabricating evidence state violates beta integrity.

### Option C: Close/quarantine Ana Cycle 1 as legacy/stale, then open clean Cycle 2

- **Approach:**
  1. Create a CycleDecision on Cycle 1 with type `hold` or `redirect` and rationale explicitly marking it as legacy/stale cleanup (not pedagogical performance).
  2. Close Cycle 1.
  3. Open Cycle 2 as a clean beta cycle.
  4. Curate Cycle 2’s fallback StudyLoad with registry-matched content.
  5. Student interacts only with Cycle 2.
- **Pros:** Clean separation between legacy and beta data. Cycle 2 starts fresh with no confusing loads. Evidence chain is clear. Follows the same validated workflow as Mauricio.
- **Cons:** Requires a CycleDecision on Cycle 1 (must be explicitly non-pedagogical). Requires cycle close + new cycle open (more admin steps).
- **Verdict:** ✅ **Preferred.** Cleanest path. Preserves evidence integrity. Follows validated workflow.

### Option D: Create a new clean Ana-like student account

- **Approach:** Create a fresh student account (e.g., “Ana2 Beta-M1”) with no legacy data. Enroll in PAES_M1. Start from Cycle 1.
- **Pros:** Zero stale data risk. Cleanest possible start.
- **Cons:** Original Ana account is abandoned. Account proliferation. Doesn’t test the transition/cleanup path that real users might face. Requires new account creation + password protocol.
- **Verdict:** ⚠️ **Alternative** if Option C cleanup is too risky or if the operator prefers a completely fresh start.

---

## 5. Recommended Path

### Option C: Close/quarantine Cycle 1, then open clean Cycle 2

**Rationale:**
- Treats Ana’s Cycle 1 as legacy/stale without fabricating evidence.
- Cycle 2 starts clean, matching the validated Mauricio workflow.
- The CycleDecision on Cycle 1 is explicitly documented as operational cleanup, not pedagogical.
- All beta evidence will be in Cycle 2+, clearly separated from legacy.

### Suggested phase sequence

| Phase | Name | Type | Description |
|-------|------|------|-------------|
| FL-UX-10-B3 | Ana transition readiness audit | Read-only admin observation | Confirm Cycle 1 state matches audit; verify account access (human-mediated) |
| FL-UX-10-B4 | Close/quarantine Ana legacy Cycle 1 | Human-mediated admin mutation | Create legacy CycleDecision + close Cycle 1 |
| FL-UX-10-B5 | Open Ana clean beta Cycle 2 | Human-mediated admin mutation | Open new cycle; observe fallback StudyLoad |
| FL-UX-10-B6 | Curate Ana first registry-matched StudyLoad | Human-mediated admin mutation | Rename fallback to registry activity |
| FL-UX-10-B7+ | Execute Ana student flow | Phased human-mediated operations | Visibility → start → MC → completion → review → decision → close |

---

## 6. Safeguards Before Mutating Ana

| # | Safeguard | Detail |
|---|-----------|--------|
| S1 | Do not fabricate MC evidence | No fake responses or completions |
| S2 | Do not complete in_progress load on behalf of student | Load #2 stays as-is in Cycle 1 |
| S3 | Do not delete data unless explicitly approved | Legacy data is quarantined, not destroyed |
| S4 | CycleDecision for Cycle 1 closure must be non-pedagogical | Rationale must state: “Legacy/stale data cleanup — not a pedagogical performance assessment” |
| S5 | Do not expose stale/fallback loads to Ana | Student interacts only after Cycle 2 is curated |
| S6 | Human owner manages account access/password | Agent never sees credentials |
| S7 | Document every mutation step | Each phase gets its own operation doc |

---

## 7. Content Selection

### Available PAES_M1 registry activities

| # | contentKey | Title (from registry) | Used by Mauricio? |
|---|-----------|----------------------|-------------------|
| 1 | `paes_m1_linear_equations_basic` | PAES M1 — Ecuaciones lineales básicas | Cycles 1–3 |
| 2 | `paes_m1_linear_equations_word_problems` | PAES M1 — Problemas de planteamiento con ecuaciones lineales | No |
| 3 | `paes_m1_linear_equations_reinforcement` | PAES M1 — Refuerzo de ecuaciones lineales | No |
| 4 | `paes_m1_linear_functions_basic` | PAES M1 — Funciones lineales básicas | Cycle 4 |

### Recommendation

- **Avoid “Initial practice”** — always curate before student use.
- **Select an activity not yet used by Mauricio** to test content variety. Candidates:
  - `paes_m1_linear_equations_word_problems` (word problems — different skill focus)
  - `paes_m1_linear_equations_reinforcement` (reinforcement — suitable if we want a lower-difficulty entry)
- **Exact title selection** deferred to FL-UX-10-B6 (curation phase).

---

## 8. Bruno Disposition

- Bruno Beta-L1 / PAES_L1 remains **strategically useful** for cross-program transfer validation.
- **Blocked** until PAES_L1 registry content exists (currently 0 activities).
- **Do not mutate Bruno** in any near-term phase.
- Bruno should be revisited after:
  1. Ana’s second-student replication is complete, AND
  2. PAES_L1 content has been added to the registry.

---

## 9. Decision Gate

### GO to mutation if:

| # | Criterion |
|---|-----------|
| G1 | Ana transition path (Option C) is approved by operator |
| G2 | Account protocol is ready (human owner can access Ana’s account) |
| G3 | Registry-matched content is selected for Cycle 2 |
| G4 | Legacy Cycle 1 is explicitly marked as non-beta-evidence |
| G5 | CycleDecision rationale for Cycle 1 closure is non-pedagogical |

### NO-GO if:

| # | Criterion |
|---|-----------|
| NG1 | `/now` would expose stale in_progress/fallback loads to Ana |
| NG2 | Cycle 1 closure would create misleading pedagogical evidence |
| NG3 | Account/content readiness is unclear |
| NG4 | Operator does not approve Option C transition path |

---

## 10. Final Verdict

### ANA_SELECTED_FOR_SECOND_STUDENT_PLANNING

- Ana Beta-M1 is the chosen candidate for second-student beta replication.
- **NOT_READY_FOR_MUTATION** — transition plan is defined but not yet approved or executed.
- **NEXT_STEP_REQUIRES_TRANSITION_READINESS** — FL-UX-10-B3 must confirm Cycle 1 state and account access before any mutation.

| Dimension | Status |
|-----------|--------|
| Candidate selected | Ana Beta-M1 / PAES_M1 |
| Transition path defined | Option C: close legacy Cycle 1, open clean Cycle 2 |
| Content readiness | 4 PAES_M1 registry activities available |
| Mutation authorized | **No** — requires transition readiness confirmation |
| Bruno disposition | Blocked; revisit after Ana replication + PAES_L1 content |

---

## Confirmed Non-Actions (this phase)

- Documentation-only. No production mutation.
- No admin UI operation. No student UI operation.
- No account/password action.
- No cycle/load/decision/evaluation/continuity changes.
- No code/schema/content registry changes.
- No SQL. No Prisma CLI. No `.env` access.
- No secrets inspected or printed.
- No Mauricio, Bruno, Ana, or Test Now data touched.
