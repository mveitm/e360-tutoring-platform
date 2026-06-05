# BPCPv1-PAES-M1 — Capa Pedagógica v1 específica para PAES Matemáticas M1

**Fase:** `MVP-SALES-PILOT-PEDAGOGY-BPCPV1-PAES-M1-DERIVATION-1`  
**Naturaleza:** Documento rector pedagógico/gobernanza.  
**Estado:** Derivado documentalmente con bloqueos de implementación.  
**Repo baseline verificado:** `230df5d — MVP-SALES-PILOT-PEDAGOGY-BPCPV1-PAES-M1-PRECONTRACT-1`  
**No autoriza:** implementación, código, DB, schema, continuidad técnica nueva, cápsulas concretas, prueba Cápsula 10, estudiantes reales ni claims comerciales.

---

## 1. Executive verdict

**BPCPv1-PAES-M1 queda derivada como documento rector v1 específico para PAES Matemáticas M1, con bloqueos explícitos de implementación.**

La derivación es válida porque Bexauri ya cuenta con una base pedagógica suficiente: BPCPI como ideal rector, BPTT como gramática transversal de tutorías, Blueprint M1 Integrado como contrato del Gerente Pedagógico M1, CPA-AUDIT-1R como auditoría de reconciliación de la capa actual y BPCPv1-PAES-M1 Precontract como definición de mínimos antes de derivar.

La decisión rectora es:

```text
BPCPv1-PAES-M1 puede gobernar la futura capa pedagógica v1 de PAES Matemáticas M1,
pero no puede ser ejecutada todavía como implementación técnica.
```

La Capa Pedagógica Actual debe reconciliarse: canonizar lo que ya convierte interacción en evidencia revisable, corregir continuidad/indicadores/feedback/paso a paso, contener claims no sustentados, recuperar LearningCycle/SRA con cautela y agregar contratos mínimos antes de cualquier implementación.

---

## 2. Fuentes rectoras usadas

| Fuente | Rol en esta derivación |
|---|---|
| `BPCPI_BLUEPRINT_CANONICO_CAPA_PEDAGOGICA_IDEAL.md` | Define el ideal de Capa Pedagógica como Director Pedagógico sistémico, cuyo mandato es transformar interacción con recursos en aprendizaje guiado, progresivo, evidenciable, revisable y orientado a destrezas reales. |
| `BPTT_BLUEPRINT_PEDAGOGICO_TACTICO_TRANSVERSAL.md` | Define la gramática común de toda tutoría Bexauri: propósito, dominio, progresión, recursos, cápsulas, evidencia, feedback, autorreporte, continuidad, progreso y revisión. |
| `BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md` | Define el contrato del Gerente Pedagógico M1: cápsulas con propósito, foco matemático, evidencia, feedback, ayuda paso a paso, autorreporte, continuidad, progreso, revisión y escalamiento. |
| `CPA_RECONCILIATION_AUDIT_1R_SOURCE_GROUNDED.md` | Concluye que la CPA está aprobada con reservas: debe reconciliarse, no copiarse ni descartarse. |
| `BPCPV1_PAES_M1_PRECONTRACT.md` | Declara `READY_FOR_DERIVATION_WITH_CONDITIONS` y fija mínimos/bloqueos antes de implementación. |
| Prompt/contexto de arranque del usuario | Establece contrato operativo de este hilo y fase de derivación. |

---

## 3. Definición de BPCPv1-PAES-M1

**BPCPv1-PAES-M1** es la derivación v1 específica de la Capa Pedagógica de Bexauri para la tutoría **PAES Matemáticas M1**.

Su función es gobernar cómo Bexauri debe transformar la interacción del estudiante con cápsulas matemáticas M1 en:

```text
foco matemático → tarea → evidencia → feedback → autorreporte → revisión → continuidad
```

Esta derivación no es una implementación. Es el contrato pedagógico rector que permitirá, en una fase posterior, auditar cápsulas, definir continuidad mínima, corregir indicadores, preparar implementación y decidir si corresponde avanzar a prueba multi-cápsula.

---

## 4. Nomenclatura obligatoria

### 4.1 BPCPv1

```text
BPCPv1 = Capa Pedagógica v1 global de Bexauri
```

Debe entenderse como una arquitectura pedagógica global compuesta por tutorías, gerentes pedagógicos y futuros agentes o módulos pedagógicos.

### 4.2 BPCPv1-PAES-M1

```text
BPCPv1-PAES-M1 = derivación v1 específica para PAES Matemáticas M1
```

No equivale a la BPCPv1 global. No gobierna M2, Competencia Lectora, tutorías futuras ni toda la arquitectura pedagógica global.

### 4.3 Regla de no confusión

BPCPv1-PAES-M1 **no declara**:

```text
- BPCPv1 global lista.
- PAES Matemáticas M2 lista.
- PAES Competencia Lectora lista.
- Tutorías skill-oriented listas.
- Sales-Ready.
- Piloto real listo.
- Pago/trial/suscripción activa.
- Adaptive AI.
```

El precontrato ya fija esta frontera: BPCPv1 global y BPCPv1-PAES-M1 no son lo mismo, y la derivación M1 debe circunscribirse a PAES Matemáticas M1.

---

## 5. Alcance rector

BPCPv1-PAES-M1 gobierna:

1. La definición pedagógica de la tutoría PAES Matemáticas M1.
2. La estructura mínima de una cápsula M1.
3. La evidencia mínima aceptable.
4. El feedback mínimo aceptable.
5. La ayuda paso a paso mínima.
6. El autorreporte y su rol.
7. La continuidad v0/v1.
8. La revisión de cápsulas completadas.
9. Los indicadores permitidos, cautelosos y prohibidos.
10. La jerarquía de decisiones operativas y escaladas.
11. Los bloqueos antes de implementación.
12. Los gates antes de Cápsula 10 y estudiantes reales.

