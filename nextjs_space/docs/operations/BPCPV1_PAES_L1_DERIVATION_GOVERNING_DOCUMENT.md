# BPCPv1-PAES-L1 - Capa Pedagogica v1 especifica para PAES Competencia Lectora L1

## 1. Executive verdict

```text
BPCPV1_PAES_L1_DERIVATION_ACCEPTED_WITH_TECHNICAL_AND_PRODUCT_BLOCKS
```

BPCPv1-PAES-L1 queda documentada como derivacion especifica para PAES Competencia Lectora L1, con bloqueos tecnicos, pedagogicos y de producto antes de static review, smoke, continuidad o aprobacion de uso.

## 2. Fuentes rectoras

| Fuente | Rol |
| --- | --- |
| BPCPI | Define ideal rector y Director Pedagogico sistemico. |
| BPTT | Define gramatica comun de tutorias Bexauri. |
| BPTT Roadmap / Living Microroadmap Contract | Distingue secuencia simple, roadmap maestro y microroadmap vivo. |
| Blueprint Tactico-Pedagogico L1 Integrado | Define contrato especifico L1. |
| BPCPv1-PAES-L1 Precontract | Define condiciones y bloqueos antes de avanzar. |
| Registry L1 actual | Provee set piloto interno y metadata vigente. |

## 3. Definicion de BPCPv1-PAES-L1

BPCPv1-PAES-L1 es la derivacion v1 especifica de la capa pedagogica Bexauri para PAES Competencia Lectora L1.

Gobierna:

```text
proposito lector
-> texto visible
-> tarea
-> evidencia
-> feedback
-> autorreporte
-> revision
-> continuidad
```

No es implementacion tecnica, banco final de textos ni aprobacion de producto.

## 4. Nomenclatura

```text
BPCPv1 = Capa Pedagogica v1 global de Bexauri
BPCPv1-PAES-L1 = derivacion especifica para PAES Competencia Lectora L1
PAES_L1 = tutoria/programa tecnico-pedagogico L1
L1 set piloto = l1_locating_information_pilot_set_01
```

Regla:

```text
BPCPv1-PAES-L1 no equivale a BPCPv1 global.
El set piloto L1 no equivale a PAES_L1 completa.
Registro interno no equivale a aprobacion de estudiante/producto.
```

## 5. Cadena rectora

Toda capsula L1 debe preservar esta cadena:

```text
proposito lector
-> texto visible
-> tarea
-> evidencia
-> feedback
-> autorreporte
-> revision
-> continuidad
```

Si un item, feedback o continuidad rompe esa cadena, debe corregirse antes de avanzar.

## 6. Contrato especifico L1

Contrato:

- texto visible y trazable;
- fuente/derechos documentados;
- items respondibles desde el texto;
- evidencia limitada;
- feedback breve y completo;
- revision disponible;
- continuidad cautelosa;
- sin claims de puntaje, dominio, diagnostico, cobertura completa ni aprobacion productiva.

## 7. Roadmap y microroadmap

Estado actual:

```text
No existe roadmap maestro L1 completo.
No existe microroadmap vivo L1.
```

El piloto actual puede ser una secuencia simple interna. No autoriza continuidad automatica ni roadmap completo. El roadmap maestro futuro requiere familias lectoras, tipos de texto, tipos de tarea, prerrequisitos, criterios de avance/refuerzo/revision y politica de derechos.

## 8. Evidencia, feedback y autorreporte

Evidencia L1: opcion elegida, acierto/error, item, texto asociado, distractor, revision de feedback, autorreporte si existe y completitud.

Feedback L1: debe volver al texto, explicar el dato o criterio lector y distinguir distractores. No debe prometer dominio ni avance automatico.

Autorreporte L1: debe permitir al estudiante indicar seguridad, dificultad y necesidad de revisar el texto. Si no esta implementado, las decisiones de continuidad deben ser mas conservadoras.

## 9. Derechos y QA del texto

Todo texto L1 requiere QA de derechos y fuente. Debe bloquearse cualquier avance con texto externo/copyrighted sin autorizacion o sin base documental.

El set actual declara:

```text
sourceClass: original_bexauri_created_candidate
rightsBasis: original_bexauri_created
officialSourceDependency: none
copyrightedSourceDependency: none
reviewStatus: reviewed_for_internal_pilot
```

Esta declaracion habilita documentacion interna, no aprobacion de producto.

## 10. Continuidad

La continuidad L1 requiere evidencia suficiente y contrato explicito. Con el estado vigente:

```text
continuityPolicy: no_automatic_next_l1_studyload_without_second_reviewed_registry_ready_set
```

Por tanto, la continuidad automatica con un solo set queda bloqueada.

## 11. Claims permitidos, cautelosos y prohibidos

Permitidos: practica guiada, actividad completada, feedback disponible, evidencia registrada, revision disponible.

Cautelosos: avance, progreso, refuerzo y siguiente paso, siempre con evidencia y limites.

Prohibidos: puntaje probable, dominio, diagnostico automatico, cobertura completa, preparacion PAES completa, uso de estudiante/producto aprobado sin metadata, continuidad automatica no autorizada y equivalencia con prueba oficial.

## 12. Relacion con registry actual

El registry actual conserva:

```text
contentKey: l1_locating_information_pilot_set_01
title: PAES L1 - Localizacion de informacion - Piloto interno 01
contentType: reading_l1_locating_information
items: 3
studentUseApproved: false
productUseApproved: false
```

Este documento no modifica registry, items, textos, feedback ni approvalMetadata.

## 13. Bloqueos

Bloqueos vigentes:

- no student-use aprobado;
- no product-use aprobado;
- no continuidad automatica con un solo set;
- no cambio de approvalMetadata;
- no uso de texto externo sin revision;
- no claims de score, mastery, diagnostico ni cobertura completa;
- no smoke flow sin guardrails previos de aprobacion/continuidad.

## 14. Proximas fases

La siguiente fase debe definir guardrails de aprobacion, continuidad, derechos y limites del piloto antes de static review.

```text
MVP-CONTENT-PAES-L1-APPROVAL-CONTINUITY-GUARDRAILS-1
```

## 15. Result marker

```text
BPCPV1_PAES_L1_DERIVATION_GOVERNING_DOCUMENT_ACCEPTED
```
