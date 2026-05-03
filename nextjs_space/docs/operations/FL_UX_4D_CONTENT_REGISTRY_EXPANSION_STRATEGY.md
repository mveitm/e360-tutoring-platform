# FL-UX-4D — Content Registry Expansion Strategy

**Version:** 1.0  
**Date:** 2026-05-03  
**Phase:** FL-UX-4D  
**Prerequisite:** FL-UX-4B (operations runbook), FL-UX-4C (account protocol)  
**Status:** ACTIVE — governs all content expansion decisions during internal beta

---

## 1. Executive Decision

**Content is now the main bottleneck for expanding the internal beta.**

- The platform infrastructure, operations runbook (FL-UX-4B), and account
  protocol (FL-UX-4C) are in place.
- The current content registry contains only 2 PAES_M1 linear-equation
  activities. A student exhausts all available content after 2 cycles.
- Registry expansion is required before inviting additional students or
  sustaining a multi-week beta with even 1 student.
- Expansion must be **minimal, curated, and registry-matched**.
- No mass content generation. Each new activity is a deliberate,
  quality-controlled addition.

---

## 2. Current Content State

### Validated registry entries

| # | Title                                            | contentKey                                 | Items | Program  |
|---|--------------------------------------------------|--------------------------------------------|-------|----------|
| 1 | `PAES M1 — Ecuaciones lineales básicas`          | `paes_m1_linear_equations_basic`           | 8 MC  | PAES_M1  |
| 2 | `PAES M1 — Problemas con ecuaciones lineales`    | `paes_m1_linear_equations_word_problems`   | 8 MC  | PAES_M1  |

### Current limitation
- Only 2 activities exist, both covering the same axis (ALG — Álgebra)
  and the same skill (ALG_LINEAR — Resolver problemas de ecuaciones
  lineales).
- Both have been validated end-to-end through FL-UX-2/3 cycles.
- All items use A/B/C/D multiple-choice format with stable answer keys.

### Why non-registry StudyLoads fail
When an operator creates a StudyLoad with a title that does not match
any content registry entry, the student sees "content not available" on
`/now` → `Ver actividad`. The registry-match contract (FL-UX-4B §7) is
enforced at render time: if `getContentByTitle(title)` returns
`undefined`, no activity content is displayed.

---

## 3. Content Expansion Objective

| Dimension          | Target                                              |
|--------------------|-----------------------------------------------------|
| Students           | Support 1–3 students through multi-week beta        |
| Program            | PAES_M1 first; L1 pilot only if M1 is stable       |
| Cycle depth        | Enough variety for 4–6 total guided cycles per student |
| Additional loads   | 2–4 new registry-matched activities                 |
| Workflow           | Preserve manual evidence review and CycleDecision   |
| Quality bar        | Each activity reviewed and QA-tested before student use |

---

## 4. Registry-Match Contract

Every StudyLoad assigned during internal beta must satisfy:

1. **Title match** — The StudyLoad title must be a character-for-character
   match of a content registry entry title (copy-paste recommended).
2. **Stable contentKey** — Each entry has a unique slug
   (e.g., `paes_m1_proportional_reasoning_basic`) that never changes
   after publication.
3. **contentVersion** — Starts at `v1`. Incremented only on item changes.
4. **Item keys** — Each MC question has a stable key (`q1`, `q2`, …)
   that persists across versions for evidence traceability.
5. **Option keys** — Options A/B/C/D are stable per item.
6. **Answer keys** — `correctOptionKey` exists for admin evidence
   interpretation. It must **not** be used for student-facing scoring
   or feedback during internal beta.
7. **Title approval** — New titles must be reviewed by the operator
   before being assigned to any student.

---

## 5. Minimum Viable Content Set

Recommended content roadmap for internal beta expansion:

| Priority | Proposed title                                       | contentKey (proposed)                          | Axis   | Skill target           | Status       |
|----------|------------------------------------------------------|------------------------------------------------|--------|------------------------|--------------|
| P1       | `PAES M1 — Ecuaciones lineales: refuerzo`            | `paes_m1_linear_equations_reinforcement`       | ALG    | ALG_LINEAR             | To design    |
| P2       | `PAES M1 — Razonamiento proporcional básico`         | `paes_m1_proportional_reasoning_basic`         | ALG    | ALG_FUNC (or new)      | To design    |
| P3       | `PAES M1 — Funciones y gráficos básicos`              | `paes_m1_functions_graphs_basic`               | ALG    | ALG_FUNC               | To design    |
| P4       | `PAES L1 — Extracción de información explícita`       | `paes_l1_explicit_information_extraction`      | (L1)   | (L1 pilot)             | Deferred     |

### Sequencing rationale
- **P1 (reinforcement):** Same skill as existing content but different
  items. Allows repeat-cycle decisions without re-using identical
  questions. Fastest to design.
