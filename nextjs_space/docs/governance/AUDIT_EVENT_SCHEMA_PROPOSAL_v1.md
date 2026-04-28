# Audit Event Schema Proposal — E360 / Bexauri Adaptive Tutoring Platform

**Version:** 1.0  
**Created:** 2026-04-28  
**Phase:** FC  
**Baseline commit:** `ea51fe9` — *Custody: document FB mixed-scope exception*  
**Status:** Documentation-only proposal · No runtime implementation  
**Depends on:** FA (Action Governance Registry v1), FB (SkillState value validation), FC-0 (Auditability readiness gate inspection)  

---

## A. Purpose

The E360/Bexauri platform currently has **strong workflow guards** — status-transition protection on LearningCycle and StudyLoad (EV/EY sealed PATCH, guarded close/continue/start/complete endpoints), value validation on SkillState (FB), closed-cycle guards on evidence creation, and atomic transactions with CycleSnapshot side effects.

However, the system has **limited post-hoc auditability**. Once an action completes, the only durable traces are `createdAt`/`updatedAt` timestamps, `lastActivityAt`/`lastEvaluatedAt` markers, and the structural artefacts themselves (snapshots, signals, responses). There is no record of *who* performed an action, *what* the prior state was, *why* the action was taken, or *how* multiple related mutations in a workflow connect to each other.

This document proposes a future audit/event schema and evidence traceability architecture. Its purpose is to:

1. **Define the AuditEvent model** before any implementation begins, so the design can be reviewed and approved.
2. **Map actor attribution** to explain how human, system, and future agent identities will be captured.
3. **Design correlation/operation IDs** to link multi-step workflow mutations.
4. **Classify audit requirements** per domain (cycle, load, skill state, decision, evaluation, snapshot, signal, session, response, enrollment).
5. **Propose an evidence immutability strategy** to protect learning evidence from retroactive alteration.
6. **Connect auditability to future human-in-the-loop and agent governance** requirements.

**FC does not implement any schema, middleware, agents, or runtime changes.** It is a design document that future implementation phases will reference.

---

## B. Current Audit Posture

### B.1 — What exists today

| Mechanism | Present on | What it proves | Limitations |
|---|---|---|---|
| `createdAt` | All 16 models | When a record was created | No actor, no reason, no prior state |
| `updatedAt` | All 16 models | That a record was modified | No actor, no changed fields, no prior state |
| `lastActivityAt` | StudentProgramInstance | Recent enrollment activity occurred | No detail on what action, who, or why |
| `lastEvaluatedAt` | SkillState | Skill state was touched at a time | No actor, no prior mastery level, no change reason |
| CycleSnapshot (`cycle_open`) | Created by cycle creation transaction | Opening state: skill states, heuristic parameters, selected skills, DU exclusion trace | No actor attribution |
| CycleSnapshot (`cycle_close`) | Created by cycle close transaction | Closing state: study loads and their final statuses | `reason: 'admin_close'` hardcoded — no actor, no free-form rationale |
| ContinuitySignal (`continue`) | Created by DT continue endpoint | Cycle continuity was authorized | `rationale: 'admin_authorize'` hardcoded — no actor attribution |
| ContinuitySignal (governance/attention) | Continuity-start subsystem | Governance reading or attention acknowledgement occurred | JSON-encoded rationale, no actor ID |
| Response (self-report) | Created by DQ complete endpoint | Student self-report on load completion | Actor identity checked at runtime (email match) but not persisted on the record |
| TutoringSession | Created by DP start endpoint | Practice session was initiated | No actor persisted on the record |
| PHASE_LOG.md | Manual document | Phase history, decisions, exceptions | Not machine-readable, not linked to DB records |

### B.2 — What is missing

