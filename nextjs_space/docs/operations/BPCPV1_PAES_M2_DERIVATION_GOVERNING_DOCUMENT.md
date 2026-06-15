# BPCPv1-PAES-M2 - Capa Pedagogica v1 especifica para PAES Matematicas M2

## 1. Executive verdict

```text
BPCPV1_PAES_M2_DERIVATION_ACCEPTED_WITH_TECHNICAL_BLOCKS
```

BPCPv1-PAES-M2 queda derivada como documento rector v1 especifico para PAES Matematicas M2, con bloqueos explicitos antes de implementacion tecnica completa.

La derivacion es valida porque existe una base pedagogica suficiente: BPCPI, BPTT, BPTT Roadmap / Living Microroadmap Contract, Blueprint Tactico-Pedagogico M2 Integrado, BPCPv1-PAES-M2 Precontract, M2-C01 authored implementada y static-reviewed, y estandares PAES recientes.

Esta derivacion no autoriza por si sola prod/staging, schema, payment, enrollment, route-order/continuity, agentic, cobertura M2 completa, Sales-Ready, score/readiness/mastery.

## 2. Fuentes rectoras usadas

| Fuente | Rol |
| --- | --- |
| BPCPI | Define ideal rector y Director Pedagogico sistemico. |
| BPTT | Define gramatica comun de tutorias Bexauri. |
| BPTT Roadmap / Microroadmap | Distingue secuencia simple, roadmap maestro y microroadmap vivo. |
| Blueprint M2 Integrado | Define contrato tactico-pedagogico especifico M2. |
| BPCPv1-PAES-M2 Precontract | Define minimos y bloqueos antes de derivacion/ejecucion. |
| Blueprint M1 / BPCPv1-M1 | Sirven como precedente, no como plantilla mecanica. |
| M2-C01 docs | Proveen primer artefacto authored M2 y su estado. |

## 3. Definicion de BPCPv1-PAES-M2

BPCPv1-PAES-M2 es la derivacion v1 especifica de la Capa Pedagogica Bexauri para la tutoria PAES Matematicas M2.

Gobierna como Bexauri debe transformar la interaccion del estudiante con capsulas M2 en:

```text
foco matematico
-> tarea
-> evidencia
-> feedback
-> autorreporte
-> revision
-> continuidad
```

No es implementacion tecnica ni catalogo final.

## 4. Nomenclatura obligatoria

```text
BPCPv1 = Capa Pedagogica v1 global de Bexauri
BPCPv1-PAES-M2 = derivacion especifica para PAES Matematicas M2
PAES_M2 = Program/tutoria tecnica-pedagogica futura
M2-C01 = primera capsula authored M2
```

Regla:

```text
BPCPv1-PAES-M2 no equivale a BPCPv1 global.
M2-C01 no equivale a PAES_M2 completa.
Program PAES_M2 no equivale a cobertura M2.
```

## 5. Alcance rector

BPCPv1-PAES-M2 gobierna definicion pedagogica de PAES_M2, capsulas M2, evidencia, feedback, autorreporte, revision, continuidad, limites de inferencia, visual stimuli y notacion, condiciones antes de Program/enrollment y condiciones antes de agentic.

No gobierna directamente auth, pricing, branding, schema, endpoints, UI concreta, deployment, payment ni banco final de items.

## 6. Principios heredados de BPCPI

PAES_M2 hereda aprendizaje no es actividad, practica con proposito, evidencia interpretable, feedback accionable, continuidad justificada, progreso honesto, error como informacion y automatizacion supervisable.

## 7. Gramatica heredada de BPTT

Toda capsula M2 debe poder explicarse dentro de:

```text
proposito
dominio/habilidad
progresion
recurso
capsula
evidencia
feedback
autorreporte
continuidad
progreso
revision
```

Si una capsula no puede justificarse en esta gramatica, no debe entrar en piloto cerrado.

## 8. Contrato M2 especifico

PAES_M2 es tutoria test-oriented para desarrollar destrezas matematicas evaluables en M2.

Contrato:

