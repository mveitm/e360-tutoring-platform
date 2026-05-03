export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

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

export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  const { searchParams } = new URL(req.url)
  const enrollmentId = searchParams.get('enrollmentId')
  const learningCycleId = searchParams.get('learningCycleId')

  const where: Record<string, string> = {}
  if (enrollmentId) where.enrollmentId = enrollmentId
  if (learningCycleId) where.learningCycleId = learningCycleId

  try {
    const signals = await prisma.continuitySignal.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { createdAt: 'desc' },
      include: includeContext,
    })
    return NextResponse.json(signals)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { enrollmentId, learningCycleId, evaluationId, signalType, rationale } = body ?? {}

    if (!enrollmentId) {
      return NextResponse.json({ error: 'enrollmentId is required' }, { status: 400 })
    }
    if (!signalType) {
      return NextResponse.json({ error: 'signalType is required' }, { status: 400 })
    }

    // Verify enrollment exists
    const enrollment = await prisma.studentProgramInstance.findUnique({ where: { id: enrollmentId } })
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // If learningCycleId provided, verify it exists
    if (learningCycleId) {
      const cycle = await prisma.learningCycle.findUnique({ where: { id: learningCycleId } })
      if (!cycle) {
        return NextResponse.json({ error: 'Learning cycle not found' }, { status: 404 })
      }
    }

    // If evaluationId provided, verify it exists
    if (evaluationId) {
      const evaluation = await prisma.cycleEvaluation.findUnique({ where: { id: evaluationId } })
      if (!evaluation) {
        return NextResponse.json({ error: 'Cycle evaluation not found' }, { status: 404 })
      }
    }

    const record = await prisma.continuitySignal.create({
      data: {
        enrollmentId,
        learningCycleId: learningCycleId || null,
        evaluationId: evaluationId || null,
        signalType,
        rationale: rationale || null,
      },
      include: includeContext,
    })
    return NextResponse.json(record, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
