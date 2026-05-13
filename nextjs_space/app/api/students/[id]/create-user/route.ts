export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'
import { recordAuditEvent } from '@/lib/audit'
import bcrypt from 'bcryptjs'

/**
 * MVP-FLOW-4-E5D: Admin-mediated student account creation.
 *
 * POST /api/students/[id]/create-user
 *
 * Creates a missing User account for an existing Student email.
 * Admin-only. Never returns password or hash.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { password, confirmPassword } = body ?? {}

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'La contraseña es obligatoria.' },
        { status: 400 },
      )
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres.' },
        { status: 400 },
      )
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Las contraseñas no coinciden.' },
        { status: 400 },
      )
    }

    const student = await prisma.student.findUnique({
      where: { id: params.id },
      select: { id: true, firstName: true, lastName: true, email: true },
    })
    if (!student) {
      return NextResponse.json(
        { error: 'Estudiante no encontrado.' },
        { status: 404 },
      )
    }
    if (!student.email?.trim()) {
      return NextResponse.json(
        { error: 'El estudiante no tiene email registrado.' },
        { status: 400 },
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: student.email },
      select: { id: true },
    })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe una cuenta de usuario asociada a este estudiante.' },
        { status: 409 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const name = `${student.firstName} ${student.lastName}`.trim()
    const user = await prisma.user.create({
      data: {
        email: student.email,
        name,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true },
    })

    recordAuditEvent({
      actorType: 'admin',
      actorId: session.user?.id ?? 'unknown',
      actorEmail: session.user?.email ?? null,
      actionType: 'STUDENT_USER_CREATE',
      domain: 'auth',
      entityType: 'User',
      entityId: user.id,
      endpoint: `/api/students/${params.id}/create-user`,
      method: 'POST',
      beforePayload: null,
      afterPayload: { userCreated: true, studentId: student.id },
    }).catch((err) =>
      console.error('[audit] Failed to record STUDENT_USER_CREATE event:', err),
    )

    return NextResponse.json({ success: true, user }, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe una cuenta de usuario asociada a este estudiante.' },
        { status: 409 },
      )
    }
    console.error('[create-user] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 },
    )
  }
}
