# MVP-SRA-SCOPE-5 - Construction Restart Options and Readiness Review

## 1. Purpose

Review whether Bexauri should return to implementation after the PAES_M1 pedagogical scope block, and if so, identify the safest first implementation slice.

This document does not restart construction. It compares restart options, evaluates readiness, and recommends a narrow implementation path only if future authorization is given.

This phase follows `MVP-SRA-SCOPE-4`, which defined the future tutor-agent governance model.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `933bcf7`
- Last accepted commit = `MVP-SRA-SCOPE-4: define future tutor-agent governance`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Scope-first result so far

The scope-first documentation block established:

- Bexauri PAES_M1 is guided, evidence-aware roadmap traversal, not a static content sequence.
- AS1 algebra/functions is available, not universal.
- N1/G1/PE1 are proposed complements, not mandatory detours.
- Milestones are pedagogical synthesis and routing moments, not default gates.
- Operators improve quality asynchronously and do not normally gate continuity.
- Future tutor-agent is governed decision support, not autonomous pedagogical authority.
- Construction remains paused until a narrow implementation slice is selected.

## 4. Restart question

The key question is:

```text
If construction resumes, what is the safest, narrowest, most reversible implementation slice that strengthens the PAES_M1 pedagogical layer without collapsing it into AS1-only behavior or unsupported adaptive-AI claims?
```

## 5. Evaluation criteria

Each restart option should be evaluated by:

- pedagogical value;
- technical risk;
- reversibility;
- dependency on expert review;
- dependency on schema/runtime changes;
- impact on student experience;
- risk of overclaiming;
- risk of AS1 becoming universal;
- ability to preserve non-blocking continuity;
- usefulness for future selector/agent work;
- ability to validate locally before production.

## 6. Option A - Metadata pass for current registry content, documentation only

Description:

Document detailed metadata for existing registry activities without changing runtime registry code.

Targets:

- Balanced entry.
- Ecuaciones lineales basicas.
- Problemas con ecuaciones lineales.
- Refuerzo de ecuaciones lineales.
- Funciones lineales basicas.

Pedagogical value:

- High for alignment.
- Clarifies evidence purpose, prerequisites, fallback, and anti-monotony.
- Reduces ambiguity before code changes.

Technical risk:

- Very low.

Reversibility:

- High.

Expert dependency:

- Low for internal provisional documentation.
- Expert review still needed before production-grade claims.

Risk:

- Could overinvest in AS1 if not paired later with non-algebra metadata.

Verdict:

- Safe, but still documentation rather than implementation.

## 7. Option B - Implement metadata fields in content registry for current activities

Description:

Add taxonomy/evidence metadata to `study-load-content.ts` or equivalent registry for existing activities.

Pedagogical value:

- High.
- Creates runtime-readable foundation for decision layer.

Technical risk:

- Medium-low if additive and typed carefully.

Reversibility:

- Medium-high if additive and no schema changes.

Expert dependency:

- Medium. Metadata may remain `not_reviewed` / provisional.

Risks:

- Prematurely hard-coding incomplete metadata.
- AS1 could appear more canonical than intended.
- Requires careful guardrails and local build validation.

Verdict:

- Plausible first implementation later, but only after a very narrow spec.

## 8. Option C - Implement one non-algebra StudyLoad slice

Description:

Add one first non-algebra activity, likely one of:

- N1-MSL-03 — Porcentajes y proporcion inicial.
- G1-MSL-01 — Area y perimetro basico.
- PE1-MSL-01 — Lectura de tablas y graficos.

Pedagogical value:

- High for breadth.
- Helps prevent AS1 overconcentration.

Technical risk:

- Medium.

Reversibility:

- Medium.

Expert dependency:

- Medium-high if used beyond internal provisional testing.

Risks:

- Could create content before metadata/decision integration is ready.
- Requires item quality, answer key accuracy, UI validation, and local test flow.

Verdict:

- Valuable, but likely should follow metadata alignment or expert review packet usage.

## 9. Option D - Decision record prototype, documentation/admin-only

Description:

Create a non-runtime or admin-note prototype for next-load decision records.

Pedagogical value:

- High for auditability.
- Helps future selector and operator review.

Technical risk:

- Medium if implemented in UI/data; low if kept as documentation/manual note.

Reversibility:

- High if documentation/manual.
- Lower if schema is introduced too soon.

Expert dependency:

- Medium.

Risks:

- Premature schema or admin surface.
- More internal tooling than student-facing value.

Verdict:

- Good candidate only if kept schema-free and documentation/manual first.

## 10. Option E - Very limited rule-based selector prototype

Description:

Implement a narrow selector that chooses next action based on metadata/evidence.

