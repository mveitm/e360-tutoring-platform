# MVP-COMMERCIAL-PAES-SOURCE-1A - Official M2/L1 Source Metadata Extraction

## 1. Phase

* Phase: `MVP-COMMERCIAL-PAES-SOURCE-1A`.
* Type: documentation-only / controlled official-source metadata extraction / source custody.
* Baseline: `fd2cc65`.
* Product horizon: roadmap change-control / official-source metadata extraction / M2-L1 readiness preparation / Sales-Ready support.
* This is not `MVP-Beta-Sales-Ready` approval.
* No implementation authorized.
* No full source-content extraction authorized.
* No M2 alignment authorized.
* No L1 alignment authorized.
* No content, StudyLoad, text, question, feedback, UI, dashboard, public launch, public sale, payment, trial activation, runtime enforcement, billing, subscription, `/now`, admin mutation, DB, deploy, or Sales-Ready approval authorized.

## 2. Relationship to PAES-SOURCE-1

`MVP-COMMERCIAL-PAES-SOURCE-1` created a controlled official-source intake for PAES M2 and L1.

It identified official source families and established custody rules, but did not resolve current-cycle metadata.

This phase is the next narrow step: extract concise metadata from official sources only.

This phase does not extract temario contents, does not align candidate M2/L1 route families, and does not validate M2 or L1 readiness.

## 3. Nature of document

This is a metadata extraction document.

It records:

* official-source title;
* institution / host;
* visible publication date;
* admission/process cycle;
* URL;
* source type;
* relevance to M2 or L1;
* PDF link/status when visible;
* source hierarchy classification;
* extraction status;
* supersession or unresolved notes.

It is not:

* source-content extraction;
* full temario extraction;
* official PAES alignment;
* final taxonomy;
* content design;
* text selection;
* question design;
* feedback design;
* readiness approval.

## 4. Purpose

The purpose is to place official PAES M2/L1 source metadata under versioned custody before any future alignment phase.

This phase answers:

* which current-cycle official pages were found;
* which previous-cycle official pages remain useful as historical/provisional references;
* which example-question sources are official supplemental candidates;
* which sources should be primary, supplemental, historical, unresolved, or rejected;
* what future source-content extraction and M2/L1 alignment must still do.

## 5. Source access status

Source access status: `WEB_ACCESS_AVAILABLE_USED_FOR_CONTROLLED_METADATA_EXTRACTION`.

Controlled web access was used only for official DEMRE / Universidad de Chile sources.

No PDF was downloaded into the repo.

No PDF was committed.

No generated artifact was created.

No full temario content was extracted.

No unofficial source was used as canonical PAES alignment.

## 6. Extraction method and limits

Method:

* Started from `MVP-COMMERCIAL-PAES-SOURCE-1`.
* Used official DEMRE pages and DEMRE-hosted publication pages only.
* Opened official pages to record visible metadata.
* Recorded source title, visible date, process/admission cycle, URL, page type, PDF status, relevance, and hierarchy.
* Treated PDF links as visible metadata only.

Limits:

* No full PDF extraction.
* No long copyrighted excerpts.
* No final source-content summary.
* No M2/L1 taxonomy inference.
* No StudyLoad, text, question, or feedback creation.
* No source-rights approval.

## 7. Official-source metadata register

