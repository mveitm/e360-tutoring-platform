# E360_CYCLE_WIRING_CONTRACT_v1.0

> Governing document for Line E — Adaptive Cycle Wiring  
> Project: E360 Adaptive Tutoring Platform  
> Status: Approved for implementation  
> Supersedes: No prior document  
> Structural foundation: Phases DF → DK (all closed and deployed)

---

## 1. Document Title

**E360_CYCLE_WIRING_CONTRACT_v1.0**

---

## 2. Purpose

This document defines the operational contract that governs how the twelve already-materialized entities of the adaptive cycle connect into a coherent end-to-end sequence of state transitions, preconditions, side-effects, and persistence updates.

It answers one question:

> Given a `StudentProgramInstance`, what is the minimum valid sequence of persistent operations that constitute one complete adaptive cycle, and what rules govern every transition within that sequence?

This contract does not define UI behavior, LLM integration, or pedagogical content strategy. It governs exclusively the **persistence and state-transition layer** of the adaptive cycle.

Every implementation phase within Line E must comply with this contract. Deviations require an amendment to this document before code execution.

---

## 3. Scope and Definitions

### 3.1 Scope

This contract governs the standard v1.0 adaptive cycle flow. It covers:

- The operational sequence from enrollment activation through cycle closure and continuity signal
- Valid state transitions for every entity with a `status` field
- Preconditions that must be satisfied before each transition
- Side-effects that must be executed atomically with each transition
- Cross-entity updates triggered by lifecycle events

This contract does NOT govern:

- Administrative override paths (forced closures, manual corrections)
- Multi-program concurrency (one enrollment = one program)
- Student-facing UI flows
- LLM-driven automation of decisions
- Content authoring or resource management

### 3.2 Definitions

| Term | Definition |
|------|------------|
| **Enrollment** | A `StudentProgramInstance` record linking a student to a program. The root anchor of all cycle activity. |
| **Cycle** | A `LearningCycle` record representing one iteration of the adaptive loop within an enrollment. |
| **Load** | A `StudyLoad` record representing a unit of pedagogical work assigned within a cycle. |
| **Session** | A `TutoringSession` record representing a bounded interaction event within a cycle. |
| **Response** | A `Response` record capturing a single student output within a session. |
| **Evaluation** | A `CycleEvaluation` record representing a formal assessment event within a cycle. |
| **Snapshot** | A `CycleSnapshot` record capturing the state of a cycle at a specific moment, as a JSON payload. |
| **Decision** | A `CycleDecision` record representing the pedagogical routing judgment made after evaluation. |
| **DecisionSkill** | A `CycleDecisionSkill` record linking a decision to a specific skill target. |
| **SkillState** | A `SkillState` record tracking the current mastery state of a skill for an enrollment. |
| **Signal** | A `ContinuitySignal` record representing a transition directive at a cycle boundary. |
| **Diagnostic** | A `Diagnostic` record representing an initial or periodic assessment of skill states for an enrollment. |
| **Wiring** | The implementation of transition logic, precondition checks, side-effect execution, and cross-entity updates that connect entities into an operational flow. |

---

## 4. Entity Inventory Governed by the Contract

The following twelve entities participate in the adaptive cycle. All exist in the current schema and have full CRUD APIs deployed.

