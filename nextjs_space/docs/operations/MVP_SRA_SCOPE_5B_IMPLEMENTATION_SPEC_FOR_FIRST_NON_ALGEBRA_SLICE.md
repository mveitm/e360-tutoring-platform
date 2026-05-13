# MVP-SRA-SCOPE-5B - Implementation Spec for First Non-Algebra Slice

## 1. Purpose

Define a documentation-only implementation specification for the future first non-algebra PAES_M1 slice in Bexauri.

This phase continues the documentation-only path after `MVP-SRA-SCOPE-5A`. It does not implement a StudyLoad, change the registry, alter runtime behavior, or authorize construction.

The purpose is to prepare a future narrow implementation candidate that broadens PAES_M1 beyond the AS1 algebra/functions corridor while preserving the scope-first decisions.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `cc04b73`
- Last accepted commit = `MVP-SRA-SCOPE-5A: specify provisional registry metadata implementation`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Core decision

The future first non-algebra implementation slice should broaden coverage without pretending to complete PAES_M1.

Core rule:

```text
First non-algebra slice = narrow, provisional, metadata-aligned, low-risk content candidate.
```

It must not become a mandatory detour for all students.

It must not change the principle:

```text
AS1 is available, not universal.
N1/G1/PE1 are options, not fixed routes.
```

## 4. Candidate slices from SCOPE-2F

`MVP-SRA-ROADMAP-2F` proposed three first non-algebra slice families:

1. `N1_NUMBERS_PREREQUISITE_AND_PROPORTIONAL_REASONING`
2. `G1_GEOMETRY_MEASUREMENT_AND_VISUAL_REASONING`
3. `PE1_DATA_AND_PROBABILITY_ENTRY`

Each is useful, but the first implementation should be selected carefully.

## 5. Candidate comparison

### 5.1 N1 — Numbers prerequisite and proportional reasoning

Candidate first StudyLoad:

```text
N1-MSL-03 — Porcentajes y proporcion inicial
```

Pedagogical value:

- supports percentage and proportional reasoning;
- connects to Numbers, Algebra/functions, Geometry, and PE contexts;
- can redirect from weak algebra evidence;
- useful PAES_M1 foundation.

Risks:

- can feel like prerequisite remediation if framed poorly;
- may require careful context design to avoid pure arithmetic drill;
- could overlap with balanced entry q1 if not differentiated.

Best use:

- when balanced entry or equation context suggests percentage/proportion weakness;
- as a bridge from AS1 to broader PAES_M1 reasoning.

### 5.2 G1 — Geometry measurement and visual reasoning

Candidate first StudyLoad:

```text
G1-MSL-01 — Area y perimetro basico
```

Pedagogical value:

- low-friction non-algebra slice;
- strong visual/representation value;
- good anti-monotony spiral after algebra-heavy work;
- accessible on mobile if diagrams/rendering are simple;
- broadens coverage into official Geometry axis.

Risks:

- requires clear visual rendering;
- item quality depends on avoiding ambiguous diagrams;
- may need image/diagram support later.

Best use:

- when algebra monotony risk appears;
- when geometry evidence is weak or absent;
- as a confidence-restoration/coverage task.

### 5.3 PE1 — Data and probability entry

Candidate first StudyLoad:

```text
PE1-MSL-01 — Lectura de tablas y graficos
```

Pedagogical value:

- low-friction;
- strong representation skill alignment;
- easy to frame as interpreting information;
- useful PAES_M1 coverage;
- can work without advanced prerequisite burden.

Risks:

- tables/graphs must render cleanly on mobile;
- may require UI/table formatting decisions;
- if too easy, evidence may be shallow.

Best use:

- when student needs non-algebra confidence;
- when representation evidence is useful;
- as first PE coverage before probability rules.

## 6. Recommended first non-algebra slice

Recommended first implementation candidate later:

```text
PE1-MSL-01 — Lectura de tablas y graficos
```

Reasoning:

- it broadens from AS1 without requiring heavy diagram rendering;
- it directly exercises representation, one of the PAES_M1 skills;
- it is low-friction and suitable for mobile;
- it can help anti-monotony after algebra;
- it creates evidence about information extraction and representation without strong prerequisite burden;
- it supports future data/probability path.

