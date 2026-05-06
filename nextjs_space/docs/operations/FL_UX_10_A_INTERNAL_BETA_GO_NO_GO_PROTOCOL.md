# FL-UX-10-A — Internal Beta Go/No-Go Protocol

**Phase:** FL-UX-10-A  
**Date:** 2026-05-06  
**Baseline:** `4f21c82` (FL-UX-9-BETA-0: consolidate Cycle 4 to 5 beta readiness evidence)  
**Type:** documentation-only — no production mutation  

---

## 1. Executive Summary

### Current readiness verdict

**BETA_INTERNAL_READY_WITH_MANUAL_GUARDRAILS**

### What has been validated

A full manual MVP learning regulation loop has been validated for one student (Mauricio Beta-M1 / PAES_M1) across four completed cycles and one opened cycle. The chain includes curated content, autonomous student execution, MC evidence capture, self-report, admin evidence review, evidence-backed cycle decisions, cycle closure, continuity authorization, and next-cycle opening.

### What is allowed next

- Tightly guided internal beta with 1–3 students.
- Manual cycle operations following the validated 11-step workflow.
- Content curation from the existing registry.
- Documentation-only planning for broader readiness.

### What is not allowed yet

- Public beta or external student access.
- Unattended or automated cycle management.
- Adaptive/AI-driven pedagogical claims.
- Score-based or PAES-predictive claims.
- Scaling beyond 3 students without a phase upgrade.

---

## 2. Internal Beta Readiness Verdict

### BETA_INTERNAL_READY_WITH_MANUAL_GUARDRAILS

| Dimension | Status |
|-----------|--------|
| Tightly guided internal beta (1–3 students) | **READY** |
| Public beta | **NOT READY** |
| Unattended scale | **NOT READY** |
| Automated/adaptive claims | **NOT READY** |

**Meaning:** The platform can support a small number of internal students under continuous human-admin supervision. Every cycle operation is manual. No automation, scoring interpretation, or adaptive logic exists. The operator must curate content, review evidence, make decisions, and manage continuity for each student individually.

---

## 3. Validated MVP Loop

The following 11-step manual learning regulation loop has been validated end-to-end through Cycle 4 execution and Cycle 5 opening:

| Step | Action | Actor | Validated |
|------|--------|-------|-----------|
| 1 | Curated StudyLoad | Admin | ✅ |
| 2 | Student visibility | Student | ✅ |
| 3 | Student start | Student | ✅ |
| 4 | MC response submission | Student | ✅ |
| 5 | StudyLoad completion | Student | ✅ |
| 6 | Self-report | Student | ✅ |
| 7 | Admin evidence review | Admin | ✅ |
| 8 | Evidence-backed CycleDecision | Admin | ✅ |
| 9 | Cycle close | Admin | ✅ |
| 10 | Continuity authorization | Admin | ✅ |
| 11 | Next cycle opening | Admin | ✅ |

### Evidence from Cycle 4

- Content: "PAES M1 — Funciones lineales básicas" (paes_m1_linear_functions_basic v1)
- MC evidence: 8/8 answered, 8/8 correct
- Self-report: "Me fue bien"
- CycleDecision: advance (evidence-backed rationale)
- Cycle 5 opened with fallback StudyLoad auto-created

---

## 4. What Is Ready Now

1. **Student can work autonomously inside the app** for a curated StudyLoad — navigate `/now`, view activity, start, answer MC exercises, complete, and submit self-report.
2. **MC evidence can be captured** — individual responses are stored with answer keys, enabling correctness determination.
3. **Self-report can be captured** — student's self-assessment text is stored and displayed.
4. **Admin can review item-level evidence** — MC results (correct count, individual responses) and self-report are visible in the admin UI.
5. **Admin can create evidence-backed CycleDecision** — decision type (advance/reinforce/hold/redirect) with free-text rationale citing specific evidence.
6. **Admin can close cycle** — formal state transition from open to closed.
7. **Admin can authorize continuity** — enrollment continuity state can be updated after cycle close.
8. **Next cycle can be opened** — new cycle with auto-incremented number and fallback StudyLoad.
9. **The system supports manual regulation of learning for one student** — full loop demonstrated across 4 cycles.

---

## 5. Manual Guardrails Required

