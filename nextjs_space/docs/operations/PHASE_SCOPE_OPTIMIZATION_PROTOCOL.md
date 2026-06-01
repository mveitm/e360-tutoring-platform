# Phase Scope Optimization Protocol - E360 / Bexauri

## Status

```text
ACTIVE
```

## Purpose

Reducir friccion, costo y demora de fases ChatGPT/Codex sin perder custodia sobre secretos, DB, schema, produccion, auth sensible, StudentAccess, StudyLoad execution, datos reales, pagos/trial/suscripcion ni roadmap.

## Executive Rule

Cada fase debe usar el alcance mas amplio posible dentro de un riesgo controlado, no el alcance mas pequeno posible por defecto.

## Operating Question

Reemplazar:

```text
Como divido esto en la menor accion posible?
```

por:

```text
Que conjunto de acciones puede ejecutarse de forma segura, verificable y reversible en una sola fase sin cruzar limites estructurales?
```

## Principles

1. Alcance maximo seguro.
2. Pertinencia antes que ritual.
3. Seguridad estructural, no microcustodia automatica.
4. Diagnostico primero, reparacion condicionada.
5. Reparacion menor autorizable por defecto para bugs locales y reversibles.
6. Autorizacion separada solo para fronteras funcionales reales.
7. Git como mecanismo de reversibilidad.
8. Stop conditions proporcionales.
9. Documentacion viva, no ornamental.
10. Roadmap manda sobre ansiedad operativa.

## Phase Taxonomy

### Level A - Decision / Documentation / Governance

Uso:

* estrategia;
* protocolo;
* roadmap;
* autorizacion;
* definicion de gates.

No usar para bloquear fixes tecnicos menores ya claros.

### Level B - Diagnosis Only

Uso:

* causa desconocida;
* posible DB/schema;
* posible secreto;
* posible auth architecture;
* posible staging/production;
* posible datos reales;
* posible StudentAccess;
* posible StudyLoad execution;
* reparacion no acotada.

### Level C - Diagnosis + Minor Safe Repair

Default para blockers tecnicos menores.

Permitido si:

* causa clara o razonablemente aislable;
* cambio pequeno;
* cambio localizado;
* rollback simple via Git;
* verificacion local posible;
* sin schema;
* sin migracion;
* sin DB mutation estructural;
* sin secretos;
* sin staging/production;
* sin datos reales;
* sin StudentAccess lifecycle;
* sin StudyLoad execution;
* sin rediseno auth.

### Level D - Standard Implementation

Uso:

* cambio funcional aprobado;
* app code;
* tests/build;
* documentacion;
* commit/push.

No incluye sin autorizacion separada:

* schema;
* produccion/staging;
* datos reales;
* auth architecture;
* pagos;
* StudyLoad execution;
* StudentAccess lifecycle.

### Level E - Protected Structural Phase

Uso si toca:

* schema;
* migrations;
* structural DB mutation;
* auth architecture;
* password/hash/credential internals;
* StudentAccess lifecycle;
* StudyLoad execution;
* responses;
* completion;
* continuity;
* staging/production;
* real data;
* payment/trial/subscription;
* L1/M2 readiness;
* broad redesign.

## Scope Fusion Rules

### Combine Diagnosis + Repair When

* el problema esta acotado;
* diagnostico sin secretos;
* reparacion pequena y localizada;
* reversible via Git;
* sin DB/schema;
* sin staging/production;
* sin StudyLoad execution;
* sin StudentAccess;
* verificacion local y segura.

### Combine Repair + Verification When

* la verificacion no cruza una frontera funcional nueva;
* no crea datos sensibles;
* no inicia StudyLoad;
* no envia respuestas;
* no toca staging/production;
* confirma exactamente el objetivo del fix.

### Keep Authorization Separate When

