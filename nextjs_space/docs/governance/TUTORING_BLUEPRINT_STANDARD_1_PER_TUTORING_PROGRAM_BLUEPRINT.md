# Tutoring Blueprint Standard 1 - Per Tutoring Program Blueprint

## 1. Phase Identity And Scope

Phase:

`MVP-COMMERCIAL-TUTORING-BLUEPRINT-STANDARD-1 - Define per-tutoring blueprint standard`

Date:

2026-05-26

Type:

Documentation-only governance standard.

Purpose:

Define a reusable operating standard requiring every Bexauri tutoring program to have its own operational-pedagogical blueprint before meaningful implementation, optimization, audit, product-use, or Sales-Ready claims.

This standard applies to `PAES_M1`, `PAES_M2`, `PAES_L1`, and future tutorias.

## 2. Baseline And Context Gate Summary

Expected baseline:

```text
HEAD = origin/main = origin/HEAD = f8a932c
Latest accepted commit:
f8a932c - MVP-COMMERCIAL-L1-TUTORING-STANDARDS-BASELINE-1: extract M1 tutoring standards
```

Git preflight is the live source of truth if this embedded baseline becomes stale.

Context Gate sources read included:

* `PHASE_LOG.md` recent chain through `f8a932c`.
* `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.
* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`.
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`.
* `nextjs_space/docs/governance/AUTOPROPAGATING_HANDOFF_PROTOCOL_V2.md`.
* `nextjs_space/docs/product/PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md`.
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_TUTORING_STANDARDS_BASELINE_1_EXTRACT_M1_OPERATING_STRUCTURE.md`.
* M1/SRA/student journey/operator/future tutor-agent/continuity docs listed in the verification section.

No code inspection was needed. Existing documentation was sufficient to define the cross-program standard.

## 3. Explicit Boundary

This phase is:

* documentation-only;
* blueprint standard only;
* no code;
* no registry implementation;
* no DB;
* no API/runtime;
* no UI implementation;
* no student/product approval;
* no tutoring readiness approval;
* Sales-Ready blocked.

This standard does not create an M1, M2, L1, or future tutoring blueprint by itself. It defines the structure those future blueprints must use.

## 4. Why A Per-Tutoring Blueprint Standard Is Needed

Bexauri is not a single-content app. It is a tutoring system where each tutoring program has its own pedagogy, evidence profile, feedback model, continuity risk, source boundaries, and maturity path.

M1 is currently the strongest operating reference, but it must not become a pattern copied blindly into L1, M2, or later programs. M1 contains math-specific assumptions, continuity maps, metadata, item forms, and roadmap logic that are useful as reference but unsafe as universal templates.

This standard is needed because:

* each tutoring program has its own pedagogy, evidence, feedback, continuity, and risk profile;
* M1 should be a reference, not a blindly copied template;
* L1 and M2 need their own blueprints before meaningful optimization or readiness claims;
* future tutorias need a reusable birth protocol;
* Sales-Ready evaluation requires program-by-program evidence, not generic product optimism;
* future agents and Codex prompts need durable program memory before modifying a tutoring line.

## 5. Definition

A Tutoring Blueprint is a durable operational-pedagogical document for one Bexauri tutoring program.

It defines:

* what the tutoring program promises and does not promise;
* who it serves;
* how the student works;
* what counts as a learning unit;
* what content, feedback, evidence, and continuity mean for that program;
* how admin/tutor supervision works;
* how the program relates to the SRA, `/now`, dashboard, registry, and product gates;
* what is implemented, provisional, blocked, or not ready.

A blueprint is not:

* a code authorization;
* a registry entry;
* a product-use approval;
* a Sales-Ready approval;
* a substitute for tests;
* a promise that the tutoring program is operational.

## 6. Required Blueprint Sections

Every tutoring blueprint must include these sections.

### 6.1 Tutoring Identity

Required content:

* program code;
* student-facing name;
* internal name;
* PAES area or non-PAES domain;
* current product horizon;
* owner/status of the blueprint.

