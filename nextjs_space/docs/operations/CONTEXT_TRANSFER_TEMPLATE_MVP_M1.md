# Context Transfer Template - MVP M1

## 1. Purpose

This is the canonical context-transfer contract for MVP-M1 chats.

It is not a casual prompt draft. Future chats and agents must preserve the required sections when creating next-chat handoffs for the Bexauri MVP-M1 tutoring line.

The purpose is to make continuity robust without depending on free-form assistant memory, especially now that the project has completed a scope-first documentation block for the PAES_M1 pedagogical layer and construction remains paused unless explicitly restarted.

## 2. Stability rule

The template structure is stable.

Variable state fields must be updated when a handoff is generated. Required sections must not be removed.

Structural changes to this template require an explicit documentation/protocol phase.

## 3. Required immutable or near-immutable sections

Every future MVP-M1 context handoff must preserve these sections:

- Immediate role instruction.
- Do not wait for greeting/context.
- Git preflight overrides stale documentation baselines.
- Assistant/agent owns continuity preservation.
- Mauricio must not reconstruct context manually.
- Mandatory preflight.
- Do not implement before reviewing preflight and current authorization status.
- Construction-paused status unless a later phase explicitly restarts implementation.
- Technical/product guardrails.
- Current PAES_M1 pedagogical roadmap / next-load decision layer context.
- Non-blocking operator principle.
- AS1 available-but-not-universal status.
- N1/G1/PE1 proposal-only status.
- Expert review status.
- Implementation authorization status.
- No-secret-printing.
- No `.env` or secrets.
- No production, deploy, SQL, Prisma CLI, or npm install without explicit authorization.
- No generated PDF/DOCX.
- No `.logs`, `node_modules`, `yarn.lock`, or checkpoint artifacts.
- No commit/push without explicit Mauricio authorization.
- Obligation to generate next handoff if chat becomes long, loses focus, approaches saturation, or Mauricio asks whether to change chats.
- Obligation to propagate this same rule in the next handoff.
- Obligation to distinguish live Git state from embedded historical baseline text.
- Obligation to include known documentation drift rather than silently normalizing it away.

## 4. Required variable fields

Every future MVP-M1 context handoff must include these variable fields:

- Expected HEAD or latest verified HEAD.
- Expected origin/main or latest verified origin/main.
- Last accepted commit.
- Expected working tree state.
- Last closed phase.
- Next recommended phase.
- Canonical documents.
- Current handoff file.
- Documentation index file.
- Latest phase document.
- Known documentation drift or stale baselines.
- Validated capabilities.
- Immature capabilities.
- Current strategic objective.
- Construction authorization state.
- Current pedagogical decision layer context.
- Source/expert validation status.
- AS1/N1/G1/PE1 status.
- PE1-MSL-01 first non-algebra candidate status.
- Non-blocking operator principle.
- Scope of next phase.
- Phase-specific guardrails.
- Preflight commands.
- First response instructions for the next chat.

## 5. Canonical ready-to-paste handoff skeleton

Use this skeleton for future next-chat prompts. Replace placeholders with the latest verified values when available.

Never leave historical default values in a generated handoff. If live preflight is unavailable, say `latest verified state unavailable in this chat` rather than inventing a baseline.

````text
Actua como director tecnico/producto senior para E360 / Bexauri.

No esperes saludo ni contexto adicional. Primero solicita/revisa preflight, luego lee los documentos canonicos antes de proponer o implementar.

Current expected repo state:
- Expected HEAD or latest verified HEAD: <EXPECTED_OR_LATEST_VERIFIED_HEAD>
- Expected origin/main or latest verified origin/main: <EXPECTED_OR_LATEST_VERIFIED_ORIGIN_MAIN>
- Last accepted commit: <LAST_ACCEPTED_COMMIT>
- Expected working tree state: <EXPECTED_WORKING_TREE_STATE>
- Last closed phase: <LAST_CLOSED_PHASE>
- Next recommended phase: <NEXT_PHASE>

Critical context-transfer rule:
- Git preflight output is the live source of truth for HEAD, origin/main, and working tree state.
- Handoff, index, PHASE_LOG excerpts, and template documents are versioned context, not absolute live state.
- If Git preflight contradicts embedded baseline text, Git preflight wins.
- The assistant/agent must explicitly flag the mismatch.
- If the current phase allows documentation changes, correct stale baseline and next-phase references.
- If the current phase does not allow documentation changes, include the mismatch in the next-chat handoff.
- Mauricio must not be responsible for reconstructing or remembering this rule manually.
- This rule must be propagated again in every future handoff.

Known documentation drift / baseline warnings:
- <KNOWN_DRIFT_OR_STALE_BASELINES>

