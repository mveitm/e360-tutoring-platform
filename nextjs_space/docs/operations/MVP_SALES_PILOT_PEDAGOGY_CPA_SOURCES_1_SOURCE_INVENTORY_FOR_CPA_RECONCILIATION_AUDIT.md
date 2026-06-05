# MVP-SALES-PILOT-PEDAGOGY-CPA-SOURCES-1 - Source Inventory for CPA Reconciliation Audit

Continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Executive summary

This document prepares the source inventory for a future PRO audit of the Capa Pedagogica Actual (CPA) against the current pedagogical direction of Bexauri.

The phase is inventory-only. It does not audit, reconcile, derive BPCPv1, implement continuity, modify app behavior, execute capsules, inspect secrets, run DB actions, or copy external source documents into the repo.

The CPA is treated as a distributed reality. It lives in canonical pedagogical documents, historical E360/Bexauri decisions, SRA/LearningCycle/StudyLoad documentation, current student UI circuit docs, live code surfaces, content registry behavior, evidence/feedback/continuity implementation points, and authorized local/external master sources.

Expected result:

```text
CPA_RECONCILIATION_AUDIT_SOURCE_INVENTORY_PREPARED
```

## Scope and safety boundaries

Allowed in this phase:

- inventory repo documents;
- inventory live code sources read-only;
- inventory authorized external/local document roots without copying documents;
- classify sources by priority, type, and staleness;
- create this inventory document;
- update documentation handoff/index/log files.

Forbidden in this phase:

- app code changes;
- DB/base de datos;
- schema;
- migrations;
- auth;
- credentials;
- login;
- `/now` implementation;
- Study Page implementation;
- Capsule execution;
- responses;
- submit;
- self-report;
- completion;
- StudentAccess lifecycle;
- checkout;
- real payment;
- real trial;
- complete functional subscription;
- staging/production;
- secrets;
- external folder mutation;
- PRO audit;
- BPCPv1;
- implementation.

Sensitive exclusions:

- `.env`;
- `.env.*`;
- `*.key`;
- `*.pem`;
- secrets;
- credentials;
- tokens;
- DB URLs;
- `node_modules`;
- `.next`;
- `.git` internals except git status/log;
- logs with possible secrets;
- heavy binary artifacts except path-level inventory when safe;
- DB backups with sensitive data.

Sensitive candidates were not opened. They are classified only as `excluded_sensitive_candidate`.

## Available source roots

| Root | Status | Use in this inventory | Notes |
|---|---|---|---|
| `C:\projects\e360-tutoring-platform\tutoring_platform_mvp` | Available | Active repo source | Primary source of truth after Git preflight. |
| `C:\Projects\e360-tutoring-platform` | Available | External/local source inventory only | Contains root-level RAW pedagogical documents, E360 cycle contract files, and the active repo. Do not copy external documents in this phase. |

## Unavailable source roots, if any

| Root | Status | Treatment |
|---|---|---|
| `G:\Mi unidad\YO 2026\E360` | Unavailable / access denied at preflight | Documented as unavailable. Future PRO audit should request access or a curated source package if needed. |
| `G:\Mi unidad\YO 2026\E360\E360_System\01_Documentacion_Maestra` | Unavailable / access denied at preflight | Documented as unavailable. Likely important if it contains Mauricio's external master documentation. |

## Methodology and truth priority

Inventory method:

1. Read mandatory repo documents.
2. Search `nextjs_space/docs/operations` and `nextjs_space/docs/strategy` for SRA, LearningCycle, StudyLoad, Capsule, feedback, continuity, diagnostic, PAES_M1, MVP_CONTENT, MVP_FLOW, GOV/PRODUCT/ROADMAP, Bexauri, Estudia360, evidencia, pedagogia, item blueprint, and content registry sources.
3. Search live code read-only for CPA behavior materialized in StudyLoad, LearningCycle, CycleDecision, CycleEvaluation, SkillState, `mc_submission`, `selfReport`, feedback, continuity, `contentKey`, PAES_M1, and registry code.
4. Inventory authorized external/local roots by path and metadata only, excluding sensitive candidates.
5. Classify by priority for PRO: P0 required, P1 recommended, P2 historical/contextual, P3 optional, excluded/sensitive.
6. Classify by source type and staleness.

