# BPCPv1-PAES-M1 - Ficha pedagogica de capsula inicial balanceada

**Fase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-FICHA-1`
**Naturaleza:** Ficha pedagogica BPCPv1-PAES-M1.
**Alcance:** Gobernanza pedagogica/documental. No implementacion.
**Capsula:** `PAES M1 - Entrada balanceada inicial`
**contentKey:** `paes_m1_balanced_entry_initial`

---

## 1. Executive verdict

```text
FIRST_M1_BALANCED_CAPSULE_FICHA_DERIVED_WITH_IMPLEMENTATION_BLOCKERS
```

La primera capsula M1 de Bexauri queda derivada como **capsula de senal inicial balanceada**, no como diagnostico, no como placement, no como predictor de puntaje y no como decision adaptativa fuerte.

La capsula:

```text
PAES M1 - Entrada balanceada inicial
contentKey: paes_m1_balanced_entry_initial
```

debe cumplir este rol pedagogico:

```text
abrir senales amplias,
iniciar la ventana de calibracion distribuida,
producir evidencia inicial limitada,
entregar feedback orientado a revision,
recoger autorreporte,
declarar limites de inferencia,
y preparar capsulas 2-6 como calibracion amplia temprana.
```

La ficha no autoriza implementacion. No autoriza editar registry, UI, continuidad, DB, schema, endpoints ni codigo. Define el contrato pedagogico que una futura fase tecnica o de contenido debera leer antes de implementar o modificar la capsula.

La decision central es:

```text
La capsula 1 abre hipotesis.
No cierra diagnostico.
```

---

## 2. Source access

### 2.1 Fuente de encargo

Esta derivacion responde al prompt de fase `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-FICHA-1`, que exige disenar la primera capsula como senal inicial balanceada, inicio de ventana de calibracion y no diagnostico suficiente.

### 2.2 Documentos canonicos leidos

```text
nextjs_space/docs/operations/BPCPI_BLUEPRINT_CANONICO_CAPA_PEDAGOGICA_IDEAL.md
nextjs_space/docs/operations/BPTT_BLUEPRINT_PEDAGOGICO_TACTICO_TRANSVERSAL.md
```

BPCPI establece que la interaccion del estudiante debe convertirse en experiencia guiada, progresiva, evidenciable y revisable; BPTT define la gramatica comun de tutorias con proposito, progresion, capsulas, evidencia, feedback, autorreporte, continuidad, progreso y revision.

### 2.3 Contrato transversal leido

```text
nextjs_space/docs/operations/BPTT_ROADMAP_AND_LIVING_MICROROADMAP_TRANSVERSAL_CONTRACT.md
```

Esta ficha hereda de este contrato la distincion entre secuencia simple, roadmap maestro y microroadmap vivo. Tambien hereda la regla de que toda decision pedagogica debe declarar documentos leidos, fuentes que mandan, fuentes faltantes y decisiones limitadas por fuentes no leidas.

### 2.4 Documentos especificos M1 leidos

```text
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_EARLY_SEQUENCING_STRATEGY.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_AUDIT_1A_SOURCE_GROUNDED_CURRENT_CAPSULES_AGAINST_BPCPV1_PAES_M1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_AUDIT_1B_PRO_PEDAGOGICAL_REVIEW_OF_1A.md
```

Esta ficha hereda especialmente de `BPCPV1_PAES_M1_EARLY_SEQUENCING_STRATEGY.md`: Bexauri calibra mientras ensena, la primera capsula abre senales y no diagnostica, y las primeras 15-20 capsulas son una ventana orientativa de calibracion distribuida, no un gate rigido.

### 2.5 Fuentes oficiales y taxonomia M1 leidas

```text
nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md
```

El source register M1 registra que PAES M1 evalua Resolver problemas, Modelar, Representar y Argumentar, y que los conocimientos se organizan en Numeros, Algebra y funciones, Geometria, Probabilidad y estadistica; tambien registra el marco de 65 preguntas, 60 usadas para puntaje, 4 opciones y duracion de 2h20m.

### 2.6 Documentos de continuidad operativa leidos

```text
PHASE_LOG.md tail
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
```

### 2.7 Fuentes no disponibles

```text
No se usa DB real.
No se usa runtime.
No se usa historial real de estudiantes.
No se usa validacion experta externa de items.
No se implementa contenido authored real en registry.
```

Por tanto, esta ficha define contrato pedagogico; no valida una capsula implementada como BPCPv1-ready.

---

## 3. Definicion de la capsula

### 3.1 Nombre pedagogico

```text
PAES M1 - Entrada balanceada inicial
```

### 3.2 contentKey

```text
paes_m1_balanced_entry_initial
```

### 3.3 Tipo de capsula

```text
Capsula de senal balanceada inicial.
```

### 3.4 Definicion breve

La capsula es una unidad inicial breve que presenta al estudiante cuatro microcontactos matematicos de baja a moderada friccion, distribuidos en zonas relevantes del roadmap maestro M1, para abrir senales iniciales de desempeno, error, confianza y revision.

No es una prueba diagnostica.
No es una medicion de nivel.
No es una estimacion PAES.
No es un selector adaptativo.
No es una capsula de dominio.

### 3.5 Formula rectora

```text
senal inicial -> feedback -> autorreporte -> revision -> continuidad prudente
```

---

## 4. Proposito y no-proposito

### 4.1 Proposito

La capsula existe para:

```text
abrir senales amplias del estudiante frente a PAES M1,
iniciar la experiencia de aprendizaje,
producir evidencia MC limitada,
activar feedback inicial,
recoger autorreporte,
y preparar una calibracion amplia temprana en capsulas 2-6.
```

Debe ayudar a observar senales iniciales en:

```text
- Numeros / porcentaje / racionalidad;
- Algebra y funciones / ecuacion o relacion;
- Geometria / area, medida o representacion espacial;
- Probabilidad y estadistica / datos, grafico o probabilidad basica.
```

### 4.2 No-proposito

La capsula no existe para:

```text
- diagnosticar nivel M1;
- clasificar al estudiante;
- decidir ruta personalizada fuerte;
- declarar dominio;
- estimar PAES score;
- calcular mastery;
- calcular theta;
- activar adaptive AI;
- demostrar cobertura M1;
- decidir que un eje esta dominado o perdido;
- sustituir la ventana 1-20 de calibracion pedagogica.
```

### Regla

```text
La capsula 1 abre senales amplias.
No ubica al estudiante con precision.
```

---

## 5. Rol dentro de la ventana de calibracion 1-20

La capsula 1 es el inicio de la ventana de calibracion pedagogica distribuida definida por M1-SEQUENCING-1.

Su rol es:

```text
abrir la primera hipotesis pedagogica,
no estabilizar el microroadmap vivo.
```

La ventana 1-20 debe interpretarse como tramo orientativo, no gate rigido. La capsula 1 solo aporta la primera capa de evidencia.

### Lo que habilita

Despues de esta capsula, Bexauri puede:

```text
- registrar primeras senales;
- observar confianza inicial;
- detectar una alerta gruesa;
- ofrecer feedback de revision;
- sugerir una siguiente capsula de ruta inicial prudente;
- planificar capsulas 2-6 como calibracion amplia temprana.
```

### Lo que no habilita

Despues de esta capsula, Bexauri no puede:

```text
- declarar diagnostico;
- declarar eje fuerte/debil;
- personalizar ruta en sentido fuerte;
- saltar a continuidad adaptativa;
- cerrar el microroadmap del estudiante;
- inferir preparacion PAES.
```

---

## 6. Ficha pedagogica minima

| Campo | Definicion BPCPv1 |
|---|---|
| Nombre | PAES M1 - Entrada balanceada inicial |
| contentKey | `paes_m1_balanced_entry_initial` |
| Tipo de capsula | Senal balanceada inicial |
| Proposito | Abrir senales amplias en M1 e iniciar calibracion distribuida |
| No-proposito | Diagnostico, placement, score, dominio, adaptive AI |
| Foco principal | Observacion balanceada inicial de desempeno matematico M1 |
| Focos secundarios | Porcentaje/racionalidad; ecuacion/relacion; geometria/medida; datos/probabilidad |
| Ejes tocados | Numeros; Algebra y funciones; Geometria; Probabilidad y estadistica |
| Destrezas PAES observadas | Resolver problemas; Representar; Modelar; eventualmente Argumentar de forma minima si hay justificacion |
| Recurso/tarea | Cuatro items o microcontactos MC con feedback y revision |
| Evidencia esperada | Respuesta seleccionada, acierto/error, distractor, foco del item, autorreporte, revision |
| Evidencia insuficiente | Una respuesta aislada, completitud, click, tiempo, autorreporte sin desempeno |
| Feedback esperado | Por pregunta, especifico, orientado a revision |
| Paso a paso esperado | Lectura, datos, estrategia, procedimiento, verificacion, error posible, idea transferible |
| Autorreporte | "Me fue bien", "Me costo", "No la termine" u opciones equivalentes aceptadas |
| Revision | Debe permitir volver a items, feedback, autorreporte y ayuda disponible |
| Continuidad posible | Ruta inicial prudente hacia calibracion amplia, no adaptacion |
| Continuidad prohibida | "La capsula mas adecuada para ti", ruta personalizada, avance fuerte |
| Riesgo principal | Sobreinferir desde 4 items |
| Estado | Ficha pedagogica derivada; implementacion bloqueada |

---

## 7. Foco matematico y ejes tocados

### 7.1 Que significa "balanceada"

"Balanceada" significa que la capsula evita que la primera senal del estudiante provenga solo de un eje o de un tipo de tarea.

No significa cobertura completa.

Debe balancear:

```text
- eje matematico;
- tipo de razonamiento;
- tipo de representacion;
- nivel de friccion;
- oportunidad de error interpretable;
- posibilidad de feedback util.
```

### 7.2 Balance minimo esperado

| Microcontacto | Eje/familia | Funcion |
|---|---|---|
| Item 1 | Numeros / porcentaje / racionalidad | Observar manejo numerico contextual basico |
| Item 2 | Algebra y funciones / ecuacion o relacion | Observar estructura simbolica o relacion simple |
| Item 3 | Geometria / area o medida | Observar representacion espacial o medicion |
| Item 4 | Probabilidad y estadistica / datos, grafico o probabilidad basica | Observar interpretacion de datos o razonamiento probabilistico simple |

### 7.3 Foco principal

```text
Observacion inicial balanceada de senales matematicas M1.
```

### 7.4 Focos secundarios

```text
- calculo contextual;
- lectura matematica;
- representacion;
- modelacion simple;
- seleccion de estrategia;
- interpretacion de resultado;
- autorreporte de dificultad.
```

---

## 8. Destrezas PAES observadas

La capsula puede observar senales iniciales de estas destrezas:

| Destreza | Como aparece en la capsula | Limite |
|---|---|---|
| Resolver problemas | Elegir estrategia y respuesta en item contextual | No permite afirmar habilidad estable |
| Modelar | Traducir situacion a operacion, ecuacion o relacion | Senal muy inicial |
| Representar | Leer tabla, grafico, figura, expresion o relacion | No basta para declarar dominio de representacion |
| Argumentar | Puede aparecer solo de forma indirecta si el item exige justificar mentalmente | No debe declararse si no hay produccion explicita |

### Regla

```text
La capsula puede observar senales de destreza.
No puede certificar destrezas.
```

---

## 9. Evidencia esperada

La evidencia esperada es limitada pero util.

Debe incluir:

```text
- alternativa seleccionada;
- correctness si existe answer key;
- distractor elegido;
- foco del item;
- eje del item;
- tipo de error esperado;
- autorreporte;
- finalizacion manual;
- posibilidad de revision posterior.
```

Evidencia deseable si una futura fase la define:

```text
- si reviso feedback;
- si abrio paso a paso;
- si cambio respuesta antes de enviar;
- si demoro excesivamente, solo con cautela;
- si pidio ayuda;
- si el autorreporte contradice desempeno.
```

### Evidencia que si puede producir

```text
- senal inicial de desempeno por microcontacto;
- posible alerta en eje;
- posible alerta en lectura/modelacion;
- primera calibracion desempeno/autorreporte;
- primera senal de uso de revision.
```

### Evidencia que no puede producir

```text
- nivel M1 estable;
- diagnostico por eje;
- dominio;
- mastery;
- theta;
- score;
- preparacion PAES;
- ruta personalizada;
- equivalencia con prueba real.
```

---

## 10. Evidencia insuficiente

No basta con:

```text
- completar la capsula;
- responder 4 items;
- acertar todos los items;
- fallar todos los items;
- seleccionar una opcion aislada;
- decir "me fue bien";
- decir "me costo";
- abrir o no abrir ayuda;
- revisar o no revisar una vez.
```

### Regla de inferencia

```text
Una capsula de 4 items produce senal.
No produce diagnostico.
```

### Regla de decision

```text
Si la evidencia es insuficiente, la continuidad valida es prudente:
seguir calibrando, no personalizar fuerte.
```

---

## 11. Errores esperados

La capsula debe anticipar errores por tipo de microcontacto.

| Microcontacto | Error esperado | Senal pedagogica | Inferencia prohibida |
|---|---|---|---|
| Numeros / porcentaje | Confundir base, porcentaje, parte-todo, operacion | Posible brecha en razonamiento proporcional o calculo contextual | "No sabe numeros" |
| Algebra / ecuacion | Operacion inversa incorrecta, manejo de signos, lectura de incognita | Posible brecha en ecuacion o prerrequisito aritmetico | "No entiende algebra" |
| Geometria / area | Confundir perimetro/area, usar dato irrelevante, interpretar mal figura | Posible brecha de medida o representacion | "No sabe geometria" |
| Datos/probabilidad | Leer mal tabla/grafico, confundir frecuencia/probabilidad, contar casos mal | Posible brecha de representacion o probabilidad basica | "No entiende estadistica" |
| Transversal | Error de lectura, apuro, mala interpretacion de consigna | Posible dificultad de lectura matematica o atencion | "Tiene baja habilidad" |

### Regla

```text
Todo error es hipotesis pedagogica.
Ningun error aislado es diagnostico.
```

---

## 12. Contrato de feedback

El feedback de esta capsula debe evitar ser solo correcto/incorrecto.

Este apartado define un **contrato pedagogico de feedback**, no la redaccion final de feedback authored ni contenido listo para registry. Una fase futura de `M1-CAPSULE-FEEDBACK-1` o equivalente debera redactar, revisar y aceptar los textos authored antes de cualquier implementacion.

Debe cumplir tres niveles:

```text
1. Feedback breve por item.
2. Feedback explicativo por pregunta.
3. Feedback de capsula.
```

### 12.1 Feedback breve esperado

Debe contener:

```text
- estado basico;
- foco del item;
- pista de revision.
```

Ejemplo de formato:

```text
Tu respuesta muestra una primera senal sobre [foco]. Revisa especialmente [dato/operacion/representacion].
```

No aceptable:

```text
Correcto.
Incorrecto.
Revisa.
Buen trabajo.
```

### 12.2 Feedback por pregunta esperado

Debe responder:

```text
- que se preguntaba;
- que informacion era clave;
- que estrategia convenia;
- por que la respuesta correcta funciona;
- que error pudo llevar a un distractor;
- que idea conviene revisar.
```

### 12.3 Feedback de capsula esperado

Debe decir:

```text
- que fue una entrada balanceada;
- que senales aparecieron;
- que la evidencia aun es inicial;
- que conviene observar en proximas capsulas;
- que no se puede concluir todavia.
```

Ejemplo de intencion:

```text
Esta capsula abrio primeras senales en distintos focos de M1. Todavia no basta para diagnosticar tu nivel, pero si ayuda a decidir que conviene observar en las proximas capsulas.
```

### 12.4 Feedback prohibido

No debe decir:

```text
- ya dominas este eje;
- tu nivel es;
- tu puntaje seria;
- la ruta ideal para ti es;
- esta capsula diagnostico tus fortalezas;
- necesitas reforzar todo un eje;
- estas listo/no listo para PAES.
```

---

## 13. Contrato de ayuda paso a paso

La ayuda "+ paso a paso" debe funcionar como andamiaje matematico.

Para esta capsula, cada microcontacto debe tener ayuda que incluya:

```text
1. Lectura de enunciado.
2. Datos relevantes.
3. Estrategia.
4. Procedimiento.
5. Verificacion.
6. Error posible.
7. Idea transferible.
```

Si no existe ayuda paso a paso authored, la capsula no debe prometerla como disponible.

### 13.1 Paso a paso para item de Numeros / porcentaje

Debe guiar:

```text
- identificar la cantidad base;
- distinguir parte, total y porcentaje;
- elegir operacion;
- calcular con cuidado;
- verificar si el resultado tiene sentido;
- advertir error tipico: calcular porcentaje sobre la base incorrecta;
- dejar idea transferible: siempre identifica "de que cantidad" se calcula el porcentaje.
```

### 13.2 Paso a paso para item de Algebra / ecuacion

Debe guiar:

```text
- identificar la incognita;
- traducir la relacion;
- aplicar operacion inversa;
- controlar signos o coeficientes;
- verificar sustituyendo;
- advertir error tipico: despejar sin mantener equivalencia;
- dejar idea transferible: una ecuacion conserva equilibrio entre ambos lados.
```

### 13.3 Paso a paso para item de Geometria / area

Debe guiar:

```text
- identificar figura y datos;
- distinguir area, perimetro u otra magnitud;
- elegir formula o relacion;
- sustituir datos;
- verificar unidades;
- advertir error tipico: confundir perimetro con area;
- dejar idea transferible: primero pregunta que magnitud se pide.
```

### 13.4 Paso a paso para item de Datos / probabilidad

Debe guiar:

```text
- leer tabla, grafico o espacio muestral;
- identificar que se cuenta o compara;
- separar casos favorables y totales si aplica;
- calcular o interpretar;
- verificar coherencia;
- advertir error tipico: leer el eje equivocado o contar casos repetidos;
- dejar idea transferible: antes de calcular, define que representa cada dato.
```

### 13.5 Paso a paso prohibido

No debe:

```text
- entregar solo respuesta;
- saltarse lectura;
- no explicar estrategia;
- mostrar procedimiento sin sentido;
- usar lenguaje inaccesible;
- convertir el paso a paso en clase larga;
- sugerir incapacidad del estudiante.
```

---

## 14. Contrato de autorreporte

El autorreporte debe recoger como vivio el estudiante la capsula.

Opciones minimas:

```text
- Me fue bien.
- Me costo.
- No la termine.
```

Puede usarse como senal de:

```text
- confianza;
- frustracion;
- esfuerzo percibido;
- bloqueo;
- calibracion;
- disposicion a continuar.
```

No puede usarse como decision unica.

### 14.1 Lecturas prudentes

| Desempeno | Autorreporte | Interpretacion prudente |
|---|---|---|
| Alto | Me fue bien | Senal coherente, pero no dominio |
| Alto | Me costo | Buen desempeno con posible esfuerzo alto o baja confianza |
| Bajo | Me fue bien | Posible mala calibracion; requiere feedback claro |
| Bajo | Me costo | Dificultad coherente; conviene observar/reforzar |
| Incompleto | No la termine | Interrupcion o bloqueo; no incapacidad |

### Regla

```text
El autorreporte ajusta prudencia.
No reemplaza evidencia.
```

---

## 15. Contrato de revision

La revision posterior debe permitir al estudiante volver a:

```text
- cada item;
- alternativa elegida;
- respuesta correcta si corresponde;
- feedback por pregunta;
- ayuda paso a paso si existe;
- autorreporte;
- feedback de capsula.
```

La revision debe servir para aprender, no solo para mirar historial.

### Revision esperada

Debe permitir que el estudiante entienda:

```text
- que foco se observo;
- que dato era importante;
- que error pudo aparecer;
- como revisar el razonamiento;
- por que todavia no se puede sacar una conclusion fuerte.
```

---

## 16. Contrato de continuidad posible

Despues de esta capsula, la continuidad posible debe ser prudente.

Puede sugerir:

```text
- seguir con calibracion amplia temprana;
- pasar a una capsula de ecuaciones basicas si forma parte de ruta inicial;
- abrir capsula de porcentaje/proporcionalidad si hubo senal numerica debil;
- abrir capsula de lectura de datos/graficos si hubo senal de representacion;
- abrir capsula de geometria basica si conviene cobertura;
- ofrecer revision si hubo bajo desempeno o autorreporte de dificultad.
```

Pero debe presentarse como:

```text
siguiente capsula de la ruta inicial,
capsula para seguir observando,
capsula para revisar una senal inicial,
calibracion amplia temprana.
```

No como:

```text
la capsula mas adecuada para ti,
ruta personalizada,
adaptacion inteligente,
diagnostico de tu nivel.
```

### Formula permitida

```text
Como esta primera capsula solo abre senales iniciales, seguiremos con otra capsula de calibracion para observar mejor tu ruta de estudio.
```

### Formula prohibida

```text
Segun tu diagnostico, esta es la capsula ideal para ti.
```

---

## 17. Continuidad prohibida

Esta capsula no puede habilitar:

```text
- salto fuerte de ruta;
- cambio permanente de microroadmap;
- bloqueo de eje completo;
- declaracion de dominio;
- declaracion de debilidad estable;
- ruta adaptativa personalizada;
- score PAES;
- mastery;
- theta;
- readiness;
- clasificacion del estudiante.
```

Tampoco puede convertir la secuencia v0 en continuidad pedagogica v1.

La continuidad despues de capsula 1 debe quedar en modo:

```text
calibracion inicial prudente.
```

---

## 18. Limites de inferencia

### 18.1 Limites por cantidad de evidencia

Cuatro items no permiten:

```text
- diagnostico por eje;
- estabilidad de desempeno;
- generalizacion de destreza;
- inferencia de nivel;
- decision fuerte de continuidad;
- ruta personalizada;
- prediccion de desempeno.
```

### 18.2 Limites por tipo de evidencia

MC evidence permite observar respuesta seleccionada y distractor, pero no necesariamente procedimiento real.

Por eso no permite:

```text
- afirmar razonamiento exacto;
- distinguir siempre error conceptual vs apuro;
- detectar con certeza estrategia usada;
- evaluar argumentacion profunda.
```

### 18.3 Limites por contexto

Al ser primera capsula, el estudiante todavia:

```text
- no conoce bien el formato Bexauri;
- puede estar explorando la interfaz;
- puede responder con ansiedad;
- puede no usar aun revision o ayuda;
- puede no autorreportar con calibracion.
```

### Regla final

```text
Toda inferencia de capsula 1 debe ser debil, provisional y revisable.
```

---

## 19. Copy permitido y copy prohibido

### 19.1 Copy permitido

```text
Entrada inicial para conocer primeras senales.
Esta capsula nos ayuda a observar distintos focos de M1.
Todavia no es un diagnostico.
Seguiremos calibrando tu ruta con mas capsulas.
Revisa el feedback para entender que mirar despues.
Esta es una ruta inicial de estudio.
```

### 19.2 Copy prohibido

```text
Diagnostico M1.
Tu nivel es...
La capsula mas adecuada para ti.
Ruta personalizada.
Bexauri analizo tu resultado y eligio lo ideal.
Ya dominas...
Necesitas reforzar todo...
Tu puntaje seria...
Estas listo/no listo para PAES.
Adaptamos automaticamente tu ruta.
```

### 19.3 Copy de continuidad recomendado

```text
Seguiremos con una capsula de calibracion para observar mejor tu ruta inicial.
```

### 19.4 Copy de resultado recomendado

```text
Esta primera capsula abre senales iniciales. Para orientar mejor tu estudio, necesitamos observar mas capsulas y revisar como respondes a distintos focos.
```

---

## 20. Riesgos pedagogicos

| Riesgo | Severidad | Mitigacion |
|---|---:|---|
| Sobreinferir desde 4 items | Alta | Declarar limites y usar continuidad prudente |
| Feedback correctness-only | Alta | Exigir feedback por pregunta y de capsula |
| Paso a paso inexistente | Alta | Definir contrato o marcar no disponible |
| Pseudo-adaptividad | Alta | Usar lenguaje de ruta inicial/calibracion |
| Tunel de algebra despues de capsula 1 | Media-alta | Conectar capsulas 2-6 con calibracion amplia |
| Ansiedad evaluativa | Media | Evitar lenguaje diagnostico |
| Autorreporte sobreinterpretado | Media | Usarlo solo como senal |
| MC sin procedimiento visible | Media | Feedback y paso a paso deben reconstruir razonamiento |
| Falta de cobertura real | Media | Declarar que la capsula abre senales, no cobertura |

---

## 21. Checklist BPCPv1 de aceptacion de la capsula

Para que esta capsula pueda considerarse lista para futura implementacion, debe cumplir:

```text
- Tiene ficha pedagogica completa.
- Declara proposito y no-proposito.
- Declara que no diagnostica.
- Toca cuatro zonas/familias M1.
- Cada item tiene foco claro.
- Cada item tiene error esperado.
- Cada item tiene feedback minimo.
- Cada item tiene paso a paso o declara no disponibilidad.
- Tiene feedback de capsula.
- Recoge autorreporte.
- Permite revision posterior.
- Declara limites de inferencia.
- Define continuidad prudente.
- Prohibe score/mastery/theta/adaptive AI.
- Evita copy de ruta personalizada.
- Conecta con capsulas 2-6.
```

Si falta cualquiera de estos elementos, no debe declararse BPCPv1-ready.

---

## 22. Implicaciones para capsulas 2-6

Capsulas 2-6 deben continuar la calibracion amplia temprana.

No deben asumir que capsula 1 ya diagnostico.

Deben servir para:

```text
- contrastar senales;
- observar ejes subrepresentados;
- revisar prerrequisitos;
- introducir feedback mas especifico;
- detectar errores recurrentes;
- evitar tunel de algebra;
- empezar a construir microroadmap vivo.
```

Secuencia orientativa posible:

```text
2. Ecuaciones lineales basicas.
3. Porcentaje / proporcionalidad.
4. Lectura de tabla o grafico.
5. Area / geometria plana simple.
6. Problema contextual de ecuacion o funcion.
```

Esta secuencia 2-6 es orientacion pedagogica, no ruta fija, no implementacion, no continuidad tecnica y no regla de registry.

---

## 23. Que queda bloqueado

Queda bloqueado:

```text
- implementacion;
- cambios de content registry;
- escritura de feedback authored en codigo;
- UI copy changes;
- continuity helper changes;
- endpoints;
- schema;
- DB;
- Prisma;
- SQL;
- runtime tests;
- deploy;
- estudiantes reales;
- PAES score;
- mastery;
- theta;
- adaptive AI;
- diagnostico equivalente a PAES;
- ruta personalizada fuerte;
- Capsula 10 como prueba final;
- readiness M2/L1;
- Sales-Ready;
- MVP-Beta cerrado completo.
```

---

## 24. Proxima fase recomendada

Primero documentar esta ficha en repo:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-FICHA-1
Document first M1 balanced capsule BPCPv1 ficha
```