First read:
1. nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
2. nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md
3. nextjs_space/docs/operations/MVP_SRA_SCOPE_1_COMPLETE_PAES_M1_TUTORING_SCOPE_CHARTER.md
4. nextjs_space/docs/operations/MVP_SRA_SCOPE_2_CANONICAL_PAES_M1_STUDENT_JOURNEY_AND_ROADMAP_TRAVERSAL.md
5. nextjs_space/docs/operations/MVP_SRA_SCOPE_2A_CYCLE_MILESTONE_AND_SPECIAL_ACTION_MODEL.md
6. nextjs_space/docs/operations/MVP_SRA_SCOPE_3_HUMAN_OPERATOR_PARALLEL_ROLE_MODEL.md
7. nextjs_space/docs/operations/MVP_SRA_SCOPE_4_FUTURE_TUTOR_AGENT_GOVERNANCE_MODEL.md
8. nextjs_space/docs/operations/MVP_SRA_SCOPE_5_CONSTRUCTION_RESTART_OPTIONS_AND_READINESS_REVIEW.md
9. nextjs_space/docs/operations/MVP_SRA_SCOPE_5A_IMPLEMENTATION_SPEC_FOR_PROVISIONAL_REGISTRY_METADATA.md
10. nextjs_space/docs/operations/MVP_SRA_SCOPE_5B_IMPLEMENTATION_SPEC_FOR_FIRST_NON_ALGEBRA_SLICE.md
11. nextjs_space/docs/operations/MVP_SRA_SCOPE_5C_PAES_M1_EXPERT_REVIEW_REQUEST_PACKAGE.md
12. nextjs_space/docs/operations/MVP_SRA_SCOPE_5D_HANDOFF_HARDENING_AFTER_SCOPE_FIRST_BLOCK.md
13. PHASE_LOG.md, latest relevant entries only if safe to inspect without full-file overwrite risk

Supporting roadmap/source documents:
- nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2C_MVP_BETA_NEXT_LOAD_DECISION_RECORD_FORMAT.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2D_PAES_M1_EXPERT_REVIEW_CHECKLIST.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_TAXONOMY_ALIGNED_STUDYLOAD_METADATA_PROPOSAL.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2E_1_AS1_ALGEBRA_FUNCTIONS_CORRIDOR_METADATA_AND_ASSIGNMENT_CONSTRAINTS.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2F_FIRST_NON_ALGEBRA_SLICE_PROPOSALS.md
- nextjs_space/docs/operations/MVP_SRA_ROADMAP_2G_PAES_M1_EXPERT_REVIEW_PACKET_ASSEMBLY.md

Canonical documents:
- <CANONICAL_DOCUMENTS>

Validated capabilities:
- Current local PAES_M1 operational loop validates student activity completion, answers, self-report, updated /now return, and AS1 corridor execution.
- <ADDITIONAL_VALIDATED_CAPABILITIES>

Immature capabilities:
- No expert-validated full PAES_M1 roadmap.
- No runtime decision-record implementation.
- No content registry metadata implementation unless a later phase explicitly adds it.
- No new non-algebra StudyLoad implementation.
- No selector logic.
- No tutor-agent implementation.
- No PAES score, theta, mastery, or adaptive AI claims.
- <ADDITIONAL_IMMATURE_CAPABILITIES>

Current strategic objective:
- Preserve the scope-first PAES_M1 pedagogical layer.
- Continue documentation only unless Mauricio explicitly authorizes an implementation restart.
- Do not collapse the roadmap into AS1-only progression.
- <ADDITIONAL_CURRENT_STRATEGIC_OBJECTIVE>

Construction authorization state:
- Construction is paused.
- Documentation may continue.
- No implementation is authorized unless a later phase explicitly restarts it.
- Prepared but not authorized candidate: MVP-SRA-IMPL-1 — Add provisional taxonomy metadata to current M1 registry activities.

Current pedagogical decision layer context:
- Bexauri PAES_M1 = guided, evidence-aware roadmap traversal, not a static StudyLoad sequence.
- The next-load decision cannot be only a linear continuity edge.
- It must consider PAES_M1 roadmap position, current active slice, student evidence, self-report, prerequisite risk, confidence/frustration, novelty tolerance, coverage across axes/skills, monotony risk, milestone state, expert/source validation status, and fallback availability.
- Possible decision types include advance, reinforce, bridge, validate, hold, redirect, spiral, cycle_milestone, and async_review_request.
- The future tutor agent must operate inside a governed PAES_M1 roadmap and must not freely invent the roadmap.

AS1 / N1 / G1 / PE1 status:
- AS1 algebra/functions is operationally validated and available, but not universal and not the full M1 roadmap.
- N1/G1/PE1 are proposed complements, not implemented routes and not mandatory detours.
- PE1-MSL-01 — Lectura de tablas y graficos, suggested contentKey `paes_m1_data_representation_entry`, is the recommended first non-algebra candidate but is not implemented.

