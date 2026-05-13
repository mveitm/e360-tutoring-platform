# MVP-SRA-ROADMAP-2F - First Non-Algebra Slice Proposals

## 1. Purpose

Define the first metadata-aligned non-algebra slice proposals for PAES_M1 so Bexauri does not remain overconcentrated in the AS1 algebra/functions corridor.

This phase proposes early slices for:

- Numbers;
- Geometry;
- Probability and Statistics.

These slices are not mandatory for every student. They are available pedagogical options for the next-load decision layer when evidence, coverage, monotony risk, prerequisite risk, or confidence needs make them useful.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `92b5488`
- Last accepted commit = `MVP-SRA-ROADMAP-2E-1: constrain AS1 corridor assignment`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Inputs

This proposal depends on:

- `PAES_M1_SOURCE_REGISTER.md`
- `MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
- `MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
- `MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`
- `MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md`
- `MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md`
- `MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md`
- `MVP_SRA_ROADMAP_2E_1_AS1_ALGEBRA_FUNCTIONS_CORRIDOR_METADATA_AND_ASSIGNMENT_CONSTRAINTS.md`

## 4. Core decision

The AS1 algebra/functions corridor remains available, but it must not dominate the whole PAES_M1 tutoring experience.

Bexauri needs early non-algebra slices to support:

- prerequisite repair;
- confidence restoration;
- axis coverage;
- anti-monotony;
- representation skills;
- broader PAES_M1 evidence;
- future cycle milestones;
- more intelligent next-load decisions.

Operational principle:

```text
Non-algebra slices = available pedagogical options, not a fixed universal detour.
```

## 5. Design principles

### 5.1 Student continuity

Non-algebra slices must preserve the non-blocking operator principle:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

If expert review is pending, the system may still use provisional low-risk, low-friction slices internally, with modest claims and fallback paths.

### 5.2 Evidence-first design

Each slice must produce useful evidence for the next-load decision layer.

Evidence should help answer:

- is the student blocked by prerequisite knowledge?
- is the student ready for novelty?
- is the student at risk of monotony?
- does the student need a different representation?
- should the next action advance, reinforce, bridge, redirect, spiral, hold, or validate?

### 5.3 No overclaiming

These slices must not claim:

- PAES score;
- mastery;
- theta;
- definitive diagnostic level;
- adaptive AI.

### 5.4 Four-item default

Where appropriate, each proposed micro StudyLoad should default to 4 items.

A 4-item StudyLoad is enough for a signal, not enough for diagnosis.

## 6. Proposed slice N1 — Numbers prerequisite and proportional reasoning

### 6.1 Slice identity

- Slice ID: `N1_NUMBERS_PREREQUISITE_AND_PROPORTIONAL_REASONING`
- Student-facing name: `Números para avanzar con seguridad`
- Program: `PAES_M1`
- Axis: `numeros`
- Role: prerequisite support, confidence restoration, algebra support, proportional reasoning foundation.
- Status: `proposal_only`
- Expert validation: `not_reviewed`

### 6.2 Purpose

Provide a low-friction Numbers slice that can be used when algebra evidence suggests arithmetic, sign, fraction, rational-number, percentage, or proportional reasoning weakness.

This slice should help the student feel:

```text
Puedo fortalecer una base que me permite avanzar mejor.
```

It should not feel like being sent backward.

### 6.3 Main taxonomy coverage

Primary families:

- `N-FAM-01` — Enteros y racionales.
- `N-FAM-02` — Porcentaje y variacion porcentual.

Secondary / bridge:

- `AF-FAM-02` — Proporcionalidad.
- `BRIDGE-03` — Confidence restoration.

Candidate nodes:

- `N_INT_02` — Integer addition/subtraction in context.
- `N_INT_03` — Integer multiplication/division and sign rules.
- `N_RAT_01` — Fractions and decimals as rational numbers.
- `N_RAT_02` — Rational operations, routine.
- `N_RAT_03` — Rational operations in context.
- `N_PCT_01` — Percentage as part-whole relation.
- `N_PCT_02` — Basic percentage calculation.
- `N_PCT_03` — Percentage problems in context.
- `AF_PROP_01` — Direct proportion recognition.
- `AF_PROP_03` — Proportional tables and graphs.

### 6.4 When to assign

Assign N1 when:

- equation errors suggest sign, fraction, decimal, or arithmetic weakness;
- balanced entry shows weakness in percentage/proportional reasoning;
- student has negative self-report after algebra but errors seem prerequisite-driven;
- student needs confidence restoration before returning to algebra/functions;
- coverage history underrepresents Numbers;
- a bridge into proportional reasoning would support future functions, geometry, or probability.

Do not assign N1 automatically when:

- the student already shows strong Numbers fluency;
- the next useful action is geometry/data spiral for monotony, not prerequisite repair;
- the student needs a challenge/validation rather than basic support.

### 6.5 Candidate micro StudyLoads

#### N1-MSL-01 — Enteros y signos en contexto

Metadata summary:

- studyLoadKind: `confidence_restoration`
- primaryTaxonomyNodeId: `N_INT_03`
- taxonomyNodeIds: `N_INT_02`, `N_INT_03`
- difficultyBand: `D0-D1`
- primaryPaesSkill: `resolver_problemas`
- evidencePurpose: detect sign-rule and integer-operation stability.
- itemCount: 4

Use when:

- algebra/equation errors show sign weakness;
- student needs a low-friction prerequisite repair.

If strong:

- return to `AF_EQ_02` or bridge to `N_RAT_02` if fractions remain uncertain.

If weak:

- repeat with representation change, not identical drill.

Anti-monotony fallback:

- use number line / context representation switch.

#### N1-MSL-02 — Racionales y operaciones básicas

Metadata summary:

- studyLoadKind: `practice`
- primaryTaxonomyNodeId: `N_RAT_02`
- taxonomyNodeIds: `N_RAT_01`, `N_RAT_02`, `N_RAT_03`
- difficultyBand: `D1-D2`
- primaryPaesSkill: `resolver_problemas`
- secondaryPaesSkills: `representar`
- evidencePurpose: detect fraction/decimal operation stability and context transfer.
- itemCount: 4

Use when:

- equation errors involve fractions/decimals;
- student needs rational-number fluency before algebra.

If strong:

- return to equations with rational coefficients or proportional reasoning.

If weak:

- simplify representation or use confidence-restoration.

Anti-monotony fallback:

- switch to percentage or visual fraction/decimal representation.

#### N1-MSL-03 — Porcentajes y proporción inicial

Metadata summary:

- studyLoadKind: `bridge`
- primaryTaxonomyNodeId: `N_PCT_03`
- taxonomyNodeIds: `N_PCT_01`, `N_PCT_02`, `N_PCT_03`, `AF_PROP_01`
- difficultyBand: `D1-D2`
- primaryPaesSkill: `modelar`
- secondaryPaesSkills: `resolver_problemas`
- evidencePurpose: observe percentage interpretation, final-price vs discount confusion, and simple proportional reasoning.
- itemCount: 4

Use when:

- balanced entry percentage item is weak;
- proportionality appears as support path before functions/geometry;
- student needs a non-algebra but still high-PAES-value bridge.

If strong:

- advance to proportional tables or linear-function constant-change bridge.

If weak:

- reinforce percentage meaning and part-whole relation.

Anti-monotony fallback:

- move to data interpretation with percentages or geometry scale later.

### 6.6 N1 decision role

N1 can be used as:

- redirect from algebra;
- confidence restoration;
- prerequisite repair;
- cross-axis support for geometry/probability contexts;
- early coverage balancing.

## 7. Proposed slice G1 — Geometry measurement and visual reasoning

### 7.1 Slice identity

- Slice ID: `G1_GEOMETRY_MEASUREMENT_AND_VISUAL_REASONING`
- Student-facing name: `Geometría visual y medición`
- Program: `PAES_M1`
- Axis: `geometria`
- Role: coverage, confidence, representation, spatial reasoning, anti-monotony spiral.
- Status: `proposal_only`
- Expert validation: `not_reviewed`

### 7.2 Purpose

Provide an early Geometry slice that is accessible, useful for PAES_M1 coverage, and effective as a non-algebra spiral when the student is stuck or fatigued by algebra.

This slice should help the student feel:

```text
También puedo avanzar con representaciones y problemas visuales.
```

### 7.3 Main taxonomy coverage

Primary families:

- `G-FAM-01` — Figuras planas, perimetro y area.
- `G-FAM-05` — Semejanza y proporcionalidad, later bridge.

Secondary / bridge:

- `BRIDGE-01` — Representation switch.
- `BRIDGE-02` — Context modeling.

Candidate nodes:

- `G_AREA_01` — Area of triangles, parallelograms, trapezoids.
- `G_AREA_02` — Area/perimeter of circles and circular sectors.
- `G_CIRC_01` — Circle, radius, diameter, perimeter.
- `G_SCALE_01` — Scale models and real-world proportionality.

