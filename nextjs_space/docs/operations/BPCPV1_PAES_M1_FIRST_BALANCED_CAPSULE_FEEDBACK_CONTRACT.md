# BPCPv1-PAES-M1 - Feedback authored y ayuda paso a paso para capsula inicial balanceada

**Fase:** `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-FEEDBACK-1B`
**Naturaleza:** Contrato pedagogico de feedback y ayuda paso a paso.
**Alcance:** Gobernanza pedagogica/documental. No implementacion.
**Capsula:** `PAES M1 - Entrada balanceada inicial`
**contentKey:** `paes_m1_balanced_entry_initial`

---

## 1. Executive verdict

```text
FIRST_BALANCED_CAPSULE_FEEDBACK_CONTRACT_DERIVED_WITH_IMPLEMENTATION_BLOCKERS
```

La capsula inicial balanceada `paes_m1_balanced_entry_initial` ya puede tener un **contrato pedagogico de feedback authored y ayuda paso a paso** para sus cuatro microcontactos actuales.

Este contrato permite definir que deberia comunicar el feedback de cada item, como debe guiar el "+ paso a paso", que errores posibles puede mencionar con cautela y que inferencias siguen prohibidas.

Este documento **no implementa** el feedback. No edita registry, UI, continuidad, DB, schema, endpoints ni codigo. No escribe authored feedback en el content registry. Define el estandar pedagogico que una futura fase de contenido o implementacion debera leer antes de escribir feedback authored real.

La decision central se mantiene:

```text
La capsula inicial balanceada abre senales.
No diagnostica.
No clasifica.
No decide ruta personalizada.
```

---

## 2. Source access

### 2.1 Documento fuente directo

```text
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_FEEDBACK_1A_FIRST_BALANCED_CAPSULE_SOURCE_PACKET.md
```

Ese paquete confirmo:

```text
- item count: 4;
- answer keys: present;
- authored feedback: absent;
- authored complete feedback: absent;
- item-level rationale: absent;
- item-level metadata: absent;
- distractor rationale must be inferred conservatively.
```

### 2.2 Documentos pedagogicos base

```text
nextjs_space/docs/operations/BPCPV1_PAES_M1_FIRST_BALANCED_CAPSULE_FICHA.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_EARLY_SEQUENCING_STRATEGY.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/BPTT_ROADMAP_AND_LIVING_MICROROADMAP_TRANSVERSAL_CONTRACT.md
```

Este documento depende especialmente de:

```text
nextjs_space/docs/operations/BPCPV1_PAES_M1_FIRST_BALANCED_CAPSULE_FICHA.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_FEEDBACK_1A_FIRST_BALANCED_CAPSULE_SOURCE_PACKET.md
```

### 2.3 Fuentes oficiales y taxonomia consideradas indirectamente

```text
nextjs_space/docs/operations/PAES_M1_SOURCE_REGISTER.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_0_OFFICIAL_PAES_M1_AXES_OA_INVENTORY.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_1_PAES_M1_ROADMAP_NODE_TAXONOMY.md
nextjs_space/docs/operations/MVP_SRA_ROADMAP_2B_INTERNAL_M1_ROADMAP_TO_OFFICIAL_TAXONOMY_MAPPING.md
```

### 2.4 Documentos de continuidad operativa leidos

```text
PHASE_LOG.md tail
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
```

### 2.5 Fuentes no disponibles o no usadas

```text
No DB real.
No historial real de estudiantes.
No runtime.
No validacion experta externa de items.
No rationale authored existente.
No distractor rationale source-grounded.
No feedback authored existente.
No step-by-step authored existente.
```

Por tanto, los errores por distractor se formulan como **posibles hipotesis pedagogicas**, no como diagnosticos ni como intencion confirmada de diseno.

---

## 3. Criterios de feedback BPCPv1 para esta capsula

El feedback de esta capsula debe cumplir cinco funciones:

```text
1. Ayudar al estudiante a revisar el razonamiento.
2. Explicar por que la respuesta correcta funciona.
3. Senalar una confusion posible sin diagnosticar.
4. Dejar una idea transferible.
5. Recordar que la capsula abre senales iniciales, no clasifica.
```

