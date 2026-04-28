# Action Governance Registry — E360 / Bexauri Adaptive Tutoring Platform

**Version:** 1.0  
**Created:** 2026-04-28  
**Phase:** FA  
**Baseline commit:** `cd19853` — *Custody: close StudyLoad status integrity block through EZ*  
**Status:** Documentation-only · No runtime enforcement  

---

## A. Purpose

This registry is the **governance source of truth** for every write action (mutation endpoint) in the E360/Bexauri platform. Its objectives are:

1. **Map the current action surface.** Every API endpoint that creates, modifies, or deletes data is classified by authority tier, risk level, human-in-the-loop requirement, audit need, and future agent permission.

2. **Prepare for AI-agent-safe architecture.** Future autonomous agents (tutoring assistants, adaptive-logic executors, administrative bots) must operate within governance boundaries defined by this registry — not by prompt trust or ad-hoc permission.

3. **Enable incremental hardening.** Each endpoint can be hardened individually against its registry classification without requiring a monolithic governance migration.

**This document does not implement agents, middleware, or runtime controls.** It is a classification and policy artifact that future implementation phases will reference.

---

## B. Governance Principles

| # | Principle | Implication |
|---|---|---|
| GP-1 | **Architecture, not prompt trust, defines authority.** | Agent permissions are declared in code (middleware, allowlists, policy configs), never assumed from natural-language instructions. |
| GP-2 | **Agents may propose before they execute.** | For sensitive actions, agents create proposals that a human reviews and approves. Direct execution is the exception, not the default. |
| GP-3 | **Sensitive actions require human approval.** | Cycle close, continuity authorization, mastery-level changes, and enrollment deletion must pass through a human-in-the-loop gate before taking effect. |
| GP-4 | **Critical state transitions must go through guarded endpoints.** | Status changes on LearningCycle and StudyLoad are restricted to dedicated protected endpoints (close, continue, start, complete). Generic PATCH mutations are blocked. |
| GP-5 | **Evidence records require auditability and immutability discipline.** | CycleSnapshots, Responses, TutoringSessions, and ContinuitySignals are evidence of learning. Once created, they should become append-only or require elevated authorization to modify. |
| GP-6 | **Future tool-calling must be allowlisted and policy-checked.** | An agent's callable tools are defined by an explicit allowlist. Any tool not on the list is inaccessible regardless of the agent's instructions. |
| GP-7 | **Runtime budgets and circuit breakers are required before agent execution.** | Before any agent operates, per-actor per-action budgets (max N actions per time window) and circuit breakers (halt on anomaly threshold) must be enforced. |

---

## C. Authority Tiers

| Tier | Code | Definition | Example |
|---|---|---|---|
| 0 | `READ_ONLY` | No mutation capability. Can read any data the session authorizes. | GET endpoints, dashboard views |
| 1 | `STUDENT_SELF_ACTION` | Actions a student performs on their own data (future). | Submit response, mark activity complete |
| 2 | `ADMIN_MANUAL_ACTION` | Standard admin CRUD on reference data or enrollment management. | Create program, edit student, manage axes/skills |
| 3 | `SYSTEM_GENERATED_ACTION` | Actions that should only be triggered by the workflow engine as side effects of guarded transitions. | TutoringSession creation (side effect of start), Response creation (side effect of complete), CycleSnapshot creation (side effect of cycle open/close) |
| 4 | `HUMAN_APPROVED_OPERATIONAL_ACTION` | High-impact actions that require explicit human confirmation even when initiated programmatically. | Cycle close, continuity authorization, enrollment deletion |
| 5 | `AGENT_PROPOSE_ONLY` | An agent may draft/propose this action, but execution requires human approval. | Propose next cycle parameters, suggest skill-state adjustment |
| 6 | `AGENT_EXECUTE_WITH_GOVERNANCE` | An agent may execute this action autonomously, but only under runtime policy (budget, allowlist, audit trail, circuit breaker). | Auto-generate study loads within an approved cycle |
| 7 | `NEVER_AGENT_EXECUTABLE` | This action must never be performed by an autonomous agent under any governance model. | Delete enrollment with learning history, bulk mastery reset |

---

## D. Risk Levels

