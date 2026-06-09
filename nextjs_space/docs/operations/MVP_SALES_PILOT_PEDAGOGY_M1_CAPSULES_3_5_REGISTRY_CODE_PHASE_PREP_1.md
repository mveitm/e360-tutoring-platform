# MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-CODE-PHASE-PREP-1

## Purpose

Prepare the future narrow code phase for adding PAES_M1 capsules 3 and 5 to the static StudyLoad registry. This phase is documentation/prep only. It does not implement capsules 3/5, does not edit `nextjs_space/lib/study-load-content.ts`, and does not authorize UI/API/schema/DB/continuity/route-order changes.

Future target code phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-CODE-1
```

## Baseline

Expected baseline:

```text
HEAD = origin/main = origin/HEAD = 4ceea35
```

Current accepted milestone:

```text
4ceea35 - MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-COMPLETION-FLOW-CLOSEOUT-1: close completion flow verification
```

## Preflight Result

Preflight executed before documentation edits:

```text
git status --short
<clean>

git log --oneline --decorate --graph -8
* 4ceea35 (HEAD -> main, origin/main, origin/HEAD) MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-COMPLETION-FLOW-CLOSEOUT-1: close completion flow verification
* ba94023 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-COMPLETION-FLOW-MANUAL-LOCAL-SMOKE-1: record completion flow smoke
* 1e7668f MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-COMPLETION-FLOW-SMOKE-READINESS-1: define completion flow smoke readiness
* 77cd012 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-AUTHORIZATION-REVIEW-1: review registry authorization
* 58fd198 MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-VERIFIED-MILESTONE-HANDOFF-1: create verified milestone handoff
* 97c766a MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-LOCAL-VERIFICATION-CLOSEOUT-1: close local verification
* 8cbcaad MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-MANUAL-LOCAL-SMOKE-RETRY-1: rerun manual local smoke
* 0d1596a MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-AUTH-ACCESS-HUMAN-STATUS-CHECK-1: collect auth access status

git rev-parse HEAD
4ceea359b8e064ff41b4538ecb522075f16d4834

git rev-parse origin/main
4ceea359b8e064ff41b4538ecb522075f16d4834
```

Preflight verdict:

```text
PASSED
```

## Source Documents Inspected

Required/minimum files:

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/lib/study-load-content.ts`

Source and authorization documents found/read by search:

- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_SOURCE_FINALIZATION.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_SOURCE_AUTHORING.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_KEY_VALIDATION.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_FINAL_AUTHORING.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_REGISTRY_AUTHORIZATION_REVIEW.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_FEEDBACK_DATA_SHAPE_GUARDRAILS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_UI_API_LIFECYCLE_GUARDRAILS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_2_COMPLETION_FLOW_CLOSEOUT.md`

Search used:

```text
rg "paes_m1_numbers_percentage_proportionality_entry|paes_m1_geometry_area_measure_entry|paes_m1_linear_equations_basic|Porcentaje y proporcionalidad|Area, perimetro|Area, perimetro|authoredFeedback|SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED|CAPSULES_3_5_REGISTRY_AUTHORIZATION_READY_WITH_PREP_CONDITIONS" .
```

## Capsule 3 Source Recheck

Identity:

```text
contentKey: paes_m1_numbers_percentage_proportionality_entry
title: PAES M1 - Porcentaje y proporcionalidad en contexto
program: PAES_M1
item count: 4
item order: q1, q2, q3, q4
status: SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED
```

Items:

| Item | Stem | Options | Expected key |
|---|---|---|---|
| q1 | En un curso hay 40 estudiantes. El 25% participa en el taller de ciencias. ¿Cuantos estudiantes participan en ese taller? | A. 8; B. 10; C. 15; D. 25. | B |
| q2 | Una botella tenia 600 ml de agua. Despues de beber, queda un 20% menos que al inicio. ¿Cuanta agua queda en la botella? | A. 120 ml; B. 480 ml; C. 580 ml; D. 720 ml. | B |
| q3 | En una tienda, 3 cuadernos cuestan $2.400. En otra tienda, 5 cuadernos cuestan $4.500. Si los cuadernos son iguales, ¿en que tienda conviene comprar si se busca el menor precio por cuaderno? | A. En la primera tienda, porque cada cuaderno cuesta $800; B. En la segunda tienda, porque cada cuaderno cuesta $900; C. En la primera tienda, porque 3 cuadernos son menos que 5; D. En la segunda tienda, porque el total es mayor. | A |
| q4 | Para preparar jugo, una receta usa 2 vasos de concentrado por cada 5 vasos de agua. Si se usan 4 vasos de concentrado y se mantiene la misma proporcion, ¿cuantos vasos de agua se necesitan? | A. 7; B. 8; C. 10; D. 20. | C |

Key validation status:

```text
KEY_VALIDATION_PASSED_DOCUMENTATION_LEVEL_NOT_IMPLEMENTATION_KEYS
```

AuthoredFeedback availability:

```text
Documentation-level final feedback breve and feedback completo exist for q1-q4 in BPCPV1_PAES_M1_CAPSULES_2_3_5_FINAL_AUTHORING.md.
```

Implementation caveat:

```text
Future code phase must re-read source and final authoring before insertion. Keys remain not final implementation keys until code-time recheck passes.
```

## Capsule 5 Source Recheck

Identity:

```text
contentKey: paes_m1_geometry_area_measure_entry
title: PAES M1 - Area, perimetro y medida en figuras simples
program: PAES_M1
item count: 4
item order: q1, q2, q3, q4
status: SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED
```

Items:

| Item | Stem | Options | Expected key |
|---|---|---|---|
| q1 | Un jardin rectangular mide 6 m de largo y 4 m de ancho. Se quiere poner una reja alrededor de todo el borde. ¿Que medida se necesita calcular? | A. El area: 6 x 4; B. El perimetro: 6 + 4 + 6 + 4; C. La diagonal: 6 + 4; D. El volumen: 6 x 4 x 2. | B |
| q2 | Una sala con forma de L ya esta dividida en dos rectangulos: uno mide 5 m por 3 m y el otro mide 2 m por 4 m. ¿Cual es el area total de la sala? | A. 14 m2; B. 23 m2; C. 30 m2; D. 40 m2. | B |
| q3 | Una cinta mide 2 metros. Para un trabajo se necesitan trozos de 25 centimetros. ¿Cuantos trozos completos de 25 cm se pueden cortar? | A. 4; B. 8; C. 25; D. 50. | B |
| q4 | Dos zonas rectangulares se quieren cubrir con pasto. La zona A mide 4 m de largo y 3 m de ancho. La zona B mide 5 m de largo y 2 m de ancho. ¿Cual zona tiene mayor superficie? | A. La zona A, porque su area es 12 m2; B. La zona B, porque su area es 10 m2; C. Las dos zonas tienen la misma area; D. No se puede saber sin calcular el perimetro. | A |

Key validation status:

```text
KEY_VALIDATION_PASSED_DOCUMENTATION_LEVEL_NOT_IMPLEMENTATION_KEYS
```

AuthoredFeedback availability:

```text
Documentation-level final feedback breve and feedback completo exist for q1-q4 in BPCPV1_PAES_M1_CAPSULES_2_3_5_FINAL_AUTHORING.md.
```

Implementation caveat:

```text
Future code phase must re-read source and final authoring before insertion. Keys remain not final implementation keys until code-time recheck passes.
```

## authoredFeedback Shape Confirmation

Confirmed from `nextjs_space/lib/study-load-content.ts` and existing capsule 2 implementation:

```ts
export interface StudyLoadAuthoredFeedback {
  briefId: string
  completeId: string
  version: string
  brief: string
  complete: string
}
```

Allowed future implementation shape:

```text
authoredFeedback: {
  briefId: string,
  completeId: string,
  version: string,
  brief: string,
  complete: string,
}
```

Not allowed in future student-facing registry entries:

```text
rationale
keyValidation
sourceFinalization
implementationReadiness
inferenceLimit
diagnosis
score
theta
mastery
readiness
routeDecision
Sales-Ready
adaptive AI
```

Recommended id/version convention for future code:

```text
briefId: <contentKey>_<qN>_brief_bpcpv1_v1
completeId: <contentKey>_<qN>_complete_bpcpv1_v1
version: bpcpv1-capsules3-5-feedback-v1
```

## Internal Leakage Review

Source documents include internal authoring assets such as item-level rationale, distractor/error-family rationale, key-validation notes and inference-limit notes. These must not be copied into `authoredFeedback`.

Safe future mapping:

- Use only `Final feedback breve` as `authoredFeedback.brief`.
- Use only `Final feedback completo` as `authoredFeedback.complete`.
- Do not copy step-by-step scripts unless a future prompt explicitly decides to use them inside `complete`.
- Do not copy item-level rationale, distractor rationale, key-validation note, source-finalization status, implementation-readiness note or inference-limit note into student-facing fields.

Leakage verdict:

```text
NO_STUDENT_FACING_LEAKAGE_IF_FUTURE_CODE_PHASE_MAPS_ONLY_FINAL_FEEDBACK_BREVE_AND_FINAL_FEEDBACK_COMPLETO
```

## Future Code Phase File Scope

Future code phase may edit only:

```text
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

