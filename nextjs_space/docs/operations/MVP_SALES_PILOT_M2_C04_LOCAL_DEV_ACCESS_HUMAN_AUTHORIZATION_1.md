# MVP-SALES-PILOT-M2-C04-LOCAL-DEV-ACCESS-HUMAN-AUTHORIZATION-1

## Phase name

```text
MVP-SALES-PILOT-M2-C04-LOCAL-DEV-ACCESS-HUMAN-AUTHORIZATION-1
```

## Baseline inicial

```text
HEAD = origin/main = origin/HEAD = 34c6e051e3229bfa2978d9e37fdb47e1e2e3e420
working tree clean
```

## Objetivo

Documentar el paquete de autorizacion humana requerido antes de que un humano ejecute en LOCAL_DEV los modos seguros de acceso/reachability de PAES_M2 / M2-C04.

Esta fase es documental/de autorizacion. No ejecuta tooling, no ejecuta DB, no muta DB y no cambia comportamiento de la app.

## Context Gate

Verificacion git segura ejecutada antes de editar:

```text
git status --short: clean
git rev-parse HEAD: 34c6e051e3229bfa2978d9e37fdb47e1e2e3e420
git log --oneline --decorate -n 5: baseline confirmado en HEAD, origin/main y origin/HEAD
```

Si el baseline no hubiera coincidido o el working tree no hubiera estado limpio, la fase se habria detenido sin editar.

## Alcance permitido/prohibido

Archivos permitidos para modificacion:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C04_LOCAL_DEV_ACCESS_HUMAN_AUTHORIZATION_1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

Alcance prohibido respetado:

```text
No DB execution by Codex
No DB mutation by Codex
No LOCAL_DEV tooling execution
No precheck execution
No plan execution
No align execution
No postcheck execution
No scripts that read DB executed
No scripts that write DB executed
No prod/staging
No schema changes
No payment/subscription changes
No StudentAccess changes
No app code changes
No tooling changes
No UI changes
No asset changes
No implemented pedagogical capsule content changes
No implemented authoredFeedback changes
No seeds
No migrations
No Prisma DB commands
No SQL
No secrets printed
```

## Archivos leidos

```text
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_TOOLING_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C04_LOCAL_DEV_ACCESS_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_HUMAN_UI_SMOKE_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_STATIC_REVIEW_1.md
nextjs_space/scripts/local-dev-safe-db-tool.ts
```

## Tooling M2-C04 disponible

Static inspection confirmed these real M2-C04 modes in `nextjs_space/scripts/local-dev-safe-db-tool.ts`:

```text
m2-c04-access-precheck
plan-m2-c04-access
align-m2-c04-access
m2-c04-access-postcheck
--confirm-m2-c04-access-only
```

Expected capsule identity:

```text
Capsule: M2-C04
Title: PAES M2 - Geometria analitica y relaciones
contentKey: paes_m2_analytic_geometry_relations_entry
```

## Clasificacion de modos

| Mode | Reads DB | Mutates DB | Human-only | Codex allowed to execute | LOCAL_DEV guarded | Sanitized output | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `m2-c04-access-precheck` | YES | NO | YES | NO | YES | YES | Confirm current LOCAL_DEV M2-C04 access state before any mutation. |
| `plan-m2-c04-access` | YES | NO | YES | NO | YES | YES | Determine whether M2-C04 StudyLoad creation/alignment is needed and whether blockers exist. |
| `align-m2-c04-access` | YES | YES, only if full guards and `--execute-mutation` are provided | YES | NO | YES | YES | Create/align M2-C04 StudyLoad only in LOCAL_DEV if plan requires it and human authorizes it. |
| `m2-c04-access-postcheck` | YES | NO | YES | NO | YES | YES | Confirm final LOCAL_DEV M2-C04 access/reachability state after any human-local action. |

The C04 mutating mode requires:

```text
--target-class LOCAL_DEV_CONFIRMED
--confirm-no-production
--confirm-no-staging
--confirm-local-dev-mutation
--confirm-m2-c04-access-only
--confirm-no-payment
--phase <authorized phase>
--execute-mutation
--target-student-email <target>
```

The C04 read-only modes require:

```text
--target-class LOCAL_DEV_CONFIRMED
--confirm-no-production
--confirm-no-staging
--confirm-read-only
--target-student-email <target>
```

## Frase exacta de autorizacion humana

The next human-local execution phase must be preceded by this explicit phrase in chat:

```text
CONFIRMO_LOCAL_DEV_SEGURO_PARA_M2_C04_ACCESS_TOOLING_SIN_SECRETS
```

## Alcance de la autorizacion

This authorization means only:

- The human confirms the environment is LOCAL_DEV.
- The human confirms commands are not pointed to production or staging.
- The human accepts executing only documented safe commands.
- The human will not print secrets, env values, DB URLs, connection strings, credentials, tokens or cookies.
- The execution may read LOCAL_DEV DB in precheck/plan/postcheck modes.
- The execution may mutate LOCAL_DEV DB only if `align-m2-c04-access` is explicitly run with all required guards and only after the plan confirms intended C04-only mutation.
- Codex does not execute DB commands or DB tooling.
- Codex does not mutate DB.

The authorization does not permit:

- Prod/staging access.
- Secret printing.
- Schema or migration changes.
- Payment/subscription changes.
- StudentAccess changes.
- Manual SQL.
- Seeds.
- Prisma DB commands.
- Reusing C03 tooling for C04.
- Skipping precheck/plan before align.

## Secuencia humana recomendada

Recommended sequence for the later human-local phase:

```text
1. precheck confirm-only
2. plan
3. align only if plan confirms intended C04-only mutation and human accepts
4. postcheck
```

Operational rules:

- Do not skip directly to align.
- Do not use C03 tooling for C04.
- Stop if any command reports unsafe environment, production/staging risk, missing guards, scope expansion, missing prerequisites or unexpected mutation target.
- Paste only sanitized output into chat.
- Report `DB executed by human` and `DB mutated by human` in the later phase evidence.

## Plantilla de reporte humano posterior

```text
M2-C04 LOCAL_DEV access tooling human run:
- Authorization phrase used:
- Environment confirmed as LOCAL_DEV:
- Commands executed:
- Precheck result:
- Plan result:
- Align executed:
- Align result:
- Postcheck result:
- M2-C04 StudyLoad status:
- M2-C04 contentKey observed:
- DB executed by human:
- DB mutated by human:
- Secrets printed:
- Blocking issues:
- Non-blocking observations:
```

## Observacion heredada de login

```text
Login lleva a LP en vez de DB, pero botón “Iniciar” de LP lleva correctamente al dashboard del usuario.
```

This remains non-blocking for access authorization. It must be re-observed only if it blocks a later human UI smoke.

## Validacion

Validation executed:

```text
git diff --check
secret-pattern scan over modified files
```

Results:

```text
git diff --check: passed
secret-pattern scan: passed
```

No build was executed because this phase changed documentation only. No DB command, DB-reading script, DB-writing script or LOCAL_DEV tooling mode was executed.

## Security notes

- DB execution by Codex: NOT_EXECUTED_BY_CODEX.
- DB mutation by Codex: NOT_EXECUTED_BY_CODEX.
- LOCAL_DEV tooling execution by Codex: NOT_EXECUTED_BY_CODEX.
- No secrets were printed.
- No production/staging action was performed.

## Explicit non-changes

- Code changes: NOT_PERFORMED.
- Tooling changes: NOT_PERFORMED.
- Schema changes: NOT_PERFORMED.
- UI changes: NOT_PERFORMED.
- Asset changes: NOT_PERFORMED.
- Pedagogical capsule content changes: NOT_PERFORMED.
- AuthoredFeedback changes: NOT_PERFORMED.
- Payment/subscription changes: NOT_PERFORMED.
- StudentAccess changes: NOT_PERFORMED.

## Estado final

The M2-C04 human authorization packet is ready. A later phase may request the explicit authorization phrase and guide human-local execution of precheck, plan, optional align and postcheck with sanitized evidence.

## Result

```text
M2_C04_HUMAN_AUTHORIZATION_PACKET_READY
```

## Follow-up/blocker

```text
MVP-SALES-PILOT-M2-C04-LOCAL-DEV-ACCESS-HUMAN-ALIGNMENT-1
```

