# MVP-SRA-ROADMAP-2B-0 - Official PAES_M1 Axes and OA Inventory

## 1. Purpose

Extract a first official inventory of PAES_M1 axes, skills, thematic units, and curriculum OA references from the source register before mapping Bexauri's internal roadmap.

This is not yet the Bexauri master roadmap.

This is the official-source inventory that will later be used to detect gaps, overreach, missing nodes, and ambiguous mappings in Bexauri's current roadmap docs.

This phase is documentation only. It does not change code, runtime, content registry, schema, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `603ac72`
- Last accepted commit = `MVP-SRA-ROADMAP-2A-2: register curriculum math sources`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Sources used

Primary official sources from `PAES_M1_SOURCE_REGISTER.md`:

- S-M1-003 — DEMRE Temario PAES Regular M1, Admision 2027, PDF.
- S-M1-005 — DEMRE Temario PAES Invierno M1, Admision 2027, PDF.
- S-M1-011 — DEMRE PAES Regular 2025 selected M1 questions, PDF.
- S-M1-013 — DEMRE PAES Invierno 2025 full M1 test, PDF.
- S-M1-015 through S-M1-022 — Curriculum Nacional Matemática 7° basico to 2° medio pages and Programas de Estudio PDFs.

This document extracts from official-source structure but does not yet perform full item-level mapping.

## 4. PAES_M1 official frame

According to the official M1 temario, PAES_M1 evaluates Competencia Matematica through integration of skills and knowledge for solving problems in diverse daily-life or mathematical contexts.

Official PAES_M1 skills:

1. Resolver problemas.
2. Modelar.
3. Representar.
4. Argumentar.

Official PAES_M1 knowledge reference:

- Mathematics curriculum from 7° basico to 2° medio.

Official PAES_M1 axes:

1. Numeros.
2. Algebra y funciones.
3. Geometria.
4. Probabilidad y estadistica.

Instrument frame:

- 65 single-answer multiple-choice questions.
- 4 options per question.
- 60 questions used for selection score calculation.
- Duration: 2 hours and 20 minutes.

Bexauri guardrail:

- This frame must not be used to make PAES score claims in MVP-Beta.

## 5. DEMRE thematic units inventory

### 5.1 Numeros

Official thematic units:

- Conjunto de los numeros enteros y racionales.
- Porcentaje.
- Potencias y raices enesimas.

Scope notes:

- integer operations and order;
- operations and comparison with rational numbers;
- contextual problems with integers and rationals;
- concept and calculation of percentage;
- percentage problems in diverse contexts;
- rational-base/exponent power properties;
- decomposition and properties of nth roots in real numbers;
- contextual problems involving powers and roots.

### 5.2 Algebra y funciones

Official thematic units:

- Expresiones algebraicas.
- Proporcionalidad.
- Ecuaciones e inecuaciones de primer grado.
- Sistemas de ecuaciones lineales (2x2).
- Funcion lineal y afin.
- Funcion cuadratica.

Scope notes:

- productos notables;
- factorizations and expansion of algebraic expressions;
- operations with algebraic expressions;
- direct and inverse proportion with different representations;
- linear equations and contextual linear-equation problems;
- linear inequalities and contextual linear-inequality problems;
- systems of linear equations and contextual systems problems;
- concept of linear and affine function;
- tables and graphs of linear and affine functions;
- quadratic equations and problems;
- quadratic-function tables, graphs, parameter variation, vertex, zeros, and intercepts.

### 5.3 Geometria

Official thematic units:

- Figuras geometricas.
- Cuerpos geometricos.
- Transformaciones isometricas.
- Semejanza y proporcionalidad de figuras.

Scope notes:

- Pythagorean theorem in diverse contexts;
- perimeter and areas of triangles, parallelograms, trapezoids, and circles;
- surface area of parallelepipeds, cubes, and cylinders;
- volume of parallelepipeds, cubes, and cylinders;
- points and vectors in the Cartesian plane;
- rotation, translation, and reflection;
- similarity and proportionality applied to scale models and real-life contexts.

