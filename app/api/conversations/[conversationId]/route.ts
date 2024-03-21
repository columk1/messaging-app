import { getConversationById, getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { pusherServer } from '@/app/lib/pusher'

interface Params {
  conversationId: string
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const existingConversation = await getConversationById(conversationId)

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    // Verify that the currentUser is in the conversation
    if (!existingConversation.users.some((user) => user.id === currentUser.id)) {
      console.log('User not in conversation')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const deletedConversation = await prisma.conversation.delete({
      where: {
        id: +conversationId,
        // Only allow users who are in the group to delete the conversation
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    })

    existingConversation.users.forEach((user) => {
      if (user.username) {
        pusherServer.trigger(user.username, 'conversation:remove', +conversationId)
      }
    })

    return NextResponse.json(deletedConversation)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
