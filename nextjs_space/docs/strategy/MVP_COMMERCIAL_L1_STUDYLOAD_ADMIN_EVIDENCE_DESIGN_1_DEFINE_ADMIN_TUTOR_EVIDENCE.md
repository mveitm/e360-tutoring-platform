# MVP-COMMERCIAL-L1-STUDYLOAD-ADMIN-EVIDENCE-DESIGN-1 - Define L1 admin/tutor evidence design

## 1. Phase identity and scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-ADMIN-EVIDENCE-DESIGN-1 - Define L1 admin/tutor evidence design using reconciled admin/tutor baseline
```

Type:

```text
Documentation-only / admin-tutor evidence design / pre-code / pre-registry / pre-product-use.
```

Product horizon:

```text
Roadmap change-control / L1 admin-tutor evidence design / Sales-Ready support.
```

This phase defines how future L1 response/evidence should appear to admin/tutor. It does not implement UI, DB, API, runtime, registry, or administrative adjustment behavior.

## 2. Baseline and Context Gate summary

Expected and matched baseline:

```text
HEAD = origin/main = origin/HEAD = 5f00dbe
```

Latest accepted commit:

```text
5f00dbe - MVP-COMMERCIAL-L1-ADMIN-TUTOR-ROLE-BASELINE-1: reconcile admin tutor role
```

Context read:

* `PHASE_LOG.md` recent L1 chain through `5f00dbe`.
* Current handoff, compact reporting rule, Codex prompting standard, product horizons, Context Gate protocol, and Living Memory Index.
* Reconciled admin/tutor role baseline.
* L1 response/evidence design and review.
* L1 authored feedback runtime design and review.
* L1 passage rendering design and review.
* L1 type-boundary design and review.
* First controlled L1 feedback review.
* L1 implementation-readiness plan and review.
* L1 registry design, registry design review, and compatibility inspection.

Read-only code inspection was limited to the allowed admin evidence, response route, answer form, and static content registry files needed to understand current M1 evidence display assumptions.

## 3. Explicit boundary

This document is:

* documentation-only;
* admin/tutor evidence design only;
* pre-code;
* pre-registry;
* pre-DB;
* pre-API/runtime;
* pre-UI implementation;
* pre-administrative-adjustment workflow;
* pre-product-use.

This phase creates:

* no code;
* no UI component;
* no route;
* no endpoint;
* no registry entry;
* no `study-load-content.ts` edit;
* no TypeScript type in code;
* no `contentKey` or `contentVersion` implementation artifact;
* no StudyLoad row;
* no DB change;
* no API behavior;
* no runtime behavior;
* no administrative adjustment workflow;
* no access, pause, block, or mutation action;
* no test;
* no deployment.

It does not approve student use. It does not approve product use. It does not approve L1 readiness. It does not approve Sales-Ready.

L1 remains not ready. Public Sales-Ready remains blocked.

## 4. Reconciled admin/tutor baseline

This phase uses the baseline reconciled in `MVP-COMMERCIAL-L1-ADMIN-TUTOR-ROLE-BASELINE-1`.

Baseline:

* Admin/tutor evidence is supervisory, administrative, advisory, QA, and risk-monitoring context.
* Admin/tutor evidence review is not a default StudyLoad continuity gate.
* Ordinary admin/tutor review must not be required before every next StudyLoad.
* Explicit administrative adjustments may exist only as separately scoped, authorized, auditable future operations.
* Admin evidence design must not redefine admin/tutor authority.
* Viewing evidence must not imply intervention, pause, product approval, or release of the next activity.

Implication:

The future L1 admin/tutor evidence view should help an authorized reviewer understand what happened and what content assets were involved. It must not become an approval screen for routine continuity.

## 5. Review of prerequisite L1 evidence state

Prerequisite state:

* `RESPONSE-EVIDENCE-DESIGN-1A` approved the L1 response/evidence model for admin evidence design.
* The recommended L1 evidence model includes MC evidence, `contentKey`, `contentVersion`, stable item ids, `textId`, `textVersion`, and authored feedback asset ids/versions.
* Full feedback exposure/opened-state telemetry is not stored by default.
* Feedback breve/completo remains reviewed documentation-only until a future implementation/product-use path exists.
* Admin display choices remain open and are the target of this phase.

This phase does not change the evidence model. It defines a future display boundary for admin/tutor review.

## 6. Current admin evidence assumptions

Read-only inspection supports these current assumptions:

| Area | Current assumption |
| --- | --- |
| MC evidence kind | Current admin evidence parses `kind: multiple_choice_submission`. |
| Summary display | Current admin view shows answered count, total item count, correct count when answer keys exist, and submitted time. |
| Content identity | Current admin view can show `contentKey` and `contentVersion` from MC evidence. |
| Item rows | Current admin view shows item key, selected option, correct option when available, and correctness. |
| Pedagogical metadata | Current admin view can show provisional registry metadata, currently M1-oriented. |
| Read-only posture | Current evidence sections are read-only and include language that metadata is review evidence, not PAES score, theta, mastery, automatic diagnosis, or adaptive AI. |
| L1 text metadata | Current admin evidence display has no first-class L1 `textId` / `textVersion` display. |
| L1 feedback metadata | Current admin evidence display has no authored feedback breve/completo id, version, status, or availability display. |
| Admin actions | Current MC evidence display is evidence display, not an approve/release/pause workflow. |

The future L1 design should preserve the useful MC summary and rows while adding L1 identity/status fields in a bounded way.

## 7. L1 admin/tutor evidence requirements

A future L1 admin/tutor evidence view should show:

* `contentKey`;
* `contentVersion`;
* content type and program, such as `reading_l1_locating_information` and `PAES_L1`;
* StudyLoad title and status;
* `textId`;
* `textVersion`;
* stable item ids;
* selected answer;
* correct option after submission;
* correctness;
* summary answered/total/correct counts when an answer key exists;
* authored feedback asset ids or equivalent stable references;
* feedback breve/completo asset versions or status;
* feedback availability status, not necessarily full feedback copy;
* source/review/approval boundary indicators where relevant;
* internal candidate / not product-approved status where appropriate;
* no PAES score, theta, mastery, ranking, diagnosis, or guarantee claims.

The view should help admin/tutor answer:

* Which L1 content package was used?
* Which text version was used?
* Which item ids were answered?
* What did the student select?
* Was each selected answer correct?
* Which feedback assets were available for the submitted item set?
* Are the assets still internal and not product-approved?

## 8. What admin/tutor view should not show by default

The future admin/tutor evidence view should not show by default:

* full feedback copy unless later approved;
* raw answer-key notes unless a later design proves they are needed;
* hidden distractor rationale unless separately approved;
* student-facing product-readiness labels;
* official PAES/DEMRE or PAES-equivalence claims;
* mastery, PAES score, theta, ranking, diagnosis, prediction, or guaranteed-improvement claims;
* automatic pause, block, access mutation, enrollment mutation, or route mutation controls;
* an `approve next StudyLoad` gate;
* any implied intervention requirement;
* any status that implies L1 or Sales-Ready approval.

If future admin/tutor workflows need feedback copy, distractor rationales, source metadata, or administrative actions, those must be designed and authorized separately.

## 9. Admin/tutor evidence layout options

| Option | Description | Benefits | Risks | Fit for first pilot |
| --- | --- | --- | --- | --- |
| A | Extend existing MC evidence rows with L1 metadata badges | Minimal conceptual change; preserves current admin mental model; keeps summary and rows central. | Can overload compact rows if too many fields are added inline. | Good base, but needs a metadata area. |
| B | Separate L1 evidence panel with text/item/feedback metadata | Makes L1 reading evidence first-class and avoids hiding text/feedback identity. | Larger UI surface; may duplicate MC summary if not integrated carefully. | Strong fit when paired with existing MC summary. |
| C | Collapsed advanced metadata section under standard MC summary | Keeps default view readable; exposes review/approval/source details on demand. | Important metadata may be overlooked if collapsed too deeply. | Preferred for review/approval/source details. |
| D | Full admin audit panel with source/review/approval metadata and feedback copy | Maximum traceability and editorial context. | Too heavy for first pilot; risks showing unapproved feedback copy and implying product readiness. | Not preferred for first pilot. |

## 10. Recommended admin/tutor evidence model

Recommended model for first implementation planning:

```text
Preserve the existing MC summary and answer rows. Add L1 identity fields for textId/textVersion and feedback asset ids/status. Put review/approval/source details in a collapsed advanced metadata section. Do not show full feedback copy by default. Do not add actions or gates.
```

Recommended first-pilot display groups:

| Group | Default visibility | Contents |
| --- | --- | --- |
| Standard MC evidence summary | Visible | answered/total, correct count when answer key exists, submitted time, `contentKey`, `contentVersion`. |
| Item evidence rows | Visible | item id/key, selected option, correct option after submission, correctness. |
| L1 reading identity | Visible or near-visible | content type/program, `textId`, `textVersion`, L1 skill family. |
| Feedback asset status | Visible as compact metadata | feedback breve/completo ids or status, feedback version/review reference, availability status. |
| Advanced source/review/approval metadata | Collapsed by default | source class, internal candidate state, review-state summary, `studentUseApproved: no`, `productUseApproved: no`, `salesReadyImplication: none`. |
| Admin actions | Not present | No pause, approve, release, access mutation, route mutation, or adjustment controls. |

Rationale:

This model gives admin/tutor enough traceability for supervisory review without making the evidence view an intervention workflow. It is additive to the existing M1 evidence shape and avoids displaying full unapproved feedback copy.

## 11. Non-blocking continuity rule in admin evidence

Future L1 admin evidence display must explicitly preserve:

* admin evidence display is read-only and advisory by default;
* viewing evidence does not pause the next StudyLoad;
* viewing evidence does not release the next StudyLoad;
* lack of admin/tutor review does not, by itself, block routine continuity;
* future explicit administrative adjustments require separate authorized design;
* evidence may inform future QA, content, support, product, or risk decisions without blocking routine continuity.

If the future L1 continuity design chooses an explicit no-continuity rule for the first pilot, that rule must be designed separately. It must not be smuggled into admin evidence display.

## 12. Administrative adjustment boundary

This phase does not design administrative adjustments.

Future adjustments, if ever authorized, must be:

* explicit;
* auditable;
* scoped;
* permissioned;
* separately reviewed;
* separately implemented;
* separated from ordinary read-only evidence display.

Possible future adjustment categories, only if later authorized:

* access correction;
* enrollment correction;
* exceptional pause;
* route adjustment;
* content/path adjustment;
* data correction.

Admin evidence design must not smuggle these actions into a read-only evidence display. If a future admin screen includes action buttons, that is a different phase.

## 13. Relationship to student experience

This admin/tutor evidence design must not change the student-facing flow.

Student-facing implications:

* no new student UI;
* no new feedback behavior;
* no new passage behavior;
* no new continuity behavior;
* no visible admin review state;
* no waiting-for-admin state;
* no student-facing product-readiness claim;
* no PAES score, mastery, theta, ranking, diagnosis, or guarantee claim.

Student continuity remains governed by future system rules, valid access/enrollment state, and any separately designed L1 continuity/no-continuity boundary.

## 14. Relationship to future admin/evidence implementation

Candidate future display areas:

* existing MC submission evidence section for summary and answer rows;
* an L1 reading identity sub-block near content identity;
* a compact feedback asset/status sub-block;
* a collapsed advanced metadata section for source, review, approval, and internal-candidate boundary;
* existing pedagogical metadata area only if safely expanded beyond M1-specific fields in a future code phase.

M1 backward compatibility:

* existing M1 MC evidence behavior must remain unchanged;
* existing M1 content identity and correctness rows must remain readable;
* missing L1 metadata must not break M1 admin evidence;
* future display should tolerate absent L1 metadata with an internal fallback message.

Evidence schema assumptions:

* L1 admin evidence display depends on a future response/evidence payload containing text and feedback identity fields.
* If L1 metadata is missing, the admin view should show that metadata is unavailable, not infer product failure or student failure.
* Internal/not-approved statuses should be visible enough to prevent product-use drift, but not so prominent that they become student-facing labels.

## 15. Risks and caveats

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Overloading admin view | Too much metadata can obscure the evidence the reviewer needs | Keep MC summary and item rows visible; collapse advanced metadata |
| Advisory review becomes action requirement | Admin UI can imply a manual gate even without code logic | Avoid approve/release/pause controls and state text |
| Hidden gates by UX implication | Labels like `needs review before next` could block continuity socially | Use read-only/advisory language only |
| Internal metadata leakage | Source/review/approval details may be too sensitive or confusing | Show compact status; reserve details for collapsed advanced metadata |
| Feedback copy shown before product approval | Could imply student-facing approval | Show feedback ids/status by default, not full copy |
| M1 regression | Existing admin evidence is useful and must remain stable | Require M1 preservation checks before code |
| Access/adjustment workflow confusion | Evidence display could drift into administrative mutation | Keep all adjustment actions out of this design |
| L1 continuity ambiguity | Evidence view must not decide continuity behavior | Require separate continuity/no-continuity design |

## 16. No-go gates before code

Code remains blocked until separate phases complete:

* admin evidence design review;
* L1 continuity design or explicit no-continuity rule;
* test plan;
* implementation-readiness review;
* explicit admin adjustment design if actions are ever needed;
* product-use gate.

Any future code phase must also include:

* exact files authorized for edit;
* exact L1 evidence fields available to admin view;
* M1 admin evidence regression protection;
* missing-metadata fallback behavior;
* no action/gate controls rule;
* no product-readiness claim rule;
* rollback/no-go policy;
* explicit student/product approval boundary.

## 17. Open decisions after this phase

Open decisions:

* Exact admin display field names.
* Whether L1 evidence is parsed as an extension of `multiple_choice_submission` or a new evidence kind.
* Whether L1 metadata appears in the existing MC evidence component or a separate child block.
* Whether feedback asset ids or human-readable feedback status labels are shown.
* Whether feedback copy is ever shown in admin view before product-use approval.
* Which review/approval metadata belongs in collapsed advanced metadata.
* Exact fallback message when L1 metadata is missing.
* Whether L1 has continuity, explicit no-continuity, or later route behavior.
* Whether any future admin adjustment workflow is needed at all.

## 18. Recommended next phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-ADMIN-EVIDENCE-DESIGN-1A - Review L1 admin/tutor evidence design
```

