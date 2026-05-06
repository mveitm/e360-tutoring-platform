# FL-UX-10-B — Prepare Second Student Replication Path

**Phase:** FL-UX-10-B  
**Date:** 2026-05-06  
**Baseline:** `06c0fbd` (FL-UX-10-A: internal beta go-no-go protocol)  
**Type:** documentation-only — no production mutation  

---

## 1. Executive Summary

### Purpose

Define how to safely replicate the validated MVP learning regulation loop with a second internal student, without contaminating data, breaking account protocols, or improvising content.

### Why this is the next highest-value validation after Mauricio

The Mauricio Cycle 4→5 chain validated the full manual loop for one student. However, single-student validation does not confirm that the workflow transfers to other students, programs, or operator contexts. A second-student replication would:

- Confirm the loop is not Mauricio-specific.
- Surface onboarding, account, and content issues that single-student repetition cannot reveal.
- Increase confidence before any broader beta invitation.
- Test operator discipline across concurrent students.

### Clear statement

**This phase is preparation only. No mutation occurs.** No student account is created, modified, or accessed. No cycle is opened. No StudyLoad is curated. No production data is touched.

---

## 2. Candidate Student Criteria

A valid second internal beta student must satisfy:

| # | Criterion | Rationale |
|---|-----------|----------|
| C1 | Internal / trusted / guided | Not a public or external user |
| C2 | Account access can be controlled without exposing passwords to agents | Human owner manages credentials |
| C3 | Has a clear target program (preferably PAES_M1 or PAES_L1) | Content registry and viewer must support the program |
| C4 | Can complete one short curated in-app StudyLoad | Must be able to navigate `/now`, start, answer MC, complete |
| C5 | Can report honestly via self-report | Self-report is part of the evidence chain |
| C6 | Can be supported manually by the operator | Operator must have bandwidth for a second student |

---

## 3. Candidate Options

### Option 1: Test Now account

- **Profile:** QA/smoke-test account already in the system.
- **Pros:** Already exists. No onboarding needed. Good for verifying viewer/submission mechanics.
- **Cons:** Not a real student. Provides QA signal, not beta signal. Results do not represent genuine student interaction.
- **Verdict:** Useful for QA, **not valid as beta evidence**.

### Option 2: Bruno Beta-L1

