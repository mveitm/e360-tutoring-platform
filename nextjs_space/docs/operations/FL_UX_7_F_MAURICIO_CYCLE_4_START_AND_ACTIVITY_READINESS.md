# FL-UX-7-F — Mauricio Cycle 4 Start and Activity Readiness

**Date:** 2026-05-05
**Type:** Human-mediated student UI operation / documentation
**Status:** ✅ PASSED
**Baseline:** `3f0c0ae` (FL-UX-7-E: document Mauricio Cycle 4 student visibility verification)

## Objective

Start the Mauricio Beta-M1 / PAES_M1 / Cycle 4 StudyLoad "PAES M1 — Funciones lineales básicas" and verify post-start activity readiness. Observation of activity content only — no answers submitted.

## Context

- FL-UX-7-E confirmed student visibility of the curated StudyLoad on `/now`.
- This phase starts the StudyLoad (status: pending → in_progress) and verifies the activity viewer is fully functional with answer form enabled.

## Operation performed

**Actor:** Human owner (student UI, logged in as Mauricio)
**Action:** `/now` → StudyLoad "PAES M1 — Funciones lineales básicas" → clicked "Empezar"

| Field | Before | After |
|-------|--------|-------|
| status | pending | in_progress |
| loadType | practice | practice (unchanged) |

## Post-start `/now` state

| Check | Result |
|-------|--------|
| StudyLoad shown under "En curso (1)" | ✅ yes |
| Visible state | En curso / in_progress |
| "Ver actividad" visible | ✅ yes |
| "Terminar" visible | ✅ yes |
| Cycle 4 remains open | ✅ yes |

## Post-start activity viewer

| Check | Result |
|-------|--------|
| Clicked "Ver actividad" | ✅ yes |
| Activity viewer opened | ✅ yes |
| Title visible | PAES M1 — Funciones lineales básicas |
| Subtitle visible | Funciones lineales (inicio) |
| Duration visible | 20–30 minutos |
| Instructions visible | ✅ yes |
| Answer form enabled | ✅ yes |
| Counter visible | 0 de 8 respondidas |
| Exercises visible | 8 |
| Alternatives A/B/C/D visible | ✅ yes |
| "Enviar respuestas" button visible | ✅ yes |
| Guard message | Not shown (correctly removed after start) |
| Post-start instruction | "Responde las preguntas y luego presiona Enviar respuestas. Después vuelve a /now para finalizar la carga con tu autorreporte." |

## Visible exercise set

1. f(x) = 2x + 3, value of f(4)
2. f(x) = 3x − 5 and f(x) = 10, solve x
3. Slope through (0, 2) and (3, 8)
4. y-intercept of y = −2x + 6
5. Function with slope 4 and intercept −1
6. Cost function C(h) for fixed 1000 plus 500 per hour
7. f(x) = −x + 9, value of f(3)
8. Linear rule for table x = 0,1,2 and y = 1,4,7

## Confirmed non-actions

- Did not select any answers.
- Did not submit any responses ("Enviar respuestas" not clicked).
- StudyLoad not completed. "Terminar" not clicked.
- No self-report written.
- No CycleDecision created. No CycleEvaluation created.
- Cycle 4 not closed. Cycle 5 not created.
- No admin mutation performed.
- No direct SQL. No `.env` access. No Prisma CLI. No schema change.
- No code change. No deploy. No content registry modification.
- No Test Now, Ana, or Bruno touched. No secrets inspected or printed.

## Recommended next

- **FL-UX-7-G**: Submit Mauricio Cycle 4 MC responses.
