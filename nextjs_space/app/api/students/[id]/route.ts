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
    const student = await prisma.student.findUnique({
      where: { id: params.id },
      include: {
        programInstances: {
          orderBy: { createdAt: 'desc' },
          include: {
            program: { select: { id: true, code: true, name: true } },
            _count: { select: { learningCycles: true } },
          },
        },
      },
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: { email: student.email },
      select: { id: true, email: true },
    })

    return NextResponse.json({
      ...student,
      hasUserAccount: user !== null,
      userAccountEmail: user?.email ?? null,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.student.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Student not found' }, { status: 404 })

    const body = await req.json()
    const { firstName, lastName, email, status } = body ?? {}

    const updated = await prisma.student.update({
      where: { id: params.id },
      data: {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(email !== undefined && { email }),
        ...(status !== undefined && { status }),
      },
      include: { _count: { select: { programInstances: true } } },
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A student with this email already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.student.findUnique({
      where: { id: params.id },
      include: { _count: { select: { programInstances: true } } },
    })
    if (!existing) return NextResponse.json({ error: 'Student not found' }, { status: 404 })

    if (existing._count.programInstances > 0) {
      return NextResponse.json(
        { error: `Cannot delete student with ${existing._count.programInstances} enrollment(s). Remove enrollments first.` },
        { status: 400 }
      )
    }

    await prisma.student.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
