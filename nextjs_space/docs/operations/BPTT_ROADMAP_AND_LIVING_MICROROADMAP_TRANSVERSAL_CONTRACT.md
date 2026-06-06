# BPTT - Contrato transversal de roadmap maestro y microroadmap vivo del estudiante

**Fase:** `MVP-SALES-PILOT-PEDAGOGY-BPTT-ROADMAP-CONTRACT-1`  
**Naturaleza:** Addendum transversal del BPTT.  
**Alcance:** Gobernanza pedagogica/documental. No implementacion.

---

## 1. Executive verdict

```text
BPTT_ROADMAP_MICROROADMAP_TRANSVERSAL_CONTRACT_DERIVED
```

Bexauri debe incorporar al BPTT un contrato transversal que distinga tres niveles pedagogicos:

```text
1. Secuencia simple.
2. Roadmap maestro de tutoria.
3. Microroadmap vivo del estudiante.
```

La idea de **roadmap maestro** y **microroadmap vivo** no pertenece solo a PAES Matematicas M1. Es transversal a toda tutoria Bexauri sostenida, tanto **test-oriented** como **skill-oriented**. Sin embargo, su nivel de sofisticacion debe ser proporcional a la complejidad de la tutoria.

La regla central queda:

```text
Toda decision pedagogica debe declarar que documentos leyo,
que fuentes mandan,
que fuentes faltan,
y que decisiones quedan limitadas por documentacion no leida.
```

Esto protege a Bexauri contra tres riesgos mayores:

```text
- disenar desde memoria;
- implementar desde una derivacion pedagogica incompleta;
- confundir secuencia tecnica de capsulas con roadmap pedagogico.
```

---

## 2. Source access

### 2.1 Documentos canonicos y transversales leidos

```text
nextjs_space/docs/operations/BPCPI_BLUEPRINT_CANONICO_CAPA_PEDAGOGICA_IDEAL.md
nextjs_space/docs/operations/BPTT_BLUEPRINT_PEDAGOGICO_TACTICO_TRANSVERSAL.md
```

### 2.2 Documentos especificos M1 leidos como caso de aplicacion

```text
nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_AUDIT_1A_SOURCE_GROUNDED_CURRENT_CAPSULES_AGAINST_BPCPV1_PAES_M1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_PEDAGOGY_M1_CAPSULE_AUDIT_1B_PRO_PEDAGOGICAL_REVIEW_OF_1A.md
```

### 2.3 Fuentes oficiales/taxonomia M1 leidas como caso test-oriented

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

### 2.5 Fuentes no disponibles

```text
Ninguna fuente minima requerida fue declarada como no disponible en esta derivacion.
```

Si una futura ejecucion no puede leer alguna fuente, debe declarar la fuente no leida y bloquear cualquier decision que dependa de ella.

---

## 3. Problema que resuelve

Bexauri necesita impedir que las decisiones pedagogicas futuras se tomen desde:

```text
- memoria del chat;
- ultimo documento creado;
- intuicion de producto;
- flujo tecnico existente;
- una capsula aislada;
- un contentKey;
- una secuencia fija;
- una auditoria parcial;
- una fuente oficial no reconciliada;
- un documento historico sin supersession check.
```

El problema no es solo tecnico. Es de gobernanza pedagogica.

Una tutoria puede tener varias capsulas y aun asi no tener un roadmap maestro. Tambien puede tener un orden de capsulas y aun asi no tener continuidad pedagogica. Por tanto, Bexauri debe diferenciar:

```text
secuencia tecnica
!= secuencia pedagogica
!= roadmap maestro
!= microroadmap vivo del estudiante
!= selector adaptativo
```

Sin esta distincion, cualquier tutoria con dos capsulas podria llamarse "roadmap", y cualquier paso de capsula 1 a capsula 2 podria llamarse "microroadmap". Eso produciria pseudo-pedagogia: una ruta que parece guiada, pero no esta suficientemente gobernada.

