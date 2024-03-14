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
          orderBy: {
            id: 'asc',
          },
          include: {
            seen: { select: { id: true, email: true } },
          },
        },
        users: { select: { id: true, name: true, email: true, image: true } },
      },
    })
    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    // Return status No Content if there are no messages
    if (!lastMessage) {
      return new NextResponse(null, { status: 204 })
    }

    // TODO: Reduce calls to this query
    console.log('Updating Seen Status')
    console.log(currentUser.email)
    console.log(lastMessage.id)
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: { select: { name: true, email: true, image: true } },
        seen: { select: { email: true } },
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })

    // Skip the pusher trigger if the user has already seen the message
    if (lastMessage.seen.some((user) => user.id === currentUser.id)) {
      return new NextResponse(null, { status: 204 })
    }

    // Update seen status in the conversation list
    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: +conversationId,
      messages: [updatedMessage],
    })

    // Update seen status in the main conversation window
    await pusherServer.trigger(conversationId!, 'message:update', updatedMessage)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
