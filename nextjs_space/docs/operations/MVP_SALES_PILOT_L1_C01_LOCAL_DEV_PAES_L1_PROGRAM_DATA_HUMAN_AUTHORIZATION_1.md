# MVP-SALES-PILOT-L1-C01-LOCAL-DEV-PAES-L1-PROGRAM-DATA-HUMAN-AUTHORIZATION-1

## Phase

`MVP-SALES-PILOT-L1-C01-LOCAL-DEV-PAES-L1-PROGRAM-DATA-HUMAN-AUTHORIZATION-1`

## Result

`PAES_L1_PROGRAM_DATA_HUMAN_AUTHORIZATION_PACKET_READY`

## Baseline validado

```text
HEAD = origin/main = 598d5860f70ec6147e30c4c86f21521da252d15f
working tree clean
```

## Archivos leidos

- `PHASE_LOG.md`.
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`.
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_PAES_L1_PROGRAM_ALIGNMENT_TOOLING_1.md`.
- `nextjs_space/scripts/local-dev-safe-db-tool.ts`.
- `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_L1_INTEGRADO.md`.
- `nextjs_space/docs/operations/BPCPV1_PAES_L1_PRECONTRACT.md`.
- `nextjs_space/docs/operations/BPCPV1_PAES_L1_DERIVATION_GOVERNING_DOCUMENT.md`.
- `nextjs_space/docs/operations/PAES_L1_PEDAGOGICAL_BRANCH_INDEX.md`.
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_L1_APPROVAL_CONTINUITY_GUARDRAILS_1.md`.
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_L1_STATIC_REVIEW_1.md`.
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_L1_HUMAN_UI_SMOKE_READINESS_1.md`.
- `nextjs_space/docs/operations/MVP_SALES_PILOT_L1_C01_LOCAL_DEV_ACCESS_HUMAN_AUTHORIZATION_1.md`.

## Contexto del bloqueo previo

Durante la ejecucion humana read-only de L1-C01 access tooling:

```text
precheck read-only: passed
plan read-only:
  Program PAES_L1 present: false
  missingCompatibleProgram: true
  scopeExpansionRequired: true
