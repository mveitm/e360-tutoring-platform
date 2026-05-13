# MVP-SRA-ROADMAP-2G - PAES_M1 Expert Review Packet Assembly

## 1. Purpose

Assemble the minimum review packet that a PAES_M1 expert should receive to evaluate Bexauri's current pedagogical roadmap foundation, first corridor, non-algebra slice proposals, StudyLoad metadata model, and next-load decision layer.

This phase does not perform the expert review. It prepares the packet.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `412a143`
- Last accepted commit = `MVP-SRA-ROADMAP-2F: propose first non-algebra slices`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Review packet goal

The expert review packet should help a PAES_M1 expert answer:

1. Is Bexauri's current M1 roadmap foundation pedagogically sound?
2. Are the official sources sufficient and correctly prioritized?
3. Is the node taxonomy useful and aligned with PAES_M1?
4. Is the current AS1 algebra/functions corridor appropriate as one available first corridor?
5. Are the proposed non-algebra slices N1/G1/PE1 appropriate first complements?
6. Does the next-load decision record capture the right pedagogical variables?
7. Does the StudyLoad metadata proposal support future intelligent selection?
8. What must be changed before external guided beta?
9. What can remain provisional while internal MVP-Beta continues?
10. How can Bexauri avoid monotony, overclaiming, and weak PAES relevance?

## 4. Non-blocking review principle

Expert review is required before production-grade roadmap claims, but it is not a normal blocker for student continuity.

Bexauri preserves:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

If expert review is pending, Bexauri may continue controlled internal MVP-Beta work with provisional labels, modest claims, and safe fallback paths.

External or paid beta should require at least one expert review pass over the core materials listed below.

## 5. Packet contents — required documents

The expert should receive the following documents in this order.

### 5.1 Source grounding

1. `nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md`

Purpose:

- shows official DEMRE / Acceso / Curriculum Nacional sources;
- records official M1 temarios, question PDFs, clavijeros, and curriculum sources;
- distinguishes official sources from internal Bexauri documents and AI-assisted analysis.

Expert task:

- verify whether source basis is sufficient;
- flag missing official sources;
- flag outdated or irrelevant sources;
- advise whether PDFs should be archived or only referenced by URL.

### 5.2 Official inventory

2. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`

Purpose:

- extracts official PAES_M1 axes, skills, thematic units, and OA inventory;
- separates source inventory from Bexauri's internal roadmap.

Expert task:

- validate extraction accuracy;
- identify missing OA or official-scope nuances;
- mark which OA/content areas matter most for MVP-Beta.

### 5.3 Node taxonomy

3. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`

Purpose:

- proposes first Bexauri taxonomy of PAES_M1 node families;
- covers Numbers, Algebra/functions, Geometry, Probability/statistics;
- introduces bridge nodes for representation, modeling, confidence, and novelty.

Expert task:

- accept, split, merge, rename, or reprioritize nodes;
- check prerequisites and difficulty bands;
- identify missing families or weak groupings.

### 5.4 Internal mapping

4. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`

Purpose:

- maps Bexauri's current internal roadmap/content docs to the official taxonomy;
- identifies current strong areas, partial areas, and missing areas;
- classifies the current path as an algebra/functions corridor, not the full roadmap.

Expert task:

- validate the verdict;
- decide whether current internal coverage is enough for internal beta;
- identify minimum additions before external guided beta.

### 5.5 AS1 corridor constraints

5. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_1_AS1_ALGEBRA_FUNCTIONS_CORRIDOR_METADATA_AND_ASSIGNMENT_CONSTRAINTS.md`

Purpose:

- metadata-aligns the current algebra/functions corridor;
- explicitly prevents treating it as a universal student path;
- defines when to assign, skip, redirect, reinforce, advance, or spiral.

Expert task:

- judge whether AS1 is a valid first corridor;
- define prerequisite conditions;
- define when reinforcement becomes harmful or monotonous;
- advise when to move from equations to functions.

### 5.6 Non-algebra slice proposals

6. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2F_FIRST_NON_ALGEBRA_SLICE_PROPOSALS.md`

Purpose:

- proposes first non-algebra slices:
  - N1 Numbers prerequisite and proportional reasoning;
  - G1 Geometry measurement and visual reasoning;
  - PE1 Data and probability entry;
- positions them as available pedagogical options, not fixed detours.

Expert task:

- decide if these are the right first non-algebra slices;
- prioritize which should be implemented first;
- decide data vs probability entry for PE;
- refine difficulty and prerequisites.

### 5.7 Decision record format

7. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md`

Purpose:

- defines the auditable format explaining next-load decisions;
- includes evidence, self-report, prerequisite risk, monotony risk, coverage gap, decision type, rationale, and fallback.

Expert task:

- validate whether the record captures pedagogically useful signals;
- simplify or add fields;
- define qualitative thresholds for advance/reinforce/redirect/spiral.

### 5.8 StudyLoad metadata proposal

8. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md`

Purpose:

- defines metadata each future StudyLoad should carry or document;
- connects content to taxonomy, evidence purpose, source refs, next actions, fallbacks, and expert validation status.

Expert task:

- validate required metadata fields;
- identify metadata that is too heavy or missing;
- recommend fields needed for practical PAES_M1 content review.

### 5.9 Expert checklist

9. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md`

Purpose:

- gives the expert a structured checklist for official alignment, taxonomy, AS1, balanced entry, Numbers, Geometry, PE, decision records, anti-monotony, milestones, and readiness.

Expert task:

- use this checklist to produce review verdict and action list.

## 6. Optional supporting documents

These may be included if the expert wants historical/contextual depth:

- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_1_PAES_M1_PEDAGOGICAL_DECISION_LAYER.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2_PAES_M1_EXPERT_ROADMAP_SOURCE_AND_VALIDATION_PLAN.md`
- `nextjs_space/docs/operations/MVP_FLOW_4_E5M_M1_LOCAL_PATH_VALIDATION_AND_CONTENT_ALIGNMENT.md`
- `nextjs_space/docs/operations/MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md`
- `nextjs_space/docs/operations/MVP_CONTENT_2_PAES_M1_FIRST_ACTIVE_SLICE.md`
- `nextjs_space/docs/operations/MVP_CONTENT_3_PAES_M1_FIRST_MICRO_STUDYLOAD_SET.md`
- `nextjs_space/docs/operations/MVP_CONTENT_4_PAES_M1_BALANCED_ENTRY_MICRO_STUDYLOAD_REGISTRY_PROPOSAL.md`

Use optional docs only if the review needs historical trace. The required packet above should be the primary review set.

## 7. Expert review questions — executive version

The expert should answer these high-level questions first:

1. Is AS1 algebra/functions a valid first available corridor?
2. Under what conditions should AS1 be skipped, shortened, reinforced, or interrupted?
3. Are N1/G1/PE1 the right first non-algebra complements?
4. Should PE begin with data interpretation or basic probability?
5. Which Numbers prerequisites are essential before equations/functions?
6. What is the minimum Geometry slice needed for early M1 coverage?
7. Does the decision record capture enough to support next-load choice?
8. Is the StudyLoad metadata proposal usable or too heavy?
9. What is required before external guided beta?
10. What can remain provisional for internal MVP-Beta?

## 8. Review output expected

The expert should produce an output with:

```text
Reviewer:
Date:
Scope reviewed:
Documents reviewed:

Overall verdict:
- accepted
- accepted_with_minor_changes
- needs_revision
- not_acceptable_for_beta
- needs_more_evidence

Internal MVP-Beta readiness:
External guided beta readiness:
Production readiness:

Top strengths:
1.
2.
3.

Top risks:
1.
2.
3.

Blocking issues before external guided beta:
1.
2.
3.

Non-blocking improvements:
1.
2.
3.

Recommended corrections to taxonomy:
1.
2.
3.

Recommended corrections to AS1 corridor:
1.
2.
3.

Recommended first non-algebra slice priority:
1.
2.
3.

Decision record feedback:

StudyLoad metadata feedback:

Anti-monotony guidance:

Minimum next implementation recommendation:

Final recommendation:
```

## 9. Readiness classification to request

Ask the expert to classify Bexauri's current PAES_M1 pedagogical layer as one of:

### R0 — Not ready

Roadmap foundation is not yet pedagogically coherent.

### R1 — Internal MVP-Beta directionally ready

Good enough for controlled internal testing with modest claims and supervised review.

### R2 — External guided beta ready after minor changes

Good enough for controlled external beta after listed corrections.

### R3 — External guided beta ready

Good enough for a small external guided beta with clear guardrails.

### R4 — Production-grade roadmap ready

Not expected at this stage.

## 10. Boundaries for expert review

The expert is not being asked to:

- create a full item bank;
- build the app;
- write code;
- define a PAES score model;
- certify adaptive AI;
- guarantee student outcomes;
- approve every future StudyLoad individually;
- become a gate for every student action.

The expert is being asked to review the pedagogical foundation and advise on minimum safe next steps.

## 11. Recommended delivery format to expert

Suggested message to expert:

```text
We are building Bexauri, a PAES_M1 tutoring system that uses short learning activities, evidence, self-report, and a non-blocking decision layer to choose the next learning action.

We are not asking you to review software code. We are asking you to review the pedagogical roadmap foundation.

Please review the attached packet in this order:
1. Source register
2. Official inventory
3. Node taxonomy
4. Internal roadmap mapping
5. AS1 corridor constraints
6. Non-algebra slice proposals
7. Next-load decision record format
8. StudyLoad metadata proposal
9. Expert review checklist

Please focus on PAES_M1 pertinence, sequencing, prerequisite logic, item/style relevance, first-corridor validity, anti-monotony, and minimum readiness for internal/external beta.

Important: expert review improves the roadmap asynchronously. It is not intended to block every student action in the system.
```

## 12. Post-review integration plan

After expert review, create one of these phases:

### If accepted or minor changes

`MVP-SRA-ROADMAP-2H - Integrate expert review corrections`

Purpose:

- document expert verdict;
- apply corrections to taxonomy/metadata/decision docs;
- classify readiness.

### If needs revision

`MVP-SRA-ROADMAP-2H - Revise PAES_M1 roadmap foundation from expert feedback`

Purpose:

- rework taxonomy, AS1 constraints, or non-algebra slices before implementation.

### If no expert available yet

`MVP-SRA-ROADMAP-2H-ALT - Prepare internal provisional selector guardrails`

Purpose:

- proceed with internal-only provisional guardrails while explicitly keeping expert review pending.

## 13. Implementation gate after review

Only after this packet is reviewed or explicitly marked as internal-provisional should Bexauri consider:

- metadata pass into content registry;
- new non-algebra StudyLoad implementation;
- rule-based selector prototype;
- admin decision review surfaces;
- tutor-agent proposal layer.

No implementation is authorized by this packet assembly alone.

## 14. Handoff requirements

Future handoffs must preserve:

- expert review packet exists;
- expert review has not yet occurred unless a later phase documents it;
- AS1 remains available but not universal;
- N1/G1/PE1 are proposed first non-algebra complements;
- decision record and StudyLoad metadata are prerequisites for smarter selector logic;
- review is asynchronous/non-blocking for student continuity;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
