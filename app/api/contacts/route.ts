import { getCurrentUser, addContact, removeContact } from '@/app/lib/actions'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { userId } = body

    await addContact(currentUser.id, userId)

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { userId } = body

    await removeContact(currentUser.id, userId)

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
