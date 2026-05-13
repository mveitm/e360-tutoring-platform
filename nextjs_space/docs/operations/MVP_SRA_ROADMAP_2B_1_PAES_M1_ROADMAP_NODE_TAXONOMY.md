# MVP-SRA-ROADMAP-2B-1 - PAES_M1 Roadmap Node Taxonomy

## 1. Purpose

Create the first Bexauri PAES_M1 roadmap node taxonomy derived from the official inventory.

This is not yet the final master roadmap, not a StudyLoad sequence, not an item bank, not an adaptive selector, and not an expert-reviewed curriculum plan.

It is a structured taxonomy that will let Bexauri map internal content, identify gaps, design StudyLoads, and eventually support next-load decisions.

This phase is documentation only. It does not change code, runtime, content registry, schema, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `268c0d5`
- Last accepted commit = `MVP-SRA-ROADMAP-2B-0: extract official PAES M1 inventory`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Source basis

Primary input:

- `MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`

Source register:

- `PAES_M1_SOURCE_REGISTER.md`

This taxonomy uses official PAES_M1 axes and skills, plus Curriculum Nacional OA references from 7° basico to 2° medio.

## 4. Taxonomy object shape

Each node family should eventually support:

- `axis`
- `family`
- `subfamily`
- `node_id`
- `node_label`
- `course_origin`
- `source_refs`
- `difficulty_band` tentative
- `prerequisite_nodes` tentative
- `student_evidence_signals`
- `common_error_patterns`
- `recommended_load_types`
- `if_strong_next`
- `if_weak_next`
- `if_mixed_next`
- `anti_monotony_fallback`
- `expert_validation_status`

This document only defines the first taxonomy skeleton, not all fields exhaustively.

## 5. Difficulty bands, tentative

These are internal Bexauri draft bands for taxonomy planning only.

- D0: entry readiness / recognition / very low friction.
- D1: routine procedure with familiar representation.
- D2: procedure plus representation or simple context.
- D3: contextual modeling, transfer, or multi-step reasoning.
- D4: integration, non-routine problem, or higher-demand PAES-style task.

Guardrail: these bands are not PAES score bands and are not validated difficulty estimates.

## 6. Official skills overlay

Every node should eventually be taggable by PAES_M1 skill demand:

- resolver_problemas;
- modelar;
- representar;
- argumentar.

In MVP-Beta, most StudyLoads may prioritize resolver_problemas and representar, but the roadmap should not ignore modelar or argumentar.

## 7. Axis taxonomy — Numeros

### N-FAM-01 — Enteros y racionales

Candidate nodes:

- N_INT_01 — Integer order, signs, and number line.
- N_INT_02 — Integer addition/subtraction in context.
- N_INT_03 — Integer multiplication/division and sign rules.
- N_RAT_01 — Fractions and decimals as rational numbers.
- N_RAT_02 — Rational operations, routine.
- N_RAT_03 — Rational operations in context.
- N_RAT_04 — Comparing and ordering rational numbers.
- N_REAL_01 — Real-number operations with roots and rationals.

Typical progression:

`integers -> rational representation -> rational operations -> contextual rational problems -> real-number operations`

MVP priority: high.

Rationale: foundational for all axes; likely required before algebra, percentages, proportionality, geometry measures, and probability.

### N-FAM-02 — Porcentaje y variacion porcentual

Candidate nodes:

- N_PCT_01 — Percentage as part-whole relation.
- N_PCT_02 — Basic percentage calculation.
- N_PCT_03 — Percentage problems in context.
- N_PCT_04 — Percentage variation.
- N_PCT_05 — Constant percentage change over time.

Typical progression:

`percentage concept -> calculation -> contextual percent -> variation -> constant percentage change`

MVP priority: high.

Rationale: frequent in PAES-style contexts and connects to proportionality, data, and functions.

### N-FAM-03 — Potencias, raices y relaciones superiores

Candidate nodes:

- N_POW_01 — Powers of base 10 and notation.
- N_POW_02 — Power properties, natural/integer exponent.
- N_POW_03 — Rational base with integer exponent.
- N_ROOT_01 — Square roots and estimation.
- N_ROOT_02 — Nth roots and root properties.
- N_LOG_01 — Powers, roots, and logarithmic relationships.

Typical progression:

`power notation -> properties -> rational base/integer exponent -> roots -> nth roots -> logarithmic relationship`

