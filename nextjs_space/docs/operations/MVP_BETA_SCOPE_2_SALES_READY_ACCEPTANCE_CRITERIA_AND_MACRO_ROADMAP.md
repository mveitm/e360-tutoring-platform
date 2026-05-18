# MVP-BETA-SCOPE-2 - Sales-ready implementation beta acceptance criteria and macro roadmap

Date: 2026-05-18

## 1. Phase purpose

This phase converts `MVP-BETA-SCOPE-1` findings into acceptance criteria and a macro roadmap for MVP beta sales-ready implementation across PAES L1, M1, and M2.

It is documentation, roadmap, and acceptance-criteria only. It does not authorize code changes, deploy, provider setup, database mutation, schema work, production operation, `.env` inspection, or secret printing.

## 2. Live baseline

Git preflight before this phase showed:

- `git status --short`: clean output.
- HEAD = origin/main = `a795ac3`.
- Last accepted commit = `MVP-BETA-SCOPE-1: review implementation beta scope`.
- Working tree expected clean before this phase.

Git preflight remains the live truth. If older scope, deploy, M1, FL/FK, external master, or user-provided documents contain stale baselines, this baseline wins.

## 3. Sales-ready beta definition

MVP beta sales-ready means Bexauri can responsibly onboard a small number of paying or serious beta students into sustained, human-supervised PAES tutoring across L1, M1, and/or M2, with published access, stable login, correct program enrollment, minimum viable content paths, evidence capture, admin/tutor review, support, payment/access handling, legal/privacy basics, and honest limits.

Sales-ready does not mean fully automated, full PAES coverage, adaptive AI, production at scale, native mobile, automatic diagnosis, PAES score prediction, theta, mastery certification, or guaranteed score improvement. It must preserve the beta truth: guided, supervised, evolving, limited cohort, evidence-aware, and operationally honest.

## 4. Sales-ready acceptance criteria

Legend:

- `MUST_HAVE_FOR_SALES_READY` - required before paying/serious beta students.
- `CAN_BE_MANUAL_IN_BETA` - allowed manually for a small cohort if controlled and documented.
- `DEFER_TO_MVP_ALFA` - useful for mature MVP, not required for sales-ready beta.
- `DEFER_TO_POST_MVP` - advanced platform capability, not beta scope.

### A. Infrastructure/deployment

| Criterion | Status |
|---|---|
| Vercel + Neon staging provider setup completed without secrets printed. | MUST_HAVE_FOR_SALES_READY |
| Staging deploy completed from GitHub `main` with app root `nextjs_space`. | MUST_HAVE_FOR_SALES_READY |
| Staging smoke verification covers `/now`, admin access, auth, cycle/evidence surfaces, and safe fallback. | MUST_HAVE_FOR_SALES_READY |
| Beta/production deploy decision documented after staging passes. | MUST_HAVE_FOR_SALES_READY |
| Rollback path known for app deploy. | MUST_HAVE_FOR_SALES_READY |
| DB target clear: staging/beta DB chosen, no accidental Abacus dependency. | MUST_HAVE_FOR_SALES_READY |
| Runtime env names configured in provider; no values in docs/chat/logs. | MUST_HAVE_FOR_SALES_READY |
| Full monitoring/analytics suite. | DEFER_TO_MVP_ALFA |

### B. Student access/onboarding

| Criterion | Status |
|---|---|
| Student account can be created or activated through an approved path. | MUST_HAVE_FOR_SALES_READY |
| Student can log in without technical intervention. | MUST_HAVE_FOR_SALES_READY |
| Program enrollment matches paid/beta plan. | MUST_HAVE_FOR_SALES_READY |
| Student sees a clear next action and current program context. | MUST_HAVE_FOR_SALES_READY |
| Support channel and expected response window are communicated. | MUST_HAVE_FOR_SALES_READY |
| Onboarding can be manual/live for the first cohort. | CAN_BE_MANUAL_IN_BETA |
| Fully automated self-serve signup. | DEFER_TO_MVP_ALFA |

### C. Program coverage

| Criterion | Status |
|---|---|
| L1 minimum beta route exists with source scope, legal text policy, registry-backed activities, evidence model, and admin rubric. | MUST_HAVE_FOR_SALES_READY |
| M1 minimum sustained route exists beyond the current short AS1 path. | MUST_HAVE_FOR_SALES_READY |
| M2 minimum beta route exists before selling Plan Complete with M2. | MUST_HAVE_FOR_SALES_READY for M2 sales |
| Each active sold program has content, evidence capture, and review model. | MUST_HAVE_FOR_SALES_READY |
| Full official PAES coverage across all axes. | DEFER_TO_MVP_ALFA |
| PAES score prediction or mastery model. | DEFER_TO_POST_MVP |

