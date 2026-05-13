# Context Transfer Template - MVP M1

## 1. Purpose

This is the canonical context-transfer contract for MVP-M1 chats.

It is not a casual prompt draft. Future chats and agents must preserve the required sections when creating next-chat handoffs for the Bexauri MVP-M1 tutoring line.

The purpose is to make continuity robust without depending on free-form assistant memory.

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
- Do not implement before reviewing preflight.
- Technical/product guardrails.
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
- Scope of next phase.
- Phase-specific guardrails.
- Preflight commands.
- First response instructions for the next chat.

## 5. Canonical ready-to-paste handoff skeleton

Use this skeleton for future next-chat prompts. Replace placeholders with the latest verified values when available.

Never leave the historical default values in a generated handoff. If live preflight is unavailable, say `latest verified state unavailable in this chat` rather than inventing a baseline.

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
1. nextjs_space/docs/operations/MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md
2. nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
3. nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
4. nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md
5. <LATEST_PHASE_DOCUMENT>
6. PHASE_LOG.md, especially the latest MVP-FLOW-4 entries

Canonical documents:
- <CANONICAL_DOCUMENTS>

Validated capabilities:
- <VALIDATED_CAPABILITIES>

Immature capabilities:
- <IMMATURE_CAPABILITIES>

Current strategic objective:
- <CURRENT_STRATEGIC_OBJECTIVE>

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
- No commit or push without explicit Mauricio authorization.
- Do not weaken product guardrails: no adaptive AI, theta, mastery, scoring, or PAES score claims unless a later accepted phase explicitly implements and validates them.
- Keep LearningCycles internal and invisible to students unless a later accepted phase explicitly changes that product rule.

Mandatory preflight:
```text
git status --short
git log --oneline --decorate --graph -8
```

Do not implement before reviewing preflight and reading the canonical docs.

First response instructions for the next chat:
- Report whether Git preflight matches the expected state.
- If it does not match, flag the mismatch and apply the Git-preflight-overrides-stale-docs rule.
- State what files you will read or edit.
- Do not ask "how can I help?"
- Do not greet and wait.

Context preservation obligation:
- If this chat becomes long, loses focus, approaches context saturation, or Mauricio asks whether to change chats, generate a complete next-chat handoff automatically.
- The next handoff must include latest verified Git state if available, canonical docs, known drift, validated/immature capabilities, guardrails, next phase, preflight commands, and this same context-transfer rule.
- Do not make Mauricio carry context manually.
````

## 6. Anti-drift rules

- Do not shorten the handoff by omitting required sections.
- Do not replace Git preflight with memory.
- Do not weaken guardrails.
- Do not leave historical default baselines in generated handoffs.
- Do not hide known stale baselines; name them explicitly.
- Do not add runtime permissions into the handoff unless Mauricio explicitly authorized them.
- If unsure, preserve more context rather than less.
- If the handoff becomes too long, compress only explanatory prose, not required state or guardrail sections.
- If a documentation update changes HEAD, the handoff must say that future Git preflight may be newer than the latest baseline paragraph.

## 7. Relationship to existing docs

- `CURRENT_AGENT_HANDOFF_MVP_M1.md` remains the current operational state handoff.
- `DOCUMENTATION_INDEX_MVP_M1.md` remains the source-alignment index.
- `MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md` remains the latest immediate phase handoff until superseded by a newer phase handoff.
- `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` is the stable template/contract used when creating future next-chat prompts.

## 8. Current known next phase at E5G hardening

At E5G hardening, the recommended next phase is:

```text
MVP-FLOW-4-E5H - Add and validate reinforcement -> linear functions continuity edge
```

Candidate edge:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
```

This section is a convenience note, not a substitute for live Git preflight or the latest phase handoff. If later commits supersede E5H, the latest accepted phase handoff and Git preflight win.
