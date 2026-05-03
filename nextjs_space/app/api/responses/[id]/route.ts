export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

const includeContext = {
  tutoringSession: {
    select: {
      id: true,
      sessionType: true,
      status: true,
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
    },
  },
  skill: {
    select: {
      id: true,
      code: true,
      name: true,
      axis: { select: { code: true, name: true } },
    },
  },
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const record = await prisma.response.findUnique({
      where: { id: params.id },
      include: includeContext,
    })
    if (!record) return NextResponse.json({ error: 'Response not found' }, { status: 404 })
    return NextResponse.json(record)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.response.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Response not found' }, { status: 404 })

    const body = await req.json()
    const { responseType, content, isCorrect, score, feedback } = body ?? {}

    const updated = await prisma.response.update({
      where: { id: params.id },
      data: {
        ...(responseType !== undefined && { responseType }),
        ...(content !== undefined && { content: content || null }),
        ...(isCorrect !== undefined && { isCorrect: isCorrect ?? null }),
        ...(score !== undefined && { score: score ?? null }),
        ...(feedback !== undefined && { feedback: feedback || null }),
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
    const existing = await prisma.response.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Response not found' }, { status: 404 })

    await prisma.response.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
