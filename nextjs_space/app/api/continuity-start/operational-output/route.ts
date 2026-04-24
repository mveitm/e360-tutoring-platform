export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { DEFAULT_DIAGNOSTIC_TYPE } from '@/lib/diagnostics/authoritative'
import { resolveContinuityStartMode } from '@/lib/continuity-start/operational-output'

/**
 * Phase DX — GET /api/continuity-start/operational-output
 *
 * Pure read endpoint. No side effects. No content generation.
 *
 * Semantic reminder (see lib/continuity-start/operational-output.ts):
 *   DX operational modes are canonical operational-read outputs only.
 *   They do NOT, by themselves, authorize workflow transitions, mutate
 *   continuity state, emit ContinuitySignal rows, or auto-enable or
 *   auto-block later structural actions. In particular, `provisional`
 *   is a verdict about evidence quality and continuity-readiness, not
 *   about the student's academic ability.
 *
 * Query params:
 *   - enrollmentId   (required)
 *   - diagnosticType (optional, defaults to 'initial')
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const enrollmentId = searchParams.get('enrollmentId')
  const diagnosticType = searchParams.get('diagnosticType') ?? DEFAULT_DIAGNOSTIC_TYPE

  if (!enrollmentId) {
    return NextResponse.json(
      { error: 'enrollmentId is required' },
      { status: 400 }
    )
  }

  try {
    const enrollment = await prisma.studentProgramInstance.findUnique({
      where: { id: enrollmentId },
      select: { id: true },
    })
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    const result = await resolveContinuityStartMode(prisma, {
      enrollmentId,
      diagnosticType,
    })
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Internal error' },
      { status: 500 }
    )
  }
}
