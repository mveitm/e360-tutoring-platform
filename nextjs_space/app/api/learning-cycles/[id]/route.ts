export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const cycle = await prisma.learningCycle.findUnique({
      where: { id: params.id },
      include: {
        enrollment: {
          select: {
            id: true,
            status: true,
            student: { select: { id: true, firstName: true, lastName: true } },
            program: { select: { id: true, code: true, name: true } },
          },
        },
        cycleDecisions: { orderBy: { createdAt: 'desc' } },
        studyLoads: { orderBy: { createdAt: 'desc' } },
        cycleEvaluations: { orderBy: { createdAt: 'desc' } },
      },
    })

    if (!cycle) {
      return NextResponse.json({ error: 'Cycle not found' }, { status: 404 })
    }

    return NextResponse.json(cycle)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { status } = body ?? {}

    if (!status) {
      return NextResponse.json({ error: 'status is required' }, { status: 400 })
    }

    const data: any = { status }
    if (status === 'closed') {
      data.closedAt = new Date()
    }

    const cycle = await prisma.learningCycle.update({
      where: { id: params.id },
      data,
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
    return NextResponse.json(cycle)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
