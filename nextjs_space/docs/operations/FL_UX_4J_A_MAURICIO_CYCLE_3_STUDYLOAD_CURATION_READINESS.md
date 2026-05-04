# FL-UX-4J-A — Mauricio Cycle 3 StudyLoad Curation Readiness

**Phase:** FL-UX-4J-A
**Date:** 2026-05-04
**Type:** Readiness-only / documentation-only
**Baseline commit:** `f615747` (FL-UX-4I-B)

---

## 1. Phase Summary

Code-only audit to determine the safest way to curate the fallback StudyLoad in Mauricio Beta-M1 / PAES_M1 / Cycle 3. No production data access, no .env access, no mutations. The goal is to identify the correct next operation so Cycle 3 becomes pedagogically useful with a registry-matched interactive activity.

---

## 2. Baseline

- Commit: `f615747` (FL-UX-4I-B: open Mauricio Cycle 3)
- Branch: `main`, up to date with `origin/main`
- Working tree: clean

---

## 3. Current Known State (from FL-UX-4I-B documentation)

| Item | State | Source |
|---|---|---|
| Mauricio Cycle 1 | closed, 3 decisions, 3 loads | FL-UX-4I-B UI verified |
| Mauricio Cycle 2 | closed, 1 decision, 1 load | FL-UX-4I-B UI verified |
| Mauricio Cycle 3 | **open**, 0 decisions, **1 load** | FL-UX-4I-B UI verified |
| Cycle 3 StudyLoad title | `Initial practice` | FL-UX-4I-B UI verified |
| Cycle 3 StudyLoad loadType | `practice` | FL-UX-4I-B UI verified |
| Cycle 3 StudyLoad status | `pending` | FL-UX-4I-B UI verified |
| Cycle 3 decisions | 0 | FL-UX-4I-B UI verified |
| Cycle 3 evaluations | 0 | FL-UX-4I-B UI verified |
| Mauricio SkillStates for PAES_M1 | None (confirmed by fallback path firing) | FL-UX-4I-B code+observation |
| Mauricio enrollment | active | FL-UX-4I-B UI verified |
| Cycle 4 | Does not exist | FL-UX-4I-B UI verified |
| Ana Beta-M1 | Cycle 1 open, 4 loads (not touched) | FL-UX-4I-B UI verified |
| Bruno Beta-L1 | Cycle 1 open, 3 loads (not touched) | FL-UX-4I-B UI verified |
| Test Now | Cycle 1 open, 3 loads (not touched) | FL-UX-4I-B UI verified |

Key finding: The fallback path fired because no SkillStates existed for Mauricio / PAES_M1. The auto-created StudyLoad (`Initial practice`) is **not** a registry-matched interactive activity.

---

## 4. Custody Constraints

- No .env access.
- No DB access or SQL.
- No Prisma CLI or scripts.
- No mutations.
- No deploy.
- No schema changes.
- No auth/admin code changes.
- No touching Test Now, Ana, or Bruno.
- Code-only and documentation-only audit.

---

## 5. Content Registry Audit

**File:** `nextjs_space/lib/study-load-content.ts`

The content registry is a static `Record<string, StudyLoadContent>` keyed by **exact StudyLoad title**. Lookup is performed by `getStudyLoadContent(title)`. If the title matches a registry key exactly, the student-facing `/now` viewer renders the interactive MC activity. If no match, no interactive content appears.

### Available PAES M1 Registry Entries

| # | Exact Title (Registry Key) | contentKey | contentVersion | Program | Topic | Interactive MC? | Items | Pedagogical Level |
|---|---|---|---|---|---|---|---|---|
| 1 | `PAES M1 — Ecuaciones lineales básicas` | `paes_m1_linear_equations_basic` | `v1` | PAES_M1 | Ecuaciones lineales | ✅ Yes | 8 | Basic — single-step equations, word problems |
| 2 | `PAES M1 — Problemas con ecuaciones lineales` | `paes_m1_linear_equations_word_problems` | `v1` | PAES_M1 | Ecuaciones lineales (problemas) | ✅ Yes | 8 | Intermediate — parentheses, fractions, multi-step word problems |
| 3 | `PAES M1 — Refuerzo de ecuaciones lineales` | `paes_m1_linear_equations_reinforcement` | `v1` | PAES_M1 | Ecuaciones lineales (refuerzo) | ✅ Yes | 8 | Reinforcement — mixed difficulty, consolidation |

