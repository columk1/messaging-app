'use server'

import prisma from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'

const getSession = async () => await getServerSession(authOptions)

const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    // Use the server session if it contains the extended id property
    if (session?.user?.id) return session.user

    // Unlikely to reach here
    return null
  } catch (error) {
    return null
  }
}

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      },
    })

    return user
  } catch {
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
        username: true,
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
        users: { select: { id: true, name: true, username: true, image: true, createdAt: true } },
        messages: {
          orderBy: {
            id: 'asc',
          },
          include: {
            sender: { select: { name: true, username: true, image: true } },
            seen: { select: { username: true } },
          },
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
        userIds: {
          hasSome: [currentUser.id],
        },
      },
      include: {
        users: { select: { id: true, name: true, username: true, image: true, createdAt: true } },
        messages: {
          orderBy: {
            id: 'asc',
          },
          include: {
            sender: { select: { name: true, username: true, image: true } },
            seen: { select: { username: true } },
          },
        },
      },
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
        sender: { select: { name: true, username: true, image: true } },
        seen: { select: { username: true } },
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

const getContacts = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return null

    const contacts = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      select: {
        contacts: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    })

    // Return the contacts directly, if the above assumption is correct
    return contacts ? contacts.contacts : null
  } catch (error) {
    console.log(error)
    return null
  }
}

const addContact = async (currentUserId: string, id: string) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return null

    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        contacts: {
          connect: {
            id: id,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

const removeContact = async (currentUserId: string, id: string) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return null

    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        contacts: {
          disconnect: {
            id: id,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export {
  getSession,
  getCurrentUser,
  getUserByEmail,
  getUsers,
  getConversations,
  getConversationById,
  getMessages,
  getContacts,
  addContact,
  removeContact,
}
