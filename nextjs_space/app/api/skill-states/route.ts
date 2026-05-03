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
  const enrollmentId = searchParams.get('enrollmentId')

  try {
    const states = await prisma.skillState.findMany({
      where: enrollmentId ? { enrollmentId } : undefined,
      orderBy: { createdAt: 'desc' },
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
    return NextResponse.json(states)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

const ALLOWED_MASTERY_LEVELS = ['not_evaluated', 'developing', 'mastered'] as const
const ALLOWED_CONFIDENCE_LEVELS = ['none', 'low', 'medium', 'high'] as const
const ALLOWED_STATE_SOURCES = ['manual', 'diagnostic', 'evaluation'] as const

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { enrollmentId, skillId, masteryLevel, confidenceLevel, needsReinforcement, stateSource } = body ?? {}

    if (!enrollmentId || !skillId) {
      return NextResponse.json({ error: 'enrollmentId and skillId are required' }, { status: 400 })
    }

    // --- FB: Value validation for enum-like fields ---
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

    const state = await prisma.skillState.create({
      data: {
        enrollmentId,
        skillId,
        masteryLevel: masteryLevel ?? 'not_evaluated',
        confidenceLevel: confidenceLevel ?? 'none',
        needsReinforcement: needsReinforcement ?? false,
        stateSource: stateSource ?? 'manual',
      },
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
    return NextResponse.json(state, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A skill state already exists for this enrollment and skill' }, { status: 409 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
