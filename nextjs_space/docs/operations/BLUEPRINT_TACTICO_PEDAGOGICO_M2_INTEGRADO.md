# Blueprint Tactico-Pedagogico PAES Matematicas M2 - Bexauri

## 1. Resumen ejecutivo

Este documento define el Blueprint Tactico-Pedagogico PAES Matematicas M2 - Bexauri, version integrada v0.1. Su proposito es establecer el contrato del Gerente Pedagogico M2: la figura conceptual responsable de traducir el BPCPI y el BPTT al dominio especifico de PAES Matematicas M2.

PAES_M2 no debe implementarse como una simple extension tecnica de M1, ni como una fila de programa en base de datos, ni como una coleccion de ejercicios avanzados. PAES_M2 debe existir como tutoria Bexauri test-oriented con proposito, dominio, progresion, capsulas, evidencia, feedback, autorreporte, revision y continuidad.

La tutoria PAES_M2 en Bexauri busca ayudar al estudiante a desarrollar destrezas matematicas evaluables en M2 mediante practica guiada, evidencia interpretable, feedback util y continuidad pedagogicamente justificada.

Este documento no es implementacion tecnica. No define endpoints, schema, UI, rutas, fixtures, seed scripts, prompts de agentes ni contenido final de todas las capsulas. Es un contrato tactico-pedagogico especifico que gobierna como debe implementarse PAES_M2 sin romper la capa pedagogica canonica de Bexauri.

Resultado rector:

```text
PAES_M2_TACTICAL_PEDAGOGICAL_BLUEPRINT_DERIVED
```

## 2. Relacion con BPCPI y BPTT

### 2.1 Relacion con BPCPI

El BPCPI define la Capa Pedagogica Ideal de Bexauri como marco rector. Presenta al Director Pedagogico Ideal como autoridad conceptual sobre aprendizaje, evidencia, feedback, continuidad, progreso y calidad.

PAES_M2 hereda del BPCPI la idea de que Bexauri no debe confundir actividad con aprendizaje. Resolver ejercicios M2 solo se vuelve pedagogico cuando produce evidencia interpretable, feedback util, revision, autorreporte y continuidad justificada.

### 2.2 Relacion con BPTT

El BPTT define la gramatica transversal de toda tutoria Bexauri. PAES_M2 debe expresar esa gramatica en un dominio test-oriented:

```text
proposito
-> dominio/habilidad
-> progresion
-> recursos
-> capsulas
-> evidencia
-> feedback
-> autorreporte
-> continuidad
-> progreso
-> revision
```

PAES_M2 no necesita un "BPTT de M2". Necesita una derivacion especifica desde BPTT.

### 2.3 Relacion con roadmap/microroadmap transversal

PAES_M2 debe distinguir:

```text
secuencia simple
roadmap maestro M2
microroadmap vivo del estudiante
```

M2-C01 puede formar parte de una secuencia simple inicial. No basta para declarar roadmap maestro M2 ni microroadmap vivo.

## 3. Rol del Gerente Pedagogico M2

El Gerente Pedagogico M2 es la autoridad conceptual que traduce el Director Pedagogico Ideal y el BPTT al dominio PAES Matematicas M2.

Debe ordenar:

- que es una tutoria M2 Bexauri;
- que familias de destrezas M2 se priorizan;
- que capsulas M2 son aceptables;
- que evidencia produce cada capsula;
- que feedback minimo exige;
- que estimulos visuales o matematicos son necesarios;
- que continuidad puede proponerse;
- que limites de inferencia deben respetarse;
- que decisiones deben escalarse.

Debe supervisar coherencia entre capsulas M2, foco matematico, tratamiento del error, calidad de feedback, pertinencia de graficos, tablas, figuras y notacion, continuidad entre capsulas, relacion entre desempeno y autorreporte, y ausencia de claims de score, dominio, readiness o adaptive AI.

Debe rechazar capsulas M2 sin foco, ejercicios acumulados sin proposito, feedback generico, visual stimuli incorrectos o no auditados, continuidad sin justificacion, inferencias fuertes desde evidencia debil y claims de preparacion completa o puntaje probable.

