# FL-UX-4I-A — Mauricio Cycle 3 Opening Readiness

**Phase:** FL-UX-4I-A  
**Date:** 2026-05-04  
**Type:** Readiness-only / documentation-only  
**Baseline commit:** `a8cff1d` (FL-UX-4H)

---

## 1. Phase Summary

Code-only audit of the approved application pathway for opening Mauricio Beta-M1 / PAES_M1 / Cycle 3 after Cycle 2 closure and continuity authorization. No production data access, no .env access, no mutations.

---

## 2. Baseline

- Commit: `a8cff1d`
- Branch: `main`, up to date with `origin/main`
- Working tree: clean

---

## 3. Current Known State (from prior phase documentation)

| Item | State |
|---|---|
| Mauricio Cycle 2 | `closed`, `closedAt` stamped |
| ContinuitySignal for Cycle 2 | Exists: `signalType: continue`, `rationale: admin_authorize` |
| Cycle 3 | Does not exist |
| Cycle 3 StudyLoads | None |

This state is based on FL-UX-4H verified documentation. No live DB verification was performed in this phase (custody restriction: no .env access).

---

## 4. Custody Constraints

- No .env access.
- No DB access.
- No SQL.
- No mutations.
- No deploy.
- No schema changes.
- Code-only and documentation-only audit.

---

## 5. Cycle Creation Pathway Audit

### API Endpoint: `POST /api/learning-cycles`

**File:** `nextjs_space/app/api/learning-cycles/route.ts`

#### Auth Guard

- `requireAdminApi()` — requires authenticated admin session with email in `ADMIN_EMAILS`.
- Human owner's allowlisted account is required (Option A).

#### Required Input

```json
{ "enrollmentId": "<Mauricio's enrollment ID>" }
```

Only `enrollmentId` is required. The `cycleNumber` is auto-calculated.

#### Validation Rules (Preconditions)

| # | Precondition | Check | Mauricio Status |
|---|---|---|---|
| P1 | Enrollment must exist and be `active` | `studentProgramInstance.status === 'active'` | ✅ (documented as active) |
| P2 | `currentContinuityState` must be `normal` | `enrollment.currentContinuityState === 'normal'` | ✅ (documented as `normal`) |
| P3 | No other open cycle for this enrollment | `findFirst({ status: 'open' })` | ✅ (Cycle 2 is closed, no open cycles) |
| P4b | Previous cycle must be closed + ContinuitySignal exists | Checks `lastCycle.status === 'closed'` AND `continuitySignal.findFirst({ signalType: 'continue' })` | ✅ (Cycle 2 closed + signal exists) |

All preconditions appear satisfied based on documented state.

#### Transaction Side Effects

The `POST /api/learning-cycles` endpoint executes a **single Prisma transaction** that performs **all of the following atomically**:

| Side Effect | Details |
|---|---|
| **1. Create LearningCycle** | `cycleNumber: 3`, `status: 'open'` |
| **2. Read SkillStates** | Reads all `SkillState` records for the enrollment's program |
| **3. DU: Prior-cycle skill exclusion** | Reads Cycle 2's `cycle_open` snapshot for `selectedSkillIds` and excludes them from the candidate pool (first-load scope only; relaxes if exclusion empties the pool) |
| **4. DN: Deterministic heuristic selection** | Sorts candidates by `needsReinforcement` desc, `masteryLevel` asc, `skillId` asc; selects top 3 |
| **5. Create `cycle_open` CycleSnapshot** | Captures full SkillState inventory, selected skill IDs, DU exclusion trace |
| **6. ⚠️ Create StudyLoads automatically** | If selected skills exist: creates up to 3 `practice` StudyLoads titled `Practice: {skillName}`. If no skills exist: creates 1 fallback `Initial practice` load. |
| **7. Update `currentCycleId`** | Sets `studentProgramInstance.currentCycleId` to the new cycle ID (SE-2) |
| **8. Update `lastActivityAt`** | Stamps current time (SE-9) |

---

## 6. Admin UI Pathway Audit

### Learning Cycles List Page

**Route:** `/admin/learning-cycles`  
**File:** `nextjs_space/app/admin/learning-cycles/_components/learning-cycles-view.tsx`

- A **"New Cycle"** button opens a modal dialog.
- The modal contains a form with an **enrollment dropdown** and a **status select** (defaults to `open`).
- On submit, it calls `POST /api/learning-cycles` with `{ enrollmentId, status }`.
- The human owner must select Mauricio's enrollment from the dropdown.

### Cycle Detail Page

**Route:** `/admin/learning-cycles/[id]`

- Does **not** have a "create next cycle" button.
- The cycle creation must be done from the list page.

### Option A Suitability

The admin UI pathway is suitable for Option A human execution:

1. Human owner navigates to `/admin/learning-cycles`.
2. Clicks "New Cycle".
3. Selects Mauricio's enrollment from the dropdown.
4. Status defaults to `open`.
5. Clicks "Create Cycle".
6. The API handles all validation and side effects.

---

## 7. StudyLoad Coupling Assessment

### ⚠️ StudyLoad creation IS coupled to Cycle creation

The `POST /api/learning-cycles` endpoint **automatically creates StudyLoads** as part of the same transaction that creates the cycle. This is **not separable** through the existing UI/API.

