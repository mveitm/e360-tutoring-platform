# MVP-SALES-READY-ROADMAP-1 - Full roadmap, deviation audit, and handoff alignment

Status: FULL_SALES_READY_ROADMAP_AND_DEVIATION_AUDIT_DRAFTED

## 1. Live Git baseline

Git preflight before this phase showed:

* `git status --short`: clean output.
* HEAD = origin/main = `277de8b`.
* Last accepted commit = `MVP-SALES-READY-HANDOFF-1: harden roadmap phase gate`.
* Working tree expected clean before this documentation/custody/roadmap/audit phase.

Git preflight wins. If any document, memory, handoff, or phase log entry contradicts live Git preflight, Git is the live truth and the mismatch must be reported.

## 2. Phase type and non-actions

This phase is documentation/custody/roadmap/audit only.

This phase does not:

* change app code;
* change schema;
* change packages;
* mutate staging;
* mutate production;
* deploy;
* inspect `.env`;
* print secrets;
* use SQL;
* use Prisma CLI;
* start or complete StudyLoads;
* create CycleDecision;
* create CycleEvaluation;
* close cycles;
* create generated artifacts such as PDFs or DOCX.

## 3. Executive verdict

Sales-ready state:

```text
NOT_READY
```

Roadmap state after this document:

```text
READY_FOR_PHASED_EXECUTION
```

Staging/demo evidence status:

```text
PRESERVED_EVIDENCE / NOT_ACTIVE_ROADMAP_DRIVER
```

Next implementation direction:

```text
Self-serve commercial flow, not more staging/demo by momentum.
```

## 4. Exact MVP sales-ready target

Bexauri MVP-Beta v1 is the first autonomous-basic commercial version of Bexauri.

Control phrase:

> We are not building only an operational beta. We are building the first autonomous-basic commercial version of Bexauri.

The concrete target is:

* many students can register;
* each student can start a 7-day trial;
* each student can pay or subscribe;
* each student can enroll in up to 3 tutorias;
* each student can work in L1, M1, and M2 simultaneously, according to access and plan;
* each student can pause, close, and reopen tutorias;
* student work continues without technical manual intervention;
* admin/tutor can supervise evidence and support;
* Bexauri makes no PAES score, theta, mastery, adaptive AI, or guaranteed result claims.

Human supervision remains central. The product must remove routine technical assembly from normal signup, access, payment, enrollment, and basic continuity.

## 5. Current validated assets

Validated assets:

* Vercel/Neon staging exists.
* Admin auth smoke passed.
* A controlled staging student exists: `student-smoke-m1@bexauri.test`.
* M1 continuity smoke validated Activity 1 -> Activity 2 -> Activity 3 pending.
* Admin evidence is visible.
* Local previous operational loop evidence exists.

These assets are useful, but they are not the full sales-ready product. They prove parts of continuity and evidence visibility, not self-serve commercial readiness.

## 6. Current blockers

Sales-ready blockers:

* Self-serve signup/account bootstrap is not sales-ready.
* Trial/access model is missing.
* Billing/subscription model is missing.
* Plan/access mapping is missing.
* Self-serve enrollment up to 3 tutorias is missing.
* Simultaneous L1/M1/M2 dashboard is missing.
* Pause/close/reopen tutoria states are missing.
* L1 is `NOT_READY`.
* M1 is `PARTIAL`.
* M2 is `NOT_READY`.
* Admin/tutor multi-student operations are incomplete.
* Legal/privacy/support/trust is incomplete.
* Internal pilot/go-no-go is not done.

## 7. Roadmap overview by blocks

0. Governance/handoff/roadmap.
1. Self-serve student registration/account bootstrap.
2. Trial and access control.
3. Plan/payment/subscription model.
4. Self-serve enrollment up to 3 tutorias.
5. Multi-program student dashboard for L1/M1/M2.
6. Pause/close/reopen tutoring states.
7. Minimum L1/M1/M2 content routes.
8. Admin/tutor multi-student operations.
9. Legal/privacy/support/trust.
10. Internal pilot and sales-ready go/no-go.

## 8. Detailed phases and microphases

### Block 0 - Governance/handoff/roadmap

Phase family: `MVP-SALES-READY-HANDOFF-*`, `MVP-SALES-READY-ROADMAP-*`

