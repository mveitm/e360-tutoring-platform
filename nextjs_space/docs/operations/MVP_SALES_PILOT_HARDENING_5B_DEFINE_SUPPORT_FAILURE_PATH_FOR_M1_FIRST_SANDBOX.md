# MVP-SALES-PILOT-HARDENING-5B - Define support/failure path for M1-first sandbox

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-HARDENING-5B - Define support/failure path for M1-first sandbox
```

Type:

```text
Documentation / governance / support-failure-path definition only.
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
HEAD = origin/main = origin/HEAD = 22d4a51
```

Latest accepted commit:

```text
22d4a51 - MVP-SALES-PILOT-HARDENING-5A: define StudentAccess sandbox containment
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
* HARDENING-5A allowed StudentAccess containment only for a tiny human-guided M1-first sandbox with strict limits.
* This phase defines the support/failure path only. It does not prepare a sandbox, execute UI, mutate data, or repair failures.

## 4. Decision Inherited From HARDENING-5A

Inherited decision:

```text
STUDENT_ACCESS_CONTAINMENT_ALLOWED_FOR_TINY_HUMAN_GUIDED_SANDBOX_WITH_STRICT_LIMITS
```

Inherited access authority for a future tiny sandbox:

```text
runbook + allowlist + controlled fixture + private credential custody + documented phase boundary
```

StudentAccess missing is not automatically `no_access` and not automatically `full_access`. Any participant outside the allowlist must pause the run.

## 5. Purpose Of Support / Failure Path

Purpose:

```text
Define the minimum manual support and failure handling rules required before a future tiny closed M1-first sandbox can be drafted or executed.
```

The support path must answer: what to do, who acts, when to pause, what evidence is safe to record, what is prohibited, and when a later technical phase is required.

## 6. Support Model For Tiny M1-First Sandbox

Support model:

* Human-guided, not self-serve.
* Bexauri-controlled, not public support.
* M1-only, not L1/M2.
* Non-commercial, no payment/trial/subscription.
* Pause-first when access, identity, data safety, environment, or evidence integrity is ambiguous.
* Manual guidance may continue only when it does not duplicate evidence, mutate data, bypass access containment, or require code/DB/auth changes.

Actors:

* Mauricio: performs private browser/session actions and reports safe observations.
* ChatGPT/Codex: classifies observations, documents decisions, prepares later documentary or technical phase scopes.
* No action: used when a failure requires stopping rather than improvising.

## 7. Failure Taxonomy

