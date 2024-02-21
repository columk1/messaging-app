import { getConversationById, getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

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

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: +conversationId,
        // Only allow users who are in the group to delete the conversation
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    })
    return NextResponse.json(deletedConversation)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
