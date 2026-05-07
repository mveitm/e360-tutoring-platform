# MVP-LOCAL-1 — Guided MVP Operating Slice

## Status

PASSED — direction and product-slice definition.

## Purpose

Define the first guided MVP operating slice for E360 / Bexauri after local operational independence and second-student local validation.

This phase keeps the project moving toward monetizable MVP value without losing architecture, operational discipline, pedagogical logic, custody, or the core learning-regulation model.

## Baseline

Current baseline:

- Local development works outside Abacus.
- VS Code, local app, and Neon dev are now the primary operating environment.
- GitHub main is clean and synchronized.
- Admin local login works.
- Student local login works.
- /now student flow works.
- Interactive StudyLoad viewer works.
- MC submission works.
- Self-report works.
- Admin evidence view works.
- Second local student flow was validated through Ana Local-M1.
- Repeatable local fixture recipe was documented in BETA-LOCAL-OPS-1.

## Strategic framing

E360 / Bexauri is not just an exercise app.

Core chain:

diagnostic / initial state
-> learning cycle
-> concrete study load
-> student execution
-> evidence capture
-> human/admin review
-> pedagogical decision
-> continuity

Every MVP phase should strengthen this chain.

If a phase does not strengthen this chain, it should be treated as secondary unless it solves a clear operational blocker.

## MVP definition

The initial MVP should be a guided, human-supervised PAES preparation service supported by the platform.

It should not claim to be fully adaptive, autonomous, AI-driven, or PAES-score predictive.

The MVP should prove that E360 / Bexauri can deliver a weekly learning-regulation loop with enough clarity and trust that a student and/or apoderado could reasonably pay for it.

## Recommended initial MVP slice

Product slice:

- Guided PAES M1 MVP.

Initial subject/program:

- PAES_M1.

Why PAES_M1 first:

- The content registry already has multiple PAES_M1 interactive activities.
- The student flow has been validated with PAES_M1.
- Admin evidence review is working with PAES_M1.
- Local multi-student validation was completed with PAES_M1.
- The current operational recipe is proven for PAES_M1.

PAES_L1 and PAES_M2 remain important, but should not be opened as MVP execution paths until they have at least one registry-matched activity and a minimal progression plan.

## Target user

Initial MVP user:

- Chilean high-school student preparing PAES.
- Needs weekly structure, practice, and continuity.
- Can work autonomously inside the app after light onboarding.
- Does not require daily parental supervision.
- May be supported by an apoderado financially or motivationally.

Initial buyer/sponsor may be:

- student directly, or
- apoderado.

The first MVP experience should be designed around student autonomy.

## MVP duration

Recommended initial pilot duration:

- 2 to 4 weeks.

Minimum viable operating shape:

- 1 student.
- 1 program.
- 1 cycle per week.
- 1 interactive StudyLoad per cycle.
- 1 self-report per StudyLoad.
- 1 human/admin review per cycle.
- 1 evidence-backed CycleDecision per cycle.
- manual continuity.

## Student flow

The student-facing MVP flow should be:

login
-> /now
-> see current program/cycle
-> see pending StudyLoad
-> open activity
-> start load
-> complete MC activity
-> submit answers
-> return to /now
-> finish load
-> submit self-report
-> see completed state

The student should always understand:

- what to do now,
- what activity belongs to the current cycle,
- when the work is submitted,
- when the load is finished,
- that the next step will be reviewed/prepared.

## Admin/operator flow

The admin MVP flow should be:

create/prepare student
-> create enrollment
-> satisfy initial diagnostic prerequisite
-> create cycle
-> curate registry-matched StudyLoad
-> monitor /now progress through admin surfaces
-> review MC evidence and self-report
-> create evidence-backed CycleDecision
-> close cycle
-> authorize continuity
-> create next cycle
-> curate next StudyLoad

All pedagogical decisions remain manual in the MVP.

## Current MVP-ready capabilities

The platform currently supports:

- Student records.
- Matching User accounts by email.
- Program enrollments.
- Initial diagnostic prerequisite.
- LearningCycle creation.
- StudyLoad creation/editing.
- Student /now dashboard.
- StudyLoad start.
- Registry-matched interactive activities.
- MC answer submission.
- Self-report on completion.
- Admin evidence review.
- CycleDecision creation.
- Cycle close.
- Continuity authorization.
- Repeatable local fixture creation.

