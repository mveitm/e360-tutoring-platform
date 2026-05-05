# FL-UX-7-A — Mauricio Cycle 4 Opening Readiness

**Date:** 2026-05-05
**Type:** Readiness-only / documentation-only / Cycle 4 opening prep
**Status:** READY_TO_OPEN_CYCLE_4_ONLY_AFTER_CONTENT_PREP
**Baseline commit:** `1ed5d52` (FL-UX-6-C: Mauricio Cycle 3 continuity authorization)
**Depends on:** FL-UX-6-C (continuity authorized)

## Objective

Assess whether it is safe and useful to open Mauricio Beta-M1 / PAES_M1 / Cycle 4 after Cycle 3 was completed, closed, and continuity was authorized.

## Read-only method

1. Safe Git pre-flight checks.
2. Code-level read-only review of cycle creation endpoint (`POST /api/learning-cycles`).
3. Content registry inventory (`study-load-content.ts`).
4. Prior operation docs review (FL-UX-4I-B, FL-UX-4J-A, FL-UX-6-C).
5. No .env access, no SQL, no DB access, no Prisma CLI.

## Current state after FL-UX-6-C

| Field | Value |
|-------|-------|
| Student/program | Mauricio Beta-M1 · PAES Matemática M1 (PAES_M1) |
| Cycle 3 status | closed (05 may 2026) |
| Continuity | authorized (ContinuitySignal signalType='continue') |
| CycleDecision | 1 advance |
| CycleEvaluation | 0 |
| Cycle 4 | not created |
| SkillStates for enrollment | none (fallback path fired in Cycle 3 per FL-UX-4I-B) |

---

## Question 1: Can Cycle 4 be opened now?

### Precondition check

| Precondition | Status | Source |
|-------------|--------|--------|
| P1: Enrollment active | ✅ | FL-UX-5-A human admin UI observation |
| P2: currentContinuityState = normal | ✅ expected | Not directly verified; enrollment was active throughout |
| P3: No open current cycle | ✅ | Cycle 3 is closed (FL-UX-6-B) |
| P4b: Previous cycle closed + ContinuitySignal exists | ✅ | Cycle 3 closed (FL-UX-6-B) + continuity authorized (FL-UX-6-C) |

**Result:** All technical preconditions are satisfied. The endpoint will accept the request.

---

## Question 2: What will POST /api/learning-cycles create?

### Cycle creation pathway (code review)

| Step | Detail |
|------|--------|
| cycleNumber | Auto-calculated: max(cycleNumber for enrollment) + 1 = **4** |
| Transaction | Atomic: create cycle + snapshot + StudyLoads + update enrollment |
| currentCycleId | Updated to new cycle ID |
| lastActivityAt | Stamped to now |
| CycleSnapshot | `cycle_open` with heuristic trace, selectedSkillIds, excludedSkillIds |

### StudyLoad auto-generation

| Step | Detail |
|------|--------|
| SkillState query | Finds SkillStates for enrollment + program |
| Heuristic sort | needsReinforcement desc → masteryLevel asc → skillId asc |
| DU exclusion | Excludes skills from Cycle 3's `cycle_open` snapshot `selectedSkillIds` |
| MAX_FIRST_LOADS | 3 |
| If SkillStates exist | Creates up to 3 loads titled `Practice: {skill.name}` (practice, pending) |
| If no SkillStates | Fallback: creates 1 load titled `Initial practice` (practice, pending) |

### What will happen for Mauricio specifically

Mauricio has **no SkillStates** for PAES_M1 (confirmed in FL-UX-4I-B: fallback path fired for Cycle 3).

**The fallback path will fire again:**
- 1 StudyLoad created: `Initial practice` (practice, pending)
- This title does NOT match any content registry entry
- The student will NOT see interactive MC content on `/now`

---

## Question 3: What is the risk of unusable StudyLoads?

| Risk | Assessment |
|------|------------|
| Does endpoint generate registry-matched titles? | **NO** — titles are `Practice: {skill.name}` or `Initial practice`, neither matches CONTENT_REGISTRY keys |
| Would student see "Ver actividad"? | **NO** — non-registry titles have no content to render |
| Would content render in `/now/study-loads/[id]`? | **NO** — `getStudyLoadContent(title)` returns undefined for non-matching titles |
| Can the load be curated afterward? | **YES** — admin can edit the title to a registry-matched value (proven in FL-UX-4J-B) |

**Conclusion:** Opening Cycle 4 now would create a non-functional placeholder that requires immediate manual curation.

---

## Question 4: PAES_M1 registry inventory

### All PAES_M1 content registry entries

| # | Title | contentKey | Version | Items | Answer key |
|---|-------|-----------|---------|-------|------------|
| 1 | PAES M1 — Ecuaciones lineales básicas | paes_m1_linear_equations_basic | v1 | 8 | ✅ Yes |
| 2 | PAES M1 — Problemas con ecuaciones lineales | paes_m1_linear_equations_word_problems | v1 | 8 | ✅ Yes |
| 3 | PAES M1 — Refuerzo de ecuaciones lineales | paes_m1_linear_equations_reinforcement | v1 | 8 | ✅ Yes |

### Mauricio's usage history

| Cycle | Activity used | Status |
|-------|---------------|--------|
| 1 | PAES M1 — Ecuaciones lineales básicas | ✅ completed (prior docs) |
| 2 | PAES M1 — Problemas con ecuaciones lineales | ✅ completed 8/8 (prior docs) |
| 3 | PAES M1 — Refuerzo de ecuaciones lineales | ✅ completed 8/8 (FL-UX-5-A) |

