# MVP-SALES-PILOT-SANDBOX-0 - Draft closed M1-first sandbox runbook

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-SANDBOX-0 - Draft closed M1-first sandbox runbook
```

Type:

```text
Documentation / readiness / sandbox runbook draft only.
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
HEAD = origin/main = origin/HEAD = 4e9adbc
```

Latest accepted commit:

```text
4e9adbc - MVP-SALES-PILOT-HARDENING-5C: define sandbox guardrails
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
* `MVP_SALES_PILOT_HARDENING_5C_DEFINE_PARTICIPANT_DATA_AND_LANGUAGE_GUARDRAILS.md`
* `MVP_SALES_PILOT_DIRECTION_1_DECIDE_M1_FIRST_THRESHOLD_AFTER_FOUR_LOCAL_DEV_DRY_RUNS.md`
* `pro_reports/INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD.md`
* `MVP_SALES_PILOT_GO_4_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_004_EVIDENCE.md`
* `MVP_SALES_PILOT_DRY_RUN_4A_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_004.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context interpretation:

* DIRECTION-1 selected `HYBRID_DIRECTION_WITH_PHASED_GATES`.
* DIRECTION-1A defined the closed M1-first sandbox gate but closed with `M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET`.
* HARDENING-5 sequenced blockers and left `HARDENING-5D` pending after SANDBOX-0.
* HARDENING-5A allowed StudentAccess containment only for a tiny human-guided sandbox with strict limits.
* HARDENING-5B defined manual support/failure handling.
* HARDENING-5C defined participant, data, and language guardrails with external participants conditioned.
* This phase drafts the runbook only. It does not execute, authorize, or declare readiness.

## 4. Decision Inherited From DIRECTION-1A And HARDENING-5A / 5B / 5C

Inherited decisions:

```text
HYBRID_DIRECTION_WITH_PHASED_GATES
M1_FIRST_CLOSED_SANDBOX_GATE_DEFINED_NOT_YET_MET
STUDENT_ACCESS_CONTAINMENT_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
SUPPORT_FAILURE_PATH_DEFINED_FOR_TINY_HUMAN_GUIDED_SANDBOX
PARTICIPANT_DATA_LANGUAGE_GUARDRAILS_DEFINED_WITH_EXTERNAL_PARTICIPANTS_CONDITIONED
```

Inherited execution boundary:

```text
This runbook is a preparation draft. It does not authorize sandbox execution.
```

## 5. Sandbox Definition

A future closed M1-first sandbox is:

* tiny;
* human-guided;
* non-public;
* non-commercial;
* `PAES_M1` only;
* allowlist-controlled;
* operated through temporary access authority: runbook plus allowlist plus controlled fixture plus private credential custody;
* limited to the first authorized M1 StudyLoad unless the later execution protocol explicitly expands scope;
* designed to produce safe student/admin evidence and incident records.

It is not staging readiness, not public readiness, not payment/trial/subscription readiness, not broader pilot readiness, and not MVP-Beta cerrado M1/M2/L1 readiness.

## 6. Scope And Non-Scope

In scope for a future sandbox execution, if separately authorized:

* one tiny run with synthetic/internal controlled participants by default;
* `PAES_M1` only;
* first authorized StudyLoad flow;
* manual login/session operation;
* visible sign-out between accounts;
* read-only admin/tutor evidence review;
* support/failure path execution;
* safe evidence capture;
* compact closeout report.

Out of scope:

* public users;
* uncontrolled external users;
* minors without explicit legal/guardian/data policy;
* payment, trial, or subscription;
* self-serve signup;
* self-serve enrollment;
* M2;
* L1;
* second-load start unless a later protocol explicitly authorizes it;
* CycleDecision or CycleEvaluation creation;
* code, auth, schema, seed, or DB repair during the run;
* Sales-Ready or MVP-Beta-complete claims.

## 7. Participant Policy

Participant policy inherited from HARDENING-5C:

* first sandbox recommended participant set: synthetic participants and internal controlled participants only;
* known controlled external participants may be considered only if a later authorization phase accepts explicit allowlist, minimal communication, basic consent, data policy, and support limits;
* public or uncontrolled external participants are blocked;
* minors or school students are blocked pending explicit legal/guardian/data policy;
* no participant is recruited or created by this runbook draft.

Participant count:

```text
1-2 participants maximum unless a later authorization phase narrows or changes the run.
```

## 8. Allowlist Concept

The future sandbox must have an allowlist before any execution. This phase does not implement or populate it.

Minimum conceptual fields:

| Field | Meaning |
|---|---|
| `participant_code` | Synthetic/internal code or alias. |
| `participant_type` | `synthetic`, `internal_controlled`, or later explicitly approved `known_controlled_external`. |
| `controlled_email` | Controlled email or synthetic email; no password. |
| `program_allowed` | Must be `PAES_M1`. |
| `initial_studyload_expected` | Expected first StudyLoad title/key. |
| `support_owner` | Person responsible for pause/support decisions. |
| `credential_status` | `not_prepared`, `credential-ready`, `blocked`, or equivalent. |
| `run_status` | `prepared`, `running`, `completed`, `paused`, `aborted`, or `withdrawn`. |
| `allowed_actions` | Login, view `/now`, start authorized StudyLoad, submit MC, self-report, complete, read-only admin review. |
| `stop_conditions` | Participant/data/language/access/environment conditions that pause or abort. |
| `evidence_required` | Student evidence, admin/tutor evidence, incident record, closeout decision. |

Allowlist rule:

```text
If the participant is not allowlisted, the sandbox must not run.
```

## 9. Access And StudentAccess Containment

Access authority for a future tiny sandbox:

```text
runbook + allowlist + controlled fixture + private credential custody + documented phase boundary
```

StudentAccess containment rules:

* StudentAccess containment is allowed only for a tiny, human-guided, non-public, non-commercial, M1-only sandbox with strict limits.
* StudentAccess missing does not automatically mean `no_access`.
* StudentAccess missing does not automatically mean `full_access`.
* StudentAccess is not the runtime authority if lifecycle is not implemented.
* Every participant must be allowlisted.
* Every credential must be handled privately and never printed.
* Any unauthorized access, wrong content, or severe operational confusion triggers pause.

StudentAccess lifecycle remains required before:

* broader closed pilot;
* staging with external users;
* Sales-Ready/public;
* payment, trial, or subscription;
* self-serve signup;
* self-serve enrollment;
* cohorts;
* multiple programs;
* M2/L1 activation;
* access expiration/audit;
* any risk that a participant may see unauthorized loads.

## 10. Data Guardrails

Allowed data:

* participant alias/code;
* controlled email;
* participant type;
* `PAES_M1`;
* enrollment, cycle, and StudyLoad status;
* initial StudyLoad title;
* MC response count and MC summary;
* brief self-report;
* safe route/page name without tokens;
* admin/tutor evidence summary;
* incident class and sanitized summary;
* StudentAccess observation as present / missing / not checked.

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
* official IDs;
* sensitive personal data;
* unnecessary personal data;
* unnecessary screenshots with personal information;
* third-party data.

If prohibited data appears, stop copying, pause the run, and record only a sanitized incident.

## 11. Language Guardrails

Allowed language:

* `prueba controlada`;
* `sandbox cerrado M1-first`;
* `actividad de Matematica M1`;
* `no publico`;
* `sin pago, trial ni suscripcion`;
* `no representa diagnostico PAES completo`;
* `evidencia de trabajo para revision del equipo`;
* `validacion limitada del flujo M1`;
* `M1-first es una vertical tactica dentro del camino hacia MVP-Beta cerrado M1/M2/L1`.

Prohibited language:

* `Sales-Ready`;
* `publico` as availability claim;
* `MVP completo`;
* `listo M1/M2/L1`;
* `diagnostico PAES`;
* `puntaje PAES`;
* `prediccion PAES`;
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

Safe short participant messages, if a later authorization phase allows communication:

* `Estas participando en una prueba cerrada y controlada de Bexauri para Matematica M1.`
* `Esta prueba no es publica, no es un plan pagado y no activa suscripcion.`
* `La actividad no entrega diagnostico PAES completo ni puntaje.`
* `Tu evidencia de trabajo se usara para revisar el funcionamiento del flujo.`
* `Si algo falla, deten la actividad y avisa al equipo.`

These are examples only, not sent by this phase.

## 12. Support / Failure Path

Failure families and runbook response:

| Family | Examples | Runbook response |
|---|---|---|
| Auth/session | login fails, password fails, email mismatch, trapped session, logout fails, wrong autocomplete | Pause if identity/session is unclear. One sign-out or clean-browser retry may be allowed only if credential secrecy is preserved and no data changed. Repeated failure opens later auth/E2E phase. |
| Access/StudentAccess | not allowlisted, missing causes confusion, unauthorized access, wrong content | Pause. Compare allowlist/runbook. Continue only if allowlisted and containment explicitly covers the condition. Unauthorized access aborts. |
| `/now` | `/now` fails, runtime error, missing expected StudyLoad, extra load, non-M1 program | Pause on wrong program/load. One reload may be allowed only before state change. Persistent issue opens technical phase. |
| StudyLoad start | missing start action, click fails, route does not open, inconsistent activity state | Pause. Retry only if no state transition happened and no duplicate evidence risk exists. |
| Activity rendering | wrong title, missing questions/options/counter/submit | Pause. Do not guess answers or proceed with incomplete content. |
| Submission | cannot select, counter wrong, submit fails, duplicate evidence, incomplete submit | Pause before retry if duplication or evidence corruption is possible. |
| Self-report/completion | self-report missing, save fails, close fails, no return to `/now`, completed without report | Pause. Do not force completion or mutate state. |
| Continuity | no next load, wrong load, accidental second-load start, multiple loads, unexpected decision/evaluation, cycle closes | Pause immediately. Do not start, close, delete, or repair manually. |
| Admin/tutor evidence | missing student/enrollment/cycle/load/MC/self-report; unexpected decisions/evaluations | Read-only review only. Pause if evidence is not visible enough or unexpected lifecycle appears. |
| Data/safety | sensitive data, secret, token, password, env, DB URL, unsafe screenshot | Stop immediately. Do not copy raw values. Record sanitized incident only. |
| Operator error | wrong account, second load started, unplanned answers, forgot logout, copied unsafe evidence | Pause, classify impact, do not repair via DB/auth/code improvisation. |
| Environment/Git | dirty Git, baseline divergence, unsafe target, staging/prod suspicion, Codex simulates UI | Stop before action. Re-anchor or open separate phase. |

Allowed support actions:

* guide step by step;
* ask participant to stop;
* use visible sign-out;
* reload once if no state changed;
* switch to authorized clean/incognito browser if credential secrecy is preserved;
* stop the test;
* record sanitized incident;
* perform read-only admin/tutor review;
* create later documentary or technical phase.

Prohibited support actions:

* manual DB repair;
* password sharing in chat;
* secret printing;
* improvised account;
* improvised StudyLoad;
* evidence deletion;
* manual cycle close;
* CycleDecision or CycleEvaluation creation;
* StudentAccess bypass outside approved containment;
* app/auth/schema/seed/payment/trial/subscription/L1/M2 changes;
* second-load start unless a later protocol explicitly authorizes it.

## 13. Before Sandbox Checklist

Before a future sandbox may be authorized, confirm:

* Git baseline is clean and versioned.
* Sandbox execution is separately authorized; SANDBOX-0 alone is not authorization.
* Target environment is identified and not production.
* Staging/production ambiguity is absent.
* DIRECTION-1A, HARDENING-5A, HARDENING-5B, HARDENING-5C, and SANDBOX-0 are complete.
* HARDENING-5D is complete or an explicit waiver exists for tiny human-guided execution.
* Participant allowlist is approved.
* Participant type is allowed.
* Data guardrails are accepted.
* Language guardrails are accepted.
* Minimal communication/consent note exists if any known controlled external participant is allowed.
* Credential is private and ready.
* Program is `PAES_M1`.
* Expected initial StudyLoad is named.
* Support owner is named.
* Stop criteria are visible to operator.
* No payment, trial, or subscription is active.
* No L1 or M2 is active.
* No self-serve signup or enrollment is in scope.

## 14. During Sandbox Checklist

During a future authorized sandbox:

* ChatGPT/Codex guides only from the runbook if Mauricio operates UI privately.
* Do not issue generic exploratory instructions.
* Confirm participant is allowlisted before login.
* Sign out before changing user.
* Login only as the authorized participant.
* Verify `/now` loads for the expected participant.
* Verify only `PAES_M1` appears in scope.
* Verify expected initial StudyLoad.
* Start only the authorized StudyLoad.
* Answer only according to the later execution protocol.
* Submit responses only when counter/state is expected.
* Complete self-report only as allowed by protocol.
* Close/complete activity through normal UI only.
* Do not start the second load unless the later execution protocol explicitly includes it.
* Record only permitted evidence.
* Pause on any stop condition.

## 15. Admin / Tutor Evidence Checklist

Read-only admin/tutor evidence expected:

* participant code/name visible;
* enrollment visible and expected;
* Cycle 1 open unless later protocol explicitly tests closure;
* total loads visible;
* completed authorized initial StudyLoad visible;
* pending continuity StudyLoad visible if expected;
* MC response count and summary visible;
* self-report visible;
* decision count is 0 unless explicitly authorized;
* evaluation count is 0 unless explicitly authorized;
* StudentAccess observation recorded as present / missing / not checked;
* incidents recorded without prohibited data.

If admin/tutor evidence is not visible enough for review, activate the failure path rather than repairing data manually.

## 16. After Sandbox Closeout

After a future authorized sandbox:

* sign out;
* document result;
* document incidents;
* do not mutate evidence;
* do not clean DB without a separate authorized phase;
* do not start or close additional cycles/loads;
* create a compact closeout document;
* run documentation verification for the closeout;
* commit and push closeout if the phase requires it;
* decide next step: advance, pause, close blocker, repeat targeted check, or abort.

## 17. Entry Criteria

Entry criteria before any future sandbox execution authorization:

1. DIRECTION-1A gate is defined and accepted.
2. HARDENING-5A StudentAccess containment is accepted.
3. HARDENING-5B support/failure path is accepted.
4. HARDENING-5C participant/data/language guardrails are accepted.
5. SANDBOX-0 runbook draft is complete.
6. HARDENING-5D is complete, or a later phase explicitly waives auth normalization / Playwright login E2E for a tiny human-guided sandbox.
7. Allowlist is approved and private.
8. Participant type is allowed.
9. Known controlled external participant, if any, has a minimal communication/consent/data boundary.
10. Baseline Git is clean.
11. Target environment is authorized and not production.
12. Staging/production ambiguity is absent.
13. Private credential handling is ready and safe.
14. No payment, trial, or subscription is active.
15. No M2 or L1 is active.
16. No self-serve signup or enrollment is in scope.

## 18. Exit Criteria

Exit criteria for a future authorized sandbox:

* authorized activity completed or incident documented;
* `/now` and StudyLoad evidence recorded safely;
* admin/tutor evidence visible or failure path activated;
* MC summary captured if available;
* self-report captured if completed;
* continuity state captured without starting second load unless authorized;
* decisions/evaluations remain expected;
* incidents classified;
* no sensitive data copied;
* no scope escalation;
* no commercial/public claim made;
* final compact report produced;
* next decision recorded: `advance`, `pause`, `close_blocker`, `repeat_targeted`, or `abort`.

## 19. Pause / Abort Criteria

Pause or abort immediately if any of these occur:

* staging/production suspicion;
* sensitive data exposure;
* secret, token, cookie, password, hash, env value, DB URL, header, request body, response body, provider value, or storage value appears or is needed;
* participant is not allowlisted;
* participant type is not allowed;
* minor/school student appears without explicit policy;
* program is not `PAES_M1`;
* unauthorized load appears;
* evidence is lost, duplicated, corrupted, or ambiguous;
* cycle closes unexpectedly;
* CycleDecision appears unexpectedly;
* CycleEvaluation appears unexpectedly;
* auth/session failure requires code/auth/DB change;
* manual DB mutation would be needed;
* Git is dirty or baseline diverges before phase action;
* scope becomes public or commercial;
* accidental commercial language appears;
* payment, trial, or subscription is requested or activated;
* M2 or L1 activation is attempted;
* participant expects PAES score, diagnosis, prediction, or improvement guarantee;
* evidence is requested for marketing/testimonial use.

Abort rather than pause if the issue creates unauthorized access, sensitive exposure, environment ambiguity, or data integrity risk that cannot be contained by the runbook.

## 20. Relationship With HARDENING-5D

HARDENING-5D remains pending:

```text
MVP-SALES-PILOT-HARDENING-5D - Decide auth normalization and Playwright/login E2E threshold
```

SANDBOX-0 decision:

```text
HARDENING-5D SHOULD OCCUR BEFORE ANY SANDBOX EXECUTION AUTHORIZATION, UNLESS A LATER AUTHORIZATION PHASE GRANTS AN EXPLICIT TINY-HUMAN-GUIDED WAIVER.
```

Reason:

* prior evidence includes auth normalization/account-linkage debt;
* Playwright/login E2E remains unresolved;
* a tiny human-guided sandbox may later receive a waiver, but the waiver must be explicit and traceable;
* this runbook should not silently convert manual containment into readiness.

This phase does not make the technical decision and does not implement auth or Playwright work.

## 21. Non-Declarations

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

## 22. Explicit Non-Actions

This phase did not:

* implement;
* execute UI;
* mutate DB;
* create participants;
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
* recruit participants;
* send communications;
* write commercial materials;
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values.

## 23. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-HARDENING-5D - Decide auth normalization and Playwright/login E2E threshold
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5 sequence, HARDENING-5A StudentAccess containment, HARDENING-5B support/failure path, HARDENING-5C guardrails, and this runbook draft.
* What it advances: decides whether auth normalization and Playwright/login E2E must be closed before sandbox execution authorization or can be explicitly waived for a tiny human-guided sandbox.
* What it does not advance: sandbox execution, staging execution, participant creation, implementation unless separately authorized, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_THRESHOLD_PHASE_AUTH_E2E_DECISION_BEFORE_SANDBOX_AUTHORIZATION`
* Authorization status: requires separate explicit authorization before execution.

`MVP-SALES-PILOT-SANDBOX-1 - Review and authorize closed M1-first sandbox execution readiness` should not be recommended until HARDENING-5D is complete or explicitly waived.

## 24. Final Verdict

Final verdict:

```text
CLOSED_M1_FIRST_SANDBOX_RUNBOOK_DRAFTED_NOT_AUTHORIZED_FOR_EXECUTION
```

The first closed M1-first sandbox runbook is drafted as preparation only. It integrates the DIRECTION-1A gate, StudentAccess containment, support/failure path, participant/data/language guardrails, evidence requirements, entry/exit criteria, and pause/abort criteria. Sandbox execution remains unauthorized and readiness remains not declared.

## Result Marker

```text
MVP_SALES_PILOT_SANDBOX_0_CLOSED_M1_FIRST_SANDBOX_RUNBOOK_DRAFTED_NOT_AUTHORIZED_FOR_EXECUTION
```
