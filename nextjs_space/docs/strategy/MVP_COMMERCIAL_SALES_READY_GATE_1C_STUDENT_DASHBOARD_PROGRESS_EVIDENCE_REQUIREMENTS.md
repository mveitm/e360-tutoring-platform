# MVP-COMMERCIAL-SALES-READY-GATE-1C - Student Dashboard Progress Evidence Requirements

## 1. Phase

* Phase: `MVP-COMMERCIAL-SALES-READY-GATE-1C`.
* Type: commercial strategy / documentation-only / Sales-Ready dashboard evidence gate decomposition.
* Baseline: `70cc191`.
* Product horizon: roadmap change-control / Sales-Ready gate decomposition.
* This is not `MVP-Beta-Sales-Ready` approval.
* No implementation authorized.
* No dashboard/homepage UI implementation authorized.
* No `/now` change authorized.
* No student UI change authorized.
* No public launch authorized.
* No public sale authorized.
* No payment authorized.
* No trial activation authorized.
* No runtime enforcement authorized.
* No Sales-Ready decision made.

## 2. Relationship to Sales-Ready Gate 1, Gate 1A and Gate 1B

`MVP-COMMERCIAL-SALES-READY-GATE-1` versioned a non-binding external proposal for a future public M1/M2/L1 Sales-Ready gate.

`MVP-COMMERCIAL-SALES-READY-GATE-1A` decomposed the candidate indefinite operation criterion.

`MVP-COMMERCIAL-SALES-READY-GATE-1B` decomposed the candidate two-state feedback readiness boundary.

This document decomposes the candidate dashboard/homepage progress evidence requirement referenced by Gate 1:

* student-visible enrolled tutorias;
* current state per tutoria;
* next step per tutoria;
* completed and in-progress work;
* safe performance evidence;
* feedback availability;
* continuity signals.

It does not approve public Sales-Ready.

It does not prove that dashboard progress evidence is implemented across M1, M2, or L1.

Public Sales-Ready remains blocked.

M1-only remains not Sales-Ready.

## 3. Nature of document

This is a candidate criteria document.

It uses "would require", "should require", "candidate criterion", "future public Sales-Ready gate", and "evidence needed" intentionally.

It is not:

* a current Sales-Ready decision;
* implementation authority;
* UI authority;
* `/now` authority;
* public sale authority;
* proof that M1, M2, or L1 already satisfy the dashboard progress evidence criterion;
* proof of actual student learning value.

Future implementation, validation, dashboard/homepage UI changes, `/now` changes, public launch, payment, trial activation, runtime enforcement, billing/subscription/payment, student UI, admin mutation, DB work, staging, production, deploy, or final Sales-Ready approval would require separate explicit phases.

## 4. Purpose

The purpose is to define what student dashboard/homepage progress evidence should mean for a future public Sales-Ready gate without overclaiming current product readiness.

This phase defines:

* shared dashboard criteria across M1, M2, and L1;
* M1-specific progress evidence considerations;
* M2-specific progress evidence considerations;
* L1-specific progress evidence considerations;
* useful progress evidence boundaries;
* misleading or superficial progress evidence boundaries;
* evidence types allowed in a future dashboard;
* evidence types not allowed yet;
* evidence needed before a future public Sales-Ready decision.

## 5. Definition of student dashboard progress evidence

Candidate definition:

Student dashboard/homepage progress evidence should be student-visible orientation about where the student is in each enrolled tutoria.

It should give enough information for the student to understand:

* which tutorias are enrolled;
* whether each tutoria is active, paused, inactive, or blocked by a clear future rule;
* what work has been completed;
* what work is currently in progress;
* what the current or next StudyLoad is;
* whether feedback is available;
* whether there is a clear next step;
* whether there is a support or exception message when relevant.

Progress evidence should be calm, non-punitive, and oriented toward continuity.

It should not be a ranking, score prediction, or outcome promise.

## 6. What progress evidence does not mean

Dashboard progress evidence does not mean:

* PAES score prediction;
* theta;
* mastery unless separately implemented and validated;
* percentile or ranking;
* guaranteed improvement;
* complete PAES preparation;
* all evidence is pedagogically validated;
* a dashboard/homepage UI is implemented;
* an AI-generated global diagnosis is implemented;
* public copy is approved;
* M1, M2, or L1 are public Sales-Ready;
* payment/subscription readiness exists;
* student learning value has been validated.