Este addendum resuelve ese riesgo estableciendo:

1. Que nivel de roadmap corresponde segun la complejidad de la tutoria.
2. Que documentos deben leerse antes de decidir.
3. Que fuente manda ante contradicciones.
4. Que decisiones quedan bloqueadas si falta documentacion.
5. Como las derivaciones especificas, como BPCPv1-PAES-M1, deben heredar este contrato.

---

## 4. Definicion de secuencia simple

Una **secuencia simple** es un orden pedagogico acotado de capsulas o unidades, apropiado para experiencias breves o microtrayectos.

Aplica cuando:

```text
- la tutoria tiene 2-3 capsulas;
- el objetivo es muy acotado;
- no hay multiples ejes o familias;
- no se pretende mapear un dominio completo;
- no se acumula evidencia suficiente para ruta viva;
- la continuidad solo necesita una razon pedagogica basica.
```

Ejemplos:

```text
- capsula 1: introduccion;
- capsula 2: practica;
- capsula 3: revision breve.
```

Una secuencia simple debe tener:

```text
- orden explicito;
- proposito de cada capsula;
- razon de paso de una capsula a otra;
- evidencia minima;
- feedback basico;
- limite de inferencia.
```

No debe declarar:

```text
- roadmap maestro;
- adaptacion;
- personalizacion;
- diagnostico;
- progreso robusto;
- dominio;
- mastery;
- score;
- ruta viva del estudiante.
```

### Regla

```text
Toda tutoria minima puede tener secuencia simple.
No toda secuencia simple es un roadmap maestro.
```

---

## 5. Definicion de roadmap maestro de tutoria

Un **roadmap maestro de tutoria** es el mapa pedagogico global de una tutoria sostenida.

Aplica cuando:

```text
- la tutoria tiene muchas capsulas;
- trabaja varios ejes, nodos, familias o destrezas;
- requiere progresion;
- necesita cobertura;
- tiene prerrequisitos;
- debe evitar sobrerrepresentar una zona;
- debe orientar continuidad futura;
- debe permitir auditoria.
```

Un roadmap maestro no es una lista lineal. Es un mapa de posibilidades pedagogicas.

Debe definir:

```text
- dominio de la tutoria;
- proposito;
- familias o ejes;
- nodos o destrezas;
- prerrequisitos;
- niveles de complejidad;
- tipos de capsula;
- evidencia esperada;
- errores frecuentes;
- criterios de avance;
- criterios de refuerzo;
- criterios de revision;
- criterios de cobertura;
- limites de inferencia;
- fuentes oficiales o criterios de destreza, segun corresponda.
```

En tutorias test-oriented, el roadmap maestro puede estar anclado en temarios, habilidades evaluadas, ejes oficiales y tipos de item.

En tutorias skill-oriented, puede estar anclado en destrezas, niveles de desempeno, rubricas, producciones esperadas, transferencia y autonomia.

### Regla

```text
Una tutoria sostenida sin roadmap maestro corre el riesgo de convertirse en una coleccion de capsulas.
```

---

## 6. Definicion de microroadmap vivo del estudiante

El **microroadmap vivo del estudiante** es la ruta local, provisional y revisable que Bexauri construye para un estudiante especifico a partir de evidencia acumulada.

No es una ruta adaptativa fuerte. No es un selector automatico. No es una prediccion. No es mastery. No es score. No es theta. No es diagnostico definitivo.

Es una hipotesis pedagogica viva.

Debe considerar:

```text
- capsulas realizadas;
- desempeno;
- errores;
- autorreporte;
- revision de feedback;
- uso de ayuda;
- cobertura ya tocada;
- cobertura pendiente;
- nodos activos;
- prerrequisitos inseguros;
- riesgo de monotonia;
- necesidad de consolidacion;
- oportunidad de novedad;
- necesidad de validacion.
```

