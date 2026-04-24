export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

const cycleInclude = {
  learningCycle: {
    select: {
      id: true,
      cycleNumber: true,
      status: true,
      enrollment: {
        select: {
          id: true,
          student: { select: { firstName: true, lastName: true } },
          program: { select: { code: true, name: true } },
        },
      },
    },
  },
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const learningCycleId = searchParams.get('learningCycleId')

  try {
    const snapshots = await prisma.cycleSnapshot.findMany({
      where: learningCycleId ? { learningCycleId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: cycleInclude,
    })
    return NextResponse.json(snapshots)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { learningCycleId, snapshotType, payload, takenAt } = body ?? {}

    if (!learningCycleId) {
      return NextResponse.json({ error: 'learningCycleId is required' }, { status: 400 })
    }

    const cycle = await prisma.learningCycle.findUnique({ where: { id: learningCycleId } })
    if (!cycle) {
      return NextResponse.json({ error: 'Learning cycle not found' }, { status: 404 })
    }
    if (cycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot add snapshots to a closed cycle' }, { status: 400 })
    }

    const snapshot = await prisma.cycleSnapshot.create({
      data: {
        learningCycleId,
        snapshotType: snapshotType || 'pre_decision',
        payload: payload ?? null,
        takenAt: takenAt ? new Date(takenAt) : undefined,
      },
      include: cycleInclude,
    })
    return NextResponse.json(snapshot, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
