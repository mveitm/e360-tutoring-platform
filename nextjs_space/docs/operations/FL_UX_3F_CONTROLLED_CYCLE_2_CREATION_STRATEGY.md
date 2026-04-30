# FL-UX-3F — Controlled Cycle 2 Creation Strategy

**Date:** 2026-04-30  
**Phase type:** Strategy / audit / documentation only  
**Primary case:** Mauricio Beta-M1, PAES_M1, Cycle 1 closed, continuity authorized  
**Scope:** Define the safest strategy for creating Cycle 2 with a registry-matched interactive StudyLoad  
**Mutation:** None

---

## 1. Executive Summary

Mauricio Beta-M1 / PAES_M1 / Cycle 1 is **closed** and **continuity has been authorized**. The platform is structurally ready for Cycle 2 creation.

However, FL-UX-3E revealed that `POST /api/learning-cycles` **auto-generates 1–3 StudyLoads** with titles like `"Practice: <skill.name>"`. These titles do **NOT match** the current in-app content registry, which means the student would see load cards in `/now` without the interactive "Ver actividad" MC experience.

**Strategic principle:** Do not expose students to non-interactive or content-missing StudyLoads during this beta path. The experience must remain conducted by Bexauri inside the app.

**Goal:** Define a controlled strategy that creates Cycle 2 and ensures the first StudyLoad is registry-matched and interactive.

**This phase does not create Cycle 2, does not create StudyLoads, does not mutate data.**

---

## 2. Current Lifecycle State

| Aspect | Status | Phase |
|--------|--------|-------|
| MC evidence captured (2/8, q1→B ✓, q2→C ✓) | ✅ | FL-UX-2 |
| Admin evidence reviewed | ✅ | FL-UX-2 |
| Evidence-backed CycleDecision (advance) | ✅ | FL-UX-3B |
| Cycle 1 closed | ✅ | FL-UX-3C |
| Continuity authorized (ContinuitySignal) | ✅ | FL-UX-3D-OP |
| Cycle creation readiness audited | ✅ | FL-UX-3E |
| LearningCycle N+1 created | ❌ Not yet | — |
| StudyLoads for Cycle 2 | ❌ Not yet | — |
| enrollment.currentCycleId updated | ❌ Not yet | — |

---

## 3. Problem Statement

### Product Problem
The beta learning experience must be **conducted** — the student should always see a clear, interactive in-app activity when they arrive at `/now`. A StudyLoad without interactive content breaks this principle.

### Technical Problem
`POST /api/learning-cycles` is a single-transaction endpoint that:
1. Creates `LearningCycle` (Cycle 2).
2. Reads `SkillState` data and applies a deterministic heuristic.
3. **Auto-generates 1–3 `StudyLoad` records** with `title: "Practice: <skill.name>"`.
4. Creates `CycleSnapshot(cycle_open)`.
5. Updates `enrollment.currentCycleId`.

The auto-generated titles do not match the content registry. The `/now` page uses `getStudyLoadContent(load.title)` to render interactive MC content. A mismatch means:
- No "Ver actividad" link.
- No interactive MC activity.
- Student can still start/complete/self-report, but the experience is empty.

### Constraint
The endpoint does not offer a `skipAutoGeneration` flag or a way to specify StudyLoad titles during cycle creation. Auto-generation is hardcoded in the transaction.

---

## 4. Current Content Registry Audit

### Registry Location
`lib/study-load-content.ts` — static `CONTENT_REGISTRY` keyed by exact title string.

### Available Content

| Title (exact key) | contentKey | contentVersion | Program | Topic | Items |
|---|---|---|---|---|---|
| `PAES M1 — Ecuaciones lineales básicas` | `paes_m1_linear_equations_basic` | v1 | PAES_M1 | Ecuaciones lineales | 8 MC |
| `PAES M1 — Problemas con ecuaciones lineales` | `paes_m1_linear_equations_word_problems` | v1 | PAES_M1 | Ecuaciones lineales (problemas) | 8 MC |

### Registry Gaps
- Only 2 entries exist, both for PAES_M1.
- No entries for PAES_L1 or PAES_M2.
- No entries with titles matching `"Practice: <anything>"`.
- No fallback or fuzzy matching — lookup is exact string match only.