### 7.4 When to assign

Assign G1 when:

- algebra monotony risk is medium/high;
- balanced entry shows geometry weakness;
- the student needs a confidence-restoring visual task;
- coverage history lacks Geometry;
- proportional reasoning can be transferred into scale/measurement;
- the system needs a low-friction non-algebra spiral.

Do not assign G1 automatically when:

- student is currently working through an urgent Numbers prerequisite;
- geometry would be too advanced without measurement basics;
- a data/probability slice is more useful for confidence or coverage.

### 7.5 Candidate micro StudyLoads

#### G1-MSL-01 — Área y perímetro básico

Metadata summary:

- studyLoadKind: `spiral`
- primaryTaxonomyNodeId: `G_AREA_01`
- taxonomyNodeIds: `G_AREA_01`, `G_CIRC_01`
- difficultyBand: `D1`
- primaryPaesSkill: `resolver_problemas`
- secondaryPaesSkills: `representar`
- evidencePurpose: distinguish area/perimeter, select formulas, interpret units and diagrams.
- itemCount: 4

Use when:

- balanced entry geometry item is weak;
- student needs non-algebra confidence/coverage;
- geometry basics need observation.

If strong:

- advance to composed figures or contextual measurement.

If weak:

- reinforce area/perimeter distinction with visual representation.

Anti-monotony fallback:

- switch to data interpretation or percent/scale context.

#### G1-MSL-02 — Figuras compuestas y contexto de medición

Metadata summary:

- studyLoadKind: `bridge`
- primaryTaxonomyNodeId: `G_AREA_01`
- taxonomyNodeIds: `G_AREA_01`, `BRIDGE-02`
- difficultyBand: `D2-D3`
- primaryPaesSkill: `resolver_problemas`
- secondaryPaesSkills: `modelar`, `representar`
- evidencePurpose: observe decomposition of figures and contextual measurement reasoning.
- itemCount: 4

Use when:

- G1-MSL-01 is strong;
- student is ready for slightly richer Geometry modeling;
- Bexauri wants a non-algebra challenge without leaving M1 scope.

If strong:

- advance to scale/proportional geometry or Pythagorean theorem later.

If weak:

- return to basic area/perimeter or representation switch.

Anti-monotony fallback:

- use percentage/scale connection or data representation.

#### G1-MSL-03 — Escala y proporcionalidad visual

Metadata summary:

- studyLoadKind: `bridge`
- primaryTaxonomyNodeId: `G_SCALE_01`
- taxonomyNodeIds: `G_SCALE_01`, `AF_PROP_01`, `AF_PROP_04`
- difficultyBand: `D2`
- primaryPaesSkill: `modelar`
- secondaryPaesSkills: `resolver_problemas`, `representar`
- evidencePurpose: connect proportional reasoning with geometry/scale models.
- itemCount: 4

Use when:

- student has enough proportional reasoning;
- Geometry and Numbers/Proportionality can be bridged;
- Bexauri needs coverage plus transfer.

If strong:

- advance to similarity or contextual scale problems.

If weak:

- redirect to N1 percentage/proportion support.

Anti-monotony fallback:

- use a simpler visual measurement load before repeating scale items.

### 7.6 G1 decision role

G1 can be used as:

- non-algebra spiral;
- confidence restoration;
- coverage expansion;
- representation skill check;
- bridge from proportionality to geometry.

## 8. Proposed slice PE1 — Data and probability entry

### 8.1 Slice identity

- Slice ID: `PE1_DATA_AND_PROBABILITY_ENTRY`
- Student-facing name: `Datos y probabilidad para interpretar información`
- Program: `PAES_M1`
- Axis: `probabilidad_y_estadistica`
- Role: low-friction coverage, representation, probability reasoning, anti-monotony spiral.
- Status: `proposal_only`
- Expert validation: `not_reviewed`

### 8.2 Purpose

Provide an early Probability/Statistics slice that can support low-friction progress, data representation literacy, and basic probability reasoning.

This slice should help the student feel:

```text
Puedo usar información, tablas, gráficos y probabilidad para resolver problemas.
```

### 8.3 Main taxonomy coverage

Primary families:

- `PE-FAM-01` — Tablas, graficos y representacion de datos.
- `PE-FAM-03` — Probabilidad basica y experimental.

Secondary families:

- `PE-FAM-02` — Medidas y distribucion, later.

Candidate nodes:

- `PE_DATA_01` — Absolute and relative frequency tables.
- `PE_DATA_02` — Choose/interpret graphs.
- `PE_DATA_04` — Contextual data interpretation.
- `PE_PROB_01` — Probability of simple event.
- `PE_PROB_02` — Experimental probability and relative frequency.
- `PE_PROB_04` — Probability in context.

### 8.4 Data vs probability entry policy

Bexauri should support two early PE variants:

- `PE1-DATA`: lower-friction representation/data interpretation entry.
- `PE1-PROB`: basic probability entry.

Recommendation:

- Use `PE1-DATA` when the goal is confidence, representation, or low-friction spiral.
- Use `PE1-PROB` when the goal is probability concept evidence.
- Do not treat either as full PE coverage.

### 8.5 When to assign

Assign PE1 when:

- algebra monotony risk is medium/high;
- Bexauri needs a low-friction non-algebra spiral;
- coverage history lacks PE;
- student needs confidence restoration;
- balanced entry shows PE weakness;
- Bexauri needs representation/data evidence.

Do not assign PE1 automatically when:

- the student is currently blocked by a Numbers prerequisite that must be repaired;
- the next useful action is a Geometry visual task;
- the student already showed strong PE evidence and needs another axis.

### 8.6 Candidate micro StudyLoads

#### PE1-MSL-01 — Lectura de tablas y gráficos

Metadata summary:

- studyLoadKind: `spiral`
- primaryTaxonomyNodeId: `PE_DATA_01`
- taxonomyNodeIds: `PE_DATA_01`, `PE_DATA_02`, `PE_DATA_04`
- difficultyBand: `D0-D1`
- primaryPaesSkill: `representar`
- secondaryPaesSkills: `resolver_problemas`
- evidencePurpose: observe table/graph reading, information extraction, and comparison.
- itemCount: 4

Use when:

- student needs a low-friction non-algebra task;
- coverage is algebra-heavy;
- representation skill needs observation.

If strong:

- advance to trend interpretation, data comparison, or probability relation.

If weak:

- reinforce graph/table reading with simpler representation.

Anti-monotony fallback:

- switch to basic probability or geometry visual task.

#### PE1-MSL-02 — Probabilidad básica

Metadata summary:

- studyLoadKind: `practice`
- primaryTaxonomyNodeId: `PE_PROB_01`
- taxonomyNodeIds: `PE_PROB_01`, `PE_PROB_04`
- difficultyBand: `D1`
- primaryPaesSkill: `resolver_problemas`
- secondaryPaesSkills: `representar`
- evidencePurpose: observe sample-space reasoning and favorable/total case interpretation.
- itemCount: 4

Use when:

- balanced entry probability item is weak;
- student needs probability concept evidence;
- Bexauri wants a PE branch after data reading.

If strong:

- advance to event comparison or relative frequency.

If weak:

- reinforce sample space and favorable/total relation.

Anti-monotony fallback:

- use data representation or visual probability representation.

#### PE1-MSL-03 — Frecuencia relativa y probabilidad experimental

Metadata summary:

- studyLoadKind: `bridge`
- primaryTaxonomyNodeId: `PE_PROB_02`
- taxonomyNodeIds: `PE_PROB_02`, `PE_DATA_01`
- difficultyBand: `D2`
- primaryPaesSkill: `modelar`
- secondaryPaesSkills: `representar`, `resolver_problemas`
- evidencePurpose: connect data tables with probability interpretation.
- itemCount: 4

Use when:

- student handles simple probability or data reading;
- Bexauri wants a bridge between PE_DATA and PE_PROB.

If strong:

- advance to compare theoretical/experimental probability.

If weak:

- return to PE1-DATA or PE1-PROB basics depending on error type.

Anti-monotony fallback:

- use a different context or spiral to Numbers percentage/fraction connection.

### 8.7 PE1 decision role

PE1 can be used as:

- low-friction spiral;
- confidence restoration;
- representation check;
- probability concept check;
- bridge between data and probability;
- anti-monotony alternative to algebra.

## 9. Integration with AS1 corridor

The AS1 algebra/functions corridor and non-algebra slices should interact dynamically.

Examples:

### Algebra weak due to prerequisites

- Use N1 before more equation practice.

### Algebra strong but monotony risk high

- Use G1 or PE1 as spiral.

### Balanced entry geometry weak

- Use G1-MSL-01 before or after AS1 depending on student confidence.