### D. Sustained tutoring operation

| Criterion | Status |
|---|---|
| Weekly cadence defined for each active program. | MUST_HAVE_FOR_SALES_READY |
| Review cadence and max review delay defined. | MUST_HAVE_FOR_SALES_READY |
| Next activity selection process defined. | MUST_HAVE_FOR_SALES_READY |
| No-response and inactive-student protocol defined. | MUST_HAVE_FOR_SALES_READY |
| Operator time budget per student/program defined. | MUST_HAVE_FOR_SALES_READY |
| Escalation/support protocol defined. | MUST_HAVE_FOR_SALES_READY |
| Weekly review and next-load selection can be human-operated. | CAN_BE_MANUAL_IN_BETA |
| Automated adaptive sequencing. | DEFER_TO_POST_MVP |

### E. Evidence/admin

| Criterion | Status |
|---|---|
| StudyLoad evidence saves reliably. | MUST_HAVE_FOR_SALES_READY |
| Admin can inspect item evidence and self-report where applicable. | MUST_HAVE_FOR_SALES_READY |
| Admin can record or document pedagogical decisions. | MUST_HAVE_FOR_SALES_READY |
| Cycles/continuity can be operated safely without direct DB edits. | MUST_HAVE_FOR_SALES_READY |
| No direct database edits as normal workflow. | MUST_HAVE_FOR_SALES_READY |
| Rich analytics dashboard. | DEFER_TO_MVP_ALFA |

### F. Payment/access

| Criterion | Status |
|---|---|
| Plan/pricing model defined for beta offer. | MUST_HAVE_FOR_SALES_READY |
| Payment path defined: provider or manual reconciliation. | MUST_HAVE_FOR_SALES_READY |
| Access activation/deactivation rules defined. | MUST_HAVE_FOR_SALES_READY |
| Cancellation/refund policy defined. | MUST_HAVE_FOR_SALES_READY |
| Manual payment reconciliation is allowed for a small cohort if logged. | CAN_BE_MANUAL_IN_BETA |
| Fully automated billing/subscription portal. | DEFER_TO_MVP_ALFA |

### G. Legal/trust

| Criterion | Status |
|---|---|
| Basic privacy policy exists. | MUST_HAVE_FOR_SALES_READY |
| Basic terms/service conditions exist. | MUST_HAVE_FOR_SALES_READY |
| Consent flow exists if minors/apoderados are involved. | MUST_HAVE_FOR_SALES_READY |
| Disclaimers avoid PAES score, mastery, automatic diagnosis, and adaptive AI claims. | MUST_HAVE_FOR_SALES_READY |
| Support contact is published. | MUST_HAVE_FOR_SALES_READY |
| Formal institutional legal package. | DEFER_TO_MVP_ALFA |

### H. Go/no-go pilot

| Criterion | Status |
|---|---|
| Internal pilot across L1/M1/M2 completed or explicitly narrowed with documented offer limits. | MUST_HAVE_FOR_SALES_READY |
| Observed failure modes documented. | MUST_HAVE_FOR_SALES_READY |
| Final sales go/no-go decision documented. | MUST_HAVE_FOR_SALES_READY |
| Cohort analytics and scale report. | DEFER_TO_MVP_ALFA |

## 5. Macro roadmap stages

