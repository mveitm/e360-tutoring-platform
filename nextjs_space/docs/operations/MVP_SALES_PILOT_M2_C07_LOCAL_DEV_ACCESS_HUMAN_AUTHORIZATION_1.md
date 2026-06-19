# MVP-SALES-PILOT-M2-C07-LOCAL-DEV-ACCESS-HUMAN-AUTHORIZATION-1

## Phase name

MVP-SALES-PILOT-M2-C07-LOCAL-DEV-ACCESS-HUMAN-AUTHORIZATION-1

## Baseline inicial

```text
HEAD esperado = origin/main = c40cd1ac70258969f49a36abca80b0be5bc50c19
working tree expected = clean
```

## Objetivo

Preparar el paquete de autorizacion humana para ejecutar, en una fase posterior y solo por humano, el tooling seguro LOCAL_DEV de acceso/reachability M2-C07.

Esta fase no ejecuta tooling, no lee DB y no muta DB. Solo documenta modos disponibles, autorizacion requerida, secuencia humana permitida, evidencia esperada y limites de seguridad.

## Context Gate

Comandos ejecutados por Codex antes de editar:

```text
git status --short
git rev-parse HEAD
git log --oneline --decorate -n 5
```

Resultado:

```text
git status --short: clean
HEAD: c40cd1ac70258969f49a36abca80b0be5bc50c19
Baseline: MATCH
```

Ultimos commits observados:

```text
c40cd1a (HEAD -> main, origin/main, origin/HEAD) MVP-GOV-LOCAL-DEV-SAFE-DB-M2-C07-ACCESS-TOOLING-1: add M2 C07 safe access tooling
78e04e1 MVP-CONTENT-PAES-M2-C07-HUMAN-UI-SMOKE-READINESS-1: prepare M2 C07 smoke
8fb9f98 MVP-CONTENT-PAES-M2-C07-STATIC-REVIEW-1: review M2 C07
fd740dc MVP-CONTENT-PAES-M2-C07-AUTHORED-IMPLEMENT-1: implement M2 C07
73b13aa MVP-CONTENT-PAES-M2-C07-AUTHORED-READINESS-RETRY-1: specify M2 C07
```

## Alcance permitido

Archivos permitidos para modificar:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C07_LOCAL_DEV_ACCESS_HUMAN_AUTHORIZATION_1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

## Alcance prohibido

No se permite en esta fase:

- Ejecutar DB desde Codex.
- Mutar DB desde Codex.
- Ejecutar tooling LOCAL_DEV desde Codex.
- Ejecutar scripts que lean o escriban DB desde Codex.
- Imprimir secretos, env values, DB URLs ni valores sensibles.
- Tocar prod/staging.
- Modificar schema.
- Tocar payment/subscription.
- Tocar StudentAccess.
- Modificar codigo de app.
- Modificar tooling.
- Modificar UI.
- Modificar assets.
- Modificar contenido pedagogico implementado.
- Modificar authoredFeedback implementado.
- Crear datos.
- Modificar usuarios, estudiantes, enrollments, cycles ni StudyLoads.
- Ejecutar seeds, migrations, Prisma DB commands, SQL ni scripts equivalentes desde Codex.

## Archivos leidos

```text
nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_TOOLING_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_HUMAN_UI_SMOKE_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_STATIC_REVIEW_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C07_AUTHORED_IMPLEMENT_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C06_LOCAL_DEV_ACCESS_HUMAN_ALIGNMENT_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C06_LOCAL_DEV_ACCESS_HUMAN_AUTHORIZATION_1.md
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/scripts/local-dev-safe-db-tool.ts
```

Nota: `nextjs_space/scripts/local-dev-safe-db-tool.ts` fue inspeccionado estaticamente por busqueda/lectura textual para documentar modos y guardas. No fue ejecutado.

## Identidad M2-C07 documentada

```text
Program: PAES_M2
Capsule: M2-C07
Title: PAES M2 - Geometria con figura compuesta
contentKey: paes_m2_composite_geometry_figures_entry
Exercise count: 3
Representation strategy: text/table/list coordinate or geometry fallback; no assets/SVG/renderer.
```

## Tooling M2-C07 disponible

El tooling seguro LOCAL_DEV M2-C07 quedo documentado en la fase `MVP-GOV-LOCAL-DEV-SAFE-DB-M2-C07-ACCESS-TOOLING-1` como listo para uso humano posterior bajo autorizacion explicita.

Modos disponibles:

```text
m2-c07-access-precheck
plan-m2-c07-access
align-m2-c07-access
m2-c07-access-postcheck
--confirm-m2-c07-access-only
```

## Clasificacion de modos

| Modo | Lee DB si lo ejecuta humano | Muta DB | Human-only | Codex puede ejecutarlo | LOCAL_DEV guarded | Output sanitizado | Proposito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `m2-c07-access-precheck` | YES | NO | YES | NO | YES | YES | Verificar entorno, estudiante objetivo, estados M2 previos, existencia/estado de StudyLoad M2-C07 y reachability candidate sin mutar datos. |
| `plan-m2-c07-access` | YES | NO | YES | NO | YES | YES | Producir plan read-only: si se requiere mutacion, alcance esperado, blockers y safety checks. |
| `align-m2-c07-access --confirm-m2-c07-access-only` | YES | YES, solo si el humano lo ejecuta con guardas | YES | NO | YES | YES | Preparar exclusivamente StudyLoad M2-C07 si el plan confirma alcance C07-only y el humano acepta explicitamente. |
| `m2-c07-access-postcheck` | YES | NO | YES | NO | YES | YES | Confirmar StudyLoad M2-C07 presente, estado esperado para smoke, contentKey y reachable candidate sin mutar datos. |

