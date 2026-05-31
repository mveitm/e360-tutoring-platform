# MVP-SALES-PILOT-DRY-RUN-2E - Execute controlled local/dev student dry-run for PILOT_M1_002

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-2E - Execute controlled local/dev student dry-run for PILOT_M1_002
```

Type:

```text
Human-guided local/dev student dry-run / normal student runtime mutations / documentation closeout.
```

Baseline confirmed before documentation closeout:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = b13eb89
```

Relevant accepted commits:

```text
7fb5809 - MVP-SALES-PILOT-DRY-RUN-2D: complete PAES_M1 enrollment readiness for PILOT_M1_002
b13eb89 - MVP-SALES-PILOT-DRY-RUN-2F: repair PILOT_M1_002 auth account linkage
```

Required phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

Git preflight is the live truth for this closeout. `2E` was attempted after `2D`, paused for auth/account linkage repair, and then completed after `2F`.

## 2. Objective

Execute a controlled local/dev student dry-run for synthetic participant `PILOT_M1_002`, using the fixture validated in 2D and the auth/account linkage repaired in 2F.

The objective was to verify the student circuit from login through `/now`, first M1 StudyLoad execution, response submission, completion/self-report, and basic M1 continuity.

## 3. Roadmap Context

Roadmap block:

```text
10 - Internal pilot and sales-ready go/no-go
```

This is part of the controlled M1-first pilot repetition path. It does not declare public Sales-Ready, MVP-Beta cerrado completion, L1 readiness, M2 readiness, payment readiness, trial readiness, or subscription readiness.

## 4. Execution Mode

Execution mode:

```text
HUMAN_GUIDED_STUDENT_RUN
```

Reason:

* Codex did not have authenticated browser/UI control for the private student credential.
* The dry-run required a credential that Codex could not ask for, receive, print, store, or log.
* Mauricio executed the student flow locally and reported safe observations only.

## 5. Inherited Readiness From 2D and 2F

Inherited from 2D:

* canonical `PILOT_M1_002` selected;
* account existed;
* PAES_M1 enrollment active;
* Cycle 1 open;
* first StudyLoad pending: `PAES M1 — Entrada balanceada inicial`;
* no student dry-run had been executed.

Inherited from 2F:

* auth/account linkage repaired for `PILOT_M1_002`;
* Student/User email alignment normalized for the canonical synthetic account;
* no password was printed or changed by Codex;
* no StudentAccess, enrollment, cycle, or StudyLoad was touched in 2F.

## 6. Student-Flow Steps Executed

Human-guided local/dev student flow executed:

1. Student login completed successfully using the normalized synthetic email after 2F.
2. `/now` loaded.
3. Closed PAES_M1 pilot copy was observed.
4. Initial pending StudyLoad was visible: `PAES M1 — Entrada balanceada inicial`.
5. `Empezar` was pressed.
6. Activity opened and rendered.
7. Four questions rendered.
8. Controlled synthetic answers were selected.
9. Answer counter reached `4 of 4`.
10. Responses were submitted.
11. Saved-response confirmation was shown.
12. Correctness summary showed `4 of 4`.
13. Self-report `Me fue bien` was selected.
14. Activity was finalized.
15. Student returned correctly to `/now`.

## 7. Evidence Observed

Initial `/now` observations:

* `Bexauri / ¿Qué me toca ahora?`;
* `Piloto cerrado`;
* `Piloto cerrado PAES M1`;
* program `PAES_M1 / PAES Matemática M1`;
* closed pilot copy visible;
* L1 and M2 explicitly not active;
* no public sale, paid plan, payment, trial, or subscription activation.

Initial pending load:

```text
PAES M1 — Entrada balanceada inicial
practice
```

Activity evidence:

* title: `PAES M1 — Entrada balanceada inicial`;
* four questions rendered;
* answer counter reached `4 of 4`;
* response submission succeeded;
* UI confirmed responses were saved;
* UI confirmed `4 of 4` exercises answered;
* UI confirmed `4 of 4` correct;
* self-report selected: `Me fue bien`.

