# MVP-SALES-PILOT-PRO-AUDIT-1 — Top-down UI Circuit Audit

## 1. Executive verdict

**APROBADO CON RESERVAS.**

La primera pasada visual y funcional del circuito estudiante M1-first debe considerarse un avance real y pertinente. El cambio metodológico hacia **Student Experience–Led Delivery** mejoró de forma clara el ritmo, la dirección y la relevancia del desarrollo: se dejó de girar alrededor de pruebas de puerta aisladas y se construyó un recorrido estudiante observable, operable y auditable.

El circuito cerrado:

```text
LP → DB → ST → matrícula M1 → primera cápsula → responder → enviar → feedback → autorreporte → finalizar → revisar completada → ver siguiente cápsula
```

es suficiente como **primera base UI/funcional M1-first**, pero no debe interpretarse todavía como MVP-Beta cerrado completo, Sales-Ready, piloto real, ni readiness M1/M2/L1. La reserva principal es que el circuito combina componentes ya operativos con superficies todavía provisionales, placeholders, continuidad parcialmente heredada y deudas pedagógicas importantes.

La dirección recomendada es continuar, pero **no avanzar directo a prueba larga hasta Cápsula 10 sin antes auditar continuidad, datos reales de progreso/logro y calidad pedagógica de la primera cápsula**.

---

## 2. Audit scope

### Qué se auditó

Se auditó la primera pasada top-down de experiencia estudiante construida después de adoptar Student Experience–Led Delivery:

- Landing Page.
- Dashboard estudiante.
- Study Page M1 pre-enrollment.
- Study Page M1 after-enrollment.
- Matrícula M1 desde Study Page.
- Creación/ubicación idempotente de primera cápsula.
- Entrada al visor de cápsula.
- Estado de respuesta post-Comenzar.
- Persistencia local de respuestas antes de submit.
- Submit manual de respuestas.
- Feedback inicial.
- Persistencia post-submit.
- Autorreporte manual.
- Finalización manual de cápsula.
- Revisión de cápsula completada.
- Visibilidad de siguiente cápsula.
- Documentación viva y handoff.

### Qué no se auditó

No se auditó en profundidad:

- Código fuente línea por línea.
- Seguridad completa de endpoints.
- Carga de datos reales a escala.
- Producción/staging.
- Performance.
- Accesibilidad formal WCAG.
- Calidad completa de contenido PAES M1.
- Calidad matemática de todas las preguntas.
- Calidad pedagógica de todos los feedbacks.
- Continuidad hasta Cápsula 10 ejecutada.
- Comportamiento con 1–3 estudiantes reales.
- Pago/trial/suscripción real.
- M2/Lectora funcional.
- StudentAccess lifecycle.

---

## 3. Strategic assessment

### Evaluación del cambio metodológico top-down

El cambio top-down fue correcto y oportuno. Antes del cambio, el proyecto estaba en riesgo de quedar atrapado en pruebas fragmentadas de login, `/now`, fixtures, ciclos y estados internos. Después del cambio, el desarrollo empezó a organizarse por entregables de experiencia estudiante: landing, dashboard, Study Page, cápsula, feedback y finalización.

El cambio fue eficaz porque produjo:

- Un circuito estudiante observable.
- Un lenguaje UI más cercano al estudiante.
- Una estructura de navegación LP → DB → ST → Cápsula.
- Una unidad visible pedagógica: “Cápsula”.
- Un flujo con evidencia real de respuestas.
- Un estado post-submit y post-finalización revisable.
- Mejor alineación entre producto, pedagogía y UI.

### Si el enfoque debe continuar

Sí. El enfoque debe continuar como método principal.

La regla vigente debe mantenerse:

```text
Top-down define el entregable de experiencia.
Bottom-up resuelve blockers subordinados a ese entregable.
Phase Scope Optimization evita sobrefaseo.
HYBRID_DIRECTION_WITH_PHASED_GATES protege límites estratégicos.
```

### Condiciones de continuidad

El enfoque debe continuar bajo estas condiciones:

1. Cada nueva fase debe declarar qué experiencia observable mejora.
2. Las microfases deben tributar al circuito estudiante, no a curiosidades técnicas.
3. Las fronteras funcionales deben seguir autorizándose explícitamente.
4. No se debe declarar readiness comercial ni MVP completo.
5. Debe auditarse pedagogía, no solo navegación.
6. Los placeholders deben reemplazarse por datos reales antes de pruebas con estudiantes reales.
7. La continuidad multi-cápsula debe entenderse y estabilizarse antes de Cápsula 10.