| Source | Institution / host | Visible date | Cycle / process | URL | Source type | Relevance | PDF status | Hierarchy | Extraction status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Publicaciones Prueba de Acceso a la Educacion Superior (PAES) - Admision 2027 | DEMRE / Universidad de Chile | Not shown as publication date on page | Admision 2027 | `https://demre.cl/publicaciones/listado-2027` | Official publication index | Current-cycle source discovery for M2/L1 and PAES examples | Not applicable | Current official index | Metadata extracted | Lists current-cycle temarios and PAES example/question sources. |
| Temarios Pruebas de Acceso a la Educacion Superior (PAES) Regular - Proceso de Admision 2027 | DEMRE / Universidad de Chile | Page lists linked source dates: 19-03-2026 | Admision 2027 | `https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular` | Official temario index/page | Current-cycle entry point for M2 and L1 temarios | Linked PDFs via child pages | Primary current source index | Metadata extracted | Page states PAES Regular for Admision 2027 and links L1 and M2 temario pages. |
| Temario de la PAES Regular - Competencia Matematica 2 (M2) | DEMRE / Universidad de Chile | Jueves 19 de marzo de 2026 | Page path/listing: Admision 2027; visible body line requires future review | `https://demre.cl/publicaciones/2027/2027-26-03-19-temario-paes-regular-m2` | Official publication page | Current-cycle M2 temario candidate | PDF link visible, 190KB; not downloaded | Primary current candidate with supersession note | Metadata extracted | Page is under 2027 and linked from Admision 2027 index; visible body text says "Admision 2026", so future source-content extraction must resolve the cycle note before alignment. |
| Temario de la PAES Regular - Obligatoria de Competencia Lectora | DEMRE / Universidad de Chile | Jueves 19 de marzo de 2026 | Admision 2027 | `https://demre.cl/publicaciones/2027/2027-26-03-19-temario-paes-regular-competencia-lectora` | Official publication page | Current-cycle L1 temario candidate | PDF link visible, 204KB; not downloaded | Primary current candidate | Metadata extracted | Page states Competencia Lectora 2026 - Admision 2027. |
| Seleccion de preguntas PAES Regular y clavijeros - Proceso de Admision 2026 | DEMRE / Universidad de Chile | Child links dated 01-12-2025 to 05-01-2026 | Admision 2026 | `https://demre.cl/publicaciones/2026/pruebas-oficiales-paes-regular-p2026` | Official example/question and answer-key index | Supplemental official source for future M2/L1 item-style metadata | Linked child sources visible; not downloaded | Supplemental official | Metadata extracted | Includes L1 and M2 selection/clavijero links. Does not replace temarios. |
| Universidades y carreras que utilizaran como requisito obligatorio y factor de ponderacion la PAES de Competencia Matematica 2 (M2) - Proceso de Admision 2027 | DEMRE / Acceso Mineduc | Viernes 23 de enero de 2026 | Admision 2027 | `https://demre.cl/publicaciones/2027/2027-26-01-23-universidades-requisito-m2-p2027` | Official Acceso Mineduc publication page | Supplemental M2 context for public process relevance, not M2 content taxonomy | PDF link visible, 508KB; not downloaded | Supplemental official | Metadata extracted | Useful for process context only; not a M2 temario or content blueprint. |
| Temario de la PAES Regular - Competencia Matematica 2 (M2), Admision 2026 | DEMRE / Universidad de Chile | Jueves 20 de marzo de 2025 | Admision 2026 | `https://demre.cl/publicaciones/2026/2026-25-03-20-temario-paes-regular-m2` | Official publication page | Previous-cycle M2 temario reference | PDF link visible, 190KB; not downloaded | Historical / provisional comparison | Metadata extracted | Use only as comparison or fallback if a future phase cannot use the 2027 source. |
| Temario de la PAES Regular - Obligatoria de Competencia Lectora, Admision 2026 | DEMRE / Universidad de Chile | Jueves 20 de marzo de 2025 | Admision 2026 | `https://demre.cl/publicaciones/2026/2026-25-03-20-temario-paes-regular-competencia-lectora` | Official publication page | Previous-cycle L1 temario reference | PDF link visible, 204KB; not downloaded | Historical / provisional comparison | Metadata extracted | Use only as comparison or fallback if a future phase cannot use the 2027 source. |
| Publicacion Ejemplos de Preguntas PAES | DEMRE / Universidad de Chile | Page footer/process indicates Proceso de Admision 2023 | Admision 2023 | `https://demre.cl/la-prueba/ejemplos-preguntas/paes-p2023/p3-clectora.html` | Official example-question page | Historical/supplemental L1 example-question style | No PDF required for metadata | Supplemental historical official | Metadata extracted | Useful only as official example style; not current temario and not canonical taxonomy. |

## 8. M2 metadata register

Primary current M2 source candidate:

