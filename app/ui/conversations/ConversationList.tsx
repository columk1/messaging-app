'use client'

import useConversation from '@/app/hooks/useConversation'
import { FullConversationType } from '@/app/lib/definitions'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationListItem from './ConversationListItem'
import GroupChatModal from './GroupChatModal'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/lib/pusher'

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
  const [items, setItems] = useState(initialItems) // Conversations
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()
  const { conversationId, isOpen } = useConversation()
  const session = useSession()

  const pusherKey = session.data?.user?.email

  useEffect(() => {
    if (!pusherKey) return

    pusherClient.subscribe(pusherKey)

    const newConversationHandler = (conversation: FullConversationType) => {
      console.log('Pusher conversation:new')
      setItems((prevItems) =>
        prevItems.find((item) => item.id === conversation.id)
          ? prevItems
          : [conversation, ...prevItems]
      )
    }

    const updateConversationHandler = (conversation: FullConversationType) => {
      items.forEach((current) => {
        if (current.id === conversation.id) {
          console.log('Current last message: ', current.messages.slice(-1)[0])
        }
      })
      setItems((prevItems) =>
        prevItems.map((prevConversation) =>
          prevConversation.id === conversation.id
            ? { ...prevConversation, messages: conversation.messages }
            : prevConversation
        )
      )
    }

    pusherClient.bind('conversation:new', newConversationHandler)
    pusherClient.bind('conversation:update', updateConversationHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newConversationHandler)
      pusherClient.unbind('conversation:update', updateConversationHandler)
    }
  }, [pusherKey, router])

  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r bg-white border-gray-200`,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className='px-5'>
          <div className='flex justify-between mb-4 pt-4'>
            <div className='text-2xl font-bold text-neutral-800'>Messages</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='rounded-full p-2 bg-gray-100 text-gray-600 hover:opacity-75 transition'
            >
              <MdOutlineGroupAdd size={20} />
            </button>
          </div>
          {items.map((item) => (
            <ConversationListItem
              key={item.id}
              conversation={item}
              selected={+conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationList
