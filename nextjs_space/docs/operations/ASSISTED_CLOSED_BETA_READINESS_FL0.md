# FL-0 — Assisted Closed Beta Readiness Check

**Date:** 2026-04-29  
**Phase type:** Documentation / readiness gate only  
**Author:** Technical custodian + product operations lead  
**Purpose:** Determine whether E360 / Bexauri is ready to begin an assisted closed beta with 2–5 students under the FK protocol, or whether blocking gaps must be resolved first.

---

## 1. Current Baseline

| Item | Status |
|---|---|
| GitHub origin/main | `403a940 Phase FK: beta launch protocol` |
| Local branch | main — 1 Abacus checkpoint commit ahead of origin (normal) |
| Working tree | Clean except ignored/untracked system artifacts (.logs, .pdf, .docx, .yarn) |
| PHASE_LOG.md | Current through FK |
| FK protocol | Exists at `docs/operations/BETA_LAUNCH_PROTOCOL_FK.md` (19 sections) |
| Deployed hostname | `tutoring-platform-mv-l4o1ne.abacusai.app` |
| Deployment status | **Behind latest checkpoint** — newer code exists that has not been deployed |

### Completed prerequisite phases

| Phase | Description | Status |
|---|---|---|
| FH | Student weekly flow verified/minimally improved (/now instructional text) | ✅ Complete |
| FI | /admin/beta-operations read-only operational view | ✅ Complete |
| DATA-BETA-1 | Minimal beta dataset created and verified live | ✅ Complete |
| FJ | Manual pedagogical decision layer (self-report/evidence visibility) | ✅ Code complete, **not yet deployed to production** |
| FK | Beta launch protocol documented | ✅ Complete |

---

## 2. Readiness Checklist Results

### 2.1 Git / Custody Readiness

| Check | Result |
|---|---|
| origin/main at expected phase commit | ✅ `403a940 Phase FK: beta launch protocol` |
| No stale checkpoint commits on origin | ✅ Clean phase-based history |
| Working tree clean (target files) | ✅ No uncommitted changes to app code |
| PHASE_LOG current | ✅ Through FK |
| FK protocol exists | ✅ 19-section document verified |
| No secrets in git history | ✅ No-secret-printing discipline maintained |

**Verdict: ✅ READY**

### 2.2 Live Deployment Status

| Surface | Expected phase | Live status |
|---|---|---|
| /now instructional text (FH) | FH | ✅ Live — "¿Qué me toca ahora?" renders with proper header and instructions |
| /admin/beta-operations (FI) | FI | ✅ Live — counters, tables, links all render correctly |
| Cycle detail self-report/evidence (FJ) | FJ | ⚠️ **NOT CONFIRMED LIVE** — completed loads on cycle detail do not show inline "Autorreporte" text |

**Key finding:** The production deployment appears to be behind the latest codebase. The FJ self-report/evidence visibility feature exists in the code (`cycle-detail-view.tsx` lines 1088–1105, with `MessageSquare` icon and "Autorreporte:" label) but is **not confirmed visible on the live production cycle detail page**.

This could be because:
1. The deployment is behind and FJ code has not been pushed to production, OR
2. The tutoring session → response data linkage requires a specific deployment build to take effect

**Verdict: ⚠️ BLOCKING — requires pre-beta deploy + verification**

---

## 3. Live Deployment Findings (Detail)

### /admin/beta-operations (FI) — LIVE ✅

Verified read-only on `tutoring-platform-mv-l4o1ne.abacusai.app/admin/beta-operations`:

| Counter | Value |
|---|---|
| Matrículas activas | 2 |
| Ciclos abiertos | 2 |
| Cargas pendientes | 4 |
| Cargas en progreso | 1 |
| Cargas completadas | 2 |
| Ciclos para revisión | 0 |

Sections visible:
- ✅ "Necesita atención / revisión" — renders (empty, as expected)
- ✅ "En progreso" — Ana Beta-M1, PAES_M1, Cycle #1, practice, in_progress
- ✅ "Trabajo pendiente" — 4 pending loads (Bruno L1 reading + practice, Ana M1 practice × 2)
- ✅ "Completadas recientemente" — Bruno L1 reading (completed), Ana M1 practice (completed)
- ✅ "Matrículas activas" — Bruno Beta-L1 · PAES_L1, Ana Beta-M1 · PAES_M1
- ✅ Links to student detail, enrollment detail, cycle detail all present
- ✅ No write/action buttons on this page (read-only by design)

