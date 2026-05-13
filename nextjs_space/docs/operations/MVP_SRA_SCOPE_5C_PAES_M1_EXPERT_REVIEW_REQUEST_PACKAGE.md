# MVP-SRA-SCOPE-5C - PAES_M1 Expert Review Request Package

## 1. Purpose

Prepare a concise, expert-facing review request package for the PAES_M1 pedagogical roadmap and first implementation candidates.

This document converts the larger roadmap/scope documentation into an actionable request for a PAES_M1 expert. It clarifies what to review, what decisions are needed, what is provisional, and what must remain out of scope.

This phase continues the documentation-only path after `MVP-SRA-SCOPE-5B`.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `d29e743`
- Last accepted commit = `MVP-SRA-SCOPE-5B: specify first non-algebra slice candidate`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Review request summary

Bexauri needs a PAES_M1 expert to review the pedagogical foundation of the tutoring experience before making stronger external-beta or implementation claims.

The expert is not being asked to review code.

The expert is being asked to review:

- PAES_M1 source alignment;
- roadmap taxonomy;
- first algebra/functions corridor;
- first non-algebra slice proposals;
- decision-record logic;
- StudyLoad metadata approach;
- first implementation candidates;
- readiness for internal/external beta.

## 4. Short message to send to expert

Suggested message:

```text
Estamos construyendo Bexauri, una plataforma de tutoría PAES M1 basada en actividades breves, evidencia de respuestas, autorreporte del estudiante y una capa de decisión que prepara la siguiente acción de aprendizaje.

No necesitamos que revises código. Necesitamos una revisión pedagógica PAES M1 sobre el roadmap, la secuencia inicial, los criterios de avance/refuerzo/redirección, las primeras propuestas de contenidos no algebraicos y los límites antes de implementar más.

La revisión busca responder: ¿esta base es pertinente para PAES M1?, ¿qué corregirías antes de una beta externa guiada?, ¿qué se puede usar internamente de forma provisional?, y ¿cuál sería la primera implementación pedagógica segura?

Importante: Bexauri no quiere afirmar puntaje PAES, mastery, theta ni IA adaptativa en MVP-Beta. También queremos evitar que la acción humana sea un bloqueo normal para que el estudiante continúe estudiando.
```

## 5. Required review documents

Send the expert the following documents in this order:

1. `nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md`
2. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
3. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
4. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`
5. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_1_AS1_ALGEBRA_FUNCTIONS_CORRIDOR_METADATA_AND_ASSIGNMENT_CONSTRAINTS.md`
6. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2F_FIRST_NON_ALGEBRA_SLICE_PROPOSALS.md`
7. `nextjs_space/docs/operations/MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md`
8. `nextjs_space/docs/operations/MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md`
9. `nextjs_space/docs/operations/MVP_SRA_SCOPE_2A_CYCLE_MILESTONE_AND_SPECIAL_ACTION_MODEL.md`
10. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5A_IMPLEMENTATION_SPEC_FOR_PROVISIONAL_REGISTRY_METADATA.md`
11. `nextjs_space/docs/operations/MVP_SRA_SCOPE_5B_IMPLEMENTATION_SPEC_FOR_FIRST_NON_ALGEBRA_SLICE.md`
12. `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md`

Optional, if the expert wants deeper context:

- `nextjs_space/docs/operations/MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md`
- `nextjs_space/docs/operations/MVP_SRA_SCOPE_4_FUTURE_TUTOR_AGENT_GOVERNANCE_MODEL.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md`
- `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2G_PAES_M1_EXPERT_REVIEW_PACKET_ASSEMBLY.md`

## 6. Decisions requested from expert

Ask the expert to make decisions or recommendations on the following points.

### 6.1 Source adequacy

Questions:

- Are the official sources sufficient for an MVP-Beta PAES_M1 roadmap?
- Are any official documents missing?
- Should the roadmap rely more heavily on DEMRE item style, curriculum OA, or both?

Expected output:

- source basis accepted / needs additions;
- missing source list;
- priority source guidance.

### 6.2 Taxonomy quality

Questions:

- Are the node families pedagogically coherent?
- Are the first-priority nodes reasonable?
- Are any nodes too broad or too narrow?
- Are prerequisites plausible?

Expected output:

- nodes to keep;
- nodes to split/merge;
- priority changes;
- prerequisite corrections.

### 6.3 AS1 algebra/functions corridor

Current status:

```text
AS1 = available first corridor, not universal tutoring path.
```

Questions:

- Is AS1 a valid first available corridor?
- Under what conditions should it be assigned?
- Under what conditions should it be skipped or shortened?
- How many reinforcements are acceptable before strategy changes?
- Should proportionality or algebraic expressions come before equations for some students?

Expected output:

- AS1 accepted / needs revision;
- conditions for use;
- prerequisite warnings;
- anti-monotony rule.

### 6.4 Non-algebra slice proposals N1/G1/PE1

Questions:

- Are N1, G1, and PE1 the right first non-algebra complements?
- Which should be implemented first?
- Is PE1 data interpretation a good first non-algebra candidate?
- Should probability basics come before or after data interpretation?
- Is area/perimeter a better first geometry candidate than coordinate plane, scale, or Pythagoras?

