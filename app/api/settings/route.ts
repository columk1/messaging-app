import { getCurrentUser } from '@/app/lib/actions'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

import { z } from 'zod'

const SettingsSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!body.name && !body.image) {
      return new NextResponse('Missing data', { status: 400 })
    }

    const validatedFields = SettingsSchema.safeParse(body)

    if (!validatedFields.success) {
      return new NextResponse('Invalid data', { status: 400 })
    }

    const { name, image } = validatedFields.data

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