El microroadmap vivo siempre debe responder:

```text
Que sabemos?
Que no sabemos?
Que evidencia es debil?
Que conviene observar?
Que conviene reforzar?
Que conviene revisar?
Que conviene postergar?
Que no podemos afirmar todavia?
```

### Regla

```text
El microroadmap vivo no reemplaza al roadmap maestro.
El roadmap maestro protege el mapa global.
El microroadmap vivo ordena la ruta local del estudiante.
```

---

## 7. Diferencias entre los tres niveles

| Nivel | Uso | Requisito minimo | Que no debe afirmar |
|---|---|---|---|
| Secuencia simple | Experiencia breve o microtrayecto acotado | Orden explicito + razon pedagogica basica | No debe declarar roadmap completo ni adaptacion |
| Roadmap maestro de tutoria | Tutoria sostenida con multiples capsulas/ejes/destrezas | Mapa de cobertura, progresion, nodos, evidencia y continuidad | No debe confundirse con secuencia tecnica |
| Microroadmap vivo del estudiante | Ruta local de un estudiante con evidencia acumulada | Estado provisional basado en desempeno, errores, autorreporte, revision y cobertura | No debe declarar selector adaptativo, dominio, score ni mastery |

### Regla transversal

```text
El nivel de roadmap debe ser proporcional a la complejidad de la tutoria.
```

Una tutoria minima no debe cargar un roadmap sofisticado innecesario. Pero una tutoria sostenida no puede operar solo con una secuencia tecnica.

---

## 8. Aplicacion a tutorias test-oriented

Las tutorias **test-oriented** preparan al estudiante para una evaluacion externa o estandarizada.

Ejemplos:

```text
- PAES Matematicas M1;
- PAES Matematicas M2;
- PAES Competencia Lectora.
```

### 8.1 Roadmap maestro test-oriented

Debe apoyarse en:

```text
- fuentes oficiales;
- temarios;
- habilidades evaluadas;
- ejes de contenido;
- tipos de item;
- cobertura de prueba;
- niveles de complejidad tentativa;
- ejemplos oficiales;
- criterios de exclusion de claims.
```

### 8.2 Microroadmap vivo test-oriented

Puede considerar:

```text
- desempeno por eje;
- desempeno por habilidad evaluada;
- errores por tipo de item;
- errores de lectura;
- errores de modelacion;
- errores de representacion;
- autorreporte;
- revision;
- cobertura pendiente;
- riesgo de monotonia;
- prerrequisitos;
- necesidad de validacion.
```

### 8.3 Limites test-oriented

No puede declarar:

```text
- score;
- puntaje probable;
- preparacion completa;
- mastery;
- theta;
- equivalencia con prueba oficial;
- readiness real;
- adaptacion inteligente;
- cobertura total sin fuente oficial y auditoria.
```

### 8.4 Regla

```text
En tutorias test-oriented, la fuente oficial manda sobre cobertura externa.
El roadmap especifico manda sobre organizacion pedagogica interna.
La auditoria source-grounded manda sobre comportamiento actual.
```

---

## 9. Aplicacion a tutorias skill-oriented

Las tutorias **skill-oriented** desarrollan habilidades no necesariamente ligadas a una prueba externa.

Ejemplos:

```text
- escritura;
- comprension lectora;
- pensamiento matematico;
- habitos de estudio;
- razonamiento;
- nivelacion;
- argumentacion;
- metacognicion.
```

### 9.1 Roadmap maestro skill-oriented

Debe apoyarse en:

```text
- destrezas;
- subdestrezas;
- niveles de desempeno;
- criterios de calidad;
- rubricas;
- producciones esperadas;
- ejemplos;
- revision;
- transferencia;
- autonomia progresiva.
```

Ejemplo para escritura:

```text
idea central -> estructura -> cohesion -> evidencia -> revision -> estilo -> transferencia
```

