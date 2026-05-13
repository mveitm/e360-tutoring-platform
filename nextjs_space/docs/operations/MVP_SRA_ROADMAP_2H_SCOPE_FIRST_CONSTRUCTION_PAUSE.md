# MVP-SRA-ROADMAP-2H - Scope-First Construction Pause

## 1. Purpose

Document the strategic decision to pause internal construction and prioritize scope definition for the PAES_M1 pedagogical layer.

This phase responds to the product decision that Bexauri should not continue building selector logic, registry metadata, new StudyLoads, or internal implementation paths until the intended scope of the complete PAES_M1 tutoring pedagogy is clearer.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `e81eaf7`
- Last accepted commit = `MVP-SRA-ROADMAP-2G: assemble PAES M1 expert review packet`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Strategic decision

Bexauri will prioritize scope over internal advancement.

The project should pause construction of the next-load selector, registry metadata implementation, new StudyLoad implementation, tutor-agent logic, and runtime decision automation.

The priority now is to define the intended pedagogical scope of a complete PAES_M1 tutoring experience.

Decision:

```text
Pause construction. Continue documentation. Define scope before implementation.
```

## 4. Why this pause is necessary

The roadmap work has produced a strong foundation:

- official source register;
- official PAES_M1 / OA inventory;
- node taxonomy;
- internal roadmap mapping;
- next-load decision record;
- expert review checklist;
- StudyLoad metadata proposal;
- AS1 corridor constraints;
- first non-algebra slices;
- expert review packet.

However, implementing from this foundation too soon could prematurely lock Bexauri into:

- a partial algebra/functions-first interpretation;
- a shallow version of the decision layer;
- premature metadata/runtime structures;
- selector behavior before the full tutoring scope is understood;
- content additions without a complete pedagogical architecture.

Bexauri's core product is not only a chain of StudyLoads. It is a system that regulates a student's learning over a complete tutoring trajectory.

## 5. What is paused

The following are paused until scope is clarified:

- new selector logic;
- rule-based next-load implementation;
- registry metadata implementation;
- new StudyLoad registry additions;
- content-key sequence expansion;
- tutor-agent execution logic;
- runtime decision automation;
- schema for decision records;
- admin surfaces for decision review;
- student-facing claims about adaptive intelligence;
- external beta expansion based on the current corridor alone.

## 6. What continues

The following continues:

- documentation;
- scope definition;
- pedagogical architecture;
- source alignment;
- expert review preparation;
- definition of complete PAES_M1 tutoring flow;
- definition of roadmap traversal logic;
- definition of cycle milestones and special actions;
- definition of non-blocking human/operator roles;
- handoff preservation.

## 7. Scope question to answer next

The next documentation block must answer:

```text
What is the intended pedagogical scope of a complete PAES_M1 tutoring experience in Bexauri?
```

This includes:

- how the student enters the tutoring journey;
- how Bexauri chooses initial work;
- how the system traverses the master roadmap;
- how it balances axes and skills;
- how it handles weak evidence;
- how it introduces novelty;
- how it avoids monotony;
- how it uses cycle milestones;
- how it uses mini-checkpoints or mini-ensayos later;
- how human operators improve the route asynchronously;
- how a future tutor agent could operate inside governance;
- how Bexauri moves the student from partial skill practice toward broad PAES_M1 readiness without overclaiming.

## 8. Required scope layers

The complete PAES_M1 pedagogical scope should be described across these layers.

### 8.1 Student experience layer

Define what the student experiences from entry to ongoing tutoring:

- onboarding;
- first activity;
- activity completion;
- feedback;
- self-report;
- next activity;
- visible progress;
- confidence restoration;
- challenge/novelty;
- cycle milestone;
- broader PAES_M1 coverage.

### 8.2 Pedagogical roadmap layer

Define how the master roadmap is structured and traversed:

- axes;
- node families;
- nodes;
- prerequisites;
- difficulty bands;
- bridges;
- spirals;
- active slices;
- cycle milestones;
- expert review status.

