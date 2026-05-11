# GEMINI-OPS-1 — Controlled Gemini Local Editor Protocol

## 1. Purpose

This document defines how Gemini may participate in the Bexauri / E360 development workflow as a stronger local support actor.

The goal is to reduce friction, improve proposal quality, preserve context, and support small controlled local development tasks without compromising architecture, governance, or traceability.

Abacus remains paused until further notice.

Gemini does not replace ChatGPT as director/auditor and does not replace the repository, PHASE_LOG, or versioned documentation as source of truth.

---

## 2. Current Tool Roles

### ChatGPT

ChatGPT acts as:

- project director,
- architecture and product auditor,
- phase designer,
- scope guardian,
- final reviewer before commit/push,
- continuity keeper across sessions.

ChatGPT defines the phase, reviews Gemini proposals, authorizes or rejects changes, and decides whether a change is safe to commit.

### Gemini

Gemini acts as:

- contextual support actor,
- local proposal generator,
- controlled local editor,
- PowerShell friction reducer,
- documentation assistant,
- UX/product logic reviewer,
- implementation assistant for small scoped changes.

Gemini may propose and edit, but should not become the final authority.

### User

The user:

- executes the minimum necessary local commands,
- observes UI behavior,
- brings Gemini outputs back to ChatGPT,
- confirms product direction,
- performs or authorizes commit/push depending on the phase.

### Repo / PHASE_LOG / Docs

The repository, PHASE_LOG, and versioned documents remain the source of truth.

### Abacus

Abacus is paused.

Abacus may return only if the project requires structural development work, larger agentic implementation, production/deploy operations, or changes whose scale justifies its use.

---

## 3. Safe Scope for Gemini

Gemini may be used for:

- documentation drafts,
- PHASE_LOG draft entries,
- small UI copy changes,
- small local code edits with narrow file scope,
- local reasoning about flow logic,
- creating implementation plans,
- preparing prompts,
- reading repo context,
- reducing PowerShell friction,
- proposing test/checklist steps,
- comparing implementation against product principles.

Gemini is especially useful for:

- MVP-FLOW phases,
- MVP-UI-FLOW phases,
- local/dev-only changes,
- student-experience copy cleanup,
- in-activity flow consolidation,
- documentation of Bexauri/SRA principles.

---

## 4. Restricted Scope for Gemini

Gemini must not independently perform or decide:

- production changes,
- deploys,
- database/schema migrations,
- Prisma schema changes,
- auth/admin boundary changes,
- secret handling,
- direct production data mutation,
- large architecture rewrites,
- destructive Git operations,
- force pushes,
- dependency upgrades,
- uncontrolled broad refactors,
- commits/pushes without prior authorization.

If a task touches any of these areas, ChatGPT must pause the workflow and reassess.

---

## 5. Standard Gemini Development Cycle

The preferred cycle is:

1. ChatGPT defines the phase:
   - objective,
   - scope,
   - no-goals,
   - allowed files,
   - prohibited files,
   - validation commands.

2. User sends the prompt to Gemini.

3. Gemini returns:
   - interpretation of the task,
   - proposed approach,
   - files it expects to touch,
   - risks,
   - verification plan.

4. User brings Gemini response to ChatGPT.

5. ChatGPT audits:
   - scope,
   - architecture,
   - product logic,
   - governance,
   - risk,
   - whether the task should proceed.

6. If approved, Gemini edits files locally.

7. User runs minimal verification commands.

8. ChatGPT reviews:
   - git diff,
   - git diff --check,
   - build/test results when applicable,
   - status.

9. If accepted, commit/push is performed only after explicit approval.

10. PHASE_LOG and operation docs are updated.

---

## 6. Commit and Push Policy

Initial trust level:

Gemini may edit files, but should not commit or push by default.

Preferred initial mode:

- Gemini edits files.
- User runs verification.
- ChatGPT reviews.
- User performs commit and push.

Intermediate mode may be allowed later:

- Gemini prepares commit message.
- User executes commit/push after ChatGPT approval.

Advanced mode is not yet active:

- Gemini edits, commits, and pushes directly.

Advanced mode requires several successful controlled phases first.

---

## 7. Required Gemini Prompt Fields

Every Gemini task prompt should include:

- phase name,
- project context,
- objective,
- allowed files,
- prohibited files,
- exact no-goals,
- whether code edits are allowed,
- whether docs edits are allowed,
- whether DB mutation is forbidden,
- whether production is forbidden,
- verification commands,
- expected response format.

Gemini should first respond with a plan unless the task explicitly allows direct edit.

---

## 8. Required Verification Commands

For documentation-only phases:

```powershell
git diff --stat
git diff --check
git status

---

## 11. Phase Result

GEMINI-OPS-1 establishes Gemini as a stronger controlled local support actor for Bexauri development.

The protocol preserves:

- ChatGPT as director/auditor,
- user as executor/owner,
- repo/PHASE_LOG/docs as source of truth,
- Abacus paused,
- local-first controlled development,
- explicit scope and verification before commit/push.

This phase is documentation-only.

No app code, schema change, database mutation, production change, deploy, Abacus work, UI change, endpoint change, commit automation, or Gemini direct push was performed.