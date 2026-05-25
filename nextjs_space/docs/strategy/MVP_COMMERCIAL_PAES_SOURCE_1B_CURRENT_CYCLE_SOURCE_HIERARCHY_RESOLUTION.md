# MVP-COMMERCIAL-PAES-SOURCE-1B - Current-Cycle PAES M2/L1 Source Hierarchy Resolution

## 1. Phase

MVP-COMMERCIAL-PAES-SOURCE-1B.

Documentation-only / controlled official-source hierarchy resolution / source custody.

Baseline: `8285c52`.

This phase resolves, or explicitly classifies as unresolved, the current-cycle source hierarchy before future source-content extraction or M2/L1 alignment.

## 2. Relationship to PAES-SOURCE-1 and SOURCE-1A

PAES-SOURCE-1 created a controlled official-source intake inventory for M2 and L1.

SOURCE-1A extracted official-source metadata only and recorded a material M2 hierarchy discrepancy:

- the DEMRE 2027 publication structure and temario index identify M2 as part of `Proceso de Admision 2027`;
- the M2 page URL is under the 2027 publication structure;
- the M2 page body says `Admision 2026`;
- the M2 linked PDF was visible but not downloaded or content-extracted.

SOURCE-1B resolves the page-level hierarchy decision for future custody. It does not extract source content.

## 3. Nature of document

This is a source hierarchy resolution document.

It is not source-content extraction, M2 alignment, L1 alignment, final taxonomy design, content design, StudyLoad design, implementation authority, or Sales-Ready approval.

## 4. Purpose

The purpose is to define which official DEMRE pages may be treated as current-cycle source candidates, which sources are supplemental or historical, and what stop rules apply before future extraction.

## 5. Source access status

`WEB_ACCESS_AVAILABLE_USED_FOR_CONTROLLED_HIERARCHY_VERIFICATION`.

Official pages checked:

- DEMRE `Publicaciones PAES - Admision 2027`: https://demre.cl/publicaciones/listado-2027
- DEMRE `Temarios PAES Regular - Proceso de Admision 2027`: https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular
- DEMRE 2027 M2 temario page: https://demre.cl/publicaciones/2027/2027-26-03-19-temario-paes-regular-m2
- DEMRE 2027 Competencia Lectora temario page: https://demre.cl/publicaciones/2027/2027-26-03-19-temario-paes-regular-competencia-lectora
- DEMRE 2026 M2 temario page as historical comparison: https://demre.cl/publicaciones/2026/2026-25-03-20-temario-paes-regular-m2
- DEMRE 2026 Competencia Lectora temario page as historical comparison: https://demre.cl/publicaciones/2026/2026-25-03-20-temario-paes-regular-competencia-lectora
- DEMRE 2026 official PAES question/clavijero index as supplemental example source: https://demre.cl/publicaciones/2026/pruebas-oficiales-paes-regular-p2026

No PDFs were downloaded. No PDFs were committed. No long source contents were copied. No unofficial sources were used.

## 6. Hierarchy verification method and limits

The verification checked only hierarchy-relevant metadata:

- official host and institution;
- URL structure;
- parent publication index relationship;
- parent temario index relationship;
- page title;
- visible publication date;
- visible admission/process language;
- PDF link visibility;
- relation to older 2026 historical pages;
- supplemental status of example-question pages.

This phase did not open, download, store, or content-extract PDFs. It did not extract full temarios, item contents, taxonomies, skills, text contents, questions, or feedback.

## 7. Current-cycle source hierarchy register

