# MVP-SRA-ROADMAP-2 - PAES M1 Expert Roadmap Source and Validation Plan

## 1. Purpose

Define how Bexauri will ground the PAES_M1 master roadmap and next-load decision layer in official sources and expert pedagogical validation.

This phase prevents Bexauri from building a roadmap that is internally logical but pedagogically weak, incomplete, or misaligned with PAES_M1 preparation.

This phase is documentation / direction only.

No code, schema, runtime behavior, content registry update, deploy, production operation, SQL, Prisma CLI, `.env`, secrets, or data mutation are part of this phase.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `3f385aa`
- Last accepted commit = `MVP-SRA-ROADMAP-1B: propagate pedagogical layer in handoff`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Problem statement

Bexauri is moving from operational continuity into a pedagogical decision layer.

The system can already move a student through a local PAES_M1 StudyLoad sequence. The next challenge is deciding what the student should study next across a complete M1 tutoring path.

That decision must not be based only on internal product logic. It must be grounded in:

- official PAES_M1 structure;
- expert pedagogical sequencing;
- prerequisite relationships;
- difficulty progression;
- item representativeness;
- student evidence;
- anti-monotony and motivation;
- long-term coverage of axes and skills.

## 4. Source hierarchy

### Tier 0 - Official / authoritative sources

These are mandatory before treating the roadmap as authoritative:

- DEMRE / Universidad de Chile official PAES_M1 documents;
- Sistema de Acceso / MINEDUC official admissions and PAES references;
- official PAES_M1 temario for the relevant admission cycle;
- official PAES_M1 model tests, released tests, or practice materials;
- official scoring / structure notes when available.

Tier 0 sources define what Bexauri must align with.

### Tier 1 - Expert pedagogical review

These sources validate how to teach and sequence the official material:

- PAES_M1 specialist teacher;
- preuniversitario mathematics expert;
- experienced school mathematics teacher familiar with PAES M1;
- internal Bexauri expert review if a qualified reviewer is available.

Tier 1 review must judge whether the roadmap is pedagogically effective, not only formally complete.

### Tier 2 - Internal Bexauri evidence

These sources refine the roadmap over time:

- student answer patterns;
- repeated errors;
- self-report;
- completion history;
- evidence from mini-checkpoints;
- supervisor observations;
- future engagement and persistence signals.

Tier 2 evidence can improve the roadmap but must not replace official and expert validation.

### Tier 3 - AI-assisted analysis

AI may support:

- classification;
- first drafts;
- item tagging;
- identifying possible prerequisite chains;
- detecting gaps;
- proposing next-load rules;
- comparing item types.

AI output is advisory. It must be reviewed against Tier 0 and Tier 1 before becoming canonical.

## 5. Official source capture requirement

Before implementing a smarter next-load selector, Bexauri must capture the relevant official sources into a versioned source register.

The register should include, for each source:

- source title;
- issuing institution;
- admission cycle or publication date;
- source type;
- URL or repository location;
- local archived filename if imported;
- exact relevance to M1 roadmap;
- status: pending review / reviewed / accepted / superseded;
- notes on uncertainty or changes.

Recommended future document:

```text
nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md
```

Do not rely only on ad hoc web search snippets. If an official PDF/source is unavailable in a session, document the gap instead of assuming the content.

## 6. Roadmap validation dimensions

The PAES_M1 master roadmap must be validated across these dimensions:

### Completeness

Does the roadmap cover the relevant M1 axes, skills, and content expected by official sources?

### Prerequisites

Does the roadmap order concepts in a way that makes pedagogical sense for students?

### Difficulty progression

Are levels D0-D4 or equivalent bands aligned with actual student challenge and PAES item complexity?

### Item representativeness

Do the StudyLoads and items represent PAES_M1 reasoning, modeling, representation, and problem-solving demands rather than only routine drills?

### Transfer

Does the roadmap move students from direct procedures into contextual, representational, and transfer tasks?

### Coverage balance

Does the roadmap avoid overfitting to one early algebra/functions path while neglecting other relevant axes and skills?

### Evidence usefulness

Does each activity produce evidence that can inform the next pedagogical decision?

### Motivation and anti-monotony

Does the sequence avoid endless repetition and include variation, confidence-building, bridging, checkpoints, or cycle milestones?

### Non-blocking continuity

Does the roadmap allow the student to keep progressing even when human/operator review is pending?

## 7. Expert review protocol

Expert review should be asynchronous and non-blocking by default.

The expert should review:

