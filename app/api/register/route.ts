import bcrypt from 'bcryptjs'
import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const SignUpSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 8 characters' }),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.email || !body.name || !body.password) {
      return new Response(JSON.stringify({ message: 'Incomplete data' }), { status: 400 })
    }

    const validatedFields = SignUpSchema.safeParse({
      name: body.name,
      email: body.email,
      password: body.password,
    })

    if (!validatedFields.success) {
      // return new NextResponse('Invalid data', { status: 400 })
      console.log(validatedFields.error)
      const responseData = {
        error: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid fields. Failed to register',
      }
      return new Response(JSON.stringify(responseData), {
        status: 400,
      })
    }

    const { name, email, password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    if (user) return new NextResponse('Success', { status: 201 })
    return new NextResponse('Internal Error', { status: 500 })
  } catch (error: any) {
    // Handle prisma errors (duplicate email) and any other errors
    let message = 'Internal Error'
    if (error?.code === 'P2002') {
      message = 'A user with that email address already exists'
    }
    console.log(error, 'REGISTRATION_ERROR')
    return new Response(JSON.stringify({ message }), {
      status: 400,
    })
  }
}