| Level | Code | Definition | Recovery |
|---|---|---|---|
| Low | `LOW` | Affects only reference data. No downstream adaptive or evidence impact. Easy to reverse. | Simple undo/re-create |
| Medium | `MEDIUM` | Affects operational data. May require manual correction but does not corrupt evidence or adaptive state. | Manual data fix |
| High | `HIGH` | Affects evidence records or operational state. Incorrect execution may distort adaptive logic for one enrollment/cycle. | Requires audit trail to detect and targeted correction |
| Critical | `CRITICAL` | Affects mastery state, cycle progression, or evidence integrity. Incorrect execution cascades through DN/DU adaptive logic into all future cycles. | Requires full audit trail + potential rollback of derived state |

---

## E. Audit Requirement Levels

| Level | Code | Definition |
|---|---|---|
| 1 | `TIMESTAMP_ONLY` | Current posture for most endpoints. Only `createdAt`/`updatedAt` recorded. No actor, no before/after state. |
| 2 | `MUTATION_LOG_REQUIRED` | Every mutation must record: actor ID, action type, timestamp, affected record ID, changed fields. |
| 3 | `FULL_BEFORE_AFTER_REQUIRED` | In addition to mutation log: full before-state and after-state of the record must be captured. |
| 4 | `APPEND_ONLY_EVIDENCE` | Record is immutable after creation. Updates create new versioned records. Deletions are soft-delete only. |
| 5 | `HUMAN_APPROVAL_REQUIRED` | Mutation requires a recorded human approval event (approver ID, timestamp, rationale) before execution. |

---

## F. Action Registry Table

### F.1 — LearningCycle

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/learning-cycles` | POST | Create cycle with adaptive load generation | **Fully guarded** — P1 (enrollment active), P2 (continuityState normal), P3 (no open cycle), P4a/P4b (diagnostic or continue signal), atomic transaction, CycleSnapshot, StudyLoad generation | `HUMAN_APPROVED_OPERATIONAL_ACTION` | CRITICAL | **Required** — commits adaptive resources, generates loads | `AGENT_PROPOSE_ONLY` | `FULL_BEFORE_AFTER_REQUIRED` | Heavy guard chain in place. Missing: actor attribution, operation correlation ID. |
| `/api/learning-cycles/[id]` | PATCH | **BLOCKED** (EV) | Returns 405 unconditionally | N/A — sealed | N/A | N/A | `NEVER_AGENT_EXECUTABLE` | N/A | Correctly hardened. Directs to /close or /continue. |
| `/api/learning-cycles/[id]/close` | POST | Close cycle | **Fully guarded** — all loads must be completed, CycleSnapshot creation, atomic transaction | `HUMAN_APPROVED_OPERATIONAL_ACTION` | CRITICAL | **Required** — finalizes all cycle evidence | `AGENT_PROPOSE_ONLY` | `FULL_BEFORE_AFTER_REQUIRED` + `HUMAN_APPROVAL_REQUIRED` | Strong guards. Missing: actor attribution, approval record. |
| `/api/learning-cycles/[id]/continue` | POST | Authorize cycle progression | **Fully guarded** — idempotency check, ContinuitySignal creation | `HUMAN_APPROVED_OPERATIONAL_ACTION` | CRITICAL | **Required** — strategic pedagogical decision | `AGENT_PROPOSE_ONLY` | `FULL_BEFORE_AFTER_REQUIRED` + `HUMAN_APPROVAL_REQUIRED` | Strong guards. Missing: actor attribution, approval rationale record. |

### F.2 — StudyLoad

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/study-loads` | POST | Create study load | **Guarded** — EZ: only `pending` status accepted, closed-cycle guard | `SYSTEM_GENERATED_ACTION` | HIGH | Recommended | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` | Normally created as side effect of cycle creation. Direct creation should be governed. |
| `/api/study-loads/[id]` | PATCH | **BLOCKED** (EY) | Returns 405 unconditionally | N/A — sealed | N/A | N/A | `NEVER_AGENT_EXECUTABLE` | N/A | Correctly hardened. Directs to /start or /complete. |
| `/api/study-loads/[id]` | PUT | Update title/loadType/dates | **Partial** — closed-cycle guard, auth | `ADMIN_MANUAL_ACTION` | MEDIUM | Not required | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` | Missing: mutation log, actor attribution. |
| `/api/study-loads/[id]` | DELETE | Delete study load | **Partial** — closed-cycle guard, auth | `ADMIN_MANUAL_ACTION` | HIGH | Recommended | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` | Hard delete. No soft-delete. No trace of deletion. |
| `/api/study-loads/[id]/start` | POST | Transition pending→in_progress | **Fully guarded** — status guard chain, TutoringSession side effect | `SYSTEM_GENERATED_ACTION` | HIGH | Not required (guards sufficient) | `AGENT_EXECUTE_WITH_GOVERNANCE` | `FULL_BEFORE_AFTER_REQUIRED` | Strong guards. Missing: actor attribution. |
| `/api/study-loads/[id]/complete` | POST | Transition in_progress→completed | **Fully guarded** — status guard chain, Response side effect | `SYSTEM_GENERATED_ACTION` | HIGH | Not required (guards sufficient) | `AGENT_EXECUTE_WITH_GOVERNANCE` | `FULL_BEFORE_AFTER_REQUIRED` | Strong guards. Missing: actor attribution. |

### F.3 — CycleDecision

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/cycle-decisions` | POST | Create decision | **Partial** — closed-cycle guard, auth | `HUMAN_APPROVED_OPERATIONAL_ACTION` | HIGH | **Required** — pedagogical judgment | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` | Decisions record pedagogical reasoning. Should require human authorship/approval. |
| `/api/cycle-decisions/[id]` | PUT | Update decision | **Partial** — implied closed-cycle guard, auth | `HUMAN_APPROVED_OPERATIONAL_ACTION` | HIGH | **Required** | `AGENT_PROPOSE_ONLY` | `FULL_BEFORE_AFTER_REQUIRED` | Missing: mutation log, before/after state. |
| `/api/cycle-decisions/[id]` | DELETE | Delete decision | **Minimal** — auth only | `ADMIN_MANUAL_ACTION` | HIGH | Recommended | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` | Hard delete. No trace. Decisions are evidence — deletion should be restricted. |

