export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { masteryLevel, confidenceLevel, needsReinforcement, stateSource } = body ?? {}

    const data: any = {}
    if (masteryLevel !== undefined) data.masteryLevel = masteryLevel
    if (confidenceLevel !== undefined) data.confidenceLevel = confidenceLevel
    if (needsReinforcement !== undefined) data.needsReinforcement = needsReinforcement
    if (stateSource !== undefined) data.stateSource = stateSource
    data.lastEvaluatedAt = new Date()

    if (Object.keys(data).length === 1) {
      return NextResponse.json({ error: 'At least one field to update is required' }, { status: 400 })
    }

    const state = await prisma.skillState.update({
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
        skill: {
          select: { id: true, code: true, name: true, axis: { select: { code: true, name: true } } },
        },
      },
    })
    return NextResponse.json(state)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
