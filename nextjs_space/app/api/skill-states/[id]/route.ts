export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

const ALLOWED_MASTERY_LEVELS = ['not_evaluated', 'developing', 'mastered'] as const
const ALLOWED_CONFIDENCE_LEVELS = ['none', 'low', 'medium', 'high'] as const
const ALLOWED_STATE_SOURCES = ['manual', 'diagnostic', 'evaluation'] as const

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { masteryLevel, confidenceLevel, needsReinforcement, stateSource } = body ?? {}

    // --- FB: Value validation for enum-like fields (before any DB interaction) ---
    if (masteryLevel !== undefined && !ALLOWED_MASTERY_LEVELS.includes(masteryLevel)) {
      return NextResponse.json({ error: `Invalid masteryLevel: "${masteryLevel}". Allowed values: ${ALLOWED_MASTERY_LEVELS.join(', ')}` }, { status: 400 })
    }
    if (confidenceLevel !== undefined && !ALLOWED_CONFIDENCE_LEVELS.includes(confidenceLevel)) {
      return NextResponse.json({ error: `Invalid confidenceLevel: "${confidenceLevel}". Allowed values: ${ALLOWED_CONFIDENCE_LEVELS.join(', ')}` }, { status: 400 })
    }
    if (stateSource !== undefined && !ALLOWED_STATE_SOURCES.includes(stateSource)) {
      return NextResponse.json({ error: `Invalid stateSource: "${stateSource}". Allowed values: ${ALLOWED_STATE_SOURCES.join(', ')}` }, { status: 400 })
    }
    if (needsReinforcement !== undefined && typeof needsReinforcement !== 'boolean') {
      return NextResponse.json({ error: 'needsReinforcement must be a boolean (true or false)' }, { status: 400 })
    }

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
