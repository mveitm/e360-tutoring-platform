export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const program = await prisma.program.findUnique({
      where: { id: params.id },
      include: {
        axes: {
          orderBy: { displayOrder: 'asc' },
          include: { _count: { select: { skills: true } } },
        },
        skills: {
          orderBy: { displayOrder: 'asc' },
          include: { axis: { select: { id: true, code: true, name: true } } },
        },
        programInstances: {
          orderBy: { createdAt: 'desc' },
          include: {
            student: { select: { id: true, firstName: true, lastName: true } },
            _count: { select: { learningCycles: true } },
          },
        },
      },
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    return NextResponse.json(program)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.program.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Program not found' }, { status: 404 })

    const body = await req.json()
    const { code, name, vertical, status } = body ?? {}

    const updated = await prisma.program.update({
      where: { id: params.id },
      data: {
        ...(code !== undefined && { code }),
        ...(name !== undefined && { name }),
        ...(vertical !== undefined && { vertical }),
        ...(status !== undefined && { status }),
      },
      include: {
        _count: { select: { programInstances: true } },
      },
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A program with this code already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.program.findUnique({
      where: { id: params.id },
      include: { _count: { select: { programInstances: true, axes: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Program not found' }, { status: 404 })

    if (existing._count.programInstances > 0) {
      return NextResponse.json(
        { error: `Cannot delete program with ${existing._count.programInstances} enrollment(s). Remove enrollments first.` },
        { status: 400 }
      )
    }

    if (existing._count.axes > 0) {
      return NextResponse.json(
        { error: `Cannot delete program with ${existing._count.axes} axis/axes. Remove axes first.` },
        { status: 400 }
      )
    }

    await prisma.program.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
