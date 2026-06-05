# CPA Reconciliation Audit 1R — Conciliación source-grounded de la Capa Pedagógica Actual contra BPCPI/BPTT/M1

## 1. Executive verdict

**APROBADO CON RESERVAS.**

La **Capa Pedagógica Actual — CPA** de Bexauri contiene una base operativa y conceptual suficiente para avanzar hacia una **BPCPv1-PAES-M1**, pero no puede canonizarse completa sin correcciones. La CPA ya materializa elementos valiosos: circuito estudiante M1-first, cápsula como unidad visible, matrícula M1, submit manual, evidencia `mc_submission`, feedback inicial, autorreporte manual, finalización manual, revisión de cápsulas completadas y continuidad técnica hacia siguiente StudyLoad/Cápsula.

Estos elementos están alineados en términos generales con BPCPI, BPTT y el Blueprint M1 Integrado.

La reserva principal es que la CPA todavía mezcla **pedagogía gobernada** con **operatividad técnica funcional**. Algunas piezas existen y funcionan, pero aún no cumplen completamente el contrato pedagógico esperado: continuidad justificada por evidencia, indicadores honestos, clasificación de errores, ayuda paso a paso, ficha pedagógica de cápsula y conexión explícita entre evidencia, feedback y siguiente cápsula.

La diferencia respecto de la auditoría preliminar es importante: esta versión usa el paquete fuente `CPA-AUDIT-PACK-1`, que contiene extractos canónicos, source cards de código vivo, modelos, contenido, fuentes Drive/locales, criterios de vigencia y límites conocidos. Aun así, no reemplaza una lectura directa exhaustiva de todos los documentos externos ni una auditoría matemática completa de contenido PAES M1. El informe debe considerarse **suficiente para orientar la derivación de BPCPv1-PAES-M1**, pero no suficiente para iniciar implementación sin una fase de definición BPCPv1-PAES-M1 y auditoría de cápsulas concretas.

Conclusión ejecutiva:

> La CPA debe reconciliarse, no descartarse. Bexauri ya tiene una base pedagógica operativa valiosa, pero BPCPv1-PAES-M1 debe canonizar solo lo que está alineado, corregir lo que hoy funciona sin suficiente justificación pedagógica, contener lo técnico que aún no debe prometer inteligencia, y agregar los contratos mínimos que faltan.

---

## 2. Source access and audit confidence

### Fuentes revisadas

Esta auditoría se basa principalmente en el paquete fuente:

`MVP_SALES_PILOT_PEDAGOGY_CPA_AUDIT_PACK_1_SOURCE_GROUNDED_PACKAGE_FOR_PRO.md`

El paquete declara lectura directa de documentos del repo, blueprints canónicos, documentación de circuito, protocolos, inventario CPA, código vivo read-only y algunos extractos Drive/locales seguros. También declara límites de acceso: no hubo ejecución de DB/runtime, no se abrieron secretos, no se copiaron documentos externos completos y no se hizo auditoría matemática completa de contenido.

También se consideró el prompt de auditoría, que establece explícitamente el objetivo, formato, matriz de conciliación, veredictos posibles y restricciones de no derivar todavía BPCPv1-PAES-M1 ni bajar a implementación.

### Fuentes directas vs extractos

**Directas dentro del paquete:**

- BPCPI.
- BPTT.
- Blueprint M1 Integrado.
- PRO-AUDIT-1.
- UI-CIRCUIT-1.
- SCHEDULE-1.
- PHASE_LOG / handoff / context transfer / documentation index.
- Código vivo read-only: Study Page, Dashboard, Capsule Viewer, answer form, routes de start/responses/complete, first-capsule helper, continuity helper, content registry, pedagogy helpers, Prisma schema.

**Extractos o resúmenes:**

- Documentos Drive/locales maestros.
- Documentos históricos de LearningCycle / contrato de capas.
- Source cards de contenido.
- Evaluación de obsolescencia/supersession.
- Inventario externo amplio.

### Fuentes no disponibles completas

No se revisaron íntegramente:

- Documentos `.docx` / `.pdf` externos.
- Todos los documentos Drive.
- Todos los documentos históricos/fundacionales.
- DB real.
- Ejecución real de cápsulas.
- Contenido matemático completo con revisión experta.
- Historial de múltiples estudiantes o múltiples ciclos reales.

### Límites de auditoría

Esta auditoría puede reconciliar arquitectura y comportamiento reportado con los blueprints. No puede:

- validar matemáticamente todos los ítems;
- comprobar runtime real;
- declarar continuidad pedagógicamente suficiente en ejecución larga;
- cerrar BPCPv1 global;
- cerrar BPCPv1-PAES-M1;
- autorizar piloto con estudiantes reales;
- declarar Sales-Ready o MVP-Beta cerrado.

### Nivel de confianza

**Alto** para:

- mapa de fuentes del repo;
- arquitectura conceptual BPCPI/BPTT/M1;
- comportamiento descrito por source cards de código vivo;
- circuito UI aceptado;
- existencia de evidencia `mc_submission`, autorreporte, completion y revisión.

**Medio** para:

- contenido Drive leído como extracto;
- consistencia histórica de SRA/LearningCycle;
- suficiencia pedagógica de continuidad;
- calidad del feedback actual;
- calidad del contenido PAES M1.

**Bajo/pendiente** para:

- validación experta de ítems M1;
- calidad matemática de cada cápsula;
- prueba hasta Cápsula 10;
- efectividad real con estudiantes.

---

## 3. Definition of CPA

La **CPA — Capa Pedagógica Actual** es el conjunto vigente de documentos, decisiones, código, modelos, contenidos, interfaces y flujos que hoy determinan cómo Bexauri organiza, guía, evidencia, retroalimenta y continúa el aprendizaje.

Incluye:

- BPCPI, BPTT y Blueprint M1 Integrado como documentos rectores recientes.
- Circuito UI/funcional M1-first aceptado.
- Study Page M1.
- Dashboard estudiante.
- Capsule Page.
- Matrícula M1.
- First capsule helper.
- StudyLoad/Cápsula como unidad técnica-visible.
- LearningCycle como estructura backend.
- Responses / `mc_submission`.
- Feedback reconstruido desde content registry.
- Autorreporte manual.
- Completion manual.
- Continuity helper.
- Content registry PAES M1.
- Prisma models: Student, StudentAccess, Program, StudentProgramInstance, Axis, Skill, SkillState, LearningCycle, CycleDecision, StudyLoad, CycleEvaluation, Diagnostic, CycleSnapshot, TutoringSession, Response, ContinuitySignal, AuditEvent.
- Documentación histórica/fundacional E360/Bexauri.
- Fuentes Drive/locales inventariadas.

No incluye:

- BPCPv1 global final.
- BPCPv1-PAES-M1 final.
- Motor adaptativo completo.
- Agentes pedagógicos operativos.
- Validación experta de PAES M1 completa.
- Estudiantes reales.
- M2/L1 funcional.
- Pago/trial/suscripción real.
- Claims comerciales o Sales-Ready.

---

## 4. Current CPA map

| Componente CPA | Dónde vive | Estado actual |
|---|---|---|
| Mandato pedagógico ideal | BPCPI | Vigente / canónico |
| Gramática transversal de tutorías | BPTT | Vigente / canónica |
| Contrato M1 | Blueprint M1 Integrado | Vigente / canónico |
| Circuito estudiante | UI-CIRCUIT-1 + app | Cerrado como primera base |
| Landing / DB / ST | UI docs + app pages | Operativo visualmente |
| Tutoría M1 | Study Page + enrollment | Operativa |
| M2/L1 visibles | Dashboard/LP | No operativas, contener |
| Cápsula visible | UI + StudyLoad | Operativa como unidad visible |
| StudyLoad interno | Prisma/code | Modelo técnico |
| Primera cápsula | `paes-m1-first-capsule.ts` | Idempotente, necesita ficha pedagógica |
| Respuestas | responses route + Response | Evidencia MC |
| Feedback | content registry + answer form | Existe, calidad a auditar |
| Ayuda paso a paso | answer form + authored complete feedback | Parcial, deuda |
| Autorreporte | answer form + complete route | Manual, canonizable |
| Completion | complete route | Manual, canonizable |
| Continuidad | `study-load-continuity.ts` | Rule-based, corregir/contener |
| Progreso | Dashboard/ST | Parcial/placeholders |
| LearningCycle/SRA | schema + docs históricos | Parcialmente vivo, recuperar con cautela |
| Contenido M1 | study-load-content registry | Provisional, auditar |
| Drive docs | fuentes externas | Contexto valioso con vigencia variable |

---

## 5. Alignment with BPCPI

### Alineaciones fuertes

1. **La CPA ya transforma interacción en evidencia.**  
   El route de responses guarda `mc_submission` con contentKey, contentVersion, selected answers y summary.

2. **La CPA ya distingue inicio, respuesta, submit, autorreporte y finalización.**  
   Esto respeta la idea de aprendizaje revisable y no automático.

3. **La revisión de cápsulas completadas ya existe.**  
   Alineado con el principio de que evidencia y feedback deben ser revisables.