## Current non-MVP-ready capabilities

The platform should not yet promise:

- automatic adaptation,
- automated recommendations,
- PAES score prediction,
- autonomous AI tutoring,
- public signup/onboarding,
- apoderado dashboard,
- multi-subject full coverage,
- unattended student support,
- large-cohort operation,
- automated content sequencing.

## Content requirement for MVP

For a 2 to 4 week guided PAES_M1 MVP, the minimum content need is:

- 4 registry-matched PAES_M1 activities.

Current registry already has 4 PAES_M1 activities:

- PAES M1 — Ecuaciones lineales básicas
- PAES M1 — Problemas con ecuaciones lineales
- PAES M1 — Refuerzo de ecuaciones lineales
- PAES M1 — Funciones lineales básicas

This is enough for a constrained PAES_M1 pilot, but not enough for a broader PAES program.

Next content expansions should be planned by progression, not just by adding isolated activities.

## Pedagogical integrity rules

The MVP must preserve these rules:

1. Evidence before decision.
2. Decision before continuity.
3. Continuity before next cycle.
4. Registry-matched content before assigning interactive loads.
5. Human review before claiming progress.
6. No PAES score claim from internal MC correctness.
7. No automatic adaptive claims until the mechanism is explicitly implemented and governed.

## Manual operations allowed in MVP

The following manual operations are acceptable for MVP:

- creating student fixtures/accounts,
- creating enrollment,
- creating diagnostic prerequisite,
- creating cycles,
- curating StudyLoad titles,
- reviewing evidence,
- writing CycleDecision rationale,
- closing cycles,
- authorizing continuity,
- preparing next cycle/load.

Manual operation is acceptable because the MVP is guided and controlled.

The platform should not pretend these steps are automated yet.

## Explicit non-goals

This MVP slice does not attempt to solve:

- full PAES curriculum coverage,
- public onboarding,
- payment/subscription automation,
- adaptive sequencing,
- AI-generated tutoring,
- automatic skill mastery inference,
- parent-facing dashboards,
- large-scale operations,
- multi-school deployment,
- production-grade analytics.

## Monetization readiness

The MVP may be considered monetization-adjacent when the following are true:

- a student can complete at least 2 consecutive cycles,
- every cycle has registry-matched activity,
- every completed activity produces visible admin evidence,
- every cycle receives a human CycleDecision,
- continuity is manually controlled,
- support/onboarding can be explained clearly,
- product claims are honest and limited.

A small paid pilot could be framed as:

guided weekly PAES M1 practice + human review + continuity planning

It should not be framed as:

AI tutor, adaptive PAES platform, automatic score predictor, or complete PAES preparation system.

## Recommended next phases

MVP-LOCAL-2 — MVP gap audit

Compare current product against this MVP slice and classify what is ready, what needs documentation, what needs UX hardening, what needs content, what needs operation protocol, and what is not needed for MVP.

MVP-CONTENT-1 — Four-week PAES_M1 content map

Turn the current four PAES_M1 registry activities into a coherent 4-week sequence.

MVP-OPS-1 — Guided paid-pilot operations protocol

Define onboarding, weekly cadence, support, review rhythm, communication, and limits.

MVP-UX-1 — Student MVP clarity pass

Make minimal UX improvements only where the student might not understand the next action.

CONTENT-LOCAL-L1-1 — First PAES_L1 registry activity

Only if the next strategic target is multi-subject validation.

## Directional recommendation

Do not continue adding local validation cycles indefinitely.

The next meaningful step is to convert the validated technical loop into a clear guided MVP package.

Recommended immediate next phase:

- MVP-LOCAL-2 — Guided MVP gap audit.

## Guardrails

This phase made no changes to:

- app code,
- schema,
- database,
- production,
- deployment,
- authentication,
- content registry,
- endpoints,
- UI,
- student data,
- cycles,
- StudyLoads,
- decisions,
- evaluations,
- continuity.

No secrets, passwords, tokens, env files, DATABASE_URL, or connection strings were accessed or printed.

## Outcome

E360 / Bexauri now has a defined MVP operating slice:

Guided PAES M1 weekly learning-regulation loop.

This preserves the platform architecture and learning logic while giving the project a clear path toward a first monetizable MVP.