Reason:

Admin evidence design touches tutor/admin workload, continuity implications, internal metadata visibility, and future implementation scope. It should be reviewed before moving to L1 continuity design or implementation-readiness.

## 19. Verification performed

Required verification for this phase:

```text
git diff --check
git status --short
git diff --stat
```

Expected changed files:

* `PHASE_LOG.md`
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_ADMIN_EVIDENCE_DESIGN_1_DEFINE_ADMIN_TUTOR_EVIDENCE.md`

## 20. Non-goals

This phase does not:

* edit app code;
* edit `nextjs_space/lib/study-load-content.ts`;
* create or modify TypeScript types in code;
* create UI components;
* create or modify routes;
* create a real L1 registry entry;
* create `contentKey` or `contentVersion` implementation artifacts;
* create StudyLoad rows;
* touch DB, Prisma, migrations, seed, SQL, APIs, browser, runtime, Vercel, deploy, tests, or app execution;
* inspect `.env`, database URLs, secrets, tokens, passwords, cookies, headers, raw environment values, or backups;
* approve student use;
* approve product use;
* declare L1 ready;
* declare Sales-Ready;
* redefine admin/tutor role baseline;
* make admin/tutor review a default StudyLoad continuity gate;
* design an administrative adjustment workflow;
* design pause, block, access mutation, or route mutation actions;
* use Abacus.

## 21. Result marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_ADMIN_EVIDENCE_DESIGN_1_ADMIN_EVIDENCE_MODEL_DEFINED
```