| # | Entity | Table | Status field | Status values (canonical) | Key state fields |
|---|--------|-------|-------------|--------------------------|------------------|
| 1 | `StudentProgramInstance` | `student_program_instances` | `status` | `active`, `paused`, `completed`, `dropped` | `currentCycleId`, `currentContinuityState`, `lastActivityAt` |
| 2 | `Diagnostic` | `diagnostics` | `status` | `pending`, `completed` | `diagnosticType`, `resultSummary`, `completedAt` |
| 3 | `SkillState` | `skill_states` | — (no status field) | — | `masteryLevel`, `confidenceLevel`, `needsReinforcement`, `stateSource`, `lastEvaluatedAt` |
| 4 | `LearningCycle` | `learning_cycles` | `status` | `open`, `closed` | `cycleNumber`, `openedAt`, `closedAt` |
| 5 | `StudyLoad` | `study_loads` | `status` | `pending`, `in_progress`, `completed` | `loadType`, `releasedAt`, `dueAt` |
| 6 | `TutoringSession` | `sessions_pedagogical` | `status` | `in_progress`, `completed` | `sessionType`, `startedAt`, `completedAt` |
| 7 | `Response` | `responses` | — (no status field) | — | `responseType`, `isCorrect`, `score`, `skillId`, `feedback` |
| 8 | `CycleEvaluation` | `cycle_evaluations` | — (no status field) | — | `evaluationType`, `resultSummary` |
| 9 | `CycleSnapshot` | `cycle_snapshots` | — (no status field) | — | `snapshotType`, `payload`, `takenAt` |
| 10 | `CycleDecision` | `cycle_decisions` | — (no status field) | — | `decisionType`, `rationale` |
| 11 | `CycleDecisionSkill` | `cycle_decision_skills` | — (no status field) | — | `skillId`, `priority`, `reason` |
| 12 | `ContinuitySignal` | `continuity_signals` | — (no status field) | — | `signalType`, `rationale`, `enrollmentId`, `learningCycleId`, `evaluationId` |

### 4.1 Canonical Value Sets

The following value sets are already enforced in API guards (Phases CM, CN, CO) or are fixed by this contract:

| Field | Entity | Canonical values | Enforcement |
|-------|--------|-----------------|-------------|
| `decisionType` | `CycleDecision` | `advance`, `reinforce`, `hold`, `redirect` | API guard (existing) |
| `evaluationType` | `CycleEvaluation` | `diagnostic`, `progress_check`, `cycle_close` | API guard (existing) |
| `loadType` | `StudyLoad` | `practice`, `reading`, `video`, `project`, `assessment` | API guard (existing) |
| `signalType` | `ContinuitySignal` | `continue`, `pause`, `exit` | **Fixed by this contract — guard to be implemented** |
| `diagnosticType` | `Diagnostic` | `initial` | **Fixed by this contract — single value in v1.0** |
| `snapshotType` | `CycleSnapshot` | `pre_decision` | **Fixed by this contract — single value in v1.0** |
| `sessionType` | `TutoringSession` | `practice` | **Default only — additional values deferred to v1.1** |
| `responseType` | `Response` | `answer` | **Default only — additional values deferred to v1.1** |
| `masteryLevel` | `SkillState` | `not_evaluated`, `emerging`, `developing`, `proficient`, `mastered` | **Fixed by this contract** |
| `confidenceLevel` | `SkillState` | `none`, `low`, `medium`, `high` | **Fixed by this contract** |
| `stateSource` | `SkillState` | `manual`, `diagnostic`, `cycle_evaluation` | **Fixed by this contract** |
| `currentContinuityState` | `StudentProgramInstance` | `normal`, `paused`, `exited` | **Fixed by this contract** |

---

## 5. Canonical Operational Sequence