| Field | Metadata |
| --- | --- |
| Title | `Temario de la PAES Regular - Competencia Matematica 2 (M2)` |
| Institution / host | DEMRE / Universidad de Chile |
| Visible publication date | Jueves 19 de marzo de 2026 |
| Cycle / process | Listed from Admision 2027 index; page body includes a cycle note that must be resolved in future extraction |
| URL | `https://demre.cl/publicaciones/2027/2027-26-03-19-temario-paes-regular-m2` |
| Source type | Official publication page with linked PDF |
| Relevance | Primary current M2 metadata candidate |
| PDF status | PDF link visible, 190KB; not downloaded or committed |
| Classification | Primary current candidate with supersession/cycle-note review needed |
| Extraction status | Metadata extracted only |

Supplemental M2 process source:

| Field | Metadata |
| --- | --- |
| Title | `Universidades y carreras que utilizaran como requisito obligatorio y factor de ponderacion la PAES de Competencia Matematica 2 (M2) - Proceso de Admision 2027` |
| Institution / host | DEMRE / Acceso Mineduc |
| Visible publication date | Viernes 23 de enero de 2026 |
| Cycle / process | Admision 2027 |
| URL | `https://demre.cl/publicaciones/2027/2027-26-01-23-universidades-requisito-m2-p2027` |
| Source type | Official process/support publication |
| Relevance | M2 process relevance and public admission context, not content taxonomy |
| PDF status | PDF link visible, 508KB; not downloaded or committed |
| Classification | Supplemental official |
| Extraction status | Metadata extracted only |

Historical/provisional M2 source:

| Field | Metadata |
| --- | --- |
| Title | `Temario de la PAES Regular - Competencia Matematica 2 (M2)` |
| Institution / host | DEMRE / Universidad de Chile |
| Visible publication date | Jueves 20 de marzo de 2025 |
| Cycle / process | Admision 2026 |
| URL | `https://demre.cl/publicaciones/2026/2026-25-03-20-temario-paes-regular-m2` |
| Source type | Official publication page with linked PDF |
| Relevance | Historical/provisional comparison for M2 |
| PDF status | PDF link visible, 190KB; not downloaded or committed |
| Classification | Historical official / provisional comparison |
| Extraction status | Metadata extracted only |

## 9. L1 metadata register

Primary current L1 source candidate:

| Field | Metadata |
| --- | --- |
| Title | `Temario de la PAES Regular - Obligatoria de Competencia Lectora` |
| Institution / host | DEMRE / Universidad de Chile |
| Visible publication date | Jueves 19 de marzo de 2026 |
| Cycle / process | Admision 2027 |
| URL | `https://demre.cl/publicaciones/2027/2027-26-03-19-temario-paes-regular-competencia-lectora` |
| Source type | Official publication page with linked PDF |
| Relevance | Primary current L1 metadata candidate |
| PDF status | PDF link visible, 204KB; not downloaded or committed |
| Classification | Primary current candidate |
| Extraction status | Metadata extracted only |

Historical/provisional L1 source:

| Field | Metadata |
| --- | --- |
| Title | `Temario de la PAES Regular - Obligatoria de Competencia Lectora` |
| Institution / host | DEMRE / Universidad de Chile |
| Visible publication date | Jueves 20 de marzo de 2025 |
| Cycle / process | Admision 2026 |
| URL | `https://demre.cl/publicaciones/2026/2026-25-03-20-temario-paes-regular-competencia-lectora` |
| Source type | Official publication page with linked PDF |
| Relevance | Historical/provisional comparison for L1 |
| PDF status | PDF link visible, 204KB; not downloaded or committed |
| Classification | Historical official / provisional comparison |
| Extraction status | Metadata extracted only |

## 10. Example-question metadata register

