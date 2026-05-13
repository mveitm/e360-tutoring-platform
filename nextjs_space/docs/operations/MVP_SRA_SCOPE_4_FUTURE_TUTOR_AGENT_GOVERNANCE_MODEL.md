# MVP-SRA-SCOPE-4 - Future Tutor-Agent Governance Model

## 1. Purpose

Define the governance model for a future PAES_M1 tutor agent inside Bexauri.

This document clarifies what a future agent may do, what it must not do, what inputs and outputs it requires, how it should produce auditable decision records, how human/operator review interacts with it, and what guardrails prevent premature adaptive-AI claims.

This phase follows `MVP-SRA-SCOPE-3`, which defined the human/operator parallel role model.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `061dbe6`
- Last accepted commit = `MVP-SRA-SCOPE-3: define human operator role model`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Core governance principle

A future tutor agent may assist Bexauri's pedagogical decision layer, but it must not freely invent the tutoring roadmap or operate as an ungoverned adaptive system.

Core principle:

```text
Tutor agent = governed decision-support actor inside the SRA, not autonomous pedagogical authority.
```

The agent should help select or propose the next useful learning action using official taxonomy, StudyLoad metadata, evidence, self-report, decision records, expert guardrails, and fallback paths.

## 4. Current status

Tutor-agent execution is not implemented.

MVP-Beta must not claim:

- adaptive AI;
- autonomous tutoring intelligence;
- PAES score prediction;
- theta estimation;
- mastery certification;
- official diagnostic placement.

Any future tutor-agent work must be explicitly scoped in a later implementation phase.

## 5. Inputs the future agent may use

A future tutor agent may use only governed inputs.

### 5.1 Roadmap inputs

- PAES_M1 official taxonomy.
- Node families and node ids.
- Active slice definitions.
- Prerequisite relationships.
- Difficulty bands.
- Bridge nodes.
- Coverage goals.
- Expert validation status.

### 5.2 Content inputs

- StudyLoad metadata.
- ContentKey and version.
- Taxonomy node mappings.
- PAES skill tags.
- Evidence purpose.
- Expected error patterns.
- Source refs.
- Expert validation status.
- Student-facing claim limits.

### 5.3 Evidence inputs

- recent answers;
- answered count;
- correct count where safe;
- item-level pattern;
- notable errors;
- completion status;
- recent sequence of StudyLoads;
- self-report;
- confidence/frustration signal;
- coverage history;
- monotony risk indicators.

### 5.4 Human/operator inputs

- async operator notes;
- expert review feedback;
- content quality warnings;
- guardrail updates;
- exceptional pause policies if any exist;
- milestone recommendations.

### 5.5 System-state inputs

- available next actions;
- unavailable content fallback;
- active program;
- active enrollment context;
- current LearningCycle context if needed internally;
- current student-facing state.

## 6. Inputs the future agent must not use

The agent must not use:

- unverified PAES sources as authoritative;
- hidden assumptions about student ability;
- private chain-of-thought as audit artifact;
- unsupported scoring models;
- external claims not reflected in source register;
- production data beyond authorized scope;
- secrets, `.env`, tokens, or credentials;
- undocumented roadmap nodes;
- arbitrary generated content without metadata and review path.

## 7. Expected outputs

A future tutor agent should output structured, auditable artifacts.

### 7.1 Next-load decision proposal

The main output should be a decision proposal compatible with the decision record format.

It should include:

- decision type;
- next action type;
- target taxonomy node;
- proposed StudyLoad or special action;
- evidence summary;
- rationale;
- prerequisite risk;
- monotony risk;
- coverage consideration;
- fallback;
- async review request if needed;
- guardrails applied.

### 7.2 Rationale summary

The agent should provide a concise rationale that can be shown to operators and, if appropriate, simplified for students.

The rationale must be auditable without exposing hidden reasoning.

### 7.3 Fallback path

Every agent proposal must include a fallback.