### Cycle 2 Candidate Titles
Both existing registry entries are valid candidates for Cycle 2. Mauricio already completed a load titled `"PAES M1 — Problemas con ecuaciones lineales"` in Cycle 1 (it was his FL-UX-2 interactive activity). He also completed `"PAES M1 — Ecuaciones lineales básicas"` in Cycle 1.

**Product consideration:** Reusing a Cycle 1 title in Cycle 2 is acceptable for the beta — the student can practice the same topic again. The platform does not currently enforce title uniqueness across cycles. However, the most pedagogically natural choice would be:
- `"PAES M1 — Problemas con ecuaciones lineales"` — the follow-up task, slightly harder.
- `"PAES M1 — Ecuaciones lineales básicas"` — the foundational task.

Either title will produce a fully interactive experience in `/now`.

---

## 5. Existing Cycle Creation Behavior

(Summarized from FL-UX-3E audit)

| Aspect | Behavior |
|--------|----------|
| Preconditions | P1 (active enrollment), P2 (continuityState normal), P3 (no open cycle), P4b (previous closed + ContinuitySignal) |
| Auto-load generation | 1–3 loads with `"Practice: <skill.name>"` titles |
| Fallback | 1 load with `"Initial practice"` if no SkillState data |
| CycleSnapshot | `cycle_open` with full heuristic trace |
| currentCycleId | Updated atomically in transaction |
| SkillState heuristic | Deterministic: needsReinforcement DESC → masteryLevel ASC → skillId ASC |
| DU exclusion | Prior-cycle selectedSkillIds filtered; relaxation if 0 candidates |
| Risk | Auto-generated titles don't match content registry |

---

## 6. Existing StudyLoad Creation Options

### 6.1 Admin UI — "New Load" on Cycle Detail
The cycle detail view (`/admin/learning-cycles/[id]`) has a **"New Load" inline form** when the cycle is open:
- Select `loadType` from dropdown (practice, reading, video, project, assessment).
- Type `title` in a free-text input.
- Click "New Load" button.
- Calls `POST /api/study-loads` with `{ learningCycleId, loadType, title }`.
- Guard: only visible when `cycle.status !== 'closed'`.

### 6.2 POST /api/study-loads
- **Required fields:** `learningCycleId`, `loadType`, `title`.
- **Status:** Forced to `'pending'` (Phase EZ hardening — non-pending rejected with 400).
- **Guard:** Rejects if cycle is closed.
- **No connection to auto-generation** — this is a standalone CRUD endpoint.
- **A registry-matched title can be typed directly** and it will be recognized by `/now`.

### 6.3 DELETE /api/study-loads/[id]
- Deletes a StudyLoad.
- Guard: rejects if cycle is closed.
- Available from both cycle detail view and study loads list view.

### 6.4 Key Finding
**The system already supports manual StudyLoad creation and deletion on open cycles.** No code changes are needed to:
1. Create Cycle 2 (via POST /api/learning-cycles → auto-generates loads).
2. Delete auto-generated loads (via DELETE /api/study-loads/[id]).
3. Create a registry-matched load (via POST /api/study-loads with exact registry title).

All three operations use existing, tested, production endpoints.

---

## 7. Options Comparison

### Option A — Use POST /api/learning-cycles As-Is, Then Curate

**Description:** Create Cycle 2 via admin UI "New Cycle". Accept auto-generated 1–3 loads. Then delete them and create a registry-matched load.

| Aspect | Assessment |
|--------|------------|
| **Benefits** | Exercises the full existing mechanism. CycleSnapshot captures heuristic trace. No code changes. |
| **Risks** | Temporary window where auto-generated non-registry loads exist. If admin forgets curation, student sees empty loads. |
| **Temporary exposure** | Between cycle creation and curation, the student could visit `/now` and see non-interactive loads. Window is seconds if curation is immediate. |
| **Data cleanup** | Delete 1–3 auto-loads + create 1 registry-matched load. 2–4 API calls. |
| **Fit with beta** | ✅ Acceptable with immediate curation. The auto-generated loads were never started/completed, so deletion is clean. |

### Option B — Create Cycle 2 Without Auto-Loads

**Description:** Create Cycle 2 with no auto-generated StudyLoads.

