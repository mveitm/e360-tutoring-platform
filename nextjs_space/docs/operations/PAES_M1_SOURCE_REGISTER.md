# PAES_M1_SOURCE_REGISTER

## 1. Purpose

Versioned source register for official and expert references required to validate the PAES_M1 master roadmap, content metadata, item design, and next-load decision layer.

This document supports MVP-SRA-ROADMAP-2A.

It is documentation only. It does not import PDFs, change runtime, update content registry, mutate data, deploy, touch production, use SQL, use Prisma CLI, access `.env`, or print secrets.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `74dad0a`
- Last accepted commit = `MVP-SRA-ROADMAP-1C: update context transfer template for pedagogy layer`
- Working tree expected = clean

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

### S-M1-007 — DEMRE PAES Regular 2025 / Admision 2026 selected M1 questions and answer key

- Institution: DEMRE, Universidad de Chile
- Type: official question selection and clavijero page
- URL: https://demre.cl/publicaciones/2026/pruebas-oficiales-paes-regular-p2026
- Process: Admision 2026
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official item-style reference for selected M1 questions and official answer key from PAES Regular 2025.
- Required next action: retrieve M1 selected-question PDF and M1 clavijero links from this page, then map item types to roadmap nodes and skills.

### S-M1-008 — DEMRE PAES Invierno 2025 / Admision 2026 full M1 test and answer key

- Institution: DEMRE, Universidad de Chile
- Type: official full test and clavijero page
- URL: https://demre.cl/publicaciones/2026/pruebas-oficiales-paes-invierno-p2026
- Process: Admision 2026
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`, `pending_expert_review`
- Use: official full M1 applied test source for item-style, difficulty, distractor, and skill mapping.
- Required next action: retrieve official M1 test PDF and M1 clavijero links from this page, then map items to roadmap nodes.

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
- Status: `captured_url`, `accepted_for_reference`, `pending_extraction`
- Use: official curriculum context behind DEMRE's 7° basico to 2° medio reference.
- Required next action: locate and register the exact 7° basico, 8° basico, 1° medio, and 2° medio mathematics curriculum pages / documents used for PAES_M1 roadmap validation.

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

- Exact official PDF files for selected PAES Regular 2025 M1 questions and M1 clavijero still need to be opened and registered directly.
- Exact official PDF files for full PAES Invierno 2025 M1 and M1 clavijero still need to be opened and registered directly.
- Exact Curriculum Nacional 7° basico to 2° medio mathematics documents need to be identified and registered.
- Expert reviewer identity and review workflow remain pending.
- No official source has been archived locally; only URLs and metadata are captured.

## 9. Rules for future source use

- Do not build a production-grade PAES_M1 roadmap from memory.
- Do not rely on secondary summaries when official DEMRE/Mineduc sources are available.
- Do not assume Regular and Invierno temarios are identical without comparing them.
- Do not treat internal Bexauri roadmap docs as official until mapped and reviewed.
- Do not treat AI classification as authority.
- Do not let source/expert review become a normal student-facing gate.
- Preserve non-blocking continuity: review improves the system asynchronously.

## 10. Recommended next phase

Recommended next phase:

`MVP-SRA-ROADMAP-2B - Map current PAES_M1 roadmap docs to source register`

Purpose:

- map existing internal roadmap axes/nodes against S-M1-003 and S-M1-005;
- identify gaps, overreach, missing nodes, and ambiguous mappings;
- prepare expert review checklist.

Alternative narrower phase:

`MVP-SRA-ROADMAP-2A-1 - Register exact official M1 question PDFs and clavijeros`

Use this if the team wants stronger item-style grounding before roadmap mapping.

## 11. Handoff requirements

Future handoffs must include this source register while the pedagogical decision layer is being defined.

They must also preserve:

- Git preflight overrides stale baselines.
- PAES_M1 pedagogical decision layer is critical context.
- Source/expert validation is required before smarter next-load selection.
- Operator/supervisor/expert review is asynchronous and non-blocking by default.
- 8-item registry content remains transitional until content-alignment work decides otherwise.