Ejemplo para habitos de estudio:

```text
planificacion -> ejecucion -> monitoreo -> revision -> ajuste -> autonomia
```

### 9.2 Microroadmap vivo skill-oriented

Puede considerar:

```text
- producciones del estudiante;
- errores recurrentes;
- calidad de explicacion;
- revision de borradores;
- uso de feedback;
- autonomia;
- transferencia a nuevas tareas;
- consistencia en el tiempo;
- autorreporte;
- resistencia o bloqueo.
```

### 9.3 Limites skill-oriented

No puede declarar:

```text
- progreso robusto sin rubrica;
- dominio de habilidad sin evidencia longitudinal;
- autonomia estable desde una tarea;
- transferencia si no se observo en contexto nuevo;
- mejora garantizada;
- diagnostico psicologico;
- capacidad general del estudiante.
```

### 9.4 Regla

```text
En tutorias skill-oriented, el contrato de destreza y la rubrica mandan sobre claims de progreso.
```

---

## 10. Matriz tipo de decision / documentos minimos

| Tipo de decision | Documentos minimos | Fuente que manda | Que no puede decidir si falta |
|---|---|---|---|
| Diseno de tutoria | BPCPI, BPTT, este contrato transversal, roadmap maestro de tutoria | BPTT + derivacion especifica | No puede definir ruta completa |
| Diseno de capsula | BPTT, derivacion especifica, roadmap/ficha de tutoria, auditorias relevantes | Documento especifico de tutoria | No puede declarar capsula v1-ready |
| Secuencia simple | BPTT, proposito de tutoria, ficha de capsulas | BPTT + contrato local | No puede declarar roadmap maestro |
| Roadmap maestro | BPTT, fuentes oficiales o rubrica/destrezas, documentos especificos de tutoria | Fuente oficial o contrato de destreza + BPTT | No puede declarar cobertura |
| Microroadmap vivo | Roadmap maestro, evidencia del estudiante, autorreporte, auditoria de continuidad | Contrato especifico de continuidad | No puede declarar personalizacion fuerte |
| Continuidad | BPTT, roadmap maestro, microroadmap, auditoria de evidencia, contrato de continuidad | Contrato de continuidad especifico | No puede declarar adaptividad |
| Feedback | BPTT, contrato de feedback, auditoria de capsula, evidencia de error | Contrato de feedback | No puede declarar feedback suficiente |
| Ayuda paso a paso | BPTT, contrato especifico, ficha de capsula, evidencia de tarea | Contrato de ayuda paso a paso | No puede mostrar ayuda como disponible |
| Implementacion pedagogica | Documento rector, auditorias, handoff actual, Git preflight | Documento rector + Git preflight | No puede tocar codigo sin fase tecnica explicita y paquete documental leido |
| Ruta test-oriented | Fuentes oficiales, roadmap especifico, auditoria de cobertura | Fuente oficial + roadmap validado | No puede declarar cobertura |
| Ruta skill-oriented | Rubrica/destreza, roadmap especifico, evidencia de produccion | Contrato de destreza | No puede declarar progreso |
| Readiness de capsulas | Fichas, feedback, evidencia, revision, auditoria source-grounded | Documento rector especifico + auditoria | No puede declarar v1-ready |
| Readiness de estudiantes reales | Documento rector, auditorias, soporte, datos, privacidad, runbook | Gate especifico aceptado | No puede activar piloto |
| Agentes pedagogicos futuros | BPCPI, BPTT, contrato de agentes, evidencia, auditoria | BPCPI/BPTT + contrato de agente | No puede actuar como autoridad autonoma |

---

## 11. Pedagogical Context Gate template

Toda fase pedagogica debe incluir este bloque antes de disenar, desarrollar, implementar o decidir:

```text
Pedagogical Context Gate

Git baseline:
- HEAD:
- origin/main:
- working tree:

Tipo de decision:
- diseno de tutoria / diseno de capsula / feedback / continuidad / implementacion / roadmap / readiness / otro

Documentos canonicos leidos:
- BPCPI:
- BPTT:
- contratos transversales:

Documentos especificos de tutoria leidos:
- derivacion especifica:
- roadmap maestro:
- fichas:
- contratos de feedback/continuidad:

Auditorias y revisiones leidas:
- source-grounded audit:
- PRO review:
- expert review:

Fuentes oficiales o rubricas leidas:
- fuentes oficiales:
- rubricas:
- criterios de destreza:

Fuentes no leidas o no disponibles:
- documento:
- impacto:

Fuente que manda:
- para estado Git:
- para ideal pedagogico:
- para capa transversal:
- para tutoria especifica:
- para cobertura externa:
- para comportamiento actual:

Decisiones bloqueadas por falta de fuente:
- ...

Scope permitido:
- ...

Scope prohibido:
- ...

Readiness claim permitido:
- si/no
- limites:
```

Si una fase no puede completar este gate, debe detenerse o declarar explicitamente que decisiones quedan bloqueadas.

---

## 12. Reglas de contradiccion documental

Cuando haya contradiccion entre documentos, aplica esta jerarquia:

### 12.1 Estado vivo del repo

```text
Git preflight manda para HEAD, origin/main y working tree.
```

Si Git contradice handoff, prompt, indice o memoria, Git gana.

### 12.2 Nivel ideal

```text
BPCPI manda sobre mandato pedagogico ideal, invariantes y limites epistemologicos.
```

Una derivacion especifica no puede contradecir BPCPI.

### 12.3 Nivel transversal

```text
BPTT manda sobre la gramatica comun de tutorias.
```

Toda tutoria debe respetar proposito, progresion, capsulas, evidencia, feedback, autorreporte, continuidad, progreso y revision.

### 12.4 Addendum transversal

```text
Este contrato manda sobre roadmap maestro, microroadmap vivo y reglas de lectura documental transversal.
```

Una derivacion especifica puede concretarlo, pero no eliminarlo sin justificacion.

### 12.5 Nivel especifico

```text
El documento rector vigente y mas especifico dentro del mismo alcance manda sobre documentos historicos,
salvo que contradiga BPCPI, BPTT, fuente oficial o Git preflight.
```

Ejemplo: BPCPv1-PAES-M1 manda dentro de PAES M1.

### 12.6 Fuentes oficiales

```text
En tutorias test-oriented, la fuente oficial manda sobre cobertura externa.
```

La fuente oficial no manda automaticamente sobre diseno Bexauri, pero si sobre que entra en el dominio de la prueba.

### 12.7 Auditoria source-grounded

```text
La auditoria source-grounded manda sobre claims de comportamiento actual.
```

Si una auditoria muestra que algo no existe en codigo/contenido vivo, no se puede declarar activo.

### 12.8 Handoff actual

```text
El handoff actual manda para continuidad operativa, salvo Git.
```

Si esta stale, debe corregirse o declararse como drift.

---

## 13. Reglas anti-omision

### 13.1 No Phase From Memory

```text
Ninguna fase pedagogica puede proceder solo desde memoria de chat.
```

Debe declarar documentos leidos.

### 13.2 No Pedagogical Decision From Single Document

```text
Ninguna decision pedagogica importante puede basarse en un solo documento si existen documentos canonicos, especificos y auditorias relevantes.
```

### 13.3 No Implementation From Pedagogical Derivation Alone

```text
Una derivacion pedagogica no autoriza implementacion.
```

Debe existir fase explicita de implementacion y sus gates.

### 13.4 No Readiness Claim Without Source Coverage

```text
No se puede declarar readiness sin cobertura documental y auditoria.
```

### 13.5 No Adaptive Claim Without Evidence Contract

```text
No se puede declarar adaptividad sin contrato de evidencia, continuidad y auditoria.
```

