# MVP-FLOW-2 — Auto-create first cycle and first StudyLoad on first enrollment

## Purpose

MVP-FLOW-2 implements the first automatic onboarding continuity flow for the Bexauri learning regulator system.

The goal is that when an admin creates a first active PAES_M1 enrollment, Bexauri automatically creates:

- StudentProgramInstance,
- first LearningCycle,
- cycle_open snapshot,
- first StudyLoad,
- currentCycleId linkage,

without requiring separate manual cycle creation.

This aligns backend operational behavior with the canonical student experience flow and the invisible non-blocking LearningCycle principle.

---

## Scope

Modified file:

- nextjs_space/app/api/instances/route.ts

No other application files were modified.

Forbidden files remained untouched:

- learning-cycles route,
- study-load registry,
- schema,
- UI,
- auth/security,
- PHASE_LOG during Codex edit.

---

## Functional Behavior Added

POST /api/instances now:

1. Validates studentId and programId.
2. Fetches Program by programId.
3. Returns 404 if Program does not exist.
4. Defines:
   - effectiveStatus
   - effectiveContinuityState
5. Detects the eligible first-enrollment case:
   - program.code === 'PAES_M1'
   - active
   - normal continuity
   - no currentCycleId
6. Uses prisma.$transaction to:
   - create StudentProgramInstance,
   - create LearningCycle cycleNumber 1 status open,
   - create cycle_open CycleSnapshot,
   - create StudyLoad:
     "PAES M1 — Entrada balanceada inicial",
   - update currentCycleId,
   - update lastActivityAt.
7. Preserves previous behavior for all non-eligible cases.

---

## Architectural Alignment

This phase operationalizes several previously defined product principles:

- invisible LearningCycles,
- continuity must be non-blocking,
- first onboarding should immediately expose learning activity,
- registry-matched StudyLoads,
- no manual operational bottleneck between enrollment and first study activity.

The student experience now aligns more closely with the canonical UI journey:

Enrollment
→ first StudyLoad exists immediately
→ /now can render learning activity directly

---

## Validation

Validation performed locally:

- git diff review,
- git diff --check,
- isolated file scope audit,
- Next.js production build.

Build result:

- compiled successfully,
- type validity checks passed,
- page generation passed,
- page optimization passed.

No additional files changed during build.

---

## Codex Operational Validation

This phase also validated Codex as a real functional local editor under controlled governance.

Codex:
- edited only the allowed file,
- requested approval before applying edits,
- stayed within scope,
- did not run build,
- did not commit,
- did not push.

ChatGPT audited the diff before build and before commit.

---

## Non-Goals Preserved

This phase did not:

- modify UI,
- modify schema,
- touch production,
- deploy,
- modify auth/security,
- change learning-cycles route,
- modify registry content,
- implement adaptive logic,
- implement automated progression,
- implement AI tutoring,
- use Abacus.

---

## Phase Result

MVP-FLOW-2 passed local implementation and build validation.

Bexauri now automatically creates the first invisible learning cycle and first balanced-entry StudyLoad during eligible PAES_M1 enrollment creation.

This removes a major operational friction point between enrollment and student learning continuity.

---

## Next Recommended Steps

1. Validate local end-to-end enrollment flow through admin UI.
2. Verify /now renders the auto-created StudyLoad correctly.
3. Confirm "Ver actividad" appears immediately after enrollment.
4. Prepare MVP-FLOW-3:
   consolidate activity completion, self-report, and feedback into a single in-activity flow.