| # | Phase code suggestion | Purpose | Must-have outputs | Acceptance criteria | Dependencies | Manual? | Effort | Risk if skipped | Blocks budget? | Blocks sales-ready? |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `MVP-DEPLOY-INDEPENDENCE-5` | Execute Vercel + Neon provider setup. | Vercel project, Neon staging DB, env names configured, no secrets exposed. | Checklist complete; no deploy unless unavoidable preview; no secret values printed. | DEPLOY-4. | Partly | M | No real staging target. | Yes | Yes |
| 2 | `MVP-DEPLOY-INDEPENDENCE-6` | Attempt staging deploy. | Staging URL, selected commit, deploy record. | App builds/deploys from `main`; root is `nextjs_space`; DB target clear. | Stage 1. | No | M | Beta relies on local-only or old Abacus. | Yes | Yes |
| 3 | `MVP-DEPLOY-INDEPENDENCE-7` | Staging smoke verification. | Auth/admin/student smoke report. | Admin login, `/now`, evidence/admin surfaces verified read-only. | Stage 2. | No | S/M | Hidden auth/data failures reach students. | Yes | Yes |
| 4 | `MVP-BETA-SCOPE-3` | Define L1 minimum beta scope/content route. | L1 source register, legal text policy, 7-day route, monthly route, review rubric. | L1 has route acceptance criteria and content production plan. | SCOPE-2. | Content curation partly | L | Plan Base cannot be sold honestly. | Yes | Yes |
| 5 | `MVP-BETA-SCOPE-4` | Define M2 minimum beta scope/content route. | M2 source register, M1 prerequisite policy, 7-day route, monthly route, review rubric. | M2 has route acceptance criteria or Plan Complete is blocked. | SCOPE-2. | Content curation partly | L/XL | Plan Complete overpromises. | Yes | Yes for M2 |
| 6 | `MVP-BETA-SCOPE-5` | Define M1 sustained beta expansion. | M1 route beyond AS1, broader axes plan, content count target, review plan. | M1 no longer depends only on current short sequence. | Current M1 docs. | Partly | L | M1 content exhaustion and overclaiming. | Yes | Yes |
| 7 | `MVP-BETA-ACCESS-1` | Define multi-program plan/access model. | Plan Base/Complete access rules, enrollment mapping, activation/deactivation policy. | Student-program enrollment matches offer; no hidden access ambiguity. | Stages 4-6. | Yes | M | Wrong access/program confusion. | Yes | Yes |
| 8 | `MVP-BETA-OPS-1` | Define sustained tutor operations model. | Weekly cadence, review cadence, no-response policy, support/escalation, operator time model. | Operator can run months of beta without improvising every week. | Program routes. | Yes | M | Owner overload and inconsistent student care. | Yes | Yes |
| 9 | `MVP-BETA-COMMERCIAL-1` | Define offer, price, payment/access handling. | Plan names, price, trial policy, payment provider/manual ledger, cancellation/refund. | Student/apoderado can understand and pay/access cleanly. | Access/ops model. | Yes | M | Payment disputes, unclear beta promise. | Yes | Yes |
| 10 | `MVP-BETA-LEGAL-1` | Define legal/privacy/support baseline. | Privacy, terms, consent, disclaimers, support contact. | No false claims; basic trust/compliance docs exist. | Commercial model. | No for docs | M | Trust/legal risk. | Yes | Yes |
| 11 | `MVP-BETA-LANDING-1` | Define landing/pricing/onboarding copy. | Honest beta copy, plan cards, onboarding steps, limits. | Copy matches real program readiness and avoids false claims. | Commercial/legal/program scope. | Partly | M | Overpromising and confused conversion. | Partly | Yes |
| 12 | `MVP-BETA-PILOT-1` | Internal multi-program pilot. | Pilot report for L1/M1/M2 or explicit narrowed offer. | Evidence captured, admin review works, failure modes logged. | Staging + program routes. | Yes | M | Paying students become first real validation. | No | Yes |
| 13 | `MVP-BETA-GO-1` | Sales-ready go/no-go. | Final checklist and decision. | All blockers resolved or offer narrowed; explicit go/no-go recorded. | All prior stages. | No | S | Premature launch. | No | Yes |

## 6. Critical path

Critical path:

1. Deploy staging Vercel/Neon.
2. Confirm auth/admin/student baseline on staging.
3. Define L1 and M2 minimum beta scope, because strategic sales scope depends on them.
4. Expand M1 sustained route beyond current short validated path.
5. Define multi-program plan/access/payment model.
6. Define legal/support basics.
7. Run internal multi-program pilot, or explicitly narrow the sales offer if one program is not ready.
8. Record sales-ready go/no-go.

Parallel work:

- L1 and M2 scope definition can run in parallel after SCOPE-2.
- M1 route expansion can run in parallel with L1/M2 scope if content ownership is clear.
- Operations model can start while program routes are being drafted, but final capacity estimates depend on content and cadence.
- Commercial/payment/legal copy can draft early, but final wording must wait for program readiness and support limits.
- Staging setup can proceed independently of content route definition, but internal pilot depends on both.

## 7. Program-specific minimum beta route acceptance criteria

### L1 - Competencia Lectora / Lenguaje

Acceptance criteria before sales-ready L1:

- L1 source register or official scope mapping exists.
- Legal/original text policy exists before any student-facing L1 passage is used.
- First 7-day entry route exists with at least one registry-backed activity.
- Sustained monthly route plan exists for the first month, with a roadmap for subsequent months.
- Item/evidence model is defined: item response, text reference, answer key, rationale, self-report.
- Admin review rubric exists for explicit information, inference, purpose/meaning, text structure, or other mapped skills.
- Minimum launch content count is defined before implementation; SCOPE-1 evidence says current active registry content is zero, so launch count cannot be assumed.
- Stop condition: if only legacy L1 fixture loads exist or no registry-backed content exists, L1 must not be sold as active tutoring.

