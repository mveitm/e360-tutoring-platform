# FL-UX-2A — Multiple-Choice Answer Capture Readiness and Data Contract

## 1. Title

**Multiple-Choice Answer Capture Readiness and Data Contract — FL-UX-2A**

## 2. Purpose

This document is a technical and product readiness audit for implementing multiple-choice answer capture in Bexauri. It inspects the current codebase, defines the safest minimal architecture, proposes data contracts, and establishes implementation sequencing and go/no-go gates.

This phase does **not** implement answer capture. It only produces the readiness contract.

---

## 3. Current State Audit

### 3.1 Response model

The current `Response` model in `prisma/schema.prisma`:

```prisma
model Response {
  id                String   @id @default(cuid())
  tutoringSessionId String
  skillId           String?
  responseType      String   @default("answer")
  content           String?
  isCorrect         Boolean?
  score             Float?
  feedback          String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  tutoringSession TutoringSession @relation(fields: [tutoringSessionId], references: [id], onDelete: Cascade)
  skill           Skill?          @relation(fields: [skillId], references: [id], onDelete: SetNull)

  @@map("responses")
}
```

Key observations:
- **Response is connected to TutoringSession**, not directly to StudyLoad.
- There is **no direct StudyLoad → Response relation** in the schema.
- Response has `content` (String?), `isCorrect` (Boolean?), `score` (Float?), `feedback` (String?).
- Response has an optional `skillId` FK.
- There is no `ResponseItem` or item-level child model.
- There is no `contentVersion`, `itemKey`, or `selectedOptionKey` field.

### 3.2 Relation chain: StudyLoad → Response

The chain is:
```
StudyLoad
  → TutoringSession[] (via studyLoadId FK on TutoringSession)
    → Response[] (via tutoringSessionId FK on Response)
```

This means:
- StudyLoad has many TutoringSessions.
- Each TutoringSession has many Responses.
- To find Responses for a StudyLoad, you join through TutoringSession.

### 3.3 Current use of Response: self-report

Response is currently used **exclusively** as the self-report container:

- **Created by:** `POST /api/study-loads/[id]/complete` (the `/complete` endpoint).
- **When:** Inside the atomic transaction that transitions StudyLoad `in_progress → completed` and TutoringSession `in_progress → completed`.
- **Data written:**
  - `tutoringSessionId`: the session being completed.
  - `responseType`: `"answer"` (hardcoded default).
  - `content`: one of `"Me fue bien"`, `"Me costó"`, `"No la terminé"` (self-report text).
  - All other fields: null.

- **Read by `/now`:** The `/now` page queries `tutoringSessions[0].responses[0].content` (most recent completed session’s most recent response) to display "Tu reporte: Me fue bien" on completed load cards.

- **Read by admin cycle detail:** The `GET /api/learning-cycles/[id]` endpoint includes `studyLoads.tutoringSessions.responses` in its response. The admin cycle detail component (`cycle-detail-view.tsx`) displays all responses as "Autorreporte: {content}" under each study load.

- **Read by admin Responses list:** `GET /api/responses` returns all Response records with full context (session → cycle → enrollment → student/program).

### 3.4 TutoringSession model

```prisma
model TutoringSession {
  id              String    @id @default(cuid())
  learningCycleId String
  studyLoadId     String?
  sessionType     String    @default("practice")
  status          String    @default("in_progress")
  startedAt       DateTime  @default(now())
  completedAt     DateTime?
  notes           String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  learningCycle LearningCycle @relation(...)
  studyLoad     StudyLoad?    @relation(...)
  responses     Response[]

  @@map("sessions_pedagogical")
}
```

Key observations:
- TutoringSession is the intermediary between StudyLoad and Response.
- `/start` creates a TutoringSession `in_progress` linked to the StudyLoad.
- `/complete` closes the TutoringSession and creates the self-report Response.
- TutoringSession has `learningCycleId` and `studyLoadId`.

### 3.5 StudyLoad model

