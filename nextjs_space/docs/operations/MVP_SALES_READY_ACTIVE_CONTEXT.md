# MVP Sales-Ready Active Context

Status: ACTIVE_COMPASS

## Live-state rule

Git preflight wins.

Every future chat or agent must first verify:

```text
git status --short
git log --oneline --decorate --graph -8
```

If any document, memory, phase log entry, or handoff contradicts Git preflight, Git preflight is the live truth and the mismatch must be reported.

## Latest verified baseline

* HEAD = origin/main = origin/HEAD = `513d6a2`
* Last accepted commit = `MVP-ROADMAP-LOCK-0: extract Pro roadmap context package`
* Working tree expected: clean

`MVP-ROADMAP-LOCK-0` is closed and accepted at `513d6a2`.

## External audit redirect - 2026-05-27

External audit verdict: `NO_LISTO` for closed 3-student pilot.

Main correction: do not continue the isolated L1 validation chain automatically.

New first milestone:

```text
MVP-SALES-PILOT-MILESTONE-1 - Closed 3-student vertical pilot skeleton
```

Current recommended next phase:

```text
MVP-SALES-PILOT-SCOPE-1 - Lock closed 3-student pilot scope and first vertical milestone
```

Current program posture:

```text
L1 = INTERNAL_ONLY_NOT_READY
M1 = PARTIAL_BUT_REAL
M2 = NOT_EVIDENCED_NOT_READY
```

`/now` multi-program behavior and access/payment/trial remain blockers.

Validation phases must directly unblock the vertical milestone.

Historical note: `MVP-SALES-AUTH-1A` was the previously recommended immediate phase before this audit redirect. It remains useful roadmap context, but it is no longer the immediate next phase.

## Current target

Bexauri MVP-Beta v1 is the first autonomous-basic commercial sales-ready MVP.

Control phrase:

> We are not building only an operational beta. We are building the first autonomous-basic commercial version of Bexauri.

The mandatory target is:

* published;
* multi-student;
* L1/M1/M2-capable;
* payment/subscription-capable;
* evidence-aware;
* tutor/admin operable;
* human-supervised;
* without requiring technical manual intervention for each signup, payment, program assignment, or basic continuity action.

## Current state

Sales-ready state: `NOT_READY`

Roadmap state:

```text
READY_FOR_PHASED_EXECUTION
```

The preserved staging evidence is useful, but it is not the roadmap driver.

Staging/demo thread status:

```text
PRESERVED, DEPRIORITIZED unless roadmap explicitly reopens it.
```

Current priority:

```text
Sales-ready roadmap and self-serve commercial flow.
```

Current next recommended roadmap phase:

`MVP-SALES-PILOT-ADMIN-EVIDENCE-1 - Verify local admin/tutor evidence for PILOT_M1_001 dry-run`

## Roadmap semantic lock

Current roadmap semantic lock:

`MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`

Core decision:

> M1-first es una estrategia táctica de primera vertical; no redefine ni reduce el alcance del MVP-Beta cerrado, que comprende M1, M2 y L1.

Required phrase:

> Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.

## Block 7 pedagogical anchor

Block 7 has a mandatory pedagogical-layer restart anchor:

`nextjs_space/docs/operations/MVP_SALES_READY_BLOCK_7_PEDAGOGICAL_LAYER_ANCHOR.md`

The M1 pedagogical layer is `PARTIAL_BUT_REAL`.

Future Block 7 work must read the anchor and the SRA docs before proposing L1/M1/M2 content route phases. Block 7 is not the current priority unless Mauricio explicitly redirects.

## Current blockers

* Self-serve student registration/account bootstrap is not sales-ready.
* Trial/access model is not implemented.
* Payment/subscription model is not implemented.
* Plan/access mapping is not implemented.
* Self-serve enrollment into up to 3 tutorias is not implemented.
* Simultaneous L1/M1/M2 student dashboard is not implemented.
* Pause/close/reopen tutoring states are not implemented.
* L1 route is `NOT_READY`.
* M1 route is `PARTIAL`.
* M2 route is `NOT_READY`.
* Admin/tutor multi-student operations are incomplete.
* Legal/support/payment policy is incomplete.
* Internal pilot/go-no-go is not done.

## Required first-read docs for future chats

1. `nextjs_space/docs/operations/MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
2. `nextjs_space/docs/operations/MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
3. `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`
4. `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`
5. `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
6. `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP_1_FULL_ROADMAP_DEVIATION_AUDIT_AND_HANDOFF_ALIGNMENT.md`
7. `nextjs_space/docs/operations/MVP_SALES_READY_BLOCK_7_PEDAGOGICAL_LAYER_ANCHOR.md`
8. `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
9. `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`
10. `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
11. `PHASE_LOG.md` latest entries

## Next recommended phase

`MVP-SALES-PILOT-ADMIN-EVIDENCE-1 - Verify local admin/tutor evidence for PILOT_M1_001 dry-run`

Gate:

* Roadmap block: 10 - Internal pilot and sales-ready go/no-go; supports Block 8 admin/tutor operations and Block 7 evidence review.
* Sales-ready relevance: direct/high for closed pilot readiness.
* Dependency: one-participant M1 local/dev runtime dry-run passed with admin evidence deferred.
* What it advances: verifies whether admin/tutor can inspect evidence from the M1 dry-run before repeating additional participants or moving toward pilot go/no-go.
* What it does not advance: Playwright login E2E, payment/trial/subscription, L1/M2 readiness, staging/production, public Sales-Ready.
* Priority verdict: `APPROVED_NEXT_GATE_AFTER_ROADMAP_LOCK`.
* Authorization status: authorized by Mauricio for documentation/roadmap/governance update; operational execution still requires a separate phase.
