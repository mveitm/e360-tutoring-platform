# MVP-SALES-PILOT-HARDENING-2 - Define controlled next M1 participant protocol

## 1. Phase Identity

Phase:

```text
MVP-SALES-PILOT-HARDENING-2 - Define controlled next M1 participant protocol
```

Type:

```text
Documentation-only / protocol-only.
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
HEAD = origin/main = origin/HEAD = 9738267
```

Latest accepted commit:

```text
9738267 - MVP-SALES-PILOT-HARDENING-1: define limited M1-first pilot hardening plan
```

Git preflight is the live truth. Historical baselines inside older documents are treated as historical context only.

## 3. Context Gate Read

Context gate documents read before writing:

* `MVP_ROADMAP_LOCK_1_MVP_BETA_CLOSED_CONSTITUTION.md`
* `MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE.md`
* `MVP_SALES_READY_ACTIVE_CONTEXT.md`
* `MVP_SALES_READY_ROADMAP.md`
* `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`
* `MVP_SALES_PILOT_GO_3_EVALUATE_PILOT_READINESS_AFTER_PILOT_M1_003_EVIDENCE.md`
* `MVP_SALES_PILOT_HARDENING_1_DEFINE_LIMITED_M1_FIRST_PILOT_HARDENING_PLAN_AFTER_THREE_LOCAL_DEV_PARTICIPANTS.md`
* `MVP_SALES_PILOT_DRY_RUN_3C_EXECUTE_CONTROLLED_LOCAL_DEV_STUDENT_DRY_RUN_FOR_PILOT_M1_003.md`
* `MVP_SALES_AUTH_SIGNOUT_1R_REPAIR_VISIBLE_SIGNOUT_RUNTIME_REGRESSION.md`
* `PHASE_LOG.md` tail

Context gate interpretation:

* M1-first remains a tactical first vertical and does not reduce MVP-Beta cerrado scope.
* MVP-Beta cerrado remains M1/M2/L1.
* Sales-Ready public remains `NOT_READY`.
* This phase defines protocol only; it does not prepare a fixture, execute a dry-run, or mutate data.

## 4. Protocol Purpose

Purpose:

```text
Define a reusable operating protocol and checklist for the next controlled M1-first participant before creating a fourth fixture or executing another dry-run.
```

The protocol prevents:

* informal execution;
* scope creep from M1-first into public Sales-Ready claims;
* evidence loss;
* session confusion between admin and student;
* accidental start of the second StudyLoad;
* unsafe copying of credentials, cookies, tokens, headers, request bodies, response bodies, env values, or DB URLs.

## 5. Evidence Basis

Evidence basis after three local/dev participants:

* `PILOT_M1_001`: dry-run local/dev passed; admin evidence functionally satisfied; `ADMIN_UI_TITLE_VISIBILITY_DEBT` recorded.
* `PILOT_M1_002`: dry-run passed; admin/tutor evidence fully confirmed; continuity observed toward `PAES M1 - Ecuaciones lineales basicas`; auth/account linkage repaired.
* `PILOT_M1_003`: dry-run passed; login -> `/now` -> start `PAES M1 - Entrada balanceada inicial` -> answer 4/4 MC -> submit responses -> self-report `Me fue bien` on the same page -> completion -> `/now` with registered activity and new pending `PAES M1 - Ecuaciones lineales basicas`; admin/tutor evidence visible with Cycle 1 open, 2 loads, completed 1, pending 1, 0 decisions, and 0 evaluations.
* SIGNOUT-1R: `/now` and `/admin` use `/api/session/sign-out`; endpoint expires NextAuth cookies and redirects to `/login`; human-guided sign-out was functionally confirmed.

Inherited from HARDENING-1:

* Required before next controlled M1-first step: participant protocol, sign-out procedure, no second-load start boundary, evidence expectations, no scope escalation.
* Recommended: operator checklist, StudentAccess observation, admin title check, sign-out observation, auth normalization, failure taxonomy.
* Can wait: complete StudentAccess lifecycle, self-serve signup/enrollment, payment/trial/subscription, L1/M2, legal/support, Playwright E2E, staging/production.

## 6. Participant Identity Policy

Participant identity policy:

1. Use only a synthetic or explicitly controlled participant identity.
2. Do not use real sensitive student data in repo documentation.
3. Use a canonical participant code before any setup phase, for example:

```text
PILOT_M1_004
```

4. Use canonical lowercase email format before any setup phase, for example:

```text
pilot_m1_004_pilot_m1_004@bexauri.dev
```

5. Use canonical display name format before any setup phase, for example:

```text
PILOT_M1_004 PILOT_M1_004
```

6. Any Student/User/Account/Enrollment/LearningCycle/StudyLoad preparation must happen in a separate explicitly authorized future phase.
7. Do not mix admin and student browser sessions.
8. Do not reuse an admin session as a student session.
9. Do not ask Mauricio to share a password, hash, token, cookie, header, env value, DB URL, provider value, storage value, request body, or response body.
10. If identity linkage appears inconsistent, pause and classify under `account linkage` or `auth/session` before continuing.

## 7. Pre-Run Readiness Checklist

Before a future controlled participant run, confirm:

```text
Git baseline confirmed and worktree clean.
Local/dev target confirmed.
Local/dev server active.
Admin login available to Mauricio.
Student login/private credential available to Mauricio only.
Visible sign-out available.
Sign-out returns to /login.
Fixture prepared in a separate prior phase.
Student/User/Enrollment/Cycle/StudyLoad readiness documented.
First expected StudyLoad is pending.
No prior completed run exists for the selected participant unless intentionally resuming.
No L1/M2 activation.
No payment/trial/subscription activation.
No public/Sales-Ready claim.
```

Expected first StudyLoad:

```text
PAES M1 - Entrada balanceada inicial
```

Expected next pending StudyLoad after completion:

```text
PAES M1 - Ecuaciones lineales basicas
```

Hard stop before run:

* Git is not clean.
* `HEAD`, `origin/main`, or `origin/HEAD` diverges unexpectedly.
* fixture was not prepared in a separate phase.
* private credential is not ready.
* sign-out cannot return to `/login`.
* student account/linkage is ambiguous.
* real sensitive data would need to be copied.

## 8. Human-Guided Execution Protocol

Execution posture:

```text
HUMAN_GUIDED_STUDENT_RUN_WITH_CODEX_DOCUMENTATION_CONTROL
```

Protocol:

1. ChatGPT/Codex provides the exact next step and expected observation.
2. Mauricio performs only the human/private UI action when credentials or browser session control are required.
3. Mauricio reports only safe operational observations.
4. Do not paste credentials, cookies, tokens, headers, request bodies, response bodies, env values, DB URLs, passwords, hashes, provider values, or storage values.
5. Do not jump from `/now` to admin until the student-flow checklist is complete or a pause criterion is met.
6. Do not start the next pending StudyLoad after the first activity closes.
7. If any unexpected state appears, stop and classify it before proceeding.
8. Admin/tutor evidence review happens after student completion unless a failure requires earlier admin inspection.
9. Every material observation must be tied to a checklist item.
10. The run closes with a documentation phase, commit, push, and compact report.

## 9. Student Flow Checklist

Expected student flow:

1. Student login succeeds.
2. `/now` loads.
3. Closed M1-first pilot context is visible.
4. First StudyLoad is visible:

```text
PAES M1 - Entrada balanceada inicial
```

5. StudyLoad initial state is pending/prepared.
6. `Empezar` is visible and active.
7. Student clicks `Empezar`.
8. Activity page renders.
9. Activity title is visible:

```text
PAES M1 - Entrada balanceada inicial
```

10. Activity type is visible:

```text
practice
```

11. Instructions are visible.
12. Four MC questions are visible.
13. Counter starts at `0 de 4 respondidas`.
14. Student selects controlled answers.
15. Counter reaches `4 de 4 respondidas`.
16. `Enviar respuestas` works.
17. Self-report appears on the same page.
18. Student enters/selects safe self-report text, for example:

```text
Me fue bien.
```

19. Completion succeeds.
20. `/now` shows registered activity.
21. `/now` shows next pending load:

```text
PAES M1 - Ecuaciones lineales basicas
```

22. The next pending load is not started.

## 10. Admin/Tutor Evidence Checklist

Expected admin/tutor evidence:

```text
Student identifiable by canonical synthetic name and email.
Enrollment PAES_M1 active.
Cycle 1 open.
Total loads expected: 2.
Completed loads expected: 1.
Pending loads expected: 1.
Completed load: PAES M1 - Entrada balanceada inicial.
Pending load: PAES M1 - Ecuaciones lineales basicas.
MC submission visible.
Answered count visible, expected 4 de 4.
Correct count visible if available, expected 4 de 4 for controlled known-answer run.
Self-report visible.
Cycle decisions: 0 unless explicitly authorized otherwise.
Cycle evaluations: 0 unless explicitly authorized otherwise.
StudentAccess observation recorded.
```

StudentAccess rule:

* `StudentAccess` present, missing, or not checked must be recorded.
* A missing row is not an automatic blocker for the next controlled local/dev M1-first run unless it blocks login, `/now`, enrollment visibility, StudyLoad visibility, or access semantics in the actual run.
* A missing row remains lifecycle debt before Sales-Ready/public access claims.

Admin title visibility rule:

* If full StudyLoad titles are visible, record that.
* If title visibility is partial or unclear, keep `ADMIN_UI_TITLE_VISIBILITY_DEBT` recorded.
* Do not treat title polish as a runtime blocker unless evidence cannot be reviewed.

## 11. Success Criteria

A future controlled M1-first participant run may be classified as passed only if:

* student login succeeds;
* `/now` loads;
* first StudyLoad is visible and started;
* activity renders;
* four MC answers are submitted;
* self-report appears on the same page;
* completion succeeds;
* `/now` shows registered activity;
* next pending M1 StudyLoad is visible;
* no second load is started;
* admin/tutor evidence is visible enough to review the completed run;
* StudentAccess observation is recorded;
* no L1/M2, payment, trial, subscription, public commercial, diagnostic automation, autonomous adaptation, mastery/theta/PAES score, autonomous AI tutor, or large-cohort claim is made;
* no secrets or sensitive values are printed.

## 12. Pause / Failure Criteria

Pause immediately if:

* Git is not clean before a documentation or execution phase.
* `HEAD`, `origin/main`, or `origin/HEAD` diverges unexpectedly.
* student login fails.
* sign-out fails or does not return to `/login`.
* `/now` fails to load.
* first StudyLoad is missing.
* wrong StudyLoad is visible.
* activity does not render.
* MC responses cannot be selected.
* response submission fails.
* self-report does not appear.
* completion fails.
* post-completion `/now` does not show registered activity.
* next pending load is missing.
* next pending load is accidentally started.
* admin/tutor evidence is not visible enough to review.
* StudentAccess state appears to block runtime access.
* real sensitive data appears.
* a password, token, cookie, header, env value, DB URL, request body, response body, hash, provider value, or storage value would need to be copied.
* any UI suggests Sales-Ready public, payment/trial/subscription activation, L1 readiness, or M2 readiness.

Pause result must be documented as a bounded failure or blocker. Do not continue by improvisation.

## 13. Failure Taxonomy

Use this taxonomy for any future pause:

* `AUTH_SESSION_FAILURE`: login, logout, session switching, cached credentials, or sign-out issue.
* `ACCOUNT_LINKAGE_FAILURE`: Student/User/Account/email mismatch or ambiguous identity.
* `UI_RENDERING_FAILURE`: `/now` or activity UI fails to render expected content.
* `ACTIVITY_SUBMISSION_FAILURE`: MC answer selection or response submission fails.
* `SELF_REPORT_CLOSURE_FAILURE`: self-report is missing, cannot be submitted, or completion fails.
* `CONTINUITY_ROUTING_FAILURE`: next expected M1 pending load does not appear after completion.
* `ADMIN_EVIDENCE_VISIBILITY_FAILURE`: admin/tutor cannot review completed evidence.
* `STUDENTACCESS_LIFECYCLE_FAILURE`: StudentAccess state blocks or contradicts expected controlled access.
* `OPERATOR_ERROR`: wrong participant, wrong session, wrong action order, accidental second-load start, or skipped checklist step.
* `BROWSER_SESSION_CACHE_FAILURE`: stale session, cached admin/student state, or browser credential confusion.
* `SCOPE_ESCALATION_FAILURE`: UI or documentation implies public sale, payment/trial/subscription, L1/M2 readiness, or autonomous capability.
* `SECRET_EXPOSURE_RISK`: any sensitive value appears or would need to be copied.

## 14. Evidence Capture Rules

Allowed to capture:

* synthetic participant code;
* synthetic email;
* safe route paths;
* visible StudyLoad titles;
* StudyLoad status names;
* counts such as completed/pending loads;
* MC answered/correct counts;
* safe selected answers if they are synthetic test answers;
* safe self-report text;
* visible metadata such as contentKey/contentVersion/programCode when already shown in UI;
* decision/evaluation counts;
* StudentAccess observation as present/missing/not checked;
* non-sensitive error class from the failure taxonomy.

Do not capture:

* passwords;
* hashes;
* tokens;
* cookies;
* headers;
* env values;
* DB URLs;
* provider values;
* storage values;
* request bodies;
* response bodies;
* raw logs containing sensitive material;
* screenshots containing secrets or real private data;
* real student personal data.

Screenshots are not required. If screenshots are ever used in a future phase, they must be explicitly authorized and reviewed for sensitive content before any commit.

## 15. Post-Run Closeout

After a future controlled participant run:

1. Document the run in a dedicated phase document.
2. Update `PHASE_LOG.md`.
3. Include:
   * baseline;
   * participant code;
   * execution mode;
   * student-flow result;
   * admin/tutor evidence result;
   * StudentAccess observation;
   * debts;
   * blockers;
   * non-declarations;
   * explicit non-actions;
   * recommended next phase.
4. Run:

```text
git diff --check
git status --short
```

5. Do not run build unless code changed.
6. Commit documentation with a narrow phase message.
7. Push to `origin/main`.
8. Report compactly:
   * Phase;
   * Baseline before;
   * Result;
   * Files changed;
   * Verification;
   * Commit hash;
   * Push status;
   * Recommended next phase;
   * Explicit non-actions.

## 16. Scope Boundaries And Non-Declarations

Verification completed:

```text
git diff --check: PASS
git status --short: REVIEWED
```

No build was required because this phase changed documentation only.

This protocol does not declare:

* Sales-Ready public;
* Sales-Ready cerrado;
* MVP-Beta cerrado complete;
* L1 readiness;
* M2 readiness;
* payment active;
* trial active;
* subscription active;
* public commercial plan;
* diagnostic automation;
* autonomous adaptation;
* mastery, theta, or PAES score readiness;
* autonomous AI tutor readiness;
* large cohort readiness;
* self-serve signup readiness;
* self-serve enrollment readiness;
* production readiness;
* staging readiness.

This protocol does not authorize:

* implementation;
* UI execution;
* DB mutation;
* Student/User/Account creation;
* Enrollment creation;
* LearningCycle creation;
* StudyLoad creation;
* StudyLoad start;
* cycle close;
* CycleDecision creation;
* CycleEvaluation creation;
* app code changes;
* schema changes;
* seed changes;
* auth changes;
* CredentialsProvider changes;
* StudentAccess lifecycle changes;
* payment/trial/subscription changes;
* L1/M2 changes;
* staging/production work.

## 17. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-HARDENING-3 - Prepare controlled next M1 participant fixture
```

Recommended roadmap gate classification:

* Roadmap block: `10 - Internal pilot and sales-ready go/no-go`, with dependencies on Block 8 admin/tutor operations and Block 7 M1 evidence route.
* Sales-ready relevance: direct for closed pilot readiness, not sufficient for public Sales-Ready.
* Dependency: this protocol, GO-3, and HARDENING-1.
* What it advances: prepares the next controlled synthetic M1-first participant under the protocol before any dry-run execution.
* What it does not advance: public Sales-Ready, MVP-Beta cerrado M1/M2/L1 completion, L1/M2 readiness, payment/trial/subscription, production/staging, autonomous diagnosis, or large-cohort readiness.
* Priority verdict: `APPROVED_NEXT_CONTROLLED_M1_FIRST_FIXTURE_PREP_WITH_PROTOCOL`.
* Authorization status: requires separate explicit authorization before execution.

## 18. Final Recommendation

Final recommendation:

```text
PROCEED_TO_HARDENING_3_PREPARE_CONTROLLED_NEXT_M1_PARTICIPANT_FIXTURE
```

The next phase should prepare the next controlled synthetic M1-first participant fixture under this protocol. It should not execute the student run in the same phase, start a second StudyLoad, mutate StudentAccess unless separately authorized, or make Sales-Ready/MVP-Beta/L1/M2/payment/trial/subscription claims.

## Result Marker

```text
MVP_SALES_PILOT_HARDENING_2_CONTROLLED_NEXT_M1_PARTICIPANT_PROTOCOL_DEFINED
```
