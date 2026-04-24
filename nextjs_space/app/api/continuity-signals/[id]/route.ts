export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

const includeContext = {
  enrollment: {
    select: {
      id: true,
      status: true,
      currentContinuityState: true,
      student: { select: { firstName: true, lastName: true } },
      program: { select: { code: true, name: true } },
    },
  },
  learningCycle: {
    select: {
      id: true,
      cycleNumber: true,
      status: true,
    },
  },
  evaluation: {
    select: {
      id: true,
      evaluationType: true,
      resultSummary: true,
    },
  },
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const record = await prisma.continuitySignal.findUnique({
      where: { id: params.id },
      include: includeContext,
    })
    if (!record) return NextResponse.json({ error: 'Continuity signal not found' }, { status: 404 })
    return NextResponse.json(record)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.continuitySignal.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Continuity signal not found' }, { status: 404 })

    const body = await req.json()
    const { signalType, rationale, learningCycleId, evaluationId } = body ?? {}

    // If learningCycleId provided, verify it exists
    if (learningCycleId !== undefined && learningCycleId !== null) {
      const cycle = await prisma.learningCycle.findUnique({ where: { id: learningCycleId } })
      if (!cycle) {
        return NextResponse.json({ error: 'Learning cycle not found' }, { status: 404 })
      }
    }

    // If evaluationId provided, verify it exists
    if (evaluationId !== undefined && evaluationId !== null) {
      const evaluation = await prisma.cycleEvaluation.findUnique({ where: { id: evaluationId } })
      if (!evaluation) {
        return NextResponse.json({ error: 'Cycle evaluation not found' }, { status: 404 })
      }
    }

    const updated = await prisma.continuitySignal.update({
      where: { id: params.id },
      data: {
        ...(signalType !== undefined && { signalType }),
        ...(rationale !== undefined && { rationale: rationale || null }),
        ...(learningCycleId !== undefined && { learningCycleId: learningCycleId || null }),
        ...(evaluationId !== undefined && { evaluationId: evaluationId || null }),
      },
      include: includeContext,
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.continuitySignal.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Continuity signal not found' }, { status: 404 })

    await prisma.continuitySignal.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
