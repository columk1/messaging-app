import { getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

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
    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}