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
  const programId = searchParams.get('programId')

  try {
    const axes = await prisma.axis.findMany({
      where: programId ? { programId } : undefined,
      orderBy: [{ programId: 'asc' }, { displayOrder: 'asc' }],
      include: {
        program: { select: { id: true, code: true, name: true } },
        _count: { select: { skills: true } },
      },
    })
    return NextResponse.json(axes)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { programId, code, name, displayOrder, status } = body ?? {}

    if (!programId || !code || !name) {
      return NextResponse.json({ error: 'programId, code, and name are required' }, { status: 400 })
    }

    const axis = await prisma.axis.create({
      data: {
        programId,
        code,
        name,
        displayOrder: displayOrder ?? 0,
        status: status ?? 'active',
      },
      include: {
        program: { select: { id: true, code: true, name: true } },
        _count: { select: { skills: true } },
      },
    })
    return NextResponse.json(axis, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'An axis with this code already exists for this program' }, { status: 409 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
