# MVP-ROADMAP-LOCK-1 - MVP-Beta closed roadmap constitution

Status: ACTIVE_ROADMAP_SEMANTIC_LOCK

Type: Strategic roadmap / governance / documentation lock

Scope: Documentation-only / no implementation / no runtime / no DB / no secrets / no Sales-Ready declaration

## 1. Purpose

This document locks the official roadmap semantics for Bexauri / E360 MVP-Beta cerrado and prevents future chats, agents, Codex phases or handoffs from reducing the complete MVP-Beta scope to "M1-first".

Core decision:

> M1-first es una estrategia táctica de primera vertical; no redefine ni reduce el alcance del MVP-Beta cerrado, que comprende M1, M2 y L1.

Required phrase:

> Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.

## 2. Source of truth

Git preflight is the live truth.

Required preflight before every future phase:

```text
git status --short
git branch --show-current
git rev-parse HEAD
git rev-parse origin/main
git rev-parse origin/HEAD
git log --oneline --decorate --graph -8
```

Documentation hierarchy:

1. Git preflight.
2. `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`.
3. `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`.
4. `MVP_SALES_READY_ACTIVE_CONTEXT.md`.
5. `MVP_SALES_READY_ROADMAP.md`.
6. `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
7. Latest phase docs and evidence docs.
8. Current handoff.
9. Chat memory.

If documents, handoffs or chat memory contradict Git preflight, name the contradiction and do not proceed until the phase is re-anchored.

## 3. Official definitions

### M1-first

A tactical first-vertical sequence selected because M1 has the strongest current evidence.

M1-first can validate the student/product/admin circuit.

M1-first cannot:

- remove M2;
- remove L1;
- declare MVP-Beta closed;
- declare Sales-Ready;
- declare public sale;
- imply payment/subscription readiness;
- imply full PAES coverage.

### Piloto cerrado M1-first

A controlled, non-public, M1-only pilot milestone for known/consented participants.

It is:

- controlled;
- limited;
- evidence-oriented;
- not public;
- not payment/subscription launch;
- not full L1/M1/M2 triad;
- not Sales-Ready público.

### MVP-Beta cerrado

A closed beta state where the expected MVP-Beta scope is represented across M1, M2 and L1 through minimum honest routes, evidence, admin/tutor operation, support boundaries and documented limitations.

Closed means controlled access, not public sale.

### Sales-Ready cerrado

A controlled commercial-readiness state where Bexauri can validate a limited commercial operation with clear access, support, evidence, payment/sandbox or manual payment process, and honest offer boundaries.

It does not equal Sales-Ready público.

### Sales-Ready público

A later state where Bexauri can open a public offer with stable login, correct access/enrollment, program routes, evidence, admin/tutor review, support, payment/access handling, legal/privacy basics and honest claims.

Current status: `NOT_READY`.

### MVP-Alfa

A later, more productized MVP stage with lower manual friction, stronger onboarding, broader content, stronger feedback and greater repeatability.

### Post-MVP

Advanced capabilities beyond MVP-Beta and MVP-Alfa: adaptive AI, score/theta/mastery models, autonomous AI tutor, parent dashboards, native mobile, large-scale analytics and broad automation.

## 4. M1-first vs M1/M2/L1

Sequence is not scope.

M1-first defines the first tactical path.

M1/M2/L1 defines the expected full MVP-Beta closed scope.

Canonical phrase:

> Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.

Dangerous phrase:

> MVP cerrado M1-first

This phrase is forbidden unless explicitly qualified as a tactical stage and not final scope.

## 5. Gate matrix

| Gate | Objective | Must work | Required evidence | Cannot declare yet | Blockers | Natural next phase |
|---|---|---|---|---|---|---|
| Gate 0 - M1 local/dev vertical validated | Confirm one-participant M1 local/dev student path | Login/manual, `/now`, StudyLoad, answers, completion/self-report, next M1 pending | Dry-run doc and safe result markers | Pilot ready, MVP-Beta cerrado, Sales-Ready | Runtime path not passing | Gate 1 |
| Gate 1 - M1 admin/tutor evidence visible | Verify admin/tutor evidence for `PILOT_M1_001` | Admin/tutor can inspect evidence from completed M1 dry-run | Admin evidence doc/report | Multi-participant pilot, Sales-Ready | Evidence not visible or not reviewable | Gate 2 |
| Gate 2 - M1 closed pilot minimum | Run/prepare controlled M1-first closed pilot | Controlled participants, access state, honest `/now`, M1 completion, support/failure path, go/no-go | Pilot report / go-no-go | L1 ready, M2 ready, public sale, full triad | Missing admin evidence, access register, support path | Gate 3A/3B |
| Gate 3A - M2 first equivalent vertical | Create/validate minimum M2 vertical before Plan Complete | M2 source/scope, first route, registry-backed activity, evidence, rubric | M2 source register and vertical evidence | Plan Complete, full M2 coverage | No M2 route/content/evidence | Gate 5 or 3B |
| Gate 3B - L1 first equivalent vertical | Create/validate minimum L1 vertical before Plan Base | L1 source/scope, legal/original text policy, registry-backed activity, evidence, rubric | L1 source register and vertical evidence | Plan Base, full L1 coverage | No L1 registry content/legal text path | Gate 5 or 3A |
| Gate 5 - MVP-Beta cerrado M1/M2/L1 | Close controlled beta scope across M1/M2/L1 | Minimum routes, evidence, admin/tutor, access, support, limits | MVP-Beta go/no-go evidence package | Public Sales-Ready | Any missing program route or evidence path | Gate 6 |
| Gate 6 - Closed payment/sandbox | Validate controlled payment/access boundary | Manual/payment sandbox, ledger, consent, refund/cancel, support | Sandbox/payment-access report | Public subscription | No payment policy/ledger/consent | Gate 7 |
| Gate 7 - Sales-Ready cerrado | Validate controlled commercial readiness | Access, support, evidence, payment/access, legal, honest offer | Sales-Ready cerrado checklist | Public sale | Any MUST_HAVE unresolved | Gate 8 |
| Gate 8 - Sales-Ready público | Open responsible public offer | Login, access, routes, evidence, support, payment, legal, onboarding | Public go/no-go | MVP-Alfa | Public-readiness blockers | Gate 9 |
| Gate 9 - MVP-Alfa | Productize beyond beta | Less manual friction, broader content, stronger reporting | Alfa plan and criteria | Post-MVP adaptive claims | Premature advanced automation | Post-MVP governance |

M2/L1 gate order may be adjusted by explicit roadmap decision. They must not be eliminated.

## 6. Evidence rules

Every gate must document:

- objective;
- scope;
- what works;
- evidence required;
- evidence observed;
- what cannot be declared;
- blockers;
- debts;
- next phase;
- source docs;
- Git baseline;
- explicit non-actions.

Chat memory is not evidence.

## 7. Debts vs blockers

Acceptable debt:

- named;
- bounded;
- non-critical to the declared gate;
- not hiding product truth;
- documented with next action.

Blocker:

- prevents truthful declaration of the gate.

Current classification:

- Admin/tutor evidence for `PILOT_M1_001` is a blocker before advancing the M1 pilot.
- Login E2E Playwright is bounded automation debt for now.
- L1 is not student/product-ready until minimum route/content/evidence/rubric exists.
- M2 is not active/sellable until a minimum route exists.
- Payment/subscription is not ready until sandbox/manual/provider/payment policy exists.

## 8. Prohibitions

Do not:

- reduce MVP-Beta cerrado to M1;
- declare Sales-Ready from M1-first;
- declare public sale from closed pilot;
- imply L1/M2 readiness from M1 evidence;
- imply payment/subscription readiness from sandbox;
- treat trial as full tutoring duration;
- promise full PAES coverage;
- promise PAES score prediction, theta, mastery, adaptive AI or guaranteed improvement;
- request, print or store secrets;
- use DB/manual memory as normal commercial operation;
- proceed with a phase that cannot identify its roadmap block.

## 9. Continuity between chats

Every new chat must read:

1. `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
2. `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
3. `MVP_SALES_READY_ACTIVE_CONTEXT.md`
4. `MVP_SALES_READY_ROADMAP.md`
5. `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
6. Latest evidence/gate document
7. Current handoff