Priority of truth for future PRO audit:

1. Git preflight and current repo state.
2. Recent `PHASE_LOG.md`.
3. `CURRENT_AGENT_HANDOFF_MVP_M1.md`.
4. `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`.
5. BPCPI / BPTT / Blueprint M1 Integrado.
6. PRO-AUDIT-1 and SCHEDULE-1.
7. Recent operational documents.
8. Historical documents.
9. External/local documents without clear date or status.

## P0 required sources for PRO

| Source | Type | Freshness | Why it matters | Question it answers | PRO read |
|---|---|---|---|---|---|
| `PHASE_LOG.md` latest relevant entries | governance / phase ledger | Vigente with reservations | Records accepted phase sequence and latest baseline context. | What was actually accepted and when? | Full relevant tail |
| `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md` | operational handoff | Vigente with reservations | Current working handoff, but contains older sections. | What should future agents treat as current? | Full, with staleness cautions |
| `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` | context transfer | Vigente with reservations | Defines propagation rules and mandatory future context. | What must be carried into CPA audit? | Full, with staleness cautions |
| `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md` | documentation map | Vigente with reservations | Maps canonical, support, and older docs. | What docs exist and how are they positioned? | Full, with staleness cautions |
| `nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md` | governance | Vigente / canonical | Defines phase level and structural boundaries. | What must not be crossed in audit prep? | Reference |
| `nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md` | governance / product method | Vigente / canonical | Defines student-experience-led sequencing. | Why CPA must be audited by learning experience, not only code? | Reference |
| `nextjs_space/docs/operations/BEXAURI_VISUAL_STANDARD_V0_1.md` | visual/pedagogical UI standard | Vigente with reservations | Defines visible pedagogical UI expectations. | What visible UI promises should CPA support? | Reference |
| `nextjs_space/docs/operations/BPCPI_BLUEPRINT_CANONICO_CAPA_PEDAGOGICA_IDEAL.md` | canonical pedagogy | Vigente / canonical | Ideal pedagogical layer contract. | What is CPA being reconciled against at ideal level? | Full |
| `nextjs_space/docs/operations/BPTT_BLUEPRINT_PEDAGOGICO_TACTICO_TRANSVERSAL.md` | transversal tactical pedagogy | Vigente / canonical | Common grammar for all Bexauri tutoring. | What must every tutoring experience preserve? | Full |
| `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md` | M1 tactical pedagogy | Vigente / canonical | Rector contract of Gerente Pedagogico M1. | What should M1 CPA satisfy? | Full |
| `nextjs_space/docs/operations/MVP_SALES_PILOT_PRO_AUDIT_1_TOP_DOWN_UI_CIRCUIT_AUDIT.md` | PRO audit | Vigente / canonical for UI circuit reservations | Establishes "approved with reservations" and CPA-relevant debts. | What must be proven beyond navigation? | Full |
| `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_CIRCUIT_1_FIRST_STUDENT_UI_VISUAL_AND_FUNCTIONAL_CIRCUIT_CLOSEOUT.md` | UI/functional circuit closeout | Vigente with reservations | Defines accepted M1-first circuit. | What visible circuit exists now? | Full |
| `nextjs_space/docs/operations/MVP_SALES_PILOT_SCHEDULE_1_RESCHEDULE_APP_REVIEW_AND_PRIORITIZE_PEDAGOGICAL_LAYER_AUDIT.md` | direction / schedule | Vigente / canonical for review shift | Documents postponement and pedagogical focus. | Why is CPA audit prioritized before review? | Full |
| `nextjs_space/app/study/paes-m1/page.tsx` | live code | Vigente executable truth | Study Page M1, enrollment state, current/completed capsule surfaces. | What CPA is visible in Study Page? | Read-only full or targeted |
| `nextjs_space/app/now/page.tsx` | live code | Vigente executable truth | Student dashboard, current loads, progress placeholders/evidence. | What CPA is visible on dashboard? | Read-only targeted |
| `nextjs_space/app/now/study-loads/[id]/page.tsx` | live code | Vigente executable truth | Capsule viewer, review mode, content registry resolution. | How does the student see a capsule and feedback? | Read-only full or targeted |
| `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx` | live code | Vigente executable truth | Answering, feedback rendering, self-report UI, finalization trigger. | How are responses, feedback, and self-report exposed? | Read-only full or targeted |
| `nextjs_space/app/api/study-loads/[id]/responses/route.ts` | live code / API | Vigente executable truth | Creates/replaces `mc_submission`, validates `contentKey`, returns feedback. | What evidence and feedback are actually persisted/returned? | Read-only full |
| `nextjs_space/app/api/study-loads/[id]/complete/route.ts` | live code / API | Vigente executable truth | Completion, self-report persistence, best-effort continuity call. | What completion and continuity behavior exists? | Read-only full |
| `nextjs_space/lib/study-load-continuity.ts` | live code | Vigente executable truth | Existing `prepareNextStudyLoadAfterCompletion` logic. | How is next StudyLoad prepared after completion? | Read-only full |
| `nextjs_space/lib/study-load-content.ts` | live code / content registry | Vigente executable truth | Content registry, item definitions, authored feedback helpers. | What content, evidence keys, and feedback are materialized? | Read-only full |
| `nextjs_space/lib/study-load-pedagogy.ts` | live code / pedagogy metadata | Vigente executable truth | Pedagogical metadata helpers surfaced in admin context. | What explicit pedagogy metadata exists? | Read-only full |
| `nextjs_space/lib/study-load-pedagogical-decision.ts` | live code / decision metadata | Vigente executable truth | Pedagogical decision record logic. | How does code represent pedagogy/decision context? | Read-only full |
| `nextjs_space/lib/paes-m1-first-capsule.ts` | live code / capsule seed | Vigente executable truth | First capsule title/purpose and idempotent creation context. | What is the first M1 capsule source? | Read-only full |
| `nextjs_space/prisma/schema.prisma` | live schema source | Vigente executable truth, read-only only | Models for LearningCycle, StudyLoad, Response, SkillState, decisions, continuity. | What backend objects materialize CPA? | Read-only targeted |

