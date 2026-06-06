# M1-CAPSULE-FEEDBACK-1A - First balanced capsule source packet

## 1. Executive verdict

```text
FIRST_BALANCED_CAPSULE_SOURCE_PACKET_EXTRACTED_FOR_FEEDBACK_DESIGN
```

This document extracts the current source-grounded packet for:

```text
PAES M1 - Entrada balanceada inicial
contentKey: paes_m1_balanced_entry_initial
```

This phase does not design final feedback, does not author step-by-step help, does not implement anything, and does not modify content registry, continuity, UI, DB, schema, endpoints, runtime flows, or deploy state.

The packet is intended as source material for:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-FEEDBACK-1B
PRO authored feedback and step-by-step design for first balanced capsule
```

---

## 2. Source access

### 2.1 Governance documents read

```text
PHASE_LOG.md tail
nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md
nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md
nextjs_space/docs/operations/BPTT_ROADMAP_AND_LIVING_MICROROADMAP_TRANSVERSAL_CONTRACT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_EARLY_SEQUENCING_STRATEGY.md
nextjs_space/docs/operations/BPCPV1_PAES_M1_FIRST_BALANCED_CAPSULE_FICHA.md
```

### 2.2 Live content files read

```text
nextjs_space/lib/study-load-content.ts
nextjs_space/lib/paes-m1-first-capsule.ts
```

### 2.3 Related helpers read

```text
nextjs_space/lib/study-load-content.ts
nextjs_space/lib/study-load-continuity.ts
nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx
```

### 2.4 Sources not used or not available

```text
No DB was read.
No runtime was executed.
No student history was inspected.
No external item review was available.
No PRO-authored feedback source exists in the inspected M1 item packet.
No authored step-by-step source exists in the inspected M1 item packet.
```

### 2.5 Extraction limits

This is a source extraction from repo files only. It does not validate mathematical quality, does not redesign items, does not infer final distractor rationale, and does not declare the capsule BPCPv1-ready.

---

## 3. Capsule identity

| Field | Current source value |
|---|---|
| visible title | `PAES M1 - Entrada balanceada inicial` |
| contentKey | `paes_m1_balanced_entry_initial` |
| contentVersion | `v1` |
| program | `PAES_M1` |
| topic | `Entrada balanceada inicial` |
| estimatedMinutes | `8-12 minutos` |
| source file | `nextjs_space/lib/study-load-content.ts` |
| source location | registry entry starts at `study-load-content.ts:561` |
| helper title constant | `nextjs_space/lib/paes-m1-first-capsule.ts` |
| helper purpose constant | `Resuelve pocos ejercicios para ubicar tu punto de partida.` |

### 3.1 Pedagogical metadata in source

```text
programCode: PAES_M1
sliceId: BALANCED_ENTRY
sliceName: PAES M1 balanced entry signal
axis: balanced_entry
roadmapNodes:
- internal:balanced_entry_signal
- internal:as1_entry
officialSkillRefs:
- internal:resolver_problemas
- internal:modelar
- internal:representar
difficultyBand: entry
primaryPurpose: diagnose
evidenceType: mc_submission
estimatedMinutes: 10
reviewStatus: internal_provisional
expertReviewed: false
routingStatus: available_not_universal
```

Source-grounded note: `primaryPurpose: diagnose` is present in live metadata, but the accepted BPCPv1 ficha and sequencing strategy classify the capsule pedagogically as an initial balanced signal, not diagnostic placement.

### 3.2 Current instructions in source

```text
Esta actividad tiene 4 preguntas breves de opción múltiple. Cada una observa un eje distinto de Matemática M1: Números, Álgebra y funciones, Geometría, y Probabilidad y estadística.

No es una prueba final ni un puntaje PAES. La idea es obtener una primera señal para orientar tus siguientes cargas de estudio.

1. Lee cada enunciado con calma.
2. Trabaja en tu cuaderno o en una hoja de papel si lo necesitas.
3. Selecciona una alternativa por pregunta.
4. Envía tus respuestas.
5. Luego deja tu autorreporte y finaliza la actividad en esta misma página.
6. No necesitas volver a /now para cerrar la actividad.

