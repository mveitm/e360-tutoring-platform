# PAES_M1_SOURCE_REGISTER

## 1. Purpose

Versioned source register for official and expert references required to validate the PAES_M1 master roadmap, content metadata, item design, and next-load decision layer.

This document supports MVP-SRA-ROADMAP-2A, MVP-SRA-ROADMAP-2A-1, and MVP-SRA-ROADMAP-2A-2.

It is documentation only. It does not import PDFs, change runtime, update content registry, mutate data, deploy, touch production, use SQL, use Prisma CLI, access `.env`, or print secrets.

## 2. Live baseline

Latest accepted state before 2A:

- HEAD = origin/main = `74dad0a`
- Last accepted commit = `MVP-SRA-ROADMAP-1C: update context transfer template for pedagogy layer`
- Working tree expected = clean

2A-1 later updated this register after HEAD = origin/main = `32423e2`.

2A-2 later updated this register after HEAD = origin/main = `722fd4f`.

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Register status meanings

- `captured_url`: official/public URL identified and recorded here.
- `not_archived`: source was not downloaded or committed into the repo.
- `pending_pdf_archive_decision`: decide later whether to store a local copy, hash, or metadata only.
- `pending_extraction`: source content still needs to be mapped into roadmap nodes.
- `pending_expert_review`: source needs expert pedagogical interpretation.
- `accepted_for_reference`: source is accepted as a reference for the next roadmap work.
- `superseded`: source should not be used as current reference except for history.

## 4. Tier 0 official / authoritative sources

### S-M1-001 — DEMRE main site, Proceso de Admision 2027

- Institution: DEMRE, Universidad de Chile
- Type: official portal
- URL: https://demre.cl/
- Status: `captured_url`, `accepted_for_reference`
- Use: entry point for official PAES 2027 process, calendar, temarios, publications, and PAES pages.
- Notes: live portal changes over time; future agents must re-check before using as current truth.

### S-M1-002 — DEMRE Temarios PAES Regular, Admision 2027

- Institution: DEMRE, Universidad de Chile
- Type: official temario index page
- URL: https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular
- Publication context: PAES Regular, Proceso de Admision 2027
- Status: `captured_url`, `accepted_for_reference`
- Use: official index for regular PAES 2027 temarios.
- Key captured fact: DEMRE states the PAES Regular temarios for Admision 2027 correspond to the battery to be applied at the end of 2026.

### S-M1-003 — DEMRE Temario PAES Regular M1, Admision 2027, PDF

- Institution: DEMRE, Universidad de Chile
- Type: official PDF
- URL: https://demre.cl/publicaciones/pdf/2027-26-03-19-temario-paes-regular-m1.pdf
- Publication date: 2026-03-19
- Pages: 7 content pages in DEMRE listing; PDF has cover and internal pages
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: primary current source for PAES_M1 roadmap scope, axes, skills, item constraints, and knowledge list for Regular PAES 2027.
- Key captured facts:
  - M1 evaluates Competencia Matematica through integration of skills and knowledge for problem solving in diverse contexts.
  - Skills: Resolver problemas, Modelar, Representar, Argumentar.
  - Knowledge reference: 7° basico to 2° medio, grouped in Numeros, Algebra y funciones, Geometria, Probabilidad y estadistica.
  - Instrument: 65 multiple-choice questions, single answer, 4 options; 60 used for selection score; duration 2h20m.
- Required next action: extract full axes / units / descriptions into a roadmap-source mapping document.

### S-M1-004 — DEMRE Temarios PAES Invierno, Admision 2027

- Institution: DEMRE, Universidad de Chile
- Type: official temario index page
- URL: https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-invierno
- Publication context: PAES Invierno, Proceso de Admision 2027
- Status: `captured_url`, `accepted_for_reference`
- Use: official index for winter PAES 2027 temarios.
- Key captured fact: DEMRE states the PAES Invierno 2027 temarios correspond to the battery to be applied between 15 and 17 June 2026.

### S-M1-005 — DEMRE Temario PAES Invierno M1, Admision 2027, PDF

