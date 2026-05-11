# MVP-FLOW-4-B - Minimal non-blocking next StudyLoad continuity design

## Purpose

Design the minimal safe MVP mechanism that can later let Bexauri create or release the next visible StudyLoad automatically after a student completes a content-backed StudyLoad.

This phase does not implement runtime behavior. It defines the product and technical direction for non-blocking continuity after MVP-FLOW-3 and MVP-FLOW-4-A2.

## Canonical anchor

Canonical source re-read before this design:

- `nextjs_space/docs/operations/MVP_UI_FLOW_1_CANONICAL_STUDENT_UI_JOURNEY.md`

Anchor:

- The student and supervisor work in parallel, not in series.
- After finishing a StudyLoad, the student must not normally wait for an internal administrative task or human review before continuing.
- Bexauri should prepare the next visible StudyLoad automatically, unless there is a pedagogical, operational, or safety reason to pause continuity.
- Human supervision remains important, but it operates as quality control and intervention, not as the normal bottleneck.
- The MVP can use simple controlled rules, predefined sequences, basic evidence, and human supervision in parallel before advanced adaptive automation exists.

## Why MVP-FLOW-4-A is only an audit

MVP-FLOW-4-A remains useful as an audit of the current technical gap: after completion, the current system can show a waiting state and does not yet create the next StudyLoad.

MVP-FLOW-4-A is not a valid blocking product principle. Its decision to avoid immediate automation should be read as: do not implement next-load automation without a dedicated safe design phase. It must not be read as: the student should normally wait for supervisor review before receiving the next StudyLoad.

MVP-FLOW-4-A2 corrected this interpretation and restored the canonical non-blocking continuity principle.

## Desired post-completion steady state

The desired MVP-Beta steady state is:

1. Student completes a content-backed StudyLoad.
2. Answers, evidence, and self-report are recorded.
3. Bexauri prepares or releases the next visible StudyLoad automatically when safe.
4. `/now` shows a next activity when possible, not indefinite waiting.
5. Supervisor can review evidence in parallel, intervene when needed, and adjust future path quality without being the normal release bottleneck.

The waiting state remains valid only as a fallback for end-of-sequence, missing content, safety/pedagogical stop, or operational error.

## Minimal MVP next-StudyLoad selection rule

Use a conservative rule based on a predeclared content progression sequence, not adaptive AI.

Recommended rule:

- For a completed content-backed StudyLoad, resolve its `contentKey`.
- Look up the next contentKey in a small explicit progression map scoped by program.
- If a next contentKey exists and maps to registered content for the same program, create or release exactly one next pending StudyLoad for the same enrollment and current open learning context.
- If no next contentKey exists, enter an explicit fallback state rather than inventing content.

This is rule-based continuity. It does not diagnose mastery, personalize with AI, or claim adaptive selection.

## Recommended sequence mechanism

Possible sequence mechanisms:

- Exact title matching: simple but brittle because titles are display copy and can change.
- Registry ordering: easy to read but too implicit; order changes can accidentally alter student progression.
- Metadata-only sequencing: useful later, but currently risks larger registry changes.
- Explicit progression map: small, auditable, program-scoped, and safe for MVP.

Recommendation:

Use a small explicit progression map keyed by `contentKey`, scoped by program, for the next implementation phase.

Example shape for a future implementation design:

```ts
const NEXT_STUDYLOAD_BY_PROGRAM_AND_CONTENT_KEY = {
  PAES_M1: {
    paes_m1_balanced_entry_initial: 'paes_m1_linear_equations_basic',
    paes_m1_linear_equations_basic: 'paes_m1_linear_equations_word_problems',
  },
}
```

The future implementation should resolve content through existing registered content lookup rather than relying on display titles as source of truth. Titles can still be used when constructing the StudyLoad record after the next content is resolved.

## Fallback behavior when no next registered content exists

The future implementation should distinguish fallback reasons explicitly.

### Normal end-of-sequence

Definition: The current contentKey is valid, but the explicit progression map has no next entry.

Behavior:

- Do not invent a StudyLoad.
- Show a calm waiting/complete state.
- Indicate that Bexauri is preparing the next activity.
- Surface the case to admin/supervisor as sequence complete or needs next content.

### Missing content

Definition: The progression map points to a next contentKey, but registered content cannot be resolved.

Behavior:

- Do not create a broken StudyLoad.
- Show fallback waiting copy to the student.
- Log or expose an operational readiness issue for admin/supervisor.

### Safety or pedagogical stop

Definition: Basic rule detects a condition that should pause continuity, such as explicit safety flag, severe operational inconsistency, or future high-risk evidence state.

Behavior:

- Do not create the next StudyLoad automatically.
- Keep the student-facing copy calm and non-technical.
- Surface the reason to admin/supervisor for review.

### Operational error

Definition: The next StudyLoad could not be created due to database, transaction, auth, or unexpected runtime failure.

Behavior:

- Preserve the completed StudyLoad state.
- Avoid partial duplicate creation.
- Show fallback waiting copy.
- Record enough operational context for debugging.