4. **El autorreporte manual está integrado.**  
   Alineado con metacognición.

5. **La cápsula como unidad visible se instaló correctamente.**  
   Alineado con práctica acotada, evidencia y feedback.

### Alineaciones parciales

1. **Continuidad.**  
   Existe continuidad, pero el paquete muestra que `study-load-continuity.ts` opera por secuencia fija: `balanced_entry_initial → linear_equations_basic → linear_equations_word_problems → linear_equations_reinforcement → linear_functions_basic → data_representation_entry`. No usa todavía desempeño, error, autorreporte o revisión.

2. **Feedback.**  
   Existe feedback post-submit, pero depende de registry y authored feedback. La calidad pedagógica debe auditarse.

3. **Progreso.**  
   Hay cápsulas completadas y revisión, pero `Logro --%` sigue como placeholder o débil.

4. **Evidencia interpretable.**  
   La evidencia existe, pero falta clasificación pedagógica más rica de errores y foco.

### Contradicciones

1. **Continuidad visible vs continuidad real.**  
   Si la UI sugiere que la siguiente cápsula es “adecuada” o “más conveniente”, pero la continuidad es una secuencia fija, hay riesgo de simular adaptación.

2. **Feedback automático vs notices antiguos.**  
   El paquete detecta tensión: algunas notas del content registry dicen “no automatic feedback”, pero el código ya renderiza feedback. Esto puede ser stale copy o contradicción.

3. **Progreso visual vs datos reales.**  
   Indicadores visibles sin fuente pedagógica clara contradicen progreso honesto.

### Omisiones

- Ficha pedagógica obligatoria de cápsula.
- Matriz error → feedback → continuidad.
- Uso de autorreporte en continuidad.
- Regla de evidencia insuficiente.
- Explicación mínima de siguiente cápsula.
- Validación experta de contenido M1.
- Indicadores honestos v1.

---

## 6. Alignment with BPTT

### Tutoría

La tutoría M1 cumple parcialmente la estructura BPTT: propósito, cápsulas, evidencia, feedback, autorreporte, continuidad, revisión. Falta robustecer progresión y progreso.

### Cápsula

La CPA tiene cápsulas visibles y revisables. Alineación fuerte en forma. Alineación media en contrato pedagógico, porque falta ficha obligatoria.

### Evidencia

La evidencia MC está clara. Falta evidencia de proceso, revisión y error tipificado.

### Feedback

Existe feedback. Falta validar feedback de cápsula, feedback de progreso y feedback de continuidad.

### Autorreporte

Alineación fuerte. Manual, simple y no automático.

### Continuidad

Alineación débil-media. Existe continuidad técnica, pero no evidencia de justificación pedagógica basada en desempeño.

### Progreso

Alineación débil-media. La CPA puede mostrar actividad y completed, pero no progreso pedagógico suficiente.

### Revisión

Alineación fuerte. Completed review está implementada y debe canonizarse.

---

## 7. Alignment with Integrated M1 Blueprint

### Foco M1

La CPA registra content keys y propósitos generales, pero no queda probado que cada cápsula tenga foco matemático auditable con destreza principal, errores esperados y continuidad posible.

### Cápsula M1

La cápsula existe como StudyLoad visible, pero debe enriquecerse con ficha pedagógica obligatoria.

### Errores matemáticos

No hay evidencia de clasificación operativa sistemática: conceptual, procedimental, lectura, modelación, representación, cálculo, estrategia, distractor o atención.

### Feedback M1

Existe feedback, pero no se ha demostrado que cumpla contrato mínimo para cada pregunta/cápsula.

### Ayuda paso a paso

Existe affordance y authored complete feedback cuando está disponible. Debe corregirse: no puede quedar como promesa vacía.

### Continuidad M1

La continuidad actual es fixed sequence/rule-based. Debe contenerse como **v0 operational sequence** hasta que BPCPv1-PAES-M1 defina continuidad mínima.

### Progreso M1

El progreso debe corregirse: completed/reviewed pueden ser indicadores de actividad/revisión, pero logro o dominio requieren más evidencia.

### Decisiones operativas y escalamiento

No está aún incorporada una jerarquía explícita en la CPA. Debe agregarse a BPCPv1-PAES-M1.

---

## 8. Reconciliation matrix

