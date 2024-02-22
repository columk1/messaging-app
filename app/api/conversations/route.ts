import { getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    console.log('Body: ', body)
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
        // Populate the users field with the user object (instead of the id)
        include: {
          users: true,
        },
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
        },
      })

      console.log('Checked for existing convos')

      // Return the existing conversation if it exists
      if (existingConversation) {
        return NextResponse.json(existingConversation)
      }

      console.log('Creating new conversation')

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
          users: true,
        },
      })
      return NextResponse.json(newConversation)
    }
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
