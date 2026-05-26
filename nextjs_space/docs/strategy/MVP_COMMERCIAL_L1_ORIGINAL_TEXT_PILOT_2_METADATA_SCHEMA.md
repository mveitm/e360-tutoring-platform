# MVP-COMMERCIAL-L1-ORIGINAL-TEXT-PILOT-2 - Original-Text Metadata Schema

## 1. Phase

* Phase: `MVP-COMMERCIAL-L1-ORIGINAL-TEXT-PILOT-2`.
* Type: documentation-only / L1 original-text metadata schema / pre-content governance.
* Product horizon: roadmap change-control / L1 original-text metadata preparation / Sales-Ready support.
* This is not `MVP-Beta-Sales-Ready` approval.
* M2 remains not ready.
* L1 remains not ready.
* Public Sales-Ready remains blocked.

## 2. Relationship to L1-ORIGINAL-TEXT-PILOT-1

`MVP-COMMERCIAL-L1-ORIGINAL-TEXT-PILOT-1` defined a documentation-only authoring protocol for future original Bexauri-created L1 pilot texts.

That protocol established that future original-text concepts need metadata before drafting, review, versioning, or later content-authoring work.

This document defines the conceptual metadata schema that future phases should use before any original L1 pilot text is drafted.

It does not create a runtime schema, database schema, content registry field, text asset, question, distractor, StudyLoad, feedback, or implementation.

## 3. Nature of document

This is a conceptual metadata schema.

It is:

* documentation-only;
* pre-content governance;
* required before future original-text drafting;
* intended for later authorized L1 content-review phases;
* bounded by the L1 text-rights policy, editorial checklist, and authoring protocol.

It is not:

* text creation;
* question creation;
* distractor creation;
* feedback creation;
* StudyLoad creation;
* content registry work;
* runtime schema change;
* database schema change;
* implementation authority;
* text approval for student use;
* L1 readiness approval;
* Sales-Ready approval.

## 4. Purpose

The purpose is to define what future metadata must exist before a future original Bexauri-created L1 pilot text concept can move toward drafting or review.

The schema should help future reviewers determine:

* whether the concept is clearly identified;
* whether source and rights custody are documented;
* whether the intended reading skill is controlled;
* whether the text shape, difficulty, load, and sensitivity are bounded;
* whether answerability and feedback feasibility can be reviewed later;
* whether reviewer states and version history are clear;
* whether a concept is ready only for a later authorized drafting or review phase.

## 5. Metadata schema principles

Principles:

* Metadata must exist before drafting, not after a text is already written.
* Original Bexauri-created text concepts are the preferred early pilot source class, but still require review.
* Metadata must preserve the L1 boundary: reading tasks are text-bound and reading-specific, not generic quiz work.
* Metadata must avoid official PAES/DEMRE text use, official item wording, copyrighted passages, and imitation of a specific copyrighted text.
* Metadata must separate conceptual readiness from product use.
* PASS means complete enough for a later authorized drafting or review phase, not product use.
* Any product use requires later content, implementation, review, and evidence phases.
* This is a conceptual schema only; there is no runtime schema change and no database schema change.

## 6. Required identity metadata

Future metadata should include these required identity fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `text_id` | Stable internal identifier for the future text concept | Internal planning ID only; not a content registry entry |
| `internal_title` | Working title for reviewer orientation | Not public title or student-facing copy |
| `asset_type` | Expected asset type, such as original L1 reading text concept | Not a created asset |
| `source_class` | Source class, expected to be original Bexauri-created for early pilot candidates | Must not imply rights approval by itself |
| `lifecycle_state` | Concept state, such as proposed, metadata_draft, metadata_review, blocked, or eligible_for_future_drafting_phase | Not product readiness |
| `created_by` | Internal author or owner responsible for the concept metadata | Conceptual role; no text creation authority |
| `created_at` | Date the metadata record is created | Documentation timestamp only |
| `version` | Human-readable metadata version | Not software version or database version |

## 7. Required source/rights metadata