| Componente CPA | Fuente(s) | Estado actual | Alineación BPCPI | Alineación BPTT | Alineación M1 | Veredicto | Acción BPCPv1-PAES-M1 | Riesgo |
|---|---|---|---|---|---|---|---|---|
| Cápsula como unidad visible | UI-CIRCUIT, Capsule Page | Operativa | Alta | Alta | Alta | CANONIZAR | Mantener término “Cápsula” visible | Volver a lenguaje técnico |
| StudyLoad interno | Prisma/code | Modelo técnico | Compatible | Compatible | Compatible | CONTENER | Mantener técnico, oculto al estudiante | Confusión StudyLoad/Cápsula |
| Circuito M1-first | UI-CIRCUIT | Cerrado | Alta | Alta | Alta | CANONIZAR | Base de experiencia v1 | Perder base operativa |
| Matrícula M1 | Study Page/helper | Operativa | Media | Media | Alta | CANONIZAR CON LÍMITES | Mantener M1-specific | Activar tutorías sin gobierno |
| Primera cápsula | `paes-m1-first-capsule.ts` | Idempotente | Media | Media | Media | CORREGIR | Agregar ficha pedagógica | Cápsula inicial arbitraria |
| `mc_submission` | responses route | Evidencia MC | Alta | Alta | Media-alta | CANONIZAR | Base evidencia v1 | No interpretar errores |
| Feedback post-submit | answer form/registry | Existe | Media-alta | Media-alta | Media | CORREGIR | Auditar calidad mínima | Feedback genérico |
| `+ paso a paso` | answer form | Parcial/deuda | Media | Media | Media | CORREGIR | Definir contrato mínimo | Promesa vacía |
| Autorreporte | answer form/complete | Manual | Alta | Alta | Alta | CANONIZAR | Mantener 3 opciones v1 | Sobreinterpretar |
| Completion manual | complete route | Manual | Alta | Alta | Alta | CANONIZAR | Mantener manual | Completion automático |
| Completed review | Capsule/ST | Operativa | Alta | Alta | Alta | CANONIZAR | Mantener revisable | Perder aprendizaje posterior |
| Continuity helper | `study-load-continuity.ts` | Fixed sequence | Media-baja | Media | Media-baja | CONTENER/CORREGIR | Usar como v0, añadir justificación | Simular adaptación |
| Content registry | `study-load-content.ts` | M1 content provisional | Media | Media | Media | INVESTIGAR/CORREGIR | Auditar cápsulas | Contenido débil |
| Pedagogy metadata helper | `study-load-pedagogy.ts` | Limitation-aware | Alta | Alta | Alta | CANONIZAR | Mantener limitaciones explícitas | Claims excesivos |
| Pedagogical decision helper | `study-load-pedagogical-decision.ts` | Rule-based decision record | Media-alta | Media-alta | Media | RECUPERAR/CORREGIR | Usar como estructura auditable | Continuidad opaca |
| SkillState / CycleDecision | Prisma | Modelo existente | Media | Media | Media | INVESTIGAR | Decidir si entra v1 o post-v1 | Modelos dormidos |
| LearningCycle | Prisma/docs históricos | Estructura viva/parcial | Alta conceptual | Alta | Media | RECUPERAR | Canonizar ciclo mínimo si aplica | Perder SRA histórico |
| Indicadores Ej./Logro | Dashboard/ST | Parcial/placeholder | Baja-media | Baja-media | Baja | CORREGIR | Indicadores honestos | Métricas falsas |
| M2/L1 visibles | Dashboard/LP | No funcionales | Compatible con límites | Compatible | N/A | CONTENER | Mantener no operativas | Promesa falsa |
| Trial/suscripción visual | LP | No real | Compatible con límites | N/A | N/A | CONTENER | Mantener fuera pedagogía v1 | Confusión comercial |
| SRA docs históricos | Drive/April docs | Contexto valioso | Media-alta | Media | Media | RECUPERAR | Revisar ideas de ciclo | Obsolescencia no controlada |
| Product/System v2.1 | Drive | Marco estratégico | Media | Media | N/A | CONTENER/RECUPERAR | Usar como contexto, no norma | Contradecir blueprints actuales |
| Continuity notices stale | registry | Posible contradicción | Baja | Baja | Baja | CORREGIR | Actualizar copy/metadata | Contradicción UI/backend |
| Error classification | M1 blueprint, no código vivo | Ausente operacional | Baja actual | Media | Alta esperada | AGREGAR | Error taxonomy v1 mínima | Feedback no diagnóstico |
| Ficha pedagógica M1 | M1 blueprint, no CPA | Ausente | Baja actual | Media | Alta esperada | AGREGAR | Obligatoria | Cápsulas sin foco |
| Regla evidencia insuficiente | M1 blueprint | No confirmada | Baja actual | Media | Alta esperada | AGREGAR | Debe existir | Adaptividad falsa |

---

## 9. What to canonize