- **Profile:** Existing internal student enrolled in PAES_L1.
- **Pros:** Tests cross-program transfer (PAES_L1 vs. Mauricio's PAES_M1). Already has an enrollment.
- **Cons:** PAES_L1 content readiness must be checked — the content registry may not have a matching activity. Current cycle/StudyLoad state is unknown and may have stale or seed data.
- **Verdict:** Viable **if** content readiness and current state pass audit.

### Option 3: Ana Beta-M1

- **Profile:** Existing internal student enrolled in PAES_M1.
- **Pros:** Tests same-program transfer (PAES_M1). Content registry already has at least one validated activity (`paes_m1_linear_functions_basic`). Already has an enrollment.
- **Cons:** Current state may be stale or seed-like. May have open cycles with fallback StudyLoads that could confuse the student. Needs a full state audit.
- **Verdict:** Viable **if** current state passes audit and stale data is manageable.

### Option 4: New second real student

- **Profile:** A genuinely new internal person (not an existing account).
- **Pros:** Best beta signal — tests the full onboarding + execution path. No stale data risk.
- **Cons:** Requires account creation, enrollment, program assignment, and password protocol. More operational steps. Requires operator bandwidth.
- **Verdict:** Best signal, **but** requires account/password protocol readiness.

---

## 4. Recommended Candidate Path

### Short-term recommendation

**Prepare Ana Beta-M1 or Bruno Beta-L1** for replication, but only after a read-only audit of their current state.

| If the goal is... | Recommended candidate |
|--------------------|-----------------------|
| Same-program transfer (PAES_M1 continuity/content) | **Ana Beta-M1** |
| Cross-program transfer validation | **Bruno Beta-L1** |
| Full onboarding validation | **New real internal student** |
| QA only (not beta evidence) | **Test Now** |

### Do not use Test Now as beta evidence.

Test Now results are QA artifacts. They do not represent genuine student interaction and must not be cited as beta validation evidence.

### Do not mutate any candidate before the read-only audit passes.

---

## 5. Required Read-Only Audit Before Mutation

Before touching any candidate's data, the following must be verified via admin UI (read-only):

| # | Audit item | What to check |
|---|-----------|---------------|
| A1 | Enrollment status | Is it `active`? |
| A2 | Current open cycles | How many? What cycle numbers? |
| A3 | Current StudyLoads | Any pending/in_progress/completed loads? Titles? |
| A4 | Stale or seed data | Are there artifacts from seed scripts or old testing? |
| A5 | Existing decisions/evaluations | Any CycleDecisions or CycleEvaluations in any cycle? |
| A6 | `/now` student view risk | Would the student see confusing legacy/fallback work? |
| A7 | Content registry match | Does the registry have a matching activity for the candidate's program? |
| A8 | Account/password protocol | Can the human owner access the account without exposing credentials to agents? |

### Audit phase

This audit should be performed as **FL-UX-10-B1** — a dedicated read-only phase.

---

## 6. Content Readiness Requirements

Before any second student work begins:

| # | Requirement | Detail |
|---|------------|--------|
| CR1 | Select one registry-matched activity | Must exist in `lib/study-load-content.ts` with contentKey and version |
| CR2 | Confirm title exact-match behavior | StudyLoad title must match the content registry entry for viewer rendering |
| CR3 | Confirm loadType `practice` | The activity must be compatible with the practice load type |
| CR4 | Confirm expected activity duration | Student should be able to complete in one session |
| CR5 | Confirm answer key exists | MC exercises must have answer keys for evidence review |
| CR6 | Confirm admin evidence view supports the content | Admin must be able to see correct/incorrect per item |
| CR7 | Avoid fallback "Initial practice" reaching a real student | Curation must happen before the student accesses `/now` |

### For Ana Beta-M1 (PAES_M1)

The content registry already has `paes_m1_linear_functions_basic` (v1), validated with Mauricio. A second activity or reuse of the same activity must be decided.

### For Bruno Beta-L1 (PAES_L1)

The content registry must be checked for PAES_L1 activities. If none exist, one must be added before Bruno can proceed.

---

## 7. Account and Access Protocol

| Rule | Detail |
|------|--------|
| Human owner manages passwords | Agent never sees, stores, or handles credentials |
| Reset only through approved admin-mediated pathway | If a password reset is needed, the human owner performs it |
| Login validation is human-mediated | The human owner logs in as the student to confirm access works |
| No passwords in documentation | No passwords in PHASE_LOG, docs, prompts, screenshots, terminal, browser logs, or chat |
| Agent can observe post-login state | After human confirms login, agent can observe `/now` via shared browser if needed |
| No credentials in commit history | No passwords, tokens, or connection strings in any committed file |

---

## 8. Proposed Second-Student MVP Flow

The same minimal sequence validated with Mauricio, but phased:

| Phase | Action | Actor | Notes |
|-------|--------|-------|-------|
| 10-B1 | Readiness audit | Agent (read-only via admin UI) | No mutation |
| 10-B2 | Choose second student and content path | Human decision | Based on audit results |
| 10-B3 | Account/access readiness check | Human owner | Confirm login works |
| 10-B4 | Create/curate first second-student StudyLoad | Admin (human-mediated) | Registry-matched content |
| 10-B5 | Student visibility check | Human/agent observation | Confirm `/now` shows curated load |
| 10-B6 | Student start | Student (human-mediated) | Transition to in_progress |
| 10-B7 | MC submission | Student (human-mediated) | Answer exercises |
| 10-B8 | Completion + self-report | Student (human-mediated) | Complete load with self-report |
| 10-B9 | Admin evidence review | Admin (human-mediated) | Verify MC evidence and self-report |
| 10-B10 | CycleDecision | Admin (human-mediated) | Evidence-backed decision |
| 10-B11 | Cycle close | Admin (human-mediated) | Formal close |
| 10-B12 | Continuity authorization | Admin (human-mediated) | If appropriate |

**Each step is a separate phase.** No large combined operations.

---

## 9. Risks and Guardrails

| # | Risk | Mitigation |
|---|------|------------|
| R1 | Stale seed data in candidate account | Read-only audit before mutation (FL-UX-10-B1) |
| R2 | Wrong program/content mismatch | Content registry check before curation |
| R3 | Account/password handling risk | Human owner manages all credentials; agent never sees them |
| R4 | Confusing fallback StudyLoad risk | Curate before student accesses `/now` |
| R5 | Over-scaling before protocol maturity | Max 1–3 students; no public beta |
| R6 | Manual operator burden | Limit to one new student at a time |
| R7 | False confidence from Test Now QA account | Never cite Test Now results as beta evidence |
| R8 | Premature public beta claims | GO/NO-GO protocol enforced from FL-UX-10-A |
| R9 | Concurrent student confusion | Operator must track each student's current cycle/load state independently |

---

## 10. Recommended Phase Sequence

| Phase | Name | Type | Description |
|-------|------|------|-------------|
| FL-UX-10-B1 | Read-only candidate state audit | Documentation + read-only admin observation | Audit Ana/Bruno/both: enrollment, cycles, loads, stale data, content readiness |
| FL-UX-10-B2 | Choose second student and content path | Human decision (documentation) | Based on audit, decide candidate and content |
| FL-UX-10-B3 | Account/access readiness check | Human-mediated | Confirm student can log in; no credential exposure |
| FL-UX-10-B4 | Create/curate first second-student StudyLoad | Human-mediated admin UI | Registry-matched curation |
| FL-UX-10-B5+ | Execute student flow in minimal phases | Phased human-mediated operations | One step per phase through the 11-step loop |

---

## 11. Decision Recommendation

- **Do not mutate yet.** No account creation, no cycle opening, no StudyLoad curation.
- **Do not invite second student yet.** Candidate state must be audited first.
- **Next phase should be read-only audit:**

### FL-UX-10-B1 — Second Student Candidate State Audit

Scope: Read-only observation via admin UI of Ana Beta-M1 and/or Bruno Beta-L1 current state (enrollment, cycles, StudyLoads, decisions, evaluations, stale data). No mutation.

---

## 12. Final Verdict

### SECOND_STUDENT_REPLICATION_READY_FOR_READINESS_AUDIT

- **Not ready for mutation** until candidate state and account/content readiness are confirmed.
- **Ready for read-only audit** of candidate students.
- **Replication path is defined** and phased.
- **Account protocol is documented** and enforces human-only credential management.
- **Content readiness requirements are specified.**
- **Risk mitigations are in place.**

---

## Confirmed Non-Actions (this phase)

- Documentation-only. No production mutation.
- No admin UI operation. No student UI operation.
- No student account creation or modification.
- No password reset. No enrollment creation.
- No cycle creation. No StudyLoad creation or curation.
- No CycleDecision. No CycleEvaluation.
- No cycle close. No continuity action.
- No deploy. No code changes. No schema changes.
- No content registry changes.
- No SQL. No Prisma CLI. No `.env` access.
- No secrets inspected or printed.
- No Test Now, Ana, Bruno, or Mauricio data touched.
