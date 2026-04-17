export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

const cycleInclude = {
  learningCycle: {
    select: {
      id: true, cycleNumber: true, status: true,
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.cycleEvaluation.findUnique({
      where: { id: params.id },
      include: { learningCycle: { select: { status: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Evaluation not found' }, { status: 404 })
    if (existing.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot edit evaluations in a closed cycle' }, { status: 400 })
    }

    const body = await req.json()
    const { evaluationType, resultSummary } = body ?? {}

    const updated = await prisma.cycleEvaluation.update({
      where: { id: params.id },
      data: {
        ...(evaluationType !== undefined && { evaluationType }),
        ...(resultSummary !== undefined && { resultSummary: resultSummary || null }),
      },
      include: cycleInclude,
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
    const existing = await prisma.cycleEvaluation.findUnique({
      where: { id: params.id },
      include: { learningCycle: { select: { status: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Evaluation not found' }, { status: 404 })
    if (existing.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot delete evaluations in a closed cycle' }, { status: 400 })
    }

    await prisma.cycleEvaluation.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