1. master roadmap structure;
2. active slice definitions;
3. node prerequisites;
4. difficulty bands;
5. item types and distractors;
6. common errors;
7. reinforcement policy;
8. bridge/advance policy;
9. coverage policy;
10. checkpoint and mini-ensayo policy.

The expert should answer:

- Is this sequence pedagogically sound for PAES_M1?
- Where is the roadmap too easy, too hard, too narrow, or too broad?
- What should be taught before each node?
- What evidence is sufficient to advance?
- When is reinforcement helpful and when is it demotivating?
- When should the system switch axis or use a checkpoint?

Expert feedback should improve the roadmap, but normal student continuity should not depend on manual approval after every activity.

## 8. Minimum roadmap object before implementation

Before coding a smarter next-load selector, Bexauri should define a versioned roadmap object or document format with:

- roadmap id;
- program code;
- axis;
- skill;
- subskill;
- node id;
- difficulty band;
- prerequisite nodes;
- recommended prior evidence;
- item types;
- evidence signals;
- if-strong next action;
- if-weak next action;
- if-mixed next action;
- anti-monotony fallback;
- coverage notes;
- checkpoint relationship;
- expert validation status.

This may begin as a Markdown table or JSON proposal before becoming schema/runtime.

## 9. Minimum decision record before implementation

Every next-load decision should eventually be explainable with a small record:

- student / enrollment reference;
- current StudyLoad/contentKey;
- evidence summary;
- self-report;
- roadmap node;
- decision type;
- selected next action;
- rationale;
- uncertainty;
- whether async review was requested;
- non-blocking fallback path.

MVP-Beta can keep this as a conceptual/documented record first.

## 10. Risk controls

### Risk: plausible but weak roadmap

Control: require Tier 0 official source register and Tier 1 expert validation.

### Risk: infinite reinforcement

Control: anti-monotony limits and fallback strategy after repeated similar reinforcement.

### Risk: operator bottleneck

Control: non-blocking operator principle; async review requests do not normally pause student continuity.

### Risk: premature adaptive AI claims

Control: keep MVP-Beta rule-based/manual and avoid theta, mastery, PAES score, or autonomous AI claims.

### Risk: overfitting to algebra/functions

Control: roadmap coverage policy and planned expansion across all relevant axes/skills.

### Risk: item-size debate before pedagogy

Control: decide load size only after load purpose and roadmap role are clear.

## 11. MVP-Beta source plan

For MVP-Beta, Bexauri should not wait for a perfect production-grade roadmap.

Minimum acceptable path:

1. Create a PAES_M1 source register.
2. Confirm official axes, skills, content scope, format, and item expectations from Tier 0 sources.
3. Map existing internal roadmap docs against those sources.
4. Identify gaps and uncertain areas.
5. Get at least one expert review pass on the roadmap skeleton and first active slices.
6. Mark the roadmap as `MVP-Beta provisional`, not production-grade.
7. Use rule-based next-load selection with transparent rationale and non-blocking fallback.

## 12. Not included in this phase

This phase does not:

- import official PDFs;
- create the source register file;
- rewrite the PAES_M1 roadmap;
- implement content metadata;
- implement an intelligent selector;
- implement tutor agents;
- change StudyLoad size;
- split 8-item activities;
- deploy anything.

## 13. Recommended next phases

Recommended next phase:

```text
MVP-SRA-ROADMAP-2A - Create PAES M1 source register
```

Purpose:

- list official DEMRE/Sistema de Acceso sources;
- mark which are captured, pending, or missing;
- avoid relying on memory or secondary summaries.

Then:

```text
MVP-SRA-ROADMAP-2B - Map current PAES_M1 roadmap docs to source register
```

Then:

```text
MVP-SRA-ROADMAP-2C - Define MVP-Beta next-load decision record format
```

Then:

```text
MVP-SRA-ROADMAP-2D - First expert review checklist for PAES_M1 roadmap
```

Recommended order:

1. source register;
2. roadmap-to-source mapping;
3. expert review checklist;
4. decision record format;
5. content metadata proposal;
6. rule-based selector prototype.

## 14. Handoff requirements

Every future handoff must preserve:

- pedagogical roadmap / next-load decision layer is now the critical context;
- official/expert source validation is required before smarter selection;
- operator/supervisor work is asynchronous and non-blocking by default;
- 8-item registry content is transitional, not the final micro StudyLoad ideal;
- no adaptive AI, theta, mastery, or PAES score claims in MVP-Beta;
- Git preflight overrides stale docs.
