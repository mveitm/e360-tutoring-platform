# MVP-COMMERCIAL-L1-STUDYLOAD-CONTINUITY-DESIGN-1 - Define L1 Continuity / No-Continuity Design

## 1. Phase identity and scope

Phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-CONTINUITY-DESIGN-1 - Define L1 continuity/no-continuity design
```

Type:

```text
Documentation-only / L1 continuity design / pre-code / pre-registry / pre-product-use.
```

Product horizon:

```text
Roadmap change-control / L1 continuity design / Sales-Ready support.
```

This phase defines how continuity should behave after the first L1 reading StudyLoad pilot set is completed in a future implementation. It does not implement continuity, create registry entries, create StudyLoads, or approve L1 for student/product use.

## 2. Baseline and Context Gate summary

Expected and matched baseline:

```text
HEAD = origin/main = origin/HEAD = e2eb4b4
```

Latest accepted commit:

```text
e2eb4b4 - MVP-COMMERCIAL-L1-STUDYLOAD-ADMIN-EVIDENCE-DESIGN-1A: review admin tutor evidence
```

Context read:

* `PHASE_LOG.md` recent L1 chain through `e2eb4b4`.
* Current handoff, compact reporting rule, Codex prompting standard, product horizons, Context Gate protocol, and Living Memory Index.
* L1 admin/tutor evidence design and review.
* Reconciled admin/tutor role baseline.
* L1 response/evidence design and review.
* L1 feedback runtime design and review.
* L1 passage rendering design and review.
* L1 type-boundary design and review.
* First controlled L1 feedback review.
* L1 implementation-readiness plan and review.
* L1 registry design, registry design review, and compatibility inspection.
* Existing continuity design and validation documents for M1 non-blocking continuity.

Focused documentation search was performed for continuity, StudyLoad continuity, automatic next StudyLoad, non-blocking, no-continuity, next StudyLoad, rule-based continuity, learning continuity, admin/manual gates, student waiting, L1 continuity, and M1 continuity.

Read-only code inspection was limited to current continuity mechanics and nearby completion/registry/student `/now` surfaces.

## 3. Explicit boundary

This document is:

* documentation-only;
* continuity/no-continuity design only;
* pre-code;
* pre-registry;
* pre-DB;
* pre-API/runtime;
* pre-UI implementation;
* pre-administrative-adjustment workflow;
* pre-access, pause, block, or route mutation;
* pre-product-use.

This phase creates:

* no code;
* no registry entry;
* no `study-load-content.ts` edit;
* no TypeScript type in code;
* no `contentKey` or `contentVersion` implementation artifact;
* no StudyLoad row;
* no DB row or mutation;
* no API behavior;
* no runtime behavior;
* no UI implementation;
* no administrative adjustment workflow;
* no access, pause, block, route, or enrollment mutation action;
* no test;
* no deployment.

It does not approve student use. It does not approve product use. It does not approve L1 readiness. It does not approve Sales-Ready.

L1 remains not ready. Public Sales-Ready remains blocked.

## 4. Review of prerequisite state

Prerequisite state:

* TYPE-DESIGN-1 and TYPE-DESIGN-1A defined and reviewed a first-class L1 reading content/type boundary.
* PASSAGE-RENDERING-DESIGN-1 and 1A defined and reviewed passage-above-questions rendering for a future L1 implementation.
* FEEDBACK-RUNTIME-DESIGN-1 and 1A defined and reviewed authored feedback breve/completo runtime behavior.
* RESPONSE-EVIDENCE-DESIGN-1 and 1A defined and reviewed an L1 evidence model with content, text, item, and feedback identity.
* ADMIN-EVIDENCE-DESIGN-1 and 1A defined and reviewed read-only/admin advisory evidence display.
* ADMIN-TUTOR-ROLE-BASELINE-1 reconciled that admin/tutor evidence review is not a default continuity gate.
* The first L1 pilot set remains documentation-only.
* No L1 registry entry exists.
* No L1 runtime implementation exists.
* No student/product approval exists.

This phase answers only the continuity/no-continuity question for future planning.

## 5. Current continuity assumptions

Documentation and read-only inspection support these assumptions:

| Area | Current assumption |
| --- | --- |
| Product principle | Student and supervisor work in parallel. Review is not a normal bottleneck. |
| Current implemented continuity | Current automatic next StudyLoad continuity is rule-based and M1-scoped. |
| Current progression source | `nextjs_space/lib/study-load-continuity.ts` uses an explicit `NEXT_STUDYLOAD_BY_PROGRAM_AND_CONTENT_KEY` map. |
| Current keying | The map is scoped by program and current `contentKey`; the completed load is still first resolved by title to registered content. |
| Current M1 sequence | `PAES_M1` maps the current AS1/PE1 content chain through registered M1 content keys. |
| Trigger point | The completion endpoint calls `prepareNextStudyLoadAfterCompletion(...)` after successful completion. |
| Failure isolation | Continuity preparation happens after completion and continuity failure is caught/logged; it does not roll back completion. |
| Duplicate protection | Existing continuity checks for an existing next StudyLoad with the same learning cycle, title, and status in pending/in_progress/completed. |
| End of sequence | If no next contentKey exists for the program/current contentKey, the service returns `end_of_sequence` and does not invent content. |
| Missing content | If a map target cannot resolve to registered content, the service returns `missing_content` and does not create a broken load. |
| `/now` fallback | When no active loads exist but completed history exists, `/now` shows a calm registered-activity / preparing-next-step state. |
| L1 mapping | No `PAES_L1` continuity mapping is currently present. |
| L1 registry | No L1 content is registered in the static registry. |

M1 behavior must remain unchanged in any future L1 phase.

## 6. L1 continuity problem

Design question:

```text
After completing the first L1 locating-information pilot set, what should happen next?
```

Possible answers include:

* create another L1 StudyLoad automatically;
* stop with no next L1 activity;
* show a safe fallback state while other tutoring routes continue;
* require admin/tutor review before another L1 StudyLoad;
* create a generic repeat/remediation activity;
* block until a full L1 route exists.

The design must avoid three unsafe outcomes:

* admin/tutor review becoming a hidden release gate;
* the system fabricating continuity when no reviewed L1 content chain exists;
* a first pilot being mistaken for L1 readiness or public Sales-Ready coverage.

## 7. Continuity options

| Option | Description | Benefits | Risks | Fit for first pilot |
| --- | --- | --- | --- | --- |
| A | Explicit no-continuity for the first L1 pilot until an L1 route/content chain exists | Honest; avoids fake routing; protects product claims; simple to reason about. | Creates a possible L1 dead-end if student-facing copy is poor or other routes are unavailable. | Preferred base model for first L1 pilot planning. |
| B | Single-step internal pilot continuity to a second reviewed L1 StudyLoad, only when a second reviewed registry-ready set exists | Preserves non-blocking continuity once real content exists; uses content-chain discipline. | Not available now because no second reviewed L1 StudyLoad set exists. | Future-compatible, not current first-pilot default. |
| C | Generic repeat/remediation StudyLoad after completion | Keeps activity flow moving without waiting for full route design. | Risks fake personalization, stale repetition, weak pedagogy, and unsupported product claims. | Not preferred. |
| D | Admin/manual review gate before next L1 StudyLoad | Gives human control in early pilot. | Violates reconciled non-blocking baseline if default; creates hidden operational bottleneck. | Not acceptable as default continuity model. |
| E | Fallback message: no next L1 activity yet, while other active tutoring routes continue by their own rules | Honest; avoids indefinite tutor-wait language; preserves M1/M2 or other program continuity where available. | Requires careful copy and routing so the student does not feel stuck. | Preferred user-facing fallback paired with Option A. |

## 8. Recommended continuity model

Recommended model for first implementation planning:

```text
Use explicit no automatic L1 next StudyLoad until a second reviewed, registry-ready, product-boundary-safe L1 StudyLoad set exists. Do not use an admin/tutor manual gate. Do not create generic repeat/remediation. If no next reviewed L1 activity exists, the app should not fabricate continuity; it should expose a clear no-next-L1-activity state while other active tutoring routes continue according to their own rules.
```

Recommended first-pilot continuity rule:

* No `PAES_L1` continuity map entry should be added for the first pilot unless a second reviewed L1 StudyLoad exists.
* A completed first L1 pilot should resolve to an explicit `end_of_l1_pilot_sequence` or equivalent no-next-reviewed-activity state in future design.
* Completion should remain successful even if no next L1 activity is created.
* Admin/tutor review should not pause or release the next L1 StudyLoad.
* Other active tutoring programs, if any, should continue under their own existing continuity rules.
* Future L1 continuity may be enabled only through explicit L1 content-chain design.

Rationale:

The first L1 pilot set is a single documentation-only candidate. Automatic continuity without a second reviewed L1 set would either invent content, repeat content without justification, or imply L1 route readiness. The safest model is honest no-continuity for L1 until the content chain exists.

## 9. Non-blocking admin/tutor rule

Future L1 continuity must preserve:

* admin/tutor evidence review does not release the next L1 StudyLoad;
* admin/tutor evidence review does not pause the next L1 StudyLoad by default;
* lack of admin review does not block routine continuity by itself;
* explicit administrative adjustments remain out of scope and require separate design;
* continuity decisions must be system/content-chain based, not hidden admin review gates;
* an exceptional pause, block, access mutation, or route mutation must be separately scoped, authorized, implemented, and auditable.

This rule applies even when the recommended L1 model is no-continuity. No-continuity here means no reviewed next L1 content chain exists. It does not mean waiting for an ordinary admin review.

## 10. Student experience implications

If a future L1 pilot is implemented and no next L1 activity exists, the student-facing experience should:

* avoid indefinite "waiting for tutor" language;
* avoid implying an admin must approve the next L1 StudyLoad;
* avoid promising a next L1 activity that does not exist;
* show a clear, calm state such as the L1 activity is registered and no next L1 activity is currently available;
* preserve access to completed activity review if the implementation supports it;
* preserve other active tutoring continuity if applicable;
* avoid PAES score, mastery, theta, ranking, diagnosis, prediction, or guaranteed-improvement claims;
* avoid saying L1 is ready, product-approved, or publicly available.

Suggested future copy direction, not final UI copy:

```text
Tu actividad de lectura quedó registrada. Aún no hay una siguiente actividad L1 revisada para esta ruta. Si tienes otra tutoría activa, puedes continuar con sus actividades disponibles.
```

Final student-facing copy requires a later UI/content phase.

## 11. Content-chain requirements before L1 continuity

Automatic L1 continuity should remain blocked until at least these conditions are met:

* at least one next L1 StudyLoad set exists;
* the next set has its own original/reviewed text;
* items are reviewed;
* feedback breve/completo is authored and reviewed;
* registry/type mapping is approved;
* passage rendering implications are reviewed;
* response/evidence and admin evidence implications are reviewed;
* continuity mapping is contentKey-based or otherwise explicitly stable;
* `contentKey` and `contentVersion` are defined for both current and next L1 sets in a separately authorized phase;
* source/rights/review/approval metadata is preserved;
* student/product-use gate is handled separately if applicable;
* test plan and rollback/no-go policy are defined.

No single L1 pilot set should create automatic L1 continuity by itself.

## 12. Relationship to M1/M2/L1 Sales-Ready target

This continuity design supports the broader Sales-Ready target by refusing fake continuity.

Boundaries:

* L1 first pilot is not enough for public Sales-Ready.
* Public Sales-Ready eventually requires enough operational continuity across M1, M2, and L1 for the advertised offer.
* This phase does not approve public sale, public L1 availability, or a product claim.
* This phase does not reduce the future obligation to build real L1 content-chain continuity.
* This phase preserves the truth that L1 remains not ready and Sales-Ready remains blocked.

The recommended no-continuity model is a temporary honest boundary for a single pilot set, not the final commercial L1 target.

## 13. Future implementation implications

Future implementation should consider:

* L1 continuity mapping should be contentKey-based, not title-only, because L1 needs stable content/text/version traceability.
* Current M1 continuity must remain unchanged.
* Completion should not be rolled back because no next L1 activity exists.
* Missing L1 continuity should be explicit and safe, not logged as an unexpected product failure.
* If a future continuity service handles L1, it should return a distinct no-next-L1 state rather than silently falling through to M1 behavior.
* The future implementation should not infer `PAES_L1` route behavior from M1 maps.
* If the future app has multiple active tutoring routes, L1 no-continuity should not block those other routes.
* A future code phase must decide whether L1 uses the existing continuity service with expanded program map support or a separate L1-aware continuity adapter.

## 14. Risks and caveats

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Student dead-end risk | No next L1 activity can feel like a stall | Use honest no-next-L1 copy and preserve other active routes |
| Fake continuity risk | Generating repeat/remediation without reviewed content overclaims readiness | Require second reviewed L1 set before continuity |
| Admin review gate regression | Manual gate could reintroduce bottlenecks | Preserve system/content-chain based continuity |
| Product claim risk | First pilot could be mistaken for L1 route readiness | Preserve student/product approval as no and Sales-Ready blocked |
| Content-chain insufficiency | One L1 set cannot support sustained learning | Require a next reviewed L1 set before automatic L1 continuity |
| M1 regression | L1 changes could disrupt validated M1 continuity | Require future implementation tests and preserve M1 maps |
| Future migration complexity | Adding L1 continuity later may require contentKey-first lookup and new evidence fields | Resolve in later implementation-readiness and test-plan phases |

## 15. No-go gates before code

Code remains blocked until separate phases complete:

* continuity design review;
* L1 content-chain design for at least a second activity, if automatic L1 continuity is desired;
* test plan;
* implementation-readiness review;
* registry/contentKey/contentVersion authorization;
* product-use gate;
* Sales-Ready gate remains separate.

Any future code phase must also include:

* exact files authorized for edit;
* M1 continuity regression protection;
* explicit L1 no-continuity or content-chain mapping behavior;
* no admin/tutor gate rule;
* no fake repeat/remediation rule;
* completion-not-rolled-back rule;
* student-facing fallback copy review;
* rollback/no-go policy.

## 16. Open decisions after this phase

Open decisions:

* Exact future L1 no-next state name.
* Whether L1 no-continuity is represented in a shared continuity outcome or a separate L1-aware adapter.
* Exact student-facing copy for no next L1 activity.
* Exact admin/tutor evidence display for no-next-L1 state.
* Whether L1 can be implemented internally while student/product approval remains no.
* When and how to author a second L1 StudyLoad set.
* Whether the second L1 set should remain locating-information or introduce another L1 skill family.
* Whether a future implementation should add `PAES_L1` to the existing continuity service or create a separate continuity module.
* Test plan for M1 continuity preservation and L1 no-next behavior.

## 17. Recommended next phase

Recommended next phase:

```text
MVP-COMMERCIAL-L1-STUDYLOAD-CONTINUITY-DESIGN-1A - Review L1 continuity/no-continuity design
```

Reason:

The continuity decision affects student experience, admin/tutor non-gating boundaries, M1 regression risk, and future implementation-readiness. It should be reviewed before any implementation-readiness consolidation or code phase.

## 18. Verification performed

Required verification for this phase:

```text
git diff --check
git status --short
git diff --stat
```

Expected changed files:

* `PHASE_LOG.md`
* `nextjs_space/docs/strategy/MVP_COMMERCIAL_L1_STUDYLOAD_CONTINUITY_DESIGN_1_DEFINE_L1_CONTINUITY.md`

## 19. Non-goals

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
* make admin/tutor review a default StudyLoad continuity gate;
* design or implement administrative adjustment workflow;
* design or implement pause, block, access mutation, or route mutation actions;
* infer L1 continuity from M1 continuity maps;
* use Abacus.

## 20. Result marker

```text
MVP_COMMERCIAL_L1_STUDYLOAD_CONTINUITY_DESIGN_1_CONTINUITY_MODEL_DEFINED
```
