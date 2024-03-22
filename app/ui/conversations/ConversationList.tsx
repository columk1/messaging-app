'use client'

import useConversation from '@/app/hooks/useConversation'
import { FullConversationType } from '@/app/lib/definitions'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'
import ConversationListItem from './ConversationListItem'
import GroupChatModal from './[conversationId]/GroupChatModal'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/lib/pusher'
import { UserContext } from '@/app/context/UserContext'
import Link from 'next/link'

interface ConversationListProps {
  initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  const { users } = useContext(UserContext)
  const [items, setItems] = useState(initialItems) // Conversations
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()
  const { conversationId, isOpen } = useConversation()
  const session = useSession()

  const pusherKey = session.data?.user?.username

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
      setItems((prevItems) => {
        const conversationToUpdate = prevItems.find((item) => item.id === conversation.id)
        if (!conversationToUpdate) return prevItems

        const updatedConversation = {
          ...conversationToUpdate,
          messages: conversation.messages,
        }

        // If no new message (seen status change only) update the conversation without re-ordering
        if (conversationToUpdate.messages.some((item) => item.id === conversation.messages[0].id)) {
          return prevItems.map((item) => (item.id === conversation.id ? updatedConversation : item))
        }

        // Update the conversation with the latest at the top of the list
        return [updatedConversation, ...prevItems.filter((item) => item.id !== conversation.id)]
      })
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
          `relative pb-20 lg:pb-0 lg:w-80 lg:min-w-80 lg:block overflow-y-auto border-r bg-purple-3 border-purple-gray`,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className='px-5'>
          <div className='flex justify-between py-3 mb-4 border-b border-purple-gray'>
            <div className='text-2xl font-bold text-gray-200'>Messages</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='rounded-full p-2 bg-gradient-to-br from-violet-500 to-violet-400 hover:from-violet-400 hover:to-violet-300 text-gray-200 transition'
            >
              <MdOutlineGroupAdd size={16} className='' />
            </button>
            <span className='sr-only'>Create a group chat</span>
          </div>
        </div>
        {items.length === 0 ? (
          <div className='flex items-center h-32 justify-center text-gray-200 font-semibold'>
            New conversations will appear here
          </div>
        ) : (
          items.map((item) => (
            <ConversationListItem
              key={item.id}
              conversation={item}
              selected={+conversationId === item.id}
            />
          ))
        )}
        <div className='absolute right-0 bottom-14 lg:bottom-0 p-5 z-10'>
          <Link
            href={'/contacts'}
            className='block rounded-full p-2 bg-gradient-to-br from-violet-500 to-violet-400 hover:from-violet-400 hover:to-violet-300 text-gray-200 transition'
          >
            <HiOutlineChatBubbleBottomCenterText size={32} className='' />
          </Link>
        </div>
      </aside>
    </>
  )
}

export default ConversationList