### F.4 — CycleDecisionSkill

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/cycle-decision-skills` | POST | Create decision-skill link | **Minimal** — auth only | `ADMIN_MANUAL_ACTION` | MEDIUM | Not required | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` | Links decisions to skills. |
| `/api/cycle-decision-skills/[id]` | PATCH | Update decision-skill | **Partial** — EW: closed-cycle guard | `ADMIN_MANUAL_ACTION` | MEDIUM | Not required | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` | Missing: mutation log. |
| `/api/cycle-decision-skills/[id]` | DELETE | Delete decision-skill | **Partial** — EW: closed-cycle guard | `ADMIN_MANUAL_ACTION` | MEDIUM | Not required | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` | Hard delete. |

### F.5 — CycleEvaluation

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/cycle-evaluations` | POST | Create evaluation | **Partial** — closed-cycle guard, auth | `HUMAN_APPROVED_OPERATIONAL_ACTION` | HIGH | **Required** — evaluation is pedagogical judgment | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` | Evaluations are evidence. Should be append-only once created. |
| `/api/cycle-evaluations/[id]` | PUT | Update evaluation | **Minimal** — auth only | `HUMAN_APPROVED_OPERATIONAL_ACTION` | HIGH | **Required** | `AGENT_PROPOSE_ONLY` | `FULL_BEFORE_AFTER_REQUIRED` | Missing: closed-cycle guard on update, mutation log. |
| `/api/cycle-evaluations/[id]` | DELETE | Delete evaluation | **Minimal** — auth only | `ADMIN_MANUAL_ACTION` | HIGH | Recommended | `NEVER_AGENT_EXECUTABLE` | `MUTATION_LOG_REQUIRED` | Hard delete of evidence. Should be restricted or soft-delete. |

