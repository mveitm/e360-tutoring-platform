import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Seed admin user
  const hashedPassword = await bcrypt.hash('johndoe123', 10)
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'Admin',
      password: hashedPassword,
    },
  })

  // Seed programs
  const programs = [
    { code: 'PAES_L1', name: 'PAES Competencia Lectora', vertical: 'PAES', status: 'active' },
    { code: 'PAES_M1', name: 'PAES Matemática M1', vertical: 'PAES', status: 'active' },
    { code: 'PAES_M2', name: 'PAES Matemática M2', vertical: 'PAES', status: 'active' },
  ]

  for (const program of programs) {
    await prisma.program.upsert({
      where: { code: program.code },
      update: { name: program.name, vertical: program.vertical, status: program.status },
      create: program,
    })
  }

  // Seed axes and skills for PAES_M1
  const paesM1 = await prisma.program.findUnique({ where: { code: 'PAES_M1' } })
  if (paesM1) {
    const axesData = [
      { code: 'ALG', name: 'Álgebra', displayOrder: 1 },
      { code: 'GEO', name: 'Geometría', displayOrder: 2 },
      { code: 'DAT', name: 'Datos y probabilidad', displayOrder: 3 },
    ]

    for (const ax of axesData) {
      await prisma.axis.upsert({
        where: { programId_code: { programId: paesM1.id, code: ax.code } },
        update: { name: ax.name, displayOrder: ax.displayOrder },
        create: { programId: paesM1.id, code: ax.code, name: ax.name, displayOrder: ax.displayOrder, status: 'active' },
      })
    }

    const algAxis = await prisma.axis.findUnique({ where: { programId_code: { programId: paesM1.id, code: 'ALG' } } })
    const geoAxis = await prisma.axis.findUnique({ where: { programId_code: { programId: paesM1.id, code: 'GEO' } } })
    const datAxis = await prisma.axis.findUnique({ where: { programId_code: { programId: paesM1.id, code: 'DAT' } } })

    const skillsData = [
      { code: 'ALG_LINEAR', name: 'Resolver problemas de ecuaciones lineales', axisId: algAxis!.id, displayOrder: 1 },
      { code: 'ALG_FUNC', name: 'Interpretar funciones y relaciones', axisId: algAxis!.id, displayOrder: 2 },
      { code: 'GEO_ANGLE', name: 'Resolver problemas de ángulos y figuras', axisId: geoAxis!.id, displayOrder: 1 },
      { code: 'DAT_TABLE', name: 'Interpretar tablas y datos', axisId: datAxis!.id, displayOrder: 1 },
    ]

    for (const sk of skillsData) {
      await prisma.skill.upsert({
        where: { programId_code: { programId: paesM1.id, code: sk.code } },
        update: { name: sk.name, axisId: sk.axisId, displayOrder: sk.displayOrder },
        create: { programId: paesM1.id, axisId: sk.axisId, code: sk.code, name: sk.name, displayOrder: sk.displayOrder, status: 'active' },
      })
    }
  }

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