---

## 4. Circuit quality assessment

### LP

**Estado:** aceptada como v0.1 operativa.

La landing cumple como punto de entrada visual. Tiene identidad Bexauri, comunica una experiencia de estudio, ofrece rutas de acceso y no implementa checkout/pago real. El estándar visual v0.1 quedó documentado y aplicado suficientemente para avanzar.

**Riesgo:** todavía tiene deuda de auditoría PRO visual. Puede mejorar en diferenciación, narrativa y nivel competitivo. No debe seguir puliéndose por intuición salvo que se detecte una fricción concreta en el circuito.

### Dashboard

**Estado:** operativo como home móvil-first.

El dashboard logró un avance importante: deja de ser una pantalla técnica y funciona como home contenida para tutorías. M1 aparece como activa/principal; M2/Lectora aparecen como arquitectura visual no operativa; el CTA conduce a Study Page.

**Riesgo:** los indicadores `Ej.` y `Logro` aún son placeholders o datos mínimos. Esto puede generar una promesa visual que el backend todavía no sostiene. Antes de prueba extendida, deben conectarse a datos reales o marcarse claramente como iniciales.

### Study Page

**Estado:** base sólida pre y after enrollment.

La Study Page ya diferencia pre-enrollment, after-enrollment, cápsula actual y cápsulas completadas. “Matricularse” ya es operativo para M1 y luego muestra Tutoría Activa. La Study Page se convirtió en una verdadera pantalla de tutoría, no solo un intermedio.

**Riesgo:** la matrícula desde Study Page es útil, pero introduce una vía funcional que debe quedar muy bien documentada: específica para PAES_M1, idempotente y sin M2/Lectora. Debe evitar convertirse en un patrón genérico no gobernado.

### Enrollment

**Estado:** operativo y acotado.

Matricularse crea/reactiva enrollment PAES_M1. No activa M2/Lectora, no StudentAccess lifecycle y no pago/trial real.

**Riesgo:** falta definir cómo se comportará esto con signup real, trial/suscripción futura y StudentAccess. Hoy es correcto para local/dev y circuito interno, pero no es todavía modelo comercial ni piloto público.

### First Cápsula

**Estado:** operativa como primera cápsula visible y navegable.

La primera cápsula aparece con CTA “Ver cápsula”. Si no existe ciclo/cápsula, se crea/ubica de forma idempotente y acotada para PAES_M1.

**Riesgo:** la creación de primera cápsula desde Study Page resuelve UX, pero acopla experiencia UI con generación/ubicación de cápsula. Debe auditarse antes de escalar a Cápsula 10 para evitar duplicaciones o continuidad inesperada.

### Submit/feedback

**Estado:** funcional y pedagógicamente prometedor.

El estudiante puede comenzar, responder, enviar manualmente, guardar evidencia `mc_submission`, ver resultado inicial y feedback por pregunta. Se implementó persistencia local antes de submit y persistencia post-submit basada en evidencia.

**Riesgo:** el feedback inicial debe ser auditado pedagógicamente. La UI puede estar lista, pero la calidad del contenido y la ayuda paso a paso determinarán si Bexauri se siente valioso o solo correcto.

### Autorreporte/finalización

**Estado:** funcional.

Autorreporte manual, finalización manual, limpieza de drafts y estado final están implementados. No hay autorreporte automático ni completion automático.

**Riesgo:** el endpoint complete contiene continuidad idempotente existente. Aunque no se agregó continuidad nueva, hay que auditar exactamente cuándo y cómo se prepara la siguiente cápsula.

### Review completed cápsula

**Estado:** aprobado.

La cápsula completada puede revisarse, no se reinicia, no muestra Comenzar, y conserva respuestas/feedback/autorreporte.

**Riesgo:** si hay múltiples cápsulas completadas, la UI muestra hasta 3. Para Cápsula 10 se necesitará una estrategia de historial/progreso más robusta.

### Next cápsula

**Estado:** visible si existe.

La Study Page muestra siguiente cápsula si hay pending/in_progress y cápsulas completadas como revisión.