```prisma
model StudyLoad {
  id              String    @id @default(cuid())
  learningCycleId String
  loadType        String
  title           String
  status          String    @default("pending")
  releasedAt      DateTime?
  dueAt           DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  learningCycle    LearningCycle    @relation(...)
  tutoringSessions TutoringSession[]

  @@map("study_loads")
}
```

Key observations:
- No `content`, `contentVersion`, or `contentKey` field.
- Content is resolved externally via the static registry (`lib/study-load-content.ts`) using `title` as lookup key.
- No direct link to Response.

### 3.6 /start endpoint behavior

`POST /api/study-loads/[id]/start`:
1. Validates ownership, enrollment active, cycle open, load pending.
2. Transitions StudyLoad `pending → in_progress`.
3. Creates TutoringSession `in_progress` linked to StudyLoad and cycle.
4. Updates enrollment `lastActivityAt`.
5. Does NOT create any Response.

### 3.7 /complete endpoint behavior

`POST /api/study-loads/[id]/complete`:
1. Validates ownership, enrollment active, cycle open, load `in_progress`.
2. Requires `selfReport` in body (closed set of 3 options).
3. Atomic transaction:
   - StudyLoad `in_progress → completed`.
   - TutoringSession `in_progress → completed` (with `completedAt`).
   - Creates one Response with `responseType="answer"`, `content=selfReport`.
   - Updates enrollment `lastActivityAt`.
4. Does NOT create CycleDecision, CycleEvaluation, or next StudyLoad.

### 3.8 Existing assumptions that could break

| Assumption | Risk if violated |
|---|---|
| Response has exactly one record per completed load (the self-report) | Admin cycle detail and /now display assume `responses[0]` is the self-report. Adding MC answers as additional Response rows would break this assumption. |
| `responseType="answer"` means self-report | If MC answers also use `responseType="answer"`, queries filtering by this type would return mixed data. |
| `content` contains the self-report text | If MC answers are stored in `content`, the display logic would show answer data instead of self-report. |
| `/complete` is the only Response creator | Adding a separate MC answer submission endpoint would create Responses outside `/complete`. |

---

## 4. Recommended Architecture

### 4.1 Should Response remain the canonical parent submission entity?

**Yes, conditionally.** Response is already the evidence entity. However, it currently serves a single purpose (self-report). To avoid semantic drift and breaking existing queries, the architecture should:

1. **Keep the existing self-report Response as-is** (`responseType="answer"`, `content=selfReport`).
2. **Introduce a new `responseType` value** for the MC answer submission, such as `"mc_submission"`, so existing queries filtering by `responseType="answer"` continue to return only self-reports.
3. **Store item-level answers as a JSON payload** in `content` for the MVP phase, with a clear plan to extract into a `ResponseItem` child model later.

### 4.2 Why JSON first, ResponseItem later?

| Approach | MVP safety | Long-term quality | Schema risk |
|---|---|---|---|
| **A) JSON in `content`** | ✅ High — no schema change | ⚠️ Medium — no relational queries on items | ✅ None |
| **B) New ResponseItem model** | ⚠️ Medium — schema change + migration | ✅ High — relational item queries | ⚠️ Schema drift risk |

**Recommendation for FL-UX-2B:** Use approach **A (JSON)** for the first implementation. This avoids schema changes, migration risk, and `prisma db push` on production. The JSON payload is structured and typed in application code.

**Planned future phase:** Extract JSON into a `ResponseItem` child model when:
- item-level admin queries are needed;
- scoring aggregation at DB level is needed;
- the platform has more than one active content type.

### 4.3 Recommended data flow

```
Student clicks "Empezar" on /now
  → POST /start → StudyLoad in_progress, TutoringSession created

Student views /now/study-loads/[id], answers MC items
  → POST /api/study-loads/[id]/responses
  → Creates Response(responseType="mc_submission", content=JSON)
  → Linked to the active TutoringSession
  → StudyLoad remains in_progress

Student clicks "Terminar" on /now
  → POST /complete → StudyLoad completed, TutoringSession completed
  → Creates Response(responseType="answer", content=selfReport)
  → Existing flow unchanged
```

