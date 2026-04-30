# Codex / Abacus Workload Balancing Protocol v1

**Project:** E360 / Bexauri — Intelligent Tutoring Platform  
**Created:** 2026-04-30  
**Phase:** CUST-CODEX-0  
**Status:** Active  
**Author:** Technical Governance Lead  

---

## 1. Executive Decision

- **Codex may be introduced now** into the E360/Bexauri development workflow.
- **Codex must NOT replace Abacus immediately.** Abacus remains the primary execution environment for production, deployment, and sensitive operations.
- **Codex starts as a low/medium-risk workload balancing layer** for tasks such as repo reading, audits, documentation, tests, UI read-only work, small refactors, and PR preparation.
- **Abacus remains the production/deploy/sensitive execution environment.** All schema changes, data mutations, write endpoints, auth guards, cycle transitions, and live verifications continue through Abacus.
- This decision is **reversible.** If Codex introduces custody confusion, artifact noise, or scope violations, its usage will be reduced or stopped.

---

## 2. Purpose

This protocol exists to:

1. **Reduce development cost** by offloading safe, read-only, and low-risk tasks to Codex.
2. **Preserve technical custody** — every change remains traceable, reviewed, and committed through disciplined processes.
3. **Avoid tool chaos** — clear boundaries prevent overlapping responsibilities, conflicting edits, and unreviewed changes.
4. **Protect the E360/Bexauri core** — the learning regulation system, student data, cycle transitions, and pedagogical logic remain under the strictest execution discipline.
5. **Maintain phase discipline and PHASE_LOG continuity** — every change, regardless of which tool produced it, follows the established phase naming, commit message, and documentation conventions.

---

## 3. Current Product Context

As of CUST-CODEX-0, the validated product state is:

- The **FL-UX-2 arc is validated end-to-end** in production.
- A student can complete a **minimal interactive MC activity in-app**: `/now` → Empezar → Ver actividad → select answers → Enviar respuestas → stored `mc_submission` → no score/feedback → return to `/now` → Terminar → self-report.
- Admin can see **self-report + MC evidence** on the learning cycle detail page.
- **No scoring or adaptive logic** exists yet.
- **CycleDecisions remain manual** (admin-created).
- The platform serves PAES Chile preparation (L1, M1, M2) with Mauricio Beta-M1 as the validated beta participant.

---

## 4. Tool Roles

### ChatGPT / Direction
- Roadmap definition and phase design.
- Risk assessment and go/no-go decisions.
- Prompt authoring for Codex and Abacus.
- Review of Codex outputs and diffs.
- Architecture decisions and governance.

### Codex
- Repo reading and architecture mapping.
- Audits of closed phases.
- Documentation generation.
- Test writing (unit, integration, contract).
- UI read-only analysis.
- Small refactors (copy, formatting, dead code removal).
- PR preparation on branches.
- Branch-based proposals for review.

### Abacus
- Production deployment and live environment management.
- Prisma schema changes and migrations.
- Data mutation (create/update/delete records).
- Write endpoint implementation and modification.
- Auth/ownership guards and middleware.
- Cycle transitions (open/close/continue).
- Sensitive beta operations (student data, test data setup).
- Final live verification (browser-based, admin login, production checks).
- Checkpoint management and deployment pipeline.

---

## 5. Core Allocation Rule

> **If a task touches production, schema, data, auth, write endpoints, deployment, cycle transitions, or sensitive pedagogy, it stays with Abacus.**
>
> **If a task is read-only, documentation, tests, UI read-only, copy, small refactor, or PR preparation, it may be a Codex candidate.**

When in doubt, the task stays with Abacus. Codex earns expanded scope through demonstrated clean execution.

---

## 6. Codex vs Abacus Task Matrix

