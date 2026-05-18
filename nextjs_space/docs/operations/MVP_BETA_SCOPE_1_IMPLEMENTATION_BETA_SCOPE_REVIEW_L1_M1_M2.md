# MVP-BETA-SCOPE-1 - Implementation beta scope review for L1/M1/M2

Date: 2026-05-18

## 1. Phase purpose

This phase reviews the true MVP beta scope after clarifying that the beta is a sustained implementation beta across PAES L1, M1, and M2, not merely a 7-day operational demo.

The review is documentation-only. It defines what "sales-ready" should mean before receiving paying or serious beta students into several months of guided PAES tutoring support.

No code, runtime behavior, schema, UI, API, database, provider setup, deploy, `.env` value, or secret is changed or inspected by this phase.

## 2. Live baseline

Git preflight before this phase showed:

- `git status --short`: clean output.
- HEAD = origin/main = `9528305`.
- Last accepted commit = `MVP-DEPLOY-INDEPENDENCE-4: document Vercel Neon setup checklist`.
- Working tree expected clean before this documentation phase.

Git preflight remains the live truth. Several local and external documents contain older baselines, including `d8702a7`, `a5d657a`, `ff410af`, and earlier SRA/FL/FK references. Those are useful historical context only where they are not contradicted by current Git and recent repo docs.

## 3. Source map reviewed

### Primary scope docs

- `PHASE_LOG.md` - phase ledger; confirms latest accepted deploy-independence sequence and older L1/M2 fixture/history notes.
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md` - current M1 handoff; says Git preflight wins, M1 AS1 is operationally validated, PE1 exists as bridge, and older L1/M2 assumptions are stale unless later confirmed.
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md` - canonical M1 documentation map; confirms M1 first, no L1/M2 replication as current mature implementation.
- `nextjs_space/docs/operations/MVP_STUDENT_REQ_1_STUDENT_EXPERIENCE_TRIAGE.md` - important product-stage triage; older immediate MVP-Beta definition was M1-only and 2-4 weeks, now superseded by corrected sustained L1/M1/M2 business context.
- User-provided "Documento de retorno - Evaluacion de roadmap hacia MVP E360 / Bexauri" - useful strategic framing for MVP launch spine, but contains an older baseline and Abacus framing that conflict with current Git/repo deploy-independence docs.

### Student experience docs

- `MVP_LOCAL_1_GUIDED_MVP_OPERATING_SLICE.md` - defines guided PAES M1 weekly learning-regulation MVP slice and current M1 capabilities.
- `PAES_M1_FOLLOW_UP_TASK_AND_IN_APP_REQUIREMENTS_FL_CONTENT_2.md` - documents why external students were not yet ready in that phase and lists minimum in-app StudyLoad requirements.
- `MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md` - earlier student journey context, including feedback requirements across math and language.
- `BETA_LAUNCH_PROTOCOL_FK.md` - historical controlled beta launch protocol for 2-5 students and 1-2 weeks; useful operational pattern, not sufficient for sustained implementation beta.

### Content/roadmap docs

- `PAES_M1_SOURCE_REGISTER.md` - official/expert source register for M1; warns against score claims and treating internal roadmap as official before mapping/review.
- `MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md` through `MVP_CONTENT_10C_CURATE_BALANCED_ENTRY_FIRST_STUDYLOAD.md` - M1 content history and balanced-entry work.
- `PAES_M1_FIRST_BETA_TASK_FL_CONTENT_1.md` - first real M1 pedagogical task content.
- `PAES_M1_FOLLOW_UP_TASK_AND_IN_APP_REQUIREMENTS_FL_CONTENT_2.md` - second M1 task and in-app requirements.
- `FL_UX_4D_CONTENT_REGISTRY_EXPANSION_STRATEGY.md` - M1-first content expansion; L1 pilot deferred; M2 explicitly deferred.

### SRA/flow docs

- `MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md` - target M1 tutoring scope as guided, evidence-aware roadmap traversal.
- `MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md` - non-blocking student journey and decision patterns.
- `MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md` - human/operator model; review is parallel, not default gate.
- `MVP_FLOW_4_E5M_M1_LOCAL_PATH_VALIDATION_AND_CONTENT_ALIGNMENT.md` - validated local M1 path through algebra/functions and transitional 8-item content caveat.
- `MVP_SRA_ROADMAP_2B_*`, `2C`, `2D`, `2E`, `2F`, `2G` - M1 source/taxonomy/decision-record/expert-review foundation.

### Deploy/infrastructure docs

- `MVP_DEPLOY_INDEPENDENCE_1_NON_ABACUS_DEPLOYMENT_PATH_READINESS.md` - Abacus unavailable/blocked; non-Abacus deploy path needed.
- `MVP_DEPLOY_INDEPENDENCE_2_PROVIDER_SELECTION_AND_DEPLOYMENT_ARCHITECTURE_DECISION.md` - Vercel + Neon selected for staging/beta architecture planning.
- `MVP_DEPLOY_INDEPENDENCE_3_ENVIRONMENT_VARIABLE_INVENTORY_AND_SECRET_HANDLING_CHECKLIST.md` - secret-handling checklist by variable name only.
- `MVP_DEPLOY_INDEPENDENCE_4_VERCEL_NEON_STAGING_SETUP_CHECKLIST.md` - future manual provider setup checklist; no deploy/provider setup yet.

### L1-specific docs

- `FL_UX_10_B1_SECOND_STUDENT_CANDIDATE_STATE_AUDIT.md` - Bruno Beta-L1 blocked by zero PAES_L1 registry activities and stale legacy cycle.
- `FL_UX_10_B2_ANA_SECOND_STUDENT_CLEANUP_TRANSITION_PLAN.md` - keeps Bruno/L1 blocked until registry content exists.
- `MINIMAL_BETA_DATA_RECONSTRUCTION_PLAN_DATA_BETA_0.md` - historical plan noting L1 needed at least one axis/skill before fixture enrollment.
- `BETA_LAUNCH_PROTOCOL_FK.md` - listed L1 as optional controlled beta target, but this was before later registry-readiness findings.

### M1-specific docs

- `MVP_LOCAL_1_GUIDED_MVP_OPERATING_SLICE.md` - identifies current guided MVP slice as PAES_M1.
- `MVP_FLOW_4_E5M_M1_LOCAL_PATH_VALIDATION_AND_CONTENT_ALIGNMENT.md` - validates first local M1 path operationally.
- `PAES_M1_SOURCE_REGISTER.md` - source register and warnings for M1 roadmap/content.
- `PAES_M1_FIRST_BETA_TASK_FL_CONTENT_1.md` and `PAES_M1_FOLLOW_UP_TASK_AND_IN_APP_REQUIREMENTS_FL_CONTENT_2.md` - concrete M1 task content.
- `MVP_SRA_SCOPE_*` and `MVP_SRA_ROADMAP_*` - M1 pedagogical decision layer, scope, roadmap, metadata, PE1 bridge, and expert-review package.

### M2-specific docs

- `MINIMAL_BETA_DATA_RECONSTRUCTION_PLAN_DATA_BETA_0.md` - notes PAES_M2 program exists but required axes/skills/content before activation.
- `BETA_LAUNCH_PROTOCOL_FK.md` - says M2 only if operationally simple and has no axes/skills seeded in that historical context.
- `FL_UX_4D_CONTENT_REGISTRY_EXPANSION_STRATEGY.md` - M2 explicitly deferred and requiring separate scoping.
- No current M2 roadmap, content registry, source register, or sustained tutoring scope doc was found in the repo.

### External master documentation reviewed

External docs root reviewed:

- `G:\Mi unidad\YO 2026\E360\E360_System`

Active strategic sources reviewed:

- `01_Documentacion_Maestra/README_MASTER.md` - declares master documentation structure and expected program folders `PAES_L1`, `PAES_M1`, `PAES_M2`.
- `01_Documentacion_Maestra/E360_Estrategia_y_Vision_Negocio_V2_0.md` - active strategic vision; PAES priority for 6-12 months, L1/M1/M2 offer structure, subscription + upsells.
- `01_Documentacion_Maestra/E360_PRODUCT_STRATEGY_v2.1.md` - product strategy; L1, M1, M2 are first 6-12 month priority, monthly subscription model, Plan Base L1+M1 and Plan Complete L1+M1+M2.
- `01_Documentacion_Maestra/E360_SYSTEM_BLUEPRINT_v2.1.md` - system blueprint; student-program instance is core; platform should operate L1/M1/M2 in one reusable system; M1 is technical anchor, L1 commercial accompaniment, M2 optional early.
- `01_Documentacion_Maestra/E360_PAES_LAUNCH_STRATEGY_v2.1.md` - PAES launch strategy; controlled real launch, Plan Base L1+M1, Plan Complete L1+M1+M2, validate commercial/pedagogical/operational/system dimensions.
- `01_Documentacion_Maestra/E360_IMPLEMENTATION_STRATEGY_v2.1.md` - implementation strategy; M1 anchor, L1 minimum commercial component, M2 near expansion subordinated to system health.
- `01_Documentacion_Maestra/E360_OPERATING_MODEL_v2.1.md` - operating model; high automation target eventually, humans for supervision/curation/exceptions/improvement.
- `01_Documentacion_Maestra/E360_EXECUTION_ARCHITECTURE_DECISION_v1.0.md` - historical/current architecture decision originally favoring Abacus/MindStudio as accelerators, not as source of truth.
- `01_Documentacion_Maestra/AUDITORIA_ESTRATEGICA_MVP_MONETIZACION_E360_BEXAURI_ENTREGABLE_MAYO_2026.md` - strategic audit; beta paid and limited may be responsible, but initial focus was M1 and L1/M2 parity was a gap.

Historical/stale sources identified:

- `01_Documentacion_Maestra/99_HISTORICO_TRANSITORIO/**` - explicitly historical.
- `10_Archivo_Historico/**` - historical/placeholder material.
- `01_Documentacion_Maestra/90_Aperturas_de_Proceso/**` - process-opening package; useful but lower priority than active root docs.
- Older Abacus phase closures under `06_Cierres de fase/**` - historical, especially where they conflict with current non-Abacus deploy path.

Files/folders skipped or not content-ingested:

- `.docx` and `.pdf` files, including `ARRANQUE_TACTICO_CONTINUIDAD_v1.docx`, `BEXAURI_PUENTE_IMPLEMENTACION_VISUAL_v1.docx`, and blueprint/decision DOCX files. These require a separate document-ingestion phase or human-provided extraction.
- `02_Repositorio_TecnicoBackups/**`, database dumps/backups, env-like files, logs, credentials, private keys, and secret-bearing files were not read.
- `node_modules`, `.git`, `.next`, `.logs`, and env-like globs were excluded from local searches.

Key external conclusions:

- Strategic scope is confirmed: E360's PAES launch strategy includes L1, M1, and M2, with Plan Base L1+M1 and Plan Complete L1+M1+M2.
- Sustained implementation horizon is confirmed at strategy level: PAES is the priority for the next 6-12 months.
- Monetization direction is confirmed at strategy level: recurring subscription plus upsells/credits, but current implementation does not yet support automated subscription/payment.
- Abacus was once preferred as an execution accelerator, but current repo docs override that for implementation/deploy reality: Abacus is blocked/unavailable and Vercel/Neon is the selected non-Abacus path.

Documentation conflicts:

- External strategy says L1/M1/M2 are the commercial PAES launch scope; current repo implementation readiness is M1-heavy, L1 blocked by content registry gap, and M2 lacks scope/content.
- Older repo beta docs describe short 1-2 week or 2-4 week pilots; corrected business context requires sustained implementation beta potentially through December.
- User-provided roadmap return document cites baseline `d8702a7` and Abacus operation; live Git baseline is `9528305` and current deploy path is Vercel/Neon planning.

## 4. Corrected MVP beta definition

MVP beta sales-ready means:

> A published, paid or pre-paid, guided implementation beta where selected students can receive sustained PAES tutoring support across L1, M1, and/or M2 for several months, with human supervision, minimum viable in-app study flow, evidence capture, admin/tutor operation, payment/access handling, and honest limits.

Sales-ready does not mean "a 7-day demo" or "the app can be shown." It means the team can responsibly onboard serious beta students into a guided tutoring implementation and keep supporting them over time without data loss, unclear access, unsupported program promises, or untraceable pedagogical decisions.

Differences:

- 7-day trial/sales entry: a possible commercial entry point to test fit and willingness to pay. It must not be confused with the duration of the tutoring promise.
- Sustained implementation beta: several months of guided tutoring support with weekly cadence, evidence, review, continuity, support, and limits.
- MVP-Alfa: a later, more productized MVP with reduced manual friction, better onboarding, broader content, stronger feedback, and more repeatability.
- Post-MVP: autonomous adaptation, AI agents, score/theta/mastery models, large-scale analytics, parent dashboards, native mobile, and broad automation.

## 5. Current state assessment

| Dimension | Status | Assessment |
|---|---|---|
| App/infrastructure readiness | PARTIAL | Local/GitHub custody is strong; non-Abacus deploy path is selected but provider setup/deploy not done. |
| Student experience readiness | PARTIAL | `/now`, interactive M1 StudyLoad flow, MC submission, and self-report are documented as working/validated, but sustained onboarding, multi-program clarity, and unassisted beta UX remain incomplete. |
| Admin/tutor operations readiness | PARTIAL | Admin evidence review and beta-operations surfaces exist for small guided operation; sustained multi-month tutor operations, capacity limits, and support cadence need definition. |
| PAES M1 content/readiness | PARTIAL | Best-developed program: 4 registry activities, AS1 path, PE1 bridge, source/register docs. Not enough for 6 months or full PAES claims. |
| PAES L1 content/readiness | NOT_READY | Strategic need confirmed, but repo finds zero current PAES_L1 registry activities and Bruno/L1 blocked. Needs scope and content definition. |
| PAES M2 content/readiness | NOT_READY | Strategic need confirmed, but no current M2 roadmap/content/scope found; historical docs defer M2. |
| SRA/continuity readiness | PARTIAL | Conceptual SRA scope is strong for M1; operational continuity exists but decision-record/runtime maturity and multi-program generalization are incomplete. |
| Trial/access readiness | PARTIAL | Trial can be manual; no polished sales entry or access workflow documented for sustained paid beta. |
| Subscription/payment readiness | NOT_READY | Strategy says subscription + upsells, but repo beta docs treat payments as out of scope/manual; no provider/integration chosen. |
| Legal/privacy/support readiness | NOT_READY | Data/privacy guardrails exist, but terms, consent, refund/cancelation, support policy, and minors/apoderado handling are not complete. |
| Deployment readiness | PARTIAL | Vercel/Neon path selected and setup checklist documented; no provider setup, staging deploy, or smoke verification yet. |
| Monitoring/rollback/readiness | PARTIAL | Git/PHASE_LOG discipline strong; deploy rollback and DB backup policy need staging execution and verification. |

## 6. Program-specific scope: L1

Docs found:

- External active strategy confirms Competencia Lectora L1 as part of first 6-12 month PAES priority and Plan Base L1+M1.
- Repo historical fixture docs created minimal L1 taxonomy/tasks, but later audit says current registry has zero PAES_L1 activities.
- `FL_UX_10_B1` explicitly blocks Bruno Beta-L1 because no registry-matched PAES_L1 content exists.