El feedback no debe reducirse a:

```text
Correcto.
Incorrecto.
La respuesta era C.
Revisa el tema.
```

Tampoco debe decir:

```text
Dominas este eje.
No sabes este contenido.
Tu nivel es...
Tu ruta personalizada es...
Tu puntaje seria...
Esta respuesta diagnostica...
```

La ayuda paso a paso debe incluir siempre:

```text
1. lectura del enunciado;
2. datos relevantes;
3. estrategia;
4. procedimiento;
5. verificacion;
6. error posible;
7. idea transferible.
```

Debe ser breve, accionable y orientada a razonamiento. No debe convertirse en una clase larga ni entregar solo la respuesta.

Este es un contrato de feedback/paso a paso, no authored feedback implementado.

---

## 4. Item 1 - feedback y paso a paso

### 4.1 Fuente del item

```text
Stem:
Una tienda ofrece un descuento de 20% en un producto que cuesta $15.000. Cuanto dinero se descuenta?

Opciones:
A. $1.500
B. $2.000
C. $3.000
D. $12.000

Correcta:
C
```

### 4.2 Foco pedagogico

```text
Numeros / porcentaje / relacion parte-total.
```

### 4.3 Que observa

Este item observa una primera senal sobre si el estudiante puede:

```text
- identificar la cantidad base;
- interpretar un porcentaje como parte de un total;
- calcular 20% de 15.000;
- distinguir descuento de precio final;
- verificar si el resultado tiene sentido.
```

### 4.4 Respuesta correcta

```text
C. $3.000
```

### 4.5 Razonamiento esperado

```text
20% significa 20 de cada 100.
Para calcular 20% de $15.000, se puede hacer:

10% de 15.000 = 1.500
20% = 2 x 1.500 = 3.000

Entonces el dinero descontado es $3.000.
```

Tambien puede calcularse como:

```text
0,20 x 15.000 = 3.000
```

### 4.6 Errores posibles por distractor, con cautela

| Opcion | Lectura posible del error | Cautela |
|---|---|---|
| A. `$1.500` | Puede haber calculado 10% en vez de 20%. | No implica que no entienda porcentaje; puede ser calculo incompleto. |
| B. `$2.000` | Puede haber asociado 20% con 2.000 por cercania numerica. | No permite inferir estrategia real. |
| C. `$3.000` | Respuesta correcta. | No permite declarar dominio de porcentajes. |
| D. `$12.000` | Puede haber calculado precio final despues del descuento, no el dinero descontado. | Puede ser error de lectura de la pregunta, no de calculo porcentual. |

### 4.7 Feedback breve

**Si responde correctamente:**

```text
Bien: identificaste que habia que calcular el 20% de $15.000. Recuerda que esta es solo una primera senal sobre porcentajes, no una conclusion de dominio.
```

**Si responde incorrectamente:**

```text
Revisa que pide la pregunta: no pregunta el precio final, sino cuanto dinero se descuenta. La clave es calcular el 20% de $15.000.
```

### 4.8 Feedback completo

```text
El enunciado pide el dinero que se descuenta. La cantidad base es $15.000 y el descuento es 20%.

Una forma rapida es calcular primero el 10%:

10% de 15.000 = 1.500
20% es el doble de 10%, entonces:

20% de 15.000 = 3.000

Por eso la respuesta correcta es $3.000.

Si elegiste $1.500, tal vez calculaste solo el 10%. Si elegiste $12.000, puede que hayas calculado el precio final despues del descuento, pero la pregunta pedia el monto descontado.

Idea para revisar: en problemas de porcentaje, primero identifica siempre "porcentaje de que cantidad" y luego revisa si te preguntan por el descuento, el total o el precio final.
```

### 4.9 Ayuda paso a paso

```text
1. Lee que se pregunta: cuanto dinero se descuenta?
2. Dato relevante: el producto cuesta $15.000.
3. Dato relevante: el descuento es 20%.
4. Estrategia: calcular el 20% de 15.000.
5. Procedimiento: 10% de 15.000 es 1.500; entonces 20% es 3.000.
6. Verificacion: $3.000 es una parte razonable de $15.000.
7. Error posible: no confundas el dinero descontado con el precio final.
```