### F.6 — CycleSnapshot

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/cycle-snapshots` | POST | Create snapshot | **Open CRUD** — auth only | `SYSTEM_GENERATED_ACTION` | CRITICAL | **Required** if direct — snapshots are normally system-generated | `NEVER_AGENT_EXECUTABLE` (direct) | `APPEND_ONLY_EVIDENCE` | Snapshots should only be created by guarded workflows (cycle open/close). Direct CRUD is a governance gap. |
| `/api/cycle-snapshots/[id]` | PATCH | Update snapshot | **Open CRUD** — auth only | `NEVER_AGENT_EXECUTABLE` | CRITICAL | **Required** | `NEVER_AGENT_EXECUTABLE` | `APPEND_ONLY_EVIDENCE` | Evidence mutation. Snapshots must be immutable after creation. |
| `/api/cycle-snapshots/[id]` | DELETE | Delete snapshot | **Open CRUD** — auth only | `NEVER_AGENT_EXECUTABLE` | CRITICAL | **Required** | `NEVER_AGENT_EXECUTABLE` | `APPEND_ONLY_EVIDENCE` | Evidence destruction. Should be blocked entirely or require highest-level authorization. |

### F.7 — ContinuitySignal

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/continuity-signals` | POST | Create continuity signal | **Open CRUD** — auth only | `SYSTEM_GENERATED_ACTION` | CRITICAL | **Required** if direct — signals are normally created by /continue endpoint | `NEVER_AGENT_EXECUTABLE` (direct) | `APPEND_ONLY_EVIDENCE` | Signals authorize cycle progression. Fabrication enables unauthorized continuation. |
| `/api/continuity-signals/[id]` | PATCH | Update signal | **Open CRUD** — auth only | `NEVER_AGENT_EXECUTABLE` | CRITICAL | **Required** | `NEVER_AGENT_EXECUTABLE` | `APPEND_ONLY_EVIDENCE` | Evidence mutation. Signals must be immutable. |
| `/api/continuity-signals/[id]` | DELETE | Delete signal | **Open CRUD** — auth only | `NEVER_AGENT_EXECUTABLE` | CRITICAL | **Required** | `NEVER_AGENT_EXECUTABLE` | `APPEND_ONLY_EVIDENCE` | Evidence destruction. Deletion could orphan cycle-continuation references. |

### F.8 — Enrollment (StudentProgramInstance)

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/instances` | POST | Create enrollment | **Minimal** — auth, required fields | `ADMIN_MANUAL_ACTION` | MEDIUM | Not required | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` | Standard admin operation. |
| `/api/instances/[id]` | PATCH | Update enrollment fields | **Minimal** — auth only | `ADMIN_MANUAL_ACTION` | MEDIUM | Not required | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` | Missing: field-level guard (e.g., currentCycleId should be system-only). |
| `/api/instances/[id]` | PUT | Full update enrollment | **Minimal** — auth only | `ADMIN_MANUAL_ACTION` | MEDIUM | Not required | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` | Same field-level concern as PATCH. |
| `/api/instances/[id]` | DELETE | Delete enrollment | **Minimal** — auth only | `HUMAN_APPROVED_OPERATIONAL_ACTION` | CRITICAL | **Required** — destroys all enrollment context | `NEVER_AGENT_EXECUTABLE` | `HUMAN_APPROVAL_REQUIRED` | Hard delete. Should require confirmation, soft-delete, or cascade audit. |
| `/api/instances/[id]/acknowledge` | POST | Acknowledge attention flag | **Minimal** — auth only | `ADMIN_MANUAL_ACTION` | LOW | Not required | `AGENT_EXECUTE_WITH_GOVERNANCE` | `TIMESTAMP_ONLY` | Low-risk operational action. |

### F.9 — SkillState

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/skill-states` | POST | Create skill state | **Minimal** — auth, unique constraint | `SYSTEM_GENERATED_ACTION` | HIGH | Recommended | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` | Skill states are initialized by system. Direct creation should be governed. |
| `/api/skill-states/[id]` | PATCH | Update mastery/confidence/reinforcement | **Minimal** — auth only, sets lastEvaluatedAt | `HUMAN_APPROVED_OPERATIONAL_ACTION` | CRITICAL | **Required** — mastery changes cascade through DN/DU adaptive logic | `FULL_BEFORE_AFTER_REQUIRED` | **Largest governance gap.** No closed-cycle guard. No before/after state. No actor attribution. Single most sensitive mutation in the system. |

