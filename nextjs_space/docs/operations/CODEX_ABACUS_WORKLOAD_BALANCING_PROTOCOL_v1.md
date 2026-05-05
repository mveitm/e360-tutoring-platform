# CODEX_ABACUS_WORKLOAD_BALANCING_PROTOCOL_v1

## Propósito

Introducir Codex en el frente técnico de E360 / Bexauri de forma gradual, segura y costo-eficiente, sin comprometer custodia, producción, arquitectura ni el blueprint de largo plazo.

Codex entra inicialmente como:

```text
lector / auditor / preparador de contexto / preparador de prompts
```

No entra todavía como ejecutor principal de fases productivas.

---

## Punto técnico de entrada

Punto actual del proyecto:

```text
a5d657a — FL-UX-4J-F: complete Mauricio Cycle 3 StudyLoad
```

Estado funcional:

```text
FL-UX-4J-A → FL-UX-4J-F cerrado end-to-end.
Mauricio Beta-M1 / PAES_M1 Cycle 3 open.
StudyLoad completada.
8 respuestas MC guardadas.
Self-report: Me fue bien.
Sin CycleDecision.
Sin CycleEvaluation.
Sin cierre de Cycle 3.
Sin continuidad.
Sin Cycle 4.
```

Próximo paso técnico recomendado:

```text
FL-UX-5-A — Mauricio Cycle 3 admin evidence review readiness
```

Antes de ejecutar FL-UX-5-A, se introduce Codex con:

```text
CODEX-0 — Repo onboarding read-only
```

---

## Principio rector

```text
Codex reduce costo de contexto.
Abacus ejecuta cambios productivos sensibles por ahora.
ChatGPT/dirección decide estrategia, alcance y custodia.
Humano ejecuta acciones productivas sensibles cuando corresponda.
```

---

## Roles iniciales

### Codex — permitido inicialmente

Codex puede:

- leer el repo;
- mapear arquitectura;
- identificar rutas y componentes;
- resumir flujos;
- preparar checklists;
- preparar prompts para Abacus;
- revisar riesgos;
- sugerir fases;
- detectar zonas sensibles;
- preparar documentos no commiteados;
- proponer tests;
- proponer refactors de bajo riesgo, sin ejecutarlos todavía.

### Codex — prohibido inicialmente

Codex no debe:

- acceder a `.env`;
- leer secretos;
- usar SQL;
- usar psql;
- usar Prisma CLI;
- correr migraciones;
- correr `prisma db push`;
- ejecutar deploy;
- mutar producción;
- resetear passwords;
- cambiar auth/admin;
- tocar schema;
- cerrar ciclos reales;
- autorizar continuidad;
- crear CycleDecision productiva;
- crear CycleEvaluation productiva;
- tocar Test Now, Ana o Bruno;
- commitear directo a main sin revisión humana;
- crear artefactos `.docx`, PDFs operativos, `.logs`, `node_modules`, `yarn.lock`, `.next`, `.build`, `.deploy`.

---

## Roles de Abacus durante transición

Abacus sigue siendo principal para:

- fases productivas con mutación;
- deploy controlado;
- QA browser;
- operaciones que requieren ambiente Abacus;
- implementación delicada;
- auth/password/security;
- cambios que podrían impactar producción;
- operaciones con GitHub main, siempre bajo custodia.

Abacus puede recibir de Codex:

- mapas de archivos;
- checklists;
- prompts más precisos;
- expected diff;
- stop conditions;
- riesgos;
- rutas relevantes;
- criterios de aceptación.

---

## Tareas seguras para Codex en etapa 1

```text
CODEX-0 — Repo onboarding read-only.
CODEX-1 — FL-UX-5-A prep: admin evidence flow map.
CODEX-2 — Map StudyLoad/Response evidence surfaces.
CODEX-3 — Generate low-risk checklist for CycleDecision readiness.
CODEX-4 — Identify documentation gaps for beta paid readiness.
```

---

## Tareas que Codex NO debe ejecutar aún

```text
Deploy.
Schema.
Migrations.
DB push.
Production data mutation.
Auth/password changes.
Student account actions.
Cycle close.
Continuity authorization.
CycleDecision creation.
CycleEvaluation creation.
StudyLoad creation/edit/delete in production.
```

---

## Configuración de custodia recomendada

Antes de usar Codex:

1. Trabajar desde repo local limpio.
2. Confirmar:

```bash
git status
git log --oneline --decorate --graph -8
git ls-files "nextjs_space/docs/operations/*.pdf"
git ls-files ".logs"
git ls-files "nextjs_space/node_modules" "nextjs_space/yarn.lock"
git ls-files "*.docx"
```

3. Abrir Codex solo en modo tarea acotada.
4. No darle permisos para modificar archivos en CODEX-0.
5. No aceptar cambios sin revisión humana.
6. Si Codex crea archivos, revisarlos antes de commit.
7. Mantener Abacus para ejecución productiva hasta nueva decisión.

---

## Estructura de entrega esperada por Codex

Cada tarea Codex debe entregar:

```text
1. Summary.
2. Files inspected.
3. Findings.
4. Risks.
5. Suggested next phase.
6. Safe for Codex / Requires Abacus / Requires human.
7. No-actions confirmation.
```

---

## Regla de escalamiento

Una tarea puede pasar de Codex a Abacus solo si:

```text
- el alcance está claro;
- el expected diff está definido;
- los stop conditions están escritos;
- no hay necesidad de .env, SQL o producción directa;
- la dirección aprueba el paso.
```

---

## Regla de ahorro de costos

Codex debe usarse para reducir gasto de Abacus en:

- exploración del repo;
- lectura repetitiva;
- documentación de contexto;
- preparación de fases;
- checklist de QA;
- análisis de riesgos;
- redacción inicial de prompts.

Abacus debe reservarse para:

- ejecución donde el entorno Abacus aporta valor;
- deploy;
- browser QA;
- integración;
- cambios delicados;
- cierre operativo con evidencia.

---

## Decisión inicial

```text
Codex se introduce ahora, antes de FL-UX-5-A, con CODEX-0 read-only.
```

No reemplaza a Abacus todavía.
