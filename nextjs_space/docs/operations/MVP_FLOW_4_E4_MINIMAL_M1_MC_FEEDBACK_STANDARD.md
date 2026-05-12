# MVP-FLOW-4-E4 - Minimal M1 MC Feedback Standard

## 1. Phase result / executive summary

MVP-FLOW-4-E4 defines the minimal in-activity feedback standard for PAES_M1 multiple-choice StudyLoads.

This phase is documentation/design only. It does not change runtime code, endpoints, schema, UI, content registry, database state, or deployment state.

The standard is intentionally small: students should receive honest activity-level and per-question feedback where the platform has safe evidence, without PAES score, theta, mastery, adaptive AI, or definitive diagnostic claims.

## 2. Why E4 is needed after E3/E3A

E3 extended PAES_M1 continuity so the second validated path can continue from:

`paes_m1_linear_equations_basic` -> `paes_m1_linear_equations_word_problems`

E3A corrected the two involved StudyLoads to respect the accepted micro StudyLoad rule: maximum 4 exercises.

After E3/E3A, the student can move farther through the M1 path, but the feedback standard remains underspecified. Without a clear feedback standard, future implementation could overclaim, leak answer keys incorrectly, invent explanations, or confuse activity evidence with PAES-level diagnosis.

## 3. Current validated baseline

Live Git preflight for E4:

- HEAD = origin/main = `4ed548b`.
- Last accepted commit: `MVP-FLOW-4-E3: extend M1 continuity edge`.
- Working tree expected clean at phase start.

Context mismatch note:

- Some context documents still embed stale `213fccb` baseline values.
- Per protocol, Git preflight is live truth and stale embedded document baselines do not override it.

Current validated runtime state:

- E3/E3A completed and pushed at `4ed548b`.
- First two continuity edges now exist up to word problems:
  - `paes_m1_balanced_entry_initial` -> `paes_m1_linear_equations_basic`.
  - `paes_m1_linear_equations_basic` -> `paes_m1_linear_equations_word_problems`.
- E3A discovered legacy 8-item content and corrected the E3-involved StudyLoads to 4 items:
  - `PAES M1 - Ecuaciones lineales basicas`.
  - `PAES M1 - Problemas con ecuaciones lineales`.
- E3/E3A validation observed the next pending word-problem StudyLoad after completing linear equations basic, with the same LearningCycle open and no CycleDecision, CycleEvaluation, governance record, or new LearningCycle.

## 4. Student-facing feedback standard

Minimum student-facing feedback should be:

- immediate enough to help the student learn from the activity;
- clearly tied to the completed StudyLoad;
- calm and non-punitive;
- explicit that the result is evidence from this activity, not a PAES score;
- limited to evidence the platform actually has.

The feedback experience should answer:

- Which questions did I answer?
- Which option did I select?
- Which questions were correct or incorrect when an answer key exists?
- What is my activity-level result?
- What self-report did I leave?
- What happens next?

It should not label the student, predict PAES performance, or claim a full diagnosis.

## 5. Per-question feedback fields

Minimum per-question feedback fields:

- question key, such as `q1`;
- question stem;
- selected option label and text;
- saved/not saved status if needed;
- correctness state when `correctOptionKey` exists:
  - correct;
  - incorrect;
  - unavailable if no answer key exists;
- correct option label and text only after submission/completion and only when safe;
- explanation only if it exists as versioned content.

Do not invent explanations from the prompt or answer key. Absence of an explanation should be displayed honestly or omitted.

## 6. Activity-level summary standard

Minimum activity-level summary fields:

- StudyLoad title.
- Submitted answer count.
- Total item count.
- Correct count when every submitted item has a safe answer key.
- Self-report value.
- Completion status.
- Non-PAES evidence note.
- Next-step orientation when a next StudyLoad is available.

Recommended student-facing summary shape:

- `Respondiste 4 de 4 preguntas.`
- `Tus respuestas quedaron registradas como evidencia de esta actividad.`
- `Tu autorreporte: Me fue bien.`
- `Este resultado no es un puntaje PAES ni una decision definitiva de nivel.`

## 7. Copy guardrails / approved language

Approved language:

- `Tus respuestas quedaron registradas como evidencia de esta actividad.`
- `Este resultado ayuda a preparar tus proximos pasos.`
- `Este resultado no es un puntaje PAES.`
- `Este resultado no define por si solo tu nivel completo.`
- `Tu avance puede ser revisado por Bexauri para cuidar la calidad de la ruta.`
- `Puedes continuar con la siguiente actividad disponible.`

