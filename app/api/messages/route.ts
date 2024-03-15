import { getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { pusherServer } from '@/app/lib/pusher'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { message, image, conversationId } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: +conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: { select: { name: true, username: true, image: true } },
        seen: { select: { username: true } },
      },
    })

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: +conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: { select: { id: true, name: true, username: true, image: true } },
        messages: {
          orderBy: {
            id: 'asc',
          },
          include: {
            seen: { select: { username: true } },
          },
        },
      },
    })
    await pusherServer.trigger(conversationId, 'messages:new', newMessage)

    // const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.username!, 'conversation:update', {
        id: +conversationId,
        messages: [newMessage],
      })
    })

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
