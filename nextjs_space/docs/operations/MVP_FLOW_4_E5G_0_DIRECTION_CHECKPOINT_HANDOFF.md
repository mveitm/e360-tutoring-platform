# MVP-FLOW-4-E5G-0 - Direction Checkpoint Handoff After E5F

## 1. Current repo state

- HEAD = origin/main = `ee7e9af`.
- Working tree expected clean.
- Last accepted commit: `MVP-FLOW-4-E5F: clarify pending closure state`.

Git preflight is live truth. If this document ever contradicts live Git preflight, Git preflight wins and the mismatch must be flagged.

## 2. Closed block summary

- E5A: added reinforcement continuity edge.
- E5B: validated `word_problems` -> `reinforcement` with a local fixture.
- E5C: `Empezar` starts and opens activity directly.
- E5D: admin-mediated student account creation; public signup remains closed.
- E5E: `Finalizar actividad` returns to `/now`.
- E5F: submitted-but-not-completed state is explicit as `Pendiente de cierre`.

## 3. Validated student flow

Validated PAES_M1 path:

1. PAES M1 - Entrada balanceada inicial.
2. PAES M1 - Ecuaciones lineales basicas.
3. PAES M1 - Problemas con ecuaciones lineales.
4. PAES M1 - Refuerzo de ecuaciones lineales.

Completion creates the next load only when a continuity edge exists. Sending answers alone does not complete a load. `Finalizar actividad` closes the load and allows continuity.

## 4. Current product rule

- `Enviar respuestas` = evidence saved.
- `Finalizar actividad` = activity closed + self-report + continuity can advance.
- If answers are sent but self-report is missing, the load remains `in_progress` and is shown as `Pendiente de cierre`.
- Bexauri should not auto-complete without self-report.

## 5. Account/access rule

- Admin-created Student does not imply public signup.
- Public signup remains closed.
- Admin can create a missing User account from Student detail.
- Reset password is available once User exists.

## 6. Mobile/UX debts closed

- `Empezar` avoids the double step.
- `Finalizar actividad` returns to `/now`.
- Pending closure state is visible on `/now`.
- Closure block appears before instructions in activity view.
- Questions and feedback remain available below.

## 7. Current decision pending

The next chat should run:

`MVP-FLOW-4-E5G - Direction checkpoint after closing UX/account/mobile completion debts`

Decision options:

A. Prepare manual review / CycleDecision readiness.
B. Add and validate next edge from reinforcement to functions.
C. Document first complete M1 guided tutoring path as MVP-Beta-ready locally.

## 8. Recommended posture

- Do not implement code before the direction decision.
- Prefer a documentation/strategy checkpoint first.
- Protect the SRA core.
- Do not add AI/adaptive logic, scoring, theta, mastery, or PAES score claims.
- Do not deploy or touch production.
- Do not use SQL, Prisma CLI, `.env`, or secrets.
- Keep phases minimal.

## 9. New chat starter prompt

```text
Act as a senior technical/product director for E360 / Bexauri.

Live repo baseline to verify first:
- Expected HEAD = origin/main = ee7e9af
- Last accepted commit: MVP-FLOW-4-E5F: clarify pending closure state
- Working tree expected clean

Critical context rule:
Git preflight is live truth. If embedded docs contain stale baselines, Git preflight wins. Flag any mismatch.

Before deciding, run:
git status --short
git log --oneline --decorate --graph -8

Read first:
1. nextjs_space/docs/operations/MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md
2. nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
3. nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
4. nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md
5. PHASE_LOG.md latest E5A-E5F entries

Goal:
Run MVP-FLOW-4-E5G - Direction checkpoint after closing UX/account/mobile completion debts.

Decision options:
A. Prepare manual review / CycleDecision readiness.
B. Add and validate next edge from reinforcement to functions.
C. Document first complete M1 guided tutoring path as MVP-Beta-ready locally.

Guardrails:
- Do not implement code before the direction decision.
- No AI/adaptive logic, scoring, theta, mastery, or PAES score claims.
- No L1/M2 expansion.
- No deploy or production operation.
- No SQL, Prisma CLI, .env, or secrets.
- Keep phases minimal and protect the SRA core.
```
