export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

export async function GET() {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const programs = await prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { programInstances: true } } },
    })
    return NextResponse.json(programs)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { code, name, vertical, status } = body ?? {}

    if (!code || !name || !vertical) {
      return NextResponse.json({ error: 'code, name, and vertical are required' }, { status: 400 })
    }

    const program = await prisma.program.create({
      data: { code, name, vertical, status: status ?? 'active' },
    })
    return NextResponse.json(program, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A program with this code already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