### F.10 — TutoringSession

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/tutoring-sessions` | POST | Create tutoring session | **Open CRUD** — auth only | `SYSTEM_GENERATED_ACTION` | HIGH | **Required** if direct — sessions are normally side effects of /start | `NEVER_AGENT_EXECUTABLE` (direct) | `APPEND_ONLY_EVIDENCE` | Evidence of learning activity. Should only be created by guarded workflow. |
| `/api/tutoring-sessions/[id]` | PATCH | Update session | **Open CRUD** — auth only | `ADMIN_MANUAL_ACTION` | HIGH | Recommended | `AGENT_PROPOSE_ONLY` | `FULL_BEFORE_AFTER_REQUIRED` | Evidence mutation. Should be restricted. |
| `/api/tutoring-sessions/[id]` | DELETE | Delete session | **Open CRUD** — auth only | `NEVER_AGENT_EXECUTABLE` | HIGH | **Required** | `NEVER_AGENT_EXECUTABLE` | `APPEND_ONLY_EVIDENCE` | Evidence destruction. |

### F.11 — Response

| Endpoint | Method | Current Role | Current Guard Posture | Authority Tier | Risk | HITL | Future Agent Permission | Audit Requirement | Notes / Known Gaps |
|---|---|---|---|---|---|---|---|---|---|
| `/api/responses` | POST | Create response | **Open CRUD** — auth only | `SYSTEM_GENERATED_ACTION` | HIGH | **Required** if direct — responses are normally side effects of /complete | `NEVER_AGENT_EXECUTABLE` (direct) | `APPEND_ONLY_EVIDENCE` | Evidence of student work. Should only be created by guarded workflow. |
| `/api/responses/[id]` | PATCH | Update response | **Open CRUD** — auth only | `ADMIN_MANUAL_ACTION` | HIGH | Recommended | `AGENT_PROPOSE_ONLY` | `FULL_BEFORE_AFTER_REQUIRED` | Evidence mutation. Should be restricted. |
| `/api/responses/[id]` | DELETE | Delete response | **Open CRUD** — auth only | `NEVER_AGENT_EXECUTABLE` | HIGH | **Required** | `NEVER_AGENT_EXECUTABLE` | `APPEND_ONLY_EVIDENCE` | Evidence destruction. |

### F.12 — Reference Data (Programs, Axes, Skills, Students)

| Endpoint | Method | Current Guard | Authority Tier | Risk | HITL | Agent Permission | Audit |
|---|---|---|---|---|---|---|---|
| `/api/programs` | POST | Auth | `ADMIN_MANUAL_ACTION` | LOW | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `TIMESTAMP_ONLY` |
| `/api/programs/[id]` | PUT | Auth | `ADMIN_MANUAL_ACTION` | LOW | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` |
| `/api/programs/[id]` | DELETE | Auth | `ADMIN_MANUAL_ACTION` | MEDIUM | Recommended | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` |
| `/api/axes` | POST | Auth | `ADMIN_MANUAL_ACTION` | LOW | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `TIMESTAMP_ONLY` |
| `/api/axes/[id]` | PUT | Auth | `ADMIN_MANUAL_ACTION` | LOW | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` |
| `/api/axes/[id]` | DELETE | Auth | `ADMIN_MANUAL_ACTION` | MEDIUM | Recommended | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` |
| `/api/skills` | POST | Auth | `ADMIN_MANUAL_ACTION` | LOW | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `TIMESTAMP_ONLY` |
| `/api/skills/[id]` | PUT | Auth | `ADMIN_MANUAL_ACTION` | LOW | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` |
| `/api/skills/[id]` | DELETE | Auth | `ADMIN_MANUAL_ACTION` | MEDIUM | Recommended | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` |
| `/api/students` | POST | Auth | `ADMIN_MANUAL_ACTION` | LOW | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `TIMESTAMP_ONLY` |
| `/api/students/[id]` | PUT | Auth | `ADMIN_MANUAL_ACTION` | LOW | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` |
| `/api/students/[id]` | DELETE | Auth | `ADMIN_MANUAL_ACTION` | MEDIUM | Recommended | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` |

### F.13 — Auth

| Endpoint | Method | Current Guard | Authority Tier | Risk | HITL | Agent Permission | Audit |
|---|---|---|---|---|---|---|---|
| `/api/auth/login` | POST | Credential validation, bcrypt | `STUDENT_SELF_ACTION` | LOW | No | `NEVER_AGENT_EXECUTABLE` | `TIMESTAMP_ONLY` |
| `/api/signup` | POST | Validation, duplicate check | `STUDENT_SELF_ACTION` | MEDIUM | No | `NEVER_AGENT_EXECUTABLE` | `MUTATION_LOG_REQUIRED` |
| `/api/auth/[...nextauth]` | * | NextAuth managed | System | LOW | No | `NEVER_AGENT_EXECUTABLE` | `TIMESTAMP_ONLY` |

### F.14 — Diagnostics

| Endpoint | Method | Current Guard | Authority Tier | Risk | HITL | Agent Permission | Audit |
|---|---|---|---|---|---|---|---|
| `/api/diagnostics` | POST | Auth | `ADMIN_MANUAL_ACTION` | MEDIUM | No | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` |
| `/api/diagnostics/[id]` | PATCH | Auth, complex logic (~100+ lines) | `ADMIN_MANUAL_ACTION` | HIGH | Recommended | `AGENT_PROPOSE_ONLY` | `FULL_BEFORE_AFTER_REQUIRED` |
| `/api/diagnostics/[id]` | DELETE | Auth | `ADMIN_MANUAL_ACTION` | HIGH | Recommended | `AGENT_PROPOSE_ONLY` | `MUTATION_LOG_REQUIRED` |

### F.15 — Continuity-Start (Convergence)

| Endpoint | Method | Current Guard | Authority Tier | Risk | HITL | Agent Permission | Audit |
|---|---|---|---|---|---|---|---|
| `/api/continuity-start/convergence/record` | POST | Auth | `SYSTEM_GENERATED_ACTION` | HIGH | Recommended | `AGENT_EXECUTE_WITH_GOVERNANCE` | `MUTATION_LOG_REQUIRED` |

---

## G. Human-in-the-Loop Matrix

| Action | HITL Requirement | Rationale |
|---|---|---|
| **Cycle close** (`POST /learning-cycles/[id]/close`) | **REQUIRED** | Finalizes all learning evidence for a cycle. Irreversible pedagogical checkpoint. Incorrect close corrupts the evidence chain. |
| **Continuity authorization** (`POST /learning-cycles/[id]/continue`) | **REQUIRED** | Authorizes progression to the next cycle. Strategic pedagogical decision with long-term adaptive consequences. |
| **Cycle creation** (`POST /learning-cycles`) | **REQUIRED** | Triggers adaptive content generation (DN/DU heuristics). Commits computational and pedagogical resources. Generates study loads with cascading effects. |
| **Study-load generation** (side effect of cycle creation) | **REQUIRED** (via cycle creation gate) | Loads are generated atomically within cycle creation. The HITL gate on cycle creation covers load generation. |
| **Study-load start** (`POST /study-loads/[id]/start`) | Not required | Strong guard chain (status precondition, TutoringSession creation) provides sufficient automated governance. |
| **Study-load complete** (`POST /study-loads/[id]/complete`) | Not required | Strong guard chain (status precondition, Response creation) provides sufficient automated governance. |
| **Decision creation** (`POST /cycle-decisions`) | **REQUIRED** | Decisions record pedagogical reasoning. They must reflect human professional judgment, not autonomous generation. |
| **Evaluation creation** (`POST /cycle-evaluations`) | **REQUIRED** | Evaluations are pedagogical judgments about cycle outcomes. Human authorship is essential. |
| **Skill-state mutation** (`PATCH /skill-states/[id]`) | **REQUIRED** | Single most sensitive mutation. Mastery changes cascade through DN/DU adaptive logic into all future cycles. Must reflect professional assessment. |
| **Response/evidence mutation** (`PATCH /responses/[id]`) | **RECOMMENDED** | Evidence of student work. Modification should be exceptional and audited. |
| **Snapshot mutation** (`PATCH /cycle-snapshots/[id]`) | **REQUIRED** | Snapshots are audit evidence. Mutation undermines the integrity of the entire audit chain. Should be blocked. |
| **Snapshot deletion** (`DELETE /cycle-snapshots/[id]`) | **REQUIRED** | Destruction of audit evidence. Should be blocked or require highest authorization. |
| **Continuity signal mutation** (`PATCH /continuity-signals/[id]`) | **REQUIRED** | Signals authorize cycle progression. Modification could retroactively alter the progression record. |
| **Continuity signal deletion** (`DELETE /continuity-signals/[id]`) | **REQUIRED** | Destruction of progression authorization evidence. |
| **Enrollment deletion** (`DELETE /instances/[id]`) | **REQUIRED** | Destroys the entire enrollment context including all associated cycles, loads, evidence, and mastery data. |

