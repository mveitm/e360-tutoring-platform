# MVP-CONTENT-PAES-M2-C05-AUTHORED-READINESS-1

## Phase name

```text
MVP-CONTENT-PAES-M2-C05-AUTHORED-READINESS-1
```

## Baseline inicial

```text
HEAD = origin/main = origin/HEAD = 1f3dd386b655d503180445ac045f9daa171415dd
working tree clean
```

## Objetivo

Cerrar la readiness authored de PAES_M2 / M2-C05 antes de cualquier implementacion. Esta fase define una especificacion pedagogica y tecnica suficientemente precisa para que una fase posterior pueda implementar la capsula con bajo riesgo.

Esta fase es documental/de especificacion. No cambia comportamiento de la app.

## Context Gate

Verificacion git segura ejecutada antes de editar:

```text
git status --short: clean
git rev-parse HEAD: 1f3dd386b655d503180445ac045f9daa171415dd
git log --oneline --decorate -n 5: baseline confirmado en HEAD, origin/main y origin/HEAD
```

Si el baseline no hubiera coincidido o el working tree no hubiera estado limpio, la fase se habria detenido sin editar.

## Alcance permitido/prohibido

Archivos permitidos para modificacion:

```text
PHASE_LOG.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C05_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
```

Alcance prohibido respetado:

```text
No DB execution by Codex
No DB mutation by Codex
No LOCAL_DEV tooling execution by Codex
No scripts that read DB executed by Codex
No scripts that write DB executed by Codex
No prod/staging touched by Codex
No schema changes
No payment/subscription changes
No StudentAccess changes
No app code changes
No tooling changes
No UI changes
No asset changes
No implemented pedagogical capsule content changes
No implemented authoredFeedback changes
No executable registry entries created or edited
No seeds
No migrations
No Prisma DB commands
No SQL
No secrets printed
```

## Archivos leidos

```text
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C05_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C04_CLOSEOUT_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_AUTHORED_IMPLEMENT_1.md
nextjs_space/lib/study-load-content.ts
PHASE_LOG.md
nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md
nextjs_space/docs/operations/MVP_ROADMAP_PAES_M2_L1_AUTHORED_MINIMUM_SCOPE_1.md
nextjs_space/docs/operations/MVP_ROADMAP_PAES_AUTHORED_COVERAGE_PLAN_1.md
nextjs_space/docs/operations/BLUEPRINT_TACTICO_PEDAGOGICO_M2_INTEGRADO.md
nextjs_space/docs/operations/BPCPV1_PAES_M2_PRECONTRACT.md
nextjs_space/docs/operations/BPCPV1_PAES_M2_DERIVATION_GOVERNING_DOCUMENT.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C03_AUTHORED_READINESS_1.md
nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C02_AUTHORED_READINESS_1.md
```

Read-only searches covered:

```text
M2-C05
M2_C05
Sistemas y restricciones
paes_m2_systems_restrictions_context_entry
systems_restrictions
authoredFeedback
briefId
completeId
correctOptionKey
contentKey
tableStimulus
LaTeX
LATEX_REQUIRED
```

## Source context

Previous readiness identified M2-C05 as the next PAES_M2 candidate after M2-C04:

```text
program: PAES_M2
previous capsule: M2-C04
candidate next capsule: M2-C05
candidate title: Sistemas y restricciones en contexto
source of truth: nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_AUTHORED_SEED_PLAN_1.md
readiness result: M2_C05_READINESS_PARTIAL_WITH_OBSERVATIONS
```

The seed plan classifies M2-C05 as algebra/modelling with suggested 3-4 exercises, text/math notation stimulus, and a risk that plain text system notation can confuse. The readiness phase found no implemented contentKey, no registry entry, no final exercises and no authoredFeedback.

## Identity specification

Final proposed identity:

```text
Program: PAES_M2
Capsule: M2-C05
Final proposed title: PAES M2 - Sistemas y restricciones en contexto
Visible correlative: M2-C05
Final proposed contentKey: paes_m2_systems_restrictions_context_entry
Content version: v1
Content type: practice
Skill family: algebra/modelling
Exercise count target: 3
```

ContentKey rationale:

The current PAES_M2 registry convention uses English descriptor tokens plus the `_entry` suffix:

```text
paes_m2_modeling_expressions_functions_entry
paes_m2_data_probability_table_entry
paes_m2_functions_graph_behavior_entry
paes_m2_analytic_geometry_relations_entry
```

Therefore the proposed final contentKey is `paes_m2_systems_restrictions_context_entry`, preserving program prefix, English descriptor tokens, title meaning and `_entry` suffix. The implementation phase must validate uniqueness against the live registry before editing executable content.

## Pedagogical purpose

M2-C05 should train students to interpret simultaneous conditions and simple restrictions in realistic PAES_M2-style contexts without overloading algebraic manipulation.

Proposed purpose:

```text
Interpret two simultaneous conditions or restrictions in a short context, translate them into simple equations/inequalities or candidate checks, and decide which option satisfies all conditions.
```

The capsule continues the prior M2 sequence by using:

```text
M2-C01: fixed/variable modelling and parameter interpretation
M2-C02: controlled table/proportion reading and denominator discipline
M2-C03: function/representation behavior
M2-C04: coordinate and relation checking
```

M2-C05 should not become a full systems unit. It should remain a short practice capsule about reading conditions, checking candidate solutions and avoiding single-condition answers.

## Assumed prerequisites

The implementation may assume the student has completed the prior PAES_M2 capsule flow and can:

```text
- read a short mathematical context;
- distinguish fixed and variable quantities;
- evaluate a simple expression with small integers;
- solve or check a one-step/two-step linear relation;
- read ordered pairs as candidate values when named in context;
- compare whether one or two conditions are satisfied.
```

The capsule must not assume mastery of formal systems methods, substitution/elimination algorithms, inequality graphing, region shading, matrix notation or complex symbolic manipulation.

## Notation strategy

The readiness risk was:

```text
M2-C05 notation may require LaTeX-equivalent planning if plain text becomes ambiguous.
```

Resolution for first implementation:

```text
Primary notation strategy: text-first and unambiguous plain notation.
Fallback notation strategy: LaTeX-equivalent formatting only if the implementation phase confirms the UI supports the chosen notation safely.
```

Allowed:

```text
- equations written in plain text such as x + y = 12;
- simple inequalities written in plain text such as x >= 2 or y <= 5 if the stem explains their meaning;
- named variables with definitions in the stem;
- lists of candidate pairs such as (4, 8);
- small tables of candidate options if they reduce ambiguity;
- phrases like "al menos", "a lo mas", "exactamente" and "en total" to anchor restrictions.
```

Disallowed for initial implementation unless separately scoped:

```text
- complex LaTeX;
- stacked equation systems that the UI may wrap ambiguously;
- graphing of inequality regions;
- images, SVGs, diagrams or asset files;
- symbolic notation that depends on visual layout to be understood;
- more than two simultaneous conditions in one item.
```

Implementation guidance:

```text
When using equations, define each variable before the equation.
When using inequalities, pair the symbol with a verbal phrase.
When checking pairs, state that the pair is ordered as (first quantity, second quantity).
If a system would require vertical alignment to be legible, rewrite it as two numbered conditions instead of relying on layout.
```

## Representation strategy

```text
Text-first contexts
Plain equations/inequalities with small integers
Candidate pairs/lists
Optional compact table only for candidate checking
No images/assets
No graph/figure dependency
No unsupported visual math dependency
```

## Pedagogical restrictions

```text
M2 maximum: 4 exercises per capsule
M2-C05 target: 3 exercises
Feedback: brief visible feedback plus complete step-by-step authoredFeedback
Tone: clear, close, realistic and not grandiloquent
Claims: no PAES readiness, score, mastery, Sales-Ready, adaptive diagnosis or complete coverage claims
```