### Registry Matching Behavior

- Match is **exact string equality** on title — case-sensitive, whitespace-sensitive, dash-character-sensitive.
- The em-dash (`—`) is Unicode U+2014, not a regular hyphen.
- If `StudyLoad.title` is set to any of the three exact titles above, the student-facing viewer will render the interactive activity.
- The current fallback title `Initial practice` does **not** match any registry entry → no interactive content visible to the student.

### Suitability for Mauricio Cycle 3

Mauricio completed Cycle 2 with the activity `PAES M1 — Problemas con ecuaciones lineales` (8/8 score, documented in prior phases). The three available activities in progression order:

1. **`PAES M1 — Ecuaciones lineales básicas`** — Already used in Cycle 1. Basic level. Re-assigning would be repetitive but not harmful.
2. **`PAES M1 — Problemas con ecuaciones lineales`** — Already used in Cycle 2 (8/8). Re-assigning would be a direct repeat.
3. **`PAES M1 — Refuerzo de ecuaciones lineales`** — **Not yet used by Mauricio.** Reinforcement-level activity. Contains 8 new MC items covering mixed difficulty. **Best candidate for Cycle 3.**

**Recommended registry-matched title for Cycle 3:**
```
PAES M1 — Refuerzo de ecuaciones lineales
```

---

## 6. StudyLoad Admin UI / API Pathway Audit

### 6.1 Admin UI — Study Loads List

**Route:** `/admin/study-loads`
**Component:** `nextjs_space/app/admin/study-loads/_components/study-loads-view.tsx`

| Capability | Supported? | Details |
|---|---|---|
| List StudyLoads | ✅ Yes | Filterable by enrollment, searchable by title/loadType |
| Create new StudyLoad | ✅ Yes | "New Study Load" button → modal with cycle selector, loadType, title, dates |
| Edit StudyLoad (modal) | ✅ Yes | Pencil icon → edit dialog with title, loadType, releasedAt, dueAt |
| Edit title | ✅ Yes | Editable `<Input>` in edit dialog |
| Edit loadType | ✅ Yes | Editable `<select>` in edit dialog AND inline on card |
| Edit status | ❌ No (read-only badge) | Phase EY hardened: status is a read-only badge; mutations via POST start/complete only |
| Delete StudyLoad | ✅ Yes | Trash icon with confirmation prompt |
| Closed-cycle guard on edit/delete | ✅ Yes | Edit/delete buttons hidden for closed-cycle loads (`isClosed()` check) |
| Closed-cycle guard on inline loadType | ✅ Yes | Inline loadType `<select>` disabled for closed cycles |

### 6.2 API — StudyLoad PUT (Edit)

**Route:** `PUT /api/study-loads/[id]`
**File:** `nextjs_space/app/api/study-loads/[id]/route.ts`

| Property | Value |
|---|---|
| Auth guard | `requireAdminApi()` — admin-only |
| Closed-cycle guard | ✅ Returns 400 if cycle is closed |
| Editable fields | `title`, `loadType`, `releasedAt`, `dueAt` |
| Status editable? | ❌ Not via PUT — status is not in the update payload |
| loadType validation | Validates against canonical set: `practice`, `reading`, `video`, `project`, `assessment` |
| Audit logging | ✅ `recordAuditEvent()` captures before/after snapshots |
| Method | PUT with partial field support (only provided fields are updated) |

### 6.3 API — StudyLoad PATCH (Status)

**Route:** `PATCH /api/study-loads/[id]`
**File:** `nextjs_space/app/api/study-loads/[id]/route.ts`

| Property | Value |
|---|---|
| Status | ⛔ **Rejected** — returns 405 Method Not Allowed |
| Message | "Study load status mutations are not allowed via PATCH. Use POST .../start or .../complete." |

Generic status PATCH is disabled (Phase EY). Status transitions use protected POST workflows.

### 6.4 API — StudyLoad DELETE

**Route:** `DELETE /api/study-loads/[id]`

| Property | Value |
|---|---|
| Auth guard | `requireAdminApi()` |
| Closed-cycle guard | ✅ Returns 400 if cycle is closed |
| Available | Yes, for open-cycle loads |

