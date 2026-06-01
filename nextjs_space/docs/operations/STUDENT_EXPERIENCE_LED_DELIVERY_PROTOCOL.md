# Student Experience–Led Delivery Protocol — E360 / Bexauri

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Status

ACTIVE

## Purpose

Reorientar el desarrollo de Bexauri desde un enfoque principalmente bottom-up por blockers tecnicos hacia un enfoque top-down guiado por entregables concretos de experiencia estudiante.

El objetivo es que la app crezca en:

* operatividad real para el estudiante;
* capa pedagogica visible en UI;
* continuidad de aprendizaje;
* evidencia funcional/pedagogica util;
* avance directo hacia MVP-Beta cerrado M1/M2/L1.

## Executive rule

Mauricio define el entregable diario o de bloque en terminos de experiencia estudiante. ChatGPT/Ampliado lo descompone en las pocas microfases seguras necesarias. Codex ejecuta. Toda microfase debe tributar directamente al entregable UI/operativo/pedagogico del dia o desbloquearlo.

## Methodological hierarchy

1. Student Experience-Led Delivery manda la secuencia del roadmap operativo.
2. Bottom-up technical work queda subordinado: solo se ejecuta cuando desbloquea el entregable de experiencia o protege limites estructurales.
3. Phase Scope Optimization Protocol regula el tamano seguro de cada fase.
4. HYBRID_DIRECTION_WITH_PHASED_GATES protege limites estrategicos y evita claims prematuros.

## Why this protocol exists

El enfoque bottom-up estabilizo custodia, Git, fixture, login, `/now`, ciclos y evidencia.

Pero ese enfoque tambien produjo muchas fases pequenas alrededor de puertas de entrada. Eso ralentizo el PACE hacia MVP y algunas fases tributaron poco a operatividad o pedagogia visible. La app debe crecer ahora en experiencia real de estudiante.

## Principles

1. La experiencia estudiante manda la secuencia.
2. La UI debe expresar la pedagogia, no solo alojarla.
3. Cada fase debe tributar a un entregable observable.
4. Los blockers tecnicos se priorizan segun impacto en experiencia.
5. El alcance seguro mas amplio sigue siendo la regla.
6. Los limites estructurales no se negocian.
7. La prueba manual ficticia es evidencia de producto, no claim comercial.
8. La pedagogia debe revisarse en pantalla, no solo en datos.
9. M1-first sigue siendo tactico dentro del MVP-Beta cerrado M1/M2/L1.
10. PRO audita cambios metodologicos; Ampliado orquesta; Codex ejecuta.

## Workflow

1. Mauricio define la fase del dia como experiencia estudiante.
2. ChatGPT/Ampliado traduce la experiencia en microfases seguras.
3. Cada microfase se clasifica por Phase Scope Optimization Protocol.
4. Codex ejecuta con Git preflight y documentacion.
5. Mauricio observa experiencia real cuando corresponde.
6. ChatGPT consolida aprendizajes y siguiente frontera.
7. PRO se usa para auditorias de direccion, no para cada bug.

## Roles

### Mauricio

Define el objetivo observable de experiencia estudiante y evalua valor funcional/pedagogico.

### ChatGPT/Ampliado

Orquesta roadmap, descompone entregables en microfases, redacta prompts, controla limites y consolida decisiones.

### Codex

Ejecuta cambios, verificaciones, documentacion, commits y pushes bajo prompts acotados.

### PRO

Audita metodologia, roadmap, riesgos de producto y decisiones estrategicas cuando corresponde.

## How Mauricio defines the daily student-experience deliverable

```text
FASE DEL DIA - EXPERIENCIA ESTUDIANTE

Objetivo observable:
[que debe poder hacer/vivir el estudiante]

Usuario:
[estudiante ficticio / admin / tutor / combinacion]

Inicio:
[desde donde parte: signup, login, /now, actividad, feedback, dashboard]

Final esperado:
[donde termina: actividad abierta, carga completada, feedback visto, siguiente carga disponible, etc.]

Criterios de aceptacion:
[3-7 senales visibles de exito]

Dimension pedagogica a revisar:
[claridad, dificultad, feedback, continuidad, pertinencia PAES_M1, progreso]

Fuera de alcance:
[que no se debe tocar o declarar]

Riesgo maximo aceptado:
[solo UI, StudyLoad execution, respuestas, continuidad, etc.]
```

## Good deliverable examples

1. "Un estudiante ficticio crea cuenta y llega a su primera actividad M1 entendiendo que hacer."
2. "El estudiante responde una carga M1 y recibe feedback breve y completo."
3. "El estudiante completa una carga y ve claramente que viene despues."
4. "El estudiante avanza desde carga 1 hasta carga 3 sin intervencion admin."
5. "El estudiante llega a StudyLoad 10 con una secuencia pedagogica coherente."
6. "El estudiante ve progreso, evidencia y orientacion pedagogica en su dashboard."
7. "El tutor/admin puede revisar evidencia suficiente sin ser cuello de botella."

