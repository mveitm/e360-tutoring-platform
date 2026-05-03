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

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const record = await prisma.cycleDecisionSkill.findUnique({
      where: { id: params.id },
      include: includeContext,
    })
    if (!record) return NextResponse.json({ error: 'Cycle decision skill not found' }, { status: 404 })
    return NextResponse.json(record)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    // Phase EW — closed-cycle guard: traverse decision → learningCycle to
    // prevent edits to decision-skill evidence after the parent cycle is closed.
    const existing = await prisma.cycleDecisionSkill.findUnique({
      where: { id: params.id },
      include: { cycleDecision: { select: { learningCycle: { select: { status: true } } } } },
    })
    if (!existing) return NextResponse.json({ error: 'Cycle decision skill not found' }, { status: 404 })
    if (existing.cycleDecision.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot edit decision skills in a closed cycle' }, { status: 400 })
    }

    const body = await req.json()
    const { priority, reason } = body ?? {}

    const updated = await prisma.cycleDecisionSkill.update({
      where: { id: params.id },
      data: {
        ...(priority !== undefined && { priority }),
        ...(reason !== undefined && { reason: reason || null }),
      },
      include: includeContext,
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    // Phase EW — closed-cycle guard: same traversal as PATCH above.
    const existing = await prisma.cycleDecisionSkill.findUnique({
      where: { id: params.id },
      include: { cycleDecision: { select: { learningCycle: { select: { status: true } } } } },
    })
    if (!existing) return NextResponse.json({ error: 'Cycle decision skill not found' }, { status: 404 })
    if (existing.cycleDecision.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot delete decision skills in a closed cycle' }, { status: 400 })
    }

    await prisma.cycleDecisionSkill.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