Objective: keep the repo as living memory and prevent phase drift.

Microphases:

* `MVP-SALES-READY-HANDOFF-1` - already closed.
* `MVP-SALES-READY-ROADMAP-1` - current phase.
* `MVP-SALES-READY-ROADMAP-2` - roadmap acceptance review and implementation sequencing, if needed.

Outputs: active context, roadmap, phase gate, full roadmap, deviation audit, next implementation direction.

Acceptance criteria: future chats can identify the roadmap block before proposing work; off-roadmap work becomes `ROADMAP_CHANGE_REQUEST`.

Dependencies: Git preflight and current documentation custody.

Forbidden/out of scope: implementation, staging mutation, production, deploy, secrets.

Risk if skipped: latest operational thread becomes the roadmap by momentum.

Gate status: `IN_PROGRESS_CURRENT_PHASE`.

### Block 1 - Self-serve student registration/account bootstrap

Phase family: `MVP-SALES-AUTH-*`

Objective: allow new students to enter without technical manual intervention.

Microphases:

* `MVP-SALES-AUTH-1A` - audit current signup/login/student bootstrap.
* `MVP-SALES-AUTH-1B` - design User/Student bootstrap contract.
* `MVP-SALES-AUTH-1C` - implement student signup/account creation.
* `MVP-SALES-AUTH-1D` - verify new student login + `/now` empty/onboarding state.
* `MVP-SALES-AUTH-1E` - harden duplicate email, missing profile, error copy, admin visibility.

Outputs: audited auth model, bootstrap contract, self-serve student creation path, verified first login state, admin visibility.

Acceptance criteria: a student can create/access an account through an approved path and reach `/now` without Codex, SQL, Prisma, or manual DB work.

Dependencies: Roadmap-1 closed.

Forbidden/out of scope: billing, enrollment, production mutation, secrets, direct DB fixes as normal path.

Risk if skipped: every student still requires technical assembly.

Gate status: `APPROVED_NEXT_PHASE_CANDIDATE`.

### Block 2 - Trial and access control

Phase family: `MVP-SALES-TRIAL-*`

Objective: define and enforce the 7-day trial/access lifecycle.

Microphases:

* `MVP-SALES-TRIAL-1A` - define trial state model and policy.
* `MVP-SALES-TRIAL-1B` - implement trial fields/state.
* `MVP-SALES-TRIAL-1C` - student UI for trial active/days left/expired.
* `MVP-SALES-TRIAL-1D` - access restriction/paywall on expired trial.
* `MVP-SALES-TRIAL-1E` - end-to-end trial verification.

Outputs: trial policy, data/state model, student UI, access restriction, verification.

Acceptance criteria: student access correctly reflects active/expired trial state without manual technical intervention.

Dependencies: account bootstrap path.

Forbidden/out of scope: paid billing integration unless explicitly scoped.

Risk if skipped: trial promises cannot be enforced or explained.

Gate status: `PLANNED_AFTER_AUTH`.

### Block 3 - Plan/payment/subscription model

Phase family: `MVP-SALES-BILLING-*`

Objective: connect commercial access to plan/payment/subscription state.

Microphases:

* `MVP-SALES-BILLING-1A` - decide plan model: Base/Complete or simpler initial offer.
* `MVP-SALES-BILLING-1B` - decide Stripe vs manual controlled payment path.
* `MVP-SALES-BILLING-1C` - implement Subscription/PlanAccess minimal model.
* `MVP-SALES-BILLING-1D` - implement checkout/manual activation path.
* `MVP-SALES-BILLING-1E` - implement active/paused/canceled/past_due access logic.
* `MVP-SALES-BILLING-1F` - verify cancellation/reactivation/access behavior.

Outputs: plan decision, provider/manual path, subscription/access model, activation path, lifecycle access behavior.

Acceptance criteria: paid/active/paused/canceled/past_due status controls access consistently and visibly.

Dependencies: account bootstrap, trial policy, legal/payment policy choices.

Forbidden/out of scope: storing secrets in docs, claiming payment automation before verified.

Risk if skipped: commercial operation relies on memory and manual exceptions.

Gate status: `PLANNED`.

### Block 4 - Self-serve enrollment up to 3 tutorias

Phase family: `MVP-SALES-ENROLL-*`

Objective: let students enroll in allowed programs within plan/cap limits.

Microphases:

* `MVP-SALES-ENROLL-1A` - audit Program/StudentProgramInstance constraints for PAES_L1/M1/M2.
* `MVP-SALES-ENROLL-1B` - design student-facing tutoria catalog.
* `MVP-SALES-ENROLL-1C` - implement enrollment self-serve with max 3 active tutorias.
* `MVP-SALES-ENROLL-1D` - auto-create first LearningCycle + first StudyLoad per tutoria.
* `MVP-SALES-ENROLL-1E` - prevent duplicates and enforce plan/cap limits.
* `MVP-SALES-ENROLL-1F` - verify one student with L1/M1/M2 enrollments.

Outputs: enrollment constraints, catalog, self-serve enrollment, first cycle/load creation, cap enforcement.

Acceptance criteria: a student can enroll into allowed L1/M1/M2 tutorias without duplicate or over-cap records.

Dependencies: account, plan/access, minimum content availability.

Forbidden/out of scope: selling L1/M2 as active if content route is not ready.

Risk if skipped: plan promises do not map to actual program access.

Gate status: `PLANNED`.

### Block 5 - Multi-program `/now`

Phase family: `MVP-SALES-NOW-*`

Objective: make `/now` usable for simultaneous L1/M1/M2 work.

Microphases:

* `MVP-SALES-NOW-1A` - audit current `/now` single-active-program assumptions.
* `MVP-SALES-NOW-1B` - design multi-tutoria dashboard.
* `MVP-SALES-NOW-1C` - implement program cards for L1/M1/M2.
* `MVP-SALES-NOW-1D` - show pending/in_progress/completed per tutoria.
* `MVP-SALES-NOW-1E` - preserve evidence separation per enrollment.
* `MVP-SALES-NOW-1F` - verify simultaneous work across L1/M1/M2.

Outputs: audit, design, program cards, per-tutoria status, separated evidence, multi-program verification.

Acceptance criteria: one student can see and work across L1/M1/M2 without context confusion.

Dependencies: enrollment model and content availability.

Forbidden/out of scope: mixing evidence across enrollments.

Risk if skipped: multi-program commercial offer is confusing or unsafe.

Gate status: `PLANNED`.

### Block 6 - Tutoria lifecycle states

Phase family: `MVP-SALES-TUTORING-STATE-*`

Objective: support active, paused, closed, and reopened tutoring states without deleting evidence.

Microphases:

* `MVP-SALES-TUTORING-STATE-1A` - define active/paused/closed/reopened states.
* `MVP-SALES-TUTORING-STATE-1B` - implement pause.
* `MVP-SALES-TUTORING-STATE-1C` - implement resume.
* `MVP-SALES-TUTORING-STATE-1D` - implement close without deleting evidence.
* `MVP-SALES-TUTORING-STATE-1E` - reopen or open new tutoria within plan cap.
* `MVP-SALES-TUTORING-STATE-1F` - verify constraints and history preservation.

Outputs: lifecycle policy, state transitions, UI/admin controls, history preservation.

Acceptance criteria: access and continuity respond correctly to pause/resume/close/reopen.

Dependencies: subscription/access and enrollment model.

Forbidden/out of scope: destructive deletion of student evidence.

Risk if skipped: subscription lifecycle cannot be operated responsibly.

Gate status: `PLANNED`.

### Block 7 - Minimum L1/M1/M2 content routes

Phase families: `MVP-SALES-CONTENT-L1-*`, `MVP-SALES-CONTENT-M1-*`, `MVP-SALES-CONTENT-M2-*`, `MVP-SALES-CONTENT-TRIAD-*`

Objective: ensure sold programs have minimum honest routes.

Microphases:

* `MVP-SALES-CONTENT-L1-1A` - define L1 source/legal text policy.
* `MVP-SALES-CONTENT-L1-1B` - create first L1 registry-backed activity.
* `MVP-SALES-CONTENT-L1-1C` - define first-week L1 route and evidence model.
* `MVP-SALES-CONTENT-M1-1A` - define M1 sustained expansion beyond AS1.
* `MVP-SALES-CONTENT-M1-1B` - implement next M1 route slice(s).
* `MVP-SALES-CONTENT-M1-1C` - define M1 first-month route.
* `MVP-SALES-CONTENT-M2-1A` - define M2 minimum route or explicitly waitlist/exclude M2.
* `MVP-SALES-CONTENT-M2-1B` - implement first M2 registry-backed activity if M2 remains in offer.
* `MVP-SALES-CONTENT-TRIAD-1` - define coherent first-week L1/M1/M2 experience.
* `MVP-SALES-CONTENT-QA-1` - claims/quality checklist, no score/theta/mastery/adaptive AI.