P0 count: 25.

## P1 recommended sources for PRO

| Source or family | Type | Freshness | Why it matters | PRO read |
|---|---|---|---|---|
| `nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md` | source register | Vigente with reservations | Official/content source grounding. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_1_PAES_M1_PEDAGOGICAL_DECISION_LAYER.md` | SRA roadmap | Vigente with reservations | Decision layer framing. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2_PAES_M1_EXPERT_ROADMAP_SOURCE_AND_VALIDATION_PLAN.md` | source/expert plan | Vigente with reservations | Expert validation route. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md` | PAES M1 taxonomy | Vigente with reservations | Official axes/OA inventory. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md` | roadmap taxonomy | Vigente with reservations | Node and skill taxonomy. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md` | mapping | Vigente with reservations | AS1 mapping and gaps. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md` | continuity decision records | Vigente with reservations | Future auditable next-load decisions. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md` | expert checklist | Vigente with reservations | Expert review structure. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md` | metadata proposal | Vigente with reservations | Metadata shape for StudyLoads. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_1_AS1_ALGEBRA_FUNCTIONS_CORRIDOR_METADATA_AND_ASSIGNMENT_CONSTRAINTS.md` | AS1 constraints | Vigente with reservations | Prevents AS1 universalization. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2F_FIRST_NON_ALGEBRA_SLICE_PROPOSALS.md` | N1/G1/PE1 proposals | Vigente with reservations | Candidate breadth beyond AS1. | Full |
| `nextjs_space/docs/operations/MVP_SRA_ROADMAP_2G_PAES_M1_EXPERT_REVIEW_PACKET_ASSEMBLY.md` | expert packet | Vigente with reservations | Full packet assembly. | Full |
| `nextjs_space/docs/operations/MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md` through `MVP_SRA_SCOPE_5G_*` | scope-first chain | Vigente with reservations | Full PAES_M1 tutoring scope. | Full family if time allows |
| `nextjs_space/docs/operations/MVP_SRA_IMPL_5R_MINIMAL_RULE_BASED_NEXT_LOAD_POLICY_READINESS.md` | implementation readiness | Vigente with reservations | Minimal rule-based next-load policy context. | Full |
| `nextjs_space/docs/operations/MVP_SRA_IMPL_6H_ADMIN_READ_ONLY_PEDAGOGY_CONTEXT_CHECKPOINT_HANDOFF.md` | implementation checkpoint | Vigente with reservations | Admin-read pedagogy context checkpoint. | Full |
| `nextjs_space/docs/operations/MVP_FLOW_4_E5M_M1_LOCAL_PATH_VALIDATION_AND_CONTENT_ALIGNMENT.md` | validation evidence | Vigente with reservations | Validated local AS1 path evidence. | Full |
| `nextjs_space/docs/operations/MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md` through `MVP_CONTENT_10C_*` | content history | Vigente with reservations / historical | PAES M1 content and first balanced entry path. | Targeted |
| `nextjs_space/docs/strategy/MVP_COMMERCIAL_SALES_READY_GATE_1B_TWO_STATE_FEEDBACK_READINESS_BOUNDARY.md` | strategy / feedback readiness | Recent but commercial-scope | Useful feedback boundary, not M1 CPA norm by itself. | Reference |