Second candidate:

```text
G1-MSL-01 — Area y perimetro basico
```

Third candidate:

```text
N1-MSL-03 — Porcentajes y proporcion inicial
```

This order may change after expert review.

## 7. Future implementation candidate

Future phase name if construction resumes:

```text
MVP-SRA-IMPL-2 - Add PE1 data interpretation StudyLoad
```

Precondition:

- `MVP-SRA-IMPL-1` metadata implementation should ideally happen first, or the PE1 StudyLoad should include metadata from the start.

Alternative if implementation resumes directly from docs:

```text
MVP-SRA-IMPL-1B - Add provisional PE1 data interpretation StudyLoad with metadata
```

But this is not authorized by SCOPE-5B.

## 8. Future StudyLoad specification: PE1-MSL-01

### Identity

- Title: `PAES M1 — Lectura de tablas y gráficos`
- Suggested contentKey: `paes_m1_data_representation_entry`
- contentVersion: `v1`
- programCode: `PAES_M1`
- studyLoadKind: `spiral`
- activeSliceId: `PE1_DATA_AND_PROBABILITY_ENTRY`
- itemCount: 4
- estimatedDurationMinutes: 8-12

### Roadmap alignment

- axis: `probabilidad_y_estadistica`
- primaryTaxonomyNodeId: `PE_DATA_01`
- taxonomyNodeIds:
  - `PE_DATA_01`
  - `PE_DATA_02`
  - `PE_DATA_04`
- taxonomyFamilyId: `PE-FAM-01`
- roadmapStatus: `proposal_only`

### PAES skill alignment

- primaryPaesSkill: `representar`
- secondaryPaesSkills:
  - `resolver_problemas`

### Difficulty / progression

- difficultyBand: `D0-D1`
- noveltyType: `cross_axis_spiral`
- prerequisiteNodeIds: []

### Evidence purpose

Observe whether the student can read simple tables or graphs, extract information, compare quantities, and interpret data in context.

### Expected evidence signals

- correct_count;
- table_reading_error;
- graph_reading_error;
- comparison_error;
- percent_or_frequency_confusion;
- self_report;
- confidence_signal.

### Common error patterns

- reading the wrong row/column;
- confusing absolute and relative frequency;
- comparing labels instead of quantities;
- misreading scale or axis;
- selecting plausible but unsupported conclusion;
- confusing total with subgroup.

### If strong

- advance to richer data interpretation;
- bridge to `PE_PROB_02` relative frequency/probability experimental;
- or spiral back to AS1 with renewed coverage.

### If weak

- use simpler representation or guided reading support;
- avoid moving immediately to probability rules;
- consider confidence-restoration with simpler table/graph item.

### If mixed

- use one short validation or representation-switch load;
- identify whether issue is table reading, graph reading, scale, or context interpretation.

### Fallback

If PE1 StudyLoad is unavailable:

- use G1 area/perimeter if geometry spiral is available;
- or use AS1 safe fallback if no non-algebra content exists;
- do not block continuity.

### Anti-monotony fallback

If student has repeated PE/data tasks:

- switch to G1 geometry visual reasoning;
- switch to N1 percentages/proportion;
- or return to AS1 bridge if evidence supports it.

### Source refs

- `S-M1-003`
- `S-M1-005`
- `S-M1-011`
- `S-M1-013`
- `S-M1-015` through `S-M1-022` as needed for curriculum background.

### Validation status

- expertValidationStatus: `not_reviewed`
- internalValidationStatus: `proposal_only`

### Guardrails

- no_paes_score_claim;
- no_mastery_claim;
- no_theta_claim;
- no_adaptive_ai_claim;
- no_universal_route_claim;
- student_continuity_preserved.

## 9. Future item design constraints

PE1-MSL-01 should have exactly 4 items by default.

Item design goals:

1. simple frequency table reading;
2. simple bar or line graph interpretation;
3. compare two values or groups;
4. choose a supported conclusion from data.

Avoid:

- long text blocks;
- complicated multi-table analysis;
- chart rendering that breaks mobile;
- advanced probability rules;
- misleading diagrams unless the learning goal is explicitly graph critique later;
- PAES score framing.

