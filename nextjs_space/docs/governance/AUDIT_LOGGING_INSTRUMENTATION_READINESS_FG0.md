# FG-0 — Second Audit Logging Instrumentation Readiness Gate

**Status:** Documentation only — no endpoint is instrumented by this phase.  
**Prerequisite:** Phase FE (first audit instrumentation on SkillState PATCH) is closed via CUST-BLOCK-FE.  
**Scope:** Define the second audit instrumentation candidate, expected field values, payload discipline, and verification criteria for the future Phase FG.

---

## 1. Recommended Second Endpoint

**`PUT /api/study-loads/[id]`** (`nextjs_space/app/api/study-loads/[id]/route.ts`)

> **Important correction from the original prompt:** The prompt suggested `PATCH /api/study-loads/[id]`, but code inspection reveals that PATCH was hardened to 405 (unconditional rejection) in Phase EY. The actual metadata-editing write handler is the **PUT** method in the same file. This readiness gate targets PUT, not PATCH.

## 2. Why This Endpoint Is Appropriate

- **PATCH is dead; PUT is the live write surface.** Phase EY hardened PATCH to unconditionally return 405. The PUT handler is the only method that performs StudyLoad metadata mutations (title, loadType, releasedAt, dueAt).
- **Already guarded.** PUT includes a closed-cycle guard (rejects edits when `learningCycle.status === 'closed'`) and a `loadType` allowlist validation (`CANONICAL_LOAD_TYPES`).
- **Admin-controlled.** Requires authenticated session; protected by middleware.
- **No lifecycle side-effects.** Unlike `/start` or `/complete`, PUT does not transition StudyLoad status. It only updates metadata fields.
- **Predictable mutation surface.** At most 4 fields can change: `title`, `loadType`, `releasedAt`, `dueAt`. The before/after delta is small and deterministic.
- **Second domain tested.** Moving from `skill_state` (FE) to `study_load` (FG) validates that the audit pattern generalizes across domains.

## 3. Current Endpoint Behavior (Code Inspection)

The PUT handler at lines 39–74 of `app/api/study-loads/[id]/route.ts`:

1. Authenticates via `getServerSession(authOptions)`. Returns 401 if no session.
2. Fetches the existing StudyLoad with its `learningCycle.status`.
3. Returns 404 if not found.
4. Returns 400 if the learning cycle is `closed`.
5. Parses request body for `{ title, loadType, releasedAt, dueAt }`.
6. Validates `loadType` against `CANONICAL_LOAD_TYPES` set (`practice`, `reading`, `video`, `project`, `assessment`). Returns 400 if invalid.
7. Updates the StudyLoad with only the provided fields (spread pattern).
8. Returns the updated StudyLoad with `learningCycle` include (cycle number, status, enrollment with student/program).

Also in the same file:
- **PATCH** (lines 27–35): Hardened to 405 unconditionally (Phase EY). Not a candidate.
- **DELETE** (lines 76–94): Deletes a StudyLoad with closed-cycle guard. Not targeted in this phase.

## 4. Audit Event Field Values

| AuditEvent field | Value for this endpoint |
|---|---|
| `actorType` | `"admin"` |
| `actorId` | `(session.user as any)?.id ?? 'unknown'` |
| `actorEmail` | `session.user?.email ?? null` |
| `actionType` | `"update"` |
| `domain` | `"study_load"` |
| `entityType` | `"StudyLoad"` |
| `entityId` | `params.id` (the StudyLoad primary key) |
| `endpoint` | `"/api/study-loads/[id]"` |
| `method` | `"PUT"` |
| `operationId` | `null` (single-step metadata edit; no multi-step workflow) |
| `beforePayload` | Scalar StudyLoad fields before the update (see §7) |
| `afterPayload` | Scalar StudyLoad fields after the update (see §8) |

## 5. Actor Attribution

Identical to FE. The existing NextAuth session is already available in the PUT handler via `getServerSession(authOptions)`. Actor fields are derived as:

```typescript
const actorId = (session.user as any)?.id ?? 'unknown'
const actorEmail = session.user?.email ?? null
const actorType = 'admin'
```

No additional auth changes are required.

## 6. OperationId

`null`. This is a single-step metadata edit — no multi-step workflow correlation is needed.

## 7. BeforePayload

The PUT handler already reads the existing StudyLoad before mutation (for the closed-cycle guard). The `beforePayload` should capture scalar fields from that existing record:

```typescript
{
  id, learningCycleId, loadType, title, status,
  releasedAt, dueAt, createdAt, updatedAt
}
```

These are the 9 scalar fields of the StudyLoad model. Do **not** include the nested `learningCycle` relation.

## 8. AfterPayload

Capture scalar fields from the updated StudyLoad record after mutation:

```typescript
{
  id, learningCycleId, loadType, title, status,
  releasedAt, dueAt, createdAt, updatedAt
}
```

Same 9 scalar fields. The `status` field will typically be unchanged (PUT does not mutate status), but it should be captured for completeness.

## 9. What Must NOT Be Included in Audit Payloads

- **Secrets**: No passwords, tokens, API keys, connection strings, or session tokens.
- **Nested relations**: No learningCycle, enrollment, student, or program objects.
- **Request headers**: No raw HTTP headers, cookies, IP addresses, or user-agent strings.
- **Large blobs**: No file contents, base64 data, or unbounded arrays.
- **Derived/computed values**: Only persisted database fields; no runtime calculations.
- **Passwords**: Do not print, echo, grep, display, or inline passwords — including seed/test passwords — in any command, log, or output during verification.

## 10. Verification Steps for Phase FG

When FG is implemented, the following must be verified:

1. **TypeScript compilation**: `npx tsc --noEmit` passes with zero errors.
2. **Production build**: `yarn build` passes.
3. **Prisma validation**: `yarn prisma validate` passes.
4. **PUT behavior unchanged**: The PUT response body, status codes, error handling, closed-cycle guard, and loadType validation must remain identical to pre-FG behavior. The only addition is a post-mutation audit write.
5. **PATCH still 405**: The hardened PATCH must remain unchanged and must not be instrumented.
6. **Audit row created**: After a successful PUT, exactly one new row appears in `audit_events` with the correct field values from §4.
7. **Audit failure isolation**: If the audit write fails, the business mutation must still succeed. The audit write must be fire-and-forget with error logging.
8. **No audit on validation rejection**: If PUT is rejected by loadType validation (400), no audit row should be created.
9. **No audit on closed-cycle guard**: If PUT is rejected because the cycle is closed (400), no audit row should be created.
10. **No audit on auth failure**: If the request is unauthorized (401), no audit row should be created.
11. **No audit on not-found**: If the StudyLoad does not exist (404), no audit row should be created.
12. **Payload correctness**: `beforePayload` and `afterPayload` contain only scalar StudyLoad fields. No secrets, no nested relations.
13. **No other endpoints affected**: Only `PUT /api/study-loads/[id]` is instrumented. All other endpoints remain unchanged.
14. **No-secret-printing discipline**: Runtime verification must not print, echo, grep, display, or inline any passwords (including seed/test passwords).

## 11. Rollback Criteria

Phase FG must be rolled back if any of the following occur:

- The PUT endpoint response body or status codes change compared to pre-FG behavior.
- The PATCH 405 rejection is modified in any way.
- The audit write causes the business mutation to fail or slow down perceptibly.
- Audit payloads contain secrets, PII beyond StudyLoad scalars, or nested relations.
- Any endpoint other than `PUT /api/study-loads/[id]` is modified.
- TypeScript, build, or Prisma validation fails.
- DN/DU/DZ adaptive semantics or existing guards (EV/EW/EY/EZ) are modified.

## 12. Explicit Non-Instrumentation Statement

**FG-0 does not instrument any endpoint.** This phase is documentation only. No app code, schema, helper, middleware, agent, UI, or business data was modified. The actual instrumentation will occur in Phase FG, subject to director approval and the criteria defined in this document.
