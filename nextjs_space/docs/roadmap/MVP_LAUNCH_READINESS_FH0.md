# FH-0 — MVP Launch Readiness Gate

**Status:** Documentation only — no app code, schema, endpoints, middleware, agents, or data modified.  
**Purpose:** Declare and document the roadmap shift from non-critical hardening toward the MVP Launch Spine, while preserving governance, traceability, and minimal-phase discipline.

---

## 1. Current Clean Baseline

- **HEAD:** `d8702a7 Custody: close second audit logging block through FG`
- **Recently closed blocks:**
  - Phase FA: Action Governance Registry
  - Phase FB: SkillState value validation hardening
  - Phase FC: Audit Event Schema Proposal
  - Phase FD: AuditEvent schema and helper (14-field approved model)
  - Phase FE: First audited write endpoint (PATCH /api/skill-states/[id])
  - Phase FG: Second audited write endpoint (PUT /api/study-loads/[id])
  - CUST-BLOCK-FD and CUST-BLOCK-FG: Infrastructure and instrumentation blocks closed
- **Governance minimum is now sufficient to move toward MVP.** The project has an action governance registry, an approved audit schema, two instrumented endpoints demonstrating the pattern, and a proven custody discipline.

## 2. Strategic Decision

**Pause non-critical hardening.** The audit logging pattern is proven. Expanding it to all ~75 write handlers by inertia would consume significant effort without moving the product toward a usable beta.

**Do not continue audit logging expansion by inertia.** The two instrumented endpoints (SkillState PATCH, StudyLoad PUT) are sufficient to validate the pattern. Additional endpoints can be instrumented incrementally as they become part of the active beta flow.

**Preserve governance and custody.** The roadmap shift does not weaken PHASE_LOG, anti-checkpoint verification, no-secret-printing policy, minimal phases, custody discipline, or GitHub main cleanliness.

**Move toward MVP Launch Spine.** The guiding question becomes: *What is still missing for a real student to complete one traceable week of study in E360 / Bexauri?*

## 3. MVP Launch Spine

The target operational chain for one complete student week:

```
Student enrolled
→ program assigned
→ starting point / diagnostic registered
→ learning cycle created (with auto-generated initial study loads)
→ study load released
→ student sees current work on /now
→ student starts work ("Empezar")
→ student completes work with self-report ("Terminar")
→ evidence/self-report captured (Response row)
→ admin reviews progress (cycle detail view)
→ admin closes cycle (POST /close)
→ human decision registered (CycleDecision)
→ admin authorizes continuity (POST /continue)
→ next cycle created with next load prepared
```

Each arrow represents a transition that must work end-to-end for the beta to be functional.

## 4. Existing Capabilities Observed

Based on read-only code inspection:

| Capability | Status | Evidence |
|---|---|---|
| Create student | ✅ Exists | POST /api/students, admin students-view |
| Create enrollment | ✅ Exists | POST /api/instances, admin instances-view |
| Assign program | ✅ Exists | Programs CRUD, enrollment creation |
| Register diagnostic | ✅ Exists | POST /api/diagnostics, /api/diagnostics/authoritative, /api/diagnostics/tactical-reading |
| Create learning cycle | ✅ Exists | POST /api/learning-cycles (with auto-generated StudyLoads, CycleSnapshot, precondition guards including diagnostic requirement) |
| Create/release study load | ✅ Exists | POST /api/study-loads, PUT /api/study-loads/[id] for metadata edits |
| Student sees current work | ✅ Exists | /now page (Phase DO) — shows pending, in-progress, and completed loads |
| Student starts work | ✅ Exists | POST /api/study-loads/[id]/start (Phase DP) — pending → in_progress, creates TutoringSession |
| Student completes work | ✅ Exists | POST /api/study-loads/[id]/complete (Phase DQ) — in_progress → completed, self-report captured |
| Evidence/self-report captured | ✅ Exists | Response row created by /complete with one of three self-report options |
| Admin reviews progress | ✅ Exists | /admin/learning-cycles/[id] detail view, study-loads view, cycle-evaluations view |
| Admin closes cycle | ✅ Exists | POST /api/learning-cycles/[id]/close (Phase DS) — CycleSnapshot created |
| Admin records human decision | ✅ Exists | POST /api/cycle-decisions with closed-cycle guard |
| Admin records evaluation | ✅ Exists | POST /api/cycle-evaluations with closed-cycle guard |
| Admin authorizes continuity | ✅ Exists | POST /api/learning-cycles/[id]/continue (Phase DT) — ContinuitySignal emitted |
| Next cycle creation | ✅ Exists | POST /api/learning-cycles with P4b precondition (ContinuitySignal required) |
| Audit logging on key writes | ✅ Exists | SkillState PATCH, StudyLoad PUT |
| Skill state management | ✅ Exists | CRUD + inline editing in admin |
| Continuity-start subsystem | ✅ Exists | 6 endpoints under /api/continuity-start/ |
| "All caught up" state | ✅ Exists | /now handles no-pending-loads gracefully (Phase DR) |

