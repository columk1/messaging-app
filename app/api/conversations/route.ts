import { getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { pusherServer } from '@/app/lib/pusher'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    // console.log('Body: ', body)
    const { userId, isGroup, members, name } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (isGroup && (!members || members.length < 1 || !name)) {
      return new NextResponse('Invalid data', { status: 400 })
    }
    if (isGroup) {
      // No check for existing conversation. Users can create multiple groups with the same people
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup: true,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
          userIds: [currentUser.id, ...members.map((member: { value: string }) => member.value)],
        },
        include: {
          // Id is used for routing on client, the rest for pushing new conversations
          users: { select: { id: true, name: true, username: true, image: true } },
        },
      })
      newConversation.users.forEach((user) => {
        if (user.username) {
          pusherServer.trigger(user.username, 'conversation:new', newConversation)
        }
      })
      return NextResponse.json(newConversation)
    } else {
      // Path for non-group conversations

      // Check if there is an existing conversation
      const existingConversation = await prisma.conversation.findFirst({
        where: {
          userIds: {
            hasEvery: [currentUser.id, userId],
          },
          isGroup: null,
        },
      })

      // Return the existing conversation if it exists and isn't a group conversation
      if (existingConversation) {
        return NextResponse.json(existingConversation)
      }

      // Create a new conversation
      const newConversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: currentUser.id,
              },
              {
                id: userId,
              },
            ],
          },
          userIds: [currentUser.id, userId],
        },
        include: {
          users: { select: { id: true, name: true, username: true, image: true } },
        },
      })

      newConversation.users.forEach((user) => {
        if (user.username) {
          pusherServer.trigger(user.username, 'conversation:new', newConversation)
        }
      })
      return NextResponse.json(newConversation)
    }
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
