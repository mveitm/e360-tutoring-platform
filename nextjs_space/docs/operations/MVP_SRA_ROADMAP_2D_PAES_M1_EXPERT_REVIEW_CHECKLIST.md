# MVP-SRA-ROADMAP-2D - PAES_M1 Expert Review Checklist

## 1. Purpose

Define the expert review checklist for the PAES_M1 pedagogical roadmap, node taxonomy, active slices, next-load decision record, and first content corridors.

The goal is to ensure Bexauri's M1 roadmap is pedagogically pertinent, PAES-aligned, effective for study, and safe for MVP-Beta use.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `ef464e8`
- Last accepted commit = `MVP-SRA-ROADMAP-2C: define next-load decision record`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Review principle

Expert review improves roadmap quality. It must not become the default bottleneck for normal student continuity.

Bexauri preserves:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

Expert review may improve, correct, or override the roadmap asynchronously. If review is pending, MVP-Beta should continue with the safest available rule-based path unless a separately defined exceptional policy requires pausing.

## 4. Reviewer profile

Preferred reviewer:

- PAES_M1 mathematics teacher;
- preuniversitario mathematics specialist;
- experienced secondary mathematics teacher familiar with PAES M1;
- curriculum/assessment expert with knowledge of Chilean mathematics curriculum and PAES item style.

Minimum reviewer competence:

- understands PAES M1 scope;
- can judge prerequisite sequencing;
- can identify common student errors;
- can assess item difficulty and representativeness;
- can distinguish routine drill from PAES-oriented reasoning;
- can evaluate whether a proposed progression is motivating and effective.

## 5. Materials to review

Reviewer should receive:

1. `PAES_M1_SOURCE_REGISTER.md`
2. `MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
3. `MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
4. `MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`
5. `MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md`
6. `MVP_FLOW_4_E5M_M1_LOCAL_PATH_VALIDATION_AND_CONTENT_ALIGNMENT.md`
7. Current registry-aligned PAES_M1 activities, if separately exported for review.

Official sources should remain upstream of internal Bexauri docs.

## 6. Review output format

For each review area, the expert should mark:

- `accepted`
- `accepted_with_minor_changes`
- `needs_revision`
- `not_acceptable_for_beta`
- `needs_more_evidence`

Each mark should include:

- rationale;
- concrete recommended change;
- severity: low / medium / high;
- whether the issue blocks external beta;
- whether the issue can be handled asynchronously;
- suggested next action.

## 7. Checklist A — PAES_M1 official alignment

Questions:

1. Does the roadmap respect the four official axes?
   - Numeros.
   - Algebra y funciones.
   - Geometria.
   - Probabilidad y estadistica.

2. Does it preserve the official skill frame?
   - Resolver problemas.
   - Modelar.
   - Representar.
   - Argumentar.

3. Are the registered DEMRE and Curriculum Nacional sources sufficient for MVP-Beta roadmap grounding?

4. Are there official M1 topics missing from the taxonomy that should be added before beta?

5. Are there topics included too early or with excessive weight for MVP-Beta?

6. Does the taxonomy avoid making PAES score, theta, mastery, or adaptive AI claims?

Reviewer notes:

- Identify missing official topics.
- Identify overrepresented topics.
- Identify topics that require expert priority decision.

## 8. Checklist B — Taxonomy quality

Questions:

1. Are the node families pedagogically coherent?

2. Are node labels clear enough for content design?

3. Are prerequisites plausible?

4. Are high-priority families reasonable for MVP-Beta?

5. Are later/expert-decision families correctly marked?

6. Are cross-axis bridge nodes useful and well-defined?

7. Are any nodes too broad to support 4-item micro StudyLoads?

8. Are any nodes too narrow to be useful for decision-making?

Expected expert feedback:

- merge/split node recommendations;
- priority adjustments;
- prerequisite corrections;
- missing misconception notes;
- item-design warnings.

## 9. Checklist C — First algebra/functions corridor

Current validated corridor:

```text
Balanced entry
-> Ecuaciones lineales basicas
-> Problemas con ecuaciones lineales
-> Refuerzo de ecuaciones lineales
-> Funciones lineales basicas
```

Questions:

1. Is this a pedagogically valid first corridor for PAES_M1 MVP-Beta?

2. Is it acceptable to start with algebra/equations after a balanced entry signal?

3. Are equations a good early signal for student readiness?

4. Is moving from equation mechanics to word problems to reinforcement to linear functions reasonable?

5. Should proportionality or algebraic expressions be inserted earlier?

6. What prerequisite errors should redirect the student to Numbers nodes?

7. When should a student move from equations to functions?

8. When should reinforcement stop and strategy change?

9. Is the current corridor at risk of becoming monotonous?

10. What would be the best next non-algebra spiral after this corridor?

Reviewer should classify the corridor as:

- acceptable as first corridor;
- acceptable only with changes;
- too narrow for MVP-Beta;
- needs prerequisite checks before use;
- needs non-algebra spiral before external beta.

## 10. Checklist D — Balanced entry activity

Current proposal:

- one item from Numeros;
- one item from Algebra y funciones;
- one item from Geometria;
- one item from Probabilidad y estadistica.

Questions:

1. Is a balanced 4-item entry useful for unknown-level students?

2. Is it better for the fourth axis item to be data interpretation or basic probability?

3. Are the proposed items too easy, too hard, or appropriate for low-friction entry?

4. Does the balanced entry produce useful evidence without feeling like a diagnostic test?

5. Should the first activity include a representation item instead of a pure calculation item?

6. Should any item be modified to better resemble PAES_M1 style?

7. Is 4 items enough for entry signal if it is not used as placement?

Reviewer should decide:

- keep current balanced entry;
- modify item mix;
- create two variants: data-entry and probability-entry;
- replace with a different first microcontact.

## 11. Checklist E — Numbers prerequisite layer

Questions:

1. Which Numbers nodes are essential before or alongside linear equations?

2. Which errors in algebra should trigger a redirect to Numbers?

3. Should integers/rational operations be checked before equations for all students?

4. Is percentage/proportionality a better first support branch than generic rational operations?

5. How should powers/roots be introduced in MVP-Beta?

6. Are logarithmic relationships relevant for early MVP-Beta or later only?

Required expert output:

- minimum Numbers prerequisites for AS1;
- recommended first Numbers slice;
- redirect criteria from algebra to Numbers;
- priority classification: must-have / should-have / later.

## 12. Checklist F — Geometry layer

Questions:

1. What is the best first Geometry slice for MVP-Beta?

2. Should it start with area/perimeter, coordinate plane, Pythagorean theorem, or similarity/scale?

3. Which geometry nodes best produce useful early evidence?

4. Which geometry nodes support confidence and anti-monotony?

5. How soon should geometry be spiraled into an algebra-heavy path?

6. Which geometry topics should wait until later due to prerequisite or difficulty?

Required expert output:

- first Geometry slice recommendation;
- early vs later geometry priority;
- common error patterns;
- suggested bridge from algebra/proportionality to geometry.

## 13. Checklist G — Probability/statistics layer

Questions:

1. What is the best first PE slice: data interpretation or basic probability?

2. Which PE nodes are low-friction and motivating for MVP-Beta?

3. Which PE nodes provide high PAES-relevant evidence early?

4. When should quartiles/boxplots appear?

5. When should additive/multiplicative probability rules appear?

6. Should random variables/permutations be later or included earlier?

Required expert output:

- first PE slice recommendation;
- data vs probability entry decision;
- PE progression notes;
- common misconception list.

## 14. Checklist H — Decision record quality

Questions:

1. Does the next-load decision record capture the right pedagogical factors?

2. Are `evidenceStrength`, `prerequisiteRisk`, `monotonyRisk`, and `coverageGap` useful categories?

3. Are the decision types complete?
   - advance;
   - reinforce;
   - bridge;
   - validate;
   - hold;
   - redirect;
   - spiral;
   - cycle_milestone;
   - async_review_request.

4. Is the record too heavy for MVP-Beta operation?

