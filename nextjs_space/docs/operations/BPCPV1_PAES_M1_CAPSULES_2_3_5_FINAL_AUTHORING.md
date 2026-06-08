# BPCPv1 PAES_M1 - Final authoring documental para capsulas 2, 3 y 5

## 1. Executive verdict

Verdict:

```text
M1_CAPSULES_2_3_5_FINAL_AUTHORING_DRAFTED_DOCUMENTATION_LEVEL
```

This document authors documentation-level final feedback assets for PAES_M1 capsules 2, 3, and 5 only.

Authoring completion:

```text
COMPLETED_WITHOUT_ITEM_BLOCKERS
```

No item is marked as blocked in this phase. The source details, candidate keys, and item roles were sufficiently visible in the audited documents and current live source for documentation-level final authoring.

Important boundary: "final" in this document means final as an authoring artifact for review and future implementation planning. It does not mean implemented, registry-ready, deployed, or approved as final implementation keys.

## 2. Purpose

This document provides documentation-level final authoring assets for the first limited PAES_M1 authoring batch:

- Capsule 2: `paes_m1_linear_equations_basic`.
- Capsule 3: `paes_m1_numbers_percentage_proportionality_entry`.
- Capsule 5: `paes_m1_geometry_area_measure_entry`.

For each item, it includes:

- final feedback breve;
- final feedback completo;
- final step-by-step script;
- item-level rationale;
- distractor or error-family rationale;
- key-validation note;
- inference-limit note.

This phase does not author capsule 4 or capsule 6.

## 3. Governance basis / documentos leidos

This document is grounded in:

