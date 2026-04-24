export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const instance = await prisma.studentProgramInstance.findUnique({
      where: { id: params.id },
      include: {
        student: { select: { id: true, firstName: true, lastName: true, email: true } },
        program: { select: { id: true, code: true, name: true } },
        learningCycles: {
          orderBy: { cycleNumber: 'asc' },
          include: {
            _count: {
              select: {
                cycleDecisions: true,
                studyLoads: true,
                cycleEvaluations: true,
              },
            },
          },
        },
        skillStates: {
          orderBy: { createdAt: 'desc' },
          include: {
            skill: {
              select: {
                id: true,
                code: true,
                name: true,
                axis: { select: { id: true, code: true, name: true } },
              },
            },
          },
        },
        // Phase EG — minimal admin-only read of the latest persisted
        // continuity_start_governance_reading record for this
        // enrollment. Advisory only. Not a workflow decision, not a
        // write path, not a source-of-truth resolution, not a
        // materializer-of-record change. Hard-coded signalType filter
        // is intentional: EG is strictly scoped to ED-typed rows;
        // widening requires code edits.
        continuitySignals: {
          where: { signalType: 'continuity_start_governance_reading' },
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          take: 1,
          select: { rationale: true },
        },
      },
    })

    if (!instance) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // Derive `latestGovernancePosture` scalar and strip the raw
    // signals array from the response shape.
    const latest = instance.continuitySignals?.[0]
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
    const { continuitySignals: _discarded, ...rest } = instance

    return NextResponse.json({ ...rest, latestGovernancePosture })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.studentProgramInstance.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })

    const body = await req.json()
    const { status, currentContinuityState, endedAt, lastActivityAt } = body ?? {}

    const data: Record<string, any> = {}
    if (status !== undefined) data.status = status
    if (currentContinuityState !== undefined) data.currentContinuityState = currentContinuityState
    if (endedAt !== undefined) data.endedAt = endedAt ? new Date(endedAt) : null
    if (lastActivityAt !== undefined) data.lastActivityAt = lastActivityAt ? new Date(lastActivityAt) : null

    // Auto-set endedAt when status changes to completed/dropped and endedAt is not being set
    if (status && (status === 'completed' || status === 'dropped') && endedAt === undefined && !existing.endedAt) {
      data.endedAt = new Date()
    }

    const updated = await prisma.studentProgramInstance.update({
      where: { id: params.id },
      data,
      include: {
        student: { select: { id: true, firstName: true, lastName: true, email: true } },
        program: { select: { id: true, code: true, name: true } },
      },
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.studentProgramInstance.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })

    const body = await req.json()
    const { startedAt, endedAt } = body ?? {}

    const data: Record<string, any> = {}
    if (startedAt !== undefined) data.startedAt = startedAt ? new Date(startedAt) : null
    if (endedAt !== undefined) data.endedAt = endedAt ? new Date(endedAt) : null

    const updated = await prisma.studentProgramInstance.update({
      where: { id: params.id },
      data,
      include: {
        student: { select: { id: true, firstName: true, lastName: true, email: true } },
        program: { select: { id: true, code: true, name: true } },
      },
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.studentProgramInstance.findUnique({
      where: { id: params.id },
      include: { _count: { select: { learningCycles: true, skillStates: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })

    if (existing._count.learningCycles > 0) {
      return NextResponse.json(
        { error: `Cannot delete enrollment with ${existing._count.learningCycles} learning cycle(s). Remove cycles first.` },
        { status: 400 }
      )
    }

    if (existing._count.skillStates > 0) {
      return NextResponse.json(
        { error: `Cannot delete enrollment with ${existing._count.skillStates} skill state(s). Remove skill states first.` },
        { status: 400 }
      )
    }

    await prisma.studentProgramInstance.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}