BPCPv1-PAES-M1 no gobierna directamente:

```text
- autenticación;
- pagos;
- branding;
- precios;
- planes comerciales;
- schema;
- endpoints;
- UI concreta;
- diseño visual;
- infraestructura;
- deployment;
- roadmap técnico;
- prompts de agentes;
- motor adaptativo;
- banco final de ítems PAES.
```

La capa pedagógica puede influir sobre UI/backend/copy cuando afectan aprendizaje, pero no sustituye esas capas.

---

## 6. Principios heredados de BPCPI

BPCPv1-PAES-M1 hereda del BPCPI estos principios obligatorios:

### 6.1 Aprendizaje no equivale a actividad

Responder ejercicios, completar cápsulas o navegar pantallas no equivale por sí solo a aprender. La actividad se vuelve aprendizaje cuando produce evidencia interpretable, feedback útil, revisión, autorreporte y continuidad justificada.

### 6.2 Toda práctica debe tener propósito

Ninguna cápsula M1 debe existir solo para ocupar tiempo o avanzar una secuencia.

### 6.3 Toda práctica debe producir evidencia

La evidencia debe permitir interpretar algo del desempeño, error, revisión o percepción del estudiante.

### 6.4 Toda evidencia debe tener límites

Una respuesta aislada, un click, una pantalla abierta o un autorreporte sin desempeño no permiten inferencias fuertes.

### 6.5 Todo feedback debe orientar una acción

El feedback no puede reducirse a “correcto/incorrecto”. Debe ayudar a revisar, corregir o avanzar.

### 6.6 Toda continuidad debe tener justificación pedagógica

La siguiente cápsula no debe aparecer por inercia ni simular adaptación si solo sigue una secuencia fija.

### 6.7 Todo progreso debe ser honesto

El progreso no debe inflarse mediante métricas decorativas, porcentajes sin fuente o claims de dominio.

### 6.8 La automatización debe ser supervisable

Toda decisión pedagógica debe poder explicar qué evidencia usó, qué decisión tomó y qué no puede concluir todavía.

Estos principios provienen de los invariantes del BPCPI: práctica con propósito, evidencia interpretable, feedback accionable, continuidad justificada, progreso honesto y límites contra pseudo-inteligencia.

---

## 7. Gramática heredada de BPTT

BPCPv1-PAES-M1 hereda del BPTT la estructura transversal de toda tutoría Bexauri:

| Elemento | Traducción en M1 |
|---|---|
| Propósito | Fortalecer destrezas matemáticas M1 y preparación para tareas tipo PAES M1. |
| Dominio | PAES Matemáticas M1: números, álgebra/funciones, geometría, probabilidad/estadística y destrezas transversales. |
| Progresión | Ruta inicial, práctica focalizada, error, refuerzo, transferencia, integración y revisión. |
| Recursos | Ítems, problemas, explicaciones, diagramas, tablas, gráficos, revisiones, ayudas. |
| Cápsulas | Unidades breves, focalizadas, evidenciables y revisables. |
| Evidencia | Respuestas, errores, patrones, autorreporte, revisión e historial. |
| Feedback | Breve, por pregunta, de cápsula y de continuidad. |
| Autorreporte | Señal metacognitiva complementaria, no decisión única. |
| Continuidad | Avanzar, reforzar, repetir con variación, revisar prerrequisito, cambiar foco o detener inferencia. |
| Progreso | Representación honesta de actividad, revisión y desempeño. |
| Revisión | Acceso a cápsulas completadas, respuestas, feedback y autorreporte. |

El BPTT exige que toda tutoría tenga propósito, evidencia, feedback, autorreporte, continuidad, progreso y revisión, y advierte contra reducir una tutoría a una lista de ejercicios o métricas débiles.

---

## 8. Contrato del Gerente Pedagógico M1

El **Gerente Pedagógico M1** es la autoridad conceptual que traduce BPCPI y BPTT al dominio PAES Matemáticas M1.

No implementa. Define qué debe implementar el nivel operativo y con qué criterios puede hacerlo.

### 8.1 Debe ordenar

- Qué es una tutoría M1 Bexauri.
- Qué es una cápsula M1 aceptable.
- Qué foco matemático debe tener.
- Qué evidencia mínima debe producir.
- Qué errores debe poder interpretar.
- Qué feedback mínimo debe entregar.
- Qué ayuda paso a paso debe sostener.
- Qué autorreporte debe recoger.
- Qué continuidad puede proponer.
- Qué indicadores puede mostrar.
- Qué decisiones puede tomar el nivel operativo.
- Qué decisiones deben escalarse.

### 8.2 Debe rechazar

- Cápsulas sin foco.
- Ejercicios acumulados sin propósito.
- Feedback genérico.
- Métricas decorativas.
- Continuidad sin evidencia.
- Inferencias fuertes desde evidencia débil.
- Claims de dominio, puntaje o adaptividad.
- Cualquier diseño que confunda actividad con aprendizaje.

### 8.3 Debe escalar

- Evidencia contradictoria.
- Error persistente.
- Estancamiento.
- Contradicción fuerte entre desempeño y autorreporte.
- Declaraciones de dominio.
- Cambios radicales de ruta.
- Activación de adaptación sofisticada.
- Expansión a M2/L1.
- Estudiantes reales.
- Uso de agentes pedagógicos.