Future code phase must not edit:

```text
UI files
API routes
schema/DB/Prisma files
continuity files
route-order logic
pedagogical decision logic
tests unless explicitly authorized
capsules 4/6
production/staging config
secrets or .env
```

## Future Code Phase Stop Conditions

Future code phase must stop without editing if:

- Git preflight is not clean or HEAD/origin/main/origin/HEAD do not match the expected baseline for that future phase.
- `nextjs_space/lib/study-load-content.ts` shape has changed in a way that makes insertion ambiguous.
- Capsule 3 source, stems, options, keys, item order or final feedback differ from this prep document or governing source documents.
- Capsule 5 source, stems, options, keys, item order or final feedback differ from this prep document or governing source documents.
- AuthoredFeedback shape is not exactly `briefId`, `completeId`, `version`, `brief`, `complete`.
- Insertion would require UI/API/schema/DB/continuity/route-order changes.
- Any internal rationale, key-validation note, source-finalization note, implementation-readiness note or inference-limit note would leak to student-facing content.
- Build/typecheck/static validation fails and repair would require files outside authorized scope.
- The phase would require production/staging, browser automation, API-only tests, DB reset, fixture mutation, secrets, capsules 4/6, Sales-Ready claims, or adaptive AI claims.

## Future Code Phase Validation Plan

Future code phase should validate:

- `git diff --check`
- `git status --short`
- `git log --oneline --decorate --graph -8`
- Static search confirming only allowed files changed.
- Static search confirming both new contentKeys exist exactly once in the registry.
- Static search confirming no UI/API/schema/DB/continuity/route-order file changed.
- Static review that capsule 2 behavior/source remains unchanged.
- Static review that capsule 3 and 5 item counts are 4 each.
- Static review that q1-q4 keys match:
  - capsule 3: B, B, A, C
  - capsule 5: B, B, B, A
- Static review that `authoredFeedback` fields use only `briefId`, `completeId`, `version`, `brief`, `complete`.
- `npm.cmd --prefix nextjs_space run build` if project dependencies are available and build is already supported by local protocol.

No browser automation, API-only test, DB reset, production/staging or secret inspection is authorized.

## Future Code Phase Commit/Push Rules

Future code phase may commit and push only if:

- Preflight passes.
- Only authorized files changed.
- Capsules 3/5 are inserted in `nextjs_space/lib/study-load-content.ts` only.
- Capsule 2 behavior/source remains preserved.
- No UI/API/schema/DB/continuity/route-order changes occurred.
- No internal leakage is present in student-facing fields.
- `git diff --check` passes.
- Static/build validation passes or any skipped validation is explicitly documented with reason.

Future commit message:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-CODE-1: add capsules 3 and 5 registry entries
```

Future push:

```text
git push origin main
```

## Copy-Ready Prompt for Future Codex Code Phase

```text
Actua como agente tecnico Codex local para E360 / Bexauri.

FASE:
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-CODE-1

OBJETIVO:
Agregar las capsulas PAES_M1 3 y 5 al registry estatico en nextjs_space/lib/study-load-content.ts, usando solo la fuente source-finalized y final-authoring ya revisada, sin tocar UI/API/schema/DB/continuity/route-order y sin ampliar scope.

REPO:
C:\projects\e360-tutoring-platform\tutoring_platform_mvp

PRE-FLIGHT OBLIGATORIO:
Ejecutar:
git status --short
git log --oneline --decorate --graph -8
git rev-parse HEAD
git rev-parse origin/main

Continuar solo si:
- working tree clean;
- HEAD = origin/main = origin/HEAD = <baseline indicado por ChatGPT para esta fase>.

Si no coincide:
STOP_PRELIGHT_MISMATCH
No editar archivos.

