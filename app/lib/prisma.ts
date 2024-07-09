import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

declare global {
  var prisma: PrismaClient | undefined
}

neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}` // NextJS allows process.env to access .env.local
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

const prismaClientSingleton = () => new PrismaClient({ adapter })

const prisma = globalThis.prisma ?? prismaClientSingleton()

// Prevent multiple instances of Prisma Client in development (hot reloading can create new instances)
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