El Blueprint M1 Integrado establece este rol como contrato del Gerente Pedagógico M1 y exige que el nivel operativo responda por foco, evidencia, feedback, continuidad y límites de inferencia.

---

## 9. Definición de tutoría PAES Matemáticas M1

La tutoría **PAES Matemáticas M1 en Bexauri** es una experiencia de estudio guiado que ayuda al estudiante a desarrollar destrezas matemáticas fundamentales y a enfrentar tareas de formato PAES M1 con mayor comprensión, estrategia y control de errores.

No es:

```text
- una lista de ejercicios PAES;
- un banco de preguntas;
- un simulador aislado;
- una preparación mecánica para puntaje;
- una secuencia automática sin interpretación;
- una medición definitiva del estudiante.
```

Debe sostener:

```text
propósito → foco matemático → evidencia → feedback → autorreporte → revisión → continuidad
```

Su finalidad no es prometer puntaje ni dominio, sino fortalecer destrezas matemáticas reales en una experiencia progresiva, evidenciable y revisable.

---

## 10. Definición de cápsula M1

Una **cápsula M1** es una unidad pedagógica breve, focalizada, evidenciable y revisable, orientada a una tarea matemática concreta o a una familia acotada de tareas.

Una cápsula M1 aceptable:

- Tiene propósito claro.
- Tiene foco matemático explícito.
- Está vinculada a una destreza principal.
- Produce evidencia directa de desempeño.
- Permite interpretar errores con cautela.
- Entrega feedback mínimo útil.
- Ofrece ayuda paso a paso si corresponde.
- Recoge autorreporte.
- Permite revisión.
- Habilita o informa una continuidad posible.
- Declara límites de inferencia.

Una cápsula M1 no aceptable:

- Es una lista arbitraria de preguntas.
- Tiene foco difuso.
- Solo mide aciertos.
- No produce evidencia interpretable.
- Solo entrega “correcto/incorrecto”.
- No puede revisarse.
- No justifica continuidad.
- Promete dominio, puntaje o adaptación.

El Blueprint M1 exige que toda cápsula tenga ficha pedagógica verificable antes de entrar al flujo.

---

## 11. Ficha pedagógica mínima obligatoria de cápsula

Toda cápsula BPCPv1-PAES-M1 debe tener ficha mínima antes de ser considerada v1-ready.

| Campo | Criterio |
|---|---|
| Nombre | Debe reflejar foco o propósito, no solo número. |
| Propósito | Debe expresar qué aprendizaje busca favorecer. |
| Foco matemático | Debe ser específico y auditable. |
| Eje/dominio | Números, álgebra/funciones, geometría, probabilidad/estadística u otro foco M1. |
| Destreza principal | Debe vincularse con la tarea. |
| Tipo de cápsula | Diagnóstico, práctica breve, error típico, refuerzo, transferencia, revisión, etc. |
| Recurso/tarea | Ítem, problema, explicación, diagrama, revisión u otro recurso. |
| Evidencia esperada | Debe indicar qué se observará. |
| Errores esperados | Deben asociarse al foco. |
| Feedback esperado | Debe indicar orientación mínima accionable. |
| Ayuda paso a paso esperada | Debe guiar razonamiento o declarar no disponibilidad. |
| Continuidad posible | Debe indicar qué decisión podría habilitar. |
| Revisión | Debe definir qué podrá revisar el estudiante. |
| Límite de extensión | Debe evitar saturación. |
| Riesgo pedagógico | Debe anticipar qué podría salir mal. |

Una cápsula sin estos campos puede existir como borrador, pero no debe ser declarada **BPCPv1-PAES-M1-ready**.

---

## 12. Contrato de foco matemático

Cada cápsula debe tener **un foco matemático principal dominante**. Puede tener foco secundario, pero si contiene más de dos focos fuertes debe dividirse o rediseñarse.

| Tipo de foco | Evidencia mínima | Riesgo a evitar |
|---|---|---|
| Conceptual | Comprensión o confusión sobre una idea matemática. | Convertirlo en definición pasiva. |
| Procedimental | Aplicación de pasos o algoritmo. | Mecanizar sin comprensión. |
| Lectura matemática | Uso correcto/incorrecto de datos y condiciones. | Confundir con comprensión lectora genérica. |
| Modelación | Traducción de situación a relación matemática. | Exigir formalización excesiva. |
| Representación | Uso o interpretación de gráfico, tabla, diagrama o expresión. | Usar visual sin razonamiento. |
| Error típico | Selección de distractor o patrón de confusión. | Ridiculizar o sobrerrepetir. |
| Transferencia | Uso de destreza en contexto nuevo. | Subir dificultad sin base. |
| Revisión | Uso de feedback o corrección de cápsula previa. | Repetir sin reflexión. |

El contrato M1 define esta matriz de foco y exige que la cápsula tenga foco principal dominante.

---

## 13. Contrato mínimo de evidencia

Toda cápsula M1 debe producir evidencia. Sin evidencia no puede haber feedback confiable ni continuidad pedagógica.

### 13.1 Evidencia obligatoria

Debe existir al menos una evidencia directa de desempeño:

```text
- respuesta seleccionada;
- respuesta abierta;
- procedimiento;
- elección de estrategia;
- interpretación de dato;
- representación producida;
- explicación breve;
- corrección de error;
- revisión posterior.
```

En cápsulas MC, `mc_submission` puede ser la evidencia base v1, pero no basta para inferencias fuertes.

### 13.2 Evidencia deseable

