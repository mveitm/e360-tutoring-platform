# MVP-CONTENT-4 - PAES_M1 Balanced Entry Micro StudyLoad Registry Proposal

## 1. Phase type

Content / direction only.

No app code, no schema, no database mutation, no production operation, no Abacus, no deploy, no endpoint changes, no UI changes, no secrets, no long scripts.

## 2. Starting point

Repository state at phase start:

- HEAD = origin/main = 34e6865
- Commit: MVP-CONTENT-3: define PAES M1 first micro StudyLoad set
- Working tree clean
- Branch main up to date with origin/main

## 3. Purpose

MVP-CONTENT-4 prepares a safe, registry-ready proposal for the first ideal PAES_M1 balanced entry micro StudyLoad.

This phase does not update `nextjs_space/lib/study-load-content.ts`.

It defines the proposed content so a later implementation phase can add it to the content registry with minimal ambiguity.

## 4. Product decision

The ideal first PAES_M1 microcontact for a new student with unknown or partially known level should be balanced across the four PAES M1 axes:

- Números.
- Álgebra y funciones.
- Geometría.
- Probabilidad y estadística.

This is not because each official axis should be assumed to have exactly equal weight.

It is because the first microcontact should observe a broad initial signal without creating a heavy diagnostic experience.

## 5. Relationship with official PAES M1 structure

The official PAES M1 structure organizes mathematical knowledge into four thematic axes and evaluates cross-cutting skills such as resolver problemas, modelar, representar, and argumentar.

Bexauri should use this official structure as a source of alignment.

However, MVP-Beta should not claim an official weighting model or PAES score prediction.

Future MVP-Alfa work should evolve toward a roadmap balanced with official PAES information, axis relevance, prerequisites, cross-cutting skills, and accumulated student evidence.

## 6. Registry proposal

Proposed registry title:

`PAES M1 — Entrada balanceada inicial`

Proposed content key:

`paes_m1_balanced_entry_initial`

Proposed content version:

`v1`

Proposed active slice id:

`AS1`

Proposed micro StudyLoad id:

`AS1-MSL-00`

Proposed program:

`PAES_M1`

Proposed skill focus:

Balanced entry signal across PAES_M1 axes.

Proposed duration:

8-12 minutes.

Proposed item count:

4 items.

Proposed item distribution:

- q1: Números.
- q2: Álgebra y funciones.
- q3: Geometría.
- q4: Probabilidad y estadística.

## 7. Student-facing instructions

Suggested instructions:

Responde estos 4 ejercicios iniciales. No buscan darte un puntaje PAES ni definir tu nivel completo. Sirven para que Bexauri observe señales iniciales de tu trabajo y prepare mejor tus próximos pasos.

Trabaja con calma. Si algo te cuesta, responde lo mejor posible y al finalizar cuéntanos cómo te fue.

## 8. Item q1 - Números

Roadmap node:

A3 - Proportional reasoning and percentages.

Difficulty band:

D1 - Foundational.

PAES axis:

Números.

Cross-cutting skills:

- Resolver problemas.
- Modelar.

Item:

Un producto cuesta $20.000 y tiene un descuento del 10%. ¿Cuál es el precio final?

Options:

A. $18.000  
B. $19.000  
C. $20.100  
D. $22.000  

Correct option:

A

Short explanation:

El 10% de $20.000 es $2.000. Entonces, el precio final es $20.000 - $2.000 = $18.000.

Evidence purpose:

Observe basic percentage understanding and proportional reasoning in a familiar context.

If strong:

Student may be ready for proportional reasoning at D2 or percentage variation contexts.

If weak:

Reinforce percentage meaning, decimal conversion, and discount/increase structure.

## 9. Item q2 - Álgebra y funciones

Roadmap node:

B2 - Linear equations and inequalities.

Difficulty band:

D1 - Foundational.

PAES axis:

Álgebra y funciones.

Cross-cutting skills:

- Resolver problemas.
- Representar.

Item:

Si 2x + 5 = 17, ¿cuál es el valor de x?

Options:

A. 4  
B. 5  
C. 6  
D. 11  

Correct option:

C

Short explanation:

Restamos 5 a ambos lados: 2x = 12. Luego dividimos por 2: x = 6.

Evidence purpose:

Observe direct linear equation solving and inverse operation control.

If strong:

Student may continue to multi-step equations or contextual equation setup.

If weak:

Reinforce equation structure, inverse operations, and equality preservation.

## 10. Item q3 - Geometría

Roadmap node:

C1 - Plane geometry and measurement.

Difficulty band:

D1 - Foundational.

PAES axis:

Geometría.

Cross-cutting skills:

- Resolver problemas.
- Representar.

Item:

Un rectángulo mide 8 cm de largo y 5 cm de ancho. ¿Cuál es su área?

Options:

A. 13 cm²  
B. 26 cm²  
C. 40 cm²  
D. 80 cm²  

Correct option:

C

Short explanation:

El área de un rectángulo se calcula multiplicando largo por ancho: 8 x 5 = 40 cm².

Evidence purpose:

Observe formula selection, multiplication, unit awareness, and basic geometric measurement.

If strong:

Student may move toward composed figures or contextual measurement.

If weak:

Reinforce area vs perimeter distinction and rectangle area formula.

## 11. Item q4 - Probabilidad y estadística

Roadmap node:

D3 - Probability.

Difficulty band:

D1 - Foundational.

PAES axis:

Probabilidad y estadística.

Cross-cutting skills:

- Resolver problemas.
- Representar.

Item:

En una bolsa hay 3 fichas rojas y 2 fichas azules. Si se saca una ficha al azar, ¿cuál es la probabilidad de que sea azul?

Options:

A. 1/5  
B. 2/5  
C. 3/5  
D. 2/3  

Correct option:

B

Short explanation:

Hay 2 fichas azules de un total de 5 fichas. Por eso, la probabilidad es 2/5.

Evidence purpose:

Observe sample space identification and basic probability as favorable cases over total cases.

If strong:

Student may move toward event comparison or relative frequency.

If weak:

Reinforce total cases, favorable cases, and probability notation.

## 12. Feedback policy

This StudyLoad should show basic honest feedback only.

Allowed feedback:

- answered count;
- saved responses;
- correct count if handled safely by existing backend/admin evidence flow;
- non-PAES note;
- self-report.

Not allowed:

- PAES score;
- mastery claim;
- automatic placement claim;
- automatic adaptive decision;
- AI tutor claim.

Suggested student-facing note:

Este resultado es solo evidencia de esta actividad; no es un puntaje PAES ni una decisión automática de avance.

## 13. Supervisor interpretation

This micro StudyLoad should be interpreted as an entry signal, not as a diagnostic conclusion.

Possible interpretation patterns:

### Broad strength

If the student answers 4/4 or 3/4 correctly and self-report is positive or neutral:

- consider advancing to a slightly harder active slice;
- consider validating with algebra/function or proportional reasoning;
- avoid assuming full PAES readiness.

### Algebra-only weakness

If the student misses q2 but performs well elsewhere:

- reinforce linear equation structure;
- use current registry-aligned algebra content if appropriate.

### Number/proportional weakness

If the student misses q1:

- reinforce percentages and proportional reasoning before heavier algebra contexts.

### Geometry weakness

If the student misses q3:

- reinforce area/perimeter and measurement concepts.

### Probability/statistics weakness

If the student misses q4:

- reinforce sample space and favorable/total cases.

### Mixed or low evidence

If the student answers 0/4, 1/4, or self-reports difficulty:

- do not label the student as low level;
- provide reinforcement;
- use a gentle D0/D1 slice;
- consider supervisor review.

## 14. Relationship with existing registry

Current PAES_M1 registry content is useful but concentrated in Álgebra y funciones:

- `PAES M1 — Ecuaciones lineales básicas`.
- `PAES M1 — Problemas con ecuaciones lineales`.
- `PAES M1 — Refuerzo de ecuaciones lineales`.
- `PAES M1 — Funciones lineales básicas`.

This new proposal fills a different need:

- initial balanced signal;
- broad axis coverage;
- low-friction entry;
- better alignment with the master roadmap principle.

The existing algebra/function activities should be preserved.

They can be used after the balanced entry activity when evidence points toward algebra/function continuation.

## 15. Registry-ready summary

Proposed metadata summary:

| Field | Proposed value |
|---|---|
| title | PAES M1 — Entrada balanceada inicial |
| contentKey | paes_m1_balanced_entry_initial |
| contentVersion | v1 |
| program | PAES_M1 |
| activeSlice | AS1 |
| microStudyLoad | AS1-MSL-00 |
| itemCount | 4 |
| duration | 8-12 minutes |
| axis distribution | 1 Números, 1 Álgebra y funciones, 1 Geometría, 1 Probabilidad y estadística |
| difficulty | D1 foundational |
| purpose | broad initial evidence signal |
| implementation status | proposal only |

## 16. Implementation recommendation

Do not implement this directly inside `study-load-content.ts` in this phase.

Recommended later implementation phase:

MVP-CONTENT-4A - Add PAES_M1 balanced entry activity to content registry.

Implementation should:

- add the new registry entry;
- preserve existing registry entries;
- keep `correctOptionKey` server-owned;
- verify that the activity page strips answer keys before client rendering;
- build locally;
- avoid DB mutation unless explicitly planned.

## 17. MVP-Beta effect

If implemented later, this balanced entry activity becomes the preferred first PAES_M1 microcontact for new students with unknown or partially known level.

It does not replace the master roadmap.

It does not replace active slice logic.

It does not replace human supervision.

It provides the first broad evidence signal for the SRA.

## 18. MVP-Alfa effect

MVP-Alfa should improve this initial entry logic using:

- official PAES information;
- axis relevance;
- cross-cutting skills;
- prerequisites;
- accumulated student evidence;
- challenge / validation signals;
- ensayo results;
- supervisor observations.

MVP-Alfa should not assume that all axes are equally weighted forever.

The balanced entry activity is a first observation strategy, not a final weighting model.

## 19. Not included in this phase

This phase does not create:

- app code;
- registry code changes;
- schema changes;
- DB mutations;
- automatic roadmap engine;
- adaptive theta model;
- PAES score model;
- challenge engine;
- ensayo integration;
- AI tutor;
- production deploy.

## 20. Next recommended phase

MVP-CONTENT-4A - Add PAES_M1 balanced entry activity to content registry.

Purpose:

Implement the approved balanced entry activity in `nextjs_space/lib/study-load-content.ts` as a controlled registry-only content change.