Three exercises are preferred because the capsule can cover the intended progression without overloading notation:

```text
1. Interpret two simple restrictions and verify an option.
2. Identify a solution of a simple system.
3. Apply restrictions in a short context and choose a valid alternative.
```

## Proposed exercise design

The following is an implementation-ready specification, not an executable registry change.

### Exercise 1

```text
Proposed exercise key: q1
Skill focus: interpret two simple restrictions in context and verify an option
Representation: text only; no symbolic system required
Notation notes: define variables in words; use "al menos" and "en total" rather than formal inequalities
```

Prompt:

```text
Una estudiante arma un plan de estudio para una semana con horas de algebra y horas de geometria. Quiere cumplir estas dos condiciones:

1. Estudiar 6 horas en total.
2. Dedicar al menos 2 horas a geometria.

Cual opcion cumple ambas condiciones?
```

Options:

```text
A. 5 horas de algebra y 1 hora de geometria.
B. 4 horas de algebra y 2 horas de geometria.
C. 3 horas de algebra y 4 horas de geometria.
D. 2 horas de algebra y 1 hora de geometria.
```

Correct answer:

```text
B
```

Expected reasoning:

```text
Check both conditions. A totals 6 but geometry is only 1, so it fails. B totals 6 and geometry is 2, so it passes. C has enough geometry but totals 7, so it fails. D totals 3, so it fails.
```

Brief feedback:

```text
La opcion B cumple las dos condiciones: 4 + 2 = 6 y geometria tiene al menos 2 horas.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for an option satisfying both conditions.
2. Identify condition 1: total hours must be 6.
3. Identify condition 2: geometry hours must be at least 2.
4. Check option B: 4 + 2 = 6 and 2 is at least 2.
5. Justify why B is correct.
6. Explain why A satisfies only the total, why C satisfies geometry but not total, and why D satisfies neither total nor minimum geometry.
7. Recommendation: check conditions one by one and do not stop after the first condition.
8. Connection: this prepares solving systems/restrictions by verification.
```

Common misconception addressed:

```text
Choosing an option that satisfies one condition but not both.
```

### Exercise 2

```text
Proposed exercise key: q2
Skill focus: identify a solution of a simple system
Representation: two plain equations in text
Notation notes: use equations on separate lines or numbered conditions; avoid stacked symbolic layout dependency
```

Prompt:

```text
En una feria, x representa la cantidad de entradas de estudiante e y representa la cantidad de entradas de adulto. Se deben cumplir estas dos condiciones:

1. x + y = 10
2. 1000x + 2000y = 14000

Cual par (x, y) cumple ambas condiciones?
```

Options:

```text
A. (6, 4)
B. (4, 6)
C. (8, 2)
D. (5, 5)
```

Correct answer:

```text
A
```

Expected reasoning:

```text
Check (6, 4): 6 + 4 = 10 and 1000*6 + 2000*4 = 6000 + 8000 = 14000. The other pairs either fail the cost condition or both conditions.
```

Brief feedback:

```text
El par (6, 4) cumple ambas ecuaciones: suma 10 entradas y da un costo total de 14000.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for the pair satisfying two equations.
2. Define x as student tickets and y as adult tickets.
3. Check total tickets for option A: 6 + 4 = 10.
4. Check cost for option A: 1000*6 + 2000*4 = 14000.
5. Justify option A.
6. Explain why B has the right total but wrong cost, why C has the right total but lower cost, and why D has the right total but different cost.
7. Recommendation: substitute the candidate values into both conditions.
8. Connection: checking candidate pairs is a safe first step before using formal solution methods.
```

Common misconception addressed:

```text
Treating any pair with x + y = 10 as a solution without checking the second condition.
```

### Exercise 3

```text
Proposed exercise key: q3
Skill focus: apply restrictions in a brief context and choose a valid alternative
Representation: text plus optional candidate list; no image
Notation notes: use verbal inequalities and a small numeric check
```

