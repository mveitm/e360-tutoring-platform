# MVP-SRA-IMPL-5R - Readiness for Minimal Rule-Based Next-Load Policy

## 1. Phase Purpose

Prepare future `MVP-SRA-IMPL-5` safely before any selector or continuity implementation.

This phase defines the minimum rule-based next-load policy that could later use existing pedagogical metadata and the new PE1 registry activity without turning PE1 into an automatic universal route.

The goal is to avoid accidental selector expansion while preserving student continuity. Operator or expert review must remain parallel and useful, not a gate that blocks normal student progression.

This phase is documentation/readiness only. It does not change code, registry content, selector behavior, continuity maps, runtime behavior, UI, API, schema, database, deployment, or production.

## 2. Live Baseline

Git preflight before this phase showed:

- HEAD = origin/main = `b3de1c8`.
- Last accepted commit = `MVP-SRA-IMPL-4: add PE1 registry activity`.
- Working tree expected clean.

Git preflight remains the live source of truth. If embedded baselines in older docs or `PHASE_LOG.md` are stale, Git wins.

## 3. Current Implementation State

Current accepted implementation sequence:

- IMPL-1 added provisional pedagogical metadata to current PAES_M1 registry activities.
- IMPL-2 added pure metadata/evidence helper functions.
- IMPL-3 added a non-invasive decision record helper.
- IMPL-4 added `PE1-MSL-01 - PAES M1 — Lectura de tablas y gráficos` as one static registry activity.

Current status:

- PE1 exists in the static registry.
- PE1 has provisional metadata with `routingStatus: available_not_universal`.
- PE1 is not routed automatically.
- No selector behavior has changed yet.
- No continuity map includes PE1 yet.
- No UI, API, schema, database, deployment, or production behavior has changed for PE1 routing.

## 4. Why IMPL-5 Needs Readiness First

IMPL-5 would touch the sensitive boundary between content availability and student progression.

A poor selector or overly broad continuity change can create:

- false adaptivity claims;
- hidden gates;
- fixed routes that contradict the AS1-available-not-universal principle;
- PE1 as a mandatory detour;
- operator review as an implicit bottleneck;
- confusing evidence with diagnosis.

The future policy must remain minimal, auditable, reversible, and honest. The goal is not AI adaptivity. The goal is safe rule-based continuity that preserves the current working AS1 flow while opening a narrow path to PE1 only when explicitly appropriate.

## 5. Current Continuity Audit

Current continuity code lives in:

```text
nextjs_space/lib/study-load-continuity.ts
```

Current selection mechanism:

- `NEXT_STUDYLOAD_BY_PROGRAM_AND_CONTENT_KEY` is a static rule map.
- For `PAES_M1`, it currently maps:
  - `paes_m1_balanced_entry_initial` -> `paes_m1_linear_equations_basic`
  - `paes_m1_linear_equations_basic` -> `paes_m1_linear_equations_word_problems`
  - `paes_m1_linear_equations_word_problems` -> `paes_m1_linear_equations_reinforcement`
  - `paes_m1_linear_equations_reinforcement` -> `paes_m1_linear_functions_basic`
- There is no PE1 map entry.
- `paes_m1_linear_functions_basic` is currently an end of sequence under the map.

Current completion behavior lives in:

```text
nextjs_space/app/api/study-loads/[id]/complete/route.ts
```

After a StudyLoad is completed:

- the completion transaction marks the StudyLoad completed;
- it completes the active TutoringSession;
- it creates one minimal Response row for self-report evidence;
- it updates the enrollment activity timestamp;
- after the completion transaction, it runs a best-effort continuity transaction;
- that continuity transaction calls `prepareNextStudyLoadAfterCompletion`;
- if the static map has a safe next content key and no matching active/completed load exists, it creates a new pending StudyLoad row.

Current risks if changed:

- adding PE1 directly to the static map could route every student at an AS1 endpoint into PE1;
- creating DB rows is already part of current continuity behavior, so any future selector change directly affects student progression;
- route changes could silently change student/admin experience even without UI edits;
- decision records must not be persisted unless persistence shape and ownership are explicitly authorized.

What must remain unchanged in IMPL-5 unless explicitly authorized:

- completion route response shape;
- transaction semantics for completion;
- existing AS1 progression where validated;
- no operator review gate;
- no UI/API/schema changes;
- no broad selector or AI behavior;
- no automatic PE1 route for every student.

