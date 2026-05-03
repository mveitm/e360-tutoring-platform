export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  const { searchParams } = new URL(req.url)
  const learningCycleId = searchParams.get('learningCycleId')

  try {
    const evaluations = await prisma.cycleEvaluation.findMany({
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
    return NextResponse.json(evaluations)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { learningCycleId, evaluationType, resultSummary } = body ?? {}

    if (!learningCycleId || !evaluationType) {
      return NextResponse.json({ error: 'learningCycleId and evaluationType are required' }, { status: 400 })
    }

    const CANONICAL_EVALUATION_TYPES = new Set(['diagnostic', 'progress_check', 'cycle_close'])
    if (!CANONICAL_EVALUATION_TYPES.has(evaluationType)) {
      return NextResponse.json({ error: 'Invalid evaluationType. Allowed: diagnostic, progress_check, cycle_close' }, { status: 400 })
    }

    const cycle = await prisma.learningCycle.findUnique({ where: { id: learningCycleId }, select: { status: true } })
    if (cycle?.status === 'closed') {
      return NextResponse.json({ error: 'Cannot add evaluations to a closed cycle' }, { status: 400 })
    }

    const evaluation = await prisma.cycleEvaluation.create({
      data: {
        learningCycleId,
        evaluationType,
        resultSummary: resultSummary || null,
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
    return NextResponse.json(evaluation, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