Avoid language that makes the student feel punished, ranked, diagnosed, or blocked by administration.

## 8. Forbidden claims

Do not claim:

- PAES score prediction.
- Theta.
- Mastery.
- Adaptive AI.
- Definitive diagnosis.
- Automatic placement certainty.
- Full roadmap personalization.
- Human review already happened unless it actually happened.
- The student failed or passed PAES_M1 based on a micro StudyLoad.

## 9. Registry/content requirements

Current content registry facts:

- `correctOptionKey` may support correctness feedback.
- The current activity viewer strips `correctOptionKey` before rendering client items.
- That stripping is correct as a safety baseline; a future feedback implementation must expose correctness only after submission/completion through a deliberate server-controlled path.

Requirements:

- Explanations must not be invented.
- If explanations are later added, they must be versioned content.
- If an item lacks `correctOptionKey`, the UI must not infer correctness.
- If an explanation is missing, do not fabricate one from the answer key.
- Content changes must preserve contentKey/contentVersion discipline.

## 10. Evidence and supervisor interpretation

Answer correctness is evidence.

Self-report is evidence.

Together, they can support supervised interpretation, but they are not automatic mastery or diagnostic certainty.

Supervisor review remains asynchronous quality control. The supervisor may use answer patterns, correct count, self-report, completion state, and content metadata to decide whether to advance, reinforce, hold, redirect, or review manually.

Normal student continuity should not wait for supervisor release when an explicit safe continuity rule exists.

## 11. Implementation readiness notes

A later runtime phase may update the activity viewer and/or related response-completion flow to show minimal feedback.

Likely implementation questions for a later phase:

- Should feedback appear immediately after MC submission, after final completion, or both?
- Which server route should expose correctness safely?
- How should existing submitted answers be joined with content answer keys?
- How should completed StudyLoads render when the student revisits them?
- Should feedback be shown before self-report, after self-report, or after completion only?

E4 does not answer these with runtime changes. E4 defines the standard so future implementation can be scoped safely.

## 12. Acceptance criteria for a future implementation phase

A future minimal feedback implementation should satisfy:

- Student can complete an M1 MC StudyLoad and see a clear activity-level summary.
- Student can see selected options after submission/completion.
- Student can see correct/incorrect per item only when `correctOptionKey` exists.
- Student can see correct option after submission/completion, not before.
- No answer key is exposed in initial interactive item payload.
- No explanation is shown unless it exists as versioned content.
- Copy explicitly avoids PAES score, theta, mastery, adaptive AI, and definitive diagnosis.
- Self-report remains visible as evidence.
- Build passes.
- Existing continuity behavior remains unchanged.

## 13. Explicit non-goals

E4 does not:

- implement runtime feedback UI;
- change the activity viewer;
- change response endpoints;
- change completion endpoints;
- change Prisma/schema;
- mutate the database;
- add explanations to content;
- add a scoring engine;
- add adaptive AI;
- add theta;
- add mastery;
- add PAES score prediction;
- add L1/M2 behavior;
- add supervisor workflow;
- add a full roadmap engine.

## 14. Risks and mitigations

Risk: answer keys leak before submission.

Mitigation: keep answer keys server-owned and expose correctness only after submission/completion through a deliberate path.

Risk: students interpret a 4-item result as a PAES score or level.

Mitigation: require explicit copy that the result is activity evidence, not PAES score or definitive level.

Risk: explanations are invented or inconsistent.

Mitigation: show explanations only if they exist as versioned content.

Risk: feedback delays continuity.

Mitigation: keep supervisor review asynchronous and preserve automatic next StudyLoad continuity when a safe rule exists.

Risk: future implementation tries to solve the full roadmap/evidence engine at once.

Mitigation: keep the first implementation narrow: per-question correctness and activity-level summary only.

## 15. Next recommended phase

Recommended next phase depends on product decision:

- `MVP-FLOW-4-E4A - Implement minimal feedback UI for M1 MC activities`, if the next priority is to show the E4 feedback standard in the activity experience.
- `MVP-FLOW-4-E5 - Complete a 3 to 5 StudyLoad M1 path locally with one student fixture`, if current feedback limitations are accepted temporarily and the priority is path validation.

Recommendation: choose E4A if student learning quality during each activity is the immediate concern; choose E5 if continuity-path confidence is the immediate concern.