- **P2 (proportional reasoning):** New topic within ALG axis. Broadens
  coverage without leaving the validated M1 program.
- **P3 (functions/graphs):** Second new topic. Aligns with seeded skill
  ALG_FUNC. Introduces visual/graph items.
- **P4 (L1 pilot):** Deferred until M1 expansion is stable. Requires
  source-text copyright review. Keep as optional stretch goal.

**M2 is explicitly deferred** unless direction decides otherwise. M2
content has higher complexity and has not been scoped for internal beta.

---

## 6. Content Item Standard

Every new activity must meet these minimum standards:

| Dimension              | Requirement                                          |
|------------------------|------------------------------------------------------|
| Item count             | 6–10 MC questions per activity                       |
| Format                 | A/B/C/D multiple-choice, single correct answer       |
| Instructions           | Clear stem in Spanish, appropriate for PAES M1 level |
| Skill focus            | One primary skill per activity                       |
| Answer key             | `correctOptionKey` for every item, reviewed for accuracy |
| Wording                | Unambiguous, no trick questions, no double negatives  |
| Copyright              | No copyrighted source text unless properly licensed   |
| PAES claim             | **No PAES score prediction or official exam claim**   |
| Language               | Spanish (Chilean conventions preferred)              |
| Accessibility          | Plain text; avoid items that require images unless essential |

---

## 7. Difficulty and Sequencing

### Difficulty levels

| Level          | Description                                                | When to assign                                    |
|----------------|------------------------------------------------------------|---------------------------------------------------|
| **Acceso**     | Entry-level / diagnostic. Basic recall and single-step.    | First cycle for a new student or new topic.       |
| **Refuerzo**   | Reinforcement. Same skill, slightly varied contexts.       | After a `repeat` or `reinforce` CycleDecision.    |
| **Práctica**   | Standard practice. Multi-step, word problems.              | After successful access/reinforcement.            |
| **Extensión**  | Stretch. Requires combining skills or deeper reasoning.    | After strong evidence on standard practice.       |

### How the operator chooses the next load

During internal beta, load sequencing is **fully manual**:

1. Review evidence from the completed load (correctCount, self-report).
2. Record a CycleDecision with rationale (FL-UX-4B §11).
3. Select the next load based on difficulty level and available registry
   content.
4. Assign by creating a new cycle + load with a registry-matched title.

No automated adaptive routing exists yet.

---

## 8. Pedagogical Metadata Proposal

The following metadata should be documented for each content entry, even
if not yet stored in the database schema:

| Field              | Type       | Purpose                                          |
|--------------------|------------|--------------------------------------------------|
| `program`          | string     | PAES_M1, PAES_L1, etc.                          |
| `axis`             | string     | Axis code (ALG, GEO, DAT)                        |
| `skill`            | string     | Skill code (ALG_LINEAR, ALG_FUNC, etc.)          |
| `difficulty`       | enum       | acceso / refuerzo / práctica / extensión         |
| `estimatedMinutes` | number     | Expected student time (15–40 min)                |
| `prerequisite`     | string?    | contentKey of prerequisite activity, if any       |
| `evidencePurpose`  | string     | What the operator should look for in results     |
| `recommendedNext`  | string     | Suggested next contentKey after `advance`         |
| `decisionGuidance` | string     | Suggested CycleDecision logic for this activity  |

**Implementation note:** These fields are documentation-only for now.
They can be added to `StudyLoadContent` in a future schema/code phase
when the registry grows beyond manual tracking.

---

## 9. Validation Checklist Before Content Enters Registry

Before any new content entry is added to `study-load-content.ts`:

- [ ] **Title approved** by operator/direction.
- [ ] **contentKey approved** — follows naming convention
      (`paes_m1_[topic]_[variant]`).
- [ ] **contentVersion** set to `v1`.
- [ ] **Item keys** assigned (`q1` through `qN`).
- [ ] **Option keys** stable (A/B/C/D for each item).
- [ ] **Answer key reviewed** — every `correctOptionKey` verified.
- [ ] **Student instructions clear** — stem text unambiguous.
- [ ] **Admin evidence purpose documented** — what should the operator
      look for after student completes this activity?
- [ ] **No scoring/adaptive promise** — no text implies PAES score or
      automated feedback.
- [ ] **Manual QA in browser** — after code implementation, operator
      tests the full flow: `/now` → Empezar → Ver actividad → answer
      all items → Enviar respuestas → Terminar.
- [ ] **Copyright clear** — no copyrighted material without license.
- [ ] **Pedagogical metadata documented** (§8) even if not in schema.

---

## 10. Operational Usage Rules

1. **Do not assign unregistered titles.** If the desired content is not
   in the registry, do not create the StudyLoad. Request a content
   phase instead.
2. **Do not rely on auto-generated StudyLoads** unless their titles are
   confirmed to match a registry entry.