## 10. Student-facing framing

Possible student-facing description:

```text
Practicarás cómo leer información en tablas y gráficos para responder preguntas breves. Esta actividad ayuda a preparar tu siguiente paso y no es un puntaje PAES.
```

Tone:

- low-friction;
- useful;
- not diagnostic;
- not punitive;
- not a detour.

## 11. Future implementation file scope

If implementation is later authorized, likely file:

```text
nextjs_space/lib/study-load-content.ts
```

Possible additional file only if needed:

```text
nextjs_space/lib/study-load-continuity.ts
```

But for initial content addition, continuity logic should not be changed unless explicitly scoped.

Preferred first implementation should add content only, not routing.

## 12. Future behavior expectation

If implemented as content only:

```text
No student receives PE1 automatically unless a later routing/assignment phase explicitly creates or selects it.
```

This protects against accidental route changes.

Expected future implementation effect:

- registry contains PE1 data interpretation StudyLoad;
- metadata exists;
- no automatic assignment logic changes;
- no selector logic;
- no lifecycle changes.

## 13. Verification plan for future implementation

Minimum verification if code is later changed:

```text
git status --short
npm.cmd run build
git diff -- nextjs_space/lib/study-load-content.ts
```

Expected diff:

- one new content entry;
- metadata attached;
- no changes to existing answers/items unless explicitly part of separate phase;
- no selector/continuity changes unless explicitly authorized.

Optional manual check later:

- create or assign PE1 manually in local dev only;
- verify activity renders;
- verify 4 items show;
- verify answers submit;
- verify completion flow works;
- verify no PAES score/mastery/adaptive claim appears.

Manual check requires separate implementation/validation phase.

## 14. Rollback plan for future implementation

Rollback should be simple if content only:

- remove PE1 content entry;
- remove associated metadata;
- remove any local-only test references;
- no DB migration needed;
- no production data mutation expected.

## 15. Do not implement if

Do not implement PE1 if:

- the team wants to stay documentation-only;
- current registry metadata is not yet stable;
- adding PE1 would require broad UI changes;
- chart/table rendering cannot be made mobile-safe;
- there is pressure to add selector logic at the same time;
- expert review status would be misrepresented;
- it would be assigned automatically without routing guardrails.

## 16. Relationship to expert review

PE1 can be proposed internally before expert review, but it should remain:

```text
proposal_only / expert_review_pending
```

Expert should review:

- whether data interpretation is the best first PE slice;
- whether item difficulty is appropriate;
- whether the evidence purpose is meaningful;
- whether PE1 should come before probability basics;
- whether item style resembles PAES_M1 enough for MVP-Beta.

## 17. Relationship to AS1

PE1 should complement AS1.

It should be used later when:

- algebra monotony risk is rising;
- coverage gap in PE exists;
- student needs low-friction representation practice;
- Bexauri wants to broaden evidence.

It should not be used as a mandatory detour after every AS1 activity.

## 18. Not authorized by this phase

This phase does not authorize:

- content implementation;
- registry edit;
- selector logic;
- continuity map change;
- automatic assignment;
- UI change;
- API change;
- schema/database change;
- deploy;
- production;
- tutor-agent behavior;
- PAES score/mastery/theta/adaptive AI claims.

## 19. Recommended next documentation phase

If continuing documentation-only:

```text
MVP-SRA-SCOPE-5C - Expert review request package for PAES_M1 roadmap and first implementation candidates
```

Purpose:

- convert the expert packet and first implementation candidates into a concise expert-facing request.

Alternative:

```text
MVP-SRA-SCOPE-5D - Handoff hardening after scope-first documentation block
```

Use if the chat is becoming heavy or the team wants to preserve the full scope block before switching chats.

## 20. Handoff requirements

Future handoffs must preserve:

- SCOPE-5B is documentation-only;
- PE1-MSL-01 is recommended first non-algebra content candidate, not implemented;
- no automatic route change is authorized;
- AS1 remains available, not universal;
- N1/G1/PE1 remain optional pedagogical complements;
- expert review remains pending;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