| Aspect | Assessment |
|--------|------------|
| **Feasibility** | ❌ Not possible with the current endpoint. Auto-load generation is hardcoded inside the `$transaction`. There is no `skipAutoGeneration` flag. |
| **What would need to change** | Add an optional `skipAutoGeneration: true` parameter to POST /api/learning-cycles. Modify the transaction to conditionally skip load creation. |
| **Risks** | Requires code change → violates custody discipline for a data-only operation. |
| **Recommendation** | ❌ Not recommended for immediate next step. |

### Option C — Create Cycle 2 + One Registry-Matched Load in One Controlled Operation

**Description:** Create Cycle 2 (accepting auto-loads), then immediately in the same operational session: delete all auto-generated loads, create one registry-matched load.

| Aspect | Assessment |
|--------|------------|
| **Feasibility** | ✅ Fully feasible with existing endpoints (POST /api/learning-cycles → DELETE /api/study-loads/[id] × N → POST /api/study-loads). |
| **Bypass required?** | No. Uses existing APIs. |
| **Admin UI path** | "New Cycle" → cycle detail → delete auto-loads → "New Load" with registry title. |
| **API path** | Same endpoints, can be done via UI or direct API calls. |
| **Custody** | All operations are auditable via existing endpoints. CycleSnapshot still captures the original heuristic trace even after load curation. |
| **Fit with beta** | ✅ Best balance of exercising existing mechanism + ensuring content quality. |

### Option D — Harden Cycle Creation Before Creating Cycle 2

**Description:** Modify the auto-load generation to be registry-aware or add a skip flag.

| Aspect | Assessment |
|--------|------------|
| **Benefits** | Would eliminate the curation step for all future cycles. |
| **Cost** | Code change to `POST /api/learning-cycles`. Requires testing, checkpoint, potentially deploy. |
| **Risk** | Adds complexity. The heuristic/registry coupling would need design work. |
| **Worth doing now?** | ❌ Not for immediate Cycle 2 creation. This is a valuable future improvement but blocks the current operational path. |
| **Recommendation** | Defer to a future hardening phase (e.g., FL-UX-4 series). |

### Option E — Do Not Create Cycle 2; Add Load to Existing Context

**Description:** Instead of creating Cycle 2, add a new load to the existing (closed) Cycle 1.

| Aspect | Assessment |
|--------|------------|
| **Feasibility** | ❌ Not possible. POST /api/study-loads rejects with `"Cannot add loads to a closed cycle"`. DELETE also rejects. |
| **Product implications** | Would violate the cycle lifecycle model. Closed cycles should not gain new loads. |
| **Recommendation** | ❌ Not recommended. |

### Summary

| Option | Feasible | Code Change | Risk | Recommended |
|--------|:--------:|:-----------:|:----:|:-----------:|
| A — Create + curate | ✅ | None | Low | ✅ |
| B — Skip auto-loads | ❌ | Yes | Medium | ❌ |
| **C — Create + replace with registry load** | **✅** | **None** | **Low** | **✅ Primary** |
| D — Harden first | ✅ | Yes | Medium | ❌ (defer) |
| E — Add to closed cycle | ❌ | Would need | High | ❌ |

**Options A and C are essentially the same operation** (A describes the strategy, C describes the full execution). The recommendation is **Option C** — a controlled three-step operation using existing endpoints.

---

## 8. Recommended Strategy

### **Option C: Controlled Cycle 2 + Registry-Matched StudyLoad**

**Three-step controlled operation:**

1. **Step 1 — Create Cycle 2**
   - Use admin UI → Learning Cycles → "New Cycle" → select Mauricio Beta-M1 enrollment → Create.
   - This triggers `POST /api/learning-cycles` which:
     - Creates LearningCycle (cycleNumber: 2, status: open)
     - Auto-generates 1–3 StudyLoads (non-registry titles)
     - Creates CycleSnapshot (cycle_open)
     - Updates enrollment.currentCycleId

2. **Step 2 — Delete auto-generated loads**
   - Open the new Cycle 2 detail view.
   - Delete each auto-generated StudyLoad via the existing delete (trash) button or DELETE API.
   - These loads have never been started/completed, so deletion is clean.