| Source | Institution / host | Visible date | Cycle / process | URL | Source type | Relevance | PDF status | Hierarchy | Extraction status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Seleccion de preguntas PAES Regular y clavijeros - Proceso de Admision 2026 | DEMRE / Universidad de Chile | Child links visible with dates from 01-12-2025 to 05-01-2026 | Admision 2026 | `https://demre.cl/publicaciones/2026/pruebas-oficiales-paes-regular-p2026` | Official example/question and answer-key index | Future M2/L1 example metadata and style support | Linked child sources visible; not downloaded | Supplemental official | Metadata extracted | Includes Competencia Lectora and M2 child links; not a temario replacement. |
| Publicacion Ejemplos de Preguntas PAES | DEMRE / Universidad de Chile | Historical page, footer/process visible as 2022 / Admision 2023 | Admision 2023 | `https://demre.cl/la-prueba/ejemplos-preguntas/paes-p2023/p3-clectora.html` | Official example-question page | Historical/supplemental L1 example style | No PDF required | Supplemental historical official | Metadata extracted | Do not use as current-cycle temario or final taxonomy. |

## 11. Supplemental / historical metadata register

Supplemental official sources may inform process context, example style, or source hierarchy, but they do not replace current-cycle temarios.

Historical official sources may support comparison and change detection only.

They must not be used as current canonical alignment if a current-cycle source is available and verified.

## 12. Rejected or non-canonical source types

Rejected as canonical PAES M2/L1 alignment:

* commercial preuniversitario pages;
* private course outlines;
* SEO summaries;
* Wikipedia;
* media explainers;
* blogs;
* AI summaries;
* unofficial PDF mirrors;
* copied temario snippets without official DEMRE / Universidad de Chile / Mineduc / Acceso source links;
* social media summaries;
* school or tutor-prep pages.

No rejected source was used as canonical metadata in this phase.

## 13. Candidate source hierarchy

Candidate hierarchy after this phase:

1. Primary current source index:
   * DEMRE `Publicaciones PAES - Admision 2027`.
   * DEMRE `Temarios PAES Regular - Proceso de Admision 2027`.
2. Primary current source candidates:
   * DEMRE 2027 L1 temario page.
   * DEMRE 2027 M2 temario page, with future cycle-note resolution required.
3. Supplemental official sources:
   * DEMRE / Acceso Mineduc M2 requirement publication for Admision 2027.
   * DEMRE PAES Regular question/clavijero index for Admision 2026.
4. Historical official sources:
   * DEMRE 2026 M2 and L1 temario pages.
   * Older official example-question pages.
5. Rejected/non-canonical sources:
   * Unofficial, commercial, media, blog, AI, and mirror sources.

If any page and PDF disagree, a future source-content extraction phase must record the discrepancy and reserve source hierarchy for Pro/high-level or explicit direction.

## 14. What can be trusted after this phase

The following can be trusted after this phase:

* Official current-cycle DEMRE publication and temario index pages were found for Admision 2027.
* Official DEMRE L1 and M2 temario pages were found under the 2027 publication structure.
* Official linked PDFs are visible for M2 and L1 temario pages, but were not downloaded or committed.
* Official DEMRE example/question sources exist and can be treated as supplemental, not primary temario replacements.
* 2026 temario pages remain useful only as historical/provisional comparison candidates.
* M2 remains not ready.
* L1 remains not ready.
* Public Sales-Ready remains blocked.

## 15. What cannot be inferred yet

This phase does not infer:

* full temario contents;
* final M2 taxonomy;
* final L1 taxonomy;
* M2 route/content alignment;
* L1 route/content alignment;
* exact M2 content families;
* exact L1 text or skill families;
* text rights/licensing clearance;
* StudyLoad design;
* question design;
* feedback design;
* dashboard/progress design;
* official PAES readiness for Bexauri;
* M2 readiness;
* L1 readiness;
* public Sales-Ready.

## 16. Future M2 alignment prerequisites

Before any M2 alignment phase:

* Use the current DEMRE 2027 M2 temario page as primary source candidate.
* Resolve the visible cycle-note inconsistency on the M2 2027 page before treating it as final hierarchy.
* If using the linked PDF, cite exact title, date, URL, and page/PDF hierarchy in a separate source-content extraction phase.
* Compare 2027 and 2026 metadata only as controlled source hierarchy, not as route design.
* Do not create M2 taxonomy, content, StudyLoads, feedback, or dashboard evidence until separately authorized.

