# MVP-SALES-PILOT-DRY-RUN-2A - Prepare controlled local/dev dry-run for PILOT_M1_002

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-2A - Prepare controlled local/dev dry-run for PILOT_M1_002
```

Type:

```text
Documentation-only readiness preparation / no runtime / no mutation / no pilot execution.
```

Baseline confirmed by Git preflight:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = 2522b2e
```

Latest accepted commit:

```text
2522b2e - MVP-SALES-PILOT-GO-1: evaluate pilot readiness after Gate 1
```

Required phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

Git preflight is the live truth. The older baseline still present in `MVP_SALES_READY_ACTIVE_CONTEXT.md` was treated as stale because live Git confirmed `2522b2e`.

## 2. Objective

Prepare, without executing, the second controlled local/dev M1-first pilot dry-run for synthetic participant:

```text
PILOT_M1_002
```

This phase determines whether there is a safe documented path for a later execution phase.

This phase does not:

* execute the dry-run;
* create evidence;
* complete activities;
* modify roadmap;
* create users, enrollments, cycles, StudyLoads, or credentials.

## 3. Roadmap Context

Roadmap block:

```text
10 - Internal pilot and sales-ready go/no-go
```

Inherited state:

```text
Gate 1 = functionally satisfied
GO-1 = GO_WITH_RECORDED_DEBT
No documented blocker for controlled expansion
Residual debt = ADMIN_UI_TITLE_VISIBILITY_DEBT
```

M1-first remains a tactical first vertical. It does not reduce MVP-Beta cerrado, which remains M1/M2/L1.

## 4. Inherited Evidence

Evidence from `PILOT_M1_001`:

* Student login succeeded.
* `/now` loaded.
* M1 StudyLoad opened/rendered.
* Controlled answers were submitted.
* StudyLoad completion succeeded.
* Self-report was recorded.
* Continuity produced/observed a next pending M1 activity.
* Admin/tutor evidence path was accessible.
* Admin/tutor evidence showed enrollment and cycle persistence.
* Admin/tutor evidence showed completed/pending operational shape.
* Self-report visibility was confirmed in admin UI.
* M1-only scope boundaries were correct.
* No L1/M2 active implication was observed.
* No payment, trial, subscription, staging, or production implication was observed.

Inherited debts:

* `ADMIN_UI_TITLE_VISIBILITY_DEBT`: exact full StudyLoad titles are not yet crisply confirmed as full visible admin UI strings.
* Playwright login E2E remains paused as automation debt.

## 5. Readiness Criteria

Minimum requirements for `PILOT_M1_002` before execution:

1. Participant is a synthetic local/dev pilot participant, not real student data.
2. Participant identity and email are known only at safe label level in docs.
3. Local/dev auth path is available without exposing password, hash, token, cookie, header, DB URL, or env value.
4. PAES_M1 enrollment exists or is created only in a separately authorized setup phase.
5. Initial cycle and first M1 StudyLoad readiness are verified only through an authorized preparation/execution path.
6. `/now` remains M1-only and closed-pilot scoped.
7. No L1/M2 activation is introduced.
8. No payment/trial/subscription activation is introduced.
9. Admin/tutor review remains available after the run.
10. Stop rules from the first dry-run pattern are preserved: do not proceed through unclear auth, wrong program, wrong scope, missing activity, unsafe claims, or any mutation outside the planned student flow.

## 6. Dependencies

Dependencies inherited from `PILOT_M1_001`:

* A local/dev synthetic credential path may be needed.
* A safe local/dev participant fixture may be needed.
* `/login` and `/now` must be available locally.
* PAES_M1 must be the active pilot program for the participant.
* Initial StudyLoad must be present before execution.
* Student flow mutations, if later authorized, must remain normal app-flow mutations only.
* Admin evidence review must remain read-only after execution.

Dependencies not verified in this phase:

* Whether `PILOT_M1_002` already exists locally.
* Whether `PILOT_M1_002` has a usable credential.
* Whether `PILOT_M1_002` already has PAES_M1 enrollment/cycle/StudyLoad.