MVP priority: medium.

Rationale: official M1 scope includes powers/roots; logarithmic relationships appear in curriculum source and require expert priority decision for MVP-Beta.

## 8. Axis taxonomy — Algebra y funciones

### AF-FAM-01 — Lenguaje algebraico y expresiones

Candidate nodes:

- AF_EXPR_01 — Translate patterns/relations into algebraic language.
- AF_EXPR_02 — Reduce like terms.
- AF_EXPR_03 — Operations with algebraic expressions.
- AF_EXPR_04 — Products and notable products.
- AF_EXPR_05 — Factorization and expansion.

Typical progression:

`algebraic language -> like terms -> operations -> products -> factorization/expansion`

MVP priority: high.

Rationale: prerequisite for equations, functions, systems, and quadratic work.

### AF-FAM-02 — Proporcionalidad

Candidate nodes:

- AF_PROP_01 — Direct proportion recognition.
- AF_PROP_02 — Inverse proportion recognition.
- AF_PROP_03 — Proportional tables and graphs.
- AF_PROP_04 — Proportionality in context.

Typical progression:

`direct proportion -> inverse proportion -> representation -> contextual modeling`

MVP priority: high.

Rationale: bridge between numbers, functions, geometry scaling, and probability/statistics contexts.

### AF-FAM-03 — Ecuaciones e inecuaciones lineales

Candidate nodes:

- AF_EQ_01 — Simple one-step linear equations.
- AF_EQ_02 — Multi-step linear equations.
- AF_EQ_03 — Linear equations with fractions/decimals.
- AF_EQ_04 — Context to linear equation.
- AF_INEQ_01 — Simple linear inequalities.
- AF_INEQ_02 — Linear inequalities in context.

Typical progression:

`simple equations -> multi-step equations -> rational coefficients -> context modeling -> inequalities`

MVP priority: very high.

Rationale: already validated as the first operational corridor; foundational for modeling and functions.

### AF-FAM-04 — Sistemas lineales 2x2

Candidate nodes:

- AF_SYS_01 — Meaning of two linear equations and two unknowns.
- AF_SYS_02 — Solve 2x2 system symbolically.
- AF_SYS_03 — Interpret graphical solution.
- AF_SYS_04 — Context to 2x2 system.

Typical progression:

`linear equation fluency -> two-variable relationship -> symbolic/graphical solution -> context modeling`

MVP priority: medium-high.

Rationale: official M1 scope; should appear after equations and linear relations.

### AF-FAM-05 — Funcion lineal y afin

Candidate nodes:

- AF_LIN_01 — Constant change and linear relation intuition.
- AF_LIN_02 — Linear function from table.
- AF_LIN_03 — Linear function graph.
- AF_LIN_04 — Slope/intercept interpretation.
- AF_AFF_01 — Affine function as linear plus constant.
- AF_AFF_02 — Affine function in context.
- AF_REL2_01 — Linear relation in two variables.

Typical progression:

`constant change -> table -> graph -> slope/intercept -> affine shift -> context -> two-variable relation`

MVP priority: very high.

Rationale: current local corridor reaches this family; essential next area after equations.

### AF-FAM-06 — Funcion cuadratica y ecuaciones cuadraticas

Candidate nodes:

- AF_QUAD_01 — Quadratic equation, basic form.
- AF_QUAD_02 — Quadratic equation solving, symbolic/graphical.
- AF_QUAD_03 — Quadratic function table and graph.
- AF_QUAD_04 — Vertex, zeros, intercepts.
- AF_QUAD_05 — Quadratic modeling in context.

Typical progression:

`algebra expressions -> equations -> function view -> graph features -> context modeling`

MVP priority: medium.

Rationale: official M1 upper-content area; should not be first corridor but must be represented in complete roadmap.

### AF-FAM-07 — Funciones y relaciones avanzadas de 2° medio

Candidate nodes:

- AF_INV_01 — Inverse function concept.
- AF_INV_02 — Inverse function from table/graph.
- AF_CPC_01 — Constant percentage change as recursive/functional model.

MVP priority: low-medium / expert decision needed.

Rationale: official curriculum reference; may be advanced for early MVP-Beta and needs expert prioritization.

## 9. Axis taxonomy — Geometria

### G-FAM-01 — Figuras planas, perimetro y area

Candidate nodes:

- G_POLY_01 — Angles and polygons.
- G_CIRC_01 — Circle, radius, diameter, perimeter.
- G_AREA_01 — Area of triangles, parallelograms, trapezoids.
- G_AREA_02 — Area/perimeter of circles and circular sectors.

MVP priority: high.

Rationale: core geometry and measurement family; accessible early and useful for confidence/coverage variation.

### G-FAM-02 — Plano cartesiano, puntos y vectores

Candidate nodes:

- G_CART_01 — Ordered pairs and Cartesian plane.
- G_VEC_01 — Vectors in plane.
- G_VEC_02 — Vector composition/decomposition.
- G_VEC_03 — Vector projections.

MVP priority: medium.

Rationale: connects geometry, functions, and later trigonometry/vector contexts.

### G-FAM-03 — Teorema de Pitagoras y trigonometria

Candidate nodes:

- G_PYTH_01 — Pythagorean theorem, routine.
- G_PYTH_02 — Pythagorean theorem in context.
- G_TRIG_01 — Sine/cosine/tangent in right triangles.
- G_TRIG_02 — Trigonometric ratios in context.

MVP priority: medium-high.

Rationale: official, common, and useful for transfer; trigonometry requires careful sequencing.

### G-FAM-04 — Cuerpos geometricos

Candidate nodes:

- G_SOLID_01 — Surface area and volume of prisms/parallelepipeds/cubes.
- G_SOLID_02 — Surface area and volume of cylinders.
- G_SOLID_03 — Cone surface/volume.
- G_SOLID_04 — Sphere surface/volume.

MVP priority: medium.

Rationale: official content, strong context potential, may need formula scaffolding.

### G-FAM-05 — Transformaciones, semejanza y proporcionalidad

Candidate nodes:

- G_ISO_01 — Translation, rotation, reflection.
- G_SIM_01 — Similarity and scale.
- G_HOMO_01 — Homothety.
- G_THALES_01 — Thales theorem via homothety.
- G_SCALE_01 — Scale models and real-world proportionality.

MVP priority: medium.

Rationale: connects geometry with proportionality and representation; good candidate for bridge/spiral loads.

## 10. Axis taxonomy — Probabilidad y estadistica

### PE-FAM-01 — Tablas, graficos y representacion de datos

Candidate nodes:

- PE_DATA_01 — Absolute and relative frequency tables.
- PE_DATA_02 — Choose/interpret graphs.
- PE_DATA_03 — Detect graph manipulation or misleading representation.
- PE_DATA_04 — Contextual data interpretation.

MVP priority: high.

Rationale: high-access, good for low-friction coverage and evidence of representation skill.

### PE-FAM-02 — Medidas y distribucion

Candidate nodes:

- PE_MEAN_01 — Mean and range.
- PE_POS_01 — Quartiles and percentiles.
- PE_BOX_01 — Boxplot interpretation.
- PE_COMP_01 — Compare populations or groups.

MVP priority: medium-high.

Rationale: useful for reading statistical representations and data comparisons.

### PE-FAM-03 — Probabilidad basica y experimental

Candidate nodes:

- PE_PROB_01 — Probability of simple event.
- PE_PROB_02 — Experimental probability and relative frequency.
- PE_PROB_03 — Compare theoretical and experimental probability.
- PE_PROB_04 — Probability in context.

MVP priority: high.

Rationale: accessible family that supports contextual reasoning and avoids algebra monotony.

### PE-FAM-04 — Reglas de probabilidad y conteo

Candidate nodes:

- PE_RULE_01 — Additive probability rule.
- PE_RULE_02 — Multiplicative probability rule.
- PE_COUNT_01 — Multiplicative counting principle.
- PE_PERM_01 — Simple permutations/combinatorics.

MVP priority: medium.

Rationale: official scope; needs careful sequencing after basic probability and representation.

### PE-FAM-05 — Variables aleatorias y probabilidad en sociedad

Candidate nodes:

- PE_RV_01 — Finite random variables and distributions.
- PE_SOC_01 — Probability assumptions and decisions in society.

MVP priority: low-medium / expert decision needed.

Rationale: official curriculum reference but likely later in roadmap or checkpoint-style activity.

## 11. Cross-axis bridge nodes

These are not official axes by themselves but useful Bexauri pedagogical connectors.

### BRIDGE-01 — Representation switch