Unknowns to resolve:

- Official L1 source documents to use.
- Text copyright/original-writing approach.
- Content production pace and reviewer ownership.

### M1 - Matemática M1

Acceptance criteria before sales-ready M1:

- Current AS1/PE1 foundation accepted as partial, not complete PAES_M1 coverage.
- Current short sequence is either accepted as a 7-day/trial entry or expanded into a longer first-month route.
- Sustained monthly route plan exists beyond equations/functions.
- Broader axes coverage plan exists for Numbers, Algebra/functions, Geometry, Probability/statistics.
- Expert-review or explicit owner-review plan exists; no expert-validation claim unless review happens.
- Minimum launch content count is defined for 7-day entry, first month, and sustained operation.
- Current transitional 8-item activities are labeled transitional unless a later content-standard phase changes that.
- Admin review rubric exists for advance, reinforce, hold, redirect, bridge/spiral where applicable.
- Stop condition: if sales copy implies full M1/PAES coverage, score prediction, mastery, or adaptive AI, sales-ready is blocked.

Unknowns to resolve:

- Required content volume for a December horizon.
- Whether PE1 bridge is enough for first broader axis move or needs new content before sales.
- Expert/reviewer availability.

### M2 - Matemática M2

Acceptance criteria before sales-ready M2:

- M2 source register or official scope mapping exists.
- Relationship with M1 prerequisites is defined: M2 activity vs M1 repair/support.
- First 7-day entry route exists with at least one registry-backed M2 activity.
- Sustained monthly route plan exists.
- Item/evidence model is defined for M2-specific math tasks.
- Admin review rubric exists for M2 difficulty, prerequisite risk, and next-step decisions.
- Minimum launch content count is defined before implementation; SCOPE-1 found no active M2 content route.
- Stop condition: if M2 exists only as strategy/plan name and not as implemented route/content, Plan Complete cannot include active M2 tutoring.

Unknowns to resolve:

- Official M2 source documents to use.
- First safe M2 topic/slice.
- Whether M2 students need M1 diagnostic/repair before M2 work.

## 8. Manual vs automated beta policy

| Process | Manual acceptable in beta? | Required artifact/control | When automation becomes necessary |
|---|---|---|---|
| Student onboarding | Yes | Onboarding checklist and access log | When cohort grows beyond owner-managed capacity. |
| Program assignment | Yes | Plan-to-enrollment mapping | When multi-program errors become likely. |
| Payment reconciliation | Yes | Payment/access ledger, no secrets | When monthly volume or disputes exceed manual reliability. |
| Subscription status | Yes | Active/paused/canceled access register | Before scaling beyond small cohort. |
| Weekly review | Yes | Review rubric and cadence | When review delays exceed promised window. |
| Next StudyLoad selection | Yes | Decision rationale and route map | When manual selection blocks continuity. |
| Content curation | Yes | Source/content QA checklist | Automation only after content standards are stable. |
| Cycle decision | Yes | Evidence-backed decision record/note | When consistent rubric is validated and automation can be governed. |
| Support | Yes | Support channel and response policy | When support volume exceeds owner response window. |
| Legal consent tracking | Yes | Consent checklist/record | Before large cohort or institutional sales. |
| Progress reporting | Yes | Simple monthly/weekly summary template | When reporting consumes excessive tutor time. |

## 9. Sales offer boundaries

Supported strategic offer structure from SCOPE-1 external master docs:

- Proposed Plan Base: L1 + M1.
- Proposed Plan Complete: L1 + M1 + M2.

Offer boundary:

- Plan Base can only be sold when L1 and M1 each have minimum beta routes, evidence models, and support capacity.
- Plan Complete can only be sold when M2 minimum route exists; otherwise M2 must be marked unavailable, waitlisted, or excluded.
- A 7-day trial may be sold as an entry point, but it must not imply the full duration of tutoring.
- The sales language should say guided beta, supervised PAES tutoring, evolving platform, limited cohort, and human-reviewed evidence.

Must not promise:

- Full PAES coverage.
- PAES score prediction.
- Score increase guarantee.
- Adaptive AI.
- Automatic diagnosis.
- Theta/mastery certification.
- Autonomous AI tutor.
- Production-scale reliability.

## 10. Budget readiness framework

Final budget is not ready. Required inputs:

