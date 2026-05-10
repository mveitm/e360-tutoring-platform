# MVP-LEARNING-1 — Invisible and Non-Blocking LearningCycle Principle

## 1. Purpose

This document defines a product, learning-design, and operational principle for Bexauri / E360:

LearningCycles are internal structures of the Learning Regulation System (SRA). They must help Bexauri organize evidence, regulate learning, and guide next steps without becoming visible bureaucracy for the student.

This document clarifies:

- what a LearningCycle is,
- what it is not,
- how it relates to micro StudyLoads,
- why it should remain invisible to the student,
- why it must not block student continuity,
- when cycles may be opened or closed internally,
- how this principle should guide future product, UI, admin, and agentic design.

This phase is documentation only.

---

## 2. Core Definition

A LearningCycle is an internal operating window of the SRA.

It groups one or more loops of micro StudyLoads so that Bexauri and the human supervisor can:

- organize evidence,
- interpret learning progress,
- make supervised decisions,
- align work with the student's roadmap,
- preserve traceability,
- protect pedagogical quality,
- maintain operational health.

A LearningCycle is not the whole tutoring experience.

The tutoring experience is a continuous learning trajectory. LearningCycles are internal stages used to regulate that trajectory.

---

## 3. Conceptual Hierarchy

The preferred hierarchy is:

Tutoring relationship
-> Program
-> Student enrollment / active trajectory
-> Roadmap
-> LearningCycle
-> micro StudyLoads
-> responses, feedback, self-report, evidence
-> supervised interpretation
-> next-step adjustment

Simplified:

- Tutoring = the full learning relationship.
- Program = PAES_M1, PAES_L1, PAES_M2, etc.
- Enrollment = the student's active participation in a program.
- Roadmap = the learning map.
- LearningCycle = an internal operating window of regulation.
- StudyLoad = a visible unit of student work.
- Response = evidence.
- CycleDecision = supervised interpretation and next-step direction.

---

## 4. LearningCycle as an Evidence Container

A LearningCycle can contain one or more micro StudyLoad loops.

Each micro StudyLoad loop may include:

- pending work,
- start,
- activity execution,
- answer submission,
- feedback or evidence capture,
- self-report,
- completion.

The LearningCycle groups these loops to answer:

- What was the purpose of this learning stage?
- What evidence was produced?
- What did the student report?
- What should happen next?
- Is the roadmap still appropriate?
- Does the student need reinforcement, challenge, hold, or redirection?

Formula:

LearningCycle = purpose + micro StudyLoads + evidence + decision

If there is no purpose, it is only a folder.
If there is no evidence, it is only an intention.
If there is no decision, it is only accumulated activity.
If all four are present, it becomes useful regulation.

---

## 5. Invisible-to-Student Principle

LearningCycles must be invisible to the student.

The student should not need to understand, start, close, or manage LearningCycles.

The student should not experience the platform as:

- "I am in Cycle 3."
- "I need to close my cycle."
- "I must wait for the next cycle."
- "I failed this cycle."
- "I am behind in the cycle."

Instead, the student should experience Bexauri as:

- "What should I work on now?"
- "My activity is available."
- "My progress was saved."
- "I can keep practicing."
- "My tutor or Bexauri can review my evidence."
- "The next step will be prepared."

LearningCycles should organize learning internally, not become student-facing administrative units.

---

## 6. Non-Blocking Continuity Principle

The student must be able to continue exercising and learning without waiting for an explicit visible response or action from Bexauri.

Bexauri may internally:

- monitor evidence,
- group micro StudyLoads,
- close or open LearningCycles,
- prepare next steps,
- maintain operational health,
- review quality,
- support supervisor decisions,
- identify risk or ambiguity.

But these internal operations must not unnecessarily block the student's visible learning continuity.

Default principle:

The student continues learning.
Bexauri regulates internally.

The regulation layer should assist the learning engine at any moment, but it should not become friction unless there is a justified pedagogical, operational, or safety reason.

---

## 7. What the Student Should See

The student-facing experience should focus on:

- current work,
- available activities,
- short instructions,
- answer submission,
- feedback when available,
- self-report,
- progress saved,
- next step,
- continuity.

Preferred language:

- What should I work on now?
- Your activity is ready.
- Your progress was saved.
- You can continue practicing.
- Your evidence can be reviewed.
- We are preparing your next step.

Avoid student-facing language such as:

- Cycle 1
- Cycle 2
- Close cycle
- Start cycle
- Cycle decision
- Cycle evaluation
- You failed this cycle
- Wait until your cycle is closed

---

## 8. What the SRA and Supervisor Should See

The internal/admin/supervisor layer may expose LearningCycles because they are useful for operational control.

The SRA and supervisor may need to see:

- cycle number,
- cycle status,
- openedAt,
- closedAt,
- related StudyLoads,
- submitted responses,
- self-reports,
- item-level evidence,
- CycleDecisions,
- CycleEvaluations,
- operational indicators,
- roadmap alignment,
- risk signals.

This visibility belongs to the system and supervisor, not to the student's core learning experience.

---

## 9. When to Close a LearningCycle

A LearningCycle should not close only because of a fixed number of days or a fixed number of activities.

A LearningCycle should close when the evidence is sufficient to make a useful next-step decision.

Recommended closure conditions:

1. The cycle's purpose was fulfilled.
2. At least one meaningful StudyLoad was completed.
3. Evidence is available.
4. A self-report or equivalent student signal is available when appropriate.
5. A supervised or system-assisted next-step decision can be made.
6. Closing the cycle clarifies the trajectory instead of adding bureaucracy.

Examples:

- Balanced entry activity completed -> close cycle -> decide initial focus.
- Function practice completed with clear evidence -> close cycle -> advance or reinforce.
- Mixed evidence or difficulty signal -> close cycle -> redirect or hold.
- Long unclear accumulation of unrelated activities -> close cycle or split future work into clearer stages.

---

## 10. When Not to Close a LearningCycle

Do not close a LearningCycle if:

- there is no evidence,
- the cycle purpose has not been attempted,
- the student is still working on the same intended stage,
- closing would create an unnecessary wait,
- no useful next-step decision can be made,
- closure would only satisfy administrative neatness.

The purpose is regulation, not paperwork.

---

## 11. When to Open a New LearningCycle

A new LearningCycle may be opened when:

- the previous cycle produced enough evidence,
- the learning focus changes,
- the student moves to a new roadmap stage,
- a new intervention begins,
- a new challenge or assessment block starts,
- the SRA needs a clean evidence window,
- the previous cycle became too broad or diffuse.

Opening a new LearningCycle should be an internal SRA action, not a student action.

---

## 12. Avoiding Bottlenecks

LearningCycles must not create bottlenecks.

Bad pattern:

Student completes activity
-> waits for cycle close
-> waits for admin decision
-> cannot continue

Preferred pattern:

Student completes activity
-> progress saved
-> next available work can continue
-> Bexauri internally monitors and adjusts
-> supervisor can intervene when needed

The student should only be blocked when there is a clear reason, such as:

- no valid next activity exists,
- evidence is contradictory and requires review,
- risk of overloading or frustrating the student,
- content quality issue,
- operational integrity issue,
- safety or trust concern.

Otherwise, continuity should be preserved.

---

## 13. Interaction With Microlearning

Microlearning remains the operating motor of the SRA.

A micro StudyLoad is the visible learning unit.

A LearningCycle is the internal regulation window that groups one or more StudyLoads.

Therefore:

- StudyLoads should be simple, actionable, and student-facing.
- LearningCycles should be internal, traceable, and decision-oriented.
- Feedback should be close to the activity when possible.
- Decisions should use accumulated evidence without blocking normal continuity.

---

## 14. Interaction With Roadmap

LearningCycles can help the system match actual student work with roadmap stages.

They can mark operational stages such as:

- initial balanced entry,
- first focus area,
- reinforcement block,
- challenge block,
- mixed practice,
- short assessment,
- roadmap transition,
- recovery after pause.

However, roadmap stages should guide the internal SRA. They should not become rigid labels that pressure the student.

The student sees continuity. The system sees stage alignment.

---

## 15. Interaction With Future AI Agents

Future AI agents must respect this principle.

Agents may assist with:

- evidence interpretation,
- next StudyLoad suggestion,
- risk detection,
- feedback drafting,
- roadmap alignment,
- cycle summary,
- supervisor decision support.

Agents must not:

- expose internal cycle mechanics unnecessarily to the student,
- force students to wait for artificial cycle operations,
- make unsupervised high-stakes decisions,
- overdiagnose based on one micro item,
- treat cycle closure as a student task,
- replace human oversight for sensitive decisions.

Agentic behavior must remain governed, traceable, bounded, and aligned with the SRA.

---

## 16. Product Rule

The product rule is:

LearningCycles are internal operating windows for regulation.
StudyLoads are visible units of student work.
The student experience must remain continuous, simple, and non-blocking.

Short version:

The student learns continuously.
Bexauri regulates internally.

---

## 17. Implications for Future UI

Student UI should avoid exposing LearningCycle mechanics directly.

Future student-facing screens should prioritize:

- what to do now,
- what was completed,
- what feedback is available,
- what can be practiced next,
- what progress was saved.

Admin/supervisor UI may expose LearningCycles clearly because they support governance and auditability.

If a future UI references stages, it should use student-friendly language such as:

- current focus,
- current step,
- current practice block,
- next recommended work,

not internal language such as:

- CycleDecision,
- CycleEvaluation,
- close cycle,
- cycle number,
- internal status.

---

## 18. Phase Result

MVP-LEARNING-1 defines the invisible and non-blocking LearningCycle principle.

This principle protects two goals at the same time:

1. Student experience remains simple and continuous.
2. Bexauri keeps internal regulation, evidence grouping, traceability, and supervised decision-making.

This closes a conceptual gap between the current implementation and the long-term vision of Bexauri as a quality Learning Regulation System.

---

## 19. Non-Goals

This phase does not:

- change app code,
- change schema,
- mutate data,
- touch production,
- deploy,
- change endpoints,
- change UI,
- use Abacus,
- create StudyLoads,
- close or open actual LearningCycles.

---

## 20. Recommended Next Phase

Recommended next phase:

MVP-CONTENT-9 — Decide operational path for attaching PAES M1 balanced entry to beta/internal student flow

MVP-CONTENT-9 should use the principle defined here:

- do not expose LearningCycles to students,
- do not block student continuity unnecessarily,
- use cycles internally to group evidence and support next-step decisions.