Already implemented/documented:

- PAES_L1 program appears in data/program context.
- Some historical/legacy L1 loads and test fixture records exist.
- No current registry-backed L1 activity was confirmed.
- No L1 source register, roadmap, official taxonomy mapping, or sustained tutoring scope doc was found.

Minimum 6-month guided beta path requires:

- L1 scope definition based on official PAES Competencia Lectora sources.
- L1 axis/skill taxonomy and registry-backed activity model.
- Minimum route covering reading comprehension skills over several months, not isolated tasks.
- Original or legally usable texts, answer keys, explanation standards, and evidence model.
- Admin/tutor review rubric for L1 evidence: explicit information, inference, purpose, structure, vocabulary/context, argument/text organization as applicable.
- Student-facing L1 activity viewer fit for text length, citations/excerpts, and evidence-based feedback.

Minimum 7-day entry/trial path requires:

- At least one safe registry-backed L1 activity with original/legal text.
- Clear onboarding that says this is a guided beta entry, not full L1 coverage.
- Evidence capture beyond self-report.
- Admin view of answers and self-report.

Content/activity requirements:

- Original or licensed reading passages.
- Multiple-choice items or short structured responses with rationale.
- Skills mapped to official scope.
- Text-level evidence requirements.
- Difficulty bands and progression plan.

Evidence requirements:

- Item responses.
- Self-report.
- Passage/item mapping.
- Admin-readable answer key and rationale.
- Notes for inference vs explicit retrieval errors.

Admin/tutor requirements:

- L1 review rubric.
- Content QA/copyright checklist.
- Weekly route decision rules.
- Support script for reading difficulties and task confusion.

Gaps:

- `NEEDS_SCOPE_DEFINITION`.
- No active registry content.
- No confirmed L1 roadmap/source register.
- No sustained 6-month content plan.
- No legal/copyright pathway for texts.

L1 status: `NOT_READY`.

## 7. Program-specific scope: M1

What exists now:

- PAES_M1 is the technical and pedagogical anchor.
- Registry-backed activities exist for equations, word problems, reinforcement, and linear functions.
- PE1 data/table/graph bridge exists as final AS1 bridge according to current handoff/index.
- SRA scope docs define guided evidence-aware roadmap traversal.
- Source register, official inventory, taxonomy mapping, expert review package, and metadata/decision-record proposals exist.

What has been validated locally:

- A local end-to-end M1 path:
  - balanced entry;
  - linear equations basic;
  - linear equation word problems;
  - reinforcement;
  - linear functions;
  - final `/now` state.
- Student can answer, submit, self-report, complete, and see refreshed `/now`.
- Admin evidence/read-only pedagogy context has been documented.

PE1 bridge status:

- Current handoff/index say PE1 registry activity exists and is connected only as the final AS1 bridge.
- Full local UI/API PE1 bridge verification passed according to current handoff/index.
- PE1 is not a broad data/probability route or full non-algebra pathway.

AS1 status:

- Operationally validated and useful.
- Metadata-constrained.
- Expert-review pending.
- Not universal and not the full M1 roadmap.

Route/content strengths:

- Strongest current program.
- Real StudyLoad activity content exists.
- Admin/student loop has been exercised.
- SRA docs have rich decision patterns and guardrails.

Missing for 6-month sustained tutoring:

- Broader M1 coverage across Numbers, Algebra/functions, Geometry, Probability/statistics.
- More registry-backed activities and progression options.
- Expert review of roadmap, sequence, item representativeness, difficulty, and decision policy.
- Stable weekly operation protocol for multiple students over months.
- Student progress reporting without PAES score/mastery claims.
- Clear content production cadence.

Missing for sales-ready:

- Staging deploy and stable DB/auth/admin setup.
- Payment/access handling.
- Support/legal/privacy terms.
- Minimum 6-month content route and fallback policy.
- Explicit capacity limit and operator time budget.
- Honest sales copy and onboarding.