3. **Step 3 — Create one registry-matched load**
   - Use the "New Load" form on the Cycle 2 detail page.
   - Set loadType: `practice`.
   - Set title: exact registry key (see section 9 for recommended title).
   - This creates a pending load that `/now` will render with full interactive MC content.

**Why this is the safest strategy:**
- Uses only existing, tested, production endpoints.
- No code changes, no schema changes, no deploy.
- CycleSnapshot preserves the original heuristic trace (audit trail).
- The curation window (between auto-generation and replacement) is seconds.
- The student is unlikely to visit `/now` during this window.
- Even if the student visits during the window, the auto-loads are merely non-interactive (not broken or errored).
- The final state is one clean, registry-matched, interactive StudyLoad.

**Next phase:** FL-UX-3F-OP — Controlled Cycle 2 + registry-matched StudyLoad creation.

---

## 9. Proposed Operational Contract for FL-UX-3F-OP

### Target State After Operation

| Entity | Expected State |
|--------|---------------|
| **LearningCycle** | Cycle 2 created: cycleNumber=2, status=open, enrollmentId=Mauricio's enrollment |
| **enrollment.currentCycleId** | Points to Cycle 2 |
| **Cycle 1** | Remains closed, accessible, all evidence intact |
| **StudyLoads (auto-generated)** | Deleted (0 remaining from auto-generation) |
| **StudyLoad (curated)** | Exactly 1, pending, registry-matched |
| **CycleSnapshot** | cycle_open snapshot exists (created during Step 1) |
| **Beta Operations** | Mauricio visible in active sections (1 pending load) |
| **/now** | Shows Cycle 2, 1 pending load with "Ver actividad" + "Empezar" |

### Recommended StudyLoad Title

**`PAES M1 — Problemas con ecuaciones lineales`**

**Rationale:**
- This is the follow-up task (slightly harder than the basic version).
- Mauricio already worked on this in Cycle 1 — he submitted 2/8 answers. Repeating it in Cycle 2 gives him another chance to practice with the full set.
- The evidence-backed CycleDecision was `advance`, so continuing with the same difficulty level (word problems) is appropriate.
- The alternative (`PAES M1 — Ecuaciones lineales básicas`) would be a step backward, which conflicts with the advance decision.

**Alternative:** `PAES M1 — Ecuaciones lineales básicas` is also valid if the admin prefers revisiting fundamentals.

### StudyLoad Properties
| Field | Value |
|-------|-------|
| `learningCycleId` | Cycle 2's ID |
| `loadType` | `practice` |
| `title` | `PAES M1 — Problemas con ecuaciones lineales` |
| `status` | `pending` (enforced by API) |
| `releasedAt` | null |
| `dueAt` | null |

### What Should NOT Exist After Operation
- No Responses on Cycle 2 loads
- No CycleDecision on Cycle 2
- No CycleEvaluation on Cycle 2
- No TutoringSession on Cycle 2
- No scoring, PAES score, adaptive logic, or AI
- No additional ContinuitySignal
- No changes to Cycle 1 data

---

## 10. Risks and Mitigations

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | Auto-generated non-registry loads briefly visible | Low | Curation is immediate. Student unlikely to visit during window. |
| 2 | Duplicate Cycle 2 | None | Unique constraint `[enrollmentId, cycleNumber]` prevents. Second attempt → 409. |
| 3 | Duplicate StudyLoads | Low | No unique constraint on title, but controlled operation creates exactly 1. |
| 4 | Incorrect currentCycleId | None | Updated atomically in transaction. Verified post-operation. |
| 5 | Missing CycleSnapshot | None | Created automatically by POST /api/learning-cycles transaction. |
| 6 | Student sees "content unavailable" | None (after curation) | Registry-matched title ensures `getStudyLoadContent()` returns content. |
| 7 | Loss of access to Cycle 1 | None | Cycle 1 remains in DB. Accessible via admin UI. FK relations intact. |
| 8 | Beta Operations invisibility | None (after operation) | Cycle 2 (open) with pending load appears in dashboard. |
| 9 | Data mutation risk | Low | All operations use existing tested endpoints. No direct Prisma calls. |
| 10 | Direct Prisma risk | None | Strategy avoids direct DB manipulation. |
| 11 | Schema/deploy risk | None | No schema changes. No deploy needed. |
| 12 | Abacus auto schema promotion | None | No schema changes triggers no promotion. |
| 13 | Checkpoint artifacts | None | Documentation-only changes in this phase. |
| 14 | Deleted auto-loads had TutoringSessions | None | Auto-generated loads are brand new (pending). No sessions exist. Deletion is clean. |