### Balanced entry PE weak

- Use PE1-DATA or PE1-PROB depending on whether weakness is representation or probability concept.

### Student strong across entry and AS1

- Use validation, bridge, or later roadmap slice rather than repeating basics.

## 10. Suggested MVP-Beta routing examples

### Route 1 — Standard unknown-level with no blockers

```text
Balanced entry
-> AS1 algebra/functions corridor start
-> if strong, bridge to functions or spiral to PE/G
```

### Route 2 — Numbers weakness detected

```text
Balanced entry
-> N1 Numbers prerequisite slice
-> return to AS1 or proportionality bridge
```

### Route 3 — Algebra monotony risk

```text
AS1 equation reinforcement
-> PE1 data interpretation or G1 area/perimeter
-> return to algebra/functions with renewed context
```

### Route 4 — Geometry weakness detected

```text
Balanced entry
-> G1 area/perimeter
-> later scale/proportionality bridge
```

### Route 5 — PE coverage needed

```text
AS1 functions completed
-> PE1 data interpretation
-> PE1 probability basics or next axis based on evidence
```

These are examples, not fixed paths.

## 11. Minimal metadata checklist for each proposed slice

Before implementing any of these slices, create per-StudyLoad metadata with:

- title;
- contentKey;
- contentVersion;
- programCode;
- studyLoadKind;
- itemCount;
- axis;
- primaryTaxonomyNodeId;
- taxonomyNodeIds;
- taxonomyFamilyId;
- activeSliceId;
- PAES skill(s);
- difficultyBand;
- prerequisites;
- evidencePurpose;
- expectedEvidenceSignals;
- commonErrorPatterns;
- ifStrongNextAction;
- ifWeakNextAction;
- ifMixedNextAction;
- fallbackIfUnavailable;
- antiMonotonyFallback;
- sourceRefs;
- expertValidationStatus;
- internalValidationStatus;
- studentFacingClaimsAllowed;
- guardrails.

## 12. What should be implemented first later

When implementation becomes appropriate, the recommended first non-algebra registry additions are:

1. `N1-MSL-03` — Porcentajes y proporción inicial.
2. `G1-MSL-01` — Área y perímetro básico.
3. `PE1-MSL-01` — Lectura de tablas y gráficos.

Rationale:

- all are low-friction;
- all are PAES_M1 relevant;
- all broaden coverage;
- all support confidence;
- all can serve as anti-monotony spiral from AS1.

Alternative first addition:

- `PE1-MSL-02` — Probabilidad básica, if Bexauri chooses probability over data as first PE signal.

## 13. Expert review questions for these slices

Ask expert reviewer:

1. Is N1 the right first Numbers slice?
2. Should rational operations or percentages come first for MVP-Beta?
3. Is G1 area/perimeter the right first Geometry slice?
4. Should Geometry start with measurement, coordinates, scale, or Pythagoras?
5. Is PE1 better as data-entry or probability-entry?
6. Are the proposed difficulty bands appropriate?
7. Are these slices low-friction enough for student motivation?
8. Do they meaningfully reduce algebra overconcentration?
9. What item styles should be used to make them PAES-relevant?
10. Which proposed micro StudyLoad should be implemented first?

## 14. Guardrails

- These slices are proposals only.
- They are not implemented in registry or runtime.
- They are not a fixed route.
- They must not claim PAES score, mastery, theta, or adaptive AI.
- They must not block student continuity while expert review is pending.
- They should be used by the decision layer only when evidence and coverage indicate usefulness.
- They should complement, not replace, AS1.

## 15. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2G - Expert review packet assembly`

Purpose:

- assemble the minimum packet that a PAES_M1 expert should review:
  - source register;
  - official inventory;
  - node taxonomy;
  - AS1 corridor constraints;
  - non-algebra slice proposals;
  - decision record format;
  - StudyLoad metadata proposal;
  - expert checklist.

Alternative:

`MVP-SRA-ROADMAP-2F-1 - Metadata detail for first non-algebra StudyLoads`

Use this if Bexauri wants more detailed per-item proposals before expert review.

## 16. Handoff requirements

Future handoffs must preserve:

- first non-algebra slice proposals now exist;
- AS1 remains available but not universal;
- N1/G1/PE1 are options for prerequisite repair, coverage, confidence, and anti-monotony;
- next-load decisions must choose based on evidence, taxonomy, coverage, monotony, and fallback;
- expert review remains pending and asynchronous;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