- Number of beta students.
- Duration commitment per student.
- Plan price for Plan Base and Plan Complete.
- Number of programs per student.
- Weekly tutor/admin minutes per student.
- Content production hours per activity.
- Number of activities per program for 7-day entry, first month, and sustained operation.
- Legal/support cost assumptions.
- Hosting tier and whether commercial use requires paid Vercel/Neon plans.
- Payment provider or manual payment process.
- Marketing/landing cost.
- Whether owner time is counted as cost.
- Whether external tutor/content reviewer is paid.
- Whether email delivery is required.
- Whether old Abacus data must be preserved.

Budget readiness:

```text
BUDGET_NEEDS_INPUT
```

Reason: SCOPE-1 confirmed strategic scope, but L1/M2 route definitions, student count, duration, price, operator time, content pace, legal/support assumptions, and provider/payment choices remain unresolved.

## 11. Abacus decision

Decision:

```text
ABACUS_NOT_RECOMMENDED_FOR_BASE_PATH
```

Equivalent operational interpretation:

```text
ABACUS_OPTIONAL_TACTICAL only for a specific missing capability after access/budget is restored.
```

Rationale:

- Current normal path is Mauricio + ChatGPT/Codex + GitHub + Vercel/Neon.
- Repo deploy-independence docs say Abacus is blocked/unavailable and must not be a dependency.
- Abacus was historically useful as an accelerator, but also expensive and unavailable.
- The sales-ready path needs staging, program scope/content, operations, payment/access, legal/support, and pilot validation; none require Abacus as a base dependency.
- A limited Abacus subscription could be considered only if a concrete task cannot be handled with the current stack and if it does not reintroduce custody/deploy dependency.

## 12. Recommended next phases

1. `MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon provider setup execution`
   - Comes first because sales-ready requires a controlled non-Abacus staging target.

2. `MVP-DEPLOY-INDEPENDENCE-6 - Staging deploy attempt`
   - Converts setup into a real staging URL and reveals deployment blockers.

3. `MVP-DEPLOY-INDEPENDENCE-7 - Staging smoke verification and admin auth check`
   - Confirms auth/admin/student baseline before any beta pilot.

4. `MVP-BETA-SCOPE-3 - Define L1 minimum beta route`
   - L1 blocks Plan Base; it needs source/content/evidence/rubric definition.

5. `MVP-BETA-SCOPE-4 - Define M2 minimum beta route`
   - M2 blocks Plan Complete; if not ready, the offer must exclude or waitlist it.

6. `MVP-BETA-SCOPE-5 - Define M1 sustained beta expansion`
   - M1 is partial and must extend beyond the current short path for sustained operation.

7. `MVP-BETA-ACCESS-1 - Multi-program plan and access model`
   - Aligns commercial plans to student-program instances and activation rules.

8. `MVP-BETA-OPS-1 - Sustained tutoring operations model`
   - Defines cadence, review load, support, escalation, and operator time budget.

9. `MVP-BETA-COMMERCIAL-1 - Offer, access, payment, and pricing model`
   - Turns route/ops reality into beta offer and payment handling.

10. `MVP-BETA-LEGAL-1 - Legal/privacy/support baseline`
    - Establishes minimum trust and compliance before external students.

11. `MVP-BETA-LANDING-1 - Landing, pricing, and onboarding copy`
    - Publishes honest acquisition/onboarding language tied to real readiness.

12. `MVP-BETA-PILOT-1 - Internal multi-program pilot`
    - Tests L1/M1/M2 or documents narrowed offer before sales.

13. `MVP-BETA-GO-1 - Sales-ready go/no-go`
    - Final gate before accepting paying/serious beta students.

## 13. Final verdict

```text
Sales-ready state: NOT_READY
Roadmap readiness: READY_FOR_ACCEPTANCE_CRITERIA_REVIEW
Critical path: staging -> auth/admin/student smoke -> L1/M2 scope -> M1 sustained expansion -> access/payment/legal/support -> internal pilot -> go/no-go
L1: NOT_READY
M1: PARTIAL
M2: NOT_READY
Budget readiness: BUDGET_NEEDS_INPUT
Abacus decision: ABACUS_NOT_RECOMMENDED_FOR_BASE_PATH
Next phase: MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon provider setup execution
```

## 14. Explicit non-actions

This phase did not:

- change code;
- change runtime behavior;
- change packages;
- install dependencies;
- deploy;
- configure providers;
- create accounts;
- mutate any database;
- change schema;
- run migrations;
- run Prisma db push/reset;
- run SQL;
- inspect `.env` values;
- print secrets;
- generate PDF/DOCX;
- make PAES score, theta, mastery, automatic diagnosis, or adaptive AI claims.
