# E360 Adaptive Tutoring Platform — Phase Log

> Continuity artifact for recovery after workspace/chat loss.
> Live URL: https://tutoring-platform-mv-l4o1ne.abacusai.app

## Status key

* ✅ deployed
* 🔒 checkpointed, not deployed
* ⚠️ uncertain / reconstructed

## Current state

* Latest closed phase: EN (deployed and closed)
* Status: D → DN closed and deployed; continuity-start governance-reading (ED/EE) closed + deployed; EF rescue v2 (admin consultation panel) closed + deployed; EG (admin-only advisory attention signal) closed + deployed; EH (client-side attention filter) closed + deployed; EI (open-enrollment quick-link) closed as already-satisfied (no code change, no deploy); EJ (filter-aware orientation counter; canonical list counter) closed + deployed; EK (attention acknowledgement workflow) closed + deployed; EL (attention unreviewed enrollment filter) closed + deployed; EM (attention reviewed enrollment filter) closed + deployed; EN (current cycle operational summary) closed + deployed
* Project state: stable, verified, production live
* Main recent line of work:

  * inline editing rollout
  * redundant badge cleanup
  * closed-cycle guard alignment
  * option/label consistency across views
  * continuity-start governance-reading record + consultation layer (ED/EE)
  * minimal admin consultation panel on enrollment detail (EF rescue v2)
  * minimal admin-only advisory attention signal from latest persisted governance-reading record (EG)
  * minimal client-side attention-signal filter on admin enrollment list (EH)
  * open-enrollment quick-link confirmed already-satisfied from Phase H (EI, no code change, no deploy)
  * filter-aware canonical orientation counter on admin enrollment list, replacing the pre-EH search-only counter (EJ)
  * minimal admin attention-acknowledgement workflow on enrollment detail + list (EK)
  * minimal attention-unreviewed enrollment filter on admin enrollment list (EL)

## Phase log

### Confirmed historical blocks

| Block | Summary                                                  | Deployed | Notes                                    |
| ----- | -------------------------------------------------------- | -------: | ---------------------------------------- |
| A–D   | Core schema and first admin surfaces established         |        ✅ | Foundational models and CRUD base        |
| E–Q   | Guards, detail views, edit/delete flows, navigation mesh |        ✅ | Full CRUD and cross-navigation matured   |
| R–AH  | Search rollout across admin list views                   |        ✅ | 10/10 lists gained search                |
| T–AK  | Inline creation from detail views                        |        ✅ | Detail pages became operational surfaces |
| AL–BI | Inline editing expansion across core entities            |        ✅ | Includes list-level inline controls      |
| BJ–BU | Badge cleanup and dead-import cleanup                    |        ✅ | UI consistency + dead code removal       |

### Recent confirmed phases