### 8.3 Decision layer

Define how Bexauri decides next learning action:

- current node;
- evidence;
- self-report;
- prerequisite risk;
- monotony risk;
- coverage gap;
- novelty tolerance;
- confidence signal;
- fallback;
- async review request.

### 8.4 Content layer

Define how StudyLoads and special actions support the roadmap:

- micro StudyLoads;
- reinforcement;
- bridge loads;
- validation loads;
- spiral loads;
- confidence-restoration loads;
- guided reviews;
- checkpoints;
- mini-ensayos later.

### 8.5 Human/operator layer

Define what operators do in parallel:

- monitor evidence;
- improve route quality;
- add special loads or milestones when useful;
- review risk cases;
- update content;
- prepare expert feedback;
- optimize the system without becoming a normal bottleneck.

### 8.6 Future agent layer

Define what a future PAES_M1 tutor agent may do:

- read roadmap and evidence;
- propose next action;
- generate or select StudyLoads within constraints;
- explain rationale;
- request async review;
- preserve guardrails;
- avoid unsupported claims.

## 9. Non-blocking operator principle remains central

This pause does not mean student continuity should later depend on manual operators.

The principle remains:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

The construction pause applies to product development work, not to the future student experience design.

In the target product, the student should keep receiving useful next actions even when operators are reviewing or optimizing asynchronously.

## 10. Status of current AS1 corridor

The current AS1 algebra/functions corridor remains:

- operationally validated;
- useful;
- metadata-constrained;
- not universal;
- not a complete PAES_M1 roadmap;
- not enough for broad tutoring scope.

It must be treated as one available corridor inside a broader roadmap, not as the default sequence for all students.

## 11. Status of N1/G1/PE1 slices

The N1/G1/PE1 slices remain:

- proposal-only;
- non-algebra complements;
- useful for coverage, prerequisite repair, confidence, and anti-monotony;
- not implemented;
- not mandatory detours;
- expert review pending.

They help show what broader scope requires, but they should not yet trigger implementation work.

## 12. Documentation priority for the next hour

If time is limited, prioritize documents that clarify scope over documents that prepare implementation.

Recommended order:

1. Complete PAES_M1 tutoring scope charter.
2. Full student journey and pedagogical-roadmap traversal description.
3. Cycle milestone and special-action model.
4. Human/operator parallel role model.
5. Future tutor-agent governance model.
6. Only later: implementation-readiness or selector prototype planning.

## 13. Recommended next phase

Recommended next phase:

`MVP-SRA-SCOPE-1 - Complete PAES_M1 tutoring scope charter`

Purpose:

- define the complete intended pedagogical scope of PAES_M1 tutoring in Bexauri;
- describe the student journey, roadmap traversal, decision layer, content layer, cycle milestones, human/operator layer, and future agent layer;
- keep construction paused until scope is sufficiently explicit.

Alternative:

`MVP-SRA-SCOPE-1A - Canonical PAES_M1 student journey and roadmap traversal`

Use this if the team wants to focus first on the student experience and roadmap traversal rather than the full charter.

## 14. Construction restart gate

Construction should resume only after one of these is true:

1. The complete PAES_M1 tutoring scope charter is accepted.
2. A narrower implementation slice is explicitly selected from that charter.
3. Guardrails confirm the implementation does not collapse the scope into the current AS1 corridor.
4. Expert review has occurred, or the work is explicitly labeled internal-provisional with known limits.

No future implementation phase should claim that 2H authorized construction.

## 15. Handoff requirements

Future handoffs must preserve:

- construction is paused in favor of scope definition;
- AS1 is available but not universal;
- N1/G1/PE1 are proposals, not implemented routes;
- expert review packet exists but review has not yet occurred unless a later phase documents it;
- the next recommended phase is a scope charter, not selector implementation;
- student continuity in the target product remains non-blocking;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
