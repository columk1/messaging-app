'use server'

import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { pusherServer } from '@/app/lib/pusher'
import { authOptions } from '@/app/lib/auth'

// Auth function for presence channel
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const socketId = req.body.socket_id
  const channel = req.body.channel_name
  const data = { user_id: session.user.email }

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data)

  return res.send(authResponse)
}