The safe interpretation is narrower: the future public Sales-Ready gate would require enough student-visible progress evidence for the student to know current state and next step without being misled.

## 7. Shared cross-tutoria dashboard criteria

Across M1, M2, and L1, a future public Sales-Ready gate would likely require dashboard/homepage evidence that:

* shows enrolled tutorias;
* distinguishes active, inactive, paused, completed, and exception states only when those states are actually supported;
* shows current or next StudyLoad where available;
* shows completed loads count;
* shows in-progress loads;
* shows pending or next load;
* shows latest activity date when safe and useful;
* shows response completion status;
* shows basic correct/total summary only when safe and supported by actual activity evidence;
* shows whether brief and complete feedback are available;
* shows continuity status without creating pressure or shame;
* shows simple focus areas only when supported by evidence;
* avoids unsupported scoring, ranking, theta, mastery, or PAES prediction;
* avoids exposing internal admin state;
* lets the student understand the next action or the honest stop state.

The dashboard should orient, not judge.

## 8. M1 progress evidence considerations

M1 may have partial admin/student evidence precedent, but that cannot be treated as public Sales-Ready.

Candidate M1 dashboard progress evidence would require:

* M1 enrollment visible as M1, not as a generic activity bucket;
* current or next M1 StudyLoad;
* completed M1 loads;
* M1 in-progress load if applicable;
* basic activity evidence such as response completion and safe correct/total summary where supported;
* feedback availability per completed M1 load or question group where supported;
* simple areas to review only when tied to real M1 activity evidence;
* continuity signal showing whether another M1 step exists or why the route is paused;
* no implication that M1 alone is public Sales-Ready.

M1 candidate NO-GO if:

* progress is only a generic completed-count with no next-step orientation;
* evidence exists only in a demo fragment;
* performance display creates unsupported score, mastery, or ranking claims;
* M1 dashboard evidence is used to imply public M1/M2/L1 readiness.

## 9. M2 progress evidence considerations

M2 dashboard evidence would require a real M2 route/content identity.

Candidate M2 dashboard progress evidence would require:

* M2 enrollment visible as M2;
* current or next M2 StudyLoad;
* completed M2 loads;
* M2 in-progress and pending work where applicable;
* M2-specific activity evidence, not M1 evidence renamed;
* M2-specific feedback availability;
* M2-specific focus or difficulty areas only when supported by M2 activity evidence;
* continuity signal under the promised M2 scope.

M2 candidate NO-GO if:

* M2 is only a label;
* M2 progress reuses M1 data under another name;
* no M2 route/content identity exists;
* no M2 next-step or stop-state evidence exists;
* dashboard evidence makes M2 appear ready without actual route/content support.

## 10. L1 progress evidence considerations

L1 dashboard evidence must correspond to reading competence, not generic quiz progress.

Candidate L1 dashboard progress evidence would require:

* L1 enrollment visible as Competencia Lectora L1;
* current or next L1 StudyLoad;
* completed L1 reading work;
* text/question activity evidence where supported;
* feedback availability tied to reading-specific work;
* simple focus areas only when supported by reading evidence, such as inference, purpose, contextual vocabulary, structure, text evidence, or similar reading skills;
* continuity signal under the promised L1 scope;
* no generic quiz progress presented as reading competence readiness.

L1 candidate NO-GO if:

* L1 evidence is generic multiple-choice completion only;
* text/question evidence is absent;
* reading skills are not represented where claimed;
* dashboard progress implies reading competence without reading-specific evidence;
* L1 is nominal or lacks appropriate texts.

## 11. Useful progress evidence definition

Useful progress evidence should help the student answer:

* What tutorias am I enrolled in?
* What have I already done?
* What am I working on now?
* What should I do next?
* Is feedback available for what I completed?
* Is there a clear reason if I cannot continue right now?
* What should I review, if the evidence supports a review signal?

It should be:

* specific;
* accurate within the implemented scope;
* calm;
* student-safe;
* tied to actual activity evidence;
* aligned to the tutoria;
* useful for continuity;
* honest about uncertainty and limits.

## 12. Misleading/superficial progress evidence definition

Progress evidence is misleading or superficial if it:

* only shows a decorative percentage with no clear meaning;
* converts limited activity into a PAES score implication;
* uses theta, mastery, percentile, ranking, or prediction without implementation and validation;
* shows unsupported skill maps;
* claims complete PAES progress from partial scope;
* treats M2 or L1 as ready because a card exists;
* hides a missing next step;
* hides an ordinary functional wall;
* turns admin/internal states into student-facing claims;
* creates shame, pressure, or false certainty;
* requires ordinary human explanation for the student to know what to do next.

