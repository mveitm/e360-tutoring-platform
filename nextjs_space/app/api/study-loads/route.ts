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
    const loads = await prisma.studyLoad.findMany({
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
    return NextResponse.json(loads)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

const CANONICAL_LOAD_TYPES = new Set(['practice', 'reading', 'video', 'project', 'assessment'])

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { learningCycleId, loadType, title, status, releasedAt, dueAt } = body ?? {}

    if (!learningCycleId || !loadType || !title) {
      return NextResponse.json({ error: 'learningCycleId, loadType, and title are required' }, { status: 400 })
    }

    // Phase EZ — StudyLoad creation status normalization.
    // New loads must start as 'pending'. Non-pending statuses bypass the
    // protected load → session → response/self-report → evidence chain.
    if (status !== undefined && status !== 'pending') {
      return NextResponse.json(
        { error: 'Study loads must be created as pending. Use POST /api/study-loads/[id]/start or POST /api/study-loads/[id]/complete for status transitions.' },
        { status: 400 },
      )
    }

    if (!CANONICAL_LOAD_TYPES.has(loadType)) {
      return NextResponse.json({ error: 'Invalid loadType. Allowed: practice, reading, video, project, assessment' }, { status: 400 })
    }

    const cycle = await prisma.learningCycle.findUnique({ where: { id: learningCycleId }, select: { status: true } })
    if (cycle?.status === 'closed') {
      return NextResponse.json({ error: 'Cannot add loads to a closed cycle' }, { status: 400 })
    }

    const load = await prisma.studyLoad.create({
      data: {
        learningCycleId,
        loadType,
        title,
        status: 'pending',
        releasedAt: releasedAt ? new Date(releasedAt) : null,
        dueAt: dueAt ? new Date(dueAt) : null,
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
    return NextResponse.json(load, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