Deben pasar a BPCPv1-PAES-M1:

1. **Cápsula como unidad pedagógica visible.**
2. **StudyLoad como implementación interna, no lenguaje visible.**
3. **Circuito M1-first como flujo base.**
4. **Matrícula M1 específica y controlada.**
5. **Submit manual de respuestas.**
6. **`mc_submission` como evidencia inicial v1.**
7. **Autorreporte manual con tres opciones.**
8. **Completion manual.**
9. **Revisión de cápsulas completadas.**
10. **No reinicio de completed.**
11. **Limitaciones explícitas de no PAES score, no mastery, no adaptive AI.**
12. **Principio de mantener continuidad supervisable.**
13. **Separación UI visible / modelos técnicos.**

---

## 10. What to correct

Deben corregirse:

1. **Continuidad actual.**  
   De secuencia fija a continuidad mínima justificada o, al menos, explicitada como secuencia v0.

2. **Indicadores Ej./Logro.**  
   Deben conectarse a evidencia real o reducirse a actividad/revisión.

3. **Feedback.**  
   Debe auditarse contra contrato mínimo M1.

4. **Ayuda paso a paso.**  
   Debe tener contenido estructurado mínimo o marcarse como deuda no funcional.

5. **Content registry notices.**  
   Deben corregirse si contradicen feedback actual.

6. **Primera cápsula.**  
   Debe tener ficha pedagógica y propósito verificable.

7. **Metadata provisional.**  
   Debe no presentarse como validación experta.

8. **Copy de siguiente cápsula.**  
   Debe evitar sugerir adaptividad si es secuencia fija.

---

## 11. What to contain

Pueden mantenerse con límites:

1. **Continuidad fija.**  
   Mantener solo como `operational sequence v0`, no como adaptación inteligente.

2. **M2/L1 visibles.**  
   Mantener como no operativos.

3. **Trial/suscripción visual.**  
   Mantener fuera de pedagogía y sin claims reales.

4. **sessionStorage drafts.**  
   Mantener como apoyo UX, no evidencia pedagógica central.

5. **Logro `--%`.**  
   Mantener solo si se entiende como placeholder no engañoso; idealmente simplificar.

6. **External Drive master docs.**  
   Usar como contexto, no como fuente normativa automática.

7. **SkillState / CycleDecision dormidos.**  
   Mantener como potencial, no prometer como activo.

---

## 12. What to eliminate

Debe eliminarse o evitarse:

1. Cualquier claim de puntaje PAES estimado.
2. Cualquier claim de dominio.
3. Cualquier UI que sugiera adaptación inteligente sin base.
4. Continuidad “siguiente” sin explicación mínima.
5. Feedback reducido a correcto/incorrecto.
6. Progreso porcentual sin fuente.
7. Lenguaje visible StudyLoad/Carga.
8. Inferencias de incapacidad.
9. Simulación de IA/agente.
10. Revisión completed que permita reiniciar sin control.
11. Canonización de documentos históricos sin supersession check.

---

## 13. What to add

Debe agregarse antes o durante BPCPv1-PAES-M1:

1. Ficha pedagógica obligatoria por cápsula.
2. Foco matemático explícito por cápsula.
3. Evidencia mínima obligatoria.
4. Error taxonomy mínima M1.
5. Contrato mínimo de feedback por pregunta.
6. Contrato mínimo de ayuda paso a paso.
7. Reglas mínimas de continuidad.
8. Regla de evidencia insuficiente.
9. Indicadores permitidos/prohibidos.
10. Explicación mínima de siguiente cápsula.
11. Matriz desempeño + autorreporte.
12. Jerarquía de decisiones operativas/escaladas.
13. Auditoría de contenido M1.
14. Prueba multi-cápsula con criterios pedagógicos.

---

## 14. What to recover from historical/external docs

Elementos valiosos a recuperar con revisión:

1. **LearningCycle como ciclo completo.**  
   La documentación histórica plantea apertura, snapshot, decisión, carga, ejecución, evaluación y cierre/transición. Esto es muy coherente con BPCPI.

2. **Contrato de capas.**  
   La idea de que la UI no debe reemplazar lógica pedagógica/adaptativa es crucial.

3. **SRA / Sistema Regulador del Aprendizaje.**  
   Puede aportar estructura para continuidad y evaluación, pero debe actualizarse contra BPCPI/BPTT.

4. **Decision records.**  
   La idea de registrar decisiones de continuidad puede ser recuperada para hacer la continuidad explicable.

5. **Non-blocking operator principle.**  
   La revisión no debe bloquear por defecto, pero debe informar calidad.