Every handoff must include:

- Git baseline;
- current gate;
- M1 status;
- M2 status;
- L1 status;
- evidence complete;
- evidence pending;
- debts;
- blockers;
- explicit non-actions;
- next proposed phase;
- authorization status;
- required phrase: "Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1."

## 10. Context checkpoint mínimo

E360/Bexauri está en roadmap lock.

M1-first es táctica de primera vertical, no alcance final.

El MVP-Beta cerrado completo comprende M1, M2 y L1.

Estado documentado:

- M1: parcial pero real / pilot usable with limits.
- L1: internal-only / not ready.
- M2: not evidenced / not ready.
- Sales-Ready público: NOT_READY.
- Pago/trial público: no activo.
- Playwright login E2E: deuda acotada, no siguiente bloqueante.
- Admin/tutor evidence: pendiente inmediato.

Frase obligatoria:

"Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1."

## 11. Anti-deviation rule

If a future chat says "MVP cerrado M1-first" without qualification, it must pause and restate:

> M1-first is sequence, not scope. MVP-Beta cerrado remains M1/M2/L1.

If a phase omits M2/L1 while discussing MVP-Beta cerrado, it must clarify whether this is shorthand or an attempted scope change.

Scope changes require explicit roadmap decision.

## 12. Next recommended phase

After this documentation update closes, the immediate product-readiness gate is:

`MVP-SALES-PILOT-ADMIN-EVIDENCE-1 - Verify local admin/tutor evidence for PILOT_M1_001 dry-run`

Roadmap block:

10 - Internal pilot and sales-ready go/no-go, with dependencies on Block 8 admin/tutor operations and Block 7 evidence/content route.

This does not reopen Playwright login E2E, payment, trial, L1, M2, staging or public Sales-Ready.