---

## H. Agent-Readiness Assessment

### H.1 — Agent May Read (all GET endpoints)

All GET endpoints are agent-readable under standard authentication. No governance restrictions on read access beyond session authorization.

### H.2 — Agent May Propose (human reviews and approves before execution)

| Action | Condition |
|---|---|
| Create learning cycle | Agent prepares parameters; human confirms |
| Close learning cycle | Agent verifies preconditions; human confirms |
| Authorize continuity | Agent assesses readiness; human confirms |
| Create cycle decision | Agent drafts rationale; human reviews and confirms |
| Create cycle evaluation | Agent drafts assessment; human reviews and confirms |
| Adjust skill-state mastery | Agent proposes new level with evidence; human confirms |
| Delete any record | Agent identifies candidate; human confirms |

### H.3 — Agent May Execute Under Future Governance

| Action | Required Governance |
|---|---|
| Create enrollment | Budget limit, audit log, allowlist |
| Update enrollment fields (non-critical) | Audit log, field-level restrictions |
| Create/update study-load metadata | Closed-cycle guard (exists), audit log |
| Start study load | Guard chain (exists), audit log |
| Complete study load | Guard chain (exists), audit log |
| Acknowledge attention flag | Audit log |
| Create/update reference data (programs, axes, skills, students) | Budget limit, audit log |
| Record convergence | Audit log |

### H.4 — Never Agent-Executable

| Action | Rationale |
|---|---|
| Direct CycleSnapshot create/update/delete | Evidence records must only be created by guarded workflow side effects |
| Direct ContinuitySignal create/update/delete | Progression signals must only be created by the /continue endpoint |
| Direct TutoringSession create/delete | Sessions must only be created by /start side effect |
| Direct Response create/delete | Responses must only be created by /complete side effect |
| Auth login/signup | Agent identity must be managed through service accounts, not credential login |
| Enrollment deletion (with history) | Irreversible destruction of learning context |
| Bulk mastery reset | Cascading adaptive corruption |
| PATCH on learning-cycles/[id] | Sealed (405). Must remain sealed. |
| PATCH on study-loads/[id] | Sealed (405). Must remain sealed. |

---

## I. Known Governance Gaps

### I.1 — Flat Authenticated-Admin Authority Model
**Severity:** Critical  
**Description:** Every authenticated user has identical write access to every endpoint. There is no distinction between "admin managing reference data" and "system executing a workflow transition." Authority tiers defined in §C exist only in this document, not in code.  
**Impact:** An agent with admin credentials could invoke any endpoint including evidence fabrication and mastery manipulation.

### I.2 — Lack of Actor Attribution
**Severity:** Critical  
**Description:** No `modifiedBy`, `createdBy`, or `actionSource` field exists on any model. Mutations are indistinguishable from each other regardless of who performed them.  
**Impact:** Impossible to audit whether a human, the system, or a future agent performed any given action.

### I.3 — Lack of Mutation Audit Log
**Severity:** Critical  
**Description:** Write operations leave no trace beyond `createdAt`/`updatedAt` timestamps. No before/after state, no changed-field record, no operation type.  
**Impact:** Incorrect mutations cannot be detected, traced, or rolled back.

### I.4 — Evidence Records Still Mutable
**Severity:** Critical  
**Description:** CycleSnapshots, ContinuitySignals, TutoringSessions, and Responses can be freely updated or deleted via open CRUD endpoints. These are audit-critical evidence records that should be immutable after creation.  
**Impact:** The learning evidence chain can be retroactively altered, undermining the integrity of all adaptive decisions built on that evidence.

### I.5 — SkillState Mutation Sensitivity
**Severity:** Critical  
**Description:** `PATCH /api/skill-states/[id]` has no closed-cycle guard, no before/after audit trail, no actor attribution, and no approval gate. Only `lastEvaluatedAt` is automatically set. This is the single most sensitive mutation in the system because mastery changes cascade through DN/DU adaptive logic.  
**Impact:** A single incorrect mastery update compounds through every subsequent cycle's adaptive load selection.