- Institution: DEMRE, Universidad de Chile
- Type: official PDF
- URL: https://demre.cl/publicaciones/pdf/2027-26-01-23-temario-paes-invierno-m1.pdf
- Publication date: 2026-01-23
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official source for PAES_M1 winter scope; useful for consistency check against Regular M1.
- Key captured facts:
  - Skills: Resolver problemas, Modelar, Representar, Argumentar.
  - Knowledge reference: 7° basico to 2° medio, grouped in Numeros, Algebra y funciones, Geometria, Probabilidad y estadistica.
  - Instrument: 65 multiple-choice questions, single answer, 4 options; 60 used for selection score; duration 2h20m.
- Required next action: compare with Regular M1 temario before assuming identical roadmap use.

### S-M1-006 — DEMRE Official applied PAES questions and answer keys index

- Institution: DEMRE, Universidad de Chile
- Type: official publication index
- URL: https://demre.cl/publicaciones/2026/pruebas-oficiales-y-seleccion-preguntas-paes
- Process: Admision 2026
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`
- Use: official index for applied PAES questions, regular selections, winter tests, and answer keys.
- Key captured fact: DEMRE publishes official material after PAES Invierno and Regular; from PAES Regular 2024 onward, regular PAES publishes selected questions, while winter PAES is published in full.

### S-M1-007 — DEMRE PAES Regular 2025 / Admision 2026 selected M1 questions and answer key page

- Institution: DEMRE, Universidad de Chile
- Type: official question selection and clavijero page
- URL: https://demre.cl/publicaciones/2026/pruebas-oficiales-paes-regular-p2026
- Process: Admision 2026
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official item-style reference page for selected M1 questions and official answer key from PAES Regular 2025.
- Related exact PDFs: S-M1-011 and S-M1-012.

### S-M1-008 — DEMRE PAES Invierno 2025 / Admision 2026 full M1 test and answer key page

- Institution: DEMRE, Universidad de Chile
- Type: official full test and clavijero page
- URL: https://demre.cl/publicaciones/2026/pruebas-oficiales-paes-invierno-p2026
- Process: Admision 2026
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official full M1 applied test source page for item-style, difficulty, distractor, and skill mapping.
- Related exact PDFs: S-M1-013 and S-M1-014.

### S-M1-009 — Acceso Mineduc FAQ: Informacion General PAES

- Institution: Sistema de Acceso / Ministerio de Educacion
- Type: official FAQ / general PAES structure page
- URL: https://acceso.mineduc.cl/preguntas-frecuentes/informacion-general-paes/
- Status: `captured_url`, `accepted_for_reference`
- Use: official support reference for PAES purpose, M1/M2 distinction, structure, question counts, timing, and scoring framework.
- Key captured facts:
  - PAES evaluates competencies: saber and saber hacer.
  - M1 has 65 questions and lasts 2h20m.
  - M1 measures basic, general, and transversal competencies required across university programs.
  - M1 considers curriculum from 7° basico to 2° medio.

### S-M1-010 — Curriculum Nacional / Mineduc Mathematics curriculum portal

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official curriculum portal
- URL: https://www.curriculumnacional.cl/
- Status: `captured_url`, `accepted_for_reference`
- Use: official curriculum context behind DEMRE's 7° basico to 2° medio reference.
- Related exact sources: S-M1-015 through S-M1-022.

### S-M1-011 — DEMRE PAES Regular 2025 selected M1 questions, PDF

- Institution: DEMRE, Universidad de Chile
- Type: official PDF, selected questions
- URL: https://demre.cl/publicaciones/pdf/2026-25-12-03-paes-regular-matematica1-p2026.pdf
- Source page: https://demre.cl/publicaciones/2026/2026-25-12-03-paes-regular-competencia-matematica1-p2026
- Process: Admision 2026
- Applied date: 2025-12-03
- Publication date: 2025-12-03
- Pages: 41
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official selected-question style source for PAES Regular M1; useful for item types, context style, representation demands, distractors, and roadmap-node mapping.
- Key captured fact: DEMRE describes this as a selection of 45 questions from the PAES Regular Competencia Matematica 1 (M1), Admision 2026, applied on 2025-12-03.
- Required next action: map selected items to axes, skills, difficulty bands, item types, and evidence signals.

### S-M1-012 — DEMRE PAES Regular 2025 M1 clavijero, PDF

- Institution: DEMRE, Universidad de Chile
- Type: official PDF, answer key / score transformation
- URL: https://demre.cl/publicaciones/pdf/2026-26-01-05-clavijero-paes-regular-m1.pdf
- Source page: https://demre.cl/publicaciones/2026/2026-26-01-05-clavijero-paes-regular-m1-p2026
- Process: Admision 2026
- Applied date: 2025-12-03
- Publication date: 2026-01-05
- Pages: 6
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`
- Use: official keys for PAES Regular M1 and transformation table reference.
- Key captured facts:
  - M1 has 65 questions.
  - 60 questions are used for score calculation.
  - All scored questions have equal weight, independent of difficulty.
  - Five starred questions are excluded from Puntaje P.
