# MVP-BETA-BUDGET-1 - Budget scenario estimate for sales-ready implementation beta

Date: 2026-05-18

## 1. Phase purpose

This phase creates a first budget scenario estimate for reaching MVP beta sales-ready and sustaining the implementation beta across PAES Competencia Lectora / Lenguaje L1, PAES Matematica M1, and PAES Matematica M2.

The estimate is based on `MVP-BETA-SCOPE-2`, where the accepted sales-ready state is `NOT_READY`, roadmap readiness is `READY_FOR_ACCEPTANCE_CRITERIA_REVIEW`, L1 is `NOT_READY`, M1 is `PARTIAL`, M2 is `NOT_READY`, and budget readiness is `BUDGET_NEEDS_INPUT`.

This is documentation/business-estimate only. It does not change code, runtime behavior, providers, databases, schema, UI, API, packages, deployment, `.env` values, or secrets.

## 2. Live baseline

Git preflight before this phase showed:

- `git status --short`: clean output.
- HEAD = origin/main = `ee44f22`.
- Last accepted commit = `MVP-BETA-SCOPE-2: define sales-ready beta roadmap`.
- Working tree expected clean before this documentation/business-estimate phase.

Git preflight remains the live truth. Older docs contain stale embedded baselines such as `a795ac3`, `9528305`, `ff410af`, `adf435b`, and earlier phase commits; those are historical context only where they differ from current Git.

## 3. Budget framing

This document is a scenario estimate, not a final accounting budget.

Final budget still depends on:

- number of beta students;
- target monthly price;
- Plan Base vs Plan Complete mix;
- paid, prepaid, discounted, or free beta policy;
- beta duration;
- content production pace;
- tutor/admin review time per student;
- payment provider;
- legal, consent, support, and refund choices;
- whether Mauricio's owner/operator time is valued as an economic cost.

The MVP beta is a sustained guided implementation, potentially several months. A 7-day trial or sales entry may exist, but it is not the real cost center. The main budget drivers are sustained operation, L1/M1/M2 content production, weekly human review, payment/access handling, and legal/support readiness.

Cash outlay and owner/Mauricio time are separated throughout this document. A low-cash scenario can still be commercially unsafe if owner time becomes unsustainable.

## 4. Current pricing research notes

Pricing and limits change. These notes are decision inputs as of 2026-05-18, not procurement authorization.

Sources checked:

- Vercel pricing: <https://vercel.com/pricing>
- Neon pricing: <https://neon.com/pricing>
- GitHub pricing: <https://github.com/pricing>
- ChatGPT Plus help/pricing note: <https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus>
- OpenAI API pricing: <https://openai.com/api/pricing/>
- Abacus pricing: <https://abacus.ai/pricing>
- Abacus billing FAQ: <https://abacus.ai/help/chatllm-ai-super-assistant/faqs/billing>
- Flow Chile tariffs: <https://web.flow.cl/es-cl/tarifas/>
- Transbank Webpay/tariff pages: <https://publico.transbank.cl/es/tarifas> and <https://ayuda.transbank.cl/tarifas-y-comisiones>
- Mercado Pago Chile help page: <https://www.mercadolibre.cl/ayuda/costo-recibir-pagos-dinero_220>
- Stripe global availability: <https://stripe.com/global>
- Approximate USD/CLP reference: public USD/CLP pages showed roughly CLP 900 per USD around 2026-05-18.

Provider findings:

| Provider/category | Current public finding | Budget interpretation |
|---|---|---|
| Vercel | Public pricing lists Hobby at $0 and Pro at $20/month plus additional usage, with spend controls. | For commercial Bexauri use, budget Pro or paid-ready posture even if staging starts free. |
| Neon | Public pricing lists Free at $0 with usage limits; Launch is usage-based with typical spend around $15/month for an intermittent 1 GB workload. | Staging/small beta may begin free, but budget $0-$30/month for early beta DB posture. |
| GitHub | Public pricing lists Free at $0 and Team at $4/user/month. | Current one-owner custody can remain $0; Team is optional if collaboration/access control needs grow. |
| ChatGPT/Codex/OpenAI | ChatGPT Plus is listed at $20/month; API usage is separately billed. | Current Mauricio + ChatGPT/Codex workflow should be treated as recurring AI/dev cost. Avoid unbounded API use unless budget-capped. |
| Abacus | Public pricing shows Basic at $10/month after first month with 20,000 credits/month; Pro at $20/month with 30,000 credits/month and broader agent/coding access. | Not required for base path. Credit limits and prior spend risk make it tactical only. |
| Flow Chile | Public tariffs show card payments around 2.89% + IVA or 3.19% + IVA depending payout timing, no fixed transaction cost for the listed card plan. | Viable Chile-oriented option for payment links/subscriptions; integration can be deferred for manual beta. |
| Transbank/Webpay | Official pages say Webpay pays by commission per sale and provide a simulator; exact tariff depends on activity/conditions. | Strong Chile default candidate, but final percentage must be checked in simulator/account process before final budget. |
| Mercado Pago Chile | Public help indicates commissions and payout times are configurable in the account cost section; exact rates were not reliably visible without account context. | Treat as `NEEDS_CURRENT_WEB_OR_ACCOUNT_VERIFICATION` before choosing. |
| Stripe | Stripe global availability page did not list Chile as a supported account country/region. | Do not use Stripe as the Chile base path unless availability/entity structure is separately verified. |

Currency assumption:

```text
USD/CLP conversion used for estimates: 1 USD ~= CLP 900
Use only as an approximate planning assumption, not financial advice.
```

## 5. Cost categories

| Category | One-time / monthly / per-student / per-transaction | Required for sales-ready? | Can be manual/deferred? | Notes |
|---|---|---:|---:|---|
| Vercel hosting | Monthly plus usage | Yes | Free/preview posture may be temporary | Budget $0-$20+/month early; commercial use should assume Pro or paid-ready posture. |
| Neon PostgreSQL | Monthly plus usage | Yes | Free tier may be temporary | Budget $0-$30/month early; paid posture becomes more important with real students/data. |
| GitHub | Monthly per user if Team | Yes as custody, not necessarily paid | Paid Team deferable | Current GitHub can remain $0 unless collaboration/access-control needs increase. |
| Domain/DNS | Annual, amortized monthly | Yes for public sales trust | Initial Vercel URL only for staging | Budget $10-$30/year for simple domain if not already owned. |
| Email/domain email | Monthly | Recommended before sales | Manual Gmail/Workspace alternative initially | Needed for support/trust; budget $0-$15/user/month depending setup. |
| Logging/monitoring | Monthly | Minimal logs required | Full suite deferable | Vercel/Neon built-ins first; paid observability later if failures/support grow. |
| ChatGPT/Codex | Monthly | Yes for current implementation workflow | Not realistically deferable if current workflow continues | Budget at least current subscription cost; API usage should be capped if introduced. |
| Optional Abacus | Monthly/credits | No | Yes | Not recommended for base path; tactical only with stop rule. |
| Other AI tools | Monthly | No | Yes | Defer until a concrete missing capability appears. |
| L1 scope/content creation | One-time plus recurring | Yes for Plan Base | No for sold L1 | Major driver due to legal/original text policy, source mapping, item writing, review. |
| M1 expansion content | One-time plus recurring | Yes | No for sustained M1 | Current M1 path is partial and must expand beyond short AS1/PE1 entry. |
| M2 scope/content creation | One-time plus recurring | Yes for Plan Complete | No for sold M2 | Starts near zero; Plan Complete blocked without route/content/review model. |
| Item writing | Per activity / recurring | Yes | No | Includes answer keys, rationale, difficulty, taxonomy, evidence model. |
| Review/QA | Per activity / recurring | Yes | Partly owner-operated | External expert review is optional but reduces pedagogical risk. |
| Source mapping | One-time plus recurring | Yes | No | Official PAES source mapping avoids false coverage claims. |
| L1 legal/original text policy | One-time plus recurring control | Yes | No | Required before student-facing L1 passages. |
| Weekly tutor/admin review | Weekly fixed plus per student | Yes | Can be owner-operated | Sustained operation cost grows with students and review promise. |
| Support | Weekly fixed plus per student | Yes | Can be manual | Requires published channel and response window. |
| Onboarding | Per student | Yes | Can be manual/live | Manual is acceptable for small cohort if checklist/log exists. |
| Payment reconciliation | Per student/month | Yes | Can be manual | Manual ledger acceptable for small cohort; must be controlled. |
| Monthly reporting | Per student/month | Recommended/sales-critical | Can be simple/manual | Must avoid score/mastery/automatic diagnosis claims. |
| Landing/pricing copy | One-time plus updates | Yes | Simple version acceptable | Must be honest about beta limits and program availability. |
| Terms/privacy/consent/refund | One-time plus review | Yes | Templates can start lean | Minors/apoderados increase legal/consent risk. |
| Payment provider/account | One-time setup plus fees | Yes if paid beta | Manual transfer can defer integration | Provider decision affects fees, support, refunds, automation, and reconciliation. |
| Commissions/fees | Per transaction | Yes if paid beta | No | Estimate 1.5%-4.5%+IVA depending provider/payment method until exact provider chosen. |
| Branding/sales material | One-time | Recommended | Can be lean | Basic trust material matters more than polished brand in small beta. |
| Bug fixes/emergency support | Monthly contingency | Yes | No | Reserve capacity/cash even if no code changes planned in budget phase. |
| Provider overage | Monthly contingency | Yes | No | Use spend limits/alerts; avoid unbounded usage-based services. |
| Extra content production | Monthly contingency | Yes | No | Student pacing can force more content than planned. |