```text
- patrón de error;
- distractor elegido;
- autorreporte;
- revisión de feedback;
- necesidad de ayuda;
- cambio de respuesta;
- historial de cápsulas;
- consistencia por foco.
```

### 13.3 Evidencia insuficiente

No basta con:

```text
- abrir pantalla;
- hacer click;
- permanecer en pantalla;
- completar sin revisar;
- responder una pregunta aislada;
- autorreportar sin desempeño;
- avanzar por navegación.
```

### 13.4 Regla de evidencia insuficiente

```text
Si la evidencia es insuficiente, la decisión pedagógica válida es detener la inferencia,
no inventar continuidad.
```

### 13.5 Niveles de evidencia

| Nivel | Uso permitido |
|---|---|
| Fuerte | Permite decisiones razonables si hay patrón, estabilidad, mejora, transferencia o revisión efectiva. |
| Media | Aporta señal, pero requiere combinación con otras evidencias. |
| Débil | No debe sostener decisiones relevantes por sí sola. |
| Insuficiente | Obliga a detener inferencia o pedir más evidencia. |

El precontrato fija explícitamente que navegación, clicks, permanencia o completitud sin interpretación no pueden sostener progreso ni continuidad pedagógica.

---

## 14. Taxonomía mínima de errores M1

Los errores deben tratarse como **hipótesis pedagógicas**, no como diagnósticos definitivos.

| Error | Señal observable | Feedback mínimo | Inferencia prohibida |
|---|---|---|---|
| Conceptual | Falla en idea central. | Explicar concepto y contraste. | “No sabe matemáticas.” |
| Procedimental | Estrategia correcta, pasos mal ejecutados. | Revisar orden y paso crítico. | “No entiende el concepto.” |
| Lectura | Usa dato incorrecto u omite condición. | Releer pregunta y datos. | “No sabe el contenido.” |
| Modelación | Elige operación/relación incorrecta. | Explicar relación situación-modelo. | “No puede resolver problemas.” |
| Representación | Interpreta mal gráfico/tabla/esquema. | Conectar representación con significado. | “No entiende el eje completo.” |
| Cálculo | Procedimiento adecuado, resultado numérico mal. | Revisar operación y control. | “No domina la destreza.” |
| Estrategia | Camino ineficiente o inadecuado. | Comparar estrategias. | “Pensó mal” como juicio global. |
| Distractor | Alternativa captura confusión típica. | Explicar la trampa o confusión. | “No entendió nada.” |
| Apuro/atención | Error aislado, inconsistente con historial. | Sugerir verificación. | “Tiene baja habilidad.” |

El contrato de errores del Blueprint M1 define esta taxonomía mínima y exige evitar inferencias excesivas desde señales parciales.

---

## 15. Contrato mínimo de feedback

El feedback M1 debe ser útil, específico, proporcional y conectado con la siguiente acción.

### 15.1 Feedback breve

Debe incluir:

```text
estado básico + foco observado + pista accionable
```

No aceptable:

```text
Incorrecto.
```

Aceptable:

```text
La estrategia iba bien, pero revisa el cálculo final.
```

### 15.2 Feedback por pregunta

Debe explicar:

- Por qué la respuesta correcta funciona.
- Qué error pudo aparecer.
- Qué debe revisar el estudiante.
- Cómo se conecta con el foco matemático.

### 15.3 Feedback de cápsula

Debe incluir:

- Foco trabajado.
- Síntesis de desempeño.
- Dificultad principal.
- Acción sugerida.

### 15.4 Feedback de continuidad

Debe explicar por qué viene el siguiente paso.

Formato mínimo:

```text
Como la evidencia mostró ________, conviene ________.
```

### 15.5 Prohibiciones

No debe aceptarse feedback que:

- Solo muestre alternativa correcta.
- Solo diga “bien” o “mal”.
- Entregue solución sin explicación.
- Sea genérico.
- No conecte con foco matemático.
- No sugiera acción posterior.

El contrato M1 define que feedback breve, por pregunta, de cápsula y de continuidad deben ser accionables y conectados con evidencia.

---

## 16. Contrato mínimo de ayuda paso a paso

La ayuda “+ paso a paso” debe funcionar como andamiaje matemático. Su objetivo es reconstruir razonamiento, no entregar solo la respuesta.

Debe guiar:

1. Lectura del enunciado.
2. Datos relevantes.
3. Estrategia.
4. Procedimiento.
5. Verificación.
6. Error posible.
7. Idea transferible.

Si una cápsula no tiene ayuda paso a paso suficiente, debe decir:

```text
Ayuda paso a paso no disponible todavía para esta cápsula.
```

No debe mostrar “Paso a paso” si solo entrega una respuesta, un texto genérico o una solución sin razonamiento.

El precontrato exige contener la ayuda paso a paso cuando no cumple mínimos y prohíbe prometerla vacía.

---

## 17. Contrato mínimo de autorreporte

BPCPv1-PAES-M1 mantiene tres opciones:

```text
- Me fue bien
- Me costó
- No la terminé
```

### 17.1 Rol permitido

El autorreporte debe:

- Almacenarse.
- Mostrarse en revisión.
- Combinarse con desempeño como señal.
- Modificar prudencia de continuidad.
- Aportar metacognición.

### 17.2 Rol prohibido

El autorreporte no debe:

- Decidir continuidad por sí solo.
- Reemplazar evidencia de desempeño.
- Declarar dominio.
- Declarar incapacidad.
- Inferir estado emocional profundo.
- Activar adaptación sofisticada.

### 17.3 Regla

```text
El autorreporte puede modificar la prudencia de la decisión,
pero no reemplazar la evidencia de desempeño.
```

