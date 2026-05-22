# Product Horizons and Sales-Readiness Gates

## 1. Purpose

This document defines the active E360 / Bexauri product horizons and sales-readiness gates before any further technical phase changes signup, trial, access runtime, billing, `/now`, admin, UI, staging/production, or `MVP-SALES-TRIAL-3C-FIX`.

Its purpose is to keep technical implementation aligned with the commercial/product roadmap and to prevent a partial public offer from becoming the implied Sales-Ready version.

This document is intentionally minimal. It defines horizons, gates, allowed/prohibited work, change-control triggers, and required future use. It does not attempt to solve the whole governance system.

## 2. Truth Hierarchy

When sources conflict, use this order:

1. Git preflight actual: `git status --short` and `git log --oneline --decorate --graph -8`.
2. Canonical versioned docs.
3. `PHASE_LOG.md`.
4. Phase operation docs.
5. Smoke/build evidence.
6. Chat memory.
7. Agent interpretation.

Git preflight is the living truth for repository state. If Git contradicts memory, a document, or an instruction about HEAD, origin/main, or working tree cleanliness, Git wins and the phase must stop and report the mismatch.

## 3. Critical Product Context

The following Word documents were named as critical product context but were not found as versioned files in the repository during this phase:

* `Mvp Ui Flow 1 Secuencia Canonica Bexauri Cierre Dia.docx`
* `MVeit-Bexauri-Definicion de Producto.docx`
* `Bexauri_Guia_Identidad_Visual_v1_1.docx`

This phase uses the hardening synthesis supplied in the phase request as active product context. Future broader context/governance phases must request the Word files or request a fresh synthesis before closing their own context block if those documents remain unavailable locally.

## 4. Product Horizons

### MVP-Beta-Pre-Sales-Ready

What it is:

* A closed test horizon for 2-3 students.
* A controlled laboratory for learning, validation, and operational rehearsal.
* May use M1 as the main laboratory path.
* Not a public sale.

What it allows:

* Closed, personally managed beta usage.
* Manual owner/tutor/admin support where explicitly understood by the participants.
* M1-based trial of operational flow and student experience.
* Evidence collection for roadmap, product, and implementation decisions.

What it prohibits:

* Public commercial launch.
* Public claim that Bexauri is Sales-Ready.
* Public offer implying complete PAES support.
* Payment/subscription promises that cannot be fulfilled operationally.
* Expansion from a closed lab into public acquisition without passing the Sales-Ready gate.

Student scope:

* 2-3 controlled students.
* Students must be treated as closed beta participants, not public customers receiving the complete commercial product.

Commercial promise:

* Limited, closed validation of Bexauri with explicit expectation management.
* No broad public promise of complete PAES coverage.

Brand risk:

* Moderate if expectations are controlled.
* High if the closed lab is marketed as a complete public offer.

Permitted technical work:

* Narrow fixes needed for closed beta safety and evidence.
* Documentation/readiness work.
* Local/dev verification.
* Carefully scoped signup, trial/access, admin, and `/now` work only when the phase declares this horizon and preserves closed-beta limits.

Prohibited technical work:

* Public Sales-Ready launch work without Sales-Ready gate approval.
* Broad billing/payment/subscription activation that implies public readiness.
* Public marketing or offer mechanics that overstate coverage.
* Any technical phase that reverses this horizon classification.

Evidence required before advancing:

* Git preflight clean at opening and closing.
* Closed beta scope accepted.
* Student-visible experience is coherent for the closed lab.
* No public-offer copy or behavior misrepresents M1-only capability.
* Known manual operations and product gaps are documented.

### MVP-Beta-Sales-Ready

What it is:

* The complete public sale version of the MVP-Beta horizon.
* The first public commercial face of Bexauri.
* Must support PAES M1, PAES M2, and Competencia Lectora L1 sufficiently for the advertised offer.

What it allows:

* Public acquisition.
* Public trial/subscription/payment flow when implemented and verified.
* Commercial promise that matches actual operational coverage.
* Multi-student operation without technical manual intervention for basic signup, payment, program assignment, and continuity.

What it prohibits:

* M1-only public Sales-Ready claim.
* Public sale of a partial offer that damages trust.
* Hidden technical manual setup as a normal customer path.
* Public claims for L1/M2 if they are not operational enough to support the offer.
* Claims of PAES score prediction, theta, mastery, or adaptive AI unless later explicitly implemented, validated, and approved.

Student scope:

* Public students beyond the closed 2-3 lab.
* Students may enter through a real commercial path with expectations aligned to the offer.

Commercial promise:

* Bexauri can sell what it publicly claims.
* The public promise must include enough operational support for PAES M1, PAES M2, and Competencia Lectora L1.

Brand risk:

* Highest. A partial public offer can burn the brand.
* The Sales-Ready gate exists to prevent public trust loss from an M1-only or manually assembled product.

Permitted technical work:

* Sales-Ready signup, trial, access runtime, billing/payment/subscription, admin, `/now`, UI, staging/prod, and program coverage work after phase classification and gate approval.
* L1/M1/M2 program readiness work required by the public offer.
* Operational automation that removes technical manual intervention from normal customer flow.

Prohibited technical work:

* Any public-facing implementation that promises coverage not supported by the product.
* Payment/subscription enablement before the commercial promise and operational fulfillment are coherent.
* Staging/production work that bypasses Sales-Ready gate evidence.
* Technical phases that narrow Sales-Ready back to M1-only without roadmap change control.

Evidence required before advancing:

* Explicit Sales-Ready gate GO.
* M1, M2, and L1 are sufficiently operational for the public offer.
* Public offer, trial, payment/subscription, access, admin, and student-facing promise are aligned.
* Normal student flow does not require technical manual intervention.
* Brand, product, and operational risks are accepted and documented.
* Required smoke/build/staging/prod evidence exists in the relevant future phases.

### Later MVP-Alpha

What it is:

* A later maturity horizon after the beta commercial foundation.
* Focused on greater pedagogical intelligence, improved UI, richer product polish, and deeper learning support.

What it allows:

* More intelligent pedagogical routing.
* Improved UI and brand execution.
* More advanced tutor/admin tooling.
* More nuanced learning evidence and recommendation flows.

What it prohibits:

* Reclassifying incomplete beta work as Alpha to avoid Sales-Ready gates.
* Using Alpha language to justify public claims not yet supported.
* Reversing the active product horizon classification inside a technical phase.

Student scope:

* Students using a more mature product after the foundational Sales-Ready beta path is coherent.

Commercial promise:

* Improved product quality and intelligence, not a substitute for the minimum public Sales-Ready promise.

Brand risk:

* Lower only if Sales-Ready foundations are already coherent.
* High if Alpha is used to mask unresolved public-offer gaps.

Permitted technical work:

* Pedagogical intelligence improvements.
* UI polish.
* Better evidence, tutor/admin review, and roadmap traversal.
* Feature depth beyond the minimum public beta promise.

Prohibited technical work:

* Public-offer changes without roadmap change control.
* Any work that weakens Sales-Ready obligations for M1, M2, and L1.
* Claims of adaptive AI, mastery, theta, or PAES scoring without explicit implementation and validation.

Evidence required before advancing:

* Sales-Ready baseline is not being bypassed.
* Improvements are scoped to Alpha maturity.
* Product claims remain evidence-backed.
* UI/pedagogical changes do not create new unsupported commercial promises.

## 5. Strategic Correction

M1-only is not the public Sales-Ready commercial face.

M1 may be used as a closed MVP-Beta-Pre-Sales-Ready laboratory with 2-3 students.

MVP-Beta-Sales-Ready must support PAES M1, PAES M2, and Competencia Lectora L1 sufficiently for the public offer.