**Riesgo:** el sistema aún no ha probado continuidad larga. El principal riesgo para Cápsula 10 es que la continuidad idempotente existente no esté alineada con una secuencia pedagógica coherente.

---

## 5. Strengths

1. **Cambio metodológico exitoso.** El top-down permitió construir experiencia real en vez de seguir validando infraestructura.
2. **Circuito estudiante completo v0.1.** Ya existe una ruta LP → DB → ST → Cápsula → feedback → revisión.
3. **Mobile-first real.** DB, ST y cápsula fueron refinadas en móvil, no solo en desktop.
4. **Terminología pedagógica visible.** “Cápsula” mejora la percepción pedagógica frente a “StudyLoad” o “Carga”.
5. **Fronteras funcionales controladas.** Matrícula, submit, autorreporte y finalización se autorizaron por gates.
6. **Persistencia de estado bien pensada.** Respuestas y autorreporte no se pierden al navegar.
7. **No se sobreprometió comercialmente.** Trial/suscripción siguen sin checkout/pago real.
8. **Revisión de cápsula completada.** Esto es clave para aprendizaje y confianza.
9. **Documentación viva consistente.** Cada frontera quedó documentada y auditable.
10. **No se activó M2/Lectora prematuramente.** Visibles como arquitectura, no funcionales.

---

## 6. Weaknesses

1. **Continuidad no suficientemente auditada.** La existencia de `prepareNextStudyLoadAfterCompletion` es crítica y debe entenderse mejor.
2. **Indicadores de progreso/logro no son reales.** Dashboard y ST aún no tienen métricas pedagógicas confiables.
3. **Pedagogía de cápsula no auditada profundamente.** Se validó flujo, no calidad de contenidos/feedback.
4. **Botón “+ paso a paso” sigue como deuda.** Es pequeño, pero toca el corazón del valor pedagógico.
5. **Enrollment desde ST puede generar deuda de arquitectura.** Funciona, pero debe alinearse con signup/trial/suscripción futura.
6. **StudentAccess sigue fuera del circuito.** Está bien por ahora, pero será relevante antes de pilotos reales.
7. **M2/Lectora visibles pueden generar expectativa.** Aunque no funcionales, deben mantenerse controladas.
8. **No hay prueba larga.** El circuito está probado hasta primera cápsula, no hasta Cápsula 10.
9. **Algunas piezas son placeholders.** Progreso, foco, logro y desempeño requieren datos reales.
10. **El circuito creció rápido.** Necesita una auditoría de consistencia integral antes de seguir ampliando.

---

## 7. Frontend/backend consistency audit

### UI vs modelos internos

La UI usa “Cápsula”, mientras el modelo interno conserva StudyLoad. Esto es correcto, siempre que se mantenga la separación: nombre pedagógico visible vs nombre técnico interno.

Riesgo: pueden quedar textos técnicos residuales en pantallas no auditadas.

### UI vs datos reales

La UI ya muestra progreso/logro/ejercicios, pero varios indicadores son placeholders o mínimos. Esto debe corregirse antes de una prueba con estudiantes reales, porque puede erosionar confianza.

### UI vs endpoints

El submit usa `POST /api/study-loads/[id]/responses`. La finalización usa `POST /api/study-loads/[id]/complete`. La UI está usando endpoints reales existentes, lo cual convierte parte del circuito en producto operativo real.

Riesgo: completar cápsula puede disparar continuidad existente. Debe auditarse.

### UI vs continuidad

La continuidad idempotente existente no fue agregada durante esta fase, pero ahora es parte observable del producto. Debe tratarse como deuda crítica-media antes de Cápsula 10.

### UI vs StudentAccess/trial/suscripción

La UI muestra trial/suscripción en LP y arquitectura de tutorías, pero no hay integración real de StudentAccess/trial/pago. Esto está bien para local/dev, pero debe seguir explícito en handoff.

### UI vs M2/Lectora

M2/Lectora se muestran como no operativas. Es correcto como arquitectura visual. Debe evitarse que parezcan rutas activas.

---

## 8. Pedagogical audit

### Claridad

La claridad mejoró mucho. El estudiante puede entender: dónde está, qué tutoría tiene, qué cápsula sigue, cómo responder, cómo revisar y cómo finalizar.

### Continuidad

Existe continuidad observable, pero todavía no está pedagógicamente auditada. Ver siguiente cápsula no basta; debe confirmarse que la siguiente cápsula responde al desempeño anterior.