## 6. Scenario assumptions

### Scenario A - Ultra-lean owner-operated beta

Assumptions:

- very small cohort, roughly 1-5 students;
- Mauricio does most content, tutor/admin, support, onboarding, and reconciliation;
- manual payments/access acceptable;
- minimal legal templates and clear disclaimers;
- low or no paid external help;
- low provider spend;
- sales copy is honest, limited, and avoids full PAES, score, mastery, automatic diagnosis, theta, or adaptive AI claims;
- Plan Complete with M2 is not sold until M2 minimum route exists.

### Scenario B - Prudential sales-ready beta

Assumptions:

- small paid cohort, roughly 5-20 students;
- Vercel/Neon paid or paid-ready posture if commercial use or data confidence requires it;
- some external support may be used for legal/payment/content review;
- manual operations still allowed but tracked;
- L1/M1/M2 minimum routes are created before being sold;
- support path and response window exist;
- payment provider or disciplined manual transfer/access ledger is selected.

### Scenario C - Safer accelerated beta

Assumptions:

- faster route/content production for L1/M1/M2;
- some paid expert review/content help;
- stronger legal/payment setup before sales;
- likely paid provider tiers;
- support/reporting burden shared or partially outsourced;
- no Abacus dependency unless a specific tactical need appears.

### Scenario D - Tactical Abacus subscription

This is not a base scenario. It is only useful if a narrow task appears that materially improves speed and cannot be handled with Mauricio + ChatGPT/Codex + GitHub + Vercel/Neon.

Assumptions:

- Abacus used tactically, not for deploy custody or production dependency;
- no extra credits without explicit approval;
- stop rule if credits/costs become unpredictable;
- cancel if it does not remove a concrete bottleneck within one billing cycle.

## 7. Estimate tables

Ranges intentionally avoid false precision. CLP uses the planning conversion `1 USD ~= CLP 900`.

### Scenario A - Ultra-lean owner-operated beta

| Cost type | Estimate USD | Estimate CLP | Notes |
|---|---:|---:|---|
| Minimum monthly cash | $20-$60/month | CLP 18,000-54,000/month | Assumes existing GitHub, free/low hosting, ChatGPT/Codex as main paid tool, manual payment/support. |
| Likely monthly cash | $45-$120/month | CLP 40,500-108,000/month | Adds domain/email amortization, Vercel/Neon paid-ready buffer, small provider/overage contingency. |
| One-time setup cash | $50-$500 | CLP 45,000-450,000 | Domain, basic legal templates, minimal sales assets; excludes paid professional legal review. |
| Optional external help | $0-$500/month | CLP 0-450,000/month | Occasional content/legal/payment consultation only. |
| Owner/Mauricio time if monetized | $1,500-$5,000/month equivalent | CLP 1,350,000-4,500,000/month | Economic value only; actual cash may be zero. Assumes heavy owner operation. |

Scenario A is cash-light but owner-time-heavy. It is viable only with strict cohort limits and honest sales boundaries.

### Scenario B - Prudential sales-ready beta

| Cost type | Estimate USD | Estimate CLP | Notes |
|---|---:|---:|---|
| Minimum monthly cash | $80-$200/month | CLP 72,000-180,000/month | Paid-ready hosting/database, email/domain, AI/dev subscription, basic contingencies. |
| Likely monthly cash | $200-$700/month | CLP 180,000-630,000/month | Adds payment/support tooling, modest content/review/legal amortization, provider usage buffer. |
| One-time setup cash | $800-$4,000 | CLP 720,000-3,600,000 | Legal/privacy/refund basics, payment setup, landing/pricing copy, initial L1/M2/M1 scope support. |
| Optional external help | $300-$1,500/month | CLP 270,000-1,350,000/month | Content review, pedagogy review, legal/payment support, support backup. |
| Owner/Mauricio time if monetized | $1,000-$3,500/month equivalent | CLP 900,000-3,150,000/month | Still material because manual operations remain allowed. |

Scenario B is the recommended planning posture for a responsible paid beta: still lean, but not dependent on free tiers or invisible owner labor.

### Scenario C - Safer accelerated beta

| Cost type | Estimate USD | Estimate CLP | Notes |
|---|---:|---:|---|
| Minimum monthly cash | $300-$900/month | CLP 270,000-810,000/month | Paid providers, support/legal/payment readiness, modest paid review/content capacity. |
| Likely monthly cash | $900-$2,800/month | CLP 810,000-2,520,000/month | Faster content production, external expert review, support/reporting help, provider contingencies. |
| One-time setup cash | $3,000-$12,000 | CLP 2,700,000-10,800,000 | Stronger legal/payment setup, sales assets, accelerated L1/M2 creation, M1 expansion support. |
| Optional external help | $1,000-$4,000/month | CLP 900,000-3,600,000/month | Paid content writers/reviewers/tutor support. |
| Owner/Mauricio time if monetized | $700-$2,500/month equivalent | CLP 630,000-2,250,000/month | Lower than A/B only if external help genuinely absorbs work. |

Scenario C buys speed and risk reduction. It is not required for first sales-ready beta, but it may be justified if calendar pressure is higher than cash pressure.

### Scenario D - With limited Abacus subscription

| Cost type | Estimate USD | Estimate CLP | Notes |
|---|---:|---:|---|
| Abacus Basic | $10/month after first month | CLP 9,000/month | Public page shows Basic with 20,000 credits/month; first month discount may exist but should not drive decision. |
| Abacus Pro | $20/month | CLP 18,000/month | Public page shows Pro with 30,000 credits/month and broader agent/coding access. |
| Extra credits/overage | Not budgeted | Not budgeted | Must be explicitly blocked unless Mauricio approves. |
| Recommendation | $0 base-path spend | CLP 0 | Do not buy now for base path. |

