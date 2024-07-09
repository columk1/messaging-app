import { getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { pusherServer } from '@/app/lib/pusher'
import { z } from 'zod'

const MessageSchema = z.object({
  message: z.string().optional(),
  image: z.string().optional(),
  conversationId: z.string(),
})

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()

    const validatedFields = MessageSchema.safeParse({
      message: body.message,
      image: body.image,
      conversationId: body.conversationId,
    })

    if (!validatedFields.success) {
      return new NextResponse('Invalid data', { status: 400 })
    }

    const { message, image, conversationId } = validatedFields.data

    // Make sure the current user is a part of the conversation
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: +conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    })

    if (!existingConversation) {
      return new NextResponse('Invalid data', { status: 400 })
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