Documento creado:

```text
nextjs_space/docs/operations/BPCPV1_PAES_M1_FIRST_BALANCED_CAPSULE_FICHA.md
```

Despues, la siguiente fase pedagogica podria ser una de estas:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-FEEDBACK-1
Derive authored feedback contract for first balanced capsule items

MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-STEPS-1
Derive step-by-step help contract for first balanced capsule items

MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-6-PLAN-1
Derive calibration-wide plan for capsules 2-6
```

No corresponde implementacion antes de documentar y aceptar esta ficha.

---

## 25. Handoff summary

La primera capsula M1 `paes_m1_balanced_entry_initial` queda definida pedagogicamente como **capsula de senal balanceada inicial**.

Su funcion es abrir senales amplias en M1 y comenzar la ventana de calibracion distribuida. No diagnostica al estudiante, no decide ruta personalizada, no estima puntaje, no declara dominio y no activa adaptividad.

La capsula debe tocar cuatro zonas: Numeros, Algebra/funciones, Geometria y Probabilidad/estadistica. Cada microcontacto debe tener foco, error esperado, feedback minimo y ayuda paso a paso o declaracion de no disponibilidad.

Despues de la capsula, la continuidad solo puede ser prudente: otra capsula de calibracion, revision o ruta inicial. No puede llamarse "la mas adecuada para ti".

FICHA-1 no autoriza implementacion. Sirve como contrato pedagogico para futuras fases de contenido, feedback, paso a paso, copy o implementacion.

---

## 26. Final verdict

```text
FIRST_M1_BALANCED_CAPSULE_FICHA_DERIVED_WITH_IMPLEMENTATION_BLOCKERS
```