### 4.10 Idea transferible

```text
En porcentajes, identifica siempre la cantidad base antes de calcular.
```

### 4.11 Que no se puede inferir

No se puede inferir:

```text
- dominio de porcentajes;
- debilidad estable en Numeros;
- capacidad general de calculo;
- nivel PAES;
- ruta personalizada.
```

### 4.12 Conexion con senal inicial balanceada

Este item aporta una primera senal sobre razonamiento porcentual, pero debe combinarse con mas evidencia en capsulas posteriores.

### 4.13 Riesgo pedagogico

El mayor riesgo es interpretar una respuesta incorrecta como "no sabe porcentajes", cuando puede ser un error de lectura, calculo parcial o confusion entre descuento y precio final.

### 4.14 Copy permitido/prohibido

Permitido:

```text
Esta respuesta nos da una primera senal sobre como abordas porcentajes.
```

Prohibido:

```text
Ya dominaste porcentajes.
Tienes dificultad en Numeros.
Tu nivel en porcentaje es bajo.
```

---

## 5. Item 2 - feedback y paso a paso

### 5.1 Fuente del item

```text
Stem:
Un servicio de arriendo de bicicletas cobra $1.000 fijos y $500 por cada hora de uso. Si h representa la cantidad de horas, que expresion representa el costo total?

Opciones:
A. 1000h + 500
B. 1000 + 500h
C. (1000 + 500)h
D. 1500h

Correcta:
B
```

### 5.2 Foco pedagogico

```text
Algebra y funciones / modelacion de costo lineal.
```

### 5.3 Que observa

Este item observa una primera senal sobre si el estudiante puede:

```text
- distinguir costo fijo y costo variable;
- interpretar una variable;
- construir una expresion algebraica simple;
- modelar una situacion lineal;
- evitar multiplicar por h lo que no depende de las horas.
```

### 5.4 Respuesta correcta

```text
B. 1000 + 500h
```

### 5.5 Razonamiento esperado

```text
Hay un cobro fijo de $1.000, que se paga una vez.
Ademas, se cobran $500 por cada hora.

Si h representa las horas, el costo por horas es 500h.

Entonces el costo total es:

1000 + 500h
```

### 5.6 Errores posibles por distractor, con cautela

| Opcion | Lectura posible del error | Cautela |
|---|---|---|
| A. `1000h + 500` | Puede haber confundido que valor depende de las horas. | No permite concluir que no modela; puede ser inversion de roles. |
| B. `1000 + 500h` | Respuesta correcta. | No permite declarar dominio de funciones lineales. |
| C. `(1000 + 500)h` | Puede haber multiplicado todo por horas, incluyendo el fijo. | Senal posible de confusion entre fijo y variable. |
| D. `1500h` | Puede haber sumado los valores y convertido todo en costo por hora. | Puede ser una simplificacion incorrecta del contexto. |

### 5.7 Feedback breve

**Si responde correctamente:**

```text
Bien: distinguiste el costo fijo del costo que depende de las horas. Esta es una primera senal de modelacion algebraica.
```

**Si responde incorrectamente:**

```text
Revisa que parte del costo es fija y que parte cambia con las horas. Solo los $500 se multiplican por h.
```

### 5.8 Feedback completo

```text
El problema tiene dos partes:

1. Un cobro fijo de $1.000.
2. Un cobro de $500 por cada hora.

Como h representa la cantidad de horas, la parte variable es 500h. El costo fijo no se multiplica por h, porque se paga una sola vez.

Por eso la expresion correcta es:

1000 + 500h

Si elegiste 1000h + 500, tal vez invertiste el costo fijo y el costo por hora. Si elegiste (1000 + 500)h o 1500h, puede que hayas tratado todo como si dependiera de las horas.

Idea para revisar: cuando modeles un costo, separa primero lo fijo de lo que cambia.
```

### 5.9 Ayuda paso a paso

```text
1. Lee que representa h: cantidad de horas.
2. Identifica el costo fijo: $1.000.
3. Identifica el costo por hora: $500.
4. Estrategia: costo total = parte fija + parte variable.
5. Parte variable: 500h.
6. Entonces: 1000 + 500h.
7. Verificacion: si h = 0, aun habria $1.000 fijos; eso coincide con la expresion correcta.
8. Error posible: multiplicar el costo fijo por h.
```

