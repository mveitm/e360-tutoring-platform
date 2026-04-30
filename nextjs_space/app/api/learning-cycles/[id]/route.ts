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
        studyLoads: {
          orderBy: { createdAt: 'desc' },
          include: {
            // Phase FJ — include tutoring sessions and their responses so
            // the cycle detail page can display self-report / evidence
            // inline with each study load. This is the data the admin
            // reviews before recording a manual pedagogical decision.
            tutoringSessions: {
              orderBy: { createdAt: 'desc' },
              select: {
                id: true,
                status: true,
                startedAt: true,
                completedAt: true,
                responses: {
                  orderBy: { updatedAt: 'desc' },
                  select: {
                    id: true,
                    responseType: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                  },
                },
              },
            },
          },
        },
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

// Phase EV — Full PATCH status mutation hardening. After Phase EU removed
// all UI consumers of this endpoint, there are zero legitimate callers.
// Every valid lifecycle transition uses a dedicated atomic endpoint:
//   - open → closed : POST /api/learning-cycles/[id]/close  (Phase DS)
//   - closed → continue : POST /api/learning-cycles/[id]/continue (Phase DT)
// Generic status mutation through PATCH is unconditionally rejected to
// close the backend drift vector against ad-hoc HTTP requests.
export async function PATCH(_req: NextRequest, { params: _params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  return NextResponse.json(
    {
      error:
        'Cycle status mutations are not allowed via PATCH. ' +
        'Use POST /api/learning-cycles/[id]/close or ' +
        'POST /api/learning-cycles/[id]/continue.',
    },
    { status: 405 },
  )
}