No hay presión por la perfección. Lo importante es observar cómo partes y decidir el siguiente paso con cuidado.
```

### 3.3 Current limitation notice in source

```text
Tus respuestas se guardan como evidencia inicial para revisión. No recibirás puntaje PAES ni diagnóstico automático en esta versión.
```

---

## 4. Full current item packet

### 4.1 Item 1

| Field | Current source value |
|---|---|
| Item number | 1 |
| item key | `q1` |
| source location | `study-load-content.ts:580-590` |
| stem / prompt | `Una tienda ofrece un descuento de 20% en un producto que cuesta $15.000. ¿Cuánto dinero se descuenta?` |
| option A | `$1.500` |
| option B | `$2.000` |
| option C | `$3.000` |
| option D | `$12.000` |
| correct option | `C` |
| answer key / rationale | Answer key present via `correctOptionKey: 'C'`; no rationale field present. |
| metadata | No item-level metadata field present. Capsule-level metadata only. |
| current authoredFeedback | Not present in item source. |
| current authoredFeedbackComplete | Not present in item source. |
| notices / limitations | Capsule-level notice says responses are initial evidence for review and no PAES score or automatic diagnosis is provided. |

### 4.2 Item 2

| Field | Current source value |
|---|---|
| Item number | 2 |
| item key | `q2` |
| source location | `study-load-content.ts:591-601` |
| stem / prompt | `Un servicio de arriendo de bicicletas cobra $1.000 fijos y $500 por cada hora de uso. Si h representa la cantidad de horas, ¿qué expresión representa el costo total?` |
| option A | `1000h + 500` |
| option B | `1000 + 500h` |
| option C | `(1000 + 500)h` |
| option D | `1500h` |
| correct option | `B` |
| answer key / rationale | Answer key present via `correctOptionKey: 'B'`; no rationale field present. |
| metadata | No item-level metadata field present. Capsule-level metadata only. |
| current authoredFeedback | Not present in item source. |
| current authoredFeedbackComplete | Not present in item source. |
| notices / limitations | Capsule-level notice says responses are initial evidence for review and no PAES score or automatic diagnosis is provided. |

### 4.3 Item 3

| Field | Current source value |
|---|---|
| Item number | 3 |
| item key | `q3` |
| source location | `study-load-content.ts:602-612` |
| stem / prompt | `Un terreno rectangular mide 8 metros de largo y 5 metros de ancho. ¿Cuál es el área del terreno?` |
| option A | `13 m2` |
| option B | `26 m2` |
| option C | `40 m2` |
| option D | `80 m2` |
| correct option | `C` |
| answer key / rationale | Answer key present via `correctOptionKey: 'C'`; no rationale field present. |
| metadata | No item-level metadata field present. Capsule-level metadata only. |
| current authoredFeedback | Not present in item source. |
| current authoredFeedbackComplete | Not present in item source. |
| notices / limitations | Capsule-level notice says responses are initial evidence for review and no PAES score or automatic diagnosis is provided. |

### 4.4 Item 4

| Field | Current source value |
|---|---|
| Item number | 4 |
| item key | `q4` |
| source location | `study-load-content.ts:613-623` |
| stem / prompt | `En una bolsa hay 3 bolitas rojas y 2 bolitas azules, todas del mismo tamaño. Si se saca una bolita al azar, ¿cuál es la probabilidad de que sea azul?` |
| option A | `2/3` |
| option B | `2/5` |
| option C | `3/5` |
| option D | `1/2` |
| correct option | `B` |
| answer key / rationale | Answer key present via `correctOptionKey: 'B'`; no rationale field present. |
| metadata | No item-level metadata field present. Capsule-level metadata only. |
| current authoredFeedback | Not present in item source. |
| current authoredFeedbackComplete | Not present in item source. |
| notices / limitations | Capsule-level notice says responses are initial evidence for review and no PAES score or automatic diagnosis is provided. |

---

## 5. Current feedback availability

| Capability | Classification | Source-grounded evidence |
|---|---|---|
| Answer keys | Present | Each of `q1`, `q2`, `q3`, `q4` has `correctOptionKey`. |
| Correctness-only feedback | Available | `buildStudyLoadFeedback` maps selected option, correct option, and `isCorrect`. |
| Authored feedback brief | Absent for this capsule | No `authoredFeedback` object is present in the four M1 balanced-entry items. |
| Authored complete feedback | Absent for this capsule | No `authoredFeedback.complete` source is present for the four M1 balanced-entry items. |
| Step-by-step help | Absent for this capsule | The visible `+ paso a paso` content depends on `authoredFeedbackComplete`; the inspected items do not provide it. |
| Item rationale | Absent | Items contain `correctOptionKey`, but no rationale field. |
| Item-level metadata | Absent | No per-item focus, family, error taxonomy, or rationale fields are present in the item objects. |
| Capsule limitation notice | Present | Source says no PAES score or automatic diagnosis in this version. |

Source-grounded UI note: the answer form only renders authored feedback when `authoredFeedbackBrief` exists, and `+ paso a paso` content when `authoredFeedbackComplete` exists. For this M1 source packet, those fields are absent.

---

## 6. Mapping to FICHA-1 expectations

### 6.1 Item 1 mapping

| Field | Extraction |
|---|---|
| expected microcontact family | Números / porcentaje / racionalidad |
| evidence available | MC selected option, correctness through answer key, selected distractor, completion/review flow if submitted. |
| likely error signals | Base/percentage confusion, part-total confusion, choosing absolute value unrelated to 20% of 15.000. |
| missing feedback fields | Brief feedback, explanatory feedback, distractor-specific rationale, review prompt. |
| missing step-by-step fields | Reading, relevant data, strategy, calculation procedure, verification, possible error, transferable idea. |
| source-grounded caution | Error signals are inferred from options and stem; no source rationale confirms distractor intent. |

### 6.2 Item 2 mapping

| Field | Extraction |
|---|---|
| expected microcontact family | Álgebra y funciones / ecuación o relación |
| evidence available | MC selected option, correctness through answer key, selected distractor, completion/review flow if submitted. |
| likely error signals | Confusing fixed and variable cost, multiplying the whole sum by hours, treating total as a single hourly rate. |
| missing feedback fields | Brief feedback, explanatory feedback, distractor-specific rationale, model-building explanation. |
| missing step-by-step fields | Reading, relevant data, strategy, expression construction, verification, possible error, transferable idea. |
| source-grounded caution | Stem is expression/modeling-oriented, but source has no item-level skill tag or rationale. |

### 6.3 Item 3 mapping

| Field | Extraction |
|---|---|
| expected microcontact family | Geometría / área, medida o representación espacial |
| evidence available | MC selected option, correctness through answer key, selected distractor, completion/review flow if submitted. |
| likely error signals | Confusing area with perimeter, adding dimensions, multiplying by an extra factor, unit interpretation. |
| missing feedback fields | Brief feedback, explanatory feedback, distractor-specific rationale, area/perimeter contrast. |
| missing step-by-step fields | Reading, relevant data, strategy/formula, procedure, unit verification, possible error, transferable idea. |
| source-grounded caution | Options suggest common area/perimeter errors, but no source rationale confirms distractor design. |

### 6.4 Item 4 mapping

| Field | Extraction |
|---|---|
| expected microcontact family | Probabilidad y estadística / datos, gráfico o probabilidad básica |
| evidence available | MC selected option, correctness through answer key, selected distractor, completion/review flow if submitted. |
| likely error signals | Confusing favorable and total cases, choosing red count over blue count, comparing only colors instead of total outcomes. |
| missing feedback fields | Brief feedback, explanatory feedback, distractor-specific rationale, probability interpretation. |
| missing step-by-step fields | Reading, relevant data, strategy, favorable/total procedure, verification, possible error, transferable idea. |
| source-grounded caution | This is probability rather than table/graph data; still fits the Probabilidad y estadística family in the FICHA-1 contract. |

---

## 7. Risks for PRO feedback design

```text
- The source packet has answer keys but no authored rationale.
- The source packet has no item-level metadata, focus, family, or error taxonomy.
- Distractor intent must be inferred conservatively from options; it is not explicit in source.
- Feedback design must avoid treating one item as diagnosis.
- Step-by-step help is absent and must be designed before it can be promised as available.
- Current capsule metadata says primaryPurpose: diagnose, while governing documents require signal/not diagnostic placement.
- The helper purpose copy says "ubicar tu punto de partida", which may need future copy review before stronger exposure.
- Item 4 fits probability but not the "datos, gráfico" subexample; PRO should decide whether that is acceptable under the broader family.
- MC evidence does not reveal actual student procedure.
- No external expert item review is present in the inspected source.
```

---

## 8. Recommended next step

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-FEEDBACK-1B
PRO authored feedback and step-by-step design for first balanced capsule
```

The next phase should derive feedback and step-by-step contracts from this extracted packet and the accepted FICHA-1, without implementing them in code until an explicit future implementation phase is authorized.

---

## 9. Final verdict

```text
FIRST_BALANCED_CAPSULE_SOURCE_PACKET_EXTRACTED_FOR_FEEDBACK_DESIGN
```