Those checks would require either runtime/admin UI verification or DB-backed setup work, which this phase does not perform.

## 7. Risks

Risks before execution:

* `PILOT_M1_002` may not yet have a local/dev fixture.
* `PILOT_M1_002` may not yet have a usable synthetic credential.
* The participant may not yet have PAES_M1 enrollment/cycle/StudyLoad readiness.
* The same auth/manual-login handling may be required.
* The admin exact-title visibility debt remains open.
* The path has only been completed once so participant-specific gaps may appear.
* Running without a private participant register or operator checklist could blur scope boundaries.

Risks that are not blockers to preparation:

* L1 not ready.
* M2 not ready.
* Payment/trial/subscription not ready.
* Playwright login E2E unresolved.
* Exact admin title visibility debt.

These remain explicitly out of scope for this M1-only local/dev preparation.

## 8. Preparation Assessment

Assessment:

```text
READY_WITH_RECORDED_DEBT
```

Rationale:

* The first participant established the student-product-admin loop.
* Gate 1 is functionally satisfied.
* GO-1 found no real blocker before controlled local/dev repetition.
* Required execution boundaries are known.
* The remaining admin UI title visibility debt is documented and non-blocking for controlled repetition.
* Unknown `PILOT_M1_002` fixture/credential/enrollment state must be verified in a later authorized setup/readiness or execution phase before runtime actions occur.

This is not `READY_FOR_DRY_RUN` because debts and unverified participant-specific dependencies remain.

This is not `BLOCKED` because no documented blocker prevents preparing the path.

## 9. Result Classification

Result:

```text
READY_WITH_RECORDED_DEBT
```

Meaning:

The project can proceed to a separately scoped phase that safely verifies or sets up `PILOT_M1_002` prerequisites before executing the second dry-run. The dry-run itself is not authorized by this phase.

## 10. Recommendation

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-2B - Verify or prepare local/dev fixture readiness for PILOT_M1_002
```

Recommended scope for next phase:

* Confirm whether `PILOT_M1_002` exists as a synthetic local/dev participant.
* Confirm whether a guarded credential setup is required.
* Confirm whether PAES_M1 enrollment/cycle/initial StudyLoad readiness exists or requires a separately authorized setup action.
* Keep secrets out of logs and docs.
* Do not execute the dry-run yet unless a later phase explicitly authorizes execution.

## 11. What Must Happen Before Execution

Before executing the `PILOT_M1_002` dry-run:

1. Confirm local/dev target only.
2. Confirm synthetic participant identity at safe label level.
3. Confirm or create credential only through an explicitly authorized guarded setup phase.
4. Confirm or create fixture/enrollment/cycle/StudyLoad only through an explicitly authorized setup phase.
5. Confirm manual login procedure without sharing credentials.
6. Confirm M1-only `/now` scope.
7. Confirm no L1/M2, payment, trial, subscription, staging, or production path is involved.
8. Define stop rules and observation checklist.
9. Define post-run admin evidence check.

## 12. Explicit Non-actions

This phase did not:

* use SQL;
* run Prisma CLI;
* inspect DB;
* mutate DB;
* mutate browser or UI state;
* perform login;
* execute activity;
* perform StudyLoad actions;
* start a StudyLoad;
* complete a StudyLoad;
* edit a StudyLoad;
* perform cycle actions;
* perform StudentAccess actions;
* touch staging;
* touch production;
* create users;
* create enrollments;
* create cycles;
* create StudyLoads;
* create credentials;
* request or print secrets;
* request or print env values;
* request or print DB URLs;
* request or print tokens, cookies, or headers;
* print request bodies;
* print response bodies;
* execute the `PILOT_M1_002` dry-run;
* modify roadmap;
* declare Sales-Ready;
* declare MVP-Beta cerrado complete;
* declare L1 ready;
* declare M2 ready.

## Result Marker

```text
MVP_SALES_PILOT_DRY_RUN_2A_READY_WITH_RECORDED_DEBT_FOR_PILOT_M1_002
```
