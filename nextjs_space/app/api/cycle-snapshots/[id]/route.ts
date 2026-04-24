export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

const cycleInclude = {
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
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const snapshot = await prisma.cycleSnapshot.findUnique({
      where: { id: params.id },
      include: cycleInclude,
    })
    if (!snapshot) return NextResponse.json({ error: 'Cycle snapshot not found' }, { status: 404 })
    return NextResponse.json(snapshot)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.cycleSnapshot.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Cycle snapshot not found' }, { status: 404 })

    const body = await req.json()
    const { snapshotType, payload, takenAt } = body ?? {}

    const updated = await prisma.cycleSnapshot.update({
      where: { id: params.id },
      data: {
        ...(snapshotType !== undefined && { snapshotType }),
        ...(payload !== undefined && { payload: payload ?? null }),
        ...(takenAt !== undefined && { takenAt: takenAt ? new Date(takenAt) : undefined }),
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
    const existing = await prisma.cycleSnapshot.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Cycle snapshot not found' }, { status: 404 })

    await prisma.cycleSnapshot.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
