import bcrypt from 'bcryptjs'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/app/lib/prisma'
import { z } from 'zod'

const SessionUserSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  image: z.string().optional(),
})

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.given_name + ' ' + profile.family_name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const errorMsg = 'Incorrect email or password'
        if (!credentials?.email || !credentials?.password) {
          throw new Error(errorMsg)
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user || !user?.password) {
          throw new Error(errorMsg)
        }
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordsMatch) {
          throw new Error(errorMsg)
        }
        return { ...user, id: user.id.toString() } // Solves type error. Can also usePromise<any> as return type
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      // If updated, return token with updated properties from session
      if (trigger === 'update' && session) {
        const validatedSession = SessionUserSchema.safeParse(session.user)
        if (validatedSession.success) {
          const { name, image } = validatedSession.data // Don't include email
          return { ...token, name, image }
        }
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id as string
        // Set user name and image from token to catch session updates from client
        session.user.name = token.name
        session.user.image = token?.image as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
