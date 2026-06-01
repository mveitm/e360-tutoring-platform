# MVP-SALES-PILOT-HARDENING-5C - Define participant/data and language guardrails

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-HARDENING-5C - Define participant/data and language guardrails
```

Type:

```text
Documentation / governance / participant-data-language guardrails only.
```

Roadmap block:

```text
10 - Internal pilot and sales-ready go/no-go
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## 2. Baseline

Baseline confirmed by Git preflight:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = e82de0f
```

Latest accepted commit:

```text
e82de0f - MVP-SALES-PILOT-HARDENING-5B: define support failure path
```

Git preflight remained the live truth. Historical baselines inside documents, prompts, memory, and reports were treated as context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_DIRECTION_1A_DEFINE_M1_FIRST_CLOSED_SANDBOX_READINESS_GATE.md`
* `MVP_SALES_PILOT_HARDENING_5_CLOSE_MINIMUM_BLOCKERS_BEFORE_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5A_DEFINE_STUDENT_ACCESS_CONTAINMENT_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_HARDENING_5B_DEFINE_SUPPORT_FAILURE_PATH_FOR_M1_FIRST_SANDBOX.md`
* `MVP_SALES_PILOT_DIRECTION_1_DECIDE_M1_FIRST_THRESHOLD_AFTER_FOUR_LOCAL_DEV_DRY_RUNS.md`
* `pro_reports/INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD.md`
* `MVP_SALES_PILOT_GO_4_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_004_EVIDENCE.md`
* `MVP_SALES_PILOT_DRY_RUN_4A_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_004.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context interpretation:

* DIRECTION-1 closed with `HYBRID_DIRECTION_WITH_PHASED_GATES`.
* DIRECTION-1A closed with `M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET`.
* HARDENING-5 closed with `MINIMUM_BLOCKER_SEQUENCE_DEFINED_RECOMMEND_STUDENT_ACCESS_CONTAINMENT_FIRST`.
* HARDENING-5A allowed StudentAccess containment only for a tiny, human-guided, non-public, non-commercial, M1-only, allowlist-controlled sandbox.
* HARDENING-5B defined a pause-first support/failure path and prohibited improvisation with DB, auth, app code, or data.
* This phase defines guardrails only. It does not prepare, execute, recruit for, or declare readiness for a sandbox.

## 4. Decision Inherited From HARDENING-5B

Inherited decision:

```text
SUPPORT_FAILURE_PATH_DEFINED_FOR_TINY_HUMAN_GUIDED_SANDBOX
```

Inherited operating boundaries:

* temporary access authority remains runbook plus allowlist plus controlled fixture plus private credential custody plus documented phase boundary;
* any participant outside the allowlist pauses the run;
* sensitive data exposure pauses the run;
* non-`PAES_M1` program exposure pauses the run;
* commercial, public, paid, trial, subscription, L1, M2, staging-ready, Sales-Ready, or MVP-Beta-complete language is forbidden.

## 5. Purpose Of Participant / Data / Language Guardrails

Purpose:

```text
Define who may participate, what data may be used, what language may be used, what evidence may be captured, and when a future tiny M1-first sandbox must pause.
```

These guardrails are prerequisites for a future sandbox runbook. They do not create the runbook and do not authorize execution.

## 6. Participant Categories

### A. Synthetic participant

Definition:

```text
Controlled non-real participant such as PILOT_M1_00X.
```

Policy:

* allowed for local/dev and internal technical sandbox checks;
* allowed for a future tiny M1-first sandbox if explicitly allowlisted;
* must use non-real data;
* must remain under team control;
* must not create privacy or commercial expectations.

### B. Internal controlled participant

Definition:

```text
Team member or internal trusted person who understands the run is a closed test.
```

Policy:

* allowed for a future tiny M1-first sandbox if explicitly allowlisted;
* requires clear operational consent;
* must not activate payment, trial, subscription, or public availability expectations;
* should use alias or controlled email where possible;
* must follow the support/failure path.

### C. Known controlled external participant

Definition:

```text
Real person known to Mauricio or the team and invited only to a closed, controlled test.
```

Policy:

* conditionally eligible only after SANDBOX-0 defines the runbook communication and data handling note;
* must be explicitly allowlisted before any run;
* must receive minimal non-commercial communication;
* must provide basic operational consent if real personal data or real participation is involved;
* must not be charged, placed on trial, subscribed, or treated as public user;
* must avoid sensitive data beyond the minimum needed to operate the test.

This phase does not recruit or approve any specific external participant.

### D. Public / uncontrolled external participant

Definition:

```text
External user who is not known, not controlled, or not explicitly included in a closed allowlist.
```

Policy:

* not allowed in the tiny M1-first sandbox;
* requires broader closed pilot readiness, StudentAccess lifecycle, support, legal/commercial boundaries, and stronger data policy.

### E. Minor / school student participant

Definition:

```text
Student participant who may be a minor or school-age learner.
```

Policy:

* not authorized by this phase;
* blocked pending explicit legal/guardian/data policy unless a later phase identifies an existing sufficient policy in the repo;
* must not be included by assumption inside the first tiny sandbox.

## 7. Participant Eligibility Decision

Decision:

```text
PARTICIPANT_DATA_LANGUAGE_GUARDRAILS_DEFINED_WITH_EXTERNAL_PARTICIPANTS_CONDITIONED
```

Eligibility for the first future tiny M1-first sandbox:

1. Preferred participants: synthetic participants and internal controlled participants only.
2. Known controlled external participants: not recruited or authorized here; may be considered only if SANDBOX-0 includes an explicit allowlist, minimal communication/consent note, and data-minimization boundary.
3. Public/uncontrolled external participants: prohibited.
4. Minors/school students: blocked pending explicit legal/guardian/data policy.

Rationale:

* The existing evidence is local/dev, synthetic/control-only evidence.
* StudentAccess containment is allowed only under strict limits.
* Support/failure path is manual and human-guided.
* The safest first sandbox should validate operations without expanding into real-student, legal, commercial, or public-support scope.

## 8. Data Minimization Policy

Data policy:

```text
Use the minimum data needed to operate and review the M1-first flow.
```

Rules:

* prefer synthetic data and aliases;
* avoid real sensitive data;
* do not collect data for marketing, testimonials, or public claims;
* do not copy raw technical payloads;
* do not store secrets or credential material in docs;
* record only bounded operational evidence required by the sandbox runbook;
* if real data appears unexpectedly, pause and follow the support/failure path.

## 9. Data Allowed

Allowed data for a future tiny M1-first sandbox:

* participant alias or code;
* synthetic or controlled email;
* participant type;
* allowed program: `PAES_M1`;
* enrollment, cycle, and StudyLoad status;
* initial StudyLoad title;
* MC responses and MC summary;
* brief self-report;
* operational timestamp or date where needed;
* safe route/page name without tokens;
* admin/tutor evidence summary;
* incident class and sanitized incident summary;
* StudentAccess observation as present / missing / not checked.

## 10. Data Prohibited

Prohibited data:

* passwords;
* hashes;
* tokens;
* cookies;
* env values;
* DB URLs;
* headers;
* request bodies;
* response bodies;
* provider values;
* storage values;
* RUT, DNI, or equivalent official ID;
* address;
* unnecessary personal phone;
* medical data;
* financial data;
* sensitive family data;
* unnecessary school record data;
* third-party personal data;
* screenshots with unnecessary personal information;
* any real data not strictly required for the controlled test.

## 11. Real Participant / Data Constraints

For the first tiny sandbox:

* prefer synthetic or internal controlled participants;
* if a known controlled external participant is later considered, use only minimal real data and clear non-commercial communication;
* do not include minors or school students without explicit legal/guardian/data policy;
* do not use real participant evidence in marketing, testimonials, sales claims, or public proof;
* do not use real participant evidence to claim PAES diagnosis, score, prediction, adaptation, or guaranteed improvement;
* do not expand participant count without a new phase.

## 12. Language Allowed

Allowed language:

* `prueba controlada`;
* `sandbox cerrado M1-first`;
* `actividad de Matematica M1`;
* `entorno no publico`;
* `sin pago, trial ni suscripcion`;
* `no representa diagnostico PAES completo`;
* `evidencia de trabajo para revision del equipo`;
* `validacion limitada del flujo M1`;
* `M1-first es una vertical tactica dentro del camino hacia MVP-Beta cerrado M1/M2/L1`.

## 13. Language Prohibited

Prohibited language:

* `Sales-Ready`;
* `disponible publicamente`;
* `MVP listo`;
* `MVP-Beta cerrado completo`;
* `listo para M1/M2/L1`;
* `diagnostico PAES`;
* `prediccion PAES`;
* `puntaje PAES`;
* `score PAES`;
* `adaptativo autonomo`;
* `tutor IA autonomo`;
* `suscripcion activa`;
* `trial activo`;
* `plan pagado`;
* `garantiza mejora`;
* `plataforma completa`;
* `piloto abierto`;
* `staging ready` as current state;
* `sandbox ready` as current state while the gate remains unmet.

## 14. Safe Message Examples

Safe short examples:

* `Estas participando en una prueba cerrada y controlada de Bexauri para Matematica M1.`
* `Esta prueba no es publica, no es un plan pagado y no activa suscripcion.`
* `La actividad no entrega diagnostico PAES completo ni puntaje.`
* `Tu evidencia de trabajo se usara para revisar el funcionamiento del flujo.`
* `Si algo falla, deten la actividad y avisa al equipo.`

These examples are not a campaign, landing page, legal terms, or commercial material.

## 15. Evidence Capture Rules

Allowed evidence:

* participant alias/code;
* synthetic or controlled email;
* participant type;
* operational date/time;
* safe route/page name without tokens;
* StudyLoad title;
* StudyLoad status;
* response counter;
* MC summary;
* self-report;
* admin/tutor evidence summary;
* decision/evaluation counts;
* sanitized incident summary.

Forbidden evidence:

* password;
* hash;
* token;
* cookies;
* env value;
* DB URL;
* headers;
* request body;
* response body;
* screenshots with sensitive or unnecessary personal data;
* data from minors without explicit policy;
* third-party information;
* private contact, financial, medical, family, or school data not required for the test.

## 16. Allowlist Concept

Every future sandbox participant must appear in a future operational allowlist before execution.

Minimum allowlist fields:

* alias/code;
* controlled email;
* participant type;
* allowed program: `PAES_M1`;
* expected initial StudyLoad;
* support owner;
* status: `prepared`, `credential-ready`, `running`, `completed`, `paused`, or `withdrawn`.

This phase does not implement an allowlist, create participants, or prepare credentials. The allowlist concept must be embedded in SANDBOX-0 before any sandbox execution.

## 17. Relationship With StudentAccess Containment

These guardrails are part of the HARDENING-5A temporary access authority:

```text
runbook + allowlist + controlled fixture + private credential custody + documented phase boundary
```

Implications:

* if a participant is not allowlisted, they must not run;
* if a participant needs broader access, pause and do not extend manually;
* StudentAccess missing is not automatically `no_access` or `full_access`;
* StudentAccess missing may be contained only if allowlist/runbook authority is explicit;
* StudentAccess lifecycle remains required before broader closed pilot, staging with external users, and Sales-Ready/public.

## 18. Relationship With Support / Failure Path

These guardrails feed the HARDENING-5B support/failure path:

* data/language violation triggers pause;
* sensitive data exposure triggers immediate pause;
* participant not allowlisted triggers pause;
* wrong program triggers pause;
* unsafe evidence should not be copied;
* accidental commercial language triggers pause/review;
* any attempt to use evidence as marketing/testimonial triggers pause/review;
* any attempt to expand to M2, L1, public users, payment, trial, subscription, or broad cohort requires a separate phase.

## 19. Pause Criteria

Pause immediately if any of these occur:

* participant is not allowlisted;
* participant is a minor or school student without explicit legal/guardian/data policy;
* uncontrolled external participant appears;
* sensitive data appears;
* secret, token, cookie, password, hash, env value, DB URL, header, request body, or response body appears or is requested;
* program is not `PAES_M1`;
* language implies public availability, payment, trial, subscription, Sales-Ready, MVP-Beta complete, full PAES diagnosis, PAES score, prediction, guaranteed improvement, autonomous adaptation, or autonomous AI tutor;
* participant expects paid/commercial service;
* participant expects PAES diagnosis, score, or improvement guarantee;
* evidence is used or requested for marketing/testimonial;
* there is confusion about whether the sandbox is public;
* someone attempts to activate M2 or L1;
* someone attempts to expand to a cohort;
* data capture would require copying prohibited evidence.

## 20. Non-Declarations

This phase does not declare:

* current sandbox readiness;
* current staging readiness;
* Sales-Ready public;
* Sales-Ready cerrado;
* MVP-Beta cerrado complete;
* broader pilot readiness;
* large-cohort readiness;
* L1 readiness;
* M2 readiness;
* payment active;
* trial active;
* subscription active;
* public commercial plan;
* automatic diagnosis;
* autonomous adaptation;
* mastery, theta, or PAES score readiness;
* autonomous AI tutor readiness;
* robust complete auth readiness;
* complete support readiness;
* legal/commercial readiness;
* long continuity validation;
* StudentAccess lifecycle implemented.

## 21. Explicit Non-Actions

This phase did not:

* implement;
* execute UI;
* mutate DB;
* create students;
* create User or Account;
* create Enrollment, LearningCycle, or StudyLoad;
* create or modify StudentAccess rows;
* touch StudentAccess lifecycle;
* start loads;
* close cycles;
* create CycleDecision;
* create CycleEvaluation;
* touch app code;
* touch schema;
* touch seed;
* touch auth;
* touch CredentialsProvider;
* touch payment/trial/subscription;
* touch L1/M2;
* touch staging;
* touch production;
* create sandbox real;
* create a complete executable sandbox runbook;
* recruit participants;
* write commercial materials;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values.

## 22. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-SANDBOX-0 - Draft closed M1-first sandbox runbook
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5 sequence, HARDENING-5A StudentAccess containment, HARDENING-5B support/failure path, and this participant/data/language guardrail decision.
* What it advances: drafts the future closed M1-first sandbox runbook using already defined access containment, support/failure path, and participant/data/language guardrails.
* What it does not advance: sandbox execution, staging execution, implementation, participant recruitment, StudentAccess lifecycle, auth repair, Playwright E2E, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_DOCUMENTATION_PHASE_SANDBOX_RUNBOOK_DRAFT`
* Authorization status: requires separate explicit authorization before execution.

## 23. Final Verdict

Final verdict:

```text
PARTICIPANT_DATA_LANGUAGE_GUARDRAILS_DEFINED_WITH_EXTERNAL_PARTICIPANTS_CONDITIONED
```

Participant, data, and language guardrails are now defined for a future tiny, human-guided, non-public, non-commercial, `PAES_M1`-only sandbox. The preferred first sandbox participant set is synthetic/internal controlled. Known controlled external participants are only conditional for a later runbook-governed sandbox and are not recruited or authorized by this phase. Public/uncontrolled external participants and minors are blocked pending later readiness/policy.

## Result Marker

```text
MVP_SALES_PILOT_HARDENING_5C_PARTICIPANT_DATA_LANGUAGE_GUARDRAILS_DEFINED_WITH_EXTERNAL_PARTICIPANTS_CONDITIONED
```