---

## 11. Go/No-Go Criteria for Creating Cycle 2

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | Repo clean | `git status` shows clean tree |
| 2 | No schema/data warnings | No Prisma warnings during operation |
| 3 | Mauricio Cycle 1 closed | Verify via admin UI or API |
| 4 | ContinuitySignal exists | Verify `signalType: continue` for Cycle 1 |
| 5 | No existing Cycle 2 | Query learning cycles for enrollment |
| 6 | No open cycle for Mauricio | Confirm via Beta Operations or API |
| 7 | Chosen StudyLoad title exists in registry | `getStudyLoadContent('PAES M1 — Problemas con ecuaciones lineales')` returns content |
| 8 | Method understood (3-step: create → delete → create load) | This document |
| 9 | CycleSnapshot behavior understood | Created in Step 1, preserved after load curation |
| 10 | currentCycleId behavior understood | Updated in Step 1, points to Cycle 2 |
| 11 | No auto-generated non-registry loads remain after operation | Post-check: all Cycle 2 loads are registry-matched |
| 12 | No scoring/adaptive/AI | Confirmed: none involved |
| 13 | Rollback understood | If Step 1 fails: no partial state (atomic). If Step 2/3 fail: Cycle 2 exists with auto-loads (revert manually). |

---

## 12. Recommended Next Phase Prompt Outline

### FL-UX-3F-OP — Controlled Cycle 2 + Registry-Matched StudyLoad Creation

**Type:** Operational (data mutation via existing endpoints)  
**Risk:** Medium (multi-step data mutation)

**Outline:**

1. **Pre-checks**
   - git status clean
   - Verify Mauricio Cycle 1 closed, ContinuitySignal exists, no Cycle 2, no open cycle

2. **Step 1: Create Cycle 2**
   - Admin UI → Learning Cycles → "New Cycle" → Mauricio enrollment → Create
   - Verify: Cycle 2 exists, status=open, CycleSnapshot created, currentCycleId updated
   - Record auto-generated StudyLoad IDs and titles

3. **Step 2: Delete auto-generated loads**
   - Admin UI → Cycle 2 detail → delete each auto-generated load
   - Verify: 0 StudyLoads on Cycle 2

4. **Step 3: Create registry-matched load**
   - Admin UI → Cycle 2 detail → "New Load" → loadType: practice, title: `PAES M1 — Problemas con ecuaciones lineales`
   - Verify: 1 pending load with registry-matched title

5. **Post-checks**
   - Cycle 2 open, 1 pending load, registry-matched
   - /now shows Cycle 2 with "Ver actividad" + "Empezar"
   - Beta Operations shows Mauricio active
   - Cycle 1 remains closed with all evidence
   - Other students unchanged

6. **Constraints**
   - No code/schema/deploy changes
   - No scoring/adaptive/AI
   - No .env changes

---

## 13. Custody Checklist

| # | Rule | Status |
|---|------|--------|
| 1 | No schema changes | ✅ |
| 2 | No deploy unless absolutely necessary | ✅ No deploy |
| 3 | No data mutation unless explicitly approved | ✅ No mutation in this phase |
| 4 | No automatic decisions | ✅ |
| 5 | No scoring | ✅ |
| 6 | No AI | ✅ |
| 7 | No auto-loads that lack registry match (in final state) | ✅ Strategy ensures deletion + replacement |
| 8 | Stop on schema drift / dev→prod promotion warning | ✅ N/A |
| 9 | Verify all side effects before and after | ✅ Documented in sections 9–11 |
| 10 | No .env changes | ✅ |
| 11 | No secrets printed | ✅ |
| 12 | No student data modified | ✅ |
| 13 | No cycles created or modified | ✅ (this phase) |
| 14 | No StudyLoads created or modified | ✅ (this phase) |

---

*End of FL-UX-3F strategy document.*
