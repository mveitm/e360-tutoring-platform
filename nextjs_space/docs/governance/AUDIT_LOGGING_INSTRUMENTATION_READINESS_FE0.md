# FE-0 — Audit Logging First-Instrumentation Readiness Gate

**Status:** Documentation only — no endpoint is instrumented by this phase.  
**Prerequisite:** Phase FD (AuditEvent schema and helper) is closed via CUST-BLOCK-FD.  
**Scope:** Define the first audit instrumentation candidate, expected field values, payload discipline, and verification criteria for the future Phase FE.

---

## 1. Recommended First Endpoint

**`PATCH /api/skill-states/[id]`** (`nextjs_space/app/api/skill-states/[id]/route.ts`)

## 2. Why This Endpoint Is Low-Risk

- **Already hardened**: Phase FB added strict allowlists for `masteryLevel`, `confidenceLevel`, `stateSource`, and `needsReinforcement`; invalid values are rejected before any DB interaction.
- **Admin-controlled**: Requires authenticated session; protected by middleware.
- **Pedagogically relevant**: SkillState updates are a high-value audit target because they directly affect adaptive decisions.
- **No lifecycle side-effects**: Unlike cycle-close or study-load transitions, this endpoint does not cascade into snapshot creation, continuity signals, or enrollment state changes.
- **Predictable mutation surface**: The endpoint updates at most 4 known fields plus `lastEvaluatedAt`. The before/after delta is small and deterministic.
- **No new behavior**: Adding an audit write after a successful mutation does not change the endpoint's response, status codes, or error handling.

## 3. Audit Event Field Values

| AuditEvent field | Value for this endpoint |
|---|---|
| `actorType` | `"human_admin"` |
| `actorId` | `(session.user as any).id` |
| `actorEmail` | `session.user?.email ?? null` |
| `actionType` | `"update"` |
| `domain` | `"skill_state"` |
| `entityType` | `"SkillState"` |
| `entityId` | `params.id` (the SkillState primary key) |
| `endpoint` | `"/api/skill-states/[id]"` |
| `method` | `"PATCH"` |
| `operationId` | `null` (single-step mutation; no multi-step workflow) |
| `beforePayload` | Snapshot of the SkillState record **before** the update (see §6) |
| `afterPayload` | The updated SkillState record **after** the update (see §7) |

## 4. Actor Attribution

The existing NextAuth session is already available in the PATCH handler via `getServerSession(authOptions)`. Actor fields are derived as follows:

```typescript
const session = await getServerSession(authOptions)
const actorId = (session.user as any).id   // set by jwt/session callbacks in auth-options.ts
const actorEmail = session.user?.email ?? null
const actorType = 'human_admin'            // all current users are admin; future agent types will differ
```

No additional auth changes are required. The `session.user.id` field is already populated by the JWT callback in `lib/auth-options.ts`.

## 5. OperationId Strategy

For this single-step mutation, `operationId` should be `null`. OperationId is reserved for multi-step workflows (e.g., cycle-close → snapshot → continuity-signal) where multiple audit events must be correlated. That pattern will be defined in a later phase.

## 6. BeforePayload

Capture the SkillState record **before** the update by reading it first:

```typescript
const before = await prisma.skillState.findUnique({ where: { id: params.id } })
```

The `beforePayload` should contain the full SkillState scalar fields: `id`, `enrollmentId`, `skillId`, `masteryLevel`, `confidenceLevel`, `needsReinforcement`, `stateSource`, `lastEvaluatedAt`, `createdAt`, `updatedAt`.

Do **not** include nested relations (enrollment, skill, program) in the before snapshot — scalar fields only.

## 7. AfterPayload

Capture the SkillState record **after** the update. The current endpoint already returns the updated record with includes. For the audit payload, extract scalar fields only:

```typescript
const afterPayload = {
  id: state.id,
  enrollmentId: state.enrollmentId,
  skillId: state.skillId,
  masteryLevel: state.masteryLevel,
  confidenceLevel: state.confidenceLevel,
  needsReinforcement: state.needsReinforcement,
  stateSource: state.stateSource,
  lastEvaluatedAt: state.lastEvaluatedAt,
  createdAt: state.createdAt,
  updatedAt: state.updatedAt,
}
```

## 8. What Must NOT Be Included in Audit Payloads

- **Secrets**: No passwords, tokens, API keys, connection strings, or session tokens.
- **Nested relations**: No student PII beyond what is already in the SkillState record. Do not embed full student, enrollment, or program objects.
- **Request headers**: No raw HTTP headers, cookies, IP addresses, or user-agent strings. These were explicitly excluded from the FD-approved model.
- **Large blobs**: No file contents, base64 data, or unbounded arrays.
- **Derived/computed values**: Only persisted database fields; no runtime calculations.

## 9. Verification Steps for Phase FE

When FE is implemented, the following must be verified:

1. **TypeScript compilation**: `npx tsc --noEmit` passes with zero errors.
2. **Production build**: `yarn build` passes.
3. **Prisma validation**: `yarn prisma validate` passes.
4. **Endpoint behavior unchanged**: The PATCH response body, status codes, and error handling must remain identical to pre-FE behavior. The only addition is a post-mutation audit write.
5. **Audit row created**: After a successful PATCH, exactly one new row appears in `audit_events` with the correct field values from §3.
6. **Audit failure isolation**: If the audit write fails (e.g., database error), the business mutation must still succeed. The audit write must not be inside the same transaction as the business mutation. (Fire-and-forget with error logging.)
7. **No audit on validation rejection**: If the PATCH is rejected by FB validation guards (400), no audit row should be created.
8. **No audit on auth failure**: If the request is unauthorized (401), no audit row should be created.
9. **Payload correctness**: `beforePayload` and `afterPayload` contain only scalar SkillState fields. No secrets, no nested relations.
10. **No other endpoints affected**: Only `PATCH /api/skill-states/[id]` is instrumented. All other endpoints remain unchanged.

## 10. Rollback Criteria

Phase FE must be rolled back if any of the following occur:

- The PATCH endpoint response body or status codes change compared to pre-FE behavior.
- The audit write causes the business mutation to fail or slow down perceptibly.
- Audit payloads contain secrets, PII beyond SkillState scalars, or nested relations.
- Any endpoint other than `PATCH /api/skill-states/[id]` is modified.
- TypeScript, build, or Prisma validation fails.
- DN/DU/DZ adaptive semantics or existing guards (EV/EW/EY/EZ) are modified.

## 11. Explicit Non-Instrumentation Statement

**FE-0 does not instrument any endpoint.** This phase is documentation only. No app code, schema, helper, middleware, agent, UI, or business data was modified. The actual instrumentation will occur in Phase FE, subject to director approval and the criteria defined in this document.
