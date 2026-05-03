# FL-UX-4B — Internal Guided Beta Operations Runbook

**Version:** 1.0  
**Date:** 2026-05-03  
**Phase:** FL-UX-4B  
**Prerequisite:** FL-UX-4A consolidation (beta readiness confirmed)  
**Status:** ACTIVE — governs all internal beta operations until replaced

---

## 1. Executive Decision

**GO for internal guided beta — NO-GO for public launch.**

The platform has been validated through FL-UX-4A consolidation with
full-cycle evidence (student flow, admin decisions, cycle close,
continuity, and next-cycle load assignment). The system is ready for a
controlled internal beta with 1–3 real students under direct operator
supervision.

Public launch remains blocked until:
- Multi-student concurrency is tested in production.
- At least two complete learning cycles are observed end-to-end.
- Adaptive routing (difficulty adjustment) is verified with real evidence.
- Student onboarding friction is measured and acceptable.

---

## 2. Purpose

This runbook provides step-by-step operational procedures for safely
running a 1–3 student internal guided beta of the Bexauri tutoring
platform. It is intended for the operator (admin) and direction to
follow during all beta operations.

This document is complementary to FL-UX-4A (strategic readiness
assessment). FL-UX-4A answers "are we ready?" — this runbook answers
"how do we operate?"

---

## 3. Scope

| Dimension       | Constraint                                           |
|-----------------|------------------------------------------------------|
| Students        | 1–3 real students, individually invited               |
| Program         | PAES_M1 only                                         |
| Content         | Only loads registered in content registry (§7)       |
| Duration        | Open-ended; reviewed weekly                          |
| Environment     | Production (`tutoring-platform-mv-l4o1ne.abacusai.app`) |
| Support model   | Synchronous — operator available during student use  |
| Data visibility | Admin Beta Ops panel for all monitoring              |

---

## 4. Roles

### 4.1 Student
- Accesses `/now` to see their current assigned load.
- Clicks **Empezar** → **Ver actividad** to begin a study activity.
- Answers multiple-choice items and clicks **Enviar respuestas**.
- Clicks **Terminar** and completes the self-report form.
- Has no admin access. Cannot see other students' data.

### 4.2 Admin / Operator
- Accesses `/admin/beta-ops` to monitor all student cycles.
- Creates new cycles, loads, and decisions.
- Interprets evidence and records CycleDecisions.
- Closes cycles and authorises continuity.
- Is the single point of contact for student issues during beta.

### 4.3 Direction
- Reviews weekly summary (§17).
- Approves adding additional students (§18).
- Decides on pause or termination (§19).
- Does not perform day-to-day operations.

---

## 5. End-to-End Flow

The validated flow for one learning cycle:

```
Student /now → Empezar → Ver actividad → MC answers → Enviar respuestas
→ Terminar → self-report form → admin sees evidence in Beta Ops
→ operator interprets evidence → New Decision (CycleDecision)
→ Cerrar ciclo → Autorizar continuidad → New Cycle + New Load → repeat
```

**Critical:** Every step after the student submits is manual. The
operator must actively drive the cycle forward.

---

## 6. Pre-Invitation Checklist

Before inviting any student, verify ALL of the following:

- [ ] Production deployment is current and accessible.
- [ ] Student account exists with correct credentials.
- [ ] `/now` shows the correct initial load for the student.
- [ ] Admin can access `/admin/beta-ops` and see the student's cycle.
- [ ] The assigned load title matches a content registry entry (§7).
- [ ] Operator has tested the full flow (§5) end-to-end in the last 48h.
- [ ] Operator will be available for synchronous support during the student's first session.
- [ ] Student has been briefed: this is a beta, feedback is welcome, operator is reachable.

---

## 7. Allowed Beta Content

Only loads whose titles **exactly match** a content registry entry may be
assigned during internal beta. The current registry contains:

| # | Load Title (exact match required)                  | contentKey                                 |
|---|----------------------------------------------------|--------------------------------------------||
| 1 | `PAES M1 — Ecuaciones lineales básicas`            | `paes_m1_linear_equations_basic`           |
| 2 | `PAES M1 — Problemas con ecuaciones lineales`      | `paes_m1_linear_equations_word_problems`   |

**Registry-match rule:** If a load title does not appear in this table,
do NOT assign it. Adding new content requires a code change to
`nextjs_space/lib/study-load-content.ts` and a new deployment — this is
outside the scope of beta operations and requires a separate phase.

---

## 8. Daily Operations Checklist

Perform these checks every day a student is expected to be active:

1. **Open `/admin/beta-ops`.**
2. **Check each active student's cycle status:**
   - Is there a load in `pending`? → Student hasn't started yet. No action needed.
   - Is there a load in `in_progress`? → Student is working or has completed. Check evidence (§9).
   - Is there a load in `completed`? → Ready for decision (§11).
3. **Check for orphan states:**
   - Cycle exists but no load? → Create a load (§14).
   - Load completed but no decision? → Record decision (§11).
   - Decision recorded but cycle not closed? → Close cycle (§12).
4. **Log any anomalies** (unexpected errors, missing data, student reports).

---

## 9. Handling Load States

### 9.1 `pending`
The load has been assigned but the student has not clicked **Empezar**.
- **Action:** Wait. The student will see it on `/now`.
- **If stale for >48h:** Contact student to confirm they are aware.

### 9.2 `in_progress`
The student has clicked **Empezar** but has not clicked **Terminar**.
- **Action:** Wait. Do not interrupt.
- **If stale for >72h:** Contact student to check if they are stuck or have abandoned.

### 9.3 `completed`
The student has submitted answers and completed the self-report.
- **Action:** Proceed to evidence interpretation (§10) and decision (§11).
- **Timeline:** Record decision within 24h of completion.

---

## 10. Manual Evidence Interpretation

### What the evidence shows
After a student completes a load, the admin panel shows:
- **correctCount / totalItems** — how many MC items were answered correctly.
- **Self-report data** — the student's subjective assessment.

### What the evidence does NOT show
- **correctCount ≠ PAES score.** These are practice items, not a calibrated exam.
- **No difficulty weighting.** All items count equally regardless of complexity.
- **No time-on-task.** The platform does not yet measure how long each item took.

### Interpretation guidance

| correctCount / totalItems | Suggested reading                                    |
|---------------------------|------------------------------------------------------|
| ≥ 80%                     | Strong grasp. Consider advancing to next topic.      |
| 50–79%                    | Partial grasp. May benefit from same-topic practice. |
| < 50%                     | Weak grasp. Repeat or provide simpler variant.       |

**Important:** These thresholds are guidelines, not rules. The operator
should consider the self-report and any direct student feedback before
deciding.

---

## 11. CycleDecision Guidance

### When to record a decision
After every completed load, before closing the cycle.

### How to record
1. In Beta Ops, click **New Decision** on the student's cycle.
2. Select the decision **type** from the dropdown.
3. Edit the **rationale** field with a clear explanation.

### Decision types and rationale templates

| Decision Type     | When to use                                     | Rationale template                                                        |
|-------------------|--------------------------------------------------|--------------------------------------------------------------------------|
| `advance`         | Student demonstrated sufficient mastery          | "correctCount X/Y (Z%). Self-report positive. Advancing to [next topic]."|
| `repeat`          | Student needs more practice on same topic        | "correctCount X/Y (Z%). [specific weakness]. Repeating [topic]."         |
| `adjust_down`     | Content was too difficult                        | "correctCount X/Y (Z%). Evidence suggests difficulty mismatch. Adjusting."|
| `pause`           | Student needs a break or external factor         | "Student requested pause / [reason]. Cycle paused on [date]."            |

**Always include the correctCount ratio and percentage in the rationale.**
This creates an auditable evidence trail.

---

## 12. Cycle Close Protocol

**Preconditions:**
- All loads in the cycle are `completed`.
- At least one CycleDecision has been recorded.

**Steps:**
1. Verify all loads are completed (no `pending` or `in_progress`).
2. Verify at least one decision exists with a rationale.
3. Click **Cerrar ciclo** in Beta Ops.
4. Confirm the cycle status changes to `closed`.

**Do NOT close a cycle if:**
- Any load is still `in_progress` (student may lose work).
- No decision has been recorded (breaks the audit trail).

---

## 13. Continuity Protocol

**After closing a cycle:**
1. Click **Autorizar continuidad** in Beta Ops.
2. This signals that the student should continue to a next cycle.

**When NOT to authorise continuity:**
- Direction has decided to pause the student (§19).
- The student has explicitly requested to stop.
- A platform error makes it unsafe to continue.

---

## 14. Next Cycle and Load Preparation

**After authorising continuity:**
1. Click **New Cycle** for the student.
2. Click **New Load** within the new cycle.
3. Enter a load **title** that exactly matches a content registry entry (§7).
4. Verify the load appears on the student's `/now` page.

### Registry-match rule (enforced manually)
The load title entered in "New Load" **must** be a character-for-character
match of one of the titles in §7. Copy-paste is recommended.

If the desired topic is not in the registry, **do not create the load**.
Instead, file a request for new content (separate phase).

### Load sequencing guidance
With only two loads currently available:
- **First cycle:** Assign `PAES M1 — Ecuaciones lineales básicas`.
- **Second cycle:** Assign `PAES M1 — Problemas con ecuaciones lineales`.
- **Third+ cycle:** Repeat one of the above or pause until new content is added.

---

## 15. Error Handling

| Error / Symptom                          | Action                                                                 |
|------------------------------------------|------------------------------------------------------------------------|
| Student sees blank `/now` page           | Check if a cycle + load exists. Create if missing.                    |
| Student can't click "Empezar"            | Check load status. If already `in_progress`, the button won't show.   |
| "Enviar respuestas" fails                | Check browser console for errors. Note the error and report.          |
| Admin panel doesn't show student         | Verify student account exists and is linked to a cycle.               |
| Evidence shows 0/0 items                 | Possible content registry mismatch. Verify load title matches §7.     |
| Production site unreachable              | Check deployment status. Do NOT redeploy during beta without notice.  |
| Self-report form doesn't appear          | Known risk from FL-UX-4A. Student may need to refresh and retry.      |

**For any error not listed:** Document it with screenshots, note the
time and student, and escalate to direction. Do not attempt code fixes
during active beta operations.

---

## 16. What NOT To Do During Internal Beta

🚫 **Do NOT deploy code changes** while a student has an `in_progress` load.  
🚫 **Do NOT modify the database schema** during beta operations.  
🚫 **Do NOT assign load titles** that are not in the content registry (§7).  
🚫 **Do NOT delete** any student data, cycles, loads, or decisions.  
🚫 **Do NOT share production credentials** with students.  
🚫 **Do NOT promise PAES score predictions** based on correctCount.  
🚫 **Do NOT add students** without direction approval (§18).  
🚫 **Do NOT modify content registry** (`study-load-content.ts`) during active sessions.  
🚫 **Do NOT run seed scripts** against the production database.  
🚫 **Do NOT use the platform** for students outside the approved beta cohort.  

---

## 17. Weekly Direction Checklist

Every Friday (or last working day of the week), the operator prepares a
brief summary for direction:

- [ ] Total active students this week.
- [ ] Cycles completed this week (per student).
- [ ] Summary of decisions made (advance / repeat / pause).
- [ ] Any errors or anomalies encountered.
- [ ] Student feedback received (if any).
- [ ] Recommendation: continue / pause / add student / escalate.