P1 count: 18 source entries/families.

## P2 historical/contextual sources

| Source or family | Type | Freshness | Why it matters | Use |
|---|---|---|---|---|
| `nextjs_space/docs/operations/MVP_FLOW_2_*`, `MVP_FLOW_3_*`, `MVP_FLOW_4_A*` through `MVP_FLOW_4_E*` | historical flow implementation | Historical / partly superseded | Shows evolution from early LearningCycle/StudyLoad flow to current circuit. | Context only unless confirmed by code |
| `nextjs_space/docs/operations/MVP_LEARNING_1_INVISIBLE_AND_NON_BLOCKING_LEARNING_CYCLE_PRINCIPLE.md` | learning governance | Historical but candidate_to_recover_or_canonize | Non-blocking learning cycle principle may remain valuable. | Context + candidate |
| `nextjs_space/docs/operations/FL_UX_3A_*`, `FL_UX_3D_*`, `FL_UX_3E_*` | continuity readiness | Historical / likely superseded in details | Early continuity readiness decisions. | Context |
| `nextjs_space/docs/operations/FL_UX_4D_*`, `FL_UX_4J_*`, `FL_UX_6_C_*`, `FL_UX_8_D_*` | registry/continuity/cycle history | Historical / possibly superseded | Shows older manual cycle curation and continuity work. | Context |
| `nextjs_space/docs/operations/MVP_DEPLOY_INDEPENDENCE_7B_*` through `7E_*` | deployment/continuation history | Historical / possibly superseded | Earlier second StudyLoad and staging-state assessments. | Context |
| `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_CAPSULE_1*` through `5C*` | UI capsule implementation docs | Vigente with reservations but superseded by CIRCUIT-1/PRO-AUDIT-1 for direction | Shows how current circuit was built. | Context; consult when tracing exact feature origin |
| `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_*` | dry run history | Historical / possibly superseded | Records prior local pilot attempts. | Context |
| `nextjs_space/docs/operations/MVP_SALES_PILOT_EXTERNAL_AUDIT_1_*` | external audit/roadmap redirect | Historical / useful | May explain product redirect. | Context |
| `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP*.md` | commercial roadmap | Vigente for commercial scope, not CPA norm | Prevents false Sales-Ready claims. | Reference |
| `nextjs_space/docs/operations/MVP_ROADMAP_LOCK_0_*`, `MVP_ROADMAP_LOCK_1_*` | governance | Vigente for roadmap semantics | Ensures M1-first is tactical, not final scope. | Reference |
| `nextjs_space/docs/governance/*` | governance docs | Mixed | May contain source alignment and memory protocols. | Targeted context |
| `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_*` | L1 commercial/feedback docs | Recent but outside M1 CPA | Useful for transversal constraints and future L1. | Context only for CPA M1 |

P2 count: 12 source entries/families.

## P3 optional sources

| Source or family | Type | Freshness | Use |
|---|---|---|---|
| `nextjs_space/STYLE_GUIDE.md` | UI style support | Supporting | Optional for visible feedback/dashboard review. |
| `nextjs_space/docs/operations/LANDING_PAGE_STUDENT_MVP_DELIVERABLE.md` and landing phase docs | UI/product history | Mostly superseded by later circuit/audit | Optional unless CPA audit includes landing promise alignment. |
| `nextjs_space/docs/operations/MVP_BETA_*` budget/scope/target docs | commercial/governance | Vigente for target scope | Optional for CPA if audit scope stays M1 pedagogical. |
| Root PDFs mirroring repo docs | duplicate artifacts | Possibly duplicate | Avoid unless Markdown source unavailable. |
| External root-level `.docx`/`.pdf` E360 audit/contract files | external/local | Status uncertain | Candidate for PRO if human confirms freshness. |

P3 count: 5 source entries/families.

## Excluded/sensitive sources

Excluded categories:

- `.env`, `.env.*`;
- key/pem files;
- files named or patterned as secret, credential, token, password, or DB URL candidates;
- `node_modules`;
- `.next`;
- `.git` internals;
- logs or backups likely to contain credentials or sensitive runtime data;
- binary/heavy files unless only path-level inventory is explicitly needed.

Observed in authorized external/local root:

```text
excluded_sensitive_candidate count: 20
```

These were not opened.

## Live code sources for CPA behavior

Primary read-only code sources:

| Path | CPA component |
|---|---|
| `nextjs_space/app/study/paes-m1/page.tsx` | Study Page M1, current/completed capsules, enrollment state, visible progress/focus/capsule CTA. |
| `nextjs_space/app/now/page.tsx` | Student dashboard, current/pending/completed load summaries, visible progress/evidence signals. |
| `nextjs_space/app/now/study-loads/[id]/page.tsx` | Capsule viewer, registry content resolution, completed review state, feedback hydration from stored evidence. |
| `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx` | Answer draft, submit state, feedback display, self-report capture, manual completion call. |
| `nextjs_space/app/api/study-loads/[id]/start/route.ts` | Manual start boundary and transition to `in_progress`. |
| `nextjs_space/app/api/study-loads/[id]/responses/route.ts` | `mc_submission`, contentKey validation, answer evidence, feedback return. |
| `nextjs_space/app/api/study-loads/[id]/complete/route.ts` | selfReport persistence, completion state, best-effort continuity. |
| `nextjs_space/app/api/study-loads/[id]/route.ts` | StudyLoad scalar/audit payload behavior. |
| `nextjs_space/app/api/study-loads/route.ts` | StudyLoad creation/admin API context. |
| `nextjs_space/lib/study-load-content.ts` | Content registry and authored feedback helper. |
| `nextjs_space/lib/study-load-continuity.ts` | Rule-based next StudyLoad preparation after completion. |
| `nextjs_space/lib/study-load-pedagogy.ts` | Pedagogical metadata helper. |
| `nextjs_space/lib/study-load-pedagogical-decision.ts` | Pedagogical decision metadata. |
| `nextjs_space/lib/paes-m1-first-capsule.ts` | First M1 capsule constants/creation helper context. |
| `nextjs_space/prisma/schema.prisma` | Models: LearningCycle, StudyLoad, Response, SkillState, CycleDecision, CycleEvaluation, ContinuitySignal, related relations. |

Secondary read-only code sources:

- `nextjs_space/app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx`;
- `nextjs_space/app/admin/learning-cycles/page.tsx`;
- `nextjs_space/app/admin/cycle-decisions/page.tsx`;
- `nextjs_space/app/admin/cycle-evaluations/page.tsx`;
- `nextjs_space/app/admin/study-loads/page.tsx`;
- `nextjs_space/app/api/learning-cycles/*`;
- `nextjs_space/app/api/cycle-decisions/*`;
- `nextjs_space/app/api/cycle-evaluations/*`;
- `nextjs_space/app/api/continuity-signals/*`;
- `nextjs_space/app/api/continuity-start/*`;
- `nextjs_space/lib/continuity-start/*`.

## External/local documents inventory

Available external/local root:

```text
C:\Projects\e360-tutoring-platform
```

Notable non-sensitive path-level sources observed:

| Path | Type | Freshness | Treatment |
|---|---|---|---|
| `C:\Projects\e360-tutoring-platform\BPCPI_BLUEPRINT_CANONICO_RAW_v0_1.md` | external/local RAW | Superseded by repo canonical BPCPI unless human says otherwise | Context only; repo canonical wins. |
| `C:\Projects\e360-tutoring-platform\BPTT_BLUEPRINT_PEDAGOGICO_TACTICO_TRANSVERSAL_RAW_v0_1.md` | external/local RAW | Superseded by repo canonical BPTT unless human says otherwise | Context only; repo canonical wins. |
| `C:\Projects\e360-tutoring-platform\BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO_RAW_v0_1 (1).md` | external/local RAW | Superseded by repo canonical integrated M1 blueprint unless human says otherwise | Context only; repo canonical wins. |
| `C:\Projects\e360-tutoring-platform\E360_AUDITORIA_GENERAL_PLATAFORMA_Y_PROYECTO_v2.docx` | external/local audit | Status uncertain | P3 candidate for PRO if Mauricio marks current. |
| `C:\Projects\e360-tutoring-platform\E360_CYCLE_WIRING_CONTRACT_v1.0_revised.docx` | external/local cycle contract | Status uncertain | P3/P1 candidate if PRO audits LearningCycle wiring. |
| `C:\Projects\e360-tutoring-platform\E360_CYCLE_WIRING_CONTRACT_v1.0_revised.pdf` | external/local cycle contract duplicate | Status uncertain | Prefer source docx/md if needed. |
| `C:\Projects\e360-tutoring-platform\tutoring_platform_mvp_E360_CYCLE_WIRING_CONTRACT_v1.0.pdf` | external/local cycle contract duplicate | Status uncertain | Duplicate/reference only. |
| `C:\Projects\e360-tutoring-platform\tutoring_platform_mvp\E360_CYCLE_WIRING_CONTRACT_v1.0.md` | repo-root/local contract | Historical / possibly useful | Candidate_to_recover_or_canonize if not already superseded. |
| `C:\Projects\e360-tutoring-platform\tutoring_platform_mvp\.project_instructions.md` | local operating instructions | Supporting | Reference only if agent/process context matters. |

External G-drive roots were not available, so this inventory cannot confirm the state of Mauricio's Google Drive master documentation.

## CPA components covered by sources