This means a completed load with MC answers will have **two Response records** on its TutoringSession:
1. `responseType="mc_submission"` — the item-level answers (created before /complete).
2. `responseType="answer"` — the self-report (created by /complete).

Existing queries that filter `responseType="answer"` will continue to return only self-reports.

---

## 5. Data Contract Proposal

### 5.1 MC Submission Response record

| Field | Value |
|---|---|
| `tutoringSessionId` | The active in_progress TutoringSession for this StudyLoad |
| `responseType` | `"mc_submission"` |
| `content` | JSON string (see below) |
| `isCorrect` | null (not used at submission time) |
| `score` | null (not used at submission time) |
| `skillId` | null (not used in v1) |
| `feedback` | null |

### 5.2 JSON payload in `content`

```json
{
  "contentKey": "PAES M1 \u2014 Ecuaciones lineales b\u00e1sicas",
  "contentVersion": "fl-content-1",
  "submittedAt": "2026-04-30T18:00:00.000Z",
  "items": [
    {
      "itemIndex": 0,
      "selectedOption": "B",
      "answered": true
    },
    {
      "itemIndex": 1,
      "selectedOption": "C",
      "answered": true
    },
    {
      "itemIndex": 2,
      "selectedOption": null,
      "answered": false
    }
  ]
}
```

### 5.3 Field definitions

| Field | Type | Description |
|---|---|---|
| `contentKey` | string | The StudyLoad title used to look up content in the static registry. |
| `contentVersion` | string | A stable identifier for the content version. For now, use the FL phase code (e.g., `"fl-content-1"`, `"fl-content-2"`). |
| `submittedAt` | ISO 8601 string | When the student submitted their answers. |
| `items` | array | One entry per exercise in the content. |
| `items[].itemIndex` | number | 0-based index matching the item order in the content registry. |
| `items[].selectedOption` | string \| null | The option label selected (e.g., `"A"`, `"B"`, `"C"`, `"D"`) or null if skipped. |
| `items[].answered` | boolean | Whether the student provided an answer for this item. |

### 5.4 Content key/version strategy

- **`contentKey`** = StudyLoad title. This is safe because the static registry is keyed by title, and the viewer already resolves content this way.
- **`contentVersion`** = FL phase code (e.g., `"fl-content-1"`). This is a lightweight versioning approach. If content is updated, a new version code is used, and old submissions remain linked to the version they saw.
- The static registry (`lib/study-load-content.ts`) should add a `version` field to each content entry. This is a safe, no-schema change.
- Title-based resolution is acceptable for MVP. When content moves to the database, the key strategy will shift to content IDs.

### 5.5 Answer key evaluation (admin-side only)

The correct answers are stored in the static content registry (not in the Response). Admin-side display can compare `selectedOption` against the registry’s answer key to show correct/incorrect per item. This comparison happens at **read time**, not write time.

This avoids:
- storing `correctOption` in the submission (which could drift if the key is corrected);
- computing `isCorrect` at submission time (which adds write-time complexity);
- coupling the submission endpoint to the answer key.

---

## 6. Submission Rules (MVP)

| Rule | Decision | Rationale |
|---|---|---|
| **One submission per StudyLoad?** | Yes — one `mc_submission` Response per TutoringSession. | Simplest model. If the student re-submits, the existing Response is replaced (upsert by `tutoringSessionId` + `responseType="mc_submission"`). |
| **Can a student replace answers while in_progress?** | Yes — re-submitting overwrites the previous `mc_submission` Response. | Students may want to review and change answers before completing. |
| **Answers become read-only after completed?** | Yes — the endpoint rejects submissions if StudyLoad is not `in_progress`. | Once the student clicks "Terminar", the load is completed and answers are frozen. |
| **Incomplete answers?** | Allowed — the student can submit with some items unanswered (`answered: false`). | No penalty for skipping. Admin sees which items were skipped. |
| **No answer key in content?** | Submission still works. Admin sees answers but no correct/incorrect comparison. | The answer key is optional for the submission to succeed. |
| **StudyLoad not in_progress?** | Rejected with 409. | Answers can only be submitted while the load is active. |
| **StudyLoad already completed?** | Rejected with 409. | Same guard — completed loads are read-only. |