- Required next action: use only for official answer/reference mapping, not for Bexauri PAES score claims.

### S-M1-013 — DEMRE PAES Invierno 2025 full M1 test, PDF

- Institution: DEMRE, Universidad de Chile
- Type: official PDF, full applied test
- URL: https://demre.cl/publicaciones/pdf/2026-25-06-18-paes-invierno-oficial-matematica1-p2026.pdf
- Source page: https://demre.cl/publicaciones/2026/2026-25-06-18-paes-invierno-competencia-matematica1-p2026
- Process: Admision 2026
- Applied date: 2025-06-18
- Publication date: 2025-06-18
- Pages: 57
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official full M1 applied test source; stronger grounding than selected Regular questions for item distribution, item style, and roadmap coverage.
- Key captured fact: DEMRE describes this as the PAES de Invierno Competencia Matematica 1 (M1), applied on 2025-06-18.
- Required next action: map all 65 items to axes, skills, difficulty bands, item types, and evidence signals.

### S-M1-014 — DEMRE PAES Invierno 2025 M1 clavijero, PDF

- Institution: DEMRE, Universidad de Chile
- Type: official PDF, answer key / score transformation
- URL: https://demre.cl/publicaciones/pdf/2026-25-07-18-clavijero-paes-invierno-m1.pdf
- Source page: https://demre.cl/publicaciones/2026/2026-25-07-18-clavijero-paes-invierno-m1-p2026
- Process: Admision 2026
- Applied date: 2025-06-18
- Publication date: 2025-07-18
- Pages: 6
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`
- Use: official keys for PAES Invierno M1 and transformation table reference.
- Key captured facts:
  - M1 has 65 questions.
  - 60 questions are used for score calculation.
  - All scored questions have equal weight, independent of difficulty.
  - Five starred questions are excluded from Puntaje P.
- Required next action: use only for official answer/reference mapping, not for Bexauri PAES score claims.

### S-M1-015 — Curriculum Nacional Matemática 7° basico page

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official course/asignatura page
- URL: https://www.curriculumnacional.cl/curriculum/7o-basico-2o-medio/matematica/7-basico
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official OA-level reference for 7° basico mathematics, including axes and skill categories.
- Key captured facts:
  - Course/asignatura page exposes Eje: Numeros, Algebra y funciones, Geometria, Probabilidad y estadistica.
  - Habilidad categories include Resolver problemas, Argumentar y comunicar, Modelar, Representar.
  - Includes OA such as integer operations, fractions/decimals, percentages, powers of 10, algebraic language, proportions, linear equations/inequalities, geometry, data, and probability.
- Related exact PDF: S-M1-016.

### S-M1-016 — Programa de Estudio Matemática 7° basico, PDF

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official PDF, Programa de Estudio
- URL: https://www.curriculumnacional.cl/sites/default/files/adjuntos/recursos/2024-12/Matem%C3%A1tica%207.pdf
- Source page: https://www.curriculumnacional.cl/recursos/programa-estudio-matematica-7-basico
- Source page publication year: 2024
- PDF pages: 236
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: detailed curriculum program for 7° basico, including OA, suggested sequencing, learning/evaluation guidance, and progression annexes.
- Key captured fact: the program states that OA integrate knowledge, skills, and attitudes and that programs support implementation of the Bases Curriculares.

### S-M1-017 — Curriculum Nacional Matemática 8° basico page

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official course/asignatura page
- URL: https://www.curriculumnacional.cl/curriculum/7o-basico-2o-medio/matematica/8-basico
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official OA-level reference for 8° basico mathematics, including axes and skill categories.
- Key captured facts:
  - Course/asignatura page exposes the same four axes and skill categories.
  - Includes OA on integer and rational operations, powers/roots, percentage variation, algebraic expressions, linear function, affine function, linear equations/inequalities, geometry, data, and probability/combinatorics.
- Related exact PDF: S-M1-018.

### S-M1-018 — Programa de Estudio Matemática 8° basico, PDF

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official PDF, Programa de Estudio
- URL: https://www.curriculumnacional.cl/sites/default/files/newtenberg/614/articles-18983_programa.pdf
- Source page: https://www.curriculumnacional.cl/recursos/programa-estudio-matematica-8-basico
- Source page publication year: 2024
- PDF pages: 242
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: detailed curriculum program for 8° basico, useful for prerequisite progression and detailed sequence behind M1.

### S-M1-019 — Curriculum Nacional Matemática 1° medio page

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official course/asignatura page
- URL: https://www.curriculumnacional.cl/curriculum/7o-basico-2o-medio/matematica/1-medio
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official OA-level reference for 1° medio mathematics, including axes and skill categories.
- Key captured facts:
  - Includes OA on rational operations, powers with rational base and integer exponent, products, 2x2 systems of linear equations, linear relations in two variables, circle/sector geometry, cone, homothety, similarity/proportionality, bivariate data, and probability rules.
- Related exact PDF: S-M1-020.

### S-M1-020 — Programa de Estudio Matemática 1° medio, PDF

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official PDF, Programa de Estudio
- URL: https://www.curriculumnacional.cl/sites/default/files/newtenberg/614/articles-34359_programa.pdf
- Source page: https://www.curriculumnacional.cl/recursos/programa-estudio-matematica-1-medio
- Source page publication year: 2024
- PDF pages: 244
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: detailed curriculum program for 1° medio, useful for mid-roadmap prerequisite progression and transfer into PAES_M1 item design.

### S-M1-021 — Curriculum Nacional Matemática 2° medio page

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official course/asignatura page
- URL: https://www.curriculumnacional.cl/curriculum/7o-basico-2o-medio/matematica/2-medio
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official OA-level reference for 2° medio mathematics, including axes and skill categories.
- Key captured facts:
  - Includes OA on real-number operations with roots, powers/roots/logarithms, quadratic function, quadratic equations, inverse function, constant percentage change, sphere, trigonometric ratios, vectors, random variables, permutations/combinatorics, and probability in society.
- Related exact PDF: S-M1-022.

### S-M1-022 — Programa de Estudio Matemática 2° medio, PDF

- Institution: Unidad de Curriculum y Evaluacion / Ministerio de Educacion
- Type: official PDF, Programa de Estudio
- URL: https://www.curriculumnacional.cl/sites/default/files/adjuntos/recursos/2024-12/Matem%C3%A1tica%202M.pdf
- Source page: https://www.curriculumnacional.cl/recursos/programa-estudio-matematica-2-medio
- Source page publication year: 2024
- PDF pages: 228
- Status: `captured_url`, `not_archived`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: detailed curriculum program for 2° medio, useful for upper-bound M1 curriculum scope and prerequisite/advanced node separation.

## 5. Tier 1 expert pedagogical sources

### E-M1-001 — PAES_M1 expert reviewer

- Institution/person: pending
- Type: human expert review
- Status: `pending_expert_review`
- Required profile: mathematics teacher or PAES/preuniversitario expert with experience preparing students for M1.
- Use: validate roadmap sequence, difficulty bands, item representativeness, error patterns, reinforcement limits, bridge/advance logic, and coverage policy.
- Required output: review checklist and feedback log.

### E-M1-002 — Expert review checklist document

- File planned: `nextjs_space/docs/operations/PAES_M1_EXPERT_REVIEW_CHECKLIST.md`
- Status: `pending`
- Use: standardize review so expert feedback is auditable and reusable.

## 6. Tier 2 internal Bexauri sources

### B-M1-001 — Current PAES_M1 roadmap/content docs

- Files:
  - `MVP_CONTENT_1_PAES_M1_MASTER_ROADMAP_SKELETON.md`
  - `MVP_CONTENT_2_PAES_M1_FIRST_ACTIVE_SLICE.md`
  - `MVP_CONTENT_3_PAES_M1_FIRST_MICRO_STUDYLOAD_SET.md`
  - `MVP_CONTENT_4_PAES_M1_BALANCED_ENTRY_MICRO_STUDYLOAD_REGISTRY_PROPOSAL.md`
- Status: `accepted_internal`, `pending_source_mapping`, `pending_expert_review`
- Use: current internal roadmap proposal to map against official sources.

### B-M1-002 — Current validated local M1 path

- File: `MVP_FLOW_4_E5M_M1_LOCAL_PATH_VALIDATION_AND_CONTENT_ALIGNMENT.md`
- Status: `accepted_internal`, `transitional`
- Use: operationally validated local path, not yet expert-validated as full content standard.

### B-M1-003 — Pedagogical decision layer docs

- Files:
  - `MVP_SRA_ROADMAP_1_PAES_M1_PEDAGOGICAL_DECISION_LAYER.md`
  - `MVP_SRA_ROADMAP_2_PAES_M1_EXPERT_ROADMAP_SOURCE_AND_VALIDATION_PLAN.md`
- Status: `accepted_internal`, `pending_source_mapping`
- Use: governance and decision-layer scaffolding.

## 7. Tier 3 AI-assisted analysis

AI may support classification, item tagging, gap detection, and roadmap drafts.

Status: `advisory_only`.

AI output must not become canonical unless checked against Tier 0 official sources and Tier 1 expert review.

## 8. Immediate source gaps

- Exact official PDF files for selected PAES Regular 2025 M1 questions and M1 clavijero are registered as S-M1-011 and S-M1-012.
- Exact official PDF files for full PAES Invierno 2025 M1 and M1 clavijero are registered as S-M1-013 and S-M1-014.
- Exact Curriculum Nacional 7° basico to 2° medio mathematics pages and Programas de Estudio PDFs are registered as S-M1-015 through S-M1-022.
- Expert reviewer identity and review workflow remain pending.
- No official source has been archived locally; only URLs and metadata are captured.
- Official M1 item PDFs and curriculum sources have not yet been mapped to Bexauri roadmap nodes.

## 9. Rules for future source use

- Do not build a production-grade PAES_M1 roadmap from memory.
- Do not rely on secondary summaries when official DEMRE/Mineduc sources are available.
- Do not assume Regular and Invierno temarios are identical without comparing them.
- Do not treat internal Bexauri roadmap docs as official until mapped and reviewed.
- Do not treat AI classification as authority.
- Do not let source/expert review become a normal student-facing gate.
- Preserve non-blocking continuity: review improves the system asynchronously.
- Do not use DEMRE clavijeros or transformation tables to make Bexauri PAES score claims in MVP-Beta.
- Do not use Curriculum Nacional pages as a complete PAES_M1 roadmap by themselves; map them through DEMRE M1 scope and expert review.

## 10. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2B - Map current PAES_M1 roadmap docs to source register`

Purpose:

- map existing internal roadmap axes/nodes against S-M1-003, S-M1-005, S-M1-011, S-M1-013, and S-M1-015 through S-M1-022;
- identify gaps, overreach, missing nodes, and ambiguous mappings;
- prepare expert review checklist.

Alternative narrower phase:

`MVP-SRA-ROADMAP-2B-0 - Extract official PAES_M1 axes/OA inventory from source register`

Use this if the team wants an intermediate official inventory before mapping internal roadmap docs.

## 11. Handoff requirements

Future handoffs must include this source register while the pedagogical decision layer is being defined.

They must also preserve:

- Git preflight overrides stale baselines.
- PAES_M1 pedagogical decision layer is critical context.
- Source/expert validation is required before smarter next-load selection.
- Operator/supervisor/expert review is asynchronous and non-blocking by default.
- 8-item registry content remains transitional until content-alignment work decides otherwise.