| CPA component | Covered by |
|---|---|
| Tutorias | BPCPI, BPTT, integrated M1 blueprint, SRA scope docs, Study Page code. |
| Capsulas / StudyLoads | integrated M1 blueprint, UI-CIRCUIT-1, PRO-AUDIT-1, `study-load-content.ts`, StudyLoad pages/API, Prisma schema. |
| Evidencia | BPCPI/BPTT/M1 blueprint, responses route, `mc_submission`, admin cycle detail, Prisma Response model. |
| Feedback | BPCPI/BPTT/M1 blueprint, `study-load-content.ts`, responses route, capsule viewer/form, strategy feedback readiness docs. |
| Autorreporte | BPCPI/BPTT/M1 blueprint, answer form, complete route, Response/selfReport persistence, UI capsule docs. |
| Continuidad | BPCPI/BPTT/M1 blueprint, PRO-AUDIT-1, SCHEDULE-1, complete route, `study-load-continuity.ts`, SRA roadmap/scope docs. |
| Progreso | BPCPI/BPTT/M1 blueprint, `/now`, Study Page, SRA docs, PRO-AUDIT-1 debts. |
| LearningCycle / SRA | SRA roadmap/scope docs, Prisma schema, learning-cycle APIs/admin, continuity-start docs/code. |
| Contenido PAES M1 | PAES source register, SRA roadmap taxonomy, MVP_CONTENT docs, `study-load-content.ts`, `paes-m1-first-capsule.ts`. |
| UI estudiante | UI-CIRCUIT-1, PRO-AUDIT-1, Study Page, `/now`, capsule viewer/form. |
| Modelos backend | Prisma schema, API routes, StudyLoad/LearningCycle/Response/CycleDecision/CycleEvaluation/SkillState code. |

## Staleness and supersession assessment

Criteria used:

- Git preflight is live truth for repo state.
- Recent PHASE_LOG entries outrank older phase docs.
- Handoff/template/index are useful, but can contain stale embedded baselines.
- BPCPI, BPTT, integrated M1 blueprint, PRO-AUDIT-1, and SCHEDULE-1 govern current pedagogical direction.
- Code is executable truth for actual CPA behavior, but not pedagogical justification by itself.
- Older docs that contradict newer docs/code should be marked historical, superseded, or contradictory.

Clearly current / canonical:

- BPCPI.
- BPTT.
- Integrated M1 blueprint.
- PRO-AUDIT-1.
- UI-CIRCUIT-1.
- SCHEDULE-1.
- Current Git preflight at `7e9a68a`.
- Live code sources listed above.

Useful but old:

- MVP_CONTENT chain.
- MVP_FLOW chain.
- FL_UX continuity/cycle docs.
- SRA roadmap/scope docs.
- E360 cycle wiring contract files if human confirms relevance.

Potentially superseded:

- Friday review/test references before SCHEDULE-1 are superseded by the Tuesday, June 9, 2026 target.
- Older UI phase next-step recommendations are superseded by UI-CIRCUIT-1 and PRO-AUDIT-1.
- Older BPCPI/BPTT/M1 RAW files outside the repo are superseded by repo canonical documents unless human review says otherwise.
- Older index/handoff baseline paragraphs are superseded by Git preflight and latest PHASE_LOG.
- Older AS1-only or linear route assumptions are superseded by BPCPI/BPTT/integrated M1 blueprint and SRA scope constraints.

Contradictions found:

- Several handoff/index sections contain stale baseline and next-phase references. They are not contradictions in pedagogy if treated as historical context, but they must not be used as live Git truth.
- External Google Drive roots were unavailable, so no contradiction could be assessed there.

Ideas ancient enough to require validation but potentially valuable:

- `candidate_to_recover_or_canonize`: non-blocking operator principle from SRA/learning docs.
- `candidate_to_recover_or_canonize`: next-load decision record format from SRA roadmap.
- `candidate_to_recover_or_canonize`: E360 Cycle Wiring Contract if it contains a durable LearningCycle/StudyLoad contract still not captured in current blueprints.
- `candidate_to_recover_or_canonize`: older MVP_CONTENT item blueprint and balanced entry docs where they contain concrete M1 item/content quality constraints not yet fully represented in the integrated M1 blueprint.

