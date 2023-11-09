const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin', 10)
  const admin = await prisma.users.upsert({
    where: { email: 'admin' },
    update: {},
    create: {
      email: 'admin',
      password: hashedPassword,
      firstLogin: false,
      role: 'admin',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
