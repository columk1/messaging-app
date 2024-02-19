import prisma from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const getSession = async () => await getServerSession(authOptions)

// ? Does this need to query the db? If so, do all calls to this need the full user from the db?
const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })
    return currentUser ?? null
  } catch (error) {
    return null
  }
}

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

export { getSession, getCurrentUser, getUsers, getConversations }