align L1-C01: NOT_EXECUTED
previous authorization scope: L1_C01_STUDYLOAD_ONLY
block: BLOCKED_SCOPE_EXPANSION_REQUIRED_MISSING_PAES_L1_PROGRAM
```

La autorizacion anterior bloqueo correctamente porque no cubria `Program PAES_L1`.

## Tooling detectado

Tooling seguro disponible en `nextjs_space/scripts/local-dev-safe-db-tool.ts`:

```text
paes-l1-program-precheck
plan-paes-l1-program
align-paes-l1-program
paes-l1-program-postcheck
```

El tooling fue verificado por lectura estatica. Codex no ejecuto ningun modo.

## Program target

```text
code: PAES_L1
name: PAES Competencia Lectora
vertical: PAES
status: active
```

Alcance semantico: `status: active` significa disponibilidad tecnica interna del programa en LOCAL_DEV. No significa aprobacion de uso de estudiante, aprobacion de producto, readiness L1, cobertura completa, Sales-Ready ni continuidad automatica.

## Confirmacion humana exacta

Antes de ejecutar tooling Program PAES_L1, el humano debe entregar exactamente:

```text
AUTORIZO_ALINEAR_PROGRAM_PAES_L1_LOCAL_DEV_BAJO_CONTRATO_PEDAGOGICO_ACEPTADO_SIN_PROD_SIN_STAGING_SIN_SECRETOS_SIN_SCHEMA_SIN_RESET_SIN_ENROLLMENT
```

La autorizacion aplica solo a LOCAL_DEV y solo al tooling Program PAES_L1 preparado.

## Que se autoriza

En la fase humana posterior se autoriza:

- Ejecutar precheck read-only de Program PAES_L1.
- Ejecutar plan read-only de Program PAES_L1.
- Ejecutar align human-only, mutation gated, solo si precheck/plan no reportan blockers.
- Ejecutar postcheck read-only de Program PAES_L1.
- Crear `Program PAES_L1` si falta.
- Alinear solo metadata `name`, `vertical` y `status` si existe con valores distintos.

## Que NO se autoriza

No se autoriza:

- StudentAccess mutation.
- Enrollment mutation.
- StudentProgramInstance mutation.
- LearningCycle mutation.
- StudyLoad mutation.
- Axis mutation.
- Skill mutation.
- approvalMetadata mutation.
- registry mutation.
- content mutation.
- payment/subscription mutation.
- prod/staging operation.
- automatic continuity.
- second L1 StudyLoad.
- product/student approval.
- schema, migration, seed, reset o app server.

## Mutacion maxima autorizable

```text
PROGRAM_PAES_L1_ONLY
```

Equivalente operativo en output del tooling:

```text
mutationScope: Program PAES_L1 only
```

## Comandos humanos exactos

Ejecutar desde `nextjs_space` con entorno LOCAL_DEV seguro. No ejecutar desde prod/staging.

### 1. Program PAES_L1 precheck read-only

```text
npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts --mode paes-l1-program-precheck --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only
```

### 2. Program PAES_L1 plan read-only

```text
npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts --mode plan-paes-l1-program --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only
```

### 3. Program PAES_L1 align human-only, mutation gated

Ejecutar solo si precheck y plan completan sin blockers, `scopeExpansionRequired=false`, y el plan limita la mutacion a Program PAES_L1.

```text
npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts --mode align-paes-l1-program --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --execute-mutation --confirm-local-dev-mutation --confirm-paes-l1-program-only --confirm-no-enrollment --confirm-no-payment --phase MVP-SALES-PILOT-L1-C01-LOCAL-DEV-PAES-L1-PROGRAM-DATA-HUMAN-ALIGNMENT-1
```

### 4. Program PAES_L1 postcheck read-only

```text
npx tsx --require dotenv/config scripts/local-dev-safe-db-tool.ts --mode paes-l1-program-postcheck --target-class LOCAL_DEV_CONFIRMED --confirm-no-production --confirm-no-staging --confirm-read-only
```

## Bloqueos obligatorios

El humano debe detenerse y no ejecutar align si:

- Precheck falla.
- Plan reporta `scopeExpansionRequired=true`.
- Plan requiere StudentAccess, enrollment, SPI, cycle o StudyLoad mutation.
- Plan requiere Axis o Skill mutation.
- Plan requiere approvalMetadata, registry o content mutation.
- Plan requiere payment/subscription.
- Plan no reconoce metadata esperada para `Program PAES_L1`.
- Cualquier output imprime DB URL, env value, secreto o identificador sensible.
- Cualquier output toca prod/staging.
- Cualquier output sugiere product/student approval.
- Cualquier output sugiere continuidad automatica.

## Evidencia sanitizada que debe volver al chat

El humano debe pegar solo outputs sanitizados de:

1. precheck;
2. plan;
3. align, si se ejecuto;
4. postcheck.

La evidencia debe mostrar:

- `databaseUrlPresent` true/false sin valor.
- `databaseUrlValuePrinted=false`.
- `dataMutated=false` para precheck/plan/postcheck.
- `programPresent` true/false para PAES_L1.
- expected metadata: `code=PAES_L1`, `name=PAES Competencia Lectora`, `vertical=PAES`, `status=active`.
- `mutationRequired` true/false.
- `wouldCreateProgram` true/false.
- `wouldAlignProgramMetadata` true/false.
- `scopeExpansionRequired=false`.
- align `dataMutated=true` solo si se crea/alinea Program.
- `mutationScope=Program PAES_L1 only`.
- `enrollmentMutated=false`.
- `studentAccessMutated=false`.
- `studentProgramInstanceMutated=false`.
- `learningCycleMutated=false`.
- `studyLoadMutated=false`.
- `axisMutated=false`.
- `skillMutated=false`.
- `approvalMetadataMutated=false`.
- `registryMutated=false`.
- `paymentMutated=false`.
- `prodTouched=false`.
- `stagingTouched=false`.
- `secretValuesPrinted=false`.

## Confirmaciones de seguridad

```text
Codex DB execution: NOT_EXECUTED_BY_CODEX
Codex LOCAL_DEV tooling execution: NOT_EXECUTED_BY_CODEX
Codex UI execution: NOT_EXECUTED_BY_CODEX
Data mutated by Codex: NO
Tooling changed: NO
Product code changed: NO
Pedagogical content changed: NO
Registry changed: NO
approvalMetadata changed: NO
Schema/migrations/seeds changed: NO
Secrets printed: NO
```

## Proxima fase exacta

```text
MVP-SALES-PILOT-L1-C01-LOCAL-DEV-PAES-L1-PROGRAM-DATA-HUMAN-ALIGNMENT-1
```

## Resultado esperado de la proxima fase

```text
PAES_L1_PROGRAM_LOCAL_DEV_HUMAN_ALIGNED
```