Future metadata should include these required source and rights fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `rights_basis` | Why the future concept is believed eligible for drafting, such as original Bexauri-created | Not legal advice and not product-use approval |
| `originality_statement` | Statement that the future text will be newly created and not copied or closely imitated from official or copyrighted material | Must be reviewed again after drafting |
| `prohibited_source_inputs_checked` | Confirmation that official texts, released PAES items, copyrighted passages, news/blog/social texts, and commercial prep material were not used as source text | Does not authorize use of any prohibited source |
| `official_source_dependency` | Whether the concept depends on official PAES/DEMRE wording or text | Should be `none` for original early pilot candidates; anything else is blocked or reserved |
| `copyrighted_source_dependency` | Whether the concept depends on copyrighted source material | Should be `none`; any dependency requires Pro/high-level/legal/editorial review |
| `attribution_required` | Whether attribution is required for the concept | Expected `none` for original Bexauri-created text concepts unless future review says otherwise |
| `rights_review_state` | Rights review status, such as not_started, pending, pass_for_future_drafting, fail, or blocked | Not legal advice and not product-use approval |

## 8. Required reading-skill metadata

Future metadata should include these required reading-skill fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `primary_reading_skill_target` | One primary target from prior docs: locating information; interpreting meaning and relationships; evaluating text/context/form/purpose/position | No detailed official subskill invented |
| `secondary_skill_targets_if_any` | Optional secondary targets if they are necessary and controlled | Must not turn the concept into a catch-all |
| `reading_purpose` | Clear reason the future text supports a reading task | Not a generic topic statement |
| `text_bound_task_rationale` | Why future questions would be answerable from the text | Does not create questions |
| `official_alignment_reference_doc` | Reference to the relevant already-versioned source/alignment doc, such as SOURCE-1C or L1-ALIGNMENT-1 | High-level reference only; not official text reuse |

## 9. Required text-shape metadata

Future metadata should include these required text-shape fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `intended_text_format` | Expected format, such as continuous, discontinuous, multimodal-like, or mixed | Conceptual only; no asset created |
| `target_length_band` | Short or medium for early pilot concepts | Exact text length comes later |
| `expected_structure` | Planned structure, such as paragraph sequence, comparison, argument, notice, or brief narrative | No text drafted |
| `text_type_candidate` | Candidate type such as informative, argumentative, narrative, explanatory, or mixed | Not final taxonomy |
| `continuous_or_discontinuous` | Whether the future text is continuous, discontinuous, or hybrid | Discontinuous or multimodal-like concepts need extra accessibility review |
| `literary_or_non_literary_candidate` | Candidate orientation | Literary fragments remain rights and ambiguity sensitive |

## 10. Required difficulty/load metadata

Future metadata should include these required difficulty and load fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `target_difficulty_band` | Intended early pilot difficulty band | Not a validated difficulty score |
| `vocabulary_constraint` | Expected vocabulary control, including unfamiliar terms limit | Does not create wording |
| `sentence_complexity_constraint` | Expected sentence complexity control | Does not create sentences |
| `inference_burden_estimate` | Low, moderate, or blocked/high estimate of inference demand | Must align with future reading-skill target |
| `memory_load_estimate` | Estimate of how much information the student must hold across the text | Should remain controlled for early pilot |
| `expected_time_on_task` | Approximate future reading and answering time band | Not validated until later app/student evidence |

## 11. Required sensitivity/bias/context metadata

Future metadata should include these required sensitivity, bias, and context fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `sensitivity_level` | Low, moderate, high, or blocked | Early pilot should default to low |
| `sensitive_topic_flags` | Any topics that need editorial caution | Sensitive/controversial topics are blocked by default unless reviewed |
| `cultural_context_notes` | Context needed for comprehension and age fit | Must not require hidden external knowledge |
| `external_knowledge_dependency` | Whether answering would require knowledge outside the text | Should be none or explicitly controlled |
| `bias_review_state` | Review state for bias, fairness, and cultural/context appropriateness | Required before future drafting eligibility |
| `age_context_fit` | Statement that the concept appears appropriate for the target student stage | Not final editorial approval |

## 12. Required ambiguity/answerability metadata

