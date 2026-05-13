# MVP-SRA-SCOPE-2 - Canonical PAES_M1 Student Journey and Roadmap Traversal

## 1. Purpose

Define the canonical PAES_M1 student journey and roadmap traversal model for Bexauri.

This document translates the scope charter into a student-facing and system-facing flow: how a student enters, works, receives feedback, self-reports, continues, gets redirected or advanced, encounters milestones, and gradually traverses the PAES_M1 roadmap without being blocked by normal operator work.

This phase follows `MVP-SRA-SCOPE-1`, which defined the complete tutoring scope.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `7ce9be4`
- Last accepted commit = `MVP-SRA-SCOPE-1: define complete PAES M1 tutoring scope`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Canonical journey principle

The canonical PAES_M1 journey is not a fixed queue.

It is a repeated regulated learning loop:

```text
student state
-> next learning action
-> activity
-> answers
-> feedback
-> self-report
-> evidence interpretation
-> next-load decision record
-> next learning action
```

The loop should feel continuous to the student, while Bexauri uses evidence and roadmap context to regulate what comes next.

Core product principle:

```text
The student studies continuously. The system regulates intelligently. Operators improve asynchronously.
```

## 4. Non-blocking continuity rule

The student should not normally wait for an operator, supervisor, or expert review before continuing.

Standing rule:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

Operator and expert review may improve the route, insert special actions, or correct the roadmap, but default continuity must proceed through the safest available rule-based or future agent-supported decision.

## 5. Canonical high-level flow

A complete PAES_M1 tutoring flow should support this rhythm:

1. Student enters `/now`.
2. Bexauri shows the current useful action.
3. Student starts activity.
4. Student answers items.
5. Bexauri saves answers.
6. Bexauri provides safe feedback.
7. Student self-reports.
8. Activity is finalized.
9. Evidence is interpreted.
10. A next-load decision record is formed conceptually or later at runtime.
11. Bexauri prepares the next useful action.
12. Student returns to refreshed `/now`.
13. Student continues without waiting for manual review.
14. Roadmap traversal continues across nodes, slices, axes, and milestones.

## 6. Student-facing stages

### 6.1 Entry stage

Student question:

```text
What do I work on now?
```

Bexauri should answer clearly:

- current activity;
- why it matters at a simple level;
- what to do next;
- reassurance that the result is evidence, not a fixed label.

Possible first action types:

- balanced entry;
- known-need activity;
- prerequisite repair;
- confidence-restoration activity;
- validation activity;
- continuation from prior evidence.

The first action should not imply a heavy diagnostic unless a later phase explicitly defines such a diagnostic experience.

### 6.2 Start stage

Student action:

```text
Press Start / Empezar.
```

Expected experience:

- the activity opens directly;
- instructions are clear;
- the student understands whether it is practice, review, bridge, or checkpoint;
- the student does not need to understand internal LearningCycles.

### 6.3 Work stage

Student action:

```text
Answer items.
```

Expected experience:

- mobile-friendly layout;
- readable math notation;
- visible alternatives;
- no hidden required actions;
- no confusing scroll behavior;
- activity small enough to preserve momentum.

### 6.4 Submit stage

Student action:

```text
Submit answers.
```

Expected experience:

- answers are saved;
- feedback appears safely;
- self-report is visible without manual search;
- no PAES score or mastery claim appears.

### 6.5 Self-report stage

Student action:

```text
Tell Bexauri how it went.
```

Self-report is part of evidence. It may influence next decisions when it conflicts with performance or signals frustration/confidence.

Allowed framing:

```text
Your report helps prepare the next step.
```

Disallowed framing:

```text
Your report alone determines your level.
```

### 6.6 Finalization stage

Student action:

```text
Finalize activity.
```

Expected experience:

- loading state if needed;
- no mysterious transition message;
- refreshed `/now` after completion;
- next useful action or completed-state message.

### 6.7 Continuation stage

Student question:

```text
What comes next?
```

Bexauri should show:

- next activity if one is ready;
- or safe completion/registered state if no next activity is currently available;
- ideally, a next action without requiring manual operator intervention.

## 7. System-facing stages

### 7.1 Read current state

The system should know or infer:

- student enrollment;
- active program;
- current active slice;
- current StudyLoad;
- recent evidence;
- recent self-report;
- current taxonomy node;
- coverage history;
- monotony risk;
- pending special actions or milestones.

### 7.2 Interpret evidence