## 6. Proposed Minimal Policy v0

These are conceptual rules only. This phase implements no code.

### Rule Family A - Existing AS1 Progression

- Preserve the current AS1 path where already validated.
- Do not weaken the existing working flow.
- Do not remove or reorder existing AS1 continuity edges unless a later phase explicitly authorizes that change.

### Rule Family B - End-of-AS1 Safe Bridge Candidate

- PE1 may become eligible only as a bridge after a safe AS1 endpoint or when no better AS1 continuation exists.
- PE1 must not be mandatory for every student.
- PE1 must not become a gate before continuing PAES_M1 work.
- PE1 eligibility should be framed as `bridge` or `spiral`, not diagnosis or mastery validation.

### Rule Family C - Fallback

- If no safe next load exists, do not invent content.
- Either leave no automatic next load or use the existing safe fallback, depending on current behavior and explicit future authorization.
- Missing metadata or missing registry content should not crash continuity.

### Rule Family D - Metadata Requirement

- Only registry activities with `pedagogicalMetadata.reviewStatus = internal_provisional` or better may be considered.
- Non-universal content must have `routingStatus: available_not_universal`.
- Missing metadata should prevent new policy selection unless a later phase defines a specific fallback.

### Rule Family E - Decision Record

- Future IMPL-5 should create or compute a decision record using the IMPL-3 helper.
- Persistence is a separate decision.
- If persisting a decision record changes DB shape, snapshot payload shape, route responses, or admin/student-visible data, that must be separately authorized.

## 7. Decision Record for Future IMPL-5

A future rule-based decision should describe:

- `fromContentKey`, `fromTitle`, and `fromContentVersion`;
- `toContentKey`, `toTitle`, and `toContentVersion`, or `null`;
- `decisionType`;
- `basis`;
- metadata status;
- review status and expert-reviewed status;
- limitations;
- no PAES score, theta, mastery, diagnosis, or adaptive AI claim.

Current IMPL-3 limitation:

```text
does_not_change_existing_continuity_selection
```

If IMPL-5 actually changes selection, that limitation should be removed and replaced with an honest limitation such as:

```text
rule_based_selection_v0
```

That change should be reviewed explicitly because it marks the point where the decision record no longer describes only the existing continuity behavior.

## 8. Non-Goals

IMPL-5R and a future minimal IMPL-5 must not imply:

- intelligent selector;
- AI tutor;
- adaptive AI;
- PAES score;
- theta;
- mastery;
- automatic diagnosis;
- operator review gate;
- broad PAES_M1 coverage claim;
- automatic PE1 route for all students;
- expert validation claim.

## 9. Future Implementation Plan

Future phase:

```text
MVP-SRA-IMPL-5 - Minimal rule-based next-load policy v0
```

Expected future files likely:

- `nextjs_space/lib/study-load-continuity.ts`
- `nextjs_space/lib/study-load-pedagogical-decision.ts` only if needed
- `PHASE_LOG.md`

Possibly not allowed in IMPL-5 unless explicitly broadened:

- API route changes;
- DB schema changes;
- UI changes;
- deploy/production;
- decision-record persistence;
- admin-facing decision views.

Expected verification:

- `npm.cmd run build` from `nextjs_space`.
- Existing AS1 flow remains intact.
- PE1 is not universal.
- No DB/schema changes.
- No UI/API behavior change unless explicitly authorized.
- No PAES score, theta, mastery, diagnosis, or adaptive AI claims.

## 10. Risk Review

Key risks:

- accidentally changing the current validated AS1 flow;
- routing every student to PE1;
- creating a hidden gate;
- overclaiming adaptivity;
- persisting decision records without explicit design;
- making operator review blocking;
- confusing evidence with diagnosis;
- creating a brittle selector that is hard to audit or reverse.

Controls:

- keep IMPL-5 minimal and rule-based;
- keep the policy content-key based unless a later phase explicitly expands inputs;
- preserve current AS1 edges;
- make PE1 eligible only under narrow, explicit conditions;
- keep decision records honest about rule-based selection;
- defer persistence and UI visibility to separate phases.

## 11. Decision After 5R

Valid next paths:

A. Stop after readiness.

B. Continue documentation.

C. Explicitly authorize `MVP-SRA-IMPL-5 - Minimal rule-based next-load policy v0` with narrow implementation scope.

D. Ask for expert/product review before implementing.

This 5R phase does not authorize IMPL-5 by itself.
