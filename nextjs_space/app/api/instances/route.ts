export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const instances = await prisma.studentProgramInstance.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        student: { select: { id: true, firstName: true, lastName: true, email: true } },
        program: { select: { id: true, code: true, name: true } },
        // Phase EG — minimal admin-only read of the latest persisted
        // continuity_start_governance_reading record per enrollment.
        // Advisory only. Not a workflow decision, not a write path,
        // not a source-of-truth resolution, not a materializer-of-record
        // change. Hard-coded signalType filter is intentional: EG is
        // strictly scoped to ED-typed rows; widening requires code edits.
        continuitySignals: {
          where: { signalType: 'continuity_start_governance_reading' },
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          take: 1,
          select: { rationale: true },
        },
      },
    })

    // Derive `latestGovernancePosture` per enrollment and strip the
    // raw signals array from the response shape (the UI does not need
    // it; only the scalar posture).
    const withPosture = instances.map((inst) => {
      const latest = inst.continuitySignals?.[0]
      let latestGovernancePosture: string | null = null
      if (latest?.rationale) {
        try {
          const parsed = JSON.parse(latest.rationale)
          if (typeof parsed?.posture === 'string') {
            latestGovernancePosture = parsed.posture
          }
        } catch {
          latestGovernancePosture = null
        }
      }
      const { continuitySignals: _discarded, ...rest } = inst
      return { ...rest, latestGovernancePosture }
    })

    return NextResponse.json(withPosture)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { studentId, programId, status, startedAt, endedAt, lastActivityAt, currentCycleId, currentContinuityState } = body ?? {}

    if (!studentId || !programId) {
      return NextResponse.json({ error: 'studentId and programId are required' }, { status: 400 })
    }

    const instance = await prisma.studentProgramInstance.create({
      data: {
        studentId,
        programId,
        status: status ?? 'active',
        startedAt: startedAt ? new Date(startedAt) : undefined,
        endedAt: endedAt ? new Date(endedAt) : null,
        lastActivityAt: lastActivityAt ? new Date(lastActivityAt) : null,
        currentCycleId: currentCycleId || null,
        currentContinuityState: currentContinuityState ?? 'normal',
      },
      include: {
        student: { select: { id: true, firstName: true, lastName: true, email: true } },
        program: { select: { id: true, code: true, name: true } },
      },
    })
    return NextResponse.json(instance, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