## Frase exacta de autorizacion humana

La fase posterior de alineacion humana debe bloquearse si no recibe esta frase exacta como accion previa del humano:

```text
CONFIRMO_LOCAL_DEV_SEGURO_PARA_M2_C07_ACCESS_TOOLING_SIN_SECRETS
```

## Alcance de la autorizacion

La frase significa unicamente:

- El humano confirma que esta en LOCAL_DEV.
- El humano confirma que no esta apuntando a prod/staging.
- El humano acepta ejecutar solo los comandos seguros documentados.
- El humano no imprimira secretos, env values ni DB URLs.
- La ejecucion puede leer DB local/dev en modos `precheck`, `plan` y `postcheck`.
- La ejecucion puede mutar DB local/dev solo si se ejecuta explicitamente `align-m2-c07-access --confirm-m2-c07-access-only`.
- Cualquier mutacion queda limitada a `M2-C07 StudyLoad only`.
- Codex no queda autorizado a ejecutar DB ni tooling.

La frase no autoriza:

- Acceso a prod/staging.
- Impresion de secretos, env values o DB URLs.
- Mutaciones fuera de StudyLoad M2-C07.
- Mutaciones de StudentAccess, payment/subscription, User, Student, enrollment, StudentProgramInstance, LearningCycle, schema ni contenido pedagogico.
- Ejecucion de SQL, seeds, migrations o Prisma DB commands.
- Saltar directamente a `align` sin `precheck` y `plan`.
- Reutilizar tooling C06 para C07.

## Secuencia humana autorizable

Despues de entregar la frase exacta, la secuencia humana recomendada para una fase posterior es:

```text
1. m2-c07-access-precheck
2. plan-m2-c07-access
3. align-m2-c07-access --confirm-m2-c07-access-only
4. m2-c07-access-postcheck
```

Condiciones:

- No saltar directo a `align`.
- No ejecutar `align` si el `plan` no confirma mutacion `M2-C07 StudyLoad only`.
- No continuar si cualquier comando reporta entorno no seguro.
- No continuar si cualquier salida imprime secreto, env value o DB URL.
- Pegar al chat solo evidencia sanitizada.
- Reportar explicitamente DB execution by human y DB mutation by human en la fase posterior.

## Evidencia requerida del humano

Plantilla compacta para la fase posterior:

```text
M2-C07 LOCAL_DEV access tooling human run:
- Authorization phrase used:
- Environment confirmed as LOCAL_DEV:
- Commands executed:
- Precheck result:
- Plan result:
- Align executed:
- Align result:
- Postcheck result:
- M2-C07 StudyLoad status:
- M2-C07 contentKey observed:
- DB executed by human:
- DB mutated by human:
- Secrets printed:
- Blocking issues:
- Non-blocking observations:
```

Detalle minimo esperado por modo:

Precheck:

```text
- environment: LOCAL_DEV
- M2-C07 StudyLoad present/absent
- previous M2 StudyLoad states relevant to reachability
- blockers if any
```

Plan:

```text
- mutationRequired true/false
- expected mutation
- mutation scope
- blockers
- safety checks
```

Align:

```text
- executed by human
- confirmation flag used
- dataMutated true/false
- mutation scope
- blocked or completed
- no out-of-scope mutation
```

Postcheck:

```text
- M2-C07 StudyLoad present
- status
- type/mode
- contentKey
- reachable candidate true/false
- no secrets printed
```

## Observaciones heredadas no bloqueantes

- Login lands on LP before dashboard via "Iniciar".
- Next visible state/capsule was not detailed during M2-C04 smoke.
- Next visible state/capsule for M2-C05 was not detailed by human.
- En ST M2 falta contenedor de las 3 ultimas capsulas completadas; verificar comportamiento/paridad en M1.
- Revisar por que C05 y C06 tienen solo 3 ejercicios. Esta observacion no bloquea C07; el estandar vigente permite maximo 4 ejercicios M1/M2 y preferir 3 si cubre sin sobrecarga.

## Confirmaciones de seguridad

Codex confirma en esta fase:

```text
DB execution by Codex: NOT_EXECUTED_BY_CODEX
DB mutation by Codex: NOT_MUTATED_BY_CODEX
LOCAL_DEV tooling execution by Codex: NOT_EXECUTED_BY_CODEX
```

Tambien confirma:

- No se modifico codigo de app.
- No se modifico tooling.
- No se modifico schema.
- No se modifico UI.
- No se modificaron assets.
- No se modifico contenido pedagogico implementado.
- No se modifico authoredFeedback implementado.
- No se modifico payment/subscription.
- No se modifico StudentAccess.
- No se modificaron User/Student.
- No se modificaron enrollments, cycles ni StudyLoads.

## Validaciones ejecutadas

Validaciones seguras sin DB:

```text
git diff --check: passed
secret-pattern scan over modified files: passed
```

Resultado: passed.

## Resultado final

```text
M2_C07_HUMAN_AUTHORIZATION_PACKET_READY
```

## Estado final

Pendiente de commit/push al momento de redactar este informe. El estado final versionado se verifica despues de commit y push.

## Recomendacion de siguiente paso natural

```text
MVP-SALES-PILOT-M2-C07-LOCAL-DEV-ACCESS-HUMAN-ALIGNMENT-1
```

La siguiente fase debe bloquear hasta que el humano entregue la frase exacta y luego evidencia sanitizada de `precheck`, `plan`, `align` si corresponde, y `postcheck`.