### 5.4 Probabilidad y estadistica

Official thematic units:

- Representacion de datos a traves de tablas y graficos.
- Medidas de posicion.
- Reglas de las probabilidades.

Scope notes:

- absolute and relative frequency tables;
- graph types for representing data;
- average of a data set;
- table/graph contextual problems;
- quartiles and percentiles;
- boxplot for data distribution;
- probability of an event in context;
- additive and multiplicative probability rules in context.

## 6. Curriculum Nacional OA inventory by course

This section is an inventory-level extraction. It is not yet the final Bexauri node sequence.

### 6.1 7° basico

Axes exposed by Curriculum Nacional:

- Numeros.
- Algebra y funciones.
- Geometria.
- Probabilidad y estadistica.

Skill categories exposed:

- Resolver problemas.
- Argumentar y comunicar.
- Modelar.
- Representar.

OA inventory summary:

Numeros:

- MA07 OA 01: addition and subtraction of integers; number line, concrete/pictorial/symbolic representations, contextual meaning of signs, daily-life problems.
- MA07 OA 02: multiplication and division of positive fractions, linked with decimal operations.
- MA07 OA 03: multiplication and division problems with positive fractions and decimals.
- MA07 OA 04: percentage concept, pictorial representation, calculation, simple applications.
- MA07 OA 05: powers of base 10, exponent language, exponent 0, scientific notation, problems.

Algebra y funciones:

- MA07 OA 06: algebraic language for generalizing numeric relationships, rules, properties, and equations.
- MA07 OA 07: reducing algebraic expressions by combining like terms.
- MA07 OA 08: direct and inverse proportions through tables, graphs, characteristics, and daily-life/other-subject problems.
- MA07 OA 09: modeling and solving daily-life problems with linear equations and inequalities of simple forms.

Geometria:

- MA07 OA 10: interior/exterior angle relationships in polygons.
- MA07 OA 11: circle, radius/diameter/perimeter, intuitive perimeter and area, applications.
- MA07 OA 12: construction of geometric objects.
- MA07 OA 13: area formulas for triangles, parallelograms, and trapezoids.
- MA07 OA 14: ordered pairs and vectors in the Cartesian plane.

Probabilidad y estadistica:

- MA07 OA 15: sampling and estimating population percentages.
- MA07 OA 16: absolute/relative frequency tables and appropriate graphs.
- MA07 OA 17: central tendency and range for inference and comparison.
- MA07 OA 18: experimental probability, relative frequencies, ratios/fractions/percentages.
- MA07 OA 19: comparing experimental relative frequencies with theoretical probability using trees, tables, or graphs.

### 6.2 8° basico

Axes exposed by Curriculum Nacional:

- Numeros.
- Algebra y funciones.
- Geometria.
- Probabilidad y estadistica.

Skill categories exposed:

- Resolver problemas.
- Argumentar y comunicar.
- Modelar.
- Representar.

OA inventory summary:

Numeros:

- MA08 OA 01: multiplication and division of integers, representations, sign rules, routine and non-routine problems.
- MA08 OA 02: multiplication and division with rational numbers in problem solving, number line, different numeric sets.
- MA08 OA 03: powers of powers with natural base and natural exponent up to 3.
- MA08 OA 04: square roots of natural numbers, intuitive estimation, representation, geometry and daily-life applications.
- MA08 OA 05: percentage variation in diverse contexts.

Algebra y funciones:

- MA08 OA 06: operations with algebraic expressions, pictorial/symbolic representation, area/volume relations, factored forms.
- MA08 OA 07: function as linear change using tables, machine metaphors, x-y rules, graphs.
- MA08 OA 08: modeling daily-life and cross-subject situations with linear equations of increasing forms.
- MA08 OA 09: linear inequalities with rational coefficients in problem contexts.
- MA08 OA 10: affine function, relation to linear function plus constant, translations, constant change, simple interest, applications.