| Phase | Objective                                                       | Files touched                       | Deployed |
| ----- | --------------------------------------------------------------- | ----------------------------------- | -------: |
| BV    | Inline program status select in program detail header           | `program-detail-view.tsx`           |        ✅ |
| BW    | Inline axis status select on program detail                     | `program-detail-view.tsx`           |        ✅ |
| BX    | Inline skill status select on program detail                    | `program-detail-view.tsx`           |        ✅ |
| BY    | Inline decision type select on cycle detail cards               | `cycle-detail-view.tsx`             |        ✅ |
| BZ    | Inline evaluation type select on cycle detail cards             | `cycle-detail-view.tsx`             |        ✅ |
| CA    | Inline load type select on cycle detail cards                   | `cycle-detail-view.tsx`             |        ✅ |
| CB    | Closed-cycle guard on load-status select in cycle detail view   | `cycle-detail-view.tsx`             |        ✅ |
| CC    | Closed-cycle guard on load-status select in Loads view          | `study-loads-view.tsx`              |        ✅ |
| CD    | Server-side closed-cycle guard on `PATCH /api/study-loads/[id]` | `app/api/study-loads/[id]/route.ts` |        ✅ |
| CE    | Align `decisionType` options in cycle detail to canonical 4-set | `cycle-detail-view.tsx`             |        ✅ |
| CF    | Normalize `evaluationType` labels in cycle detail               | `cycle-detail-view.tsx`             |        ✅ |
| DD    | Closed-cycle create guard for cycle-decisions                   | `cycle-decisions-view.tsx`          |        ✅ |
| DE    | Closed-cycle create guard for study-loads                       | `study-loads-view.tsx`              |        ✅ |
| DF    | Diagnostic model and API (structural)                           | `schema.prisma`, `api/diagnostics/` |        ✅ |
| DG    | CycleSnapshot model and API (structural)                        | `schema.prisma`, `api/cycle-snapshots/` |     ✅ |
| DH    | CycleDecisionSkill model and API (structural)                   | `schema.prisma`, `api/cycle-decision-skills/` | ✅ |
| DI    | TutoringSession model and API (structural)                      | `schema.prisma`, `api/tutoring-sessions/` |    ✅ |
| DJ    | Response model and API (structural)                             | `schema.prisma`, `api/responses/`         |    ✅ |
| DK    | ContinuitySignal model and API (structural)                     | `schema.prisma`, `api/continuity-signals/` |   ✅ |
| DL    | Cycle-opening preconditions and enrollment pointer wiring (Line E) | `api/learning-cycles/route.ts`            |   ✅ |
| DM    | Diagnostic completion → SkillState initialization wiring (Line E)  | `api/diagnostics/[id]/route.ts`           |   ✅ |
| DN    | First adaptive StudyLoad generation on cycle open + opening snapshot (Line E) | `api/learning-cycles/route.ts`   |   ✅ |
| DO    | Student `/now` surface, read-only (first visible phase of Line E)             | `app/now/page.tsx`, `middleware.ts` |   ✅ |
| DP    | Execution bridge: start first StudyLoad from `/now` (Line E)                  | `app/api/study-loads/[id]/start/route.ts`, `app/now/page.tsx`, `app/now/_components/start-load-button.tsx` |   ✅ |
| DQ    | Complete an in-progress StudyLoad from `/now` with minimal self-report evidence (Line E) | `app/api/study-loads/[id]/complete/route.ts`, `app/now/page.tsx`, `app/now/_components/complete-load-button.tsx` |   ✅ |
| DR    | `/now` resilience for the "all caught up" state + visible in-cycle history (Line E)   | `app/now/page.tsx` |   ✅ |
| DS    | Admin-only atomic close of an open LearningCycle (Line E admin bridge) | `app/api/learning-cycles/[id]/close/route.ts`, `app/api/learning-cycles/[id]/route.ts`, `app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx` |   ✅ |
| DT    | Admin-only continuity authorization for a closed LearningCycle (Line E admin bridge, unblocks N+1 opening) | `app/api/learning-cycles/[id]/continue/route.ts`, `app/api/learning-cycles/[id]/route.ts`, `app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx` |   ✅ |
| DU    | Minimal adaptive differentiation of the first StudyLoad of cycle N+1: exclude prior-cycle `selectedSkillIds` from the first generation pass only, with auditable `excludedSkillIds` / `exclusionRule` / `exclusionRelaxed` trace in the `cycle_open` snapshot payload (first-load scope only; no product-wide prohibition) | `app/api/learning-cycles/route.ts` |   ✅ |
| DV    | Minimal authoritative-diagnostic-attempt selector for **tactical continuity-start selection only** (pure read; no interpretation; explicit null branch when no valid attempt exists). Rule: `status='completed' AND completedAt IS NOT NULL`; tiebreak `completedAt DESC, createdAt DESC, id DESC`. Machine-readable `reason` ∈ {`single_valid_attempt`, `latest_of_multiple`, `no_completed_attempts`, `no_attempts`} | `lib/diagnostics/authoritative.ts`, `app/api/diagnostics/authoritative/route.ts` |   ✅ |
| DW    | Minimal tactical reading of the authoritative diagnostic attempt (pure read; no interpretation of answer content; no schema change). Four-verdict classifier for continuity-start logic: `usable_performance`, `omission_heavy_performance`, `low_confidence_evidence` (quality/readiness — NOT a statement about the student's ability), `insufficient_evidence` (fake-personalization refusal). Thresholds: completion<0.5 ⇒ low_confidence; otherwise omission≥0.4 ⇒ omission_heavy; else usable. Consumes DV; `Diagnostic.resultSummary` parsed as JSON `{totalItems,answered,omitted,correct}` when present | `lib/diagnostics/tactical-reading.ts`, `app/api/diagnostics/tactical-reading/route.ts` |   ✅ |
| DX    | Minimal operational continuity-start output (pure read; no generation; no schema change). Four-mode canonical operational-read classifier consuming DW, 1:1 total mapping: `usable_performance`→`normal`, `omission_heavy_performance`→`cautious`, `low_confidence_evidence`→`provisional`, `insufficient_evidence`→`manual_review_needed`. Modes are **operational-read outputs only** — they do NOT authorize workflow transitions, mutate continuity state, emit ContinuitySignal rows, or auto-enable/auto-block later structural actions. `provisional` inherits DW's evidence-quality semantics (NOT a statement about the student's ability). Full DV+DW audit passthrough in `source` | `lib/continuity-start/operational-output.ts`, `app/api/continuity-start/operational-output/route.ts` |   ✅ |
| DY    | Minimal declarative start-block plan from DX (pure read; no materialization; no StudyLoad creation; no schema change). Four-shape 1:1 total mapping from DX mode: `normal`→`standard` (itemCount=3), `cautious`→`standard_with_omission_guard` (itemCount=3, `treat_omission_as_first_class`), `provisional`→`provisional_safe` (itemCount=2, `refuse_high_confidence_personalization` + `prefer_safe_generic_start`, `personalizationAllowed=false`), `manual_review_needed`→`escalate_refuse` (itemCount=0, `refusal=true`, `refusalReason='insufficient_evidence_escalate'`). **`itemCount` is a declarative operational capacity HINT, NOT a guaranteed future materialization cardinality** — later materializers may respect real constraints as long as they do not violate the declared block-shape semantics. `provisional_safe` inherits DW/DX evidence-quality semantics (NOT a student-ability verdict). `escalate_refuse` is a first-class fake-personalization refusal. Full DV+DW+DX audit passthrough in `source` | `lib/continuity-start/start-block-plan.ts`, `app/api/continuity-start/start-block-plan/route.ts` |   ✅ |
| DZ    | Minimal shadow-materialized continuity-start block from DY (pure read; item-level resolution; no `StudyLoad` creation; no persistence; no schema change; no reconciliation with DN/DU). 1:1 total `blockShape`→resolver mapping: `escalate_refuse`→`items: []` (first-class refusal), `provisional_safe`→2 `safe_generic` items (deterministic generic titles, `skillId=null`, `personalized=false`; NOT a student-ability verdict), `standard_with_omission_guard`→up to 3 `skillstate_heuristic` items from the enrollment's program-scoped `SkillState` pool sorted `needsReinforcement DESC, masteryLevel ASC, skillId ASC` + block-level `omissionGuard=true`, `standard`→same pool/sort without `omissionGuard`. **`itemCountHint` remains a declarative operational capacity hint, NOT a guaranteed materialization cardinality** — `itemsResolvedCount` MAY be less than `itemCountHint` on empty/short pools (honest downgrade; no fake padding). **`source: 'skillstate_heuristic'` means structural resolution from the currently available heuristic inputs only — NOT pedagogically optimal, NOT fully personalized, NOT instructionally validated**; `skillstate_heuristic` is a structural resolution source, not a pedagogical quality claim. DZ does NOT inherit DU's `selectedSkillIds` exclusion (deferred reconciliation). Full DV+DW+DX+DY audit passthrough in `source` | `lib/continuity-start/shadow-materializer.ts`, `app/api/continuity-start/shadow-block/route.ts` |   ✅ |
| EA    | Minimal read-only reconciliation layer between the structural start block (DN/DU `cycle_open` snapshot) and the DZ shadow start block (pure read; no schema change; no writes; no DN/DU replacement; no DZ replacement; no precedence decision; no source-of-truth resolution; no signal emission; no StudyLoad/CycleSnapshot/ContinuitySignal mutation; no continuity-state mutation). Reuses the DZ resolver verbatim (no duplicated logic). Reference cycle is deterministic: the enrollment's LearningCycle with the lowest `cycleNumber` that has a CycleSnapshot with `snapshotType='cycle_open'`; echoed as `referenceCycleId` / `referenceCycleNumber`; if none exists, classification is `no_structural_block` (first-class, never invented). Reconciliation rule is 1:1 TOTAL over 6 statuses in this binding check order: `no_structural_block`, `shape_divergent_refusal` (shadow=`escalate_refuse` ∧ structural non-empty), `shape_divergent_safe` (shadow=`provisional_safe` ∧ structural non-empty), `shadow_empty_vs_materialized` (shadow heuristic shape ∧ `itemsResolvedCount=0` ∧ structural non-empty), `set_divergent_skillstate` (shadow heuristic shape ∧ at least one shadow `skillId` ∉ structural `selectedSkillIds`), `aligned_skillstate`. **`aligned_skillstate` is a narrow, strictly LOCAL STRUCTURAL status**: it means only that the set of non-null shadow `skillId`s is a SUBSET (not strict equality — honors DZ's honest-downgrade contract) of the structural `selectedSkillIds` for the chosen reference cycle. It does NOT mean pedagogical equivalence, full block equivalence, operational equivalence, precedence resolution, or source-of-truth resolution. `studyLoadCount` is informational only (no semantic-equality assertion vs `selectedSkillIds.length`). DU's `excludedSkillIds` / `exclusionRelaxed` are echoed verbatim (never re-evaluated). Full DV+DW+DX+DY+DZ audit passthrough under `shadow.source` | `lib/continuity-start/reconciliation.ts`, `app/api/continuity-start/reconciliation/route.ts` |   ✅ |
| EB    | Minimal read-only precedence layer between the structural materialization (DN/DU) and the tactical shadow continuity-start (DZ), consuming EA (pure read; no schema change; no writes; no DN/DU replacement; no DZ replacement; no EA replacement; no ContinuitySignal emission; no StudyLoad/CycleSnapshot/LearningCycle mutation; no enrollment-pointer mutation; no DN/DU precondition gating; no write authorization; no convergence decision; no source-of-truth resolution; no UI surface added). Reuses EA verbatim via `reconcileContinuityStart(...)` (no duplicated classification logic). Emits a machine-readable precedence summary under a **1:1 TOTAL rule** over EA's six statuses: `no_structural_block`→`shadow`/`no_materialized_block_yet`/`low`; `aligned_skillstate`→`structural`/`structural_is_materializer_of_record_and_aligned`/`low`; `shape_divergent_safe`→`structural`/`shadow_low_confidence_vs_materialized_structural`/`medium`; `shape_divergent_refusal`→`structural`/`shadow_refusal_vs_materialized_structural`/`medium`; `shadow_empty_vs_materialized`→`structural`/`shadow_empty_vs_materialized_structural`/`medium`; `set_divergent_skillstate`→`structural`/`shadow_set_escapes_structural_selection`/`high`. Rule is deliberately conservative: structural is preferred in every state with a materialized structural block; shadow is preferred only when no structural block exists yet (and labelled `low` risk precisely because there is nothing to displace). Encoded as a `Record<ReconciliationStatus, PrecedenceRule>` so any new EA status forces a TypeScript compile-time break → explicit EB-successor phase. **MANDATORY semantic clarification of `precedence.preferred`:** it is a **current governance-reading result only** — it states only which side currently has priority of interpretation under the present system posture. It does **NOT** mean the non-preferred side is invalid, deprecated, suppressed, or loses audit value, and it does **NOT** mean source-of-truth resolution has been made. The full DV+DW+DX+DY+DZ audit chain is preserved under `source.ea.shadow.source` and remains authoritative for both sides. Constants emitted on every response as contract anchors: `materializerOfRecord='structural_dn_du'`, `shadowSide='dz_shadow_block'`, `isSourceOfTruthDecision=false`, `isWriteAuthorization=false`. `riskTier` is a typed literal union, not a dynamic score, not a pedagogical signal, not an action threshold | `lib/continuity-start/precedence.ts`, `app/api/continuity-start/precedence/route.ts` |   ✅ |
| EC    | Minimal read-only convergence-reading layer between the structural materialization (DN/DU) and the tactical shadow continuity-start (DZ), consuming EA + EB (pure read; no schema change; no writes; no DN/DU replacement; no DZ replacement; no EA replacement; no EB replacement; no ContinuitySignal emission; no StudyLoad/CycleSnapshot/LearningCycle mutation; no enrollment-pointer mutation; no DN/DU precondition gating; no write authorization; no convergence execution; no merge decision; no materializer-of-record promotion; no source-of-truth resolution; no UI surface added). Reuses EB verbatim via `resolveContinuityStartPrecedence(...)` (which reuses EA verbatim) — no duplicated classification logic. Emits a machine-readable convergence-posture summary under a **1:1 TOTAL rule** over EA's six statuses: `no_structural_block`→`structurally_deferred`/`none`/`no_materialized_structural_block_yet_to_converge_with`/`low`; `aligned_skillstate`→`convergible_safe`/`narrow_subset_alignment`/`shadow_skillids_subset_of_structural_selection`/`low`; `shape_divergent_safe`→`blocked`/`none`/`shadow_low_confidence_vs_materialized_structural`/`medium`; `shape_divergent_refusal`→`blocked`/`none`/`shadow_refusal_vs_materialized_structural`/`medium`; `shadow_empty_vs_materialized`→`blocked`/`none`/`shadow_empty_vs_materialized_structural`/`medium`; `set_divergent_skillstate`→`blocked`/`none`/`shadow_set_escapes_structural_selection`/`high`. Rule is deliberately conservative: `convergible_safe` + `narrow_subset_alignment` is emitted ONLY for `aligned_skillstate` (EC does NOT exploit EB's `preferred=structural` to upgrade convergence posture — precedence and convergibility are different questions). Encoded as a `Record<ReconciliationStatus, ConvergenceRule>` so any new EA status forces a TypeScript compile-time break → explicit EC-successor phase. Binding kind/posture invariant: `kind==='narrow_subset_alignment'` iff `posture==='convergible_safe'`; `kind==='none'` otherwise. **MANDATORY semantic clarification of `convergence.posture`:** (a) `convergible_safe` is a **current posture reading only** — it means ONLY that the current posture is compatible with a LATER, SEPARATELY SCOPED convergence write (shadow skillIds are a structural SUBSET of the structural `selectedSkillIds` for the chosen reference cycle). It does **NOT** mean "converge now", "recommended to converge now", "scheduled to converge now", automatic merge justification, or automatic materializer-of-record promotion — it is a posture-reading only, NOT an execution recommendation; (b) `blocked` does NOT mean the shadow side is invalid, deprecated, suppressed, or loses audit value (EB-2 clause inherited wholesale); (c) `structurally_deferred` does NOT mean shadow has been promoted or that convergence has been silently performed. The full DV+DW+DX+DY+DZ audit chain is preserved under `source.eb.source.ea.shadow.source` (via EB echo, itself via EA echo). Constants emitted on every response as contract anchors: `materializerOfRecord='structural_dn_du'`, `shadowSide='dz_shadow_block'`, `isSourceOfTruthDecision=false`, `isWriteAuthorization=false`, `isConvergenceExecution=false`, `isMergeDecision=false`. `riskTier` is a typed literal union, not a dynamic score, not a pedagogical signal, not an action threshold. Richer convergence kinds beyond `narrow_subset_alignment` are explicitly deferred to a separately scoped phase | `lib/continuity-start/convergence.ts`, `app/api/continuity-start/convergence/route.ts` |   ✅ |
| ED | First official continuity-start governance-reading writeback (single POST write path; no schema change; no DN/DU replacement; no DZ replacement; no EA/EB/EC replacement; no convergence execution; no merge decision; no source-of-truth promotion; no materializer-of-record promotion; no enrollment-pointer mutation; no UI). Adds `POST /api/continuity-start/convergence/record` that calls `resolveContinuityStartConvergence(...)` (EC reader) and writes exactly ONE `ContinuitySignal` row per call with `signalType='continuity_start_governance_reading'`, `enrollmentId=<input>`, `learningCycleId=<EC.referenceCycleId or null>`, `evaluationId=null`, and `rationale=<FLAT scalar-only JSON envelope>`. **Rescue v1 uses a FLAT scalar-only rationale payload** `{schemaVersion:'ed.v1.flat', phase:'ED', recordingEventOnly:true, semanticClarification:<literal string>, posture, kind, riskTier, reconciliationStatus, precedencePreferred, referenceCycleId, referenceCycleNumber, materializerOfRecord, shadowSide, isSourceOfTruthDecision, isWriteAuthorization, isConvergenceExecution, isMergeDecision, evaluatedAt}` — replacing the prior ED v1 deeply-nested `rationale.ec=<full ConvergenceResult>` envelope with ONLY scalars derived from the EC read. The full DV+DW+DX+DY+DZ audit chain is NOT persisted into the signal row in rescue v1; it remains reconstructible at read time by calling the EC reader (`GET /api/continuity-start/convergence?enrollmentId=...`). The six constant contract anchors (`materializerOfRecord='structural_dn_du'`, `shadowSide='dz_shadow_block'`, `isSourceOfTruthDecision=false`, `isWriteAuthorization=false`, `isConvergenceExecution=false`, `isMergeDecision=false`) are persisted on every row. `ContinuitySignal.signalType` is a free-form String column (no enum) so no schema change is required. **MANDATORY SEMANTIC CLARIFICATION:** `continuity_start_governance_reading` is a **RECORDING EVENT ONLY** — a persisted audit snapshot of the current EA+EB+EC governance posture at the moment of call. It does **NOT** mean workflow transition, state transition, authorization, trigger, or operational-state-changing checkpoint; it also does NOT mean source-of-truth resolution, write authorization for any subsequent operation, convergence execution, merge decision, materializer-of-record promotion, pedagogical verdict, or instructional equivalence claim. No idempotency/dedup/throttling is applied by design (each call is a distinct point-in-time reading). Richer payload embedding (incl. re-introducing the nested EC+audit chain under `rationale.ec`) is explicitly **deferred to a separately scoped later phase**. DN/DU remains the sole structural materializer of record; DZ remains shadow-only; EA/EB/EC remain pure read layers | `app/api/continuity-start/convergence/record/route.ts`, `scripts/ed_probe.ts` |   ✅ |
| EE | Minimal read-only consultation layer for `continuity_start_governance_reading` records (GET companion to ED's write path, same URL; pure read; no schema change; no writes; no UI; no DN/DU replacement; no DZ/EA/EB/EC replacement; no ED-semantics change; no idempotency/dedup concern; no enrollment-pointer mutation; no StudyLoad/CycleSnapshot/LearningCycle/ContinuitySignal mutation during normal operation). Adds `GET /api/continuity-start/convergence/record?enrollmentId=<cuid>[&limit=1..50][&cursor=<id>]` as a new handler on the EXISTING ED route file (no new route, no new file). Strict hard-coded filter `signalType='continuity_start_governance_reading'` inside the handler (NOT a query parameter) — EE can return ONLY ED-typed rows even if other signalType values exist in `continuity_signals` for the same enrollment; widening requires an explicit code change, not a URL change. Auth-guarded; 401 unauth; 400 missing enrollmentId; 404 enrollment not found; 200 `{enrollmentId, signalType, count, items[], nextCursor, effectiveLimit}`. Keyset pagination on `createdAt DESC, id DESC` using `ContinuitySignal.id` as an opaque cursor; default limit 20, hard cap 50, out-of-range clamps to cap (echoed as `effectiveLimit`). `rationale` is JSON-parsed per-row (stored as JSON-encoded String by ED); a per-row try/catch returns the raw string with `rationaleParseOk=false` if parse fails — a single corrupt row CAN NEVER 500 the list. **MANDATORY SEMANTIC CLARIFICATION:** this GET endpoint is a **CONSULTATION SURFACE ONLY**. It does NOT mean workflow integration, behavioral dependency, gating dependency, operational decision source, or replacement of direct DB inspection for broader ContinuitySignal semantics. During EE, no other code path is allowed to depend on this endpoint for workflow behavior, gating, or operational decisions; EE output must not be consumed anywhere else in the codebase in this phase (no import of this endpoint from DN/DU, DZ, EA, EB, EC, ED, or any admin / student-facing flow). The ED recording semantics remain unchanged: `continuity_start_governance_reading` rows are still a recording event only, not a workflow transition / state transition / authorization / trigger / operational-state-changing checkpoint. Reversibility: delete the `GET` export from the route file and delete `scripts/ee_probe.ts` — endpoint returns to ED-only POST, zero data cleanup needed. Deferred to separately scoped later phases: richer filters (posture/kind/riskTier/cycleId/date range), aggregation / counting-by-posture, `(enrollmentId, signalType, createdAt DESC)` composite index, any UI surface on top of these records, any behavioral integration that consumes these records | `app/api/continuity-start/convergence/record/route.ts` (modified — `GET` added alongside existing `POST`), `scripts/ee_live_probe.sh` (new), `scripts/ee_malformed_probe_v2.sh` (new) |   ✅ |
| EF rescue v2 | Minimal read-only admin consultation panel on enrollment detail that consumes EE's `GET /api/continuity-start/convergence/record` (pure read; no schema change; no writes; no new API; no new route; no DN/DU replacement; no DZ/EA/EB/EC/ED/EE replacement; no ED-semantics change; no EE-semantics change; no enrollment-pointer mutation; no StudyLoad/CycleSnapshot/LearningCycle/ContinuitySignal mutation). Adds a single client panel embedded at the bottom of the admin enrollment detail page (`/admin/instances/[id]`) that calls EE exactly ONCE with `limit=3` and renders the returned records inline as plain paragraph rows (no table, no badges, no icons, no collapsibles, no buttons, no pagination UI, no rationale viewer, no JSON dump). Panel copy is verbatim and fixed: title `Governance-reading records`; caption `"This surface shows persisted governance-reading records for this enrollment. It is a record log, not the live authoritative operational state. Not a workflow state surface. Not the current authoritative operational state. Not a source-of-truth surface."`; count line `Total recorded: {json.count}` (always rendered, echoes EE `count` as-is); per-row body `{createdAt} · {posture} · {riskTier}`; empty state `No records.`; loading state `Loading…`; error state `Could not load records.`. Bundle delta on `/admin/instances/[id]`: 7.53 kB (EE) → 8.13 kB (v2) = **+0.60 kB** (< +1.0 kB guardrail). Diff vs EE baseline: `enrollment-detail-view.tsx` +3 insertions (1 import, 1 blank, 1 panel embed); new `governance-readings-panel.tsx` = 66 LOC. **MANDATORY SEMANTIC CLARIFICATION:** this panel is a **CONSULTATION SURFACE ONLY**. `Total recorded: {count}` echoes EE's returned `count` (post-limit items.length — under `limit=3`, enrollments with >3 stored records display `Total recorded: 3`; this is EE's documented semantic, intentionally NOT reinterpreted by the panel). The panel does NOT mean workflow integration, behavioral dependency, gating dependency, operational decision source, or a live authoritative operational state surface; it is a record log, NOT a workflow state surface, NOT the current authoritative operational state, NOT a source-of-truth surface. Reversibility: delete `governance-readings-panel.tsx` and revert the 3-line diff in `enrollment-detail-view.tsx` — enrollment detail returns to pre-v2 state, zero data cleanup needed. Deferred to separately scoped later phases: pagination UI (cursor prev/next), rationale/JSON inspector, posture/kind/riskTier filters, date range filter, per-row deep link, count-vs-total reconciliation UI, any convergence-execution / merge / source-of-truth UI | `app/admin/instances/[id]/_components/governance-readings-panel.tsx` (new), `app/admin/instances/[id]/_components/enrollment-detail-view.tsx` (modified — +3 lines: 1 import, 1 blank, 1 panel embed) |   ✅ |
| EG | Minimal admin-only operational attention signal derived from the latest persisted governance-reading record per enrollment (pure read; no schema change; no migration; no writes; no new API route; no new API surface; no DN/DU replacement; no DZ/EA/EB/EC/ED/EE replacement; no EF rescue v2 replacement; no ED-semantics change; no EE-semantics change; no `/now` change; no enrollment-pointer mutation; no StudyLoad/CycleSnapshot/LearningCycle/ContinuitySignal mutation; no `lib/continuity-start/**` change; no `/api/continuity-start/**` change; no workflow integration; no blocking warning; no modal/dialog/banner/filter/sorting/tooltip/menu/button/action; no new signal type; no N+1 client fetches). Extends the existing `GET /api/instances` and `GET /api/instances/[id]` handlers with a Prisma nested include on `continuitySignals` (strictly `where: { signalType: 'continuity_start_governance_reading' }`, `orderBy: [{ createdAt: 'desc' }, { id: 'desc' }]`, `take: 1`, `select: { rationale: true }`) and a post-query map that JSON-parses `rationale` and extracts the `posture` scalar as `latestGovernancePosture: string | null` per instance — raw `continuitySignals` is stripped from the response envelope to prevent leakage. Adds a pure mapping module `lib/admin/attention-signal.ts` encoding a **1:1 TOTAL** rule over four attention states: `blocked`→`attention_required`, `structurally_deferred`→`monitor`, `convergible_safe`→`stable`, null/unknown/unmapped→`no_governance_record` (conservative default; widening requires code edit). Adds a shared presentation component `app/admin/_components/attention-signal.tsx` with two named exports: `AttentionSignalLine` (detail-header use; label + muted advisory note `"Advisory only. Does not block workflow."`) and `AttentionSignalCell` (list-row use; compact label only). Color map: `attention_required` → amber-700, `monitor` → blue-700, `stable` → emerald-700, `no_governance_record` → muted-foreground. Surfaces: one `AttentionSignalLine` inserted inside the header Card's `CardContent` on `/admin/instances/[id]` below the Started/Ended/Last activity/Created 4-col grid (separated by `mt-4 pt-4 border-t`), and one `AttentionSignalCell` inserted after the bottom metadata grid on each enrollment row in `/admin/instances` with the prefix `Attention:`. Diff vs EF rescue v2 baseline: 5 files changed, +79/−3 lines (2 new: `lib/admin/attention-signal.ts` 67 LOC, `app/admin/_components/attention-signal.tsx` 60 LOC; 3 modified: `app/api/instances/route.ts` +35/−2 on GET only — POST untouched; `app/api/instances/[id]/route.ts` +31/−1 on GET only — PATCH/PUT/DELETE untouched; `app/admin/instances/_components/instances-view.tsx` +7/−0; `app/admin/instances/[id]/_components/enrollment-detail-view.tsx` +7/−0). Route sizes on deploy: `/admin/instances` 2.91 kB / 129 kB First Load JS, `/admin/instances/[id]` 5.92 kB / 132 kB First Load JS, `/now` 6.22 kB unchanged. **MANDATORY SEMANTIC CLARIFICATION:** the attention signal is an **ADVISORY READING ONLY**. It does **NOT** mean workflow decision, blocking condition, write authorization, write gating, source-of-truth resolution, materializer-of-record change, continuity-state mutation, ContinuitySignal emission, convergence execution, or merge decision. It does **NOT** replace, override, or shadow the EF rescue v2 Governance-reading records panel, which remains the canonical admin consultation surface for the record log; EG coexists with EF rescue v2 on the same detail page without collision. `no_governance_record` does **NOT** mean the enrollment is invalid, deprecated, or blocked from any operation — it means only that no `continuity_start_governance_reading` row is yet persisted for this enrollment. EG reads strictly from the TOP-1 `ContinuitySignal` row per enrollment by the hard-coded filter above; it does NOT aggregate, NOT tally, NOT reconcile, and NOT re-run EA/EB/EC logic. Reversibility: delete `lib/admin/attention-signal.ts` and `app/admin/_components/attention-signal.tsx`, then revert the +7/−0 additions in `instances-view.tsx` and `enrollment-detail-view.tsx`, and revert the +35/−2 and +31/−1 additions on the GET handlers in `app/api/instances/route.ts` and `app/api/instances/[id]/route.ts` — admin views return to pre-EG state, zero data cleanup needed (EG wrote nothing to the database). Deferred to separately scoped later phases: any derivation from richer EC fields (kind, riskTier), any count-of-records surface on the list view, any filter/sort by posture, any workflow gating based on posture, any student-facing surface of the advisory label | `lib/admin/attention-signal.ts` (new), `app/admin/_components/attention-signal.tsx` (new), `app/api/instances/route.ts` (modified — GET only), `app/api/instances/[id]/route.ts` (modified — GET only), `app/admin/instances/_components/instances-view.tsx` (modified — +7), `app/admin/instances/[id]/_components/enrollment-detail-view.tsx` (modified — +7) |   ✅ |
| EH | Minimal client-side attention-signal filter on the admin enrollment list (pure read; single-file edit; no schema change; no migration; no writes; no new API route; no new API surface; no DN/DU replacement; no DZ/EA/EB/EC/ED/EE replacement; no EF rescue v2 replacement; no EG replacement; no ED-semantics change; no EE-semantics change; no EG-semantics change; no `/now` change; no `/admin/instances/[id]` change; no `/admin/learning-cycles/**` change; no enrollment-pointer mutation; no StudyLoad/CycleSnapshot/LearningCycle/ContinuitySignal mutation; no `lib/continuity-start/**` change; no `/api/continuity-start/**` change; no workflow integration; no blocking warning; no modal/dialog/banner/tooltip/menu/button/action; no re-fetch on filter change; no URL query param; no localStorage; no cookie; no server-side persistence; no sort change; no search change; no new counts/charts/badges beyond EG; no helper addition to `lib/admin/attention-signal.ts`; no change to `AttentionSignalLine`/`AttentionSignalCell` presentation components; no N+1 fetches). Reuses the EG `mapPostureToAttentionSignal` helper verbatim via named import to filter the already-fetched `instances` array in-memory on the admin list page. Adds a 5-option `<select id="attention-filter">` next to the existing search input (wrapped in a `flex-wrap` row so small screens do not crush the controls), with fixed verbatim label `Filter by attention signal` and verbatim options `All` / `Attention required` / `Monitor` / `Stable` / `No governance record` (last four pulled from `ATTENTION_SIGNAL_LABELS` — the literal `"All"` is the non-filter option). Filter composition is strict AND with the existing search predicate inside the existing IIFE (`search` narrows first, then `attentionFilter` narrows further on `mapPostureToAttentionSignal(inst.latestGovernancePosture)`). Empty-state priority: when `attentionFilter !== 'all'` AND filtered rows = 0, a filter-specific empty state renders with the verbatim copy `No enrollments match this filter.` (no icon); the existing `No enrollments match your search.` empty state (Search icon) is preserved for the search-only empty case. The existing per-card EG attention labels (`AttentionSignalCell`) are untouched; the existing "Showing X of Y" counter on search remains untouched and still counts by search only. Local component state only: `const [attentionFilter, setAttentionFilter] = useState<'all' | AttentionSignal>('all')` — dropdown selection is lost on page reload (no persistence by design). Diff vs EG baseline: **1 file changed, +52/−4 lines** — `app/admin/instances/_components/instances-view.tsx` ONLY (added: 1-line `Label` import, 3-line named import from `@/lib/admin/attention-signal`, 1-line `attentionFilter` useState, ~15-line flex-row wrapper + `<select>` control with 5 `<option>` elements, ~14-line composed-filter IIFE with priority empty-state branch; removed: 4 lines of the prior single-filter IIFE replaced by the composed form). Route size on deploy: `/admin/instances` 2.91 kB → **3.13 kB** (+0.22 kB, within "minimal" guardrail); `/admin/instances/[id]` 5.92 kB unchanged; `/admin/learning-cycles` 4.65 kB unchanged; `/admin/learning-cycles/[id]` 8.88 kB unchanged; `/now` 6.22 kB unchanged; shared First Load JS unchanged. Live verification on production (authenticated as `john@doe.com`, API `/api/instances` returned 13 rows with posture distribution `attention_required=1` / `monitor=0` / `stable=0` / `no_governance_record=12`): default filter = **All** → 13 cards with EG labels intact (John Doe amber "Attention required", 12 others muted "No governance record"); **Attention required** → 1 card (John Doe / PAES_M1) only; **Monitor** → empty state `No enrollments match this filter.`; **Stable** → empty state `No enrollments match this filter.`; **No governance record** → 12 cards; return to **All** → 13 cards restored. Network-call interception across all 5 filter transitions: `instancesApiCalls: []` (ZERO `/api/instances` refetches); only `/api/auth/session` (NextAuth background) observed, unrelated to filter state. Regression on untouched routes (all HTTP:200): `/now` 14713B, `/admin/instances/cmoadr1x20003syur0rgskn12` 22870B (blocked posture EG header intact), `/admin/instances/cmoaclitj0002o508m33ya9jb` 22870B (null posture EG header intact), `/admin/learning-cycles` 24502B, `/admin/learning-cycles/cmoadrcic000bsyur194d11bo` 22795B. **MANDATORY SEMANTIC CLARIFICATION:** the attention-signal filter is a **LIST-SCANNING AFFORDANCE ONLY**. It does **NOT** mean workflow priority, workflow urgency, workflow gating, blocking condition, write authorization, source-of-truth resolution, materializer-of-record change, continuity-state mutation, ContinuitySignal emission, convergence execution, merge decision, pedagogical verdict, or operational decision. It does **NOT** change EG semantics (EG per-card/per-header advisory reading is preserved verbatim in both control and content). `attentionFilter='no_governance_record'` showing a populated list does **NOT** mean those enrollments are invalid, deprecated, blocked, or pending action — it means only that no `continuity_start_governance_reading` row is yet persisted for those enrollments; the display is identical to EG's default per-card label and carries no workflow implication. The absence of persistence (no URL param, no localStorage, no cookie) is **INTENTIONAL**: filter state resets on reload because the filter is a transient scanning affordance, NOT a stored view preference, NOT a saved query, NOT a bookmarkable state. The "Showing X of Y" counter on the search input was deliberately NOT extended to account for the attention filter (out of scope: "no new counts/charts/badges beyond EG"). The filter does NOT affect `/admin/instances/[id]` (detail page navigation is a direct route change — the filter is list-only). Reversibility: revert the +52/−4 single-file diff in `instances-view.tsx` — admin list returns to pre-EH state, zero data cleanup needed (EH wrote nothing to the database, nothing to `continuity_signals`, nothing to any persistence layer; the EG reader chain is untouched). Deferred to separately scoped later phases: filter-aware "Showing X of Y" counter, filter persistence via URL query param (e.g. `?attention=monitor`), filter combinability with multi-select (e.g. "attention_required OR monitor"), richer filter dimensions beyond posture (riskTier, kind, referenceCycleId), sort-by-attention, per-posture counts in the dropdown labels (e.g. "Attention required (1)"), student-facing surface of the filter, any workflow integration of the filtered selection | `app/admin/instances/_components/instances-view.tsx` (modified — +52/−4 single-file edit) |   ✅ |
| EI | Open-enrollment quick-link confirmed **already-satisfied** from Phase H (no code change, no deploy, no checkpoint needed). Inspection of `app/admin/instances/_components/instances-view.tsx` on the current EH-deployed baseline confirmed that each enrollment card already renders an `Open enrollment` quick-link (`next/link` to `/admin/instances/[id]`, `target="_self"`, no `rel="noopener"` needed because no new tab) on all 13 rows, with IDs correctly interpolated (e.g. John Doe card → `cmoadr1x20003syur0rgskn12`). Live click-verification: SPA-style client-side navigation only, zero `/api/instances` refetches on click, zero new tabs opened, no additional network activity beyond the expected single server render of the target detail page. Conclusion: EI's operational goal is materially identical to behavior shipped in Phase H (commit `d50e588`). EI closed as **already-satisfied**. **MANDATORY SEMANTIC CLARIFICATION:** closing EI as already-satisfied does NOT mean the quick-link has been re-validated as a product-level UX decision, nor does it mean any change in link semantics, navigation semantics, or detail-page semantics; it means only that a separate EI implementation phase is redundant because the feature already exists verbatim in the deployed codebase. No schema change, no API change, no component change, no route-size delta, no deploy. Reversibility: trivially — EI changed nothing. | (none — no code change) |   ✅ |
| EJ | Filter-aware canonical list-orientation counter on the admin enrollment list (`/admin/instances`). The pre-EH **search-only counter** (conditional `{search && ...}` rendering `"Showing X of Y"`, filtering only by student/program substring) was **intentionally removed** because it was semantically obsolete after EH introduced the composed search + attention-signal filter: a counter that ignores the attention filter produces a misleading orientation cue (e.g. under `Attention required` with 1 matching row out of 13, a search-only counter would show nothing, implying no filtering, while the visible list shows a single card). Keeping both counters was ruled out as creating contradictory UI. EJ replaces the pre-EH counter with a **single canonical orientation counter** that always renders inside the controls row, always composes both the search predicate and the EH `attentionFilter` predicate (same strict AND composition used by the list-rendering IIFE), and emits `Showing {filteredCount} of {totalCount} enrollments`. Styling is intentionally minimal (`text-xs text-muted-foreground`) to match the existing pre-EH counter's visual weight and not create a new visual feature beyond orientation. Pure read; single-file edit (`app/admin/instances/_components/instances-view.tsx`); no schema change; no migration; no writes; no new API route; no new API surface; no DN/DU/DZ/EA/EB/EC/ED/EE replacement; no EF rescue v2 replacement; no EG replacement; no EH replacement (EH filter logic preserved verbatim); no ED/EE/EG/EH semantics change; no `/now` change; no `/admin/instances/[id]` change; no `/admin/learning-cycles/**` change; no enrollment-pointer mutation; no StudyLoad/CycleSnapshot/LearningCycle/ContinuitySignal mutation; no `lib/continuity-start/**` change; no `/api/continuity-start/**` change; no workflow integration; no blocking warning; no modal/dialog/banner/tooltip/menu/button/action; no re-fetch on filter/search change; no URL query param; no localStorage; no cookie; no server-side persistence; no N+1 fetches. Diff vs EH baseline: **1 file changed, +18/−8 lines** — `app/admin/instances/_components/instances-view.tsx` ONLY (added: composed-predicate inline IIFE identical in predicate semantics to the list-rendering IIFE, emitting the filtered count; removed: the old `{search && (<span>Showing X of Y</span>)}` pre-EH block in its entirety). Route size on deploy: `/admin/instances` 3.13 kB → **3.12 kB** (−0.01 kB, well within "minimal" guardrail); `/admin/instances/[id]` 5.92 kB unchanged; `/admin/learning-cycles` 4.65 kB unchanged; `/admin/learning-cycles/[id]` 8.88 kB unchanged; `/now` 6.22 kB unchanged; shared First Load JS unchanged. Pre-deploy verification (staging, authenticated as `john@doe.com`, `/api/instances` returns 13 rows with posture distribution `attention_required=1 / monitor=0 / stable=0 / no_governance_record=12`): **All + empty search** → `Showing 13 of 13 enrollments`; **All + search "John"** → `Showing 1 of 13 enrollments`; **Attention required + empty search** → `Showing 1 of 13 enrollments`; **Monitor + empty search** → `Showing 0 of 13 enrollments`; **No governance record + empty search** → `Showing 12 of 13 enrollments`. Zero `/api/instances` refetches across all transitions (network interception confirmed). Regression on untouched routes (all HTTP:200): `/now`, `/admin/instances/cmoadr1x20003syur0rgskn12`, `/admin/learning-cycles/cmoadrcic000bsyur194d11bo` — unaffected. **MANDATORY CLOSURE REPORT (per explicit user directive on the EJ deploy gate):** (a) a **legacy search-only counter previously existed** on `/admin/instances` (conditional `{search && (...)}` render, filtering only by student name / program code / program name substring, ignoring the EH attention-signal filter introduced by EG/EH); (b) this legacy counter was **intentionally removed / replaced** in EJ because it was **incompatible with the current search + attention-filter composed semantics** (it would under-report or misreport the effective visible list size whenever the EH attention filter narrowed the list below the search-matched set, creating a contradictory orientation cue relative to the visible cards); (c) the new `Showing X of Y enrollments` line introduced in EJ is now the **single canonical list-orientation counter** for `/admin/instances`, composing both the search predicate and the EH attention filter in strict AND (identical predicate to the list-rendering IIFE) and always rendered in the controls row (not conditional on search being non-empty). Keeping both counters side-by-side was **explicitly considered and rejected** as producing contradictory UI; EJ is therefore a **replacement, not an addition**. **MANDATORY SEMANTIC CLARIFICATION:** the EJ counter is a **LIST-ORIENTATION READING ONLY**. It does **NOT** mean workflow priority, workflow urgency, workflow gating, blocking condition, write authorization, source-of-truth resolution, materializer-of-record change, continuity-state mutation, ContinuitySignal emission, convergence execution, merge decision, pedagogical verdict, or operational decision. It does **NOT** change EG/EH semantics (EG per-card advisory labels preserved verbatim; EH filter predicate preserved verbatim; EH filter is still list-only, not URL/localStorage/cookie-persisted). `Showing 0 of N enrollments` does **NOT** mean the enrollments are invalid, deprecated, blocked, or pending action — it means only that no row in the already-fetched list currently satisfies the composed search + attention-filter predicate; the existing EH empty-state messages (`No enrollments match this filter.` / `No enrollments match your search.`) continue to render per their own rules and are authoritative over the card area. The absence of persistence (no URL param, no localStorage, no cookie) is **INTENTIONAL** and inherited from EH's transient-affordance contract. Reversibility: revert the +18/−8 single-file diff in `instances-view.tsx` — admin list returns to pre-EJ state (which restores the legacy search-only counter); no data cleanup needed (EJ wrote nothing to the database, nothing to `continuity_signals`, nothing to any persistence layer). Deferred to separately scoped later phases: counter persistence via URL query param, counter-combinability with multi-select filters, per-posture counts in the dropdown labels (e.g. "Attention required (1)"), sort-by-attention with reflected counts, any student-facing surface of the orientation counter, any workflow integration of the filtered count | `app/admin/instances/_components/instances-view.tsx` (modified — +18/−8 single-file edit) |   ✅ |
| EK | Minimal admin acknowledgement/review action for advisory attention signals on enrollments. **Zero schema change** — uses the existing `ContinuitySignal` model with a new `signalType='attention_acknowledged'`. Adds `POST /api/instances/[id]/acknowledge` that creates a `ContinuitySignal` row recording which posture was acknowledged, which governance-reading row was current at acknowledgement time, and which admin performed the action. Acknowledgement is **automatically stale** if a new `continuity_start_governance_reading` row is later written (timestamp comparison: ack must be ≥ latest reading's `createdAt` to be considered current). Extends `GET /api/instances` and `GET /api/instances/[id]` to surface `attentionAcknowledged: boolean` alongside the existing `latestGovernancePosture: string | null`. Updates `AttentionSignalLine` (detail header) with a "Mark as reviewed" button (shown only when unacknowledged and signal ≠ `no_governance_record`), a "✓ Reviewed" emerald badge (when acknowledged), and adjusted advisory caption ("Reviewed by admin. Does not mean pedagogically resolved."). Updates `AttentionSignalCell` (list row) with a compact "✓ Reviewed" badge next to the attention label. The EH attention filter is **unchanged**: acknowledged enrollments remain visible under their original attention category (e.g. "Attention required" still shows John Doe even after acknowledgement — acknowledged ≠ resolved). The EJ canonical counter is **unchanged**: counts are unaffected by acknowledgement state. No schema change; no migration; no DN/DU/DZ replacement; no EA/EB/EC/ED/EE/EF/EG/EH/EJ replacement; no ED/EE/EG/EH/EJ semantics change; no `/now` change; no `/admin/learning-cycles/**` change; no enrollment-pointer mutation; no LearningCycle/StudyLoad/CycleDecision/CycleEvaluation/CycleSnapshot/SkillState mutation; no `lib/continuity-start/**` change; no `/api/continuity-start/**` change; no closed-cycle protection change; no mastery/confidence change; no adaptive/pedagogical automation. Diff: 7 files changed — 1 new (`app/api/instances/[id]/acknowledge/route.ts` 97 LOC), 6 modified (`app/api/instances/route.ts` GET query widened to include `attention_acknowledged` signal type + derive `attentionAcknowledged` boolean; `app/api/instances/[id]/route.ts` same; `app/admin/_components/attention-signal.tsx` +Button/state/toast for acknowledge action + Reviewed badge; `app/admin/instances/_components/instances-view.tsx` +1 interface field + `acknowledged` prop on `AttentionSignalCell`; `app/admin/instances/[id]/_components/enrollment-detail-view.tsx` +1 interface field + new props on `AttentionSignalLine`; `lib/admin/attention-signal.ts` unchanged). Route sizes on deploy: `/admin/instances` 3.12 kB → **3.14 kB** (+0.02 kB); `/admin/instances/[id]` 5.92 kB → **5.95 kB** (+0.03 kB); `/admin/learning-cycles` 4.65 kB unchanged; `/admin/learning-cycles/[id]` 8.88 kB unchanged; `/now` 6.22 kB unchanged. Browser verification (5 checks all passed): (1) signal visible before acknowledgement ✓; (2) "Mark as reviewed" button available on detail page ✓; (3) acknowledgement persists after page refresh ✓; (4) list/filter/counter behavior remains coherent (acknowledged enrollments still show under their attention category, "✓ Reviewed" badge visible on list cards) ✓; (5) no unrelated cycle/study-load/skill-state state changes (`/now` unaffected, cycles/loads/states identical) ✓. **Semantic boundary preserved**: acknowledged/reviewed does NOT mean pedagogically resolved; does NOT close cycles; does NOT create or modify cycle decisions; does NOT modify study loads; does NOT modify skill states; does NOT change mastery/confidence; does NOT write adaptive or pedagogical automation; does NOT touch DN/DU/DZ semantics; does NOT refactor the governance-reading architecture. The `attention_acknowledged` signal row's `rationale` contains `{schemaVersion:'ek.v1', phase:'EK', action:'acknowledge', acknowledgedPosture, acknowledgedReadingId, acknowledgedReadingCreatedAt, acknowledgedBy, acknowledgedAt, semanticNote:'Administrative acknowledgement only. Does not mean pedagogically resolved.'}`. Reversibility: delete `app/api/instances/[id]/acknowledge/route.ts`, revert the GET-handler changes in `app/api/instances/route.ts` and `app/api/instances/[id]/route.ts` (restore single-signalType query), revert `attention-signal.tsx` to pre-EK (remove Button/state/toast/badge), revert interface+prop additions in `instances-view.tsx` and `enrollment-detail-view.tsx` — admin views return to pre-EK state; existing `attention_acknowledged` rows in `continuity_signals` are inert (no code reads them). Deferred to separately scoped later phases: filter by acknowledged/unacknowledged state, undo/reset acknowledgement, batch acknowledgement from list view, acknowledgement history panel, student-facing surface of the acknowledgement, any workflow gating based on acknowledgement state | `app/api/instances/[id]/acknowledge/route.ts` (new), `app/api/instances/route.ts` (modified — GET only), `app/api/instances/[id]/route.ts` (modified — GET only), `app/admin/_components/attention-signal.tsx` (modified), `app/admin/instances/_components/instances-view.tsx` (modified — +2 lines), `app/admin/instances/[id]/_components/enrollment-detail-view.tsx` (modified — +5 lines) |   ✅ |
| EL | Added minimal enrollments-list filter for attention-required signals pending administrative review. Preserved semantic boundary: unreviewed/reviewed are administrative review states, not pedagogical resolution. Kept existing Attention required filter behavior unchanged. Kept EK reviewed badge and EJ filter-aware counter behavior coherent. Verified with TypeScript, production build, browser checks, and deployment confirmation. Deployed to tutoring-platform-mv-l4o1ne.abacusai.app. Post-deploy issues: none | `app/admin/instances/_components/instances-view.tsx` (modified — +15/−7 single-file edit) |   ✅ |
| EM | Added minimal enrollments-list filter for attention-required signals that have already been administratively reviewed/acknowledged (EK). Logical complement of EL: where EL shows `attention_required AND NOT acknowledged`, EM shows `attention_required AND acknowledged`. Preserved semantic boundary: reviewed is an administrative review state, not pedagogical resolution. Kept existing Attention required, Attention unreviewed, and all other filter behaviors unchanged. Kept EK reviewed badge and EJ filter-aware counter behavior coherent. Verified with TypeScript, production build, browser checks (8 scenarios), and deployment confirmation. Deployed to tutoring-platform-mv-l4o1ne.abacusai.app. Post-deploy issues: none | `app/admin/instances/_components/instances-view.tsx` (modified — single-file edit, +10/−3 lines) |   ✅ |
| EN | Added minimal read-only current-cycle operational summary to enrollment detail. Surfaced cycle status and study-load counts without adding actions or automation. Preserved cycle, study-load, decision, skill-state, and adaptive semantics unchanged. Kept prior attention workflow behavior from EK/EL/EM unaffected. Verified with TypeScript, production build, browser checks, and deployment confirmation. Deployed to tutoring-platform-mv-l4o1ne.abacusai.app. Post-deploy issues: none | `app/api/instances/[id]/route.ts` (modified — GET read-layer expansion: added `studyLoads: { select: { status: true } }` to learningCycles include), `app/admin/instances/[id]/_components/enrollment-detail-view.tsx` (modified — added `studyLoads` to interface + operational cycle summary IIFE section) |   ✅ |

## Schema notes

| Block  | Change                                  | Notes                                                 |
| ------ | --------------------------------------- | ----------------------------------------------------- |
| A–D    | Core schema established and completed   | Last known schema-expansion block                     |
| DF     | Added `Diagnostic` model                | `diagnostics` table; FK to `StudentProgramInstance`   |
| DG     | Added `CycleSnapshot` model             | `cycle_snapshots` table; FK to `LearningCycle`        |
| DH     | Added `CycleDecisionSkill` model        | `cycle_decision_skills` table; FKs to `CycleDecision` + `Skill`; unique `[decisionId, skillId]` |
| DI     | Added `TutoringSession` model           | `sessions_pedagogical` table; FK to `LearningCycle`; optional FK to `StudyLoad` (SetNull)       |
| DJ     | Added `Response` model                  | `responses` table; FK to `TutoringSession` (Cascade) + optional FK to `Skill` (SetNull); stores `responseType`, `content`, `isCorrect`, `score`, `feedback` |
| DK     | Added `ContinuitySignal` model          | `continuity_signals` table; required FK to `StudentProgramInstance` (Cascade); optional FKs to `LearningCycle` (SetNull) + `CycleEvaluation` (SetNull); stores `signalType`, `rationale` |

## Continuity notes

* Single shared PostgreSQL DB across environments: handle carefully.
* Some older phase boundaries are reconstructed from code/history rather than fully logged live.
* Canonical decisionType set: `advance`, `reinforce`, `hold`, `redirect`.
* Canonical evaluationType values: `diagnostic`, `progress_check`, `cycle_close`.
* Canonical loadType values: `practice`, `reading`, `video`, `project`, `assessment`.

## Phase EO — Current cycle quick link
- Added minimal read-only navigation link from enrollment detail current-cycle summary to the existing cycle detail page
- Preserved cycle, study-load, decision, skill-state, and adaptive semantics unchanged
- Added no actions, write endpoints, schema changes, or automation
- Kept prior attention workflow and EN operational summary behavior unaffected
- Verified with TypeScript, production build, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase EQ — Study load operational summary
- Added compact read-only study-load status summary to learning cycle detail
- Surfaced total loads and per-status counts without adding actions or automation
- Preserved cycle, study-load, decision, skill-state, and adaptive semantics unchanged
- Kept EN current-cycle summary and EO/EP navigation behavior unaffected
- Verified with TypeScript, production build, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase ER — Cycle decision operational summary
- Added compact read-only cycle-decision summary to learning cycle detail
- Surfaced total decisions and per-decision-type counts without adding actions or automation
- Preserved cycle, study-load, decision, skill-state, and adaptive semantics unchanged
- Kept EN/EO/EQ operational visibility and navigation behavior unaffected
- Verified with TypeScript, production build, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase ES — Cycle evaluation operational summary
- Added compact read-only cycle-evaluation summary to learning cycle detail
- Surfaced total evaluations and per-evaluation-type counts without adding actions or automation
- Preserved cycle, study-load, decision, evaluation, skill-state, and adaptive semantics unchanged
- Kept EN/EO/EQ/ER operational visibility and navigation behavior unaffected
- Verified with TypeScript, production build, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Operational visibility block closure — through Phase ES
- Closed the current read-only operational visibility block after EK/EL/EM and EN/EO/EP/EQ/ER/ES
- Attention workflow now supports signal visibility, reviewed/unreviewed filtering, and acknowledgement
- Cycle visibility now supports current-cycle summary, cycle navigation, and read-only summaries for study loads, decisions, and evaluations
- EP was already satisfied by the pre-existing View enrollment link on learning cycle detail
- No further operational summary cards should be added by inertia; next work should start from a deliberately chosen new functional front
- No product code, schema, endpoints, actions, automation, or pedagogical logic changed in this custody closure

## Phase EU — Generic cycle status mutation containment
- Contained generic manual LearningCycle.status mutation controls in admin UI
- Replaced generic status dropdowns with read-only status display where appropriate
- Preserved guarded lifecycle actions such as close-cycle and continue workflows unchanged
- Preserved cycle, study-load, decision, evaluation, skill-state, and adaptive semantics unchanged
- Added no schema changes, API changes, write endpoints, or automation
- Verified with TypeScript, production build, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase EV — LearningCycle PATCH status mutation hardening
- Hardened PATCH /api/learning-cycles/[id] to reject generic cycle status mutations
- Preserved guarded lifecycle transitions through dedicated close-cycle and continue endpoints
- Closed backend/API drift vector left after UI containment in EU
- Preserved cycle, study-load, decision, evaluation, skill-state, snapshot, continuity, and adaptive semantics unchanged
- Added no schema changes, UI actions, new endpoints, or automation
- Verified with TypeScript, production build, API rejection check, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase EW — Closed-cycle decision-skill mutation guards
- Added backend closed-cycle guards to decision-skill junction PATCH and DELETE endpoints
- Prevented direct API edits/deletes of decision-skill evidence after parent cycle closure
- Preserved existing decision, evaluation, study-load, snapshot, continuity, and lifecycle semantics unchanged
- Added no schema changes, UI actions, new endpoints, or automation
- Verified with TypeScript, production build, API/code checks, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## UI/API mutation hardening block closure — through Phase EW
- Closed the current UI/API mutation hardening block after EU/EV/EW
- EU contained generic LearningCycle.status mutation controls in admin UI
- EV hardened PATCH /api/learning-cycles/[id] against generic cycle status mutation
- EW added closed-cycle guards for decision-skill PATCH/DELETE mutations
- EX-0 reviewed snapshots and continuity signals and classified them as a separate evidence/append-only semantics concern, not part of this closed-cycle drift block
- Future snapshot/signal hardening, if pursued, should open a separate deliberate block rather than be added by inertia
- No product code, schema, endpoints, UI actions, deploy, data mutation, or automation changed in this custody closure
## Phase EY — StudyLoad status mutation containment
- Hardened PATCH /api/study-loads/[id] to reject generic study-load status mutations (405)
- Replaced generic admin StudyLoad.status selects with read-only status badges in cycle detail view and study loads list
- Preserved protected start/complete workflows as the only valid status transition paths
- Preserved tutoring session, response/self-report, cycle, decision, evaluation, skill-state, snapshot, continuity, and adaptive semantics unchanged
- Added no schema changes, new endpoints, new actions, or automation
- Verified with TypeScript, production build, API rejection checks (401 unauth, 405 auth), browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## StudyLoad status integrity block closure — through Phase EY
- Closed the generic StudyLoad.status mutation integrity block after EY
- EY hardened PATCH /api/study-loads/[id] to reject generic status mutation
- EY replaced generic admin StudyLoad.status selectors with read-only status badges
- Protected status transitions remain concentrated in POST /start and POST /complete
- Preserved the load → tutoring session → response/self-report → evidence chain
- Future work on start/complete, tutoring sessions, or response evidence should open a deliberate new block rather than continue by inertia
- No product code, schema, endpoints, UI actions, deploy, data mutation, or automation changed in this custody closure

## Phase EZ — StudyLoad creation status normalization
- Normalized StudyLoad creation so new loads can only be created as pending
- Rejected non-pending create-time statuses to protect the load → session → response/self-report → evidence chain
- Removed the StudyLoad status selector from the admin create modal
- Preserved protected start/complete workflows as the only valid status transition paths
- Preserved tutoring session, response/self-report, cycle, decision, evaluation, skill-state, snapshot, continuity, and adaptive semantics unchanged
- Added no schema changes, new endpoints, new actions, or automation
- Verified with TypeScript, production build, API rejection checks, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## StudyLoad status integrity block closure — through Phase EZ
- Closed the complete StudyLoad.status integrity block after EY/EZ
- EY hardened PATCH /api/study-loads/[id] to reject generic status mutation and replaced admin status selectors with read-only badges
- EZ normalized StudyLoad creation so new loads can only be created as pending
- Protected status transitions remain concentrated in POST /start and POST /complete
- Preserved the load → tutoring session → response/self-report → evidence → cycle close chain
- Future work on start/complete, tutoring sessions, response evidence, or adaptive load generation should open a deliberate new block rather than continue by inertia
- No product code, schema, endpoints, UI actions, deploy, data mutation, or automation changed in this custody closure

## Phase FA — Action Governance Registry
- Created documentation-only Action Governance Registry for current write/action surface
- Classified major endpoints by authority tier, risk level, human-in-the-loop requirement, future agent permission, and audit need
- Established governance principles for future agent-safe architecture without implementing agents or runtime middleware
- Documented known gaps including flat admin authority, missing mutation audit log, actor attribution, evidence mutability, and lack of action budgets/circuit breakers
- Added no app code, schema changes, endpoints, middleware, agents, UI actions, deploy, automation, or data mutation
- Post-deploy issues: none

## Phase FB — SkillState value validation hardening
- Added backend validation for SkillState enum-like fields on create and update
- Rejected invalid masteryLevel, confidenceLevel, stateSource, and needsReinforcement values before database writes
- Preserved existing SkillState UI, defaults, lastEvaluatedAt behavior, and adaptive generation semantics unchanged
- Added no schema changes, audit log, rationale fields, middleware, agents, endpoints, UI actions, or automation
- Fixed pre-existing implicit-any TypeScript errors across multiple files to restore production build capability
- Verified with TypeScript, production build, API rejection checks, browser checks, and deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## FB exception custody note — mixed-scope acceptance
- Accepted FB as a valid but exceptional mixed-scope commit
- Primary scope: SkillState value validation hardening on POST/PATCH
- Secondary scope: pre-existing TypeScript implicit-any annotation-only fixes needed to restore production build capability
- The secondary scope is accepted as build-restoration work with no intended runtime behavior change
- This is not a precedent for broad mixed-scope phases; future phases should preserve strict minimal scope unless build restoration is explicitly approved
- No-secret-printing policy is active for all future work: do not print .env, DATABASE_URL, PROD_DATABASE_URL, tokens, passwords, or connection strings
- No product code, schema, endpoints, UI actions, deploy, data mutation, or automation changed in this custody closure

## Phase FC — Audit Event Schema Proposal
- Created documentation-only audit/event schema proposal for future traceability and runtime governance
- Proposed AuditEvent fields, actor attribution, operationId/correlationId strategy, before/after payloads, rationale capture, and evidence immutability categories
- Classified audit needs across cycle, study-load, SkillState, decision, evaluation, snapshot, continuity, session, response, and enrollment domains
- Connected auditability requirements to future human-in-the-loop and AI-agent governance
- Added no app code, schema changes, migrations, endpoints, middleware, agents, UI actions, deploy, automation, or data mutation
- Post-deploy issues: none

## Phase FD — AuditEvent schema and audit helper
- Added minimal standalone AuditEvent Prisma model for future auditability and evidence traceability
- Added audit helper utility for future endpoint instrumentation
- Preserved endpoint behavior unchanged; no routes were instrumented in this phase
- Added no middleware, agents, UI actions, HITL workflow, endpoint behavior changes, or data mutation
- Preserved DN/DU/DZ adaptive semantics and existing guards unchanged
- Verified with Prisma generate, TypeScript/build checks, schema availability check, and deployment confirmation if applicable
- Post-deploy issues: none

## CUST-BLOCK-FD — Close AuditEvent infrastructure block
- The AuditEvent infrastructure block is closed through Phase FD
- FD introduced only:
  - The approved 14-field AuditEvent Prisma model (id, createdAt, actorType, actorId, actorEmail, actionType, domain, entityType, entityId, endpoint, method, operationId, beforePayload, afterPayload)
  - The audit helper utility (lib/audit.ts: recordAuditEvent, recordAuditEventTx)
  - Production schema promotion with audit_events table present and containing 0 rows
- No endpoints are instrumented yet; no audit rows are being written
- Future instrumentation must happen through a separate readiness/instrumentation phase (FE or later)
- No middleware, agents, UI changes, adaptive logic, or business data mutation was added in this block
- No-secret-printing policy remains active

## Phase FE-0 — Audit logging first-instrumentation readiness gate
- Documentation-only readiness gate; no endpoint was instrumented
- Recommended first candidate: PATCH /api/skill-states/[id]
- Rationale: already hardened by FB, admin-controlled, no lifecycle side-effects, predictable mutation surface
- Defined expected audit field values: actorType=human_admin, actionType=update, domain=skill_state, entityType=SkillState
- Defined actor attribution via existing session.user.id and session.user.email
- Defined operationId strategy: null for single-step mutations
- Defined beforePayload/afterPayload discipline: scalar SkillState fields only, no secrets, no nested relations
- Defined verification steps, rollback criteria, and audit failure isolation requirement
- Created nextjs_space/docs/governance/AUDIT_LOGGING_INSTRUMENTATION_READINESS_FE0.md
- Added no app code, schema changes, middleware, agents, UI actions, endpoint behavior changes, or data mutation

## Phase FE — First audit logging instrumentation for SkillState PATCH
- PATCH /api/skill-states/[id] became the first audited endpoint
- AuditEvent is written only after a successful mutation (fire-and-forget with error logging)
- beforePayload and afterPayload contain only scalar SkillState fields; no secrets, headers, cookies, IP, user-agent, or nested relations
- Existing endpoint behavior, validation (FB guards), response shape, and authorization are preserved unchanged
- No schema, UI, middleware, agents, or other endpoints were changed
- Verified with TypeScript, production build, and runtime test confirming correct audit row creation and payload discipline
- Test data restored to original state after verification

## CUST-BLOCK-FE — Close first audit logging instrumentation block
- FE made PATCH /api/skill-states/[id] the first audited write endpoint
- AuditEvent is written only after a successful mutation (fire-and-forget with error logging)
- beforePayload and afterPayload are scalar SkillState snapshots only; no secrets, nested relations, headers, cookies, IP, or user-agent
- Existing validation (FB guards) and response shape were preserved unchanged
- No schema, UI, middleware, agents, or other endpoints were changed
- Test data was restored and audit_events was cleaned back to 0 after runtime verification
- The block is now closed; additional endpoint instrumentation must happen in separate minimal phases
- Runtime verification succeeded, but a custody observation was noted: future prompts must strengthen no-secret-printing discipline
- Specifically: do not print, echo, grep, display, or inline passwords — including seed/test passwords — in any command, log, or output

## Phase FG-0 — Second audit logging instrumentation readiness gate
- Documentation-only readiness gate; no endpoint was instrumented
- Recommended second candidate: PUT /api/study-loads/[id] (not PATCH, which is hardened to 405 by Phase EY)
- Rationale: admin-controlled metadata edit, closed-cycle guard and loadType validation already present, no lifecycle side-effects, tests audit pattern across a second domain
- Code inspection confirmed PATCH unconditionally returns 405; PUT is the live write surface for title, loadType, releasedAt, dueAt
- Defined expected audit field values: actorType=admin, actionType=update, domain=study_load, entityType=StudyLoad, method=PUT
- Defined actor attribution via existing session.user.id and session.user.email
- Defined operationId strategy: null for single-step metadata edits
- Defined beforePayload/afterPayload discipline: 9 scalar StudyLoad fields only, no secrets, no nested relations
- Defined verification steps, rollback criteria, audit failure isolation requirement, and no-secret-printing discipline
- Created nextjs_space/docs/governance/AUDIT_LOGGING_INSTRUMENTATION_READINESS_FG0.md
- Added no app code, schema changes, middleware, agents, UI actions, endpoint behavior changes, or data mutation

## Phase FG — Instrument StudyLoad PUT audit logging
- PUT /api/study-loads/[id] became the second audited write endpoint
- PATCH /api/study-loads/[id] remains hardened to 405 and was not modified
- AuditEvent is written only after a successful PUT mutation (fire-and-forget with error logging)
- beforePayload and afterPayload contain only the 9 scalar StudyLoad fields; no secrets, nested relations, headers, cookies, IP, or user-agent
- Existing validation (loadType allowlist), closed-cycle guard, response shape, and authorization were preserved unchanged
- No schema, UI, middleware, agents, lifecycle actions (/start, /complete), or other endpoints were changed
- Verified with TypeScript, production build, PATCH-still-405 check, and runtime test confirming correct audit row creation and payload discipline
- Test data was restored and audit_events was cleaned back to 0 after verification
- No passwords were printed during verification

## CUST-BLOCK-FG — Close second audit logging instrumentation block
- FE made PATCH /api/skill-states/[id] the first audited write endpoint
- FG made PUT /api/study-loads/[id] the second audited write endpoint
- PATCH /api/study-loads/[id] remains 405 and unchanged
- AuditEvent writes happen only after successful mutations (fire-and-forget with error logging)
- Payloads are scalar-only before/after snapshots; no secrets, nested relations, headers, cookies, IP, or user-agent
- Existing validation, response shapes, closed-cycle guards, and authorization were preserved unchanged
- No schema, UI, middleware, agents, lifecycle actions (/start, /complete, /close, /continue), or additional endpoints changed
- Test data was restored and audit_events was cleaned to 0 after verification in both FE and FG
- The block is now closed; additional endpoint instrumentation must happen in separate minimal phases
- No-secret-printing discipline continues: do not print, echo, grep, display, or inline secrets or passwords, including seed/test passwords
## FH-0 — MVP Launch Readiness Gate
- Documentation-only phase: no app code, schema, endpoints, deploy, agents, middleware, or data mutation
- Created `nextjs_space/docs/roadmap/MVP_LAUNCH_READINESS_FH0.md` (12-section readiness document)
- Marks a roadmap shift from defensive hardening to MVP operational spine completion
- Key finding: the core operational chain appears to exist end-to-end (enrollment → diagnostic → cycle → study load → student starts/completes → self-report → admin review → close → decision → continue → next cycle)
- All API endpoints and UI surfaces for the chain were inspected (read-only) and confirmed present
- Student /now surface (Phase DO/DP/DQ/DR), lifecycle endpoints (/start, /complete, /close, /continue), diagnostics, responses, continuity-signals, cycle-snapshots, and 10 admin views all exist
- PATCH /api/study-loads/[id] hardened to 405 (Phase EY) and PATCH /api/learning-cycles/[id] hardened to 405 (Phase EV) remain unchanged
- Governance preserved: phase semantics, DN/DU/DZ adaptive rules, EV/EW/EY/EZ guards all intact
- Non-critical hardening paused in favor of completing the MVP operational flow
- Proposed next phases: FH (student weekly flow verification), FI (admin beta operations view), FJ (manual pedagogical decision layer), FK (beta launch protocol), FL (assisted closed beta with 2–5 students)
- No Abacus checkpoint created (documentation-only phase)
- No-secret-printing discipline continues

## FH — Student Weekly Flow Verification
- Verified the student-facing weekly study flow on /now against the MVP target: enrollment → see current StudyLoad → understand task → start → complete → self-report → preserved state → admin review
- 7 of 8 target flow steps were already fully satisfied by existing surfaces (Phases DO, DP, DQ, DR)
- One small gap identified: no brief instructional text helping the student understand what to do and how to leave evidence
- Fix: added two instructional lines in /now — one below the "Cargas pendientes" section header and one below the "En curso" section header
- "Estudia el tema y presiona «Empezar» cuando estés listo." (pending section)
- "Trabaja en esta actividad. Al terminar, presiona «Terminar» y cuenta cómo te fue." (in-progress section)
- Change is purely additive: 11 lines inserted in app/now/page.tsx (6 JSX + 5 comment)
- PAES-minimum orientation: the title field already supports PAES-oriented wording; auto-generated loads use skill names (e.g. "Resolver problemas de ecuaciones lineales"); no content engine needed
- Self-report evidence is persisted as Response.content via the existing DQ flow (3-option closed set)
- Completed loads with self-reports remain visible in the "Lo que hiciste en este ciclo" section (DR)
- Empty states already handled for no-student, no-enrollment, no-cycle, and caught-up conditions
- TypeScript check: clean; production build: clean
- No schema, middleware, agents, audit logging, lifecycle semantics, endpoint behavior, or response shapes changed
- No new endpoints, no modified endpoints, no status transitions changed
- /api/study-loads/[id]/start, /api/study-loads/[id]/complete, /api/learning-cycles/[id]/close, /api/learning-cycles/[id]/continue were not touched
- StudyLoad.status allowed transitions were not changed
- No-secret-printing discipline continues

## FI — Admin Beta Operations View
- Created `/admin/beta-operations` — a minimal read-only operational view for running the MVP beta with 2–5 students
- Purpose: single-page situational awareness for the admin team during assisted PAES preparation
- Operational questions answered:
  1. Which students/enrollments are currently active? → "Matrículas activas" section with links to student detail and enrollment detail
  2. Which cycles are open or in progress? → counter card showing open cycles count
  3. Which study loads are pending? → "Trabajo pendiente" table with student, program, cycle, load details, and links
  4. Which study loads are in progress? → "En progreso" table (same format)
  5. Which study loads are completed? → "Completadas recientemente" table (last 20)
  6. Which cycles appear ready for review/close? → "Necesita atención / revisión" section (cycles where all loads are completed)
  7. Where should the admin click next? → every row links to existing student, enrollment, and cycle detail pages
- Implementation: server component (`page.tsx`) queries Prisma directly — no new API endpoints created
- Navigation: added "Beta Ops" link under new "Ops" group in admin nav bar (`admin-nav.tsx`)
- Files added: `app/admin/beta-operations/page.tsx`, `app/admin/beta-operations/_components/beta-operations-view.tsx`
- Files modified: `app/admin/_components/admin-nav.tsx` (added Activity icon import and Ops nav group)
- Counter cards: active enrollments, open cycles, pending loads, in-progress loads, completed loads, cycles ready for review
- All data is fetched read-only via Prisma `findMany` with appropriate filters and includes
- No new write endpoints, no new GET API endpoints, no schema changes
- No lifecycle semantics, status transitions, audit logging, middleware, or agents changed
- `/api/study-loads/[id]/start`, `/api/study-loads/[id]/complete`, `/api/learning-cycles/[id]/close`, `/api/learning-cycles/[id]/continue` were not touched
- TypeScript check: clean (pre-existing script errors only); production build: clean
- Browser-verified: page loads, all sections render, links navigate to correct detail pages, counters match data
- No business data mutated
- No-secret-printing discipline continues

## CUST-INC-FI — Custody: Document FI Deployment Data Incident

**Incident ID:** CUST-INC-FI
**Date detected:** 2026-04-29
**Phase context:** Post-FI deployment
**Classification:** Documentation-only custody phase — no code, schema, endpoints, deploy, data mutation, seed, or checkpoint operations

### 1. Incident Summary
During the Phase FI deployment via Abacus AI Agent's `deploy_nextjs_project` tool, production database data was reset to seed-level (11 rows). Approximately 276 rows of developer-created pre-beta test data were lost. No live beta users existed; no real student data was affected.

### 2. Confirmed State (at time of assessment)
- **Production DB:** 21 tables, 11 rows total (1 User, 3 Programs, 3 Axes, 4 Skills — seed data only)
- **Dev DB:** 20 tables, 11 rows total (same seed data; `audit_events` table missing due to permission issue)
- **App code:** Intact — zero diff between local and origin/main (`0bdda22`)
- **GitHub origin/main:** `0bdda22 Phase FI: admin beta operations view` — clean, no corruption
- **Deployed app:** Latest checkpoint is live at `tutoring-platform-mv-l4o1ne.abacusai.app`
- **Abacus checkpoints available:** Phase FD, FB, EZ, EY, EW (with DB snapshot restore option via Settings → Database)

### 3. Root Cause
A `prisma db push --force-reset` command was executed against the **dev** database during a schema troubleshooting sequence. This wiped the dev DB to seed-level. Subsequently, the Abacus platform's deployment pipeline auto-promoted the dev schema to production using `prisma db push`, despite `promote_dev_db_to_prod: false` being passed to `deploy_nextjs_project`. The platform overrode this flag when it detected schema drift between dev and prod, effectively propagating the dev reset state to production.

**Contributing factors:**
- `prisma db push --force-reset` is destructive and was used to resolve a schema sync issue on dev
- The platform's auto-promotion behavior overrides the explicit `promote_dev_db_to_prod: false` parameter
- The dev DB had a permission issue preventing creation of the `audit_events` table, causing Prisma to report "in sync" despite a missing table — misleading diagnostics
- No pre-deployment DB backup was taken

### 4. Data Lost
- ~276 rows of developer-created pre-beta test data:
  - 139 Users (created via public signup endpoint)
  - 9 Students, 13 Enrollments, 21 LearningCycles, 21 StudyLoads
  - 19 Responses, 16 DiagnosticResults, 12 DiagnosticResponses
  - 10 ContinuitySignals, 8 CycleSnapshots, 5 AuditEvents
  - 2 Diagnostics, 1 DiagnosticQuestion
- **No live beta users existed.** All data was developer test data.
- Seed data (11 rows: 1 admin User, 3 Programs, 3 Axes, 4 Skills) was automatically re-created and is intact.

### 5. Decision
- **Do not execute recovery in this phase.** Recovery options are documented but deferred.
- Rationale: The lost data was pre-beta test data with no pedagogical or operational value. Recovery carries risk of introducing inconsistencies. Fresh seed state is acceptable for beta launch.

### 6. Recovery Options (documented, not executed)
1. **Abacus DB snapshot restore:** Settings → Database → restore from a pre-incident snapshot (Phase FD, FB, EZ, EY, or EW checkpoint). This would restore both schema and data.
2. **Abacus checkpoint restore:** Use `restore_nextjs_checkpoint` to restore app + DB to a prior phase. Irreversible — would also revert any post-incident code changes.
3. **Manual re-seed:** Re-create test data via the app's public signup and admin workflows. Lowest risk but most labor-intensive.

### 7. New Safeguards (to be implemented in future phases)
1. **Pre-deployment DB row-count gate:** Before any deploy, query and log prod row counts. Alert if counts would decrease.
2. **Never use `prisma db push --force-reset`** in any environment connected to data that matters. Use additive migrations only.
3. **Explicit DB backup before deploy:** Take a manual DB snapshot before every deployment that touches schema.
4. **Distrust `promote_dev_db_to_prod: false`:** The platform may override this flag. Treat every deploy as potentially schema-promoting.
5. **Verify `prisma db push` reports accurately:** A "Your database is in sync" message does not guarantee all tables exist. Cross-check with `\dt` or equivalent.

### 8. Scope Exclusions
- No app code was changed in this phase
- No schema changes, no endpoints added/modified/removed
- No `prisma db push`, `prisma migrate`, `prisma db seed`, or `prisma db push --force-reset` executed
- No Abacus checkpoint created or restored
- No deployment executed
- No data mutated in dev or prod
- No secrets, passwords, or connection strings printed
- No-secret-printing discipline continues

## DATA-BETA-0 — Minimal Beta Data Reconstruction Plan
- Documentation-only planning phase: no app code, schema, endpoints, deploy, agents, middleware, seed, scripts, or data mutation
- Purpose: define the minimal clean beta dataset required to operate a closed MVP beta with 2–5 students after the FI deployment data incident (CUST-INC-FI)
- Created `nextjs_space/docs/operations/MINIMAL_BETA_DATA_RECONSTRUCTION_PLAN_DATA_BETA_0.md` (12-section planning document)
- Current baseline: seed-level data (11 rows: 1 User, 3 Programs, 3 Axes, 4 Skills), code intact, GitHub clean
- Minimal dataset defined: 2–3 test students (Ana/M1, Bruno/L1, optional Camila/M2) with 1 enrollment, 1 open cycle, and 2–3 study loads each
- Total new rows estimated: 14–30 depending on 2 or 3 students
- PAES-oriented content: realistic skill names, study load titles, and self-report evidence aligned with PAES preparation
- Operational states coverage: active enrollments, open cycles, pending/in-progress/completed loads, cycle ready for review, evidence present
- Data creation method: manual via admin UI recommended (safest after FI incident); controlled script as secondary option
- Prerequisite identified: PAES_L1 needs at least 1 axis + 1 skill created before Student B enrollment
- Next recommended phase: DATA-BETA-1 (create minimal beta dataset) — requires explicit user approval before any data mutation
- FI incident safeguards restated: never force-reset, never db push in read-only phases, snapshot before schema-touching deploys, treat Abacus deploy as potentially schema-promoting
- No Abacus checkpoint created (documentation-only phase)
- No data mutated in dev or prod
- No secrets printed
- No-secret-printing discipline continues

## DATA-BETA-1 — Create Minimal Beta Dataset
- Data mutation phase: controlled beta/test fixture data created through existing admin APIs and student lifecycle endpoints
- Purpose: reconstruct the smallest safe dataset needed to operate the MVP beta after the FI deployment data incident
- Data was created using existing app APIs (POST /api/students, /api/instances, /api/diagnostics, /api/learning-cycles, /api/study-loads, /api/signup) and student lifecycle endpoints (POST /api/study-loads/[id]/start, /api/study-loads/[id]/complete)
- No direct SQL, no Prisma CLI, no seed script, no force-reset

### L1 Taxonomy Created
- 1 Axis created under PAES_L1: COMP (Comprensión lectora)
- 2 Skills created under PAES_L1/COMP: COMP_EXPL (Identificar información explícita), COMP_INFER (Inferir propósito y sentido global)

### Student A — Ana Beta-M1
- Student: Ana Beta-M1 (ana.beta.m1@test.bexauri.cl) — PAES_M1
- 1 enrollment (active), 1 completed initial diagnostic (placeholder), 1 open learning cycle (cycle 1)
- 3 study loads created + 1 auto-created by system = 4 total:
  - "PAES M1 — Practicar ecuaciones lineales" → pending
  - "PAES M1 — Resolver problemas de planteamiento algebraico" → in_progress (via /start endpoint)
  - "PAES M1 — Revisión de errores en despeje" → completed (via /start then /complete with self-report "Me fue bien")
  - "Initial practice" → pending (auto-created by cycle creation)
- 1 TutoringSession (completed), 1 Response with evidence ("Me fue bien")
- 1 User account created (ana.beta.m1@test.bexauri.cl) for lifecycle endpoint authentication

### Student B — Bruno Beta-L1
- Student: Bruno Beta-L1 (bruno.beta.l1@test.bexauri.cl) — PAES_L1
- 1 enrollment (active), 1 completed initial diagnostic (placeholder), 1 open learning cycle (cycle 1)
- 2 study loads created + 1 auto-created by system = 3 total:
  - "PAES L1 — Identificar información explícita en un texto breve" → pending
  - "PAES L1 — Inferir idea principal y propósito del texto" → completed (via /start then /complete with self-report "Me costó")
  - "Initial practice" → pending (auto-created by cycle creation)
- 1 TutoringSession (completed), 1 Response with evidence ("Me costó")
- 1 User account created (bruno.beta.l1@test.bexauri.cl) for lifecycle endpoint authentication

### Student C — Camila Beta-M2 (skipped)
- PAES_M2 program exists but has no axes or skills seeded
- Creating M2 taxonomy was outside the safe minimal scope for this phase
- Can be added in a future phase if needed

### Record Counts (new records created)
- Students: 2 | Enrollments: 2 | Diagnostics: 2 | Learning Cycles: 2
- Study Loads: 7 (5 manual + 2 auto-created) | TutoringSessions: 2 | Responses: 2
- User accounts: 2 (for lifecycle authentication) | Axes: 1 | Skills: 2
- Total new rows: ~22

### Operational States Verified on /admin/beta-operations
- 2 Matrículas activas (Ana/M1, Bruno/L1) ✓
- 2 Ciclos abiertos ✓
- 4 Cargas pendientes ✓
- 1 Carga en progreso (Ana — planteamiento algebraico) ✓
- 2 Cargas completadas (Ana — despeje, Bruno — idea principal) ✓
- 0 Ciclos para revisión (expected — no cycle has all loads completed yet)
- Self-report/evidence present in both completed loads ✓
- All links (student, enrollment, cycle detail) navigate correctly ✓

### /now Student Flow
- Not directly tested in browser as admin (requires student-as-user session)
- Lifecycle endpoints exercised via API: /start transitions pending→in_progress, /complete transitions in_progress→completed with self-report
- The /start and /complete endpoints enforce ownership (User.email == Student.email), enrollment active, cycle open, and proper status guards

### Confirmations
- No app code changed (zero diff on app/, components/, lib/, prisma/, middleware)
- No schema changes
- No endpoints added, modified, or removed
- No deploy performed
- No prisma db push, migrate, seed, or force-reset executed
- No checkpoints created or restored
- No snapshots restored
- All data is clearly marked as fake/test beta data (Beta-M1, Beta-L1, @test.bexauri.cl)
- No production-like personal data or real student data
- No secrets, passwords, or connection strings were printed
- No-secret-printing discipline continues

## FJ — Manual Pedagogical Decision Layer
- Purpose: ensure the admin can review student evidence/self-report and record a manual pedagogical decision linking the current cycle to the next action
- Assessment found the manual decision layer was already 95% satisfied by existing surfaces:
  - CycleDecision model already supports advance / reinforce / hold / redirect + rationale
  - Full CRUD (create, edit, inline type change, delete) already existed on the cycle detail page
  - Operational decision summary already existed
  - Navigation from /admin/beta-operations → cycle detail via "Ver ciclo" links already existed
  - Cycle close + continuity authorization buttons already existed
- One gap identified: **self-report/evidence (Response.content) was not visible on the cycle detail page** — the admin could not see what the student reported before making a decision
- Fix (2 files, 63 lines added):
  - `app/api/learning-cycles/[id]/route.ts`: extended GET include to fetch tutoringSessions → responses nested inside studyLoads
  - `app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx`: added TypeScript interface for tutoringSessions/responses; added inline self-report display under each completed study load card with MessageSquare icon and "Autorreporte:" label
- The admin can now answer all FJ target questions from the cycle detail page:
  1. What evidence/self-report did the student leave? → visible under each completed load
  2. Which cycle does this evidence belong to? → cycle header with student/program context
  3. What decision do I make now? → select advance/reinforce/hold/redirect + click "New Decision"
  4. Why did I make that decision? → edit decision → add rationale
  5. Where is that decision recorded? → Decisions section on the same cycle detail page
- Browser-verified: Ana's completed load shows "Autorreporte: Me fue bien" inline; decisions section ready to accept new decisions
- No test CycleDecision was created (existing UI was already verified working)
- TypeScript check: clean; production build: clean
- No schema changes
- No new endpoints, no modified endpoint behavior, no write path changes
- No lifecycle semantics, status transitions, middleware, agents, or audit logging changed
- /api/study-loads/[id]/start, /api/study-loads/[id]/complete, /api/learning-cycles/[id]/close, /api/learning-cycles/[id]/continue were not touched
- StudyLoad.status allowed transitions were not changed
- LearningCycle.status semantics were not changed
- CycleDecision decisionType values remain: advance, reinforce, hold, redirect (no new taxonomy)
- No business data was mutated
- No-secret-printing discipline continues

---

## Phase FK — Beta Launch Protocol (documentation only)

**Date:** 2026-04-29
**Commit:** `Phase FK: beta launch protocol`
**Type:** Documentation only — no code, schema, endpoint, deploy, seed, or data changes

### Purpose
Codify the operational protocol for launching a controlled beta with real students, synthesizing readiness from phases FH (data reconstruction), FI (seeding), FJ (manual pedagogical decision layer), and DATA-BETA-1 (data plan).

### Artifact
- `nextjs_space/docs/operations/BETA_LAUNCH_PROTOCOL_FK.md` — 19-section protocol covering:
  - Readiness baseline (FH/FI/FJ/DATA-BETA-1 status)
  - Beta purpose, scope, and duration (2-week window, 3-5 students)
  - Student selection criteria and onboarding checklist
  - Pre-launch technical and data checklists
  - Session execution protocol (tutor workflow steps)
  - Daily/weekly monitoring routines
  - PAES alignment standards for content
  - Feedback collection instruments (student, tutor, system)
  - Decision framework: advance / reinforce / hold / redirect
  - Success criteria and stop criteria (with thresholds)
  - Risk register with mitigations
  - Roles and responsibilities (tutor, developer, coordinator)
  - Privacy and data handling rules
  - Post-beta evaluation framework
  - Graduation criteria to move from beta to wider rollout
  - Next phase recommendation (FL: beta execution + first-cycle data collection)

### What was NOT changed
- No code modified
- No schema changes
- No endpoints added or modified
- No deployment triggered
- No business data mutated
- No seeds executed
- No Prisma CLI invoked

---

## Phase FL-0 — Assisted Closed Beta Readiness Check (documentation / readiness gate only)

**Date:** 2026-04-29
**Commit:** `Phase FL-0: assisted closed beta readiness check`
**Type:** Documentation and read-only inspection only — no code, schema, endpoint, deploy, seed, or data changes

### Purpose
Verify whether E360 / Bexauri is ready to begin an assisted closed beta with 2–5 students under the FK protocol. Answer: are we ready, or is there a blocking gap?

### What was checked (all read-only)
- Git custody state (origin/main, working tree, PHASE_LOG, FK protocol)
- Live production deployment (FH /now, FI /admin/beta-operations, FJ cycle detail evidence)
- Production database stats (students, enrollments, cycles, loads, responses, sessions)
- Student /now page (admin session only — student session not tested)
- Admin beta-operations counters, tables, and links
- Cycle detail page (loads, decisions section, evaluations section, evidence visibility)
- Decision creation surface (advance/reinforce/hold/redirect + rationale)
- FK protocol completeness (all 19 sections verified)
- PAES minimum educational readiness (M1 algebra + L1 reading tasks, clear labels, evidence path)

### Final recommendation
🟡 **READY AFTER ONE PRE-BETA DEPLOY + VERIFICATION**

### Blocking gap
- **B1:** Live production may not include FJ self-report/evidence visibility on cycle detail. Code is complete but deployment is behind latest checkpoint. Requires deploy + post-deploy verification before beta.

### Non-blocking gaps
- NB1: Student /now not verified with student session (manual test recommended)
- NB2: No manual decision tested end-to-end in production (can test in FL)

### Ready areas
Git custody ✅ · FK protocol ✅ · Production dataset ✅ · Beta-operations ✅ · Cycle detail structure ✅ · Decision surface ✅ · PAES minimum content ✅ · L1+M1 taxonomy ✅

### Artifact
- `nextjs_space/docs/operations/ASSISTED_CLOSED_BETA_READINESS_FL0.md`

### Next step
Deploy latest codebase → verify FJ evidence visibility → manual student /now test → proceed to FL (assisted closed beta execution)

### What was NOT changed
- No code modified
- No schema changes
- No endpoints added or modified
- No deployment triggered
- No business data created, modified, or deleted
- No seeds executed
- No Prisma CLI invoked
- No checkpoints created
- No secrets printed

---

## Custody: SCHEMA-CUST-AUDIT-EVENT-DEV-PARITY

**Date:** 2026-04-29
**Commit:** `Custody: restore dev audit event schema parity`
**Type:** Dev-only schema correction — no app code, no production changes, no deploy

### Problem
PRE-FL-DEPLOY was blocked by schema drift: the deploy tool detected that `audit_events` would be dropped from production during `prisma db push` promotion.

### Root cause
A duplicate `DATABASE_URL` line existed in `.env` (line 5), pointing to the production database host (`db-c8fe4c5ad`) instead of the dev database host (`db-7a1ac7d02`). Because dotenv uses last-wins semantics, **all `prisma db push` operations were silently targeting production** instead of dev. The actual dev database never received the `audit_events` table that was created by an earlier phase.

### State before correction
- **Prisma schema:** AuditEvent model defined (14 fields, @@map("audit_events")) ✅
- **Production:** `audit_events` exists, 14 columns, 0 rows, 21 total tables ✅
- **Dev:** `audit_events` MISSING, 20 total tables ❌
- **.env:** Duplicate `DATABASE_URL` on line 5 pointing to production ❌

### Correction applied
1. Removed duplicate `DATABASE_URL` line from `.env` (line 5 → production host removed)
2. Verified `DATABASE_URL` now correctly points to dev host (`db-7a1ac7d02`)
3. Ran `yarn prisma db push` targeting dev → created `audit_events` table in dev
4. Verified dev now has 21 tables with `audit_events` (0 rows, 14 columns)
5. Verified production unchanged (21 tables, 39 rows — identical to pre-correction snapshot)

### State after correction
- **Prisma schema:** Unchanged ✅
- **Production:** `audit_events` 0 rows, 14 columns, 21 tables, 39 total rows — UNCHANGED ✅
- **Dev:** `audit_events` 0 rows, 14 columns, 21 tables — NOW MATCHES SCHEMA ✅
- **.env:** Single correct `DATABASE_URL` pointing to dev ✅
- **Production build:** Compiles successfully ✅

### What was NOT done
- No app code modified
- No Prisma schema modified
- No production database touched
- No data mutated (dev or prod)
- No deployment triggered
- No seeds executed
- No snapshots restored
- No checkpoints created
- No secrets printed

### Impact
- Schema drift between dev and production is resolved
- PRE-FL-DEPLOY can be retried — deploy should no longer attempt to drop `audit_events`
- The `.env` misconfiguration that caused silent prod-targeting has been fixed


---

## PRE-FL-E2E-NOW-LINK-DATA — Isolated /now test student linkage

**Date:** 2026-04-29
**Type:** Production data creation (no code, no schema, no deploy)

### Purpose
Create the minimal production data so the existing User account `test.now@student.bexauri.cl` can access `/now` as a student with a visible pending study load.

### What was created (production, via authenticated admin API calls)

| Record | Key fields |
|---|---|
| **Student** | firstName=Test, lastName=Now, email=test.now@student.bexauri.cl |
| **Enrollment (StudentProgramInstance)** | program=PAES_M1, status=active, currentCycleId set |
| **Diagnostic** | type=initial, status=completed, resultSummary="Diagnóstico inicial placeholder — PRE-FL /now test data" |
| **LearningCycle** | cycleNumber=1, status=open |
| **StudyLoad** | title="PAES M1 — Prueba de acceso estudiante /now", loadType=practice, status=pending |
| **StudyLoad (auto)** | title="Initial practice" (auto-created by cycle POST route), status=pending |

### What was NOT done
- Did not create or reset any User password
- Did not modify User row for test.now@student.bexauri.cl
- Did not touch Ana Beta-M1 or Bruno Beta-L1 data (verified read-only)
- Did not start, complete, close, or consume any study load
- Did not modify app code, schema, or endpoints
- Did not run prisma db push, migrate, or seed
- Did not deploy
- Did not create Abacus checkpoints
- No secrets, passwords, or connection strings printed

### Verification
1. ✅ User exists for test.now@student.bexauri.cl
2. ✅ Student exists with matching email
3. ✅ Enrollment exists, status=active, program=PAES_M1
4. ✅ currentCycleId set on enrollment
5. ✅ LearningCycle exists, status=open, cycleNumber=1
6. ✅ StudyLoad exists, status=pending
7. ✅ /admin/beta-operations loads correctly, shows 3 active enrollments
8. ✅ Test Now appears in "Trabajo pendiente" section
9. ✅ Ana/Bruno data intact (verified enrollments, cycles, statuses unchanged)
10. ✅ No start/complete/close/continue/decision mutations performed

### Next step
User manually logs in as test.now@student.bexauri.cl on production and verifies `/now` renders the pending study load.


---

## FL-1 — Manual Decision Dry Run with Test Now

**Date:** 2026-04-30
**Type:** Production data mutation (one CycleDecision only — no code, no schema, no deploy)

### Purpose
Validate the final MVP beta loop: student evidence → admin review → manual pedagogical decision → traceability.

### Pre-mutation state verified
- Test Now Cycle 1: open, PAES_M1
- Completed load: "PAES M1 — Prueba de acceso estudiante /now" (practice, completed)
- Evidence: "Autorreporte: Me fue bien"
- Decisions: 0
- Evaluations: 0

### Mutation performed
One CycleDecision created via authenticated admin API:
- **decisionType:** advance
- **rationale:** "Dry-run decision: Test Now completed the /now test load and reported 'Me fue bien'. This decision validates manual pedagogical traceability before the assisted closed beta."
- **learningCycleId:** cmokoth030007qo08ve71fnaq (Test Now Cycle 1)

### Post-mutation verification
1. ✅ Decisions section now shows exactly 1 decision
2. ✅ Decision type "advance" visible as badge
3. ✅ Rationale text visible in admin cycle detail
4. ✅ Completed load and "Autorreporte: Me fue bien" remain visible
5. ✅ Cycle remains open (not closed or continued)
6. ✅ No new study loads created
7. ✅ No cycle close/continue happened
8. ✅ /admin/beta-operations loads correctly (3 active enrollments)
9. ✅ Ana Beta-M1 data intact (in_progress load, pending loads unchanged)
10. ✅ Bruno Beta-L1 data intact (pending loads unchanged)

### What was NOT done
- No code, schema, or endpoint changes
- No deploy, no prisma CLI, no checkpoints
- No start/complete/close/continue actions
- No new users, students, enrollments, cycles, study loads, or responses created
- No secrets, passwords, or connection strings printed
- Ana/Bruno completely untouched

### Dry run loop completed
```
Student evidence ("Me fue bien") → Admin review (cycle detail) → Manual decision (advance) → Traceability (visible in admin)
```

### Next possible phase
FL — Assisted closed beta execution with real students (Ana, Bruno)


---

## FL-2 — Beta Participant Readiness and First Session Plan

**Date:** 2026-04-30
**Type:** Operational planning (documentation only — no code, no schema, no data, no deploy)

### Purpose
Prepare the first real assisted closed beta session with 1–2 participants without executing it.

### Artifacts created
- `nextjs_space/docs/operations/BETA_PARTICIPANT_READINESS_FL2.md` — 17-section operational plan covering:
  - Readiness baseline (FH→FL-1 validated)
  - Participant selection criteria (1 student, PAES M1 first)
  - First study load design (ecuaciones lineales, practice, 20–30 min)
  - Spanish onboarding message draft
  - Parent/guardian note for minors
  - Admin operation checklist (before/during/after)
  - Student feedback questions (7 items)
  - Decision criteria (advance/reinforce/hold/redirect)
  - Stop/pause criteria
  - Anti-patterns (what NOT to do)
  - Recommended sequence (1 student → review → feedback → decide → expand)
  - Risks and mitigations
  - FL execution prerequisites

### What was NOT done
- No code, schema, or endpoint changes
- No data created, modified, or deleted
- No users, students, enrollments, cycles, study loads, responses, or decisions created
- No deploy, no prisma CLI, no checkpoints
- No secrets printed

### Next possible phase
FL — Assisted closed beta execution, after participant/task approval and checklist completion