## 4. Definicion de la tutoria PAES Matematicas M2 en Bexauri

La tutoria PAES Matematicas M2 en Bexauri es una experiencia de estudio guiado para desarrollar destrezas matematicas evaluables en PAES_M2, mediante capsulas focalizadas, evidencia interpretable, feedback breve/completo, autorreporte, revision y continuidad pedagogica.

No es una lista de ejercicios dificiles, una extension automatica de M1, un banco de preguntas M2, un simulador de prueba, una promesa de puntaje, una preparacion completa declarada, una ruta adaptativa inteligente ni una fila tecnica `Program`.

Es una tutoria test-oriented que usa el formato PAES como contexto, pero cuyo proposito pedagogico es desarrollar razonamiento, modelacion, interpretacion, representacion y control de errores matematicos.

## 5. Principio rector operativo M2

Toda implementacion M2 debe obedecer este principio:

> Cada capsula M2 debe convertir una interaccion matematica de mayor complejidad en evidencia interpretable, feedback util y una decision de continuidad pedagogicamente justificable.

Cadena operativa minima:

```text
foco matematico
-> tarea
-> evidencia
-> feedback
-> autorreporte
-> revision
-> continuidad
```

## 6. Que significa aprender M2 en Bexauri

Aprender M2 en Bexauri no significa responder correctamente un item aislado. Significa desarrollar destrezas matematicas que permiten enfrentar tareas M2 con comprension, precision, modelacion, representacion y control de errores.

En M2, aprender implica reconocer estructuras matematicas, modelar situaciones, interpretar funciones, datos o representaciones, elegir procedimientos adecuados, revisar consistencia de resultados, distinguir informacion relevante de distractores, usar notacion y representacion con claridad, y transferir estrategias a variaciones.

La evidencia M2 es delicada porque una respuesta correcta puede surgir por calculo mecanico, descarte o coincidencia. Por eso el feedback y la revision deben ser especialmente claros.

## 7. Familias/ejes iniciales de destrezas M2

La rama M2 debe organizarse inicialmente en familias de destrezas, no solo en temas.

Familias iniciales recomendadas:

1. Modelacion algebraica y funcional: expresiones, funciones, relaciones entre variables e interpretacion de parametros.
2. Funciones y representacion: lectura de funciones, cambios de representacion, tabla, expresion, grafico, pendiente, intercepto y comportamiento.
3. Datos, probabilidad y estadistica: interpretacion de datos, medidas de tendencia, probabilidad basica o compuesta segun alcance, lectura de tablas y graficos.
4. Geometria y medicion: area, perimetro, volumen si corresponde, figuras planas, relaciones geometricas e interpretacion visual.
5. Razonamiento matematico y control de errores: validacion de resultados, deteccion de supuestos, comparacion de estrategias y errores tipicos.

Estas familias no declaran cobertura oficial completa. Son una estructura inicial para pilotaje y diseno authored.

## 8. Tipos de capsulas M2

PAES_M2 puede usar capsulas de modelacion, interpretacion, procedimiento con sentido, contraste de errores, representacion y refuerzo.

Todas deben ser breves, cerrables y con maximo 4 ejercicios en M2. Las capsulas de refuerzo se usan cuando la evidencia sugiere brecha puntual, sin declarar diagnostico fuerte.

## 9. Evidencia pedagogica M2

Evidencia minima:

- opcion elegida;
- acierto/error;
- patron de error por item;
- relacion con distractor;
- revision de feedback;
- autorreporte;
- completitud de capsula.

La evidencia M2 permite inferir hipotesis debiles sobre comprension del procedimiento, interpretacion de enunciado, modelacion, lectura de representacion, control de calculo y atencion a condiciones.

No permite declarar dominio estable, puntaje probable, readiness PAES, mastery, adaptacion inteligente ni diagnostico definitivo.

## 10. Feedback M2

El feedback M2 debe ser mas que confirmacion de respuesta. Debe ayudar al estudiante a comprender la estructura del problema.

Feedback breve debe orientar la idea clave, senalar el dato o relacion central, evitar key-check-only y ser comprensible y accionable.

