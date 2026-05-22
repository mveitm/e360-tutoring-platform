# Living Memory Index

## 1. Purpose

This document is a living index of current governing memory and decision locations for E360 / Bexauri.

It helps future chats and agents find current decisions, current baselines, governing docs, current blockers, missing context, and known superseded or historical decisions.

It is not a replacement for Git, canonical governance docs, `PHASE_LOG.md`, or phase operation docs.

## 2. Truth and Use Rules

* Git preflight is the living truth for repo state.
* Canonical governance docs govern product horizon and phase protocol.
* `PHASE_LOG.md` records phase history.
* This index helps future chats/agents find current living decisions.
* If this index conflicts with Git or canonical docs, Git/canonical docs win.
* Future agents must not design phases from this index alone.

## 3. Current Live Baseline

Current baseline at this phase opening:

* Expected HEAD = origin/main = `e7012b9`.
* Last accepted commit = `MVP-GOV-CONTEXT-2: create phase context gate protocol`.
* Working tree expected = clean before edits.
* Actual preflight result is recorded in `PHASE_LOG.md` for `MVP-GOV-CONTEXT-4`; do not invent it from this index.

## 4. Canonical Governance Docs

### `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`

Status: Active canonical governance document.

Governs: product horizons, sales-readiness gates, truth hierarchy, strategic correction, roadmap change-control triggers, phase classification, and GO / NO-GO gates.

Read before: every future phase, especially any phase touching public offer, commercial promise, trial, subscription, payment, student-facing promise, program coverage, tutor/admin workload, brand, Sales-Ready, or Pre-Sales validation.

### `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`

Status: Active canonical governance protocol.

Governs: mandatory Context Gate before design, implementation, verification, or commit; No Phase From Memory; commercial non-goals; student experience impact; roadmap change-control checks.

Read before: every future phase before work begins.

### `nextjs_space/docs/governance/LIVING_MEMORY_INDEX.md`

Status: Active living index.

Governs: discoverability of current living decisions, baselines, active docs, current blockers, missing context, and superseded/historical decision categories.

Read before: future phases as an orientation aid after Git preflight and canonical governance docs.

## 5. Active Product Horizons and Gates

Canonical source: `nextjs_space/docs/governance/PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.

Summary only:

* `MVP-Beta-Pre-Sales-Ready`: closed test horizon for 2-3 students; M1 may be used as a laboratory; not a public sale.
* `MVP-Beta-Sales-Ready`: public sale version; must support PAES M1, PAES M2, and Competencia Lectora L1 sufficiently for the offer.
* `Later MVP-Alpha`: later maturity horizon for greater pedagogical intelligence, better UI, richer product quality, and deeper learning support.
* `Roadmap change control required`: required when a proposed phase affects public offer, commercial promise, Sales-Ready, Pre-Sales validation, brand, trial, subscription, payment, student-facing promise, program coverage, tutor/admin workload, L1/M1/M2 scope, or attempts to classify M1-only as public Sales-Ready.

## 6. Active Phase Protocol

Canonical source: `nextjs_space/docs/governance/PHASE_CONTEXT_GATE_PROTOCOL.md`.

Summary only:

* Context Gate is required before design, implementation, verification, or commit.
* No Phase From Memory: no phase may be designed or implemented from chat memory alone.
* Missing Context Stop Rule: required context gaps must be declared; blocking gaps must stop the phase.
* Commercial Non-Goals Rule: each phase must declare commercial changes and non-goals.
* Student Experience Rule: each phase must declare whether student-visible behavior changes.
* Roadmap Change Control Rule: product/commercial/brand/program/tutor-admin scope changes require change-control analysis.

## 7. Current StudentAccess / Signup-Access State

Sources:

* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3A_CONFIRM_BACKUP_AND_EXECUTE_STUDENT_ACCESS_BACKFILL_APPLY_LOCAL_DEV.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3B_STUDENT_ACCESS_BACKFILL_CLOSEOUT_AND_SIGNUP_DEFAULT_ROW_READINESS.md`
* `nextjs_space/docs/operations/MVP_SALES_TRIAL_3C_IMPLEMENT_SIGNUP_STUDENT_ACCESS_DEFAULT_ROW.md`
* `PHASE_LOG.md`

Current living state:

* `StudentAccess` schema exists.
* DB local/dev `StudentAccess` was applied and verified.
* 12/12 local/dev students have `StudentAccess`.
* 9 rows have `lastDecisionReason = backfill_existing_active_enrollment`.
* 3 rows have `lastDecisionReason = backfill_no_active_enrollment_no_access`.
* `MVP-SALES-TRIAL-3C` attempted signup default row and is blocked by helper validation contract.
* 3C did not leave functional signup changes.
* `MVP-SALES-TRIAL-3C-FIX` is not open yet.
* Do not return to 3C-FIX until the minimum GOV-CONTEXT package is closed.

## 8. Active Commercial/Product Decisions

* M1-only is not public Sales-Ready.
* M1 may be used as a closed Pre-Sales-Ready lab.
* Sales-Ready requires M1/M2/L1 sufficiently operational.
* Public offer must not overpromise.
* No public sale or brand push before Sales-Ready gate.
* Missing product/UI Word docs remain critical context.

## 9. Active Student Experience Direction

This is a living index, not a full specification.

Current direction:

* Student learns inside Bexauri.
* Bexauri regulates internally.
* Human supervision protects quality but should not be the normal bottleneck.
* Direction favors microloads, dynamic/invisible diagnosis, inline feedback, non-blocking continuity, and strategic human oversight.
* Older long-diagnostic/expert-wait assumptions need reconciliation if they appear in old docs.

## 10. Known Missing Context / Gaps

The following Word documents are critical product/UI/brand context if not versioned:

* `Mvp Ui Flow 1 Secuencia Canonica Bexauri Cierre Dia.docx`
* `MVeit-Bexauri-Definicion de Producto.docx`
* `Bexauri_Guia_Identidad_Visual_v1_1.docx`

If unavailable, future broader GOV-CONTEXT, canonicality, product direction, UI direction, brand direction, or public-offer phases must request them or a fresh synthesis before closing.

Older docs may contain historical assumptions requiring reconciliation.

## 11. Superseded / Historical / Needs Reconciliation Index

Superseded:

* M1-only public Sales-Ready framing.
* Any technical phase reversing the strategic reclassification without roadmap change control.

Historical or needs reconciliation:

* Long initial diagnosis as default student experience.
* 20-30 minute loads as default student experience.
* Expert review as normal bottleneck.
* Stale baseline sections inside older handoff/index docs.

Active:

* Microloads, dynamic/invisible diagnosis, inline feedback, non-blocking continuity, strategic supervision.
* Pre-Sales-Ready closed beta with 2-3 students.
* Sales-Ready requires M1/M2/L1.

This is an index, not a full canonicality audit. Do not over-classify every repo document from this section.

## 12. How Future Agents Should Use This Index

1. Start with Git preflight.
2. Read `PRODUCT_HORIZONS_AND_SALES_READINESS_GATES.md`.
3. Read `PHASE_CONTEXT_GATE_PROTOCOL.md`.
4. Read this living index.
5. Read specific phase docs.
6. Complete the Context Gate.
7. Stop if context is missing, contradicted, or commercially unsafe.

## 13. Non-Goals

This document does not:

* Replace canonical docs.
* Replace `PHASE_LOG.md`.
* Classify every document.
* Create handoff v2.
* Update current agent handoff.
* Fix 3C.
* Change runtime behavior.
* Change student UI.
* Change commercial promise.
* Change DB/schema/code.
* Authorize implementation.