### Feedback

El feedback por pregunta es una fortaleza inicial. La estructura Paso 1 / Paso 2 ayuda a separar autorreporte y revisión.

Riesgo: falta auditar la calidad real del feedback, especialmente si la ayuda paso a paso es genérica o insuficiente.

### Progreso

Progreso todavía es débil. Hay UI de progreso, pero no indicadores suficientemente reales.

### “Cápsula” como unidad pedagógica

La palabra “Cápsula” es adecuada: breve, manejable, menos pesada que “carga”, y más cercana a una unidad de estudio guiado.

Debe consolidarse en toda UI estudiante.

### Calidad de experiencia para estudiante

La experiencia ya tiene estructura pedagógica: responder, revisar, autorreportar, finalizar, volver a revisar. Esto es mucho más fuerte que una simple plataforma de preguntas.

La brecha principal es que el valor pedagógico depende ahora de la calidad de las cápsulas y del feedback.

---

## 9. Technical debt

### Deudas críticas

1. Auditar continuidad idempotente del endpoint complete.
2. Verificar generación/selección de siguiente cápsula hasta Cápsula 10.
3. Asegurar idempotencia completa de matrícula/cápsula inicial/completion.

### Deudas medias

1. Reemplazar placeholders de progreso/logro.
2. Endurecer naming visible “Cápsula” en todas las superficies estudiante.
3. Revisar edge cases: sin cápsula, varias cápsulas, cápsula completed + pending.
4. Alinear enrollment con futuro signup/trial/suscripción.
5. Auditar mobile end-to-end real completo.

### Deudas menores

1. Mejorar botón “+ paso a paso”.
2. Ajustar microcopy de progreso/foco.
3. Pulir visual final de LP con PRO.
4. Mejorar historial de cápsulas cuando sean más de 3.

---

## 10. Product debt

### Deudas críticas

1. Definir qué significa pedagógicamente “siguiente cápsula más adecuada”.
2. Definir criterios mínimos de calidad para cápsulas M1.
3. Definir gate antes de 1–3 estudiantes reales.

### Deudas medias

1. Definir indicadores reales para Ej./Logro.
2. Definir rol de trial/suscripción visual vs futuro comercial.
3. Definir relación entre Dashboard y ST cuando haya múltiples tutorías.
4. Definir si StudentAccess se incorporará antes de piloto real.

### Deudas menores

1. Auditoría visual PRO de LP.
2. Microcopy de “+ paso a paso”.
3. Mejoras de branding del logo provisional.
4. Refinamientos de footer/navegación.

---

## 11. Risk register

| Riesgo | Probabilidad | Impacto | Mitigación | Fase recomendada |
|---|---:|---:|---|---|
| Continuidad genera cápsulas no coherentes | Media | Alta | Auditar complete + next capsule logic antes de Cápsula 10 | M1-CONTINUITY-1 |
| Indicadores placeholders confunden | Alta | Media | Conectar Ej./Logro a datos reales o marcar estado inicial | DASHBOARD-METRICS-1 |
| Feedback pedagógico insuficiente | Media | Alta | Auditoría pedagógica de cápsula 1 | PEDAGOGY-1 |
| M2/Lectora parecen funcionales | Media | Media | Revisar copy/estados visuales | UI-TUTORING-STATES-1 |
| Enrollment desde ST se desalineará con signup/trial | Media | Media | Definir enrollment policy | ENROLLMENT-POLICY-1 |
| StudentAccess faltante antes de piloto real | Alta | Alta | Gate explícito antes de estudiantes reales | PILOT-GATE-1 |
| “Cápsula” inconsistente en UI no auditada | Media | Media | Naming sweep de UI estudiante | UI-NAMING-1 |
| Estado completed + next capsule confunde | Media | Media | Auditoría ST post-completion | STUDY-POST-COMPLETION-1 |
| LP visual aún no competitiva | Media | Baja-media | PRO visual audit posterior | PRO-AUDIT-LP-1 |
| Multi-cápsula rompe por edge cases | Media | Alta | Rehearsal hasta Cápsula 10 con datos ficticios | M1-CIRCUIT-2 |

---

## 12. Gaps and inconsistencies

### Vacíos detectados

