# MVP-SRA-SCOPE-3 - Human / Operator Parallel Role Model

## 1. Purpose

Define the human/operator role model for Bexauri PAES_M1 tutoring while preserving the principle that student continuity is non-blocking.

This document clarifies what operators, supervisors, and future expert reviewers do in parallel to the student's learning journey: monitor evidence, review decision records, improve content, detect risk, insert milestones when useful, prepare expert review, and optimize the system without becoming a normal gate.

This phase follows `MVP-SRA-SCOPE-2A`, which defined cycle milestones and special actions.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `82ae9e7`
- Last accepted commit = `MVP-SRA-SCOPE-2A: define cycle milestone model`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Core principle

Bexauri is a human-machine learning system.

Humans are important, but they must not become the default bottleneck for normal student continuity.

Standing rule:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

The student should continue receiving safe next learning actions while operators improve the system asynchronously.

## 4. Human role categories

### 4.1 Learning operator

Operational person who monitors student progress and system behavior.

Responsibilities:

- review recent activity evidence;
- notice repeated errors or stagnation;
- check whether next actions look reasonable;
- identify when a student may need milestone, redirect, or support;
- document observations;
- escalate to supervisor or expert when needed.

### 4.2 Pedagogical supervisor

Person responsible for pedagogical quality and route coherence.

Responsibilities:

- review decision patterns;
- approve or revise roadmap assumptions;
- improve StudyLoad design;
- decide when a special action or milestone is useful;
- interpret ambiguous evidence;
- protect student wellbeing and learning quality.

### 4.3 Content curator

Person responsible for content quality and metadata alignment.

Responsibilities:

- prepare StudyLoads;
- align items to taxonomy nodes;
- verify correct answers and distractors;
- document evidence purpose;
- update metadata proposals;
- flag weak or misleading content.

### 4.4 PAES_M1 expert reviewer

External or internal expert in PAES_M1 pedagogy and assessment.

Responsibilities:

- validate roadmap foundation;
- review taxonomy and sequence;
- judge item representativeness;
- assess anti-monotony and reinforcement policy;
- advise on external beta readiness.

### 4.5 Product/technical owner

Person responsible for scope, safety, implementation decisions, and product coherence.

Responsibilities:

- decide what gets implemented;
- protect guardrails;
- avoid overclaiming;
- choose narrow implementation slices;
- ensure documentation and code stay aligned;
- prevent premature automation.

## 5. What operators do in parallel

Operators may act on these workstreams while the student continues studying.

### 5.1 Evidence monitoring

Review:

- completed activities;
- answer patterns;
- correct/incorrect trends;
- self-reports;
- repeated errors;
- confidence/frustration signals;
- coverage imbalance.

Outcome:

- notes;
- async review request;
- content improvement request;
- milestone suggestion;
- route adjustment suggestion.

### 5.2 Decision record review

Review whether the next-load decision makes sense:

- current node;
- evidence strength;
- prerequisite risk;
- monotony risk;
- coverage gap;
- rationale;
- fallback.

Outcome:

- accept decision pattern;
- suggest different route;
- flag ambiguity;
- request expert review;
- improve decision rules later.

### 5.3 Risk detection

Watch for:

- repeated weak evidence;
- negative self-report;
- high monotony risk;
- no recent activity;
- possible frustration;
- content mismatch;
- unsupported advancement;
- excessive reinforcement.

Outcome:

- suggest confidence restoration;
- suggest prerequisite redirect;
- suggest milestone;
- request human follow-up if wellbeing concern exists.

### 5.4 Content improvement

Improve:

- unclear item wording;
- weak distractors;
- wrong or ambiguous answer keys;
- poor math rendering;
- too many items for mobile context;
- missing metadata;
- missing source alignment;
- weak feedback.

Outcome:

- future content change proposal;
- expert review note;
- metadata update;
- registry implementation proposal later.

### 5.5 Milestone insertion

Suggest or add, in future implementation phases:

- progress summary;
- guided error review;
- mini-checkpoint;
- integrative challenge;
- reflective closure;
- route recalibration.

Milestones should help the student, not block continuation.

### 5.6 Expert review preparation

Prepare packets for PAES_M1 expert review:

- source register;
- official inventory;
- taxonomy;
- AS1 constraints;
- non-algebra slices;
- decision records;
- StudyLoad metadata;
- sample evidence.

Outcome:

- expert review packet;
- corrections backlog;
- readiness classification.

## 6. What operators do not do by default

Operators should not normally:

- approve every next activity before student sees it;
- manually create every next step;
- become required for routine progression;
- use direct database edits as normal workflow;
- override roadmap without documentation;
- make PAES score claims;
- label mastery without validated basis;
- convert internal LearningCycle status into student-facing complexity;
- stall the student because review is pending.

## 7. Intervention levels

### Level 0 — No intervention

Student continues through safe default decision logic.

Use when:

- evidence is clear;
- next action is low risk;
- no risk signal appears.

### Level 1 — Async observation

Operator records an observation but does not change current student path.

Use when:

- evidence is interesting but not urgent;
- content may need later improvement;
- route is acceptable but worth watching.

### Level 2 — Async route suggestion

Operator suggests a future route change or milestone.

Use when:

- repeated pattern is emerging;
- non-blocking adjustment could improve learning;
- next implementation supports route adjustment.

### Level 3 — Human-guided adjustment

Operator or supervisor adjusts a future action, special milestone, or content path.