Post-completion `/now` observations:

Pending loads:

```text
PAES M1 — Ecuaciones lineales básicas
practice
```

Registered activities:

```text
PAES M1 — Entrada balanceada inicial
practice
Tu reporte: Me fue bien
```

## 8. Runtime Mutations Performed

Authorized normal local/dev student runtime mutations performed:

* student login/session;
* StudyLoad start/open transition;
* controlled synthetic MC answer submission;
* StudyLoad completion;
* self-report recording;
* completed-work visibility;
* automatic M1 continuity to the next pending StudyLoad.

No admin mutation was performed after the dry-run.

## 9. Continuity Result

Continuity result:

```text
EXPECTED_M1_CONTINUITY_OBSERVED_AFTER_COMPLETION
```

The expected next M1 pending activity appeared after completion:

```text
PAES M1 — Ecuaciones lineales básicas
```

No second StudyLoad was started.

## 10. Scope Boundaries

Observed scope boundaries:

* L1 and M2 explicitly not active;
* no public sale claim;
* no paid plan claim;
* no payment activation;
* no trial activation;
* no subscription activation.

Execution boundaries preserved:

* no new activity opened after completion;
* no second StudyLoad started;
* no admin action after dry-run;
* no CycleDecision;
* no CycleEvaluation;
* no staging;
* no production;
* no Sales-Ready declaration;
* no MVP-Beta cerrado completion declaration.

## 11. Result Classification

Result:

```text
PILOT_M1_002_STUDENT_DRY_RUN_PASSED
```

Rationale:

* login succeeded after 2F auth/account linkage repair;
* `/now` loaded;
* closed M1-first pilot copy was visible;
* initial pending StudyLoad was visible and opened;
* activity rendered;
* controlled answers were submitted;
* completion and self-report succeeded;
* post-completion `/now` loaded;
* completed activity was visible with self-report;
* expected next pending M1 activity was visible;
* no prohibited scope expansion or admin/governance mutation occurred.

## 12. Residual Risks

Residual risks:

* StudentAccess row was previously observed missing and remains a separate runtime/access lifecycle debt unless later verified or repaired under a dedicated phase.
* Admin/tutor evidence for the `PILOT_M1_002` dry-run has not yet been verified after this completion.
* Playwright login E2E remains paused as bounded automation debt.
* Duplicate/candidate `PILOT_M1_002` cleanup remains a documentation/data hygiene debt; this dry-run used the 2D/2F canonical record.

## 13. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-ADMIN-EVIDENCE-3 - Verify admin/tutor evidence for PILOT_M1_002 dry-run
```

Recommended scope:

* local/dev admin/tutor UI read-only;
* verify completed StudyLoad, response evidence, self-report, and next pending StudyLoad for canonical `PILOT_M1_002`;
* do not execute another student activity;
* do not mutate StudentAccess, cycle, decisions, evaluations, payment, trial, subscription, L1, or M2.

## 14. Explicit Non-actions

This phase did not:

* open a new activity after completion;
* start the second StudyLoad;
* complete the second StudyLoad;
* perform admin action after dry-run;
* create CycleDecision;
* create CycleEvaluation;
* touch StudentAccess;
* use SQL;
* run Prisma CLI;
* inspect DB directly;
* mutate DB outside normal student runtime flow;
* modify app code;
* modify schema;
* change auth;
* touch staging;
* touch production;
* use real data;
* activate L1;
* activate M2;
* activate payment;
* activate trial;
* activate subscription;
* declare Sales-Ready;
* declare MVP-Beta cerrado complete;
* print password;
* print hash;
* print DB URL;
* print env values;
* print provider targets;
* print tokens;
* print cookies;
* print headers;
* print request bodies;
* print response bodies;
* commit screenshots;
* commit logs.

## Result Marker

```text
MVP_SALES_PILOT_DRY_RUN_2E_PILOT_M1_002_STUDENT_DRY_RUN_PASSED
```