Evidence should include:

- answered count;
- correct count when available and safe;
- item-level pattern;
- error patterns;
- completion status;
- self-report;
- prior sequence;
- axis coverage;
- prerequisite signals;
- confidence/frustration signal.

### 7.3 Create or conceptualize decision record

The decision record should answer:

```text
Why is this next action useful for this student now?
```

It should include:

- current node;
- evidence summary;
- self-report interpretation;
- prerequisite risk;
- monotony risk;
- coverage gap;
- decision type;
- next action;
- rationale;
- fallback;
- async review flag if needed.

### 7.4 Select next action

The next action may be:

- practice;
- reinforcement;
- bridge;
- validation;
- hold;
- redirect;
- spiral;
- confidence-restoration;
- guided review later;
- cycle milestone;
- async review request plus safe fallback.

### 7.5 Preserve continuity

If the ideal action is unavailable, use fallback.

If review is pending, continue with safe fallback.

If evidence is insufficient, choose a low-risk hold/validation action.

If monotony risk is high, vary the axis or representation.

## 8. Roadmap traversal model

### 8.1 Master roadmap

The master roadmap is the full PAES_M1 pedagogical map:

- Numbers;
- Algebra/functions;
- Geometry;
- Probability/statistics;
- PAES skills;
- node families;
- nodes;
- prerequisites;
- bridges;
- difficulty bands;
- milestones.

### 8.2 Active slice

An active slice is the useful local segment for a student.

Examples:

- AS1 algebra/functions corridor;
- N1 Numbers prerequisite and proportional reasoning;
- G1 Geometry measurement and visual reasoning;
- PE1 Data and probability entry;
- future checkpoint slice;
- future mini-ensayo slice.

### 8.3 Node movement

Node movement is not only forward.

Possible movements:

- forward to next node;
- sideways to another representation;
- backward to prerequisite;
- spiral to another axis;
- pause with hold/validation;
- milestone after meaningful progress;
- skip basics when evidence supports it.

### 8.4 Coverage movement

The system should avoid staying indefinitely in one corridor.

Coverage movement should consider:

- what the student needs now;
- what has been overrepresented recently;
- what official PAES_M1 areas remain undercovered;
- which slice can provide confidence or useful evidence.

## 9. Canonical decision patterns

### 9.1 Advance

Use when:

- evidence is strong;
- self-report is positive or neutral;
- prerequisite risk is low;
- next node is natural.

Example:

```text
AF_EQ_02 strong -> AF_EQ_04 or AF_LIN_01.
```

### 9.2 Reinforce

Use when:

- current node is weak but not deeply blocked;
- one targeted repeat may help;
- monotony risk is low or medium.

Limit:

```text
Do not create endless reinforcement loops.
```

### 9.3 Bridge

Use when:

- current skill is stable;
- student is ready for controlled novelty;
- Bexauri wants to test readiness without a large jump.

Example:

```text
3 familiar items + 1 new representation or context.
```

### 9.4 Validate

Use when:

- performance appears strong;
- Bexauri needs confirmation before acceleration.

### 9.5 Hold

Use when:

- evidence is mixed;
- self-report conflicts with answers;
- next action is uncertain.

### 9.6 Redirect

Use when:

- errors point to prerequisite weakness;
- continuing the current node would be inefficient.

Example:

```text
Equation errors driven by fractions -> N_RAT_02.
```

### 9.7 Spiral

Use when:

- coverage is too narrow;
- monotony risk is high;
- another axis can preserve motivation and evidence.

Example:

```text
Repeated algebra -> PE_DATA_01 or G_AREA_01.
```

### 9.8 Cycle milestone

Use when:

- a meaningful segment has been completed;
- the student needs synthesis or reflection;
- Bexauri needs a broader evidence checkpoint.

### 9.9 Async review request

Use when:

- evidence is unclear;
- route quality could improve with expert/supervisor view;
- but continuity should proceed with safe fallback.

## 10. Canonical journey examples

### 10.1 Unknown-level student, no blockers

```text
Balanced entry
-> AS1 algebra/functions entry
-> equation evidence strong
-> word problems or functions bridge
-> spiral to PE or Geometry before monotony
-> milestone after segment
```

### 10.2 Student with Numbers prerequisite weakness

```text
Balanced entry
-> weak percentage/rational/sign evidence
-> N1 Numbers support
-> return to algebra or proportionality bridge
-> continue based on new evidence
```

### 10.3 Student with algebra monotony risk