Geometria:

- MA08 OA 11: surface area and volume of right prisms and cylinders.
- MA08 OA 12: Pythagorean theorem and applications.
- MA08 OA 13: translations, rotations, reflections in 2D using vectors, axes, and points.
- MA08 OA 14: composition of transformations and symmetries.

Probabilidad y estadistica:

- MA08 OA 15: measures of position, percentiles, quartiles, boxplots, population comparison.
- MA08 OA 16: evaluating data representation and detecting graph manipulation.
- MA08 OA 17: multiplicative counting principle, tables/trees, compound-event probability.

### 6.3 1° medio

Axes exposed by Curriculum Nacional:

- Numeros.
- Algebra y funciones.
- Geometria.
- Probabilidad y estadistica.

Skill categories exposed:

- Resolver problemas.
- Argumentar y comunicar.
- Modelar.
- Representar.

OA inventory summary:

Numeros:

- MA1M OA 01: operations with rational numbers in symbolic form.
- MA1M OA 02: powers with rational base and integer exponent, properties, growth/decay, daily-life and cross-subject problems.

Algebra y funciones:

- MA1M OA 03: productos notables, concrete/pictorial/symbolic development, product-sum transformations, completing square of binomial, reduction and expansion of algebraic expressions.
- MA1M OA 04: systems of linear equations 2x2 in daily-life and cross-subject problems using graphical and symbolic representations.
- MA1M OA 05: graphing linear relations in two variables of the form f(x, y) = ax + by, tables, equations as graphs, relation between variables.

Geometria:

- MA1M OA 06: area/perimeter of circular sectors and segments.
- MA1M OA 07: surface area and volume of cone.
- MA1M OA 08: homothety.
- MA1M OA 09: theorem of Thales through homothety.
- MA1M OA 10: similarity and proportionality in scale models and other contexts.
- MA1M OA 11: vector representation of homothety.

Probabilidad y estadistica:

- MA1M OA 12: bivariate distributions through double-entry tables and scatterplots.
- MA1M OA 13: comparing populations with xy graphs and intuitive line separation.
- MA1M OA 14: additive and multiplicative probability rules and combinations.
- MA1M OA 15: chance, Galton board / random walks, statistical analysis with relative frequencies, probability-based descriptions.

### 6.4 2° medio

Axes exposed by Curriculum Nacional:

- Numeros.
- Algebra y funciones.
- Geometria.
- Probabilidad y estadistica.

Skill categories exposed:

- Resolver problemas.
- Argumentar y comunicar.
- Modelar.
- Representar.

OA inventory summary:

Numeros:

- MA2M OA 01: calculations and estimations with real numbers involving roots, rational numbers, and contextual problems.
- MA2M OA 02: powers, nth roots, and logarithms; conversions and relationships; routine and non-routine problems.

Algebra y funciones:

- MA2M OA 03: quadratic function, tables, graphs, special points, and modeling quadratic change.
- MA2M OA 04: quadratic equations in concrete, pictorial, symbolic, or technological forms.
- MA2M OA 05: inverse function through machine metaphor, tables, graphs, reflection, and inverse calculations in linear/quadratic cases.
- MA2M OA 06: constant percentage change over time, compound interest, recursive representation, daily-life and cross-subject problems.

Geometria:

- MA2M OA 07: surface area and volume of the sphere.
- MA2M OA 08: sine, cosine, and tangent ratios in right triangles.
- MA2M OA 09: trigonometric ratios in contexts, vector composition/decomposition, vector projections.

Probabilidad y estadistica:

- MA2M OA 10: finite random variables, values, probabilities, and distributions.
- MA2M OA 11: permutations and simple combinatorics for probability and problem solving.
- MA2M OA 12: role of probability in society and probability-based assumptions/decisions.

## 7. Cross-source observations

### 7.1 Official M1 axes match the curriculum pages

DEMRE M1 and Curriculum Nacional pages align on the four axes:

