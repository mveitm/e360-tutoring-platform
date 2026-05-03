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
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { programInstances: true } } },
    })
    return NextResponse.json(students)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { firstName, lastName, email, status } = body ?? {}

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'firstName, lastName, and email are required' }, { status: 400 })
    }

    const student = await prisma.student.create({
      data: { firstName, lastName, email, status: status ?? 'active' },
    })
    return NextResponse.json(student, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A student with this email already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