---

## 18. Matriz desempeño + autorreporte

| Caso | Interpretación prudente | Decisión permitida | Decisión prohibida | Continuidad posible |
|---|---|---|---|---|
| Alto desempeño + “Me fue bien” | Señal coherente de seguridad inicial. | Avanzar o transferencia simple. | Declarar dominio. | Siguiente foco o variación. |
| Alto desempeño + “Me costó” | Buen desempeño con baja confianza o alto esfuerzo. | Avanzar con revisión o refuerzo ligero. | Ignorar dificultad subjetiva. | Consolidación o revisión. |
| Bajo desempeño + “Me fue bien” | Posible mala calibración. | Feedback claro y refuerzo. | Avanzar como si dominara. | Error típico, revisión, refuerzo. |
| Bajo desempeño + “Me costó” | Coherencia entre dificultad y desempeño. | Reforzar o repetir con variación. | Cambiar ruta drásticamente. | Refuerzo focalizado. |
| Cápsula incompleta + “No la terminé” | Interrupción o bloqueo. | Retomar o revisar. | Interpretar incapacidad. | Retomar, simplificar o revisar prerrequisito. |
| Evidencia insuficiente + cualquier autorreporte | No hay base suficiente. | Pedir más evidencia. | Adaptar fuertemente. | Diagnóstico breve o ruta inicial contenida. |

Esta matriz se deriva del contrato M1, donde el autorreporte complementa desempeño, pero no decide solo.

---

## 19. Contrato de continuidad v0/v1

La continuidad es la decisión o recomendación sobre qué hacer después. En BPCPv1-PAES-M1 se distinguen dos niveles.

### 19.1 Operational sequence v0

La continuidad actual puede mantenerse como:

```text
operational sequence v0
ruta inicial secuenciada
```

Puede canonizarse:

- Idempotencia.
- No duplicación.
- Creación controlada de siguiente cápsula.
- Secuencia inicial como scaffolding v0.

No puede canonizarse:

- Adaptividad.
- Personalización.
- “Siguiente cápsula más adecuada”.
- Continuidad inteligente.
- Continuidad basada en aprendizaje real si no usa evidencia.

El precontrato autoriza mantener la continuidad actual solo como ruta inicial secuenciada, no como ruta adaptativa personalizada.

### 19.2 Continuidad pedagógicamente justificada v1

BPCPv1-PAES-M1 define las decisiones posibles:

| Decisión | Evidencia mínima | Prohibición |
|---|---|---|
| Avanzar | Buen desempeño en foco + error no crítico + autorreporte compatible o historial compatible. | Declarar dominio. |
| Reforzar | Error interpretable o desempeño parcial. | Reforzar con más de lo mismo indefinidamente. |
| Repetir con variación | Error persistente o comprensión parcial + posibilidad de variación. | Duplicar cápsula. |
| Revisar prerrequisito | Error asociado a base previa necesaria. | Asumir nivel general bajo. |
| Cambiar foco | Señal de que la dificultad proviene de otro foco. | Cambiar eje completo sin historial. |
| Pedir revisión humana | Contradicción, persistencia, estancamiento o decisión de alto impacto. | Resolver con pseudo-adaptación. |
| Detener decisión | Evidencia débil, insuficiente o conflictiva. | Inventar continuidad. |

### 19.3 Explicación mínima de siguiente cápsula

Una siguiente cápsula debe poder completar:

```text
Te proponemos esta cápsula porque la evidencia anterior mostró ________,
por eso conviene ________.
```

Si no puede completarse, la continuidad no está suficientemente justificada.

---

## 20. Contrato de progreso e indicadores

El progreso M1 debe representar avance pedagógico, no acumulación de cápsulas.

### 20.1 Indicadores permitidos

| Indicador | Condición |
|---|---|
| Cápsulas completadas | Solo como actividad, no aprendizaje. |
| Cápsulas revisadas | Útil si se conecta a revisión real. |
| Estado de cápsula | Permitido como estado operativo. |
| Respuestas enviadas | Permitido como evidencia de actividad/desempeño puntual. |
| Autorreporte registrado | Permitido como señal metacognitiva. |
| Desempeño por cápsula | Permitido con contexto. |

### 20.2 Permitidos con cautela

| Indicador | Condición |
|---|---|
| Logro porcentual | Solo si explica qué mide. |
| Progreso por eje | Requiere fuente y evita compartimentos falsos. |
| Progreso por destreza | Requiere clasificación clara. |
| Desempeño por foco | Requiere foco definido. |
| Revisión de feedback | Solo si se registra de forma confiable. |
| Tiempo conectado | Nunca equivale a aprendizaje. |

### 20.3 Prohibidos

```text
- PAES score.
- Dominio.
- Mastery.
- Theta.
- Ranking.
- Progreso global sin fuente.
- Mejora garantizada.
- Nivel no explicado.
- Preparación completa.
- Actividad presentada como aprendizaje.
```

### 20.4 Regla

```text
Si un indicador no puede explicar su fuente,
no debe mostrarse como progreso pedagógico.
```

El precontrato separa indicadores permitidos, cautelosos y prohibidos, y exige que todo indicador explique su evidencia.

---

## 21. Contrato de revisión de cápsulas completadas

La revisión de cápsulas completadas es parte del aprendizaje, no solo historial.

Debe preservar:

- Nombre de cápsula.
- Foco trabajado.
- Respuestas enviadas.
- Feedback por pregunta.
- Feedback de cápsula si existe.
- Autorreporte.
- Estado de completion.
- Ayuda paso a paso si está disponible.
- Continuidad propuesta o explicación de ruta.
- Límites de inferencia.

