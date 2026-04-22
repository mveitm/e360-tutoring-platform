# E360 Adaptive Tutoring Platform — Phase Log

> Continuity artifact for recovery after workspace/chat loss.
> Live URL: https://tutoring-platform-mv-l4o1ne.abacusai.app

## Status key

* ✅ deployed
* 🔒 checkpointed, not deployed
* ⚠️ uncertain / reconstructed

## Current state

* Latest closed phase: CF
* Status: D → CF closed and deployed
* Project state: stable, verified, production live
* Main recent line of work:

  * inline editing rollout
  * redundant badge cleanup
  * closed-cycle guard alignment
  * option/label consistency across views

## Phase log

### Confirmed historical blocks

| Block | Summary                                                  | Deployed | Notes                                    |
| ----- | -------------------------------------------------------- | -------: | ---------------------------------------- |
| A–D   | Core schema and first admin surfaces established         |        ✅ | Foundational models and CRUD base        |
| E–Q   | Guards, detail views, edit/delete flows, navigation mesh |        ✅ | Full CRUD and cross-navigation matured   |
| R–AH  | Search rollout across admin list views                   |        ✅ | 10/10 lists gained search                |
| T–AK  | Inline creation from detail views                        |        ✅ | Detail pages became operational surfaces |
| AL–BI | Inline editing expansion across core entities            |        ✅ | Includes list-level inline controls      |
| BJ–BU | Badge cleanup and dead-import cleanup                    |        ✅ | UI consistency + dead code removal       |

### Recent confirmed phases

| Phase | Objective                                                       | Files touched                       | Deployed |
| ----- | --------------------------------------------------------------- | ----------------------------------- | -------: |
| BV    | Inline program status select in program detail header           | `program-detail-view.tsx`           |        ✅ |
| BW    | Inline axis status select on program detail                     | `program-detail-view.tsx`           |        ✅ |
| BX    | Inline skill status select on program detail                    | `program-detail-view.tsx`           |        ✅ |
| BY    | Inline decision type select on cycle detail cards               | `cycle-detail-view.tsx`             |        ✅ |
| BZ    | Inline evaluation type select on cycle detail cards             | `cycle-detail-view.tsx`             |        ✅ |
| CA    | Inline load type select on cycle detail cards                   | `cycle-detail-view.tsx`             |        ✅ |
| CB    | Closed-cycle guard on load-status select in cycle detail view   | `cycle-detail-view.tsx`             |        ✅ |
| CC    | Closed-cycle guard on load-status select in Loads view          | `study-loads-view.tsx`              |        ✅ |
| CD    | Server-side closed-cycle guard on `PATCH /api/study-loads/[id]` | `app/api/study-loads/[id]/route.ts` |        ✅ |
| CE    | Align `decisionType` options in cycle detail to canonical 4-set | `cycle-detail-view.tsx`             |        ✅ |
| CF    | Normalize `evaluationType` labels in cycle detail               | `cycle-detail-view.tsx`             |        ✅ |

## Schema notes

| Block  | Change                                  | Notes                                                 |
| ------ | --------------------------------------- | ----------------------------------------------------- |
| A–D    | Core schema established and completed   | Last known schema-expansion block                     |
| Post-D | No confirmed schema changes in this log | Treat as current assumption unless verified otherwise |

## Continuity notes

* Single shared PostgreSQL DB across environments: handle carefully.
* Some older phase boundaries are reconstructed from code/history rather than fully logged live.
* Canonical decisionType set: `advance`, `reinforce`, `hold`, `redirect`.
* Canonical evaluationType values: `diagnostic`, `progress_check`, `cycle_close`.
* Canonical loadType values: `practice`, `reading`, `video`, `project`, `assessment`.

## Phase CG — Inline confidence editing on enrollment detail
- Added inline confidenceLevel editing on enrollment detail SkillState cards
- Canonical options: none / low / medium / high
- Reused existing PATCH flow for skill states
- Corrected local confidenceLevel typing from number to string in enrollment-detail-view
- Verified with tsc, build, manual UI test, persistence check, and post-deploy confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CH — Inline reinforcement editing on enrollment detail
- Added inline needsReinforcement editing on enrollment detail SkillState cards
- Canonical options: No reinforce / Reinforce ⚠
- Reused existing PATCH flow for skill states with boolean mapping
- Replaced the old conditional amber "Needs reinforcement" label with an inline select
- Verified with tsc, build, manual UI toggle test, persistence check, sync check, and post-deploy confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

Note:
- Abacus post-deploy summary mentioned prior Phase CE as part of the shipped checkpoint narrative.
- No functional issue observed, but future post-deploy summaries should describe only the phase being deployed to avoid custody ambiguity.

## Phase CJ-pre — Guarded legacy fallback for StudyLoad loadType
- Added guarded compatibility fallback for non-canonical StudyLoad.loadType values in read/edit selects
- Legacy values now render truthfully as `<raw value> (legacy)` instead of collapsing to the first canonical option
- Applied only to existing persisted-value selects in:
  - study-loads-view
  - cycle-detail-view