The adaptive cycle follows a strict sequential flow. Each step has a number, a name, and a fixed position in the chain.

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENROLLMENT BOUNDARY                         │
│                                                                │
│  Step 1: ENROLLMENT ACTIVATION                                 │
│  Step 2: INITIAL DIAGNOSTIC                                    │
│  Step 3: SKILL STATE INITIALIZATION                            │
│                                                                │
├─────────────────────────────────────────────────────────────────┤
│                    CYCLE BOUNDARY (repeatable)                  │
│                                                                │
│  Step 4: CYCLE OPENING                                         │
│  Step 5: LOAD ASSIGNMENT                                       │
│  Step 6: SESSION EXECUTION                                     │
│  Step 7: RESPONSE CAPTURE                                      │
│  Step 8: CYCLE EVALUATION (cycle_close)                        │
│  Step 9: PRE-DECISION SNAPSHOT                                 │
│  Step 10: CYCLE DECISION                                       │
│  Step 11: SKILL STATE UPDATE                                   │
│  Step 12: CYCLE CLOSURE                                        │
│  Step 13: CONTINUITY SIGNAL                                    │
│                                                                │
├─────────────────────────────────────────────────────────────────┤
│                    CONTINUATION LOGIC                           │
│                                                                │
│  If signal = continue → return to Step 4 (next cycle)          │
│  If signal = pause    → enrollment paused                      │
│  If signal = exit     → enrollment completed or dropped        │
│                                                                │
└─────────────────────────────────────────────────────────────────┘
```

### 5.1 Intermediate evaluations within a cycle

Steps 5 through 7 may repeat multiple times within a single cycle. Additionally, `CycleEvaluation` records of type `progress_check` may be created at any point during the active cycle to capture intermediate assessments. These are informational and do not trigger the closure chain (Steps 9–13).

Only a `CycleEvaluation` of type `cycle_close` triggers the transition from Step 8 onward.

### 5.2 Step ordering within the cycle body

Steps 5, 6, and 7 (Load → Session → Response) are the **activity phase** of the cycle. They may occur in any quantity and interleave freely. The contract does not mandate a fixed ratio of loads to sessions to responses.

Steps 8 through 13 are the **closure phase** of the cycle. They must occur exactly once per cycle, in strict sequential order, and cannot be partially executed.

---

## 6. Transition Rules

Each transition rule defines: the step, its preconditions, the operation performed, required side-effects, and fields mutated.

---

### Step 1: ENROLLMENT ACTIVATION

**Trigger**: A `StudentProgramInstance` is created or its status is set to `active`.

**Preconditions**:
- The `Student` and `Program` referenced must exist and be active.
- No other active enrollment may exist for the same student-program pair.

**Operation**:
- Create or update `StudentProgramInstance` with `status = "active"`.

**Side-effects**:
- Set `currentContinuityState = "normal"`.
- Set `startedAt` to current timestamp (if new).
- Set `lastActivityAt` to current timestamp.
- `currentCycleId` remains `null` (no cycle yet).

**Fields mutated**:
- `StudentProgramInstance.status` → `"active"`
- `StudentProgramInstance.currentContinuityState` → `"normal"`
- `StudentProgramInstance.startedAt` → now
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 2: INITIAL DIAGNOSTIC

**Trigger**: Manual or orchestrated creation of a `Diagnostic` for the enrollment.

**Preconditions**:
- `StudentProgramInstance.status` must be `"active"`.
- No `LearningCycle` may exist yet for this enrollment (this is the initial diagnostic, before the first cycle).
- No prior completed `Diagnostic` of type `"initial"` may exist for this enrollment.

**Operation**:
- Create `Diagnostic` with `diagnosticType = "initial"`, `status = "pending"`.
- When results are available: update `Diagnostic.status` → `"completed"`, populate `resultSummary`, set `completedAt`.

**Side-effects on completion**:
- Proceed to Step 3 (Skill State Initialization).
- Update `StudentProgramInstance.lastActivityAt`.

**Fields mutated**:
- `Diagnostic.status` → `"completed"`
- `Diagnostic.resultSummary` → populated
- `Diagnostic.completedAt` → now
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 3: SKILL STATE INITIALIZATION

**Trigger**: Completion of the initial `Diagnostic` (Step 2).

**Preconditions**:
- `Diagnostic.status` must be `"completed"` for a `Diagnostic` of type `"initial"` belonging to this enrollment.
- The `Program` must have at least one `Skill` associated via its `Axis` hierarchy.

**Operation**:
- For each `Skill` in the program: create or update a `SkillState` record for this enrollment.

**Side-effects**:
- Set `SkillState.masteryLevel` based on diagnostic results (or `"not_evaluated"` if the diagnostic does not cover the skill).
- Set `SkillState.confidenceLevel` based on diagnostic results (or `"none"`).
- Set `SkillState.needsReinforcement` based on diagnostic results.
- Set `SkillState.stateSource = "diagnostic"`.
- Set `SkillState.lastEvaluatedAt` to current timestamp for evaluated skills.

**Fields mutated**:
- `SkillState.masteryLevel` → from diagnostic
- `SkillState.confidenceLevel` → from diagnostic
- `SkillState.needsReinforcement` → from diagnostic
- `SkillState.stateSource` → `"diagnostic"`
- `SkillState.lastEvaluatedAt` → now

---

### Step 4: CYCLE OPENING

**Trigger**: Manual or orchestrated opening of a new cycle.

**Preconditions**:
- `StudentProgramInstance.status` must be `"active"`.
- `StudentProgramInstance.currentContinuityState` must be `"normal"`.
- If this is the first cycle (`cycleNumber = 1`): a completed `Diagnostic` of type `"initial"` must exist for this enrollment.
- If this is a subsequent cycle: the previous cycle must be `"closed"` and a `ContinuitySignal` with `signalType = "continue"` must exist for it.
- No other `LearningCycle` with `status = "open"` may exist for this enrollment.

**Operation**:
- Create `LearningCycle` with auto-incremented `cycleNumber`, `status = "open"`, `openedAt = now()`.

**Side-effects**:
- Set `StudentProgramInstance.currentCycleId` to the new cycle's ID.
- Set `StudentProgramInstance.lastActivityAt` to current timestamp.

**Fields mutated**:
- `LearningCycle.status` → `"open"`
- `LearningCycle.cycleNumber` → auto-incremented
- `LearningCycle.openedAt` → now
- `StudentProgramInstance.currentCycleId` → new cycle ID
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 5: LOAD ASSIGNMENT

**Trigger**: Manual or orchestrated creation of study loads within the open cycle.

**Preconditions**:
- `LearningCycle.status` must be `"open"`.
- `loadType` must be one of the canonical set: `practice`, `reading`, `video`, `project`, `assessment`.

**Operation**:
- Create one or more `StudyLoad` records linked to the cycle.
- Initial `StudyLoad.status = "pending"`.

**Side-effects**:
- Update `StudentProgramInstance.lastActivityAt`.

**Status transitions for StudyLoad**:
- `pending` → `in_progress` (when the student begins the load)
- `in_progress` → `completed` (when the student finishes the load)
- No reverse transitions in v1.0.

**Fields mutated**:
- `StudyLoad.status` → `"pending"` (on creation)
- `StudyLoad.releasedAt` → optionally set when released to student
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 6: SESSION EXECUTION

**Trigger**: A tutoring session begins within the open cycle.

**Preconditions**:
- `LearningCycle.status` must be `"open"`.
- If linked to a `StudyLoad`, that load's parent cycle must be the same cycle.

**Operation**:
- Create `TutoringSession` with `status = "in_progress"`, `startedAt = now()`.
- Optionally link to a `StudyLoad` via `studyLoadId`.

**Side-effects**:
- Update `StudentProgramInstance.lastActivityAt`.

**Status transitions for TutoringSession**:
- `in_progress` → `completed` (set `completedAt = now()`)
- No reverse transitions in v1.0.

**Fields mutated**:
- `TutoringSession.status` → `"in_progress"` (on creation)
- `TutoringSession.startedAt` → now
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 7: RESPONSE CAPTURE

**Trigger**: The student produces a response within a session.

**Preconditions**:
- `TutoringSession.status` must be `"in_progress"` (responses are captured during active sessions).
- The session's parent cycle must be `"open"`.

**Operation**:
- Create `Response` linked to the session.
- Optionally link to a `Skill` via `skillId`.
- Populate `isCorrect`, `score`, `feedback` as available.

**Side-effects**:
- Update `StudentProgramInstance.lastActivityAt`.

**Fields mutated**:
- `Response.responseType` → `"answer"` (default in v1.0)
- `Response.isCorrect` → boolean or null
- `Response.score` → float or null
- `Response.skillId` → optional skill reference
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 8: CYCLE EVALUATION (cycle_close)

**Trigger**: A formal evaluation of cycle_close type is recorded.

**Preconditions**:
- `LearningCycle.status` must be `"open"`.
- `evaluationType` must be `"cycle_close"`.
- At least one `TutoringSession` must exist in the cycle (a cycle cannot be evaluated without any activity).

**Operation**:
- Create `CycleEvaluation` with `evaluationType = "cycle_close"`.
- Populate `resultSummary` with evaluation outcome.

**Side-effects**:
- This step marks the beginning of the closure chain. Steps 9–13 must follow in order.
- Update `StudentProgramInstance.lastActivityAt`.

**Note**: `CycleEvaluation` records of type `progress_check` may exist earlier in the cycle. They do not trigger the closure chain and have no mandatory side-effects.

**Fields mutated**:
- `CycleEvaluation.evaluationType` → `"cycle_close"`
- `CycleEvaluation.resultSummary` → populated
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 9: PRE-DECISION SNAPSHOT

**Trigger**: Immediately after a `CycleEvaluation` of type `cycle_close` is created.

**Preconditions**:
- A `CycleEvaluation` with `evaluationType = "cycle_close"` must exist for this cycle.
- `LearningCycle.status` must still be `"open"` (snapshot is taken before closure).

**Operation**:
- Create `CycleSnapshot` with `snapshotType = "pre_decision"`.
- `payload` (JSON) must capture the current state of the cycle at minimum:
  - List of `SkillState` records for this enrollment (masteryLevel, confidenceLevel, needsReinforcement)
  - Summary of cycle activity (count of sessions, responses, loads completed)
  - The `resultSummary` from the cycle_close evaluation

**Side-effects**:
- None beyond the snapshot creation itself. The snapshot is a read-only record.

**Fields mutated**:
- `CycleSnapshot.snapshotType` → `"pre_decision"`
- `CycleSnapshot.payload` → JSON object
- `CycleSnapshot.takenAt` → now

---

### Step 10: CYCLE DECISION

**Trigger**: After the pre-decision snapshot has been captured.

**Preconditions**:
- A `CycleSnapshot` with `snapshotType = "pre_decision"` must exist for this cycle.
- `LearningCycle.status` must still be `"open"`.
- `decisionType` must be one of: `advance`, `reinforce`, `hold`, `redirect`.

**Operation**:
- Create `CycleDecision` with `decisionType` and optional `rationale`.
- Create one or more `CycleDecisionSkill` records linking the decision to target skills.

**Side-effects**:
- Update `StudentProgramInstance.lastActivityAt`.

**Semantic meaning of each decisionType**:
- `advance`: The student demonstrated sufficient mastery; move forward to new skills or higher complexity.
- `reinforce`: The student showed partial mastery; repeat similar work with targeted support.
- `hold`: Insufficient evidence to make a directional decision; maintain current level with additional activity.
- `redirect`: The current approach is ineffective; change the pedagogical strategy or skill focus.

**Fields mutated**:
- `CycleDecision.decisionType` → one of canonical set
- `CycleDecision.rationale` → optional text
- `CycleDecisionSkill.skillId` → target skill(s)
- `CycleDecisionSkill.priority` → ordering
- `CycleDecisionSkill.reason` → optional justification per skill
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 11: SKILL STATE UPDATE

**Trigger**: Immediately after the cycle decision is recorded.

**Preconditions**:
- A `CycleDecision` must exist for this cycle.
- `SkillState` records must exist for the enrollment (initialized at Step 3 or in a prior cycle).

**Operation**:
- For each skill referenced in `CycleDecisionSkill` records, and based on the cycle_close evaluation results and the decision type, update the corresponding `SkillState`.

**Update logic** (v1.0 — deterministic rules, no LLM):

| Decision type | Skill in decision targets | masteryLevel change | needsReinforcement |
|--------------|--------------------------|--------------------|-----------------|
| `advance` | Yes | Increment one level (capped at `mastered`) | Set to `false` |
| `reinforce` | Yes | No change | Set to `true` |
| `hold` | Yes | No change | No change |
| `redirect` | Yes | Decrement one level (floored at `emerging`) | Set to `true` |

Mastery level progression: `not_evaluated` → `emerging` → `developing` → `proficient` → `mastered`

**Side-effects**:
- Set `SkillState.stateSource = "cycle_evaluation"` for all updated skills.
- Set `SkillState.lastEvaluatedAt = now()` for all updated skills.
- Set `SkillState.confidenceLevel` based on evaluation data (implementation detail deferred to wiring phase).

**Fields mutated**:
- `SkillState.masteryLevel` → adjusted per table above
- `SkillState.needsReinforcement` → adjusted per table above
- `SkillState.stateSource` → `"cycle_evaluation"`
- `SkillState.lastEvaluatedAt` → now
- `SkillState.confidenceLevel` → updated (rules TBD in implementation)

---

### Step 12: CYCLE CLOSURE

**Trigger**: After skill states have been updated.

**Preconditions**:
- All of the following must exist for this cycle:
  - A `CycleEvaluation` with `evaluationType = "cycle_close"`
  - A `CycleSnapshot` with `snapshotType = "pre_decision"`
  - A `CycleDecision`
- `LearningCycle.status` must be `"open"`.
- Step 11 (Skill State Update) must have been executed.

**Operation**:
- Update `LearningCycle.status` → `"closed"`.
- Set `LearningCycle.closedAt` → current timestamp.

**Side-effects**:
- All existing closed-cycle guards (Phases CB, CC, CD, DD, DE, and API-level guards on snapshots, decisions, evaluations, sessions) become active for this cycle. No further mutations to child entities.
- Update `StudentProgramInstance.lastActivityAt`.

**Fields mutated**:
- `LearningCycle.status` → `"closed"`
- `LearningCycle.closedAt` → now
- `StudentProgramInstance.lastActivityAt` → now

---

### Step 13: CONTINUITY SIGNAL

**Trigger**: After cycle closure.

**Preconditions**:
- `LearningCycle.status` must be `"closed"`.
- `signalType` must be one of: `continue`, `pause`, `exit`.

**Operation**:
- Create `ContinuitySignal` with:
  - `enrollmentId` → the enrollment
  - `learningCycleId` → the just-closed cycle
  - `evaluationId` → the cycle_close evaluation
  - `signalType` → the chosen signal
  - `rationale` → optional justification

**Side-effects per signalType**:

#### `continue`
- Set `StudentProgramInstance.currentContinuityState` → `"normal"`.
- The enrollment is ready for Step 4 (next cycle opening).
- `StudentProgramInstance.currentCycleId` remains pointing to the just-closed cycle until a new cycle is opened.

#### `pause`
- Set `StudentProgramInstance.currentContinuityState` → `"paused"`.
- Set `StudentProgramInstance.status` → `"paused"`.
- No new cycle may be opened until the enrollment is reactivated.
- Reactivation path: set `status` back to `"active"` and `currentContinuityState` back to `"normal"` (administrative action, out of scope for v1.0 automation).

#### `exit`
- Set `StudentProgramInstance.currentContinuityState` → `"exited"`.
- Set `StudentProgramInstance.status` → `"completed"` (if the exit is expected/successful) or `"dropped"` (if the exit is premature). The distinction is determined by the `rationale` or an explicit parameter.
- Set `StudentProgramInstance.endedAt` → current timestamp.
- Set `StudentProgramInstance.currentCycleId` → `null`.
- No further cycles may be opened.

**Fields mutated**:
- `ContinuitySignal` → created
- `StudentProgramInstance.currentContinuityState` → per signal
- `StudentProgramInstance.status` → per signal (for `pause` and `exit`)
- `StudentProgramInstance.endedAt` → now (for `exit` only)
- `StudentProgramInstance.currentCycleId` → null (for `exit` only)
- `StudentProgramInstance.lastActivityAt` → now

---

## 7. Entity State Lifecycle Rules

For each entity with a `status` field, the following state machines apply. All transitions not listed are **forbidden** in v1.0.

### 7.1 StudentProgramInstance.status

```
                 ┌──────────┐
     create ───→ │  active   │ ←── reactivate (admin)
                 └────┬─────┘
                      │
              ┌───────┼───────┐
              ▼       ▼       ▼
         ┌────────┐ ┌───────────┐ ┌─────────┐
         │ paused │ │ completed │ │ dropped │
         └────────┘ └───────────┘ └─────────┘
              │
              └── reactivate (admin) ──→ active