### 5.10 Idea transferible

```text
En modelos lineales simples, separa lo fijo de lo que cambia con la variable.
```

### 5.11 Que no se puede inferir

No se puede inferir:

```text
- dominio de algebra;
- dominio de funciones lineales;
- capacidad estable de modelacion;
- nivel del estudiante;
- ruta personalizada.
```

### 5.12 Conexion con senal inicial balanceada

Este item aporta una primera senal sobre modelacion algebraica y lectura de relaciones, util para decidir si conviene observar mas adelante ecuaciones, funciones o problemas contextualizados.

### 5.13 Riesgo pedagogico

El riesgo principal es interpretar una respuesta incorrecta como falta de algebra, cuando puede ser una dificultad de lectura del contexto o de distinguir magnitudes fijas y variables.

### 5.14 Copy permitido/prohibido

Permitido:

```text
Esta respuesta muestra una primera senal sobre como traduces una situacion a una expresion.
```

Prohibido:

```text
No sabes algebra.
Ya puedes avanzar en funciones.
Tu ruta debe ser funciones lineales.
```

---

## 6. Item 3 - feedback y paso a paso

### 6.1 Fuente del item

```text
Stem:
Un terreno rectangular mide 8 metros de largo y 5 metros de ancho. Cual es el area del terreno?

Opciones:
A. 13 m2
B. 26 m2
C. 40 m2
D. 80 m2

Correcta:
C
```

### 6.2 Foco pedagogico

```text
Geometria / area de rectangulo / medida.
```

### 6.3 Que observa

Este item observa una primera senal sobre si el estudiante puede:

```text
- identificar una figura rectangular;
- distinguir largo y ancho;
- reconocer que se pregunta area;
- usar multiplicacion para calcular area;
- distinguir area de perimetro;
- interpretar unidades cuadradas.
```

### 6.4 Respuesta correcta

```text
C. 40 m2
```

### 6.5 Razonamiento esperado

```text
El area de un rectangulo se calcula multiplicando largo por ancho.

Area = 8 x 5 = 40

Como es superficie, la unidad es m2.
```

### 6.6 Errores posibles por distractor, con cautela

| Opcion | Lectura posible del error | Cautela |
|---|---|---|
| A. `13 m2` | Puede haber sumado largo + ancho. | Puede ser confusion entre datos, no necesariamente geometria completa. |
| B. `26 m2` | Puede haber calculado perimetro: 2 x (8 + 5) = 26. | Senal posible de confusion area/perimetro. |
| C. `40 m2` | Respuesta correcta. | No implica dominio de geometria. |
| D. `80 m2` | Puede haber duplicado el area o aplicado un factor extra. | No permite inferir estrategia con certeza. |

### 6.7 Feedback breve

**Si responde correctamente:**

```text
Bien: identificaste que el area del rectangulo se obtiene multiplicando largo por ancho. Esta es una primera senal en geometria y medida.
```

**Si responde incorrectamente:**

```text
Revisa si la pregunta pide area o perimetro. Para area de rectangulo, multiplicas largo por ancho.
```

### 6.8 Feedback completo

```text
El terreno tiene forma rectangular. Para calcular su area, usamos:

area = largo x ancho

En este caso:

8 x 5 = 40

La respuesta correcta es 40 m2.

Si elegiste 13, quiza sumaste 8 + 5. Si elegiste 26, probablemente calculaste el perimetro, que es el borde del rectangulo. Pero la pregunta pedia area, es decir, la superficie.

Idea para revisar: cuando veas una figura, identifica primero que magnitud se pregunta: area, perimetro, volumen u otra.
```

### 6.9 Ayuda paso a paso

```text
1. Lee la pregunta: pide el area del terreno.
2. Identifica la figura: rectangulo.
3. Datos relevantes: largo = 8 m, ancho = 5 m.
4. Estrategia: area de rectangulo = largo x ancho.
5. Procedimiento: 8 x 5 = 40.
6. Verificacion: el resultado mide superficie, por eso va en m2.
7. Error posible: sumar los lados o calcular perimetro en vez de area.
```

