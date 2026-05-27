# MVP-SALES-NOW-PILOT-1A - Audit /now for narrowed M1-first pilot experience

## 1. Phase identity and scope

Phase:

```text
MVP-SALES-NOW-PILOT-1A - Audit /now for narrowed M1-first pilot experience
```

Scope:

```text
Audit/readiness/documentation only.
```

This phase audits whether the current `/now` student experience can honestly support the narrowed first closed pilot:

```text
NARROWED_FIRST_VERTICAL_PILOT
PAES_M1 = PILOT_USABLE_WITH_LIMITS
PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT
PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT
```

This phase does not implement `/now`, edit app code, run runtime/browser, touch DB, create users/students/enrollments/StudyLoads, activate pilot access, activate payment/trial, execute a pilot, approve student/product use, declare PAES_L1 ready, declare PAES_M2 ready, or declare Sales-Ready.

## 2. Baseline and Context Gate summary

Baseline:

```text
HEAD = origin/main = origin/HEAD = 72f9cb6
```

Latest accepted commit:

```text
72f9cb6 - MVP-SALES-PILOT-ACCESS-3: add pilot access template
```

Context Gate read:

* `PHASE_LOG.md` tail.
* `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_ROADMAP.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_EXTERNAL_AUDIT_1_INTEGRATE_3_STUDENT_AUDIT_AND_ROADMAP_REDIRECT.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_SCOPE_1_LOCK_CLOSED_3_STUDENT_PILOT_SCOPE.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_1_CLOSED_PILOT_ACCESS_PAYMENT_TRIAL_BOUNDARY.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_2_MINIMAL_CLOSED_PILOT_ACCESS_REGISTER_ADMIN_SURFACE.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_ACCESS_3_CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE_AND_ADMIN_SURFACE_READINESS.md`.
* `nextjs_space/docs/operations/templates/CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE.md`.
* `nextjs_space/docs/operations/MVP_BETA_SCOPE_2_SALES_READY_ACCEPTANCE_CRITERIA_AND_MACRO_ROADMAP.md`.
* `nextjs_space/docs/operations/MVP_BETA_TARGET_1_AUTONOMOUS_SALES_READY_TARGET_AND_HANDOFF_PROPAGATION.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_BLOCK_7_PEDAGOGICAL_LAYER_ANCHOR.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.
* Relevant `/now`, student journey, M1 pilot, StudyLoad continuity, dashboard, multi-program, and student UX references found through read-only documentation searches.

Read-only code inspection:

* `nextjs_space/app/now/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/page.tsx`.
* `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`.
* `nextjs_space/lib/study-load-content.ts`.
* `nextjs_space/lib/study-load-continuity.ts`.
* `nextjs_space/app/api/study-loads/[id]/start/route.ts`.
* `nextjs_space/app/api/study-loads/[id]/responses/route.ts`.
* `nextjs_space/app/api/study-loads/[id]/complete/route.ts`.
* Read-only listing of `nextjs_space/app/api/study-loads`.

No env files, secrets, DB URLs, tokens, cookies, headers, backups, runtime, browser, tests, build, Prisma, SQL, or DB commands were used.

## 3. Starting point from prior phases

The prior accepted posture is:

```text
External audit verdict = NO_LISTO
Pilot scope = NARROWED_FIRST_VERTICAL_PILOT
First pilot = M1-first closed controlled lab
Payment mode = no-payment closed lab first
Access source of truth = versioned template plus private non-committed register instance
PAES_L1 = INTERNAL_ONLY_NOT_IN_FIRST_PILOT
PAES_M2 = WAITLIST_OR_EXCLUDED_NOT_IN_FIRST_PILOT
Sales-Ready claim = not allowed
```

The access register template exists at:

```text
nextjs_space/docs/operations/templates/CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE.md
```

The real pilot register instance is still required before execution and must remain private and non-committed.

## 4. Current `/now` observed behavior

### Observed facts from code/docs

`/now` requires an authenticated session and redirects unauthenticated users to `/login`.

`/now` resolves a student through the provisional linkage:

```text
session User.email == Student.email
```

`/now` selects one active enrollment, not multiple enrollments:

```text
studentProgramInstance.findFirst({
  where: { studentId: student.id, status: 'active' },
  orderBy: { startedAt: 'desc' }
})
```

It chooses the most recently started active enrollment and then uses that enrollment's `currentCycleId` to load a single current cycle.

If no student or no active enrollment exists, `/now` shows a pending account/program state:

```text
Tu cuenta esta lista.
Todavia no tienes un programa activo.
Estamos preparando o revisando la activacion de tu tutoria.
```

If an active enrollment exists but there is no open current cycle, `/now` shows the selected program code/name and a message that no cycle is open yet.

For an open current cycle, `/now` loads StudyLoads in statuses:

```text
pending
in_progress
completed
```

Pending StudyLoads are shown under `Cargas pendientes`, with a `Ver actividad` link when static content exists and an `Empezar` action.

In-progress StudyLoads are shown under `En curso`, with `Ver actividad` or `Finalizar actividad` copy depending on whether multiple-choice evidence has already been submitted.

Completed StudyLoads are shown under `Actividades registradas`, remain visible, and may show the student's self-report response.

If the cycle has completed history but no pending or in-progress work, `/now` shows an all-caught-up message indicating the next step is being prepared and evidence may be reviewed.

The activity viewer verifies ownership through the student -> active enrollment -> open cycle -> StudyLoad chain and displays program code, StudyLoad title, content instructions, exercises, feedback, and completion state.

The response route captures `mc_submission` evidence for an in-progress StudyLoad and returns feedback based on registered content.

The completion route captures one closed self-report response, completes the TutoringSession and StudyLoad, and then performs best-effort rule-based continuity.

`study-load-continuity.ts` contains rule-based M1 continuity for known M1 content keys and explicitly returns no continuity for PAES_L1.

The content registry contains multiple M1 content-backed StudyLoads with internal provisional metadata and one PAES_L1 internal candidate marked with approval metadata that does not approve student/product use.

### Inferences

For a narrowed M1-first pilot, the single active enrollment assumption can be acceptable only if every controlled participant has exactly the intended active M1 enrollment/cycle for the pilot.

The current `/now` can present the immediate M1 StudyLoad work path, but it does not explicitly say the experience is an M1-only closed pilot.

The current `/now` does not itself enforce or display the access register decision. Access remains outside the current `/now` UI.

The current `/now` does not market L1/M2/triad readiness, but a full triad pilot would remain unsupported because the page does not expose a multi-program pilot dashboard or separate L1/M1/M2 readiness state.

The current no-program and all-caught-up messages can be calm enough for internal use, but they may imply waiting on activation/tutor review without a defined closed-pilot support path.

### Missing evidence

There is no runtime/browser verification in this phase.

There is no evidence in this phase that `/now` displays closed-pilot access status, payment mode, trial mode, consent state, or private register status.

There is no evidence that `/now` can show simultaneous L1/M1/M2 status for a triad pilot.

There is no evidence that `/now` copy has been designed for the specific M1-first no-payment closed lab.

There is no evidence that a real private access register instance exists for pilot execution.

### Required questions answered

Does `/now` select one active enrollment or multiple?

```text
One active enrollment.
```

How does it choose enrollment/cycle?

```text
It selects the most recently started active enrollment for the authenticated student, then loads that enrollment's currentCycleId.
```

What does it show when no active enrollment exists?

```text
It shows a pending program/account state saying the account is ready but no active program exists yet.
```

What does it show for pending StudyLoads?

```text
It shows them under Cargas pendientes with instructions, a Ver actividad link when static content exists, and an Empezar action.
```

What does it show for in-progress StudyLoads?

```text
It shows them under En curso, indicates whether responses are already saved, and links back into the activity for continuation/finalization.
```

What does it show for completed StudyLoads?

```text
It shows them under Actividades registradas, keeps them visible, and may show the student's self-report.
```

Does it show program context clearly?

```text
Partially. It shows one selected program code and name, but not an explicit M1-only closed-pilot scope label.
```

Does it show access/trial/payment state?

```text
No.
```

Does it mention L1/M2/triad?

```text
Not as a general product claim. It only shows the selected enrollment program and StudyLoad content. A PAES_L1 content-backed StudyLoad exists in the registry, but L1 is not authorized for first-pilot student/product use.
```

Does it imply public Sales-Ready or product readiness?

```text
No direct Sales-Ready claim was observed in /now code.
```

Does it depend on admin/tutor as a blocking next step?

```text
Partially in copy and operationally in setup. The page can say activation is being prepared/reviewed and the all-caught-up message says tutor review may occur. It does not make admin/tutor review a code-level prerequisite for every student action once the M1 StudyLoad path is active.
```

## 5. M1-first pilot fit assessment

Decision:

```text
NOW_NEEDS_COPY_OR_STRUCTURE_ADJUSTMENT_BEFORE_DRY_RUN
```

Evidence:

* `/now` is structurally capable of showing a single active M1 program, open cycle, pending StudyLoads, in-progress StudyLoads, completed StudyLoads, and recorded evidence.
* The activity page and StudyLoad APIs support starting work, submitting MC evidence, capturing self-report, completing a StudyLoad, and preserving completed work visibility.
* The page does not display payment/trial claims and does not directly claim Sales-Ready.
* The page does not explicitly label the experience as M1-only, closed pilot, no-payment lab, or reduced-scope.
* The page does not display access register state or a defined support/failure path.
* The page remains single-active-enrollment oriented and is not suitable as a full L1/M1/M2 triad dashboard.

Therefore, `/now` is not a full pilot blocker for the narrowed M1-first path, but it should receive a copy/structure design pass before any dry-run that relies on a human-facing pilot experience.

## 6. Multi-program risk

Full triad pilot remains blocked because `/now` currently resolves one active enrollment and one current cycle rather than showing a multi-program L1/M1/M2 pilot state.

For the narrowed M1-first pilot, single-program behavior may be acceptable if:

* participant scope is explicitly M1-only;
* L1 and M2 are not shown as active;
* no Sales-Ready or full triad implication appears;
* access/trial/payment boundaries are handled honestly outside or inside `/now`;
* no hidden manual DB dependency is presented to the student as normal operation.

## 7. Minimum `/now` behavior required for first M1-first pilot

Before the first M1-first closed-pilot dry-run with human-facing `/now`, the selected `/now` experience should satisfy:

* student sees clear M1-only closed pilot context;
* no L1/M2 active implication;
* no Sales-Ready/public offer implication;
* no payment/trial claims if not implemented;
* clear next action;
* pending, in-progress, and completed states are understandable;
* completed work remains visible;
* support/failure message exists if no active StudyLoad or no active program appears unexpectedly;
* no "waiting for tutor" implication unless actually intended;
* no hidden DB/manual dependency is visible to the student as normal operation.

## 8. Gap list

### Blocker before dry-run

* Design the narrowed M1-first `/now` copy/structure so the page explicitly communicates M1-only closed pilot scope when used for the pilot.
* Define the support/failure message for no active enrollment, no open cycle, or no active StudyLoad in the closed pilot context.
* Decide whether `/now` should display coarse access status from the private register or future admin surface before dry-run.

### Acceptable for dry-run but must fix before real students

* Single-active-enrollment behavior is acceptable for an M1-first dry-run if all participant setup is controlled and documented.
* No access/trial/payment display is acceptable only if the private register and participant communications clearly define no-payment closed lab access.
* Tutor/admin review copy can remain lightweight if the dry-run records whether it creates confusion.

### Deferred until full triad/Sales-Ready

* Multi-program L1/M1/M2 dashboard.
* L1 and M2 activation inside `/now`.
* Public trial state display.
* Payment/subscription state display.
* Runtime binding between `/now` and full commercial access/payment state.
* Complete Sales-Ready student dashboard.

## 9. Decision on next phase

Recommended next phase:

```text
MVP-SALES-NOW-PILOT-1B - Design narrowed M1-first /now pilot copy and structure
```

Reason:

`/now` appears structurally usable for a single-program M1-first path, but the current copy and structure do not yet make the narrowed closed-pilot scope explicit enough. A design phase should define exact copy/state requirements before implementation or dry-run planning.

## 10. Non-goals

This phase did not:

* edit app code;
* edit tests;
* edit Prisma schema;
* edit package files;
* run tests/build;
* run Prisma;
* run SQL;
* run DB commands;
* create fixtures;
* create users, students, enrollments, LearningCycles, StudyLoads, StudentAccess rows, responses, or access rows;
* activate trial;
* activate payment;
* create subscription state;
* run browser/runtime/dev server;
* touch staging or production;
* inspect `.env`, database URLs, raw env values, secrets, tokens, passwords, cookies, headers, or backups;
* commit real student data;
* approve student/product use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready;
* execute a pilot.

## 11. Phase gate classification

```text
Roadmap block: 10 - Internal pilot and sales-ready go/no-go, with dependency on /now pilot experience
Sales-ready relevance: direct/high
Dependency: MVP-SALES-PILOT-ACCESS-3 closed at 72f9cb6
What it advances: readiness decision for /now in narrowed M1-first pilot
What it does not advance: code, DB, runtime verification, access activation, payment/trial, pilot execution
Priority verdict: APPROVED_NOW_PILOT_AUDIT
Authorization status: executed only after Mauricio authorization
```

## 12. Result marker

```text
MVP_SALES_NOW_PILOT_1A_NOW_AUDIT_COMPLETED
```