### Unused PAES_M1 registry content

**None.** All 3 registry entries have been used by Mauricio across Cycles 1–3.

If Cycle 4 is opened and a StudyLoad needs to be curated to a registry-matched title, there is **no unused content available** to assign without either:
- Repeating a previously used activity, or
- Adding a new entry to the content registry (code change).

---

## Question 5: Should Cycle 4 be opened before adding new content?

### Options analysis

| Option | Description | Pros | Cons | Recommendation |
|--------|-------------|------|------|----------------|
| **A** | Open Cycle 4 now, accept/curate auto-load afterward | Fast; keeps operational momentum | No unused content to curate to; load would need a registry expansion anyway; student sees non-functional placeholder until curated | ⚠️ Not recommended without content |
| **B** | Add new PAES_M1 registry activity first, then open Cycle 4 | Student gets functional content immediately after curation; clean progression | Requires code change + deploy before Cycle 4; small effort | ✅ **Recommended** |
| **C** | Populate SkillStates first, then open Cycle 4 | Auto-generation heuristic fires correctly; `Practice: {skill.name}` titles created | Still non-registry-matched titles; still requires curation; doesn't solve content exhaustion | ❌ Does not solve core problem |
| **D** | Modify cycle creation to accept explicit curated title | Cleanest long-term path | Requires endpoint code change; scope creep | ⚠️ Future improvement, not for this phase |
| **E** | Do not open Cycle 4 yet; prepare MVP-beta content set first | Maximum preparation; content inventory ready before next cycle | Delays student progression; Mauricio's `/now` shows "progress will be reviewed" | ✅ **Also valid** |

### Recommended path

**Option B** — Add at least one new PAES_M1 registry activity (new topic or next difficulty level for ecuaciones lineales), then open Cycle 4 and curate the auto-created load to the new content.

Alternatively, **Option E** is valid if the team prefers to build a broader 4-week content minimum set before continuing Mauricio's progression.

---

## Question 6: Recommended next phase

**Primary recommendation:** `FL-UX-7-B-ALT` — PAES_M1 content expansion before Cycle 4.

This requires:
1. A new PAES_M1 activity designed and added to `study-load-content.ts` (code change + deploy).
2. Then FL-UX-7-B: Open Cycle 4 with controlled auto-load observation.
3. Then FL-UX-7-C: Curate the auto-created StudyLoad to the new registry entry.

**Alternative:** `MVP-BETA-CONTENT-1` — PAES_M1 4-week content minimum set strategy (broader planning before any new cycle).

---

## Readiness classification

**READY_TO_OPEN_CYCLE_4_ONLY_AFTER_CONTENT_PREP**

Rationale:
- ✅ Opening Cycle 4 is technically safe — all preconditions satisfied.
- ✅ No known side effects beyond transaction.
- ❌ **No unused registry-matched content** is currently available for PAES_M1.
- ❌ Opening now would create an `Initial practice` fallback that cannot be curated to meaningful interactive content without a registry expansion (code change).
- ⚠️ SkillStates are absent, but even if populated, they would produce `Practice: {skill.name}` titles that also don't match the registry.
- ⚠️ Student experience would be a non-functional placeholder until content is added and load is curated.

---

## Risks assessed

1. **Fallback `Initial practice` risk**: HIGH — will fire because no SkillStates exist. Creates non-interactive placeholder.
2. **Non-registry title risk**: HIGH — both `Initial practice` and `Practice: {skill.name}` don't match CONTENT_REGISTRY.
3. **Student `/now` activity invisibility risk**: HIGH — non-registry loads have no interactive content.
4. **Content exhaustion risk**: **CRITICAL** — all 3 PAES_M1 registry entries are used. No content available for Cycle 4 without expansion.
5. **SkillState absence/quality risk**: MEDIUM — absent SkillStates force fallback, but even with SkillStates the titles wouldn't be registry-matched.
6. **Auto-load curation dependency**: HIGH — every cycle open requires manual curation afterward; this is operationally sustainable for beta but scales poorly.
7. **Beta paid readiness implications**: Cycle 4 progression signals platform value, but only if content is real and functional.
8. **Risk of opening before weekly plan**: MEDIUM — without a content plan, Cycle 4 would be aimless.
9. **Risk of overbuilding before monetization**: LOW — adding one more registry activity is minimal effort.
10. **Risk of changing endpoint prematurely**: NOT RECOMMENDED — endpoint changes are out of scope for this readiness phase.

---

## Confirmed non-actions

- ❌ No Cycle 4 created
- ❌ No StudyLoads created, edited, or deleted
- ❌ No CycleDecision created
- ❌ No CycleEvaluation created
- ❌ No continuity action
- ❌ No production data mutated
- ❌ No .env access
- ❌ No SQL or psql
- ❌ No Prisma CLI or migrations
- ❌ No deploy
- ❌ No schema change
- ❌ No code change
- ❌ No auth/admin config change
- ❌ No Test Now, Ana, or Bruno touched
- ❌ No secrets inspected or printed

## Recommended next phase

**FL-UX-7-B-ALT** — PAES_M1 content expansion: add at least one new registry activity for a new topic (e.g., funciones, proporciones, or next-level ecuaciones), then proceed to Cycle 4 opening.

Alternatively: **MVP-BETA-CONTENT-1** — broader PAES_M1 4-week content strategy before continuing Mauricio's progression.