- Falta criterio pedagógico formal de cápsulas.
- Falta mapping real de Ej./Logro.
- Falta política de enrollment entre LP, DB y ST.
- Falta auditoría de continuidad real.
- Falta definición de gate para estudiante real.
- Falta prueba de múltiples cápsulas.
- Falta consolidar “Cápsula” en toda UI.

### Inconsistencias detectadas

- Trial/Suscripción visibles sin lógica comercial real.
- M2/Lectora visibles sin funcionalidad.
- Progreso/logro visibles sin fuente completa.
- “Siguiente cápsula” existe, pero no se ha probado secuencia larga.
- StudyLoad interno vs Cápsula visible requiere disciplina continua.

### Contradicciones posibles entre Front y Back

- Front muestra experiencia pedagógica guiada; Back puede estar generando continuidad por reglas técnicas aún no auditadas pedagógicamente.
- Front muestra progreso; Back podría no proveer datos suficientes.
- Front muestra ruta de tutorías; Back solo sostiene M1 real.

---

## 13. Readiness for Cápsula 10 test

### Qué está listo

- Circuito base.
- Matrícula M1.
- Primera cápsula.
- Submit.
- Feedback inicial.
- Autorreporte.
- Completion.
- Revisión completed.
- Siguiente cápsula visible si existe.

### Qué falta

- Auditar continuidad cápsula a cápsula.
- Confirmar que pueden generarse/mostrarse hasta 10 cápsulas.
- Confirmar que cada cápsula tiene contenido coherente.
- Confirmar que feedback no se degrada.
- Confirmar que estados completed/pending/in_progress se mantienen claros.
- Confirmar que indicadores siguen siendo honestos.

### Qué debe verificarse antes

1. Continuity endpoint.
2. Next capsule selection.
3. No duplicación de cápsulas.
4. Progreso/historial después de varias completadas.
5. Performance móvil con varias cápsulas.
6. Calidad pedagógica de al menos las primeras 3 cápsulas.

### Qué no debe intentarse

- Cápsula 10 como prueba “comercial”.
- Estudiantes reales.
- M2/Lectora.
- Pago/trial real.
- Automatizar continuidad nueva sin entender la existente.

---

## 14. Readiness for real student pilot

### Qué está listo

- Experiencia UI base M1.
- Circuito completo primera cápsula.
- Terminología pedagógica.
- Evidencia de respuestas.
- Autorreporte.
- Revisión.

### Qué falta

- Prueba multi-cápsula.
- Auditoría pedagógica.
- Datos reales de progreso.
- Gate de StudentAccess/trial.
- Manejo de errores y soporte.
- Política de estudiantes reales.
- QA mobile end-to-end.
- Handoff operativo de prueba.

### Gate mínimo antes de 1–3 estudiantes reales

Antes de 1–3 estudiantes reales debe estar aprobado:

1. Cápsula 1–3 auditadas pedagógicamente.
2. Continuidad probada hasta al menos Cápsula 3, idealmente 10 en ensayo interno.
3. No duplicación ni estados rotos.
4. Indicadores no engañosos.
5. StudentAccess o mecanismo equivalente definido.
6. Soporte/failure path.
7. Privacidad/custodia de datos reales.
8. Runbook de prueba real.
9. No claims comerciales.

---

## 15. Recommended next phases

### 1. MVP-SALES-PILOT-M1-CONTINUITY-1 — Audit existing next-capsule continuity

**Objetivo:** entender exactamente qué hace `prepareNextStudyLoadAfterCompletion`.  
**Criterio de salida:** continuidad documentada, idempotencia validada, riesgos identificados.

### 2. MVP-SALES-PILOT-PEDAGOGY-1 — Audit first M1 cápsula pedagogical quality

**Objetivo:** revisar contenido, dificultad, feedback y ayuda paso a paso de la primera cápsula.  
**Criterio de salida:** cápsula 1 aprobada pedagógicamente o backlog de mejoras.

### 3. MVP-SALES-PILOT-M1-CIRCUIT-2 — Prepare manual M1 multi-cápsula test to Cápsula 10

**Objetivo:** crear runbook de prueba interna extendida.  
**Criterio de salida:** plan y criterios listos para recorrer hasta Cápsula 10.

### 4. MVP-SALES-PILOT-M1-CIRCUIT-3 — Execute controlled multi-cápsula rehearsal

