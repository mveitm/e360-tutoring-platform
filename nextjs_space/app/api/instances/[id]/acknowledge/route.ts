export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

/**
 * Phase EK — Minimal admin acknowledgement of an advisory attention signal.
 *
 * POST /api/instances/[id]/acknowledge
 *
 * Creates a ContinuitySignal row with signalType='attention_acknowledged'
 * for the given enrollment. This records that an admin has reviewed the
 * current advisory attention state. It does NOT mean the underlying
 * pedagogical concern is resolved — it is an administrative
 * acknowledgement only.
 *
 * If a new governance-reading (signalType='continuity_start_governance_reading')
 * is written later, the acknowledgement is automatically stale: consumers
 * compare timestamps to determine acknowledged vs unacknowledged.
 *
 * No schema change. No cycle/study-load/skill-state mutation.
 * No DN/DU/DZ semantics change. No convergence/precedence mutation.
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const enrollmentId = params.id

  try {
    // Validate enrollment exists
    const enrollment = await prisma.studentProgramInstance.findUnique({
      where: { id: enrollmentId },
      select: { id: true, status: true },
    })
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // Fetch the latest governance-reading to include in the rationale
    // for audit traceability.
    const latestReading = await prisma.continuitySignal.findFirst({
      where: {
        enrollmentId,
        signalType: 'continuity_start_governance_reading',
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: { id: true, rationale: true, createdAt: true },
    })

    // Extract posture from the latest governance reading if available
    let acknowledgedPosture: string | null = null
    if (latestReading?.rationale) {
      try {
        const parsed = JSON.parse(latestReading.rationale)
        if (typeof parsed?.posture === 'string') {
          acknowledgedPosture = parsed.posture
        }
      } catch {
        acknowledgedPosture = null
      }
    }

    // Write the acknowledgement signal
    const signal = await prisma.continuitySignal.create({
      data: {
        enrollmentId,
        signalType: 'attention_acknowledged',
        rationale: JSON.stringify({
          schemaVersion: 'ek.v1',
          phase: 'EK',
          action: 'acknowledge',
          acknowledgedPosture,
          acknowledgedReadingId: latestReading?.id ?? null,
          acknowledgedReadingCreatedAt: latestReading?.createdAt?.toISOString() ?? null,
          acknowledgedBy: session.user?.email ?? null,
          acknowledgedAt: new Date().toISOString(),
          semanticNote:
            'Administrative acknowledgement only. Does not mean pedagogically resolved.',
        }),
      },
      select: { id: true, createdAt: true, signalType: true },
    })

    return NextResponse.json({
      success: true,
      signalId: signal.id,
      signalType: signal.signalType,
      createdAt: signal.createdAt,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Internal error' },
      { status: 500 }
    )
  }
}

