export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const programId = searchParams.get('programId')
  const axisId = searchParams.get('axisId')

  const where: any = {}
  if (programId) where.programId = programId
  if (axisId) where.axisId = axisId

  try {
    const skills = await prisma.skill.findMany({
      where,
      orderBy: [{ axisId: 'asc' }, { displayOrder: 'asc' }],
      include: {
        program: { select: { id: true, code: true, name: true } },
        axis: { select: { id: true, code: true, name: true } },
      },
    })
    return NextResponse.json(skills)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { programId, axisId, code, name, description, displayOrder, status } = body ?? {}

    if (!programId || !axisId || !code || !name) {
      return NextResponse.json({ error: 'programId, axisId, code, and name are required' }, { status: 400 })
    }

    const skill = await prisma.skill.create({
      data: {
        programId,
        axisId,
        code,
        name,
        description: description || null,
        displayOrder: displayOrder ?? 0,
        status: status ?? 'active',
      },
      include: {
        program: { select: { id: true, code: true, name: true } },
        axis: { select: { id: true, code: true, name: true } },
      },
    })
    return NextResponse.json(skill, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A skill with this code already exists for this program' }, { status: 409 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