Pedagogical value:

- High long-term.

Technical risk:

- Medium-high.

Reversibility:

- Medium.

Expert dependency:

- High unless explicitly internal-provisional.

Risks:

- Premature automation.
- Hidden decision logic.
- AS1-only bias.
- Unsupported adaptive-AI perception.
- Requires metadata and fallback maturity.

Verdict:

- Not recommended as first restart slice.

## 11. Option F - Operator review surface or workflow

Description:

Implement or document workflow for operators to review evidence and decisions.

Pedagogical value:

- Medium-high.

Technical risk:

- Medium if UI implementation.

Reversibility:

- Medium.

Expert dependency:

- Low-medium.

Risks:

- Could make operator review feel like a gate.
- Might distract from student-facing continuity.

Verdict:

- Not first implementation unless strictly non-blocking and narrow.

## 12. Option G - Maintain construction pause until expert review

Description:

Do not resume implementation. Seek expert review first.

Pedagogical value:

- High for quality assurance.

Technical risk:

- Very low.

Reversibility:

- High.

Expert dependency:

- Intentional.

Risks:

- Slows product progress.
- May delay internal validation.

Verdict:

- Best if external/paid beta is imminent.
- Not strictly necessary for internal provisional documentation or very low-risk implementation later.

## 13. Comparative summary

| Option | Value | Risk | Recommended now? | Notes |
|---|---:|---:|---|---|
| A Metadata pass, docs only | High | Very low | Yes, if continuing documentation | Strengthens clarity without construction. |
| B Registry metadata implementation | High | Medium-low | Later, with narrow spec | Best first code candidate after docs. |
| C One non-algebra StudyLoad | High | Medium | Later | Useful but needs metadata and quality checks. |
| D Decision record prototype | High | Low-Medium | Maybe documentation-only | Avoid schema too soon. |
| E Rule-based selector | High | Medium-high | No | Too early. |
| F Operator review surface | Medium-high | Medium | Not first | Risk of perceived gate. |
| G Wait for expert review | High QA | Very low | If external beta soon | Slower but safest. |

## 14. Recommended first implementation slice later

When construction resumes, the safest first implementation candidate is:

```text
Add taxonomy-aligned metadata to existing registry activities in a purely additive way, without changing student flow or selection logic.
```

Proposed future phase name:

`MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities`

Why this is safest:

- additive;
- no student-facing behavior change;
- no selector yet;
- no new content quality burden;
- supports future decision records;
- preserves AS1 constraints if metadata includes assignment limits;
- can be validated by typecheck/build/local inspection.

Required guardrails:

- no selector logic;
- no runtime behavior change;
- no schema/database change;
- metadata marked provisional / expert review pending;
- no claims to student;
- no AS1 universal routing;
- no deploy unless separately authorized.

## 15. Recommended next documentation slice before implementation

Before implementing `MVP-SRA-IMPL-1`, it is safer to create:

```text
MVP-SRA-SCOPE-5A - Implementation spec for provisional registry metadata
```

Purpose:

- define exact metadata field names;
- define allowed enum values;
- identify which existing registry entries get metadata;
- specify no behavior change;
- specify verification steps;
- specify rollback path;
- specify expert-review pending status.

This would convert the restart recommendation into an implementation-ready spec without yet editing code.

## 16. Not authorized by this phase

This phase does not authorize:

- code changes;
- registry changes;
- selector logic;
- new StudyLoads;
- schema/database changes;
- admin UI;
- production deploy;
- tutor-agent implementation;
- external beta expansion;
- PAES score, theta, mastery, or adaptive AI claims.

## 17. Construction restart gate

Construction may resume only when a later phase explicitly accepts:

- target implementation slice;
- file scope;
- expected behavior change or no behavior change;
- verification commands;
- rollback plan;
- guardrails;
- commit/push authorization flow.

Recommended gate before implementation:

```text
MVP-SRA-SCOPE-5A accepted -> MVP-SRA-IMPL-1 may be prepared.
```

## 18. Final recommendation

Do not jump directly to implementation.

Proceed with:

```text
MVP-SRA-SCOPE-5A - Implementation spec for provisional registry metadata
```

Then decide whether to implement:

```text
MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities
```

This preserves the scope-first decision while giving the project a safe path back to construction.

## 19. Handoff requirements

Future handoffs must preserve:

- SCOPE-5 reviewed restart options but did not authorize implementation;
- recommended future implementation is additive registry metadata, not selector logic;
- SCOPE-5A spec should come before code;
- AS1 remains available, not universal;
- N1/G1/PE1 remain proposals, not implemented routes;
- expert review remains pending unless later documented;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