Misleading progress evidence would keep public Sales-Ready blocked.

## 13. Evidence types allowed in future dashboard

Candidate evidence types that may be allowed in a future dashboard if separately implemented and validated:

* enrolled tutorias;
* active/inactive/paused/exception status per tutoria;
* current or next StudyLoad;
* completed loads count;
* in-progress loads;
* pending or next load;
* latest activity date;
* response completion status;
* basic correct/total summary when safe;
* feedback available indicator;
* self-report history;
* simple areas to review based on actual activity evidence;
* continuity status;
* support or exception message when relevant.

Each evidence type must be tied to actual product behavior before it can be used in a public Sales-Ready flow.

## 14. Evidence types not allowed yet

The following should not be shown as public Sales-Ready progress evidence unless separately implemented, validated, and approved:

* PAES score prediction;
* theta;
* mastery;
* percentile or ranking;
* guaranteed improvement;
* AI-generated global diagnosis;
* unsupported skill maps;
* unsupported long-term projection;
* public promise of complete PAES coverage;
* public promise that progress evidence proves final readiness;
* any metric that implies expert validation without evidence.

These exclusions protect the student experience, brand, and commercial promise.

## 15. Student experience boundary

The future student experience target is:

```text
I can see what I am enrolled in, what I have done, what feedback is available, and what my next step is, without feeling ranked or promised a score.
```

This is an internal experience target, not public copy.

This phase does not change what the student sees or can do.

It does not implement dashboard progress evidence.

It does not change `/now`, student UI, activity UI, feedback UI, content, access, or runtime behavior.

## 16. Admin/tutor boundary

Dashboard progress evidence is student-visible orientation.

Admin/tutor evidence may later require different views, including:

* student list by tutoria;
* progress by tutoria;
* loads completed, in progress, and pending;
* performance evidence;
* feedback availability;
* support or continuity exceptions.

This phase does not define or implement admin/tutor UI.

Admin/tutor operation should not depend on DB inspection, scripts, logs, or individual contact as the normal way to know whether a student advanced.

## 17. Data/privacy boundary

Future dashboard progress evidence should:

* avoid unnecessary personal data;
* avoid exposing internal IDs unless needed for internal admin contexts;
* avoid exposing private self-report details more broadly than needed;
* avoid exposing payment details;
* avoid exposing guardian/minor-sensitive details;
* avoid screenshots or displays with secrets;
* keep student-facing evidence educational and operational;
* avoid turning internal evidence into public marketing proof.

This phase performs no DB read and accesses no live participant data.

## 18. Evidence required before public Sales-Ready

Future evidence would need to show:

* dashboard/homepage can show enrolled M1, M2, and L1 when those tutorias are actually operational;
* each enrolled tutoria has current or next work visible;
* completed and in-progress work is visible per tutoria;
* feedback availability is visible where feedback exists;
* simple performance evidence is accurate and safe;
* continuity state is clear and does not hide functional walls;
* M2 evidence corresponds to real M2 route/content identity;
* L1 evidence corresponds to reading-specific work;
* students can understand current state and next step without ordinary human explanation;
* public copy does not convert progress evidence into score, theta, mastery, ranking, or guaranteed improvement claims;
* actual app/student validation exists before any public Sales-Ready approval.

This phase provides no live validation.

## 19. PASS criteria

Documentation PASS for this phase requires:

* candidate dashboard progress evidence definition documented;
* what progress evidence does and does not mean documented;
* shared M1/M2/L1 dashboard criteria documented;
* M1/M2/L1 progress considerations documented;
* useful vs misleading progress evidence boundaries documented;
* allowed and not-yet-allowed evidence types documented;
* evidence needs documented;
* public Sales-Ready kept blocked;
* no implementation or operational change performed.

Future public Sales-Ready PASS would require separate evidence that M1, M2, and L1 satisfy the approved dashboard progress criterion in real flows.

## 20. FAIL criteria

This phase would fail if it:

* treats the candidate dashboard evidence boundary as final Sales-Ready approval;
* implies dashboard/homepage UI is implemented;
* implies public launch or public sale;
* implies M1-only is Sales-Ready;
* defines PAES score prediction;
* defines theta;
* defines mastery without separate implementation and validation;
* defines ranking or percentile;
* promises guaranteed improvement;
* claims complete PAES preparation;
* authorizes UI changes, `/now` changes, payment, trial activation, runtime enforcement, billing/subscription/payment, student UI, admin mutation, DB, deploy, or code changes.

