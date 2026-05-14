# MVP-SRA-IMPL-4R - PE1-MSL-01 Registry Activity Readiness Before Implementation

## 1. Phase Purpose

Prepare `PE1-MSL-01` for safe future registry implementation as the first non-algebra PAES_M1 activity.

This phase keeps implementation blocked until Mauricio explicitly authorizes:

```text
MVP-SRA-IMPL-4 - Add PE1-MSL-01 registry activity
```

The purpose is to prevent AS1 from becoming the universal route by preparing a low-risk non-algebra complement, without changing code, registry content, selector behavior, runtime behavior, UI, API, schema, database, deployment, or production.

This document is readiness/specification only. It does not implement PE1.

## 2. Live Baseline

Git preflight before this phase showed:

- HEAD = origin/main = `689b1bc`.
- Last accepted commit = `MVP-SRA-IMPL-3: add pedagogical decision record helper`.
- Working tree expected clean.

Git preflight remains the live source of truth. If embedded baselines in older docs or `PHASE_LOG.md` are stale, Git wins.

## 3. Why PE1-MSL-01 Next

AS1 algebra/functions is available, locally useful, and operationally valuable, but it is not universal and is not the complete PAES_M1 roadmap.

`PE1-MSL-01 - Lectura de tablas y gráficos` is a safe first non-algebra complement because it introduces table and graph reading with low prerequisite burden. It broadens PAES_M1 evidence beyond algebra without requiring a long simulation, heavy calculation, or advanced probability rules.

PE1-MSL-01 must not be framed as:

- a detour every student must take;
- a gate before continuing AS1;
- a complete PE1 path;
- full PAES_M1 coverage;
- diagnostic placement;
- PAES score, theta, mastery, or adaptive AI evidence.

The first implementation should be registry-matched only. It should not be automatically routed until a later phase explicitly authorizes selector or continuity behavior.

## 4. Proposed Activity Identity

Future registry identity:

- Title: `PAES M1 — Lectura de tablas y gráficos`
- contentKey: `paes_m1_data_representation_entry`
- contentVersion: `v1`
- program: `PAES_M1`
- sliceId: `PE1`
- sliceName: `PE1 data and probability entry`
- axis: `data_probability`
- difficultyBand: `entry`
- primaryPurpose: `bridge`
- evidenceType: `mc_submission`
- reviewStatus: `internal_provisional`
- expertReviewed: `false`
- routingStatus: `available_not_universal`

`primaryPurpose: bridge` is the conservative choice because this activity should connect the current AS1-heavy registry toward broader PAES_M1 representation evidence without claiming validation of PE1 readiness or coverage.

Current metadata type constraints in `nextjs_space/lib/study-load-content.ts` do not yet allow these PE1 values. Future IMPL-4 should make only the narrow type additions required:

- `sliceId` add `'PE1'`.
- `axis` add `'data_probability'`.

Do not add N1 or G1 type values in IMPL-4 unless that phase is explicitly broadened.

## 5. Proposed Content Requirements

Safe v1 activity requirements:

- 6 to 8 multiple-choice items.
- Tables and simple graphs only.
- No calculator-heavy tasks.
- No long PAES simulation.
- No PAES score claim.
- No automatic diagnosis.
- Stable item keys: `q1` through `qN`.
- Four options per item: `A`, `B`, `C`, `D`.
- Correct option keys present for all items.
- Student-facing copy must say responses are evidence for review, not PAES score.
- Content should work inside the existing static StudyLoad viewer without UI changes.

Avoid in v1:

- ambiguous graph scales;
- multi-table traps;
- dense reading passages;
- advanced probability rules;
- hidden multi-step arithmetic;
- claims that completion proves PE mastery.

## 6. Pedagogical Intent

PE1-MSL-01 should observe whether the student can:

- read a direct value from a table;
- compare two values;
- identify a trend in a simple graph;
- interpret category/frequency information;
- compute a simple average or total only when the arithmetic is low-risk;
- choose a supported conclusion from a table or graph.

The activity should avoid ambiguous graphs or multi-step traps in v1. Its role is to collect low-friction evidence about data representation and interpretation, not to certify mastery.

## 7. Non-Goals

This readiness phase and the future first registry implementation must not include:

- selector change;
- automatic routing from AS1 to PE1;
- StudyLoad DB creation;
- admin UI change;
- student UI change;
- API change;
- schema/database change;
- continuity map change;
- expert validation claim;
- mastery claim;
- PAES score claim;
- theta claim;
- automatic diagnosis;
- adaptive AI claim.

## 8. Future Implementation Plan

Future phase:

```text
MVP-SRA-IMPL-4 - Add PE1-MSL-01 registry activity
```

Expected future files:

- `nextjs_space/lib/study-load-content.ts`
- `PHASE_LOG.md`

Expected future implementation:

- Add one static registry entry for `PAES M1 — Lectura de tablas y gráficos`.
- Add PE1 metadata to that entry.
- Narrowly expand metadata types for `sliceId: 'PE1'` and `axis: 'data_probability'`.
- Preserve existing exports and lookup behavior.
- Do not wire PE1 into continuity selection.
- Do not create StudyLoad rows.

Expected future verification:

- `npm.cmd run build` from `nextjs_space`.
- No selector behavior changed.
- No DB/schema changes.
- Registry lookup by title works through existing title lookup behavior.
- Registry lookup by `contentKey` works through existing content-key lookup behavior.
- `contentVersion: 'v1'` remains stable.

## 9. Risk Review

Known risks:

- accidentally making PE1 an automatic route too early;
- overclaiming roadmap coverage from one data-reading activity;
- confusing evidence with diagnosis;
- weakening the AS1-is-available-not-universal principle by replacing one fixed path with another;
- expanding metadata types too broadly instead of making the narrow PE1 additions;
- adding graph/table content that requires UI work;
- using item difficulty that is too trivial to be useful or too complex for a first non-algebra bridge.

Controls:

- keep PE1 registry-only in IMPL-4;
- keep `routingStatus: available_not_universal`;
- use `reviewStatus: internal_provisional`;
- keep `expertReviewed: false`;
- include no PAES score, theta, mastery, diagnosis, or adaptive AI claims;
- defer continuity and selector behavior to a separately authorized phase.

## 10. Decision After 4R

Valid next paths:

A. Stop after readiness.

B. Ask an expert to review the PE1-MSL-01 spec before implementation.

C. Explicitly authorize `MVP-SRA-IMPL-4 - Add PE1-MSL-01 registry activity`.

D. Defer PE1 and continue documentation.

This 4R phase does not authorize IMPL-4 by itself.