### 6.2 Student-Facing Promise

Required content:

* what the student should understand this tutoring program helps with;
* what kind of work the student will do;
* what kind of feedback or continuity the student can expect;
* how the promise stays calm, honest, and non-punitive.

### 6.3 Allowed Claims

Required content:

* claims that may appear in internal docs or student-facing copy;
* allowed scope language;
* allowed evidence language;
* allowed supervision language;
* allowed continuity language.

### 6.4 Prohibited Claims / No-Promises

Required content:

* no PAES score claim unless separately implemented and approved;
* no theta claim;
* no mastery claim without validated basis;
* no adaptive AI claim unless separately implemented and approved;
* no complete coverage claim unless the tutoring program actually supports it;
* no expert review claim unless operationally guaranteed;
* no Sales-Ready claim unless a separate Sales-Ready gate approves it.

### 6.5 Target Student Profile

Required content:

* intended student stage;
* prerequisite assumptions;
* known learner risks;
* excluded or unsupported student profiles;
* beta/closed-lab limitations if applicable.

### 6.6 Tutoring Scope

Required content:

* skill families or content domains;
* first active slice;
* future slices;
* coverage boundaries;
* out-of-scope areas;
* relation to the public offer, if any.

### 6.7 Unit Of Work / StudyLoad Model

Required content:

* StudyLoad size and shape;
* expected duration or workload range;
* item or task structure;
* self-report relationship;
* completion model;
* how micro-StudyLoad standards apply.

### 6.8 Content Model

Required content:

* content artifact types;
* source or authoring model;
* stable ids;
* versioning rules;
* review-state rules;
* program-specific metadata.

### 6.9 Feedback Model

Required content:

* feedback timing;
* feedback levels such as brief/complete where applicable;
* feedback source: generated, authored, reviewed, or hybrid;
* relationship between correctness and explanation;
* no-pre-submit-leak boundary;
* tone and student-facing guardrails.

### 6.10 Evidence Model

Required content:

* response data to preserve;
* correctness data where applicable;
* content identity;
* item/task identity;
* feedback identity if applicable;
* self-report;
* summary evidence;
* what evidence must not imply.

### 6.11 Continuity Model

Required content:

* whether continuity exists;
* whether it is rule-based, manual, no-continuity, or future-content-chain based;
* explicit fallback when no next activity exists;
* no ordinary admin/tutor gate unless separately authorized;
* relation to other active tutoring programs;
* no fake continuity.

### 6.12 Admin/Tutor Supervision Model

Required content:

* what admin/tutor can see;
* what admin/tutor can infer;
* what admin/tutor cannot infer;
* whether review is advisory, QA, administrative, or an exceptional gate;
* explicit boundary against hidden manual continuity gates;
* administrative adjustment boundary.

### 6.13 Relation To SRA

Required content:

* how the tutoring program contributes to the Sistema Regulador del Aprendizaje;
* what evidence feeds future decisions;
* what decisions are system/content-chain based;
* whether future tutor-agent support is allowed, deferred, or prohibited.

### 6.14 Relation To `/now` And Dashboard

Required content:

* how the student enters or resumes the tutoring program;
* current activity display expectations;
* completed activity/history display expectations;
* dashboard or tutoring-card expectations;
* copy boundaries for no-next-activity states.

### 6.15 Registry / Content Identity Model

Required content:

* `contentKey`;
* `contentVersion`;
* content type;
* program code;
* skill family;
* item/task ids;
* source/text ids if applicable;
* feedback asset ids if applicable;
* title/display-name relationship;
* contentKey-first direction when safer than title-only lookup.

### 6.16 Source / Rights / Review Boundaries

Required content:

* source/rights status;
* authoring status;
* review status;
* approval status;
* internal-only or student-approved boundary;
* officialness/source-claim restrictions.

### 6.17 Product-Use Gates

Required content:

* student use approval status;
* product use approval status;
* who/what may approve later;
* what tests, reviews, or evidence are required first;
* explicit statement that blueprint existence does not approve product use.

### 6.18 Sales-Ready Relationship

Required content:

* whether this tutoring program contributes to future Sales-Ready;
* current Sales-Ready implication;
* Sales-Ready blockers;
* public-offer risks;
* relationship to M1/M2/L1 combined gate.

### 6.19 Risks And Failure Modes

Required content:

* pedagogy risks;
* implementation risks;
* evidence risks;
* feedback risks;
* continuity risks;
* admin/tutor operation risks;
* product/brand overclaim risks.

### 6.20 Current Maturity Status

Required content:

* current maturity status using the vocabulary in this standard;
* implementation status;
* evidence readiness;
* feedback readiness;
* continuity readiness;
* admin/tutor visibility readiness.

### 6.21 Roadmap To Maturity

Required content:

* next design gates;
* next implementation gates;
* review gates;
* test gates;
* product-use gates;
* Sales-Ready gates if applicable.

### 6.22 Test / Quality Requirements

Required content:

* required regression checks;
* no-leak checks;
* evidence checks;
* feedback checks;
* continuity checks;
* admin/tutor visibility checks;
* product-claim checks.

### 6.23 Open Decisions

Required content:

* unresolved product decisions;
* unresolved pedagogy decisions;
* unresolved technical decisions;
* unresolved content/source decisions;
* unresolved Sales-Ready decisions.

## 7. Required Current-State Status Fields

Every tutoring blueprint must include these fields in a visible status block:

```text
program_code:
maturity_status:
implementation_status:
student_use_approved:
product_use_approved:
sales_ready_implication:
continuity_status:
evidence_readiness:
feedback_readiness:
admin_tutor_visibility_readiness:
last_reviewed_phase:
recommended_next_gate:
```

Field rules:

* `student_use_approved` must be explicit `yes`, `no`, or `limited_internal_only`.
* `product_use_approved` must be explicit `yes`, `no`, or `limited_internal_only`.
* `sales_ready_implication` must not imply approval unless a separate Sales-Ready gate exists.
* `recommended_next_gate` must name the next phase or state `none`.

## 8. Blueprint Status Vocabulary

Use conservative vocabulary. If future docs define stricter values, prefer the stricter values and update this standard through a governance phase.

### 8.1 Maturity Status

Allowed values:

* `not_ready`: insufficient design, content, implementation, evidence, or approval.
* `partial`: some operational pieces exist, but coverage/readiness is incomplete.
* `internal_candidate`: designed or authorized for internal work only.
* `internal_runtime_available`: internal runtime exists, but student/product use remains blocked or limited.
* `beta_candidate`: may be considered for controlled beta after evidence and approvals.
* `product_ready_candidate`: may be considered for broader product use after final checks.
* `sales_ready_candidate`: may be considered in a Sales-Ready gate but is not approved.
* `sales_ready_approved`: approved only by a separate explicit Sales-Ready gate.

### 8.2 Implementation Status

Suggested values:

* `not_started`;
* `documentation_only`;
* `artifact_authorized`;
* `internal_implementation_ready`;
* `internal_implemented`;
* `internal_validated`;
* `limited_beta_ready_candidate`;
* `product_ready_candidate`;
* `blocked`.

### 8.3 Continuity Status

Suggested values:

* `none`;
* `explicit_no_continuity`;
* `single_step_rule_based`;
* `finite_chain_rule_based`;
* `content_chain_defined`;
* `runtime_available`;
* `blocked`;
* `not_applicable`.

### 8.4 Readiness Status

Use for evidence, feedback, and admin/tutor visibility:

* `not_ready`;
* `designed`;
* `reviewed`;
* `internal_candidate`;
* `implemented_internal`;
* `validated_internal`;
* `product_candidate`;
* `approved`;
* `blocked`.

## 9. How M1 Should Be Used

M1 is the strongest current operating reference because it has:

* a canonical student journey;
* an SRA roadmap-traversal model;
* a human/operator parallel model;
* future tutor-agent governance;
* registry-backed StudyLoads;
* response/evidence behavior;
* self-report and completion;
* rule-based continuity;
* admin evidence surfaces;
* local validation of at least one automatic next-StudyLoad progression pair.

M1 standards may seed future blueprints:

* micro-StudyLoad flow;
* answer/evidence/feedback loop;
* `/now` as current-work orientation;
* non-blocking supervision;
* no score/mastery/adaptive-AI overclaims;
* contentKey/contentVersion identity.

M1 assumptions must not be copied blindly:

* math axes and slices;
* AS1 corridor assumptions;
* M1 continuity map;
* M1 item shapes;
* M1-specific roadmap traversal;
* M1-specific copy;
* M1 maturity status.

M1 itself should eventually receive its own formal blueprint using this standard. Until then, the M1 scope/SRA documents and the L1 tutoring standards baseline remain the operating reference.

## 10. How L1 Should Use The Standard

L1 should get its own blueprint before or alongside internal implementation.

The L1 blueprint should:

* inherit Bexauri tutoring standards from the M1 baseline;
* define reading-specific pedagogy;
* define passage/text assets as first-class content;
* define authored feedback breve/completo;
* define text, item, feedback, source, review, and approval identity;
* preserve no-pre-submit answer leakage;
* preserve admin/tutor evidence as advisory/read-only;
* preserve no automatic L1 continuity until a second reviewed registry-ready set exists;
* keep student/product approval as `no` unless a future product-use gate changes it.

L1 remains not ready until its own gates are satisfied. A blueprint can make L1 easier to implement and audit, but it does not make L1 ready.

## 11. How M2 Should Use The Standard

M2 needs its own blueprint before meaningful implementation, optimization, or readiness claims.

Do not infer M2 readiness from M1 or L1.

The M2 blueprint must define:

* the M2 student-facing promise;
* M2 scope and first active slice;
* M2 content model;
* M2 feedback model;
* M2 evidence model;
* M2 continuity model;
* M2 risks and failure modes;
* M2 product-use and Sales-Ready boundaries.

Until such a blueprint exists, M2 should be treated as `not_ready` for operational and Sales-Ready purposes unless a later canonical document proves otherwise.

## 12. Future Tutoring Birth Protocol

Every future tutoria should begin with this sequence:

1. Create the tutoring blueprint using this standard.
2. Define the tutoring identity and student-facing promise.
3. Define the first active slice.
4. Define content, evidence, feedback, and continuity.
5. Define source/rights/review boundaries.
6. Define admin/tutor supervision and advisory visibility.
7. Define test and quality requirements.
8. Define product-use gates.
9. Only then open implementation-readiness.
10. Only after implementation-readiness, open code implementation if explicitly authorized.

This protocol avoids creating isolated content artifacts that lack pedagogy, evidence, continuity, or product boundaries.

## 13. Relationship To Implementation

A blueprint does not authorize code by itself.

A blueprint informs:

* implementation prompts;
* Context Gate reads;
* file-scope decisions;
* test plans;
* no-go criteria;
* product-use reviews;
* Sales-Ready audits.

Before changing a tutoring program, future prompts must read that tutoring program's blueprint if it exists. If it does not exist, the prompt should either create it first or explicitly justify why the phase can proceed without it.

Implementation phases must still include:

* expected baseline;
* strict scope;
* forbidden actions;
* Context Gate docs;
* allowed files;
* validation;
* commit/push rules;
* compact reporting;
* no product-use or Sales-Ready approval unless explicitly scoped.

## 14. Relationship To Product-Use And Sales-Ready

A blueprint can document intended promise, maturity, risks, and required evidence. It cannot approve product use by itself.

Rules:

* `student_use_approved` remains `no` unless a separate product-use gate approves otherwise.
* `product_use_approved` remains `no` unless a separate product-use gate approves otherwise.
* `sales_ready_approved` can only be used after a separate Sales-Ready gate.
* A blueprint can produce `sales_ready_candidate`, not `sales_ready_approved`.
* Public Sales-Ready remains blocked until M1, M2, and L1 are sufficiently operational for the actual public offer.

This protects Bexauri from turning documentation maturity into commercial overclaim.

## 15. Recommended Next Phase

Recommended next phase:

`MVP-COMMERCIAL-L1-TUTORING-BLUEPRINT-1 - Create PAES_L1 tutoring blueprint before internal implementation`

Reason:

* L1 has completed detailed StudyLoad design/readiness work.
* The L1 tutoring standards baseline confirmed Readiness-3 remains valid.
* This standard adds one cross-program requirement: L1 should have its own tutoring blueprint so implementation preserves program-specific memory rather than relying only on M1-derived standards.
* Creating the L1 blueprint is a narrow documentation step that should strengthen, not derail, the future internal implementation.

Do not proceed directly to L1 code if the next phase can cheaply create the L1 blueprint first.

## 16. Verification Performed

Preflight:

* `git status --short`.
* `git log --oneline --decorate --graph -8`.

Documentation read:

* `PHASE_LOG.md`.
* `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.
* `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
* `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`.
* `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`.
* `nextjs_space/docs/governance/AUTOPROPAGATING_HANDOFF_PROTOCOL_V2.md`.
* `nextjs_space/docs/product/PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md`.
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_TUTORING_STANDARDS_BASELINE_1_EXTRACT_M1_OPERATING_STRUCTURE.md`.
* `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`.
* `nextjs_space/docs/operations/MVP_UI_FLOW_2_HIDE_CYCLE_LABEL_AND_REFRESH_NOW_COPY.md`.
* `nextjs_space/docs/operations/MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md`.
* `nextjs_space/docs/operations/MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md`.
* `nextjs_space/docs/operations/MVP_SRA_SCOPE_4_FUTURE_TUTOR_AGENT_GOVERNANCE_MODEL.md`.
* `nextjs_space/docs/operations/MVP_FLOW_4_B_MINIMAL_NON_BLOCKING_NEXT_STUDYLOAD_CONTINUITY_DESIGN.md`.
* `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md`.
* `nextjs_space/docs/operations/MVP_FLOW_4_D_VERIFY_RETRY_LOCAL_AUTOMATIC_NEXT_STUDYLOAD_CONTINUITY.md`.

Documentation search:

* Focused read-only searches across `PHASE_LOG.md` and `nextjs_space/docs` for tutoring, blueprint, PAES_M1, PAES_M2, PAES_L1, StudyLoad, SRA, roadmap, student journey, `/now`, dashboard, evidence, feedback, continuity, admin evidence, tutor/operator/supervision, product-use, Sales-Ready, readiness, content identity, active slice, micro StudyLoad, and tutoring standards.

Code inspected:

* None. Documentation was sufficient for this governance standard.

Validation required before closure:

* `git diff --check`.
* `git status --short`.
* `git diff --stat`.

## 17. Non-Goals

This phase did not:

* edit app code;
* edit tests;
* create test files;
* run tests;
* run build;
* edit `nextjs_space/lib/study-load-content.ts`;
* create or modify TypeScript types in code;
* create UI components;
* create or modify routes;
* create registry entries;
* create `contentKey` or `contentVersion` implementation artifacts;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, test execution, build, or app execution;
* inspect `.env`, `DATABASE_URL`, `PROD_DATABASE_URL`, secrets, tokens, passwords, cookies, headers, raw environment values, or backups;
* approve student use;
* approve product use;
* declare L1, M1, M2, or any tutoring program ready;
* declare Sales-Ready;
* use Abacus;
* authorize implementation;
* create the L1 blueprint itself.

## 18. Result Marker

```text
MVP_COMMERCIAL_TUTORING_BLUEPRINT_STANDARD_1_STANDARD_DEFINED
```