## 21. BLOCKED criteria

Future public Sales-Ready remains blocked if:

* dashboard/homepage progress evidence is missing;
* M1/M2/L1 enrolled tutorias are not visible where promised;
* current or next work is not visible;
* progress is generic and not per tutoria;
* M2 progress is nominal or copied from M1;
* L1 progress is generic quiz progress and not reading-specific;
* feedback availability is not visible where feedback is part of the promise;
* progress evidence hides an ordinary functional wall;
* progress evidence requires ordinary human explanation to be useful;
* dashboard evidence has not been validated with actual app/student flows;
* public copy overpromises score, mastery, AI diagnosis, or complete PAES preparation.

## 22. Risks and mitigations

| Risk | Why it matters | Mitigation | Candidate future phase |
| --- | --- | --- | --- |
| Progress evidence becomes score prediction | Creates unsupported public expectation. | Forbid PAES score prediction unless separately implemented, validated, and approved. | `MVP-COMMERCIAL-SALES-READY-GATE-1F` |
| Dashboard percentage is decorative | Student may see progress without understanding next step. | Require current state, completed work, feedback availability, and next action. | Future dashboard readiness phase |
| M1 partial precedent is mistaken for Sales-Ready | M1-only cannot satisfy public M1/M2/L1 gate. | Keep M1-only blocked for public Sales-Ready. | `MVP-COMMERCIAL-SALES-READY-GATE-1D` |
| M2 evidence is nominal | Public promise would exceed product reality. | Require real M2 route/content identity and M2-specific progress evidence. | Future M2 route/dashboard readiness phase |
| L1 evidence is generic quiz progress | Reading competence would not be represented honestly. | Require reading-specific text/question/skill evidence. | Future L1 route/dashboard readiness phase |
| Progress hides continuity gaps | Student may feel stranded despite a polished dashboard. | Require continuity status and honest stop or exception states. | `MVP-COMMERCIAL-SALES-READY-GATE-1E` |
| Progress evidence overpromises improvement | Brand and ethical risk. | Treat improvement signals as internal evidence, not public promise. | `MVP-COMMERCIAL-SALES-READY-GATE-1F` |
| Sensitive data leaks into dashboard | Privacy and trust risk. | Minimize personal data and avoid payment/minor-sensitive details. | Future data/privacy readiness phase |

## 23. Questions reserved for Pro / high-level direction

Reserved questions:

* Exact dashboard progress report requirements.
* Whether any percentage should be shown at all.
* Minimum evidence for safe correct/total summaries.
* Whether and how to show focus areas.
* Whether any mastery-like concept is ever allowed.
* Minimum M1/M2/L1 dashboard evidence before public sale.
* Minimum evidence package and number of students before public sale.
* Acceptable technical error margin for progress evidence.
* Public language around progress, continuity, and reports.
* Data/privacy rules for student self-report and minor-related context.
* Criteria to pause or roll back public sale if progress evidence misleads students.

## 24. Future phase options

Option A:

```text
MVP-COMMERCIAL-SALES-READY-GATE-1D - Define three-student evidence package before public sale
```

Option B:

```text
MVP-COMMERCIAL-SALES-READY-GATE-1E - Define no-human-intervention trajectory test
```

Option C:

```text
MVP-COMMERCIAL-DASHBOARD-READINESS-1 - Define dashboard implementation readiness for M1/M2/L1
```

Option D:

```text
MVP-COMMERCIAL-M2-L1-ROUTE-READINESS-1 - Define M2/L1 route-content and evidence identity boundary
```

Option E:

```text
MVP-COMMERCIAL-SALES-READY-GATE-1F - Define public promise and copy boundary
```

Recommendation: prefer `MVP-COMMERCIAL-SALES-READY-GATE-1D` if continuing the Sales-Ready evidence chain, or `MVP-COMMERCIAL-DASHBOARD-READINESS-1` if dashboard implementation/readiness is the next bottleneck.

No next phase is opened automatically.

## 25. Context Gate summary