Outputs: source/legal policy, first activities/routes, first-week/first-month route definitions, claims checklist.

Acceptance criteria: each sold program has content, evidence, and review model appropriate to the claim.

Dependencies: source policy, content ownership, enrollment/access decisions.

Forbidden/out of scope: PAES score, theta, mastery, adaptive AI, full coverage claims.

Risk if skipped: Bexauri sells unsupported L1/M2 or overstates M1.

Gate status: `PLANNED_PARALLEL_TRACK`.

### Block 8 - Admin/tutor multi-student operations

Phase families: `MVP-SALES-ADMIN-*`, `MVP-SALES-OPS-*`

Objective: let tutor/admin operate several students without SQL, Prisma, direct DB edits, or memory.

Microphases:

* `MVP-SALES-ADMIN-1A` - active/trial/paid/expired student list readiness.
* `MVP-SALES-ADMIN-1B` - student tutorias overview.
* `MVP-SALES-ADMIN-1C` - recent evidence by tutoria.
* `MVP-SALES-ADMIN-1D` - filters by program/status/risk/pending action.
* `MVP-SALES-ADMIN-1E` - support operations without SQL/Prisma/direct DB.
* `MVP-SALES-OPS-1` - review cadence, no-response policy, escalation, operator time budget.

Outputs: admin lists, tutorias overview, evidence views, filters, support workflow, operating cadence.

Acceptance criteria: tutor/admin can supervise multiple students through app/process surfaces, not ad hoc DB access.

Dependencies: auth, access/enrollment, evidence model.

Forbidden/out of scope: direct DB as normal operation.

Risk if skipped: multi-student operation fails under owner workload.

Gate status: `PLANNED`.

### Block 9 - Legal/privacy/support/trust

Phase family: `MVP-SALES-TRUST-*`

Objective: make the offer responsible and honest before paid/serious students.

Microphases:

* `MVP-SALES-TRUST-1A` - privacy baseline.
* `MVP-SALES-TRUST-1B` - beta terms/service conditions.
* `MVP-SALES-TRUST-1C` - minor/apoderado consent policy if applicable.
* `MVP-SALES-TRUST-1D` - support channel and response window.
* `MVP-SALES-TRUST-1E` - honest public copy and disclaimers.

Outputs: privacy, terms, consent policy, support window, claim boundaries.

Acceptance criteria: public/sales-facing language avoids false claims and sets clear support/access expectations.

Dependencies: commercial offer, payment/access, program readiness.

Forbidden/out of scope: legal overclaiming, score guarantees, adaptive claims.

Risk if skipped: trust, refund, compliance, and reputational risk.

Gate status: `PLANNED_PARALLEL_TRACK`.

### Block 10 - Internal pilot and sales-ready go/no-go

Phase families: `MVP-SALES-PILOT-*`, `MVP-SALES-GO-*`

Objective: prove or narrow the offer before accepting paying/serious students.

Microphases:

* `MVP-SALES-PILOT-1A` - multi-student self-serve signup pilot.
* `MVP-SALES-PILOT-1B` - trial end-to-end pilot.
* `MVP-SALES-PILOT-1C` - payment/subscription access pilot.
* `MVP-SALES-PILOT-1D` - L1/M1/M2 simultaneous enrollment pilot.
* `MVP-SALES-PILOT-1E` - pause/close/reopen tutorias pilot.
* `MVP-SALES-GO-1` - final sales-ready go/no-go.

Outputs: pilot reports, failure modes, narrowed offer if needed, final go/no-go.

Acceptance criteria: all must-have flows pass or the offer is explicitly narrowed.

Dependencies: blocks 1-9.

Forbidden/out of scope: accepting paying students before go/no-go.

Risk if skipped: paying students become first testers of basic commercial flow.

Gate status: `FINAL_GATE`.

## 9. Recommended sequencing

Recommended execution order:

1. `MVP-SALES-AUTH-1A - Audit current signup/login/student bootstrap`.
2. `MVP-SALES-AUTH-1B - Design User/Student bootstrap contract`.
3. `MVP-SALES-AUTH-1C - Implement student signup/account creation`.
4. `MVP-SALES-TRIAL-1A - Define trial state model and policy`.
5. `MVP-SALES-ENROLL-1A - Audit Program/StudentProgramInstance constraints for PAES_L1/M1/M2`.
6. `MVP-SALES-NOW-1A - Audit current /now single-active-program assumptions`.

Parallel work that can start after roadmap acceptance:

* L1/M1/M2 content route planning.
* Legal/support/trust docs.
* Billing model design.

Do not recommend staging/demo continuation as the immediate next step.

## 10. Deviation audit

Cause of recent drift:

* Staging smoke was valuable.
* Recent phase momentum created a local next-step chain.
* The latest `PHASE_LOG.md` entry became over-influential.
* Handoff docs had the sales-ready target but no active phase firewall.
* M1-centric doc names and historical sections added cognitive gravity.
* The missing control was a mandatory roadmap-block match before phase proposal.

The result was not wasted work; staging evidence is useful. The correction is that preserved evidence must not drive the next phase unless it maps to the sales-ready roadmap.

## 11. Corrective controls now installed

Current controls:

* `MVP_SALES_READY_ACTIVE_CONTEXT.md` is the compass.
* `MVP_SALES_READY_ROADMAP.md` is the execution map.
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md` is the authorization firewall.
* `PHASE_LOG.md` is the ledger, not the compass.
* Git preflight is live truth.
* Off-roadmap work is `ROADMAP_CHANGE_REQUEST`.
* Local/staging/demo continuation defaults to `LOW_PRIORITY_FOR_SALES_READY`.
* No future chat may infer the next phase from `PHASE_LOG.md` alone.

## 12. Handoff alignment audit

Is the system now ready for future chats to contextualize themselves?

```text
YES, WITH KNOWN HISTORICAL-M1 RISK CONTAINED.
```

Required first-read order:

1. `MVP_SALES_READY_ACTIVE_CONTEXT.md`
2. `MVP_SALES_READY_ROADMAP.md`
3. `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
4. `CURRENT_AGENT_HANDOFF_MVP_M1.md`
5. `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`
6. `DOCUMENTATION_INDEX_MVP_M1.md`
7. Latest relevant `PHASE_LOG.md` entries

What still needs improvement:

* Future generated handoffs should become sales-ready-first instead of M1-first.
* Historical M1-centric sections should remain clearly labeled as support, not roadmap direction.
* A later roadmap acceptance phase may choose whether to create a new non-M1-named current handoff.

What this Roadmap-1 changes in the active roadmap:

* It expands the preliminary roadmap into phased execution blocks.
* It selects `MVP-SALES-AUTH-1A` as the next recommended phase.
* It confirms staging/demo is preserved evidence, not active roadmap driver.

Does any handoff file still contain stale M1-centric risk?

```text
YES.
```

Disposition:

```text
ACCEPTABLE_AS_HISTORICAL_SUPPORT_FOR_NOW
```

Reason: the top sections in handoff/template/index now point to active context, roadmap, and phase gate first. Further cleanup can happen later, but it is not necessary to unlock the next roadmap phase.

## 13. Next recommended phase

Recommended next phase:

`MVP-SALES-AUTH-1A - Audit current signup/login/student bootstrap`

Gate for next phase:

* Roadmap block: 1 - Self-serve student registration/account bootstrap.
* Sales-ready relevance: direct/high.
* Dependency: `MVP-SALES-READY-ROADMAP-1` closed.
* What it advances: first blocker toward student self-serve entry.
* What it does not advance: billing/trial/enrollment yet.
* Priority verdict: `APPROVED_NEXT_PHASE`.
* Authorization status: not yet authorized until Mauricio says adelante.

## 14. Scope preserved

This phase preserved scope:

* No staging mutation.
* No production operation.
* No deploy.
* No StudyLoad started.
* No answer submitted.
* No StudyLoad completed.
* No CycleDecision created.
* No CycleEvaluation created.
* No cycle closed.
* No SQL.
* No Prisma CLI.
* No `.env` inspection.
* No secrets printed.
* No app code change.
* No schema change.
* No package change.
* No generated artifact.