---

## 7. Endpoint Contract (Future FL-UX-2B)

### `POST /api/study-loads/[id]/responses`

**Purpose:** Save or replace the student’s multiple-choice answers for a StudyLoad.

**Authentication:** Required (session-based).

**Ownership chain:** Same as content viewer:
`User.email → Student.email → active Enrollment → open Cycle → StudyLoad (in_progress)`

**Request body:**
```json
{
  "items": [
    { "itemIndex": 0, "selectedOption": "B" },
    { "itemIndex": 1, "selectedOption": "C" },
    { "itemIndex": 2, "selectedOption": null }
  ]
}
```

**Server-side behavior:**
1. Authenticate and verify ownership.
2. Verify StudyLoad is `in_progress`.
3. Verify cycle is `open`.
4. Look up static content by StudyLoad title.
5. Validate `items` against the content: correct number of items, valid `itemIndex` values, valid `selectedOption` labels.
6. Find the active `in_progress` TutoringSession for this StudyLoad.
7. Build the JSON payload (add `contentKey`, `contentVersion`, `submittedAt`).
8. Upsert: find existing Response with `tutoringSessionId` + `responseType="mc_submission"`. If exists, update `content`. If not, create.
9. Return the Response record.

**Does NOT:**
- Alter StudyLoad status.
- Call /complete.
- Create CycleDecision.
- Compute score or isCorrect.
- Trigger adaptive logic.
- Create or modify self-report.

**Response:** `200` (updated) or `201` (created) with the Response record.

**Error codes:**
- `401` — not authenticated.
- `403` — not the owner.
- `404` — StudyLoad not found.
- `409` — StudyLoad not in_progress, or cycle not open.
- `400` — no registered content for this title, or invalid items.

---

## 8. Student UX Contract (Future FL-UX-2C)

The existing `/now/study-loads/[id]` viewer becomes answerable:

1. Student opens the viewer (same route, same ownership check).
2. If StudyLoad is `in_progress` and content has MC items:
   - Each item shows radio-button options (A/B/C/D).
   - Student can select one answer per item.
   - Simple progress display: "0/8 respondidas".
   - "Enviar respuestas" button.
3. On submit:
   - `POST /api/study-loads/[id]/responses` with selected answers.
   - System confirms: "Respuestas guardadas".
   - Student can re-submit while load is `in_progress`.
4. Student returns to `/now` and uses existing "Terminar" + self-report flow.
5. After completion, the viewer shows answers as read-only (no radio interaction).

**Does NOT include:**
- PAES score display.
- Automatic feedback ("correct"/"incorrect").
- AI response or chatbot.
- Automatic next task generation.
- Timer or time limit.

---

## 9. Admin UX Contract (Future FL-UX-2D)

The admin cycle detail view gains item-level evidence:

1. For each completed StudyLoad with an `mc_submission` Response:
   - Show a section "Respuestas del estudiante" below the existing "Autorreporte".
   - List each item with:
     - Item stem (from static registry, resolved by `contentKey`).
     - Student’s selected option.
     - Correct option (from registry answer key, if available).
     - Correct/incorrect indicator (✅/❌).
   - Summary line: "6/8 correctas" (if answer key exists).
2. Self-report continues to display as "Autorreporte: Me fue bien".
3. Manual CycleDecision creation remains unchanged.
4. No automated advance/reinforce/hold/redirect.

---

