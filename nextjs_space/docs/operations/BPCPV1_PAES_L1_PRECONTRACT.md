# BPCPv1-PAES-L1 - Precontrato minimo antes de derivacion

## 1. Executive verdict

```text
READY_FOR_DERIVATION_WITH_CONDITIONS
```

Bexauri esta en condiciones de documentar la derivacion BPCPv1-PAES-L1 con condiciones. Esta condicion no autoriza implementacion nueva, uso de estudiante, uso de producto, continuidad automatica, score, mastery, diagnostico ni cobertura completa.

## 2. Boundary: BPCPv1 global vs BPCPv1-PAES-L1

```text
BPCPv1 != BPCPv1-PAES-L1
```

BPCPv1 es la futura capa pedagogica v1 global de Bexauri. BPCPv1-PAES-L1 es la derivacion especifica para PAES Competencia Lectora L1.

BPCPv1-PAES-L1 gobierna proposito lector, texto visible, tarea, evidencia, feedback, autorreporte, revision, continuidad, derechos y limites de inferencia para L1. No gobierna auth, pagos, schema, UI concreta, deployment, precios ni aprobacion comercial.

## 3. Herencia obligatoria

BPCPv1-PAES-L1 hereda:

- BPCPI como marco rector de aprendizaje, evidencia, feedback y continuidad.
- BPTT como gramatica transversal de tutoria.
- BPTT Roadmap / Living Microroadmap Contract como separacion entre secuencia simple, roadmap maestro y microroadmap vivo.
- Blueprint Tactico-Pedagogico L1 Integrado como contrato especifico L1.

## 4. Decisiones L1 obligatorias

Antes de avanzar en flujo L1 se deben decidir y documentar:

- alcance del piloto interno;
- criterios de fuente/derechos del texto;
- criterios de aprobacion student-use y product-use;
- limites de claims;
- condiciones de static review;
- condiciones de smoke humano;
- politica de continuidad con un solo set;
- requisito de segundo set revisado si aplica.

## 5. Que puede canonizarse ahora

Puede canonizarse:

- PAES_L1 como tutoria Bexauri test-oriented de Competencia Lectora;
- foco inicial en localizacion de informacion;
- uso de texto visible como recurso central;
- maximo inicial de 1 a 4 items por capsula;
- necesidad de feedback breve/completo;
- necesidad de fuente/derechos auditables;
- evidencia limitada y cautelosa.

## 6. Que debe bloquearse

Bloquear:

- student-use aprobado sin metadata;
- product-use aprobado sin metadata;
- continuidad automatica con un solo set cuando la policy lo impide;
- textos externos/copyrighted sin revision;
- claims de puntaje, dominio, diagnostico, cobertura completa o preparacion PAES;
- smoke humano que se interprete como aprobacion productiva;
- cambio de approvalMetadata fuera de fase autorizada.

## 7. Relacion con el set actual

El registry actual contiene:

```text
contentKey: l1_locating_information_pilot_set_01
title: PAES L1 - Localizacion de informacion - Piloto interno 01
contentType: reading_l1_locating_information
items: 3
registryScope: internal_pilot_candidate_only
studentUseApproved: false
productUseApproved: false
continuityPolicy: no_automatic_next_l1_studyload_without_second_reviewed_registry_ready_set
```

El set actual puede informar la rama pedagogica L1, pero no autoriza uso de estudiante/producto ni continuidad automatica.

## 8. Condiciones antes de static review y smoke

Antes de static review se requiere una fase de approval/continuity guardrails que defina como revisar sin cambiar approvalMetadata, como tratar derechos, que claims estan prohibidos y que evidencia se necesita para avanzar.

Antes de smoke humano se requiere evidencia de acceso/control local/dev y una decision documental que no contradiga las aprobaciones vigentes.

## 9. Result marker

```text
BPCPV1_PAES_L1_PRECONTRACT_READY_FOR_DERIVATION_WITH_CONDITIONS
```