## Gaps in source coverage

- Google Drive master documentation roots were unavailable/access denied.
- External `.docx`/`.pdf` documents were inventoried by path only; their contents were not copied or audited.
- CPA code behavior was searched/read-only, not audited.
- No runtime DB inspection was performed.
- No secrets, env values, production/staging values, or sensitive logs were opened.
- The inventory does not decide which source is pedagogically correct where conflicts exist; that is for PRO.
- Exact content quality of individual M1 items and feedback was not audited.

## Recommended PRO audit package

P0 package:

1. `nextjs_space/docs/operations/BPCPI_BLUEPRINT_CANONICO_CAPA_PEDAGOGICA_IDEAL.md`
2. `nextjs_space/docs/operations/BPTT_BLUEPRINT_PEDAGOGICO_TACTICO_TRANSVERSAL.md`
3. `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md`
4. `nextjs_space/docs/operations/MVP_SALES_PILOT_PRO_AUDIT_1_TOP_DOWN_UI_CIRCUIT_AUDIT.md`
5. `nextjs_space/docs/operations/MVP_SALES_PILOT_UI_CIRCUIT_1_FIRST_STUDENT_UI_VISUAL_AND_FUNCTIONAL_CIRCUIT_CLOSEOUT.md`
6. `nextjs_space/docs/operations/MVP_SALES_PILOT_SCHEDULE_1_RESCHEDULE_APP_REVIEW_AND_PRIORITIZE_PEDAGOGICAL_LAYER_AUDIT.md`
7. `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
8. `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`
9. `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
10. `PHASE_LOG.md` latest relevant tail
11. Live Study Page / dashboard / capsule / responses / complete / continuity code sources listed in P0
12. External/local canonical candidates if human confirms they remain relevant, especially E360 cycle contract files

P1 package:

1. PAES M1 source register.
2. SRA roadmap/scope chain.
3. StudyLoad metadata and next-load decision record docs.
4. MVP_CONTENT docs for PAES M1 item/content grounding.
5. MVP_FLOW docs for validated local continuity and AS1 path evidence.
6. GOV/PRODUCT/ROADMAP context when CPA implications touch MVP-Beta or Sales-Ready claims.
7. Historical E360/Bexauri documents if they contain source-of-truth decisions not yet migrated into repo docs.

## Questions PRO should answer using this inventory

1. Where does the current CPA satisfy BPCPI, BPTT, and the integrated M1 blueprint?
2. Where does the CPA only navigate but not yet teach, evidence, review, or continue pedagogically?
3. Which visible UI claims are supported by backend/code evidence?
4. Which progress/logro indicators are honest, weak, or misleading?
5. What exactly does current continuity decide, and is that pedagogically justified?
6. Are M1 capsules currently structured as capsules with purpose/evidence/feedback/continuity, or as exercises with UI wrapper?
7. What feedback exists as authored content, generated summary, or generic answer key?
8. What does self-report influence today, and what should it influence later?
9. Which historical ideas should be recovered into BPCPv1?
10. Which old documents should be explicitly marked superseded before future implementation?

## Risks if PRO audits without these sources

- PRO may audit only the blueprints and miss executable CPA behavior.
- PRO may audit only code and miss pedagogical contracts.
- PRO may canonize old docs superseded by BPCPI/BPTT/M1 integrated blueprint.
- PRO may treat UI circuit existence as learning proof.
- PRO may miss hidden mismatch between feedback UI and backend evidence.
- PRO may miss that continuity exists technically but may not be pedagogically justified.
- PRO may overtrust external RAW docs already superseded by repo canonical documents.
- PRO may understate gaps caused by unavailable Google Drive master sources.

## Next recommended phase

```text
MVP-SALES-PILOT-PEDAGOGY-CPA-AUDIT-1 - PRO audit CPA against BPCPI/BPTT/M1 integrated blueprint
```

This next phase should audit. This phase did not.