### 6.10 Idea transferible

```text
Antes de calcular en geometria, identifica que magnitud te estan pidiendo.
```

### 6.11 Que no se puede inferir

No se puede inferir:

```text
- dominio de geometria;
- dominio de areas;
- dificultad general con figuras;
- nivel M1;
- necesidad estable de refuerzo geometrico.
```

### 6.12 Conexion con senal inicial balanceada

Este item aporta una senal inicial de geometria y medida, necesaria para que la capsula no observe solo numeros o algebra.

### 6.13 Riesgo pedagogico

El riesgo principal es confundir un error area/perimetro con una debilidad global en geometria. Puede ser un error puntual de lectura de magnitud.

### 6.14 Copy permitido/prohibido

Permitido:

```text
Esta respuesta entrega una primera senal sobre como distingues area y medida.
```

Prohibido:

```text
No sabes geometria.
Ya dominas area.
Necesitas una ruta de geometria.
```

---

## 7. Item 4 - feedback y paso a paso

### 7.1 Fuente del item

```text
Stem:
En una bolsa hay 3 bolitas rojas y 2 bolitas azules, todas del mismo tamano. Si se saca una bolita al azar, cual es la probabilidad de que sea azul?

Opciones:
A. 2/3
B. 2/5
C. 3/5
D. 1/2

Correcta:
B
```

### 7.2 Foco pedagogico

```text
Probabilidad y estadistica / probabilidad simple / casos favorables y casos posibles.
```

### 7.3 Que observa

Este item observa una primera senal sobre si el estudiante puede:

```text
- identificar casos favorables;
- identificar total de casos posibles;
- construir una fraccion de probabilidad;
- distinguir color pedido del color no pedido;
- evitar comparar solo rojas con azules.
```

### 7.4 Respuesta correcta

```text
B. 2/5
```

### 7.5 Razonamiento esperado

```text
Hay 3 bolitas rojas y 2 azules.

Total de bolitas:
3 + 2 = 5

Casos favorables para sacar azul:
2

Entonces la probabilidad de sacar azul es:

2/5
```

### 7.6 Errores posibles por distractor, con cautela

| Opcion | Lectura posible del error | Cautela |
|---|---|---|
| A. `2/3` | Puede haber comparado azules con rojas, no con el total. | No confirma estrategia; solo es una senal posible. |
| B. `2/5` | Respuesta correcta. | No implica dominio de probabilidad. |
| C. `3/5` | Puede haber usado casos rojos en vez de azules. | Puede ser error de lectura del color pedido. |
| D. `1/2` | Puede haber pensado que hay dos colores, entonces cada uno vale la mitad. | Puede ser confusion de equiprobabilidad entre categorias. |

### 7.7 Feedback breve

**Si responde correctamente:**

```text
Bien: identificaste los casos favorables y el total de bolitas. Esta es una primera senal en probabilidad basica.
```

**Si responde incorrectamente:**

```text
Revisa que se considera "caso favorable": se pide que sea azul. La probabilidad se calcula como azules sobre el total de bolitas.
```

### 7.8 Feedback completo

```text
La pregunta pide la probabilidad de sacar una bolita azul.

Primero contamos el total de bolitas:

3 rojas + 2 azules = 5 bolitas

Luego contamos los casos favorables:

azules = 2

Entonces:

probabilidad de azul = 2/5

Si elegiste 3/5, quizas contaste las rojas en vez de las azules. Si elegiste 1/2, tal vez pensaste que por haber dos colores cada uno tenia la misma probabilidad, pero no hay la misma cantidad de bolitas de cada color.

Idea para revisar: en probabilidad simple, usa casos favorables sobre casos posibles.
```

### 7.9 Ayuda paso a paso

```text
1. Lee que evento se pide: sacar una bolita azul.
2. Datos relevantes: 3 rojas y 2 azules.
3. Estrategia: probabilidad = casos favorables / casos posibles.
4. Casos favorables: 2 azules.
5. Casos posibles: 3 + 2 = 5 bolitas.
6. Procedimiento: 2/5.
7. Verificacion: como hay menos azules que rojas, la probabilidad de azul debe ser menor que la de rojo.
8. Error posible: comparar azules con rojas en vez de azules con el total.
```

