/**
 * Phase FD — Audit event helper utility.
 *
 * Provides a reusable function to record audit events in the AuditEvent table.
 * This file is server-only and must not be imported by client components.
 *
 * Design constraints:
 * - Append-only: AuditEvent records are never updated or deleted.
 * - No FK to User: actorId stores User.id, "system", or future agent identities.
 * - No Prisma enums: consistent with project-wide String + application-validation.
 * - HITL fields, correlationId, rationale, riskLevel, authorityTier, metadata
 *   are deferred to later phases.
 *
 * This helper is not called by any endpoint in Phase FD. It will be
 * instrumented into endpoints in future phases (FE onward).
 */

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type AuditEventInput = {
  actorType: string
  actorId: string
  actorEmail?: string | null
  actionType: string
  domain: string
  entityType: string
  entityId: string
  endpoint: string
  method: string
  operationId?: string | null
  beforePayload?: Prisma.InputJsonValue | null
  afterPayload?: Prisma.InputJsonValue | null
}

function toNullableJsonValue(value: Prisma.InputJsonValue | null | undefined) {
  return value === undefined || value === null ? Prisma.JsonNull : value
}

/**
 * Record an audit event in the audit_events table.
 *
 * This function does NOT swallow errors. If the database write fails,
 * the error propagates to the caller. Callers that need fire-and-forget
 * semantics must handle errors explicitly.
 *
 * @param input - The audit event fields to record.
 * @returns The created AuditEvent record.
 */
export async function recordAuditEvent(input: AuditEventInput) {
  return prisma.auditEvent.create({
    data: {
      actorType: input.actorType,
      actorId: input.actorId,
      actorEmail: input.actorEmail ?? null,
      actionType: input.actionType,
      domain: input.domain,
      entityType: input.entityType,
      entityId: input.entityId,
      endpoint: input.endpoint,
      method: input.method,
      operationId: input.operationId ?? null,
      beforePayload: toNullableJsonValue(input.beforePayload),
      afterPayload: toNullableJsonValue(input.afterPayload),
    },
  })
}

/**
 * Record an audit event within an existing Prisma transaction.
 *
 * Use this variant when the audit event must be atomically committed
 * alongside the business mutation (e.g., inside a $transaction block).
 *
 * @param tx - The Prisma transaction client.
 * @param input - The audit event fields to record.
 * @returns The created AuditEvent record.
 */
export async function recordAuditEventTx(
  tx: Prisma.TransactionClient,
  input: AuditEventInput,
) {
  return tx.auditEvent.create({
    data: {
      actorType: input.actorType,
      actorId: input.actorId,
      actorEmail: input.actorEmail ?? null,
      actionType: input.actionType,
      domain: input.domain,
      entityType: input.entityType,
      entityId: input.entityId,
      endpoint: input.endpoint,
      method: input.method,
      operationId: input.operationId ?? null,
      beforePayload: toNullableJsonValue(input.beforePayload),
      afterPayload: toNullableJsonValue(input.afterPayload),
    },
  })
}
