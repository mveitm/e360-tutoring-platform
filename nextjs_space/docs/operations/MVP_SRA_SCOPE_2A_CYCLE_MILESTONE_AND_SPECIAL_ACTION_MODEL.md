# MVP-SRA-SCOPE-2A - Cycle Milestone and Special Action Model

## 1. Purpose

Define the pedagogical model for cycle milestones and special learning actions in a PAES_M1 tutoring experience.

This document clarifies how Bexauri should use milestones, checkpoints, guided reviews, integrative challenges, mini-ensayos, reflective closures, and route recalibration without turning them into operational bottlenecks.

This phase follows `MVP-SRA-SCOPE-2`, which defined the canonical student journey and roadmap traversal.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `9a052b9`
- Last accepted commit = `MVP-SRA-SCOPE-2: define canonical M1 student journey`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Core decision

Milestones are pedagogical actions, not merely administrative cycle closures.

A milestone should help the student and the system answer:

```text
What progress has been made?
What evidence has been gathered?
What should happen next?
How can the student keep momentum?
```

Core principle:

```text
Milestone = pedagogical synthesis and routing moment, not a default gate.
```

## 4. Non-blocking milestone principle

Milestones must preserve student continuity.

Standing rule:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

A milestone may request human review or expert review, but it should normally include a safe next action or fallback so the student can continue.

Only separately versioned exceptional policies may pause continuity.

## 5. Relationship to LearningCycles

LearningCycles are internal operational containers.

They may group:

- StudyLoads;
- evidence;
- self-reports;
- decision records;
- milestones;
- operator notes;
- future special actions.

But the student should not need to understand LearningCycle internals.

Student-facing milestones may or may not coincide exactly with internal LearningCycle closure.

Important distinction:

```text
Internal LearningCycle closure = operational bookkeeping.
Student milestone = pedagogical experience.
```

They may align, but they are not the same concept.

## 6. Milestone purposes

A milestone may serve one or more purposes:

### 6.1 Synthesis

Help the student consolidate what they practiced.

### 6.2 Evidence aggregation

Collect broader evidence than one micro StudyLoad.

### 6.3 Motivation

Show progress and reduce the feeling of endless small tasks.

### 6.4 Route recalibration

Help Bexauri decide whether to advance, redirect, spiral, reinforce, validate, or change axis.

### 6.5 Confidence restoration

Turn weak or mixed evidence into a constructive next step.

### 6.6 Coverage checkpoint

Check whether the path is overfocused on one axis or missing important PAES_M1 areas.

### 6.7 Human/operator review anchor

Give operators or experts a coherent packet to review asynchronously.

## 7. Milestone types

### 7.1 Progress summary

Student-facing summary of recent work.

Purpose:

- show what was completed;
- avoid mysterious progression;
- reinforce continuity and motivation.

Evidence role:

- low direct evidence;
- high motivational and orientation value.

### 7.2 Mini-checkpoint

Short activity that samples several related nodes or one active slice.

Purpose:

- validate readiness;
- detect whether reinforcement is needed;
- prepare next slice.

Evidence role:

- medium evidence value;
- useful for route recalibration.

### 7.3 Guided error review

Structured review of common errors from recent work.

Purpose:

- help student understand mistakes;
- avoid repeating the same reinforcement blindly;
- support confidence restoration.

Evidence role:

- identifies misconception patterns;
- may produce self-report and corrected-reasoning evidence later.

### 7.4 Integrative challenge

Short challenge connecting multiple nodes or representations.

Purpose:

- introduce synthesis;
- test transfer;
- make the path feel meaningful.

Evidence role:

- useful for bridge/advance decisions;
- may reveal hidden prerequisite weakness.

### 7.5 Mini-ensayo later

Longer or broader checkpoint resembling PAES-style conditions.

Purpose:

- broader readiness signal;
- integration across axes;
- future exam-preparation experience.

MVP-Beta status:

- future action type;
- not part of current MVP-Beta implementation unless explicitly scoped later.

Guardrail:

- no PAES score prediction unless a later validated scoring model exists.

### 7.6 Reflective closure

Short self-reflection or progress review.

Purpose:

- help student notice progress;
- gather confidence/frustration signal;
- support next-route choice.

Evidence role:

- self-report oriented;
- not a performance measure by itself.

### 7.7 Route recalibration milestone

Internal or student-facing moment where Bexauri changes active slice direction.

Purpose:

- shift from AS1 to N1/G1/PE1;
- decide if prerequisite repair is needed;
- decide if next segment should broaden coverage.

Evidence role:

- high decision value if tied to decision record.

## 8. Trigger conditions

Milestones should be triggered by pedagogical state, not arbitrary counters alone.

Possible triggers:

### 8.1 Segment completion

A student completes a meaningful slice or corridor segment.

Example:

```text
AS1 equations -> word problems -> functions entry completed.
```

### 8.2 Repeated mixed evidence

The system has enough ambiguity that another normal StudyLoad may be less useful than synthesis or guided review.

### 8.3 Repeated reinforcement risk

Student has received one or two similar reinforcements and continuing would create monotony.

### 8.4 Coverage imbalance

The student has spent too much recent work in one axis.

### 8.5 Strong progress

Student shows strong evidence and may benefit from validation, challenge, or acceleration.

### 8.6 Negative confidence signal

Student performs adequately but self-report suggests insecurity or fatigue.

### 8.7 Operator/expert review opportunity

Evidence forms a coherent packet worth reviewing asynchronously.

## 9. Milestone decision record

A milestone should be explainable through a decision record.

Minimum conceptual fields:

```json
{
  "decisionType": "cycle_milestone",
  "milestoneType": "mini_checkpoint|guided_error_review|progress_summary|integrative_challenge|mini_ensayo_later|reflective_closure|route_recalibration",
  "trigger": "segment_completion|mixed_evidence|reinforcement_limit|coverage_imbalance|strong_progress|confidence_signal|review_opportunity",
  "recentNodes": ["AF_EQ_02", "AF_EQ_04", "AF_LIN_01"],
  "evidenceSummary": "short qualitative summary",
  "studentFacingPurpose": "short simple explanation",
  "nextActionAfterMilestone": "advance|reinforce|bridge|redirect|spiral|validate|hold",
  "fallbackIfUnavailable": "safe next StudyLoad or progress summary",
  "asyncReviewRequested": false,
  "operatorBlocking": false
}
```

This is illustrative and not implemented in code in this phase.

## 10. Student-facing framing

Milestones should be framed positively and clearly.

Preferred language:

- `Vamos a revisar lo que ya avanzaste.`
- `Esta actividad breve ayuda a ordenar tu próximo paso.`
- `Ahora haremos un pequeño desafío para conectar lo aprendido.`
- `Tu avance quedó registrado. Seguiremos con el siguiente paso útil.`
- `Esta revisión no es un puntaje PAES.`

Avoid language that implies:

- failure label;
- official score;
- fixed level;
- hidden grading;
- waiting for manual approval;
- AI certainty.

## 11. Examples in PAES_M1 journey

### 11.1 After AS1 strong progress

State:

- equations completed strongly;
- word problems adequate;
- functions entry adequate;
- monotony risk medium;
- geometry/PE coverage low.

Milestone:

- progress summary or mini-checkpoint.

Next action:

- spiral to PE1-DATA or G1 area/perimeter.

### 11.2 After repeated equation weakness

State:

- equation mechanics weak;
- reinforcement already attempted;
- errors show signs/fractions;
- self-report negative.

Milestone:

- guided error review or route recalibration.

Next action:

- N1 Numbers prerequisite support.

### 11.3 After balanced entry mixed pattern

State:

- algebra ok;
- percentage weak;
- geometry ok;
- PE unknown;
- self-report neutral.

Milestone:

- not necessarily needed.