Debe evitar:

- Reiniciar completed sin control.
- Tratar revisión como simple archivo.
- Ocultar feedback después de finalizar.
- Perder autorreporte.
- Presentar cápsula completada como dominio.

La CPA ya tiene revisión de cápsulas completadas y debe canonizarse porque convierte la cápsula en material revisable.

---

## 22. Regla de lenguaje visible para estudiante

La UI o copy visible debe sostener solo lo que la capa pedagógica puede justificar.

| Permitido | Prohibido |
|---|---|
| “Ruta inicial” | “Ruta adaptativa personalizada” |
| “Siguiente cápsula de la ruta” | “La cápsula más adecuada para ti” |
| “La evidencia sugiere…” | “Ya dominaste…” |
| “Conviene revisar…” | “Tu puntaje PAES sería…” |
| “Aún no tenemos suficiente información…” | “Bexauri sabe exactamente qué necesitas” |
| “Actividad completada” | “Aprendizaje logrado” sin evidencia |
| “Desempeño en esta cápsula” | “Preparación completa” |
| “Ayuda no disponible todavía” | “Paso a paso” vacío |

### Regla general

```text
La UI representa pedagogía; no inventa pedagogía.
```

---

## 23. Clasificación live/dormant/post-v1 de modelos y componentes

BPCPv1-PAES-M1 no debe confundir modelos técnicos existentes con capacidades pedagógicas activas.

### 23.1 Live v1 con límites

| Modelo/componente | Estado rector |
|---|---|
| StudyLoad | Soporte técnico interno de Cápsula. No lenguaje visible. |
| Response | Soporte de evidencia y autorreporte. |
| TutoringSession | Soporte de ejecución. |
| StudentProgramInstance | Soporte de enrollment M1. |
| LearningCycle | Live con límites o v1-light si ya sostiene StudyLoads, sin claim adaptativo. |

### 23.2 Dormant / post-v1

| Modelo/componente | Estado rector |
|---|---|
| SkillState | Dormant/post-v1 hasta usarlo con evidencia real. |
| CycleDecision | Candidate post-v1 o decision record mínimo. |
| CycleEvaluation | Post-v1 si no se usa en flujo actual. |
| ContinuitySignal | Post-v1 o candidate para v1-light. |
| Diagnostic | Post-v1 salvo uso específico documentado. |

### 23.3 Excluidos de claims v1

- Skill mastery.
- Adaptive AI.
- Theta.
- Predictive readiness.
- StudentAccess como gating pedagógico real si no está integrado.
- Preparación PAES.
- Continuidad inteligente.

El precontrato ya clasifica componentes live/dormant/post-v1 y prohíbe convertir modelos ricos en claims activos.

---

## 24. Relación con LearningCycle / SRA

LearningCycle y SRA deben recuperarse con cautela.

### 24.1 Qué se puede recuperar

- Ciclo completo como marco conceptual.
- Apertura de ciclo.
- Snapshot.
- Decisión.
- Carga/cápsula.
- Ejecución.
- Evaluación.
- Cierre/transición.
- Decision records.
- Separación de capas.
- Principio de revisión no bloqueante.

### 24.2 Qué no se puede declarar todavía

- SRA como motor adaptativo activo.
- LearningCycle como regulación inteligente completa.
- SkillState como mastery.
- CycleDecision como continuidad pedagógica robusta.
- Agentes pedagógicos operativos.
- Revisión humana integrada como flujo real si no está implementada.

### 24.3 Forma segura v1

```text
LearningCycle/SRA puede orientar la gobernanza de continuidad,
pero BPCPv1-PAES-M1 solo puede declarar como activo lo que la CPA sostiene.
```

La auditoría recomienda recuperar LearningCycle/SRA, decision records y el principio non-blocking operator, pero con supersession check y sin prometer regulación adaptativa.

---

## 25. Jerarquía de decisiones operativas y escaladas

### 25.1 Decisiones permitidas al nivel operativo

El nivel operativo puede:

- Mostrar cápsula visible.
- Registrar respuesta.
- Registrar `mc_submission`.
- Mostrar feedback breve.
- Mostrar feedback por pregunta si está authored o sustentado.
- Registrar autorreporte.
- Finalizar manualmente.
- Mostrar revisión.
- Mostrar cápsulas completadas.
- Mostrar siguiente cápsula de ruta inicial v0.
- Señalar evidencia insuficiente.
- Usar lenguaje prudente.
- Registrar que una decisión requiere más datos.

Lenguaje recomendado:

```text
Parece que...
Conviene revisar...
La evidencia sugiere...
Todavía no hay suficiente información para...
```

### 25.2 Decisiones que deben escalarse

Deben escalar al Gerente Pedagógico M1 o Director Pedagógico:

- Declarar dominio.
- Declarar incapacidad.
- Cambiar radicalmente de ruta.
- Activar adaptación sofisticada.
- Desbloquear estudiante real.
- Cambiar criterios de tutoría.
- Validar calidad pedagógica global.
- Ignorar contradicción desempeño/autorreporte.
- Decidir con evidencia insuficiente.
- Modificar indicadores.
- Introducir nuevo tipo de cápsula.
- Crear progresiones nuevas.
- Inferir preparación PAES.
- Aprobar expansión a M2/L1.
- Usar agentes sin contrato.

El Blueprint M1 establece que decisiones de trayectoria, interpretación profunda o calidad global deben escalarse.

---

## 26. Matriz canonizar / corregir / contener / agregar / recuperar / excluir / bloquear