- Numeros.
- Algebra y funciones.
- Geometria.
- Probabilidad y estadistica.

### 7.2 Official M1 skills match curriculum skills with naming variation

DEMRE M1 skills:

- Resolver problemas.
- Modelar.
- Representar.
- Argumentar.

Curriculum pages show:

- Resolver problemas.
- Argumentar y comunicar.
- Modelar.
- Representar.

Mapping note:

- DEMRE `Argumentar` should be mapped carefully against curriculum `Argumentar y comunicar`.

### 7.3 Existing Bexauri algebra/functions path is officially grounded but incomplete

The current Bexauri validated path through equations, word problems, reinforcement, and linear functions is clearly grounded in official M1 Algebra y funciones content.

However, it covers only one early corridor of the full M1 landscape. It must not be treated as a complete M1 tutoring roadmap.

### 7.4 2° medio content includes topics that may be advanced for early MVP-Beta

2° medio includes quadratic functions/equations, inverse functions, logarithms, trigonometry, vectors, random variables, permutations, and probability in society.

These are official curriculum references and appear in the M1 scope through DEMRE's 7° basico to 2° medio reference, but an expert must decide which nodes are high-priority MVP-Beta targets and what prerequisite chain is appropriate.

## 8. Candidate high-level roadmap families for later mapping

This is not yet the Bexauri roadmap. It is an inventory-derived grouping for later mapping.

### Numbers family

- integers;
- rational numbers;
- fractions/decimals;
- percentages;
- percentage variation;
- powers;
- roots;
- real-number operations;
- logarithmic relationships as upper-bound content.

### Algebra/functions family

- algebraic language;
- algebraic expression reduction;
- products/factorization;
- direct/inverse proportion;
- linear equations;
- linear inequalities;
- systems 2x2;
- linear function;
- affine function;
- linear relations in two variables;
- quadratic equations;
- quadratic function;
- inverse function;
- constant percentage change.

### Geometry family

- angles and polygons;
- circle, perimeter, area;
- area of polygons;
- Cartesian plane points/vectors;
- prisms/cylinders area/volume;
- Pythagorean theorem;
- isometries;
- similarity/proportionality;
- homothety;
- Thales;
- cone;
- sphere;
- trigonometric ratios;
- vector projections.

### Probability/statistics family

- sampling and population estimates;
- frequency tables;
- graphs;
- central tendency/range;
- experimental probability;
- theoretical probability;
- percentiles/quartiles/boxplots;
- data representation critique;
- multiplicative counting principle;
- bivariate data/scatterplots;
- additive/multiplicative probability rules;
- chance and random processes;
- finite random variables;
- permutations/combinatorics;
- probability in society.

## 9. What this inventory is not

This inventory is not:

- a final Bexauri master roadmap;
- a difficulty model;
- a StudyLoad sequence;
- a prerequisite graph;
- an expert-reviewed curriculum plan;
- an item bank;
- an adaptive selector;
- a PAES score model.

## 10. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2B - Map current PAES_M1 roadmap docs to official inventory`

Purpose:

- compare internal Bexauri roadmap/content docs against this official inventory;
- identify what is covered, missing, overemphasized, or ambiguous;
- mark the current local algebra/functions path as a corridor, not a full roadmap;
- prepare expert review checklist and decision-record design.

Possible intermediate alternative:

`MVP-SRA-ROADMAP-2B-1 - Create first PAES_M1 roadmap node taxonomy from official inventory`

Use this if the team wants a clean node taxonomy before comparing internal docs.

## 11. Handoff requirements

Future handoffs must preserve:

- official inventory exists and must be read before roadmap mapping;
- current local M1 path is validated operationally but pedagogically partial;
- official axes/skills are not optional;
- curriculum OA references need expert interpretation before becoming Bexauri sequence;
- operator/expert review remains asynchronous and non-blocking for normal student continuity;
- no PAES score, mastery, theta, or adaptive AI claim in MVP-Beta.