### 6.5 Summary: Safe Edit Pathway

For a **pending** StudyLoad in an **open** cycle:

1. **Title can be edited** via the admin UI edit dialog (pencil icon) → `PUT /api/study-loads/[id]` with `{ title: "new title" }`.
2. **loadType can be edited** via the admin UI edit dialog or inline select → same PUT endpoint.
3. **Status remains `pending`** — not affected by PUT (status field is not in the update payload).
4. **The edit is audit-logged** with before/after snapshots.
5. **No schema change, deploy, or migration required.**
6. **The human owner can perform this operation through the existing admin UI.**

---

## 7. Curation Options Analysis

### Option A — Keep `Initial practice` temporarily

| | |
|---|---|
| **Pros** | No mutation required. Preserves cycle-open fallback artifact as-is. |
| **Cons** | Student sees no interactive content (title doesn't match registry). Cycle 3 remains pedagogically weak. Student experience is poor — they see a load with no "Ver actividad" link. |
| **Risk** | Low operational risk, but high pedagogical risk. |

### Option B — Edit existing pending `Initial practice` to a registry-matched title

| | |
|---|---|
| **Pros** | Minimal mutation (single field update via PUT). Preserves one-load cycle shape. Converts fallback artifact into a usable in-app activity. Leverages existing audit logging. No schema/deploy needed. Human owner can do it from admin UI edit dialog. Status remains `pending` (not altered by PUT). |
| **Cons** | Fallback provenance is overwritten (mitigated by audit log capturing before/after). Must ensure title exactly matches registry key (exact string with em-dash). |
| **Risk** | Low — single PUT operation, admin-guarded, audit-logged, closed-cycle-safe (Cycle 3 is open). |

### Option C — Delete fallback and create one curated registry-matched StudyLoad

| | |
|---|---|
| **Pros** | Cleaner data semantics — new load has no fallback history. |
| **Cons** | More destructive — requires DELETE + CREATE (two mutations). Higher custody risk. Delete is irreversible. Loses the original auto-created record's timestamps and ID. |
| **Risk** | Medium — two operations instead of one. |

### Option D — Keep fallback and create an additional curated StudyLoad

| | |
|---|---|
| **Pros** | Preserves fallback record for auditability. Adds a real interactive activity. |
| **Cons** | Student sees two loads — one non-interactive (`Initial practice`) and one interactive. Adds noise and may confuse weekly workload expectation. |
| **Risk** | Medium — operational complexity and potential student confusion. |

### Option E — Populate SkillStates first

| | |
|---|---|
| **Pros** | Enables DN heuristic for future cycles. Long-term strategic value. |
| **Cons** | Does not solve the immediate Cycle 3 problem. Larger design decision. SkillState population should be a separate phase with its own analysis. Does not make the current fallback load interactive. |
| **Risk** | Low operational risk but doesn't address the immediate need. Should be a separate phase. |

---

## 8. Recommended Option

**Option B — Edit existing pending `Initial practice` to a registry-matched title.**

Rationale:

1. **Safest minimal mutation.** A single PUT to change `title` from `"Initial practice"` to `"PAES M1 — Refuerzo de ecuaciones lineales"`. No other fields need to change.
2. **Status remains `pending`.** The PUT endpoint does not modify status.
3. **loadType remains `practice`.** No change needed (already correct).
4. **Admin UI supports it.** The human owner clicks the pencil icon on the StudyLoad card, changes the title in the dialog, and saves.
5. **API is guarded.** Admin auth + open-cycle check + audit logging.
6. **No schema, deploy, or code change required.** The registry already contains the target activity.
7. **Audit trail preserved.** `recordAuditEvent()` captures `beforePayload` (with `"Initial practice"`) and `afterPayload` (with new title).
8. **Pedagogically appropriate.** `PAES M1 — Refuerzo de ecuaciones lineales` is the only PAES_M1 activity not yet used by Mauricio. It is a reinforcement-level activity — appropriate after an 8/8 result in Cycle 2.

---

## 9. Proposed FL-UX-4J-B Operation Plan

**Phase:** FL-UX-4J-B — Human-guided edit of Cycle 3 pending fallback StudyLoad
**Type:** Human-executed operation (Option A custody) + documentation

### Pre-operation

1. Document exact target title: `PAES M1 — Refuerzo de ecuaciones lineales`
2. Confirm the title uses the em-dash (—) not a hyphen (-)
3. Present the operation to the human owner for acceptance

### Operation (human owner executes)

1. Navigate to `/admin/study-loads` in the production admin UI
2. Filter by Mauricio's enrollment (or search for "Initial practice")
3. Click the pencil (✏️) icon on the `Initial practice` StudyLoad card
4. In the edit dialog, change the title to:
   ```
   PAES M1 — Refuerzo de ecuaciones lineales
   ```
5. Leave loadType as `practice` (no change needed)
6. Leave releasedAt and dueAt unchanged
7. Click "Save Changes"

### Post-operation verification

1. Confirm the StudyLoad now shows title `PAES M1 — Refuerzo de ecuaciones lineales`
2. Confirm status is still `pending`
3. Confirm loadType is still `practice`
4. Confirm no new StudyLoads were created
5. Confirm no Cycle 4 was created
6. Confirm Test Now, Ana, Bruno are unchanged
7. Document result

### Expected outcome

- Cycle 3 StudyLoad title: `PAES M1 — Refuerzo de ecuaciones lineales`
- Cycle 3 StudyLoad status: `pending` (unchanged)
- Cycle 3 StudyLoad loadType: `practice` (unchanged)
- Student-facing `/now` will show "Ver actividad" link for this load (registry match)
- Interactive MC activity with 8 items becomes available to Mauricio

---

## 10. Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| 1 | Title mismatch (typo, wrong dash) → no interactive content | Medium | Provide exact copy-paste title with em-dash. Verify in post-op. |
| 2 | Editing title overwrites fallback provenance | Low | Audit log captures before/after. Documented in this phase. |
| 3 | Creating a second load would confuse student | Low | Option B avoids this — only edits existing load. |
| 4 | Deleting fallback would lose auditability | Low | Option B avoids this — preserves the record. |
| 5 | Leaving fallback unchanged → poor student experience | Medium | Addressed by recommending Option B. |
| 6 | SkillState population is a separate concern | Low | Explicitly scoped out — separate phase recommended. |
| 7 | Status mutation via admin UI | Low | Status is a read-only badge (Phase EY). PUT does not modify status. |
| 8 | Accidentally touching Test Now/Ana/Bruno | Low | Operation is scoped to a single StudyLoad ID. Admin UI shows enrollment context. |
| 9 | .env / SQL custody issues | Low | Human owner executes via admin UI. No direct data access by Abacus. |
| 10 | Student-facing `/now` may not show "Ver actividad" until status changes | Low-Medium | Registry match enables the link on pending loads. Needs post-op verification by human owner visiting `/now` as Mauricio. |

---

## 11. Stop Conditions for FL-UX-4J-B

- Human owner does not accept the recommended title.
- Admin UI cannot open the edit dialog for the target StudyLoad.
- PUT endpoint returns an error.
- Title doesn't match registry after save (typo, encoding issue).
- Status changes unexpectedly during the edit.
- New StudyLoads are accidentally created.
- .env / SQL / DB access would be required.
- Test Now, Ana, or Bruno data is affected.
- Schema, deploy, or code change would be required.

---

## 12. Recommended Next Phase

**FL-UX-4J-B — Human-guided edit of Cycle 3 pending fallback StudyLoad to registry-matched PAES M1 activity.**

Target title: `PAES M1 — Refuerzo de ecuaciones lineales`

After FL-UX-4J-B, recommended future phases:
- **FL-UX-4K** — SkillState population for Mauricio / PAES_M1 (enables DN heuristic for Cycle 4+)
- Content registry expansion beyond ecuaciones lineales

---

## 13. What Was NOT Done

- No .env accessed
- No SQL mutations or reads
- No DB credentials used
- No Prisma CLI or scripts
- No deploy, no schema changes
- No StudyLoad edited, deleted, or created
- No Cycle 4 created
- No CycleDecisions created
- No CycleEvaluations created
- No SkillStates modified
- No Responses created
- No auth/admin code changes
- No seed/test credentials used
- No secrets inspected or printed
- No Test Now, Ana, or Bruno touched
- No operation-specific PDFs created

---

*Generated as part of FL-UX-4J-A. Readiness-only — no data mutations, no .env access, no DB access, no deploy, no schema changes.*