| Task Category | Recommended Tool | Notes |
|---|---|---|
| Repo reading / architecture mapping | **Codex** | Read-only, no edits |
| Documentation (docs, READMEs, contracts) | **Codex** | Branch-based |
| Test writing (unit, integration) | **Codex** | Branch-based, build-verified |
| UI read-only analysis | **Codex first** | No component edits |
| Endpoint read-only audit | **Codex with review** | ChatGPT reviews findings |
| Copy/text improvements | **Codex** | Branch-based, review required |
| Small refactors (dead code, formatting) | **Codex** | Branch-based, diff reviewed |
| PR preparation | **Codex** | Creates branch, ChatGPT reviews |
| Endpoint write (new or modify) | **Abacus** | Production-sensitive |
| Schema changes / migrations | **Abacus** | Data integrity risk |
| Prisma db push | **Abacus** | Never from Codex |
| Production deployment | **Abacus** | Deployment pipeline |
| Data mutation (create/update/delete) | **Abacus** | Student/cycle data |
| Auth / ownership guards | **Abacus or double review** | Security-critical |
| Cycle transitions (close/continue) | **Abacus** | Pedagogical state machine |
| Scoring / adaptive logic | **Abacus + Direction** | Core pedagogical |
| AI agents / MindStudio integration | **Abacus + Direction** | Architecture-level |
| Roadmap / phase design | **ChatGPT / Direction** | Strategic |
| Risk assessment / go-no-go | **ChatGPT / Direction** | Governance |
| Live verification (browser) | **Abacus** | Hosted environment |
| Seed scripts / test data | **Abacus** | Production DB access |

---

## 7. Codex Adoption Phases

### CX-0 — Codex Readiness (no changes)
- Read-only repo understanding.
- Codex reads the codebase, maps architecture, identifies patterns.
- **No edits. No commits. No branches created.**
- Output: architecture summary, risk notes, candidate task list.

### CX-1 — Codex Shadow Audit
- Audit already-closed phases (e.g., FL-UX-2D, FL-UX-2C).
- Codex reads implementation and produces review notes.
- **No edits. No commits.**
- Output: audit findings, recommendations, potential improvements.

### CX-2 — Codex Low-Risk Change
- Tests, docs, or UI read-only work.
- **Branch only — no direct main commits.**
- Codex creates a branch, makes changes, runs `tsc`/build.
- Output: branch with clean diff, ready for review.

### CX-3 — Codex PR Factory
- Codex creates branch and PR.
- ChatGPT reviews the diff.
- User approves or rejects merge.
- **Main only advances via explicit reviewed merge.**

### CX-4 — Codex Absorbs UI/Read-Only Workload
- After several successful clean CX-2/CX-3 phases.
- Codex handles routine UI copy, test maintenance, doc updates.
- Abacus focuses exclusively on production/sensitive work.
- **Requires demonstrated clean track record.**

---

## 8. Gates Before Codex Edits Files

Before Codex makes any file edits, ALL of the following must be true:

- [ ] Repo is clean (`git status` shows no unexpected changes).
- [ ] Codex works on a **separate branch** from `main`.
- [ ] No `.env` files are read, modified, or created.
- [ ] No secrets, credentials, tokens, or passwords are accessed or printed.
- [ ] No `prisma db push` is executed.
- [ ] No migrations are run.
- [ ] No database reset or seed operations.
- [ ] No deployment commands.
- [ ] No production database access.
- [ ] `.abacus.donotdelete` is not touched.
- [ ] No `.logs`, `node_modules`, `yarn.lock`, or `install-state` artifacts are committed.
- [ ] Diff is reviewed before commit (`git diff --name-status`).
- [ ] `tsc --noEmit` passes when code files are changed.
- [ ] `yarn build` passes when code files are changed.
- [ ] Changed files are explicitly listed in the phase output.

---

## 9. Branch Policy

### Recommended Branch Names
```
codex/cx-0-readiness
codex/cx-1-shadow-audit-fl-ux-2d
codex/cx-2-mc-submission-parser-test
codex/cx-2-study-load-status-map
codex/ui-readonly-admin-copy
codex/docs-mc-submission-contract
```

### Rules
- **Codex should NOT work directly on `main`** during early adoption (CX-0 through CX-3).
- `main` should only advance via:
  - Explicit reviewed merge from a Codex branch, OR
  - Clean pull from `origin/main` after Abacus commits.
- Branch names must include the Codex phase prefix (`cx-N`) or a descriptive scope.
- Stale branches should be deleted after merge or rejection.

---

## 10. Codex Allowed Work Modes

### Read-Only Mode
- Inspect files and directory structure.
- Summarize architecture and data flow.
- Map component relationships.
- Identify risks, inconsistencies, or improvement candidates.
- **No file edits. No git operations.**