## 17. Future L1 alignment prerequisites

Before any L1 alignment phase:

* Use the current DEMRE 2027 L1 temario page as primary source candidate.
* If using the linked PDF, cite exact title, date, URL, and page/PDF hierarchy in a separate source-content extraction phase.
* Treat example-question pages as supplemental style/evidence sources only.
* Keep text rights/licensing, editorial quality, difficulty, sensitivity, and cognitive-load review separate.
* Do not create L1 taxonomy, texts, questions, StudyLoads, feedback, or dashboard evidence until separately authorized.

## 18. Risks and mitigations

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Metadata mistaken for alignment | Could prematurely validate M2/L1 route proposals. | Label this as metadata-only and require future extraction/alignment phases. |
| Current-cycle source hierarchy is mishandled | Page/PDF/date discrepancies can affect canonical alignment. | Record hierarchy and unresolved notes explicitly. |
| PDF content is copied into repo | Copyright and custody risk. | No PDF downloads, no committed PDFs, no long excerpts. |
| Example sources replace temarios | Examples do not define complete scope. | Classify examples as supplemental official only. |
| 2026 sources override 2027 sources | Could create stale alignment. | Classify 2026 as historical/provisional comparison. |
| Unofficial sources contaminate taxonomy | Weakens PAES alignment and governance. | Reject unofficial sources for canonical alignment. |
| M2/L1 readiness is declared from metadata | Creates Sales-Ready drift. | Keep M2/L1 not ready and public Sales-Ready blocked. |

## 19. Questions reserved for Pro/high-level direction

Reserved questions:

* Whether the 2027 M2 page cycle-note discrepancy requires direct PDF/header review before any alignment.
* Whether linked PDFs or HTML pages have hierarchy priority if metadata differs.
* Whether 2026 sources may be used as provisional fallback if 2027 source-content extraction is blocked.
* Whether example-question sources can be used for internal item-style analysis and under what copyright limits.
* Whether the M2 Acceso Mineduc requirement source should affect product priority or only process context.
* Minimum official metadata evidence required before M2 source-content extraction.
* Minimum official metadata evidence required before L1 source-content extraction.
* Who approves source hierarchy before taxonomy work begins.

## 20. Future phase options

Option A:

```text
MVP-COMMERCIAL-PAES-SOURCE-1B - Resolve current-cycle PAES M2/L1 source hierarchy
```

Purpose: resolve page/PDF hierarchy, cycle notes, and supersession before source-content extraction.

Option B:

```text
MVP-COMMERCIAL-PAES-SOURCE-1C - Controlled official M2/L1 source-content extraction
```

Purpose: extract concise official-source content summaries without route/content implementation.

Option C:

```text
MVP-COMMERCIAL-M2-READINESS-1A - Official-source alignment for candidate M2 route families
```

Purpose: align candidate M2 route families after source hierarchy and extraction are accepted.

Option D:

```text
MVP-COMMERCIAL-L1-READINESS-1A - Official-source and text-rights alignment for candidate L1 route families
```

Purpose: align candidate L1 route/text families after source hierarchy and extraction are accepted.

Recommendation: prefer `MVP-COMMERCIAL-PAES-SOURCE-1B` next if the M2 cycle-note discrepancy needs closure before content extraction; otherwise prefer `MVP-COMMERCIAL-PAES-SOURCE-1C`.

No next phase is opened automatically.

## 21. Context Gate summary