Expected output:

- priority order;
- changes to slice design;
- minimum first non-algebra content recommendation.

### 6.5 First implementation candidates

Current documentation recommends:

1. Future `MVP-SRA-IMPL-1`: add provisional taxonomy metadata to current M1 registry activities.
2. Future `MVP-SRA-IMPL-2` or equivalent: add PE1 data interpretation StudyLoad.

Questions:

- Is registry metadata a safe first implementation step?
- Is PE1-MSL-01 the right first non-algebra StudyLoad candidate?
- Should a different content candidate come first?
- What must be reviewed before implementing PE1?

Expected output:

- first implementation recommendation;
- conditions before implementation;
- implementation blockers if any.

### 6.6 MVP-Beta readiness

Questions:

- Is the current pedagogical foundation ready for internal MVP-Beta only?
- What must change before external guided beta?
- What can remain provisional?
- What claims should Bexauri avoid?

Expected output:

- readiness classification;
- external beta blockers;
- provisional items;
- claims policy confirmation.

## 7. Review verdict format

Ask the expert to return this structure:

```text
Reviewer:
Date:
Documents reviewed:

Overall verdict:
- accepted
- accepted_with_minor_changes
- needs_revision
- not_acceptable_for_beta
- needs_more_evidence

Readiness classification:
- R0 Not ready
- R1 Internal MVP-Beta directionally ready
- R2 External guided beta ready after minor changes
- R3 External guided beta ready
- R4 Production-grade roadmap ready

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

Taxonomy corrections:

AS1 corridor corrections:

N1/G1/PE1 corrections:

Recommended first implementation candidate:

Conditions before implementation:

Claims/guardrails notes:

Final recommendation:
```

## 8. Readiness scale explanation

### R0 — Not ready

The roadmap foundation is not pedagogically coherent enough for meaningful internal testing.

### R1 — Internal MVP-Beta directionally ready

The foundation is acceptable for controlled internal testing with provisional labels, modest claims, and human review.

### R2 — External guided beta ready after minor changes

The foundation can support a small external guided beta after specific corrections.

### R3 — External guided beta ready

The foundation is ready for small guided external beta with current guardrails.

### R4 — Production-grade roadmap ready

Not expected at this stage.

## 9. Key context the expert must understand

### 9.1 Bexauri is not claiming score prediction

Bexauri does not currently claim:

- PAES score;
- mastery;
- theta;
- official diagnostic placement;
- autonomous adaptive AI.

### 9.2 AS1 is not universal

The current algebra/functions corridor is:

- available;
- operationally validated;
- useful for some students;
- not the complete roadmap;
- not mandatory for every student.

### 9.3 Non-algebra slices are proposals

N1/G1/PE1 are proposed complements for:

- prerequisite repair;
- coverage;
- confidence;
- anti-monotony;
- broader PAES_M1 evidence.

They are not implemented and not mandatory detours.

### 9.4 Human review is not a default gate

Bexauri wants expert and human supervision, but normal student continuity should not depend on waiting for manual approval.

### 9.5 Future tutor-agent is governed

The future agent is intended as governed decision support, not autonomous pedagogical authority.

## 10. Expert review boundaries

The expert is not being asked to:

- build the app;
- review code;
- create a full item bank;
- guarantee student outcomes;
- design psychometric scoring;
- certify adaptive AI;
- approve every future StudyLoad.

The expert is being asked to:

- review pedagogical soundness;
- correct roadmap/slice priorities;
- validate or challenge first implementation candidates;
- define what is safe for internal/external beta.

## 11. Post-review integration options

After receiving expert feedback, choose one of these phases:

### If feedback is accepted/minor

```text
MVP-SRA-SCOPE-5E - Integrate PAES_M1 expert feedback and readiness verdict
```

### If feedback requires revision

```text
MVP-SRA-SCOPE-5E - Revise PAES_M1 scope from expert feedback
```

### If no expert is available yet

```text
MVP-SRA-SCOPE-5D - Handoff hardening after scope-first documentation block
```

### If implementation becomes explicitly authorized later

```text
MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities
```

Only after an explicit implementation decision.

## 12. Not authorized by this phase

This phase does not authorize:

- code changes;
- registry edits;
- new StudyLoads;
- selector logic;
- continuity map changes;
- UI/API/schema/database changes;
- deploy;
- production;
- tutor-agent behavior;
- external beta expansion;
- PAES score/mastery/theta/adaptive AI claims.

## 13. Recommended next documentation phase

Recommended next phase if no expert review happens immediately:

```text
MVP-SRA-SCOPE-5D - Handoff hardening after scope-first documentation block
```

Purpose:

- preserve the full scope-first documentation block in current handoff files;
- make future chats/agents aware that construction remains paused unless explicitly restarted;
- carry forward SCOPE-1 through SCOPE-5C decisions.

## 14. Handoff requirements

Future handoffs must preserve:

- expert review request package exists;
- expert review has not yet occurred unless later documented;
- first implementation candidates are provisional and not authorized;
- AS1 is available but not universal;
- PE1-MSL-01 is recommended first non-algebra candidate, not implemented;
- construction remains documentation-only unless explicitly restarted;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
