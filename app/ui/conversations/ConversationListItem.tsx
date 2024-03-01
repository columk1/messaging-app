'use client'

import { FullConversationType } from '@/app/lib/definitions'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Conversation, Message, User } from '@prisma/client'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import useOtherUser from '@/app/hooks/useOtherUser'
import Avatar from '@/app/ui/Avatar'
import AvatarGroup from '../AvatarGroup'

interface ConversationListItemProps {
  conversation: FullConversationType
  selected?: boolean
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({ conversation, selected }) => {
  const otherUser = useOtherUser(conversation)
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`)
  }, [conversation.id, router])

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || []
    return messages[messages.length - 1]
  }, [conversation.messages])

  const userEmail = session.data?.user?.email

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false // No messages yet
    const seenArray = lastMessage.seen || []

    // Possibly no email if useSession hasn't loaded yet
    if (!userEmail) return false

    return seenArray.some((user) => user.email === userEmail)
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent an image'
    if (lastMessage?.body) return lastMessage.body

    return 'Started a conversation'
  }, [lastMessage])

  return (
    <button
      onClick={handleClick}
      className={clsx(
        `w-full px-5 py-2 flex items-center space-x-3 hover:bg-purple-2 transition`,
        selected ? 'bg-purple-2' : 'bg-purple-3'
      )}
    >
      {conversation.isGroup ? (
        <AvatarGroup imageUrls={conversation.users.map((user) => user.image)} />
      ) : (
        <Avatar imageUrl={otherUser?.image!} userEmail={otherUser?.email || ''} />
      )}
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-md font-medium text-gray-200'>
              {conversation.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p className='text-xs text-gray-400 font-light'>
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-xs text-left`,
              hasSeen ? 'text-gray-400' : 'text-gray-300 font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </button>
  )
}

export default ConversationListItem
