export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminEmail } from '@/lib/admin-guard'
import bcrypt from 'bcryptjs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ACCOUNT_EXISTS_MESSAGE = 'Ya existe una cuenta con este correo. Ingresa o solicita ayuda.'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : ''
    const lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body?.password === 'string' ? body.password : ''
    const confirmPassword = typeof body?.confirmPassword === 'string' ? body.confirmPassword : ''

    if (!firstName) {
      return NextResponse.json({ error: 'El nombre es obligatorio.' }, { status: 400 })
    }
    if (!lastName) {
      return NextResponse.json({ error: 'El apellido es obligatorio.' }, { status: 400 })
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Ingresa un correo valido.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'La contrasena debe tener al menos 8 caracteres.' }, { status: 400 })
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Las contrasenas no coinciden.' }, { status: 400 })
    }
    if (isAdminEmail(email)) {
      return NextResponse.json({ error: ACCOUNT_EXISTS_MESSAGE }, { status: 409 })
    }

    const [existingUser, existingStudent] = await Promise.all([
      prisma.user.findUnique({ where: { email }, select: { id: true } }),
      prisma.student.findUnique({ where: { email }, select: { id: true } }),
    ])
    if (existingUser || existingStudent) {
      return NextResponse.json({ error: ACCOUNT_EXISTS_MESSAGE }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const fullName = `${firstName} ${lastName}`.trim()

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password: hashedPassword, name: fullName },
        select: { id: true, email: true },
      })
      const student = await tx.student.create({
        data: { firstName, lastName, email, status: 'active' },
        select: { id: true, email: true },
      })
      return { user, student }
    })

    return NextResponse.json(
      {
        userId: result.user.id,
        studentId: result.student.id,
        email: result.user.email,
        next: '/login',
      },
      { status: 201 },
    )
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: ACCOUNT_EXISTS_MESSAGE }, { status: 409 })
    }
    return NextResponse.json({ error: 'No pudimos crear la cuenta en este momento.' }, { status: 500 })
  }
}