5. What fields should be mandatory versus optional?

6. What evidence is sufficient to advance?

7. What evidence is sufficient to redirect?

8. What evidence should request async expert review?

9. Does every decision include rationale and fallback?

Required expert output:

- approved fields;
- fields to remove or simplify;
- decision-type corrections;
- evidence thresholds or qualitative rules.

## 15. Checklist I — Anti-monotony and motivation

Questions:

1. How many similar reinforcement loads are acceptable before changing strategy?

2. What should Bexauri do after repeated weak evidence?

3. When should it vary representation?

4. When should it use a confidence-restoration load?

5. When should it spiral to another axis?

6. When should it use a checkpoint or mini-ensayo?

7. How can the student feel progression without hiding the need for reinforcement?

Recommended expert output:

- maximum reinforcement repetition guideline;
- anti-monotony fallback list;
- motivating cycle milestone ideas;
- warning signs of student fatigue or stagnation.

## 16. Checklist J — Cycle milestones and special actions

Questions:

1. What types of cycle milestones are pedagogically useful for PAES_M1?

2. When should a mini-checkpoint appear?

3. When should a mini-ensayo appear?

4. When is guided error review better than another StudyLoad?

5. What evidence should a milestone produce?

6. Should milestones be visible to the student as achievements, reviews, or next steps?

Required expert output:

- recommended first cycle milestone type;
- timing criteria;
- evidence purpose;
- student-facing framing.

## 17. Checklist K — MVP-Beta readiness

Questions:

1. Is the current roadmap/corridor sufficient for internal MVP-Beta only?

2. What minimum content additions are required before external beta?

3. Which missing nodes are blockers?

4. Which missing nodes can remain documented debt?

5. What must be reviewed before paid/real student use?

6. What can be improved asynchronously after launch?

Suggested classification:

- internal beta ready;
- external guided beta ready after minor changes;
- external beta not ready;
- production not ready.

## 18. Expert review summary template

```text
Reviewer:
Date:
Scope reviewed:
Sources reviewed:

Overall verdict:
- accepted
- accepted_with_minor_changes
- needs_revision
- not_acceptable_for_beta
- needs_more_evidence

Top strengths:
1.
2.
3.

Top risks:
1.
2.
3.

Blocking issues for external beta:
1.
2.
3.

Non-blocking improvements:
1.
2.
3.

Recommended next content work:
1.
2.
3.

Recommended next decision-layer work:
1.
2.
3.

Notes on anti-monotony:

Notes on first algebra/functions corridor:

Notes on balanced entry:

Notes on first non-algebra slices:

Final recommendation:
```

## 19. MVP use without completed expert review

If expert review is pending, Bexauri may continue internal MVP-Beta work if:

- all claims remain modest;
- no PAES score/mastery/theta/adaptive AI claims are made;
- student continuity remains safe and non-blocking;
- roadmap is labeled provisional;
- operator review remains asynchronous;
- external student exposure is controlled and guided.

External or paid beta should require at least one expert review pass on:

- taxonomy;
- first active slice;
- first algebra/functions corridor;
- balanced entry;
- first non-algebra slice plan;
- decision record format.

## 20. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2E - Content metadata proposal for taxonomy-aligned StudyLoads`

Purpose:

- define metadata fields each future StudyLoad should carry or document:
  - taxonomy node;
  - axis;
  - PAES skill;
  - difficulty band;
  - evidence purpose;
  - next action if strong/weak/mixed;
  - anti-monotony fallback.

Alternative:

`MVP-SRA-ROADMAP-2F - First non-algebra slice proposals`

Recommended order:

1. Content metadata proposal.
2. First non-algebra slice proposals.
3. Expert review packet assembly.
4. Rule-based selector prototype.

## 21. Handoff requirements

Future handoffs must preserve:

- expert review checklist exists;
- review is required before production-grade roadmap claims;
- review remains asynchronous/non-blocking for normal student continuity;
- external beta readiness is not the same as internal MVP-Beta readiness;
- decision records and content metadata are the next bridge toward implementation;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