```

- `active` → `paused`: via `ContinuitySignal(signalType = "pause")`
- `active` → `completed`: via `ContinuitySignal(signalType = "exit")` with successful exit
- `active` → `dropped`: via `ContinuitySignal(signalType = "exit")` with premature exit
- `paused` → `active`: administrative reactivation (out of scope for v1.0 automation)
- `completed` and `dropped` are terminal states in v1.0.

### 7.2 StudentProgramInstance.currentContinuityState

```
  create ──→ normal ──→ paused ──→ normal (reactivation)
                   ──→ exited (terminal)
```

- `normal` → `paused`: via signal `pause`
- `normal` → `exited`: via signal `exit`
- `paused` → `normal`: via administrative reactivation
- `exited` is terminal.

### 7.3 Diagnostic.status

```
  create ──→ pending ──→ completed
```

- `pending` → `completed`: when results are populated
- No reverse transition. No other states in v1.0.

### 7.4 LearningCycle.status

```
  create ──→ open ──→ closed
```

- `open` → `closed`: via Step 12 (requires full closure chain)
- No reverse transition. A closed cycle is never reopened in v1.0.

### 7.5 StudyLoad.status

```
  create ──→ pending ──→ in_progress ──→ completed
```

- `pending` → `in_progress`: when work begins
- `in_progress` → `completed`: when work finishes
- No reverse transitions in v1.0.

### 7.6 TutoringSession.status

```
  create ──→ in_progress ──→ completed