**Observation:** The core operational chain appears to exist end-to-end at the API and UI level. The primary question is whether these pieces connect into a seamless beta flow without gaps, dead ends, or confusing UX.

**Unclear / needs verification:**
- Whether the /now → /admin round-trip flow is smooth enough for a real tutor + student pair
- Whether CycleDecision must exist before /continue can be called (or if it's optional)
- Whether the admin cycle detail view surfaces enough information for decision-making
- Whether study load "release" semantics (releasedAt) affect visibility on /now
- Whether the student↔user email linkage (provisional, noted in /now) is robust enough for beta

## 5. MVP Beta Must-Haves

Minimum required for a functional closed beta with 2–5 students:

| # | Capability | Current state |
|---|---|---|
| 1 | Create student | ✅ |
| 2 | Create enrollment | ✅ |
| 3 | Assign program | ✅ |
| 4 | Register starting point or diagnostic | ✅ (manual via admin) |
| 5 | Create learning cycle | ✅ (auto-generates loads) |
| 6 | Create/release study load | ✅ |
| 7 | Student sees current work | ✅ (/now) |
| 8 | Student starts work | ✅ ("Empezar") |
| 9 | Student completes work | ✅ ("Terminar" + self-report) |
| 10 | Evidence/self-report captured | ✅ (Response row) |
| 11 | Admin reviews progress | ✅ (cycle detail) |
| 12 | Admin closes cycle | ✅ (/close) |
| 13 | Admin records human decision | ✅ (CycleDecision) |
| 14 | Admin prepares next load | ✅ (/continue → new cycle) |
| 15 | Traceability intact | ✅ (CycleSnapshots, AuditEvents, Responses) |

**Key finding:** Most beta must-haves appear to exist. The next phases should focus on **verification, gap-closing, and operational polish** rather than building new subsystems from scratch.

## 6. Post-MVP Items

Explicitly postponed to after beta launch:

- Universal audit logging (expand beyond the two instrumented endpoints)
- Non-critical hardening (additional endpoint guards, extended validation)
- Advanced dashboards (analytics, progress visualization, reports)
- Native mobile app
- Automatic pedagogical content generation
- AI agents (learning assistants, diagnostic generators)
- Runtime governance for agents (HITL gates, allowlists)
- Complex integrations (LMS, external APIs)
- Automated billing
- Advanced analytics and metrics
- Full adaptive engine (automated skill-state recalculation, difficulty adjustment)

## 7. Do-Not-Open-Now List

Explicitly do not open these work streams before the beta flow works:

- **Do not open AI agents yet.** The governance infrastructure exists but agents are not needed for beta.
- **Do not open middleware.** The current auth middleware is sufficient.
- **Do not open adaptive automation.** Manual human decisions are the beta model.
- **Do not redesign architecture.** The current schema and API structure are adequate for beta.
- **Do not introduce major schema changes.** The current models support the full operational chain.
- **Do not start universal endpoint auditing.** The two audited endpoints prove the pattern; expand only as needed.
- **Do not build advanced dashboards before the beta flow works.** Admin views exist and are functional.

## 8. Recommended Next Phases

### FH — Student Weekly Flow Verification / Completion
**Purpose:** Verify end-to-end that a real student can complete one full week cycle, from enrollment through cycle close and next-cycle creation. Identify and fix any gaps, dead ends, or broken transitions.

**Expected scope:**
- Walk through the complete operational chain with test data
- Verify /now shows correct state at each step
- Verify admin can see, close, decide, and continue
- Fix any gaps or broken transitions discovered
- Minimal code changes only where the chain is broken

**Out of scope:** New features, new admin views, new endpoints, schema changes, audit expansion, dashboards, agents.

### FI — Admin Beta Operations View
**Purpose:** Ensure the admin interface provides sufficient visibility for a tutor to operate the beta — see students, see cycles, see progress, make decisions, close cycles, authorize continuity.

**Expected scope:**
- Verify admin navigation covers the operational chain
- Fix any admin views that don't surface the right information for decisions
- Ensure the cycle detail view is operationally complete
- Minimal code changes only where admin visibility is insufficient

**Out of scope:** Advanced dashboards, analytics, reports, new admin features beyond operational necessity.

### FJ — Manual Pedagogical Decision Layer
**Purpose:** Ensure the human decision workflow is clear and complete — the tutor can review evidence, record a CycleDecision with rationale, and the decision is visible in the audit trail.

**Expected scope:**
- Verify CycleDecision creation flow is clear
- Ensure rationale is captured and visible
- Verify the decision-to-continuity path works
- Minimal code changes only where the decision flow is unclear or incomplete

**Out of scope:** Automated decisions, AI-assisted decisions, decision analytics.

### FK — Beta Launch Protocol
**Purpose:** Define the operational protocol for launching the closed beta — student onboarding, tutor guide, monitoring plan, escalation path.

**Expected scope:**
- Documentation: beta launch checklist
- Documentation: student onboarding steps
- Documentation: tutor operational guide
- Verify production deployment is current and functional
- Minimal code changes only if deployment reveals issues

**Out of scope:** Marketing, public launch, automated onboarding.

### FL — Assisted Closed Beta with 2–5 Students
**Purpose:** Run the actual beta with real students, observe, and collect feedback.

**Expected scope:**
- Enroll 2–5 real students
- Tutor operates the platform manually
- Collect feedback on gaps, confusion, and friction
- Document findings for post-beta improvements

**Out of scope:** Feature development during beta (fix critical bugs only).

## 9. Beta Readiness Definition

**The correct beta launch milestone is:**

> A real student can complete one week of study in E360 / Bexauri, and the team can see evidence, close the cycle, record a decision, and prepare the next load without breaking traceability.

This is the minimum viable operating loop. Everything else is enhancement.

## 10. Cost-Control Implication

- **Use ChatGPT / Gemini / cheaper models for:** strategy, research, documentation, prompt preparation, scope reduction, planning, review, and non-sensitive analysis.
- **Use Abacus robustly for:** schema changes, write endpoint implementation, audit logging, auth changes, production deployment, official repo changes, and any work that touches the live codebase or production database.
- **Do not use cheaper agents for:** schema, write endpoints, audit logging, auth, production, deploy, or official repo changes. These require the governance discipline that Abacus sessions enforce.

## 11. Governance Preserved

This roadmap shift does **not** weaken:

- **PHASE_LOG** — continues to be updated for every phase
- **Anti-checkpoint verification** — checkpoint commits never pushed to GitHub
- **No-secret-printing policy** — no passwords, tokens, connection strings, or secrets printed in any output
- **Minimal phases** — one concern per phase, strict scope boundaries
- **Custody discipline** — custody blocks close each logical unit of work
- **Governance before agents** — AI agents will not be introduced until governance infrastructure is ready
- **GitHub main cleanliness** — only clean, minimal commits on main

## 12. Explicit Non-Implementation Statement

**FH-0 does not:**
- Modify app code
- Modify schema
- Modify endpoints
- Instrument anything
- Add middleware
- Add agents
- Deploy
- Mutate data

This phase is documentation only. Implementation begins in Phase FH.
