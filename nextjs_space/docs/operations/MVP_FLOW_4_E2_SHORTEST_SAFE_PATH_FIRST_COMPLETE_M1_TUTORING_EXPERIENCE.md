# MVP-FLOW-4-E2 - Shortest Safe Path to First Complete M1 Tutoring Experience

## 1. Current validated baseline

Live preflight for this phase:

- HEAD = origin/main = `5980ede`.
- Last accepted commit: `MVP-FLOW-4-E1: add M1 documentation index and transfer protocol`.
- Expected working tree: clean.

Validated runtime capability from MVP-FLOW-4-D-VERIFY-RETRY:

- First rule-based automatic continuity pair is implemented and locally validated:
  - `paes_m1_balanced_entry_initial` -> `paes_m1_linear_equations_basic`.
- Student completed `PAES M1 - Entrada balanceada inicial`.
- Bexauri automatically created `PAES M1 - Ecuaciones lineales basicas`.
- `/now` showed the new pending load with `Ver actividad` and `Empezar`.
- No indefinite wait and no manual supervisor release occurred.
- Cycle #1 remained open.
- Total loads: 2, with pending 1 and completed 1.
- CycleDecision count remained 0.
- CycleEvaluation count remained 0.
- Governance record count remained 0.
- LearningCycle count remained 1.

This validates only the first continuity pair, not the complete PAES_M1 tutoring path.

## 2. Definition of first complete minimal PAES_M1 tutoring experience

The first complete minimal PAES_M1 tutoring experience means one student can enter PAES_M1 and complete a short, coherent M1 learning sequence without supervisor release as the normal bottleneck.

Minimum definition:

- The student receives the first balanced entry StudyLoad.
- The student starts, answers, self-reports, and completes inside the activity flow.
- Bexauri records answer/self-report evidence.
- Bexauri prepares the next relevant StudyLoad automatically when a safe rule exists.
- The student sees the next pending StudyLoad in `/now`.
- The student can continue through at least 3 to 5 StudyLoads in a coherent M1 sequence.
- The completed work remains visible as registered activity.
- The supervisor can review or intervene asynchronously, but normal student continuity does not wait for manual release.

This is not a claim of full adaptivity, mastery, PAES score prediction, or final roadmap coverage.

## 3. Student-facing loop required for MVP-Beta

Required MVP-Beta loop:

1. Student enters PAES_M1 tutoring.
2. Student sees the current pending StudyLoad.
3. Student starts the activity.
4. Student answers MC items.
5. Student self-reports.
6. Student completes inside the activity.
7. Student returns to `/now` or equivalent orientation surface.
8. Student sees completed work under registered activities.
9. Student sees the next pending StudyLoad when a safe continuity rule exists.

Student-facing guardrails:

- Do not expose LearningCycles as student tasks.
- Do not frame micro StudyLoads as PAES score prediction.
- Do not describe rule-based next-load selection as adaptive AI.
- Do not make supervisor review look like the normal release gate.

## 4. Internal SRA loop required for MVP-Beta

Required internal SRA loop:

master roadmap -> active slice -> micro StudyLoad -> evidence -> supervised adjustment -> next active slice.

For MVP-Beta, this can remain rule-based and partially manual:

- Content registry provides StudyLoad content.
- Completion writes answer/self-report evidence.
- Continuity rules prepare the next StudyLoad when the next edge is explicitly safe.
- Supervisor review remains asynchronous quality control.
- LearningCycle remains an internal evidence window and should not be used as a student-facing step.

## 5. Minimum PAES_M1 content path

Minimum content path for the first complete M1 experience:

1. `paes_m1_balanced_entry_initial` - PAES M1 - Entrada balanceada inicial.
2. `paes_m1_linear_equations_basic` - PAES M1 - Ecuaciones lineales basicas.
3. `paes_m1_linear_equations_word_problems` - PAES M1 - Problemas con ecuaciones lineales.
4. `paes_m1_linear_equations_reinforcement` - PAES M1 - Refuerzo de ecuaciones lineales.
5. `paes_m1_linear_functions_basic` - PAES M1 - Funciones lineales basicas.

Only the first edge is validated today:

- `paes_m1_balanced_entry_initial` -> `paes_m1_linear_equations_basic`.

The next safe roadmap work should decide and validate at least one additional continuity edge after `paes_m1_linear_equations_basic`.

## 6. Missing continuity behavior after the first validated pair

Still missing:

- Rule and validation for `paes_m1_linear_equations_basic` -> next StudyLoad.
- Idempotency validation beyond the first edge.
- Local validation of a 3 to 5 StudyLoad sequence with one student fixture.
- Branching rule for weak or mixed evidence after linear equations basic.
- Clear fallback behavior when no safe next rule exists.
- Evidence-aware supervisor override or adjustment process.

Near-term recommendation:

- Implement and validate the next continuity edge first.
- Do not jump directly to a full roadmap engine.