6. **Master docs de sistema/producto.**  
   Útiles para visión general, pero no para declarar readiness.

7. **Continuidad táctica externa.**  
   Documento `.docx` inventariado debe revisarse si contiene criterios de continuidad útiles.

---

## 15. Staleness and supersession assessment

### Vigentes / canonical

- BPCPI.
- BPTT.
- Blueprint M1 Integrado.
- CPA-AUDIT-PACK-1.
- PRO-AUDIT-1.
- UI-CIRCUIT-1.
- SCHEDULE-1.
- Handoff/context actual.
- Código vivo.

### Vigentes con reservas

- SRA/roadmap docs recientes.
- StudyLoad/content docs.
- External master docs v2.1.
- LearningCycle historical package.

### Históricos / contextuales

- MVP_FLOW family.
- MVP_CONTENT family.
- FL_UX family.
- April 21 adaptive M1 package.
- Drive historical folders.

### Superseded / obsoletos

- RAW blueprints externos si ya fueron canonizados en repo.
- Friday review references before Schedule-1.
- UI phase recommendations superseded by UI-CIRCUIT-1.
- AS1-only assumptions superseded by broader M1 blueprint.

### Contradicciones

- Content notices saying no automatic feedback vs current code rendering feedback.
- Visible next capsule suggesting suitability vs fixed sequence.
- Adaptive/intelligent language in older docs vs current explicit no-adaptive-AI scope.

### Ideas recuperables

- LearningCycle full structure.
- Layer-boundary contract.
- Auditable continuity records.
- Non-blocking review principle.
- SRA as governance concept.

---

## 16. Code-vs-documentation consistency

### Qué dice la documentación

- La capa pedagógica debe gobernar propósito, evidencia, feedback, continuidad y progreso.
- La cápsula es unidad pedagógica, no solo técnica.
- El feedback debe orientar acción.
- La continuidad debe justificarse.
- Progreso debe ser honesto.
- BPCPv1-PAES-M1 debe ser simple, no pobre.

### Qué hace el código vivo según el paquete

- Study Page muestra M1, current capsule y completed capsules.
- First capsule helper crea/ubica primera cápsula.
- Capsule viewer muestra contenido y reconstruye respuestas/feedback.
- responses route guarda `mc_submission`.
- answer form gestiona draft, submit, feedback, autorreporte y finalización.
- complete route guarda autorreporte y completa StudyLoad.
- continuity helper crea siguiente StudyLoad por secuencia fija.
- content registry contiene M1 content y feedback authored/provisional.
- schema sostiene LearningCycle, StudyLoad, Response, SkillState, CycleDecision, etc.

### Desalineaciones

1. Documentación exige continuidad justificada; código actual usa secuencia fija.
2. Documentación exige progreso honesto; UI mantiene placeholders.
3. Documentación exige error interpretation; código guarda respuestas, no taxonomy completa.
4. Documentación exige feedback de calidad; registry es provisional.
5. Documentación ideal habla de supervisión/adaptación; código no debe presentarse como adaptativo.

### Riesgos

- Canonizar comportamiento técnico como si fuera pedagogía completa.
- Sobreprometer inteligencia.
- Diseñar BPCPv1-PAES-M1 desde el código en vez de desde contrato pedagógico.
- Ignorar modelos existentes que pueden servir para v2.
- Mantener copy obsoleto que contradice comportamiento vivo.

---

## 17. Frontend/backend pedagogical consistency

### Qué promete la UI

- Tutoría activa.
- Siguiente cápsula.
- Cápsulas completadas.
- Feedback por pregunta.
- Paso a paso.
- Autorreporte.
- Cápsula finalizada.
- Revisión.
- Progreso/logro.

### Qué sostiene backend/modelos

- Enrollment M1.
- StudyLoad status.
- Responses / `mc_submission`.
- Self-report via Response `answer`.
- Completion.
- Rule-based next StudyLoad.
- Registry content and feedback.
- LearningCycle structure.

### Qué evidencia se guarda

- selected answers;
- contentKey/version;
- answer summary;
- correct count where answer key exists;
- self-report;
- status completed;
- session/cycle linkage.

### Qué feedback se puede sostener

- feedback por pregunta desde registry;
- feedback completo si authored complete feedback existe;
- correctness-based feedback;
- no confirmado: feedback de progreso robusto;
- no confirmado: feedback de continuidad robusto;
- no confirmado: error-class feedback sistemático.

### Qué continuidad está realmente justificada

Actualmente, continuidad está **operativamente justificada** por secuencia fija e idempotencia, pero no todavía **pedagógicamente justificada** por evidencia del estudiante.

Veredicto:

```text
Continuidad CPA actual = contener/corregir antes de BPCPv1-PAES-M1.
```

---

## 18. BPCPv1-PAES-M1 implications

### Obligatorio para BPCPv1-PAES-M1

1. Mantener cápsula visible.
2. Mantener submit manual.
3. Mantener `mc_submission`.
4. Mantener autorreporte manual.
5. Mantener completion manual.
6. Mantener revisión completed.
7. Agregar ficha pedagógica de cápsula.
8. Agregar foco matemático por cápsula.
9. Agregar contrato mínimo de feedback.
10. Agregar contrato mínimo de paso a paso o marcarlo no disponible.
11. Agregar continuidad mínima justificada.
12. Agregar indicadores honestos.
13. Agregar regla de evidencia insuficiente.
14. Agregar límites de inferencia.
15. Agregar audit checklist de cápsula.

### Deseable para BPCPv1-PAES-M1

1. Clasificación inicial de errores.
2. Explicación visible de siguiente cápsula.
3. Matriz desempeño + autorreporte.
4. Feedback de continuidad.
5. Progreso por foco/destreza simple.
6. Registro de revisión como señal.
7. Decision record mínimo.

### Post-v1

1. Motor adaptativo sofisticado.
2. Agentes pedagógicos.
3. Revisión humana integrada.
4. Score PAES estimado.
5. Mastery.
6. Theta.
7. Personalización fina.
8. Multi-tutoría inteligente.
9. M2/L1 funcional.

### Qué no debe entrar todavía

- Adaptive AI claims.
- Puntaje PAES.
- Dominio.
- Rutas avanzadas por perfil.
- Estudiantes reales.
- Pago/trial real.
- L1/M2 readiness.

---

## 19. Pre-BPCPv1-PAES-M1 blockers

Bloqueos antes de derivar o implementar BPCPv1-PAES-M1:

1. **Auditar primera cápsula M1 contra ficha pedagógica.**
2. **Auditar continuity helper y decidir si queda como v0 sequence o se modifica en v1.**
3. **Definir indicadores honestos v1.**
4. **Definir contrato mínimo de `+ paso a paso`.**
5. **Corregir notices obsoletos de content registry.**
6. **Definir si self-report influirá continuidad en v1 o solo se almacena.**
7. **Establecer regla de evidencia insuficiente.**
8. **Determinar mínimos de error taxonomy.**
9. **Auditar contenidos M1 registered.**
10. **Verificar que UI no prometa más que backend.**
11. **Separar continuity técnico de continuity pedagógico.**
12. **Definir qué modelos existentes quedan live vs dormant.**

---

## 20. Readiness for Cápsula 10

### Qué está listo

- circuito UI;
- matrícula M1;
- primera cápsula;
- submit;
- feedback;
- autorreporte;
- completion;
- revisión completed;
- siguiente cápsula técnica;
- content sequence parcial.

### Qué falta

- justificación pedagógica de continuidad;
- auditoría de cápsulas existentes;
- validación de feedback;
- indicadores;
- error taxonomy;
- prueba de no duplicación;
- prueba de progresión no mecánica;
- explicación visible de continuidad;
- validación de secuencia M1.

### Qué debe auditarse

- `study-load-continuity.ts`;
- content registry M1;
- first capsule;
- AS1 corridor;
- PE1 bridge;
- response evidence;
- complete route;
- review completed after multiple capsules;
- dashboard/ST after several completions.

### Qué no debe intentarse

- Cápsula 10 como prueba pedagógica final.
- Estudiantes reales.
- Declarar adaptación inteligente.
- Presentar logro porcentual robusto.
- Activar M2/L1.
- Validar BPCPv1-PAES-M1 por navegación.

---

## 21. Readiness for real student pilot

### Qué está listo

- Experiencia UI base.
- M1 enrollment.
- Primera cápsula.
- Submit manual.
- Feedback inicial.
- Autorreporte.
- Completion manual.
- Revisión completed.
- Siguiente cápsula técnica.

### Qué falta

- BPCPv1-PAES-M1.
- Auditoría de contenido.
- Auditoría de continuidad.
- Indicadores honestos.
- Quality gate pedagógico.
- StudentAccess/trial definido.
- Manejo de fallas.
- Runbook de piloto.
- Protección de datos reales.
- Soporte humano.

### Gate mínimo

Antes de 1–3 estudiantes reales:

1. BPCPv1-PAES-M1 aprobada.
2. Cápsulas iniciales auditadas.
3. Continuidad auditada.
4. Indicadores corregidos.
5. No claims de puntaje/dominio.
6. Runbook de prueba.
7. Política de datos/StudentAccess.
8. Soporte ante errores.
9. Prueba interna multi-cápsula.
10. Decisión humana explícita.