### Safe Edit Mode
- Documentation files (`.md`, `.txt`).
- Test files (`*.test.ts`, `*.test.tsx`, `*.spec.ts`).
- Copy/text-only changes in UI components.
- Pure helper functions with no side effects.
- Type definitions and interfaces.
- **Branch-only. Diff reviewed before merge.**

### Restricted Mode — NOT allowed for Codex
- Prisma schema (`schema.prisma`).
- Migration files.
- Production data operations.
- Deployment commands or configuration.
- Auth middleware, session guards, ownership checks.
- Write API endpoints (POST, PUT, PATCH, DELETE handlers).
- Cycle transition logic (open/close/continue).
- Scoring or adaptive logic.
- AI agent configuration or integration.
- `.env`, secrets, credentials.
- `.abacus.donotdelete`.

---

## 11. Initial Codex Prompts

### CX-0 — Readiness
```
You are auditing the E360/Bexauri tutoring platform codebase.
Repo: https://github.com/mveitm/e360-tutoring-platform.git
Branch: main

Do NOT make any edits. Do NOT create branches. Do NOT commit.

Tasks:
1. Read the full directory structure.
2. Map the Prisma schema entities and their relationships.
3. List all API routes and classify them as read (GET) or write (POST/PUT/PATCH/DELETE).
4. List all admin UI pages and their data dependencies.
5. Summarize the student-facing flow (/now, /now/study-loads/[id]).
6. Identify the mc_submission JSON contract used in responses.
7. List any code quality risks or inconsistencies you observe.

Output: structured summary document.
Do NOT suggest changes. Do NOT edit files.
```

### CX-1 — Shadow Audit (FL-UX-2D)
```
You are auditing FL-UX-2D implementation in the E360/Bexauri codebase.

Do NOT make any edits. Do NOT create branches. Do NOT commit.

Files to review:
- nextjs_space/app/api/learning-cycles/[id]/route.ts
- nextjs_space/app/admin/learning-cycles/[id]/_components/cycle-detail-view.tsx

Tasks:
1. Verify the McSubmissionEvidence component handles all edge cases:
   - null mc_submission
   - JSON parse error
   - partial submission (N < total items)
   - multiple mc_submission responses (shows latest)
   - answer key present vs absent
2. Verify self-report (responseType "answer") rendering is intact.
3. Check for TypeScript type safety issues.
4. Check for accessibility concerns (screen readers, contrast, aria labels).
5. Identify any potential rendering bugs.

Output: structured audit report with findings and severity.
Do NOT suggest code patches. Just report findings.
```

### CX-2 — mc_submission Parsing Test or Contract Doc
```
You are creating a test or documentation artifact for the mc_submission JSON contract.

Branch: codex/cx-2-mc-submission-parser-test
Do NOT work on main. Create the branch first.

Context:
The mc_submission responseType stores a JSON string in Response.content.
Expected structure:
{
  "contentId": string,
  "contentVersion": string,
  "answers": { [questionId: string]: string },
  "answerKey": { [questionId: string]: string } | undefined,
  "totalQuestions": number,
  "submittedAt": string (ISO),
  "status": "submitted" | "partial"
}

Tasks (choose one):
Option A: Write a TypeScript test file that validates parsing of mc_submission JSON
          with test cases for all edge cases.
Option B: Write a contract document (mc_submission_contract.md) that formally
          specifies the JSON structure, required/optional fields, and edge cases.

Gates:
- Branch only.
- No .env access.
- No schema changes.
- No write endpoint changes.
- Run tsc --noEmit if writing .ts files.
- List all files changed.
```

---

## 12. Immediate Candidate Tasks for Codex

These tasks are safe for Codex to attempt in early phases:

1. **Document mc_submission JSON contract** — formal specification of the response content structure.
2. **Test parser for mc_submission** — TypeScript test validating JSON parsing edge cases.
3. **Audit FL-UX-2D implementation** — review McSubmissionEvidence component for edge cases and accessibility.
4. **Map StudyLoad status × UI behavior** — document which statuses show which UI elements.
5. **Review accessibility of MC radio buttons** — check ARIA labels, keyboard navigation, contrast.
6. **Propose copy improvements** — identify Spanish text improvements in admin/student UI without applying them.
7. **Document API route inventory** — comprehensive list of all endpoints with methods, auth requirements, and guards.
8. **Audit closed-cycle guards** — verify all write endpoints properly check for closed cycles.

