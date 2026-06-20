# MVP-SALES-PILOT-L1-C01-LOCAL-DEV-ACCESS-HUMAN-AUTHORIZATION-1

## Phase

`MVP-SALES-PILOT-L1-C01-LOCAL-DEV-ACCESS-HUMAN-AUTHORIZATION-1`

## Result

`L1_C01_HUMAN_AUTHORIZATION_PACKET_READY`

## Baseline validado

```text
HEAD = origin/main = f10baf614b7fcc2b35773be54c1f0fe3a5278d69
working tree clean
```

## Archivos leidos

- `PHASE_LOG.md`.
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`.
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_TOOLING_1.md`.
- `nextjs_space/scripts/local-dev-safe-db-tool.ts` read-only.
- `nextjs_space/package.json` read-only.
- `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_L1_INTEGRADO.md`.
- `nextjs_space/docs/operations/BPCPV1_PAES_L1_PRECONTRACT.md`.
- `nextjs_space/docs/operations/BPCPV1_PAES_L1_DERIVATION_GOVERNING_DOCUMENT.md`.
- `nextjs_space/docs/operations/PAES_L1_PEDAGOGICAL_BRANCH_INDEX.md`.
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_L1_APPROVAL_CONTINUITY_GUARDRAILS_1.md`.
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_L1_STATIC_REVIEW_1.md`.
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_L1_HUMAN_UI_SMOKE_READINESS_1.md`.

## Tooling detectado

Tooling seguro existente:

```text
nextjs_space/scripts/local-dev-safe-db-tool.ts
```

Modos L1-C01 disponibles:

```text
l1-c01-access-precheck
plan-l1-c01-access
align-l1-c01-access
l1-c01-access-postcheck
```

No existen package scripts dedicados para estos modos. El patron real documentado usa `npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts ...` desde `nextjs_space`.

## Confirmacion humana exacta

Antes de ejecutar tooling L1-C01 en fase posterior, el humano debe escribir:

```text
CONFIRMO_LOCAL_DEV_SEGURO_PARA_L1_C01_ACCESS_TOOLING_SIN_SECRETS
```

La autorizacion aplica solo a LOCAL_DEV y solo al tooling L1-C01 preparado.

## Que se autoriza en la fase humana posterior

Se autoriza al humano, no a Codex, a ejecutar en LOCAL_DEV:

1. Precheck read-only.
2. Plan read-only.
3. Align human-only con mutacion gated, solo si el plan lo permite.
4. Postcheck read-only.

## Que NO se autoriza

- No prod.
- No staging.
- No DB/tooling ejecutado por Codex.
- No UI automation.
- No app server.
- No StudyLoad distinto de L1-C01.
- No StudentAccess mutation.
- No Program mutation.
- No enrollment mutation.
- No StudentProgramInstance mutation.
- No LearningCycle mutation.
- No approvalMetadata mutation.
- No registry mutation.
- No content mutation.
- No payment/subscription mutation.
- No automatic continuity.
- No second L1 StudyLoad.
- No product/student approval.

## Mutacion maxima autorizable

```text
L1-C01 StudyLoad only
```

Esta mutacion maxima solo puede ocurrir en la fase humana posterior, si precheck y plan son coherentes y no hay blockers.

## Comandos humanos exactos

Ejecutar desde:

```text
nextjs_space
```

PowerShell placeholder rule:

- No usar `<TARGET_STUDENT_EMAIL>` con signos `< >` en PowerShell.
- El humano debe reemplazar `TARGET_STUDENT_EMAIL` por el valor real localmente.
- El reporte no debe imprimir el identificador completo.
- No incluir email real en documentos, comandos pegados al reporte ni chat.

### 1. Precheck read-only

```text
npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts --mode l1-c01-access-precheck --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only --target-student-email TARGET_STUDENT_EMAIL
```

### 2. Plan read-only

```text
npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts --mode plan-l1-c01-access --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only --target-student-email TARGET_STUDENT_EMAIL
```

### 3. Align human-only, mutation gated

Ejecutar solo si el plan indica `scopeExpansionRequired=false`, no hay blockers, y `mutationRequired=true` / `wouldCreateStudyLoad=true` para L1-C01.

```text
npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts --mode align-l1-c01-access --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --target-student-email TARGET_STUDENT_EMAIL --execute-mutation --confirm-local-dev-mutation --confirm-l1-c01-access-only --confirm-no-payment --phase MVP-SALES-PILOT-L1-C01-LOCAL-DEV-ACCESS-HUMAN-ALIGNMENT-1
```

### 4. Postcheck read-only

```text
npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts --mode l1-c01-access-postcheck --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only --target-student-email TARGET_STUDENT_EMAIL
```

## Bloqueos obligatorios

El humano debe detenerse y no ejecutar align si:

- precheck falla.
- plan reporta `scopeExpansionRequired=true`.
- plan requiere StudentAccess/enrollment/program mutation.
- plan requiere approvalMetadata/registry/content mutation.
- plan no reconoce `l1_locating_information_pilot_set_01`.
- plan detecta existing L1-C01 StudyLoad y la operacion esperada era crear uno nuevo.
- cualquier output imprime DB URL, env value, secreto o identificador sensible.
- cualquier output toca prod/staging.
- cualquier output sugiere product/student approval.
- cualquier output sugiere continuity automatica.

## Evidencia sanitizada esperada

El humano debe pegar outputs sanitizados de:

1. precheck.
2. plan.
3. align, si se ejecuto.
4. postcheck.

La evidencia debe mostrar:

- `databaseUrlPresent` true/false sin valor.
- `databaseUrlValuePrinted` false.
- `targetStudentResolved` true/false.
- `targetStudentIdentifierPrinted` false.
- expected contentKey `l1_locating_information_pilot_set_01`.
- L1-C01 StudyLoad present/absent antes.
- `mutationRequired` true/false.
- `wouldCreateStudyLoad` true/false.
- align `dataMutated=true` solo si se crea StudyLoad.
- `mutationScope: L1-C01 StudyLoad only`.
- `studentAccessMutated=false`.
- `enrollmentMutated=false`.
- `programMutated=false`.
- `approvalMetadataMutated=false`.
- `registryMutated=false`.
- `paymentMutated=false`.
- `prodTouched=false`.
- `stagingTouched=false`.
- postcheck reachable true/false.
- `secretValuesPrinted=false`.

## Confirmaciones de esta fase

```text
Codex DB execution: NOT_EXECUTED_BY_CODEX
Codex LOCAL_DEV tooling execution: NOT_EXECUTED_BY_CODEX
Codex UI execution: NOT_EXECUTED_BY_CODEX
Data mutated by Codex: NO
Product code changed: NO
Pedagogical content changed: NO
Registry changed: NO
approvalMetadata changed: NO
Schema/migrations/seeds changed: NO
Secrets printed: NO
```

## Proxima fase exacta

```text
MVP-SALES-PILOT-L1-C01-LOCAL-DEV-ACCESS-HUMAN-ALIGNMENT-1
```

## Resultado esperado de proxima fase

```text
L1_C01_HUMAN_LOCAL_DEV_ALIGNMENT_READY_FOR_SMOKE
```
