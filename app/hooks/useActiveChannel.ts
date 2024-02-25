'use client'

import { Channel, Members } from 'pusher-js'
import { useEffect, useState } from 'react'
import useActiveList from './useActiveList'
import { pusherClient } from '@/app/lib/pusher'

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList()
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)

  useEffect(() => {
    let channel = activeChannel

    if (!channel) {
      channel = pusherClient.subscribe('presence-activeList')
      setActiveChannel(channel)
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = []

      members.each((member: { id: string; info: string }) => initialMembers.push(member.id))
      set(initialMembers)
    })

    channel.bind('pusher:member_added', (member: { id: string; info: string }) => {
      add(member.id)
    })

    channel.bind('pusher:member_removed', (member: { id: string; info: string }) => {
      remove(member.id)
    })

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-activeList')
        setActiveChannel(null)
      }
    }
  }, [activeChannel, set, add, remove])
}

export default useActiveChannel