* se cruza de visibilidad a ejecucion;
* se inicia StudyLoad;
* se envian respuestas;
* se completa una carga;
* se genera continuidad;
* se crea/modifica StudentAccess;
* se toca staging/production;
* hay humanos reales;
* hay schema o DB estructural;
* se altera auth architecture;
* hay pagos/trial/subscription.

## Non-Negotiable Structural Boundaries

Estos limites requieren fase separada o autorizacion explicita:

* secrets: password, hash, token, cookie, env, DB URL, headers, sensitive request/response body, storage values;
* schema/migrations;
* structural DB mutation;
* direct credential manipulation outside safe/private flow;
* auth architecture/provider/session changes;
* StudentAccess lifecycle;
* StudyLoad execution;
* Empezar;
* responses;
* submit;
* self-report;
* completion;
* second StudyLoad;
* ContinuitySignal;
* L1/M2 readiness;
* payment/trial/subscription;
* staging/production;
* real data;
* external human participants;
* Sales-Ready;
* MVP-Beta cerrado completo.

## Standard Prompt Clauses

### Optimized Scope Clause

```text
Apply the Phase Scope Optimization Protocol.

Diagnose first. If the cause is clear or reasonably isolated, and the repair is minor, local, reversible via Git, and does not cross structural boundaries, apply the repair in this same phase.

Do not split diagnosis and repair only for process reasons. Split or stop only if the repair requires schema, migration, structural DB mutation, secrets, staging/production, real user data, auth architecture changes, StudentAccess lifecycle, StudyLoad execution, payment/trial/subscription, L1/M2 readiness, broad redesign, or any action outside this phase boundary.
```

### Stop Conditions Clause

```text
Stop immediately if:

* Git baseline diverges.
* Working tree is dirty at preflight.
* LOCAL_DEV cannot be confirmed safely when required.
* Any secret/env/DB URL/hash/token/cookie/header/request-response body/storage value would be printed or inspected.
* The repair requires schema, migration, structural DB mutation, auth architecture change, staging/production, real data, StudentAccess lifecycle, StudyLoad execution, responses, completion, payment/trial/subscription, L1/M2, or broad redesign.
* The issue is no longer minor/local/reversible.
```

### Reporting Clause

```text
Report:

* phase level used: A/B/C/D/E;
* why this level was appropriate;
* diagnosis;
* repair decision;
* repair applied or deferred;
* verification performed;
* structural boundaries not crossed;
* residual risk;
* next recommended phase.
```

## Application To Current Case

0M-DATA should resume as Level C conditioned:

```text
Data/custody repair + login visibility verification.
```

Allowed:

* re-apply private credential through safe admin-local route;
* exact human confirmation;
* credentialReady boolean verification;
* manual private login;
* open `/now`;
* verify synthetic identity;
* verify `PAES_M1`;
* verify initial StudyLoad visible;
* sanitized evidence.

Not allowed:

* password/hash printing;
* env/DB URL inspection;
* undocumented direct SQL;
* schema;
* auth redesign;
* app code;
* StudentAccess;
* Empezar;
* responses;
* submit;
* self-report;
* completion;
* second StudyLoad;
* staging/production.

Expected result:

```text
CREDENTIAL_REAPPLIED_AND_LOGIN_VISIBILITY_PASSED_WITHOUT_STUDYLOAD_EXECUTION
```

If login still fails:

```text
CREDENTIAL_REAPPLIED_LOGIN_STILL_FAILED
```

## Handoff Instruction

In future prompts and chat changes, include:

```text
Phase Scope Optimization Protocol active:
Use the widest safe phase scope, not the narrowest possible scope by default.
Default to diagnosis + minor safe repair + local verification for local reversible issues.
Separate phases only for structural boundaries: secrets, schema, structural DB mutation, auth architecture, StudentAccess, StudyLoad execution, production/staging, real data, payments, L1/M2, broad redesign.
```

## Result Marker

```text
PHASE_SCOPE_OPTIMIZATION_PROTOCOL_DOCUMENTED_AND_ACTIVE
```
