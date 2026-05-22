# Phase Context Gate Protocol

## 1. Purpose

The Context Gate is a required pre-phase checkpoint before design, implementation, verification, or commit of any future phase.

Its purpose is to prevent technical phases from drifting away from Git truth, canonical documentation, product horizon, commercial promise, student experience, brand risk, and roadmap governance.

No future phase should proceed to design or implementation until its Context Gate is completed and produces a clear `GO`. If the gate is incomplete, contradictory, or commercially unsafe, the phase must stop or open roadmap change control.

## 2. Relationship to Product Horizons

Every future phase must reference:

```text
nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md
```

Every future phase must declare one of:

* `MVP-Beta-Pre-Sales-Ready`
* `MVP-Beta-Sales-Ready`
* `Later MVP-Alpha`
* `Roadmap change control required`

The declared horizon must be coherent with the phase scope. A phase that affects public offer, commercial promise, Sales-Ready, Pre-Sales validation, brand, trial, subscription, payment, student-facing promise, program coverage, or tutor/admin workload may require roadmap change control before work begins.

## 3. Truth Hierarchy

When sources conflict, use this order:

1. Git preflight actual.
2. Canonical versioned docs.
3. `PHASE_LOG.md`.
4. Phase operation docs.
5. Smoke/build evidence.
6. Chat memory.
7. Agent interpretation.

Chat memory never overrides Git or canonical versioned docs.

Git preflight is the living truth for `HEAD`, `origin/main`, and working tree state. If Git preflight contradicts memory, documents, or prompts, Git wins and the phase must stop before editing.

## 4. Mandatory Context Gate Template

Future phases must fill this template before work begins:

```text
# Context Gate

Phase:
Proposed action:
Phase type:
Product horizon:
Roadmap block:
Git preflight:
Canonical docs read:
Phase docs read:
Product/UI docs read or missing:
Relevant strategic decisions:
Relevant superseded or historical decisions:
Student experience impact:
Commercial impact:
Commercial non-goals:
Brand risk:
Operational/tutor-admin impact:
Technical scope:
Explicit non-goals:
Missing context check:
Roadmap change-control check:
Why this phase is aligned:
What this phase must not include:
GO / NO-GO:
Reason:
```

The template must be explicit enough that a later reviewer can tell why the phase was allowed to proceed and what it was forbidden to include.

## 5. Required Field Meanings

`Phase`:

* Name the exact phase identifier and title.

`Proposed action`:

* State what the phase intends to do in plain language.

`Phase type`:

* Use a precise label such as documentation/governance, design/readiness, implementation, smoke/verification, custody correction, deployment readiness, staging operation, production operation, or roadmap change control.

`Product horizon`:

* Declare one of the four allowed horizon values from this protocol.
* Explain why the horizon is valid if the phase touches public/commercial behavior.

`Roadmap block`:

* Identify the active roadmap block or state that the phase is governance-only.
* Do not infer roadmap alignment from the latest `PHASE_LOG.md` entry alone.

`Git preflight`:

* Include `git status --short`.
* Include `git log --oneline --decorate --graph -8`.
* Confirm whether the actual result matches the expected baseline.
* If it does not match, stop before editing.

`Canonical docs read`:

* List canonical governance, roadmap, handoff, sales-ready, or product docs that were read.
* Include `PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md` for every phase.

`Phase docs read`:

* List the operation docs or phase docs directly relevant to the proposed work.

`Product/UI docs read or missing`:

* List product, UI, brand, or Word-derived documents read.
* If the named Word documents are unavailable in the repo, state that explicitly.

`Relevant strategic decisions`:

* Record decisions that actively govern the phase, including product horizon, Sales-Ready requirements, M1/M2/L1 scope, brand-risk limits, and commercial promise limits.

`Relevant superseded or historical decisions`:

* Identify stale M1-only, local-only, demo-only, or historical baseline decisions that must not override current Git or canonical governance.

`Student experience impact`:

* State what the student will or will not see differently.
* If there is no student-facing change, say so.

`Commercial impact`:

* State whether the phase changes public offer, sales readiness, trial, subscription, payment, pricing, promise, or conversion path.

`Commercial non-goals`:

* State what commercial behavior is explicitly excluded.

`Brand risk`:

* Identify whether the phase can create public trust risk, overpromise risk, partial-offer risk, or visual/identity risk.

`Operational/tutor-admin impact`:

* State whether tutor/admin workload, manual operations, review burden, or hidden technical work changes.

`Technical scope`:

* List the exact files, modules, commands, or environments in scope.

`Explicit non-goals`:

* List forbidden areas, especially signup, auth, access runtime, billing, trial activation, admin mutation, `/now`, UI, staging/prod, schema, package files, Prisma, DB, SQL, seed scripts, build, deploy, commit, and push when excluded.

`Missing context check`:

* State whether any required context is missing.
* Missing critical product context may allow a narrow documentation phase to proceed, but broader canonicality or product-direction work must request the files or a fresh synthesis before closing.

`Roadmap change-control check`:

* State whether the phase affects any trigger from `PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
* If yes, either open roadmap change control or explain why the current phase is only documenting readiness and not making the change.

`Why this phase is aligned`:

* Explain why the phase advances or protects the current roadmap without overpromising.

`What this phase must not include`:

* Restate the hard boundaries in phase-specific terms.

`GO / NO-GO`:

* Use `GO`, `NO-GO`, or `ROADMAP_CHANGE_CONTROL_REQUIRED`.

`Reason`:

* Give the final gate rationale.

## 6. Minimum Stop Rules

The phase must stop before editing if:

* The working tree is not clean when the prompt requires a clean tree.
* `HEAD`, `origin/main`, or latest accepted commit does not match the expected baseline.
* Git preflight contradicts the requested baseline.
* Required canonical docs are missing and the phase depends on them.
* The product horizon cannot be declared cleanly.
* The phase affects public offer, commercial promise, Sales-Ready, trial, subscription, payment, student-facing promise, program coverage, tutor/admin workload, or brand and roadmap change control has not been completed.
* The proposed work would reverse the GOV-CONTEXT-1 strategic correction inside a technical phase.
* The proposed work would treat M1-only as the public Sales-Ready commercial face.

## 7. Product/UI Document Availability

The following documents are critical product context when available:

* `Mvp Ui Flow 1 Secuencia Canonica Bexauri Cierre Dia.docx`
* `MVeit-Bexauri-Definicion de Producto.docx`
* `Bexauri_Guia_Identidad_Visual_v1_1.docx`

If they are not versioned in the repo, a narrow governance phase may record the missing files and proceed using an explicit synthesis supplied by Mauricio.

Future broader `GOV-CONTEXT` phases, canonicality audits, product direction phases, UI direction phases, brand direction phases, and public-offer phases must request those files or request a fresh synthesis before closing.

## 8. No Phase From Memory Rule

No phase may be designed or implemented from chat memory alone.

Every phase must reference versioned docs, `PHASE_LOG.md` evidence, phase docs, smoke/build evidence when relevant, or explicitly declare missing context.

If the only support for a proposed phase is chat memory or agent interpretation, the Context Gate must return `NO-GO` until versioned context or an explicit owner-provided synthesis is available.

## 9. Commercial Non-Goals Rule

Every phase must declare whether it changes or does not change:

* Public offer.
* Commercial promise.
* Sales-Ready.
* Pre-Sales validation.
* Brand.
* Trial.
* Subscription.
* Payment.
* Sale.
* Student-facing promise.

If a phase changes any of these, it must pass the roadmap change-control check before design or implementation.

If a phase does not change them, it must state that as a commercial non-goal.

## 10. Student Experience Rule

Every phase must declare whether it changes or does not change:

* What the student sees.
* What the student can do.
* Whether continuity is blocking or non-blocking.
* Whether feedback is inline or delayed.
* Whether human review is strategic or a bottleneck.
* Whether microloads or longer activities are affected.

If there is no student-facing change, the phase must say so explicitly.

If there is a student-facing change, the phase must explain the expected student experience and why it does not overpromise tutoring access, program coverage, trial status, subscription status, or Sales-Ready capability.

## 11. Roadmap Change Control Rule

A phase must be `NO-GO` or must open roadmap change control if it affects:

* Public offer.
* Commercial promise.
* Sales-Ready definition.
* Pre-Sales validation definition.
* Brand positioning or risk.
* Trial.
* Subscription.
* Payment.
* Student-facing promise.
* Program coverage.
* Tutor/admin workload.
* L1/M1/M2 scope.
* Any attempt to classify M1-only as the public Sales-Ready offer.

Roadmap change control must be completed before design or implementation unless the phase is explicitly limited to documenting the change-control need.

## 12. Phase-Type Examples

Documentation/governance phase:

* The Context Gate should confirm Git truth, canonical docs, product horizon, missing context, and non-goals before creating or updating governance docs.

Readiness/design phase:

* The Context Gate should confirm the roadmap block, student/commercial impact, required source docs, and whether implementation remains deferred.

Implementation phase:

* The Context Gate should name exact files/modules in scope, forbidden files/actions, expected behavior change, verification plan, and commercial/student non-goals before file edits.

Verification/smoke phase:

* The Context Gate should state what will be tested, whether the test mutates data, what credentials/secrets must not be exposed, and what result is GO or NO-GO.

Custody correction phase:

* The Context Gate should identify the allowed files, the custody defect, the preservation rule, and the proof that no product/technical scope changed.

Roadmap change-control phase:

* The Context Gate should identify the proposed product-direction change, the affected horizon, commercial/student/brand consequences, and the approval required before implementation.

## 13. Required Use

Future phases must include a completed Context Gate in the phase operation document, phase prompt, or phase log before design or implementation begins.

For implementation phases, the Context Gate must be completed before file edits.

For verification phases, the Context Gate must be completed before smoke, build, browser, database, staging, production, or external-service verification activity.

For commit phases, the Context Gate must confirm that the diff matches the approved phase scope before commit.

## 14. Non-Goals of This Protocol

This protocol does not fix StudentAccess helper TypeScript issues.

This protocol does not open `MVP-SALES-TRIAL-3C-FIX`.

This protocol does not change signup behavior, auth, access runtime, billing, trial activation, admin mutation, `/now`, UI, staging, or production.

This protocol does not change application code, `schema.prisma`, package files, Prisma state, database state, SQL, seed scripts, build behavior, deploy behavior, commits, or pushes.