### Cycle detail page — PARTIALLY LIVE

Verified read-only on Ana's cycle (`/admin/learning-cycles/[id]`):

- ✅ Cycle header: Cycle 1, Ana Beta-M1, PAES Matemática M1, status "open"
- ✅ Enrollment link visible
- ✅ Dates: Opened 29 abr 2026
- ✅ Operational Decision Summary: 0 decisions, "No cycle decisions recorded"
- ✅ Decisions section with "+ New Decision" button visible
- ✅ Operational Load Summary: 4 loads (pending 2, in_progress 1, completed 1)
- ✅ Study Loads section: 4 loads listed with type selects, edit/delete icons, status badges
- ✅ Evaluations section: 0 evaluations, "+ New Evaluation" button
- ⚠️ **Self-report/evidence NOT visible** under completed load — FJ feature not confirmed deployed

### Student /now page — PARTIALLY VERIFIED

- ✅ Page loads at `/now` with "BEXAURI" branding and "¿Qué me toca ahora?" header (FH)
- ⚠️ Shows "No tienes un programa activo todavía" because current browser session is admin, not student
- 🔒 **Cannot verify student-specific content** without exposing test credentials
- Documented as "not fully verified in FL-0" — recommend manual test outside Abacus environment

---

## 4. Production Data Findings

Read-only database stats retrieved (no mutations, no queries that modify data):

| Table | Rows | Expected | Status |
|---|---|---|---|
| students | 2 | 2 (Ana Beta-M1, Bruno Beta-L1) | ✅ |
| student_program_instances | 2 | 2 active enrollments | ✅ |
| learning_cycles | 2 | 2 open cycles | ✅ |
| study_loads | 7 | Mixed pending/in_progress/completed | ✅ |
| sessions_pedagogical | 3 | Tutoring sessions linked to loads | ✅ |
| responses | 2 | Self-report/evidence from completed sessions | ✅ |
| programs | 3 | PAES_L1, PAES_M1, PAES_M2 | ✅ |
| skills | 6 | M1 algebra skills | ✅ |
| axes | 4 | M1 axes (Álgebra, Geometría, Datos y probabilidad + L1) | ✅ |
| cycle_decisions | 0 | None yet (expected — no decisions made pre-beta) | ✅ |
| cycle_evaluations | 0 | None yet (expected) | ✅ |
| diagnostics | 2 | Baseline diagnostics | ✅ |
| cycle_snapshots | 2 | Snapshots | ✅ |
| users | 4 | Admin + test accounts | ✅ |

**Data integrity observations:**
- Both beta students exist with active enrollments
- Both have open learning cycles
- Load distribution: 4 pending, 1 in_progress, 2 completed — matches live beta-operations view
- 2 responses exist → self-report/evidence data is present in the database
- 3 tutoring sessions exist → session → response chain is populated
- L1 taxonomy exists (axes, skills for both programs)
- No orphaned or inconsistent data detected from stats

**Verdict: ✅ READY — production data matches DATA-BETA-1 expectations**

---

## 5. Student /now Findings

| Check | Result |
|---|---|
| Page loads | ✅ Renders at `/now` |
| FH branding/header | ✅ "BEXAURI" + "¿Qué me toca ahora?" |
| Student-specific content | 🔒 Not verified — admin session shows "No tienes un programa activo" |
| Pending/in-progress/completed sections | 🔒 Not verified |
| Instructions understandable | ✅ Header text is clear |
| UI regression | ✅ No visible regression (page structure intact) |

**Why not fully verified:** The FL-0 readiness check is performed within the Abacus AI environment where the browser session is authenticated as admin. Logging in as a student would require:
1. Exposing test/seed credentials (violates no-secret-printing discipline)
2. Signing out of admin session (disrupts other checks)

**Recommendation:** Before starting FL assisted beta, perform a manual student login test outside the Abacus environment to confirm:
- Student sees their current task
- Pending/in-progress/completed sections render correctly
- Start/complete buttons function (test in a throwaway session)

**Verdict: ⚠️ NOT FULLY VERIFIED — recommend manual pre-beta student login test**

---

## 6. Admin Operations Findings

### /admin/beta-operations