| Family | Examples | Severity | Immediate action | Actor | Continue? | Evidence to record | Do not record | Later phase? |
|---|---|---|---|---|---|---|---|---|
| A. Auth/session | login fails, password fails, email mismatch, trapped session, logout fails, wrong autocomplete | medium to stop | stop if identity/session unclear; try logout or one clean browser/incognito retry only if authorized | Mauricio + ChatGPT | only if identity becomes unambiguous without mutation | failure class, route, synthetic participant code, safe visible state | password, hash, cookie, token, headers, request/response body | auth normalization or E2E phase if repeated |
| B. Access/StudentAccess | not allowlisted, missing causes confusion, unauthorized access, wrong content visible | high to stop | pause; compare allowlist/runbook; do not continue if unauthorized | ChatGPT + Mauricio | only if allowlisted and containment explicitly covers it | allowlist status, StudentAccess observation, visible program/load title | private access notes, secrets, real data | StudentAccess lifecycle phase if access is ambiguous |
| C. `/now` navigation | `/now` fails, runtime error, missing expected StudyLoad, extra unexpected load, non-M1 program | high to stop | pause on wrong program/load; one reload allowed for transient load issue | Mauricio + ChatGPT | only if expected PAES_M1 state returns without mutation | route, safe error class, expected vs observed title/status | stack traces with secrets, response bodies | technical UI/runtime phase if persistent |
| D. StudyLoad start | missing `Empezar`, click fails, route does not open, inconsistent activity state | medium to high | pause; one retry only if no state changed | Mauricio | only if no duplicate state/evidence created | button visibility, route transition, StudyLoad title/status | raw logs with sensitive values | technical phase if repeated |
| E. Activity rendering | wrong title, missing instructions/questions/options/counter/submit button | medium to stop | pause if wrong content or incomplete activity; no answer guessing | Mauricio + ChatGPT | only after expected content is confirmed | title, visible question count, option completeness, counter state | screenshots with private data | content/UI phase if persistent |
| F. Submission | cannot select answers, counter not 4/4, submit fails, duplicate evidence, incomplete submit, error after submit | high to stop | pause before retry if evidence may duplicate; do not submit again unless safe | Mauricio + ChatGPT | only if no duplicate/incomplete evidence risk | answer count, submit state, safe error summary | request/response body, tokens | technical phase if save/duplication risk |
| G. Self-report/completion | missing self-report, not saved, close fails, no return to `/now`, stuck in progress, completed without report | high | pause; do not force close or mutate state | Mauricio + ChatGPT | only if UI safely resumes without data mutation | self-report visibility/status, activity status, return path | raw payloads, DB state dumps | technical phase if completion integrity unclear |
| H. Continuity | no next load, wrong load, accidental second load start, multiple loads, unexpected decision/evaluation, cycle closes | high to stop | pause immediately; preserve state; do not start/close anything | Mauricio + ChatGPT | no, unless sandbox protocol explicitly covers the state | pending load title/status, decision/evaluation counts, cycle status | DB edits, raw IDs if sensitive | continuity/state technical phase |
| I. Admin/tutor evidence | missing student/enrollment/cycle/completed load/MC/self-report/pending load; unexpected decisions/evaluations | medium to stop | read-only admin review only; pause if evidence cannot be reviewed | Mauricio + ChatGPT | only if evidence appears without mutation | safe admin summary, counts, titles/statuses | secrets, private notes, real data | admin evidence phase if persistent |
| J. Data/safety | real data, token/secret/log, password/hash/env/DB URL, sensitive request/response body, personal data risk | stop | stop immediately; do not copy further; document sanitized incident only | no action except containment | no | incident class and remediation need, no raw values | all sensitive content | security/privacy phase required |
| K. Operator error | starts second load, wrong account, unplanned answers, forgot logout, copied sensitive evidence, wrong admin action | medium to stop | pause; classify impact; do not clean up by DB/auth improvisation | Mauricio + ChatGPT | only if evidence remains valid and no sensitive exposure | action class, affected phase boundary, safe visible result | sensitive copied content | protocol or technical cleanup phase if needed |
| L. Environment/Git | dirty Git, baseline divergence, server inactive, unsafe target, staging/prod suspicion, Codex simulates UI | stop | stop before action; re-anchor or open separate phase | ChatGPT/Codex | no | Git/status marker, target safety marker | env values, DB URLs | environment/governance phase |

## 8. Severity Model

Severity definitions:

* `low`: friction that does not affect identity, access, data, evidence, or scope. Continue only if documented.
* `medium`: issue may affect user flow but not evidence integrity or access. One safe retry may be allowed.
* `high`: issue may affect access, evidence, continuity, or participant experience. Pause unless the support path explicitly permits one safe non-mutating step.
* `stop`: issue involves safety, environment, secrets, unauthorized access, wrong program, data integrity, unexpected lifecycle state, or scope escalation. Abort the run and document a blocker.

## 9. Immediate Pause Criteria

Pause immediately if any of these occur:

* staging/production is suspected;
* real sensitive data appears;
* password, hash, env value, token, cookie, header, DB URL, provider value, storage value, request body, or response body is printed or needed;
* participant is not allowlisted;
* program is not `PAES_M1`;
* unauthorized load appears;
* evidence is lost, duplicated, corrupted, or ambiguous;
* cycle closes unexpectedly;
* CycleDecision or CycleEvaluation appears unexpectedly;
* auth failure requires code/auth/DB change;
* any fix would require manual DB mutation not already authorized;
* Git is dirty or baseline diverges before a phase;
* any action could convert the sandbox into public, paid, trial, subscription, L1/M2, staging-ready, or Sales-Ready posture.

## 10. Allowed Support Actions

Allowed support actions for a tiny sandbox:

* guide participant step by step;
* ask participant to stop and wait;
* use visible sign-out;
* reload page once if no data submission or state transition happened;
* switch to an authorized clean browser/incognito session if credential secrecy is preserved;
* stop the test;
* record a sanitized incident;
* perform read-only admin/tutor review;
* document synthetic evidence;
* create a later documentary or technical phase;
* repeat a step only when it cannot duplicate responses, evidence, loads, decisions, evaluations, or private data.

## 11. Prohibited Support Actions

Prohibited support actions:

* edit DB manually to repair evidence;
* change or share password in chat;
* print secrets;
* create an improvised account;
* create an improvised StudyLoad;
* delete evidence;
* close a cycle manually;
* create CycleDecision or CycleEvaluation to repair a flow;
* bypass StudentAccess outside the approved containment;
* change auth, schema, app code, seed, payment, trial, subscription, L1, or M2 inside sandbox support;
* continue on wrong program, wrong participant, unauthorized load, or sensitive data exposure;
* start the second load unless the future sandbox protocol explicitly says to validate it.

## 12. Evidence Capture Rules

Allowed evidence:

* safe route or page name without tokens;
* synthetic participant name/code;
* synthetic email, if applicable;
* StudyLoad title;
* load status;
* answer counter;
* self-report text;
* MC summary;
* safe admin/tutor evidence summary;
* incident class and short sanitized description;
* decision/evaluation counts;
* StudentAccess observation as present / missing / not checked.

Forbidden evidence:

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
* real sensitive personal data;
* screenshots containing unnecessary personal data or secrets.

## 13. Participant Communication Principles

Communication must be short, non-commercial, and non-promissory.

Allowed examples:

* `Estamos pausando esta prueba controlada para revisar tu acceso.`
* `Esta prueba es cerrada, no publica y solo de Matematica M1.`
* `No representa un diagnostico PAES completo.`
* `No activa pago, trial ni suscripcion.`
* `Tu evidencia de trabajo sera revisada por el equipo.`
* `Si algo no carga, no intentes avanzar; avisa al equipo.`

Do not promise scores, diagnosis, improvement, public availability, paid plan, subscription, autonomous tutor, adaptation, L1/M2 readiness, or MVP-Beta completeness.

## 14. Relationship With StudentAccess Containment

Support/failure path depends on HARDENING-5A:

* temporary access authority remains runbook + allowlist + controlled fixture + private credential custody;
* not allowlisted means pause;
* StudentAccess missing can be acceptable only when allowlisted and explicitly covered by containment;
* StudentAccess missing causing visual confusion is not automatically blocking if the runbook permits the participant and no unauthorized access appears;
* StudentAccess missing allowing unauthorized access, wrong content, or severe operational confusion requires pause and a later StudentAccess lifecycle phase;
* StudentAccess lifecycle remains blocker before broader closed pilot, staging with external users, and Sales-Ready/public.

## 15. Relationship With Participant / Data / Language Guardrails

HARDENING-5C must define:

* which participant types are allowed;
* which data is allowed or prohibited;
* whether any consent/communication note is required;
* language limits for sandbox;
* labels that avoid public, paid, diagnostic, adaptive, L1/M2, staging-ready, Sales-Ready, or MVP-Beta-complete implications.

Until 5C exists, this failure path is not enough to draft or execute a sandbox.

## 16. What Requires Later Technical Phase

Open a later technical phase if:

* login/session failure repeats or requires code/auth change;
* auth email normalization cannot be contained by canonical identity;
* `/now` runtime error persists;
* expected StudyLoad does not render despite correct fixture;
* submission/save behavior is unreliable;
* self-report/completion integrity is unclear;
* continuity creates wrong/multiple loads or unexpected decisions/evaluations;
* admin/tutor evidence is not visible enough for review;
* sign-out path fails operationally despite SIGNOUT-1R;
* Playwright/login E2E becomes required before staging or broader pilot;
* StudentAccess containment is insufficient for access governance.

## 17. Non-Declarations

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

## 18. Explicit Non-Actions

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
* print secrets, env values, DB URLs, tokens, cookies, headers, request bodies, response bodies, passwords, hashes, provider values, or storage values.

## 19. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-HARDENING-5C - Define participant/data and language guardrails
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for controlled closed-pilot progression, not sufficient for public Sales-Ready.
* Dependency: DIRECTION-1A gate, HARDENING-5 sequence, HARDENING-5A StudentAccess containment, and this support/failure path.
* What it advances: defines participant/data/language boundaries required before drafting a closed M1-first sandbox runbook.
* What it does not advance: sandbox execution, staging execution, implementation, StudentAccess lifecycle, auth repair, Playwright E2E, public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, or payment/trial/subscription.
* Priority verdict: `APPROVED_NEXT_SMALL_GOVERNANCE_PHASE_PARTICIPANT_DATA_LANGUAGE_GUARDRAILS`
* Authorization status: requires separate explicit authorization before execution.

## 20. Final Verdict

Final verdict:

```text
SUPPORT_FAILURE_PATH_DEFINED_FOR_TINY_HUMAN_GUIDED_SANDBOX
```

The minimum support/failure path is defined for a future tiny, human-guided, non-public, non-commercial, PAES_M1-only sandbox. It supports containment planning but does not declare sandbox readiness and does not authorize execution.

## Result Marker

```text
MVP_SALES_PILOT_HARDENING_5B_SUPPORT_FAILURE_PATH_DEFINED_FOR_TINY_HUMAN_GUIDED_SANDBOX
```