Prompt:

```text
Un curso comprara cuadernos y lapices para una actividad. Cada cuaderno cuesta $1200 y cada lapiz cuesta $300. El curso debe cumplir estas restricciones:

1. Comprar exactamente 8 articulos en total.
2. Gastar como maximo $6000.
3. Comprar al menos 3 cuadernos.

Cual alternativa es valida?
```

Options:

```text
A. 2 cuadernos y 6 lapices.
B. 3 cuadernos y 5 lapices.
C. 4 cuadernos y 5 lapices.
D. 5 cuadernos y 3 lapices.
```

Correct answer:

```text
B
```

Expected reasoning:

```text
B has exactly 8 items, at least 3 notebooks, and costs 3*1200 + 5*300 = 3600 + 1500 = 5100, which is at most 6000. A fails the minimum notebooks condition. C has 9 items. D has 8 items and at least 3 notebooks, but costs 6900, exceeding 6000.
```

Brief feedback:

```text
La opcion B cumple las tres restricciones: 8 articulos, 3 cuadernos y un gasto de $5100.
```

Full authoredFeedback outline:

```text
1. Restate that the item asks for an alternative satisfying all restrictions.
2. Identify the three restrictions: total items, maximum budget, minimum notebooks.
3. Check option B item count: 3 + 5 = 8.
4. Check option B notebook minimum: 3 notebooks is at least 3.
5. Check option B cost: 3*1200 + 5*300 = 5100, which is at most 6000.
6. Justify option B.
7. Explain why A fails the notebook minimum, C fails the total item count, and D exceeds the budget.
8. Recommendation: when there are several restrictions, make a small checklist and verify every condition.
9. Connection: this extends systems/restriction checking to decision problems.
```

Common misconception addressed:

```text
Ignoring the inequality condition after satisfying the exact total, or checking budget before checking all restrictions.
```

## AuthoredFeedback readiness

The future implementation must include `authoredFeedback` for every item with:

```text
briefId
completeId
version
brief
complete
```

Recommended ID pattern:

```text
paes_m2_systems_restrictions_context_entry_q1_brief_v1
paes_m2_systems_restrictions_context_entry_q1_complete_v1
paes_m2_systems_restrictions_context_entry_q2_brief_v1
paes_m2_systems_restrictions_context_entry_q2_complete_v1
paes_m2_systems_restrictions_context_entry_q3_brief_v1
paes_m2_systems_restrictions_context_entry_q3_complete_v1
```

Expected feedback version:

```text
m2-c05-authored-feedback-v1
```

Every complete feedback must:

```text
- restate what the item asks;
- identify all conditions/restrictions;
- check candidate values step by step;
- justify why the correct option satisfies every condition;
- explain plausible distractors and which condition each one fails;
- include a short recommendation;
- connect the item to systems/restrictions, model checking or the next algebra/modelling skill.
```

## Technical implementation expectations

Future implementation should:

```text
- add a visible correlative mapping for paes_m2_systems_restrictions_context_entry -> M2-C05;
- add one PAES_M2 StudyLoadContent registry entry using the existing static pattern;
- use contentVersion v1;
- use contentType practice;
- use skillFamily algebra/modelling;
- use exactly 3 multiple-choice items unless a later phase documents a fourth as necessary;
- use options A-D;
- include correctOptionKey for every item;
- include authoredFeedback for every item;
- avoid assets and new UI;
- avoid graph/figure/image dependencies;
- keep notation readable in active and completed views.
```

Suggested implementation title:

```text
PAES M2 - Sistemas y restricciones en contexto
```

The implementation phase may use the registry title punctuation style already present in the file, but should preserve the student-facing title and visible correlative.

## Quality and acceptance criteria

Implementation should pass only if:

```text
- M2-C05 has exactly 3 exercises unless a documented reason adds a fourth;
- exercise count remains <= 4;
- no images/assets are required;
- no unsupported graph/figure dependency exists;
- notation is readable without relying on complex LaTeX;
- every variable is defined before use;
- every item has one unequivocal correct answer;
- each distractor maps to a specific failed condition or common systems/restrictions error;
- each item has brief and complete authoredFeedback;
- complete feedback is step-by-step and useful for autonomous review;
- no TODO, placeholder, lorem, pendiente or generic feedback remains;
- no PAES score/readiness/mastery/Sales-Ready/adaptive diagnosis claims appear;
- no DB/schema/UI/tooling/payment/subscription/StudentAccess changes are bundled.
```

Static review must verify:

```text
answer correctness
condition-by-condition reasoning
notation legibility
contentKey uniqueness
visible correlative mapping
feedback quality
absence of placeholder text
absence of unsupported visual/math dependency
continuity with M2-C01 through M2-C04
```

## Risks and decisions

Notation risk and mitigation:

```text
Risk: formal systems or inequalities can become hard to read in plain text.
Mitigation: use numbered conditions, define variables in words, keep equations one-line, pair inequalities with verbal phrases, and use candidate checking rather than symbolic solution methods.
```

Avoiding overload:

```text
The specification uses 3 exercises and checks at most two or three short conditions per item. It avoids substitution/elimination algorithms, graphing regions and multi-step symbolic manipulation.
```

ContentKey validation:

```text
The proposed contentKey follows current PAES_M2 naming convention, but the implementation phase must validate it against the live registry before editing executable content.
```

Tension between systems, restrictions and inequalities:

```text
"Sistemas y restricciones" can drift into a full algebra unit. This contract constrains the first C05 implementation to candidate verification and simple context restrictions. Inequalities appear only as verbal constraints or simple budget/minimum conditions, not as graphing or formal inequality systems.
```

What static review should watch closely:

```text
- whether every option is checked against all conditions;
- whether at least one distractor fails only one condition, to test simultaneous-condition reasoning;
- whether plain-text equations are unambiguous on mobile;
- whether the budget/total arithmetic is correct;
- whether feedback explains why wrong options fail instead of only confirming the key.
```

## Explicit non-changes

```text
DB execution by Codex: NOT_EXECUTED_BY_CODEX
DB mutation by Codex: NOT_MUTATED_BY_CODEX
Code changes: NOT_PERFORMED
Tooling changes: NOT_PERFORMED
Schema changes: NOT_PERFORMED
UI changes: NOT_PERFORMED
Asset changes: NOT_PERFORMED
Implemented pedagogical capsule content changes: NOT_PERFORMED
Implemented authoredFeedback changes: NOT_PERFORMED
Payment/subscription changes: NOT_PERFORMED
StudentAccess changes: NOT_PERFORMED
```

Additional non-actions:

```text
No executable registry entry created.
No seed changed.
No final implemented authoredFeedback changed.
No StudyLoad created or modified.
No LOCAL_DEV alignment attempted.
No human UI smoke attempted.
No prod/staging action.
No secrets printed.
```

## Recommended next phase

```text
MVP-CONTENT-PAES-M2-C05-AUTHORED-IMPLEMENT-1
```

Rationale:

The authored readiness contract is sufficiently defined for conservative implementation. The next phase should implement only the versioned static content and documentation explicitly authorized for M2-C05, followed by static review.

## Validation

Validation executed after documentation:

```text
git diff --check
secret-pattern scan over modified documentation files
```

Results:

```text
git diff --check: passed
secret-pattern scan: passed
```

No build, TypeScript check, DB command, browser automation or app execution was required because this phase modified documentation only.

## Security notes

No `.env` values, database URLs, DB hosts, connection strings, tokens, cookies, secrets, private keys, credentials or passwords were requested or printed.

## Result

```text
M2_C05_AUTHORED_READINESS_OK
```

## Follow-up/blocker

```text
MVP-CONTENT-PAES-M2-C05-AUTHORED-IMPLEMENT-1
```