| Missing capability | Impact |
|---|---|
| **Actor attribution** (`createdBy`/`modifiedBy`/`actorId`) | Cannot distinguish who performed any mutation — human admin, system engine, or future agent |
| **Before/after state capture** | Cannot detect what changed in a mutation or roll back incorrect changes |
| **Operation/correlation IDs** | Cannot reconstruct multi-step workflows (cycle creation → snapshot → loads → enrollment update) |
| **Mutation audit log** | Cannot audit the history of changes to any record beyond the latest `updatedAt` |
| **Rationale/reason fields** (on most models) | Cannot explain why an action was taken |
| **Soft-delete** | Deleted records are permanently destroyed with no trace |
| **Evidence immutability enforcement** | CycleSnapshots, ContinuitySignals, Responses, TutoringSessions can be freely PATCH/DELETE-ed |

---

## C. Proposed AuditEvent Model

The following model captures a complete audit record for any mutation in the system. This is a **documentation-only proposal** — the Prisma schema is not modified in this phase.

### C.1 — Field specification

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | String (cuid) | Yes | Primary key |
| `createdAt` | DateTime | Yes | When the audit event was recorded (auto `@default(now())`) |
| `actorType` | String (enum-like) | Yes | Who performed the action: `human_admin`, `student`, `system`, `future_agent`, `external_tool` |
| `actorId` | String | Yes | Unique identifier of the actor. For humans: User.id. For system: literal `"system"`. For agents: agent identity string. |
| `actorEmail` | String? | No | Human-readable email for human actors. Null for system/agent. Denormalized for query convenience. |
| `actionType` | String | Yes | What happened: `create`, `update`, `delete`, `soft_delete`, `status_transition`, `propose`, `approve`, `reject` |
| `domain` | String | Yes | Business domain: `learning_cycle`, `study_load`, `skill_state`, `cycle_decision`, `cycle_decision_skill`, `cycle_evaluation`, `cycle_snapshot`, `continuity_signal`, `tutoring_session`, `response`, `enrollment`, `diagnostic`, `reference_data`, `auth` |
| `entityType` | String | Yes | Prisma model name: `LearningCycle`, `StudyLoad`, `SkillState`, etc. |
| `entityId` | String | Yes | Primary key of the affected record |
| `endpoint` | String | Yes | API route path: `/api/skill-states/[id]`, `/api/learning-cycles/[id]/close`, etc. |
| `method` | String | Yes | HTTP method: `POST`, `PATCH`, `PUT`, `DELETE` |
| `operationId` | String? | No | Shared ID linking related mutations in a multi-step workflow (e.g., cycle creation → snapshot → loads → enrollment update all share the same operationId) |
| `correlationId` | String? | No | Higher-level correlation linking a proposal to its approval to its execution |
| `source` | String | Yes | How the action was triggered: `api_direct`, `workflow_side_effect`, `ui_action`, `agent_tool_call`, `scheduled_task` |
| `riskLevel` | String | Yes | From FA registry: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL` |
| `authorityTier` | String | Yes | From FA registry: `ADMIN_MANUAL_ACTION`, `SYSTEM_GENERATED_ACTION`, `HUMAN_APPROVED_OPERATIONAL_ACTION`, etc. |
| `humanApprovalRequired` | Boolean | Yes | Whether HITL gate was/should have been required for this action |
| `humanApprovedBy` | String? | No | User.id of the human who approved, if HITL was required. Null if not applicable or not yet approved. |
| `humanApprovedAt` | DateTime? | No | When human approval was recorded |
| `rationale` | String? | No | Free-form explanation of why the action was taken. Required for CRITICAL risk actions and HITL-gated actions. |
| `beforePayload` | Json? | No | Serialized state of the record before the mutation. Required for `update`, `delete`, `status_transition` actions on HIGH/CRITICAL risk domains. |
| `afterPayload` | Json? | No | Serialized state of the record after the mutation. Required for `create`, `update`, `status_transition` actions on HIGH/CRITICAL risk domains. |
| `metadata` | Json? | No | Additional context: request headers (sanitized), IP address (if applicable), client version, batch size, etc. |

### C.2 — Proposed indexes

| Index | Fields | Purpose |
|---|---|---|
| Primary | `id` | Default lookup |
| Time-series | `createdAt` (BRIN) | Efficient time-range queries for audit review |
| Actor lookup | `actorType`, `actorId` | Find all actions by a specific actor |
| Entity lookup | `entityType`, `entityId` | Find all audit events for a specific record |
| Domain lookup | `domain`, `createdAt` | Find all events in a business domain over time |
| Operation trace | `operationId` | Reconstruct a complete multi-step workflow |
| Correlation trace | `correlationId` | Link proposals to approvals to executions |
| Risk review | `riskLevel`, `createdAt` | Review HIGH/CRITICAL events for governance |

### C.3 — Storage and retention considerations

- AuditEvent records should be **append-only**. Once created, they must never be updated or deleted.
- `beforePayload` and `afterPayload` are Json columns. For high-volume endpoints, consider storing only changed fields (delta) rather than full record snapshots.
- Retention policy: audit events for CRITICAL/HIGH risk actions should be retained indefinitely. LOW/MEDIUM risk events may be archived after a configurable period (e.g., 12 months).
- Estimated growth: at current usage scale (single-tutor, ~dozens of students), the audit table will remain small. At scale, BRIN indexing on `createdAt` and partitioning by `domain` should be considered.

---

## D. Actor Model

### D.1 — Actor type definitions

| Actor Type | Code | Definition | Identity Source |
|---|---|---|---|
| Human Administrator | `human_admin` | An authenticated admin user performing actions through the admin UI or API | `getServerSession(authOptions)` → `session.user.id` / `session.user.email` |
| Student | `student` | An authenticated student performing self-service actions (future) | `getServerSession(authOptions)` → student identity via email linkage |
| System Engine | `system` | The application itself performing workflow side effects (e.g., TutoringSession creation during study-load start, CycleSnapshot creation during cycle open/close) | Literal `"system"` — no session required |
| Future Agent | `future_agent` | An autonomous AI agent operating under governance constraints | Agent service account identity (not yet designed) |
| External Tool | `external_tool` | An external integration or webhook calling into the API | API key or webhook identity (not yet designed) |

### D.2 — Current session-to-actor mapping

Today, all write endpoints call `getServerSession(authOptions)` and check for session existence, but they do not record the session user's identity on the created/modified record. The mapping for future implementation:

```
// Pseudocode — not implemented in FC
const session = await getServerSession(authOptions)
const actor = {
  actorType: 'human_admin',          // or derive from session role when roles exist
  actorId: session?.user?.id ?? 'unknown',
  actorEmail: session?.user?.email ?? null,
}
```

For system-generated side effects within a transaction (e.g., CycleSnapshot created inside cycle-close):

```
// Pseudocode — not implemented in FC
const actor = {
  actorType: 'system',
  actorId: 'system',
  actorEmail: null,
}
```

The current User model has `id` and `email` fields. No changes to the User model are proposed in this phase. Role-based actor type derivation (admin vs. student) would require a future role field on User.

---

## E. Correlation / Operation ID Strategy

### E.1 — Problem

Multi-step workflows in E360 perform several related mutations within a single transaction or across closely-timed API calls. Today, these mutations are not linked by any shared identifier.

### E.2 — Proposed operationId pattern

An `operationId` is a unique string (e.g., cuid) generated at the entry point of a multi-step workflow and propagated to all audit events created within that workflow.

| Workflow | Entry Point | Mutations Linked by operationId |
|---|---|---|
| **Cycle creation** | `POST /api/learning-cycles` | LearningCycle create, CycleSnapshot create (`cycle_open`), StudyLoad creates (1–3), StudentProgramInstance update (`currentCycleId`, `lastActivityAt`) |
| **Study load start** | `POST /api/study-loads/[id]/start` | StudyLoad update (`pending`→`in_progress`), TutoringSession create, StudentProgramInstance update (`lastActivityAt`) |
| **Study load complete** | `POST /api/study-loads/[id]/complete` | StudyLoad update (`in_progress`→`completed`), TutoringSession update (`in_progress`→`completed`), Response create (self-report), StudentProgramInstance update (`lastActivityAt`) |
| **Cycle close** | `POST /api/learning-cycles/[id]/close` | LearningCycle update (`open`→`closed`), CycleSnapshot create (`cycle_close`), StudentProgramInstance update (`lastActivityAt`) |
| **Continuity authorization** | `POST /api/learning-cycles/[id]/continue` | ContinuitySignal create, StudentProgramInstance update (`lastActivityAt`) |
| **Diagnostic completion** | `PATCH /api/diagnostics/[id]` (initial completion) | Diagnostic update, SkillState creates (batch), StudentProgramInstance update (`lastActivityAt`) |

### E.3 — Proposed correlationId pattern

A `correlationId` links a **proposal** to its eventual **approval** or **rejection** and final **execution**. This is relevant for future HITL workflows:

```
correlationId: "corr_abc123"
  → AuditEvent { actionType: 'propose', actorType: 'future_agent', ... }
  → AuditEvent { actionType: 'approve', actorType: 'human_admin', humanApprovedBy: '...', ... }
  → AuditEvent { actionType: 'status_transition', actorType: 'system', ... }  // the actual execution