Do not burn the brand with a partial public offer.

This reclassification is active and cannot be reversed inside a technical phase. Any reversal or narrowing requires a formal direction phase or roadmap change control.

## 6. Roadmap Change Control

A future phase requires roadmap change control before proceeding if it affects any of the following:

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

Roadmap change control must declare:

* The current horizon being changed.
* The proposed new horizon or promise.
* The commercial reason.
* The student-facing consequence.
* The operational consequence for tutor/admin work.
* The technical consequence.
* Evidence that the change does not overpromise.
* Explicit approval before implementation.

## 7. Phase Classification Rules

Every future phase must declare its product horizon before design or implementation:

* `MVP-Beta-Pre-Sales-Ready`.
* `MVP-Beta-Sales-Ready`.
* `Later MVP-Alpha`.
* `Roadmap change control required`.

The declaration must appear in the Context Gate or phase gate before work begins.

If a phase touches public offer, trial, subscription, payment, student-facing promise, program coverage, tutor/admin workload, staging/prod, or Sales-Ready claims, the phase must explain why its declared horizon is valid.

If the phase cannot classify itself cleanly, it must stop and open roadmap change control.

## 8. GO / NO-GO Gates

### Pre-Sales-Ready Closed Beta Gate

GO only if:

* Scope is closed to 2-3 students.
* Participants are not treated as public-sale customers.
* M1 laboratory use is explicit.
* Student-facing copy does not imply full public coverage.
* Manual owner/tutor/admin work is documented and acceptable for the lab.
* Technical changes are scoped to closed beta safety and evidence.

NO-GO if:

* The phase enables or implies public sale.
* M1-only is described as Sales-Ready.
* Payment/subscription or trial behavior creates a public promise that cannot be fulfilled.
* Brand risk is not acknowledged.

### Sales-Ready Public Offer Gate

GO only if:

* The public offer is defined and matched by product behavior.
* PAES M1, PAES M2, and Competencia Lectora L1 are sufficiently operational for the offer.
* Signup, trial/access, payment/subscription, student state, admin/tutor operations, and program continuity are coherent.
* Normal public customer flow does not depend on technical manual intervention.
* Brand risk is explicitly accepted.
* Required implementation and verification evidence exists.

NO-GO if:

* The offer is M1-only.
* L1 or M2 are not operational enough for the public claim.
* Payment/subscription exists without fulfillment readiness.
* Student-facing states are confusing or overpromise access.
* Tutor/admin workload depends on hidden technical operations.

### Later Alpha Intelligence Improvements Gate

GO only if:

* The work is genuinely post-beta maturity or explicitly non-public research/prototype.
* It does not weaken or bypass Sales-Ready gates.
* Claims remain evidence-backed.
* Pedagogical intelligence and UI improvements are governed by accepted product direction.

NO-GO if:

* Alpha is used to avoid Sales-Ready obligations.
* The phase introduces unsupported adaptive AI, mastery, theta, or PAES score claims.
* The work changes the public offer without roadmap change control.

## 9. Non-Goals

This phase does not fix StudentAccess helper TypeScript issues.

This phase does not open `MVP-SALES-TRIAL-3C-FIX`.

This phase does not change signup behavior.

This phase does not implement runtime enforcement.

This phase does not change trial, billing, subscription, UI, admin, `/now`, staging, or production.

This phase does not change application code, `schema.prisma`, package files, Prisma state, database state, SQL, seed scripts, build behavior, deploy behavior, commits, or pushes.

## 10. Required Future Use

Future phases must reference this document in their Context Gate before proceeding.

At minimum, future Context Gates must state:

* Product horizon.
* Whether roadmap change control is required.
* Whether the phase affects public offer, commercial promise, trial, subscription, payment, student-facing promise, program coverage, tutor/admin workload, brand, or Sales-Ready.
* Why the phase is GO or NO-GO under the relevant gate.

