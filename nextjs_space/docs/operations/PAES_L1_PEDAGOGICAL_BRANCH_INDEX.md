# PAES_L1 Pedagogical Branch Index - Bexauri

## 1. Purpose

This index organizes the PAES_L1 pedagogical branch within the Bexauri pedagogical layer.

PAES_L1 must not be interpreted as approved for student/product use before its approval, continuity and rights gates are documented and passed.

## 2. Hierarchy

```text
BPCPI
-> BPTT
-> BPTT Roadmap / Living Microroadmap Contract
-> BLUEPRINT_TACTICO_PEDAGOGICO_L1_INTEGRADO
-> BPCPV1_PAES_L1_PRECONTRACT
-> BPCPV1_PAES_L1_DERIVATION_GOVERNING_DOCUMENT
-> approval/continuity guardrails
-> static review
-> access/readiness
-> human smoke
-> future second reviewed set / continuity
```

## 3. Required L1 branch files

```text
nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_L1_INTEGRADO.md
nextjs_space/docs/operations/BPCPV1_PAES_L1_PRECONTRACT.md
nextjs_space/docs/operations/BPCPV1_PAES_L1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/PAES_L1_PEDAGOGICAL_BRANCH_INDEX.md
```

## 4. Related implementation and governance documents

```text
nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_TUTORING_BLUEPRINT_1_CREATE_PAES_L1_BLUEPRINT.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_L1_READINESS_1.md
nextjs_space/lib/study-load-content.ts
```

`study-load-content.ts` remains the registry source for the current L1 internal pilot candidate. This phase does not modify it.

## 5. Current status

```text
L1 branch documentation: created
Current L1 set: l1_locating_information_pilot_set_01
Registry scope: internal_pilot_candidate_only
studentUseApproved: false
productUseApproved: false
continuityPolicy: no_automatic_next_l1_studyload_without_second_reviewed_registry_ready_set
```

## 6. Gates before static review

Before static review:

- approval/continuity guardrails must exist;
- rights/source status must be explicit;
- claims must be bounded;
- static review must not be confused with student/product approval;
- approvalMetadata must not be changed unless a later phase explicitly authorizes it.

## 7. Gates before human smoke

Before human smoke:

- static review must pass;
- access/readiness must be documented;
- scope must remain local/dev unless separately authorized;
- no DB/tooling/UI execution may be attributed to Codex unless actually performed in an allowed phase.

## 8. Gates before continuity

Before continuity:

- continuity policy must be satisfied;
- a second reviewed registry-ready set is required if the current policy still demands it;
- evidence and feedback must support the proposed next step;
- no automatic next L1 StudyLoad may be created from one set alone.

## 9. Gates before product use

Before product use:

- `studentUseApproved` and `productUseApproved` must be explicitly reviewed in an authorized phase;
- source/rights QA must pass;
- smoke and static evidence must be available;
- no score, mastery, complete coverage or official-equivalence claim may be introduced.

## 10. Result marker

```text
PAES_L1_PEDAGOGICAL_BRANCH_INDEX_ACCEPTED
```
