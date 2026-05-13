# MVP-SRA-ROADMAP-2B - Internal PAES_M1 Roadmap to Official Taxonomy Mapping

## 1. Purpose

Map current Bexauri PAES_M1 roadmap/content documents against the official-source-derived PAES_M1 node taxonomy.

This phase identifies:

- covered nodes;
- partially covered nodes;
- missing nodes;
- overemphasized areas;
- ambiguous mappings;
- what should be reviewed by a PAES_M1 expert before implementation.

This is documentation only. It does not change code, runtime, content registry, schema, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `fccd63c`
- Last accepted commit = `MVP-SRA-ROADMAP-2B-1: create PAES M1 node taxonomy`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Inputs reviewed

Official/taxonomy inputs:

- `PAES_M1_SOURCE_REGISTER.md`
- `MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
- `MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`

Internal Bexauri roadmap/content inputs:

- `MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md`
- `MVP_CONTENT_2_PAES_M1_FIRST_ACTIVE_SLICE.md`
- `MVP_CONTENT_3_PAES_M1_FIRST_MICRO_STUDYLOAD_SET.md`
- `MVP_CONTENT_4_PAES_M1_BALANCED_ENTRY_MICRO_STUDYLOAD_REGISTRY_PROPOSAL.md`
- `MVP_FLOW_4_E5M_M1_LOCAL_PATH_VALIDATION_AND_CONTENT_ALIGNMENT.md`

## 4. Executive verdict

The internal Bexauri PAES_M1 roadmap direction is broadly aligned with official M1 structure, especially at the level of:

- four official axes;
- PAES skills;
- dynamic SRA architecture;
- first active slice concept;
- evidence-first micro StudyLoads;
- no PAES score / mastery claims in MVP-Beta.

However, the currently validated operational path is a narrow Algebra y funciones corridor. It is useful and officially grounded, but it is not a complete M1 roadmap.

Current internal coverage is strongest in:

- AF-FAM-03 — Ecuaciones e inecuaciones lineales;
- AF-FAM-05 — Funcion lineal y afin;
- BRIDGE-02 — Context modeling;
- BRIDGE-04 — Novelty probe, conceptually.

Current internal coverage is partial or proposal-only in:

- N-FAM-02 — Porcentaje y variacion porcentual;
- G-FAM-01 — Figuras planas, perimetro y area;
- PE-FAM-01 / PE-FAM-03 — Data/probability entry;
- AF-FAM-01 — Algebraic expressions;
- AF-FAM-02 — Proporcionalidad.

Current internal coverage is weak or missing in:

- N-FAM-01 — Enteros y racionales;
- N-FAM-03 — Potencias, raices;
- AF-FAM-04 — Sistemas 2x2;
- AF-FAM-06 — Funcion cuadratica;
- most Geometry families beyond basic area;
- most Probability/statistics families beyond entry item;
- advanced 2° medio nodes.

## 5. Mapping by internal document

### 5.1 MVP_CONTENT_1 — Master roadmap skeleton

Status: broad conceptual alignment.

Coverage:

- Recognizes official axes: Numeros, Algebra y funciones, Geometria, Probabilidad y estadistica.
- Recognizes PAES skills: Resolver problemas, Modelar, Representar, Argumentar.
- Defines practical D0-D4 difficulty bands.
- Defines early Bexauri axis groups A/B/C/D that map loosely to official taxonomy.

Strong mappings:

- A1 -> N-FAM-01 Enteros y racionales.
- A2 -> N-FAM-03 Potencias, raices.
- A3 -> N-FAM-02 Porcentaje / AF-FAM-02 Proporcionalidad.
- B1 -> AF-FAM-01 Lenguaje algebraico y expresiones.
- B2 -> AF-FAM-03 Ecuaciones e inecuaciones lineales.
- B3 -> AF-FAM-05 Funcion lineal y afin.
- B4 -> AF-FAM-04 Sistemas lineales 2x2.
- C1 -> G-FAM-01 Figuras planas, perimetro y area.
- C2 -> G-FAM-02 Plano cartesiano / transformations.
- C3 -> G-FAM-05 Semejanza, proporcionalidad, escala.
- D1 -> PE-FAM-01 Data representation.
- D2 -> PE-FAM-02 Measures.
- D3 -> PE-FAM-03 Probability.

Gaps versus official taxonomy:

- Does not yet fully break out quadratic functions/equations as AF-FAM-06.
- Does not explicitly structure advanced 2° medio nodes such as inverse functions, logarithmic relationships, random variables, permutations, vectors, trigonometric ratios.
- Geometry taxonomy is compact compared with official inventory.
- Probability/statistics taxonomy is compact compared with official inventory.

Verdict:

`MVP_CONTENT_1` remains a valid broad skeleton, but should now be superseded by the ROADMAP-2B-1 taxonomy for detailed node work.

### 5.2 MVP_CONTENT_2 — First active slice

Status: valid first slice, intentionally partial.

Internal focus:

- algebraic expression interpretation;
- simple equation solving;
- contextual equation setup;
- early linear function representation;
- proportional reasoning as support path;
- data interpretation as optional low-friction observation.

Mapping to official taxonomy:

- AS1-MSL-01 -> AF-FAM-01 / AF_EXPR_01, AF_EXPR_02.
- AS1-MSL-02 -> AF-FAM-03 / AF_EQ_01, AF_EQ_02.
- AS1-MSL-03 -> AF-FAM-03 + BRIDGE-02 / AF_EQ_04.
- AS1-MSL-04 -> AF-FAM-05 / AF_LIN_01, AF_LIN_02, AF_LIN_03.
- AS1-MSL-05 -> AF-FAM-02 and N-FAM-02 / proportionality and percentages.
- AS1-MSL-06 -> PE-FAM-01 / PE_DATA_01, PE_DATA_02, PE_DATA_04.

Strengths:

- Good first corridor for unknown-level or partially known students.
- Strong evidence value for algebra readiness.
- Includes support branches to avoid pure algebra tunnel.

Risks:

- If implemented too literally, it can overconcentrate early MVP-Beta in Algebra y funciones.
- Geometry appears only indirectly; probability appears mostly as optional low-friction observation.
- Does not yet specify anti-monotony limits in executable form.

Verdict:

Valid as first active slice, but not sufficient as roadmap-wide strategy.

### 5.3 MVP_CONTENT_3 — First micro StudyLoad set

Status: practical transitional content plan.

Layer A:

- AS1-MSL-00 Balanced entry.

Layer B:

- registry-aligned Algebra/functions continuation.

Mapping:

- Balanced entry q1 -> N-FAM-02 / N_PCT_01-N_PCT_03.
- Balanced entry q2 -> AF-FAM-03 / AF_EQ_01-AF_EQ_02.
- Balanced entry q3 -> G-FAM-01 / G_AREA_01.
- Balanced entry q4 -> originally data/probability depending on version; maps to PE-FAM-01 or PE-FAM-03.
- Ecuaciones lineales basicas -> AF-FAM-03 / AF_EQ_01-AF_EQ_02.
- Problemas con ecuaciones lineales -> AF-FAM-03 + BRIDGE-02 / AF_EQ_04.
- Refuerzo de ecuaciones lineales -> AF-FAM-03 + BRIDGE-03 / reinforcement of AF_EQ_01-AF_EQ_03.
- Funciones lineales basicas -> AF-FAM-05 / AF_LIN_01-AF_LIN_04.

Strengths:

- Correctly distinguishes transitional registry-aligned content from ideal micro StudyLoad design.
- Recognizes balanced entry as broader signal.
- Preserves existing content without falsely claiming final ideal format.

Risks:

- Current registry activities are still Algebra-heavy.
- The balanced entry item set is very light; it is a signal, not coverage.
- 8-item activities remain transitional and should not define final micro StudyLoad standard.

Verdict:

Useful MVP-Beta bridge between current registry reality and future taxonomy-aligned content.

### 5.4 MVP_CONTENT_4 — Balanced entry registry proposal

Status: good first broad microcontact proposal.

Mapping:

- q1 Percent discount -> N-FAM-02 / N_PCT_01-N_PCT_03.
- q2 Linear equation -> AF-FAM-03 / AF_EQ_01-AF_EQ_02.
- q3 Rectangle area -> G-FAM-01 / G_AREA_01.
- q4 Basic probability -> PE-FAM-03 / PE_PROB_01-PE_PROB_04.

Strengths:

- One item per official axis.
- Clear non-diagnostic student-facing framing.
- Strong guardrails against PAES score/mastery claims.
- Useful as first broad signal.

Ambiguity:

- Earlier content docs discussed data interpretation as the low-friction fourth axis signal, while CONTENT-4 uses basic probability. Both are valid official PE families, but Bexauri should decide which is better as first entry signal.

Recommendation:

- Keep q4 probability as acceptable if the goal is basic probability signal.
- Consider future variant with PE_DATA_01 if the goal is lower-friction data interpretation.
- Do not treat the balanced entry as diagnostic placement.

### 5.5 E5M validated local path

Status: operationally validated, pedagogically partial.

Path:

1. Entrada balanceada inicial.
2. Ecuaciones lineales basicas.
3. Problemas con ecuaciones lineales.
4. Refuerzo de ecuaciones lineales.
5. Funciones lineales basicas.

Taxonomy mapping:

- Entrada balanceada -> N-FAM-02 + AF-FAM-03 + G-FAM-01 + PE-FAM-03.
- Ecuaciones lineales basicas -> AF-FAM-03.
- Problemas con ecuaciones lineales -> AF-FAM-03 + BRIDGE-02.
- Refuerzo de ecuaciones lineales -> AF-FAM-03 + BRIDGE-03.
- Funciones lineales basicas -> AF-FAM-05.

Verdict:

This is a validated Algebra/functions corridor with a balanced entry signal. It is not a complete PAES_M1 tutoring roadmap.

## 6. Coverage matrix

| Taxonomy area | Current internal coverage | Status | Notes |
|---|---:|---|---|
| N-FAM-01 Enteros y racionales | low | missing/implicit | Needed as prerequisite layer. |
| N-FAM-02 Porcentaje | medium | proposal-only | Covered by balanced entry q1. |
| N-FAM-03 Potencias/raices | low | missing | Mentioned in skeleton, no active slice. |
| AF-FAM-01 Expresiones | medium | conceptual | Active slice says needed; registry path starts mostly at equations. |
| AF-FAM-02 Proporcionalidad | medium-low | support branch | Not in validated path except balanced entry/support idea. |
| AF-FAM-03 Ecuaciones lineales | high | validated corridor | Strongest current coverage. |
| AF-FAM-04 Sistemas 2x2 | low | missing | In skeleton only. |
| AF-FAM-05 Funcion lineal/afin | medium-high | validated endpoint | Functions basic exists and was completed in local path. |
| AF-FAM-06 Cuadratica | low | missing | Official, later roadmap need. |
| AF-FAM-07 Advanced functions | low | missing | Expert priority decision needed. |
| G-FAM-01 Plane geometry/area | medium-low | proposal-only | Balanced entry q3. |
| G-FAM-02 Coordinates/vectors | low | missing | Mentioned broadly, no MVP content. |
| G-FAM-03 Pythagoras/trig | low | missing | Official, no current path. |
| G-FAM-04 Solids | low | missing | Official, no current path. |
| G-FAM-05 Similarity/scale | low | missing | Relevant to proportionality bridge. |
| PE-FAM-01 Data representation | medium-low | optional/proposed | CONTENT-2 proposed as low-friction observation. |
| PE-FAM-02 Measures/distribution | low | missing | Official, no current path. |
| PE-FAM-03 Basic probability | medium-low | proposal-only | CONTENT-4 q4. |
| PE-FAM-04 Probability rules/counting | low | missing | Official, no current path. |
| PE-FAM-05 Random variables/society | low | missing | Later/expert decision. |
| BRIDGE-01 Representation switch | medium | conceptual | Important but not explicitly tagged in registry. |
| BRIDGE-02 Context modeling | high | present | Word problems with equations. |
| BRIDGE-03 Confidence restoration | medium | present | Reinforcement path exists. |
| BRIDGE-04 Novelty probe | medium | emerging | Functions after reinforcement acts as novelty/advance. |

## 7. Overemphasis and risk assessment

### Overemphasis risk: Algebra/functions

Current validated local path heavily emphasizes Algebra y funciones. This is acceptable for the first corridor because equations and functions are high-value PAES_M1 material, but it is not acceptable as the full roadmap.

Control:

- Treat the path as first corridor only.
- Add Numbers, Geometry, and Probability/statistics active slices before beta claims of full M1 coverage.
- Use spiral decisions to avoid algebra monotony.

### Undercoverage risk: Numbers prerequisites

Many algebra failures may come from rational numbers, sign rules, percentage, or proportional reasoning.

Control:

- Add prerequisite checks for N-FAM-01 and N-FAM-02.
- Use redirect logic from AF_EQ nodes to Numbers nodes when errors suggest arithmetic/prerequisite weakness.

### Undercoverage risk: Geometry and PE

Geometry and Probability/statistics currently appear mainly as balanced entry signals, not as sustained learning paths.

Control:

- Create at least one early geometry slice and one early data/probability slice before calling the M1 roadmap broad.

### Ambiguity: data vs probability as first PE signal

CONTENT-2 suggested data interpretation as low-friction observation. CONTENT-4 proposes basic probability.

Control:

- Decide entry PE signal policy later.
- Both are official and useful, but they serve different purposes:
  - data interpretation = lower friction representation signal;
  - basic probability = conceptual probability signal.

## 8. Immediate taxonomy alignment recommendations

### Recommendation 1 — Preserve current path as first corridor

Keep the validated path as:

`Balanced entry -> equations -> equation context -> equation reinforcement -> linear functions`

But label it as:

`AS1 algebra/functions corridor`, not full M1 roadmap.

### Recommendation 2 — Define prerequisite redirect nodes

Add future decision rules:

- AF_EQ weak due to arithmetic/sign errors -> redirect to N_INT/N_RAT.
- AF_EQ weak due to percent/proportion context -> redirect to N_PCT/AF_PROP.
- AF_LIN weak due to table/graph confusion -> redirect to BRIDGE-01 representation switch.

### Recommendation 3 — Add early non-algebra spiral slices

Before a public/paid MVP-Beta path, define at least:

- one Numbers slice;
- one Geometry measurement slice;
- one Data/probability slice.

### Recommendation 4 — Convert internal names to taxonomy ids

Future content registry should not rely only on titles. Each StudyLoad should eventually carry or be documented with:

- taxonomy node id;
- axis;
- skill;
- difficulty band;
- evidence purpose;
- next action if strong/weak/mixed.

### Recommendation 5 — Expert review focus

The first expert review should focus on:

- whether equations/functions is a good first corridor;
- whether balanced entry should use data or probability as q4;
- what minimum Numbers prerequisites should be checked before equations;
- what early Geometry and PE slices are most pedagogically useful;
- how many reinforcements are acceptable before changing strategy.

## 9. Decision implications for next-load layer

The next-load decision layer should not choose only by current contentKey.

It should eventually choose by:

- current taxonomy node;
- evidence strength;
- self-report;
- prerequisite risk;
- monotony risk;
- coverage gap;
- bridge/advance opportunity;
- non-blocking fallback.

Minimum MVP-Beta decision examples:

- Strong AF_EQ evidence -> AF_EQ context or AF_LIN entry.
- Weak AF_EQ procedural evidence -> AF_EQ reinforcement or AF_EXPR prerequisite.
- Weak AF_EQ arithmetic evidence -> N_INT/N_RAT redirect.
- Strong algebra but high monotony risk -> PE_DATA or G_AREA spiral.
- Mixed evidence -> validation / hold microload.

## 10. Required next work

Before implementation of smarter selector logic:

1. Define MVP-Beta next-load decision record format.
2. Create expert review checklist.
3. Add taxonomy ids to future content metadata proposal.
4. Decide first PE entry signal: data vs probability.
5. Design early Numbers / Geometry / PE slices.
6. Decide transition policy for 8-item registry content vs 4-item ideal micro StudyLoads.

## 11. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2C - Define MVP-Beta next-load decision record format`

Purpose:

- create the minimal auditable record shape that explains why Bexauri chose the next learning action;
- support future rule-based selector and future tutor agent;
- preserve non-blocking continuity and avoid hidden/ad hoc decisions.

Alternative:

`MVP-SRA-ROADMAP-2D - Expert review checklist for PAES_M1 roadmap`

Recommended order:

1. Decision record format.
2. Expert review checklist.
3. Early non-algebra slice proposals.
4. Content metadata proposal.
5. Selector prototype.

## 12. Handoff requirements

Future handoffs must preserve:

- current internal PAES_M1 roadmap is aligned but partial;
- validated algebra/functions path is a corridor, not full roadmap;
- official taxonomy is upstream of internal content;
- smarter next-load selection must use node/evidence/coverage/monotony, not only contentKey sequence;
- operator/expert review remains asynchronous and non-blocking by default;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
