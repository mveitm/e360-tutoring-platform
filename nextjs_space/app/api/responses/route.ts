export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

const includeContext = {
  tutoringSession: {
    select: {
      id: true,
      sessionType: true,
      status: true,
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
  const tutoringSessionId = searchParams.get('tutoringSessionId')
  const skillId = searchParams.get('skillId')

  const where: Record<string, string> = {}
  if (tutoringSessionId) where.tutoringSessionId = tutoringSessionId
  if (skillId) where.skillId = skillId

  try {
    const responses = await prisma.response.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { createdAt: 'desc' },
      include: includeContext,
    })
    return NextResponse.json(responses)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { tutoringSessionId, skillId, responseType, content, isCorrect, score, feedback } = body ?? {}

    if (!tutoringSessionId) {
      return NextResponse.json({ error: 'tutoringSessionId is required' }, { status: 400 })
    }

    // Verify tutoring session exists
    const tutoringSessionRecord = await prisma.tutoringSession.findUnique({ where: { id: tutoringSessionId } })
    if (!tutoringSessionRecord) {
      return NextResponse.json({ error: 'Tutoring session not found' }, { status: 404 })
    }

    // If skillId provided, verify it exists
    if (skillId) {
      const skill = await prisma.skill.findUnique({ where: { id: skillId } })
      if (!skill) {
        return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
      }
    }

    const record = await prisma.response.create({
      data: {
        tutoringSessionId,
        skillId: skillId || null,
        responseType: responseType || 'answer',
        content: content || null,
        isCorrect: isCorrect ?? null,
        score: score ?? null,
        feedback: feedback || null,
      },
      include: includeContext,
    })
    return NextResponse.json(record, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