| Guardrail | Rationale |
|-----------|-----------|
| Max 1–3 internal students | Operator bandwidth is the bottleneck; each student requires ~11 manual steps per cycle |
| Human-admin guided operation | No automation exists; every cycle action requires admin judgment |
| No public signup | Signup endpoint is admin-only; student accounts must be created by admin |
| No unmanaged student onboarding | Each student must be explicitly enrolled, assigned a program, and have their first cycle opened by admin |
| No automatic pedagogical decisions | CycleDecision is always human-created with explicit rationale |
| No AI/adaptive claims | No adaptive logic, no AI-driven content selection, no personalization engine |
| No score/PAES-score claims based only on MC evidence | MC correct counts are visible but not interpreted as mastery scores or predictive of PAES performance |
| Content must be registry-matched before student use | Fallback "Initial practice" must be curated to match a content registry activity before the student sees it |
| Admin must verify evidence before CycleDecision | No decision should be created without reviewing MC results and self-report |
| Cycle close only after evidence-backed decision | Closing without a decision leaves the cycle without pedagogical rationale |
| Continuity only after cycle close | Continuity authorization presupposes a closed, decided cycle |

---

## 6. Go Criteria for Internal Beta

All of the following must be true for an internal beta cycle to proceed:

| # | Criterion | How to verify |
|---|-----------|---------------|
| G1 | Admin allowlist access works | Admin can log in and access `/admin` routes |
| G2 | Student login works | Student can log in and see `/now` |
| G3 | At least one curated registry-matched StudyLoad exists per active cycle | Admin has renamed fallback load to match content registry |
| G4 | Student can see, start, answer, submit, and complete | Student completes the full activity viewer flow |
| G5 | Admin can see completion, MC evidence, correct count, self-report | Admin reviews evidence in cycle detail or evidence review |
| G6 | Admin can create CycleDecision | Decision with type and rationale is stored |
| G7 | Admin can close cycle | Cycle transitions to closed |
| G8 | Admin can authorize continuity | Enrollment continuity state is updated |
| G9 | Operator can recover if fallback "Initial practice" appears | Admin knows to curate the load before student accesses it |

---

## 7. No-Go Criteria

If any of the following are true, the internal beta must be paused or blocked:

| # | No-Go Condition | Impact |
|---|-----------------|--------|
| NG1 | Missing curated content for assigned StudyLoad | Student sees generic "Initial practice" with no exercises |
| NG2 | Student cannot access `/now` | Student is locked out of their dashboard |
| NG3 | Activity viewer fails to render | Student cannot see or interact with exercises |
| NG4 | MC submission fails | Evidence cannot be captured |
| NG5 | Evidence not visible to admin | Admin cannot make informed decisions |
| NG6 | Admin cannot distinguish status/completion/evidence | Operational confusion; wrong decisions possible |
| NG7 | CycleDecision cannot be created or verified | Cycle cannot progress through the regulation loop |
| NG8 | Cycle close/continuity behavior unclear | Ambiguity in state transitions |
| NG9 | Any data or auth inconsistency | Trust in system state is compromised |
| NG10 | Any need for SQL/manual DB intervention during student operation | Operational fragility; unsustainable for beta |

---

## 8. Allowed Next Operational Paths

| Option | Phase | Purpose | Scope |
|--------|-------|---------|-------|
| **A** | FL-UX-9-B | Curate Mauricio Cycle 5 StudyLoad | One more continuity run; curation only |
| **B** | FL-UX-10-B | Prepare second student replication path | Validate the loop works for a different student/program; readiness/planning before mutation |
| **C** | FL-UX-10-C | Internal beta operations checklist | Daily/weekly runbook for 1–3 students |

### Recommended next

**Option B or C** before continuing Mauricio Cycle 5, unless Mauricio continuity is specifically the priority.

**Rationale:** The Mauricio loop is validated. Additional cycles confirm repeatability but do not surface new capabilities. A second student replication (B) would validate transfer, and an operations checklist (C) would formalize the workflow for any operator. Either increases beta readiness more than another Mauricio cycle.

---

## 9. Public Beta Blockers

| # | Blocker | Severity |
|---|---------|----------|
| PB1 | No scalable content progression — admin must manually select next activity | High |
| PB2 | Fallback StudyLoad still needs manual curation every cycle | High |
| PB3 | No automated adaptive logic — all decisions are manual | High |
| PB4 | No robust scoring interpretation — MC correct count is raw, not mastery | Medium |
| PB5 | No payment/onboarding workflow — students cannot self-register or pay | High |
| PB6 | No parent/sponsor flow — no visibility for guardians or funders | Medium |
| PB7 | No broad content library — only one registry activity validated | High |
| PB8 | No support protocol for external students — no help desk, no FAQ | Medium |
| PB9 | No analytics dashboard for cohort health — no aggregate views | Low |
| PB10 | No formal incident protocol for beta users — no escalation path | Medium |

---

## 10. Operating Model for 1–3 Student Beta

### Human operator role

A single human operator (the admin) is responsible for:
- Creating and managing student accounts.
- Opening cycles and curating StudyLoads.
- Monitoring student progress (checking for completed loads).
- Reviewing evidence after each StudyLoad completion.
- Creating evidence-backed CycleDecisions.
- Closing cycles and authorizing continuity.
- Documenting each operation in PHASE_LOG and operation docs.

### Admin review cadence

- **Daily check** (if students are active): verify if any StudyLoad has been completed.
- **Within 24–48 hours of completion**: review evidence and create CycleDecision.
- **Within 48 hours of decision**: close cycle and authorize continuity if appropriate.
- **Before next student session**: ensure next cycle is opened and StudyLoad is curated.

### Content curation cadence

- **Before each cycle starts for the student**: verify fallback StudyLoad is renamed to match a content registry activity.
- **Before curating**: confirm the content key and version exist in the registry.
- **After curating**: verify via admin UI that the load title and content match.

### Student communication boundaries

- Students are told when to log in (after curation is complete).
- Students are not given admin access or visibility into cycle decisions.
- Students interact only through `/now` and the activity viewer.
- If a student reports an issue, the operator investigates before the student retries.

### What to do when a student completes a load

1. Admin checks the StudyLoad status (should be `completed`).
2. Admin reviews MC evidence: correct count, individual responses.
3. Admin reads self-report.
4. Admin creates a CycleDecision with type and evidence-backed rationale.
5. Admin closes the cycle.
6. Admin authorizes continuity (if advancing).
7. Admin documents the operation.

### What to do before opening a next cycle

1. Confirm the previous cycle is closed.
2. Confirm continuity is authorized (if applicable).
3. Open new cycle via Admin → Learning Cycles → New Cycle.
4. Observe the auto-created fallback StudyLoad.
5. Curate the fallback StudyLoad to match a content registry activity.
6. Verify curation before notifying the student.

### What must be logged

- Each phase in PHASE_LOG.md with baseline, summary, post-state, and confirmed non-actions.
- Each operation in `nextjs_space/docs/operations/` with detailed pre-state, action, post-state, and confirmations.
- Any unexpected behavior, errors, or deviations.

---

## 11. Recommended Immediate Decision

| Decision | Verdict |
|----------|---------|
| Open public beta | **NO** |
| Scale beyond 3 students | **NO** |
| Make adaptive/AI claims | **NO** |
| Proceed with internal guided beta readiness | **YES** |

### Recommended next phase

One of:

| Priority | Phase | Description |
|----------|-------|-------------|
| 1 | FL-UX-10-B | Second student replication readiness — validates transfer |
| 2 | FL-UX-10-C | Internal beta operations checklist — formalizes workflow |
| 3 | FL-UX-9-B | Cycle 5 curation only — if Mauricio continuity is the immediate priority |

---

## 12. Final Verdict

| Dimension | Verdict |
|-----------|---------|
| Tightly guided internal beta readiness preparation | **GO** |
| Public beta | **NO-GO** |
| Autonomous/adaptive claims | **NO-GO** |
| More than 3 students without phase upgrade | **NO-GO** |

**Summary:** The platform is ready for a tightly guided internal beta with 1–3 students under continuous human-admin supervision. All cycle operations are manual and evidence-backed. No automation, adaptive logic, or scoring interpretation exists. Public beta requires resolving content library, onboarding, scoring, and support blockers.

---

## Confirmed Non-Actions (this phase)

- Documentation-only. No production mutation.
- No admin UI operation. No student UI operation.
- No StudyLoad curation, creation, edit, or deletion.
- No CycleDecision. No CycleEvaluation.
- No cycle close. No continuity action. No Cycle 6.
- No deploy. No code changes. No schema changes.
- No content registry changes.
- No SQL. No Prisma CLI. No `.env` access.
- No secrets inspected or printed.
- No Test Now, Ana, or Bruno touched.
