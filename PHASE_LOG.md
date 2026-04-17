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