## 10. Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| **Schema drift** — adding a new model or field could cause `prisma db push` issues | High | FL-UX-2B uses **no schema changes**. JSON in existing `content` field. |
| **Response semantic drift** — mixing self-report and MC answers in the same model | Medium | Use distinct `responseType` values: `"answer"` for self-report, `"mc_submission"` for MC. Existing queries filter by `"answer"`. |
| **Data duplication** — same answer data stored in multiple places | Low | Single source: one `mc_submission` Response per TutoringSession. No duplication. |
| **Title-based content registry** — if a title changes, content lookup breaks | Medium | Titles are stable (committed in versioned docs). `contentKey` in the JSON payload freezes the title at submission time. Future: move to content IDs. |
| **Content versioning** — if content is updated, old submissions reference stale content | Medium | `contentVersion` field in JSON payload links submission to the exact version. Registry should add `version` field. |
| **`/start` and `/complete` regression** — new endpoint breaks existing flow | High | New endpoint is **completely separate** from `/start` and `/complete`. No changes to either. |
| **Admin evidence consistency** — admin sees MC answers but display logic expects only self-report | Medium | Admin display filters `responseType="answer"` for self-report. MC display is a **new section** that reads `responseType="mc_submission"`. |
| **Premature scoring/adaptive logic** — temptation to add scoring | Medium | Explicit out-of-scope. Score comparison is read-time, admin-side only. No student-facing scoring. |
| **Production data safety** — endpoint creates data in production | Medium | Standard ownership + status guards. Upsert prevents duplicates. No force-reset, no seed, no migration. |

---

## 11. Recommended Phase Split After FL-UX-2A

| Phase | Scope | Why separate |
|---|---|---|
| **FL-UX-2B** | Backend API for MC answer submission | Isolated backend change. Testable independently. No UI change. No schema change. Can be verified via API before adding UI. |
| **FL-UX-2C** | Student answer capture UI | Modifies `/now/study-loads/[id]` viewer. Depends on FL-UX-2B endpoint. Can be tested by Mauricio. |
| **FL-UX-2D** | Admin item-level evidence view | Modifies admin cycle detail. Depends on FL-UX-2B data. Independent from student UI changes. |

Rationale for separation:
- Each phase is independently testable and deployable.
- If FL-UX-2B has issues, FL-UX-2C and FL-UX-2D are not affected.
- Admin evidence (FL-UX-2D) can be implemented before or after student UI (FL-UX-2C).
- Rollback is easier per-phase.

---

## 12. Gate Before Implementation (FL-UX-2B Go/No-Go)

- [ ] Git working tree clean on `origin/main`.
- [ ] Schema parity confirmed between dev and production (no pending migrations).
- [ ] No database drift (dev and prod schemas match).
- [ ] Response data contract accepted (JSON in `content`, `responseType="mc_submission"`).
- [ ] `contentKey`/`contentVersion` strategy accepted (title + FL phase code).
- [ ] Submission rules accepted (one submission, replaceable while in_progress, frozen on complete).
- [ ] Endpoint contract accepted (`POST /api/study-loads/[id]/responses`).
- [ ] Static content registry will add `version` field before FL-UX-2B.
- [ ] Rollback plan: delete the new endpoint file. No schema to roll back.
- [ ] No `prisma db push` required.
- [ ] No `prisma migrate` required.
- [ ] No `prisma db push --force-reset`.
- [ ] No database seed.
- [ ] No deploy with unresolved drift.
- [ ] No secrets printed.

---

## 13. Content Registry Update Needed Before FL-UX-2B

The static content registry (`lib/study-load-content.ts`) should be updated to include a `version` field per entry:

```typescript
export interface StudyLoadContent {
  title: string
  version: string  // e.g., "fl-content-1"
  program: string
  topic: string
  // ... rest unchanged
}
```

This is a **safe, no-schema change** that can be done as a preparatory step within FL-UX-2B or as a tiny separate commit.

---

## 14. Explicit Non-Implementation Statement

- No code modified.
- No schema modified.
- No endpoints modified.
- No deploy.
- No data mutation — no users, students, enrollments, cycles, study loads, responses, or decisions created, modified, or deleted.
- No Prisma CLI executed.
- No secrets printed.