| Categoría | Elementos |
|---|---|
| Canonizar | Cápsula visible, circuito M1-first, submit manual, `mc_submission`, autorreporte manual, completion manual, revisión completed, separación Cápsula/StudyLoad, limitaciones explícitas. |
| Corregir | Continuidad fija, indicadores Ej./Logro/progreso, feedback provisional, paso a paso, notices obsoletos, primera cápsula sin ficha, copy adaptativo. |
| Contener | Operational sequence v0, M2/L1 visibles no operativos, trial/suscripción visual, modelos backend ricos, documentos históricos. |
| Agregar | Ficha mínima, foco matemático, evidencia obligatoria, error taxonomy, contrato feedback, contrato paso a paso, continuidad mínima, evidencia insuficiente, indicadores honestos, matriz desempeño/autorreporte. |
| Recuperar | LearningCycle, SRA, decision records, layer-boundary contract, non-blocking operator principle. |
| Excluir | PAES score, mastery, theta, adaptive AI, agentes operativos, M2/L1 readiness, estudiantes reales, pago/trial real, dominio, preparación completa. |
| Bloquear | Implementación, código, DB, schema, continuidad técnica nueva, Cápsula 10 como validación final, piloto real, Sales-Ready, MVP-Beta cerrado completo. |
| Post-v1 | Adaptación sofisticada, agentes, indicadores complejos, análisis longitudinal, personalización fina, multi-tutoría inteligente. |

---

## 27. Auditoría mínima de cápsulas

Antes de considerar una cápsula apta para BPCPv1-PAES-M1, debe responder afirmativamente:

1. ¿Tiene nombre pedagógicamente informativo?
2. ¿Tiene propósito claro?
3. ¿Tiene foco matemático dominante?
4. ¿Tiene eje/dominio definido?
5. ¿Tiene destreza principal?
6. ¿Tiene tipo de cápsula coherente?
7. ¿Tiene recurso/tarea adecuado?
8. ¿Produce evidencia directa de desempeño?
9. ¿Identifica errores esperados?
10. ¿Entrega feedback mínimo útil?
11. ¿Tiene ayuda paso a paso o declara no disponibilidad?
12. ¿Recoge autorreporte?
13. ¿Permite revisión posterior?
14. ¿Define continuidad posible?
15. ¿Declara límite de inferencia?
16. ¿Evita claims de dominio/puntaje?
17. ¿Evita continuidad adaptativa falsa?
18. ¿Tiene extensión acotada?
19. ¿Identifica riesgo pedagógico?
20. ¿Puede ser auditada contra este documento?

---

## 28. Requisito mínimo de auditoría de contenido M1

Antes de implementación o prueba multi-cápsula, debe auditarse:

### 28.1 Primera cápsula

Debe tener:

- Ficha pedagógica.
- Propósito.
- Foco.
- Evidencia esperada.
- Errores esperados.
- Feedback.
- Ayuda paso a paso o deuda explícita.
- Continuidad posible.
- Revisión.

### 28.2 AS1 corridor

Debe responder:

- ¿Es ruta inicial justificada?
- ¿Captura demasiado la tutoría en álgebra/funciones?
- ¿Qué destrezas cubre?
- ¿Qué deja fuera?
- ¿Qué evidencia produce?
- ¿Qué riesgos genera?

### 28.3 PE1 bridge

Debe responder:

- ¿Aparece en momento razonable?
- ¿Requiere prerrequisito?
- ¿Produce evidencia distinta?
- ¿Conecta con representación/probabilidad/datos?
- ¿Evita salto injustificado?

### 28.4 Feedback authored

Debe cumplir contrato mínimo. Si no hay feedback authored suficiente, la cápsula no debe presentarse como pedagógicamente completa.

El precontrato exige auditoría de primera cápsula, AS1 corridor, PE1 bridge, feedback authored, expert-review pending y registry notices antes de considerar contenido apto.

---

## 29. Gates antes de implementación

BPCPv1-PAES-M1 **no habilita implementación**. Para implementar después, se requiere como mínimo:

1. Documento BPCPv1-PAES-M1 aprobado.
2. Ficha mínima de cápsula definida.
3. Continuidad mínima definida.
4. Indicadores definidos.
5. Paso a paso definido o contenido.
6. Contenido inicial auditado.
7. UI copy alineado.
8. Código no promete más que contrato.
9. Feedback mínimo auditado.
10. Regla de evidencia insuficiente incorporada al diseño.
11. Separación continuidad técnica / continuidad pedagógica.
12. Decisión humana explícita de abrir fase técnica.

---

## 30. Gates antes de prueba Cápsula 10

No corresponde usar Cápsula 10 como prueba pedagógica final todavía.

Antes de una prueba multi-cápsula hacia Cápsula 10 se requiere:

1. Continuidad auditada.
2. No duplicación validada.
3. Secuencia inicial validada como v0.
4. Feedback de varias cápsulas auditado.
5. Completed review estable.
6. Indicadores no engañosos.
7. Cápsulas iniciales con ficha.
8. Prueba interna documentada.
9. Observación de progresión, no solo navegación.
10. Registro de rupturas pedagógicas.

La auditoría CPA indica que el circuito UI está listo, pero faltan justificación pedagógica de continuidad, auditoría de cápsulas, validación de feedback, indicadores, error taxonomy y prueba de progresión no mecánica.

---

## 31. Gates antes de estudiantes reales

BPCPv1-PAES-M1 no habilita estudiantes reales.

Antes de 1–3 estudiantes reales se requiere:

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

CPA-AUDIT-1R fija estos gates mínimos antes de estudiantes reales.