- Create paths remain restricted to canonical options
- Verified with tsc, build, manual UI checks, and post-deploy confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CJ — Study Loads search in cycle detail
- Added client-side search/filter for Study Loads in cycle detail view
- Search matches by study load title and loadType
- Added empty state and "Showing X of Y" indicator
- Search is hidden when the cycle has no study loads
- Verified with tsc, build, manual UI checks, and post-deploy confirmation
- Deployed together with CJ-pre to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CK — Cycle Decisions search in cycle detail
- Added client-side search/filter for Cycle Decisions in cycle detail view
- Search matches by decisionType and rationale
- Added empty state and "Showing X of Y" indicator
- Search renders only when the cycle has decisions
- Verified with tsc, build, authenticated post-deploy bundle check, and regression check against Study Loads search
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CL — Cycle Evaluations search in cycle detail
- Added client-side search/filter for Cycle Evaluations in cycle detail view
- Search matches by evaluationType and resultSummary
- Added empty state and "Showing X of Y" indicator
- Search renders only when the cycle has evaluations
- Verified with tsc, build, authenticated post-deploy bundle check, and regression checks against Study Loads and Cycle Decisions search
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CM — Server-side canonical loadType validation
- Added server-side canonical validation for StudyLoad.loadType on:
  - POST /api/study-loads
  - PUT /api/study-loads/[id]
- Canonical allowed values:
  - practice
  - reading
  - video
  - project
  - assessment
- Non-canonical values now return HTTP 400 with a stable error message
- PUT requests that omit loadType remain unaffected
- GET, PATCH, and DELETE handlers remain unchanged
- Verified with tsc, build, local curl matrix, authenticated production curl matrix, and cleanup of test data
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CN — Server-side canonical decisionType validation
- Added server-side canonical validation for CycleDecision.decisionType on:
  - POST /api/cycle-decisions
  - PUT /api/cycle-decisions/[id]
- Canonical allowed values:
  - advance
  - reinforce
  - hold
  - redirect
- Non-canonical values now return HTTP 400 with a stable error message
- PUT requests that omit decisionType remain unaffected
- GET and DELETE handlers remain unchanged
- Verified with tsc, build, authenticated local curl matrix, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CO — Server-side canonical evaluationType validation
- Added server-side canonical validation for CycleEvaluation.evaluationType on:
  - POST /api/cycle-evaluations
  - PUT /api/cycle-evaluations/[id]
- Canonical allowed values:
  - diagnostic
  - progress_check
  - cycle_close
- Non-canonical values now return HTTP 400 with a stable error message
- PUT requests that omit evaluationType remain unaffected
- Verified with tsc, build, authenticated local curl matrix, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CP — Empty-search-result state for Learning Cycles list
- Added an empty-search-result state to the Learning Cycles list view
- When a non-empty query matches zero rows, the UI now shows:
  - Search icon
  - "No learning cycles match your search." message
- Existing "Showing X of Y" behavior remains intact
- Empty search still shows the full list unchanged
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CQ — Empty-search-result state for Students list
- Added an empty-search-result state to the Students list view
- When a non-empty query matches zero rows, the UI now shows:
  - Search icon
  - "No students match your search." message
- Existing "Showing X of Y" behavior remains intact
- Empty search still shows the full list unchanged
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CR — Empty-search-result state for Enrollments list
- Added an empty-search-result state to the Enrollments (instances) list view
- When a non-empty query matches zero rows, the UI now shows:
  - Search icon
  - "No enrollments match your search." message
- Existing "Showing X of Y" behavior remains intact
- Empty search still shows the full list unchanged
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CS — Enrollment Detail Cycle Search
- Added local search/filter to the Learning Cycles subsection in enrollment-detail-view
- Search includes:
  - local filtering of cycle cards
  - "Showing X of Y" counter
  - empty-search-result state
- The existing Skill States search remains independent and unchanged
- Verified with tsc, build, browser checks, deployment confirmation, and final live confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CT — Program Detail Axes local search
- Added local search/filter to the Axes subsection in program-detail-view
- Search matches by:
  - axis code
  - axis name
  - axis status
- Added "Showing X of Y" counter and empty-search-result state
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CU — Program Detail Skills local search
- Added local search/filter to the Skills subsection in program-detail-view
- Search matches by:
  - skill code
  - skill name
  - skill status
  - axis name
- Added "Showing X of Y" counter and empty-search-result state
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CV — Program Detail Enrollments local search
- Added local search/filter to the Enrollments subsection in program-detail-view
- Search matches by:
  - student first name
  - student last name
  - enrollment status
  - visible date text
- Added "Showing X of Y" counter and empty-search-result state
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CW — Student Detail Enrollments local search
- Added local search/filter to the Enrollments subsection in student-detail-view
- Search matches by:
  - program name
  - program code
  - enrollment status
  - visible date text