Gaps:

- M1 is `PARTIAL`, not fully sales-ready for several months.
- Current content can support a constrained pilot, not a sustained implementation beta alone.

M1 status: `PARTIAL`.

## 8. Program-specific scope: M2

Docs found:

- External active strategy confirms M2 as part of Plan Complete and near/controlled expansion.
- Repo docs mention PAES_M2 program existence and historical optional fixture, but M2 was deferred.
- No current M2 source register, roadmap, official taxonomy, content registry, activity set, or sustained scope document was found.

Already implemented/documented:

- PAES_M2 appears as a program concept.
- Historical docs say M2 had no axes/skills seeded at that time and was skipped/deferred.
- No confirmed M2 registry-backed activity exists.

Minimum 6-month guided beta path requires:

- M2 scope definition from official PAES M2 sources.
- Program taxonomy and skill dependencies.
- Minimum route for students taking M2, likely more advanced math topics and different prerequisites than M1.
- Content map, registry-backed activities, answer keys, difficulty bands, and review rubrics.
- Decision rules distinguishing M1 support vs M2 extension/remediation.

Minimum 7-day entry/trial path requires:

- At least one M2 registry-backed activity.
- Clear promise that M2 beta is limited/provisional unless full path exists.
- Admin review rubric and evidence capture.

Content/activity requirements:

- M2-specific items, not reused M1 items unless explicitly positioned as prerequisite repair.
- Official-source mapping.
- Higher-level math representation support.
- Tutor/admin content QA.

Evidence requirements:

- Item responses.
- Self-report.
- Correctness/rationale.
- Taxonomy and prerequisite mapping.

Admin/tutor requirements:

- M2-qualified review guidance.
- Decision policy for students who need M1 prerequisite repair before M2 progression.
- Clear escalation/support path.

Gaps:

- `NEEDS_SCOPE_DEFINITION`.
- No M2 content path found.
- No M2 operational validation found.
- No M2 legal/source/content production plan found.

M2 status: `NOT_READY`.

## 9. Sales-ready implementation beta macro stages

| Stage | Purpose | Must-have outputs | Manual at beta? | Risk if skipped | Dependency | Effort |
|---|---|---|---|---|---|---|
| 1. Non-Abacus staging deployment | Put current app on controlled staging URL. | Vercel app, Neon staging DB, env names configured, no secrets exposed. | No | Local-only beta cannot validate real access/reliability. | Deploy independence docs, provider setup. | M |
| 2. Staging DB/auth/admin setup | Ensure safe access and admin operation. | Admin account path, `ADMIN_EMAILS`, auth smoke check, minimal data policy. | Partly | Students/admins blocked or data target unclear. | Stage 1. | M |
| 3. L1 minimum beta route | Make L1 real, not just strategic. | L1 scope, first route, registry activities, review rubric, text/copyright policy. | Content curation yes; registry route no | Plan Base promise fails. | Source definition. | L |
| 4. M1 minimum beta route expansion | Extend beyond 4 activities toward sustained support. | 6-month route map, broader axes, expert review plan, weekly cadence. | Some route decisions yes | M1 students exhaust content quickly. | Current M1 assets. | L |
| 5. M2 minimum beta route | Enable Plan Complete responsibly. | M2 scope, source register, first route, registry activities. | Content curation yes; scope/content no | M2 cannot be sold honestly. | Source definition. | L/XL |
| 6. Multi-program enrollment/access model | Let one student have L1/M1/M2 access correctly. | Access policy, plan-to-program mapping, admin assignment flow. | Assignment can be manual | Wrong access, confused students, broken plan promises. | L1/M2 minimum definitions. | M |
| 7. Sustained tutoring operations model | Operate for months without chaos. | Weekly protocol, review cadence, support path, operator time budget, escalation. | Yes, for small cohort | Owner overload and inconsistent tutoring. | Program routes. | M |
| 8. Trial/sales-entry model | Separate 7-day entry from long beta. | Trial promise, conversion flow, onboarding copy, stop/refund rules. | Yes | Trial misrepresents sustained beta. | Offer definition. | S/M |
| 9. Subscription/payment model | Handle paid/pre-paid students. | Price, payment provider/manual process, reconciliation, access policy. | Yes for small cohort | Payment/access confusion, refund disputes. | Offer/legal. | M |
| 10. Legal/privacy/terms/support | Protect students, families, and project. | Terms, privacy, consent, cancellation/refund, support channel. | No for baseline docs; legal review can be light | Trust and compliance risk. | Offer/payment. | M |
| 11. Landing/pricing/onboarding | Explain offer honestly. | Landing or sales page, plan labels, beta limits, onboarding steps. | Some can be manual | Overpromising or poor conversion. | Definition of plans. | M |
| 12. Internal pilot across L1/M1/M2 | Validate real operation before sales. | Test students, evidence, admin review, go/no-go report. | Yes | Paid users become first testers for basic flow. | Staging and content. | M |
| 13. Sales-ready go/no-go | Final acceptance gate. | Checklist signed: deploy, content, support, payment, legal, no false claims. | No | Premature sales. | All prior stages. | S |