| Field | Summary |
| --- | --- |
| Phase | `MVP-COMMERCIAL-SALES-READY-GATE-1C - Define student dashboard progress evidence requirements` |
| Proposed action | Create documentation-only candidate criteria for student dashboard/homepage progress evidence across M1, M2, and L1. |
| Phase type | Commercial strategy / documentation-only / Sales-Ready dashboard evidence gate decomposition. |
| Product horizon | Roadmap change-control / Sales-Ready gate decomposition; not Sales-Ready approval. |
| Roadmap block | Public Sales-Ready candidate gate decomposition; public Sales-Ready remains blocked. |
| Git preflight | `HEAD`, `origin/main`, and `origin/HEAD` matched `70cc191`; working tree was clean. |
| Canonical docs read | Product horizons, Context Gate protocol, Living Memory Index, handoff protocol, current handoff, product/UI synthesis, operating mode, compact reporting rule. |
| Phase docs read | Gate 1 proposal, Gate 1A, Gate 1B, Commercial Trial 1A/1B/1C, COPY-1, SANDBOX-1/2/3, COPY-2, and Commercial Trial 1D. |
| Product/UI docs read | Product/UI/brand synthesis read. |
| Relevant strategic decisions | M1-only is not public Sales-Ready; public Sales-Ready would require M1/M2/L1; dashboard progress must not imply PAES score prediction, theta, mastery, ranking, guaranteed improvement, complete PAES, or implemented UI; closed payment remains `NO-GO`; Gate 1, Gate 1A, and Gate 1B are proposal/decomposition only. |
| Student experience impact | None. No dashboard/homepage UI, `/now`, activity flow, feedback UI, runtime, access, or activation change. |
| Commercial impact | No operational commercial impact. Candidate criterion only. No public sale, launch, payment, copy approval, or Sales-Ready decision. |
| Commercial non-goals | No public offer, public launch, public sale, payment, price, subscription, trial activation, billing/subscription/payment, Sales-Ready approval, or market validation. |
| Brand risk | High if mistaken for implemented dashboard evidence or readiness approval; controlled by labeling as candidate criteria and keeping public Sales-Ready blocked. |
| Operational/tutor-admin impact | Defines future student-visible progress evidence and admin/tutor boundary implications only; no workload change. |
| Technical scope | Markdown doc plus `PHASE_LOG.md` only. |
| Explicit non-goals | No code, DB read/mutation, API call, browser/app operation, schema, migration, deploy, `/now`, UI, endpoint, auth, StudentAccess mutation, trial, runtime, billing, payment, public offer, public launch, or Sales-Ready approval. |
| Missing context check | No blocking context missing for this narrow documentation phase. Future final Sales-Ready approval requires deeper product, dashboard/UI, content, technical, payment, legal, and evidence review. |
| Roadmap change-control check | This phase is roadmap change-control decomposition only. It does not complete Sales-Ready change control or approve public sale. |
| Why this phase is aligned | It prevents dashboard progress evidence from becoming an unsupported score, mastery, or readiness promise and defines evidence needs before future public Sales-Ready decisions. |
| What this phase must not include | Implementation, dashboard/homepage UI changes, `/now` changes, public launch, public sale, payment, trial activation, runtime enforcement, billing/subscription/payment, student UI, admin mutation, DB, deploy, legal decision, or final Sales-Ready approval. |
| GO / NO-GO | GO. |
| Reason | GO only because this is documentation-only and decomposes one candidate Sales-Ready gate criterion. |

## 26. Explicit non-goals

* No code.
* No DB read.
* No DB mutation.
* No migrations.
* No deploy.
* No app operation.
* No browser smoke.
* No API call.
* No dashboard/homepage UI implementation.
* No `/now` change.
* No student UI change.
* No admin UI change.
* No product behavior change.
* No runtime enforcement.
* No trial activation.
* No billing, subscription, or payment.
* No admin mutation.
* No StudentAccess mutation.
* No repair/autocreate.
* No invitation sent.
* No participant contacted.
* No sandbox activated.
* No payment authorization.
* No public offer.
* No public launch.
* No public sale.
* No public beta created.
* No Sales-Ready approved.
* No Sales-Ready claim.
* No PAES score prediction.
* No theta.
* No mastery.
* No ranking.
* No legal decision.
* No minor/payment decision.
* No market demand validation.
* No public pricing validation.
* No public Sales-Ready validation.
* No M1/M2/L1 dashboard validation.
* No actual student learning value validation.

## 27. Result marker

```text
MVP_COMMERCIAL_SALES_READY_GATE_1C_STUDENT_DASHBOARD_PROGRESS_EVIDENCE_REQUIREMENTS_DEFINED
```
