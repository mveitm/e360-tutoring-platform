# MVP-SRA-SCOPE-1 - Complete PAES_M1 Tutoring Scope Charter

## 1. Purpose

Define the intended pedagogical scope of a complete PAES_M1 tutoring experience in Bexauri before resuming construction.

This charter describes what Bexauri is trying to become pedagogically for PAES_M1: a non-blocking, evidence-aware, roadmap-driven tutoring system that helps the student progress across relevant axes, skills, difficulty levels, feedback, self-report, milestones, and future expert/agent-supported decisions.

This phase follows `MVP-SRA-ROADMAP-2H`, which paused construction to prioritize scope definition.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `955b7d6`
- Last accepted commit = `MVP-SRA-ROADMAP-2H: document scope-first construction pause`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Strategic charter decision

Bexauri's PAES_M1 tutoring scope is not a fixed chain of StudyLoads.

It is a regulated learning trajectory composed of:

- student-facing activities;
- roadmap traversal;
- evidence capture;
- feedback;
- self-report;
- decision records;
- next learning actions;
- non-blocking human supervision;
- future agent-assisted routing;
- cycle milestones;
- expert-grounded PAES_M1 scope.

Core decision:

```text
Bexauri PAES_M1 = guided, evidence-aware roadmap traversal, not a static content sequence.
```

## 4. Product boundaries

### In scope for the target pedagogical model

- PAES_M1 official axes and skills.
- Official/expert-grounded roadmap structure.
- Node/family taxonomy.
- Evidence-aware next-load decisions.
- Student feedback and self-report.
- Prerequisite repair.
- Reinforcement with anti-monotony limits.
- Bridge/advance/validate/hold/redirect/spiral decisions.
- Coverage across Numbers, Algebra/functions, Geometry, Probability/statistics.
- Cycle milestones and later special actions.
- Asynchronous operator/supervisor review.
- Future tutor-agent proposal layer under governance.

### Out of scope for MVP-Beta claims

- PAES score prediction.
- Theta model.
- Mastery certification.
- Fully autonomous adaptive AI.
- Production-grade roadmap claims.
- External broad beta without expert review or explicit provisional guardrails.
- Treating AS1 algebra/functions as universal path.
- Treating N1/G1/PE1 as mandatory detours.

## 5. Student experience scope

The student should experience Bexauri as a continuous learning path, not as an administrative workflow.

### 5.1 Entry

The student enters through a clear `/now` surface that answers:

```text
What do I work on now?
Why is this useful?
What happens after I finish?
```

The first activity may be a balanced entry, a known-need activity, or another low-friction task depending on evidence.

The entry should not feel like a heavy diagnostic exam.

### 5.2 Activity

A normal activity should:

- be short enough for sustained use, especially mobile;
- have clear instructions;
- show questions and alternatives cleanly;
- capture answers;
- provide basic feedback safely;
- request self-report;
- finalize without confusing transitional states;
- return the student to a refreshed `/now` state.

### 5.3 After completion

After completion, the student should not wait for an operator as the normal path.

Bexauri should provide the next useful action through the best available safe rule-based or future agent-supported decision.

The student may see:

- a next activity;
- a short checkpoint;
- a confidence-restoration activity;
- a bridge challenge;
- a review-style activity;
- a later mini-ensayo or milestone action.

### 5.4 Progress feeling

The student should feel:

```text
I can do this.
I can also do this with something new.
I am not stuck repeating the same thing forever.
I am covering more of PAES_M1 over time.
```

## 6. Roadmap traversal scope

The PAES_M1 roadmap should be traversed dynamically, not linearly by default.

### 6.1 Master roadmap

The master roadmap includes:

- Numbers;
- Algebra and functions;
- Geometry;
- Probability and statistics;
- PAES skills: resolver problemas, modelar, representar, argumentar;
- node families;
- nodes;
- prerequisites;
- difficulty bands;
- bridge nodes;
- cycle milestones;
- expert validation status.

### 6.2 Active slice

An active slice is the current useful section of the roadmap for a student.

A slice may be:

- algebra/functions corridor;
- Numbers prerequisite support;
- Geometry measurement/visual reasoning;
- Data/probability entry;
- validation slice;
- confidence-restoration slice;
- checkpoint slice;
- later mini-ensayo slice.

### 6.3 Node traversal

The system should move through nodes based on evidence and purpose:

- advance when evidence supports the next node;
- reinforce when a specific weakness is present;
- redirect when prerequisite risk is high;
- bridge when a student is ready for controlled novelty;
- validate when strength needs confirmation;
- hold when evidence is mixed;
- spiral when coverage or monotony requires another axis;
- use milestones after meaningful segments.

### 6.4 Coverage

A complete PAES_M1 tutoring experience must eventually cover all official axes sufficiently.

Coverage does not mean equal time for every axis. It means intentional, evidence-aware progression across relevant PAES_M1 areas.

## 7. Decision layer scope

The decision layer chooses the next learning action.

It should use:

- current taxonomy node;
- current StudyLoad metadata;
- answer evidence;
- item pattern;
- self-report;
- prerequisite risk;
- monotony risk;
- coverage gap;
- confidence signal;
- novelty tolerance;
- fallback availability;
- async review need.

The decision layer should output:

- decision type;
- next action type;
- next taxonomy node or special action;
- rationale;
- fallback;
- guardrails.

Decision types:

- advance;
- reinforce;
- bridge;
- validate;
- hold;
- redirect;
- spiral;
- cycle_milestone;
- async_review_request.

## 8. Content and action scope

Bexauri should support multiple learning action types.

