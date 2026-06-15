# MVP-GOV-PAES-M2-PEDAGOGICAL-BLUEPRINT-ALIGNMENT-1

## Purpose

Document the accepted PRO decision for PAES_M2 pedagogical blueprint alignment before creating or aligning `Program PAES_M2`.

This phase freezes the rule that a Bexauri Program/tutoring is not only a technical row. It represents a pedagogical contract derived from the canonical pedagogical layer. Therefore PAES_M2 must first have an explicit program-specific pedagogical contract before local/dev Program data, StudentAccess, enrollment, initial StudyLoad, or human smoke can be enabled.

## Baseline

Expected live baseline:

```text
HEAD = origin/main = origin/HEAD = b044921eaf132fd408c8c53bb0d407bb26736063
```

## Preflight result

Preflight passed.

```text
git status --short: clean
git rev-parse HEAD: b044921eaf132fd408c8c53bb0d407bb26736063
git rev-parse origin/main: b044921eaf132fd408c8c53bb0d407bb26736063
git rev-parse origin/HEAD: b044921eaf132fd408c8c53bb0d407bb26736063
```

Current log head reviewed:

```text
b044921 MVP-SALES-PILOT-M2: prepare local dev C01 access
```

## Source documents read

Canonical pedagogical hierarchy:

- `nextjs_space/docs/operations/BPCPI_BLUEPRINT_CANONICO_CAPA_PEDAGOGICA_IDEAL.md`
- `nextjs_space/docs/operations/BPTT_BLUEPRINT_PEDAGOGICO_TACTICO_TRANSVERSAL.md`
- `nextjs_space/docs/operations/BPTT_ROADMAP_AND_LIVING_MICROROADMAP_TRANSVERSAL_CONTRACT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_PRECONTRACT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md`
- `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md`
- `nextjs_space/docs/operations/CPA_RECONCILIATION_AUDIT_1R_SOURCE_GROUNDED.md`

Recent M2 chain:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_ROADMAP_PAES_M2_L1_AUTHORED_MINIMUM_SCOPE_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_AUTHORED_READINESS_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_AUTHORED_IMPLEMENT_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_STATIC_REVIEW_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C01_HUMAN_UI_SMOKE_READINESS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_HUMAN_UI_SMOKE_ACCESS_DIAGNOSIS_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C01_LOCAL_DEV_ENROLLMENT_ACCESS_PREP_1.md`

Recent standards:

- `nextjs_space/docs/operations/MVP_GOV_PAES_CAPSULE_PEDAGOGICAL_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_VISUAL_STIMULUS_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_PAES_FIGURE_SPEC_AND_QA_STANDARD_1.md`
- `nextjs_space/docs/operations/MVP_GOV_ROADMAP_PAES_VISUAL_STIMULUS_AUTHORED_AGENTIC_ALIGNMENT_1.md`
- `nextjs_space/docs/operations/MVP_GOV_CODEX_PRO_PHASE_PROMPT_GOLDEN_RULE_1.md`

Required context search was executed across `PHASE_LOG.md` and `nextjs_space/docs`.

## Documentary hierarchy

PAES_M2 must follow this documentary hierarchy:

```text
BPCPI
-> BPTT
-> roadmap/master roadmap/microroadmap contract
-> PAES_M2-specific pedagogical contract
-> Program PAES_M2
-> access/enrollment
-> StudyLoad/Capsule
-> human smoke
```

Interpretation:

- BPCPI defines the ideal pedagogical director and system-level invariants.
- BPTT translates those invariants into the common grammar of a Bexauri tutoring.
- The roadmap/microroadmap contract prevents confusing a simple sequence with a governed tutoring roadmap.
- PAES_M2 requires its own pedagogical contract before technical activation.
- Program/access/enrollment/StudyLoad are implementation surfaces downstream of that contract.

## Direction formula

Accepted operating formula:

```text
Modelo ampliado dirige.
PRO disena y decide fases pedagogicas/roadmap.
Codex documenta en repo y ejecuta fases tecnicas acotadas.
```

This means Codex must not infer the PAES_M2 tutoring contract from a missing DB row, a smoke blocker, or a single implemented capsule. Codex documents accepted direction and executes bounded technical phases after the pedagogical/roadmap decision exists.

## Program creation rule

```text
PROGRAM_CREATION_PEDAGOGICAL_BLUEPRINT_FIRST
```

Rule:

```text
Before creating or aligning a Program/tutoring, the canonical pedagogical blueprint must be read and a program-specific pedagogical contract must be documented.

Only after that contract may the project enable Program row, StudentAccess, Enrollment, StudentProgramInstance, initial StudyLoad and human smoke.
```

Operational consequence:

- Program creation is not an emergency workaround for UI smoke.
- Program metadata must represent a pedagogically defined tutoring.
- Access/enrollment must follow the tutoring contract, not define it retroactively.
- A missing local/dev row can trigger diagnosis, but not bypass pedagogical governance.

## Why Program PAES_M2 must wait

```text
Program PAES_M2 must not be created as a merely technical row to unblock smoke. A Bexauri Program/tutoring represents a pedagogical contract, not just a database entity.
```

The prior local/dev access prep correctly stopped because `PAES_M2` was absent from the local/dev Program table. This phase clarifies why the next step is not simply "insert PAES_M2":

- PAES_M2 must inherit BPCPI and BPTT principles.
- PAES_M2 must define what its tutoring experience means.
- PAES_M2 must state its evidence, feedback, review, continuity and limit rules.
- PAES_M2 must not be activated as a shell that only exists to host one capsule.
- M2-C01 can validate part of the content/rendering circuit, but it cannot define the whole tutoring by itself.

## PAES_M2 pedagogical contract

```text
program/tutoring: PAES_M2
type: test-oriented / PAES Matematica
purpose: guided M2 preparation through authored capsules, interpretable evidence, useful feedback, self-report, review and justified continuity
user: PAES student requiring M2 guided practice
scope: MVP cerrado / future Sales-Ready verification path, not public Sales-Ready yet
limits: no full PAES_M2 coverage claim, no score prediction, no mastery, no adaptive AI, no complete readiness claim
structure: capsules/StudyLoads with purpose, evidence, feedback, review and continuity
cycle relation: sequence/cycle must be pedagogically justified
feedback relation: brief/complete authored feedback, not key-check-only
visual/math relation: obey PAES visual stimulus and FigureSpec standards
continuity relation: no simulated adaptation; continuity must be documented
evidence/self-report relation: evidence is useful but limited; self-report supports metacognition
roadmap relation: M2-C01 may be part of a simple initial sequence; master roadmap M2 requires later source-grounded coverage work
```

Derived implications:

- PAES_M2 is a test-oriented Bexauri tutoring, not a static item bank.
- Its capsules must be minimal, sufficient and closable.
- M2 item count follows the living PAES standard: 3 or 4 exercises depending on cognitive load, maximum 4.
- Each implemented item must have defensible keying and authoredFeedback brief/complete.
- Visual, graph, table, geometry, image and math-render dependencies must be classified before student-facing implementation.
- Any continuity from one M2 capsule to another must declare whether it is a simple sequence, a roadmap step, or a later microroadmap decision.
- Evidence from selected answers and self-report is useful but limited; it must not become a claim of mastery, score, complete readiness, or adaptive diagnosis.

## MVP cerrado / Sales-Ready scope correction

Required correction:

```text
MVP cerrado for M1/M2/L1 must not be described as merely limited/minimal. It is the closed validation scope that verifies whether the platform has everything required to move toward MVP Sales-Ready.

This does not mean full PAES universe coverage or public Sales-Ready claims. It means the closed MVP must be complete enough to validate the intended Sales-Ready product promise across M1/M2/L1.

Seeds and first capsules are implementation steps, not the final definition of closed MVP scope.
```

Interpretation:

- Prior "minimum scope" and "seed" documents are implementation-planning thresholds.
- They do not redefine the closed MVP as a small or merely symbolic product.
- Closed MVP is not public Sales-Ready.
- Closed MVP must still be complete enough to test whether the future Sales-Ready promise can be sustained across M1/M2/L1.
- M2-C01 is a seed artifact and circuit proof candidate, not the final PAES_M2 tutoring scope.

## Relationship to M2-C01 already implemented

M2-C01 status:

```text
MVP-CONTENT-PAES-M2-C01-AUTHORED-IMPLEMENT-1
PAES_M2_C01_AUTHORED_IMPLEMENTED

MVP-CONTENT-PAES-M2-C01-STATIC-REVIEW-1
PAES_M2_C01_STATIC_REVIEW_PASSED

MVP-CONTENT-PAES-M2-C01-HUMAN-UI-SMOKE-READINESS-1
PAES_M2_C01_HUMAN_UI_SMOKE_READINESS_READY
```

Contract relationship:

```text
M2-C01 is accepted as the first authored PAES_M2 artifact and has passed static review, but it does not by itself make PAES_M2 a complete tutoring, closed MVP ready, Sales-Ready or agentic-ready.
```

M2-C01 remains useful because it proves:

- a first authored PAES_M2 content artifact exists;
- the capsule can use plain text/simple notation without visual/math blocker;
- authoredFeedback brief/complete can be written to standard;
- static review found no key/content, leakage, visual/math or feedback blocker.

M2-C01 does not prove:

- PAES_M2 Program data is aligned;
- M2 access/enrollment is available;
- M2 route/continuity is complete;
- PAES_M2 roadmap coverage is complete;
- closed MVP triad scope is complete;
- public Sales-Ready, M2 readiness, score prediction, mastery or adaptive AI.

## Conditions before Program PAES_M2 alignment

Before a technical Program alignment phase may proceed:

- PAES_M2 pedagogical blueprint alignment accepted;
- local/dev only;
- no prod/staging;
- no schema/Prisma;
- no payment/subscription;
- no route-order/continuity unless later scoped;
- no M2-C01 content changes;
- no agentic;
- PAES_M2 Program metadata should mirror PAES_M1 pattern where applicable.

Additional safety:

- Program alignment must not create enrollment by default unless separately scoped.
- StudentAccess must remain separate unless explicitly authorized.
- Any initial StudyLoad must be justified as part of a smoke/access prep phase, not hidden inside Program alignment.
- If Program metadata needs product copy, visibility, pricing, subscription or dashboard behavior, those decisions must be separately scoped.

## Safe technical route after this phase

Recommended route:

```text
1. MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-ALIGNMENT-1
2. MVP-SALES-PILOT-M2-C01-LOCAL-DEV-ENROLLMENT-ACCESS-PREP-2
3. MVP-CONTENT-PAES-M2-C01-HUMAN-UI-SMOKE-CLOSEOUT-1
```

Phase intent:

1. Align only local/dev PAES_M2 Program data under this pedagogical contract.
2. Prepare only the minimum local/dev enrollment/access/cycle/StudyLoad condition needed for M2-C01 reachability.
3. Record human UI smoke evidence for the already implemented M2-C01 capsule.

## Explicit non-goals

- no Program PAES_M2 creation in this phase;
- no DB mutation;
- no code changes;
- no UI changes;
- no registry/content changes;
- no route-order/continuity changes;
- no schema/Prisma;
- no prod/staging;
- no payment/subscription;
- no agentic.

## Scope safety

This phase is documentary/governance only.

Not performed:

- no Program row creation or alignment;
- no StudentAccess change;
- no enrollment or StudentProgramInstance creation;
- no LearningCycle or StudyLoad creation;
- no DB mutation;
- no code/UI/API/schema/Prisma changes;
- no seed script or fixture mutation;
- no route-order/continuity changes;
- no study-load-content registry changes;
- no M2-C01 content/authoredFeedback/visual stimulus/key/item/stem/option/tableStimulus changes;
- no build;
- no browser automation;
- no API-only tests;
- no production/staging;
- no secrets printed.

## Result

```text
PAES_M2_PEDAGOGICAL_BLUEPRINT_ALIGNMENT_ACCEPTED
```

## Next recommended phase

```text
MVP-SALES-PILOT-M2-C01-LOCAL-DEV-PAES-M2-PROGRAM-DATA-ALIGNMENT-1
```

Purpose:

```text
Align the local/dev PAES_M2 Program row under the accepted pedagogical contract, without production/staging, DB reset, schema/Prisma changes, route-order/continuity changes, M2-C01 content changes, StudentAccess/enrollment mutation, payment/subscription changes, or agentic behavior.
```