```text
AS1 equations
-> reinforcement
-> mixed evidence
-> monotony risk high
-> PE1 data or G1 geometry spiral
-> return to algebra/functions with renewed context
```

### 10.4 Student strong in AS1 basics

```text
Balanced entry or prior evidence strong
-> skip basic equation repetition
-> validation or linear functions
-> bridge to richer modeling
-> milestone or axis spiral
```

### 10.5 Student with negative self-report despite correct answers

```text
Activity strong but self-report negative
-> confidence-aware hold or bridge
-> lower cognitive load next action
-> monitor confidence signal
```

### 10.6 Student with repeated weak evidence

```text
Weak activity
-> targeted reinforcement
-> still weak
-> prerequisite redirect or representation change
-> async review request if unclear
-> safe fallback continues student work
```

## 11. Student-facing wording principles

Use language that supports autonomy and confidence.

Preferred wording:

- `Tu avance quedó registrado.`
- `Esta actividad ayuda a preparar tu próximo paso.`
- `Seguiremos con una actividad breve para fortalecer esta base.`
- `Ahora veremos una forma distinta de trabajar el tema.`
- `Esta actividad no es un puntaje PAES.`

Avoid wording that implies:

- fixed level;
- failure label;
- official score;
- AI certainty;
- hidden evaluation;
- waiting for operator approval.

## 12. Milestone placement in the journey

Milestones should appear after meaningful progress, not as arbitrary administrative closures.

Possible milestone triggers:

- completion of a corridor segment;
- repeated mixed evidence requiring synthesis;
- strong progress across several nodes;
- need for broader checkpoint;
- transition to another active slice;
- preparation for mini-ensayo later.

Milestone examples:

- `Resumen de avance`;
- `Revisión guiada de errores`;
- `Mini checkpoint`;
- `Desafío integrador`;
- `Mini ensayo` later;
- `Recalibración de ruta`.

## 13. Operator role inside the journey

Operators work behind and alongside the journey.

They may:

- review decision records;
- inspect evidence;
- improve content;
- correct future routing;
- add milestones;
- prepare expert feedback;
- identify risk;
- tune guardrails.

They should not normally be visible as a blocker.

Student continuity remains default.

## 14. Future tutor-agent role inside the journey

A future tutor agent should:

- read the journey state;
- read taxonomy and metadata;
- propose next decision record;
- select/generate next action inside constraints;
- explain rationale;
- preserve guardrails;
- request async review when needed;
- provide safe fallback.

It must not:

- claim PAES score;
- claim mastery without validated basis;
- freely invent roadmap;
- block student by default;
- bypass expert/product governance.

## 15. MVP-Beta version of this journey

MVP-Beta may implement only a small part of this journey.

Acceptable MVP-Beta state:

- AS1 available but not universal;
- N1/G1/PE1 designed or partially implemented later;
- decision records may be manual/documented;
- expert review may be pending if internal-only and clearly provisional;
- student-facing claims remain modest;
- operator review remains asynchronous;
- no PAES score/mastery/theta/adaptive AI claim.

## 16. Construction remains paused

This document does not authorize construction.

Construction should resume only after selecting a narrow implementation slice from the charter and journey.

Potential future implementation candidates after scope work:

- implement metadata for existing registry content;
- implement one non-algebra slice;
- implement decision-record admin note prototype;
- implement simple rule-based selector for internal-only flow;
- implement milestone UI later.

None are authorized here.

## 17. Recommended next documentation phase

Recommended next phase:

`MVP-SRA-SCOPE-2A - Cycle milestone and special action model`

Purpose:

- define milestone types, triggers, evidence purpose, student-facing framing, and relationship to LearningCycles.

Alternative:

`MVP-SRA-SCOPE-3 - Human/operator parallel role model`

Use if the team wants to clarify operator responsibilities before milestone design.

Recommended order:

1. Cycle milestone and special action model.
2. Human/operator parallel role model.
3. Future tutor-agent governance model.
4. Narrow construction restart proposal.

## 18. Handoff requirements

Future handoffs must preserve:

- canonical student journey and roadmap traversal exist;
- construction remains paused until a narrow implementation slice is selected;
- student continuity is non-blocking;
- AS1 is available but not universal;
- N1/G1/PE1 are proposed complements, not mandatory routes;
- milestones are pedagogical actions, not just admin closures;
- future agent must operate inside taxonomy/metadata/decision guardrails;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