**Objetivo:** ejecutar recorrido interno por varias cápsulas.  
**Criterio de salida:** evidencia de continuidad, bugs y deudas.

### 5. MVP-SALES-PILOT-UI-METRICS-1 — Replace dashboard/ST placeholder metrics

**Objetivo:** conectar Ej./Logro/Progreso a datos reales o simplificar UI.  
**Criterio de salida:** indicadores honestos.

### 6. MVP-SALES-PILOT-UI-CAPSULE-STEP-BY-STEP-1 — Refine “+ paso a paso”

**Objetivo:** convertir affordance en ayuda pedagógica real o definirla como deuda.  
**Criterio de salida:** comportamiento claro.

### 7. MVP-SALES-PILOT-PILOT-GATE-1 — Define 1–3 real student pilot gate

**Objetivo:** definir condiciones mínimas para estudiantes reales.  
**Criterio de salida:** gate claro de seguridad/producto/pedagogía.

### 8. MVP-SALES-PILOT-PRO-AUDIT-LP-1 — Audit landing and visual standard

**Objetivo:** revisar visual competitivo y marca.  
**Criterio de salida:** lista de ajustes visuales priorizados.

---

## 16. What not to do next

No conviene:

- Seguir puliendo LP por intuición.
- Activar M2/Lectora.
- Agregar pago/trial/suscripción real.
- Invitar estudiantes reales todavía.
- Probar Cápsula 10 sin auditar continuidad.
- Mejorar branding antes de resolver continuidad/pedagogía si el tiempo es limitado.
- Crear nueva lógica adaptativa sin auditar la existente.
- Cambiar schema sin necesidad.
- Reescribir dashboard completo.
- Declarar Sales-Ready o MVP-Beta cerrado completo.
- Confiar en indicadores placeholder para decisiones de aprendizaje.

---

## 17. Handoff updates required

Actualizar documentación viva con estos mensajes:

### CURRENT_AGENT_HANDOFF_MVP_M1.md

Agregar:

- Circuito UI M1-first cerrado como primera base.
- Resultado aceptado del circuito.
- Próximo foco: continuidad multi-cápsula y pedagogía.
- No seguir puliendo LP/DB/ST/Cápsula por intuición.
- Deudas vivas principales.

### CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md

Agregar:

- Current accepted circuit.
- Baseline del cierre.
- Próximas fases recomendadas.
- Gate antes de estudiantes reales.

### DOCUMENTATION_INDEX_MVP_M1.md

Agregar:

- Este informe PRO-AUDIT-1.
- Referencia a circuito cerrado.
- Referencia a deudas y fases recomendadas.

### PHASE_LOG.md

Registrar:

- PRO audit completada.
- Veredicto: APROBADO CON RESERVAS.
- Próximo foco recomendado: continuidad + pedagogía antes de Cápsula 10.

---

## 18. Executive summary for future chats

El primer circuito UI estudiante M1-first quedó cerrado como base operativa: LP → Dashboard → Study Page → matrícula M1 → primera Cápsula → respuestas → feedback → autorreporte → finalizar → revisar completada → ver siguiente Cápsula.  
El enfoque top-down funcionó y debe continuar.  
El circuito es una base suficiente para MVP UI M1-first, pero queda aprobado con reservas.  
Las reservas principales son continuidad multi-cápsula, datos reales de progreso/logro, calidad pedagógica de cápsulas y consistencia Front/Back.  
No se debe declarar Sales-Ready ni MVP-Beta cerrado completo.  
No se debe avanzar a estudiantes reales todavía.  
La siguiente prioridad no es más polish visual, sino auditar continuidad y pedagogía.  
La continuidad idempotente existente debe documentarse y probarse antes de Cápsula 10.  
Los indicadores placeholder deben reemplazarse o simplificarse.  
M2/Lectora deben seguir visibles no operativas hasta fase explícita.  
StudentAccess/trial/suscripción siguen fuera del circuito real.  
El botón “+ paso a paso” queda como deuda pedagógica.  
Próximas fases recomendadas: continuidad, auditoría pedagógica, runbook Cápsula 10, rehearsal multi-cápsula y gate de piloto real.

---

## 19. Final recommendation

**Continuar con el enfoque top-down, pero antes de extender a Cápsula 10 o estudiantes reales, auditar continuidad y calidad pedagógica: el circuito ya existe; ahora hay que probar que aprende, progresa y no solo navega.**
