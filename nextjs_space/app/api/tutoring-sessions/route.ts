export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

const includeContext = {
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
  studyLoad: {
    select: {
      id: true,
      loadType: true,
      title: true,
      status: true,
    },
  },
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const learningCycleId = searchParams.get('learningCycleId')
  const studyLoadId = searchParams.get('studyLoadId')

  const where: Record<string, string> = {}
  if (learningCycleId) where.learningCycleId = learningCycleId
  if (studyLoadId) where.studyLoadId = studyLoadId

  try {
    const sessions = await prisma.tutoringSession.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { createdAt: 'desc' },
      include: includeContext,
    })
    return NextResponse.json(sessions)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { learningCycleId, studyLoadId, sessionType, status, startedAt, completedAt, notes } = body ?? {}

    if (!learningCycleId) {
      return NextResponse.json({ error: 'learningCycleId is required' }, { status: 400 })
    }

    // Verify cycle exists and check closed-cycle guard
    const cycle = await prisma.learningCycle.findUnique({ where: { id: learningCycleId } })
    if (!cycle) {
      return NextResponse.json({ error: 'Learning cycle not found' }, { status: 404 })
    }
    if (cycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot add sessions to a closed cycle' }, { status: 400 })
    }

    // If studyLoadId provided, verify it exists
    if (studyLoadId) {
      const load = await prisma.studyLoad.findUnique({ where: { id: studyLoadId } })
      if (!load) {
        return NextResponse.json({ error: 'Study load not found' }, { status: 404 })
      }
    }

    const record = await prisma.tutoringSession.create({
      data: {
        learningCycleId,
        studyLoadId: studyLoadId || null,
        sessionType: sessionType || 'practice',
        status: status || 'in_progress',
        startedAt: startedAt ? new Date(startedAt) : undefined,
        completedAt: completedAt ? new Date(completedAt) : null,
        notes: notes || null,
      },
      include: includeContext,
    })
    return NextResponse.json(record, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