Format: plain text or short document. No dashboard required.

---

## 18. Criteria to Add Another Student

Before inviting student N+1:

1. **At least one full cycle** has been completed successfully with the current cohort.
2. **No unresolved errors** from the current cohort.
3. **Operator capacity** — the operator confirms they can handle N+1 students with synchronous support.
4. **Direction approval** — explicit written or verbal approval.
5. **Pre-invitation checklist (§6)** passes for the new student.

**Maximum cohort size for internal beta: 3 students.** Beyond 3 requires
a phase upgrade to semi-public beta with different operational procedures.

---

## 19. Pause Criteria

Pause beta operations immediately if any of the following occur:

- **Data loss:** Any student data (cycles, loads, evidence, decisions) disappears.
- **Platform down:** Production site is unreachable for >2 hours during scheduled student use.
- **Content mismatch:** A load renders items that don't match its title/topic.
- **Student safety concern:** Any feedback suggesting the platform causes frustration, confusion, or harm.
- **Schema drift:** Any automated or manual database schema change during beta.
- **Multiple concurrent errors:** 3+ distinct errors in a single session.

**Pause procedure:**
1. Notify all active students that the platform is temporarily unavailable.
2. Document the reason for pause with evidence.
3. Escalate to direction.
4. Do NOT resume until the root cause is identified and resolved.

---

## 20. Expected Operating Model

| Activity                        | Frequency              | Duration      |
|---------------------------------|------------------------|---------------|
| Student session                 | 2–3 per week per student | 20–40 min each |
| Operator daily check (§8)       | Daily on active days   | 5–10 min       |
| Evidence review + decision (§10–11) | After each completed load | 10–15 min  |
| Cycle close + next cycle (§12–14)   | After each decision    | 5 min          |
| Weekly direction report (§17)   | Weekly                 | 15–20 min      |

**Total operator time:** ~2–4 hours per week for 1–3 students.

---

## 21. Relationship to Codex / Abacus Cost Policy

The Bexauri platform is hosted on Abacus.AI infrastructure. During
internal beta:

- **Database:** Uses Abacus.AI hosted PostgreSQL (free tier). No additional
  cost expected for 1–3 students.
- **Hosting:** Deployed via Abacus.AI app hosting. No additional cost
  expected at this scale.
- **LLM API calls:** If any future features use LLM APIs, costs will
  depend on usage volume. Current beta content (static MC items) does
  not use LLM APIs.
- **Codex interactions:** Development changes to the platform consume
  Codex credits. During beta operations (no code changes), no Codex
  credits are consumed.

**Guideline:** Keep beta operations within the documentation-only model.
Code changes should be batched into planned phases, not performed
reactively during student sessions.

---

## 22. Final Recommendation and Next Likely Blocks

### Recommendation

**Proceed with internal guided beta.** Start with 1 student. Complete at
least 2 full cycles before considering a second student. Follow this
runbook for all operations.

### Next likely blocks

| Block                              | Impact                                    | Mitigation                                  |
|------------------------------------|-------------------------------------------|---------------------------------------------|
| Only 2 content loads available     | Students exhaust content after 2 cycles   | Plan FL-CONTENT-3 (new content) soon        |
| No student account/password protocol | Credential sharing is ad-hoc             | Plan FL-UX-4C (student account protocol)    |
| No automated difficulty adjustment | All routing is manual operator decisions  | Acceptable for internal beta; automate later|
| No time-on-task measurement        | Evidence interpretation is incomplete     | Document as known limitation; add in future |
| Self-report form reliability       | May not appear consistently               | Student can refresh and retry; document     |

### Recommended next phase

**FL-UX-4C — Student Account and Password Protocol:** Define how student
accounts are created, credentials communicated, and passwords managed
during internal beta. This is the most immediate operational gap.

---

*End of FL-UX-4B Internal Guided Beta Operations Runbook.*
