# MVP-SRA-ROADMAP-2C - MVP-Beta Next-Load Decision Record Format

## 1. Purpose

Define the minimal auditable decision record that explains why Bexauri selects the next learning action for a PAES_M1 student.

This record is the bridge between:

- the operational StudyLoad loop;
- the PAES_M1 official taxonomy;
- the student's recent evidence;
- non-blocking supervisor/expert review;
- future rule-based selector logic;
- future tutor-agent execution.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `7be89f2`
- Last accepted commit = `MVP-SRA-ROADMAP-2B: map internal M1 roadmap to taxonomy`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Inputs

This record format depends on:

- `MVP_SRA_ROADMAP_1_PAES_M1_PEDAGOGICAL_DECISION_LAYER.md`
- `PAES_M1_SOURCE_REGISTER.md`
- `MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md`
- `MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md`
- `MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md`
- current StudyLoad evidence and self-report

## 4. Core principle

The next-load decision must not be a hidden jump from one `contentKey` to another.

It should be explainable as:

```text
current node + evidence + self-report + prerequisite risk + monotony risk + coverage need
-> decision type
-> next learning action
-> rationale
-> fallback path
```

In MVP-Beta, this record may be written manually, semi-manually, or conceptually in documentation/admin notes. Later it can become a persisted object, rule-engine input/output, or tutor-agent reasoning artifact.

## 5. Non-blocking operator principle

This record must preserve:

```text
review != gate
supervision != bottleneck
operator action != prerequisite for normal student continuity
```

A decision record may request asynchronous operator/expert review, but the student should still receive the safest available next action unless a separately defined exceptional policy says otherwise.

## 6. Decision record object — minimum MVP-Beta shape

Recommended conceptual structure:

```json
{
  "recordType": "next_load_decision",
  "recordVersion": "mvp-beta-v1",
  "programCode": "PAES_M1",
  "enrollmentId": "optional-in-runtime",
  "learningCycleId": "optional-in-runtime",
  "currentStudyLoadId": "optional-in-runtime",
  "currentContentKey": "paes_m1_linear_equations_basic",
  "currentTaxonomyNode": "AF_EQ_02",
  "currentAxis": "algebra_y_funciones",
  "currentDifficultyBand": "D1-D2",
  "evidenceSummary": {
    "answeredCount": 4,
    "correctCount": 3,
    "itemPattern": "mostly_correct",
    "notableErrors": ["fraction_coefficient_error"],
    "submissionStatus": "submitted",
    "completionStatus": "completed"
  },
  "selfReport": {
    "value": "Me fue bien",
    "interpretation": "positive"
  },
  "pedagogicalSignals": {
    "evidenceStrength": "strong|mixed|weak|insufficient",
    "prerequisiteRisk": "low|medium|high|unknown",
    "monotonyRisk": "low|medium|high",
    "coverageGap": ["numeros", "geometria"],
    "noveltyTolerance": "low|medium|high|unknown",
    "confidenceSignal": "positive|neutral|negative|unknown"
  },
  "decision": {
    "decisionType": "advance|reinforce|bridge|validate|hold|redirect|spiral|cycle_milestone|async_review_request",
    "nextActionType": "study_load|special_action|cycle_milestone|review_request",
    "nextTaxonomyNode": "AF_EQ_04",
    "nextContentKey": "paes_m1_linear_equations_word_problems",
    "rationale": "Student shows enough equation fluency to move to contextual equation modeling.",
    "fallbackIfUnavailable": "Use AF_EQ_02 reinforcement or AF_EXPR prerequisite load.",
    "asyncReviewRequested": false,
    "operatorBlocking": false
  },
  "guardrails": {
    "noPaesScoreClaim": true,
    "noMasteryClaim": true,
    "noThetaClaim": true,
    "noAdaptiveAiClaim": true,
    "studentContinuityPreserved": true
  }
}
```

This JSON is illustrative. It is not implemented in code in this phase.

## 7. Required fields

### Identity / scope

- `recordType`
- `recordVersion`
- `programCode`
- `currentContentKey`
- `currentTaxonomyNode`
- `currentAxis`

### Evidence

- `answeredCount`
- `correctCount` if available and safe
- `itemPattern`
- `notableErrors`
- `submissionStatus`
- `completionStatus`
- `selfReport`

### Pedagogical interpretation

- `evidenceStrength`
- `prerequisiteRisk`
- `monotonyRisk`
- `coverageGap`
- `noveltyTolerance`
- `confidenceSignal`

### Decision

- `decisionType`
- `nextActionType`
- `nextTaxonomyNode` or `nextSpecialAction`
- `nextContentKey` if action is a StudyLoad
- `rationale`
- `fallbackIfUnavailable`
- `asyncReviewRequested`
- `operatorBlocking`

### Guardrails

