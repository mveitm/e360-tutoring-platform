export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const enrollmentId = searchParams.get('enrollmentId')

  try {
    const cycles = await prisma.learningCycle.findMany({
      where: enrollmentId ? { enrollmentId } : undefined,
      orderBy: [{ enrollmentId: 'asc' }, { cycleNumber: 'asc' }],
      include: {
        enrollment: {
          select: {
            id: true,
            status: true,
            student: { select: { id: true, firstName: true, lastName: true } },
            program: { select: { id: true, code: true, name: true } },
          },
        },
        _count: { select: { cycleDecisions: true, studyLoads: true, cycleEvaluations: true } },
      },
    })
    return NextResponse.json(cycles)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { enrollmentId, status, openedAt } = body ?? {}

    if (!enrollmentId) {
      return NextResponse.json({ error: 'enrollmentId is required' }, { status: 400 })
    }

    const lastCycle = await prisma.learningCycle.findFirst({
      where: { enrollmentId },
      orderBy: { cycleNumber: 'desc' },
      select: { cycleNumber: true },
    })
    const nextCycleNumber = (lastCycle?.cycleNumber ?? 0) + 1

    const cycle = await prisma.learningCycle.create({
      data: {
        enrollmentId,
        cycleNumber: nextCycleNumber,
        status: status ?? 'open',
        openedAt: openedAt ? new Date(openedAt) : undefined,
      },
      include: {
        enrollment: {
          select: {
            id: true,
            status: true,
            student: { select: { id: true, firstName: true, lastName: true } },
            program: { select: { id: true, code: true, name: true } },
          },
        },
        _count: { select: { cycleDecisions: true, studyLoads: true, cycleEvaluations: true } },
      },
    })
    return NextResponse.json(cycle, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'This cycle number already exists for this enrollment' }, { status: 409 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
