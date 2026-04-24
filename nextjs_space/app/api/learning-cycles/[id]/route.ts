export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const cycle = await prisma.learningCycle.findUnique({
      where: { id: params.id },
      include: {
        enrollment: {
          select: {
            id: true,
            status: true,
            student: { select: { id: true, firstName: true, lastName: true } },
            program: { select: { id: true, code: true, name: true } },
          },
        },
        cycleDecisions: { orderBy: { createdAt: 'desc' } },
        studyLoads: { orderBy: { createdAt: 'desc' } },
        cycleEvaluations: { orderBy: { createdAt: 'desc' } },
        // Phase DT — include continuity signals so the cycle detail UI can
        // deterministically gate the "Autorizar continuidad" button without
        // a second round trip. Shape matches DL's P4b read: the UI hides
        // the button as soon as a signalType='continue' row exists for
        // this cycle.
        continuitySignals: {
          select: { id: true, signalType: true, rationale: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!cycle) {
      return NextResponse.json({ error: 'Cycle not found' }, { status: 404 })
    }

    return NextResponse.json(cycle)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { status } = body ?? {}

    if (!status) {
      return NextResponse.json({ error: 'status is required' }, { status: 400 })
    }

    // Phase DS — PATCH drift containment. Closing a cycle must emit a closing
    // CycleSnapshot (snapshotType='cycle_close') and advance enrollment
    // activity atomically; those side-effects only live in the dedicated
    // POST /api/learning-cycles/[id]/close endpoint. Any attempt to flip
    // status to 'closed' through this generic PATCH is rejected so the
    // contract artefact cannot be silently bypassed from the list-level
    // inline status select or from an ad-hoc client.
    if (status === 'closed') {
      return NextResponse.json(
        { error: 'Use POST /api/learning-cycles/[id]/close' },
        { status: 409 },
      )
    }

    const data: any = { status }

    const cycle = await prisma.learningCycle.update({
      where: { id: params.id },
      data,
      include: {
        enrollment: {
          select: {
            id: true,
            status: true,
            student: { select: { id: true, firstName: true, lastName: true } },
            program: { select: { id: true, code: true, name: true } },
          },
        },
        _count: { select: { cycleDecisions: true, studyLoads: true, cycleEvaluations: true } },
      },
    })
    return NextResponse.json(cycle)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