| Source | Official status | Hierarchy role | Visible cycle language | PDF status | Decision |
| --- | --- | --- | --- | --- | --- |
| DEMRE Publicaciones PAES - Admision 2027 | Official DEMRE / Universidad de Chile | Top current-cycle publication index | `Proceso de Admision 2027` | Not applicable | Primary parent index |
| DEMRE Temarios PAES Regular - Proceso de Admision 2027 | Official DEMRE / Universidad de Chile | Current-cycle temario index | `Proceso de Admision 2027`; PAES Regular to be applied in 2026 | Not applicable | Primary temario parent index |
| DEMRE 2027 M2 temario page | Official DEMRE / Universidad de Chile | Current-cycle M2 candidate child page | URL/parent index: 2027; body line: `Admision 2026` | Visible PDF link, not downloaded | Provisionally resolved current-cycle candidate with discrepancy |
| DEMRE 2027 L1 temario page | Official DEMRE / Universidad de Chile | Current-cycle L1 candidate child page | `Competencia Lectora 2026 - Admision 2027` | Visible PDF link, not downloaded | Resolved current-cycle primary candidate at page level |
| DEMRE 2026 M2 temario page | Official DEMRE / Universidad de Chile | Historical comparison | `Admision 2026` | Visible PDF link, not downloaded | Historical/provisional comparison only |
| DEMRE 2026 L1 temario page | Official DEMRE / Universidad de Chile | Historical comparison | `Competencia Lectora 2025 - Admision 2026` | Visible PDF link, not downloaded | Historical/provisional comparison only |
| DEMRE 2026 PAES question/clavijero index | Official DEMRE / Universidad de Chile | Supplemental examples | `Proceso de Admision 2026` | Links visible, not downloaded | Supplemental only |

## 8. M2 hierarchy finding

M2 hierarchy decision: `PROVISIONALLY_RESOLVED_CURRENT_CYCLE_CANDIDATE_WITH_DISCREPANCY`.

The 2027 M2 page may be treated as the primary current-cycle candidate for planning custody because:

- it is hosted on official DEMRE / Universidad de Chile infrastructure;
- it is under the 2027 URL structure;
- it is linked from the 2027 publications index;
- it is linked from the PAES Regular temario index for `Proceso de Admision 2027`;
- the temario index identifies M2 as a current-cycle PAES Regular temario with publication date `19-03-2026`;
- the M2 page exposes a PDF link.

However, the page body says the document details contents for M2 `Admision 2026`. Because that body-cycle note conflicts with the 2027 parent structure, future extraction must recheck page/PDF hierarchy before using M2 content as canonical.

## 9. L1 hierarchy finding

L1 hierarchy decision: `RESOLVED_CURRENT_CYCLE_PRIMARY_CANDIDATE_AT_PAGE_LEVEL`.

The 2027 L1 page may be treated as the primary current-cycle candidate at page level because:

- it is hosted on official DEMRE / Universidad de Chile infrastructure;
- it is under the 2027 URL structure;
- it is linked from the 2027 publications index;
- it is linked from the PAES Regular temario index for `Proceso de Admision 2027`;
- the visible body says `Competencia Lectora 2026 - Admision 2027`;
- the page exposes a PDF link.

No material page-level hierarchy conflict was visible for L1. Future source-content extraction should still verify the linked PDF title/header before extracting contents.

## 10. M2 discrepancy analysis

The M2 discrepancy remains material but bounded:

- Current-cycle signals: 2027 URL path, 2027 publication index, 2027 temarios index, and current-cycle parent page.
- Conflicting signal: the M2 child page body says `Admision 2026`.
- Historical comparison: the 2026 M2 page also says `Admision 2026`, but has a 2025 publication date and a 2026 URL path.

This creates a likely page-body wording carryover or metadata inconsistency, but SOURCE-1B does not decide that as fact. The safe treatment is provisional hierarchy resolution with a hard stop before content extraction.

Stop rules for future M2 extraction:

- Do not extract M2 temario contents as canonical until the future extraction phase records the page/PDF title, header, publication date, URL, parent index, and cycle language.
- If the linked PDF/header resolves the cycle as `Admision 2027` or otherwise clearly belongs to the 2027 parent, the future phase may classify it as current-cycle primary.
- If the PDF/header repeats only `Admision 2026` without a clear 2027 parent relation, the future phase must mark M2 hierarchy unresolved or request Pro/high-level direction.
- Do not use 2026 historical M2 as canonical while a 2027 current-cycle candidate exists.