### 8.1 Micro StudyLoads

Short activities used for practice, evidence, reinforcement, or bridge.

Default target: small enough for mobile and continuity, often 4 items where appropriate.

### 8.2 Reinforcement loads

Used for targeted practice, but with limits.

They must not become endless repetition.

### 8.3 Bridge loads

Used to move from familiar material to controlled novelty.

Typical structure may include familiar items plus one new or more demanding item.

### 8.4 Validation loads

Used when student seems ready to accelerate but Bexauri needs a small confirmation signal.

### 8.5 Spiral loads

Used to preserve coverage and motivation by shifting axis or representation.

### 8.6 Confidence-restoration loads

Used when the student needs a low-friction success experience without abandoning progress.

### 8.7 Guided review

Future action type for structured error review.

### 8.8 Cycle milestones

Future action type for meaningful checkpoints, summaries, mini-ensayos, integrative challenges, or reflective closure.

## 9. Cycle milestone scope

Cycle milestones should make the tutoring experience feel purposeful.

They may include:

- mini-checkpoint;
- guided error review;
- short challenge;
- integrative activity;
- progress summary;
- mini-ensayo later;
- reflective closure;
- route recalibration.

Milestones are not only administrative cycle closures. They are pedagogical moments that can help motivation, synthesis, coverage, and future routing.

MVP-Beta may represent milestones manually or as ordinary StudyLoads first. Future versions should support special action types.

## 10. Human/operator scope

Operators and supervisors work in parallel and asynchronously.

They may:

- review evidence;
- improve content;
- identify risk;
- correct route issues;
- insert special loads or milestones;
- document decisions;
- prepare expert review;
- audit system behavior;
- improve roadmap quality.

They should not become the normal student-facing bottleneck.

Standing principle:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

If operators do not act, the student should still continue through the best safe available next action.

## 11. Future tutor-agent scope

A future PAES_M1 tutor agent may:

- read the roadmap;
- read StudyLoad metadata;
- read recent evidence;
- propose a decision record;
- select or generate a next action within constraints;
- explain rationale;
- request async human review;
- respect guardrails;
- avoid unsupported claims.

The future agent must not:

- invent the roadmap freely;
- claim PAES scores;
- claim mastery without validated basis;
- act without auditability;
- override expert/product guardrails;
- block student continuity by default.

## 12. MVP-Beta scope

MVP-Beta can be a controlled, guided, provisional version of the target model.

It may use:

- documented taxonomy;
- provisional metadata;
- manual or semi-manual decision records;
- small rule-based decisions later;
- AS1 corridor;
- N1/G1/PE1 proposals after implementation phases;
- async human review;
- modest student-facing claims.

MVP-Beta must not claim:

- full PAES_M1 coverage unless enough slices exist;
- production-grade roadmap;
- adaptive AI;
- mastery;
- PAES score;
- theta;
- fully automated tutoring intelligence.

## 13. Complete PAES_M1 tutoring experience target

A complete PAES_M1 tutoring experience should eventually support this rhythm:

1. Entry signal.
2. First useful activity.
3. Feedback and self-report.
4. Evidence-aware next decision.
5. Practice or reinforcement if useful.
6. Bridge to novelty.
7. Spiral to another axis when needed.
8. Prerequisite repair when needed.
9. Validation when ready.
10. Cycle milestone after meaningful progress.
11. Route recalibration.
12. Continued progression across axes and skills.

This rhythm should repeat while preserving student continuity and motivation.

## 14. Relationship to current assets

### AS1 algebra/functions corridor

Status:

- available;
- operationally validated;
- metadata constrained;
- not universal;
- expert review pending;
- not full PAES_M1 roadmap.

### N1/G1/PE1 non-algebra slices

Status:

- proposal-only;
- not implemented;
- intended to broaden scope;
- useful for prerequisite repair, coverage, confidence, and anti-monotony;
- expert review pending.

### Expert review packet

Status:

- assembled;
- expert review not yet completed;
- useful before external guided beta or production-grade claims.

## 15. Construction restart conditions

Construction should resume only after a narrower implementation slice is selected from this scope charter.

Restart conditions:

1. The implementation target is explicitly scoped.
2. It does not collapse the roadmap into AS1-only progression.
3. It preserves non-blocking continuity.
4. It preserves modest MVP-Beta claims.
5. It uses metadata/decision-record principles.
6. It clearly states whether expert review is completed or pending.
7. It does not touch production, deploy, DB, schema, or secrets unless explicitly authorized in a later phase.

## 16. Recommended next documentation phases

Recommended next phase:

`MVP-SRA-SCOPE-2 - Canonical PAES_M1 student journey and roadmap traversal`

Purpose:

- write the canonical journey from student entry through repeated activities, feedback, self-report, next decisions, spirals, prerequisites, milestones, and continued progression.

Alternative:

`MVP-SRA-SCOPE-2A - Cycle milestone and special action model`

Use if the team wants to define milestones before writing the full journey.

Recommended order:

1. Canonical student journey and roadmap traversal.
2. Cycle milestone and special action model.
3. Human/operator parallel role model.
4. Future tutor-agent governance model.
5. Narrow implementation restart proposal.

## 17. Handoff requirements

Future handoffs must preserve:

- construction remains paused until a narrower implementation slice is selected;
- this charter defines the intended PAES_M1 tutoring scope;
- AS1 is available but not universal;
- N1/G1/PE1 are proposals, not implemented routes;
- expert review packet exists but review has not yet occurred unless a later phase documents it;
- next recommended phase is canonical student journey / roadmap traversal;
- student continuity in the target product remains non-blocking;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