### 13.6 No Capsule v1 Claim Without Ficha

```text
Ninguna capsula puede declararse v1-ready sin ficha pedagogica minima.
```

### 13.7 No Roadmap Claim Without Roadmap Source

```text
No se puede declarar roadmap maestro sin fuente de roadmap o contrato de tutoria.
```

### 13.8 No Test-Oriented Coverage Claim Without Official Source

```text
En tutorias test-oriented, no se puede declarar cobertura sin fuente oficial o mapeo aceptado.
```

### 13.9 No Skill-Oriented Progress Claim Without Rubric/Criteria

```text
En tutorias skill-oriented, no se puede declarar progreso sin rubrica, criterio o evidencia de desempeno.
```

### 13.10 No Live Capability From Dormant Model

```text
No se puede declarar capacidad viva porque exista un modelo tecnico dormido.
```

### 13.11 No Student Microroadmap Without Student Evidence

```text
No se puede declarar microroadmap vivo si no hay evidencia individual acumulada.
```

### 13.12 No Continuity From Sequence Alone

```text
Una secuencia fija no equivale a continuidad pedagogica.
```

---

## 14. Limites contra pseudo-adaptividad

El roadmap maestro y el microroadmap vivo pueden sonar adaptativos. Por eso deben quedar limitados.

### 14.1 Roadmap maestro no es adaptividad

El roadmap maestro es el mapa de posibilidades. No decide automaticamente.

### 14.2 Microroadmap vivo no es selector automatico

El microroadmap vivo organiza una hipotesis local, pero no debe presentarse como IA adaptativa ni personalizacion fuerte.

### 14.3 Secuencia simple no es continuidad inteligente

Pasar de capsula 1 a capsula 2 puede ser correcto, pero no debe llamarse adaptacion.

### 14.4 Evidencia debil no permite decision fuerte

Una respuesta, una capsula o un autorreporte aislado no justifican ruta personalizada.

### 14.5 Lenguaje permitido

```text
La evidencia sugiere...
Conviene observar...
Ruta inicial...
Siguiente capsula de la ruta...
Todavia no hay suficiente informacion...
```

### 14.6 Lenguaje prohibido

```text
La capsula mas adecuada para ti...
Ruta personalizada...
Ya dominaste...
Bexauri sabe exactamente que necesitas...
Adaptacion inteligente...
Score esperado...
```

---

## 15. Relacion con BPCPI

Este contrato deriva del BPCPI porque el BPCPI exige que la capa pedagogica transforme la interaccion del estudiante con recursos en una experiencia guiada, progresiva, evidenciable y revisable.

El roadmap maestro protege la progresion.

El microroadmap vivo protege la relacion entre evidencia y continuidad.

La secuencia simple protege que incluso una experiencia breve tenga razon pedagogica.

Este addendum tambien respeta los limites epistemologicos del BPCPI:

```text
- no inferir dominio desde evidencia debil;
- no confundir actividad con aprendizaje;
- no presentar automatizacion como autoridad incuestionable;
- no prometer resultados no sustentados;
- no convertir metricas debiles en progreso.
```

---

## 16. Relacion con BPTT

Este contrato complementa el BPTT.

El BPTT define la gramatica comun:

```text
proposito,
dominio,
progresion,
recursos,
capsulas,
evidencia,
feedback,
autorreporte,
continuidad,
progreso,
revision.
```

El contrato de roadmap/microroadmap especifica como debe entenderse la **progresion** y la **continuidad** cuando una tutoria tiene varias capsulas o acumula evidencia.

Por tanto:

```text
BPTT define que debe tener una tutoria.
Este addendum define como una tutoria organiza su mapa y su ruta viva.
```

No reemplaza al BPTT. Lo operacionaliza conceptualmente en el area de roadmap, secuenciacion y continuidad.

---

## 17. Relacion con derivaciones especificas como BPCPv1-PAES-M1