Future metadata should include these required ambiguity and answerability fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `answerability_risk` | Low, moderate, high, or blocked estimate | High risk requires rework or reserved review |
| `evidence_availability_statement` | Statement that future questions should have text evidence available | Does not create evidence excerpts or questions |
| `plausible_multiple_answer_risk` | Risk that future multiple-choice questions could have more than one defensible answer | Must be low before later question authoring |
| `ambiguity_review_state` | Review state for ambiguity | Required before future drafting eligibility |
| `future_mc_suitability` | Whether the concept appears suitable for future multiple-choice reading tasks | Not question approval |

## 13. Required feedback-feasibility metadata

Future metadata should include these required feedback-feasibility fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `feedback_feasibility_state` | Whether future feedback appears feasible | Does not create feedback |
| `evidence_reference_feasibility` | Whether feedback can point to evidence safely without long quotations | Must respect text-rights boundaries |
| `distractor_feedback_feasibility` | Whether likely distractor failures could be explained later | Does not create distractors |
| `long_quote_risk` | Risk that feedback would need long text reproduction | High risk blocks or requires redesign |
| `student_safe_feedback_feasibility` | Whether future feedback can remain calm, bounded, and non-overdiagnostic | Required for later content phases |

## 14. Required reviewer-state metadata

Future metadata should include these required reviewer-state fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `rights_reviewer_state` | Rights/source custody review state | Not legal advice |
| `editorial_reviewer_state` | Editorial quality review state | Not product-use approval |
| `reading_reviewer_state` | Reading-skill and text-bound task review state | Not final taxonomy |
| `sensitivity_reviewer_state` | Sensitivity, bias, and context review state | Sensitive issues may remain blocked |
| `feedback_feasibility_reviewer_state` | Review state for future feedback feasibility | Does not create feedback |
| `final_phase_reviewer_state` | Whether the metadata can move to a future authorized drafting/review phase | Not student-use approval |

Reviewer states should be conceptual values such as:

* `not_started`;
* `pending`;
* `pass_for_future_drafting_phase`;
* `fail_rework_required`;
* `blocked_reserved_decision_required`.

## 15. Required versioning/change-control metadata

Future metadata should include these required versioning fields:

| Candidate field | Required meaning | Boundary |
| --- | --- | --- |
| `version_id` | Unique metadata version ID | Not database migration or runtime version |
| `change_reason` | Reason the metadata changed | Required for traceability |
| `previous_version_reference` | Link or ID for prior metadata version, if any | No generated artifact required |
| `review_reset_required` | Whether changes require review states to reset | Prevents stale approvals |
| `approved_for_next_phase` | Whether metadata is complete enough for a later authorized drafting or review phase | Not product approval |
| `approval_notes` | Notes explaining review outcome and limits | Must preserve non-readiness boundary |

## 16. Optional metadata

Optional future metadata may include:

* `estimated_question_count_band`;
* `possible_route_family_reference`;
* `possible_studyload_family_reference`;
* `accessibility_notes`;
* `device_readability_notes`;
* `translation_or_language_variant_notes`;
* `future_dashboard_evidence_notes`;
* `future_admin_review_notes`;
* `pilot_observation_notes`.

Optional fields must not become content registry entries, runtime fields, production metadata, or product claims without separate implementation phases.

## 17. Blocked/reserved metadata

Blocked or reserved metadata includes:

* official PAES/DEMRE text excerpts;
* official PAES/DEMRE item wording;
* copyrighted passages;
* copied literary fragments without rights approval;
* source URLs or references that imply unreviewed web/news/blog/social text use;
* student-provided text content;
* sensitive personal data;
* minor/payment/guardian details;
* answer keys;
* final question wording;
* distractor wording;
* feedback text;
* public marketing claims;
* PAES equivalence claims;
* production IDs or database model claims.

Any legal-sensitive, rights-sensitive, official-source, copyrighted-source, sensitivity, or reviewer-authority issue remains Pro/high-level/legal/editorial reserved.

## 18. Minimum metadata set for future drafting eligibility

A future original-text concept should not be eligible for a later drafting phase unless these are complete:

* identity metadata;
* source/rights metadata showing original Bexauri-created basis and no official/copyrighted dependency;
* one primary reading-skill target;
* text-bound task rationale;
* text-shape, length band, and structure expectations;
* difficulty/load estimates;
* sensitivity, bias, and context review states;
* ambiguity and answerability estimates;
* feedback-feasibility estimates;
* reviewer-state metadata;
* versioning and change-control metadata;
* explicit non-readiness notes.

Eligibility means ready only for a later authorized drafting or review phase. It does not mean a text exists, a question exists, or product use is approved.

## 19. PASS criteria

Metadata PASS means:

* required fields are complete enough for a later authorized drafting or review phase;
* rights/source custody is documented as original Bexauri-created with no prohibited dependency;
* reading-skill target is controlled and text-bound;
* difficulty, load, sensitivity, ambiguity, answerability, and feedback feasibility are reviewable;
* reviewer states are complete and current;
* versioning is traceable;
* no runtime schema change, database schema change, content registry entry, text, question, distractor, feedback, StudyLoad, L1 readiness, or Sales-Ready approval is implied.

## 20. FAIL criteria

Metadata FAIL means:

* required fields are incomplete in a way that suggests rework;
* field values conflict with each other;
* the reading purpose is generic or not text-bound;
* the primary reading-skill target is absent or too broad;
* difficulty/load assumptions are uncontrolled;
* ambiguity or answerability risk is too high for the intended concept;
* feedback feasibility is unclear or unsafe;
* reviewer states are stale, contradictory, or unsupported;
* versioning does not preserve traceability.

FAIL concepts should be reworked or closed before any later drafting phase.

## 21. BLOCKED criteria

Metadata BLOCKED means:

* official PAES/DEMRE text or item use is implicated;
* copyrighted source dependency is present or unclear;
* source custody is unresolved;
* sensitive or controversial content requires Pro/high-level/editorial decision;
* external knowledge dependency cannot be controlled;
* ambiguity prevents one defensible future answer;
* feedback would require long copyrighted quotations or unsafe explanation;
* reviewer authority is missing;
* legal-sensitive or rights-sensitive questions remain unresolved;
* the concept would imply L1 readiness, public product use, or Sales-Ready approval.

BLOCKED concepts cannot move to drafting until the blocking issue is resolved in a separate authorized phase.

## 22. Risks and mitigations

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Metadata is mistaken for a created text | Would bypass authoring and review gates | State that this is a conceptual schema and creates no text |
| Concept fields drift into runtime schema | Could imply implementation or database work | State no runtime schema change and no database schema change |
| Original status is overtrusted | Original texts can still be biased, ambiguous, too hard, or weakly answerable | Require editorial, reading, sensitivity, answerability, and feedback-feasibility states |
| Official or copyrighted source leakage | Creates rights and trust risk | Require prohibited-source checks and block official/copyrighted dependencies |
| Reading-skill target becomes too broad | L1 could become generic quiz content | Require one primary reading-skill target and text-bound rationale |
| PASS is overread as product approval | Would weaken L1 and Sales-Ready gates | Define PASS as later-phase eligibility only |

## 23. Questions reserved for Pro/high-level/editorial direction

Reserved questions:

* Exact allowed lifecycle-state vocabulary.
* Whether metadata should later live in Markdown, JSON, a CMS, or another controlled artifact.
* Minimum reviewer authority for each review state.
* Whether any moderate sensitivity concept is acceptable for early L1 pilot work.
* Whether discontinuous or multimodal-like original texts are allowed in the first pilot batch.
* Whether any literary-style original text is acceptable before non-literary pilots.
* Minimum evidence required before a text can move from metadata to drafting.
* Whether future dashboard evidence should use this metadata directly or a separate derived artifact.
* Any legal-sensitive or rights-sensitive decision.

## 24. Future phase options

Option A:

```text
MVP-COMMERCIAL-L1-ORIGINAL-TEXT-PILOT-3 - Define original-text concept inventory template
```

Purpose: define a non-content template for recording future original-text concepts with the metadata schema, still without writing texts.

Option B:

```text
MVP-COMMERCIAL-L1-ORIGINAL-TEXT-PILOT-4 - Author first original-text concept metadata records
```

Purpose: create metadata records only if separately authorized, without drafting text or questions.