### 7.10 Idea transferible

```text
En probabilidad simple, identifica primero el evento pedido y luego calcula favorables sobre total.
```

### 7.11 Que no se puede inferir

No se puede inferir:

```text
- dominio de probabilidad;
- capacidad general en estadistica;
- comprension completa de eventos;
- nivel M1;
- necesidad de ruta personalizada.
```

### 7.12 Conexion con senal inicial balanceada

Este item aporta una senal inicial en probabilidad, permitiendo que la capsula observe un eje distinto de numeros, algebra y geometria.

### 7.13 Riesgo pedagogico

El riesgo principal es interpretar una respuesta erronea como falta de probabilidad, cuando puede ser error de lectura del color pedido o confusion puntual sobre total de casos.

### 7.14 Copy permitido/prohibido

Permitido:

```text
Esta respuesta entrega una primera senal sobre como cuentas casos favorables y posibles.
```

Prohibido:

```text
No sabes probabilidad.
Ya dominas probabilidad basica.
Tu ruta debe ir a estadistica.
```

---

## 8. Feedback de capsula completo

El feedback final de la capsula debe integrar las cuatro senales sin diagnosticar.

### 8.1 Feedback de capsula si el desempeno fue alto

```text
Esta capsula abrio primeras senales en cuatro focos de Matematica M1: porcentaje, modelacion algebraica, area y probabilidad. Si te fue bien en varias preguntas, eso es una buena senal inicial, pero todavia no significa dominio ni diagnostico. En las proximas capsulas seguiremos observando con mas evidencia y feedback.
```

### 8.2 Feedback de capsula si el desempeno fue mixto

```text
Esta capsula mostro senales variadas en distintos focos de M1. Eso es normal para una entrada balanceada: no busca clasificarte, sino abrir informacion inicial para seguir calibrando tu ruta. Revisa especialmente las preguntas donde dudaste o elegiste una alternativa distinta, porque ahi puede aparecer una pista util para las proximas capsulas.
```

### 8.3 Feedback de capsula si el desempeno fue bajo

```text
Esta capsula es solo una primera senal, no un diagnostico. Si varias preguntas costaron, conviene revisar los feedback y pasos a paso para identificar que dato, estrategia o representacion fue mas dificil. Las proximas capsulas deben ayudarnos a observar mejor, no a etiquetarte.
```

### 8.4 Feedback de capsula si no termino

```text
No terminar esta capsula no permite sacar una conclusion sobre tu nivel. Puede deberse a tiempo, duda, interrupcion o formato. Lo importante ahora es revisar lo que alcanzaste y continuar con una capsula de calibracion para observar mejor tu punto de partida.
```

### 8.5 Feedback de capsula prohibido

No debe decir:

```text
Tu diagnostico es...
Tu ruta personalizada sera...
Tu area debil es...
Tu puntaje estimado es...
Ya estas listo para...
No estas listo para...
```

---

## 9. Autorreporte y revision

El autorreporte debe usarse como senal metacognitiva, no como decision.

### 9.1 Si el estudiante marca "Me fue bien"

Interpretacion prudente:

```text
El estudiante percibe seguridad, pero se debe contrastar con desempeno y revision.
```

Feedback posible:

```text
Gracias por reportarlo. Usaremos esta senal junto con tus respuestas para seguir calibrando tu ruta. Todavia necesitamos mas capsulas para entender mejor tus patrones.
```

### 9.2 Si marca "Me costo"

Interpretacion prudente:

```text
Puede haber esfuerzo, duda, baja confianza o dificultad real en algunos focos.
```

Feedback posible:

```text
Que te haya costado es una senal util. Revisa el feedback de cada pregunta y observa si la dificultad vino por calculo, lectura, estrategia o representacion.
```

### 9.3 Si marca "No la termine"

Interpretacion prudente:

```text
No permite inferir habilidad. Puede ser interrupcion, tiempo, formato o bloqueo.
```

Feedback posible:

```text
No terminar esta capsula no define tu nivel. Conviene retomar con calma y seguir calibrando con mas evidencia.
```

### 9.4 Revision esperada