Next action:

- N1 percentage/proportionality bridge or AS1 shortened corridor.

### 11.4 After broad slice completion

State:

- AS1 + N1 + one G1/PE1 activity completed;
- enough evidence for broader route.

Milestone:

- mini-checkpoint or integrative challenge.

Next action:

- route recalibration into next active slice.

## 12. Relationship to current MVP-Beta state

Current MVP-Beta does not need full milestone implementation.

Acceptable current state:

- milestones documented;
- some milestones represented later as normal StudyLoads;
- operator can reason about milestone moments manually;
- no student-facing milestone automation yet.

Future implementation may introduce:

- milestone StudyLoad type;
- special action type;
- progress summary UI;
- guided error review UI;
- mini-checkpoint registry content;
- admin milestone review surface;
- tutor-agent milestone proposals.

None are authorized by this phase.

## 13. Milestone vs regular StudyLoad

A regular StudyLoad usually targets a specific node or micro-skill.

A milestone usually targets:

- synthesis;
- broader evidence;
- route decision;
- motivation;
- reflection;
- transition between slices.

Some milestones may initially be implemented as StudyLoads for simplicity, but conceptually they should remain distinct.

## 14. Anti-monotony function

Milestones are one way to avoid monotony.

They can interrupt unproductive loops such as:

```text
weak evidence -> same reinforcement -> weak evidence -> same reinforcement
```

A better flow may be:

```text
weak evidence -> targeted reinforcement -> still weak -> guided error review or prerequisite redirect
```

Or:

```text
several algebra loads -> progress summary -> geometry/data spiral
```

## 15. Operator role around milestones

Operators may:

- review milestone evidence;
- add a milestone manually later;
- inspect repeated error patterns;
- approve or adjust route suggestions;
- prepare expert review packets;
- refine future milestone triggers.

Operators should not normally need to approve every milestone before the student continues.

## 16. Future tutor-agent role around milestones

A future tutor agent may:

- propose milestone type;
- generate progress summary;
- detect reinforcement loops;
- suggest guided error review;
- recommend route recalibration;
- request async human review;
- produce a decision record.

The agent must remain inside:

- official taxonomy;
- metadata constraints;
- expert/product guardrails;
- no overclaiming policy.

## 17. Minimal milestone taxonomy

Initial milestone taxonomy:

- `progress_summary`
- `mini_checkpoint`
- `guided_error_review`
- `integrative_challenge`
- `reflective_closure`
- `route_recalibration`
- `mini_ensayo_later`

MVP-Beta should likely begin with:

1. `progress_summary`
2. `guided_error_review`
3. `mini_checkpoint`

`mini_ensayo_later` should remain future unless explicitly scoped.

## 18. Guardrails

- Milestones are not PAES score events.
- Milestones are not mastery certification.
- Milestones are not default gates.
- Milestones are not proof of adaptive AI.
- Milestones must include fallback if tied to next action.
- Milestones should support student motivation and continuity.
- Milestones should remain understandable to the student.

## 19. Recommended next documentation phase

Recommended next phase:

`MVP-SRA-SCOPE-3 - Human/operator parallel role model`

Purpose:

- define what operators do in parallel to the student journey;
- clarify review, content improvement, evidence monitoring, milestone insertion, and expert escalation;
- preserve non-blocking continuity.

Alternative:

`MVP-SRA-SCOPE-4 - Future tutor-agent governance model`

Use if the team wants to define agent governance before operator workflow.

Recommended order:

1. Human/operator parallel role model.
2. Future tutor-agent governance model.
3. Narrow construction restart proposal.

## 20. Handoff requirements

Future handoffs must preserve:

- cycle milestone and special action model exists;
- milestones are pedagogical actions, not merely administrative closures;
- milestones must not become default gates;
- LearningCycle closure and student milestone are distinct concepts;
- mini-ensayo remains later unless explicitly scoped;
- construction remains paused until a narrow implementation slice is selected;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