Feedback completo debe restituir que se pedia, identificar datos o relaciones relevantes, resolver paso a paso, justificar la alternativa correcta, explicar un error tipico o distractor cuando corresponda, conectar con la habilidad M2 y referenciar tabla, grafico, figura o expresion si aplica.

Feedback M2 no debe usar lenguaje interno, prometer adaptacion, declarar dominio, ser generico ni contradecir estimulos o claves.

## 11. Autorreporte y metacognicion M2

M2 debe recoger autorreporte porque el estudiante puede acertar sin estar seguro o fallar por carga cognitiva, lectura o representacion.

Autorreporte minimo:

- percepcion de dificultad;
- seguridad;
- necesidad de ayuda;
- comprension del feedback;
- disposicion a avanzar/reforzar.

El autorreporte no reemplaza el desempeno. Complementa la evidencia.

## 12. Continuidad pedagogica M2

La continuidad M2 debe ser prudente. En la fase inicial puede existir secuencia simple M2.

No declarar todavia roadmap maestro M2 completo, microroadmap vivo M2, adaptacion inteligente, selector automatico ni mastery.

Continuidad inicial puede justificar avanzar a capsula siguiente, reforzar una familia, revisar feedback, pausar por falta de evidencia o escalar a revision humana.

Toda continuidad debe decir que evidencia la justifica y que no puede afirmar.

## 13. Roadmap maestro M2 y microroadmap vivo

El roadmap maestro M2 debe existir antes de declarar cobertura M2 sostenida. Debe mapear familias/ejes, nodos, prerrequisitos, niveles de complejidad, tipos de item, visual stimuli requeridos, errores frecuentes, cobertura y criterios de avance/refuerzo/revision.

En esta fase, M2 todavia no tiene roadmap maestro completo.

El microroadmap vivo M2 no se declara todavia. Podra existir cuando haya evidencia acumulada suficiente por estudiante. M2-C01 no basta para microroadmap vivo.

## 14. Estimulos visuales, tablas, graficos, figuras y LaTeX

PAES_M2 debe respetar los estandares visuales y FigureSpec/QA ya aceptados.

Reglas:

- Si la tarea depende de una tabla, la tabla debe estar visible y formateada.
- Si depende de un grafico, debe existir grafico confiable o representacion auditada.
- Si depende de una figura geometrica, la figura debe ser precisa o indicar que no esta a escala.
- Si depende de notacion matematica ambigua en texto plano, requiere render/LaTeX o solucion textual inequivoca.
- La IA puede ayudar a redactar specs, pero no producir visual final no auditado.

M2 debe evitar ejercicios visualmente dependientes si aun no existe soporte confiable.

## 15. Limites de inferencia y claims prohibidos

PAES_M2 no puede declarar puntaje probable, dominio, readiness, cobertura completa, preparacion total, adaptive AI, equivalencia con prueba oficial, diagnostico definitivo ni Sales-Ready publico.

Puede declarar capsula completada, feedback revisable, evidencia registrada, practica guiada inicial, secuencia simple inicial y cobertura authored parcial dentro del roadmap de implementacion.

## 16. Relacion con M2-C01 ya implementada

M2-C01 es el primer artefacto authored PAES_M2, prueba de que se puede crear una capsula M2 bajo estandar, candidata a smoke inicial y util para validar content registry, feedback y UI cuando exista acceso.

M2-C01 no es tutoria M2 completa, roadmap maestro M2, piloto cerrado completo, Sales-Ready, agentic-ready ni prueba de cobertura M2.

## 17. Condiciones antes de implementacion tecnica

Antes de crear/alinear `Program PAES_M2`:

- este blueprint debe estar documentado;
- el precontrato BPCPv1-PAES-M2 debe existir;
- el governing document BPCPv1-PAES-M2 debe existir;
- el indice de rama M2 debe existir;
- la operacion debe ser local/dev;
- no debe tocar prod/staging;
- no debe tocar schema;
- no debe crear enrollment en la misma fase;
- no debe modificar M2-C01;
- no debe abrir agentic.

## 18. Resultado rector

```text
BLUEPRINT_TACTICO_PEDAGOGICO_M2_INTEGRADO_ACCEPTED
```