## 7. Missing evidence and feedback behavior

Still missing or immature:

- Minimal standard for in-activity MC feedback across M1 activities.
- Consistent student-facing language that results are evidence, not PAES score.
- Clear handling of correct count and explanation display where content supports it.
- Supervisor-readable evidence summary for completed activities.
- Defined interpretation of self-report plus answer evidence.

Near-term recommendation:

- Define a minimal in-activity feedback standard before expanding the path too far.
- Keep feedback honest and limited to the activity evidence.

## 8. What remains manual or supervisor-mediated in MVP-Beta

Keep these manual or supervisor-mediated:

- Pedagogical interpretation beyond simple continuity rules.
- Branching after weak, mixed, or contradictory evidence.
- Acceleration or skipping ahead.
- Remediation strategy after repeated errors.
- Quality review of content and explanations.
- Student-risk or engagement interventions.
- Final readiness to expand from guided MVP-Beta to broader use.

Supervisor is asynchronous quality control and exception handling, not the normal release bottleneck.

## 9. Explicitly out of scope

Out of scope for the first complete minimal M1 tutoring experience:

- Adaptive AI.
- Theta.
- PAES score prediction.
- Automatic mastery claims.
- L1/M2 expansion.
- Full roadmap engine.
- Full automatic branching across all PAES_M1 axes.
- Ensayo automation.
- New schema unless separately scoped later.
- New student-facing claims of personalization beyond implemented behavior.

## 10. Shortest safe implementation sequence after E2

Recommended sequence:

1. MVP-FLOW-4-E3 - Implement and validate the next continuity edge after linear equations basic.
   - Candidate edge: `paes_m1_linear_equations_basic` -> `paes_m1_linear_equations_word_problems`.
   - Keep it rule-based, explicit, idempotent, and scoped to PAES_M1.

2. MVP-FLOW-4-E4 - Define minimal in-activity feedback standard for M1 MC activities.
   - Documentation/design first unless explicitly changed.
   - Standardize what the student may see: answered count, selected answer, correct answer/explanation where safe, self-report, and non-PAES evidence note.

3. MVP-FLOW-4-E5 - Complete a 3 to 5 StudyLoad M1 path locally with one student fixture.
   - Validate continuity across the path.
   - Confirm `/now` states, registered activities, self-report visibility, open cycle behavior, and absence of unwanted lifecycle side effects.

4. MVP-FLOW-4-E6 - Add minimal supervisor review/readiness view only after the student loop works.
   - Keep the supervisor view focused on evidence review and exception handling.
   - Do not make it the normal release gate.

5. MVP-FLOW-4-E7 - Run a second-student local validation.
   - Confirm behavior is not fixture-specific.
   - Validate idempotency and repeatability.

6. MVP-FLOW-4-E8 - Decide whether MVP-Beta internal guided use is ready.
   - Decision phase.
   - Check student loop, evidence quality, operational risk, content coverage, and supervisor readiness.

## 11. Stop conditions before L1/M2 or advanced automation

Do not expand to L1/M2 or advanced automation until:

- One PAES_M1 student can complete a 3 to 5 StudyLoad path locally.
- Automatic continuity works for more than the first pair.
- The system avoids indefinite waiting after completion when a safe next rule exists.
- The cycle/lifecycle side effects remain controlled and understood.
- The student-facing copy avoids PAES score, mastery, theta, and adaptive AI claims.
- The supervisor role is defined as asynchronous quality control.
- At least one second-student validation confirms repeatability.
- The team explicitly decides MVP-Beta guided use is ready.

## 12. Repaired Context Transfer Protocol

The assistant/agent is responsible for preserving continuity across chats.

Git preflight output is the live source of truth for HEAD, origin/main, and working tree state. The handoff and documentation index are versioned context documents, not absolute live state.

Protocol:

1. Always run or use provided Git preflight before relying on embedded baseline text.
2. If Git preflight contradicts the baseline written in the handoff or documentation index, Git preflight wins.
3. The assistant/agent must explicitly flag the mismatch.
4. If the current phase allows documentation changes, correct stale baseline and next-phase references.
5. If the current phase does not allow documentation changes, include the mismatch in the next-chat handoff.
6. Every next-chat handoff must include the latest verified Git state, if available.
7. Every next-chat handoff must include the rule that Git preflight overrides stale documentation baselines.
8. Mauricio must not be responsible for remembering or reconstructing this rule manually.
9. This rule must be propagated again in every future handoff.

Minimum future handoff content:

- latest verified HEAD, origin/main, and working tree state;
- last accepted commit;
- last closed phase;
- next recommended phase;
- canonical documents;
- current handoff file;
- documentation index file;
- validated capabilities;
- immature capabilities;
- product and technical guardrails;
- preflight commands;
- ready-to-paste next-chat prompt;
- this repaired Context Transfer Protocol.