Option C:

```text
MVP-COMMERCIAL-L1-ORIGINAL-TEXT-AUTHORING-1 - Draft controlled original L1 pilot texts
```

Purpose: only after metadata eligibility and explicit authorization, draft original texts without questions or implementation unless separately approved.

Option D:

```text
MVP-COMMERCIAL-L1-QUESTION-AUTHORING-1 - Define later question-authoring protocol for approved texts
```

Purpose: define how questions could be created later from approved texts, still preserving text rights, answerability, distractor, and feedback boundaries.

Recommendation: prefer a concept-inventory template before any metadata-record or text-drafting phase if L1 original-text work continues.

## 25. Context Gate summary

| Field | Summary |
| --- | --- |
| Phase | `MVP-COMMERCIAL-L1-ORIGINAL-TEXT-PILOT-2 - Define original-text metadata schema` |
| Proposed action | Create a documentation-only conceptual metadata schema for future original Bexauri-created L1 pilot text concepts. |
| Phase type | Documentation-only / L1 original-text metadata schema / pre-content governance. |
| Product horizon | Roadmap change-control / L1 original-text metadata preparation / Sales-Ready support; not Sales-Ready approval. |
| Roadmap block | L1 remains not ready; public Sales-Ready remains blocked. |
| Git preflight | Expected baseline matched `0686d83`; working tree clean before edits. |
| Canonical docs read | `PHASE_LOG.md`, product horizons, Context Gate protocol, Living Memory Index, handoff protocol, current handoff, product/UI/brand synthesis, operating mode, compact reporting rule. |
| Phase docs read | SOURCE-1, SOURCE-1A, SOURCE-1B, SOURCE-1C-M2, SOURCE-1C, L1-ALIGNMENT-1, L1-READINESS-1, L1-TEXT-RIGHTS-1, L1-TEXT-QUALITY-1, L1-ORIGINAL-TEXT-PILOT-1, M2-ALIGNMENT-1, M2-READINESS-1, Sales-Ready Gate 1, Gate 1A, Gate 1B, Gate 1C, and Gate 1D. |
| Source basis | Already-versioned documentation only; no web search; no official texts, released PAES items, copyrighted passages, news articles, blogs, commercial prep material, or AI-generated source claims. |
| Student experience impact | None. No app operation, content, StudyLoad, question, feedback, dashboard, `/now`, student UI, runtime, access, or activation change. |
| Commercial impact | Metadata-preparation support only; no public sale, public beta, payment, subscription, price, offer, or Sales-Ready approval. |
| Technical scope | Markdown doc plus `PHASE_LOG.md` only. No runtime schema change and no database schema change. |
| Explicit non-goals | No code, DB, API call, browser/app operation, PDFs, texts, questions, distractors, StudyLoads, content registry, feedback, UI, deploy, L1 readiness, or Sales-Ready approval. |
| Missing context check | No blocking context missing for conceptual metadata schema. Future text creation and product use require separate phases. |
| GO / NO-GO | GO. |
| Reason | GO only because this is documentation-only, conceptual, and non-operational. |

## 26. Explicit non-goals

* No code.
* No runtime schema change.
* No database schema change.
* No `schema.prisma` change.
* No package change.
* No Prisma change.
* No DB read.
* No DB mutation.
* No SQL.
* No seed.
* No content registry change.
* No StudyLoads.
* No texts.
* No questions.
* No distractors.
* No feedback.
* No `/now`.
* No student UI.
* No admin UI.
* No endpoints.
* No auth/signup.
* No StudentAccess behavior change.
* No trial activation.
* No billing/subscription/payment.
* No deploy.
* No PDF download.
* No PDF commit.
* No generated artifacts.
* No official PAES/DEMRE text or question use approval.
* No copyrighted text use approval.
* No legal advice.
* No L1 content.
* No L1 implementation.
* No L1 declared ready.
* No M2 declared ready.
* No public launch.
* No public sale.
* No Sales-Ready approval.

## 27. Result marker

```text
MVP_COMMERCIAL_L1_ORIGINAL_TEXT_PILOT_2_METADATA_SCHEMA_DEFINED
```
