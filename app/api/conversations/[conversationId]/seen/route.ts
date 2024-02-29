import { getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { pusherServer } from '@/app/lib/pusher'

interface Params {
  conversationId: string
}

export async function POST(request: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Find existing conversation and check if it has messages
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: +conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    })
    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    // Return conversation if there are no messages
    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    // TODO: Reduce calls to this query
    console.log('Updating Seen Status')
    console.log(currentUser.id)
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: +conversationId,
      messages: [updatedMessage],
    })

    // Skip the pusher trigger if the user has already seen the message
    if (lastMessage.seen.some((user) => user.id === currentUser.id)) {
      return NextResponse.json(conversation)
    }

    await pusherServer.trigger(conversationId!, 'message:update', updatedMessage)

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