```

Or for rejection:

```
correlationId: "corr_abc123"
  → AuditEvent { actionType: 'propose', actorType: 'future_agent', ... }
  → AuditEvent { actionType: 'reject', actorType: 'human_admin', rationale: '...', ... }
```

Correlation IDs are not needed for the initial audit implementation (which will focus on operationId). They become essential when HITL proposal/approval workflows are introduced.

---

## F. Audit Requirement by Domain

| Domain | Audit Required | Before/After Required | Rationale Required | Human Approval Required | Append-Only Candidate | Risk Level |
|---|---|---|---|---|---|---|
| **LearningCycle** | Yes | Yes — status transitions | Yes — close/continue rationale | Yes — close, continue, create | No (status transitions are mutations) | CRITICAL |
| **StudyLoad** | Yes | Yes — status transitions | No (guards are sufficient) | No (guards sufficient for start/complete) | No (metadata is mutable) | HIGH |
| **SkillState** | Yes | **Yes — mandatory** (previous mastery, confidence, reinforcement) | **Yes — mandatory** (change reason) | **Yes — mandatory** for mastery changes | Partial — post-evaluation changes should be versioned | **CRITICAL** |
| **CycleDecision** | Yes | Yes — decisionType changes | Yes — pedagogical judgment | Yes — decisions are professional assessments | No (mutable while cycle is open, frozen after close) | HIGH |
| **CycleDecisionSkill** | Yes | No (low-complexity link records) | No | No | No (mutable while cycle is open) | MEDIUM |
| **CycleEvaluation** | Yes | Yes — resultSummary changes | Yes — evaluation is judgment | Yes — evaluations are professional assessments | Yes — should be immutable after creation | HIGH |
| **CycleSnapshot** | Yes | N/A — **must be append-only** | N/A | N/A (system-generated only) | **Yes — mandatory** | CRITICAL |
| **ContinuitySignal** | Yes | N/A — **must be append-only** | N/A (rationale captured at creation) | N/A (created by guarded endpoints only) | **Yes — mandatory** | CRITICAL |
| **TutoringSession** | Yes | Yes — status transitions | No | No (system-generated side effect) | **Yes — should be append-only** | HIGH |
| **Response** | Yes | N/A — **should be append-only** | N/A | No (system-generated side effect) | **Yes — mandatory** | HIGH |
| **Enrollment** | Yes | Yes — status/continuityState changes | No (operational) | Yes — deletion only | No (operational fields are mutable) | MEDIUM |
| **Diagnostic** | Yes | Yes — completion transition | No | No | No (operational) | MEDIUM |
| **Reference Data** (Program, Axis, Skill, Student) | Recommended | No (low risk) | No | No (except DELETE) | No | LOW |

---

## G. Evidence Immutability Strategy

### G.1 — Append-only evidence records

The following models represent **learning evidence** or **audit evidence** and should become immutable after creation. Once created, PATCH and DELETE operations should be blocked at the API level.

| Model | Current PATCH/DELETE Status | Target Posture | Rationale |
|---|---|---|---|
| **CycleSnapshot** | Open CRUD — PATCH and DELETE with auth only | **Block PATCH and DELETE entirely** | Snapshots capture system state at decision points. Mutation defeats the purpose of having audit evidence. |
| **ContinuitySignal** | Open CRUD — PATCH and DELETE with auth only | **Block PATCH and DELETE entirely** | Signals authorize cycle progression. Modification could retroactively alter the authorization record. |
| **Response** | Open CRUD — PATCH and DELETE with auth only | **Block PATCH and DELETE entirely** | Responses are student work evidence. The DQ endpoint creates them as side effects; direct modification destroys the evidence chain. |
| **TutoringSession** | Open CRUD — PATCH and DELETE with auth only | **Block PATCH (status field) and DELETE** | Sessions are activity evidence. The DP/DQ endpoints manage their lifecycle; direct status mutation bypasses guards. Allow PATCH on `notes` field only (non-evidence metadata). |
| **CycleEvaluation** | Open CRUD — no closed-cycle guard on PUT/DELETE | **Block DELETE; restrict PUT to open cycles only** | Evaluations are pedagogical judgment evidence. Once a cycle closes, its evaluations should be frozen. |

### G.2 — SkillState special handling

SkillState is not purely append-only (mastery levels change over time), but **each change should be versioned**. The proposed strategy:

- Every PATCH to SkillState creates an AuditEvent with `beforePayload` (previous mastery/confidence/reinforcement) and `afterPayload` (new values).
- The SkillState record itself remains mutable (current state is the source of truth for DN/DU adaptive logic).
- The AuditEvent chain for a given `entityId` (SkillState.id) provides the full history of mastery progression.
- Future consideration: a dedicated `SkillStateHistory` model may be warranted if the audit table becomes too large or if the query pattern for mastery progression diverges from general audit queries.

### G.3 — Mutable operational records

The following records remain mutable by design:

| Model / Scope | Mutability | Condition |
|---|---|---|
| **StudyLoad** (title, loadType, releasedAt, dueAt) | Mutable | While parent cycle is open (existing closed-cycle guard). Status is already locked to guarded endpoints (EY). |
| **CycleDecision** (decisionType, rationale) | Mutable | While parent cycle is open (existing closed-cycle guard on PUT/DELETE). |
| **CycleDecisionSkill** (priority, reason) | Mutable | While parent cycle is open (existing EW closed-cycle guard). |
| **Enrollment** (status, endedAt, lastActivityAt) | Mutable | Operational fields. System-managed fields (`currentCycleId`, `currentContinuityState`) should be restricted to system-only updates in a future phase. |
| **Diagnostic** (metadata fields) | Mutable | Operational. Completion transition side effects (SE-1 SkillState initialization) are already transaction-protected. |
| **Reference Data** (Program, Axis, Skill, Student) | Mutable | Standard admin CRUD. Low risk. |

---

## H. Human-in-the-Loop Linkage

### H.1 — Future HITL workflow

When HITL gates are implemented, the audit system must support the following lifecycle:

```
1. PROPOSE  → AuditEvent { actionType: 'propose', actorType: 'future_agent' | 'system',
                           correlationId: 'corr_xxx', afterPayload: { proposed changes } }