## 10. What can remain manual in MVP beta

Can remain manual/human-assisted for a small beta:

- Student onboarding and access assignment.
- Payment reconciliation and subscription status tracking, if cohort is small and policy is explicit.
- Program assignment by admin/tutor.
- Weekly evidence review.
- Cycle decisions and route choices.
- Content curation and next-load selection.
- Student/apoderado support.
- Refund/cancelation handling.
- Beta feedback collection.
- Admin corrections through approved UI/API only.

Should not remain manual because it risks chaos or student harm:

- Secret handling.
- Direct database edits as normal operation.
- Remembering who has paid/access without any ledger.
- Deciding next steps with no evidence record.
- Losing student work or relying only on WhatsApp for evidence.
- Creating copyrighted L1 text content ad hoc without review.
- Promising adaptive/score/mastery outcomes manually.
- Running production/staging without rollback/backup clarity.

## 11. What must be stable before sales

Non-negotiables before receiving paying or serious beta students:

- Login works for student and admin.
- Student can see what to do now.
- Student can open, answer/complete, and submit evidence/self-report.
- Evidence saves reliably.
- Admin can inspect evidence.
- Admin can record or document the pedagogical decision.
- Program access is correct for L1/M1/M2 plans.
- Data is not lost during normal operation.
- Staging/beta deployment is stable enough for the cohort.
- Support path exists.
- Refund/cancelation policy exists.
- Basic privacy/terms/consent exist.
- Payment/access path is clear.
- No false PAES score, theta, mastery, automatic diagnosis, full coverage, or adaptive AI claims.

## 12. Budget-relevant findings

Do not produce a final budget yet. The docs are insufficient for rigorous budget estimation because student count, price, tutor time, content production pace, legal needs, and payment/provider choices are unresolved.

Budget drivers:

| Driver | Classification | Notes |
|---|---|---|
| Hosting/database | Must-have recurring | Vercel/Neon selected for planning; actual tier depends on commercial/staging use. |
| Domain/email | Must-have recurring | Needed for sales trust and operational communication if public-facing. |
| Payments/provider fees | Must-have recurring or manual early | Can be manual for small beta, but fees/process must be defined. |
| Content creation L1/M1/M2 | Must-have one-time + recurring | Major cost driver; L1/M2 need scope/content from near-zero. |
| Human tutoring/review time | Must-have recurring | Owner-operated vs paid tutor is unknown and budget-critical. |
| Support | Must-have recurring | Can be owner-operated initially, but time budget needed. |
| Legal templates/review | Must-have one-time | Privacy, terms, consent, refund/cancelation; minors/apoderado may matter. |
| ChatGPT/Codex | Must-have recurring | Current development/documentation workflow depends on it. |
| Optional Abacus | Optional/deferable | Current repo says Abacus is blocked/unavailable and not required for normal path. |
| Marketing/landing | Must-have one-time/recurring | Needed before sales, can start simple. |
| Email delivery/notifications | Deferable initially | Manual communication can work for small beta; provider needed if automated. |