#### What will be auto-created:

**If SkillStates exist for Mauricio / PAES_M1:**
- Up to 3 `practice` StudyLoads, titled `Practice: {skillName}`.
- Skill selection uses the DN heuristic: `needsReinforcement` desc → `masteryLevel` asc → `skillId` asc.
- DU exclusion: skills selected in Cycle 2's `cycle_open` snapshot are excluded from the first-load generation pass (unless exclusion empties the pool).

**If no SkillStates exist:**
- 1 fallback `Initial practice` load (status: `pending`).

#### Implication for phase planning:

The original recommendation to separate into:
- FL-UX-4I-B (Cycle 3 opening)
- FL-UX-4I-C (First StudyLoad attachment)

**cannot be cleanly applied** because StudyLoad creation is embedded in the cycle creation transaction. Opening Cycle 3 will always create StudyLoads.

#### Revised recommendation:

FL-UX-4I-B should be a **combined readiness + controlled operation** phase that:
1. Documents exactly which StudyLoads will be auto-created (based on SkillState analysis).
2. Has the human owner execute the cycle creation through the admin UI.
3. Verifies both the cycle AND the auto-created StudyLoads post-operation.

FL-UX-4I-C (separate StudyLoad attachment) is **not needed** unless the auto-created loads are insufficient or incorrect.

---

## 8. Expected Side Effects Summary

| Effect | Automatic? | Details |
|---|---|---|
| Cycle 3 created | Yes | `cycleNumber: 3`, `status: 'open'` |
| `currentCycleId` updated | Yes | Points to new Cycle 3 |
| `lastActivityAt` updated | Yes | Stamped with current time |
| `cycle_open` CycleSnapshot | Yes | Contains SkillState inventory, selected skills, DU exclusion trace |
| StudyLoads created | ⚠️ Yes | Up to 3 practice loads (DN heuristic) or 1 fallback |
| CycleDecision created | No | |
| CycleEvaluation created | No | |
| ContinuitySignal created | No | |
| SkillState modified | No | |
| Scoring/adaptive AI | No | |
| Other students touched | No | |

---

## 9. Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| 1 | Wrong enrollment selected in UI | Medium | Human owner verifies enrollment shows "Mauricio Beta-M1 / PAES_M1" before clicking Create |
| 2 | Duplicate Cycle 3 | Low | P3 guard prevents opening if an open cycle exists |
| 3 | Missing ContinuitySignal | Low | P4b guard would reject; FL-UX-4H confirmed signal exists |
| 4 | Auto-created StudyLoads unexpected | Medium | Must document expected loads in FL-UX-4I-B pre-op; verify post-op |
| 5 | `currentCycleId` not updated | Low | Handled in transaction; verified by post-op check |
| 6 | CycleSnapshot missing | Low | Created in same transaction |
| 7 | Admin auth blocker | Low | Human owner's account was verified working in FL-UX-4H |
| 8 | Accidentally touching other students | Low | API only acts on specified enrollmentId |
| 9 | SkillState-dependent load titles | Medium | If no SkillStates exist, fallback `Initial practice` is created — must verify SkillStates before operation |
| 10 | DU exclusion trace depends on Cycle 2 `cycle_open` snapshot | Low-Medium | If Cycle 2 lacks a `cycle_open` snapshot (it was created before DU was implemented), no exclusion occurs — acceptable |

---

## 10. Future Operation Plan

### FL-UX-4I-B — Mauricio Cycle 3 Controlled Opening (combined readiness + operation)

**Pre-operation (Abacus guides):**
1. Verify SkillStates exist for Mauricio / PAES_M1 enrollment (determines whether DN heuristic or fallback applies).
2. If SkillStates exist: predict which skills will be selected (apply DN heuristic + DU exclusion on paper).
3. If no SkillStates: document that fallback `Initial practice` will be created.
4. Present expected outcome to human owner.

**Operation (human owner executes):**
1. Human owner navigates to `/admin/learning-cycles`.
2. Clicks "New Cycle".
3. Selects Mauricio's enrollment.
4. Clicks "Create Cycle".
5. Reports result.

**Post-operation (Abacus verifies):**
1. Verify Cycle 3 exists with `status: open`.
2. Verify `currentCycleId` updated.
3. Verify `cycle_open` CycleSnapshot created.
4. Verify auto-created StudyLoads match prediction.
5. Verify no Cycle 4, no unintended side effects.
6. Document result.

---

## 11. Stop Conditions for FL-UX-4I-B

- No SkillStates and operator doesn't accept fallback `Initial practice`.
- SkillState analysis shows unexpected/unwanted auto-load titles.
- Admin auth fails (403).
- Enrollment is not `active`.
- `currentContinuityState` is not `normal`.
- ContinuitySignal is missing.
- An open cycle already exists.
- .env/DB access required but custody-restricted.

---

## 12. Recommended Next Phase

**FL-UX-4I-B — Mauricio Cycle 3 controlled opening**

Combined readiness + human-executed operation. Includes SkillState analysis, predicted StudyLoad documentation, human UI execution, and post-operation verification.

---

*Generated as part of FL-UX-4I-A. Readiness-only — no data mutations, no .env access, no DB access, no deploy, no schema changes.*