La revision debe permitir:

```text
- volver a cada item;
- ver alternativa elegida;
- ver alternativa correcta;
- leer feedback breve;
- leer feedback completo;
- abrir paso a paso si existe;
- recordar autorreporte;
- entender limites de inferencia.
```

---

## 10. Limites de inferencia

Esta capsula no puede inferir:

```text
- diagnostico por eje;
- dominio;
- debilidad estable;
- habilidad general;
- PAES score;
- mastery;
- theta;
- preparacion PAES;
- ruta personalizada;
- clasificacion del estudiante;
- readiness para avanzar;
- readiness de estudiantes reales.
```

Puede inferir solo senales iniciales como:

```text
- posible confusion de porcentaje;
- posible confusion fijo/variable;
- posible confusion area/perimetro;
- posible confusion casos favorables/total;
- posible error de lectura;
- posible diferencia entre desempeno y autorreporte.
```

Todas esas senales deben quedar como:

```text
hipotesis debiles, provisionales y revisables.
```

---

## 11. Riesgos pedagogicos

| Riesgo | Severidad | Mitigacion |
|---|---:|---|
| Feedback parezca diagnostico | Alta | Usar lenguaje de senal inicial |
| Distractores se interpreten con exceso | Alta | Decir "puede haber" y no "tu error fue" |
| Paso a paso entregue solo solucion | Alta | Incluir lectura, datos, estrategia y verificacion |
| Se confunda capsula con placement | Alta | Repetir limites de inferencia |
| Se active pseudo-adaptividad | Alta | Usar continuidad prudente |
| Se use autorreporte como decision | Media-alta | Combinar con desempeno y revision |
| Se ignore ausencia de procedimiento real | Media | Formular hipotesis, no diagnosticos |
| Se prometa feedback que no se implemento | Alta | Mantener este documento como contrato, no implementacion |

---

## 12. Que queda bloqueado

Queda bloqueado:

```text
- implementacion;
- registry edits;
- authored feedback en codigo;
- UI changes;
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
- readiness de capsula;
- readiness de estudiantes reales.
```

---

## 13. Proxima fase recomendada

Primero debe documentarse este contrato:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-FEEDBACK-1B
Document PRO feedback and step-by-step contract for first balanced capsule
```

Documento creado:

```text
nextjs_space/docs/operations/BPCPV1_PAES_M1_FIRST_BALANCED_CAPSULE_FEEDBACK_CONTRACT.md
```

Despues, hay tres caminos posibles:

```text
1. M1-CAPSULE-FEEDBACK-1C
   Audit feedback contract against FICHA-1 and source packet.

2. M1-CAPSULES-2-6-PLAN-1
   Derive calibration-wide plan for capsules 2-6.

3. Future implementation phase
   Only if explicitly authorized, after reading FICHA-1, FEEDBACK-1A and FEEDBACK-1B.
```

Recomendacion pedagogica:

```text
Documentar FEEDBACK-1B primero.
Luego derivar CAPSULES-2-6-PLAN-1.
No implementar todavia.
```

---

## 14. Handoff summary

La capsula inicial balanceada `paes_m1_balanced_entry_initial` ya cuenta con un contrato pedagogico de feedback y ayuda paso a paso.

Cada item tiene:

```text
- foco pedagogico;
- razonamiento esperado;
- posibles errores por distractor, con cautela;
- feedback breve;
- feedback completo;
- ayuda paso a paso;
- idea transferible;
- limites de inferencia;
- conexion con senal inicial balanceada.
```

El feedback debe orientar revision, no diagnosticar. El paso a paso debe guiar lectura, datos, estrategia, procedimiento, verificacion, error posible e idea transferible.

La capsula sigue siendo una senal inicial: no score, no mastery, no theta, no adaptive AI, no ruta personalizada, no preparacion PAES.

Este contrato no esta implementado. Debe documentarse en repo y luego decidir si se avanza a plan de capsulas 2-6 o a una futura fase de implementacion explicitamente autorizada.

---

## 15. Final verdict

```text
FIRST_BALANCED_CAPSULE_FEEDBACK_CONTRACT_DERIVED_WITH_IMPLEMENTATION_BLOCKERS
```
