# MVP-COMMERCIAL-PAES-SOURCE-1C-M2 - M2 PDF/Header Discrepancy Resolution

## 1. Phase

MVP-COMMERCIAL-PAES-SOURCE-1C-M2.

Documentation-only / controlled official-source M2 hierarchy resolution / source custody.

Baseline: `56c1d94`.

This phase resolves the M2 page/PDF/header hierarchy discrepancy identified in SOURCE-1B before any future M2 source-content extraction.

## 2. Relationship to PAES-SOURCE-1A and SOURCE-1B

PAES-SOURCE-1A extracted official-source metadata and identified the DEMRE 2027 M2 page as a primary current candidate with a cycle-note discrepancy.

SOURCE-1B classified M2 as:

```text
PROVISIONALLY_RESOLVED_CURRENT_CYCLE_CANDIDATE_WITH_DISCREPANCY
```

SOURCE-1B stop rule required a future phase to verify PDF/header hierarchy before M2 source-content extraction or alignment.

This phase performs that narrow hierarchy check only.

## 3. Nature of document

This is a hierarchy and PDF/header metadata note.

It is not:

- full temario extraction;
- source-content extraction;
- M2 alignment;
- final M2 taxonomy;
- content design;
- StudyLoad design;
- question design;
- feedback design;
- M2 readiness approval;
- Sales-Ready approval.

## 4. Purpose

The purpose is to decide whether the official 2027 M2 page and linked PDF can be treated as the current-cycle primary M2 source for a future controlled source-content extraction phase.

The phase must choose exactly one decision:

- `RESOLVED_CURRENT_CYCLE_PRIMARY_SOURCE`;
- `PROVISIONALLY_RESOLVED_CURRENT_CYCLE_SOURCE_WITH_CAVEAT`;
- `UNRESOLVED_STOP_BEFORE_M2_CONTENT_EXTRACTION`.

## 5. Source access status

`WEB_ACCESS_AVAILABLE_USED_FOR_CONTROLLED_M2_HIERARCHY_VERIFICATION`.

Official sources checked:

- DEMRE `Publicaciones PAES - Admision 2027`: https://demre.cl/publicaciones/listado-2027
- DEMRE `Temarios PAES Regular - Proceso de Admision 2027`: https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular
- DEMRE 2027 M2 temario page: https://demre.cl/publicaciones/2027/2027-26-03-19-temario-paes-regular-m2
- DEMRE 2027 M2 linked PDF: https://demre.cl/publicaciones/pdf/2027-26-03-19-temario-paes-regular-m2.pdf
- DEMRE 2026 M2 temario page as historical comparison only: https://demre.cl/publicaciones/2026/2026-25-03-20-temario-paes-regular-m2

No PDFs were downloaded into the repo. No PDFs were committed. No generated artifacts were created. No full temario contents were extracted. No M2 alignment was performed.

## 6. Verification method and limits

The verification checked only hierarchy-relevant metadata:

- official host and institution;
- parent 2027 publication index relationship;
- parent 2027 PAES Regular temario index relationship;
- 2027 M2 page URL structure;
- 2027 M2 page visible title/date/cycle line;
- linked PDF URL/file name;
- linked PDF title/header and process-cycle metadata visible without downloading or committing the PDF;
- 2026 historical M2 page URL/date/cycle for comparison.

The verification did not copy temario sections, axes, skills, item contents, full tables, questions, or feedback contents into the repo.

## 7. M2 page hierarchy metadata

| Field | Metadata |
| --- | --- |
| Official page title | `Temario de la PAES Regular - Competencia Matematica 2 (M2)` |
| Institution / host | DEMRE / Universidad de Chile |
| Page URL | `https://demre.cl/publicaciones/2027/2027-26-03-19-temario-paes-regular-m2` |
| Parent index relationship | Linked from DEMRE 2027 publication index and 2027 PAES Regular temario index |
| Visible publication date | Jueves 19 de marzo de 2026 |
| Visible page pages count | 7 |
| Visible PDF status | PDF link visible, 190KB |
| Page hierarchy signal | Current-cycle 2027 via URL and parent indexes |
| Page discrepancy signal | Body line says `Admision 2026` |

The HTML page alone contains conflicting signals. It is insufficient by itself to resolve the discrepancy without PDF/header inspection.

## 8. M2 PDF/header metadata

| Field | Metadata |
| --- | --- |
| Official PDF URL | `https://demre.cl/publicaciones/pdf/2027-26-03-19-temario-paes-regular-m2.pdf` |
| PDF file name signal | `2027-26-03-19-temario-paes-regular-m2.pdf` |
| PDF source relation | Linked directly from the official 2027 M2 DEMRE page |
| Header/title signal | M2 temario header/title visible |
| Cycle signal in PDF introduction/header area | The PDF identifies the temarios as corresponding to `Proceso de Admision 2027` and applied in 2026 |
| Discrepancy versus HTML body | PDF/header supports 2027 hierarchy; HTML body line says `Admision 2026` |
| Extraction limit | Metadata/header only; no full temario extraction |