## 13. Abacus decision implications

Current documentation supports:

- Current stack is sufficient for normal development and deploy path planning: Mauricio + ChatGPT/Codex + GitHub + Vercel/Neon.
- Abacus is not required for the normal development/deploy path.
- Abacus is not active because the account/dashboard path is blocked/unavailable in current repo docs.
- Abacus was historically considered an accelerator and appears in older external strategy, but current repo reality overrides it for implementation/deploy truth.
- Abacus could be optional tactical only if a very specific missing capability appears and access/budget are restored.

Preliminary Abacus decision:

```text
OPTIONAL_TACTICAL
```

Not recommended as a dependency for MVP beta sales-ready path.

## 14. Open questions before final budget

- How many students are expected in the implementation beta?
- Will beta be paid, pre-paid, discounted, free, or mixed?
- What price model is desired for Plan Base and Plan Complete?
- Is tutor/operator time owner-operated or paid?
- How many weekly review minutes per student are acceptable?
- How many months must be promised explicitly?
- Is "until December" a formal promise or planning horizon?
- What is the content production pace for L1, M1, and M2?
- Who validates L1 and M2 pedagogy?
- Do L1/M2 external source docs exist outside the repo?
- What payment provider or manual process will be used?
- What refund/cancelation policy applies?
- What legal/privacy/consent review is required?
- Is email delivery required before sales?
- What support channel is official: email, WhatsApp, phone, in-app, or manual?
- Does staging start first, or will the beta use production directly after staging passes?
- Must old Abacus data be preserved?
- Are the old L1/M2 test fixtures disposable?
- What minimum reporting does a student/apoderado expect monthly?
- What exact sales claims are allowed?

## 15. Recommended next phase

Recommended next phase:

```text
MVP-BETA-SCOPE-2 - Define sales-ready implementation beta acceptance criteria and macro roadmap
```

Rationale:

- Strategic scope is confirmed for L1/M1/M2.
- Implementation state is partial and uneven: M1 has a working base; L1/M2 need scope/content definition.
- Before estimating budget or implementing, the team needs a single acceptance-criteria document that reconciles the corrected sustained beta promise with current implementation reality.

Within that phase, include explicit subtracks:

- L1 minimum beta scope definition.
- M2 minimum beta scope definition.
- M1 sustained route expansion.
- Sales-ready go/no-go checklist.
- Budget input questionnaire.

## 16. Combined verdict

```text
Scope review verdict: SCOPE_REVIEW_PARTIAL_NEEDS_L1_M2_SOURCE
Strategic scope: STRATEGIC_SCOPE_CONFIRMED
Implementation state: PARTIAL
Documentation conflicts: YES
L1 scope: L1_SCOPE_NEEDS_DEFINITION
M2 scope: M2_SCOPE_NEEDS_DEFINITION
Budget readiness: BUDGET_NEEDS_INPUT
Abacus decision preliminary: OPTIONAL_TACTICAL
```

Program statuses:

- L1 status: `NOT_READY`
- M1 status: `PARTIAL`
- M2 status: `NOT_READY`

Budget readiness:

- `NEEDS_INPUT`

## 17. Explicit non-actions

This phase did not:

- change code;
- change runtime behavior;
- change UI/API/schema;
- mutate any database;
- run migrations;
- run Prisma db push/reset;
- deploy;
- configure providers;
- inspect `.env` values;
- print secrets;
- generate PDF/DOCX;
- make PAES score, theta, mastery, automatic diagnosis, or adaptive AI claims.
