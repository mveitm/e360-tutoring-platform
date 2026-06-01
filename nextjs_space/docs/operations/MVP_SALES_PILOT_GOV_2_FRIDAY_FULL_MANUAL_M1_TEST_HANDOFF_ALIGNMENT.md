# MVP-SALES-PILOT-GOV-2 - Friday Full Manual M1 Test Handoff Alignment

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Status

Documented / Active

## Friday test objective

Mauricio ejecutara una prueba manual completa con estudiante ficticio, desde crear cuenta hasta carga 10 en PAES_M1.

## Test scope

* Crear cuenta.
* Login.
* Acceso a /now.
* Ejecucion sucesiva de cargas M1 hasta carga 10.
* Revision de funcionalidad.
* Revision de pertinencia de cargas.
* Revision de calidad de capa pedagogica.

## Not a commercial readiness declaration

Este hito no declara:

* no Sales-Ready;
* no MVP-Beta cerrado completo;
* no L1 readiness;
* no M2 readiness;
* no pago/trial/suscripcion activa;
* no piloto publico.

## Immediate blockers

* Core login/UI blocker debe resolverse antes.
* Signup/login debe funcionar.
* /now debe estar disponible.
* Continuidad M1 debe sostener avance hasta carga 10.

## Micro-roadmap toward Friday

1. Repair core login/UI blocker.
2. Verify signup/login/admin/student access.
3. Verify M1 /now visibility.
4. Verify or prepare M1 continuity to at least 10 loads.
5. Prepare Friday manual test runbook.
6. Execute Friday full manual M1 test.
7. Produce post-test functional and pedagogical findings.

## Evidence to collect on Friday

* Screens/routes observed, sanitized.
* Cuenta creada correctamente.
* Carga numero y titulo.
* Estado de cada carga.
* Respuestas enviadas.
* Feedback visible.
* Problemas funcionales.
* Pertinencia de carga.
* Calidad pedagogica.
* Fricciones UX.
* Errores/bloqueos.
* Observaciones de mejora.

## Pedagogical review dimensions

* Secuencia de dificultad.
* Coherencia entre cargas.
* Claridad de instrucciones.
* Calidad de feedback breve/completo si aparece.
* Relevancia PAES_M1.
* Capacidad de orientar aprendizaje.
* Sensacion de progreso del estudiante.
* Riesgos de repeticion o contenido debil.

## Handoff instruction

```text
Friday full manual M1 test is the near-term operational milestone. Prioritize resolving blockers required for Mauricio to execute a fictitious-student journey from account creation to StudyLoad 10 in PAES_M1. Do not declare Sales-Ready or MVP-Beta cerrado completo from this test.
```

## Governance boundary

The Friday test is a near-term operational milestone and prioritization criterion. It does not displace the roadmap toward MVP-Beta cerrado M1/M2/L1, and it does not authorize app code, DB, schema, auth, credential, login, /now, StudyLoad, StudentAccess, staging, production, secret handling, or functional test execution inside this GOV-2 documentation phase.