Fallback may be:

- safe prerequisite load;
- low-friction hold load;
- confidence-restoration load;
- non-algebra spiral;
- progress summary;
- async review plus safe continuation.

### 7.4 Review flag

The agent should flag when human/operator review would improve quality.

Review flag must not normally block student continuity.

### 7.5 Guardrail confirmation

The agent should confirm:

- no PAES score claim;
- no mastery claim;
- no theta claim;
- no unsupported adaptive AI claim;
- student continuity preserved;
- source/taxonomy constraints respected.

## 8. Permitted future agent actions

A future tutor agent may eventually:

- propose next StudyLoad;
- select among available StudyLoads;
- recommend a milestone;
- recommend prerequisite redirect;
- recommend non-algebra spiral;
- draft a decision record;
- summarize recent evidence;
- detect monotony risk;
- detect prerequisite risk;
- request async human review;
- propose content metadata improvements;
- propose item-level error categories;
- help prepare expert review packets.

## 9. Prohibited future agent actions

The agent must not:

- claim official PAES score;
- claim mastery or level without validated basis;
- assign theta or psychometric estimate;
- invent official PAES content;
- ignore taxonomy/metadata;
- bypass expert/product guardrails;
- hide rationale from operators;
- block student continuity by default;
- create endless reinforcement loops;
- make safety/wellbeing decisions alone;
- mutate production data without explicit authorized implementation;
- deploy, run SQL, use Prisma CLI, read secrets, or access `.env`.

## 10. Agent decision boundaries

### 10.1 Low-risk decisions

The agent may eventually be allowed to propose or select low-risk next actions such as:

- practice continuation;
- short bridge;
- low-friction prerequisite support;
- non-algebra spiral;
- progress summary.

### 10.2 Medium-risk decisions

These should require stronger guardrails or operator visibility:

- redirecting to a different active slice;
- repeated reinforcement strategy;
- milestone after mixed evidence;
- content generated on demand;
- changing route after negative self-report.

### 10.3 High-risk decisions

These should require human/operator or expert review policy:

- exceptional pause;
- wellbeing concern;
- major route overhaul;
- external beta readiness claims;
- production-grade roadmap changes;
- PAES-like mini-ensayo interpretation;
- any score-related interpretation.

## 11. Relationship to operators

Operators supervise and improve the agent system asynchronously.

Operators may:

- review decision proposals;
- audit rationale;
- correct route patterns;
- flag content gaps;
- approve guardrail changes;
- escalate to expert review;
- detect failure modes.

Operators should not be required to approve every normal low-risk agent proposal unless a later phase explicitly chooses that mode for early testing.

## 12. Relationship to expert review

Expert review remains upstream of production-grade roadmap claims.

The agent must respect expert-reviewed taxonomy and metadata status.

If a node or StudyLoad is not expert-reviewed, the agent should treat it as provisional and avoid overclaiming.

Expert review may refine:

- taxonomy;
- prerequisite relations;
- difficulty bands;
- error categories;
- decision thresholds;
- anti-monotony rules;
- content metadata;
- milestone triggers.

## 13. Relationship to milestones

The agent may eventually propose milestones when:

- segment completion occurs;
- repeated mixed evidence appears;
- reinforcement limit is reached;
- coverage imbalance is detected;
- student confidence signal needs attention;
- broader checkpoint is useful.

The agent must distinguish:

```text
Internal LearningCycle closure != student-facing milestone.
```

Milestones should support learning and continuity, not become default gates.

## 14. Relationship to content generation

Future agent-generated or agent-assisted content must be governed.

Before using generated content, Bexauri should require:

- taxonomy node;
- source refs;
- evidence purpose;
- correct answer validation;
- distractor rationale;
- difficulty band;
- student-facing claim limits;
- fallback;
- review status.

In early MVP-Beta, prefer selecting from curated content over free generation.

## 15. Failure modes to monitor

Future tutor-agent work must monitor for:

- algebra corridor overuse;
- endless reinforcement;
- weak prerequisite diagnosis;
- overconfident advancement;
- undercoverage of Geometry/PE/Numbers;
- misleading student-facing rationale;
- unsupported score/mastery language;
- hallucinated official content;
- inconsistent content metadata;
- hidden operator dependency;
- repeated fallback loops;
- poor mobile activity fit.

## 16. Auditability requirements

Every agent-influenced decision should eventually be auditable.

Minimum audit surface:

- input evidence summary;
- decision type;
- selected action;
- taxonomy node;
- rationale;
- fallback;
- guardrails applied;
- review flag;
- timestamp/context later when implemented.

The audit artifact should not rely on hidden chain-of-thought.

## 17. Student-facing agent framing

Student-facing language should be modest.

Allowed:

- `Bexauri preparó tu siguiente actividad según tu avance reciente.`
- `Esta actividad ayuda a fortalecer una base importante.`
- `Ahora probaremos una forma distinta de trabajar el tema.`
- `Tu resultado ayuda a definir el siguiente paso.`

Disallowed in MVP-Beta:

- `La IA determinó tu nivel PAES.`
- `Dominaste esta habilidad.`
- `Tu puntaje estimado es...`
- `El sistema adaptativo sabe exactamente lo que necesitas.`
- `No puedes continuar hasta que un tutor revise.`

## 18. MVP-Beta agent stance

MVP-Beta may prepare for agent behavior but should not claim it.

Acceptable MVP-Beta language:

- rule-based;
- evidence-informed;
- guided;
- provisional;
- supervised;
- roadmap-based.

Avoid:

- adaptive AI;
- autonomous AI tutor;
- personalized mastery engine;
- PAES score prediction;
- diagnostic intelligence.

## 19. Implementation readiness gates

Future agent implementation should not begin until:

1. taxonomy and metadata are sufficiently stable;
2. decision record format is accepted;
3. at least one narrow use case is selected;
4. guardrails are explicit;
5. operator review path is clear;
6. fallback behavior is defined;
7. student-facing claims are controlled;
8. expert review is completed or status is explicitly provisional.

## 20. Candidate first agent use cases later

Possible future first use cases:

### Use case A — decision proposal only

Agent drafts next-load decision record; human/operator reviews asynchronously.

### Use case B — low-risk selector

Agent selects from curated StudyLoads within an active slice.

### Use case C — monotony detector

Agent flags repeated similar loads and proposes spiral/fallback.

### Use case D — evidence summary

Agent summarizes recent evidence for operator review.

### Use case E — milestone proposal

Agent proposes progress summary, guided review, or mini-checkpoint.

Recommended first use case when construction resumes:

```text
Decision proposal only, internal and auditable.
```

## 21. Construction pause reminder

This document does not authorize implementation.

Construction remains paused until a narrow implementation slice is selected from the scope documents.

No runtime tutor agent, selector, metadata registry, or production behavior is authorized by this phase.

## 22. Recommended next documentation phase

Recommended next phase:

`MVP-SRA-SCOPE-5 - Narrow construction restart proposal`

Purpose:

- identify the safest first implementation slice after scope work;
- compare possible options;
- choose one narrow, reversible, low-risk phase;
- preserve the scope-first decisions and avoid collapsing the roadmap into AS1-only behavior.

Alternative:

`MVP-SRA-SCOPE-4A - Tutor-agent failure mode checklist`

Use if the team wants more risk analysis before selecting a restart slice.

## 23. Handoff requirements

Future handoffs must preserve:

- future tutor-agent governance model exists;
- tutor agent is not implemented;
- future agent is governed decision-support, not autonomous pedagogical authority;
- agent must use taxonomy, metadata, evidence, decision records, fallback, and guardrails;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta;
- construction remains paused until a narrow implementation slice is selected;
- recommended next phase is a narrow construction restart proposal or additional risk checklist.
