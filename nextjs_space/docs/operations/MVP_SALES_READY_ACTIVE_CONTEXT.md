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

* HEAD = origin/main = `277de8b`
* Last accepted commit = `MVP-SALES-READY-HANDOFF-1: harden roadmap phase gate`
* Working tree expected: clean

`MVP-SALES-READY-ROADMAP-1` is the current phase under review. Do not claim it is closed until committed.

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

Roadmap state after `MVP-SALES-READY-ROADMAP-1` is accepted:

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

After `MVP-SALES-READY-ROADMAP-1`, the next recommended roadmap phase is:

`MVP-SALES-AUTH-1A - Audit current signup/login/student bootstrap`

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

1. `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`
2. `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`
3. `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
4. `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP_1_FULL_ROADMAP_DEVIATION_AUDIT_AND_HANDOFF_ALIGNMENT.md`
5. `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
6. `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`
7. `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
8. `PHASE_LOG.md` latest entries

## Next recommended phase after Roadmap-1 acceptance

`MVP-SALES-AUTH-1A - Audit current signup/login/student bootstrap`

Gate:

* Roadmap block: 1 - Self-serve student registration/account bootstrap.
* Sales-ready relevance: direct/high.
* Dependency: `MVP-SALES-READY-ROADMAP-1` closed.
* What it advances: first blocker toward student self-serve entry.
* What it does not advance: billing/trial/enrollment yet.
* Priority verdict: `APPROVED_NEXT_PHASE`.
* Authorization status: not yet authorized until Mauricio says adelante.
