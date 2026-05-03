export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

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

const CANONICAL_DECISION_TYPES = new Set(['advance', 'reinforce', 'hold', 'redirect'])

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.cycleDecision.findUnique({
      where: { id: params.id },
      include: { learningCycle: { select: { status: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Decision not found' }, { status: 404 })
    if (existing.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot edit decisions in a closed cycle' }, { status: 400 })
    }

    const body = await req.json()
    const { decisionType, rationale } = body ?? {}

    if (decisionType !== undefined && !CANONICAL_DECISION_TYPES.has(decisionType)) {
      return NextResponse.json({ error: 'Invalid decisionType. Allowed: advance, reinforce, hold, redirect' }, { status: 400 })
    }

    const updated = await prisma.cycleDecision.update({
      where: { id: params.id },
      data: {
        ...(decisionType !== undefined && { decisionType }),
        ...(rationale !== undefined && { rationale: rationale || null }),
      },
      include: cycleInclude,
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
    const existing = await prisma.cycleDecision.findUnique({
      where: { id: params.id },
      include: { learningCycle: { select: { status: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Decision not found' }, { status: 404 })
    if (existing.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot delete decisions in a closed cycle' }, { status: 400 })
    }

    await prisma.cycleDecision.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
