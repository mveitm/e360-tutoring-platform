export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

const enrollmentInclude = {
  enrollment: {
    select: {
      id: true,
      status: true,
      student: { select: { firstName: true, lastName: true } },
      program: { select: { code: true, name: true } },
    },
  },
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const enrollmentId = searchParams.get('enrollmentId')

  try {
    const diagnostics = await prisma.diagnostic.findMany({
      where: enrollmentId ? { enrollmentId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: enrollmentInclude,
    })
    return NextResponse.json(diagnostics)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { enrollmentId, diagnosticType, status, resultSummary, completedAt } = body ?? {}

    if (!enrollmentId) {
      return NextResponse.json({ error: 'enrollmentId is required' }, { status: 400 })
    }

    const enrollment = await prisma.studentProgramInstance.findUnique({ where: { id: enrollmentId } })
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    const diagnostic = await prisma.diagnostic.create({
      data: {
        enrollmentId,
        diagnosticType: diagnosticType || 'initial',
        status: status || 'pending',
        resultSummary: resultSummary || null,
        completedAt: completedAt ? new Date(completedAt) : null,
      },
      include: enrollmentInclude,
    })
    return NextResponse.json(diagnostic, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