- `noPaesScoreClaim`
- `noMasteryClaim`
- `noThetaClaim`
- `noAdaptiveAiClaim`
- `studentContinuityPreserved`

## 8. Decision types

### advance

Use when evidence supports moving to the natural next node.

Example:

- AF_EQ_02 strong -> AF_EQ_04 context-to-equation.

### reinforce

Use when the current node needs more practice, but not infinite repetition.

Example:

- AF_EQ_02 weak procedural fluency -> AF_EQ_01/AF_EQ_02 reinforcement.

### bridge

Use when the student can handle the current level and should meet a controlled novelty.

Example:

- AF_EQ_02 strong -> load with 3 familiar equation items + 1 context-modeling item.

### validate

Use when the student seems ready to accelerate but Bexauri needs a small confirmation signal.

Example:

- AF_LIN_02 strong -> D3 table/graph/equation validation item.

### hold

Use when evidence is mixed or insufficient.

Example:

- correct count moderate but self-report negative -> one short hold load.

### redirect

Use when the error pattern suggests a deeper prerequisite or wrong active slice.

Example:

- AF_EQ errors caused by fraction/sign weakness -> N_RAT or N_INT prerequisite.

### spiral

Use to preserve coverage and avoid monotony.

Example:

- repeated algebra loads completed -> move to PE_DATA_01 or G_AREA_01 low-friction coverage.

### cycle_milestone

Use when the student has completed a meaningful segment.

Examples:

- mini-checkpoint;
- guided error review;
- short integrative challenge;
- mini-ensayo in a later phase;
- reflective closure.

### async_review_request

Use when operator/expert review would improve quality but must not normally block the student.

Example:

- unclear repeated errors -> continue with safe fallback load and request asynchronous review.

## 9. Evidence strength scale

### strong

Use when:

- most items are correct;
- self-report is positive or neutral;
- no repeated critical error;
- next node is natural.

### mixed

Use when:

- some correctness but error pattern unclear;
- self-report conflicts with answers;
- one item type is strong and another weak.

### weak

Use when:

- multiple errors in same skill;
- self-report signals difficulty;
- prerequisite issue is visible.

### insufficient

Use when:

- not enough answers;
- submission incomplete;
- activity not completed;
- evidence is unavailable or not trustworthy.

## 10. Prerequisite risk scale

### low

No obvious prerequisite issue.

### medium

Possible prerequisite issue but not confirmed.

### high

Repeated errors point to prerequisite weakness.

### unknown

No enough evidence.

Examples:

- sign errors in equations -> N_INT risk;
- fraction coefficient errors -> N_RAT risk;
- percentage context errors -> N_PCT/AF_PROP risk;
- graph/table mismatch -> BRIDGE-01 representation risk.

## 11. Monotony risk scale

### low

Recent sequence is varied or early in a corridor.

### medium

Student has received multiple similar loads in one node family.

### high

Student is repeating the same item type or same skill family without meaningful variation.

Rule of thumb:

- after one or two similar reinforcements, Bexauri should change strategy.

Possible anti-monotony actions:

- bridge to novelty;
- vary representation;
- redirect to prerequisite;
- spiral to another axis;
- create confidence-restoration load;
- use cycle milestone or guided error review.

## 12. Coverage gap

The record should name undercovered axes or families when relevant.

Possible values:

- `numeros`
- `algebra_y_funciones`
- `geometria`
- `probabilidad_y_estadistica`
- specific family ids such as `N_FAM_01`, `G_FAM_01`, `PE_FAM_01`

This prevents the selector from overfitting only to the current algebra/functions corridor.

## 13. Next action types

### study_load

A normal activity visible to the student.

### special_action

A future non-standard learning action such as guided error review or reflective closure.

### cycle_milestone

A checkpoint, mini-ensayo, short challenge, or cycle closure event.

### review_request

An asynchronous request for supervisor/expert review. This should normally include a safe fallback next action.

## 14. Fallback requirement

Every decision must include a fallback.

Examples:

- If selected next content is unavailable, use a safe prerequisite load.
- If evidence is insufficient, use a low-friction hold load.
- If operator review is pending, continue with safe rule-based path.
- If monotony risk is high, spiral to a low-friction non-algebra node.

This protects student continuity.

## 15. Example records

### Example 1 — Advance from equations to context

```json
{
  "currentContentKey": "paes_m1_linear_equations_basic",
  "currentTaxonomyNode": "AF_EQ_02",
  "evidenceSummary": {
    "answeredCount": 4,
    "correctCount": 4,
    "itemPattern": "all_correct",
    "notableErrors": []
  },
  "selfReport": {
    "value": "Me fue bien",
    "interpretation": "positive"
  },
  "pedagogicalSignals": {
    "evidenceStrength": "strong",
    "prerequisiteRisk": "low",
    "monotonyRisk": "low",
    "coverageGap": ["geometria", "probabilidad_y_estadistica"],
    "noveltyTolerance": "medium",
    "confidenceSignal": "positive"
  },
  "decision": {
    "decisionType": "advance",
    "nextActionType": "study_load",
    "nextTaxonomyNode": "AF_EQ_04",
    "nextContentKey": "paes_m1_linear_equations_word_problems",
    "rationale": "Strong equation evidence supports moving to contextual equation modeling.",
    "fallbackIfUnavailable": "Use AF_EQ_02 bridge load with one context item.",
    "asyncReviewRequested": false,
    "operatorBlocking": false
  }
}
```