- `PHASE_LOG.md`;
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`;
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`;
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`;
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_LIMITED_AUTHORING_SCOPE.md`;
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_AUTHORING_READINESS.md`;
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS_INTEGRATION.md`;
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_FEEDBACK_CONTRACTS.md`;
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_4_FICHAS.md`;
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_FICHAS.md`;
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_6_CALIBRATION_PLAN.md`;
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_DERIVATION_GOVERNING_DOCUMENT.md`;
- `nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M1_INTEGRADO.md`;
- read-only source inspection of `nextjs_space/lib/study-load-content.ts` for capsule 2 item details;
- read-only source-authoring inspection of `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_3_5_SOURCE_AUTHORING.md` for capsule 3 and capsule 5 item details.

## 4. Scope and exclusions

In scope:

- documentation-level final feedback breve for capsules 2, 3, and 5;
- documentation-level final feedback completo for capsules 2, 3, and 5;
- documentation-level final step-by-step scripts for capsules 2, 3, and 5;
- item-level rationales;
- distractor and error-family rationales;
- key-validation notes;
- inference-limit notes;
- capsule-level non-purpose reminders and implementation blockers.

Out of scope:

- capsule 4 authoring;
- capsule 6 authoring;
- implementation;
- registry changes;
- continuity changes;
- route-order changes;
- source item edits;
- generated capsules;
- API or external API calls;
- runtime or browser tests;
- deployed student-facing content;
- final implementation keys.

## 5. Shared authoring rules for capsules 2/3/5

All feedback assets must:

- focus on the task asked by the item;
- explain the central relation or calculation;
- support recovery without overclaiming;
- use concise mobile-readable language;
- distinguish calculation from interpretation when relevant;
- keep item evidence limited and cautious;
- avoid route, score, diagnostic, mastery, or adaptive claims.

The authoring may say what a response may suggest. It must not claim what the student definitively knows or does not know.

## 6. Shared prohibited claims

The authoring must not claim:

- mastery;
- readiness;
- theta;
- PAES score;
- diagnostic certainty;
- route certainty;
- adaptive AI;
- Sales-Ready status;
- that Bexauri has decided the student's route;
- that one response proves a stable level.

Allowed posture:

- early signal;
- limited evidence;
- may suggest;
- could indicate;
- conviene revisar;
- requires more evidence;
- useful for review, not diagnosis.

## 7. Shared mobile readability rules

Feedback breve should remain compact and actionable.

Feedback completo should explain the item without becoming a general lesson.

Step-by-step scripts should use 4 to 6 short steps and end with a check.

When a calculation has context, the script should include both the calculation and the interpretation of the result.

## 8. Shared key-validation boundary

Every key in this document is treated as:

```text
current-source/ficha key candidate only
```

The key-validation notes check whether each candidate appears mathematically consistent with the documented item. They do not approve final implementation keys.

If a future implementation phase detects a key inconsistency, it must stop for that item and mark a key-validation blocker before registry work.

## 9. Capsule 2 final authoring package

### Capsule identity

| Field | Value |
|---|---|
| Capsule | 2 |
| contentKey | `paes_m1_linear_equations_basic` |
| Title | PAES M1 - Ecuaciones lineales basicas |
| Role | Algebra/functions initial signal after balanced entry |
| Source type | Current live source |
| Item count | 4 |
| Authoring status | Documentation-level final authoring drafted |
| Implementation status | Blocked |

Capsule-level non-purpose reminder:

- Not a diagnosis of Algebra mastery.
- Not proof of equation fluency.
- Not a PAES score or route signal.
- Not adaptive AI.
- Not implementation-ready content.

Capsule-level implementation blocker note:

The authored assets below are not in the registry, not deployed, and not final implementation keys. Registry implementation, final schema/content decisions, and runtime validation remain blocked.

### Capsule 2 item summary table

| Item | Source task | Key candidate | Main focus |
|---|---|---|---|
| q1 | Solve `x + 5 = 12`. | B | Inverse operation for addition |
| q2 | Solve `3x = 21`. | B | Multiplicative inverse / division |
| q3 | Solve `2x - 4 = 10`. | C | Two-step equation mechanics |
| q4 | Solve `x / 3 = 9`. | C | Multiplicative inverse / multiplication |

### Capsule 2 - Item q1

Source task:

```text
Solve x + 5 = 12.
Options: A. 5; B. 7; C. 12; D. 17.
```

Current-source/ficha key candidate:

```text
B
```

Documentation-level key-validation note:

Candidate B appears mathematically consistent because `7 + 5 = 12`. This is not a final implementation key.

Final feedback breve:

Revisa la operacion inversa: si a `x` se le suma 5, conviene restar 5 a ambos lados y comprobar el valor en la ecuacion.

Final feedback completo:

El item pide encontrar el valor que hace verdadera la ecuacion `x + 5 = 12`. La opcion candidata funciona porque al restar 5 a ambos lados queda `x = 7`, y al comprobar `7 + 5 = 12`. Las otras opciones pueden ser tentadoras si se toma un numero visible de la ecuacion, si se resta parcialmente, o si se suma en vez de deshacer la suma. Esta respuesta puede sugerir revisar operaciones inversas, pero una sola ecuacion no permite diagnosticar desempeno en Algebra.

Step-by-step script:

1. Lee la ecuacion: `x + 5 = 12`.
2. Identifica que a `x` se le esta sumando 5.
3. Deshaz esa suma restando 5 a ambos lados.
4. Calcula `12 - 5 = 7`.
5. Comprueba: `7 + 5 = 12`.

Item-level rationale:

The candidate key works because subtracting 5 isolates the unknown and gives `x = 7`.

Distractor/error-family rationale:

- A may suggest choosing the visible added amount or stopping before isolating `x`.
- C may suggest copying the result side of the equation.
- D may suggest adding 12 and 5 instead of applying the inverse operation.

Inference-limit note:

This response may suggest an early signal about using inverse operations for one-step equations. It cannot prove equation fluency or Algebra mastery.

### Capsule 2 - Item q2

Source task:

```text
Solve 3x = 21.
Options: A. 3; B. 7; C. 18; D. 24.
```

Current-source/ficha key candidate:

```text
B
```

Documentation-level key-validation note:

Candidate B appears mathematically consistent because `3 * 7 = 21`. This is not a final implementation key.

Final feedback breve:

El foco es deshacer la multiplicacion: si `3x` vale 21, divide 21 por 3 y luego verifica multiplicando de nuevo.

Final feedback completo:

El item pide resolver una ecuacion donde `x` esta multiplicada por 3. La opcion candidata funciona porque dividir ambos lados por 3 da `x = 7`, y la comprobacion `3 * 7 = 21` confirma la igualdad. Las opciones incorrectas pueden aparecer si se copia el coeficiente, si se resta 3 a 21, o si se suma en vez de dividir. Esto puede indicar una friccion puntual con la operacion inversa, no una conclusion general sobre ecuaciones.

Step-by-step script:

1. Lee la ecuacion: `3x = 21`.
2. Interpreta `3x` como `3 * x`.
3. Divide ambos lados por 3.
4. Calcula `21 / 3 = 7`.
5. Comprueba: `3 * 7 = 21`.

Item-level rationale:

The candidate key works because division by 3 isolates `x` in `3x = 21`.

Distractor/error-family rationale:

- A may suggest copying the coefficient 3.
- C may suggest subtracting 3 from 21.
- D may suggest adding 3 to 21.

Inference-limit note:

This item may suggest whether the student uses division as the inverse of multiplication in a simple equation. It cannot establish stable equation performance.

### Capsule 2 - Item q3

Source task:

```text
Solve 2x - 4 = 10.
Options: A. 3; B. 5; C. 7; D. 14.
```

Current-source/ficha key candidate:

```text
C
```

Documentation-level key-validation note:

Candidate C appears mathematically consistent because `2 * 7 - 4 = 10`. This is not a final implementation key.

Final feedback breve:

En una ecuacion de dos pasos, primero deshaz la resta y despues la multiplicacion. Luego sustituye el valor para comprobar.

Final feedback completo:

El item pide resolver `2x - 4 = 10`. La opcion candidata funciona porque primero se suma 4 a ambos lados para obtener `2x = 14`, y luego se divide por 2 para obtener `x = 7`. Al comprobar, `2 * 7 - 4 = 10`. Las alternativas pueden ser tentadoras si se divide antes de compensar la resta, si se usa solo una parte del procedimiento, o si se detiene en `14` sin dividir. Esta respuesta puede sugerir revisar orden de operaciones inversas en ecuaciones de dos pasos.

Step-by-step script:

1. Lee la ecuacion: `2x - 4 = 10`.
2. Deshaz la resta sumando 4 a ambos lados.
3. Obtienes `2x = 14`.
4. Divide ambos lados por 2.
5. Obtienes `x = 7`.
6. Comprueba: `2 * 7 - 4 = 10`.

Item-level rationale:

The candidate key works because the equation requires two inverse operations: add 4, then divide by 2.

Distractor/error-family rationale:

- A may suggest calculating `(10 - 4) / 2`, using the sign in the wrong direction.
- B may suggest dividing 10 by 2 and ignoring the `-4`.
- D may suggest stopping after adding 4 to both sides.

Inference-limit note:

This item may suggest an early signal about two-step equation mechanics. It cannot prove broader equation fluency.

### Capsule 2 - Item q4

Source task:

```text
Solve x/3 = 9.
Options: A. 3; B. 12; C. 27; D. 6.
```

Current-source/ficha key candidate:

```text
C
```

Documentation-level key-validation note:

Candidate C appears mathematically consistent because `27 / 3 = 9`. This is not a final implementation key.

Final feedback breve:

Si `x` esta dividido por 3, la operacion inversa es multiplicar por 3. Despues revisa si el valor vuelve a dar 9 al dividir.

Final feedback completo:

El item pide resolver `x/3 = 9`. La opcion candidata funciona porque multiplicar ambos lados por 3 da `x = 27`, y la comprobacion `27 / 3 = 9` mantiene la igualdad. Las opciones incorrectas pueden aparecer si se copia el divisor, si se suma 3 y 9, o si se resta en vez de multiplicar. Esto puede indicar una necesidad de revisar fracciones simples en ecuaciones, con evidencia limitada a este item.

Step-by-step script:

1. Lee la ecuacion: `x/3 = 9`.
2. Identifica que `x` esta dividida por 3.
3. Multiplica ambos lados por 3.
4. Calcula `9 * 3 = 27`.
5. Comprueba: `27 / 3 = 9`.

Item-level rationale:

The candidate key works because multiplying by 3 reverses division by 3.

Distractor/error-family rationale:

- A may suggest copying the divisor.
- B may suggest adding 3 and 9.
- D may suggest subtracting 3 from 9.

Inference-limit note:

This response may suggest how the student handles a division equation. It cannot establish overall Algebra performance or route direction.

## 10. Capsule 3 final authoring package

### Capsule identity

| Field | Value |
|---|---|
| Capsule | 3 |
| contentKey | `paes_m1_numbers_percentage_proportionality_entry` |
| Title | PAES M1 - Porcentaje y proporcionalidad en contexto |
| Role | Numbers / percentage / proportionality signal |
| Source type | Revised documentation-level source-authoring candidate |
| Item count | 4 |
| Authoring status | Documentation-level final authoring drafted with source-candidate caveat |
| Implementation status | Blocked |

Capsule-level non-purpose reminder:

- Not a diagnosis of Numbers mastery.
- Not a remedial route.
- Not a PAES score or route signal.
- Not adaptive AI.
- Not registry-ready content.

Capsule-level implementation blocker note:

This capsule is still a revised documentation-level source candidate. Implementation source status, registry integration, final key validation, and runtime use remain blocked.

### Capsule 3 item summary table

| Item | Source task | Key candidate | Main focus |
|---|---|---|---|
| q1 | 25% of 40 students participate in a workshop. | B | Percent of a quantity |
| q2 | 600 ml bottle; 20% less than the start remains. | B | Percentage decrease and remaining amount |
| q3 | Compare notebook offers by lower unit price. | A | Unit price / proportional comparison |
| q4 | Preserve juice ratio when concentrate doubles. | C | Ratio/equivalence |

### Capsule 3 - Item q1

Source task:

```text
En un curso hay 40 estudiantes. El 25% participa en el taller de ciencias. ¿Cuantos estudiantes participan en ese taller?
Options: A. 8; B. 10; C. 15; D. 25.
```

Current-source/ficha key candidate:

```text
B
```

Documentation-level key-validation note:

Candidate B appears mathematically consistent because 25% is one fourth, and one fourth of 40 is 10. This is not a final implementation key.

Final feedback breve:

El foco es reconocer la base: el 25% se calcula sobre 40 estudiantes. Como 25% es un cuarto, conviene revisar `40 / 4`.

Final feedback completo:

El item pide calcular una parte de un total: 25% de 40 estudiantes. La opcion candidata funciona porque 25% equivale a un cuarto, y `40 / 4 = 10`. Las otras opciones pueden ser tentadoras si se usa otro porcentaje, si se suma un valor parcial, o si se toma 25 como cantidad de estudiantes. Esta respuesta puede sugerir revisar la relacion parte-todo, pero un item no permite concluir desempeno general en porcentajes.

Step-by-step script:

1. Identifica la base: 40 estudiantes.
2. Interpreta 25% como un cuarto del total.
3. Calcula `40 / 4`.
4. Obtienes 10 estudiantes.
5. Comprueba que 10 es menor que 40 y tiene sentido como parte del curso.

Item-level rationale:

The candidate key works because 25% of 40 equals 10.

Distractor/error-family rationale:

- A may suggest dividing by 5 or using 20%.
- C may suggest adding an unrelated partial value.
- D may suggest treating the percent number as the count.

Inference-limit note:

This item may suggest an early signal about percent as part of a whole. It cannot prove broader Numbers or proportionality performance.

### Capsule 3 - Item q2

Source task:

```text
Una botella tenia 600 ml de agua. Despues de beber, queda un 20% menos que al inicio. ¿Cuanta agua queda en la botella?
Options: A. 120 ml; B. 480 ml; C. 580 ml; D. 720 ml.
```

Current-source/ficha key candidate:

```text
B
```

Documentation-level key-validation note:

Candidate B appears mathematically consistent because 20% of 600 is 120, and `600 - 120 = 480`. This is not a final implementation key.

Final feedback breve:

La idea central es separar cuanto disminuye de cuanto queda. Primero calcula el 20% de 600 y despues restalo al total inicial.

Final feedback completo:

El item pregunta por la cantidad que queda, no solo por la disminucion. La opcion candidata funciona porque 20% de 600 ml es 120 ml, y al quedar 20% menos se calcula `600 - 120 = 480 ml`. Las otras opciones pueden aparecer si se informa solo la disminucion, si se resta 20 como cantidad fija, o si se aumenta en vez de disminuir. Esta respuesta puede sugerir revisar base, porcentaje y significado de "queda".

Step-by-step script:

1. Identifica la base inicial: 600 ml.
2. Calcula el 20% de 600: `0.20 * 600 = 120`.
3. Interpreta 120 ml como la disminucion.
4. Resta la disminucion: `600 - 120 = 480`.
5. Comprueba que queda menos que al inicio.

Item-level rationale:

The candidate key works because the remaining amount is the original amount minus the 20% decrease.

Distractor/error-family rationale:

- A may report the decrease instead of what remains.
- C may suggest subtracting 20 as an absolute amount.
- D may suggest increasing instead of decreasing.

Inference-limit note:

This item may suggest whether the student distinguishes decrease amount from remaining amount. It cannot diagnose percentage understanding.

### Capsule 3 - Item q3

Source task:

```text
En una tienda, 3 cuadernos cuestan $2.400. En otra tienda, 5 cuadernos cuestan $4.500. Si los cuadernos son iguales, ¿en que tienda conviene comprar si se busca el menor precio por cuaderno?
Options: A. En la primera tienda, porque cada cuaderno cuesta $800; B. En la segunda tienda, porque cada cuaderno cuesta $900; C. En la primera tienda, porque 3 cuadernos son menos que 5; D. En la segunda tienda, porque el total es mayor.
```

Current-source/ficha key candidate:

```text
A
```

Documentation-level key-validation note:

Candidate A appears mathematically consistent because `$2.400 / 3 = $800` and `$4.500 / 5 = $900`; the lower unit price is in the first store. This is not a final implementation key.

Final feedback breve:

Para comparar ofertas, conviene comparar precio por cuaderno. Calcula cada precio unitario y elige el menor.

Final feedback completo:

El item pide decidir donde conviene comprar si se busca menor precio por cuaderno. La opcion candidata funciona porque en la primera tienda cada cuaderno cuesta $800 y en la segunda cuesta $900. Comparar solo el total o solo la cantidad de cuadernos no basta, porque las ofertas tienen cantidades distintas. Esta respuesta puede sugerir revisar precio unitario y comparacion proporcional.

Step-by-step script:

1. Calcula el precio por cuaderno en la primera tienda: `2400 / 3 = 800`.
2. Calcula el precio por cuaderno en la segunda tienda: `4500 / 5 = 900`.
3. Compara los precios unitarios.
4. El menor precio por cuaderno es 800.
5. Verifica que la decision responde a "menor precio por cuaderno".

Item-level rationale:

The candidate key works because the first store has the lower unit price.

Distractor/error-family rationale:

- B may identify a unit price but miss that 900 is higher than 800.
- C may compare only item counts.
- D may compare total price only.

Inference-limit note:

This item may suggest an early signal about proportional comparison by unit price. It cannot establish general financial reasoning or ratio performance.

### Capsule 3 - Item q4

Source task:

```text
Para preparar jugo, una receta usa 2 vasos de concentrado por cada 5 vasos de agua. Si se usan 4 vasos de concentrado y se mantiene la misma proporcion, ¿cuantos vasos de agua se necesitan?
Options: A. 7; B. 8; C. 10; D. 20.
```

Current-source/ficha key candidate:

```text
C
```

Documentation-level key-validation note:

Candidate C appears mathematically consistent because doubling concentrate from 2 to 4 also doubles water from 5 to 10. This is not a final implementation key.

Final feedback breve:

El foco es mantener la misma proporcion: si el concentrado se duplica, el agua tambien debe duplicarse.

Final feedback completo:

El item pide mantener una relacion proporcional entre concentrado y agua. La opcion candidata funciona porque pasar de 2 a 4 vasos de concentrado multiplica por 2, por lo que los 5 vasos de agua tambien se multiplican por 2: `5 * 2 = 10`. Las otras opciones pueden surgir si se suma en vez de multiplicar o si se combinan numeros visibles sin conservar la relacion. Esta respuesta puede sugerir revisar escalamiento multiplicativo.

Step-by-step script:

1. Lee la relacion original: 2 vasos de concentrado por 5 de agua.
2. Observa que el concentrado pasa de 2 a 4.
3. Identifica el factor: se multiplica por 2.
4. Aplica el mismo factor al agua: `5 * 2 = 10`.
5. Comprueba que la nueva relacion mantiene la proporcion.

Item-level rationale:

The candidate key works because both quantities must scale by the same factor to preserve the ratio.

Distractor/error-family rationale:

- A may suggest additive reasoning.
- B may suggest adding original quantities or using an incomplete adjustment.
- D may suggest multiplying visible values without preserving the relation.

Inference-limit note:

This response may suggest one signal about preserving proportional relations. It cannot prove general proportional reasoning.

## 11. Capsule 5 final authoring package

### Capsule identity

| Field | Value |
|---|---|
| Capsule | 5 |
| contentKey | `paes_m1_geometry_area_measure_entry` |
| Title | PAES M1 - Area, perimetro y medida en figuras simples |
| Role | Geometry / area / measure signal |
| Source type | Revised documentation-level source-authoring candidate |
| Item count | 4 |
| Authoring status | Documentation-level final authoring drafted with source-candidate caveat |
| Implementation status | Blocked |

Capsule-level non-purpose reminder:

- Not a diagnosis of Geometry mastery.
- Not a spatial ability claim.
- Not a PAES score or route signal.
- Not adaptive AI.
- Not registry-ready content.

Capsule-level implementation blocker note:

This capsule is still a revised documentation-level source candidate. Implementation source status, registry integration, final key validation, and runtime use remain blocked.

### Capsule 5 item summary table

| Item | Source task | Key candidate | Main focus |
|---|---|---|---|
| q1 | Identify what measure is needed for fencing the border of a rectangle. | B | Area vs perimeter |
| q2 | Add areas of two rectangles in an L-shaped room. | B | Composite area |
| q3 | Convert 2 meters to centimeters and count 25 cm pieces. | B | Unit consistency |
| q4 | Compare two rectangular surfaces. | A | Area comparison |

### Capsule 5 - Item q1

Source task:

```text
Un jardin rectangular mide 6 m de largo y 4 m de ancho. Se quiere poner una reja alrededor de todo el borde. ¿Que medida se necesita calcular?
Options: A. El area: 6 x 4; B. El perimetro: 6 + 4 + 6 + 4; C. La diagonal: 6 + 4; D. El volumen: 6 x 4 x 2.
```

Current-source/ficha key candidate:

```text
B
```

Documentation-level key-validation note:

Candidate B appears mathematically consistent because a fence around the border requires perimeter, not area. This is not a final implementation key.

Final feedback breve:

La palabra clave es "alrededor del borde": eso apunta a perimetro. Revisa si la pregunta pide borde o superficie.

Final feedback completo:

El item pregunta que medida se necesita para poner una reja alrededor del borde de un rectangulo. La opcion candidata funciona porque el borde completo se calcula con el perimetro: `6 + 4 + 6 + 4`. El area serviria para cubrir superficie, no para rodear el borde. La diagonal y el volumen no responden a esta situacion. Esta respuesta puede sugerir revisar la diferencia entre borde y superficie.

Step-by-step script:

1. Lee que se quiere poner una reja alrededor del borde.
2. Relaciona "borde" con perimetro.
3. Identifica los lados del rectangulo: 6 m y 4 m.
4. Suma todos los lados: `6 + 4 + 6 + 4`.
5. Comprueba que la unidad queda en metros, no en metros cuadrados.

Item-level rationale:

The candidate key works because perimeter measures the full border of a figure.

Distractor/error-family rationale:

- A may suggest area/perimeter confusion.
- C may suggest adding dimensions without matching the border context.
- D may suggest an irrelevant 3D interpretation.

Inference-limit note:

This item may suggest whether the student distinguishes border from surface in a simple context. It cannot diagnose Geometry understanding.

### Capsule 5 - Item q2

Source task:

```text
Una sala con forma de L ya esta dividida en dos rectangulos: uno mide 5 m por 3 m y el otro mide 2 m por 4 m. ¿Cual es el area total de la sala?
Options: A. 14 m2; B. 23 m2; C. 30 m2; D. 40 m2.
```

Current-source/ficha key candidate:

```text
B
```

Documentation-level key-validation note:

Candidate B appears mathematically consistent because the rectangle areas are `5 * 3 = 15` and `2 * 4 = 8`, and `15 + 8 = 23`. This is not a final implementation key.

Final feedback breve:

Como la sala ya esta dividida en dos rectangulos, calcula cada area y despues suma las dos partes.

Final feedback completo:

El item pide el area total de una sala en forma de L ya separada en dos rectangulos. La opcion candidata funciona porque el primer rectangulo tiene area `5 * 3 = 15 m2` y el segundo `2 * 4 = 8 m2`; juntas suman `23 m2`. Las otras opciones pueden aparecer si se suman solo dimensiones visibles, si se duplica una parte, o si se multiplican medidas que no forman un mismo rectangulo. Esta respuesta puede sugerir revisar area compuesta por partes.

Step-by-step script:

1. Identifica los dos rectangulos ya separados.
2. Calcula el area del primero: `5 * 3 = 15`.
3. Calcula el area del segundo: `2 * 4 = 8`.
4. Suma las areas: `15 + 8 = 23`.
5. Comprueba que la respuesta esta en unidades cuadradas.

Item-level rationale:

The candidate key works because total composite area is the sum of the areas of the non-overlapping parts.

Distractor/error-family rationale:

- A may suggest adding visible dimensions instead of areas.
- C may suggest multiplying one pair and doubling incorrectly.
- D may suggest multiplying unrelated dimensions.

Inference-limit note:

This item may suggest an early signal about decomposing a figure into rectangular areas. It cannot establish broad Geometry performance.

### Capsule 5 - Item q3

Source task:

```text
Una cinta mide 2 metros. Para un trabajo se necesitan trozos de 25 centimetros. ¿Cuantos trozos completos de 25 cm se pueden cortar?
Options: A. 4; B. 8; C. 25; D. 50.
```

Current-source/ficha key candidate:

```text
B
```

Documentation-level key-validation note:

Candidate B appears mathematically consistent because 2 meters are 200 centimeters, and `200 / 25 = 8`. This is not a final implementation key.

Final feedback breve:

Antes de dividir, pon las medidas en la misma unidad: 2 metros son 200 centimetros. Luego calcula cuantos trozos de 25 cm caben.

Final feedback completo:

El item pide cuantos trozos completos de 25 cm se pueden cortar desde una cinta de 2 metros. La opcion candidata funciona porque primero hay que convertir `2 m = 200 cm`, y luego dividir `200 / 25 = 8`. Las otras opciones pueden aparecer si se trabaja con unidades mezcladas, si se copia 25, o si se multiplica en vez de dividir. Esta respuesta puede sugerir revisar consistencia de unidades antes de calcular.

Step-by-step script:

1. Lee las unidades: metros y centimetros.
2. Convierte 2 metros a centimetros: `2 m = 200 cm`.
3. Usa la misma unidad que el tamano de cada trozo.
4. Divide `200 / 25`.
5. Comprueba que el resultado es una cantidad de trozos completos.

Item-level rationale:

The candidate key works because converting to centimeters before dividing gives 8 complete pieces.

Distractor/error-family rationale:

- A may suggest treating 2 m as 100 cm or halving too soon.
- C may suggest copying the piece length.
- D may suggest using 50 cm or multiplying instead of dividing.

Inference-limit note:

This item may suggest one signal about unit conversion and division in a measure context. It cannot diagnose measurement ability.

### Capsule 5 - Item q4

Source task:

```text
Dos zonas rectangulares se quieren cubrir con pasto. La zona A mide 4 m de largo y 3 m de ancho. La zona B mide 5 m de largo y 2 m de ancho. ¿Cual zona tiene mayor superficie?
Options: A. La zona A, porque su area es 12 m2; B. La zona B, porque su area es 10 m2; C. Las dos zonas tienen la misma area; D. No se puede saber sin calcular el perimetro.
```

Current-source/ficha key candidate:

```text
A
```

Documentation-level key-validation note:

Candidate A appears mathematically consistent because zone A has area `4 * 3 = 12 m2` and zone B has area `5 * 2 = 10 m2`. This is not a final implementation key.

Final feedback breve:

Para comparar superficies, calcula el area de cada zona y compara los resultados. No basta mirar solo un lado mas largo.

Final feedback completo:

El item pide comparar la superficie de dos rectangulos. La opcion candidata funciona porque la zona A tiene area `4 * 3 = 12 m2`, mientras que la zona B tiene area `5 * 2 = 10 m2`; por eso la zona A tiene mayor superficie. Las otras opciones pueden aparecer si se elige el lado mas largo, si se asume igualdad sin calcular, o si se confunde superficie con perimetro. Esta respuesta puede sugerir revisar comparacion de areas rectangulares.

Step-by-step script:

1. Identifica las dos zonas rectangulares.
2. Calcula el area de la zona A: `4 * 3 = 12`.
3. Calcula el area de la zona B: `5 * 2 = 10`.
4. Compara `12` y `10`.
5. Comprueba que la pregunta pide superficie, no perimetro.

Item-level rationale:

The candidate key works because zone A has the larger rectangular area.

Distractor/error-family rationale:

- B may suggest choosing the rectangle with a longer visible side.
- C may suggest assuming similar-looking rectangles have equal area.
- D may suggest confusing area comparison with perimeter.

Inference-limit note:

This item may suggest one signal about comparing rectangular areas. It cannot establish broader Geometry understanding.

## 12. Cross-capsule consistency review

Capsules 2, 3, and 5 now have documentation-level final authoring assets for the first limited batch.

The set preserves the intended multiaxis balance:

- capsule 2 provides an Algebra/functions mechanics signal;
- capsule 3 provides a Numbers/percentage/proportionality signal;
- capsule 5 provides a Geometry/area/measure signal.

All assets use cautious evidence language and avoid route, score, diagnostic, mastery, readiness, theta, Sales-Ready, and adaptive AI claims.

All keys remain source/ficha candidates only.

## 13. Remaining blockers

Remaining blockers:

- no registry implementation;
- no source content changes;
- no continuity or route-order changes;
- no final implementation keys;
- no runtime validation;
- capsule 3 and capsule 5 remain documentation-level source candidates, not current registry source;
- future review must verify whether these assets are acceptable before implementation planning;
- capsule 4 and capsule 6 authoring remain deferred from this first batch.

## 14. What can proceed next

The next phase can review the documentation-level authoring assets for capsules 2, 3, and 5:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULES-2-3-5-AUTHORING-REVIEW-1
```

Purpose:

```text
Review documentation-level final authoring assets for capsules 2, 3, and 5 before any implementation, registry work, or broader authoring batch.
```

## 15. What remains blocked

Still blocked:

- implementation;
- content registry changes;
- continuity changes;
- route-order changes;
- capsule 4 final authoring;
- capsule 6 final authoring;
- final implementation key approval;
- deployed student-facing feedback;
- generated capsules;
- API integration or API calls;
- Sales-Ready or adaptive AI claims.

## 16. Final verdict

Verdict:

```text
M1_CAPSULES_2_3_5_FINAL_AUTHORING_DRAFTED_DOCUMENTATION_LEVEL
```

Authoring completion:

```text
COMPLETED_WITHOUT_ITEM_BLOCKERS
```
