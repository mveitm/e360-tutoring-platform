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
      },
    })
    return NextResponse.json(instances)
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