### I.6 — No Action Budget / Circuit Breaker Layer
**Severity:** High  
**Description:** No mechanism exists to limit how many write operations any actor (human or agent) can perform per time window. No anomaly detection or automatic halt.  
**Impact:** A malfunctioning agent or compromised session could perform unlimited mutations before detection.

### I.7 — No Operation Correlation IDs
**Severity:** High  
**Description:** Related mutations in a workflow (e.g., cycle creation → snapshot → study loads → enrollment update) are not linked by a shared correlation/operation ID.  
**Impact:** Impossible to reconstruct the complete sequence of a multi-step workflow for audit or debugging.

### I.8 — No Runtime Policy Middleware
**Severity:** High  
**Description:** No middleware layer exists to enforce authority tiers, action budgets, or HITL gates at runtime. All governance exists only in documentation (this registry).  
**Impact:** Governance is advisory, not enforced. Any authenticated caller can bypass documented restrictions.

### I.9 — Hard Deletes Without Soft-Delete
**Severity:** Medium  
**Description:** All DELETE endpoints perform permanent record destruction. No soft-delete mechanism exists.  
**Impact:** Deleted records cannot be recovered or audited.

---

## J. Future Implementation Roadmap

> **Note:** This section documents the recommended implementation sequence. It does NOT implement any of these steps. Each step requires a separate approved phase.

| Step | Phase | Description | Dependencies |
|---|---|---|---|
| 1 | **FA (this phase)** | Action Governance Registry — documentation artifact | None |
| 2 | Audit-event design | Design the mutation audit log schema (actor, action, timestamp, before/after, correlation ID) | Step 1 |
| 3 | Machine-readable registry | Convert this document to a JSON/YAML policy file that can be loaded at runtime | Step 1 |
| 4 | Runtime policy middleware | Implement middleware that reads the policy file and enforces authority tiers, field-level restrictions, and audit logging | Steps 2, 3 |
| 5 | Human approval gates | Implement HITL flow: propose → review → approve → execute, with approval records | Step 4 |
| 6 | Agent tool-calling allowlist | Define and enforce which endpoints an agent identity can call, with per-endpoint policy | Steps 3, 4 |
| 7 | Budget / circuit breakers | Implement per-actor per-action rate limits and anomaly-triggered halt mechanisms | Step 4 |
| 8 | Incident / rollback tracing | Implement audit-based incident detection and state rollback capabilities using before/after records and correlation IDs | Steps 2, 4 |

---

## K. Explicit Non-Goals

This phase (FA) **does not**:

- ❌ Implement any AI agents or autonomous actors
- ❌ Implement runtime policy middleware or enforcement
- ❌ Add database schema changes or new models
- ❌ Add, modify, or remove API endpoints
- ❌ Change existing guard logic (EV/EW/EY/EZ blocks remain untouched)
- ❌ Change product behavior or user-facing functionality
- ❌ Modify DN/DU/DZ adaptive semantics
- ❌ Add authentication providers or role systems
- ❌ Deploy any changes to production
- ❌ Create machine-readable policy files (that is Step 3)
- ❌ Add audit logging infrastructure (that is Steps 2 and 4)

This document is a **governance classification artifact**. It maps what exists, classifies it, and defines the target governance posture. All implementation is deferred to future approved phases.

---

## Appendix — Summary Statistics

| Metric | Count |
|---|---|
| Total route files scanned | 47 |
| Total write handlers identified | ~75 |
| Fully guarded (Tier 1) | 6 |
| Hardened/blocked (Tier 1H) | 2 |
| Partially guarded (Tier 2) | ~15 |
| Open CRUD — evidence models (Tier 3) | ~15 |
| Reference data CRUD (Tier 0) | ~12 |
| Auth endpoints | 3 |
| HITL-required actions | 12 |
| NEVER_AGENT_EXECUTABLE actions | ~15 |
| AGENT_PROPOSE_ONLY actions | ~12 |
| AGENT_EXECUTE_WITH_GOVERNANCE actions | ~15 |
| Known governance gaps | 9 |
| Future implementation steps | 8 |