---

## 13. Tasks NOT Allowed for Codex (Yet)

The following tasks are **explicitly restricted** from Codex until further governance review:

- Prisma schema changes (`schema.prisma`).
- Migrations or `prisma db push`.
- Production deployment.
- Production database access or data mutation.
- `/start` endpoint (StudyLoad state transition).
- `/complete` endpoint (StudyLoad completion + self-report).
- `/responses` endpoint (MC answer submission).
- CycleDecision creation or modification.
- `/close` or `/continue` endpoints (cycle transitions).
- Scoring logic (PAES or otherwise).
- Adaptive logic or recommendation engine.
- Auth middleware or ownership guards.
- AI agent integration (MindStudio or other).
- `.env` file access or modification.
- Seed scripts that mutate production data.
- Any operation that could affect student data integrity.

---

## 14. Operating Workflow

The standard workflow when using Codex for a task:

```
1. ChatGPT defines the phase, scope, and prompt.
2. User runs Codex locally or in a controlled environment.
3. Codex works on a dedicated branch (never main).
4. Codex produces output (diff, document, audit report).
5. User shares the Codex output/diff with ChatGPT.
6. ChatGPT reviews the output for:
   - Scope compliance (no forbidden files touched).
   - Quality (clean diff, no artifacts, no secrets).
   - Correctness (logic, types, edge cases).
   - Custody (proper branch, proper commit message).
7. User decides: merge to main, discard, or escalate to Abacus.
```

For tasks that pass review and are merged:
- PHASE_LOG is updated (by Abacus or manually).
- Commit message follows phase convention.
- `origin/main` is updated.

---

## 15. Expansion Criteria

Codex may take on more workload (advance from CX-2 to CX-3, CX-4) only if it consistently:

- Produces **clean diffs** with no unrelated changes.
- **Respects scope** — touches only the files specified in the task.
- Does **not touch forbidden files** (schema, .env, auth, write endpoints).
- **Runs checks** (tsc, build) when code is changed.
- Produces **no artifacts** (.logs, node_modules, lock files, install-state).
- Handles **no secrets** — never prints, accesses, or stores credentials.
- Keeps **phases small** — focused, single-purpose changes.
- Completes **several successful phases** (minimum 3-5 clean trials) before scope expansion.

---

## 16. Stop Criteria

Codex usage should be **stopped or reduced** if any of the following occur:

- Modifies **forbidden files** (schema, .env, auth middleware, write endpoints).
- Commits directly to **main without approval**.
- Introduces **artifacts** (.logs, node_modules, yarn.lock, install-state, .DS_Store).
- **Ignores the no-secret policy** — accesses, prints, or stores credentials.
- Changes **schema or write endpoints** without authorization.
- **Breaks the build** (tsc errors, build failures).
- Produces **broad/unfocused diffs** that touch files outside scope.
- Creates **custody confusion** — unclear what changed, why, or by which tool.
- **Fails to follow branch policy** — works on main during early adoption.
- **Ignores review feedback** — repeats the same mistakes after correction.

When stop criteria are triggered:
1. Halt the current Codex task.
2. Discard the branch.
3. Document the incident in PHASE_LOG.
4. Reassess whether to continue Codex usage.

---

## 17. Final Recommendation

1. **Introduce Codex now** via CX-0 (read-only readiness). This carries zero risk.
2. **Do NOT replace Abacus yet.** Abacus remains the authoritative execution environment for all production, schema, data, auth, and deployment operations.
3. **Use Codex to reduce cost** on safe tasks: documentation, tests, audits, read-only analysis, copy review, PR preparation.
4. **Keep Abacus for sensitive/productive execution** — this is non-negotiable during early adoption.
5. **Reassess after 3–5 clean Codex trials.** If Codex demonstrates consistent clean execution across CX-0, CX-1, and CX-2 phases, consider expanding to CX-3 (PR factory) and eventually CX-4 (routine UI/read-only absorption).
6. **The goal is cost reduction, not tool replacement.** Both tools have distinct strengths. The protocol optimizes for the best of both.

---

*End of document.*
