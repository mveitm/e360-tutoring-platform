# MVP-BETA-TARGET-1 - Autonomous sales-ready target and handoff propagation

Date: 2026-05-18

## 1. Phase purpose

This phase locks the corrected Bexauri MVP-Beta v1 destination and propagates it into the handoff system so future chats and agents do not regress to a smaller manual, local, staging-only, or 7-day-demo interpretation.

This is documentation/custody/handoff-only. It does not authorize code changes, runtime behavior changes, provider setup, deploy, database mutation, schema work, `.env` inspection, or secret printing.

## 2. Live baseline

Git preflight before this phase showed:

- `git status --short`: clean output.
- HEAD = origin/main = `f6cbf21`.
- Last accepted commit = `MVP-BETA-BUDGET-1: estimate sales-ready beta budget`.
- Working tree expected clean before this documentation/custody/handoff phase.

Git preflight remains the live truth. Earlier docs contain stale embedded baselines such as `ee44f22`, `a795ac3`, `9528305`, `ff410af`, `adf435b`, and older SRA/M1-only references. Those remain historical context only where they differ from current Git and this target lock.

## 3. Canonical MVP-Beta v1 target

Canonical target definition:

> The objective of Bexauri MVP-Beta v1 is to reach a first sales-ready published version capable of receiving several students in parallel, activating access according to plan, managing payments and subscriptions, allowing initial and sustained work in PAES L1, M1, and M2, capturing learning evidence, showing operational state to the student and tutor/admin, and sustaining human tutoring accompaniment without requiring technical manual intervention for each signup, payment, program assignment, or basic continuity action.

Control phrase:

> We are not building only an operational beta. We are building the first autonomous-basic commercial version of Bexauri.

MVP-Beta v1 is:

- sales-ready;
- published;
- autonomous-basic commercially;
- multi-student;
- multi-program across PAES L1, M1, and M2;
- payment/subscription capable;
- evidence-aware;
- tutor/admin operable;
- human-supervised;
- not dependent on technical manual work for each normal student operation.

## 4. What this target is not

MVP-Beta v1 is not:

- local-only;
- staging-only;
- a short demo;
- a 7-day trial only;
- a manually assembled beta for each student;
- a beta that requires technical intervention for every signup, payment, enrollment, or ordinary continuity action;
- a fully automated adaptive AI platform;
- a PAES score predictor;
- a guaranteed score increase product;
- a mastery/theta engine;
- a native mobile app;
- a full post-MVP platform.

Human tutoring accompaniment remains central. The correction is that commercial basics must become autonomous-basic enough that humans tutor and supervise, rather than technically assemble each student's access and continuity by hand.

## 5. Manual vs autonomous-basic boundary

| Process | Can remain manual in MVP-Beta v1? | Must be autonomous-basic before sales-ready? | Notes |
|---|---:|---:|---|
| Student signup/account activation | Partly | Yes | Support can assist, but normal account activation must not require direct technical work per student. |
| Plan selection | Partly | Yes | Plan choice can be sales-assisted, but selected plan must be recorded in a reliable operational surface. |
| Payment | Partly | Yes | Manual bank transfer can be acceptable only if controlled; payment path must be functional enough for commercial operation. |
| Subscription status | Partly | Yes | Active, paused, cancelled, overdue, and refund states must be trackable without memory or direct DB edits. |
| Program enrollment | Partly | Yes | Admin/tutor may approve or adjust, but plan-to-program mapping must be reliable for L1/M1/M2. |
| Access activation/deactivation | Partly | Yes | Access must follow plan/payment/subscription state through approved UI or process, not direct DB edits. |
| Student work in L1/M1/M2 | No for sold programs | Yes | Each sold program needs a minimum route, activity access, and continuity model. |
| Evidence capture | No | Yes | Evidence must be captured in-app, not only WhatsApp, spreadsheet notes, or memory. |
| Tutor/admin review | Yes | No for full automation | Human review can remain manual/human, with cadence and rubrics. |
| Next activity/continuity | Partly | Yes | Human selection can exist, but ordinary continuity must not depend on technical intervention or direct DB edits. |
| Support | Yes | Partly | Support can be human/manual, but channel, response window, and escalation path must be defined. |
| Legal/consent | Partly | Yes | Consent can be manually checked for small cohort, but policy, record, and responsibility must exist. |
| Progress reporting | Yes | Partly | Reporting can be simple and human-written, but must be based on captured evidence and avoid score/mastery claims. |

