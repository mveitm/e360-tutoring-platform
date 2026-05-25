export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'
import { recordAuditEvent } from '@/lib/audit'
import {
  NO_ACCESS_EXPECTED_STATE,
  studentAccessStateMatchesExpected,
  validateReaffirmNoAccessRequest,
} from '@/lib/student-access-admin-reaffirm'

const accessSelect = {
  id: true,
  accessStatus: true,
  trialStatus: true,
  subscriptionStatus: true,
  lastDecisionBy: true,
  lastDecisionReason: true,
  lastDecisionAt: true,
} as const

type AccessSnapshot = {
  accessStatus: string
  trialStatus: string
  subscriptionStatus: string
}

function failure(error: string, message: string, status: number) {
  return NextResponse.json({ ok: false, error, message }, { status })
}

function snapshot(access: AccessSnapshot) {
  return {
    accessStatus: access.accessStatus,
    trialStatus: access.trialStatus,
    subscriptionStatus: access.subscriptionStatus,
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return failure('invalid_json', 'Invalid request body.', 400)
    }

    const validation = validateReaffirmNoAccessRequest(body)
    if (!validation.ok) {
      return failure(validation.error, validation.message, 400)
    }

    const student = await prisma.student.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        access: { select: accessSelect },
      },
    })

    if (!student) {
      return failure('student_not_found', 'Student not found.', 404)
    }

    if (!student.access) {
      return failure(
        'student_access_missing',
        'StudentAccess row is missing and must be investigated before mutation.',
        409,
      )
    }

    const previous = snapshot(student.access)
    if (!studentAccessStateMatchesExpected(previous, validation.expectedPreviousState)) {
      return failure(
        'stale_state_conflict',
        'StudentAccess state changed. Refresh before retrying.',
        409,
      )
    }

    const decisionAt = new Date()
    const decisionBy = session.user?.email ?? 'admin'

    const updatedAccess = await prisma.$transaction(async (tx) => {
      const write = await tx.studentAccess.updateMany({
        where: {
          id: student.access!.id,
          accessStatus: NO_ACCESS_EXPECTED_STATE.accessStatus,
          trialStatus: NO_ACCESS_EXPECTED_STATE.trialStatus,
          subscriptionStatus: NO_ACCESS_EXPECTED_STATE.subscriptionStatus,
        },
        data: {
          lastDecisionBy: decisionBy,
          lastDecisionReason: validation.decisionReason,
          lastDecisionAt: decisionAt,
        },
      })

      if (write.count !== 1) {
        return null
      }

      return tx.studentAccess.findUnique({
        where: { id: student.access!.id },
        select: accessSelect,
      })
    })

    if (!updatedAccess) {
      return failure(
        'stale_state_conflict',
        'StudentAccess state changed. Refresh before retrying.',
        409,
      )
    }

    const next = snapshot(updatedAccess)

    recordAuditEvent({
      actorType: 'admin',
      actorId: session.user?.id ?? session.user?.email ?? 'admin',
      actorEmail: session.user?.email ?? null,
      actionType: 'STUDENT_ACCESS_REAFFIRM_NO_ACCESS',
      domain: 'student_access',
      entityType: 'StudentAccess',
      entityId: updatedAccess.id,
      endpoint: `/api/admin/students/${params.id}/access-transitions`,
      method: 'POST',
      beforePayload: {
        studentId: student.id,
        command: validation.command,
        ...previous,
        lastDecisionBy: student.access.lastDecisionBy,
        lastDecisionReason: student.access.lastDecisionReason,
        lastDecisionAt: student.access.lastDecisionAt?.toISOString() ?? null,
      },
      afterPayload: {
        studentId: student.id,
        command: validation.command,
        ...next,
        lastDecisionBy: updatedAccess.lastDecisionBy,
        lastDecisionReason: updatedAccess.lastDecisionReason,
        lastDecisionAt: updatedAccess.lastDecisionAt?.toISOString() ?? null,
      },
    }).catch((err) =>
      console.error('[audit] Failed to record STUDENT_ACCESS_REAFFIRM_NO_ACCESS event:', err),
    )

    return NextResponse.json({
      ok: true,
      studentId: student.id,
      command: validation.command,
      previous,
      next,
      decision: {
        by: decisionBy,
        reason: validation.decisionReason,
        at: decisionAt.toISOString(),
      },
    })
  } catch (err) {
    console.error('[student-access-transitions] Unexpected error:', err)
    return failure('internal_error', 'Internal error.', 500)
  }
}
