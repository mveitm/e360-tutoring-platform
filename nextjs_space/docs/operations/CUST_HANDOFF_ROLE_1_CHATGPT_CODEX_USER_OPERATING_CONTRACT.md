# CUST-HANDOFF-ROLE-1 - ChatGPT/Codex/User operating contract

Status: ROLE_CONTRACT_REPAIRED_AND_FROZEN

## Trigger

A new chat resumed from a clean deploy-independence handoff, but the assistant incorrectly asked Mauricio to edit `PHASE_LOG.md` manually.

That response violated the established operating model of the project.

## Incident summary

The handoff preserved Git preflight, staging state, and deploy-independence context, but it did not make the active role contract sufficiently prominent.

The missing or underweighted rule was:

```text
Mauricio does not edit files manually.
```

Because that rule was not elevated into the first-read operating contract, the assistant reverted to a generic documentation workflow and asked Mauricio to append content to a file.

## Correct operating model

### Mauricio / product owner

Mauricio:

- makes product and custody decisions;
- authorizes phases;
- controls credentials and secrets;
- performs browser verification when needed;
- may copy/paste prompts, terminal commands, and outputs;
- may run minimal preflight, verification, git, build, and pull/push commands;
- does not manually edit source or documentation files;
- does not reconstruct context manually after a chat handoff failure.

### ChatGPT / director-auditor

ChatGPT:

- acts as senior technical/product director;
- defines phase scope, non-goals, and guardrails;
- audits proposed diffs and command outputs;
- decides whether a phase is safe to continue;
- writes precise prompts for Codex/Abacus/operator when file edits are required;
- may use connected tools to make documentation-only repo changes when explicitly within scope;
- must not ask Mauricio to manually edit files;
- must preserve continuity across chats;
- must surface stale baseline/documentation drift instead of hiding it.

### Codex / controlled local editor

Codex or the selected local editor:

- performs narrow file edits under explicit phase scope;
- modifies only authorized files;
- preserves formatting and UTF-8;
- does not broaden scope;
- does not touch `.env`, secrets, DB, production, deploy, schema, migrations, generated artifacts, or unrelated files unless explicitly authorized;
- returns diffs and verification results for ChatGPT audit.

### Abacus / secondary execution environment

Abacus:

- is not the base path for the current deploy-independence line;
- may be used only if explicitly selected for a bounded task;
- must obey the same no-secret-printing and anti-checkpoint rules;
- must not be allowed to introduce generated artifact noise into main.

## Mandatory rule for all future handoffs

Every future handoff must include this block or an equivalent explicit version:

```text
Operating roles:
- Mauricio does not manually edit files. He may run minimal commands, paste outputs, verify in browser, and authorize decisions.
- ChatGPT is director/auditor: phase scope, architecture/product decisions, custody, diff review, and handoff preservation.
- Codex/local editor executes controlled file edits when needed, under a narrow prompt written by ChatGPT.
- If a file change is needed, ChatGPT must either use an available connected tool within scope or produce an exact Codex/local-editor prompt. Do not ask Mauricio to hand-edit files.
```

## Handoff failure mode now frozen

The following pattern is explicitly prohibited:

```text
"Add this block manually to PHASE_LOG.md"
```

Allowed alternatives:

1. ChatGPT uses a connected repo tool to perform a scoped documentation update.
2. ChatGPT writes a Codex/local-editor prompt that performs the file edit.
3. ChatGPT writes an atomic PowerShell command only if the command itself performs the edit and Mauricio only copies/runs it; this must be used sparingly and reviewed by diff afterward.

## Relationship to Git truth

Git preflight remains the live truth:

```text
git status --short
git log --oneline --decorate --graph -8
```

If handoff, PHASE_LOG, index, template, or memory contradict Git preflight, Git wins and the assistant must flag the mismatch.

This role contract does not replace Git truth. It constrains how agents act after Git truth is established.

## Scope preserved in this custody phase

- No DB mutation.
- No seed.
- No students created.
- No programs created.
- No cycles created.
- No StudyLoads created.
- No deploy.
- No staging smoke.
- No production operation.
- No `.env` inspection.
- No secrets printed.
- No package install.
- No schema change.
- No app behavior change.

## Next operational path

After this repair, resume the interrupted decision phase:

```text
MVP-DEPLOY-INDEPENDENCE-6D - Decide staging data branch and next operational path
```

The expected decision remains documentation-first. Any staging data mutation must remain deferred to a later explicitly authorized phase.
