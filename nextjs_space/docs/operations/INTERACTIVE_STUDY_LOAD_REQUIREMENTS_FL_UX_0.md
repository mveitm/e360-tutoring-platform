# Interactive StudyLoad MVP Requirements — FL-UX-0

## 1. Title

**Interactive StudyLoad MVP Requirements — FL-UX-0**

## 2. Purpose

This document defines the minimum interactive StudyLoad experience needed before inviting external students to Bexauri.

This phase does **not** implement the feature. It only defines product, UX, pedagogical, admin, and data requirements that must be satisfied before external beta participants can be considered.

## 3. Current validated baseline

The following system capabilities have been validated through self-beta execution:

- `/now` student dashboard works — shows current program, cycle, and study load.
- StudyLoad can move from `pending` to `in_progress` (student clicks "Empezar").
- StudyLoad can move from `in_progress` to `completed` (student clicks "Terminar").
- Self-report works — student submits how they felt about the task.
- Admin can see evidence/self-report in the cycle detail view.
- Admin can create a manual CycleDecision (`advance`, `reinforce`, `hold`, `redirect`).
- First PAES M1 real task ("Ecuaciones lineales básicas") was executed externally and completed.
- Second PAES M1 follow-up task ("Problemas con ecuaciones lineales") was documented.
- Git/PHASE_LOG custody chain is active and maintained.

## 4. Current gap

- **StudyLoad tracks operational state but does not contain a rich in-app task experience.** The StudyLoad record holds title, type, and status, but no instructions, exercises, or content.
- **Real task content is still external.** Students work from printed documents or external files.
- **The student must leave the platform to work.** There is no in-app task execution experience.
- **Admin sees self-report but not item-level answers.** The admin knows how the student felt, but not what they actually answered.
- **This is acceptable for self-beta** — where the operator is also the student — **but not enough for external students** who need a self-contained, guided experience.

## 5. Strategic rule before external beta

External students should **not** be invited until Bexauri supports at least one beta-quality in-app study load experience with:

- student-facing instructions visible inside the app;
- visible task content (exercises/questions);
- answer interaction (student can select responses);
- completion submission;
- self-report;
- admin review of actual responses;
- manual decision support based on item-level evidence.

## 6. Target user experience: student side

The ideal minimum student flow for an interactive StudyLoad:

1. Student logs in.
2. Student opens `/now`.
3. Student sees their current StudyLoad with title and context.
4. Student clicks "Empezar".
5. Student enters a StudyLoad detail or task view.
6. Student sees:
   - title;
   - purpose or topic;
   - estimated time;
   - instructions;
   - exercises/questions;
   - progress indicator (e.g., "Pregunta 3 de 8").
7. Student answers each item by selecting an option.
8. Student can review their answers before submitting.
9. Student submits answers.
10. Student completes self-report.
11. Student sees a confirmation message and understands what happens next (admin/tutor will review and decide the next step).

## 7. Minimum student UI elements

The following UI elements are required for the minimum interactive experience:

- **StudyLoad title** — prominently displayed.
- **Program/area label** — e.g., `PAES_M1`.
- **Topic/skill label** — e.g., "Ecuaciones lineales".
- **Estimated time** — e.g., "25–35 minutos".
- **Short instruction block** — what the student should do and how.
- **Item list** — the exercises or questions, presented one at a time or as a scrollable list.
- **Multiple-choice options** — radio-button style selection for each item.
- **Progress display** — e.g., "Pregunta 3 de 8".
- **Save or submit state** — visual indication that answers are captured.
- **Finish/submit button** — explicit action to complete the task.
- **Self-report modal or section** — same as current flow.
- **Completion confirmation** — clear message that the task is done.
- **Next-step message** — "Tu tutor/a revisará tu trabajo y decidirá el siguiente paso."

## 8. Minimum content model for StudyLoad v1

Conceptual requirements for in-app task content (not schema implementation):

- **StudyLoad title** — display name for the task.
- **StudyLoad description/instructions** — student-facing text explaining the task.
- **Task version identifier** — so responses can be linked to the exact version the student saw.
- **Estimated time** — in minutes, displayed to the student.
- **Items/questions** — ordered list of exercise stems.
- **Alternatives/options** — 3–5 options per item.
- **Correct answer key** — admin-visible, hidden from student during task.
- **Optional explanation/solution note** — brief reasoning per item, available to admin.
- **Skill/topic tags** — linking items to axes/skills for future analysis.
- **Ordering of items** — deterministic display order.
- **Published/active state** — whether the content is ready for use.

## 9. Minimum answer capture requirements

What must be captured when a student completes an interactive load:

- **Student selected option per item** — which alternative was chosen.
- **Whether each item was answered** — distinguish skipped from answered.
- **Submission timestamp** — when the student submitted.
- **Completion state** — whether the full task was submitted.
- **Self-report** — same as current flow ("Me fue bien" / "Me costó" / etc.).
- **Optional free-text reflection** — space for the student to add comments (future).
- **Optional time-on-task** — total time from start to submit (future).
- **Optional confidence per item** — how sure the student felt about each answer (future).