Boundary rule:

```text
Human tutoring/review can remain manual. Technical setup per student must not remain manual.
```

Direct database edits must not be normal operation. Evidence capture must be in-app. Payment/subscription handling must be commercially functional. Program access must map reliably to plans.

## 6. Corrected macro roadmap to preserve

| # | Macro block | Purpose | Why it matters | Blocks sales-ready? | Can run in parallel? | Effort |
|---:|---|---|---|---:|---:|---:|
| 0 | Target lock and handoff propagation | Preserve the autonomous-basic commercial target in docs and future chats. | Prevents regression to manual demo thinking. | Yes | No | S |
| 1 | Non-Abacus staging setup and deploy | Establish Vercel/Neon staging/beta path. | Published sales-ready work cannot rely on local-only or blocked Abacus. | Yes | Partly | M |
| 2 | Auth/admin/student smoke verification | Verify login, admin, student state, evidence surfaces, and safe fallback. | Commercial onboarding fails if access/auth is unstable. | Yes | No | S/M |
| 3 | Commercial plan and access model | Define Plan Base/Complete, trial policy, activation/deactivation, and program mapping. | Plans must map to actual access and support promises. | Yes | Yes | M |
| 4 | Payments and subscriptions | Define provider/manual path, recurring status, cancellations, refunds, reconciliation. | Payments/subscriptions are core to autonomous-basic commercial MVP-Beta v1. | Yes | Yes | M/L |
| 5 | Student onboarding and account activation | Allow several students to start without technical intervention per student. | Multi-student operation depends on repeatable onboarding. | Yes | Yes | M |
| 6 | Multi-program L1/M1/M2 engine and access mapping | Ensure student-program instances and plan access work across L1/M1/M2. | Prevents Plan Base/Complete confusion and wrong access. | Yes | Yes | L |
| 7 | L1 minimum beta route | Create source mapping, legal/original text policy, activities, evidence, rubric. | L1 is required for Plan Base and currently `NOT_READY`. | Yes | Yes | L/XL |
| 8 | M1 sustained beta expansion | Extend beyond current partial AS1/PE1 path. | M1 is strongest but not enough for sustained beta. | Yes | Yes | L |
| 9 | M2 minimum beta route | Create M2 scope, prerequisites, route, activities, evidence, rubric. | Plan Complete cannot include active M2 without this. | Yes for M2 sales | Yes | L/XL |
| 10 | Student multi-program experience | Let students see current program context, next action, and evidence flow. | Students must work in assigned programs without confusion. | Yes | Partly | M/L |
| 11 | Admin/tutor operations for multiple students | Operate review, support, continuity, and reporting across several students. | Sales-ready means parallel operation, not one-off intervention. | Yes | Yes | M/L |
| 12 | Legal/privacy/support/trust | Define privacy, terms, consent, refund/cancellation, support channel. | Needed before paid or serious beta students. | Yes | Yes | M |
| 13 | Internal pilot with multiple students and L1/M1/M2 | Validate target operation or explicitly narrow offer. | Paying students should not be first validation of basics. | Yes | No | M |
| 14 | Sales-ready go/no-go | Record final acceptance or blocked/narrowed offer. | Prevents premature commercial launch. | Yes | No | S |

## 7. Relationship with previous SCOPE-2 and BUDGET-1

`MVP-BETA-SCOPE-2` remains valid as the roadmap foundation. It correctly established sales-ready state `NOT_READY`, L1 `NOT_READY`, M1 `PARTIAL`, M2 `NOT_READY`, and the critical path through staging, scope/content, access/payment/legal/support, pilot, and go/no-go.

`MVP-BETA-BUDGET-1` remains valid as a scenario estimate. It correctly identified that budget remains `NEEDS_INPUT`, provider cash cost is not the dominant early risk, and owner-time/content-cost risks are high.

This phase sharpens the target from "guided implementation beta" to:

```text
AUTONOMOUS_BASIC_SALES_READY
```

