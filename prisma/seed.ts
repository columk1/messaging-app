import prisma from '@/app/lib/prisma'
import { users } from '@/app/lib/placeholder-data'
import bcrypt from 'bcryptjs'

async function main() {
  // Insert data into the "users" table
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          name: user.name,
          email: user.email,
          username: user.username,
          password: hashedPassword,
          createdAt: new Date(),
        },
      })
    })
  )

  console.log(`Seeded ${insertedUsers.length} users`)
  console.log(insertedUsers[0])
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
