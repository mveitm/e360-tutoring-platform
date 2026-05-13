# MVP-FLOW-4-E5G-0 / E5G - Direction Checkpoint Handoff

## 1. Live-state rule

This document is an operational handoff, not the live source of truth for `HEAD`.

Git preflight is the live truth for:

- `HEAD`;
- `origin/main`;
- working tree state;
- whether this document itself has been superseded by a later documentation commit.

If any embedded baseline below contradicts live Git preflight, Git wins and the mismatch must be explicitly flagged in the next chat.

## 2. Last verified preflight used for the E5G decision

At the start of the E5G direction checkpoint chat, Mauricio provided this preflight:

```text
PS C:\projects\e360-tutoring-platform\tutoring_platform_mvp> git status --short
PS C:\projects\e360-tutoring-platform\tutoring_platform_mvp> git log --oneline --decorate --graph -8
* 283851a (HEAD -> main, origin/main, origin/HEAD) MVP-FLOW-4-E5G-0: add direction checkpoint handoff
* ee7e9af MVP-FLOW-4-E5F: clarify pending closure state
* c561740 MVP-FLOW-4-E5E: return to now after completion
* 6a9368b MVP-FLOW-4-E5D: add admin student account creation
* 8386898 MVP-FLOW-4-E5C: open activity after start
* 18d80e3 MVP-FLOW-4-E5B: validate M1 reinforcement continuity
* 671bb6b MVP-FLOW-4-E5A: add M1 reinforcement continuity edge
* 25e00a7 MVP-FLOW-4-E4A: implement M1 feedback UI
```

Interpretation:

- `HEAD = origin/main = 283851a` at E5G intake.
- Working tree was clean.
- The E5G-0 document was already committed and accepted.

Important: if this file is later edited and committed, the current live `HEAD` will necessarily be newer than `283851a`. That is not a contradiction. It is exactly why every future chat must run preflight again.

## 3. Drift found during E5G intake

The E5G intake found stale embedded baselines in the documentation set:

- this handoff originally pointed to `ee7e9af`, because it was drafted before being committed as `283851a`;
- `CURRENT_AGENT_HANDOFF_MVP_M1.md` also pointed to `ee7e9af`;
- `DOCUMENTATION_INDEX_MVP_M1.md` and `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` still contained older `213fccb` defaults.

This drift did not block the decision because all those documents already contain the correct rule: Git preflight overrides stale embedded documentation baselines.

## 4. Closed block summary: E5A-E5F

- E5A: added the reinforcement continuity edge.
- E5B: validated `word_problems` -> `reinforcement` with a local fixture.
- E5C: `Empezar` starts and opens the activity directly.
- E5D: admin-mediated student account creation; public signup remains closed.
- E5E: `Finalizar actividad` returns to `/now`.
- E5F: submitted-but-not-completed state is explicit as `Pendiente de cierre`.

## 5. Validated student flow before E5G

Validated PAES_M1 path before the E5G decision:

1. `PAES M1 - Entrada balanceada inicial`.
2. `PAES M1 - Ecuaciones lineales basicas`.
3. `PAES M1 - Problemas con ecuaciones lineales`.
4. `PAES M1 - Refuerzo de ecuaciones lineales`.

Runtime rule:

- `Enviar respuestas` = evidence saved.
- `Finalizar actividad` = activity closed + self-report + continuity may advance.
- Sending answers alone does not complete a load.
- If answers are sent but self-report is missing, the load remains `in_progress` and appears as `Pendiente de cierre`.
- Bexauri should not auto-complete without self-report.

## 6. Account/access rule

- Admin-created Student does not imply public signup.
- Public signup remains closed.
- Admin can create a missing User account from Student detail.
- Reset password is available once User exists.

## 7. Current first M1 path status

Existing registered content includes:

1. `paes_m1_balanced_entry_initial`.
2. `paes_m1_linear_equations_basic`.
3. `paes_m1_linear_equations_word_problems`.
4. `paes_m1_linear_equations_reinforcement`.
5. `paes_m1_linear_functions_basic`.

Validated continuity edges before E5G:

```text
paes_m1_balanced_entry_initial -> paes_m1_linear_equations_basic
paes_m1_linear_equations_basic -> paes_m1_linear_equations_word_problems
paes_m1_linear_equations_word_problems -> paes_m1_linear_equations_reinforcement
```

Missing edge at the E5G decision point:

```text
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic
```

## 8. E5G decision

E5G evaluated three options:

A. Prepare manual review / CycleDecision readiness.
B. Add and validate the next edge from reinforcement to functions.
C. Document the first complete M1 guided tutoring path as MVP-Beta-ready locally.

Decision: choose **B**.

Reason:

- The first M1 guided path should not be called locally MVP-Beta-ready until the transition from `Refuerzo de ecuaciones lineales` to `Funciones lineales basicas` is implemented and validated.
- Manual review / CycleDecision readiness is valuable, but it should not become the normal student continuity bottleneck before the first guided path is complete.
- The registered functions content already exists, so the next minimal runtime increment is the explicit rule-based continuity edge.

## 9. Next recommended phase

```text
MVP-FLOW-4-E5H - Add and validate reinforcement -> linear functions continuity edge
```

Expected E5H scope:

- Add exactly one continuity edge:
  `paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic`.
- Validate locally that completing `Refuerzo de ecuaciones lineales` creates `Funciones lineales basicas` as the next pending StudyLoad.
- Confirm the student returns to `/now` after completion.
- Confirm `/now` shows the next pending load.
- Confirm no `CycleDecision` is created.
- Confirm no `CycleEvaluation` is created.
- Confirm no LearningCycle close occurs.
- Confirm no new LearningCycle is created.
- Confirm no deploy or production operation occurs.

## 10. Guardrails for E5H

- Keep this as rule-based continuity only.
- Do not call it adaptive AI.
- Do not add scoring, theta, mastery, or PAES score claims.
- Do not expand to L1 or M2.
- Do not deploy.
- Do not touch production.
- Do not use SQL.
- Do not use Prisma CLI.
- Do not access `.env` or secrets.
- Do not mutate data outside local test validation.
- Keep phase scope minimal.
- Protect the SRA core.

## 11. Required next-chat starter prompt

```text
Actua como director tecnico/producto senior para E360 / Bexauri.

Estamos retomando desde repo limpio y contexto versionado.

Regla critica:
Git preflight es la verdad viva. Si cualquier documento contiene baseline obsoleto, Git gana y debes advertirlo. Los documentos de handoff son contexto versionado, no sustituyen el estado vivo del repo.

Antes de decidir o implementar, solicita/verifica:
git status --short
git log --oneline --decorate --graph -8

Estado esperado minimo desde el ultimo checkpoint conocido:
- E5G intake verifico HEAD = origin/main = 283851a.
- Si hay commits posteriores de documentacion/handoff hardening, Git preflight actualizado manda.
- Working tree esperado: clean.

Primero debes leer:
1. nextjs_space/docs/operations/MVP_FLOW_4_E5G_0_DIRECTION_CHECKPOINT_HANDOFF.md
2. nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
3. nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
4. nextjs_space/docs/operations/CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md
5. PHASE_LOG.md, especialmente E5A en adelante

Ultima decision aceptada:
MVP-FLOW-4-E5G eligio opcion B: agregar y validar el edge rule-based
paes_m1_linear_equations_reinforcement -> paes_m1_linear_functions_basic.

Siguiente fase recomendada:
MVP-FLOW-4-E5H - Add and validate reinforcement -> linear functions continuity edge.

Objetivo E5H:
Agregar exactamente ese edge y validarlo localmente, sin deploy ni produccion.

Guardrails:
- Fase minima.
- No deploy ni produccion.
- No SQL, Prisma CLI, .env ni secretos.
- No L1/M2.
- No scoring, theta, mastery, PAES score ni adaptive AI.
- Proteger el nucleo SRA.
- Confirmar que no se creen CycleDecision, CycleEvaluation, cierre de ciclo ni nuevo ciclo.
- Si el chat se vuelve largo o se cambia de chat, generar automaticamente un nuevo handoff completo y propagar esta misma regla de Git-preflight-overrides-stale-docs.
```