## 11. L1 hierarchy analysis

The L1 hierarchy is clean at page level:

- Parent publication index is `Admision 2027`.
- Parent temario index is `Proceso de Admision 2027`.
- L1 page URL is under 2027 publication structure.
- L1 page language says `Competencia Lectora 2026 - Admision 2027`.
- L1 has a visible PDF link.

This supports L1 as the current-cycle primary candidate at page level. Future extraction must still confirm PDF/header metadata before extracting source contents.

## 12. 2026 historical/provisional source policy

Official 2026 DEMRE pages may be used only as historical comparison or provisional context when a current-cycle source is unavailable or unresolved.

They must not override current-cycle 2027 parent pages. They must not be used as canonical PAES M2/L1 alignment if current-cycle 2027 source candidates exist.

## 13. Example-question supplemental source policy

Official DEMRE example-question, question-selection, and clavijero sources may be used as supplemental evidence of item style, answer-key structure, or future validation context.

They do not replace temarios and must not define final M2 or L1 taxonomy by themselves.

## 14. Candidate hierarchy decision

Candidate hierarchy after SOURCE-1B:

1. Official current-cycle DEMRE 2027 publication index.
2. Official current-cycle DEMRE 2027 PAES Regular temarios index.
3. Official current-cycle child temario pages for L1 and M2.
4. Linked official PDFs, only after future metadata/header verification and source-content extraction.
5. Official example-question pages as supplemental context.
6. Official 2026 pages as historical/provisional comparison.
7. Unofficial sources rejected as non-canonical.

M2 remains `provisionally resolved` with explicit discrepancy stop rules.

L1 is `resolved at page level` as current-cycle primary candidate, pending normal PDF/header confirmation before content extraction.

## 15. What can be trusted after this phase

- The 2027 DEMRE publications index is the top current-cycle publication parent.
- The DEMRE PAES Regular temarios page is the current-cycle temario parent for `Proceso de Admision 2027`.
- The 2027 L1 page is the primary current-cycle L1 candidate at page level.
- The 2027 M2 page is the primary current-cycle M2 candidate at page level only with a material discrepancy caveat.
- 2026 pages are historical/provisional comparison sources only.
- Example-question sources are supplemental only.

## 16. What cannot be inferred yet

- Full M2 temario contents.
- Full L1 temario contents.
- Final M2 taxonomy.
- Final L1 taxonomy.
- M2/L1 content scope.
- StudyLoad families approved for implementation.
- Text or question rights.
- Feedback implementation readiness.
- Dashboard implementation readiness.
- M2 readiness.
- L1 readiness.
- Public Sales-Ready readiness.

## 17. Impact on future M2 extraction

Future M2 source-content extraction may proceed only if it first handles the discrepancy:

- record exact official page metadata;
- inspect only the necessary PDF/header metadata without committing the PDF;
- determine whether the linked PDF belongs to the current-cycle 2027 hierarchy;
- if unresolved, stop before full content extraction or alignment.

No M2 content, taxonomy, StudyLoad, feedback, or dashboard work is authorized by SOURCE-1B.

## 18. Impact on future L1 extraction

Future L1 source-content extraction may use the 2027 L1 page as the primary page-level candidate, but must still:

- record exact official page and PDF/header metadata;
- avoid long copyrighted extracts;
- separate source-content extraction from alignment;
- avoid declaring L1 ready.

No L1 content, text, question, taxonomy, StudyLoad, feedback, or dashboard work is authorized by SOURCE-1B.

## 19. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| M2 body-cycle discrepancy creates false canonical confidence | Mark M2 as provisionally resolved only and require PDF/header recheck before extraction |
| Historical 2026 sources are accidentally used as current-cycle canonical | Explicitly classify them as historical/provisional comparison only |
| Example-question sources replace temarios | Classify examples as supplemental only |
| Source hierarchy work becomes content extraction | Keep this phase metadata-only and require future extraction phase |
| Official page/PDF hierarchy changes later | Future extraction must cite exact title, date, URL, and access date |
| Unofficial sources pollute alignment | Reject unofficial/commercial/media/blog/AI sources as canonical |