## Avoiding premature adaptive claims

The next StudyLoad selected by this mechanism is not AI personalization, mastery diagnosis, or adaptive tutoring.

It is controlled continuity:

- rule-based,
- predeclared,
- auditable,
- program-scoped,
- registry-backed,
- and supervised in parallel.

Student-facing and admin-facing copy should avoid claiming that Bexauri inferred mastery or selected an optimal next task. Accurate wording is closer to: Bexauri prepared the next activity in the planned sequence using the evidence from the activity flow.

## Supervisor role

The supervisor remains parallel and important:

- reviews evidence,
- checks quality,
- detects risk,
- adjusts future paths,
- intervenes when the sequence appears wrong,
- identifies content gaps,
- and validates whether controlled progression remains pedagogically reasonable.

The supervisor should not normally release every next StudyLoad manually. Manual release can exist as an override or exception path, not the default path for ordinary content-backed continuity.

## Future implementation options

### Option A - Create next StudyLoad inside the complete endpoint

Description:

After `/api/study-loads/[id]/complete` marks the current StudyLoad completed, it resolves the next contentKey and creates the next pending StudyLoad in the same transaction or immediate completion flow.

Pros:

- Direct and simple.
- Strong causal link between completion and next-load creation.
- Easy for the student to see next activity immediately after completion or refresh.

Cons:

- The complete endpoint gains more responsibility.
- Harder to test independently if sequencing grows.
- Risk of mixing lifecycle completion with continuity planning.

### Option B - Create next StudyLoad through a dedicated continuity service called after completion

Description:

The complete endpoint remains the trigger, but calls a small dedicated continuity service such as `prepareNextStudyLoadAfterCompletion(...)`. The service owns progression lookup, guardrails, idempotency, and fallback reason classification.

Pros:

- Clear separation of concerns.
- Easier to test progression behavior independently.
- Better place for guardrails and future admin/supervisor signals.
- Still supports automatic non-blocking creation immediately after completion.

Cons:

- Slightly more structure than putting all logic in the endpoint.
- Requires careful transaction boundary design.

### Option C - Future admin/manual override

Description:

Admin can manually create, release, replace, skip, or pause the next StudyLoad when needed.

Pros:

- Useful for exceptions.
- Preserves human control for safety, content gaps, or beta operations.
- Helps debug early progression rules.

Cons:

- If used as the default path, it violates the canonical non-blocking flow.
- Can become an operational bottleneck.

### Recommendation

Recommend Option B for the next implementation phase: a dedicated continuity service called after completion.

The minimal path should be:

1. Complete endpoint records completion as it does today.
2. Complete endpoint calls a small continuity service after successful completion.
3. Service resolves current contentKey and next contentKey using an explicit progression map.
4. Service creates exactly one next pending StudyLoad when guardrails pass.
5. Service returns a structured outcome such as `created`, `end_of_sequence`, `missing_content`, `paused`, or `skipped_existing`.

This keeps student continuity automatic while keeping the logic auditable and bounded.

## /now expected behavior after completion

When the next StudyLoad exists:

- `/now` should show the next pending activity.
- The student should see `Ver actividad` and `Empezar` where appropriate.
- The completed activity should remain under `Actividades registradas`.
- The page should not imply the student is blocked by supervisor review.

When no next StudyLoad exists:

- `/now` may show `Actividad registrada`.
- Fallback copy should be calm and honest, for example: `Bexauri esta preparando tu proxima actividad.`
- Admin/supervisor surfaces should distinguish the reason: end-of-sequence, missing content, safety/pedagogical stop, or operational error.

## Guardrails

Future implementation should include these guardrails:

- Idempotency: repeated completion calls or retries must not create duplicate next StudyLoads.
- No duplicate next StudyLoads for the same enrollment, current learning context, and target contentKey.
- Only create next StudyLoads for content-backed completed loads.
- Next content must belong to the same enrollment/program.
- Current learning context must be open and valid.
- Do not automatically close cycles.
- Do not automatically create CycleDecision.
- Do not automatically create CycleEvaluation.
- Do not claim mastery.
- Do not claim AI personalization.
- Preserve fallback `Terminar` behavior for no-content loads until separately redesigned.
- Return or record a structured non-creation reason when no next load is created.

## Proposed next phase

Recommended next phase: MVP-FLOW-4-C - Minimal continuity implementation readiness audit.

Purpose:

- Inspect the complete endpoint, StudyLoad creation patterns, registry lookup helpers, and current transaction boundaries.
- Confirm where a dedicated continuity service should live.
- Define the exact progression map shape and first PAES_M1 sequence.
- Define idempotency criteria and duplicate detection.
- Decide whether MVP-FLOW-4-D should implement the minimal service and first progression map.

Reason for making MVP-FLOW-4-C an implementation-readiness audit first:

- The principle is clear, but the exact insertion point and transaction boundary should be verified before code changes.
- The next implementation will touch lifecycle-adjacent behavior, so the design should be converted into a small, explicit technical plan before editing runtime code.
