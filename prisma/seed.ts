import prisma from '@/app/lib/prisma'
import { users, conversations } from '@/app/lib/placeholder-data'
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
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          password: hashedPassword,
          image: user.image,
          createdAt: new Date(),
        },
      })
    })
  )

  // Connect contacts to demo account now that all users exist
  await prisma.user.update({
    where: {
      id: users[0].id,
    },
    data: {
      contacts: {
        connect: users[0].contacts?.map((contact) => ({ id: contact })),
      },
    },
  })

  const insertedConversations = await Promise.all(
    conversations.map(async (conversation) => {
      const insertedConversation = await prisma.conversation.create({
        data: {
          name: conversation.name || null,
          isGroup: conversation.isGroup || null,
          users: {
            connect: conversation.userIds.map((userId) => ({ id: userId })),
          },
          userIds: conversation.userIds,
          createdAt: new Date(),
        },
      })
      for (const message of conversation.messages) {
        const newMessage = await prisma.message.create({
          data: {
            body: message.body,
            image: message.image,
            sender: { connect: { id: message.senderId } },
            conversation: { connect: { id: insertedConversation.id } },
            createdAt: new Date(),
          },
        })
        if (message.seenId) {
          console.log('seenId', message.seenId)
          await prisma.message.update({
            where: { id: newMessage.id },
            data: {
              seen: { connect: { id: message.seenId } },
            },
          })
        }
      }
    })
  )

  console.log(`Seeded ${insertedUsers.length} users`)
  console.log(insertedUsers[0])
  console.log(`Seeded ${insertedConversations.length} conversations`)
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
