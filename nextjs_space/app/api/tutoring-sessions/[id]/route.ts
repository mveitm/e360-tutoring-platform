export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

const includeContext = {
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
  studyLoad: {
    select: {
      id: true,
      loadType: true,
      title: true,
      status: true,
    },
  },
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const record = await prisma.tutoringSession.findUnique({
      where: { id: params.id },
      include: includeContext,
    })
    if (!record) return NextResponse.json({ error: 'Tutoring session not found' }, { status: 404 })
    return NextResponse.json(record)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.tutoringSession.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Tutoring session not found' }, { status: 404 })

    const body = await req.json()
    const { sessionType, status, completedAt, notes } = body ?? {}

    const updated = await prisma.tutoringSession.update({
      where: { id: params.id },
      data: {
        ...(sessionType !== undefined && { sessionType }),
        ...(status !== undefined && { status }),
        ...(completedAt !== undefined && { completedAt: completedAt ? new Date(completedAt) : null }),
        ...(notes !== undefined && { notes: notes || null }),
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
    const existing = await prisma.tutoringSession.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Tutoring session not found' }, { status: 404 })

    await prisma.tutoringSession.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