---

## 32. Bloqueos explícitos

Quedan bloqueados:

```text
- implementación directa;
- cambios de código;
- cambios de DB;
- cambios de schema;
- continuidad técnica nueva;
- endpoints;
- UI nueva derivada de este documento;
- prompts de agentes;
- motor adaptativo;
- cápsulas concretas;
- Cápsula 10 como prueba pedagógica final;
- estudiantes reales;
- PAES score;
- mastery;
- theta;
- adaptive AI claims;
- M2 readiness;
- L1 readiness;
- pago/trial/suscripción real;
- Sales-Ready;
- MVP-Beta cerrado completo;
- preparación PAES completa;
- dominio;
- inferencias de incapacidad.
```

---

## 33. Deudas explícitas post-v1

Quedan para post-v1 o fases posteriores:

1. Motor adaptativo sofisticado.
2. Agentes pedagógicos.
3. Revisión humana integrada.
4. Indicadores complejos.
5. Análisis longitudinal.
6. Progreso por destreza robusto.
7. Progreso por error robusto.
8. Personalización fina.
9. Rutas avanzadas por perfil.
10. Score PAES estimado, solo si existe modelo válido futuro.
11. Mastery, solo si existe evidencia suficiente y contrato validado.
12. Theta, solo si existe modelo psicométrico válido.
13. Multi-tutoría inteligente.
14. Expansión M2/L1.
15. Tutorías skill-oriented.
16. Expert review completa.
17. Validación con estudiantes reales.

---

## 34. Checklist de implementación futura

Antes de abrir una fase técnica, debe responderse “sí” a:

1. ¿BPCPv1-PAES-M1 está aceptada como documento rector?
2. ¿La implementación propuesta se limita a M1?
3. ¿Cada cápsula inicial tiene ficha mínima?
4. ¿Cada cápsula tiene foco matemático?
5. ¿Cada cápsula produce evidencia directa?
6. ¿El feedback cumple mínimos?
7. ¿El paso a paso cumple mínimos o está contenido?
8. ¿El autorreporte se combina con desempeño?
9. ¿La continuidad diferencia v0 y v1?
10. ¿Se evita adaptividad falsa?
11. ¿Los indicadores son honestos?
12. ¿La revisión completed se preserva?
13. ¿Se evita reinicio de cápsulas completed?
14. ¿Hay límites de inferencia explícitos?
15. ¿Se sabe qué decide el nivel operativo?
16. ¿Se sabe qué debe escalarse?
17. ¿La UI copy no promete más que backend?
18. ¿Los modelos live/dormant están clasificados?
19. ¿No hay PAES score/mastery/theta/adaptive AI?
20. ¿Hay decisión humana explícita para fase técnica?

Si varias respuestas son “no”, no corresponde implementar.

---

## 35. Relación con BPCPv1 global

BPCPv1-PAES-M1 es una derivación específica. Puede informar la futura BPCPv1 global, pero no la reemplaza.

La futura BPCPv1 global deberá integrar derivaciones como:

```text
BPCPv1-PAES-M1
BPCPv1-PAES-M2
BPCPv1-PAES-L1
BPCPv1-SKILL-LECTURA
BPCPv1-SKILL-ESCRITURA
```

Regla:

```text
BPCPv1 global debe componerse a partir de derivaciones específicas auditadas,
no imponerse prematuramente desde M1 como si M1 fuera todo Bexauri.
```

---

## 36. Handoff summary

BPCPv1-PAES-M1 queda derivada como documento rector específico para PAES Matemáticas M1.

La derivación:

- Hereda mandato, invariantes y límites del BPCPI.
- Hereda gramática transversal del BPTT.
- Hereda contrato del Gerente Pedagógico M1.
- Reconciliará CPA, no la copiará ni descartará.
- Canoniza cápsula visible, circuito M1-first, submit manual, `mc_submission`, autorreporte, completion y revisión completed.
- Contiene continuidad actual como `operational sequence v0`.
- Prohíbe declarar adaptividad si solo existe secuencia fija.
- Exige ficha pedagógica mínima de cápsula.
- Exige foco matemático explícito.
- Exige evidencia mínima.
- Exige feedback mínimo.
- Exige ayuda paso a paso real o no disponible.
- Exige regla de evidencia insuficiente.
- Exige indicadores honestos.
- Exige matriz desempeño + autorreporte.
- Exige jerarquía de decisiones operativas/escaladas.
- Recupera LearningCycle/SRA con cautela.
- Clasifica modelos live/dormant/post-v1.
- Bloquea implementación, Cápsula 10, estudiantes reales, PAES score, mastery, theta, adaptive AI, M2/L1 readiness, pago/trial real, Sales-Ready y MVP-Beta cerrado completo.

La siguiente fase natural, después de aceptar este documento, sería una fase Codex estrecha para documentarlo en repo, actualizar handoff/index/phase log y commit/push, sin inventar contenido pedagógico ni iniciar implementación.

---

## 37. Final recommendation

**BPCPv1-PAES-M1 debe ser aceptada como la primera derivación rectora v1 de la capa pedagógica Bexauri para PAES Matemáticas M1, con la condición de que permanezca como documento de gobernanza hasta que cápsulas, continuidad, feedback, indicadores y contenido inicial sean auditados contra este contrato.**

La meta queda fijada:

```text
Construir una versión mínima del sistema correcto,
no una versión pobre de una capa pedagógica.
```

---

## Verdict

```text
BPCPV1_PAES_M1_DERIVED_AS_GOVERNING_DOCUMENT_WITH_IMPLEMENTATION_BLOCKERS
```