The PDF/header metadata resolves the hierarchy conflict in favor of the 2027 current-cycle source relationship.

## 9. 2026 historical M2 comparison

| Field | 2026 historical page | 2027 current candidate |
| --- | --- | --- |
| URL path | `/publicaciones/2026/2026-25-03-20-temario-paes-regular-m2` | `/publicaciones/2027/2027-26-03-19-temario-paes-regular-m2` |
| Visible publication date | Jueves 20 de marzo de 2025 | Jueves 19 de marzo de 2026 |
| Body cycle language | `Admision 2026` | Body line says `Admision 2026`; linked PDF/header supports 2027 process |
| Parent page | Publicaciones Proceso 2026 | Publicaciones Proceso 2027 / Temarios PAES Regular 2027 |
| Custody status | Historical/provisional comparison only | Current-cycle primary source after PDF/header resolution |

The 2026 page remains historical/provisional comparison only and must not override the 2027 page/PDF hierarchy.

## 10. Discrepancy analysis

The discrepancy is now resolved at hierarchy level:

- The 2027 publication index identifies the current process as `Admision 2027`.
- The 2027 PAES Regular temario page says the temarios are for `Proceso de Admision 2027`.
- The 2027 PAES Regular temario page links directly to the M2 child page.
- The M2 child page is under the 2027 URL structure and has a 2026 publication date.
- The M2 child page body line says `Admision 2026`.
- The M2 linked PDF file name uses the 2027 publication pattern.
- The M2 linked PDF/header metadata supports the 2027 process relationship.
- The 2026 historical page has its own 2026 URL path and 2025 publication date.

The safest interpretation is that the 2027 M2 official page/PDF is the current-cycle primary M2 source and the HTML body line is a stale or inconsistent page-body note. This phase does not assert why the body line exists; it only resolves source hierarchy using official parent and PDF/header metadata.

## 11. Final hierarchy decision

Decision:

```text
RESOLVED_CURRENT_CYCLE_PRIMARY_SOURCE
```

Result marker:

```text
MVP_COMMERCIAL_PAES_SOURCE_1C_M2_HIERARCHY_RESOLVED
```

Rationale:

- The source is official DEMRE / Universidad de Chile.
- The 2027 publication index and 2027 temario index both point to the current-cycle PAES Regular temarios.
- The 2027 M2 child page is linked from the current-cycle temario index.
- The linked PDF/header metadata supports the 2027 process relationship.
- The 2026 historical page remains separately identifiable by URL path, publication date, and parent process.

Caveat:

- The HTML page-body discrepancy must remain documented in future extraction notes.
- Future source-content extraction should cite page and PDF metadata together, not the page body line alone.

## 12. Stop/go rules for future M2 source-content extraction

GO for future controlled M2 source-content extraction only if:

- the future phase is explicitly opened;
- extraction remains limited and copyright-safe;
- the future phase cites both the official 2027 M2 page and linked PDF metadata;
- the future phase preserves the HTML body discrepancy note;
- extraction does not become M2 alignment, taxonomy, content creation, StudyLoad creation, or readiness approval.

STOP if:

- future web access cannot reach the official page/PDF;
- page/PDF metadata changes and no longer supports 2027 hierarchy;
- unofficial mirrors are required;
- full PDF copying or committed PDFs would be required;
- the phase would perform M2 alignment or content creation without explicit authorization;
- Pro/high-level direction is required for a new source conflict.

## 13. Impact on future M2 alignment

This phase permits a future source-content extraction phase to include M2 as current-cycle primary source material.

It does not permit M2 alignment.

Before M2 alignment, a future phase must separately:

- extract concise source-content summaries under copyright limits;
- map candidate M2 route/content families to official-source content;
- define source-to-route assumptions;
- reserve final taxonomy and readiness thresholds for later review;
- keep M2 not ready until route/content, feedback, dashboard, app/student evidence, and governance gates are satisfied.

## 14. Impact on L1 and joint M2/L1 extraction

This phase affects M2 only.

L1 remains governed by SOURCE-1B:

- L1 page hierarchy is resolved at page level;
- future L1 extraction still requires normal PDF/header metadata confirmation;
- no L1 alignment is authorized.

A joint future `PAES-SOURCE-1C` extraction phase may include M2 and L1 only if it keeps extraction separate from alignment and records source metadata for each source.

## 15. What can be trusted after this phase

- The official 2027 M2 page and its linked PDF may be treated as the current-cycle primary M2 source for a future controlled source-content extraction phase.
- The HTML body discrepancy is resolved at hierarchy level but must remain documented.
- The 2026 M2 page is historical/provisional comparison only.
- M2 remains not ready.
- Public Sales-Ready remains blocked.

## 16. What cannot be inferred yet

- Full M2 temario contents.
- Final M2 taxonomy.
- M2 route/content alignment.
- Exact M2 StudyLoad families.
- M2 question design.
- M2 feedback design.
- M2 dashboard/progress readiness.
- M2 implementation readiness.
- M2 student learning value.
- M2 public offer readiness.
- Public Sales-Ready readiness.

