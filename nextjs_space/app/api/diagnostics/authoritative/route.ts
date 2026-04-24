export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import {
  DEFAULT_DIAGNOSTIC_TYPE,
  resolveAuthoritativeDiagnosticAttempt,
} from '@/lib/diagnostics/authoritative'

/**
 * Phase DV — GET /api/diagnostics/authoritative
 *
 * Pure read endpoint. No side effects. No interpretation.
 * Returns which Diagnostic attempt is authoritative for TACTICAL
 * CONTINUITY-START SELECTION ONLY, or explicitly null when no valid
 * attempt exists.
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

    const result = await resolveAuthoritativeDiagnosticAttempt(prisma, {
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