Purpose: same idea across symbolic, table, graph, geometric, or verbal representation.

Examples:

- equation -> verbal context;
- table -> linear graph;
- data table -> graph interpretation;
- geometric diagram -> numeric relation.

### BRIDGE-02 — Context modeling

Purpose: transform daily-life or PAES-style text into mathematical structure.

Examples:

- context -> equation;
- context -> proportion;
- context -> probability event;
- context -> geometric measurement.

### BRIDGE-03 — Confidence restoration

Purpose: after weak evidence, return to a familiar prerequisite with variation, not mere repetition.

### BRIDGE-04 — Novelty probe

Purpose: after strong evidence, introduce one controlled new element to test readiness.

## 12. MVP-Beta priority interpretation

This is tentative and requires expert review.

### High-priority early families

- N-FAM-01 Enteros y racionales.
- N-FAM-02 Porcentaje y variacion porcentual.
- AF-FAM-01 Lenguaje algebraico y expresiones.
- AF-FAM-02 Proporcionalidad.
- AF-FAM-03 Ecuaciones e inecuaciones lineales.
- AF-FAM-05 Funcion lineal y afin.
- G-FAM-01 Figuras planas, perimetro y area.
- PE-FAM-01 Tablas, graficos y representacion de datos.
- PE-FAM-03 Probabilidad basica y experimental.

### Medium-priority families

- N-FAM-03 Potencias, raices y relaciones superiores.
- AF-FAM-04 Sistemas lineales 2x2.
- AF-FAM-06 Funcion cuadratica y ecuaciones cuadraticas.
- G-FAM-03 Teorema de Pitagoras y trigonometria.
- G-FAM-04 Cuerpos geometricos.
- G-FAM-05 Transformaciones, semejanza y proporcionalidad.
- PE-FAM-02 Medidas y distribucion.
- PE-FAM-04 Reglas de probabilidad y conteo.

### Later / expert-priority decision needed

- AF-FAM-07 Funciones y relaciones avanzadas de 2° medio.
- G-FAM-02 vector subnodes beyond Cartesian basics.
- PE-FAM-05 Variables aleatorias y probabilidad en sociedad.
- N_LOG_01 logarithmic relationships.

## 13. How this taxonomy supports next-load decisions

A next-load decision should eventually select from this taxonomy using:

- current node;
- prerequisite readiness;
- evidence strength;
- error pattern;
- self-report;
- monotony risk;
- coverage gap;
- need for bridge or validation;
- cycle milestone opportunity.

Example decision pattern:

- if AF_EQ_02 is strong and self-report is confident, move to AF_EQ_04 or AF_LIN_01;
- if AF_EQ_02 is weak, vary through AF_EQ_01/AF_EXPR_02 rather than repeat identical items indefinitely;
- if algebra monotony risk is high, spiral to PE_DATA_01 or G_AREA_01 as low-friction coverage;
- if evidence is mixed, use BRIDGE-04 novelty probe or a validation load.

## 14. Guardrails

- This taxonomy is not final.
- Expert review is required before it becomes canonical roadmap.
- It must be mapped against official item PDFs before strong claims.
- It must be mapped against Bexauri internal docs before implementation.
- It must preserve non-blocking student continuity.
- It must not create PAES score, theta, mastery, or adaptive AI claims.
- It must not reduce Bexauri to linear drill repetition.

## 15. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2B - Map current PAES_M1 roadmap docs to official taxonomy`

Purpose:

- compare current internal Bexauri roadmap/content docs against this taxonomy;
- identify covered nodes, missing families, overemphasis, and ambiguous areas;
- classify the validated local algebra/functions path as one corridor;
- prepare expert review checklist and decision-record design.

Alternative:

`MVP-SRA-ROADMAP-2C - Define MVP-Beta next-load decision record format`

Use this if the team wants to design decision records before mapping content.

Recommended order:

1. Map internal roadmap docs to taxonomy.
2. Define decision record format.
3. Build expert review checklist.
4. Propose content metadata model.
5. Only then prototype selector logic.

## 16. Handoff requirements

Future handoffs must include:

- taxonomy exists but is not final roadmap;
- official inventory and source register must remain upstream;
- current local algebra/functions path is one corridor, not the full M1 roadmap;
- next-load decision should use node, evidence, monotony risk, coverage, and non-blocking fallback;
- expert review remains required before production-grade roadmap claims.