- Added "Showing X of Y" counter and empty-search-result state
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CX — Cycle Decisions dual empty-state guard
- Replaced the single zero-result state in cycle-decisions-view with two contextual empty states:
  - search-empty → Search icon + "No cycle decisions match your search."
  - dropdown-empty → GitBranch icon + "No cycle decisions for this enrollment."
- Preserved the existing global data-empty state and "Showing X of Y" behavior
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase CY — Cycle Evaluations dual empty-state guard
- Replaced the single zero-result state in cycle-evaluations-view with two contextual empty states:
  - search-empty → Search icon + "No cycle evaluations match your search."
  - dropdown-empty → ClipboardCheck icon + "No cycle evaluations for this enrollment."
- Preserved the existing global data-empty state and "Showing X of Y" behavior
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none


## Phase CZ — Study Loads dual empty-state guard
- Replaced the single zero-result state in study-loads-view with two contextual empty states:
  - search-empty → Search icon + "No study loads match your search."
  - dropdown-empty → FileBox icon + "No study loads for this enrollment."
- Preserved the existing global data-empty state and "Showing X of Y" behavior
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DA — Skill States dual empty-state guard
- Replaced the single zero-result state in skill-states-view with two contextual empty states:
  - search-empty → Search icon + "No skill states match your search."
  - dropdown-empty → BarChart3 icon + "No skill states for this enrollment."
- Preserved the existing global data-empty state and "Showing X of Y" behavior
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DB — Learning Cycles dual empty-state guard
- Added a dropdown-empty state to learning-cycles-view for the case where an enrollment filter yields zero cycles
- New dropdown-empty state:
  - RefreshCw icon
  - "No learning cycles for this enrollment."
- Preserved the existing search-empty state and "Showing X of Y" behavior
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DC — Cycle Evaluations closed-cycle create guard
- Filtered out closed learning cycles from the "New Cycle Evaluation" dialog cycle dropdown
- Users can no longer select a closed cycle and submit a create request that will always be rejected by the API
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DD — Cycle Decisions closed-cycle create guard
- Filtered out closed learning cycles from the "New Cycle Decision" dialog cycle dropdown
- Users can no longer select a closed cycle and submit a create request that will always be rejected by the API
- Verified with tsc, build, browser checks, and live deployment confirmation
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DF — Diagnostic model and API
- Added the Diagnostic model as a persistent entity linked to student-program instances
- Added the minimal CRUD API foundation for diagnostics without introducing UI surface
- Verified with prisma db push, prisma generate, tsc, build, manual API checks, and production deployment
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DH — Cycle decision skill model API
- Added the CycleDecisionSkill join model as a persistent bridge between cycle decisions and prioritized skills
- Added the minimal CRUD API foundation for cycle-decision-skills with closed-cycle guard, unique pair enforcement, and decision/skill existence validation
- Verified with prisma db push, tsc, build, manual API checks, and production deployment
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DI — Tutoring session model and API
- Added the TutoringSession model as a persistent execution container linked to learning cycles and optionally to study loads
- Added the minimal CRUD API foundation for tutoring-sessions with closed-cycle guard, optional studyLoadId linking, and cycle/study-load existence validation
- Verified with prisma db push, tsc, build, manual API checks, and production deployment
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DK — Continuity signal model and API
- Added the ContinuitySignal model as a persistent continuity/transition record anchored to student-program instances, with optional links to learning cycles and cycle evaluations
- Added the minimal CRUD API foundation for continuity-signals, supporting both enrollment-only signals and cycle/evaluation-linked signals
- Verified with prisma db push, tsc, build, manual API checks, and production deployment
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DL — Cycle-opening preconditions and enrollment pointer wiring
- Wired POST /api/learning-cycles to enforce Step 4 contract preconditions before allowing cycle opening
- Added atomic side-effects to update StudentProgramInstance.currentCycleId and lastActivityAt when a cycle opens
- Verified with tsc, build, 14 manual API checks, and production deployment
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DM — Diagnostic completion → SkillState initialization wiring
- Wired PATCH /api/diagnostics/[id] to detect the real transition from pending to completed for initial diagnostics
- Added SE-1 to automatically create missing SkillState records for all active program skills, plus SE-9 to update enrollment lastActivityAt
- Verified with tsc, build, 11 manual checks, and production deployment
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none


## Phase DN — First adaptive StudyLoad generation on cycle open
- Wired POST /api/learning-cycles to emit an opening cycle snapshot and automatically generate the first adaptive StudyLoad set when a cycle opens
- Preserved the existing cycle-opening response shape while adding a deterministic selection heuristic based on current SkillState data
- Verified with tsc, build, local manual API checks, live production verification, and deployment
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none

## Phase DO — First visible student surface: active cycle and pending StudyLoads
- Added the first visible student-facing surface at /now to answer “¿qué me toca ahora?” using already-wired adaptive cycle data
- Rendered the authenticated student's active program, open cycle, and pending StudyLoads with explicit empty states, without mutating any data
- Verified with tsc, build, manual route checks, middleware/auth checks, and production deployment
- Deployed to tutoring-platform-mv-l4o1ne.abacusai.app
- Post-deploy issues: none