LEER ANTES DE EDITAR:
- PHASE_LOG.md
- nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
- nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULES_3_5_REGISTRY_CODE_PHASE_PREP_1.md
- nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_SOURCE_FINALIZATION.md
- nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_KEY_VALIDATION.md
- nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_FINAL_AUTHORING.md
- nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_REGISTRY_AUTHORIZATION_REVIEW.md
- nextjs_space/lib/study-load-content.ts

ARCHIVOS AUTORIZADOS PARA MODIFICAR:
- nextjs_space/lib/study-load-content.ts
- PHASE_LOG.md
- nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md

PROHIBIDO:
- UI changes
- API changes
- schema/DB/Prisma changes
- continuity changes
- route-order changes
- pedagogical decision changes
- browser automation
- API-only tests
- DB reset
- seed scripts
- fixture mutation
- production/staging
- secrets or .env inspection
- capsules 4/6
- adaptive AI claims
- Sales-Ready/public commercial claims
- changing capsule 2 behavior/source
- changing stems/options/keys from source-finalized docs
- copying internal rationale/key-validation/source-finalization/implementation-readiness/inference-limit notes into student-facing content

SOURCE RECHECK BEFORE EDITING:
Recheck capsule 3:
contentKey: paes_m1_numbers_percentage_proportionality_entry
title: PAES M1 - Porcentaje y proporcionalidad en contexto
program: PAES_M1
item count: 4
item order: q1, q2, q3, q4
keys: q1 B, q2 B, q3 A, q4 C
source status: SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED

Recheck capsule 5:
contentKey: paes_m1_geometry_area_measure_entry
title: PAES M1 - Area, perimetro y medida en figuras simples
program: PAES_M1
item count: 4
item order: q1, q2, q3, q4
keys: q1 B, q2 B, q3 B, q4 A
source status: SOURCE_FINALIZED_DOCUMENTATION_PLAN_NOT_IMPLEMENTED

If source, options, keys or item order conflict:
STOP_SOURCE_CONFLICT
No edits.

AUTHOREDFEEDBACK SHAPE:
Use exactly:
authoredFeedback: {
  briefId: string,
  completeId: string,
  version: string,
  brief: string,
  complete: string,
}

Map only:
- Final feedback breve -> brief
- Final feedback completo -> complete

Do not map:
- item-level rationale
- distractor rationale
- key-validation note
- source-finalization note
- implementation-readiness note
- inference-limit note
- diagnosis/score/theta/mastery/readiness/routeDecision/Sales-Ready/adaptive AI claims

IMPLEMENTATION SCOPE:
- Add only capsule 3 and capsule 5 static StudyLoadContent entries to CONTENT_REGISTRY in nextjs_space/lib/study-load-content.ts.
- Match existing registry shape and style.
- Preserve capsule 2 contentKey, contentVersion, stems, options, correctOptionKey, authoredFeedback, behavior and ordering.
- Preserve all existing entries.
- Do not add continuity or route-order links.

VALIDATION:
Run:
git diff --check
git status --short
git log --oneline --decorate --graph -8

Also perform static review/search:
- confirm only authorized files changed;
- confirm new contentKeys appear in study-load-content.ts;
- confirm no UI/API/schema/DB/continuity/route-order files changed;
- confirm capsule 3 has 4 items and keys B/B/A/C;
- confirm capsule 5 has 4 items and keys B/B/B/A;
- confirm authoredFeedback shape is briefId/completeId/version/brief/complete only;
- confirm no internal leakage terms in new authoredFeedback text.

If local project protocol supports it and dependencies are available, run:
npm.cmd --prefix nextjs_space run build

Do not run browser automation. Do not run API-only tests.

COMMIT/PUSH:
If and only if validation passes and only authorized files changed:
git add nextjs_space/lib/study-load-content.ts PHASE_LOG.md nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
git commit -m "MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-3-5-REGISTRY-CODE-1: add capsules 3 and 5 registry entries"
git push origin main

POST-PUSH:
Run:
git status --short
git log --oneline --decorate --graph -8

FINAL REPORT:
Report final HEAD/origin/main, files changed, validation, result, and scope safety. Do not include secrets or long diffs.
```

## Result

Result:

```text
M1_CAPSULES_3_5_REGISTRY_CODE_PHASE_PREP_DOCUMENTED
```

Verdict:

```text
READY_FOR_FUTURE_NARROW_CODE_PHASE_PROMPT
```

This phase prepared the future code-phase prompt and documented source/key/item-order/authoredFeedback checks. It did not implement capsules 3/5 and did not edit code.