3. **Operator must verify** `/now` and `Ver actividad` render correctly
   before the student accesses the load.
4. **Keep loads small** — 6–10 items per activity. Larger loads increase
   beta support burden and evidence interpretation time.
5. **One new content entry per implementation phase.** Do not batch
   multiple new activities into a single code change.
6. **Version increments** — if an existing activity's items are modified,
   increment `contentVersion` (e.g., `v1` → `v2`) and document the
   change.

---

## 11. Risks

| Risk                                  | Likelihood | Impact | Mitigation                                                |
|---------------------------------------|------------|--------|-----------------------------------------------------------|
| Content explosion (too many items)    | Medium     | High   | Limit to 1 new activity per phase; direction approval     |
| Low-quality items                     | Medium     | High   | Validation checklist (§9); peer review before registry    |
| Title mismatch                        | Low        | High   | Copy-paste titles; operator verifies before assignment    |
| Accidental scoring expectation        | Medium     | Medium | Explicit disclaimer in all docs; no student-facing scores |
| Weak evidence interpretation          | Medium     | Medium | Pedagogical metadata (§8); operator training              |
| L1 source copyright                  | Low        | High   | Defer L1 until copyright review; use original text only   |
| M2 complexity                         | Low        | Medium | M2 explicitly deferred; requires separate scoping         |
| Admin overload                        | Medium     | Medium | Max 3 students; limit cycles per week; weekly review      |
| LLM-assisted content generation costs | Low        | Medium | Current content is static; LLM use requires cost review   |
| Registry grows beyond manual tracking | Low        | Medium | Metadata proposal (§8) prepares for future schema support |

---

## 12. Recommended Phase Split After FL-UX-4D

Content expansion should be implemented as minimal, sequential phases:

| Phase       | Scope                                                  | Depends on |
|-------------|--------------------------------------------------------|------------|
| FL-UX-4D-1  | Add 1 new PAES_M1 registry activity (P1: reinforcement)| FL-UX-4D   |
| FL-UX-4D-2  | Validate P1 with internal student (1 full cycle)       | FL-UX-4D-1 |
| FL-UX-4D-3  | Add second M1 activity (P2) or first L1 pilot (P4)     | FL-UX-4D-2 |

### Why split?
- Each content addition involves code changes to `study-load-content.ts`,
  a deployment, and a QA cycle.
- Splitting ensures each activity is validated before the next is added.
- Keeps each phase small enough for a single Abacus/Codex session.
- Allows direction to review and approve at each gate.

---

## 13. Go / No-Go for Implementation

### ✅ GO for FL-UX-4D-1 if all of the following are true:
- One activity is fully specified (title, contentKey, items, answer key).
- No Prisma schema change is required.
- The activity follows the content item standard (§6).
- The validation checklist (§9) is complete for the specified activity.
- No student assignment happens in the same phase (separate phase for
  assignment).
- QA checklist is defined and operator is ready to test.

### 🚫 NO-GO if any of the following are true:
- Items are not reviewed for accuracy.
- Title or contentKey conflicts with an existing entry.
- Activity requires schema changes.
- Activity includes PAES score claims or automated feedback.
- Copyright status of source material is unclear.

---

## 14. Relationship to FL-UX-4B and FL-UX-4C

The three documents form the internal beta operating foundation:

| Document   | Governs                                                    |
|------------|------------------------------------------------------------|
| FL-UX-4B   | **Operations** — cycles, loads, decisions, evidence, reporting |
| FL-UX-4C   | **Accounts** — student access, credentials, password safety    |
| FL-UX-4D   | **Content** — what activities exist, how to add new ones safely |

**Dependency chain:**
- FL-UX-4C §5 (pre-onboarding) → FL-UX-4B §6 (pre-invitation) →
  FL-UX-4D §9 (content validation) → student starts.
- All three must be satisfied before a student begins a new activity.

---

## 15. Final Recommendation

**Do not invite more students until at least one additional
registry-matched activity is ready and validated.**

### Immediate next step
Design and specify one new PAES_M1 activity (P1: reinforcement variant
of linear equations) with full item specification, answer key, and
pedagogical metadata. Implement in FL-UX-4D-1.

### Priority order
1. **P1** — PAES M1 linear equations reinforcement (fastest, same skill).
2. **P2** — PAES M1 proportional reasoning (new topic, same program).
3. **P3** — PAES M1 functions and graphs (second new topic).
4. **P4** — PAES L1 explicit information extraction (deferred pilot).

### What to avoid
- Do not mass-generate content.
- Do not skip the validation checklist.
- Do not assign content that hasn't been QA-tested in browser.
- Do not promise PAES scores based on activity results.
- Do not expand to M2 without explicit scoping.

---

*End of FL-UX-4D Content Registry Expansion Strategy.*
