# CODEX-0 — E360/Bexauri Repo Onboarding Read-Only

## Role

You are Codex acting as a read-only technical onboarding auditor for the E360 / Bexauri repository.

Your job is to understand the codebase enough to help reduce future Abacus context cost.

Do not modify files.

---

## Project Context

E360 / Bexauri is an intelligent tutoring platform for PAES Chile.

Initial focus:

```text
PAES_M1
PAES_M2
PAES_L1
```

Long-term vision:

```text
A learning regulation system:
diagnosis → learning cycle → adaptive study loads → evidence → evaluation → cycle decision → continuity → progressive autonomy.
```

Current technical continuity point:

```text
a5d657a — FL-UX-4J-F: complete Mauricio Cycle 3 StudyLoad
```

Recent validated flow:

```text
FL-UX-4J-A → FL-UX-4J-F completed end-to-end.
Admin curation → registry match → student /now → start → 8 MC items → submit responses → complete → self-report.
```

Current state:

```text
Mauricio Beta-M1 / PAES_M1 Cycle 3 open.
StudyLoad “PAES M1 — Refuerzo de ecuaciones lineales” completed.
8 MC responses saved.
Self-report: Me fue bien.
No CycleDecision.
No CycleEvaluation.
No Cycle 3 close.
No continuity.
No Cycle 4.
```

Next technical phase currently recommended:

```text
FL-UX-5-A — Mauricio Cycle 3 admin evidence review readiness
```

---

## Absolute Rules

Do not:

- edit files;
- create files;
- delete files;
- run deploy;
- access `.env`;
- inspect secrets;
- print secrets;
- run SQL;
- run psql;
- run Prisma CLI;
- run migrations;
- run `prisma db push`;
- mutate data;
- change schema;
- change auth;
- reset passwords;
- touch production;
- create commits;
- touch Test Now, Ana, or Bruno data.

This is read-only.

If a command would inspect secrets or mutate anything, do not run it.

---

## Allowed Work

You may inspect repository files and summarize.

You may run safe read-only shell commands such as:

```bash
git status
git log --oneline --decorate --graph -8
find nextjs_space/app -maxdepth 4 -type f
find nextjs_space/lib -maxdepth 3 -type f
```

Do not run commands that access `.env`, database, secrets, deploys, builds that mutate caches, or production.

---

## Required Onboarding Map

Produce a concise repo orientation covering:

### 1. App structure

Map:

```text
nextjs_space/app
nextjs_space/lib
nextjs_space/components
nextjs_space/docs/operations
PHASE_LOG.md
```

### 2. Student experience

Find and summarize:

- `/now`;
- StudyLoad viewer;
- start endpoint;
- response submission endpoint;
- complete endpoint;
- self-report handling.

### 3. Admin experience

Find and summarize:

- students admin;
- learning cycles admin;
- study loads admin;
- cycle detail;
- responses/evidence surfaces;
- CycleDecision admin;
- CycleEvaluation admin;
- beta operations if present.

### 4. Content registry

Find and summarize:

- where StudyLoad content registry lives;
- how title matching works;
- current PAES_M1 activities;
- relationship to interactive MC viewer.

### 5. Learning cycle flow

Map:

```text
LearningCycle
StudyLoad
Response
CycleDecision
CycleEvaluation
CycleSnapshot
ContinuitySignal
SkillState
```

### 6. Auth/admin guard

Find and summarize:

- NextAuth location;
- admin guard helper;
- admin-only API pattern;
- student access pattern;
- password reset pathway added in CUST-STUDENT-AUTH-1B.

Do not inspect credentials.

### 7. Audit logging

Find and summarize:

- audit helper;
- where it is used;
- what domains currently log;
- cautions around password/security payloads.

### 8. PHASE_LOG / docs operations pattern

Summarize how phases are documented.

---

## Required Risk Map

Identify files/zones Codex should treat as high-risk:

```text
schema
auth
admin guards
password reset
deploy config
Prisma
cycle close
continuity
production mutation endpoints
student response submission
study load completion
.env/secrets
```

---

## Required Safe Task Classification

Classify future tasks into:

### Safe for Codex read-only

Examples:

- repo mapping;
- checklist creation;
- documentation review;
- flow tracing;
- prompt preparation;
- risk analysis.

### Safe for Codex with edits after approval

Examples:

- docs;
- tests;
- small UI copy;
- low-risk read-only UI improvements;
- non-production helpers.

### Keep with Abacus for now

Examples:

- deploy;
- production operations;
- auth/security implementation;
- schema;
- migrations;
- cycle close;
- continuity;
- human-data-affecting mutations.

### Human-only

Examples:

- entering passwords;
- clicking production student/admin actions;
- deciding commercial/ethical scope;
- authorizing continuity/cycle close if required by governance.

---

## Required Output

Return a document in this structure:

```markdown
# CODEX-0 Repo Onboarding Notes — E360/Bexauri

## 1. Summary

## 2. Files inspected

## 3. App structure map

## 4. Student flow map

## 5. Admin flow map

## 6. Content registry map

## 7. Learning cycle and evidence map

## 8. Auth/admin/audit map

## 9. PHASE_LOG/docs pattern

## 10. High-risk zones

## 11. Safe task classification

## 12. Recommended CODEX-1 task

## 13. No-actions confirmation
```

In the no-actions confirmation, explicitly state:

```text
No files edited.
No files created.
No .env accessed.
No SQL.
No Prisma CLI.
No deploy.
No schema change.
No data mutation.
No secrets inspected or printed.
```

---

## Recommended Next Codex Task

At the end, recommend the next task:

```text
CODEX-1 — FL-UX-5-A admin evidence review readiness prep
```

Its goal should be to map exactly what evidence admin can see for Mauricio Cycle 3 and prepare a checklist/prompt for Abacus or human review.
