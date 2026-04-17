export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const learningCycleId = searchParams.get('learningCycleId')

  try {
    const loads = await prisma.studyLoad.findMany({
      where: learningCycleId ? { learningCycleId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
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
      },
    })
    return NextResponse.json(loads)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { learningCycleId, loadType, title, status, releasedAt, dueAt } = body ?? {}

    if (!learningCycleId || !loadType || !title) {
      return NextResponse.json({ error: 'learningCycleId, loadType, and title are required' }, { status: 400 })
    }

    const cycle = await prisma.learningCycle.findUnique({ where: { id: learningCycleId }, select: { status: true } })
    if (cycle?.status === 'closed') {
      return NextResponse.json({ error: 'Cannot add loads to a closed cycle' }, { status: 400 })
    }

    const load = await prisma.studyLoad.create({
      data: {
        learningCycleId,
        loadType,
        title,
        status: status ?? 'pending',
        releasedAt: releasedAt ? new Date(releasedAt) : null,
        dueAt: dueAt ? new Date(dueAt) : null,
      },
      include: {
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
      },
    })
    return NextResponse.json(load, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