Limited Abacus cost is not the issue; dependency, access, and credit unpredictability are the issue. The bottlenecks are content/scope/ops/legal/payment, not Abacus-only capabilities.

## 8. Human time budget

Assumptions:

- Weekly per-student time includes review, next-step selection, support, and light reporting.
- Fixed weekly time includes operations, reconciliation, content planning, bug triage, and support monitoring.
- Content estimates are per registry-backed activity or equivalent guided task, including item writing, answer key, rationale, mapping, and QA.

| Work unit | Scenario A | Scenario B | Scenario C |
|---|---:|---:|---:|
| Setup hours before first paid/sales-ready beta | 100-220 hrs | 140-320 hrs | 180-450 hrs |
| Weekly fixed operating hours | 5-12 hrs/week | 8-18 hrs/week | 10-25 hrs/week |
| Weekly hours per student | 0.75-2.0 hrs/student | 0.5-1.5 hrs/student | 0.4-1.2 hrs/student |
| Onboarding time per student | 1-3 hrs | 0.75-2 hrs | 0.5-1.5 hrs |
| Payment/access reconciliation per student/month | 0.25-0.75 hrs | 0.15-0.5 hrs | 0.1-0.3 hrs |
| Monthly reporting per student | 0.5-1.5 hrs | 0.4-1.2 hrs | 0.3-1.0 hrs |
| L1 activity production | 3-8 hrs/activity | 2.5-7 hrs/activity | 2-6 hrs/activity with help |
| M1 activity production | 2-5 hrs/activity | 1.5-4 hrs/activity | 1.2-3.5 hrs/activity with help |
| M2 activity production | 3-8 hrs/activity | 2.5-7 hrs/activity | 2-6 hrs/activity with help |
| Legal/original text policy for L1 | 8-25 hrs | 8-20 hrs plus review | 6-16 hrs plus paid review |
| Route definition per program | 12-35 hrs | 15-40 hrs | 12-35 hrs with external support |

Program route production effort:

| Program | Minimum beta route effort | Main reason |
|---|---:|---|
| L1 | 60-180 hrs before responsible sales | Starts from current `NOT_READY`; text legality/originality, reading passage quality, and review rubric add friction. |
| M1 | 40-120 hrs to move from partial short path to first sustained route | Existing assets reduce effort, but sustained coverage beyond AS1/PE1 is still missing. |
| M2 | 70-220 hrs before responsible Plan Complete sales | Current route/content is near zero and prerequisite policy must be defined. |

Owner-time warning:

```text
If Mauricio carries content creation, tutoring, onboarding, payment reconciliation, support, and reporting alone, the beta can become unsustainable even when monthly cash cost is low.
```

For example, 10 students at 1 hour/student/week plus 10 fixed hours/week is already about 20 hours/week before new content production.

## 9. Cost drivers and blockers

Biggest budget drivers:

- L1 content because of text/legal/originality/review.
- M2 content because it starts near zero.
- M1 expansion beyond the current short path.
- Tutor/admin weekly review over several months.
- Payment/legal/support setup.
- Provider paid tier only if commercial use, traffic, support, data confidence, or usage requires it.

Blockers to final budget:

- number of students;
- target monthly price;
- Plan Base vs Plan Complete mix;
- whether beta is paid, prepaid, discounted, or free;
- weekly review minutes per student;
- content volume target per month;
- payment provider decision;
- legal/privacy/consent/refund requirements;
- whether students are minors and whether apoderado consent is required;
- whether owner time is valued;
- whether external tutor/content reviewer is paid;
- whether staging starts free or paid;
- whether domain email is required before sales;
- whether internal pilot narrows the offer.

## 10. Abacus decision

Decision:

```text
ABACUS_NOT_RECOMMENDED_FOR_BASE_PATH
```

Rationale:

- Current base stack is sufficient for the normal path: Mauricio + ChatGPT/Codex + GitHub + Vercel/Neon.
- Abacus is blocked/unavailable in current repo context and must not become a deploy or custody dependency.
- Prior Abacus development created variable credit-cost risk.
- Limited subscription without extra credits still does not solve the core bottlenecks.
- The core bottlenecks are content/scope/ops/legal/payment and sustained human operation, not Abacus-only capabilities.
- Tactical use is acceptable only if a specific narrow missing capability appears, access is restored, no deploy/data dependency is introduced, and extra credits are blocked unless explicitly approved.

## 11. Decision recommendations

Should we buy Abacus limited subscription now?

```text
No.
```

Do not buy Abacus for the base path. Reconsider only as `ABACUS_OPTIONAL_TACTICAL` for one defined task with a one-cycle stop rule.

Should we continue with current stack?

```text
Yes.
```

Continue with Mauricio + ChatGPT/Codex + GitHub + Vercel/Neon as the recommended base stack.

Should we proceed to Vercel/Neon provider setup?

```text
Yes, if Mauricio is ready to perform manual provider setup with the DEPLOY-4 checklist and no secrets printed.
```

Provider setup is on the critical path because sales-ready requires real staging, auth/admin/student smoke, and DB target clarity.

Should we finalize pricing now?

```text
No.
```

Pricing should not be finalized until student count, Plan Base/Complete mix, content volume, review cadence, beta duration, and payment/legal support choices are known.

Should we produce a final budget now?

```text
No.
```

This scenario estimate is ready, but final budget remains `NEEDS_INPUT`.

Inputs needed next:

- expected first beta cohort size and maximum cohort cap;
- target beta duration and whether any "until December" promise is made;
- Plan Base and Plan Complete intended price bands;
- expected Plan Base/Complete student mix;
- weekly review promise per student;
- content activity count target for 7-day entry, first month, and sustained months;
- whether Mauricio time is treated as zero cash only or monetized cost;
- preferred payment path: manual transfer, Flow, Transbank/Webpay, Mercado Pago, or other;
- legal review level for minors/apoderados, privacy, consent, refund, cancellation;
- whether paid external content/review help is allowed.

## 12. Suggested next phase

Recommended next phase:

```text
MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon provider setup execution
```

Reason:

- SCOPE-2 critical path starts with staging.
- Budget scenario work confirms provider cash cost is not the dominant risk for a small beta.
- Sales-ready cannot be validated on local-only assumptions.
- Provider setup can proceed without committing to final Plan Base/Complete price.
- It preserves the non-Abacus base path and moves the project toward auth/admin/student smoke verification.

Follow-on phases should still include `MVP-BETA-BUDGET-2 - Budget inputs questionnaire and pricing assumptions`, `MVP-BETA-SCOPE-3 - Define L1 minimum beta route`, and `MVP-BETA-SCOPE-4 - Define M2 minimum beta route`.

## 13. Final budget verdict

```text
Budget estimate state: SCENARIO_ESTIMATE_READY / NEEDS_INPUT
Cash-cost risk: MODERATE
Owner-time risk: HIGH
Content-cost risk: HIGH
Abacus decision: ABACUS_NOT_RECOMMENDED_FOR_BASE_PATH
Recommended base stack: Mauricio + ChatGPT/Codex + GitHub + Vercel/Neon
Next phase: MVP-DEPLOY-INDEPENDENCE-5 - Vercel + Neon provider setup execution
```

Interpretation:

- `SCENARIO_ESTIMATE_READY`: this phase produced usable budget ranges for decision support.
- `NEEDS_INPUT`: final budget and sales pricing are still blocked by unresolved business/operating assumptions.
- Cash-cost risk is `MODERATE`, not because hosting is expensive, but because legal/payment/content/review support can become necessary.
- Owner-time and content-cost risks are `HIGH`; they are the true constraints for a sustained L1/M1/M2 beta.

## 14. Explicit non-actions

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
- make PAES score, theta, mastery, automatic diagnosis, or adaptive AI claims.
