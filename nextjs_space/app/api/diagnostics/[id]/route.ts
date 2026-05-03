export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

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

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const diagnostic = await prisma.diagnostic.findUnique({
      where: { id: params.id },
      include: enrollmentInclude,
    })
    if (!diagnostic) return NextResponse.json({ error: 'Diagnostic not found' }, { status: 404 })
    return NextResponse.json(diagnostic)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const existing = await prisma.diagnostic.findUnique({
      where: { id: params.id },
      select: { id: true, enrollmentId: true, diagnosticType: true, status: true },
    })
    if (!existing) return NextResponse.json({ error: 'Diagnostic not found' }, { status: 404 })

    const body = await req.json()
    const { diagnosticType, status, resultSummary, completedAt } = body ?? {}

    // --- Detect real transition: pending → completed on an initial diagnostic ---
    const isInitialCompletion =
      existing.diagnosticType === 'initial' &&
      existing.status !== 'completed' &&
      status === 'completed'

    if (isInitialCompletion) {
      // --- SE-1: SkillState initialization + SE-9: lastActivityAt (within transaction) ---
      const enrollment = await prisma.studentProgramInstance.findUnique({
        where: { id: existing.enrollmentId },
        select: { id: true, programId: true },
      })
      if (!enrollment) {
        return NextResponse.json({ error: 'Enrollment not found for this diagnostic' }, { status: 404 })
      }

      const activeSkills = await prisma.skill.findMany({
        where: { programId: enrollment.programId, status: 'active' },
        select: { id: true },
      })

      const now = new Date()

      const updated = await prisma.$transaction(async (tx: any) => {
        // 1. Update the diagnostic
        const diag = await tx.diagnostic.update({
          where: { id: params.id },
          data: {
            ...(diagnosticType !== undefined && { diagnosticType }),
            status: 'completed',
            ...(resultSummary !== undefined && { resultSummary: resultSummary || null }),
            completedAt: completedAt ? new Date(completedAt) : now,
          },
          include: enrollmentInclude,
        })

        // 2. SE-1: Create SkillState for each active skill (skip duplicates)
        if (activeSkills.length > 0) {
          await tx.skillState.createMany({
            data: activeSkills.map((skill: any) => ({
              enrollmentId: existing.enrollmentId,
              skillId: skill.id,
              masteryLevel: 'not_evaluated',
              confidenceLevel: 'none',
              needsReinforcement: false,
              stateSource: 'diagnostic',
              lastEvaluatedAt: now,
            })),
            skipDuplicates: true,
          })
        }

        // 3. SE-9: Update lastActivityAt on enrollment
        await tx.studentProgramInstance.update({
          where: { id: existing.enrollmentId },
          data: { lastActivityAt: now },
        })

        return diag
      })

      return NextResponse.json(updated)
    }

    // --- Non-transition PATCH: standard field update, no side-effects ---
    const updated = await prisma.diagnostic.update({
      where: { id: params.id },
      data: {
        ...(diagnosticType !== undefined && { diagnosticType }),
        ...(status !== undefined && { status }),
        ...(resultSummary !== undefined && { resultSummary: resultSummary || null }),
        ...(completedAt !== undefined && { completedAt: completedAt ? new Date(completedAt) : null }),
      },
      include: enrollmentInclude,
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
    const existing = await prisma.diagnostic.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Diagnostic not found' }, { status: 404 })

    await prisma.diagnostic.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