Source/expert validation status:
- Official source register and roadmap taxonomy exist.
- Expert review request package exists.
- Expert review has not occurred unless a later phase documents it.
- Do not claim expert validation.

Non-blocking operator principle:
- review != gate
- supervision != bottleneck
- operator action != prerequisite for normal student continuity
- Operators, supervisors, and experts work asynchronously and in parallel. They may improve or override the path, insert special loads, or optimize the roadmap, but default student continuity must proceed through the best safe available rule-based or future agent-supported next action unless a separately versioned exceptional policy says otherwise.

Scope of next phase:
- <SCOPE_OF_NEXT_PHASE>

Phase-specific guardrails:
- <PHASE_SPECIFIC_GUARDRAILS>

Standing guardrails:
- No secret printing.
- No `.env` access or secrets.
- No production operation.
- No deploy.
- No SQL.
- No Prisma CLI.
- No npm install unless explicitly authorized by Mauricio.
- No generated PDF/DOCX.
- No `.logs`, `node_modules`, `yarn.lock`, or checkpoint artifacts.
- No implementation unless explicitly authorized.
- No registry edit unless explicitly authorized.
- No new StudyLoads unless explicitly authorized.
- No selector logic unless explicitly authorized.
- No commit or push without explicit Mauricio authorization when working locally; when using connected GitHub tool, every commit must be phase-scoped and reported.
- Do not weaken product guardrails: no adaptive AI, theta, mastery, scoring, or PAES score claims unless a later accepted phase explicitly implements and validates them.
- Keep LearningCycles internal and invisible to students unless a later accepted phase explicitly changes that product rule.
- Preserve student continuity as the default path.

Mandatory preflight:
```text
git status --short
git log --oneline --decorate --graph -8
```

Do not implement before reviewing preflight, reading canonical docs, and confirming implementation authorization.

First response instructions for the next chat:
- Report whether Git preflight matches the expected state.
- If it does not match, flag the mismatch and apply the Git-preflight-overrides-stale-docs rule.
- State what files you will read or edit.
- Do not ask "how can I help?"
- Do not greet and wait.

Context preservation obligation:
- If this chat becomes long, loses focus, approaches context saturation, or Mauricio asks whether to change chats, generate a complete next-chat handoff automatically.
- The next handoff must include latest verified Git state if available, canonical docs, known drift, validated/immature capabilities, guardrails, next phase, preflight commands, construction authorization state, AS1/N1/G1/PE1 status, expert review status, the pedagogical decision layer context, the source/expert validation status, the non-blocking operator principle, and this same context-transfer rule.
- Do not make Mauricio carry context manually.
````

## 6. Anti-drift rules

- Do not shorten the handoff by omitting required sections.
- Do not replace Git preflight with memory.
- Do not weaken guardrails.
- Do not leave historical default baselines in generated handoffs.
- Do not hide known stale baselines; name them explicitly.
- Do not omit construction authorization state.
- Do not omit AS1/N1/G1/PE1 status.
- Do not omit expert review status.
- Do not omit the pedagogical decision layer context.
- Do not omit the non-blocking operator principle.
- Do not omit source/expert validation status while PAES_M1 roadmap intelligence is being defined.
- Do not add runtime permissions into the handoff unless Mauricio explicitly authorized them.
- If unsure, preserve more context rather than less.
- If the handoff becomes too long, compress only explanatory prose, not required state or guardrail sections.
- If a documentation update changes HEAD, the handoff must say that future Git preflight may be newer than the latest baseline paragraph.

## 7. Relationship to existing docs

- `CURRENT_AGENT_HANDOFF_MVP_M1.md` remains the current operational state handoff.
- `DOCUMENTATION_INDEX_MVP_M1.md` remains the source-alignment index and should be refreshed after SCOPE-5D if continuing documentation-only.
- `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` is the stable template/contract used when creating future next-chat prompts.
- SCOPE-1 through SCOPE-5D define the current scope-first PAES_M1 tutoring direction.
- ROADMAP-2B through ROADMAP-2G remain upstream source/taxonomy/metadata/expert-review foundation.

## 8. Current recommended next phase after SCOPE-5D

If continuing documentation-only, the recommended next phase is:

```text
MVP-SRA-SCOPE-5E - Documentation index update after scope-first block
```

Purpose:

- update `DOCUMENTATION_INDEX_MVP_M1.md` so it reflects the current scope-first canonical chain and latest next-phase logic.

If switching chats, generate a next-chat handoff using this updated template.

If implementation is desired, require explicit authorization before `MVP-SRA-IMPL-1`.