That correction increases the importance of:

- payments and subscriptions;
- multi-student onboarding;
- plan-to-access mapping;
- student account activation without technical manual work;
- L1 and M2 readiness;
- multi-program operational state for student and tutor/admin.

Abacus decision remains unchanged:

```text
ABACUS_NOT_RECOMMENDED_FOR_BASE_PATH
```

## 8. Current state vs target

Current state:

- M1 is `PARTIAL`.
- L1 is `NOT_READY`.
- M2 is `NOT_READY`.
- Vercel/Neon path is selected, but provider setup/deploy/smoke verification are not completed.
- Payments/subscriptions are not implemented as a commercial operating path.
- Multi-student autonomous-basic onboarding/access is not proven.
- Current handoff docs were M1-centric and needed target propagation.

Target state:

- Several students can enter in parallel.
- Students can start and continue assigned L1/M1/M2 programs according to paid/subscribed access.
- Payments/subscriptions and access state are operationally reliable.
- Learning evidence is captured in-app.
- Student and tutor/admin can see operational state.
- Human tutoring accompaniment is sustained without technical manual intervention for normal signup, payment, enrollment, or basic continuity.

Gap:

```text
LARGE_BUT_DEFINED
```

The target is larger than a guided/manual beta, but the gap is now explicit enough to plan.

## 9. Updated Abacus decision

Decision:

```text
ABACUS_NOT_RECOMMENDED_FOR_BASE_PATH
```

Current base stack remains:

```text
Mauricio + ChatGPT/Codex + GitHub + Vercel/Neon
```

Abacus may be tactical only for a specific narrow need after access and budget are restored. Do not make Abacus a dependency for handoff, deploy, coding, data custody, or the sales-ready path.

## 10. Handoff propagation rules

All future chats/agents must preserve:

- the MVP-Beta v1 target definition;
- the control phrase: "We are not building only an operational beta. We are building the first autonomous-basic commercial version of Bexauri.";
- L1/M1/M2 scope;
- payments/subscriptions as core, not optional post-MVP;
- multi-student parallel operation;
- Vercel/Neon non-Abacus path;
- no-secret-printing policy;
- Git preflight as live truth;
- no false PAES score, mastery, theta, guaranteed score increase, automatic diagnosis, or adaptive AI claims;
- human tutoring/review can remain manual, but technical setup per student must not remain manual.

## 11. Recommended next phase

Recommended next phase:

```text
MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon provider setup execution
```

Reason:

- Staging remains the first critical technical step.
- The target is now locked; the next uncertainty is whether the selected non-Abacus deployment path can support the app safely.
- Provider setup can proceed without changing code or finalizing pricing.
- It preserves the Vercel/Neon base path and moves toward auth/admin/student smoke verification.

The roadmap must later include:

- `MVP-BETA-COMMERCIAL-1 - Plan/access/payment/subscription model`;
- `MVP-BETA-SCOPE-3 - L1 minimum beta route`;
- `MVP-BETA-SCOPE-4 - M2 minimum beta route`;
- `MVP-BETA-SCOPE-5 - M1 sustained expansion`.

## 12. Final verdict

```text
Target lock state: TARGET_LOCKED_FOR_HANDOFF
MVP-Beta v1 target: AUTONOMOUS_BASIC_SALES_READY
Sales-ready current state: NOT_READY
Roadmap impact: PAYMENTS_SUBSCRIPTIONS_AND_MULTI_PROGRAM_ACCESS_ARE_CORE
Abacus decision: ABACUS_NOT_RECOMMENDED_FOR_BASE_PATH
Next phase: MVP-DEPLOY-INDEPENDENCE-5
```

## 13. Explicit non-actions

This phase did not:

- change code;
- change runtime behavior;
- change packages;
- install dependencies;
- deploy;
- configure providers;
- create provider accounts;
- mutate any database;
- change schema;
- run migrations;
- run Prisma db push/reset;
- run SQL;
- inspect `.env` values;
- print secrets;
- generate PDF/DOCX;
- create `.logs`, `node_modules`, `yarn.lock`, checkpoint artifacts, or build artifacts;
- make PAES score, theta, mastery, automatic diagnosis, guaranteed score increase, or adaptive AI claims.