| Field | Summary |
| --- | --- |
| Phase | `MVP-COMMERCIAL-PAES-SOURCE-1A - Extract official M2/L1 source metadata` |
| Proposed action | Create documentation-only source metadata extraction document for official PAES M2/L1 sources. |
| Phase type | Documentation-only / controlled official-source metadata extraction / source custody. |
| Product horizon | Roadmap change-control / official-source metadata extraction / M2-L1 readiness preparation / Sales-Ready support; not Sales-Ready approval. |
| Roadmap block | M2/L1 official-source custody before readiness alignment; public Sales-Ready remains blocked. |
| Git preflight | `HEAD`, `origin/main`, and `origin/HEAD` matched `fd2cc65`; working tree was clean. |
| Canonical docs read | `PHASE_LOG.md`, Product horizons, Context Gate protocol, Living Memory Index, handoff protocol, current handoff, product/UI/brand synthesis, operating mode, compact reporting rule. |
| Phase docs read | PAES-SOURCE-1, M2-READINESS-1, L1-READINESS-1, Sales-Ready Gate 1, Gate 1A, Gate 1B, Gate 1C, and Gate 1D. |
| Product/UI docs read | Product/UI/brand synthesis read; no UI change authorized. |
| Relevant strategic decisions | M1-only remains not Sales-Ready; public Sales-Ready requires M1/M2/L1; M2 and L1 remain not ready; official-source alignment is required before implementation/readiness claims. |
| Student experience impact | None. No app operation, content, StudyLoad, text, question, feedback, dashboard, `/now`, student UI, runtime, access, or activation change. |
| Commercial impact | Source metadata custody only; no public sale, public beta, payment, subscription, price, public offer, or Sales-Ready approval. |
| Commercial non-goals | No public offer, public launch, public sale, payment, price, subscription, trial activation, billing/subscription/payment, Sales-Ready approval, market validation, or pricing validation. |
| Brand risk | Moderate if metadata is mistaken for official alignment or readiness; controlled by metadata-only labeling and explicit non-goals. |
| Operational/tutor-admin impact | None. Future source extraction and alignment prerequisites are documented only. |
| Technical scope | Markdown doc plus `PHASE_LOG.md` only; controlled official web metadata extraction; no PDF download. |
| Explicit non-goals | No code, content registry, StudyLoads, texts, questions, PDFs committed, DB read/mutation, API call, browser/app operation, schema, migration, deploy, `/now`, UI, endpoint, auth, StudentAccess mutation, trial, runtime, billing, payment, full temario extraction, M2 alignment, L1 alignment, readiness declaration, or Sales-Ready approval. |
| Missing context check | No blocking context missing for metadata extraction. The 2027 M2 page includes a cycle-note discrepancy that must be resolved before alignment. |
| Roadmap change-control check | This phase supports roadmap change-control but does not change roadmap state or approve M2/L1 readiness. |
| Why this phase is aligned | It creates official metadata custody before M2/L1 source-content extraction or alignment, reducing risk of unofficial or premature source use. |
| What this phase must not include | Full temarios, final taxonomies, content creation, StudyLoads, texts, questions, feedback, implementation, public launch, public sale, payment, DB, deploy, or Sales-Ready approval. |
| GO / NO-GO | GO. |
| Reason | GO only because this is documentation-only source metadata extraction and source custody. |

## 22. Explicit non-goals

* No code.
* No content registry change.
* No StudyLoads created.
* No texts created.
* No questions created.
* No feedback created.
* No text rights approval.
* No PDFs downloaded.
* No PDFs committed.
* No generated artifacts.
* No DB read.
* No DB mutation.
* No migrations.
* No deploy.
* No app operation.
* No browser smoke.
* No API call.
* No product behavior change.
* No full temario extraction.
* No source-content extraction.
* No final M2 taxonomy.
* No final L1 taxonomy.
* No M2 alignment.
* No L1 alignment.
* No official PAES alignment claim.
* No M2 implementation.
* No L1 implementation.
* No M2 readiness declaration.
* No L1 readiness declaration.
* No runtime enforcement.
* No trial activation.
* No billing, subscription, or payment.
* No `/now`.
* No student UI.
* No admin UI.
* No admin mutation.
* No StudentAccess mutation.
* No repair/autocreate.
* No participant contacted.
* No evidence collected.
* No public offer.
* No public launch.
* No public sale.
* No Sales-Ready approval.
* No Sales-Ready claim.

## 23. Result marker

```text
MVP_COMMERCIAL_PAES_SOURCE_1A_OFFICIAL_M2_L1_METADATA_EXTRACTED
```