Use when:

- evidence is ambiguous;
- student may be stuck;
- content mismatch is clear;
- expert recommendation exists.

### Level 4 — Exceptional pause

Rare state where normal continuity may be paused.

Allowed only if separately versioned and justified.

Examples might include:

- safety/wellbeing concern;
- severe content error that could harm learning;
- account or data integrity issue;
- explicit product policy requiring pause.

Level 4 is not normal pedagogy.

## 8. Operator workflow around student journey

### 8.1 Student completes activity

System captures:

- answers;
- feedback status;
- self-report;
- completion.

Student continues.

Operator may later review evidence asynchronously.

### 8.2 System selects or prepares next action

System should use safe decision/fallback path.

Operator may inspect whether the decision pattern is sensible.

### 8.3 Operator reviews evidence packet

Operator asks:

- Is evidence strong/mixed/weak?
- Is there prerequisite risk?
- Is monotony risk rising?
- Is coverage too narrow?
- Is a milestone useful?
- Does content need correction?

### 8.4 Operator records observation

Observation should be concise and actionable.

Example:

```text
Student shows repeated fraction-coefficient errors in equation items. Future route should consider N_RAT prerequisite support before further equation reinforcement.
```

### 8.5 Operator proposes improvement

Improvement may be:

- content edit;
- metadata correction;
- future milestone;
- expert review request;
- route guardrail update;
- implementation backlog item.

## 9. Operator relationship to decision records

Decision records are the best anchor for operator review.

Operators should review:

- decision type;
- rationale;
- fallback;
- evidence basis;
- risk interpretation;
- coverage interpretation;
- whether async review was requested.

Operators should avoid undocumented route changes.

Future system design should make operator review additive and auditable.

## 10. Operator relationship to milestones

Operators may suggest milestones when:

- a segment is completed;
- evidence is mixed;
- reinforcement loop risk appears;
- confidence needs support;
- route recalibration is useful;
- expert review needs a coherent evidence packet.

Milestone suggestion should include:

- milestone type;
- trigger;
- purpose;
- evidence expected;
- student-facing framing;
- next action/fallback.

## 11. Operator relationship to expert review

Operators prepare and summarize. Experts validate or advise.

Operators should not pretend to be expert authority unless qualified.

Expert review remains important for:

- roadmap soundness;
- item representativeness;
- prerequisite sequence;
- beta readiness;
- anti-monotony policy;
- non-algebra slice priorities.

While expert review is pending, internal work may remain provisional and modest.

## 12. Operator relationship to future tutor agent

The future tutor agent should not replace governance.

Operators/supervisors may:

- review agent decision proposals;
- audit rationale quality;
- inspect failure modes;
- update guardrails;
- escalate to expert review;
- monitor student impact.

The agent should provide auditable decision records, not hidden reasoning.

## 13. Student-facing visibility

Most operator work should remain invisible or lightly visible to the student.

Visible to student:

- activity is ready;
- answers saved;
- progress registered;
- next step prepared;
- occasional clear milestone summary.

Not normally visible:

- internal LearningCycle mechanics;
- operator queue;
- unresolved review state;
- admin notes;
- expert review backlog;
- internal uncertainty unless pedagogically useful.

The student should not feel abandoned or blocked because humans are reviewing in the background.

## 14. Quality guardrails for operators

Operators must preserve:

- student wellbeing;
- pedagogical quality;
- non-blocking continuity;
- no overclaiming;
- official/source alignment;
- auditability;
- minimal scope discipline;
- no secret printing;
- no unsafe direct production operations.

Operators must avoid:

- ad hoc undocumented decisions;
- repeated manual patching that hides product gaps;
- turning human review into default gate;
- expanding beyond PAES_M1 scope without decision;
- making claims not supported by evidence.

## 15. MVP-Beta operator model

In MVP-Beta, operator work may be manual but should be disciplined.

Acceptable:

- manual evidence review;
- manual notes;
- manual expert packet preparation;
- manual content correction proposals;
- manual milestone proposal;
- manual decision record drafting.

Not acceptable as normal state:

- manual creation of every next load;
- human approval for every student continuation;
- hidden intervention without documentation;
- production manipulation without phase authorization.

## 16. Construction pause reminder

This document does not authorize implementation.

Construction remains paused until a narrow implementation slice is selected from the scope documents.

Potential later implementation targets may include:

- operator review checklist UI;
- decision record notes;
- milestone insertion workflow;
- content metadata registry;
- tutor-agent review surface.

None are authorized here.

## 17. Recommended next documentation phase

Recommended next phase:

`MVP-SRA-SCOPE-4 - Future tutor-agent governance model`

Purpose:

- define what a future PAES_M1 tutor agent may and may not do;
- define required inputs, outputs, decision records, guardrails, review paths, and failure modes;
- ensure agent behavior remains inside taxonomy, metadata, expert review, and non-blocking continuity principles.

Alternative:

`MVP-SRA-SCOPE-5 - Narrow construction restart proposal`

Use only if enough scope is accepted to choose the first implementation slice.

## 18. Handoff requirements

Future handoffs must preserve:

- human/operator role model exists;
- operator work is parallel and asynchronous by default;
- operators improve quality but do not normally gate continuity;
- Level 4 pause is exceptional and requires separate policy;
- decision records and milestones are anchors for operator review;
- future tutor agent must be governed and auditable;
- construction remains paused until a narrow implementation slice is selected;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
