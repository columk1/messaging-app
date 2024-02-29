'use client'

import useConversation from '@/app/hooks/useConversation'
import { ClientUser, FullConversationType } from '@/app/lib/definitions'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationListItem from './ConversationListItem'
import GroupChatModal from './[conversationId]/GroupChatModal'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/lib/pusher'
import { UserContext } from '@/app/context/UserContext'

interface ConversationListProps {
  initialItems: FullConversationType[]
  // users: ClientUser[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  console.log(initialItems)
  const users = useContext(UserContext)
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
      setItems((prevItems) =>
        prevItems.find((item) => item.id === conversation.id)
          ? prevItems
          : [conversation, ...prevItems]
      )
    }

    const updateConversationHandler = (conversation: FullConversationType) => {
      setItems((prevItems) =>
        prevItems.map((prevConversation) =>
          prevConversation.id === conversation.id
            ? { ...prevConversation, messages: conversation.messages }
            : prevConversation
        )
      )
    }

    const removeConversationHandler = (deletedConversationId: number) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== deletedConversationId))
      // Redirect the other users if they have the deleted conversation open
      if (+conversationId === deletedConversationId) {
        router.push('/conversations')
      }
    }

    pusherClient.bind('conversation:new', newConversationHandler)
    pusherClient.bind('conversation:update', updateConversationHandler)
    pusherClient.bind('conversation:remove', removeConversationHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newConversationHandler)
      pusherClient.unbind('conversation:update', updateConversationHandler)
      pusherClient.unbind('conversation:remove', removeConversationHandler)
    }
  }, [pusherKey, router])

  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <aside
        className={clsx(
          `pb-20 lg:pb-0 lg:w-80 lg:min-w-80 lg:block overflow-y-auto border-r bg-white border-gray-200`,
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