## Bad deliverable examples

* "Arreglar el sistema de estudiantes."
* "Mejorar backend."
* "Revisar cosas de ciclo."
* "Probar login otra vez."
* "Hacer mas sandbox."

Son malos porque no definen experiencia observable, usuario, inicio, final esperado ni criterios de aceptacion.

## Acceptance criteria for a good UI/experience driver

Un entregable debe ser:

* observable en pantalla;
* ejecutable por estudiante ficticio;
* conectado al hito M1;
* evaluable funcionalmente;
* evaluable pedagogicamente;
* acotado a un recorrido;
* suficientemente grande para tributar al MVP;
* suficientemente seguro para dividirse en microfases.

## How ChatGPT/Ampliado decomposes the daily phase

Reglas:

* no crear microfase si no reduce riesgo estructural ni produce avance observable hacia el entregable UI del dia;
* fusionar diagnostico + reparacion + verificacion si es local, reversible y no cruza limites;
* separar cuando se cruza frontera funcional real;
* cada microfase debe declarar a que entregable tributa;
* cada microfase debe aplicar `PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md`.

## When to split phases

Separar cuando:

* se pasa de visibilidad a ejecucion;
* se presiona `Empezar`;
* se envian respuestas;
* se completa StudyLoad;
* se genera continuidad;
* se toca StudentAccess;
* se cambia auth architecture;
* se toca schema/DB estructural;
* se involucran humanos reales externos;
* se toca staging/production.

## Non-negotiable structural boundaries

Mantener:

* secrets: password, hash, token, cookie, env, DB URL, headers, sensitive request/response body, storage values;
* schema/migrations;
* structural DB mutation;
* auth architecture/provider/session changes;
* StudentAccess lifecycle;
* StudyLoad execution unless explicitly part of the current top-down deliverable;
* `Empezar` unless explicitly authorized;
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
* MVP-Beta cerrado completo;
* broad redesign.

## Friday manual M1 test application

Near-term milestone:

Mauricio ejecutara una prueba manual completa M1 con estudiante ficticio desde creacion de cuenta hasta StudyLoad 10.

Roadmap inmediato recomendado:

1. GOV-3 - Document Student Experience-Led Delivery Protocol.
2. FRIDAY-TEST-1 - Prepare full M1 student experience runbook to StudyLoad 10.
3. FRIDAY-TEST-2 - Verify M1 continuity/content readiness to StudyLoad 10.
4. FRIDAY-TEST-3 - Execute controlled first StudyLoad experience.
5. FRIDAY-TEST-4 - Execute or rehearse path from StudyLoad 1 to StudyLoad 10.

Ready before Friday:

* login/signup operativo;
* `/now` funcional;
* primera StudyLoad ejecutable;
* feedback visible o documentado;
* continuidad entre cargas;
* contenido suficiente hasta carga 10;
* runbook de prueba;
* pauta pedagogica;
* pauta de evidencia;
* criterio de bloqueo;
* mecanismo para registrar hallazgos.

Not yet:

* Sales-Ready;
* MVP-Beta cerrado completo;
* L1/M2 readiness;
* payment/trial/subscription;
* external human participants;
* staging/production;
* broad redesign not tied to Friday experience.

## Standard prompt clause

```text
Read and apply:
nextjs_space/docs/operations/PHASE_SCOPE_OPTIMIZATION_PROTOCOL.md
nextjs_space/docs/operations/STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL.md

Mauricio defines the student-experience deliverable. ChatGPT/Ampliado decomposes it into the fewest safe microphases. Codex executes. Every microphase must directly support the UI/operational/pedagogical experience target or remove a blocker to it. Bottom-up technical work is allowed only when it unlocks that target or protects structural boundaries.
```

## Executive version

Roadmap sequencing is driven by student-experience deliverables defined by Mauricio.

Each day or work block starts with a concrete UI/operational/pedagogical experience: what the fictitious student should be able to do, see, understand, complete, or learn.

ChatGPT/Ampliado decomposes that target into the fewest safe microphases. Codex executes those phases. Every phase must directly support the experience target or remove a blocker to it.

Bottom-up technical work remains allowed, but only when it unlocks the current experience deliverable or protects structural boundaries.

Use Phase Scope Optimization Protocol: widest safe phase scope, not narrowest by default.

The app must grow in real student operability and visible pedagogical value, not only in internal control.

## Result marker

```text
STUDENT_EXPERIENCE_LED_DELIVERY_PROTOCOL_DOCUMENTED_AND_ACTIVE
```