Las derivaciones especificas deben heredar este contrato.

### 17.1 Para BPCPv1-PAES-M1

BPCPv1-PAES-M1 debe distinguir:

```text
Roadmap maestro M1
= mapa oficial/taxonomico de ejes, habilidades, nodos y familias.

Microroadmap vivo del estudiante M1
= ruta provisional segun evidencia, errores, autorreporte, revision, cobertura y monotonia.

Secuencia tecnica v0
= ruta inicial o fixed sequence que no debe llamarse adaptativa.
```

La auditoria 1A ya mostro que la continuidad M1 actual es `operational sequence v0` y que el feedback/paso a paso/ficha todavia son incompletos.

### 17.2 Para PAES M2

M2 debera tener roadmap maestro propio. No puede copiar M1 superficialmente. Debe apoyarse en fuentes oficiales M2 y criterios de profundidad matematica propios.

### 17.3 Para PAES Competencia Lectora

L1 debera tener roadmap maestro lector: tipos de texto, habilidades de comprension, inferencia, interpretacion, evaluacion, estrategia de lectura y evidencia lectora.

### 17.4 Para skill-oriented

Una tutoria de escritura, razonamiento o habitos de estudio debera definir roadmap por destrezas, rubricas y producciones, no por temario PAES.

---

## 18. Implicaciones para M1-SEQUENCING-1

La estrategia M1 de secuenciacion temprana debe derivarse despues como aplicacion especifica de este contrato transversal.

La cadena correcta es:

```text
BPTT Roadmap Contract
-> define la idea transversal.

M1-SEQUENCING-1
-> aplica la idea a PAES M1 con ejes, habilidades, nodos, ventana 1-20 y riesgo de tunel de algebra.

FICHA-1
-> aplica la estrategia a la primera capsula balanceada.
```

Esto implica que M1-SEQUENCING-1 no debe inventar el concepto de roadmap/microroadmap desde cero. Debe heredar este contrato y concretarlo para PAES M1.

Tambien implica que FICHA-1 no debe disenar la primera capsula como diagnostico rigido. Debe disenarla como senal inicial dentro de una ventana de calibracion distribuida, si M1-SEQUENCING-1 asi lo establece.

---

## 19. Handoff summary

Bexauri incorpora un contrato transversal para distinguir:

```text
secuencia simple,
roadmap maestro de tutoria,
microroadmap vivo del estudiante.
```

No toda tutoria requiere roadmap sofisticado. Pero toda tutoria sostenida necesita un mapa de cobertura y progresion. Toda tutoria que acumula evidencia individual necesita un microroadmap vivo, entendido como hipotesis local, provisional y revisable.

Este contrato aplica tanto a tutorias test-oriented como skill-oriented.

Toda decision pedagogica futura debe declarar:

```text
- documentos canonicos leidos;
- documentos especificos leidos;
- auditorias/revisiones leidas;
- fuentes oficiales o externas usadas;
- documentos no disponibles;
- limites derivados de fuentes no leidas;
- jerarquia documental ante contradicciones.
```

Las reglas anti-omision quedan activas:

```text
No Phase From Memory.
No Pedagogical Decision From Single Document.
No Implementation From Pedagogical Derivation Alone.
No Readiness Claim Without Source Coverage.
No Adaptive Claim Without Evidence Contract.
No Capsule v1 Claim Without Ficha.
No Roadmap Claim Without Roadmap Source.
No Test-Oriented Coverage Claim Without Official Source.
No Skill-Oriented Progress Claim Without Rubric/criteria.
```

M1-SEQUENCING-1 debe derivarse despues como aplicacion especifica de este contrato transversal. FICHA-1 debe venir despues de M1-SEQUENCING-1.

---

## 20. Final verdict

```text
BPTT_ROADMAP_MICROROADMAP_TRANSVERSAL_CONTRACT_DERIVED
```
