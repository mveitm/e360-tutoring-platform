# CUST-HANDOFF-ROLE-1 - Context transfer patch

Status: HANDOFF_ROLE_PATCH_ACTIVE

This patch must be treated as a mandatory addendum to:

- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`
- any deploy-independence handoff used after `MVP-DEPLOY-INDEPENDENCE-6C`

## Why this patch exists

A new chat resumed correctly from Git preflight and staging context, but failed to preserve the established work model: Mauricio does not edit files manually.

The assistant then asked Mauricio to append text to `PHASE_LOG.md`, which is not the correct workflow.

## Mandatory operating roles block for every future handoff

Every future handoff must include this block near the top, before phase goals or implementation instructions:

```text
Operating roles and file-edit rule:
- Mauricio is product owner/operator. He authorizes decisions, controls secrets, runs minimal terminal/browser checks, and pastes outputs. He does not manually edit files.
- ChatGPT is director/auditor. It defines phase scope, guardrails, architecture/product decisions, prompts for Codex/local editors, reviews diffs, and preserves handoff continuity.
- Codex/local editor is the controlled file-edit executor. It edits only explicitly authorized files under a narrow prompt written by ChatGPT.
- Abacus is not the base path for the current deploy-independence line unless explicitly selected for a bounded task.
- If a file change is needed, do not ask Mauricio to hand-edit files. Use an available connected repo tool within scope, or provide a precise Codex/local-editor prompt, or provide an atomic command that performs the edit and is reviewed by diff afterward.
```

## Mandatory first-response behavior

When a new chat starts from a handoff, the assistant must:

1. Ask for or review Git preflight.
2. Treat Git preflight as live truth.
3. State whether the expected HEAD/origin/main/working tree match.
4. State the active role model explicitly.
5. Never ask Mauricio to manually edit files.
6. If documentation must be changed, choose one of:
   - connected repo tool, if available and authorized by phase scope;
   - Codex/local-editor prompt;
   - atomic command-based edit with diff review.

## Prohibited assistant behavior

The following is now explicitly prohibited:

```text
Please add/append/edit this block manually in PHASE_LOG.md.
```

The following is also prohibited:

```text
Open the file and paste this content.
```

## Corrected workflow for documentation-only phases

1. ChatGPT defines the documentation phase and exact target files.
2. ChatGPT either performs the repo edit through a connected tool or writes a Codex/local-editor prompt.
3. Mauricio runs only preflight, verification, git status/log, and browser/terminal checks.
4. ChatGPT audits diff/status/log before accepting the phase.
5. Commit/push requires explicit authorization when done locally. If a connected GitHub tool commits directly, the assistant must report the commit SHA and require local sync verification.

## Immediate implication after this patch

Because this patch was committed directly through the connected GitHub tool, Mauricio's local repo is now expected to be behind `origin/main` until he runs:

```powershell
git fetch origin
git status
git log --oneline --decorate --graph -8
```

If clean and behind only by the custody patch commit(s), the safe local sync command is:

```powershell
git pull --ff-only
```

Do not continue data decisions or staging mutations until local Git truth is re-established after the patch.

## Resume point after synchronization

After local sync verifies the role-contract patch, resume:

```text
MVP-DEPLOY-INDEPENDENCE-6D - Decide staging data branch and next operational path
```

6D remains documentation/decision-first. No staging data mutation is authorized by this patch.
