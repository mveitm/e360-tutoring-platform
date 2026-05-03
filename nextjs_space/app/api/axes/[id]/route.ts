export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.axis.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Axis not found' }, { status: 404 })

    const body = await req.json()
    const { code, name, displayOrder, status } = body ?? {}

    const updated = await prisma.axis.update({
      where: { id: params.id },
      data: {
        ...(code !== undefined && { code }),
        ...(name !== undefined && { name }),
        ...(displayOrder !== undefined && { displayOrder: parseInt(displayOrder) || 0 }),
        ...(status !== undefined && { status }),
      },
      include: {
        program: { select: { id: true, code: true, name: true } },
        _count: { select: { skills: true } },
      },
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'An axis with this code already exists for this program' }, { status: 409 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.axis.findUnique({
      where: { id: params.id },
      include: { _count: { select: { skills: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Axis not found' }, { status: 404 })

    if (existing._count.skills > 0) {
      return NextResponse.json(
        { error: `Cannot delete axis with ${existing._count.skills} skill(s). Remove skills first.` },
        { status: 400 }
      )
    }

    await prisma.axis.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