## 17. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| HTML body discrepancy is forgotten later | Preserve the caveat in future extraction docs |
| PDF/header metadata is mistaken for full extraction | Label this as hierarchy-only and metadata/header-only |
| M2 is declared ready from source hierarchy | Explicitly keep M2 not ready and Sales-Ready blocked |
| 2026 historical page is used as current canonical source | Keep 2026 source as historical/provisional comparison only |
| Future extraction copies too much PDF content | Require copyright-safe concise extraction and no PDF commits |
| Alignment starts without authorization | Separate extraction, alignment, taxonomy, content, and implementation phases |

## 18. Questions reserved for Pro/high-level direction

- Whether future M2 alignment may proceed immediately after source-content extraction or needs separate pedagogical review first.
- Minimum evidence required before candidate M2 route families can be mapped to the official source.
- Whether any official clarification should still be requested despite PDF/header hierarchy resolution.
- Whether 2026 historical comparison should be used in future extraction to identify changes.
- Who approves M2 source-to-route alignment before content or StudyLoad work.

## 19. Future phase options

Option A:

`MVP-COMMERCIAL-PAES-SOURCE-1C - Controlled official M2/L1 source-content extraction`

Option B:

`MVP-COMMERCIAL-PAES-M2-SOURCE-1D - Controlled official M2 source-content extraction`

Option C:

`MVP-COMMERCIAL-PAES-M2-ALIGNMENT-1 - Candidate M2 source-to-route alignment`

Option D:

`MVP-COMMERCIAL-PAES-L1-SOURCE-1D - Controlled official L1 source-content extraction`

Recommendation:

Prefer Option A if the next need is joint M2/L1 source-content extraction. Prefer Option B if M2 should be extracted first under a narrower source-custody phase.

## 20. Context Gate summary

| Field | Summary |
| --- | --- |
| Phase | MVP-COMMERCIAL-PAES-SOURCE-1C-M2 |
| Proposed action | Resolve official M2 PDF/header discrepancy before source-content extraction |
| Phase type | Documentation-only / controlled official-source M2 hierarchy resolution / source custody |
| Product horizon | Roadmap change-control / official-source hierarchy resolution / M2 readiness preparation / Sales-Ready support |
| Roadmap block | M2 remains not ready; L1 remains not ready; public Sales-Ready remains blocked |
| Git preflight | Passed at `56c1d94`; working tree clean before edits |
| Canonical docs read | Governance, handoff, product/UI context, operating mode, compact reporting |
| Phase docs read | PAES-SOURCE-1, SOURCE-1A, SOURCE-1B, M2-READINESS-1, L1-READINESS-1, Sales-Ready Gate 1/1A/1B/1C/1D |
| Product/UI docs read | `PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md` |
| Relevant strategic decisions | M1-only is not Sales-Ready; M2/L1 remain not ready; official-source custody precedes extraction and alignment |
| Student experience impact | None; no student-facing change |
| Commercial impact | Source hierarchy clarified for future extraction; no public sale or promise |
| Commercial non-goals | No public launch, no public offer, no Sales-Ready claim |
| Brand risk | Reduced by resolving official-source hierarchy before content claims |
| Operational/tutor-admin impact | None |
| Technical scope | Markdown documentation only; official web/PDF metadata/header verification only |
| Explicit non-goals | No code, DB, PDFs committed, full extraction, alignment, content, StudyLoads, UI, deploy |
| Missing context check | No blocking local-doc contradiction found |
| Roadmap change-control check | Aligned as source-custody precondition only |
| Why this phase is aligned | It resolves the M2 source hierarchy stop rule without claiming readiness |
| What this phase must not include | Full temario extraction, M2 alignment, content creation, readiness declaration |
| GO / NO-GO | GO |
| Reason | Documentation-only hierarchy/PDF-header resolution with controlled official-source verification |

## 21. Explicit non-goals

- no code;
- no schema change;
- no package change;
- no Prisma change;
- no DB read;
- no DB mutation;
- no SQL;
- no seed;
- no content registry change;
- no StudyLoads;
- no texts;
- no questions;
- no feedback;
- no `/now`;
- no student UI;
- no admin UI;
- no endpoints;
- no auth/signup;
- no StudentAccess behavior change;
- no trial activation;
- no billing/subscription/payment;
- no deploy;
- no PDF download into repo;
- no PDF commit;
- no generated artifacts;
- no full temario extraction;
- no M2 source-content extraction;
- no M2 alignment;
- no L1 alignment;
- no final M2 taxonomy;
- no text rights approval;
- no M2 readiness declaration;
- no L1 readiness declaration;
- no Sales-Ready approval;
- no public launch;
- no public sale.

## 22. Result marker

```text
MVP_COMMERCIAL_PAES_SOURCE_1C_M2_HIERARCHY_RESOLVED
```