2. REVIEW   → Human reviews the proposal (via UI). No AuditEvent yet.

3a. APPROVE → AuditEvent { actionType: 'approve', actorType: 'human_admin',
                           correlationId: 'corr_xxx', humanApprovedBy: 'user_id',
                           humanApprovedAt: timestamp, rationale: 'Accepted because...' }

3b. REJECT  → AuditEvent { actionType: 'reject', actorType: 'human_admin',
                           correlationId: 'corr_xxx', humanApprovedBy: null,
                           rationale: 'Rejected because...' }

4. EXECUTE  → AuditEvent { actionType: 'status_transition' | 'update' | 'create',
                           actorType: 'system', correlationId: 'corr_xxx',
                           beforePayload: {...}, afterPayload: {...} }
              (Only if step 3a occurred)
```

### H.2 — Actions requiring HITL linkage

From FA governance registry (§G):

| Action | Why HITL | Proposal source |
|---|---|---|
| Cycle close | Finalizes all learning evidence | Admin UI or future agent |
| Continuity authorization | Strategic pedagogical decision | Admin UI or future agent |
| Cycle creation | Commits adaptive resources, generates loads | Admin UI or future agent |
| SkillState mastery change | Cascades through DN/DU adaptive logic | Admin UI or future agent assessment |
| Decision creation | Professional pedagogical judgment | Admin or future agent draft |
| Evaluation creation | Professional pedagogical judgment | Admin or future agent draft |
| Enrollment deletion | Destroys all enrollment context | Admin only (never agent) |
| Snapshot deletion | Destroys audit evidence | Should be blocked entirely |
| Signal deletion | Destroys authorization evidence | Should be blocked entirely |

---

## I. Agent Governance Implications

Before any autonomous agent operates on E360, the following audit infrastructure must be in place:

### I.1 — Allowlisted tools

Agents must only access endpoints explicitly on an allowlist. The allowlist is defined by the FA governance registry's "Future Agent Permission" column. Endpoints classified as `NEVER_AGENT_EXECUTABLE` must be unreachable by agent tool-calling regardless of prompt instructions.

### I.2 — Policy checks

Every agent tool call must pass through a policy layer that verifies:
- The agent is authorized for the specific endpoint and method
- The action's authority tier permits agent execution (not just proposal)
- The target entity's current state permits the action (e.g., cycle is open)
- Any HITL-required actions have a recorded human approval

### I.3 — Audit event creation

Every agent action must produce an AuditEvent with:
- `actorType: 'future_agent'`
- `actorId`: the agent's service account identity
- `source: 'agent_tool_call'`
- Full `beforePayload` and `afterPayload` for any mutation
- `rationale`: the agent's reasoning for the action

### I.4 — Budgets and circuit breakers

Before agent execution is enabled:
- **Per-actor per-action budgets**: maximum N mutations of type X per time window (e.g., max 5 SkillState changes per hour per agent)
- **Anomaly detection**: if an agent's mutation rate or pattern exceeds thresholds, halt the agent and alert the admin
- **Circuit breakers**: if audit events indicate cascading failures (e.g., multiple 409 conflicts), suspend the agent

### I.5 — HITL gates

For CRITICAL-risk actions (cycle close, continuity authorization, mastery changes), agents must use the propose→approve→execute flow described in §H. Direct execution of HITL-required actions by agents must be blocked by the policy layer.

### I.6 — Immutable evidence trail

Agents must not be able to modify or delete their own audit trail. The AuditEvent table itself must be append-only with no DELETE or UPDATE endpoints exposed to any actor, including agents.

---

## J. Implementation Roadmap

> **Note:** This section documents the recommended implementation sequence. Each step requires a separate approved phase. None of these steps are implemented in FC.

| Step | Phase | Description | Dependencies | Risk |
|---|---|---|---|---|
| 1 | **FC (this phase)** | Audit Event Schema Proposal — documentation artifact | FA, FB, FC-0 | Zero |
| 2 | FD | **Add AuditEvent model to Prisma schema** — additive-only migration (new table, no changes to existing tables) | Step 1 approved | Low — new table only |
| 3 | FE | **Create audit helper utility** — a `recordAuditEvent()` function that writes to the AuditEvent table, extractable from session context | Step 2 | Low — utility function only |
| 4 | FF | **Instrument one low-risk endpoint** — add audit event creation to a reference-data endpoint (e.g., `POST /api/programs`) as proof of concept | Step 3 | Low — reference data only |
| 5 | FG | **Instrument SkillState mutation** — add before/after capture and actor attribution to `PATCH /api/skill-states/[id]`, the single most sensitive mutation | Step 3 | Medium — touches adaptive-critical path |
| 6 | FH | **Instrument cycle lifecycle actions** — add audit events to cycle creation, close, continue, study-load start/complete with operationId linking | Step 3 | Medium — touches core workflow |
| 7 | FI | **Enforce append-only evidence** — block PATCH/DELETE on CycleSnapshot, ContinuitySignal, Response; restrict TutoringSession and CycleEvaluation | Steps 3, 5, 6 | Medium — behavioral change |
| 8 | FJ | **Add human approval gates** — implement propose→approve→execute flow for HITL-required actions with correlationId linking | Steps 3, 5, 6, 7 | High — new workflow |
| 9 | FK | **Add future agent tool-calling allowlist** — define and enforce which endpoints an agent identity can call, with per-endpoint policy | Steps 3, 7, 8 | High — agent architecture |

### J.1 — Migration safety notes

- **Step 2 (FD)** adds a new `AuditEvent` table. This is purely additive — no existing tables are modified, renamed, or dropped. No data loss risk.
- Future steps that add `createdBy`/`modifiedBy` fields to existing models should use **nullable optional fields with no default** or **default to `'unknown'`** to avoid migration conflicts with existing data.
- All schema changes in this roadmap are designed to be compatible with `prisma db push` promotion to production without data loss.

---

## K. Non-Goals

Phase FC **does not**:

- ❌ Implement the AuditEvent model or add it to Prisma schema
- ❌ Change the Prisma schema in any way
- ❌ Add database migrations
- ❌ Add API endpoints
- ❌ Add middleware (audit, policy, or otherwise)
- ❌ Add AI agents or autonomous actors
- ❌ Change existing guard logic (EV/EW/EY/EZ blocks remain untouched)
- ❌ Change product behavior or user-facing functionality
- ❌ Modify DN/DU/DZ adaptive semantics
- ❌ Mutate any data in any database
- ❌ Deploy any changes to production
- ❌ Add authentication providers, roles, or permission systems
- ❌ Create machine-readable policy files
- ❌ Implement runtime enforcement of any governance rule
- ❌ Implement HITL proposal/approval workflows
- ❌ Create or configure AI agents

This document is a **design proposal artifact**. It describes what should be built, why, and in what order. All implementation is deferred to future approved phases.

---

## Appendix — Cross-Reference to FA Governance Gaps

This proposal addresses the following known governance gaps from FA (ACTION_GOVERNANCE_REGISTRY_v1.md §I):

| FA Gap | FC Proposal Coverage |
|---|---|
| I.2 — Lack of Actor Attribution | §C (AuditEvent.actorType/actorId/actorEmail), §D (Actor Model) |
| I.3 — Lack of Mutation Audit Log | §C (AuditEvent model with beforePayload/afterPayload) |
| I.4 — Evidence Records Still Mutable | §G (Evidence Immutability Strategy) |
| I.5 — SkillState Mutation Sensitivity | §F (SkillState audit requirements), §G.2 (SkillState versioning) |
| I.7 — No Operation Correlation IDs | §E (Correlation / Operation ID Strategy) |
| I.8 — No Runtime Policy Middleware | §J Steps 4–9 (Implementation Roadmap) |
| I.9 — Hard Deletes Without Soft-Delete | §G.1 (Append-only enforcement blocks DELETE) |
| I.1 — Flat Admin Authority Model | Partially addressed: §D defines actor types; full role implementation deferred |
| I.6 — No Action Budget / Circuit Breaker | §I.4 (Agent Governance: Budgets and Circuit Breakers); implementation deferred |
