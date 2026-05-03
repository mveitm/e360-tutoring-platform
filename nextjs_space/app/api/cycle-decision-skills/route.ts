export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

const includeContext = {
  cycleDecision: {
    select: {
      id: true,
      decisionType: true,
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
  },
  skill: {
    select: {
      id: true,
      code: true,
      name: true,
      axis: { select: { code: true, name: true } },
    },
  },
}

export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  const { searchParams } = new URL(req.url)
  const cycleDecisionId = searchParams.get('cycleDecisionId')

  try {
    const records = await prisma.cycleDecisionSkill.findMany({
      where: cycleDecisionId ? { cycleDecisionId } : undefined,
      orderBy: { priority: 'asc' },
      include: includeContext,
    })
    return NextResponse.json(records)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { cycleDecisionId, skillId, priority, reason } = body ?? {}

    if (!cycleDecisionId) {
      return NextResponse.json({ error: 'cycleDecisionId is required' }, { status: 400 })
    }
    if (!skillId) {
      return NextResponse.json({ error: 'skillId is required' }, { status: 400 })
    }

    // Verify decision exists and check closed-cycle guard
    const decision = await prisma.cycleDecision.findUnique({
      where: { id: cycleDecisionId },
      include: { learningCycle: { select: { status: true } } },
    })
    if (!decision) {
      return NextResponse.json({ error: 'Cycle decision not found' }, { status: 404 })
    }
    if (decision.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot add skills to a decision in a closed cycle' }, { status: 400 })
    }

    // Verify skill exists
    const skill = await prisma.skill.findUnique({ where: { id: skillId } })
    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }

    const record = await prisma.cycleDecisionSkill.create({
      data: {
        cycleDecisionId,
        skillId,
        priority: priority ?? 0,
        reason: reason || null,
      },
      include: includeContext,
    })
    return NextResponse.json(record, { status: 201 })
  } catch (error: any) {
    // Handle unique constraint violation
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'This skill is already assigned to this decision' }, { status: 400 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