## 20. Questions reserved for Pro / high-level direction

- Whether M2 may proceed to source-content extraction if the PDF/header repeats the 2026 body note.
- Whether an official clarification is required before M2 alignment.
- Whether prior-cycle sources may be used as temporary scaffolding if current-cycle M2 remains unresolved.
- Minimum confidence threshold for treating page-level L1 as ready for source-content extraction.
- Whether example-question sources may inform future evidence packages before route/content alignment.

## 21. Future phase options

Option A:

`MVP-COMMERCIAL-PAES-SOURCE-1C - Controlled official M2/L1 source-content extraction`

Option B:

`MVP-COMMERCIAL-PAES-SOURCE-1C-M2 - Resolve M2 PDF/header discrepancy before source-content extraction`

Option C:

`MVP-COMMERCIAL-PAES-M2-ALIGNMENT-1 - Candidate M2 source-to-route alignment`

Option D:

`MVP-COMMERCIAL-PAES-L1-ALIGNMENT-1 - Candidate L1 source-to-route alignment`

Recommendation:

Prefer Option B if the next phase is M2-first. Prefer Option A only if it begins with PDF/header metadata confirmation and stops on unresolved conflict.

## 22. Context Gate summary

| Field | Summary |
| --- | --- |
| Phase | MVP-COMMERCIAL-PAES-SOURCE-1B |
| Proposed action | Resolve current-cycle official-source hierarchy for M2/L1 |
| Phase type | Documentation-only / controlled official-source hierarchy resolution |
| Product horizon | Roadmap change-control / official-source hierarchy resolution / M2-L1 readiness preparation / Sales-Ready support |
| Roadmap block | M2 and L1 remain not ready; public Sales-Ready remains blocked |
| Git preflight | Passed at `8285c52`; working tree clean before edits |
| Canonical docs read | Governance, handoff, product/UI context, operating mode, compact reporting |
| Phase docs read | PAES-SOURCE-1, SOURCE-1A, M2-READINESS-1, L1-READINESS-1, Sales-Ready Gate 1/1A/1B/1C/1D |
| Product/UI docs read | `PRODUCT_UI_BRAND_CONTEXT_SYNTHESIS.md` |
| Relevant strategic decisions | M1-only is not Sales-Ready; M2/L1 remain not ready; official-source custody precedes alignment |
| Student experience impact | None; no student-facing change |
| Commercial impact | Source hierarchy clarified for future readiness; no public sale or promise |
| Commercial non-goals | No public launch, no public offer, no Sales-Ready claim |
| Brand risk | Reduced by avoiding unofficial/copy-pasted or overresolved source claims |
| Operational/tutor-admin impact | None |
| Technical scope | Markdown documentation only |
| Explicit non-goals | No code, DB, PDFs, extraction, alignment, content, StudyLoads, UI, deploy |
| Missing context check | No blocking local-doc contradiction found |
| Roadmap change-control check | Aligned as source-custody precondition only |
| Why this phase is aligned | It resolves hierarchy needed before source extraction without claiming readiness |
| What this phase must not include | Full temario extraction, M2/L1 alignment, content creation, readiness declaration |
| GO / NO-GO | GO |
| Reason | Documentation-only hierarchy resolution with controlled official-source verification |

## 23. Explicit non-goals

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
- no PDF download;
- no PDF commit;
- no generated artifacts;
- no full temario extraction;
- no M2 alignment;
- no L1 alignment;
- no final M2 taxonomy;
- no final L1 taxonomy;
- no text rights approval;
- no M2 readiness declaration;
- no L1 readiness declaration;
- no Sales-Ready approval;
- no public launch;
- no public sale.

## 24. Result marker

```text
MVP_COMMERCIAL_PAES_SOURCE_1B_CURRENT_CYCLE_SOURCE_HIERARCHY_RESOLVED
```