---

## 22. Risks

| Riesgo | Probabilidad | Impacto | Mitigación | Fuente | Recomendación |
|---|---:|---:|---|---|---|
| Continuidad técnica por inercia | Alta | Alta | Definir continuidad mínima v1 | continuity helper | Resolver antes BPCPv1-PAES-M1 |
| Feedback genérico | Media | Alta | Auditar registry | content/answer form | Corregir |
| Paso a paso vacío | Alta | Media-alta | Contrato mínimo | answer form | Corregir |
| Métricas falsas | Alta | Alta | Indicadores permitidos/prohibidos | Dashboard/ST | Corregir |
| Cápsulas sin ficha | Alta | Alta | Ficha obligatoria | M1 blueprint | Agregar |
| Error no interpretado | Alta | Media-alta | Taxonomy mínima | M1 blueprint | Agregar |
| Autorreporte ignorado | Media | Media | Decidir rol v1 | complete route | Contener/corregir |
| UI promete más que backend | Media | Alta | Copy + backend contract | UI/code | Auditar |
| Docs históricos obsoletos | Media | Media | Supersession check | Drive docs | Contener |
| Modelos dormidos confundidos con live | Media | Media | Live/dormant classification | Prisma | Investigar |
| BPCPv1-PAES-M1 demasiado teórica | Media | Alta | CPA reconciliation | all sources | Usar matriz |
| BPCPv1-PAES-M1 demasiado pegada a código actual | Media | Alta | Blueprint governance | blueprints/code | Evitar |

---

## 23. Recommended next conceptual step

No corresponde derivar BPCPv1-PAES-M1 completa inmediatamente sin resolver algunos bloqueos. Pero sí corresponde preparar una fase de **pre-derivación BPCPv1-PAES-M1**, enfocada en los puntos mínimos que desbloquean la derivación.

Siguiente paso recomendado:

```text
MVP-SALES-PILOT-PEDAGOGY-BPCPV1-PAES-M1-PRECONTRACT-1
Define minimum contracts before deriving BPCPv1-PAES-M1
```

Debe resolver:

- ficha mínima de cápsula M1;
- contrato mínimo de continuidad v1;
- contrato mínimo de indicadores honestos;
- contrato mínimo de paso a paso;
- rol de autorreporte en continuidad;
- clasificación live/dormant de modelos pedagógicos;
- qué continuidad actual se canoniza, corrige o contiene.

Alternativa si se quiere seguir más empírico:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-AUDIT-1
Audit current M1 capsules against integrated M1 blueprint
```

No recomendaría aún:

- ejecutar Cápsula 10;
- implementar BPCPv1-PAES-M1;
- invitar estudiantes reales;
- activar M2/L1.

---

## 24. Handoff summary

La CPA tiene una base operativa valiosa, pero debe aprobarse con reservas.  
El circuito M1-first está cerrado y sirve como base.  
Cápsula, submit manual, autorreporte, completion manual y revisión completed deben canonizarse.  
La continuidad actual existe, pero es rule-based/fixed sequence y debe corregirse o contenerse.  
El feedback existe, pero debe auditarse contra contrato M1.  
`+ paso a paso` sigue como deuda crítica-media.  
Los indicadores Ej./Logro/progreso requieren corrección.  
La evidencia `mc_submission` es buena base v1, pero no basta para inferencias fuertes.  
Los modelos backend contienen estructuras pedagógicas más ricas, algunas live y otras dormidas.  
Los documentos históricos SRA/LearningCycle contienen ideas recuperables.  
BPCPv1-PAES-M1 debe incluir ficha de cápsula, evidencia mínima, feedback, autorreporte, revisión, continuidad justificada e indicadores honestos.  
No se debe declarar adaptación inteligente ni puntaje PAES.  
No se debe pasar a estudiantes reales.  
Antes de BPCPv1-PAES-M1 final se deben resolver contratos mínimos o auditar cápsulas M1 actuales.  
La CPA debe reconciliarse, no copiarse ni descartarse.

---

## 25. Final recommendation

**Bexauri debe derivar BPCPv1-PAES-M1 reconciliando la CPA con sus blueprints: canonizar lo que ya convierte interacción en evidencia revisable, corregir la continuidad y los indicadores que aún simulan más pedagogía de la que sostienen, recuperar las mejores ideas históricas de LearningCycle/SRA, y agregar los contratos mínimos que permitan que cada cápsula M1 tenga foco, evidencia, feedback y continuidad pedagógicamente justificable.**
