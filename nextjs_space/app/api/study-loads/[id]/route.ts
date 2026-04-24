export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.studyLoad.findUnique({
      where: { id: params.id },
      include: { learningCycle: { select: { status: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Study load not found' }, { status: 404 })
    if (existing.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot update loads in a closed cycle' }, { status: 400 })
    }

    const body = await req.json()
    const { status } = body ?? {}

    if (!status) {
      return NextResponse.json({ error: 'status is required' }, { status: 400 })
    }

    const load = await prisma.studyLoad.update({
      where: { id: params.id },
      data: { status },
      include: cycleInclude,
    })
    return NextResponse.json(load)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

const CANONICAL_LOAD_TYPES = new Set(['practice', 'reading', 'video', 'project', 'assessment'])

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.studyLoad.findUnique({
      where: { id: params.id },
      include: { learningCycle: { select: { status: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Study load not found' }, { status: 404 })
    if (existing.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot edit loads in a closed cycle' }, { status: 400 })
    }

    const body = await req.json()
    const { title, loadType, releasedAt, dueAt } = body ?? {}

    if (loadType !== undefined && !CANONICAL_LOAD_TYPES.has(loadType)) {
      return NextResponse.json({ error: 'Invalid loadType. Allowed: practice, reading, video, project, assessment' }, { status: 400 })
    }

    const updated = await prisma.studyLoad.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(loadType !== undefined && { loadType }),
        ...(releasedAt !== undefined && { releasedAt: releasedAt ? new Date(releasedAt) : null }),
        ...(dueAt !== undefined && { dueAt: dueAt ? new Date(dueAt) : null }),
      },
      include: cycleInclude,
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.studyLoad.findUnique({
      where: { id: params.id },
      include: { learningCycle: { select: { status: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Study load not found' }, { status: 404 })
    if (existing.learningCycle.status === 'closed') {
      return NextResponse.json({ error: 'Cannot delete loads in a closed cycle' }, { status: 400 })
    }

    await prisma.studyLoad.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