- maximo 4 ejercicios por capsula;
- feedback brief/complete;
- evidencia limitada;
- visual/math stimuli auditados;
- no agentic;
- no score;
- no readiness;
- no coverage completa sin roadmap.

## 9. Roadmap maestro M2: estado y condiciones

Estado actual:

```text
No existe roadmap maestro M2 completo.
```

Condiciones para declararlo: cobertura de familias/ejes, nodos, prerrequisitos, tipos de item, visual/math dependencies, errores frecuentes, criterios de avance/refuerzo/revision y fuentes oficiales o source-grounded mapping.

M2-C01 no basta para roadmap maestro.

## 10. Microroadmap vivo M2: estado y limites

Estado actual:

```text
No existe microroadmap vivo M2.
```

Condiciones futuras: evidencia acumulada, multiples capsulas, autorreporte, revision, cobertura tocada/pendiente y limites de inferencia.

No declarar adaptacion ni selector inteligente.

## 11. Evidencia, feedback, autorreporte y revision

Evidencia: respuesta seleccionada, acierto/error, distractor, tiempo si existe con cautela, autorreporte y revision de feedback.

Feedback: brief, complete, paso a paso, error tipico y referencia a estimulo si aplica.

Autorreporte: dificultad percibida, seguridad, comprension y necesidad de refuerzo.

Revision: completed view, feedback revisitable y no ocultar evidencia.

## 12. Estimulos visuales y QA PAES_M2

M2 puede requerir tablas, graficos, figuras, LaTeX, imagenes y diagramas.

Regla:

```text
AI may draft.
Deterministic renderer must produce.
Human/QA must approve.
```

Todo estimulo visual debe ser visible, legible, auditable y coherente con enunciado, alternativas, clave y feedback.

## 13. Continuidad M2

Continuidad inicial puede ser secuencia simple.

No declarar roadmap maestro completo, microroadmap vivo, adaptacion, mastery, score ni readiness.

Cada continuidad debe declarar evidencia usada y limites.

## 14. Claims permitidos, cautelosos y prohibidos

Permitidos: practica guiada M2 inicial, capsula completada, feedback disponible, evidencia registrada y revision disponible.

Cautelosos: avance, progreso, refuerzo y siguiente paso.

Prohibidos: dominio, puntaje probable, preparacion completa, Sales-Ready publico, adaptive AI, readiness real, cobertura total y equivalencia con prueba oficial.

## 15. Relacion con Program PAES_M2

Program PAES_M2 puede alinearse despues de esta derivacion. Debe ser local/dev primero.

No debe crear automaticamente enrollment, StudentAccess, StudentProgramInstance, LearningCycle, StudyLoad ni payment.

Debe espejar patron PAES_M1 cuando aplique.

## 16. Relacion con StudentAccess / Enrollment / StudentProgramInstance

Orden:

```text
Program PAES_M2
-> StudentAccess/enrollment
-> StudentProgramInstance
-> LearningCycle
-> StudyLoad M2-C01
```

Cada paso requiere fase explicita si muta data. No crear enrollment huerfano.

## 17. Relacion con M2-C01 ya implementada

M2-C01 es primer artefacto authored, validado estaticamente, pendiente de smoke por acceso y util para probar el circuito.

M2-C01 no es tutoria completa, roadmap, microroadmap, Sales-Ready ni agentic-ready.

## 18. Bloqueos antes de implementacion tecnica completa

Bloqueado: prod/staging, schema, payment, agentic, route-order/continuity amplia, Program sin contrato, enrollment sin Program, StudyLoad artificial sin access y claims de cobertura.

Permitido despues de esta fase: Program PAES_M2 local/dev alignment, luego enrollment/access local/dev, luego smoke M2-C01.

## 19. Proximas fases recomendadas

1. Crear/documentar rama M2 en repo.
2. Alinear `Program PAES_M2` local/dev.
3. Preparar enrollment/access local/dev.
4. Ejecutar smoke M2-C01.
5. Planificar siguientes capsulas M2.
6. Derivar rama L1 antes de activar L1 como Program.

## 20. Result

```text
BPCPV1_PAES_M2_DERIVATION_GOVERNING_DOCUMENT_ACCEPTED
```
