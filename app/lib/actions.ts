import prisma from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/lib/auth'

const getSession = async () => await getServerSession(authOptions)

const getCurrentUser = async () => {
  try {
    const session = await getSession()
    console.log(session)

    if (!session?.user?.email) return null

    // Use the server session if it contains the extended id property
    if (session?.user?.id) return session.user

    // Unlikely to reach here
    return null
    // const currentUser = await prisma.user.findUnique({
    //   where: {
    //     email: session.user.email as string,
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     image: true,
    //   },
    // })
    // return currentUser ?? null
  } catch (error) {
    return null
  }
}

// Returns an array of all users except current user
const getUsers = async () => {
  const session = await getSession()

  if (!session?.user?.email) return []

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })
    return users
  } catch (error) {
    return []
  }
}

const getConversations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) return []

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: { sender: true, seen: true },
        },
      },
    })
    return conversations
  } catch (error) {
    console.log(error)
    return []
  }
}

const getConversationById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return null

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: +id,
      },
      include: {
        users: true,
      },
      // TODO: Possibly include messages here instead of using a separate query
    })
    return conversation
  } catch (error) {
    console.log(error)
    return null
  }
}

const getMessages = async (id: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: +id,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return messages
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getSession, getCurrentUser, getUsers, getConversations, getConversationById, getMessages }