## 10. Admin review requirements

What the admin must see after a student submits an interactive load:

- **StudyLoad status** — completed, with timestamp.
- **Student self-report** — how the student felt.
- **Item-level responses** — what the student answered for each question.
- **Correct/incorrect summary** — if an answer key exists, which items were right/wrong.
- **Number answered** — how many items the student attempted.
- **Score or simple completion summary** — e.g., "6/8 correctas".
- **Which items were missed** — highlight incorrect or skipped items.
- **Student feedback** — if the student left additional comments.
- **Button or section to create CycleDecision** — same as current flow.
- **Rationale field** — space for the admin to explain the decision.
- **Next action recommendation space** — even if manual, a place to note what comes next.

## 11. Pedagogical requirements

The interactive load must support these pedagogical principles:

- **A clear objective** — the student and admin should know what skill is being practiced.
- **Reasonable task length** — 5–8 items for a 20–35 minute session.
- **PAES-aligned content** — exercises should match PAES M1 style, language, and difficulty.
- **Difficulty progression** — items should progress from easier to harder within a task.
- **Evidence that supports a manual decision** — the admin should have enough information to decide `advance`, `reinforce`, `hold`, or `redirect`.
- **Distinction between:**
  - **Skill gap** — the student lacks the mathematical skill.
  - **Reading/comprehension issue** — the student misunderstands the problem statement.
  - **Confidence issue** — the student knows the material but feels uncertain.
  - **Task mismatch** — the task is too easy, too hard, or not relevant.
- **Decision criteria** for `advance`, `reinforce`, `hold`, `redirect` — same framework as documented in FL-CONTENT-1 and FL-CONTENT-2.

## 12. First supported task type

The first interactive StudyLoad type to implement should be:

**Multiple-choice PAES-style practice.**

Rationale:

- Simple to implement — radio buttons, fixed options, deterministic scoring.
- Aligned with PAES — the actual exam uses multiple-choice format.
- Easy to review — admin sees selected vs. correct option per item.
- Supports item-level evidence — each answer is independently evaluable.
- Compatible with future scoring — can add automatic scoring later.
- Lower complexity than open-ended tutor interaction.

Do **not** start with:

- Free-form AI tutoring.
- Adaptive item generation.
- Complex diagnostic branching.
- Full essay or long-answer grading.
- Image-based or interactive geometry tools.

## 13. Proposed MVP scope for Interactive StudyLoad v1

The smallest usable version of an in-app interactive study load.

### Student side

- One StudyLoad detail page showing the full task.
- Instructions section with estimated time.
- 5–8 multiple-choice items displayed in order.
- Radio-button answer selection per item.
- Submit answers button.
- Self-report section (after submission).
- Completion confirmation with next-step message.

### Admin side

- See item-level responses (what the student selected).
- See answer key comparison (correct/incorrect per item).
- See self-report.
- Create manual CycleDecision with rationale.

### Out of scope for v1

- Automatic next load creation.
- AI tutoring or chatbot.
- Adaptive sequencing.
- Student messaging.
- Parent/guardian portal.
- Payment or billing.
- Institutional dashboards.
- Automatic scoring feedback shown to the student.
- Timed constraints.
- Rich media (images, diagrams, videos).
- Item randomization.

## 14. Suggested UX flow

A simple step-by-step UX flow for the interactive StudyLoad:

```
/now
→ current load card (title, program, estimated time)
→ "Empezar" button
→ /now/load/[id] or equivalent task view
→ instructions section
→ questions (items 1–8, each with radio options)
→ progress indicator ("Pregunta 3 de 8")
→ "Enviar respuestas" button
→ self-report section
→ completion confirmation
→ "Tu tutor/a revisará tu trabajo."
→ return to /now (load shows as completed)

Admin flow:
→ cycle detail → completed load
→ see item responses + answer key comparison
→ see self-report
→ create CycleDecision
```

Route names are suggested, not hardcoded. Implementation may adjust paths.

## 15. Student autonomy principle

For PAES preparation targeting enseñanza media students in Chile:

- **The student is the primary operator.** The student should be able to log in, find their task, work through it, and submit — all without external help.
- **The student should be able to work autonomously inside the app.** No WhatsApp instructions, no external documents, no verbal guidance required.
- **The apoderado (parent/guardian) is not the daily supervisor.** The apoderado may support, encourage, remind occasionally, or handle payment later — but the student flow must not depend on parent supervision.
- **The MVP student flow should not require parental interaction.** If the student cannot complete the flow independently, the platform is not ready for external participants.

This principle is central to the Bexauri design: the platform serves the student directly.

## 16. External beta readiness gate

External participants can be considered **only after** all of the following are met:

- [ ] Interactive StudyLoad v1 is implemented and deployed.
- [ ] At least one PAES M1 task runs fully inside the app (instructions + exercises + answer capture + self-report).
- [ ] Mauricio or an internal tester completes an in-app interactive task end-to-end.
- [ ] Admin sees item-level evidence (what the student answered per question).
- [ ] Manual CycleDecision is recorded based on item-level evidence.
- [ ] Onboarding instructions are clear — a new student can understand what to do without external explanation.
- [ ] Frontend is acceptable as beta quality — no broken flows, no confusing states, no dead ends.
- [ ] No critical auth or data issues appear during internal testing.

Until all checkboxes are met, external students should **not** be invited.

## 17. Risks and mitigations

| Risk | Mitigation |
|---|---|
| **Student confusion** — student doesn't understand what to do inside the task view. | Clear instructions section, progress indicator, explicit "Enviar" button, confirmation message. |
| **Long or unclear task** — too many items or ambiguous wording discourages completion. | Limit to 5–8 items per task. Use clear PAES-style language. Test with Mauricio first. |
| **Answers not saved** — student completes task but responses are lost. | Explicit submit action with server confirmation. Show completion state. |
| **Admin cannot interpret evidence** — item responses are present but hard to read. | Show answer key comparison, correct/incorrect indicators, and summary score. |
| **Too much scope for v1** — feature creep delays the interactive load. | Strict MVP scope: multiple-choice only, no AI, no adaptive logic, no rich media. |
| **External beta started too early** — students invited before the platform is ready. | External beta readiness gate (Section 16) must be fully satisfied first. |
| **Schema overreach** — overly complex data model designed before validating the UX. | Requirements first (this document), schema in a separate future phase, minimal viable model. |
| **AI/agent overreach** — temptation to add AI tutoring or adaptive features prematurely. | Explicit out-of-scope list. AI features are valuable but not for v1. |

## 18. Data model considerations for future phase

The following data model needs should be addressed in a future schema phase. They are documented here as requirements, **not** implemented.

- **StudyLoadContent or equivalent** — a structure to hold the task's instructions, items, and options. Could be a separate model or a JSON field on StudyLoad.
- **Item model or embedded JSON content** — each exercise with stem, options, correct answer, and optional explanation.
- **Student item responses** — per-item answers linked to a specific StudyLoad completion and task version.
- **Task versioning** — if task content is updated, prior responses should reference the version the student actually saw.
- **Answer key storage** — correct answers stored alongside items, accessible to admin but not to student during task.
- **Response summary** — aggregated result (e.g., 6/8 correct) computed from item responses.
- **Admin review summary** — space for admin notes or observations per load completion.
- **Audit trail for submitted answers** — timestamp and immutability of submitted responses.

Schema work must be a **separate future phase** (e.g., FL-UX-1 or a dedicated schema phase).

## 19. Implementation sequencing recommendation

Recommended future implementation sequence:

1. **FL-UX-1 — Implement read-only StudyLoad content viewer.**
   Use static or sample content (e.g., JSON) to display instructions and exercises inside the app. Student can read the task but not yet answer interactively. Validates the content display UX.

2. **FL-UX-2 — Add multiple-choice answer capture.**
   Student can select answers for each item and submit. Responses are stored. Self-report remains as-is. Validates the answer interaction and storage.

3. **FL-UX-3 — Add admin item-response review.**
   Admin can see what the student answered per item, with correct/incorrect comparison. Validates the admin evidence review.

4. **FL-UX-4 — Connect manual decision to item evidence.**
   Admin creates CycleDecision informed by item-level responses, not only self-report. Validates the full pedagogical decision loop with real evidence.

5. **Only then** — consider the first external assisted participant.

Each phase should be independently testable and deployable. Phases may be combined if scope is small enough.

## 20. What this phase validates

FL-UX-0 validates:

- **Product requirements clarity** — the minimum interactive experience is explicitly defined.
- **UX direction** — the student and admin flows are described step by step.
- **External beta gate** — clear criteria for when external students can be invited.
- **Minimum interactive load scope** — strict MVP boundaries prevent scope creep.
- **Alignment between pedagogy and platform** — pedagogical principles (PAES alignment, difficulty progression, decision criteria, student autonomy) are integrated into the product requirements.

## 21. What this phase does NOT validate

- Implementation correctness or feasibility.
- Schema design or database performance.
- Runtime behavior or UI rendering.
- External student readiness or onboarding quality.
- Scoring accuracy or item analysis.
- Adaptive logic or learning algorithms.
- AI tutoring or conversational agents.
- Production growth, scaling, or commercial viability.

## 22. Explicit non-implementation statement

- No code modified.
- No schema modified.
- No endpoints modified.
- No deploy.
- No data mutation — no users, students, enrollments, cycles, study loads, responses, or decisions created, modified, or deleted.
- No Prisma CLI executed.
- No secrets printed.
