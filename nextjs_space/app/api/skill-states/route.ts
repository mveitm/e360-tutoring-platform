export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { enrollmentId, skillId, masteryLevel, confidenceLevel, needsReinforcement, stateSource } = body ?? {}

    if (!enrollmentId || !skillId) {
      return NextResponse.json({ error: 'enrollmentId and skillId are required' }, { status: 400 })
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