### Example 2 — Redirect from equation errors to rational-number prerequisite

```json
{
  "currentContentKey": "paes_m1_linear_equations_basic",
  "currentTaxonomyNode": "AF_EQ_02",
  "evidenceSummary": {
    "answeredCount": 4,
    "correctCount": 1,
    "itemPattern": "repeated_fraction_or_sign_errors",
    "notableErrors": ["sign_error", "fraction_coefficient_error"]
  },
  "selfReport": {
    "value": "Me costo",
    "interpretation": "negative"
  },
  "pedagogicalSignals": {
    "evidenceStrength": "weak",
    "prerequisiteRisk": "high",
    "monotonyRisk": "medium",
    "coverageGap": ["numeros"],
    "noveltyTolerance": "low",
    "confidenceSignal": "negative"
  },
  "decision": {
    "decisionType": "redirect",
    "nextActionType": "study_load",
    "nextTaxonomyNode": "N_RAT_02",
    "nextContentKey": "future_numbers_rational_operations_basic",
    "rationale": "Equation errors appear driven by rational-number prerequisite weakness, not only algebra structure.",
    "fallbackIfUnavailable": "Use AF_EQ_01 low-friction confidence-restoration load.",
    "asyncReviewRequested": true,
    "operatorBlocking": false
  }
}
```

### Example 3 — Spiral to avoid algebra monotony

```json
{
  "currentContentKey": "paes_m1_linear_equations_reinforcement",
  "currentTaxonomyNode": "AF_EQ_02",
  "evidenceSummary": {
    "answeredCount": 4,
    "correctCount": 2,
    "itemPattern": "mixed_after_reinforcement",
    "notableErrors": ["context_translation"]
  },
  "selfReport": {
    "value": "Me fue bien",
    "interpretation": "positive"
  },
  "pedagogicalSignals": {
    "evidenceStrength": "mixed",
    "prerequisiteRisk": "medium",
    "monotonyRisk": "high",
    "coverageGap": ["geometria", "probabilidad_y_estadistica"],
    "noveltyTolerance": "medium",
    "confidenceSignal": "positive"
  },
  "decision": {
    "decisionType": "spiral",
    "nextActionType": "study_load",
    "nextTaxonomyNode": "PE_DATA_01",
    "nextContentKey": "future_data_representation_entry",
    "rationale": "Repeated algebra reinforcement risks monotony; use low-friction data representation to preserve momentum and coverage.",
    "fallbackIfUnavailable": "Use G_AREA_01 basic geometry measurement load.",
    "asyncReviewRequested": true,
    "operatorBlocking": false
  }
}
```

## 16. MVP-Beta operating mode

In MVP-Beta, decision records may be:

- written in documentation;
- created manually by supervisor;
- generated by a simple script later;
- stored in admin notes later;
- used by a rule-based selector later.

They should not yet be treated as autonomous AI decisions.

## 17. Future implementation path

Possible later phases:

1. Add decision record schema or audit-log payload proposal.
2. Add taxonomy metadata to content registry.
3. Add rule-based selector output shaped like this record.
4. Add admin review surface.
5. Add tutor-agent proposal generation with audit trail.

Implementation should wait until content metadata and expert review checklist are clearer.

## 18. Guardrails

- No PAES score claims.
- No theta claims.
- No mastery claims.
- No adaptive AI claims in MVP-Beta.
- No hidden operator gate.
- Always include fallback.
- Preserve student continuity.
- Treat this as a decision support artifact until implementation is explicitly scoped.

## 19. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2D - Expert review checklist for PAES_M1 roadmap`

Purpose:

- create a checklist for expert review of taxonomy, active slices, decision records, anti-monotony rules, and first content corridors.

Alternative:

`MVP-SRA-ROADMAP-2E - Content metadata proposal for taxonomy-aligned StudyLoads`

Recommended order:

1. Expert review checklist.
2. Content metadata proposal.
3. Early non-algebra slice proposals.
4. Rule-based selector prototype.

## 20. Handoff requirements

Future handoffs must preserve:

- decision record format exists and is upstream of selector implementation;
- next-load choice must be auditable;
- every decision needs rationale and fallback;
- async review does not normally block student continuity;
- selector must use taxonomy/evidence/coverage/monotony, not just contentKey sequence;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