```

- `in_progress` → `completed`: set `completedAt = now()`
- No reverse transition in v1.0.

---

## 8. Cross-Entity Side-Effects

The following side-effects are **mandatory**. Each describes a triggering event and the resulting operations that must execute atomically (or in immediate sequence with failure handling).

| # | Triggering event | Side-effect | Target entity | Target fields |
|---|-----------------|-------------|---------------|---------------|
| SE-1 | `Diagnostic(type=initial)` status → `completed` | Create/update `SkillState` for all program skills | `SkillState` | `masteryLevel`, `confidenceLevel`, `needsReinforcement`, `stateSource="diagnostic"`, `lastEvaluatedAt` |
| SE-2 | `LearningCycle` created | Update enrollment pointer | `StudentProgramInstance` | `currentCycleId` → new cycle ID |
| SE-3 | `CycleEvaluation(type=cycle_close)` created | Generate pre-decision snapshot | `CycleSnapshot` | `snapshotType="pre_decision"`, `payload` |
| SE-4 | `CycleDecision` created | Update skill states per decision rules | `SkillState` | `masteryLevel`, `needsReinforcement`, `stateSource="cycle_evaluation"`, `lastEvaluatedAt` |
| SE-5 | `LearningCycle.status` → `closed` | Activate all closed-cycle guards | (behavioral) | No field mutations — guards prevent further writes |
| SE-6 | `ContinuitySignal(type=continue)` created | Set enrollment ready for next cycle | `StudentProgramInstance` | `currentContinuityState="normal"` |
| SE-7 | `ContinuitySignal(type=pause)` created | Pause enrollment | `StudentProgramInstance` | `status="paused"`, `currentContinuityState="paused"` |
| SE-8 | `ContinuitySignal(type=exit)` created | Close enrollment | `StudentProgramInstance` | `status`, `currentContinuityState="exited"`, `endedAt`, `currentCycleId=null` |
| SE-9 | Any write operation on cycle entities | Update activity timestamp | `StudentProgramInstance` | `lastActivityAt` → now |

---

## 9. Manual vs. Automated Boundary in v1.0

This section defines which operations are performed manually (via admin UI or direct API call) and which must be automated as side-effects in the wiring layer.

### 9.1 Manual in v1.0 (operator-initiated)

| Operation | Rationale |
|-----------|-----------|
| Creating an enrollment | Requires intentional student-program pairing |
| Creating and completing a diagnostic | Results come from external assessment or manual input |
| Opening a new cycle | Intentional pedagogical decision |
| Creating study loads | Pedagogical content selection |
| Starting and completing sessions | Driven by student activity |
| Recording responses | Driven by student input |
| Creating a cycle_close evaluation | Intentional assessment judgment |
| Choosing a cycle decision type | Pedagogical routing judgment |
| Selecting decision target skills | Pedagogical judgment |
| Choosing a continuity signal | Enrollment-level judgment |
| Reactivating a paused enrollment | Administrative decision |

### 9.2 Automated in v1.0 (side-effects of manual actions)

| Operation | Trigger | Ref |
|-----------|---------|-----|
| Update `currentCycleId` on enrollment | Cycle opening | SE-2 |
| Initialize `SkillState` records from diagnostic | Diagnostic completion | SE-1 |
| Create `CycleSnapshot(pre_decision)` | cycle_close evaluation created | SE-3 |
| Update `SkillState` from decision | Decision created | SE-4 |
| Set `closedAt` on cycle | Cycle status → closed | Existing PATCH logic |
| Update `currentContinuityState` on enrollment | Signal created | SE-6/7/8 |
| Update enrollment `status` for pause/exit | Signal created | SE-7/8 |
| Set `endedAt` on enrollment | Exit signal | SE-8 |
| Clear `currentCycleId` on enrollment | Exit signal | SE-8 |
| Update `lastActivityAt` on enrollment | Any cycle entity write | SE-9 |
| Auto-increment `cycleNumber` | Cycle creation | Existing POST logic |

### 9.3 Boundary note

In v1.0, the human operator (via admin UI or API) makes all pedagogical decisions. The wiring layer enforces preconditions, executes side-effects, and prevents invalid transitions. No decision is made by the system autonomously.

---

## 10. Explicitly Out of Scope

The following are **not governed** by this contract and must not be implemented as part of Line E v1.0:

| Exclusion | Reason |
|-----------|--------|
| Student-facing UI | The wiring layer must be operational at the API/service level before any student experience is built |
| LLM-driven decision automation | Requires functioning wiring + real data before intelligent automation can be layered on |
| Content resources / learning materials | Entity does not exist and is not required for the wiring contract; if needed, it will emerge from implementation |
| Prerequisite graphs between skills | Adds graph complexity not needed for v1.0 linear progression |
| Multi-program concurrency | One enrollment = one program at a time |
| Cycle reopening / rollback | A closed cycle is immutable in v1.0 |
| Notification or alerting system | Not part of the adaptive cycle core |
| Analytics or aggregated metrics | Derivable after wiring is operational |
| Administrative override paths | Forced closures, manual corrections, and exception handling are deferred |
| Enrollment reactivation automation | `paused → active` transition remains a manual administrative action |
| Confidence level update rules | `SkillState.confidenceLevel` update logic is acknowledged but deferred to implementation phase for detailed specification |

---

## 11. Open Questions Deferred Beyond v1.0

The following questions are acknowledged but explicitly deferred. They do not block v1.0 implementation.

| # | Question | Impact | Deferral rationale |
|---|----------|--------|--------------------|
| Q1 | Should `sessionType` have a canonical set beyond `"practice"`? | Affects session diversity | Single default is sufficient for v1.0 wiring validation |
| Q2 | Should `responseType` have a canonical set beyond `"answer"`? | Affects response classification | Single default is sufficient for v1.0 |
| Q3 | Should `CycleSnapshot.payload` have a defined JSON schema? | Affects snapshot consistency | Free-form JSON is acceptable for v1.0; schema can be formalized once patterns emerge |
| Q4 | What are the exact rules for `confidenceLevel` updates? | Affects skill-state fidelity | The field is updated but the exact derivation rules can be refined during implementation |
| Q5 | Should intermediate `progress_check` evaluations trigger `SkillState` updates? | Affects granularity of mastery tracking | v1.0 only updates skill states at cycle_close; mid-cycle updates deferred |
| Q6 | Should there be a maximum number of cycles per enrollment? | Affects enrollment lifecycle | No artificial limit in v1.0 |
| Q7 | How should `exit` signals distinguish between `completed` and `dropped`? | Affects enrollment termination semantics | v1.0 uses `rationale` text or explicit parameter; formalization deferred |

---

## 12. Final Rationale for Why This Contract Is the Correct Next Artifact

Four facts from the current project state make this contract the necessary and sufficient artifact to produce before any Line E code is written:

**Fact 1: The schema contains implicit promises with no explicit enforcement.**  
`StudentProgramInstance.currentCycleId` exists in the schema since the foundational phases but no logic has ever updated it. `currentContinuityState` defaults to `"normal"` but no process mutates it. These fields are evidence that the wiring was anticipated from the beginning. This contract makes their lifecycle explicit.

**Fact 2: Closed-cycle guards assume a sequence that was never documented.**  
Phases CB, CC, CD, DD, DE and six API-level guards prevent mutations on closed cycles. They are reactive wiring — they prevent bad states but do not define the correct sequence of states. This contract defines the forward path that the guards protect.

**Fact 3: Side-effects cross entity boundaries.**  
Nine mandatory side-effects (SE-1 through SE-9) connect twelve entities. Implementing these without a contract would produce inconsistent, order-dependent, and untestable code. The contract makes every cross-entity dependency explicit and auditable.

**Fact 4: The manual/automated boundary must be intentional.**  
In v1.0, the system enforces rules but does not make decisions. This is a deliberate architectural choice that keeps the wiring layer testable and debuggable before LLM intelligence is layered on. The contract documents this boundary so that no implementation phase accidentally introduces autonomous behavior.

This document is now the governing reference for all phases within Line E.

---

*End of contract.*