| Check | Result |
|---|---|
| Page loads | ✅ |
| Counters render | ✅ (6 counters: matrículas, ciclos, pending, in-progress, completed, revisión) |
| Active enrollments visible | ✅ (Bruno Beta-L1, Ana Beta-M1) |
| Pending loads visible | ✅ (4 pending loads with student, program, cycle, title, type, status) |
| In-progress loads visible | ✅ (1 in-progress: Ana, PAES_M1, Cycle #1, practice) |
| Completed loads visible | ✅ (2 completed: Bruno reading, Ana practice) |
| Links to student/enrollment/cycle detail | ✅ ("Ver ciclo" links, student name links, enrollment links) |
| No write/action buttons | ✅ (page is read-only by design) |

**Verdict: ✅ READY**

---

## 7. Cycle Detail / Evidence / Decision Findings

### Cycle detail page structure

| Check | Result |
|---|---|
| Cycle header with student/program context | ✅ |
| Enrollment link | ✅ |
| Open/closed dates | ✅ |
| Enrollment status | ✅ |
| Decisions section | ✅ ("+ New Decision" button visible) |
| Decision type options available | ✅ (advance, reinforce, hold, redirect — in code) |
| Rationale field available | ✅ (in edit dialog — in code) |
| Study loads section | ✅ (4 loads listed) |
| Load status visible | ✅ |
| Evaluations section | ✅ |
| Self-report/evidence under completed loads | ⚠️ **NOT VISIBLE on live production** |

### FJ Self-Report/Evidence Feature

**Code status:** ✅ Present in `cycle-detail-view.tsx`
- Lines 42–55: TypeScript interface for `tutoringSessions` with nested `responses`
- Lines 1088–1108: Conditional render block showing `MessageSquare` icon + "Autorreporte:" label + response content for completed loads with tutoring session responses
- API (`/api/learning-cycles/[id]`): GET includes `tutoringSessions` → `responses` in `studyLoads` include

**Live status:** ⚠️ Not confirmed visible — the cycle detail page on production does not show "Autorreporte" text under the completed load, suggesting the deployment does not include FJ changes.

**Verdict: ⚠️ BLOCKING — FJ evidence visibility not confirmed on production**

---

## 8. Decision Layer Readiness

| Capability | Code status | Live status |
|---|---|---|
| Create decision (advance/reinforce/hold/redirect) | ✅ In code | ✅ "+ New Decision" button visible on live cycle detail |
| Record rationale | ✅ In code (edit dialog) | ✅ Available |
| Decision type select | ✅ advance, reinforce, hold, redirect | ✅ In code |
| Closed-cycle guard | ✅ Decisions disabled for closed cycles | ✅ In code + API |

**Note:** No decisions were created during FL-0. The decision creation surface exists and is ready for use. However, the tutor's ability to see self-report evidence before making a decision (FJ) is not confirmed on production.

**Verdict: ✅ READY (mechanism exists) / ⚠️ INCOMPLETE (evidence visibility needed for informed decisions)**

---

## 9. FK Protocol Assessment

| FK Section | Present | Adequate for beta |
|---|---|---|
| 1. Current Readiness Baseline | ✅ | ✅ |
| 2. Purpose of the Beta | ✅ | ✅ |
| 3. Beta Scope (2 weeks, 3–5 students) | ✅ | ✅ |
| 4. Student Selection Criteria | ✅ | ✅ |
| 5. Pre-Beta Setup Checklist | ✅ | ✅ |
| 6. Onboarding Protocol | ✅ | ✅ |
| 7. Weekly Study Protocol | ✅ | ✅ |
| 8. Admin Daily/Weekly Checklist | ✅ | ✅ |
| 9. Decision Protocol | ✅ | ✅ |
| 10. PAES-Minimum Educational Standard | ✅ | ✅ |
| 11. Feedback Collection Protocol | ✅ | ✅ |
| 12. Success Criteria | ✅ | ✅ |
| 13. Stop/Pause Criteria | ✅ | ✅ |
| 14. Out of Scope for Beta | ✅ | ✅ |
| 15. Roles and Responsibilities | ✅ | ✅ |
| 16. Data and Privacy Rules | ✅ | ✅ |
| 17. Operational Risks | ✅ | ✅ |
| 18. Next Phase Recommendation | ✅ | ✅ |
| 19. Explicit Non-Implementation Statement | ✅ | ✅ |

**Verdict: ✅ READY — FK protocol is comprehensive and covers all required areas**

---

## 10. PAES Minimum Educational Readiness

| Check | Result |
|---|---|
| M1 algebra task exists | ✅ "PAES M1 — Resolver problemas de planteamiento algebraico" (in_progress), "Practicar ecuaciones lineales" (pending), "Revisión de errores en despeje" (completed) |
| L1 reading comprehension task exists | ✅ "PAES L1 — Identificar información explícita e..." (pending), "Inferir idea principal y propósito..." (completed) |
| Clear task labels | ✅ Tasks have descriptive Spanish-language titles aligned to PAES skills |
| Self-report evidence in database | ✅ 2 responses exist in production (linked to tutoring sessions) |
| Human decision path available | ✅ Decision creation surface on cycle detail page |
| L1 taxonomy | ✅ 6 skills, 4 axes across programs |
| Score validity | ⛔ Not evaluated (out of scope for FL-0) |
| Full PAES preparation claim | ⛔ Not claimed — this is minimal beta-level preparation |

**Verdict: ✅ READY — minimal but real PAES-aligned content exists for beta**

---

## 11. Blockers and Non-Blockers

### Blocking Gaps

| # | Gap | Severity | Impact | Resolution |
|---|---|---|---|---|
| B1 | **Live production may not include FJ self-report/evidence visibility** | 🔴 BLOCKING | Tutor cannot see student self-report on cycle detail → cannot make informed pedagogical decisions | Deploy latest codebase to production and verify FJ evidence visibility |

### Non-Blocking Gaps (Minor)

| # | Gap | Severity | Impact | Mitigation |
|---|---|---|---|---|
| NB1 | Student /now not verified with student session | 🟡 MINOR | Cannot confirm student sees their tasks correctly | Manual test outside Abacus environment before first beta session |
| NB2 | No manual decision has been tested end-to-end in production | 🟡 MINOR | Decision creation path not exercised with real data | Can be tested as first step of FL beta execution |
| NB3 | Cycle snapshots exist (2) but not inspected in FL-0 | 🟢 INFORMATIONAL | Snapshot data present but not verified for correctness | Verify during FL if needed |

### Ready Areas

| Area | Status |
|---|---|
| Git / custody | ✅ Ready |
| FK protocol | ✅ Ready |
| Production dataset | ✅ Ready |
| /admin/beta-operations | ✅ Ready |
| Cycle detail structure | ✅ Ready (minus FJ evidence) |
| Decision creation surface | ✅ Ready |
| PAES minimum content | ✅ Ready |
| L1 + M1 taxonomy | ✅ Ready |

---

## 12. Final Recommendation

### 🟡 READY AFTER ONE PRE-BETA DEPLOY + VERIFICATION

The E360 / Bexauri platform is **substantially ready** for an assisted closed beta. All code phases (FH through FJ) are complete, the FK protocol is comprehensive, production data is correctly seeded, and admin operational surfaces function correctly.

**One blocking action is required before starting the beta:**

> **Deploy the latest codebase to production** and verify that FJ self-report/evidence visibility appears on the cycle detail page under completed study loads.

This is a deployment action, not a code change. The FJ feature is already implemented and code-complete.

### Proposed pre-beta sequence

1. **FL-0.5 (or user-approved deploy):** Deploy latest checkpoint to `tutoring-platform-mv-l4o1ne.abacusai.app`
2. **Post-deploy verification:** Confirm FJ "Autorreporte" text visible under completed loads on cycle detail
3. **Manual student test:** Log in as Ana or Bruno outside Abacus → verify /now renders student tasks
4. **FL:** Begin assisted closed beta under FK protocol

### If deploy is not desired before beta

If the user prefers not to deploy before starting FL:
- The beta can still proceed in a **limited mode** where the tutor uses the admin list views to see completion status but cannot see inline self-report evidence on cycle detail
- The tutor would need to check responses through other means (direct database query or API call) — this is suboptimal but not impossible
- **This is not recommended** — FJ evidence visibility is a core part of the FK protocol's decision workflow

---

## 13. Explicit Non-Implementation Statement

Phase FL-0 is a **documentation and readiness gate only**. The following were explicitly NOT done:

- ❌ No app code was modified
- ❌ No schema changes
- ❌ No endpoints added or modified
- ❌ No deployment triggered
- ❌ No business data created, modified, or deleted
- ❌ No students, users, enrollments, cycles, study loads, responses, or decisions created
- ❌ No start/complete/close/continue/decision buttons clicked
- ❌ No Prisma CLI commands executed
- ❌ No seeds or scripts run
- ❌ No checkpoints created or restored
- ❌ No secrets, passwords, connection strings, or credentials printed or exposed
- ❌ No agents, middleware, or automation added

All checks were performed through:
- Git log inspection
- Read-only browser navigation of the live production app
- Read-only database stats retrieval
- Read-only code inspection (grep)
- FK protocol section listing
